@Library('Hash-it-Pipeline-Library') _

if(env.BRANCH_NAME == 'master'){
useTipPodTemplate('Implementation_hashit5'){


        stage ('Checkout') {
                deleteDir()
                checkout scm
        }

        stage("Build NPM") {
           container('build-docker4'){
             useDockerRegistry{
               sh 'whereis npm'
               sh 'ls -l /usr/bin/npm'
               sh 'ls -la'
               sh 'npm install'
               sh 'npm run build'
               sh 'ls -la'
               sh 'ls -la dist/'
               sh 'docker build -t frontendnginx .'
               sh 'docker tag frontendnginx docker.paloitcloud.com.sg/hash-it/frontendnginx:latest'
               sh 'docker push docker.paloitcloud.com.sg/hash-it/frontendnginx:latest'
            }
          }
        }

}
}
