FROM openjdk:17-jdk-slim AS run

COPY build/libs/app.cityscout.api-all.jar  /app/api.jar
COPY all.sqlite /app/all.sqlite

EXPOSE 8080

ENV CITIES_FILE "/app/all.sqlite"

CMD ["java", "-Xms128m", "-Xmx1g", "-server", "-XX:+UnlockExperimentalVMOptions", "-XX:InitialRAMFraction=2", "-XX:MinRAMFraction=2", "-XX:MaxRAMFraction=2", "-XX:+UseG1GC", "-XX:MaxGCPauseMillis=100", "-XX:+UseStringDeduplication", "-jar", "/app/api.jar"]

