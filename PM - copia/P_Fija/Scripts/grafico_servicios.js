function ArmaGraficoServicios(codint, div, tipo, titulo) {
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

            switch (label[1]) {
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
            return label[1] + '<img src="images/' + label[1] + '" width="10" height="10" alt="" title="' + mensaje + '" />';

            //return "<b>"+label[1]+"</b>";
        }
    };

    var options = {
        chart: {
            renderTo: div,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            defaultSeriesType: 'column',
            marginBottom: 100
        },
        credits: {
            enabled: false
          },
          exporting: {
            enabled: false
          },
        title: {
            text: titulo,
            style: {
                font: "normal 9px Verdana"
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
                text: ''
            },
            labels: {
                formatter: function () {
                    return Highcharts.numberFormat(this.value, NumDecimales, SimDec, SepMil);
                }
        },
        opposite: false
    }],
    tooltip: {
        formatter: function () {
            return customFormatPointName(this.point.name) + ' : ' + Highcharts.numberFormat(this.y, NumDecimales, SimDec, SepMil);
        }
    },

    plotOptions: {
        column: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                color: '#000000',
                align: 'left',
                x: 4,
                y: -15,
                formatter: function () {
                    /*var label = this.point.name.split(";");
                    if (label[1] == "0") {
                        return "";
                    }
                    else {
                        return "<div style='color:#ff0000;'>adsdsfsdfdsdsf</div><img src='images/ALZA_MENOR_EN_EL_CONSUMO_OK.bmp' width='15' height='15' />";
                    }*/
                },
                style: {
                    font: 'normal 9px Verdana, sans-serif'
                },
                useHTML: true
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
    data: "{'fecha_consulta':'" + txt_fecha.GetText() + "','codint':'" + codint + "', 'tipo':'"+tipo+"'}",
    contentType: "application/json; charset=utf-8",
    url: "resumen_datos.aspx/ArmaGraficoServicios",
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
        var series1 = { data: [], name: 'Servicios', type: "column", yAxis: 1 };
        var xAxis1 = { categories: [],
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
                        return '<div style="position:relative; float: left; height:10px; width:125px; margin-right:25px;"><div style="position:relative; float: left; height:10px; width:30px; padding-top:4px;">' + datos[0] + '</div><img src="images/' + datos[1] + '" width="15" height="15" alt="" title="' + mensaje + '" /> </div>';
                    },
                useHTML: true
            }
        };

        $.each(obj, function (itemNo, item) {
            var valores = itemNo.split(";");
            series1.data.push([itemNo, parseFloat(item)]);
            xAxis1.categories.push([valores[0]] + ";" + valores[1]);
        });

        options.series.push(series1);
        options.xAxis.push(xAxis1);
        chart = new Highcharts.Chart(options);
    },
    cache: false,
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        MostrarErrorAjax(XMLHttpRequest, "ArmaGraficoServicios", errorThrown);
    }
});

}