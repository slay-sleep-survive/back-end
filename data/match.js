const RandomNumberGenny = require("../helperFunctions/RandomNumberGenny")
const log = require("../helperFunctions/log")

let matchArr = []
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
    matchArr = matchArr.filter(match => match.id !== matchId)
    randomNumberGenerator.remove(matchId)
}

module.exports = {
    createMatch,
    findAllMatches,
    findMatchById,
    removeMatchById
}
