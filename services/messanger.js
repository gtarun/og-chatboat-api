'use strict'
const Promise = require('bluebird');
const request = require('request');
Promise.promisifyAll(request);
module.exports = {
    callSendApi: (messageData, access_token)=>{
        console.log('Call Api Function', messageData);
        console.log('Access Token: ', access_token);
        request({
            uri: 'https://graph.facebook.com/v2.6/me/messages',
            qs: { access_token: access_token },
            method: 'POST',
            json: messageData
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var recipientId = body.recipient_id;
                var messageId = body.message_id;
                console.log("Successfully sent");
            } else {
                console.error("Unable to send message.");
                console.error(error);
            }
        })
    }
}