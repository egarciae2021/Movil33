//var Nametab;
//var Accord;
$(function () {
    //#region Valores Iniciales
    //Nametab = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
    //Accord = window.parent.$("#" + Nametab);

    $("#lblMensaje_ImportadorLineas").text('Las rutas deben terminar con el caracter "\\"');
    $("#lblMensaje_ImportadorDatosLinea").text('');

    $(".accordion").accordion({
        collapsible: true,
        autoHeight: false
    });
    //#endregion

    //$("#btnCerrar").live("click", function () {
    //    CerroMensaje();
    //});

    $("#btnGuardar").live("click", function () {
        if (!fnValidarRutas()) {
            return;
        }
        var Guardar_Data = { XML_Rutas: fnGenerarXML() };

        $.ajax({
            type: "POST",
            url: "Mnt_RutasServicios.aspx/Guardar",
            data: JSON.stringify(Guardar_Data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.d == "1") {
                    Mensaje("<br/><h1>Rutas de servicio guardadas.</h1><br/>", document, CerroMensaje);
                } else {
                    alerta("Error al intentar guardar las rutas ingresadas.");
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });
});

function CerroMensaje() {
    BloquearPagina(false);
    //Accord.tabs("remove", Accord.tabs("option", "selected"));
}

function fnValidarRutas() {
    var idControl = '';
    $.each($(".RutaServicio"), function () {
        if ($(this).val() == '') {
            idControl = $(this).attr("id");
        }
    });
    if (idControl != '') {
        alerta("Debe ingresar valores para todas las rutas.");
        $("#" + idControl).focus();
        return false;
    } else {
        return true;
    }
}

function fnGenerarXML() {
    var XML_Rutas = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT>";
    $.each($(".RutaServicio"), function () {
        var id = $(this).attr("id");
        var Llave = id.split("_")[1];
        var NombreServicio = id.split("_")[2];
        var Ruta = $(this).val();
        XML_Rutas += '<DATA Llave=\"' + Llave + '\" NombreServicio=\"' + NombreServicio + '\" Ruta=\"' + Ruta + '\" />';
    });
    XML_Rutas += "</ROOT>";

    return XML_Rutas;
}