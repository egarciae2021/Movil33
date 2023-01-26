//carpeta de dominio
var CarpetaDiminio = '';

$(function () {
    CarpetaDiminio = window.top.$("#hdfCodigoDominio").val() != '' ? '/' + window.top.$("#hdfCodigoDominio").val() : '';

    //$("#btnListo").hide(); //agregado 08/05/2014 - wapumayta

    //agreagdo 27-08-2015 wapumayta
    var captionGrid = '';
    if ($("#hdfEstSolicitud").val() == "1") {
        captionGrid = 'Archivos Adjuntos (Doble click para descargar)';
    } else {
        captionGrid = 'Archivos cargados';
    }

    var adjuntosactuales = $("#hdfAdjuntosActuales").val();

    $(".btnNormal").button();
    var idcodsol = '';

    var vHeightGrialla = '120';
    if ($("#hdfEditable").val() == "0") {
        vHeightGrialla = '180';
        $("#tdCargarArchivo").hide();
    }

    var tblAdjuntos = $("#tblAdjuntos").jqGrid({
        sortable: true,
        datatype: 'local',
        colModel: [{ name: 'vcNomAdj', index: 'vcNomAdj', label: 'Nombre', hidden: false },
                   { name: 'inTamAdj', index: 'inTamAdj', label: 'Tamaño', hidden: false, width: '50px' },
                   { name: 'vcUbicacion', index: 'vcUbicacion', label: 'Ubicación', hidden: true },
                   { name: 'P_inIdAdj', index: 'P_inIdAdj', label: 'P_inIdAdj', hidden: true }
                  ],
        //pager : '#pager',
        sortname: "P_inCod",
        sortorder: "asc",
        width: "397",
        height: vHeightGrialla,
        multiselect: false,
        rownumbers: true,
        ondblClickRow: function (rowid, aData, rowelem) {
            var rowData = tblAdjuntos.getRowData(rowid);
            //alert(rowData.P_inIdAdj);
            //alert(arArchivosAdjuntos[rowData.P_inIdAdj].vcNomAdj);
            fnDescargarArchivo(arArchivosAdjuntos[rowData.P_inIdAdj].vcNomAdj, rowData.P_inIdAdj);
        },
        caption: captionGrid
    });

    $("#btnQuitar").click(function () {
        var id = $("#tblAdjuntos").jqGrid('getGridParam', 'selrow');
        var datosRow = $("#tblAdjuntos").jqGrid('getRowData', id);

        //window.parent.DeshabilitarContinuar('2');

        if (id) {
            if ($("#hdfEstSolicitud").val() != "1") {
                $("#tblAdjuntos").jqGrid('delRowData', id);
                EliminarTemporales(datosRow.vcUbicacion, datosRow.P_inIdAdj);

                totalAdj = $("#tblAdjuntos").getGridParam("reccount"); //numero de filas
                window.parent.numeroAdjuntos(totalAdj);
                var ubiarray = $("#tblAdjuntos").jqGrid('getCol', 'vcUbicacion', false); //array con las ubicaciones temporales
                window.parent.listaUbicaciones(ubiarray);
                window.parent.HabilitarContinuar('2');
            } else { //Editar solicitud
                //                alert("eliminar");

                $('#divConQui').dialog({
                    title: "Quitar Archivo Adjunto",
                    modal: true,
                    buttons: {
                        "Si": function () {
                            $("#tblAdjuntos").jqGrid('delRowData', id);
                            EliminarTemporales(datosRow.vcUbicacion, datosRow.P_inIdAdj);

                            $.ajax({
                                type: "POST",
                                url: "Adm_AdjuntarArchivos.aspx/EliminarArchivoBD",
                                data: "{'vcCodSol': '0', 'idAdj': '" + datosRow.P_inIdAdj + " '}",
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                success: function (result) {
                                    if (result.d == "1") {
                                        totalAdj = $("#tblAdjuntos").getGridParam("reccount"); //numero de filas
                                        window.parent.numeroAdjuntos(totalAdj);
                                    }
                                },
                                error: function (xhr, err, thrErr) {
                                    MostrarErrorAjax(xhr, err, thrErr);
                                }
                            });
                            $(this).dialog("close");
                        },
                        "Cancelar": function () {
                            $(this).dialog("close");
                        }
                    }
                });
            }
        }
        else {
            alerta("Seleccione un ítem");
        }
    });

    $("#btnCancelar").click(function () { //este botón solo se muestra en la edición de solicitudes
        var lstUbicaciones = $("#tblAdjuntos").jqGrid('getCol', 'vcUbicacion', false); //array con las ubicaciones temporales
        $.ajax({
            type: "POST",
            url: "Adm_AdjuntarArchivos.aspx/EliminarArchivosTemporales",
            data: "{'lstArchivos': '" + lstUbicaciones.join("|") + "', 'charSeparador': '|'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                window.parent.dvArchivosAdjuntos.dialog('close');
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });

    });

    $("#btnListo").click(function () {
        totalAdj = $("#tblAdjuntos").getGridParam("reccount"); //numero de filas
        window.parent.numeroAdjuntos(totalAdj);
        //var ubiarray = $("#tblAdjuntos").jqGrid('getCol', 'vcUbicacion', false); //array con las ubicaciones temporales
        //window.parent.listaUbicaciones(ubiarray);
        //if ($("#hdfOrigen").val() == '') {
        //    window.parent.Modal.dialog('close');
        //};
        var arUbicacionesAgregadas = [];
        var vcIdAdj = tblAdjuntos.getDataIDs();
        for (k = 0; k < vcIdAdj.length; k++) {
            var dataAdj = tblAdjuntos.getRowData(vcIdAdj[k]);
            //if (dataAdj.P_inIdAdj == "0") {
            arUbicacionesAgregadas.push(dataAdj.vcUbicacion);
            //}
        }

        if (arUbicacionesAgregadas.length > 0) {
            $.ajax({
                type: "POST",
                url: "Adm_AdjuntarArchivos.aspx/InsertarArchivoBD",
                data: "{'lstUbicaciones': '" + arUbicacionesAgregadas.join("|") + "', 'charSeparador': '|', 'vcCodSol': '" + $("#hdfCodsol").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    window.parent.dvArchivosAdjuntos.dialog('close');
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        } else {
            window.parent.dvArchivosAdjuntos.dialog('close');
        }
    });

    cargaArchivo();
    cargarAdjuntosActuales(adjuntosactuales);

});

function cargaArchivo() {

    //var $pagina = raiz("P_Movil/Administrar/Adm_CargarArchivo.aspx?TipSol=" + $("#hdfTipoSolicitud").val());
    var $pagina = raiz("P_Movil/Administrar/Adm_CargarArchivo.aspx?CanMax=" + $("#hdfCanMax").val() + "&ExtPer=" + $("#hdfExtPer").val() + "&TamTip=" + $("#hdfTamTip").val() + "&TamMax=" + $("#hdfTamMax").val() + "&TamMed=" + $("#hdfTamMed").val());
    
    //alert($pagina);

    $("#ifCargarArchivo").attr("src", $pagina);
}

function CargarGrillaAdjuntos(nombreAdjunto, tamanoAdjunto, ubicacionadjunto, inCodAdj) {
    var idfila = 1;
    var idArrays = [];
    idArrays = $("#tblAdjuntos").getDataIDs();
    if (idArrays.length > 0) {
	    idfila = parseInt(idArrays[idArrays.length - 1]) + 1;
    }
    $("#tblAdjuntos").jqGrid('addRowData', idfila, { id: idfila,
        'vcNomAdj': nombreAdjunto,
        'inTamAdj': tamanoAdjunto,
        'vcUbicacion': ubicacionadjunto,
        'P_inIdAdj': inCodAdj
    });
    if ($("#hdfEstSolicitud").val() == "0") {
        window.parent.DeshabilitarContinuar('2');
        totalAdj = $("#tblAdjuntos").getGridParam("reccount"); //numero de filas
        window.parent.numeroAdjuntos(totalAdj);
        var ubiarray = $("#tblAdjuntos").jqGrid('getCol', 'vcUbicacion', false); //array con las ubicaciones temporales
        window.parent.listaUbicaciones(ubiarray);
    }
}

function cargarAdjuntosActuales(adjact) {
    //alert("Adjuntos: " + adjact);
    if (adjact != "") {
        var aaArray = [];
        aaArray = adjact.split('||');
        var i = 0; 
        for (i = 0; i < aaArray.length; i++) {
            var datosArray = [];
            datosArray = aaArray[i].split('--');
            //alerta("Ubicacion: " + aaArray[i] + " Tamaño: " + datosArray[1] + " Nombre: " + datosArray[2]);
            CargarGrillaAdjuntos(datosArray[2], datosArray[1], aaArray[i], datosArray[3]);
        }
    }
}

function EliminarTemporales(arUbic, idAdj) {
    $.ajax({
        type: "POST",
        url: "Adm_AdjuntarArchivos.aspx/EliminarTemporales",
        data: "{'arUbic': '" + arUbic + "', 'idAdj':'" + idAdj + "' }",
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    });
}

//Archivos adjuntos
function fnDescargarArchivo(NomArc, inIdAdj) {
    //Descargar adjunto antes de grabar nota
    $.ajax({
        type: "POST",
        url: "Adm_AdjuntarArchivos.aspx/DescargarArchivoBD",
        data: "{'inIdAdj': '" + inIdAdj + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d == "1") {
                var filePath = "P_Movil/Administrar/Temporal/Solicitudes" + CarpetaDiminio + "/" + NomArc;
                SaveToDisk(filePath);

                //var filePath = "P_Movil/Administrar/Temporal/Solicitudes/" + NomArc;
                //window.location.href = raiz(filePath);
            } else {
                alerta('No se encontró el archivo a descargar.');
                //$('#UploadedFile').html("");
                //$("#UploadButton").show();
                //vcFileName = "";
            }
        },
        error: function (xhr, err) {
            $("#dvCargando").hide();
            alerta("Error, Estadow: " + xhr.readyState + "\nEstado: " + xhr.status);
        }
    });
}
function SaveToDisk(fileURL, fileName) {
    // for non-IE
    if (!window.ActiveXObject) {
        var save = document.createElement('a');
        save.href = raiz(fileURL);
        save.target = '_blank';
        save.download = fileName || fileURL;
        var evt = document.createEvent('MouseEvents');
        evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0,
            false, false, false, false, 0, null);
        save.dispatchEvent(evt);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }

    // for IE
    else if (!!window.ActiveXObject && document.execCommand) {
        var _window = window.open(raiz(fileURL), "_blank");
        _window.document.close();
        _window.document.execCommand('SaveAs', true, fileName || fileURL);
        _window.close();
    }
}
