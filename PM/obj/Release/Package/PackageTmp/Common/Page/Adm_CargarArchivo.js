function CargarArchivoParent() {
    window.parent.CargarNombreArchivo($("#hdfNombreArchivoCargado").val(), $("#hdfNombreArchivoFisico").val(), $("#hdfAceptavariosArchivos").val());
}

function CargarArchivoParentFactura() {
    window.parent.CargarNombreArchivoAdjuntoFactura($("#hdfNombreArchivoCargado").val(), $("#hdfNombreArchivoFisico").val(), $("#hdfAceptavariosArchivos").val());
}

function CargarArchivoParentFactura_Import() {
    window.parent.CargarNombreArchivoAdjuntoFactura_Import($("#hdfNombreArchivoCargado").val(), $("#hdfNombreArchivoFisico").val(), $("#hdfAceptavariosArchivos").val());
}

function CargarArchivoParentFactura_Import_LineasImages() {
    window.parent.CargarArchivoParentFactura_Import_LineasImages($("#hdfNombreArchivoCargado").val(), $("#hdfNombreArchivoFisico").val(), $("#hdfNombreImagesCargado").val(), $("#hdfNombreImagesFisico").val(), $("#hdfAceptavariosArchivos").val());
}

var vcTab;
function Inicio() {
    vcTab = window.parent.$("#hdfvcTab").val();
    if (vcTab != "MOV_Linea") {
        $("#trCheckImages").hide();
        $("#trUploadFileImage").hide();
    } else {
        $("#trCheckImages").show();
    }
    $("input:checkbox,input:radio,input:file").uniform();
    $(".btnNormal").button();
    var strFormatosImages = "rar,zip";
    var extArray = $("#hdfFormatos").val().split(",");
    var extImagesArray = strFormatosImages.split(",");
    $("#btnCargar").hide();
    $("#btnCargarImages").hide();
    $("body").css({ "margin": "0px", "padding": "0px" });
    $(".uploader").css("width", "321px");
    $(".filename").css("width", "215px");
    //$(".uploader").css("", "");
    $("#btnCargarPrevio").click(function () {
        if (ValidaArchivo()) {

            try {
                window.top.$("#skLoading").css("margin-left", "-10px");
                window.top.$("#skLoading").css("margin-top", "10px");
                window.top.$("#skLoading").show();
            } catch (e) {
            }

            $("#btnCargar").click();
        }
    });

    $("#btnCargaPrevioAlterno").click(function () {
        
        if (ValidaArchivo() && ValidaArchivoImages()) {

            try {
                window.top.$("#skLoading").css("margin-left", "-10px");
                window.top.$("#skLoading").css("margin-top", "10px");
                window.top.$("#skLoading").show();
            } catch (e) {
            }

            $("#btnCargarImages").click();
        }
    });
    window.top.$("#skLoading").hide();


    function ObtenerParametros(name) {
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (!results) {
            return '';
        }
        return results[1] || '';
    }

    $("#fulArchivo").change(function () {
        if ($("#fulArchivo").val() == "") {
            if ($('#chkSubirImages').is(':checked') == true) {
                $("#btnCargarPrevio").hide();
            } else {
                $("#btnCargarPrevio").show();
                $("#btnCargaPrevioAlterno").hide();
            }
        }
        else {
            if ($('#chkSubirImages').is(':checked') == true) {
                $("#btnCargarPrevio").hide();
            } else {
                $("#btnCargarPrevio").show();
                $("#btnCargaPrevioAlterno").hide();
            }
        }

        $(".eliminar").click(function () {
            var tr = $(this).parent().parent();
            tr.remove();
        });
    });

    $("#chkSubirImages").change(function () {
        if ($('#chkSubirImages').is(':checked') == true) {
            $("#trUploadFileImage").show();
            $("#btnCargarPrevio").hide();
        } else {
            $("#trUploadFileImage").hide();
            $("#fulImages").val("");
            if ($("#fulArchivo").val() == "") {
                $("#btnCargarPrevio").hide();
            } else {
                $("#btnCargarPrevio").show();
            }
        }

    });

    $("#fulImages").change(function () {
        if ($("#fulImages").val() == "") {
            $("#btnCargaPrevioAlterno").hide();
        }
        else {
            $("#btnCargaPrevioAlterno").show();
        }

        $(".eliminar").click(function () {
            var tr = $(this).parent().parent();
            tr.remove();
        });
    });



    function ValidaArchivo() {
        if ($("#hdfFormatos").val() != "") {
            var Ruta = $("#fulArchivo").val();
            var arrArchivos;
            var contArchivo = 0;
            //Se valida el Separador de los Directorios.
            if (Ruta.indexOf('/') >= 0) {
                arrArchivos = Ruta.split('/');
            } else {
                arrArchivos = Ruta.split('\\');
            }
            //Se obtiene el Total de Directorios.
            contArchivo = arrArchivos.length;
            //Se onbtiene el ultimo Directorio que en este caso es el archivo seleccionado.
            var Archivo = arrArchivos[contArchivo - 1];
            //Al Archivo Seleccionado se le Separa por Separador de Extensiones ".".
            var arrFormatos = Archivo.split('.');
            //Se obtiene el Total de extensiones.
            var contFormatos = arrFormatos.length;
            //Se Obtiene la Extension CORRECTA del archivo selccionado
            var strextencion = arrFormatos[contFormatos - 1];

            //var ext = Archivo.slice(Archivo.lastIndexOf(".")).toLowerCase();
            if (Ruta == "") {
                window.parent.alerta("Seleccione un archivo");
                return false;
            }
            if (extArray.length == 0 || (extArray.length == 1 && extArray[0] == "")) {
                return true;
            }
            var i;
            for (i = 0; i < extArray.length; i++) {
                if (extArray[i].toLowerCase().replace(".", "") == strextencion.toLowerCase().replace(".", "")) {
                    return true;
                }
            }
            window.parent.alerta("Seleccione un archivo del tipo " + $("#hdfFormatoTipo").val() + "(" + $("#hdfFormatos").val().replace(",", ", ") + ")");
            return false;
        } else {
            //window.parent.alerta("Por favor debe ingresar un Operador");
            return true;
        }
    }

    function ValidaArchivoImages() {
        if ($("#hdfFormatos").val() != "") {
            var Ruta = $("#fulImages").val();
            var arrArchivos;
            var contArchivo = 0;
            //Se valida el Separador de los Directorios.
            if (Ruta.indexOf('/') >= 0) {
                arrArchivos = Ruta.split('/');
            } else {
                arrArchivos = Ruta.split('\\');
            }
            //Se obtiene el Total de Directorios.
            contArchivo = arrArchivos.length;
            //Se onbtiene el ultimo Directorio que en este caso es el archivo seleccionado.
            var Archivo = arrArchivos[contArchivo - 1];
            //Al Archivo Seleccionado se le Separa por Separador de Extensiones ".".
            var arrFormatos = Archivo.split('.');
            //Se obtiene el Total de extensiones.
            var contFormatos = 2;
            //Se Obtiene la Extension CORRECTA del archivo selccionado
            var strextencion = arrFormatos[contFormatos - 1];

            //var ext = Archivo.slice(Archivo.lastIndexOf(".")).toLowerCase();
            if (Ruta == "") {
                window.parent.alerta("Seleccione un archivo");
                return false;
            }
            if (extImagesArray.length == 0 || (extImagesArray.length == 1 && extImagesArray[0] == "")) {
                return true;
            }
            var i;
            for (i = 0; i < extImagesArray.length; i++) {
                if (extImagesArray[i].toLowerCase() == strextencion.toLowerCase()) {
                    return true;
                }
            }
            window.parent.alerta("Seleccione un archivo del tipo " + $("#hdfFormatoTipo").val() + "(" + strFormatosImages.replace(",", ", ") + ")");
            return false;
        } else {
            //window.parent.alerta("Por favor debe ingresar un Operador");
            return true;
        }
    }


}

