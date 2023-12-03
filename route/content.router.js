const Router = require("express")
const router = new Router()
const contentController = require("../controller/content.controller")

router.get("/city", contentController.getCity)
router.get("/product", contentController.getProduct)
router.get("/city/:id", contentController.getCityById) 
router.get("/area", contentController.getAreas)
router.get("/product/:id", contentController.getProductById)

module.exports = router  