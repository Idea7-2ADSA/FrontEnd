var express = require("express");
var router = express.Router();

var totemController = require("../controllers/totemController")

router.post("/cadastrarTotem", function (req, res) {
    totemController.cadastrarTotem(req, res)
});

router.post("/buscarAlerta", function(req, res) {
    totemController.buscarAlertas(req, res)
})

module.exports = router;