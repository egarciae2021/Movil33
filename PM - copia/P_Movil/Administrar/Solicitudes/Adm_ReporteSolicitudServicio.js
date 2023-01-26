var arNombAdj = new Array;
var arTamAdj = new Array;

$(function () {

    BuscarGrilla();
    $(".btnNormal").button();

    $("#tbSolicitud").tabs();

    if ($("#hdfTipSol").val() == '6') {
        $("#tbSolicitud").tabs("option", "selected", [0]);
        $("#tbSolicitud").tabs("option", "disabled", [1]);
    }
    if ($("#hdfTipSol").val() == '7') {
        $("#tbSolicitud").tabs("option", "selected", [1]);
        $("#tbSolicitud").tabs("option", "disabled", [0]);
    }
    //var intabs = $("#tbSolicitud").tabs({});
    //$("#btnEnviarSol").button();

    $("#btnEnviarSol").click(function () {
        var $width = 490;
        var $height = 350;
        Modal = $('#dvEnviarReporte').dialog({
            title: "Enviar Reporte",
            width: $width,
            //height: $height,
            modal: true,
            resizable: false,
            close: function (ev, ui) { deshacerMostrarAdjuntos(); }
        });
        $("#txtAsunto").focus();
        $("#hdfTipo").val();
        mostrarAdjuntos();
    });

    $("#btnSalir").click(function () {
        EliminarTemporales();
        Salir();
    });

    $(".txtFecha").datepicker({
        changeMonth: true,
        changeYear: true
    });
    $("#imgBorrarFechaInicio").click(function () {
        $("#txtFechaInicio").val("");
        BuscarGrilla();
    });
    $("#imgBorrarFechaFin").click(function () {
        $("#txtFechaFin").val("");
        BuscarGrilla();
    });
    $("#txtFechaInicio,#txtFechaFin").change(function () {
        BuscarGrilla();
    });
    //$("#ddlEstado,#ddlTipo").change(function () {
    //    BuscarGrilla();
    //});

    function BuscarGrilla() {
        //$("#ifReporteSolicitud").attr("src", "../Adm_Reporte.aspx?vcTab=" + $("#hdfTabSolicitud").val() + "&vcTipRep=" + $("#hdfTipoReporte").val() + "&daFecIni=" + $("#txtFechaInicio").val() + "&daFecFin=" + $("#txtFechaFin").val() + "&inEst=" + $("#ddlEstado").val() + "&inTipSol=" + $("#ddlTipo").val());
        if ($("#hdfTipSol").val() == '') {
            $("#ifReporteSolAmpliacion").attr("src", "../Adm_Reporte.aspx?vcTab=" + $("#hdfvcTab").val() + "&vcTipRep=" + $("#hdfTipRepAmp").val() + "&daFecIni=" + $("#txtFechaInicio").val() + "&daFecFin=" + $("#txtFechaFin").val() + "&est=" + $("#hdfEstadoSolicitud").val() + "&env=" + $("#hdfEstadoEnviado").val() + "&arcod=" + $("#hdfArCodigo").val());
            $("#IfReporteSolActivacion").attr("src", "../Adm_Reporte.aspx?vcTab=" + $("#hdfvcTab").val() + "&vcTipRep=" + $("#hdfTipRepAct").val() + "&daFecIni=" + $("#txtFechaInicio").val() + "&daFecFin=" + $("#txtFechaFin").val() + "&est=" + $("#hdfEstadoSolicitud").val() + "&env=" + $("#hdfEstadoEnviado").val() + "&arcod=" + $("#hdfArCodigo").val());
        } else if ($("#hdfTipSol").val() == '6') {
            $("#IfReporteSolActivacion").attr("src", "../Adm_Reporte.aspx?vcTab=" + $("#hdfvcTab").val() + "&vcTipRep=" + $("#hdfTipRepAct").val() + "&daFecIni=" + $("#txtFechaInicio").val() + "&daFecFin=" + $("#txtFechaFin").val() + "&est=" + $("#hdfEstadoSolicitud").val() + "&env=" + $("#hdfEstadoEnviado").val() + "&arcod=" + $("#hdfArCodigo").val());
        } else if ($("#hdfTipSol").val() == '7') {
            $("#ifReporteSolAmpliacion").attr("src", "../Adm_Reporte.aspx?vcTab=" + $("#hdfvcTab").val() + "&vcTipRep=" + $("#hdfTipRepAmp").val() + "&daFecIni=" + $("#txtFechaInicio").val() + "&daFecFin=" + $("#txtFechaFin").val() + "&est=" + $("#hdfEstadoSolicitud").val() + "&env=" + $("#hdfEstadoEnviado").val() + "&arcod=" + $("#hdfArCodigo").val());
        }
    }

    ///dialog enviar
    $("#rlstTipoDeEnvio").change(function () {
        if ($("input[name='rlstTipoDeEnvio']:checked").val() == "1") {
            $("#dvCorreo").hide(100);
        }
        else if ($("input[name='rlstTipoDeEnvio']:checked").val() == "2") {
            $("#dvCorreo").show(100);
        }
        else if ($("input[name='rlstTipoDeEnvio']:checked").val() == "3") {
            $("#dvCorreo").show(100);
        }
    });

    $("#btnEnvioCorreo").click(function () {
        if ($("input[name='rlstTipoDeEnvio']:checked").val() == "1") {
            //DescargarArchivos();
            alerta("funcionalidad no implementada");
        }
        else if ($("input[name='rlstTipoDeEnvio']:checked").val() == "2") {
            GuardarEnvioCorreo();
        }
        else if ($("input[name='rlstTipoDeEnvio']:checked").val() == "3") {
            //DescargarArchivos();
            //GuardarEnvioCorreo();
            alerta("funcionalidad no implementada");
        }
    });

});

