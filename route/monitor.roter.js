const Router = require("express")
const router = new Router()
const monitorController = require("../controller/monitor.controller")
const authMiddleware = require("../middleware/auth.middleware")
 
router.get("/orders",authMiddleware,  monitorController.getOrders)

module.exports = router  