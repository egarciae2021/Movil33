$(function () {
    fnEnlazarEventos();
    fnLoadGrilla();
    DimPosElementos();
});

function fnEnlazarEventos() {

    //quitar la opcion familia del combo ddlLineaTipo //14-11-2014 wapumayta
    $("#ddlLineaTipo option[value=1]").remove();
    //validar la existencia de campañas //25-05-2015 wapumayta
    if ($("#ddlCampana option").length == 0) {
        $("#ddlCampana").append($("<option></option>").val(-2).text("<Seleccione operador>"));
    }
    
    $("#hdfMiTipoLinea").val($("#ddlLineaTipo").val());
    $("#hdfMiTipo").val($("#ddlTipo").val());
    $("#hdfMiTipoServicio").val($("#ddlTipoServicio").val());
    $("#hdfMiCampana").val($("#ddlCampana").val());

    $(window).resize(function () {
        DimPosElementos();
    });

    $("#ddlLineaTipo").change(function () {
        $("#hdfMiTipoLinea").val($(this).val());
        if ($(this).val() == "1") {
            $("#dvFiltroCampana").css("display", "none");
        }
        else if ($(this).val() == "2") {
            $("#dvFiltroCampana").css("display", "block");
            if ($("#hdfCampanaActiva").val() != "") {
                $("#ddlCampana").val($("#hdfCampanaActiva").val());
                $("#hdfMiCampana").val($("#hdfCampanaActiva").val());
            }
        }
        else {
            $("#dvFiltroCampana").css("display", "none");
        }
        //$("#gridKardex").trigger("reloadGrid");
    });

    $("#ddlTipo").change(function () {
        $("#hdfMiTipo").val($(this).val());
        if ($(this).val() != -1) {
            fnObtenerTipoServicio_porTipoModeloDispositivoFil();
        }
        else {
            $("#dvFiltroTipoServicio").css("display", "none");
            //$("#gridKardex").trigger("reloadGrid");
        }
    });

    $("#ddlTipoServicio").change(function () {
        //$("#gridKardex").trigger("reloadGrid");
        $("#hdfMiTipoServicio").val($(this).val());
    });

    $("#ddlCampana").change(function () {
        //$("#gridKardex").trigger("reloadGrid");
        $("#hdfMiCampana").val($(this).val());
        document.getElementById("hdfMiCampana").value = $("#hdfMiCampana").val();
    });

    $("#btnBuscar").click(function () {
        $("#gridKardex").trigger("reloadGrid");
    });

    $("#ddlOperador").change(function () {
        fnListarCampanaPorOperador();
    });
}

