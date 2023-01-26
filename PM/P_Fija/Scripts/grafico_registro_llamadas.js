function ArmaGraficoRegistroLlamada() {
    var options = {
        chart: {
            renderTo: 'llam_graf_1',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        credits: {
            enabled: false
          },
          exporting: {
            enabled: false
          },
        title: {
            text: '',
            style: {
                font: "normal 12px Verdana",
                color: '#4572A7'
            }
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.point.name + '</b>: ' + this.y;
            }  
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
    data: "{'codigo_empleado':'" + txt_codigo.GetText() + "','tabla':'" + txt_fecha.GetText() + "'}",
    contentType: "application/json; charset=utf-8",
    url: "registro_llamadas.aspx/getDatos",
    success: function (items) {

        var obj = JSON.parse(items.d);
        var series = { data: [] };

        $.each(obj, function (itemNo, item) {
            series.data.push([itemNo, item]);
        });

        options.series.push(series);
        chart = new Highcharts.Chart(options);
    },
    cache: false,
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        MostrarErrorAjax(XMLHttpRequest, "getDatos", errorThrown);
    }
});
}