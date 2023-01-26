        $(function () {
            $("#btnEnviarCli").button({});

            $("#btnEnviarCli").click(function () {
                if ($("#txtDestinatarios").val() == "") {
                    alerta("Es obligatorio enviar un destinatario");
                    $("#txtDestinatarios").focus();
                    return;
                }
                if (!validarEmail2($("#txtDestinatarios").val())) {
                    alerta("Ingrese un correo válido");
                    $('#txtDestinatarios').focus();
                    return;
                }
                if ($("#txtAsunto").val() == "") {
                    alerta("Es obligatorio enviar un asunto");
                    $("#txtAsunto").focus();
                    return;
                }

                $("#btnEnviar").click();
                $("#lblMensaje").html("Enviando Correo Electronico...");
                $("input").attr("disabled", "disabled");
                $("textarea").attr("disabled", "disabled");
                $("#btnEnviarCli").button("option", "disabled", true);
            });
        });