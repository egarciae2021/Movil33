var Modal;
var tbSolicitud;

$(function () {
    $(".btnNormal").button();
    var Modal;
    var codSol;
    var inTipSol;
    var timeoutHnd;
    var Dispositivos;
    var Lineas;

    tbSolicitud = $("#tbSolicitud").jqGrid({
        datatype: "local",
        colModel: [{ name: 'P_inCodSol', index: 'P_inCodSol', label: 'Codigo Solicitud', hidden: true, sortable: false },
   		                   { name: 'inTipSol', index: 'inTipSol', label: 'Codigo Tipo', hidden: true, sortable: false },
   		                   { name: 'vcTipSol', index: 'vcTipSol', label: 'Tipo', sortable: false },
   		                   { name: 'Estado.P_inCod', index: 'Estado.P_inCod', label: 'Codigo Estado', hidden: true, sortable: false },
   		                   { name: 'Estado.vcNom', index: 'Estado.vcNom', label: 'Estado', sortable: false },
   		                   { name: 'vcNumLin', index: 'vcNumLin', label: 'Numero', sortable: false },
   		                   { name: 'Empleado.P_vcCod', index: 'Empleado.P_vcCod', label: 'Codigo empleado', sortable: false },
   		                   { name: 'Empleado.vcNom', index: 'Empleado.vcNom', label: 'Empleado', sortable: false },
   		                   { name: 'dtFecSol', index: 'dtFecSol', label: 'Fecha', formatter: function (value, options, rData) {
   		                       var d = new Date(parseInt(value.slice(6, -2)));
   		                       return '' + d.getDate() + '/' + (1 + d.getMonth()) + '/' + d.getFullYear().toString();
   		                   }, sortable: true
   		                   },
                           { name: 'dtFecSol', index: 'dtFecSol', label: 'Hora', formatter: function (value, options, rData) {
                               var d = new Date(parseInt(value.slice(6, -2)));
                               var segundos = d.getSeconds().toString();
                               var minutos = d.getMinutes().toString();
                               var horas = d.getHours().toString();
                               segundos = segundos.length == 1 ? '0' + segundos : segundos;
                               minutos = minutos.length == 1 ? '0' + minutos : minutos;
                               horas = horas.length == 1 ? '0' + horas : horas;
                               return '' + horas + ':' + minutos + ':' + segundos.toString();
                           }, sortable: true
                           },
   		                   { name: 'vcObs', index: 'vcObs', label: 'Observación', sortable: false },
   		                   { name: 'DispositivoNuevo.ModeloDispositivo.vcNom', index: 'DispositivoNuevo.ModeloDispositivo.vcNom', label: 'Dispositivo nuevo', hidden: true, sortable: false },
   		                   { name: 'DispositivoAnterior.ModeloDispositivo.vcNom', index: 'DispositivoAnterior.ModeloDispositivo.vcNom', label: 'Dispositivo anterior', hidden: true, sortable: false },
   		                   { name: 'DispositivoNuevo.P_vcCodIMEI', index: 'DispositivoNuevo.P_vcCodIMEI', label: 'IMEI Nuevo', hidden: true, sortable: false },
   		                   { name: 'DispositivoAnterior.P_vcCodIMEI', index: 'DispositivoAnterior.P_vcCodIMEI', label: 'IMEI Anterior', hidden: true, sortable: false }
   	                      ],
        sortname: "P_inCodSol", //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: "700",
        height: "300",
        rownumbers: true,
        caption: "Solicitudes",
        ondblClickRow: function (id) { ProcesarSolicitud(); }
    });

    $("#tbSolicitud").jqGrid('bindKeys', { "onEnter": function (id) { ProcesarSolicitud(); }, "onSpace": function (id) { ProcesarSolicitud(); } });

    function ProcesarSolicitud() {
        $("#hdfValidacion").val("");
        if ($("#hdfAdmin").val() == "1") {
            var id = $("#tbSolicitud").jqGrid('getGridParam', 'selrow');
            if (id) {
                var datos = $("#tbSolicitud").jqGrid('getRowData', id);

                var CodEmp = datos['Empleado.P_vcCod'];
                var NomEmp = datos['Empleado.vcNom'];
                var NumLin = datos.vcNumLin;
                var vcModDisAnt = datos['DispositivoAnterior.ModeloDispositivo.vcNom'];
                var IMEIDisAnt = datos['DispositivoAnterior.P_vcCodIMEI'];
                var CodMotRep = 1;
                var vcModDisNuevo = datos['DispositivoNuevo.ModeloDispositivo.vcNom'];
                var IMEIDisNuevo = datos['DispositivoNuevo.P_vcCodIMEI'];
                var vcObs = datos.vcObs;
                var codEst = datos['Estado.P_inCod'];
                inTipSol = datos.inTipSol;
                codSol = datos.P_inCodSol;

                $("#lblCodEmpleado").html(CodEmp);
                $("#lblNomEmpleado").html(NomEmp);
                $("#lblNumCelular").html(NumLin);
                $("#lblModeloEquipoAnt").html(vcModDisAnt);
                $("#lblIMEIEquipoAnt").html(IMEIDisAnt);
                $("#ddlMotivoReposicion").val(CodMotRep);
                $("#lblModeloEquipoNuevo").html(vcModDisNuevo);
                $("#lblObservacion").html(vcObs);
                $("#ddlEstado").val("7");

                $.ajax({
                    type: "POST",
                    url: "Adm_AdministradorSolicitudes.aspx/ListarDispositivosLibresPorSolicitud",
                    data: "{'inCodSol': '" + codSol + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        $("#ddlEquipoNuevo").html("");
                        if ($(result.d).length > 0) {
                            $.each(result.d, function () {
                                $("#ddlEquipoNuevo").append($("<option></option>").attr("value", this.P_vcCodIMEI).text(this.P_vcCodIMEI));
                            });
                        }
                        else {
                            $("#hdfValidacion").val("No hay equipos disponibles para esta solicitud");
                            //alerta("No hay equipos disponibles para esta solicitud");
                            //Modal.dialog('close');
                        }
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });

                if (inTipSol == 2) {
                    $.ajax({
                        type: "POST",
                        url: "Adm_AdministradorSolicitudes.aspx/ListarLineasLibresPorSolicitud",
                        data: "{'inCodSol': '" + codSol + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            $("#ddlNumero").show();
                            $("#lblNumCelular").hide();
                            $("#ddlNumero").html("");

                            if ($(result.d).length > 0) {
                                $.each(result.d, function () {
                                    $("#ddlNumero").append($("<option></option>").attr("value", this.P_vcNum).text(this.P_vcNum));
                                });
                            }
                            else {
                                $("#hdfValidacion").val("No hay lineas disponibles para esta solicitud");
                                //alerta("No hay lineas disponibles para esta solicitud");
                                //Modal.dialog('close');
                            }
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        }
                    });
                }
                else {
                    $("#ddlNumero").hide();
                    $("#lblNumCelular").show();
                }
                Modal = $("#dvAprobacion").dialog({
                    modal: true,
                    title: "Procesar solicitud"
                });
            }
            else {
                alerta("seleccione un registro");
            }
        }
    }

    $("#btnGuardar").click(function (event) {
        var CodIMEI = $("#ddlEquipoNuevo").val();
        var EstSol = $("#ddlEstado").val();
        var codNumLim;

        if ($("#hdfValidacion").val() != "") {
            alert($("#hdfValidacion").val());
            Modal.dialog('close');
        }
        else {
            if (inTipSol == 2) {
                codNumLim = $("#ddlNumero").val();
                if (codNumLim == null || codNumLim == "") {
                    alerta("Selecccione una linea valida");
                    return;
                }
            }
            else {
                codNumLim = "";
            }

            if (CodIMEI != null) {
                $.ajax({
                    type: "POST",
                    url: "Adm_AdministradorSolicitudes.aspx/RespuestaSolicitud",
                    data: "{'vcCodIMEI': '" + CodIMEI.replace(/'/g, "&#39") + "'," +
                           "'inCodSol': '" + codSol + "'," +
                           "'inEstSol': '" + EstSol + "'," +
                           "'codNumLim': '" + codNumLim + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {
                        alerta("Solicitud respondida");
                        Modal.dialog('close');
                        window.document.location.reload();
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            } else {
                alerta("No hay lineas disponibles para esta solicitud");
            }
        }
    });
    $("#btnSalir").click(function (event) {
        Modal.dialog('close');
    });

    $("#ddlTipoSolicitud,#ddlEstadoSolicitud").change(function (event) {
        ListarSolicitud();
    });

    $("#ddlCampoFiltrar").change(function (event) {
        $("#txtDescripcion").val("");
    });

    $("#txtDescripcion").keyup(function () {
        if (timeoutHnd) {
            clearTimeout(timeoutHnd);
        }
        timeoutHnd = setTimeout(ListarSolicitud, 500);
    });

    ListarSolicitud();

    function ListarSolicitud() {
        $.ajax({
            type: "POST",
            url: "Adm_AdministradorSolicitudes.aspx/ListarSolicitudes",
            data: "{'inCodTipSol': '" + $("#ddlTipoSolicitud").val() + "'," +
                           "'inCodEst': '" + $("#ddlEstadoSolicitud").val() + "'," +
                           "'inCamBus': '" + $("#ddlCampoFiltrar").val() + "'," +
                           "'vcCodEmp': '" + $("#hdfEmpleado").val() + "'," +
                           "'inAdm': '" + $("#hdfAdmin").val() + "'," +
                           "'vcBus': '" + $("#txtDescripcion").val().replace(/'/g, "&#39") + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#tbSolicitud").jqGrid('clearGridData');
                var i = 0;
                for (i = 0; i < $(result.d).length; i++) {
                    $("#tbSolicitud").jqGrid('addRowData', result.d[i].P_inCodSol, result.d[i]);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
});