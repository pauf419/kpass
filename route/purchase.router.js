const Router = require("express")
const router = new Router()
const purchaseController = require("../controller/purchase.controller")
 
router.post("/", purchaseController.processOrder)

module.exports = router