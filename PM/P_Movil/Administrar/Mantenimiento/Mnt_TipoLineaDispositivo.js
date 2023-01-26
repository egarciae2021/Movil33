$(function () {
    var indiceTab = window.parent.tab.tabs("option", "selected");
    
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
        var TipoLineaDispositivo = new ENT_MOV_TipoLineaDispositivo(); //P_inCod
        TipoLineaDispositivo.P_inCod = $("#hdfTipo").val();
        TipoLineaDispositivo.vcDes = $("#txtNombre").val();
        TipoLineaDispositivo.btVig = false;

        if ($('#chkEstado').is(':checked')) {
            TipoLineaDispositivo.btVig = true;
        }
        if (TipoLineaDispositivo.vcDes == "") {
            alerta("El nombre es un campo obligatorio");
            $("#txtNombre").focus();
            return;
        }

        BloquearPagina(true);
        TipoLineaDispositivo.vcDes = TipoLineaDispositivo.vcDes.replace(/'/g, "&#39");
        var oTipoLineaDispositivo = JSON.stringify(TipoLineaDispositivo);
        $.ajax({
            type: "POST",
            url: "Mnt_TipoLineaDispositivo.aspx/Guardar",
            data: "{'p_oTipoLineaDispositivo': '" + oTipoLineaDispositivo + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.d == "") {
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><img src=\"../../../Common/Images/Mantenimiento/Grabar32.png\" /><br/><h1>Tipo guardado</h1><br/", document, CerroMensaje);
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

    function CerroMensaje() {
        BloquearPagina(false);
        if ($("#hdfTipo").val() == "-1") {//Nuevo
            $("#txtNombre").val("");
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
