import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, image, cb) {
    cb(null, 'uploads/'); // Destination folder for uploaded images
  },
  filename: function (req, image, cb) {
    cb(null, Date.now() + '-' + image.originalname); // Rename files to avoid conflicts
  },
});
// Create the multer instance
const upload = multer({ storage: storage });
// module.exports = upload;
export default upload;