# faux-code

Convert real code from a Github Gist into an SVG image of faux code.

Forked from: https://github.com/knutsynstad/faux-code

![Example output](https://repository-images.githubusercontent.com/238382657/6409ab00-5037-11ea-9ebe-1e30ed0f7438)

## Index.js

Input:

```js
// GitHub Gist URL
const gist = "https://gist.github.com/knutsynstad/265226120c71426420c78c750a4eb727";
const gists = ["https://gist.github.com/gist1", "https://gist.github.com/gist2", "https://gist.github.com/gist3"];
const rndGist = gists[Math.floor(Math.random() * gists.length)].toString();
```

Output:

```js
// SVG file
const filename = "./fauxcode.svg";
OR;
const filename = `./fauxcode__${uniqueID}.svg`;
```

Options:

```js
const options = {
  theme: "light", // 'light' or 'dark' mode
  fontSize: 5, // Line thickness and width
  leading: 10, // Space between lines
  lineCap: "round", // Line ends 'square' or 'round'
  margin: 50, // Space between canvas edges and code block
  lineNumbers: true, // Whether or not to include line numbers
  lineNumberOffset: -3, // Line number offset from margin
};
```

Sockets:

Use `socket.io` in order to send and receive data between client and server.

From server:

```js
socket.emit("imageUpdate", { data: uniqueId, theme: options.theme });
```

From client:

```js
socket.on("imageUpdate", (arg) => {
  getNewImage(`./img/fauxcode__${arg.data}.svg`);
  theme = arg.theme;
});
```

## Get up and running

Clone the repository:

```
git clone https://github.com/lukeharbyakqa/faux-code-generator.git
```

Install dependencies:

```
npm install
```

Run script:

```
npm run start
```
