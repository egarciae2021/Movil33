$(function () {
    inicio();
    function inicio() {
    }

    $(".btnNormal").button({});

    $("#txtCorreo").keypress(function () {

    });

    $("#txtCorreoAlternativo").keypress(function () {

    });

    $("#ddlNotificacion").change(function () {
        var inCodNot = $("#ddlNotificacion").val();
        if (inCodNot == "-1") {
            $("#dvDatos").hide();
            $("#btnGuardar").button("option", "disabled", true);
        }
        else {
            $.ajax({
                type: "POST",
                url: "Conf_NotificacionSolicitud.aspx/Mostrar",
                data: "{'inCodNot': '" + inCodNot + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    $("#dvDatos").show();

                    $("#chkNotificacionAdministrador").attr('checked', result.d.btEnvCorAdm);
                    if (result.d.btEnvCorAdm) {
                        $("#txtTituloAdministrador").val(result.d.vcTitCorAdm);
                        $("#txtCorreoAdministrador1").val(result.d.vcCorAdm1);
                        $("#txtCorreoAdministrador2").val(result.d.vcCorAdm2);
                        $("#txtCorreoAdministrador3").val(result.d.vcCorAdm3);
                        HabilitarAdministrador(true);
                    }
                    else {
                        HabilitarAdministrador(false);
                    }

                    $("#chkNotificacionUsuario").attr('checked', result.d.btEnvCorUsu);
                    if (result.d.btEnvCorUsu) {
                        $("#txtCorreoAdministrador3").val(result.d.vcTitCorUsu);                        
                        HabilitarUsuario(true);
                    }
                    else {
                        HabilitarUsuario(false);
                    }

                    $("#btnGuardar").button("option", "disabled", false);
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
    });

    $("#btnGuardar").click(function () {
        var inCodNot = $("#ddlNotificacion").val();
        var EnviarAdministrador = $('#chkNotificacionAdministrador').is(':checked');
        var EnviarUsuario = $('#chkNotificacionUsuario').is(':checked');
        var TituloAdministrador = "";
        var CorreoAdministrador1 = "";
        var CorreoAdministrador2 = "";
        var CorreoAdministrador3 = "";
        var TituloUsuario = "";

        if (EnviarAdministrador) {
            var TituloAdministrador = $("#txtTituloAdministrador").val();
            var CorreoAdministrador1 = $("#txtCorreoAdministrador1").val();
            var CorreoAdministrador2 = $("#txtCorreoAdministrador2").val();
            var CorreoAdministrador3 = $("#txtCorreoAdministrador3").val();

            if (TituloAdministrador == "") {
                alerta("Ingrese el asunto del correo a enviar");
                $('#txtTituloAdministrador').focus();
                return;
            }
            if (CorreoAdministrador1 == "") {
                alerta("Ingrese un correo");
                $('#txtCorreoAdministrador1').focus();
                return;
            }
            if (!validarEmail2($("#txtCorreoAdministrador1").val())) {
                alerta("Ingrese un correo válido");
                $('#txtCorreoAdministrador1').focus();
                return;
            }
            if (!validarEmail2($("#txtCorreoAdministrador2").val()) && $("#txtCorreoAdministrador2").val() != "") {
                alerta("Ingrese un Correo Alternativo válido");
                $('#txtCorreoAdministrador2').focus();
                return;
            }
            if (!validarEmail2($("#txtCorreoAdministrador3").val()) && $("#txtCorreoAdministrador3").val() != "") {
                alerta("Ingrese un Correo Alternativo válido");
                $('#txtCorreoAdministrador3').focus();
                return;
            }
            if (CorreoAdministrador1 == CorreoAdministrador2) {
                alerta("Ingrese un correo alternativo 1 diferente al correo principal");
                $('#txtCorreoAdministrador2').focus();
                return;
            }
            if (CorreoAdministrador2 == CorreoAdministrador3 && CorreoAdministrador2 !="") {
                alerta("Ingrese un correo alternativo 1 diferente al correo alternativo 2");
                $('#txtCorreoAdministrador2').focus();
                return;
            }
            if (CorreoAdministrador1 == CorreoAdministrador3) {
                alerta("Ingrese un correo alternativo 2 diferente al correo principal");
                $('#txtCorreoAdministrador2').focus();
                return;
            }
        }

        if (EnviarUsuario) {
            TituloUsuario = $("#txtTituloUsuario").val();
            if (TituloUsuario == "") {
                alerta("Ingrese el asunto del correo a enviar");
                $('#txtTituloUsuario').focus();
                return;
            }
        }

        HabilitarControles(false);
        $.ajax({
            type: "POST",
            url: "Conf_NotificacionSolicitud.aspx/Guardar",
            data: "{'inCodNot': '" + inCodNot + "'," +
                   "'vcCorAdm1': '" + CorreoAdministrador1.replace(/'/g, "&#39") + "'," +
                   "'vcCorAdm2': '" + CorreoAdministrador2.replace(/'/g, "&#39") + "'," +
                   "'vcCorAdm3': '" + CorreoAdministrador3.replace(/'/g, "&#39") + "'," +
                   "'vcTitCorAdm': '" + TituloAdministrador.replace(/'/g, "&#39") + "'," +
                   "'btEnvCorAdm': '" + EnviarAdministrador + "'," +
                   "'vcTitCorUsu': '" + TituloUsuario.replace(/'/g, "&#39") + "'," +
                   "'btEnvCorUsu': '" + EnviarUsuario + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == "") {
                    Mensaje("<br/><img src=\"../../Common/Images/Mantenimiento/Grabar32.png\" /><br/><h1>Registro guardado</h1>", document, CerroMensaje);
                }
                else {
                    alert(result.d);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

    $("#chkNotificacionAdministrador").change(function () {
        if ($(this).is(':checked')) {
            HabilitarAdministrador(true);
        }
        else {
            HabilitarAdministrador(false);
        }
    });

    $("#chkNotificacionUsuario").change(function () {
        if ($(this).is(':checked')) {
            HabilitarUsuario(true);
        }
        else {
            HabilitarUsuario(false);
        }
    });

    function HabilitarAdministrador(habilitar) {
        if (habilitar) {

        }
        else {
            $("#txtTituloAdministrador").val("");
            $("#txtCorreoAdministrador1").val("");
            $("#txtCorreoAdministrador2").val("");
            $("#txtCorreoAdministrador3").val("");
        }
    }

    function HabilitarUsuario(habilitar) {
        if (habilitar) {

        }
        else {
            $("#txtTituloUsuario").val("");
        }
    }

    function CerroMensaje() {
        HabilitarControles(true);
    }

    function HabilitarControles(habilitar) {
        if (habilitar) {
            $("#btnGuardar").button("option", "disabled", false);
            $(".txtNormal").removeAttr("disabled");
            $("#ddlNotificacion").removeAttr("disabled");
            $('#chkEnviar').removeAttr("disabled");
        }
        else {
            $("#btnGuardar").button("option", "disabled", true);
            $(".txtNormal").attr("disabled", "disabled");
            $("#ddlNotificacion").attr("disabled", "disabled");
            $('#chkEnviar').attr("disabled", "disabled");
        }
    }
    $("#btnCerrar").click(function () {
        window.parent.tabOpciones.tabs("remove", window.parent.tabOpciones.tabs("option", "selected"));
    });
});