$(function () {
    var Formatos = $("#hdfFormatos").val();
    Inicio();
    $("#fulArchivo").attr("accept", Formatos);
    $("#fulImages").attr("accept", ".zip");

    vcTab = window.parent.$("#hdfvcTab").val();
    if (vcTab != "MOV_Linea") {
        $("#trCheckImages").hide();
        $("#trUploadFileImage").hide();
    } else {
        $("#trCheckImages").show();
    }

    switch (vcTab) {
        case "MOV_Linea":
            $("#trMensaje1").show();
            $("#lblMensaje1").html("Seleccione el archivo excel que contiene los datos de las líneas.");
            $("#trMensaje2").show();
            $("#lblMensaje2").html("Si usted ingresó el nombre de la imagen del modelo, entonces podrá subir estas imágenes. Para ello deberá agruparlas en un archivo de formato ZIP y subir solo éste archivo.");
            break;
        case "M_ORGA":
            $("#trMensaje1").show();
            $("#lblMensaje1").html("Seleccione el archivo excel que contiene los datos de su organización.");
            break;
        case "MOV_Plan": case "MOV_Cuenta":
            $("#trMensaje1").show();
            $("#lblMensaje1").html("Seleccione el archivo excel que contiene los datos de cuentas y planes.");
            break;
        default:
    }

});
