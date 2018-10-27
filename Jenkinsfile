@Library('Hash-it-Pipeline-Library') _

useTipPodTemplate('Implementation_hashit2'){


        stage ('Checkout') {
                deleteDir()
                checkout scm
        }

        stage("Build NPM") {
           container('build-docker3'){
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

