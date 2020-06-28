var controller = {};
const {initialize_transaction, verify_transaction} = require('./request/paystack');


controller.viewHompage = (req, res) => {
        res.render('home');
}

controller.init_transaction = async (req, res) => {
    initialize_transaction().then(data => {
        if(!data) {
            res.status(400).json({
                message: "Internal server error"
            }) 
        }

        res.status(200).json({
            data: data,
            message: "Successfully initialized payment"
        })
    }).catch(err => {
        res.status(400).json({
            message: "Internal server error"
        }) 
    })
   
   //    res.redirect(data.data.authorization_url)
} 

controller.confirm_transaction = (req, res) => {
    verify_transaction(req.query.reference).then(data => {
        if(!callback_data) {
            res.status(400).json({message: 'Transaction Failed'})
        };

        res.status(200).json({message: 'Transaction successful'});
    }).catch((err) => {
        res.status(400).json({message: 'Internal server error, Try again'})
    })
}

module.exports = controller;