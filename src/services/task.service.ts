import { DockerClient } from '../plugins/docker-client';

interface Task {
	image: string;
	tag: string;
	name: string;
	port: number;
	parameters?: any[];
}

const host = process.env.HOST || 'localhost';

export class TaskService {
	private dockerClient: DockerClient;

	public constructor() {
		this.dockerClient = new DockerClient();
	}

	public async executeTask({
		image,
		name,
		tag,
		port,
		parameters,
	}: Task): Promise<any> {
		try {
			// Pull docker image
			const pulled = await this.dockerClient.pull(`${image}:${tag}`);

			if (!pulled) {
				return JSON.stringify({
					message: 'Error pulling image',
				});
			}

			// Run the container
			const running = await this.dockerClient.run(image, tag, port);

			if (!running) {
				return JSON.stringify({
					message: 'Error running the container',
				});
			}

			// TODO: "HTTP Request to the container to get the result of the task"
			//? name is the name of the task we have to execute & parameters will be the parameters to pass on the http body
			const response = await fetch(
				`http://${host}:${port}/task/${name}`,
				{
					method: 'POST',
					body: JSON.stringify({ params: parameters }),
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			const result = await response.json();

			return result;
		} catch (error) {
			console.error('Error executing task:', error);
			return `Error executing task: ${error}`; // Rechazar la promesa con el error para que sea manejado por el código que llamó a executeTask()
		}
	}
}
