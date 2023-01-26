//BARRA DE EMPLEADOS - DURACION
function getGraficoCostoBarraTopTenDuracion() 
{
  var options = {
    chart: {
      renderTo: 'grafico_duracion_topten',
      type: 'bar',
      spacingBottom: 25
    },
    title: {
      text: 'Top Ten - ' + txt_empresa.GetText(),
      style: {
        font: "normal 12px Verdana",
        color: '#4572A7'
      }
    },
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    labels: {
      items: [{
          html: 'Duración Total Top Ten (Respecto al Gráfico) : ' + txt_duraciontotal.GetText(),
        style: {
          left: '105px',
          top: '285px',
          fontSize: '11px',
          width: '400px',
          height: '15px',
          color: '#000000',
          fontWeight: 'bold'
        }
      }]
    },
    tooltip: {
      formatter: function () {
        return '' +
                    this.series.name + ': ' + FormatoMiliSegundos(this.y*1000);
      }
    },
    plotOptions: {
      series: {
        groupPadding: -0.005
      },
      bar: {
        dataLabels: {
          enabled: true,
          formatter: function () {
            return FormatoMiliSegundos(this.y * 1000);
          },
          color: '#000000',
          y: 5,
          style: {
            fontSize: '10px'
          }
        }
      }
},
legend: {
    reversed: true,
    itemStyle: {
        fontSize: '8px'
    }
},
    xAxis: {
      categories: ['']
    },
    yAxis: {
      maxPadding: 0.10,
      title: {
        text: 'Duración'
      },
      labels:
            {
              formatter: function () {
                return ''; // FormatoMiliSegundos(this.value * 1000);
              }
            }
    },
    series: [],
    colors:[]
  };

$("#div_ajaxtoptenduracion").html('<img src="~/../images/loader.gif">Generando Gráfico...');

$.ajax({
    type: "POST",
    dataType: "json",
    data: "{'codigo':'" + txt_codigo.GetText() + "','tabla':" + txt_tabla.GetText() + ", 'telefonia': '" + txt_telefonia.GetText() + "'}",
    contentType: "application/json; charset=utf-8",
    url: "resumen_datos.aspx/getDatosEmpleadoCostoTopTenDuracion",
    success: function (items) {

        var obj = JSON.parse(items.d);

        try {

            if (items.d == "{}") {
                $("#blanco_grafico_duracion_topten").show();
                $("#grafico_duracion_topten").hide();
            }
            else {
                $("#blanco_grafico_duracion_topten").hide();
                $("#grafico_duracion_topten").show();
            }

            $("#div_ajaxtoptenduracion").hide();

            var total = 0.0;

            var i = 0;
 
            $.each(obj, function (itemNo, item) {

                total += parseFloat(item);

                var series = {
                    type: 'bar',
                    name: itemNo,
                    categories: [],
                    data: []
                };             

                series.data.push(parseFloat(item));
                series.categories.push({ x: itemNo });
                options.series.push(series);
                options.colors.push(colorArray[i]);
                i = i + 1;
                if (i > colorArray.length - 1) {
                    i = 0;
                }
            });

            options.labels.items[0]['html'] = 'Duración Total Top Ten (Respecto al Gráfico) : ' + txt_duraciontotal.GetText();
            //options.labels.items[0]['html'] = 'Duración Total Top Ten (Respecto al Gráfico) : ' + FormatoMiliSegundos(total * 1000);

            chart = new Highcharts.Chart(options);

        }
        catch (error) {
       
        }


    },
    cache: false,
    //error: function (XMLHttpRequest, textStatus, errorThrown) { alert(errorThrown); }
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        MostrarErrorAjax(XMLHttpRequest, "getDatosEmpleadoCostoTopTenDuracion", errorThrown);
    }
});
}