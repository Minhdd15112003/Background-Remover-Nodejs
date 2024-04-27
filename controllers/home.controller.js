class HomeController {
    index(req, res, next) {
        res.render("home/index", { title: "Anh Minh" });
    }

    contact(req, res, next) {
        res.render("home/contact");
    }
}

module.exports = new HomeController();