function fnObtenerTipoServicio_porTipoModeloDispositivoFil() {

    $.ajax({
        type: "POST",
        url: "ALM_AlmacenKardex.aspx/getTipoServicio",
        data: "{'prIdTipoModeloDispositivo': '" + $("#ddlTipo").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;
            $("#ddlTipoServicio").html("");
            if (resul.length > 0) {
                $("#dvFiltroTipoServicio").css("display", "block");
                $("#ddlTipoServicio").append('<option value="-1" selected="selected" >TODOS</option>');

                var i;
                for (i = 0; i < resul.length; i++) {
                    $("#ddlTipoServicio").append('<option value="' + resul[i].P_inCodTipSer + '" > ' + resul[i].vcNom + '</option>');
                }
            }
            else {
                $("#dvFiltroTipoServicio").css("display", "none");
            }

            //$("#gridKardex").trigger("reloadGrid");
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function fnLoadGrilla() {

    $("#gridKardex").jqGrid({
        datatype: function () {
            var miOperador = $("#ddlOperador").val();
            var miTipoLinea = $("#ddlLineaTipo").val();
            var miCampaña = $("#ddlCampana").val();
            var miTipo = $("#ddlTipo").val();
            var miTipoServicio = $("#ddlTipoServicio").val();
            var miWhere = "";

            if (miTipoLinea != undefined && miTipoLinea == 1) {
                return;
            }
            else if (miTipoLinea != undefined && miTipoLinea == 2) {
                if (miCampaña != undefined && (miCampaña == -1 || miCampaña == -2)) {
                    alerta("Seleccione una campaña.");
                    return;
                }
            }
            else {
                return;
            }

            if (miTipo != undefined && miTipo != -1) {
                if (miTipoServicio != undefined && miTipoServicio != -1) {
                    miWhere = "where tmd.IdTipoModeloDispositivo = " + miTipo.toString() + " and ts.P_inCodTipSer = " + miTipoServicio.toString();
                }
                else {
                    miWhere = "where tmd.IdTipoModeloDispositivo = " + miTipo.toString();
                }
            }

            $.ajax({
                type: "POST",
                url: "ALM_AlmacenKardex.aspx/obtenerKardexAlmacen",
                data: "{'inPagTam':'" + $('#gridKardex').getGridParam("rowNum") + "'," + //Tamaño de pagina
                       "'inPagAct':'" + $('#gridKardex').getGridParam("page") + "'," + //FiltroRegistro                
                        "'prIdCampana': '" + miCampaña + "'," +
                        "'prWhere': '" + miWhere + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    $("#gridKardex")[0].addJSONData(result.d);
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        jsonReader: //Set the jsonReader to the JQGridJSonResponse squema to bind the data.
        {
        root: "Items",
        page: "PaginaActual",
        total: "TotalPaginas",
        records: "TotalRegistros",
        repeatitems: true,
        cell: "Row",
        id: "IdTicket"
    },
    colModel: [
                { name: 'IdModeloDispositivo', index: 'IdModeloDispositivo', label: 'Código', width: "60px" },
                { name: 'ModeloDispositivo', index: 'ModeloDispositivo', label: 'Modelo Dispositivo', width: "200px" },
                { name: 'Ofertado_Pedido', index: 'Ofertado_Pedido', label: 'Ofertado', width: "75px", classes: "colorPedido", align: "right" },
                { name: 'Cantidad_Pedido', index: 'Cantidad_Pedido', label: 'Solicitado', width: "75px", classes: "colorPedido", align: "right" },
                { name: 'EnCorte_Pedido', index: 'EnCorte_Pedido', label: 'En Corte', width: "75px", classes: "colorPedido", align: "right" },
                { name: 'Costo_Pedido', index: 'Costo_Pedido', label: 'Costo', width: "75px", classes: "colorPedido", align: "right", formatter: 'currency', formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2} },
                { name: 'Cantidad_Ingreso', index: 'Cantidad_Ingreso', label: 'Cantidad', width: "75px", classes: "colorIngreso", align: "right" },
                { name: 'Costo_Ingreso', index: 'Costo_Ingreso', label: 'Costo', width: "75px", classes: "colorIngreso", align: "right", formatter: 'currency', formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2} },
                { name: 'Cantidad_Despacho', index: 'Cantidad_Despacho', label: 'Cantidad', width: "75px", classes: "colorDespacho", align: "right" },
                { name: 'Costo_Despacho', index: 'Costo_Despacho', label: 'Costo', width: "75px", classes: "colorDespacho", align: "right", formatter: 'currency', formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2} },
                { name: 'Cantidad_Disponible', index: 'Cantidad_Disponible', label: 'Cantidad', width: "75px", classes: "colorDisponible", align: "right" },
                { name: 'Costo_Disponible', index: 'Costo_Disponible', label: 'Costo', width: "75px", classes: "colorDisponible", align: "right", formatter: 'currency', formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2} },
                ],
    pager: "#pagerKardex",
    loadtext: 'Cargando datos...',
    recordtext: "{0} - {1} de {2} elementos",
    pgtext: 'Pág: {0} de {1}',
    rownumbers: true,
    shrinkToFit: false,
    gridview: true,
    viewrecords: true,
    height: "100%",
    emptyrecords: "No hay ítems que mostrar",
    beforeSelectRow: function (rowid, e) {
        var CurrentSelectIndex = $("#gridKardex").jqGrid('getInd', rowid);
        var datos = $("#gridKardex").jqGrid('getRowData', CurrentSelectIndex);
        //alert(datos['CodEstado']);
        return true;
    },
    gridComplete: function () {
        DimPosElementos();

        //        jQuery("#gridKardex").jqGrid('setGroupHeaders', {
        //                    useColSpanStyle: false,
        //                    groupHeaders: [
        //	        { startColumnName: 'Cantidad_Pedido', numberOfColumns: 2, titleText: 'Pedido' },
        //	        { startColumnName: 'Cantidad_Ingreso', numberOfColumns: 2, titleText: 'Ingreso' },
        //            { startColumnName: 'Cantidad_Despacho', numberOfColumns: 2, titleText: 'Despacho' },
        //            { startColumnName: 'Cantidad_Disponible', numberOfColumns: 2, titleText: 'Disponible' }
        //          ]
        //        });

        //        if ($("#hdfEsUsuario").val().toString() == "1") {
        //            var filas = $("#gridSolicitud tr");
        //            for (var i = 1; i < filas.length; i++) {
        //                if ($($(filas[i]).find("td")[9]).text() == "Resuelto" || $($(filas[i]).find("td")[9]).text() == "Anulado") {
        //                    $($(filas[i]).find("td")[9]).text("Cerrado")
        //                    $($(filas[i]).find("td")[9]).css("font-weight", "bold");
        //                }
        //            }
        //        }
    }
}).navGrid("#pagerKardex", { edit: false, add: false, search: false, del: false }).jqGrid('setGroupHeaders', {
    useColSpanStyle: false,
    groupHeaders: [
	        { startColumnName: 'Ofertado_Pedido', numberOfColumns: 4, titleText: 'Pedido' },
	        { startColumnName: 'Cantidad_Ingreso', numberOfColumns: 2, titleText: 'Ingreso' },
            { startColumnName: 'Cantidad_Despacho', numberOfColumns: 2, titleText: 'Despachado' },
            { startColumnName: 'Cantidad_Disponible', numberOfColumns: 2, titleText: 'Disponible' }
          ]
});

}


function DimPosElementos() {
    //inAltGrid = $(window).height() - 121 - $("#dvFiltros").height() - MargenFiltro * MargenHeight;
    $("#gridKardex").setGridWidth($(window).width() - 20);
    //$("#gridSolicitud").setGridHeight(inAltGrid);
}

function fnListarCampanaPorOperador() {
    var ListarCampanaPorOperador_Data = { IdOperador: $("#ddlOperador").val() };
    $.ajax({
        type: "POST",
        url: "ALM_AlmacenKardex.aspx/ListarCampanaPorOperador",
        data: JSON.stringify(ListarCampanaPorOperador_Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var arCampanas = resultado.d;
            $("#ddlCampana").html("");
            if (arCampanas.length > 0) {
                $("#ddlCampana").append($("<option></option>").val(-1).text("<Seleccionar>"));
                var i, campActiva = -1;
                for (i = 0; i < arCampanas.length; i++) {
                    $("#ddlCampana").append($("<option></option>").val(arCampanas[i].IdCampana).text(arCampanas[i].Descripcion));
                    if (arCampanas[i].btActivo) {
                        campActiva = arCampanas[i].IdCampana;
                    }
                }
                if (campActiva != -1) {
                    $("#ddlCampana").val(campActiva);
                    $("#ddlCampana").attr("disabled", true);
                } else {
                    $("#ddlCampana").attr("disabled", false);
                }
            }
            else {
                $("#ddlCampana").append($("<option></option>").val(-2).text("<Sin campañas>"));
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}