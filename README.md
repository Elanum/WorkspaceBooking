# WorkspaceBooking
A full stack workspace booking system for my bachelor thesis

## Table Of Contents
- [WorkspaceBooking](#workspacebooking)
  - [Table Of Contents](#table-of-contents)
  - [About the Project](#about-the-project)
    - [External Services](#external-services)
  - [Development Environment](#development-environment)
    - [Requirements](#requirements)
    - [Setup](#setup)

## About the Project
This is a full stack MERN application with an [Express JS](https://expressjs.com/) backend connected with a [MongoDB](https://www.mongodb.com/) and with a [React](https://reactjs.org/) frontend.

### External Services
- Database: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Exception Monitoring: [Sentry.io](https://sentry.io/)
- Hosted: [Heroku](https://www.heroku.com/)


## Development Environment
The following steps explain how to start the project on your local machine. It's recommended to use a unix-based operation system.

### Requirements
- [Node.js v14.15.4](https://nodejs.org/)
- [Docker v20.10.3](https://www.docker.com/)
- [Docker Compose v1.25.0](https://docs.docker.com/compose/)

### Setup
1. Clone the Repository and navigate into it
    ```bash
    git clone https://github.com/Elanum/WorkspaceBooking.git && cd WorkspaceBooking
    ```

2. Create a `.env` file in the root directory
    ```bash
    cp .env.example .env
    ```

3. *Optional:* Fill out the variables defined in the `.env` file.
   If you don't fill them out, default values will be used.

4. Start the application via `docker-compose`
   ```bash
   docker-compose up
   ```

The app will be available at:
- Frontend (React): http://localhost:3000
- Backend (Express): http://localhost:5000
- Database (MongoDB): http://localhost:27017