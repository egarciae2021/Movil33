function FormatoSegundos(segundos) {
    var hours = Math.floor(segundos / 3600);
    var minutes = Math.floor((segundos - (hours * 3600)) / 60);
    var segundos = segundos - (hours * 3600) - (minutes * 60);
    var time = "";

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

function ArmaGraficoEmpleadoCosto() {
    var telefonia = cmbTelefonia.GetValue();
    var prefijo = "";
    var resumen = "";
    var NumDecimales = txt_numdecimales.GetText();
    var SimDec = txt_SimDec.GetText();
    var SepMil = txt_SepMil.GetText();
    var VistaWeb = txt_vistaweb.GetText();
    //var VistaWeb = txt_vis
    switch (telefonia) {
        case "0":
            prefijo = "S";
            if (VistaWeb == "MONTO") {
                resumen = 'Costo Total: ' + Highcharts.numberFormat(txt_costototal.GetText(), NumDecimales, SimDec, SepMil);
            }
            if (VistaWeb == "DURACION") {
                resumen = 'Duración Total: ' + txt_duraciontotal.GetText();
            }
            if (VistaWeb == "CANTIDAD") {
                resumen = 'Cantidad Total: ' + txt_llamadastotal.GetText();
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
            resumen = 'Duración Total: ' + txt_duraciontotal.GetText();
            break;
        default:
            break;
    }

    var options = {
        chart: {
            renderTo: 'grafico_empleado_costo',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            spacingBottom: 25
        },
        credits: {
            enabled: false
          },
          exporting: {
            enabled: false
          },
        labels: {
            items: [{
                html: resumen,
                style: {
                    left: '205px',
                    top: '340px',
                    fontSize: '11px',
                    width: '400px',
                    height: '15px',
                    color: '#000000',
                    fontWeight: 'bold'
                }
            }]
        },
        title: {
            text: 'Servicios - ' + txt_empresa.GetText(),
            style: {
                font: "normal 12px Verdana",
                color: '#4572A7'
            }
        },
        tooltip: {
            formatter: function () {
                if (prefijo == "S") {

                    if (VistaWeb == "MONTO") {
                        return '<b>' + this.point.name + '</b>: ' + Highcharts.numberFormat(this.y, NumDecimales, SimDec, SepMil);
                    }
                    if (VistaWeb == "DURACION") {
                        return '<b>' + this.point.name + '</b>: ' + FormatoSegundos(this.y);
                    }
                    if (VistaWeb == "CANTIDAD") {
                        return '<b>' + this.point.name + '</b>: ' + this.y;
                    }
                                        
                    
                }
                else {
                    
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
                    formatter: function () {
                        return '<b>' + this.point.name + '</b>: ' + Highcharts.numberFormat(this.percentage.toFixed(NumDecimales), NumDecimales, SimDec, SepMil) + ' %';
                    }
                },
                showInLegend: true
            }
        },
        legend: {
            labelFormatter: function () {
                if (prefijo == "S") {

                    if (VistaWeb == "MONTO") {
                        return '<b>' + this.name + '</b>[' + Highcharts.numberFormat(this.y, NumDecimales, SimDec, SepMil) + ']';
                    }
                    if (VistaWeb == "DURACION") {
                        return '<b>' + this.name + '</b>[' + FormatoSegundos(this.y) + ']';
                    }
                    if (VistaWeb == "CANTIDAD") {
                        return '<b>' + this.name + '</b>[' + (this.y) + ']';
                    }
                       

                    
                }
                else {
                    return '<b>' + this.name + '</b>[' + FormatoSegundos(this.y) + ']';
                }

            },
            layout: 'horizontal',
            style: {
                font: "normal 22px Verdana",
                color: '#4572A7'
            }
        },
        series: [{
            type: 'pie'
        }]
    };

        //$("#div_ajax2").html('<img src="../images/loader.gif">Generando Gráfico...');

    $.ajax({
        type: "POST",
        dataType: "json",
        data: "{'codigo':'" + txt_codusuario.GetText() + "', 'tabla':'" + prefijo + "_" + txt_tabla.GetText() + "'}",
        contentType: "application/json; charset=utf-8",
        url: "resumen_datos.aspx/getDatosEmpleadoCosto",
        success: function (items) {
            //$("#div_ajax2").hide();
            var obj = JSON.parse(items.d);
            var series = { data: [] };

            $.each(obj, function (itemNo, item) {
                series.data.push([itemNo, item]);
            });

            options.series.push(series);
            chart = new Highcharts.Chart(options);
        },
        cache: false,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            MostrarErrorAjax(XMLHttpRequest, "getDatosEmpleadoCosto", errorThrown);
        }
    });
}