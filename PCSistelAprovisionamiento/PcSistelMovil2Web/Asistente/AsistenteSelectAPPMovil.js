var repositorioChart;


$(function () {
    window.parent.$("#divSrvAPP").find(".lblMenu").css({ "text-decoration": "underline" });
    window.parent.$("#edit6").css({ "display": "" });

    FusionCharts.setCurrentRenderer('javascript');
    //cargarChart();
    ListarServidorAPP1('A1');
    ListarServidorAPP2('A2');
    //if (window.parent.ServidorAPP != "") {
    //   
    //    $("#lblInstancia").html(window.parent.ServidorAPP);
    //}  
    debugger;
    if (window.parent.IdServidorAPPA1 != "") {
        var IdServidor = window.parent.IdServidorAPPA1 + "," + window.parent.NombreServidorAPPA1 + ",A1";
        SeleccionarInstanciaA1(IdServidor);
        SeleccionarInstanciaA2(IdServidor);
    } else {
        $("#ddlInstanciaAPPA1").html("");
        $("#ddlInstanciaAPPA2").html("");
        $("#ddlInstanciaAPPA1").append($("<option></option>").attr("value", -1).text("Seleccione"));
        $("#ddlInstanciaAPPA2").append($("<option></option>").attr("value", -1).text("Seleccione"));
    }



    $("#grid").jqGrid({
        datatype: "local",
        colNames: ['id', 'Usuario', 'Espacio'],
        colModel: [
            { name: 'id', index: 'id', sorttype: "int" },
            { name: 'nombre', index: 'invdate' },
            { name: 'apellido', index: 'name' },

        ],
        pager: '#pgrid',
        height: '250px',
        width: 'auto',
        loadtext: 'Cargando datos...',
        recordtext: '{0} - {1} de {2} elementos',
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}',
        rowNum: 10,
        rowList: [10, 20, 30],
        viewrecords: true
        //multiselect: true,
        //caption: "Lista de Usuarios de"
    });


    $("#btnatras").click(function () {

        window.parent.$("#divSrvAPP").find(".lblMenu").css({ "text-decoration": "none" });
        window.parent.$("#edit6").css({ "display": "none" });
        var $Pagina = 'AsistenteSelectAPP.aspx';
        window.parent.$("#ifTemaAsistente").attr("src", $Pagina);
    });
    $("#btnsiguiente").click(function () {

        if ($("#ddlInstanciaAPPA1").val() == "-1") {
            alertaExterna('Selecccione una instancia de Aplicaciones APP Movil');
            return;
        }

        if ($("#ddlInstanciaAPPA2").val() == "-1") {
            alertaExterna('Selecccione una instancia de Aplicaciones APP Security');
            return;
        }
        debugger;
        var val1 = $("#ddlInstanciaAPPA1").val();
        var val2 = $("#ddlInstanciaAPPA2").val();
        if ($("#ddlInstanciaAPPA1").val() == $("#ddlInstanciaAPPA2").val()) {
            alertaExterna('Las instancias del APP Movil y de APP Security son iguales. Debe seleccionar Instancias distintas para ambos casos.');
            return;
        }

        window.parent.IdInstanciaAPPA1 = $("#ddlInstanciaAPPA1").val();
        window.parent.ServidorAPPA1 = $($("#ddlInstanciaAPPA1 option:selected")[0]).text();

        window.parent.IdInstanciaAPPA2 = $("#ddlInstanciaAPPA2").val();
        window.parent.ServidorAPPA2 = $($("#ddlInstanciaAPPA2 option:selected")[0]).text();


        window.parent.$("#divSrvAPP").find(".lblMenu").css({ "text-decoration": "none" });
        window.parent.$("#edit6").css({ "display": "none" });

        var $Pagina = 'Asistente5.aspx';
        window.parent.$("#ifTemaAsistente").attr("src", $Pagina);
    });

    $("#btcancelar").click(function () {
        CancelarAsistente();

    });

});


