function ArmaGraficoDestino1(codint) {
    var NumDecimales = txt_numdecimales.GetText();
    var SimDec = txt_SimDec.GetText();
    var SepMil = txt_SepMil.GetText();
    var options = {
        chart: {
            renderTo: 'grafico_destinos_1',
            type: 'bar'
        },
        credits: {
            enabled: false
          },
          exporting: {
            enabled: false
          },
        title: {
            text: 'LLAMADAS NACIONALES' ,
            style: {
                font: "normal 12px Verdana",
                color: '#4572A7'
            }
        },
        tooltip: {
             formatter: function() {
                return ''+
                    this.series.name + ': ' + Highcharts.numberFormat(this.y, 0, SimDec, SepMil) + ' Llamadas';
             }
        },
          plotOptions: {
              series: {
                groupPadding: -0.005
              },
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
       xAxis: {
            categories: []
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Llamadas'
            },
            labels:
            {
                formatter: function () {
                    return Highcharts.numberFormat(this.value, 0, SimDec, SepMil);
                }
            }
        },
    series: []
};


$.ajax({
    type: "POST",
    dataType: "json",
    data: "{'fecha_consulta':'" + txt_fecha.GetText() + "','codint':'" + codint + "'}",
    contentType: "application/json; charset=utf-8",
    url: "resumen_datos.aspx/ArmaGraficoDestino1",
    success: function (items) {

        var obj = JSON.parse(items.d);

        try {

            if (items.d == "{}") {
                $("#blanco_grafico_destinos_1").show();
                $("#grafico_destinos_1").hide();
            }
            else {
                $("#blanco_grafico_destinos_1").hide();
                $("#grafico_destinos_1").show();
            }

          $.each(obj, function (itemNo, item) {
            var series = {
              type: 'bar',
              name: itemNo,
              categories: [],
              data: []
            };

            series.data.push(parseFloat(item));
            series.categories.push({ x: itemNo });
            options.series.push(series);
            //options.xAxis.categories.push(series.name);

          });
          chart = new Highcharts.Chart(options);

        }
        catch (error) {
          //alert(error);
        }


        
    },
    cache: false,
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        MostrarErrorAjax(XMLHttpRequest, "ArmaGraficoDestino1", errorThrown);
    }
});
}