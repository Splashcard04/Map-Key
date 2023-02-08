const { Environment } = require(`splashcard_jsmapper`)

module.exports.multiEnv = class multiEnv {
    constructor(settings = { contains: ["string"], regex: ["string"], exact: ["string"], forEnv = (x = Environment) => x }) {
        this.contains = settings.containsl
        this.regex = settings.regex
        this.exact = settings.exact
    }

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