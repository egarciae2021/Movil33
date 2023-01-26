function ArmaGraficoClasificacion2(codint) {
    var options = {
        chart: {
            renderTo: 'grafico_clasificacion_2',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: ''
        },
        tooltip: {
    },
    credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                color: '#000000',
                connectorColor: '#000000',
                formatter: function () {
                    return '<b>' + this.point.name + '</b>: ' + this.percentage.toFixed(2) + ' %';
                }
            },
            showInLegend: true
        }
    },
    legend: {
        labelFormatter: function () {
            return '<b>' + this.name + '</b>[' + this.y + ']';
        },
        layout: 'vertical'
    },
    series: [{
        type: 'pie'
    }]
};

$.ajax({
    type: "POST",
    dataType: "json",
    data: "{'fecha_consulta':'" + txt_fecha.GetText() + "','codint':'" + codint + "'}",
    contentType: "application/json; charset=utf-8",
    url: "resumen_datos.aspx/ArmaGraficoClasificacion1",
    success: function (items) {

        var obj = JSON.parse(items.d);
        var series = { data: [] };

        try {

          $.each(obj, function (itemNo, item) {
            series.data.push([itemNo, item]);
          });

          options.series.push(series);
          chart = new Highcharts.Chart(options);

        }
        catch (error) {
          //alert(error);
        }

        
    },
    cache: false,
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        MostrarErrorAjax(XMLHttpRequest, "ArmaGraficoClasificacion1", errorThrown);
    }
});
}