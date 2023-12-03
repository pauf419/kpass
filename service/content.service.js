const pool = require("../utils/db")
const Response = require("../responses/response")

 
class ContentService {  
    async getCity(offset, limit) {
        const parents = await pool.query("SELECT * FROM city OFFSET $1 LIMIT $2", [offset, limit]).then(data => data.rows)
        for(var i=0;i < parents.length;i++) {
            parents[i].areas = await pool.query("SELECT * FROM area WHERE parent = $1", [parents[i].id]).then(data => data.rows)
        }
        return Response.OK(parents)
    }

    async getProduct(offset, limit) {
        return Response.OK(await pool.query("SELECT * FROM product OFFSET $1 LIMIT $2", [offset, limit]).then(data => data.rows))
    }

    async getCityById(id) {
        const city = await pool.query("SELECT * FROM city WHERE id = $1", [id]).then(data => data.rows[0])
        if(!city) throw Response.BadRequest("Cannot find city with specified id.")
        const areas = await pool.query("SELECT * FROM area WHERE parent = $1", [city.id]).then(data => data.rows) 
        return Response.OK({
            ...city, 
            areas
        })
    }

    async getAreas(cityId) { 
        const areas = await pool.query("SELECT * FROM area WHERE parent = $1", [cityId]).then(data => data.rows)
        return Response.OK(areas)
    }

    async getProductById(id) {
        return Response.OK(await pool.query("SELECT * FROM product WHERE id = $1", [id]).then(data => data.rows[0])) 
    }
}

module.exports = new ContentService()