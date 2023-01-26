$(function () {
    inicio();
    function inicio() {
        //HabilitarContenido(false);
    }

    $(".btnNormal").button({});

    $("#txtCorreo").keypress(function () {

    });
    $("#txtCorreoAlternativo").keypress(function () {

    });

    $("#ddlNotificacion").change(function () {
        var inCodNot = $("#ddlNotificacion").val();
        if (inCodNot == "-1") {
            //LimpiarTodo();
            //HabilitarContenido(false);
            $("#trEnviar").hide();
            $("#btnGuardar").button("option", "disabled", true);
            $("#dvDatos").hide();
        }
        else {
            $.ajax({
                type: "POST",
                url: "Imp_Notificacion.aspx/Mostrar",
                data: "{'inCodNot': '" + inCodNot + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    //HabilitarContenido(true);
                    $("#chkEnviar").attr('checked', result.d.btEnv);
                    $("#trEnviar").show();
                    $("#txtCorreo").val(result.d.vcCor);
                    $("#txtAsunto").val(result.d.vcAsu);
                    $("#txtCorreoAlternativo").val(result.d.vcCorAlt);

                    if (result.d.btEnv) {
                        $("#dvDatos").show();
                    }
                    else {
                        $("#dvDatos").hide();
                    }
                    $("#btnGuardar").button("option", "disabled", false);
                    //Mensaje("<br/><h1>Notificación guardada</h1><br/>", document, CerroMensaje);
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
    });

//    $("#txtAsunto").keyup(function (e) {
//        $("#txtAsunto").val($("#txtAsunto").val().replace(/\\/g, ""));
//    });

//    $("#txtCorreo").keyup(function (e) {
//        $("#txtCorreo").val($("#txtCorreo").val().replace(/\\/g, ""));
//    });

//    $("#txtCorreoAlternativo").keyup(function (e) {
//        $("#txtCorreoAlternativo").val($("#txtCorreoAlternativo").val().replace(/\\/g, ""));
//    });

    $("#txtAsunto").focusout(function () {
        $("#txtAsunto").val($("#txtAsunto").val().replace(/\\/g, ""));
    });

    $("#txtCorreo").focusout(function () {
        $("#txtCorreo").val($("#txtCorreo").val().replace(/'/g, "").replace(/\\/g, ""));
    });

    $("#txtCorreoAlternativo").focusout(function () {
        $("#txtCorreoAlternativo").val($("#txtCorreoAlternativo").val().replace(/'/g, "").replace(/\\/g, ""));
    });


    $("#btnGuardar").click(function () {
        var inCodNot = $("#ddlNotificacion").val();
        var Enviar = $('#chkEnviar').is(':checked');
        var Correo = "";
        var CorreoAlternativo = "";
        var Asunto = "";

        if (inCodNot == '-1') {
            alerta("Seleccionar un tipo de notificación");
            $('#ddlNotificacion').focus();
            return;
        }

        if (Enviar) {
            Correo = $("#txtCorreo").val().replace(/'/g, "").replace(/\\/g, "");
            CorreoAlternativo = $("#txtCorreoAlternativo").val().replace(/'/g, "").replace(/\\/g, "");
            Asunto = $("#txtAsunto").val().replace(/\\/g, "");

            if (Correo == "") {
                alerta("Ingrese un correo");
                $('#txtCorreo').focus();
                return;
            }
            if (!validarEmail2($("#txtCorreo").val())) {
                alerta("Ingrese un correo válido");
                $('#txtCorreo').focus();
                return;
            }
            if (Correo == CorreoAlternativo) {
                alerta("Ingrese un correo alternativo diferente al correo principal");
                $('#txtCorreoAlternativo').focus();
                return;
            }
            if (!validarEmail2($("#txtCorreoAlternativo").val()) && $("#txtCorreoAlternativo").val() != "") {
                alerta("Ingrese un Correo Alternativo válido");
                $('#txtCorreoAlternativo').focus();
                return;
            }
            if (Asunto == "") {
                alerta("Ingrese el asunto del correo a enviar");
                $('#txtAsunto').focus();
                return;
            }
        }

        HabilitarControles(false);
        $.ajax({
            type: "POST",
            url: "Imp_Notificacion.aspx/Guardar",
            data: "{'inCodNot': '" + inCodNot + "'," +
                           "'btEnv': '" + Enviar + "'," +
                           "'vcAsu': '" + Asunto.replace(/'/g, "&#39").replace(/\\/g, "") + "'," +
                           "'vcCor': '" + Correo.replace(/'/g, "").replace(/\\/g, "") + "'," +
                           "'vcCorAlt': '" + CorreoAlternativo.replace(/'/g, "").replace(/\\/g, "") + "'}",
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

    $("#chkEnviar").change(function () {
        if ($(this).is(':checked')) {
            $("#dvDatos").show();
        }
        else {
            $("#dvDatos").hide();
        }
    });

    //            function LimpiarTodo() {
    //                $("#txtCorreo").val("");
    //                $("#chkEnviar").attr('checked', false);
    //                $("#txtAsunto").val("");
    //                $("#txtCorreoAlternativo").val("");
    //            }
    function CerroMensaje() {
        HabilitarControles(true);
        //                if ($("#chkEnviar").is(':checked'))
        //                    $(".txtNormal").removeAttr("disabled");
        //                else
        //                    $(".txtNormal").attr("disabled", "disabled");
    }
    //            function HabilitarContenido(habilitar) {
    //                if (habilitar) {
    //                    $("#btnGuardar").button("option", "disabled", false);
    //                    $(".txtNormal").removeAttr("disabled");
    //                    $("#dvDatos").removeAttr("disabled");
    //                }
    //                else {
    //                    $("#btnGuardar").button("option", "disabled", true);
    //                    $(".txtNormal").attr("disabled", "disabled");
    //                    $("#dvDatos").attr("disabled", "disabled");
    //                }
    //            }
    function HabilitarControles(habilitar) {
        if (habilitar) {
            $("#btnGuardar").button("option", "disabled", false);
            $("#txtAsunto").removeAttr("disabled");
            $("#ddlNotificacion").removeAttr("disabled");
            $('#chkEnviar').removeAttr("disabled");
        }
        else {
            $("#btnGuardar").button("option", "disabled", true);
            $("#txtAsunto").attr("disabled", "disabled");
            $("#ddlNotificacion").attr("disabled", "disabled");
            $('#chkEnviar').attr("disabled", "disabled");
        }
    }
    $("#btnCerrar").click(function () {
        window.parent.tabOpciones.tabs("remove", window.parent.tabOpciones.tabs("option", "selected"));
    });
});