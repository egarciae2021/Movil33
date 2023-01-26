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

function getGraficoDuracion() {
    var NumDecimales = txt_numdecimales.GetText();
    var SimDec = txt_SimDec.GetText();
    var SepMil = txt_SepMil.GetText();
    var options = {
        chart: {
            renderTo: 'grafico_duracion',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            spacingBottom: 40,
            spacingLeft: 0,
            width: 500
        },
        credits: {
            enabled: false
          },
          exporting: {
            enabled: false
          },
        labels: {
            items: [{
                html: 'Duración Total (Respecto al Gráfico) : ' + txt_duraciontotal.GetText(),
                style: {
                    left: '110px',
                    top: '285px',
                    fontSize: '11px',
                    width: '300px',
                    height: '15px',
                    color: '#000000',
                    fontWeight: 'bold'
                }
            }]
        },
        title: {
            text: 'Servicios - ' + txt_empresa.GetText(),
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
        },
        itemStyle: {
            fontSize: '10px'
        }
    },
    series: [{
        type: 'pie'
    }]
};

    $("#div_ajax5").html('<img src="~/../images/loader.gif">Generando Gráfico...');

$.ajax({
    type: "POST",
    dataType: "json",
    data: "{'sp':'SP_GET_DURACION_X_ORGANIZACION_RAD','codigo':'" + txt_codigo.GetText() + "','argumento':'COSTO','tabla':'" + txt_tabla.GetText() + "', 'telefonia': '" + txt_telefonia.GetText() + "'}",
    contentType: "application/json; charset=utf-8",
    url: "resumen_datos.aspx/getDatos",
    success: function (items) {
        
        var obj = JSON.parse(items.d);
        var series = { data: [] };

        try {
          $("#div_ajax5").hide();

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
          MostrarErrorAjax(XMLHttpRequest, "getDatos", errorThrown);
      }
  });
} 