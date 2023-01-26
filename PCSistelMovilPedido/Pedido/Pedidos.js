var acddataGlobal;
var numFil;
var numselect;
var estad;
var idTipoContrato;
var pedidos;
var oCultura = null;
$(function () {
    oCultura = window.parent.oCulturaUsuario;

    //debugger;
    if (window.parent.UsuarioConectado != $("#hfUsuario").val()) {
        window.location.href = '../Login.aspx';
        return;
    }
    idTipoContrato = window.parent.inTipoContrato;

    resizeGrid();
    enlacesIniciales();
    load();
    obtenerCampanaActiva();
    fnActivarConfiguracionCampana();

});


function load() {
    obtenerPedidos();


    $(window).resize(function () {
        resizeGrid();
    });
}


function enlacesIniciales() {

    $("#btnNuevoPedido").click(function () {
        window.parent.NumeroRenovar = undefined;
        window.parent.IdPlanNumeroRenovar = undefined;
        window.parent.FlagMantenerPlan = undefined;
        window.parent.IdTipoFinanciamiento = undefined;
        window.parent.miIdTipoModeloDispositivo = undefined;
        window.location.href = "Pedido.aspx";
    });

    $("#pnlBuscarLugarEntrega").kendoWindow({
        width: "800px",
        title: "Lugar de entrega",
        actions: [
                "Close"
        ],
        modal: true
    });


    $("#btnEliminarPedido").click(function () {
        cancelarPedido();
    });

    $("#btnCambiarLugar").click(function () {
        cambiarLugarEntrega();
    });

    $("#btnEditarPedido").click(function () {
        editarPedido();
    });

    $("#btnVolverPedido").click(function () {
        $("#pDetalleGrilla").css("display", "none");
        $("#pGrillaPedido").css("display", "block");
        $("#btnVolverPedido").css("display", "none");
    });

    if (!$.browser.msie) {
        $("#miGroupBox").width($("#miGroupBox").width() - 50);
    }

}

