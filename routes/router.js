let router = require('express').Router();
let bodyparser = require('body-parser');

router.use(bodyparser());

router.get('/webhook', function(req, res) {
    if (req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] == "outgrow_messanger_bot_verify_code") {
        console.log("Validating webhook");
        res.status(200).send(req.query['hub.challenge']);
    } else {
        console.error("Failed validation. Make sure the validation tokens match.");
        res.sendStatus(403);
    }
})

router.post('/webhook', function(req, res) {
    console.log('I am Here');
    var data = req.body;
    if (data.object === 'page') {
        console.log('Object is: ', data.object);
        res.sendStatus(200);
    }
})

router.get('/userwebhook', (req, res) => {
    if (req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] == "outgrow_messanger_bot_verify_code_user") {
        console.log("User Validating webhook");
        res.status(200).send(req.query['hub.challenge']);
    } else {
        console.error("User Failed validation. Make sure the validation tokens match.");
        res.sendStatus(403);
    }
})

router.post('/userwebhook', (req, res) => {
    console.log('User I am Here');
    var data = req.body;
    if (data.object === 'page') {
        data.entry.forEach(function(entry) {
            var pageID = entry.id;
            var timeOfEvent = entry.time;
            console.log('Page Id Is: ', pageID);

            // Iterate over each messaging event
            entry.messaging.forEach(function(event) {
                if (event.message) {
                    console.log('Message Is: ', event.message);
                } else {
                    console.log("Webhook received unknown event: ", event);
                }
            });
        });
    }
})

router.get('/outh', (req, res) => {
    console.log(req.body);
})

module.exports = router;