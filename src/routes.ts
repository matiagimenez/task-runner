import { Router } from 'express';
import { TaskController } from './controllers/task.controller';

export class TaskRoutes {
	private router;
	private taskController: TaskController;

	public constructor(controller: TaskController) {
		this.router = Router();
		this.taskController = controller;
		this.routes();
	}

	public routes(): void {
		this.router.get('/', this.taskController.executeTask);
	}

	public get getRouter(): Router {
		return this.router;
	}
}
