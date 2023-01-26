function fillChart1(chart) {
    chartTopTen = chart;
};

function ArmaGraficoTopTen(codint, empresa) {
    var NumDecimales = txt_numdecimales.GetText();
    var SimDec = txt_SimDec.GetText();
    var SepMil = txt_SepMil.GetText();
    var customFormatPointName = function (pointName) {
        var label = pointName.split(";");
        return label[0];
    };

    var etiqueta = function (pointName) {
        var label = pointName.split(";");
        if (label[1] == "0") {
            return "";
        }
        else {
            return label[1];
        }
    };

    optionsTopTen = {
        chart: {
            renderTo: 'grafico_topten',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            defaultSeriesType: 'bar'
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        title: {
            text: 'TOP TEN - MISMO NIVEL',
            style: {
                font: "normal 12px Verdana"
            }
        },
        xAxis: {
            labels: {
                align: 'right',
                x: -13,
                y: 10,
                style: {
                    font: 'normal 8px Verdana, sans-serif'
                },
                formatter:
                    function () {
                        var datos = this.value.split(";");
                        var mensaje = "";
                        switch (datos[1]) {
                            case "ALZA_NOTABLE_EN_EL_CONSUMO_OK.bmp":
                                mensaje = "ALZA NOTABLE EN EL CONSUMO";
                                break;
                            case "NO_HUBO_CAMBIOS_SIGNIFICATIVOS_OK.bmp":
                                mensaje = "NO HUBO CAMBIOS SIGNIFICATIVOS";
                                break;
                            case "ALZA_MENOR_EN_EL_CONSUMO_OK.bmp":
                                mensaje = "ALZA MENOR EN EL CONSUMO";
                                break;
                            case "BAJA_NOTABL_EN_CONSUMO_OK.bmp":
                                mensaje = "BAJA NOTABL EN CONSUMO";
                                break;
                        }
                        return datos[0] + '<img src="images/' + datos[1] + '" width="10" height="10" alt="" title="' + mensaje + '" />';
                    },
                useHTML: true
            }
        },
        yAxis: [{
            maxPadding: 0.10,
            labels: {
                formatter: function () {
                    return Highcharts.numberFormat(this.value, NumDecimales, SimDec, SepMil);
                }
            },
            title: {
                text: 'Monto',
                style: {
                    color: '#89A54E'
                }
            }
        }, {
            maxPadding: 0.10,
            title: {
                text: ''
            },
            labels: {
                formatter: function () {                    
                    return Highcharts.numberFormat(this.value, NumDecimales, SimDec, SepMil);
                },
                align: 'right'
            },
            opposite: false
        }
    ],
        tooltip: {
            formatter: function () {              
                return customFormatPointName(this.point.name) + ' : ' + Highcharts.numberFormat(this.y, NumDecimales, SimDec, SepMil);  
            }
        },

        plotOptions: {
            bar: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    align: 'left',
                    x: 4,
                    y: 5,
                    formatter: function () {
                        return Highcharts.numberFormat(this.y, NumDecimales, SimDec, SepMil);
                    },
                    style: {
                        font: 'normal 9px Verdana, sans-serif'
                    }
                },
                showInLegend: false

            }
        },
        legend: {
            labelFormatter: function () {
                return '<b>' + this.name;
            },
            layout: 'vertical'
        }
    };

    $("#div_ajaxtopteng").html('<img src="~/../images/loader.gif">Generando Gráfico...');

    $.ajax({
        type: "POST",
        dataType: "json",
        data: "{'fecha_consulta':'" + txt_fecha.GetText() + "','codint':'" + codint + "', 'telefonia':'" + txt_telefonia.GetText() + "'}",
        contentType: "application/json; charset=utf-8",
        url: "resumen_datos.aspx/ListadoTopTen",
        success: function (items) {
            $("#div_ajaxtopteng").hide();

            if (items.d == "{}") {
                $("#blanco_grafico_topten").show();
                $("#grafico_topten").hide();
            }
            else {
                $("#blanco_grafico_topten").hide();
                $("#grafico_topten").show();
            }

            txt_detalles3.SetText(items.d);
            var obj = JSON.parse(items.d);
            var x = 0;
            var chartTopTen = "";
            var colores = txt_colores1.GetText().split(";");

            optionsTopTen.xAxis.categories = [];
            optionsTopTen.series = [];
            optionsTopTen.series[0] = {
                name: "Empresa",
                data: [],
                yAxis: 1
            };

            $.each(obj, function (itemNo, item) {
                var valores = itemNo.split(";");
                optionsTopTen.xAxis.categories.push([valores[0].substr(0, 16) + "..."] + ";" + valores[2]);
            });

            $.each(obj, function (itemNo, item) {
                optionsTopTen.series[0].data.push({ y: parseFloat(item), color: colores[x], name: itemNo });
                x++
            });

            chart = new Highcharts.Chart(optionsTopTen);
            fillChart1(chart);

        },
        cache: false,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            MostrarErrorAjax(XMLHttpRequest, "ListadoTopTen", errorThrown);
        }

    });

}