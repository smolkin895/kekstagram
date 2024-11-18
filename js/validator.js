import {uploadForm} from "./openEditor.js";

let pristine = new Pristine(uploadForm,     {
    classTo: 'form-group',
    errorClass: 'has-danger',
    successClass: 'has-success',
    errorTextParent: 'form-group'},
  true);

export {pristine}
