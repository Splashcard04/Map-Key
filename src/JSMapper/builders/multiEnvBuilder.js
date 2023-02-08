const { Environment } = require(`splashcard_jsmapper`)

module.exports.multiEnvBuilder = class multiEnvBuilder {

    /**environment pieces to select with contains */
    contains(ids = ['string']) { this.contains = ids }

    /**environment pieces to select with regex*/
    regex(ids = ['string$']) { this.regex = ids }

    /**environment pieces to select with exact */
    exact(ids = ['String']) { this.exact = ids }

    /**the modifications to apply to the selected environment objects */
    forEnv(forEnv = (x: Environment) => Environment) { this.forEnv = forEnv }

    /**push the modified environment pieces to the difficulty */
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