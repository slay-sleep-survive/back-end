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
            socket.join(newMatch.id)
            socket.emit("matchInfo", newMatch)
        } else socket.emit("createMatchFail")
    })

    socket.on("joinMatch", (matchId, username) => {
        const user = userDatabase.createUser(username, socket.id)
        const joinMatch = matchDatabase.addUserToMatch(matchId, user)
        if (joinMatch) {
            socket.join(joinMatch.id)
            socket.emit("matchInfo", joinMatch)
            socket.to(joinMatch.id).emit("playerJoined", joinMatch)
        } else socket.emit("joinMatchFail")
    })

    socket.on("findAllMatches", () => {
        const allMatches = matchDatabase.findAllMatches()
        socket.emit("allMatchesReturn", allMatches)
    })

    socket.on("disconnect", matchId => {
        if (matchId) {
            const updatedMatch = matchDatabase.removeUserFromMatch(
                matchId,
                socket.id
            )
            io.to(matchId).emit("playerLeave", updatedMatch)
        }
        userDatabase.removeUserById(socket.id)
    })
}

module.exports = app
