
const express = require('express');
const router = express.Router();
const controller = require('../controllers/rider.controller');

// TRIP ENDPOINTS FOR RIDERS
/**
 * @swagger
 * /v1/health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: UP
 *                 service:
 *                   type: string
 *                   example: Rider Service
 */

// TRIP ENDPOINTS FOR RIDERS

/**
 * @swagger
 * /v1/riders:
 *   get:
 *     summary: Get all riders
 *     description: Retrieve a list of all riders in the system
 *     tags: [Riders]
 *     responses:
 *       200:
 *         description: List of all riders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Rider'
 *             example:
 *               success: true
 *               data:
 *                 - rider_id: 1
 *                   name: "John Doe"
 *                   email: "john@example.com"
 *                   phone: "+1234567890"
 *                   created_at: "2025-11-06 09:31:45"
 *                   updated_at: "2025-11-06 09:31:45"
 *                 - rider_id: 2
 *                   name: "Jane Smith"
 *                   email: "jane@example.com"
 *                   phone: "+1987654321"
 *                   created_at: "2025-11-06 09:31:45"
 *                   updated_at: "2025-11-06 09:31:45"
 *       500:
 *         description: Server error - Failed to fetch riders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch riders"
 */

/**
 * @swagger
 * /v1/riders/{rider_id}:
 *   get:
 *     summary: Get rider by ID
 *     description: Retrieve details of a specific rider by their ID
 *     tags: [Riders]
 *     parameters:
 *       - in: path
 *         name: rider_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the rider
 *         example: 1
 *     responses:
 *       200:
 *         description: Rider details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Rider'
 *             example:
 *               success: true
 *               data:
 *                 rider_id: 1
 *                 name: "John Doe"
 *                 email: "john@example.com"
 *                 phone: "+1234567890"
 *                 created_at: "2025-11-06 09:31:45"
 *                 updated_at: "2025-11-06 09:31:45"
 *       404:
 *         description: Rider not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Rider not found"
 *       500:
 *         description: Server error - Failed to fetch rider
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch rider"
 */

/**
 * @swagger
 * /v1/riders:
 *   post:
 *     summary: Create a new rider
 *     description: Register a new rider in the system
 *     tags: [Riders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 description: Full name of the rider
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address (must be unique)
 *                 example: "john@example.com"
 *               phone:
 *                 type: string
 *                 description: Contact phone number
 *                 example: "+1234567890"
 *     responses:
 *       201:
 *         description: Rider created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Rider created successfully"
 *       400:
 *         description: Bad request - Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing required fields"
 *       500:
 *         description: Server error - Failed to create rider
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to create rider"
 */

/**
 * @swagger
 * /v1/riders/{rider_id}:
 *   put:
 *     summary: Update rider details
 *     description: Update information of an existing rider
 *     tags: [Riders]
 *     parameters:
 *       - in: path
 *         name: rider_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the rider
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name
 *                 example: "John Doe Updated"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Updated email
 *                 example: "john.updated@example.com"
 *               phone:
 *                 type: string
 *                 description: Updated phone number
 *                 example: "+1234567890"
 *     responses:
 *       200:
 *         description: Rider updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Rider updated successfully"
 *       404:
 *         description: Rider not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Rider not found"
 *       500:
 *         description: Server error - Failed to update rider
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to update rider"
 */

/**
 * @swagger
 * /v1/riders/{rider_id}:
 *   delete:
 *     summary: Delete a rider
 *     description: Remove a rider from the system
 *     tags: [Riders]
 *     parameters:
 *       - in: path
 *         name: rider_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the rider to delete
 *         example: 1
 *     responses:
 *       200:
 *         description: Rider deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Rider deleted successfully"
 *       404:
 *         description: Rider not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Rider not found"
 *       500:
 *         description: Server error - Failed to delete rider
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to delete rider"
 */

// ==========================================
// TRIP ENDPOINTS FOR RIDERS
// ==========================================

/**
 * @swagger
 * /v1/riders/{rider_id}/create-trip:
 *   post:
 *     summary: Create a new trip for a rider
 *     description: |
 *       Creates a new trip request for the specified rider by calling the Trip Service.
 *       The trip will be created in "REQUESTED" status.
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: rider_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the rider creating the trip
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pickup_zone
 *               - drop_zone
 *               - distance_km
 *             properties:
 *               pickup_zone:
 *                 type: string
 *                 description: Pickup zone/location name
 *                 example: "Downtown"
 *                 minLength: 1
 *               drop_zone:
 *                 type: string
 *                 description: Drop-off zone/location name
 *                 example: "Airport"
 *                 minLength: 1
 *               distance_km:
 *                 type: number
 *                 format: float
 *                 description: Distance in kilometers
 *                 example: 12.5
 *                 minimum: 0.1
 *     responses:
 *       201:
 *         description: Trip created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Trip created successfully via Trip Service"
 *                 trip:
 *                   type: string
 *                   example: "23"
 *             example:
 *               success: true
 *               message: "Trip created successfully via Trip Service"
 *               trip: 23
 *       400:
 *         description: Bad request - Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing required fields"
 *                 required:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["pickup_zone", "drop_zone", "distance_km"]
 *       404:
 *         description: Rider not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Rider not found"
 *       500:
 *         description: Server error or Trip Service error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to create trip"
 *                 message:
 *                   type: string
 *                   example: "Trip Service is unavailable"
 */

/**
 * @swagger
 * /v1/riders/{rider_id}/cancel-trip/{trip_id}:
 *   patch:
 *     summary: Cancel a trip for a rider
 *     description: |
 *       Cancels an existing trip that is in "REQUESTED" status.
 *       Only the trip owner (rider) can cancel their trip.
 *       The trip must be in "REQUESTED" status to be cancelled.
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: rider_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the rider who owns the trip
 *         example: 1
 *       - in: path
 *         name: trip_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the trip to cancel
 *         example: "1"
 *     responses:
 *       200:
 *         description: Trip cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Trip cancelled successfully"
 *             example:
 *               success: true
 *               message: "Trip cancelled successfully"
 *       400:
 *         description: Cannot cancel trip - Invalid status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Trip can only be cancelled when it's in REQUESTED state"
 *                 current_status:
 *                   type: string
 *                   example: "IN_PROGRESS"
 *             examples:
 *               wrong_status:
 *                 value:
 *                   error: "Trip can only be cancelled when it's in REQUESTED state"
 *                   current_status: "IN_PROGRESS"
 *               already_cancelled:
 *                 value:
 *                   error: "Trip can only be cancelled when it's in REQUESTED state"
 *                   current_status: "CANCELLED"
 *               completed:
 *                 value:
 *                   error: "Trip can only be cancelled when it's in REQUESTED state"
 *                   current_status: "COMPLETED"
 *       403:
 *         description: Forbidden - Not the trip owner
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You are not allowed to cancel this trip. Not the trip owner."
 *       404:
 *         description: Trip not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Trip not found"
 *       500:
 *         description: Server error or Trip Service error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to cancel trip"
 *                 message:
 *                   type: string
 *                   example: "Connection to Trip Service failed"
 */

router.get('/', controller.getAll);
router.get('/:rider_id', controller.getById);
router.post('/', controller.create);
router.put('/:rider_id', controller.update);
router.delete('/:rider_id', controller.delete);
router.post("/:rider_id/create-trip", controller.createTripForRider); // Create trip
router.patch("/:rider_id/cancel-trip/:trip_id", controller.cancelTripForRider); // Cancel trip (only if rider owns it and status is 'REQUESTED')

module.exports = router;
