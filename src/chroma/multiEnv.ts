import { Environment } from "https://deno.land/x/remapper@3.1.2/src/mod.ts";
import { MKLog, logFunctionss } from "./general.ts";

export class multiEnv {
	/**
	 * Modify a set of environment IDs with multiple lookup methods.
	 * @param contains Environment ids to modify with lookup method "Contains".
	 * @param regex Environment ids to modify with lookup method "Regex".
	 * @param endswith Environment ids to modify with lookup method "EndsWith".
	 * @param exact Environment ids to modify with lookup method "Exact"
	 */
	constructor(public contains: string[] = [], public regex: string[] = [], public endswith: string[] = [], public exact: string[] = []) {}

	/**push the environment objects to the difficulty */
	push(forEnv: (x: Environment) => void) {
		this.contains.forEach((id: string) => {
			const env = new Environment(id, "Contains");
			forEnv(env);
			env.push();
		});

		this.regex.forEach((id: string) => {
			const env = new Environment(id, "Regex");
			forEnv(env);
			env.push();
		});

		this.endswith.forEach((id: string) => {
			const env = new Environment(id, "EndsWith");
			forEnv(env);
			env.push();
		});

		this.exact.forEach((id: string) => {
			const env = new Environment(id, "Regex");
			forEnv(env);
			env.push();
		});

		if (logFunctionss) {
			MKLog("new multi env created");
		}
	}
}
