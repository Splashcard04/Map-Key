
/**
 * log something to show that it is MapKey's linting
 * @param { string } msg the message to log with the MapKey label
 * @param { boolean } err is the message logged an error or not? (defaults to false)
 */
module.exports.MKLog = function MKLog(msg = "bro this logging function is so cool", err = false) {
    let error = false
    if(!err) { error = false } else { error = true }

    if(error === false) {
        console.log(`\x1b[32m [MapKey]:` + `\x1b[1m \x1b[37m ${msg}`)
    } else {
        console.log(`\x1b[1m \x1b[31m [Error In MapKey]:` + `\x1b[1m \x1b[37m ${msg}`)
    }
}