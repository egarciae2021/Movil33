//Nombre Anterior Imp_VisorTareaFacturacion2.js
var Modal;
$(function () {
    var inCodOpe1;
    var inCodTipTar1;
    var inCodEst1;
    var btnProcesar1;
    var btnCancelar1;
    var btnReProcesarTodo1;
    var btnReProcesarError1;
    var btnValidacion1;
    var btnRegistrar1;
    var btnEliminar1;
    var dialogDetalle1;

    $(".progressbar").progressbar({
        value: 0
    });

    $(".btnNormal").button({});
    var tbLog = $("#tbLog").jqGrid({
        datatype: "local",
        colModel: [{ name: 'IdLog', index: 'IdLog', label: 'IdLog', hidden: true, sortable: false },
            { name: 'FechaCreacion', index: 'FechaCreacion', label: 'Fecha Creación', width: '125', sortable: false },
            { name: 'Detalle', index: 'Detalle', label: 'Detalle', width: '380', sortable: false },
            { name: 'Tipo', index: 'Tipo', label: 'Tipo', width: '100', align: 'center', sortable: false },
            { name: 'IdCola', index: 'IdCola', label: 'Cola', hidden: true, sortable: false}],
        width: "670",
        height: "180",
        rownumbers: true,
        shrinkToFit: false,
        forcefit: true,
        caption: ""
    });


    var Alto = $(window).height() - 320;

    if (Alto < 120) {
        Alto = 120;
    }

    var tbTareas1 = $("#tbTareas1").jqGrid({
        datatype: "local",
        colModel: [{ name: 'P_inidCola', index: 'P_inidCola', label: 'CodCol', hidden: true, sortable: false },
            { name: 'VcFechaProgramacion', index: 'VcFechaProgramacion', label: 'Fecha programada', width: '125', sortable: false },
            { name: 'VcFechaCreacion', index: 'VcFechaCreacion', label: 'Fecha programada', hidden: true, sortable: false },
            { name: 'VcFechaEjecucion', index: 'VcFechaEjecucion', label: 'Fecha Ejecución', hidden: true, sortable: false },
            { name: 'IdTarea', index: 'IdTarea', label: 'CodTar', hidden: true, sortable: false },
            { name: 'Tarea', index: 'Tarea', label: 'Tarea', width: '200', sortable: false },
            { name: 'InAva', index: 'InAva', label: 'InAva', hidden: true, sortable: false },
            { name: 'progress', index: 'progress', label: 'Progreso', width: '500', sortable: false, formatter: function (value, options, rData) { return '<div id="progressbar' + value + '"></div>'; } },
            { name: 'IdEstado', index: 'IdEstado', label: 'CodEst', hidden: true, sortable: false },
            { name: 'VcEstado', index: 'VcEstado', label: 'Estado', width: '80', align: 'center', sortable: false },
            { name: 'VcFechaFinalizacion', index: 'VcFechaFinalizacion', label: 'Fecha Finalizacion', hidden: true, sortable: false },
            { name: 'Descripcion', index: 'Descripcion', label: 'Descripcion', hidden: true, sortable: false }
        ],
        width: $(window).width() - 40,
        height: Alto,
        rownumbers: true,
        shrinkToFit: false,
        forcefit: true,
        caption: "Tareas",
        onSelectRow: function (id) {
            DetalleTarea1();
        }
    });


    //    var tbTareas1 = $("#tbTareas1").jqGrid({
    //        sortable: true,
    //        datatype: "local",
    //        datatype: function () {
    //            $.ajax({
    //                url: "Mnt_CesesEmpleados.aspx/Listar", //PageMethod
    //                data: "{'inPagTam':'" + $('#tbTareas1').getGridParam("rowNum") + "'," +
    //                              "'inPagAct':'" + parseInt($('#tbTareas1').getGridParam("page")) + "'," +
    //                              "'inEst': '" + $("#ddlEstado1").val() + "'," +
    //                              "'inTar':'" + $("#ddlTarea1").val() + "'," +
    //                              "'inTipOri':'" + $("#hdfinTipOri").val() + "'}",
    //                dataType: "json",
    //                type: "post",
    //                contentType: "application/json; charset=utf-8",
    //                success: function (result) {
    ////                    $("#tbTareas1")[0].addJSONData(result.d);

    //                    var Tareas1 = new Array();
    //                    var x = 0;


    //                    $.each(result.d, function () {
    //                        Tareas1[x] = 0;
    //                        x = x + 1;
    //                    });

    //                    var datos = $("#tbTareas1").jqGrid('getRowData');

    //                    $(datos).each(function () {//Recorre la grilla los registro que encuentra los actualiza y los q no los borra
    //                        var P_Cola = this.P_inidCola;
    //                        var Existe = false;
    //                        x = 0;
    //                        $.each(result.d, function () {
    //                            if (P_Cola == this.P_inidCola) {
    //                                Existe = true;
    //                                Tareas1[x] = 1;

    //                                $("#tbTareas1").jqGrid('setRowData', P_Cola, { 'VcFechaProgramacion': this.VcFechaProgramacion, 'VcFechaCreacion': this.VcFechaCreacion, 'VcFechaEjecucion': this.VcFechaEjecucion, 'InAva': this.InAva,
    //                                    'IdEstado': this.IdEstado, 'VcEstado': this.VcEstado
    //                                });



    //                                $("#progressbar" + P_Cola).progressbar("option", "value", parseInt(this.InAva));


    //                                if ($("#hdfinCodCol1").val() == P_Cola) {
    //                                    $("#lblFechaCreacion1").html(this.VcFechaCreacion);
    //                                    $("#lblFechaEjecucion1").html(this.VcFechaEjecucion);
    //                                    $("#lblFechaFinalizacion1").html(this.VcFechaEjecucion);
    //                                    $("#lblObservacion1").html(this.Descripcion);
    //                                }

    //                                return false;
    //                            }
    //                            x = x + 1;
    //                        });
    //                        if (!Existe) {//Si no existe en la lista 
    //                            $("#tbTareas1").jqGrid('delRowData', P_Cola);
    //                            if ($("#hdfinCodCol1").val() == P_Cola) {
    //                                LimpiarDetalle();
    //                            }
    //                        }
    //                    });

    //                    x = 0;

    //                    $.each(result.d, function () {//Agrega los registros que no esten en la grilla
    //                        if (Tareas1[x] == 0) {
    //                            $("#tbTareas1").jqGrid('addRowData', this.P_inidCola, {
    //                                'P_inidCola': this.P_inidCola, 'VcFechaProgramacion': this.VcFechaProgramacion, 'VcFechaCreacion': this.VcFechaCreacion, 'VcFechaEjecucion': this.VcFechaEjecucion, 'IdTarea': this.IdTarea, 'Tarea': this.Tarea, 'InAva': this.InAva,
    //                                'progress': this.P_inidCola, 'IdEstado': this.IdEstado, 'VcEstado': this.VcEstado
    //                                //'vcVal': this.vcVal , 'vcImp': this.vcImp, 'botones': this.P_inCodCol
    //                            });

    //                            //                        MostrarAcciones(this.Estado.P_inCod, this.inTar, this.P_inCodCol, this.inLinNoReg);

    //                            $("#progressbar" + this.P_inidCola).progressbar({ value: parseInt(this.InAva) });
    //                            //                        EventosBotones(this.P_inCodCol);
    //                        }
    //                        x = x + 1;
    //                    });

    //                },
    //                error: function (xhr, err, thrErr) {
    //                    MostrarErrorAjax(xhr, err, thrErr);
    //                }
    //            });
    //        },
    //        jsonReader: //Set the jsonReader to the JQGridJSonResponse squema to bind the data.
    //                {
    //                root: "Items",
    //                page: "PaginaActual",
    //                total: "TotalPaginas",
    //                records: "TotalRegistros",
    //                repeatitems: true,
    //                cell: "Row",
    //                id: "P_inidCola"
    //            },
    //        colModel: [{ name: 'P_inidCola', index: 'P_inidCola', label: 'CodCol', hidden: true, sortable: false },
    //              { name: 'VcFechaProgramacion', index: 'VcFechaProgramacion', label: 'Fecha programada', width: '150', sortable: false },
    //                { name: 'VcFechaCreacion', index: 'VcFechaCreacion', label: 'Fecha programada', hidden: true, sortable: false },
    //              { name: 'VcFechaEjecucion', index: 'VcFechaEjecucion', label: 'Fecha Ejecución', hidden: true, sortable: false },
    //              { name: 'IdTarea', index: 'IdTarea', label: 'CodTar', hidden: true, sortable: false },
    //                { name: 'Tarea', index: 'Tarea', label: 'Tarea', width: '200', sortable: false },
    //                { name: 'InAva', index: 'InAva', label: 'InAva', hidden: true, sortable: false },
    //                { name: 'progress', index: 'progress', label: 'Progreso', width: '550', sortable: false, formatter: function (value, options, rData) { return '<div id="progressbar' + value + '"></div>'; } },
    //                { name: 'IdEstado', index: 'IdEstado', label: 'CodEst', hidden: true, sortable: false },
    //                { name: 'VcEstado', index: 'VcEstado', label: 'Estado', width: '130', sortable: false },
    //              { name: 'VcFechaFinalizacion', index: 'VcFechaFinalizacion', label: 'Fecha Finalizacion', hidden: true, sortable: false },
    //              { name: 'Descripcion', index: 'Descripcion', label: 'Descripcion', hidden: true, sortable: false }
    //               ],
    //        pager: "#pager", //Pager.
    //        loadtext: 'Cargando datos...',
    //        recordtext: "{0} - {1} de {2} elementos",
    //        emptyrecords: 'No hay resultados',
    //        pgtext: 'Pág: {0} de {1}', //Paging input control text format.
    //        rowNum: inFilas, //$("#hdfTamPag").val(), //"10" PageSize.
    //        rowList: TamanoPagina,  //TamanosPaginaSel, //Variable PageSize DropDownList. 
    //        sortname: "inCodGru", //sortname: idTabla, //Default SortColumn
    //        sortorder: "asc", //Default SortOrder.
    //        width: "1000",
    //        height: "180",
    //        rownumbers: true,
    //        shrinkToFit: false,
    //        forcefit: true,
    //        caption: "Tareas",
    //        onSelectRow: function (id) {
    //            DetalleTarea1();
    //        }
    //    });
    inicio1();

    function DetalleTarea1() {
        var inCodCol = -1;
        inCodCol = $("#tbTareas1").jqGrid('getGridParam', 'selrow');

        if (inCodCol) {
            $("#hdfinCodCol1").val(inCodCol);
            $("#dvDetalle1").show();
        }
        else {
            LimpiarDetalle1();
        }
    }

    function inicio1() {
        //        inCodEst1 = $("#ddlEstado1").val();
        //        inCodTipTar1 = $("#ddlTarea1").val();
        //        inCodOpe = $("#ddlOperador").val();
        CargaDatos1();
        $("#dvDetalle1").hide();
        //        $("#txtFechaProgramacion1").hide();
    }

    $.timer(1500, function (temporizador) {
        //temporizador.reset(retardo);//cambia el intervalo de tiempo
        CargaDatos1(temporizador);
    });

    function CargaDatos1(temporizador) {
        $.ajax({
            type: "POST",
            url: "Imp_VisorTareaFacturacion.aspx/MostrarTareas1",
            data: "{'inEst': '" + $("#ddlEstado1").val() + "'," +
                           "'inTar': '" + $("#ddlTarea1").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {



                //var Tareas1 = new Array();
                var Tareas1 = [];
                var x = 0;
                //                var k = 0;
                //                var i = 0;

                $.each(result.d, function () {
                    Tareas1[x] = 0;
                    x = x + 1;
                });

                var datos = $("#tbTareas1").jqGrid('getRowData');

                $(datos).each(function () {//Recorre la grilla los registro que encuentra los actualiza y los q no los borra
                    var P_Cola = this.P_inidCola;
                    var Existe = false;
                    x = 0;
                    $.each(result.d, function () {
                        if (P_Cola == this.P_inidCola) {
                            Existe = true;
                            Tareas1[x] = 1;

                            $("#tbTareas1").jqGrid('setRowData', P_Cola, { 'VcFechaProgramacion': this.VcFechaProgramacion, 'VcFechaCreacion': this.VcFechaCreacion, 'VcFechaEjecucion': this.VcFechaEjecucion, 'InAva': this.InAva,
                                'IdEstado': this.IdEstado, 'VcEstado': this.VcEstado
                            });



                            $("#progressbar" + P_Cola).progressbar("option", "value", parseInt(this.InAva));


                            if ($("#hdfinCodCol1").val() == P_Cola) {
                                $("#lblFechaCreacion1").html(this.VcFechaCreacion);
                                $("#lblFechaEjecucion1").html(this.VcFechaEjecucion);
                                $("#lblFechaFinalizacion1").html(this.VcFechaEjecucion);
                                $("#lblObservacion1").html(this.Descripcion);
                            }

                            return false;
                        }
                        x = x + 1;
                    });
                    if (!Existe) {//Si no existe en la lista 
                        $("#tbTareas1").jqGrid('delRowData', P_Cola);
                        if ($("#hdfinCodCol1").val() == P_Cola) {
                            LimpiarDetalle();
                        }
                    }
                });

                x = 0;

                $.each(result.d, function () {//Agrega los registros que no esten en la grilla
                    if (Tareas1[x] == 0) {
                        $("#tbTareas1").jqGrid('addRowData', this.P_inidCola, {
                            'P_inidCola': this.P_inidCola, 'VcFechaProgramacion': this.VcFechaProgramacion, 'VcFechaCreacion': this.VcFechaCreacion, 'VcFechaEjecucion': this.VcFechaEjecucion, 'IdTarea': this.IdTarea, 'Tarea': this.Tarea, 'InAva': this.InAva,
                            'progress': this.P_inidCola, 'IdEstado': this.IdEstado, 'VcEstado': this.VcEstado
                            //'vcVal': this.vcVal , 'vcImp': this.vcImp, 'botones': this.P_inCodCol
                        });

                        //                        MostrarAcciones(this.Estado.P_inCod, this.inTar, this.P_inCodCol, this.inLinNoReg);

                        $("#progressbar" + this.P_inidCola).progressbar({ value: parseInt(this.InAva) });
                        //                        EventosBotones(this.P_inCodCol);
                    }
                    x = x + 1;
                });
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    $("#ddlEstado1,#ddlTarea1").change(function () {
        inCodEst1 = $("#ddlEstado1").val();
        inCodTipTar1 = $("#ddlTarea1").val();
        //        inCodOpe = $("#ddlOperador").val();
        LimpiarDetalle1();
    });



    function LimpiarDetalle1() {
        $("#hdfinCodCol1").val("");
        $("#lblFechaCreacion1").html("");
        $("#lblFechaEjecucion1").html("");
        $("#lblFechaFinalizacion1").html("");
        //        $("#lblProcesado").html("");
        //        $("#lblErrado").html("");
        //        $("#lblDuplicado").html("");
        //        $("#lblLineasNoRegistradas").html("");
        //        $("#lblRestante").html("");
        //        $("#lblTotal").html("");
        $("#lblObservacion1").html("");
        //        $("#lblOperador").html("");
        //        $("#lblPeriodo").html("");
        //        $("#lstArchivo").html("");
        $("#dvDetalle1").hide();
    }

    $("#btnDetalle1").click(function () {
        $.ajax({
            type: "POST",
            url: "Imp_VisorTareaFacturacion.aspx/MostrarDetalleTarea",
            data: "{'IdCola': '" + $("#hdfinCodCol1").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                //                colModel: [{ name: 'IdLog', index: 'IdLog', label: 'IdLog', hidden: true, sortable: false },
                //                      { name: 'FechaCreacion', index: 'FechaCreacion', label: 'Fecha Creación', width: '150', sortable: false },
                //                      { name: 'Detalle', index: 'Detalle', label: 'Detalle', width: '300', sortable: false },
                //                      { name: 'Tipo', index: 'Tipo', label: 'Tipo', width: '50', sortable: false },
                //                  { name: 'IdCola', index: 'IdCola', label: 'Cola', width: '20', sortable: false}],


                $("#tbLog").jqGrid('clearGridData');

                if ($(result.d).length > 0) {
                    var i;
                    for (i = 0; i < $(result.d).length; i++) {
                        $("#tbLog").jqGrid('addRowData', result.d[i].IdLog, result.d[i]);
                        dialogDetalle = $("#dvDetalleProceso1").dialog({
                            title: "Detalle de Proceso",
                            modal: true,
                            resizable: false,
                            width: 700,
                            buttons: {
                                Cerrar: function () {
                                    $(this).dialog("close");
                                }
                            }
                        });
                    }
                }
                else {
                    Mensaje("<br/><h1>No se encontraron registros</h1><br/>", document);
                }

            }
        });
    });

    $(window).resize(function () {

        var Alto = $(window).height() - 320;

        if (Alto < 120) {
            Alto = 120;
        }

        $("#tbTareas1").setGridHeight(Alto);
        $("#tbTareas1").setGridWidth($(window).width() - 50);
    });


});