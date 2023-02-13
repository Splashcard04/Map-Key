import { ModelScene, Text, Geometry, RawGeometryMaterial, Json, GroupObjectTypes } from 'https://deno.land/x/remapper@3.1.1/src/mod.ts'
/*
/**
 * @param  {string} text Text Input
 * @param  {string} fontModel Model used for text
 * @param  {RawGeometryMaterial} material the geometry material of the created text
 * @param  {(data:Text)=>void} data Additional data for text
 * @author UG-Ecko
 
export function text(text: string, fontModel: string, material: RawGeometryMaterial, data?: (data: Text) => void) {
    const txt = new Text(fontModel)
    if (data) {
        data(txt)
    }
    new ModelScene(new Geometry("Cube", material)).static(txt.toObjects(text));
}*/


export class textBuilder {
    json: Json = {}

    constructor(public fontModel: string, public forText: (x: Text) => void) { 
        this.fontModel = fontModel 
        this.forText = forText
    }

    object(obj: GroupObjectTypes) {
        this.json.object = obj
    }
    switch(keyframes: [any, number][]) {
        if(!this.json.object || this.json.object === undefined) { this.json.object = new Geometry("Cube", {
            shader: "Standard", shaderKeywords: [], color: [1,1,1,1]
        })}
        const text = new Text(this.fontModel)

        this.forText(text)

        const scene = new ModelScene(this.json.object)

        keyframes.forEach(x => {
            x.forEach(y => {
                this.json.anim = text.toObjects(y[0], y[1])
            })
        })

        scene.animate(this.json.anim)
    }

}