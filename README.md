# Digital Product Marketplace

A scalable digital product marketplace where users can browse, purchase, and download digital products, while sellers can manage their products and sales.

The project is designed to demonstrate how modern full-stack applications can be structured using **microservices architecture**, caching, cloud infrastructure, authentication, payments, and scalable backend services.

## 🚀 Tech Stack

- ⚛️ MERN Stack
- 🔷 TypeScript
- 🎨 shadcn/ui
- ⚡ Redis
- 🏗️ Microservices Architecture
- ☁️ AWS
- 🔐 Authentication & Authorization
- 💳 Payment Integration
- 🛒 Digital Product Marketplace
- 📦 Product & Order Management

## ✨ Core Features

### Customers

- Browse digital products
- View product details
- Purchase products
- Download purchased products
- Manage orders

### Sellers

- Create and manage digital products
- Manage product information and pricing
- Manage sales
- Track orders

### Platform

- Authentication and authorization
- Session-based authentication
- Firebase authentication integration
- Redis-backed session management
- HTTP-only session cookies
- Payment processing
- Product management
- Order management
- Redis caching
- Microservices-based backend
- AWS cloud deployment

## 🏗️ Architecture

The application follows a **microservices architecture**, with individual services responsible for specific business domains.

### Current Backend Services

- **Gateway Service**
  - Central entry point for backend API requests
  - Routes requests to the appropriate microservice

- **Auth Service**
  - Firebase ID token verification
  - User creation and lookup
  - Session creation and management
  - Redis-backed server-side sessions
  - HTTP-only session cookies
  - Login and logout endpoints

### Shared Infrastructure

- **Redis**
  - Server-side session storage
  - Future caching and performance optimization

- **MongoDB**
  - Auth service database

AWS will provide the cloud infrastructure for deployment as the project evolves.

## 🎯 Project Goals

This project aims to demonstrate:

- Modern full-stack development with TypeScript
- Microservices architecture
- Scalable backend design
- Authentication and authorization
- Server-side session management
- Redis integration
- Payment integration
- Digital product delivery
- Cloud deployment with AWS
- Product and order management

## 📌 Project Status

🚧 **In Development**

### Completed

- [x] Backend workspace structure
- [x] Gateway service foundation
- [x] Auth service foundation
- [x] MongoDB database connection for Auth Service
- [x] Firebase authentication integration
- [x] User model and user persistence
- [x] Redis integration
- [x] Server-side session management
- [x] HTTP-only session cookie
- [x] Login endpoint
- [x] Logout endpoint
- [x] Basic microservices structure

The project is actively under development. Architecture, services, APIs, testing, deployment, and other features will be added as development progresses.
