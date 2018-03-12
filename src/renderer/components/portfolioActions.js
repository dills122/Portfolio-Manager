import firebase from 'firebase';

function addTransaction(obj) {
	return new Promise((resolve, reject) => {
		this.$pfdb.insert(obj, (err, newDoc) => {
			resolve(err);
		});
	});
}

export{addTransaction}


function retrieveTransactions() {
	return new Promise((resolve,reject) => {
		this.$pfdb.find({'u-id': firebase.auth().currentUser.uid}, function(err, docs) {
			resolve(docs);
		});
	});
}

export {retrieveTransactions}


