import { ModelScene, Text, Geometry, RawGeometryMaterial } from 'https://deno.land/x/remapper@3.1.1/src/mod.ts'

/**
 * @param  {string} text Text Input
 * @param  {string} fontModel Model used for text
 * @param  {RawGeometryMaterial} material the geometry material of the created text
 * @param  {(data:Text)=>void} data Additional data for text
 * @author UG-Ecko
 */
export function text(text: string, fontModel: string, material: RawGeometryMaterial, data?: (data: Text) => void) {
    const txt = new Text(fontModel)
    if (data) {
        data(txt)
    }
    new ModelScene(new Geometry("Cube", material)).static(txt.toObjects(text));
}
