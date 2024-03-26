import { DockerClient } from '../plugins/docker-client';

export class TaskService {
	private dockerClient: DockerClient;

	public constructor() {
		this.dockerClient = new DockerClient();
	}

	public async executeTask(): Promise<string> {
		return this.dockerClient.run();
	}
}
