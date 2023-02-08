const { Environment } = require(`splashcard_jsmapper`)

module.exports.multiEnvBuilder = class multiEnvBuilder {
    contains(ids = ['string']) { this.contains = ids }
    regex(ids = ['string$']) { this.regex = ids }
    exact(ids = ['String']) { this.exact = ids }
    forEnv(forEnv = (x: Environment) => Environment) { this.forEnv = forEnv }

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