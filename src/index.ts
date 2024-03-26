import 'dotenv/config';
import { TaskRoutes } from './routes';
import { TaskController } from './controllers/task.controller';
import { TaskService } from './services/task.service';
import { Server } from './server';

const taskService = new TaskService();
const taskController = new TaskController(taskService);
const taskRoutes = new TaskRoutes(taskController);

const server = new Server();

server.router(taskRoutes.getRouter);
server.start();
