const { diff } = require(`splashcard_jsmapper`)

module.exports.geoMaterialBuilder = class geoMaterialBuilder {
    /**
     * build a geometry material
     * @param { string } name the name of the geometry material
     * @method shader the shader of the geometry material
     * @method color the color of the geometry material
     * @method shaderKeywords the shaderKeywords of the material
     * @method track the track to animate the color of the material
     * @method push push the material to the difficulty
     */
    constructor(name = "name") { this.name = name }

    /**apply the shader of the geometry material */
    shader(shader = "Standard") { this.shader = shader }

    /**apply the color of the geometry material */
    color(color = [1, 1, 1, 1]) { this.color = color }

    /**apply shaderkeywords to the geomtry material */
    shaderKeywords(keywords = "hello") { this.shaderKeywords = keywords }

    /**apply a track to animate the color of the material */
    track(track = "track") { this.track = track }

    /**push the material to the materials section of the difficulty */
    push() {
        map.customData.materials[this.name] = this
    }
}