var vctarea='';
var vctipo= '';
var vccadena='';
 
$(function () {
    var tabOpciones;
    var btnProcesar;
    var btnEliminar;
    var dialogDetalle;
    var Selecciono = false;

    $(".progressbar").progressbar({
        value: 0
    });

    $(".btnNormal").button({});


    tabOpciones = $("#TabOpciones").tabs({});
    function inicio() {
        $("#tbresumen").jqGrid('clearGridData');
        tabOpciones.tabs('select', '#TabOpciones_TabJQ1');
        CargaDatos();
        //$("#tbdetalle").css("display", "none");

    }
    inicio();
    /*Edgar Garcia 06022023 se cambio de 2500 a 5000*/        
    $.timer(5000, function (temporizador) {
        CargaDatos(temporizador);
    });

    function GenerarBotones(id) {
        // '&nbsp;&nbsp;&nbsp;&nbsp;<img id="btnProcesar' + id + '" src="../Common/Images/Mantenimiento/Procesar.png" alt="Procesar" class="imgBtn" title="Procesar ahora"/>'; //+
        return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img id="btnEliminar' + id + '" src="../Common/Images/Mantenimiento/delete_16x16.gif" alt="Eliminar" class="imgBtn" title="Eliminar tarea"/>';
    }

    //sorttype: 'date', datefmt: 'm/d/yyyy h:i:s AmPm'

    //  
    //sorttype: 'date', datefmt: 'm/d/yyyy h:i:s AmPm'

    //sorttype:'date', formatter:'date', formatoptions: {newformat:'d-M-Y'}

    // sorttype: 'date', formatter: 'date', formatoptions: { newformat: 'm/d/Y' }, datefmt: 'd-M-Y' }

    //sorttype:'date', formatter:'date', datefmt: 'd-m-y'}
    //onSortCol: function (name, index) { if (name == 'createDateTime') { jQuery("#viewNotesGrid").setGridParam({ sortname: "ID" }); } }
    var tbresumen = $("#tbresumen").jqGrid({
        datatype: "local",
        colModel: [{ name: 'fechaid', index: 'fechaid', label: 'fechaid', width: '10', hidden: true, sortable: false },
            { name: 'fecha', index: 'fecha', label: 'Fecha Ejecución', width: '150', sortable: false },
            { name: 'fechaansi', index: 'fechaansi', label: 'fechaansi', width: '10', hidden: true, sorttype: 'date', formatter: 'date' },
       		{ name: 'frecuencia', index: 'frecuencia', label: 'Frecuencia', width: '100', sortable: false },
       		{ name: 'registros', index: 'registros', label: 'Registros', width: '80', sortable: false },
       		{ name: 'subidos', index: 'subidos', label: 'Subidos', width: '80', sortable: false },
            { name: 'valor', index: 'valor', label: 'valor', hidden: true, width: '80', sortable: false },
       		{ name: 'progress', index: 'progress', label: 'Progreso', width: '150', sortable: false, formatter: function (value, options, rData) { return '<div id="progressbar' + value + '"></div>'; } },
       		{ name: 'errados', index: 'errados', label: 'Errados', width: '80', sortable: false },
       		{ name: 'grabados', index: 'grabados', label: 'Grabados', width: '80', sortable: false },
       		{ name: 'nuevos', index: 'nuevos', label: 'Nuevos', width: '80', hidden: false, sortable: false,
       		                       formatter: function (value, options, rData) {
       		                           return " <a name='" + options.rowId + "' class='tiposin' onClick='AsignaValores(this.name,1,1);' title='Ver Detalle' style='cursor:pointer;text-decoration: underline;color:#0000FF;' > " + rData.nuevos + " </a> ";
       		                           //       		                           return " <a href='#' name='" + options.rowId + "' class='tiposin' onClick='DetalleTarea2(this.name,1);' title='Ver Detalle' >" + value + " </a> ";
       		                       }
            },
       		{ name: 'editados', index: 'editados', label: 'Editados', width: '80', sortable: false },
            { name: 'cambioou', index: 'cambioou', label: 'Cambio OU', width: '80', sortable: false,
                formatter: function (value, options, rData) {
                                       return " <a  name='" + options.rowId + "' class='tiposin' onClick='AsignaValores(this.name,3,1);' title='Ver Detalle' style='cursor:pointer;text-decoration: underline;color:#0000FF;'> " + value + " </a> ";
                                   }
            },
            { name: 'eliminados', index: 'vcVal', label: 'Ceses', width: '80', sortable: false,
                formatter: function (value, options, rData) {
                                       return " <a name='" + options.rowId + "' class='tiposin' onClick='AsignaValores(this.name,0,1);' title='Ver Detalle' style='cursor:pointer;text-decoration: underline;color:#0000FF;'> " + value + " </a> ";
                                   }
            },
            { name: 'estado', index: 'estado', label: 'Estado', width: '100', sortable: false },
            { name: 'descripcion', index: 'descripcion', label: 'descripcion', width: '80', sortable: false, hidden: true },
            { name: 'botones', index: 'botones', label: 'Eliminar', width: '60', sortable: false,
                formatter: function (value, options, rData) {
       		                           return GenerarBotones(value);
       		                       }
            }
        ],
        width: "1200",
        height: "120",
        //        sortname: "fecha", //Default SortColumn
        //        sortorder: "asc", //Default SortOrder.
        rownumbers: true,
        caption: "Resumen de Tareas",
        shrinkToFit: true,
        onSelectRow: function (id) {
            //            alert("1");
            //DetalleTarea("");           
        },
        onCellSelect: function (row, col, content, event) {
            var cm = jQuery("#tbresumen").jqGrid("getGridParam", "colModel");
            var columna = cm[col].name;
            //            alert("2");

            //            if (columna == "nuevos") {
            //                DetalleTarea("");
            //            }
            //            else if (columna == "editados") {
            //                DetalleTarea("");
            //            }
            //            else if (columna == "eliminados") {
            //                DetalleTarea("");
            //            }
            //            else if (columna == "cambioou") {
            //                DetalleTarea("");
            //            }
            //            else if (columna == "errados") {
            //                DetalleTarea("d");
            //            }

        }
    });

    var tbdetalle = $("#tbdetalle").jqGrid({
        datatype: "local",
        datatype: DetalleTarea2,
        jsonReader:
                      {
                          root: 'Items',
                          page: 'PaginaActual',
                          total: 'TotalPaginas',
                          records: 'TotalRegistros',
                          repeatitems: true,
                          cell: 'Row',
                          Id: 'itemregistro'
                      },

        colModel: [{ name: 'itemregistro', index: 'itemregistro', label: 'Id Reg',hidden: true, width: '60', sortable: true },
       		       { name: 'accion', index: 'accion', label: 'Acción', width: '70', sortable: true },
                   { name: 'codigo', index: 'codigo', label: 'Código', width: '90', sortable: true },
       		       { name: 'nombre', index: 'nombre', label: 'Nombres', width: '150', sortable: true },
                   { name: 'observaciones', index: 'observaciones', label: 'Observaciones', hidden: true, width: '100', sortable: true },
                   { name: 'email', index: 'email', label: 'Correo', width: '150', sortable: true },
                   { name: 'corjft', index: 'corjft', label: 'Correo Jefatura', width: '150', sortable: true },
                   { name: 'costo', index: 'costo', label: 'Costo', hidden: true, width: '100', sortable: true },
                   { name: 'codorgact', index: 'codorgact', label: 'Cód. Organización',  width: '100', sortable: true },
                   { name: 'area', index: 'area', label: 'Organización Actual', hidden: false, width: '200', sortable: true },
                   { name: 'anexo', index: 'anexo', label: 'Extensión', hidden: true, width: '100', sortable: true },
                   { name: 'clave', index: 'clave', label: 'Clave', hidden: true, width: '100', sortable: true },
                   { name: 'descripcion', index: 'descripcion', label: 'Mensaje', hidden: true, width: '100', sortable: true },

        //{name: 'area', index: 'area', label: 'Área', width: '180', sortable: true },
                
                   { name: 'tipo', index: 'tipo', label: 'Tipo', width: '90', sortable: true },
                   { name: 'linea', index: 'lineadispositivo', label: 'Línea / Dispositivo', width: '150', sortable: true },
                   { name: 'caracteristica', index: 'caracteristica', label: 'Característica Línea / Dispositivo', width: '200', sortable: true },
                   { name: 'codorgant', index: 'codorgant', label: 'Cod. Org. Anterior', hidden: false, width: '100', sortable: true },
                   { name: 'nomorgant', index: 'nomorgant', label: 'Organización Anterior', hidden: false, width: '200', sortable: true }
       	          ],

        pager: "#pager", //Pager.
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}',
        rowNum: "10",
        rowList: [10, 20, 30],
        width: "1200",
        height: "250",
        sortorder: "asc",
        //scroll: false,
        shrinkToFit: false,
        rownumbers: true,
        caption: "Información de Líneas y Dispositivos"

        //ondblClickRow: function (itemregistro) { $("#btnModificarD").click(); }
    }).navGrid("#pager", { edit: false, add: false, search: false, del: false });

    $("#tbdetalle").jqGrid('bindKeys', { "onEnter": function (itemregistro) { $("#btnModificarD").click(); }, "onSpace": function (itemregistro) { $("#btnModificarD").click(); } });
    
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

                            $("#tbresumen").jqGrid('setRowData', fechaid, { 'fecha': this.fecha, 'frecuencia': this.frecuencia, 'registros': this.registros,
                                'subidos': this.subidos, 'errados': this.errados, 'grabados': this.grabados, 'nuevos': this.nuevos, 'valor': this.valor,
                                'editados': this.editados, 'cambioou': this.cambioou, 'eliminados': this.eliminados, 'estado': this.estado, 'descripcion': this.descripcion
                            });

                            $("#progressbar" + fechaid).progressbar("option", "value", parseInt(this.valor));
                            MostrarAcciones(this.estado, this.fechaid);
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
                        $("#tbresumen").jqGrid('addRowData', this.fechaid, {
                            'fechaid': this.fechaid, 'fecha': this.fecha, 'fechaansi': this.fechaansi, 'frecuencia': this.frecuencia,
                            'registros': this.registros, 'valor': this.valor,
                            'progress': this.fechaid, 'subidos': this.subidos, 'errados': this.errados,
                            'grabados': this.grabados, 'nuevos': this.nuevos, 'editados': this.editados, 'cambioou': this.cambioou,
                            'eliminados': this.eliminados, 'botones': this.fechaid, 'estado': this.estado, 'descripcion': this.descripcion
                        });

                        $("#progressbar" + this.fechaid).progressbar({ value: parseInt(this.valor) });
                        MostrarAcciones(this.estado, this.fechaid);
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


        $("#btnEliminar" + fechaid).click(function (event) {
            $('#divMsgConfirmacionEliminar').dialog({
                title: "Confirmación",
                modal: true,
                resizable: false,
                buttons: {
                    Aceptar: function () {
                        $(this).dialog("close");
                        var fechaid = $("#tbresumen").jqGrid('getGridParam', 'selrow');
                        EjecutarAccion("EliminarResumen", fechaid);
                    },
                    Cancelar: function () {
                        $(this).dialog("close");
                    }
                }
            });
        });

    }


    function MostrarAcciones(estado, fechaid) {
        var botonactual = $("#btnEliminar" + fechaid);
        botonactual.hide();
        //alert(estado);
        if (estado == "En Proceso") {
            botonactual.hide();
        }
        else {
            botonactual.show();
        }

        //        switch (estado.toString) {
        //            case "En Cola":
        //                botonactual.show();
        //            case "En Proceso":
        //                botonactual.hide();
        //            case "En Error":
        //                botonactual.show();
        //            case "Finalizada":
        //                botonactual.show();
        //        }

    }


    function EjecutarAccion(Accion, fechaid) {
        $.ajax({
            type: "POST",
            url: "Sin_Utilitarios.aspx/" + Accion,
            data: "{'fecha': '" + fechaid + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d != "") {
                    alert(result.d);
                }
                else {
                    DetalleTarea("");
                    Mensaje("<br/><h1>La acción " + Accion + " ha sido ejecutada</h1><br/>", document, CerroMensaje);

                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }



    $("#btnfiltrard").click(function (event) {
        
        if (vctarea == '' || vctipo == '') {
            return;
        }

        $('#tbdetalle').trigger('reloadGrid');
    });



    $("#btnModificarD").click(function () {
        var PosAct;
        var id = $("#tbdetalle").jqGrid('getGridParam', 'selrow');
        if (id) {
            var datos = $("#tbdetalle").jqGrid('getRowData', id);
            $('#txtcodigo').val(datos.codigo);
            $('#txtnombre').val(datos.nombre);
            $('#txtemail').val(datos.email);
            $('#txtobservaciones').val(datos.observaciones);

            $('#txtarea').val(datos.area);
            $('#txtcosto').val(datos.costo);

            $('#txtaccion').val(datos.accion);
            $('#txtanexo').val(datos.anexo);

            $('#txtclave').val(datos.clave);
            $('#txtmensaje').val(datos.descripcion);

            $('#dvCamposDetalle').dialog({
                title: "Detalle de Registro",
                width: 500,
                modal: true,
                buttons: {
                    "Aceptar": function () {
                        $(this).dialog("close");
                    }
                }
            });
        }
        else {
            alert("Seleccione un registro");
        }
    });


    $(window).resize(function () {
        DimPosElementos();
    });

    function DimPosElementos() {
        var Ancho = $('#ContenedorPagina').width();
        var Alto = $('#ContenedorPagina').height();

        $("#tbresumen").jqGrid('setGridWidth', parseInt($(window).width()) - 40);
        $("#tbdetalle").jqGrid('setGridWidth', parseInt($(window).width()) - 40);

    }

    DimPosElementos();


    $(document).ajaxStart(function (e) {
        $("#dvCargando").hide();

    });



    function DetalleTarea(idfiltro, idtipo) {
        var fechaid = -1;
        var inCodCol = $("#tbresumen").jqGrid('getGridParam', 'selrow');
        var textodetalle = $("#txtfiltro_detalle").val();
        var textoerror = $("#txtfiltro_error").val();

        if (inCodCol) {

            var datos = $("#tbresumen").jqGrid('getRowData', inCodCol);
            $("#txtestado").val(datos.descripcion);

            $("#hdresumen").val(inCodCol);
            //$("#tbdetalle").css("display", "block");




            if (idfiltro == "d" || idfiltro == "") {
                $("#tbdetalle").jqGrid("clearGridData", true);
                //CARGAR DETALLE
                $.ajax({
                    type: "POST",
                    url: "Sin_Utilitarios.aspx/ListarDetalleResumen",
                    data: "{'vctarea': '" + inCodCol + "','vctipo': '1','vccadena': '" + textodetalle + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        
                        for (var i = 0; i < $(result.d).length; i++)
                            $("#tbdetalle").jqGrid('addRowData', i,
                            { itemregistro: result.d[i].itemregistro,
                                codigo: result.d[i].codigo,
                                accion: result.d[i].accion,
                                nombre: result.d[i].nombre,
                                observaciones: result.d[i].observaciones,
                                email: result.d[i].email,
                                costo: result.d[i].costo,
                                area: result.d[i].area,
                                anexo: result.d[i].anexo,
                                clave: result.d[i].clave,
                                descripcion: result.d[i].descripcion,
                                corjft: result.d[i].correojft,
                                lineadispositivo: result.d[i].linea,
                                caracteristica: result.d[i].caracteristica
                            });


                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }

                });
            }



        }
        else {
            $("#tbdetalle").jqGrid("clearGridData", true);

        }
    }


});

