# Digital Product Marketplace

A scalable digital product marketplace where users can browse, purchase, and download digital products, while sellers can manage their products and sales.

The project is designed to demonstrate how modern full-stack applications can be structured using **microservices architecture**, caching, cloud infrastructure, authentication, payments, and scalable backend services.

## 🚀 Tech Stack

- ⚛️ MERN Stack
- 🔷 TypeScript
- 🎨 shadcn/ui
- ⚡ Redis
- 🗂️ Microservices Architecture
- ☁️ AWS
- 🔗 Authentication & Authorization

## 🏗️ Architecture

The application follows a **microservices architecture**, with individual services responsible for specific business domains.

### Frontend

- React + Vite
- TypeScript
- shadcn/ui
- Initial marketplace UI structure
- Login UI
- Firebase Google authentication
- Axios-based API client
- Current-user session bootstrap
- Redux Toolkit + React Redux state management
- Role-based routing with React Router
- Centralized user domain types
- Admin and Partner route foundations

### Current Backend Services

- **Gateway Service**
  - Central entry point for backend API requests
  - Routes requests to the appropriate microservice
  - Handles CORS configuration
  - Proxies authentication requests to the Auth Service
  - Provides authenticated current-user endpoint
  - Validates server-side sessions through authentication middleware

- **Auth Service**
  - Firebase ID token verification
  - Google authentication integration
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
- React-based frontend development
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
- [x] Google authentication integration
- [x] User model and user persistence
- [x] Redis integration
- [x] Server-side session management
- [x] HTTP-only session cookie
- [x] Login endpoint
- [x] Logout endpoint
- [x] Gateway authentication middleware
- [x] Authenticated current-user endpoint
- [x] Gateway-to-Auth Service proxy
- [x] Frontend-to-Gateway API client
- [x] Current-user session bootstrap
- [x] Basic microservices structure
- [x] React + Vite frontend foundation
- [x] shadcn/ui frontend setup
- [x] Initial marketplace UI structure
- [x] Login UI
- [x] Firebase Google sign-in flow
- [x] Frontend environment configuration
- [x] Redux state management
- [x] Current-user state integration with Redux
- [x] Role-based frontend routing
- [x] Admin and Partner route foundations
- [x] Centralized frontend user types

The project is actively under development. Architecture, services, APIs, testing, deployment, and other features will be added as development progresses.
