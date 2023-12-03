const Router = require("express")
const router = new Router()
const adminController = require("../controller/admin.controller")
const authMiddleware = require("../middleware/auth.middleware")

router.delete("/city",authMiddleware,  adminController.removeCity)
router.put("/city", authMiddleware, adminController.addCity) 
router.delete("/area", authMiddleware, adminController.removeArea)
router.put("/area", authMiddleware, adminController.addArea)
router.delete("/product", authMiddleware, adminController.removeProduct)
router.put("/product", authMiddleware, adminController.addProduct)
router.get("/purchase", authMiddleware, adminController.getPurchases)
router.get("/access", authMiddleware, adminController.verifyAcces)

module.exports = router  