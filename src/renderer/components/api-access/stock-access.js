function GetAPIStr(SYM, type) {
  let url = null;
  if (type === 1) {
    url = `https://api.iextrading.com/1.0/stock/${SYM}/chart`;
  } else {
    url = `https://api.iextrading.com/1.0/stock/${SYM}/chart/1d`;
  }

  return url;
}
function retrieveStockInfo(symbol) {
  return new Promise((resolve, reject) => {
    fetch(GetAPIStr(symbol, 1))
      .then(resp => resp.json())
      .then((data) => {
        if (data === null) {
          reject();
        } else {
          data = data.reverse();
          resolve(data[0]);
        }
      });
  });
}

function getWatchlistInfo(symbol) {
  let object = null;
  return new Promise((resolve, reject) => {
    retrieveStockInfo(symbol).then((val) => {
      object = {
        symbol,
        'recent-close': val.close,
        change: val.changeOverTime.toFixed(2),
      };
      resolve(object);
    });
  });
}

function getStockInfo(symbol, type) {
  if (type === 'watchlist') {
    return getWatchlistInfo(symbol);
  }
  return null;
}

export { getStockInfo };
