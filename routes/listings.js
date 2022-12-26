const express = require('express');
const router = express.Router();
const ListingController = require('../controllers/ListingController');
const authenticate = require('../middleware/authenticate');

router.get('/', ListingController.getListings);
router.post('/', authenticate, ListingController.createListing);
router.get('/:id', ListingController.getListing);
router.put('/:id', authenticate, ListingController.editListing);
router.delete('/:id', authenticate, ListingController.deleteListing);

module.exports = router;