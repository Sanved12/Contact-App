# Contact App

A full-stack contact management application built with **Angular** (frontend) and **Spring Boot** (backend).

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Development](#development)
- [Build & Deployment](#build--deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **User Authentication**: Register and login functionality with secure password handling
- **Contact Management**: Create, read, update, and delete contacts
- **User Profile**: View and manage user profile information
- **Dashboard**: View all contacts in an organized dashboard
- **Responsive UI**: Modern Angular-based user interface
- **RESTful API**: Secure backend API with Spring Boot

## 📁 Project Structure

```
contact-app/
├── client/                          # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── add-contact/
│   │   │   │   ├── edit-contact/
│   │   │   │   └── profile/
│   │   │   ├── services/
│   │   │   │   └── api.ts         # API service
│   │   │   ├── app.ts             # Root component
│   │   │   └── app.routes.ts      # Route configuration
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   ├── package.json
│   ├── angular.json
│   └── tsconfig.json
│
├── server/                          # Spring Boot Backend
│   ├── src/
│   │   ├── main/java/
│   │   │   └── com/comprinno/contactapp/
│   │   │       ├── config/         # Configuration classes
│   │   │       ├── controller/     # REST Controllers
│   │   │       ├── model/          # Entity models
│   │   │       ├── repository/     # Data repositories
│   │   │       └── exception/      # Custom exceptions
│   │   └── resources/
│   │       └── application.properties
│   ├── pom.xml                     # Maven configuration
│   └── mvnw                        # Maven wrapper
│
└── README.md
```

## 🛠 Tech Stack

### Frontend
- **Angular 18+**: Modern TypeScript-based framework
- **TypeScript**: Type-safe JavaScript
- **CSS**: Styling with responsive design
- **HTML5**: Semantic markup

### Backend
- **Spring Boot 4.0.3**: Java-based framework
- **Java 17**: Latest JDK version
- **Maven**: Dependency management & build tool
- **Spring Data JPA**: Database abstraction layer
- **Spring Web**: REST API development

### Database
- Default: H2 (in-memory) or configurable via `application.properties`

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18+) and npm
- **Java JDK** (17+)
- **Maven** (or use mvnw wrapper)
- **Git**

Verify installations:
```bash
node --version      # v18+
npm --version       # 9+
java -version       # 17+
```

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Sanved12/Contact-App.git
cd contact-app
```

### 2. Frontend Setup (Angular)

```bash
cd client

# Install dependencies
npm install

# Verify Angular CLI is installed
ng version
```

### 3. Backend Setup (Spring Boot)

```bash
cd ../server

# No additional setup needed - Maven wrapper handles dependencies
# The mvnw script will automatically download and use Maven
```

## ▶️ Running the Application

### Option 1: Run Both Servers (Recommended for Development)

**Terminal 1 - Start Backend (Port 8080)**
```bash
cd /path/to/contact-app/server
./mvnw spring-boot:run
```

**Terminal 2 - Start Frontend (Port 4200)**
```bash
cd /path/to/contact-app/client
ng serve --open
```

The application will automatically open at `http://localhost:4200`

### Option 2: Run Only the Backend

```bash
cd server
./mvnw spring-boot:run
```

Backend API will be available at `http://localhost:8080`

### Option 3: Build for Production

**Backend Build:**
```bash
cd server
./mvnw clean package
java -jar target/contactapp-0.0.1-SNAPSHOT.jar
```

**Frontend Build:**
```bash
cd client
ng build --configuration production
```

## 🔌 API Endpoints

### User Management
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login
- `GET /api/users/{id}` - Get user profile
- `PUT /api/users/{id}` - Update user profile

### Contact Management
- `GET /api/contacts` - Fetch all contacts
- `GET /api/contacts/{id}` - Get contact by ID
- `POST /api/contacts` - Create a new contact
- `PUT /api/contacts/{id}` - Update a contact
- `DELETE /api/contacts/{id}` - Delete a contact

### Request/Response Format
All endpoints use JSON for request and response bodies.

Example Register Request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

## 💻 Development

### Frontend Development
```bash
cd client

# Start development server with hot reload
ng serve

# Run unit tests
ng test

# Build for development
ng build

# Lint the code
ng lint
```

### Backend Development
```bash
cd server

# Run with Maven
./mvnw spring-boot:run

# Run tests
./mvnw test

# Build the project
./mvnw clean build

# Clean target directory
./mvnw clean
```

### Making Changes
1. Create a new branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Commit: `git commit -m "Add your message"`
4. Push: `git push origin feature/your-feature-name`
5. Create a Pull Request on GitHub

## 📦 Build & Deployment

### Build Production Versions

**Backend JAR:**
```bash
cd server
./mvnw clean package -DskipTests
```

**Frontend Static Files:**
```bash
cd client
ng build --configuration production
```

### Configuration

Edit `server/src/main/resources/application.properties` to change:
- Port number
- Database settings
- Logging level
- CORS configuration

Example:
```properties
server.port=8080
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
logging.level.root=INFO
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Sanved12**

- GitHub: [@Sanved12](https://github.com/Sanved12)
- Email: sanvedk@example.com

## 📞 Support

For questions or issues, please open an issue on the GitHub repository or contact the maintainer.

---

**Last Updated**: February 28, 2026

Happy coding! 🚀
