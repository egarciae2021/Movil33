var indiceTab;
var vcCodImeiLigero;
var vcNomDispLigero;
var vcFechaAsignacionDispositivo = '';
var FormatoFechaCulturaForDatePicker = "";
var oCulturaUsuario;

var CodEmpleadoOriginal = "";
var PermitirGuardar = true;
function ENT_MOV_Dispositivo(P_vcCodIMEI, inCodModDis, F_vcCodEmp, btVig, F_inCodTipAdq, btSopLin, F_inCodTip) {
    this.P_vcCodIMEI = P_vcCodIMEI;
    this.inCodModDis = inCodModDis;
    this.F_vcCodEmp = F_vcCodEmp;
    this.btVig = btVig;
    this.F_inCodTipAdq = F_inCodTipAdq;
    this.btSopLin = btSopLin;
    this.F_inCodTip = F_inCodTip;
}

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

function isIE() { //Vefiricar Version del Internet Explorer
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

function ObtenerDatosModeloDispositivosLigero(vcCod, vcNomModeloDisp) {
    $("#dvAgregarModeloDispositivo").dialog("close");
    Selecciono = true;
    $("#txt_Dispositivos").val(vcNomModeloDisp);
    $("#hdfCodDispositivos").val(vcCod);
}

function CerroMensaje() {
    BloquearPagina(false);
    if ($("#hdfOcultarCamposLigero").val() == "1") {
        window.parent.ObtenerDatosDispositivosLigero(vcCodImeiLigero, vcNomDispLigero);
    }
    if ($("#hdfDispositivo").val() == "") {//Nuevo
        window.location.reload();
        ////$("#txtCodigo").val("");
        //////$("#ddlTipoAdquisicion").prop('selectedIndex', 0);
        //////$("#ddlTipoAdquisicion").data("kendoComboBox").select(0);
        //////$("#trEmpleado").hide();
        ////$("#trFechaAsignacionLinea").hide();
        ////$("#txtFechaAsignacionLinea").val("");
        ////if (isIE() > 8) {
        ////    $("#ddlSopLin").data("kendoComboBox").select(0);
        ////    $("#ddlTipoAdquisicion").data("kendoComboBox").select(0);
        ////    $("#ddlLineaTipo").data("kendoComboBox").select(0);
        ////    $('#ddlModelo :nth-child(0)').attr('selected', 'selected');
        ////    $('#ddlModelo').val('35');
        ////} else {
        ////    $("#ddlSopLin").val(-1);
        ////    $("#ddlTipoAdquisicion").val(-1);
        ////    $("#ddlLineaTipo").val(-1);
        ////    $('#ddlModelo :nth-child(0)').attr('selected', 'selected');
        ////    $('#ddlModelo').val('35');
        ////}
        ////$("#hdfCodDispositivos").val("-1");
        ////$("#txt_Dispositivos").val("");
        ////$("#txtEmpleado").val("");
        ////$("#txtLinea").val("");
        ////$("#txtLinea").attr("disabled", true);
        //////$("#lblPlanLinea").text("");
        ////$("#dvInfoLinea").hide();
        ////$("#hdfCodEmpleado").val("");
        ////$(".VARCHAR").val("");
        ////$(".INT").val("");
        ////$(".DECIMAL").val("");
        ////$(".DATE").val("");
        ////$(".DATETIME").val("");
        ////$("#txtCodigo").focus("");

        ////$("#trCampana").hide();
        ////$("#ddlCampana").val(-1);
    }
    else {
        window.parent.tab.tabs("remove", indiceTab);
    }
}

var SeleccionoModelo;
var tblResponsable;
$(function () {

    CodEmpleadoOriginal = $("#hdfCodEmpleado").val();

    Mantenimiento_Mostrar_VARBINARY("", "../../../");

    if ($("#hdfOcultarCamposLigero").val() == "1") {
        //oCulturaUsuario = window.parent.oCulturaUsuario;
        CargaCultura();
    } else {
        oCulturaUsuario = window.parent.parent.parent.oCulturaUsuario;
        Inicio();
        //FormatoFechaCulturaForDatePicker = oCulturaUsuario.vcFecCor.toLowerCase();
    }

    function Inicio() {
        FormatoFechaCulturaForDatePicker = oCulturaUsuario.vcFecCor.toLowerCase();

        if (FormatoFechaCulturaForDatePicker.indexOf("yyyy") >= 0) {
            FormatoFechaCulturaForDatePicker = FormatoFechaCulturaForDatePicker.replace("yyyy", "yy");  //Para datepicker 'yy' es como 'yyyy'; y 'y' es 'yy'
        }
        else if (FormatoFechaCulturaForDatePicker.indexOf("yy") >= 0) {
            FormatoFechaCulturaForDatePicker = FormatoFechaCulturaForDatePicker.replace("yy", "y");
        }
    }

    function CargaCultura() {
        if (oCulturaUsuario == undefined) {
            $.ajax({
                type: "POST",
                url: "../../../Common/WebService/General.asmx/ObtenerCulturaPrincipalUsuario",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    oCulturaUsuario = result.d;

                    Inicio();
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        } else {
            //Inicio();
        }
    }

    tblResponsable = $("#tblResponsable").jqGrid({
        datatype: "local",
        colModel: [{ name: 'vcCodInt', index: 'vcCodInt', label: 'Código Int', width: 100, hidden: true },
                   { name: 'vcCodOrga', index: 'vcCodOrga', label: 'Código Org.', width: 50, hidden: false },
   		           { name: 'vcArea', index: 'vcArea', label: 'Area', width: 230, hidden: false },
   		           { name: 'vcCodEmpleado', index: 'vcCodEmpleado', label: 'Código Emp.', width: 50, hidden: false },
                   { name: 'vcNomEmpleado', index: 'vcNomEmpleado', label: 'Empleado', width: 200, hidden: false },
                   { name: 'vcCorreo', index: 'vcCorreo', label: 'Correo', width: 70, hidden: false }
        ],
        sortname: "vcCodInt", //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: "750",
        height: "85",
        caption: "Empleado Responsable"
    });



    $("#txtCodigo").focus();
    //$("#hdfCodDispositivos").val('-1');

    if ($("#hdfDispositivo").val() == '') { //nuevo
        SeleccionoModelo = false;
        $("#hdfCodDispositivos").val('-1');
    } else { //editar
        SeleccionoModelo = true;
        $("#btnLiberarDispositivo").show();
    }

    $("#txtFechaAsignacionLinea").datepicker({
        changeMonth: true,
        changeYear: true
    });

    if ($("#hdfCodEmpleado").val() != '') {
        $("#txtEmpleado").attr("disabled", true);
    } else {
        $("#txtEmpleado").attr("disabled", false);
    }

    if ($("#hdfOcultarCamposLigero").val() != "1") {
        try {
            indiceTab = window.parent.tab.tabs("option", "selected");
        } catch (e) {
        }        
    }

    if ($("#LblAsignacionDispositivo").html() == 'Fecha desvinculación') {
        $("#txtFechaAsignacionLinea").attr("disabled", true);
        //$("#btnEditarFechaAsignacionLinea").hide();
    } else {
        if ($("#hdfFechaAsignacionDispositivo").val() != '') {
            $("#txtFechaAsignacionLinea").attr("disabled", true);
            //$("#btnEditarFechaAsignacionLinea").show();
        }
    }

    var Selecciono = false;
    var idCliente = window.top.idCliente;

    IniciarPagina();
    if (isIE() > 8) {
        ActivarCombokendo("#ddlTipoAdquisicion", 120);
        ActivarCombokendo("#ddlLineaTipo", 120);
    }
    ValidarNumeroEnCajaTexto("TxtMontoDispositivo", ValidarDecimalPositivo, oCulturaUsuario, true);
    $("#txtFechaAsignacionLinea").datepicker('option', 'dateFormat', FormatoFechaCulturaForDatePicker);
    $("#txtCodigo").keypress(ValidarNoEspacio);   // $("#txtCodigo").keypress(ValidarCodigoVarChar);
    $("#txt_Dispositivos").keypress(ValidarAlfaNumericoConEspacios);  // $("#txt_Dispositivos").keypress(ValidarAlfaNumericoConEspacios);
    $("#txtEmpleado").keypress(ValidarAlfaNumericoConEspacios);   // $("#txtEmpleado").keypress(ValidarAlfaNumericoConEspacios);
    $("#txtLinea").keypress(ValidarEntero);   // $("#txtEmpleado").keypress(ValidarAlfaNumericoConEspacios);
    //ValidarNumeroEnCajaTexto("txtCodigo", ValidarDecimalPositivo);
    ValidarNumeroEnCajaTexto("txtCodigo", ValidarSoloEntero);

    $(".btnNormal").button();

    $("#txtCodigo").keypress(ValidarEntero);
    $(".VARCHAR").keypress(ValidarCadena);
    $(".INT").keypress(ValidarEntero);
    $(".DECIMAL").keypress(ValidarDecimal);
    $(".DATE").keypress(ValidarFecha);
    $(".DATETIME").keypress(ValidarFechaHora);

    $(".DATETIME").AnyTime_picker({
        format: "%d/%m/%Y %H:%i:%s",
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

    $(".DATE").datepicker({
        changeMonth: true,
        changeYear: true
    });

    function IniciarPagina() {
        DimPosElementos();
        if ($("#hdfEstadoDispositivo").val() == "True" && $("#hdfEstadoEmpleado").val() == "False") {
            if ($("#hdfEmplResponsable").val() != "") {
                var EmpleadosResponsables = JSON.parse($("#hdfEmplResponsable").val());
                $(EmpleadosResponsables).each(function () {
                    $("#tblResponsable").jqGrid('addRowData', this.vcCodInt, { 'vcCodInt': this.vcCodInt, 'vcCodOrga': this.vcCodOrga, 'vcArea': this.vcArea, 'vcCodEmpleado': this.vcCodEmpleado, 'vcNomEmpleado': this.vcNomEmpleado, 'vcCorreo': this.vcCorreo });
                });
            }
        }
    }

    $(window).resize(function () {
        DimPosElementos();
    });

    function DimPosElementos() {
        var Alto = $(window).height();
        //$("#dvCampo").css({ height: Alto - 80 });
        if (Alto >= 250 ) {
            $("#dvCampo").css({ height: Alto - 140 });
            //$("#dvCampo").css({ 'overflow-y': 'scroll' });
        }
    }


    //Soporta linea
    $("#ddlSopLin").change(function () {
        if ($("#ddlSopLin").val() != "0") {
            $("#trEmpleado").hide(300);
            $("#hdfNumLinea").val("");
            $("#txtLinea").val("");
            //$("#lblPlanLinea").text("");
            $("#dvInfoLinea").hide();
            $("#trLinea").show(300);
        } else {
            $("#trEmpleado").show(300);
            $("#hdfNumLinea").val("");
            $("#txtLinea").val("");
            //$("#lblPlanLinea").text("");
            $("#dvInfoLinea").hide();
            $("#trLinea").hide(300);
        }
    });

    //fin soporta liena
    ///////////////////////////////
    $("#txt_Dispositivos").keypress(function (e) {
        if (e.keyCode == 13) {
            $("#ddlTipoAdquisicion").focus();
        } else {
            SeleccionoModelo = false;
        }
    });

    if (isIE() > 8) {
        ActivarCombokendo("#ddlSopLin", 50);
    }
    //    $("#txt_Dispositivos").focusout(function () {
    //        if (!Selecciono) {
    //            $.ajax({
    //                type: "POST",
    //                url: "../../../Common/WebService/General.asmx/ListarModDispAutoc",
    //                data: "{'maxFilas': '" + 100 + "'," +
    //                                               "'vcNomAre': '" + $("#txt_Dispositivos").val() + "'," + "'idCliente': '" + $("#hdfCodCliente").val() + "'}",
    //                contentType: "application/json; charset=utf-8",
    //                dataType: "json",
    //                success: function (result) {
    //                    if ($(result.d).length > 0) {
    //                        for (var iEmpleado in result.d) {
    //                            if ($("#hdfCodEmpleado").val() == result.d[iEmpleado].P_vcCod) {
    //                                $("#hdfCodEmpleado").val(result.d[iEmpleado].P_vcCod);
    //                                $("#lblCentroCosto").html(result.d[iEmpleado].CentroCosto.P_vcCodCenCos + " - " + result.d[iEmpleado].CentroCosto.vcNomCenCos);
    //                                Selecciono = true;
    //                                break;
    //                            }
    //                        }
    //                    }
    //                    else {
    //                        $("#hdfCodEmpleado").val("");
    //                        $("#lblCentroCosto").html("");
    //                        Selecciono = false;
    //                    }
    //                },
    //                error: function (xhr, err, thrErr) {
    //                    MostrarErrorAjax(xhr, err, thrErr);
    //                }
    //            });
    //        }
    //    });

    $("#txt_Dispositivos").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "../../../Common/WebService/General.asmx/ListarModDispAutoc",
                data: "{'maxFilas': '" + 100 + "'," +
                                               "'vcNomAre': '" + $("#txt_Dispositivos").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'," + "'idCliente': '" + $("#hdfCodCliente").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: $.trim(item.vcNom).replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'),
                            P_inCod: $.trim(item.P_inCod),
                            btSopLin: $.trim(item.btSopLin),
                            F_inCodTipSer: $.trim(item.F_inCodTipSer),
                        };
                    }));
                },
                cache: false,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alerta(errorThrown);
                }
            });
        },
        focus: function (event, ui) {
            $("#txt_Dispositivos").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {

            if ($("#hdfCodDispositivos").val() == ui.item.P_inCod) {
                return;
            }

            SeleccionoModelo = true;
            
            $("#txt_Dispositivos").val(ui.item.label);
            $("#hdfCodDispositivos").val(ui.item.P_inCod);
            //RRAMOS
            $("#hdfTipoServicioModelo").val(ui.item.F_inCodTipSer);

            if ($("#hdfTipoServicioModelo").val() != "" && $("#hdfTipoServicioCuenta").val() != "") {
                if ($("#hdfTipoServicioModelo").val() != $("#hdfTipoServicioCuenta").val()) {
                    $("#dvToolTipRed_l").show();
                    $("#dvToolTipRed_m").show();
                    $("#hdfPermitirGuardarTipSer").val("0");
                } else {
                    $("#dvToolTipRed_l").hide();
                    $("#dvToolTipRed_m").hide();
                    $("#hdfPermitirGuardarTipSer").val("1");
                }
            }

            $("#txtEmpleado").attr("disabled", false);
            if (ui.item.btSopLin == "false") {
                //$("#ddlSopLin").data("kendoComboBox").value("0");
                //$("#ddlSopLin").data("kendoComboBox").enable(false);
                //$("#trEmpleado").show(300);
                //$("#trLinea").hide(300);
                if (isIE() > 8) {
                    $("#ddlSopLin").data("kendoComboBox").value("0");
                    $("#ddlSopLin").data("kendoComboBox").enable(false);
                    if ($("#hdfOcultarCamposLigero").val() != "1") {
                        $("#trEmpleado").show(300);
                    }
                    $("#trLinea").hide(300);
                } else {
                    $("#ddlSopLin").val("-1");
                    $("#ddlSopLin").attr("disabled", false);
                    if ($("#hdfOcultarCamposLigero").val() != "1") {
                        $("#trEmpleado").show(300);
                    }
                    $("#trLinea").hide(300);
                }
            } else {
                //$("#ddlSopLin").data("kendoComboBox").value("1");
                //$("#ddlSopLin").data("kendoComboBox").enable(true);
                //$("#trEmpleado").hide(300);
                //$("#trLinea").show(300);
                if (isIE() > 8) {
                    $("#ddlSopLin").data("kendoComboBox").value("1");
                    $("#ddlSopLin").data("kendoComboBox").enable(true);
                    //$("#trEmpleado").hide(300);
                    if ($("#hdfOcultarCamposLigero").val() != "1") {
                        $("#trLinea").show(300);
                    }
                } else {
                    $("#ddlSopLin").val("-1");
                    $("#ddlSopLin").attr("disabled", true);
                    //$("#trEmpleado").hide(300);
                    if ($("#hdfOcultarCamposLigero").val() != "1") {
                        $("#trLinea").show(300);
                    }
                }
            }

            $("#ddlTipoAdquisicion").focus();
            $("#hdfCodEmpleado").val("");
            $("#txtEmpleado").val("");

            // // //limpiar plan
            // // $("#txtLinea").val('');
            // // $("#hdfNumLinea").val('');

            //$("#lblPlanLinea").text("");
            $("#dvInfoLinea").hide();
            return false;
        },
        change: function (event, ui) {
            if (!SeleccionoModelo) {
                $("#hdfCodDispositivos").val("-1");
                $("#txt_Dispositivos").val('');
                //limpiar plan
                // // $("#txtLinea").val('');
                // // $("#hdfNumLinea").val('');
                //$("#lblPlanLinea").text("");
                $("#dvInfoLinea").hide();
            }
            return false;
        },
        open: function (event, ui) {
            SeleccionoModelo = false;
            return false;
        }
    })
                .data("autocomplete")._renderItem = function (ul, item) {
                    return $("<li></li>")
            			.data("item.autocomplete", item)
                    //.append("<a>" + item.VCNOMORG + "<br>" + item.label + "</a>")
                        .append("<a>" + item.label + "</a>")
                    //.append("<a>" + item.P_inCod + " - " + item.label + "</a>")
            			.appendTo(ul);

                };
    //////////////////////////////////
    $("#txtEmpleado").focusout(function () {
        if (!Selecciono) {
            $.ajax({
                type: "POST",
                url: "Mnt_Dispositivo.aspx/ListarEmpleado",
                data: "{'maxFilas': '" + 200 + "'," +
                               "'vcNomEmp': '" + $("#txtEmpleado").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'," +
                               "'incodModDis': '" + $("#hdfCodDispositivos").val() + "'," +
                               "'idCliente': '" + idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if ($(result.d).length == 1) {
                        $("#hdfCodEmpleado").val(result.d[0].P_vcCod);
                        //$("#lblCentroCosto").html(result.d[0].CentroCosto.P_vcCodCenCos + " - " + result.d[0].CentroCosto.vcNomCenCos);
                        Selecciono = true;
                    }
                    else {
                        $("#hdfCodEmpleado").val("");
                        $("#txtEmpleado").val("");
                        //$("#lblCentroCosto").html("");
                        Selecciono = false;
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
    });

    //if ($('#txtEmpleado').is(':visible')) {
    $("#txtEmpleado").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                //url: "../../../Common/WebService/General.asmx/ListarEmpleado",
                url: "Mnt_Dispositivo.aspx/ListarEmpleado",
                data: "{'maxFilas': '" + 200 + "'," +
                               "'vcNomEmp': '" + $("#txtEmpleado").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'," +
                               "'incodModDis': '" + $("#hdfCodDispositivos").val() + "'," +
                               "'idCliente': '" + idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: item.vcNom.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'),
                            vcCodEmp: item.P_vcCod,
                            category: item.Grupo.vcNom,
                            inCodGru: item.Grupo.P_inCod,
                            vcCodCenCos: item.CentroCosto.P_vcCodCenCos,
                            vcNomCenCos: item.CentroCosto.vcNomCenCos
                        };
                    }));
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        focus: function (event, ui) {
            $("#txtEmpleado").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            Selecciono = true;

            $("#txtEmpleado").val(ui.item.label);
            $("#hdfCodEmpleado").val(ui.item.vcCodEmp);

            $("#txtLinea").val("");
            $("#hdfNumLinea").val("");
            //$("#lblCentroCosto").html(ui.item.vcCodCenCos + " - " + ui.item.vcNomCenCos);
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono) {
                $("#hdfCodEmpleado").val("");
                $("#txtEmpleado").html("");
                $("#lblCentroCosto").html("");
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
			.append("<a>" + item.vcCodEmp + "=" + item.label + "</a>")
			.appendTo(ul);
    };
    //}

    //$("#txtLinea").focusout(function () {
    //    //if ($("#hdfIMEI").val() == '') {
    //    if (!Selecciono) {
    //        $.ajax({
    //            type: "POST",
    //            url: "Mnt_Dispositivo.aspx/ListarLineasDisponibleTipoLinea",
    //            data: "{'inMaxFilas': '" + 200 + "'," +
    //                  "'vcNumLin': '" + $("#txtLinea").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'," +
    //                  "'inTipLin': '" + $("#ddlLineaTipo").val() + "'," +
    //                  "'inCodEmp': '" + $("#hdfCodEmpleado").val() + "'," +
    //            //"'inCodMod': '" + $("#hdfCodDispositivos").val() == '' || $("#hdfCodDispositivos").val() == '-1' || $("#hdfCodDispositivos").val() == null || $("#hdfCodDispositivos").val() == undefined ? 0 : $("#hdfCodDispositivos").val() + "'," +
    //                  "'inCodMod': '" + $("#hdfCodDispositivos").val() + "'," +
    //                  "'vcCodIMEI': '" + $("#hdfIMEI").val() + "'," +
    //                  "'idCliente': '" + idCliente + "'}",
    //            contentType: "application/json; charset=utf-8",
    //            dataType: "json",
    //            success: function (result) {
    //
    //                if ($(result.d).length == 1) {
    //                    if ($("#txtLinea").val() == '') {
    //                        $("#hdfNumLinea").val("");
    //                        $("#txtLinea").val("");
    //                        //$("#lblPlanLinea").text("");
    //                        $("#dvInfoLinea").hide();
    //                        $("#hdfCodEmpleado").val("");
    //                        $("#txtEmpleado").val("");
    //                        $("#lblMensaje").hide();
    //                    } else {
    //                        $("#hdfNumLinea").val($("#hdfLineaActual").val());
    //                        $("#txtLinea").val($("#hdfLineaActual").val());
    //                        $("#lblMensaje").show();
    //                        Selecciono = true;
    //                    }
    //                }
    //                else {
    //                    if ($("#txtLinea").val() == '') {
    //                        $("#hdfNumLinea").val("");
    //                        $("#txtLinea").val("");
    //                        //$("#lblPlanLinea").text("");
    //                        $("#dvInfoLinea").hide();
    //                        $("#hdfCodEmpleado").val("");
    //                        $("#txtEmpleado").val("");
    //                        $("#lblMensaje").hide();
    //                    } else {
    //                        $("#hdfNumLinea").val($("#hdfLineaActual").val());
    //                        $("#txtLinea").val($("#hdfLineaActual").val());
    //                        $("#lblMensaje").show();
    //                    }
    //                    Selecciono = false;
    //                }
    //                //                    if ($(result.d).length == 1) {
    //                //                        $("#hdfNumLinea").val($("#hdfLineaActual").val());
    //                //                        $("#txtLinea").val($("#hdfLineaActual").val());
    //                //                        Selecciono = true;
    //                //                    }
    //                //                    else {
    //                //                        $("#hdfNumLinea").val($("#hdfLineaActual").val());
    //                //                        $("#txtLinea").val($("#hdfLineaActual").val());
    //                //                        Selecciono = false;
    //                //                    }
    //            },
    //            error: function (xhr, err, thrErr) {
    //                MostrarErrorAjax(xhr, err, thrErr);
    //            }
    //        });
    //    }
    //    //}
    //});

    //if ($('#txtEmpleado').is(':visible')) {
    //alert($("#hdfIMEI").val());
    $("#txtLinea").autocomplete({
        minLength: 0,
        source: function (request, response) {

            var CodIMEI = "";
            if (CodEmpleadoOriginal != $("#hdfCodEmpleado").val() && $("#hdfCodEmpleado").val() != "") {
                CodIMEI = "";
            }
            else {
                CodIMEI = $("#hdfIMEI").val();
            }

            $.ajax({
                type: "POST",
                url: "Mnt_Dispositivo.aspx/ListarLineasDisponibleTipoLinea",
                data: "{'inMaxFilas': '" + 200 + "'," +
                      "'vcNumLin': '" + $("#txtLinea").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'," +
                      "'inTipLin': '" + $("#ddlLineaTipo").val() + "'," +
                      "'inCodEmp': '" + $("#hdfCodEmpleado").val() + "'," +
                //"'inCodMod': '" + $("#hdfCodDispositivos").val() == '' || $("#hdfCodDispositivos").val() == '-1' || $("#hdfCodDispositivos").val() == null || $("#hdfCodDispositivos").val() == undefined ? 0 : $("#hdfCodDispositivos").val() + "'," +
                      "'inCodMod': '" + $("#hdfCodDispositivos").val() + "'," +
                      "'vcCodIMEI': '" + CodIMEI + "'," +
                      "'idCliente': '" + idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    //alert($("#hdfCodDispositivos").val());
                    response($.map(result.d, function (item) {
                        return {
                            label: item.P_vcNum.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'),
                            P_vcNumLin: item.P_vcNum,
                            codPlan: item.Plan.P_inCod,
                            nomAsigCred: item.Cuenta.TipoAsignacionCredito.vcNom,
                            nomCue: item.Cuenta.vcNom,
                            nomPlan: item.Plan.vcNom,
                            codEmpl: item.Empleado.P_vcCod,
                            nomEmpl: item.Empleado.vcNom,
                            F_inCodTipSer: item.Cuenta.TipoServicio
                        };
                    }));
                },
                cache: false,
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
            //Selecciono = true;
            $("#txtLinea").val(ui.item.label);
            $("#hdfNumLinea").val(ui.item.P_vcNumLin);
            //RRAMOS
            $("#hdfTipoServicioCuenta").val(ui.item.F_inCodTipSer);
            if ($("#hdfTipoServicioModelo").val() != "" && $("#hdfTipoServicioCuenta").val() != "") {
                if ($("#hdfTipoServicioModelo").val() != $("#hdfTipoServicioCuenta").val()) {
                    $("#dvToolTipRed_l").show();
                    $("#dvToolTipRed_m").show();
                    $("#hdfPermitirGuardarTipSer").val("0");
                } else {
                    $("#dvToolTipRed_l").hide();
                    $("#dvToolTipRed_m").hide();
                    $("#hdfPermitirGuardarTipSer").val("1");
                }
            }
            //alert(ui.item.nomEmpl);
            $("#infoLinea_DvMiMensaje").html('');
            $("#dvInfoLinea").show();
            $("#dvInfoTipoLinea").hide();
            if (ui.item.codPlan == 0) { //asignacion por bolsa                
                $("#infoLinea_DvMiMensaje").html(ui.item.nomAsigCred + ": " + ui.item.nomCue);
                //$("#lblPlanLinea").text(ui.item.nomAsigCred + ": " + ui.item.nomCue);
            } else {
                $("#infoLinea_DvMiMensaje").html(ui.item.nomAsigCred + ": " + ui.item.nomPlan);
                //$("#lblPlanLinea").text(ui.item.nomAsigCred + ": " + ui.item.nomPlan);
            }
            if (ui.item.P_vcCodIMEI != '') {
                $("#trFechaAsignacionLinea").show();
                $("#txtFechaAsignacionLinea").attr("disabled", false);
                $("#LblAsignacionDispositivo").html("Asignación Dispositivo");
                if (vcFechaAsignacionDispositivo != "") {
                    $("#txtFechaAsignacionLinea").val(vcFechaAsignacionDispositivo);
                } else {
                    $("#txtFechaAsignacionLinea").focus();
                }
            }
            if (ui.item.codEmpl != '') {
                $("#txtEmpleado").val(ui.item.nomEmpl);
                $("#hdfCodEmpleado").val(ui.item.codEmpl);
                $("#txtEmpleado").attr("disabled", "disabled");
            } else {
                $("#txtEmpleado").attr("disabled", false);
                $("#txtEmpleado").val("");
            }
            //$("#txtEmpleado").attr("disabled", true);

            //$("#lblCentroCosto").html(ui.item.vcCodCenCos + " - " + ui.item.vcNomCenCos);
            return false;
        },
        change: function (event, ui) {
            //if (!Selecciono) {
            if (!ui.item) {
                $("#hdfNumLinea").val("");
                $("#txtLinea").val("");
                //$("#lblPlanLinea").text("");
                $("#dvInfoLinea").hide();
                $("#dvInfoTipoLinea").show();
                $("#InfoTipoLinea_DvMiMensaje").html("La Línea debe estar disponible, y el modelo del dispositivo seleccionado debe estar asociado a un plan y/o cuenta.");
                $("#hdfCodEmpleado").val("");
                $("#txtEmpleado").val("");

                //$("#ddlSopLin").data("kendoComboBox").enable(true);
                if (isIE() > 8) {
                    $("#ddlSopLin").data("kendoComboBox").enable(true);
                } else {
                    $("#ddlSopLin").attr("disabled", true);
                }
                $("#txtEmpleado").attr("disabled", false);
                //$("#trEmpleado").hide();

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
                        //.append("<a>" + item.VCNOMORG + "<br>" + item.label + "</a>")
                        .append("<a>" + item.label + "</a>")
                        //.append("<a>" + item.P_inCod + " - " + item.label + "</a>")
            			.appendTo(ul);

                    };
    $("#txtLinea").focusout(function () {
        if ($("#txtLinea").val() == "") {
            $("#LblAsignacionDispositivo").html("Fecha desvinculación");
            vcFechaAsignacionDispositivo = $("#txtFechaAsignacionLinea").val();
            $("#txtFechaAsignacionLinea").val("");
            //$("#txtFechaAsignacionLinea").focus();
            $("#txtFechaAsignacionLinea").attr("disabled", false);
            //$("#btnEditarFechaAsignacionLinea").hide();
            //$("#trEmpleado").hide();
        }
    });

    $("#btnGuardar").live("click", function () {
        var oDispositivo = new ENT_MOV_Dispositivo();
        //var Codigo = $("#txtCodigo").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        //oDispositivo.P_vcCodIMEI = $("#txtCodigo").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        var Codigo;
        if (isIE() > 8) {
            Codigo = $("#txtCodigo").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        } else {
            Codigo = $("#txtCodigo").val();
        }

        if (isIE() > 8) {
            oDispositivo.P_vcCodIMEI = $("#txtCodigo").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        } else {
            oDispositivo.P_vcCodIMEI = $("#txtCodigo").val();
        }

        oDispositivo.inCodModDis = $("#hdfCodDispositivos").val();
        oDispositivo.F_vcCodEmp = $("#hdfCodEmpleado").val();
        oDispositivo.btVig = false;
        oDispositivo.F_inCodTipAdq = $("#ddlTipoAdquisicion").val();
        oDispositivo.F_inCodTip = $("#ddlLineaTipo").val();
        oDispositivo.idCampana = $("#ddlCampana").val();

        if ($("#ddlSopLin").val() == "0") {
            oDispositivo.btSopLin = "False";
        } else {
            oDispositivo.btSopLin = "True";
            //if ($("#hdfDispositivo").val() == '') { //nuevo
            //    oDispositivo.F_vcCodEmp = "";
            //}
        }

        if ($('#chkEstado').is(':checked')) {
            oDispositivo.btVig = true;
        }

        var CamposDinamicos = "";

        if (Codigo == "") {
            alerta("El Código es un campo obligatorio");
            $("#txtCodigo").focus();
            return;
        }
        if (oDispositivo.inCodModDis == "-1") {
            alerta("Seleccione un Modelo de Dispositivo es campo obligatorio");
            $("#ddlModelo").focus();
            return;
        }
        if (oDispositivo.F_inCodTipAdq == "-1") {
            //alerta("Seleccione un Tipo de Adquisición, es campo obligatorio");
            //$("#ddlTipoAdquisicion").focus();
            //return;
        }
        if (oDispositivo.F_inCodTip == "-1") {
            oDispositivo.F_inCodTip = 1;
            ////alerta("Seleccione un tipo de línea, es un campo obligatorio");
            ////$("#ddlLineaTipo").focus();
            ////return;
        }

        //if ($("#hdfPermitirGuardarTipSer").val() == "0") {
        //    alerta("El tipo de servicio asociado al Modelo de Dispositivo y el tipo de servicio asociado a la Cuenta de la Línea no son compatibles.");
        //    $("#txt_Dispositivos").focus();
        //    return;
        //}

        var dtAsignacionLinea;
        var dtAsignacionLinea = $("#txtFechaAsignacionLinea").datepicker("getDate");
        if (dtAsignacionLinea == null) {
            dtAsignacionLinea = "";
        } else {
            var DiaAsigLinea = dtAsignacionLinea.getDate().toString();
            var MesAsigLinea = (parseInt(dtAsignacionLinea.getMonth()) + 1).toString();
            var AnoAsigLinea = dtAsignacionLinea.getFullYear().toString();
            if (DiaAsigLinea.length < 2)
            { DiaAsigLinea = "0" + DiaAsigLinea; }
            if (MesAsigLinea.length < 2)
            { MesAsigLinea = "0" + MesAsigLinea; }
            dtAsignacionLinea = AnoAsigLinea + MesAsigLinea + DiaAsigLinea;
        }

        var strDispositivo = JSON.stringify(oDispositivo);

        $(".VARCHAR").each(function (i) {
            CamposDinamicos += "[" + $(this).attr("obj") + "]";
            CamposDinamicos += " = \"";
            CamposDinamicos += this.value.replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
            CamposDinamicos += "\",";
        });

        var ValidacionNumerica = true;
        $(".INT").each(function (i) {
            CamposDinamicos += "[" + $(this).attr("obj") + "]";
            CamposDinamicos += " = ";
            if ($.trim(this.value) == "") {
                CamposDinamicos += "0";
            }
            else {
                CamposDinamicos += this.value.replace(new RegExp('\\' + oCulturaUsuario.vcSimSepMil, 'g'), "");
                var NumeroDecimal = parseFloat(this.value.replace(new RegExp('\\' + oCulturaUsuario.vcSimSepMil, 'g'), ""));
                if (isNaN(NumeroDecimal)) { NumeroDecimal = 0; }
                if (NumeroDecimal > 99999999.99) {
                    alerta("El valor ingresado '" + this.value + "' debe ser menor.");
                    ValidacionNumerica = false;
                    return;
                }
            }
            CamposDinamicos += ",";
        });
        if (!ValidacionNumerica) { return; }

        ValidacionNumerica = true;
        $(".DECIMAL").each(function (i) {
            CamposDinamicos += "[" + $(this).attr("obj") + "]";
            CamposDinamicos += " = ";
            if ($.trim(this.value) == "") {
                CamposDinamicos += "0";
            }
            else {
                CamposDinamicos += this.value.replace(new RegExp('\\' + oCulturaUsuario.vcSimSepMil, 'g'), "");
                var NumeroDecimal = parseFloat(this.value.replace(new RegExp('\\' + oCulturaUsuario.vcSimSepMil, 'g'), ""));
                if (isNaN(NumeroDecimal)) { NumeroDecimal = 0; }
                if (NumeroDecimal > 99999999.99)
                {
                    alerta("El valor ingresado '" + this.value + "' debe ser menor.");
                    ValidacionNumerica = false;
                    return;
                }
            }
            CamposDinamicos += ",";
        });
        if (!ValidacionNumerica) { return; }

        $(".DATE").each(function (i) {
            CamposDinamicos += "[" + $(this).attr("obj") + "]";
            CamposDinamicos += " = \"";
            CamposDinamicos += this.value;
            CamposDinamicos += "\",";
        });
        $(".DATETIME").each(function (i) {
            var nVal = this.value.substring(0, 20);
            CamposDinamicos += "[" + $(this).attr("obj") + "]";
            CamposDinamicos += " = \"";
            CamposDinamicos += nVal;
            CamposDinamicos += "\",";
        });
        $(".BIT").each(function (i) {
            CamposDinamicos += "[" + $(this).attr("obj") + "]";
            CamposDinamicos += " = ";
            if ($("input", this).is(':checked') == true) {
                CamposDinamicos += "1";
            }
            else {
                CamposDinamicos += "0";
            }

            CamposDinamicos += ",";
        });
        var vcAdjuntos = "";
        $(".VARBINARY").each(function (i) {
            var vcNomCon = $(this).attr("obj");
            if ($(this).hasClass("imgButton")) { //habilitado
                if ($(this).attr("oblig") == "True" && $('#file_' + vcNomCon).text() == "") {
                    vcVacio = "1";
                } else {

                    if (this.value != "") {
                        vcAdjuntos += "[" + $(this).attr("obj") + "],";
                        vcAdjuntos += $('#file_' + vcNomCon).text() + ";";
                    }
                    else {
                        vcAdjuntos += "[" + $(this).attr("obj") + "],";
                        vcAdjuntos += ";";
                    }
                }
            }
        });

        if ($("#hdfOcultarCamposLigero").val() == "1") {
            vcCodImeiLigero = oDispositivo.P_vcCodIMEI;
            vcNomDispLigero = $("#txt_Dispositivos").val();
        }

        BloquearPagina(true);
        //alert(CamposDinamicos + '\n-' + strDispositivo + "\n-" + $("#hdfNumLinea").val());
        //return;
        $.ajax({
            type: "POST",
            url: "Mnt_Dispositivo.aspx/Guardar",
            data: "{'vcCod': '" + $("#hdfDispositivo").val() + "'," +
                   "'vcCamDim': '" + CamposDinamicos + "'," +
                   "'vcNomModDis': '" + strDispositivo + "'," +
                   "'vcAdj': '" + vcAdjuntos + "'," +
                   "'dcMonto': '" + $("#TxtMontoDispositivo").val() + "'," +                   
                   "'vcSerie': '" + $("#TxtSerie").val() + "'," +
                   "'vcAsignacionAnsiLinea': '" + dtAsignacionLinea + "'," +
                   "'vcAsignacionLinea': '" + $("#txtFechaAsignacionLinea").val() + "'," +
                   "'Linea': '" + $("#hdfNumLinea").val() + "'}",
            //            data: "{'vcCod': '" + $("#hdfDispositivo").val() + "'," +
            //                   "'vcCamDim': '" + CamposDinamicos + "'," +
            //                   "'strDispositivo': '" + strDispositivo + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == "-999") {
                    alerta("Ha superado el límite de licencia adquirido.<br>Contácte con su distribuidor.");
                    BloquearPagina(false);
                }
                else
                    if (result.d == "0" || result.d == "1") {

                        try {
                            if ($("#hdfOcultarCamposLigero").val() != "1") {
                                window.parent.ActualizarGrilla();
                            }
                        } catch (e) {
                        }

                        try {
                            window.top.fnObtenerWindowPlantillaTab().$('#div_modal').dialog('close');
                        } catch (e) {
                        }
                        
                        Mensaje("<br/><h1>Dispositivo guardado</h1><br/><h2>" + oDispositivo.P_vcCodIMEI + "</h2>", document, CerroMensaje);
                    }
                    else {
                        alerta("El código del dispositivo ya ha sido Registrado Anteriormente, no se Pudo Grabar el Registro");
                        BloquearPagina(false);
                    }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });
    });

    $("#btnCerrar").live("click", function () {
        try {
            if ($("#hdfOcultarCamposLigero").val() == "1") {
                window.parent.CerrarDialogDispositivoLigero();
            } else {
                window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
            }
        } catch (e) {
        }
        try {
            window.top.fnObtenerWindowPlantillaTab().$('#div_modal').dialog('close');
        } catch (e) {
        }
    });


    $("#btnAgregarModeloDispositivo").click(function (event) {
        //debugger;
        $('#ifAgregarModeloDispositivo').attr("src", "Mnt_ModeloDispositivo.aspx?IsLigero=1&inTipoLinea=" + $("#ddlLineaTipo").val());
        $("#ifAgregarModeloDispositivo").css("height", 300);

        //debugger;
        var alt2 = $(window).height() - 60;
        var anc2 = $(window).width() - 60;
        if ($(window).width() > 760) {
            anc2 = 750;
        }

        if ($(window).height() < 340) {
            alt2 = $(window).height() - 35;
        }
        else {
            alt2 = 345;
        }

        ModalNuevo = $('#dvAgregarModeloDispositivo').dialog({
            title: "Agregar Modelo Dispositivo",
            height: alt2,
            //width: 760,
            width: anc2,
            resizable: false,
            modal: true
        });
    });

    if ($("#txtLinea").val() != '') {
        $("#imgBorrarEmpleado").hide();
    }
    $("#imgBorrarEmpleado").click(function () {
        $("#txtEmpleado").val('');
        $("#hdfCodEmpleado").val('');
    });

    $("#ddlLineaTipo").change(function () {
        var IdLineaTipo = $(this).val();

        if ($("#txtLinea").val() != "") {
            $("#lblMsgForTipoCuenta").show();
            $("#dviMsgConfirmacionCambioTipoLinea").dialog({
                title: "Confirmación",
                modal: true,
                buttons: {
                    "Si": function () {
                        $("#hdfLineaTipoTemp").val($("#ddlLineaTipo").val());
                        if (IdLineaTipo == "-1") {
                            $("#txtLinea").attr("disabled", "disabled");
                            $("#hdfNumLinea").val("");
                            $("#txtLinea").val("");
                            $("#trCampana").hide();
                            $("#trMensaje").hide();
                            $("#dvInfoLinea").hide();
                        }
                        else {
                            $("#txtLinea").attr("disabled", false);
                            $("#hdfNumLinea").val("");
                            $("#txtLinea").val("");
                            $("#dvInfoTipoLinea").show();
                            $("#InfoTipoLinea_DvMiMensaje").html("La Línea debe estar disponible, y el modelo del dispositivo seleccionado debe estar asociado a un plan y/o cuenta.");
                            $("#dvInfoLinea").hide();
                            $("#trMensaje").hide();
                            //tipo de linea familia
                            if (IdLineaTipo == "2") {
                                $("#trCampana").show();
                            } else {
                                $("#trCampana").hide();
                            }
                        }
                        $(this).dialog("close");
                    },
                    "No": function () {
                        //$("#ddlLineaTipo").data("kendoComboBox").value($("#hdfLineaTipoTemp").val());
                        if (isIE() > 8) {
                            $("#ddlLineaTipo").data("kendoComboBox").value($("#hdfLineaTipoTemp").val());
                        } else {
                            $("#ddlLineaTipo").val($("#hdfLineaTipoTemp").val());
                        }
                        $(this).dialog("close");
                    }
                },
                resizale: false
            });
        } else {
            $("#txtLinea").attr("disabled", "disabled");
            $("#txtLinea").html("");
            $("#hdfLineaTipoTemp").val($("#ddlLineaTipo").val());
            if (IdLineaTipo == "-1") {
                $("#txtLinea").attr("disabled", "disabled");
                $("#hdfNumLinea").val("");
                $("#txtLinea").val("");
                $("#trCampana").hide();
                //$("#lblPlanLinea").text("");
                $("#dvInfoLinea").hide();
                //$("#ddlLinea").append($("<option></option>").attr("value", "").text("<Seleccione un tipo de Linea>"));
            }
            else {
                $("#txtLinea").attr("disabled", false);
                $("#hdfNumLinea").val("");
                $("#txtLinea").val("");
                $("#dvInfoTipoLinea").show();
                $("#InfoTipoLinea_DvMiMensaje").html("La Línea debe estar disponible, y el modelo del dispositivo seleccionado debe estar asociado a un plan y/o cuenta.");
                //$("#lblPlanLinea").text("");
                $("#dvInfoLinea").hide();
                //$.ajax({
                //    type: "POST",
                //    url: "Mnt_Dispositivo.aspx/ListarDisponiblePorEmpleado",
                //    data: "{'IdEmpleado': '" + $("#hdfCodEmpleado").val() + "'," +
                //           "'IdTipoLinea': '" + IdLineaTipo + "'," +
                //           "'LineaActual': '" + $("#hdfLineaActual").val() + "'," +
                //           "'IdTipoLineaActual': '" + $("#hdfIdTipoLineaActual").val() + "'}",
                //    contentType: "application/json; charset=utf-8",
                //    dataType: "json",
                //    success: function (result) {
                //        $.each(result.d, function () {
                //            $("#ddlLinea").append($("<option></option>").attr("value", this.P_vcNum).text(this.P_vcNum));
                //        });
                //        $("#ddlLinea").removeAttr("disabled");
                //    },
                //    error: function (xhr, err, thrErr) {
                //        MostrarErrorAjax(xhr, err, thrErr);
                //        BloquearPagina(false);
                //    }
                //});
                //tipo de linea familia
                if (IdLineaTipo == "2") {
                    $("#trCampana").show();
                } else {
                    $("#trCampana").hide();
                }
            }
        }
    });
    $("#txtCodigo").focus();
    $("input[name='ddlTipoAdquisicion_input']").attr("disabled", "disabled");
    $("input[name='ddlSopLin_input']").attr("disabled", "disabled");
    $("input[name='ddlLineaTipo_input']").attr("disabled", "disabled");

    if ($("#hdfOcultarCamposLigero").val() == "1") {
        $("#trLinea").hide();
        $("#trMensaje").hide();
        $("#trCampana").hide();
        $("#trTituloEmplResponsable").hide();
        $("#trEmplResponsable").hide();
        $("#trEmpleado").hide();
        $("#trSoportaLinea").hide();
    }

    $("#btnLiberarDispositivo").click(function () {
        window.parent.LiberarDispositivo();        
    });

    $("#TxtSerie").css("width", "240px");
    $("#TxtMontoDispositivo").css("width", "240px");
    $("#txt_vcDesModelo").css("width", "300px");

    /*debugger;*/
    if ($(window).height() < 400) {
        $("#dvCampo").css("height", $(window).height() - 100)
    }

});

function validarEspaciosEnBlancoAlInicio() {
    var valor = $("#txtCodigo").val();
    $("#txtCodigo").val($.trim(valor));
}

function CerrarDialogDispositivoLigero() {
    $("#dvAgregarModeloDispositivo").dialog("close");
}
