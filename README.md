# AgriPulse – Microservices Agricultural Supervision Platform

AgriPulse est une plateforme de **supervision agricole** basée sur une architecture microservices : gestion des exploitations/parcelles, suivi capteurs & météo, génération d’alertes en temps réel via Kafka, notifications persistées, UI Next.js, et un socle Spring Cloud (Gateway, Eureka, Config Server).

---

## Description du projet

AgriPulse a pour objectif de centraliser la supervision d’une exploitation agricole via plusieurs microservices indépendants.

Fonctionnalités principales :
- Gestion des **exploitations** et des **parcelles** (référentiel métier).
- Suivi des **capteurs** (ex: humidité du sol) et de la **météo** (selon implémentation).
- Détection de conditions critiques et génération d’**alertes**.
- Publication d’événements d’alertes en temps réel via **Kafka**.
- Consommation des événements par le microservice de **notifications** et persistance en base.
- Exposition d’une API unifiée via un **API Gateway**.
- UI web avec **Next.js**.
- Découverte de services via **Eureka** et configuration centralisée via **Config Server**.

---

## Technologies utilisées

### Backend / Microservices
- Java 17
- Spring Boot
- Spring Cloud:
  - Eureka Server (Service Discovery)
  - Spring Cloud Config Server (Centralisation configuration)
  - Spring Cloud Gateway (API Gateway)
  - OpenFeign (communication inter-services, si activée)
- Spring Data JPA / Hibernate

### Messaging
- Apache Kafka (mode KRaft, sans ZooKeeper)

### Base de données
- MySQL 8.x

### Frontend
- Next.js (React)

### DevOps / Packaging
- Docker & Docker Compose
- Kubernetes (Deployments + Services)
- kubectl

---

## Architecture (vue logique)

- **mseureka** : serveur Eureka (discovery)
- **configserver** : serveur de configuration centralisée
- **gateway** : point d’entrée API
- **msexploitations** : gestion exploitations/parcelles
- **mssupervision** : supervision capteurs (publie des événements Kafka)
- **msnotification** : consomme les événements Kafka et persiste les notifications
- **mysql** : base de données
- **kafka** : broker Kafka (KRaft)
- **frontend** : UI Next.js

---

## Installation & Exécution (Docker / Docker Compose)

> Pré-requis : Docker + Docker Compose installés.

1. À la racine du projet, construire et démarrer :
   ```bash
   docker compose up --build
