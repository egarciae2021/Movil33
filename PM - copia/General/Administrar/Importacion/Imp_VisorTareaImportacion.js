var inOrdenArchivo;
var inCodCol = -1;
var valueSelected;
var textSelected;
var isSelectArchivo = false;
var Archivos;
var Modal;
var archivoError;
var CarpetaDominio;
$(function () {
    CarpetaDominio = window.top.$("#hdfCodigoDominio").val() != '' ? '/' + window.top.$("#hdfCodigoDominio").val() : '';
    //alert(CarpetaDominio);

    $("#ttgInfoSeleccion_dvToolTip").hide();
    $("#ttgInfoDescargar_dvToolTip").hide();

    var inCodOpe;
    var inCodTipTar;
    var inCodEst;
    var btnProcesar;
    var btnCancelar;
    //    var btnReProcesarTodo;
    //    var btnReProcesarError;
    //    var btnValidacion;
    var btnRegistrar;
    var btnEliminar;
    var dialogDetalle;

    $(".progressbar").progressbar({
        value: 0
    });

    $(".btnNormal").button({});

    $(".DATETIME").AnyTime_picker({ format: "%d/%m/%Y %H:%i",
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
        return '<img id="btnProcesar' + id + '" src="../../../Common/Images/Mantenimiento/Procesar.png" alt="Procesar" class="imgBtn" title="Procesar ahora"/>' +
               '<img id="btnCancelar' + id + '" src="../../../Common/Images/Mantenimiento/btnCancel.png" alt="Procesar" class="imgBtn" title="Cancelar Proceso"/>' +
        //               '<img id="btnReProcesarTodo' + id + '" src="../../../Common/Images/Mantenimiento/Todos16.png" alt="ReProcesar" class="imgBtn" title="Reprocesar todos"/>' +
        //               '<img id="btnReProcesarError' + id + '" src="../../../Common/Images/Mantenimiento/Regresar.png" alt="ReProcesar" class="imgBtn" title="Reprocesar erroneos"/>' +
               '<img id="btnEliminar' + id + '" src="../../../Common/Images/Mantenimiento/delete_16x16.gif" alt="Eliminar" class="imgBtn" title="Eliminar tarea"/>';
    }

    var tbTareas = $("#tbTareas").jqGrid({
        datatype: "local",
        colModel: [{ name: 'IdCola', index: 'IdCola', label: 'CodCol', width: '50', hidden: true, sortable: false },
            { name: 'VcFecPro', index: 'VcFecPro', label: 'Fecha programada', width: '130', sortable: false },
            { name: 'VcFecCre', index: 'VcFecCre', label: 'Fecha programada', hidden: true, sortable: false },
            { name: 'VcFecEje', index: 'VcFecEje', label: 'Fecha Ejecución', hidden: true, sortable: false },
            { name: 'IdTarea', index: 'IdTarea', label: 'CodTar', hidden: true, sortable: false },
            { name: 'VcNomTar', index: 'VcNomTar', label: 'Tarea', width: '130', sortable: false },
            { name: 'InAva', index: 'InAva', label: 'InAva', hidden: true, sortable: false },
        { name: 'progress', index: 'progress', label: 'Progreso', width: '500', sortable: false, formatter: function (value, options, rData) { return '<div id="progressbar' + value + '"></div>'; } },
        { name: 'IdEstado', index: 'IdEstado', label: 'CodEst', hidden: true, sortable: false },
        { name: 'VcNomEst', index: 'VcNomEst', label: 'Estado', width: '100', align: 'center', sortable: false },
        { name: 'VcFechaFinalizacion', index: 'VcFechaFinalizacion', label: 'Fecha Finalizacion', hidden: true, sortable: false },
        { name: 'Descripcion', index: 'Descripcion', label: 'Descripcion', hidden: true, sortable: false }
        , { name: 'botones', index: 'botones', label: 'Acciones', width: '100', sortable: false, formatter: function (value, options, rData) { return GenerarBotones(value); } }
        ],
        width: $(window).width() - 55,
        height: "130",
        rownumbers: true,
        shrinkToFit: false,
        forcefit: true,
        caption: "Tareas",
        onSelectRow: function (id) {
            DetalleTarea();

            obtenerArchivoError(id);
        }
    });

    var tbLog = $("#tbLog").jqGrid({
        datatype: "local",
        colModel: [{ name: 'IdLog', index: 'IdLog', label: 'IdLog', hidden: true, sortable: false },
        { name: 'FechaCreacion', index: 'FechaCreacion', label: 'Fecha Creación', width: '150', sortable: false },
        { name: 'Detalle', index: 'Detalle', label: 'Detalle', width: '380', sortable: false },
        { name: 'Tipo', index: 'Tipo', label: 'Tipo', width: '80', align: 'center', sortable: false },
        { name: 'IdCola', index: 'IdCola', label: 'Cola', hidden: true, sortable: false}],
        width: "680",
        height: "180",
        rownumbers: true,
        shrinkToFit: false,
        forcefit: true,
        caption: ""
    });

    Inicio();

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
            url: "Imp_VisorTareaImportacion.aspx/MostrarTareas",
            data: "{'p_inEst': '" + inCodEst + "'," +
                            "'p_inTar': '" + inCodTipTar + "'," +
                            "'p_idOper': '" + inCodOpe + "'," +
                            "'p_inCodCol': '" + inCodCol + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d[0].IdTarea == "7") {
                    $("#trNoValidado").hide();
                    $("#trDuplicado").hide();
                    //                    $("#trExcluidos").hide();
                    $("#trProcesado").show();
                    $("#trRestante").show();
                    $("#tdArchivo").show();
                    $("#tdTituloArchivo").show();
                    $("#lblTituloArchivo").html("Opciones");
                } else if (result.d[0].IdTarea == "4") {
                    $("#trNoValidado").hide();
                    $("#trDuplicado").hide();
                    //                    $("#trExcluidos").hide();
                    $("#trProcesado").hide();
                    $("#trRestante").hide();
                    $("#tdArchivo").hide();
                    $("#tdTituloArchivo").hide();
                    $("#lblTituloArchivo").html("Archivos");
                } else {
                    $("#trNoValidado").show();
                    $("#trDuplicado").show();
                    //                    $("#trExcluidos").show();
                    $("#trProcesado").show();
                    $("#trRestante").show();
                    $("#tdArchivo").show();
                    $("#tdTituloArchivo").show();
                    $("#lblTituloArchivo").html("Archivos");
                }

                $.each(result.d, function () {
                    if (this.IdCola == inCodCol) {
                        if (result.d[0].IdTarea == "7") { //Actualizar
                            //                        Detalles = this.Actualizar.Detalles;
                            //                        $("#lstArchivo").html("");

                            //                        $(Detalles).each(function () {
                            //                            $("#lstArchivo").append($("<option></option>").attr("value", this.inOrd).text(this.inOrd + ". " + this.vcTipoDescripcion));
                            //                        });
                        } else { //Proceso
                            Archivos = this.Proceso.Archivos;
                            $("#lstArchivo").html("");

                            $(Archivos).each(function () {
                                $("#lstArchivo").append($("<option></option>").attr("value", this.Orden).text(this.TamanoArchivo + ' - ' + this.NombreArchivo));
                            });
                        }
                    }
                });
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    function Inicio() {
        inCodEst = $("#ddlEstado").val();
        inCodTipTar = -1;
        //        inCodTipTar = $("#ddlTarea").val();
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
            url: "Imp_VisorTareaImportacion.aspx/MostrarTareas",
            data: "{'p_inEst': '" + inCodEst + "'," +
                            "'p_inTar': '" + inCodTipTar + "'," +
                            "'p_idOper': '" + inCodOpe + "'," +
                            "'p_inCodCol': '" + -1 + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                var Tareas = [];
                var j = 0;
                var k = 0;
                var i = 0;

                $.each(result.d, function () {
                    Tareas[j] = 0;
                    j++;
                });

                var datos = $("#tbTareas").jqGrid('getRowData');

                $(datos).each(function () {
                    var P_inCodCol = this.IdCola;
                    var Existe = false;
                    j = 0;
                    $.each(result.d, function () {
                        if (P_inCodCol == this.IdCola) {
                            Existe = true;
                            Tareas[j] = 1;

                            $("#tbTareas").jqGrid('setRowData', P_inCodCol, { 'VcFecPro': this.VcFecPro, 'InAva': this.InAva, 'Estado.P_inCod': this.IdEstado, 'VcNomEst': this.VcNomEst
                                , 'IdTarea': this.IdTarea, 'IdEstado': this.IdEstado, 'Descripcion': this.Descripcion
                                //,'vcVal': this.vcVal, 'vcImp': this.vcImp
                            }); //0j0 variable 'i' se obvio

                            $("#progressbar" + P_inCodCol).progressbar("option", "value", parseInt(this.InAva));

                            MostrarAcciones(this.IdEstado, this.IdTarea, P_inCodCol);

                            if ($("#hdfinCodCol").val() == P_inCodCol) {
                                $("#lblFechaCreacion").html(this.VcFecCre);
                                $("#lblFechaEjecucion").html(this.VcFecEje);
                                $("#lblFechaFinalizacion").html(this.VcFecFin);
                                $("#lblProcesado").html(this.InPro);
                                $("#lblErrado").html(this.InErr);
                                //                                $("#LblNoValidado").html(this.inNoVal);
                                if (this.InErr > 0) {
                                    if (!isSelectArchivo) {
                                        $("#ttgInfoSeleccion_dvToolTip").show();
                                    } else {
                                        $("#ttgInfoSeleccion_dvToolTip").hide();
                                    }
                                } else {
                                    if (!isSelectArchivo) {
                                        $("#ttgInfoSeleccion_dvToolTip").hide();
                                        $("#ttgInfoDescargar_dvToolTip").hide();
                                    }
                                }
                                $("#lblDuplicado").html(this.InDup);
                                //                                $("#lblExcluidos").html(this.InExcluidos);
                                //                                $("#lblLineasNoRegistradas").html(this.inLinNoReg);
                                $("#lblRestante").html(this.InRes);
                                $("#lblTotal").html(this.InTot);
                                $("#lblObservacion").html(this.Descripcion);

                                $("#lblTareaOriginal").html(this.Proceso.VcNomTar);

                                if (this.Proceso.InPro == 0) {
                                    $("#lblProgramacionOriginal").html("Ahora(" + this.VcFecPro + ")");
                                }
                                else {
                                    $("#lblProgramacionOriginal").html("Programado(" + this.VcFecPro + ")");
                                }


                                $("#lblTipoArchivo").html(this.VcNomArc);
                                $("#lblNumeroPlantilla").html(this.Configuracion.Plantilla.Nombre);
                                $("#lblExtensionArchivo").html(this.VcExtArc);

                                if (this.Proceso.IdProceso != -1) {
                                    $("#lblOperador").html(this.Proceso.VcNomOpe);
                                }

                            }
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

                $.each(result.d, function () {
                    if (Tareas[j] == 0) {
                        $("#tbTareas").jqGrid('addRowData', this.IdCola, {
                            'IdCola': this.IdCola, 'VcFecPro': this.VcFecPro, 'inTar': this.IdTarea, 'VcNomTar': this.VcNomTar, 'inAva': this.InAva,
                            'progress': this.IdCola, 'Estado.P_inCod': this.IdEstado, 'VcNomEst': this.VcNomEst,
                            //                        'vcVal': this.vcVal, 'vcImp': this.vcImp,
                            'botones': this.IdCola
                        });

                        MostrarAcciones(this.IdEstado, this.IdTarea, this.IdCola);

                        $("#progressbar" + this.IdCola).progressbar({ value: parseInt(this.InAva) });
                        EventosBotones(this.IdCola);
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
            url: "Imp_VisorTareaImportacion.aspx/MostrarDetalle_x_Archivo",
            data: "{'inEst': '" + inCodEst + "'," +
                            "'inTar': '" + inCodTipTar + "'," +
                            "'inOpe': '" + inCodOpe + "'," +
                            "'p_inCodCol': '" + inCodCol + "'," +
                            "'p_inOrden': '" + optionSelected.val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                $.each(result.d, function () {
                    if (this.IdCola == inCodCol) {
                        if (this.IdEstado == 3 || this.IdEstado == 4) {
                            isSelectArchivo = true;
                            $("#tdProcesados").hide();
                            $("#tdArchivoProcesados").show();
                            $("#lblArchivoProcesado").html(this.InPro);

                            $("#tdErrado").hide();
                            $("#tdArchivoErrado").show();
                            $("#lblArchivoErrado").html(this.InErr);
                            if (this.InErr > 0) {
                                $("#tdErrores").show();
                                $("#ttgInfoSeleccion_dvToolTip").hide();
                                $("#ttgInfoDescargar_dvToolTip").show();
                            } else {
                                $("#tdErrores").hide();
                                $("#ttgInfoSeleccion_dvToolTip").hide();
                                $("#ttgInfoDescargar_dvToolTip").hide();
                            }

                            $("#tdDuplicado").hide();
                            $("#tdArchivoDuplicado").show();
                            $("#lblArchivoDuplicado").html(this.InDup);

                            $("#tdRestante").hide();
                            $("#tdArchivoRestante").show();
                            $("#lblArchivoRestante").html(this.InRes);

                            $("#tdTotal").hide();
                            $("#tdArchivoTotal").show();
                            $("#lblArchivoTotal").html(this.InTot);

                            $("#tdObservacion").hide();
                            $("#tdArchivoObservacion").show();
                            $("#lblArchivoObservacion").html(this.Descripcion);

                            var Tarea_x_Archivos = this.Proceso.Archivos;

                            $(Tarea_x_Archivos).each(function () {
                                textSelected = this.NombreArchivo;
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

    $('#btnArchivoNoProce').click(function () {
        if (archivoError != "" && archivoError != undefined) {
            DownloadFile(archivoError);
        } else {
            alerta("El proceso seleccionado no posee archivo de error.");
        }


    });

    $("#ddlOperador,#ddlEstado,#ddlTarea").change(function () {
        //        OcultarCampos_x_Archivos();
        inCodEst = $("#ddlEstado").val();
        inCodTipTar = -1;
        //        inCodTipTar = $("#ddlTarea").val();
        inCodOpe = $("#ddlOperador").val();
        LimpiarDetalle();
    });

    function DownloadFile(file) {

        //        window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + file);

        if (file != "") {
            if (CarpetaDominio != "" && CarpetaDominio != undefined) {
                //var rutaFinal = "~/General/Administrar/Importacion/Temporal" + CarpetaDominio + "/" + file;
                var rutaFinal = "General/Administrar/Importacion/Temporal" + CarpetaDominio + "/" + file;

            }
            else {
                //var rutaFinal = "~/General/Administrar/Importacion/Temporal/" + file;
                var rutaFinal = "General/Administrar/Importacion/Temporal/" + file;
            }
            
            $.ajax({
                type: "POST",
                url: "../../../Common/WebService/General.asmx/CheckFileExists",
                data: JSON.stringify({
                    //RutaCompleta: rutaFinal
                    RutaCompleta: "~/" + rutaFinal
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data.d == '1') {
                        window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + rutaFinal);
                    } else {
                        alerta('No se encuentra el archivo "' + rutaFinal + ' ' + file + '".');
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
            //            window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=General/Administrar/Importacion/Temporal/" + file);
        } else {
            alerta("No existe archivo de errores.");
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

    function CerroMensaje() {
    }

    function EjecutarAccion(Accion, inCodCol) {
        $.ajax({
            type: "POST",
            url: "Imp_VisorTareaImportacion.aspx/" + Accion,
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

    function MostrarAcciones(inEst, inTar, idCol) {
        btnProcesar = $("#btnProcesar" + idCol);
        btnCancelar = $("#btnCancelar" + idCol);
        //        btnReProcesarTodo = $("#btnReProcesarTodo" + idCol);
        //        btnReProcesarError = $("#btnReProcesarError" + idCol);
        //        btnValidacion = $("#btnValidacion" + idCol);
        btnRegistrar = $("#btnRegistrar" + idCol);
        btnEliminar = $("#btnEliminar" + idCol);

        btnProcesar.hide();
        btnCancelar.hide();
        //        btnReProcesarTodo.hide();
        //        btnReProcesarError.hide();
        //        btnValidacion.hide();
        btnRegistrar.hide();
        btnEliminar.hide();

        switch (inEst) {
            case 1: //Pendiente
                switch (inTar) {
                    case 1: //Validar lineas
                        //
                        btnProcesar.show();
                        break;
                    case 2: //Importación
                        btnProcesar.show();
                        //btnValidacion.show();
                        break;
                    case 3: //Validar e importar
                        btnProcesar.show();
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
                switch (inTar) {
                    case 1: //Validar lineas

                        //                        btnReProcesarTodo.show();
                        //                        btnReProcesarError.show();
                        break;

                    case 3: //Validar e importar
                        //                        btnReProcesarTodo.show();
                        //                        btnReProcesarError.show();
                        btnEliminar.show();

                        break;
                }
            case 4: //Eliminado
                //
                break;
            default:
                //
        }
    }

    function OcultarCampos_x_Archivos() {
        $("#tdProcesados").show();
        $("#tdArchivoProcesados").hide();

        $("#tdErrado").show();
        $("#tdArchivoErrado").hide();

        //        $("#tdNoValidado").show();
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
        //            $("#LblNoValidado").html("");
        $("#lblDuplicado").html("");

        $("#lblRestante").html("");
        $("#lblTotal").html("");
        $("#lblObservacion").html("");
        $("#lblOperador").html("");

        $("#lstArchivo").html("");
        $("#dvDetalle").hide();
    }

    $("#btnDetalle").click(function () {
        dialogDetalle = $("#dvDetalleTarea").dialog({
            title: "Detalle de Proceso de Importación de datos",
            modal: true,
            resizable: false,
            width: 470,
            buttons: {
                Cerrar: function () {
                    $(this).dialog("close");
                }
            }
        });
    });

    $("#btnDetalleLog").click(function () {
        $.ajax({
            type: "POST",
            url: "Imp_VisorTareaImportacion.aspx/MostrarDetalleLogTarea",
            data: "{'idCola': '" + $("#hdfinCodCol").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                $("#tbLog").jqGrid('clearGridData');

                if ($(result.d).length > 0) {
                    var i = 0;
                    for (i = 0; i < $(result.d).length; i++) {
                        $("#tbLog").jqGrid('addRowData', result.d[i].IdLog, result.d[i]);
                        dialogDetalle = $("#dvDetalleProceso").dialog({
                            title: "Detalle de Proceso",
                            modal: true,
                            resizable: false,
                            width: 715,
                            buttons: {
                                Cerrar: function () {
                                    $(this).dialog("close");
                                }
                            }
                        });
                    }
                }
                else {
                    //Mensaje("<br/><h1>No se encontraron registros</h1><br/>", document);
                    alerta("No se encontraron registros.");
                }


            }
        });
    });

    $("#btnDescargar").click(function () {
        inCodCol = $("#tbTareas").jqGrid('getGridParam', 'selrow');
        $("#hdfinCodCol").val(inCodCol);
        $.ajax({
            type: "POST",
            url: "Imp_VisorTareaImportacion.aspx/ExportarNoProcesados",
            data: "{'idCola': '" + inCodCol + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                //alert(result.d);

                if (result.d != "") {
                    //                    window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + result.d);
                    //window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=General/Administrar/Importacion/Temporal" + CarpetaDominio + "/" + result.d);
                    window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + result.d);
                } else {
                    alerta("El proceso seleccionado no contiene registros pendientes.");
                }
            }
        });
    });

    $(window).resize(function () {
        $("#tbTareas").setGridWidth($(window).width() - 50);
        $("#tbTareas").setGridHeight($(window).height() - 390);
    });

});

function obtenerArchivoError(inCodCol) {

    $.ajax({
        type: "POST",
        url: "Imp_VisorTareaImportacion.aspx/ObtenerArchivoError",
        data: "{'inCodCol': '" + inCodCol + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            
            
            
            if (result.d != "") {
                if (result.d.NombreError != "") {
                    archivoError = result.d.NombreError;
                    $("#btnDescargar").button("option", "disabled", false);
                } else {
//                    $("#btnDownload").prop("disabled", true);
                    $("#btnDescargar").button("option", "disabled", false);
                }
            }
            else {
                Mensaje("<br/><h1>El archivo Log no existe</h1><br/>", document, CerroMensaje);
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}