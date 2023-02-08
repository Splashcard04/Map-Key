const { diff } = require(`splashcard_jsmapper`)

module.exports.geoMaterial = class geoMaterial {
    /**
     * 
     * @param { string } name the name of the created geometry mateiral
     * @param { string } shader the shader of the mateiral
     * @param { number[] } color the color of the material
     * @param { string } track the track to animate the color of the material
     * @param { string[] } shaderKeywords the shaderKewords of the material
     * @method push push the material to the matterial section of the difficulty
     */
    constructor(name = "hello", settings = { shader: "Standard", color: [1, 1, 1, 1], track: "track", shaderKeywords: [] }) {
        this.name = name
        this.shader = settings.shader
        this.color = settings.color
        this.shaderKeywords = settings.shaderKeywords
        this.track = settings.track
    }

    /**push the material to the difficulty */
    push() {
        diff.customData.materials[this.name] = this
    }
}