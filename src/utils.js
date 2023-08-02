export const generateRandomInteger = (min, max) => {
  return Math.floor(min + Math.random() * (max - min + 1));
};

export const options = {
  theme: "dark", // 'light' or 'dark' mode
  fontSize: 13, // Line thickness and width. default 5
  leading: 10, // Space between lines
  lineCap: "square", // Line ends 'square' or 'round'
  margin: 50, // Space between canvas edges and code block
  lineNumbers: true, // Whether or not to include line numbers
  lineNumberOffset: -3, // Line number offset from margin
};
