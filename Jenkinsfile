@Library('Hash-it-Pipeline-Library') _

useTipPodTemplate('Implementation_hashit5'){


        stage ('Checkout') {
                deleteDir()
                checkout scm
        }

        stage("Build NPM") {
           container('build-docker4'){
             sh 'whereis npm'
             sh 'ls -l /usr/bin/npm'
             sh 'ls -la'
             sh 'npm install'
             sh 'npm run build'
             sh 'ls -la'
             sh 'docker build -t frontend_nginx .'
             sh 'docker tag frontend_nginx docker.paloitcloud.com.sg:443/hash-it/frontend_nginx:latest'
             sh 'docker push docker.paloitcloud.com.sg:443/hash-it/frontend_nginx:latest'
          }
        }

}

