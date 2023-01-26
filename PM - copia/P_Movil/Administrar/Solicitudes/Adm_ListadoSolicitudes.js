let biNotasPorRevisar = false;
var tab;
var MargenFiltro = 0;
var MargenHeight = 48;
var idSeleccionado = null;
var TamanoPagina = [20, 50, 100];
var nuAltoFilaSolicitud = 34;
var inAltGrid;
var inFilas;
var nuAltoFila = 23.04;
let ArrayPaginacionSolicitud = [];
var inFiltro = 1;
var vcFiltro = "";
var vcFiltro2 = "";
var vcGruTipSolEdi;
var vcGruTipSolEli;
var vcVista = "General";
var vcTodos = "0";
var vcTipos = "0"; //General
var vcFecVal;
var vcRangFecVal;
var vcRangoFechaIni;
var vcRangoFechaFin;
var inIdResTec;
var vcTit;
var vcMen;
var lstIdSol = "";
var vcIdTipSol = "";
var vcEsReasignar = "0";
//carpeta de dominio
var CarpetaDominio = "";
var CodigoSolicitudNota = "";
var LineaSeleccionada;
var SolicitudSeleccionada;

let solicitudMultipleEspecialista = false;

var vcCodint2 = "";
var vcComparaCodint2 = "";

var NoMostrarOrdenServicio;
var bEsAutorizador = false;

//var millisecondsToWait = 500;
//setTimeout(function () {
//    // Whatever you want to do after the wait
//}, millisecondsToWait);

$(window).resize(function () {
    DimPosElementos();
});

function MejorarVisionBotonesGenerales() {
    //debugger;
    var dtAcciones = $("#tblAcciones").find("div");

    for (let i = 0; i < dtAcciones.length; i++) {
        if (dtAcciones[i].className.indexOf("disable") > -1) {
            if (dtAcciones[i].style.display != "none") {
                $(dtAcciones[i]).parent().css("padding", "0 0 0 3px");
            }
            else {
                $(dtAcciones[i]).parent().css("padding", "0px");
            }
        }
    }

    var dtExportar = $("#tbExportar").find("div");

    for (let i = 0; i < dtExportar.length; i++) {
        if (dtExportar[i].className.indexOf("disable") > -1) {
            if (dtExportar[i].style.display != "none") {
                $(dtExportar[i]).parent().css("padding", "0 0 0 3px");
            }
            else {
                $(dtExportar[i]).parent().css("padding", "0px");
            }
        }
    }
}

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    var TamHeaderMenu = $("#toolbar").height();

    if (
        $("#hdfvcTab").val() == "MOV_IMP_Plantilla" ||
        $("#hdfvcTab").val() == "MOV_IMP_Servicio" ||
        $("#hdfvcTab").val() == "MOV_IMP_Ruta" ||
        $("#hdfvcTab").val() == "MOV_IMP_Destino"
    ) {
        $(".tabs").css({
            height: Alto - 25,
            width: Ancho - 15,
            marginbotton: 0,
            paddingbotton: 0,
        });
    } else {
        $(".tabs").css({
            height: Alto - 25,
            width: Ancho - 13,
            marginbotton: 0,
            paddingbotton: 0,
        });
    }

    if (
        $("#hdfvcTab").val() == "MOV_IMP_Plantilla" ||
        $("#hdfvcTab").val() == "MOV_IMP_Servicio" ||
        $("#hdfvcTab").val() == "MOV_IMP_Ruta" ||
        $("#hdfvcTab").val() == "MOV_IMP_Destino"
    ) {
        $("#grid").setGridHeight(Alto - 240);
        $("#grid").setGridWidth(Ancho - 50);
    } else {
        if ($("#hdfvcTab").val() == "MOV_CAM_CampanaDespachoOperador") {
            $("#grid").setGridHeight(Alto - 195 - 20);
        } else {
            $("#grid").setGridHeight(Alto - 180 - TamHeaderMenu);
        }
        $("#grid").setGridWidth(Ancho - 25);
    }

    /*NumeroInicialFilas();*/
    RecalcularColumnasGrilla("grid", true);

    nuAltoFila = 23.04;
    inFilas = Math.floor(($(window).height() - 300) / nuAltoFila);
    inFilas = inFilas - 1;
    ActualizarPageSizeGrillasTabSolicitud("grid", inFilas);

}

function ActualizarPageSizeGrillasTabSolicitud(gridName, inFilas) {
    ArrayPaginacionSolicitud.push(inFilas);
    ArrayPaginacionSolicitud.push(inFilas + inFilas);
    ArrayPaginacionSolicitud.push(inFilas + inFilas + inFilas);

    $("#" + gridName).closest('.ui-jqgrid').find('.ui-pg-selbox').children().remove();
    if (inFilas <= 0) {
        $("#" + gridName).closest('.ui-jqgrid').find('.ui-pg-selbox').append('<option value=1>1</option>');
    }
    else {
        var k;
        for (k = 1; k <= 5; k++) {
            $("#" + gridName).closest('.ui-jqgrid').find('.ui-pg-selbox').append('<option value=' + inFilas * k + '>' + inFilas * k + '</option>');
        }
    }

    if (inFilas <= 0) { inFilas = 1; }

    $("#" + gridName).closest('.ui-jqgrid').find('.ui-pg-selbox').val(inFilas);
    $("#" + gridName).closest('.ui-jqgrid').find('.ui-pg-selbox').change();
}





function NumeroInicialFilas() {
    //debugger;
    inFilas = Math.floor(inAltGrid / nuAltoFilaSolicitud);
    //ArrayPaginacionSolicitud = [];


    ArrayPaginacionSolicitud.push(inFilas);
    ArrayPaginacionSolicitud.push(inFilas + inFilas);
    ArrayPaginacionSolicitud.push(inFilas + inFilas + inFilas);
}

function ActualizarGrilla() {
    $("#grid").trigger("reloadGrid");
}

function CerroMensaje() {
    BloquearPagina(false);
}

function fnMostrarTecnico(Id) {
    if (Id != "") {
        inIdResTec = Id;

        if (vcEsReasignar == "0") {
            //Asignar A
            confirmacion(
                "¿Está seguro que desea asignar el especialista '" +
                $("#bpTecRes_txtValorBusqueda").val() +
                "' a las solicitudes elegidas?",
                fnAsignarSolicitudesA,
                null,
                "Asignar Solicitudes A"
            );
        } else {
            confirmacion(
                "¿Está seguro que desea reasignar el especialista '" +
                $("#bpTecRes_txtValorBusqueda").val() +
                "' a las solicitudes elegidas?",
                fnReasignarSolicitudesA,
                null,
                "Reasignar Solicitudes A"
            );
        }
    }
}

function fnAsignarSolicitudesA() {
    $.ajax({
        type: "POST",
        url: "Adm_EditarSolicitudPersonalizada.aspx/AsignarSolicitudA",
        data:
            "{'vcCodSol': '" +
            lstIdSol +
            "', " +
            "'inCodTipSol': '" +
            vcIdTipSol +
            "', " +
            "'inUsuAsignado': '" +
            inIdResTec +
            "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            Mensaje("<br/><h1>" + vcMen + "</h1><br/>", document, CerroMensaje);
            ActualizarGrilla();
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        },
    });
}

function fnReasignarSolicitudesA() {
    $.ajax({
        type: "POST",
        url: "Adm_ListadoSolicitudes.aspx/ReasignarSolicitudesA",
        data:
            "{'vcCodSol': '" +
            lstIdSol +
            "', " +
            "'inCodTipSol': '" +
            vcIdTipSol +
            "', " +
            "'inUsuAsignado': '" +
            inIdResTec +
            "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            Mensaje("<br/><h1>" + vcMen + "</h1><br/>", document, CerroMensaje);
            ActualizarGrilla();
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        },
    });
}

var TituloValeResguardo = "";

