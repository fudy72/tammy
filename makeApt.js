const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

//const privatekey = require(file);

// configure a JWT auth client
let jwtClient = new google.auth.JWT(
   privatekey.client_email,
   null,
   privatekey.private_key,
   ['https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events']);

// create a connection
jwtClient.authorize(function (err, tokens) {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log("Successfully connected!");
   }
});

function makeAppointment( gcalId, usersWords ) {
   let calendar = google.calendar("v3"); 
   calendar.events.quickAdd({
        auth: jwtClient,
        calendarId: gcalId,
        text: usersWords
    },
    function(err, event) {
        if (err) {
            console.log('There was an error contacting the Calendar service: ' + err);
            return;
        }
        console.log('Event created: %s', event.htmlLink);
    });
    
    return new Promise(function(resolve, reject) {
        resolve();
    });
}

exports.handler = function(context, event, callback) {

    makeAppointment( context.gcal, event.usersWords )
    .then(function() {
        let twiml = new Twilio.twiml.VoiceResponse();
        twiml.say("Debug info. Appointment make. The user said " + event.usersWords );
	    callback(null, twiml);
    });

// Imports the Google Cloud client library.
const {Storage} = require('@google-cloud/storage');

// Instantiates a client. If you don't specify credentials when constructing
// the client, the client library will look for credentials in the
// environment.
const storage = new Storage();

// Makes an authenticated API request.
storage
  .getBuckets()
  .then((results) => {
    const buckets = results[0];

    console.log('Buckets:');
    buckets.forEach((bucket) => {
      console.log(bucket.name);
    });
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });
