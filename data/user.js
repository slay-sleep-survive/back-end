const log = require("../helperFunctions/log")

const userArr = []

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
    const indexToRemove = userArr.findIndex(user => user.socketId === socketId)
    if (indexToRemove === -1) {
        return 0
    }
    userArr.splice(indexToRemove, 1)
    return 1
}

module.exports = {
    createUser,
    findAllUsers,
    findUserById,
    removeUserById
}
