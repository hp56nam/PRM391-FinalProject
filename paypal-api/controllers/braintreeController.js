const braintree = require("braintree");
const HttpResponse = require('../helpers/HttpResponse');
const {Database} = require('../helpers/firebaseApp');

const gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "jw96j3bh4pj6ndmg",
    publicKey: "kw4wc556f7gghtd9",
    privateKey: "c2be22021ed107e21bbbf62ef06e984e"
});

const userRef = Database.ref('users');

module.exports = {
    getClientToken: async (req, res) => {
        const uid = req.user.uid;
        gateway.clientToken.generate({}, function (err, response) {
            if (err) res.send(HttpResponse.badRequestError(err));
            res.send(HttpResponse.ok({
                user_id: uid,
                clientToken: response.clientToken
            }))
        });
    },
    executePayment: async (req, res) => {
        const uid = req.user.uid;

        let message = {};
        // Get the nonce from the request body
        let nonce = req.body.nonce;
        // Get the amount from the request body
        let amount = req.body.amount;

        if (!nonce) message.nonce = "nonce cannot be blank";
        if (!amount) message.amount = "amount cannot be blank";
        if (message === {}) res.send(HttpResponse.badRequestError({message}));


        // Set up the parameters to execute the payment
        let saleRequest = {
            amount: amount,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            }
        };
        // Call the Braintree gateway to execute the payment
        gateway.transaction.sale(saleRequest, function (err, result) {
            if (err || !result.success) return res.send(HttpResponse.serverError(err));
            userRef.child(uid).update({
                premiumAccount: {
                    status: true,
                    transactionId: result.transaction.id
                }
            }).then((data) => {
                // Return a success response to the client
                return res.send(HttpResponse.ok({
                    transactionId: result.transaction.id,
                    userId: uid
                }));
            }).catch(err => res.send(HttpResponse.badRequestError(err)));
        });
    }
};
