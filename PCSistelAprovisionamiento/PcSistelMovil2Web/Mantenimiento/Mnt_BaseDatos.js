
function apr_BaseDatos() {
    this.IdBaseDatos;
    this.IdInstanciaBD;
    this.BaseDatos;
    this.Usuario;
    this.Contrasena;
}


$(function () {
    var indiceTab = window.parent.tab.tabs("option", "selected");

    $("#ddlInstanciaBD").append($("<option></option>").attr("value", -1).text("[Seleccione...]"));

    Cargar_Servidores();

    $("#btnCerrar").click(function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });


    $("#btnGuardar").live("click", function () {

        BloquearPagina(true);

        var Apr_BaseDatos = new apr_BaseDatos();

        Apr_BaseDatos.IdBaseDatos = $("#hdfIdBaseDatos").val();
        Apr_BaseDatos.IdInstanciaBD = $("#ddlInstanciaBD").val();
        Apr_BaseDatos.BaseDatos = $("#txtNombre").val();
        Apr_BaseDatos.Usuario = $.trim($("#txtUsuario").val());
        Apr_BaseDatos.Contrasena = $.trim($("#txtContrasena").val());


        if ($("#ddlServidor").val() == "-1") {
            alertaExterna("Seleccione un Servidor");
            BloquearPagina(false);
            return;
        }

        if (Apr_BaseDatos.IdInstanciaBD == "-1") {
            alertaExterna("Seleccione una Instancia de Base de datos");
            BloquearPagina(false);          
            return;
        }


        if (Apr_BaseDatos.Usuario == "") {
            alertaExterna("El Usuario es un campo obligatorio");
            BloquearPagina(false);
            $("#txtpassApr").focus();
            return;
        }

        if (Apr_BaseDatos.Contrasena == "") {
            alertaExterna("La contraseña es un campo obligatorio.");
            BloquearPagina(false);
            $("#txtpassApr").focus();
            return;
        }

        if (Apr_BaseDatos.Contrasena.length < 6) {
            alertaExterna("La contraseña de Usuario no debe tener menos de 6 caracteres.");
            BloquearPagina(false);
            $("#txtpassApr").focus();
            return;
        }

        var oApr_BaseDatos = JSON.stringify(Apr_BaseDatos);

        $.ajax({
            type: "POST",
            url: "Mnt_BaseDatos.aspx/Guardar",
            data: "{'oBaseDatos': '" + oApr_BaseDatos + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result.d == '1') {
                    BloquearPagina(false);
                    alertaExterna("La Instancia ya existe en la base de datos");
                    // $("#txtvcUsu").focus();
                    return;
                }
                else {
                    //if ($("#hdfEsllamadaExterna").val() != "1") {
                    //    window.parent.ActualizarGrilla();
                    //}
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><h1>Registro guardado</h1><h2> ID " + Apr_BaseDatos.IdBaseDatos + "</h2>", document, CerroMensaje);
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
        if ($("#hdfIdBaseDatos").val() == "0") {
            $("#txtNombre").val("");
            $("#txtNombre").focus();
        }
        else {
            //window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
            window.parent.tab.tabs("remove", indiceTab);
        }
    }


    $("#ddlServidor").change(function () {

        var Idservidor = $("#ddlServidor").val();

        $("#ddlInstanciaBD").html("");


        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "Mnt_BaseDatos.aspx/ListarInstanciaBDxServidor",
            data: "{'IdServidor': '" + Idservidor + "'}",
            dataType: "json",
            success: function (result) {

                var lstInstanciaBD = result.d;

                $("#ddlInstanciaBD").append($("<option></option>").attr("value", -1).text("[Seleccione...]"));

                $(lstInstanciaBD).each(function () {

                    $("#ddlInstanciaBD").append($("<option></option>").attr("value", this.IdInstanciaBD).text(this.Instancia));
                });

                if ($("#hdfIdBaseDatos").val() != "0") {
                    $("#ddlInstanciaBD").val($("#hdfIdInstanciaBD").val());
                }
            },
            error: function (result) {
                alert("Error");
            }
        });



    });





});

function Cargar_Servidores() {

    $("#ddlServidor").append($("<option></option>").attr("value", -1).text("[Seleccione...]"));  

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Mnt_BaseDatos.aspx/ListarServidores",
        data: "{}",
        dataType: "json",
        success: function (result) {

            var lsServidor = result.d;

            $(lsServidor).each(function () {
                $("#ddlServidor").append($("<option></option>").attr("value", this.IdServidor).text(this.Nombre));

            });

            if ($("#hdfIdBaseDatos").val() != "0") {
                $("#ddlServidor").val($("#hdfIdServidor").val());
                $("#ddlServidor").change();
            }
        },
        error: function (result) {
            alert("Error");
        }
    });
}
