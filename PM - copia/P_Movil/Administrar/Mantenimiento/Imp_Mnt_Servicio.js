
$(function () {
    var indiceTab = window.parent.tab.tabs("option", "selected");
    $(".btnNormal").button({});

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

    $("#txtDescripcion").focusout(function () {
        $("#txtDescripcion").val($("#txtDescripcion").val().replace(/\\/g, ""));
    });

    $("#btnGuardar").click(function () {
        var Descripcion = $('#txtDescripcion').val().replace(/'/g, "&#39").replace(/\\/g, "");
        var TipoLlamada = $('#ddlTipoLlamada').val();
        var Servicio = $('#ddlServicio').val();
        var ExtraeCero = $('#chkExtraeCero').is(':checked');
        var btVig = $('#chkEstado').is(':checked');
        var btNot = $('#chkNotificar').is(':checked'); //jherrera 20130516 Nuevo checkbox

        if (Descripcion == "") {
            alerta("Ingrese la descripción del servicio del importador");
            $('#txtDescripcion').focus();
            return;
        }
        if (TipoLlamada == "-1") {
            alerta("Seleccione un tipo de llamada");
            $('#ddlTipoLlamada').focus();
            return;
        }
        if (Servicio == "-1") {
            alerta("Seleccione un servicio");
            $('#ddlServicio').focus();
            return;
        }

        BloquearPagina(true);
        $.ajax({
            type: "POST",
            url: "Imp_Mnt_Servicio.aspx/Guardar",
            data: "{'vcDes': '" + Descripcion.replace(/'/g, "&#39") + "'," +
                           "'inTipLla': '" + TipoLlamada + "'," +
                           "'inCodSer': '" + Servicio + "'," +
                           "'btExtCer': '" + ExtraeCero + "'," +
                           "'inCodSerImp': '" + $("#hdfCod").val() + "'," +
                           "'btVig': '" + btVig + "'," + //jherrera 20130516 nuevo parametro
                           "'btNot': '" + btNot + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == "0") {
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><img src=\"../../../Common/Images/Mantenimiento/Grabar32.png\" /><br/><h1>Servicio guardado</h1><br/>", document, CerroMensaje);
                }
                else {
                    alerta("La misma descripción con el mismo tipo de llamada ya han sido registrados");
                    BloquearPagina(false);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });
    });
    $("#btnCerrar").click(function () {
        window.parent.tab.tabs("remove", indiceTab);
    });
    function LimpiarTodo() {
        $('#txtDescripcion').val("");
        $("select#ddlTipoLlamada").prop('selectedIndex', 0);
        $("select#ddlServicio").prop('selectedIndex', 0);
        $("#chkExtraeCero").attr('checked', false);
        $("#chkNotificar").attr('checked', false); //jherrera 20130516 Nuevo Checkbox
    }
    function CerroMensaje() {
        BloquearPagina(false);
        if ($('#hdfCod').val() == "") {
            LimpiarTodo();
        }
        else {
            window.parent.tab.tabs("remove", indiceTab);
        }
    }
});
