/// <reference path="../../Common/Scripts/jquery-2.0.0-vsdoc.js" />



var MargenFiltro = 0;
var MargenHeight = 48;
var inAltGrid;
var inFilas;
var IdTecnico;
var IdUsuarioLogueado;
var notas;
var vcFileName = "";
var esMensajeAyuda = 0;
//carpeta de dominio
var CarpetaDominio = '';
var tiposExternos;
var alto = 550;
var ancho = 700;

function PRM_TicketExterno() {
    this.IdTicket = -1;
    this.CodigoTicket = "";
    this.IdUsuario = -1;
    this.Nombres = "";
    this.IdDominio = -1;
    this.IdTipificacion = -1;
    this.Asunto = "";
    this.Descripcion = "";
    this.DescripcionEscalamiento = "";
}

$(function () {




    CarpetaDominio = window.top.$("#hdfCodigoDominio").val() != '' ? '/' + window.top.$("#hdfCodigoDominio").val() : '';
    window.parent.$("#dvCargando").fadeOut(300);

    if (window.parent.miTipoAlerta == 2) {

        window.parent.miTipoAlerta = 0;

        switch (window.parent.miSubtipoAlerta) {
            case 1:
                break;
            case 2:
                $('#ddlEstado').val("|ATE|");
                break;
            case 3:
                break;
            default:
                break;
        }

    }


    if ($("#hdfIdTecnico").val().toString() == "-1") {
        if ($("#hdfEsUsuario").val().toString() == "1") {
            $(".usu").hide();
            $("#spanTipoFiltro").text("Código ticket");
            $("#txtCodigoTicket").css("margin-left", "-70px");
            $("#dvFiltroDato").show();

            $("#ddlEstado").html("");

            $("#ddlEstado").append("<option value='Todos'>Todos</option>");
            $("#ddlEstado").append("<option selected='selected' value='|PEN|,|ACT|,|EXT|'>En Proceso</option>");
            $("#ddlEstado").append("<option value='|PEN|'>Pendiente</option>");
            $("#ddlEstado").append("<option value='|ACT|'>Activo</option>");
            $("#ddlEstado").append("<option value='|RES|'>Resuelto</option>");
            $("#ddlEstado").append("<option value='|ANU|'>Anulado</option>");
            $("#ddlEstado").append("<option value='|EXT|'>Externo</option>");
        }
        else {
            $("#global").css("display", "none");
            $("form").append('<div style="width:90%; height:90%; padding:20px; font-size:large; color:Gray; ">Usted no es especialista...</div>');
            return;
        }

    }

    load();
    inicializarElementos();
    inicializarEventos();
});

function inicializarElementos() {

    $(".boton").button();

}

function inicializarEventos() {

    $("#ddlTiposExternos").change(function () {
        var idTipo = $(this).val();
        var i;
        for (i = 0; i < tiposExternos.length; i++) {
            if (tiposExternos[i].IdTipo.toString() == idTipo) {
                $("#ddlTipificacionExterna").html("");
                var k;
                for (k = 0; k < tiposExternos[i].Tipificaciones.length; k++) {
                    $("#ddlTipificacionExterna").append("<option value=\"" + tiposExternos[i].Tipificaciones[k].IdTipificacion.toString() + "\">" + tiposExternos[i].Tipificaciones[k].Nombre + "</option>");
                }
                break;
            }
        }
    });

    $("#btnRegistrarEscEx").click(function () {
        if ($.trim($("#txtDscExerno").val()) == "") {
            alerta("Ingrese motivo de escalamiento externo");
        }
        else {
            fnRegistrarEcalarExterno();
        }
    });

    $('#txtDscExerno').live("keypress", function (e) {
        if (e.keyCode == 13) {
            if ($.trim($("#txtDscExerno").val()) == "") {
                alerta("Ingrese motivo de escalamiento externo");
            }
            else {
                fnRegistrarEcalarExterno();
            }
        }
        else {
            return ValidarAlfaNumericoConEspacios(e);
        }
    });

    $(window).resize(function () {
        DimPosElementos();
        NumeroInicialFilas();
    });

    $("#btnRegistrarEscalamiento").click(function () {
        registrarEscalamiento($("#ddlBolsasEscalables").val());
    });

    $("#btnCerrarActivarAyuda").click(function () {
        $('#dvAyuda').dialog("close");
    });

    $("#btnActivarAyuda").click(function () {
        registrarActivarAyudaSupervisor();
    });

    $('#txtCodigoTicket').live("keypress", function (e) {
        if (e.keyCode == 13) {
            $("#gridSolicitud").trigger("reloadGrid");
        }
        else {
            return ValidarAlfaNumericoConEspacios(e);
        }
    });

    $('#txtNotaEnviar').live("keypress", function (e) {
        if (e.keyCode == 13) {
            if ($("#hdfIdTecnico").val().toString() == "-1") {
                registrarNota_usuario();
            }
            else {
                registrarNota();
            }
        }
        //        else {
        //            return ValidarAlfaNumericoConEspacios(e);
        //        }
    });

    $("#btnEscalar").click(function () {
        //escalarTicket();

        var id = $("#gridSolicitud").jqGrid('getGridParam', 'selrow');
        if (id) {
            var datos = $("#gridSolicitud").jqGrid('getRowData', id);
            var CodEstado = datos['CodEstado'];

            if (CodEstado != 'ACT' && CodEstado != 'AYU' && CodEstado != 'ATE') {
                alerta("Sólo se pueden escalar tickets ACTIVOS , ATENDIDOS y de AYUDA");
                return;
            }

            if (datos['esBolsaExterno'] == "True") {
                $('#dvDialogoTipoEscalmiento').dialog({
                    title: "Tipo de escalamiento",
                    height: 120,
                    width: 240,
                    modal: true
                });
            }
            else {
                escalarTicket();
            }
        }
        else {
            alerta("Seleccione un registro");
        }


    });
    $("#btnInterno").click(function () {
        $('#dvDialogoTipoEscalmiento').dialog("close");
        escalarTicket();
    });

    $("#btnExterno").click(function () {
        $('#dvDialogoTipoEscalmiento').dialog("close");
        fnEscalarExterno();
    });

    $("#btnRegistraNota").click(function () {
        if ($("#hdfIdTecnico").val().toString() == "-1") {
            registrarNota_usuario();
        }
        else {
            registrarNota();
        }
    });

    $("#chkMostrarOnlyMsjSupervi").change(function () {
        if ($(this).attr("checked") == "checked") {

            var i;
            for (i = 0; i < $(".dvNotaContenedor").length; i++) {
                if ($($(".dvNotaContenedor")[i]).hasClass("ui-state-highlight")) {
                }
                else {
                    $($(".dvNotaContenedor")[i]).hide(300);
                }
            }
            $("#chkEnvioSupervisor").attr("checked", "checked");
            $("#chkEnvioSupervisor").attr("disabled", "disabled");

        }
        else {
            $(".dvNotaContenedor").show(300);
            $("#chkEnvioSupervisor").removeAttr("checked");
            $("#chkEnvioSupervisor").removeAttr("disabled");
        }

        $("#dvMensajes").animate({ scrollTop: document.getElementById("dvMensajes").scrollHeight }, 1500);
    });

    $("#btnCerrar").click(function () {
        cerrarTicket();
    });

    $("#btnAyuda").click(function () {
        activarAyudaSupervisor();
    });

    $("#ddlNivel").change(function () {
        filtrarBolsas_porNivel();
    });

    $("#ddlOrigen").change(function () {
        cambiarDetalle();
    });

    $("#ddlTipo").change(function () {
        tipificacion_porTipo();
    });

    $("#ddlTecnicos").change(function () {
        fnCambiarTecnico();
    });

    $("#ddlBolsa,#ddlEstado,#ddlTipo,#ddlTipificacion").change(function () {
        
        $("#gridSolicitud").trigger("reloadGrid");
    });

    //habilitar y desabilitar botones 
    var idnivel = "";
  
    if ($('#ddlNivel').val() =="6-0") {
        document.getElementById("btnAyuda").style.display = "none";
        document.getElementById("btnEscalar").style.display = "none";
        document.getElementById("btnCerrar").style.display = "none";
    }
     
    $("#ddlNivel").change(function () {
        idnivel = $('option:selected', $(this)).attr('value').toString();
       
        if (idnivel=="6-0") {
             
            document.getElementById("btnAyuda").style.display = "none";
            document.getElementById("btnEscalar").style.display = "none";
            document.getElementById("btnCerrar").style.display = "none";
        } else {
             
            document.getElementById("btnAyuda").style.display = "";
            document.getElementById("btnEscalar").style.display = "";
            document.getElementById("btnCerrar").style.display = "";
        }
       
    });
    
      




    $("#txtFechaInicio").change(function () {

        $("#txtFechaFin").datepicker("option", "minDate", $("#txtFechaInicio").datepicker("getDate"));

        $("#gridSolicitud").trigger("reloadGrid");
    });

    $("#txtFechaFin").change(function () {

        $("#txtFechaInicio").datepicker("option", "maxDate", $("#txtFechaFin").datepicker("getDate"));

        $("#gridSolicitud").trigger("reloadGrid");
    });

    $("#txtFechaInicio").datepicker({
        changeMonth: true,
        changeYear: true,
        maxDate: new Date()
    });

    $("#txtFechaFin").datepicker({
        changeMonth: true,
        changeYear: true,
        maxDate: new Date()
    });

    $("#imgBorrarFechaInicio").click(function () {
        $("#txtFechaFin").datepicker("option", "maxDate", new Date());
        $("#txtFechaInicio").datepicker("option", "maxDate", new Date());
        $("#txtFechaInicio").datepicker("option", "minDate", "");
        $("#txtFechaFin").datepicker("option", "minDate", "");
        $("#txtFechaInicio").val("");
        $("#gridSolicitud").trigger("reloadGrid");
    });

    $("#imgBorrarFechaFin").click(function () {
        $("#txtFechaFin").datepicker("option", "maxDate", new Date());
        $("#txtFechaInicio").datepicker("option", "maxDate", new Date());
        $("#txtFechaInicio").datepicker("option", "minDate", "");
        $("#txtFechaFin").datepicker("option", "minDate", "");
        $("#txtFechaFin").val("");
        $("#gridSolicitud").trigger("reloadGrid");
    });

    $("#chkFiltro").click(function () {
        mostrarPanelFiltro();
    });

    $("#btnRegistrarCierre").click(function () {
        registrarCerrarTicket();
    });

    var upload = new AjaxUpload('#UploadButton', {
        action: CarpetaDominio == '' ? 'UploadHandler.ashx?dominio=-1' : 'UploadHandler.ashx?dominio=' + CarpetaDominio,
        onComplete: function (file, response) {
            try {
                if (response.indexOf('></pre>') >= 0) {
                    alerta("El tamaño del archivo supera el límite permitido.");
                }
                else {
                    $("<div class='imgBtn' style='margin-top:1px; height:21px;'><img src='../../Common/Images/remove.png' onclick=\"DeleteFile('" + response + "')\"/>&nbsp;&nbsp;&nbsp;<span id='filesubido' style='text-decoration:underline;' nombre='" + response + "'>" + response + "</span></div>").appendTo('#UploadedFile');
                    vcFileName = response;
                    $("#UploadButton").hide();
                }
            } catch (e) {
                alerta("Archivo incorrecto.");
            }

        },
        onSubmit: function (file, ext) {
            if (!(ext && /^(txt|doc|docx|xls|xlsx|pdf|jpg|png)$/i.test(ext))) {
                alert('Formato inválido');
                return false;
            }
        }
    });

    $(upload._input).css("z-index", "99999999");

    $('#txtConclucion,#txtDeescripcionEscalamiento').live("keypress", function (e) {
        return ValidarAlfaNumericoConEspaciosYCaracteres(e);
    });

    //    $("#ddlTipoFiltro").change(function () {
    //        switch ($(this).val()) {
    //            case "1":
    //                $("#spanTipoFiltro").text("Código Ticket");
    //                break;
    //            case "2":
    //                $("#spanTipoFiltro").text("Código Empleado");
    //                break;
    //            case "3":
    //                $("#spanTipoFiltro").text("Nombre Empleado");
    //                break;
    //            default:
    //                break;
    //        }
    //    });
}

