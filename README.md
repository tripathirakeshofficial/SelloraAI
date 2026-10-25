# Digital Product Marketplace

A scalable digital product marketplace where users can browse, purchase, and download digital products, while sellers can manage their products and sales.

The project demonstrates how modern full-stack applications can be structured using **microservices architecture**, caching, cloud infrastructure, authentication, payments, and scalable backend services.

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
- User profile display with avatar and name
- Frontend logout flow
- Toast notifications
- Lazy-loaded routes and shared loading components
- Optimized frontend dependencies and bundle loading

### Current Backend Services

- **Gateway Service**
  - Central entry point for backend API requests
  - Routes requests to the appropriate microservice
  - Handles CORS configuration
  - Proxies authentication requests to the Auth Service
  - Provides an authenticated current-user endpoint
  - Validates server-side sessions through authentication middleware
  - Validates current account status through the Auth Service
  - Handles invalid and expired sessions
  - Uses internal-secret verification for gateway-to-auth communication

- **Auth Service**
  - Firebase ID token verification
  - Google authentication integration
  - User creation and lookup
  - Account activation status checks
  - Session creation and management
  - Redis-backed server-side sessions
  - HTTP-only session cookies
  - Login and logout endpoints
  - Internal session-validation endpoint
  - Rejects inactive accounts during login and session validation

### Shared Infrastructure

- **Redis**
  - Server-side session storage
  - Session expiration using TTL
  - Foundation for future caching and performance optimization

- **MongoDB**
  - Auth Service database
  - User persistence and account status management

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
- Frontend performance optimization
- Secure service-to-service communication

## 📌 Project Status

🚧 **In Development**

### Completed

- [x] Backend workspace structure
- [x] Gateway service foundation
- [x] Auth Service foundation
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
- [x] User profile display with avatar and name
- [x] Frontend logout flow
- [x] Toast notifications
- [x] Lazy-loaded frontend routes
- [x] Shared loading components
- [x] Frontend dependency and bundle optimizations
- [x] Inactive-account checks during login
- [x] Internal-secret protection for session validation
- [x] Gateway-to-Auth Service account validation
- [x] Invalid Redis session handling
- [x] Session cookie cleanup for invalid sessions
- [x] Gateway, Auth Service, and frontend lint/build checks

The project is actively under development. Architecture, services, APIs, testing, deployment, and other features will be added as development progresses.
