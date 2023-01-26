var oPublicidad;
oPublicidad = new MOV_CAM_Publicidad();

function ObtienePublicidad() {
    var vPublicidad = JSON.parse(ko.toJSON(oPublicidad));

    $(vPublicidad.MOV_CAM_PublicidadDetalle).each(function (i) {
        this.RutaArchivo = this.RutaArchivo.toString().replace(/\\/g, "\\\\");
    });

    return vPublicidad;
}

function CargarNombreArchivo(Archivo, RutaCompleta, AceptaNArchivos) {
    var Orden = oPublicidad.MOV_CAM_PublicidadDetalle().length.toString();
    var data = { "IdPublicidad": "-1", "Orden": parseInt(Orden) + 1, "RutaArchivo": "..\\..\\" + RutaCompleta };
    oPublicidad.MOV_CAM_PublicidadDetalle.push(data);
    if (AceptaNArchivos == 0 && Orden == 0) {
        $("#ifCargarImagen").hide();
    }
    $(".btnNormal").button({});
}

$(function () {
    $("input:checkbox,input:radio,input:file").uniform();
    $(".tdEtiqueta").css({ "width": "100px" });
    Dimensionar();
    ActivarCombokendo("#ddlOperador", 400);
    ActivarCombokendo("#ddlFormato", 200);

    $(window).resize(function () {
        Dimensionar();
    });

    function Dimensionar() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        //alert(Alto);
        $('#dvBanner').css({ "height": Alto - 140 });
    }

    ko.validation.rules.pattern.message = 'Invalid.';

    ko.validation.configure({
        registerExtenders: true,
        messagesOnModified: true,
        insertMessages: true,
        parseInputAttributes: true,
        messageTemplate: null
    });

    ko.applyBindings(oPublicidad);
    //alert($("#hdfIdCampana").val());
    oPublicidad.IdCampana($("#hdfIdCampana").val());

    oPublicidad.errors = ko.validation.group(oPublicidad);

    $("input:checkbox,input:radio,input:file").uniform();
    $(".tdEtiqueta").css("width", "100px");
    $(".DATE").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy' //See format options on parseDate
    });
    var tabContenido = $("#tabContenido").tabs({});

    $("#tabContenido").css({ "height": "150px" });

    //--------Inicia el contrato con el id seteado de condicion inicial,-------------------- 
    //----------en el caso de editar viene con un valor, en el caso de ---------------------
    //-------------------------uno nuevo viene vacio----------------------------------------
    //oPublicidad.Inicio($("#hdfIdPublicidad").val());
    //--------------------------------------------------------------------------------------

    //----------------------------------Guardar Entidad-------------------------------------
    $("#btnGuardar").click(function () {
        fnGuardar();
    });

    function CerroMensaje() {
        BloquearPagina(false);
        if (oPublicidad.IdPublicidad() == null) {//Nuevo
            //oPublicidad.Limpiar();
            $("#txtCodigo").focus("");
        }
        else {//Edicion
            //window.parent.tab.tabs("remove", indiceTab);
        }
    }
    //--------------------------------------------------------------------------------------
    $("#btnCerrar").click(function () {
        //window.parent.tab.tabs("remove", indiceTab);
    });

    $("#ddlFormato").change(function () {

    });
});

function fnGuardar() {
    //alert($("#ddlOperador").val());
    var vcBanner = "0";
    if (oPublicidad.MOV_CAM_PublicidadDetalle().length > 0) {
        if ($("#ddlOperador").val() != "-1") {
            if (oPublicidad.errors().length == 0) {
                BloquearPagina(true);
                oPublicidad.Guardar(SatisfactoriaGuardar, ErrorGuardar);
            } else {
                //alerta('Por favor verifique los datos ingresados');
                oPublicidad.errors.showAllMessages();
                vcBanner = "1";
            }
        } else {
            //alerta('Por favor debe ingresar un Operador');
            oPublicidad.errors.showAllMessages();
            vcBanner = "2";
        }
    } else {
        //alerta("Debe agregar por lo menos un banner");
        vcBanner = "3";
    }

    return vcBanner;
}

function SatisfactoriaGuardar(Resultado) {
    //window.parent.ActualizarGrilla();
    //Mensaje("<br/><h1>Publicidad guardada</h1><br/>", document, CerroMensaje);
}
function ErrorGuardar(xhr, err, thrErr) {
    BloquearPagina(false);
}