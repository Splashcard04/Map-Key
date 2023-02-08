const { Environment } = require(`splashcard_jsmapper`)

module.exports.multiEnv = class multiEnv {
    /**
     * modify multiple environment pieces with multiple lookup methods
     * @param { string[] } contains the ids to modify with contains
     * @param { string[] } regex the ids to modify with regex
     * @param { string[] } exact the ids to modify with exact
     * @param { (x: Environment) } forEnv the modifications to the environment object 
     * @method push push the modified environment objects to the difficulty
     */
    constructor(settings = { contains: ["string"], regex: ["string"], exact: ["string"], forEnv = (x = Environment) => x }) {
        this.contains = settings.containsl
        this.regex = settings.regex
        this.exact = settings.exact
    }

    /**push the environment to the difficulty */
    push() {
        this.contains.forEach(id => {
            const x = new Environment({
                id: id, lookup: "Contains"
            })

            forEnv(x)
        })

        this.regex.forEach(id => {
            const x = new Environment({
                id: id, lookup: "Regex"
            })

            forEnv(x)
        })

        this.exact.forEach(id => {
            const x = new Environment({
                id: id, lookup: "Exact"
            })

            forEnv(x)
        })
    }
}