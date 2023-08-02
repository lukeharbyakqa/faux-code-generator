const socket = io("ws://localhost:3000");

const wrapper = document.querySelector(".code");
const logo = document.querySelector(".logo");
const fadeInClass = "fade-in";
const fadeOutClass = "fade-out";

socket.on("imageUpdate", (arg) => {
  wrapper.classList.add(fadeOutClass);
  // delay(1000);
  // reloadImg(`../img/fauxcode__${arg.data}.svg`);
  wrapper.classList.remove(fadeOutClass);
  // delay(1000);
  wrapper.classList.add(fadeInClass);
  console.log(JSON.stringify(arg), `uniqueID at client: ${JSON.stringify(arg.data)}`);
});

function reloadImg(url) {
  fetch(url, { cache: "reload", mode: "no-cors" });
  // wrapper.setAttribute(`src`, `${url}?timestamp=${now}`);
  const img = document.createElement("img");
  img.classList.add("code");
  img.setAttribute(`src`, url);
  img.after(logo);
}
