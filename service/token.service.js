const Response = require("../responses/response")
const pool = require("../utils/db")
const UUIDApiKey = require('uuid-apikey');

class TokenService { 
    
    createKey() {
        const {uuid, apiKey} = UUIDApiKey.create()
        return {
            uuid, apiKey
        }
    }

    async authenticateKey(key) {
        const token = await pool.query("SELECT * FROM apikey WHERE xapikey = $1", [key]).then(data => data.rows[0])
        console.log(key)
        if(!token) throw Response.Unauthorized("Undefined token")
        return {
            ...token
        }
    }
}   

module.exports = new TokenService()