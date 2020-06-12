const request = require('request');

const user = {
    name: "Taiwo Adejare",
    email: "adejareemma@gamil.com",
    amount: 500
}


function initialize_transaction(req, res, next) {
    console.log('paystack running');
    var key = process.env.PAYSTACK_SECRET_KEY;
    console.log(key)
    const url = 'https://api.paystack.co/transaction/initialize';
    request.post({
        url: url,
        headers: {
            Authorization: key,
            "Content-type": "application/json"
        },
        form: {
            "email": user.email,
            "amount": user.amount
        }
    }, (err, response, body) => {
        if(!err && response.statusCode == 200) { 
            req.paystack = JSON.parse(body);
            next()
        } else {       
            return err.message;
        }    
    })
}

function verify_transaction(req, res, next) {
    const ref = req.query.reference;
    const url = 'https://api.paystack.co/transaction/verify/' + encodeURIComponent(ref);
    request({
        url: url,
        headers: {
            Authorization: process.env.PAYSTACK_SECRET_KEY,
            "Content-type": "application/json"
        }
    }, (err, response, body) => {
        if(!err && response.statusCode == 200) { 
            req.callback_data = JSON.parse(body);
            console.log(JSON.parse(body))
            next();
        } else {       
            return err.message;
        }   
    })
}

module.exports.initialize_transaction = initialize_transaction;
module.exports.verify_transaction = verify_transaction;
