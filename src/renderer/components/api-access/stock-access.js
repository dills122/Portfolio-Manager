import numeral from 'numeral';

function GetAPIStr(SYM, type) {
  let url = null;
  if (type === 1) {
    url = `https://api.iextrading.com/1.0/stock/${SYM}/chart`;
  } else if (type === 2) {
    url = `https://api.iextrading.com/1.0/stock/${SYM}/stats`;
  } else if (type.toString().indexOf('3') > -1) {
    url = listType('https://api.iextrading.com/1.0/stock/', type.toString().replace('3', ''));
  } else {
    url = `https://api.iextrading.com/1.0/stock/${SYM}/chart/1d`;
  }

  return url;
}
function listType(url, listType) {
    if(listType === '1') {
      return url + 'market/list/gainers';
    } else {
      return url + 'market/list/losers';
    }
}

function retrieveListInfo(listType) {
  return new Promise((resolve,reject) => {
    fetch(GetAPIStr(null, listType))
      .then(resp => resp.json())
      .then((data) => {
        if(data === null) {
          reject();
        } else {
          resolve(data);
        }
      });
  });
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
          //console.log(`Data Api Recieved${data}`);
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
        'recent-close': numeral(val.close).format('$0,0.00'),
        change: numeral(val.changeOverTime).format('(0.00 %)'),
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

function getListInfo(listType) {
  let listObjects = [];
  return new Promise((resolve, reject) => {
    retrieveListInfo(listType).then((value) => {
      if(value !== null) {
        value.forEach((element) => {
          listObjects.push(constructListObj(element));
        });
        resolve(listObjects);
      } else {
       reject(); 
      }
    });
  });
}

function getStockInfo(symbol, type) {
  if (type === 'watchlist') {
    return getWatchlistInfo(symbol);
  }
  return null;
}

function constructListObj(obj) {
  const listItem = {
    symbol: obj.symbol,
    name: obj.companyName,
    ytd: numeral(obj.ytdChange).format('0.00 %'),
  };
  return listItem;
}

function constructKeyStatsObj(obj) {
  const keyStats = {
    symbol: obj.symbol,
    name: obj.companyName,
    marketCap: numeral(obj.marketcap).format('($ 0.00 a)'),
    yearHigh: numeral(obj.week52high).format('$0,0.00'),
    yearLow: numeral(obj.week52low).format('$0,0.00'),
    yearChange: numeral(obj.week52change).format('(0.000 %)'),
    dividendYield: numeral(obj.dividendYield).format('(0.000 %)'),
    revenue: numeral(obj.revenue).format('($ 0.00 a)'),
    debt: numeral(obj.debt).format('($ 0.00 a)'),
    cash: numeral(obj.cash).format('($ 0.00 a)'),
    grossProfit: numeral(obj.grossProfit).format('($ 0.00 a)'),
  };
  return keyStats;
}

export { getStockInfo, getKeyStatsInfo, getListInfo };
