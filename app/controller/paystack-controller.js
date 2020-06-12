var controller = {};

const user = {
    name: "Taiwo Adejare",
    email: "adejareemma@gamil.com",
    amount: 500
}

controller.viewHompage = (req, res) => {
        res.render('home');
}

controller.init_transaction = (req, res) => {
   const paystack_data = req.paystack
   console.log(paystack_data);
   if(!paystack_data) res.send('err')
   res.redirect(paystack_data.data.authorization_url)
} 

controller.save_transaction = (req, res) => {
    const callback_data = req.callback_data
    if(!callback_data) res.send('invalid Transaction');
    console.log(callback_data);
    res.redirect('/');
}

module.exports = controller;