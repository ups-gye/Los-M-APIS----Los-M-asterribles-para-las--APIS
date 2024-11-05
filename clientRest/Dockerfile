FROM eclipse-temurin:21 AS build
WORKDIR /app
COPY . .
RUN apt-get update && apt-get install -y maven
COPY src ./src

# Package the Spring Boot application
RUN mvn package -DskipTests -X

# Use an OpenJDK runtime image to run the app
FROM openjdk:21-jdk
# Set the working directory in the container
WORKDIR /app
# Copy the jar file from the build stage
COPY --from=build /app/target/*.jar app.jar
# Expose the port the app runs on
EXPOSE 8080
# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
