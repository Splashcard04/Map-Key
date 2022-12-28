import { Environment, LOOKUP } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"

// export class multiEnv {
//     /**
//      * A class to aid in the manipulation of multiple environment pieces at once.
//      * @param ids The ids for your environment pieces. Including the lookup that should be used for each.
//      * @param forEach The code to execute on each env piece. Don't push your envs in here, They will be pushed when you use the .push() method on this class.
//      * @example new multiEnv([["Sun","Contains"],["Clouds$","Regex"]],(env) => { env.active = false; }).push();
//      * @author Aurellis
//      */
//     constructor(public ids: [string, LOOKUP][], public forEach?: (x: Environment) => void){
//         this.ids = ids;
//         this.forEach = forEach;
//     }
//     /**
//      * Pushes the envs to the diff.
//      */
//     push(){
//         this.ids.forEach(x =>{
//             const env = new Environment(x[0],x[1]);
//             if(this.forEach){
//                 this.forEach(env);
//             }
//             env.push();
//         })
//     }
// }

/**
 * Function to aid the manipulation of multiple environment pieces at once.
 * @param ids The ids and lookup for each environment piece.
 * @param forEach The code to execute for each environment piece.
 * @example multiEnv([["Sun","Contains"],["Clouds$","Regex"]], (env) => { env.active = false; env.push()})
 * @author Aurellis
 */
export function multiEnv(ids: [string, LOOKUP][], forEach: (x: Environment) => void){
    ids.forEach(x =>{
        const env = new Environment(x[0],x[1]);
        forEach(env);
    });
}