function AsignaValores(idfiltro, idtipo, filtro) {

vctarea=idfiltro;
vctipo = idtipo;

$("#txtfiltro_detalle").val("");

$('#tbdetalle').trigger('reloadGrid');

$('.ui-pg-input').attr('size', 6);
}

function DetalleTarea2() {

    var textodetalle = $("#txtfiltro_detalle").val();
    var inCodCol = vctarea; 

    $("#hdresumen").val(inCodCol);  

  
    var inPagTam = $("#tbdetalle").getGridParam("rowNum");
    var inPagAct = $("#tbdetalle").getGridParam("page");
    var sortOrder = $('#tbdetalle').getGridParam("sortorder");
    var CampoOrden = $('#tbdetalle').getGridParam("sortname");

        //CARGAR DETALLE
        $.ajax({
            
            url: "Sin_Utilitarios.aspx/ListarDetalleResumenDT",
            data: "{'vctarea':'" + vctarea + "'," +
                  "'vctipo':'" + vctipo + "'," +
                  "'vccadena':'" + textodetalle + "'," +
                  "'campoordenar':'" + CampoOrden + "'," +
                  "'orden':'" + sortOrder + "'," +
                  "'inPagTam':'" + parseInt(inPagTam) + "'," +
                  "'inPagAct':'" + parseInt(inPagAct) + "'}",
            dataType: 'json',
            type: 'post',
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
                $("#tbdetalle").jqGrid("clearGridData", true);

                if (result.d.Items.length > 0) {
                    $('#tbdetalle')[0].addJSONData(result.d);
                }
                //for (var i = 0; i < $(result.d).length; i++)
                //    $("#tbdetalle").jqGrid('addRowData', i,
                //            { itemregistro: result.d[i].itemregistro,
                //                codigo: result.d[i].codigo,
                //                accion: result.d[i].accion,
                //                nombre: result.d[i].nombre,
                //                observaciones: result.d[i].observaciones,
                //                email: result.d[i].email,
                //                costo: result.d[i].costo,
                //                  codorgact: result.d[i].codorgact,
                //                area: result.d[i].area,
                //                anexo: result.d[i].anexo,
                //                clave: result.d[i].clave,
                //                descripcion: result.d[i].descripcion,
                //                corjft: result.d[i].correojft,
                //                tipo: result.d[i].tipo,
                //                linea: result.d[i].linea,
                //                caracteristica: result.d[i].caracteristica,
                //                codorgant: result.d[i].codorgant,
                //                nomorgant: result.d[i].nomorgant
                //            });


            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }

        });
}