function recibirAdjuntos(nombre, tamano) {
    arNombAdj.push(nombre);
    arTamAdj.push(tamano);
    $("#hdfArchivosAdj").val(arNombAdj.join(','));
}

function mostrarAdjuntos() {
    var numadj = arNombAdj.length;
    var i = 0;
    for (i = 0; i < numadj; i++) {
        $("#dvAdjuntos").append('<div id="div-' + i + '">' + arNombAdj[i] + '</div>');
    }
}

function deshacerMostrarAdjuntos() {
    $("#dvAdjuntos").empty();
}

function Salir() {
    var tab1 = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
    var Accord = window.parent.$("#" + tab1);
    var tab = "tbRptSolicitudServicio";
    var Id = "#" + tab;
    var indice = Accord.tabs("option", "selected");
    Accord.tabs("remove", indice);
    //$(indice).tabs("destroy");
    //    var indiceTab = window.parent.tab.tabs("option", "selected");
    //    window.parent.tab.tabs("remove", indiceTab);
    //    window.document.location.reload();
}

function EliminarTemporales() {
    var aradjdel = arNombAdj.join(',');
    $.ajax({
        type: "POST",
        url: "Adm_ReporteSolicitudServicio.aspx/EliminarTemporales",
        data: "{'adj': '" + aradjdel + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    });
}

function ValidarEnvio() {
    if ($("input[name='rlstTipoDeEnvio']:checked").val() == "2" || $("input[name='rlstTipoDeEnvio']:checked").val() == "3") {
        if ($("#txtAsunto").val() == "") {
            alerta("Ingrese un asunto para el envío del correo");
            $("#txtAsunto").focus();
            return false;
        }
        if ($("#txtCorreo").val() == "") {
            alerta("Ingrese un correo");
            $("#txtCorreo").focus();
            return false;
        }
        if (!validarEmail2($("#txtCorreo").val())) {
            alerta("Ingrese un correo válido");
            $('#txtCorreo').focus();
            return false;
        }
    }
    return true;
}

function GuardarEnvioCorreo() {
    if (ValidarEnvio()) {
        var mailto = $("#txtCorreo").val();
        var mailfrom = '';
        var asunto = $("#txtAsunto").val();
        var descripcion = $("#txtCuerpo").val();
        var aradj = arNombAdj.join(',');
        $.ajax({
            type: "POST",
            url: "Adm_ReporteSolicitudServicio.aspx/InsetarEnvioCorreo",
            data: "{'adj': '" + aradj + "'," +
                               "'mailto': '" + mailto + "'," +
                               "'asunto': '" + asunto + "'," +
                               "'descripcion': '" + descripcion + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (res) {
                alerta("Solicitudes Enviadas con éxito");
                Modal.dialog('close');
                Salir();
                //$("#btnEnviarSol").button("option", "disabled", true);
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
}

function DescargarArchivos() {
    var numadjdesc = arNombAdj.length;
    var i = 0;
    for (i = 0; i < numadjdesc; i++) {
        location.href = "../Temporal/" + arNombAdj[i];
    }
}

//function DescargarArchivos() {
//    var archivos = arNombAdj.join(',');
//    alert(archivos);
//    $.ajax({
//        type: "POST",
//        url: "Adm_ReporteSolicitudServicio.aspx/DescargarAdjuntos",
//        data: "{'archivos': '" + archivos + "'}",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json"
//    });
//};

//function DescargarArchivos() {
//    alerta("desc");
//    var numadjdesc = arNombAdj.length;
//    for (var i = 0; i < numadjdesc; i++) {
//        $.download('../Temporal/' + arNombAdj[i],'filename=' + arNombAdj[i] +'&format=pdf','get');
//    };
//};
//
//jQuery.download = function (url, data, method) {
//    //url and data options required
//    alerta("download");
//    if (url && data) {
//        //data can be string of parameters or array/object
//        data = typeof data == 'string' ? data : jQuery.param(data);
//        //split params into form inputs
//        var inputs = '';
//        jQuery.each(data.split('&'), function () {
//            var pair = this.split('=');
//            inputs += '<input type="hidden" name="' + pair[0] + '" value="' + pair[1] + '" />';
//        });
//        //send request
//        jQuery('<form action="' + url + '" method="' + method + '">' + inputs + '</form>')
//            .appendTo('body').submit().remove();
//    };
//};

    