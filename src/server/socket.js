const { Server } = require("socket.io");
const constants = require("../constants");

module.exports = async function (server) {
  try {
    const postsConsumer = await require("../kafka/kafkaConsumer")(
      constants.TOPIC_POSTS,
      ({ from, to, message }) => {
        console.log("Emmiting to all chanels", message);
        io.sockets.emit("new-article", { message });
      }
    );

    const io = new Server(server, {
      path: "/",
    });

    io.on("connection", (socket) => {
      console.log("a user connected", socket.id);
      socket.on("disconnect", () => {
        console.log("User disconnect", socket.id);
      });
    });

    io.on("error", (error) => {
      console.log("Socket error", error);
    });
    server.listen(8080, () => {
      console.log("Socket listening on port 8080");
    });
  } catch (error) {
    console.log(error.message);
  }
};
