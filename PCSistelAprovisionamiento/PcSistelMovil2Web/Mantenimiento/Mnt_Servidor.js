
function apr_servidor() {
    this.IdServidor;
    this.Nombre;
    this.Ip;
    this.SistemaOP;
    this.DiscoDuro;
    this.EspacioUsado;
    this.RutaBackup;
    this.RutaDestinoBD;

}



$(function () {
    var indiceTab = window.parent.tab.tabs("option", "selected");


    // ValidarNumeroEnCajaTexto("txtRuc", ValidarSoloNumero);
    //  ValidarNumeroEnCajaTexto("txtLineas", ValidarSoloNumero);


    ValidarNumeroEnCajaTexto("txtDisco", ValidarDecimalPositivo);
    ValidarNumeroEnCajaTexto("txtEspacio", ValidarDecimalPositivo);

    $("#btnCerrar").click(function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));        
    });


    $("#btnGuardar").live("click", function () {

        BloquearPagina(true);

        var Apr_servidor = new apr_servidor();
        Apr_servidor.IdServidor = $("#hdfIdServidor").val();
        Apr_servidor.Nombre = $.trim($("#txtNombre").val());
        Apr_servidor.Ip = $.trim($("#txtIp").val());
        Apr_servidor.SistemaOP = $.trim($("#txtSO").val());
        Apr_servidor.DiscoDuro = $.trim($("#txtDisco").val()).replace(",", ".");
        Apr_servidor.EspacioUsado = $.trim($("#txtEspacio").val()).replace(",", ".");
        Apr_servidor.RutaBackup = $.trim($("#txtRutaBackup").val()).replace(/'/g, "&#39").replace(/\\/g, "&#40").replace(/"/g, "&#34");
        Apr_servidor.RutaDestinoBD = $.trim($("#txtRutaDestinoBD").val()).replace(/'/g, "&#39").replace(/\\/g, "&#40").replace(/"/g, "&#34");


        //APR_Usuario.Usuario = APR_Usuario.Usuario.replace(/'/g, "&#39").replace(/\\/g, "&#40").replace(/"/g, "&#34");


        if (Apr_servidor.Nombre == "") {
            alertaExterna("El nombre de Servidor es un campo obligatorio.");
            BloquearPagina(false);
            return;
        }

        if (Apr_servidor.Ip == "") {
            alertaExterna("La Ip es un campo obligatorio.");
            BloquearPagina(false);
            return;
        }

        if (Apr_servidor.SistemaOP == "") {
            alertaExterna("El sistema operativo es un campo obligatorio.");
            BloquearPagina(false);
            return;
        }

        if (Apr_servidor.DiscoDuro == "") {
            alertaExterna("El Disco Duro es un campo obligatorio.");
            BloquearPagina(false);
            return;
        }

        if (Apr_servidor.EspacioUsado == "") {
            alertaExterna("El Espacio utilizado es un campo obligatorio.");
            BloquearPagina(false);
            return;
        }

        if (Apr_servidor.RutaBackup == "") {
            alertaExterna("La Ruta del Backup es un campo obligatorio.");
            BloquearPagina(false);
            return;
        }

        if (Apr_servidor.RutaDestinoBD == "") {
            alertaExterna("La Ruta Destino es un campo obligatorio.");
            BloquearPagina(false);
            return;
        }

        var oApr_servidor = JSON.stringify(Apr_servidor);


        $.ajax({
            type: "POST",
            url: "Mnt_Servidor.aspx/Guardar",
            data: "{'oServidor': '" + oApr_servidor + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result.d == '1') {
                    BloquearPagina(false);
                    alertaExterna("El Servidor ya existe en la base de datos");
                    // $("#txtvcUsu").focus();
                    return;
                }
                else {
                    //if ($("#hdfEsllamadaExterna").val() != "1") {
                    //    window.parent.ActualizarGrilla();
                    //}
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><h1>Registro guardado</h1><h2>" + Apr_servidor.Nombre + "</h2>", document, CerroMensaje);
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
            $("#txtIp").val("");
            $("#txtSO").val("");
            $("#txtDisco").val("");
            $("#txtEspacio").val("");
            $("#txtRutaBackup").val("");
            $("#txtRutaDestinoBD").val("");
            $("#txtNombre").focus();

        }
        else {
            //window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
            window.parent.tab.tabs("remove", indiceTab);
        }
    }



});
