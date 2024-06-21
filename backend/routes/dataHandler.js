const express = require('express');
const router = express.Router();
const Account = require('../models/account');
const Destination = require('../models/destination');
const axios = require('axios');


/**
 * @swagger
 * tags:
 *   name: DataHandler
 *   description: Data handling and forwarding
 */

/**
 * @swagger
 * /server/incoming_data:
 *   post:
 *     summary: Handle incoming data and forward to destinations
 *     tags: [DataHandler]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               key: value
 *     parameters:
 *       - in: header
 *         name: CL-X-TOKEN
 *         schema:
 *           type: string
 *         required: true
 *         description: The app secret token
 *     responses:
 *       200:
 *         description: Data processed successfully
 *       401:
 *         description: Unauthenticated
 *       500:
 *         description: Some server error
 */
// Handle incoming data
router.post('/incoming_data', (req, res) => {
  const appSecretToken = req.headers['cl-x-token'];
  const data = req.body;

  if (!appSecretToken) {
    return res.status(401).json({ message: 'Un Authenticate' });
  }

  Account.findByAccountId(appSecretToken, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ message: 'Un Authenticate' });
    }

    Destination.findByAccountId(account.accountId, async (err, destinations) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      for (const destination of destinations) {
        try {
          if (destination.httpMethod.toUpperCase() === 'GET') {
            await axios.get(destination.url, { params: data, headers: JSON.parse(destination.headers) });
          } else {
            await axios({
              method: destination.httpMethod,
              url: destination.url,
              headers: JSON.parse(destination.headers),
              data: data
            });
          }
        } catch (err) {
          console.error(`Failed to send data to ${destination.url}:`, err.message);
        }
      }

      res.status(200).json({ message: 'Data processed successfully' });
    });
  });
});

module.exports = router;
