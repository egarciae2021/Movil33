var tipoSituacion;
var indiceTab;
var oCulturaUsuario;

function CargarNombreArchivoAdjuntoFactura(Archivo, RutaCompleta) {
    $("#hdfAdjuntoFactura").val(RutaCompleta);
    $("#LblNombreArchivoAdjunto").html(Archivo);

}

function CargarNombreArchivoAdjuntoFactura_Import(Archivo, RutaCompleta) {
    $("#hdfAdjuntoFactura").val(RutaCompleta);
    $("#LblNombreArchivoAdjunto_Import").html(Archivo);
}


function CargarNombreArchivo(Archivo, RutaCompleta) {
    $("#hdfArchivo").val(Archivo);
    $("#hdfRutaCompleta").val(RutaCompleta);
    $("#lblArchivoCargado").html(Archivo);

    var Metodo = raiz("P_Movil/Administrar/Cam_DespachoOperador.aspx/CargarArchivo");
    var LineaTipo = $("#ddlLineaTipo").val();
    var vcOrdenServicio = $("#TxtOrdenServicio_Import").val();
    var vcNumeroFactura = $("#TxtNumeroFactura_Import").val();
    var dvFechaFactura = $("#TxtFechaFactura_Import").val();
    var dcMontoFactura = $("#TxtMontoFactura_Import").val();

    //if (vcOrdenServicio == '') {
    //    alerta('Ingrese la Orden de Servicio');
    //    $("#TxtOrdenServicio_Import").focus();
    //    $("#LblNombreArchivoAdjunto").html("");
    //    return;
    //}

    //if (vcNumeroFactura == '') {
    //    alerta('Ingrese el Numero de Factura');
    //    $("#TxtNumeroFactura_Import").focus();
    //    $("#LblNombreArchivoAdjunto").html("");
    //    return;
    //}

    //if (dvFechaFactura == '') {
    //    alerta('Ingrese la fecha de Factura');
    //    $("#TxtFechaFactura_Import").focus();
    //    $("#LblNombreArchivoAdjunto").html("");
    //    return;
    //}

    //if (dcMontoFactura == '') {
    //    alerta('Ingrese el Monto de Factura');
    //    $("#TxtMontoFactura_Import").focus();
    //    $("#LblNombreArchivoAdjunto").html("");
    //    return;
    //}

    var Campana = LineaTipo == "1" ? "-1" : $("#ddlCampana").val();
    var Data = {
        Operador: $("#ddlOperador").val(), //Serializa JSON MODELO
        Campana: Campana, //Serializa JSON MODELO
        //Situacion: $("#ddlSituacion").val(), //Serializa JSON MODELO
        Situacion: DefinirSituacion(''), //Serializa JSON MODELO
        pruta: RutaCompleta, //Serializa JSON MODELO
        LineaTipo: LineaTipo //Serializa JSON MODELO
    };

    cargarIngreso = true;

    $.ajax({
        type: "POST",
        url: "Cam_DespachoOperador.aspx/CargarArchivo",
        data: "{'Operador': '" + $("#ddlOperador").val() + "'," +
            "'Campana':'" + Campana + "'," +
            "'Situacion':'" + DefinirSituacion('') + "'," +
            "'pruta':'" + RutaCompleta + "'," +
            "'vcOrdenServicio':'" + vcOrdenServicio+ "'," +
            "'vcNumeroFac':'" + vcNumeroFactura+ "'," +
            "'dvFechaFac':'" + dvFechaFactura + "'," +
            "'dcMontoFac':'" + dcMontoFactura + "'," +
            "'nomArch':'" + $("#hdfAdjuntoFactura").val() + "'," +
            "'LineaTipo':'" + LineaTipo + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            SatisfactoriaCargarArchivo(result.d);
            window.parent.ActualizarGrilla();
            HabilitarCerrar(false);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function HabilitarCerrar(Habilitar) {
    //window.parent.tabOpciones.tabs("remove", window.parent.tabOpciones.tabs("option", "selected"));

    //            var tab1 = window.parent.TabDetalle[window.parent.tab.tabs("option", "selected")].id;
    //            var Accord = window.parent.$("#" + tab1);
    //            if (Habilitar) {
    //                $(".ui-icon-close", window.parent.$("#" + tab1 + " li")[Accord.tabs("option", "selected")]).show();
    //                $("[alt='" + tab1 + ",Móvil']", window.parent.$("#" + tab1)).show();
    //            }
    //            else {
    //                $(".ui-icon-close", window.parent.$("#" + tab1 + " li")[Accord.tabs("option", "selected")]).hide();
    //                $("[alt='" + tab1 + ",Móvil']", window.parent.$("#" + tab1)).hide();
    //            }

    //            var tab1 = window.parent.tabschild[window.parent.TabDetalle.tabs("option", "selected")].id;
    //            var Accord = window.parent.$("#" + tab1);
    //            if (Habilitar) {
    //                $(".ui-icon-close", window.parent.$("#" + tab1 + " li")[Accord.tabs("option", "selected")]).show();
    //                $("[alt='" + tab1 + ",Móvil']", window.parent.$("#" + tab1)).show();
    //            }
    //            else {
    //                $(".ui-icon-close", window.parent.$("#" + tab1 + " li")[Accord.tabs("option", "selected")]).hide();
    //                $("[alt='" + tab1 + ",Móvil']", window.parent.$("#" + tab1)).hide();
    //            }
}

function SatisfactoriaCargarArchivo(result) {
    //alert(cargarIngreso + ", \n" + $("#tblCargaDespacho").getGridParam("rowNum") + ", " + $("#tblCargaDespacho").getGridParam("page"));
    if (result.page == undefined) {
        regNoProcesados = result;
    }
    if (!cargarIngreso) {
        regNoProcesados = 0;
        return;
    }
    //alert(regNoProcesados);
    $("#lblMsgResultado").html('');
    if ($("input[name='rblTipoIngreso']:checked").val() == "I") {
        $("# btnExportar").show();
        var Metodo = raiz("P_Movil/Administrar/Cam_DespachoOperador.aspx/ListarCarga");
        var Data = {
            inPagTam: $("#tblCargaDespacho").getGridParam("rowNum"), //Serializa JSON MODELO
            inPagAct: $("#tblCargaDespacho").getGridParam("page") //Serializa JSON MODELO
        };
        MetodoWeb(Metodo, JSON.stringify(Data), SatisfactoriaListarCarga);
        
        if (regNoProcesados == '-1') {
            $("#dvMsgResultado").show();
            $("#lblMsgResultado").text("Se ha producido un error durante la importación.");
        } else if (regNoProcesados == "0") {
            $("#dvExportarNoProcesados").hide();
            $("#dvMsgResultado").hide();
            $("#lblMsgResultado").text("");
        } else {
            $("#dvExportarNoProcesados").show();
            $("#dvMsgResultado").show();
            $("#lblMsgResultado").text("No se procesaron " + regNoProcesados + " registros.");
        }
        //if (result == 'true' || result == 'True') {
        //if (result) {
        //    var Metodo = raiz("P_Movil/Administrar/Cam_DespachoOperador.aspx/ListarCarga");
        //    var Data = {
        //        inPagTam: $("#tblCargaDespacho").getGridParam("rowNum"), //Serializa JSON MODELO
        //        inPagAct: $("#tblCargaDespacho").getGridParam("page") //Serializa JSON MODELO
        //    };
        //    MetodoWeb(Metodo, JSON.stringify(Data), SatisfactoriaListarCarga);
        //} else if (!result) {
        //    $("#dvExportarNoProcesados").show();       
        //}
    } else {
        if (result == '') {
            //if (result != '0') {
            if ($('#chkEsRenovacion').is(':checked')) EsRenovacion = "SI"; else EsRenovacion = "NO";

            var biEsRenovacion = "False";
            if (EsRenovacion == "SI")
                biEsRenovacion = "True";

            $("#tblCargaDespacho").jqGrid('addRowData', $("#txtLinea").val(), {
                Linea: $("#txtLinea").val(),
                IdModeloDispositivo: $("#hdfCodModeloDispositivo").val(),
                ModeloDispositivo: $("#txtModeloDispositivo").val(),
                //IncluyeSIMCard: biIncluyeSIMCard,
                EsRenovacion: biEsRenovacion,
                IMEI: $("#txtIMEI").val(),
                //SerieSIMCard: $("#txtSerieSIMCard").val(),
                NroCuenta: $("#ddlCuenta").val() == "-1" ? '' : $("#ddlCuenta").val(),
                Estado: $("#txtEstado").val(),
                Guia: $("#txtGuia").val(),
                Observacion: $("#txtObservacion").val(),
                FecIniContrato: $("#txtFecIniContrato").val(),
                MesesContrato: $("#ddlMesesContrato").val() == "-1" ? '' : $("#ddlMesesContrato").val(),
                //IdPlanLinea: $("#ddlPlan").val(),
                IdPlanLinea: '',
                //PlanLinea: $('#ddlPlan option[Value="' + $("#ddlPlan").val() + '"]').text()
                PlanLinea: '',
                DescripcionModelo: $("#TxtDescripcion").val(),
                Serie: $("#TxtSerie").val()
            });
            LimpiarIngresoManual();
        } else {
            $("#dvMsgResultado").show();
            $("#lblMsgResultado").html(result);
        }
    }
    HabilitarCerrar(true);
}

function SatisfactoriaListarCarga(ListaCarga) {
    if (ListaCarga != "") {
        $("#tblCargaDespacho")[0].addJSONData(ListaCarga);
    }
}

//var arSituacion = ["Todos","Nuevo","Renovación"];
function DefinirSituacion(EsRenov) {
    var result = "Todos";
    if (EsRenov == '') {
        result = "Todos";
    } else if (EsRenov == 'SI') {
        //result = "Renovación";
        result = tipoSituacion;
    } else if (EsRenov == 'NO') {
        result = "Nuevo";
    }
    return result;
}

function LimpiarIngresoManual() {
    $("#txtLinea").val("");
    $("#hdfCodModeloDispositivo").val("");
    $("#txtModeloDispositivo").val("");
    //$("#chkIncluyeSIMCard").attr('checked', false);
    $("#chkEsRenovacion").attr("checked", false);
    $("#txtIMEI").val("");
    //$("#txtSerieSIMCard").val("");
    $("#ddlCuenta").val("-1");
    $("#txtEstado").val("");
    
    $("#TxtDescripcion").val("");
    
    
    $("#txtSerieSIMCard").attr('disabled', true);
    $("#txtFecIniContrato").val('');
    $("#ddlMesesContrato").val('-1');
    //$("#ddlPlan").html('');
    //$("#ddlPlan").append($("<option></option>").val('-2').text('Seleccione modelo'));
    $("#detalleReq").text("");

    $("#txtIMEI").val("");
    $("#txtIMEI").attr("disabled", false);
    $("#ddlCuenta").attr("disabled", false);
    $("#txtModeloDispositivo").attr("disabled", false);
    $("#ddlMesesContrato").attr("disabled", false);

    $("#txtObservacion").val("");
    $("#txtGuia").val("");
    $("#TxtSerie").val("");
    $("#txtOrdenServicio").val("");
    $("#hdfOrdenServicio").val("");
    $("#txtFechaFactura").val("");
    $("#TxtFechaFactura_Import").val("");
    $("#TxtNumeroFact").val("");
    $("#txtMontoFactura").val("");

    $("#txtLinea").focus();
}

function ListarCuentas() {
    $.ajax({
        type: "POST",
        url: "Cam_DespachoOperador.aspx/ListarCuentas",
        data: "{'codOpe': '" + $("#ddlOperador").val() + "'," + "'tipLin': '" + $("#ddlLineaTipo").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#ddlCuenta").html('');
            $("#ddlCuenta").append($("<option></option>").val("-1").text("Seleccione.."));
            $.each(result.d, function () {
                $("#ddlCuenta").append($("<option></option>").val(this.P_vcCod).text(this.vcNom + ' (' + this.P_vcCod + ')'));
            });
        },
        cache: false,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alerta(errorThrown);
            MostrarErrorAjax(XMLHttpRequest, textStatus, errorThrown);
        }
    });
}

var regNoProcesados = 0;
var cargarIngreso = false;

//carpeta de dominio
var CarpetaDominio = '';

$(function () {

    $('#ddlCuenta').select2();

    CarpetaDominio = window.top.$("#hdfCodigoDominio").val() != '' ? '/' + window.top.$("#hdfCodigoDominio").val() : '';
    //$("#ddlSituacion").hide();

    //meses de contrato (comentado por que validacion se hará en el procedimiento
    //$('#chkEsRenovacion').change(function () {
    //    $("#ddlMesesContrato").val("-1");
    //    if ($('#chkEsRenovacion').is(":checked")) {
    //        $("#ddlMesesContrato").attr("disabled", true);
    //    } else {
    //        $("#ddlMesesContrato").attr("disabled", false);
    //    }
    //});

    //fecha inicio contrato
    $("#txtFecIniContrato").keypress(ValidarFechaHora);
    $("#txtFechaFactura").keypress(ValidarFechaHora);
    $("#TxtFechaFactura_Import").keypress(ValidarFechaHora);
    $("#txtFecIniContrato").keydown(function (e) {
        if (e.keyCode == 8 || e.keyCode == 46) {
            return false;
        }
    });

    $("#txtFechaFactura").keydown(function (e) {
        if (e.keyCode == 8 || e.keyCode == 46) {
            return false;
        }
    });

    $("#TxtFechaFactura_Import").keydown(function (e) {
        if (e.keyCode == 8 || e.keyCode == 46) {
            return false;
        }
    });
    $("#txtFecIniContrato").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });

    $("#txtFechaFactura").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });

    $("#TxtFechaFactura_Import").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });

    var factory = 0;
    var tblCargaDespacho = null;
    //var formatoIncluyeSIMCard;
    var formatoEsRenovacion;
    indiceTab = window.parent.tab.tabs("option", "selected");

    //$("input:checkbox,input:radio,input:file").uniform();
    cargarIngreso = false;
    ListarCampos(); //comentado 13/06/2014 - wapumayta

    ValidarNumeroEnCajaTexto("txtLinea", ValidarSoloNumero);
    ValidarNumeroEnCajaTexto("txtIMEI", ValidarSoloNumero);
    $("#txtGuia").keypress(ValidarCodigoVarChar);


    oCulturaUsuario = window.parent.parent.oCulturaUsuario;

    function ListarCampos() {
        var Metodo = raiz("P_Movil/Administrar/Cam_DespachoOperador.aspx/ListarCampos");
        //var Data = {
        //    Situacion: $("#ddlSituacion").val() //Serializa JSON MODELO
        //};
        var Data = {};
        MetodoWeb(Metodo, JSON.stringify(Data), SatisfactoriaListarCampos);
    }

    $("#txtMontoFactura").focus(function () {
        var elem = $(this);
        if (elem.val() == "0") {
            elem.val('');
        }
    });
    $("#txtMontoFactura").focusout(function () {
        var elem = $(this);
        if (elem.val() == "") {
            elem.val('0');
        }
        $("#txtMontoFactura").val(FormatoNumero($("#txtMontoFactura").val(), oCulturaUsuario));
    });

    $("#TxtMontoFactura_Import").focus(function () {
        var elem = $(this);
        if (elem.val() == "0") {
            elem.val('');
        }
    });
    $("#TxtMontoFactura_Import").focusout(function () {
        var elem = $(this);
        if (elem.val() == "") {
            elem.val('0');
        }
        $("#TxtMontoFactura_Import").val(FormatoNumero($("#TxtMontoFactura_Import").val(), oCulturaUsuario));
    });

    ValidarNumeroEnCajaTexto("txtMontoFactura", ValidarDecimalPositivo, oCulturaUsuario);
    ValidarNumeroEnCajaTexto("TxtMontoFactura_Import", ValidarDecimalPositivo, oCulturaUsuario);

    function SatisfactoriaListarCampos(oColModelCargarDespacho) {
        $.each(oColModelCargarDespacho, function () {
            //if (this.name == "IncluyeSIMCard") {
            //    this.formatter = formatoIncluyeSIMCard;
            //}
            if (this.name == "EsRenovacion") {
                this.formatter = formatoEsRenovacion;
                //agregado 02/10/2014 wapumayta
                if ($("#ddlLineaTipo").val() == "1") { //staff
                    this.label = 'Es Solicitud';
                }
            }
        });

        if (tblCargaDespacho == null) {
            tblCargaDespacho = JQGrid("#tblCargaDespacho", "#dvCargaDespachoPagina", SatisfactoriaCargarArchivo, oColModelCargarDespacho, 545, 130, "rowId", false);
        }
        else {
            $("#tblCargaDespacho").GridUnload();
            tblCargaDespacho = JQGrid("#tblCargaDespacho", "#dvCargaDespachoPagina", SatisfactoriaCargarArchivo, oColModelCargarDespacho, 545, 130, "rowId", false);
        }
        Dimensionar();
    }

    formatoIncluyeSIMCard = function (value, options, rData) {
        if (value.toLowerCase() == 'true' || value == '1' || value.toLowerCase() == 'si')
            return 'Si';
        else
            return 'No';
    };

    formatoEsRenovacion = function (value, options, rData) {
        if (value.toLowerCase() == 'true' || value == '1' || value.toLowerCase() == 'si')
            return 'Si';
        else
            return 'No';
    };

    var modeloDespacho = [
             { name: 'IdDespachoOperadorDetalle', index: 'IdDespachoOperadorDetalle', label: 'IdDespachoOperadorDetalle', hidden: true, width: 70, align: 'center' },
             { name: 'IdDespachoOperador', index: 'IdDespachoOperador', label: 'IdDespachoOperador', hidden: true, width: 70, align: 'center' },
             { name: 'Linea', index: 'Linea', label: 'Línea', hidden: false, width: 70, align: 'center' },
             { name: 'IdModeloDispositivo', index: 'IdModeloDispositivo', label: 'IdModeloDispositivo', hidden: true, key: true },
   		     { name: 'ModeloDispositivo', index: 'ModeloDispositivo', label: 'Modelo Dispositivo', hidden: false, width: 150, align: 'left' },
    //{ name: 'IncluyeSIMCard', index: 'IncluyeSIMCard', label: 'Incluye SIM Card', hidden: false, width: 100, align: 'center', formatter: formatoIncluyeSIMCard },
             {name: 'IMEI', index: 'IMEI', label: 'IMEI', hidden: false, width: 110, align: 'center' },
             { name: 'DescripcionModelo', index: 'DescripcionModelo', label: 'Descripción Modelo', hidden: false, width: 200, align: 'center', align: 'left' },
    //{ name: 'SerieSIMCard', index: 'SerieSIMCard', label: 'Serie SIM Card', hidden: false, width: 110, align: 'center' },
             {name: 'Estado', index: 'Estado', label: 'Estado', hidden: true, width: 100, align: 'left' },
             { name: 'Guia', index: 'Guia', label: 'Guía', hidden: false, width: 80, align: 'right', align: 'center' },
             { name: 'Observacion', index: 'Observacion', label: 'Observación', hidden: false, width: 200, align: 'center', align: 'left' },
             { name: 'Despachado', index: 'Despachado', label: 'Despachado', hidden: true, width: 200, align: 'center', align: 'left' },
    //{ name: 'EsRenovacion', index: 'EsRenovacion', label: 'Es renovación', hidden: false, width: 100, align: 'center', formatter: formatoEsRenovacion },
             {name: 'EsRenovacion', index: 'EsRenovacion', label: $("#ddlLineaTipo").val() == "2" ? 'Es Renovación' : 'Es Solicitud', hidden: false, width: 100, align: 'center', formatter: formatoEsRenovacion }, //agregado 02/10/2014 wapumayta
             {name: 'NroCuenta', index: 'NroCuenta', label: 'Nro Cuenta', hidden: false, width: 110, align: 'center' },
             { name: 'FecIniContrato', index: 'FecIniContrato', label: 'Fec Ini Contrato', hidden: false, width: 70, align: 'left' },
             { name: 'MesesContrato', index: 'MesesContrato', label: 'Meses Contrato', hidden: false, width: 50, align: 'center' },
             { name: 'Serie', index: 'Serie', label: 'Serie', hidden: false, width: 80, align: 'center' },
             { name: 'IdPlanLinea', index: 'IdPlanLinea', label: 'IdPlanLinea', hidden: true, width: 50, align: 'left' },
             { name: 'PlanLinea', index: 'PlanLinea', label: 'Plan', hidden: true, width: 100, align: 'left' }
   	        ];

    Dimensionar();
    $(window).resize(function () {
        Dimensionar();
    });

    function Dimensionar() {
        var Ancho = $(window).width(); //743
        var Alto = $(window).height(); //553
        if (Ancho < 743)
            Ancho = 743;
        if (Alto < 553)
            Alto = 553;

        $("#tblCargaDespacho").setGridWidth(Ancho - 40);
        $("#tblCargaDespacho").setGridHeight(Alto - 375 - factory);
        $("#dvCargaManual").width(Ancho - 60);
    }

    $("#lblArchivoCargado").click(function () {
        //alert($("#hdfRutaCompleta").val());
        if ($("#lblArchivoCargado").html() != "")
            window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + $("#hdfRutaCompleta").val());
    });

    function SatisfactoriaListar(lstCampana) {
        if ($(lstCampana).length == 0) {
            $("#ddlCampana").append($("<option></option>").attr("value", "-1").text("<No hay campañas>"));
        }
        else {
            $("#ddlCampana").append($("<option></option>").attr("value", "-1").text("<Seleccionar>"));
            for (i in lstCampana) {
                $("#ddlCampana").append($("<option></option>").attr("value", lstCampana[i].IdCampana).text(lstCampana[i].Descripcion));
            }
        }
    }

    $("#rblTipoIngreso").change(function () {
        if ($("input[name='rblTipoIngreso']:checked").val() == "I") {
            $("#dvImportacion").show();
            $("#dvCargaManual").hide();
            $("#AgregarRegistro").hide();
            factory = 0;
            ListarCampos();
            cargarIngreso = false;
            $("#btnExportar").show();
        }
        else {
            $("#dvImportacion").hide();
            $("#dvCargaManual").show();
            $("#AgregarRegistro").show();
            $("#txtLinea").focus();
            $("#tblCargaDespacho").GridUnload();
            $("#btnExportar").hide();
            //agregado 02/10/2014 wapumayta
            if ($("#ddlLineaTipo").val() == '1') { //sfaff
                modeloDespacho[10].label = 'Es Solicitud';
            } else {
                modeloDespacho[10].label = 'Es Renovación';
            }

            tblCargaDespacho = JQGrid("#tblCargaDespacho", "#dvCargaDespachoPagina", "local", modeloDespacho, 545, 130, "rowId", false);
            factory = 65;
            Dimensionar();
            //cargaArchivo();
            $("#ifrmCargar").show();
        }
        $("#dvExportarNoProcesados").hide();
        $("#dvMsgResultado").hide();
        $("#lblMsgResultado").val('');
    });

    $("#btnCerrar").click(function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });

    $("#AgregarRegistro").click(function () {
        var vLineaTipo = $("#ddlLineaTipo").val();
        cargarIngreso = true;
        //var IncluyeSIMCard = false;
        //if ($('#chkIncluyeSIMCard').is(':checked')) IncluyeSIMCard = "SI"; else IncluyeSIMCard = "NO";
        var EsRenovacion = false;
        if ($('#chkEsRenovacion').is(':checked')) EsRenovacion = "SI"; else EsRenovacion = "NO";
        //alert($("#ddlPlan").val() + "; " + $('#ddlPlan option[Value="' + $("#ddlPlan").val() + '"]').text());

        if ($.trim($("#txtLinea").val()) == '' && $("#txtIMEI").val() == '') {
            alerta("No está ingresando ningún dispositivo o línea:");
            $("#txtLinea").focus();
            return;
        }
        if (!$('#chkEsRenovacion').is(':checked') && $("#txtLinea").val() != '' && $("#ddlCuenta").val() == '-1' && (vLineaTipo == 2 || vLineaTipo == 1)) {
            alerta("Ingrese la cuenta a la que pertenecerá la línea ingresada.");
            $("#ddlCuenta").focus();
            return;
        }
        //        if ($.trim($("#txtLinea").val()) != '' && $.trim($("#txtLinea").val()).length != 9) {
        //            alerta("La línea debe ser un número de 9 dígitos.");
        //            $("#txtLinea").focus();
        //            return;
        //        }
        //if ($("#txtLinea").val() != '' && $("#ddlPlan").val() == '-1') {
        //    alerta("Ingrese el plan al que pertenece la línea ingresada.");
        //    return;
        //}
        //if (!$('#chkEsRenovacion').is(':checked') && ($("#txtLinea").val() != '' || $("#txtIMEI").val() != '') && $("#ddlMesesContrato").val() == '-1' && (vLineaTipo == 2 || vLineaTipo == 1)) {
        if (($.trim($("#txtLinea").val()) != '' || $("#txtIMEI").val() != '') && $("#ddlMesesContrato").val() == '-1' && (vLineaTipo == 2 || vLineaTipo == 1)) {
            alerta("Ingrese los meses de contrato de la línea ingresada.");
            $("#ddlMesesContrato").focus();
            return;
        }

        if ($("#txtIMEI").val() == '' && $("#txtIMEI").val() != "" && $("#hdfCodModeloDispositivo").val() != '') {
            alerta('Ingrese código IMEI del dispositivo.</br></br>Si no desea ingresar un dispositivo, borre la caja de texto "Modelo Dispositivo"');
            $("#txtIMEI").focus();
            return;
        }
        //if ($("#txtIMEI").val() != '' && $("#txtIMEI").val().length != 15) {
        //    alerta("El código IMEI debe ser un número de 15 dígitos.");
        //    $("#txtIMEI").focus();
        //    return;
        //}
        if ($("#txtIMEI").val() != '' && ($("#txtIMEI").val() == ""  || $("#hdfCodModeloDispositivo").val() == '')) {
            alerta('Ingrese el modelo del dispositivo.');
            $("#txtModeloDispositivo").focus();
            return;
        }
        if ($('#chkEsRenovacion').is(':checked') && $("#txtIMEI").val() == '') {
            alerta("Ingrese un dispositivo para renovación, este dispositivo será asignado a la línea ingresada.");
            $("#txtIMEI").focus();
            return;
        }
        //alert($('#chkEsRenovacion').is(':checked') + "; " + $("#txtLinea").val() == '' + "; " + vLineaTipo == 2);
        if ($('#chkEsRenovacion').is(':checked') && $.trim($("#txtLinea").val()) == '' && vLineaTipo == 2) {
            alerta("Si está ingresando un dispositivo para renovación debe de ingresar la línea a la que estará asignado.");
            $("#txtLinea").focus();
            return;
        }
        if ($('#chkEsRenovacion').is(':checked') && $.trim($("#txtLinea").val()) == '' && vLineaTipo == 1) {
            alerta("Si está ingresando un dispositivo en respuesta a una solicitud debe de ingresar el número de línea de la solicitud.");
            $("#txtLinea").focus();
            return;
        }
        //if ($("#txtIMEI").val() != '' && !$('#chkEsRenovacion').is(':checked') && $("#ddlMesesContrato").val() == '-1') {
        //    alerta("Ingrese el tiempo del contrato de la línea");
        //    return;
        //}
        //if ($("#txtGuia").val() == '') {
        //    alerta("Ingrese el número de guía.");
        //    $("#txtGuia").focus();
        //    return;
        //}
        //if (!$('#chkEsRenovacion').is(':checked') && $("#txtFecIniContrato").val() == "" && (vLineaTipo == 2 || vLineaTipo == 1)) {
        if ($("#txtFecIniContrato").val() == "" && (vLineaTipo == 2 || vLineaTipo == 1)) {
            alerta("Ingrese la fecha de inicio de contrato.");
            $("#txtFecIniContrato").focus();
            return;
        }

        if ($("#TxtSerie").val() == "" && (vLineaTipo == 2 || vLineaTipo == 1)) {
            alerta("Ingrese la serie. ");
            $("#TxtSerie").focus();
            return;
        }

        var LineaTipo = $("#ddlLineaTipo").val();
        var Campana = LineaTipo == "1" ? "-1" : $("#ddlCampana").val();
        var Metodo = raiz("P_Movil/Administrar/Cam_DespachoOperador.aspx/AgregarRegistro");


        //$("#txtIMEI").val() != "" && $("#hdfCodModeloDispositivo").val() != ''        

        if ($.trim($("#txtModeloDispositivo").val()) == "") {
            $("#txtModeloDispositivo").val("");
            $("#hdfCodModeloDispositivo").val("-1");
        }

        var Data = {
            Operador: $("#ddlOperador").val(), //Serializa JSON MODELO
            Campana: Campana, //Serializa JSON MODELO
            //Situacion: $("#ddlSituacion").val(), //Serializa JSON MODELO
            Situacion: DefinirSituacion(EsRenovacion),
            pruta: "", //Serializa JSON MODELO
            LineaTipo: LineaTipo, //Serializa JSON MODELO
            Linea: $.trim($("#txtLinea").val()), //Serializa JSON MODELO
            IdModeloDispositivo: $("#hdfCodModeloDispositivo").val(), //Serializa JSON MODELO
            ModeloDispositivo: $("#txtModeloDispositivo").val(), //Serializa JSON MODELO
            //IncluyeSIMCard: IncluyeSIMCard, //Serializa JSON MODELO
            EsRenovacion: EsRenovacion,
            IMEI: $("#txtIMEI").val(), //Serializa JSON MODELO
            //SerieSIMCard: $("#txtSerieSIMCard").val(), //Serializa JSON MODELO
            NroCuenta: $("#ddlCuenta").val(),
            Estado: $("#txtEstado").val(), //Serializa JSON MODELO
            Estado: "", //Serializa JSON MODELO
            Guia: $("#txtGuia").val(), //Serializa JSON MODELO
            Observacion: $("#txtObservacion").val(), //Serializa JSON MODELO,
            FecIniContrato: $("#txtFecIniContrato").val(),
            MesesContrato: $("#ddlMesesContrato").val(),
            //IdPlanLinea: $("#ddlPlan").val(),
            //PlanLinea: $('#ddlPlan option[Value="' + $("#ddlPlan").val() + '"]').text()
            IdPlanLinea: '',
            PlanLinea: '',
            DescripcionModelo: $("#TxtDescripcion").val(),
            Serie: $("#TxtSerie").val(),
            NroFactura: $("#TxtNumeroFact").val(),
            FecFactura: $("#txtFechaFactura").val(),
            MonFactura: $("#txtMontoFactura").val(),
            OrdenServicio: $("#hdfOrdenServicio").val(),
            nomArch: $("#hdfAdjuntoFactura").val()
        };

        //MetodoWeb(Metodo, JSON.stringify(Data), SatisfactoriaCargarArchivo);
        //window.parent.ActualizarGrilla();

        $.ajax({
            type: "POST",
            url: "Cam_DespachoOperador.aspx/AgregarRegistro",
            data: JSON.stringify(Data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                SatisfactoriaCargarArchivo(result.d);
                window.parent.ActualizarGrilla();
            },
            cache: false,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //alerta(errorThrown);
                MostrarErrorAjax(XMLHttpRequest, textStatus, errorThrown);
            }
        });

        //var biIncluyeSIMCard = "False";
        //if (IncluyeSIMCard == "SI")
        //    biIncluyeSIMCard = "True";

        //var biEsRenovacion = "False";
        //if (EsRenovacion == "SI")
        //    biEsRenovacion = "True";
        //
        //$("#tblCargaDespacho").jqGrid('addRowData', $("#txtLinea").val(), {
        //    Linea: $("#txtLinea").val(),
        //    IdModeloDispositivo: $("#hdfCodModeloDispositivo").val(),
        //    ModeloDispositivo: $("#txtModeloDispositivo").val(),
        //    //IncluyeSIMCard: biIncluyeSIMCard,
        //    EsRenovacion: biEsRenovacion,
        //    IMEI: $("#txtIMEI").val(),
        //    //SerieSIMCard: $("#txtSerieSIMCard").val(),
        //    NroCuenta: $("#ddlCuenta").val() == "-1" ? '' : $("#ddlCuenta").val(),
        //    Estado: $("#txtEstado").val(),
        //    Guia: $("#txtGuia").val(),
        //    Observacion: $("#txtObservacion").val(),
        //    FecIniContrato: $("#txtFecIniContrato").val()
        //});
        //$("#txtLinea").val("");
        //$("#hdfCodModeloDispositivo").val("");
        //$("#txtModeloDispositivo").val("");
        ////$("#chkIncluyeSIMCard").attr('checked', false);
        //$("#chkEsRenovacion").attr("checked", false);
        //$("#txtIMEI").val("");
        ////$("#txtSerieSIMCard").val("");
        //$("#ddlCuenta").val("-1");
        //$("#txtEstado").val("");
        //$("#txtGuia").val("");
        //$("#txtObservacion").val("");
        //$("#txtLinea").focus();
        //$("#txtSerieSIMCard").attr('disabled', true);
        //$("#txtFecIniContrato").val('');
    });

    function ListarPlanesPorModelo(inCodMod) {
        if (inCodMod != '-1') {
            $.ajax({
                type: "POST",
                url: "Cam_DespachoOperador.aspx/ListarPlanesPorModelo",
                data: "{'inCodMod': '" + inCodMod + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    $("#ddlPlan").html('');
                    $("#ddlPlan").append($("<option></option>").val("-1").text("Seleccione.."));
                    $.each(result.d, function () {
                        $("#ddlPlan").append($("<option></option>").val(this.P_inCod).text(this.vcNom));
                    });
                },
                cache: false,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alerta(errorThrown);
                    MostrarErrorAjax(XMLHttpRequest, textStatus, errorThrown);
                }
            });
        } else {
            $("#ddlPlan").html('');
            $("#ddlPlan").append($("<option></option>").val('-2').text('Seleccione modelo'));
        }
    }

    $("#txtModeloDispositivo").autocomplete({
        minLength: 0,
        source: function (request, response) {
            var ListarModDispAutoc_Data = {
                maxFilas: 50,
                inTipLin: $("#ddlLineaTipo").val(),
                idCamp: $("#ddlLineaTipo").val() == "1" ? "-1" : $("#ddlCampana").val(),
                vcNomMod: $("#txtModeloDispositivo").val().replace(/\\/g, "&#92").replace(/'/g, "&#39")
            };
            $.ajax({
                type: "POST",
                //url: "../../Common/WebService/General.asmx/ListarModDispAutoc",
                url: "Cam_DespachoOperador.aspx/ListarModelos",
                //data: "{'maxFilas': '" + 100 + "'," + "'vcNomAre': '" + $("#txtModeloDispositivo").val().replace(/\\/g, "&#92").replace(/'/g, "&#39") + "'," + "'idCliente': '" + $("#hdfCodCliente").val() + "'}",
                data: JSON.stringify(ListarModDispAutoc_Data),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: $.trim(item.vcNom),
                            P_inCod: $.trim(item.P_inCod),
                            btSopLin: $.trim(item.btSopLin)
                        };
                    }));
                },
                cache: false,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alerta(errorThrown);
                    MostrarErrorAjax(XMLHttpRequest, textStatus, errorThrown);
                }
            });
        },
        focus: function (event, ui) {
            $("#txtModeloDispositivo").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            Selecciono = true;
            $("#txtModeloDispositivo").val(ui.item.label);
            $("#hdfCodModeloDispositivo").val(ui.item.P_inCod);
            //ListarPlanesPorModelo(ui.item.P_inCod);
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono) {
                $("#hdfCodModeloDispositivo").val("-1");
                $("#txtModeloDispositivo").val('');
                //ListarPlanesPorModelo('-1');
            }
            return false;
        },
        open: function (event, ui) {
            Selecciono = false;
            return false;
        }
    }).data("autocomplete")._renderItem = function (ul, item) {
        return $("<li></li>")
            		.data("item.autocomplete", item)
        //.append("<a>" + item.VCNOMORG + "<br>" + item.label + "</a>")
                    .append("<a>" + item.label + "</a>")
        //.append("<a>" + item.P_inCod + " - " + item.label + "</a>")
            		.appendTo(ul);
    };

    $("#txtOrdenServicio").autocomplete({
        minLength: 0,
        source: function (request, response) {
            var ListarModDispAutoc_Data = {
                maxFilas: 50,
                vcNomMod: $("#txtOrdenServicio").val().replace(/\\/g, "&#92").replace(/'/g, "&#39")
            };
            $.ajax({
                type: "POST",
                //url: "../../Common/WebService/General.asmx/ListarModDispAutoc",
                url: "Cam_DespachoOperador.aspx/ListarOrdenServicio",
                //data: "{'maxFilas': '" + 100 + "'," + "'vcNomAre': '" + $("#txtModeloDispositivo").val().replace(/\\/g, "&#92").replace(/'/g, "&#39") + "'," + "'idCliente': '" + $("#hdfCodCliente").val() + "'}",
                data: JSON.stringify(ListarModDispAutoc_Data),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: $.trim(item.vcNom),
                            P_inCod: $.trim(item.P_inCod),
                            btSopLin: $.trim(item.btSopLin)
                        };
                    }));
                },
                cache: false,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alerta(errorThrown);
                    MostrarErrorAjax(XMLHttpRequest, textStatus, errorThrown);
                }
            });
        },
        focus: function (event, ui) {
            $("#txtOrdenServicio").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            Selecciono = true;
            $("#txtOrdenServicio").val(ui.item.label);
            $("#hdfOrdenServicio").val(ui.item.P_inCod);
            //ListarPlanesPorModelo(ui.item.P_inCod);
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono) {
                $("#hdfOrdenServicio").val("-1");
                $("#txtOrdenServicio").val('');
                //ListarPlanesPorModelo('-1');
            }
            return false;
        },
        open: function (event, ui) {
            Selecciono = false;
            return false;
        }
    }).data("autocomplete")._renderItem = function (ul, item) {
        return $("<li></li>")
            		.data("item.autocomplete", item)
        //.append("<a>" + item.VCNOMORG + "<br>" + item.label + "</a>")
                    .append("<a>" + item.label + "</a>")
        //.append("<a>" + item.P_inCod + " - " + item.label + "</a>")
            		.appendTo(ul);
    };


    $("#TxtOrdenServicio_Import").autocomplete({
        minLength: 0,
        source: function (request, response) {
            var ListarModDispAutoc_Data = {
                maxFilas: 50,
                vcNomMod: $("#TxtOrdenServicio_Import").val().replace(/\\/g, "&#92").replace(/'/g, "&#39")
            };
            $.ajax({
                type: "POST",
                //url: "../../Common/WebService/General.asmx/ListarModDispAutoc",
                url: "Cam_DespachoOperador.aspx/ListarOrdenServicio",
                //data: "{'maxFilas': '" + 100 + "'," + "'vcNomAre': '" + $("#txtModeloDispositivo").val().replace(/\\/g, "&#92").replace(/'/g, "&#39") + "'," + "'idCliente': '" + $("#hdfCodCliente").val() + "'}",
                data: JSON.stringify(ListarModDispAutoc_Data),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: $.trim(item.vcNom),
                            P_inCod: $.trim(item.P_inCod),
                            btSopLin: $.trim(item.btSopLin)
                        };
                    }));
                },
                cache: false,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alerta(errorThrown);
                    MostrarErrorAjax(XMLHttpRequest, textStatus, errorThrown);
                }
            });
        },
        focus: function (event, ui) {
            $("#TxtOrdenServicio_Import").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            Selecciono = true;
            $("#TxtOrdenServicio_Import").val(ui.item.label);
            $("#hdfOrdenServicio").val(ui.item.P_inCod);
            //ListarPlanesPorModelo(ui.item.P_inCod);
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono) {
                $("#hdfOrdenServicio").val("-1");
                $("#TxtOrdenServicio_Import").val('');
                //ListarPlanesPorModelo('-1');
            }
            return false;
        },
        open: function (event, ui) {
            Selecciono = false;
            return false;
        }
    }).data("autocomplete")._renderItem = function (ul, item) {
        return $("<li></li>")
            		.data("item.autocomplete", item)
        //.append("<a>" + item.VCNOMORG + "<br>" + item.label + "</a>")
                    .append("<a>" + item.label + "</a>")
        //.append("<a>" + item.P_inCod + " - " + item.label + "</a>")
            		.appendTo(ul);
    };

    $("#ddlOperador").change(function () {
        if ($("#ddlOperador").val() == "-1") {
            $("#ddlCampana").html("");
            $("#ddlCampana").append($("<option></option>").attr("value", "-1").text("<Seleccionar Operador>"));
        }
        else {
            $("#ddlCampana").html("");

            var Metodo = raiz("P_Movil/Administrar/Cam_DespachoOperador.aspx/ListarCampanaPorOperador");
            var Data = {
                IdOperador: $("#ddlOperador").val() //Serializa JSON MODELO
            };
            MetodoWeb(Metodo, JSON.stringify(Data), SatisfactoriaListar);
        }
        $("#dvRecepcionEquipo").hide();
        $(".dvCampana").hide();
        $(".dvFamilia").hide();
        $("#ddlLineaTipo").val("-1");

        fnTipoLineaPerfil();
        fnDestruirLineaAutocomplete();
    });

    $("#ddlLineaTipo").change(function () {
        $("#ddlCuenta").attr("disabled", false);
        $("#chkEsRenovacion").attr("checked", false);
        fnDestruirLineaAutocomplete();
        $("#dvRecepcionEquipo").hide();
        $(".dvCampana").hide();
        $("#ddlTipoSolicitudFamilia").val("-1");
        if ($("#ddlLineaTipo").val() == "1") {//STAFF
            $(".dvFamilia").hide();
            $("#dvRecepcionEquipo").show();
            //Mostrar

            //tipo ingreso 
            $("#lblTipoIngreo_TipLin").text("Solic.");
            $("#dvInfoStaff").show();
            $("#dvInfoFamilia").hide();
            $("#chkEsRenovacion").attr("TipLin", "repar");
            $("#jqgh_tblCargaDespacho_EsRenovacion").html('');
            $("#jqgh_tblCargaDespacho_EsRenovacion").append('Es Solicitud');
        }
        else if ($("#ddlLineaTipo").val() == "2") {//FAMILIA
            $(".dvFamilia").show();
            $("#ddlTipoSolicitudFamilia").val("2");
            $("#ddlTipoSolicitudFamilia").change();

            if ($("#hdfCampanaActiva").val() != "") {
                $("#ddlCampana").val($("#hdfCampanaActiva").val());
                $("#dvRecepcionEquipo").show();
            }

            //tipo ingreso 
            $("#lblTipoIngreo_TipLin").text("Línea Existente");
            $("#dvInfoFamilia").show();
            $("#dvInfoStaff").hide();
            $("#chkEsRenovacion").attr("TipLin", "renov");
            $("#jqgh_tblCargaDespacho_EsRenovacion").html('');
            $("#jqgh_tblCargaDespacho_EsRenovacion").append('Es Renov/Porta');
        }

        //Litar Cuentas
        ListarCuentas();
    });

    $("#ddlTipoSolicitudFamilia").change(function () {
        $("#dvRecepcionEquipo").hide();
        if ($("#ddlTipoSolicitudFamilia").val() == "1") {//Solicitudes
            $(".dvCampana").hide();
            $("#dvRecepcionEquipo").show();
        }
        else if ($("#ddlTipoSolicitudFamilia").val() == "2") {//Pedidos
            $(".dvCampana").show();
        }
        $("#ddlCampana").val("-1");
    });

    $("#ddlCampana").change(function () {
        if ($("#ddlCampana").val() != "-1") {
            $("#dvRecepcionEquipo").show();
        }
        else {
            $("#dvRecepcionEquipo").hide();
        }

        //Listar Cuentas
        $.ajax({
            type: "POST",
            url: "Cam_DespachoOperador.aspx/ListarCuentas",
            data: "{'codOpe': '" + $("#ddlOperador").val() + "'," + "'tipLin': '" + $("#ddlLineaTipo").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#ddlCuenta").html('');
                $("#ddlCuenta").append($("<option></option>").val("-1").text("Seleccione.."));
                $.each(result.d, function () {
                    $("#ddlCuenta").append($("<option></option>").val(this.P_vcCod).text(this.vcNom + ' (' + this.P_vcCod + ')'));
                });
            },
            cache: false,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //alerta(errorThrown);
                MostrarErrorAjax(XMLHttpRequest, textStatus, errorThrown);
            }
        });

    });

    //$("#ddlSituacion").change(function () {
    //    ListarCampos();
    //});

    //$("#chkIncluyeSIMCard").change(function () {
    //    if ($('#chkIncluyeSIMCard').is(':checked')) {
    //        $("#txtSerieSIMCard").attr('disabled', false);
    //    } else {
    //        $("#txtSerieSIMCard").attr('disabled', true);
    //        $("#txtSerieSIMCard").val("");
    //    }
    //});

    $("#btnExportar").click(function () {
        //cargar modelos,cuentas,planes en la plantilla

        var cod_alm = $("#ddlCampana").val();
        if (cod_alm == null) cod_alm = "0";

        //alert(cod_alm);

        BloquearPagina(true);
        $.ajax({
            type: "POST",
            url: "Cam_DespachoOperador.aspx/CargarDatosExcelAlmacen",
            //data: "{'inTipLin':'" + $("#ddlLineaTipo").val() + "','codOpe':'" + $("#ddlOperador").val() + "','idCamp':'" + cod_alm + "'}",
            data: "{'pinTipLin':'" + $("#ddlLineaTipo").val() + "','pcodOpe':'" + $("#ddlOperador").val() + "','pidCamp':'" + cod_alm + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                //alert(result.d);

                if (result.d != '') {
                    var v_error = '';
                    if (result.d == '-1') {
                        v_error = "Planes";
                        alerta("No se puede exportar el archivo por que no se han cargado " + v_error + " para el tipo de línea seleccionado.");
                    } else if (result.d == '-2') {
                        v_error = "Cuentas";
                        alerta("No se puede exportar el archivo por que no se han cargado " + v_error + " para el tipo de línea seleccionado.");
                    } else if (result.d == '-3') {
                        v_error = 'Modelos';
                        alerta("No se puede exportar el archivo por que no se han cargado " + v_error + " para el tipo de línea seleccionado.");
                    }
                    else { //Para descarga el archivo .

                        //alert(raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + result.d));
                        //alert(result.d);
                        window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + result.d);
                    }

                } else {
                    //window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=P_Movil/Administrar/Plantillas" + CarpetaDominio + "/IngresoAlmacen_Plantilla.xlsx");
                    window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + result.d);
                }
                BloquearPagina(false);

                if ($("#hdfCodLinTip_X_User").val() != "0") {
                    //alert('x0');
                    $("#ddlLineaTipo").attr("disabled", "disabled");
                    $("#ddlLineaTipo").prop("disabled", true);
                }

            },
            cache: false,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //alerta(errorThrown);
                MostrarErrorAjax(XMLHttpRequest, textStatus, errorThrown);
                BloquearPagina(false);

                if ($("#hdfCodLinTip_X_User").val() != "0") {
                    //alert('x0');
                    $("#ddlLineaTipo").attr("disabled", "disabled");
                    $("#ddlLineaTipo").prop("disabled", true);
                }

            }
        });
    });

    $("#dvExportarNoProcesados").click(function () {
        BloquearPagina(true);
        $.ajax({
            type: "POST",
            url: "Cam_DespachoOperador.aspx/ExportarNoProcesados",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=Images/Temporal" + CarpetaDominio + "/" + result.d);
                BloquearPagina(false);

                if ($("#hdfCodLinTip_X_User").val() != "0") {
                    //alert('x0');
                    $("#ddlLineaTipo").attr("disabled", "disabled");
                    $("#ddlLineaTipo").prop("disabled", true);
                }

            },
            cache: false,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                BloquearPagina(false);

                if ($("#hdfCodLinTip_X_User").val() != "0") {
                    //alert('x0');
                    $("#ddlLineaTipo").attr("disabled", "disabled");
                    $("#ddlLineaTipo").prop("disabled", true);
                }
                MostrarErrorAjax(XMLHttpRequest, textStatus, errorThrown);
                //alerta(errorThrown);
            }
        });
    });

    //validacion equipo devuelto reparacion
    $("#chkEsRenovacion").change(function () {
        //if ($(this).attr("TipLin") == "repar") {
        $("#txtLinea").val("");
        if ($(this).is(":checked")) {
            fnCrearLineaAutocomplete();

        } else {
            fnDestruirLineaAutocomplete();

        }
        //}
    });


    //$("#chkMostrarDatosFac").change(function () {
    //    if ($(this).is(":checked")) {
    //        $("#trDatosFacturacion").show();
    //        $("#trAdjuntoFacturacion").show();

    //    } else {
    //        $("#trDatosFacturacion").hide();
    //        $("#trAdjuntoFacturacion").hide();

    //    }
    //    //}
    //});

    //function cargaArchivo() {

    //    var $pagina = raiz("General/Administrar/Importacion/Imp_CargarArchivo.aspx?nombArch=" + nomArch + "&ExtPer=" + $("#hdfExtPer").val());

    //    $("#ifCargarArchivo").attr("src", $pagina);
    //}


    function fnCrearLineaAutocomplete() {
        $("#txtLinea").autocomplete({
            minLength: 0,
            source: function (request, response) {
                var ListarLineas_Data = {
                    vcNumLin: $("#txtLinea").val(),
                    inTipLin: $("#ddlLineaTipo").val(),
                    inCodOpe: $("#ddlOperador").val(),
                    idCampana: $("#ddlLineaTipo").val() == "1" ? "-1" : $("#ddlCampana").val()
                };
                $.ajax({
                    type: "POST",
                    url: "Cam_DespachoOperador.aspx/ListarLineas",
                    data: JSON.stringify(ListarLineas_Data),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        response($.map(result.d, function (item) {
                            return {
                                numero: $.trim(item.P_vcNum),
                                codemp: $.trim(item.Empleado.P_vcCod),
                                nomemp: $.trim(item.Empleado.vcNom),
                                codmod: $.trim(item.Dispositivo.ModeloDispositivo.P_inCod),
                                nommod: $.trim(item.Dispositivo.ModeloDispositivo.vcNom),
                                codcue: $.trim(item.Cuenta.P_vcCod),
                                nomcue: $.trim(item.Cuenta.vcNom),
                                mescon: $.trim(item.MesesContrato),
                                codreq: $.trim(item.CCNombre),
                                nomreq: $.trim(item.CCNumero),
                                vcIMEI: $.trim(item.Dispositivo.P_vcCodIMEI)
                            };
                        }));
                    },
                    cache: false,
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        //alerta(errorThrown);
                        MostrarErrorAjax(XMLHttpRequest, textStatus, errorThrown);
                    }
                });
            },
            focus: function (event, ui) {
                $("#txtLinea").val(ui.item.numero);
                $("#detalleReq").text(ui.item.nomreq + " (" + ui.item.codreq + ") - " + ui.item.codemp + " - " + ui.item.nomemp);
                return false;
            },
            select: function (event, ui) {
                $("#txtLinea").val(ui.item.numero);
                //cuenta
                if (ui.item.nomreq == 'Portabilidad') {
                    $("#ddlCuenta").attr("disabled", false);
                } else {
                    $("#ddlCuenta").val(ui.item.codcue);
                    $("#ddlCuenta").attr("disabled", true);
                }
                //modelo
                $("#txtModeloDispositivo").val(ui.item.nommod);
                $("#txtModeloDispositivo").attr("disabled", true);
                $("#hdfCodModeloDispositivo").val(ui.item.codmod);
                //meses
                $("#ddlMesesContrato").val(ui.item.mescon);
                if (ui.item.mescon != -1) {
                    $("#ddlMesesContrato").attr("disabled", true);
                } else {
                    $("#ddlMesesContrato").attr("disabled", false);
                }
                //detalle
                $("#detalleReq").text(ui.item.nomreq + " (" + ui.item.codreq + ") - " + ui.item.codemp + " - " + ui.item.nomemp);
                tipoSituacion = ui.item.nomreq;
                //muestra imei del disipostiivo si es un reingreso de equpio reparado
                if (ui.item.vcIMEI != '') {
                    $("#txtIMEI").val(ui.item.vcIMEI);
                    $("#txtIMEI").attr("disabled", true);
                }

                return false;
            },
            change: function (event, ui) {
                if (!ui.item) {
                    $("#txtLinea").val('');
                    $("#ddlCuenta").val(-1);
                    $("#ddlCuenta").attr("disabled", false);
                    $("#txtModeloDispositivo").val("");
                    $("#txtModeloDispositivo").attr("disabled", false);
                    $("#hdfCodModeloDispositivo").val("");
                    $("#ddlMesesContrato").val(-1);
                    $("#ddlMesesContrato").attr("disabled", true);
                    $("#detalleReq").text("");

                    $("#txtIMEI").val("");
                    $("#txtIMEI").attr("disabled", false);
                }
                return false;
            },
            open: function (event, ui) {
                return false;
            }
        }).data("autocomplete")._renderItem = function (ul, item) {
            return $("<li></li>")
            		.data("item.autocomplete", item)
                    .append("<a>" + item.numero + "</a>")
            		.appendTo(ul);
        };
    }
    function fnDestruirLineaAutocomplete() {
        $("#txtLinea").autocomplete("destroy");

        $("#txtLinea").val("");
        $("#ddlCuenta").val(-1);
        $("#ddlCuenta").attr("disabled", false);
        $("#txtModeloDispositivo").attr("disabled", false);
        $("#txtModeloDispositivo").val("");
        $("#hdfCodModeloDispositivo").val("");
        $("#ddlMesesContrato").attr("disabled", false); //Modificado jcamacho  a false 2015-11-03
        $("#ddlMesesContrato").val(-1);
        $("#detalleReq").text("");

        $("#txtIMEI").val("");
        $("#txtIMEI").attr("disabled", false);
    }



    if ($("#ddlOperador option").length == 2) {
        $("#ddlOperador").prop("selectedIndex", 1);
        $("#ddlOperador").attr('disabled', true);
        $("#ddlOperador").change();
    }

    function fnTipoLineaPerfil() {
        if ($("#hdfTipoLineaPerfil").val() != '0') {
            $("#ddlLineaTipo").val($("#hdfTipoLineaPerfil").val()).change();

            //if ($("#hdfTipoLineaPerfil").val() == '2') {
            //    $("#ddlOperador").change();
            //} 
        }
    }

    $("#btnDetalleError").click(function () {
        $("#dvDetalleErrorImportacion").dialog({
            title: 'Errores en la impotación',
            width: 400,
            height: 280,
            modal: true,
            resizable: false,
            buttons: {
                Cerrar: function () {
                    $(this).dialog("close");
                }
            }
        });
    });
});
