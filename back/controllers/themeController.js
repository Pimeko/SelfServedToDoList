var theme = null

get = async () => {
    return theme
}

update = async(body) => {
    theme = body.value
    return "Changed theme to : " + body.value
}

module.exports = {
    get,
    update,
}