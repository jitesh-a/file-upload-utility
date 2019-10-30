var express = require('express');
var router = express.Router();


// allowed file types
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'video/mp4'
]

// allowed file sizes
const ALLOWED_FILE_SIZES = [
  {
    key: ALLOWED_FILE_TYPES[0],
    value: 4194304
  },
  {
    key: ALLOWED_FILE_TYPES[1],
    value: 104857600
  }
]

// error messages
const ERROR_MESSAGES = [
  `Invalid file type, allowed file types are ${ALLOWED_FILE_TYPES.toString()}`,
  `Violated fileSize, allowed fileSize are ${JSON.stringify(ALLOWED_FILE_SIZES)}`
]

// method to validate file type
const validateileType = (fileType) => {
  return ALLOWED_FILE_TYPES.indexOf(fileType);
}

// method to validate file fileSize
const validateFileSize = (fileType, fileSize) => {
  return (fileType === ALLOWED_FILE_SIZES[0].key && fileSize <= ALLOWED_FILE_SIZES[0].value)
    || (fileType === ALLOWED_FILE_SIZES[1].key && fileSize <= ALLOWED_FILE_SIZES[1].value)
}

/* POST upload */
router.post('/', function (req, res, next) {
  let uploadFile = req.files.file;
  const fileName = req.files.file.name;
  const fileType = req.files.file.mimetype;
  const fileSize = req.files.file.size;

  // check for file type
  if (validateileType(fileType) === -1) {
    res.status(400).json({
      error: ERROR_MESSAGES[0],
    })
  } // check for file fileSize
  else if (!validateFileSize(fileType, fileSize)) {
    res.status(400).json({
      error: ERROR_MESSAGES[1],
    })
  } else {
    uploadFile.mv(
      `${__dirname}/../public/files/${fileName}`,
      function (err) {
        if (err) {
          return res.status(500).json({
            error: err
          })
        }
        res.json({
          file: `public/${fileName}`,
        })
      },
    )
  }
});

module.exports = router;