function mostrarPanelFiltro() {

    if ($('#chkFiltro').is(':checked')) {
        $("#dvFiltros").show(300);
    }
    else {
        $("#dvFiltros").hide(300);
    }

}

function filtrarBolsas_porNivel() {
    //debugger;
    var miOrden = $("#ddlNivel").val().split('-')[1];
    $("#ddlBolsa").html("");
    var i;
    for (i = 0; i < misBolsas.length; i++) {
        if (misBolsas[i].Orden == miOrden) {
            $("#ddlBolsa").append("<option Escalado = " + misBolsas[i].EsAutomatico.toString() + " value='" + misBolsas[i].IdBolsa.toString() + "-" + misBolsas[i].IdNivel.toString() + "' >" + misBolsas[i].Nombre.toString() + "</option>");
        }
    }
     

        
    
    $("#gridSolicitud").trigger("reloadGrid");

}

function inicializarDiseno() {
    DimPosElementos();
    NumeroInicialFilas();
}

function load() {
    IdTecnico = $("#hdfIdTecnico").val();
    IdUsuarioLogueado = $("#hdfIdUsuarioLogeado").val();
    obtenerTickets();
}

//--------Funciones------------------------------------------------------------
function CrearBotonesSemaforo(id, vcUmbral) {
    if (vcUmbral != "")
    { return '<img src="../../Common/Images/Semaforos/' + vcUmbral + '_16x16.png" />'; }
    else
    { return ''; }
}

