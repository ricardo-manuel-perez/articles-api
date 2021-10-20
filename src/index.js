const http = require("http");
const server = http.createServer(require('express')());

const { PORT } = require("./constants");
const app = require("./server/server");
app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});

require("./server/socket")(server);

