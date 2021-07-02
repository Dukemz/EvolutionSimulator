// Evolution simulator thing by Dukemz lol (alpha)

// le file loading
const config = require('./config.json');



// listen on whatever port i guess lol
// (change 3000 to env variable later)
http.listen(3000, () => {
  console.log(`Server online - listening on port 3000.`);
  // updateInterval = setInterval(() => io.sockets.emit('update', data), 10);
});