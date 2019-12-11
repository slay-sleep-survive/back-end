const server = require("./server");

const PORT = process.env.PORT || 2019;
server.listen(PORT, () => console.log("\n=== Listening on post " + PORT + " ===\n"))