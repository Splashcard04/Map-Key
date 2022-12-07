import { ColorType } from "https://deno.land/x/remapper@3.0.0/src/mod.ts"

/**
 * convert rgb values easily
 * @param rgbVal input your array of rgb 255-255!
 * @returns beat saber compatible rgb values
 * @author splashcard__
 * @suggested scuffedItalian
 */


export function rgb(value: ColorType) {
  const val1 = value[0] / 255
  const val2 = value[1] / 255
  const val3 = value[2] / 255
  const val4 = value[3]
  return [val1, val2, val3, val4] as ColorType
}