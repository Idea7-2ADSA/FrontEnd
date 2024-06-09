var express = require("express");
var router = express.Router();

var totemController = require("../controllers/totemController")

router.post("/cadastrarTotem", function (req, res) {
    totemController.cadastrarTotem(req, res)
});

router.post("/buscarAlertas", function(req, res) {
    totemController.buscarAlertas(req, res)
})

router.post("/buscarAlerta", function(req, res){
    totemController.buscarUltimoAlerta(req, res)
})

router.post("/buscarDadoComponente", function(req, res) {
    totemController.buscarDadoComponente(req, res)
})

router.post("/buscarDadosComponente", function (req, res) {
    totemController.buscarDadosComponente(req, res)
})

module.exports = router;