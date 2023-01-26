function ArmaGraficoClasificacion1(codint, div, sp) {
    var NumDecimales = txt_numdecimales.GetText();
    var SimDec = txt_SimDec.GetText();
    var SepMil = txt_SepMil.GetText();
    var options = {
        chart: {
            renderTo: div,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            width: 850
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
                return '<b>' + this.point.name + '</b>: ' + Highcharts.numberFormat(this.y, 0, SimDec, SepMil) + ' Llamadas';
            }
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
                    return '<b>' + this.point.name + '</b>: ' + Highcharts.numberFormat(this.percentage.toFixed(NumDecimales), NumDecimales, SimDec, SepMil) + ' %';
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
    data: "{'fecha_consulta':'" + txt_fecha.GetText() + "','codint':'" + codint + "','sp':'"+sp+"'}",
    contentType: "application/json; charset=utf-8",
    url: "resumen_datos.aspx/ArmaGraficoClasificacion1",
    success: function (items) {

        if (items.d == "{}") {
            $("#blanco_" + div.id).show();
            $("#" + div.id).hide();
        }
        else {
            $("#blanco_" + div.id).hide();
            $("#" + div.id).show();
        }

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