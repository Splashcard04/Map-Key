import { CustomEvent, Note, notesBetween } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"

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
     * @param position The lineIndex, and linelayer that the line will be on.
     * @param jumpTime The point in the note's lifetime that it will jump up to the proper position, [startOfJump, endOfJump] (0 = when the note spawns, 0.5 = when it reaches the player, 1 = when it despawns).
     * @author Aurellis
     */
    noteLine(position: [number, number], jumpTime: [number, number] = [0.35,0.45]) {
        notesBetween(this.startTime,this.endTime, note => {
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
     * Slows the notes down then speeds them back up as the reach the player. Also adds a dissolve arrow effect. This effect is very similar to the one found in Wavetapper by Mawntee.
     * @author Aurellis
     */
    noteTimeSlow(){
        notesBetween(this.startTime,this.endTime, note =>{
            const track = `timeNote_${note.time}_${note.x}_${note.y}`;
            note.noteGravity = false;
            note.animation.dissolveArrow = [[1,0],[0,0.3,"easeInQuad"]];
            note.track.add(track)
            note.NJS = 16;
            note.offset = 0;

            const animtrack = new CustomEvent(note.time - 1).animateTrack(track,2);
            animtrack.animate.time = [[0,0],[0.1,0.3],[1,1,"easeInQuad"]];
            animtrack.push();

            if(this.extraData){
                this.extraData(note)
            }
        })
    }
    /**
     * Makes the notes pulse in size on each beat.
     * @param pulseSize The amount to pulse (1 is nothing, 2 makes them twice the size, and 0.5 makes them half the size etc.)
     * @author Aurellis
     */
    noteBeatPulse(pulseSize = 1.5){
        notesBetween(this.startTime,this.endTime, note => {
            const duration = this.endTime-this.startTime
            note.track.add("pulseNotes");

            const animtrack = new CustomEvent(this.startTime).animateTrack("pulseNotes",duration);
            animtrack.animate.length = duration;
            for(let i = 0; i < duration; i++){
                animtrack.animate.add("scale",[[pulseSize,pulseSize,pulseSize,i],[1,1,1,i+1]])
            }
            animtrack.push();
            
            if(this.extraData){
                this.extraData(note)
            }
        })
    }
    /**
     * Makes the notes fly in from the side.
     * @param spawnDistance How far away to spawn them on the left and right.
     * @param splitBy Whether to split the notes based on their color or their position.
     * @param animationEnd When in the note's lifetime to end the animation (0 = when the note spawns, 0.5 = when it reaches the player, 1 = when it despawns).
     * @author Aurellis
     */
    noteFlyInLR(spawnDistance = 50, splitBy: "type" | "position" = "position", animationEnd = 0.4){
        notesBetween(this.startTime,this.endTime, note => {
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
}