
function apr_Dominio() {
    this.IdDominio;
    this.Nombre;
    this.IdInstanciaAPP;
    this.IdBaseDatos;
    this.IdLicencia;
    this.IdEmpresa;
    this.IdPais;
}


$(function () {
    var indiceTab = window.parent.tab.tabs("option", "selected");

    $("#btnCerrar").click(function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });


    $("#btnGuardar").live("click", function () {

        BloquearPagina(true);

        var Apr_Dominio = new apr_Dominio();

        Apr_Dominio.IdDominio = $("#hdfIdDominio").val();
        Apr_Dominio.Nombre = $("#txtNombre").val();
        Apr_Dominio.IdInstanciaAPP = $("#ddlInstanciaAPP").val();
        Apr_Dominio.IdBaseDatos = $("#ddlBaseDatos").val();
        Apr_Dominio.IdLicencia = $("#ddlLicencia").val();
        Apr_Dominio.IdEmpresa = $("#ddlEmpresa").val();
        Apr_Dominio.IdPais = $("#ddlPais").val();

        if ($("#ddlBaseDatos").val() == "-1") {
            alertaExterna("Seleccione una Base de Datos");
            BloquearPagina(false);
            return;
        }

        if ($("#ddlInstanciaAPP").val() == "-1") {
            alertaExterna("Seleccione una Instancia de Aplicaciones");
            BloquearPagina(false);
            return;
        }

        if ($("#ddlLicencia").val() == "-1") {
            alertaExterna("Seleccione una Licencia");
            BloquearPagina(false);
            return;
        }

        if ($("#ddlEmpresa").val() == "-1") {
            alertaExterna("Seleccione una Empresa");
            BloquearPagina(false);
            return;
        }

        if ($("#ddlPais").val() == "-1") {
            alertaExterna("Seleccione un País");
            BloquearPagina(false);
            return;
        }

        var oApr_Dominio = JSON.stringify(Apr_Dominio);

        $.ajax({
            type: "POST",
            url: "Mnt_Dominio.aspx/Guardar",
            data: "{'oDominio': '" + oApr_Dominio + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result.d == '1') {
                    BloquearPagina(false);
                    alertaExterna("El Dominio ingresado ya existe en la base de datos");
                    // $("#txtvcUsu").focus();
                    return;
                }
                else {
                    //if ($("#hdfEsllamadaExterna").val() != "1") {
                    //    window.parent.ActualizarGrilla();
                    //}
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><h1>Registro guardado</h1><h2> ID " + Apr_Dominio.IdDominio + "</h2>", document, CerroMensaje);
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
            $("#txtNombre").focus();

        }
        else {
            //window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
            window.parent.tab.tabs("remove", indiceTab);
        }
    }



});
