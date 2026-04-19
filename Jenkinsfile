pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('community-service') {
                    sh 'npm install --legacy-peer-deps'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh '''
                        sonar-scanner \
                        -Dsonar.projectKey=COMP367-GroupProject \
                        -Dsonar.sources=community-service \
                        -Dsonar.exclusions=**/node_modules/**
                    '''
                }
            }
        }

        stage('Build') {
            steps {
                dir('community-service') {
                    sh 'npm run build --if-present'
                }
            }
        }

        stage('Test') {
            steps {
                dir('community-service') {
                    sh 'npm test'
                }
            }
        }

        stage('Deliver') {
            steps {
                echo 'Delivering artifact...'
                dir('community-service') {
                    sh 'npm pack'
                }
            }
        }

        stage('Deploy to Dev') {
            steps {
                echo 'Deploying to Dev environment...'
            }
        }

        stage('Deploy to QAT') {
            steps {
                echo 'Deploying to QAT environment...'
            }
        }

        stage('Deploy to Staging') {
            steps {
                echo 'Deploying to Staging environment...'
            }
        }

        stage('Deploy to Production') {
            steps {
                echo 'Deploying to Production environment...'
            }
        }
    }
}