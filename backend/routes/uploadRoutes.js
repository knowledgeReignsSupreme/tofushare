const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const s3Storage = require('multer-sharp-s3');
const url = require('url');

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  // Bucket: 'tofushare',
  Bucket: 'tofushare',
  region: process.env.AWS_REGION,
});

const storage = s3Storage({
  s3,
  Bucket: 'tofushare',
  key: function (req, file, cb) {
    cb(
      null,
      path.basename(file.originalname, path.extname(file.originalname)) +
        '-' +
        Date.now() +
        path.extname(file.originalname)
    );
  },
  // ACL: 'public-read',
  ACL: process.env.AWS_ACL,
  resize: {
    width: 600,
    height: 384,
  },
  max: true,
});

const newImage = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post('/', newImage.single('file'), (req, res, next) => {
  try {
    const imageName = req.file.key;
    const imageLocation = req.file.Location; // Save the file name into database into profile
    res.json({
      image: imageName,
      location: imageLocation,
    });
  } catch (error) {
    res.status(400).send({ message: 'קובץ לא תקין.' });
  }
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

const profileS3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  Bucket: 'tofushare-profile',
  region: process.env.AWS_REGION,
});

const profileStorage = s3Storage({
  s3: profileS3,
  Bucket: 'tofushare-profile',
  key: function (req, file, cb) {
    cb(
      null,
      path.basename(file.originalname, path.extname(file.originalname)) +
        '-' +
        Date.now() +
        path.extname(file.originalname)
    );
  },
  // ACL: 'public-read',
  ACL: process.env.AWS_ACL,

  resize: {
    width: 318,
    height: 425,
  },
  max: true,
});

const profileImage = multer({
  storage: profileStorage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post('/profile', profileImage.single('file'), (req, res, next) => {
  try {
    const imageName = req.file.key;
    const imageLocation = req.file.Location; // Save the file name into database into profile
    res.json({
      image: imageName,
      location: imageLocation,
    });
  } catch (error) {
    res.status(400).send({ message: 'קובץ לא תקין.' });
  }
});

// const recipeImageUpload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'tofu-share',
//     acl: 'public-read',
//     key: function (req, file, cb) {
//       cb(
//         null,
//         path.basename(file.originalname, path.extname(file.originalname)) +
//           '-' +
//           Date.now() +
//           path.extname(file.originalname)
//       );
//     },
//   }),
//   limits: { fileSize: 3000000 }, // In bytes: 2000000 bytes = 2 MB
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   },
// }).single('file');

// router.post('/', (req, res) => {
//   recipeImageUpload(req, res, (error) => {
//     if (error) {
//       console.log('errors', error);
//       res.json({ error: error });
//     } else {
//       if (req.file === undefined) {
//         console.log('Error: No File Selected!');
//         res.json('Error: No File Selected');
//       } else {
//         const imageName = req.file.key;
//         const imageLocation = req.file.location; // Save the file name into database into profile
//         res.json({
//           image: imageName,
//           location: imageLocation,
//         });
//       }
//     }
//   });
// });

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
