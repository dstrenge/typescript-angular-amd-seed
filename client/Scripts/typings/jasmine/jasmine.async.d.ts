// expose the AsyncSpec object
declare var AsyncSpec: asyncjasmine.IAsyncSpec;

declare module asyncjasmine {

	interface IAsyncSpec {
		new (spec: any);
		beforeEach(block: (done: Function) => void): void;
		afterEach(block: (done: Function) => void): void;
		it(description: string, block: (done: Function) => void): void;
	}
}
