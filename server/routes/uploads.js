var express = require('express');
var router = express.Router();


// allowed file types
const allowedFileTypes = [
  'application/pdf',
  'video/mp4'
]

// allowed file sizes
const allowedFileSizes = [
  {
    key: allowedFileTypes[0],
    value: 4194304
  },
  {
    key: allowedFileTypes[1],
    value: 104857600
  }
]

// method to validate file type
const validateileType = (fileType) => {
  return allowedFileTypes.indexOf(fileType);
}

// error messages
const errorMessages = [
  `Invalid file type, allowed file types are ${allowedFileTypes.toString()}`,
  `Violated file size, allowed size are ${JSON.stringify(allowedFileSizes)}`
]

// method to validate file size
const validateFileSize = (fileType, fileSize) => {
  return (fileType === allowedFileSizes[0].key && fileSize <= allowedFileSizes[0].value)
    || (fileType === allowedFileSizes[1].key && fileSize <= allowedFileSizes[1].value)
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
      error: errorMessages[0],
    })
  } // check for file size
  else if (!validateFileSize(fileType, fileSize)) {
    res.status(400).json({
      error: errorMessages[1],
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
          file: `public/${req.files.file.name}`,
        })
      },
    )
  }
});

module.exports = router;