$(function () {
    solicitudMultipleEspecialista =
        $("#hdfSolicitudesMultipleEspecialista").val() === "True" ? true : false;

    if (solicitudMultipleEspecialista) {
        $("#trPorAsignar").hide();
    }

    bEsAutorizador = ($("#hdfEsAutorizador").val() === "1")

    var tbPrincipal = window.parent.$("#tbPrincipalProducto");
    var indiceTab = tbPrincipal.tabs("option", "selected");
    if ($("#hdfLicenciaModulo").val() == "4GVBGsuwXJDBuD3LFODkzQA=") {
        alertaTabLicencia(
            "No cuenta con licencia para ingresar al módulo.",
            "Licencia",
            null,
            "warning",
            3000,
            tbPrincipal,
            indiceTab
        );
    }

    TituloValeResguardo = $("#hdfTituloValeResguardo").val();
    try {
        if (TituloValeResguardo == "") {
            $("#btnValeResguardo").attr("title", "Vale Resguardo");
        } else {
            $("#btnValeResguardo").attr("title", TituloValeResguardo);
        }
    } catch (e) { }

    $("#cb_grid").live("click", function () {
        //console.log("value:", $('#rbtEnProceso').is(':checked'),  $('#cb_grid').is(":checked"), $("#grid").jqGrid('getGridParam', 'records'));
        if ($("#rbtEnProceso").is(":checked")) {
            $("#btnProcesar").button("option", "disabled", false);
            //if ($('#cb_grid').is(":checked") == true && $("#grid").jqGrid('getGridParam', 'records') == 1) {
            //    $("#btnProcesar").button("option", "disabled", false);
            //}
            //else {
            //    $("#btnProcesar").button("option", "disabled", true);
            //}
        }
    });

    $("#txtOrigenSolicitud").val(
        "Solicitud generada por Sistema de Gestión Móvil - PCSistel"
    );

    CarpetaDominio =
        window.top.$("#hdfCodigoDominio").val() != ""
            ? "/" + window.top.$("#hdfCodigoDominio").val()
            : "";
    window.parent.$("#dvCargando").hide();

    //console.log({ window: $(window).height() });
    //console.log({ MargenFiltro: MargenFiltro });
    //console.log({ MargenHeight: MargenHeight });

    let alto = $(window).height();

    if (alto <= 0) {
        alto = 500;
    }
    inAltGrid = alto - 185 - MargenFiltro * MargenHeight;
    /*console.log({ inAltGrid: inAltGrid });*/

    function inicioPagina() {
        //debugger;
        DimPosElementos();
        /*NumeroInicialFilas();*/
        MejorarVisionBotonesGenerales();
    }

    NumeroInicialFilas();

    if ($("#hdfGruTipSolEdi").val() != "")
        vcGruTipSolEdi = $("#hdfGruTipSolEdi").val().split(",");
    else vcGruTipSolEdi = "";
    if ($("#hdfGruTipSolEli").val() != "")
        vcGruTipSolEli = $("#hdfGruTipSolEli").val().split(",");
    else vcGruTipSolEli = "";

    $("#bpTecRes_txtValorBusqueda").hide();
    $("#bpTecRes_imgBusqueda").hide();

    vcTipos = $("#hdfGruTipSol").val(); //General

    //$("input:checkbox,input:radio,input:file").uniform();
    $("#tblAcciones").buttonset();
    $("#tbAprobar").buttonset();
    $("#tbExportar").buttonset();
    $(".ui-button-text").css({ padding: 4, width: 22 });

    $("#TabDetalle span.ui-icon-close").live("click", function () {
        var index = $("li", tab).index($(this).parent());
        tab.tabs("remove", index);
    });

    $("#txtFechaIni").keypress(ValidarFecha);
    $("#txtFechaFin").keypress(ValidarFecha);
    $("#txtRangoFechaIni").keypress(ValidarFecha);
    $("#txtRangoFechaFin").keypress(ValidarFecha);

    $("#txtFechaHoraInicioOS").keypress(ValidarFecha);
    $("#txtFechaHoraInicioOS").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: "dd/mm/yy",
        maxDate: new Date(),
    });

    $("#txtFechaIni").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: "dd/mm/yy",
        maxDate: new Date(),
        onSelect: function (dateText) {
            $("#txtFechaFin").datepicker("option", "minDate", dateText);
            fnCargarGrilla();
        },
    });
    $("#txtFechaFin").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: "dd/mm/yy",
        maxDate: new Date(),
        onSelect: function (dateText) {
            $("#txtFechaIni").datepicker("option", "maxDate", dateText);
            fnCargarGrilla();
        },
    });
    $("#txtRangoFechaIni").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: "dd/mm/yy",
        maxDate: new Date(),
        onSelect: function (dateText) {
            $("#txtRangoFechaFin").datepicker("option", "minDate", dateText);
            fnCargarGrilla();
        },
    });
    $("#txtRangoFechaFin").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: "dd/mm/yy",
        maxDate: new Date(),
        onSelect: function (dateText) {
            $("#txtRangoFechaIni").datepicker("option", "maxDate", dateText);
            fnCargarGrilla();
        },
    });
    AsignarRangoFechas();

    //comentado 22-09-2015 wapumayta
    //function fnVerificarFecha(txtFecha) {
    //    if ($("#txtFechaIni").val() != "" && $("#txtFechaFin").val() != "") {
    //        var inDiaIni = parseInt($("#txtFechaIni").val().substr(0, 2));
    //        var inMesIni = parseInt($("#txtFechaIni").val().substr(3, 2));
    //        var inAnioIni = parseInt($("#txtFechaIni").val().substr(6, 4));
    //        var inDiaFin = parseInt($("#txtFechaFin").val().substr(0, 2));
    //        var inMesFin = parseInt($("#txtFechaFin").val().substr(3, 2));
    //        var inAnioFin = parseInt($("#txtFechaFin").val().substr(6, 4));
    //
    //        if ((inAnioIni > inAnioFin) || (inAnioIni == inAnioFin && inMesIni > inMesFin) || (inAnioIni == inAnioFin && inMesIni == inMesFin && inDiaIni > inDiaFin)) {
    //            vcRangFecVal = "0";
    //            $(txtFecha).val("");
    //        }
    //    }
    //}

    //comentado 22-09-2015 wapumayta
    //function fnVerificarRangoFecha(txtFecha) {
    //    if ($("#txtRangoFechaIni").val() != "" && $("#txtRangoFechaFin").val() != "") {
    //        var inDiaIni = parseInt($("#txtRangoFechaIni").val().substr(0, 2));
    //        var inMesIni = parseInt($("#txtRangoFechaIni").val().substr(3, 2));
    //        var inAnioIni = parseInt($("#txtRangoFechaIni").val().substr(6, 4));
    //        var inDiaFin = parseInt($("#txtRangoFechaFin").val().substr(0, 2));
    //        var inMesFin = parseInt($("#txtRangoFechaFin").val().substr(3, 2));
    //        var inAnioFin = parseInt($("#txtRangoFechaFin").val().substr(6, 4));
    //
    //        if ((inAnioIni > inAnioFin) || (inAnioIni == inAnioFin && inMesIni > inMesFin) || (inAnioIni == inAnioFin && inMesIni == inMesFin && inDiaIni > inDiaFin)) {
    //            vcRangFecVal = "0";
    //            $(txtFecha).val("");
    //        }
    //    }
    //}

    $("#btnVista").click(function () {
        var menu = $("#dvVistas")
            .show()
            .position({
                my: "left top",
                at: "left bottom",
                of: $("#btnVista")[0],
            });
        $(document).one("click", function () {
            menu.hide();
        });
        return false;
    });

    if ($("#hdfAdmin").val() == "1") {
        //        $("#trPendiente").show();
        $("#trPorAprobar").show();
        //$("#trAprobada").show();
        //$("#trRechazada").show();
        if (!solicitudMultipleEspecialista) {
            $("#trPorAsignar").show();
        }
        $("#trEnProceso").show();
        //$("#trCulminada").show();
        //$("#trAnulada").show();
        vcTodos = "1";
    }
    if ($("#hdfTecnico").val() == "1") {
        //        $("#trPendiente").show();
        if (!solicitudMultipleEspecialista) {
            $("#trPorAsignar").show();
        }
        $("#trEnProceso").show();

        //$("#trCulminada").show();
        //$("#trAnulada").show();
        vcTodos = "1";
    }
    if ($("#hdfResApr").val() == "1") {
        //        $("#trPendiente").show();
        $("#trPorAprobar").show();
        if (bEsAutorizador) {
            $("#trPorAutorizar").show();
        }
        //$("#trAprobada").show();
        //$("#trRechazada").show();
        vcTodos = "1";
    }
    //$("#trPorAprobar").hide();

    $("#rbtGeneral,#rbtPendiente,#rbtPorAprobar,#rbtAprobada,#rbtRechazada,#rbtPorAsignar,#rbtEnProceso,#rbtCulminada,#rbtAnulada,#rbtNotasPorRevisar,#rbtSolicitudesNoVistas,#rbtPorAutorizar"
    ).change(function () {
        $("#grid").hideCol("FechaHoraCierreSol");
        $('#txtCodigo,#txtEmpleado,#txtOrdenServicioFiltro').val("");

        inFiltro = 1;
        vcFiltro = "";

        this.id === "rbtNotasPorRevisar"
            ? (biNotasPorRevisar = true)
            : (biNotasPorRevisar = false);

        $("#chkSolNoVista").removeAttr("checked");
        if ($("#rbtGeneral").is(":checked")) {
            $("#divRangoFecha").show();
            fnVistaGeneral(false);
            AsignarRangoFechas();
            ActualizarGrilla();
        } else if ($("#rbtPendiente").is(":checked")) {
            fnVistaPendiente(false);
            vcRangoFechaIni = "";
            vcRangoFechaFin = "";
            ActualizarGrilla();
        } else if ($("#rbtPorAprobar").is(":checked")) {
            fnVistaPorAprobar(false);
            vcRangoFechaIni = "";
            vcRangoFechaFin = "";
            ActualizarGrilla();
        } else if ($("#rbtAprobada").is(":checked")) {
            fnVistaAprobada();
            vcRangoFechaIni = "";
            vcRangoFechaFin = "";
            ActualizarGrilla();
        } else if ($("#rbtRechazada").is(":checked")) {
            fnVistaRechazada();
            vcRangoFechaIni = "";
            vcRangoFechaFin = "";
            ActualizarGrilla();
        } else if ($("#rbtPorAsignar").is(":checked")) {
            fnVistaPorAsignar(false);
            vcRangoFechaIni = "";
            vcRangoFechaFin = "";
            ActualizarGrilla();
        } else if ($("#rbtEnProceso").is(":checked")) {
            fnVistaEnProceso();
            vcRangoFechaIni = "";
            vcRangoFechaFin = "";
            ActualizarGrilla();
        } else if ($("#rbtCulminada").is(":checked")) {
            fnVistaCulminada();
            vcRangoFechaIni = "";
            vcRangoFechaFin = "";
            ActualizarGrilla();
        } else if ($("#rbtAnulada").is(":checked")) {
            fnVistaAnulada();
            vcRangoFechaIni = "";
            vcRangoFechaFin = "";
            ActualizarGrilla();
        } else if ($("#rbtNotasPorRevisar").is(":checked")) {
            fnVistaGeneral(true);
            $("#lblVista").html("Notas por revisar");
            $("#divRangoFecha").hide();
            inFiltro = 7;
            ActualizarGrilla();
        } else if ($("#rbtSolicitudesNoVistas").is(":checked")) {
            fnVistaGeneral(true);
            $("#lblVista").html("Solicitudes no vistas");
            $("#divRangoFecha").show();
            $("#chkSolNoVista").attr("checked", "checked");
            ActualizarGrilla();
        } else if ($("#rbtPorAutorizar").is(":checked")) {
            fnVistaPorAutorizar();
            vcRangoFechaIni = "";
            vcRangoFechaFin = "";
            ActualizarGrilla();
        }
        fnCargarFiltroTipoSolicitud();
        $("#hdfBusquedaIni").val("");
        MejorarVisionBotonesGenerales();
    });

    $("#divCodigo").show();
    $("#divFecha").hide();
    $("#divEmpleado").hide();
    $("#divOrdenServicio").hide();
    $("#divEstadoSolicitud").hide();
    $("#divTipoSolicitud").hide();

    if ($("#hdfBusquedaIni").val() != "") {
        $("#divCodigo").hide();
        $("#ddlFiltro").val("7");

        inFiltro = 7;
        vcFiltro = "";
        vcFiltro2 = "";
        //debugger;
        $("#rbtGeneral").attr("checked", "checked");
        $("#dvFiltrar").hide();
        fnVistaGeneral(true);
    }

    $("#ddlFiltro").change(function () {

        $("#divRangoFecha").show();
        $("#hdfBusquedaIni").val("");
        inFiltro = $("#ddlFiltro").val();
        fnIniciarFiltros();

        if (inFiltro == 1) {
            //Código Solicitud
            $("#divCodigo").show();
            $("#dvFiltrar").show();
            fnCargarGrilla();
        } else if (inFiltro == 2) {
            //Fecha
            $("#divFecha").show();
            $("#dvFiltrar").show();
            fnCargarGrilla();
        } else if (inFiltro == 3) {
            //Empleado
            $("#divEmpleado").show();
            $("#dvFiltrar").show();
            fnCargarGrilla();
        } else if (inFiltro == 4) {
            //Estados de Aprobación
            $("#divEstadoApr").show();
            $("#dvFiltrar").show();
            fnCargarGrilla();
        } else if (inFiltro == 5) {
            //Estados de Proceso
            $("#divEstadoPro").show();
            $("#dvFiltrar").show();
            fnCargarGrilla();
        } else if (inFiltro == 6) {
            //Tipo Solicitud
            $("#dvFiltrar").show();
            fnCargarFiltroTipoSolicitud();
            fnCargarGrilla();
        } else if (inFiltro == 7) {
            //Notas Por Revisar
            $("#dvFiltrar").hide();
            $("#divRangoFecha").hide();
            fnCargarGrilla();
        } else if (inFiltro == 8) {
            //Orden de Servicio
            $("#dvFiltrar").show();
            $("#divOrdenServicio").show();
            fnCargarGrilla();
        } else if (inFiltro == 9) {
            //Orden de Servicio
            $("#dvFiltrar").show();
            $("#divEspecialistaProc").show();
            fnCargarGrilla();
        }

        if (biNotasPorRevisar) {
            $("#divRangoFecha").hide();
        }
    });

    $(
        "#chkSolNoVista,#ddlEstado,#ddlTipo,#ddlTipoTec,#ddlTipoResApr,#ddlEstadoApr,#ddlEstadoPro"
    ).change(function () {
        fnCargarGrilla();
    });

    //comentado 22-09-2015 wapumayta
    //$("#txtFechaIni").change(function () {
    //    vcFecVal = "1";
    //    fnVerificarFecha("#txtFechaIni");
    //
    //    if (vcFecVal == "0") {
    //        alerta("La fecha inicial debe ser menor que la fecha final.");
    //        return;
    //    }
    //    fnCargarGrilla();
    //});
    //$("#txtFechaFin").change(function () {
    //    vcFecVal = "1";
    //    fnVerificarFecha("#txtFechaFin");
    //
    //    if (vcFecVal == "0") {
    //        alerta("La fecha inicial debe ser menor que la fecha final.");
    //        return;
    //    }
    //    fnCargarGrilla();
    //});

    //comentado 22-09-2015 wapumayta
    //$("#txtRangoFechaIni").change(function () {
    //    vcRangFecVal = "1";
    //    fnVerificarRangoFecha("#txtRangoFechaIni");
    //
    //    if (vcRangFecVal == "0") {
    //        alerta("La fecha inicial debe ser menor que la fecha final.");
    //        return;
    //    }
    //    fnCargarGrilla();
    //});
    //$("#txtRangoFechaFin").change(function () {
    //    vcRangFecVal = "1";
    //    fnVerificarRangoFecha("#txtRangoFechaFin");
    //
    //    if (vcRangFecVal == "0") {
    //        alerta("La fecha inicial debe ser menor que la fecha final.");
    //        return;
    //    }
    //    fnCargarGrilla();
    //});

    //    $('#txtCodigo,#txtEmpleado').live("keydown", function (e) {
    //
    //    });

    $("#txtCodigo,#txtEmpleado,#txtOrdenServicioFiltro,#txtEspecialista").live(
        "keypress",
        function (e) {

            if (e.keyCode == 13) {
                fnCargarGrilla();
            } else {
                if (e.char == "\\") {
                    return false;
                }
            }
        }
    );

    //    $("#ddlTipo").change(function () {
    //        if (inFiltro == 4) {
    //            $.ajax({
    //                url: "Adm_ListadoSolicitudes.aspx/CargarEstados", //PageMethod
    //                data: "{'inTipSol':'" + $("#ddlTipo").val() + "'}",
    //                dataType: "json",
    //                type: "post",
    //                contentType: "application/json; charset=utf-8",
    //                success: function (result) {
    //                    $("#ddlEstado").empty();
    //                    for (var i = 0; i < result.d.length; i++) {
    //                        $("#ddlEstado").append($('<option></option>').val(result.d[i].P_inCod).html(result.d[i].vcNom));
    //                    }
    //                    fnCargarGrilla();
    //                },
    //                error: function (xhr, err, thrErr) {
    //                    MostrarErrorAjax(xhr, err, thrErr);
    //                }
    //            });
    //        } else
    //            fnCargarGrilla();
    //    });

    function fnCargarGrilla() {
        vcFiltro2 = "";
        if ($("#rbtGeneral").is(":checked") && inFiltro != 7) {
            //FILTRO DE RANGO DE FECHA SOLO PARA LA OPCION GENERAL---------------------------------------------------------------
            var RangFecIni = $("#txtRangoFechaIni").val();
            var RangFecFin = $("#txtRangoFechaFin").val();
            vcRangoFechaIni = "";
            if (RangFecIni != "")
                vcRangoFechaIni =
                    RangFecIni.substr(6, 4).toString() +
                    RangFecIni.substr(3, 2).toString() +
                    RangFecIni.substr(0, 2).toString() +
                    " 00:00:00";
            else vcRangoFechaFin = "";
            if (RangFecFin != "")
                vcRangoFechaFin =
                    RangFecFin.substr(6, 4).toString() +
                    RangFecFin.substr(3, 2).toString() +
                    RangFecFin.substr(0, 2).toString() +
                    " 23:59:59";
            else vcRangoFechaFin = "";
        } else {
            vcRangoFechaIni = "";
            vcRangoFechaFin = "";
        }
        //----------------------------------------------------------------------------------------------------------------------------------------------------------------
        inFiltro = $("#ddlFiltro").val();
        if (inFiltro == 1)
            //Código
            vcFiltro = LimpiarDatoString($("#txtCodigo").val());
        else if (inFiltro == 2) {
            //Rango de Fechas
            var FecHorIni = $("#txtFechaIni").val();
            var FecHorFin = $("#txtFechaFin").val();
            if (FecHorIni != "")
                vcFiltro =
                    FecHorIni.substr(6, 4).toString() +
                    FecHorIni.substr(3, 2).toString() +
                    FecHorIni.substr(0, 2).toString() +
                    " 00:00:00";
            else vcFiltro = "";
            if (FecHorFin != "")
                vcFiltro2 =
                    FecHorFin.substr(6, 4).toString() +
                    FecHorFin.substr(3, 2).toString() +
                    FecHorFin.substr(0, 2).toString() +
                    " 23:59:59";
            else vcFiltro2 = "";
        } else if (inFiltro == 3)
            //Empleado
            vcFiltro = LimpiarDatoString($("#txtEmpleado").val());
        else if (inFiltro == 8)
            //Empleado
            vcFiltro = LimpiarDatoString($("#txtOrdenServicioFiltro").val());
        else if (inFiltro == 4)
            //Estados de Aprobación
            vcFiltro = $("#ddlEstadoApr").val();
        else if (inFiltro == 5)
            //Estados de Proceso
            vcFiltro = $("#ddlEstadoPro").val();
        else if (inFiltro == 6) {
            //Tipos de Solicitud
            if ($("#divTipoSolicitud").is(":visible")) {
                vcFiltro = $("#ddlTipo").val();
            } else if ($("#divTipoSolicitudTec").is(":visible")) {
                vcFiltro = $("#ddlTipoTec").val();
            } else if ($("#divTipoSolicitudResApr").is(":visible")) {
                vcFiltro = $("#ddlTipoResApr").val();
            }
        } else if (inFiltro == 7)
            //Notas Por Revisar
            vcFiltro = "";
        else if (inFiltro == 9)
            //Especialistas de Atención
            vcFiltro = $("#txtEspecialista").val();;
        $("#grid").trigger("reloadGrid");
    }

    tab = $("#TabDetalle").tabs({
        tabTemplate:
            "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close'>Remover Tab</span></li>",
        //fx: { height: 'toggle', duration: 800 },
        add: function (event, ui) {
            var ifra = document.createElement("IFRAME");
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
            $(this).tabs("select", "#" + ui.panel.id);
            pagina = "";
            window.top.$("#skLoading").hide();
        },
    });

    function GenerarBotones(
        id,
        biNueNot,
        biVisOpeHis,
        inCantidadNotasUsuario,
        inCantidadNotasOperador
    ) {
        //debugger;
        var vcBotones = "";
        vcBotones += "<div style='display: flex; flex-wrap: wrap; justify-content: space-evenly;'>";
        if (inCantidadNotasOperador > 0 && biVisOpeHis === "1") {
            vcBotones +=
                '  <img id="btnHisOpe_' +
                id +
                '" src="../../../Common/Images/Mantenimiento/Folder_3_18x18.png" class="imgBtn HisOpe btnImgSolGri" style=" /*position: absolute;*/ left: 55px; margin-top: -2px;" title="Ver histórico de operador"/>';
            vcBotones +=
                '  <img style="height:16px;" id="btnNota_' +
                id +
                '" src="../../../Common/Images/Chat/write.png" style="width: 20px;" alt="Ver Notas" class="imgBtn ConImg btnImgSolGri " /*position: absolute;*/ left: 75px;" title="Ver Notas"/>';
        } else {
            //            vcBotones += '      <img id="btnNota_' + id + '" src="../../../Common/Images/Chat/write.png" alt="Ver Notas" class="imgBtn ConImg" title="Ver Notas"/> ';
            vcBotones +=
                '        <img style="height:16px;" id="btnNota_' +
                id +
                '" src="../../../Common/Images/Chat/write.png" style="width: 20px;" alt="Ver Notas" class="imgBtn ConImg btnImgSolGri " title="Ver Notas" /*position: absolute;*/ left: 75px;"/>';
        }
        if (
            inCantidadNotasUsuario > 0 &&
            (biNueNot === "0" || biNueNot === "False")
        ) {
            vcBotones +=
                ' <img id="imgNueNot_' +
                id +
                '" src="../../../Common/Images/Chat/Mail.png" style="width: 10px;" alt="Nueva Nota" title="Nueva Nota" class="btnImgSolGri btnImgNotSol" /*position: absolute;*/ left: 95px; margin-top: 6px;" />';
        }
        else {
            vcBotones +=
                ' <div style="width: 10px;"></div>';
        }

        vcBotones += "</div>";

        return vcBotones;
    }

    function CrearBotonesSemaforo(id, vcUmbral, vcTooltip) {
        if (vcUmbral != "")
            return (
                '<img src="../../../Common/Images/Semaforos/' +
                vcUmbral +
                '_16x16.png" style="cursor: hand !important;" title="' +
                vcTooltip +
                '"/>'
            );
        else return "";
    }

    $(".ConImg").live("click", function () {
        var id = $(this).attr("id").substr(8);
        var datos = $("#grid").jqGrid("getRowData", id);
        window.top.VentanaNotaSignalRActiva = true;
        CodigoSolicitudNota = datos.vcCodigo;
        $("#ifNota").attr(
            "src",
            "Adm_SolicitudNota.aspx?IdSolicitud=" +
            id +
            "&IdEstApr=" +
            datos.F_inEstSol_Apr +
            "&IdEstPro=" +
            datos.F_inEstSol +
            "&BiEscalamiento=" +
            datos.biEscalamiento
        );
        formulario = $("#dvNota").dialog({
            title: "Notas de la Solicitud: " + datos.vcCodigo,
            height: 530,
            width: 703,
            modal: true,
            resizable: false,
            close: function (event, ui) {
                window.top.VentanaNotaSignalRActiva = false;
            },
        });

        $("#imgNueNot_" + id).replaceWith('<div style="width: 10px;"></div>');
    });

    $(".HisOpe").live("click", function () {
        var id = $(this).attr("id").substr(10);
        var datos = $("#grid").jqGrid("getRowData", id);
        $("#ifHisOpe").attr("src", "Adm_HistoricoOperador.aspx?IdSolicitud=" + id);
        CodigoSolicitudNota = datos.vcCodigo;
        formulario = $("#divHisOpe").dialog({
            title: "Histórico de envíos al operador: " + datos.vcCodigo,
            height: 370,
            width: 460,
            modal: true,
            resizable: false,
        });
        $("#divHisOpe").dialog("option", "buttons", [
            {
                text: "Cerrar",
                click: function () {
                    $(this).dialog("close");
                },
            },
        ]);
    });

    if ($("#rbtPorAprobar").is(":checked")) {
        vcVista = "PorAprobar";
    } else if ($("#rbtPorAsignar").is(":checked")) {
        vcVista = "PorAsignar";
    }
    //geig
    if (window.parent.parent.miTipoAlerta == 1) {
        switch (window.parent.parent.miSubtipoAlerta) {
            case 1:
                vcVista = "General";
                inFiltro = 7;
                break;
            case 2:
                vcVista = "PorAprobar";
                break;
            case 3:
                vcVista = "EnProceso";
                break;
            default:
                break;
        }
    } else {
        if ($("#trGeneral").css("display") != "none") vcVista = "General";
        else if ($("#trPorAprobar").css("display") != "none")
            vcVista = "PorAprobar";
        else if ($("#trPorAsignar").css("display") != "none")
            vcVista = "PorAsignar";
        else {
            vcVista = "Pendiente";
        }
    }

    if ($("#hdfMostrarOrdenServicio").val() == "1") {
        NoMostrarOrdenServicio = false;
    } else {
        NoMostrarOrdenServicio = true;
    }


    var cargarDataGrilla = function () {
        $("#dvDatosGrilla").hide();
        $("#dvSinDatos").hide();
        //console.log("NO VISTAS: " + $("#chkSolNoVista").is(":checked") + " -- inFiltro: " + inFiltro)
        $.ajax({
            url: "Adm_ListadoSolicitudes.aspx/Listar", //PageMethod
            data:
                "{'vcTodos':'" +
                vcTodos +
                "'," +
                "'inPagTam':'" +
                $("#grid").getGridParam("rowNum") +
                "'," +
                "'inPagAct':'" +
                parseInt($("#grid").getGridParam("page")) +
                "'," +
                "'vcOrdCol':'" +
                $("#grid").getGridParam("sortname") +
                "'," + //Nombre de columna ordenado
                "'vcTipOrdCol':'" +
                $("#grid").getGridParam("sortorder") +
                "'," + //Tipo de orden de columna asc, desc
                "'strTipos': '" +
                vcTipos +
                "'," +
                "'intFiltro': '" +
                inFiltro +
                "'," +
                "'strFiltro':'" +
                vcFiltro +
                "'," +
                "'strFiltro2':'" +
                vcFiltro2 +
                "'," +
                "'inTipFil':'" +
                $("#ddlTipo").val() +
                "'," +
                "'biSolNoVis':'" +
                $("#chkSolNoVista").is(":checked") +
                "'," +
                //"'vcVista':'" + vcVista  + "'," +
                "'vcVista':'" +
                ($("#hdfIdSolicitud").val() != ""
                    ? $("#hdfLicencia").val() == "BASIC"
                        ? "General"
                        : "Pendiente"
                    : vcVista) +
                "'," +
                "'strRangFechaIni':'" +
                ($("#hdfIdSolicitud").val() != "" ? "" : vcRangoFechaIni) +
                "'," +
                "'strRangFechaFin':'" +
                ($("#hdfIdSolicitud").val() != "" ? "" : vcRangoFechaFin) +
                "'," +
                "'inCodTip':'" +
                $("#hdfCodLinTip_X_User").val() +
                "'," +
                "'vcResAre':'" +
                $("#hdfResApr").val() +
                "'," +
                "'biNotasPorRevisar': '" +
                biNotasPorRevisar +
                "'}",
            dataType: "json",
            type: "post",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                try {
                    if (result.d.Items.length > 0) {
                        $("#dvDatosGrilla").show();
                    } else {
                        $("#dvSinDatos").show();
                    }
                } catch (e) {
                    $("#dvSinDatos").show();
                }

                $("#grid")[0].addJSONData(result.d);

                //var dtFin = new Date();
                //var diff = (dtFin - dtInicio) / 1000;
                //$("#lblFiltro").text(diff);

                if ($("#hdfIdSolicitud").val() != "") {
                    EditarRegistro($("#hdfIdSolicitud").val());
                    $("#hdfIdSolicitud").val("");
                }
                $("#grid").css("width", "100%");
                $("#gbox_grid").css("width", "100%");
                $("#gview_grid").css("width", "100%");
                $(".ui-jqgrid-hdiv").css("width", "100%");
                $(".ui-jqgrid-bdiv").css("width", "100%");
                $("#pager").css("width", "100%");

                $(".ui-jqgrid-htable").css("width", "100%");
                $(".ui-jqgrid-hbox").css("padding-right", "0px");


            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            },
        });
    };

    var horaActualCargarGrilla = [];
    //debugger;
    var tbSolicitudes = $("#grid").jqGrid({
        sortable: true,
        datatype: function () {

            $("#dvDatosGrilla").hide();
            $("#dvSinDatos").hide();

            horaActualCargarGrilla.unshift(new Date());
            setTimeout(function () {
                horaActualCargarGrilla.pop();
                if (horaActualCargarGrilla.length > 0)
                    return;
                cargarDataGrilla();
            }, 250); 
        },
        //Set the jsonReader to the JQGridJSonResponse squema to bind the data.
        jsonReader: {
            root: "Items",
            page: "PaginaActual",
            total: "TotalPaginas",
            records: "TotalRegistros",
            repeatitems: true,
            cell: "Row",
            id: "P_inCodSol",
        },
        colModel: [
            { name: "P_inCodSol", label: "P_inCodSol", hidden: true, key: true },
            {
                name: "Visto",
                label: " ",
                hidden: false,
                width: 60,
                align: "center",
                resizable: false,
                formatter: function (value, options, rData) {
                    return GenerarBotones(
                        rData[0],
                        rData[26],
                        rData[27],
                        rData[34],
                        rData[35]
                    );
                },
            },
            {
                name: "EnPausa",
                label: "   ",
                hidden: false,
                width: 25,
                align: "center",
                sortable: false,
                resizable: false,
                formatter: function (value, options, rData) {
                    if (rData[38].toLowerCase() === "en pausa") {
                        return '<img src = "../../../Common/Images/pausa_naranja.svg" alt = "En pausa" height = "16px" width = "16px" />';
                    }

                    return "";
                },
                //classes: 'border-left-none',
            },
            {
                name: "vcCodigo",
                label: "Código",
                hidden: false,
                width: 120,
                formatter: function (value, options, rData) {
                    return rData[2];
                },
                classes: 'border-left-none',
            },
            {
                name: "NroOrdenServicio",
                label: "Orden Servicio",
                hidden: true,
                width: 80,
                resizable: true,
                formatter: function (value, options, rData) {
                    return rData[3];
                },
            },
            {
                name: "dtFecSol",
                label: "Fecha",
                hidden: false,
                width: 70,
                align: "center",
                formatter: function (value, options, rData) {
                    //return rData[4].substring(0, 10);
                    let fecha = rData[4].substring(0, 8)
                    let html = '';
                    let fechaFormateada = FechaANSIToDDMMYYYY(fecha);
                    html = '<span style="display: none;">' + rData[4] + '</span>' + fechaFormateada;

                    return html;
                },
            },
            {
                name: "ORGA_vcNOMORG",
                label: "Área",
                hidden: false,
                width: 180,
                align: "left",
                classes: "col-texto-largo",
                formatter: function (value, options, rData) {
                    return rData[5];
                },
            },
            {
                name: "ORGA_CodInt2",
                label: "ORGA_CodInt2",
                hidden: true,
                width: 87,
                formatter: function (value, options, rData) {
                    return rData[6];
                },
            },
            {
                name: "vcCodintCompara",
                label: "vcCodintCompara",
                hidden: true,
                width: 87,
                formatter: function (value, options, rData) {
                    return rData[7];
                },
            },
            {
                name: "EMPL_P_vcCODEMP",
                label: "Cód. Empleado",
                hidden: true,
                width: 87,
                formatter: function (value, options, rData) {
                    return rData[8];
                },
            },
            {
                name: "EMPL_vcNOMEMP",
                label: "Nombre Empleado",
                hidden: false,
                width: 200,
                resizable: true,
                classes: "col-texto-largo",
                formatter: function (value, options, rData) {
                    return rData[9];
                },
            },
            {
                name: "inTipSol",
                label: "inTipSol",
                hidden: true,
                formatter: function (value, options, rData) {
                    return rData[10];
                },
            },
            {
                name: "vcNomTipSol",
                label: "Tipo de Solicitud",
                hidden: false,
                width: 130,
                formatter: function (value, options, rData) {
                    return rData[11];
                },
            },
            {
                name: "biPersonalizado",
                label: "biPersonalizado",
                hidden: true,
                width: 107,
                align: "center",
                formatter: function (value, options, rData) {
                    return rData[12];
                },
            },
            {
                name: "F_inEstSol_Apr",
                label: "F_inEstSol_Apr",
                hidden: true,
                formatter: function (value, options, rData) {
                    return rData[13];
                },
            },
            {
                name: "vcNomEstApr",
                label: "Estado Aprobación",
                hidden: false,
                width: 82,
                formatter: function (value, options, rData) {
                    return rData[14];
                },
            },
            {
                name: "F_inEstSol",
                label: "F_inEstSol",
                hidden: true,
                formatter: function (value, options, rData) {
                    return rData[15];
                },
            },
            {
                name: "vcNomEst",
                label: "Estado Proceso",
                hidden: false,
                width: 75,
                formatter: function (value, options, rData) {
                    return rData[16];
                },
            },
            {
                name: "vcEnOper",
                label: "Enviado a operador",
                hidden: true,
                width: 67,
                align: "center",
                formatter: function (value, options, rData) {
                    return rData[18];
                },
            },
            {
                name: "opUmbral",
                label: "Umbral",
                hidden: false,
                width: 57,
                align: "center",
                sortable: false,
                resizable: true,
                formatter: function (value, options, rData) {
                    //debugger;
                    return CrearBotonesSemaforo(rData[0], rData[18], rData[45]);
                },
            },
            {
                name: "inDiaTra",
                label: "Tiempo Transc.",
                hidden: false,
                align: "center",
                width: 95,
                sortable: true,
                formatter: function (value, options, rData) {
                    return rData[19];
                },
            },
            {
                name: "vcUsuTec",
                label: "Especialista Asignado",
                hidden: solicitudMultipleEspecialista,
                width: 107,
                formatter: function (value, options, rData) {
                    return rData[20];
                },
            },
            {
                name: "TecnicoProceso",
                label: "Especialista de Atención",
                hidden: !solicitudMultipleEspecialista,
                width: 107,
                formatter: function (value, options, rData) {
                    return rData[21];
                },
            },
            {
                name: "vcDiaTraUmb",
                label: "Tiempo",
                hidden: false,
                width: 77,
                align: "center",
                formatter: function (value, options, rData) {
                    return rData[22];
                },
            },
            {
                name: "dcMonto",
                index: "dcMonto",
                label: "Monto",
                hidden: true,
                width: 60,
                align: "center",
                formatter: function (value, options, rData) {
                    return rData[23];
                },
            },

            {
                name: "vcTabla",
                index: "vcTabla",
                label: "vcTabla",
                hidden: true,
                width: 67,
                formatter: function (value, options, rData) {
                    return rData[24];
                },
            },
            {
                name: "vcAutDesPDF",
                index: "vcAutDesPDF",
                label: "vcAutDesPDF",
                hidden: true,
                width: 67,
                formatter: function (value, options, rData) {
                    return rData[25];
                },
            },
            {
                name: "biEscalamiento",
                index: "biEscalamiento",
                label: "biEscalamiento",
                hidden: true,
                width: 67,
                formatter: function (value, options, rData) {
                    return rData[33];
                },
            },
            {
                name: "inNotasUsuario",
                index: "inNotasUsuario",
                label: "inNotasUsuario",
                hidden: true,
                width: 67,
                formatter: function (value, options, rData) {
                    return rData[34];
                },
            },
            {
                name: "inNotasOperador",
                index: "inNotasOperador",
                label: "inNotasOperador",
                hidden: true,
                width: 67,
                formatter: function (value, options, rData) {
                    return rData[35];
                },
            },
            {
                name: "NumeroLinea",
                index: "NumeroLinea",
                label: "NumeroLinea",
                hidden: true,
                width: 67,
                formatter: function (value, options, rData) {
                    return rData[36];
                },
            },
            {
                name: "NroOrdenServicio",
                label: "Orden Servicio",
                hidden: NoMostrarOrdenServicio,
                width: 80,
                resizable: true,
                formatter: function (value, options, rData) {
                    return rData[37];
                },
            },
            {
                name: "FechaCierreSolicitud",
                label: "Fecha Cierre Solicitud",
                hidden: false,
                width: 80,
                resizable: true,
                formatter: function (value, options, rData) {
                    let html = '';
                    let fechaFormateada = FechaANSIToDDMMYYYY(rData[39]);
                    html = '<span style="display: none;">' + rData[39] + '</span>' + fechaFormateada;

                    return html;
                },
            },
            {
                name: "btRequerirAutorizacion",
                label: "Solicita Req. Autorización",
                hidden: true,
                width: 80,
                resizable: true,
                formatter: function (value, options, rData) {
                    return rData[42];
                },
            },
            {
                name: "btSolAutorizada",
                label: "Sol. Atendido Autorización",
                hidden: true,
                width: 80,
                resizable: true,
                formatter: function (value, options, rData) {
                    return rData[43];
                },
            },
            {
                name: "UsuarioAutorizador",
                label: "Autorizador",
                hidden: false,
                width: 80,
                resizable: true,
                sortable: false,
                formatter: function (value, options, rData) {
                    return rData[44];
                },
            },
        ],
        viewrecords: true,
        pager: "#pager", //Pager.
        loadtext: "Cargando datos...",
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: "No hay resultados",
        pgtext: "Pág: {0} de {1}", //Paging input control text format.
        rowNum: inFilas, //$("#hdfTamPag").val(), //"10" PageSize.
        rowList: ArrayPaginacionSolicitud, //TamanosPaginaSel, //Variable PageSize DropDownList.
        sortname: "dtFecSol", //sortname: idTabla, //Default SortColumn
        sortorder: "desc", //Default SortOrder.
        rownumbers: true,
        shrinkToFit: false,
        multiselect: true,
        ondblClickRow: function (id) {
            if ($("#btnEditar").button("option", "disabled") == false)
                EditarRegistro(id);
            else if ($("#btnVerDetalle").button("option", "disabled") == false)
                EditarRegistro(id);
            else if ($("#btnProcesar").button("option", "disabled") == false)
                EditarRegistro(id);
        },
        beforeSelectRow: function (id, e) {
            var vcSel = $("#grid").jqGrid("getGridParam", "selarrrow");

            if (
                $("#rbtPorAprobar").is(":checked") ||
                $("#rbtPorAsignar").is(":checked") ||
                $("#rbtEnProceso").is(":checked")
            ) {
                //MultiSelect = true;
                return true;
            } else {
                //MultiSelect = false;
                if (vcSel.length == 1) {
                    if (vcSel[0] == id) return true;
                    //Deselecciona la fila
                    else {
                        $("#grid").jqGrid("resetSelection");
                        return true; //Selecciona más de una fila = false
                    }
                } else if (vcSel.length == 0) {
                    return true; //Selecciona una fila = true
                }
            }
        },
        onSelectRow: function (id) {
            var datos = $("#grid").jqGrid("getRowData", id);

            if (
                $("#rbtGeneral").is(":checked") ||
                $("#rbtPendiente").is(":checked")
            ) {
                if (datos.F_inEstSol_Apr == 32) {
                    //Pendiente
                    //Verificar permiso para EDITAR
                    var vcEdi = "0";
                    var i = 0;
                    for (i = 0; i < vcGruTipSolEdi.length; i++) {
                        if (vcGruTipSolEdi[i] == datos.inTipSol) vcEdi = "1";
                    }
                    if (vcEdi == "0") {
                        $("#btnEditar").button("option", "disabled", true);
                        $("#btnVerDetalle").button("option", "disabled", false);
                    } else {
                        $("#btnEditar").button("option", "disabled", false);
                        $("#btnVerDetalle").button("option", "disabled", true);
                    }

                    //Verificar permiso para ELIMINAR
                    var vcEli = "0";
                    var i = 0;
                    for (i = 0; i < vcGruTipSolEli.length; i++) {
                        if (vcGruTipSolEli[i] == datos.inTipSol) vcEli = "1";
                    }
                    if (vcEli == "0")
                        $("#btnEliminar").button("option", "disabled", true);
                    else $("#btnEliminar").button("option", "disabled", false);
                } else {
                    $("#btnEditar").button("option", "disabled", true);
                    $("#btnVerDetalle").button("option", "disabled", false);
                    $("#btnEliminar").button("option", "disabled", true);
                }

                if (
                    datos.F_inEstSol_Apr == 34 &&
                    datos.F_inEstSol == 7 &&
                    datos.vcAutDesPDF != ""
                ) {
                    $("#btnAutDesPDF").button("option", "disabled", false);
                } else {
                    $("#btnAutDesPDF").button("option", "disabled", true);
                }
            } else if ($("#rbtPorAprobar").is(":checked")) {
                var vcSel = $("#grid").jqGrid("getGridParam", "selarrrow");
                if (vcSel.length > 1 || vcSel.length == 0) {
                    $("#btnVerDetalle").button("option", "disabled", true);
                } else {
                    $("#btnVerDetalle").button("option", "disabled", false);
                }
            } else if ($("#rbtPorAsignar").is(":checked")) {
                var vcSel = $("#grid").jqGrid("getGridParam", "selarrrow");
                if (vcSel.length > 1 || vcSel.length == 0) {
                    $("#btnVerDetalle").button("option", "disabled", true);
                } else {
                    $("#btnVerDetalle").button("option", "disabled", false);
                }
            } else if ($("#rbtEnProceso").is(":checked")) {
                var vcSel = $("#grid").jqGrid("getGridParam", "selarrrow");
                if (vcSel.length > 1 || vcSel.length == 0) {
                    $("#btnProcesar").button("option", "disabled", false); //editado.
                    $("#btnSubirFormato").button("option", "disabled", true);
                    ////$("#btnDescargaFormato").button("option", "disabled", true);
                } else {
                    $("#btnProcesar").button("option", "disabled", false);
                    $("#btnSubirFormato").button("option", "disabled", false);
                    ////$("#btnDescargaFormato").button("option", "disabled", false);
                }
            }
        },
        sortable: function (permutation) {
            //var colModels = $("#grid").getGridParam("colModel");
            //alert(colModels);
        },
        afterInsertRow: function (rowid, aData, rowelem) {
            if (aData.btVig == "False") {
                var colModels = $("#tblPoliticaSolicitudxGrupo").getGridParam(
                    "colModel"
                );
                var i;
                for (i in colModels) {
                    $("#tblPoliticaSolicitudxGrupo").jqGrid("setCell", rowid, i, "", {
                        color: "red",
                    });
                }
            }
        },
    })
        .navGrid("#pager", { edit: false, add: false, search: false, del: false });

    //geig

    if (window.parent.parent.miTipoAlerta == 1) {
        window.parent.parent.miTipoAlerta = 0;

        switch (window.parent.parent.miSubtipoAlerta) {
            case 1:
                $("#hdfBusquedaIni").val("7");
                $("#rbtNotasPorRevisar").attr("checked", "checked");
                $("#divRangoFecha").hide();
                fnVistaGeneral(true);
                $("#lblVista").html("Notas por revisar");
                biNotasPorRevisar = true;
                ActualizarGrilla();
                break;
            case 2:
                $("#rbtPorAprobar").attr("checked", "checked");
                $("#divRangoFecha").hide();
                fnVistaPorAprobar(true);
                ActualizarGrilla();
                break;
            case 3:
                $("#rbtEnProceso").attr("checked", "checked");
                $("#divRangoFecha").hide();
                fnVistaEnProceso();
                ActualizarGrilla();
                break;
            default:
                break;
        }
    } else {
        if (
            $("#trGeneral").css("display") != "none" ||
            $("#rbtGeneral").is(":checked")
        ) {
            $("#rbtGeneral").attr("checked", "checked");
            $("#divRangoFecha").show();
            fnVistaGeneral(true);
            AsignarRangoFechas();
            ActualizarGrilla();
        } else if (
            $("#trPorAprobar").css("display") != "none" ||
            $("#rbtPorAprobar").is(":checked")
        ) {
            $("#rbtPorAprobar").attr("checked", "checked");
            $("#divRangoFecha").hide();
            fnVistaPorAprobar(true);
            ActualizarGrilla();
        } else if (
            $("#trPorAsignar").css("display") != "none" ||
            $("#rbtPorAsignar").is(":checked")
        ) {
            $("#rbtPorAsignar").attr("checked", "checked");
            $("#divRangoFecha").hide();
            fnVistaPorAsignar(true);
            ActualizarGrilla();
        } else {
            //fnVistaGeneral(true);
            $("#rbtPendiente").attr("checked", "checked");
            $("#divRangoFecha").show();
            fnVistaPendiente(true);
            $("label[for=rbtGeneral]").html("Mis Solicitudes");
            ActualizarGrilla();
            fnQuitarFiltroEstados();
            fnCargarFiltroTipoSolicitud();
        }
    }

    $("#grid_vcDiaTraUmb").append(
        "<span id='lblvcDiaTraUmb' style='margin-top:-3px; display:inline-block'>Aprobación</span>"
    );

    function fnVistaPendiente(blQuitarFiltros) {
        $("#lblVista").html("Mis Pendientes");
        $("#tdFecha").css("display", "none"); //agregado 22-09-2015 wapumayta
        try {
            $("#grid").hideCol("cb");
            $("#grid").hideCol("EMPL_vcNOMEMP");
            $("#grid").hideCol("vcEnOper");

            $('#ddlFiltro option[value="2"]').show();

            $("#grid").hideCol("vcDiaTraUmb");
            $("#grid").showCol("opUmbral");
            $("#grid").showCol("inDiaTra");

            if (!solicitudMultipleEspecialista) {
                $("#grid").showCol("vcUsuTec");
            } else {
                $("#grid").hideCol("vcUsuTec");
            }
            $("#grid").hideCol("ORGA_vcNOMORG");
        } catch (err) {
            //some err
        }

        if (blQuitarFiltros == false) {
            $("#grid").jqGrid("resetSelection");
        }

        $("#btnAprobar").hide();
        $("#btnRechazar").hide();
        $("#btnAsignar").hide();
        $("#btnAsignarA").hide();
        $("#btnReasignarA").hide();
        $("#btnEditar").show();
        $("#btnProcesar").hide();
        $("#btnSubirFormato").hide();

        $("#dvAprobarRechazarAsignar").hide();
        $("#dvFiltro").removeClass("col-md-4").addClass("col-md-5");

        $("#dvFormatos").hide();

        $("#btnVerDetalle").hide();
        $("#btnAutDesPDF").hide();
        $("#btnValeResguardo").hide();
        $("#btnEliminar").show();
        vcVista = "Pendiente";
        vcTipos = $("#hdfGruTipSol").val();

        //if ($("#hdfBusquedaIni").val() == "")
        //    $("#ddlFiltro option[value='7']").remove();

        if (blQuitarFiltros == false) {
            fnQuitarFiltroEstados();
            fnAgregarFiltroEstados();
        }
        //        if ($("#hdfAdmin").val() == "0" && $("#hdfTecnico").val() == "0" && $("#hdfResApr").val() == "0") {
        //            $("#grid").hideCol("EMPL_P_vcCODEMP");
        //            $("#grid").hideCol("EMPL_vcNOMEMP");
        //        }
    }
    function fnVistaPorAprobar(blQuitarFiltros) {
        $("#lblVista").html("Por Aprobar");
        $("#lblvcDiaTraUmb").html("Por Aprobar");
        $("#tdFecha").css("display", "none"); //agregado 22-09-2015 wapumayta
        try {
            $("#grid").showCol("cb");
            $("#grid").hideCol("vcEnOper");
            $("#grid").hideCol("vcUsuTec");
            $("#grid").hideCol("TecnicoProceso");
            $("#grid").showCol("opUmbral");
            $("#grid").showCol("inDiaTra");
            $("#grid").hideCol("EnPausa");
            $("#grid").hideCol("UsuarioAutorizador");
            $("#grid").showCol("EMPL_vcNOMEMP");
            $("#grid").showCol("vcDiaTraUmb");
            $("#grid").hideCol("ORGA_vcNOMORG");
            $('#ddlFiltro option[value="2"]').show();
        } catch (err) {
            //some err
        }

        if (blQuitarFiltros == false) {
            $("#grid").jqGrid("resetSelection");
        }
        $("#btnAprobar").show();
        $("#btnRechazar").show();
        $("#btnAsignar").hide();
        $("#btnAsignarA").hide();
        $("#btnReasignarA").hide();
        $("#btnEditar").hide();
        $("#btnProcesar").hide();
        $("#btnSubirFormato").hide();

        $("#dvAprobarRechazarAsignar").show();
        $("#dvFiltro").removeClass("col-md-5").addClass("col-md-4");

        $("#dvFormatos").hide();

        $("#btnVerDetalle").show();
        $("#btnVerDetalle").button("option", "disabled", true);
        $("#btnAutDesPDF").hide();
        $("#btnValeResguardo").hide();
        $("#btnEliminar").hide();

        vcVista = "PorAprobar";
        vcTipos = $("#hdfResAprTipSol").val();
        if (blQuitarFiltros == false) {
            fnQuitarFiltroEstados();
        } else {
            try {
                $("#grid").hideCol("vcNomEstApr");
                $("#grid").hideCol("vcNomEst");
            } catch (err) {
                //some err
            }
        }
    }
    function fnVistaAprobada() {
        $("#tdFecha").css("display", "none"); //agregado 22-09-2015 wapumayta
        $("#lblVista").html("Aprobadas");
        $("#grid").hideCol("cb");
        $("#grid").hideCol("vcEnOper");
        if (!solicitudMultipleEspecialista) {
            $("#grid").showCol("vcUsuTec");
        } else {
            $("#grid").hideCol("vcUsuTec");
        }
        $("#grid").hideCol("opUmbral");
        $("#grid").hideCol("inDiaTra");
        $("#grid").jqGrid("resetSelection");

        $('#ddlFiltro option[value="2"]').show();

        $("#btnAprobar").hide();
        $("#btnRechazar").hide();
        $("#btnAsignar").hide();
        $("#btnAsignarA").hide();
        $("#btnReasignarA").hide();
        $("#dvAprobarRechazarAsignar").hide();
        $("#dvFiltro").removeClass("col-md-4").addClass("col-md-5");

        $("#btnEditar").hide();
        $("#btnProcesar").hide();
        $("#btnSubirFormato").hide();

        $("#dvFormatos").hide();

        $("#btnVerDetalle").show();
        $("#btnVerDetalle").button("option", "disabled", false);
        $("#btnAutDesPDF").hide();
        $("#btnValeResguardo").hide();
        $("#btnEliminar").hide();
        vcVista = "Aprobada";
        vcTipos = $("#hdfResAprTipSol").val();

        $("#grid").hideCol("ORGA_vcNOMORG");

        //$("#ddlFiltro option[value='7']").remove();
        fnQuitarFiltroEstados();
        fnAgregarFiltroEstadoProceso();
    }
    function fnVistaRechazada() {
        $("#tdFecha").css("display", "none"); //agregado 22-09-2015 wapumayta
        $("#lblVista").html("Rechazadas");
        $("#grid").hideCol("cb");
        $("#grid").hideCol("vcEnOper");
        $("#grid").hideCol("vcUsuTec");
        $("#grid").hideCol("opUmbral");
        $("#grid").hideCol("inDiaTra");
        $("#grid").jqGrid("resetSelection");

        $("#btnAprobar").hide();
        $("#btnRechazar").hide();
        $("#btnAsignar").hide();
        $("#btnAsignarA").hide();
        $("#btnReasignarA").hide();
        $("#dvAprobarRechazarAsignar").hide();
        $("#dvFiltro").removeClass("col-md-4").addClass("col-md-5");

        $('#ddlFiltro option[value="2"]').show();

        $("#btnEditar").hide();
        $("#btnProcesar").hide();
        $("#btnSubirFormato").hide();

        $("#dvFormatos").hide();

        $("#btnVerDetalle").show();
        $("#btnAutDesPDF").hide();
        $("#btnValeResguardo").hide();
        $("#btnVerDetalle").button("option", "disabled", false);
        $("#btnEliminar").hide();
        vcVista = "Rechazada";
        vcTipos = $("#hdfResAprTipSol").val();

        $("#grid").hideCol("ORGA_vcNOMORG");

        fnQuitarFiltroEstados();
    }
    function fnVistaPorAsignar(blQuitarFiltros) {
        $("#tdFecha").css("display", "none"); //agregado 22-09-2015 wapumayta
        $("#lblVista").html("Por Asignar");
        $("#lblvcDiaTraUmb").html("Por Asignar");

        try {
            $("#grid").showCol("cb");
            $("#grid").hideCol("vcEnOper");
            $("#grid").hideCol("vcUsuTec");
            $("#grid").showCol("opUmbral");
            $("#grid").showCol("inDiaTra");
            $("#grid").showCol("ORGA_vcNOMORG");
            //$("#grid").showCol("EMPL_P_vcCODEMP");
            $("#grid").showCol("EMPL_vcNOMEMP");
            $("#grid").showCol("vcDiaTraUmb");
        } catch (err) {
            //some err
        }

        if (blQuitarFiltros == false) {
            $("#grid").jqGrid("resetSelection");
        }

        $('#ddlFiltro option[value="2"]').show();
        $("#btnAprobar").hide();
        $("#btnRechazar").hide();
        $("#btnAsignar").show();
        $("#btnAsignarA").show();
        $("#btnReasignarA").hide();
        $("#btnAsignarA").button("option", "disabled", true);
        $("#dvAprobarRechazarAsignar").show();
        $("#dvFiltro").removeClass("col-md-5").addClass("col-md-4");

        $("#btnEditar").hide();
        $("#btnProcesar").hide();
        $("#btnSubirFormato").hide();

        $("#dvFormatos").hide();

        $("#btnVerDetalle").show();
        $("#btnVerDetalle").button("option", "disabled", true);
        $("#btnAutDesPDF").hide();
        $("#btnValeResguardo").hide();
        $("#btnEliminar").hide();
        vcVista = "PorAsignar";
        vcTipos = $("#hdfUsuTipSolCre").val();
        if (blQuitarFiltros == false) {
            fnQuitarFiltroEstados();
        } else {
            try {
                $("#grid").hideCol("vcNomEstApr");
                $("#grid").hideCol("vcNomEst");
            } catch (err) {
                //some err
            }
        }
        if ((hdfTecResSol = "")) {
            $("#btnAsignarA").button("option", "disabled", true);
        } else {
            $("#btnAsignarA").button("option", "disabled", false);
        }
    }
    function fnVistaEnProceso() {
        $("#tdFecha").css("display", "none"); //agregado 22-09-2015 wapumayta
        $("#lblVista").html("En Proceso");
        $("#lblvcDiaTraUmb").html("En Proceso");

        try {
            $('#ddlFiltro option[value="2"]').show();
            $("#grid").showCol("cb");
            if (!solicitudMultipleEspecialista) {
                $("#grid").showCol("inDiaTra");
                $("#grid").showCol("vcUsuTec");
            } else {
                $("#grid").hideCol("inDiaTra");
                $("#grid").hideCol("vcUsuTec");
            }
            $("#grid").showCol("opUmbral");
            $("#grid").hideCol("TecnicoProceso");
            $("#grid").showCol("ORGA_vcNOMORG");
            $("#grid").showCol("EnPausa");
            $("#grid").showCol("UsuarioAutorizador");
            $("#grid").showCol("EMPL_vcNOMEMP");
            $("#grid").jqGrid("resetSelection");
            $("#grid").showCol("vcDiaTraUmb");
        } catch (err) {
            //some err
        }

        $("#btnAprobar").hide();
        $("#btnRechazar").hide();
        $("#btnAsignar").hide();
        $("#btnAsignarA").hide();
        $("#dvAprobarRechazarAsignar").hide();
        $("#dvFiltro").removeClass("col-md-4").addClass("col-md-5");
        if (!solicitudMultipleEspecialista) {
            $("#dvAprobarRechazarAsignar").show();
            $("#dvFiltro").removeClass("col-md-5").addClass("col-md-4");
            $("#btnReasignarA").show();
            $("#btnReasignarA").button("option", "disabled", true);
        }

        $("#btnEditar").hide();
        $("#btnProcesar").show();
        //$("#btnSubirFormato").show();

        $("#dvFormatos").show();

        $("#btnVerDetalle").hide();
        $("#btnEliminar").hide();
        $("#btnAutDesPDF").hide();
        $("#btnValeResguardo").hide();
        vcVista = "EnProceso";
        vcTipos = $("#hdfUsuTipSolEdi").val();

        fnQuitarFiltroEstados();

        if ((hdfTecResSol = "")) {
            $("#btnReasignarA").button("option", "disabled", true);
        } else {
            $("#btnReasignarA").button("option", "disabled", false);
        }
    }

    function fnVistaPorAutorizar() {
        $("#tdFecha").css("display", "none"); //agregado 22-09-2015 wapumayta
        $("#lblVista").html("Por Autorizar");
        $("#lblvcDiaTraUmb").html("En Proceso");

        try {
            $('#ddlFiltro option[value="2"]').show();
            $("#grid").showCol("cb");
            if (!solicitudMultipleEspecialista) {
                $("#grid").showCol("inDiaTra");
                $("#grid").showCol("vcUsuTec");
            } else {
                $("#grid").hideCol("inDiaTra");
                $("#grid").hideCol("vcUsuTec");
            }
            $("#grid").showCol("opUmbral");
            $("#grid").hideCol("TecnicoProceso");
            $("#grid").showCol("ORGA_vcNOMORG");
            $("#grid").showCol("EnPausa");
            $("#grid").hideCol("UsuarioAutorizador");
            $("#grid").showCol("EMPL_vcNOMEMP");
            $("#grid").jqGrid("resetSelection");
            $("#grid").showCol("vcDiaTraUmb");
        } catch (err) {
            //some err
        }

        $("#btnAprobar").hide();
        $("#btnRechazar").hide();
        $("#btnAsignar").hide();
        $("#btnAsignarA").hide();
        $("#dvAprobarRechazarAsignar").hide();
        $("#dvFiltro").removeClass("col-md-4").addClass("col-md-5");
        if (!solicitudMultipleEspecialista) {
            $("#dvAprobarRechazarAsignar").show();
            $("#dvFiltro").removeClass("col-md-5").addClass("col-md-4");
            $("#btnReasignarA").show();
            $("#btnReasignarA").button("option", "disabled", true);
        }

        $("#btnEditar").hide();
        $("#btnProcesar").show();
        //$("#btnSubirFormato").show();

        $("#dvFormatos").show();

        $("#btnVerDetalle").hide();
        $("#btnEliminar").hide();
        $("#btnAutDesPDF").hide();
        $("#btnValeResguardo").hide();
        vcVista = "PorAutorizar";
        vcTipos = $("#hdfUsuTipSolEdi").val();

        fnQuitarFiltroEstados();

        if ((hdfTecResSol = "")) {
            $("#btnReasignarA").button("option", "disabled", true);
        } else {
            $("#btnReasignarA").button("option", "disabled", false);
        }
    }

    function fnVistaCulminada() {
        $('#ddlFiltro option[value="2"]').show();
        $("#tdFecha").css("display", "none"); //agregado 22-09-2015 wapumayta
        $("#lblVista").html("Culminadas");
        $("#grid").hideCol("cb");
        $("#grid").hideCol("vcEnOper");
        if (!solicitudMultipleEspecialista) {
            $("#grid").showCol("vcUsuTec");
        } else {
            $("#grid").hideCol("vcUsuTec");
        }
        $("#grid").hideCol("opUmbral");
        $("#grid").hideCol("inDiaTra");
        $("#grid").jqGrid("resetSelection");

        $("#btnAprobar").hide();
        $("#btnRechazar").hide();
        $("#btnAsignar").hide();
        $("#btnAsignarA").hide();
        $("#btnReasignarA").hide();
        $("#dvAprobarRechazarAsignar").hide();
        $("#dvFiltro").removeClass("col-md-4").addClass("col-md-5");

        $("#btnEditar").hide();
        $("#btnProcesar").hide();
        $("#btnSubirFormato").hide();

        $("#dvFormatos").hide();

        $("#btnVerDetalle").show();
        $("#btnVerDetalle").button("option", "disabled", false);
        $("#btnEliminar").hide();
        $("#btnAutDesPDF").hide();
        $("#btnValeResguardo").hide();
        vcVista = "Culminada";
        vcTipos = $("#hdfUsuTipSol").val();

        $("#grid").hideCol("ORGA_vcNOMORG");

        fnQuitarFiltroEstados();
    }
    function fnVistaAnulada() {
        $('#ddlFiltro option[value="2"]').show();
        $("#tdFecha").css("display", "none"); //agregado 22-09-2015 wapumayta
        $("#lblVista").html("Anuladas");
        $("#grid").hideCol("cb");
        $("#grid").hideCol("vcEnOper");
        if (!solicitudMultipleEspecialista) {
            $("#grid").showCol("vcUsuTec");
        } else {
            $("#grid").hideCol("vcUsuTec");
        }
        $("#grid").hideCol("opUmbral");
        $("#grid").hideCol("inDiaTra");
        $("#grid").jqGrid("resetSelection");

        $("#btnAprobar").hide();
        $("#btnRechazar").hide();
        $("#btnAsignar").hide();
        $("#btnAsignarA").hide();
        $("#btnReasignarA").hide();
        $("#dvAprobarRechazarAsignar").hide();
        $("#dvFiltro").removeClass("col-md-4").addClass("col-md-5");

        $("#btnEditar").hide();
        $("#btnProcesar").hide();
        $("#btnSubirFormato").hide();

        $("#dvFormatos").hide();

        $("#btnVerDetalle").show();
        $("#btnVerDetalle").button("option", "disabled", false);
        $("#btnEliminar").hide();
        $("#btnAutDesPDF").hide();
        $("#btnValeResguardo").hide();
        vcVista = "Anulada";
        vcTipos = $("#hdfUsuTipSol").val();

        $("#grid").hideCol("ORGA_vcNOMORG");

        fnQuitarFiltroEstados();
    }

    function AsignarRangoFechas() {
        var dtmDayRangoFechaFin = new Date();
        var dtmDayRangoFechaIni = new Date();
        //        //dtmDayRangoFechaIni = new Date(dtmDayRangoFechaFin.getTime() - (30 * 24 * 3600 * 1000));
        //        //dtmDayRangoFechaFin = (("0" + dtmDayRangoFechaFin.getDate()).slice(-2)) + "/" + (("0" + (dtmDayRangoFechaFin.getMonth() + 1)).slice(-2)) + "/" + dtmDayRangoFechaFin.getFullYear();
        //        //dtmDayRangoFechaIni = (("0" + dtmDayRangoFechaIni.getDate()).slice(-2)) + "/" + (("0" + (dtmDayRangoFechaIni.getMonth() + 1)).slice(-2)) + "/" + dtmDayRangoFechaIni.getFullYear();
        //        //$("#txtRangoFechaIni").val(dtmDayRangoFechaIni);
        //$("#txtRangoFechaFin").val(dtmDayRangoFechaFin);
        $("#txtRangoFechaIni").val($("#hdfdaFechaIni").val());
        $("#txtRangoFechaFin").val($("#hdfdaFechaFin").val());

        if ($("#rbtGeneral").is(":checked")) {
            var RangFecIni = $("#txtRangoFechaIni").val();
            var RangFecFin = $("#txtRangoFechaFin").val();
            vcRangoFechaIni = "";
            if (RangFecIni != "")
                vcRangoFechaIni =
                    RangFecIni.substr(6, 4).toString() +
                    RangFecIni.substr(3, 2).toString() +
                    RangFecIni.substr(0, 2).toString() +
                    " 00:00:00";
            else vcRangoFechaFin = "";
            if (RangFecFin != "")
                vcRangoFechaFin =
                    RangFecFin.substr(6, 4).toString() +
                    RangFecFin.substr(3, 2).toString() +
                    RangFecFin.substr(0, 2).toString() +
                    " 23:59:59";
            else vcRangoFechaFin = "";
        } else {
            vcRangoFechaIni = "";
            vcRangoFechaFin = "";
        }
    }

    $("#btnAgregar").live("click", function () {
        pagina = "../Adm_NuevaSolicitud.aspx";
        var Id = "#" + $("#hdfvcTab").val() + "_Tab_Nuevo";
        var $panel = tab.find(Id);
        if (!$panel.length) {
            //En el caso que no exista el tab, lo crea
            //window.top.$("#skLoading").show();
            window.top.MostrarLoading();
            //alert('abc');
            tab.tabs("add", Id, "Nuevo");
            $(Id).css("width", "99%");
            $(Id).css("height", "94%");
            $(Id).css("margin-top", "0px");
            $(Id).css("margin-left", "0px");
            $(Id).css("margin-bottom", "0px");
            $(Id).css("margin-right", "0px");
            $(Id).css("padding-top", "0px");
            $(Id).css("padding-left", "0px");
            $(Id).css("padding-bottom", "0px");
            $(Id).css("padding-right", "0px");
        } else {
            //En el caso que exista lo muestra
            tab.tabs("select", Id);
        }
    });

    $("#btnAgregarMasivo").live("click", function () {
        pagina = "../Adm_NuevaSolicitudMasivo.aspx";
        var Id = "#" + $("#hdfvcTab").val() + "_Tab_NuevoMasivo";
        var $panel = tab.find(Id);
        if (!$panel.length) {
            //En el caso que no exista el tab, lo crea
            //window.top.$("#skLoading").show();
            window.top.MostrarLoading();
            tab.tabs("add", Id, "Nuevo (Masivo)");
            $(Id).css("width", "99%");
            $(Id).css("height", "94%");
            $(Id).css("margin-top", "0px");
            $(Id).css("margin-left", "0px");
            $(Id).css("margin-bottom", "0px");
            $(Id).css("margin-right", "0px");
            $(Id).css("padding-top", "0px");
            $(Id).css("padding-left", "0px");
            $(Id).css("padding-bottom", "0px");
            $(Id).css("padding-right", "0px");
        } else {
            //En el caso que exista lo muestra
            tab.tabs("select", Id);
        }
    });

    $("#btnMasivo").live("click", function () {
        pagina = "Adm_SolicitudMasiva.aspx";
        var Id = "#" + $("#hdfvcTab").val() + "_Tab_Masivo";
        var $panel = tab.find(Id);
        if (!$panel.length) {
            //En el caso que no exista el tab, lo crea
            //window.top.$("#skLoading").show();
            window.top.MostrarLoading();
            tab.tabs("add", Id, "Solicitudes Masiva");
            $(Id).css("width", "99%");
            $(Id).css("height", "94%");
            $(Id).css("margin-top", "0px");
            $(Id).css("margin-left", "0px");
            $(Id).css("margin-bottom", "0px");
            $(Id).css("margin-right", "0px");
            $(Id).css("padding-top", "0px");
            $(Id).css("padding-left", "0px");
            $(Id).css("padding-bottom", "0px");
            $(Id).css("padding-right", "0px");
        } else {
            //En el caso que exista lo muestra
            tab.tabs("select", Id);
        }
    });

    $("#btnEditar").live("click", function () {
        fnEditarRegistro();
    });

    $("#btnVerDetalle").live("click", function () {
        fnEditarRegistro();
    });

    $("#btnProcesar").live("click", function () {
        fnEditarRegistro();
    });

    $("#btnSubirFormato").live("click", function () {
        alerta("Aquí se subirá el formato...");
    });

    $("#btnEliminar").live("click", function () {
        fnEliminarSolicitud();
    });

    $("#btnAprobar").live("click", function () {
        fnAprobarSolicitud();
    });

    $("#btnRechazar").live("click", function () {
        fnRechazarSolicitud();
    });
    $("#btnAsignar").live("click", function () {
        fnAsignarseSolicitud();
    });
    $("#btnAsignarA").live("click", function () {
        fnAsignarSolicitudA();
    });
    $("#btnReasignarA").live("click", function () {
        fnReasignarSolicitudA();
    });
    $("#btnAutDesPDF").click(function () {
        fnVerAutorizacionDescuentoPDF();
    });
    $("#btnValeResguardo").click(function () {
        fnVerValeResguardo();
    });

    function fnVerValeResguardo() {
        var selRowIds = $("#grid").jqGrid("getGridParam", "selarrrow");
        if (selRowIds.length == 0) {
            alerta("Debe seleccionar un ítem.");
            return;
        } else if (selRowIds.length > 1) {
            alerta("Debe seleccionar sólo un ítem.");
            return;
        }

        var data = $("#grid").jqGrid("getRowData", selRowIds[0]);

        LineaSeleccionada = data.NumeroLinea;
        SolicitudSeleccionada = data.P_inCodSol;

        GenerarResguardo(LineaSeleccionada, SolicitudSeleccionada);
    }
    function GenerarResguardo(Numero, _IdSolicitudSeleccionada) {
        $.ajax({
            url: "../Cam_DespachoEmpleado.aspx/ObtenerDatosResguardo",
            data: "{'Numero':'" + Numero + "'}",
            dataType: "json",
            type: "post",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                $("#lblNroConsecutivoAnterior").html(
                    "(Anterior: " + result.d[0].NroConsecutivo + ")"
                );
                try {
                    $("#txtNroConsecutivo").val(
                        parseFloat(result.d[0].NroConsecutivo) + 1
                    );
                    $("#txtObservaciones").val(result.d[0].Observaciones);
                    $("#txtAdministradorContrato").val(result.d[0].Responsable);
                    $("#txtModelo").val(result.d[0].Modelo);
                    $("#txtMarca").val(result.d[0].MarcaModelo);
                    $("#txtNroServicio").val(result.d[0].P_vcNum);
                    $("#txtIMEI").val(result.d[0].F_vcCodIMEI);
                    $("#txtSIM").val(result.d[0].SIM);
                    $("#txtPIN").val(result.d[0].PIN);
                    $("#txtFactura").val(result.d[0].NumeroFactura_OS);
                    $("#txtCosto").val(result.d[0].dcMonto_Equipo);
                    $("#ddlTipoServicio").val(result.d[0].IdTipoModeloDispositivo);
                } catch (e) {
                    //some
                }
                var widthGenerarResguardo = $(window).width() - 20;
                var heightGenerarResguardo = $(window).height() - 20;
                if (widthGenerarResguardo > 900) {
                    widthGenerarResguardo = 900;
                } else if (widthGenerarResguardo < 400) {
                    widthGenerarResguardo = 400;
                }
                if (heightGenerarResguardo > 500) {
                    heightGenerarResguardo = 500;
                } else if (heightGenerarResguardo < 200) {
                    heightGenerarResguardo = 200;
                }
                $("#dvGenerarResguardo").dialog({
                    title: "Generar Reporte",
                    modal: true,
                    width: widthGenerarResguardo,
                    height: heightGenerarResguardo,
                    buttons: {
                        Generar: function () {
                            var oDialogo = this;

                            var Accesorios = "";
                            $("[id*=chkAccesorios] input:checked").each(function () {
                                Accesorios += "," + $(this).val();
                            });
                            if (Accesorios.length > 0) {
                                Accesorios = Accesorios.substr(1, Accesorios.length - 1);
                            }
                            var txtFactura = $.trim($("#txtFactura").val());
                            var txtNroConsecutivo = $.trim($("#txtNroConsecutivo").val());
                            var ddlTipoServicio = $("#ddlTipoServicio").val();
                            var txtCosto = $.trim($("#txtCosto").val());
                            var txtMarca = $.trim($("#txtMarca").val());
                            var txtModelo = $.trim($("#txtModelo").val());
                            var txtNroServicio = $.trim($("#txtNroServicio").val());
                            var txtIMEI = $.trim($("#txtIMEI").val());
                            var txtSIM = $.trim($("#txtSIM").val());
                            var txtPIN = $.trim($("#txtPIN").val());
                            var txtObservaciones = $.trim($("#txtObservaciones").val());
                            var txtResponsable = $.trim($("#txtAdministradorContrato").val());
                            txtFactura = txtFactura.replace(/'/g, "");
                            txtNroConsecutivo = txtNroConsecutivo.replace(/'/g, "");
                            txtCosto = txtCosto.replace(/'/g, "");
                            txtMarca = txtMarca.replace(/'/g, "");
                            txtModelo = txtModelo.replace(/'/g, "");
                            txtNroServicio = txtNroServicio.replace(/'/g, "");
                            txtIMEI = txtIMEI.replace(/'/g, "");
                            txtSIM = txtSIM.replace(/'/g, "");
                            txtPIN = txtPIN.replace(/'/g, "");
                            txtObservaciones = txtObservaciones.replace(/'/g, "");
                            txtResponsable = txtResponsable.replace(/'/g, "");

                            if (txtFactura == "") {
                                alerta(
                                    "Debe ingresar un código de factura",
                                    "Mensaje",
                                    function () {
                                        $("#txtFactura").focus();
                                    }
                                );
                                return;
                            }
                            if (txtNroConsecutivo == "") {
                                alerta("Debe ingresar un valor", "Mensaje", function () {
                                    $("#txtNroConsecutivo").focus();
                                });
                                return;
                            }
                            if (txtCosto == "") {
                                alerta("Debe ingresar un valor", "Mensaje", function () {
                                    $("#txtCosto").focus();
                                });
                                return;
                            }
                            if (txtMarca == "") {
                                alerta("Debe ingresar una marca", "Mensaje", function () {
                                    $("#txtMarca").focus();
                                });
                                return;
                            }
                            if (txtModelo == "") {
                                alerta("Debe ingresar un modelo", "Mensaje", function () {
                                    $("#txtModelo").focus();
                                });
                                return;
                            }
                            if (txtNroServicio == "") {
                                alerta("Debe ingresar un número", "Mensaje", function () {
                                    $("#txtNroServicio").focus();
                                });
                                return;
                            }
                            if (txtIMEI == "") {
                                alerta("Debe ingresar un valor", "Mensaje", function () {
                                    $("#txtIMEI").focus();
                                });
                                return;
                            }
                            ////if (txtSIM == "") {
                            ////    alerta("Debe ingresar un valor", "Mensaje", function () {
                            ////        $("#txtSIM").focus();
                            ////    });
                            ////    return;
                            ////}
                            ////if (txtPIN == "") {
                            ////    alerta("Debe ingresar un valor", "Mensaje", function () {
                            ////        $("#txtPIN").focus();
                            ////    });
                            ////    return;
                            ////}
                            if (txtObservaciones == "") {
                                alerta("Debe ingresar un valor", "Mensaje", function () {
                                    $("#txtObservaciones").focus();
                                });
                                return;
                            }
                            if (txtResponsable == "") {
                                alerta("Debe ingresar un valor", "Mensaje", function () {
                                    $("#txtAdministradorContrato").focus();
                                });
                                return;
                            }

                            $.ajax({
                                url: "../Cam_DespachoEmpleado.aspx/GuardarDatosResguardo",
                                data:
                                    "{'Factura':'" +
                                    txtFactura +
                                    "','NroConsecutivo':'" +
                                    txtNroConsecutivo +
                                    "','TipoServicio':'" +
                                    ddlTipoServicio +
                                    "'," +
                                    "'Costo':'" +
                                    txtCosto +
                                    "','Marca':'" +
                                    txtMarca +
                                    "', 'Modelo':'" +
                                    txtModelo +
                                    "'," +
                                    "'NroServicio':'" +
                                    txtNroServicio +
                                    "','IMEI':'" +
                                    txtIMEI +
                                    "', 'SIM':'" +
                                    txtSIM +
                                    "'," +
                                    "'PIN':'" +
                                    txtPIN +
                                    "','Observaciones':'" +
                                    txtObservaciones +
                                    "','Accesorios':'" +
                                    Accesorios +
                                    "','Responsable':'" +
                                    txtResponsable +
                                    "'}",
                                dataType: "json",
                                type: "post",
                                contentType: "application/json; charset=utf-8",
                                success: function (result) {
                                    var pagina =
                                        "../Adm_ReporteDevExpress.aspx?vcTab=MOV_Solicitud&vcTipRep=2&IdResguardo=" +
                                        result.d +
                                        "&Sol=" +
                                        _IdSolicitudSeleccionada;
                                    $("#ifReporteFormato").attr("src", pagina);

                                    $(oDialogo).dialog("close");
                                },
                                error: function (xhr, err, thrErr) {
                                    MostrarErrorAjax(xhr, err, thrErr);
                                },
                            });
                        },
                        Cancelar: function () {
                            $(this).dialog("close");
                        },
                    },
                });
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            },
        });
    }

    function fnVerAutorizacionDescuentoPDF() {
        var id = null;
        var ids;
        if (idSeleccionado == null) {
            ids = $("#grid").jqGrid("getGridParam", "selarrrow");
            if (ids.length == 0) {
                alerta("Seleccione un registro");
                return;
            } else {
                id = ids[0];
            }
        } else {
            id = idSeleccionado;
        }
        idSeleccionado = null;
        var datos = $("#grid").jqGrid("getRowData", id);

        if (id) {
            if (datos.vcAutDesPDF != "") {
                var vcFile =
                    "P_Movil/Administrar/Solicitudes/AutorizacionDescuento" +
                    CarpetaDominio +
                    "/" +
                    datos.vcAutDesPDF;
                $.ajax({
                    url: raiz(vcFile), //or your url
                    success: function (data) {
                        window.location.href = raiz(
                            "Common/Controladores/DescargarArchivo.ashx?archivo=" + vcFile
                        );
                    },
                    error: function (data) {
                        alerta("No se encontró el archivo a descargar.");
                    },
                });
            }
        } else {
            alerta("Seleccione un registro");
        }
    }
    function EditarRegistro(id) {
        pagina = $("#btnEditar").attr("url");
        if (pagina != "") {
            idSeleccionado = id;
            fnEditarRegistro();
        }
    }

    function fnAprobarSolicitud() {
        id = $("#grid").jqGrid("getGridParam", "selarrrow");
        if (id.length == 0) {
            alerta("Seleccione por lo menos un registro");
            return;
        }

        $("#divConApr").dialog({
            title: "Aprobar Solicitud",
            modal: true,
            buttons: {
                Si: function () {
                    $.ajax({
                        type: "POST",
                        url: "Adm_ListadoSolicitudes.aspx/AprobarSolicitud",
                        data: "{'vcCodSol': '" + id + "', 'vcFecApro': ''}", //TipoOrigen
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            $("#grid").trigger("reloadGrid");
                            Mensaje(
                                "<br/><h1>La solicitud fue aprobada con éxito</h1><br/>",
                                document,
                                CerroMensaje
                            );
                            //debugger;
                            window.top.AlertHubSignal.server.sendAlert(window.top.$("#hdfCodigoDominio").val());
                            fnCargarGrilla();
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        },
                    });
                    $(this).dialog("close");
                },
                Cancelar: function () {
                    $(this).dialog("close");
                },
            },
        });
    }

    function fnRechazarSolicitud() {
        id = $("#grid").jqGrid("getGridParam", "selarrrow");
        if (id.length == 0) {
            alerta("Seleccione por lo menos un registro");
            return;
        }

        $("#txtComentarios").val("");
        $("#txtComentarios").focus();

        $("#divConRec").dialog({
            title: "Rechazar Solicitud",
            modal: true,
            buttons: {
                Si: function () {
                    $(this).dialog("close");

                    $("#dvRechazar").dialog({
                        title: "Rechazar Solicitud",
                        modal: true,
                        width: 500,
                        buttons: {
                            Rechazar: function () {
                                if ($.trim($("#txtComentarios").val()) == "") {
                                    alerta("Debe ingresar algún comentario");
                                    return;
                                }

                                $.ajax({
                                    type: "POST",
                                    url: "Adm_ListadoSolicitudes.aspx/RechazarSolicitud",
                                    data:
                                        "{'vcCodSol': '" +
                                        id +
                                        "'," +
                                        "'vcComentarios':'" +
                                        $("#txtComentarios").val() +
                                        "'}", //TipoOrigen
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    success: function (result) {
                                        $("#grid").trigger("reloadGrid");
                                        Mensaje(
                                            "<br/><h1>La solicitud fue rechazada con éxito</h1><br/>",
                                            document,
                                            CerroMensaje
                                        );
                                        fnCargarGrilla();
                                    },
                                    error: function (xhr, err, thrErr) {
                                        MostrarErrorAjax(xhr, err, thrErr);
                                    },
                                });
                                $(this).dialog("close");
                            },
                            Cancelar: function () {
                                $(this).dialog("close");
                            },
                        },
                    });
                },
                Cancelar: function () {
                    $(this).dialog("close");
                },
            },
        });
    }

    function fnEliminarSolicitud() {
        id = $("#grid").jqGrid("getGridParam", "selarrrow");
        if (id.length == 0) {
            alerta("Seleccione por lo menos un registro");
            return;
        }

        var datos = $("#grid").jqGrid("getRowData", id);

        $("#divConEli").dialog({
            title: "Eliminar Solicitud",
            modal: true,
            buttons: {
                Si: function () {
                    $.ajax({
                        type: "POST",
                        url: "Adm_ListadoSolicitudes.aspx/EliminarSolicitud",
                        data:
                            "{'inCodSol': '" +
                            id +
                            "'," + //TipoOrigen
                            "'inTipSol': '" +
                            datos.inTipSol +
                            "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            $("#grid").trigger("reloadGrid");
                            Mensaje(
                                "<br/><h1>La solicitud fue eliminada con éxito</h1><br/>",
                                document,
                                CerroMensaje
                            );
                            fnCargarGrilla();
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        },
                    });
                    $(this).dialog("close");
                },
                Cancelar: function () {
                    $(this).dialog("close");
                },
            },
        });
    }

    function confirmacionProcesoMasivo(
        fncAccionCulminar,
        fncAccionAnular,
        fncAccionCancelar
    ) {
        $("#dvContenidoAlerta").html("");
        $("#dvContenidoAlerta").html("Seleccione la tarea a realizar");
        $("#dvMsgAlerta").dialog({
            title: "Proceso masivo",
            modal: true,
            resizable: false,
            buttons: {
                Culminar: function () {
                    $(this).dialog("close");
                    if (fncAccionCulminar != null && fncAccionCulminar != undefined)
                        fncAccionCulminar();
                },
                Anular: function () {
                    $(this).dialog("close");
                    if (fncAccionAnular != null && fncAccionAnular != undefined)
                        fncAccionAnular();
                },
                Cancelar: function () {
                    $(this).dialog("close");
                    if (fncAccionCancelar != null && fncAccionCancelar != undefined)
                        fncAccionCancelar();
                },
            },
        });
    }

    function ajaxProcesarSolicitudesMasivas(tipo, ids) {
        getAjax(
            "Adm_ListadoSolicitudes.aspx/procesarSolicitudes",
            "{'tipo':'" + tipo + "','ids':'" + ids + "'}"
        ).then(
            function (data) {
                alerta("Solicitudes procesadas. " + data.d);
                ActualizarGrilla();
            },
            function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        );
    }

    function procesarSolicitudesMasivas(ids) {
        var sIds = ids.join(",");
        confirmacionProcesoMasivo(
            function () {
                //Procesar
                ajaxProcesarSolicitudesMasivas("culminar", sIds);
            },
            function () {
                //Anular
                ajaxProcesarSolicitudesMasivas("anular", sIds);
            }
        );
    }

    function fnEditarRegistro() {
        var id = null;
        var ids;
        if (idSeleccionado == null) {
            ids = $("#grid").jqGrid("getGridParam", "selarrrow");
            if (ids.length == 0) {
                alerta("Seleccione un registro");
                return;
            } else {
                if (ids.length > 1) {
                    procesarSolicitudesMasivas(ids);
                    return;
                } else {
                    id = ids[0];
                }
            }
        } else {
            id = idSeleccionado;
        }
        idSeleccionado = null;
        var datos = $("#grid").jqGrid("getRowData", id);

        //        if (datos.F_inEstSol == 9) {
        //            alerta("Una solicitud 'Rechazada' no puede ser procesada.");
        //            return;
        //        }

        if (id) {
            //var IdTab = "#" + $("#hdfvcTab").val() + "_Tab_Editar";
            var IdTab = "#" + $("#hdfvcTab").val() + "_Tab_Procesar";
            var $panel = tab.find(IdTab);
            var datos = $("#grid").jqGrid("getRowData", id);

            var vistaPorAutorizar = "0";

            //if ($("#rbtPorAutorizar").is(":checked")) {
            //    vistaPorAutorizar = "1";
            //}

            vistaPorAutorizar = datos.btRequerirAutorizacion

            //debugger;
            var vcParametros =
                "?vcCodEmp=" +
                datos.EMPL_P_vcCODEMP +
                "&inTipSol=" +
                datos.inTipSol +
                "&biAdmin=" +
                $("#hdfAdmin").val() +
                "&biTecnico=" +
                $("#hdfTecnico").val() +
                "&biResApr=" +
                $("#hdfResApr").val() +
                "&inEst=" +
                datos.F_inEstSol +
                "&inEst_Apr=" +
                datos.F_inEstSol_Apr +
                "&vcTabla=" +
                datos.vcTabla +
                "&biEscalamiento=" +
                datos.biEscalamiento +
                "&esVistaPorAutorizar=" +
                vistaPorAutorizar + 
                "&"

            if (datos.biPersonalizado == "True" || datos.biPersonalizado == "SI")
                pagina = "Adm_EditarSolicitudPersonalizada.aspx";
            else {
                //                if (datos.F_inEstSol == 7) {
                //                    alerta("Una solicitud 'Culminada' no puede ser procesada");
                //                    return;
                //                }

                //                if ($("#hdfAdmin").val() == "1")
                //                    pagina = "Adm_ProcesarSolicitud.aspx";
                //                else
                pagina = "Adm_ProcesarSolicitud.aspx";
            }
            pagina = pagina + vcParametros;

            if (pagina != "") {
                if (!$panel.length) {
                    //En el caso que no exista el tab, lo crea
                    pagina += "Cod=" + id;
                    //tab.tabs("add", IdTab, "Cambiar Estado");  //cambio
                    //window.top.$("#skLoading").show();
                    window.top.MostrarLoading();
                    tab.tabs("add", IdTab, "Procesar Solicitud");
                    $(IdTab).css("width", "99%");
                    $(IdTab).css("height", "94%");
                    $(IdTab).css("margin-top", "0px");
                    $(IdTab).css("margin-left", "0px");
                    $(IdTab).css("margin-bottom", "0px");
                    $(IdTab).css("margin-right", "0px");
                    $(IdTab).css("padding-top", "0px");
                    $(IdTab).css("padding-left", "0px");
                    $(IdTab).css("padding-bottom", "0px");
                    $(IdTab).css("padding-right", "0px");
                } else {
                    //En el caso que exista lo muestra
                    if (vcCod == id) {
                        //Si el codigo anterior seleccionado es igual al actual
                        tab.tabs("select", IdTab);
                        //tab.tabs("remove", $panel.index() - 1);
                        //pagina += "?Cod=" + id;
                        //tab.tabs("add", IdTab, "Editar igual");
                        //$(IdTab).css("width", "99%");
                        //$(IdTab).css("height", "94%");
                        //$(IdTab).css("margin-top", "0px");
                        //$(IdTab).css("margin-left", "0px");
                        //$(IdTab).css("margin-bottom", "0px");
                        //$(IdTab).css("margin-right", "0px");
                        //$(IdTab).css("padding-top", "0px");
                        //$(IdTab).css("padding-left", "0px");
                        //$(IdTab).css("padding-bottom", "0px");
                        //$(IdTab).css("padding-right", "0px");
                        //tab.tabs('select', IdTab);
                    } else {
                        tab.tabs("remove", $panel.index() - 1);
                        pagina += "Cod=" + id;
                        //window.top.$("#skLoading").show();
                        window.top.MostrarLoading();
                        tab.tabs("add", IdTab, "Procesar Solicitud");
                        $(IdTab).css("width", "99%");
                        $(IdTab).css("height", "94%");
                        $(IdTab).css("margin-top", "0px");
                        $(IdTab).css("margin-left", "0px");
                        $(IdTab).css("margin-bottom", "0px");
                        $(IdTab).css("margin-right", "0px");
                        $(IdTab).css("padding-top", "0px");
                        $(IdTab).css("padding-left", "0px");
                        $(IdTab).css("padding-bottom", "0px");
                        $(IdTab).css("padding-right", "0px");
                    }
                }
            } else {
                alerta("Usted no tiene permiso para editar/procesar esta solicitud.");
            }
            vcCod = id;
        } else {
            alerta("Seleccione un registro");
        }
    }

    function fnAsignarseSolicitud() {
        id = $("#grid").jqGrid("getGridParam", "selarrrow");
        var vcTit = "Asignarse Solicitud";
        vcMen = "La solicitud fue asignada con éxito";

        if (id.length == 0) {
            alerta("Seleccione por lo menos un registro");
            return;
        }

        if (id.length > 1) {
            var vcTit = "Asignarse Solicitudes";
            vcMen = "Las solicitudes fueron asignadas con éxito";
        }

        $("#divConAsi").dialog({
            title: vcTit,
            modal: true,
            buttons: {
                Si: function () {
                    $.ajax({
                        type: "POST",
                        url: "Adm_ListadoSolicitudes.aspx/AsignarseSolicitud",
                        data: "{'vcCodSol': '" + id + "'}", //TipoOrigen
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            $("#grid").trigger("reloadGrid");
                            Mensaje(
                                "<br/><h1>" + vcMen + "</h1><br/>",
                                document,
                                CerroMensaje
                            );
                            fnCargarGrilla();
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        },
                    });
                    $(this).dialog("close");
                },
                Cancelar: function () {
                    $(this).dialog("close");
                },
            },
        });
    }

    function fnAsignarSolicitudA() {

        vcEsReasignar = "0";
        lstIdSol = "";
        id = $("#grid").jqGrid("getGridParam", "selarrrow");
        vcTit = "Asignar Solicitud A";
        vcMen = "La solicitud fue asignada con éxito";

        if (id.length == 0) {
            alerta("Seleccione por lo menos un registro");
            return;
        }

        vcIdTipSol = $("#grid").jqGrid("getRowData", id[0]).inTipSol;
        vcCodint2 = $("#grid").jqGrid("getRowData", id[0]).ORGA_CodInt2;
        vcComparaCodint2 = $("#grid").jqGrid("getRowData", id[0]).vcCodintCompara;
        var i = 0;
        for (i = 0; i < id.length; i++) {
            var datos = $("#grid").jqGrid("getRowData", id[i]);
            lstIdSol = lstIdSol + id[i].toString() + ",";
            //Valida que todos los tipos de solicitud de las solicitudes elegidas sean iguales
            if (datos.inTipSol != vcIdTipSol) {
                alerta(
                    "Todas las solicitudes elegidas deben ser del mismo tipo.",
                    "Solicitudes",
                    null,
                    "warning"
                );
                return;
            }

            if (datos.ORGA_CodInt2 != vcCodint2) {
                alerta(
                    "Todas las solicitudes elegidas deben ser de la misma área.",
                    "Solicitudes",
                    null,
                    "warning"
                );
                return;
            }

            if (datos.vcEnOper == "SI") {
                alerta(
                    "Todas las solicitudes elegidas no deben haber sido enviadas a operador."
                );
                return;
            }
        }
        //Valida que el usuario logeado sea técnico responsable del tipo de solicitud de las solicitudes elegidas
        var lstTecResTipSol = $("#hdfTecResSol").val().split(",");
        var biEsRes = "0";
        var i = 0;
        for (i = 0; i < lstTecResTipSol.length; i++) {
            if (vcIdTipSol == lstTecResTipSol[i]) biEsRes = "1";
        }
        if (biEsRes == "0" && $("#hdfEsAdministradorSolicitud").val() == "0") {
            alerta(
                "Usted no es especialista responsable de las solicitudes elegidas."
            );
            return;
        }

        if (id.length > 1) {
            vcTit = "Asignar Solicitudes A";
            vcMen = "Las solicitudes fueron asignadas con éxito";
        }

        lstIdSol = lstIdSol.substring(0, lstIdSol.length - 1);

        vcConTecResJQ =
            "P_inCod in (select distinct f_inUsu from mov_tiposolicitud_usuario where F_intipsol in (" +
            vcIdTipSol.toString() +
            ") )  ";

        if (vcComparaCodint2 != "") {
            vcConTecResJQ =
                vcConTecResJQ +
                " and P_incod in ( " +
                " Select F_inUsu From (Select A.F_inUsu, B.ORGA_CodInt2 " +
                " From MOV_Solicitud_TecnicoArea as A " +
                " inner join M_ORGA as B on B.ORGA_P_inCODINT = A.F_inCodInt) T " +
                " Where T.ORGA_CodInt2 like {" +
                vcComparaCodint2 +
                "%} " +
                ")";
        }

        $("#bpTecRes_btnBuscar").click();
        $("#bpTecRes_txtValor").val("");
        buscarValor_bpTecRes = "";
        $("#bpTecRes_grid").trigger("reloadGrid");
    }

    function AbrirTab(Id) {
        var $panel = tab.find(Id);
        if (!$panel.length) {
            //En el caso que no exista el tab, lo crea
            //window.top.$("#skLoading").show();
            window.top.MostrarLoading();
            tab.tabs("add", Id, Titulo);
            $(Id).css("width", "99%");
            $(Id).css("height", "94%");
            $(Id).css("margin-top", "0px");
            $(Id).css("margin-left", "0px");
            $(Id).css("margin-bottom", "0px");
            $(Id).css("margin-right", "0px");
            $(Id).css("padding-top", "0px");
            $(Id).css("padding-left", "0px");
            $(Id).css("padding-bottom", "0px");
            $(Id).css("padding-right", "0px");

            $(Id).css("border", "0px solid gray");
        } else {
            //En el caso que exista lo muestra
            tab.tabs("select", Id);
        }
    }

    function fnReasignarSolicitudA() {
        vcEsReasignar = "1";
        lstIdSol = "";
        id = $("#grid").jqGrid("getGridParam", "selarrrow");
        vcTit = "Reasignar Solicitud A";
        vcMen = "La solicitud fue reasignada con éxito";

        if (id.length == 0) {
            alerta("Seleccione por lo menos un registro");
            return;
        }

        vcIdTipSol = $("#grid").jqGrid("getRowData", id[0]).inTipSol;
        var i = 0;
        for (i = 0; i < id.length; i++) {
            var datos = $("#grid").jqGrid("getRowData", id[i]);
            lstIdSol = lstIdSol + id[i].toString() + ",";
            //Valida que todos los tipos de solicitud de las solicitudes elegidas sean iguales
            if (datos.inTipSol != vcIdTipSol) {
                alerta("Todas las solicitudes elegidas deben ser del mismo tipo.");
                return;
            }
        }
        //Valida que el usuario logeado sea técnico responsable del tipo de solicitud de las solicitudes elegidas
        var lstTecResTipSol = $("#hdfTecResSol").val().split(",");
        var biEsRes = "0";
        var i = 0;
        for (i = 0; i < lstTecResTipSol.length; i++) {
            if (vcIdTipSol == lstTecResTipSol[i]) biEsRes = "1";
        }
        if (biEsRes == "0" && $("#hdfEsAdministradorSolicitud").val() == "0") {
            alerta(
                "Usted no es especialista responsable de las solicitudes elegidas."
            );
            return;
        }

        if (id.length > 1) {
            vcTit = "Asignar Solicitudes A";
            vcMen = "Las solicitudes fueron asignadas con éxito";
        }

        lstIdSol = lstIdSol.substring(0, lstIdSol.length - 1);
        vcConTecResJQ =
            "P_inCod in (select distinct f_inUsu from mov_tiposolicitud_usuario where F_intipsol in (" +
            vcIdTipSol.toString() +
            ") )";
        $("#bpTecRes_btnBuscar").click();
        $("#bpTecRes_txtValor").val("");
        buscarValor_bpTecRes = "";
        $("#bpTecRes_grid").trigger("reloadGrid");
    }

    if ($("#hdfIsAccessAdd").val() == "1") {
        pagina = "../Adm_NuevaSolicitud.aspx";
        var Id = "#" + $("#hdfvcTab").val() + "_Tab_Nuevo";
        var $panel = tab.find(Id);
        if (!$panel.length) {
            //En el caso que no exista el tab, lo crea
            //window.top.$("#skLoading").show();
            window.top.MostrarLoading();
            tab.tabs("add", Id, "Nuevo");
            $(Id).css("width", "99%");
            $(Id).css("height", "94%");
            $(Id).css("margin-top", "0px");
            $(Id).css("margin-left", "0px");
            $(Id).css("margin-bottom", "0px");
            $(Id).css("margin-right", "0px");
            $(Id).css("padding-top", "0px");
            $(Id).css("padding-left", "0px");
            $(Id).css("padding-bottom", "0px");
            $(Id).css("padding-right", "0px");
        } else {
            //En el caso que exista lo muestra
            //            if ($("#hdfIdSolicitud").val() != "") {
            //                EditarRegistro($("#hdfIdSolicitud").val());
            //                $("#hdfIdSolicitud").val("");
            //            }
            //            alerta($("#hdfIdSolicitud").val());
            tab.tabs("select", Id);
        }
    }

    $("#ulListaFormatos").hide().menu();
    $("#btnFormatos , #ulListaFormatos").hover(
        function () {
            $("#ulListaFormatos").hide();
            $("#ulListaFormatos")
                .show()
                .position({
                    my: "left top",
                    at: "left bottom",
                    of: $("#btnFormatos")[0],
                });
        },
        function () {
            $("#ulListaFormatos").hide();
        }
    );

    $(".aFormato").click(function () {
        var TablaSolicitud = "";
        var IdSolicitud = "";
        var idsSel = $("#grid").jqGrid("getGridParam", "selarrrow");
        var Menu = $(this).text().trim();
        if (Menu == "") {
            Menu = $(this).attr("title");
        }

        if (Menu == "Formato de Asignación") {
            if ($(idsSel).length == 0 || $(idsSel).length > 1) {
                alerta("Seleccione un registro");
                return;
            } else {
                var datos = $("#grid").jqGrid("getRowData", idsSel[0]);
                IdSolicitud = datos.P_inCodSol;
                TablaSolicitud = datos.vcTabla;
            }
        }

        switch (Menu) {
            case "Orden de Servicio":
                DescargarFormatoOrdenServicio();
                break;
            //case "Vale Resguardo":
            //    GenerarResguardo(Numero);
            //    break;
            case "Formato de Asignación":
                GenerarFormatoAsignacion(TablaSolicitud, IdSolicitud);
                break;
            default:
        }

        $("#ulListaFormatos").hide();
    });

    $("#ulListaReportes").hide().menu();
    $("#btnReportes , #ulListaReportes").hover(
        function () {
            $("#ulListaReportes").hide();
            $("#ulListaReportes")
                .show()
                .position({
                    my: "left top",
                    at: "left bottom",
                    of: $("#btnReportes")[0],
                });
        },
        function () {
            $("#ulListaReportes").hide();
        }
    );
    $("#btnReportes").height(31);

    $(".aReporte").click(function () {
        var Menu = $(this).text();

        switch (Menu) {
            case "Reporte Solicitudes":
                pagina =
                    "../Mantenimiento/Reportes/Mnt_List_Solicitudes.aspx?vcTipRep=9&vcTab=MOV_Solicitud";
                Id = "#MOV_Solicitud_Tab_9999";
                Titulo = Menu;
                AbrirTab(Id);
                break;
            case "Reporte Orden de Servicio":
                pagina =
                    "../Mantenimiento/Reportes/Mnt_List_Orden_Servicio.aspx?vcTipRep=9&vcTab=MOV_SOL_OrdenServicio";
                Id = "#MOVOrden_Servicio_Tab_9999";
                Titulo = Menu;
                AbrirTab(Id);
                break;
                break;
            default:
        }

        //    $(this).attr("URL") + "&inEstado=" + FiltroRegistro + "&vcCampoFiltro=" + $("#ddlBusqueda").val().split("-")[1] + "&vcDescFiltro=" + ValorBusqueda();
        //var Id;
        //if (pagina == "../../P_Movil/Consultar/Con_CriteriosReporte.aspx?vcTipRep=4&vcTab=MOV_Dispositivo" && $("#hdfvcTab").val() == "MOV_Dispositivo") {
        //    Id = "#" + $("#hdfvcTab").val() + "_Tab_CriteriosReporteDispositivo";
        //    Titulo = $(this).html();
        //    AbrirTab(Id);
        //}
        //else if (pagina == "../../P_Movil/Consultar/Con_CriteriosReporte.aspx?vcTipRep=5&vcTab=MOV_Linea" && $("#hdfvcTab").val() == "MOV_Linea") {
        //    Id = "#" + $("#hdfvcTab").val() + "_Tab_CriteriosReporteLinea";
        //    Titulo = $(this).html();
        //    AbrirTab(Id);
        //}
        //else {
        //    Id = "#" + $("#hdfvcTab").val() + "_Tab_" + $(this).attr("idTab");
        //    Titulo = $(this).html();
        //    AbrirTab(Id);
        //}

        $("#ulListaReportes").hide();
    });

    inicioPagina();

    //debugger;
    if ($('#hdfTecnico').val() === '1') {
        $('#rbtEnProceso').click();
        $("#rbtEnProceso").attr("checked", "checked");
    }

    let usuarioEsResponsableDeArea = $('#hdfEsResponsableDeArea').val() === '1';

    if (usuarioEsResponsableDeArea === false) {

        $('#trPorAprobar').hide();
    }
});

function fnQuitarFiltroEstados() {
    if ($("#rbtGeneral").is(":checked")) {
        $("#ddlFiltro option[value='2']").remove();
        $("#tdFecha").css("display", "block");
    } else {
        $("#ddlFiltro option[value='2']").remove();
        $("#ddlFiltro option[value='6']").remove();
        //$("#ddlFiltro option[value='7']").remove();
        $("#ddlFiltro").append(
            $("<option></option>").val("2").html("Rango de Fechas")
        );
        $("#ddlFiltro").append(
            $("<option></option>").val("6").html("Tipo de Solicitud")
        );
        $("#ddlFiltro").append(
            $("<option></option>").val("9").html("Especialista de Atención")
        );

        //if (!$('#rbtPendiente').is(':checked')) {
        //    $("#ddlFiltro").append($('<option></option>').val('7').html('--Notas Por Revisar--'));
        //}
        $("#tdFecha").css("display", "none");
    }
    $("#ddlFiltro option[value='4']").remove();
    $("#ddlFiltro option[value='5']").remove();
    $("#ddlFiltro option[value='9']").remove();

    try {
        $("#grid").hideCol("vcNomEstApr");
        $("#grid").hideCol("vcNomEst");
    } catch (err) {
        //some err
    }

    $("#ddlFiltro option[value='1']").prop("selected", true);
    inFiltro = 1;
    $("#divCodigo").show();
    $("#divFecha").hide();
    $("#divEmpleado").hide();
    $("#divOrdenServicio").hide();
    $("#divTipoSolicitud").hide();
    $("#divTipoSolicitudTec").hide();
    $("#divTipoSolicitudResApr").hide();
    $("#divEstadoApr").hide();
    $("#divEstadoPro").hide();
    $("#divEspecialistaProc").hide();
}
function fnAgregarFiltroEstados() {
    $("#ddlFiltro").append(
        $("<option></option>").val("4").html("Estados de Aprobación")
    );
    $("#ddlFiltro").append(
        $("<option></option>").val("5").html("Estados de Proceso")
    );

    $("#ddlFiltro").append(
        $("<option></option>").val("9").html("Especialista de Atención")
    );

    //$("#ddlFiltro").append($('<option></option>').val('7').html('--Notas Por Revisar--'));
    $("#grid").showCol("vcNomEstApr");
    $("#grid").showCol("vcNomEst");
}
function fnAgregarFiltroEstadoProceso() {
    $("#ddlFiltro").append(
        $("<option></option>").val("5").html("Estados de Proceso")
    );
    //$("#ddlFiltro").append($('<option></option>').val('7').html('--Notas Por Revisar--'));
    $("#grid").showCol("vcNomEst");
}

function fnVistaGeneral(blQuitarFiltros) {
    if (
        $("#hdfAdmin").val() == "0" &&
        $("#hdfTecnico").val() == "0" &&
        $("#hdfResApr").val() == "0"
    ) {
        $("#lblVista").html("Mis Solicitudes");
    } else {
        $("#lblVista").html("General");
    }

    try {
        $("#grid").hideCol("cb");
        $("#grid").hideCol("vcEnOper");

        if (!solicitudMultipleEspecialista) {
            $("#grid").showCol("vcUsuTec");
        } else {
            $("#grid").hideCol("vcUsuTec");
        }
        $("#grid").showCol("TecnicoProceso");
        $("#grid").showCol("opUmbral");
        $("#grid").showCol("inDiaTra");
        $('#ddlFiltro option[value="2"]').hide();
        $("#grid").showCol("EMPL_vcNOMEMP");
        $("#grid").hideCol("vcDiaTraUmb");

        $("#grid").showCol("FechaHoraCierreSol");
    } catch (err) {
        //some err
    }

    if (blQuitarFiltros == false) {
        $("#grid").jqGrid("resetSelection");
    }
    $("#btnEditar").button("option", "disabled", true);
    $("#btnVerDetalle").button("option", "disabled", true);
    $("#btnAutDesPDF").button("option", "disabled", true);

    $("#btnAprobar").hide();
    $("#btnRechazar").hide();
    $("#btnAsignar").hide();
    $("#btnAsignarA").hide();
    $("#btnReasignarA").hide();
    $("#dvAprobarRechazarAsignar").hide();
    $("#dvFiltro").removeClass("col-md-4").addClass("col-md-5");

    $("#btnEditar").show(); //Depende del estado aprobación
    $("#btnProcesar").hide();
    $("#btnVerDetalle").show(); //Depende del estado aprobación
    $("#btnAutDesPDF").show();
    $("#btnValeResguardo").show();
    $("#btnEliminar").show();
    vcVista = "General";
    vcTipos = $("#hdfGruTipSol").val();
    /*
      if ($("#hdfBusquedaIni").val() == "")
          $("#ddlFiltro option[value='7']").remove();
      else {
          //#region agregado 01-10-2015 wapumayta
          //$("#ddlFiltro option[value='7']").remove();
          //fnQuitarFiltroEstados();
          //fnAgregarFiltroEstados();
          //#endregion
          $("#ddlFiltro").val("7");
          $("#ddlFiltro").change();
      }
      */
    if (blQuitarFiltros == false) {
        fnQuitarFiltroEstados();
        fnAgregarFiltroEstados();
        if (
            $("#hdfAdmin").val() == "0" &&
            $("#hdfTecnico").val() == "0" &&
            $("#hdfResApr").val() == "0"
        ) {
            //$("#grid").hideCol("EMPL_P_vcCODEMP");
            $("#grid").hideCol("EMPL_vcNOMEMP");
        }
    }

    if (
        $("#hdfAdmin").val() == "0" &&
        $("#hdfTecnico").val() == "0" &&
        $("#hdfResApr").val() == "0"
    ) {
        $("#lblVista").html("Mis Solicitudes");
        $("label[for=rbtGeneral]").html("Mis Solicitudes");
    } else {
        $("#lblVista").html("General");
        $("label[for=rbtGeneral]").html("General");
    }
}

function fnCargarFiltroTipoSolicitud() {
    if (inFiltro == 6 && vcVista == "General") {
        $("#divTipoSolicitud").show();
        $("#divTipoSolicitudTec").hide();
        $("#divTipoSolicitudResApr").hide();
    } else if (
        inFiltro == 6 &&
        (vcVista == "Pendiente" ||
            vcVista == "PorAprobar" ||
            vcVista == "Aprobada" ||
            vcVista == "Rechazada")
    ) {
        $("#divTipoSolicitud").hide();
        $("#divTipoSolicitudTec").hide();
        $("#divTipoSolicitudResApr").show();
    } else if (
        inFiltro == 6 &&
        (vcVista == "PorAsignar" ||
            vcVista == "EnProceso" ||
            vcVista == "Culminada" ||
            vcVista == "Anulada")
    ) {
        $("#divTipoSolicitud").hide();
        $("#divTipoSolicitudTec").show();
        $("#divTipoSolicitudResApr").hide();
    }
}

function fnIniciarFiltros() {
    $("#txtCodigo").val("");
    $("#txtFechaIni").val("");
    $("#txtFechaFin").val("");
    $("#txtEmpleado").val("");
    $("#txtOrdenServicioFiltro").val("");

    $("#divCodigo").hide();
    $("#divFecha").hide();
    $("#divEmpleado").hide();
    $("#divOrdenServicio").hide();
    $("#divEstadoApr").hide();
    $("#divEstadoPro").hide();
    $("#divTipoSolicitud").hide();
    $("#divTipoSolicitudTec").hide();
    $("#divTipoSolicitudResApr").hide();
    $("#divEspecialistaProc").hide();
}

function miFnActulizarPorAlerta() {

    window.parent.$("#dvCargando").hide();
    if (window.parent.parent.miTipoAlerta == 1) {
        window.parent.parent.miTipoAlerta = 0;

        switch (window.parent.parent.miSubtipoAlerta) {
            case 1:
                //$("#hdfBusquedaIni").val("7");
                //$("#divRangoFecha").hide();
                $("#rbtNotasPorRevisar").attr("checked", "checked");
                $("#rbtNotasPorRevisar").change();
                break;
            case 2:
                $("#rbtPorAprobar").attr("checked", "checked");
                $("#rbtPorAprobar").change();
                break;
            case 3:
                $("#rbtEnProceso").attr("checked", "checked");
                $("#rbtEnProceso").change();
                break;
            default:
                break;
        }
    }
}

function SaveToDisk(fileURL, fileName) {
    // for non-IE
    try {
        if (!window.ActiveXObject) {
            var save = document.createElement("a");
            save.href = fileURL;
            save.target = "_blank";
            save.download = fileName || fileURL;
            var evt = document.createEvent("MouseEvents");
            evt.initMouseEvent(
                "click",
                true,
                true,
                window,
                1,
                0,
                0,
                0,
                0,
                false,
                false,
                false,
                false,
                0,
                null
            );
            save.dispatchEvent(evt);
            (window.URL || window.webkitURL).revokeObjectURL(save.href);
        }
        // for IE
        else if (!!window.ActiveXObject && document.execCommand) {
            var _window = window.open(fileURL, "_blank");
            _window.document.close();
            _window.document.execCommand("SaveAs", true, fileName || fileURL);
            _window.close();
        }
    } catch (e) { }
}

function DescargarFormatoOrdenServicio() {
    var IdSolicitudes = $("#grid").jqGrid("getGridParam", "selarrrow");
    if (IdSolicitudes.length == 0) {
        alerta("Debe seleccionar una solicitud como mínimo");
        return;
    }

    //Validar que sea la misma solicitud...
    var vcIdTipSol = $("#grid").jqGrid("getRowData", IdSolicitudes[0]).inTipSol;
    var vcTabla = $("#grid").jqGrid("getRowData", IdSolicitudes[0]).vcTabla;
    var NroOrdenServicioGrilla = $("#grid").jqGrid(
        "getRowData",
        IdSolicitudes[0]
    ).NroOrdenServicio;

    for (var i = 0; i < IdSolicitudes.length; i++) {
        if (
            $("#grid").jqGrid("getRowData", IdSolicitudes[i]).inTipSol != vcIdTipSol
        ) {
            alerta("Debe seleccionar el mismo tipo de solicitud");
            return;
        }
    }

    /*
      <asp:DropDownList ID="ddlTipoMovimiento" runat="server" Width="150px" >
                              <asp:ListItem Value="6" Text="Interrupción del Servicio"></asp:ListItem>
                              <asp:ListItem Value="7" Text="Problemas de Clone"></asp:ListItem>
                              <asp:ListItem Value="8" Text="Activación Cal"></asp:ListItem>
                              <asp:ListItem Value="9" Text="Otro"></asp:ListItem>
                          </asp:DropDownList>
      */
    //Se setea el tipo movimiento según el tipo de solicitud que se va a generar..
    //console.log("vcTabla: " + vcTabla);
    switch (vcTabla) {
        case "Nuevo":
            $("#ddlTipoMovimiento").val("1"); //Alta
            break;
        case "Baja":
            $("#ddlTipoMovimiento").val("2"); //Baja
            break;
        case "CambioPlan":
            $("#ddlTipoMovimiento").val("3"); //Cambio Plan
            break;
        case "Reparación":
            $("#ddlTipoMovimiento").val("4"); //Reparación de equipo
            break;
        case "Reposición":
            $("#ddlTipoMovimiento").val("5"); //Reposición de equipo
            break;
        default:
            $("#ddlTipoMovimiento").val("9"); //Otro
            break;
    }
    $("#ddlTipoMovimiento").attr("disabled", "disabled");

    $.ajax({
        url: "Adm_ListadoSolicitudes.aspx/ObtenerDatosOS",
        data: "{'IdTipoSolicitud':'" + vcIdTipSol + "'}",
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            //for (var i = 0; i < result.d.length; i++) {
            //    $("#ddlEstado").append($('<option></option>').val(result.d[i].P_inCod).html(result.d[i].vcNom));
            //}

            $("#ddlTipoServicio").val("1");
            $("#txtDescripcionOS").val("");

            if (
                result.d[0].NroOrdenServicio.indexOf($("#hdfDiaActual").val() + "-") >=
                0
            ) {
                //Aumentar un digito...
                var Numero = Right(
                    "0" + (parseInt(result.d[0].NroOrdenServicio.split("-")[1]) + 1),
                    2
                );
                $("#txtNroOrdenServicio").val($("#hdfDiaActual").val() + "-" + Numero);
            } else {
                $("#txtNroOrdenServicio").val($("#hdfDiaActual").val() + "-01");
            }

            if (NroOrdenServicioGrilla != null && NroOrdenServicioGrilla != "") {
                $("#txtNroOrdenServicio").val(NroOrdenServicioGrilla);
            }

            $("#txtOrigenSolicitud").val(
                "Solicitud generada por Sistema de Gestión Móvil - PCSistel"
            );
            $("#lblNroOrdenServicioAnterior").html(
                "(Anterior: " + result.d[0].NroOrdenServicio + ")"
            );

            var now = new Date();
            now.setHours(now.getHours());
            var time = [
                Right("0" + now.getHours().toString(), 2),
                Right("0" + now.getMinutes().toString(), 2),
            ].join(":");
            $("#txtHoraInicioOS").val(time);

            var dd = Right("0" + now.getDate().toString(), 2);
            var mm = Right("0" + (now.getMonth() + 1).toString(), 2);
            var yyyy = now.getFullYear();
            $("#txtFechaHoraInicioOS").val(dd + "/" + mm + "/" + yyyy);

            $("#dvGenerarOS").dialog({
                title: "Generar Orden de Servicio",
                modal: true,
                width: 700,
                buttons: {
                    Generar: function () {
                        //Validar formato hora...
                        var txtHoraInicioOS = $("#txtHoraInicioOS").val();
                        txtHoraInicioOS = $.trim(txtHoraInicioOS);
                        var re = new RegExp("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$");
                        if (!re.test(txtHoraInicioOS)) {
                            alerta("Formato de hora incorrecto", "Mensaje", function () {
                                $("#txtHoraInicioOS").focus();
                            });
                            return;
                        }

                        var oDialogo = this;
                        var CodigoOS = $.trim($("#txtNroOrdenServicio").val());
                        var TipoOS = $("#ddlTipoServicio").val();
                        var TipoMovimiento = $("#ddlTipoMovimiento").val();
                        var Descripcion = $.trim($("#txtDescripcionOS").val());
                        var OrigenSolicitud = $.trim($("#txtOrigenSolicitud").val());
                        OrigenSolicitud = OrigenSolicitud.replace(/'/g, "");
                        Descripcion = Descripcion.replace(/'/g, "");

                        var FechaInicio = $.trim($("#txtFechaHoraInicioOS").val());
                        if (FechaInicio != "")
                            FechaInicio =
                                FechaInicio.substr(6, 4).toString() +
                                FechaInicio.substr(3, 2).toString() +
                                FechaInicio.substr(0, 2).toString();
                        else {
                            alerta("Debe ingresar una fecha", "Mensaje", function () {
                                $("#txtFechaHoraInicioOS").focus();
                            });
                            return;
                        }

                        if (CodigoOS == "") {
                            alerta("Debe ingresar un código", "Mensaje", function () {
                                $("#txtNroOrdenServicio").focus();
                            });
                        }

                        $.ajax({
                            url: "Adm_ListadoSolicitudes.aspx/GuardarDatosOS",
                            data:
                                "{'CodigoOS':'" +
                                CodigoOS +
                                "','TipoOS':'" +
                                TipoOS +
                                "','TipoMovimiento':'" +
                                TipoMovimiento +
                                "','Descripcion':'" +
                                Descripcion +
                                "'," +
                                "'HoraInicioOS':'" +
                                txtHoraInicioOS +
                                "'," +
                                "'OrigenSolicitud':'" +
                                OrigenSolicitud +
                                "','FechaInicio':'" +
                                FechaInicio +
                                "','IdSolicitudes':'" +
                                IdSolicitudes +
                                "'}",
                            dataType: "json",
                            type: "post",
                            contentType: "application/json; charset=utf-8",
                            success: function (result) {
                                var pagina =
                                    "../Adm_ReporteDevExpress.aspx?vcTab=MOV_Solicitud&vcTipRep=1&IdSolicitud=1&IdOrden=" +
                                    result.d +
                                    "&IdTipoSolicitud=" +
                                    vcIdTipSol;
                                $("#ifReporteFormato").attr("src", pagina);
                                $(oDialogo).dialog("close");

                                $("#grid").jqGrid().trigger("reloadGrid");

                                //var vcSel = $("#grid").jqGrid('getGridParam', 'selarrrow');
                                //for (var i = 0; i < vcSel.length; i++) {
                                //    $('#grid').getGridParam('data')[i].NroOrdenServicio = CodigoOS;
                                //}
                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            },
                        });
                    },
                    Cancelar: function () {
                        $(this).dialog("close");
                    },
                },
            });
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        },
    });
}

function GenerarFormatoAsignacion(Tabla, IdSolicitud) {
    //Validar datos...
    if (
        Tabla != "Nuevo" &&
        Tabla != "Cambio" &&
        Tabla != "CambioCuenta" &&
        Tabla != "CambioPlan"
    ) {
        alerta(
            "Este formato sólo es generado para solicitudes de tipo 'Nueva línea', 'Cambio Equipo', 'Cambio de Cuenta' o 'Cambio de Plan'"
        );
        return;
    }
    var pagina =
        "../Adm_ReporteDevExpress.aspx?vcTab=MOV_Solicitud&vcTipRep=3&IdSolicitud=" +
        IdSolicitud;
    $("#ifReporteFormato").attr("src", pagina);
}

function refrescarGrilla() {
    ActualizarGrilla();
}
function FechaANSIToDDMMYYYY(fecha) {
    try {
        let result = '';
        if (fecha != "") {
            let lstFecha = fecha.split(' ');
            let dia = lstFecha[0].substr(6, 2);
            let mes = lstFecha[0].substr(4, 2);
            let anio = lstFecha[0].substr(0, 4);
            let hora = '';
            if (lstFecha.length > 1) {
                hora = lstFecha[1];
            }
            result = dia + '/' + mes + '/' + anio + ' ' + hora;
        }
        return result;
    }
    catch (e) {
        return fecha;
    }
}
