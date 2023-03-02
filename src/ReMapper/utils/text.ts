import { ModelScene, Text, Wall, GroupObjectTypes, Json, Geometry } from 'https://deno.land/x/remapper@3.1.1/src/mod.ts'

export class textToWall {
    /**
     * Create quick text with walls.
     * @param text The text to write.
     * @param fontModel The relative path of your font model. Or an array of text objects.
     * @param time The time to spawn the text.
     * @param duration The duration of the text.
     * @param textData Any extra data for the text.
     * @param wallData Any extra data for the walls.
     */
    constructor(public text: string, public fontModel: string, public time = 0, public duration = 1, public textData?: (data: Text) => void, public wallData?: (data: Wall) => void){}
    push(){
        const txt = new Text(this.fontModel)
        if(this.textData){
            this.textData(txt)
        }
        txt.toWalls(this.text, this.time, this.time+this.duration, this.wallData)
    }
}


export class textBuilder {
    private json: Json = {object: new Geometry("Cube",{shader:"Standard"})}
    /**
     * build a text to object scene
     * @param model the name of your font model
     * @param forText modfifcatons to the text object
     * @method object the object to make text of
     * @method switch the keyframes of your text
     */
    constructor(public model: string, public forText: (x: Text) => void) {}

    object(obj: GroupObjectTypes) {
        this.json.object = obj
        return this
    }

    switch(keyframes: [string, number][]) {
        const text = new Text(this.model)
        this.forText(text)

        const scene = new ModelScene(this.json.object)

        let keyframe;

        keyframes.forEach(x => {
            keyframe.push(text.toObjects(x[0]), x[1])
        })

        scene.animate(keyframe)

    }
}