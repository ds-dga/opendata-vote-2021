#!/usr/bin/env sh

export DOCKER_IMAGE=dk-reg.10ninox.com/ds-dga/opendata-vote:latest
docker build -t $DOCKER_IMAGE -f Dockerfile .
docker push $DOCKER_IMAGE
