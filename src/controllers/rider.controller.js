// src/controllers/rider.controller.js

const axios = require("axios");
const Rider = require("../models/rider.model");

const TRIP_SERVICE_URL = process.env.TRIP_SERVICE_URL || "http://ec2-3-6-160-223.ap-south-1.compute.amazonaws.com:8080";

//Create trip for rider
exports.createTripForRider = (req, res) => {
  const { rider_id } = req.params;
  const { pickup_zone, drop_zone, distance_km } = req.body;

  if (!pickup_zone || !drop_zone || !distance_km) {
    return res.status(400).json({
      error: "Missing required fields",
      required: ["pickup_zone", "drop_zone", "distance_km"]
    });
  }

  Rider.getRiderById(rider_id, async (err, rider) => {
    if (err) return res.status(500).json({ error: "Failed to fetch rider" });
    if (!rider) return res.status(404).json({ error: "Rider not found" });

    try {
      const tripResponse = await axios.post(`${TRIP_SERVICE_URL}/v1/trips`, {
        rider_id,
        pickup_zone,
        drop_zone,
        distance_km
      });

      res.status(201).json({
        success: true,
        message: "Trip created successfully via Trip Service",
        trip: tripResponse.data
      });

    } catch (tripError) {
      res.status(500).json({
        error: "Failed to create trip",
        message: tripError.response?.data || tripError.message
      });
    }
  });
};

exports.getAll = (req, res) => {
  Rider.getAllRiders((err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch riders' });
    res.json({ success: true, data });
  });
};

exports.getById = (req, res) => {
  Rider.getRiderById(req.params.rider_id, (err, rider) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch rider' });
    if (!rider) return res.status(404).json({ error: 'Rider not found' });
    res.json({ success: true, data: rider });
  });
};

exports.create = (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone)
    return res.status(400).json({ error: 'Missing required fields' });

  Rider.createRider({ name, email, phone }, (err) => {
    if (err) return res.status(500).json({ error: 'Failed to create rider' });
    res.status(201).json({ success: true, message: 'Rider created successfully' });
  });
};

// Cancel trip which is in "Requested Status"
exports.cancelTripForRider = async (req, res) => {
  const { rider_id, trip_id } = req.params;

  try {
    // Step 1: Get trip details from Trip Service to validate rider & status
    const tripDetails = await axios.get(`${TRIP_SERVICE_URL}/v1/trips/${trip_id}`);
    const trip = tripDetails.data;

    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    // Step 2: Validate if rider owns the trip
    if (trip.rider_id != rider_id) {
      return res.status(403).json({
        error: "You are not allowed to cancel this trip. Not the trip owner."
      });
    }

    // Step 3: Check status must be REQUESTED to cancel
    if (trip.status !== "REQUESTED") {
      return res.status(400).json({
        error: "Trip can only be cancelled when it's in REQUESTED state",
        current_status: trip.status
      });
    }

    // ✅ Step 4: PATCH request to Trip Service
    const cancelResponse = await axios.patch(
      `${TRIP_SERVICE_URL}/v1/trips/${trip_id}/cancel`,
      { reason: "Cancelled by rider" }      // optional payload Trip Service may need
    );

    return res.status(200).json({
      success: true,
      message: "Trip cancelled successfully",
      trip: cancelResponse.data
    });

  } catch (error) {
    console.error("Error cancelling trip:", error.message);
    return res.status(500).json({
      error: "Failed to cancel trip",
      message: error.response?.data || error.message
    });
  }
};

exports.update = (req, res) => {
  const { name, email, phone } = req.body;
  Rider.updateRider(req.params.rider_id, { name, email, phone }, function (err) {
    if (err) return res.status(500).json({ error: 'Failed to update rider' });
    if (this.changes === 0) return res.status(404).json({ error: 'Rider not found' });
    res.json({ success: true, message: 'Rider updated successfully' });
  });
};

exports.delete = (req, res) => {
  Rider.deleteRider(req.params.rider_id, function (err) {
    if (err) return res.status(500).json({ error: 'Failed to delete rider' });
    if (this.changes === 0) return res.status(404).json({ error: 'Rider not found' });
    res.json({ success: true, message: 'Rider deleted successfully' });
  });
};
