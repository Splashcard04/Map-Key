const { diff } = require(`splashcard_jsmapper`)

module.exports.geoMaterial = class geoMaterial {
    constructor(settings = { shader: "Standard", color: [1, 1, 1, 1], shaderKeywords: ["string"], track: "track"}) {
        const material = {
            "shader": settings.shader, "color": settings.color, "shaderKeywords": settings.shader, "track": settings.track
        }

        diff.customData.mateirals = diff.customData.mateirals + material
    }
}