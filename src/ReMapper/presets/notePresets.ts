import { activeDiffGet, CustomEvent, EASE, Note, notesBetween, rand } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"
import { allBetween, MKLog } from "../utils/general.ts";

type easeBase = 
        "Sine" |
        "Quad" |
        "Cubic" |
        "Quart" |
        "Quint" |
        "Circ" |
        "Linear" |
        "Step"

export class noteMod {
    /**
     * A class to aid in adding quick noteMod effects.
     * @param startTime The starting time of the notes, including notes on this time.
     * @param endTime The ending time of the notes, excluding notes on this time.
     * @param extraData Anything extra to add to the notes on top of the notemods.
     */
    constructor(
        public startTime = 0,
        public endTime = 0,
        public extraData?: (x: Note) => void
    ){}
    /**
     * Makes the notes fly in as a line then jump to their proper position.
     * @param position The lineIndex, and linelayer that the line will be on. Default - [1.5,0].
     * @param jumpTime The point in the note's lifetime that it will jump up to the proper position, [startOfJump, endOfJump] (0 = when the note spawns, 0.5 = when it reaches the player, 1 = when it despawns). Default - [0.35,0.45].
     * @author Aurellis
     */
    noteLine(position: [number, number] = [1.5, 0], jumpTime: [number, number] = [0.35,0.45]) {
        allBetween(this.startTime,this.endTime, note => {
            note.noteGravity = false;
            if(!note.animation.offsetPosition){
                note.animation.offsetPosition = [[position[0]-note.x,position[1]-note.y,0,0],[position[0]-note.x,position[1]-note.y,0,jumpTime[0]],[0,0,0,jumpTime[1],"easeOutCubic"]];
            }
            if(this.extraData){
                this.extraData(note)
            }
        })
    }
    /**
     * Slows the notes down then speeds them back up as the reach the player.
     * @param slowPoint The point in the notes' lifetime where it will be the slowest. (0 = when the note spawns, 0.5 = when it reaches the player, 1 = when it despawns, Must be less that 0.5 or weird results will occur). Default - 0.1.
     * @param slowForce How much to slow down the notes. Must be an integer from 1-6 (inclusive). Default - 2
     * @param offset The point to spawn the notes along the z axis. Calculated as (vanillaOffset+1)\*offset\*20. Default - 2
     * @param specialEase Optional special easing to use on the notes, only use if you know what you're doing.
     * @author Aurellis
     */

