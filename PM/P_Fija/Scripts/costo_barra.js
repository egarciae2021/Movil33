//BARRA DE NIVELES (AREAS) - COSTO
function getGraficoCostoBarra() {
    var NumDecimales = txt_numdecimales.GetText();
    var SimDec = txt_SimDec.GetText();
    var SepMil = txt_SepMil.GetText();
    var options = {
        chart: {
            renderTo: 'grafico_costo_barra',
            type: 'bar',
            spacingBottom: 25,
            width: 500,
            marginRight: 60
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
                html: 'Costo Total Top Ten (Respecto al Gráfico) : ' + Highcharts.numberFormat(txt_costototal.GetText(), NumDecimales, SimDec, SepMil),
                style: {
                    left: '110px',
                    top: '285px',
                    fontSize: '11px',
                    width: '400px',
                    height: '15px',
                    color: '#000000',
                    fontWeight: 'bold'
                }
            }]
        },
        loading: {
            hideDuration: 1000,
            showDuration: 1000
        },
        tooltip: {
            formatter: function () {
                return '' +
                    this.series.name + ': ' + Highcharts.numberFormat(this.y, NumDecimales, SimDec, SepMil);
            }
        },
        plotOptions: {
            series: {
              groupPadding: -0.005
            },
            bar: {
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    align: 'left',
                    y:5,
                    formatter: function () {
                        return Highcharts.numberFormat(this.y, NumDecimales, SimDec, SepMil);
                    },
                    style: {
                        font: 'normal 10px Verdana, sans-serif'
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
            min: 0,
            maxPadding: 0.10,
            title: {
                text: ''//Nuevos Soles (S/.)
            },
            labels:
            {
              formatter: function () {
                //return FormatoMiliSegundos(this.value);
                return Highcharts.numberFormat(this.value, 0, SimDec, SepMil); //'Dur' + this.value;
              }
            }
        },
        series: [],
        colors:[]
    };

    chart = new Highcharts.Chart(options);

    $("#div_ajax").html('<img src="~/../images/loader.gif">Generando Gráfico...');

    $.ajax({
      type: "POST",
      dataType: "json",
      data: "{'sp':'SP_GET_COSTO_X_ORGANIZACION','codigo':'" + txt_codigo.GetText() + "','argumento':'COSTO','tabla':'" + txt_tabla.GetText() + "', 'telefonia': '" + txt_telefonia.GetText() + "'}",
      contentType: "application/json; charset=utf-8",
      url: "resumen_datos.aspx/getDatos2",
      success: function (items) {

        var obj = JSON.parse(items.d);

        try {

          $("#div_ajax").hide();

          if (items.d == "{}") {
              $("#blanco_grafico_costo_barra").show();
              $("#grafico_costo_barra").hide();
          }
          else {
              $("#blanco_grafico_costo_barra").hide();
              $("#grafico_costo_barra").show();
          }

          var total = 0.0;
          var i = 0;
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

          options.labels.items[0]['html'] = 'Costo Total Top Ten (Respecto al Gráfico) : ' + Highcharts.numberFormat(total, NumDecimales, SimDec, SepMil);

          chart = new Highcharts.Chart(options);

        }
        catch (error) {
          //alert(error);
        }





      },
      cache: false,
      //error: function (XMLHttpRequest, textStatus, errorThrown) { alert(errorThrown); }
      error: function (XMLHttpRequest, textStatus, errorThrown) {
          MostrarErrorAjax(XMLHttpRequest, "getDatos2", errorThrown);
      }
    });
}