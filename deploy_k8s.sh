#!/bin/sh

echo GET NODES
kubectl get nodes

echo GET DEPLOYMENT
kubectl -n ${K8_NAMESPACE} get deployment frontendnginx -o wide

echo REMOVE DEPLOYMENT
kubectl -n ${K8_NAMESPACE} delete deployment frontendnginx

echo RECREATE DEPLOYMENT
kubectl -n ${K8_NAMESPACE} create -f kubernetes/frontend_nginx-deployment.yaml

echo ROLLOUT STATUS
kubectl -n ${K8_NAMESPACE} rollout status deployment/frontendnginx
