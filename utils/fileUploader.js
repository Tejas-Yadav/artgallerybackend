const multer = require('multer');
const path = require('path');
const fs = require('fs');
const parentDir = path.join(__dirname, '../uploads');

const createUploader = (folderName, uuid) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dirPath = path.join(parentDir, folderName);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      cb(null, dirPath);
    },
    filename: (req, file, cb) => {
      const uniqueName = `${uuid}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    }
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images are allowed!'), false);
    }
  };

  return multer({
    storage,
    fileFilter
    //limits: { fileSize: 5 * 1024 * 1024 } // 5MB
  });
};

module.exports = createUploader;
