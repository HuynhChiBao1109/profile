pipeline {
    agent any

    stages {
        stage('Pull Source') {
            steps {
                dir('/home/b4f/profile') {
                    sh '''
                        git checkout master
                        git pull origin master
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                dir('/home/b4f/profile') {
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