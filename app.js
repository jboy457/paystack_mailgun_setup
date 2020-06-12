require('dotenv').config()
const express = require('express'),
	  app = express();

const paystackRouter = require('./app/routes/paystack.js');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(paystackRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server is running on https://localhost:${PORT}`);
});