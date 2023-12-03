const pool = require("../utils/db")
const {v4} = require("uuid")
const Response = require("../responses/response")

class PuchaseService { 

    async processOrder(payload) {
        const city = await pool.query("SELECT * FROM city WHERE id = $1", [payload.city]).then(data => data.rows[0]) 
        if(!city) throw Response.BadRequest("Cannot find city with specified id.")
        const area = await pool.query("SELECT * FROM area WHERE id = $1", [payload.area]).then(data => data.rows[0])
        if(!area) throw Response.BadRequest("Cannot find area with specified id.")
        const product = await pool.query("SELECT * FROM product WHERE id = $1", [payload.product]).then(data => data.rows[0])
        if(!product) throw Response.BadRequest("Cannot find product with specified id.")
        const purchaseData = await pool.query("INSERT INTO ord(id, city, area, product, orderid, price, userid) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [
                v4(), 
                payload.city, 
                payload.area, 
                payload.product, 
                payload.orderid, 
                product.price,
                payload.userid
            ]
        ).then(data => data.rows[0])

        return Response.OK(purchaseData)
    }
}

module.exports = new PuchaseService()