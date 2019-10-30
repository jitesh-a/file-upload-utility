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
  `Violated file size, allowed size are ${JSON.stringify(ALLOWED_FILE_SIZES)}`
]

// method to validate file type
const validateileType = (mimeType) => {
  return ALLOWED_FILE_TYPES.indexOf(mimeType);
}

// method to validate file size
const validateFileSize = (mimeType, size) => {
  return (mimeType === ALLOWED_FILE_SIZES[0].key && size <= ALLOWED_FILE_SIZES[0].value)
    || (mimeType === ALLOWED_FILE_SIZES[1].key && size <= ALLOWED_FILE_SIZES[1].value)
}

/* POST upload */
router.post('/', function (req, res, next) {
  const { file, name, mimeType, size } = req.files;

  // check for file type
  if (validateileType(mimeType) === -1) {
    res.status(400).json({
      error: ERROR_MESSAGES[0],
    })
  } // check for file size
  else if (!validateFileSize(mimeType, size)) {
    res.status(400).json({
      error: ERROR_MESSAGES[1],
    })
  } else {
    uploadFile.mv(
      `${__dirname}/../public/files/${name}`,
      function (err) {
        if (err) {
          return res.status(500).json({
            error: err
          })
        }
        res.json({
          file: `public/${name}`,
        })
      },
    )
  }
});

module.exports = router;
