const artRouter = require('express').Router();  
const artService = require('../services/arts');


artRouter.get('/homeArtworks', artService.getHomeArtWorks);
artRouter.get('/artworks', artService.getArtWorks);
artRouter.get('/artwork/:filename', artService.getArtWork);

module.exports = artRouter;