// Evolution Simulator by Dukemz (alpha) //

// Setup.
const socket = io();
function setup() { // p5.js setup function
  // Create the canvas
  createCanvas(600, 600);
  // Remove outline on players
  noStroke();
}
// Random colour/position functions 
function randomCol() { return {r:Math.random()*255, g:Math.random()*255, b:Math.random()*255}; }
function randomPos() { return {x:Math.round(Math.random()*584), y:Math.round(Math.random()*584)}; }

// Keys, such as movement (WASD)
const keys = {
  W: 87,
  A: 65,
  S: 83,
  D: 68
}

/* old code loggers

const socket = io();
function setup() {
  // Create the canvas
  createCanvas(600, 600);
  // Remove outline on players
  noStroke();
};
function randomCol() { return {r:Math.random()*255, g:Math.random()*255, b:Math.random()*255}; }
function randomPos() { return {x:Math.round(Math.random()*584), y:Math.round(Math.random()*584)}; }

function makeCreature() {
  if(me.creatures.length < 5) {
    socket.emit('makeCreature', randomPos()); 
  } else {
    alert("You can't have more than 5 creatures at once.");
  }
}

// Create the movement keys
const W = 87;
const A = 65;
const S = 83;
const D = 68;

// Update & Events //

socket.on('pong', () => { // Event for calculating ping
  latency = Date.now() - startTime;
  document.getElementById('ping').innerHTML = `Ping: ${latency}ms`
});
socket.on('radio', radio => console.log(radio));
socket.on('alert', msg => alert(msg));

// This event triggers when recieving an update from the server.
socket.on("update", rdata => {
  
  // Set the local data to the data recieved from the server
  window.data = rdata;
  // Set the background to 50, clearing the canvas
  background(50);

  // Check if the movement keys are pressed, if so then send an event
  if(keyIsDown(W)) socket.emit("move", W);
  if(keyIsDown(A)) socket.emit("move", A);
  if(keyIsDown(S)) socket.emit("move", S);
  if(keyIsDown(D)) socket.emit("move", D);

  window.me = data.players[socket.id];
  document.getElementById('count').innerHTML = `${Object.keys(data.players).length} player(s)`;
  document.getElementById('fps').innerHTML = `${Math.round(frameRate())} FPS`;
  
  // Display each player
  for(let playerID of Object.keys(data.players)) {
    // Get the the player from the player's id
    let player = data.players[playerID];

    // Draw each of their creatures
    for(let creature of player.creatures) {
      // Draw the creature
      fill(player.color.r, player.color.g, player.color.b);
      rect(creature.pos.x, creature.pos.y, creature.size, creature.size);
    }
  }
});

socket.on('connect', () => { // Whenever successfully connected to the server
  document.title = "Dukemz's Evolution Simulator";
  console.log("Socket connected.");

  window.pingInterval = setInterval(function() {
    window.startTime = Date.now();
    socket.emit('ping');
  }, 2000);
});

socket.on('disconnect', () => { // Whenever disconnected from the server
  background(50);
  document.title = "DES (not connected)";
  console.log("Socket disconnected.");
  clearInterval(pingInterval);
  alert("Disconnected from the server. The game should attempt to automatically reconnect.");

  document.getElementById('ping').innerHTML = `Ping: ---ms`;
  document.getElementById('count').innerHTML = `0 player(s)`;
});

*/