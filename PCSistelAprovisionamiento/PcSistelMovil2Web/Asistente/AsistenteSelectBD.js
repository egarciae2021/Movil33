var LstBDCliente = [];
$(function () {
    window.parent.$("#DivSrvBD").find(".lblMenu").css({ "text-decoration": "underline" });
    window.parent.$("#edit5").css({ "display": "" });

    FusionCharts.setCurrentRenderer('javascript');
    //cargarChart();

    if (window.parent.IdServidorBD != "") {
        var IdServidor = window.parent.IdServidor + "," + window.parent.NombreServidor;
        SeleccionarInstancia(IdServidor);
    }

    else {

        $("#ddlInstanciaBD").html("");
        $("#ddlInstanciaBD").append($("<option></option>").attr("value", -1).text("Seleccione"));
    }


    $("#btnatras").click(function () {

        window.parent.$("#DivSrvBD").find(".lblMenu").css({ "text-decoration": "none" });
        window.parent.$("#edit5").css({ "display": "none" });
        var $Pagina = 'Asistente3.aspx';
        window.parent.$("#ifTemaAsistente").attr("src", $Pagina);
    });
    $("#btnsiguiente").click(function () {


        if ($("#ddlInstanciaBD").val() == "-1") {
            alertaExterna('Selecccione una instancia de servidor de Base de Datos');
            return;
        }

        window.parent.$("#DivSrvBD").find(".lblMenu").css({ "text-decoration": "none" });
        window.parent.$("#edit5").css({ "display": "none" });

        window.parent.IdServidorBD = $("#ddlInstanciaBD").val();
        window.parent.ServidorBD = $($("#ddlInstanciaBD option:selected")[0]).text();
        //debugger;
        if ($("#ddlInstanciaBD option:selected").attr("MultiCliente") == "true" && window.parent.codtipoli == "1") {
            if ($("#ddlBaseDatosCliente").val() == "-1") {
                alertaExterna('Selecccione una Base de Datos Cliente para la Instancia ' + window.parent.ServidorBD);
                return;
            }
            window.parent.IdBDCliente = $("#ddlBaseDatosCliente").val();
        }

        var $Pagina = 'AsistenteSelectAPP.aspx';
        window.parent.$("#ifTemaAsistente").attr("src", $Pagina);
    });

    $("#btcancelar").click(function () {
        CancelarAsistente();

    });

    ListarServidor();

    $("#ddlInstanciaBD").live("change", function () {
        if ($(this).val() != "-1") {
            var bMultiCliente = $('option:selected', this).attr('MultiCliente');
            if (bMultiCliente == "true" && window.parent.codtipoli == "1") {
                $("#trMultiCliente").show();
            }
        } else {
            $("#trMultiCliente").hide();
        }
    });

});

