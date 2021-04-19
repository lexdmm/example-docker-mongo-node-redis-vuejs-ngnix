#Simple Project Node, MongoDb, Redis, Semantic-Ui-Vue and Nginx 
**Author: Menescal, Daniel M.**

A simple example of how to run a project with backend developed in Node, with Mongodb, a job scaled in a queue with the Redis and a VueJs frontend, exposing in a reverse proxy with Nginx. All without the need for these tools installed on your machine other than Docker.

##Quick Start, Follow the steps.

### Install Docker
* [Install Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/install/)
* [Install Docker Desktop for Linux](https://docs.docker.com/install/linux/docker-ce/ubuntu/)	
* [Install Docker Desktop for Mac](https://docs.docker.com/docker-for-mac/install/)	

### Clone project 
```
git clone https://menescal@bitbucket.org/menescal/example-docker-mongo-node-redis-vuejs-ngnix.git
```

### Run project
You can scale as many containers as you want with the parameters '--scale worker=3'
```
docker-compose up --scale worker=3
```

### Open the project home
Open the project home, if it is gray, wait a while until the docker finish loading the containers.
```
http://localhost:81
```
