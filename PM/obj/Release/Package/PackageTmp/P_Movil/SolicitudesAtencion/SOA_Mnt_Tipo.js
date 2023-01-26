/// <reference path="../../Common/Scripts/jquery-2.0.0-vsdoc.js" />
//var esEditar;
var vcMensajeClave = "Ej: {Empleado} (Use '{ }')";
var inIdTipo;
var inIdTipificacion = 0;
var inRow = 1;
var vcTabSel = "";
var biPrimerEst = "PEN";
var indiceTab;

var gridTipificacion;
var tbParametros;

$(function () {
    
    inicializarElementos();
});

function inicializarElementos() {
    load();
    inicializarEventos();
    DimPosElementos();
}

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    var AnchoLateral = $(".LateralSplitter");

    $('#dvUmbral').css("width", $(window).width() - 129);
    $('#dvMensaje').css("width", $(window).width() - 129);
    $("#txtMensaje").css("width", $(window).width() - 196);
    $("#txtMensajeUmb").css("width", $(window).width() - 205);
}

function load() {
    inIdTipo = $("#hdfIdTipo").val();
    indiceTab = window.parent.tab.tabs("option", "selected");

    //----------------------------------------------------------------| TIPIFICACIÓN |----------------------------------------------------------------//

    gridTipificacion = $("#gridTipificacion").jqGrid({
        datatype: "local",
        colModel: [
            { name: 'P_inCod', index: 'P_inCod', label: 'Id', width: "50px", hidden: true },
            { name: 'Nombre', index: 'Nombre', label: 'Nombre', width: "206px" },
            { name: 'Descripcion', index: 'Descripcion', label: 'Descripción', width: "350px" },
            { name: 'IdTipo', index: 'IdTipo', label: 'IdTipo', hidden: true },
            { name: 'inNumTic', index: 'inNumTic', label: 'inNumTic', hidden: true }
        ],
        emptyrecords: 'No hay resultados',
        loadtext: 'Cargando datos...',
        rownumbers: true,
        shrinkToFit: false,
        rowNum: 10,
        height: "100%",
        width: 600,
        sortname: "Nombre", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        ondblClickRow: function (rowid, aData, rowelem) {
            var row = gridTipificacion.getRowData(rowid);
            inIdTipificacion = rowid;

            $("#txtNombreTipificacion").val(row["Nombre"]);
            $("#txtDescripcionTipificacion").val(row["Descripcion"]);

            fnActualizarBotonesTipificacion("Actualizar");
        }

    });

    //------------------------------------------------------------------------------------------------------------------------------------------------>>


    //-----------------------------------------------------------------| PARÁMETROS |-----------------------------------------------------------------//

    tbParametros = $("#tbParametros").jqGrid({
        datatype: "local",
        colModel: [{ name: 'Clave', index: 'Clave', label: 'Clave', hidden: false, width: 180 },
            { name: 'IdCampo', index: 'IdCampo', label: 'IdCampo', hidden: true, width: 180 },
            { name: 'vcCampo', index: 'vcCampo', label: 'Valor', hidden: false, width: 220 },
            { name: 'IdParametro', index: 'IdParametro', label: 'IdParametro', hidden: true, width: 50,
                formatter: function (value, options, rData) {
                    if ($("#hdfCodTipSol").val() == "") {
                        return "-1";
                    } else {
                        if (rData.IdParametro == undefined || rData.IdParametro == "" || rData.IdParametro == null) {
                            return "0";
                        } else {
                            return rData.IdParametro;
                        }
                    }
                }
            }
        ],
        loadtext: 'Cargando datos...',
        emptyrecords: 'No hay resultados',
        sortname: "Clave", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        height: "100%",
        width: "490",
        rownumbers: true,
        shrinkToFit: false,
        ondblClickRow: function (rowid, aData, rowelem) {
            var rowParametros = tbParametros.getRowData(rowid);
            fnEditarParametro(rowParametros.Clave, rowParametros.IdCampo, rowParametros.vcCampo);
        }
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------>>


    if (inIdTipo == '0') {

//        $("#mnt_Tipificacion").css("display", "none");
        //        ListarBolsasPorAsignar();
        $("#EsChkActivar").css("display", "none");
        
        var i ;
        for (i= 0; i < $("#ddlEstado")[0].options.length; i++) {
            fnAgregarEstado($("#ddlEstado")[0].options[i].value, $("#ddlEstado")[0].options[i].text);
        }

        fnActualizarEtiquetasSemaforos();
    }
    else {
        for (i = 0; i < dtTipificacion.length; i++) {
            gridTipificacion.jqGrid('addRowData', inRow, dtTipificacion[i]);
            inRow = inRow + 1;
        }
        gridTipificacion.trigger("reloadGrid");

        var i;
        for (i = 0; i < dtParametros.length; i++) {
            //tbParametros.jqGrid('addRowData', inRow, dtParametros[i]);
            tbParametros.jqGrid('addRowData', dtParametros[i].IdCampo, dtParametros[i]);
            inRow = inRow + 1;
        }
        tbParametros.trigger("reloadGrid");

        fnActualizaControlesPorEstado($("#ddlEstado option:selected").text());
        fnActualizarEtiquetasSemaforos();
    }
}

function inicializarEventos() {

    //---------------| INICIAL |---------------//

    $(".accordion").accordion({
        collapsible: true,
        autoHeight: false
    });

    tabEstados = $("#tabEstados").tabs({
        select: function (event, ui) {
            vcTabSel = ui.panel.id;
        }
    });

    $(window).resize(function () {
        DimPosElementos();
    });

    //----------------------------------------->>


    //---------------| GENERAL |---------------//

    $("#btnCerrar").live("click", function () {
        window.parent.ActualizarGrilla();
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });

    $("#btnGuardar").click(function () {
        fnGuardarTipo();
    });

    $('#txtNombre,#txtDescripcion,#txtNombreTipificacion,#txtDescripcionTipificacion').live("keypress", function (e) {        
        return ValidarAlfaNumericoConEspacios(e);
    });

    $("#imgAgregar").click(function () {
        agregarBolsaEscalar();
    });

    $("#imgQuitar").click(function () {
        removerBolsaEscalar();
    });

    //----------------------------------------->>


    //------------| TIPIFICACIÓN |-------------//

    $("#txtDescripcionTipificacion").keyup(function (event) {
        if (event.keyCode == 13) {
            btnAgregarTipificacion.click();
            $("#txtNombreTipificacion").focus();
        }
    });

    $("#ddlBolsasParaAsignar").live('keypress', function (e) {
        if (e.which == '13') {
            agregarBolsaEscalar();
        }
    });

    $("#btnAgregarTipificacion").click(function () {
        if (!fnValidarTipificacion()) {
            return;
        }

        if (inIdTipificacion == "0") {
            fnAgregarTipificacion();
        }
        else {
            fnEditarTipificacion();
        }

        fnLimpiarControlesTipificacion();
    });

    $("#btnQuitarTipificacion").click(function () {
        if (inIdTipificacion == "0") {
            fnQuitarTipificacion();
        }
        else {
            fnCancelarTipificacion();
        }

        fnLimpiarControlesTipificacion();
        fnActualizarBotonesTipificacion("Agregar");
    });

    //----------------------------------------->>


    //-------------| PARÁMETROS |--------------//

    $("#txtClave").addClass("txtBusqueda");
    $("#txtClave").val(vcMensajeClave);

    $("#txtClave").focus(function () {
        if ($(this).hasClass("txtBusqueda")) {
            $(this).removeClass("txtBusqueda");
            $("#txtClave").val("");
        }
    });

    $("#txtClave").blur(function (i) {
        if ($("#txtClave").val() == "") {
            $(this).addClass("txtBusqueda");
            $("#txtClave").val(vcMensajeClave);
        }
    });

//    $("#txtClave").keyup(function (event) {
//        if (event.keyCode == 13)
//            btnAgregarParametro.click();
//    });

    $("#ddlValor").live('keypress', function (e) {
        if (e.which == '13') {
            btnAgregarParametro.click();
        }
    });

    $("#btnAgregarParametro").live("click", function () {
        fnAgregarEditarParametro();
    });

    $("#btnQuitarParametro").live("click", function () {
        fnQuitarParametro();
    });

    //----------------------------------------->>


    //------| CONFIGURACIÓN PARA ESTADOS |-----//

    fnValidarEnvioCorreo();

    $("#ddlEstado").focus(function () {
        fnActualizaArrayPorEstado($("#ddlEstado option:selected").text());
    }).change(function () {
        fnActualizaControlesPorEstado($("#ddlEstado option:selected").text());
    });

    //Mensaje//
    $('#chkEnviarCorreo').live("change", function () {
        fnValidarEnvioCorreo();
    });

    //Umbral//
    ValidarNumeroEnCajaTexto("txtValorObjetivo", ValidarEnteroPositivo);
    ValidarNumeroEnCajaTexto("txtValorMaximo", ValidarEnteroPositivo);

    $('#chkUmbral').change(function () {
        fnValidarUmbral();
    });

    $("#txtValorObjetivo").change(function () { fnValidarValoresSemaforos("#txtValorObjetivo"); });
    $("#txtValorMaximo").change(function () { fnValidarValoresSemaforos("#txtValorMaximo"); });

    $("#txtValorObjetivo,#txtValorMaximo").change(function () {
        fnActualizarEtiquetasSemaforos();
    });

    $('#chkEnviarCorreoUmb').change(function () {
        if ($(this).is(":checked")) {
            $("#dvMensajeUmb").show();
        }
        else {
            $("#dvMensajeUmb").hide();
        }
    });

    //----------------------------------------->>
}

function fnGuardarTipo() {
    
    if (!fnValidarTipo()) {
        return;
    } else {

        fnActualizaArrayPorEstado($("#ddlEstado option:selected").text());

        var chkCamAct;
        if ($("#chkMostrarCamActual").attr("checked") == "checked") {
            chkCamAct = "true";
        }
        else {
            chkCamAct = "false";
        }

        var chkMosAdmin;
        if ($("#chkMostrarAdmin").attr("checked") == "checked") {
            chkMosAdmin = "true";
        }
        else {
            chkMosAdmin = "false";
        }

        var biActivo;
        if ($("#chkActivo").prop('checked') || inIdTipo == "0") {
            biActivo = 1;
        }
        else {
            biActivo = 0;
        }

        //XML
        var XMLEscalamiento = '<?xml version="1.0" encoding="iso-8859-1"?><TABLE>';
        var XMLTipificacion = '<?xml version="1.0" encoding="iso-8859-1"?><ROOT>';
        var XMLParametros = '<?xml version="1.0" encoding="iso-8859-1"?><ROOT>';
        var XMLEstadoUmbral = '<?xml version="1.0" encoding="iso-8859-1"?><ROOT>';
        var XMLEstadoMensaje = '<?xml version="1.0" encoding="iso-8859-1"?><ROOT>';

        //Escalamiento
        var Bolsas = $("#ddlBolsasAsignadas option");
        if (Bolsas.length > 0) {
            var i;
            for (i = 0; i < Bolsas.length; i++) {
                XMLEscalamiento += '<BOLSA><IdBolsa>' + $(Bolsas[i]).val().split('-')[0].toString() + '</IdBolsa></BOLSA>';
            }
            XMLEscalamiento += '</TABLE>';
        } else {
            XMLEscalamiento += '';
        }

        //Tipificacion
        var vcTipi = gridTipificacion.getDataIDs();
        for (i = 0; i < vcTipi.length; i++) {
            var row = gridTipificacion.getRowData(vcTipi[i]);
            XMLTipificacion += '<DATA IdTipificacion=\"' + row["P_inCod"].toString() + '\" Nombre=\"' + row["Nombre"].toString() + '\" Descripcion=\"';
            XMLTipificacion += row["Descripcion"].toString() + '\" IdTipo=\"' + inIdTipo.toString() + '\" />';
        }
        XMLTipificacion += '</ROOT>';

        //Parámetros
        var vcPar = tbParametros.getDataIDs();
        //var row;
        for (i = 0; i < vcPar.length; i++) {
            row = tbParametros.getRowData(vcPar[i]);
            XMLParametros += '<DATA IdParametro=\"' + row["IdParametro"].toString() + '\" IdTipo=\"' + inIdTipo.toString() + '\" Clave=\"' + row["Clave"] + '\" Valor=\"' + row["IdCampo"] + '\" />';
        }
        XMLParametros += '</ROOT>';

        var vcEstados = Object.keys(arIncidencia.Estados);
        var i;
        for (i= 0; i < vcEstados.length; i++) {

            var inIdEst = arIncidencia.Estados[vcEstados[i]].Id;

            //Umbrales
            if (arIncidencia.Estados[vcEstados[i]].Id != 'PEN' && arIncidencia.Estados[vcEstados[i]].Id != 'AYU' && arIncidencia.Estados[vcEstados[i]].Id != 'ESC') {
                if (arIncidencia.Umbrales[vcEstados[i]].Umbral == "1") {
                    var EstadoInicial = arIncidencia.Umbrales[vcEstados[i]].EstadoInicial;
                    var EstadoFinal = arIncidencia.Umbrales[vcEstados[i]].EstadoFinal;
                    var ValorObjetivoDias = arIncidencia.Umbrales[vcEstados[i]].ValorObjetivo;
                    var ValorMaximoDias = arIncidencia.Umbrales[vcEstados[i]].ValorMaximo;
                    var Destinatarios = '', Asunto = '', MensajeUmbral = '';
                    var IdUmbral = arIncidencia.Umbrales[vcEstados[i]].IdUmbral;

                    if (arIncidencia.Umbrales[vcEstados[i]].EnviarCorreo == "1") {
                        Destinatarios = arIncidencia.Umbrales[vcEstados[i]].Destinatarios;
                        Asunto = arIncidencia.Umbrales[vcEstados[i]].Asunto;
                        MensajeUmbral = arIncidencia.Umbrales[vcEstados[i]].Mensaje;
                    }

                    XMLEstadoUmbral += '<DATA IdUmbral=\"' + IdUmbral + '\" IdTipo=\"' + inIdTipo + '\" CodEstadoInicial=\"' + EstadoInicial + '\" CodEstadoFinal=\"' + EstadoFinal;
                    XMLEstadoUmbral += '\" ValorObjetivoDias=\"' + ValorObjetivoDias + '\" ValorMaximoDias=\"' + ValorMaximoDias + '\" Destinatarios=\"' + Destinatarios;
                    XMLEstadoUmbral += '\" Asunto=\"' + Asunto + '\" Mensaje=\"' + MensajeUmbral + '\" />';
                }
            }

            var biEnviaCorreo = "0";
            biEnviaCorreo = arIncidencia.Estados[vcEstados[i]].EnviarCorreo;

            //Mensaje
            var inNumMen = 0;
            if (biEnviaCorreo == "1") {
                inNumMen = inNumMen + 1;
                var vcDestinatarios = ""; var vcAsunto = ""; var vcMensaje = "";
                vcDestinatarios = arIncidencia.Estados[vcEstados[i]].Destinatarios;
                vcAsunto = arIncidencia.Estados[vcEstados[i]].Asunto;
                vcMensaje = arIncidencia.Estados[vcEstados[i]].Mensaje;
                var Propietario = arIncidencia.Estados[vcEstados[i]].Propietario;
                var Tecnico = arIncidencia.Estados[vcEstados[i]].Tecnico;
                var IdMensaje = arIncidencia.Estados[vcEstados[i]].IdMensaje;

                XMLEstadoMensaje += "<DATA IdMensaje=\"" + IdMensaje + "\" IdTipo=\"" + inIdTipo + "\" CodEstado=\"" + inIdEst + "\" Destinatarios=\"" + vcDestinatarios + "\" Asunto=\"";
                XMLEstadoMensaje += vcAsunto.replace(/\"/g, '&quot;') + "\" Mensaje=\"" + vcMensaje.replace(/\"/g, '&quot;') + '\" Propietario=\"' + Propietario + '\" Tecnico=\"' + Tecnico + '\" />';
            }
        }
        XMLEstadoUmbral += '</ROOT>';
        XMLEstadoMensaje += '</ROOT>';
        $.ajax({
            type: "POST",
            url: "SOA_Mnt_Tipo.aspx/registrarTipo",
            data: "{'prIdTipo': '" + inIdTipo + "'," +
        "'prNombre': '" + $.trim($("#txtNombre").val()) + "'," +
        "'prDescripcion': '" + $.trim($("#txtDescripcion").val()) + "'," +
        "'prActivo': '" + biActivo + "'," +
        "'prMostrarCampanaActual': '" + chkCamAct + "'," +
        "'XML_Escalamiento': '" + XMLEscalamiento + "'," +
        "'XML_Tipificacion': '" + XMLTipificacion + "'," +
        "'XML_Parametros': '" + XMLParametros + "'," +
        "'XML_EstadoUmbral': '" + XMLEstadoUmbral + "'," +
        "'XML_EstadoMensaje': '" + XMLEstadoMensaje + "'," +
        "'prMostrarAdmin': '" + chkMosAdmin + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (resultado) {
                var resul = resultado.d;

                if (inIdTipo == "0") {
                    if (resul.split('-')[0] == "OK") {
                        Mensaje("<br/><h1>Tipo registrado</h1><br/>", document, fnReloadr);
                    }
                    else {
                        alerta(resul);
                    }
                    //Mensaje("<br/><h1>" + resul + "</h1><br/>", document);
                } else {
                    if (resul != "0" && resul != "-1") {
                        Mensaje("<br/><h1>Tipo actualizado</h1><br/>", document, CerroMensaje);
                    }
                    else {
                        alerta("Ya existe un tipo con el mismo nombre.");
                    }
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
}

function EditarTipo() {

//    if (validarTipo()) {
//        return;
//    }

//    var Bolsas = $("#ddlBolsasAsignadas option");

//    var XML = '<?xml version="1.0" encoding="iso-8859-1"?><TABLE>';

//    if (Bolsas.length == 0) {
//        XML = "";
//    }
//    else {
//        for (var i = 0; i < Bolsas.length; i++) {
//            XML = XML + '<BOLSA><IdBolsa>' + $(Bolsas[i]).val().split('-')[0].toString() + '</IdBolsa></BOLSA>';
//        }

//        XML = XML + '</TABLE>';
//    }

//    var cheek;
//    var chk = $("#chkMostrarCamActual").attr("checked");

//    if (chk == "checked") {
//        cheek = "true";
//    }
//    else {
//        cheek = "false";
//    }

//    var Activo;
//    if ($("#chkActivo").prop('checked')) {
//        Activo = 1;
//    }
//    else {
//        Activo = 0;
//    }

//    $.ajax({
//        type: "POST",
//        url: "SOA_Mnt_Tipo.aspx/actualizarTipo",
//        data: "{'prIdTipo': '" + $("#hdfIdTipo").val()+ "'," +
//        "'prNombre': '" + $.trim($("#txtNombre").val()) + "'," +
//        "'prDescripcion': '" + $.trim($("#txtDescripcion").val()) + "'," +
//        "'XML_Escalamiento': '" + XML + "'," +
//        "'prMostrarCampanaActual': '" + cheek + "'," +
//        "'prActivo': '" + Activo + "'}",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (resultado) {
//            var resul = resultado.d;
//            //alerta("Actualización exitosa")
//            Mensaje("<br/><h1>Tipo actualizado</h1><br/>", document, fnCerrar(true));
//            //window.location.href = "SOA_Mnt_Tipo.aspx?cod=" + $("#hdfIdTipo").val();

//        },
//        error: function (xhr, err, thrErr) {
//            MostrarErrorAjax(xhr, err, thrErr);
//        }
//    });

}

//------------------------------------------------------------------| GENERAL |-------------------------------------------------------------------//

function fnAgregarEstado(Valor, Nombre) {

    arIncidencia.Estados[Nombre] = [];

    arIncidencia.Estados[Nombre].Id = Valor;
    arIncidencia.Estados[Nombre].EnviarCorreo = '0';
    arIncidencia.Estados[Nombre].Destinatarios = '';
    arIncidencia.Estados[Nombre].Asunto = '';
    arIncidencia.Estados[Nombre].Mensaje = '';
    arIncidencia.Estados[Nombre].Propietario = '0';
    arIncidencia.Estados[Nombre].Tecnico = '0';
    arIncidencia.Estados[Nombre].IdMensaje = '0';

    //Umbrales Nuevo - 
    var EstIni = '';
    if (Valor == 'RES' || Valor == 'ANU' || Valor == 'DEV' || Valor == 'ATE') {
        EstIni = 'ACT';
    }
    else {
        EstIni = 'PEN';
    }

    if (Valor != 'PEN' && Valor != 'AYU' && Valor != 'ESC') {//7-Culminada 8-EnProceso 9-Anulada
        arIncidencia.Umbrales[Nombre] = [];
        arIncidencia.Umbrales[Nombre].Umbral = '0';
        arIncidencia.Umbrales[Nombre].EstadoInicial = EstIni;
        arIncidencia.Umbrales[Nombre].EstadoFinal = Valor;
        arIncidencia.Umbrales[Nombre].ValorObjetivo = '';
        arIncidencia.Umbrales[Nombre].ValorMaximo = '';
        arIncidencia.Umbrales[Nombre].EnviarCorreo = '';
        arIncidencia.Umbrales[Nombre].Destinatarios = '';
        arIncidencia.Umbrales[Nombre].Asunto = '';
        arIncidencia.Umbrales[Nombre].Mensaje = '';
        arIncidencia.Umbrales[Nombre].IdUmbral = '0';
    }
}
function FocusAlert(IndexAccordion, IndexTab, Control) {
    if ($("#AccordionJQ1").accordion("option", "active").toString() == "false") {
        $("#AccordionJQ1").accordion("option", "active", IndexAccordion);
    } else {
        if ($("#AccordionJQ1").accordion("option", "active") != IndexAccordion){
            $("#AccordionJQ1").accordion("option", "active", IndexAccordion);
            }
    }
    if (IndexTab.tostring != "") {
        if (IndexAccordion == '3') {
            $("#tabEstados").tabs('option', 'selected', IndexTab);
        }
    }
    if (Control != "") {
        $(Control).focus();
    }
}

//------------------------------------------------------------------------------------------------------------------------------------------------>>


//----------------------------------------------------------------| TIPIFICACIÓN |----------------------------------------------------------------//

function fnAgregarTipificacion() {
    var vcNombre = $.trim($("#txtNombreTipificacion").val());
    var vcDescripcion = $.trim($("#txtDescripcionTipificacion").val());
    var datos = { 
        P_inCod: 0,
        Nombre: vcNombre,
        Descripcion: vcDescripcion,
        IdTipo: inIdTipo,
        inNumTic: 0
    };

    gridTipificacion.jqGrid('addRowData', inRow, datos);
    gridTipificacion.trigger("reloadGrid");

    //arIncidencia.Tipificacion[vcNombre] = { IdTipificacion: 0, Nombre: vcNombre, Descripcion: vcDescripcion, inNumTic: 0};

    inRow = inRow + 1;
}
function fnEditarTipificacion() {
    var vcNombre = $.trim($("#txtNombreTipificacion").val());
    var vcDescripcion = $.trim($("#txtDescripcionTipificacion").val());
    var row = $("#gridTipificacion").jqGrid('getRowData', inIdTipificacion);

    var datos = {
        P_inCod: row.P_inCod,
        Nombre: vcNombre,
        Descripcion: vcDescripcion,
        IdTipo: inIdTipo,
        inNumTic: row.inNumTic
    };

    gridTipificacion.jqGrid('setRowData', inIdTipificacion, datos);
    gridTipificacion.trigger("reloadGrid");
    //arIncidencia.Tipificacion[vcNombre] = { IdTipificacion: row.P_inCod, Nombre: row.Nombre, Descripcion: row.Descripcion, inNumTic: row.inNumTic };
}
function fnQuitarTipificacion() {

    var id = $("#gridTipificacion").jqGrid('getGridParam', 'selrow');
    var row = $("#gridTipificacion").jqGrid('getRowData', id);

    if (id) {
        if (row.inNumTic == "0") {
            gridTipificacion.delRowData(id);
        } else {
            alerta("La tipificación seleccionada no puede ser eliminada porque existen incidencias relacionados a ésta.");
            return;
        }
    } else {
        alerta("Seleccione una tipificación.");
        return;
    }
}
function fnCancelarTipificacion() {
    fnLimpiarControlesTipificacion();
}
function fnValidarTipificacion() {
    var blnResultado = true;

    if ($.trim($("#txtNombreTipificacion").val()) == "") {
        alerta("El nombre es requerido.");
        $("#txtNombreTipificacion").focus();
        blnResultado = false;
    }
    else if ($.trim($("#txtDescripcionTipificacion").val()) == "") {
        alerta("La descripción es requerida.");
        $("#txtDescripcionTipificacion").focus();
        blnResultado = false;
    } else {
        var vcNombre = $("#txtNombreTipificacion").val();
        var ids = gridTipificacion.getDataIDs();
        var biExiste = 0;
        for (i = 0; i < ids.length; i++) {
            if ((gridTipificacion.getRowData(ids[i]))["Nombre"] == vcNombre && ids[i] != inIdTipificacion) {
                biExiste = 1;
            }
        }
        if (biExiste == 1) {
            alerta("Ya existe una tipificación con el mismo nombre.");
            $("#txtNombreTipificacion").focus();
            blnResultado = false;
        }
    }

    return blnResultado;
}
function fnLimpiarControlesTipificacion() {
    $("#txtNombreTipificacion").val("");
    $("#txtDescripcionTipificacion").val("");
    inIdTipificacion = 0;

    fnActualizarBotonesTipificacion("Agregar");
}
function fnActualizarBotonesTipificacion(vcAccion) {
    if (vcAccion == "Agregar") {
        $("#imgAgregarTipificacion").attr('src', '../../Common/Images/Mantenimiento/add_16x16.gif');
        $("#lblAgregarTipificacion").text("Agregar");
        $("#imgQuitarTipificacion").attr('src', '../../Common/Images/Mantenimiento/Quitar.png');
        $("#lblQuitarTipificacion").text("Quitar");
    } else if (vcAccion == "Actualizar") {
        $("#imgAgregarTipificacion").attr('src', '../../Common/Images/Mantenimiento/Guardar.png');
        $("#lblAgregarTipificacion").text("Actualizar");
        $("#imgQuitarTipificacion").attr('src', '../../Common/Images/Mantenimiento/Salir.gif');
        $("#lblQuitarTipificacion").text("Cancelar");
    }
}
function fnValidarValoresSemaforos(txtValor) {
    if ($("#txtValorObjetivo").val() != "" && $("#txtValorMaximo").val() != "") {
        if (parseInt($("#txtValorObjetivo").val()) > parseInt($("#txtValorMaximo").val()) || parseInt($("#txtValorObjetivo").val()) == parseInt($("#txtValorMaximo").val())) {
            alerta("El valor objetivo debe ser menor al valor máximo.");
            $(txtValor).val("");
            return;
        }
    }
}

//------------------------------------------------------------------------------------------------------------------------------------------------>>


//-----------------------------------------------------------------| PARÁMETROS |-----------------------------------------------------------------//

function fnEditarParametro(Clave, IdCampo, Valor) {
    alerta("Si va a modificar parámetros, deberá revisar la edición de mensajes y actualizar los parámetros manualmente");
    valRowParametro = IdCampo;
    $("#imgAgregarParametro").attr('src', '../../Common/Images/Mantenimiento/Guardar.png');
    $("#lblBotonAgregarParametro").text("Actualizar");
    $("#imgQuitarParametro").attr('src', '../../Common/Images/Mantenimiento/Salir.gif');
    $("#lblBotonQuitarParametro").text("Cancelar");
    $("#txtClave").val(Clave);
    $("#ddlValor").val(IdCampo);
    $("#txtClave").attr("disabled", false);
    $("#txtClave").removeClass("txtBusqueda");
    $("#ddlValor").prop("disabled", true);
}
function fnCancelarEdicionParametro() {
    $("#imgAgregarParametro").attr('src', '../../Common/Images/Mantenimiento/add_16x16.gif');
    $("#lblBotonAgregarParametro").text("Agregar");
    $("#imgQuitarParametro").attr('src', '../../Common/Images/Mantenimiento/Quitar.png');
    $("#lblBotonQuitarParametro").text("Quitar");
    $("#txtClave").val('');
    $("#ddlValor").val("-1");
    $("#ddlValor").prop("disabled", false);
}
function fnAgregarEditarParametro() {
    var textoAgregarParam = $("#lblBotonAgregarParametro").text();
    var vcClave = $.trim($("#txtClave").val());

    if (vcClave == "") {
        alerta("La clave es requerida.");
        return;
    }
    if ($("#ddlValor").val() == "-1") {
        alerta("El campo es requerido.");
        return;
    }
    if (vcClave.substr(0, 1) != "{" || vcClave.substr(vcClave.length - 1, 1) != "}") {
        alerta("La clave debe comenzar con '{' y terminar con '}'");
        return;
    }

    var ids = tbParametros.getDataIDs();
    var biExiste = 0;
    var inId = 0;
    for (i = 0; i < ids.length; i++) {
        if (((tbParametros.getRowData(ids[i]))["Clave"] == vcClave) || ((tbParametros.getRowData(ids[i]))["IdCampo"] == $("#ddlValor").val())) {
            biExiste = 1;
        }
    }
    if (textoAgregarParam != "Agregar") { biExiste = 0; }
    if (biExiste == 0) {
        var datos = { Clave: vcClave,
            IdCampo: $("#ddlValor").val(),
            vcCampo: $("#ddlValor option:selected").text()
        };
        if (textoAgregarParam == 'Agregar') { //agregar nuevo
            tbParametros.jqGrid('addRowData', $("#ddlValor").val(), datos);
            tbParametros.trigger("reloadGrid");
        } else { //editar
            tbParametros.jqGrid('setRowData', valRowParametro, datos);
            fnCancelarEdicionParametro();
        }
        $("#txtClave").val("");
        $("#ddlValor").val("-1");
        $("#txtClave").focus();
    } else {
        alerta("Los parámetros deben ser únicos para claves y campos.");
        $("#txtClave").focus();
    }
}
function fnQuitarParametro(){
    var textoQuitarParam = $("#lblBotonQuitarParametro").text();
    if (textoQuitarParam == "Quitar") {
        if (tbParametros.getGridParam('selrow')) {
            tbParametros.delRowData(tbParametros.getGridParam('selrow'));
        } else {
            alerta("Debe seleccionar una fila");
        }
    } else {
        fnCancelarEdicionParametro();
    }
}

//------------------------------------------------------------------------------------------------------------------------------------------------>>


//----------------------------------------------------------| CONFIGURACIÓN DE ESTADOS |----------------------------------------------------------//

function fnValidarEnvioCorreo() {
    if ($("#chkEnviarCorreo").is(":checked")) {
        fnHabilitarControlesMensaje();
    }
    else {
        if (vcTabSel == "tabMensaje") {
            $("#tabEstados").tabs('option', 'selected', 0);
        }
        fnDeshabilitarControlesMensaje();
    }
}
function fnDeshabilitarControlesMensaje() {
    $("#txtCorreo").attr("disabled", "disabled");
    $("#txtAsunto").attr("disabled", "disabled");
    $("#txtMensaje").attr("disabled", "disabled");

    $("#tabEstados").tabs("option", "disabled", [1]);
}
function fnHabilitarControlesMensaje() {
    $("#txtCorreo").removeAttr("disabled");
    $("#txtAsunto").removeAttr("disabled");
    $("#txtMensaje").removeAttr("disabled");

    $("#tabEstados").tabs("option", "disabled", []);
}
function fnValidarUmbral() {
    if ($("#chkUmbral").is(":checked")) {
        $("#dvValorUmbral").show();
    } else {
        $("#dvValorUmbral").hide();
    }
}
function fnValidarIngresoUmbrales(Umbral, ValorObjetivo, ValorMaximo, EnvioCorreo, Destinatarios, Asunto, Mensaje) {
    var resultado = '';
    if ($("input[name=" + Umbral + "]").is(":checked")) {
        if ($(ValorObjetivo).val() == '') {
            alerta("Debe ingresar un 'Valor Objetivo' para el umbral");
            $(ValorObjetivo).focus();
            resultado = ValorObjetivo;
        } else if ($(ValorMaximo).val() == '') {
            alerta("Debe ingresar un 'Valor Máximo' para el umbral");
            $(ValorMaximo).focus();
            resultado = ValorMaximo;
        } else if ($("input[name=" + EnvioCorreo + "]").is(":checked")) {
            if ($(Asunto).val() == '') {
                alerta("Debe ingresar un 'Asunto' para el correo del umbral");
                $(Asunto).focus();
                resultado = Asunto;
            } else if ($(Mensaje).val() == '') {
                alerta("Debe ingresar un 'Mensaje' para el correo del umbral");
                $(Mensaje).focus();
                resultado = Mensaje;
            }
        }
    }
    return resultado;
}
function fnActualizarEtiquetasSemaforos() {
    var vcTexto1 = "# Días Solicitud <= {Valor Objetivo}";
    var vcTexto2 = "{Valor Objetivo} < # Días Solicitud <= {Valor Máximo}";
    var vcTexto3 = "# Días Solicitud > {Valor Máximo}";
    var vcValObj = "{Valor Objetivo}";
    var vcValMax = "{Valor Máximo}";

    if ($("#txtValorObjetivo").val() != "") {
        vcValObj = $("#txtValorObjetivo").val();
    }
    if ($("#txtValorMaximo").val() != "") {
        vcValMax = $("#txtValorMaximo").val();
    }

    $("#lblSemaforo1").text(vcTexto1.replace("{Valor Objetivo}", vcValObj));
    $("#lblSemaforo2").text(vcTexto2.replace("{Valor Objetivo}", vcValObj).replace("{Valor Máximo}", vcValMax));
    $("#lblSemaforo3").text(vcTexto3.replace("{Valor Máximo}", vcValMax));
}
function fnMostrarDestinatarios() {
    if ($("#ddlEstado").val() == 'PEN') {
        $("#chkPropietarioCor").prop('disabled', false);
        $("#chkTecnicoCor").prop('disabled', true);
    } else if ($("#ddlEstado").val() == 'AYU') {
        $("#chkPropietarioCor").prop('disabled', true);
        $("#chkTecnicoCor").prop('disabled', false);
    } else {
        $("#chkPropietarioCor").prop('disabled', false);
        $("#chkTecnicoCor").prop('disabled', false);
    }
}
function fnActualizarNotaMensaje(vcNomEst) {
    if (arIncidencia.Estados[vcNomEst].Id == biPrimerEst) { //Estado PEN 'Pendiente'
        $("#lblEnvioDeCorreo").html("Este mensaje será enviado cada vez que se cree una incidencia.");
    }
    else {
        $("#lblEnvioDeCorreo").html("Este mensaje será enviado cada vez que una incidencia se encuentre en el estado: '" + vcNomEst + "'.");
    }
}
function fnValidarIngresoMensajes(EnvioCorreo, Destinatarios, Propietario, Tecnico, Asunto, Mensaje) {
    var resultado = '';
    if ($(EnvioCorreo).is(":checked")) {
        if ($(Destinatarios).val() == "" && !$("input[name=" + Propietario + "]").is(":checked") && !$("input[name=" + Tecnico + "]").is(":checked")) {
            alerta("Debe ingresar por lo menos un Correo o seleccionar por lo menos un Usuario");
            $(Destinatarios).focus();
            resultado = Destinatarios;
        } else if ($(Asunto).val() == "") {
            alerta("Debe ingrasar un Asunto para el correo");
            $(Asunto).focus();
            resultado = Asunto;
        } else if ($(Mensaje).val() == "") {
            alerta("Debe ingresar un Mensaje para el correo");
            $(Mensaje).focus();
            resultado = Mensaje;
        }
    }
    return resultado;
}
function fnActualizaArrayPorEstado(vcNomEst) {

    //Validaciones iniciales
    var rptaUmbral = fnValidarIngresoUmbrales("chkUmbral", "#txtValorObjetivo", "#txtValorMaximo", "chkEnviarCorreoUmb", "#txtCorreoUmb", "#txtAsuntoUmb", "#txtMensajeUmb");
    if (rptaUmbral != '') {
        FocusAlert(3, 0, rptaUmbral);
        return;
    }
    var rptaMensaje = fnValidarIngresoMensajes("#chkEnviarCorreo", "#txtCorreo", "chkPropietarioCor", "chkTecnicoCor", "#txtAsunto", "#txtMensaje");
    if (rptaMensaje != '') {
        FocusAlert(3, 1, rptaMensaje);
        return;
    }

    var vcEstados = Object.keys(arIncidencia.Estados);

    for (i = 0; i < vcEstados.length; i++) {
        var biEnvCorUmb = "0", biUmbral = "0";
        if ($('input[name=chkEnviarCorreoUmb]').is(':checked')) {
            biEnvCorUmb = "1";
        }
        if ($("#chkUmbral").is(":checked")) {
            biUmbral = "1";
        }

        if (arIncidencia.Estados[vcEstados[i]].Id != 'PEN' && arIncidencia.Estados[vcEstados[i]].Id != 'AYU' && arIncidencia.Estados[vcEstados[i]].Id != 'ESC') {
            if (arIncidencia.Estados[vcNomEst].Id == arIncidencia.Umbrales[vcEstados[i]].EstadoInicial) {
                arIncidencia.Umbrales[vcEstados[i]].Umbral = biUmbral;
                arIncidencia.Umbrales[vcEstados[i]].ValorObjetivo = $("#txtValorObjetivo").val();
                arIncidencia.Umbrales[vcEstados[i]].ValorMaximo = $("#txtValorMaximo").val();
                arIncidencia.Umbrales[vcEstados[i]].EnviarCorreo = biEnvCorUmb;
                arIncidencia.Umbrales[vcEstados[i]].Destinatarios = $("#txtCorreoUmb").val();
                arIncidencia.Umbrales[vcEstados[i]].Asunto = $("#txtAsuntoUmb").val();
                arIncidencia.Umbrales[vcEstados[i]].Mensaje = $("#txtMensajeUmb").val().replace(/\n/g, '///').replace(/\n/g, '///').replace(/\n/g, '///');
            }
        }

        if (vcEstados[i] == vcNomEst) {
            
            //Mensajes
            var biEnvCor = "0", biPro = "0", biUsuEsp = "0", biAre = "0", biTec = "0";
            if ($('input[name=chkEnviarCorreo]').is(':checked')) {
                biEnvCor = "1";
            }

            arIncidencia.Estados[vcEstados[i]].EnviarCorreo = biEnvCor;
            arIncidencia.Estados[vcEstados[i]].Destinatarios = $.trim($("#txtCorreo").val());
            arIncidencia.Estados[vcEstados[i]].Asunto = $.trim($("#txtAsunto").val());
            arIncidencia.Estados[vcEstados[i]].Mensaje = $.trim($("#txtMensaje").val()).replace(/\n/g, '///').replace(/\n/g, '///').replace(/\n/g, '///');

            if ($('input[name=chkPropietarioCor]').is(':checked')) {
                biPro = "1";
            }
            if ($('input[name=chkUsuarioEspecificoCor]').is(':checked')) {
                biUsuEsp = "1";
            }
            if ($('input[name=chkAreaCor]').is(':checked')) {
                biAre = "1";
            }
            if ($('input[name=chkTecnicoCor]').is(':checked')) {
                biTec = "1";
            }
            arIncidencia.Estados[vcEstados[i]].Propietario = biPro;
            arIncidencia.Estados[vcEstados[i]].UsuarioEspecifico = biUsuEsp;
            arIncidencia.Estados[vcEstados[i]].Responsable = biAre;
            arIncidencia.Estados[vcEstados[i]].Tecnico = biTec;
        }
    }
}
function fnActualizaControlesPorEstado(vcNomEst) {
    var vcEstados = Object.keys(arIncidencia.Estados);
    var vcReplace = '///';


    for (i = 0; i < vcEstados.length; i++) {

        //Umbrales Nuevo
        if (arIncidencia.Estados[vcEstados[i]].Id != 'PEN' && arIncidencia.Estados[vcEstados[i]].Id != 'AYU' && arIncidencia.Estados[vcEstados[i]].Id != 'ESC') {//Estado 8-proceso 7-'Culminada', 9-'Anulada'
            if (arIncidencia.Estados[vcNomEst].Id == arIncidencia.Umbrales[vcEstados[i]].EstadoInicial) {
                if (arIncidencia.Umbrales[vcEstados[i]].Umbral == "1") {
                    $('input[name=chkUmbral]').attr('checked', true);
                    $("#dvValorUmbral").show();
                } else {
                    $('input[name=chkUmbral]').attr('checked', false);
                    $("#dvValorUmbral").hide();
                }
                $("#txtValorObjetivo").val(arIncidencia.Umbrales[vcEstados[i]].ValorObjetivo);
                $("#txtValorMaximo").val(arIncidencia.Umbrales[vcEstados[i]].ValorMaximo);
                if (arIncidencia.Umbrales[vcEstados[i]].EnviarCorreo == "1") {
                    $('input[name=chkEnviarCorreoUmb]').attr('checked', true);
                    $("#dvMensajeUmb").show();
                } else {
                    $('input[name=chkEnviarCorreoUmb]').attr('checked', false);
                    $("#dvMensajeUmb").hide();
                }
                $("#txtCorreoUmb").val(arIncidencia.Umbrales[vcEstados[i]].Destinatarios);
                $("#txtAsuntoUmb").val(arIncidencia.Umbrales[vcEstados[i]].Asunto);
                //$("#txtMensajeUmb").val(arIncidencia.Umbrales[vcEstados[i]].Mensaje.replace('///', '\n'));
                $("#txtMensajeUmb").val(arIncidencia.Umbrales[vcEstados[i]].Mensaje.replace(new RegExp(vcReplace, 'g'), '\n'));
            }
        }

        if (vcEstados[i] == vcNomEst) {
            
            //Umbrales
            if (arIncidencia.Estados[vcNomEst].Id == 'PEN' || arIncidencia.Estados[vcNomEst].Id == 'ACT') {//Estado proceso 6-'Pendiente', 8-'Proceso'
                $("#chkUmbral").prop('disabled', false);
            } else {
                $("#chkUmbral").prop('disabled', true);
                $('input[name=chkUmbral]').attr('checked', false);
                $("#dvValorUmbral").hide();
            }
            if (arIncidencia.Estados[vcNomEst].Id == 'PEN') {
                $("#msjUmbPendiente").show();
                $("#msjUmbActivo").hide();
                $("#msjUmbSinUmbral").hide();
            } else if (arIncidencia.Estados[vcNomEst].Id == 'ACT') {
                $("#msjUmbPendiente").hide();
                $("#msjUmbActivo").show();
                $("#msjUmbSinUmbral").hide();
            } else {
                $("#msjUmbPendiente").hide();
                $("#msjUmbActivo").hide();
                $("#msjUmbSinUmbral").show();
                $("#msjUmbSinUmbral").html("El estado " + vcNomEst + " no tiene umbral.");
            }

            //Mensajes
            fnMostrarDestinatarios();
            fnActualizarNotaMensaje(vcNomEst);

            var vcMensaje = "";
            if (arIncidencia.Estados[vcEstados[i]].EnviarCorreo == '1') {
                $('input[name=chkEnviarCorreo]').attr('checked', true);
            } else {
                $('input[name=chkEnviarCorreo]').attr('checked', false);
            }
            $('#txtCorreo').val(arIncidencia.Estados[vcEstados[i]].Destinatarios);
            $('#txtAsunto').val(arIncidencia.Estados[vcEstados[i]].Asunto);
            vcMensaje = arIncidencia.Estados[vcEstados[i]].Mensaje.replace(new RegExp(vcReplace, 'g'), '\n');
            $('#txtMensaje').val(vcMensaje);

            if (arIncidencia.Estados[vcEstados[i]].Propietario == '1') {
                $('input[name=chkPropietarioCor]').attr('checked', true);
            }
            else {
                $('input[name=chkPropietarioCor]').attr('checked', false);
            }
            if (arIncidencia.Estados[vcEstados[i]].Tecnico == '1') {
                $('input[name=chkTecnicoCor]').attr('checked', true);
            }
            else {
                $('input[name=chkTecnicoCor]').attr('checked', false);
            }
        }

        if ($("#chkEnviarCorreo").is(":checked")) {
            fnHabilitarControlesMensaje();
        }
        else {
            if (vcTabSel == "tabMensaje") {
                $("#tabEstados").tabs('option', 'selected', 0);
            }
            fnDeshabilitarControlesMensaje();
        }
    }

    //Mensajes
}
//------------------------------------------------------------------------------------------------------------------------------------------------>>
function fnValidarTipo() {
    var rptaUmbral = fnValidarIngresoUmbrales("chkUmbral", "#txtValorObjetivo", "#txtValorMaximo", "chkEnviarCorreoUmb", "#txtCorreoUmb", "#txtAsuntoUmb", "#txtMensajeUmb");
    var rptaMensaje = fnValidarIngresoMensajes("#chkEnviarCorreo", "#txtCorreo", "chkPropietarioCor", "chkTecnicoCor", "#txtAsunto", "#txtMensaje");
    var blnResultado = true;

    if ($.trim($("#txtNombre").val()) == "") {
        alerta("Debe ingresar nombre de tipo.");
        FocusAlert(0, '', "#txtNombre");
        blnResultado = false;
    } else if ($.trim($("#txtDescripcion").val()) == "") {
        alerta("Debe ingresar descripción de tipo.");
        FocusAlert(0, '', "#txtDescripcion");
        blnResultado = false;
    } else if ($("#ddlBolsasAsignadas option").length < 1) {
        alerta("Debe elegir por lo menos un canal de atención");
        FocusAlert(0, '', "#ddlBolsasAsignadas");
        blnResultado = false;
    } else if (gridTipificacion.getDataIDs().length == 0) {
        alerta("Debe ingresar por lo menos una tipificación.");
        FocusAlert(1, '', "#txtNombreTipificacion");
        blnResultado = false;
    } else if (rptaUmbral != '') {
        //alerta("Debe ingresar por lo menos una tipificación.");
        FocusAlert(3, 0, rptaUmbral);
        blnResultado = false;
    } else if (rptaMensaje != '') {
        FocusAlert(3, 1, rptaMensaje);
        blnResultado = false;
    }
    return blnResultado;
}
function ListarBolsasPorAsignar() {

//    $.ajax({
//        type: "POST",
//        url: "SOA_Mnt_Bolsas.aspx/ListarBolsa_porNivelExacto",
//        data: "{'prIdNivel': '1'}",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (resultado) {
//            var resul = resultado.d;
//            $("#ddlBolsasParaAsignar").html("");
//            for (var i = 0; i < resul.length; i++) {
//                var existe = false;
//                for (var n = 0; n < $("#ddlBolsasAsignadas option").length; n++) {
//                    if (resul[i].IdBolsa.toString() == $($("#ddlBolsasAsignadas option")[n]).val().split('-')[0]) {
//                        existe = true;
//                        break;
//                    }
//                }
//                if (existe) {
//                    continue;
//                }
//                $("#ddlBolsasParaAsignar").append("<option value='" + resul[i].IdBolsa.toString() + "-" + resul[i].IdNivel.toString() + "' >" + resul[i].Nombre.toString() + "</option>");
//            }

//        },
//        error: function (xhr, err, thrErr) {
//            MostrarErrorAjax(xhr, err, thrErr);
//        }
//    });

}
function agregarBolsaEscalar() {
    if ($("#ddlBolsasParaAsignar option:selected").length > 0) {
        if ($("#ddlBolsasAsignadas option").length >= 1) {
            alerta("Sólo puede seleccionar un canal de atencion para el tipo de incidencia");
        }
        else {
            $("#ddlBolsasAsignadas").append("<option value='" + $("#ddlBolsasParaAsignar").val().toString() + "'>" + $("#ddlBolsasParaAsignar option:selected").text().toString() + "</option>");
            $("#ddlBolsasParaAsignar option[value=" + $("#ddlBolsasParaAsignar").val() + "]").remove();
        }
    }
}
function removerBolsaEscalar() {
    if ($("#ddlBolsasAsignadas option:selected").length > 0) {
        if (inIdTipo != '0') {
            ValidarTickets_X_Bolsa($("#ddlBolsasAsignadas option:selected").val().split('-')[0].toString());
        } else {
            $("#ddlBolsasParaAsignar").append("<option value='" + $("#ddlBolsasAsignadas").val().toString() + "'>" + $("#ddlBolsasAsignadas option:selected").text().toString() + "</option>");
            $("#ddlBolsasAsignadas option[value=" + $("#ddlBolsasAsignadas").val() + "]").remove();
        }
    } else {
        alerta("Seleccione una bolsa a eliminar.");
        return;
    }
}

function CerroMensaje() {
    BloquearPagina(false);
    window.parent.ActualizarGrilla();
    window.parent.tab.tabs("remove", indiceTab);    
}

function fnReload() {
    //window.location.href = "SOA_Mnt_Tipo.aspx?cod=" + $("#hdfIdTipo").val();
}

function fnReloadr() {
    window.parent.ActualizarGrilla();
    window.location.reload();
}

function fnLimpiar() {

//    $("#txtNombre,#txtDescripcion").val("");
//    load();
//    $("#txtNombre").focus();

}

function ValidarTickets_X_Bolsa(idBolsa) {
    $.ajax({
        type: "POST",
        url: "SOA_Mnt_Tipo.aspx/ValidarTickets_X_Bolsa",
        data: "{'prIdBolsa': '" + idBolsa + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;
            if (resul == "0") {
                $("#ddlBolsasParaAsignar").append("<option value='" + $("#ddlBolsasAsignadas").val().toString() + "'>" + $("#ddlBolsasAsignadas option:selected").text().toString() + "</option>");
                $("#ddlBolsasAsignadas option[value=" + $("#ddlBolsasAsignadas").val() + "]").remove();
            } else {
                alerta("No puede eliminar la bolsa seleccionada por que ya cuenta tickets asociados.");
                return;
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}