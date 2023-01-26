var EsActualizar = false;
var nivelAnterior;
var indiceTab;
$(function () {
    indiceTab = window.parent.tab.tabs("option", "selected");
    InicializarElementos();
    InicializarEventos();
    load();

});

function InicializarElementos() {
    $(".boton").button();

    if ($("#hdfIdBolsa").val() != "0") {
        EsActualizar = true;
    }
    else {
        $("#trAutomatico").hide();
    }
}

function InicializarEventos() {

    $("#btnCerrar").live("click", function () {
        window.parent.ActualizarGrilla();
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });

    $("#btnAgregar").click(function () {
        agregarBolsaEscalar();
    });

    $("#btnQuitar").click(function () {
        removerBolsaEscalar();
    });

    $("#btnVerArbol").click(function () {
        $('#ifArbol').attr("src", "SOA_BolsasDependencias.aspx");

        $('#dvArbol').dialog({
            title: "Dependencias de bolsas",
            height: 410,
            width: 410,
            modal: true
        });

    });

    $("#ddlNivel").focus(function () {
        nivelAnterior = $("#ddlNivel").val();
    });

    $("#ddlNivel").change(function (event) {

        if ($("#hdfIdBolsa").val() != "0" && $("#listaBolsas option").length > 0) {
            $("#ddlNivel").val(nivelAnterior);
            //alerta("Solo puede cambiar de nivel si no tiene bolsas elegidas");
            Mensaje("<br/><h1>Solo puede cambiar de nivel <br/> si no tiene bolsas elegidas</h1><br/>", document);
            return;
        }

        if ($("#ddlNivel option:selected").val() != "1-1") //No mostrar automatico para nivel Base
        {
            $("#trAutomatico").hide();
            $("#chkAutomatico").prop("checked", false);
        }
        else {
            var estadocheck = $("#chkEsExterno").is(":checked");
            //alert(estadocheck);
            if (estadocheck == true) {
                $("#trAutomatico").show();
                $("#chkAutomatico").prop("checked", false);
            }
        }


        //$("#chkEsExterno").prop("checked", false);


        obtenerBolsa_porNivel();

    });

    $("#btnGuardar").click(function () {
        if ($("#hdfIdBolsa").val() == "0") {
            registrarBolsa();
        }
        else {
            registrarEditarBolsa();
        }
    });

    $('#txtNombre,#txtDescripcion').live("keypress", function (e) {

        switch ($(this).attr("id")) {

            case "txtNombre":
                //return ValidarAlfaNumericoConEspaciosYCaracteres(e);
                return ValidarAlfaNumericoConEspacios(e);
                break;

            case "txtDescripcion":
                //return ValidarAlfaNumericoConEspaciosYCaracteres(e);
                return ValidarAlfaNumericoConEspacios(e);
                break;
        }

    });

    $("#chkEsExterno").click(function () {

        if ($(this).prop('checked')) {
            //alert($("#ddlNivel option:selected").val());

            if ($("#ddlNivel option:selected").val() != "1-1") //No mostrar automatico para nivel Base
            {
                $("#trAutomatico").hide();
                $("#chkAutomatico").prop("checked", false);
            }
            else 
            {
                $("#trAutomatico").show();
            }
        }
        else {
            $("#trAutomatico").hide();
            $("#chkAutomatico").prop("checked", false);
        }

    });
}

