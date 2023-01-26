//var tab;
var MargenFiltro = 0;
var MargenHeight = 48;
//var idSeleccionado = null;
//var TamanoPagina = [10, 20, 30];
//var inAltGrid;
//var inFilas;
//var inFiltro = 1;
//var vcFiltro = '';
//var vcFiltro2 = '';
//var vcGruTipSolEdi;
//var vcGruTipSolEli;
//var vcVista = "General";
//var vcTodos = "0";
//var vcTipos = "0"; //General
//var vcFecVal;
//var vcRangFecVal;
//var vcRangoFechaIni;
//var vcRangoFechaFin;

function ActualizarGrilla() {
    $("#grid").trigger("reloadGrid");
}

function CerroMensaje() {
    BloquearPagina(false);
}

$(function () {

    inAltGrid = $(window).height() - 168 - MargenFiltro * MargenHeight;
//    if ($("#hdfGruTipSolEdi").val() != "")
//        vcGruTipSolEdi = $("#hdfGruTipSolEdi").val().split(",");
//    else
//        vcGruTipSolEdi = "";
//    if ($("#hdfGruTipSolEli").val() != "")
//        vcGruTipSolEli = $("#hdfGruTipSolEli").val().split(",");
//    else
//        vcGruTipSolEli = "";

//    vcTipos = $("#hdfGruTipSol").val(); //General

    $("#tblAcciones").buttonset();
    $(".ui-button-text").css({ padding: 4, width: 22 });

    $("#TabDetalle span.ui-icon-close").live("click", function () {
        var index = $("li", tab).index($(this).parent());
        tab.tabs("remove", index);
    });

//    $("#txtFechaIni").keypress(ValidarFecha);
//    $("#txtFechaFin").keypress(ValidarFecha);
//    $("#txtRangoFechaIni").keypress(ValidarFecha);
//    $("#txtRangoFechaFin").keypress(ValidarFecha);

//    $("#txtFechaIni").datepicker({
//        changeMonth: true,
//        changeYear: true,
//        dateFormat: 'dd/mm/yy'
//    });
//    $("#txtFechaFin").datepicker({
//        changeMonth: true,
//        changeYear: true,
//        dateFormat: 'dd/mm/yy'
//    });
//    $("#txtRangoFechaIni").datepicker({
//        changeMonth: true,
//        changeYear: true,
//        dateFormat: 'dd/mm/yy'
//    });
//    $("#txtRangoFechaFin").datepicker({
//        changeMonth: true,
//        changeYear: true,
//        dateFormat: 'dd/mm/yy'
//    });
//    AsignarRangoFechas();
//    function fnVerificarFecha(txtFecha) {
//        if ($("#txtFechaIni").val() != "" && $("#txtFechaFin").val() != "") {
//            var inDiaIni = parseInt($("#txtFechaIni").val().substr(0, 2));
//            var inMesIni = parseInt($("#txtFechaIni").val().substr(3, 2));
//            var inAnioIni = parseInt($("#txtFechaIni").val().substr(6, 2));
//            var inDiaFin = parseInt($("#txtFechaFin").val().substr(0, 2));
//            var inMesFin = parseInt($("#txtFechaFin").val().substr(3, 2));
//            var inAnioFin = parseInt($("#txtFechaFin").val().substr(6, 2));

//            if ((inAnioIni > inAnioFin) || (inAnioIni == inAnioFin && inMesIni > inMesFin) || (inAnioIni == inAnioFin && inMesIni == inMesFin && inDiaIni > inDiaFin)) {
//                vcRangFecVal = "0";
//                $(txtFecha).val("");
//            }
//        }
//    }

//    function fnVerificarRangoFecha(txtFecha) {
//        if ($("#txtRangoFechaIni").val() != "" && $("#txtRangoFechaFin").val() != "") {
//            var inDiaIni = parseInt($("#txtRangoFechaIni").val().substr(0, 2));
//            var inMesIni = parseInt($("#txtRangoFechaIni").val().substr(3, 2));
//            var inAnioIni = parseInt($("#txtRangoFechaIni").val().substr(6, 2));
//            var inDiaFin = parseInt($("#txtRangoFechaFin").val().substr(0, 2));
//            var inMesFin = parseInt($("#txtRangoFechaFin").val().substr(3, 2));
//            var inAnioFin = parseInt($("#txtRangoFechaFin").val().substr(6, 2));

//            if ((inAnioIni > inAnioFin) || (inAnioIni == inAnioFin && inMesIni > inMesFin) || (inAnioIni == inAnioFin && inMesIni == inMesFin && inDiaIni > inDiaFin)) {
//                vcRangFecVal = "0";
//                $(txtFecha).val("");
//            }
//        }
//    }


//    $("#btnVista").click(function () {
//        var menu = $("#dvVistas").show().position({
//            my: "left top",
//            at: "left bottom",
//            of: $("#btnVista")[0]
//        });
//        $(document).one("click", function () {
//            menu.hide();
//        });
//        return false;
//    });

//    if ($("#hdfAdmin").val() == "1") {
//        //        $("#trPendiente").show();
//        $("#trPorAprobar").show();
//        //$("#trAprobada").show();
//        //$("#trRechazada").show();
//        $("#trPorAsignar").show();
//        $("#trEnProceso").show();
//        //$("#trCulminada").show();
//        //$("#trAnulada").show();
//        vcTodos = "1";
//    }
//    if ($("#hdfTecnico").val() == "1") {
//        //        $("#trPendiente").show();
//        $("#trPorAsignar").show();
//        $("#trEnProceso").show();
//        //$("#trCulminada").show();
//        //$("#trAnulada").show();
//        vcTodos = "1";
//    }
//    if ($("#hdfResApr").val() == "1") {
//        //        $("#trPendiente").show();
//        $("#trPorAprobar").show();
//        //$("#trAprobada").show();
//        //$("#trRechazada").show();
//        vcTodos = "1";
//    }

//    if ($('#trPorAprobar').css('display') != "none") {
//        $('#rbtPorAprobar').attr('checked', 'checked');
//        fnVistaPorAprobar(true);
//        $("#divRangoFecha").hide();
//    }
//    else if ($('#trPorAsignar').css('display') != "none") {
//        $('#rbtPorAsignar').attr('checked', 'checked');
//        fnVistaPorAsignar(true);
//        $("#divRangoFecha").hide();
//    }
//    else {
//        fnVistaGeneral(true);
//        fnCargarFiltroTipoSolicitud();
//        $("#divRangoFecha").show();
//    }

//    $("#rbtGeneral,#rbtPendiente,#rbtPorAprobar,#rbtAprobada,#rbtRechazada,#rbtPorAsignar,#rbtEnProceso,#rbtCulminada,#rbtAnulada").change(function () {
//        if ($('#rbtGeneral').is(':checked')) {
//            $("#divRangoFecha").show();
//            fnVistaGeneral(false);
//            AsignarRangoFechas();
//            ActualizarGrilla();
//        } else if ($('#rbtPendiente').is(':checked')) {
//            fnVistaPendiente();
//            vcRangoFechaIni = "";
//            vcRangoFechaFin = "";
//            ActualizarGrilla();
//        } else if ($('#rbtPorAprobar').is(':checked')) {
//            fnVistaPorAprobar(false);
//            vcRangoFechaIni = "";
//            vcRangoFechaFin = "";
//            ActualizarGrilla();
//        } else if ($('#rbtAprobada').is(':checked')) {
//            fnVistaAprobada();
//            vcRangoFechaIni = "";
//            vcRangoFechaFin = "";
//            ActualizarGrilla();
//        } else if ($('#rbtRechazada').is(':checked')) {
//            fnVistaRechazada();
//            vcRangoFechaIni = "";
//            vcRangoFechaFin = "";
//            ActualizarGrilla();
//        } else if ($('#rbtPorAsignar').is(':checked')) {
//            fnVistaPorAsignar(false);
//            vcRangoFechaIni = "";
//            vcRangoFechaFin = "";
//            ActualizarGrilla();
//        } else if ($('#rbtEnProceso').is(':checked')) {
//            fnVistaEnProceso();
//            vcRangoFechaIni = "";
//            vcRangoFechaFin = "";
//            ActualizarGrilla();
//        } else if ($('#rbtCulminada').is(':checked')) {
//            fnVistaCulminada();
//            vcRangoFechaIni = "";
//            vcRangoFechaFin = "";
//            ActualizarGrilla();
//        } else if ($('#rbtAnulada').is(':checked')) {
//            fnVistaAnulada();
//            vcRangoFechaIni = "";
//            vcRangoFechaFin = "";
//            ActualizarGrilla();
//        }

//        fnCargarFiltroTipoSolicitud();
//    });

//    //    function CheckBrowser(e) {
//    //        if (window.event)
//    //            key = window.event.keyCode;     //IE
//    //        else
//    //            key = e.which;     //firefox
//    //        return key;
//    //    }

//    //autocompletar empleado
//    //    if ($("#txtEmpleado").length > 0) {
//    //        var Selecciono = false;
//    //        $("#txtEmpleado").autocomplete({
//    //            minLength: 0,
//    //            source: function (request, response) {
//    //                $.ajax({
//    //                    type: "POST",
//    //                    url: "../Adm_NuevaSolicitud.aspx/ListarEmpleados",
//    //                    data: "{'inMaxFil': '" + 200 + "'," +
//    //                               "'vcNomEmp': '" + $("#txtEmpleado").val() + "'," +
//    //                               "'inTipLin': '" + 1 + "'}", //inTipLin = 1 (empleados que perteneces a un grupo con tipo de linea staff)
//    //                    contentType: "application/json; charset=utf-8",
//    //                    dataType: "json",
//    //                    success: function (result) {
//    //                        if (result.d.length == 0) {
//    //                            $("#hdfCodEmpleado").val('');
//    //                            $("#hdfGrupOrigEmp").val('');
//    //                        }
//    //                        //alert(result.d[0]);
//    //                        //var item = result.d[0].split('-');
//    //                        response($.map(result.d, function (item) {
//    //                            var itemE = item.split("-");
//    //                            return {
//    //                                label: itemE[1],
//    //                                vcCodEmp: itemE[0],
//    //                                grupOri: itemE[2]
//    //                            }
//    //                        }));
//    //                    },
//    //                    error: function (xhr, err, thrErr) {
//    //                        MostrarErrorAjax(xhr, err, thrErr);
//    //                    }
//    //                });
//    //            },
//    ////            search: function (event, ui) {
//    ////                var key = CheckBrowser(event);
//    ////                if (key == 13)
//    ////                    return true;
//    ////                else
//    ////                    return false;
//    ////            },
//    //            focus: function (event, ui) {
//    //                $("#txtEmpleado").val(ui.item.label);
//    //                //alert(3);
//    //                return false;
//    //            },
//    //            select: function (event, ui) {
//    //                Selecciono = true;
//    //                $("#txtEmpleado").val(ui.item.label);
//    //                $("#hdfCodEmpleado").val(ui.item.vcCodEmp);
//    //                $("#hdfGrupOrigEmp").val(ui.item.grupOri);
//    //                fnCargarGrilla();
//    //                return false;
//    //            },
//    //            change: function (event, ui) {
//    //                if (!Selecciono) {
//    //                    $("#hdfCodEmpleado").val("");
//    //                    $("#txtEmpleado").val("");
//    //                    $("#hdfGrupOrigEmp").val("");
//    //                }
//    //                return false;
//    //            },
//    //            open: function (event, ui) {
//    //                Selecciono = false;
//    //                return false;
//    //            }
//    //        }).data("autocomplete")._renderItem = function (ul, item) {
//    //            return $("<li></li>")
//    //                .data("item.autocomplete", item)
//    //                .append("<a>" + item.vcCodEmp + "=" + item.label + "</a>")
//    //                .appendTo(ul);
//    //        };
//    //    };
//    //fin autocompletar empleado

//    $("#divCodigo").show();
//    $("#divFecha").hide();
//    $("#divEmpleado").hide();
//    $("#divEstadoSolicitud").hide();
//    $("#divTipoSolicitud").hide();

//    if ($("#hdfBusquedaIni").val() != "") {
//        $("#divCodigo").hide();
//        inFiltro = 7;
//        vcFiltro = '';
//        vcFiltro2 = '';
//    }


//    $("#ddlFiltro").change(function () {
//        inFiltro = $("#ddlFiltro").val();
//        fnIniciarFiltros();

//        if (inFiltro == 1) { //Código Solicitud
//            $("#divCodigo").show();
//            fnCargarGrilla();
//        } else if (inFiltro == 2) { //Fecha
//            $("#divFecha").show();
//            fnCargarGrilla();
//        } else if (inFiltro == 3) { //Empleado
//            $("#divEmpleado").show();
//            fnCargarGrilla();
//        } else if (inFiltro == 4) { //Estados de Aprobación
//            $("#divEstadoApr").show();
//            fnCargarGrilla();
//        } else if (inFiltro == 5) { //Estados de Proceso
//            $("#divEstadoPro").show();
//            fnCargarGrilla();
//        } else if (inFiltro == 6) { //Tipo Solicitud
//            fnCargarFiltroTipoSolicitud();
//            fnCargarGrilla();
//        } else if (inFiltro == 7) { //Por Revisar
//            fnCargarGrilla();
//        }
//    });

//    $("#chkSolNoVista,#ddlEstado,#ddlTipo,#ddlTipoTec,#ddlTipoResApr,#ddlEstadoApr,#ddlEstadoPro").change(function () {
//        fnCargarGrilla();
//    });
//    $("#txtFechaIni").change(function () {
//        vcFecVal = "1";
//        fnVerificarFecha("#txtFechaIni");

//        if (vcFecVal == "0") {
//            alerta("La fecha inicial debe ser menor que la fecha final.");
//            return;
//        }
//        fnCargarGrilla();
//    });
//    $("#txtFechaFin").change(function () {
//        vcFecVal = "1";
//        fnVerificarFecha("#txtFechaFin");

//        if (vcFecVal == "0") {
//            alerta("La fecha inicial debe ser menor que la fecha final.");
//            return;
//        }
//        fnCargarGrilla();
//    });

//    $("#txtRangoFechaIni").change(function () {
//        vcRangFecVal = "1";
//        fnVerificarRangoFecha("#txtRangoFechaIni");

//        if (vcRangFecVal == "0") {
//            alerta("La fecha inicial debe ser menor que la fecha final.");
//            return;
//        }
//        fnCargarGrilla();
//    });

//    $("#txtRangoFechaFin").change(function () {
//        vcRangFecVal = "1";
//        fnVerificarRangoFecha("#txtRangoFechaFin");

//        if (vcRangFecVal == "0") {
//            alerta("La fecha inicial debe ser menor que la fecha final.");
//            return;
//        }
//        fnCargarGrilla();
//    });



//    //    $('#txtCodigo,#txtEmpleado').live("keydown", function (e) {
//    //        
//    //    });

//    $('#txtCodigo,#txtEmpleado').live("keypress", function (e) {
//        if (e.keyCode == 13) {
//            fnCargarGrilla();
//        } else {
//            if (e.char == "\\")
//                return false;
//        }
//    });

//    //    $("#ddlTipo").change(function () {
//    //        if (inFiltro == 4) {
//    //            $.ajax({
//    //                url: "Adm_ListadoSolicitudes.aspx/CargarEstados", //PageMethod
//    //                data: "{'inTipSol':'" + $("#ddlTipo").val() + "'}",
//    //                dataType: "json",
//    //                type: "post",
//    //                contentType: "application/json; charset=utf-8",
//    //                success: function (result) {
//    //                    $("#ddlEstado").empty();
//    //                    for (var i = 0; i < result.d.length; i++) {
//    //                        $("#ddlEstado").append($('<option></option>').val(result.d[i].P_inCod).html(result.d[i].vcNom));
//    //                    }
//    //                    fnCargarGrilla();
//    //                },
//    //                error: function (xhr, err, thrErr) {
//    //                    MostrarErrorAjax(xhr, err, thrErr);
//    //                }
//    //            });
//    //        } else
//    //            fnCargarGrilla();
//    //    });

//    function fnCargarGrilla() {
//        vcFiltro2 = "";
//        if ($('#rbtGeneral').is(':checked')) {  //FILTRO DE RANGO DE FECHA SOLO PARA LA OPCION GENERAL---------------------------------------------------------------
//            var RangFecIni = $("#txtRangoFechaIni").val();
//            var RangFecFin = $("#txtRangoFechaFin").val();
//            vcRangoFechaIni = "";
//            if (RangFecIni != "")
//                vcRangoFechaIni = RangFecIni.substr(6, 4).toString() + RangFecIni.substr(3, 2).toString() + RangFecIni.substr(0, 2).toString() + " 00:00:00";
//            else
//                vcRangoFechaFin = "";
//            if (RangFecFin != "")
//                vcRangoFechaFin = RangFecFin.substr(6, 4).toString() + RangFecFin.substr(3, 2).toString() + RangFecFin.substr(0, 2).toString() + " 23:59:59";
//            else
//                vcRangoFechaFin = "";
//        } else {
//            vcRangoFechaIni = "";
//            vcRangoFechaFin = "";
//        }
//        //----------------------------------------------------------------------------------------------------------------------------------------------------------------
//        if (inFiltro == 1) //Código
//            vcFiltro = LimpiarDatoString($("#txtCodigo").val());
//        else if (inFiltro == 2) { //Rango de Fechas
//            var FecHorIni = $("#txtFechaIni").val();
//            var FecHorFin = $("#txtFechaFin").val();
//            if (FecHorIni != "")
//                vcFiltro = FecHorIni.substr(6, 4).toString() + FecHorIni.substr(3, 2).toString() + FecHorIni.substr(0, 2).toString() + " 00:00:00";
//            else
//                vcFiltro = "";
//            if (FecHorFin != "")
//                vcFiltro2 = FecHorFin.substr(6, 4).toString() + FecHorFin.substr(3, 2).toString() + FecHorFin.substr(0, 2).toString() + " 23:59:59";
//            else
//                vcFiltro2 = "";
//        }
//        else if (inFiltro == 3) //Empleado
//            vcFiltro = LimpiarDatoString($("#txtEmpleado").val());
//        else if (inFiltro == 4) //Estados de Aprobación
//            vcFiltro = $("#ddlEstadoApr").val();
//        else if (inFiltro == 5) //Estados de Proceso
//            vcFiltro = $("#ddlEstadoPro").val();
//        else if (inFiltro == 6) { //Tipos de Solicitud
//            if ($("#divTipoSolicitud").is(':visible')) {
//                vcFiltro = $("#ddlTipo").val();
//            } else if ($("#divTipoSolicitudTec").is(':visible')) {
//                vcFiltro = $("#ddlTipoTec").val();
//            } else if ($("#divTipoSolicitudResApr").is(':visible')) {
//                vcFiltro = $("#ddlTipoResApr").val();
//            }
//        } else if (inFiltro == 7) //Por Revisar
//            vcFiltro = '';
//        $("#grid").trigger("reloadGrid");
//    }

    tab = $("#TabDetalle").tabs({
        tabTemplate: "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close'>Remover Tab</span></li>",
        //fx: { height: 'toggle', duration: 800 },
        add: function (event, ui) {
            var ifra = document.createElement('IFRAME');
            ifra.width = "100%";
            ifra.height = "100%";
            ifra.setAttribute("margin-top", "0px");
            ifra.setAttribute("margin-left", "0px");
            ifra.setAttribute("margin-bottom", "0px");
            ifra.setAttribute("margin-right", "0px");
            ifra.setAttribute("padding-top", "0px");
            ifra.setAttribute("padding-left", "0px");
            ifra.setAttribute("padding-bottom", "0px");
            ifra.setAttribute("padding-right", "0px");
            ifra.src = pagina;
            ifra.frameBorder = "0";
            ifra.className = "SinBordes";
            $(ui.panel).append(ifra);
            $(this).tabs('select', '#' + ui.panel.id);
            pagina = "";
        }
    });

//    function NumeroInicialFilas() {
//        var nuAltoFila = 23.04;
//        inFilas = Math.floor(inAltGrid / nuAltoFila);
//    }

//    function GenerarBotones(id, biNueNot) {
//        var vcBotones = '      <img id="btnNota_' + id + '" src="../../../Common/Images/Chat/write.png" alt="Ver Notas" class="imgBtn ConImg" title="Ver Notas"/>';
//        if (biNueNot == "0")
//            vcBotones += '   <img id="imgNueNot_' + id + '" src="../../../Common/Images/Chat/Mail.png" alt="Nueva Nota" title="Nueva Nota"/>';
//        else
//            vcBotones += '';

//        return vcBotones;
//    }

//    function CrearBotonesSemaforo(id, vcUmbral) {
//        if (vcUmbral != "")
//            return '<img src="../../../Common/Images/Semaforos/' + vcUmbral + '_16x16.png" />';
//        else
//            return '';
//    }

//    $(".ConImg").live("click", function () {
//        var id = $(this).attr("id").substr(8);
//        var datos = $("#grid").jqGrid('getRowData', id);
//        $('#ifNota').attr("src", "Adm_SolicitudNota.aspx?IdSolicitud=" + id);
//        formulario = $('#dvNota').dialog({
//            title: "Notas de la Solicitud: " + datos.vcCodigo,
//            height: 550,
//            width: 700,
//            modal: true
//        });

//        $("#imgNueNot_" + id).hide();
//    });

//    var tbSolicitudes = $("#grid").jqGrid({
//        sortable: true,
//        datatype: "local",
//        datatype: function () {
//            var dtInicio = new Date();
//            $.ajax({
//                url: "Adm_ListadoSolicitudes.aspx/Listar", //PageMethod
//                data: "{'vcTodos':'" + vcTodos + "'," +
//                      "'inPagTam':'" + $('#grid').getGridParam("rowNum") + "'," +
//                      "'inPagAct':'" + parseInt($('#grid').getGridParam("page")) + "'," +
//                      "'vcOrdCol':'" + $('#grid').getGridParam("sortname") + "'," + //Nombre de columna ordenado
//                      "'vcTipOrdCol':'" + $('#grid').getGridParam("sortorder") + "'," + //Tipo de orden de columna asc, desc
//                      "'strTipos': '" + vcTipos + "'," +
//                      "'intFiltro': '" + inFiltro + "'," +
//                      "'strFiltro':'" + vcFiltro + "'," +
//                      "'strFiltro2':'" + vcFiltro2 + "'," +
//                      "'inTipFil':'" + $("#ddlTipo").val() + "'," +
//                      "'biSolNoVis':'" + $("#chkSolNoVista").is(":checked") + "'," +
//                      "'vcVista':'" + vcVista + "'," +
//                      "'strRangFechaIni':'" + vcRangoFechaIni + "'," +
//                      "'strRangFechaFin':'" + vcRangoFechaFin + "'," +
//                      "'vcResAre':'" + $("#hdfResApr").val() + "'}",
//                dataType: "json",
//                type: "post",
//                contentType: "application/json; charset=utf-8",
//                success: function (result) {
//                    $("#grid")[0].addJSONData(result.d);

//                    var dtFin = new Date();
//                    var diff = (dtFin - dtInicio) / 1000; //unit is milliseconds
//                    //$("#lblFiltro").text(diff);

//                },
//                error: function (xhr, err, thrErr) {
//                    MostrarErrorAjax(xhr, err, thrErr);
//                }
//            });
//        },
//        jsonReader: //Set the jsonReader to the JQGridJSonResponse squema to bind the data.
//                {
//                root: "Items",
//                page: "PaginaActual",
//                total: "TotalPaginas",
//                records: "TotalRegistros",
//                repeatitems: true,
//                cell: "Row",
//                id: "P_inCodSol"
//            },
//        colModel: [{ name: 'P_inCodSol', index: 'P_inCodSol', label: 'P_inCodSol', hidden: true, key: true },
//                       { name: 'Visto', index: 'Visto', label: 'Notas', hidden: false, width: 60, align: 'left', resizable: false,
//                           formatter: function (value, options, rData) { return GenerarBotones(rData[0], rData[18]); }
//                       },
//                       { name: 'vcCodigo', index: 'vcCodigo', label: 'Código', hidden: false, width: 110 },
//                       { name: 'dtFecSol', index: 'dtFecSol', label: 'Fecha', hidden: false, width: 130 },
//                       { name: 'EMPL_P_vcCODEMP', index: 'EMPL_P_vcCODEMP', label: 'Cód. Empleado', hidden: false, width: 80 },
//                       { name: 'EMPL_vcNOMEMP', index: 'EMPL_vcNOMEMP', label: 'Nombre Empleado', hidden: false, width: 250 },
//                       { name: 'inTipSol', index: 'inTipSol', label: 'inTipSol', hidden: true },
//                       { name: 'vcNomTipSol', index: 'vcNomTipSol', label: 'Tipo de Solicitud', hidden: false, width: 160 },
//                       { name: 'biPersonalizado', index: 'biPersonalizado', label: 'biPersonalizado', hidden: true, width: 100, align: 'center' },
//                       { name: 'F_inEstSol_Apr', index: 'F_inEstSol_Apr', label: 'F_inEstSol_Apr', hidden: true },
//                       { name: 'vcNomEstApr', index: 'vcNomEstApr', label: 'Estado Aprobación', hidden: false, width: 90 },
//                       { name: 'F_inEstSol', index: 'F_inEstSol', label: 'F_inEstSol', hidden: true },
//                       { name: 'vcNomEst', index: 'vcNomEst', label: 'Estado Proceso', hidden: false, width: 90 },
//                       { name: 'vcUsuTec', index: 'vcUsuTec', label: 'Técnico Asignado', hidden: false, width: 70 },
//                       { name: 'opUmbral', index: 'opUmbral', label: 'Umbral', hidden: false, width: 50, align: 'center', sortable: false, resizable: false,
//                           formatter: function (value, options, rData) { return CrearBotonesSemaforo(rData[0], rData[14]); }
//                       },
//                       { name: 'inDiaTra', index: 'inDiaTra', label: 'Días Transc.', hidden: false, align: 'center', width: 50, sortable: false },
//                       { name: 'dcMonto', index: 'dcMonto', label: 'Monto', hidden: false, width: 70, align: 'right' },
//                       { name: 'vcTabla', index: 'vcTabla', label: 'vcTabla', hidden: true, width: 60 }
//                      ],
//        viewrecords: true,
//        pager: "#pager", //Pager.
//        loadtext: 'Cargando datos...',
//        recordtext: "{0} - {1} de {2} elementos",
//        emptyrecords: 'No hay resultados',
//        pgtext: 'Pág: {0} de {1}', //Paging input control text format.
//        rowNum: inFilas, //$("#hdfTamPag").val(), //"10" PageSize.
//        rowList: TamanoPagina,  //TamanosPaginaSel, //Variable PageSize DropDownList. 
//        sortname: "dtFecSol", //sortname: idTabla, //Default SortColumn
//        sortorder: "desc", //Default SortOrder.
//        rownumbers: true,
//        shrinkToFit: false,
//        multiselect: true,
//        ondblClickRow: function (id) {
//            if ($("#btnEditar").button("option", "disabled") == false)
//                EditarRegistro(id);
//            else if ($("#btnVerDetalle").button("option", "disabled") == false)
//                EditarRegistro(id);
//            else if ($("#btnProcesar").button("option", "disabled") == false)
//                EditarRegistro(id);
//        },
//        beforeSelectRow: function (id, e) {
//            var vcSel = $("#grid").jqGrid('getGridParam', 'selarrrow');

//            if ($('#rbtPorAprobar').is(':checked') || $('#rbtPorAsignar').is(':checked')) {
//                //MultiSelect = true;
//                return true;
//            } else {
//                //MultiSelect = false;
//                if (vcSel.length == 1) {
//                    if (vcSel[0] == id)
//                        return true; //Deselecciona la fila
//                    else {
//                        $("#grid").jqGrid('resetSelection');
//                        return true; //Selecciona más de una fila = false
//                    }
//                } else if (vcSel.length == 0) {
//                    return true; //Selecciona una fila = true
//                }
//            }
//        },
//        onSelectRow: function (id) {
//            var datos = $("#grid").jqGrid('getRowData', id);

//            if ($('#rbtGeneral').is(':checked')) {
//                if (datos.F_inEstSol_Apr == 32) { //Pendiente
//                    //Verificar permiso para EDITAR
//                    var vcEdi = "0";
//                    for (var i = 0; i < vcGruTipSolEdi.length; i++) {
//                        if (vcGruTipSolEdi[i] == datos.inTipSol)
//                            vcEdi = "1";
//                    }
//                    if (vcEdi == "0") {
//                        $("#btnEditar").button("option", "disabled", true);
//                        $("#btnVerDetalle").button("option", "disabled", false);
//                    }
//                    else {
//                        $("#btnEditar").button("option", "disabled", false);
//                        $("#btnVerDetalle").button("option", "disabled", true);
//                    }

//                    //Verificar permiso para ELIMINAR
//                    var vcEli = "0";
//                    for (var i = 0; i < vcGruTipSolEli.length; i++) {
//                        if (vcGruTipSolEli[i] == datos.inTipSol)
//                            vcEli = "1";
//                    }
//                    if (vcEli == "0")
//                        $("#btnEliminar").button("option", "disabled", true);
//                    else
//                        $("#btnEliminar").button("option", "disabled", false);

//                } else {
//                    $("#btnEditar").button("option", "disabled", true);
//                    $("#btnVerDetalle").button("option", "disabled", false);
//                    $("#btnEliminar").button("option", "disabled", true);
//                }
//            } else if ($('#rbtPorAprobar').is(':checked')) {
//                var vcSel = $("#grid").jqGrid('getGridParam', 'selarrrow');
//                if (vcSel.length > 1 || vcSel.length == 0) {
//                    $("#btnVerDetalle").button("option", "disabled", true);
//                } else {
//                    $("#btnVerDetalle").button("option", "disabled", false);
//                }
//            } else if ($('#rbtPorAsignar').is(':checked')) {
//                var vcSel = $("#grid").jqGrid('getGridParam', 'selarrrow');
//                if (vcSel.length > 1 || vcSel.length == 0) {
//                    $("#btnVerDetalle").button("option", "disabled", true);
//                } else {
//                    $("#btnVerDetalle").button("option", "disabled", false);
//                }
//            }
//        },
//        sortable: function (permutation) {
//            //var colModels = $("#grid").getGridParam("colModel");
//            //alert(colModels);
//        },
//        afterInsertRow: function (rowid, aData, rowelem) {
//            if (aData.btVig == 'False') {
//                var colModels = $("#tblPoliticaSolicitudxGrupo").getGridParam("colModel");
//                for (var i in colModels) {
//                    $("#tblPoliticaSolicitudxGrupo").jqGrid('setCell', rowid, i, '', { color: 'red' });
//                }
//            }
//        }
//        //        ,subGrid: true,
//        //        subGridOptions: {
//        //            "reloadOnExpand": false,
//        //            "selectOnExpand": false
//        //        },
//        //        subGridRowExpanded: function (subgrid_id, row_id) {
//        //            var subgrid_table_id, pager_id;
//        //            subgrid_table_id = subgrid_id + "_t";
//        //            pager_id = "p_" + subgrid_table_id;
//        //            $("#" + subgrid_id).html("<table id='" + subgrid_table_id + "' class='scroll'></table><div id='" + pager_id + "' class='scroll'></div>");
//        //            $("#" + subgrid_table_id).jqGrid({
//        //                datatype: function () {
//        //                    $.ajax({
//        //                        url: "Adm_ListadoSolicitudes.aspx/ObtenerSeguimiento", //PageMethod
//        //                        data: "{'inCodSol': '" + row_id + "'}",
//        //                        dataType: "json",
//        //                        type: "post",
//        //                        contentType: "application/json; charset=utf-8",
//        //                        success: function (result) {
//        //                            $("#" + subgrid_table_id).jqGrid('clearGridData');
//        //                            for (var i = 0; i < $(result.d).length; i++) {
//        //                                $("#" + subgrid_table_id).jqGrid('addRowData', i, result.d[i]);
//        //                            }

//        //                            if ($.browser.chrome) {
//        //                                $('#gbox_' + subgrid_table_id).css("width", "795px"); //ui-jqgrid-bdiv
//        //                                $('div.ui-jqgrid-bdiv', 'div#gview_' + subgrid_table_id).each(function (i) {
//        //                                    $(this).css({ "width": "795px" });
//        //                                });
//        //                                $('div.ui-jqgrid-hdiv', 'div#gview_' + subgrid_table_id).each(function (i) {
//        //                                    $(this).css({ "width": "795px" });
//        //                                });
//        //                            }
//        //                        },
//        //                        error: function (xhr, err, thrErr) {
//        //                            MostrarErrorAjax(xhr, err, thrErr);
//        //                        }
//        //                    });
//        //                },
//        //                colModel: [{ name: 'IdSolicitudSeguimiento', index: 'IdSolicitudSeguimiento', label: 'IdSolicitudSeguimiento', key: true, hidden: true },
//        //                    { name: 'Fecha', index: 'Fecha', label: 'Fecha', width: '70', align: 'left', sortable: false, resizable: false, },
//        //                    { name: 'P_inCodSol', index: 'P_inCodSol', label: 'P_inCodSol', width: '70', align: 'left', sortable: false, resizable: false, hidden: true },
//        //                    { name: 'IdUsuario', index: 'IdUsuario', label: 'IdUsuario', width: '100', align: 'left', sortable: false, resizable: false, hidden: true },
//        //                    { name: 'EstadoInicial', index: 'EstadoInicial', label: 'EstadoInicial', width: '100', align: 'left', sortable: false, resizable: false, hidden: true },
//        //                    { name: 'EstadoFinal', index: 'EstadoFinal', label: 'EstadoFinal', width: '100', align: 'left', sortable: false, resizable: false, hidden: true },
//        //                    { name: 'vcEstadoInicial', index: 'vcEstadoInicial', label: 'Estado Inicial', width: '90', align: 'left', sortable: false, resizable: false },
//        //                    { name: 'vcEstadoFinal', index: 'vcEstadoFinal', label: 'Estado Final', width: '90', align: 'left', sortable: false, resizable: false },
//        //                    { name: 'NomUsuario', index: 'NomUsuario', label: 'Usuario', width: '70', align: 'left', sortable: false, resizable: false, hidden: false },
//        //                    { name: 'Comentarios', index: 'Comentarios', label: 'Comentarios', width: '140', align: 'left', sortable: false, resizable: false }
//        //                    ],
//        //                sortorder: "asc",
//        //                width: "800",
//        //                height: "auto",
//        //                beforeSelectRow: function (rowId, e) {
//        //                    return false;
//        //                }
//        //            });
//        //        },
//        //        subGridRowColapsed: function (subgrid_id, row_id) {
//        //        }
//    }).navGrid("#pager", { edit: false, add: false, search: false, del: false });

    inicioPagina();
    function inicioPagina() {
        DimPosElementos();
    }

    $(window).resize(function () {
        DimPosElementos();
        NumeroInicialFilas();
    });

    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        var AnchoLateral = $(".LateralSplitter");

        $(".tabs").css({ height: Alto - 23, width: Ancho - AnchoLateral, marginbotton: 0, paddingbotton: 0 });

        $(".Splitter").css({ height: Alto - 18 });
        inAltGrid = $(window).height() - 198 - MargenFiltro * MargenHeight;

        $("#grid").setGridWidth($("#TabDetalle").width() - 13);
        $("#grid").setGridHeight(inAltGrid);
    }

//    function fnVistaGeneral(blQuitarFiltros) {
//        $("#lblVista").html("General");

//        try {
//            $("#grid").hideCol("cb");
//            $("#grid").showCol("vcUsuTec");
//            $("#grid").showCol("opUmbral");
//            $("#grid").showCol("inDiaTra");
//        }
//        catch (err) {
//            //some err
//        }

//        if (blQuitarFiltros == false) {
//            $("#grid").jqGrid('resetSelection');
//        }
//        $("#btnEditar").button("option", "disabled", true);
//        $("#btnVerDetalle").button("option", "disabled", true);
//        $("#btnAprobar").hide();
//        $("#btnRechazar").hide();
//        $("#btnAsignar").hide();
//        $("#btnEditar").show(); //Depende del estado aprobación
//        $("#btnProcesar").hide();
//        $("#btnVerDetalle").show(); //Depende del estado aprobación
//        $("#btnEliminar").show();
//        vcVista = "General";
//        vcTipos = $("#hdfGruTipSol").val();

//        $("#ddlFiltro option[value='7']").remove();

//        if (blQuitarFiltros == false) {
//            fnQuitarFiltroEstados();
//            fnAgregarFiltroEstados();
//            if ($("#hdfAdmin").val() == "0" && $("#hdfTecnico").val() == "0" && $("#hdfResApr").val() == "0") {
//                $("#grid").hideCol("EMPL_P_vcCODEMP");
//                $("#grid").hideCol("EMPL_vcNOMEMP");
//            }
//        }

//        if ($("#hdfAdmin").val() == "0" && $("#hdfTecnico").val() == "0" && $("#hdfResApr").val() == "0") {
//            $("#lblVista").html("Mis Solicitudes");
//        }
//        else {
//            $("#lblVista").html("General");
//        }


//    }

//    function fnVistaPendiente() {
//        $("#lblVista").html("Pendientes");
//        $("#grid").hideCol("cb");
//        $("#grid").hideCol("vcUsuTec");
//        $("#grid").hideCol("opUmbral");
//        $("#grid").hideCol("inDiaTra");
//        $("#grid").jqGrid('resetSelection');
//        $("#btnAprobar").hide();
//        $("#btnRechazar").hide();
//        $("#btnAsignar").hide();
//        $("#btnEditar").show();
//        $("#btnProcesar").hide();
//        $("#btnVerDetalle").hide();
//        $("#btnEliminar").show();
//        vcVista = "Pendiente";
//        vcTipos = $("#hdfGruTipSol").val();


//        fnQuitarFiltroEstados();

//    }
//    function fnVistaPorAprobar(blQuitarFiltros) {
//        $("#lblVista").html("Por Aprobar");

//        try {
//            $("#grid").showCol("cb");
//            $("#grid").hideCol("vcUsuTec");
//            $("#grid").showCol("opUmbral");
//            $("#grid").showCol("inDiaTra");
//        }
//        catch (err) {
//            //some err
//        }

//        if (blQuitarFiltros == false) {
//            $("#grid").jqGrid('resetSelection');
//        }
//        $("#btnAprobar").show();
//        $("#btnRechazar").show();
//        $("#btnAsignar").hide();
//        $("#btnEditar").hide();
//        $("#btnProcesar").hide();
//        $("#btnVerDetalle").show();
//        $("#btnVerDetalle").button("option", "disabled", true);
//        $("#btnEliminar").hide();
//        vcVista = "PorAprobar";
//        vcTipos = $("#hdfResAprTipSol").val();
//        if (blQuitarFiltros == false) {
//            fnQuitarFiltroEstados();
//        }
//    }
//    function fnVistaAprobada() {
//        $("#lblVista").html("Aprobadas");
//        $("#grid").hideCol("cb");
//        $("#grid").showCol("vcUsuTec");
//        $("#grid").hideCol("opUmbral");
//        $("#grid").hideCol("inDiaTra");
//        $("#grid").jqGrid('resetSelection');
//        $("#btnAprobar").hide();
//        $("#btnRechazar").hide();
//        $("#btnAsignar").hide();
//        $("#btnEditar").hide();
//        $("#btnProcesar").hide();
//        $("#btnVerDetalle").show();
//        $("#btnVerDetalle").button("option", "disabled", false);
//        $("#btnEliminar").hide();
//        vcVista = "Aprobada";
//        vcTipos = $("#hdfResAprTipSol").val();

//        $("#ddlFiltro option[value='7']").remove();
//        fnQuitarFiltroEstados();
//        fnAgregarFiltroEstadoProceso();
//    }
//    function fnVistaRechazada() {
//        $("#lblVista").html("Rechazadas");
//        $("#grid").hideCol("cb");
//        $("#grid").hideCol("vcUsuTec");
//        $("#grid").hideCol("opUmbral");
//        $("#grid").hideCol("inDiaTra");
//        $("#grid").jqGrid('resetSelection');
//        $("#btnAprobar").hide();
//        $("#btnRechazar").hide();
//        $("#btnAsignar").hide();
//        $("#btnEditar").hide();
//        $("#btnProcesar").hide();
//        $("#btnVerDetalle").show();
//        $("#btnVerDetalle").button("option", "disabled", false);
//        $("#btnEliminar").hide();
//        vcVista = "Rechazada";
//        vcTipos = $("#hdfResAprTipSol").val();

//        fnQuitarFiltroEstados();
//    }
//    function fnVistaPorAsignar(blQuitarFiltros) {
//        $("#lblVista").html("Por Asignar");

//        try {
//            $("#grid").showCol("cb");
//            $("#grid").hideCol("vcUsuTec");
//            $("#grid").showCol("opUmbral");
//            $("#grid").showCol("inDiaTra");
//        }
//        catch (err) {
//            //some err
//        }

//        if (blQuitarFiltros == false) {
//            $("#grid").jqGrid('resetSelection');
//        }
//        $("#btnAprobar").hide();
//        $("#btnRechazar").hide();
//        $("#btnAsignar").show();
//        $("#btnEditar").hide();
//        $("#btnProcesar").hide();
//        $("#btnVerDetalle").show();
//        $("#btnVerDetalle").button("option", "disabled", true);
//        $("#btnEliminar").hide();
//        vcVista = "PorAsignar";
//        vcTipos = $("#hdfUsuTipSol").val();
//        if (blQuitarFiltros == false) {
//            fnQuitarFiltroEstados();
//        }
//    }
//    function fnVistaEnProceso() {
//        $("#lblVista").html("En Proceso");
//        $("#grid").hideCol("cb");
//        $("#grid").showCol("vcUsuTec");
//        $("#grid").showCol("opUmbral");
//        $("#grid").showCol("inDiaTra");
//        $("#grid").jqGrid('resetSelection');
//        $("#btnAprobar").hide();
//        $("#btnRechazar").hide();
//        $("#btnAsignar").hide();
//        $("#btnEditar").hide();
//        $("#btnProcesar").show();
//        $("#btnVerDetalle").hide();
//        $("#btnEliminar").hide();
//        vcVista = "EnProceso";
//        vcTipos = $("#hdfUsuTipSol").val();

//        fnQuitarFiltroEstados();
//    }
//    function fnVistaCulminada() {
//        $("#lblVista").html("Culminadas");
//        $("#grid").hideCol("cb");
//        $("#grid").showCol("vcUsuTec");
//        $("#grid").hideCol("opUmbral");
//        $("#grid").hideCol("inDiaTra");
//        $("#grid").jqGrid('resetSelection');
//        $("#btnAprobar").hide();
//        $("#btnRechazar").hide();
//        $("#btnAsignar").hide();
//        $("#btnEditar").hide();
//        $("#btnProcesar").hide();
//        $("#btnVerDetalle").show();
//        $("#btnVerDetalle").button("option", "disabled", false);
//        $("#btnEliminar").hide();
//        vcVista = "Culminada";
//        vcTipos = $("#hdfUsuTipSol").val();

//        fnQuitarFiltroEstados();
//    }
//    function fnVistaAnulada() {
//        $("#lblVista").html("Anuladas");
//        $("#grid").hideCol("cb");
//        $("#grid").showCol("vcUsuTec");
//        $("#grid").hideCol("opUmbral");
//        $("#grid").hideCol("inDiaTra");
//        $("#grid").jqGrid('resetSelection');
//        $("#btnAprobar").hide();
//        $("#btnRechazar").hide();
//        $("#btnAsignar").hide();
//        $("#btnEditar").hide();
//        $("#btnProcesar").hide();
//        $("#btnVerDetalle").show();
//        $("#btnVerDetalle").button("option", "disabled", false);
//        $("#btnEliminar").hide();
//        vcVista = "Anulada";
//        vcTipos = $("#hdfUsuTipSol").val();

//        fnQuitarFiltroEstados();
//    }

//    function fnQuitarFiltroEstados() {
//        if ($('#rbtGeneral').is(':checked')) {
//            $("#ddlFiltro option[value='2']").remove();
//            $("#tdFecha").css("display", "block");
//        } else {
//            $("#ddlFiltro option[value='6']").remove();
//            $("#ddlFiltro option[value='7']").remove();
//            $("#ddlFiltro").append($('<option></option>').val('2').html('Rango de Fechas'));
//            $("#ddlFiltro").append($('<option></option>').val('6').html('Tipo de Solicitud'));
//            $("#ddlFiltro").append($('<option></option>').val('7').html('--Por Revisar--'));
//            $("#tdFecha").css("display", "none");
//        }
//        $("#ddlFiltro option[value='4']").remove();
//        $("#ddlFiltro option[value='5']").remove();

//        $("#grid").hideCol("vcNomEstApr");
//        $("#grid").hideCol("vcNomEst");

//        $("#ddlFiltro option[value='1']").prop('selected', true);
//        $("#divCodigo").show();
//    }

//    function fnAgregarFiltroEstados() {
//        $("#ddlFiltro").append($('<option></option>').val('4').html('Estados de Aprobación'));
//        $("#ddlFiltro").append($('<option></option>').val('5').html('Estados de Proceso'));
//        $("#ddlFiltro").append($('<option></option>').val('7').html('--Por Revisar--'));
//        $("#grid").showCol("vcNomEstApr");
//        $("#grid").showCol("vcNomEst");
//    }
//    function fnAgregarFiltroEstadoProceso() {
//        $("#ddlFiltro").append($('<option></option>').val('5').html('Estados de Proceso'));
//        $("#ddlFiltro").append($('<option></option>').val('7').html('--Por Revisar--'));
//        $("#grid").showCol("vcNomEst");
//    }

//    function AsignarRangoFechas() {
//        var dtmDayRangoFechaFin = new Date();
//        var dtmDayRangoFechaIni = new Date();
//        dtmDayRangoFechaIni = new Date(dtmDayRangoFechaFin.getTime() - (30 * 24 * 3600 * 1000));
//        dtmDayRangoFechaFin = (("0" + dtmDayRangoFechaFin.getDate()).slice(-2)) + "/" + (("0" + (dtmDayRangoFechaFin.getMonth() + 1)).slice(-2)) + "/" + dtmDayRangoFechaFin.getFullYear();
//        dtmDayRangoFechaIni = (("0" + dtmDayRangoFechaIni.getDate()).slice(-2)) + "/" + (("0" + (dtmDayRangoFechaIni.getMonth() + 1)).slice(-2)) + "/" + dtmDayRangoFechaIni.getFullYear();
//        $("#txtRangoFechaIni").val(dtmDayRangoFechaIni);
//        $("#txtRangoFechaFin").val(dtmDayRangoFechaFin);
//        if ($('#rbtGeneral').is(':checked')) {
//            var RangFecIni = $("#txtRangoFechaIni").val();
//            var RangFecFin = $("#txtRangoFechaFin").val();
//            vcRangoFechaIni = "";
//            if (RangFecIni != "")
//                vcRangoFechaIni = RangFecIni.substr(6, 4).toString() + RangFecIni.substr(3, 2).toString() + RangFecIni.substr(0, 2).toString() + " 00:00:00";
//            else
//                vcRangoFechaFin = "";
//            if (RangFecFin != "")
//                vcRangoFechaFin = RangFecFin.substr(6, 4).toString() + RangFecFin.substr(3, 2).toString() + RangFecFin.substr(0, 2).toString() + " 23:59:59";
//            else
//                vcRangoFechaFin = "";
//        } else {
//            vcRangoFechaIni = "";
//            vcRangoFechaFin = "";
//        }
//    }



//    $("#btnAgregar").live("click", function () {
//        pagina = "../Adm_NuevaSolicitud.aspx";
//        var Id = "#" + $("#hdfvcTab").val() + "_Tab_Nuevo";
//        var $panel = tab.find(Id);
//        if (!$panel.length) {//En el caso que no exista el tab, lo crea
//            tab.tabs("add", Id, "Nuevo");
//            $(Id).css("width", "99%");
//            $(Id).css("height", "92%");
//            $(Id).css("margin-top", "0px");
//            $(Id).css("margin-left", "0px");
//            $(Id).css("margin-bottom", "0px");
//            $(Id).css("margin-right", "0px");
//            $(Id).css("padding-top", "0px");
//            $(Id).css("padding-left", "0px");
//            $(Id).css("padding-bottom", "0px");
//            $(Id).css("padding-right", "0px");
//        }
//        else {//En el caso que exista lo muestra
//            tab.tabs('select', Id);
//        }
//    });

//    $("#btnEditar").live("click", function () {
//        fnEditarRegistro();
//    });

//    $("#btnVerDetalle").live("click", function () {
//        fnEditarRegistro();
//    });

//    $("#btnProcesar").live("click", function () {
//        fnEditarRegistro();
//    });

//    $("#btnEliminar").live("click", function () {
//        fnEliminarSolicitud();
//    });

//    $("#btnAprobar").live("click", function () {
//        fnAprobarSolicitud();
//    });

//    $("#btnRechazar").live("click", function () {
//        fnRechazarSolicitud();
//    });
//    $("#btnAsignar").live("click", function () {
//        fnAsignarseSolicitud();
//    });

//    function EditarRegistro(id) {
//        pagina = $("#btnEditar").attr("url");
//        if (pagina != "") {
//            idSeleccionado = id;
//            fnEditarRegistro();
//        }
//    }

//    function fnAprobarSolicitud() {
//        id = $("#grid").jqGrid('getGridParam', 'selarrrow');
//        if (id.length == 0) {
//            alerta("Seleccione por lo menos un registro");
//            return;
//        }

//        $('#divConApr').dialog({
//            title: "Aprobar Solicitud",
//            modal: true,
//            buttons: {
//                "Si": function () {
//                    $.ajax({
//                        type: "POST",
//                        url: "Adm_ListadoSolicitudes.aspx/AprobarSolicitud",
//                        data: "{'vcCodSol': '" + id + "', 'vcFecApro': ''}", //TipoOrigen
//                        contentType: "application/json; charset=utf-8",
//                        dataType: "json",
//                        success: function (result) {
//                            $("#grid").trigger("reloadGrid");
//                            Mensaje("<br/><h1>La solicitud fue aprobada con éxito</h1><br/>", document, CerroMensaje);
//                            fnCargarGrilla();
//                        },
//                        error: function (xhr, err, thrErr) {
//                            MostrarErrorAjax(xhr, err, thrErr);
//                        }
//                    });
//                    $(this).dialog("close");
//                },
//                "Cancelar": function () {
//                    $(this).dialog("close");
//                }
//            }
//        });
//    }

//    function fnRechazarSolicitud() {
//        id = $("#grid").jqGrid('getGridParam', 'selarrrow');
//        if (id.length == 0) {
//            alerta("Seleccione por lo menos un registro");
//            return;
//        }

//        $("#txtComentarios").val("");
//        $("#txtComentarios").focus();

//        $('#divConRec').dialog({
//            title: "Rechazar Solicitud",
//            modal: true,
//            buttons: {
//                "Si": function () {
//                    $(this).dialog("close");

//                    $('#dvRechazar').dialog({
//                        title: "Rechazar Solicitud",
//                        modal: true,
//                        width: 500,
//                        buttons: {
//                            "Rechazar": function () {
//                                if ($.trim($("#txtComentarios").val()) == "") {
//                                    alerta("Debe ingresar algún comentario");
//                                    return;
//                                }

//                                $.ajax({
//                                    type: "POST",
//                                    url: "Adm_ListadoSolicitudes.aspx/RechazarSolicitud",
//                                    data: "{'vcCodSol': '" + id + "'," +
//                                          "'vcComentarios':'" + $("#txtComentarios").val() + "'}", //TipoOrigen
//                                    contentType: "application/json; charset=utf-8",
//                                    dataType: "json",
//                                    success: function (result) {
//                                        $("#grid").trigger("reloadGrid");
//                                        Mensaje("<br/><h1>La solicitud fue rechazada con éxito</h1><br/>", document, CerroMensaje);
//                                        fnCargarGrilla();
//                                    },
//                                    error: function (xhr, err, thrErr) {
//                                        MostrarErrorAjax(xhr, err, thrErr);
//                                    }
//                                });
//                                $(this).dialog("close");
//                            },
//                            "Cancelar": function () {
//                                $(this).dialog("close");
//                            }
//                        }
//                    });
//                },
//                "Cancelar": function () {
//                    $(this).dialog("close");
//                }
//            }
//        });
//    }

//    function fnEliminarSolicitud() {
//        id = $("#grid").jqGrid('getGridParam', 'selarrrow');
//        if (id.length == 0) {
//            alerta("Seleccione por lo menos un registro");
//            return;
//        }

//        var datos = $("#grid").jqGrid('getRowData', id);

//        $('#divConEli').dialog({
//            title: "Eliminar Solicitud",
//            modal: true,
//            buttons: {
//                "Si": function () {
//                    $.ajax({
//                        type: "POST",
//                        url: "Adm_ListadoSolicitudes.aspx/EliminarSolicitud",
//                        data: "{'inCodSol': '" + id + "'," + //TipoOrigen
//                              "'inTipSol': '" + datos.inTipSol + "'}",
//                        contentType: "application/json; charset=utf-8",
//                        dataType: "json",
//                        success: function (result) {
//                            $("#grid").trigger("reloadGrid");
//                            Mensaje("<br/><h1>La solicitud fue eliminada con éxito</h1><br/>", document, CerroMensaje);
//                            fnCargarGrilla();
//                        },
//                        error: function (xhr, err, thrErr) {
//                            MostrarErrorAjax(xhr, err, thrErr);
//                        }
//                    });
//                    $(this).dialog("close");
//                },
//                "Cancelar": function () {
//                    $(this).dialog("close");
//                }
//            }
//        });
//    }

//    function fnEditarRegistro() {
//        var id = null;
//        var ids;
//        if (idSeleccionado == null) {
//            ids = $("#grid").jqGrid('getGridParam', 'selarrrow');
//            if (ids.length == 0) {
//                alerta("Seleccione un registro");
//                return;
//            } else {
//                id = ids[0];
//            }
//        } else {
//            id = idSeleccionado;
//        }
//        idSeleccionado = null;
//        var datos = $("#grid").jqGrid('getRowData', id);

//        //        if (datos.F_inEstSol == 9) {
//        //            alerta("Una solicitud 'Rechazada' no puede ser procesada.");
//        //            return;
//        //        }

//        if (id) {
//            //var IdTab = "#" + $("#hdfvcTab").val() + "_Tab_Editar";
//            var IdTab = "#" + $("#hdfvcTab").val() + "_Tab_Procesar";
//            var $panel = tab.find(IdTab);
//            var datos = $("#grid").jqGrid('getRowData', id);
//            var vcParametros = "?vcCodEmp=" + datos.EMPL_P_vcCODEMP + "&inTipSol=" + datos.inTipSol + "&biAdmin=" + $("#hdfAdmin").val() + "&biTecnico=" + $("#hdfTecnico").val() +
//                         "&biResApr=" + $("#hdfResApr").val() + "&inEst=" + datos.F_inEstSol + "&inEst_Apr=" + datos.F_inEstSol_Apr + "&vcTabla=" + datos.vcTabla + "&";

//            if (datos.biPersonalizado == "True" || datos.biPersonalizado == "SI")
//                pagina = "Adm_EditarSolicitudPersonalizada.aspx";
//            else {
//                //                if (datos.F_inEstSol == 7) {
//                //                    alerta("Una solicitud 'Culminada' no puede ser procesada");
//                //                    return;
//                //                }

//                //                if ($("#hdfAdmin").val() == "1")
//                //                    pagina = "Adm_ProcesarSolicitud.aspx";
//                //                else
//                pagina = "Adm_ProcesarSolicitud.aspx";
//            }
//            pagina = pagina + vcParametros;

//            if (pagina != "") {
//                if (!$panel.length) {//En el caso que no exista el tab, lo crea
//                    pagina += "Cod=" + id;
//                    //tab.tabs("add", IdTab, "Cambiar Estado");  //cambio
//                    tab.tabs("add", IdTab, "Procesar Solicitud");
//                    $(IdTab).css("width", "99%");
//                    $(IdTab).css("height", "94%");
//                    $(IdTab).css("margin-top", "0px");
//                    $(IdTab).css("margin-left", "0px");
//                    $(IdTab).css("margin-bottom", "0px");
//                    $(IdTab).css("margin-right", "0px");
//                    $(IdTab).css("padding-top", "0px");
//                    $(IdTab).css("padding-left", "0px");
//                    $(IdTab).css("padding-bottom", "0px");
//                    $(IdTab).css("padding-right", "0px");
//                } else {//En el caso que exista lo muestra
//                    if (vcCod == id) {//Si el codigo anterior seleccionado es igual al actual
//                        tab.tabs('select', IdTab);
//                        //tab.tabs("remove", $panel.index() - 1);
//                        //pagina += "?Cod=" + id;
//                        //tab.tabs("add", IdTab, "Editar igual");
//                        //$(IdTab).css("width", "99%");
//                        //$(IdTab).css("height", "94%");
//                        //$(IdTab).css("margin-top", "0px");
//                        //$(IdTab).css("margin-left", "0px");
//                        //$(IdTab).css("margin-bottom", "0px");
//                        //$(IdTab).css("margin-right", "0px");
//                        //$(IdTab).css("padding-top", "0px");
//                        //$(IdTab).css("padding-left", "0px");
//                        //$(IdTab).css("padding-bottom", "0px");
//                        //$(IdTab).css("padding-right", "0px");
//                        //tab.tabs('select', IdTab);
//                    } else {
//                        tab.tabs("remove", $panel.index() - 1);
//                        pagina += "Cod=" + id;
//                        tab.tabs("add", IdTab, "Procesar Solicitud");
//                        $(IdTab).css("width", "99%");
//                        $(IdTab).css("height", "94%");
//                        $(IdTab).css("margin-top", "0px");
//                        $(IdTab).css("margin-left", "0px");
//                        $(IdTab).css("margin-bottom", "0px");
//                        $(IdTab).css("margin-right", "0px");
//                        $(IdTab).css("padding-top", "0px");
//                        $(IdTab).css("padding-left", "0px");
//                        $(IdTab).css("padding-bottom", "0px");
//                        $(IdTab).css("padding-right", "0px");
//                    }
//                }
//            } else {
//                alerta("Usted no tiene permiso para editar/procesar esta solicitud.");
//            }
//            vcCod = id;
//        } else {
//            alerta("Seleccione un registro");
//        }
//    }

//    function fnAsignarseSolicitud() {
//        id = $("#grid").jqGrid('getGridParam', 'selarrrow');
//        var vcTit = 'Asignarse Solicitud';
//        var vcMen = 'La solicitud fue asignada con éxito'

//        if (id.length == 0) {
//            alerta("Seleccione por lo menos un registro");
//            return;
//        }

//        if (id.length > 1) {
//            var vcTit = 'Asignarse Solicitudes';
//            var vcMen = 'Las solicitudes fueron asignadas con éxito'
//        }

//        $('#divConAsi').dialog({
//            title: vcTit,
//            modal: true,
//            buttons: {
//                "Si": function () {
//                    $.ajax({
//                        type: "POST",
//                        url: "Adm_ListadoSolicitudes.aspx/AsignarseSolicitud",
//                        data: "{'vcCodSol': '" + id + "'}", //TipoOrigen
//                        contentType: "application/json; charset=utf-8",
//                        dataType: "json",
//                        success: function (result) {
//                            $("#grid").trigger("reloadGrid");
//                            Mensaje("<br/><h1>" + vcMen + "</h1><br/>", document, CerroMensaje);
//                            fnCargarGrilla();
//                        },
//                        error: function (xhr, err, thrErr) {
//                            MostrarErrorAjax(xhr, err, thrErr);
//                        }
//                    });
//                    $(this).dialog("close");
//                },
//                "Cancelar": function () {
//                    $(this).dialog("close");
//                }
//            }
//        });
//    }
});

