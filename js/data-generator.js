import {getRandomArrayItem, getRandomValue} from './utils.js';
import {names, messages} from './static-data.js';


function getComment() {
  let id = 0;
  return function () {
    return {
      id: ++id,
      avatar: `img/avatar-${id}.svg`,
      message: getRandomArrayItem(messages),
      name: getRandomArrayItem(names)
    };
  };
}

function getDescriptionBody() {
  let id = 0;
  const getCommentFunc = getComment();
  return function () {
    return {
      id: ++id,
      url: `photos/${id}.jpg`,
      description: 'фотография хорошего кота',
      likes: getRandomValue(15, 200),
      comments: Array.from({length: getRandomValue(1, 9)}, getCommentFunc),
    };
  };
}

function getPosts(length = getRandomValue(1, 100)){
  const getDescriptionBodyFunc = getDescriptionBody();
  return Array.from({length: length}, getDescriptionBodyFunc);
}

export {getPosts};

