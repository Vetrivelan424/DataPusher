const express = require('express');
const router = express.Router();
const Destination = require('../models/destination');


/**
 * @swagger
 * components:
 *   schemas:
 *     Destination:
 *       type: object
 *       required:
 *         - accountId
 *         - url
 *         - httpMethod
 *         - headers
 *       properties:
 *         accountId:
 *           type: string
 *           description: The ID of the account
 *         url:
 *           type: string
 *           description: The URL of the destination
 *         httpMethod:
 *           type: string
 *           description: The HTTP method for the destination
 *         headers:
 *           type: string
 *           description: The headers for the destination
 *       example:
 *         accountId: account-id
 *         url: http://webhook-url.com
 *         httpMethod: POST
 *         headers: '{"APP_ID": "1234APPID1234", "APP_SECRET": "enwdj3bshwer43bjhjs9ereuinkjcnsiurew8s", "ACTION": "user.update", "Content-Type": "application/json", "Accept": "*"}'
 */

/**
 * @swagger
 * tags:
 *   name: Destinations
 *   description: Destination management
 */

/**
 * @swagger
 * /destination:
 *   post:
 *     summary: Create a new destination
 *     tags: [Destinations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Destination'
 *     responses:
 *       201:
 *         description: The destination was successfully created
 *       500:
 *         description: Some server error
 */
// Create a new destination
router.post('/', (req, res) => {
  const { accountId, url, httpMethod, headers } = req.body;

  Destination.create({ accountId, url, httpMethod, headers }, (err, id) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id, accountId, url, httpMethod, headers });
  });
});

/**
 * @swagger
 * /destination/{accountId}:
 *   get:
 *     summary: Get destinations by accountId
 *     tags: [Destinations]
 *     parameters:
 *       - in: path
 *         name: accountId
 *         schema:
 *           type: string
 *         required: true
 *         description: The account id
 *     responses:
 *       200:
 *         description: List of destinations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Destination'
 *       500:
 *         description: Some server error
 */

// Get destinations by accountId
router.get('/:accountId', (req, res) => {
  const { accountId } = req.params;

  Destination.findByAccountId(accountId, (err, destinations) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(destinations);
  });
});


/**
 * @swagger
 * /destination/{id}:
 *   delete:
 *     summary: Delete a destination
 *     tags: [Destinations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The destination id
 *     responses:
 *       204:
 *         description: The destination was deleted
 *       500:
 *         description: Some server error
 */

// Delete a destination
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Destination.delete(id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).send();
  });
});

module.exports = router;
