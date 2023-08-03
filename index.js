const fs = require("fs");
const fetch = require("node-fetch");
const { JSDOM } = require("jsdom");
const express = require("express");
const app = express();

import { Server } from "socket.io";
import FauxCode from "./src/FauxCode";
import { gists } from "./src/gists";
import { options, generateRandomInteger, cleanUpOldFiles } from "./src/utils";

const PORT = 8080;
const SOCKET_PORT = 3000;
let interval = 5000;
const io = new Server(SOCKET_PORT);

// Create an array for the client sockets
let clients = [];
io.on("connection", (socket) => {
  clients.push(socket);
});

const getRandomGists = () => {
  let rndInteger = Math.round(Math.random());
  let uniqueId = generateRandomInteger(10000, 9999999);
  interval = generateRandomInteger(8000, 20000); // get random milliseconds between 8 - 20s
  // Input: Let's get a random github gist
  const rndGist = gists[Math.floor(Math.random() * gists.length)].toString();
  // Let's generate an output: SVG file
  const filename = `./public/img/fauxcode__${uniqueId}.svg`;
  rndInteger === 1 ? (options.theme = "light") : (options.theme = "dark");
  fetch(rndGist)
    .then((res) => res.text())
    .then((body) => {
      const { window } = new JSDOM(body);
      const { document } = window;
      const codeBlock = document.querySelectorAll(".blob-code-inner");
      return codeBlock;
    })
    .then((codeBlock) => {
      const fauxCode = new FauxCode(codeBlock, options);
      fs.writeFileSync(filename, fauxCode.render());
    })
    .then(() => {
      clients.forEach((socket, i) => {
        try {
          socket.emit("imageUpdate", { data: uniqueId, theme: options.theme });
        } catch {
          // remove socket if there was an error
          clients[i] = null;
        }
      });
      // remove "errored" clients
      clients = clients.filter((socket) => socket);
      cleanUpOldFiles(interval * 3); // always more than the minimum interval of 8s
    });
};

getRandomGists();

setInterval(() => {
  getRandomGists();
}, interval);

app.use(express.static("public"));

app.listen(PORT, () => console.log(`Server listening on: ${PORT}`));
