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
}
