
$(function () {
    var tbSolicitud = $("#tbSolicitud").jqGrid({
        datatype: "local",
        colModel: [{ name: 'inCodSolDet', index: 'inCodSolDet', label: 'Código Solicitud Detalle', hidden: true, sortable: false },
   		                       { name: 'inCodSol', index: 'inCodSol', label: 'Código Solicitud', hidden: true, sortable: false },
   		                       { name: 'dtFecRes', index: 'dtFecRes', label: 'Fecha de respuesta', sortable: false, width: 100 },
   		                       { name: 'vcCodDisEnt', index: 'vcCodDisEnt', label: 'Código de Dispositivo Entregado', sortable: false },
   		                       { name: 'vcNomModDisEnt', index: 'vcNomModDisEnt', label: 'Dispositivo Entregado', sortable: false },
   		                       { name: 'dtFecRec', index: 'dtFecRec', label: 'Fecha en la que se recibio', sortable: false, width: 100 },
   		                       { name: 'dtFecEnt', index: 'dtFecEnt', label: 'Fecha de entrega', sortable: false, width: 100 },
   		                       { name: 'vcObs', index: 'vcObs', label: 'Observación', sortable: false },
   		                       { name: 'F_vcNumLin', index: 'F_vcNumLin', label: 'Número', sortable: false },
   		                       { name: 'vcCodEmp', index: 'vcCodEmp', label: 'Código de Empleado', hidden: true, sortable: false },
   		                       { name: 'vcNomEmp', index: 'vcNomEmp', label: 'Empleado', sortable: false },
   		                       { name: 'inCodModDisSol', index: 'inCodModDisSol', label: 'Código de Modelo de Dispositivo Solicitado', hidden: true, sortable: false },
   		                       { name: 'vcNomModDisSol', index: 'vcNomModDisSol', label: 'Modelo de Dispositivo Solicitado', sortable: false },
   		                       { name: 'dtFecSol', index: 'dtFecSol', label: 'Fecha de Solicitud', sortable: false },
   		                       { name: 'btPen', index: 'btPen', label: 'Pendiente', hidden: true, sortable: false },
   		                       { name: 'inTipSol', index: 'inTipSol', label: 'Código tipo de solicitud', hidden: true, sortable: false },
   		                       { name: 'vcNomTipSol', index: 'vcNomTipSol', label: 'Tipo de Solicitud', sortable: false },
   		                       { name: 'vcCodDisSol', index: 'vcCodDisSol', label: 'Código de Dispositivo Solicitado', sortable: false },
   		                       { name: 'vcDesSol', index: 'vcDesSol', label: 'Descripción de solicitud', sortable: false }
   	                          ],
        sortname: "inCodSolDet", //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: "1000",
        height: "200",
        shrinkToFit: false,
        rownumbers: true,
        multiselect: true,
        caption: "Solicitudes"//,
        //ondblClickRow: function (id) { ProcesarSolicitud(); }
    });

    $(".btnNormal").button({});
    function CargarSolicitudes(codigo) {
        if (codigo != "") {
            $.ajax({
                type: "POST",
                url: "Adm_SolicitudDespacho.aspx/ListarSolicitudDespacho",
                data: "{'vcCodEmp': '" + codigo + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    $("#tbSolicitud").jqGrid('clearGridData');
                    if ($(result.d).length > 0) {
                        var i = 0;
                        for (i = 0; i < $(result.d).length; i++) {
                            //agregado 19-09-2013 wapumayta  --  filtro de solicitudes de Ampliacion y Activacion
                            //if (result.d[i].inTipSol != '6' && result.d[i].inTipSol != '7') {
                            $("#tbSolicitud").jqGrid('addRowData', result.d[i].inCodSolDet, result.d[i]);
                            //};
                        }
                        //$("#gbox_tbSolicitud").show();
                        $("#dvDespachos").show("slide", {}, 500, null);
                    }
                    else {
                        //$("#gbox_tbSolicitud").hide();
                        $("#dvDespachos").hide();
                        alerta("El empleado seleccionado no tiene solicitudes pendientes de despacho");
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
        else {
            $("#dvDespachos").hide();
            $("#tbSolicitud").jqGrid('clearGridData');
        }
    }

    function SeleccionarDispositivo(CodigoDispositivo) {
        var datos = $("#tbSolicitud").jqGrid('getRowData');
        var Encontrado = false;

        for (i in datos) {
            if (datos[i].vcCodDisEnt == CodigoDispositivo) {
                Encontrado = true;
                $("#tbSolicitud").setSelection(datos[i].inCodSolDet, false);
            }
        }
        if (!Encontrado) {
            alerta("No se tiene ninguna solicitud atendida con el codigo de dispositivo " + $('#txtCodigoDispositivo').val());
            $('#txtCodigoDispositivo').val("");
            $('#txtCodigoDispositivo').focus();
        }
    }

    $('#txtCodigoDispositivo').live("keypress", function (e) {
        if (e.keyCode == 13) {
            SeleccionarDispositivo($('#txtCodigoDispositivo').val());
            return false; // prevent the button click from happening
        }
    });

    $("#txtEmpleado").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "../../Common/WebService/General.asmx/ListarEmpleado",
                data: "{'maxFilas': '" + 200 + "'," +
                                   "'vcNomEmp': '" + $("#txtEmpleado").val() + "'," +
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
                            inCodGru: item.Grupo.P_inCod,
                            Area: item.Area.vcNomOrg,
                            CentroCosto: item.CentroCosto.vcNomCenCos
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
            $("#txtEmpleado").val(ui.item.vcCodEmp + " - " + ui.item.label);
            $("#hdfCodEmpleado").val(ui.item.vcCodEmp);
            $("#lblCentroCosto").html(ui.item.CentroCosto);
            $("#lblArea").html(ui.item.Area);
            CargarSolicitudes(ui.item.vcCodEmp);
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono) {
                $("#hdfCodEmpleado").val("");
                $("#lblCentroCosto").html("");
                $("#lblArea").html("");
                CargarSolicitudes("");
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

    $("#dvDespachos").hide();
    //$("#gbox_tbSolicitud").hide();

    $("#btnGuardar").click(function () {
        var Valor = $("#tbSolicitud").jqGrid('getGridParam', 'selarrrow');
        //var datos = $("#tbSolicitud").jqGrid('getRowData', Valor);
        //SI SOLO SELECCIONA UN SOLO REGISTRO.
        if ($(Valor).length == 1) {
            var ids = "";
            for (i in Valor) {
                var datos = $("#tbSolicitud").jqGrid('getRowData', Valor[i]);
                if (datos.dtFecEnt != "") {
                    if (ids != "") {
                        ids += ",";
                    }
                    ids += Valor[i];
                    $.ajax({
                        type: "POST",
                        url: "Adm_SolicitudDespacho.aspx/GuardarDespacho",
                        data: "{'inCodSolDet': '" + ids + "'," +
                                           "'vcObs': '" + $("#txtObservaciones").val() + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            alerta("Equipo despachado");
                            $("#btnImprimir").show();
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        }
                    });
                } else {
                    alerta("Debe ingresar la Fecha de Entrega al registro seleccionado");
                }
            }
        }
        //SI LA SELECCION DE REGISTRO SON MULTIPLES
        if ($(Valor).length > 1) {
            var ids = "";
            var cont = 0;
            var disp, Num;
            var MensajeConfirmacion = "";
            disp = ""; Num = "";
            for (i in Valor) {
                var datos = $("#tbSolicitud").jqGrid('getRowData', Valor[i]);
                if (datos.dtFecEnt != "") {
                    if (ids != "") {
                        ids += ",";
                        cont += 1;
                        //                        if (datos.F_vcNumLin == "") {
                        //                            disp += datos.vcCodDisEnt + ", ";
                        //                        }
                        //                        if (datos.vcCodDisEnt == "") {
                        //                            disp += datos.F_vcNumLin + ", ";
                        //                        }
                        //                        if (datos.F_vcNumLin != "" && datos.vcCodDisEnt != "") {
                        //                            disp += datos.vcCodDisEnt + " - " + datos.F_vcNumLin + ", ";
                        //                        }
                        ids += Valor[i];
                    } else {
                        cont += 1;
                        //                        if (datos.F_vcNumLin == "") {
                        //                            disp += datos.vcCodDisEnt + ", ";
                        //                        }
                        //                        if (datos.vcCodDisEnt == "") {
                        //                            disp += datos.F_vcNumLin + ", ";
                        //                        }
                        //                        if (datos.F_vcNumLin != "" && datos.vcCodDisEnt != "") {
                        //                            disp += datos.vcCodDisEnt + " - " + datos.F_vcNumLin + ", ";
                        //                        }
                        ids += Valor[i];
                    }
                }
            }
            MensajeConfirmacion = "<ul><li>Solo se despacharan lo servicios seleccionados que tenga una Fecha de Entrega.<br /> Esta seguro de Continuar?</li></ul>";
            //            if (cont == 1) {
            //                MensajeConfirmacion = "Solo <b>" + cont + "</b>(<b>" + disp + "</b>) registro va ser Despachado.";
            //            }
            //            if (cont > 1) {
            //                MensajeConfirmacion = "Solo <b>" + cont + "</b>(<b>" + disp + "</b>) registros van a ser Despachados";
            //            }

            $("#lblMensajeConfirmacion").html(MensajeConfirmacion);
            $('#divMsgConfirmacion').dialog({
                title: "Aviso",
                modal: true,
                width: 270,
                resizable: false,
                buttons: {
                    "Si": function () {
                        $.ajax({
                            type: "POST",
                            url: "Adm_SolicitudDespacho.aspx/GuardarDespacho",
                            data: "{'inCodSolDet': '" + ids + "'," +
                                                                   "'vcObs': '" + $("#txtObservaciones").val() + "'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result) {
                                if (cont > 1) {
                                    alerta("Equipos despachados");
                                } else {
                                    alerta("Equipo despachado");
                                }

                                $("#btnImprimir").show();
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
        //SI NO SELECCIONA NINGUN REGISTRO
        if ($(Valor).length == 0) {
            alerta("Ingrese por lo menos un código de dispositivo");
            return;
        }
    });

    $("#btnImprimir").click(function () {
        var Valor = $("#tbSolicitud").jqGrid('getGridParam', 'selarrrow');
        var ids = "";

        for (i in Valor) {
            if (ids != "") {
                ids += ",";
            }
            ids += Valor[i];
        }
        $("#ifReporteCargo").attr("src", "Adm_Reporte.aspx?vcTab=MOV_SolicitudDespacho&vcTipRep=1&Valor=" + ids + "&Detalle=1");
    });
    //    $("#btnVistaPrevia").click(function () {
    //        var Valor = $("#tbSolicitud").jqGrid('getGridParam', 'selarrrow');
    //        var ids = "";

    //        for (var i in Valor) {
    //            if (ids != "") {
    //                ids += ",";
    //            }
    //            ids += Valor[i];
    //        }
    //        $("#ifReporteCargo").attr("src", "Adm_Reporte.aspx?vcTab=MOV_SolicitudDespacho&vcTipRep=1&Valor=" + ids + "&Detalle=2");
    //    });
});