function load() {

    $.ajax({
        type: "POST",
        url: "SOA_Mnt_Bolsas.aspx/ListarNivelVigentes",
        data: "{'prIdNivel': '-1'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;

            var i;
            for (i = 0; i < resul.length; i++) {
                $("#ddlNivel").append("<option value='" + resul[i].IdNivel.toString() + "-" + resul[i].Orden.toString() + "' >" + resul[i].Nombre.toString() + "</option>");
            }
            if ($("#hdfIdBolsa").val() == "0") {
                $("#EsChkActivar").css("display", "none");
                obtenerBolsa_porNivel();
            }
            else {
                obtenerDatosBolsa();
            }

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

//-----funciones-------

function obtenerDatosBolsa() {

    $.ajax({
        type: "POST",
        url: "SOA_Mnt_Bolsas.aspx/ListarBolsa_dependencias",
        data: "{'prIdBolsa': '" + $("#hdfIdBolsa").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;

            $("#txtNombre").val(resul[0].Nombre);
            $("#txtDescripcion").val(resul[0].Descripcion);

            if (resul[0].EsActivo) {
                $("#chkActivo").attr("checked", "checked");
                $("#EsChkActivar").css("display", "none");
            }


            $("#chkEsExterno").prop("checked", resul[0].EsExterno);
            $("#chkAutomatico").prop("checked", resul[0].EsAutomatico);

            if ($("#chkEsExterno").prop("checked")) {
                $("#trAutomatico").show();
            }
            else {
                $("#trAutomatico").hide();
            }

            var estaut = $("#chkAutomatico").is(":checked");

            var idNivel = resul[0].IdNivel.toString();
            var niveles = $("#ddlNivel option");

            var n;
            for (n = 0; n < niveles.length; n++) {
                if ($(niveles[n]).val().split('-')[0] == idNivel) {
                    $("#ddlNivel").val($(niveles[n]).val());
                    break;
                }
            }


            //MANUEL
            /*
            if (idNivel == 6) {
            $("#ddlNivel").append("<option value='6-0'>Nivel General</option>");
            $("#ddlNivel").val("6-0");

            $("#txtNombre").attr("disabled", "disabled");
            $("#txtDescripcion").attr("disabled", "disabled");
            $("#ddlNivel").attr("disabled", "disabled");
            $("#ddlBolsasEscalar").attr("disabled", "disabled");
            $("#listaBolsas").attr("disabled", "disabled");

            $("#btnAgregar").button("option", "disabled", true);
            $("#btnQuitar").button("option", "disabled", true);
            $("#btnVerArbol").button("option", "disabled", true);
            }
            */

            var i;
            for (i = 0; i < resul[0].BolsasSinEscalar.length; i++) {
                $("#ddlBolsasEscalar").append("<option value='" + resul[0].BolsasSinEscalar[i].IdBolsa.toString() + "-" + resul[0].BolsasSinEscalar[i].IdNivel.toString() + "' >" + resul[0].BolsasSinEscalar[i].Nombre.toString() + "</option>");
            }

            var k;
            for (k = 0; k < resul[0].BolsasEscaladas.length; k++) {
                $("#listaBolsas").append("<option value='" + resul[0].BolsasEscaladas[k].IdBolsa.toString() + "-" + resul[0].BolsasEscaladas[k].IdNivel.toString() + "' >" + resul[0].BolsasEscaladas[k].Nombre.toString() + "</option>");
            }


            //MANUEL
            //alert($("#ddlNivel option:selected").val());
            if ($("#ddlNivel option:selected").val() != "1-1") {
                $("#trAutomatico").hide();
                $("#chkAutomatico").prop("checked", "false");
            }
            else {
                if ($("#chkEsExterno").is(":checked") == true) {
                    $("#trAutomatico").show();
                    $("#chkAutomatico").prop("checked", estaut);
                }
            }
            //MANUEL
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function obtenerBolsa_porNivel() {

    $.ajax({
        type: "POST",
        url: "SOA_Mnt_Bolsas.aspx/ListarBolsa_porNivel",
        data: "{'prIdNivel': '" + $("#ddlNivel").val().split('-')[0].toString() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;
            $("#ddlBolsasEscalar").html("");
            $("#listaBolsas").html("");

            var i;
            for (i = 0; i < resul.length; i++) {
                $("#ddlBolsasEscalar").append("<option value='" + resul[i].IdBolsa.toString() + "-" + resul[i].IdNivel.toString() + "' >" + resul[i].Nombre.toString() + "</option>");
            }

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function agregarBolsaEscalar() {
    if ($("#ddlBolsasEscalar option:selected").length > 0) {
        $("#listaBolsas").append("<option value='" + $("#ddlBolsasEscalar").val().toString() + "'>" + $("#ddlBolsasEscalar option:selected").text().toString() + "</option>");
        $("#ddlBolsasEscalar option[value=" + $("#ddlBolsasEscalar").val() + "]").remove();
    }

}

function removerBolsaEscalar() {

    if ($("#listaBolsas option:selected").length > 0) {

        if ($("#hdfIdBolsa").val() == "0") {

            $("#ddlBolsasEscalar").append("<option value='" + $("#listaBolsas").val().toString() + "'>" + $("#listaBolsas option:selected").text().toString() + "</option>");
            $("#listaBolsas option[value=" + $("#listaBolsas").val() + "]").remove();
            return;

        }

        $.ajax({
            type: "POST",
            url: "SOA_Mnt_Bolsas.aspx/verificarEliminarEscalamiento",
            data: "{'prIdBolsaBase': '" + $("#hdfIdBolsa").val() + "'," +
                "'prIdBolsaFinal': '" + $("#listaBolsas").val().split('-')[0] + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (resultado) {
                var resul = resultado.d;

                if (resul.split('|')[0] == "OK") {
                    if ($("#listaBolsas option:selected").length > 0) {
                        $("#ddlBolsasEscalar").append("<option value='" + $("#listaBolsas").val().toString() + "'>" + $("#listaBolsas option:selected").text().toString() + "</option>");
                        $("#listaBolsas option[value=" + $("#listaBolsas").val() + "]").remove();
                        return;
                    }
                }

                //alert(resul.split('|')[1] + ", no se puede eliminar escalamiento")

                Mensaje("<br/><h1>" + resul.split('|')[1] + ",<br/> no se puede eliminar escalamiento</h1><br/>", document);
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
}

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
    }

    return resul;
}

function registrarBolsa() {

    if (validarRegistrar()) {
        return;
    }

    var Escalamientos = $("#listaBolsas option");

    var XML = '<?xml version="1.0" encoding="iso-8859-1"?><TABLE>';

    if (Escalamientos.length == 0) {
        XML = "";
    }
    else {
        var i;
        for (i = 0; i < Escalamientos.length; i++) {
            XML = XML + '<BOLSA><IdBolsa>' + $(Escalamientos[i]).val().split('-')[0].toString() + '</IdBolsa></BOLSA>';
        }

        XML = XML + '</TABLE>';
    }

    var esExterno;
    if ($("#chkEsExterno").prop('checked')) {
        esExterno = 1;
    }
    else {
        esExterno = 0;
    }

    var esAutomatico;
    if ($("#chkAutomatico").prop('checked')) {
        esAutomatico = 1;
    }
    else {
        esAutomatico = 0;
    }

    $.ajax({
        type: "POST",
        url: "SOA_Mnt_Bolsas.aspx/registrarBolsa",
        data: "{'prNombre': '" + $.trim($("#txtNombre").val()) + "'," +
                "'prDescripcion': '" + $.trim($("#txtDescripcion").val()) + "'," +
                "'prIdNivel': '" + $("#ddlNivel").val().split('-')[0].toString() + "'," +
                "'prXml': '" + XML + "'," +
                "'pEsExterno': '" + esExterno + "'," +
                "'pEsAutomatico': '" + esAutomatico + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = parseInt(resultado.d);

            //if (resul > 0) {
            //alerta("Registro exitoso");
            window.parent.ActualizarGrilla();

            $("#chkEsExterno").prop("checked", false);
            $("#chkAutomatico").prop("checked", false);
            $("#trAutomatico").hide();

            Mensaje("<br/><h1>Bolsa registrada</h1><br/>", document, fnCerrar);
            //window.location.href = "SOA_Mnt_Bolsas.aspx";
            //            }
            //            else
            //                alerta("Error al registrar bolsa");


        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}
//----------------------

function registrarEditarBolsa() {

    if (validarRegistrar()) {
        return;
    }

    var Escalamientos = $("#listaBolsas option");

    var XML = '<?xml version="1.0" encoding="iso-8859-1"?><TABLE>';

    if (Escalamientos.length == 0) {
        XML = "";
    }
    else {
        var i;
        for (i = 0; i < Escalamientos.length; i++) {
            XML = XML + '<BOLSA><IdBolsa>' + $(Escalamientos[i]).val().split('-')[0].toString() + '</IdBolsa></BOLSA>';
        }

        XML = XML + '</TABLE>';
    }

    var Activo;
    if ($("#chkActivo").prop('checked')) {
        Activo = 1;
    }
    else {
        Activo = 0;
    }

    var esExterno;
    if ($("#chkEsExterno").prop('checked')) {
        esExterno = 1;
    }
    else {
        esExterno = 0;
    }

    var esAutomatico;
    if ($("#chkAutomatico").prop('checked')) {
        esAutomatico = 1;
    }
    else {
        esAutomatico = 0;
    }

    $.ajax({
        type: "POST",
        url: "SOA_Mnt_Bolsas.aspx/EditarBolsa",
        data: "{'prIdBolsa': '" + $("#hdfIdBolsa").val() + "'," +
                "'prNombre': '" + $.trim($("#txtNombre").val()) + "'," +
                "'prDescripcion': '" + $.trim($("#txtDescripcion").val()) + "'," +
                "'prIdNivel': '" + $("#ddlNivel").val().split('-')[0].toString() + "'," +
                "'prXml': '" + XML + "'," +
                "'prActivo': '" + Activo + "'," +
                "'pEsExterno': '" + esExterno + "'," +
                "'pEsAutomatico': '" + esAutomatico + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;

            if (resul.split('|')[0] == "OK") {
                //alerta("Actualización exitosa");
                Mensaje("<br/><h1>Bolsa actualizada</h1><br/>", document, fnCerrar);
                //window.location.href = "SOA_Mnt_Bolsas.aspx?cod=" + $("#hdfIdBolsa").val();
            }
            else {
                //alert(resul.split('|')[1]);
                Mensaje("<br/><h1>" + resul.split('|')[1] + "</h1><br/>", document);
            }


        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

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
    window.parent.ActualizarGrilla();
    $("#txtNombre,#txtDescripcion").val("");
    $("#ddlNivel").html("");
    load();
    $("#txtNombre").focus();
}