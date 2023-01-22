import { Environment } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"
import { MKLog, logFunctionss } from './general.ts'
 
export class multiEnv {
    // I commented out the sections incase we need to integrate them later and save the code.
    // json: Json = {}

    // import(json: Json) {
    //     this.json = json
    //     return this
    // }

    constructor(
        public contains: string[] = [],
        public regex: string[] = [],
        public endswith: string[] = [],
        public exact: string[] = []
    ){}

    // get contains() { return this.json.contains }
    // set contains(ids: string[]) { this.json.contains = ids }

    // get regex() { return this.json.regex } 
    // set regex(ids: string[]) { this.json.regex = ids }

    // get exact() { return this.json.exact }
    // set exact(ids: string[]) { this.json.exact = ids }

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

new multiEnv().contains