# Etapa 1: Build (CONSTRUCCIÓN)
# Usamos una imagen de Temurin (JDK) con Maven preinstalado, que es más común.
# Si esta falla, usar la alternativa de OpenJDK-22-jdk.
FROM maven:3.9.6-eclipse-temurin-22 AS build
WORKDIR /app

# Copia los archivos necesarios
COPY pom.xml .
RUN mvn dependency:go-offline # Descarga dependencias para cachear
COPY src ./src
RUN mvn clean package -DskipTests

# Etapa 2: Runtime (EJECUCIÓN)
# Usamos la imagen Temurin JRE Alpine. Esta combinación (JRE + Alpine) es ideal para la ejecución.
FROM eclipse-temurin:22-jre-alpine
WORKDIR /app

# Copia solo el JAR generado desde la etapa 'build'
COPY --from=build /app/target/*.jar /app/app.jar

EXPOSE 8080

# Quita el USER por ahora para evitar problemas si no existe.
# Si el build funciona, puedes agregarlo después de investigar el usuario de la imagen base.
# USER appuser

CMD ["java", "-jar", "/app/app.jar"]