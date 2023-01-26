function ArmaGrafico() {
    options = new Highcharts.Chart({
        chart: {
            renderTo: 'grafico_detalle',
            zoomType: 'xy'
        },
        title: {
            text: 'Consumo Total'
        },
        xAxis: [{
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                formatter: function () {
                    return this.value + '°C';
                },
                style: {
                    color: '#89A54E'
                }
            },
            title: {
                text: 'Temperature',
                style: {
                    color: '#89A54E'
                }
            }
        }, { // Secondary yAxis
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
                return '' +
								this.x + ': ' + this.y +
								(this.series.name == 'Poblacion' ? ' Personas' : '°C');
            }
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 120,
            verticalAlign: 'top',
            y: 100,
            floating: true,
            backgroundColor: '#FFFFFF'
        },
        series: [{
            //name: 'Poblacion',
            //color: '#4572A7',
            type: 'column',
            yAxis: 1//,
            /*data: [149, 130, 106, 129, 129, 150, 180, 250, 110, 160, 98, 54]*/

        }/*, {
            name: 'Temperature',
            color: '#89A54E',
            type: 'spline',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }*/]
    });

    $.ajax({
        type: "POST",
        dataType: "json",
        data: "",
        contentType: "application/json; charset=utf-8",
        url: "grafico_detalle.aspx/ArmaGrafico",
        success: function (items) {

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
          MostrarErrorAjax(XMLHttpRequest, "ArmaGrafico", errorThrown);
      }
    });
}