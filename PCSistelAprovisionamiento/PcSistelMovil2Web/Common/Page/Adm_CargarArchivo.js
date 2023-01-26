function CargarArchivoParent() {
    window.parent.CargarNombreArchivo($("#hdfNombreArchivoCargado").val(), $("#hdfNombreArchivoFisico").val(), $("#hdfAceptavariosArchivos").val());
}

function Inicio() {
    $("input:checkbox,input:radio,input:file").uniform();
    $(".btnNormal").button();
    var extArray = $("#hdfFormatos").val().split(",");
    $("#btnCargar").hide();
    $("body").css({ "margin": "0px", "padding": "0px" });
    $(".uploader").css("width", "321px");
    $(".filename").css("width", "215px");
    //$(".uploader").css("", "");
    $("#btnCargarPrevio").click(function () {
        if (ValidaArchivo())
        { $("#btnCargar").click(); }
    });

    function ObtenerParametros(name) {
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (!results) {
            return '';
        }
        return results[1] || '';
    }

    $("#fulArchivo").change(function () {
        if ($("#fulArchivo").val() == "")
        { $("#btnCargarPrevio").hide(); }
        else
        { $("#btnCargarPrevio").show(); }

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
            var i = 0;
            for (i = 0; i < extArray.length; i++) {
                if (extArray[i].toLowerCase() == strextencion.toLowerCase()) {
                    return true;
                }
            }
            window.parent.alerta("Seleccione un archivo del tipo " + $("#hdfFormatoTipo").val() + "(" + $("#hdfFormatos").val().replace(",", ", ") + ")");
            return false;
        } else {
            //window.parent.alerta("Por favor debe ingresar un Operador");
            return true;
        }
    };
}

$(function () {
    Inicio();
});
