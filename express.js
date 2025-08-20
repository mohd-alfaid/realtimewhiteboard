// server side
const express = require("express");
const app = express();
const server = require("http").Server(app);
const path = require("path");
const io = require("socket.io")(server);

app.use(express.static("public")); // client files

// socket.io connection
io.on("connection", function(socket) {
  console.log("New user connected");

  socket.on("size", size => socket.broadcast.emit("onsize", size));
  socket.on("color", color => socket.broadcast.emit("oncolor", color));
  socket.on("toolchange", tool => socket.broadcast.emit("ontoolchange", tool));
  socket.on("hamburger", () => socket.broadcast.emit("onhamburger"));

  socket.on("mousedown", point => socket.broadcast.emit("onmousedown", point));
  socket.on("mousemove", point => socket.broadcast.emit("onmousemove", point));

  socket.on("undo", () => socket.broadcast.emit("onundo"));
  socket.on("redo", () => socket.broadcast.emit("onredo"));

  // ✅ Clear All
  socket.on("clearAll", () => socket.broadcast.emit("clearAll"));

  // Theme change
  socket.on("themeChange", theme => socket.broadcast.emit("onthemeChange", theme));
});

// start server
const port = process.env.PORT || 3000;
server.listen(port, () => console.log("Server started at port", port));
