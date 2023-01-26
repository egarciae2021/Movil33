var Periodo = "";
var MensajeLineaVacia = "Seleccione por lo menos una línea";
var dialogo;
var oTable;
var Lineas;
var selecciono;

function IngresarServicio(Servicio) {
    var indice = 0;
    var subTotal = 0;
    var Impuesto = 19;
    var Total = 0;
    var nOpcion = 0;
    //    var IGV = parseFloat($("#rpFacturaDetalle_lblIGV").html());

    var datos = $("#tbFacturaDetalles").jqGrid('getRowData');

    $(datos).each(function () {
        indice = parseInt(this.inNumIte);
    });

    //$("#tbFacturaDetalles").jqGrid('addRowData', indice + 1, { 'P_inCodDetFac': indice + 1, 'Concepto.P_inCodCon': Servicio.P_inCod, 'inNumIte': indice + 1, 'dcCan': Servicio.dcCan, 'vcDes': Servicio.vcNomRef, 'dcPreUni': parseFloat(Servicio.dcMon).toFixed(2), 'dcMon': parseFloat(parseFloat(Servicio.dcCan) * parseFloat(Servicio.dcMon)).toFixed(2) });
    $("#tbFacturaDetalles").jqGrid('addRowData', indice + 1, { 'P_inCodDetFac': indice + 1, 'P_inCodCon': Servicio.P_inCod, 'inNumIte': indice + 1, 'dcCan': Servicio.dcCan, 'vcDes': Servicio.vcNomRef, 'dcPreUni': parseFloat(Servicio.dcMon).toFixed(2), 'dcMon': parseFloat(parseFloat(Servicio.dcCan) * parseFloat(Servicio.dcMon)).toFixed(2) }); //agregado 24-09-2013 wapumayta

    //    var trlast = oTable.fnSettings().aoData[indice].nTr;
    //    $('td:last', trlast).css("text-align", "right");
    //    $($('td', trlast)[3]).css("text-align", "right");

    //    for (var i in oTable.fnSettings().aoData) {
    //        subTotal = subTotal + parseFloat(oTable.fnSettings().aoData[i]._aData[6]);
    //    }

    //    subTotal = parseFloat(subTotal);
    //    subTotal = subTotal.toFixed(2);

    //    Impuesto = parseFloat(subTotal * IGV / 100);
    //    Impuesto = Impuesto.toFixed(2);

    //    Total = parseFloat(parseFloat(subTotal) + parseFloat(Impuesto));
    //    Total = Total.toFixed(2);

    //    $("#rpFacturaDetalle_lblSubTotal").html(subTotal);
    //    $("#rpFacturaDetalle_lblImpuesto").html(Impuesto);
    //    $("#rpFacturaDetalle_lblTotal").html(Total);

    //    $("#rpFacturaDetalle_lblTotalLiteral").html(new aLiteral(Total).toString());
}
var esOpeFre = "0"; //Para listados
var timeoutHnd;
var btOpcionFrecuente = "0"; //Para grabar operación frecuente
$(function () {
    //----------------------------------Esta runtina se obtendra del servidor------------------------------------------------------------------------                
    var MensajePagina; //Este objeto vendra del servidor con el idioma usado, sera por pagina
    function mensaje(inCod, vcNom) {
        this.inCod = inCod;
        this.vcNom = vcNom;
    }
    inicioMensaje();

    function inicioMensaje() {
        MensajePagina = [];
        MensajePagina.push(new mensaje(1, 'Ingrese por lo menos una línea'));
        MensajePagina.push(new mensaje(2, 'Seleccione un operador'));
    }
    //----------------------------------------------------------------------------------------------------------------------------------------------
    var ind = -1;
    var Selecciono = false;
    var idCliente = window.parent.parent.idCliente;

    inicio();

    function inicio() {
        ActivarItemPanel(false, 1, 3);
        ActivarItemPanel(false, 2, 1);
        ActivarItemPanel(false, 2, 2);
        ActivarItemPanel(false, 2, 3);
        EstableceParametros();
    }

    function EstableceParametros() {
        $('#rpFacturaDetalle_lblMonedaSubTot').html($('#hdfMonedaSimbolo').val());
        $('#rpFacturaDetalle_lblMonedaTotLit').html($('#hdfMonedaLiteral').val());
        $('#rpFacturaDetalle_lblIGV').html($('#hdfIGV').val());
        $('#rpFacturaDetalle_lblMonedaImp').html($('#hdfMonedaSimbolo').val());
        $('#rpFacturaDetalle_lblMonedaTot').html($('#hdfMonedaSimbolo').val());
    }

    $("#imgBorrarPerIni").click(function () {
        //$("#txtFechaPeriodoI").val("");
        if (esOpeFre == "0") {
            ListarFacturas();
        } else {
            ListarOpeFre();
        }
    });

    $("#imgBorrarPerFin").click(function () {
        $("#txtFechaPeriodoF").val("");
        if (esOpeFre == "0") {
            ListarFacturas();
        } else {
            ListarOpeFre();
        }
    });

    $("#imgBorrarCreaIni").click(function () {
        $("#txtFechaCreacionI").val("");
        if (esOpeFre == "0") {
            ListarFacturas();
        } else {
            ListarOpeFre();
        }
    });

    $("#imgBorrarCreaFin").click(function () {
        $("#txtFechaCreacionF").val("");
        if (esOpeFre == "0") {
            ListarFacturas();
        } else {
            ListarOpeFre();
        }
    });

    function ActivarItemPanel(Activar, panel, item) {
        var control = "#BarraNavegacionJQ1_Panel" + panel + "_Item" + item;
        if (Activar) {
            $(control).removeAttr("disabled");
            $(control).attr("title", "");
            $(control).addClass("PanelBarraNavegacion");
            $(control).addClass("PanelBarraNavegacionItemSeleccion");
        }
        else {
            $(control).attr("disabled", "disabled");
            $(control).attr("title", "Abra el documento para realizar esta acción");
            $(control).removeClass("PanelBarraNavegacion");
            $(control).removeClass("PanelBarraNavegacionItemSeleccion");
        }
    }

    $(".btnNormal").button();

    ValidarNumeroEnCajaTexto("txtMonto", ValidarDecimalPositivo);
    ValidarNumeroEnCajaTexto("txtCantidad", ValidarEnteroPositivo);

    $(".PanelBarraNavegacion").live("mousemove", function () {
        $(this).addClass('ui-state-highlight quitarBorde');
    });
    $(".PanelBarraNavegacion").live("mouseout", function () {
        $(this).removeClass('ui-state-highlight quitarBorde');
    });

    $(".PanelBarraNavegacionItemSeleccion").live("click", function () {
        var EventoClick = $(this).attr("Click");
        eval(EventoClick)();
    });



    function NuevoFactura() {
        ActivarItemPanel(false, 1, 3);
        ActivarItemPanel(false, 2, 1);
        ActivarItemPanel(false, 2, 2);
        ActivarItemPanel(false, 2, 3);
        $('#txtFechaFacturacion').val("");
        $('#ddlOperador').val("-1");
        $("#tbFacturaDetalles").jqGrid('clearGridData');
        $("#tbEmpleados").jqGrid('clearGridData');
        $('#rpFacturaDetalle_lblSubTotal').html("0.00");
        $('#rpFacturaDetalle_lblTotalLiteral').html("Cero y 00/100");
        $('#rpFacturaDetalle_lblImpuesto').html("0.00");
        $('#rpFacturaDetalle_lblTotal').html("0.00");
        $("#dvEdicionFactura").css("display", "");
        $("#btnGuardar").css("display", "");
        $("#hdfCodFact").val(''); //agregado 25-09-2013 wapumayta
    }

    function AbrirFactura() {
        esOpeFre = "0";
        document.getElementById('dvFactruras').style.display = '';
        document.getElementById('dvOpeFre').style.display = 'none';
        ListarFacturas();
        $('#dialogBuscador').dialog({
            title: "Buscar cuenta de cobro",
            width: 810,
            height: 500,
            modal: true
        });
    }

    function OperacionesFrecuentes() {
        esOpeFre = "1";
        document.getElementById('dvOpeFre').style.display = '';
        document.getElementById('dvFactruras').style.display = 'none';
        ListarOpeFre();
        $('#dialogBuscador').dialog({
            title: "Buscar Operación Frecuente",
            width: 810,
            height: 500,
            modal: true
        });
    }

    function EliminarFactura() {
        var codFactura = $("#hdfCodFact").val();
        if (codFactura != "0" && codFactura != "") {
            $('#divMsgConfirmacion').dialog({
                title: "Eliminar pago",
                modal: true,
                buttons: {
                    "Si": function () {
                        $("#dvCargando").show();
                        $.ajax({
                            type: "POST",
                            url: "Adm_IngresarFactura.aspx/Eliminar",
                            data: "{'inCodFac': '" + codFactura + "'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result) {
                                $("#dvCargando").hide();
                                $("#hdfCodFact").val("0");
                                ActivarItemPanel(false, 1, 3);
                                ActivarItemPanel(false, 2, 1);
                                ActivarItemPanel(false, 2, 2);
                                ActivarItemPanel(false, 2, 3);
                                $("#dvEdicionFactura").css("display", "none");

                                if (result.d == "") {
                                    Mensaje("<br/><h1>Cuenta de cobro Eliminada</h1><br/>", document, CerroMensaje);
                                }
                                else {
                                    alert(result.d);
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
            alerta("No hay una cuenta de cobro abierta o creada");
        }
    }

    function VistaPreviaFactura() {
        var codFactura = $("#hdfCodFact").val();
        if (codFactura != "0" && codFactura != "") {
            ImpresionPagina(1, "Vista Previa");
        }
        else {
            alerta("No hay una cuenta de cobro abierta o creada");
        }
    }

    function ImprimirFactura() {
        var codFactura = $("#hdfCodFact").val();
        if (codFactura != "0" && codFactura != "") {
            ImpresionPagina(2, "Imprimir");
        }
        else {
            alerta("No hay una cuenta de cobro abierta o creada");
        }
    }

    function EnviarCorreo() {
        var codFactura = $("#hdfCodFact").val();
        if (codFactura != "0" && codFactura != "") {
            ImpresionPagina(3, "Enviar Correo");
        }
        else {
            alerta("No hay una cuenta de cobro abierta o creada");
        }
    }

    function ImpresionPagina(Accion, Titulo) {
        var $this = $(this);
        var $width;
        var $height;
        var $Pagina = '';

        if (Accion == 1 || Accion == 2) {
            $width = 930;
            $height = 500;
            $Pagina = 'Adm_Reporte.aspx?Tipo=1&Valor=' + $("#hdfCodFact").val() + '&SubTipo=' + Accion;
        }
        else if (Accion == 3) {
            $width = 510;
            $height = 340;
            $Pagina = '../../Common/Page/Adm_Correo.aspx?Tipo=1&Valor=' + $("#hdfCodFact").val() + '&SubTipo=' + Accion;
        }
        $("#ifImprimir").width($width - 10);
        $("#ifImprimir").height($height - 30);
        $("#ifImprimir").attr("src", $Pagina);

        if (Accion == 1 || Accion == 3) {
            dialogo = $('#dvImprimir').dialog({
                title: Titulo,
                width: $width,
                height: $height,
                modal: true,
                resizable: false
                //close: function( event, ui ) { if(Accion == 3){ NuevoFactura(); }; }
            });
        }
    }

    function CerroMensaje() {
    }

    //-------------------------------------------Grilla---------------------------------------------------modificadas 24-09-2013 wapumayta
    var tbFacturaDetalles = $("#tbFacturaDetalles").jqGrid({
        datatype: "local",
        colModel: [{ name: 'P_inCodDetFac', index: 'P_inCodDetFac', label: 'Código', hidden: true },
        //{ name: 'Concepto.P_inCodCon', index: 'Concepto.P_inCodCon', label: 'Código Concepto', hidden: false },
   		           {name: 'P_inCodCon', index: 'P_inCodCon', label: 'Código Concepto', hidden: true },
        //{ name: 'Concepto.vcNom', index: 'Concepto.vcNom', label: 'Concepto', hidden: false },
   		           {name: 'vcNom', index: 'vcNom', label: 'Concepto', hidden: true },
   		           { name: 'inNumIte', index: 'inNumIte', label: 'N°', width: '40' },
   		           { name: 'dcCan', index: 'dcCan', label: 'Cantidad', width: '60' },
   		           { name: 'vcDes', index: 'vcDes', label: 'Descripción', width: '303' },
   		           { name: 'dcPreUni', index: 'dcPreUni', label: 'Precio Unit.', width: '80', align: "right" },
   		           { name: 'dcMon', index: 'dcMon', label: 'Sub Total', width: '80', align: "right" }
   	              ],
        sortname: "P_inCodDetFac", //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: "640",
        height: "200",
        rownumbers: true,
        caption: "Detalle",
        shrinkToFit: false,
        forcefit: true,
        ondblClickRow: function (id) { EditarItem(); }
    });

    $("#tbFacturaDetalles").jqGrid('bindKeys', { "onEnter": function (id) { EditarItem(); }, "onSpace": function (id) { EditarItem(); } });

    var tbEmpleados = $("#tbEmpleados").jqGrid({
        datatype: "local",
        colModel: [{ name: 'P_vcCod', index: 'P_vcCod', label: 'Línea', width: '100' },
   		           { name: 'vcNom', index: 'vcNom', label: 'Persona', width: '242' }
   	              ],
        sortname: "P_vcCod", //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: "400",
        height: "100",
        //pager: "#pagerEmpleados", //Pager.
        //pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        //rowNum: "5", // PageSize.
        //rowList: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50], //Variable PageSize DropDownList. 
        viewrecords: true, //Show the RecordCount in the pager.
        rownumbers: true,
        caption: "Líneas",
        shrinkToFit: false,
        forcefit: true
    });

    var tbFacturas = $("#tbFacturas").jqGrid({
        datatype: "local",
        colModel: [{ name: 'P_inCodFac', index: 'P_inCodFac', label: 'inCodigo', hidden: true },
   		           { name: 'vcCodFac', index: 'vcCodFac', label: 'Código', width: '90', hidden: true },
        //{ name: 'Operador.vcNomOpe', index: 'Operador.vcNomOpe', label: 'Operador', width: '200' },
   		           {name: 'vcNomOpe', index: 'vcNomOpe', label: 'Operador', width: '200' },
   		           { name: 'vcFecFac', index: 'vcFecFac', label: 'Fecha Cuenta cobro' },
   		           { name: 'vcFecGenFac', index: 'vcFecGenFac', label: 'Fecha Creación' },
        //{ name: 'Estado.vcNom', index: 'Estado.vcNom', label: 'Estado' },
   		           {name: 'vcNom', index: 'vcNom', label: 'Estado' },
        //{ name: 'Moneda.vcNom', index: 'Moneda.vcNom', label: 'Moneda', width: '80' },
   		           {name: 'vcSimMon', index: 'vcSimMon', label: 'Moneda', width: '80' },
   		           { name: 'dcMonTot', index: 'dcMonTot', label: 'Monto Total', width: '120' }
   	              ],
        sortname: "P_inCodFac", //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: "770",
        height: "250",
        rownumbers: true,
        caption: "Cuenta de Cobro",
        ondblClickRow: function (id) { $("#btnAbrirFactura").click(); }
    });

    $("#tbFacturas").jqGrid('bindKeys', { "onEnter": function (id) { $("#btnAbrirFactura").click(); }, "onSpace": function (id) { $("#btnAbrirFactura").click(); } });

    var tbFacturas = $("#tbOpeFre").jqGrid({
        datatype: "local",
        colModel: [{ name: 'P_inCodFac', index: 'P_inCodFac', label: 'inCodigo', hidden: true },
   		           { name: 'vcCodFac', index: 'vcCodFac', label: 'Código', hidden: true },
        //{ name: 'Operador.vcNomOpe', index: 'Operador.vcNomOpe', label: 'Operador', width: '200' },
   		           {name: 'vcNomOpe', index: 'vcNomOpe', label: 'Operador', width: '180' },
   		           { name: 'vcFecFac', index: 'vcFecFac', label: 'Fecha Cuenta cobro', width: '140' },
   		           { name: 'vcFecGenFac', index: 'vcFecGenFac', label: 'Fecha Creación', width: '140' },
        //{ name: 'Estado.vcNom', index: 'Estado.vcNom', label: 'Estado' },
   		           {name: 'vcNom', index: 'vcNom', label: 'Estado', width: '75' },
        //{ name: 'Moneda.vcNom', index: 'Moneda.vcNom', label: 'Moneda', width: '80' },
   		           {name: 'vcSimMon', index: 'vcSimMon', label: 'Moneda', width: '75' },
   		           { name: 'dcMonTot', index: 'dcMonTot', label: 'Monto Total', width: '95', align: "right" }
   	              ],
        sortname: "P_inCodFac", //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: "787",
        height: "250",
        rownumbers: true,
        caption: "Operaciones Frecuentes",
        shrinkToFit: false,
        forcefit: true,
        ondblClickRow: function (id) { $("#btnAbrirFactura").click(); }
    });

    $("#tbFacturas").jqGrid('bindKeys', { "onEnter": function (id) { $("#btnAbrirFactura").click(); }, "onSpace": function (id) { $("#btnAbrirFactura").click(); } });

    $("#ddlOperadorBusqueda,#txtFechaPeriodoI,#txtFechaPeriodoF,#txtFechaCreacionI,#txtFechaCreacionF,#ddlEstado").change(function () {
        if (esOpeFre == "0") {
            ListarFacturas();
        } else {
            ListarOpeFre();
        }
    });

    $("#txtCodigoBusqueda").keyup(function () {
        if (timeoutHnd) {
            clearTimeout(timeoutHnd);
        }
        if (esOpeFre == "0") {
            timeoutHnd = setTimeout(ListarFacturas, 500);
        } else {
            timeoutHnd = setTimeout(ListarOpeFre, 500);
        }
    });
    $("#txtEmpleadoBusqueda").keyup(function () {
        if (timeoutHnd) {
            clearTimeout(timeoutHnd);
        }
        if (esOpeFre == "0") {
            timeoutHnd = setTimeout(ListarFacturas, 500);
        } else {
            timeoutHnd = setTimeout(ListarOpeFre, 500);
        }
    });

    function ListarFacturas() {
        var Codigo = $("#txtCodigoBusqueda").val();
        var Operador = $("#ddlOperadorBusqueda").val();
        var FecPerIni = $("#txtFechaPeriodoI").val();
        var FecPerFin = $("#txtFechaPeriodoF").val();
        var FecCreIni = $("#txtFechaCreacionI").val();
        var FecCreFin = $("#txtFechaCreacionF").val();
        var Empleado = $("#txtEmpleadoBusqueda").val();
        var Estado = $("#ddlEstado").val();

        $("#tbFacturas").jqGrid('clearGridData');

        $.ajax({
            type: "POST",
            url: "Adm_IngresarFactura.aspx/ListarFactura",
            data: "{'vcCodFac': '" + Codigo.replace(/'/g, "&#39") + "'," +
                    "'inCodOpe': '" + Operador + "'," +
                    "'dtFacIni': '" + FecPerIni + "'," +
                    "'dtFacFin': '" + FecPerFin + "'," +
                    "'dtCreIni': '" + FecCreIni + "'," +
                    "'dtCreFin': '" + FecCreFin + "'," +
                    "'vcNomEmp': '" + Empleado.replace(/'/g, "&#39") + "'," +
                    "'inCodEst': '" + Estado + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if ($(result.d).length > 0) {
                    var i = 0;
                    for (i = 0; i < $(result.d).length; i++) {
                        $("#tbFacturas").jqGrid('addRowData', result.d[i].P_inCodFac, result.d[i]);
                    }
                }
                else {
                    Mensaje("<br/><h1>No se encontraron registros</h1><br/>", document, CerroMensaje);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    function ListarOpeFre() {
        var Codigo = $("#txtCodigoBusqueda").val();
        var Operador = $("#ddlOperadorBusqueda").val();
        var FecPerIni = $("#txtFechaPeriodoI").val();
        var FecPerFin = $("#txtFechaPeriodoF").val();
        var FecCreIni = $("#txtFechaCreacionI").val();
        var FecCreFin = $("#txtFechaCreacionF").val();
        var Empleado = $("#txtEmpleadoBusqueda").val();
        var Estado = $("#ddlEstado").val();

        $("#tbOpeFre").jqGrid('clearGridData');

        $.ajax({
            type: "POST",
            url: "Adm_IngresarFactura.aspx/ListarOperacionFrecuente",
            data: "{'vcCodFac': '" + Codigo.replace(/'/g, "&#39") + "'," +
                    "'inCodOpe': '" + Operador + "'," +
                    "'dtFacIni': '" + FecPerIni + "'," +
                    "'dtFacFin': '" + FecPerFin + "'," +
                    "'dtCreIni': '" + FecCreIni + "'," +
                    "'dtCreFin': '" + FecCreFin + "'," +
                    "'vcNomEmp': '" + Empleado.replace(/'/g, "&#39") + "'," +
                    "'inCodEst': '" + Estado + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if ($(result.d).length > 0) {
                    var i = 0;
                    for (i = 0; i < $(result.d).length; i++) {
                        $("#tbOpeFre").jqGrid('addRowData', result.d[i].P_inCodFac, result.d[i]);
                    }
                }
                else {
                    Mensaje("<br/><h1>No se encontraron registros</h1><br/>", document, CerroMensaje);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    $("#btnAbrirFactura").click(function (event) {
        if (esOpeFre == "0") {
            var codFactura = $("#tbFacturas").jqGrid('getGridParam', 'selrow');
            if (codFactura) {
                $.ajax({
                    type: "POST",
                    url: "Adm_IngresarFactura.aspx/Mostrar",
                    data: "{'inCodFac': '" + codFactura + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        $('#lblFactura').html(result.d.vcCodFac);
                        $('#txtFechaFacturacion').val(result.d.vcFecFac);
                        $('#ddlOperador').val(result.d.Operador.P_inCodOpe);

                        $("#hdfCodFact").val(result.d.P_inCodFac);
                        $("#hdfMoneda").val(result.d.Moneda.P_inCodMon);
                        $("#hdfTipoCambio").val(result.d.dcTipCam);
                        $("#hdfIGV").val(result.d.dcIGV);
                        $("#hdfMonedaLiteral").val(result.d.Moneda.vcNomCom);
                        $("#hdfMonedaSimbolo").val(result.d.Moneda.vcSim);
                        EstableceParametros();

                        $('#rpFacturaDetalle_lblSubTotal').html(result.d.dcSubTotal.toFixed(2));
                        $('#rpFacturaDetalle_lblImpuesto').html(result.d.dcImp.toFixed(2));
                        $('#rpFacturaDetalle_lblTotal').html(result.d.dcMonTot.toFixed(2));
                        var literal = new aLiteral(result.d.dcMonTot.toFixed(2));
                        $('#rpFacturaDetalle_lblTotalLiteral').html(literal.toString());

                        $("#tbFacturaDetalles").jqGrid('clearGridData');
                        var ind = 0;
                        $.each(result.d.FacturaDetalles, function () {
                            $("#tbFacturaDetalles").jqGrid('addRowData', this.P_inCodDetFac, this);
                            //                        var trlast = oTable.fnSettings().aoData[ind].nTr;
                            //                        $('td:last', trlast).css("text-align", "right");
                            //                        $($('td', trlast)[3]).css("text-align", "right");
                            //                        ind++;
                        });

                        $("#tbEmpleados").jqGrid('clearGridData');
                        $.each(result.d.Empleados, function () {
                            $("#tbEmpleados").jqGrid('addRowData', this.P_vcCod, this);
                        });

                        $('#dialogBuscador').dialog("close");
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
                ActivarItemPanel(true, 1, 3);
                ActivarItemPanel(true, 2, 1);
                ActivarItemPanel(true, 2, 2);
                ActivarItemPanel(true, 2, 3);
                $("#dvEdicionFactura").css("display", "");

                if ($("#hdfA").val() == "1") {
                    $("#btnGuardar").css("display", "");
                    $("#btnOpcionesFrecuentes").css("display", "");
                }
                else {
                    $("#btnGuardar").css("display", "none");
                    $("#btnOpcionesFrecuentes").css("display", "none");
                }
            }
            else {
                alerta("Seleccione una cuenta de cobro");
            }
        } else {
            var codOpeFre = $("#tbOpeFre").jqGrid('getGridParam', 'selrow');
            if (codOpeFre) {
                $.ajax({
                    type: "POST",
                    url: "Adm_IngresarFactura.aspx/MostrarOperacionFrecuente",
                    data: "{'inCodOpeFre': '" + codOpeFre + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        $('#lblFactura').html(result.d.vcCodFac);
                        $('#txtFechaFacturacion').val("");
                        $('#ddlOperador').val(result.d.Operador.P_inCodOpe);

                        $("#hdfCodFact").val("0");
                        $("#hdfMoneda").val(result.d.Moneda.P_inCodMon);
                        $("#hdfTipoCambio").val(result.d.dcTipCam);
                        $("#hdfIGV").val(result.d.dcIGV);
                        $("#hdfMonedaLiteral").val(result.d.Moneda.vcNomCom);
                        $("#hdfMonedaSimbolo").val(result.d.Moneda.vcSim);
                        EstableceParametros();

                        $('#rpFacturaDetalle_lblSubTotal').html(result.d.dcSubTotal.toFixed(2));
                        $('#rpFacturaDetalle_lblImpuesto').html(result.d.dcImp.toFixed(2));
                        $('#rpFacturaDetalle_lblTotal').html(result.d.dcMonTot.toFixed(2));
                        var literal = new aLiteral(result.d.dcMonTot.toFixed(2));
                        $('#rpFacturaDetalle_lblTotalLiteral').html(literal.toString());

                        $("#tbFacturaDetalles").jqGrid('clearGridData');
                        var ind = 0;
                        $.each(result.d.FacturaDetalles, function () {
                            $("#tbFacturaDetalles").jqGrid('addRowData', this.P_inCodDetFac, this);
                            //                        var trlast = oTable.fnSettings().aoData[ind].nTr;
                            //                        $('td:last', trlast).css("text-align", "right");
                            //                        $($('td', trlast)[3]).css("text-align", "right");
                            //                        ind++;
                        });

                        $("#tbEmpleados").jqGrid('clearGridData');
                        $.each(result.d.Empleados, function () {
                            $("#tbEmpleados").jqGrid('addRowData', this.P_vcCod, this);
                        });

                        $('#dialogBuscador').dialog("close");
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
                ActivarItemPanel(true, 1, 3);
                ActivarItemPanel(true, 2, 1);
                ActivarItemPanel(true, 2, 2);
                ActivarItemPanel(true, 2, 3);
                $("#dvEdicionFactura").css("display", "");

                if ($("#hdfA").val() == "1") {
                    $("#btnGuardar").css("display", "");
                    $("#btnOpcionesFrecuentes").css("display", "");
                }
                else {
                    $("#btnGuardar").css("display", "none");
                    $("#btnOpcionesFrecuentes").css("display", "none");
                }
            }
            else {
                alerta("Seleccione una operación frecuente");
            }
        }

    });

    $("#btnCerrarFactura").click(function () {
        $('#dialogBuscador').dialog("close");
    });
    //----------------------------------------------------------------------------------------------------

    $(".txtFecha").datepicker({
        changeMonth: true,
        changeYear: true,
        closeText: 'Cerrar', // Display text for close link
        prevText: 'Ant', // Display text for previous month link
        nextText: 'Sig', // Display text for next month link
        currentText: 'Hoy', // Display text for current month link
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'], // Names of months for drop-down and formatting
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'], // For formatting
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'], // For formatting
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'], // For formatting
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'], // Column headings for days starting at Sunday
        weekHeader: 'Se', // Column header for week of the year
        dateFormat: 'dd/mm/yy' // See format options on parseDate
    });

    $("#btnOpcionesFrecuentes").click(function () {
        btOpcionFrecuente = "1";
        GuardarFactura();
    });

    $("#btnGuardar").click(function () {
        GuardarFactura();
    });

    function GuardarFactura() {
        var CodFactura = $("#hdfCodFact").val();
        var Operador = $("#ddlOperador").val();
        var FechaFacturacion = $("#txtFechaFacturacion").val();
        var SubTotal = 0; //$("#rpFacturaDetalle_lblSubTotal").html();
        //var IGV = 19; //$("#rpFacturaDetalle_lblIGV").html();
        var IGV = $("#hdfIGV").val();
        var Impuesto = 0; //$("#rpFacturaDetalle_lblImpuesto").html();
        var Total = 0; //$("#rpFacturaDetalle_lblTotal").html();
        var Moneda = $("#hdfMoneda").val();
        var TipoCambio = 2.55; //;$("#hdfTipoCambio").val();
        var FacturaDetalle = "";
        var Empleados = "";
        var datos = $("#tbFacturaDetalles").jqGrid('getRowData');

        $(datos).each(function () {
            FacturaDetalle = FacturaDetalle + parseInt(this.P_inCodDetFac) + '*';
            //FacturaDetalle = FacturaDetalle + parseInt(this["Concepto.P_inCodCon"]) + '*';
            FacturaDetalle = FacturaDetalle + parseInt(this["P_inCodCon"]) + '*'; //agregado 24-09-2013 wapumayta
            FacturaDetalle = FacturaDetalle + parseInt(this.inNumIte) + '*';
            FacturaDetalle = FacturaDetalle + parseFloat(this.dcCan) + '*';
            FacturaDetalle = FacturaDetalle + this.vcDes.replace(/'/g, "&#39") + '*';
            FacturaDetalle = FacturaDetalle + parseFloat(this.dcPreUni) + '*';
            FacturaDetalle = FacturaDetalle + parseFloat(this.dcMon) + ',';
            SubTotal += this.dcPreUni * this.dcCan;
        });
        Impuesto = SubTotal * IGV / 100;
        Total = SubTotal + Impuesto;

        var datosEmpleados = $("#tbEmpleados").jqGrid('getRowData');

        $(datosEmpleados).each(function () {
            Empleados = Empleados + this.P_vcCod + ',';
        });

        if (Operador == "-1") {
            alerta("Seleccione un operador");
            $("#ddlOperador").focus();
            return;
        }
        if (FechaFacturacion == "") {
            alerta("Ingrese una fecha");
            $("#txtFechaFacturacion").focus();
            return;
        }
        if (FacturaDetalle == "") {
            alerta("Debe ingresar como mínimo un item");
            $("#btnAgregarItem").focus();
            return;
        }
        else {
            FacturaDetalle = FacturaDetalle.substring(0, FacturaDetalle.length - 1);
        }
        if (Empleados == "") {
            alerta("Debe ingresar como mínimo un empleado");
            $("#btnAgregarEmpleado").focus();
            return;
        }
        else {
            Empleados = Empleados.substring(0, Empleados.length - 1);
        }
        $.ajax({
            type: "POST",
            url: "Adm_IngresarFactura.aspx/Guardar",
            data: "{'inCodFac': '" + CodFactura + "'," +
                   "'inCodOpe': '" + Operador + "'," +
                   "'dtFecFac': '" + FechaFacturacion + "'," +
                   "'dcSubTot': '" + SubTotal + "'," +
                   "'dcIGV': '" + IGV + "'," +
                   "'dcImp': '" + Impuesto + "'," +
                   "'dcTot': '" + Total + "'," +
                   "'inCodMon': '" + Moneda + "'," +
                   "'dcTipCam': '" + TipoCambio + "'," +
                   "'vcFacDet': '" + FacturaDetalle + "'," +
                   "'vcEmp': '" + Empleados + "'," +
                   "'btOpcFre': '" + btOpcionFrecuente + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#hdfCodPago").val(result.d.P_inCodFac);
                btOpcionFrecuente = "0";
                Mensaje("<br/><h1>Cuenta de cobro guardada</h1><br/>", document, CerroMensaje);
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
    function CerroMensaje() {
    }
    $("#btnAgregar").click(function () {
        if ($("#ddlConceptoMovil,option").length > 0) {
            ind = -1;
            $("#txtMonto").val("0.00");
            $("#txtCantidad").val("1");
            $("select#ddlConceptoMovil").prop('selectedIndex', 0);
            $("#txtDescripcion").val($('#ddlConceptoMovil option:selected').text());
            $("#ddlConceptoMovil").removeAttr('disabled');
            nOpcion = 1;
            $("#ddlConceptoMovil").show();
            $("#lblConceptoMovil").hide();
            $("#lblConceptoMovil").html("");

            $('#divItem').dialog({
                title: "Agregar detalle",
                modal: true
            });
        }
        else {
            alerta("No hay mas conceptos moviles registrados");
        }
    });

    function EditarItem() {
        ind = $("#tbFacturaDetalles").jqGrid('getGridParam', 'selrow');
        if (ind) {
            var datos = $("#tbFacturaDetalles").jqGrid('getRowData', ind);

            //$("#ddlConceptoMovil").css("display", "none");
            //            $("#ddlConceptoMovil").attr('disabled', 'disabled');
            //            $("#ddlConceptoMovil").val(datos['Concepto.P_inCodCon']);

            $("#ddlConceptoMovil").hide();
            $("#lblConceptoMovil").show();
            //$("#lblConceptoMovil").html(datos["Concepto.vcNom"]);
            $("#lblConceptoMovil").html(datos["vcNom"]);
            nOpcion = 2;
            $("#txtDescripcion").val(datos.vcDes);
            $("#txtMonto").val(datos.dcPreUni);
            $("#txtCantidad").val(datos.dcCan);

            $('#divItem').dialog({
                title: "Agregar detalle",
                modal: true
            });
        }
        else {
            alerta("Seleccione un registro");
        }
    }

    $("#btnModificar").click(function () {
        EditarItem();
    });

    $("#btnEliminar").click(function () {
        var id = $("#tbFacturaDetalles").jqGrid('getGridParam', 'selrow');
        if (id) {
            var subTotal = 0;
            var IGV = parseFloat($("#rpFacturaDetalle_lblIGV").html());
            var Impuesto = 0;
            var Total = 0;
            var totalliteral = "";
            var indice = 1;
            var datos = $("#tbFacturaDetalles").jqGrid('getRowData', id);
            //$("#ddlConceptoMovil").append("<option value=\"" + datos['Concepto.P_inCodCon'] + "\">" + datos['Concepto.vcNom'] + "</option>");
            //$("#ddlConceptoMovil").append("<option value=\"" + datos['P_inCodCon'] + "\">" + datos['vcNom'] + "</option>"); //agregado 24-09-2013 wapumayta

            $("#tbFacturaDetalles").jqGrid('delRowData', id);

            var datos = $("#tbFacturaDetalles").jqGrid('getRowData');

            $(datos).each(function () {
                $("#tbFacturaDetalles").jqGrid('setRowData', this.P_inCodDetFac, { 'inNumIte': indice });
                subTotal = subTotal + parseFloat(this.dcMon);
                indice++;
            });

            subTotal = parseFloat(subTotal);
            subTotal = subTotal.toFixed(2);

            Impuesto = parseFloat(subTotal * IGV / 100);
            Impuesto = Impuesto.toFixed(2);

            Total = parseFloat(parseFloat(subTotal) + parseFloat(Impuesto));
            Total = Total.toFixed(2);

            //            $("#rpFacturaDetalle_lblSubTotal").html(subTotal);
            //            $("#rpFacturaDetalle_lblImpuesto").html(Impuesto);
            //            $("#rpFacturaDetalle_lblTotal").html(Total);
            totalliteral = new aLiteral(Total);
            //            $("#rpFacturaDetalle_lblTotalLiteral").html(totalliteral.toString());
        }
        else {
            alerta("Seleccione un ítem");
        }
    });

    $("#btnAgregarDialog").click(function () {
        var Cantidad = parseFloat($("#txtCantidad").val());
        var PrecioUnitario = parseFloat($("#txtMonto").val());
        var PrecioTotal = (Cantidad * PrecioUnitario);
        var subTotal = 0;
        var IGV = parseFloat($("#rpFacturaDetalle_lblIGV").html());
        var Impuesto = 0;
        var Total = 0;
        var datos = "";
        if ($("#txtMonto").val().substring(0, 1) == "0") {
            alerta("Ingrese un Monto válido - No se Permite que el Monto inicie con cero");
            $("#txtMonto").focus();
            return;
        }

        if ($('#ddlConceptoMovil option:selected').text() == "") {
            alerta("Ingrese un Concepto Movil valido");
            return;
        }

        if ($("#txtMonto").val().indexOf('.') == -1) {
            if ($("#txtMonto").val().length.toString() > 8) {
                alerta("El monto debe tener como máximo 8 digitos enteros y 2 decimales");
                return;
            }
        } else {
            if ($("#txtMonto").val().indexOf('.') > 8) {
                alerta("El monto debe tener como máximo 8 digitos enteros y 2 decimales.");
                return;
            }
        }

        if ($("#txtCantidad").val().substring(0, 1) == "0") {
            alerta("Ingrese una Cantidad válido - No se Permite que el Monto inicie con cero");
            $("#txtCantidad").focus();
            return;
        }

        datos = $("#tbFacturaDetalles").jqGrid('getRowData');
        var contError = 0;
        $(datos).each(function () {
            //if (parseInt(this["Concepto.P_inCodCon"]) == $('#ddlConceptoMovil option:selected').val()) {
            if (parseInt(this["P_inCodCon"]) == $('#ddlConceptoMovil option:selected').val()) { //agregado 24-09-2013 wapumayta
                contError += 1;
            }
        });

        //OPCION DE AGREGAR ITEM AL DETALLE
        if (nOpcion == 1) {
            if (contError == 0) {
                if (ind == -1) {
                    var indice = 0;
                    var datos = $("#tbFacturaDetalles").jqGrid('getRowData');

                    indice = $(datos).length;
                    //$("#tbFacturaDetalles").jqGrid('addRowData', indice + 1, { 'P_inCodDetFac': indice + 1, 'Concepto.P_inCodCon': $("#ddlConceptoMovil").val(), 'Concepto.vcNom': $('#ddlConceptoMovil option:selected').text(), 'inNumIte': indice + 1, 'dcCan': Cantidad, 'vcDes': $("#txtDescripcion").val(), 'dcPreUni': PrecioUnitario.toFixed(2), 'dcMon': PrecioTotal.toFixed(2) });
                    $("#tbFacturaDetalles").jqGrid('addRowData', indice + 1, { 'P_inCodDetFac': indice + 1, 'P_inCodCon': $("#ddlConceptoMovil").val(), 'vcNom': $('#ddlConceptoMovil option:selected').text(), 'inNumIte': indice + 1, 'dcCan': Cantidad, 'vcDes': $("#txtDescripcion").val(), 'dcPreUni': PrecioUnitario.toFixed(2), 'dcMon': PrecioTotal.toFixed(2) }); //agregado 24-09-2013 wapumayta
                }
                else {
                    $("#tbFacturaDetalles").jqGrid('setRowData', ind, { 'dcCan': Cantidad, 'vcDes': $("#txtDescripcion").val(), 'dcPreUni': PrecioUnitario.toFixed(2), 'dcMon': PrecioTotal.toFixed(2) });
                }
            } else {
                alerta("El Concepto Movil ya ha sido Agregado");
                $("#ddlConceptoMovil").focus();
                return;
            }
        }

        //OPCION DE MODIFICAR ITEM DEL DETALLE
        if (nOpcion == 2) {
            if (ind == -1) {
                var indice = 0;
                var datos = $("#tbFacturaDetalles").jqGrid('getRowData');

                indice = $(datos).length;
                //$("#tbFacturaDetalles").jqGrid('addRowData', indice + 1, { 'P_inCodDetFac': indice + 1, 'Concepto.P_inCodCon': $("#ddlConceptoMovil").val(), 'Concepto.vcNom': $('#ddlConceptoMovil option:selected').text(), 'inNumIte': indice + 1, 'dcCan': Cantidad, 'vcDes': $("#txtDescripcion").val(), 'dcPreUni': PrecioUnitario.toFixed(2), 'dcMon': PrecioTotal.toFixed(2) });
                $("#tbFacturaDetalles").jqGrid('addRowData', indice + 1, { 'P_inCodDetFac': indice + 1, 'P_inCodCon': $("#ddlConceptoMovil").val(), 'vcNom': $('#ddlConceptoMovil option:selected').text(), 'inNumIte': indice + 1, 'dcCan': Cantidad, 'vcDes': $("#txtDescripcion").val(), 'dcPreUni': PrecioUnitario.toFixed(2), 'dcMon': PrecioTotal.toFixed(2) }); //agregado 24-09-2013 wapumayta
            }
            else {
                $("#tbFacturaDetalles").jqGrid('setRowData', ind, { 'dcCan': Cantidad, 'vcDes': $("#txtDescripcion").val(), 'dcPreUni': PrecioUnitario.toFixed(2), 'dcMon': PrecioTotal.toFixed(2) });
            }
        }



        $("#txtMonto").val("0.00");
        $("#txtCantidad").val("1");

        //$("#ddlConceptoMovil option:selected").remove();
        $("select#ddlConceptoMovil").prop('selectedIndex', 0);
        $("#txtDescripcion").val($('#ddlConceptoMovil option:selected').text());

        $("#txtMonto").focus();
        //alert($("select#ddlConceptoMovil").val());
        //        for (var i in oTable.fnSettings().aoData) {
        //            subTotal = subTotal + parseFloat(oTable.fnSettings().aoData[i]._aData[6]);
        //        }

        //        subTotal = parseFloat(subTotal);
        //        subTotal = subTotal.toFixed(2);

        //        Impuesto = parseFloat(subTotal * IGV / 100);
        //        Impuesto = Impuesto.toFixed(2);

        //        Total = parseFloat(parseFloat(subTotal) + parseFloat(Impuesto));
        //        Total = Total.toFixed(2);

        //        $("#rpFacturaDetalle_lblSubTotal").html(subTotal);
        //        $("#rpFacturaDetalle_lblImpuesto").html(Impuesto);
        //        $("#rpFacturaDetalle_lblTotal").html(Total);

        //        $("#rpFacturaDetalle_lblTotalLiteral").html(new aLiteral(Total).toString());

        if (ind != -1) {
            nOpcion = 0;
            $('#divItem').dialog("close");
        }
    });

    $("#btnCerrarDialog").click(function () {
        $('#divItem').dialog("close");
        nOpcion = 0;
    });

    $("#btnAgregarEmpleado").click(function () {
        if ($("#ddlOperador").val() == "-1") {
            alert(MensajePagina[1].vcNom);
            $("#ddlOperador").focus();
            return;
        }
        $("#txtEmpleado").val("");
        $("#hdfCodEmpleado").val("");
        $('#divEmpleadoDialog').dialog({
            title: "Agregar Empleado",
            modal: true
        });
    });


    $("#ddlOperador").change(function () {
        $("#tbEmpleados").jqGrid('clearGridData');
    });


    $("#btnEliminarEmpleado").click(function () {
        var id = $("#tbEmpleados").jqGrid('getGridParam', 'selrow');
        if (id) {
            $("#tbEmpleados").jqGrid('delRowData', id);
        }
        else {
            alerta("Seleccione un empleado");
        }
    });

    function TerminoAgregarEmpl() {

    }

    $("#btnAgregarDialogEmpleado").click(function () {
        if ($("#hdfCodLin").val() != "") {
            var Filas = $("#tbEmpleados").getGridParam("data");
            var Existe = false;

            $(Filas).each(function () {
                if (this.P_vcCod == $("#hdfCodLin").val()) {
                    alerta("Esta línea ya ha sido agregada");
                    Existe = true;
                    return false;
                }
            });
            if (!Existe) {
                $("#tbEmpleados").jqGrid('addRowData', $("#hdfCodLin").val(), { 'P_vcCod': $("#hdfCodLin").val(), 'vcNom': $("#hdfNomEmp").val() });

                Mensaje('<br/><h1>Línea agregada</h1><br/><h2>' + $("#hdfCodLin").val() + "</h2>", document, TerminoAgregarEmpl);
                $("#hdfCodLin").val("");
                $("#txtLinea").val("");
                $("#txtLinea").focus();
            }
        }
        else {
            alerta("Ingrese un empleado valido");
            $("#txtEmpleado").focus();
        }
    });




    $("#btnCerrarDialogEmpleado").click(function () {
        $('#divEmpleadoDialog').dialog("close");
    });

    $("#ddlConceptoMovil").change(function () {
        if ($(this).val() != "-1") {
            $.ajax({
                type: "POST",
                url: "Adm_IngresarFactura.aspx/MostrarConceptoMovil",
                data: "{'inCodConMov': '" + $(this).val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    $("#txtDescripcion").val(result.d.vcNom);
                    $("#txtMonto").val(result.d.dcMon);
                    $("#txtCantidad").val("1");
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
        else {
            $("#txtDescripcion").val($('option:selected', this).text());
            $("#txtMonto").val("0.00");
            $("#txtCantidad").val("1");
        }
    });

    $("#txtLinea").focusout(function () {
        $.ajax({
            type: "POST",
            url: "../../Common/WebService/General.asmx/ListarLinea",
            data: "{'maxFilas': '" + 200 + "'," +
                   "'vcCodLin': '" + $("#txtLinea").val().replace(/'/g, "&#39") + "'," +
                   "'inCodOpe': '" + $("#ddlOperador").val() + "'," +
                   "'idCliente': '" + idCliente + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if ($(result.d).length == 1) {
                    $("#hdfCodLin").val(result.d[0].P_vcNum);
                    $("#hdfNomEmp").val(result.d[0].Empleado.vcNom);
                    Selecciono = true;
                }
                else {
                    $("#hdfCodLin").val("");
                    $("#hdfNomEmp").val("");
                    Selecciono = false;
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

    $("#txtLinea").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "../../Common/WebService/General.asmx/ListarLinea",
                data: "{'maxFilas': '" + 200 + "'," +
                       "'vcCodLin': '" + $("#txtLinea").val().replace(/'/g, "&#39") + "'," +
                       "'inCodOpe': '" + $("#ddlOperador").val() + "'," +
                       "'idCliente': '" + idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: item.P_vcNum,
                            vcNomEmp: item.Empleado.vcNom
                        };
                    }));
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        focus: function (event, ui) {
            $("#txtLinea").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            Selecciono = true;
            $("#txtLinea").val(ui.item.label);
            $("#hdfCodLin").val(ui.item.label);
            $("#hdfNomEmp").val(ui.item.vcNomEmp);
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono) {
                $("#hdfCodLin").val("");
            }
            return false;
        },
        open: function (event, ui) {
            Selecciono = false;
            return false;
        }
    })
    .data("autocomplete")._renderItem = function (ul, item) {
        return $("<li></li>")
			.data("item.autocomplete", item)
			.append("<a>" + item.label + "=" + item.vcNomEmp + "</a>")
			.appendTo(ul);
    };

    function Salir() {
        var tab1 = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;

        var Accord = window.parent.$("#" + tab1);
        Accord.tabs("remove", Accord.tabs("option", "selected"));
    }

    if (isIE() == 6) {
        $("#btnAgregarEmpleado").css('width', '100px');
        $("#btnEliminarEmpleado").css('width', '100px');
        $("#btnImportar").css('width', '190px');
        $("#btnAgregar").css('width', '120px');
        $("#btnModificar").css('width', '150px');
        $("#btnModificar").css('width', '150px');
        $("#btnEliminar").css('width', '150px');
        $("#btnOpcionesFrecuentes").css('width', '230px');
        $("#btnOpcionesFrecuentes").css('position', 'absolute');
        $("#btnGuardar").css('width', '100px');
        $("#btnOpcionesFrecuentes").css('display', 'inline-block');
        $("#btnGuardar").css('display', 'inline-block');
        $("#btnEliminar").css('display', 'inline-block');
        $("#btnAgregarEmpleado").css('display', 'inline-block');
        $("#btnAgregarEmpleado").css('display', 'inline-block');
        $("#btnEliminarEmpleado").css('display', 'inline-block');
        $("#btnImportar").css('display', 'inline-block');
        $("#btnAgregar").css('display', 'inline-block');
        $("#btnModificar").css('display', 'inline-block');
    }

    $("#btnImportar").click(function () {
        Lineas = '';

        var datos = $("#tbEmpleados").jqGrid('getRowData');

        $(datos).each(function () {
            if (Lineas != "") {
                Lineas += ",";
            }
            Lineas = Lineas + this.P_vcCod;
        });

        if (Lineas == "") {
            alert(MensajePagina[0].vcNom);
            return;
        }
        if ($("#ddlOperador").val() == "-1") {
            alert(MensajePagina[1].vcNom);
            $("#ddlOperador").focus();
            return;
        }

        var $width = 400;
        var $height = 430;
        var Pagina = 'Adm_FacturaResumen.aspx';

        $("#ifResumen").attr("src", "Adm_FacturaResumen.aspx");

        dialogo = $("#dvResumen").dialog({
            title: "Servicios",
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
    });
});

function isIE() { //Vefiricar Version del Internet Explorer
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

function ListoEnvio() {
    NuevoFactura();
}