function obtenerTickets() {


    $("#gridSolicitud").jqGrid({
        datatype: function () {


            $("#dvDatosGrilla").hide();
            $("#dvSinDatos").hide();

            var miIdBolsa;
            var miCodEstado;
            var miIDTipificacion;
            var miCodigoTicket = '000000000000';
            var miFechaInicio;
            var miFechaFin;
            var miIdUsuario = "-1";
            var miTec = "-1";
            var miEsSupervisor = 0;

            var miNombreEmpleado = "-1";
            var miCodigoEmpledo = "-1";

            if ($("#ddlTecnicos option:selected").text().indexOf("(Supervisor)") < 0) {
                miEsSupervisor = 1;
            }


            //console.log('$("#ddlBolsa").val()', $("#ddlBolsa").val());
            if ($("#hdfIdTecnico").val().toString() == "-1" || $("#ddlBolsa").val() == null) {
                miIdUsuario = $("#hdfIdUsuarioLogeado").val().toString();
                miIdBolsa = "-1";
            }
            else {
                miIdBolsa = $("#ddlBolsa").val().split('-')[0];
                miTec = $("#ddlTecnicos").val();
            }


            if ($("#ddlEstado").val() == "Todos")
            { miCodEstado = "-1"; }
            else
            { miCodEstado = $("#ddlEstado").val(); }

            if ($("#ddlTipo").val() == "Todos")
            { miIDTipificacion = "-1"; }
            else
            { miIDTipificacion = obtenerTipificaciones_porTipo(); }

            if (miIDTipificacion == "") {
                miIDTipificacion = "-1";
            }

            switch ($("#ddlTipoFiltro").val()) {
                case "1":
                    if ($.trim($("#txtCodigoTicket").val()) == "") {
                        miCodigoTicket = '000000000000';
                    }
                    else {
                        miCodigoTicket = $.trim($("#txtCodigoTicket").val());
                    }
                    break;
                case "2":
                    miCodigoEmpledo = $.trim($("#txtCodigoTicket").val());
                    break;
                case "3":
                    miNombreEmpleado = $.trim($("#txtCodigoTicket").val());
                    break;
                default:
                    break;
            }

            miFechaInicio = $("#txtFechaInicio").datepicker("getDate");
            miFechaFin = $("#txtFechaFin").datepicker("getDate");

            if (miFechaInicio == undefined) {
                miFechaInicio = "-1";
            }
            else {
                var DiaInicio = miFechaInicio.getDate().toString();
                var MesInicio = (parseInt(miFechaInicio.getMonth()) + 1).toString();
                var AnoInicio = miFechaInicio.getFullYear().toString();

                if (DiaInicio.length < 2)
                { DiaInicio = "0" + DiaInicio; }

                if (MesInicio.length < 2)
                { MesInicio = "0" + MesInicio; }

                miFechaInicio = AnoInicio + MesInicio + DiaInicio;
            }

            if (miFechaFin == undefined) {
                miFechaFin = "-1";
            }
            else {
                var DiaFin = miFechaFin.getDate().toString();
                var MesFin = (parseInt(miFechaFin.getMonth()) + 1).toString();
                var AnoFin = miFechaFin.getFullYear().toString();

                if (DiaFin.length < 2)
                { DiaFin = "0" + DiaFin; }

                if (MesFin.length < 2)
                { MesFin = "0" + MesFin; }

                miFechaFin = AnoFin + MesFin + DiaFin;
            }


            $.ajax({
                type: "POST",
                url: "SOA_Adm_Solicitudes.aspx/obtenerTicket_administracion",
                data: "{'inPagTam':'" + $('#gridSolicitud').getGridParam("rowNum") + "'," + //Tamaño de pagina
                       "'inPagAct':'" + $('#gridSolicitud').getGridParam("page") + "'," + //FiltroRegistro                
                        "'prIdTicket': '" + '-1' + "'," +
                        "'prCodTicket': '" + miCodigoTicket + "'," +
                        "'prIdUsuario': '" + miIdUsuario + "'," +
                        "'prIdUsuarioRegistro': '" + '-1' + "'," +
                        "'prIdUsuarioTecnico': '" + miTec + "'," +
                        "'prCodEstado': '" + miCodEstado + "'," +
                        "'prIdMedioContacto': '-1'," +
                        "'prIdTipificacion': '" + miIDTipificacion + "'," +
                        "'prIdBolsa': '" + miIdBolsa + "'," +
                        "'prFechaInicio': '" + miFechaInicio + "'," +
                        "'prFechaFin': '" + miFechaFin + "', " +
                        "'prNombreEmpleado': '" + miNombreEmpleado + "'," +
                        "'prCodigoEmpleado': '" + miCodigoEmpledo + "'," +
                        "'prEsSupervisor': '" + miEsSupervisor + "'," +
                        "'sortorder': '" + $('#gridSolicitud').getGridParam("sortorder") + "'," +
                        "'sortname': '" + $('#gridSolicitud').getGridParam("sortname") + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    try {
                        if (result.d.Items.length > 0) {
                            $("#dvDatosGrilla").show();
                        }
                        else {
                            $("#dvSinDatos").show();
                        }
                    } catch (e) {
                        $("#dvSinDatos").show();
                    }

                    $("#gridSolicitud")[0].addJSONData(result.d);

                    $(".ConImg").click(function () {
                        mostrarDetalleTicket($(this).attr("id").substr(6), $(this).attr("id"));
                    });
                },
                error: function (xhr, err, thrErr) {
                    $("#dvSinDatos").show();
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
            id: "IdTicket"
        },
        colModel: [
                    {
                        name: 'opAccion', index: 'opAccion', label: ' ', hidden: false, width: "30px", align: 'center',
                        formatter: function (value, options, rData) { return GenerarBotones(rData[1], rData[24], rData[25]); }
                    },
                    { name: 'IdTicket', index: 'IdTicket', label: 'IdTicket', hidden: true },
                    { name: 'CodigoTicket', index: 'CodigoTicket', label: 'Código', width: "90px" },
                    { name: 'LeidoPorUsuario', index: 'LeidoPorUsuario', label: 'LeidoPorUsuario', hidden: true },
                    { name: 'IdUsuario', index: 'IdUsuario', label: 'IdUsuario', hidden: true },
                    { name: 'NombreUsuario', index: 'NombreUsuario', label: 'Usuario', width: "220px" },
                    { name: 'vcUsu', index: 'vcUsu', label: 'Codigo Usuario', hidden: true },
                    { name: 'IdUsuarioRegistro', index: 'IdUsuarioRegistro', label: 'IdUsuarioRegistro', hidden: true },
                    { name: 'NombreUsuarioRegistro', index: 'NombreUsuarioRegistro', label: 'Usuario Registro', width: "220px", hidden: true },
                    { name: 'vcUsuRegistro', index: 'vcUsuRegistro', label: 'Codigo Usuario Registro', hidden: true },
                    { name: 'CodEstado', index: 'CodEstado', label: 'CodEstado', hidden: true },
                    { name: 'NombreEstado', index: 'NombreEstado', label: 'Estado', width: "60px" },

                    { name: 'FechaRegistro', index: 'FechaRegistro', label: 'Fecha Registro', width: "120px" },
                    {
                        name: 'opUmbral', index: 'opUmbral', label: 'Umbral', hidden: false, width: 50, align: 'center', sortable: false, resizable: false,
                        formatter: function (value, options, rData) { return CrearBotonesSemaforo(rData[1], rData[23]); }
                    },
                    { name: 'inDiaTra', index: 'inDiaTra', label: 'Días Transc.', hidden: false, align: 'center', width: 75, sortable: false },

                    { name: 'IdTipificacion', index: 'IdTipificacion', label: 'IdTipificacion', hidden: true },
                    { name: 'NombreTipificacion', index: 'NombreTipificacion', label: 'Tipificación', width: "200px" },
                    { name: 'Asunto', index: 'Asunto', label: 'Asunto', width: 110, width: "200px" },
                    { name: 'Descripcion', index: 'Descripcion', label: 'Descripción', width: 150, width: "250px", sortable: true },
        //{ name: 'FechaRegistro', index: 'FechaRegistro', label: 'Fecha Registro', width: "100px" },
                    { name: 'EsChat', index: 'EsChat', label: 'EsChat', hidden: true },
                    { name: 'IdBolsa', index: 'IdBolsa', label: 'IdBolsa', hidden: true }//,
                    , { name: 'esBolsaExterno', index: 'esBolsaExterno', label: 'esBolsaExterno', hidden: true }
        //{ name: 'opUmbral', index: 'opUmbral', label: 'Umbral', hidden: false, width: 50, align: 'center', sortable: false, resizable: false,
        //    formatter: function (value, options, rData) { return CrearBotonesSemaforo(rData[1], rData[22]); }
        //},
        //{ name: 'inDiaTra', index: 'inDiaTra', label: 'Días Transc.', hidden: false, align: 'center', width: 50, sortable: false }
        ],
        pager: "#pagerSolicitud",
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        pgtext: 'Pág: {0} de {1}',
        rownumbers: true,
        shrinkToFit: false,
        gridview: true,
        viewrecords: true,
        emptyrecords: "No hay tickets que mostrar",
        rowNum: inFilas,
        beforeSelectRow: function (rowid, e) {
            var CurrentSelectIndex = $("#gridSolicitud").jqGrid('getInd', rowid);
            var datos = $("#gridSolicitud").jqGrid('getRowData', CurrentSelectIndex);

            switch (datos['CodEstado']) {

                case "RES":
                    $(".btnControles").fadeOut(300);
                    break;
                case "ANU":
                    $(".btnControles").fadeOut(300);
                    break;
                case "DEV":
                    $(".btnControles").fadeOut(300);
                    break;
                case "ACT":
                    $(".btnControles").fadeIn(300);
                    break;
                case "ATE":
                    $(".btnControles").fadeIn(300);
                    break;
                case "AYU":
                    $(".btnControles").fadeIn(300);
                    break;
                case "ESC":
                    $(".btnControles").fadeIn(300);
                    break;
                case "EXT":
                    $(".btnControles").fadeIn(300);
                    break;
                default:

            }

            //alert(datos['CodEstado']);
            return true;
        },
        gridComplete: function () {
            if ($("#hdfEsUsuario").val().toString() == "1") {
                var filas = $("#gridSolicitud tr");
                var i;
                for (i = 1; i < filas.length; i++) {
                    if ($($(filas[i]).find("td")[9]).text() == "Resuelto" || $($(filas[i]).find("td")[9]).text() == "Anulado") {
                        $($(filas[i]).find("td")[9]).text("Cerrado");
                        $($(filas[i]).find("td")[9]).css("font-weight", "bold");
                    }
                }
            }
        }
    }).navGrid("#pagerSolicitud", { edit: false, add: false, search: false, del: false });

    inicializarDiseno();

}


//-----------------------------------------------------------------------------

//Redimencionar grilla
function NumeroInicialFilas() {
    var nuAltoFila = 23.04;
    inFilas = Math.floor(inAltGrid / nuAltoFila);
}

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    var AnchoLateral = $(".LateralSplitter");
    $(".tabs").css({ height: Alto - 23, width: Ancho - AnchoLateral, marginbotton: 0, paddingbotton: 0 });

    //$(".Splitter").css({ height: Alto - 18 });
    inAltGrid = $(window).height() - 121 - $("#dvFiltros").height() - MargenFiltro * MargenHeight;
    $("#gridSolicitud").setGridWidth($(window).width() - 31);
    $("#gridSolicitud").setGridHeight(inAltGrid);
}
///--------------------------------------
function GenerarBotones(id, int_usu, int_tec) {
    if ($("#hdfIdTecnico").val().toString() == "-1") {
        if (int_usu > 0) {
            return '<img id="btnCon' + id + '" src="../../Common/Images/Chat/write.png" alt="Ver Conversación" class="imgBtn ConImg imgBtnn" title="Ver Conversación"/><img id="btnCon' + id + 'Let" src="../../Common/Images/Chat/mail.png" alt="Ver Conversación" class="imgBtn m_left imgBtnn letter" title="Ver Conversación"/>';
        }
        else {
            return '<img id="btnCon' + id + '" src="../../Common/Images/Chat/write.png" alt="Ver Conversación" class="imgBtn ConImg imgBtnn" title="Ver Conversación"/>';
        }

    }
    else {
        if (int_tec > 0) {
            return '<img id="btnCon' + id + '" src="../../Common/Images/Chat/write.png" alt="Ver Conversación" class="imgBtn ConImg imgBtnn" title="Ver Conversación"/><img id="btnCon' + id + 'Let" src="../../Common/Images/Chat/mail.png" alt="Ver Conversación" class="imgBtn m_left imgBtnn letter" title="Ver Conversación"/>';
        }
        else {
            return '<img id="btnCon' + id + '" src="../../Common/Images/Chat/write.png" alt="Ver Conversación" class="imgBtn ConImg imgBtnn" title="Ver Conversación"/>';
        }
    }

}

function obtenerTipificaciones_porTipo() {

    var tipo = $("#ddlTipo").val();
    var tipificaciones = "";

    if ($("#ddlTipificacion").val() == "Todos") {
        var i;
        for (i = 0; i < misTipificaciones.length; i++) {
            if (misTipificaciones[i].IdTipo == tipo) {
                tipificaciones = tipificaciones + misTipificaciones[i].P_inCod.toString() + ",";
            }
        }
    }
    else {
        tipificaciones = $("#ddlTipificacion").val() + ",";
    }
    return tipificaciones.substr(0, tipificaciones.length - 1);
}

function tipificacion_porTipo() {

    var miTipo = $("#ddlTipo").val();
    $("#ddlTipificacion").html("");

    if (miTipo == "Todos") {
        $("#ddlTipificacion").attr("disabled", "disabled");
        $("#ddlTipificacion").fadeOut(200);
    }
    else {
        $("#ddlTipificacion").removeAttr("disabled");
        $("#ddlTipificacion").fadeIn(200);
        $("#ddlTipificacion").append("<option value='Todos' >Todos</option>");
        var i;
        for (i = 0; i < misTipificaciones.length; i++) {
            if (misTipificaciones[i].IdTipo == miTipo) {
                $("#ddlTipificacion").append("<option value='" + misTipificaciones[i].P_inCod.toString() + "' >" + misTipificaciones[i].Titulo.toString() + "</option>");
            }
        }
    }

}

function cerrarTicket() {
    var id = $("#gridSolicitud").jqGrid('getGridParam', 'selrow');
    if (id) {
        var datos = $("#gridSolicitud").jqGrid('getRowData', id);
        var CodEstado = datos['CodEstado'];

        if (CodEstado != 'ACT' && CodEstado != 'AYU' && CodEstado != 'ATE') {
            alerta("Sólo se pueden cerrar tickets ACTIVOS , de AYUDA y ATENDIDOS");
            //Mensaje("<br/><h1>Solo se pueden cerrar <br/> tickets ACTIVOS , de AYUDA y ATENDIDOS</h1><br/>", document);
            return;
        }

        $("#rbResuelto").attr("checked", "checked");
        $("#txtConclucion").val("");

        if ($("#ddlNivel").val().split('-')[1] == "1") {
            $("#liDevuelto").hide();
        }
        else {
            $("#liDevuelto").show();
        }

        $('#dvCerrar').dialog({
            title: "Cerrar ticket " + datos['CodigoTicket'],
            height: 310,
            width: 410,
            modal: true
        });
    }
    else {
        alerta("Seleccione un registro");
        //Mensaje("<br/><h1>Seleccione un registro</h1><br/>", document);
    }
}

function registrarCerrarTicket() {

    $("#txtConclucion").val($("#txtConclucion").val().replace(/'/g, ""));
    $("#txtConclucion").val($("#txtConclucion").val().replace(/\\/g, ""));

    if ($.trim($("#txtConclucion").val()) == "") {
        alerta("Debe ingresar la conclución a la cual se llegado para cerrar ticket");
        //Mensaje("<br/><h1>Debe ingresar la conclución a la cual <br/> se llegado para cerrar ticket</h1><br/>", document);
        $("#txtConclucion").focus();
        return;
    }



    var id = $("#gridSolicitud").jqGrid('getGridParam', 'selrow');
    if (id) {
        var datos = $("#gridSolicitud").jqGrid('getRowData', id);
        var IdTicket = datos['IdTicket'];
        var CodEstado;

        if ($('#rbResuelto').is(':checked'))
        { CodEstado = "RES"; }
        else {
            if ($('#rbDevuelto').is(':checked'))
            { CodEstado = "DEV"; }
            else
            { CodEstado = "ANU"; }
        }
        $.ajax({
            type: "POST",
            url: "SOA_Adm_Solicitudes.aspx/cerrarTicket",
            data: "{'prIdTicket': '" + IdTicket + "'," +
            "'prCodEstado': '" + CodEstado + "'," +
            "'prConclucion': '" + $("#txtConclucion").val() + "'," +
            "'prIdTecnico': '" + $("#hdfIdTecnico").val() + "','prChat':'0'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                var resultado = result.d;

                if (resultado.split('|')[0] == 'OK') {
                    //alerta("Ticket cerrado exitosamente");
                    Mensaje("<br/><h1>Ticket cerrado exitosamente</h1><br/>", document);
                    $("#gridSolicitud").trigger("reloadGrid");
                }
                else {
                    //alert(resultado.split('|')[1]);
                    Mensaje("<br/><h1>" + resultado.split('|')[1] + "</h1><br/>", document);
                }
                $('#dvCerrar').dialog("close");

            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
    else {
        alerta("Seleccione un registro");
        //Mensaje("<br/><h1>Seleccione un registro</h1><br/>", document);
    }
}

function escalarTicket() {
    $("#txtDeescripcionEscalamiento").val("");
    var id = $("#gridSolicitud").jqGrid('getGridParam', 'selrow');
    if (id) {
        var datos = $("#gridSolicitud").jqGrid('getRowData', id);
        var IdBolsa = datos['IdBolsa'];
        var CodEstado = datos['CodEstado'];

        if (CodEstado != 'ACT' && CodEstado != 'AYU' && CodEstado != 'ATE') {
            alerta("Sólo se pueden escalar tickets ACTIVOS , ATENDIDOS y de AYUDA");
            //Mensaje("<br/><h1>Solo se pueden escalar tickets <br/> ACTIVOS y de AYUDA</h1><br/>", document);
            return;
        }


        $.ajax({
            type: "POST",
            url: "SOA_Adm_Solicitudes.aspx/obtenerEscalamientoBolsa",
            data: "{'prIdBolsa': '" + IdBolsa + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                var resultado = result.d;
                $("#ddlBolsasEscalables").html("");

                if (resultado.length < 1) {
                    alerta("Esta es la última instancia a la cual puede escalar este ticket");
                    //Mensaje("<br/><h1>Esta es la última instancia a la cual <br/> puede escalar este ticket</h1><br/>", document);
                    return;
                }

                var i;
                for (i = 0; i < resultado.length; i++) {
                    $("#ddlBolsasEscalables").append("<option value='" + resultado[i].IdBolsa.toString() + "' >" + resultado[i].Nombre.toString() + "</option>");
                }

                $('#dvEscalar').dialog({
                    title: "Escalar ticket " + datos['CodigoTicket'],
                    height: 310,
                    width: 410,
                    modal: true
                });
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });

    }
    else {
        alerta("Seleccione un registro");
        //Mensaje("<br/><h1>Seleccione un registro</h1><br/>", document);
    }
}

function registrarEscalamiento(IdBolsaFin) {

    var id = $("#gridSolicitud").jqGrid('getGridParam', 'selrow');
    if (id) {
        var datos = $("#gridSolicitud").jqGrid('getRowData', id);
        var IdBolsaBase = datos['IdBolsa'];
        var IdTicket = datos['IdTicket'];

        if ($.trim($("#txtDeescripcionEscalamiento").val()) == "") {
            alerta("Debe ingresar Descripción");
            //Mensaje("<br/><h1>Debe ingresar la conclución a la cual <br/> se llegado para cerrar ticket</h1><br/>", document);
            $("#txtDeescripcionEscalamiento").focus();
            return;
        }

        $.ajax({
            type: "POST",
            url: "SOA_Adm_Solicitudes.aspx/escalarTicket",
            data: "{'prIdTicket': '" + IdTicket + "'," +
            "'prIdBolsaBase': '" + IdBolsaBase + "'," +
            "'prIdBolsaFin': '" + IdBolsaFin + "'," +
            "'prIdUsuario': '" + $("#hdfIdUsuarioLogeado").val() + "'," +
            "'prIdTecnico': '" + $("#hdfIdTecnico").val() + "'," +
            "'prDescripcion': '" + $("#txtDeescripcionEscalamiento").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                var resultado = result.d;

                if (resultado.split('|')[0] == 'OK') {
                    //alerta("Escalamiento exitoso, por favor espere respuesta");
                    Mensaje("<br/><h1>Escalamiento exitoso, por favor espere respuesta</h1><br/>", document);
                    $("#gridSolicitud").trigger("reloadGrid");
                }
                else {
                    Mensaje("<br/><h1>" + resultado.split('|')[1] + "</h1><br/>", document);
                    //alert(resultado.split('|')[1]);
                }

                $('#dvEscalar').dialog("close");

            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });

    }
    else {
        alerta("Seleccione un registro");
        //Mensaje("<br/><h1>Seleccione un registro</h1><br/>", document);
    }

}


function mostrarDetalleTicket(id, letter) {
    debugger;
    $("#" + letter + "Let").css("display", "none");
    $("#chkMostrarOnlyMsjSupervi").removeAttr("checked");
    $("#chkEnvioSupervisor").removeAttr("disabled");

    $("#chkEnviarCorreo").removeAttr("checked");

    if ($("#hdfIdTecnico").val().toString() == "-1") {

        $.ajax({
            type: "POST",
            url: "SOA_Adm_Solicitudes.aspx/obtenerDetalleTicket_Usuario",
            data: "{'prIdTicket': '" + id + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#dvEnvioSupervisor").css("display", "none");
                notas = result.d;
                var mensaje;
                $("#dvMensajes").html("");

                $("#dvEnviar").css("display", "block");

                var i;
                for (i = 0; i < notas.length; i++) {
                    var imgEnvioCorreo = '<div style="float: right;"><img src="../../../Common/Images/Mantenimiento/Enviar.gif" title="Correo enviado"></div>';
                    if (notas[i].EnvioCorreo == false) {
                        imgEnvioCorreo = '';
                    }

                    if (notas[i].NombreArchivo == '') {
                        mensaje = '<div class="dvNotaContenedor"><div class="tituloNota"><div class="imagenNota"></div><div class="subTituloNota">Nota creada el ' +
                            notas[i].FechaRegistro + ' a las ' + notas[i].HoraRegistro + ' por ' + notas[i].IdUsuario + '</div></div>' + imgEnvioCorreo + '<div style="clear:both; height:5px;"></div><div class="mensajeNota"> ' +
                            notas[i].Descripcion + '</div></div>';
                    }
                    else {
                        mensaje = '<div class="dvNotaContenedor bordeAdjunto"><div class="tituloNota"><div class="imagenNota"></div><div class="subTituloNota">Nota creada el ' +
                            notas[i].FechaRegistro + ' a las ' + notas[i].HoraRegistro + ' por ' + notas[i].IdUsuario + '</div></div>' + imgEnvioCorreo + '<div style="clear:both; height:5px;"></div><div class="mensajeNotaConAdjunto"> ' +
                            notas[i].Descripcion + '</div><div class="mensajeAdjunto"><div class="imagenArchivoAdjunto"></div> <div style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"><span class="linkDescarga" onclick="fnDescargarArchivo(\'' + notas[i].NombreArchivo + '\',2,' + notas[i].P_inCod + ')">' + notas[i].NombreArchivo + ' </span></div></div></div>';
                    }

                    $("#dvMensajes").append(mensaje);
                }

                $('#dvConversacion').dialog({
                    title: "Notas de ticket",
                    height: alto,
                    width: ancho,
                    modal: true,
                    close: function (event, ui) {
                        $("#dvEnvioSupervisor").css("display", "block");
                    }
                });

                var iid = $("#gridSolicitud").jqGrid('getGridParam', 'selrow');
                if (iid) {
                    var datos = $("#gridSolicitud").jqGrid('getRowData', iid);

                    if (datos['CodEstado'] == "RES" || datos['CodEstado'] == "ANU" || datos['CodEstado'] == "DEV") {
                        $("#dvEscribir").hide();
                    }
                    else {
                        $("#dvEscribir").show();
                    }
                }
                else {
                    //alerta("Seleccione un registro");
                }

                //$("#dvMensajes").animate({ scrollTop: document.getElementById("dvMensajes").scrollHeight }, 1500);

            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
    else {
        var SSUpervisor = 0;

        if ($("#ddlTecnicos option:selected").text().indexOf("(Supervisor)") < 0) {
            SSUpervisor = 1;
        }

        $.ajax({
            type: "POST",
            url: "SOA_Adm_Solicitudes.aspx/obtenerDetalleTicket_Tecnico",
            data: "{'prIdTicket': '" + id + "'," +
                    "'prEsSupervisor': '" + SSUpervisor + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                notas = result.d;
                $("#dvMensajes").html("");

                $($('#ddlOrigen option')[0]).attr('selected', 'selected');
                $("#dvEnviar").css("display", "block");

                if ($("#hdfMostrarMsjPrivado").val() == "1") {
                    $("#chkMostrarOnlyMsjSupervi").removeAttr("disabled");
                    $("#chkEnvioSupervisor").removeAttr("disabled");
                }
                else {
                    $("#chkMostrarOnlyMsjSupervi").attr("disabled", "disabled");
                    $("#chkEnvioSupervisor").attr("disabled", "disabled");
                }

                var i;
                for (i = 0; i < notas.NotasInicial.length; i++) {
                    var mensaje;
                    var divAdjunto = '<div style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"><span class="linkDescarga" onclick="fnDescargarArchivo(\'' + notas.NotasInicial[i].NombreArchivo + '\',2,' + notas.NotasInicial[i].P_inCod + ')">' + notas.NotasInicial[i].NombreArchivo + ' </span></div>';
                    var imgEnvioCorreo = '<div style="float: right;"><img src="../../../Common/Images/Mantenimiento/Enviar.gif" title="Correo enviado"></div>';
                    if (notas.NotasInicial[i].EnvioCorreo == false) {
                        imgEnvioCorreo = '';
                    }

                    if (notas.NotasInicial[i].NombreArchivo == '') {
                        if (notas.NotasInicial[i].EsAyuda) {
                            mensaje = '<div class="dvNotaContenedor ui-state-highlight"><div class="tituloNota"><div class="imagenEsAyuda"></div><div class="subTituloNota">Nota creada el ' +
                                notas.NotasInicial[i].FechaRegistro + ' a las ' + notas.NotasInicial[i].HoraRegistro + ' por ' + notas.NotasInicial[i].IdUsuario + '</div></div>' + imgEnvioCorreo + '<div style="clear:both; height:5px;"></div><div class="mensajeNota"> ' +
                                notas.NotasInicial[i].Descripcion + '</div></div>';
                        }
                        else {
                            mensaje = '<div class="dvNotaContenedor"><div class="tituloNota"><div class="imagenNota"></div><div class="subTituloNota">Nota creada el ' +
                                notas.NotasInicial[i].FechaRegistro + ' a las ' + notas.NotasInicial[i].HoraRegistro + ' por ' + notas.NotasInicial[i].IdUsuario + '</div></div>' + imgEnvioCorreo + '<div style="clear:both; height:5px;"></div><div class="mensajeNota"> ' +
                                notas.NotasInicial[i].Descripcion + '</div></div>';
                        }

                    }
                    else {
                        if (notas.NotasInicial[i].EsAyuda) {
                            mensaje = '<div class="dvNotaContenedor bordeAdjunto ui-state-highlight"><div class="tituloNota"><div class="imagenEsAyuda"></div><div class="subTituloNota">Nota creada el ' +
                                notas.NotasInicial[i].FechaRegistro + ' a las ' + notas.NotasInicial[i].HoraRegistro + ' por ' + notas.NotasInicial[i].IdUsuario + '</div></div>' + imgEnvioCorreo + '<div style="clear:both; height:5px;"></div><div class="mensajeNotaConAdjunto"> ' +
                                notas.NotasInicial[i].Descripcion + '</div><div class="mensajeAdjunto"><div class="imagenArchivoAdjunto"></div>' + divAdjunto + '</div></div>';
                        }
                        else {
                            mensaje = '<div class="dvNotaContenedor bordeAdjunto"><div class="tituloNota"><div class="imagenNota"></div><div class="subTituloNota">Nota creada el ' +
                                notas.NotasInicial[i].FechaRegistro + ' a las ' + notas.NotasInicial[i].HoraRegistro + ' por ' + notas.NotasInicial[i].IdUsuario + '</div></div>' + imgEnvioCorreo + '<div style="clear:both; height:5px;"></div><div class="mensajeNotaConAdjunto"> ' +
                                notas.NotasInicial[i].Descripcion + '</div><div class="mensajeAdjunto"><div class="imagenArchivoAdjunto"></div>' + divAdjunto + '</div></div>';
                        }

                    }


                    $("#dvMensajes").append(mensaje);
                }

                $('#dvConversacion').dialog({
                    title: "Detalles de conversación",
                    height: alto,
                    width: ancho,
                    modal: true,
                    close: function (event, ui) {
                        $("#dvEnvioSupervisor").css("display", "block");
                    }
                });

                var iid = $("#gridSolicitud").jqGrid('getGridParam', 'selrow');
                if (iid) {
                    var datos = $("#gridSolicitud").jqGrid('getRowData', iid);

                    if (datos['CodEstado'] == "AYU") {
                        esMensajeAyuda = 1;
                        //$("#dvEnvioSupervisor").css("display", "block");
                    }
                    else {
                        esMensajeAyuda = 0;
                        //$("#dvEnvioSupervisor").css("display", "none");
                        if (datos['CodEstado'] == "RES" || datos['CodEstado'] == "ANU" || datos['CodEstado'] == "DEV") {
                            $("#dvEscribir").hide();
                        }
                        else {
                            $("#dvEscribir").show();
                        }
                    }
                }
                else {
                    //alerta("Seleccione un registro");
                }

                //$("#dvMensajes").animate({ scrollTop: document.getElementById("dvMensajes").scrollHeight }, 1500);

            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

}

function cambiarDetalle() {

    var tipo = $("#ddlOrigen").val();
    $("#dvEnviar").css("display", "block");
    $("#pnlAdjuntar").css("display", "block");
    $("#txtNotaEnviar").val("");
    if (tipo == "0") {
        $("#dvEnvioSupervisor").css("display", "block");
        $("#dvMensajes").html("");

        if (esMensajeAyuda == 1) {
            //$("#dvEnvioSupervisor").css("display", "block");
        }

        if (notas.NotasInicial.length < 1) {
            $("#dvEnviar").css("display", "none");
            $("#pnlAdjuntar").css("display", "none");
            alerta("No hay notas con cliente");
            //Mensaje("<br/><h1>No hay notas con cliente</h1><br/>", document);                
        }
        else {

            var i;
            for (i = 0; i < notas.NotasInicial.length; i++) {
                var mensaje;
                var divAdjunto = '<div style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"><span class="linkDescarga" onclick="fnDescargarArchivo(\'' + notas.NotasInicial[i].NombreArchivo + '\',2,' + notas.NotasInicial[i].P_inCod + ')">' + notas.NotasInicial[i].NombreArchivo + ' </span></div>';

                var imgEnvioCorreo = '<div style="float: right;"><img src="../../../Common/Images/Mantenimiento/Enviar.gif" title="Correo enviado"></div>';
                if (notas.NotasInicial[i].EnvioCorreo == false) {
                    imgEnvioCorreo = '';
                }

                if (notas.NotasInicial[i].NombreArchivo == '') {
                    if (notas.NotasInicial[i].EsAyuda) {
                        mensaje = '<div class="dvNotaContenedor ui-state-highlight"><div class="tituloNota"><div class="imagenEsAyuda"></div><div class="subTituloNota">Nota creada el ' +
                            notas.NotasInicial[i].FechaRegistro + ' a las ' + notas.NotasInicial[i].HoraRegistro + ' por ' + notas.NotasInicial[i].IdUsuario + '</div></div>' + imgEnvioCorreo + '<div style="clear:both; height:5px;"></div><div class="mensajeNota"> ' +
                            notas.NotasInicial[i].Descripcion + '</div></div>';
                    }
                    else {
                        mensaje = '<div class="dvNotaContenedor"><div class="tituloNota"><div class="imagenNota"></div><div class="subTituloNota">Nota creada el ' +
                            notas.NotasInicial[i].FechaRegistro + ' a las ' + notas.NotasInicial[i].HoraRegistro + ' por ' + notas.NotasInicial[i].IdUsuario + '</div></div>' + imgEnvioCorreo + '<div style="clear:both; height:5px;"></div><div class="mensajeNota"> ' +
                            notas.NotasInicial[i].Descripcion + '</div></div>';
                    }
                }
                else {
                    if (notas.NotasInicial[i].EsAyuda) {

                        mensaje = '<div class="dvNotaContenedor bordeAdjunto ui-state-highlight"><div class="tituloNota"><div class="imagenEsAyuda"></div><div class="subTituloNota">Nota creada el ' +
                            notas.NotasInicial[i].FechaRegistro + ' a las ' + notas.NotasInicial[i].HoraRegistro + ' por ' + notas.NotasInicial[i].IdUsuario + '</div></div>' + imgEnvioCorreo + '<div style="clear:both; height:5px;"></div><div class="mensajeNotaConAdjunto"> ' +
                            notas.NotasInicial[i].Descripcion + '</div><div class="mensajeAdjunto"><div class="imagenArchivoAdjunto"></div>' + divAdjunto + '</div></div>';
                    }
                    else {
                        mensaje = '<div class="dvNotaContenedor bordeAdjunto"><div class="tituloNota"><div class="imagenNota"></div><div class="subTituloNota">Nota creada el ' +
                            notas.NotasInicial[i].FechaRegistro + ' a las ' + notas.NotasInicial[i].HoraRegistro + ' por ' + notas.NotasInicial[i].IdUsuario + '</div></div>' + imgEnvioCorreo + '<div style="clear:both; height:5px;"></div><div class="mensajeNotaConAdjunto"> ' +
                            notas.NotasInicial[i].Descripcion + '</div><div class="mensajeAdjunto"><div class="imagenArchivoAdjunto"></div>' + divAdjunto + '</div></div>';
                    }
                }

                $("#dvMensajes").append(mensaje);
            }


        }
    }
    else {
        $("#dvMensajes").html("");
        $("#dvEnvioSupervisor").css("display", "none");


        if (notas.EscalamientosAnteriores.length > 0) {
            for (i = 0; i < notas.EscalamientosAnteriores.length; i++) {

                mensaje = ' <div class="dvNotaContenedor "> <div class="EscalaAnteriores"><table ><tr><td colspan=3 class="bordeInferior" >Escalamiento anterior</td></tr><tr><td>Fecha y Hora de Cierre</td><td width=15px></td><td>' + notas.EscalamientosAnteriores[i].FechaCierre + ' ' +
                    notas.EscalamientosAnteriores[i].HoraCierre + '</td></tr><tr><td>Descripción </td><td width=15px></td><td>' + notas.EscalamientosAnteriores[i].Descripcion +
                    ' </td></tr><tr><td>Conclución</td><td width=15px></td><td> ' + notas.EscalamientosAnteriores[i].Conclucion +
                    '</td></tr></table> </div> <div class="dvContenidoEscala" id="dvContenidoEscala-' + notas.EscalamientosAnteriores[i].IdTicketEscalamiento + '"> </div> <div class="dvVerDetalleEsc" onClick="ObtenerDetalleEscalamientoAnterior(' + notas.EscalamientosAnteriores[i].IdTicketEscalamiento + ',' + notas.EscalamientosAnteriores[i].IdTicketBase + ',' + notas.EscalamientosAnteriores[i].IdTicketEscalado + ',this)" )>Ver Detalle <br><span style="margin-left:290px;" class="ui-icon ui-icon-carat-1-s"></span></div> </div> ';
                $("#dvMensajes").append(mensaje);
            }

        }

        if (notas.NotasFinal.length < 1) {
            $("#dvEnviar").css("display", "none");
            $("#pnlAdjuntar").css("display", "none");
            if (notas.EscalamientosAnteriores.length == 0) {
                alerta("No hay notas de escalamiento");
            }
            //Mensaje("<br/><h1>No hay notas de escalamiento</h1><br/>", document);                
        }
        else {
            var i;
            for (i = 0; i < notas.NotasFinal.length; i++) {
                var mensaje;
                var divAdjunto = '<div style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"><span class="linkDescarga" onclick="fnDescargarArchivo(\'' + notas.NotasFinal[i].NombreArchivo + '\',2,' + notas.NotasFinal[i].P_inCod + ')">' + notas.NotasFinal[i].NombreArchivo + ' </span></div>';

                var imgEnvioCorreo = '<div style="float: right;"><img src="../../../Common/Images/Mantenimiento/Enviar.gif" title="Correo enviado"></div>';
                if (notas.NotasFinal[i].EnvioCorreo == false) {
                    imgEnvioCorreo = '';
                }

                if (notas.NotasFinal[i].NombreArchivo == '') {
                    mensaje = '<div class="dvNotaContenedor"><div class="tituloNota"><div class="imagenNota"></div><div class="subTituloNota">Nota creada el ' +
                        notas.NotasFinal[i].FechaRegistro + ' a las ' + notas.NotasFinal[i].HoraRegistro + ' por ' + notas.NotasFinal[i].IdUsuario + '</div></div>' + imgEnvioCorreo + '<div style="clear:both; height:5px;"></div><div class="mensajeNota"> ' +
                        notas.NotasFinal[i].Descripcion + '</div></div>';
                }
                else {
                    mensaje = '<div class="dvNotaContenedor bordeAdjunto"><div class="tituloNota"><div class="imagenNota"></div><div class="subTituloNota">Nota creada el ' +
                        notas.NotasFinal[i].FechaRegistro + ' a las ' + notas.NotasFinal[i].HoraRegistro + ' por ' + notas.NotasFinal[i].IdUsuario + '</div></div>' + imgEnvioCorreo + '<div style="clear:both; height:5px;"></div><div class="mensajeNotaConAdjunto"> ' +
                        notas.NotasFinal[i].Descripcion + '</div><div class="mensajeAdjunto"><div class="imagenArchivoAdjunto"></div>' + divAdjunto + '</div></div>';
                }

                $("#dvMensajes").append(mensaje);
            }
        }
    }
    $("#dvMensajes").animate({ scrollTop: document.getElementById("dvMensajes").scrollHeight }, 1500);
}

function registrarNota() {
    debugger;
    if ($.trim($("#txtNotaEnviar").val()) != "") {
        var origen = $("#ddlOrigen").val();
        var IdTicket;
        var IdTicketEscalamiento;
        var EsAyuda;
        var EnvioCorreo;
        var esSupervisor = 0;
        var codEstado;
        var idDominio = -1;
        var id = $("#gridSolicitud").jqGrid('getGridParam', 'selrow');
        if (id) {
            var datos = $("#gridSolicitud").jqGrid('getRowData', id);
            IdTicket = datos['IdTicket'];
            codEstado = datos['CodEstado'];
        }
        else {
            return;
        }

        if (origen == "0") {

            if ($("#ddlNivel").val() == '6-0') {
                if (codEstado == "EXT" && window.top.$("#hdfCodigoDominio").val() != "") {
                    //if (codEstado == "EXT") {
                    idDominio = window.top.$("#hdfCodigoDominio").val();
                    //idDominio = 15;
                }

                IdTicketEscalamiento = notas.EscalamientoFinal;
            }
            else {
                IdTicketEscalamiento = notas.EscalamientoInicial;
            }


        }
        else {
            IdTicketEscalamiento = notas.EscalamientoFinal;

            if (codEstado == "EXT" && window.top.$("#hdfCodigoDominio").val() != "") {
                //if (codEstado == "EXT" ) {
                idDominio = window.top.$("#hdfCodigoDominio").val();
                //idDominio = 15;
            }

        }

        if ($("#ddlTecnicos option").length > 1) {

        }
        else {
            IngresadoPor = '2';
        }

        if ($("#dvEnvioSupervisor").css("display") != "none") {
            if ($("#chkEnvioSupervisor").attr("checked") == "checked") {
                EsAyuda = 1;
            }
            else {
                EsAyuda = 0;
            }
        }
        else {
            EsAyuda = 0;
        }

        if ($("#chkEnviarCorreo").attr("checked") == "checked") {
            EnvioCorreo = 1;
        }
        else {
            EnvioCorreo = 0;
        }


        if ($("#ddlTecnicos option:selected").text().indexOf("(Supervisor)") < 0) {
            esSupervisor = 1;
        }

        $.ajax({
            type: "POST",
            url: "SOA_Adm_Solicitudes.aspx/registrarDetalleTicket_Tecnico",
            data: "{'prIdTicket': '" + IdTicket + "'," +
            "'prIdTicketEscalamiento': '" + IdTicketEscalamiento + "'," +
            "'prIdUsuario': '" + $("#hdfIdUsuarioLogeado").val() + "'," +
            "'prNota': '" + $("#txtNotaEnviar").val().replace(/'/g, "&#39") + "'," +
            "'vcFileName': '" + vcFileName + "'," +
                "'prEsParaSupervisor': '" + EsAyuda + "', " +
                "'prEnvioCorreo': '" + EnvioCorreo + "', " +
            "'psEsSupervisor': '" + esSupervisor + "', " +
            "'pIdDominio': '" + idDominio + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;
                var resultado = result.d;
                var mensaje;


                //                    var mensaje = '<div class="dvNotaContenedor bordeAdjunto"><div class="tituloNota"><div class="imagenNota"></div><div class="subTituloNota">Nota creada el ' +
                //                    resultado.FechaRegistro + ' a las ' + resultado.HoraRegistro + ' por ' + resultado.IdUsuario + '</div></div><div style="clear:both; height:5px;"></div><div class="mensajeNotaConAdjunto"> ' +
                //                    resultado.Descripcion + '</div><div class="mensajeAdjunto"><div class="imagenArchivoAdjunto"></div> <span class="linkDescarga" onclick="fnDescargarArchivo(\'' + vcFileName + '\',2,' + resultado.P_inCod + ')">' + vcFileName + ' </span></div></div>';

                var imgEnvioCorreo = '<div style="float: right;"><img src="../../../Common/Images/Mantenimiento/Enviar.gif" title="Correo enviado"></div>';
                if (resultado.EnvioCorreo == false) {
                    imgEnvioCorreo = '';
                }

                if (vcFileName != "") {
                    var divAdjunto = '<div style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"><span class="linkDescarga" onclick="fnDescargarArchivo(\'' + vcFileName + '\',2,' + resultado.P_inCod + ')">' + vcFileName + ' </span></div>';

                    if (resultado.EsAyuda) {
                        mensaje = '<div class="dvNotaContenedor bordeAdjunto ui-state-highlight"><div class="tituloNota"><div class="imagenEsAyuda"></div><div class="subTituloNota">Nota creada el ' +
                            resultado.FechaRegistro + ' a las ' + resultado.HoraRegistro + ' por ' + resultado.IdUsuario + '</div></div>' + imgEnvioCorreo + '<div style="clear:both; height:5px;"></div><div class="mensajeNotaConAdjunto"> ' +
                            resultado.Descripcion + '</div><div class="mensajeAdjunto"><div class="imagenArchivoAdjunto"></div>' + divAdjunto + '</div></div>';
                    }
                    else {
                        mensaje = '<div class="dvNotaContenedor bordeAdjunto"><div class="tituloNota"><div class="imagenNota"></div><div class="subTituloNota">Nota creada el ' +
                            resultado.FechaRegistro + ' a las ' + resultado.HoraRegistro + ' por ' + resultado.IdUsuario + '</div></div>' + imgEnvioCorreo + '<div style="clear:both; height:5px;"></div><div class="mensajeNotaConAdjunto"> ' +
                            resultado.Descripcion + '</div><div class="mensajeAdjunto"><div class="imagenArchivoAdjunto"></div>' + divAdjunto + '</div></div>';
                    }
                    DeleteFile(vcFileName);
                }
                else {
                    if (resultado.EsAyuda) {
                        mensaje = '<div class="dvNotaContenedor ui-state-highlight"><div class="tituloNota"><div class="imagenEsAyuda"></div><div class="subTituloNota">Nota creada el ' +
                            resultado.FechaRegistro + ' a las ' + resultado.HoraRegistro + ' por ' + resultado.IdUsuario + '</div></div>' + imgEnvioCorreo + '<div style="clear:both; height:5px;"></div><div class="mensajeNota"> ' +
                            resultado.Descripcion + '</div></div>';
                    }
                    else {
                        mensaje = '<div class="dvNotaContenedor"><div class="tituloNota"><div class="imagenNota"></div><div class="subTituloNota">Nota creada el ' +
                            resultado.FechaRegistro + ' a las ' + resultado.HoraRegistro + ' por ' + resultado.IdUsuario + '</div></div>' + imgEnvioCorreo + '<div style="clear:both; height:5px;"></div><div class="mensajeNota"> ' +
                            resultado.Descripcion + '</div></div>';
                    }


                }


                $("#txtNotaEnviar").val("");
                $("#txtNotaEnviar").focus();

                $("#dvMensajes").append(mensaje);

                $("#dvMensajes").animate({ scrollTop: document.getElementById("dvMensajes").scrollHeight }, 2000);

            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
    else {
        alerta("Debe ingresar un mensaje", null, function () {
            $("#txtNotaEnviar").focus();
        });
    }
}

function activarAyudaSupervisor() {

    var id = $("#gridSolicitud").jqGrid('getGridParam', 'selrow');
    if (id) {
        var datos = $("#gridSolicitud").jqGrid('getRowData', id);
        var IdTicket = datos['IdTicket'];
        var CodEstado = datos['CodEstado'];
        var CodTicket = datos['CodigoTicket'];

        if (CodEstado != "ACT" && CodEstado != "AYU") {
            //alerta("Solo puede activar o desactivar ayuda a tickets activos o en ayuda");
            Mensaje("<br/><h1>Sólo puede activar o desactivar ayuda <br/> a tickets activos o en ayuda</h1><br/>", document);
            return;
        }

        $("#spanActivarCod").text(CodTicket);

        if (CodEstado == "ACT") {
            $("#spanActivar").text("activará");
        }
        else {
            $("#spanActivar").text("desactivará");
        }

        $('#dvAyuda').dialog({
            title: "Activar ayuda de ticket " + datos['CodigoTicket'],
            height: 150,
            width: 280,
            modal: true
        });

    }
    else {
        alerta("Seleccione un registro");
        //Mensaje("<br/><h1>Seleccione un registro</h1><br/>", document); 
    }

}

function registrarActivarAyudaSupervisor() {
    var id = $("#gridSolicitud").jqGrid('getGridParam', 'selrow');
    if (id) {
        var datos = $("#gridSolicitud").jqGrid('getRowData', id);
        var IdTicket = datos['IdTicket'];
        var CodEstado = datos['CodEstado'];
        var Activar;

        if (CodEstado != "ACT" && CodEstado != "AYU" && CodEstado != "ATE") {
            //alerta("Solo puede activar o desactivar ayuda a tickets activos o en ayuda");
            Mensaje("<br/><h1>Sólo puede activar o desactivar ayuda <br/> a tickets activos, atendidos o en ayuda</h1><br/>", document);
            return;
        }

        if (CodEstado == "ACT") {
            Activar = "true";
        }
        else {
            Activar = "false";
        }

        $.ajax({
            type: "POST",
            url: "SOA_Adm_Solicitudes.aspx/activarAyudaSupervisor",
            data: "{'prIdTicket': '" + IdTicket + "'," +
                    "'prActivar': " + Activar + "," +
                    "'prIdTecnicoSupervisor': '" + $("#hdfIdTecnico").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                var resultado = result.d;

                if (resultado.split('|')[0] == 'OK') {
                    if (Activar == "true") {
                        //alerta("Se áctivo ayuda exitosamente");
                        Mensaje("<br/><h1>Se áctivo ayuda exitosamente</h1><br/>", document);
                    }
                    else {
                        //alerta("Se desáctivo ayuda exitosamente");
                        Mensaje("<br/><h1>Se desáctivo ayuda exitosamente</h1><br/>", document);
                    }

                    $("#gridSolicitud").trigger("reloadGrid");
                }
                else {
                    //alert(resultado.split('|')[1]);
                    Mensaje("<br/><h1>" + resultado.split('|')[1] + "</h1><br/>", document);
                }

                $('#dvAyuda').dialog("close");

            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });

    }
    else {
        alerta("Seleccione un registro");
        //Mensaje("<br/><h1>Seleccione un registro</h1><br/>", document);
    }
}


function registrarNota_usuario() {
    debugger;
    if ($.trim($("#txtNotaEnviar").val()) != "") {
        var IdTicket;
        var idDominio = -1;
        var id = $("#gridSolicitud").jqGrid('getGridParam', 'selrow');
        if (id) {
            var datos = $("#gridSolicitud").jqGrid('getRowData', id);
            IdTicket = datos['IdTicket'];

            if (datos.CodEstado == "EXT" && window.top.$("#hdfCodigoDominio").val() != "") {
                //if (datos.CodEstado == "EXT" ) {
                idDominio = window.top.$("#hdfCodigoDominio").val();
                //idDominio = 15;
            }
        }
        else {
            return;
        }

        if ($("#chkEnviarCorreo").attr("checked") == "checked") {
            EnvioCorreo = 1;
        }
        else {
            EnvioCorreo = 0;
        }

        $.ajax({
            type: "POST",
            url: "SOA_Adm_Solicitudes.aspx/registrarDetalleTicket_Usuario",
            data: "{'prIdTicket': '" + IdTicket + "'," +
                        "'prIdUsuario': '" + $("#hdfIdUsuarioLogeado").val() + "'," +
                        "'prNota': '" + $("#txtNotaEnviar").val().replace(/'/g, "&#39") + "'," +
                "'vcFileName': '" + vcFileName + "', " +
                "'prEnvioCorreo': " + EnvioCorreo + ", " +
                        "'pIdDominio': '" + idDominio + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;
                var resultado = result.d;
                var id = $("#gridSolicitud").jqGrid('getGridParam', 'selrow');
                $("#txtNotaEnviar").val("");
                $("#chkEnviarCorreo").removeAttr("checked");
                var datos = $("#gridSolicitud").jqGrid('getRowData', id);
                var iid = datos['IdTicket'];
                if (vcFileName != "") {
                    DeleteFile(vcFileName);
                }
                $.ajax({
                    type: "POST",
                    url: "SOA_Adm_Solicitudes.aspx/obtenerDetalleTicket_Usuario",
                    data: "{'prIdTicket': '" + iid + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        notas = result.d;
                        var mensaje;
                        $("#dvMensajes").html("");

                        $("#dvEnviar").css("display", "block");

                        var i;
                        for (i = 0; i < notas.length; i++) {

                            var divAdjunto = '<div style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"><span class="linkDescarga" onclick="fnDescargarArchivo(\'' + notas[i].NombreArchivo + '\',2,' + notas[i].P_inCod + ')">' + notas[i].NombreArchivo + ' </span></div>';

                            var imgEnvioCorreo = '<div style="float: right;"><img src="../../../Common/Images/Mantenimiento/Enviar.gif" title="Correo enviado"></div>';
                            if (notas[i].EnvioCorreo == false) {
                                imgEnvioCorreo = '';
                            }

                            if (notas[i].NombreArchivo == '') {
                                mensaje = '<div class="dvNotaContenedor"><div class="tituloNota"><div class="imagenNota"></div><div class="subTituloNota">Nota creada el ' +
                                    notas[i].FechaRegistro + ' a las ' + notas[i].HoraRegistro + ' por ' + notas[i].IdUsuario + '</div></div>' + imgEnvioCorreo + '<div style="clear:both; height:5px;"></div><div class="mensajeNota"> ' +
                                    notas[i].Descripcion + '</div></div>';
                            }
                            else {
                                mensaje = '<div class="dvNotaContenedor bordeAdjunto"><div class="tituloNota"><div class="imagenNota"></div><div class="subTituloNota">Nota creada el ' +
                                    notas[i].FechaRegistro + ' a las ' + notas[i].HoraRegistro + ' por ' + notas[i].IdUsuario + '</div></div>' + imgEnvioCorreo + '<div style="clear:both; height:5px;"></div><div class="mensajeNotaConAdjunto"> ' +
                                    notas[i].Descripcion + '</div><div class="mensajeAdjunto"><div class="imagenArchivoAdjunto"></div>' + divAdjunto +'</div></div>';
                            }

                            $("#dvMensajes").append(mensaje);
                        }

                        $('#dvConversacion').dialog({
                            title: "Detalles de conversación",
                            height: alto,
                            width: ancho,
                            modal: true,
                            close: function (event, ui) {
                                $("#dvEnvioSupervisor").css("display", "block");
                            }
                        });

                        $("#dvMensajes").animate({ scrollTop: document.getElementById("dvMensajes").scrollHeight }, 0);

                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
    else {
        alerta("Debe ingresar un mensaje", null, function () {
            $("#txtNotaEnviar").focus();
        });
    }
}


function fnCambiarTecnico() {
    //var miTecElegido = $("#ddlTecnicos").val();

    $.ajax({
        type: "POST",
        url: "SOA_Adm_Solicitudes.aspx/ListarNivel_deTecnico",
        data: "{'prIdTecnicoSupervisor': '" + $("#ddlTecnicos").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var resul = result.d;

            $("#ddlNivel").html("");
            var i;
            for (i = 0; i < resul.length; i++) {
                $("#ddlNivel").append("<option value=" + resul[i].IdNivel.toString() + "-" + resul[i].Orden.toString() + ">" + resul[i].Nombre.toString() + "</option>");
            }

            $.ajax({
                type: "POST",
                url: "SOA_Adm_Solicitudes.aspx/ListarBolsa_deTecnico",
                data: "{'prIdTecnicoSupervisor': '" + $("#ddlTecnicos").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var resul = result.d;

                    $("#ddlBolsa").html("");

                    var i;
                    for (i = 0; i < resul.length; i++) {
                        if ($("#ddlNivel").val().split('-')[1] == resul[i].Orden.toString()) {
                            $("#ddlBolsa").append("<option value=" + resul[i].IdBolsa.toString() + "-" + resul[i].IdNivel.toString() + ">" + resul[i].Nombre.toString() + "</option>");
                        }

                    }

                    $("#gridSolicitud").trigger("reloadGrid");

                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}
function DeleteFile(file) {
    $.ajax({
        url: "UploadHandler.ashx?file=" + file + "&accion=delete",
        type: "GET",
        cache: false,
        async: true,
        success: function (html) {
            $('#UploadedFile').html("");
            $("#UploadButton").show();
            vcFileName = "";
        }
    });
}

function fnDescargarArchivo(NomArc, tipo, inIdDet) {
    //Descargar adjunto antes de grabar nota
    if (tipo == 1) {
        var filePath = "P_Movil/Administrar/Temporal/Incidencias" + CarpetaDominio + "/" + NomArc;
        $.ajax({
            url: raiz(filePath),
            success: function (data) {
                window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + filePath);
            },
            error: function (data) {
                alerta('No se encontró el archivo a descargar.');
                $('#UploadedFile').html("");
                $("#UploadButton").show();
                vcFileName = "";
            }
        });
    }
        //Descargar adjunto de nota grabada
    else if (tipo == 2) {
        $.ajax({
            type: "POST",
            url: "SOA_Adm_Solicitudes.aspx/DescargarArchivoBD",
            data: "{'inIdDet': '" + inIdDet + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                //var filePath = "P_Movil/Administrar/Temporal/Incidencias/" + NomArc;
                var filePath = "P_Movil/Administrar/Temporal/Incidencias" + CarpetaDominio + "/" + result.d[1];

                if (NomArc.split('.')[1] == 'doc' || NomArc.split('.')[1] == 'docx' || NomArc.split('.')[1] == 'xls' || NomArc.split('.')[1] == 'xlsx') {
                    window.location.href = raiz(filePath);
                    return;
                }

                $.ajax({
                    url: raiz(filePath),
                    success: function (data) {
                        window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + filePath);
                    },
                    error: function (data) {
                        alerta('No se encontró el archivo a descargar.');
                        $('#UploadedFile').html("");
                        $("#UploadButton").show();
                        vcFileName = "";
                    }
                });
            },
            error: function (xhr, err) {
                $("#dvCargando").hide();
                alerta("Error, Estadow: " + xhr.readyState + "\nEstado: " + xhr.status);
            }
        });
    }

}


$("#filesubido").live("click", function () {
    var archivo = $(this).attr("nombre");
    fnDescargarArchivo(archivo, 1, null);
});


function ObtenerDetalleEscalamientoAnterior(IdTicketEscalamiento, IdTicketBase, IdTicketEscalado, e) {

    //alert(IdTicketEscalamiento + '-' + IdTicketBase + '-' + IdTicketEscalado);

    if ($("#dvContenidoEscala-" + IdTicketEscalamiento).html() == " ") {

        $.ajax({
            type: "POST",
            url: "SOA_Adm_Solicitudes.aspx/ObtenerDetalleEscalamientoAnterior",
            data: "{'prIdTicketEscalamiento': '" + IdTicketEscalamiento + "'," +
                        "'prIdTicketBase': '" + IdTicketBase + "'," +
                        "'prIdTicketEscalado': '" + IdTicketEscalado + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                var NotasAnteriores;
                NotasAnteriores = result.d;
                var mensaje;

                var i;
                for (i = 0; i < NotasAnteriores.length; i++) {

                    var divAdjunto = '<div style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"><span class="linkDescarga" onclick="fnDescargarArchivo(\'' + NotasAnteriores[i].NombreArchivo + '\',2,' + NotasAnteriores[i].P_inCod + ')">' + NotasAnteriores[i].NombreArchivo + ' </span></div>';

                    var imgEnvioCorreo = '<div style="float: right;"><img src="../../../Common/Images/Mantenimiento/Enviar.gif" title="Correo enviado"></div>';
                    if (NotasAnteriores[i].EnvioCorreo == false) {
                        imgEnvioCorreo = '';
                    }

                    if (NotasAnteriores[i].NombreArchivo == '') {
                        mensaje = '<div class="dvNotaContenedor2"><div class="tituloNota"><div class="imagenNota"></div><div class="subTituloNota">Nota creada el ' +
                            NotasAnteriores[i].FechaRegistro + ' a las ' + NotasAnteriores[i].HoraRegistro + ' por ' + NotasAnteriores[i].IdUsuario + '</div></div>' + imgEnvioCorreo + '<div style="clear:both; height:5px;"></div><div class="mensajeNota"> ' +
                            NotasAnteriores[i].Descripcion + '</div></div>';
                    }
                    else {
                        mensaje = '<div class="dvNotaContenedor2 bordeAdjunto"><div class="tituloNota"><div class="imagenNota"></div><div class="subTituloNota">Nota creada el ' +
                            NotasAnteriores[i].FechaRegistro + ' a las ' + NotasAnteriores[i].HoraRegistro + ' por ' + NotasAnteriores[i].IdUsuario + '</div></div>' + imgEnvioCorreo + '<div style="clear:both; height:5px;"></div><div class="mensajeNotaConAdjunto"> ' +
                            NotasAnteriores[i].Descripcion + '</div><div class="mensajeAdjunto"><div class="imagenArchivoAdjunto"></div>' + divAdjunto + '</div></div>';
                    }

                    $("#dvContenidoEscala-" + IdTicketEscalamiento).append(mensaje);
                }

                $("#dvContenidoEscala-" + IdTicketEscalamiento).show();
                $(e).hide();
                //scroolIntoView("#dvContenidoEscala-" + IdTicketEscalamiento, 1000);
                //$("#dvMensajes").animate({ scrollTop: document.getElementById("dvContenidoEscala-" + IdTicketEscalamiento).scrollHeight }, 1500);

            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });

    }
    else {
        $("#dvContenidoEscala-" + IdTicketEscalamiento).show();
    }


}



function fnEscalarExterno() {

    $.ajax({
        type: "POST",
        url: "SOA_Adm_Solicitudes.aspx/getTiposExternos",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            tiposExternos = result.d;
            if (tiposExternos.length > 0) {
                $("#ddlTiposExternos").html("");
                $("#ddlTipificacionExterna").html("");
                var i;
                for (i = 0; i < tiposExternos.length; i++) {
                    $("#ddlTiposExternos").append("<option value=\"" + tiposExternos[i].IdTipo.toString() + "\">" + tiposExternos[i].Nombre + "</option>");
                }

                var k;
                for (k = 0; k < tiposExternos[0].Tipificaciones.length; k++) {
                    $("#ddlTipificacionExterna").append("<option value=\"" + tiposExternos[0].Tipificaciones[k].IdTipificacion.toString() + "\">" + tiposExternos[0].Tipificaciones[k].Nombre + "</option>");
                }

                $('#dvEscalarExterno').dialog({
                    title: "Escalar externamente",
                    height: 310,
                    width: 410,
                    modal: true
                });
            }
            else {
                Mensaje("<br/><h1>No existe un canal de atención al cual enviar su incidencia</h1><br/>", document);
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}


function fnRegistrarEcalarExterno() {

    var id = $("#gridSolicitud").jqGrid('getGridParam', 'selrow');
    if (id) {
        $('#dvEscalarExterno').dialog("close");
        var datos = $("#gridSolicitud").jqGrid('getRowData', id);

        var CodEstado = datos['CodEstado'];

        if (CodEstado != 'ACT' && CodEstado != 'AYU' && CodEstado != 'ATE') {
            alerta("Sólo se pueden escalar tickets ACTIVOS , ATENDIDOS y de AYUDA");
            return;
        }

        var oParametro;
        oParametro = new PRM_TicketExterno();

        oParametro.IdTicket = datos['IdTicket'];
        oParametro.CodigoTicket = datos['CodigoTicket'];

        oParametro.IdUsuario = $("#ddlTecnicos").val();
        oParametro.Nombres = $("#ddlTecnicos option:selected").text();

        oParametro.IdDominio = window.top.$("#hdfCodigoDominio").val();
        oParametro.IdTipificacion = $("#ddlTipificacionExterna").val();

        oParametro.Asunto = datos['Asunto'];
        oParametro.Descripcion = datos['Descripcion'];
        oParametro.DescripcionEscalamiento = $("#txtDscExerno").val();

        $.ajax({
            type: "POST",
            url: "SOA_Adm_Solicitudes.aspx/EscalarTicketExterno",
            data: "{'pParametro': '" + JSON.stringify(oParametro) + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var resultado = result.d;

                if (resultado.Success && resultado.Mensaje.split('|')[0] == "OK") {
                    alerta(resultado.Mensaje.split('|')[1]);
                    $("#gridSolicitud").trigger("reloadGrid");
                }
                else {
                    alerta(resultado.Mensaje.split('|')[1]);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
    else {
        alerta("Seleccione un registro");
    }

}