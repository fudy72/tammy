const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const privatekey = require('./../private/tammy196.json');

const client = new google.auth.JWT(
    privatekey.client_email,
    null,
    privatekey.private_key,
    ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.events'],
);

let calendar = google.calendar({ version : "v3", auth : client }); 
calendar.events.quickAdd({
    auth : client,
    calendarId: "xmattv.com_8tur7t7m5r23b0nh8vg0cu1gsg@group.calendar.google.com",
    text: "january 29th at 2:20pm"
}, function(err, event) {
    if (err) {
	console.log('There was an error contacting the Calendar service: ' + err);
        return;
    }
    console.log('Event created: %s', event.htmlLink);
});