function ListarServidorAPP1(id) {

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "AsistenteSelectAPPMovil.aspx/ListarServidorAPP",
        data: "{'IdTipoEndpoint': '" + id + "'}",
        dataType: "json",
        success: function (result) {

            var lsSolicitud = result.d;

            var cadena = '{"chart": {"baseFont":"Verdana", "baseFontColor": "#333333", "bgColor": "#ffffff","canvasBgColor": "#ffffff","canvasBorderAlpha": "0","caption": "Lista de Servidores de Aplicaciones APP Movil",' +
                    '"captionFontSize": "14", "decimalseparator": ".","divLineDashLen": "1","divLineDashed": "1","divLineGapLen": "1", "divlineColor": "#999999",  "divlineThickness": "1", ' +
                    '"formatnumber": "1","formatnumberscale": "0","legendBgAlpha": "0", "legendBorderAlpha": "0","legendItemFontColor": "#666666", "legendItemFontSize": "10", "legendItemFontSize": "10", "legendShadow": "0", ' +
                    '  "placeValuesInside": "1","rotateValues": "1","sformatnumber": "0","sformatnumberscale": "0","showAlternateHGridColor": "0", "showBorder": "0","showHoverEffect": "1","showShadow": "0","showXAxisLine": "1",' +
                     '"showPercentValues": "0","showplotborder": "0","stack100percent": "1","showPercentValues": "0", "subcaptionFontBold": "0","subcaptionFontSize": "14",' +
                     ' "thousandseparator": ",","usePlotGradientColor": "0","valueFontColor": "#ffffff", "xAxisLineColor": "#999999","xAxisLineThickness": "1","xAxisname": "","yAxisName": "Cantidad de Usuarios","divlineColor": "#999999","showlegend": "0"';
            //                // ==============================================================================================================================


            cadena = cadena + ' }, "categories": [ {"category": [';



            for (var i = 0; i < $(result.d).length; i++) {
                //                    // ==============================================================================================================================

                var item = '{"label": "' + result.d[i].Nombre + '"}';

                if (i + 1 != $(result.d).length) {
                    item = item + ',';
                }
                cadena = cadena + item;

                //                    // ==============================================================================================================================
            }

            cadena = cadena + '] } ] , "dataset": [ {"seriesname": "' + 'Cantidad de usuarios' + '", "data": [';
            for (i = 0; i < $(result.d).length; i++) {

                var vcColor = '';
                if (i == 0) vcColor = '#A9E2F3';
                if (i == 1) vcColor = '#FC2424';
                if (i == 2) vcColor = '#EEE8AA';
                if (i == 3) vcColor = '#E6E6FA';
                if (i == 4) vcColor = '#87CEEB';
                if (i == 5) vcColor = '#66CDAA';
                if (i == 6) vcColor = '#F4A460';
                if (i == 7) vcColor = '#B0C4DE';
                if (i == 8) vcColor = '#EEE8AA';
                if (i == 9) vcColor = '#D2B48C';
                if (i == 10) vcColor = '#F5F5DC';
                if (i == 11) vcColor = '#5F9EA0';
                if (i == 12) vcColor = '#F0FFF0';


                var itemColor = vcColor;
                //item = '{"value": "' + result.d[i].CantidadUsuarios + '", "link": "j-SeleccionarInstancia-' + result.d[i].IdInstanciaAPP + ','+result.d[i].NombreAPP+'", "Color": "' + itemColor + '" }';
                item = '{"value": "' + result.d[i].CantidadUsuarios + '", "link": "j-SeleccionarInstanciaA1-' + result.d[i].IdServidor + "," + result.d[i].Nombre + ',A1", "Color": "' + itemColor + '" }';
                if (i + 1 != $(result.d).length) {
                    item = item + ',';
                }
                cadena = cadena + item;
            }


            cadena = cadena + '] } ] }';


            var myChartId = "myChartId" + +Math.random();

            var myChart = new FusionCharts("../Common/Scripts/FusionCharts/StackedBar2D.swf", "chartAplicacionesAPPA1", "480", "300", "0");

            myChart.setJSONData(cadena);
            myChart.setTransparent(true);
            myChart.render("chartcontainerAPPA1");


        },
        error: function (result) {
            alert("Error");
        }
    });

}

