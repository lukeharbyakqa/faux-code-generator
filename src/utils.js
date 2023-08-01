const generateRandomInteger = (min, max) => {
  return Math.floor(min + Math.random() * (max - min + 1));
};

const _generateRandomInteger = generateRandomInteger;
export { _generateRandomInteger as generateRandomInteger };
