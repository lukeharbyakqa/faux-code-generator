const fs = require("fs");
const fetch = require("node-fetch");
const { JSDOM } = require("jsdom");
const express = require("express");
const app = express();

import { Server } from "socket.io";
import FauxCode from "./src/FauxCode";
import { gists } from "./src/gists";
import { generateRandomInteger } from "./src/utils";

const PORT = 8080;
const SOCKET_PORT = 3000;
let interval = 5000;
const io = new Server(SOCKET_PORT);

const options = {
  theme: "dark", // 'light' or 'dark' mode
  fontSize: 5, // Line thickness and width
  leading: 10, // Space between lines
  lineCap: "square", // Line ends 'square' or 'round'
  margin: 50, // Space between canvas edges and code block
  lineNumbers: true, // Whether or not to include line numbers
  lineNumberOffset: -3, // Line number offset from margin
};

const getRandomGists = () => {
  interval = generateRandomInteger(5000, 12000); // get random milliseconds between 5 - 12s
  let now = new Date();
  now = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
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
      console.log(`rndGist: ${rndGist}. Time: ${now}`);
      return codeBlock;
    })
    .then((codeBlock) => {
      const fauxCode = new FauxCode(codeBlock, options);
      fs.writeFileSync(filename, fauxCode.render());
    })
    .then(() => {
      io.on("connection", (socket) => {
        socket.emit("imageUpdate", "Image updated");
        socket.on("customMessage", (arg) => {
          console.log(arg);
        });
        console.log("Server should be emiting message");
      });
    });
};

getRandomGists();

setInterval(() => {
  getRandomGists();
}, interval);

app.use(express.static("public"));

app.listen(PORT, () => console.log(`Server listening on: ${PORT}`));