function ListarServidorAPP2(id) {

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "AsistenteSelectAPPMovil.aspx/ListarServidorAPP",
        data: "{'IdTipoEndpoint': '" + id + "'}",
        dataType: "json",
        success: function (result) {

            var lsSolicitud = result.d;

            var cadena = '{"chart": {"baseFont":"Verdana", "baseFontColor": "#333333", "bgColor": "#ffffff","canvasBgColor": "#ffffff","canvasBorderAlpha": "0","caption": "Lista de Servidores de Aplicaciones APP Security",' +
                    '"captionFontSize": "14", "decimalseparator": ".","divLineDashLen": "1","divLineDashed": "1","divLineGapLen": "1", "divlineColor": "#999999",  "divlineThickness": "1", ' +
                    '"formatnumber": "1","formatnumberscale": "0","legendBgAlpha": "0", "legendBorderAlpha": "0","legendItemFontColor": "#666666", "legendItemFontSize": "10", "legendItemFontSize": "10", "legendShadow": "0", ' +
                    '  "placeValuesInside": "1","rotateValues": "1","sformatnumber": "0","sformatnumberscale": "0","showAlternateHGridColor": "0", "showBorder": "0","showHoverEffect": "1","showShadow": "0","showXAxisLine": "1",' +
                     '"showPercentValues": "0","showplotborder": "0","stack100percent": "1","showPercentValues": "0", "subcaptionFontBold": "0","subcaptionFontSize": "14",' +
                     ' "thousandseparator": ",","usePlotGradientColor": "0","valueFontColor": "#ffffff", "xAxisLineColor": "#999999","xAxisLineThickness": "1","xAxisname": "","yAxisName": "Cantidad de Usuarios","divlineColor": "#999999","showlegend": "0"';
            //                // ==============================================================================================================================


            cadena = cadena + ' }, "categories": [ {"category": [';



            for (var i = 0; i < $(result.d).length; i++) {
                //                    // ==============================================================================================================================

                var item = '{"label": "' + result.d[i].Nombre + '"}';

                if (i + 1 != $(result.d).length) {
                    item = item + ',';
                }
                cadena = cadena + item;

                //                    // ==============================================================================================================================
            }

            cadena = cadena + '] } ] , "dataset": [ {"seriesname": "' + 'Cantidad de usuarios' + '", "data": [';
            for (i = 0; i < $(result.d).length; i++) {

                var vcColor = '';
                if (i == 0) vcColor = '#A9E2F3';
                if (i == 1) vcColor = '#FC2424';
                if (i == 2) vcColor = '#EEE8AA';
                if (i == 3) vcColor = '#E6E6FA';
                if (i == 4) vcColor = '#87CEEB';
                if (i == 5) vcColor = '#66CDAA';
                if (i == 6) vcColor = '#F4A460';
                if (i == 7) vcColor = '#B0C4DE';
                if (i == 8) vcColor = '#EEE8AA';
                if (i == 9) vcColor = '#D2B48C';
                if (i == 10) vcColor = '#F5F5DC';
                if (i == 11) vcColor = '#5F9EA0';
                if (i == 12) vcColor = '#F0FFF0';


                var itemColor = vcColor;
                //item = '{"value": "' + result.d[i].CantidadUsuarios + '", "link": "j-SeleccionarInstancia-' + result.d[i].IdInstanciaAPP + ','+result.d[i].NombreAPP+'", "Color": "' + itemColor + '" }';
                item = '{"value": "' + result.d[i].CantidadUsuarios + '", "link": "j-SeleccionarInstanciaA2-' + result.d[i].IdServidor + "," + result.d[i].Nombre + ',A2", "Color": "' + itemColor + '" }';
                if (i + 1 != $(result.d).length) {
                    item = item + ',';
                }
                cadena = cadena + item;
            }


            cadena = cadena + '] } ] }';


            var myChartId = "myChartId" + +Math.random();

            var myChart = new FusionCharts("../Common/Scripts/FusionCharts/StackedBar2D.swf", "chartAplicacionesAPPA2", "480", "300", "0");

            myChart.setJSONData(cadena);
            myChart.setTransparent(true);
            myChart.render("chartcontainerAPPA2");


        },
        error: function (result) {
            alert("Error");
        }
    });

}

function SeleccionarInstanciaA1(datos) {

    $("#ddlInstanciaAPPA1").html("");
    $("#ddlInstanciaAPPA1").append($("<option></option>").attr("value", -1).text("Seleccione"));


    var valores = datos.split(',')
    var id = valores[0];
    window.parent.NombreServidorAPPA1 = valores[1];
    window.parent.IdServidorAPPA1 = id;
    var idTipoEndpoint = valores[2];
    $("#hdfServerAdmin").val(1);

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "AsistenteSelectAPPMovil.aspx/ListarInstanciaAPP",
        data: "{'IdServidor':" + id + ", 'IdTipoEndpoint': '" + idTipoEndpoint + "'}",
        dataType: "json",
        success: function (result) {

            var lstTipoSolicitud = result.d;

            $(lstTipoSolicitud).each(function () {
                $("#ddlInstanciaAPPA1").append($("<option></option>").attr("value", this.IdInstanciaAPP).text(this.NombreAPP == "" ? "[Sin instancia]" : this.NombreAPP));
            });

            if (window.parent.IdInstanciaAPP != "") {
                $("#ddlInstanciaAPPA1").val(window.parent.IdInstanciaAPP);
            }

        },
        error: function (result) {
            alert("Error");
        }
    });
}

function SeleccionarInstanciaA2(datos) {
    $("#ddlInstanciaAPPA2").html("");
    $("#ddlInstanciaAPPA2").append($("<option></option>").attr("value", -1).text("Seleccione"));

    var valores = datos.split(',')
    var id = valores[0];
    window.parent.NombreServidorAPPA2 = valores[1];
    window.parent.IdServidorAPPA2 = id;
    var idTipoEndpoint = valores[2];
    $("#hdfServerPedidos").val(1);

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "AsistenteSelectAPPMovil.aspx/ListarInstanciaWEB",
        data: "{'IdServidor':" + id + ", 'IdTipoEndpoint': '" + idTipoEndpoint + "'}",
        dataType: "json",
        success: function (result) {
            var lstTipoSolicitud = result.d;

            $(lstTipoSolicitud).each(function () {
                $("#ddlInstanciaAPPA2").append($("<option></option>").attr("value", this.IdInstanciaAPP).text(this.NombreAPP == "" ? "[Sin instancia]" : this.NombreAPP));
            });

            if (window.parent.IdInstanciaAPP != "") {
                $("#ddlInstanciaAPPA2").val(window.parent.IdInstanciaAPP);
            }
        },
        error: function (result) {
            alert("Error");
        }
    });
}

