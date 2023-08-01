const socket = io("ws://localhost:3000");

socket.on("imageUpdate", (arg) => {
  reloadImg("../img/fauxcode.svg");
  console.log(arg, `reloadImg from client`);
});

function reloadImg(url) {
  const now = new Date().getTime();
  fetch(url, { cache: "reload", mode: "no-cors" });
  const wrapper = document.body.querySelector(".code");
  wrapper.setAttribute(`src`, `${url}?timestamp=${now}`);
  socket.emit("customMessage", "Emiting from the client!");
}
