
var tabOpciones;

$(function () {

    var btnProcesar;
    var btnEliminar;
    var dialogDetalle;
    var Selecciono = false;

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


    tabOpciones = $("#TabOpciones").tabs({});


    function inicio() {
        $("#tbresumen").jqGrid('clearGridData');
        tabOpciones.tabs('select', '#TabOpciones_TabJQ1');
        //CargaDatos();
        //$("#dvDetalle").hide();
    }

    //            $.timer(1500, function (temporizador) {
    //                //temporizador.reset(retardo);//cambia el intervalo de tiempo
    //                CargaDatos(temporizador);
    //            });


    function GenerarBotones(id) {
        return '<img id="btnProcesar' + id + '" src="../Common/Images/Mantenimiento/Procesar.png" alt="Procesar" class="imgBtn" title="Procesar ahora"/>' +
               '<img id="btnEliminar' + id + '" src="../Common/Images/Mantenimiento/delete_16x16.gif" alt="Eliminar" class="imgBtn" title="Eliminar tarea"/>';
    }

    var tbDominio = $("#tbresumen").jqGrid({
        datatype: "local",
        colModel: [{ name: 'Servidor', index: 'Servidor', label: 'Servidor', width: '280' },
                   { name: 'Dominio', index: 'Dominio', label: 'Dominio', width: '280' },
                   { name: 'Usuario', index: 'Usuario', label: 'Usuario', width: '150' },
                   { name: 'Mascara', index: 'Mascara', label: 'Password', width: '100', formatter: FormatoPassword },
                   { name: 'Password', index: 'Password', label: 'Password', hidden: true },
                   { name: 'Puerto', index: 'Puerto', label: 'Puerto', width: '80' }
        ],
        sortname: "Servidor", //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        shrinkToFit: false,
        width: "1000",
        height: "80",
        rownumbers: true,
        caption: "Lista de Dominios",
        ondblClickRow: function (id) { $("#btnModificar").click(); }
    });

    //            var tbresumen = $("#tbresumen").jqGrid({
    //                datatype: "local",
    //                colModel: [{ name: 'fechaid', index: 'fechaid', label: 'fechaid', width: '70', hidden:true, sortable: false },
    //                            { name: 'fecha', index: 'fecha', label: 'Fecha Ejecución', width: '70', sortable: false },
    //   		                   { name: 'frecuencia', index: 'frecuencia', label: 'Frecuencia', sortable: false },
    //   		                   { name: 'registros', index: 'registros', label: 'Registros', width: '60', sortable: false },
    //   		                   { name: 'subidos', index: 'subidos', label: 'Subidos', sortable: false },
    //                           { name: 'valor', index: 'valor', label: 'valor', hidden:true, sortable: false },
    //   		                   { name: 'progress', index: 'progress', label: 'Progreso', sortable: false, formatter: function (value, options, rData) { return '<div id="progressbar' + value + '"></div>'; } },
    //   		                   { name: 'errados', index: 'errados', label: 'Errados', hidden: true, sortable: false },
    //   		                   { name: 'grabados', index: 'grabados', label: 'Grabados', width: '35', sortable: false },
    //   		                   { name: 'nuevos', index: 'nuevos', label: 'Nuevos', width: '0', hidden: true, sortable: false },
    //   		                   { name: 'editados', index: 'editados', label: 'Editados', width: '0', sortable: false },
    //                           { name: 'eliminados', index: 'vcVal', label: 'Importación', width: '0', sortable: false },
    //   		                   { name: 'botones', index: 'botones', label: 'Acciones', width: '25', sortable: false, formatter: function (value, options, rData) { return GenerarBotones(value); } }
    //   	                      ],
    //         
    //                width: "900",
    //                height: "170",
    //                rownumbers: true,
    //                caption: "Tareas",
    //                onSelectRow: function (id) {
    //                    DetalleTarea();
    //                }
    //            });

    function DetalleTarea() {
        var fechaid = -1;
        var inCodCol = $("#tbresumen").jqGrid('getGridParam', 'selrow');

        if (inCodCol) {
            $("#hdresumen").val(inCodCol);
            $("#dvDetalle").show();
        }
        else {
            //LimpiarDetalle();
        }
    }



    function CerroMensaje() {
    }


    function CargaDatos(temporizador) {
        $.ajax({
            type: "POST",
            url: "Sin_Utilitarios.aspx/CargarResumenes",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var Tareas = new Array();
                var j = 0;
                var k = 0;
                var i = 0;

                $.each(result.d, function () {
                    Tareas[j] = 0;
                    j++;
                });

                var datos = $("#tbresumen").jqGrid('getRowData');

                $(datos).each(function () {//Recorre la grilla los registro que encuentra los actualiza y los q no los borra
                    var fechaid = this.fechaid;
                    var Existe = false;
                    j = 0;
                    $.each(result.d, function () {
                        if (fechaid == this.fechaid) {
                            Existe = true;
                            Tareas[j] = 1;

                            $("#tbresumen").jqGrid('setRowData', fechaid, {
                                'fecha': this.fecha, 'frecuencia': this.frecuencia, 'registros': this.registros,
                                'subidos': this.subidos, 'errados': this.errados, 'grabados': this.grabados, 'nuevos': this.nuevos, 'valor': this.valor,
                                'editados': this.editados, 'eliminados': this.eliminados
                            });

                            $("#progressbar" + fechaid).progressbar("option", "value", parseInt(this.valor));
                            MostrarAcciones(this.fechaid);
                            return false;
                        }
                        j++;
                    });
                    if (!Existe) {//Si no existe en la lista 
                        $("#tbresumen").jqGrid('delRowData', fechaid);
                    }
                });

                j = 0;

                $.each(result.d, function () {//Agrega los registros que no esten en la grilla
                    if (Tareas[j] == 0) {
                        $("#tbTareas").jqGrid('addRowData', this.fechaid, {
                            'fechaid': this.fechaid, 'fecha': this.fecha, 'frecuencia': this.frecuencia, 'registros': this.registros, 'valor': this.valor,
                            'progress': this.fechaid, 'subidos': this.subidos, 'errados': this.errados,
                            'grabados': this.grabados, 'nuevos': this.nuevos, 'editados': this.editados,
                            'eliminados': this.eliminados, 'botones': this.fechaid
                        });

                        MostrarAcciones(this.fechaid);

                        $("#progressbar" + this.fechaid).progressbar({ value: parseInt(this.valor) });
                        EventosBotones(this.fechaid);
                    }
                    j++;
                });
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }


    function EventosBotones(fechaid) {
        $("#btnProcesar" + fechaid).click(function (event) {
            $('#divMsgConfirmacionAhora').dialog({
                title: "Confirmación",
                modal: true,
                resizable: false,
                buttons: {
                    Aceptar: function () {
                        $(this).dialog("close");

                        var inCodCol = $("#tbresumen").jqGrid('getGridParam', 'selrow');
                        EjecutarAccion("Procesar", fechaid);
                    },
                    Cancelar: function () {
                        $(this).dialog("close");
                    }
                }
            });
        });

        $("#btnEliminar" + fechaid).click(function (event) {
            $('#divMsgConfirmacionEliminar').dialog({
                title: "Confirmación",
                modal: true,
                resizable: false,
                buttons: {
                    Aceptar: function () {
                        $(this).dialog("close");

                        var fechaid = $("#tbTareas").jqGrid('getGridParam', 'selrow');
                        EjecutarAccion("Eliminar", fechaid);
                    },
                    Cancelar: function () {
                        $(this).dialog("close");
                    }
                }
            });
        });

    }


    function EjecutarAccion(Accion, fechaid) {
        $.ajax({
            type: "POST",
            url: "Sin_Utilitarios.aspx/" + Accion,
            data: "{'fechaid': '" + fechaid + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d != "") {
                    alert(result.d);
                }
                else {
                    Mensaje("<br/><h1>La acción " + Accion + " ha sido procesada</h1><br/>", document, CerroMensaje);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }


    function MostrarAcciones(fechaid) {
        btnProcesar = $("#btnProcesar" + fechaid);
        btnEliminar = $("#btnEliminar" + fechaid);

        //btnProcesar.hide();
        //btnEliminar.hide();


    }

});



