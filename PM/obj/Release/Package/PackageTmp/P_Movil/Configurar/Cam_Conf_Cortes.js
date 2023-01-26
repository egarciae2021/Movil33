var oCorteConfiguracion;
$(function () {
    $("#lblMensajeFrecuencia").hide();
    $("#lblMensaheNumeroCortes").hide();

    oCorteConfiguracion = new MOV_CAM_CorteConfiguracion();

    ko.validation.rules.pattern.message = 'Invalid.';

    ko.validation.configure({
        registerExtenders: true,
        messagesOnModified: true,
        insertMessages: true,
        parseInputAttributes: true,
        messageTemplate: null
    });

    ko.applyBindings(oCorteConfiguracion);

    oCorteConfiguracion.errors = ko.validation.group(oCorteConfiguracion);

    $("#txtFrecuencia,#txtNumeroCortes,#txtDiasAntiguedadPedido").keypress(ValidarEntero);
    $("#txtCorreos,#txtRutaExportacion,#txtNombreArchivo").keypress(ValidarCadena);

    $("#txtFrecuencia").change(function () {
        if ($("#txtFrecuencia").val() != "") {
            $("#txtNumeroCortes")[0].disabled = true;
            $("#lblMensajeFrecuencia").show();
        } else {
            $("#txtNumeroCortes")[0].disabled = false;
            $("#lblMensajeFrecuencia").hide();
        }
    });

    $("#txtNumeroCortes").change(function () {
        if ($("#txtNumeroCortes").val() != "") {
            $("#txtFrecuencia")[0].disabled = true;
            $("#lblMensaheNumeroCortes").show();
        } else {
            $("#txtFrecuencia")[0].disabled = false;
            $("#lblMensaheNumeroCortes").hide();
        }
    });

    $("input:checkbox,input:radio,input:file").uniform();
    $(".tdEtiqueta").css("width", "100px");

    var tabContenido = $("#tabContenido").tabs({});

    $("#tabContenido").css({ "height": "150px" });


    //--------Inicia el contrato con el id seteado de condicion inicial,-------------------- 
    //----------en el caso de editar viene con un valor, en el caso de ---------------------
    //-------------------------uno nuevo viene vacio----------------------------------------
    oCorteConfiguracion.Inicio($("#hdfIdCorteConfiguracion").val());
    //--------------------------------------------------------------------------------------

    //----------------------------------Guardar Entidad-------------------------------------
    $("#btnGuardar").click(function () {
        if (oCorteConfiguracion.errors().length == 0 && ($("#txtNumeroCortes").val() != "" || $("#txtFrecuencia") != "")) {
            BloquearPagina(true);
            oCorteConfiguracion.Guardar(SatisfactoriaGuardar, ErrorGuardar);
        } else {
            alerta('Por favor verifique los datos ingresados');
            oCorteConfiguracion.errors.showAllMessages();
            return false;
        }
    });
    function SatisfactoriaGuardar(Resultado) {
        //window.parent.ActualizarGrilla();
        Mensaje("<br/><h1>Contrato guardado</h1><br/>", document, CerroMensaje);
    }
    function ErrorGuardar(xhr, err, thrErr) {
        BloquearPagina(false);
    }
    function CerroMensaje() {
        BloquearPagina(false);
    }
    //--------------------------------------------------------------------------------------
    $("#btnCerrar").click(function () {
        window.parent.tab.tabs("remove", indiceTab);
    });
});