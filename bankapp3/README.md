# Banking Application

A full-stack banking application built with Java Spring Boot and React TypeScript.

## Features

### Core Banking Features
- **User Authentication**: JWT-based authentication with role-based access control
- **Account Management**: Create and manage multiple account types (Savings, Checking, Money Market)
- **Transactions**: Deposit, withdrawal, and transfer operations
- **Transaction History**: View detailed transaction history with pagination
- **Balance Management**: Real-time balance updates

### Technology Stack

#### Backend
- **Framework**: Spring Boot 3.1.5
- **Security**: Spring Security with JWT tokens
- **Database**: PostgreSQL with JPA/Hibernate
- **API**: RESTful API with CORS support
- **Build**: Maven

#### Frontend
- **Framework**: React 18.2
- **Language**: TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: Zustand
- **HTTP Client**: Axios

## Project Structure

```
bankapp3/
├── backend/
│   ├── src/main/java/com/bankapp/
│   │   ├── controller/          # REST API endpoints
│   │   ├── service/             # Business logic
│   │   ├── entity/              # JPA entities
│   │   ├── repository/          # Data access
│   │   └── security/            # JWT & Security config
│   ├── src/main/resources/
│   │   └── application.yml      # Configuration
│   └── pom.xml                  # Maven dependencies
└── frontend/
    ├── src/
    │   ├── components/          # Reusable React components
    │   ├── pages/               # Page components
    │   ├── services/            # API services & state
    │   ├── App.tsx
    │   └── main.tsx
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    └── index.html
```

## Setup Instructions

### Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- PostgreSQL 12 or higher
- Maven 3.6+

### Backend Setup

1. **Database Configuration**
   ```sql
   CREATE DATABASE bankingapp;
   ```

2. **Update Configuration**
   Edit `backend/src/main/resources/application.yml`:
   ```yaml
   spring:
     datasource:
       url: jdbc:postgresql://localhost:5432/bankingapp
       username: postgres
       password: your_password
   ```

3. **Build & Run**
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```
   Backend will start on `http://localhost:8080/api`

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   Frontend will start on `http://localhost:3000`

3. **Build for Production**
   ```bash
   npm run build
   ```

## API Endpoints

### Authentication
- `POST /auth/login` - Login with credentials
- `POST /auth/logout` - Logout

### Accounts
- `GET /accounts` - Get all user accounts
- `GET /accounts/{id}` - Get specific account
- `POST /accounts` - Create new account

### Transactions
- `GET /transactions/account/{accountId}` - Get transaction history
- `POST /transactions/deposit` - Make deposit
- `POST /transactions/withdraw` - Make withdrawal
- `POST /transactions/transfer` - Transfer between accounts

## Key Components

### Backend Components

**User Entity**
- Manages user profiles and authentication
- Related to multiple accounts and roles

**Account Entity**
- Stores account information and balance
- Supports multiple account types

**Transaction Entity**
- Records all account transactions
- Tracks transaction type and status

**Security**
- JWT token generation and validation
- Password encryption with BCrypt
- Role-based access control

### Frontend Components

**LoginPage**
- User authentication interface
- Token storage and session management

**DashboardPage**
- Main user interface
- Displays accounts and transactions
- Account operations interface

**AccountCard**
- Displays individual account details
- Shows balance and account type

**TransactionList**
- Shows transaction history
- Formatted transaction information

## Development Notes

### Modify JWT Secret
⚠️ **Important**: Change the JWT secret in `application.yml` before production deployment.

### CORS Configuration
CORS is configured to allow requests from `http://localhost:3000`. Modify in `SecurityConfig.java` for production.

### Database Initialization
The application uses Hibernate's `ddl-auto: update` to automatically create/update tables. Change to `validate` in production.

## Troubleshooting

### Backend won't start
- Verify PostgreSQL is running
- Check database connection credentials
- Ensure Java 17+ is installed

### Frontend won't compile
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node.js version (16+)

### CORS errors
- Verify backend CORS configuration
- Check allowed origins in `SecurityConfig.java`
- Ensure frontend is running on correct port

## Next Steps

1. Implement user registration endpoint
2. Add profile management features
3. Implement transaction filters and search
4. Add payment scheduling
5. Implement transaction approval workflows
6. Add audit logging

## License

This project is for educational purposes.