function ListarServidor() {

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "AsistenteSelectBD.aspx/ListarServidorEspacio",
        data: "{}",
        dataType: "json",
        success: function (result) {

            var lsSolicitud = result.d;

            var cadena = '{"chart": {"baseFont":"Verdana", "baseFontColor": "#333333", "bgColor": "#ffffff","canvasBgColor": "#ffffff","canvasBorderAlpha": "0","caption": "Lista de Servidores Disponibles",' +
                    '"captionFontSize": "14", "decimalseparator": ".","divLineDashLen": "1","divLineDashed": "1","divLineGapLen": "1", "divlineColor": "#999999",  "divlineThickness": "1", ' +
                    '"formatnumber": "1","formatnumberscale": "0","legendBgAlpha": "0", "legendBorderAlpha": "0","legendItemFontColor": "#666666", "legendItemFontSize": "10", "legendItemFontSize": "10", "legendShadow": "0", ' +
                    '  "placeValuesInside": "1","rotateValues": "1","sformatnumber": "0","sformatnumberscale": "0","showAlternateHGridColor": "0", "showBorder": "0","showHoverEffect": "1","showShadow": "0","showXAxisLine": "1",' +
                     '"showPercentValues": "0","showplotborder": "0","stack100percent": "1","showPercentValues": "0", "subcaptionFontBold": "0","subcaptionFontSize": "14",' +
                     ' "thousandseparator": ",","usePlotGradientColor": "0","valueFontColor": "#ffffff", "xAxisLineColor": "#999999","xAxisLineThickness": "1","xAxisname": "","yAxisName": "","divlineColor": "#999999","paletteColors": "#d9534f,#428bca"';
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


            cadena = cadena + '] } ] , "dataset": [ {"seriesname": "' + 'Espacio Usado' + '", "data": [';
            for (i = 0; i < $(result.d).length; i++) {


                item = '{"value": "' + result.d[i].EspacioUsado + '", "link": "j-SeleccionarInstancia-' + result.d[i].IdServidor + "," + result.d[i].Nombre + '" }';
                if (i + 1 != $(result.d).length) {
                    item = item + ',';
                }
                cadena = cadena + item;
            }
            cadena = cadena + '] } ';

            cadena = cadena + ', {"seriesname": "' + 'Espacio Libre' + '", "data": [';

            for (i = 0; i < $(result.d).length; i++) {


                item = '{"value": "' + result.d[i].EspacioLibre + '", "link": "j-SeleccionarInstancia-' + result.d[i].IdServidor + "," + result.d[i].Nombre + '" }';
                if (i + 1 != $(result.d).length) {
                    item = item + ',';
                }
                cadena = cadena + item;
            }

            cadena = cadena + '] } ] }';

            var myChartId = "myChartId" + +Math.random();

            var myChart = new FusionCharts("../Common/Scripts/FusionCharts/StackedBar2D.swf", "DiscoDuro", "400", "300", "0");

            myChart.setJSONData(cadena);
            myChart.setTransparent(true);
            myChart.render("chartcontainer");

        },
        error: function (result) {
            alert("Error");
        }
    });

}

function SeleccionarInstancia(datos) {

    var valores = datos.split(',');
    var id = valores[0];
    window.parent.NombreServidor = valores[1];

    $("#ddlInstanciaBD").html("");
    $("#ddlInstanciaBD").append($("<option></option>").attr("value", -1).text("<Seleccione>"));
    window.parent.IdServidor = id;
    $("#trMultiCliente").hide();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "AsistenteSelectBD.aspx/ListarInstanciaBD",
        data: "{'IdServidor':" + id + "}",
        dataType: "json",
        success: function (result) {

            var lstTipoSolicitud = result.d;
            LstBDCliente = [];

            $(lstTipoSolicitud).each(function () {

                $("#ddlInstanciaBD").append($("<option></option>").attr("value", this.IdInstanciaBD).attr("MultiCliente", this.EsMultiCliente).text((this.Instancia == "" ? "[Sin instancia]" : this.Instancia)));

                $("#ddlBaseDatosCliente").html("");
                if (this.BaseDatosCliente > 1) {
                    $("#ddlBaseDatosCliente").append($("<option></option>").attr("value", -1).text("<Seleccione>"));
                }
                $.each(this.BaseDatosCliente, function (key, valor) {

                    $("#ddlBaseDatosCliente").append($("<option></option>").attr("value", valor.IdBDCliente).attr("IdInstanciaBD", valor.IdInstanciaBD).text(valor.BaseDatos));
                    var bdCliente = new Object();
                    bdCliente.IdBDCliente = valor.IdBDCliente;
                    bdCliente.BaseDatos = valor.BaseDatos;
                    bdCliente.IdInstanciaBD = valor.IdInstanciaBD;
                    LstBDCliente.push(bdCliente);
                });

            });

            if (window.parent.IdServidorBD != "") {
                $("#ddlInstanciaBD").val(window.parent.IdServidorBD);
                $("#ddlInstanciaBD").change();
            }
            if (window.parent.IdServidorBD != "0") {
                $("#ddlBaseDatosCliente").val(window.parent.IdBDCliente);
            }
        },
        error: function (result) {
            alert("Error");
        }
    });
}