function obtenerPedidos() {
    var idsCampanasActivas = [];
    for (var i = 0; i < window.parent.arCampanasActivas.length; i++) {
        idsCampanasActivas.push(window.parent.arCampanasActivas[i].IdCampana);
    }
    var obtenerPedidoEmpleado_Data = {
        prIdEmpleado: $("#hdfEmpleado").val(),
        prIdCampana: idsCampanasActivas.join(",")
    };

    $.ajax({
        type: "POST",
        url: "Pedido.aspx/obtenerPedidoEmpleado",
        data: JSON.stringify(obtenerPedidoEmpleado_Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {

            pedidos = resultado.d;

            for (var i = 0; i < pedidos.length; i++) {
                pedidos[i].MontoTotalServiciosDsc = formatNumberDecimal.newo(parseFloat(pedidos[i].MontoTotalServicios).toFixed(2), oCultura.Moneda.vcSimMon + " ");
                pedidos[i].MontoTotalNoServiciosDsc = formatNumberDecimal.newo(parseFloat(pedidos[i].MontoTotalNoServicios).toFixed(2), oCultura.Moneda.vcSimMon + " ");

                pedidos[i].MontoTotalDsc = formatNumberDecimal.newo((parseFloat(pedidos[i].MontoTotalServicios) + parseFloat(pedidos[i].MontoTotalNoServicios)).toFixed(2), oCultura.Moneda.vcSimMon + " ");
            }

            var ocultarContrato = false;
            if (idTipoContrato == "1") {
                ocultarContrato = true;
            }

            $("#grdPedidos").kendoGrid({
                dataSource: {
                    data: pedidos,
                    pageSize: 8 //numFil
                },
                groupable: false,
                sortable: false,
                //selectable: true,
                navigatable: true,
                pageable: {
                    refresh: true,
                    pageSizes: [8],
                    messages: {
                        itemsPerPage: "pedidos por página",
                        display: "{0}-{1} de {2} pedidos",
                        empty: ""
                    }
                },
                //detailTemplate: kendo.template($("#template").html()),
                detailInit: detailInit,
                dataBound: loadgrillaPedidos,
                //                change: function (e) {
                //                    var selectedRows = this.select();
                //                    //                    $(selectedRows).css("background-color":"black");
                //                    var grid = $("#grdPedidos").data("kendoGrid");
                //                    alert(grid.cellIndex(selectedRows));
                //                },
                columns: [
                    { template: '<input type="checkbox" class="chkSel" id="chk-#=IdPedido#" />', title: "", width: "17px" },
                    { field: "IdPedido", width: "50px", title: "IdPedido", hidden: true },
                    { field: "IdCampana", width: "50px", title: "IdCampana", hidden: true },
                    { field: "DscCampana", width: "50px", title: "Campaña", hidden: true },
                    { field: "Situacion", width: "65px", title: "Tipo", hidden: false, attributes: { style: "text-align:center; font-weight:bolder;font-size:11px;" }, headerAttributes: { style: "text-align: center;font-size:11px;" } },
                    { field: "TipoRenovacion", width: "50px", title: "TipoRenovacion", hidden: true },
                    { template: '<img id="#:data.IdOperador#-#:data.NombreOperador#" class="hovOpe" src="../Common/Images/icono_#:data.NombreOperador#.png" style="width: 18px;height: 18px;float: left;">', width: "20px", title: "", headerAttributes: { style: "text-align: center;font-size:11px;" } },
                    { field: "CodigoPedido", width: "65px", title: "Nro Pedido", attributes: { style: "font-size:11px;" }, headerAttributes: { style: "text-align: center;font-size:11px;" } },
                //{template: '<img alt="CLARO" src="../Common/Images/icono_#:data.NombreOperador#.png" style="width: 18px;height: 18px;float: left;">#:data.CodigoPedido#', width: "65px", title: "Nro Pedido", headerAttributes: { style: "text-align: center;font-size:11px;"} },
                    { field: "FechaPedido", width: "50px", title: "Fecha", format: "{0: yyyy-MM-dd HH:mm}", attributes: { style: "font-size:11px;text-align:center;" }, headerAttributes: { style: "text-align: center;font-size:11px;" } },
                    { field: "FechaRecojo", width: "50px", title: "Recojo", hidden: true },
                    { field: "IdEstado", width: "35px", title: "IdEstado", hidden: true },
                    { field: "DscEstado", width: "60px", title: "Estado Proceso", attributes: { style: "text-align:center; font-weight:bolder;font-size:11px;" }, headerAttributes: { style: "text-align: center;font-size:11px;" } },
                    { field: "IdOficina", width: "50px", title: "IdOficina", hidden: true },
                    { field: "IdTipoFinanciamiento", width: "50px", title: "IdTipoFinanciamiento", hidden: true },
                    { field: "PermiteCancelarFinCam", width: "50px", title: "PermiteCancelarFinCam", hidden: true },
                    { field: "PermiteCancelardiasMax", width: "50px", title: "PermiteCancelardiasMax", hidden: true },
                    { field: "DireccionCompleta", width: "50px", title: "Dirección", hidden: true },
                //                    { field: "MontoTotalNoServicios", width: "45px", title: "Costo<br>Equipo", attributes: { style: "text-align:right;" }, format: "{0:#,#.00}" },
                //                    { field: "MontoTotalServicios", width: "50px", title: "Costo<br>Plan", attributes: { style: "text-align:right;" }, format: "{0:#,#.00}" },
                    { field: "MontoTotalNoServiciosDsc", width: "55px", title: "Cuota<br>Equipo", attributes: { style: "text-align:right;" }, headerAttributes: { style: "text-align: center;font-size:11px;" } },
                    { field: "MontoTotalServiciosDsc", width: "50px", title: "Precio<br>Plan", attributes: { style: "text-align:right;" }, headerAttributes: { style: "text-align: center;font-size:11px;" } },
                    { field: "MontoTotalDsc", width: "50px", title: "Total<br>Mensual", attributes: { style: "text-align:right;" }, headerAttributes: { style: "text-align: center;font-size:11px;" }, hidden: true },
                    { command: { text: "Contrato", click: fnEditar }, title: "Documento", width: "55px", attributes: { style: "text-align:center;" }, headerAttributes: { style: "text-align: center;font-size:11px;" }, hidden: ocultarContrato }
                //                  {command: { text: "Cancelar", click: fnCancelar }, title: " ", width: "60px" }


                ]
            });

            //            if (idTipoContrato == "1") {
            //                var grid = $("#grdPedidos").data("kendoGrid");
            //                grid.hideColumn(18);    //Ocultar el contrato Sí TipoContrato = 1    
            //            }

            if (window.parent.SeCanceloPedido) {
                alerta("Su pedido a sido cancelado");
                window.parent.SeCanceloPedido = false;
            }

            if (window.parent.SeProcesoPedido) {
                alerta("Su pedido ya estaba en proceso, sus cambios no se han podido realizar");
                window.parent.SeProcesoPedido = false;
            }

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnGetDetalle(e) {

    acddataGlobal = this.dataItem($(e.currentTarget).closest("tr"));

    $.ajax({
        type: "POST",
        url: "Pedido.aspx/getDetallePedidoByPedidoMostrar",
        data: "{'prIdPedido': '" + acddataGlobal.IdPedido + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {

            var columnas = JSON.parse(resultado.d[0]);
            var filas = JSON.parse(resultado.d[1]);

            $("#pGrillaPedido").css("display", "none");

            $("#tdSituacion").text(acddataGlobal.Situacion);
            $("#tdCodigo").text(acddataGlobal.CodigoPedido);
            $("#tdFecha").text(acddataGlobal.FechaPedido);
            $("#tdEstado").text(acddataGlobal.DscCampana);

            $("#grdDetallePedido").kendoGrid({
                dataSource: {
                    data: filas,
                    pageSize: 10
                },
                scrollable: false,
                sortable: false,
                columns: columnas,
                pageable: {
                    refresh: true,
                    pageSizes: true,
                    messages: {
                        itemsPerPage: "ítems por página",
                        display: "{0}-{1} de {2} ítems",
                        empty: ""
                    }
                }
            });

            $("#pDetalleGrilla").css("display", "block");
            $("#btnVolverPedido").css("display", "block");
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function fnEditar(e) {
    //var acddata = this.dataItem($(e.currentTarget).closest("tr"));

    var lstChk = $(".chkSel:checkbox:checked");
    if (lstChk.length == 0) {
        alerta("Seleccione un registro");
        return;
    } else if (lstChk.length != 1) {
        alerta("Debe seleccionar solo un registro");
        return;
    }
    var acddata = $(lstChk[0]).attr("id").split("-")[1];

    $.ajax({
        type: "POST",
        url: "Dashboard_pedido.aspx/getContrato",
        //data: "{'prIdPedido': '" + acddata.IdPedido + "'}",
        data: "{'prIdPedido': '" + acddata + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            if ($.trim(resultado.d) == "") {
                alerta("Este pedido no tiene contrato generado.");
            } else if ($.trim(resultado.d) == "-1") {
                alerta('No se encontró el archivo a descargar.');
            } else {
                window.location.href = "../Common/Controladores/DescargarArchivo.ashx?archivo=" + resultado.d;
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}


function cancelarPedido() {
    /*
    var grid = $("#grdPedidos").data("kendoGrid");
    var row = grid.select();
    if (row[0] == undefined) {
    alerta("Seleccione un pedido");
    return;
    }

    var data = grid.dataItem(row);
    */

    var lstChk = $(".chkSel:checkbox:checked");
    if (lstChk.length == 0) {
        alerta("Seleccione un registro");
        return;
    } else if (lstChk.length != 1) {
        alerta("Debe seleccionar solo un registro");
        return;
    }

    var data;
    for (var i = 0; i < pedidos.length; i++) {
        if (pedidos[i].IdPedido == $(lstChk[0]).attr("id").split("-")[1]) {
            data = pedidos[i];
            break;
        }
    }

    if (data == null || (data.DscEstado != "Enviado" && data.DscEstado != "Reservado" && data.DscEstado != "Enviado Parcial")) {
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
                    "'prIdCampana': '" + data.IdCampana.toString() + "'," +
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

                        //                                alerta("Su pedido a sido cancelado");
                        //                                window.location.href = "PedidoIE.aspx";
                        //                            },
                        //                            error: function (xhr, err, thrErr) {
                        //                                MostrarErrorAjax(xhr, err, thrErr);
                        //                            }
                        //                        });

                        //alerta("Su pedido a sido cancelado", "Cancelar Pedido", Refrescar);
                        //window.location.href = "Pedidos.aspx";
                        //location.reload(true);
                        Refrescar();

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

function cambiarLugarEntrega() {
    /*
    var grid = $("#grdPedidos").data("kendoGrid");
    var row = grid.select();
    if (row[0] == undefined) {
        alerta("Seleccione un pedido");
        return;
    }

    var data = grid.dataItem(row);
    */

    var lstChk = $(".chkSel:checkbox:checked");
    if (lstChk.length == 0) {
        alerta("Seleccione un registro");
        return;
    } else if (lstChk.length != 1) {
        alerta("Debe seleccionar solo un registro");
        return;
    }

    var data;
    for (var i = 0; i < pedidos.length; i++) {
        if (pedidos[i].IdPedido == $(lstChk[0]).attr("id").split("-")[1]) {
            data = pedidos[i];
            break;
        }
    }

    window.parent.Pedido = data;

    //window.location.href = "DetallePedido.aspx";
    window.location.href = "DetallePedido.aspx?IdCampana=" + data.IdCampana;

    //    if (data == null || (data.DscEstado != "Enviado" && data.DscEstado != "Procesado")) {
    //        alerta("Solo puede cambiar de lugar de entrega a pedidos enviados y procesados");
    //        return;
    //    }

    //    if (data == null || data.Situacion == "Baja") {
    //        alerta("Cambiar lugar de entrega no aplica para Baja");
    //        return;
    //    }

    //    $("#pnlBuscarLugarEntrega").data("kendoWindow").open();
    //    $(".k-window").css({ "-webkit-transform": "" });

}

function editarPedido() {
    var lstChk = $(".chkSel:checkbox:checked");
    if (lstChk.length == 0) {
        alerta("Seleccione un registro");
        return;
    } else if (lstChk.length != 1) {
        alerta("Debe seleccionar solo un registro");
        return;
    }

    var data;
    for (var i = 0; i < pedidos.length; i++) {
        if (pedidos[i].IdPedido == $(lstChk[0]).attr("id").split("-")[1]) {
            data = pedidos[i];
            break;
        }
    }

    /*
    var grid = $("#grdPedidos").data("kendoGrid");
    var row = grid.select();
    if (row[0] == undefined) {
        alerta("seleccione un pedido");
        return;
    }

    var data = grid.dataItem(row);
    */
    if (data == null || (data.DscEstado != "Enviado" && data.DscEstado != "Reservado" && data.DscEstado != "Enviado Parcial")) {
        alerta("Sólo puede editar pedidos enviados y reservados");
        return;
    }

    if (data.Situacion == "Renovación" && data.TipoRenovacion == "Línea") {
        alerta("No puede editar pedidos de sólo renovación de línea");
        return;
    }

    if (data.DscEstado == "Reservado") {
        window.parent.esConfirmacionPreventa = true;
    }

    window.parent.IdTipoFinanciamiento = data.IdTipoFinanciamiento;

    //    if (data == null || data.Situacion == "Renovación") {
    //        alerta("Usted no puede editar pedido de renovación,<br> para editarlo debe cancelar el pedido y volver a registrarlo");
    //        return;
    //    }

    //actviar campana del pedido seleccionado
    if (window.parent.CampanaConf.IdCampana != data.IdCampana) {
        window.parent.CampanaConf.IdCampana = data.IdCampana;
    }

    if (data == null || data.Situacion == "Renovación" || data.Situacion == "Portabilidad") {

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
                    //                    if (window.parent.FlagMantenerPlan == undefined) {
                    //                        window.parent.FlagMantenerPlan = "False"
                    //                    }
                    //                    else {
                    window.parent.FlagMantenerPlan = resultado.d.FlagManteniePlan ? "True" : "False";
                    //}

                    //window.parent.FlagMantenerPlan = "False";
                    window.parent.PrecioPlanNumeroRenovar = resultado.d.PrecioPlan;
                    window.parent.miIdTipoModeloDispositivo = resultado.d.IdTipoModeloDispositivo;

                    if ($.browser.msie && $.browser.version == "6.0")
                        document.location.href = "CarritoIE.aspx?irCarrito=1&esConEquipo=1&IdPedido=" + data.IdPedido.toString() + "&LugarEntrega=" + data.IdOficina.toString();
                    else
                        document.location.href = "Pedido.aspx?irCarrito=1&esConEquipo=1&IdPedido=" + data.IdPedido.toString() + "&LugarEntrega=" + data.IdOficina.toString() + "&IdCampana=" + window.parent.CampanaConf.IdCampana.toString();

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
        alerta("Usted no puede editar pedido de Baja");
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

                    //ECONDEÑA  20170811
                    window.parent.Habilitado = resultado.d.Habilitado;
                    window.parent.FechaFinContrato = resultado.d.FechaFinContrato;

                    document.location.href = "PedidoPlan.aspx?IdPedido=" + data.IdPedido.toString() + "&IdCampana=" + window.parent.CampanaConf.IdCampana.toString();
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

    document.location.href = "Pedido.aspx?IdPedido=" + idPedidoEditar.toString() + "&LugarEntrega=" + data.IdOficina.toString() + "&IdCampana=" + window.parent.CampanaConf.IdCampana.toString();

}

function resizeGrid() {
    var gridElement = $("#grdPedidos");
    var dataArea = gridElement.find(".k-grid-content");
    var newHeight = $(window).height() - 200; //gridElement.parent().innerHeight() - 2;
    var diff = gridElement.innerHeight() - dataArea.innerHeight();
    gridElement.height(newHeight);
    dataArea.height(newHeight - diff);
    numFil = Math.floor(newHeight / 36);
    //numselect = numFil
}

function obtenerCampanaActiva() {
    if (window.parent.arCampanasActivas.length == 1) {
        $($("#pTituloPedido > div")[0]).text(window.parent.CampanaConf.Descripcion);
    } else {
        $($("#pTituloPedido > div")[0]).text("Pedidos de Campañas Activas");
    }
}

function loadgrillaPedidos() {
    if (window.parent.esPreVentaActiva) {
        $(this.tbody).find(".k-button").css({ "background": "white", "display": "none" });
    }
    else {
        var t = $(this.tbody).find("tr");
        for (var i = 0; i < this._data.length; i++) {
            if (((this._data[i].Situacion == "Renovacion" || this._data[i].Situacion == "Renovación") &&
             (this._data[i].TipoRenovacion == "Línea" || this._data[i].TipoRenovacion == "Linea"))
             || this._data[i].Situacion == "Baja"
             || parseInt(this._data[i].MontoTotalServicios) == 0) {
                $($(t[i]).find(".k-button")[0]).css({ "background": "white", "display": "none" });
            }
            else {
                if (this._data[i].DscEstado != "Procesado" && this._data[i].DscEstado != "Enviado" && this._data[i].DscEstado != "Procesado Parcial") {
                    $($(t[i]).find(".k-button")[0]).css({ "background": "white", "display": "none" });
                }
            }


            switch (this._data[i].DscEstado) {
                case "Enviado":
                    $($(t[i]).find("td")[10]).css({ "color": "#206b01" }); //#F8C701 
                    break;
                case "Enviado Parcial":
                    $($(t[i]).find("td")[10]).css({ "color": "#9F771B" });
                    break;
                case "No Adquirido":
                    $($(t[i]).find("td")[10]).css({ "color": "red" });
                    break;
                case "Cancelado":
                    $($(t[i]).find("td")[10]).css({ "color": "darkred" });
                    break;
                case "Procesado":
                    $($(t[i]).find("td")[10]).css({ "color": "darkblue" });
                    break;
                default:
                    break;
            }

        }
    }

    $(".k-hierarchy-cell").hover(function () {
        $(this).mousemove(function (e) {
            $("#MostrarDealleFlo").css({ "left": e.pageX + 20, "top": e.pageY, "display": "block" });
        });
    }, function () {
        $("#MostrarDealleFlo").css("display", "none");
    });

    $(".chkSel").hover(function () {
        $(this).mousemove(function (e) {
            $("#SeleccionarPedido").css({ "left": e.pageX + 20, "top": e.pageY, "display": "block" });
        });
    }, function () {
        $("#SeleccionarPedido").css("display", "none");
    });

    $(".hovOpe").hover(function () {
        $(this).attr("id").split('-')[1];
        $("#MostrarOperador").html($(this).attr("id").split('-')[1]);
        $(this).mousemove(function (e) {
            $("#MostrarOperador").css({ "left": e.pageX + 20, "top": e.pageY, "display": "block" });
        });
    }, function () {
        $("#MostrarOperador").css("display", "none");
    });
}

function detailInit(e) {
    var detailRow = e.data;
    estad = detailRow.DscEstado;
    situac = detailRow.Situacion;
    $.ajax({
        type: "POST",
        url: "Pedido.aspx/getDetallePedidoByPedidoMostrar",
        data: "{'prIdPedido': '" + detailRow.IdPedido + "', " +
                "'prTipo': '" + situac + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {

            var columnas = JSON.parse(resultado.d[0]);
            var filas = JSON.parse(resultado.d[1]);

            for (var i = 0; i < filas.length; i++) {

                if (filas[i].Precio_Equipo == ".00") {
                    filas[i].Precio_Equipo = formatNumber.newo(0, oCultura.Moneda.vcSimMon + " ");
                }
                else {
                    //filas[i].Precio_Equipo = formatNumber.newo(parseInt(filas[i].Precio_Equipo), oCultura.Moneda.vcSimMon + " ");
                    filas[i].Precio_Equipo = formatNumber.newo(parseFloat(filas[i].Precio_Equipo), oCultura.Moneda.vcSimMon + " ");
                }

                filas[i].Precio_Plan = formatNumber.newo(parseFloat(filas[i].Precio_Plan).toFixed(2), oCultura.Moneda.vcSimMon + " ");
                filas[i].Cuota_Mensual_Equipo = formatNumberDecimal.newo(parseFloat(filas[i].Cuota_Mensual_Equipo).toFixed(2), oCultura.Moneda.vcSimMon + " ");
                filas[i].Total_Mensual = formatNumberDecimal.newo(parseFloat(filas[i].Total_Mensual).toFixed(2), oCultura.Moneda.vcSimMon + " ");
            }
            //$(".k-grid-header").css("font-size", "9px");
            $("<div/>").appendTo(e.detailCell).kendoGrid({
                dataSource: {
                    data: filas,
                    pageSize: 10
                },
                scrollable: false,
                sortable: false,
                columns: columnas,
                dataBound: onLoadSubGrillaPedido
            });
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}


function onLoadSubGrillaPedido() {
    var t = $(this.tbody).find("tr");
    for (var i = 0; i < this._data.length; i++) {
        $($(t[i]).find("td")[1]).css("font-weight", "bolder");
        $($(t[i]).find("td")[3]).css("font-weight", "bolder");

        if (estad == 'Cancelado') {
            $($(t[i]).find("td")[1]).text('Cancelado');
            $($(t[i]).find("td")[1]).css("color", "red");
        }
        else if (situac == 'Baja') {
            $($(t[i]).find("td")[1]).text('Enviado');
            $($(t[i]).find("td")[1]).css("color", "green");
        }
        else {
            if (this._data[i].Estado_Adquisición != "Equipo adquirido") {
                if (this._data[i].Estado_Adquisición == "Equipo reservado") {
                    $($(t[i]).find("td")[1]).css("color", "blue");
                }
                else {
                    $(t[i]).css("background", "#F9E4E0");
                    $($(t[i]).find("td")[1]).css("color", "red");
                    $($(t[i]).find("td")[13]).text("");
                }
            }
            else {
                if (this._data[i].Equipo == "Sin Equipo") {
                    $($(t[i]).find("td")[1]).text('Enviado');
                }

                $($(t[i]).find("td")[1]).css("color", "green");

            }
        }
    }
}

function fnActivarConfiguracionCampana() {

    if (!window.parent.CampanaConf.CancelarPedido) {
        $("#btnEliminarPedido").hide();
    }

    if (!window.parent.CampanaConf.ModificarPedido) {
        $("#btnEditarPedido").hide();
    }

    if (!window.parent.CampanaConf.NuevoProducto) {
        $("#btnNuevoPedido").hide();
    }
}

function Refrescar() {
    window.parent.SeCanceloPedido = true;
    window.parent.fnIrPedidos();
}