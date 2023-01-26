var oCultura = window.parent.parent.oCulturaUsuario;
var imagen;
function comprobanteConfiguracion(IdComprobanteConfiguracion, SerieComprobanteIni, CorrelativoComprobanteIni, SerieNotaCreditoIni, CorrelativoNotaCreditoIni, NumCobComprobanteEquipo, NumCobComprobanteServicio, NumCobNotaCredito, Margen, LunesUtil, MartesUtil, MiercolesUtil, JuevesUtil, ViernesUtil, SabadoUtil, DomingoUtil, FeriadoUtil, RestringirLineaBaja, DiasEliminacion) {
      
    this.IdComprobanteConfiguracion = IdComprobanteConfiguracion;
    this.SerieComprobanteIni = SerieComprobanteIni;
    this.CorrelativoComprobanteIni = CorrelativoComprobanteIni;
    this.SerieNotaCreditoIni = SerieNotaCreditoIni;
    this.CorrelativoNotaCreditoIni = CorrelativoNotaCreditoIni;
    this.NumCobComprobanteEquipo = NumCobComprobanteEquipo;
    this.NumCobComprobanteServicio = NumCobComprobanteServicio;
    this.NumCobNotaCredito = NumCobNotaCredito;
    this.Margen = Margen;

    this.LunesUtil  =LunesUtil;
    this.MartesUtil = MartesUtil;
    this.MiercolesUtil = MiercolesUtil;
    this.JuevesUtil = JuevesUtil;
    this.ViernesUtil = ViernesUtil;
    this.SabadoUtil = SabadoUtil;
    this.DomingoUtil = DomingoUtil;
    this.FeriadoUtil = FeriadoUtil;
    this.RestringirLineaBaja = RestringirLineaBaja;
    this.DiasEliminacion = DiasEliminacion;
}


