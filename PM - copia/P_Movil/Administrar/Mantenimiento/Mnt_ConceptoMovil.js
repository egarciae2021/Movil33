
$(function () {
    var indiceTab = window.parent.tab.tabs("option", "selected");

    ValidarNumeroEnCajaTexto("txtMonto", ValidarDecimalPositivo);


    if ($('#hdfConceptoMovil').val() == "") {
        $("#txtNombre").focus();
    } else {
        $("#txtNombre").focus().select();
    }


    IniciarPagina();
    $(".btnNormal").button();
    function IniciarPagina() {
    }
    function BloquearPagina(bloqueado) {
        $(".btnNormal").button("option", "disabled", bloqueado);

        if (bloqueado) {
            $("input").attr("disabled", "disabled");
            $("select").attr("disabled", "disabled");
        }
        else {
            $("input").removeAttr("disabled");
            $("select").removeAttr("disabled");
        }
    }

    $("#btnGuardar").live("click", function () {
        var Nombre = $("#txtNombre").val();
        var Monto = $("#txtMonto").val();
        var btVig = 0;

        if ($('#chkEstado').is(':checked')) {
            btVig = 1;
        }
        if (Nombre == "") {
            alerta("El nombre es un campo obligatorio");
            $("#txtNombre").focus();
            return;
        }
        if (Monto == "") {
            $("#txtMonto").val("0.00");
            Monto = 0;
        }

        if (Monto.substring(0, 1) == "0") {
            alerta("Ingrese un Monto válido - No se Permite que el Monto inicie con cero");
            $("#txtMonto").focus();
            return;
        }

        var Valores = Nombre + "," + Monto;
        if (Monto.indexOf('.') == -1) {
            if (Monto.length.toString() > 8) {
                alerta("El monto debe tener como máximo 8 digitos enteros y 2 decimales");
                return;
            }
        } else {
            if (Monto.indexOf('.') > 8) {
                alerta("El monto debe tener como máximo 8 digitos enteros y 2 decimales.");
                return;
            }
        }

        BloquearPagina(true);
        Valores = Valores.replace(/'/g, "&#39");
        $.ajax({
            type: "POST",
            url: "Mnt_ConceptoMovil.aspx/Guardar",
            data: "{'Valores': '" + Valores + "'," +
                   "'inCod': '" + $("#hdfConceptoMovil").val() + "'," +
                   "'btVig': '" + btVig + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.d == "") {
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><img src=\"../../../Common/Images/Mantenimiento/Grabar32.png\" /><br/><h1>Concepto movil guardado</h1><br/", document, CerroMensaje);
                }
                else {
                    alert(msg.d);
                    BloquearPagina(false);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });
    });

    function ErrorCerrarMensaje() {
        BloquearPagina(false);
    }

    function CerroMensaje() {
        BloquearPagina(false);
        if ($("#hdfConceptoMovil").val() == "") {//Nuevo
            $("#txtNombre").val("");
            $("#txtMonto").val("");
            $("#txtNombre").focus();
        }
        else {//Edicion
            window.parent.tab.tabs("remove", indiceTab);
        }
    }
    $("#btnCerrar").live("click", function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });
});