const { diff } = require(`splashcard_jsmapper`)

module.exports.geoMaterial = class geoMaterial {
    constructor(name = "hello", settings = { shader: "Standard", color: [1, 1, 1, 1], track: "track", shaderKeywords: [] }) {
        this.name = name
        this.shader = settings.shader
        this.color = settings.color
        this.shaderKeywords = settings.shaderKeywords
        this.track = settings.track
    }

    push() {
        diff.customData.materials[this.name] = this
    }
}