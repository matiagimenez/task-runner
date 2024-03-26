import Dockerode from 'dockerode';
import { Readable } from 'stream';

export class DockerClient {
	private docker: Dockerode;

	public constructor() {
		this.docker = new Dockerode({
			socketPath: '/var/run/docker.sock',
		});
	}

	public async run(): Promise<string> {
		return new Promise((resolve, reject) => {
			this.docker.pull(
				'nginx:latest',
				(err: string, stream: Readable) => {
					if (err) {
						console.error('Error pulling image:', err);
						reject('Error pulling image');
						return;
					}

					this.docker.modem.followProgress(
						stream,
						() => {
							console.log('Image pulled successfully');
							// Una vez que la imagen se haya descargado correctamente, inicia el contenedor
							// this.docker.createContainer(/* Configuración del contenedor */, (createErr, container) => {
							//     if (createErr) {
							//         console.error('Error creating container:', createErr);
							//         reject('Error creating container');
							//         return;
							//     }
							//     // Inicia el contenedor
							//     container.start((startErr) => {
							//         if (startErr) {
							//             console.error('Error starting container:', startErr);
							//             reject('Error starting container');
							//             return;
							//         }
							//         // El contenedor se ha iniciado correctamente
							//         console.log('Container running');
							//         resolve('Container running');
							//     });
							// });
						},
						(progressErr) => {
							console.error('Error pulling image:', progressErr);
							reject('Error pulling image');
						}
					);
				}
			);
		});
	}
}
