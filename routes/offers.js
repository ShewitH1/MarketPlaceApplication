const express = require('express');
const { body, param } = require('express-validator');
const { validationResult } = require('express-validator');
const offersController = require('../controllers/offersController');
const router = express.Router({ mergeParams: true }); // To access parent route params

// Middleware to handle validation results
const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('error', { message: errors.array().map(err => err.msg).join(', ') });
    }
    next();
};

// Validation rules for making an offer
const validateMakeOffer = [
    body('amount')
        .isFloat({ gt: 0 })
        .withMessage('Offer amount must be a positive number'),
    validateResult
];

// Validation rules for accepting an offer
const validateAcceptOffer = [
    param('offerId')
        .isMongoId()
        .withMessage('Invalid offer ID format'),
    param('itemId')
        .isMongoId()
        .withMessage('Invalid item ID format'),
    validateResult
];

// Routes for offers
router.post('/', validateMakeOffer, offersController.makeOffer); // POST /items/:itemId/offers
router.get('/', offersController.viewOffers); // GET /items/:itemId/offers
router.post('/:offerId/accept', validateAcceptOffer, offersController.acceptOffer); // POST /items/:itemId/offers/:offerId/accept
router.get('/stories/:id', offersController.viewOffers);


module.exports = router;
