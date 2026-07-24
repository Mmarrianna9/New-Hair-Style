FROM eclipse-temurin:21-jdk-alpine

# Imposta la cartella di lavoro all'interno del container
WORKDIR /app

# Copia i file di configurazione di Maven e il codice sorgente
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
COPY src ./src

# Rendi eseguibile il file mvnw e compila il progetto saltando i test per velocità
RUN chmod +x mvnw
RUN ./mvnw package -DskipTests

# Trova il file jar generato e copialo come app.jar
RUN cp target/*.jar app.jar

# Specifica la porta su cui gira Spring Boot (di solito 8080)
EXPOSE 8080

# Comando per avviare l'applicazione
CMD ["java", "-jar", "app.jar"]