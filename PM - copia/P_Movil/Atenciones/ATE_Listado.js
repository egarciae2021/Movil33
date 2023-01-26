var MargenFiltro = 0;
var MargenHeight = 48;
var vcEstado = 0;
var TamanoPagina = [10, 20, 30];
var inFilas;
var inAltGrid;
var ale = true;
var seLLama = true;
var seg;
var vcTab;
var vcDesTab;
var vcLink;
var inSegRec;
var vcTipo;
var biAtencionesDeHoy = 1;

function ActualizarGrilla() {
    $("#grid").trigger("reloadGrid");
}

$(function () {

    inAltGrid = $(window).height() - 168 - MargenFiltro * MargenHeight;
    var Nametab = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
    var Accord = window.parent.$("#" + Nametab);

    function CerroMensaje() {
        BloquearPagina(false);
        Accord.tabs("remove", Accord.tabs("option", "selected"));
    }

    function NumeroInicialFilas() {
        var nuAltoFila = 23.04;
        inFilas = Math.floor(inAltGrid / nuAltoFila);
    }

    $("#hdfIdAtencion").val("0");

    $("#tbAcciones").buttonset();
    $("#tbEstados").buttonset();
    $("#tbAutomatico").buttonset();
    $(".ui-button-text").css({ padding: 4, width: 22 });
    $("#TabDetalle span.ui-icon-close").live("click", function () {
        var index = $("li", tab).index($(this).parent());
        tab.tabs("remove", index);
    });

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

    $("#btnVista").click(function () {
        var menu = $("#dvVistas").show().position({
            my: "left top",
            at: "left bottom",
            of: $("#btnVista")[0]
        });
        $(document).one("click", function () {
            menu.hide();
        });
        return false;
    });

    $("#chkAtencionesDeHoy").change(function () {
        if ($('#chkAtencionesDeHoy').is(':checked')) {
            biAtencionesDeHoy = 1;
        } else {
            biAtencionesDeHoy = 0;
        }

        ActualizarGrilla();
    });

    $("#rbtGeneral,#rbtPendiente,#rbtAsignada,#rbtLlamada,#rbtEnCurso,#rbtAtendida,#rbtCancelada,#rbtRetomada,#rbtDerivada").change(function () {
        if ($('#rbtGeneral').is(':checked')) {
            fnVistaGeneral();
            ActualizarGrilla();
        } else if ($('#rbtPendiente').is(':checked')) {
            fnVistaPendiente();
            ActualizarGrilla();
        } else if ($('#rbtAsignada').is(':checked')) {
            fnVistaAsignada();
            ActualizarGrilla();
        } else if ($('#rbtLlamada').is(':checked')) {
            fnVistaLlamada();
            ActualizarGrilla();
        } else if ($('#rbtEnCurso').is(':checked')) {
            fnVistaEnCurso();
            ActualizarGrilla();
        } else if ($('#rbtAtendida').is(':checked')) {
            fnVistaAtendida();
            ActualizarGrilla();
        } else if ($('#rbtCancelada').is(':checked')) {
            fnVistaCancelada();
            ActualizarGrilla();
        } else if ($('#rbtRetomada').is(':checked')) {
            fnVistaRetomada();
            ActualizarGrilla();
        } else if ($('#rbtDerivada').is(':checked')) {
            fnVistaDerivada();
            ActualizarGrilla();
        }
    });

    if ($("#hdfIdOperador").val() == "0" && $("#hdfEsSupervisor").val() == "0") { //Ni operador ni supervisor
        vcTipo = "Ninguno";
        window.scrollTo(0, 0);
        Mensaje("<br/><h1>No puede acceder a esta página debido a que usted no es un operador ni supervisor.</h1><br/>", document, CerroMensaje);
    } else if ($("#hdfIdOperador").val() == "0" && $("#hdfEsSupervisor").val() == "1") {//Sólo supervisor
        vcTipo = "Supervisor";
        $("#hdfIdVentanilla").val("0");
        $("#hdfEstadoVentanilla").val("0");
        $("#hdfOpcionVentanilla").val("0");
        $("#hdfTipoPausaVentanilla").val("0");
        $("#hdfEsAutomatico").val("0");

        fnCargarGrillaInicial();
        inicioPagina();
        fnAlerta();

        $("#btnAutomatico").hide();
        $("#btnManual").hide();
        $("#btnDisponibleVentanilla").hide();
        $("#btnPausaVentanilla").hide();
    }

    if ($("#hdfIdVentanilla").val() == "0" && $("#hdfIdOperador").val() != "0") {
        BloquearPagina(true);

        if ($("#hdfEsSupervisor").val() == "1") {
            vcTipo = "SupervisorOperador";
        } else {
            vcTipo = "Operador";
        }

        $("#eegAtenciones_btnExportarExcel").attr('disabled', 'disabled');
        $("#ddlVentanilla").attr('disabled', false);

        $('#divVen').dialog({
            title: "Elegir Ventanilla",
            modal: true,
            dialogClass: "no-close",
            closeOnEscape: false,
            buttons: {
                "Aceptar": function () {

                    if ($("#ddlVentanilla").val() == "-1") {
                        $("#lblMensaje").html("La ventanilla es requerida.");
                        return;
                    }

                    $.ajax({
                        type: "POST",
                        url: "ATE_Listado.aspx/AsignarVentanilla",
                        data: "{'IdOperador': '" + $("#hdfIdOperador").val() + "'," +
                              "'IdVentanilla':'" + $("#ddlVentanilla").val() + "'}", //TipoOrigen
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {

                            if (result.d.length > 0) {
                                var row = result.d[0];

                                $("#hdfIdVentanilla").val($("#ddlVentanilla").val());
                                $("#hdfIdVentanilla").val();
                                $("#hdfEstadoVentanilla").val("44");
                                $("#hdfOpcionVentanilla").val(row.IdOpcion);
                                $("#hdfTipoPausaVentanilla").val(row.IdTipoPausa);

                                if (row.Automatico == "True") {
                                    $("#hdfEsAutomatico").val("1");
                                }
                                else {
                                    $("#hdfEsAutomatico").val("0");
                                }

                                fnCargarGrillaInicial();
                                inicioPagina();

                                ObtenerAtencionAsignada();
                                seg = $("#hdfNumSegAteAct").val();
                                fnAlerta();

                                //if ($("#lbltotal").text().split(" ")[0] != "0" && $("#hdfIdOperador").val() == "1") {
                                //if ($("#hdfEsAutomatico").val() == "1") {    
                                //fnAlerta();
                                //}

                            } else {
                                Mensaje("<br/><h1>Hubo un error al intentar mostrar el listado, porfavor vuelva a intentarlo en unos minutos</h1><br/>", document, CerroMensaje);
                            }
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        }
                    });

                    $(this).dialog("close");
                }
            }
        });
    } else if ($("#hdfIdVentanilla").val() != 0 && $("#hdfIdOperador").val() != "0") {
        fnCargarGrillaInicial();
        inicioPagina();
        fnAlerta();
    }

    function CrearBotones(id) {
        var vcBotones = '<img id="btnAsignar_' + id + '" src="../../Common/Images/Mantenimiento/Asignar.png" alt="Asignar Atención" class="imgBtn asignar" title="Asignar Atención"/>';
        //vcBotones += ' <img id="btnAtender_' + id + '" src="../../Common/Images/Mantenimiento/Atender.png" alt="Atender Atención" class="imgBtn atender"title="Atender Atención"/>';
        vcBotones += ' <img id="btnRetomar_' + id + '" src="../../Common/Images/Mantenimiento/Regresar.png" alt="Retomar Atención" class="imgBtn retomar"title="Retomar Atención"/>';
        vcBotones += ' <img id="btnCancelar_' + id + '" src="../../Common/Images/Mantenimiento/Cancelar.png" alt="Cancelar Atención" class="imgBtn cancelar"title="Cancelar Atención"/>';

        return vcBotones;
    }
    var $txtFiltro = $("#txtFiltro");
    function fnCargarGrillaInicial() {

        if ($("#hdfIdVentanilla").val() != "0" || $("#hdfEsSupervisor").val() == "1") {
            var tbAtenciones = $("#grid").jqGrid({
                sortable: true,
                datatype: "local",
                datatype: function () {
                    //var dtInicio = new Date();
                    $txtFiltro.val($txtFiltro.val().replace(/\\/g, ""));
                    $.ajax({
                        url: "ATE_Listado.aspx/Listar", //PageMethod
                        data: "{'vcEstado':'" + vcEstado + "'," +
                      "'inFiltro':'" + $("#ddlFiltro").val() + "'," +
                      "'vcFiltro':'" + $("#txtFiltro").val().replace(/'/g, "&#39") + "'," +
                      "'inPagTam':'" + $('#grid').getGridParam("rowNum") + "'," +
                      "'inPagAct':'" + parseInt($('#grid').getGridParam("page")) + "'," +
                      "'vcOrdCol':'" + $('#grid').getGridParam("sortname") + "'," +
                      "'vcTipOrdCol':'" + $('#grid').getGridParam("sortorder") + "'," +
                      "'vcTipo':'" + vcTipo + "'," +
                      "'biAtencionesDeHoy':'" + biAtencionesDeHoy + "'}",
                        dataType: "json",
                        type: "post",
                        contentType: "application/json; charset=utf-8",

                        success: function (result) {
                            $("#grid")[0].addJSONData(result.d);
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
                id: "IdAtencion"
            },
            colModel: [{ name: 'IdAtencion', index: 'IdAtencion', label: 'IdAtencion', hidden: true, key: true },
                       { name: 'IdCliente', index: 'IdCliente', label: 'IdCliente', hidden: true, width: 110 },
                       { name: 'IdTipo', index: 'IdTipo', label: 'IdTipo', hidden: true, width: 130 },
                       { name: 'Opciones', index: 'Opciones', label: 'Opciones', hidden: false, width: 60, align: 'center', resizable: false, sortable: false,
                           formatter: function (value, options, rData) {
                               return CrearBotones(rData[0]);
                           }
                       },
                       { name: 'Codigo', index: 'Codigo', label: 'Código', hidden: false, width: 80 },
                       { name: 'vcVentanilla', index: 'vcVentanilla', label: 'Ventanilla', hidden: false, width: 70, align: 'Center' },
                       { name: 'IdUsuario', index: 'IdUsuario', label: 'IdUsuario', hidden: true, width: 80 },
                       { name: 'vcUsuario', index: 'vcUsuario', label: 'Usuario', hidden: false, width: 100 },
                       { name: 'EMPL_P_vcCODEMP', index: 'EMPL_P_vcCODEMP', label: 'Código Empleado', hidden: false, width: 80 },
                       { name: 'EMPL_vcNOMEMP', index: 'EMPL_vcNOMEMP', label: 'Nombre Empleado', hidden: false, width: 200 },
   		               { name: 'FechaInicio', index: 'FechaInicio', label: 'Fecha', hidden: false, width: 130 },
                       { name: 'IdModulo', index: 'IdModulo', label: 'IdModulo', hidden: true, width: 160 },
                       { name: 'vcModulo', index: 'vcModulo', label: 'Módulo', hidden: false, width: 200, align: 'left' },
                       { name: 'IdOpcionAtencion', index: 'IdOpcionAtencion', label: 'IdOpcionAtencion', hidden: true, align: 'left' },
                       { name: 'vcOpcion', index: 'vcOpcion', label: 'Opción', hidden: false, width: 200, align: 'left' },
                       { name: 'IdEstado', index: 'IdEstado', label: 'IdEstado', hidden: true, width: 150 },
                       { name: 'vcEstado', index: 'vcEstado', label: 'Estado', hidden: false, width: 100, align: 'Center' },
                       { name: 'IdOperador', index: 'IdOperador', label: 'IdOperador', hidden: true },
                       { name: 'vcOperador', index: 'vcOperador', label: 'Operador', hidden: false, width: 100 }
   	                  ],
            pager: "#pager", //Pager.
            loadtext: 'Cargando datos...',
            recordtext: "{0} - {1} de {2} elementos",
            emptyrecords: 'No hay resultados',
            pgtext: 'Pág: {0} de {1}', //Paging input control text format.
            rowNum: inFilas, //$("#hdfTamPag").val(), //"10" PageSize.
            rowList: TamanoPagina,  //TamanosPaginaSel, //Variable PageSize DropDownList. 
            sortname: "FechaInicio", //sortname: idTabla, //Default SortColumn
            sortorder: "desc", //Default SortOrder.
            rownumbers: true,
            shrinkToFit: false,
            onSelectRow: function (id) {
                var datos = $("#grid").jqGrid('getRowData', id);

                if ($('#rbtGeneral').is(':checked')) {
                    $("#btnCancelar").hide();
                    $("#btnLlamar").hide();
                }
            },
            afterInsertRow: function (rowid, aData, rowelem) {
                var datos = $("#grid").jqGrid('getRowData', rowid);

                //$("#hdfOpcionVentanilla")

                if ($('#rbtGeneral').is(':checked')) {

                    $("#btnAsignar_" + rowid).hide();
                    $("#btnRetomar_" + rowid).hide();
                    $("#btnCancelar_" + rowid).hide();

                    if ($("#hdfIdAtencion").val() != "0") {
                        if (datos.IdEstado == 48) { //Llamadas
                            $("#btnCancelar_" + rowid).show();
                        }
                        else if (datos.IdEstado == 58) { //Asignadas
                            $("#btnCancelar_" + rowid).show();
                        }
                    } else {
                        if (datos.IdEstado == 47 && datos.IdOpcionAtencion == $("#hdfOpcionVentanilla").val()) { //Pendientes
                            $("#btnAsignar_" + rowid).show();
                            $("#btnRetomar_" + rowid).hide();
                            $("#btnCancelar_" + rowid).hide();
                        } else if (datos.IdEstado == 58 && datos.IdOpcionAtencion == $("#hdfOpcionVentanilla").val()) { //Asignadas
                            $("#btnAsignar_" + rowid).hide();
                            $("#btnRetomar_" + rowid).hide();
                            $("#btnCancelar_" + rowid).hide();
                        } else if (datos.IdEstado == 48 && datos.IdOpcionAtencion == $("#hdfOpcionVentanilla").val()) { //Llamadas
                            $("#btnAsignar_" + rowid).hide();
                            $("#btnRetomar_" + rowid).hide();
                            $("#btnCancelar_" + rowid).show();
                        } else if (datos.IdEstado == 49 && datos.IdOpcionAtencion == $("#hdfOpcionVentanilla").val()) { //En Curso
                            $("#btnAsignar_" + rowid).hide();
                            $("#btnRetomar_" + rowid).hide();
                            $("#btnCancelar_" + rowid).hide();
                        } else if (datos.IdEstado == 50 && datos.IdOpcionAtencion == $("#hdfOpcionVentanilla").val()) { //Atendidas
                            $("#btnAsignar_" + rowid).hide();
                            $("#btnRetomar_" + rowid).hide();
                            $("#btnCancelar_" + rowid).hide();
                        } else if (datos.IdEstado == 51 && datos.IdOpcionAtencion == $("#hdfOpcionVentanilla").val()) { //Canceladas
                            $("#btnAsignar_" + rowid).hide();
                            $("#btnRetomar_" + rowid).show();
                            $("#btnCancelar_" + rowid).hide();
                        } else if (datos.IdEstado == 52 && datos.IdOpcionAtencion == $("#hdfOpcionVentanilla").val()) { //Retomadas
                            $("#btnAsignar_" + rowid).hide();
                            $("#btnRetomar_" + rowid).hide();
                            $("#btnCancelar_" + rowid).hide();
                        } else if (datos.IdEstado == 53 && datos.IdOpcionAtencion == $("#hdfOpcionVentanilla").val()) { //Derivadas
                            $("#btnAsignar_" + rowid).hide();
                            $("#btnRetomar_" + rowid).hide();
                            $("#btnCancelar_" + rowid).hide();
                        }
                    }
                }
            },
            beforeSelectRow: function (id, e) {
                return false;
            }
        }).navGrid("#pager", { edit: false, add: false, search: false, del: false });
    }
    fnVistaGeneral();
    fnColumnasSupervisor();
}

function fnColumnasSupervisor() {
    if ($("#hdfIdVentanilla").val() != "0" || $("#hdfEsSupervisor").val() == "1") {
        try {
            $("#grid").showCol("vcVentanilla");
        }
        catch (err) {
            //some err
        }
    }
    //    else if ($("#hdfIdVentanilla").val() != "0"){
    //        try {
    //            $("#grid").hideCol("vcVentanilla");
    //        }
    //        catch (err) {
    //            //some err
    //        }
    //    }
}

function inicioPagina() {
    BloquearPagina(false);
    $("#eegAtenciones_btnExportarExcel").attr('disabled', false);

    DimPosElementos();
    ValidacionesIniciales();
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
    $("#grid").setGridWidth($(window).width() - 31);
    $("#grid").setGridHeight(inAltGrid);
}

function ValidacionesIniciales() {
    inSegRec = $("#hdfNumSegAteAct").val();

    //Botones de tipo de atención Automático y Normal
    if ($("#hdfEsAutomatico").val() == "1") {
        $("#btnAutomatico").button("option", "disabled", true);
        $("#grid").hideCol("Opciones");
    } else {
        $("#btnManual").button("option", "disabled", true);
        $("#grid").showCol("Opciones");
    }

    fnActualizarBotonesVentanilla();

    //Botones de Estado de Operador
    if ($("#hdfEstadoOperador").val() == "54") {
        $("#btnDisponible").button("option", "disabled", true);
    }
    else {
        $("#btnPausa").button("option", "disabled", true);
    }
}

function fnAlerta() {
    setTimeout(function () {
        $("#divAte").toggleClass("ui-state-error", ale);
        ale = !ale;
        if (seLLama) {
            fnAlerta();
        }
        else {
            $("#divAte").removeClass("ui-state-error");
        }

        if (seg == parseInt(inSegRec)) {
            seg = 1;
            ObtenerAtencionAsignada();
            ActualizarGrilla();
        } else {
            seg = seg + 1;
        }
    }, 1000);
}

$("#ddlFiltro").change(function () {
    $("#txtFiltro").val("");
    ActualizarGrilla();
});
$("#txtFiltro").keyup(function () {
    if (event.keyCode == 13) {
        ActualizarGrilla();
    }
});

$("#divAte").click(function () {
    if (vcTab == "MOV_SOA_Ticket") {
        CambiarEstadoAtencion(49);
        AbrirTab(vcTab, vcDesTab, vcLink);
    }
    else if (vcTab == "MOV_CAM_CampanaDespacho" && $("#hdfEstadoAtencion").val() == "58") { //Asignada
        AbrirTab(vcTab, vcDesTab, vcLink); //Al grabar despacho, estado de atención pasa a Llamada
    }
    else if (vcTab == "MOV_CAM_CampanaDespacho" && $("#hdfEstadoAtencion").val() == "48") { //Llamada
        CambiarEstadoAtencion(49); //En Curso
    }
    else if (vcTab == "MOV_CAM_CampanaDespacho" && $("#hdfEstadoAtencion").val() == "49") { //En curso
        CambiarEstadoAtencion(50); //Atendida
    }

});

$("#btnAutomatico").click(function () {
    fnAutomatico("1");
});

$("#btnManual").click(function () {
    fnAutomatico("0");
});

$("#btnDisponible").click(function () {
    $.ajax({
        url: "ATE_TipoPausaOperador.aspx/CambiarEstado", //PageMethod
        data: "{'IdOperador':'" + $("#hdfIdOperador").val() + "'," +
                  "'IdEstado':'" + $("#hdfEstadoOperador").val() + "'," +
                  "'IdTipoPausa':'" + "-1" + "'," +
                  "'IdVentanilla':'" + $("#hdfIdVentanilla").val() + "'}",
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",

        success: function (result) {
            fnActualizarBotonesOperador($("#hdfEstadoOperador").val());
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
});

$("#btnPausa").click(function () {
    if ($("#btnDisponibleVentanilla").button("option", "disabled") == true) {
        alerta("Para pausar la actividad del Operador, la ventanilla debe también estar en pausa");
        return;
    }

    $('#ifTipoPausa').attr("src", "ATE_TipoPausaOperador.aspx?IdEstado=55&IdOperador=" + $("#hdfIdOperador").val() + "&IdVentanilla=" + $("#hdfIdVentanilla").val());
    formulario = $('#dvTipoPausa').dialog({
        title: "Tipo de Pausa de Operador",
        height: 140,
        width: 380,
        modal: true
    });
});

$("#btnDisponibleVentanilla").click(function () {
    $.ajax({
        url: "ATE_TipoPausaVentanilla.aspx/CambiarEstado", //PageMethod
        data: "{'IdVentanilla':'" + $("#hdfIdVentanilla").val() + "'," +
                  "'IdEstado':'" + $("#hdfEstadoVentanilla").val() + "'," +
                  "'IdTipoPausa':'" + "-1" + "'}",
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",

        success: function (result) {
            fnActualizarBotonesVentanilla($("#hdfEstadoVentanilla").val());
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
});

$("#btnPausaVentanilla").click(function () {
    $('#ifTipoPausa').attr("src", "ATE_TipoPausaVentanilla.aspx?IdEstado=46&IdVentanilla=" + $("#hdfIdVentanilla").val());
    formulario = $('#dvTipoPausa').dialog({
        title: "Tipo de Pausa de Ventanilla",
        height: 140,
        width: 380,
        modal: true
    });
});

//$("#btnAsignar").click(function () {
//    CambiarEstadoAtencion(58);
//});
//$("#btnAtender").click(function () {
//    CambiarEstadoAtencion(49);
//});
//$("#btnLlamar").click(function () {
//    CambiarEstadoAtencion(48);
//});

$(".asignar").live("click", function () {
    var id = $(this).attr("id").substr(11);
    var datos = $("#grid").jqGrid('getRowData', id);
    $("#hdfIdAtencion").val(datos.IdAtencion);
    $("#hdfEstadoAtencion").val(datos.IdEstado);

    CambiarEstadoAtencion(58);
});
//$(".atender").live("click", function () {
//    CambiarEstadoAtencion(49);
//});
$("#.retomar").live("click", function () {
    var id = $(this).attr("id").substr(11);
    var datos = $("#grid").jqGrid('getRowData', id);
    $("#hdfIdAtencion").val(datos.IdAtencion);
    $("#hdfEstadoAtencion").val(datos.IdEstado);

    CambiarEstadoAtencion(58);
});
$("#.cancelar").live("click", function () {
    CambiarEstadoAtencion(51);
});

function ObtenerAtencionAsignada() {
    $.ajax({
        url: "ATE_Listado.aspx/ObtenerAtencionAsignada", //PageMethod
        data: "{'IdOperador':'" + $("#hdfIdOperador").val() + "'," +
                          "'IdVentanilla':'" + $("#hdfIdVentanilla").val() + "'}",
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {

            var row = result.d[0];
            $("#hdfEstadoVentanilla").val(row.inEstVen);
            $("#hdfEstadoOperador").val(row.inEstOpe);

            if (result.d.length > 1) {// && $("#hdfEsAutomatico").val() == "1"
                row = result.d[1];
                $("#divAte").show();
                $("#hdfIdAtencion").val(row.IdAtencion);
                $("#hdfEstadoAtencion").val(row.IdEstado);

                $("#lbltotal").html("Atención " + row.Codigo + " " + row.vcEstado);

                vcTab = row.vcTab;
                vcDesTab = row.vcDesTab;
                vcLink = row.vcTabAte + row.vcPar;
            } else {
                $("#hdfIdAtencion").val("0");
                $("#hdfEstadoAtencion").val("0");
                $("#lbltotal").html("");
                $("#divAte").hide();
                vcTab = "";
                vcDesTab = "";
                vcLink = "";
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function CambiarEstadoAtencion(IdEstado) {
    var datos;
    if ($("#hdfIdAtencion").val() == "0") {
        alerta("El código de atención no es válido.");
        return;
    }

    $.ajax({
        url: "ATE_Listado.aspx/CambiarEstadoAtencion", //PageMethod
        data: "{'IdAtencion':'" + $("#hdfIdAtencion").val() + "'," +
                  "'IdEstado':'" + IdEstado + "'," +
                  "'IdOperador':'" + $("#hdfIdOperador").val() + "'," +
                  "'IdVentanilla':'" + $("#hdfIdVentanilla").val() + "'," +
                  "'IdGenerado':'" + "" + "'}",
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            //ActualizarGrilla();
            seg = parseInt(inSegRec);
            fnAlerta();
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnAutomatico(esAutomatico) {
    $.ajax({
        url: "ATE_Listado.aspx/CambiarAutomatico", //PageMethod
        data: "{'IdVentanilla':'" + $("#hdfIdVentanilla").val() + "'," +
                  "'vcEsAutomatico':'" + esAutomatico + "'," +
                  "'IdOperador':'" + $("#hdfIdOperador").val() + "'," +
                  "'IdEstado':'" + $("#hdfEstadoVentanilla").val() + "'}",
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",

        success: function (result) {
            if (esAutomatico == "1") {
                $("#btnAutomatico").button("option", "disabled", true);
                $("#btnManual").button("option", "disabled", false);
                $("#btnAsignar").button("option", "disabled", true);
                $("#grid").hideCol("Opciones");
                $("#hdfEsAutomatico").val("1");

                ObtenerAtencionAsignada();

            } else {
                $("#btnAutomatico").button("option", "disabled", false);
                $("#btnManual").button("option", "disabled", true);
                $("#btnAsignar").button("option", "disabled", false);
                $("#grid").showCol("Opciones");
                $("#hdfEsAutomatico").val("0");

                //$("#divAte").hide();
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function AbrirTab(tab, descripcion, pagina) {
    var tab1 = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;

    var Accord = window.parent.$("#" + tab1);

    var Id = "#" + tab;
    var $panel = Accord.find(Id);
    if (!$panel.length) {//En el caso que no exista el tab, lo crea
        var Titulo = descripcion;
        window.parent.pagina = pagina;
        Accord.tabs("add", Id, Titulo);
        window.parent.$(Id).css("width", "99%");
        window.parent.$(Id).css("height", "94%");
        window.parent.$(Id).css("margin-top", "0px");
        window.parent.$(Id).css("margin-left", "0px");
        window.parent.$(Id).css("margin-bottom", "0px");
        window.parent.$(Id).css("margin-right", "0px");
        window.parent.$(Id).css("padding-top", "0px");
        window.parent.$(Id).css("padding-left", "0px");
        window.parent.$(Id).css("padding-bottom", "0px");
        window.parent.$(Id).css("padding-right", "0px");
    }
    else { //En el caso que exista lo muestra
        Accord.tabs('select', Id);
    }
}
});
function fnVistaGeneral() {
    $("#lblVista").html("General");
    $("#btnCancelar").show();
    $("#btnCancelar").button("option", "disabled", true);
    $("#btnRetomar").show();
    $("#btnRetomar").button("option", "disabled", true);
    $("#btnAtender").show();
    $("#btnAtender").button("option", "disabled", true);
    $("#btnLlamar").show();
    $("#btnLlamar").button("option", "disabled", true);
    $("#btnAsignar").show();
    $("#btnAsignar").button("option", "disabled", true);

    $("#grid").showCol("Opciones");

    vcEstado = 0;
}
function fnVistaPendiente() {
    $("#lblVista").html("Pendientes");
    $("#btnCancelar").show();
    $("#btnRetomar").hide();
    $("#btnAtender").hide();
    $("#btnLlamar").hide();
    $("#btnAsignar").show();
    $("#grid").hideCol("Opciones");
    vcEstado = 47;
}
function fnVistaAsignada() {
    $("#lblVista").html("Asignadas");
    $("#btnCancelar").show();
    $("#btnRetomar").hide();
    $("#btnAtender").hide();
    $("#btnLlamar").show();
    $("#btnAsignar").hide();
    $("#grid").hideCol("Opciones");
    vcEstado = 58;
}
function fnVistaLlamada() {
    $("#lblVista").html("Llamadas");
    $("#btnCancelar").show();
    $("#btnRetomar").hide();
    $("#btnAtender").show();
    $("#btnLlamar").hide();
    $("#btnAsignar").hide();
    $("#grid").hideCol("Opciones");
    vcEstado = 48;
}
function fnVistaEnCurso() {
    $("#lblVista").html("En Curso");
    $("#btnCancelar").show();
    $("#btnRetomar").hide();
    $("#btnAtender").hide();
    $("#btnLlamar").hide();
    $("#btnAsignar").hide();
    $("#grid").hideCol("Opciones");
    vcEstado = 49;
}
function fnVistaAtendida() {
    $("#lblVista").html("Atendidas");
    $("#btnCancelar").hide();
    $("#btnRetomar").hide();
    $("#btnAtender").hide();
    $("#btnLlamar").hide();
    $("#btnAsignar").hide();
    $("#grid").hideCol("Opciones");
    vcEstado = 50;
} 
function fnVistaCancelada() {
    $("#lblVista").html("Canceladas");
    $("#btnCancelar").hide();
    $("#btnRetomar").show();
    $("#btnAtender").hide();
    $("#btnLlamar").hide();
    $("#btnAsignar").hide();
    $("#grid").hideCol("Opciones");
    vcEstado = 51;
} 
function fnVistaRetomada() {
    $("#lblVista").html("Retomadas");
    $("#btnCancelar").hide();
    $("#btnRetomar").hide();
    $("#btnLlamar").hide();
    $("#btnAsignar").hide();
    $("#grid").hideCol("Opciones");
    vcEstado = 52;
}
function fnVistaDerivada() {
    $("#lblVista").html("Derivadas");
    $("#btnCancelar").hide();
    $("#btnRetomar").hide();
    $("#btnAtender").hide();
    $("#btnLlamar").hide();
    $("#btnAsignar").hide();
    $("#grid").hideCol("Opciones");
    vcEstado = 53;
}
function fnActualizarBotonesOperador(IdEstado) {
    if (IdEstado == "54") {
        $("#btnDisponible").button("option", "disabled", true);
        $("#btnPausa").button("option", "disabled", false);
        $("#hdfEstadoOperador").val("55");
    } else {
        $("#btnDisponible").button("option", "disabled", false);
        $("#btnPausa").button("option", "disabled", true);
        $("#hdfEstadoOperador").val("54");
    }
}
function fnActualizarBotonesVentanilla(IdEstado) {
    if (IdEstado == "44") {
        $("#hdfEstadoVentanilla").val("46");
    } else {
        $("#hdfEstadoVentanilla").val("44");
    }

    //Botones de tipo de pausa de Ventanilla
    fnActualizarTipoPausa($("#hdfTipoPausaVentanilla").val());
}

function fnActualizarTipoPausa(IdTipoPausa) {
    if (IdTipoPausa != "" && IdTipoPausa != "0") {
        $("#btnDisponibleVentanilla").button("option", "disabled", false);
        $("#btnPausaVentanilla").button("option", "disabled", true);
    } else {
        $("#btnDisponibleVentanilla").button("option", "disabled", true);
        $("#btnPausaVentanilla").button("option", "disabled", false);
    }
}