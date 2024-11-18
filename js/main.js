import {renderPictures} from './picture.js';
import  './openEditor.js';
import {get_data} from "./api.js";
import {showAlert} from "./utils.js";
import {uploadForm} from "./openEditor.js";


get_data('/kekstagram/data', renderPictures, showAlert);



let pristine = new Pristine(uploadForm, {classTo: 'result-class',
  errorTextParent: 'result-class',
  errorTextClass: 'text-help' },true);

uploadForm.addEventListener('submit', function (e) {
  e.preventDefault();
  pristine.validate(); // returns true or false

});
