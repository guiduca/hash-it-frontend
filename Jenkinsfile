@Library('Hash-it-Pipeline-Library') _

useTipPodTemplate('Implementation_hashit2'){


        stage ('Checkout') {
                deleteDir()
                checkout scm
        }

        stage("Build NPM") {
           container('build-nodejs'){
             npm install
             npm run build
          }
        }

        stage("Check test build0docker") {
           container('build-docker2'){
             sh 'ls -l'
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

