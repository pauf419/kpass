const pool = require("../utils/db")
const {v4} = require("uuid")
const Response = require("../responses/response")
const tokenService = require("./token.service")
const contentService = require("./content.service")

class AdminService {

    async getPurchases() {
        const purchases = await pool.query("SELECT * FROM ord", []).then(data => data.rows)
        for(var i=0;i < purchases.length;i++) {
            const city = await pool.query("SELECT * FROM city WHERE id = $1", [purchases[i].city]).then(data => data.rows[0])
            const area = await pool.query("SELECT * FROM area WHERE id = $1", [purchases[i].area]).then(data => data.rows[0])
            const product = await pool.query("SELECT * FROM product WHERE id = $1", [purchases[i].product]).then(data => data.rows[0])
            console.log(purchases[i].product)
            purchases[i].city = city
            purchases[i].area = area
            purchases[i].product = product
        }
        return Response.OK(purchases)
    }

    async removeCity(id) { 
        return Response.OK(await pool.query("DELETE FROM city WHERE id = $1 RETURNING *", [id]).then(data => data.rows[0]))
    }

    async addCity(name) { 
        const hash_name = name.trim().toLowerCase()
        const similar = await pool.query("SELECT * FROM city WHERE hash_name = $1", [hash_name]).then(data => data.rows)
        if(similar.length) throw Response.BadRequest()
        const city = await pool.query("INSERT INTO city(id, name, hash_name) VALUES($1, $2, $3) RETURNING *", [v4(), name, hash_name]).then(data => data.rows[0])
        return Response.OK({...city, areas: []})
    }

    async removeArea(id) {
        return Response.OK(await pool.query("DELETE FROM area WHERE id = $1 RETURNING *", [id]).then(data => data.rows[0])) 
    }

    async addArea(parent, name) { 
        const hash_name = name.trim().toLowerCase()
        const similar = await pool.query("SELECT * FROM area WHERE hash_name = $1 AND parent = $2", [hash_name, parent]).then(data => data.rows) 
        if(similar.length) throw Response.BadRequest()
        return Response.OK(await pool.query("INSERT INTO area(id, parent, name, hash_name) VALUES($1, $2, $3, $4) RETURNING *", [v4(), parent, name, hash_name]).then(data => data.rows[0])) 
    }

    async removeProduct(id) {
        return Response.OK(await pool.query("DELETE FROM product WHERE id = $1 RETURNING *", [id]).then(data => data.rows[0])) 
    }

    async addProduct(name, price) {
        const hash_name = name.trim().toLowerCase()
        const similar = await pool.query("SELECT * FROM product WHERE hash_name = $1", [hash_name]).then(data => data.rows)
        if(similar.length) throw Response.BadRequest()
        return Response.OK(await pool.query("INSERT INTO product(id, price, name, hash_name) VALUES($1, $2, $3, $4) RETURNING *", [v4(), price, name, hash_name]).then(data => data.rows[0])) 
    }

    async initApiKey() {
        const {uuid, apiKey} = tokenService.createKey()
        const token = await pool.query("INSERT INTO apikey(uuid, xapikey) VALUES ($1, $2) RETURNING *", [uuid, apiKey]).then(data => data.rows[0])
        return Response.OK({token: token.xapikey})
    }
}

module.exports = new AdminService()