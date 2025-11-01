
const express = require('express');
const router = express.Router();
const controller = require('../controllers/rider.controller');

router.get('/', controller.getAll);
router.get('/:rider_id', controller.getById);
router.post('/', controller.create);
router.put('/:rider_id', controller.update);
router.delete('/:rider_id', controller.delete);
router.post("/:rider_id/create-trip", controller.createTripForRider); // Create trip
router.patch("/:rider_id/cancel-trip/:trip_id", controller.cancelTripForRider); // Cancel trip (only if rider owns it and status is 'REQUESTED')

module.exports = router;
