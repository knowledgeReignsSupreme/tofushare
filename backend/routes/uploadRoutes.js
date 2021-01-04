const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const url = require('url');

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  Bucket: 'plantshare-recipe',
  region: process.env.AWS_REGION,
});

const recipeImageUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'plantshare-recipe',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          '-' +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  }),
  limits: { fileSize: 2500000 }, // In bytes: 2000000 bytes = 2 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single('file');

router.post('/', (req, res) => {
  recipeImageUpload(req, res, (error) => {
    if (error) {
      console.log('errors', error);
      res.json({ error: error });
    } else {
      if (req.file === undefined) {
        console.log('Error: No File Selected!');
        res.json('Error: No File Selected');
      } else {
        const imageName = req.file.key;
        const imageLocation = req.file.location; // Save the file name into database into profile
        res.json({
          image: imageName,
          location: imageLocation,
        });
      }
    }
  });
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('תמונות בלבד');
  }
}
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// function checkFileType(file, cb) {
//   const filetypes = /jpg|jpeg|png/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);
//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb('תמונות בלבד');
//   }
// }

// const upload = multer({
//   storage,
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   },
// });

// router.post('/', upload.single('file'), (req, res) => {
//   res.send(`/${req.file.path}`);
// });

module.exports = router;
