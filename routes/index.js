var router = require("express").Router();

// var fetchRoutes = require("./fetch");
// var noteRoutes = require("./notes");
// var headlineRoutes = require("./headlines");

var noteController = require("../controllers/notes");
var articleController = require("../controllers/scrape");
// var fetchController = require("../../controllers/scrape");


// router.use("/fetch", fetchRoutes);
// router.use("/notes", noteRoutes);
// router.use("/headlines", headlineRoutes);

// notes
router.get("/notes/:id", noteController.findOne);
router.post("/notes", noteController.create);
router.delete("/notes/:id", noteController.delete);

// headlines
router.get("/headlines", articleController.findAll);
router.delete("/headlines/:id", articleController.delete);
router.put("/headlines/:id", articleController.update);

// scrape
router.get("/fetch", articleController.scrapeArticles);

module.exports = router;
