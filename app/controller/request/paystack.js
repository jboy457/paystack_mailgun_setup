const request = require('request');

const user = {
    name: "Taiwo Adejare",
    email: "adejareemma@gamil.com",
    amount: 500
}


function initialize_transaction() {
    console.log('paystack running');
    var key = process.env.PAYSTACK_SECRET_KEY;
    console.log(key)
    const url = 'https://api.paystack.co/transaction/initialize';
    return new Promise((resolve, reject) => {
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
            if(err && response.statusCode != 200) return reject(err)
            try{
                resolve(JSON.parse(body))
           } catch (err) {
               reject(err);
           }
        })
    })
   
}

function verify_transaction(ref) {
    return new Promise ((resolve, reject) => {
        const url = 'https://api.paystack.co/transaction/verify/' + encodeURIComponent(ref);
        request({
            url: url,
            headers: {
                Authorization: process.env.PAYSTACK_SECRET_KEY,
                "Content-type": "application/json"
            }
        }, (err, response, body) => {
            if(err && response.statusCode != 200) reject(err);
            try {
                reslove(JSON.parse(body));
            } catch(err) {
                reject(err);
            }    
        })

    })
   
}

module.exports.initialize_transaction = initialize_transaction;
module.exports.verify_transaction = verify_transaction;
