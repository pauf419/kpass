const Response = require("../responses/response")
const tokenService = require("../service/token.service")
const {isAPIKey} = require('uuid-apikey')

module.exports = async function(req, _, next) {
    try {
        const apikey = req.headers['x-api-key'] || req.query.apikey
        console.log("apikey: " + apikey) 
        if(!apikey || !isAPIKey(apikey)) throw Response.Unauthorized("Invalid key.")
    
        await tokenService.authenticateKey(apikey)
    
        next()
    } catch(e) {
        console.error(e) 
        return next(Response.Unauthorized())
    }
}