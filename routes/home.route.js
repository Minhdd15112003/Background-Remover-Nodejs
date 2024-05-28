var express = require("express");
var homeRouter = express.Router();
var { uploadImage, storage } = require("../middlewares/multer");
var axios = require("axios");
const FormData = require("form-data"); // Thêm dòng này
const fs = require("fs");
const path = require("path");

function genresponse(res) {
    return {
        title: res.__("title"),
        home_title: res.__("home_title"),
        home_description: res.__("home_description"),
        download: res.__("download"),
        description0: res.__("description0"),
        description: res.__("description"),
        description1: res.__("description1"),
        description2: res.__("description2"),
        description3: res.__("description3"),
        description4: res.__("description4"),
        question: res.__("question"),
        question1: res.__("question1"),
        questionDetail1: res.__("questionDetail1"),
        question2: res.__("question2"),
        questionDetail2: res.__("questionDetail2"),
        question3: res.__("question3"),
        questionDetail3: res.__("questionDetail3"),
        question4: res.__("question4"),
        questionDetail4: res.__("questionDetail4"),
    };
}

homeRouter.get("/", function (req, res) {
    res.setLocale("vi");
    const data = genresponse(res);
    res.render("home/index", data);
});

homeRouter.get("/:lang", async function (req, res) {
    const lang = req.params.lang;
    res.setLocale(lang);
    const data = genresponse(res);
    res.render("home/index", data);
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
            res.json({ path: outputPath.replace("public", "") });
        })
        .catch((error) => {
            res.status(500).send(`Request failed: ${error}`);
        });
});

module.exports = homeRouter;
