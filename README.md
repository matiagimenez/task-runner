# Generic task executor

This service runs a docker container and executes a task specified by the parameters on the request to the server.

## Requirements

-   Node.js (v18.17.1 or higher)
-   NPM (v10.3 or higher)
-   Docker

### Installation

1. Clone the repository

```bash
git clone https://github.com/matiasgimenezdev/task-runner
```

2. Install dependencies

```bash
npm install
```

3. Set up the environment variables on .env (see .env.example)

```
HOST = localhost
PORT = 3000
```

4.  Run the application

```bash
npm run dev
```
