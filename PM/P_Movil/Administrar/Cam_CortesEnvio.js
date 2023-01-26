$(function () {
    //            $("#btnDescargar").live("click", function () {
    //                var pagina = "Cam_Cortes.aspx" + "?IdCorte=" + $("#hdfIdCorte").val();
    //                $("#ifExcel").attr("src", pagina);
    //            });

    $("#btnEnviarCli").button({});

    function SatisfactoriaEnvioOperador(result) {
        if (result.d == "") {
            window.parent.ActualizarGrilla($('#hdfIdCorte').val());
            Mensaje("<h1>El Corte ha sido aprobado y pasado al estado enviado al operador, ya no podra ser modificado</h1>", document, CerroMensaje);
        }
        else {
            alerta("Hubo un problema al realizar en envio, vuelva a intentarlo");
        }
    }

    function CerroMensaje() {
        window.parent.formulario.dialog('close');
    }

    function ErrorEnvioOperador() {

    }

    $("#btnEnviarCli").live("click", function () {

        if ($("input[name='rbtnlstTipoEnvio']:checked").val() == "1") {//Descargar Detalle
            var pagina = "Cam_Cortes.aspx" + "?IdCorte=" + $("#hdfIdCorte").val() + "&RenovacionConEquipo=" + $("#hdfRenovacionConEquipo").val();
            $("#ifExcel").attr("src", pagina);
            var Metodo = raiz("P_Movil/Administrar/Cam_CortesEnvio.aspx/EnvioOperador");
            var Data = {
                IdCorte: $("#hdfIdCorte").val(), //Serializa JSON MODELO
                Situacion: $("#hdfSituacion").val()
            };
            MetodoWeb(Metodo, JSON.stringify(Data), SatisfactoriaEnvioOperador, ErrorEnvioOperador);
            $("#lblMensaje").html("Este proceso de tardara unos minutos, espere un momento");
        }
        else if ($("input[name='rbtnlstTipoEnvio']:checked").val() == "2") {//Enviar por Correo
            if ($("#txtCorreo").val() == "") {
                alerta("Es obligatorio enviar un destinatario");
                $("#txtCorreo").focus();
                return;
            }
            if (!validarEmail2($("#txtCorreo").val())) {
                alerta("Ingrese un correo válido");
                $('#txtCorreo').focus();
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
        }
    });

    $("#rbtnlstTipoEnvio").live("change", function () {
        if ($("input[name='rbtnlstTipoEnvio']:checked").val() == "2") {
            $("#dvCorreo").show();
        }
        else {
            $("#dvCorreo").hide();
        }
    });
});
