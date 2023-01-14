import { PRNGs, Seed } from "https://deno.land/x/seed@1.0.0/index.ts";
import { setDecimals } from "https://deno.land/x/remapper@3.1.1/src/mod.ts";

export class randArray {
    /**
    * Creates an array of random numbers with a seed for repeatable use.
    * @param seed The seed for prng generation, leave blank to keep random.
    * @param range The min/max that the numbers in the array can be.
    * @param length The length of the array (how many numbers to generate).
    * @param decimals The precision of the result (0 for integers).
    * @param algorithm The seeded prng algorithm to use.
    * @author Aurellis
    */
    constructor(
        public seed: number | string = Date.now(),
        public range: [number, number] = [0,1],
        public length: number = 2, 
        public decimals = 5,
        public algorithm: "mulberry32" | "jsf32" | "sfc32" | "xoshiro128" = "mulberry32"
    ){}
    /**
     * Creates the array based on set parameters.
     * @returns An array of random values.
     */
    run(){
        const _prngs = PRNGs
        const res: number[] = [];
        const number = new Seed("", eval(`_prngs.${this.algorithm}`));
        for(let i = 0; i < this.length; i++){
            number.seed = `${this.seed}${i}`;
            if(this.decimals == 0){
                res.push(number.randomInt(this.range[0],this.range[1]))
            }
            else {
                res.push(setDecimals(number.randomFloat(this.range[0],this.range[1]),this.decimals))
            }
        }
        return res;
    }
    /**
     * Ensures that no consecutive numbers are identical.
     * @param buffer The number of times to try for a unique number (prevents infinite repeats under certain circumstances).
     * @param debugBuffer Whether or not to log the number of runs needed for each array entry.
     * @param countSingleRuns Whether or not to count successful runs (runs that generated a unique number on the first try) in the buffer log.
     * @returns An array of random values.
     */
    runUniqueConsecutive(buffer = 20, debugBuffer = false, countSingleRuns = false){
        const bufferruns = []
        const _prngs = PRNGs
        const res: number[] = [];
        const number = new Seed("", eval(`_prngs.${this.algorithm}`));
        let gen = 0;
        for(let i = 0; i < this.length; i++){
            let j = 0;
            for(let unique = false; unique == false && j < buffer; j++){
                number.seed = `${this.seed}${i}${j}`
                if(this.decimals == 0){
                    gen = number.randomInt(this.range[0],this.range[1]);
                }
                else {
                    gen = setDecimals(number.randomFloat(this.range[0],this.range[1]),this.decimals)
                }
                if(gen !== res[i-1]) {
                    unique = true;
                }
            }
            if(debugBuffer){
                if(countSingleRuns){
                    bufferruns.push(j)
                }
                else if(j !== 1){
                    bufferruns.push(j)
                }
            }
            res.push(gen)
        }
        if(debugBuffer){
            console.log(bufferruns)
        }
        return res;
    }
    /**
     * Ensures that no two numbers in the array are identical. This is the slowest method on this class. Please only use it if you must.
     * @param buffer The number of times to try for a unique number (prevents infinite repeats under certain circumstances).
     * @param debugBuffer Whether or not to log the number of runs needed for each array entry.
     * @param countSingleRuns Whether or not to count successful runs (runs that generated a unique number on the first try) in the buffer log.
     * @returns An array of random values.
     */
    runUnique(buffer = 20, debugBuffer = false, countSingleRuns = false){
        const bufferruns = []
        const _prngs = PRNGs
        const res: number[] = [];
        const number = new Seed("", eval(`_prngs.${this.algorithm}`));
        let gen = 0;
        for(let i = 0; i < this.length; i++){
            let j = 0
            for(let unique = false; unique == false && j < buffer; j++){
                number.seed = `${this.seed}${i}${j}`
                if(this.decimals == 0){
                    gen = number.randomInt(this.range[0],this.range[1]);
                }
                else {
                    gen = setDecimals(number.randomFloat(this.range[0],this.range[1]),this.decimals)
                }
                unique = true;
                res.forEach(existing =>{
                    if(existing == gen){
                        unique = false;
                    }
                })
            }
            if(debugBuffer){
                if(countSingleRuns){
                    bufferruns.push(j)
                }
                else if(j !== 1){
                    bufferruns.push(j)
                }
            }
            res.push(gen);
        }
        if(debugBuffer){
            console.log(bufferruns)
        }
        return res;
    }
}