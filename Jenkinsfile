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
          }
        }



        // Stage 3
        //stage("Kubernetes") {
        //  container('kubectl'){
        //      withEnv(['K8_NAMESPACE=hash-it-dev']) {
        //      sh './deploy_k8s.sh'
        //    }
        //  }
        //}
}

