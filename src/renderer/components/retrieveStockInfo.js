function GetAPIStr(SYM) {
	var url = "https://api.iextrading.com/1.0/stock/" + SYM + "/chart/1m"

	return url;	
}
function getCloseVals(sym, days) {
	return new Promise((resolve,reject) => {
		fetch(GetAPIStr(sym))
		.then((resp) => resp.json())
		.then(function(data) {
			var Arry = data.slice(0,days);
			//Returns full stock objects in an array of the specified length
			resolve(Arry);
		});
	});
}
export {getCloseVals}

function fullObj(data) {
	const stock = {
		symbol: sym,
		close: val
	}
	return stock;
}
