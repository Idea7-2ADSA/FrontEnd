var express = require("express");
var router = express.Router();

franquiaController = require("../controllers/franquiaController")

router.post("/buscarFranquias", function(req, res) {
    franquiaController.buscarFranquias(req, res)
})

module.exports = router