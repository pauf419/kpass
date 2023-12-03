const pool = require("../utils/db")
const Response = require("../responses/response")

class MonitorService {

    async getOrders(offset, limit) {
        return Response.OK(await pool.query("SELECT * FROM ord OFFSET $1 LIMIT $2", [offset, limit]).then(data => data.rows))
    }
}   

module.exports = new MonitorService()