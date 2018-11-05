const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function ValidateImageUpload(data) {
  let errors = {};

  data.picture = !isEmpty(data.picture) ? data.picture : '';

  if (Validator.isEmpty(data.picture)) {
    errors.imageUploadPath = 'Image upload path can not be empty';
  }
  else{
      const extension = data.picture
      .substring(data.picture.lastIndexOf('.') + 1).toLowerCase();
      
      let validExtension = false;
      //Check if the file uploaded is an image
        if (extension == "gif" || extension == "png" || extension == "bmp"
        || extension == "jpeg" || extension == "jpg"){
          validExtension = true;
        }
        if(!validExtension){
          errors.imageExtension = 'Invalid image extension. Image must be in jpg, jpeg, bmp, gif or png format'
        
        }
        //
}
  return {
    errors,
    isValid: isEmpty(errors)
  }
  
  ;
};
