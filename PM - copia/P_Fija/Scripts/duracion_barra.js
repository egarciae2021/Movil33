//BARRA DE NIVELES (AREAS) - DURACION
function getGraficoDuracionBarra() {
  var options = {
    chart: {
      renderTo: 'grafico_duracion_barra',
      type: 'bar',
      spacingBottom: 40
    },
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    title: {
      text: 'Top Ten - ' + txt_empresa.GetText(),
      style: {
        font: "normal 12px Verdana",
        color: '#4572A7'
      }
},
legend: {
    reversed: true,
    itemStyle: {
        fontSize: '8px'
    }
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
            return FormatoMiliSegundos(this.y*1000);
          },
          color: '#000000',
          y: 5,
          style: {
            font: 'normal 10px Verdana, sans-serif'
          }
        }
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
                //return FormatoMiliSegundos(this.value);
                return ''; //'Dur' + this.value;
              }
            }
    },
    series: [],
    colors:[]
  };

  $("#div_ajax4").html('<img src="~/../images/loader.gif">Generando Gráfico...');
    var sp = "SP_GET_DURACION_X_ORGANIZACION";

    $.ajax({
      type: "POST",
      dataType: "json",
      data: "{'sp':'" + sp + "','codigo':'" + txt_codigo.GetText() + "','argumento':'DURACION','tabla':'" + txt_tabla.GetText() + "', 'telefonia': '" + txt_telefonia.GetText() + "'}",
      contentType: "application/json; charset=utf-8",
      url: "resumen_datos.aspx/getDatos2",
      success: function (items) {

        var obj = JSON.parse(items.d);
       
        var i = 0;
        try {

            if (items.d == "{}") {
                $("#blanco_grafico_duracion_barra").show();
                $("#grafico_duracion_barra").hide();
            }
            else {
                $("#blanco_grafico_duracion_barra").hide();
                $("#grafico_duracion_barra").show();
            }

            $("#div_ajax4").hide();

          var total = 0.0;

          $.each(obj, function (itemNo, item) {

            total += parseFloat(item);
            
            if (itemNo == 'EMPLEADOS') {

              if (item > 0) {
              

              var series = {
                type: 'pie',
                name: itemNo,
                categories: [],
                data: [{ name: itemNo,
                  y: item
                }],
                center: [450, 140],
                size: 60,
                showInLegend: true,
                dataLabels: {
                  align: 'left',
                  rotation: 0,
                  x: -40,
                  y: 5,
                  enabled: true
                }
              };
              options.series.push(series);
            }
            
          }
          else {
            var series = {
              type: 'bar',
              name: itemNo,
              categories: [],
              data: []
            };

            series.data.push(parseFloat(item));
            series.categories.push({ x: itemNo });
            options.series.push(series);
        }
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
          //alert(error);
        }


      },
      cache: false,
      error: function (XMLHttpRequest, textStatus, errorThrown) {
          MostrarErrorAjax(XMLHttpRequest, "getDatos2", errorThrown);
      }
    });
}