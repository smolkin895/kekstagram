const hashtagInput = document.querySelector('[name="hashtags"]');
console.log(hashtagInput);
const commentInput = document.querySelector('[name="description"]');
console.log(commentInput);

export {hashtagInput, commentInput};

// ^(#[Ёёa-zа-я\d]{1,19}){1}(\s#[Ёёa-zа-я\d]{1,19}){1,4}$