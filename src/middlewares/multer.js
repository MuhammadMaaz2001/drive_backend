import multer from 'multer';
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  cb(null, true); // you can validate mimetypes here
};

const upload = multer({ storage, fileFilter });
export default upload;
