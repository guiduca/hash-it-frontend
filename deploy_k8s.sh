#!/bin/sh

echo GET NODES
kubectl get nodes

echo GET DEPLOYMENT
kubectl -n ${K8_NAMESPACE} get deployment frontendnginx -o wide

echo DEPLOYMENT
kubectl -n ${K8_NAMESPACE} set image deployment/frontendnginx frontendnginx=docker.paloitcloud.com.sg/hash-it/frontendnginx:latest

echo ROLLOUT STATUS
kubectl -n ${K8_NAMESPACE} rollout status deployment/frontendnginx
