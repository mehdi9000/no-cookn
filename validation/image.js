const Validator = require('validator');
const isEmpty = require('./is-empty');
const path = require('path');


module.exports = function ValidateImageUpload(data) {
  let errors = {};

  data.files= !isEmpty(data.files) ? data.files : '';

  if (Validator.isEmpty(data.files)) {
    errors.imageUploadPath = 'Image upload path can not be empty';
  }
  else{
       const extension = path.extname(file.originalname)
      //data.picture
      // .substring(data.picture.lastIndexOf('.') + 1).toLowerCase();
      
      let validExtension = false;
      //Check if the file uploaded is an image
        if (extension == "gif" || extension == "png" || extension == "bmp"
        || extension == "jpeg" || extension == "jpg"){
          validExtension = true;
        }
        if(!validExtension){
          errors.imageExtension = 'Invalid image extension. Image must be in jpg, jpeg, bmp, gif or png format'
        
        }
        
}
  


return {
  errors,
  isValid: isEmpty(errors)
}


};
