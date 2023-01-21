export class playerAnim {
    json: Json = {}

    import(json: Json) {
        this.json = json
        return this
    }
    /**
     * a class to animate notes and the player at once
     * @param time the time to start animating the player
     * @param timeEnd the time to stop animating the player
     * @param forTrack assign data to the track to assign player / notes to
     * @author @Splashcard @Aurelis
     */
    constructor(time: number, timeEnd: number, forTrack: (x: CustomEventInternals.AnimateTrack) => void) {
        this.json.time = time
        this.json.timeEnd = timeEnd
        this.json.forTrack = forTrack
    }

    get playerTrack() { return this.json.playerTrack }
    set playerTrack(track: string) { this.json.playerTrack = track }

    get noteTrack() { return this.json.noteTrack }
    set noteTrack(track: string) { this.json.noteTrack = track }
    

    push() {

        const anim = new CustomEvent(this.json.time).animateTrack("player", this.json.timeEnd - this.json.time);
        this.json.forTrack(anim);
        anim.push();

        if(!this.json.playerTrack || this.json.playerTrack === undefined) {
            this.json.playerTrack = "player"
        }
        if(!this.json.noteTrack || this.json.noteTrack === undefined) { 
            this.json.noteTrack = ["notes"]
        } else {
            this.json.noteTrack = ["notes", this.json.noteTrack]
        }
        new CustomEvent(this.json.time).assignPlayerToTrack(this.json.playerTrack).push()
        new CustomEvent(this.json.time).assignTrackParent(this.json.noteTrack, this.json.playerTrack).push()
        allBetween(this.json.time, this.json.timeEnd, n => {
            n.customData.track = this.json.noteTrack //i think track arrays work lol
        })

        if(logFunctionss){
            MKLog(`Added new player animation at beat ${this.time} until beat ${this.timeEnd}...`)
        }
    }
}

