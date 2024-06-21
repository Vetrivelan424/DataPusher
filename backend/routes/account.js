const express = require('express');
const router = express.Router();
const Account = require('../models/account');
const { v4: uuidv4 } = require('uuid');

/**
 * @swagger
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       required:
 *         - email
 *         - accountName
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the account
 *         accountName:
 *           type: string
 *           description: The name of the account
 *         website:
 *           type: string
 *           description: The website of the account
 *       example:
 *         email: user@example.com
 *         accountName: User Name
 *         website: http://example.com
 */

/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: Account management
 */

/**
 * @swagger
 * /account:
 *   post:
 *     summary: Create a new account
 *     tags: [Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Account'
 *     responses:
 *       201:
 *         description: The account was successfully created
 *       500:
 *         description: Some server error
 */
// Create a new account
router.post('/', (req, res) => {
  const { email, accountName, website } = req.body;
  const accountId = uuidv4();
  const appSecretToken = uuidv4();

  Account.create({ email, accountId, accountName, appSecretToken, website }, (err, id) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id, email, accountId, accountName, appSecretToken, website });
  });
});


/**
 * @swagger
 * /account/{accountId}:
 *   delete:
 *     summary: Delete an account
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: accountId
 *         schema:
 *           type: string
 *         required: true
 *         description: The account id
 *     responses:
 *       204:
 *         description: The account was deleted
 *       500:
 *         description: Some server error
 */
// Get all accounts
router.get('/', (req, res) => {
  Account.findAll((err, accounts) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(accounts);
  });
});

/**
 * @swagger
 * /account/{accountId}:
 *   delete:
 *     summary: Delete an account
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: accountId
 *         schema:
 *           type: string
 *         required: true
 *         description: The account id
 *     responses:
 *       204:
 *         description: The account was deleted
 *       500:
 *         description: Some server error
 */
// Delete an account
router.delete('/:accountId', (req, res) => {
  const { accountId } = req.params;

  Account.delete(accountId, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // Also delete associated destinations
    const Destination = require('../models/destination');
    Destination.deleteByAccountId(accountId, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(204).send();
    });
  });
});

module.exports = router;
