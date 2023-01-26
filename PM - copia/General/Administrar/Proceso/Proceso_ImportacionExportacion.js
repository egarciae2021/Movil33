
$(function () {

    IniciarPagina();

    function IniciarPagina() {

        $("#PanelImportacion").hide();
        $("#PanelPlantilla").hide();

        if ($("#hdfContador").val() == 1) {
            $("#PanelImportacion").show();
            $("#PanelPlantilla").hide();
        } else {
            if ($("#hdfContador").val() > 1) {
                $("#PanelImportacion").hide();
                $("#PanelPlantilla").show();
            } else {
                if ($("#hdfContador").val() == 0) {
                    $("#PanelImportacion").hide();
                    $("#PanelPlantilla").hide();
                }
            }
        }
    }

    $(".radioLista").click(function () {
        RadioListSelect();
    });

    function RadioListSelect() {
        $("#hdfPlantilla").val($("input:radio[name='rdblPlantillas']:checked").val());
    }

    function CerroMensaje() {
        $("#hdfRuta").val("");
        $("#hdfLongRuta").val("");
        $("#hdfEntidad").val("");
        $("#hdfPlantilla").val("");
        $("#hdfContador").val("");
        $("#hdfTabla").val("");
    }

    if ($("#hdfLongRuta").val() > 0) {

        $("#dvCargando").show();

        $.ajax({
            type: "POST",
            url: "Proceso_ImportacionExportacion.aspx/Ejecutando_Proceso",
            data: JSON.stringify({
                'pruta': $("#hdfRuta").val(),
                'pidPlantilla': $("#hdfPlantilla").val(),
                'ptabla': $("#hdfTabla").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.d) {
                    Mensaje("<br/><h1>Proceso Terminado</h1><br/>", document, CerroMensaje);
                } else {
                    alerta("Ocurrio un error al momento de procesar");
                }
            },
            error: function (xhr, err) {
                $("#dvCargando").hide();
                alerta("Error, Estadow: " + xhr.readyState + "\nEstado: " + xhr.status);
                console.log(xhr.status);
                console.log(xhr.readyState);
                console.log(err);
            }
        });

    }

    function CargarNombrePlantilla() {
        $.ajax({
            type: "POST",
            url: "Proceso_ImportacionExportacion.aspx/Buscar_Plantilla_Nombre",
            data: JSON.stringify({
                'pidPlantilla': $("#hdfPlantilla").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                $("#tituloproceso").append("<p>Se ha Seleccionado el modelo " + msg.d + " para el proceso</p>");
            },
            error: function (xhr, err) {
                $("#dvCargando").hide();
                alerta("Error, Estadow: " + xhr.readyState + "\nEstado: " + xhr.status);
                console.log(xhr.status);
                console.log(xhr.readyState);
                console.log(err);
            }
        });
    }

    $("#btnContinuar").bind("click", function () {
        if ($("#hdfPlantilla").val() == 0) {
            alerta("Debe seleccionar una plantilla para realizar este proceso");
        } else {
            $("#PanelImportacion").show();
            $("#PanelPlantilla").hide();
            CargarNombrePlantilla();
        }
    });

});