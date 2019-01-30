const {google} = require('googleapis');
const privatekey = require('./../private/tammy196.json');

const client = new google.auth.JWT(
    privatekey.client_email,
    null,
    privatekey.private_key,
    ['https://www.googleapis.com/auth/contacts']
);

const service = google.people({version: 'v1', auth: client});
service.people.connections.list({
    resourceName: 'people/me',
    personFields: 'names,phoneNumbers',
    fields: 'connections(names/displayName,phoneNumbers/canonicalForm)'
}, (err, res) => {
    console.log("We're in the callback");
    if (err) {
	console.log("Error section of callback" + err);
	return;
    }
    
    const connections = res.data.connections;
    if (connections) {
	console.log('Connections:' + connections);
	connections.forEach((person) => {
	    console.log("Person loop");
	    console.log(person);
	    if (person && person.phoneNumbers && person.names && person.names.length > 0) {
		person.phoneNumbers.forEach(
		    (phoneNumber) => {
			if (phoneNumber.canonicalForm && (phoneNumber.canonicalForm === "+18573158026" || phoneNumber.canonicalForm.endsWith("8573158026"))) {
			    console.log( person.names[0].displayName );
			    console.log("found!");
			    return;
			}
		    });
	    }
	});
    } else {
	console.log("No connections?!?");
    }
});
