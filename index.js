// Evolution simulator thing by Dukemz lol (alpha)
console.log("evolution sim lmao");
// le file loading
const config = require('./config.json');

const GameServer = require('./classes/GameServer');
const server = new GameServer(config);
console.log(server);

server.start(config);