var vcSit;
var vcUnselect = "0";
var vcSelect = "";
var MargenFiltro = 0;
var MargenHeight = 48;
var idSeguimiento;
var vcTipoDescarga;
var TamanoPagina = [10, 20, 30];
var nuAltoFila = 23.04;
var inAltGrid;
var inFilas;
var IdPedSel = "";
var IdOfiSel = "";
var IdOfiSelCam = "";
var vcOfiSelCam = "";
var IdOfiSelNue = "";
var vcCodigoPedido = "";
var anchoSubGrilla = 900;
function fnMostrarOficina(Id) {
    IdOfiSel = Id;
}

function fnMostrarOficinaCambio(Id) {    
    if(Id != "" && Id != IdOfiSelCam){
        IdOfiSelNue = Id;
        confirmacion("¿Está seguro que desea cambiar la oficina de entrega '" + vcOfiSelCam + "' por '" + $('#bpOficinaCambio_txtValorBusqueda').val() + "' ?", fnActualizarOficina, null, "Cambiar Oficina De Entrega (" + vcCodigoPedido + ")");
    }
}

function fnActualizarOficina(){
    $.ajax({
        type: "POST",
        url: "Cam_PedidosVisor.aspx/ActualizarOficina",
        data: "{'inIdPedido': '" + IdPedSel + "'," +
              "'inIdOficina':'" + IdOfiSelNue + "'}", //TipoOrigen
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d == "") {
                ActualizarGrilla();
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnCancelarActualizacion(){
    bpOficinaCambio_btnBuscar.click();
    $('#bpOficinaCambio_txtValor').val(vcOfiSelCam);
    buscarValor_bpOficinaCambio = vcOfiSelCam;
    $('#bpOficinaCambio_grid').trigger('reloadGrid');
}

function ActualizarGrilla(idCorte) {
    $("#tbPedidos").trigger("reloadGrid");
}

$(function () {
    var Inicio = true;
    $.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());
    inAltGrid = $(window).height() - 210 - MargenFiltro * MargenHeight;

    vcSit = $("#hdfSituacion").val();

    $(".DATE").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy' // See format options on parseDate
    });

    $(".accordion").accordion({
        collapsible: true,
        autoHeight: false,
        autoWidth: false
    });

    //$( "#AccordionJQ1" ).accordion( "option", "active", 0 );

    $('#bpOficinaCambio_txtValorBusqueda').hide();
    $('#bpOficinaCambio_imgBusqueda').hide();

    $("#imgBorrarFechaInicio").click(function () { $("#txtFechaInicio").val(""); });
    $("#imgBorrarFechaFin").click(function () { $("#txtFechaFin").val(""); });

    $('#txtArea,#txtEmpleado,#txtCentroCosto,#txtComentariosCanPed').live("keypress", function (e) {
        if (e.keyCode == 39 || e.char == "\\" || e.keyCode == 92) {
            return false;
        }
    });

    $("#txtEmpleado").focusout(function () {
        $.ajax({
            type: "POST",
            url: "../../Common/WebService/General.asmx/ListarEmpleado",
            data: "{'maxFilas': '" + 200 + "'," +
                "'vcNomEmp': '" + $("#txtEmpleado").val().replace(/'/g, "&#39") + "'," +
                "'incodGrup': '-1'," +
                "'idCliente': '" + window.parent.parent.parent.idCliente + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if ($(result.d).length == 1) {
                    $("#hdfCodEmpleado").val(result.d[0].P_vcCod);
                    Selecciono = true;
                }
                else {
                    $("#hdfCodEmpleado").val("");
                    Selecciono = false;
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });
    $("#txtEmpleado").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "../../Common/WebService/General.asmx/ListarEmpleado",
                data: "{'maxFilas': '" + 200 + "'," +
                    "'vcNomEmp': '" + $("#txtEmpleado").val().replace(/'/g, "&#39") + "'," +
                    "'incodGrup': '-1'," +
                    "'idCliente': '" + window.parent.parent.parent.idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: item.vcNom,
                            vcCodEmp: item.P_vcCod,
                            category: item.Grupo.vcNom,
                            inCodGru: item.Grupo.P_inCod
                        };
                    }));
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        focus: function (event, ui) {
            $("#txtEmpleado").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            Selecciono = true;
            $("#txtEmpleado").val(ui.item.label);
            $("#hdfCodEmpleado").val(ui.item.vcCodEmp);
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono) {
                $("#hdfCodEmpleado").val("");
            }
            return false;
        },
        open: function (event, ui) {
            Selecciono = false;
            return false;
        }
    })
    .data("autocomplete")._renderItem = function (ul, item) {
        return $("<li></li>")
			.data("item.autocomplete", item)
			.append("<a>" + item.vcCodEmp + "=" + item.label + "</a>")
			.appendTo(ul);
    };

    $("#txtArea").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "../../Common/WebService/General.asmx/ListarAreas",
                data: "{'maxFilas': '" + 100 + "'," +
                    "'vcNomAre': '" + $("#txtArea").val() + "'," + "'idCliente': '" + window.parent.parent.parent.idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: item.Nombre,
                            inCodAre: item.Codigo,
                            inCodInt: item.CodInt //agregado 22-08-2013
                        };
                    }));
                },
                cache: false,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alerta(errorThrown);
                }
            });
        },
        focus: function (event, ui) {
            $("#txtArea").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            Selecciono = true;
            $("#txtArea").val(ui.item.label);
            $("#hdfCodAreaBusqueda").val(ui.item.inCodAre);
            $("#hdfCodIntArea").val(ui.item.inCodInt); //agregado 22-08-2013
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono)
                $("#hdfCodAreaBusqueda").val("");
            return false;
        },
        open: function (event, ui) {
            Selecciono = false;
            return false;
        }
    })
    .data("autocomplete")._renderItem = function (ul, item) {
        return $("<li></li>")
			.data("item.autocomplete", item)
        //.append("<a>" + item.VCNOMORG + "<br>" + item.label + "</a>")
			.append("<a>" + item.label + "</a>")
			.appendTo(ul);
    };

    $("#txtCentroCosto").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "../../Common/WebService/General.asmx/ListarCCOCombo",
                data: "{'maxFilas': '" + 100 + "'," +
                    "'vcNomCCO': '" + $("#txtCentroCosto").val() + "'," + "'idCliente': '" + window.parent.parent.parent.idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: item.vcNomCco,
                            inCodCCO: item.vcCodCco
                        };
                    }));
                },
                cache: false,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alerta(errorThrown);
                }
            });
        },
        focus: function (event, ui) {
            $("#txtCentroCosto").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            Selecciono = true;
            $("#txtCentroCosto").val(ui.item.label);
            $("#hdfCCOBusqueda").val(ui.item.inCodCCO);
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono)
                $("#hdfCCOBusqueda").val("");
            return false;
        },
        open: function (event, ui) {
            Selecciono = false;
            return false;
        }
    })
    .data("autocomplete")._renderItem = function (ul, item) {
        return $("<li></li>")
			.data("item.autocomplete", item)
        //.append("<a>" + item.VCNOMORG + "<br>" + item.label + "</a>")
			.append("<a>" + item.label + "</a>")
			.appendTo(ul);
    };

    function CerroMensaje() { }

    function fncConfirmacionCancelar() {
        $("#txtComentariosCanPed").val("");

        $('#dvCancelarPedido').dialog({
            title: "Cancelar Pedidos",
            modal: true,
            width: 500,
            buttons: {
                "Aceptar": function () {
                    var vcComentarios = $.trim($("#txtComentariosCanPed").val());

                    if (vcComentarios == "") {
                        alerta("Debe ingresar algún comentario");
                        return;
                    }

                    $.ajax({
                        type: "POST",
                        url: "Cam_PedidosVisor.aspx/QuitarPedidos",
                        data: "{'vcIdPedidos': '" + vcIdPedidos + "'," +
                              "'vcComentarios': '" + vcComentarios + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (msg) {
                            $("#tbPedidos").trigger("reloadGrid");
                            if (msg.d == "") {
                                Mensaje("<br/><h1>Se cancelaron los pedidos seleccionados.</h1><br/>", document, CerroMensaje);
                            }
                            else {
                                alerta("Solo se pueden cancelar pedidos que estén en el estado enviado, los siguientes pedidos no fueron cancelados: " + msg.d);
                            }
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        }
                    });

                    $(this).dialog("close");
                },
                "Cancelar": function () {
                    $(this).dialog("close");
                }
            }
        });
    }
    $("#btnCancelar").click(function () {
        var ids = $("#tbPedidos").jqGrid('getGridParam', 'selarrrow');
        vcIdPedidos = "";
        if (ids.length == 0) {
            alerta("Seleccione un registro");
            return;
        }
        var i = 0;
        for (i = 0; i < ids.length; i++) {
            if (vcIdPedidos != "")
                vcIdPedidos += ",";
            vcIdPedidos += ids[i];
        }

        confirmacion("¿Está seguro que desea cancelar los pedidos seleccionados?", fncConfirmacionCancelar, null, "Cancelar Pedido");
    });

    $("#btnDeshacer").click(function () {
        var ids = $("#tbPedidos").jqGrid('getGridParam', 'selarrrow');
        vcIdPedidosDesh = "";
        vcIdPedidosNoDesh = "";
        if (ids.length == 0) {
            alerta("Seleccione un registro");
            return;
        }
        var i = 0;
        for (i = 0; i < ids.length; i++) {
            var datosPed = $("#tbPedidos").jqGrid('getRowData', ids[i]);
            var regEst = datosPed.IdEstado;
            if (regEst == 31 || regEst == 30) {
                if (vcIdPedidosDesh != "")
                    vcIdPedidosDesh += ",";
                vcIdPedidosDesh += ids[i];
            } else {
                if (vcIdPedidosNoDesh != "")
                    vcIdPedidosNoDesh += ",";
                vcIdPedidosNoDesh += ids[i];
            }
        }
        if (vcIdPedidosDesh == '') {
            //alerta("Los pedidos seleccionados no tienen ningún detalle despachado, no se ha deshecho ningún despacho.");
            alerta('Solo se pueden deshacer despachos de pedidos que esten en el estado "Despachado" o "Despacho Parcial", los despachos de los siguiente pedidos no fueron deshechos: ' + vcIdPedidosNoDesh + '.');
            return;
        }

        if (vcIdPedidosDesh != '') {
            $("#dvMsgConfirmaciónDeshacerDespacho").dialog({
                title: "Deshacer Despachos",
                modal: true,
                width: 300,
                resizable: false,
                buttons: {
                    "SI": function () {
                        $("#txtComentarios").val('');
                        $(this).dialog("close");
                        $('#dvDeshacerDespacho').dialog({
                            title: "Deshacer despacho",
                            modal: true,
                            width: 500,
                            buttons: {
                                "Deshacer despachos de pedidos seleccionados": function () {
                                    var vcComentario = $.trim($("#txtComentarios").val().replace(/'/g, "&#39").replace(/\\/g, "&#92"));
                                    if (vcComentario == '') {
                                        alerta("Debe ingresar algún comentario.");
                                        return;
                                    }
                                    $.ajax({
                                        type: "post",
                                        url: "Cam_PedidosVisor.aspx/DeshacerDespacho",
                                        data: "{'IdPedido':'" + vcIdPedidosDesh + "'," +
                                            "'IdDetallePedido': '0'," +
                                            "'vcComentario': '" + vcComentario + "'," +
                                            "'IdCampana': '" + $("#ddlCampana").val() + "'}",
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "json",
                                        success: function (result) {
                                            if (result != '0') {
                                                alerta("Despachos de pedidos deshechos.");
                                                $("#txtComentarios").val('');
                                            }
                                            $("#tbPedidos").trigger("reloadGrid");
                                            if (vcIdPedidosNoDesh != '') {
                                                alerta('Solo se pueden deshacer despachos de pedidos que esten en el estado "Despachado" o "Despacho Parcial", los despachos de los siguiente pedidos no fueron deshechos: ' + vcIdPedidosNoDesh + '.');
                                            }
                                        },
                                        error: function (xhr, err, thrErr) {
                                            MostrarErrorAjax(xhr, err, thrErr);
                                        }
                                    });
                                    $(this).dialog("close");
                                },
                                "Cancelar": function () {
                                    $(this).dialog("close");
                                    $("#txtComentarios").val('');
                                }
                            }
                        });
                    },
                    "NO": function () {
                        $(this).dialog("close");
                        $("#txtComentarios").val('');
                    }
                }
            });
        }
    });

    function GenerarBotones(id, inEstado) {
        var vcBotones = '<img id="btnSeg' + id + '" src="../../Common/Images/Mantenimiento/Todo.png" alt="Ver Segumiento de Pedido" class="imgBtn SegImg" title="Ver Seguimiento de Pedido"/>';

        if (inEstado != "29" && inEstado != "31")
            vcBotones = vcBotones + '   <img id="btnOfi' + id + '" src="../../Common/Images/Mantenimiento/Oficina_16x16png.png" alt="Cambiar oficina de entrega" class="imgBtn OfiEnt" title="Cambiar oficina de entrega"/>';
        else
            vcBotones = vcBotones + '        ';

        return vcBotones;
    }

    $(".SegImg").live("click", function () {
        var id = $(this).attr("id").substr(6);
        var datos = $("#tbPedidos").jqGrid('getRowData', id);

        $('#ifSeg').attr("src", "Cam_PedidosSeguimiento.aspx?IdPed=" + id);
        formulario = $('#dvSeg').dialog({
            title: "Seguimiento De Pedido (" + datos.CodigoPedido + ")",
            height: 500,
            width: 730,
            modal: true,
            resizable: false,
        });
    });

    $(".OfiEnt").live("click", function () {
        var id = $(this).attr("id").substr(6);
        var datos = $("#tbPedidos").jqGrid('getRowData', id);

        IdPedSel = id;
        IdOfiSelCam = datos.IdOficina;
        vcOfiSelCam = datos.vcOficina;
        vcCodigoPedido = datos.CodigoPedido;
        fnCancelarActualizacion();
    });

    function GenerarBotonesDetalles(id, estado, options) {
        //alert(options.gid);
        var resultAcciones = '<img id="btnSegDet' + id + '" src="../../Common/Images/Mantenimiento/Todo.png" alt="Ver Seguimiento de Detalle" class="imgBtn SegDetImg" title="Ver Seguimiento de Detalle"/>';
        //return '<b>'+estado+'</b><img id="btnSegDet' + id + '" src="../../Common/Images/Mantenimiento/Todo.png" alt="Ver Seguimiento de Detalle" class="imgBtn SegDetImg" title="Ver Seguimiento de Detalle"/>';
        if (estado == 31) {
            resultAcciones = resultAcciones + '  <img id="btnCancelar' + id + '" src="../../Common/Images/Mantenimiento/Regresar.png" alt="Ver Seguimiento de Detalle" class="imgBtn CanImg" title="Deshacer Despacho" gridP="' + options.gid + '"/>';
        } else {
            resultAcciones = resultAcciones + '       ';
        }
        return resultAcciones;
    }
    $(".SegDetImg").live("click", function () {
        var id = $(this).attr("id").substr(9);
        $('#ifSegDet').attr("src", "Cam_PedidosSeguimientoDetalle.aspx?IdPed=" + id);
        formulario = $('#dvSegDet').dialog({
            title: "Seguimiento de Detalle de Pedido",
            height: 280,
            width: 700,
            modal: true
        });
    });

    $(".CanImg").live("click", function () {
        var id = $(this).attr("id").substr(11);
        var gridP = $(this).attr("gridP");
        $("#dvMsgConfirmaciónDeshacerDespachoDetalle").dialog({
            title: "Deshacer despacho",
            modal: true,
            width: 300,
            resizable: false,
            buttons: {
                "SI": function () {
                    $(this).dialog("close");
                    $('#dvDeshacerDespacho').dialog({
                        title: "Deshacer despacho",
                        modal: true,
                        width: 500,
                        buttons: {
                            "Deshacer Despacho": function () {
                                var vcComentarioDetalle = $.trim($("#txtComentarios").val().replace(/'/g, "&#39").replace(/\\/g, "&#92"));
                                if (vcComentarioDetalle == '') {
                                    alerta("Debe ingresar algún comentario.");
                                    return;
                                }
                                $.ajax({
                                    type: "post",
                                    url: "Cam_PedidosVisor.aspx/DeshacerDespacho",
                                    data: "{'IdPedido':''," +
                                            "'IdDetallePedido': '" + id + "'," +
                                            "'vcComentario': '" + vcComentarioDetalle + "'," +
                                            "'IdCampana': '" + $("#ddlCampana").val() + "'}",
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    success: function (result) {
                                        if (result != '0') {
                                            alerta("Despacho deshecho.");
                                            $("#txtComentarios").val('');
                                        }
                                        $("#" + gridP).trigger("reloadGrid");
                                        $("#tbPedidos").trigger("reloadGrid");
                                    },
                                    error: function (xhr, err, thrErr) {
                                        MostrarErrorAjax(xhr, err, thrErr);
                                    }
                                });
                                $(this).dialog("close");
                            },
                            "Cancelar": function () {
                                $(this).dialog("close");
                                $("#txtComentarios").val('');
                            }
                        }
                    });
                },
                "NO": function () {
                    $(this).dialog("close");
                    $("#txtComentarios").val('');
                }
            }
        });
    });

    $("#ddlCuenta").dropdownchecklist({ forceMultiple: true, icon: {}, width: 233, maxDropHeight: 83, firstItemChecksAll: true }); //firstItemChecksAll: true
    $("#ddlEstado").dropdownchecklist({ forceMultiple: true, icon: {}, width: 233, maxDropHeight: 83, firstItemChecksAll: true });

    function NumeroInicialFilas() {
        inFilas = Math.floor(inAltGrid / nuAltoFila);
    }

    CargarGrillaDetalle();

    function CargarGrillaDetalle() {
        TamanoPagina = [10, 20, 30];
        $("#tbPedidos").jqGrid({
            datatype: function () {
                if (Inicio == true) {
                    Inicio = false;
                    return;
                }
                if ($("#ddlCampana").val() == null) {
                    alerta("No hay ninguna campaña creada para el operador seleccionado");
                    $("#ddlCampana").focus();
                    return;
                }
                if ($("#ddlCampana").val() == "-1") {
                    alerta("Debe seleccionar una campaña");
                    $("#ddlCampana").focus();
                    return;
                }

                if ($("#txtFechaInicio").val() != "" && $("#txtFechaFin").val() != "") {
                    var fechaFormato = $(".DATE").datepicker("option", "dateFormat");
                    var fechaIni = $("#txtFechaInicio").val();
                    var fechaFin = $("#txtFechaFin").val();

                    if (!ValidarFechaFormatoIguales(fechaIni, fechaFin, fechaFormato)) {
                        alerta("En el Periodo la fecha inicial no puede ser mayor a la fecha final");
                        $("#txtFechaInicio").focus();
                        return;
                    }
                }

                $.ajax({
                    type: "post",
                    url: "Cam_PedidosVisor.aspx/Listarpedidos",
                    data: "{'inPagTam':'" + $('#tbPedidos').getGridParam("rowNum") + "'," +
                          "'inPagAct':'" + parseInt($('#tbPedidos').getGridParam("page")) + "'," +
                          "'vcOrdCol':'" + $('#tbPedidos').getGridParam("sortname") + "'," +
                          "'vcTipOrdCol':'" + $('#tbPedidos').getGridParam("sortorder") + "'," +
                          "'inIdCampana': '" + $("#ddlCampana").val() + "'," +
                          "'vcNomSit': '" + $("#ddlSituacion").val() + "'," +
                          "'vcFecIni': '" + $("#txtFechaInicio").val() + "'," +
                          "'vcFecFin': '" + $("#txtFechaFin").val() + "'," +
                          "'vcCodEmp': '" + $("#hdfCodEmpleado").val() + "'," +
                          "'vcCodAre': '" + $("#hdfCodAreaBusqueda").val() + "'," +
                          "'vcCodCCO': '" + $("#hdfCCOBusqueda").val() + "'," +
                          "'vcCodCue': '" + $("#ddlCuenta").val() + "'," +
                          "'vcIdEst': '" + $("#ddlEstado").val() + "'," +
                          "'inIdOfiSel': '" + IdOfiSel + "'," +
                          "'codigoPedido': '" + $("#txtCodPedido").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        $("#tbPedidos")[0].addJSONData(result.d);
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            }, //"local",
            jsonReader: //Set the jsonReader to the JQGridJSonResponse squema to bind the data.
                {
                root: "Items",
                page: "PaginaActual",
                total: "TotalPaginas",
                records: "TotalRegistros",
                repeatitems: true,
                cell: "Row",
                id: "IdPedido"
            },
            colModel: [
                { name: 'IdCampana', index: 'IdCampana', label: 'IdCampana', hidden: true, width: 50 },
                { name: 'IdPedido', index: 'IdPedido', label: 'IdPedido', hidden: true, key: true },
   		        { name: 'IdEmpleado', index: 'IdEmpleado', label: 'IdEmpleado', hidden: true, width: 50 },
                { name: 'CodigoPedido', index: 'CodigoPedido', label: 'Código', hidden: false, width: 100, align: 'center' },
                { name: 'Situacion', index: 'Situacion', label: 'Situación', hidden: false, width: 75, align: 'center' },
                { name: 'vcCodEmp', index: 'vcCodEmp', label: 'Código Empleado', hidden: false, width: 85, align: 'center' },
                { name: 'vcNomEmp', index: 'vcNomEmp', label: 'Empleado', hidden: false, width: 210 },
                { name: 'vcNomOrg', index: 'vcNomOrg', label: 'Área', hidden: false, width: 215 },
                { name: 'vcNomCCO', index: 'vcNomCCO', label: 'Centro de Costo', hidden: false, width: 210 },
                { name: 'vcOficina', index: 'vcOficina', label: 'Oficina', hidden: false, width: 150 },
                { name: 'NumeroItems', index: 'NumeroItems', label: 'N° de ítems', hidden: false, width: 35, align: 'center' },
                { name: 'FechaPedido', index: 'FechaPedido', label: 'Fecha', hidden: false, width: 110, align: 'center' },
                { name: 'vcNomEst', index: 'vcNomEst', label: 'Estado', hidden: false, width: 90, align: 'center' },
                { name: 'MontoTotalNoServicios', index: 'MontoTotalNoServicios', label: 'Costo Equipo', hidden: false, width: 70, align: 'right' },
                { name: 'MontoTotalServicios', index: 'MontoTotalServicios', label: 'Costo Plan', hidden: false, width: 70, align: 'right' },
                { name: 'IdEstado', index: 'IdEstado', label: 'IdEstado', hidden: true, width: 100, align: 'center' },
                { name: 'IdOficina', index: 'IdOficina', label: 'IdOficina', hidden: true, width: 100 },
                { name: 'opAccion', index: 'opAccion', label: 'Acciones', hidden: false, width: 60, align: 'center',
                    formatter: function (value, options, rData) { return GenerarBotones(options.rowId, rData[13]); }
                }
   	            ],
            //width: "3000",
            viewrecords: true,
            pager: "#pager", //Pager.
            loadtext: 'Cargando datos...',
            recordtext: "{0} - {1} de {2} elementos",
            emptyrecords: 'No hay resultados',
            pgtext: 'Pág: {0} de {1}', //Paging input control text format.
            rowNum: inFilas, //$("#hdfTamPag").val(), //"10" PageSize.
            rowList: TamanoPagina,  //TamanosPaginaSel, //Variable PageSize DropDownList. 
            sortname: "CodigoPedido", //sortname: idTabla, //Default SortColumn
            sortorder: "desc",
            rownumbers: true,
            multiselect: true,
            shrinkToFit: false,
            beforeSelectRow: function (rowId, e) {
                return $(e.target).is("input:checkbox");
            },
            onSelectRow: function (rowid, status) {
                //$("#tbPedidos").jqGrid('getRowData', rowid);
            },
            onSelectAll: function (ids_Grid, status) {
            },
            gridComplete: function () {
            },
            subGrid: true,
            subGridOptions: {
                "reloadOnExpand": false,
                "selectOnExpand": false
            },
            subGridRowExpanded: function (subgrid_id, row_id) {
                //$(".ui-subgrid").css( {"height":"100px"});
                //var inHeight = "0";

                var subgrid_table_id, pager_id;
                subgrid_table_id = subgrid_id + "_t";
                pager_id = "p_" + subgrid_table_id;
                //alert("idsubtabla: " + subgrid_table_id);
                $("#" + subgrid_id).html("<table id='" + subgrid_table_id + "' class='scroll'></table><div id='" + pager_id + "' class='scroll'></div>");
                $("#" + subgrid_table_id).jqGrid({
                    datatype: function () {
                        $.ajax({
                            url: "Cam_PedidosVisor.aspx/ListarPedidoDetalles", //PageMethod
                            data: "{'inIdPedido': '" + row_id + "'," +
                        "'vcNomSit': '" + vcSit + "'}",
                            dataType: "json",
                            type: "post",
                            contentType: "application/json; charset=utf-8",
                            success: function (result) {
                                $("#" + subgrid_table_id).jqGrid('clearGridData');
                                var i = 0;
                                for (i = 0; i < $(result.d).length; i++) {
                                    $("#" + subgrid_table_id).jqGrid('addRowData', i, result.d[i]);
                                }

                                if ($.browser.chrome) {
                                    $('#gbox_' + subgrid_table_id).css("width", anchoSubGrilla + "px"); //ui-jqgrid-bdiv //795px //830px
                                    $('div.ui-jqgrid-bdiv', 'div#gview_' + subgrid_table_id).each(function (i) {
                                        $(this).css({ "width": anchoSubGrilla + "px" });
                                    });
                                    $('div.ui-jqgrid-hdiv', 'div#gview_' + subgrid_table_id).each(function (i) {
                                        $(this).css({ "width": anchoSubGrilla + "px" });
                                    });
                                }
                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });
                    },
                    colModel: [{ name: 'IdDetallePedido', index: 'IdDetallePedido', label: 'IdDetallePedido', width: '40', align: 'center', sortable: false, resizable: false, hidden: true, key: true },
   		                { name: 'IdPedido', index: 'IdPedido', label: 'IdPedido', width: '70', align: 'left', sortable: false, resizable: false, hidden: true },
   		                { name: 'NomMod', index: 'NomMod', label: 'Equipo', width: '150', align: 'left', sortable: false, resizable: false },
                        { name: 'DespachoIMEI', index: 'DespachoIMEI', label: 'IMEI', width: '90', align: 'left', sortable: false, resizable: false },
                        { name: 'DespachoLinea', index: 'DespachoLinea', label: 'Linea', width: '55', align: 'left', sortable: false, resizable: false },
                        { name: 'NomPlan', index: 'NomPlan', label: 'Plan', width: '170', align: 'left', sortable: false, resizable: false },
   		                { name: 'vcNomCue', index: 'vcNomCue', label: 'Cuenta', width: '100', align: 'left', sortable: false, resizable: false },
   		                { name: 'MontoTotalNoServicios', index: 'MontoTotalNoServicios', label: 'Monto (No Servicios)', width: '60', align: 'right', sortable: false, resizable: false },
   		                { name: 'MontoTotalServicios', index: 'MontoTotalServicios', label: 'Monto (Servicios)', width: '60', align: 'right', sortable: false, resizable: false },
   		                { name: 'vcCodCue', index: 'vcCodCue', label: 'vcCodCue', width: '40', align: 'right', sortable: false, resizable: false, hidden: true },
                        { name: 'MesesContrato', index: 'MesesContrato', label: 'Meses de Contrato', width: '60', align: 'right', sortable: false, resizable: false },
                        { name: 'IdEstado', index: 'IdEstado', label: 'IdEstado', width: '70', align: 'center', sortable: false, resizable: false, hidden: true },
                        { name: 'NombreEstado', index: 'NombreEstado', label: 'Estado', width: '70', align: 'center', sortable: false, resizable: false },
                        { name: 'Corte', index: 'Corte', label: 'Corte', width: '50', align: 'center', sortable: false, resizable: false },
                        { name: 'opAccion', index: 'opAccion', label: 'Acciones', hidden: false, width: 60, align: 'center',
                            formatter: function (value, options, rData) { return GenerarBotonesDetalles(rData.IdDetallePedido, rData.IdEstado, options); }
                        }
   	                    ],
                    sortorder: "asc",
                    width: "1000", //"760","790"
                    height: "auto",
                    beforeSelectRow: function (rowId, e) {
                        return false;
                    }
                });
            },
            subGridRowColapsed: function (subgrid_id, row_id) {
            },
            ondblClickRow: function (id) {
                AbrirRegistro(id);
            }
            , gridComplete: function () {
                var grid = $("#tbPedidos").getDataIDs();
                if (grid.length == 0) {
//                    $("#tbPedidos").jqGrid('setColProp', 'Empleado', { width: 50 });
//                    $("#tbPedidos").jqGrid('setColProp', 'vcNomOrg', { width: 50 });
//                    $("#tbPedidos").jqGrid('setColProp', 'vcNomCCO', { width: 80 });
//                    $("#tbPedidos").jqGrid('setColProp', 'vcOficina', { width: 50 });
                    var myGrid = $("#tbPedidos"),
    width = myGrid.jqGrid('getGridParam', 'width'); // get current width
                    myGrid.jqGrid('setGridWidth', width, true);
                }
            }
        }).navGrid("#pager", { edit: false, add: false, search: false, del: false });

        function AbrirRegistro(id) {
            $("#tbPedidos").toggleSubGridRow(id);
        }

        $("#btnBuscar").live("click", function () {
            $("#tbPedidos").trigger("reloadGrid");
            $("#AccordionJQ1").accordion("option", "active", 1);
        });
    }

    $(window).resize(function () {
        DimPosElementos();
    });

    inicioPagina();
    function inicioPagina() {
        DimPosElementos();
        NumeroInicialFilas();
    }

    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        var subgrid_table_id;

        var AnchoLateral = $(".LateralSplitter");
        $(".tabs").css({ height: Alto - 23, width: Ancho - AnchoLateral, marginbotton: 0, paddingbotton: 0 });

        //inAltGrid = $(window).height() - 210 - MargenFiltro * MargenHeight;
        $("#tbPedidos").setGridWidth($(window).width() - 72);
        $("#tbPedidos").setGridHeight(inAltGrid - 5);

        anchoSubGrilla = $(window).width() - 257;

        $('div.ui-jqgrid-bdiv', 'div#gview_' + subgrid_table_id).each(function (i) {
            $(this).css({ "width": anchoSubGrilla + "px" });
        });
        $('div.ui-jqgrid-hdiv', 'div#gview_' + subgrid_table_id).each(function (i) {
            $(this).css({ "width": anchoSubGrilla + "px" });
        });
    }

    $("#btnExcel").live("click", function () {
        var vcParametros = "?inIdCam=" + $("#ddlCampana").val() + "&vcNomSit=" + $("#ddlSituacion").val() + "&vcFecIni=" + $("#txtFechaInicio").val() +
                       "&vcFecFin=" + $("#txtFechaFin").val() + "&vcCodEmp=" + $("#hdfCodEmpleado").val() + "&vcCodAre=" + $("#hdfCodAreaBusqueda").val() +
                       "&vcCodCCO=" + $("#hdfCCOBusqueda").val() + "&vcCodCue=" + $("#ddlCuenta").val() + "&vcIdEst=" + $("#ddlEstado").val() +
                       "&vcOpc=Excel&vcCodPed=" + $("#txtCodPedido").val();
        //if ($("#tbPedidos").getGridParam("reccount") > 0){
        $('#ifExcel').attr("src", "Cam_PedidosTipoDescarga.aspx" + vcParametros);
        formulario = $('#dvExcel').dialog({
            title: "Tipo de Vista",
            height: 170,
            width: 380,
            modal: true
        });
    });

    $("#btnImprimir").live("click", function () {
        var vcParametros = "?inIdCam=" + $("#ddlCampana").val() + "&vcNomSit=" + $("#ddlSituacion").val() + "&vcFecIni=" + $("#txtFechaInicio").val() +
                       "&vcFecFin=" + $("#txtFechaFin").val() + "&vcCodEmp=" + $("#hdfCodEmpleado").val() + "&vcCodAre=" + $("#hdfCodAreaBusqueda").val() +
                       "&vcCodCCO=" + $("#hdfCCOBusqueda").val() + "&vcCodCue=" + $("#ddlCuenta").val() + "&vcIdEst=" + $("#ddlEstado").val() +
                       "&vcOpc=VistaPreliminar&vcCodPed=" + $("#txtCodPedido").val();

        $('#ifExcel').attr("src", "Cam_PedidosTipoDescarga.aspx" + vcParametros);
        formulario = $('#dvExcel').dialog({
            title: "Tipo de Vista",
            height: 170,
            width: 380,
            modal: true
        });
    });

    $("#ddlOperador").change(function () {
        MostrarCampanas();
    });

    function MostrarCampanas() {
        if ($("#ddlOperador").val() == "-1") {
            $("#ddlCampana").html("");
            $("#ddlCampana").append($("<option></option>").attr("value", "-1").text("<Seleccionar Operador>"));
        }
        else {
            $("#ddlCampana").html("");

            var Metodo = "Cam_PedidosVisor.aspx/ListarCampanaPorOperador";
            var Data = {
                IdOperador: $("#ddlOperador").val() //Serializa JSON MODELO
            };
            MetodoWeb(Metodo, JSON.stringify(Data), SatisfactoriaListarCampana, ErrorListarCampana);
        }
    }

    function ErrorListarCampana() {
        alerta("Hubo un problema al listar las campañas, vuelva a intentarlo");
    }

    function SatisfactoriaListarCampana(lstCampana) {
        if ($(lstCampana).length == 0) {
            $("#ddlCampana").append($("<option></option>").attr("value", "-1").text("<No hay campañas>"));
        }
        else {
            for (i in lstCampana) {
                $("#ddlCampana").append($("<option></option>").attr("value", lstCampana[i].IdCampana).text(lstCampana[i].Descripcion));
            }
        }
    }

    MostrarCampanas();

    var myGrid = $("#tbPedidos"),
    width = myGrid.jqGrid('getGridParam', 'width');
    myGrid.jqGrid('setGridWidth', width, true);
});

//function fncConfirmacion(){
//
//}

function AbreVistaPreliminar(vcParametros, vcSeg) {
    var $width = 930;
    var $height = 550;
    var $Pagina = 'Cam_PedidosVistaPreliminar.aspx' + vcParametros;

    if (vcSeg == "Vista Detallada"){
        $.ajax({
            type: "POST",
            url:  "Cam_PedidosVisor.aspx/ObtenerCantidadPedidos",
            data: "{'inPagTam':'" + "1" + "'," +
                    "'inPagAct':'" + "1" + "'," +
                    "'vcOrdCol':'" + $('#tbPedidos').getGridParam("sortname") + "'," +
                    "'vcTipOrdCol':'" + $('#tbPedidos').getGridParam("sortorder") + "'," +
                    "'inIdCampana': '" + $("#ddlCampana").val() + "'," +
                    "'vcNomSit': '" + $("#ddlSituacion").val() + "'," +
                    "'vcFecIni': '" + $("#txtFechaInicio").val() + "'," +
                    "'vcFecFin': '" + $("#txtFechaFin").val() + "'," +
                    "'vcCodEmp': '" + $("#hdfCodEmpleado").val() + "'," +
                    "'vcCodAre': '" + $("#hdfCodAreaBusqueda").val() + "'," +
                    "'vcCodCCO': '" + $("#hdfCCOBusqueda").val() + "'," +
                    "'vcCodCue': '" + $("#ddlCuenta").val() + "'," +
                    "'vcIdEst': '" + $("#ddlEstado").val() + "'," +
                    "'inIdOfiSel': '" + IdOfiSel + "'," +
                    "'codigoPedido': '" + $("#txtCodPedido").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if(result.d > 500){
                    
//                    confirmacion("La generación de este reporte puede tardar varios minutos. ¿Desea continuar?", fncConfirmacion, null, "Generación de Reporte");

                    $('#divConfirmacion').dialog({
                        title: "Generación de Reporte",
                        modal: true,
                        buttons: {
                            "Si": function () {
                                $(this).dialog("close");

                                $("#ifVisPre").attr("src", $Pagina);
                                formulario = $('#dvVisPre').dialog({
                                    title: "Vista Preliminar",
                                    width: $width,
                                    height: $height,
                                    modal: true,
                                    resizable: false
                                });
                            },
                            "No": function () {
                                $(this).dialog("close");
                            }
                        }
                    });

                }else{
                    $("#ifVisPre").attr("src", $Pagina);
                    formulario = $('#dvVisPre').dialog({
                        title: "Vista Preliminar",
                        width: $width,
                        height: $height,
                        modal: true,
                        resizable: false
                    });
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }else{
        $("#ifVisPre").attr("src", $Pagina);
        formulario = $('#dvVisPre').dialog({
            title: "Vista Preliminar",
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
    } 
}