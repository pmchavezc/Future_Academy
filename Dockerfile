# --------- build (JDK 22) ---------
FROM maven:3.9.9-eclipse-temurin-22 AS build
WORKDIR /app

COPY pom.xml .
RUN mvn -q -DskipTests dependency:go-offline

COPY src ./src

# Fuerza UTF-8 por si algún archivo quedó en otra codificación
ENV MAVEN_OPTS="-Dfile.encoding=UTF-8"
RUN mvn -q clean package -DskipTests -Dproject.build.sourceEncoding=UTF-8

# --------- runtime (JRE 22) ---------
FROM eclipse-temurin:22-jre-alpine
WORKDIR /app
RUN addgroup -S app && adduser -S app -G app
COPY --from=build /app/target/*.jar /app/app.jar
EXPOSE 8080
USER app
ENTRYPOINT ["java","-jar","/app/app.jar"]