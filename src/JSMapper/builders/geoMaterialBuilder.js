const { diff } = require(`splashcard_jsmapper`)

module.exports.geoMaterialBuilder = class geoMaterialBuilder {
    constructor(name = "name") { this.name = name }

    shader(shader = "Standard") { this.shader = shader }
    color(color = [1, 1, 1, 1]) { this.color = color }
    shaderKeywords(keywords = "hello") { this.shaderKeywords = keywords }
    track(track = "track") { this.track = track }

    push() {
        map.customData.materials[this.name] = this
    }
}