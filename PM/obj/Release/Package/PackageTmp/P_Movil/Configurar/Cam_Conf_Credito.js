var oCreditoConfiguracion;
$(function () {
    oCreditoConfiguracion = new MOV_CAM_CreditoConfiguracion();

    ko.validation.rules.pattern.message = 'Invalid.';

    ko.validation.configure({
        registerExtenders: true,
        messagesOnModified: true,
        insertMessages: true,
        parseInputAttributes: true,
        messageTemplate: null
    });

    ko.applyBindings(oCreditoConfiguracion);

    oCreditoConfiguracion.errors = ko.validation.group(oCreditoConfiguracion);

    $("input:checkbox,input:radio,input:file").uniform();
    $(".tdEtiqueta").css("width", "100px");

    var tabContenido = $("#tabContenido").tabs({});

    $("#tabContenido").css({ "height": "150px" });


    //--------Inicia el contrato con el id seteado de condicion inicial,-------------------- 
    //----------en el caso de editar viene con un valor, en el caso de ---------------------
    //-------------------------uno nuevo viene vacio----------------------------------------
    oCreditoConfiguracion.Inicio($("#hdfIdCreditoConfiguracion").val());
    //--------------------------------------------------------------------------------------

    //----------------------------------Guardar Entidad-------------------------------------
    $("#btnGuardar").click(function () {
        if (oCreditoConfiguracion.errors().length == 0) {
            BloquearPagina(true);
            oCreditoConfiguracion.Guardar(SatisfactoriaGuardar, ErrorGuardar);
        } else {
            alerta('Por favor verifique los datos ingresados');
            oCreditoConfiguracion.errors.showAllMessages();
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
        //                if (oCreditoConfiguracion.IdCreditoConfiguracion() == null) {//Nuevo
        //                    oCreditoConfiguracion.Limpiar();
        //                    $("#txtCodigo").focus("");
        //                }
        //                else {//Edicion
        //                    window.parent.tab.tabs("remove", indiceTab);
        //                }
    }
    //--------------------------------------------------------------------------------------
    $("#btnCerrar").click(function () {
        var Nametab = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
        var Accord = window.parent.$("#" + Nametab);
        Accord.tabs("remove", Accord.tabs("option", "selected"));
    });

    //            $("#btnCerrar").click(function () {
    //                var tab1 = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
    //                var Accord = window.parent.$("#" + tab1);
    //                Accord.tabs("remove", Accord.tabs("option", "selected"));
    //            });
});