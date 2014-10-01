angular.module('cmm.charts')
.directive('priceChart', ['Sockets', function (Sockets) {
  var priceChartOptions = {
    chartArea: { width: '100%', height: '100%' },
    axisTitlesPosition: 'in',
    legend: 'none',
    vAxis: { title: 'USD Price per BTC', textPosition: 'in' },
    hAxis: { textPosition: 'in' },
    curveType: 'function',
    intervals: { style: 'area' },
    tooltip: { isHtml: true },
    crosshair: { trigger: 'selection' }
  };

  return {
    restrict: 'E',
    template: '<div class="col"></div>',
    replace: true,
    link: function (scope, element, attrs) {
      var rawPriceData, priceChart;

      var processPriceChartData = function(data) {
        var dataTable = {};
        dataTable.price = {};
        dataTable.volume = {};
        dataTable.price.cols = [
          { id: 'date', label: 'Date', type: 'datetime' },
          { id: 'vwap', label: 'VWAP', type: 'number' },
          { id: 'high', type: 'number', role: 'interval' },
          { id: 'low', type: 'number',  role: 'interval' },
          { id: 'tooltip', type: 'string', role: 'tooltip', p: { html: true } }
        ];
        dataTable.price.rows = [];
        dataTable.volume.cols = [
          { id: 'date', label: 'Date', type: 'datetime' },
          { id: 'volume', label: 'Volume', type: 'number' },
          { id: 'tooltip', type: 'string', role: 'tooltip', p: { html: true } }
        ];
        dataTable.volume.rows = [];
        data.forEach(function(el) {
          el.date = new Date(el.date);
          dataTable.price.rows.push(
            { c: [ 
              { v: el.date },
              { v: el.vwap },
              { v: el.high },
              { v: el.low },
              // {v: tooltipTemplate(el) }
            ] } );

          dataTable.volume.rows.push(
            { c: [
              { v: el.date },
              { v: el.volume },
              // { v: tooltipTemplate(el) }
            ] } );
        });
        return dataTable;
      };

      var drawPriceChart = function() {
        priceChartData = new google.visualization.DataTable(rawPriceData.price);
        // volumeChartData = new google.visualization.DataTable(rawPriceData.volume);
        priceChart.draw(priceChartData, priceChartOptions);
        // volumeChart.draw(volumeChartData, volumeChartOptions);
      };

      Sockets.priceData.on('update', function(data) {
        rawPriceData = processPriceChartData(data);
   
        priceChart = new google
          .visualization
          .LineChart(element[0]);
        // volumeChart = new google
        //   .visualization
        //   .AreaChart(document.getElementById('volumeChart'));
        if (rawPriceData) { drawPriceChart(); }
      });
    }
  };
}])