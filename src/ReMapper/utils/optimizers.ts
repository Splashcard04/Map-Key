import {
  activeDiffGet,
  copy,
  RawGeometryMaterial,
} from "https://deno.land/x/remapper@3.1.1/src/mod.ts";

export type materialNamingMethods =
  | "Numbered"
  | "By Properties"
  | "Geometry Type Numbered"
  | "Shader Numbered";

/**
 * Converts all identical materials on geometry into a single map-wide material.
 * @param namingMethod Decides the way to name the created materials. Defaults to numbered.
 */
export function optimizeMaterials(
  namingMethod: materialNamingMethods = "Numbered",
) {
  activeDiffGet().geometry((arr) => {
    let i = 0;
    arr.forEach((geo) => {
      let copied = false;
      if (typeof geo.material !== "string") {
        const mat = copy(geo.material);
        let name: string;
        if (namingMethod == "By Properties") {
          name =
            `${mat.color?.join()}${mat.shader}${mat.shaderKeywords?.join()}${mat.track}`;
        } else if (namingMethod == "Geometry Type Numbered") {
          name = `${geo.type}${i}`;
        } else if (namingMethod == "Shader Numbered") {
          name = `${mat.shader}${i}`;
        } else {
          name = i.toString();
        }
        geo.material = name;
        activeDiffGet().geometry((ray) => {
          ray.forEach((x) => {
            const xmat = x.material as RawGeometryMaterial;
            if (
              mat.shader == xmat.shader && mat.color == xmat.color &&
              mat.shaderKeywords == xmat.shaderKeywords &&
              mat.track == xmat.track
            ) {
              copied = true;
              x.material = name;
            }
          });
        });
        if (copied) {
          activeDiffGet().geoMaterials[name] = mat;
          i++;
        } else {
          geo.material = mat;
        }
      }
    });
  });
}
