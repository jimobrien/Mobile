angular.module('cmm.sockets', ['btford.socket-io'])
.factory('Sockets', ['socketFactory', function (socketFactory) {
  var connections = {
    cov: io.connect('http://api.marketmonitor.io:80/BTC/USD/coefficientOfVariation'),
    trades: io.connect('http://api.marketmonitor.io:80/BTC/USD/trades'),
    summary: io.connect('http://api.marketmonitor.io:80/BTC/USD/summary'),
    priceDist: io.connect('http://api.marketmonitor.io:80/BTC/USD/priceDistribution'),
    priceData: io.connect('http://api.marketmonitor.io:80/BTC/USD/priceCharts/fifteenMinutes'),
    rangeDetails: io.connect('http://api.marketmonitor.io:80/BTC/USD/range'),
    volumeDetails: io.connect('http://api.marketmonitor.io:80/BTC/USD/volume')    
  };

  var sockets = {
    cov: socketFactory({ ioSocket: connections.cov }),
    trades: socketFactory({ ioSocket: connections.trades }),
    summary: socketFactory({ ioSocket: connections.summary }),
    priceDist: socketFactory({ ioSocket: connections.priceDist }),
    priceData: socketFactory({ ioSocket: connections.priceData }),
    rangeDetails: socketFactory({ ioSocket: connections.rangeDetails }),
    volumeDetails: socketFactory({ ioSocket: connections.volumeDetails }),
  };
  

  return sockets;
}]);