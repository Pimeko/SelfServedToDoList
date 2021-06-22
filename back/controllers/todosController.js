var todos = null

get = async () => {
    return todos
}

update = async(body) => {
    todos = body.value
    return "Changed todos to : " + body.value
}

module.exports = {
    get,
    update,
}