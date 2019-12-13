const RandomNumberGenny = require("../helperFunctions/RandomNumberGenny")
const log = require("../helperFunctions/log")

const matchArr = []
const randomNumberGenerator = new RandomNumberGenny(36)

const createMatch = (username, socketId) => {
    const id = randomNumberGenerator.generate()
    const newMatch = {
        id,
        owner: { username, socketId },
        players: [{ username, socketId }]
    }
    matchArr.push(newMatch)

    log("New match created:", newMatch)
    return newMatch
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
    const indexToRemove = matchArr.findIndex(match => match.id === matchId)
    if (indexToRemove === -1) {
        return 0
    }
    matchArr.splice(indexToRemove, 1)

    randomNumberGenerator.remove(matchId)
    return 1
}

module.exports = {
    createMatch,
    findAllMatches,
    findMatchById,
    removeMatchById
}
