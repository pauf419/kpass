const purchaseService = require("../service/purchace.service")
const logic = require("../utils/logic")
const Response = require("../responses/response")

class PurchaseController {

    async processOrder(req, _, next) {
        try { 
            const purchasePayload = {
                city: req.body.city, 
                area: req.body.area, 
                product: req.body.product, 
                userid: req.body.userid,
                orderid: req.body.orderid
            }

            if(logic.regexobject(purchasePayload)) throw Response.BadRequest()

            const orderData = await purchaseService.processOrder(purchasePayload)
            return next(orderData)
        } catch(e) {
            console.error(e)
            return next(e)
        }
    }
}

module.exports = new PurchaseController()