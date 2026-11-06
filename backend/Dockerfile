# Multi-stage Docker build for PlacePilot Spring Boot Backend (Java 21)
# Stage 1: Build Application with Maven and JDK 21
FROM maven:3.9.9-eclipse-temurin-21-alpine AS builder
WORKDIR /app

# Copy pom.xml and pre-fetch dependencies for Docker caching
COPY pom.xml ./
RUN mvn dependency:go-offline -B

# Copy sources and package executable JAR
COPY src ./src
RUN mvn clean package -DskipTests -B

# Stage 2: Lightweight Production Runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Run as non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

COPY --from=builder /app/target/placepilot-backend-1.0.0.jar app.jar

# Defaults (Render injects PORT dynamically)
ENV PORT=8080
ENV SPRING_PROFILES_ACTIVE=prod
EXPOSE 8080

ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]

