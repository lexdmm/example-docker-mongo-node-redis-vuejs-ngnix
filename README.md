#Simple Project Node, MongoDb, Redis, Semantic-Ui-Vue and Nginx 
**Author: Menescal, Daniel M.**

Um exemplo simples de como executar um projeto com backend desenvolvido em Node, com Mongodb, um job escalado em uma fila com o Redis e um frontend VueJs, expondo em um proxy reverso com Nginx. Tudo isso sem a necessidade dessas ferramentas instaladas em sua máquina que não seja o Docker.

##Quick Start, Siga as etapas.

### Instalando o Docker
* [Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/install/)
* [Docker Desktop for Linux](https://docs.docker.com/install/linux/docker-ce/ubuntu/)	
* [Docker Desktop for Mac](https://docs.docker.com/docker-for-mac/install/)	

### Clone project 
```
git clone https://github.com/lexdmm/example-docker-mongo-node-redis-vuejs-ngnix.git
```

### Run project
Você pode escalar quantos contêineres quiser com os parâmetros '--scale worker=3'
```
docker-compose up --scale worker=3
```

### Open the project home
Abra a página inicial do projeto, se estiver cinza, espere um pouco até que termine de carregar os contêineres.
```
http://localhost:81
```

### Stop containers
```
docker-compose down
```



