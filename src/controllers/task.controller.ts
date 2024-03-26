import { Request, Response } from 'express';
import { TaskService } from '../services/task.service';

export class TaskController {
	private taskService: TaskService;

	public constructor(service: TaskService) {
		this.taskService = service;
	}

	public executeTask = async (
		request: Request,
		response: Response
	): Promise<void> => {
		const result = await this.taskService.executeTask();

		response.end(JSON.stringify({ result }));
	};
}
