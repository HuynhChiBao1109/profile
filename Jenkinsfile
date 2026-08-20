pipeline {
    agent any

    stages {
        stage('Pull Source') {
            steps {
                dir('/home/b4f/baohc-profile') {
                    sh '''
                        git checkout master
                        git pull origin master
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                dir('/home/b4f/baohc-profile') {
                    sh '''
                        docker compose up --build -d
                        docker compose ps
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'DEPLOY SUCCESS'
        }

        failure {
            echo 'DEPLOY FAILED'
        }
    }
}