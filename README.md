### Deployment

#### Building an image

    export DOCKER_IMAGE=dk-reg.10ninox.com/ds-dga/opendata-vote:latest
    docker build -t $DOCKER_IMAGE -f Dockerfile .
    docker push $DOCKER_IMAGE

#### Start the container

    dkc pull
    dkc up -d --build
