function gen_cultura(P_inCodCul, vcCodCul, vcNomCul, F_inCodMon, F_inCodPai, F_inCodIdi, vcSimDec, dcNumDec, vcSimSepMil, vcSimNeg, vcHorCor, vcHorLar, vcSimAM, vcSimPM, vcFecCor, vcFecLar, btVig, dcIGV) {
    this.P_inCodCul = P_inCodCul;
    this.vcCodCul = vcCodCul;
    this.vcNomCul = vcNomCul;
    this.F_inCodMon = F_inCodMon;
    this.F_inCodPai = F_inCodPai;
    this.F_inCodIdi = F_inCodIdi;
    this.vcSimDec = vcSimDec;
    this.dcNumDec = dcNumDec;
    this.vcSimSepMil = vcSimSepMil;
    this.vcSimNeg = vcSimNeg;
    this.vcHorCor = vcHorCor;
    this.vcHorLar = vcHorLar;
    this.vcSimAM = vcSimAM;
    this.vcSimPM = vcSimPM;
    this.vcFecCor = vcFecCor;
    this.vcFecLar = vcFecLar;
    this.btVig = btVig;
    this.dcIGV = dcIGV; //agregado 23-09-2013 wapumayta
}

var indiceTab;

$(function () {

    indiceTab = window.parent.tabschild.tabs("option", "selected");

    //$("#txtIGV").keypress(ValidarDecimalPositivo); //agregado 23-09-2013 wapumayta
    ValidarTextoConfiguracionRegional("txtIGV", ValidarDecimalPositivo);
    ValidarTextoConfiguracionRegional("txtSimboloDecimal", ValidarDatosConfRegional);
    ValidarTextoConfiguracionRegional("txtSimSepMil", ValidarDatosConfRegional);
    ValidarTextoConfiguracionRegional("txtNumDec", ValidarSoloNumero);

    $("#btnGrabar").button();

    if (isIE() == 6) {
        $("#btnGrabar").css('width', 'auto');
        $("#btnGrabar").css('float', 'right');
    }

    $("#ddlCultura").change(function () {
        //Obtener Cultura...
        $.ajax({
            type: "POST",
            url: "ConfiguracionRegional.aspx/ObtenerCultura",
            data: "{'IdCultura':'" + $("#ddlCultura").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var oCultura = result.d;
                $("#txtSimboloDecimal").val(oCultura.vcSimDec);
                $("#txtNumDec").val(oCultura.dcNumDec);
                $("#txtSimSepMil").val(oCultura.vcSimSepMil);
                $("#ddlFormatoFecha").val(oCultura.vcFecCor);
                $("#hdfCodigo").val(oCultura.P_inCodCul);
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });


    $("#btnGrabar").click(function () {
        var Gen_cultura = new gen_cultura();
        var oGen_cultura = "";
        if (isIE() == 6) {
            Gen_cultura.P_inCodCul = $("#hdfCodigo").val();
            Gen_cultura.vcCodCul = "";
            Gen_cultura.vcNomCul = "";
            Gen_cultura.F_inCodMon = "0";
            Gen_cultura.F_inCodPai = "0";
            Gen_cultura.F_inCodIdi = "0";
            Gen_cultura.vcSimDec = $("#txtSimboloDecimal").val();
            Gen_cultura.dcNumDec = $("#txtNumDec").val();
            Gen_cultura.vcSimSepMil = $("#txtSimSepMil").val();
            Gen_cultura.vcSimNeg = "";
            Gen_cultura.vcHorCor = "";
            Gen_cultura.vcHorLar = "";
            Gen_cultura.vcSimAM = "";
            Gen_cultura.vcSimPM = "";
            Gen_cultura.vcFecCor = $("#ddlFormatoFecha").val();
            Gen_cultura.vcFecLar = "";
            Gen_cultura.btVig = true;
            Gen_cultura.dcIGV = $("#txtIGV").val(); //agregado 23-09-2013 wapumayta
            oGen_cultura = JSON.stringify(Gen_cultura);
        } else {
            Gen_cultura.P_inCodCul = $("#hdfCodigo").val();
            Gen_cultura.vcCodCul = $("#ddlCultura option:selected").text();
            Gen_cultura.vcSimDec = $("#txtSimboloDecimal").val();
            Gen_cultura.dcNumDec = $("#txtNumDec").val();
            Gen_cultura.vcSimSepMil = $("#txtSimSepMil").val();
            Gen_cultura.vcFecCor = $("#ddlFormatoFecha").val();
            Gen_cultura.dcIGV = $("#txtIGV").val().replace(/\s/g, "").replace(",", "."); //agregado 23-09-2013 wapumayta //rramos_cultura 20160808
            Gen_cultura.btVig = true;
            oGen_cultura = JSON.stringify(Gen_cultura);
        }

        if (Gen_cultura.dcIGV >= 100) { //agregado 23-09-2013 wapumayta
            alerta("Digite un número IGV válido");
            return;
        }

        $.ajax({
            type: "POST",
            url: "ConfiguracionRegional.aspx/GrabarCultura",
            data: "{'oEntidad':'" + oGen_cultura + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == "1") {
                    //JHERRERA 20141009: Se actualizan los datos de cultura en el master page.
                    window.parent.oCulturaUsuario.vcCodCul = $("#hdfCodigo").val();
                    window.parent.oCulturaUsuario.vcSimDec = $("#txtSimboloDecimal").val();
                    window.parent.oCulturaUsuario.dcNumDec = $("#txtNumDec").val();
                    window.parent.oCulturaUsuario.vcSimSepMil = $("#txtSimSepMil").val();
                    window.parent.oCulturaUsuario.vcFecCor = $("#ddlFormatoFecha").val();
                    window.parent.oCulturaUsuario.dcIGV = $("#txtIGV").val();
                    //----------------------------------------------------------------------->

                    //Mensaje("<br/><img src=\"../../Common/Images/Mantenimiento/Grabar32.png\" /><br/><h1>Datos Guardados.</h1><br/>", document, CerroMensaje);
                    confirmacion("<b>Datos Guardados.</b><br/><br/>Para aplicar los cambios debe reiniciar sesión.<br>¿Desea cerrar la sesión actual?", divMsgConfirmacion_SI, null, "Confirmación");

                }
                else {
                    alert('No se grabaron los datos.');
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });
});
function divMsgConfirmacion_SI() {
    window.top.location.href = ('../../Login.aspx');
}

function isIE() { //Vefiricar Version del Internet Explorer
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

function CerroMensaje() {
    
}
