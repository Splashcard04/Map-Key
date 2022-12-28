import { Environment, LOOKUP } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"

export class multiEnv {
    constructor(public ids: [string, LOOKUP][], public forEach?: (x: Environment) => void){
        this.ids = ids;
        this.forEach = forEach;
    }
    push(){
        this.ids.forEach(x =>{
            const env = new Environment(x[0],x[1]);
            if(this.forEach){
                this.forEach(env);
            }
        })
    }
}