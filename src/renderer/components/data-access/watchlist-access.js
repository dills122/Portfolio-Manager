import watchlistDb from '../../datastore/watchlist';

function retrieveWatchlist(uid) {
	return new Promise((resolve, reject) => {
		watchlistDb.find({'u-id': uid}, function(err, docs) {
			if(docs !== null) {
				resolve(docs);
			} else {
				reject(err);
			}
		});
	});
}

function addWatchlistItem(document) {
	return new Promise((resolve, reject) => {
		watchlistDb.insert(document, function(err, addDocument) {
			if(addDocument !== null) {
				resolve(addDocument);
			} else {
				reject(err);
			}
		});
	});
}

export {retrieveWatchlist, addWatchlistItem};
