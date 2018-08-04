import numeral from 'numeral';

function GetAPIStr(SYM, type) {
  let url = null;
  if (type === 1) {
    url = `https://api.iextrading.com/1.0/stock/${SYM}/chart`;
  } else if (type === 2) {
    url = `https://api.iextrading.com/1.0/stock/${SYM}/stats`;
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

function retrieveKeyStatsInfo(symbol) {
  return new Promise((resolve, reject) => {
    fetch(GetAPIStr(symbol, 2))
      .then(resp => resp.json())
      .then((data) => {
        if (data === null) {
          reject();
        } else {
          console.log(`Data Api Recieved${data}`);
          resolve(data);
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

function getKeyStatsInfo(symbol) {
  return new Promise((resolve, reject) => {
    retrieveKeyStatsInfo(symbol).then((value) => {
      resolve(constructKeyStatsObj(value));
    });
  });
}

function getStockInfo(symbol, type) {
  if (type === 'watchlist') {
    return getWatchlistInfo(symbol);
  }
  return null;
}

function constructKeyStatsObj(obj) {
  const keyStats = {
    symbol: obj.symbol,
    name: obj.companyName,
    marketCap: numeral(obj.marketcap).format('$0,0'),
    yearHigh: numeral(obj.week52high).format('$0,0'),
    yearLow: numeral(obj.week52low).format('$0,0'),
    yearChange: obj.week52change,
    dividendYield: obj.dividendYield,
    revenue: numeral(obj.revenue).format('$0,0'),
    debt: numeral(obj.debt).format('$0,0'),
    cash: numeral(obj.cash).format('$0,0'),
    grossProfit: numeral(obj.grossProfit).format('$0,0'),
  };
  return keyStats;
}

export { getStockInfo, getKeyStatsInfo };
