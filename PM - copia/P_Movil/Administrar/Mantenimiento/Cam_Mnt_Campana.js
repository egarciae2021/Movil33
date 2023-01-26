function ENT_MOV_CAM_Campana() {
    this.IdCampana;
    this.Codigo;
    this.CodigoProveedor;
    this.IdContrato;
    this.Descripcion;
    this.FechaPreventaAnsi;
    this.FechaInicioAnsi;
    this.FechaFinAnsi;
    //this.MigrarContrato;
    this.PreventaNotificacionInicio;
    this.PreventaNotificacionDiario;
    this.PreventaNotificacionAntesInicio;
    this.PreventaVisualizarEquipo;
    this.PreventaPreseleccionarEquipo;
    this.NuevoProducto;
    this.ModificaProducto;
    this.BajaProducto;
    this.ActivarChat;
    this.ActivarPublicidad;
    this.PreVenta;
    this.Vigente;
    this.MOV_CAM_CampanaConfiguracion;
    this.MOV_CAM_SubContrato;
    this.MOV_CAM_Publicidad;
    this.oMOV_CAM_CampanaCreditoListaNegra;

    //Jherrera 20140701
    this.FechaInicioPedidoAnsi;
    this.FechaInicioEntregaAnsi;
    this.btActivo;
}

