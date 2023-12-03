
const Response = require("../responses/response")
const adminService = require("../service/admin.service")
const logic = require("../utils/logic")


class AdminController {

    async getPurchases(_, __, next) {
        try {
            const purchases = await adminService.getPurchases()
            return next(purchases)
        } catch(e) {
            console.error(e)
            return next(e) 
        }
    }

    async removeCity(req, _, next) {
        try { 
            const {id} = req.body
            if(!id || id.trim()==="") throw Response.BadRequest()
            const data = await adminService.removeCity(id)
            return next(data)
        } catch(e) {
            console.error(e)
            return next(e)
        }
    }
    
    async addCity(req, _, next) { 
        try { 
            const {name} = req.body 
            if(!name || name.trim() === "") throw Response.BadRequest()
            const data = await adminService.addCity(name)
            return next(data)
        } catch(e) {
            console.error(e)
            return next(e)
        }
    }

    async removeArea(req, _, next) { 
        try { 
            const {id} = req.body
            if(!id || id.trim() === "") throw Response.BadRequest()
            const data = await adminService.removeArea(id)
            return next(data)
        } catch(e) {
            console.error(e)
            return next(e)
        }
    }

    async addArea(req, _, next) {
        try { 
            const payload =  {
                parent: req.body.parent,
                name: req.body.name
            }

            if(logic.regexobject(payload)) throw Response.BadRequest()
            const data = await adminService.addArea(payload.parent, payload.name)
            return next(data)
        } catch(e) {
            console.error(e)
            return next(e)
        }
    }

    async removeProduct(req, _, next) {
        try { 
            const {id} = req.body 
            if(!id || id.trim() === "") throw Response.BadRequest()
            const data = await adminService.removeProduct(id)
            return next(data)
        } catch(e) {
            console.error(e)
            return next(e)
        }
    }

    async addProduct(req, _, next) {
        try { 
            const payload = { 
                price: req.body.price, 
                name: req.body.name
            }
            if(logic.regexobject(payload)) throw Response.BadRequest()
            const data = await adminService.addProduct(payload.name, payload.price) 
            return next(data)
        } catch(e) {
            console.error(e)
            return next(e)
        }
    }

    async initApiKey(_, __, next) { 
        try { 
            const res = await adminService.initApiKey()
            return next(res)
        } catch(e) {
            console.error(e)
            return next(e)
        }
    }

    async verifyAcces(_, __, next) {
        try {
            return next(Response.OK())
        } catch(e) {
            console.error(e)
            return next(e)
        }
    }
}

module.exports = new AdminController()