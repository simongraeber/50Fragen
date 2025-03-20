FROM maven:3.9.4-eclipse-temurin-17 AS build

WORKDIR /app

COPY . .

RUN ulimit -c unlimited && mvn clean package -DskipTests

RUN apt-get update && apt-get install -y curl

FROM openjdk:17-jdk-slim

COPY --from=build /app/target/*.jar app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]