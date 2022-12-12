const express = require('express');
const router = express.Router();
const multer = require('multer');
//const upload = multer({dest:'./uploads'})

// Configuration for multer
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
     },
    filename: function (req, file, cb) {
        cb(null ,Date.now()+'-'+file.originalname);
    }
});

// Multer Filter
const multerFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/gif '|| file.mimetype == 'image/png') {
      cb(null, true);
    } else {
      cb(new Error("Not an image!"), false);
    }
  };
const upload = multer({storage: storage, fileFilter: multerFilter});

// upload single 
router.post('/uploadSingle', upload.single('avatar'), async (req, res, next) => {
    try {
        
        res.send({first :req.file , second : req.body})
    } catch (error) {
        res.send({message : error.message})
    }
})

// upload array of files 
router.post('/uploadArray', upload.array('photos', 6), async (req, res, next)=> {
    try {
        res.send(req.files)
    } catch (error) {
        res.send({message : error.message})
    }
})


module.exports = router;