    noteTimeSlow(slowPoint = 0.1, slowForce: [easeBase,easeBase] = ["Sine","Sine"], offset = 2, specialEase?: ["Bounce" | "Back" | "Elastic", "Bounce" | "Back" | "Elastic"]){
        let easeIn = slowForce[0] as string;
        let easeOut = slowForce[1] as string;
        if(specialEase){
            easeIn = specialEase[0];
            easeOut = specialEase[1];
        }
        allBetween(this.startTime,this.endTime, note =>{
            const jd = (note.offset+1)*20*offset
            note.animate.definitePosition = [
                [0,0,jd,0],
                [0,0,jd*(0.5-slowPoint),slowPoint,eval(`"easeOut${easeIn}"`)],
                [0,0,0,0.5,eval(`"easeIn${easeOut}"`)],
                [0,0,-1000,1,"easeInCirc"]
            ]

            if(this.extraData){
                this.extraData(note)
            }
        })
        if(slowPoint >= 0.5){
            MKLog(`A resume point of ${slowPoint} is past the recommended maximum of 0.5, unexpected behaviour may occur...`,"Warning")
        }
    }
    /**
     * Makes the notes pulse in size on each beat.
     * @param pulseSize The amount to pulse (1 is nothing, 2 makes them twice the size, and 0.5 makes them half the size etc.) Default - 1.5.
     * @author Aurellis
     */
    noteBeatPulse(pulseSize = 1.5){
        allBetween(this.startTime,this.endTime, note => {
            const duration = this.endTime-this.startTime
            note.track.add("pulseNotes");

            const animtrack = new CustomEvent(this.startTime).animateTrack("pulseNotes",duration);
            animtrack.animate.length = duration;
            for(let i = 0; i < duration; i++){
                animtrack.animate.add("scale",[[pulseSize,pulseSize,pulseSize,i],[1,1,1,i+0.999]])
            }
            animtrack.push();
            
            if(this.extraData){
                this.extraData(note)
            }
        })
        if(pulseSize < 0){
            MKLog("Objects with negaitve scale have unusual behaviour, set pulseSize to a positive number...","Warning")
        }
    }
    /**
     * Makes the notes fly in from the side.
     * @param spawnDistance How far away to spawn them on the left and right. Default - 10.
     * @param splitBy Whether to split the notes based on their color or their position. Default - "Position".
     * @param animationEnd When in the note's lifetime to end the animation (0 = when the note spawns, 0.5 = when it reaches the player, 1 = when it despawns). Default - 0.4.
     * @author Aurellis
     */
    noteFlyInLR(spawnDistance = 10, splitBy: "type" | "position" = "position", animationEnd = 0.4){
        allBetween(this.startTime,this.endTime, note => {
            if(splitBy == "type"){
                note.animation.offsetPosition = [[spawnDistance*2*(note.type-0.5),0,0,0],[0,0,0,animationEnd,"easeOutQuad"]];
            }
            else{
                note.animation.offsetPosition = [[spawnDistance*(Math.abs(note.x-1.5)/(note.x-1.5)),0,0,0],[0,0,0,animationEnd,"easeOutQuad"]];
            }
            if(this.extraData){
                this.extraData(note)
            }
        })
    }
    /**
     * Makes the notes drop down from a "stream" of notes above the player. (doesn't work for arcs and chains)
     * @param streamY How far up to place the stream. Default - 8.
     * @param density How many notes should be in the stream each beat. Randomises between [min, max] for each beat. Default - [1,3].
     * @param jumpTime The point in the notes' lifetime to start dropping down, and finish dropping down. Default - [0.2,0.4].
     * @param easing The easing to use on the notes'. Default - "easeOutQuad".
     * @author Aurellis
     */
    noteDropStream(streamY = 8, density = [1,3], jumpTime = [0.2,0.4], easing: EASE = "easeOutQuad"){
        const nu = new Note();
        nu.animate.position = [0,streamY,0];
        nu.noteGravity = false
        for(let i = 0 ; i < (this.endTime-this.startTime); i++){
            const beatDense = Math.floor(rand(density[0],density[1]))
            for(let k = 0; k < beatDense; k++){
                for(let j = 0; j < 4; j++){
                    nu.time = this.startTime + i + rand(0,1)
                    nu.x = j;
                    nu.type = Math.floor(rand(0,2));
                    nu.direction = Math.floor(rand(0,9));
                    nu.interactable = false
                    let push = true
                    activeDiffGet().notes.forEach(x =>{
                        if(x.time == nu.time && x.x == nu.x){push = false}
                    })
                    if(push){
                        nu.push(true);
                    }
                }
            }
            notesBetween(this.startTime, this.endTime, note => {
                note.animation.offsetPosition = [[0,streamY-note.y,0,0],[0,streamY-note.y,0,jumpTime[0]],[0,0,0,jumpTime[1],easing]];
                note.noteGravity = false
                if(this.extraData){
                    this.extraData(note)
                }
            })
        }
    }
    /**
     * Makes the notes sway from left to right on the beat of the song.
     * @param rotateFrom Whether to rotate the notes at the top, or the bottom. Default - "Top".
     * @param moveDistance How far to move the notes left and right when swaying. Default - 1.
     * @param rotateAngle How much to rotate the notes as they sway. Default - 30.
     * @author Aurellis
     */
    noteSway(rotateFrom: "Top" | "Bottom" = "Top", moveDistance = 1, rotateAngle = 30) {
        allBetween(this.startTime,this.endTime,note =>{
            note.track.add("SwayNotes")
            if(this.extraData){
                this.extraData(note)
            }
        })
        const dur = this.endTime - this.startTime
        const anim = new CustomEvent(this.startTime).animateTrack("SwayNotes", dur);
        anim.animate.length = dur;
        for(let i = 0; i < dur; i++){
            anim.animate.add("offsetPosition", [[0,0,0,i*2,"easeInQuad"],[moveDistance,0,0,i*2+0.5,"easeOutQuad"],[-moveDistance,0,0,i*2+1.5,"easeInOutQuad"]])
            if(rotateFrom == "Top"){
                anim.animate.add("localRotation", [[0,0,0,i*2,"easeInQuad"],[0,0,rotateAngle,i*2+0.5,"easeOutQuad"],[0,0,-rotateAngle,i*2+1.5,"easeInOutQuad"]])
            }
            else {
                anim.animate.add("localRotation", [[0,0,0,i*2,"easeInQuad"],[0,0,-rotateAngle,i*2+0.5,"easeOutQuad"],[0,0,rotateAngle,i*2+1.5,"easeInOutQuad"]])
            }
        }
        anim.push()
    }
}