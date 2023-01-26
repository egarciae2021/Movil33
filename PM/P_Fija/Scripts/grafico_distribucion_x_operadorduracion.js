function FormatoSegundos(segundos) {
    var hours = Math.floor(segundos / 3600);
    var minutes = Math.floor((segundos - (hours * 3600)) / 60);
    var segundos = segundos - (hours * 3600) - (minutes * 60);
    var time = "";

    if (hours != 0 && hours < 10) {
        time = "0" + hours + ":";
    }

    if (hours != 0 && hours > 9) {
        time = hours + ":";
    }

    if (minutes != 0 || time !== "") {
        minutes = (minutes < 10 && time !== "") ? "0" + minutes : String(minutes);
        time += minutes + ":";
    }

    if (time === "") {
        time = segundos;
    }
    else {
        time += (segundos < 10) ? "0" + segundos : String(segundos);
    }
    return time;
}

function ArmaGraficoDistribucionPorOperadorDuracion(div, tipo, codint) {
    var NumDecimales = txt_numdecimales.GetText();
    var SimDec = txt_SimDec.GetText();
    var SepMil = txt_SepMil.GetText();
    var options = {
        chart: {
            renderTo: div,
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
                return '<b>' + this.point.name + '</b>: ' + FormatoSegundos(this.y);
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
            return '<b>' + this.name + '</b>[' + FormatoSegundos(this.y) + ']';
        }
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
    url: "resumen_datos.aspx/ArmaGraficoDistribucionPorOperadorDuracion",
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
        MostrarErrorAjax(XMLHttpRequest, "ArmaGraficoDistribucionPorOperadorDuracion", errorThrown);
    }
});
}