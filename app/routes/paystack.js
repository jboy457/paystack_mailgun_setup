const express = require('express');
const router = express.Router();
const paystackController = require('../controller/paystack-controller');
const {initialize_transaction, verify_transaction} = require('./middleware/paystack');

router.get('/', (req, res) => {
	paystackController.viewHompage(req, res);
});

router.post('/pay', initialize_transaction, (req, res) => {
	paystackController.init_transaction(req, res);
})

router.get('/paystack/callback', verify_transaction, (req, res) => {
	paystackController.save_transaction(req, res);
})

module.exports = router;