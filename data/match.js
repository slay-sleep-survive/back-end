const RandomNumberGenny = require("../helperFunctions/RandomNumberGenny")
const log = require("../helperFunctions/log")

let matchArr = []
const randomNumberGenerator = new RandomNumberGenny(36)

const createMatch = user => {
    const id = randomNumberGenerator.generate()
    const newMatch = {
        id,
        owner: user,
        players: [user]
    }
    matchArr.push(newMatch)

    log("New match created:", newMatch)
    return newMatch
}

const addUserToMatch = (matchId, user) => {
    let updatedMatch
    matchArr = matchArr.map(match => {
        // If out matchId matches up, add in our user
        if (match.id === matchId) {
            updatedMatch = { ...match, players: [...match.players, user] }
            return updatedMatch
        } else return match
    })
    return updatedMatch // Return the newly updated match
}

const removeUserFromMatch = (matchId, socketId) => {
    let updatedMatch
    matchArr = matchArr.map(match => {
        // If our matchId matches up . . .
        if (match.id === matchId) {
            // create the updated match without the user
            updatedMatch = {
                ...match,
                players: match.players.filter(
                    player => player.socketId !== socketId
                )
            }

            // If the user was the owner, set the next player as the new owner
            updatedMatch.owner =
                updatedMatch.owner.socketId === socketId
                    ? updatedMatch.players[0]
                    : updatedMatch.owner
            return updatedMatch
        } else return match
    })
    return updatedMatch // Return the newly updated match
}

const findAllMatches = () => {
    return matchArr
}

const findMatchById = matchId => {
    const match = matchArr.find(match => match.id === matchId)
    if (!match) return null
    else return match
}

const removeMatchById = matchId => {
    matchArr = matchArr.filter(match => match.id !== matchId)
    randomNumberGenerator.remove(matchId)
}

module.exports = {
    createMatch,
    addUserToMatch,
    removeUserFromMatch,
    findAllMatches,
    findMatchById,
    removeMatchById
}
