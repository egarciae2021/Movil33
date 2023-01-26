function ArmaGraficoHistoricoCelular(codint) {
    var NumDecimales = txt_numdecimales.GetText();
    var SimDec = txt_SimDec.GetText();
    var SepMil = txt_SepMil.GetText();
    var options = {
        chart: {
            renderTo: 'grafico_historico_celular',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        credits: {
            enabled: false
          },
          exporting: {
            enabled: false
          },
        title: {
            text: 'CONSUMO CELULAR',
            style: {
                font: "normal 11px Verdana"
            }
        },
        xAxis: [],
        yAxis: [{
            labels: {
                formatter: function () {
                    return Highcharts.numberFormat(this.value, NumDecimales, SimDec, SepMil);
                },
                style: {
                    color: '#89A54E'
                }
            },
            title: {
                text: 'Monto',
                style: {
                    color: '#89A54E'
                }
            }
        }, {
            title: {
                text: 'Poblacion',
                style: {
                    color: '#4572A7'
                }
            },
            labels: {
                formatter: function () {
                    return this.value + ' Personas';
                },
                style: {
                    color: '#4572A7'
                }
            },
            opposite: true
        }],
        tooltip: {
            formatter: function () {
                if (this.series.name == 'Poblacion') {
                    return '' + this.x + ': ' + this.y + ' Personas';
                }
                else {
                    return '' + this.x + ': ' + Highcharts.numberFormat(this.y, NumDecimales, SimDec, SepMil);
                }
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
                return '<b>' + this.name;
            },
            layout: 'vertical'
        },
        series: [
        ]
    };

    $.ajax({
        type: "POST",
        dataType: "json",
        data: "{'fecha_consulta':'" + txt_fecha.GetText() + "','codint':'" + codint + "', 'telefonia':'" + txt_telefonia.GetText() + "'}",
        contentType: "application/json; charset=utf-8",
        url: "resumen_datos.aspx/DetallePoblacionPorServicioAjax",
        success: function (items) {
            txt_detalles2.SetText(items.d);
        },
        cache: false,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            MostrarErrorAjax(XMLHttpRequest, "DetallePoblacionPorServicioAjax", errorThrown);
        }
    });

    $.ajax({
        type: "POST",
        dataType: "json",
        data: "{'fecha_consulta':'" + txt_fecha.GetText() + "','codint':'" + codint + "','tipo':'celcosto', 'telefonia':'" + txt_telefonia.GetText() + "'}",
        contentType: "application/json; charset=utf-8",
        url: "resumen_datos.aspx/getDatosHistoricos",
        success: function (items) {

            if (items.d == "{}") {
                $("#blanco_grafico_historico_celular").show();
                $("#grafico_historico_celular").hide();
            }
            else {
                $("#blanco_grafico_historico_celular").hide();
                $("#grafico_historico_celular").show();
            }

            txt_detalles.SetText(items.d);
            var obj = JSON.parse(items.d);
            var series1 = { data: [], name: 'Poblacion', type: "column", yAxis: 1 };
            var series2 = { data: [], name: 'Monto', type: "spline", color: '#89A54E' };
            var xAxis1 = { categories: [],
                labels: {
                    rotation: -45,
                    align: 'right',
                    style: {
                        font: 'normal 8px Verdana, sans-serif'
                    }
                }
            };

            $.each(obj, function (itemNo, item) {
                var valores = item.split(";");
                series1.data.push([itemNo, parseInt(valores[0])]);
                series2.data.push([itemNo, parseFloat(valores[1])]);
                xAxis1.categories.push([itemNo]);
            });

            options.series.push(series1);
            options.series.push(series2);
            options.xAxis.push(xAxis1);
            chart = new Highcharts.Chart(options);
        },
        cache: false,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            MostrarErrorAjax(XMLHttpRequest, "getDatosHistoricos", errorThrown);
        }
    });

}