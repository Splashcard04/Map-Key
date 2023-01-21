import { Json, Environment } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"
import { MKlog, logFunctionss } from '../constants.ts'
 
export class multiEnv {
    json: Json = {}

    import(json: Json) {
        this.json = json
        return this
    }

    get contains() { return this.json.contains }
    set contains(ids: string[]) { this.json.contains = ids }

    get regex() { return this.json.regex } 
    set regex(ids: string[]) { this.json.regex = ids }

    get exact() { return this.json.exact }
    set exact(ids: string[]) { this.json.exact = ids }

    push(forEnv: (x: Environment) => void) {
        this.json.contains.forEach((id: string) => {
            const env = new Environment(id, "Contains")
            forEnv(env)
            env.push()
        })

        this.json.regex.forEach((id: string) => {
            const env = new Environment(id, "Regex")
            forEnv(env)
            env.push()
        })

        this.json.exact.forEach((id: string) => {
            const env = new Environment(id, "Regex")
            forEnv(env)
            env.push()
        })

        if(logFunctionss) { MKlog("new multi env created")}
    }
}
