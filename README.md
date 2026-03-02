# Contact App

A simple contact management application to create, view, edit, and delete contacts. Built with Angular (frontend) and Spring Boot (backend).

## Description

Contact App allows users to:
- Register and login with email and password
- Add new contacts with name, email, and phone number
- View all contacts in a dashboard
- Edit existing contact details
- Delete contacts
- View and update their profile

## Technology Stack

- **Frontend**: Angular 18 + TypeScript
- **Backend**: Spring Boot 4.0.3 + Java 17
- **Database**: PostgreSQL
- **Build Tool**: Maven (backend), npm (frontend)

## Project Structure

```
contact-app/
├── client/                 # Angular Frontend
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
│   │   │   │   └── api.ts
│   │   │   └── app.ts
│   │   ├── index.html
│   │   └── main.ts
│   ├── package.json
│   └── angular.json
│
├── server/                 # Spring Boot Backend
│   ├── src/
│   │   ├── main/java/
│   │   │   └── com/comprinno/contactapp/
│   │   │       ├── controller/
│   │   │       ├── model/
│   │   │       ├── repository/
│   │   │       └── config/
│   │   └── resources/
│   │       └── application.properties
│   ├── pom.xml
│   └── mvnw
│
└── README.md
```

## Setup & Installation

### Requirements
- Node.js v18+
- Java JDK 17+
- Maven (or use mvnw wrapper)

### Install Frontend
```bash
cd client
npm install
```

### Install Backend
```bash
cd server
# No installation needed - Maven wrapper handles dependencies
```

## Running the Application

**Start Backend** (Terminal 1):
```bash
cd server
./mvnw spring-boot:run
```
Backend runs on `http://localhost:8080`

**Start Frontend** (Terminal 2):
```bash
cd client
ng serve --open
```
Frontend opens on `http://localhost:4200`

## Main Features

### Components
- **Login** - User authentication
- **Register** - Create new user account
- **Dashboard** - View all contacts
- **Add Contact** - Create new contact
- **Edit Contact** - Modify contact details
- **Profile** - User profile management

### API Endpoints
- `POST /api/users/register` - Register user
- `POST /api/users/login` - Login user
- `GET /api/contacts` - Get all contacts
- `POST /api/contacts` - Add new contact
- `PUT /api/contacts/{id}` - Update contact
- `DELETE /api/contacts/{id}` - Delete contact
