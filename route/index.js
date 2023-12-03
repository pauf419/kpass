const Router = require("express")
const monitorRouter = require("./monitor.roter")
const purchaseRouter = require("./purchase.router")
const adminRouter = require("./admin.router")
const contentRouter = require("./content.router")

const router = new Router()

router.use("/content", contentRouter)
router.use("/admin", adminRouter)
router.use("/purchase", purchaseRouter)
router.use("/monitor", monitorRouter)

module.exports = router 