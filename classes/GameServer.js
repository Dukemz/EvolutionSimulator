// le module loading
const express = require('express');
const readline = require('readline');

const http = require("http").createServer(app);
const io = require("socket.io")(http);

module.exports = class GameServer {
  /**
   * Someone please tell me how to use jsdoc correctly
   * @constructor
   */
  constructor(cfg) { // construct server
    this.config = cfg;
    this.running = false;

    this.app = express();
    this.http = require("http").createServer(app);
    this.io = require("socket.io")(http);
  }

  async start() { // start the server

  }
}
