var tblAdjuntos;
var CarpetaDominio = '';
$(function () {
    CarpetaDominio = window.top.$("#hdfCodigoDominio").val() != '' ? '/' + window.top.$("#hdfCodigoDominio").val() : '';

    $(".btnNormal").button();

    new AjaxUpload('#UploadButton', {
        action: 'UploadHandler.ashx?CarpetaDominio=' + CarpetaDominio,
        onComplete: function (file, response) {

            var res = response.split(",");

            var Archivo = res[0];
            var Tamano = res[1];
            CargarGrillaAdjuntos(Archivo, Tamano, 'xxxx');

            //$("<div align='center'><table><tr><td style='vertical-align:middle;' ><img src='resources/btndelete.png' onclick=\"DeleteFile('" + response + "')\"  class='delete'/></td><td width='5px'></td><td style='vertical-align:middle;' ><span id='filesubido' nombre='" + response + "' style='cursor:hand;cursor:pointer;'>" + response + "</span></td></div>").appendTo('#UploadedFile');
            //$('#UploadStatus').html("Se cargó el archivo.");
            //$("#UploadButton").hide();
            $('#UploadStatus').html("");

        },
        onSubmit: function (file, ext) {
            if (!(ext && /^(txt|doc|docx|xls|rar|zip|xlsx|pdf|jpg|png|gif|jpge|bmp|ppt|pptx)$/i.test(ext.toLowerCase()))) {
                window.parent.alerta('Formato inválido');
                return false;
            }
            $('#UploadStatus').html("Subiendo...");
        }
    });

    var response = getParameterByName('file');
    if (response != null && response != '') {
        /*
        $("<div align='center'><table><tr><td style='vertical-align:middle;' ><img src='resources/btndelete.png' onclick=\"DeleteFile('" + response + "')\"  class='delete'/></td><td width='5px'></td><td style='vertical-align:middle;' ><span id='filesubido' nombre='" + response + "' style='cursor:hand;cursor:pointer;'>" + response + "</span></td></div>").appendTo('#UploadedFile');
        $('#UploadStatus').html("Se cargó el archivo.");
        $("#UploadButton").hide();
        */
    }



    DefineGrillaAdjuntos();


    $("#btnQuitar").click(function () {
        var id = $("#tblAdjuntos").jqGrid('getGridParam', 'selrow');
        var datosRow = $("#tblAdjuntos").jqGrid('getRowData', id);
        window.parent.MostrarConfirmacion(id, datosRow.vcNomAdj); //RRAMOS 20141201
        //        if (id) {
        //            //DeleteFile(datosRow.vcNomAdj);
        //            //$("#tblAdjuntos").jqGrid('delRowData', id);
        //        }
        //        else {
        //            alert("Seleccione un Item");
        //        };
    });

    $("#btnDescargar").click(function () {
        var id = $("#tblAdjuntos").jqGrid('getGridParam', 'selrow');
        var datosRow = $("#tblAdjuntos").jqGrid('getRowData', id);
        if (id) {
            $.ajax({
                type: "POST",
                url: "Upload.aspx/ValidarExistenciaArchivo",
                data: "{'File': '" + datosRow.vcNomAdj + "', 'CarpetaDominio': '" + CarpetaDominio + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if (result.d != '') {
                        window.parent.alerta("No se encuentra el archivo.");
                    } else {
                        DownloadFile(datosRow.vcNomAdj);
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        } else {
            window.parent.alerta("Seleccione un Item");
        }
    });


});

function DeleteFile(file) {
    $('#UploadStatus').html("Eliminando...");
    $.ajax({
        url: "UploadHandler.ashx?file=" + file + "&accion=delete&CarpetaDominio=" + CarpetaDominio,
        type: "GET",
        cache: false,
        async: true,
        success: function (html) {
            $('#UploadedFile').html("");
            $('#UploadStatus').html("");
            //$('#UploadStatus').html("El archivo fue eliminado, puede seleccionar otro archivo.");
            $("#UploadButton").show();

        }
    });
}
//RRAMOS 20141201----------------------------------------------------------------------------------
function DeleteFileNew(file, idFile) {
    $('#UploadStatus').html("Eliminando...");
    $.ajax({
        url: "UploadHandler.ashx?file=" + file + "&accion=delete&CarpetaDominio=" + CarpetaDominio,
        type: "GET",
        cache: false,
        async: true,
        success: function (html) {
            $('#UploadedFile').html("");
            $('#UploadStatus').html("");
            //$('#UploadStatus').html("El archivo fue eliminado, puede seleccionar otro archivo.");
            $("#UploadButton").show();

        }
    });
    var datosRow = $("#tblAdjuntos").jqGrid('getRowData', idFile);
    $("#tblAdjuntos").jqGrid('delRowData', idFile);
}
//-------------------------------------------------------------------------------------------------

function DownloadFile(file) {
    window.location.href = "UploadHandler.ashx?archivo=" + file + "&CarpetaDominio=" + CarpetaDominio;
}


$("#filesubido").live("click", function () {
    var archivo = $(this).attr("nombre");
    DownloadFile(archivo);
});


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


function DefineGrillaAdjuntos() {
    tblAdjuntos = $("#tblAdjuntos").jqGrid({
        sortable: true,
        datatype: 'local',
        colModel: [{ name: 'vcNomAdj', index: 'vcNomAdj', label: 'Nombre', hidden: false },
                   { name: 'inTamAdj', index: 'inTamAdj', label: 'Tamaño', hidden: false, width: '50px' },
                   { name: 'vcUbicacion', index: 'vcUbicacion', label: 'Ubicación', hidden: true },
                  ],
        //pager : '#pager',
        sortname: "P_inCod",
        sortorder: "asc",
        width: "350",
        height: "80",
        multiselect: false,
        rownumbers: true,
        caption: "Archivos Adjuntos"
    });

}

//function CargarGrillaAdjuntos(nombreAdjunto, tamañoAdjunto, ubicacionadjunto) {
function CargarGrillaAdjuntos(nombreAdjunto, tamanoAdjunto, ubicacionadjunto) {
    var idfila = 1;
    var idArrays = [];
    idArrays = $("#tblAdjuntos").getDataIDs();
    if (idArrays.length > 0) {
        idfila = parseInt(idArrays[idArrays.length - 1]) + 1;
    }
    $("#tblAdjuntos").jqGrid('addRowData', idfila, { id: idfila,
        'vcNomAdj': nombreAdjunto,
        //'inTamAdj': tamañoAdjunto,
        'inTamAdj': tamanoAdjunto,
        'vcUbicacion': ubicacionadjunto
    });
}

function ObtenerArchivos() {
    var Archivos = '';
    var rows = jQuery("#tblAdjuntos").getDataIDs();
    for (a = 0; a < rows.length; a++) {
        row = jQuery("#tblAdjuntos").getRowData(rows[a]);
        //row.colname1; row.colname2;
        Archivos = Archivos + "," + row.vcNomAdj + ":" + row.inTamAdj;
    }

    if (Archivos.length > 0) {
        Archivos = Archivos.substring(1, Archivos.length);
    }

    return Archivos;

}

function CargarArchivos(Archivos, OcultarBotones) {
    //Limpir Grilla
    //alert('x');
    $('#tblAdjuntos').jqGrid('clearGridData');

    if (Archivos != null && Archivos.length > 0) {
        var mArchivos = Archivos.split(",");
        var i;
        for (i = 0; i < mArchivos.length; i++) {
            CargarGrillaAdjuntos(mArchivos[i].split(":")[0], mArchivos[i].split(":")[1], 'xxxx');
        }
    }
    if (OcultarBotones != null && OcultarBotones == true) {
        $("#btnUpload").hide();
        $("#btnQuitar").hide();
     }
     else {
        $("#btnUpload").show();
        $("#btnQuitar").show();
     }
}