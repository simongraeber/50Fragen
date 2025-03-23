# Spring Boot Application - Configuration Guide

### Difference Between `application-dev.yml` and `application-prod.yml`

In this project, we have two profile-specific YAML files: `application-dev.yml` and `application-prod.yml`. These files contain configurations that are specific to different environments.

#### `application-dev.yml` (Development Environment)
- **Database**: Uses an in-memory H2 database (`jdbc:h2:mem:testdb`) for local development.
- **Default Username/Password**: Uses default credentials (`username: sa`, `password: password`).

#### `application-prod.yml` (Production Environment)
- **Database**: Configured to use a PostgreSQL database or other production database.
- **Credentials**: PostgreSQL or other production-specific credentials.

### How to Switch Profiles
You can activate the `dev` or `prod` profile via the following options:
- **In `application.yml`**: Set the active profile.
  ```yaml
  spring:
    profiles:
      active: dev

or set it via command line (later on we will do this via gitlab pipeline):

`--spring.profiles.active=dev` or prod

### How to access the H2 database

If you're running the application in the development environment (dev), the H2 console is enabled for easier database interaction.

Open a Browser and go to the following URL:

`http://localhost:8080/h2-console`

##### Login to the H2 Console:

- **JDBC URL**: `jdbc:h2:mem:testdb`
- **Username**: `sa`
- **Password**: `password`
