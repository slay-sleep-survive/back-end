const log = require("../helperFunctions/log")

let userArr = []

const createUser = (username, socketId) => {
    const newUser = { socketId, username }
    userArr.push(newUser)

    log("New user created:", newUser)
    return newUser
}

const findAllUsers = () => {
    return userArr
}

const findUserById = socketId => {
    const user = userArr.find(user => user.socketId === socketId)
    if (!user) return null
    else return user
}

const removeUserById = socketId => {
    userArr = userArr.filter(user => user.socketId !== socketId)
}

module.exports = {
    createUser,
    findAllUsers,
    findUserById,
    removeUserById
}
