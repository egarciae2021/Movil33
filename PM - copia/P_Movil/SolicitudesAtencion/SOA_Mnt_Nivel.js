var indiceTab;
var EsActualizar = false; //wapumayta 31-07-2015
$(function () {
    inicializarElementos();
    inicializarEventos();
    indiceTab = window.parent.tab.tabs("option", "selected");
    load();
    $("#txtNombre").focus();
});

function inicializarElementos() {

    $("#btnGuardar").button();
}

function inicializarEventos() {

    $("#btnGuardar").click(function () {

        if ($("#hdfIdNivel").val() != "0") {
            registrarEditarNivel();
        }
        else {
            registrarNivel();
        }
    });

    $("#btnCerrar").live("click", function () {
        window.parent.ActualizarGrilla();
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });


    $('#txtNombre,#txtDescripcion,#txtOrden').live("keypress", function (e) {

        switch ($(this).attr("id")) {

            case "txtNombre":
                return ValidarAlfaNumericoConEspacios(e);
                break;

            case "txtDescripcion":
                return ValidarAlfaNumericoConEspacios(e);
                break;

            case "txtOrden":
                return ValidarSoloNumero(e);
                break;
        }

    });
}

function load() {

    if ($("#hdfIdNivel").val() != "0") {
        EsActualizar = true;
        $.ajax({
            type: "POST",
            url: "SOA_Mnt_Nivel.aspx/ObtenerNivel",
            data: "{'prIdNivel': '" + $("#hdfIdNivel").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (resultado) {
                var resul = resultado.d;

                $("#txtNombre").val(resul[0].Nombre);
                $("#txtDescripcion").val(resul[0].Descripcion);
                $("#txtOrden").val(resul[0].Orden);
                if (resul[0].EsActivo) {
                    $("#chkActivo").attr("checked", "checked");
                    $("#EsChkActivar").css("display", "none");
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });

        $.ajax({
            type: "POST",
            url: "SOA_Mnt_Nivel.aspx/verificarCambiarOrden",
            data: "{'prIdNivel': '" + $("#hdfIdNivel").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (resultado) {
                var resul = resultado.d;

                if (resul.split('|')[0] != "OK") {
                    $("#txtOrden").attr("disabled", "disabled");
                }

            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });

    }
    else {
        $("#EsChkActivar").css("display", "none");
    }
}

//--funciones---------------------------------------------------------
function validarRegistrar() {
    var resul = false;

    if ($.trim($("#txtNombre").val()).length == 0) {
        resul = true;
        //alerta("Ingrese Nombre"); 
        Mensaje("<br/><h1>Ingrese Nombre</h1><br/>", document);
        $("#txtNombre").focus();
    }
    else {
        if ($.trim($("#txtDescripcion").val()).length == 0) {
            resul = true;
            //alerta("Ingrese Descripción");
            Mensaje("<br/><h1>Ingrese Descripción</h1><br/>", document);
            $("#txtDescripcion").focus();
        }
        else {
            if ($.trim($("#txtOrden").val()).length == 0) {
                resul = true;
                //alerta("Ingrese Orden");
                Mensaje("<br/><h1>Ingrese Orden</h1><br/>", document);
                $("#txtOrden").focus();
            }
            else {
                if (parseInt($.trim($("#txtOrden").val())) == 0) {
                    resul = true;
                    //alerta("Orden debe ser mayor a cero");
                    Mensaje("<br/><h1>Orden debe ser mayor a cero</h1><br/>", document);
                    $("#txtOrden").focus();
                }
//                else {

//                    for (var i = 0; i < Ordenes.length; i++) {
//                        if (Ordenes[i].toString() == $.trim($("#txtOrden").val())) {
//                            resul = true;
//                            //alerta("Orden debe ser mayor a cero");
//                            Mensaje("<br/><h1>Orden elegido ya ha sido asignado a otro nivel</h1><br/>", document);
//                            $("#txtOrden").focus();
//                        }
//                    }
//                
//                }           
            }
        }
    }
    return resul;
}

function registrarNivel() {

    if (validarRegistrar()) {
        return;
    }

    var i;
    for (i= 0; i < Ordenes.length; i++) {
        if (Ordenes[i].toString() == $.trim($("#txtOrden").val())) {
            Mensaje("<br/><h1>Orden elegido ya ha sido asignado a otro nivel</h1><br/>", document);
            $("#txtOrden").focus();
            return;
        }
    }

    $.ajax({
        type: "POST",
        url: "SOA_Mnt_Nivel.aspx/registrarNivel",
        data: "{'prNombre': '" + $.trim($("#txtNombre").val()) + "'," +
                "'prDescripcion': '" + $.trim($("#txtDescripcion").val()) + "'," +
                "'prOrden': '" + $.trim($("#txtOrden").val()) + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            //var resul = parseInt(resultado.d);
            var resul = resultado.d;

            if (resul.split('|')[0] != "OK") {
                alert(resul.split('|')[1]);
            }
            else {
                window.parent.ActualizarGrilla();
                Mensaje("<br/><h1>Nivel registrado</h1><br/>", document, fnCerrar);
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function registrarEditarNivel() {

    if (validarRegistrar()) {
        return;
    }

    var Activo;
    if ($("#chkActivo").prop('checked')) {
        Activo = 1;
    }
    else {
        Activo = 0;
    }

    $.ajax({
        type: "POST",
        url: "SOA_Mnt_Nivel.aspx/EditarNivel",
        data: "{'prIdNivel': '" + $("#hdfIdNivel").val() + "'," +
                "'prNombre': '" + $.trim($("#txtNombre").val()) + "'," +
                "'prDescripcion': '" + $.trim($("#txtDescripcion").val()) + "'," +
                "'prOrden': '" + $.trim($("#txtOrden").val()) + "'," +
                "'prActivo': '" + Activo + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;

            if (resul.split('|')[0] == "OK") {
                //alerta("Nivel editado exitosamente");
                window.parent.ActualizarGrilla();
                Mensaje("<br/><h1>Nivel actualizado</h1><br/>", document, fnCerrar);
                //window.location.href = "SOA_Mnt_Nivel.aspx?cod=" + $("#hdfIdNivel").val();
            }
            else {
                //alert(resul.split('|')[1])
                Mensaje("<br/><h1>" + resul.split('|')[1] + "</h1><br/>", document, fnCerrar);
            }


        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}
//--------------------------------------------------------------------

function fnCerrar() {
    if (EsActualizar) {
        window.parent.ActualizarGrilla();
        window.parent.tab.tabs("remove", indiceTab);
    } 
    else {
        fnLimpiar();
    }

}

function fnLimpiar() {
    $('#txtNombre,#txtDescripcion,#txtOrden').val("");
    $('#txtNombre').focus();
}