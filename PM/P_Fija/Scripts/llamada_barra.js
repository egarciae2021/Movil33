//BARRA DE NIVELES (AREAS) - LLAMADAS
function getGraficoLlamadaBarra() 
{
    var SimDec = txt_SimDec.GetText();
    var SepMil = txt_SepMil.GetText();
    var options = {
        chart: {
            renderTo: 'grafico_llamada_barra',
            type: 'bar',
            spacingBottom: 40
        },
        credits: {
            enabled: false
        },
        title: {
            text: 'Servicios - ' + txt_empresa.GetText(),
            style: {
                font: "normal 12px Verdana",
                color: '#4572A7'
            }
            },
            exporting: {
              enabled: false
            },
        labels: {
            items: [{
                html: 'Total  de Llamadas Top Ten (Respecto al Gráfico): ' + Highcharts.numberFormat(txt_llamadastotal.GetText(), 0, SimDec, SepMil),
                style: {
                    left: '113px',
                    top: '285px',
                    fontSize: '11px',
                    width: '400px',
                    height: '15px',
                    color: '#000000',
                    fontWeight: 'bold'
                }
            }]
        },
        legend: {
            reversed: true,
            itemStyle: {
                fontSize: '8px'
            }
        },
        tooltip: {
            formatter: function () {
                return '' +
                    this.series.name + ': ' + Highcharts.numberFormat(this.y, 0, SimDec, SepMil) + ' Llamadas';
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
                    y: 5,
                    style: {
                        font: 'normal 10px Verdana, sans-serif'
                    },
                    formatter: function () {
                        return Highcharts.numberFormat(this.point.y, 0, SimDec, SepMil);
                    }
                }
            }
        },
        xAxis: {
            categories: ['']
        },
        yAxis: {
            min: 0,
            maxPadding: 0.10,
            title: {
                text: 'Nro. de Llamadas'
            },
            labels:
            {
                formatter: function () {
                    return Highcharts.numberFormat(this.value, 0, SimDec, SepMil); //'Dur' + this.value;
                }
            }
        },
        series: [],
        colors:[]
    };

      $("#div_ajax6").html('<img src="~/../images/loader.gif">Generando Gráfico...');

    $.ajax({
        type: "POST",
        dataType: "json",
        data: "{'sp':'SP_GET_LLAMADAS_X_ORGANIZACION','codigo':'" + txt_codigo.GetText() + "','argumento':'LLAMADAS','tabla':'" + txt_tabla.GetText() + "', 'telefonia': '" + txt_telefonia.GetText() + "'}",
        contentType: "application/json; charset=utf-8",
        url: "resumen_datos.aspx/getDatos2",
        success: function (items) {
            
            var obj = JSON.parse(items.d);
            
            try {

              $("#div_ajax6").hide();

              if (items.d == "{}") {
                  $("#blanco_grafico_llamada_barra").show();
                  $("#grafico_llamada_barra").hide();
              }
              else {
                  $("#blanco_grafico_llamada_barra").hide();
                  $("#grafico_llamada_barra").show();
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
                  options.colors.push(colorArray[i]);
                  i = i + 1;
                  if (i > colorArray.length - 1) {
                      i = 0;
                  }
                }

              });

          options.labels.items[0]['html'] = 'Total de Llamadas Top Ten (Respecto al Gráfico) : ' + Highcharts.numberFormat(parseFloat(total), 0, SimDec, SepMil);
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