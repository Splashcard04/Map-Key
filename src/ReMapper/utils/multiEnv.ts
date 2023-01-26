import { Environment } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"
import { MKLog, logFunctionss } from './general.ts'
 
export class multiEnv {

    constructor(
        public contains: string[] = [],
        public regex: string[] = [],
        public endswith: string[] = [],
        public exact: string[] = []
    ){}

    push(forEnv: (x: Environment) => void) {
        this.contains.forEach((id: string) => {
            const env = new Environment(id, "Contains")
            forEnv(env)
            env.push()
        })

        this.regex.forEach((id: string) => {
            const env = new Environment(id, "Regex")
            forEnv(env)
            env.push()
        })

        this.endswith.forEach((id: string) => {
            const env = new Environment(id, "EndsWith")
            forEnv(env)
            env.push();
        })

        this.exact.forEach((id: string) => {
            const env = new Environment(id, "Regex")
            forEnv(env)
            env.push()
        })

        if(logFunctionss) { MKLog("new multi env created")}
    }
}