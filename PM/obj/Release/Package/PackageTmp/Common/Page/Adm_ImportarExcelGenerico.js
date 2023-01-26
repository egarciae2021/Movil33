/// <reference path="../Scripts/jquery-2.0.0-vsdoc.js" />
$(function () {

    //    $("#btnObtenerPlantilla").click(function () {

    //        $("#obteniendoPlant").css("display", "block");
    //        return true;
    //    });

//    $("#decargarLogProceso").click(function () {
//        window.location.href = $(this).attr("href");
//    });

    $("#btnCargar").click(function () {

        if ($("#btnCargar").val() != "Cargar") {
            $("#pnlResumen").hide(300);
            return true;
        }

        var archivo = $("#FileUpload1").val();

        if (archivo == "") {
            Mensaje("<br/><h1>Debe seleccionar un archivo</h1><br/>", document);
            return false;
        }

        if ($("#ddlPlantillas").val().split('|')[5] == "-1") {
            Mensaje("<br/><h1>No existe archivo destino configurado</h1><br/>", document);
            return false;
        }

        var extencionEle = obtenerExtencion(archivo);
        var extencionDest = obtenerExtencion($("#ddlPlantillas").val().split('|')[5]);

        if (extencionEle == undefined) {
            Mensaje("<br/><h1>El archivo elegido debe ser de extención " + extencionDest + "</h1><br/>", document);
            return false;
        }

        if (extencionEle != extencionDest) {
            Mensaje("<br/><h1>El archivo elegido debe ser de extención " + extencionDest + "</h1><br/>", document);
            return false;
        }

        return true;
    });

    $("#btnProcesar").click(function () {
        fnProcesar();
    });

    $("#ddlPlantillas").change(function () {
        verificarVariables();
    });

    ValidarInicioImportacion();
});

function fnProcesar(){

    if ($("#btnCargar").val() == "Cargar") {
        Mensaje("<br/><h1>Debe cargar un archivo</h1><br/>", document);
        return;
    }

    $.ajax({
        type: "POST",
        url: "Adm_ImportarExcelGenerico.aspx/Procesar",
        data: "{'IdPlantilla': '" + $("#ddlPlantillas").val().split('|')[0] + "'," +
        " 'IdOrigen': '" + $("#ddlPlantillas").val().split('|')[3] + "'," +
        " 'IdDestino': '" + $("#ddlPlantillas").val().split('|')[4] + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;

            //            if (resul) {
            //                Mensaje("<br/><h1>Importación exitosa</h1><br/>", document);
            //            }
            //            else {
            //                Mensaje("<br/><h1>Error en importación</h1><br/>", document);
            //            }

            if (resul.EstadoProceso == 1) {
                Mensaje("<br/><h1>" + resul.Mensaje + "</h1><br/>", document);
            }
            else {
                Mensaje("<br/><h1>" + resul.Mensaje + "</h1><br/>", document);
            }

            $("#decargarLogProceso").attr("href", raiz("../Common/Controladores/DescargarArchivo.ashx?archivo=" + resul.ConfiguracionFuenteOrigen.RutaLog + resul.ProcesoInformacion.NombreLog + ".log&remoto=1"));
            $("#descargarLogErrores").attr("href", raiz("../Common/Controladores/DescargarArchivo.ashx?archivo=" + resul.ConfiguracionFuenteOrigen.RutaErrores + resul.ProcesoInformacion.NombreError + ".log&remoto=1"));

            $("#decargarLogProcesoDestino").attr("href", raiz("../Common/Controladores/DescargarArchivo.ashx?archivo=" + resul.ConfiguracionFuenteDestino.RutaLog + resul.ProcesoInformacion.NombreLog + ".log&remoto=1"));
            $("#descargarLogErroresDestino").attr("href", raiz("../Common/Controladores/DescargarArchivo.ashx?archivo=" + resul.ConfiguracionFuenteDestino.RutaErrores + resul.ProcesoInformacion.NombreError + ".log&remoto=1"));

            if (resul.ExisteLogProceso || resul.ExisteLogError || resul.ExisteLogErrorDestino || resul.ExisteLogProcesoDestino) {
                if (resul.ExisteLogProceso) {
                    $("#decargarLogProceso").show();
                }

                if (resul.ExisteLogError) {
                    $("#descargarLogErrores").show();
                }

                if (resul.ExisteLogProcesoDestino) {
                    $("#decargarLogProcesoDestino").show();
                }

                if (resul.ExisteLogErrorDestino) {
                    $("#descargarLogErroresDestino").show();
                }

                $("#pnlResumen").show(300);
            }

            window.parent.ActualizarGrilla();
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function obtenerExtencion(archivo) {

    var extencion;
    extencion = undefined;
    
    if ($.trim(archivo).length > 0) {
        extencion = archivo.substring(archivo.lastIndexOf("."));
    }

    return extencion;
}

function ValidarInicioImportacion() {

    var countPlantillas = $("#ddlPlantillas option");

    if (countPlantillas.length > 0) {

        if (countPlantillas.length == 1) {
            $("#pnlPlantilla").hide();
        }
        verificarVariables();
    }
    else {
        $("#ListaErrores").append("<li>No existen Plantillas configuradas para esta entidad</li>");
        $("#pnlPlantilla").hide();
        $("#ocultar").fadeOut(0, function () {
            $("#PanelImformativo").fadeIn(300);
        });    
    }

}

function verificarVariables() {
    var esValido = true;
    $("#ListaErrores").html("");
    var variables = $("#ddlPlantillas").val().split('|');

    if (variables[1] == -1) {
        $("#ListaErrores").append("<li>No esta configurado origen de datos para obtener Plantilla</li>");
        esValido = false;
    }
    if (variables[2] == -1) {
        $("#ListaErrores").append("<li>No esta configurado destino de datos para obtener Plantilla</li>");
        esValido = false;
    }
    if (variables[3] == -1) {
        $("#ListaErrores").append("<li>No esta configurado origen de datos para importar datos</li>");
        esValido = false;
    }
    if (variables[4] == -1) {
        $("#ListaErrores").append("<li>No esta configurado destino de datos para importar datos</li>");
        esValido = false;
    }
    if (variables[5] == -1) {
        $("#ListaErrores").append("<li>No esta configurado ruta de destino para cargar archivos</li>");
        esValido = false;
    }

    if (!esValido) {
        $("#ocultar").fadeOut(0, function () {
            $("#PanelImformativo").fadeIn(300);
        });  
    }  
}
