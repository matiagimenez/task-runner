export class Task {
	private id: number;
	private image: string;
	private name: string;
	private parameters: any[];

	public constructor(
		id: number,
		image: string,
		name: string,
		parameters: any[]
	) {
		this.id = id;
		this.image = image;
		this.name = name;
		this.parameters = parameters;
	}

	public get getId(): number {
		return this.id;
	}

	public get getImage(): string {
		return this.image;
	}

	public get getName(): string {
		return this.name;
	}

	public get getParameters(): any[] {
		return this.parameters;
	}
}
