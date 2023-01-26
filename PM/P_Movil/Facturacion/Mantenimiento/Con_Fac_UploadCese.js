/*****  29/12/2015  :   RURBINA *****/

var oContrato;
function CargarNombreArchivo(Archivo, RutaCompleta) {

    if (Archivo != "") {
        $("#btnGuardar").button("option", "disabled", false);
    }
    oContrato.ArchivoOriginal(Archivo);
    oContrato.RutaContratoTemporal(RutaCompleta);
}

function inicioPagina() {
    DimPosElementos();
}

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    var AnchoLateral = $(".LateralSplitter");
    $(".Splitter").css({ height: Alto - 18 });
}
$(document).ready(function () {

    $("#btnGuardar").button("option", "disabled", true);

    var indiceTab = window.parent.tab.tabs("option", "selected");
    oContrato = new MOV_CAM_Contrato();

    ko.validation.rules.pattern.message = 'Invalid.';

    ko.validation.configure({
        registerExtenders: true,
        messagesOnModified: true,
        insertMessages: true,
        parseInputAttributes: true,
        messageTemplate: null
    });

    ko.applyBindings(oContrato);

    oContrato.errors = ko.validation.group(oContrato);

    $("input:checkbox,input:radio,input:file").uniform();
    $(".tdEtiqueta").css("width", "100px");
    $(".DATE").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy' // See format options on parseDate
    });
    var tabContenido = $("#tabContenido").tabs({});

    $("#tabContenido").css({ "height": "150px" });

    inicioPagina();

    $(window).resize(function () {
        DimPosElementos();
    });

    //--------Inicia el contrato con el id seteado de condicion inicial,-------------------- 
    //----------en el caso de editar viene con un valor, en el caso de ---------------------
    //-------------------------uno nuevo viene vacio----------------------------------------
    //oContrato.Inicio($("#hdfCodigoContrato").val());
    //--------------------------------------------------------------------------------------

    //----------------------------------Guardar Entidad-------------------------------------
    $("#btnGuardar").click(function () {
        //                if (oContrato.errors().length == 0) {
        if ($("#hdfProcOrigen").val() == "0" || $("#hdfProcOrigen").val() == null) {
            alerta("Se debe configurar un Origen para la importación de Ceses");
            return;
        }
        if ($("#hdfProcDestino").val() == "0" || $("#hdfProcDestino").val() == null) {
            alerta("Se debe configurar un Destino para la importación de Ceses");
            return;
        }
        BloquearPagina(true);
        oContrato.Guardar(SatisfactoriaGuardar, ErrorGuardar);
        //                } else {
        //                    alerta('Por favor verifique los datos ingresados');
        //                    oContrato.errors.showAllMessages();
        //                    return false;
        //                }
    });
    function SatisfactoriaGuardar(Resultado) {
        window.parent.ActualizarGrilla();
        Mensaje("<br/><h1>Cese guardado</h1><br/>", document, CerroMensaje);
    }
    function ErrorGuardar(xhr, err, thrErr) {
        BloquearPagina(false);
    }
    function CerroMensaje() {
        BloquearPagina(false);
        if (oContrato.IdContrato() == null) {//Nuevo
            oContrato.Limpiar();
            //                    $("#txtCodigo").focus("");
        }
        else {//Edicion
            window.parent.tab.tabs("remove", indiceTab);
        }
    }
    //--------------------------------------------------------------------------------------
    $("#btnCerrar").click(function () {
        window.parent.tab.tabs("remove", indiceTab);
    });

    $("#btnEliminarContrato").click(function () {
        //                var Archivo = $(this).val();
        //                if (Archivo != "") {
        $("#btnGuardar").button("option", "disabled", true);
        //                }
        //                else {
        //                    $("#btnGuardar").button("option", "disabled", true);
        //                }

    });
});