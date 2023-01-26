var oContrato;
function CargarNombreArchivo(Archivo, RutaCompleta) {
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
        Mensaje("<br/><h1>Contrato guardado</h1><br/>", document, CerroMensaje);
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
});