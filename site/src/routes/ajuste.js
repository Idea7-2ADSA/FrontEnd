var express = require("express");
var router = express.Router();

var ajusteController = require("../controllers/ajusteController")

router.post("/ajustarParametros", function (req, res) {
    console.log("em ajuste.js");
    ajusteController.ajustarParametros(req, res);
});

module.exports = router;