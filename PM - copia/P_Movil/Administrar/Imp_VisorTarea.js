var inOrdenArchivo;
var inCodCol = -1;
var valueSelected;
var textSelected;
var isSelectArchivo = false;
var Archivos;
var Modal;

var inTipPla;
var idTipPlanRes;

$(function () {

    $(window).resize(function () {
        DimPosElementos();
        //fnLateralSplitterDinamic();
    });

    CarpetaDominio = window.top.$("#hdfCodigoDominio").val() != '' ? '/' + window.top.$("#hdfCodigoDominio").val() : '';

    $("#ttgInfoSeleccion_dvToolTip").hide();
    $("#ttgInfoDescargar_dvToolTip").hide();

    var inCodOpe;
    var inCodTipTar;
    var inCodigoTipoTareaDescargar;
    var inCodEst;
    var btnProcesar;
    var btnCancelar;
    var btnReProcesarTodo;
    var btnReProcesarError;
    var btnValidacion;
    var btnRegistrar;
    var btnRegistrarServ;
    var btnEliminar;
    var dialogDetalle;


    var btn_exportartxt = $("#tderportartxt");
  

    $(".progressbar").progressbar({
        value: 0
    });

    $(".btnNormal").button({});

    $(".DATETIME").AnyTime_picker({
        format: "%d/%m/%Y %H:%i",
        labelTitle: "Fecha-Hora",
        labelHour: "Hora",
        labelMinute: "Minuto",
        labelSecond: "Segundo",
        labelYear: "Año",
        labelMonth: "Mes",
        labelDayOfMonth: "Dia",
        monthAbbreviations: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        dayAbbreviations: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
    });

    function GenerarBotones(id) {
        return '<img id="btnProcesar' + id + '" src="../../Common/Images/Mantenimiento/Procesar.png" alt="Procesar" class="imgBtn" title="Procesar ahora"/>' +
               '<img id="btnCancelar' + id + '" src="../../Common/Images/Mantenimiento/btnCancel.png" alt="Procesar" class="imgBtn" title="Cancelar Proceso"/>' +
               '<img id="btnReProcesarTodo' + id + '" src="../../Common/Images/Mantenimiento/Todos16.png" alt="ReProcesar" class="imgBtn" title="Reprocesar todos"/>' +
               '<img id="btnReProcesarError' + id + '" src="../../Common/Images/Mantenimiento/Regresar.png" alt="ReProcesar" class="imgBtn" title="Reprocesar erroneos"/>' +
               '<img id="btnValidacion' + id + '" src="../../Common/Images/Mantenimiento/Todo.png" alt="Validacion" class="imgBtn" title="Validar lineas"/>' +
               '<img id="btnRegistrar' + id + '" src="../../Common/Images/Mantenimiento/Validar.gif" alt="Registrar lineas" class="imgBtn" title="Registrar líneas"/>' +
               '<img id="btnRegistrarServ' + id + '" src="../../Common/Images/Mantenimiento/Validar.gif" alt="Registrar Servicios Asociados" class="imgBtn" title="Registrar Servicios Asociados"/>' +
               '<img id="btnEliminar' + id + '" src="../../Common/Images/Mantenimiento/delete_16x16.gif" alt="Eliminar" class="imgBtn" title="Eliminar tarea"/>';
    }

    var tbTareas = $("#tbTareas").jqGrid({
        datatype: "local",
        colModel: [{ name: 'P_inCodCol', index: 'P_inCodCol', label: 'CodCol', hidden: true, sortable: false },
                   { name: 'vcFecPro', index: 'vcFecPro', label: 'Fecha programada', width: '150', sortable: false },
                   { name: 'inTar', index: 'inTar', label: 'CodTar', hidden: true, sortable: false },
                   { name: 'vcTar', index: 'vcTar', label: 'Tarea', width: '200', sortable: false },
                   { name: 'inAva', index: 'inAva', label: 'inAva', hidden: true, sortable: false },
                   {
                       name: 'progress', index: 'progress', label: 'Progreso', width: '550', sortable: false, formatter:
                          function (value, options, rData) {
                              return '<div id="progressbar' + value + '" style="position: relative; z-index:1"></div><div id="dvOrdenTarea' + value + '" class="ui-widget-content" style="position: absolute;z-index:2;width:550px;margin-top:-18px;text-align:center;font-weight:bold;border:0px; background: transparent !important;"></div>';
                          }
                   },
                   { name: 'Estado.P_inCod', index: 'Estado.P_inCod', label: 'CodEst', hidden: true, sortable: false },
                   { name: 'Estado.vcNom', index: 'Estado.vcNom', label: 'Estado', width: '130', sortable: false },
                   { name: 'vcVal', index: 'vcVal', label: 'Validación', width: '0', hidden: true, sortable: false },
                   { name: 'vcImp', index: 'vcVal', label: 'Importación', width: '0', hidden: true, sortable: false },
                   {
                       name: 'botones', index: 'botones', label: 'Acciones', width: '100', sortable: false, formatter:
                          function (value, options, rData) {
                              return GenerarBotones(value);
                          }
                   }
                   , { name: 'inTipPla', index: 'inTipPla', label: 'TipoPla', hidden: true, sortable: false }, { name: 'idTipRes', index: 'idTipRes', label: 'TipoRes', hidden: true, sortable: false } //ECONDEÑA  16/11/2015
        ],
        //                sortname: "Estado.vcNom",
        //                sortorder: "asc",
        width: "1210",
        height: "180",
        rownumbers: true,
        shrinkToFit: false,
        forcefit: true,
        caption: "Tareas",
        onSelectRow: function (id) {
            DetalleTarea();
        }
    });

    inicio();

    function DetalleTarea() {

        $("#ttgInfoSeleccion_dvToolTip").hide();
        $("#ttgInfoDescargar_dvToolTip").hide();

        OcultarCampos_x_Archivos();
        inCodCol = $("#tbTareas").jqGrid('getGridParam', 'selrow');

        if (inCodCol) {
            $("#hdfinCodCol").val(inCodCol);
            $("#dvDetalle").show();
        }
        else {
            LimpiarDetalle();
        }
        $.ajax({
            type: "POST",
            url: "Imp_VisorTarea.aspx/MostrarTareas",
            data: "{'inEst': '" + inCodEst + "'," +
                    "'inTar': '" + inCodTipTar + "'," +
                    "'inOpe': '" + inCodOpe + "'," +
                    "'p_inCodCol': '" + inCodCol + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                inCodigoTipoTareaDescargar = result.d[0].inTar;
                if (result.d[0].inTar == "7") {
                    $("#trNoValidado").hide();
                    $("#trDuplicado").hide();
                    $("#trExcluidos").hide();
                    $("#trProcesado").show();
                    $("#trRestante").show();
                    $("#tdArchivo").show();
                    $("#tdTituloArchivo").show();
                    $("#lblTituloArchivo").html("Opciones");
                } else if (result.d[0].inTar == "4") {
                    $("#trNoValidado").hide();
                    if ($("#ddlEstado").val() == 3 || $("#ddlEstado").val() == 4) {
                        $("#trDuplicado").show();
                    } else {
                        $("#trDuplicado").hide();
                    }
                    //$("#trDuplicado").hide();
                    $("#trExcluidos").hide();
                    $("#trProcesado").hide();
                    $("#trRestante").hide();
                    $("#tdArchivo").hide();
                    $("#tdTituloArchivo").hide();
                    $("#lblTituloArchivo").html("Archivos");
                } else if (result.d[0].inTar == "11") {
                    $("#trDuplicado").hide();
                    $("#trExcluidos").hide();
                    $("#trProcesado").show();
                    $("#trRestante").show();
                    $("#tdArchivo").show();
                    $("#tdTituloArchivo").show();
                    $("#lblTituloArchivo").html("Opciones");
                    if (result.d[0].inContieneErroresPantillaImportacion > 0) {
                        $("#tdErrores").show();
                        $("#ttgInfoSeleccion_dvToolTip").hide();
                        $("#ttgInfoDescargarImportacionPlantilla_dvToolTip").show();
                    } else {
                        $("#ttgInfoDescargarImportacionPlantilla_dvToolTip").hide();
                    }
                } else if (result.d[0].inTar == "12") {
                    $("#trDuplicado").hide();
                    $("#trExcluidos").hide();
                    $("#trProcesado").show();
                    $("#trRestante").show();
                    $("#tdArchivo").show();
                    $("#tdTituloArchivo").show();
                    $("#lblTituloArchivo").html("Opciones");
                    if (result.d[0].inContieneErroresPantillaImportacion > 0) {
                        $("#tdErrores").show();
                        $("#ttgInfoSeleccion_dvToolTip").hide();
                        $("#ttgInfoDescargarImportacionPlantilla_dvToolTip").show();
                    } else {
                        $("#ttgInfoDescargarImportacionPlantilla_dvToolTip").hide();
                    }
                }
                else {
                    $("#trNoValidado").show();
                    if ($("#ddlEstado").val() == 3 || $("#ddlEstado").val() == 4) {
                        $("#trDuplicado").show();
                    } else {
                        $("#trDuplicado").hide();
                    }
                    //$("#trDuplicado").show();
                    $("#trExcluidos").show();
                    $("#trProcesado").show();
                    $("#trRestante").show();
                    $("#tdArchivo").show();
                    $("#tdTituloArchivo").show();
                    $("#lblTituloArchivo").html("Archivos");
                }

                $.each(result.d, function () {
                    if (this.P_inCodCol == inCodCol) {
                        if (result.d[0].inTar == "7") { //Actualizar
                            Detalles = this.Actualizar.Detalles;
                            $("#lstArchivo").html("");

                            $(Detalles).each(function () {
                                $("#lstArchivo").append($("<option></option>").attr("value", this.inOrd).text(this.inOrd + ". " + this.vcTipoDescripcion));
                            });
                        } else { //Proceso
                            Archivos = this.Proceso.Archivos;
                            $("#lstArchivo").html("");

                            $(Archivos).each(function () {
                                $("#lstArchivo").append($("<option></option>").attr("value", this.inOrd).text(this.vcTamUni + ' - ' + this.vcNom));
                            });
                        }

                        //<----- ECONDEÑA  12/11/2015
                        inTipPla = this.Proceso.Plantilla.PlantillaDetalles[0].inTipPla;
                        idTipPlanRes = this.Proceso.Plantilla.PlantillaDetalles[0].idTipPlanRes;
                        if (inTipPla == 2 && idTipPlanRes == 1) {
                            $("#lblNoRegis").text("Dispos. no Registrados:");
                        } else {
                            $("#lblNoRegis").text("Líneas no Registradas:");
                        }
                        //----->
                    }
                });
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    function inicio() {
        inCodEst = $("#ddlEstado").val();
        if ($("#ddlEstado").val() == 3 || $("#ddlEstado").val() == 4) {
            $("#trDuplicado").show();
        } else {
            $("#trDuplicado").hide();
        }
        inCodTipTar = $("#ddlTarea").val();
        inCodOpe = $("#ddlOperador").val();
        inCodCol = -1;
        CargaDatos();
        $("#dvDetalle").hide();
        $("#txtFechaProgramacion").hide();
    }

    var timer = $.timer(1500, function (temporizador) {
        //temporizador.reset(retardo);//cambia el intervalo de tiempo
        CargaDatos(temporizador);
    });

    function CargaDatos(temporizador) {
        $.ajax({
            type: "POST",
            url: "Imp_VisorTarea.aspx/MostrarTareas",
            data: "{'inEst': '" + inCodEst + "'," +
                   "'inTar': '" + inCodTipTar + "'," +
                   "'inOpe': '" + inCodOpe + "'," +
                    "'p_inCodCol': '" + -1 + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                //alert();
                var Tareas = [];
                var j = 0;
                var k = 0;
                var i = 0;

                //                        try {
                //                            if (result.d.length == 0) {
                //                                window.parent.$("#btnActualizar").hide();
                //                                window.parent.$("#btnEliminar").hide();
                //                            } else {
                //                                window.parent.$("#btnActualizar").show();
                //                                window.parent.$("#btnEliminar").show();
                //                            }
                //                        } catch (Error) {
                //                            timer.stop();
                //                        }

                $.each(result.d, function () {
                    Tareas[j] = 0;
                    j++;
                });

                var datos = $("#tbTareas").jqGrid('getRowData');

                $(datos).each(function () {//Recorre la grilla los registro que encuentra los actualiza y los q no los borra
                    var P_inCodCol = this.P_inCodCol;
                    var Existe = false;
                    j = 0;
                    $.each(result.d, function () {
                        if (P_inCodCol == this.P_inCodCol) {
                            Existe = true;
                            Tareas[j] = 1;

                            //alert($("#ddlEstado").val());


                            $("#tbTareas").jqGrid('setRowData', P_inCodCol, {
                                'vcFecPro': this.vcFecPro, 'inAva': this.inAva, 'Estado.P_inCod': this.Estado.P_inCod, 'Estado.vcNom': this.Estado.vcNom,
                                'vcVal': this.vcVal, 'vcImp': this.vcImp
                                , 'inTipPla': this.Proceso.Plantilla.PlantillaDetalles[0].inTipPla, 'idTipRes': this.Proceso.Plantilla.PlantillaDetalles[0].idTipPlanRes    //ECONDEÑA  16/11/2015
                            }); //0j0 variable 'i' se obvio

                            $("#progressbar" + P_inCodCol).progressbar("option", "value", parseInt(this.inAva));
                            //$("#progressbar" + P_inCodCol).progressbar("option", "value", 25);

                            if ($("#ddlEstado").val() == 3 || $("#ddlEstado").val() == 4) {
                                $("#trDuplicado").show();
                            } else {
                                $("#trDuplicado").hide();
                            }

                            if (this.Actualizar.P_inCodAct != -"1" && this.Actualizar.inIdTarEnCur > -1) {
                                if (this.Actualizar.Detalles[0] != undefined) {
                                    var x = 0;
                                    for (x = 0; x < this.Actualizar.Detalles.length; x++) {
                                        if (this.Actualizar.inIdTarEnCur == this.Actualizar.Detalles[x].inIdTipoActualizar) {
                                            $("#dvOrdenTarea" + P_inCodCol).html(this.Actualizar.Detalles[x].inOrd + " de " + this.Actualizar.inTotTar);

                                        }
                                    }
                                }
                            } else if (this.Eliminar.P_inCodEli != "-1" && this.Eliminar.inOrdMes > -1) {
                                $("#dvOrdenTarea" + P_inCodCol).html(this.Eliminar.inOrdMes + " de " + this.Eliminar.inCanMesEli);
                            } else {
                                $("#dvOrdenTarea" + P_inCodCol).html("");
                            }

                            MostrarAcciones(this.Estado.P_inCod, this.inTar, P_inCodCol, this.inLinNoReg, this.inSerNoReg);

                            if ($("#hdfinCodCol").val() == P_inCodCol) {
                                $("#lblFechaCreacion").html(this.vcFecCre);
                                $("#lblFechaEjecucion").html(this.vcFecEje);
                                $("#lblFechaFinalizacion").html(this.vcFecFin);
                                $("#lblProcesado").html(this.inPro);
                                $("#lblErrado").html(this.inErr);
                                $("#LblNoValidado").html(this.inNoVal);
                                if (this.inErr > 0) {
                                    if (!isSelectArchivo) {
                                        if (inCodigoTipoTareaDescargar == 11 || inCodigoTipoTareaDescargar == 12) {
                                            $("#ttgInfoSeleccion_dvToolTip").hide();
                                        } else {
                                            $("#ttgInfoSeleccion_dvToolTip").show();
                                        }
                                    } else {
                                        $("#ttgInfoSeleccion_dvToolTip").hide();
                                    }
                                } else {
                                    if (!isSelectArchivo) {
                                        $("#ttgInfoSeleccion_dvToolTip").hide();
                                        $("#ttgInfoDescargar_dvToolTip").hide();
                                    }
                                }
                                $("#lblDuplicado").html(this.inDup);
                                $("#lblExcluidos").html(this.inExcluidos);
                                $("#lblLineasNoRegistradas").html(this.inLinNoReg);
                                $("#lblServiciosNoRegistrados").html(this.inSerNoReg);
                                $("#lblRestante").html(this.inRes);
                                $("#lblTotal").html(this.inTot);

                                var str = this.vcDes;
                                str = str.substring(0, 32);
                                //alert(str);

                                if (str != "Culminación de Proceso con error") {
                                    $("#lblObservacion").html(this.vcDes + '.');
                                    $("#tdDescargarLog").hide();
                                }
                                else {
                                    $("#lblObservacion").html(str + '.');
                                    $("#tdDescargarLog").show();
                                }


                                $("#lblTareaOriginal").html(this.Proceso.vcTarCre);

                                if (this.Proceso.inPro == 0) {
                                    $("#lblProgramacionOriginal").html("Ahora(" + this.Proceso.vcFecPro + ")");
                                }
                                else {
                                    $("#lblProgramacionOriginal").html("Programado(" + this.Proceso.vcFecPro + ")");
                                }

                                $("#lblTipoArchivo").html(this.Proceso.vcNomArc);
                                $("#lblNumeroPlantilla").html(this.Proceso.Plantilla.inCodNum);
                                $("#lblExtensionArchivo").html(this.Proceso.vcExtArc);
                                $("#lblTipoTelefonia").html(this.Proceso.vcTipTel);
                                $("#lblTipoCambio").html(this.Proceso.dcTipCam);

                                if (this.Proceso.btUniBitEnvRec) {
                                    $("#lblUnirBitsEnvRec").html("Si");
                                }
                                else {
                                    if (this.Proceso.btBitEnvRec) {
                                        $("#lblUnirBitsEnvRec").html("No(Bits Enviados)");
                                    }
                                    else {
                                        $("#lblUnirBitsEnvRec").html("No(Bits Recibidos)");
                                    }
                                }

                                $("#lblServDefecto").html(this.Proceso.ServicioPorDefecto.vcNom);
                                $("#lblEmpleadoDefecto").html(this.Proceso.EmpleadoPorDefecto.vcNom);

                                if (this.Proceso.btActCos) {
                                    $("#lblActualizaCosto").html("Si");
                                }
                                else {
                                    $("#lblActualizaCosto").html("No");
                                }

                                if (this.Proceso.P_inCodPro != -1) {

                                    $("#lblOperador").html(this.Proceso.Operador.vcNomOpe);
                                    $("#lblPeriodo").html(this.Proceso.vcMesPer);
                                }
                                else if (this.Actualizar.P_inCodAct != -1) {
                                    $("#lblPeriodo").html(this.Actualizar.vcPeriodo);
                                    $("#lblOperador").html(this.Actualizar.Operador.vcNomOpe);
                                    $("#tdErrores").hide();
                                    //$("#lstArchivo").html("");
                                }
                                else if (this.Eliminar.P_inCodEli != -1) {
                                    //$("#progressbar" + P_inCodCol).progressbar("option", "value", 25);
                                    var Operadores = this.Eliminar.Operadores;
                                    var Operador = "";
                                    $("#lblPeriodo").html(this.Eliminar.vcMesPer);
                                    $("#tdErrores").hide();
                                    $(Operadores).each(function () {
                                        if (Operador != "") {
                                            Operador += ",";
                                        }
                                        Operador += this.vcNomOpe;
                                    });
                                    $("#lblOperador").html(Operador);
                                }
                            }
                            //                                    else { 
                            //                                    alert(1)
                            //                                    }

                            return false;
                        }
                        j++;
                    });
                    if (!Existe) {//Si no existe en la lista 
                        $("#tbTareas").jqGrid('delRowData', P_inCodCol);
                        if ($("#hdfinCodCol").val() == P_inCodCol) {
                            LimpiarDetalle();
                        }
                    }
                });

                j = 0;

                $.each(result.d, function () {//Agrega los registros que no esten en la grilla
                    if (Tareas[j] == 0) {
                        $("#tbTareas").jqGrid('addRowData', this.P_inCodCol, {
                            'P_inCodCol': this.P_inCodCol, 'vcFecPro': this.vcFecPro, 'inTar': this.inTar, 'vcTar': this.vcTar, 'inAva': this.inAva,
                            'progress': this.P_inCodCol, 'Estado.P_inCod': this.Estado.P_inCod, 'Estado.vcNom': this.Estado.vcNom,
                            'vcVal': this.vcVal, 'vcImp': this.vcImp, 'botones': this.P_inCodCol
                        });

                        MostrarAcciones(this.Estado.P_inCod, this.inTar, this.P_inCodCol, this.inLinNoReg, this.inSerNoReg);

                        $("#progressbar" + this.P_inCodCol).progressbar({ value: parseInt(this.inAva) });
                        EventosBotones(this.P_inCodCol);
                    }
                    j++;
                });
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    $('#lstArchivo').change(function () {
        var optionSelected = $(this).find("option:selected");

        $.ajax({
            type: "POST",
            url: "Imp_VisorTarea.aspx/MostrarDetalle_x_Archivo",
            data: "{'inEst': '" + inCodEst + "'," +
                    "'inTar': '" + inCodTipTar + "'," +
                    "'inOpe': '" + inCodOpe + "'," +
                    "'p_inCodCol': '" + inCodCol + "'," +
                    "'p_inOrden': '" + optionSelected.val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                $.each(result.d, function () {
                    if (this.P_inCodCol == inCodCol) {
                        if (this.Estado.P_inCod == 3 || this.Estado.P_inCod == 4) {
                            isSelectArchivo = true;
                            $("#tdProcesados").hide();
                            $("#tdArchivoProcesados").show();
                            $("#lblArchivoProcesado").html(this.inPro);

                            $("#tdErrado").hide();
                            $("#tdArchivoErrado").show();
                            $("#lblArchivoErrado").html(this.inErr);
                            if (this.inErr > 0) {
                                $("#tdErrores").show();
                                $("#ttgInfoSeleccion_dvToolTip").hide();
                                $("#ttgInfoDescargar_dvToolTip").show();
                            } else {
                                $("#tdErrores").hide();
                                $("#ttgInfoSeleccion_dvToolTip").hide();
                                $("#ttgInfoDescargar_dvToolTip").hide();
                            }

                            $("#tdNoValidado").hide();
                            $("#tdArchivoNoValidado").show();
                            $("#LblArchivoNoValidado").html(this.inNoVal);

                            $("#tdDuplicado").hide();
                            $("#tdArchivoDuplicado").show();
                            $("#lblArchivoDuplicado").html(this.inDup);

                            $("#tdRestante").hide();
                            $("#tdArchivoRestante").show();
                            $("#lblArchivoRestante").html(this.inRes);

                            $("#tdTotal").hide();
                            $("#tdArchivoTotal").show();
                            $("#lblArchivoTotal").html(this.inTot);

                            $("#tdObservacion").hide();
                            $("#tdArchivoObservacion").show();
                            $("#lblArchivoObservacion").html(this.vcDes);

                            var Tarea_x_Archivos = this.Proceso.Archivos;

                            $(Tarea_x_Archivos).each(function () {
                                textSelected = this.vcNom;
                            });

                        }
                    }
                });
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });



        //textSelected = optionSelected.text();

    });

    //$('#btnDescargar').click(function () {
    //    debugger;
    //    var strExt = textSelected.split(".").pop();
    //    var strNomArchivo = textSelected.substring(0, textSelected.length - strExt.length - 1) + ".ERR";
    //    DownloadFile(strNomArchivo);
    //});

    $('#btnDescargar').click(function () {
        if (inCodigoTipoTareaDescargar == 11 || inCodigoTipoTareaDescargar == 12) {
            $.ajax({
                type: "POST",
                url: "Imp_VisorTarea.aspx/DescargarExcelErroresImportacion",
                data: "{'inTar': '" + inCodigoTipoTareaDescargar + "'," +
                        "'p_inCodCol': '" + inCodCol + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + result.d);
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        } else {
            var strExt = textSelected.split(".").pop();
            var strNomArchivo = textSelected.substring(0, textSelected.length - strExt.length - 1) + ".ERR";
            DownloadFile(strNomArchivo);
        }
    });


    //JPAREJA para obtener la ruta de descarga de archivo
    $('#btnDescargartxt').click(function () { 
        var inCodCol = $("#tbTareas").jqGrid('getGridParam', 'selrow'); 
            $.ajax({
                type: "POST",
                url: "Imp_VisorTarea.aspx/ObtenerLineasNoRegistradas",
                data: "{'inCodCol':'" + inCodCol +"'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    
                    window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + result.d[0] + "&Usuario=" + result.d[2] + "&Dominio=" + result.d[3] );
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
       
    });



    $("#imgObservacion").click(function () {
        //var strNomArchivo = "ImportadorLineas.log";
        var strNomArchivo = "SrvImportadorLineas.log";
        //DownloadFile(strNomArchivo);
        //window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=C:\\Test\\_ImportadorLineas.log");

        $.ajax({
            type: "POST",
            url: "Imp_VisorTarea.aspx/ObtenerRuta",
            data: "{'idRuta': '10'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                //alert(result.d);
                
                if (result.d.toString() != "") {
                    //alert(raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + result.d + strNomArchivo + "&remoto=2"));

                    var myRuta = result.d.split('|')[0];
                    var myIdDominio = result.d.split('|')[1];
                    var myIdUsuario = result.d.split('|')[2];
                    var RutaCompleta = myRuta + "\\" + myIdDominio + "\\" + strNomArchivo;
                    debugger;

                    if (RutaCompleta.substr(0, 2) != "\\\\") {
                        RutaCompleta = RutaCompleta.replace("\\\\", "\\")
                    }

                    window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + RutaCompleta + "&remoto=2&Dominio=" + myIdDominio + "&Usuario=" + myIdUsuario);
                    //window.location.href = raiz("../Common/Controladores/DescargarArchivo.ashx?archivo=" + result.d + strNomArchivo + "&remoto=2"); //
                }
            }
        });

    });

    $("#ddlOperador,#ddlEstado,#ddlTarea").change(function () {
        OcultarCampos_x_Archivos();
        inCodEst = $("#ddlEstado").val();
        inCodTipTar = $("#ddlTarea").val();
        inCodOpe = $("#ddlOperador").val();
        LimpiarDetalle();
    });

    function DownloadFile(file) {
        $.ajax({
            type: "POST",
            url: "Imp_VisorTarea.aspx/ExisteArchivoError",
            data: "{'vcNombreArchivo': '" + file + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d != "" && result.d != "0") {
                    window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + result.d + "&remoto=1");
                }
                else {
                    alerta("No se encontró el archivo indicado.");
                }
            }
        });


        //window.location.href = "UploadHandler.ashx?archivo=" + file;
    }

    //function DownloadFile(file) {
    //    window.location.href = "UploadHandler.ashx?archivo=" + file;
    //}

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
            //alert(fileURL + "\n" + fileURL);
            var _window = window.open(raiz(fileURL), "_blank");
            _window.document.close();
            _window.document.execCommand('SaveAs', true, fileName || raiz(fileURL));
            _window.close();
        }
    }

    function EventosBotones(P_inCodCol) {
        $("#btnProcesar" + P_inCodCol).click(function (event) {
            $('#divMsgConfirmacionAhora').dialog({
                title: "Confirmación",
                modal: true,
                resizable: false,
                buttons: {
                    Aceptar: function () {
                        $(this).dialog("close");

                        var inCodCol = $("#tbTareas").jqGrid('getGridParam', 'selrow');
                        EjecutarAccion("Procesar", inCodCol);
                    },
                    Cancelar: function () {
                        $(this).dialog("close");
                    }
                }
            });
        });

        $("#btnReProcesarTodo" + P_inCodCol).click(function (event) {
            $('#divMsgConfirmacion').dialog({
                title: "Confirmación",
                modal: true,
                resizable: false,
                buttons: {
                    Aceptar: function () {
                        $(this).dialog("close");

                        var inCodCol = $("#tbTareas").jqGrid('getGridParam', 'selrow');
                        $('#dvProgramacion').dialog({
                            title: "Programación de tarea",
                            modal: true,
                            resizable: false,
                            buttons: {
                                Aceptar: function () {
                                    var inProg = $("input[name='rbProgramacion']:checked").val();
                                    var dtFecPro;

                                    if (inProg == 0) {
                                        dtFecPro = "";
                                    }
                                    else if (inProg == 1) {
                                        if ($("#txtFechaProgramacion").val() != "") {
                                            dtFecPro = $("#txtFechaProgramacion").val();
                                        }
                                        else {
                                            alerta("Ingrese una fecha");
                                            $("#txtFechaProgramacion").focus();
                                            return;
                                        }
                                    }

                                    $.ajax({
                                        type: "POST",
                                        url: "Imp_VisorTarea.aspx/ReProcesarTodo",
                                        data: "{'inCodCol': '" + inCodCol + "'," +
                                               "'dtFecPro': '" + dtFecPro + "'}",
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "json",
                                        success: function (result) {
                                            if (result.d != "") {
                                                alert(result.d);
                                            }
                                            else {
                                                Mensaje("<br/><h1>Se volvera a ejecutar todo el proceso</h1><br/>", document, CerroMensaje);
                                            }
                                        },
                                        error: function (xhr, err, thrErr) {
                                            MostrarErrorAjax(xhr, err, thrErr);
                                        }
                                    });
                                    $(this).dialog("close");
                                },
                                Cancelar: function () {
                                    $(this).dialog("close");
                                }
                            }
                        });
                    },
                    Cancelar: function () {
                        $(this).dialog("close");
                    }
                }
            });
        });

        $("#btnReProcesarError" + P_inCodCol).click(function (event) {
            $('#divMsgConfirmacion').dialog({
                title: "Confirmación",
                modal: true,
                resizable: false,
                buttons: {
                    Aceptar: function () {
                        $(this).dialog("close");
                        var inCodCol = $("#tbTareas").jqGrid('getGridParam', 'selrow');
                        $('#dvProgramacion').dialog({
                            title: "Programación de tarea",
                            modal: true,
                            resizable: false,
                            buttons: {
                                Aceptar: function () {
                                    var inProg = $("input[name='rbProgramacion']:checked").val();
                                    var dtFecPro;

                                    if (inProg == 0) {
                                        dtFecPro = "";
                                    }
                                    else if (inProg == 1) {
                                        if ($("#txtFechaProgramacion").val() != "") {
                                            dtFecPro = $("#txtFechaProgramacion").val();
                                        }
                                        else {
                                            alerta("Ingrese una fecha");
                                            $("#txtFechaProgramacion").focus();
                                            return;
                                        }
                                    }

                                    $.ajax({
                                        type: "POST",
                                        url: "Imp_VisorTarea.aspx/ReProcesarError",
                                        data: "{'inCodCol': '" + inCodCol + "'," +
                                               "'dtFecPro': '" + dtFecPro + "'}",
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "json",
                                        success: function (result) {
                                            if (result.d != "") {
                                                alert(result.d);
                                            }
                                            else {
                                                Mensaje("<br/><h1>Se volvera a procesar los registros erroneos</h1><br/>", document, CerroMensaje);
                                            }
                                        },
                                        error: function (xhr, err, thrErr) {
                                            MostrarErrorAjax(xhr, err, thrErr);
                                        }
                                    });
                                    $(this).dialog("close");
                                },
                                Cancelar: function () {
                                    $(this).dialog("close");
                                }
                            }
                        });
                    },
                    Cancelar: function () {
                        $(this).dialog("close");
                    }
                }
            });
        });

        $("#btnCancelar" + P_inCodCol).click(function (event) {
            $('#divMsgConfirmacionCancelacionProceso').dialog({
                title: "Confirmación",
                modal: true,
                resizable: false,
                buttons: {
                    Aceptar: function () {
                        $(this).dialog("close");
                        var inCodCol = $("#tbTareas").jqGrid('getGridParam', 'selrow');
                        EjecutarAccion("CancelarProceso", inCodCol);
                    },
                    Cancelar: function () {
                        $(this).dialog("close");
                    }
                }
            });
        });



        //                $(".btnValidacion").click(function (event) {
        //                    var inCodCol = $("#tbTareas").jqGrid('getGridParam', 'selrow');
        //                    EjecutarAccion("Validacion", inCodCol);
        //                });

        $("#btnEliminar" + P_inCodCol).click(function (event) {
            $('#divMsgConfirmacionEliminar').dialog({
                title: "Confirmación",
                modal: true,
                resizable: false,
                buttons: {
                    Aceptar: function () {
                        $(this).dialog("close");

                        var inCodCol = $("#tbTareas").jqGrid('getGridParam', 'selrow');
                        EjecutarAccion("Eliminar", inCodCol);
                    },
                    Cancelar: function () {
                        $(this).dialog("close");
                    }
                }
            });
        });

        $("#btnRegistrar" + P_inCodCol).click(function (event) {
            var cod = $(this).attr("id").replace("btnRegistrar", "");
            var inCodCol = $("#tbTareas").jqGrid('getGridParam', 'selrow');

            //<----- ECONDEÑA   12/11/2015
            if (inCodCol == null || inCodCol != cod)
                inCodCol = cod;
            inTipPla = $("#tbTareas").jqGrid('getCell', inCodCol, 'inTipPla');
            idTipPlanRes = $("#tbTareas").jqGrid('getCell', inCodCol, 'idTipRes');

            var $width = 550;
            var $height = 402;

            var $titulo = "Registro de " + (idTipPlanRes != 1 && inTipPla != 2 ? "líneas" : "dispositivos");
            var $Pagina = 'Imp_RegistroLinea.aspx?inCodCol=' + inCodCol.toString() + '&idTipRes=' + idTipPlanRes + '&inTipPla=' + inTipPla;
            //----->
            $("#if1").attr("src", $Pagina);
            Modal = $('#dvRegistroLinea').dialog({
                title: $titulo,
                width: $width,
                height: $height,
                modal: true,
                resizable: false
            });
        });


        $("#btnRegistrarServ" + P_inCodCol).click(function (event) {
            var cod = $(this).attr("id").replace("btnRegistrarServ", "");
            var inCodCol = $("#tbTareas").jqGrid('getGridParam', 'selrow');

            //<----- ECONDEÑA   12/11/2015
            if (inCodCol == null || inCodCol != cod)
                inCodCol = cod;
            inTipPla = $("#tbTareas").jqGrid('getCell', inCodCol, 'inTipPla');
            idTipPlanRes = $("#tbTareas").jqGrid('getCell', inCodCol, 'idTipRes');

            var $width = 550;
            var $height = 402;

            var $titulo = "Registro de " + (idTipPlanRes != 1 && inTipPla != 2 ? "Servicios" : "Servicios");
            var $Pagina = 'Imp_RegistroServicio.aspx?inCodCol=' + inCodCol.toString() + '&idTipRes=' + idTipPlanRes + '&inTipPla=' + inTipPla;
            //----->
            $("#if2").attr("src", $Pagina);
            Modal = $('#dvRegistroServicio').dialog({
                title: $titulo,
                width: $width,
                height: $height,
                modal: true,
                resizable: false
            });
        });

    }

    $("#rbProgramacion").change(function () {
        var valor = $("input[name='rbProgramacion']:checked").val();
        if (valor == "0") {
            $("#txtFechaProgramacion").hide();
            $("#txtFechaProgramacion").val("");
        }
        else if (valor == "1") {
            $("#txtFechaProgramacion").show();
        }
    });

    function EjecutarAccion(Accion, inCodCol) {
        $.ajax({
            type: "POST",
            url: "Imp_VisorTarea.aspx/" + Accion,
            data: "{'inCodCol': '" + inCodCol + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d != "") {
                    alert(result.d);
                }
                else {
                    Mensaje("<br/><h1>La acción '" + Accion + "' ha sido finalizada</h1><br/>", document, CerroMensaje);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    function CerroMensaje() {
    }
   
   
    function MostrarAcciones(inEst, inTar, idCol, inLinNoReg, inSerNoReg) {
        
        btnProcesar = $("#btnProcesar" + idCol);
        btnCancelar = $("#btnCancelar" + idCol);
        btnReProcesarTodo = $("#btnReProcesarTodo" + idCol);
        btnReProcesarError = $("#btnReProcesarError" + idCol);
        btnValidacion = $("#btnValidacion" + idCol);
        btnRegistrar = $("#btnRegistrar" + idCol);
        btnRegistrarServ = $("#btnRegistrarServ" + idCol);
        btnEliminar = $("#btnEliminar" + idCol);

        ///Para ocultar el boton de exportar jpareja
        btn_exportartxt.hide();

        btnProcesar.hide();
        btnCancelar.hide();
        btnReProcesarTodo.hide();
        btnReProcesarError.hide();
        btnValidacion.hide();
        btnRegistrar.hide();
        btnRegistrarServ.hide();
        btnEliminar.hide();

        switch (inEst) {
            case 1: //Pendiente
                
                switch (inTar) {
                    case 1: //Validar lineas
                        //
                        break;
                    case 2: //Importación
                        btnProcesar.show();
                        //btnValidacion.show();
                        break;
                    case 3: //Validar e importar
                        btnProcesar.show();
                        break;
                    case 4: //Eliminar llamadas
                        //
                        break;
                    case 5: //Reprocesar erroneos
                        btnProcesar.show();
                        //btnValidacion.show();                             
                        break;
                    case 6: //Reprocesar todo
                        btnProcesar.show();
                        //btnValidacion.show();
                        break;
                }
                btnEliminar.show();
                break;
            case 2: //En proceso
                 
                //
                btnCancelar.show();
                //btnEliminar.show();
                break;
            case 3: //Finalizado 
                //mostramos el boton -pareja
                btn_exportartxt.show();

                switch (inTar) {
                    case 1: //Validar lineas
                        if (parseInt(inLinNoReg) > 0) {
                            btnRegistrar.show();

                        }
                        if (parseInt(inSerNoReg) > 0) {
                            btnRegistrarServ.show();

                        }
                        btnReProcesarTodo.show();
                        btnReProcesarError.show();
                        break;
                        //                            case 2: //Importación                                                                                                                                                               
                        //                                btnProcesar.show();                                                                                                                                                               
                        //                                btnValidacion.show();                                                                                                                                                               
                        //                                break;                                                                                                                                                               
                    case 3: //Validar e importar
                        btnReProcesarTodo.show();
                        btnReProcesarError.show();
                        btnEliminar.show();
                        if (parseInt(inLinNoReg) > 0) {
                            btnRegistrar.show();
                        }
                        if (parseInt(inSerNoReg) > 0) {
                            btnRegistrarServ.show();

                        }
                        break;
                    case 4: //Eliminar llamadas
                        //
                        break;
                    case 5: //Reprocesar erroneos
                        btnReProcesarTodo.show();
                        btnReProcesarError.show();
                        if (parseInt(inLinNoReg) > 0) {
                            btnRegistrar.show();
                        }
                        if (parseInt(inSerNoReg) > 0) {
                            btnRegistrarServ.show();

                        }
                        break;
                    case 6: //Reprocesar todo
                        btnReProcesarTodo.show();
                        btnReProcesarError.show();
                        if (parseInt(inLinNoReg) > 0) {
                            btnRegistrar.show();
                        }
                        if (parseInt(inSerNoReg) > 0) {
                            btnRegistrarServ.show();

                        }
                        break;
                }
            case 4: //Eliminado 
                
                break;
            default:

                break;
                //
        }
    }

    function OcultarCampos_x_Archivos() {
        $("#tdProcesados").show();
        $("#tdArchivoProcesados").hide();

        $("#tdErrado").show();
        $("#tdArchivoErrado").hide();

        $("#tdNoValidado").show();
        $("#tdArchivoNoValidado").hide();

        $("#tdDuplicado").show();
        $("#tdArchivoDuplicado").hide();

        $("#tdRestante").show();
        $("#tdArchivoRestante").hide();

        $("#tdTotal").show();
        $("#tdArchivoTotal").hide();

        $("#tdObservacion").show();
        $("#tdArchivoObservacion").hide();

        $("#tdErrores").hide();
        isSelectArchivo = false;
    }

    function LimpiarDetalle() {
        $("#hdfinCodCol").val("");
        $("#lblFechaCreacion").html("");
        $("#lblFechaEjecucion").html("");
        $("#lblFechaFinalizacion").html("");
        $("#lblProcesado").html("");
        $("#lblErrado").html("");
        $("#LblNoValidado").html("");
        $("#lblDuplicado").html("");
        $("#lblExcluidos").html("");
        $("#lblLineasNoRegistradas").html("");
        $("#lblServiciosNoRegistrados").html("");
        $("#lblRestante").html("");
        $("#lblTotal").html("");
        $("#lblObservacion").html("");
        $("#lblOperador").html("");
        $("#lblPeriodo").html("");
        $("#lstArchivo").html("");
        $("#dvDetalle").hide();
        if ($("#ddlEstado").val() == 3 || $("#ddlEstado").val() == 4) {
            $("#trDuplicado").show();
        } else {
            $("#trDuplicado").hide();
        }
    }

    $("#btnDetalle").click(function () {
        dialogDetalle = $("#dvDetalleProceso").dialog({
            title: "Detalle de Proceso",
            modal: false,
            resizable: false,
            width: 450,
            buttons: {
                Cerrar: function () {
                    $(this).dialog("close");
                }
            }
        });
    });


    DimPosElementos();

});




function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();

    $("#tbTareas").setGridWidth(Ancho - 50);
    $("#tbTareas").setGridHeight((Alto / 2) - 120);
}