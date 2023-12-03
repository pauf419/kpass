const monitorService = require("../service/monitor.service")

class MonitorController {

    async getOrders(req, _, next) {
        try { 
            const {offset, limit} = req.query;
            const orders = await monitorService.getOrders(offset, limit)
            return next(orders)
        } catch(e) {
            console.error(r)
            return next(e)
        }
    }
}   

module.exports = new MonitorController()