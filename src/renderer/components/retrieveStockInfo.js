function GetAPIStr(SYM, type) {
	var url = null;
	if(type == 1) {
		url = "https://api.iextrading.com/1.0/stock/" + SYM + "/chart/1m"
	}
	else {
		url = "https://api.iextrading.com/1.0/stock/" + SYM + "/chart/1d"
	}

	return url;	
}
function getCloseVals(sym, days) {
	return new Promise((resolve,reject) => {
		fetch(GetAPIStr(sym,1))
		.then((resp) => resp.json())
		.then(function(data) {
			data = data.reverse();
			var Arry = data.slice(0, days);
			//Returns full stock objects in an array of the specified length
			//Reverse again to get the correct order 
			if(days == 1) {
				getRecentChange(sym).then((perChange) => {
					Arry[0]["change"] = perChange;
				});
			}
			resolve(Arry.reverse());
		});
	});
}
export {getCloseVals}

function getRecentChange(sym) {
	return new Promise((resolve, reject) => {
		fetch(GetAPIStr(sym, 1))
		.then((resp) => resp.json())
		.then(function(data) {
			data.reverse();
			var open = data[0]["close"];
			var close = data[1]["close"];
			var val = close - open;
			val = (val/open) * 100;
			resolve(val.toFixed(2));
		});
	});
}
export {getRecentChange}

function fullObj(data) {
	const stock = {
		symbol: sym,
		close: val
	}
	return stock;
}
