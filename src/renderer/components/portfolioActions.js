import firebase from 'firebase';

function addTransaction(obj, dbRef) {
	return new Promise((resolve, reject) => {
		dbRef.insert(obj, (err, newDoc) => {
			resolve(newDoc);
		});
	});
}

export{addTransaction}


function retrieveTransactions(dbRef) {
	return new Promise((resolve,reject) => {
		dbRef.find({'u-id': firebase.auth().currentUser.uid}, function(err, docs) {
			resolve(docs);
		});
	});
}

function retrieveTransactions(dbRef, type) {
	return new Promise((resolve,reject) => {
		dbRef.find({'u-id': firebase.auth().currentUser.uid, 'type': type}, function(err, docs) {
			resolve(docs);
		});
	});
}

export {retrieveTransactions}


