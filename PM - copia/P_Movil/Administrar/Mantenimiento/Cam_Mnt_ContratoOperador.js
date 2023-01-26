
var oContrato;
var oCulturaUsuario;
var FormatoFechaCulturaForDatePicker = "";
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
$(function () {

    oCulturaUsuario = window.parent.parent.oCulturaUsuario;
    FormatoFechaCulturaForDatePicker = oCulturaUsuario.vcFecCor.toLowerCase();

    if (FormatoFechaCulturaForDatePicker.indexOf("yyyy") >= 0) {
        FormatoFechaCulturaForDatePicker = FormatoFechaCulturaForDatePicker.replace("yyyy", "yy");  //Para datepicker 'yy' es como 'yyyy'; y 'y' es 'yy'
    }
    else if (FormatoFechaCulturaForDatePicker.indexOf("yy") >= 0) {
        FormatoFechaCulturaForDatePicker = FormatoFechaCulturaForDatePicker.replace("yy", "y");
    }

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

    $("input:input:radio,input:file").uniform();
    $(".tdEtiqueta").css("width", "150px");
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
    oContrato.Inicio($("#hdfCodigoContrato").val());
    //--------------------------------------------------------------------------------------

    //----------------------------------Guardar Entidad-------------------------------------
    $("#btnGuardar").click(function () {


        if ($("#ddlOperador").val() == "-1") {
            alerta("Seleccione un Operador");
            return;
        }
        if ($("#txtCodigoProveedor").val() == "") {
            alerta("El código del contrato(Operador) es obligatorio");
            return;
        }

        if ($("#txtCodigoProveedor").val().length > 25) {
            alerta("El código del contrato(Operador) no puede ser mayor a 25 caracteres");
            return;
        }

        if ($("#txtDescripcion").val() == "") {
            alerta("Ingrese una descripción");
            return;
        }

        var dtFechaInicio, dtFechaFin;

        try {
            dtFechaInicio = Date.parseExact($("#txtFechaInicio").val(), oCulturaUsuario.vcFecCor);
            if (dtFechaInicio == null) {
                alerta("Ingrese una fecha de inicio correcta");
                $("#txtFechaInicio").focus();
                return;
            }
        }
        catch (e) {
            alerta("Ingrese una fecha de inicio correcta");
            $("#txtFechaInicio").focus();
            return;
        }
        try {
            dtFechaFin = Date.parseExact($("#txtFechaFin").val(), oCulturaUsuario.vcFecCor);
            if (dtFechaFin == null) {
                alerta("Ingrese una fecha fin correcta");
                $("#txtFechaFin").focus();
                return;
            }
        }
        catch (e) {
            alerta("Ingrese una fecha fin correcta");
            $("#txtFechaFin").focus();
            return;
        }

        if ((dtFechaInicio - dtFechaFin) >= 0) {
            alerta("La fecha inicial debe ser menor a la fecha final");
            return;
        }


        BloquearPagina(true);
        oContrato.Guardar(SatisfactoriaGuardar, ErrorGuardar);

        //if (oContrato.errors()) {               
        //    BloquearPagina(true);
        //    oContrato.Guardar(SatisfactoriaGuardar, ErrorGuardar);
        //} else {
        //    alerta('Por favor verifique los datos ingresados');
        //    oContrato.errors.showAllMessages();
        //    return false;
        //}
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
            $("#txtCodigo").focus("");
        }
        else {//Edicion
            window.parent.tab.tabs("remove", indiceTab);
        }

        if ($("#ddlOperador option").length == 2) {
            $("#ddlOperador").prop("selectedIndex", 1);
            $("#ddlOperador").attr('disabled', true);
            $("#ddlOperador").change();
        }

    }
    //--------------------------------------------------------------------------------------
    $("#btnCerrar").click(function () {
        window.parent.tab.tabs("remove", indiceTab);
    });



    if ($("#ddlOperador option").length == 2) {
        $("#ddlOperador").prop("selectedIndex", 1);
        $("#ddlOperador").attr('disabled', true);
        $("#ddlOperador").change();
    }

});
    