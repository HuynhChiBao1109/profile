pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        disableConcurrentBuilds()
        timestamps()
        timeout(time: 20, unit: 'MINUTES')
    }

    environment {
        APP_NAME = 'baohc-profile'
        SERVICE_NAME = 'portfolio'
        DEPLOY_DIR = '/home/b4f/baohc-profile'
        COMPOSE_PROJECT_NAME = 'baohc-profile'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Validate environment') {
            steps {
                sh '''
                    set -eu

                    docker --version
                    docker info > /dev/null
                    docker compose version
                    docker compose config --quiet
                '''
            }
        }

        stage('Lint and build') {
            steps {
                sh '''
                    set -eu

                    docker build \
                        --pull \
                        --target builder \
                        --tag "$APP_NAME:ci-$BUILD_NUMBER" \
                        .

                    docker run --rm "$APP_NAME:ci-$BUILD_NUMBER" npm run lint
                '''
            }
        }

        stage('Package image') {
            steps {
                sh '''
                    set -eu

                    docker build \
                        --tag "$APP_NAME:build-$BUILD_NUMBER" \
                        .
                '''
            }
        }

        stage('Smoke test') {
            steps {
                sh '''
                    set -eu

                    container_name="$APP_NAME-smoke-$BUILD_NUMBER"

                    cleanup() {
                        docker rm -f "$container_name" > /dev/null 2>&1 || true
                    }
                    trap cleanup EXIT

                    cleanup
                    docker run --detach \
                        --name "$container_name" \
                        "$APP_NAME:build-$BUILD_NUMBER" > /dev/null

                    for attempt in $(seq 1 15); do
                        status=$(docker inspect \
                            --format='{{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}' \
                            "$container_name")

                        if [ "$status" = 'healthy' ]; then
                            echo 'Smoke test passed'
                            exit 0
                        fi

                        if [ "$status" = 'unhealthy' ]; then
                            echo 'Container became unhealthy'
                            docker logs "$container_name"
                            exit 1
                        fi

                        echo "Waiting for container health: $attempt/15 ($status)"
                        sleep 4
                    done

                    echo 'Smoke test timed out'
                    docker logs "$container_name"
                    exit 1
                '''
            }
        }

        stage('Deploy') {
            when {
                expression {
                    def branch = env.BRANCH_NAME ?: env.GIT_BRANCH ?: ''
                    return ['main', 'master', 'origin/main', 'origin/master',
                        'refs/heads/main', 'refs/heads/master'].contains(branch)
                }
            }

            steps {
                sh '''
                    set -eu

                    docker tag \
                        "$APP_NAME:build-$BUILD_NUMBER" \
                        "$APP_NAME:latest"

                    mkdir -p "$DEPLOY_DIR"
                    rsync -a \
                        --delete \
                        --exclude='.git' \
                        --exclude='.env' \
                        --exclude='node_modules' \
                        ./ "$DEPLOY_DIR"/

                    docker compose \
                        --file "$DEPLOY_DIR/docker-compose.yml" \
                        config --quiet

                    docker compose \
                        --file "$DEPLOY_DIR/docker-compose.yml" \
                        up --detach --no-build --remove-orphans

                    docker compose \
                        --file "$DEPLOY_DIR/docker-compose.yml" \
                        ps
                '''
            }
        }

        stage('Health check') {
            when {
                expression {
                    def branch = env.BRANCH_NAME ?: env.GIT_BRANCH ?: ''
                    return ['main', 'master', 'origin/main', 'origin/master',
                        'refs/heads/main', 'refs/heads/master'].contains(branch)
                }
            }

            steps {
                sh '''
                    set -eu

                    compose_file="$DEPLOY_DIR/docker-compose.yml"
                    container_id=$(docker compose \
                        --file "$compose_file" \
                        ps --quiet "$SERVICE_NAME")

                    if [ -z "$container_id" ]; then
                        echo 'Deployed container was not found'
                        exit 1
                    fi

                    for attempt in $(seq 1 15); do
                        status=$(docker inspect \
                            --format='{{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}' \
                            "$container_id")

                        if [ "$status" = 'healthy' ]; then
                            echo 'Deployment is healthy'
                            exit 0
                        fi

                        if [ "$status" = 'unhealthy' ]; then
                            echo 'Deployment became unhealthy'
                            docker compose --file "$compose_file" logs --tail=200
                            exit 1
                        fi

                        echo "Waiting for deployment health: $attempt/15 ($status)"
                        sleep 4
                    done

                    echo 'Deployment health check timed out'
                    docker compose --file "$compose_file" logs --tail=200
                    exit 1
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully'
        }

        failure {
            echo 'Pipeline failed; check the failed stage logs'
        }

        always {
            sh '''
                docker rm -f "$APP_NAME-smoke-$BUILD_NUMBER" \
                    > /dev/null 2>&1 || true
                docker image rm "$APP_NAME:ci-$BUILD_NUMBER" \
                    > /dev/null 2>&1 || true
                docker image rm "$APP_NAME:build-$BUILD_NUMBER" \
                    > /dev/null 2>&1 || true
            '''
        }
    }
}
