$(function () {

    if ($("#chkActivar").prop("checked")) {
        $(".EsActivar").css("display", "none");
    }

    if ($("#hdfIdTemporizador").val() == "-1") {
        $(".EsActivar").css("display", "none");
    }


    $("#btnCerrar").live("click", function () {
        window.parent.ActualizarGrilla();
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });

    $('#txtNombre,#txtTiempo').live("keypress", function (e) {
        switch ($(this).attr("id")) {
            case "txtNombre":
                return ValidarAlfaNumericoConEspacios(e);
                break;
            case "txtTiempo":
                return ValidarSoloNumero(e);
                break;
        }
    });

    $("#btnGuardar").click(function () {
        grabar();
    });

});

function grabar() {

    if (fnValidar()) {
        return;
    }

    var Reiniciar = $("#chkReiniciar").prop("checked") ? 1 : 0;
    var Activo;

    if ($("#hdfIdTemporizador").val() != "-1") {
        Activo = $("#chkActivar").prop("checked") ? 1 : 0;
    }
    else {
        Activo = 1;
    }
    


    $.ajax({
        type: "POST",
        url: "Mnt_SEG_Temporizador.aspx/grabar",
        data: "{'prIdTemporizador': '" + $("#hdfIdTemporizador").val() + "'," +
                "'prDescripcion': '" + $.trim($("#txtNombre").val()) + "'," +
                "'prTiempo': '" + $.trim($("#txtTiempo").val()) + "'," +
                "'prReiniciar': '" + Reiniciar + "'," +
                "'prActivo': '" + Activo + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;

            if (resul.split('|')[0] == "OK") {
                Mensaje("<br/><h1>Temporizador registrado</h1><br/>", document, fnCerrar);
            }
            else {
                alert(resul.split('|')[1]);
            }


            
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function fnCerrar() {
    if ($("#hdfIdTemporizador").val() != "-1" ) {
        window.parent.ActualizarGrilla();
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    }
    else {
        fnLimpiar();
    }

}

function fnLimpiar() {
    $("#txtNombre").val("");
    $("#txtTiempo").val("");
    $("#chkReiniciar").prop("checked",false);
    $("#chkActivar").prop("checked", false);
    $(".EsActivar").css("display", "none");
}

function fnValidar() {
    var resul = false;

    if ($.trim($("#txtNombre").val()) == "") {
        window.top.alerta("Ingrese nombre de temporizador");
        resul = true;
    }
    else {
        if ($.trim($("#txtTiempo").val()) == "") {
            window.top.alerta("Ingrese tiempo de temporizador");
            resul = true;
        }
        else {
            if (parseInt( $.trim($("#txtTiempo").val())) <= 0) {
                window.top.alerta("Tiempo debe ser mayor a cero");
                resul = true;
            }
        }
    }

    return resul;
}