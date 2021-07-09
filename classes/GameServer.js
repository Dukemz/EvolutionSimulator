// le module loading
const express = require('express');
const path = require('path');
const fs = require('fs');

module.exports = class GameServer {
  /**
   * Someone please tell me how to use jsdoc correctly
   * @constructor
   */
  constructor(cfg) { // construct server
    if(!cfg || typeof cfg !== "object") throw new RangeError("Invalid configuration object");
    this.config = cfg;
    this.running = false;

    this.app = express();
    this.http = require("http").createServer(this.app);
    this.io = require("socket.io")(this.http);

    this.app.get('*', function(req, res) {
      const ip = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',')[0] : req.ip;
      console.log(`GET request to [${req.url}] from ${ip}`)
      
      if(req.url.includes('package') || req.url.includes('node_modules')) {
        res.status(403).send("lol no");
        return false;
      }
      const file = path.resolve(__dirname + '/..') + req.url;
      if(!fs.existsSync(file)) {
        res.status(404).send("yo that doesn't exist");
        return false;
      } else {
        res.sendFile(file);
      }
    });
    return true; // returns true if successful
  }

  async start() { // start the server
    // first will need to promisify the listen function
    // const serverlisten = require("util").promisify(this.http.listen);
    // listen on whatever port i guess lol
    // await serverlisten(process.env['PORT']);
    // return process.env['PORT'];

    const port = process.env['PORT'];
    return this.http.listen(port, () => {
      console.log(`Server online - listening on port ${port}.`);
      // updateInterval = setInterval(() => io.sockets.emit('update', data), 10);
    });
  }
}
