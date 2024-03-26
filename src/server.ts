import express from 'express';

export class Server {
	private server: express.Application;
	private port: number | string;
	private host: string;

	public constructor() {
		this.server = express();
		this.port = process.env.PORT || 3000;
		this.host = process.env.HOST || 'localhost';
	}

	public start(): void {
		const options = { port: this.port, hostname: this.host };
		this.server.listen(options, () => {
			console.log(
				`Example app listening on ${options.hostname}:${options.port}`
			);
		});
	}

	public router(Router: express.Router): void {
		this.server.use('/', Router);
	}
}
