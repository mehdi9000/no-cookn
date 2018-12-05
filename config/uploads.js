
const multer  = require('multer');
const path = require('path');

module.exports = {
    test : ()=>{
      
      var storage = multer.diskStorage({ 
        destination: function (req, file, cb) {
          cb(null, './uploads')
        },
        filename: function (req, file, cb) {
          cb(null, file.fieldname + '-' + Date.now()
          +path.extname(file.originalname))
        }
      })
      const upload = multer({ storage: storage })
      return upload.array('photos', 12)
  
      
    },
    //restaurants
    restaurant : ()=>{
      
      var storage = multer.diskStorage({ 
        destination: function (req, file, cb) {
          cb(null, './uploads/restaurants')
        },
        filename: function (req, file, cb) {
          cb(null, file.fieldname + '-' + Date.now()
          +path.extname(file.originalname))
        }
      })
      const upload = multer({ storage: storage })
      return upload.single('photo')
      
    },
    //menu
    menu : (pic)=>{
      
      var storage = multer.diskStorage({ 
        destination: function (req, file, cb) {
          cb(null, './uploads/menu')
        },
        filename: function (req, file, cb) {
          cb(null, file.fieldname + '-' + Date.now()
          +path.extname(file.originalname))
        }
      })
      const upload = multer({ storage: storage })
      return upload.single('photo')
  
      
    },
  
  }