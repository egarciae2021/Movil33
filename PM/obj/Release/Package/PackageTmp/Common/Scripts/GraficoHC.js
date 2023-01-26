function NuevoGrafico(Control, w, h, TipoGrafico, Titulo, SubTitulo, Datos, labelPiePagina, LeftPiePagina, labelCantidad, simboloCantidad, unidadCantidad, numeroDecimales, 
                      NumElementos, tipo, tipoDato) {
    var serie = [];

    if (TipoGrafico == 'column') {
        LeftPiePagina = LeftPiePagina;
    }
    else if (TipoGrafico == 'bar') {
        LeftPiePagina = parseInt(LeftPiePagina) + 50;
    }
    else if (TipoGrafico == 'pie') {
        LeftPiePagina = parseInt(LeftPiePagina) + 50;
    }
    else if (TipoGrafico == 'area') {
        LeftPiePagina = LeftPiePagina;
    }
    else if (TipoGrafico == 'areaspline') {
        LeftPiePagina = LeftPiePagina;
    }
    else if (TipoGrafico == 'line') {
        LeftPiePagina = LeftPiePagina;
    }
    else if (TipoGrafico == 'spline') {
        LeftPiePagina = LeftPiePagina;
    }
    else if (TipoGrafico == 'scatter') {
        LeftPiePagina = LeftPiePagina;
    }
    else {
        LeftPiePagina = LeftPiePagina;
    }

    var options = {
        chart: {
            renderTo: Control,
            type: TipoGrafico,
            spacingBottom: 25,
            width: w,
            height: h,
            marginRight: 60,
            backgroundColor: null
        },
        title: {
            text: Titulo,
            style: {
                font: "normal 12px Verdana",
                color: '#4572A7'
            }
        },
        subtitle: {
            text: SubTitulo + tipo
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        labels: {
            items: [{
                style: {
                    left: LeftPiePagina,
                    top: h - 80,
                    fontSize: '11px',
                    width: w,
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
                if (TipoGrafico == 'column') {
                    if (tipoDato == "2") {
                        return '<b>' + this.series.name + '</b>: ' + CambiarDuracionStr(parseFloat(this.y)) + ' ' + unidadCantidad;
                    }
                    else {
                        return '<b>' + this.series.name + '</b>: ' + Highcharts.numberFormat(this.y, numeroDecimales, ',') + ' ' + unidadCantidad;
                    }
                }
                else if (TipoGrafico == 'bar') {
                    if (tipoDato == "2") {
                        return '<b>' + this.series.name + '</b>: ' + CambiarDuracionStr(parseFloat(this.y)) + ' ' + unidadCantidad;
                    }
                    else {
                        return '<b>' + this.series.name + '</b>: ' + Highcharts.numberFormat(this.y, numeroDecimales, ',') + ' ' + unidadCantidad;
                    }
                }
                else if (TipoGrafico == 'pie') {
                    if (tipoDato == "2") {
                        return '<b>' + this.point.name + '</b>: ' + CambiarDuracionStr(parseFloat(this.y)) + ' ' + unidadCantidad;
                    }
                    else {
                        return '<b>' + this.point.name + '</b>: ' + Highcharts.numberFormat(this.y, numeroDecimales, ',') + ' ' + unidadCantidad;
                    }
                }
                else if (TipoGrafico == 'area') {
                    if (tipoDato == "2") {
                        return '<b>' + this.x + '</b>: ' + CambiarDuracionStr(parseFloat(this.y)) + ' ' + unidadCantidad;
                    }
                    else {
                        return '<b>' + this.x + '</b>: ' + Highcharts.numberFormat(this.y, numeroDecimales, ',') + ' ' + unidadCantidad;
                    }
                }
                else if (TipoGrafico == 'areaspline') {
                    if (tipoDato == "2") {
                        return '<b>' + this.x + '</b>: ' + CambiarDuracionStr(parseFloat(this.y)) + ' ' + unidadCantidad;
                    }
                    else {
                        return '<b>' + this.x + '</b>: ' + Highcharts.numberFormat(this.y, numeroDecimales, ',') + ' ' + unidadCantidad;
                    }
                }
                else if (TipoGrafico == 'line') {
                    if (tipoDato == "2") {
                        return '<b>' + this.x + '</b>: ' + CambiarDuracionStr(parseFloat(this.y)) + ' ' + unidadCantidad;
                    }
                    else {
                        return '<b>' + this.x + '</b>: ' + Highcharts.numberFormat(this.y, numeroDecimales, ',') + ' ' + unidadCantidad;
                    }
                }
                else if (TipoGrafico == 'spline') {
                    if (tipoDato == "2") {
                        return '<b>' + this.x + '</b>: ' + CambiarDuracionStr(parseFloat(this.y)) + ' ' + unidadCantidad;
                    }
                    else {
                        return '<b>' + this.x + '</b>: ' + Highcharts.numberFormat(this.y, numeroDecimales, ',') + ' ' + unidadCantidad;
                    }
                }
                else if (TipoGrafico == 'scatter') {
                    if (tipoDato == "2") {
                        return '<b>' + this.x + '</b>: ' + CambiarDuracionStr(parseFloat(this.y)) + ' ' + unidadCantidad;
                    }
                    else {
                        return '<b>' + this.x + '</b>: ' + Highcharts.numberFormat(this.y, numeroDecimales, ',') + ' ' + unidadCantidad;
                    }
                }
                else {
                    if (tipoDato == "2") {
                        return '<b>' + this.series.name + '</b>: ' + CambiarDuracionStr(parseFloat(this.y)) + ' ' + unidadCantidad;
                    }
                    else {
                        return '<b>' + this.series.name + '</b>: ' + Highcharts.numberFormat(this.y, numeroDecimales, ',') + ' ' + unidadCantidad;
                    }
                }
            }
        },
        plotOptions: {
            series: {
                groupPadding: -0.005,
                cursor: 'pointer'
            }
        },
        xAxis: {
            categories: []
        },
        yAxis: {
            min: 0,
            title: {
                text: labelCantidad
            },
            labels: {
                overflow: 'justify'
            }
        },
        legend: {
            labelFormatter: function () {
                if (TipoGrafico == 'column') {
                    return this.name;
                }
                else if (TipoGrafico == 'bar') {
                    return this.name;
                }
                else if (TipoGrafico == 'pie') {
                    if (tipoDato == "2") {
                        return this.name + '[' + CambiarDuracionStr(parseFloat(this.y)) + ']';
                    }
                    else {
                        return this.name + '[' + Highcharts.numberFormat(this.y, numeroDecimales, ',') + ']';
                    }
                }
                else if (TipoGrafico == 'area') {
                    return this.name;
                }
                else if (TipoGrafico == 'areaspline') {
                    return this.name;
                }
                else if (TipoGrafico == 'line') {
                    return this.name;
                }
                else if (TipoGrafico == 'spline') {
                    return this.name;
                }
                else if (TipoGrafico == 'scatter') {
                    return this.name;
                }
                else {
                    return this.name;
                }
            }
        },
        series: serie
    };
    
    var total = 0.0;
    if (TipoGrafico == 'column') {
        $.each(Datos, function (itemNo, item) {
            var series = {
                type: TipoGrafico,
                name: itemNo,
                categories: [],
                data: []
            };
            total += parseFloat(item);
            series.data.push(item);

            series.categories.push({ x: itemNo });
            options.series.push(series);
        });

        var column =
        {
            dataLabels: {
                enabled: true,
                color: '#000000',
                y: 5
            },
            events: {
                click: function (e) {
                    if (tipo == "") {
                        GraficaDetalle(this.name);
                    }
                    else {
                        GraficaPrincipal();
                    }
                }
            }
        }
        options.plotOptions["column"] = column;

        var dataLabels =
        {
            enabled: true,
            color: '#000000',
            align: 'center',
            y: -5,
            formatter: function () {
                if (tipoDato == "2") {
                    return simboloCantidad + " " + CambiarDuracionStr(parseFloat(this.y));
                }
                else {
                    return simboloCantidad + " " + this.y.toFixed(numeroDecimales);
                }
            },
            style: {
                font: 'normal 11px Verdana, sans-serif'
            }
        }

        options.plotOptions.series["dataLabels"] = dataLabels;
        options.xAxis.categories.push('');
    }
    else if (TipoGrafico == 'bar') {
        var elementos = new Array();
        var i = NumElementos - 1;

        $.each(Datos, function (itemNo, item) {
            var series = {
                type: TipoGrafico,
                name: itemNo,
                categories: [],
                data: []
            };
            total += parseFloat(item);
            series.data.push(item);
            series.categories.push({ x: itemNo });
            elementos[i--] = series;
        });

        for (i = 0; i < NumElementos; i++) {
            options.series.push(elementos[i]);
        }

        var bar =
        {
            dataLabels: {
                enabled: true,
                color: '#000000',
                y: 5
            },
            events: {
                click: function (e) {
                    if (tipo == "") {
                        GraficaDetalle(this.name);
                    }
                    else {
                        GraficaPrincipal();
                    }
                }
            }
        }
        options.plotOptions["bar"] = bar;

        var dataLabels =
        {
            enabled: true,
            color: '#000000',
            align: 'center',
            y: 5,
            x: 25,
            formatter: function () {
                if (tipoDato == "2") {
                    return simboloCantidad + " " + CambiarDuracionStr(this.y);
                }
                else {
                    return simboloCantidad + " " + this.y.toFixed(numeroDecimales);
                }
            },
            style: {
                font: 'normal 11px Verdana, sans-serif'
            }
        }

        options.plotOptions.series["dataLabels"] = dataLabels;
        options.xAxis.categories.push('');
    }
    else if (TipoGrafico == 'pie') {
        options.series.push({ type: 'pie' });
        
        var series = { data: [] };

        $.each(Datos, function (itemNo, item) {
            series.data.push([itemNo, item]);
            total += parseFloat(item);
        });

        var pie =
        {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                color: '#000000',
                connectorColor: '#000000',
                formatter: function () {
                    return '<b>' + this.point.name + '</b>: ' + this.percentage.toFixed(numeroDecimales) + ' %';
                }
            },
            showInLegend: true,
            events: {
                click: function (e) {
                    if (tipo == "") {
                        GraficaDetalle(e.point.name);
                    }
                    else {
                        GraficaPrincipal();
                    }
                }
            }
        }
        options.plotOptions["pie"] = pie;
        options.series.push(series);
    }
    else if (TipoGrafico == 'area') {
        var serie = {
            name: Titulo,
            data: []
        };
        $.each(Datos, function (itemNo, item) {
            serie.data.push(item);
            options.xAxis.categories.push(itemNo);
            total += parseFloat(item);
        });

        var dataLabels =
        {
            enabled: true,
            color: '#000000',
            align: 'center',
            y: -7,
            x: 20,
            formatter: function () {
                if (tipoDato == "2") {
                    return simboloCantidad + " " + CambiarDuracionStr(this.y);
                }
                else {
                    return simboloCantidad + " " + this.y.toFixed(numeroDecimales);
                }
            },
            style: {
                font: 'normal 11px Verdana, sans-serif'
            }
        }

        var area =
        {
            events: {
                click: function (e) {
                    if (tipo == "") {
                        GraficaDetalle(e.point.category);
                    }
                    else {
                        GraficaPrincipal();
                    }
                }
            }
        }
        options.plotOptions["area"] = area;
        options.plotOptions.series["dataLabels"] = dataLabels;
        options.series.push(serie);
    }
    else if (TipoGrafico == 'areaspline') {
        var serie = {
            name: Titulo,
            data: []
        };
        $.each(Datos, function (itemNo, item) {
            serie.data.push(item);
            options.xAxis.categories.push(itemNo);
            total += parseFloat(item);
        });

        var dataLabels =
        {
            enabled: true,
            color: '#000000',
            align: 'center',
            y: -7,
            x: 20,
            formatter: function () {
                if (tipoDato == "2") {
                    return simboloCantidad + " " + CambiarDuracionStr(this.y);
                }
                else {
                    return simboloCantidad + " " + this.y.toFixed(numeroDecimales);
                }
            },
            style: {
                font: 'normal 11px Verdana, sans-serif'
            }
        }

        var areaspline =
        {
            events: {
                click: function (e) {
                    if (tipo == "") {
                        GraficaDetalle(e.point.category);
                    }
                    else {
                        GraficaPrincipal();
                    }
                }
            }
        }
        options.plotOptions["areaspline"] = areaspline;
        options.plotOptions.series["dataLabels"] = dataLabels;
        options.series.push(serie);
    }
    else if (TipoGrafico == 'line') {
        var serie = {
            name: Titulo,
            data: []
        };
        $.each(Datos, function (itemNo, item) {
            serie.data.push(item);
            options.xAxis.categories.push(itemNo);
            total += parseFloat(item);
        });

        var dataLabels =
        {
            enabled: true,
            color: '#000000',
            align: 'center',
            y: -7,
            x: 20,
            formatter: function () {
                if (tipoDato == "2") {
                    return simboloCantidad + " " + CambiarDuracionStr(this.y);
                }
                else {
                    return simboloCantidad + " " + this.y.toFixed(numeroDecimales);
                }
            },
            style: {
                font: 'normal 11px Verdana, sans-serif'
            }
        }

        var line =
        {
            events: {
                click: function (e) {
                    if (tipo == "") {
                        GraficaDetalle(e.point.category);
                    }
                    else {
                        GraficaPrincipal();
                    }
                }
            }
        }
        options.plotOptions["line"] = line;
        options.plotOptions.series["dataLabels"] = dataLabels;
        options.series.push(serie);
    }
    else if (TipoGrafico == 'spline') {
        var serie = {
            name: Titulo,
            data: []
        };
        $.each(Datos, function (itemNo, item) {
            serie.data.push(item);
            options.xAxis.categories.push(itemNo);
            total += parseFloat(item);
        });

        var dataLabels =
        {
            enabled: true,
            color: '#000000',
            align: 'center',
            y: -7,
            x: 20,
            formatter: function () {
                if (tipoDato == "2") {
                    return simboloCantidad + " " + CambiarDuracionStr(this.y);
                }
                else {
                    return simboloCantidad + " " + this.y.toFixed(numeroDecimales);
                }
            },
            style: {
                font: 'normal 11px Verdana, sans-serif'
            }
        }

        var spline =
        {
            events: {
                click: function (e) {
                    if (tipo == "") {
                        GraficaDetalle(e.point.category);
                    }
                    else {
                        GraficaPrincipal();
                    }
                }
            }
        }
        options.plotOptions["spline"] = spline;
        options.plotOptions.series["dataLabels"] = dataLabels;
        options.series.push(serie);
    }
    else if (TipoGrafico == 'scatter') { 
        var serie = {
            name: Titulo,
            color: 'rgba(223, 83, 83, .5)',
            data: []
        };

        $.each(Datos, function (itemNo, item) {
            serie.data.push(item);
            options.xAxis.categories.push(itemNo);
            total += parseFloat(item);
        });

        var dataLabels =
        {
            enabled: true,
            color: '#000000',
            align: 'center',
            y: -7,
            x: 20,
            formatter: function () {
                if (tipoDato == "2") {
                    return simboloCantidad + " " + CambiarDuracionStr(this.y);
                }
                else {
                    return simboloCantidad + " " + this.y.toFixed(numeroDecimales);
                }
            },
            style: {
                font: 'normal 11px Verdana, sans-serif'
            }
        }

        var scatter =
        {
            events: {
                click: function (e) {
                    if (tipo == "") {
                        GraficaDetalle(e.point.category);
                    }
                    else {
                        GraficaPrincipal();
                    }
                }
            }
        }
        options.plotOptions["scatter"] = scatter;
        options.plotOptions.series["dataLabels"] = dataLabels;
        options.series.push(serie);
    }
    else {
        $.each(Datos, function (itemNo, item) {
            var series = {
                type: TipoGrafico,
                name: itemNo,
                categories: [],
                data: []
            };
            total += parseFloat(item);
            series.data.push(item);
            series.categories.push({ x: itemNo });
            options.series.push(series);
        });

        var dataLabels =
        {
            enabled: true,
            color: '#000000',
            align: 'center',
            y: -5,
            formatter: function () {
                if (tipoDato == "2") {
                    return simboloCantidad + " " + CambiarDuracionStr(this.y);
                }
                else {
                    return simboloCantidad + " " + this.y.toFixed(numeroDecimales);
                }
            },
            style: {
                font: 'normal 11px Verdana, sans-serif'
            }
        }

        options.plotOptions.series["dataLabels"] = dataLabels;
    }

    if (tipoDato == "2") {
        options.labels.items[0]['html'] = labelPiePagina + CambiarDuracionStr(total);
    }
    else {
        options.labels.items[0]['html'] = labelPiePagina + Highcharts.numberFormat(total, numeroDecimales, ',');
    }

    return new Highcharts.Chart(options);
}