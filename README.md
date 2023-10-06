# User Management CRUD Application

This is a simple user management CRUD application. The backend is implemented using Kotlin and Spring Boot and the frontend is built with React.js and TypeScript. The application allows creating, reading, updating, and deleting users. Each user has a name, email, age, and phone number. The age of the user is fetched from the endpoint: `https://api.agify.io/?name=?`.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- JDK 17 or higher
- Maven
- Any IDE that supports Spring Boot (IntelliJ IDEA, Eclipse, etc.)
- MongoDB Atlas Account
- Node.js
- npm or yarn

### Installing

**Backend:**

1. Navigate to the backend directory: `cd backend`
2. Install dependencies using Maven: `mvn install`
3. Set up MongoDB Atlas and get your connection string.
4. Update `application.properties` file with your MongoDB Atlas connection string.
5. Run the project: `mvn spring-boot:run`

**Frontend:**

1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies using npm or yarn: `npm install` or `yarn`
3. Start the project: `npm start` or `yarn start`

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

### And coding style tests

Explain what these tests test and why

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

**Backend:**

- [Spring Boot](https://spring.io/projects/spring-boot) - The framework used
- [Kotlin](https://kotlinlang.org/) - Language
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Database

**Frontend:**

- [React](https://reactjs.org/) - The web framework used
- [TypeScript](https://www.typescriptlang.org/) - Language
- [Material-UI (MUI)](https://mui.com/) - UI framework
- [Axios](https://github.com/axios/axios) - HTTP client
- [react-hook-form](https://react-hook-form.com/) - Form management
- [yup](https://github.com/jquense/yup) - Form validation
- [lodash](https://lodash.com/) - Utility library

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

- Your Name - Initial work - [Andrej Petrovcic](https://github.com/secret-point0418/user-manager.git)