//function fnCargarFiltroTipoSolicitud() {
//    if (inFiltro == 6 && vcVista == "General") {
//        $("#divTipoSolicitud").show();
//        $("#divTipoSolicitudTec").hide();
//        $("#divTipoSolicitudResApr").hide();
//    } else if (inFiltro == 6 && (vcVista == "Pendiente" || vcVista == "PorAprobar" || vcVista == "Aprobada" || vcVista == "Rechazada")) {
//        $("#divTipoSolicitud").hide();
//        $("#divTipoSolicitudTec").hide();
//        $("#divTipoSolicitudResApr").show();
//    } else if (inFiltro == 6 && (vcVista == "PorAsignar" || vcVista == "EnProceso" || vcVista == "Culminada" || vcVista == "Anulada")) {
//        $("#divTipoSolicitud").hide();
//        $("#divTipoSolicitudTec").show();
//        $("#divTipoSolicitudResApr").hide();
//    }
//}

//function fnIniciarFiltros() {
//    $("#txtCodigo").val("");
//    $("#txtFechaIni").val("");
//    $("#txtFechaFin").val("");
//    $("#txtEmpleado").val("");

//    $("#divCodigo").hide();
//    $("#divFecha").hide();
//    $("#divEmpleado").hide();
//    $("#divEstadoApr").hide();
//    $("#divEstadoPro").hide();
//    $("#divTipoSolicitud").hide();
//    $("#divTipoSolicitudTec").hide();
//    $("#divTipoSolicitudResApr").hide();
//}
