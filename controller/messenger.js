'use strict'
let pageId = '';
let accessToken = '';
const processData = require('./../helper/messanger');
module.exports = {
    webhookVerify: (req, res) => {
        if (req.query['hub.mode'] === 'subscribe' &&
            req.query['hub.verify_token'] == "outgrow_messanger_bot_verify_code_user") {
            console.log("User Validating webhook");
            res.status(200).send(req.query['hub.challenge']);
        } else {
            console.error("User Failed validation. Make sure the validation tokens match.");
            res.sendStatus(403);
        }
    },

    webhookPost: (req, res) => {
        var data = req.body;
        if (data.object === 'page') {
            let event = data.entry[0].messaging;
            console.log('Page Id: ', data.entry[0].id);
            console.log('Event Are:====>', event);
            if (event[0].postback && event[0].postback.payload == 'Start Now') {
                console.log('Start Now');
                processData.startNow(event[0], accessToken);
            } else if (event[0].message) {
                processData.receivedMessage(event[0], accessToken);
                console.log('Call Done');
            } else {
                console.log('Unknown Message Event Fire');
            }
            res.sendStatus(200);
            console.log('Response Send');
        }
    },

    pageInfo: (req, res) => {
        console.log('===========', req.body);
        if (!req.body) res.status(422).send({ status: 422, err: 'Data Required' })
        else {
            pageId = req.body.pageId;
            accessToken = req.body.accessToken;
            res.status(200).send({ status: 200, data: 'Success' });
            console.log('Page Id: ', pageId);
            console.log('Access Token: ', accessToken);
        }
    },
}