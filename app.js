var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var partials = require("express-partials");
var mongoose = require("mongoose");
const routes = require("./routes");
const os = require("os");
const { log } = require("console");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// Việt nam
// Hoa Kỳ
// Trung Quốc
// Ấn Độ
// Nhật Bản
// Anh
// Đức
// Pháp
// Brazil
// Nga
// Hàn Quốc

var i18n = require("i18n");
i18n.configure({
    locales: ["vi", "en", "hi", "ja", "en", "de", "fr", "pt", "ru", "ko"],
    directory: __dirname + "/language",
    cookie: "lang",
    defaultLocale: "en",
    header: "accept-language",
});
app.use(logger("dev"));
app.use(express.json());
app.use(partials());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(i18n.init);
// Lấy danh sách các giao diện mạng của máy tính
const networkInterfaces = os.networkInterfaces();

// Duyệt qua danh sách và lấy ra địa chỉ IPv4
let serverIP = null;
Object.keys(networkInterfaces).forEach((interfaceName) => {
    const interfaces = networkInterfaces[interfaceName];
    interfaces.forEach((interfaceInfo) => {
        if (interfaceInfo.family === "IPv4" && !interfaceInfo.internal) {
            serverIP = interfaceInfo.address;
        }
    });
});

console.log("=====================================");
console.log(`Server IP: ${serverIP}:${process.env.PORT}`);
console.log("=====================================");

routes(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
