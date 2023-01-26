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



function ArmaGraficoHistorico(codint) {
    var SimDec = txt_SimDec.GetText();
    var SepMil = txt_SepMil.GetText();
    var NumDecimales = txt_numdecimales.GetText();
    var VistaWeb = txt_vistaweb.GetText();
    var options = {
        chart: {
            renderTo: 'grafico_historico_gral',
            type: 'bar'
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        title: {
            text: 'Histórico de ' + txt_nombrehist.GetText(),
            style: {
                font: "normal 12px Verdana",
                color: '#4572A7'
            }
        },
        tooltip: {
            formatter: function () {

                if (VistaWeb == "MONTO") {
                    return '' +
                    this.series.name + ': ' + Highcharts.numberFormat(this.y, NumDecimales, SimDec, SepMil);
                    //alert("costo");
                }
                if (VistaWeb == "DURACION") {
                    return '' +
                    this.series.name + ': ' + FormatoSegundosHist(this.y);
                }
                if (VistaWeb == "CANTIDAD") {
                    return '' +
                    this.series.name + ': ' + (this.y);
                }


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
                    formatter: function () {

                        if (VistaWeb == "MONTO") {
                            //alert("costo");
                            return '' +
                    this.series.name + ': ' + Highcharts.numberFormat(this.y, NumDecimales, SimDec, SepMil);
                        }
                        if (VistaWeb == "DURACION") {
                            return '' +
                    this.series.name + ': ' + FormatoSegundosHist(this.y);
                        }
                        if (VistaWeb == "CANTIDAD") {
                            return '' +
                    this.series.name + ': ' + (this.y);
                        }

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
                text: ''//Nuevos Soles (S/.)
            }
        },
        series: []
    };


$.ajax({
    type: "POST",
    dataType: "json",
    data: "{'fecha_consulta':'" + txt_fecha.GetText() + "','codigo':'" + codint + "','telefonia':'" + txt_telefonia.GetText() + "'}",
    contentType: "application/json; charset=utf-8",
    url: "resumen_datos.aspx/ArmaGraficoHistorico",
    success: function (items) {
        var obj = JSON.parse(items.d);

        $.each(obj, function (itemNo, item) {
            var series = {
                type: 'bar',
                name: itemNo,
                categories: [],
                data: []
            };

            series.data.push((item));
            series.categories.push({ x: itemNo });
            options.series.push(series);
            //options.xAxis.categories.push(series.name);

        });
        chart = new Highcharts.Chart(options);
    },
    cache: false,
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        MostrarErrorAjax(XMLHttpRequest, "ArmaGraficoHistorico", errorThrown);
    }
});
}