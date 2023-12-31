const Responses = require("../utils/res.models")

module.exports = class Response {
    status
    msg
    description
    data

    constructor(model) {
        this.status = model.status ? model.status : 500
        this.msg = model.msg ? model.msg : null
        this.description = model.description ? model.description : null
        this.data = model.data ?model.data : null
    }

    static OK(data = null, msg = Responses.OK.msg) {
        return new Response({...Responses.OK, data, msg})
    }

    static Created(data = null, msg = Responses.Created.msg) {
        return new Response({...Responses.Created, data, msg})
    }

    static BadRequest(msg = Responses.BadRequest.msg) {
        return new Response({...Responses.BadRequest, msg})
    }

    static InternalServerError(msg = Responses.InternalServerError.msg) {
        return new Response({...Responses.InternalServerError, msg})
    }

    static Unauthorized(msg) {
        return new Response({...Responses.Unauthorized, msg})
    }
}