function fnMostrarDatos(valor) {
    //alert(valor);
    $.ajax({
        type: "POST",
        url: "Cam_Mnt_Campana.aspx/GuardarGrupo",
        data: "{'P_inCodGru': '" + valor + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            //if (inTip == 1) {
            //var Grupo = new grupo();
            BuscarGrilla();
            //Grupo.inCodGru = $("#ddlGrupo").val();
            //Grupo.vcGru = $("#ddlGrupo option:selected").text();

            //window.parent.tblGrupo.jqGrid('addRowData', Grupo.inCodGru, Grupo);
            //}
            //else {
            //    window.parent.tblGrupo.jqGrid('setRowData', $("#hdfGrupo").val(), { 'vcVal': Valor });
            //}
            //window.parent.ModalEmpleados.dialog('close');
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function ValorBusqueda() {
    if ($("#txtBusqueda").hasClass("txtBusqueda")) {
        return "";
    }
    else {
        return vcBusqueda;
    }
}

function BuscarGrilla() {
    vcBusqueda = $("#txtBusqueda").val().replace(/'/g, "&#39");
    $("#tblPoliticaSolicitudxGrupo").trigger("reloadGrid");
}


function CargarDialog(id, ancho, alto, titulo) {
    $("#ifLugarEntrega")[0].contentWindow.$(id).dialog({
        title: titulo,
        width: ancho,
        height: alto,
        modal: true
    });
}

var asInitVals = [];
var timeoutHnd;
var tblGrupo;
var esEdicion = false;

var oCulturaUsuario;
var FormatoFechaCulturaForDatePicker = "";
var SimDec = ".";
var SimMil = ",";
var NumDec = "2";
$(function () {

    oCulturaUsuario = window.parent.parent.oCulturaUsuario;
    FormatoFechaCulturaForDatePicker = oCulturaUsuario.vcFecCor.toLowerCase();

    if (FormatoFechaCulturaForDatePicker.indexOf("yyyy") >= 0) {
        FormatoFechaCulturaForDatePicker = FormatoFechaCulturaForDatePicker.replace("yyyy", "yy");  //Para datepicker 'yy' es como 'yyyy'; y 'y' es 'yy'
    }
    else if (FormatoFechaCulturaForDatePicker.indexOf("yy") >= 0) {
        FormatoFechaCulturaForDatePicker = FormatoFechaCulturaForDatePicker.replace("yy", "y");
    }

    SimMil = oCulturaUsuario.vcSimSepMil;
    NumDec = oCulturaUsuario.dcNumDec;
    SimDec = oCulturaUsuario.vcSimDec;

    $(".DATETIME").datepicker({
        changeMonth: true,
        changeYear: true,
        format: "dd/mm/yy"
    });

    $(".txtFechaKendo").removeClass("ui-widget-content ui-corner-all");
    $(".txtFechaKendo").css("padding", "0px");
    $(".txtFechaKendo").css("margin", "0px");
    $(".txtFechaKendo").kendoTimePicker({
        culture: "es-ES",
        animation: false,
        format: "HH:mm:ss",
        interval: 60
    });

    $("#btnResumenCampana").click(function () {
        fnObtenerResumenCampana();
    });

    if ($("#hdfIdCampana").val() == '') { //agregado 14/07/2014 - wapumayta
        esEdicion = false;
    } else {
        esEdicion = true;
    }
    $("#ifConfiguracion").attr('src', '../../Configurar/Cam_Conf_PoliticaCampana.aspx?IdCampana=' + $("#hdfIdCampana").val());
    if (esEdicion) { //agregado 14/07/2014 - wapumayta
        $("#ifSubContrato").attr('src', '../../Configurar/Cam_Conf_ContratoUsuario.aspx?IdCampana=' + $("#hdfIdCampana").val()); // usado en creacion
        $("#ifBanner").attr('src', '../../Configurar/Cam_Conf_CampanaBanner.aspx?IdCampana=' + $("#hdfIdCampana").val()); // usado en creacion (ahora solo en edicion)
        $("#ifLugarEntrega").attr('src', 'Cam_Mnt_CampanaLugarEntrega.aspx?IdCampana=' + $("#hdfIdCampana").val());
        $("#ifCredito").attr('src', 'Cam_Mnt_CampanaCredito.aspx?IdCampana=' + $("#hdfIdCampana").val());
        $("#ifListaNegra").attr('src', 'Cam_Mnt_CampanaListaNegra.aspx?IdCampana=' + $("#hdfIdCampana").val()); // usado en creacion
        $("#ifFinanciamiento").attr('src', 'Cam_Mnt_CampanaFinanciamiento.aspx?IdCampana=' + $("#hdfIdCampana").val());
        $("#ifProductos").attr('src', 'Cam_Mnt_CampanaProductos.aspx?IdCampana=' + $("#hdfIdCampana").val());
        $("#ifContratoResumen").attr('src', '../../Configurar/Cam_Conf_ContratoUsuarioResumen.aspx?IdCampana=' + $("#hdfIdCampana").val());
    }

    if ($("#hdfActivo").val() == "1") {
        $("#imgActivar").attr('src', '../../../Common/Images/Mantenimiento/Stop_16x16.png');
        $("#lblActivar").text("Finalizar Campaña");
    } else if ($("#hdfActivo").val() == "") {
        $("#btnActivar").hide();
    }

    ActivarCombokendo("#ddlContrato", 200);
    $("input[name='ddlContrato_input']").attr("disabled", "disabled");
    $("#txtCodigo").keypress(ValidarAlfaNumericoConEspacios);
    $("#txtCodigoProveedor").keypress(ValidarAlfaNumericoConEspacios);
    $("#txtDescripcion").keypress(ValidarAlfaNumericoConEspacios);
    $("#txtDescripcion").attr('maxlength', '1000');
    $("#txtCodigo").attr('maxlength', '20');
    $("#txtCodigoProveedor").attr('maxlength', '20');
    $(".trCancelarPedidoDias input").keypress(ValidarEnteroPositivo);
    $(".trReservarProductoDias input").keypress(ValidarEnteroPositivo);
    $("#txtDiasRecojo").keypress(ValidarEnteroPositivo);
    $("#txtCantidadPedidosxDia").keypress(ValidarEnteroPositivo);
    //            var oOperador = new GEN_Operador();
    //            var oCampana = new MOV_CAM_Campana();
    //            ko.applyBindings(oOperador);
    //ko.applyBindings(oCampana);
    //oOperador.Listar("<Seleccione un operador>");
    $("input:checkbox,input:radio,input:file").uniform();
    var tabContenido = $("#tabContenido").tabs({});
    $("#tabExtras").tabs({});

    //agregado 14/07/2014 - wapumayta
    if (!esEdicion) { //si es nuevo ocultar pestaña extras
        removerTab("tbExtras");
        //$("#tabExtras").tabs("option", "disabled", [1, 2, 3, 4, 5, 6]);
    }
    //var id;

    //datetimepickerkendoFormar(".DATETIME");
    //datepickerkendoFormar(".DATE");
    var fechaIni = $("#txtFechaInicio").val();
    var fechaFin = $("#txtFechaFin").val();
    var fechaPreventa = $("#txtFechaPreventa").val();
    var fechaIniPedido = $("#txtFechaInicioPedido").val();
    var fechaIniEntrega = $("#txtFechaInicioEntrega").val();

    $(".DATETIME").datepicker('option', 'dateFormat', FormatoFechaCulturaForDatePicker);

    if ($("#hdfIdCampana").val() == '') { //nuevo
        //        $("#txtFechaInicio").datepicker('option', 'minDate', new Date());
        //        $("#txtFechaFin").datepicker('option', 'minDate', new Date());
        //        $("#txtFechaPreventa").datepicker('option', 'minDate', new Date());
        //        $("#txtFechaInicioPedido").datepicker('option', 'minDate', new Date());
        //        $("#txtFechaInicioEntrega").datepicker('option', 'minDate', new Date());
        $("#txtFechaInicio").datepicker();
        $("#txtFechaFin").datepicker();
        $("#txtFechaPreventa").datepicker();
        $("#txtFechaInicioPedido").datepicker();
        $("#txtFechaInicioEntrega").datepicker();
    } else {
        $("#txtFechaInicio").datepicker("setDate", fechaIni);
        $("#txtFechaFin").datepicker("setDate", fechaFin);
        $("#txtFechaPreventa").datepicker("setDate", fechaPreventa);
        $("#txtFechaInicioPedido").datepicker("setDate", fechaIniPedido);
        $("#txtFechaInicioEntrega").datepicker("setDate", fechaIniEntrega);

        //$("#txtFechaInicio").val(fechaIni);
        //$("#txtFechaFin").val(fechaFin);


        ////        //fechaIni.min(new Date());
        ////        $("#txtFechaInicio").datepicker('option', 'minDate', new Date());
        //        $("#txtFechaPreventa").datepicker('option', 'minDate', $("#txtFechaInicio").val());
        //        $("#txtFechaPreventa").datepicker('option', 'maxDate', $("#txtFechaFin").val());
        ////        //fechaPreventa.min(new Date());
        ////        //fechaPreventa.max(fechaIni.value());
        //        $("#txtFechaFin").datepicker('option', 'maxDate', $("#txtFechaFin").val());
        ////        //fechaIni.max(fechaFin.value());
        //        $("#txtFechaFin").datepicker('option', 'minDate', $("#txtFechaInicio").val());
        ////        //fechaFin.min(fechaIni.value());

        ////        //        fechaIniPedido.min(fechaIni.value());
        ////        //        fechaIniPedido.max(fechaFin.value());
        ////        //        fechaIniEntrega.min(fechaIniPedido.value());
        ////        //        fechaIniEntrega.max(fechaFin.value());

        //        $("#txtFechaInicioPedido").datepicker('option', 'minDate', $("#txtFechaInicio").val());
        //        $("#txtFechaInicioPedido").datepicker('option', 'maxDate', $("#txtFechaFin").val());
        //        $("#txtFechaInicioEntrega").datepicker('option', 'minDate', $("#txtFechaInicioPedido").val());
        //        $("#txtFechaInicioEntrega").datepicker('option', 'maxDate', $("#txtFechaInicioEntrega").val());

    }

    //    $("#txtFechaInicio").datepicker("option", "minDate", new Date());
    //    $("#txtFechaFin").datepicker("option", "minDate", new Date());
    //    $("#txtFechaInicioPedido").datepicker("option", "minDate", new Date());
    //    $("#txtFechaInicioEntrega").datepicker("option", "minDate", new Date());
    //    $("#txtFechaPreventa").datepicker("option", "minDate", new Date());

    $("#txtFechaInicio").datepicker('option', { onClose: function (selectedDate) {
        if (selectedDate != '') {
            $("#txtFechaFin").datepicker('option', 'minDate', selectedDate);
            $("#txtFechaInicioPedido").datepicker("option", "minDate", selectedDate);
            $("#txtFechaInicioEntrega").datepicker("option", "minDate", selectedDate);
            $("#txtFechaPreventa").datepicker("option", "maxDate", selectedDate);
        } else {
            //$("#txtFechaFin").datepicker('option', 'minDate', new Date());
            $("#txtFechaFin").datepicker();
        }
    }
    });

    $("#txtFechaFin").datepicker('option', { onClose: function (selectedDate) {
        if (selectedDate != '') {
            $("#txtFechaInicio").datepicker('option', 'maxDate', selectedDate);
            $("#txtFechaInicioPedido").datepicker("option", "maxDate", selectedDate);
            $("#txtFechaInicioEntrega").datepicker("option", "maxDate", selectedDate);
        }
    }
    });

    $("#txtFechaInicioPedido").datepicker('option', { onClose: function (selectedDate) {
        if (selectedDate != '') {
            $("#txtFechaInicioEntrega").datepicker("option", "minDate", selectedDate);
        }
    }
    });

    //    fechaIni.bind("change", function () { fechaFin.min(this.value()); fechaPreventa.max(this.value()); fechaIniPedido.min(this.value()); fechaIniEntrega.min(this.value()); });
    //    fechaFin.bind("change", function () { fechaIni.max(this.value()); fechaIniPedido.max(this.value()); fechaIniEntrega.max(this.value()); });
    //    fechaPreventa.bind("change", function () { fechaIni.min(this.value()); });
    //    fechaIniPedido.bind("change", function () { fechaIniEntrega.min(this.value()); });

    //    //var fechaIni = $("#txtFechaInicio").data("kendoDatePicker");
    //    //var fechaFin = $("#txtFechaFin").data("kendoDatePicker");
    //    if ($("#hdfIdCampana").val() == '') { //nuevo
    //        //        fechaIni.min(new Date());
    //        //        fechaFin.min(new Date());
    //        $("#txtFechaInicio").datepicker('option', 'minDate', new Date());
    //        $("#txtFechaFin").datepicker('option', 'minDate', new Date());
    //    } else{
    //        $("#txtFechaInicio").datepicker("option", "maxDate", $("#txtFechaFin").val());
    //        $("#txtFechaFin").datepicker("option", "minDate", $("#txtFechaInicio").val());
    ////        fechaIni.min(new Date());
    ////        fechaIni.max(fechaFin.value());
    ////        fechaFin.min(fechaIni.value());
    //    };
    //fechaIni.bind("change", function () { fechaFin.min(this.value()); });
    //fechaFin.bind("change", function () { fechaIni.max(this.value()); });



    CambiarEstadoChat($('#chkChat').is(':checked'));

    $('#chkChat').change(function () {
        CambiarEstadoChat($(this).is(':checked'));
    });

    function CambiarEstadoChat(habilitado) {
        if ($('#chkChat').is(':checked')) {
            $('#btnGruposChats').show();
        }
        else {
            $('#btnGruposChats').hide();
        }
    }

    tblGrupo = $("#tblPoliticaSolicitudxGrupo").jqGrid({
        sortable: true,
        datatype: function () {
            $.ajax({
                url: "Cam_Mnt_Campana.aspx/ListarPoliticaSolicitudPorGrupo", //PageMethod
                data: "{'inPagTam':'" + $('#tblPoliticaSolicitudxGrupo').getGridParam("rowNum") + "'," + //Tamaño de pagina
                       "'inPagAct':'" + parseInt($('#tblPoliticaSolicitudxGrupo').getGridParam("page")) + "'," + //Pagina actual
                       "'vcCam':'" + $('#ddlBusqueda').val() + "'," + //Campo de busqueda
                       "'vcValBus':'" + ValorBusqueda() + "'}", //Valor de busqueda
                dataType: "json",
                type: "post",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    //$("#tblPoliticaSolicitudxGrupo").trigger("reloadGrid");
                    $("#tblPoliticaSolicitudxGrupo")[0].addJSONData(result.d);
                    //$("#tblPoliticaSolicitudxGrupo").jqGrid('addRowData', result.d[0].P_vcCod, result.d[0]);

                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        jsonReader: //Set the jsonReader to the JQGridJSonResponse squema to bind the data.
                    {
                    root: "Items",
                    page: "PaginaActual",
                    total: "TotalPaginas",
                    records: "TotalRegistros",
                    repeatitems: true,
                    cell: "Row",
                    id: "ID"
                },
        colModel: [{ name: 'RowNumber', index: 'RowNumber', label: 'RowNumber', hidden: true },
             { name: 'inCodGru', index: 'inCodGru', label: 'inCodGru', hidden: true },
             { name: 'vcGru', index: 'vcGru', label: 'Grupo Empleado', hidden: false, width: 400 },
             { name: 'inCodPol', index: 'inCodPol', label: 'inCodPol', hidden: true }
            ],
        pager: "#pager", //Pager.
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        rowNum: "10", //$("#hdfTamPag").val(), //"10" PageSize.
        rowList: [10, 20, 30],  //TamanosPaginaSel, //Variable PageSize DropDownList. 
        sortname: "vcGru", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: "630",
        height: "90",
        rownumbers: true,
        shrinkToFit: false,
        caption: "Grupos Empleado",
        ondblClickRow: function (id) { $("#btnCambiarValGrup").click(); },
        onSelectRow: function (id) {
        },
        sortable: function (permutation) {
            //var colModels = $("#grid").getGridParam("colModel");
            //alert(colModels);
        },
        resizeStop: function (width, index) {
            //alerta("resize column " + index + " to " + width + "pixels");
        },
        afterInsertRow: function (rowid, aData, rowelem) {
            if (aData.btVig == 'False') {
                var colModels = $("#tblPoliticaSolicitudxGrupo").getGridParam("colModel");
                var i;
                for (i in colModels) {
                    $("#tblPoliticaSolicitudxGrupo").jqGrid('setCell', rowid, i, '', { color: 'red' });
                }
            }
        },
        //onSortCol: function(name,index){  alerta("Column Name: "+name+" Column Index: "+index); },
        ondblClickRow: function (id) {
            $("#tblPoliticaSolicitudxGrupo").jqGrid('resetSelection');
            $("#tblPoliticaSolicitudxGrupo").jqGrid('setSelection', id);
            //                        if ($("#hdfEdicion").val() == "1")
            //                            EditaRegistro(id);
        }
    }).navGrid("#pager", { edit: false, add: false, search: false, del: false });

    //PREVENTA
    if ($("#chkPreventa").is(":checked") && $("#hdfTipActualizacion").val() != 2) {
        habilitarPreventa();
    } else {
        deshabilitarPreventa();
    }

    $("#chkPreventa").change(function () {
        if ($("#chkPreventa").is(":checked") && $("#hdfTipActualizacion").val() != 2) {
            habilitarPreventa();
        } else {
            deshabilitarPreventa();
        }
    });

    Dimensionar();

    $('.tdEtiqueta').css({ "width": 80 });

    $(window).resize(function () {
        Dimensionar();
    });
    function Dimensionar() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        $('#dvCampos').css({ "height": Alto - 70 });
        $('#tabContenido').css({ "height": Alto - 75 });
        $('#tabExtras').css({ "height": Alto - 106 });
        $('.ifExtra').css({ "height": Alto - 140 });
        $('.ifExtra').css({ "width": Ancho - 50 });

        $('#tbGeneral').css({ "height": Alto - 110 });



        $('#ifConfiguracion').css({ "height": Alto - 110 });
        $('#ifConfiguracion').css({ "width": Ancho - 50 });


        //$('.dvTabContenido').css({ "height": Alto - 400 });
    }

    $("body").css({ "margin-bottom": "0px", "padding-bottom": "0px" });
    $("#tblPreventa").css("padding", 0);
    $("input:checkbox,input:radio,input:file").uniform();

    $("#txtBusqueda").keyup(function () {
        if (timeoutHnd) {
            clearTimeout(timeoutHnd);
        }
        timeoutHnd = setTimeout(BuscarGrilla, 500);
    });
    $("#txtBusqueda").each(function (i) {
        asInitVals[i] = $(this).val();
    });
    $("#txtBusqueda").focus(function () {
        if ($(this).hasClass("txtBusqueda")) {
            $(this).removeClass("txtBusqueda");
            $(this).val("");
        }
    });
    $("#txtBusqueda").blur(function (i) {
        if ($(this).val() == "") {
            $(this).addClass("txtBusqueda");
            $(this).val(asInitVals[$("#txtBusqueda").index(this)]);
        }
    });
    $("#ddlBusqueda").change(function (event) {
        $("#txtBusqueda").val("");
        $("#txtBusqueda").addClass("txtBusqueda");
        $("#txtBusqueda").val(asInitVals[0]);
        $("#txtBusqueda").focus();
    });

    //ASOCIAR GRUPOS ORIGEN A CAMPANAS
    $("#btnGruposChats").click(function () {
        $('#dvEleccionGruposOrigen').dialog({
            title: "Seleccionar Grupo Empleado (Tipo de Línea - Familia)",
            width: 850,
            modal: true,
            buttons: {
                "Aceptar": function () {
                    $(this).dialog("close");
                },
                "Cerrar": function () {
                    $(this).dialog("close");
                }
            }
        });
    });

    //AGREGAR GRUPOS ORIGEN
    $("#btnAgregarGrupo").click(function (event) {
        //dialogValor('Agregar Grupo Empleado');
        $("#bpTecnicoResponsable_imgBusqueda").click();
    });

    //QUITAR GRUPOS ORIGEN
    $("#btnQuitarGrupo").click(function (event) {
        var id = $("#tblPoliticaSolicitudxGrupo").jqGrid('getGridParam', 'selrow');
        if (id) {
            var inCodGru = id;
            var inCodPol = $("#hdfPolitica").val();
            $('#divMsgConfirmacionGrupo').dialog({
                title: "Remover Grupo Empleado",
                modal: true,
                buttons: {
                    "Si": function () {
                        $.ajax({
                            type: "POST",
                            url: "Cam_Mnt_Campana.aspx/QuitarGrupo",
                            data: "{'inCodGru': '" + inCodGru + "'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (msg) {
                                if (msg.d == "") {
                                    $("#tblPoliticaSolicitudxGrupo").jqGrid('delRowData', id);
                                    Mensaje("<br/><h1>Grupo Empleado Quitado</h1><br/>", document, CerroMensajeGrupo);
                                }
                                else {
                                    alerta(msg.d);
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
        else {
            alerta("Seleccione un registro");
        }
    });

    $("#btnActivar").click(function () {
        if ($("#hdfActivo").val() == "1") {
            confirmacion("Al finalizar esta campaña, no se podrán hacer pedidos relacionados con esta. ¿Desea Continuar?", fnActivarDesactivarCampana, null, null);
        } else {
            if ($("#hdfIdCamAct").val() == "") {
                fnActivarDesactivarCampana();
            } else {
                var arCampActs = $("#hdfNomCamAct").val().split("|");
                var descCampActs = '<ul style="font-weight: bold;">';
                for (var i = 0; i < arCampActs.length; i++) {
                    descCampActs = descCampActs + "<li>" + arCampActs[i] + "</li>";
                }
                descCampActs = descCampActs + "</ul>";
                confirmacion("Ya existen campanas activas:" + descCampActs + "Todas las campañas activas se mostraran en la web de pedidos. ¿Desea continuar?", fnActivarDesactivarCampana, null, null);
            }
        }
        //if ($("#hdfIdCamAct").val() == "") {
        //    confirmacion("Al finalizar esta campaña, no se podrán hacer pedidos relacionados con esta. ¿Desea Continuar?", fnActivarDesactivarCampana, null, "");
        //} else {
        //    confirmacion("Si inicia esta campaña, la campaña '" + $("#hdfNomCamAct").val() + "' pasará a finalizada. ¿Desea continuar?", fnActivarDesactivarCampana, null, "");
        //}
    });

    function fnActivarDesactivarCampana() {
        var biActivo;
        if ($("#hdfActivo").val() == "1") {
            biActivo = "0";
        }
        else {
            biActivo = "1";
        }
        //var FechaInicioAnsi = Date2Ansi(fechaIni.value());
        //var FechaInicioPedidoAnsi = Date2Ansi(fechaIniPedido.value());
        //var FechaInicioEntregaAnsi = Date2Ansi(fechaIniEntrega.value());

        //if (FechaInicioAnsi == '') {
        //    alerta("Ingrese Fecha de Inicio de campaña, es un campo obligatorio");
        //    $("#txtFechaInicio").focus();
        //    return;
        //};
        //if (FechaInicioPedidoAnsi == '') {
        //    alerta("Ingrese 'Fecha Inicio Pedido', es un campo obligatorio");
        //    $("#txtFechaInicioPedido").focus();
        //    return;
        //};
        //if (FechaInicioEntregaAnsi == '') {
        //    alerta("Ingrese 'Fecha Inicio Entrega', es un campo obligatorio");
        //    $("#txtFechaInicioEntrega").focus();
        //    return;
        //};
        $.ajax({
            type: "POST",
            url: "Cam_Mnt_Campana.aspx/ActivarDesactivarCampana",
            data: "{'IdCampana': '" + $("#hdfIdCampana").val() + "'," +
                  "'Activo': '" + biActivo + "'}",
            //                  "'FechaInicioCampana': '" + FechaInicioAnsi + "'," +
            //                  "'FechaInicioPedido': '" + FechaInicioPedidoAnsi + "'," +
            //                  "'FechaInicioEntrega': '" + FechaInicioEntregaAnsi + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.d == "1") {
                    if (biActivo == "1") {
                        Mensaje("<br/><h1>Campaña iniciada correctamente</h1><br/>", document, CerroMensaje);
                    }
                    else {
                        Mensaje("<br/><h1>Campaña finalizada correctamente</h1><br/>", document, CerroMensaje);
                    }
                }
                else {
                    alerta(msg.d);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    //GUARDAR
    $("#btnGuardar").click(function () {

        var oCampana = new ENT_MOV_CAM_Campana();

        oCampana.Vigente = $('#chkEstado').is(':checked');
        oCampana.IdCampana = ($("#hdfIdCampana").val() == "" ? "-1" : $("#hdfIdCampana").val());
        oCampana.Codigo = $("#txtCodigo").val();
        oCampana.IdContrato = $("#ddlContrato").data("kendoComboBox").value();
        oCampana.CodigoProveedor = $("#txtCodigoProveedor").val();
        oCampana.Descripcion = $("#txtDescripcion").val();
        //oCampana.FechaInicioAnsi = Date2Ansi(fechaIni.value());
        //oCampana.FechaInicioAnsi = Date2Ansi(fechaFin.value());        
        //Jherrera 20140701
        //oCampana.FechaInicioPedidoAnsi = Date2Ansi(fechaIniPedido.value());
        //oCampana.FechaInicioEntregaAnsi = Date2Ansi(fechaIniEntrega.value());


        //        if ($("#txt_montogadmin").text() == "") {
        //            $("#txt_montogadmin").val("0");
        //            $("#chk_gadministrativos").attr('checked', false);
        //        }

        if ($("#txtHoraIniFechaInicio").val() == '') {
            alerta("Ingrese La Hora de la Fecha Inicio de campaña, es un campo obligatorio");
            $("#txtHoraIniFechaInicio").focus();
            return;
        }
        if ($("#txtHoraFinFechaFin").val() == '') {
            alerta("Ingrese La Hora de la Fecha Fin de campaña, es un campo obligatorio");
            $("#txtHoraFinFechaFin").focus();
            return;
        }
        if ($("#txtHoraFechaInicioPedido").val() == '') {
            alerta("Ingrese La Hora de la Fecha Inicio Pedido de campaña, es un campo obligatorio");
            $("#txtHoraFechaInicioPedido").focus();
            return;
        }
        if ($("#txtHoraFechaInicioEntrega").val() == '') {
            alerta("Ingrese La Hora de la Fecha Inicio Entrega de campaña, es un campo obligatorio");
            $("#txtHoraFechaInicioEntrega").focus();
            return;
        }





        var dtFechaInicio = Date.parseExact($("#txtFechaInicio").val(), oCulturaUsuario.vcFecCor);
        oCampana.FechaInicioAnsi = Date3Ansi(dtFechaInicio) + " " + $("#txtHoraIniFechaInicio").val();
        var FechaFinAnsi = Date.parseExact($("#txtFechaFin").val(), oCulturaUsuario.vcFecCor);
        oCampana.FechaFinAnsi = Date3Ansi(FechaFinAnsi) + " " + $("#txtHoraFinFechaFin").val();
        var fechaIniPedido = Date.parseExact($("#txtFechaInicioPedido").val(), oCulturaUsuario.vcFecCor);
        oCampana.FechaInicioPedidoAnsi = Date3Ansi(fechaIniPedido) + " " + $("#txtHoraFechaInicioPedido").val();
        var fechaIniEntrega = Date.parseExact($("#txtFechaInicioEntrega").val(), oCulturaUsuario.vcFecCor);
        oCampana.FechaInicioEntregaAnsi = Date3Ansi(fechaIniEntrega) + " " + $("#txtHoraFechaInicioEntrega").val();

        if ($("#hdfActivo").val() == "1") {
            oCampana.btActivo = true;
        }
        else {
            oCampana.btActivo = false;
        }

        //oCampana.MigrarContrato = $('#chkMigrarContrato').is(':checked');
        oCampana.NuevoProducto = $("#chkNuevoProducto").is(":checked");
        oCampana.ModificaProducto = $("#chkModificaProducto").is(":checked");
        oCampana.BajaProducto = $("#chkBajaProducto").is(":checked");
        oCampana.ActivarChat = $("#chkChat").is(":checked");
        oCampana.ActivarPublicidad = $("#chkActivarPublicidad").is(":checked");

        oCampana.PreVenta = $("#chkPreventa").is(":checked");
        var fechaPreventa = Date.parseExact($("#txtFechaPreventa").val(), oCulturaUsuario.vcFecCor);
        oCampana.FechaPreventaAnsi = Date2Ansi(fechaPreventa);
        oCampana.PreventaNotificacionInicio = $("#chkPreventaNotificacionInicio").is(":checked");
        oCampana.PreventaNotificacionDiario = $("#chkPreventaNotificacionDiario").is(":checked");

        if ($("#chkPreventaNotificacionAntesInicio").is(":checked")) {
            oCampana.PreventaNotificacionAntesInicio = $("#txtPreventaNotificacionAntesInicio").val();
        }
        else {
            oCampana.PreventaNotificacionAntesInicio = null;
        }

        oCampana.PreventaVisualizarEquipo = $("#chkPreventaVisualizarEquipo").is(":checked");
        oCampana.PreventaPreseleccionarEquipo = $("#chkPreventaPreseleccionarEquipo").is(":checked");

        oCampana.MOV_CAM_CampanaConfiguracion = $("#ifConfiguracion")[0].contentWindow.ObtieneConfiguracion();
        if (esEdicion) { //agregado 14/07/2014 - wapumayta
            oCampana.MOV_CAM_SubContrato = $("#ifSubContrato")[0].contentWindow.ObtieneSubContrato();
            oCampana.MOV_CAM_SubContrato.RutaSubContratoResumen = $("#ifContratoResumen")[0].contentWindow.ObtieneSubContratoResumen();
            oCampana.MOV_CAM_Publicidad = $("#ifBanner")[0].contentWindow.ObtienePublicidad();
            oCampana.oMOV_CAM_CampanaCreditoListaNegra = $("#ifListaNegra")[0].contentWindow.ObtenerListaNegra();
        }

        //validaciones
        if (oCampana.Codigo == "") {
            alerta("Ingrese Código de campaña, es un campo obligatorio");
            $("#txtCodigo").focus();
            return;
        }
        if (oCampana.IdContrato == "-1") {
            alerta("Seleccione un Contrato, es un campo obligatorio");
            $("#ddlContrato").focus();
            return;
        }
        if (oCampana.Descripcion == '') {
            alerta("Ingrese Descripción de campaña, es un campo obligatorio");
            $("#txtDescripcion").focus();
            return;
        }
        if (oCampana.FechaInicioAnsi == '') {
            alerta("Ingrese Fecha de Inicio de campaña, es un campo obligatorio");
            $("#txtFechaInicio").focus();
            return;
        }
        if (oCampana.FechaFinAnsi == '') {
            alerta("Ingrese Fecha de Fin de campaña, es un campo obligatorio");
            $("#txtFechaFin").focus();
            return;
        }

        if (oCampana.PreVenta && oCampana.FechaPreventaAnsi == '') {
            alerta("Ingrese Fecha Preventa de campaña, es un campo obligatorio");
            $("#txtFechaPreventa").focus();
            return;
        }

        if (oCampana.FechaInicioPedidoAnsi == '') {
            alerta("Ingrese 'Fecha Inicio Pedido', es un campo obligatorio");
            $("#txtFechaInicioPedido").focus();
            return;
        }
        if (oCampana.FechaInicioEntregaAnsi == '') {
            alerta("Ingrese 'Fecha Inicio Entrega', es un campo obligatorio");
            $("#txtFechaInicioEntrega").focus();
            return;
        }

        if (oCampana.MOV_CAM_CampanaConfiguracion.CancelarPedido) {
            if (oCampana.MOV_CAM_CampanaConfiguracion.CancelarPedidoDiasMax == "0") {
                alerta("Ingrese el número de días máximos para cancelar un pedido, es un campo obligatorio");
                $("#txtCancelarPedidoDiasMax").focus();
                return;
            }
            //if (oCampana.MOV_CAM_CampanaConfiguracion.CancelarPedidoDiasMaxFin == "0") {
            //    alerta("Ingrese el número de días máximos para cancelar un pedido antes del fin de campaña, es un campo obligatorio");
            //    $("#txtCancelarPedidoDiasMaxFin").focus();
            //    return;
            //}
        }


        //        if (oCampana.MOV_CAM_CampanaConfiguracion.ReservarProducto) {
        //            if (oCampana.MOV_CAM_CampanaConfiguracion.ReservarProductoDiasMax == "0") {
        //                alerta("Ingrese el número de días máximos que se reservara un producto, es un campo obligatorio");
        //                $("#txtReservarProductoDiasMax").focus();
        //                return;
        //            }
        //            if (oCampana.MOV_CAM_CampanaConfiguracion.ReservarProductoDiasMaxFin == "0") {
        //                alerta("Ingrese el número de días máximos que se podra reservar un producto antes del fin de campaña, es un campo obligatorio");
        //                $("#txtReservarProductoDiasMaxFin").focus();
        //                return;
        //            }
        //        }

        if (oCampana.MOV_CAM_CampanaConfiguracion.DiasRecojo == '0') {
            alerta("Ingrese el número de días que iniciara el despacho despues de iniciada la campaña");
            $("#txtReservarProductoDiasMaxFin").focus();
            return;
        }

        if (oCampana.MOV_CAM_CampanaConfiguracion.DiasAntiguedad == '0') {
            alerta("Ingrese el número de días de antiguedad");
            $("#txtDiasAntiguedad").focus();
            return;
        }

        if (oCampana.MOV_CAM_CampanaConfiguracion.CantidadPedidosxDia == '0') {
            alerta("Ingrese la cantidad de pedidos por dias a despachar, es un campo obligatorio");
            $("#txtCantidadPedidosxDia").focus();
            return;
        }

        if ($("#chkPreventaNotificacionAntesInicio").is(":checked") && oCampana.PreventaNotificacionAntesInicio == '') {
            alerta("Ingrese cuantos días antes del inicio de la campaña se notificara el inicio del mismo, es un campo obligatorio");
            $("#txtPreventaNotificacionAntesInicio").focus();
            return;
        }



        if (esEdicion) { //pestaña activa solo en edicion

            var vcBanner = $("#ifBanner")[0].contentWindow.fnGuardar();
            if (vcBanner == "1") {
                alerta('Por favor verifique los datos ingresados');
                $("#tbExtras").tabs('option', 'selected', 2);
                $("#tabExtras").tabs('option', 'selected', 1);
                return;
            } else if (vcBanner == "2") {
                alerta('Por favor debe ingresar un operador');
                $("#tbExtras").tabs('option', 'selected', 2);
                $("#tabExtras").tabs('option', 'selected', 1);
                return;
                //} else if (vcBanner == "3") {
                //    alerta("Debe agregar por lo menos un banner");
                //    $("#tbExtras").tabs('option', 'selected', 2);
                //    $("#tabExtras").tabs('option', 'selected', 2);
                //    return;
            }
        }

        if (esEdicion) {
            fnGuardarCampana(oCampana, -1);
        } else {
            $("#divConfirmClonacion").dialog({
                //title: "Clonación de datos de campana",
                title: "Clonación de datos de campaña",
                modal: true,
                resizable: false,
                width: 350,
                height: 175,
                buttons: {
                    "Si": function () {
                        $(this).dialog("close");
                        //cargar campanas 987987
                        $.ajax({
                            type: "POST",
                            url: "Cam_Mnt_Campana.aspx/MostrarCampanasAnteriores",
                            //data: "{'oCampana': '" + JSON.stringify(oCampana) + "','IdCampanaAnterior':'" + IdCampanaAnterior + "'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result) {
                                var lstCampanasAnteriores = result.d;
                                $("#ddlCampanaClonacion").html('');
                                var i;
                                for (i = 0; i < lstCampanasAnteriores.length; i++) {
                                    $("#ddlCampanaClonacion").append($("<option></option>").val(lstCampanasAnteriores[i].IdCampana).text(lstCampanasAnteriores[i].Descripcion));
                                }

                                $("#divCampanaClonacion").dialog({
                                    //title: "Clonación de datos de campana",
                                    title: "Clonación de datos de campaña",
                                    modal: true,
                                    resizable: false,
                                    width: 350,
                                    height: 175,
                                    buttons: {
                                        "Guardar y Clonar": function () {
                                            $(this).dialog("close");
                                            fnGuardarCampana(oCampana, $("#ddlCampanaClonacion").val());
                                        },
                                        "Cancelar": function () {
                                            $(this).dialog("close");
                                        }
                                    }
                                });
                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });
                    },
                    "No, solo guardar": function () {
                        $(this).dialog("close");
                        fnGuardarCampana(oCampana, 0);
                    }
                }
            });
        }
    });

    //var oColModelLugarEntrega = [
    //	        { name: 'IdLugarEntregaCampana', label: 'IdLugarEntregaCampana', hidden: true },
    //	        { name: 'IdCampana', label: 'IdCampana', width: 80, hidden: true },
    //	        { name: 'IdCentroAtencion', label: 'IdCentroAtencion', hidden: true },
    //	        { name: 'CentroAtencion', label: 'Centro Atencion', width: 80, hidden: true },
    //	        { name: 'IdOficina', label: 'IdOficina', hidden: true },
    //	        { name: 'Oficina', label: 'Oficina', width: 170 },
    //	        { name: 'Horario', label: 'Horario', width: 170 },
    //	        { name: 'CapacidadAtencion', label: 'Capacidad Atencion', width: 170, hidden: true },
    //	        { name: 'FechaRecojoInicio', label: 'Fecha Recojo Inicio', width: 170, hidden: true },
    //	        { name: 'FechaRecojoFin', label: 'Fecha Recojo Fin', width: 170, hidden: true },
    //	        { name: 'PersonaContacto', label: 'Persona Contacto', width: 170 },
    //	        { name: 'TelefonoContacto', label: 'Telefono Contacto', width: 270 },
    //	        { name: 'RepartoDirecto', label: 'Reparto Directo', width: 270 },
    //	        { name: 'TipoEnvio', label: 'Tipo Envio', width: 270 },
    //	        { name: 'IdOficinaDistribuidora', label: 'IdOficinaDistribuidora', hidden: true },
    //	        { name: 'OficinaDistribuidora', label: 'Oficina Distribuidora', width: 270 }
    //        ];
    //
    //var oColModelEleccionLugarEntrega = [
    //	        { name: 'IdOficina', label: 'IdOficina', width: 80, hidden: true },
    //	        { name: 'IdPais', label: 'IdPais', width: 80, hidden: true },
    //	        { name: 'Pais', label: 'Pais', width: 80 },
    //	        { name: 'IdCiudad', label: 'IdCiudad', width: 80, hidden: true },
    //	        { name: 'Ciudad', label: 'Ciudad', width: 150 },
    //	        { name: 'IdDistrito', label: 'IdDistrito', width: 170, hidden: true },
    //	        { name: 'Distrito', label: 'Distrito', width: 150 },
    //	        { name: 'Descripcion', label: 'Descripcion', width: 180 },
    //	        { name: 'DireccionCompleta', label: 'Direccion', width: 180 },
    //	        { name: 'Referencia', label: 'Referencia', width: 180 }
    //        ];
    //
    //var tblLugarEntrega = JQGrid("#tblLugarEntrega", "#pagerLugarEntrega", "local", oColModelLugarEntrega, 545, 130, "rowId", false, EditarLugarEntrega);
    //var tblEleccionLugarEntrega = JQGrid("#tblEleccionLugarEntrega", "", "local", oColModelEleccionLugarEntrega, 670, 320, "IdOficina", true);

    //$("#btnAgregarLugarEntrega").click(function () {
    //    MetodoWeb("Cam_Mnt_CampanaLugarEntrega.aspx/Listar", JSON.stringify({}), CargarOficina, null);
    //});

    //function EditarLugarEntrega(id) {
    //    var datos = $("#tblLugarEntrega").jqGrid('getRowData', id);
    //
    //    $("#lblOficina").html(datos.Oficina);
    //    $("#txtHorario").val(datos.Horario);
    //    $("#txtPersonaContacto").val(datos.PersonaContacto);
    //    $("#txtTelefonoContacto").val(datos.TelefonoContacto);
    //    $("#chkRepartoDirecto").val(datos.RepartoDirecto);
    //    $("#ddlTipoEnvio").val(datos.TipoEnvio);
    //    $("#ddlOficinaDistribuidora").val(datos.IdOficinaDistribuidora);
    //
    //    $("#dvEdicionLugarEntrega").dialog({
    //        title: "Editar Lugar de entrega",
    //        width: 700,
    //        height: 440,
    //        modal: true
    //    });
    //}

    //$("#btnEditarLugarEntrega").click(function () {
    //    id = $("#tblLugarEntrega").jqGrid('getGridParam', 'selrow');
    //    if (id) {
    //        EditarLugarEntrega(id);
    //    }
    //    else {
    //
    //    }
    //});
    //$("#btnQuitarLugarEntrega").click(function () {
    //    confirmacion("Se quitara este lugar de entrega de la actual campaña. ¿Desea continua?", fnQuitar, null, "");
    //});
    //
    //$("#btnAceptarEdicionLugarEntrega").click(function () {
    //    $("#tblLugarEntrega").jqGrid('setRowData', id, {
    //        'Horario': $("#txtHorario").val(),
    //        'PersonaContacto': $("#txtPersonaContacto").val(),
    //        'TelefonoContacto': $("#txtTelefonoContacto").val(),
    //        'RepartoDirecto': $("#chkRepartoDirecto").val(),
    //        'TipoEnvio': $("#ddlTipoEnvio").val(),
    //        'IdOficinaDistribuidora': $("#ddlOficinaDistribuidora").val()
    //    });
    //});

    //$("#btnAgregarSeleccion").click(function () {
    //    var idsSel = $("#tblEleccionLugarEntrega").jqGrid('getGridParam', 'selarrrow');
    //    if ($(idsSel).length > 0) {
    //        for (i in idsSel) {//Se ingresa todos los registros seleccionados
    //            var datos = $("#tblEleccionLugarEntrega").jqGrid('getRowData', idsSel[i]);
    //            $("#tblLugarEntrega").jqGrid('addRowData', datos.IdOficina, {
    //                'IdLugarEntregaCampana': -1,
    //                'IdCampana': -1,
    //                'IdCentroAtencion': -1,
    //                'CentroAtencion': '',
    //                'IdOficina': datos.IdOficina,
    //                'Oficina': datos.Descripcion,
    //                'Horario': '',
    //                'CapacidadAtencion': '',
    //                'FechaRecojoInicio': '',
    //                'FechaRecojoFin': '',
    //                'PersonaContacto': '',
    //                'TelefonoContacto': '',
    //                'RepartoDirecto': '',
    //                'TipoEnvio': '',
    //                'IdOficinaDistribuidora': -1,
    //                'OficinaDistribuidora': ''
    //            });
    //        }
    //    }
    //    else {
    //        alerta("Seleccione una oficina a agregar");
    //    }
    //});

    //function fnQuitar() {
    //    //
    //}
    //
    //function CargarOficina(lstOficina) {
    //    $("#tblEleccionLugarEntrega").jqGrid('clearGridData');
    //    if ($(lstOficina).length > 0) {
    //        for (var i = 0; i < $(lstOficina).length; i++)
    //            $("#tblEleccionLugarEntrega").jqGrid('addRowData', lstOficina[i].IdOficina, lstOficina[i]);
    //        //window.parent.CargarDialog("#dvEleccionLugarEntrega", 700, 440, "Agregar Oficina");
    //        $("#dvEleccionLugarEntrega").dialog({
    //            title: "Agregar Oficina",
    //            width: 700,
    //            height: 440,
    //            modal: true
    //        });
    //    }
    //    else {
    //        alerta("No hay datos disponibles");
    //    }
    //}

    var indiceTab = window.parent.tab.tabs("option", "selected");
    $("#btnCerrar").click(function () {
        window.parent.tab.tabs("remove", indiceTab);
    });

    $("#chkCancelarPedido").change(function () {
        $(".trCancelarPedidoDias input").val("");
        if ($(this).is(':checked')) {
            $(".trCancelarPedidoDias").show();
            $(".trCancelarPedidoDias input").first().focus();
        }
        else {
            $(".trCancelarPedidoDias").hide();
        }
    });



    $("#chkReservarProducto").change(function () {
        $(".trReservarProductoDias input").val("");
        if ($(this).is(':checked')) {
            $(".trReservarProductoDias").show();
            $(".trReservarProductoDias input").first().focus();
        }
        else {
            $(".trReservarProductoDias").hide();
        }
    });

    $("#chkGeneraCodigo").change(function () {
        $("#txtFormatoCodigo").val("");
        if ($(this).is(':checked')) {
            $("#trFormatoCodigo").show();
            $("#txtFormatoCodigo").focus();
        }
        else {
            $("#trFormatoCodigo").hide();
        }
    });

    $("#chkPreventaNotificacionAntesInicio").change(function () {
        $("#txtPreventaNotificacionAntesInicio").val("");
        if ($(this).is(':checked')) {
            $("#trPreventaNotificacionDiasAntesInicio").show();
            $("#txtPreventaNotificacionAntesInicio").focus();
        }
        else {
            $("#trPreventaNotificacionDiasAntesInicio").hide();
        }
    });
});

function dialogValor(titulo) {
    var $width;
    var $height;
    var $Pagina;
    $width = 400;
    $height = 150;
    $Pagina = 'Conf_AgregarGrupoCampana_PolSeg.aspx';
    $("#ifExcepcion").width($width - 20);
    $("#ifExcepcion").height($height - 30);
    $("#ifExcepcion").attr("src", $Pagina);

    ModalEmpleados = $("#dvExcepcion").dialog({
        title: titulo,
        width: $width,
        height: $height,
        modal: true,
        resizable: false
    });
}


//function datepickerkendoFormar(control) {
//    $(control).removeClass("ui-widget-content ui-corner-all");
//    $(control).css("padding", "0px");
//    $(control).css("margin", "0px");
//    $(control).kendoDatePicker({
//        culture: "es-ES",
//        animation: false,
//        format: "dd/MM/yyyy"
//    });
//};

//function datetimepickerkendoFormar(control) {
//    $(control).removeClass("ui-widget-content ui-corner-all");
//    $(control).css("padding", "0px");
//    $(control).css("margin", "0px");
//    $(control).kendoDateTimePicker({
//        culture: "es-ES",
//        animation: false,
//        format: "dd/MM/yyyy HH:mm:ss",
//        interval: 60
//    });
//}

function deshabilitarPreventa() {
    //$("#txtFechaPreventa").data("kendoDatePicker").enable(false);
    //$("#txtFechaPreventa").data("kendoDatePicker").value('');
    $("#txtFechaPreventa").attr("disabled", true);
    $("#txtFechaPreventa").val('');
    $("#chkPreventaNotificacionInicio").attr("disabled", true);
    $("#chkPreventaNotificacionInicio").attr("checked", false);
    $("#chkPreventaNotificacionDiario").attr("disabled", true);
    $("#chkPreventaNotificacionDiario").attr("checked", false);
    $("#chkPreventaNotificacionAntesInicio").attr("disabled", true);
    $("#chkPreventaNotificacionAntesInicio").attr("checked", false);
    $("#chkPreventaVisualizarEquipo").attr("disabled", true);
    $("#chkPreventaVisualizarEquipo").attr("checked", false);
    $("#chkPreventaPreseleccionarEquipo").attr("disabled", true);
    $("#chkPreventaPreseleccionarEquipo").attr("checked", false);
    $.uniform.update();
}

function habilitarPreventa() {
    $("#txtFechaPreventa").attr("disabled", false);
    $("#chkPreventaNotificacionInicio").attr("disabled", false);
    $("#chkPreventaNotificacionDiario").attr("disabled", false);
    $("#chkPreventaNotificacionAntesInicio").attr("disabled", false);
    $("#chkPreventaVisualizarEquipo").attr("disabled", false);
    $("#chkPreventaPreseleccionarEquipo").attr("disabled", false);
    $.uniform.update();
}

function CerroMensajeGrupo() {

}

function CerroMensaje() {
    if ($("#hdfIdCampana").val() == '') {
        //General
        $("#txtCodigo").val('');
        $("#ddlContrato").data("kendoComboBox").value(-1);
        $("#txtCodigoProveedor").val('');
        $("#txtDescripcion").val('');
        $("#txtFechaInicio").val('');
        $("#txtFechaFin").val('');
        //Acciones is(":checked");
        $("#chkMigrarContrato").attr("checked", false);
        $("#chkMigrarContrato").attr("checked", false);
        $("#chkNuevoProducto").attr("checked", false);
        $("#chkModificaProducto").attr("checked", false);
        $("#chkBajaProducto").attr("checked", false);
        $("#chkChat").attr("checked", false);
        $("#chkActivarPublicidad").attr("checked", false);
        //Preventa
        $("#chkPreventa").attr("checked", false);
        $("#txtFechaPreventa").val('');
        $("#txtFechaInicioPedido").val('');
        $("#txtFechaInicioEntrega").val('');
        $("#chkPreventaNotificacionInicio").attr("checked", false);
        $("#chkPreventaNotificacionDiario").attr("checked", false);
        $("#chkPreventaNotificacionAntesInicio").attr("checked", false);
        $("#chkPreventaVisualizarEquipo").attr("checked", false);
        $("#chkPreventaPreseleccionarEquipo").attr("checked", false);
        $("#txtHoraIniFechaInicio").val('');
        $("#txtHoraFinFechaFin").val('');
        $("#txtHoraFechaInicioPedido").val('');
        $("#txtHoraFechaInicioEntrega").val('');
        $.uniform.update();
        $("#txtCodigo").focus();
    } else {
        window.parent.ActualizarGrilla();
        var indiceTab = window.parent.tab.tabs("option", "selected");
        window.parent.tab.tabs("remove", indiceTab);
    }
}

function removerTab(idtab) {
    var Id = '#' + idtab;
    var $panel = $("#tabContenido").find(Id);
    if ($panel.length) {//En el caso que exista el tab, lo elimina
        $("#tabContenido").tabs("remove", Id);
    }
}

function fnGuardarCampana(oCampana, IdCampanaAnterior) {
    $.ajax({
        type: "POST",
        url: "Cam_Mnt_Campana.aspx/Guardar",
        data: "{'oCampana': '" + JSON.stringify(oCampana) + "','IdCampanaAnterior':'" + IdCampanaAnterior + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d == "0" && oCampana.IdCampana == "-1") {
                alerta("Ya existe una campaña en curso actualmente para este contrato");
            } else if (result.d == "-1") {
                alerta("No se ha configurado Campaña");
            } else if (result.d == "-2") {
                alerta("No se ha configurado Corte");
            } else if (result.d == "-3") {
                alerta("No se ha configurado Credito");
            } else if (result.d == "-4") {
                alerta("No se ha configurado Lugar de Entrega");
            } else if (result.d == "-5") {
                alerta("No se ha configurado SubContrato");
            } else if (result.d == "-6") {
                alerta("No se ha configurado Publicidad");
            } else if (result.d == "-7") {
                alerta("Fecha de inicio debe ser menor a la fecha fin");
            } else if (result.d == "-8") {
                alerta("Fecha de preventa debe ser menor a la fecha inicio");
            } else if (result.d == "-9") {
                alerta("Fechas no pueden coincidir con las de otras campañas");
            } else if (result.d == "-10") {
                alerta("Ya existe una campaña con el código ingresado, no pudo ser grabado el registro");
                $("#txtCodigo").focus();
            } else if (result.d == "-11") {
                alerta("Ya existe una campaña con la descripción ingresada, no pudo ser grabado el registro");
                $("#txtDescripcion").focus();
            } else if (result.d == "99") {
                alerta("Fechas no pueden coinsidir con las de otras campañas");
            } else {
                window.parent.ActualizarGrilla();
                Mensaje("<br/><h1>Campaña grabada correctamente</h1><br/>", document, CerroMensaje);
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}


function fnObtenerResumenCampana() {

    $.ajax({
        type: "POST",
        url: "Cam_Mnt_Campana.aspx/ObtenerCampanaResumen",
        data: "{'prIdCampana': '" + $("#hdfIdCampana").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d != "") {
                //window.location = "../../../Common/Controladores/DescargarArchivo.ashx?archivo=" + result.d;
                window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + result.d);

            }
            else {
                alerta("No hay registros para dicha consulta");
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}