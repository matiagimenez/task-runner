import Dockerode from 'dockerode';
import { Readable } from 'stream';

export class DockerClient {
	private docker: Dockerode;

	public constructor() {
		this.docker = new Dockerode({
			socketPath: '/var/run/docker.sock',
		});
	}

	public async pull(image: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.docker.pull(image, (err: string, stream: Readable) => {
				if (err) {
					console.error('Error pulling image:', err);
					reject(false);
					return;
				}

				this.docker.modem.followProgress(
					stream,
					() => {
						console.log('Image pulled successfully');
						resolve(true);
					},
					(progress) => {
						console.log('Pulling progress:', progress);
					}
				);
			});
		});
	}

	public async run(
		image: string,
		tag: string,
		port: number
	): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.docker.createContainer(
				{
					Image: `${image}:${tag}`,
					ExposedPorts: {
						'80/tcp': {},
					},
					HostConfig: {
						PortBindings: {
							'80/tcp': [
								{
									HostPort: `${port}`,
								},
							],
						},
					},
				},
				(err, container) => {
					if (err) {
						console.error('Error creating container:', err);
						reject(false);
						return;
					}

					container?.start((err) => {
						if (err) {
							console.error('Error starting container:', err);
							reject(false);
							return;
						}

						// Resolves after 10 seconds assuming the container is running.
						setTimeout(() => {
							console.log('Container started successfully');
							resolve(true);
						}, 10000);

						// After 90 seconds, stop and remove the container.
						setTimeout(() => {
							console.log('Stopping container ...');
							container.stop((err) => {
								if (err) {
									console.error(
										'Error stopping container:',
										err
									);
									reject(false);
									return;
								}

								container.remove((err) => {
									if (err) {
										console.error(
											'Error removing container:',
											err
										);
										reject(false);
										return;
									}
									console.log(
										'Container stopped successfully'
									);
								});
							});
						}, 90000);
					});
				}
			);
		});
	}
}
