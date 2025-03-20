FROM maven:3.9.4-eclipse-temurin-21 AS build
LABEL authors="50Fragen"

WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests

FROM openjdk:21-jdk-slim

RUN apt-get update && apt-get install -y curl

COPY --from=build /app/target/*.jar app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]

