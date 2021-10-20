const express = require('express');
const { addFavorite, removeFavourite, getFavouritesByUser } = require('../controllers/Favourites');
const router = express.Router();

router.post('/favourites/:slug/:email', addFavorite)
router.delete('/favourites/:slug/:email', removeFavourite)
router.get('/favourites/:email', getFavouritesByUser)

module.exports = router;