$(function () {

    $("input:checkbox,input:radio,input:file").uniform();
    $.uniform.update();

    //$("#txtMargen").val(FormatoNumero($("#txtMargen").val(), oCultura, true));

    var Nametab = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
    var tabComprobante = window.parent.$("#" + Nametab);
    var indiceTab = tabComprobante.tabs("option", "selected");  
    var tabHijo = tabComprobante.find("a")[indiceTab].hash;


    $('#txtMargen').spinner({ min: 1, max: 100 });
    $('#txtDiasEliminacion').spinner({ min: 1, max: 100 });
    //    $('#txtComproEq').spinner({ min: 1, max: 4 });
    //    $('#txtComproSrv').spinner({ min: 1, max: 4 });
    //    $('#txtNotaCre').spinner({ min: 1, max: 4 });

    ValidarNumeroEnCajaTexto("txtMargen", ValidarSoloNumero);
    ValidarNumeroEnCajaTexto("txtComproEq", ValidarSoloNumero);
    ValidarNumeroEnCajaTexto("txtComproSrv", ValidarSoloNumero);
    ValidarNumeroEnCajaTexto("txtNotaCre", ValidarSoloNumero);
    ValidarNumeroEnCajaTexto("txtDiasEliminacion", ValidarSoloNumero);

    ValidarNumeroEnCajaTexto("txtCorrelativoCP", ValidarSoloNumero);
    ValidarNumeroEnCajaTexto("txtCorrelativoNT", ValidarSoloNumero);

    $("#txtSerieCP").keypress(ValidarCodigoVarChar);
//    $("#txtCorrelativoCP").keypress(ValidarCodigoVarChar);
    $("#txtSerieNT").keypress(ValidarCodigoVarChar);
//    $("#txtCorrelativoNT").keypress(ValidarCodigoVarChar);

    CargarIFrame($("#hdfCodigo").val());

    $("#btnGuardar").click(function () {

        var ComprobanteConfiguracion = new comprobanteConfiguracion();

        ComprobanteConfiguracion.IdComprobanteConfiguracion = $("#hdfIdComprobanteConf").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        ComprobanteConfiguracion.SerieComprobanteIni = $("#txtSerieCP").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        ComprobanteConfiguracion.CorrelativoComprobanteIni = $("#txtCorrelativoCP").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        ComprobanteConfiguracion.SerieNotaCreditoIni = $("#txtSerieNT").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        ComprobanteConfiguracion.CorrelativoNotaCreditoIni = $("#txtCorrelativoNT").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        ComprobanteConfiguracion.NumCobComprobanteEquipo = $("#txtComproEq").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        ComprobanteConfiguracion.NumCobComprobanteServicio = $("#txtComproSrv").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        ComprobanteConfiguracion.NumCobNotaCredito = $("#txtNotaCre").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        ComprobanteConfiguracion.Margen = $("#txtMargen").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");


        ComprobanteConfiguracion.LunesUtil = $('#chkLunUtil').is(':checked');
        ComprobanteConfiguracion.MartesUtil = $('#chkMarUtil').is(':checked');
        ComprobanteConfiguracion.MiercolesUtil = $('#chkMierUtil').is(':checked');
        ComprobanteConfiguracion.JuevesUtil = $('#chkJueUtil').is(':checked');
        ComprobanteConfiguracion.ViernesUtil = $('#chkVierUtil').is(':checked');
        ComprobanteConfiguracion.SabadoUtil = $('#chkSabUtil').is(':checked');
        ComprobanteConfiguracion.DomingoUtil = $('#chActivo').is(':checked');
        ComprobanteConfiguracion.FeriadoUtil = $('#chkFeriadoUtil').is(':checked');
        ComprobanteConfiguracion.RestringirLineaBaja = $('#chkLineaBaja').is(':checked');
        ComprobanteConfiguracion.DiasEliminacion = $("#txtDiasEliminacion").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");

        if (ComprobanteConfiguracion.SerieComprobanteIni == "") {
            alerta("El N° de serie de Comprobante de Pago es un campo obligatorio.");
            $("#txtSerieCP").focus();
            return;
        };

        

        if (ComprobanteConfiguracion.CorrelativoComprobanteIni == "") {
            alerta("El N° de correlativo de Comprobante de Pago es un campo obligatorio.");
            $("#txtCorrelativoCP").focus();
            return;
        };

        if (ComprobanteConfiguracion.SerieComprobanteIni.length + ComprobanteConfiguracion.CorrelativoComprobanteIni.length > 14) {
            alerta("El N° de comprobante " + ComprobanteConfiguracion.SerieComprobanteIni + "-" + ComprobanteConfiguracion.CorrelativoComprobanteIni + " para Comprobante de Pago es más de lo permitido (15).");
            $("#txtSerieCP").focus();
            return;
        };

        if (ComprobanteConfiguracion.SerieNotaCreditoIni == "") {
            alerta("El N° de serie de Notas de Crédito es un campo obligatorio.");
            $("#txtSerieNT").focus();
            return;
        };

        
        if (ComprobanteConfiguracion.CorrelativoNotaCreditoIni == "") {
            alerta("El N° de correlativo de Notas de Crédito es un campo obligatorio.");
            $("#txtCorrelativoNT").focus();
            return;
        };

        if (ComprobanteConfiguracion.SerieNotaCreditoIni.length + ComprobanteConfiguracion.CorrelativoNotaCreditoIni.length > 14) {
            alerta("El N° de comprobante " + ComprobanteConfiguracion.SerieNotaCreditoIni + "-" + ComprobanteConfiguracion.CorrelativoNotaCreditoIni + " para Notas de Crédito es más de lo permitido (15).");
            $("#txtSerieNT").focus();
            return;
        };

        if (ComprobanteConfiguracion.NumCobComprobanteEquipo == "") {
            alerta("El Comprobante de Equipo es un campo obligatorio.");
            $("#txtComproEq").focus();
            return;
        };

        if (ComprobanteConfiguracion.NumCobComprobanteServicio == "") {
            alerta("El Comprobante de Servicio es un campo obligatorio.");
            $("#txtComproSrv").focus();
            return;
        };

        if (ComprobanteConfiguracion.NumCobNotaCredito == "") {
            alerta("Notas de Crédito es un campo obligatorio.");
            $("#txtComproCre").focus();
            return;
        };

        if ($("#txtMargen").val() == "") {
            alerta("El Margen es un campo obligatorio.");
            $("#txtMargen").focus();
            return;
        };

        if ($("#txtDiasEliminacion").val() == "") {
            alerta("El campo días de eliminación de archivos procesados es un campo obligatorio.");
            $("#txtDiasEliminacion").focus();
            return;
        };

        ComprobanteConfiguracion.Margen = ($("#txtMargen").val() / 100);

        var oComprobanteConfiguracion = JSON.stringify(ComprobanteConfiguracion);

        $.ajax({
            type: "POST",
            url: "Comp_Conf_Inicial.aspx/Guardar",
            //data: "{'oCompania': '" + oCompania + "'}",

            data: "{'oCompobanteConfiguracion': '" + oComprobanteConfiguracion + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == "0") {

                    Mensaje("<br/><h1>Configuración de Comprobante Guardada</h1><br/>", document, CerroMensaje);
                } else if (result.d == "2") {

                    alerta("El Comprobante de Equipo debe ser entre 1 y 4");
                    BloquearPagina(false);
                } else if (result.d == "3") {

                    alerta("El Comprobante de Servicio debe ser entre 1 y 4");
                    BloquearPagina(false);
                } else if (result.d == "4") {

                    alerta("La Nota de Crédito debe ser entre 1 y 4");
                    BloquearPagina(false);
                } else if (result.d == "5") {

                    alerta("El Margen debe ser entre 1 y 100");
                    BloquearPagina(false);
                } else if (result.d == "6") {

                    alerta("Debe agregar la firma");
                    BloquearPagina(false);
                } else {
                    alerta("Hubo un error, no se pudo grabar el registro");
                    BloquearPagina(false);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });


    });

    $("#btnCerrar").click(function () {
        tabComprobante.tabs("remove", tabComprobante.tabs("option", "selected"));
    });


    function CerroMensaje() {
        BloquearPagina(false);
        //tabComprobante.tabs("remove", tabComprobante.tabs("option", "selected"));
        tabComprobante.tabs("remove", tabHijo);
    }

    if (p_validar == 1) {
        //        $("#btnGuardar").button("option", "disabled", true);

        $("#txtComproEq").spinner("destroy").prop('disabled', true);
        $("#txtComproSrv").spinner("destroy").prop('disabled', true);
        $("#txtNotaCre").spinner("destroy").prop('disabled', true);

        $("#dvCondiciones").show();
    } else {
        $('#txtComproEq').spinner({ min: 1, max: 4 });
        $('#txtComproSrv').spinner({ min: 1, max: 4 });
        $('#txtNotaCre').spinner({ min: 1, max: 4 });
        $("#dvCondiciones").hide();
    }

});


function CargarIFrame(idnivel) {
    //var idnivel = $("#hdfCodigo").val();
    var $paginaI = "Comp_Conf_CargarFirma.aspx?Id=" + idnivel;
    $("#ifCargaIcono").attr("src", $paginaI);
};

function HabilitarBoton() {
    $("#btnGuardar").button("option", "disabled", false);
}