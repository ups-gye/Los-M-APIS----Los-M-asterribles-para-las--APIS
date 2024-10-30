FROM openjdk AS build
VOLUME /tmp
RUN mkdir /app
COPY . /app
WORKDIR /app

FROM openjdk:21-jdk
ARG APP_VERSION=1.0.0
LABEL org.label-schema.version=$APP_VERSION
COPY --from=build /app/build/libs/*.jar /app/app.jar
ENTRYPOINT ["java", "-Djava.security.toDoList=file:/dev/./urandom", "-jar", "/app/app.jar" ]