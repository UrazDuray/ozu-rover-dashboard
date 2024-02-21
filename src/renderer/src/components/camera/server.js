/*const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});
io.on('connection', socket => {
  console.log('a user connected');
  
  socket.on('stream', video => {
    socket.broadcast.emit('stream', video);
  });
  console.log('A stream');
  console.log(typeof video);
  console.log(video);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
io.on('disconnect', () => {
  console.log('User has left !');
});
http.listen(5555, () => {
  console.log('listening on *:3333');
});

*/
const express = require('express');
const app = express();

var globalMsg = null;

const dgram = require('node:dgram');
const server = dgram.createSocket('udp4');


server.on('error', (err) => {
    console.error(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    console.log(msg);
    globalMsg = msg;

});

server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(3333);
// Prints: server listening 0.0.0.0:41234

// API endpoint'i oluşturun
app.get('/api/globalMsg', (req, res) => {
  res.json({ globalMsg });
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

