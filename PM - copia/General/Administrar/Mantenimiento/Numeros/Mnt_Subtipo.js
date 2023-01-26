/// <reference path="../../../../Common/Scripts/jquery-2.0.0-vsdoc.js" />

$(function () {

    $("#txtNombre").keypress(ValidarAlfaNumericoConEspacios);
    ValidarNumeroEnCajaTexto("txtCodigo", ValidarSoloNumero);

    $('#btnGuardar').button();
    $('#btnGuardar').click(function () {
        Guardar();
    });
    ActivarCombokendo("#ddlTipo", "200");

    $("#ddlTipo").data("kendoComboBox").focus();
    $("#ddlTipo").data("kendoComboBox").bind("select", function (e) {
        $("#txtCodigo").focus();
    });

    $("input[name='ddlTipo_input']").attr("disabled", true);
    $("#txtCodigo").focus();
});


function Guardar() {
    var cod = $('#hdfCod').val();
    var codTipo = $("#ddlTipo").val(); 
    var codSubtipo = $("#txtCodigo").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
    var nombre = $("#txtNombre").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");

    $("#txtNombre").keypress(ValidarAlfaNumerico);

    if (codTipo == -1) {
        alerta("Seleccione un Tipo, es un campo obligatorio");
        $("#ddlTipo").focus();
        return;
    }

    if ($.trim(codSubtipo) == "") {
        alerta("El codigo es un campo obligatorio");
        $("#txtCodigo").focus();
        return;
    }

    if ($.trim(nombre) == "") {
        alerta("El Nombre es un campo obligatorio");
        $("#txtRazonSocial").focus();
        return;
    }

    if (codSubtipo.substring(0, 1) == "0") {
        alerta("Ingrese un código válido - no se permite que el valor inicie con cero");
        $("#txtCantidad").focus();
        return;
    }

    $("#dvCargando").show();

    var esInsertar = cod == '-1';

    $.ajax({
        type: "POST",
        url: "Mnt_Subtipo.aspx/Guardar",
        data: "{'CodigoTipo': '" + $.trim(codTipo) +    
        "', 'CodigoSubTipo': '" + $.trim(codSubtipo) +
        "', 'Nombre': '" + $.trim(nombre) + 
        "', 'esInsertar': '" + esInsertar.toString() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            $("#dvCargando").hide();
            if (msg.d == "") {
                window.parent.ActualizarGrilla();
                Mensaje("<br/><h1>Subtipo guardado</h1><br/>", document, CerroMensaje);
            }
            else {
                alerta("El código del 'Sub Tipo' ya ha sido registrado anteriormente, no se pudo grabar el registro.");
                BloquearPagina(false);
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
            BloquearPagina(false);
        }
    });
}

var indiceTab = window.parent.tab.tabs("option", "selected");
function CerroMensaje() {
    BloquearPagina(false);
    if ($("#hdfCod").val() == "-1") {//Nuevo
        $("#txtCodigo").val("");
        $("#txtNombre").val("");
        $("#txtCodigo").focus();
    }
    else {//Edicion
        //window.parent.tab.tabs("remove", indiceTab);
        window.parent.tab.tabs("remove", indiceTab);
    }
    

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

$(function () {
    $('#btnCerrar').button();
    $('#btnCerrar').click(function () {
        //CerroMensaje();
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });
});

function validarEspaciosEnBlancoAlInicio() {
    var valor = $("#txtNombre").val();
    $("#txtNombre").val($.trim(valor));
}