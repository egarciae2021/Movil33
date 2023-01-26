var inCodCol = -1;
$(function () {

    var btnProcesar;
    //    var btnCancelar;
    var btnReProcesarError;
    var inCodEst;
    var inCodTipTar;

    $(".progressbar").progressbar({
        value: 0
    });

//    var tbLog = $("#tbLog").jqGrid({
//        datatype: function () {

//            var Buscar_Data = {
//                inPagTam: $('#tbLog').getGridParam("rowNum"),
//                inPagAct: $('#tbLog').getGridParam("page"),
//                vcOrdCol: $('#tbLog').getGridParam("sortname"),
//                vcTipOrdCol: $('#tbLog').getGridParam("sortorder"),
//                idCola: $("#hdfinCodCol").val()
//            }
//            $.ajax({
//                type: "POST",
//                url: "Comp_Proc_VisorTarea.aspx/MostrarDetalleTarea",
//                data: JSON.stringify(Buscar_Data),
//                contentType: "application/json; charset=utf-8",
//                dataType: "json",
//                success: function (result) {

//                    if ($(result.d).length > 0) {

//                        $("#tbLog")[0].addJSONData(result.d);

//                    } else {
//                        $("#tbLog").jqGrid("clearGridData");
//                    }
//                },
//                error: function (xhr, err, thrErr) {
//                    MostrarErrorAjax(xhr, err, thrErr);
//                }
//            });
//        },
//        colModel: [
//            { name: 'IdLog', index: 'IdLog', label: 'IdLog', hidden: true, sortable: false },
//            { name: 'VcFechaCreacion', index: 'VcFechaCreacion', label: 'Fecha Creación', width: '150', sortable: false },
//            { name: 'Descripcion', index: 'Descripcion', label: 'Detalle', width: '380', sortable: false },
//            { name: 'Tipo', index: 'Tipo', label: 'Tipo', width: '80', align: 'center', sortable: false },
//            { name: 'IdCola', index: 'IdCola', label: 'Cola', hidden: true, sortable: false }
//        ],
//        width: "680",
//        height: "180",
//        rownumbers: true,
//        shrinkToFit: false,
//        forcefit: true,
//        caption: "",
//        rowNum: 5,
//        rowList: [5, 10, 15],
//        pager: "pageLog",
//        loadtext: 'Cargando datos...',
//        recordtext: "{0} - {1} de {2} elementos",
//        emptyrecords: 'No hay resultados',
//        pgtext: 'Pág: {0} de {1}',
//        jsonReader: {
//            root: "Items",
//            page: "PaginaActual",
//            total: "TotalPaginas",
//            records: "TotalRegistros",
//            repeatitems: true,
//            cell: "Row",
//            id: "IdLog"
//        }
//    });

    function GenerarBotones(id) {
        return '<img id="btnReProcesarError' + id + '" src="../../../Common/Images/Mantenimiento/Regresar.png" alt="ReProcesar" class="imgBtn" title="Reprocesar error"/>';
    }

    var tbTareas = $("#tbTareas").jqGrid({
        datatype: "local",
        colModel: [{ name: 'IdCola', index: 'IdCola', label: 'CodCol', hidden: true, sortable: false },
                   { name: 'VcFechaProgramada', index: 'VcFechaProgramada', label: 'Fecha programada', width: '130', resizable: false, sortable: false },
   		           { name: 'VcFechaCreacion', index: 'VcFechaCreacion', label: 'Fecha programada', hidden: true, sortable: false },
                   { name: 'VcFechaEjecucion', index: 'VcFechaEjecucion', label: 'Fecha Ejecución', hidden: true, sortable: false },
                   { name: 'IdTarea', index: 'IdTarea', label: 'CodTar', hidden: true, sortable: false },
   		           { name: 'Tarea', index: 'Tarea', label: 'Tarea', width: '180', sortable: false, resizable: true },
   		           { name: 'Avance', index: 'Avance', label: 'InAva', hidden: true, sortable: false },
   		           { name: 'progress', index: 'progress', label: 'Progreso', width: '500', sortable: false, formatter: function (value, options, rData) { return '<div id="progressbar' + value + '"></div>'; } },
   		           { name: 'Estado', index: 'Estado', label: 'CodEst', hidden: true, sortable: false, resizable: false },
   		           { name: 'NombreEstado', index: 'NombreEstado', label: 'Estado', align: 'center', width: '100', sortable: false },
                   { name: 'VcFechaFinalizacion', index: 'VcFechaFinalizacion', label: 'Fecha Finalizacion', hidden: true, sortable: false },
                   { name: 'Descripcion', index: 'Descripcion', label: 'Descripcion', hidden: true, sortable: false },
                   { name: 'botones', index: 'botones', label: 'Acciones', width: '70', sortable: false, resizable: false, formatter: function (value, options, rData) { return GenerarBotones(value); } }
   	              ],
        width: $(window).width() - 100,
        height: $(window).height() - 320,
        rownumbers: true,
        shrinkToFit: false,
        forcefit: true,
        caption: "Tareas",
        hidegrid: false,
        onSelectRow: function (id) {
            var rowData = $(this).jqGrid("getRowData", id);
            if (rowData.Estado != 2) {
                DetalleTarea();
            } else {
                Mensaje("<br/><h1>El proceso se encuentra en curso. Espere...</h1><br/>", document, CerroMensaje);
            }
            
        },
        beforeSelectRow: function(rowId, e) {
            var data = $('#tbTareas').jqGrid('getRowData', rowId);
            if (data.Estado != 2) {
                return true;
            } else {
                $("#dvDetalle").hide();
                $("#tbTareas").jqGrid('resetSelection');
                Mensaje("<br/><h1>El proceso se encuentra en curso. Espere...</h1><br/>", document, CerroMensaje);
                return false;
            }
        }
    });

    inicio();

    function DetalleTarea() {

        inCodCol = $("#tbTareas").jqGrid('getGridParam', 'selrow');

        if (inCodCol) {
            $("#hdfinCodCol").val(inCodCol);
            $("#dvDetalle").show();
        }
        else {
            LimpiarDetalle();
        }
    };

    function inicio() {
        inCodEst=  $("#ddlEstado").val();
        inCodTipTar = $("#ddlTarea").val();
        CargaDatos();
        $("#dvDetalle").hide();
    }

    var timer = $.timer(1500, function (temporizador) {
        //temporizador.reset(retardo);//cambia el intervalo de tiempo
        CargaDatos(temporizador);       
    });

    function CargaDatos(temporizador) {
        $.ajax({
            type: "POST",
            url: "Comp_Proc_VisorTarea.aspx/MostrarTareas",
            data: "{'inEst': '" + inCodEst + "'," +
                           "'inTar': '" + inCodTipTar + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                var Tareas1 = [];
                var x = 0;

                $.each(result.d, function () {
                    Tareas1[x] = 0;
                    x = x + 1;
                });

                var datos = $("#tbTareas").jqGrid('getRowData');

                $(datos).each(function () {//Recorre la grilla los registro que encuentra los actualiza y los q no los borra
                    var P_Cola = this.IdCola;
                    var Existe = false;
                    x = 0;
                    $.each(result.d, function () {
                        if (P_Cola == this.IdCola) {
                            Existe = true;
                            Tareas1[x] = 1;

                            $("#tbTareas").jqGrid('setRowData', P_Cola, { 'VcFechaProgramada': this.VcFechaProgramada, 'VcFechaCreacion': this.VcFechaCreacion,
                                'VcFechaEjecucion': this.VcFechaEjecucion, 'Avance': this.Avance, 'Estado': this.Estado, 'NombreEstado': this.NombreEstado
                            });

                            $("#progressbar" + P_Cola).progressbar("option", "value", parseInt(this.Avance));

                            MostrarAcciones(this.Estado, this.IdTarea, this.IdCola);

                            if ($("#hdfinCodCol").val() == P_Cola) {
                                $("#lblFechaCreacion").html(this.VcFechaCreacion);
                                $("#lblFechaEjecucion").html(this.VcFechaEjecucion);
                                $("#lblFechaFinalizacion").html(this.VcFechaFinalizacion);
                                $("#lblObservacion").html(this.Descripcion);
                            }
                            return false;
                        }
                        x = x + 1;
                    });
                    if (!Existe) {//Si no existe en la lista 
                        $("#tbTareas").jqGrid('delRowData', P_Cola);
                        if ($("#hdfinCodCol").val() == P_Cola) {
                            LimpiarDetalle();
                        }
                    }
                });

                x = 0;

                $.each(result.d, function () {//Agrega los registros que no esten en la grilla
                    if (Tareas1[x] == 0) {
                        $("#tbTareas").jqGrid('addRowData', this.IdCola, {
                            'IdCola': this.IdCola, 'VcFechaProgramada': this.VcFechaProgramada, 'VcFechaCreacion': this.VcFechaCreacion, 'VcFechaEjecucion': this.VcFechaEjecucion, 'IdTarea': this.IdTarea, 'Tarea': this.Tarea, 'Avance': this.Avance,
                            'progress': this.IdCola, 'Estado': this.Estado, 'NombreEstado': this.NombreEstado, 'botones': this.IdCola
                            //'vcVal': this.vcVal , 'vcImp': this.vcImp, 'botones': this.P_inCodCol
                        });

                        MostrarAcciones(this.Estado, this.IdTarea, this.IdCola);

                        $("#progressbar" + this.IdCola).progressbar({ value: parseInt(this.Avance) });

                        EventosBotones(this.IdCola);
                    }
                    x = x + 1;
                });
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    $("#ddlEstado,#ddlTarea").change(function () {
        inCodEst = $("#ddlEstado").val();
        inCodTipTar = $("#ddlTarea").val();
        LimpiarDetalle();
    });

    function LimpiarDetalle() {
        $("#hdfinCodCol").val("");
        $("#lblFechaCreacion").html("");
        $("#lblFechaEjecucion").html("");
        $("#lblFechaFinalizacion").html("");
        $("#lblObservacion").html("");
        $("#dvDetalle").hide();
    }

    function MostrarAcciones(inEst, inTar, idCol) {
//        btnProcesar = $("#btnProcesar" + idCol);
        btnReProcesarError = $("#btnReProcesarError" + idCol);
        //         btnCancelar = $("#btnCancelar" + idCol);

//        btnProcesar.hide();
        btnReProcesarError.hide();
        //         btnCancelar.hide();

        switch (inEst) {
            case 1: //Pendiente
                switch (inTar) {
                    case 11: //
//                        btnProcesar.show();
                        break;
                    case 12: //Reprocesar erroneos
//                        btnProcesar.show();
                        break;
                }
                break;
            case 2: //En proceso
                //                btnCancelar.show();
                break;
            case 4: //Error
                //
                btnReProcesarError.show();
                break;
            default:
        }
    }

    function EventosBotones(idCola) {

        $("#btnReProcesarError" + idCola).click(function (event) {
            $('#divMsgConfirmacionAhora').dialog({
                title: "Confirmación",
                modal: true,
                resizable: false,
                buttons: {
                    Aceptar: function () {
                        $(this).dialog("close");

                        var inCodCol = $("#tbTareas").jqGrid('getGridParam', 'selrow');
                        EjecutarAccion("ReProcesarError", inCodCol);
                    },
                    Cancelar: function () {
                        $(this).dialog("close");
                    }
                }
            });
        });
    }

    function EjecutarAccion(Accion, idCola) {
        $.ajax({
            type: "POST",
            url: "Comp_Proc_VisorTarea.aspx/" + Accion,
            data: "{'idCola': '" + idCola + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d != "") {
                    alert(result.d);
                }
                else {
                    Mensaje("<br/><h1>La acción '" + "Reprocesar Error" + "' ha sido finalizada</h1><br/>", document, CerroMensaje);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    function CerroMensaje() {
    }

    $("#btnDetalle").click(function () {
        DetalleLog();
    });

    $(window).resize(function () {

        TamanioGrilla();
    });

    function TamanioGrilla() {
        //var panelwidth = $("#dvTareas").width();
        //var panelheitgh = $("#dvTareas").height();
        //$("#tbTareas").setGridWidth($(window).width() - 270);
        //$("#tbTareas").setGridHeight($(window).height() - 285);
        //if (panelwidth > 720) {
        //    $("#tbTareas").setGridWidth($(window).width() - 270);
        //}
        //else {
        //    $("#tbTareas").setGridWidth(700);
        //}
        //$("#tbTareas").setGridHeight($(window).height() - 455);

        var Alto = $(window).height() - 400;

        if (Alto < 150) {
            Alto = 150;
        }

        $("#tbTareas").setGridHeight(Alto - 50);
        $("#tbTareas").setGridWidth($(window).width() - 50);
    }

    TamanioGrilla();

});

function DetalleLog() {
    $("#tbLog").GridUnload();
    var tbLog = $("#tbLog").jqGrid({
        datatype: function () {

            var Buscar_Data = {
                inPagTam: $('#tbLog').getGridParam("rowNum"),
                inPagAct: $('#tbLog').getGridParam("page"),
                vcOrdCol: $('#tbLog').getGridParam("sortname"),
                vcTipOrdCol: $('#tbLog').getGridParam("sortorder"),
                idCola: $("#hdfinCodCol").val()
            }
            $.ajax({
                type: "POST",
                url: "Comp_Proc_VisorTarea.aspx/MostrarDetalleTarea",
                data: JSON.stringify(Buscar_Data),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {

                    if ($(result.d).length > 0) {

                        $("#tbLog")[0].addJSONData(result.d);

                        if ($('#tbLog').jqGrid('getRowData').length > 0) {
                            dialogDetalle = $("#dvDetalleProceso").dialog({
                                title: "Detalle de Proceso",
                                modal: true,
                                resizable: false,
                                width: 700,
                                buttons: {
                                    Cerrar: function() {
                                        $(this).dialog("close");
                                    }
                                }
                            });
                        } else {
                            Mensaje("<br/><h1>No existe registros del proceso seleccionado.</h1>", document, null);
                        }
                        
                    } else {
                        $("#tbLog").jqGrid("clearGridData");
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        colModel: [
            { name: 'IdLog', index: 'IdLog', label: 'IdLog', hidden: true, sortable: false },
            { name: 'VcFechaCreacion', index: 'VcFechaCreacion', label: 'Fecha Creación', width: '150', sortable: false },
            { name: 'Descripcion', index: 'Descripcion', label: 'Detalle', width: '380', sortable: false },
            { name: 'Tipo', index: 'Tipo', label: 'Tipo', width: '80', align: 'center', sortable: false },
            { name: 'IdCola', index: 'IdCola', label: 'Cola', hidden: true, sortable: false }
        ],
        width: "680",
        height: "185",
        rownumbers: true,
        shrinkToFit: false,
        forcefit: true,
        caption: "",
        rowNum: 8,
        rowList: [8, 16, 24],
        pager: "pageLog",
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}',
        jsonReader: {
            root: "Items",
            page: "PaginaActual",
            total: "TotalPaginas",
            records: "TotalRegistros",
            repeatitems: true,
            cell: "Row",
            id: "IdLog"
        }
    });
}