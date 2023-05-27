
# Next.js + Mantine + TypeScript frontend for a Spring Boot Reddit clone

## Getting Started

First, run the docker compose file to start the database, backend, and a NextJS dev container:

```bash
docker compose up
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This will also start the backend server at [http://localhost:8080](http://localhost:8080).

The backend server is a Spring Boot application that uses a MySQL database, the repository for which is [here](https://github.com/DaddaAdam/Spring-Reddit).

You can visit the OpenAPI documentation for the backend server at [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html).

## Docker Compose

The following docker compose file will start all the services required for the application to run.

The services are:

- MySQL database
- Spring Boot backend server
- NextJS frontend server

You can directly use this command to download and run the docker compose file:

```bash
curl -L https://cdn.abderraziq.com/docker-compose.yml -o docker-compose.yml && docker compose up
```

```yaml
version: '3.1'

services:
  next:
    image: spring-reddit-ui
    ports:
      - "3000:3000"
    depends_on:
      - spring
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:8080

  spring:
    image: xenedium/spring-boot-reddit:latest
    restart: always
    ports:
      - "8080:8080"
    depends_on:
      mysql:
        condition: service_healthy
    environment:
      - SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/test?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true

  mysql:
    image: mysql:8-debian
    volumes:
      - database:/var/lib/mysql
    healthcheck:
      test: [ "CMD", "mysqladmin", "ping", "-h", "localhost" ]
      interval: 1s
      timeout: 10s
      retries: 10
      start_period: 30s
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: test
      MYSQL_USER: test
      MYSQL_PASSWORD: test
    ports:
      - "3306:3306"
      - "33060:33060"

volumes:
  database:
  node_modules:
```
