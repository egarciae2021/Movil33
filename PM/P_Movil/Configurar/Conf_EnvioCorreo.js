var MargenFiltro = 0;
var MargenHeight = 48;
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

//var indiceTab;
function CerroMensaje() {
    BloquearPagina(false);
}

function inicioPagina() {
    DimPosElementos();
}

function isIE() { //Vefiricar Version del Internet Explorer
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    var AnchoLateral = $(".LateralSplitter");
    $(".tabs").css({ height: Alto - 15, width: Ancho - AnchoLateral, marginbotton: 0, paddingbotton: 0 });

    $(".Splitter").css({ height: Alto - 18 });
    $("#grid").setGridWidth($(window).width() - 31);
    $("#grid").setGridHeight($(window).height() - 145 - MargenFiltro * MargenHeight);
}

$(function () {
    inicioPagina();

    $(window).resize(function () {
        DimPosElementos();
    });

    ValidarNumeroEnCajaTexto("txtNumDiaPre", ValidarEnteroPositivo);
    $("#txtNumDiaPre").change(function () {
        if ($("#txtNumDiaPre").val() != "") {
            document.getElementById('lblMensaje').innerHTML = "Se enviará una alerta acerca de la Fecha de Entrega del dispositivo con " + $("#txtNumDiaPre").val() + " días de anticipación de la fecha de entrega.";
        }
    });

    $(".btnNormal").button();

    if (isIE() == 6) {
        $("#btnCerrar").css('width', '100px');
        $("#btnGuardar").css('width', '100px');
        $("#btnCerrar").css('display', 'inline-block');
        $("#btnGuardar").css('display', 'inline-block');
    }

    $("#btnCerrar").click(function () {
        var tab1 = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
        var Accord = window.parent.$("#" + tab1);
        Accord.tabs("remove", Accord.tabs("option", "selected"));
    });
    
    $("#txtCorAdi").focusout(function () {
        $("#txtCorAdi").val($("#txtCorAdi").val().replace(/\\/g, ""));
    });

    $("#btnGuardar").live("click", function () {
        var vcCorAdi = $("#txtCorAdi").val().replace(/'/g, "&#39").replace(/\\/g, "");
        var inNumDiaPre = $("#txtNumDiaPre").val().replace(/'/g, "&#39");

        if (!validarEmail2(vcCorAdi)) {
            alerta("Ingrese un correo válido");
            $('#txtCorAdi').focus();
            return;
        }

        if (inNumDiaPre == "") {
            alerta("Número de Días previos es requerido.");
            $("#txtNumDiaPre").focus();
            return;
        }

        BloquearPagina(true);
        $.ajax({
            type: "POST",
            url: "Conf_EnvioCorreo.aspx/Guardar",
            data: "{'vcCorAdi': '" + vcCorAdi.replace(/\\/g, "") + "'," +
                  "'inNumDiaPre': '" + inNumDiaPre + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == "0") {
                    Mensaje("<br/><h1>Parámetros de Envío de Correo Guardados</h1><br/><h2></h2>", document, CerroMensaje);
                }
                else {
                    alerta("No se Pudo Grabar el Registro");
                    BloquearPagina(false);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });
    });
});