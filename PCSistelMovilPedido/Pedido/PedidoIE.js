var acddataGlobal;
var idTipoContrato;

$(function () {
    if (window.parent.UsuarioConectado != $("#hfUsuario").val()) {
        window.location.href = '../Login.aspx';
        return;
    }

    idTipoContrato = window.parent.inTipoContrato;

    enlacesIniciales();
    load();
    obtenerCampanaActiva();
});


function load() {
    obtenerPedidos();
//    resizeGrid();

//    $(window).resize(function () {
//        resizeGrid();
//    });

    $("#dvMsgAlerta").css("width", "200px");
    
    fnActivarConfiguracionCampana();
}


function enlacesIniciales() {

    $("#btnNuevoPedido").click(function () {
        window.parent.NumeroRenovar = undefined;
        window.parent.IdPlanNumeroRenovar = undefined;
        window.parent.FlagMantenerPlan = undefined;
        window.parent.IdTipoFinanciamiento = undefined;
        window.parent.miIdTipoModeloDispositivo = undefined;
        window.location.href = "CarritoIE.aspx";
    });

    $("#btnEliminarPedido").click(function () {
        cancelarPedido();
    });

    $("#btnEditarPedido").click(function () {
        editarPedido();
    });

    $("#btnDetalles").click(function () {
        fnGetDetalle();
    });

    $("#btnVolverPedido").click(function () {
        $("#pDetalleGrilla").css("display", "none");
        $("#pGrillaPedido").css("display", "block");
        $("#btnVolverPedido").css("display", "none");        
    });

}

