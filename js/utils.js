const getRandomValue = (a, b) =>{
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const checkLength = (str, maxLength) => str.length >= maxLength;

const getRandomArrayItem = (array) => array[getRandomValue(0,array.length-1)];

function *getNumberGenerator(max) {
  let index = 1;
  while (index < max) {
    yield index++;
  }
}

export {getNumberGenerator, getRandomArrayItem, getRandomValue, checkLength};
