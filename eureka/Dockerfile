FROM maven:3.9.4-eclipse-temurin-21 AS build
LABEL authors="50Fragen"

WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests

RUN apt-get update && apt-get install -y curl

FROM openjdk:21-jdk-slim

COPY --from=build /app/target/*.jar app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]