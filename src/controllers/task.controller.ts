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
		const { image, tag, port, name, parameters } = request.body;

		if (!image || !name || !tag || !port) {
			response
				.status(400)
				.end('Bad request: image, tag, name & port are required');
			return;
		}

		if (
			typeof image !== 'string' ||
			typeof tag !== 'string' ||
			typeof name !== 'string'
		) {
			response
				.status(400)
				.end('Bad request: image, tag & name must be strings');
			return;
		}

		if (typeof port !== 'number' || isNaN(Number(port))) {
			response.status(400).end('Bad request: port must be a number');
			return;
		}

		const result = await this.taskService.executeTask({
			image,
			tag,
			port,
			name,
			parameters,
		});
		response.end(JSON.stringify({ result }));
	};
}
