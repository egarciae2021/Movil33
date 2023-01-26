var oSubContrato;
oSubContrato = new MOV_CAM_SubContrato();

function CargarNombreArchivo(Archivo, RutaCompleta) {
    //alert(Archivo + ", " + RutaCompleta);
    $("#lblRutaContrato").html(Archivo);
    oSubContrato.RutaSubContrato(RutaCompleta);
    $("#ifContrato").attr("src", raiz(RutaCompleta));
    $("#btnDescargar").button("option", "disabled", false);
}

function ObtieneSubContrato() {
    var vSubContrato = JSON.parse(ko.toJSON(oSubContrato));
    vSubContrato.RutaSubContrato = vSubContrato.RutaSubContrato.toString().replace(/\\/g, "\\\\");
    //vSubContrato.RutaSubContratoResumen = vSubContrato.RutaSubContratoResumen.toString().replace(/\\/g, "\\\\");

    return vSubContrato;
}

var CarpetaDominio = '';

$(function () {
    //alert("IdSubContrato: " + $("#hdfIdSubContrato").val() + "\nIdCampana: " + $("#hdfIdCampana").val());

    CarpetaDominio = window.top.$("#hdfCodigoDominio").val() != '' ? '/' + window.top.$("#hdfCodigoDominio").val() : '';
    $("#ifCargarImagen").attr("src", '../../Common/Page/Adm_CargarArchivo.aspx?Formatos=htm,html&FormatoTipo=Formato web&RutaCarpeta=P_Movil\\Administrar\\SubContratos' + CarpetaDominio + '\\');

    $("input:checkbox,input:radio,input:file").uniform();
    $(".tdEtiqueta").css({ "width": "100px" });
    Dimensionar();

    $(window).resize(function () {
        Dimensionar();
    });

    function Dimensionar() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        $('#ifContrato').css({ "height": Alto - 120 });
    }

    ko.validation.rules.pattern.message = 'Invalid.';
    ko.validation.configure({
        registerExtenders: true,
        messagesOnModified: true,
        insertMessages: true,
        parseInputAttributes: true,
        messageTemplate: null
    });
    ko.applyBindings(oSubContrato);
    oSubContrato.errors = ko.validation.group(oSubContrato);

    //--------Inicia el contrato con el id seteado de condicion inicial,-------------------- 
    //----------en el caso de editar viene con un valor, en el caso de ---------------------
    //-------------------------uno nuevo viene vacio----------------------------------------
    oSubContrato.Inicio($("#hdfIdSubContrato").val());
    //oSubContrato.Inicio(0);
    //--------------------------------------------------------------------------------------

    //----------------------------------Guardar Entidad-------------------------------------
    $("#btnGuardar").click(function () {
        if (oSubContrato.errors().length == 0) {
            BloquearPagina(true);
            oSubContrato.Guardar(SatisfactoriaGuardar, ErrorGuardar);
        } else {
            alerta('Por favor verifique los datos ingresados');
            oSubContrato.errors.showAllMessages();
            return false;
        }
    });
    $("#btnDescargar").click(function () {
        window.location = "../../Common/Controladores/DescargarArchivo.ashx?archivo=" + oSubContrato.RutaSubContrato();
    });

    function SatisfactoriaGuardar(Resultado) {
        Mensaje("<br/><h1>Contrato guardado</h1><br/>", document, CerroMensaje);
    }
    function ErrorGuardar(xhr, err, thrErr) {
        BloquearPagina(false);
    }
    function CerroMensaje() {
        BloquearPagina(false);
    }
    //--------------------------------------------------------------------------------------
});