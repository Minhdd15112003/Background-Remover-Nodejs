var express = require("express");
var homeRouter = express.Router();
var homeCtrl = require("../controllers/home.controller");
var { uploadImage, storage } = require("../middlewares/multer");
var axios = require("axios");
const FormData = require("form-data"); // Thêm dòng này
const fs = require("fs");
const path = require("path");

homeRouter.get("/", function (req, res) {
    res.render("home/index");
    // res.render("home/contact");
});
homeRouter.post("/uploadImage", uploadImage, async function (req, res) {
    const inputPath = req.file.path;
    const formData = new FormData();
    formData.append("size", "auto");
    formData.append("image_file", fs.createReadStream(inputPath), path.basename(inputPath));
    axios({
        method: "post",
        url: "https://api.remove.bg/v1.0/removebg",
        data: formData,
        responseType: "arraybuffer",
        headers: {
            ...formData.getHeaders(),
            "X-Api-Key": "4khrxHicJFa4rhC9HvT2JGeE",
        },
        encoding: null,
    })
        .then((response) => {
            if (response.status != 200) return res.status(response.status).send("Error:", response.statusText);
            const outputPath = `public/removed/${req.file.filename}.png`;
            fs.writeFileSync(outputPath, response.data);
            res.json({ path: outputPath.replace("public", "")});
        })
        .catch((error) => {
            res.status(500).send(`Request failed: ${error}`);
        });
});

module.exports = homeRouter;
