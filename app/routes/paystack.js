const express = require('express');
const router = express.Router();
const paystackController = require('../controller/paystack-controller');

router.get('/', (req, res) => {
	paystackController.viewHompage(req, res);
});

router.post('/pay', (req, res) => {
	paystackController.init_transaction(req, res);
})

router.get('/paystack/callback', (req, res) => {
	paystackController.confirm_transaction(req, res);
})

module.exports = router;
