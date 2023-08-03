import { delay } from "./utils.js";

const socket = io("ws://localhost:3000");

const wrapper = document.querySelector(".wrapper");
const fadeInClass = "fade-in";
const fadeOutClass = "fade-out";
const pendingClass = "pending";
const invertClass = "invert";
const interval = 1000;
let theme;

socket.on("imageUpdate", (arg) => {
  getNewImage(`./img/fauxcode__${arg.data}.svg`);
  theme = arg.theme;
});

function getNewImage(url) {
  fetch(url);
  const fadeIn = wrapper.querySelectorAll(`.${fadeInClass}`);
  const fadeOut = wrapper.querySelectorAll(`.${fadeOutClass}`);
  const template = `<li class=${pendingClass}><img src=${url} alt="AKQA Developer Day 2023" /></li>`;
  wrapper.insertAdjacentHTML("beforeend", template);
  fadeOut.forEach((item) => item.classList.remove(fadeOutClass));
  delay(interval * 2);
  if (fadeIn.length >= 1) {
    fadeIn.forEach((item) => {
      item.classList.add(fadeOutClass);
      item.classList.remove(fadeInClass);
    });
    delay(interval);
    fadeOut.forEach((item) => item.remove());
  }
  wrapper.querySelector(`.${pendingClass}`).classList.replace(pendingClass, fadeInClass);
  theme === "light" ? document.documentElement.classList.add(invertClass) : document.documentElement.classList.remove(invertClass);
}
