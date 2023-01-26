
function apr_InstanciaAPP() {
    this.IdInstanciaAPP;
    this.Puerto;
    this.Servidor = new setServidor();
    this.Endpoint = new setEndpoint();
    this.NombreAPP;
    this.PaginaInicio;
    this.UsaSCL;
    this.CantidadUsuarios;
}

function setServidor() {
    this.IdServidor;
}

function setEndpoint() {
    this.IdEndpoint;
}


$(function () {
    var indiceTab = window.parent.tab.tabs("option", "selected");

    ValidarNumeroEnCajaTexto("txtPuerto", ValidarSoloNumero);
    ValidarNumeroEnCajaTexto("txtcantUsuarios", ValidarSoloNumero);

    if ($("#chkUsaInstancia").is(':checked')) {
        $("#txtNombre").val("[Sin instancia]");
        $("#txtNombre").attr("disabled", true);
        $("#txtNombre").css({ "background": "#BDBDBD" });
    }

    Cargar_Endpoints();
    $("#btnCerrar").click(function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });

    $("#btnGuardar").live("click", function () {

        BloquearPagina(true);

        var Apr_InstanciaAPP = new apr_InstanciaAPP()

        Apr_InstanciaAPP.IdInstanciaAPP = $("#hdfIdInstanciaAPP").val();
        Apr_InstanciaAPP.Puerto = $.trim($("#txtPuerto").val());
        Apr_InstanciaAPP.Servidor.IdServidor = $("#ddlServidor").val();
        Apr_InstanciaAPP.Endpoint.IdEndpoint = $("#ddlEndpoint").val();
        Apr_InstanciaAPP.NombreAPP = $.trim($("#txtNombre").val());
        Apr_InstanciaAPP.PaginaInicio = $.trim($("#txtPaginaInicio").val());
        Apr_InstanciaAPP.UsaSCL = $("#chkSSL").is(':checked');
        Apr_InstanciaAPP.CantidadUsuarios = $.trim($("#txtcantUsuarios").val());


        if (Apr_InstanciaAPP.NombreAPP == "") {
            alertaExterna("El nombre de Instancia es un campo obligatorio.");
            BloquearPagina(false);
            $("#txtNombre").focus();
            return;
        }

        if ($("#ddlEndpoint").val() == "-1") {
            alertaExterna("Seleccione un Endpoint");
            BloquearPagina(false);
            return;
        }

        if ($("#chkUsaInstancia").is(':checked')) {
            Apr_InstanciaAPP.NombreAPP = "";
        }



        var oApr_InstanciaAPP = JSON.stringify(Apr_InstanciaAPP);


        $.ajax({
            type: "POST",
            url: "Mnt_InstanciaAPP.aspx/Guardar",
            data: "{'oInstanciaAPP': '" + oApr_InstanciaAPP + "'}",
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
                    Mensaje("<br/><h1>Registro guardado</h1><h2> ID " + Apr_InstanciaAPP.IdInstanciaAPP + "</h2>", document, CerroMensaje);
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
        if ($("#hdfIdServidor").val() == "0") {

            $("#txtNombre").val("");
            $("#txtPuerto").val("");
            $("#txtPaginaInicio").val("");
            $("#txtcantUsuarios").val("");    
            $("#txtNombre").focus();

        }
        else {
            //window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
            window.parent.tab.tabs("remove", indiceTab);
        }
    }

    $('#chkUsaInstancia').click(function () {
        if ($(this).is(':checked')) {
            $("#txtNombre").val("[Sin instancia]");
            $("#txtNombre").attr("disabled", true);
            $("#txtNombre").css({ "background": "#BDBDBD" });
            return;
        } else {
            $("#txtNombre").attr("disabled", false);
            $("#txtNombre").val("");
            $("#txtNombre").css({ "background": "" });
            return;
        }
    });
});

function Cargar_Endpoints() {

    $("#ddlEndpoint").append($("<option></option>").attr("value", -1).text("[Seleccione...]"));

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Mnt_Instanciaapp.aspx/ListarEndpoints",
        data: "{}",
        dataType: "json",
        success: function (result) {

            var lsServidor = result.d;

            $(lsServidor).each(function () {
                $("#ddlEndpoint").append($("<option></option>").attr("value", this.IdEndpoint).text(this.Nombre));

            });

            if ($("#hdfIdInstanciaAPP").val() != "-1") {
                $("#ddlEndpoint").val($("#hdfIdEndpoint").val());
                $("#ddlEndpoint").change();
            }
        },
        error: function (result) {
            alert("Error");
        }
    });
}