function obtenerPedidos() {

    $.ajax({
        type: "POST",
        url: "Pedido.aspx/obtenerPedidoEmpleado",
        data: "{'prIdEmpleado': '" + $("#hdfEmpleado").val() + "'," +
                "'prIdCampana': '" + window.parent.CampanaConf.IdCampana + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {

            pedidos = resultado.d;

            for (var i = 0; i < pedidos.length; i++) {
                pedidos[i].MontoTotal = (pedidos[i].MontoTotalNoServicios + pedidos[i].MontoTotalServicios);
            }

            var ocultarContrato = false;
            if (idTipoContrato == "1") {
                ocultarContrato = true;
            }

            $("#grdPedidos").kendoGrid({
                dataSource: {
                    data: pedidos,
                    pageSize: 10
                },
                scrollable: false,
                sortable: false,
                selectable: "row",
                pageable: {
                    refresh: false,
                    pageSizes: false,
                    messages: {
                        itemsPerPage: "ítems por página",
                        display: "{0}-{1} de {2} ítems",
                        empty: ""
                    }
                },
                //detailTemplate: kendo.template($("#template").html()),
                //detailInit: detailInit,
                dataBound: loadgrillaPedidos,
//                change: function (e) {
//                    var selectedRows = this.select();

//                    //                    $(selectedRows).css("background-color":"black");
//                    var grid = $("#grdPedidos").data("kendoGrid");
//                    alert(grid.cellIndex(selectedRows));

//                },
                columns: [
                    { field: "IdPedido", width: "50px", title: "IdPedido", hidden: true },
                    { field: "IdCampana", width: "50px", title: "IdCampana", hidden: true },
                    { field: "DscCampana", width: "50px", title: "Campaña", hidden: true },
                    { field: "Situacion", width: "55px", title: "Tipo", hidden: false, attributes: { style: "text-align:center; font-weight:bolder;font-size:11px;" }, headerAttributes: { style: "text-align: center;font-size:11px;"} },
                    { field: "TipoRenovacion", width: "50px", title: "TipoRenovacion", hidden: true },
                    { field: "CodigoPedido", width: "65px", title: "Nro Pedido", attributes: { style: "font-size:11px;"} },
                    { field: "FechaPedido", width: "70px", title: "Fecha", format: "{0: yyyy-MM-dd HH:mm}", attributes: { style: "text-align:center; font-weight:bolder;font-size:11px;" }, headerAttributes: { style: "text-align: center;font-size:11px;"} },
                    { field: "FechaRecojo", width: "50px", title: "Recojo", hidden: true },
                    { field: "IdEstado", width: "35px", title: "IdEstado", hidden: true },
                    { field: "DscEstado", width: "55px", title: "Estado", attributes: { style: "text-align:center; font-weight:bolder;font-size:11px;" }, headerAttributes: { style: "text-align: center;font-size:11px;"} },
                    { field: "IdOficina", width: "50px", title: "IdOficina", hidden: true },
                    { field: "IdTipoFinanciamiento", width: "50px", title: "IdTipoFinanciamiento", hidden: true },
                    { field: "PermiteCancelarFinCam", width: "50px", title: "PermiteCancelarFinCam", hidden: true },
                    { field: "PermiteCancelardiasMax", width: "50px", title: "PermiteCancelardiasMax", hidden: true },
                    { field: "DireccionCompleta", width: "50px", title: "Dirección", hidden: true },
                    { field: "MontoTotalNoServicios", width: "55px", title: "S/ Producto", attributes: { style: "text-align:right;" }, format: "{0:#,#.00}", headerAttributes: { style: "text-align: center;font-size:11px;"} },
                    { field: "MontoTotalServicios", width: "50px", title: "S/ Servicio", attributes: { style: "text-align:right;" }, format: "{0:#,#.00}", headerAttributes: { style: "text-align: center;font-size:11px;"} },
                    { field: "MontoTotal", width: "50px", title: "S/ Monto Total", attributes: { style: "text-align:right;" }, format: "{0:#,#.00}", headerAttributes: { style: "text-align: center;font-size:11px;"} },
                    { command: { text: "Contrato", click: fnEditar }, title: " ", width: "40px", headerAttributes: { style: "text-align: center;font-size:10px;" }, hidden: ocultarContrato }
                    //, { command: { text: "Detalle", click: fnGetDetalle }, title: " ", width: "40px", headerAttributes: { style: "text-align: center;font-size:10px;"} }
                ]
            });
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnGetDetalle(e) {

//    acddataGlobal = this.dataItem($(e.currentTarget).closest("tr"));
//    $.ajax({
//        type: "POST",
//        url: "Pedido.aspx/getDetallePedidoByPedidoMostrar",
//        data: "{'prIdPedido': '" + acddataGlobal.IdPedido + "'}",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (resultado) {
//            var columnas = JSON.parse(resultado.d[0]);
//            var filas = JSON.parse(resultado.d[1]);
//            $("#pGrillaPedido").css("display", "none");
//            $("#tdSituacion").text(acddataGlobal.Situacion);
//            $("#tdCodigo").text(acddataGlobal.CodigoPedido);
//            $("#tdFecha").text(acddataGlobal.FechaPedido);
//            $("#tdEstado").text(acddataGlobal.DscCampana);
//            $("#grdDetallePedido").kendoGrid({
//                dataSource: {
//                    data: filas,
//                    pageSize: 10
//                },
//                scrollable: false,
//                sortable: false,
//                columns: columnas,
//                pageable: {
//                    refresh: true,
//                    pageSizes: true,
//                    messages: {
//                        itemsPerPage: "ítems por página",
//                        display: "{0}-{1} de {2} ítems",
//                        empty: ""
//                    }
//                }
//            });
//            $("#pDetalleGrilla").css("display", "block");
//            $("#btnVolverPedido").css("display", "block");  
//        },
//        error: function (xhr, err, thrErr) {
//            MostrarErrorAjax(xhr, err, thrErr);
//        }
//        });

    var grid = $("#grdPedidos").data("kendoGrid");
    var row = grid.select();
    if (row[0] == undefined) {
        alerta("Seleccione un pedido");
        return;
    }

    var data = grid.dataItem(row);

    window.parent.Pedido = data;

    window.location.href = "DetallePedido.aspx";
}

function fnEditar(e) {
    var acddata = this.dataItem($(e.currentTarget).closest("tr"));

    $.ajax({
        type: "POST",
        url: "Dashboard_pedido.aspx/getContrato",
        data: "{'prIdPedido': '" + acddata.IdPedido + "'}",
        //                    "'pIdCampana': '" + "5" + "'," +
        //                    "'pAccion': '" + "Renovar" + "'," +
        //                    "'pXmlNumero': '" + XML + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {

            //alert(raiz("../Common/Controladores/DescargarArchivo.ashx?archivo=" + resultado.d));

            if ($.trim(resultado.d) == "") {
                alert("Este pedido no tiene contrato generado.");
            } else {
                $.ajax({
                    url: raiz(resultado.d), //or your url
                    success: function(data) {
                        window.location.href = "../Common/Controladores/DescargarArchivo.ashx?archivo=" + resultado.d;
                    },
                    error: function(data) {
                        alert('No se encontró el archivo a descargar.');
                    }
                });
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function loadgrillaPedidos() {
    if (window.parent.esPreVentaActiva) {
        $(this.tbody).find(".k-button").addClass("noContrato") ;
    }
    else {
        var t = $(this.tbody).find("tr");
        for (var i = 0; i < this._data.length; i++) {
            if (((this._data[i].Situacion == "Renovacion" || this._data[i].Situacion == "Renovación") &&
             (this._data[i].TipoRenovacion == "Línea" || this._data[i].TipoRenovacion == "Linea"))
             || this._data[i].Situacion == "Baja"
             || parseInt(this._data[i].MontoTotalServicios) == 0) {
                $($(t[i]).find(".k-button")[0]).addClass("noContrato");
            }
            else {
                if (this._data[i].DscEstado != "Procesado" && this._data[i].DscEstado != "Enviado") {
                    $($(t[i]).find(".k-button")[0]).addClass("noContrato");
                }
            }


            switch (this._data[i].DscEstado) {
                case "Enviado":
                    $($(t[i]).find("td")[9]).addClass("estadoEnviado");
                    break;
                case "Enviado Parcial":
                    $($(t[i]).find("td")[9]).addClass("estadoEnviadoParcial");
                    break;
                case "No Adquirido":
                    $($(t[i]).find("td")[9]).addClass("estadoNoAdquirido");
                    break;
                case "Cancelado":
                    $($(t[i]).find("td")[9]).addClass("estadoCancelado");
                    break;
                case "Procesado":
                    $($(t[i]).find("td")[9]).addClass("estadoProcesado");
                    break;
                default:
                    break;
            }

        }
    }
}

function cancelarPedido() {
    var grid = $("#grdPedidos").data("kendoGrid");
    var row = grid.select();
    if (row[0] == undefined) {
        alert("Seleccione un pedido");
        return;
    }

    var data = grid.dataItem(row);
    if (data == null || (data.DscEstado != "Enviado" && data.DscEstado != "Reservado")) {
        alerta("Sólo puede cancelar pedidos enviados y reservados");
        return;
    }

    if (data == null || data.Situacion == "Baja") {
        alerta("Usted no puede Cancelar pedido de Baja");
        return;
    }

    if (data.PermiteCancelarFinCam) {
        if (!data.PermiteCancelarFinCam) {
            alerta("Usted a superado los dias maximos en los que podia cancelar su pedido");
            return;
        }
    }
    else {
        alerta("No se puede cancelar pedido por estar muy proximo al cierre de campaña");
        return;
    }

    confirma("Se procederá a cancelar el pedido<br>¿Desea continuar con el proceso?", "Cancelar Pedido", function (a) {
        if (a == "Aceptar") {
            var idPedido = data.IdPedido;
            $.ajax({
                type: "POST",
                url: "Pedido.aspx/CancelarPedido",
                data: "{'prIdPedido': '" + idPedido + "'," +
                    "'prIdCampana': '" + window.parent.CampanaConf.IdCampana + "'," +
                    "'prIdEmpleado': '" + $("#hdfEmpleado").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (resultado) {

                    if (resultado.d) {
//                        $.ajax({
//                            type: "POST",
//                            url: "Pedido.aspx/obtenerPedidoEmpleado",
//                            data: "{'prIdEmpleado': '" + $("#hdfEmpleado").val() + "'}",
//                            contentType: "application/json; charset=utf-8",
//                            dataType: "json",
//                            success: function (resultado) {

//                                pedidos = resultado.d;

//                                var dataSource = new kendo.data.DataSource({
//                                    data: pedidos,
//                                    pageSize: 10
//                                });

//                                var gridPro = $("#grdPedidos").data("kendoGrid");
//                                gridPro.setDataSource(dataSource);

//                                alert("Su pedido a sido cancelado");
//                                window.location.href = "PedidoIE.aspx";
//                            },
//                            error: function (xhr, err, thrErr) {
//                                MostrarErrorAjax(xhr, err, thrErr);
//                            }
                        //                        });

                        alert("Su pedido a sido cancelado");
                        window.location.href = "PedidoIE.aspx";
                    }
                    else {
                        window.location.href = "../FinSession.aspx";
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
    });
}

function editarPedido() {
    var grid = $("#grdPedidos").data("kendoGrid");
    var row = grid.select();
    if (row[0] == undefined) {
        alert("seleccione un pedido");
        return;
    }

    var data = grid.dataItem(row);

    if (data == null || (data.DscEstado != "Enviado" && data.DscEstado != "Reservado")) {
        alerta("Sólo puede editar pedidos enviados y reservados");
        return;
    }

    if (data.DscEstado == "Reservado") {
        window.parent.esConfirmacionPreventa = true;
    }

    window.parent.IdTipoFinanciamiento = data.IdTipoFinanciamiento;
//    if (data == null || data.Situacion == "Renovación") {
//        alert("Usted no puede editar pedido de renovación,<br> para editarlo debe cancelar el pedido y volver a registrarlo");
//        return;
    //    }

    if (data == null || data.Situacion == "Renovación") {

        $.ajax({
            type: "POST",
            url: "Pedido.aspx/obtenerNumero_porIdpedido",
            data: "{'prIdPedido': '" + data.IdPedido + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (resultado) {

                if (resultado.d) {

                    window.parent.NumeroRenovar = resultado.d.Numero;
                    window.parent.IdPlanNumeroRenovar = resultado.d.IdPlan;
                    //window.parent.FlagMantenerPlan = resultado.d.FlagManteniePlan ? "True":"False";
                    window.parent.FlagMantenerPlan = "False";
                    window.parent.PrecioPlanNumeroRenovar = resultado.d.PrecioPlan;
                    window.parent.miIdTipoModeloDispositivo = resultado.d.IdTipoModeloDispositivo;

                    if ($.browser.msie && $.browser.version == "6.0")
                        document.location.href = "CarritoIE.aspx?irCarrito=1&esConEquipo=1&IdPedido=" + data.IdPedido.toString();
                    else
                        document.location.href = "Pedido.aspx?irCarrito=1&esConEquipo=1&IdPedido=" + data.IdPedido.toString();

                }
                else {
                    alerta("Pedido no tiene número de renovación");
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
        return;
    }

    if (data == null || data.Situacion == "Baja") {
        alert("Usted no puede editar pedido de Baja");
        return;
    }

    if (data == null || data.Situacion == "RenovacionPlan") {        
        $.ajax({
            type: "POST",
            url: "Pedido.aspx/obtenerNumero_porIdpedido",
            data: "{'prIdPedido': '" + data.IdPedido + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (resultado) {
                if (resultado.d) {
                    window.parent.NumeroRenovar = resultado.d.Numero;
                    window.parent.IdPlanNumeroRenovar = resultado.d.IdPlan;
                    window.parent.PrecioPlanNumeroRenovar = resultado.d.PrecioPlan;

                    document.location.href = "PedidoPlanIE.aspx?IdPedido=" + data.IdPedido.toString();
                } else {
                    alerta("Pedido no tiene número");
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
        return;
    }

    var idPedidoEditar = data.IdPedido;

    document.location.href = "CarritoIE.aspx?IdPedido=" + idPedidoEditar.toString() + "&LugarEntrega=" + data.IdOficina.toString();

}

function resizeGrid() {
    var gridElement = $("#grdPedidos");
    var dataArea = gridElement.find(".k-grid-content");
    var newHeight = $(window).height() - 180; //gridElement.parent().innerHeight() - 2;
    var diff = gridElement.innerHeight() - dataArea.innerHeight();
    gridElement.height(newHeight);
    dataArea.height(newHeight - diff);
}

function obtenerCampanaActiva() {
//    $.ajax({
//        type: "POST",
//        url: "Pedido.aspx/obtenerCampanaActivaConf",
//        data: "{'prIdCliente': '" + "0" + "'}",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (resultado) {
//            campanaActiva = resultado.d;

    $($("#pTituloPedido > div")[0]).text(window.parent.CampanaConf.Descripcion);

//        },
//        error: function (xhr, err, thrErr) {
//            MostrarErrorAjax(xhr, err, thrErr);
//        }
//    });
}

function fnActivarConfiguracionCampana() {
    if (!window.parent.CampanaConf.CancelarPedido) {
        $("#btnEliminarPedido").hide();
    }

    if (!window.parent.CampanaConf.ModificarPedido) {
        $("#btnEditarPedido").hide();
    }
}