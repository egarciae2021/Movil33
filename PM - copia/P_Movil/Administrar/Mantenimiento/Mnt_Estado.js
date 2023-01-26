
$(function () {
    IniciarPagina();
    $(".btnNormal").button();
    var indiceTab = window.parent.tab.tabs("option", "selected");
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
        var Defecto = $("#chkDefecto").is(':checked');
        var btVig = 0;

        if ($('#chkEstado').is(':checked')) {
            btVig = 1;
        }

        if (Nombre == "") {
            alerta("El nombre es un campo obligatorio");
            $("#txtNombre").focus();
            return;
        }
        if (Defecto) {
            Defecto = 1;
        }
        else {
            Defecto = 0;
        }
        var Valores = Nombre + "," + Defecto;

        Valores = Valores.replace(/'/g, "&#39");

        BloquearPagina(true);
        $.ajax({
            type: "POST",
            url: "Mnt_Estado.aspx/Guardar",
            data: "{'Valores': '" + Valores + "'," +
                   "'inCodEst': '" + $("#hdfEstado").val() + "'," +
                   "'btVig': '" + btVig + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.d == "") {
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><img src=\"../../../Common/Images/Mantenimiento/Grabar32.png\" /><br/><h1>Estado guardado</h1><br/>", document, CerroMensaje);
                }
                else {
                    alert(msg.d);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });
    });

    function CerroMensaje() {
        BloquearPagina(false);
        if ($("#hdfEstado").val() == "") {
            $("#txtNombre").val("");
            $("#chkDefecto").val("");
            $("#txtNombre").focus();
        }
        else {
            window.parent.tab.tabs("remove", indiceTab);
        }
    }

    $("#btnCerrar").live("click", function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });
});