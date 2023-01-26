var arMeses = [{ valor: 1, mes: 'Enero' }, { valor: 2, mes: 'Febrero' }, { valor: 3, mes: 'Marzo' }, { valor: 4, mes: 'Abril' }, { valor: 5, mes: 'Mayo' }, { valor: 6, mes: 'Junio' }, { valor: 7, mes: 'Julio' }, { valor: 8, mes: 'Agosto' }, { valor: 9, mes: 'Septiembre' }, { valor: 10, mes: 'Octubre' }, { valor: 11, mes: 'Noviembre' }, { valor: 12, mes: 'Diciembre'}];
var arMesesShort = [{ valor: 1, mes: 'Ene' }, { valor: 2, mes: 'Feb' }, { valor: 3, mes: 'Mar' }, { valor: 4, mes: 'Abr' }, { valor: 5, mes: 'May' }, { valor: 6, mes: 'Jun' }, { valor: 7, mes: 'Jul' }, { valor: 8, mes: 'Ago' }, { valor: 9, mes: 'Sep' }, { valor: 10, mes: 'Oct' }, { valor: 11, mes: 'Nov' }, { valor: 12, mes: 'Dic'}];
var arValTipos = [];
var arNombreTipos = [];


var lstUbicaciones = [];
var contenidoTab = '';
//var tituloTab = '';
//var idTab = '';
//var arTablaTabs = [{ titulo: "Dispositivos Actuales", Contenido: "Dispositivos", orden: 10 },
//                    { titulo: "Dispositivos Disponibles", Contenido: "Galeria", orden: 20 },
//                    { titulo: "Servicios", Contenido: "Servicios", orden: 30 },
//                    { titulo: "Documentos Adjuntos", Contenido: "DocAdjuntos", orden: 40 },
//                    { titulo: "Declaracion", Contenido: "Condiciones", orden: 60 },
//                    { titulo: "Mensaje", Contenido: "Mensaje", orden: 50}];
//var arTabActivos = []; //dísp,galeria,servicios,adjuntos,condiciones
//var arTitulosTabs = ["Dispositivos Actuales", "Dispositivos Disponibles", "Servicios", "Documentos Adjuntos", "Declaracion", "Mensaje"];
//var arContenidoTabs = ["Dispositivos", "Galeria", "Servicios", "DocAdjuntos", "Condiciones", "Mensaje"];
//var arOrden = [10, 20, 30, 40, 60, 50];

var permiteLinea = false;
var tabPlanesVisible = true;
var arContenidos = []
var dataItem;
//SERVICIOS
var arServiciosActuales = [];
//AMPLIACION
var codOpeAutoCompPlanes = '';

