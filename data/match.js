const uuidv4 = require("uuid/v4")

const matchArr = []

const createMatch = (username, socketId) => {
    const rando = uuidv4()
    const newId = `${username[0]}${rando}${username[username.length - 1]}`
    const newMatch = {
        id: newId,
        owner: { username, socketId },
        players: [{ username, socketId }]
    }
    matchArr.push(newMatch)
    return newMatch
}

const findMatchByLink = matchLink => {
    console.log()
    console.log(matchLink)
    const match = matchArr.find(match => match.id === matchLink)
    if (!match) return null
    else return match
}

const findAllMatches = () => {
    return matchArr
}

module.exports = {
    createMatch,
    findAllMatches,
    findMatchByLink
}