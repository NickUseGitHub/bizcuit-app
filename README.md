# Monolith NodeJS typescript project starter

### Tech Stacks

- **frontend** With NextJS
- **backend** With NestJS
- **docker compose** for running in Localhost

**_required node version v12.13.0_**

```
These projects are written from "typescript".
```

### To Run this project

- first start your Docker service
- create directory name `db` in root's directory. (sibling with docker-compose.yml)
- install nodejs's package with both directories
  - frontend
  - backend

```
You can run command with `cd frontend && yarn` and `cd frontend && backend`
```

- create container and run into your local docker's services with this command

```
for Docker Desktop version 3.4.0 or newer
  > run "docker compose up"

for Docker Desktop older than version 3.4.0
  > run "docker-compose up"
```

- run frontend's website on port **3000**
- run backend's api on port **3001**

### To connect database

#### default database's connection configuration

- DB_HOST: localhost
- DB_PORT: 5432
- DB_USERNAME=postgres
- DB_PASSWORD=password
- DB_DATABASE=mydb
