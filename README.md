# HashItFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## DevOps

### Jenkins

Jenkins: http://jenkins.jx.paloitcloud.com.sg

Nexus: https://nexus.paloitcloud.com.sg/

Use of Jenkins Pipeline Library:

The Jenkins Pipeline is triggered only with a push to the Master Branch.
The

Two steps are created to deploy the application into Kubernetes:
  - Build Docker image
    - Use docker_build image, install the modules and build the application
        - Create a nginx image with the files
        - Push this image to Nexus
  - Deploy into Kubernetes
    - Recreate deployment for frontend image


### Kubernetes

Rancher: https://11.0.0.40/g/clusters

Containers are hosted inside Palo-IT kubernetes cluster.

Components created:
  - Deployment: To create POD
  - Service: To be able to communication with other PODS
  - Ingress: https://hashit.paloitcloud.com.sg -> Service

### Improvements to do:

  - Caching of image with NPM install, ... to reduce the time of the execution
  - Use Tagging of the docker image and perform a rollout of the deployment instead of recreating the deployment.

