$(function () {

    $("#txtCodigo").keypress(ValidarNoEspacio);
    //$("#txtNombre").keypress(ValidarAlfaNumerico);
    var indiceTab = window.parent.tab.tabs("option", "selected");
    IniciarPagina();
    $(".btnNormal").button();
    function IniciarPagina() {


        if ($.trim($("#hdfEstado").val()) == "") {
            $("#txtCodigo").focus();
        }
        else {
            $("#txtNombre").focus();
        }


        if ($("#hdfEstado").val() == '') {
            $("#tdEstado").hide();
        }
        else {
            $("#tdEstado").show();
        }
    }


    function validarEmail2(valor) {
        var ExpRegular = /(\w+)(\.?)(\w*)(\@{1})(\w+)(\.?)(\w*)(\.{1})(\w{2,3})/;

        if (ExpRegular.test(valor)) {
            return true;
        }
        else {
            return false;
        }
    }

    //Agregado por Mauricio Benavides 12/07/2013
    $("#chActivo").bind('change', function () {
        if ($(this).is(":checked")) {
            $("#hdfEstadoCCO").val("1");
        }
        else {

            $("#hdfEstadoCCO").val("0");
        }
    });

    $("#btnGuardar").live("click", function () {
        //AQUI COMIENZA
        $("#lblMensajeConfirmacion").html("¡Atención!, se eliminará este registro de forma permanente ¿Desea continuar?");
        var Codigo = $("#txtCodigo").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        var Nombre = $("#txtNombre").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        var CorreoPersonal = $("#txtMailPersonal").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        var CorreoJefe = $("#txtMailJefe").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        var Estado = $("#hdfEstadoCCO").val();
        var idTabCorrecto = window.parent.tab.tabs("option", "selected");
        $("#hdfBorrarTabCorrecto").val(idTabCorrecto);
        if ($.trim(Codigo) == "") {
            alerta("El codigo es un campo obligatorio");
            $("#txtCodigo").focus();
            return;
        }

        if ($.trim(Nombre) == "") {
            alerta("El nombre es un campo obligatorio");
            $("#txtNombre").focus();
            return;
        }

        if ($.trim(CorreoPersonal) != "") {
            if (validarEmail2($.trim(CorreoPersonal)) == false) {
                alerta("Revisar el formato del Correo Personal xxxxx@xxx.xxx");
                $("#txtMailPersonal").focus();
                return;
            }
        }

        if ($.trim(CorreoJefe) != "") {
            if (validarEmail2($.trim(CorreoJefe)) == false) {
                alerta("Revisar el formato del Correo Jefatura xxxxx@xxx.xxx");
                $("#txtMailJefe").focus();
                return;
            }
        }


        $("#dvCargando").show();
        //alerta("{'Codigo': '" + Codigo + "', 'Nombre': '" + Nombre + "', 'inCodEst': '" + $("#hdfEstado").val() + "'}");

        $.ajax({
            type: "POST",
            url: "Mnt_CentroCosto.aspx/Guardar",
            data: "{'Codigo': '" + $.trim(Codigo) + "', 'Nombre': '" + $.trim(Nombre) + "', 'inCodEst': '" + $("#hdfEstado").val() + "', 'estado':'" + $("#hdfEstadoCCO").val() + "', 'CorPer': '" + $.trim(CorreoPersonal) + "', 'CorJef': '" + $.trim(CorreoJefe) + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                $("#dvCargando").hide();
                if (msg.d == "") {
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><h1>Centro de Costo guardado</h1><br/>", document, CerroMensaje);
                }
                else {
                    alerta("Revisar: " + msg.d);
                }
            },
            error: function (xhr, err) {
                $("#dvCargando").hide();
                alerta("Error, Estadow: " + xhr.readyState + "\nEstado: " + xhr.status);
            }
        });


        //AQUI TERMINA
    });

    function CerroMensaje() {
        if ($("#hdfEstado").val() == "") {
            $("#txtCodigo").val("");
            $("#txtNombre").val("");
            $("#txtMailPersonal").val("");
            $("#txtMailJefe").val("");
            $("#txtCodigo").focus();
        }
        else {
            //window.parent.location.reload();
            //            window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
            window.parent.tab.tabs("remove", parseInt($("#hdfBorrarTabCorrecto").val()));
            //            
        }
    }

    $("#btnCerrar").live("click", function () {

        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });
});