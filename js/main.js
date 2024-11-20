import {renderPictures} from './picture.js';
import  './openEditor.js';
import {getData} from "./api.js";
import {showAlert} from "./utils.js";
import {setUserFormSubmit, uploadForm} from "./openEditor.js";
// import {pristine} from "./validator.js";


getData('/kekstagram/data', renderPictures, showAlert);
// uploadForm.addEventListener('submit', function (e) {
//   e.preventDefault();
//   pristine.validate(); // returns true or false
// });
setUserFormSubmit();
