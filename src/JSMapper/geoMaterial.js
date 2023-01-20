const { diff } = require(`splashcard_jsmapper`)

module.exports.geoMaterial = class geoMaterial {
    /**
     * make a geometry material
     * @param { string } name the name of the created mateiral
     * @param { string } shader the shader of the created material
     */
    constructor(settings = { name: "hi", shader: "Standard", color: [1, 1, 1, 1], shaderKeywords: ["string"], track: "track"}) {
        const material = "hei": {
            "shader": settings.shader, "color": settings.color, "shaderKeywords": settings.shader, "track": settings.track
        }

        diff.customData.mateirals = diff.customData.mateirals + material
    }
}