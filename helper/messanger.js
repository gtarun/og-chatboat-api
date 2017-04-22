'use strict'
const sendApi = require('./../services/messanger');
const regex = require('regex-email');
module.exports = {
  receivedMessage: (event, accessToken) => {
      console.log(event.message.text);
        let senderId =  event.sender.id;
        let receiverId = event.recipient.id;
        if(event.message.text){
            if(event.message.text == 'Enter valid email please...' || event.message.text == "Hi!\r\nWelcome to OutgrowCo.\r\n Let's know a little more about you.\r\nWhat is your email ?" || event.message.text == 'Only Support Text and Nothing Else' || event.message.text == 'Ok...' || event.message.text == "What is your name ?" || event.message.text == "Kindly have a look at:\r\n //resources.outgrow.co/about"){
                lastMsg = event.message.text;
                console.log('My Own Message Come');
            }
            else if(lastMsg == "Hi!\r\nWelcome to OutgrowCo.\r\n Let's know a little more about you.\r\nWhat is your email ?" || lastMsg == 'Enter valid email please...'){
                    console.log('Email: ', event.message.text);
                    if(regex.test(event.message.text) != true){
                        validEmailAlert(senderId, accessToken);
                        lastMsg == '';
                    }
                    else{
                        console.log('I1: ', i);
                        sendTextMessage(senderId, accessToken,i);
                        i++;
                    }
            }
            else{
                console.log('I1: ', i);
                sendTextMessage(senderId, accessToken,i);
                i++;
            }
        }
        else{
            console.log('Another Format Send');
            sendApi.callSendApi({ recipient: {id: recipientId}, message: {text: 'Only Support Text and Nothing Else'}}, accessToken);
        }
  },

  startNow:(event, accessToken)=>{
        i= 1;
        sendTextMessage(event.sender.id, accessToken, i);
        i++;
  }  
}

var i = 10;
var lastMsg = '';
function sendTextMessage(recipientId,accessToken, i) {
  let txt = '';
  console.log('I2 is: ', i);
  let messageData = {};
  if(i == 1){
     messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: "Hi!\r\nWelcome to OutgrowCo.\r\n Let's know a little more about you.\r\nWhat is your email ?"
        }
     };
    }
    else if(i == 2){
        messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: "What is your name ?"
        }
     };
    }
    else if(i == 3){
        messageData= {
            recipient: {
                id: recipientId
            },
            message:{
                text: 'Kindly have a look at:\r\n //resources.outgrow.co/about'
            }
        }
    }
    else{
        messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                text: 'Ok...'
            }
        };
    }
    console.log('Send Api Call');
    sendApi.callSendApi(messageData, accessToken);
    console.log('message Send Done');
}

function validEmailAlert(recipientId, accessToken){
   let messageData = {
        recipient: {
            id: recipientId
        },
        message:{
            text:'Enter valid email please...'
        }
    }
    console.log('Email Alert Call');
    sendApi.callSendApi(messageData, accessToken);
}