const app = require("./app");
// const socket = require("socket.io");

const { connectDatabase } = require("./config/database");
const cloudinary = require("cloudinary");
connectDatabase();

cloudinary.config({
  cloud_name: "dzw3zj10o",
  api_key: "793261822956692",
  api_secret: "ZHnmjpQCKe_NtIuR0TpYlUp8Mfo",
});

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

// //socket.io setup for chat system
// const io = socket(server, {
//   cors: {
//     origin: "http://localhost:3001",
//     credentials: true,
//   },
// });

// global.onlineUsers = new Map();
// io.on("connection", (socket) => {
//   global.chatSocket = socket;
//   socket.on("add-user", (userId) => {
//     onlineUsers.set(userId, socket.id);
//   });

//   socket.on("send-msg", (data) => {
//     const sendUserSocket = onlineUsers.get(data.to);
//     if (sendUserSocket) {
//       socket.to(sendUserSocket).emit("msg-recieve", data.msg);
//     }
//   });
// });
