const fs = require("fs");
const fetch = require("node-fetch");
const { JSDOM } = require("jsdom");
const express = require("express");
const app = express();
const PORT = 8080;
const SOCKET_PORT = 3000;
const INTERVAL = 5000;

import { Server } from "socket.io";
import FauxCode from "./src/FauxCode";
import { gists } from "./src/gists";

const io = new Server(SOCKET_PORT);

let options = {
  theme: "light", // 'light' or 'dark' mode
  fontSize: 5, // Line thickness and width
  leading: 10, // Space between lines
  lineCap: "round", // Line ends 'square' or 'round'
  margin: 50, // Space between canvas edges and code block
  lineNumbers: true, // Whether or not to include line numbers
  lineNumberOffset: -3, // Line number offset from margin
};

options = {
  theme: "dark",
  lineCap: "square",
};

const getRandomGists = () => {
  // Input: Let's get a random github gist
  const rndGist = gists[Math.floor(Math.random() * gists.length)].toString();
  // Let's generate an output: SVG file
  const filename = "./public/img/fauxcode.svg";
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
    });
};

getRandomGists();

setInterval(() => {
  getRandomGists();
  console.log(`Now: ${Date()}`);
}, INTERVAL);

app.use(express.static("public"));

app.listen(PORT, () => console.log(`Server listening on: ${PORT}`));

io.on("connection", (socket) => {
  socket.emit("hello", "world");
  socket.on("customMessage", (arg) => {
    console.log(arg);
  });
});
