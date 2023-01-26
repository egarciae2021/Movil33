function ArmaGraficoDistribucionPorOperador(div, tipo, codint) {
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
            width:850
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
                return '<b>' + this.point.name + '</b>: ' + Highcharts.numberFormat(this.y, NumDecimales, SimDec, SepMil);
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
                    return '<b>' + this.point.name + '</b>: ' + Highcharts.numberFormat(this.percentage.toFixed(NumDecimales), NumDecimales, SimDec, SepMil) + ' %';
                }
            },
            showInLegend: true
        }
    },
    legend: {
        labelFormatter: function () {
            return '<b>' + this.name + '</b>[' + Highcharts.numberFormat(this.y, NumDecimales, SimDec, SepMil) + ']';
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
    data: "{'fecha_consulta':'" + txt_fecha.GetText() + "','codint':'" + codint + "','tipo':'" + tipo + "','telefonia':'" + txt_telefonia.GetText() + "'}",
    contentType: "application/json; charset=utf-8",
    url: "resumen_datos.aspx/ArmaGraficoDistribucionPorOperador",
    success: function (items) {

        if (items.d == "{}") {
            $("#blanco_" + div).show();
            $("#" + div).hide();
        }
        else {
            $("#blanco_" + div).hide();
            $("#" + div).show();
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
        MostrarErrorAjax(XMLHttpRequest, "ArmaGraficoDistribucionPorOperador", errorThrown);
    }
});
}