var express = require("express");
var router = express.Router();

var kpiController = require("../controllers/kpiController")

router.post("/buscarDados", function (req, res) {
    kpiController.buscarDados(req, res)
});

router.post("/buscarAjustes", function (req, res) {
    kpiController.buscarAjustes(req, res)
});

router.post("/buscarDataHora", function(req, res) {
    kpiController.buscarDataHoraTotem(req, res)
});

module.exports = router;