function empleado() {
    this.P_vcCod;
    this.vcNom;
    this.vcVal;
};
$(function () {
    ////////////////////////////////////////////////////////
    ////-----------------------TABS-----------------------//
    //
    ////$("#tabDetalle").hide();
    //$(".tap").removeClass("tapSelect");
    //$("#tabSolicitud").addClass("tapSelect");
    //$("#detalleTabs > div").hide(0, function () {
    //    $("#pSelecSolicitud").fadeIn(200); //
    //});
    //
    ////eventos que permiten mostrar / ocultar tabs
    //$("#tabSolicitud").click(function () {
    //    $(".tap").removeClass("tapSelect");
    //    $("#tabSolicitud").addClass("tapSelect");
    //    $("#detalleTabs > div").hide(0, function () {
    //        $("#pSelecSolicitud").fadeIn(200); //div de la solicitud
    //    });
    //});
    //
    //$("#tabDetalle").click(function () {
    //    $(".tap").removeClass("tapSelect");
    //    $("#tabDetalle").addClass("tapSelect");
    //    $("#detalleTabs > div").hide(0, function () {
    //        $("#pSelecDetalle").fadeIn(200); //div del detalle
    //    });
    //});
    //
    ////animación a los tabs
    //$('.tap').hover(function () {
    //    $(this).animate({ marginRight: '10px', marginLeft: '30px' }, 300);
    //
    //}, function () {
    //    $(this).animate({ marginRight: '0px', marginLeft: '20px' }, 300);
    //});
    //
    //
    ////////////////////////////////////////////////////////



    //////////////////////////////      P R U E B A             /////////////////////////////////
    //var arValTipos = new Array;
    //var arNombreTipos = new Array;
    //$("#ddlMeses").removeClass("ui-widget-content ui-corner-all");
    //$("#ddlMeses").css("padding", "0px");
    //$("#ddlMeses").css("margin", "0px");
    //$("#ddlMeses").kendoComboBox({
    //    placeholder: "<Todos>",
    //    dataTextField: "mes",
    //    dataValueField: "valor",
    //    //template: '<input class="chkVista" type="checkbox" id="chkTip-${ data.valor }" /><label id="lblTip-${ data.valor }" for="chkTip-${ data.valor }">${ data.mes }</label>',
    //    //template: '<input class="chkTipos" type="checkbox" id="chkTip-${ data.valor }" /><label id="lblTip-${ data.valor }" >${ data.mes }</label>',
    //    //template: '<input class="chkVista" type="checkbox" id="chkTip-${ data.valor }" text="${ data.mes }"/>',
    //    template: '<input class="chkVista" type="checkbox" id="chkTip-${ data.valor }">${ data.mes }</input>',
    //    dataSource: arMeses,
    //    select: function (e) {
    //        e.sender._blur = function () { };
    //        var txt = e.item.text();
    //        arValTipos = [];
    //        arNombreTipos = [];
    //        for (var i = 0; i < arMeses.length; i++) {
    //            if ($("#chkTip-" + arMeses[i].valor).is(':checked')) {
    //                arValTipos.push(arMesesShort[i].valor);
    //                arNombreTipos.push(arMesesShort[i].mes);
    //            } else {
    //                arValTipos = jQuery.grep(arValTipos, function (value) {
    //                    return value != arMesesShort[i].valor;
    //                });
    //                arNombreTipos = jQuery.grep(arNombreTipos, function (value) {
    //                    return value != arMesesShort[i].mes;
    //                });
    //            };
    //        };
    //        e.sender._text = function () { return arNombreTipos.join(","); };
    //    },
    //    close: function (e) {
    //        //alert(arValTipos.join(','));
    //    }
    //});
    //////////////////////////////      F I N   P R U E B A     /////////////////////////////////

    $("input:checkbox,input:radio,input:file").uniform();

    $(".btnNormal").button({});
    //ActivarCombokendo("#ddlTipoSolicitud", "200");
    combokendoFormar("#ddlTipoSolicitud", "200");
    $("#ddlTipoSolicitud").data("kendoComboBox").select(-1);
    $("#btnEquiSol").hide();
    $("#btnAtras").hide();
    $("#btnSiguiente").hide();
    $("#btnFinalizar").hide();

    //$("#ddlTipoSolicitud").kendoComboBox({ enable: false });

    var dataGrilla = new kendo.data.DataSource({
        data: []
    });

    //TABS
    //var tbSolicitud = $("#tbSolicitud").tabs({
    //    select: function (event, ui) {
    //        var numTabs = $("#tbSolicitud").tabs("length");
    //        var tabActual = tbSolicitud.tabs('option', 'selected');
    //        var tabSeleccionado = ui.index;
    //        //alert("numero tabs = " + numTabs + "\n tab actual index = " + tabActual + " \n tab seleccionado index " + tabSeleccionado);
    //        if (tabSeleccionado == numTabs - 1) {
    //            $("#btnAtras").show();
    //            $("#btnSiguiente").hide();
    //            $("#btnFinalizar").show();
    //        } else if (tabSeleccionado == 0) {
    //            $("#btnAtras").hide();
    //            $("#btnSiguiente").show();
    //            $("#btnFinalizar").hide();
    //        } else {
    //            $("#btnAtras").show();
    //            $("#btnSiguiente").show();
    //            $("#btnFinalizar").hide();
    //        };
    //    },
    //    add: function (event, ui) {
    //        //$("#div" + contenidoTab).show();
    //        $(ui.panel).append($("#div" + contenidoTab).html());
    //        //nuevo
    //        $(".btnNormal").button({});
    //        switch (contenidoTab) {
    //            case ("Dispositivos"):
    //                grillaDispositivos();
    //                break;
    //            case ("Mensaje"):
    //                mensajeKendo();
    //                break;
    //            case ("Galeria"):
    //                var tipsol = $("#ddlTipoSolicitud").data("kendoComboBox").value();
    //                if (tipsol == 2) {
    //                    alert("cargando galeria");
    //                    var permLIn = permiteLinea ? '1' : '0';
    //                    $("#ifGaleria").attr("src", "Adm_GaleriaModDispositivos.aspx?vcCodEmp=" + $("#hdfCodEmpleado").val() + "&tipSol=" + tipsol + "&lin=" + permLIn);
    //                }
    //                break;
    //            case ("Servicios"):
    //                servicios();
    //                break;
    //            case ("Planes"):
    //                planes();
    //                tabPlanesVisible = true;
    //                break;
    //        }
    //    }
    //}); //FIN TABS

    //$("#tbSolicitud").tabs("option", "active", 1);
    //$("#txtEmpleado").focus();
    //$("#btnBusquedaEmpleado").click(function () {
    //    //alert($("#hdfCodEmpleado").val());
    //    //mostrar seleccion empleado
    //    var $width = 540;
    //    var $height = 500;
    //    var $Pagina = '../Consultar/Con_SeleccionArea.aspx?Tipo=2&Multiple=0';
    //    $("#ifSeleccionEmpleado").attr("src", $Pagina);
    //    Modal = $('#divSeleccionEmpleado').dialog({
    //        title: "Seleccionar Empleado",
    //        width: $width,
    //        height: $height,
    //        modal: true,
    //        resizable: false
    //    });
    //});

    function listarContenidosPorTipoSol(TipoSolicitud) {
        permiteLinea = false;
        $.ajax({
            type: "POST",
            url: "Registrar_Solicitud.aspx/ListarContenidos",
            data: "{'inTipSol': '" + TipoSolicitud + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                for (var k = 0; k < arContenidos.length; k++) {
                    //removerTab(arContenidos[k].contenido); //eliminar funcion removerTab
                    //ocultar todos los contenidos
                };
                arContenidos = [];
                var primerTab = '';
                //arIndexTabMostrados = [];
                if ($(result.d).length > 0) {
                    var ind = 0;
                    $("#divTabs").html('');
                    for (var i in result.d) {
                        arContenidos.push({ "index": ind, "titulo": result.d[i].Titulo, "contenido": result.d[i].Nombre });
                        if (result.d[i].Nombre == 'Planes') {
                            permiteLinea = true;
                        };
                        $("#divTabs").append('<div id="tab' + result.d[i].Nombre + '" class="tap tapSelect">' + result.d[i].Titulo + '</div>');
                        $("#tab" + result.d[i].Nombre).attr("tabIndex", ind);
                        //alert(ind + " -> " + result.d[i].Titulo + " - " + result.d[i].Nombre); //eliminar alert
                        if (ind == 0) { primerTab = result.d[i].Nombre };
                        ind = ind + 1;
                    };
                };
                /////////-----------TABS-------------///////////
                $(".tap").removeClass("tapSelect");
                $("#tab" + primerTab).addClass("tapSelect");
                $("#detalleTabs > div").hide(0, function () {
                    $("#div" + primerTab).fadeIn(200);
                });
                ////eventos que permiten mostrar / ocultar tabs
                //$(".tap").click(function () {
                //    clickTap($(this).attr("id").substring(3));
                //});
                $(".tap").bind(clickTap($(this).attr("id").substring(3)));

                //$(".tap").click(function () {
                //    var idtabselect = $(this).attr("id");
                //    $(".tap").removeClass("tapSelect");
                //    //$("#tabSolicitud").addClass("tapSelect");
                //    $(this).addClass("tapSelect");
                //    $("#detalleTabs > div").hide(0, function () {
                //        $("#div" + idtabselect.substring(3)).fadeIn(200);
                //    });
                //    //definir botnes navegacion segun tab seleccionado
                //    if (arContenidos.length == 1) {
                //        $("#btnAtras").hide();
                //        $("#btnSiguiente").hide();
                //        $("#btnFinalizar").show();
                //    } else {
                //        if (idtabselect == "tab" + arContenidos[0].contenido) {
                //            //alert("primero");
                //            $("#btnAtras").hide();
                //            $("#btnSiguiente").show();
                //            $("#btnFinalizar").hide();
                //        } else if (idtabselect == "tab" + arContenidos[arContenidos.length - 1].contenido) {
                //            //alert("ultimo");
                //            $("#btnAtras").hide();
                //            $("#btnSiguiente").hide();
                //            $("#btnFinalizar").show();
                //        } else {
                //            //alert("central");
                //            $("#btnAtras").show();
                //            $("#btnSiguiente").show();
                //            $("#btnFinalizar").hide();
                //        }
                //    }
                //});
                //animación a los tabs
                //$('.tap').hover(function () {
                //    $(this).animate({ marginRight: '10px', marginLeft: '30px' }, 300);
                //
                //}, function () {
                //    $(this).animate({ marginRight: '0px', marginLeft: '20px' }, 300);
                //});
                /////////-----------TABS-------------///////////

                //setear estado tabs
                $(".tap").each(function () {
                    var idcontrol = "#" + $(this).attr("id");
                    //alert("set -> " + idcontrol);
                    if ($(this).attr("id") != "tab" + primerTab) {
                        //$(this).unbind("click");
                        desactivarTap(idcontrol);
                    } else {
                        activarTap(idcontrol);
                    }
                });
                //fin desabilitar tabs

                //var idx = -1;
                //for (var i = 0; i < arContenidos.length; i++) {
                //    contenidoTab = arContenidos[i].contenido;
                //    creartab(arContenidos[i].contenido, arContenidos[i].titulo);
                //    idx = idx + 1;
                //    if (idx != 0) { arIndexTabMostrados.push(idx); };
                //};
                //tbSolicitud.tabs("option", "disabled", arIndexTabMostrados);

                if (arContenidos.length == 1) {
                    $("#btnAtras").hide();
                    $("#btnSiguiente").hide();
                    $("#btnFinalizar").show();
                } else {
                    $("#btnAtras").hide();
                    $("#btnSiguiente").show();
                    $("#btnFinalizar").hide();
                };
                //inicializacion de contenido de tabs
                //alert(primerTab);
                switch (primerTab) {
                    case ("Dispositivos"):
                        grillaDispositivos();
                        break;
                    case ("Mensaje"):
                        mensajeKendo();
                        break;
                    case ("Galeria"):
                        var tipsol = $("#ddlTipoSolicitud").data("kendoComboBox").value();
                        if (tipsol == 2) {
                            alert("cargando galeria" + " -- " + $("#hdfCodEmpleado").val());
                            var permLIn = permiteLinea ? '1' : '0';
                            $("#ifGaleria").attr("src", "Adm_GaleriaModDispositivos.aspx?vcCodEmp=" + $("#hdfCodEmpleado").val() + "&tipSol=" + tipsol + "&lin=" + permLIn);
                        }
                        break;
                    case ("Servicios"):
                        servicios();
                        break;
                    case ("Planes"):
                        planes();
                        tabPlanesVisible = true;
                        break;
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
        //alert(arContenidos[0].index + ", " + arContenidos[0].contenido + ", " + arContenidos[0].titulo);
    };
    //SET TABS
    var arIndexTabMostrados = [];
    var arTabMostrados = [];
    $("#ddlTipoSolicitud").change(function () {
        $("#btnEquiSol").hide();
        $("#lblMensajeVerificacion").text('');
        arServiciosActuales = [];
        //$("#btnSiguiente").button("option", "disabled", true);
        $("#btnSiguiente").unbind("click");
        var tipsol = $("#ddlTipoSolicitud").data("kendoComboBox").value();
        var index = $("#ddlTipoSolicitud").data("kendoComboBox").select();
        $("#hdfTipoSolicitud").val(tipsol);
        if (tipsol != 0) {
            if (tipsol == "2") { VerificaHabilitadoEmpleado($("#hdfCodEmpleado").val()) };
            listarContenidosPorTipoSol(tipsol);
            $("#dvTabs").show();
        } else {
            $("#lblMensajeVerificacion").text('');
            $("#dvTabs").hide();
        };
    }); //FIN SET TABS

    //BOTONES NAVEGACION
    $("#btnSiguiente").click(function () {
        $("#lblMensajeVerificacion").html("");
        var tipoSolicitud = $("#ddlTipoSolicitud").data("kendoComboBox").value();
        //-----tab actual
        var tabActualSel = $("#divTabs").find(".tapSelect");
        //alert("id: " + tabActualSel.attr("id") + "\nIndex: " + tabActualSel.attr("tabIndex"));
        var tabSelection = tabActualSel.attr("tabIndex");
        return;

        //var tabSelection = tbSolicitud.tabs('option', 'selected');
        //var tabMostrado = arContenidos[tabSelection].contenido;
        //if (tabMostrado == "Dispositivos" && (tipoSolicitud == "6" || tipoSolicitud == "7")) {
        //    CargarServiciosActuales($("#hdfLineaSel").val());
        //    if (tipoSolicitud == "6") { listarTipoServicio($("#hdfCuentaLinea").val(), $("#hdfLineaSel").val()); };
        //};
        if (arContenidos[tabSelection + 1].contenido == "Galeria") {
            $("#ifGaleria").attr("src", "");
            var permLIn = permiteLinea ? '1' : '0';
            var codModSel = $("#hdfCodModDisActual").val();
            $("#ifGaleria").attr("src", "Adm_GaleriaModDispositivos.aspx?vcCodEmp=" + $("#hdfCodEmpleado").val() + "&tipSol=" + tipoSolicitud + "&lin=" + permLIn + "&mod=" + codModSel);
        }
        if (tabMostrado == "Galeria") {
            var modelo = $("#ifGaleria")[0].contentWindow.enviarCodMod();
            var conLinea = $("#ifGaleria")[0].contentWindow.conLinea();
            //alert(conLinea);
            if (permiteLinea && !conLinea) {
                $("#MsgConfirmacionAvance").dialog({
                    title: "Confirmacion",
                    modal: true,
                    buttons: {
                        "Si": function () {
                            $(this).dialog("close");
                            //seguir sin solcitar linea
                            if (tabPlanesVisible == true) {
                                removerTab("Planes");
                                arContenidos = jQuery.grep(arContenidos, function (value) { return value.contenido != 'Planes' });
                                tabPlanesVisible = false;
                            };
                            arIndexTabMostrados = jQuery.grep(arIndexTabMostrados, function (value) { return value != tabSelection + 1; });
                            tbSolicitud.tabs("option", "disabled", arIndexTabMostrados);
                            tbSolicitud.tabs('option', 'selected', tabSelection + 1);
                        },
                        "No": function () {
                            $(this).dialog("close");
                        }
                    },
                    resizable: false
                });
            } else if (permiteLinea && conLinea) {
                if (!tabPlanesVisible) { //tabPlanes eliminado, volver a crear
                    contenidoTab = "Planes";
                    arContenidos.push({ contenido: "Planes", titulo: "Planes" });
                    arIndexTabMostrados.push(arContenidos.length - 1);
                    creartab("Planes", "Planes");
                    arIndexTabMostrados = jQuery.grep(arIndexTabMostrados, function (value) { return value != tabSelection + 1; });
                    tbSolicitud.tabs("option", "disabled", arIndexTabMostrados);
                    tbSolicitud.tabs('option', 'selected', tabSelection + 1);
                };
                arIndexTabMostrados = jQuery.grep(arIndexTabMostrados, function (value) { return value != tabSelection + 1; });
                tbSolicitud.tabs("option", "disabled", arIndexTabMostrados);
                tbSolicitud.tabs('option', 'selected', tabSelection + 1);
            } else if (!permiteLinea) {
                arIndexTabMostrados = jQuery.grep(arIndexTabMostrados, function (value) { return value != tabSelection + 1; });
                tbSolicitud.tabs("option", "disabled", arIndexTabMostrados);
                tbSolicitud.tabs('option', 'selected', tabSelection + 1);
            }
            $("#hdfCodModDis").val(modelo);
        } else {
            arIndexTabMostrados = jQuery.grep(arIndexTabMostrados, function (value) { return value != tabSelection + 1; });
            tbSolicitud.tabs("option", "disabled", arIndexTabMostrados);
            tbSolicitud.tabs('option', 'selected', tabSelection + 1);
        };
        if (arContenidos[tabSelection + 1].contenido == "Planes") {
            $("#lblOperadorLinea").text($("#hdfNombreOperador").val());
            $("#lblLineaAmp").text($("#hdfLineaSel").val());
            $("#lblPlanActual").text($("#hdfPlanLineaSel").val());
            if (tipoSolicitud == 7) {
                listarPlanes();
            }
            //if (tipoSolicitud != 7) {
            //    codOpeAutoCompPlanes = $("#ddlOperador").data("kendoComboBox").value();
            //} else {
            //    codOpeAutoCompPlanes = $("#hdfCodigoOperador").val();
            //};
        };
        if (arContenidos[tabSelection + 1].contenido == "Servicios") {
            cargarServicios_x_Grupo();
        };
    });
    $("#btnAtras").click(function () {
        tbSolicitud.tabs('option', 'selected', tbSolicitud.tabs('option', 'selected') - 1);
    });
    $("#btnFinalizar").click(function () {
        //alert("Envio de solicitud tipo " + $("#ddlTipoSolicitud").data("kendoComboBox").value());
        switch ($("#ddlTipoSolicitud").data("kendoComboBox").value()) {
            case "1":
                EnviarSolicitudCambio();
                break;
            case "2":
                EnviarSolicitudNuevo();
                break;
            case "3":
                EnviarSolicitudReposicion();
                break;
            case "4":
                EnviarSolicitudReparacion();
                break;
            case "6":
                EnviarSolicitudActivacion();
                break;
            case "7":
                EnviarSolicitudAmpliacion();
                break;
            default:
                alert("No se pudo completar en envio");
        };
        //ACCION FINAL
        //?????
    }); //FIN BOTONES NAVEGACION

    //BOTON EQUPO SOLICITADO
    $("#btnEquiSol").click(function () {
        var tipSol = $("#ddlTipoSolicitud").data("kendoComboBox").value();
        var vcCodEmp = $("#hdfCodEmpleado").val();
        var vcNumLin = $("#hdfLineaSel").val();
        var codIMEI = $("#hdfCodImeiSel").val();
        //alert(vcCodEmp + "\n" + vcNumLin + "\n" + codIMEI);
        $.ajax({
            type: "POST",
            url: "Registrar_Solicitud.aspx/ObtenerCodigoModelo",
            data: "{'vcCodEmp': '" + vcCodEmp + "'," +
                    "'vcCodIMEI': '" + codIMEI + "'," +
                    "'vcTipSol': '" + tipSol + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#ifEquipoSolic").attr("src", "Mantenimiento/Mnt_NuevoDispositivo.aspx?CodDis=" + result.d);
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
        $("#divDispSolicitado").dialog({
            title: "Dispositivo Solicitado",
            width: 505,
            height: 310,
            modal: true,
            resizable: false
        });
    });
    //FIN BOTON EQUIPO SOLICITADO

    function creartab(idtab, titulo) {
        var Id = '#tab' + idtab;
        var $panel = tbSolicitud.find(Id);
        if (!$panel.length) {//En el caso que no exista el tab, lo crea
            tbSolicitud.tabs("add", Id, titulo);
            $(Id).css("width", "99%");
            $(Id).css("height", "370px");
            $(Id).css("margin-top", "0px");
            $(Id).css("margin-left", "0px");
            $(Id).css("margin-bottom", "0px");
            $(Id).css("margin-right", "0px");
            $(Id).css("padding-top", "0px");
            $(Id).css("padding-left", "0px");
            $(Id).css("padding-bottom", "0px");
            $(Id).css("padding-right", "0px");
            $(Id).css("overflow", "auto");
        };
    };

    function removerTab(idtab) {
        var Id = '#tab' + idtab;
        var $panel = tbSolicitud.find(Id);
        if ($panel.length) {//En el caso que exista el tab, lo elimina
            tbSolicitud.tabs("remove", Id);
        };
    };

    //autocompletar empleado
    if ($("#txtEmpleado").length > 0) {
        var Selecciono = false;
        $("#txtEmpleado").autocomplete({
            minLength: 0,
            source: function (request, response) {
                $.ajax({
                    type: "POST",
                    url: "Registrar_Solicitud.aspx/ListarEmpleados",
                    data: "{'inMaxFil': '" + 200 + "'," +
                           "'vcNomEmp': '" + $("#txtEmpleado").val() + "'," +
                           "'inTipLin': '" + 1 + "'}", //inTipLin = 1 (empleados que perteneces a un grupo con tipo de linea staff)
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        if (result.d.length == 0) {
                            $("#hdfCodEmpleado").val('');
                            $("#hdfGrupOrigEmp").val('');
                            $("#ddlTipoSolicitud").data("kendoComboBox").enable(false);
                        }
                        //alert(result.d[0]);
                        //var item = result.d[0].split('-');
                        response($.map(result.d, function (item) {
                            var itemE = item.split("-");
                            return {
                                label: itemE[1],
                                vcCodEmp: itemE[0],
                                grupOri: itemE[2]
                            }
                        }));
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },
            focus: function (event, ui) {
                $("#txtEmpleado").val(ui.item.label);
                //alert(3);
                return false;
            },
            select: function (event, ui) {
                Selecciono = true;
                $("#txtEmpleado").val(ui.item.label);
                $("#hdfCodEmpleado").val(ui.item.vcCodEmp);
                $("#hdfGrupOrigEmp").val(ui.item.grupOri);
                $("#ddlTipoSolicitud").data("kendoComboBox").value(-1);
                $("#ddlTipoSolicitud").data("kendoComboBox").enable(true);
                $("#dvTabs").hide();
                $("#lblMensajeVerificacion").text('');
                $("#btnEquiSol").hide();
                return false;
            },
            change: function (event, ui) {
                if (!Selecciono) {
                    $("#hdfCodEmpleado").val("");
                    $("#txtEmpleado").val("");
                    $("#hdfGrupOrigEmp").val("");
                    $("#ddlTipoSolicitud").data("kendoComboBox").select("-1");
                    $("#ddlTipoSolicitud").data("kendoComboBox").enable(false);
                    $("#dvTabs").hide();
                    $("#lblMensajeVerificacion").text('');
                    $("#btnEquiSol").hide();
                }
                return false;
            },
            open: function (event, ui) {
                Selecciono = false;
                return false;
            }
        }).data("autocomplete")._renderItem = function (ul, item) {
            return $("<li></li>")
			    .data("item.autocomplete", item)
			    .append("<a>" + item.vcCodEmp + "=" + item.label + "</a>")
			    .appendTo(ul);
        };
    };
    //fin autocompletar empleado

});                                                                                                                                         //FIN INICIO

//FUNCIONES CARGA
function CargarDispositivos(Empleado) {
    if (Empleado != "") {
        $.ajax({
            type: "POST",
            url: "Registrar_Solicitud.aspx/ListarDispositivos",
            data: "{'vcCodEmp': '" + Empleado + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if ($(result.d).length > 0) {
                    for (var i in result.d) {
                        var estadoMod = result.d[i][0].ModeloDispositivo.btVig ? "Activo" : "Inactivo";
                        var numrpm = result.d[i][0].rpm ? result.d[i][0].rpm : "No Disponible";
                        var planLinea = result.d[i][2].vcNom ? result.d[i][2].vcNom : "No Disponible";
                        var dtFecUltCam = new Date(parseInt(result.d[i][0].dtFecUltCam.substring(6, 19)));
                        var dtFecProCam = new Date(parseInt(result.d[i][0].dtFecProCam.substring(6, 19)));
                        var FecUltCam = dtFecUltCam.getDate() + "/" + dtFecUltCam.getMonth() + "/" + dtFecUltCam.getFullYear();
                        var FecProCam = dtFecProCam.getDate() + "/" + dtFecProCam.getMonth() + "/" + dtFecProCam.getFullYear();
                        $("#grillaDispositivos").data("kendoGrid").dataSource.add({
                            numero: result.d[i][0].vcNum,
                            modelo: $.trim(result.d[i][0].ModeloDispositivo.vcNom),
                            rpm: numrpm,
                            estado: estadoMod,
                            imgmodelo: result.d[i][0].ModeloDispositivo.vcRutArc,
                            ultfeccambio: FecUltCam,
                            tnecesario: result.d[i][0].inNumMesProCam,
                            cambiodesde: FecProCam,
                            minutos: result.d[i][0].inMin,
                            plan: planLinea,
                            cuenta: result.d[i][1].P_vcCod,
                            codIMEI: result.d[i][0].P_vcCodIMEI,
                            codOper: result.d[i][2].Operador.P_inCodOpe,
                            nomOper: result.d[i][2].Operador.vcNomOpe,
                            codModDis: result.d[i][0].ModeloDispositivo.P_inCod
                        });
                    };
                };
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    };
};

//function detailInit(e) {
//    var detailRow = e.detailRow;
//    detailRow.find(".tabstrip").kendoTabStrip({
//        animation: {
//            open: { effects: "fadeIn" }
//        }
//    });
//};

function CargarServiciosActuales(Linea) {
    if (Linea != "") {
        $.ajax({
            type: "POST",
            url: "Registrar_Solicitud.aspx/MostrarServiciosActuales",
            data: "{'vcLin': '" + Linea + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if ($(result.d).length > 0) {
                    for (var i in result.d) {
                        var dcCantidad = result.d[i].dcCan;
                        if (result.d[i].dcCan == "0") { dcCantidad = "Ilimitado"; };
                        $("#tbServActuales").data("kendoGrid").dataSource.add({
                            codigo: result.d[i].P_inCod,
                            servicio: result.d[i].vcNom,
                            cantidad: dcCantidad
                        });
                    };
                };
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    };
};

function listarTipoServicio(codcue, codlin) {
    $.ajax({
        type: "POST",
        url: "Registrar_Solicitud.aspx/ListarServiciosTipoNoUsados",
        data: "{'CodCue': '" + codcue + "','CodLin':'" + codlin + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            lstServicioTipo = result.d;
            $("#ddlServicio").html("");
            $("#ddlTipoServicio").html("");
            var itemsTip = [];
            if ($(lstServicioTipo).length > 0) {
                itemsTip.push({ text: "--Seleccione--", value: "-1" });
                $(lstServicioTipo).each(function () {
                    itemsTip.push({ text: this.vcNom, value: this.P_inCod });
                    //alert("text: " + this.vcNom + ", value: " + this.P_inCod);
                });
            } else {
                itemsTip.push({ text: "Sin datos", value: "-2" });
            };
            var comboTipoDataSource = new kendo.data.DataSource({ data: itemsTip });
            $("#ddlTipoServicio").data("kendoComboBox").setDataSource(comboTipoDataSource);
            $("#ddlTipoServicio").data("kendoComboBox").select(0)
            var comboServDataSource = new kendo.data.DataSource({ data: [{ text: "--Sin datos--", value: "-2"}] });
            $("#ddlServicio").data("kendoComboBox").setDataSource(comboServDataSource);
            $("#ddlServicio").data("kendoComboBox").select(0)
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
};

function listarServicios(CodCue, CodLin, CodTipServ) {
    //alert(CodCue + ", " + CodLin + ", " + CodTipServ);
    $.ajax({
        type: "POST",
        url: "Registrar_Solicitud.aspx/ListarServicios_NoUsados",
        data: "{'CodCue': '" + CodCue + "','CodLin':'" + CodLin + "','CodTipServ':'" + CodTipServ + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            lstServicio = result.d;
            var itemsServ = [];
            $("#ddlServicio").html("");
            if ($(lstServicio).length > 0) {
                itemsServ.push({ text: "--Todos--", value: "-1" });
                $(lstServicio).each(function () {
                    itemsServ.push({ text: this.vcNom, value: this.P_inCod });
                });
            } else {
                itemsServ.push({ text: "--Sin datos--", value: "-2" });
            };
            var comboServDataSource = new kendo.data.DataSource({ data: itemsServ });
            $("#ddlServicio").data("kendoComboBox").destroy();
            combokendoFormar("#ddlServicio", 200);
            $("#ddlServicio").data("kendoComboBox").setDataSource(comboServDataSource);
            $("#ddlServicio").data("kendoComboBox").select(0);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
};

function listarOperadores() {
    $.ajax({
        type: "POST",
        url: "Registrar_Solicitud.aspx/ListarOperadores",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var itemsOpe = [];
            if ($(result.d).length > 0) {
                itemsOpe.push({ text: "--Seleccione--", value: "-1" });
                $(result.d).each(function () {
                    itemsOpe.push({ text: this.vcNomOpe, value: this.P_inCodOpe });
                });
            } else {
                itemsOpe.push({ text: "Sin datos", value: "-2" });
            };
            var dataSourceOpe = new kendo.data.DataSource({ data: itemsOpe });
            $("#ddlOperador").data("kendoComboBox").setDataSource(dataSourceOpe);
            $("#ddlOperador").data("kendoComboBox").select(0)
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
};

function listarPlanes() {
    codOpeAutoCompPlanes = $("#ddlTipoSolicitud").data("kendoComboBox").value() == 7 ? $("#hdfCodigoOperador").val() : $("#ddlOperador").data("kendoComboBox").value();
    //alert($("#hdfCodModDis").val() + ", " + codOpeAutoCompPlanes);
    $.ajax({
        type: "POST",
        url: "Registrar_Solicitud.aspx/ListarPlanesPorOperadorPorModelo",
        data: "{'inCodOpe': '" + codOpeAutoCompPlanes + "'," +
                "'inCodMod': '" + $("#hdfCodModDis").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var itemsPlan = [];
            if ($(result.d).length > 0) {
                itemsPlan.push({ text: "--Seleccione--", value: "-1" });
                $(result.d).each(function () {
                    if (this.F_inCodOpe == codOpeAutoCompPlanes) {
                        itemsPlan.push({ text: this.vcNom, value: this.P_inCod });
                    };
                });
            } else {
                itemsPlan.push({ text: "Sin datos", value: "-2" });
            };
            var dataSourcePlan = new kendo.data.DataSource({ data: itemsPlan });
            $("#ddlPlan").data("kendoComboBox").setDataSource(dataSourcePlan);
            $("#ddlPlan").data("kendoComboBox").select(0)
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
};

function cargarServicios_x_Grupo() {
    var linea = $("#hdfLineaSel").val();
    var codemp = $("#hdfCodEmpleado").val();
    $.ajax({
        type: "POST",
        url: "Registrar_Solicitud.aspx/ListarServicios",
        data: "{'codEmp': '" + codemp + "'," +
                "'lin': '" + linea + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if ($(result.d).length != 0) {
                var item1 = result.d[0].split("-");
                $("#lblLinea").text($("#hdfLineaSel").val());
                $("#lblOperador").text(item1[3]);
                $("#lblGrupoOrigen").text(item1[2]);
                var dataItems = [];
                $(result.d).each(function () {
                    var itemS = this.split("-");
                    var costo;
                    if (itemS[6] != '') {
                        //costo = FormatoNumero(itemS[6],$("#hdfSepMiles").val(),$("#hdfSepDecimal").val(),$("#hdfNumDecimales").val());
                        costo = itemS[6];
                    }
                    if (itemS[6] == 0) {
                        costo = 'Sin costo';
                    }
                    if (itemS[6] == '') {
                        costo = '';
                    }
                    //itemS[7] -> activo
                    dataItems.push({ codigo: itemS[4], servicio: itemS[0], descripcion: itemS[5], activar: itemS[1], costo: costo, estado: itemS[7] });
                });
            } else {
                alert("No se encontraron servicio disponibles");
                dataItems = [];
            };
            var kendoDataServicios = new kendo.data.DataSource({ data: dataItems });
            $("#tbServicios").data("kendoGrid").setDataSource(kendoDataServicios);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
};
//FIN FUNCIONES CARGA

//FUNCIONES VALIDACION
function validarSeleccionGrilla(dataSeleccion) {
    var tipsol = $("#ddlTipoSolicitud").data("kendoComboBox").value();
    switch (tipsol) {
        case ("1"): //cambio
            $("#hdfLineaSel").val(dataSeleccion.numero);
            $("#hdfCodImeiSel").val(dataSeleccion.codIMEI);
            $("#hdfCodModDisActual").val(dataSeleccion.codModDis);
            VerificaHabilitado(dataSeleccion.codIMEI);
            break;
        case ("3"): //reposicion
            $("#hdfLineaSel").val(dataSeleccion.numero);
            $("#hdfCodImeiSel").val(dataSeleccion.codIMEI)
            VerificaHabilitado(dataSeleccion.codIMEI);
            break;
        case ("4"): //reparacion
            $("#hdfCodModDis").val(dataSeleccion.codIMEI);
            $("#btnSiguiente").button("option", "disabled", false);
            break;
        case ("6"): //activacion
            if (dataSeleccion.numero == "Dispositivo sin línea") {
                $("#lblMensajeVerificacion").html("Dispositivo no cuenta con línea");
                $("#btnSiguiente").button("option", "disabled", true);
            } else {
                $("#lblMensajeVerificacion").html("");
                $("#btnSiguiente").button("option", "disabled", false);
                $("#hdfLineaSel").val(dataSeleccion.numero);
                $("#hdfCuentaLinea").val(dataSeleccion.cuenta);
                $("#lblLineaSel").text(dataSeleccion.numero);
            };
            break;
        case ("7"): //ampliacion
            if (dataSeleccion.numero == "Dispositivo sin línea") {
                $("#lblMensajeVerificacion").html("Dispositivo no cueneta con línea");
                $("#btnSiguiente").button("option", "disabled", true);
            } else {
                $("#lblMensajeVerificacion").html("");
                $("#btnSiguiente").button("option", "disabled", false);
                //$("#hdfCuentaLinea").val(dataSeleccion.cuenta);
                $("#hdfPlanLineaSel").val(dataSeleccion.plan)
                $("#hdfLineaSel").val(dataSeleccion.numero);
                $("#hdfCodigoOperador").val(dataSeleccion.codOper);
                $("#hdfNombreOperador").val(dataSeleccion.nomOper);
                $("#hdfCodModDis").val(dataSeleccion.codModDis);
            };
            break;
        default:
            alert("Error al seleccionar tipo de solicitud, recargue la pagina");
    };
};

function VerificaHabilitado(Dispositivo) {
    if ($("#ddlTipoSolicitud").data("kendoComboBox").value() == "1") {
        $.ajax({
            type: "POST",
            url: "Registrar_Solicitud.aspx/VerificaLineaEmpleadoCambio",
            data: "{'dcNumLin': '" + Dispositivo + "'," +
                       "'vcCodEmp': '" + $("#hdfCodEmpleado").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#btnEquiSol").hide();
                $("#lblMensajeVerificacion").text('');
                if (result.d == "1") {
                    $("#lblMensajeVerificacion").html("Hubo un problema al verificar la linea");
                    //$("#btnSiguiente").button("option", "disabled", true);
                    $("#btnSiguiente").unbind("click");
                }
                else if (result.d == "2") {
                    $("#lblMensajeVerificacion").html("Ya existe una solicitud para este equipo");
                    //$("#btnSiguiente").button("option", "disabled", true);
                    $("#btnSiguiente").unbind("click");
                    $("#btnEquiSol").show();
                }
                else if (result.d == "3") {
                    $("#lblMensajeVerificacion").html("No ha cumplido el tiempo minimo para realizar cambio de equipo");
                    //$("#btnSiguiente").button("option", "disabled", true);
                    $("#btnSiguiente").unbind("click");
                }
                else if (result.d == "4") {
                    $("#lblMensajeVerificacion").html("Usted no está incluido en ninguna política");
                    //$("#btnSiguiente").button("option", "disabled", true);
                    $("#btnSiguiente").unbind("click");
                }
                else {
                    $("#lblMensajeVerificacion").html("Sólo se mostrarán los modelos compatibles al plan del equipo seleccionado");
                    //$("#btnSiguiente").button("option", "disabled", false);
                    //$("#btnSiguiente").bind("click"); //, bsiguiente());
                    $("#btnSiguiente").click(bsiguiente);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    } else if ($("#ddlTipoSolicitud").data("kendoComboBox").value() == "3") {
        $.ajax({
            type: "POST",
            url: "Registrar_Solicitud.aspx/VerificaLineaEmpleadoReposicion",
            data: "{'dcNumLin': '" + Dispositivo + "'," +
                       "'vcCodEmp': '" + $("#hdfCodEmpleado").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#btnEquiSol").hide();
                $("#lblMensajeVerificacion").html("");
                if (result.d == "1") {
                    $("#lblMensajeVerificacion").html("Hubo un problema al verificar la linea. Linea no corresponde al empleado.");
                    $("#btnSiguiente").button("option", "disabled", true);
                }
                else if (result.d == "2") {
                    $("#lblMensajeVerificacion").html("Ya existe una solicitud para este equipo");
                    $("#btnSiguiente").button("option", "disabled", true);
                    $("#btnEquiSol").show();
                }
                else if (result.d == "3") {
                    $("#lblMensajeVerificacion").html("Usted no está incluido en ninguna política");
                    $("#btnSiguiente").button("option", "disabled", true);
                }
                else {
                    $("#lblMensajeVerificacion").html("Sólo se mostrarán los modelos compatibles al plan del equipo seleccionado");
                    $("#btnSiguiente").button("option", "disabled", false);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    };
};

function VerificaHabilitadoEmpleado(Empleado) {
    $.ajax({
        type: "POST",
        url: "Registrar_Solicitud.aspx/VerificaLineaEmpleadoNuevo",
        data: "{'vcCodEmp': '" + Empleado + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#btnEquiSol").hide();
            if (result.d == "1") {
                $("#lblMensajeVerificacion").html("Ya tiene una solicitud pendiente para adquirir un nuevo equipo");
                //NOTA mostrar nuevo tab con equipo solicitado
                $("#btnEquiSol").show();
            } else if (result.d == "2") {
                $("#lblMensajeVerificacion").html("Usted no puede adquirir más equipos");
            } else if (result.d == "3") {
                $("#lblMensajeVerificacion").html("Usted no está incluido en ninguna política");
            } else {
                //mostrar tabs
                $("#lblMensajeVerificacion").html("");
                $("#btnSiguiente").button("option", "disabled", false);
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
};
//FIN FUNCIONES VALIDACION

//INICIO ADJUNTOS
function listaUbicaciones(ubicacionesAdjuntos) {
    lstUbicaciones = ubicacionesAdjuntos;
    //alert(lstUbicaciones);
};
function numeroAdjuntos(nAdj) {
    if (nAdj == 0) {
        alert('No se ha adjuntado ningún archivo');
    } else if (nAdj == 1) {
        alert('Se ha cargado 1 adjunto');
    } else {
        alert('Se han cargado ' + nAdj + ' adjuntos.');
    };
};
//FIN ADJUNTOS

//INICIO TABS
function grillaDispositivos() {
    $("#grillaDispositivos").kendoGrid({
        //dataSource: dataGrilla,
        dataSource: [],
        sortable: true,
        pageable: {
            pageSize: 5,
            buttonCount: 3,
            messages: {
                page: "Enter page",
                display: "Mostrando {0} - {1} de {2} dispositivos",
                empty: "No tiene Dispositivos asignados",
                first: "Ir a la primera página",
                previous: "Ir a la página anterior",
                next: "Ir a la página siguiente",
                last: "Ir a la última página"
            }
        },
        columns: [{ field: "numero", title: "Número", width: "15%" },
                                { field: "modelo", title: "Nombre de Modelo de Dispositivo", width: "40%" },
                                { field: "plan", title: "Plan de línea", width: "30%" },
                                { field: "imgmodelo", title: "Modelo de Dispositivo", width: "15%" }
                                ],
        rowTemplate: kendo.template($("#RowTemplate").html()),
        detailTemplate: kendo.template($("#DetailTemplate1").html()),
        //detailInit: detailInit2,
        //dataBound: function () {
        //    this.expandRow(this.tbody.find("tr.k-master-row").first());
        //},
        height: 305,
        selectable: true,
        change: function (e) {
            var selectedRows = this.select();
            for (var i = 0; i < selectedRows.length; i++) {
                dataItem = this.dataItem(selectedRows[i]);
            };
            validarSeleccionGrilla(dataItem);
        }
    });
    CargarDispositivos($("#hdfCodEmpleado").val());
};

function mensajeKendo() {
    $("#txtMensaje").kendoEditor({
        tools: ["bold", "italic", "underline", "strikethrough",
                            "justifyLeft", "justifyCenter", "justifyRight", "justifyFull",
                            "insertUnorderedList", "insertOrderedList",
                            "indent", "outdent",
                            "fontName", "fontSize"],
        messages: {
            bold: "Negritas", italic: "Cursiva", underline: "Subrayado", strikethrough: "Tachado",
            justifyLeft: "Alinear a la izquierda", justifyCenter: "Centrar", justifyRight: "Alinear a la derecha", justifyFull: "Justificar",
            insertUnorderedList: "Viñetas", insertOrderedList: "Numeración",
            indent: "Disminuir sangría", outdent: "Aumentar sangría",
            fontNameInherit: "(Fuente)", fontSizeInherit: "(Tamaño de fuente)",
            fontName: "Fuente", fontSize: "Tamaño de fuente"
        }
    });
};

function servicios() {
    $("#tbServicios").kendoGrid({
        dataSource: [],
        sortable: true,
        columns: [{ field: "codigo", title: "Código", width: "0%" },
                   { field: "servicio", title: "Servicio", width: "65%", attributes: { style: "font-size: 14px"} },
        //{ field: "descripcion", title: "Descripcion", hidden: true },
                   {field: "activar", title: "Activar", width: "15%", attributes: { style: "text-align: center; font-size: 14px"} },
                   { field: "costo", title: "Costo", width: "20%", attributes: { style: "text-align: center; font-size: 14px"} },
                   { field: "estado", title: "Estado", width: "0%"}],
        selectable: false,
        sortable: false,
        rowTemplate: kendo.template($("#RowTemplateServicio").html()),
        //altRowTemplate: kendo.template($("#altRowTemplateServicio").html()),
        height: 300,
        dataBound: function (e) {
            var grid = $("#tbServicios").data("kendoGrid");
            while (grid == undefined) {
                var a = "no hay data";
            }
            var filas = $(".fila");
            for (var i = 0; i < filas.length; i++) {
                var tds = $(filas[i]).find("td");
                var labNombre = $(tds[1]).find("label");
                var chk = $(tds[2]).find("input");
                var labCosto = $(tds[3]).find("label");
                chk.attr("id", grid.dataSource._data[i].codigo);
                if (grid.dataSource._data[i].activar != "True") {
                    //alert(true);
                    chk.attr("disabled", true);
                    $.uniform.update();
                    $(labNombre).css("color", "#89989E");
                    $(labCosto).css("color", "#89989E");
                }
                if (grid.dataSource._data[i].estado == "True") {
                    chk.attr("checked", true);
                    arServiciosActuales.push(grid.dataSource._data[i].codigo);
                    $.uniform.update();
                }
                if (grid.dataSource._data[i].descripcion != '') {
                    $(labNombre).text(grid.dataSource._data[i].servicio + ' (' + grid.dataSource._data[i].descripcion + ')');
                } else {
                    $(labNombre).text(grid.dataSource._data[i].servicio);
                }
            }
            $("input:checkbox").uniform();
        }
    });
    //cargar servicios de la linea

};

//function servicios1() {
//    $("#lblLineaSel").text($("#hdfLineaSel").val());
//    $("#txtCatnidadSolicitada").keypress(ValidarSoloNumero);
//    $("#txtMotivoActivacion").keypress(ValidarAlfaNumericoConEspacios);
//    $('#rbtTemporal').attr('checked', true);
//    
//    
//    $("#ddlTipoServicio").change(function () {
//        if ($(this).val() == '-1')
//            $("#lblValorCatnidad").text('');
//        if ($(this).val() == '16')
//            $("#lblValorCatnidad").text(' (min)');
//        if ($(this).val() == '17')
//            $("#lblValorCatnidad").text(' (KB)');
//        if ($(this).val() == '18')
//            $("#lblValorCatnidad").text(' (msj)');
//        listarServicios($("#hdfCuentaLinea").val(), $("#hdfLineaSel").val(), $(this).val());
//    });
//
//    datepickerkendoFormar("#txtFechaInicial");
//    datepickerkendoFormar("#txtFechaFinal");
//    var fechaIni = $("#txtFechaInicial").data("kendoDatePicker");
//    var fechaFin = $("#txtFechaFinal").data("kendoDatePicker");
//    fechaIni.min(new Date());
//    fechaFin.min(new Date());
//    fechaIni.bind("change", function () { fechaFin.min(this.value()); });
//    fechaFin.bind("change", function () { fechaIni.max(this.value()); });
//
//    $('#chkIlimitado').click(function () {
//        if ($('#chkIlimitado').is(':checked')) {
//            $("#trCantidad").hide(100);
//        } else {
//            $("#trCantidad").show(100);
//        };
//    });
//    $('#rbtTemporal').click(function () {
//        $("#trFechaFinal").show(100);
//    });
//
//    $('#rbtPermanente').click(function () {
//        $("#trFechaFinal").hide(100);
//        $("#txtFechaFinal").val('');
//    });
//
//    $("#tbServActuales").kendoGrid({
//        sortable: true,
//        columns: [{ field: "codigo", title: "Código", hidden: true },
//                   { field: "servicio", title: "Servicio", width: "70%" },
//                   { field: "cantidad", title: "Cantidad", width: "30%" }],
//        selectable: true,
//        height: 200
//    });
//
//    if ($("#hdfTipoSolicitud").val() == "6") { //activacion
//        $("#lblTituloGrillaServ").text("Lista de Servicios Actuales");
//        combokendoFormar("#ddlTipoServicio", "200");
//        combokendoFormar("#ddlServicio", "200");
//        $("#trServicioSeleccionado").hide();
//    } else if ($("#hdfTipoSolicitud").val() == "7") { //ampliacion
//        $("#trServicioSeleccionado").show();
//        $("#trTipoServicio").hide();
//        $("#trServicio").hide();
//        $("#trTiempo").hide();
//        $("#trFechaFinal").hide();
//        $("#trFechaInicial").hide();
//        $("#lblTituloGrillaServ").text("Seleccione el servicio a ampliar");
//        $("#tbServActuales").data("kendoGrid").bind("change", seleccionarServicioAmpliar);
//    };
//
//    function seleccionarServicioAmpliar (e) {
//        var selectedRows = this.select();
//        dataItem = this.dataItem(selectedRows);
//        if (dataItem.cantidad == "Ilimitado") {
//            //alert("No puede ampliar un servicio ilimitado");
//            $("#lblServSeleccionado").text("No puede ampliar un servicio ilimitado");
//            $("#btnFinalizar").button("option", "disabled", true);
//            $("#lblServSeleccionado").prop("ForeColor", "Red");
//            $("#lblServSeleccionado").attr("ForeColor", "Red");
//            $("#lblServSeleccionado").css("ForeColor", "Red");
//        } else {
//            $("#btnFinalizar").button("option", "disabled", false);
//            $("#lblServSeleccionado").attr("ForeColor", "Black");
//            $("#lblServSeleccionado").text(dataItem.servicio);
//            $("#hdfServicioSelect").val(dataItem.codigo);
//        };
//    };
//};

function planes() {
    var tipSol = $("#ddlTipoSolicitud").data("kendoComboBox").value();
    if (tipSol != 7) { //solicitud de plan
        $("#lblOperadorLinea").hide();
        combokendoFormar("#ddlOperador", 200);
        combokendoFormar("#ddlPlan", 200);
        $("#ddlPlan").data("kendoComboBox").enable(false);
        listarOperadores();
        $("#ddlOperador").change(function () {
            //$("#txtPlan").val('');
            $("#trDetalle").hide(200);
            if ($("#ddlOperador").data("kendoComboBox").value() != "-1") {
                $("#ddlPlan").data("kendoComboBox").enable(true);
                listarPlanes();
            } else {
                $("#ddlPlan").data("kendoComboBox").value(-1);
                $("#ddlPlan").data("kendoComboBox").enable(false);
            };
        });
    } else { //ampliacion de plan
        $("#ddlOperador").hide();
        $("#lblOperadorLinea").show();
        $("#trLineaAmpliacion").show();
        $("#trPlanActual").show();
        combokendoFormar("#ddlPlan", 200);
        //listarPlanes();
    }
    $("#ddlPlan").change(function () {
        var vcCod = $("#ddlPlan").data("kendoComboBox").value();
        $("#hdfCodPlan").val(vcCod);
        mostrarDetallePlan(vcCod);
    });

    $("#tbSubPlanes").html('');
    $(".k-detail-row").remove();
    $("#tbSubPlanes").kendoGrid({
        dataSource: [],
        sortable: false,
        height: 175,
        scrollable: true,
        pageable: false,
        detailInit: detailInit,
        columns: [{ field: "inCod", title: "Código", width: "0%", hidden: true },
                  { field: "vcNom", title: "Nombre", width: "20%" },
                  { field: "vcDes", title: "Descripcion", width: "40%" },
                  { field: "dcCan", title: "Cantidad", width: "20%" },
                  { field: "dcMon", title: "Monto", width: "20%"}],
        selectable: false
    });

    //$("#txtPlan").keyup(function () {
    //if ($("#txtPlan").length > 0) {
    //    $("#txtPlan").autocomplete({
    //        minLength: 0,
    //        source: function (request, response) {
    //            $.ajax({
    //                type: "POST",
    //                url: "Adm_NuevaSolicitud.aspx/ListarPlanesPorOperador",
    //                data: "{'inCodOpe': '" + codOpeAutoCompPlanes + "'," +
    //                       "'vcCodEmp': '" + $("#hdfCodEmpleado").val() + "'," + 
    //                       "'vcNombre': '" + $("#txtPlan").val() + "'}", 
    //                contentType: "application/json; charset=utf-8",
    //                dataType: "json",
    //                success: function (result) {
    //                    response($.map(result.d, function (item) {
    //                        return {
    //                            label: $.trim(item.vcNom),
    //                            vcCod: $.trim(item.P_inCod)
    //                        }
    //                    }));
    //                },
    //                error: function (xhr, err, thrErr) {
    //                    MostrarErrorAjax(xhr, err, thrErr);
    //                }
    //            });
    //        },
    //        focus: function (event, ui) {
    //            $("#txtPlan").val(ui.item.label);
    //            return false;
    //        },
    //        select: function (event, ui) {
    //            Selecciono = true;
    //            $("#txtPlan").val(ui.item.label);
    //            $("#hdfCodPlan").val(ui.item.vcCod);
    //            mostrarDetallePlan(ui.item.vcCod);
    //            return false;
    //        },
    //        change: function (event, ui) {
    //            if (!Selecciono) {
    //                $("#txtPlan").val("");
    //                $("#hdfCodPlan").val('');
    //            }
    //            return false;
    //        },
    //        open: function (event, ui) {
    //            Selecciono = false;
    //            return false;
    //        }
    //    }).data("autocomplete")._renderItem = function (ul, item) {
    //        return $("<li></li>")
    //		    .data("item.autocomplete", item)
    //		    .append("<a>" + item.label + "</a>")
    //		    .appendTo(ul);
    //    };
    //};

};
//FIN TABS
function mostrarDetallePlan(idPlan) {
    $.ajax({
        type: "POST",
        url: "Registrar_Solicitud.aspx/MostrarDetallePlan",
        data: "{'IdPlan': '" + idPlan + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var Plan = result.d;
            $("#lblNombrePlan").text(Plan.vcNom);
            //$("#lblDescripcionPlan").text(Plan.vcDes);
            $("#lblDescripcionPlan").append(Plan.vcDes);
            $("#lblMontoTotal").text(Plan.dcMon);
            var arSubPlanes = [];
            if ($(Plan.SubPlanes).length != 0) {
                $(Plan.SubPlanes).each(function () {
                    var Cant = this.dcCan == 0 ? 'Ilimitado' : this.dcCan;
                    arSubPlanes.push({ inCod: this.P_inCodSubPla, vcNom: this.vcNom, vcDes: this.vcDes, dcCan: Cant, dcMon: this.dcMon });
                });
            };
            var dataSubPlanes = new kendo.data.DataSource({ data: arSubPlanes });
            $(".k-detail-row").remove();
            $("#tbSubPlanes").data("kendoGrid").setDataSource(dataSubPlanes);
            $("#trDetalle").show(300);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
};
function detailInit(e) {
    var idSubPlan = e.data.inCod;
    $.ajax({
        type: "POST",
        url: "Registrar_Solicitud.aspx/MostrarDetalleSubPlan",
        data: "{'IdSubPlan': '" + idSubPlan + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var SubPlan = result.d;
            arServicios = [];
            if ($(SubPlan.Servicios).length != 0) {
                $(SubPlan.Servicios).each(function () {
                    var Cant = this.dcCan == 0 ? 'Ilimitado' : this.dcCan;
                    arServicios.push({ IdServ: this.P_inCod, vcNom: this.vcNom, dcCan: Cant });
                });
            };
            var dataServicios = new kendo.data.DataSource({ data: arServicios });
            $("<div/>").appendTo(e.detailCell).kendoGrid({
                dataSource: dataServicios,
                scrollable: false,
                sortable: false,
                scrollable: false,
                columns: [
                  { field: "IdServ", title: "Código", width: "0%", hidden: true },
                  { field: "vcNom", title: "Nombre Servicio", width: "60%" },
                  { field: "dcCan", title: "Cantidad", width: "40%" }
                  ]
            });
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
};
//?????
function ModeloDispositivo(codModDis) {
    //alert(codModDis);
    $("#hdfCodModDis").val(codModDis);
};



function combokendoFormar(control, altura) {
    $(control).removeClass("ui-widget-content ui-corner-all");
    $(control).css("padding", "0px");
    $(control).css("margin", "0px");
    $(control).kendoComboBox({
        filter: "contains",
        suggest: true,
        height: altura,
        dataTextField: "text",
        dataValueField: "value"
    });
};

//function datepickerkendoFormar(control) {
//    $(control).removeClass("ui-widget-content ui-corner-all");
//    $(control).css("padding", "0px");
//    $(control).css("margin", "0px");
//    $(control).kendoDatePicker({
//        animation: false,
//        format: "dd/MM/yyyy"
//        //culture: "es-ES"
//    });
//};

//Finalizar
function EnviarSolicitudCambio() {
    var CodModDis = $("#hdfCodModDis").val();
    var CodEmp = $("#hdfCodEmpleado").val();
    var NumLin = $("#hdfLineaSel").val();
    var codIMEI = $("#hdfCodImeiSel").val();
    var Plan = $("#hdfCodPlan").val();
    var ArchAdj;
    if (lstUbicaciones.length == 0) {
        ArchAdj = '';
    } else {
        ArchAdj = lstUbicaciones.join(",");
    }
    //alert("Modelo: " + CodModDis + "\nEmpleado: " + CodEmp + "\nLinea: " + NumLin + "\nAdjuntos: " + ArchAdj + "\nIMEI: " + codIMEI + "\nPlan: " + Plan);
    $.ajax({
        type: "POST",
        url: "Registrar_Solicitud.aspx/EnviarSolicitudCambio",
        data: "{'vcNumLin': '" + codIMEI + "'," +
                   "'inCodModDis': '" + CodModDis + "'," +
                   "'vcArchAdj': '" + ArchAdj + "'," +
                   "'vcCodPlan': '" + Plan + "'," +
                   "'vcCodEmp': '" + CodEmp + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d == '') {
                alert("Su solicitud fue enviada con éxito");
            } else {
                alert(result.d);
            };
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
};

function EnviarSolicitudNuevo() {
    var CodModDis = $("#hdfCodModDis").val();
    var CodEmp = $("#hdfCodEmpleado").val();
    var ArchAdj;
    var Plan = $("#hdfCodPlan").val();
    if (lstUbicaciones.length == 0) {
        ArchAdj = '';
    } else {
        ArchAdj = lstUbicaciones.join(",");
    }
    //alert("Modelo: " + CodModDis + "\nEmpleado: " + CodEmp + "\nAdjuntos: " + ArchAdj + "\nPlan: " + Plan);
    $.ajax({
        type: "POST",
        url: "Registrar_Solicitud.aspx/EnviarSolicitudNuevo",
        data: "{'inCodModDis': '" + CodModDis + "'," +
                    "'vcArchAdj': '" + ArchAdj + "'," +
                    "'vcCodPlan': '" + Plan + "'," +
                   "'vcCodEmp':'" + CodEmp + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d == '') {
                alert("Su solicitud fue enviada con éxito");
                //setTimeout(CierraVentana, 50);
                //cerrarPestaña!!!!
                //jherrera 20130514
                //-----------------
                //window.location = "Adm_SolicitarDispositivo.aspx?vcCodEmp=" + CodEmp + "&dcNumLin=" + NumLin + "&vcNueDis=" + CodModDis;
                //-----------------
            }
            else {
                alert(result.d);
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
};

function EnviarSolicitudReposicion() {
    var CodModDis = $("#hdfCodModDis").val();
    var CodEmp = $("#hdfCodEmpleado").val();
    var NumLin = $("#hdfLineaSel").val();
    var CodIMEI = $("#hdfCodImeiSel").val();
    var Plan = $("#hdfCodPlan").val();
    var ArchAdj = lstUbicaciones.join(",");
    //alert("Modelo: " + CodModDis + "\nEmpleado: " + CodEmp + "\nLinea: " + NumLin + "\nAdjuntos: " + ArchAdj + "\nIMEI: " + CodIMEI + "\nPlan: " + Plan);
    $.ajax({
        type: "POST",
        url: "Registrar_Solicitud.aspx/EnviarSolicitudReposicion",
        data: "{'vcNumLin': '" + CodIMEI + "'," +
                   "'inCodModDis': '" + CodModDis + "'," +
                   "'vcArchAdj': '" + ArchAdj + "'," +
                   "'vcCodPlan': '" + Plan + "'," +
                   "'vcCodEmp': '" + CodEmp + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d == '') {
                alert("Su solicitud fue enviada con éxito");
                //setTimeout(CierraVentana, 50);
                //cerrarPestaña!!!!
                //jherrera 20130514
                //-----------------
                //window.location = "Adm_SolicitarDispositivo.aspx?vcCodEmp=" + CodEmp + "&dcNumLin=" + NumLin + "&vcNueDis=" + CodModDis;
                //-----------------
            }
            else {
                alert(result.d);
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
};
function EnviarSolicitudReparacion() {
    var CodEmp = $("#hdfCodEmpleado").val();
    var CodDisp = $("#hdfCodModDis").val();
    var Desc = $("#txtMensaje").data("kendoEditor").value();
    //alert("Empleado: " + CodEmp + "\nDispositivo: " + CodDisp + "\nDescripcion: " + Desc);
    $.ajax({
        type: "POST",
        url: "Registrar_Solicitud.aspx/EnviarSolicitudReparacion",
        data: "{'vcCodEmp': '" + CodEmp + "'," +
                           "'vcCodDis': '" + CodDisp + "'," +
                           "'vcDesSol': '" + Desc + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#txtDescripcion").val("");
            if (result.d == "0")
                alert("Ya hay una solicitud pendiente para dicho dispositivo");
            else if (result.d == "-1")
                alert("La solicitud no pudo ser enviada, vuelva a intentarlo, si el problema persiste consulte a su administrador");
            else
                alert("Solicitud enviada");

            $("#txtDescripcion").val("");
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
};
function EnviarSolicitudActivacion() {
    var CodEmp = $("#hdfCodEmpleado").val();
    var NumLin = $("#hdfLineaSel").val();
    var arServ = [];
    var arCost = [];
    var filas = $(".fila");
    for (var i = 0; i < filas.length; i++) {
        var chk = $(filas[i]).find("input");
        if (chk.is(":checked")) {
            arServ.push(chk.attr("id"));
        };
    };

    var arServDel = jQuery.grep(arServiciosActuales, function (val) {
        var sum = 0;
        for (i = 0; i < arServ.length; i++) {
            if (val == arServ[i]) {
                sum = sum + 1;
            }
        }
        if (sum == 0) {
            return val;
        }
    });
    var arServAdd = jQuery.grep(arServ, function (val) {
        var sum = 0;
        for (i = 0; i < arServiciosActuales.length; i++) {
            if (val == arServiciosActuales[i]) {
                sum = sum + 1;
            }
        }
        if (sum == 0) {
            return val;
        }
    });
    //alert("CodEmpleado: " + CodEmp + "\nLinea: " + NumLin + "\nServicios Actuales: " + arServiciosActuales.join(",") +
    //    "\nServicios Seleccoinados: " + arServ.join(",") + "\nServicios Agregados: " + arServAdd.join(",") + 
    //    "\nServicios Quitados: " + arServDel.join(",") + "\nCostos: " + arCost.join(","));

    $.ajax({
        type: "POST",
        url: "Registrar_Solicitud.aspx/EnviarSolicitudActivacion",
        data: "{'vcNumLin': '" + NumLin + "'," +
                "'vcCodEmp': '" + CodEmp + "'," +
                "'ServAdd': '" + arServAdd.join(",") + "'," +
                "'ServDel': '" + arServDel.join(",") + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d != '0') {
                alert("Su solicitud fue enviada con éxito");
            } else if (result.d == '0') {
                alert("Ya existe una solicitud para este empleado");
            };
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
};

function EnviarSolicitudAmpliacion() {
    var CodEmp = $("#hdfCodEmpleado").val(); //empleado
    var NumLin = $("#hdfLineaSel").val(); //dispositivo
    var ArchAdj = '';
    if (lstUbicaciones.length != 0) {
        ArchAdj = lstUbicaciones.join(","); // adjuntos
    }
    var CodPlan = $("#hdfCodPlan").val()
    //alert("Empleado: " + CodEmp + "\nLinea: " + NumLin + "\nAdjuntos: " + ArchAdj + "\nPlan Sol: " + CodPlan);
    $.ajax({
        type: "POST",
        url: "Registrar_Solicitud.aspx/EnviarSolicitudAmpliacion",
        data: "{'vcNumLin': '" + NumLin + "'," +
                    "'vcCodEmp': '" + CodEmp + "'," +
                    "'vcArchAdj': '" + ArchAdj + "'," +
                    "'CodPlan': '" + CodPlan + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d != '0') {
                alert("Su solicitud fue enviada con éxito");
            } else if (result.d == '0') {
                alert("Ya existe una solicitud de ampliación para esta línea");
            };
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
};

function IngresarEmpleadoUnico(Empleado) {
    //alert(Empleado.P_vcCod + " - " + Empleado.vcNom);
    $("#hdfCodEmpleado").val(Empleado.P_vcCod);
    var arNom = Empleado.vcNom.split('=');
    $("#txtEmpleado").val(arNom[1]);
    $("#ddlTipoSolicitud").data("kendoComboBox").value(-1);
    $("#ddlTipoSolicitud").data("kendoComboBox").enable(true);
    $("#dvTabs").hide();
    $("#lblMensajeVerificacion").text('');
};

function FormatoNumero(numero, sepMil, sepDec, numDec) {
    var n = numero.toString().split(".");
    var enteros = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, sepMil);
    var decimales = '0.' + n[1];
    decimales = parseFloat(decimales).toFixed(numDec);
    var m = decimales.split(".");
    //return enteros + "." + m[1];
    return enteros + sepDec + m[1];
};

function DesabilitarContinuar() {
    $("#btnSiguiente").button("option", "disabled", true);
};

//BOTONES NAVEGACION
function bsiguiente() {
    $("#lblMensajeVerificacion").html("");
    var tipoSolicitud = $("#ddlTipoSolicitud").data("kendoComboBox").value();
    //-----tab actual
    var tabActualSel = $("#divTabs").find(".tapSelect");
    var tabSelection = tabActualSel.attr("tabIndex");
    var idTabActual = tabActualSel.attr("id");
    var idTabSig = "#tab" + arContenidos[tabSelection + 1].contenido;
    var idDivSig = "#div" + arContenidos[tabSelection + 1].contenido;
    //--avanzar
    activarTap(idTabSig);
    clickTap(arContenidos[tabSelection + 1].contenido);
    $(idTabSig).bind(clickTap(idTabSig.substring(4)));
    //--
    if (arContenidos[tabSelection + 1].contenido == "Galeria") {
        $("#ifGaleria").attr("src", "");
        var permLIn = permiteLinea ? '1' : '0';
        var codModSel = $("#hdfCodModDisActual").val();
        $("#ifGaleria").attr("src", "Adm_GaleriaModDispositivos.aspx?vcCodEmp=" + $("#hdfCodEmpleado").val() + "&tipSol=" + tipoSolicitud + "&lin=" + permLIn + "&mod=" + codModSel);
    }
    if (tabMostrado == "Galeria") {
        var modelo = $("#ifGaleria")[0].contentWindow.enviarCodMod();
        var conLinea = $("#ifGaleria")[0].contentWindow.conLinea();
        //alert(conLinea);
        if (permiteLinea && !conLinea) {
            $("#MsgConfirmacionAvance").dialog({
                title: "Confirmacion",
                modal: true,
                buttons: {
                    "Si": function () {
                        $(this).dialog("close");
                        //seguir sin solcitar linea
                        if (tabPlanesVisible == true) {
                            removerTab("Planes");
                            arContenidos = jQuery.grep(arContenidos, function (value) { return value.contenido != 'Planes' });
                            tabPlanesVisible = false;
                        };
                        arIndexTabMostrados = jQuery.grep(arIndexTabMostrados, function (value) { return value != tabSelection + 1; });
                        tbSolicitud.tabs("option", "disabled", arIndexTabMostrados);
                        tbSolicitud.tabs('option', 'selected', tabSelection + 1);
                    },
                    "No": function () {
                        $(this).dialog("close");
                    }
                },
                resizable: false
            });
        } else if (permiteLinea && conLinea) {
            if (!tabPlanesVisible) { //tabPlanes eliminado, volver a crear
                contenidoTab = "Planes";
                arContenidos.push({ contenido: "Planes", titulo: "Planes" });
                arIndexTabMostrados.push(arContenidos.length - 1);
                creartab("Planes", "Planes");
                arIndexTabMostrados = jQuery.grep(arIndexTabMostrados, function (value) { return value != tabSelection + 1; });
                tbSolicitud.tabs("option", "disabled", arIndexTabMostrados);
                tbSolicitud.tabs('option', 'selected', tabSelection + 1);
            };
            arIndexTabMostrados = jQuery.grep(arIndexTabMostrados, function (value) { return value != tabSelection + 1; });
            tbSolicitud.tabs("option", "disabled", arIndexTabMostrados);
            tbSolicitud.tabs('option', 'selected', tabSelection + 1);
        } else if (!permiteLinea) {
            arIndexTabMostrados = jQuery.grep(arIndexTabMostrados, function (value) { return value != tabSelection + 1; });
            tbSolicitud.tabs("option", "disabled", arIndexTabMostrados);
            tbSolicitud.tabs('option', 'selected', tabSelection + 1);
        }
        $("#hdfCodModDis").val(modelo);
    } else {
        arIndexTabMostrados = jQuery.grep(arIndexTabMostrados, function (value) { return value != tabSelection + 1; });
        tbSolicitud.tabs("option", "disabled", arIndexTabMostrados);
        tbSolicitud.tabs('option', 'selected', tabSelection + 1);
    };
};

function activarTap(control) {
    //animación a los tabs
    alert("activar: " + control);
    $(control).hover(function () {
        $(this).animate({ marginRight: '10px', marginLeft: '30px' }, 300);

    }, function () {
        $(this).animate({ marginRight: '0px', marginLeft: '20px' }, 300);
    });
    //bind
    //$(control).bind(clickTap(control.substring(4)));
};

function desactivarTap(control) {
    //animacion
    $(control).hover('');
    //unbind
    $(control).unbind("click");
};

function clickTap(control) {
    alert("click - " + control);
    //var idtabselect = $(control).attr("id");
    $(".tap").removeClass("tapSelect");
    //$("#tabSolicitud").addClass("tapSelect");
    $("#tab" + control).addClass("tapSelect");
    $("#detalleTabs > div").hide(0, function () {
        $("#div" + control).fadeIn(200);
    });
    //definir botnes navegacion segun tab seleccionado
    if (arContenidos.length == 1) {
        $("#btnAtras").hide();
        $("#btnSiguiente").hide();
        $("#btnFinalizar").show();
    } else {
        if (control == arContenidos[0].contenido) {
            //alert("primero");
            $("#btnAtras").hide();
            $("#btnSiguiente").show();
            $("#btnFinalizar").hide();
        } else if (control == arContenidos[arContenidos.length - 1].contenido) {
            //alert("ultimo");
            $("#btnAtras").hide();
            $("#btnSiguiente").hide();
            $("#btnFinalizar").show();
        } else {
            //alert("central");
            $("#btnAtras").show();
            $("#btnSiguiente").show();
            $("#btnFinalizar").hide();
        };
    };
};