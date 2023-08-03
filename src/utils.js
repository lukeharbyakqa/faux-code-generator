import fs from "fs";
import path from "path";

export const cleanUpOldFiles = (interval) => {
  const imgDir = path.join(__dirname, "../public/img/");

  fs.readdir(imgDir, function (err, files) {
    files = files.filter((item) => item.startsWith("fauxcode"));
    if (files.length) {
      files.forEach(function (file, index) {
        fs.stat(path.join(imgDir, file), function (err, stat) {
          let endTime;
          let now;
          if (err) {
            return console.error(err);
          }
          now = new Date().getTime();
          endTime = new Date(stat.ctime).getTime() + interval;
          if (now > endTime) {
            fs.rmSync(path.join(imgDir, file), {
              force: true,
            });
          }
        });
      });
    }
  });
};

export const generateRandomInteger = (min, max) => {
  return Math.floor(min + Math.random() * (max - min + 1));
};

export const options = {
  theme: "dark", // 'light' or 'dark' mode
  fontSize: 8, // Line thickness and width. Default 5
  leading: 15, // Space between lines. Default 10
  lineCap: "square", // Line ends 'square' or 'round'
  margin: 50, // Space between canvas edges and code block
  lineNumbers: false, // Whether or not to include line numbers. Default true
  lineNumberOffset: -3, // Line number offset from margin
};

export const delay = (interval) => {
  return new Promise((resolve) => setTimeout(resolve, interval));
};
