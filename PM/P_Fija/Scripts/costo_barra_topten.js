//BARRA DE EMPLEADOS - COSTO
function getGraficoCostoBarraTopTen() 
{
    var NumDecimales = txt_numdecimales.GetText();
    var SimDec = txt_SimDec.GetText();
    var SepMil = txt_SepMil.GetText();
    var options = {
        chart: {
            renderTo: 'grafico_costo_topten',
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
             formatter: function() {
                return ''+
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
                    style: {
                        fontSize: '10px'
                    },
                    y:5,
                    formatter: function () {
                        return Highcharts.numberFormat(this.point.y, NumDecimales, SimDec, SepMil);
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
      colors: [],
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
                    return Highcharts.numberFormat(this.value, 0, SimDec, SepMil); //'Dur' + this.value;
                }
            }
        },
    series: [],
    exporting: {
      enabled: false
    }
};

  $("#div_ajaxtopten").html('<img src="~/../images/loader.gif">Generando Gráfico...');

  $.ajax({
      type: "POST",
      dataType: "json",
      data: "{'codigo':'" + txt_codigo.GetText() + "','tabla':" + txt_tabla.GetText() + ", 'telefonia': '" + txt_telefonia.GetText() + "'}",
      contentType: "application/json; charset=utf-8",
      url: "resumen_datos.aspx/getDatosEmpleadoCostoTopTen",
      success: function (items) {
          var obj = JSON.parse(items.d);

          try {

              $("#div_ajaxtopten").hide();

              if (items.d == "{}") {
                  $("#blanco_grafico_costo_topten").show();
                  $("#grafico_costo_topten").hide();
              }
              else {
                  $("#blanco_grafico_costo_topten").hide();
                  $("#grafico_costo_topten").show();
              }

              var total = 0.0;

              var i = 0;
              $.each(obj, function (itemNo, item) {

                  var series = {
                      type: 'bar',
                      name: itemNo,
                      categories: [],
                      data: []
                  };
                  total += parseFloat(item);

                  //                  series.colors.push('#3BBEE3');

                  series.data.push(parseFloat(item));
                  series.categories.push({ x: itemNo });
                  options.series.push(series);
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
      error: function (XMLHttpRequest, textStatus, errorThrown) {
          MostrarErrorAjax(XMLHttpRequest, "getDatosEmpleadoCostoTopTen", errorThrown);
      }
  });
}