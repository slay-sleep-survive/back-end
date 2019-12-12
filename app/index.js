const matchDatabase = require("../data/match")

const app = socket => {
    console.log("socket Connection")
    console.log(socket.id)
    
    socket.on("viewChanged", () => {
        console.log("View Changed!")
    })
    
    socket.on("createMatch", username => {
        const newMatch = matchDatabase.createMatch(username, socket.id)
        if (newMatch) {
            socket.emit("matchCreated")
            socket.emit("matchInfo", newMatch)
            socket.emit("view", "GAME_SETTINGS")
        } else socket.emit("matchCreationFail")
    })
    
    socket.on("joinMatch", matchLink => {
        if (matchLink) {
            const joinMatch = matchDatabase.findMatchByLink(matchLink)
            socket.emit("matchInfo", joinMatch)
        }
        
        socket.emit("view", "CREATE_USER")
    })

    socket.on("findAllMatches", () => {
        const allMatches = matchDatabase.findAllMatches()
        socket.emit("allMatchesReturn", allMatches)
    })

}

module.exports = app
