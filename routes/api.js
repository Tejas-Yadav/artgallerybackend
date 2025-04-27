
const router = require("express").Router();
const artService = require('../services/arts');


router.post('/uploadArtwork', artService.uploadArtWork);


module.exports = router;