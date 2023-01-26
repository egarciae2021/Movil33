var esTecnicoDialog;
var esRegistrar;
var indiceTab;
$(function () {
    indiceTab = window.parent.tab.tabs("option", "selected");
    $("#btnCerrar").live("click", function () {
        window.parent.ActualizarGrilla();
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });

    $("#btnBuscarUsuarioTecnico").click(function () {
        esTecnicoDialog = true;
        var $width = 730;
        var $height = 475; //455;
        var $Pagina = '../AdministrarTickets/AdmTck_BuscarUsuario.aspx';
        $("#ifArea").attr("src", $Pagina);
        Modal = $('#dvArea').dialog({
            title: "Seleccionar usuario",
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
    });

    $("#btnBuscarUsuarioSupervisor").click(function () {
        esTecnicoDialog = false;
        var $width = 730;
        var $height = 475;
        var $Pagina = '../AdministrarTickets/AdmTck_BuscarUsuario.aspx';
        $("#ifArea").attr("src", $Pagina);
        Modal = $('#dvArea').dialog({
            title: "Seleccionar usuario",
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
    });

    $("#ddlNiveles").change(function () {
        obtenerBolsa_porNivel();
    });

    $("#imgAgregar").click(function () {
        agregarBolsaEscalar();
    });

    $("#imgQuitar").click(function () {
        removerBolsaEscalar();
    });


    if ($("#hdfIdTecnicoSupervisor").val() == "0") {
        $("#EsChkActivar").css("display", "none");
        loadRegistrar();
        esRegistrar = true;
    }
    else {
        loadEditar();
        esRegistrar = false;
    }

    $("#btnGuardar").click(function () {
        if (esRegistrar) {
            registrarTecnico();
        }
        else {
            editarTecnico();
        }
    });

    $("#btnBuscarUsuarioTecnicoBorrar").click(function () {
        $("#txtUsuarioTecnico").val("");
    });


    $("#btnBuscarUsuarioSupervisorBorrar").click(function () {
        $("#txtUsuarioSupervisor").val("");
    });
});

function editarTecnico() {

    if (validarRegistrar()) {
        return;
    }

    var Bolsas = $("#ddlBolsasAsignadas option");

    var XML = '<?xml version="1.0" encoding="iso-8859-1"?><TABLE>';

    if (Bolsas.length == 0) {
        XML = "";
    }
    else {
        var i;
        for (i= 0; i < Bolsas.length; i++) {
            XML = XML + '<BOLSA><IdBolsa>' + $(Bolsas[i]).val().split('-')[0].toString() + '</IdBolsa></BOLSA>';
        }

        XML = XML + '</TABLE>';
    }

    var idUsuarioSupervisor;

    if ($.trim($("#txtUsuarioSupervisor").val()) == "") {
        idUsuarioSupervisor = "0";
    }
    else {
        idUsuarioSupervisor = $("#txtUsuarioSupervisor").val().split('-')[0].toString();
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
        url: "SOA_Mnt_Tecnico.aspx/actualizarTecnico",
        data: "{'prIdTecnicoSupervisor': '" + $("#hdfIdTecnicoSupervisor").val() + "'," +
                "'prIdUsuarioTecnico': '" + $("#txtUsuarioTecnico").val().split('-')[0].toString() + "'," +
                "'prIdUsuarioSupervisor': '" + idUsuarioSupervisor + "'," +
                "'prXmlBolsas': '" + XML + "'," +
                "'prActivo': '" + Activo + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = parseInt(resultado.d);

            //if (resul > 0) {
            //alerta("Registro editado exitosamente");
            Mensaje("<br/><h1>Especialista actualizado</h1><br/>", document, fnCerrar);
           // window.location.href = "SOA_Mnt_Tecnico.aspx?cod=" + $("#hdfIdTecnicoSupervisor").val();
            //            }
            //            else
            //                alerta("Error al registrar bolsa");


        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });


}

function validarRegistrar() {

    var resul = false;

    if ($.trim($("#txtUsuarioTecnico").val()) == "") {
        //alerta("Elija un usuario como técnico");
        Mensaje("<br/><h1>Elija un usuario como especialista</h1><br/>", document);
        resul = true;
    }

    if ($("#ddlBolsasAsignadas option").length == 0) {
        Mensaje("<br/><h1>Seleccione por lo menos un bolsa de incidencias</h1><br/>", document);
        resul = true;
    }


    return resul;
}

function registrarTecnico() {

    if (validarRegistrar()) {
        return;
    }

    var Bolsas = $("#ddlBolsasAsignadas option");

    var XML = '<?xml version="1.0" encoding="iso-8859-1"?><TABLE>';

    if (Bolsas.length == 0) {
        XML = "";
    }
    else {
        var i;
        for (i= 0; i < Bolsas.length; i++) {
            XML = XML + '<BOLSA><IdBolsa>' + $(Bolsas[i]).val().split('-')[0].toString() + '</IdBolsa></BOLSA>';
        }

        XML = XML + '</TABLE>';
    }

    var idUsuarioSupervisor;

    if ($.trim($("#txtUsuarioSupervisor").val()) == "") {
        idUsuarioSupervisor = "0";}
    else{
        idUsuarioSupervisor = $("#txtUsuarioSupervisor").val().split('-')[0].toString();}

    $.ajax({
        type: "POST",
        url: "SOA_Mnt_Tecnico.aspx/registrarTecnico",
        data: "{'prIdUsuarioTecnico': '" + $("#txtUsuarioTecnico").val().split('-')[0].toString() + "'," +
                "'prIdUsuarioSupervisor': '" + idUsuarioSupervisor + "'," +
                "'prXmlBolsas': '" + XML + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;

            if (resul.split('|')[0] != 'OK') {
                Mensaje("<br/><h1>"+resul.split('|')[1]+"</h1><br/>", document);
            }
            else {
                //alerta("Registro exitoso");
                window.parent.ActualizarGrilla();
                Mensaje("<br/><h1>Especialista registrado</h1><br/>", document, fnCerrar);
            }

            //if (resul > 0) {

            //window.location.href = "SOA_Mnt_Tecnico.aspx";
            //            }
            //            else
            //                alerta("Error al registrar bolsa");


        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function loadEditar() {

    $.ajax({
        type: "POST",
        url: "SOA_Mnt_Tecnico.aspx/ListarTecnico_conBolsasAsignadas",
        data: "{'prIdTecnicoSupervisor': '" + $("#hdfIdTecnicoSupervisor").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;

            $("#txtUsuarioTecnico").val(resul.UsuarioTecnico);
            $("#txtUsuarioSupervisor").val(resul.UsuarioSupervisor);
            if (resul.EsActivo) {
                $("#chkActivo").attr("checked", "checked");
                $("#EsChkActivar").css("display", "none");
            }

            if (resul.BolsasAsignadas != undefined) {
                var i;
                for (i= 0; i < resul.BolsasAsignadas.length; i++) {
                    $("#ddlBolsasAsignadas").append("<option value='" + resul.BolsasAsignadas[i].IdBolsa.toString() + "-" + resul.BolsasAsignadas[i].IdNivel.toString() + "' >" + resul.BolsasAsignadas[i].Nombre.toString() + "</option>");
                }
            }

            //MANUEL TENORIO
            $.ajax({
                type: "POST",
                url: "SOA_Mnt_Bolsas.aspx/ListarNivelConGeneral",
                data: "{'prIdNivel': '-1'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (resultado) {
                    var resul = resultado.d;

                    var i;
                    for (i = 0; i < resul.length; i++) 
                    {
                        $("#ddlNiveles").append("<option value='" + resul[i].IdNivel.toString() + "-" + resul[i].Orden.toString() + "' >" + resul[i].Nombre.toString() + "</option>");
                    }

                    obtenerBolsa_porNivel();


                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });


        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function loadRegistrar() {

    $.ajax({
        type: "POST",
        url: "SOA_Mnt_Bolsas.aspx/ListarNivelVigentes",
        data: "{'prIdNivel': '-1'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;

            var i ;
            for (i= 0; i < resul.length; i++) {
                $("#ddlNiveles").append("<option value='" + resul[i].IdNivel.toString() + "-" + resul[i].Orden.toString() + "' >" + resul[i].Nombre.toString() + "</option>");
            }

            obtenerBolsa_porNivel();


        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function obtenerBolsa_porNivel() {
    //alert($("#ddlNiveles").val().split('-')[0].toString());

    $.ajax({
        type: "POST",
        url: "SOA_Mnt_Bolsas.aspx/ListarBolsa_porNivelExacto",
        data: "{'prIdNivel': '" + $("#ddlNiveles").val().split('-')[0].toString() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;
            $("#ddlBolsasParaAsinar").html("");
            var i;
            for (i = 0; i < resul.length; i++) {
                var existe = false;
                var n;
                for (n = 0; n < $("#ddlBolsasAsignadas option").length; n++) {
                    if (resul[i].IdBolsa.toString() == $($("#ddlBolsasAsignadas option")[n]).val().split('-')[0]) {
                        existe = true;
                        break;
                    }
                }
                if (existe) {
                    continue;
                }
                $("#ddlBolsasParaAsinar").append("<option value='" + resul[i].IdBolsa.toString() + "-" + resul[i].IdNivel.toString() + "' >" + resul[i].Nombre.toString() + "</option>");
            }

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}


function usuarioElegido(usuarioElegido) {
    if (esTecnicoDialog) {
        $('#txtUsuarioTecnico').val(usuarioElegido);
    }
    else {
        $('#txtUsuarioSupervisor').val(usuarioElegido);
    }
}

function agregarBolsaEscalar() {
    if ($("#ddlBolsasParaAsinar option").length > 0) {
        $("#ddlBolsasAsignadas").append("<option value='" + $("#ddlBolsasParaAsinar").val().toString() + "'>" + $("#ddlBolsasParaAsinar option:selected").text().toString() + " (" + $("#ddlNiveles option:selected").text().toString() + ")" + "</option>");
        $("#ddlBolsasParaAsinar option[value=" + $("#ddlBolsasParaAsinar").val() + "]").remove();
    }


}

function removerBolsaEscalar() {
    if ($("#ddlBolsasAsignadas option:selected").length > 0) {
        if ($("#ddlNiveles").val().split('-')[0] == $("#ddlBolsasAsignadas").val().split('-')[1]) {
            $("#ddlBolsasParaAsinar").append("<option value='" + $("#ddlBolsasAsignadas").val().toString() + "'>" + $("#ddlBolsasAsignadas option:selected").text().toString().substring(0, $("#ddlBolsasAsignadas option:selected").text().indexOf('(')) + "</option>");
        }
        $("#ddlBolsasAsignadas option[value=" + $("#ddlBolsasAsignadas").val() + "]").remove();
    }
}


function fnCerrar() {
    window.parent.ActualizarGrilla();
    window.parent.tab.tabs("remove", indiceTab);
}