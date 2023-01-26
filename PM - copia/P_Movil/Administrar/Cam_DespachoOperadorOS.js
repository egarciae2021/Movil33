var ListaCuentasOptions = "";
var CuentasSeleccionadas = "";
var MesesSeleccionados = "";
var tipoSituacion;
var indiceTab;
var oCulturaUsuario;
var TablaSolicitud;

function BloquearPagina(bloqueado) {
    $(".btnNormal").button("option", "disabled", bloqueado);
    if (bloqueado) {
        $("input").attr("disabled", "disabled");
        $("select").attr("disabled", "disabled");
    }
    else {
        $("input").removeAttr("disabled");
        $("select").removeAttr("disabled");
    }   
}


function CargarNombreArchivoAdjuntoFactura(Archivo, RutaCompleta) {
    $("#hdfAdjuntoFactura").val(RutaCompleta);
    $("#LblNombreArchivoAdjunto").attr("RutaDescarga", RutaCompleta);
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
            "'vcOrdenServicio':'" + vcOrdenServicio + "'," +
            "'vcNumeroFac':'" + vcNumeroFactura + "'," +
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
    //$("#txtOrdenServicio").val("");
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
            ListaCuentasOptions = "";
            $("#ddlCuenta").html('');
            $("#cboCuentaCabecera").html('');
            $("#ddlCuenta").append($("<option></option>").val("-1").text("Seleccione.."));
            $("#cboCuentaCabecera").append($("<option></option>").val("-1").text("Seleccione.."));
            $.each(result.d, function () {
                ListaCuentasOptions += ";" + this.P_vcCod + "|" + this.vcNom + " (" + this.P_vcCod + ")";
                $("#ddlCuenta").append($("<option></option>").val(this.P_vcCod).text(this.vcNom + ' (' + this.P_vcCod + ')'));
                $("#cboCuentaCabecera").append($("<option></option>").val(this.P_vcCod).text(this.vcNom + ' (' + this.P_vcCod + ')'));
            });

            if (ListaCuentasOptions.length > 0) {
                ListaCuentasOptions = ListaCuentasOptions.substring(1, ListaCuentasOptions.length);
            }
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
var esEstandar = window.top.$('#hdfEsEstandar').val();

$(function () {

    var AnchoOriginal = $(window).width();
    var AltoOriginal = $(window).height();
    $('#ddlCuenta').select2();
    $("#ddlOrdenServicio").select2();
    $("#ddlOrdenServicio").change(function () {
        CargarSolicitudes();
    });

    
    $("#LblNombreArchivoAdjunto").click(function () {
        var vURL = window.location.href.replace("P_Movil/Administrar/Cam_DespachoOperadorOS.aspx?vcTab=MOV_CAM_CampanaDespachoOperador", "");
        vURL = vURL + $("#LblNombreArchivoAdjunto").attr("RutaDescarga"); // "Images/Temporal" + CarpetaDominio + "/" + $(this).html();
        SaveToDisk(vURL, $(this).html());
    });

    //$("#imgScreen").click(function () {
    //    window.top.ScreenFull(AnchoOriginal, AltoOriginal);
    //});

    $(".DataOS").hide();

    DisenoGrilla();

    $("#btnGrabar").click(function () {
        fnGrabarManual();
    });

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
    try {
        indiceTab = window.parent.tab.tabs("option", "selected");
    } catch (e) {
    }


    //$("input:checkbox,input:radio,input:file").uniform();
    cargarIngreso = false;
    ListarCampos(); //comentado 13/06/2014 - wapumayta

    ValidarNumeroEnCajaTexto("txtLinea", ValidarSoloNumero);
    ValidarNumeroEnCajaTexto("txtIMEI", ValidarSoloNumero);
    $("#txtGuia").keypress(ValidarCodigoVarChar);

    try {
        oCulturaUsuario = window.parent.parent.oCulturaUsuario;
    } catch (e) {
    }


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
             { name: 'IMEI', index: 'IMEI', label: 'IMEI', hidden: false, width: 110, align: 'center' },
             { name: 'DescripcionModelo', index: 'DescripcionModelo', label: 'Descripción Modelo', hidden: false, width: 200, align: 'center', align: 'left' },
    //{ name: 'SerieSIMCard', index: 'SerieSIMCard', label: 'Serie SIM Card', hidden: false, width: 110, align: 'center' },
             { name: 'Estado', index: 'Estado', label: 'Estado', hidden: true, width: 100, align: 'left' },
             { name: 'Guia', index: 'Guia', label: 'Guía', hidden: false, width: 80, align: 'right', align: 'center' },
             { name: 'Observacion', index: 'Observacion', label: 'Observación', hidden: false, width: 200, align: 'center', align: 'left' },
             { name: 'Despachado', index: 'Despachado', label: 'Despachado', hidden: true, width: 200, align: 'center', align: 'left' },
    //{ name: 'EsRenovacion', index: 'EsRenovacion', label: 'Es renovación', hidden: false, width: 100, align: 'center', formatter: formatoEsRenovacion },
             { name: 'EsRenovacion', index: 'EsRenovacion', label: $("#ddlLineaTipo").val() == "2" ? 'Es Renovación' : 'Es Solicitud', hidden: false, width: 100, align: 'center', formatter: formatoEsRenovacion }, //agregado 02/10/2014 wapumayta
             { name: 'NroCuenta', index: 'NroCuenta', label: 'Nro Cuenta', hidden: false, width: 110, align: 'center' },
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

        $("#gridIngreso").setGridWidth(Ancho - 70);
        $("#gridIngreso").setGridHeight(Alto - 305);

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
            $("#btnGrabar").hide();
        }
        else {
            $("#dvImportacion").hide();
            $("#dvCargaManual").show();
            //$("#AgregarRegistro").show();
            $("#AgregarRegistro").hide();
            $("#txtLinea").focus();
            $("#tblCargaDespacho").GridUnload();
            $("#btnExportar").hide();
            $("#btnGrabar").show();
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
        if ($("#txtIMEI").val() == '' && $("#hdfCodModeloDispositivo").val() != '') {
            alerta('Ingrese código IMEI del dispositivo.</br></br>Si no desea ingresar un dispositivo, borre la caja de texto "Modelo Dispositivo"');
            $("#txtIMEI").focus();
            return;
        }
        //if ($("#txtIMEI").val() != '' && $("#txtIMEI").val().length != 15) {
        //    alerta("El código IMEI debe ser un número de 15 dígitos.");
        //    $("#txtIMEI").focus();
        //    return;
        //}
        if ($("#txtIMEI").val() != '' && $("#hdfCodModeloDispositivo").val() == '') {
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
            OrdenServicio: "", //$("#txtOrdenServicio").val()
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

    ////$("#txtModeloDispositivo").autocomplete({
    ////    minLength: 0,
    ////    source: function (request, response) {
    ////        var ListarModDispAutoc_Data = {
    ////            maxFilas: 50,
    ////            inTipLin: $("#ddlLineaTipo").val(),
    ////            idCamp: $("#ddlLineaTipo").val() == "1" ? "-1" : $("#ddlCampana").val(),
    ////            vcNomMod: $("#txtModeloDispositivo").val().replace(/\\/g, "&#92").replace(/'/g, "&#39")
    ////        };
    ////        $.ajax({
    ////            type: "POST",
    ////            //url: "../../Common/WebService/General.asmx/ListarModDispAutoc",
    ////            url: "Cam_DespachoOperador.aspx/ListarModelos",
    ////            //data: "{'maxFilas': '" + 100 + "'," + "'vcNomAre': '" + $("#txtModeloDispositivo").val().replace(/\\/g, "&#92").replace(/'/g, "&#39") + "'," + "'idCliente': '" + $("#hdfCodCliente").val() + "'}",
    ////            data: JSON.stringify(ListarModDispAutoc_Data),
    ////            contentType: "application/json; charset=utf-8",
    ////            dataType: "json",
    ////            success: function (result) {
    ////                response($.map(result.d, function (item) {
    ////                    return {
    ////                        label: $.trim(item.vcNom),
    ////                        P_inCod: $.trim(item.P_inCod),
    ////                        btSopLin: $.trim(item.btSopLin)
    ////                    };
    ////                }));
    ////            },
    ////            cache: false,
    ////            error: function (XMLHttpRequest, textStatus, errorThrown) {
    ////                //alerta(errorThrown);
    ////                MostrarErrorAjax(XMLHttpRequest, textStatus, errorThrown);
    ////            }
    ////        });
    ////    },
    ////    focus: function (event, ui) {
    ////        $("#txtModeloDispositivo").val(ui.item.label);
    ////        return false;
    ////    },
    ////    select: function (event, ui) {
    ////        Selecciono = true;
    ////        $("#txtModeloDispositivo").val(ui.item.label);
    ////        $("#hdfCodModeloDispositivo").val(ui.item.P_inCod);
    ////        //ListarPlanesPorModelo(ui.item.P_inCod);
    ////        return false;
    ////    },
    ////    change: function (event, ui) {
    ////        if (!Selecciono) {
    ////            $("#hdfCodModeloDispositivo").val("-1");
    ////            $("#txtModeloDispositivo").val('');
    ////            //ListarPlanesPorModelo('-1');
    ////        }
    ////        return false;
    ////    },
    ////    open: function (event, ui) {
    ////        Selecciono = false;
    ////        return false;
    ////    }
    ////}).data("autocomplete")._renderItem = function (ul, item) {
    ////    return $("<li></li>")
    ////        		.data("item.autocomplete", item)
    ////    //.append("<a>" + item.VCNOMORG + "<br>" + item.label + "</a>")
    ////                .append("<a>" + item.label + "</a>")
    ////    //.append("<a>" + item.P_inCod + " - " + item.label + "</a>")
    ////        		.appendTo(ul);
    ////};

    ////$("#txtOrdenServicio").autocomplete({
    ////    minLength: 0,
    ////    source: function (request, response) {
    ////        var ListarModDispAutoc_Data = {
    ////            maxFilas: 50,
    ////            vcNomMod: $("#txtOrdenServicio").val().replace(/\\/g, "&#92").replace(/'/g, "&#39")
    ////        };
    ////        $.ajax({
    ////            type: "POST",
    ////            //url: "../../Common/WebService/General.asmx/ListarModDispAutoc",
    ////            url: "Cam_DespachoOperador.aspx/ListarOrdenServicio",
    ////            //data: "{'maxFilas': '" + 100 + "'," + "'vcNomAre': '" + $("#txtModeloDispositivo").val().replace(/\\/g, "&#92").replace(/'/g, "&#39") + "'," + "'idCliente': '" + $("#hdfCodCliente").val() + "'}",
    ////            data: JSON.stringify(ListarModDispAutoc_Data),
    ////            contentType: "application/json; charset=utf-8",
    ////            dataType: "json",
    ////            success: function (result) {
    ////                response($.map(result.d, function (item) {
    ////                    return {
    ////                        label: $.trim(item.vcNom),
    ////                        P_inCod: $.trim(item.P_inCod),
    ////                        btSopLin: $.trim(item.btSopLin)
    ////                    };
    ////                }));
    ////            },
    ////            cache: false,
    ////            error: function (XMLHttpRequest, textStatus, errorThrown) {
    ////                //alerta(errorThrown);
    ////                MostrarErrorAjax(XMLHttpRequest, textStatus, errorThrown);
    ////            }
    ////        });
    ////    },
    ////    focus: function (event, ui) {
    ////        $("#txtOrdenServicio").val(ui.item.label);
    ////        return false;
    ////    },
    ////    select: function (event, ui) {
    ////        Selecciono = true;
    ////        $("#txtOrdenServicio").val(ui.item.label);
    ////        $("#hdfOrdenServicio").val(ui.item.P_inCod);
    ////        //ListarPlanesPorModelo(ui.item.P_inCod);
    ////        return false;
    ////    },
    ////    change: function (event, ui) {
    ////        if (!Selecciono) {
    ////            $("#hdfOrdenServicio").val("-1");
    ////            $("#txtOrdenServicio").val('');
    ////            //ListarPlanesPorModelo('-1');
    ////        }
    ////        return false;
    ////    },
    ////    open: function (event, ui) {
    ////        Selecciono = false;
    ////        return false;
    ////    }
    ////}).data("autocomplete")._renderItem = function (ul, item) {
    ////    return $("<li></li>")
    ////        		.data("item.autocomplete", item)
    ////    //.append("<a>" + item.VCNOMORG + "<br>" + item.label + "</a>")
    ////                .append("<a>" + item.label + "</a>")
    ////    //.append("<a>" + item.P_inCod + " - " + item.label + "</a>")
    ////        		.appendTo(ul);
    ////};


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


var ModeloColumnas_GridIngreso = [];

if (esEstandar == "1") {
    ModeloColumnas_GridIngreso = [
            { name: 'Correlativo', hidden: true, key: true },
            { name: 'Info', label: ' ', width: 20, index: 'Info', hidden: false },
            { name: 'EMPL_vcNOMEMP', label: 'Empleado', width: 150, index: 'EMPL_vcNOMEMP', hidden: false },
            {
                name: "Grilla_F_vcNumLin", label: 'Línea', index: "Grilla_F_vcNumLin", hidden: false, width: 100, formatter: function (value, options, rData) {
                    var Clase = "";
                    if (rData.Grilla_LineaBloqueado == "1") { Clase = "bloqueado"; }
                    if (Clase == "bloqueado") {
                        return value;
                    }
                    else {
                        var rowId = "'" + options.rowId + "'";
                        var P_inCodSol = $("#gridIngreso").getRowData(options.rowId).P_inCodSol;
                        if (typeof P_inCodSol === "undefined") { P_inCodSol = rData.P_inCodSol; }
                        var maxLengtLinea;
                        try {
                            maxLengtLinea = oCulturaUsuario.LongitudMaximoLinea;
                        } catch (e) {
                            maxLengtLinea = 20;
                        }
                        return '<input class="' + Clase + '" maxlength="' + maxLengtLinea + '" id="txtLinea_' + P_inCodSol + '" style="width: 98%;" value="' + value.replace("input", "") + '" onchange="javascript:fnChange_Grilla_F_vcNumLin(this,' + rowId + ');" />';
                    }

                }
            },
            { name: 'Modelo', label: 'Modelo', index: 'Modelo', width: 150, hidden: false, align: "left" },
            {
                name: 'Grilla_IMEI', label: 'IMEI', index: 'Grilla_IMEI', width: 120, hidden: false, align: "left", formatter: function (value, options, rData) {
                    var Clase = "";
                    if (rData.Grilla_IMEIBloqueado == "1") { Clase = "bloqueado"; }
                    if (Clase == "bloqueado") {
                        return value;
                    }
                    else {
                        var rowId = "'" + options.rowId + "'";
                        var P_inCodSol = $("#gridIngreso").getRowData(options.rowId).P_inCodSol;
                        if (typeof P_inCodSol === "undefined") { P_inCodSol = rData.P_inCodSol; }
                        return '<input class="' + Clase + '" maxlength="15" id="txtIMEI_' + P_inCodSol + '" style="width: 98%;" value="' + value.replace("input", "") + '" onchange="javascript:fnChange_Grilla_IMEI(this,' + rowId + ');" />';
                    }
                }
            },
            {
                name: 'MismoEquipo', label: 'Mismo Equipo', index: 'MismoEquipo', width: 50, hidden: false, align: "center", formatter: function (value, options, rData) {
                    if (rData.EstadoSolicitud == "Culminada") {
                        return "";
                    }
                    else if (rData.vcTabla == "Reparación" && rData.vcObsProcAlmacen == "Procesado Correctamente") {
                        return "";
                    }
                    else {
                        var rowId = "'" + options.rowId + "'";
                        return '<input type="checkbox" id="chkMismoEquipo_' + rData.P_inCodSol + '" IdSolicitud="' + rData.P_inCodSol + '" onchange="javascript:chkMismoEquipo_change(this);" >';
                    }

                }
            },
            {
                name: 'NuevoIMEI', label: 'Nuevo IMEI', index: 'NuevoIMEI', width: 120, hidden: false, align: "left", formatter: function (value, options, rData) {
                    if (rData.EstadoSolicitud == "Culminada") {
                        return value;
                    }
                    else if (rData.vcTabla == "Reparación" && rData.vcObsProcAlmacen == "Procesado Correctamente") {
                        return rData.IMEIAlmacen;
                    }
                    else {
                        var rowId = "'" + options.rowId + "'";
                        var P_inCodSol = $("#gridIngreso").getRowData(options.rowId).P_inCodSol;
                        if (typeof P_inCodSol === "undefined") { P_inCodSol = rData.P_inCodSol; }
                        return '<input maxlength="15" onchange="javascript:txtNuevoIMEI_change(this);" id="txtNuevoIMEI_' + P_inCodSol + '" IdSolicitud="' + rData.P_inCodSol + '" style="width: 98%;" value="' + value + '" />';
                    }

                }
            },
            {
                name: 'Grilla_Serie', label: 'Serie', index: 'Grilla_Serie', width: 120, align: "left", formatter: function (value, options, rData) {
                    var Clase = "";
                    if (rData.Grilla_SerieBloqueado == "1") { Clase = "bloqueado"; }
                    if (Clase == "bloqueado") {
                        return value;
                    }
                    else {
                        var rowId = "'" + options.rowId + "'";
                        var P_inCodSol = $("#gridIngreso").getRowData(options.rowId).P_inCodSol;
                        if (typeof P_inCodSol === "undefined") { P_inCodSol = rData.P_inCodSol; }
                        return '<input class="' + Clase + '" maxlength="15" id="txtSerie_' + P_inCodSol + '" style="width: 98%;" value="' + value.replace("input", "") + '" onchange="javascript:fnChange_Grilla_Serie(this,' + rowId + ');" />';
                    }
                }
            },
            {
                name: 'Cuenta', label: 'Cuenta', index: 'Cuenta', width: 200, align: "left", sortable: false, formatter: function (value, options, rData) {
                    if (rData.EstadoSolicitud == "Culminada") {
                        if (rData.vcTabla == "Nuevo") {
                            return rData.CuentaSolicitada + " - " + rData.NombreCuentaSolicitada;
                        }
                        else {
                            return rData.CuentaDeLinea + " - " + rData.NombreCuentaDeLinea;
                        }
                    }
                    else {
                        if (rData.vcTabla == "Cambio" || rData.vcTabla == "Reparación" || rData.vcTabla == "Reposición") {
                            return rData.CuentaDeLinea;
                        }
                        else if (rData.vcTabla == "Nuevo" && rData.Grilla_IMEI != "" && rData.Grilla_IMEI != "input" && rData.vcNumLin_Fin != "") {

                            return rData.CuentaSolicitada + " - " + rData.NombreCuentaSolicitada;
                        }
                        else if (rData.vcTabla == "Nuevo") {


                            var CuentaSeleccionada = "";

                            CuentaSeleccionada = rData.CuentaSolicitada;

                            if (CuentasSeleccionadas.indexOf("|" + options.rowId + "|") >= 0) {
                                CuentaSeleccionada = CuentasSeleccionadas.substring(CuentasSeleccionadas.indexOf("|" + options.rowId + "|"), CuentasSeleccionadas.length);
                                CuentaSeleccionada = CuentaSeleccionada.split("|")[2];
                            }

                            var CadenaSelect = '<select id="cboCuenta_' + rData.P_inCodSol + '"  class="class_cboCuenta" rowid="' + options.rowId + '" style="width: 98%;" >';
                            CadenaSelect += '<option value="-1">(Seleccione)</option>';

                            var Cuentas = ListaCuentasOptions.split(';');
                            var Cuenta;
                            for (var i = 0; i < Cuentas.length; i++) {
                                Cuenta = Cuentas[i].split('|');

                                if (CuentaSeleccionada != "" && CuentaSeleccionada == Cuenta[0]) {
                                    CadenaSelect += '<option SELECTED value="' + Cuenta[0] + '">' + Cuenta[1] + '</option>';
                                }
                                else {
                                    CadenaSelect += '<option value="' + Cuenta[0] + '">' + Cuenta[1] + '</option>';
                                }
                            }
                            CadenaSelect += '</select>';

                            return CadenaSelect;

                        }
                    }

                }
            },
            {
                name: 'Grilla_MesesContrato', label: 'Meses Contrato', index: 'Grilla_MesesContrato', width: 60, sortable: false, align: "right", formatter: function (value, options, rData) {
                    var Clase = "";
                    if (rData.Grilla_MesesContratoBloqueado == "1") { Clase = "bloqueado"; }
                    var rowId = "'" + options.rowId + "'";

                    if (Clase == "bloqueado") {
                        return value;
                    }
                    else {
                        var MesSeleccionado = "";
                        if (MesesSeleccionados.indexOf("|" + options.rowId + "|") >= 0) {
                            MesSeleccionado = MesesSeleccionados.substring(MesesSeleccionados.indexOf("|" + options.rowId + "|"), MesesSeleccionados.length);
                            MesSeleccionado = MesSeleccionado.split("|")[2];
                        }

                        if (MesSeleccionado == "") { MesSeleccionado = "12"; }
                        var CadenaSelect = '<select  id="cboMesesContrato_' + rData.P_inCodSol + '" class="class_cboMeses" rowid="' + options.rowId + '" style="width: 98%;" >';
                        if (MesSeleccionado != "" && MesSeleccionado == "6") { CadenaSelect += '<option SELECTED value="6">6</option>'; } else { CadenaSelect += '<option value="6">6</option>'; }
                        if (MesSeleccionado != "" && MesSeleccionado == "12") { CadenaSelect += '<option SELECTED value="12">12</option>'; } else { CadenaSelect += '<option value="12">12</option>'; }
                        if (MesSeleccionado != "" && MesSeleccionado == "18") { CadenaSelect += '<option SELECTED value="18">18</option>'; } else { CadenaSelect += '<option value="18">18</option>'; }
                        CadenaSelect += '</select>';
                        return CadenaSelect;
                    }

                }
            },
            {
                name: 'Grilla_FechaInicioContrato', label: 'Fecha Inicio', index: 'Grilla_FechaInicioContrato', width: 80, align: 'center', formatter: function (value, options, rData) {
                    var Clase = "";
                    if (rData.Grilla_FechaInicioContratoBloqueado == "1") { Clase = "bloqueado"; }
                    var rowId = "'" + options.rowId + "'";
                    if (Clase == "bloqueado") {
                        return value;
                    }
                    else {
                        var P_inCodSol = $("#gridIngreso").getRowData(options.rowId).P_inCodSol;
                        if (typeof P_inCodSol === "undefined") { P_inCodSol = rData.P_inCodSol; }
                        return '<input  id="txtFechaInicioContrato_' + P_inCodSol + '"  IdSolicitud="' + P_inCodSol + '" class="DATE" style="width: 98%;"  value="' + value.replace("input", "") + '" onchange="javascript:fnChange_Grilla_FechaInicioContrato(this,' + rowId + ');" />';
                    }

                }
            },
            { name: 'vcTabla', label: 'vcTabla', index: 'vcTabla', hidden: true },
            { name: 'NuevaSerie', label: 'NuevaSerie', index: 'NuevaSerie', hidden: true },
            { name: 'CuentaDeLinea', label: 'CuentaDeLinea', index: 'CuentaDeLinea', hidden: true },
            { name: 'CuentaSolicitada', label: 'CuentaSolicitada', index: 'CuentaSolicitada', hidden: true },
            { name: 'EstadoSolicitud', label: 'Estado Solicitud', index: 'EstadoSolicitud', width: 70, hidden: false, align: "center" },
            {
                name: 'Observacion', label: ' ', index: 'Observacion', width: 20, hidden: false, align: "center", formatter: function (value, options, rData) {
                    return "<img id='imgObs_" + rData.P_inCodSol + "' style='cursor: pointer;' mensaje ='" + value + "' P_inCodSol='" + rData.P_inCodSol + "' vcTabla='" + rData.vcTabla + "' alt='" + value + "' class='gridIngreso_Observacion' src='../../Common/Images/nota16x16.png' >";
                }
            },
            { name: 'P_inCodSol', label: 'P_inCodSol', index: 'P_inCodSol', hidden: true },
            { name: 'IdModelo', label: 'IdModelo', index: 'IdModelo', width: 200, hidden: true, align: "left" },
            { name: 'vcNumLin_Fin', label: 'vcNumLin_Fin', index: 'vcNumLin_Fin', width: 10, hidden: true, align: "left" },
            { name: 'LF_Meses', label: 'LF_Meses', index: 'LF_Meses', width: 10, hidden: true, align: "left" },
            { name: 'F_vcCodCuentaFinal', label: 'F_vcCodCuentaFinal', index: 'F_vcCodCuentaFinal', width: 10, hidden: true, align: "left" },
            { name: 'LF_FechaInicio', label: 'LF_FechaInicio', index: 'LF_FechaInicio', width: 10, hidden: true, align: "left" },
            { name: 'SerieInicial', label: 'SerieInicial', index: 'SerieInicial', hidden: true },
            { name: 'SerieFin', label: 'SerieFin', index: 'SerieFin', hidden: true },
            { name: 'IMEIAlmacen', label: 'IMEIAlmacen', index: 'IMEIAlmacen', hidden: true },
            { name: 'FecIniContratoAlmacen', label: 'FecIniContratoAlmacen', index: 'FecIniContratoAlmacen', hidden: true },
            { name: 'vcCodIMEI_Fin', label: 'vcCodIMEI_Fin', index: 'vcCodIMEI_Fin', hidden: true },
            { name: 'NombreCuentaSolicitada', label: 'NombreCuentaSolicitada', index: 'NombreCuentaSolicitada', hidden: true },
            { name: 'Grilla_LineaBloqueado', label: 'Grilla_LineaBloqueado', index: 'Grilla_LineaBloqueado', hidden: true },
            { name: 'Grilla_IMEIBloqueado', label: 'Grilla_IMEIBloqueado', index: 'Grilla_IMEIBloqueado', hidden: true },
            { name: 'Grilla_SerieBloqueado', label: 'Grilla_SerieBloqueado', index: 'Grilla_SerieBloqueado', hidden: true },
            { name: 'Grilla_MesesContratoBloqueado', label: 'Grilla_MesesContratoBloqueado', index: 'Grilla_MesesContratoBloqueado', hidden: true },
            { name: 'Grilla_FechaInicioContratoBloqueado', label: 'Grilla_FechaInicioContratoBloqueado', index: 'Grilla_FechaInicioContratoBloqueado', hidden: true },
    ];
}
else {
    ModeloColumnas_GridIngreso = [
            { name: 'Correlativo', hidden: true, key: true },
            { name: 'Info', label: ' ', width: 20, index: 'Info', hidden: false },
            { name: 'EMPL_vcNOMEMP', label: 'Empleado', width: 150, index: 'EMPL_vcNOMEMP', hidden: false },
            {
                name: "Grilla_F_vcNumLin", label: 'Línea', index: "Grilla_F_vcNumLin", hidden: false, width: 100, formatter: function (value, options, rData) {
                    var Clase = "";
                    if (rData.Grilla_LineaBloqueado == "1") { Clase = "bloqueado"; }
                    if (Clase == "bloqueado") {
                        return value;
                    }
                    else {
                        var rowId = "'" + options.rowId + "'";
                        var P_inCodSol = $("#gridIngreso").getRowData(options.rowId).P_inCodSol;
                        if (typeof P_inCodSol === "undefined") { P_inCodSol = rData.P_inCodSol; }
                        var maxLengtLinea;
                        try {
                            maxLengtLinea = oCulturaUsuario.LongitudMaximoLinea;
                        } catch (e) {
                            maxLengtLinea = 20;
                        }
                        return '<input class="' + Clase + '" maxlength="' + maxLengtLinea + '" id="txtLinea_' + P_inCodSol + '" style="width: 98%;" value="' + value.replace("input", "") + '" onchange="javascript:fnChange_Grilla_F_vcNumLin(this,' + rowId + ');" />';
                    }

                }
            },
            { name: 'Modelo', label: 'Modelo', index: 'Modelo', width: 150, hidden: false, align: "left" },
            {
                name: 'Grilla_IMEI', label: 'IMEI', index: 'Grilla_IMEI', width: 120, hidden: false, align: "left", formatter: function (value, options, rData) {
                    var Clase = "";
                    if (rData.Grilla_IMEIBloqueado == "1") { Clase = "bloqueado"; }
                    if (Clase == "bloqueado") {
                        return value;
                    }
                    else {
                        var rowId = "'" + options.rowId + "'";
                        var P_inCodSol = $("#gridIngreso").getRowData(options.rowId).P_inCodSol;
                        if (typeof P_inCodSol === "undefined") { P_inCodSol = rData.P_inCodSol; }
                        return '<input class="' + Clase + '" maxlength="15" id="txtIMEI_' + P_inCodSol + '" style="width: 98%;" value="' + value.replace("input", "") + '" onchange="javascript:fnChange_Grilla_IMEI(this,' + rowId + ');" />';
                    }
                }
            },
            {
                name: 'MismoEquipo', label: 'Mismo Equipo', index: 'MismoEquipo', width: 50, hidden: false, align: "center", formatter: function (value, options, rData) {
                    if (rData.EstadoSolicitud == "Culminada") {
                        return "";
                    }
                    else if (rData.vcTabla == "Reparación" && rData.vcObsProcAlmacen == "Procesado Correctamente") {
                        return "";
                    }
                    else {
                        var rowId = "'" + options.rowId + "'";
                        return '<input type="checkbox" id="chkMismoEquipo_' + rData.P_inCodSol + '" IdSolicitud="' + rData.P_inCodSol + '" onchange="javascript:chkMismoEquipo_change(this);" >';
                    }

                }
            },
            {
                name: 'NuevoIMEI', label: 'Nuevo IMEI', index: 'NuevoIMEI', width: 120, hidden: false, align: "left", formatter: function (value, options, rData) {
                    if (rData.EstadoSolicitud == "Culminada") {
                        return value;
                    }
                    else if (rData.vcTabla == "Reparación" && rData.vcObsProcAlmacen == "Procesado Correctamente") {
                        return rData.IMEIAlmacen;
                    }
                    else {
                        var rowId = "'" + options.rowId + "'";
                        var P_inCodSol = $("#gridIngreso").getRowData(options.rowId).P_inCodSol;
                        if (typeof P_inCodSol === "undefined") { P_inCodSol = rData.P_inCodSol; }
                        return '<input maxlength="15" onchange="javascript:txtNuevoIMEI_change(this);" id="txtNuevoIMEI_' + P_inCodSol + '" IdSolicitud="' + rData.P_inCodSol + '" style="width: 98%;" value="' + value + '" />';
                    }

                }
            },
            {
                name: 'Grilla_Serie', label: 'Serie', index: 'Grilla_Serie', width: 120, align: "left", formatter: function (value, options, rData) {
                    var Clase = "";
                    if (rData.Grilla_SerieBloqueado == "1") { Clase = "bloqueado"; }
                    if (Clase == "bloqueado") {
                        return value;
                    }
                    else {
                        var rowId = "'" + options.rowId + "'";
                        var P_inCodSol = $("#gridIngreso").getRowData(options.rowId).P_inCodSol;
                        if (typeof P_inCodSol === "undefined") { P_inCodSol = rData.P_inCodSol; }
                        return '<input class="' + Clase + '" maxlength="15" id="txtSerie_' + P_inCodSol + '" style="width: 98%;" value="' + value.replace("input", "") + '" onchange="javascript:fnChange_Grilla_Serie(this,' + rowId + ');" />';
                    }
                }
            },
            {
                name: 'Grilla_ICC', label: 'ICC', index: 'Grilla_ICC', width: 120, align: "left", formatter: function (value, options, rData) {
                    var Clase = "";
                    if (rData.Grilla_ICCBloqueado == "1") { Clase = "bloqueado"; }
                    if (Clase == "bloqueado") {
                        return value;
                    }
                    else {
                        var rowId = "'" + options.rowId + "'";
                        var P_inCodSol = $("#gridIngreso").getRowData(options.rowId).P_inCodSol;
                        if (typeof P_inCodSol === "undefined") { P_inCodSol = rData.P_inCodSol; }
                        return '<input class="' + Clase + '" maxlength="15" id="txtICC_' + P_inCodSol + '" style="width: 98%;" value="' + value.replace("input", "") + '" onchange="javascript:fnChange_Grilla_ICC(this,' + rowId + ');" />';
                    }
                }
            },
            {
                name: 'Cuenta', label: 'Cuenta', index: 'Cuenta', width: 200, align: "left", sortable: false, formatter: function (value, options, rData) {
                    if (rData.EstadoSolicitud == "Culminada") {
                        if (rData.vcTabla == "Nuevo") {
                            return rData.CuentaSolicitada + " - " + rData.NombreCuentaSolicitada;
                        }
                        else {
                            return rData.CuentaDeLinea + " - " + rData.NombreCuentaDeLinea;
                        }
                    }
                    else {
                        if (rData.vcTabla == "Cambio" || rData.vcTabla == "Reparación" || rData.vcTabla == "Reposición") {
                            return rData.CuentaDeLinea;
                        }
                        else if (rData.vcTabla == "Nuevo" && rData.Grilla_IMEI != "" && rData.Grilla_IMEI != "input" && rData.vcNumLin_Fin != "") {

                            return rData.CuentaSolicitada + " - " + rData.NombreCuentaSolicitada;
                        }
                        else if (rData.vcTabla == "Nuevo") {


                            var CuentaSeleccionada = "";

                            CuentaSeleccionada = rData.CuentaSolicitada;

                            if (CuentasSeleccionadas.indexOf("|" + options.rowId + "|") >= 0) {
                                CuentaSeleccionada = CuentasSeleccionadas.substring(CuentasSeleccionadas.indexOf("|" + options.rowId + "|"), CuentasSeleccionadas.length);
                                CuentaSeleccionada = CuentaSeleccionada.split("|")[2];
                            }

                            var CadenaSelect = '<select id="cboCuenta_' + rData.P_inCodSol + '"  class="class_cboCuenta" rowid="' + options.rowId + '" style="width: 98%;" >';
                            CadenaSelect += '<option value="-1">(Seleccione)</option>';

                            var Cuentas = ListaCuentasOptions.split(';');
                            var Cuenta;
                            for (var i = 0; i < Cuentas.length; i++) {
                                Cuenta = Cuentas[i].split('|');

                                if (CuentaSeleccionada != "" && CuentaSeleccionada == Cuenta[0]) {
                                    CadenaSelect += '<option SELECTED value="' + Cuenta[0] + '">' + Cuenta[1] + '</option>';
                                }
                                else {
                                    CadenaSelect += '<option value="' + Cuenta[0] + '">' + Cuenta[1] + '</option>';
                                }
                            }
                            CadenaSelect += '</select>';

                            return CadenaSelect;

                        }
                    }

                }
            },
            {
                name: 'Grilla_MesesContrato', label: 'Meses Contrato', index: 'Grilla_MesesContrato', width: 60, sortable: false, align: "right", formatter: function (value, options, rData) {
                    var Clase = "";
                    if (rData.Grilla_MesesContratoBloqueado == "1") { Clase = "bloqueado"; }
                    var rowId = "'" + options.rowId + "'";

                    if (Clase == "bloqueado") {
                        return value;
                    }
                    else {
                        var MesSeleccionado = "";
                        if (MesesSeleccionados.indexOf("|" + options.rowId + "|") >= 0) {
                            MesSeleccionado = MesesSeleccionados.substring(MesesSeleccionados.indexOf("|" + options.rowId + "|"), MesesSeleccionados.length);
                            MesSeleccionado = MesSeleccionado.split("|")[2];
                        }

                        if (MesSeleccionado == "") { MesSeleccionado = "12"; }
                        var CadenaSelect = '<select  id="cboMesesContrato_' + rData.P_inCodSol + '" class="class_cboMeses" rowid="' + options.rowId + '" style="width: 98%;" >';
                        if (MesSeleccionado != "" && MesSeleccionado == "6") { CadenaSelect += '<option SELECTED value="6">6</option>'; } else { CadenaSelect += '<option value="6">6</option>'; }
                        if (MesSeleccionado != "" && MesSeleccionado == "12") { CadenaSelect += '<option SELECTED value="12">12</option>'; } else { CadenaSelect += '<option value="12">12</option>'; }
                        if (MesSeleccionado != "" && MesSeleccionado == "18") { CadenaSelect += '<option SELECTED value="18">18</option>'; } else { CadenaSelect += '<option value="18">18</option>'; }
                        CadenaSelect += '</select>';
                        return CadenaSelect;
                    }

                }
            },
            {
                name: 'Grilla_FechaInicioContrato', label: 'Fecha Inicio', index: 'Grilla_FechaInicioContrato', width: 80, align: 'center', formatter: function (value, options, rData) {
                    var Clase = "";
                    if (rData.Grilla_FechaInicioContratoBloqueado == "1") { Clase = "bloqueado"; }
                    var rowId = "'" + options.rowId + "'";
                    if (Clase == "bloqueado") {
                        return value;
                    }
                    else {
                        var P_inCodSol = $("#gridIngreso").getRowData(options.rowId).P_inCodSol;
                        if (typeof P_inCodSol === "undefined") { P_inCodSol = rData.P_inCodSol; }
                        return '<input  id="txtFechaInicioContrato_' + P_inCodSol + '"  IdSolicitud="' + P_inCodSol + '" class="DATE" style="width: 98%;"  value="' + value.replace("input", "") + '" onchange="javascript:fnChange_Grilla_FechaInicioContrato(this,' + rowId + ');" />';
                    }

                }
            },
            { name: 'vcTabla', label: 'vcTabla', index: 'vcTabla', hidden: true },
            { name: 'NuevaSerie', label: 'NuevaSerie', index: 'NuevaSerie', hidden: true },
            { name: 'CuentaDeLinea', label: 'CuentaDeLinea', index: 'CuentaDeLinea', hidden: true },
            { name: 'CuentaSolicitada', label: 'CuentaSolicitada', index: 'CuentaSolicitada', hidden: true },
            { name: 'EstadoSolicitud', label: 'Estado Solicitud', index: 'EstadoSolicitud', width: 70, hidden: false, align: "center" },
            {
                name: 'Observacion', label: ' ', index: 'Observacion', width: 20, hidden: false, align: "center", formatter: function (value, options, rData) {
                    return "<img id='imgObs_" + rData.P_inCodSol + "' style='cursor: pointer;' mensaje ='" + value + "' P_inCodSol='" + rData.P_inCodSol + "' vcTabla='" + rData.vcTabla + "' alt='" + value + "' class='gridIngreso_Observacion' src='../../Common/Images/nota16x16.png' >";
                }
            },
            { name: 'P_inCodSol', label: 'P_inCodSol', index: 'P_inCodSol', hidden: true },
            { name: 'IdModelo', label: 'IdModelo', index: 'IdModelo', width: 200, hidden: true, align: "left" },
            { name: 'vcNumLin_Fin', label: 'vcNumLin_Fin', index: 'vcNumLin_Fin', width: 10, hidden: true, align: "left" },
            { name: 'LF_Meses', label: 'LF_Meses', index: 'LF_Meses', width: 10, hidden: true, align: "left" },
            { name: 'F_vcCodCuentaFinal', label: 'F_vcCodCuentaFinal', index: 'F_vcCodCuentaFinal', width: 10, hidden: true, align: "left" },
            { name: 'LF_FechaInicio', label: 'LF_FechaInicio', index: 'LF_FechaInicio', width: 10, hidden: true, align: "left" },
            { name: 'SerieInicial', label: 'SerieInicial', index: 'SerieInicial', hidden: true },
            { name: 'SerieFin', label: 'SerieFin', index: 'SerieFin', hidden: true },
            { name: 'IMEIAlmacen', label: 'IMEIAlmacen', index: 'IMEIAlmacen', hidden: true },
            { name: 'FecIniContratoAlmacen', label: 'FecIniContratoAlmacen', index: 'FecIniContratoAlmacen', hidden: true },
            { name: 'vcCodIMEI_Fin', label: 'vcCodIMEI_Fin', index: 'vcCodIMEI_Fin', hidden: true },
            { name: 'NombreCuentaSolicitada', label: 'NombreCuentaSolicitada', index: 'NombreCuentaSolicitada', hidden: true },
            { name: 'Grilla_LineaBloqueado', label: 'Grilla_LineaBloqueado', index: 'Grilla_LineaBloqueado', hidden: true },
            { name: 'Grilla_IMEIBloqueado', label: 'Grilla_IMEIBloqueado', index: 'Grilla_IMEIBloqueado', hidden: true },
            { name: 'Grilla_SerieBloqueado', label: 'Grilla_SerieBloqueado', index: 'Grilla_SerieBloqueado', hidden: true },
            { name: 'Grilla_MesesContratoBloqueado', label: 'Grilla_MesesContratoBloqueado', index: 'Grilla_MesesContratoBloqueado', hidden: true },
            { name: 'Grilla_FechaInicioContratoBloqueado', label: 'Grilla_FechaInicioContratoBloqueado', index: 'Grilla_FechaInicioContratoBloqueado', hidden: true },
    ];
}



function DisenoGrilla() {

    $("#gridIngreso").jqGrid({
        sortable: true,
        loadonce: true,
        loadui: 'disable',
        datatype: "local",
        colModel: ModeloColumnas_GridIngreso,
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        viewrecords: true,
        rowNum: 9007199254740992,
        multiselect: false,
        rownumbers: true,
        ignoreCase: true, //Permite filtrar por igual Mayus-Minus
        shrinkToFit: false,
        autowidth: true,
        onSortCol: function (index, iCol, sortorder) {
            //console.log("onSortCol");
        },
        gridComplete: function () {
            //console.log("gridComplete");
            $('.class_cboCuenta').select2();

            $(".class_cboCuenta").change(function (e) {
                var RowId = $(this).attr("rowid");
                CuentasSeleccionadas += "|" + RowId + "|" + $(this).val() + "|";
            });


            $(".DATE").datepicker({
                showOn: "focus",
                changeMonth: true,
                changeYear: true,
                dateFormat: 'dd/mm/yy' // See format options on parseDate
            });

            $(".class_cboMeses").select2({
                minimumResultsForSearch: -1
            });
            $(".class_cboMeses").change(function (e) {
                var RowId = $(this).attr("rowid");
                MesesSeleccionados += "|" + RowId + "|" + $(this).val() + "|";
            });

            $(".bloqueado").attr("disabled", "disabled");

        },
        afterInsertRow: function (rowid, rData, rowelem) {
            //Filas de Color Rojo filas no vigentes
            var colModels;
            var i;
            if (rData.EstadoSolicitud == 'Culminada') {
                colModels = $("#gridIngreso").getGridParam("colModel");
                for (i = 0; i < colModels.length; i++) {
                    $("#gridIngreso").jqGrid('setCell', rowid, i, '', { color: '#49494A', 'background-color': '#FFF8D9' });
                }
            }
            else {
                if ((rData.vcTabla == "Nuevo" && rData.vcNumLin_Fin != "") || ((rData.vcTabla == "Cambio" || rData.vcTabla == "Reposición") && rData.vcCodIMEI_Fin != "") ||
                    (rData.vcTabla == "Reparación" && rData.vcObsProcAlmacen == "Procesado Correctamente")) {
                    colModels = $("#gridIngreso").getGridParam("colModel");
                    for (i = 0; i < colModels.length; i++) {
                        $("#gridIngreso").jqGrid('setCell', rowid, i, '', { color: '#49494A', 'background-color': '#D3FFD3' });
                    }
                }
            }
        },
        loadComplete: function () {
            //console.log("loadComplete");
        },
        //rowNum: 20,
        //rowList: [20, 50, 100],
        //pager: "#pager_gridIngreso", //Pager.
        //afterInsertRow: afterInsertRow_Grilla,
        beforeSelectRow: function (rowid, e) {
            return true;
        }
    }); //.navGrid("#pager_gridIngreso", { edit: false, add: false, search: false, del: false });

    $("#gridIngreso").jqGrid('filterToolbar', {
        stringResult: true, searchOnEnter: false, defaultSearch: "cn",
        searchOperators: true, multipleSearch: true,
        groupOps: [{ op: "AND", text: "all" }, { op: "OR", text: "any" }],
    });


    $(".ui-search-toolbar").find("input").css("background-color", "#F0F8FD");

    $("#gs_Info").hide();
    $("#gs_Observacion").hide();
    $("#gs_MismoEquipo").hide();

    var CadenaSelect = '<select id="cboCuentaCabecera" class="class_cboCuentaCabecera" style="width: 98%;">';
    CadenaSelect += '<option value="-1">(Seleccione)</option>';
    var Cuentas = ListaCuentasOptions.split(';');
    var Cuenta;
    for (var i = 0; i < Cuentas.length; i++) {
        Cuenta = Cuentas[i].split('|');
        CadenaSelect += '<option value="' + Cuenta[0] + '">' + Cuenta[1] + '</option>';
    }
    CadenaSelect += '</select>';
    $("#gs_Cuenta").parent().html(CadenaSelect);

    $('#cboCuentaCabecera').select2();
    $("#cboCuentaCabecera").next().hide();

    $("#cboCuentaCabecera").change(function () {
        //console.log('$("#cboCuentaCabecera").val() : ' + $("#cboCuentaCabecera").val());
        $(".class_cboCuenta").val($("#cboCuentaCabecera").val());
        $('.class_cboCuenta').select2();
    });

    //$("#gridIngreso ").jqGrid('setGroupHeaders', {
    //    useColSpanStyle: false,
    //    groupHeaders: [
    //      { startColumnName: Columna1, numberOfColumns: Longitud1, titleText: TituloIzquierda },
    //      { startColumnName: Columna2, numberOfColumns: Longitud2, titleText: TituloDerecha }
    //    ]
    //});

}


function CargarSolicitudes() {

    var IdOrden = $("#ddlOrdenServicio").val();
    if (IdOrden == -1) {
        $(".DataOS").hide();
        return;
    }

    CuentasSeleccionadas = "";
    LimpiarInputsCabecera();

    $.ajax({
        type: "POST",
        url: "Cam_DespachoOperadorOS.aspx/ObtenerSolicitudes",
        data: "{'IdOrden': '" + IdOrden + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            TablaSolicitud = result.d[0][0].vcTabla;

            $(".DataOS").show();

            var grid = $("#gridIngreso").jqGrid();
            $("#gridIngreso").jqGrid("clearGridData", true);
            grid.addRowData("Correlativo", result.d[0], "first");

            $("#cboCuentaCabecera").next().hide();



            switch (TablaSolicitud) {
                case "Nuevo":
                    $("#gridIngreso").jqGrid('showCol', ["Grilla_Serie", "Grilla_FechaInicioContrato", "Grilla_MesesContrato"]);
                    $("#gridIngreso").jqGrid('hideCol', ["NuevoIMEI", "MismoEquipo"]);
                    $("#cboCuentaCabecera").val("-1");
                    $("#cboCuentaCabecera").next().show();
                    $('#cboCuentaCabecera').select2();
                    break;
                case "Cambio":
                    $("#gridIngreso").jqGrid('showCol', ["Grilla_Serie", "Grilla_FechaInicioContrato", "Grilla_MesesContrato"]);
                    $("#gridIngreso").jqGrid('hideCol', ["NuevoIMEI", "MismoEquipo"]);
                    break;
                case "Reparación":
                    $("#gridIngreso").jqGrid('hideCol', ["Grilla_FechaInicioContrato", "Grilla_MesesContrato"]);
                    $("#gridIngreso").jqGrid('showCol', ["NuevoIMEI", "MismoEquipo"]);
                    break;
                case "Reposición":
                    $("#gridIngreso").jqGrid('hideCol', ["MismoEquipo", "NuevoIMEI"]);
                    $("#gridIngreso").jqGrid('showCol', ["Grilla_FechaInicioContrato", "Grilla_MesesContrato"]);
                    break;

                default:
                    $("#gridIngreso").jqGrid('hideCol', ["NuevoIMEI"]);
                    break;
            }

            //Validar datos factura...


            $("#LblNombreArchivoAdjunto").html("");
            $("#LblNombreArchivoAdjunto").attr("RutaDescarga", "");

            $("#TxtNumeroFact").val("");
            $("#txtFechaFactura").val("");
            $("#txtMontoFactura").val("");

            if (result.d.length > 1 && result.d[1].length > 0) {
                var Factura = result.d[1][0];
                $("#TxtNumeroFact").val(Factura.NumeroFactura);
                $("#txtFechaFactura").val(Factura.FechaFactura);
                $("#txtMontoFactura").val(FormatoNumero(Factura.MontoFactura, oCulturaUsuario));
                if (Factura.NombreAdjuntoFactura != "") {
                    $("#LblNombreArchivoAdjunto").attr("RutaDescarga", "Images/Temporal" + CarpetaDominio + "/" + Factura.NombreAdjuntoFactura);
                    $("#LblNombreArchivoAdjunto").html(Factura.NombreAdjuntoFactura);
                    $("#hdfAdjuntoFactura").val(Factura.NombreAdjuntoFactura);
                }
            }
            
            ActualizarEventoClik_Observacion();
            //$('.class_cboCuenta').select2();


            //$("input").keydown(function (e) {
            //    if (e.keyCode == 18) {
            //
            //    }
            //    //console.log(e);
            //});


            //var inputs = $(':input').keydown(function (e) {
            //    console.log(e.keyCode);
            //    if (e.keyCode == 39) { // +
            //        e.preventDefault();
            //        var nextInput = inputs.get(inputs.index(this) + 1);

            //        console.log($(nextInput).attr("hidden"));

            //        if (nextInput) {
            //            console.log('nextInput: ' + nextInput.id);
            //            nextInput.focus();
            //        }
            //    }

            //    if (e.keyCode == 37) { // -
            //        e.preventDefault();
            //        var nextInput = inputs.get(inputs.index(this) - 1);
            //        if (nextInput) {
            //            nextInput.focus();
            //        }
            //    }

            //});


            //SatisfactoriaCargarArchivo(result.d);
            //window.parent.ActualizarGrilla();
            //HabilitarCerrar(false);

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }

    });

}

function fnGrabarManual() {
    var IdOrdenServicio = $("#ddlOrdenServicio").val();
    var TotalRegistros = $("#gridIngreso").jqGrid('getGridParam', 'data').length;
    if (TotalRegistros == 0) {
        alerta("No existen registros para actualizar");
        return;
    }

    var lista = $("#gridIngreso").getDataIDs();
    var TipoSolicitud = "";
    var rowData = $("#gridIngreso").getRowData(lista[0]);
    TipoSolicitud = rowData.vcTabla;

    var Linea_Numero = "";
    var Linea_MesesContrato = "";
    var Linea_ICC = "";
    var Linea_FechaInicio = "";
    var Linea_Cuenta = "";

    var Dispositivo_IMEI = "";
    var Dispositivo_Serie = "";

    var ExisteObservaciones = false;
    var Mensaje = "";


    var ListaIngresoNuevo = [];

    switch (TipoSolicitud) {
        case "Nuevo":
            for (i = 0; i < lista.length; i++) {
                Mensaje = "";
                rowData = $("#gridIngreso").getRowData(lista[i]);

                if (rowData.EstadoSolicitud == "Culminada" || $("#txtLinea_" + rowData.P_inCodSol).hasClass("bloqueado")) {
                    continue;
                }

                var oIngresoNuevo = new ingresonuevo();
                oIngresoNuevo.P_inCodSol = rowData.P_inCodSol;
                oIngresoNuevo.Linea_Numero = $.trim($("#txtLinea_" + rowData.P_inCodSol).val());
                oIngresoNuevo.Linea_MesesContrato = $.trim($("#cboMesesContrato_" + rowData.P_inCodSol).val());
                oIngresoNuevo.Linea_ICC = $.trim($("#txtICC_" + rowData.P_inCodSol).val());
                oIngresoNuevo.Linea_FechaInicio = $.trim($("#txtFechaInicioContrato_" + rowData.P_inCodSol).val());
                oIngresoNuevo.Linea_Cuenta = $.trim($("#cboCuenta_" + rowData.P_inCodSol).val());
                oIngresoNuevo.Dispositivo_IMEI = $.trim($("#txtIMEI_" + rowData.P_inCodSol).val());
                oIngresoNuevo.Dispositivo_Serie = $.trim($("#txtSerie_" + rowData.P_inCodSol).val());
                oIngresoNuevo.Dispositivo_IdModelo = rowData.IdModelo;
                oIngresoNuevo.Dispositivo_Modelo = rowData.Modelo;
                oIngresoNuevo.Observacion = $.trim($("#imgObs_" + rowData.P_inCodSol).attr("mensaje"));

                //Validación de Línea..
                if (oIngresoNuevo.Linea_Numero != "" || oIngresoNuevo.Linea_FechaInicio != "" || 
                    oIngresoNuevo.Dispositivo_IMEI != "" || oIngresoNuevo.Dispositivo_Serie != "") {
                    if (oIngresoNuevo.Linea_Numero == "") {
                        Mensaje += "* Debe ingresar el número de línea.<br>";
                    }
                    if (oIngresoNuevo.Dispositivo_IMEI == "") {
                        Mensaje += "* Debe ingresar el IMEI del dispositivo.<br>";
                    }
                    if (oIngresoNuevo.Linea_Numero != "" && (oIngresoNuevo.Linea_Cuenta == "" || oIngresoNuevo.Linea_Cuenta == "-1")) {
                        Mensaje += "* Debe seleccionar una cuenta.<br>";
                    }
                    if (oIngresoNuevo.Linea_FechaInicio == "") {
                        Mensaje += "* Debe ingresar la fecha de inicio.<br>";
                    }
                    if (oIngresoNuevo.Dispositivo_IMEI != "" && oIngresoNuevo.Dispositivo_IMEI.length != 15) {
                        Mensaje += "* La longitud del IMEI no es correcta.<br>";
                    }

                    Mensaje = $.trim(Mensaje);

                    if (Mensaje != "") {
                        ExisteObservaciones = true;
                        $("#gridIngreso").jqGrid("setCell", parseInt(lista[i]), "Info", "<img  style='cursor: pointer;' mensaje ='" + Mensaje + "' alt='" + Mensaje + "' class='gridIngreso_Info' src='../../Common/Images/Mantenimiento/Alerta_16x16.png' >");
                    }
                    else {
                        $("#gridIngreso").jqGrid("setCell", parseInt(lista[i]), "Info", "&nbsp;");
                        ListaIngresoNuevo.push(oIngresoNuevo);
                    }
                }
                else {
                    if (oIngresoNuevo.Linea_Numero != "" && (oIngresoNuevo.Linea_Cuenta == "" || oIngresoNuevo.Linea_Cuenta == "-1")) {
                        Mensaje += "* Debe seleccionar una cuenta.<br>";
                    }
                    else {
                        $("#gridIngreso").jqGrid("setCell", parseInt(lista[i]), "Info", "&nbsp;");
                    }                    
                }
            }
            break;

        case "Cambio":

            for (i = 0; i < lista.length; i++) {
                Mensaje = "";
                rowData = $("#gridIngreso").getRowData(lista[i]);

                if (rowData.EstadoSolicitud == "Culminada" || rowData.vcNumLin_Fin != "" || $("#txtIMEI_" + rowData.P_inCodSol).hasClass("bloqueado")) {
                    continue;
                }

                var oIngresoNuevo = new ingresonuevo();
                oIngresoNuevo.P_inCodSol = rowData.P_inCodSol;
                oIngresoNuevo.Linea_Numero = rowData.Grilla_F_vcNumLin;
                oIngresoNuevo.Linea_MesesContrato = $.trim($("#cboMesesContrato_" + rowData.P_inCodSol).val());
				oIngresoNuevo.Linea_ICC = $.trim($("#txtICC_" + rowData.P_inCodSol).val());
                oIngresoNuevo.Linea_FechaInicio = $.trim($("#txtFechaInicioContrato_" + rowData.P_inCodSol).val());
                oIngresoNuevo.Linea_Cuenta = rowData.Cuenta;
                oIngresoNuevo.Dispositivo_IMEI = $.trim($("#txtIMEI_" + rowData.P_inCodSol).val());
                oIngresoNuevo.Dispositivo_Serie = $.trim($("#txtSerie_" + rowData.P_inCodSol).val());
                oIngresoNuevo.Dispositivo_IdModelo = rowData.IdModelo;
                oIngresoNuevo.Dispositivo_Modelo = rowData.Modelo;
                oIngresoNuevo.Observacion = $.trim($("#imgObs_" + rowData.P_inCodSol).attr("mensaje"));

                //Validación..
                if (oIngresoNuevo.Linea_FechaInicio != "" || oIngresoNuevo.Dispositivo_IMEI != "" || oIngresoNuevo.Dispositivo_Serie != "") {
                    if (oIngresoNuevo.Dispositivo_IMEI == "") {
                        Mensaje += "* Debe ingresar el IMEI del dispositivo.<br>";
                    }
                    if (oIngresoNuevo.Linea_FechaInicio == "") {
                        Mensaje += "* Debe ingresar la fecha de inicio.<br>";
                    }
                    if (oIngresoNuevo.Dispositivo_IMEI != "" && oIngresoNuevo.Dispositivo_IMEI.length != 15) {
                        Mensaje += "* La longitud del IMEI no es correcta.<br>";
                    }
                    Mensaje = $.trim(Mensaje);
                    if (Mensaje != "") {
                        ExisteObservaciones = true;
                        $("#gridIngreso").jqGrid("setCell", parseInt(lista[i]), "Info", "<img  style='cursor: pointer;' mensaje ='" + Mensaje + "' alt='" + Mensaje + "' class='gridIngreso_Info' src='../../Common/Images/Mantenimiento/Alerta_16x16.png' >");
                    }
                    else {
                        $("#gridIngreso").jqGrid("setCell", parseInt(lista[i]), "Info", "&nbsp;");
                        ListaIngresoNuevo.push(oIngresoNuevo);
                    }
                }
                else {
                    $("#gridIngreso").jqGrid("setCell", parseInt(lista[i]), "Info", "&nbsp;");
                }
            }
            break;


        case "Reparación":

            for (i = 0; i < lista.length; i++) {

                Mensaje = "";
                rowData = $("#gridIngreso").getRowData(lista[i]);

                if (rowData.EstadoSolicitud == "Culminada" || rowData.vcNumLin_Fin != "" || $("#txtNuevoIMEI_" + rowData.P_inCodSol).hasClass("bloqueado")) {
                    continue;
                }

                var oIngresoNuevo = new ingresonuevo();
                oIngresoNuevo.P_inCodSol = rowData.P_inCodSol;
                oIngresoNuevo.Linea_Numero = rowData.Grilla_F_vcNumLin;
                oIngresoNuevo.Linea_MesesContrato = rowData.Grilla_MesesContrato;
				oIngresoNuevo.Linea_ICC = $.trim($("#txtICC_" + rowData.P_inCodSol).val());
                oIngresoNuevo.Linea_FechaInicio = rowData.Grilla_FechaInicioContrato;
                oIngresoNuevo.Linea_Cuenta = rowData.Cuenta;
                oIngresoNuevo.Dispositivo_IMEI = $.trim($("#txtNuevoIMEI_" + rowData.P_inCodSol).val());
                oIngresoNuevo.Dispositivo_Serie = $.trim($("#txtSerie_" + rowData.P_inCodSol).val());
                oIngresoNuevo.Dispositivo_IdModelo = rowData.IdModelo;
                oIngresoNuevo.Dispositivo_Modelo = rowData.Modelo;
                oIngresoNuevo.Observacion = $.trim($("#imgObs_" + rowData.P_inCodSol).attr("mensaje"));

                //Validación..
                if (oIngresoNuevo.Dispositivo_IMEI != "") {
                    if (oIngresoNuevo.Dispositivo_IMEI != "" && oIngresoNuevo.Dispositivo_IMEI.length != 15) {
                        Mensaje += "* La longitud del IMEI no es correcta.<br>";
                    }
                    Mensaje = $.trim(Mensaje);
                    if (Mensaje != "") {
                        ExisteObservaciones = true;
                        $("#gridIngreso").jqGrid("setCell", parseInt(lista[i]), "Info", "<img  style='cursor: pointer;' mensaje ='" + Mensaje + "' alt='" + Mensaje + "' class='gridIngreso_Info' src='../../Common/Images/Mantenimiento/Alerta_16x16.png' >");
                    }
                    else {
                        $("#gridIngreso").jqGrid("setCell", parseInt(lista[i]), "Info", "&nbsp;");
                        ListaIngresoNuevo.push(oIngresoNuevo);
                    }
                }
                else {
                    $("#gridIngreso").jqGrid("setCell", parseInt(lista[i]), "Info", "&nbsp;");
                }
            }
            break;

        case "Reposición":

            for (i = 0; i < lista.length; i++) {
                Mensaje = "";
                rowData = $("#gridIngreso").getRowData(lista[i]);

                if (rowData.EstadoSolicitud == "Culminada" || rowData.vcNumLin_Fin != "" || $("#txtIMEI_" + rowData.P_inCodSol).hasClass("bloqueado")) {
                    continue;
                }

                var oIngresoNuevo = new ingresonuevo();
                oIngresoNuevo.P_inCodSol = rowData.P_inCodSol;
                oIngresoNuevo.Linea_Numero = rowData.Grilla_F_vcNumLin;
                oIngresoNuevo.Linea_MesesContrato = rowData.Grilla_MesesContrato;
				oIngresoNuevo.Linea_ICC = $.trim($("#txtICC_" + rowData.P_inCodSol).val());
                oIngresoNuevo.Linea_FechaInicio = rowData.Grilla_FechaInicioContrato;
                oIngresoNuevo.Linea_Cuenta = rowData.Cuenta;
                oIngresoNuevo.Dispositivo_IMEI = $.trim($("#txtIMEI_" + rowData.P_inCodSol).val());
                oIngresoNuevo.Dispositivo_Serie = $.trim($("#txtSerie_" + rowData.P_inCodSol).val());
                oIngresoNuevo.Dispositivo_IdModelo = rowData.IdModelo;
                oIngresoNuevo.Dispositivo_Modelo = rowData.Modelo;
                oIngresoNuevo.Observacion = $.trim($("#imgObs_" + rowData.P_inCodSol).attr("mensaje"));

                //Validación..
                if (oIngresoNuevo.Dispositivo_IMEI != "" || oIngresoNuevo.Dispositivo_Serie != "") {
                    if (oIngresoNuevo.Dispositivo_IMEI == "") {
                        Mensaje += "* Debe ingresar el IMEI del dispositivo.<br>";
                    }
                    if (oIngresoNuevo.Dispositivo_IMEI != "" && oIngresoNuevo.Dispositivo_IMEI.length != 15) {
                        Mensaje += "* La longitud del IMEI no es correcta.<br>";
                    }
                    Mensaje = $.trim(Mensaje);
                    if (Mensaje != "") {
                        ExisteObservaciones = true;
                        $("#gridIngreso").jqGrid("setCell", parseInt(lista[i]), "Info", "<img  style='cursor: pointer;' mensaje ='" + Mensaje + "' alt='" + Mensaje + "' class='gridIngreso_Info' src='../../Common/Images/Mantenimiento/Alerta_16x16.png' >");
                    }
                    else {
                        $("#gridIngreso").jqGrid("setCell", parseInt(lista[i]), "Info", "&nbsp;");
                        ListaIngresoNuevo.push(oIngresoNuevo);
                    }
                }
                else {
                    $("#gridIngreso").jqGrid("setCell", parseInt(lista[i]), "Info", "&nbsp;");
                }
            }
            break;

        default:

    }

    if (ExisteObservaciones) {
        alerta("Revise las observaciones antes de grabar la información.");
    }
    else {
        if (ListaIngresoNuevo.length > 0) {
            GrabarIngreso_Nuevos(ListaIngresoNuevo);
        }
        else {
            alerta("No hay cambios por actualizar.");
        }
    }

    ActualizarEventoClick_Info();

}

var Linea_Numero = "";
var Linea_MesesContrato = "";
var Linea_ICC = "";
var Linea_FechaInicio = "";
var Linea_Cuenta = "";

var Dispositivo_IMEI = "";
var Dispositivo_Serie = "";

function ingresonuevo(P_inCodSol, Linea_Numero, Linea_MesesContrato, Linea_FechaInicio, Linea_Cuenta,
                     Dispositivo_IMEI, Dispositivo_Serie, Dispositivo_IdModelo, Dispositivo_Modelo, Observacion, Linea_ICC) {
    this.P_inCodSol = P_inCodSol;
    this.Linea_Numero = Linea_Numero;
    this.Linea_MesesContrato = Linea_MesesContrato;
    this.Linea_FechaInicio = Linea_FechaInicio;
    this.Linea_Cuenta = Linea_Cuenta;
    this.Dispositivo_IMEI = Dispositivo_IMEI;
    this.Dispositivo_Serie = Dispositivo_Serie;
    this.Dispositivo_IdModelo = Dispositivo_IdModelo;
    this.Dispositivo_Modelo = Dispositivo_Modelo;
    this.Observacion = Observacion;
    this.Linea_ICC = Linea_ICC;
}

function GrabarIngreso_Nuevos(_ListaIngresoNuevo) {

    var ListaIngresoNuevo = JSON.stringify(_ListaIngresoNuevo);

    var EsRenovacion;
    if (TablaSolicitud == "Nuevo") {
        EsRenovacion = "False";
    }
    else {
        EsRenovacion = "True";
    }

    BloquearPagina(true);
    $.ajax({
        type: "POST",
        url: "Cam_DespachoOperadorOS.aspx/GrabarIngreso_Nuevos",
        data: "{'ListaIngresoNuevo': '" + ListaIngresoNuevo + "'," +
               "'EsRenovacion':'" + EsRenovacion + "'," +
               "'NroFactura':'" + $("#TxtNumeroFact").val() + "'," +
               "'FecFactura':'" + $("#txtFechaFactura").val() + "'," +
               "'MonFactura':'" + $("#txtMontoFactura").val() + "'," +
               "'OrdenServicio':'" + $("#ddlOrdenServicio").val() + "'," +
               "'nomArch':'" + $("#hdfAdjuntoFactura").val() + "'," +
               "'Operador':'" + $("#ddlOperador").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            BloquearPagina(false);

            if (result.d.Error != "") {
                alerta(result.d.Error);
                return;
            }

            var Filas, Columnas, colModels;
            if (result.d.ResultadoOK != "") {
                Filas = result.d.ResultadoOK.split(";");
                for (var i = 0; i < Filas.length; i++) {
                    Columnas = Filas[i].split("|");

                    var lista = $("#gridIngreso").getDataIDs();
                    for (j = 0; j < lista.length; j++) {
                        Mensaje = "";
                        rowData = $("#gridIngreso").getRowData(lista[j]);
                        if (rowData.P_inCodSol == Columnas[0]) {
                            $("#gridIngreso").jqGrid("setCell", parseInt(lista[j]), "Info", "<img src='../../Common/Images/Mantenimiento/Aprobar.png' >");
                            $("#txtLinea_" + rowData.P_inCodSol).addClass("bloqueado");
                            $("#txtIMEI_" + rowData.P_inCodSol).addClass("bloqueado");
                            $("#txtNuevoIMEI_" + rowData.P_inCodSol).addClass("bloqueado");
                            $("#txtSerie_" + rowData.P_inCodSol).addClass("bloqueado");
                            $("#cboCuenta_" + rowData.P_inCodSol).addClass("bloqueado");
                            $("#cboMesesContrato_" + rowData.P_inCodSol).addClass("bloqueado");
                            $("#chkMismoEquipo_" + rowData.P_inCodSol).addClass("bloqueado");
                            $("#txtFechaInicioContrato_" + rowData.P_inCodSol).addClass("bloqueado");

                            colModels = $("#gridIngreso").getGridParam("colModel");
                            for (h = 0; h < colModels.length; h++) {
                                $("#gridIngreso").jqGrid('setCell', parseInt(lista[j]), h, '', { color: '#49494A', 'background-color': '#D3FFD3' });
                            }
                            break;
                        }

                    }

                }
            }

            if (result.d.ResultadoErr != "") {
                Filas = result.d.ResultadoErr.split(";");
                for (var i = 0; i < Filas.length; i++) {
                    Columnas = Filas[i].split("|");

                    var lista = $("#gridIngreso").getDataIDs();
                    for (j = 0; j < lista.length; j++) {
                        Mensaje = "";
                        rowData = $("#gridIngreso").getRowData(lista[j]);
                        if (rowData.P_inCodSol == Columnas[0]) {
                            Mensaje = Columnas[1];
                            $("#gridIngreso").jqGrid("setCell", parseInt(lista[j]), "Info", "<img  style='cursor: pointer;' mensaje ='" + Mensaje + "' alt='" + Mensaje + "' class='gridIngreso_Info' src='../../Common/Images/Mantenimiento/Alerta_16x16.png' >");
                            break;
                        }
                    }
                }
                ActualizarEventoClick_Info();
            }

            $(".bloqueado").attr("disabled", "disabled");
            //

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
            BloquearPagina(false);
        }
    });


}


function ActualizarEventoClick_Info() {
    $(".gridIngreso_Info").click(function () {
        var Mensaje = $(this).attr("mensaje");
        if (Mensaje != null && Mensaje != "") {
            alerta(Mensaje);
        }
    });
}

function ActualizarEventoClik_Observacion() {
    $(".gridIngreso_Observacion").click(function () {
        var Mensaje = $(this).attr("mensaje");
        var P_inCodSol = $(this).attr("P_inCodSol");
        var vcTabla = $(this).attr("vcTabla");
        if (vcTabla == "Reparación") {
            if (typeof $("#txtNuevoIMEI_" + P_inCodSol).val() !== 'undefined') {
                if ($("#txtNuevoIMEI_" + P_inCodSol).hasClass("bloqueado")) {
                    $("#txtIngresoObservacion").attr("disabled", "disabled");
                }
                else {
                    $("#txtIngresoObservacion").removeAttr("disabled");
                }
            }
            else {
                $("#txtIngresoObservacion").attr("disabled", "disabled");
            }
        }

        if (vcTabla == "Nuevo" || vcTabla == "Cambio") {
            if (typeof $("#txtIMEI_" + P_inCodSol).val() !== 'undefined') {
                if ($("#txtIMEI_" + P_inCodSol).hasClass("bloqueado")) {
                    $("#txtIngresoObservacion").attr("disabled", "disabled");
                }
                else {
                    $("#txtIngresoObservacion").removeAttr("disabled");
                }
            }
            else {
                $("#txtIngresoObservacion").attr("disabled", "disabled");
            }
        }

        var oThisObs = this;
        $("#txtIngresoObservacion").val(Mensaje);
        $("#dvIngreso_Observacion").dialog({
            title: 'Descripción del Equipo',
            width: 550,
            height: 210,
            modal: true,
            resizable: false,
            buttons: {
                Aceptar: function () {
                    $(oThisObs).attr("mensaje", $("#txtIngresoObservacion").val());
                    $(this).dialog("close");
                },
                Cerrar: function () {
                    $(this).dialog("close");
                }
            }
        });
    });
}



function SaveToDisk(fileURL, fileName) {
    // for non-IE
    try {
        if (!window.ActiveXObject) {
            var save = document.createElement('a');
            save.href = fileURL;
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
            var _window = window.open(fileURL, "_blank");
            _window.document.close();
            _window.document.execCommand('SaveAs', true, fileName || fileURL);
            _window.close();
        }
    } catch (e) {
    }
}


function chkMismoEquipo_change(obj) {
    var MismoEquipo = $(obj).is(':checked');
    var IdSolicitud = $(obj).attr("IdSolicitud");

    var lista = $("#gridIngreso").getDataIDs();
    var rowData = null;
    for (j = 0; j < lista.length; j++) {
        rowData = $("#gridIngreso").getRowData(lista[j]);
        if (rowData.P_inCodSol == IdSolicitud) {
            break;
        }
        rowData = null;
    }
    if (rowData == null) { return; }

    if (MismoEquipo) {
        $("#txtNuevoIMEI_" + IdSolicitud).val(rowData.Grilla_IMEI);
        $("#txtSerie_" + IdSolicitud).val(rowData.SerieInicial);
        //$("#txtNuevoIMEI_" + IdSolicitud).attr("disabled", "disabled");
        //$("#txtSerie_" + IdSolicitud).attr("disabled", "disabled");
    }
    else {
        $("#txtNuevoIMEI_" + IdSolicitud).val("");
        $("#txtSerie_" + IdSolicitud).val("");
        //$("#txtNuevoIMEI_" + IdSolicitud).removeAttr("disabled");
        //$("#txtSerie_" + IdSolicitud).removeAttr("disabled");
    }
}

function LimpiarInputsCabecera() {
    $("#gs_Grilla_IMEI").val("");
    $("#gs_EMPL_vcNOMEMP").val("");
    $("#gs_Grilla_F_vcNumLin").val("");
    $("#gs_Modelo").val("");
    $("#gs_NuevoIMEI").val("");
    $("#gs_Grilla_IMEI").val("");
    $("#gs_Grilla_Serie").val("");
    $("#gs_Grilla_MesesContrato").val("");
    $("#gs_Grilla_FechaInicioContrato").val("");
    $("#gs_EstadoSolicitud").val("");
}

function fnChange_Grilla_IMEI(obj, rowId) {
    $("#gridIngreso").jqGrid("setCell", parseInt(rowId), "Grilla_IMEI", $(obj).val());
}
function fnChange_Grilla_F_vcNumLin(obj, rowId) {
    $("#gridIngreso").jqGrid("setCell", parseInt(rowId), "Grilla_F_vcNumLin", $(obj).val());
}
function fnChange_Grilla_Serie(obj, rowId) {
    $("#gridIngreso").jqGrid("setCell", parseInt(rowId), "Grilla_Serie", $(obj).val());
}
function fnChange_Grilla_ICC(obj, rowId) {
    $("#gridIngreso").jqGrid("setCell", parseInt(rowId), "Grilla_ICC", $(obj).val());
}

function fnChange_Grilla_FechaInicioContrato(obj, rowId) {
    $("#gridIngreso").jqGrid("setCell", parseInt(rowId), "Grilla_FechaInicioContrato", $(obj).val());
    $(".DATE").datepicker({
        showOn: "focus",
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy' // See format options on parseDate
    });
}

function txtNuevoIMEI_change(obj) {
    var IdSolicitud = $(obj).attr("IdSolicitud");

    var lista = $("#gridIngreso").getDataIDs();
    var rowData = null;
    for (j = 0; j < lista.length; j++) {
        rowData = $("#gridIngreso").getRowData(lista[j]);
        if (rowData.P_inCodSol == IdSolicitud) {
            break;
        }
        rowData = null;
    }
    if (rowData == null) { return; }

    if ($.trim($(obj).val()) != rowData.Grilla_IMEI) {
        $("#chkMismoEquipo_" + IdSolicitud).prop('checked', false);
        $("#txtSerie_" + IdSolicitud).val("");
    }
    else {
        $("#chkMismoEquipo_" + IdSolicitud).prop('checked', true);
        $("#txtSerie_" + IdSolicitud).val(rowData.SerieInicial);
    }
}
