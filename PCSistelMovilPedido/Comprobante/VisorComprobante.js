var comprobantes;
var altoPagina = 0;
var flagPag = false;

$(function() {
    //
    var date = new Date();
    
    $(".btnNormal").button();
    kendo.culture("es-PE");
    $(".bordeui").removeClass("ui-corner-all");
    $(".bordeui").css({
        "border": "none",
        "padding": "2px 0px 2px 0px"
    });
    
    var fechainicio = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    $("#txtPeriodoInicio").keypress(ValidarFecha);

    var periodoIni = $("#txtPeriodoInicio").kendoDatePicker({
            culture: "es-PE",
            start: "year",
            depth: "year",
            value: fechainicio,
            format: "MM/yyyy",
            footer: false
        , max: new Date(parseInt(fechaMax.toString().substring(0, 4)), parseInt(fechaMax.toString().substring(4, 6) - 1), parseInt(fechaMax.toString().substring(6, 8)))
        , min: new Date(parseInt(fechaMin.toString().substring(0, 4)), parseInt(fechaMin.toString().substring(4, 6) - 1), parseInt(fechaMin.toString().substring(6, 8)))
    }).data("kendoDatePicker");

    $("#txtPeriodoFin").keypress(ValidarFecha);

    var periodoFin = $("#txtPeriodoFin").kendoDatePicker({
        culture: "es-PE",
        start: "year",
        depth: "year",
        value: fechainicio,
        format: "MM/yyyy",
        footer: false
    , max: new Date(parseInt(fechaMax.toString().substring(0, 4)), parseInt(fechaMax.toString().substring(4, 6) - 1), parseInt(fechaMax.toString().substring(6, 8)))
    , min: new Date(parseInt(fechaMin.toString().substring(0, 4)), parseInt(fechaMin.toString().substring(4, 6) - 1), parseInt(fechaMin.toString().substring(6, 8)))
    }).data("kendoDatePicker");


    $("#ddlTipoComprobante").kendoDropDownList({
//        change: onBuscar
    });

    $("#ddlEstado").kendoDropDownList({
//        change: onBuscar
    });

    function CargarControles() {

        $.ajax({
            type: "POST",
            url: "VisorComprobante.aspx/ListarComprobantes",
            data: "{'p_idEmpleado': '" + $("#hdfEmpleado").val() + "', 'p_fechaIni':'" + fechaMin + "', 'p_fecFin':'" + fechaMax + "', 'p_idTipoDocumento':' " + $("#ddlTipoComprobante").val() + "', 'p_idEstadoCobro':'" + $("#ddlEstado").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (resultado) {
                comprobantes = resultado.d;

                $("#grdComprobante").kendoGrid({
                    dataSource: {
                        data: comprobantes,
                        pageSize: 5
                    },
                    groupable: false,
                    sortable: true,
                    selectable: true,
                    navigatable: true,
                    pageable: {
                        refresh: true,
                        pageSizes: true,
                        messages: {
                            itemsPerPage: "ítems por página",
                            display: "{0}-{1} de {2} ítems",
                            empty: ""
                        }
                    },
                    columns: [
                                { field: "VcPeriodo", width: "40px", title: "Periodo", hidden: false, attributes: { style: "text-align:center;"} },
                                { field: "VcFechaEmision", width: "60px", title: "Fecha de Emisión", hidden: false, attributes: { style: "text-align:center;"} },
                                { field: "VcTipoDocumento", width: "65px", title: "Tipo de Documento", hidden: false, attributes: { style: "text-align:center;"} },
                                { field: "NumeroComprobante", title: "Nro Documento", width: "60px", attributes: { style: "text-align:center;" }, template: '<a href="\\#" style="color:\\#003F8D; text-decoration:underline;font-size:10pt;" onclick="descargarComprobante(this)" class="k-link">#= NumeroComprobante #</a>' },
                                { field: "ImporteTotal", width: "55px", title: "Importe Total", hidden: false, attributes: { style: "text-align:right; font-weight:bolder;font-size:10pt;" }, format: "{0:c2}" },
                                { field: "VcEstadoCobro", width: "50px", title: "Estado", hidden: false, attributes: { style: "text-align:center; font-weight:bolder;"} },
                                { field: "MontoCobrado", width: "85px", title: "Monto Cobrado / Abonado", format: "{0:c2}", attributes: { style: "text-align:right; font-weight:bolder;"} }
                                , { field: "IdTipoDocumento", width: "20px", title: "IdTipoDocumento", hidden: true }
                            ]
                });
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });

    }

    function onBuscar() {
        var dtIni;
        var dtFin;

        var fecIni = $("#txtPeriodoInicio").val();
        if (fecIni == "" || fecIni == null) {
            dtIni = new Date(parseInt(fechaMin.toString().substring(0, 4)), parseInt(fechaMin.toString().substring(4, 6)) - 1, 1);
        } else {
            if (fecIni.length != 7 || fecIni.indexOf("/") != 2 || fecIni.split("/").length != 2) {
                $("#spMensaje").text("Ingrese un formato de fecha válido, mm/yyyy");
                return;
            }
        }
        
        var fecFin = $("#txtPeriodoFin").val();
        if (fecFin == "" || fecFin == null) {
            dtFin = new Date(parseInt(fechaMax.toString().substring(0, 4)), parseInt(fechaMax.toString().substring(4, 6)), 0);
        } else {
            if (fecFin.length != 7 || fecFin.indexOf("/") != 2 || fecFin.split("/").length != 2) {
                $("#spMensaje").text("Ingrese un formato de fecha válido, mm/yyyy");
                return;
            }
        }

        if ($("#txtPeriodoInicio").val() != "" || $("#txtPeriodoInicio").val() == null) {
            dtIni = new Date(fecIni.substring(3, 7), fecIni.substring(0, 2) - 1, 1);
        }
        if ($("#txtPeriodoFin").val() != "" || $("#txtPeriodoFin").val() == null) {
            dtFin = new Date(fecFin.substring(3, 7), fecFin.substring(0, 2), 0);
        }

        if (dtIni > dtFin) {
            alerta("La fecha inicial debe ser menor o igual a la fecha final.");
            return;
        }

        var p_fechaMin = dtIni.getFullYear() + "" + (dtIni.getMonth() + 1 < 10 ? '0' + (dtIni.getMonth() + 1) : dtIni.getMonth() + 1) + "" + (dtIni.getDate() < 10 ? '0' + dtIni.getDate() : dtIni.getDate());
        var p_fechaMax = dtFin.getFullYear() + "" + (dtFin.getMonth() + 1 < 10 ? '0' + (dtFin.getMonth() + 1) : dtFin.getMonth() + 1) + "" + (dtFin.getDate() < 10 ? '0' + dtFin.getDate() : dtFin.getDate());

        $.ajax({
            type: "POST",
            url: "VisorComprobante.aspx/ListarComprobantes",
            data: "{'p_idEmpleado': '" + $("#hdfEmpleado").val() + "', 'p_fechaIni':'" + p_fechaMin + "', 'p_fecFin':'" + p_fechaMax + "', 'p_idTipoDocumento':' " + $("#ddlTipoComprobante").val() + "', 'p_idEstadoCobro':'" + $("#ddlEstado").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (resultado) {
                comprobantes = resultado.d;

                var dataSource = new kendo.data.DataSource({
                    data: comprobantes,
                    pageSize: 5
                });

                var gridele = $("#grdComprobante").data("kendoGrid");
                gridele.setDataSource(dataSource);
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    DimPosElementos();

    $(window).resize(function () {
        DimPosElementos();
    });

    $("#btnBuscar").click(function () {
        onBuscar();
    });

    if (flagPag) {
        onRetorno();
        
    } else {
        CargarControles();
    }
    $("#btnContinuar").click(function () {
        $("#msgSinComprobante").data("kendoWindow").open();
    });
});

function descargarComprobante(valor) {

    var item = $("#grdComprobante").data("kendoGrid").dataItem($(valor).closest("tr"));

    $.ajax({
        type: "POST",
        url: "VisorComprobante.aspx/DescargarPdf",
        data: "{'p_nroComprobante': '" + item.NumeroComprobante + "', 'p_idEmpleado':'" + $("#hdfEmpleado").val() + "', 'p_idTipoDocumento':'" + item.IdTipoDocumento + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d.length > 0) {
                var RutaFinal = data.d;
                window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=Temporal/Comprobantes/" + RutaFinal);

            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function onRetorno() {

    $("#win1").kendoWindow({
        width: "300px",
        height: "100px",
        modal: true,
        title: "Comprobantes",
        close: function () {
            window.location.href = raiz("Pedido/Dashboard_pedido.aspx");
        },
        visible: false
    });

    continua("Usted no tiene comprobantes generados.<br> <br>", "Comprobantes", function (a) {
        if (a == "Continuar") {
            window.location.href = raiz("Pedido/Dashboard_pedido.aspx");
        }
    });
}

function DimPosElementos() {
    try {
        resizeGrid();
    } catch (e) {
        //some error..
    }
}

function resizeGrid() {
    var gridElement = $("#grdComprobante");
    var dataArea = gridElement.find(".k-grid-content");
    var newHeight = $(window).height() - 270; //gridElement.parent().innerHeight() - 2;
    var diff = gridElement.innerHeight() - dataArea.innerHeight();
    gridElement.height(newHeight);
    dataArea.height(newHeight - diff);
}
