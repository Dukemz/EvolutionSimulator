// Yes, this code is reused from my multiplayer game. Shush
const config = require('./config.json');

const express = require('express');
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const readline = require('readline');

app.use(express.static("public"));

app.get('*', function(req, res) {
  const ip = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',')[0] : req.ip;
  console.log(`GET request to [${req.url}] from ${ip}`)
  if(req.url === '/favicon.ico' || req.url === '/index.js') {
    return res.status(418).send("You can't brew coffee here!");
  }
  if(req.url.includes('package') || req.url.includes('node_modules')) return res.send("Why u touch my stuff?");
  res.sendFile(__dirname + req.url);
});

// Run eval commands
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});
rl.on('line', line => { try {
  console.log(eval(line));
} catch(err) { console.error(err) }
});
console.log("Eval input ready.");

/* Server */
function dcAll() {
  console.log("Disconnecting all players...");
  let n = 0;
  const socks = Array.from(io.sockets.sockets.values());
  for(i in socks) {
    const p = socks[i];
    p.disconnect();
    n++;
  }
  return n;
}
// The data
let data = {players:{}, food:[]};

let width = 600;
let height = 600;

io.on("connection", socket => {
  if(Object.keys(data.players).length >= config.maxPlayers) {
    socket.emit('alert', "Sorry, but the server is full right now. Please wait for someone to disconnect.");
    delete data.players[socket.id];
    socket.disconnect();
  }
  // New player connected
  console.log(`Player connected (id ${socket.id}).`);

  // Create new player
  data.players[socket.id] = {
    color: {r:Math.random()*255, g:Math.random()*255, b:Math.random()*255},
    creatures: []
  };

  socket.on('makeCreature', (position) => {
    if(data.players[socket.id].creatures.length < 5) {
      data.players[socket.id].creatures.push({
        size: config.creatureSize,
        speed: config.creatureSpeed,
        pos: position
      });
    }
  });

  socket.on('ping', function() {
    socket.emit('pong');
  });

  socket.on("disconnect", () => {
    console.log(`Player disconnected (id ${socket.id}).`);
    // Delete player
    delete data.players[socket.id];
  });
  // Movement event

  socket.on("msg", msg => {
    console.log(`Message from ${socket.id}: ${msg}`);
    io.sockets.emit('radio', `Message from ${socket.id}: ${msg}`);
  });

  // Modify a user's properties
  socket.on("modify", playerm => {
    if(typeof playerm !== "object") return;
    console.log(`Modifying data for ${socket.id}: ${JSON.stringify(playerm)}`);
    const playerd = data.players[socket.id];
    // Update the data
    data.players[socket.id] = {...playerd, ...playerm}
  });
});
http.listen(3000, () => {
  console.log("Server online - listening on port 3000.");
  updateInterval = setInterval(() => io.sockets.emit('update', data), 10);
});