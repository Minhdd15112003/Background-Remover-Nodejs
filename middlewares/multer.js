// Export multer middleware for uploading images
const multer = require("multer");
const outputPath = __dirname.split("middlewares")[0] + "/public/uploads";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, outputPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + file.originalname);
    },
});
const upload = multer({ storage: storage });
const uploadImage = upload.single("image");
module.exports = {
    uploadImage,
    storage,
};