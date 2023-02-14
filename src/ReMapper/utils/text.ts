import { ModelScene, Text, Geometry, GeometryMaterial, Wall, ColorType, Vec3 } from 'https://deno.land/x/remapper@3.1.1/src/mod.ts'

type TextObject = {
    pos: Vec3,
    rot: Vec3,
    scale: Vec3,
    color?: ColorType,
    track?: string
}

export class textToGeo {
    /**
     * Create quick text with geometry.
     * @param text The text to write.
     * @param fontModel The relative path of your font model. Or an array of text objects.
     * @param material The material for your geometry objects.
     * @param extraData Any extra data for the text.
     * @author UG-Ecko
     */
    constructor(public text: string, public fontModel: string | TextObject[], public material: GeometryMaterial = {shader:"Standard"}, public extraData?: (data: Text) => void){}
    push(){
        const txt = new Text(this.fontModel)
        if (this.extraData) {
            this.extraData(txt)
        }
        new ModelScene(new Geometry("Cube", this.material)).static(txt.toObjects(this.text));
    }
}

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
    constructor(public text: string, public fontModel: string, public time: number, public duration: number, public textData?: (data: Text) => void, public wallData?: (data: Wall) => void){}
    push(){
        const txt = new Text(this.fontModel)
        if(this.textData){
            this.textData(txt)
        }
        txt.toWalls(this.text, this.time, this.time+this.duration, this.wallData)
    }
}

// Keeping this commented heere because it might be more effective if we can get it to work. - Aurellis

// export class textBuilder {
//     json: Json = {}

//     constructor(public fontModel: string, public forText: (x: Text) => void) {}

//     object(obj: GroupObjectTypes) {
//         this.json.object = obj
//     }
//     // deno-lint-ignore no-explicit-any
//     switch(keyframes: [any, number][]) {
//         if(!this.json.object) { this.json.object = new Geometry("Cube", {
//             shader: "Standard", shaderKeywords: [], color: [1,1,1,1]
//         })}
//         const text = new Text(this.fontModel)

//         this.forText(text)

//         const scene = new ModelScene(this.json.object)

//         keyframes.forEach(x => {
//             x.forEach(y => {
//                 this.json.anim = text.toObjects(y[0])
//             })
//         })

//         scene.animate(this.json.anim)
//     }

// }