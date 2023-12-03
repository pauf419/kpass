const contentService = require("../service/content.service")

class ContentController {
    async getCity(req, _, next) { 
        try { 
            const {offset, limit} = req.query
            const data = await contentService.getCity(offset, limit)
            return next(data)
        } catch(e) {
            console.error(e)
            return next(e)
        }
    }

    async getProduct(req, _, next) {
        try { 
            const {offset, limit} = req.query
            const data = await contentService.getProduct(offset, limit) 
            return next(data)
        } catch(e) {
            console.error(e)
            return next(e)
        }
    }

    async getAreas(req, _, next) { 
        try {
            const {id} = req.query 
            if(!id || id.trim() === "") throw Response.BadRequest()
            const data = await contentService.getAreas(id)
            return next(data)
        } catch(e)   {
            console.error(e) 
            return next(e)
        }
    }

    async getCityById(req, _, next) {
        try { 
            const {id} = req.query
            if(!id || id.trim()==="") throw Response.BadRequest()
            const data = await contentService.getCityById(id)
            return next(data)
        } catch(e) {
            console.error(e)
            return next(e)
        }
    }

    async getProductById(req, _, next) {
        try { 
            const {id} = req.query 
            if(!id || id.trim() === "") throw Response.BadRequest()
            const data = await contentService.getProductById(id)
            return next(data)
        } catch(e) {
            console.error(e)
            return next(e)
        }
    }
}

module.exports = new ContentController()