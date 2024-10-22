import {getPosts} from './data-generator.js';

const firtsCall = getPosts();

console.log(firtsCall[0].comments[0]);

