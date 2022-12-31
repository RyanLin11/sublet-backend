const createError = require('http-errors');
const ListingService = require('../services/ListingService');
const crypto = require('crypto');

class ListingController {
    static async getListing(req, res, next) {
        try {
            const listing = await ListingService.getListingById(req.params.id);
            res.send(listing);
        } catch (e) {
            return next(createError(500, e.message));
        }
    }

    static async createListing(req, res, next) {
        try {
            req.body.user_id = req.session.user_id;
            req.body.listing_code = crypto.randomBytes(12).toString('hex');
            const listing = await ListingService.createListing(req.body);
            res.send(listing);
        } catch (e) {
            return next(createError(500, e.message));
        }
    }

    static async getListings(req, res, next) {
        try {
            const listings = await ListingService.getListings();
            if (req.query?.sort) {
                const key = req.query.sort;
                if (key.charAt(0) === '-') {
                    listings.sort((a, b) => a[key.substring(1)] < b[key.substring(1)]? -1: 1)
                } else {
                    listings.sort((a, b) => a[key] > b[key]? -1: 1);
                }
            }
            res.send(listings);
        } catch (e) {
            return next(createError(500, e.message));
        }
    }

    static async editListing(req, res, next) {
        try {
            await ListingService.updateListingById(req.params.id, req.body);
            res.status(200).send({ message: 'Listing Updated Successfully' });
        } catch (e) {
            return next(createError(500, e.message));
        }
    }

    static async deleteListing(req, res, next) {
        try {
            await ListingService.deleteListingById(req.params.id);
            res.status(200).send({ message: 'Listing Deleted Successfully' });
        } catch (e) {
            return next(createError(500, e.message));
        }
    }
}

module.exports = ListingController;