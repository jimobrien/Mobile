angular.module('cmm.charts')
.directive('priceDistChart', ['Sockets', function (Sockets) {
  var priceDistOptions = {
      hAxis: { title: 'Price' },
      vAxis: { title: 'Quantity' },
      theme: 'maximized',
      isStacked: true
  };

  return {
    restrict: 'E',
    template: '<div class="col"></div>',
    replace: true,
    link: function (scope, element, attrs) {
      var rawPriceDistData, priceDistChart;

      var processPriceDistData = function(data) {
        var exchanges = ['Exchanges'];
        var prices = [];
        var dataTable = [];
        data.forEach(function(el) {
          if (!_.contains(exchanges, el.exchange)) {
            exchanges.push(el.exchange);
          }
          if (!_.contains(prices, el.price)) {
            prices.push(el.price);
          }
        });
        exchanges.push({role: 'annotation'});
        dataTable.push(exchanges);
        prices.forEach(function(price) {
          var row = [price];
          for (var i = 1; i < exchanges.length - 1; i++) {
            row.push(0);
          }
          row.push('');
          dataTable.push(row);
        });

        data.forEach(function(el) {
          var x = exchanges.indexOf(el.exchange);
          var y = prices.indexOf(el.price) + 1;
          dataTable[y][x] = Number(el.volume.toFixed(2));
        });
        return dataTable;
      };  

      var drawPriceDistChart = function() {
        var priceDistData = google.visualization.arrayToDataTable(rawPriceDistData);
        priceDistChart.draw(priceDistData, priceDistOptions);
      };

      Sockets.priceDist.on('update', function(data) {
        rawPriceDistData = processPriceDistData(data);
        priceDistChart = new google
          .visualization
          .ColumnChart(element[0]);

          if (rawPriceDistData) { drawPriceDistChart(); }      
      });
    }
  };
}])