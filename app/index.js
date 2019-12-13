const matchDatabase = require("../data/match")
const userDatabase = require("../data/user")
const log = require("../helperFunctions/log")

const app = io => socket => {
    log("socket Connection")
    log(socket.id)

    socket.on("viewChanged", () => {
        log("View Changed!")
    })

    socket.on("createMatch", username => {
        const user = userDatabase.createUser(username, socket.id)
        const newMatch = matchDatabase.createMatch(user)
        if (newMatch) {
            socket.emit("matchCreated")
            socket.emit("matchInfo", newMatch)
            socket.emit("view", "GAME_SETTINGS")
        } else socket.emit("createMatchFail")
    })

    socket.on("joinMatch", (matchId, username) => {
        const user = userDatabase.createUser(username, socket.id)
        const joinMatch = matchDatabase.addUserToMatch(matchId, user)
        if (newMatch) {
            socket.emit("matchInfo", joinMatch)
            socket.emit("view", "GAME_SETTINGS")
        } else socket.emit("joinMatchFail")
    })

    socket.on("findAllMatches", () => {
        const allMatches = matchDatabase.findAllMatches()
        socket.emit("allMatchesReturn", allMatches)
    })
}

module.exports = app
