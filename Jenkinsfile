@Library('Hash-it-Pipeline-Library') _

useTipPodTemplate('Implementation_hashit2'){


        stage ('Checkout') {
                deleteDir()
                checkout scm
        }

        stage("Build NPM") {
<<<<<<< HEAD
           container('build-docker3'){
             sh 'ls -la'
             sh 'npm install'
             sh 'npm run build'
             sh 'ls -la'
=======
           container('build-nodejs'){
             npm install
             npm run build
          }
        }

        stage("Check test build0docker") {
           container('build-docker2'){
             sh 'ls -l'
>>>>>>> fbc85714ab33aa3dc20a9183cd8f02d4d22845eb
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

