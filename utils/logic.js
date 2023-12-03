
class Logic {
    regexobject(o) {
        return Object.values(o).map(e => !e || String(e).trim() === "" ? true : false).includes(true)
    }
}

module.exports = new Logic() 