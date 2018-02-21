//Create all of the necessary dbs for the application
import firebase from 'firebase'

function initializeApp() {
	//Creates the needed Databases if they do not exist yet
	createDb();
}

function createDb() {

	var wList = {
		id : firebase.auth().currentUser.uid,
		WList: []
	}
	//Inserts an empty Db for Watch List
	if(!checkDb()) {
		this.$db.insert(wList, function(err, docs) {

		});
	}
}



function checkDb() {
	this.$db.find({id: firebase.auth().currentUser.uid}, 
		function(err, docs) {
			console.log(err);
			if(!err) {
				return true;
			} else {
				return false;
			}
	});
}