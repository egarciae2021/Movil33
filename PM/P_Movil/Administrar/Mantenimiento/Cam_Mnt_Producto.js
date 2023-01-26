
var oProductoTipo;
$(function () {
    $("input:checkbox,input:radio,input:file").uniform();

    oProductoTipo = new MOV_CAM_ProductoTipo();
    ko.validation.rules.pattern.message = 'Invalid.';

    ko.validation.configure({
        registerExtenders: true,
        messagesOnModified: true,
        insertMessages: true,
        parseInputAttributes: true,
        messageTemplate: null
    });

    ko.applyBindings(oProductoTipo);

    oProductoTipo.errors = ko.validation.group(oProductoTipo);

    //--------Inicia el contrato con el id seteado de condicion inicial,-------------------- 
    //----------en el caso de editar viene con un valor, en el caso de ---------------------
    //-------------------------uno nuevo viene vacio----------------------------------------
    oProductoTipo.Inicio($("#hdfIdTipoProducto").val());
    //--------------------------------------------------------------------------------------

    //----------------------------------Guardar Entidad-------------------------------------
    $("#btnGuardar").click(function () {
        if (oProductoTipo.errors().length == 0) {
            BloquearPagina(true);
            oProductoTipo.Guardar(SatisfactoriaGuardar, ErrorGuardar);
        } else {
            alerta('Por favor verifique los datos ingresados');
            oProductoTipo.errors.showAllMessages();
            return false;
        }
    });
    function SatisfactoriaGuardar(Resultado) {
        window.parent.ActualizarGrilla();
        Mensaje("<br/><h1>Producto guardado</h1><br/>", document, CerroMensaje);
    }
    function ErrorGuardar(xhr, err, thrErr) {
        BloquearPagina(false);
    }
    function CerroMensaje() {
        BloquearPagina(false);
        if (oProductoTipo.IdTipoProducto() == null) {//Nuevo
            oProductoTipo.Limpiar();
            $("#txtDescripcion").focus("");
        }
        else {//Edicion
            window.parent.formulario.dialog("close");
        }
    }
    //--------------------------------------------------------------------------------------
    $("#btnCerrar").click(function () {
        window.parent.formulario.dialog("close");
    });
});
    