$(function () {
    inicio();
    function inicio() {
        //HabilitarContenido(false);
    }

    function ValidateURL(StrURL) {
        if (/^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(StrURL)) {
            return true;
        } else {
            return false;
        }
    }

    $(".btnNormal").button({});

    $("#btnGuardar").live("click", function () {
        var CamposDinamicosClave = "";
        var CamposDinamicosGrupos = "";
        var CamposDinamicosValor = "";
        var CamposDinamicosDescripcion = "";


        if (!ValidateURL($('#txt_Valor_LinkWeb').val())) {
            alerta("Ingrese una Dirección URL válido");
            $('#txt_Valor_LinkWeb').focus();
            return;
        }

        if (!validarEmail2($('#txt_Valor_CorreoAlternativo').val())) {
            alerta("Ingrese un correo válido");
            $('#txt_Valor_CorreoAlternativo').focus();
            return;
        }

//        $(".CLAVE").each(function (i) {
//            CamposDinamicosClave += this. + ',';
//        });

        $(".VALOR").each(function (i) {            
            if ($(this).attr("obj") == 'UsarCorreoAlternativo') {
                CamposDinamicosValor += $("input[name='Opcion']:checked").val() + ',';
            } else {
                CamposDinamicosValor += this.value + ',';
            }
            CamposDinamicosClave += $(this).attr("obj") + ',';
            CamposDinamicosGrupos += $(this).attr("Grupo") + ',';
        });

        $(".DESCRIPCION").each(function (i) {
            CamposDinamicosDescripcion += this.value + ',';
        });

        HabilitarControles(false);
        $.ajax({
            type: "POST",
            url: "Mnt_ConfServicios.aspx/Guardar",
            data: "{'vcClaves': '" + CamposDinamicosClave.replace(/'/g, "&#39").replace(/\\/g, "") + "'," +
                    "'vcValores': '" + CamposDinamicosValor.replace(/'/g, "&#39").replace(/\\/g, "") + "'," +
                    "'vcGrupos': '" + CamposDinamicosGrupos.replace(/'/g, "&#39").replace(/\\/g, "") + "'," +
                    "'vcDescripcion': '" + CamposDinamicosDescripcion.replace(/'/g, "&#39").replace(/\\/g, "") + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                //Mensaje("<br/><img src=\"../../Common/Images/Mantenimiento/Grabar32.png\" /><br/><h1>Parámetros Actualizados</h1>", document, CerroMensaje);
                Mensaje("<br/><h1>Parámetros Actualizados</h1><br/>", document, CerroMensaje);                
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });

    });

    function CerroMensaje() {
        HabilitarControles(true);
        window.parent.tabOpciones.tabs("remove", window.parent.tabOpciones.tabs("option", "selected"));
    }

    function HabilitarControles(habilitar) {
        if (habilitar) {
            $("#btnGuardar").button("option", "disabled", false);
            $(".VALOR").removeAttr("disabled");
        }
        else {
            $("#btnGuardar").button("option", "disabled", true);
            $(".VALOR").attr("disabled", "disabled");
        }
    }

    $("#btnCerrar").click(function () {
        window.parent.tabOpciones.tabs("remove", window.parent.tabOpciones.tabs("option", "selected")); //modificado 23-08-2013
        //window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });

    //function CerroMensaje() {
    //BloquearPagina(false);
    //HabilitarControles(true);
    //}

    $(window).resize(function () {
        DimPosElementos();
    });


    DimPosElementos();
});


function DimPosElementos() {
    var Alto = $(window).height();
    $("#global").css({ height: Alto - 140 });
}