const artRouter = require('express').Router();  
const artService = require('../services/arts');


artRouter.get('/homeArtworks', artService.getHomeArtWorks);
artRouter.get('/artworks', artService.getArtWorks);

module.exports = artRouter;