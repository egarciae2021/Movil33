
function apr_Contrato() {
    this.IdContratoTerminos;
    this.Descripcion;
    this.NombreArchivo;
    this.Extension;
}




$(function () {
    var indiceTab = window.parent.tab.tabs("option", "selected");

    $("#btnCerrar").click(function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });

    $("#btnGuardar").live("click", function () {

        BloquearPagina(true);

        var Apr_Contrato = new apr_Contrato();
        var Nombrearchivo = $("#hdfArchivo").val();
        var valores = Nombrearchivo.split('.')


        var ext = Nombrearchivo.slice(Nombrearchivo.lastIndexOf(".")).toLowerCase();

        Apr_Contrato.IdContratoTerminos = $("#hdfIdContratoTermino").val();
        Apr_Contrato.Descripcion = $.trim($("#txtNombre").val());
        Apr_Contrato.NombreArchivo = valores[0];
        Apr_Contrato.Extension = valores[1];

        if (Apr_Contrato.Descripcion == "") {
            alertaExterna("La descripción del contrato es un campo obligatorio.");
            BloquearPagina(false);
            $("#txtNombre").focus();
            return;
        }

        if ($("#hdfArchivo").val() == "") {
            alertaExterna("El archivo de contrato es obligatorio.");
            BloquearPagina(false);
            return;
        }
               
        var oApr_Contrato = JSON.stringify(Apr_Contrato);


        $.ajax({
            type: "POST",
            url: "Mnt_LIC_ContratoTermino.aspx/Guardar",
            data: "{'oContrato': '" + oApr_Contrato + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result.d == '1') {
                    BloquearPagina(false);
                    alertaExterna("El País ya existe en la base de datos");
                    // $("#txtvcUsu").focus();
                    return;
                }
                else {
                    //if ($("#hdfEsllamadaExterna").val() != "1") {
                    //    window.parent.ActualizarGrilla();
                    //}
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><h1>Registro guardado</h1><h2> Contrato:  " + Apr_Contrato.Descripcion + "</h2>", document, CerroMensaje);
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
        if ($("#hdfIdPais").val() == "0") {

            $("#txtNombre").val("");
            $("#txtNombre").focus();

        }
        else {
            //window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
            window.parent.tab.tabs("remove", indiceTab);
        }
    }

    if ($("#hdfArchivo").val() != "") {
        $("#igmEliminar").show();
        $("#lblArchivoCargado").show();
        $("#ifCargarArchivo").hide();
    }
    else {
        $("#igmEliminar").hide();
        $("#lblArchivoCargado").hide();
        $("#ifCargarArchivo").show();
    }

    var ruta = '../Common/Page/Adm_CargarArchivo.aspx?Formatos=&FormatoTipo=&NombreArchivo=' + $("#hdfArchivo").val();
    $('#ifCargarArchivo').attr('src', ruta);

    $("#igmEliminar").click(function () {
        $("#hdfArchivo").val("");
        $("#igmEliminar").hide();
        $("#lblArchivoCargado").hide();
        $("#ifCargarArchivo").show();
    });

    $("#lblArchivoCargado").click(function () {

        if ($("#hdfArchivo").val() != "") {
            var NomArc = $("#hdfArchivo").val()
            var filePath = "Temporal/" + NomArc;
            window.location.href = "../Common/Controladores/DescargarArchivo.ashx?archivo=" + filePath;
        }

    });

});

function CargarNombreArchivo(Archivo, RutaCompleta) {
    $("#hdfArchivo").val(Archivo);
    $("#hdfRutaCompleta").val(RutaCompleta);
    $("#lblArchivoCargado").html(Archivo);
    $("#lblArchivoCargado").show();
    $("#igmEliminar").show();
    $("#ifCargarArchivo").hide();
    
    //var Metodo = raiz("P_Movil/Administrar/Cam_DespachoOperador.aspx/CargarArchivo");
    
}
