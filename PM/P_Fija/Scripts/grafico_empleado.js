function FormatoSegundosHist(segundos) {
    var hours = Math.floor(segundos / 3600);
    var minutes = Math.floor((segundos - (hours * 3600)) / 60);
    var segundos = segundos - (hours * 3600) - (minutes * 60);
    var time = "";

    if (hours == 0) {
        time = "00" + ":";
    }
    
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

function ArmaGraficoEmpleado() {
    var telefonia = cmbTelefonia.GetValue();
    var prefijo = "";
    var titulo = "";
    var NumDecimales = txt_numdecimales.GetText();
    var SimDec = txt_SimDec.GetText();
    var SepMil = txt_SepMil.GetText();
    var VistaWeb = txt_vistaweb.GetText();

    switch (telefonia) {
        case "0":
            prefijo = "S";
            titulo = ""; //Nuevos Soles (S/.)
            if (VistaWeb == "MONTO") {
                titulo = 'Costo'; 
            }
            if (VistaWeb == "DURACION") {
                titulo = 'Duración';
            }
            if (VistaWeb == "CANTIDAD") {
                titulo = 'Cantidad';
            }
            break;
        case "1":
            prefijo = "SC";
            break;
        case "2":
            prefijo = "D";
            break;
        case "3":
            prefijo = "E";
            titulo = "Duración";
            break;
        default:
            break;
    }

    var options = {
        chart: {
            renderTo: 'grafico_empleado_historico',
            type: 'column',
            spacingBottom: 25
        },
        credits: {
            enabled: false
          },
          exporting: {
            enabled: false
          },
        title: {
            text: 'Histórico de Consumo',
            style: {
                font: "normal 12px Verdana",
                color: '#4572A7'
            }
        },
        tooltip: {
            formatter: function () {
                if (prefijo == "S") {
                    

                    if (VistaWeb == "MONTO") {
                        return '' + this.series.name + '<br> Total: ' + Highcharts.numberFormat(this.y, NumDecimales, SimDec, SepMil);
                    }
                    if (VistaWeb == "DURACION") {
                        return '' + this.series.name + '<br> Total: ' + FormatoSegundosHist(this.y);
                    }
                    if (VistaWeb == "CANTIDAD") {
                        return '' + this.series.name + '<br> Total: ' + (this.y);
                    }
                          
                }
                else {
                    return '' + this.series.name + '<br> Total: ' + FormatoSegundosHist(this.y);
                }
            }
        },
        plotOptions: {
            series: {
              groupPadding: -0.005
            },
            column: {
                dataLabels: {
                    enabled: true,
                    color: '#FFFFFF',
                    align: 'right',
                    x: -5,
                    y: 15,
                    formatter: function () {
                        if (prefijo == "S") {
                            
                            if (VistaWeb == "MONTO") {
                                return Highcharts.numberFormat(this.y, NumDecimales, SimDec, SepMil);
                            }
                            if (VistaWeb == "DURACION") {
                                return FormatoSegundosHist(this.y);
                            }
                            if (VistaWeb == "CANTIDAD") {
                                return (this.y);
                            }


                        }
                        else {
                            return FormatoSegundosHist(this.y);
                        }

                    },
                    style: {
                        font: ''
                    }
                }
            }
        },
        xAxis: {
            categories: []
        }
        ,
        yAxis: {
            title: {
                text: titulo
            },
//            type: 'datetime',
//            dateTimeLabelFormats: {
//                second: '%H:%M:%S',
//                minute: '%H:%M:%S',
//                hour: '%H:%M:%S',
//                day: '%H:%M:%S',
//                week: '%H:%M:%S',
//                month: '%H:%M:%S',
//                year: '%H:%M:%S'
//            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }

        },
        series: []
    };


    $.ajax({
        type: "POST",
        dataType: "json",
        data: "{'fecha_consulta':'" + txt_fecha.GetText() + "','codigo':'" + txt_codusuario.GetText() + "', 'prefijo':'" + prefijo + "'}",
        contentType: "application/json; charset=utf-8",
        url: "resumen_datos.aspx/ArmaGraficoEmpleado",
        success: function (items) {

            var obj = JSON.parse(items.d);
            var series1 = { data: [], name: 'Poblacion', type: "column" };
            var xAxis1 = { categories: [],
                labels: {
                    style: {
                        font: 'normal 8px Verdana, sans-serif'
                    }
                }
            };
            var xAxis1 = { categories: [],
                labels: {
                    style: {
                        font: 'normal 8px Verdana, sans-serif'
                    }
                }
            };
            var cont = 0;
            $.each(obj, function (itemNo, item) {
                var valores = itemNo.split(";");
                var series = {
                    type: 'column',
                    name: valores[1] + ": " + valores[0],
                    data: []
                };
                cont += 1;
                series.data.push(parseFloat(item));
                options.series.push(series);
            });
            //chart = new Highcharts.Chart(options);
            if (cont == 6) {
                options.plotOptions.column.dataLabels.style.font = 'normal 10px Verdana, sans-serif'
                chart = new Highcharts.Chart(options);
            } else {
                options.plotOptions.column.dataLabels.style.font = 'normal 11px Verdana, sans-serif'
                chart = new Highcharts.Chart(options);
            }
        },
        cache: false,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            MostrarErrorAjax(XMLHttpRequest, "ArmaGraficoEmpleado", errorThrown);
        }
    });
}