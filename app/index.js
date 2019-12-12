const app = socket => {
    console.log("socket Connection")
    console.log(socket.id)
    socket.emit("view", "CREATE_USER");

    socket.on("viewChanged", () => {
        console.log("View Changed!")
    })

    socket.on("createMatch", username => {
        console.log()
        console.log(`Match created with Socket ${socket.id} and username ${username}`)
    })

    socket.on("joinMatch", username => {
        console.log()
        console.log(`Socket ${socket.id}, username ${username}, is looking to join!`)
    })
}

module.exports = app