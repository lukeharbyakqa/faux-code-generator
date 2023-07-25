import * as fs from "fs";
import http from "http";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import FauxCode from "./src/FauxCode";
import { gists } from "./src/gists";

const PORT = 8080;

// Input: Let's get a random github gist
const rndGist = gists[Math.floor(Math.random() * gists.length)].toString();

// Let's generate an output: SVG file
const filename = "./fauxcode.svg";

const options = {
  theme: "light", // 'light' or 'dark' mode
  fontSize: 5, // Line thickness and width
  leading: 10, // Space between lines
  lineCap: "square", // Line ends 'square' or 'round'
  margin: 50, // Space between canvas edges and code block
  lineNumbers: true, // Whether or not to include line numbers
  lineNumberOffset: -3, // Line number offset from margin
};

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

const startServer = () => {
  fs.readFile("./index.html", (err, html) => {
    if (err) {
      throw err;
    }
    http
      .createServer((req, res) => {
        res.writeHeader(200, { "Content-Type": "text/html" });
        res.write(html);
        res.end();
      })
      .listen(PORT);
    console.log(`Listening on port: ${PORT}`);
  });
};

startServer();
