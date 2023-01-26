///Nombre Anterior Imp_VisorTareaFacturacion.js
var Modal;
$(function () {
    var inCodOpe;
    var inCodTipTar;
    var inCodEst;
    var btnProcesar;
    var btnCancelar;
    var btnReProcesarTodo;
    var btnReProcesarError;
    var btnValidacion;
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
                       '<img id="btnReProcesarTodo' + id + '" src="../../../Common/Images/Mantenimiento/Todos16.png" alt="ReProcesar" class="imgBtn" title="Reprocesar todos"/>' +
                       '<img id="btnReProcesarError' + id + '" src="../../../Common/Images/Mantenimiento/Regresar.png" alt="ReProcesar" class="imgBtn" title="Reprocesar erroneos"/>' +
                       '<img id="btnValidacion' + id + '" src="../../../Common/Images/Mantenimiento/Todo.png" alt="Validacion" class="imgBtn" title="Validar lineas"/>' +
                       '<img id="btnRegistrar' + id + '" src="../../../Common/Images/Mantenimiento/Validar.gif" alt="Registrar lineas" class="imgBtn" title="Registrar lineas"/>' +
                       '<img id="btnEliminar' + id + '" src="../../../Common/Images/Mantenimiento/delete_16x16.gif" alt="Eliminar" class="imgBtn" title="Eliminar tarea"/>';
    }

    var tbTareas = $("#tbTareas").jqGrid({
        datatype: "local",
        colModel: [{ name: 'P_inCodCol', index: 'P_inCodCol', label: 'CodCol', hidden: true, sortable: false },
   		                   { name: 'vcFecPro', index: 'vcFecPro', label: 'Fecha programada', width: '150', sortable: false },
   		                   { name: 'inTar', index: 'inTar', label: 'CodTar', hidden: true, sortable: false },
   		                   { name: 'vcTar', index: 'vcTar', label: 'Tarea', width: '200', sortable: false },
   		                   { name: 'inAva', index: 'inAva', label: 'inAva', hidden: true, sortable: false },
   		                   { name: 'progress', index: 'progress', label: 'Progreso', width: '550', sortable: false, formatter: function (value, options, rData) { return '<div id="progressbar' + value + '"></div>'; } },
   		                   { name: 'Estado.P_inCod', index: 'Estado.P_inCod', label: 'CodEst', hidden: true, sortable: false },
   		                   { name: 'Estado.vcNom', index: 'Estado.vcNom', label: 'Estado', width: '130', sortable: false },
   		                   { name: 'vcVal', index: 'vcVal', label: 'Validación', width: '0', hidden: true, sortable: false },
   		                   { name: 'vcImp', index: 'vcVal', label: 'Importación', width: '0', hidden: true, sortable: false },
   		                   { name: 'botones', index: 'botones', label: 'Acciones', width: '100', sortable: false, formatter: function (value, options, rData) { return GenerarBotones(value); } }
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
        var inCodCol = -1;
        var inCodCol = $("#tbTareas").jqGrid('getGridParam', 'selrow');

        if (inCodCol) {
            $("#hdfinCodCol").val(inCodCol);
            $("#dvDetalle").show();
        }
        else {
            LimpiarDetalle();
        }
    };

    function inicio() {
        inCodEst = $("#ddlEstado").val();
        inCodTipTar = $("#ddlTarea").val();
        inCodOpe = $("#ddlOperador").val();
        CargaDatos();
        $("#dvDetalle").hide();
        $("#txtFechaProgramacion").hide();
    }

    $.timer(1500, function (temporizador) {
        //temporizador.reset(retardo);//cambia el intervalo de tiempo
        CargaDatos(temporizador);
    });

    function CargaDatos(temporizador) {
        $.ajax({
            type: "POST",
            url: "Imp_VisorTareaFacturacion.aspx/MostrarTareas",
            data: "{'inEst': '" + inCodEst + "'," +
                           "'inTar': '" + inCodTipTar + "'," +
                           "'inOpe': '" + inCodOpe + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                //var Tareas = new Array();
                var Tareas = [];
                var j = 0;
                var k = 0;
                var i = 0;

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

                            $("#tbTareas").jqGrid('setRowData', P_inCodCol, { 'vcFecPro': this.vcFecPro, 'inAva': this.inAva, 'Estado.P_inCod': this.Estado.P_inCod, 'Estado.vcNom': this.Estado.vcNom,
                                'vcVal': this.vcVal, 'vcImp': this.vcImp
                            }); //0j0 variable 'i' se obvio

                            $("#progressbar" + P_inCodCol).progressbar("option", "value", parseInt(this.inAva));

                            MostrarAcciones(this.Estado.P_inCod, this.inTar, P_inCodCol, this.inLinNoReg);

                            if ($("#hdfinCodCol").val() == P_inCodCol) {
                                $("#lblFechaCreacion").html(this.vcFecCre);
                                $("#lblFechaEjecucion").html(this.vcFecEje);
                                $("#lblFechaFinalizacion").html(this.vcFecFin);
                                $("#lblProcesado").html(this.inPro);
                                $("#lblErrado").html(this.inErr);
                                $("#lblDuplicado").html(this.inDup);
                                $("#lblLineasNoRegistradas").html(this.inLinNoReg);
                                $("#lblRestante").html(this.inRes);
                                $("#lblTotal").html(this.inTot);
                                $("#lblObservacion").html(this.vcDes);

                                //                                        $(".tdTareaOriginal");
                                //                                        $(".tdProgramacionOriginal");
                                //                                        $(".tdTipoArchivo");
                                //                                        $(".tdNumeroPlantilla");
                                //                                        $(".tdExtensionArchivo");
                                //                                        $(".tdTipoTelefonia");
                                //                                        $(".tdTipoCambio");
                                //                                        $(".tdUnirBitsEnvRec");
                                //                                        $(".tdServDefecto");
                                //                                        $(".tdEmpleadoDefecto");
                                //                                        $(".tdActualizaCosto");

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
                                    var Archivos = this.Proceso.Archivos;

                                    $("#lblOperador").html(this.Proceso.Operador.vcNomOpe);
                                    $("#lblPeriodo").html(this.Proceso.vcMesPer);
                                    $("#lstArchivo").html("");

                                    $(Archivos).each(function () {
                                        $("#lstArchivo").append($("<option></option>").attr("value", this.inOrd).text(this.vcTamUni + ' - ' + this.vcNom));
                                    });
                                }
                                else if (this.Eliminar.P_inCodEli != -1) {
                                    var Operadores = this.Eliminar.Operadores;
                                    var Operador = "";
                                    $("#lblPeriodo").html(this.Eliminar.vcMesPer);

                                    $(Operadores).each(function () {
                                        if (Operador != "") {
                                            Operador += ",";
                                        }
                                        Operador += this.vcNomOpe;
                                    });
                                    $("#lblOperador").html(Operador);
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

                $.each(result.d, function () {//Agrega los registros que no esten en la grilla
                    if (Tareas[j] == 0) {
                        $("#tbTareas").jqGrid('addRowData', this.P_inCodCol, {
                            'P_inCodCol': this.P_inCodCol, 'vcFecPro': this.vcFecPro, 'inTar': this.inTar, 'vcTar': this.vcTar, 'inAva': this.inAva,
                            'progress': this.P_inCodCol, 'Estado.P_inCod': this.Estado.P_inCod, 'Estado.vcNom': this.Estado.vcNom,
                            'vcVal': this.vcVal, 'vcImp': this.vcImp, 'botones': this.P_inCodCol
                        });

                        MostrarAcciones(this.Estado.P_inCod, this.inTar, this.P_inCodCol, this.inLinNoReg);

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

    $("#ddlOperador,#ddlEstado,#ddlTarea").change(function () {
        inCodEst = $("#ddlEstado").val();
        inCodTipTar = $("#ddlTarea").val();
        inCodOpe = $("#ddlOperador").val();
        LimpiarDetalle();
    });

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
                                        url: "Imp_VisorTareaFacturacion.aspx/ReProcesarTodo",
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
                                        url: "Imp_VisorTareaFacturacion.aspx/ReProcesarError",
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
            var inCodCol = $("#tbTareas").jqGrid('getGridParam', 'selrow');
            var $width = 550;
            var $height = 402;
            var $Pagina = 'Imp_RegistroLinea.aspx?inCodCol=' + inCodCol.toString();
            $("#if1").attr("src", $Pagina);
            Modal = $('#dvRegistroLinea').dialog({
                title: "Registro de lineas",
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
            url: "Imp_VisorTareaFacturacion.aspx/" + Accion,
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

    function MostrarAcciones(inEst, inTar, idCol, inLinNoReg) {
        btnProcesar = $("#btnProcesar" + idCol);
        btnCancelar = $("#btnCancelar" + idCol);
        btnReProcesarTodo = $("#btnReProcesarTodo" + idCol);
        btnReProcesarError = $("#btnReProcesarError" + idCol);
        btnValidacion = $("#btnValidacion" + idCol);
        btnRegistrar = $("#btnRegistrar" + idCol);
        btnEliminar = $("#btnEliminar" + idCol);

        btnProcesar.hide();
        btnCancelar.hide();
        btnReProcesarTodo.hide();
        btnReProcesarError.hide();
        btnValidacion.hide();
        btnRegistrar.hide();
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
                switch (inTar) {
                    case 1: //Validar lineas
                        if (parseInt(inLinNoReg) > 0) {
                            btnRegistrar.show();

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
                        break;
                    case 6: //Reprocesar todo
                        btnReProcesarTodo.show();
                        btnReProcesarError.show();
                        if (parseInt(inLinNoReg) > 0) {
                            btnRegistrar.show();
                        }
                        break;
                }
            case 4: //Eliminado
                //
                break;
            default:
                //
        }
    }

    function LimpiarDetalle() {
        $("#hdfinCodCol").val("");
        $("#lblFechaCreacion").html("");
        $("#lblFechaEjecucion").html("");
        $("#lblFechaFinalizacion").html("");
        $("#lblProcesado").html("");
        $("#lblErrado").html("");
        $("#lblDuplicado").html("");
        $("#lblLineasNoRegistradas").html("");
        $("#lblRestante").html("");
        $("#lblTotal").html("");
        $("#lblObservacion").html("");
        $("#lblOperador").html("");
        $("#lblPeriodo").html("");
        $("#lstArchivo").html("");
        $("#dvDetalle").hide();
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
});