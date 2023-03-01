


//jherrera 20130423 Se agrego el campo F_inCodTip
//------------------------------------------------------------
var boolCargarServicios = 0; //0=No tienen valor asignado, 1=IFrame está listo, 2=Servicios listos, cargar despues del load del iframe //20141029 wapumayta
var PermitirGuardar = true; AceptarGuardar=true
function linea(P_vcNum, dcPerFacIni, dcPerFacFin, dcMon, btVig, F_inCodTip, NombreCampana, FechaInicioContrato, MesesContrato, IdCampana, FechaAlta) {
    this.P_vcNum = P_vcNum;
    this.Empleado = new empleado();
    this.Dispositivo = new dispositivo();
    this.Sucursal = new sucursal();
    this.Cuenta = new cuenta();
    this.SimCard = new simcard();
    this.Operador = new operador();
    this.Plan = new plan();
    this.Estado = new estado();
    this.dcPerFacIni = dcPerFacIni;
    this.dcPerFacFin = dcPerFacFin;
    this.dcMon = dcMon;
    this.Servicios = [];
    this.btVig = btVig;
    this.F_inCodTip = F_inCodTip;
    this.NombreCampana = NombreCampana;
    this.IdCampana = IdCampana;
    this.FechaInicioContrato = FechaInicioContrato;
    this.MesesContrato = MesesContrato;
    this.FechaAlta = FechaAlta;
}
//---------------------------------------------------------------------

function simcard(P_vcSimCard, vcNom) {
    this.P_vcSimCard = P_vcSimCard;
    this.vcNom = vcNom;
}
function servicio(P_inCod, vcNom, dcCan, inCodTipDat, inTipAsig, dcMon) {
    this.P_inCod = P_inCod;
    this.vcNom = vcNom;
    this.dcCan = dcCan;
    this.inCodTipDat = inCodTipDat;
    this.dcMon = dcMon;
    this.inTipAsig = inTipAsig;
}
function empleado(P_vcCod, vcNom) {
    this.P_vcCod = P_vcCod;
    this.vcNom = vcNom;
}
function dispositivo(P_vcCodIMEI, vcNom) {
    this.P_vcCodIMEI = P_vcCodIMEI;
}
function sucursal(P_vcCod, vcNom) {
    this.P_vcCod = P_vcCod;
    this.vcNom = vcNom;
}
function cuenta(P_vcCod, vcNom) {
    this.P_vcCod = P_vcCod;
    this.vcNom = vcNom;
}
function operador(P_inCodOpe, vcNomOpe) {
    this.P_inCodOpe = P_inCodOpe;
    this.vcNomOpe = vcNomOpe;
}
function plan(P_inCod, vcNom) {
    this.P_inCod = P_inCod;
    this.vcNom = vcNom;
}
function estado(P_inCod, vcNom) {
    this.P_inCod = P_inCod;
    this.vcNom = vcNom;
}

function BloquearPagina(bloqueado) {

    debugger;
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

function AbrirLineaServicio(vcNumLinea, vcCodCta, vcAsigCred, vcServicios, Accion) {
    var vcMostrarInfo = "0";
    if ($('#chkEstado').is(':checked') == false || $("#hdfSituacion").val() == "36") {
        vcMostrarInfo = "1";
    }
    var vcSer = "";
    var $Pagina = 'Mnt_LineaServicio.aspx?vcLinea=' + vcNumLinea + "&vcCodCta=" + vcCodCta + "&vcTipAsiCre=" + vcAsigCred + "&vcLinSer=" + vcSer + "&vcAccion=" + Accion + "&vcSituacion=" + vcMostrarInfo + "&vcTipoPag=" + 'Linea';
    $("#ifServicios").width(1230);
    $("#ifServicios").height(240);
    $("#ifServicios").attr("src", $Pagina);
    $("#ifServicios").show();
}

var indiceTab;
var CantidadRegistrada = 0;
var isEditar = false;
var CantidadModificada = 0;
var lstServiciosQuitados = [];
var inTotReg;
var dialogLiberacion;
function CerroMensaje() {
    BloquearPagina(false);
    if ($("#hdfLinea").val() == "") {//Nuevo
        window.location.reload();
        //$("input[value='userfile']").replaceWith($("input[value='userfile']").val('').clone(true));

        //$("#txtNumero").val("");
        //$("#txtEmpleado").val("");
        //$("#hdfCodEmpleado").val("");
        //$("#hdfCodDispositivos").val("");
        //$("#txt_Dispositivos").val("");
        ////$("#ddlLineaTipo").prop('selectedIndex', 0);
        //$("#txtSucursal").val("");
        //$("#hdfCodSucursal").val("");
        ////$("#ddlOperador").prop('selectedIndex', 0);
        ////$("#ddlCuenta").prop('selectedIndex', 0);
        ////$("#ddlPlan").prop('selectedIndex', 0);
        //if (isIE() > 15) {
        //    $("#ddlLineaTipo").data("kendoComboBox").select(0);
        //    $("#ddlOperador").data("kendoComboBox").select(0);
        //    $("#ddlCuenta").data("kendoComboBox").select(0);
        //    $("#ddlPlan").data("kendoComboBox").select(0);
        //    $("#ddlCampana").data("kendoComboBox").select(0);
        //} else {
        //    $("#ddlLineaTipo").val(-1);
        //    $("#ddlOperador").val(-1);
        //    $("#ddlCuenta").val(-1);
        //    $("#ddlPlan").val(-1);
        //    $("#ddlCampana").val(-1);
        //}    
        //$("#txtFechaAlta").val("");
        //$("#txtFechaInicioContrato").val("");
        ////$("#txtMesesContrato").val("");
        //$("#ddlMesesContrato").val("-1");
        //$("#LblFechaCampana").text("");
        //$("#lblDiaFinal").html("30");
        //$("#lblCentroCosto").html("");
        //$("#lblGrupoOrigen").html("");
        //$("#hdfCodGrupoOrigen").val("");
        //$("#txtMonto").val("");
        //window.parent.$("#tblServicio").jqGrid('clearGridData');
        //$("#txtNumero").focus();
        //$("#trPlan").hide();
        //$("#trFechaAsignacionDispositivo").hide();
        //$("#txtFechaAsignacionDispositivo").val("");
        //$("#trFechaAsignacionEmpleado").hide();
        //$("#txtFechaAsignacionEmpleado").val("");
        //$("#dvToolTip").hide();
        ////configurarIdPlan();
        //$("#trPeriodo").hide();
        //$("#trGrupoOrigen").hide();
        //$("#trMonto").hide();
        //$("#dvAsignacion1").hide();
        //$(".VARCHAR").val("");
        //$(".INT").val("");
        //$(".DECIMAL").val("");  
        //$(".DATE").val("");
        //$(".DATETIME").val("");
        //$("input", ".BIT").each(function (i) {
        //    $(this).attr('checked', false);
        //});
        //$("#lblMsgDispositivos").text("");
        //$("#lblMsgCuenta").text("");
        //$("#txtNumero").focus("");
    }
    else {//Edicion
        window.parent.tab.tabs("remove", indiceTab);
    }

    //EnabledControl("#ddlCuenta", false);

    //$("#ddlOperador").attr('disabled', true);

    //$("#ddlOperador").prop("selectedIndex", 0);
    //$("#ddlOperador").attr('disabled', false);
    //    if ($("#ddlOperador option").length == 2) {
    //        $("#ddlOperador").prop("selectedIndex", 1);
    //        $("#ddlOperador").attr('disabled', true);
    //        $("#ddlOperador").change();
    //    }
}

function listarServicioPorCuenta() {
    if ($("#ddlCuenta").val() != "-1" && $("#hdfAsigCred").val() == 2) {
        $.ajax({
            type: "POST",
            url: "Mnt_Linea.aspx/ListarServicioPorCuenta",
            data: "{'vcCodCue': '" + (isIE() > 15 ? $("#ddlCuenta").val().replace(/'/g, "&#39") : $("#ddlCuenta").val()) + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                lstServicio = result.d;
                $("#ddlServicio").html("");
                $("#ddlTipoServicio").html("");

                if ($(lstServicio).length > 0) {
                    $("#ddlServicio").append($("<option></option>").attr("value", -1).text("<Seleccionar>"));
                    $("#ddlTipoServicio").append($("<option></option>").attr("value", -1).text("<Seleccionar>"));

                    $(lstServicio).each(function () {
                        if (this.inCodTipDat == "1") {
                            $("#ddlServicio").append($("<option></option>").attr("value", this.P_inCod).text(this.vcNom));
                        }

                        if (this.inCodTipDat == "2") {
                            var existsOption = false;
                            var CodTipSer = this.vcNom;
                            $("#ddlTipoServicio > option").each(function () {
                                if (this.text == CodTipSer) {
                                    existsOption = true;
                                }
                            });
                            if (!existsOption) {
                                $("#ddlTipoServicio").append($("<option></option>").attr("value", this.P_inCod).text(this.vcNom));
                            }
                        }
                    });
                    if ($("option", "#ddlServicio").length == 1) {
                        $("#ddlServicio").html("");
                        $("#ddlServicio").append($("<option></option>").attr("value", -2).text("Sin datos"));
                    }
                    if ($("option", "#ddlTipoServicio").length == 1) {
                        $("#ddlTipoServicio").html("");
                        $("#ddlTipoServicio").append($("<option></option>").attr("value", -2).text("Sin datos"));
                    }
                }
                else {
                    $("#ddlServicio").append($("<option></option>").attr("value", -2).text("Sin datos"));
                    $("#ddlTipoServicio").append($("<option></option>").attr("value", -2).text("Sin datos"));
                }

                ActivarCombokendo("#ddlServicio", 120);
                ActivarCombokendo("#ddlTipoServicio", 120);
                $("input[name='ddlServicio_input']").attr("disabled", "disabled");
                $("input[name='ddlTipoServicio_input']").attr("disabled", "disabled");
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
}

function isIE() { //Vefiricar Version del Internet Explorer
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

var p_url = "";
var p_data = "";
var CodEmplAnterior;
var NomEmplAnterior;
var CodGrupOrigAnterior;
var NomGrupOrigAnterior;
//var Selecciono;
var auxCount = 0;
function configurarIdPlan(init) {
    //alert("configurarIdPlan: " + $("#hdfCodDispositivos").val());
    //alert($("#hdfLinea").val() + "," + auxCount);
    if ($("#hdfLinea").val() == null || $("#hdfLinea").val() == undefined || $("#hdfLinea").val() == '') { //si es nuevo
        $("#ddlPlan").val('-1');
        $("#txt_Dispositivos").val('');
        $("#hdfCodDispositivos").val('');
    } else { //es edicion (salvar dispositivo en la carga de la pagina
        if (auxCount != 0) {
            $("#ddlPlan").val('-1');
            $("#txt_Dispositivos").val('');
            $("#hdfCodDispositivos").val('');
        } else {
            auxCount = auxCount + 1;
        }
    }
}
var esSrvIlimitado = false;
var esSrvTipAsig = false;
var dcMonXSubCta;
var dcCanXSubCta;
var bajaDisp = true;
var AnchoPag;

var oCulturaUsuario;
var FormatoFechaCulturaForDatePicker = "";
var SimDec = ".";
var SimMil = ",";
var NumDec = "2";
var val_x_Defecto = 0;
var inTipoAsigCredito;
var tbServiciosAdicionales;
var tblServicio;
var tblResponsable;
//variable global EdicionConConfirmacion //14-11-2014 wapumayta
var EdicionConConfirmacion = true;
var vValorControlActual = '';
var vcFechaAsignacionEmpleado = '';
var vcFechaAsignacionDispositivo = '';
$(function () { 

    $('#ddlSimCard').select2();
    $('#ddlPlan').select2();
    //overload de matcher para buscar por value o text
    $('#ddlCuenta').select2({
        matcher: function (params, data) {
            if ($.trim(params.term) === '') { return data; }
            if (typeof data.text === 'undefined') { return null; }
            var q = params.term.toLowerCase();
            if (data.text.toLowerCase().indexOf(q) > -1 || data.id.toLowerCase().indexOf(q) > -1) {
                return $.extend({}, data, true);
            }
            return null;
        }
    });

    $('#ddlSucursal').select2();

    obtenerSucursales();

    $.curCSS = function (element, attrib, val) {
        $(element).css(attrib, val);
    };

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


    Mantenimiento_Mostrar_VARBINARY("", "../../../");

    if ($("#hdfAddDispositivo").val() == "False") {
        $("#btnAgregarDispositivo").button("option", "disabled", true);
    }
    //alert($("#hdfAddEmpl").val());
    if ($("#hdfAddEmpl").val() == "False") {
        $("#btnAgregar").button("option", "disabled", true);
    }


    if ($("#hdfLinea").val() != '' && EdicionConConfirmacion) {
        $("#txtFechaAlta").attr("disabled", true);
        $("#btnEditarFechaAlta").show();
        $("#btnLiberarLinea").show();
    }
    $("#btnEditarFechaAlta").on("click", function () {
        var vAccion = $("#txtEditarFechaAlta").text();
        if (vAccion == 'Editar') {
            $("#txtFechaAlta").attr("disabled", false);
            $("#txtFechaAlta").css({ "background": "#E0F8F7" });
            $("#txtEditarFechaAlta").text("Cancelar");
            vValorControlActual = $("#txtFechaAlta").val();
        } else {
            $("#txtFechaAlta").attr("disabled", true);
            $("#txtFechaAlta").css({ "background": "#EBEBE4" });
            $("#txtEditarFechaAlta").text("Editar");
            $("#txtFechaAlta").val(vValorControlActual);
        }
    });
    //#endregion

    if ($("#ddlLineaTipo option").length == 2) {
        try {
            if (!VistaSimple) {
                $("#txt_Dispositivos").attr("disabled", false);
                $("#btnAgregarDispositivo").button("option", "disabled", false);
            }
        }
        catch (e) {
            $("#txt_Dispositivos").attr("disabled", false);
            $("#btnAgregarDispositivo").button("option", "disabled", false);
        }
        //$("#txt_Dispositivos").val("");
        //$("#hdfCodDispositivos").val('');
        //$("#txtFechaInicioContrato").val('');
        var msgFiltro = $("#ddlLineaTipo > option[value='" + $("#ddlLineaTipo").val() + "']").text();
        //$("#lblMsgDispositivos").text("(Dispositivos tipo " + msgFiltro + ")");
        //$("#lblMsgCuenta").text("(Cuentas tipo " + msgFiltro + ")");
        //$("#lblMsgPlan").text("(Planes tipo " + msgFiltro + ")");
        $("#lblMsgDispositivos").text("");
        $("#lblMsgCuenta").text("");
        $("#lblMsgPlan").text("");
    }
    else {
        if ($("#txtNumero").val() != "") {
            var msgFiltro = $("#ddlLineaTipo > option[value='" + $("#ddlLineaTipo").val() + "']").text();
            //$("#lblMsgDispositivos").text("(Dispositivos tipo " + msgFiltro + ")");
            //$("#lblMsgCuenta").text("(Cuentas tipo " + msgFiltro + ")");
            //$("#lblMsgPlan").text("(Planes tipo " + msgFiltro + ")");
            $("#lblMsgDispositivos").text("");
            $("#lblMsgCuenta").text("");
            $("#lblMsgPlan").text("");
        }
    }
    AnchoPag = $("#dvCampo").width();

    //opcion que deshabilita el boton Agregar Dispositivo
    //if ($("#hdfLineaTipo").val() != '') {
    //    $("#btnAgregarDispositivo").button("option", "disabled", false);
    //} else {
    //    $("#btnAgregarDispositivo").button("option", "disabled", true);
    //}

    $("#AccordionJQ1").accordion("option", "active", 1);

    $(".accordion").accordion({
        collapsible: true,
        autoHeight: false
    });

    $(window).resize(function () {
        AnchoPag = $("#dvCampo").width();
    });


    $("#chkTipoAsignacion").attr("checked", true);
    if ($('#chkTipoAsignacion').is(':checked') == true) {
        $("#txtMontoAsignado").val(val_x_Defecto.toFixed(NumDec));
        $("#chkTipoAsignacion").attr("disabled", true);
        $("#txtMontoAsignado").attr("disabled", true);
    }


    tbServiciosAdicionales = $("#tbServiciosAdicionales").jqGrid({
        sortable: true,
        datatype: CargarGrillaServiciosAdicionales,
        colModel: [{ name: 'inIdSer', Campo: 'inIdSer', label: 'Código', hidden: false, width: 50, align: 'Right' },
                   { name: 'inIdOpe', Campo: 'inIdOpe', label: 'Operador', hidden: true, width: 50, align: 'Right' },
                   { name: 'vcNom', Campo: 'vcNom', label: 'Nombre Servicio', hidden: false, width: 350 },
                   { name: 'vcDesc', Campo: 'vcDesc', label: 'Detalle Servicio', hidden: true, width: 50, align: 'Right' },
                   {
                       name: 'dcCost', Campo: 'dcCost', label: 'Costo', hidden: false, width: 150, align: 'Right',
                       formatter: function (value, options, rData) {
                           if (value == '0') {
                               return 'Sin costo';
                           } else {
                               return FormatoNumero(value, oCulturaUsuario);
                           }
                       }
                   },
                   { name: 'btEst', Campo: 'btEst', label: 'Estado', hidden: true, width: 50, align: 'Right' },
                   { name: 'inIdGrup', Campo: 'inIdGrup', label: 'Id Grupo', hidden: true, width: 50, align: 'Right' },
                   { name: 'btHab', Campo: 'btHab', label: 'Habilitado', hidden: true, width: 50, align: 'Right' },

                   {
                       name: 'verDetalle', index: 'verDetalle', label: 'Detalle', width: 80, align: 'center',
                       formatter: function (value, options, rData) {
                           return '<div id="btnVerDetalle-' + rData[0] + '" class="btnDetalle btnNormal" codigo="' + rData[0] + '">Detalle</div>';
                       }
                   },

                   {
                       name: 'btActiva', Campo: 'btActiva', label: 'Activo', hidden: false, width: 50, align: 'center',
                       formatter: function (value, options, rData) {
                           if (rData[8] == "False") {
                               if (rData[7] == "False") {
                                   return '<input type="checkbox" id="chkAct-' + rData[0] + '" class="chkActivar" codigo="' + rData[0] + '" disabled="disabled"/>';
                               } else {
                                   return '<input type="checkbox" id="chkAct-' + rData[0] + '" class="chkActivar" codigo="' + rData[0] + '" />';
                               }
                           } else {
                               if (rData[7] == "False") {
                                   return '<input type="checkbox" id="chkAct-' + rData[0] + '" class="chkActivar" codigo="' + rData[0] + '" checked="checked" disabled="disabled"/>';
                               } else {
                                   return '<input type="checkbox" id="chkAct-' + rData[0] + '" class="chkActivar" codigo="' + rData[0] + '" checked="checked"/>';
                               }
                           }
                       }
                   },
                   { name: 'GROR_vcNOMGRU', Campo: 'GROR_vcNOMGRU', label: 'Grupo', hidden: true, width: 50, align: 'Right' },
                   { name: 'COMP_vcNOMCIA', Campo: 'COMP_vcNOMCIA', label: 'Operador', hidden: true, width: 50, align: 'Right' }

        ],
        jsonReader: {
            root: "Items",
            page: "PaginaActual",
            total: "TotalPaginas",
            records: "TotalRegistros",
            repeatitems: true,
            cell: "Row",
            id: "ID"
        },
        pager: "#tbServiciosAdicionalesPager",
        loadtext: 'Cargando Servicios Adicionales...',
        emptyrecords: 'No hay Registros.',
        pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        rowNum: "10", // PageSize.
        rowList: [10, 20, 30], //Variable PageSize DropDownList. 
        viewrecords: true, //Show the RecordCount in the pager.
        multiselect: false,
        sortname: "vcNom", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: 770,
        height: 100, //"auto",
        rownumbers: true,
        shrinkToFit: false,
        caption: "Servicios Adicionales"/*,
        onSelectRow: function (id) { CargarEdicionPaquete(id); },
        ondblClickRow: function (id) { CargarEdicionPaquete(id); }*/
        , gridComplete: function () {
            $(".btnNormal").button();
        }
    });

    $(".btnDetalle").on("click", function () {//alert($(this).attr("codigo"));
        var dataServAdd = $("#tbServiciosAdicionales").jqGrid("getRowData", $(this).attr("codigo"));
        $("#lblDetalleServicio").html(dataServAdd.vcDesc);
        $('#divDetalleServicio').dialog({
            title: "Detalle Servicio",
            width: 500,
            modal: true,
            buttons: {
                "Cerrar": function () {
                    $(this).dialog("close");
                }
            }
        });
    });

    //plan
    $("#ddlPlan").change(function () {
        $.ajax({
            type: "POST",
            url: "Mnt_Linea.aspx/MostrarDetallePlanes",
            data: "{'vcCodPlan': '" + $("#ddlPlan").val().replace(/'/g, "&#39") + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#hdfTipoServicioPlan").val(result.d.TipoServicio);
                ValidarCuentaPlanDispositivo_TipoServicio();
                //ValidarDispositivoFiltro("Plan");
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
        //if ($(this).val() != '-1') {
        //    $("#txt_Dispositivos").val('');
        //    $("#hdfCodDispositivos").val('');
        //}
    });

    //$("#trPlan").hide(function () {
    //    $("#ddlPlan").val('-1');
    //    $("#txt_Dispositivos").val('');
    //    $("#hdfCodDispositivos").val('');
    //});
    //
    //$("#trPlan").show(function () {
    //    $("#ddlPlan").val('-1');
    //    $("#txt_Dispositivos").val('');
    //    $("#hdfCodDispositivos").val('');
    //});

    var indexServicio;
    var TipoServicio;
    var lstServicio;
    var lstDispositivos;
    var Titulo = "";
    var Selecciono;
    var SeleccionoSucursal;
    if ($("#hdfLinea").val() == '') { // nuevo
        Selecciono = false;
        SeleccionoSucursal = false;
    } else {
        Selecciono = true;
        SeleccionoSucursal = true;
        setDatosBusquedaDispositivos();
    }

    //Sucursal por defecto ******************
    $("#hdfCodSucursal").val("0000000000");
    $("#filaSucursal").hide();
    SeleccionoSucursal = true;
    //***************************************


    var idCliente = window.top.idCliente;
    indiceTab = 0;
    try {
        indiceTab = window.parent.tab.tabs("option", "selected");
    } catch (e) {
    }
    

    //#region fecha alta de linea
    $("#txtFechaAlta").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: FormatoFechaCulturaForDatePicker
    });

    $("#txtFechaInicioContrato").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: FormatoFechaCulturaForDatePicker
    });

    $("#txtFechaAsignacionDispositivo").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: FormatoFechaCulturaForDatePicker
    });

    $("#txtFechaAsignacionEmpleado").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: FormatoFechaCulturaForDatePicker
    });

    if ($("#LblAsignacionDispositivo").html() == 'Fecha desvinculación') {
        $("#txtFechaAsignacionDispositivo").attr("disabled", true);
        //$("#btnEditarFechaAsignacionDisp").hide();
    } else {
        if ($("#hdfFechaAsignacionDispositivo").val() != '') {
            $("#txtFechaAsignacionDispositivo").attr("disabled", true);
            //$("#btnEditarFechaAsignacionDisp").show();
        }
    }

    if ($("#LblAsignacionEmpleado").html() == 'Fecha desvinculación') {
        $("#txtFechaAsignacionEmpleado").attr("disabled", true);
        //$("#btnEditarFechaAsignacionEmpl").hide();
    } else {
        if ($("#hdfFechaAsignacionEmpleado").val() != '') {
            $("#txtFechaAsignacionEmpleado").attr("disabled", true);
            //$("#btnEditarFechaAsignacionEmpl").show();
        }
    }

    //comentado 27-08-2015 wapumayta (agregado formato en la declaración de los datapicker)
    //$("#txtFechaInicioContrato").datepicker('option', 'dateFormat', FormatoFechaCulturaForDatePicker);
    //$("#txtFechaAlta").datepicker('option', 'dateFormat', FormatoFechaCulturaForDatePicker);

    //--
    if (isIE() > 15) { //if (isIE() == 6) {	
        combokendoFormar("#ddlLineaTipo", 120);
        combokendoFormar("#ddlCampana", 120);
        combokendoFormar("#ddlOperador", 120);
        $("#ddlCuenta").append($("<option></option>").attr("value", -1).text("<Seleccione Tipo y Operador>"));
        combokendoFormar("#ddlCuenta", 120);
        combokendoFormar("#ddlPlan", 120);
        combokendoFormar("#ddlDiaInicial", 120);


        combokendoFormar("#ddlSimCard", 120);
    }
    //--
    //$("#ddlCuenta").append($("<option></option>").attr("value", -1).text("<Seleccionar>"));

    $("#btnCargar").hide();
    $(".btnNormal").button();

    ValidarNumeroEnCajaTexto("txtMontoMaximo", ValidarDecimalPositivo);

    ValidarNumeroEnCajaTexto("txtNumero", ValidarEnteroPositivo);

    //ValidarNumeroEnCajaTexto("txtMesesContrato", ValidarEnteroPositivo);
    ValidarNumeroEnCajaTexto("txtCantidadServicio", ValidarDecimalPositivo, oCulturaUsuario, true);
    ValidarNumeroEnCajaTexto("txtMontoAsignado", ValidarDecimalPositivo, oCulturaUsuario, true);
    ValidarNumeroEnCajaTexto("txtMonto", ValidarDecimalPositivo, oCulturaUsuario, true);
    $("#txtMonto").val(FormatoNumero($("#txtMonto").val(), oCulturaUsuario));

    $("input[name='ddlDiaInicial_input']").attr("disabled", "disabled");
    $("input[name='ddlLineaTipo_input']").attr("disabled", "disabled");
    $("input[name='ddlOperador_input']").attr("disabled", "disabled");
    //    
    //    $("input[name='ddlPlan_input']").attr("disabled", "disabled");
    /////nuevas consideraciones respecto a tipo linea

    if ($("#hdfLinea").val() == '') { // nuevo
        //$("#txt_Dispositivos").attr("disabled", true);
        //$("#txt_Dispositivos").val('Debe seleccionar Tipo de Línea');
        //$("#txt_Dispositivos").css({ 'color': 'grey', 'font-size': '90%', 'font-weight': 'bold', 'font-style': 'italic' });

        if ($("#ddlOperador").val() != -1) {
            EnabledControl("#ddlCuenta", false);
            //$("#ddlOperador").change();
            ListarCuentaPlanesPorOperador();
        }
        else {
            $("#ddlCuenta").html("");
            $("#ddlCuenta").append($("<option></option>").attr("value", -1).text("<Seleccionar>"));
            EnabledControl("#ddlCuenta", false);
        }
        //$("#ddlCuenta").data("kendoComboBox").select(-1);
        $("#chkServicioIlimitado").attr('checked', true);

    } else {
        //alert($("#ddlLineaTipo").val() + ", " + $("#ddlOperador").val());
        //$("#ddlOperador").change();
        AbrirLineaServicio($("#hdfLinea").val(), $("#hdfCodCuenta").val(), $("#hdfAsigCred").val(), $("#hdfServicio").val(), "");
        ListarCuentaPlanesPorOperador();
        CodEmplAnterior = $("#hdfCodEmpleado").val();
        NomEmplAnterior = $("#txtEmpleado").val();
        $("#tbServiciosAdicionales").trigger("reloadGrid");
        inTipoAsigCredito = $("#hdfAsigCred").val();
        //$("#chkServicioIlimitado").attr('checked', false);        
    }

    //    $("#txtNumero").bind('paste', function (e) {
    //        return true;
    //    });

    $(".DECIMAL").focusout(function () {
        $(".DECIMAL").val(FormatoNumero(this.value, oCulturaUsuario));
        ////            if (this.value != "") {
        //CamposDinamicos += "[" + $(this).attr("obj") + "]";
        //CamposDinamicos += " = ";
        //CamposDinamicos += (this.value == "" ? "NULL" : this.value); //this.value;
        //CamposDinamicos += ",";
        ////            }
    });

    $("#ddlLineaTipo").change(function () {
        CloseAutocomplete();
        //alert($("#ddlLineaTipo").val());

        setDatosBusquedaDispositivos();
        $("#hdfAsigCred").val("-1");
        if ($("#ddlLineaTipo").val() == -1) {
            $("#hdfLineaTipoTemp").val($("#ddlLineaTipo").val());
            $("#txt_Dispositivos").val('');
            $("#hdfCodDispositivos").val('');
            $("#lblMsgDispositivos").text("");
            $("#lblMsgCuenta").text("");
            EnabledControl("#ddlCuenta", false);
            ListarCuentaPlanesPorOperador();
            //CargarGrupoOrigen();
            $("#trGrupoOrigen").css('display', 'none');
            try {
                if (!VistaSimple) {
                    $("#txt_Dispositivos").attr("disabled", true);
                    $("#btnAgregarDispositivo").button("option", "disabled", true);
                }
                else {

                }
            }
            catch (e) {
                $("#txt_Dispositivos").attr("disabled", true);
                $("#btnAgregarDispositivo").button("option", "disabled", true);
            }

            $("#hdfCodDispositivos").val("");
            $("#txt_Dispositivos").val('Debe seleccionar Tipo de Línea');
            $("#txt_Dispositivos").css({ 'color': 'grey', 'font-size': '90%', 'font-weight': 'bold', 'font-style': 'italic' });
        } else {
            //alert($("#hdfCodEmpleado").val());
            //consultar cambio de tipo de linea
            if ($("#hdfCodDispositivos").val() != '' || $("#ddlCuenta").val() != "-1") { //si hay dispositivo o cuenta seleccionado consultar antes del cambio
                //mostrar mensaje segun datos seleccioandos (dispositivo o cuentao o ambos)
                $("#lblMsgForCuentaDispositivo").hide();
                $("#lblMsgForDispositivo").hide();
                $("#lblMsgForCuenta").hide();
                if ($("#hdfCodDispositivos").val() != '' && $("#ddlCuenta").val() != "-1") {
                    $("#lblMsgForCuentaDispositivo").show();
                } else if ($("#hdfCodDispositivos").val() != '') {
                    $("#lblMsgForDispositivo").show();
                } else if ($("#ddlCuenta").val() != "-1") {
                    $("#lblMsgForCuenta").show();
                }
                $("#dviMsgConfirmacionCambioTipoLinea").dialog({
                    title: "Confirmación",
                    modal: true,
                    closeOnEscape: false,
                    dialogClass: 'no-close',
                    buttons: {
                        "Si": function () {
                            $("#hdfLineaTipoTemp").val($("#ddlLineaTipo").val()); //set a temporarl el tipo seleccionado
                            $(this).dialog("close");
                            if ($("#ddlLineaTipo").val() == 2) {
                                $(".Family").show(200);
                            }
                            else {
                                $(".Family").hide(200);
                            }

                            try {
                                if (!VistaSimple) {
                                    $("#txt_Dispositivos").attr("disabled", false);
                                    $("#btnAgregarDispositivo").button("option", "disabled", false);
                                }
                                else {

                                }
                            }
                            catch (e) {
                                $("#txt_Dispositivos").attr("disabled", false);
                                $("#btnAgregarDispositivo").button("option", "disabled", false);
                            }

                            $("#txt_Dispositivos").val("");
                            $("#hdfCodDispositivos").val('');
                            //$("#txtFechaInicioContrato").val('');
                            var msgFiltro = $("#ddlLineaTipo > option[value='" + $("#ddlLineaTipo").val() + "']").text();
                            //$("#lblMsgDispositivos").text("(Dispositivos tipo " + msgFiltro + ")");
                            //$("#lblMsgCuenta").text("(Cuentas tipo " + msgFiltro + ")");
                            //$("#lblMsgPlan").text("(Planes tipo " + msgFiltro + ")");

                            $("#lblMsgDispositivos").text("");
                            $("#lblMsgCuenta").text("");
                            $("#lblMsgPlan").text("");

                            //$("#ddlLineaTipo > option[value='" + $("#ddlLineaTipo").val() + "']").attr("text")
                            if ($("#ddlOperador").val() != -1) {
                                EnabledControl("#ddlCuenta", false);
                                //$("#ddlOperador").change();
                                ListarCuentaPlanesPorOperador();
                            }
                            CargarGrupoOrigen();
                            LimpiarValidacionDatosLinea();
                            //$("#ddlCampana > option[value='-1']").attr("selected", true);
                            $("#txt_Dispositivos").css({ 'color': '', 'font-size': '', 'font-weight': '', 'font-style': '' });
                        },
                        "No": function () {
                            if (isIE() > 15) {
                                $("#ddlLineaTipo").data("kendoComboBox").value($("#hdfLineaTipoTemp").val());
                            } else {
                                $("#ddlLineaTipo").val($("#hdfLineaTipoTemp").val());
                            }
                            $(this).dialog("close");
                        }
                    },
                    resizable: false
                });
            } else { // si no hay dispositivo proceder a hacer el cambio
                if ($("#ddlLineaTipo").val() == 2) {
                    $(".Family").show(200);
                }
                else {
                    $(".Family").hide(200);
                }

                try {
                    if (!VistaSimple) {
                        $("#txt_Dispositivos").attr("disabled", false);
                    }
                    else {}
                }
                catch (e) {
                    $("#txt_Dispositivos").attr("disabled", false);
                }

                if ($("#hdfAddDispositivo").val() != "False") {
                    try {
                        if (!VistaSimple) {
                            $("#btnAgregarDispositivo").button("option", "disabled", false);
                        }
                        else { }
                    }
                    catch (e) {
                        $("#btnAgregarDispositivo").button("option", "disabled", false);
                    }
                }
                $("#txt_Dispositivos").val("");
                $("#hdfCodDispositivos").val('');
                //$("#txtFechaInicioContrato").val('');
                var msgFiltro = $("#ddlLineaTipo > option[value='" + $("#ddlLineaTipo").val() + "']").text();
                //$("#lblMsgDispositivos").text("(Dispositivos tipo " + msgFiltro + ")");
                //$("#lblMsgCuenta").text("(Cuentas tipo " + msgFiltro + ")");
                //$("#lblMsgPlan").text("(Planes tipo " + msgFiltro + ")");

                $("#lblMsgDispositivos").text("");
                $("#lblMsgCuenta").text("");
                $("#lblMsgPlan").text("");

                //$("#ddlLineaTipo > option[value='" + $("#ddlLineaTipo").val() + "']").attr("text")
                if ($("#ddlOperador").val() != -1) {
                    EnabledControl("#ddlCuenta", false);
                    //$("#ddlOperador").change();
                    ListarCuentaPlanesPorOperador();
                }
                CargarGrupoOrigen();
                //$("#ddlCampana > option[value='-1']").attr("selected", true);
                $("#txt_Dispositivos").css({ 'color': '', 'font-size': '', 'font-weight': '', 'font-style': '' });
                //guardar temporal de tipo de linea
                $("#hdfLineaTipoTemp").val($("#ddlLineaTipo").val());
            }
        }
        $("input[name='ddlCampana_input']").attr("disabled", "disabled");
    });

    $("#ddlPlan").change(function () {
        CloseAutocomplete();
        //        //        $("#txt_Dispositivos").val('');
        //        $("#hdfCodDispositivos").val('');
        //        setDatosBusquedaDispositivos()
    });

    ////fin tipo linea
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


    $(window).resize(function () {
        DimPosElementos();
    });

    function DimPosElementos() {
        var Alto = $(window).height();
        $("#dvCampo").css({ height: Alto - 80 });
    }

    listarServicioPorCuenta();

    tblServicio = $("#tblServicio").jqGrid({
        datatype: "local",
        colModel: [{ name: 'P_inCod', index: 'P_inCod', label: 'Codigo', width: 60, hidden: true },
   		                   { name: 'inCodTipDat', index: 'inCodTipDat', label: 'Tipo', width: 50, hidden: true },
   		                   { name: 'vcNom', index: 'vcNom', label: 'Servicio', width: 200 },
                           { name: 'inCodTipSer', index: 'inCodTipDat', label: 'Tipo', width: 50, hidden: true },
   		                   {
   		                       name: 'dcCan', index: 'dcCan', label: 'Cantidad', width: 50, align: "right", sorttype: "float",
   		                       formatter: function (value, options, rData) {
   		                           if (value == '0') {
   		                               return 'Ilimitado';
   		                           }
   		                           else {
   		                               return FormatoNumero(value.toString(), oCulturaUsuario, true);
   		                           }
   		                       }
   		                   },
                           {
                               name: 'dcMonto', index: 'dcMonto', label: 'Monto', align: "right", width: 50,
                               formatter: function (value, options, rData) {
                                   return FormatoNumero(value.toString(), oCulturaUsuario, false);

                               }
                           },
                           { name: 'inTipAsig', index: 'inTipAsig', label: 'TipoAsig', width: 50, hidden: true },
                           { name: 'dcMonTotCta', index: 'dcMonTotCta', label: 'dcMonTotCta', width: 50, hidden: true },
                           { name: 'dcCanTotCta', index: 'dcCanTotCta', label: 'dcCanTotCta', width: 50, hidden: true },
        ],
        sortname: "P_inCod", //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: "480",
        height: "125",
        rownumbers: true,
        caption: "Servicios",
        ondblClickRow: function (id) { $("#btnModificarServicio").click(); }
    });

    $("#tblServicio").jqGrid('bindKeys', { "onEnter": function (id) { $("#btnModificarServicio").click(); }, "onSpace": function (id) { $("#btnModificarServicio").click(); } });


    tblResponsable = $("#tblResponsable").jqGrid({
        datatype: "local",
        colModel: [{ name: 'vcCodInt', index: 'vcCodInt', label: 'Código Int', width: 100, hidden: true },
                   { name: 'vcCodOrga', index: 'vcCodOrga', label: 'Código Org.', width: 80, hidden: false },
   		           { name: 'vcArea', index: 'vcArea', label: 'Area', width: 200, hidden: false },
   		           { name: 'vcCodEmpleado', index: 'vcCodEmpleado', label: 'Código Emp.', width: 70, hidden: false },
                   { name: 'vcNomEmpleado', index: 'vcNomEmpleado', label: 'Empleado', width: 250, hidden: false },
                   { name: 'vcCorreo', index: 'vcCorreo', label: 'Correo', width: 100, hidden: false }
        ],
        sortname: "vcCodInt", //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: "725",
        height: "40",
        rownumbers: false,
        caption: "",
        //forceFit: false, 
        shrinkToFit: false
    });


    IniciarPagina();
    function IniciarPagina() {
        DimPosElementos();
        $(".tdEtiqueta").css("width", "130px");

        if ($("#hdfAsigCred").val() == "2") {
            AbrirLineaServicio($("#hdfLinea").val(), $("#hdfCodCuenta").val(), $("#hdfAsigCred").val(), $("#hdfServicio").val(), "");
            //alert($("#ifServicios").attr("src"));
            //            var servicios = JSON.parse($("#hdfServicio").val());
            //            $(servicios).each(function ()
            //            {
            //                $("#tblServicio").jqGrid('addRowData', this.P_inCod, { id: this.P_inCod, 'P_inCod': this.P_inCod, 'inCodTipDat': this.inCodTipDat, 'vcNom': this.vcNom, 'dcCan': this.dcCan, 'inCodTipSer': this.P_inCod, 'dcMonto': this.dcMon, 'inTipAsig': this.inTipAsig, 'dcMonTotCta': this.dcMonTotalCta, 'dcCanTotCta': this.dcCanTotalCta });
            //            });
        }
        if ($("#hdfEstadoLinea").val() == "True" && $("#hdfEstadoEmpleado").val() == "False") {
            if ($("#hdfEmplResponsable").val() != "") {
                var EmpleadosResponsables = JSON.parse($("#hdfEmplResponsable").val());
                $(EmpleadosResponsables).each(function () {
                    $("#tblResponsable").jqGrid('addRowData', this.vcCodInt, { id: this.vcCodInt, 'vcCodInt': this.vcCodInt, 'vcCodOrga': this.vcCodOrga, 'vcArea': this.vcArea, 'vcCodEmpleado': this.vcCodEmpleado, 'vcNomEmpleado': this.vcNomEmpleado, 'vcCorreo': this.vcCorreo });
                });
            }
        }
        //$("#ifServicios")[0].contentWindow.CargarServiciosLineas($("#hdfServicio").val());
    }
        
    $("#btnLiberarLinea").click(function () {
        var $width = 450;
        var $height = 170;

        dialogLiberacion = $("#dvLiberarLinea").dialog({
            title: "Liberar Línea",
            width: $width,
            height: $height,
            modal: true,
            resizable: false,
            open: function (event, ui) {
                window.parent.$("#TabOpciones").scrollTop(0);
            }
        });
    });

    $("#btnAceptarPopup").click(function () {
        var LibDispositivo = 0;
        var LibEmpleado = 0;

        LibDispositivo = document.getElementById("ChkLiberarDispositivo").checked;
        LibEmpleado = document.getElementById("ChkLiberarEmpleado").checked;
        if (LibDispositivo == false && LibEmpleado == false) {
            alerta("Seleccione por lo menos una opción");
            return;
        }
        $("#btnGuardar").click();
    });


    $("#btnCerrarPopup").click(function () {
        dialogLiberacion.dialog("close");
    });
    

    //agregado 04/07/2014 wapumayta
    $("#chkDarBaja").change(function () {
        if (!$(this).is(":checked")) {
            $("#lblBajaCon").text("");
        }
        if ($("#ddlLineaTipo").val() == 1) { //tipo staff
            if ($("#chkDarBaja").next().text() == "Dar de alta") {
                $("#chkEstado").attr("checked", $(this).is(":checked"));
                //$("#lblBajaCon").text("(con dispositivo)");
                if ( $(this).is(":checked") && $("#hdfCodDispositivos").val() != '') {
                    $("#MsgConfirmacionActivaLineaStaff").dialog({
                        title: "Dispositivos asociados",
                        modal: true,
                        buttons: {
                            "Si": function () {
                                bajaDisp = true;
                                $("#lblBajaCon").text("(con dispositivo)");
                                $(this).dialog("close");
                            },
                            "No": function () {
                                bajaDisp = false;
                                //$("#chkDarBaja").attr("checked", false);
                                $("#lblBajaCon").text("(solo línea)");
                                $(this).dialog("close");
                            }
                        }
                    });
                }

                return;
            }
            

            if ($("#hdfSituacion").val() == "1" && $(this).is(":checked") && $("#hdfCodDispositivos").val() != '') {
                $("#MsgConfirmacionBajaLineaStaff").dialog({
                    title: "Dispositivos asociados",
                    modal: true,
                    buttons: {
                        "Si": function () {
                            bajaDisp = true;
                            $("#lblBajaCon").text("(con dispositivo)");
                            $(this).dialog("close");
                        },
                        "No": function () {
                            bajaDisp = false;
                            //$("#chkDarBaja").attr("checked", false);
                            $("#lblBajaCon").text("(solo línea, se liberará el dispositivo asociado.)");
                            $(this).dialog("close");
                        }
                    }
                });
            }
        } else { //familia
            if ($("#hdfSituacion").val() == "1" && $(this).is(":checked")) { //dar de baja
                $("#MsgConfirmacionBajaLineaFamilia").dialog({
                    title: "Dispositivos asociados",
                    modal: true,
                    buttons: {
                        "Aceptar": function () {
                            $(this).dialog("close");
                        }
                    }
                });
            }
        }
    }); 

    //EDGAR GARCIA 01032023 control de cambios linea
    var Linea_Old = new Object();
    Linea_Old.emp = $("#txtEmpleado").val()
    Linea_Old.simcard = $("#select2-ddlSimCard-container").text()
    Linea_Old.plan = $("#hdfCodPlan").val()
    Linea_Old.fechaAlta = $("#txtFechaAlta").val()
    Linea_Old.MesesContrato = $("#txtMesesContrato").val()
    Linea_Old.Dispositivo = $("#hdfCodDispositivos").val()
    Linea_Old.DarBaja = $('#chkDarBaja').prop('checked')
    Linea_Old.Observacion = $("#txt_Observacion2").val()
    Linea_Old.Sim = $("#txt_SIM").val()
    Linea_Old.Region = $("#txt_Region").val()
    Linea_Old.Responsabilidad = $("#txt_Responsabilidad").val()
    Linea_Old.UnidadNegocio = $("#txt_UnidadNegocio").val()
    Linea_Old.EstatusTelf = $("#ddl_EstatusTelefono").val()
    Linea_Old.EstatusCuenta = $("#ddl_EstatusCuenta").val()
    Linea_Old.FechaTermino = $("#txt_FechaTerminoContrato").val()
    Linea_Old.Vencimiento = $("#txt_Vencimiento").val()
    Linea_Old.CuentaHija = $("#hdfCodCuenta").val()
    Linea_Old.PlanOperador = $("#txt_CodigoPlanOperador").val()
    Linea_Old.NombrePlanOperador = $("#txt_NomPlanOperador").val()
    Linea_Old.ContactoUN = $("#txt_ContactoUN").val()
    Linea_Old.UltimaActualizacion = $("#ddl_UltimaActualizacion").val() 
    //Edgar Garcia 01032023 
    function compararObjetos(obj1, obj2) { 
        // Recorremos las propiedades del primer objeto
        for (let propiedad in obj1) { 
                // Comprobamos si los valores de ambas propiedades son iguales
            console.log( propiedad)

            if (obj1[propiedad] !== obj2[propiedad]) {
                    return false;
                } 
        }
        // Si hemos llegado hasta aquí, es que los objetos tienen las mismas propiedades y valores
        return true;
    }
     
    $("#btnGuardar").on("click", function () {
        var Linea_New = new Object();
        Linea_New.emp = $("#txtEmpleado").val()
        Linea_New.simcard = $("#select2-ddlSimCard-container").text()
        Linea_New.plan = $("#ddlPlan option:selected").val()
        Linea_New.fechaAlta = $("#txtFechaAlta").val()
        Linea_New.MesesContrato = $("#txtMesesContrato").val()
        Linea_New.Dispositivo = $("#txt_Dispositivos").val().split('-')[0]
        Linea_New.DarBaja = $('#chkDarBaja').prop('checked')
        Linea_New.Observacion = $("#txt_Observacion2").val()
        Linea_New.Sim = $("#txt_SIM").val()
        Linea_New.Region = $("#txt_Region").val()
        Linea_New.Responsabilidad = $("#txt_Responsabilidad").val()
        Linea_New.UnidadNegocio = $("#txt_UnidadNegocio").val()
        Linea_New.EstatusTelf = $("#ddl_EstatusTelefono").val()
        Linea_New.EstatusCuenta = $("#ddl_EstatusCuenta").val()
        Linea_New.FechaTermino = $("#txt_FechaTerminoContrato").val()
        Linea_New.Vencimiento = $("#txt_Vencimiento").val()
        Linea_New.CuentaHija = $("#select2-ddlCuenta-container").text()
        Linea_New.PlanOperador = $("#txt_CodigoPlanOperador").val()
        Linea_New.NombrePlanOperador = $("#txt_NomPlanOperador").val()
        Linea_New.ContactoUN = $("#txt_ContactoUN").val()
        Linea_New.UltimaActualizacion = $("#ddl_UltimaActualizacion").val()

        console.log(Linea_Old) 
        console.log(Linea_New) 
       

        if ( compararObjetos(Linea_Old, Linea_New)) { 
            alerta("Sin cambios en la linea");
            return ;
        } 
          //

        if ($("#hdfMensajeLinea").val() != '') {
            alerta($("#lblMensajeLinea").text());
            return;
        }

        if ($("#txtNumero").val() == "") {
            alerta("El número es un campo obligatorio");
            $("#txtNumero").focus();
            return;
        }

        var Nombre = $("#txtNombre").val();
        var Linea = new linea();
        var LibDispositivo = 0;
        var LibEmpleado = 0;

        Linea.P_vcNum = $("#txtNumero").val();
        Linea.Empleado.P_vcCod = $("#hdfCodEmpleado").val();
        Linea.F_inCodTip = $("#ddlLineaTipo").val().replace(/'/g, "&#39");
        Linea.Dispositivo.P_vcCodIMEI = $("#hdfCodDispositivos").val().replace(/'/g, "&#39");
        Linea.Sucursal.P_vcCod = $("#ddlSucursal").val(); //$("#hdfCodSucursal").val();
        Linea.Cuenta.P_vcCod = $("#ddlCuenta").val().replace(/'/g, "&#39");
        Linea.Operador.P_inCodOpe = $("#ddlOperador").val();
        Linea.btVig = false;
        LibDispositivo = document.getElementById("ChkLiberarDispositivo").checked;
        LibEmpleado = document.getElementById("ChkLiberarEmpleado").checked;

        Linea.SimCard.P_vcSimCard = $("#ddlSimCard").val().replace(/'/g, "&#39");
        //jherrera 20130423 Se agrego la validación para el campo F_inCodTip
        //------------------------------------------------------------------
        if (Linea.F_inCodTip == "-1") {
            Linea.F_inCodTip = 1;
            ////alerta("Seleccione un tipo de línea, es un campo obligatorio");
            ////$("#ddlLineaTipo").focus();
            ////return;
        }

        if ($("#ddlOperador").val() == "-1" && Linea.Cuenta.P_vcCod == "-1") { //descomentado Jcamacho 2015/09/10
            alerta("Seleccione un Operador, es un campo obligatorio");
            $("#ddlOperador").focus();
            return;
        }

        if (Linea.Cuenta.P_vcCod == "-1") {
            alerta("Seleccione una cuenta, es un campo obligatorio");
            $("#ddlCuenta").focus();
            return;
        }
        if (Linea.Cuenta.P_vcCod == "-2") {
            alerta("Cree una cuenta y vuelva a intentarlo");
            $("#ddlCuenta").focus();
            return;
        }

        if ($("#hdfAsigCred").val() == "1" && $("#ddlPlan").val() == "-1") { //Agregado Jcamacho 2015/09/10
            alerta("Seleccione un plan, es un campo obligatorio");
            $("#ddlPlan").focus();
            return;
        }

        if ($("#ddlSucursal").val() == "-1") { //Agregado Jcamacho 2015/09/10
            alerta("Seleccione una sucursal, es un campo obligatorio");
            $("#ddlSucursal").focus();
            return;
        }

        //if ($("#ddlLineaTipo").val() == "2" && $("#ddlCampana").val() == "-1") { //Agregado Jcamacho 2015/09/10
        //    alerta("Seleccione una campaña");
        //    $("#ddlCampana").focus();
        //    return;
        //}

        //#region validacion FechaAlta // 14-11-2014 wapumayta
        if ($.trim($("#txtFechaAlta").val()) == "") {
            alerta("Asigne fecha alta de línea");
            $("#txtFechaAlta").focus();
            return;
        }


        if ($("#ddlLineaTipo").val() == 2) {
            //            if ($("#hdfCodEmpleado").val() == "") {
            //                alerta("Seleccione un Empleado para este Tipo de Línea, es un campo obligatorio");
            //                $("#txtEmpleado").focus();
            //                return;
            //            }

            if ($("#hdfAsigCred").val() == "1") {//1	Por planes
                if ($("#ddlPlan").val() == "-1") {
                    alerta("Seleccione un plan, es un campo obligatorio");
                    $("#ddlPlan").focus();
                    return;
                }
            }

            //if ($("#ddlCampana").val() == -1) {
            //    alerta("Selecione un campaña");
            //    $("#ddlCampana").focus();
            //    return;
            //}

            var dtFechaAlta;
            try {
                dtFechaAlta = Date.parseExact($.trim($("#txtFechaAlta").val()), oCulturaUsuario.vcFecCor);
                if (dtFechaAlta == null) {
                    alerta("Ingrese una fecha de alta correcta");
                    $("#txtFechaAlta").focus();
                    return;
                }
            } catch (e) {
                alerta("Ingrese una fecha de alta correcta");
                $("#txtFechaAlta").focus();
                return;
            }
            //#endregion

            if ($.trim($("#txtFechaInicioContrato").val()) == "") {
                alerta("Asigne fecha inicio de contrato");
                $("#txtFechaInicioContrato").focus();
                return;
            }

            var dtFechaInicio;
            try {
                dtFechaInicio = Date.parseExact($.trim($("#txtFechaInicioContrato").val()), oCulturaUsuario.vcFecCor);
                if (dtFechaInicio == null) {
                    alerta("Ingrese una fecha correcta");
                    $("#txtFechaInicioContrato").focus();
                    return;
                }
            }
            catch (e) {
                alerta("Ingrese una fecha de inicio correcta");
                $("#txtFechaInicioContrato").focus();
                return;
            }

            //var dtFechaAsignacionEmpleado;
            //try {
            //    dtFechaAsignacionEmpleado = Date.parseExact($.trim($("#txtFechaAsignacionEmpleado").val()), oCulturaUsuario.vcFecCor);
            //    if (dtFechaAsignacionEmpleado == null) {
            //        alerta("Ingrese una fecha de Asignacion del Empleado correcta");
            //        $("#txtFechaAsignacionEmpleado").focus();
            //        return;
            //    }
            //} catch (e) {
            //    alerta("Ingrese una fecha de Asignacion del Empleado correcta");
            //    $("#txtFechaAsignacionEmpleado").focus();
            //    return;
            //}
            //
            //var dtFechaAsignacionEquipo;
            //try {
            //    dtFechaAsignacionEquipo = Date.parseExact($.trim($("#txtFechaAsignacionDispositivo").val()), oCulturaUsuario.vcFecCor);
            //    if (dtFechaAsignacionEquipo == null) {
            //        alerta("Ingrese una fecha de Asignacion del Dispositivo correcta");
            //        $("#txtFechaAsignacionDispositivo").focus();
            //        return;
            //    }
            //} catch (e) {
            //    alerta("Ingrese una fecha de Asignacion del Dispositivo correcta");
            //    $("#txtFechaAsignacionDispositivo").focus();
            //    return;
            //}

            //if ($("#ddlMesesContrato").val() == "-1") {
            //    alerta("Asigne meses de duración");
            //    $("#ddlMesesContrato").focus();
            //    return;
            //}

            if ($("#txtMesesContrato").val().trim() === "") {
                alerta("Asigne meses de duración");
                $("#txtMesesContrato").focus();
                return;
            }
        } else {
            if ($("#hdfAsigCred").val() == "1") {//1	Por planes
                if ($("#ddlPlan").val() == "-1" || $("#ddlPlan").val() == "-2") {
                    alerta("Seleccione un plan, es un campo obligatorio");
                    $("#ddlPlan").focus();
                    return;
                }
            }
        }

        //if ($("#hdfPermitirGuardarTipSer").val() == "0") {
        //    alerta("El tipo de servicio asociado al dispositivo y el tipo de servicio asociado a la Cuenta no son compatibles.");
        //    $("#ddlCuenta").focus();
        //    return;
        //}

        //dar de baja 04/07/2014 wapuayta
        var darBaja;
        if ($("#chkDarBaja").is(":checked") && $("#hdfSituacion").val() == "1" && bajaDisp) { //esta activo, chekc true = dar de baja
            //alert("dar de baja con disp - 3");
            darBaja = 3;
        } else if ($("#chkDarBaja").is(":checked") && $("#hdfSituacion").val() == "1" && !bajaDisp) { //esta activo, chekc true = dar de baja
            //alert("dar de baja sin disp - 4");
            darBaja = 4;
        } else if ($("#chkDarBaja").is(":checked") && $("#hdfSituacion").val() == "0" && bajaDisp) { // estado baja, check true = dar alta
            //alert("dar alta - 2"); --CON DISPOSITIVO
            darBaja = 2;
        } else if ($("#chkDarBaja").is(":checked") && $("#hdfSituacion").val() == "0" && !bajaDisp) { // estado baja, check true = dar alta
            //alert("dar alta - 2"); --SIN DISPOSITIVO
            darBaja = 5;
        } else if (!$("#chkDarBaja").is(":checked") && $("#hdfSituacion").val() == "1") { //estado activo, check false = mantener en alta
            //alert("mantener en alta - 1");
            darBaja = 1;
        } else if (!$("#chkDarBaja").is(":checked") && $("#hdfSituacion").val() == "0") { //estaso baja, check false = mantener en baja
            //alert("mantener en baja - 0");
            darBaja = 0;
        }
        Linea.Estado.P_inCod = darBaja;
        //fin de baja

        //#region FechaAlta //14-11-2014 wapumayta
        var fecAlta;
        var miFechaAlta = $("#txtFechaAlta").datepicker("getDate");
        var DiaAlta = miFechaAlta.getDate().toString();
        var MesAlta = (parseInt(miFechaAlta.getMonth()) + 1).toString();
        var AnoAlta = miFechaAlta.getFullYear().toString();
        if (DiaAlta.length < 2)
        { DiaAlta = "0" + DiaAlta; }
        if (MesAlta.length < 2)
        { MesAlta = "0" + MesAlta; }
        fecAlta = AnoAlta + MesAlta + DiaAlta;
        Linea.FechaAlta = fecAlta;
        //#endregion

        if ($("#ddlLineaTipo").val() == 2) {
            Linea.IdCampana = $("#ddlCampana").val();
            Linea.NombreCampana = $("#ddlCampana option:selected").text();
            var fecha;
            var miFechaInicio = $("#txtFechaInicioContrato").datepicker("getDate");
            var DiaInicio = miFechaInicio.getDate().toString();
            var MesInicio = (parseInt(miFechaInicio.getMonth()) + 1).toString();
            var AnoInicio = miFechaInicio.getFullYear().toString();

            if (DiaInicio.length < 2)
            { DiaInicio = "0" + DiaInicio; }

            if (MesInicio.length < 2)
            { MesInicio = "0" + MesInicio; }

            fecha = AnoInicio + MesInicio + DiaInicio;

            Linea.FechaInicioContrato = fecha;
            Linea.MesesContrato = $("#txtMesesContrato").val();
            //Linea.MesesContrato = $("#ddlMesesContrato").val();
        }
        else {
            Linea.NombreCampana = '';
            Linea.IdCampana = '0';
            var miFechaInicio = $("#txtFechaInicioContrato").datepicker("getDate");

            if (miFechaInicio != null) {
                var DiaInicio = miFechaInicio.getDate().toString();
                var MesInicio = (parseInt(miFechaInicio.getMonth()) + 1).toString();
                var AnoInicio = miFechaInicio.getFullYear().toString();
                if (DiaInicio.length < 2)
                { DiaInicio = "0" + DiaInicio; }

                if (MesInicio.length < 2)
                { MesInicio = "0" + MesInicio; }

                fecha = AnoInicio + MesInicio + DiaInicio;

                Linea.FechaInicioContrato = fecha;
                if ($.trim($("#txtFechaInicioContrato").val()) != "") {
                    if ($.trim($("#txtMesesContrato").val()) == "") {
                    //if ($("#ddlMesesContrato").val() == "-1") {
                        alerta("Asigne meses de duración");
                        //$("#ddlMesesContrato").focus();
                        $("#txtMesesContrato").focus();
                        return;
                    }
                }
                //Linea.MesesContrato = $("#txtMesesContrato").val();
                Linea.MesesContrato = $("#txtMesesContrato").val();
            } else {
                Linea.FechaInicioContrato = '';
                Linea.MesesContrato = '0';
            }
        }

        if ($('#chkEstado').is(':checked')) {
            Linea.btVig = true;
        }

        //------------------------------------------------------------------
        //        if (Linea.Dispositivo.P_vcCodIMEI == "") {
        //            alerta("El Dispositivo es un campo obligatorio");
        //            $("#txt_Dispositivos").focus();
        //            return;
        //        }
        //------------------------------------------------------------------
        //        if (Linea.Sucursal.P_vcCod == "" || !SeleccionoSucursal)
        //        {
        //            alerta("La sucursal es un campo obligatorio");
        //            $("#txtSucursal").focus();
        //            return;
        //        }

        if ($("#hdfPerFac").val() == "2") {//1	Por planes
            Linea.dcPerFacIni = $("#ddlDiaInicial").val();
            Linea.dcPerFacFin = $("#lblDiaFinal").html();
        }
        else {
            Linea.dcPerFacIni = "-1";
            Linea.dcPerFacFin = "-1";
        }

        //var FecIniAlta = Date.parseExact($.trim($("#txtFechaAlta").val()), oCulturaUsuario.vcFecCor);
        //var FecIniContrato = Date.parseExact($.trim($("#txtFechaInicioContrato").val()), oCulturaUsuario.vcFecCor);
        //if ((FecIniAlta - FecIniContrato) >= 0) {
        //    alerta("La fecha Alta debe ser menor a la fecha Inicio Contrato");
        //    return;
        //}

        if ($("#hdfAsigCred").val() == "1") {//1	Por planes
            Linea.Plan.P_inCod = $("#ddlPlan").val();
            Linea.dcMon = "0";
            if (Linea.Cuenta.P_vcCod == "-1") {
                alerta("Seleccione un plan, es un campo obligatorio");
                $("#ddlPlan").focus();
                return;
            }
        }
        else if ($("#hdfAsigCred").val() == "2") {//2	Por distribución de bolsa
            Linea.Plan.P_inCod = "-1";
            //Linea.dcMon = $("#txtMonto").val();
            if (Linea.dcMon == "") {
                Linea.dcMon = "0";
            }
            //if (Linea.dcMon == "0" || parseFloat(Linea.dcMon) <= 0) {
            //    alerta("Seleccione un plan, es un campo obligatorio");
            //    $("#txtMonto").focus();
            //    return;
            //}

            $($("#ifServicios")[0].contentWindow.ObtenerServiciosLineas()).each(function () {
                var Servicio = this;
                Linea.Servicios.push(Servicio);
            });

            //            var Filas = $("#tblServicio").getGridParam("data");

            //            $(Filas).each(function ()
            //            {
            //                Servicio = new servicio();

            //                Servicio.P_inCod = this.inCodTipSer;

            //                var Cantidad = this.dcCan;
            //                if (oCulturaUsuario.vcSimSepMil == ",")
            //                {
            //                    Cantidad = Cantidad.toString().replace(/,/g, "");
            //                }
            //                Servicio.dcCan = Cantidad;
            //                Servicio.inCodTipDat = this.inCodTipDat;
            //                if (this.dcMonto == 0)
            //                {
            //                    Servicio.dcMon = 0;
            //                } else
            //                {
            //                    Servicio.dcMon = DevuelveNumeroSinFormato(this.dcMonto, oCulturaUsuario, true);
            //                }
            //                Servicio.inTipAsig = this.inTipAsig;

            //                Linea.Servicios.push(Servicio);

            //                ////evaludar cantidad restantes antes de activar una linea
            //                //if ($("#chkDarBaja").is(":checked") && $("#hdfSituacion").val() == "0") {
            //                //    var vcNomServ = '';
            //                //    var dcCan = this.dcCan;
            //                //    var pvcCodSer = (this.inCodTipDat = "1" ? this.inCodTipSer : 0);
            //                //    var pvcCodTipSer = (this.inCodTipDat = "2" ? this.inCodTipSer : 0);
            //                //    $.ajax({
            //                //        type: "POST",
            //                //        url: "Mnt_Linea.aspx/ObtenerCantidadRestante",
            //                //        data: "{'pvcCodCta': '" + Linea.Cuenta.P_vcCod + "'," +
            //                //                "'pvcCodTipSer': '" + pvcCodTipSer + "'," +
            //                //                "'vcNumLin': '" + $("#hdfLinea").val() + "'," +
            //                //                "'pvcCodSer': '" + pvcCodSer + "'," +
            //                //                "'inCodSubCue':'" + 0 + "'}",
            //                //        contentType: "application/json; charset=utf-8",
            //                //        dataType: "json",
            //                //        success: function (result) {
            //                //            if (result.d.dcCan < dcCan) {
            //                //
            //                //            }
            //                //        },
            //                //        error: function (xhr, err, thrErr) {
            //                //            MostrarErrorAjax(xhr, err, thrErr);
            //                //            BloquearPagina(false);
            //                //        }
            //                //    });
            //                //}
            //                ////---------------------------------
            //            });
        }
        else if ($("#hdfAsigCred").val() == "3") {//3	Libre
            Linea.Plan.P_inCod = "-1";
            Linea.dcMon = "0";
        }

        var dtAsignacionEmpl;
        var dtAsignacionEmpl = $("#txtFechaAsignacionEmpleado").datepicker("getDate");
        if (dtAsignacionEmpl == null) {
            dtAsignacionEmpl = "";
        } else {
            var DiaAsigEmp = dtAsignacionEmpl.getDate().toString();
            var MesAsigEmp = (parseInt(dtAsignacionEmpl.getMonth()) + 1).toString();
            var AnoAsigEmp = dtAsignacionEmpl.getFullYear().toString();
            if (DiaAsigEmp.length < 2)
            { DiaAsigEmp = "0" + DiaAsigEmp; }
            if (MesAsigEmp.length < 2)
            { MesAsigEmp = "0" + MesAsigEmp; }
            dtAsignacionEmpl = AnoAsigEmp + MesAsigEmp + DiaAsigEmp;
        }

        var dtAsignacionDisp;
        var dtAsignacionDisp = $("#txtFechaAsignacionDispositivo").datepicker("getDate");
        if (dtAsignacionDisp == null) {
            dtAsignacionDisp = "";
        } else {
            var DiaAsigDis = dtAsignacionDisp.getDate().toString();
            var MesAsigDis = (parseInt(dtAsignacionDisp.getMonth()) + 1).toString();
            var AnoAsigDis = dtAsignacionDisp.getFullYear().toString();
            if (DiaAsigDis.length < 2)
            { DiaAsigDis = "0" + DiaAsigDis; }
            if (MesAsigDis.length < 2)
            { MesAsigDis = "0" + MesAsigDis; }
            dtAsignacionDisp = AnoAsigDis + MesAsigDis + DiaAsigDis;
        }

        var oLinea = JSON.stringify(Linea);

        //SERVICIOS ADICIONALES
        var XMLServAdic = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT>";
        var lstIdServ = tbServiciosAdicionales.getDataIDs();
        var lstImaOpc = "";
        for (i = 0; i < lstIdServ.length; i++) {
            var rowServ = tbServiciosAdicionales.getRowData(lstIdServ[i]);
            var vcMuestra = "0";
            if ($("#chkAct-" + rowServ.inIdSer).is(":checked")) {
                XMLServAdic += "<DATA inIdSer=\"" + rowServ.inIdSer + "\" btActiva=\"" + true + "\" btEstado=\"" + true + "\" />";
            } else {
                if ($("#hdfLinea").val() != "" && rowServ.btHab == "True") {
                    XMLServAdic += "<DATA inIdSer=\"" + rowServ.inIdSer + "\" btActiva=\"" + false + "\" btEstado=\"" + true + "\" />";
                }
            }
        }
        XMLServAdic += "</ROOT>";

        var CamposDinamicos = "";

        $(".VARCHAR").each(function (i) {
            /*EDGAR GARCIA 19012023 QUE NO ACTUALICE EL USUARIOMODIFICADOR*/
            if ($(this).attr("obj") != "vcNomUsuModif") { 
            //            if (this.value != "") {
            CamposDinamicos += "[" + $(this).attr("obj") + "]";
            CamposDinamicos += " = \"";
            CamposDinamicos += this.value.replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
            CamposDinamicos += "\",";
                //            }
            }
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
                if (NumeroDecimal > 99999999.99) {
                    alerta("El valor ingresado '" + this.value + "' debe ser menor.");
                    ValidacionNumerica = false;
                    return;
                }
            }
            CamposDinamicos += ",";
        });
        if (!ValidacionNumerica) { return; }

        $(".DATE").each(function (i) {
            //            if (this.value != "") {
            CamposDinamicos += "[" + $(this).attr("obj") + "]";
            CamposDinamicos += " = \"";
            CamposDinamicos += this.value;
            CamposDinamicos += "\",";
            //            }
        });
        $(".DATETIME").each(function (i) {
            var nVal = this.value.substring(0, 20);
            //            if (this.value != "") {
            CamposDinamicos += "[" + $(this).attr("obj") + "]";
            CamposDinamicos += " = \"";
            CamposDinamicos += nVal;
            CamposDinamicos += "\",";
            //            }
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

        BloquearPagina(true);
        $.ajax({
            type: "POST",
            url: "Mnt_Linea.aspx/Guardar",
            data: "{'vcLin': '" + $("#hdfLinea").val() + "'," +
                   "'vcCamDim': '" + CamposDinamicos + "'," +
                   "'vcXMLServAdic': '" + XMLServAdic + "'," +
                   "'vcAdj': '" + vcAdjuntos + "'," +
                   "'vcAsignacionANSIEmpleado': '" + $.trim(dtAsignacionEmpl) + "'," +
                   "'vcAsignacionANSIDispositivo': '" + $.trim(dtAsignacionDisp) + "'," +
                   "'vcAsignacionEmpleado': '" + $.trim($("#txtFechaAsignacionEmpleado").val()) + "'," +
                   "'vcAsignacionDispositivo': '" + $.trim($("#txtFechaAsignacionDispositivo").val()) + "'," +
                   "'vcLiberarDispositivo': '" + LibDispositivo + "'," +
                   "'vcLiberarEmpleado': '" + LibEmpleado + "'," +
                   "'oLinea': '" + oLinea + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == "0") {
                    try {
                        window.parent.ActualizarGrilla();
                        if ($("#hdfAsigCred").val() == "2") {
                            $("#ifServicios")[0].contentWindow.LimpiarServiciosLineas();
                        }
                    } catch (e) {
                    }

                    try {
                        window.top.fnObtenerWindowPlantillaTab().$('#div_modal').dialog('close');
                    } catch (e) {
                    }
                    
                    Mensaje("<br/><h1>Línea guardada</h1><br/><h2>" + Linea.P_vcNum + "</h2>", document, CerroMensaje);
                } else if (result.d == "1") {
                    alerta("El número de la línea ya ha sido registrado anteriormente, no se pudo grabar el registro");
                    BloquearPagina(false);
                }
                else if (result.d == "-2") {
                    alerta("No se puede dar de baja a una Línea con Comprobantes No Emitidos");
                    BloquearPagina(false);
                }
                else if (result.d == "-3") {
                    alerta("No se puede dar de baja a una Línea con Comprobantes sin Cancelar");
                    BloquearPagina(false);
                }
                else {
                    var Resultados = [];
                    ServResult = result.d.split("-");
                    if (ServResult[0].split(",").length == 1) {
                        alerta("El servicio <b>" + ServResult[1].toString() + "</b> ha superado el límite del servicio");
                    } else {
                        alerta("Los servicios <b>" + ServResult[1].toString().replace(",", ", ") + "</b> han superado el límite del servicio");
                    } ///,\s*([^,]+)$/
                    //alerta("Uno o mas de los servicios de está línea está desbordando la cantidad minima configurada en la cuenta.");
                    BloquearPagina(false);
                }

                $("#ddlOperador").attr('disabled', true);
                EnabledControl("#ddlOperador", false);
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });
    });

    //EDGAR GARCIA 04112022
    $("#btnAgregar").click(function (event) {
        if ($("#ddlLineaTipo").val() != "-1") {
            $("#ifAgregarEmpleado").height("500");
            $('#ifAgregarEmpleado').attr("src", "../../../General/Administrar/Mantenimiento/Mnt_Empleado.aspx?IsLigero=1&inTipoLinea=" + $("#ddlLineaTipo").val());

            var alt2;

            if ($(window).height() < 320) {
                alt2 = $(window).height() - 30;
            }
            else {
                alt2 = 320;
            }

            

            ModalNuevo = $('#dvAgregarEmpleado').dialog({
                title: "Agregar Empleado",
                height: 280,
                width: 760,
                //width: 'auto',
                resizable: true,
                modal: true
                
            });
        } else {
            alerta("Seleccione el tipo de línea");
            return;
        }
        $("#SubdvCampo_Empl").css("display","block")

        //EDGAR GARCIA INICIO btnGuardar 04112022
        //$("#btnGuardar").button({
        //    disabled: false
        //}); 


        //if ($("#ddlLineaTipo").val() != "-1") {
        //    $('#Empl_data').attr("src", 'http://localhost:50601/General/Administrar/Mantenimiento/Mnt_Empleado.aspx?vcTab=M_EMPL');
        //    //$("#SubdvCampo_Empl").css("display", "block")
        //    //$("#Blockparent").css("display", "block")


            
        //    ModalNuevo = $('#SubdvCampo_Empl').dialog({
        //        title: "Agregar Empleado",
        //        /*height: $("#dvCampo").height()*0.7,*/
        //        /*width: $("#dvCampo").width()*0.8,*/
        //        height: $("#dvCampo").height() * 0.95,
        //        width: $("#dvCampo").width() * 0.8*0.7,
        //        //width: 'auto',
        //        resizable: true,
        //        modal: true,
        //        draggable:true,
        //        buttons: {
        //            "Cerrar": function () {
        //                $(this).dialog("close");
        //                //$("#Blockparent").css("display", "none")

        //            }
        //        }
        //    });


        //} else {
        //    alerta("Seleccione el tipo de línea");
        //    return;
        //}
         
    });

    $("#btnAgregarDispositivo").click(function (event) {      
        $('#ifAgregarDispositivo').attr("src", "Mnt_Dispositivo.aspx?IsLigero=1&inTipoLinea=" + $("#ddlLineaTipo").val());
        //$("#ifAgregarDispositivo").css("height", 425);
        $("#ifAgregarDispositivo").css("height", "390px");

        var alt2;

        if ($(window).height() < 410) {
            alt2 = $(window).height() - 30;
        }
        else {
            alt2 = 410;
        }

        ModalNuevo = $('#dvAgregarDispositivo').dialog({
            title: "Agregar Dispositivo",
            height: alt2,
            //width: 760,
            width: 'auto',
            resizable: false,
            modal: true
        });
    });

    $("#btnAgregarServicio").click(function () {
        var id = $("#tblServicio").jqGrid('getGridParam', 'selrow');
        AgregarModificarServicio(-1, "Agregar Servicio", 1);
    });

    $("#btnModificarServicio").click(function () {
        var id = $("#tblServicio").jqGrid('getGridParam', 'selrow');
        if (id) {
            AgregarModificarServicio(id, "Modificar Servicio", 2);
        }
        else {
            alerta("Seleccione un servicio");
        }
    });

    $("#btnEliminarServicio").click(function () {
        var id = $("#tblServicio").jqGrid('getGridParam', 'selrow');
        if (id) {
            var Fila = $("#tblServicio").jqGrid("getRowData", id);

            if (Fila.inCodTipDat == "1") {
                if ($("option", "#ddlServicio").length <= 1) {
                    $("#ddlServicio").html("");
                    $("#ddlServicio").append($("<option></option>").attr("value", "-1").text("<Seleccionar>"));
                }
                $("#ddlServicio").append($("<option></option>").attr("value", Fila.P_inCod).text(Fila.vcNom));
            }
            else if (Fila.inCodTipDat == "2") {
                if ($("option", "#ddlTipoServicio").length <= 1) {
                    $("#ddlTipoServicio").html("");
                    $("#ddlTipoServicio").append($("<option></option>").attr("value", "-1").text("<Seleccionar>"));
                }
                $("#ddlTipoServicio").append($("<option></option>").attr("value", Fila.P_inCod).text(Fila.vcNom));
            }

            $("#tblServicio").jqGrid('delRowData', id);
        }
        else {
            alerta("Seleccione un servicio");
        }
    });

    function AgregarModificarServicio(id, titulo, opcion) {
        indexServicio = id;
        $("#lblServicio").html("");
        if (id == -1) {//Nuevo
            listarServicioPorCuenta();
            //            $("#ddlTipoServicio").data("kendoComboBox").select(0);
            //            $("#ddlServicio").data("kendoComboBox").select(0);
            $(".trNuevo").show();
            $(".trEditar").hide();
            $("#txtCantidadServicio").val("");
            $("#ddlServicio").prop('selectedIndex', 0);
            $("#LblCanTotalMinutosXBolsa").text("");
            $("#LblCantAsignada").text("");
            $("#CantAsig").hide();
            $("#trIlimitado").show();
            $("#trCantidad").show();
            $("#chkServicioIlimitado").attr('checked', false);
            //if ($("#hdfLinea").val() == "") {
            //    $("#hdfAccion").val(3);
            //} else {
            //    $("#hdfAccion").val(3);
            //}
            CantidadModificada = 0;
        } else { //Editar
            var datos = $("#tblServicio").jqGrid('getRowData', id);
            var inCodSer = datos.P_inCod;
            var vcSer = datos.vcNom;
            var vcMon = datos.dcCan;
            var dcMonAsig = datos.dcMonto;
            var inTipAsig = datos.inTipAsig;
            var dcMonTotCta = datos.dcMonTotCta;
            var dcCanTotCta = datos.dcCanTotCta;

            //alert(inCodSer + "; " + vcSer + "; " + vcMon);
            //if (CantidadRegistrada == 0 && id == 16) {
            //    CantidadRegistrada = vcMon;
            //}
            //if (isEditar == true) {
            //    CantidadModificada = vcMon;
            //}
            CantidadModificada = vcMon; //agregado 05-08-2014 - wapumayta
            //isEditar = true;
            var vcCodCuenta = $("#ddlCuenta").val();
            if (inCodSer == 16 || inCodSer == 17 || inCodSer == 18) {
                var vcCodTipSer = inCodSer;
                var vcCodSer = 0;
            } else {
                var vcCodTipSer = 0;
                var vcCodSer = inCodSer;
            }
            //$("#hdfAccion").val(2);
            CargarMinutosRestantesXServicio(vcCodCuenta, vcCodTipSer, vcCodSer, $("#hdfAccion").val(), 1, id);

            if (vcMon == "Ilimitado") {
                vcMon = "0";
                $("#chkServicioIlimitado").attr('checked', true);
                $("#trCantidad").hide();
            }
            else {
                $("#chkServicioIlimitado").attr('checked', false);
                //$("#trCantidad").show();
                //$("#txtCantidadServicio").focus();
            }

            $("#lblServicio").html(vcSer);
            $("#txtCantidadServicio").val(vcMon);
            if (inTipAsig == 1) {
                $("#chkTipoAsignacion").attr('checked', true);
                $("#LblTipoAsignacion").text("Monto Automático");
                $("#txtMontoAsignado").attr("disabled", true);
            } else {
                $("#chkTipoAsignacion").attr('checked', false);
                $("#LblTipoAsignacion").text("Monto Manual");
                $("#txtMontoAsignado").attr("disabled", false);
            }
            $("#chkTipoAsignacion").attr("disabled", false);
            $("#hdfMonTotCta").val(dcMonTotCta);
            $("#hdfCanTotCta").val(dcCanTotCta);
            $("#txtMontoAsignado").val(dcMonAsig);
            $("#txtCantidadServicio").focus();
            $(".trNuevo").hide();
            $(".trEditar").show();
        }

        $('#divServicios').dialog({
            title: titulo,
            width: 450,
            modal: true,
            resizable: false
        });
    }

    $("#txtCantidadServicio").focusout(function (event) {
        if (indexServicio == '' || indexServicio == '-1') {
            if ($("#ddlServicio").val() == "-1" || $("#ddlServicio").val() == "-2") {
                $("#txtMontoAsignado").val(val_x_Defecto.toFixed(NumDec));
                //return;
            }
        }
        if ($("#txtCantidadServicio").val() != "" && $('#chkTipoAsignacion').is(':checked') == true) {
            dcMonXSubCta = $("#hdfMonTotCta").val();
            dcCanXSubCta = $("#hdfCanTotCta").val();
            $("#txtMontoAsignado").val(CalcularMontoAutomatico($("#txtCantidadServicio").val(), dcMonXSubCta, dcCanXSubCta));
        }
    });

    $("#txtCantidadServicio").keyup(function (event) {
        //alert(event.keyCode);
        if ((event.keyCode >= 35 && event.keyCode <= 40) || event.keyCode == 16) { //flechas, inicio, fin, shift
            return;
        }
        if (event.keyCode == 13) {
            $("#btnGuardarServicio").click();
            return;
        }
        if ($("#LblTipoServicio").text() == 16 || $("#LblTipoServicio").text() == 18) {
            if (parseInt($("#LblCantidad").text()) != "Ilimitado") {
                var CantServSinFormato = DevuelveNumeroSinFormato($("#txtCantidadServicio").val(), oCulturaUsuario, true);
                var CantIngresadaTxt = parseInt($("#txtCantidadServicio").val() == "" ? 0 : parseInt(CantServSinFormato));
                var CantRestanteTxt = parseInt($("#LblCantidad").text()) - CantIngresadaTxt;
                var Valor = (CantRestanteTxt < 0 ? 0 : CantRestanteTxt);
                //"#txtCantidadServicio"
                $("#LblCantAsignada").text(FormatoNumero(Valor, oCulturaUsuario, true));
                $(this).val(FormatoNumero(DevuelveNumeroSinFormato($(this).val(), oCulturaUsuario, true), oCulturaUsuario, true));
            }
        }
    });

    $("#btnGuardarServicio").click(function (event) {
        var inTipoSer = parseInt($("#ddlServicio").val() == 1 ? $("#LblTipoServicio").text() : $("#ddlServicio").val());
        var inCodSer = $("#ddlServicio").val();
        var vcNomSer = $("#ddlServicio option:selected").text();
        var inCodTipSer = $("#ddlTipoServicio").val();
        var vcNomTipSer = $("#ddlTipoServicio option:selected").text();
        var btSerIli = $('#chkServicioIlimitado').is(':checked');
        var CantidadServicioSinFormato = DevuelveNumeroSinFormato($("#txtCantidadServicio").val(), oCulturaUsuario, true);
        var dcCan = (btSerIli == true ? 0 : CantidadServicioSinFormato);
        var dcMon = $("#txtMontoAsignado").val();
        var inTipAsig = ($('#chkTipoAsignacion').is(':checked') == true ? 1 : 2);
        var dcMonTotCta = $("#hdfMonTotCta").val();
        var dcCanTotCta = $("#hdfCanTotCta").val();

        if (inCodTipSer < 0 && inCodSer < 0 && indexServicio == -1) {
            alerta("Seleccione un servicio o un tipo servicio, es un campo obligatorio");
            $("#ddlTipoServicio").focus();
            return;
        }

        if ((dcCan == "" || parseInt(dcCan) <= 0) && !btSerIli) {
            alerta("Ingrese la cantidad/minutos, es un campo obligatorio");
            $("#txtCantidadServicio").focus();
            return;
        }

        if ($("#LblCantidad").text() != "Ilimitado") {
            if (parseInt(dcCan) > parseInt($("#LblCantidad").text())) {
                if ($("#LblTextoServicio").text() == "MB Permitidos: ")
                { alerta("La cantidad/minutos ingresada excede a la cantidad permitida, es un campo obligatorio"); }
                else
                { alerta("La cantidad/minutos ingresada excede a la cantidad restante, es un campo obligatorio"); alerta("La cantidad/minutos ingresada excede a la cantidad restante, es un campo obligatorio"); }
                $("#txtCantidadServicio").focus();
                return;
            }
        }

        if (inTipAsig == 2 && $("#txtMontoAsignado").val() == "") {
            alerta("Ingrese un Monto, es un campo obligatorio");
            $("#txtMontoAsignado").focus();
            return;
        }

        if (indexServicio == -1) {
            var Filas = $("#tblServicio").getGridParam("data");
            var Ser = false;
            var TipSer = false;

            $(Filas).each(function () {
                if (this.inCodTipDat == "1") {
                    if (inCodSer == this.P_inCod) {
                        Ser = true;
                    }
                }
                else if (this.inCodTipDat == "2") {
                    if (inCodSer != 1) {
                        if (inCodSer == this.P_inCod) {
                            Ser = true;
                        }
                    } else {
                        if (inTipoSer == this.inCodTipSer) {
                            TipSer = true;
                        }
                    }
                }
            });

            if (Ser) {
                alerta("Usted ya agrego este servicio, elija otro");
                $("#ddlServicio").focus();
                return;
            }
            if (TipSer) {
                alerta("Usted ya agrego este tipo de servicio, elija otro");
                //$('#divServicios').dialog("close");
                return;
            }

            if (inCodSer == -1) {
                $("#tblServicio").jqGrid('addRowData', inCodTipSer, { id: inCodTipSer, 'P_inCod': inCodTipSer, 'inCodTipDat': "2", 'vcNom': vcNomTipSer, 'dcCan': dcCan, 'inCodTipSer': inTipoSer, 'dcMonto': dcMon, 'inTipAsig': inTipAsig, 'dcMonTotCta': dcMonTotCta, 'dcCanTotCta': dcCanTotCta });
                $("#ddlTipoServicio option:selected").remove();

                if ($("option", "#ddlTipoServicio").length == 1) {
                    $("#ddlTipoServicio").html("");
                    $("#ddlTipoServicio").append($("<option></option>").attr("value", -2).text("Sin datos"));
                }
            }
            else {
                if (vcNomSer == "<Todos>") {
                    $("#tblServicio").jqGrid('addRowData', inCodTipSer, { id: inCodTipSer, 'P_inCod': inCodTipSer, 'inCodTipDat': "2", 'vcNom': vcNomTipSer, 'dcCan': dcCan, 'inCodTipSer': inTipoSer, 'dcMonto': dcMon, 'inTipAsig': inTipAsig, 'dcMonTotCta': dcMonTotCta, 'dcCanTotCta': dcCanTotCta });
                } else {
                    $("#tblServicio").jqGrid('addRowData', inCodSer, { id: inCodSer, 'P_inCod': inCodSer, 'inCodTipDat': "1", 'vcNom': vcNomSer, 'dcCan': dcCan, 'inCodTipSer': inTipoSer, 'dcMonto': dcMon, 'inTipAsig': inTipAsig, 'dcMonTotCta': dcMonTotCta, 'dcCanTotCta': dcCanTotCta });
                }
                $("#ddlServicio option:selected").remove();

                if ($("option", "#ddlServicio").length == 1) {
                    $("#ddlServicio").html("");
                    $("#ddlServicio").append($("<option></option>").attr("value", -2).text("Sin datos"));
                }
            }
        }
        else {
            if (inCodSer == -1) {
                $("#tblServicio").jqGrid('setRowData', indexServicio, { 'dcCan': dcCan, 'dcMonto': dcMon, 'inTipAsig': inTipAsig, 'dcMonTotCta': dcMonTotCta, 'dcCanTotCta': dcCanTotCta });
            }
            else {
                $("#tblServicio").jqGrid('setRowData', indexServicio, { 'dcCan': dcCan, 'dcMonto': dcMon, 'inTipAsig': inTipAsig, 'dcMonTotCta': dcMonTotCta, 'dcCanTotCta': dcCanTotCta });
            }
        }
        $("#ddlServicio").removeAttr("disabled");
        $('#divServicios').dialog("close");
    });

    $("#btnCerrarServicio").click(function (event) {
        $('#divServicios').dialog("close");
    });

    $("#ddlTipoServicio").change(function (event) {
        //if ($("#ddlTipoServicio").val() != -1 || $("#ddlTipoServicio").val() != -2) {
        //$("#ddlServicio").prop('selectedIndex', 0);
        //}
        $("#txtCantidadServicio").val("");
        $("#chkTipoAsignacion").attr("checked", true);
        $("#txtMontoAsignado").attr("disabled", true);
        $("#txtMontoAsignado").val("");
        if ($("#ddlTipoServicio").val() == '-1' || $("#ddlTipoServicio").val() == '-2') {
            $("#LblCanTotalMinutosXBolsa").text("");
            $("#LblCantAsignada").text("");
            $("#CantAsig").hide();
            $("#trIlimitado").show();
            $("#trCantidad").show();
            $("#ddlServicio").prop('disabled', true);
            $("#chkTipoAsignacion").attr("checked", true);
            $("#txtMontoAsignado").val(val_x_Defecto.toFixed(NumDec));
            $("#chkTipoAsignacion").attr("disabled", true);
        } else {
            $("#LblCanTotalMinutosXBolsa").text("");
            $("#LblCantAsignada").text("");
            $("#CantAsig").hide();
            $("#trIlimitado").show();
            $("#trCantidad").show();
            $("#ddlServicio").prop('disabled', false);
            $("#chkTipoAsignacion").attr("checked", true);
            $("#txtMontoAsignado").val(val_x_Defecto.toFixed(NumDec));
            $("#chkTipoAsignacion").attr("disabled", true);
            $.ajax({
                type: "POST",
                url: "Mnt_Linea.aspx/ListarServicioPorCuentaLineas",
                data: "{'vcCodCue': '" + $("#ddlCuenta").val().replace(/'/g, "&#39") + "'," +
                      "'inCodTipSer': '" + $("#ddlTipoServicio").val().replace(/'/g, "&#39") + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    lstServicio = result.d;
                    var intCodTipServ;
                    $("#ddlServicio").html("");
                    //$("#ddlServicio").append($("<option></option>").attr("value", -1).text("<Seleccionar>"));
                    var items = [{ text: '<Seleccione>', value: -1 }];
                    if ($(lstServicio).length > 0) {
                        $(lstServicio).each(function () {
                            if (this.inCodTipDat == "1") {
                                //$("#ddlServicio").append($("<option></option>").attr("value", 1).text());
                                items.push({ text: "<Todos>", value: 1 });
                            }

                            if (this.inCodTipDat == "2") {
                                //$("#ddlServicio").append($("<option></option>").attr("value", this.P_inCod).text(this.vcNom));
                                items.push({ text: this.vcNom.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'), value: this.P_inCod });
                            }
                            intCodTipServ = this.inCodOpe;
                        });
                    }
                    var dataSource = new kendo.data.DataSource({ data: items });
                    $("#ddlServicio").data("kendoComboBox").setDataSource(dataSource);
                    $("#ddlServicio").data("kendoComboBox").select(0);

                    if (intCodTipServ == 17) {
                        $("#LblTextoTipSer").html("Cantidad/MB:");
                        $("#LblTipoServicio").text(intCodTipServ.toString());
                    }
                    if (intCodTipServ == 18) {
                        $("#LblTextoTipSer").html("Cantidad:");
                        $("#LblTipoServicio").text(intCodTipServ.toString());
                    }
                    if (intCodTipServ == 16) {
                        $("#LblTextoTipSer").html("Cantidad/Minutos:");
                        $("#LblTipoServicio").text(intCodTipServ.toString());
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
    });

    $("#ddlServicio").change(function (event) {
        $("#txtCantidadServicio").val("");
        $("#chkTipoAsignacion").attr("checked", true);
        $("#txtMontoAsignado").attr("disabled", true);
        $("#txtMontoAsignado").val("");
        if ($("#ddlServicio").val() == "-1") {
            $("#LblCanTotalMinutosXBolsa").text("");
            $("#LblCantAsignada").text("");
            $("#CantAsig").hide();
            $("#trIlimitado").show();
            $("#trCantidad").show();
            $("#txtMontoAsignado").val(val_x_Defecto.toFixed(NumDec));
            $("#chkTipoAsignacion").attr("disabled", true);
            return;
        }
        var vcCodCuenta = $("#ddlCuenta").val();
        var vcCodTipSer = $("#ddlTipoServicio").val(); // ($("#ddlServicio").val() == 1 ? $("#ddlTipoServicio").val() : 0);
        var vcCodSer = ($("#ddlServicio").val() == 1 ? 0 : $("#ddlServicio").val()); //$("#ddlServicio").val();        

        $("#chkTipoAsignacion").attr("checked", true);
        if ($('#chkTipoAsignacion').is(':checked')) {
            $("#txtMontoAsignado").attr("disabled", true);
            $("#txtMontoAsignado").val(val_x_Defecto.toFixed(NumDec));
        }
        else {
            $("#txtMontoAsignado").attr("disabled", false);
            $("#txtMontoAsignado").val("");
        }
        $("#chkTipoAsignacion").attr("disabled", false);
        esSrvTipAsig = true;

        CargarMinutosRestantesXServicio(vcCodCuenta, vcCodTipSer, vcCodSer, $("#hdfAccion").val(), 0, '');
    });

    $("#chkServicioIlimitado").change(function (event) {
        if (esSrvIlimitado) { return; } //agregado 05/08/2014 wapumayta
        if ($('#chkServicioIlimitado').is(':checked')) {
            $("#trCantidad").hide();
            $("#txtCantidadServicio").val();
        }
        else {
            $("#txtCantidadServicio").val("");
            $("#trCantidad").show();
        }
    });

    $("#chkTipoAsignacion").change(function (event) {
        if ($('#chkTipoAsignacion').is(':checked')) {
            $("#LblTipoAsignacion").text("Monto Automático");
            $("#txtMontoAsignado").attr("disabled", true);
            $("#txtMontoAsignado").val("");
            if ($("#ddlServicio").val() == "-1" && indexServicio == "" || indexServicio == "-1") {
                $("#txtMontoAsignado").val(val_x_Defecto.toFixed(NumDec));
                return;
            }
            $("#txtMontoAsignado").val(CalcularMontoAutomatico($("#txtCantidadServicio").val(), dcMonXSubCta, dcCanXSubCta));
        }
        else {
            $("#LblTipoAsignacion").text("Monto Manual");
            $("#txtMontoAsignado").attr("disabled", false);
            $("#txtMontoAsignado").val("");
            //$("#txtMontoAsignado").val(CalcularMontoAutomatico($("#txtCantidadServicio").val(), dcMonXSubCta, dcCanXSubCta));
        }
    });

    $("#ddlDiaInicial").change(function () {
        if (this.value == 1) {
            $("#lblDiaFinal").html("30");
        }
        else {
            $("#lblDiaFinal").html(parseInt(this.value) - 1);
        }
    });

    $("#ddlCampana").change(function () {
        if ($("#ddlCampana").val() == '-1') {
            $("#LblFechaCampana").text('');
        } else {
            $.ajax({
                type: "POST",
                url: "Mnt_Linea.aspx/ListarPeriodoCampana",
                data: "{'IdCampana': '" + $("#ddlCampana").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    $("#LblFechaCampana").text(result.d["RangoFechaCampana"]);
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
    });

    $("#ddlOperador").on("change", function () {
        if ($("#ifServicios").attr("src") != undefined) {
            if ($("#ifServicios")[0].contentWindow.ObtenerCantidadServiciosLineas() > 0) {
                $("#lblMsgOperador").show();
                $("#MsgConfirmacionCambioOperador").dialog({
                    title: "Confirmación",
                    modal: true,
                    buttons: {
                        "Si": function () {
                            CloseAutocomplete();
                            ListarCuentaPlanesPorOperador();
                            $("#dvAsignacion1").show();
                            $("#ifServicios")[0].contentWindow.LimpiarServiciosLineas();
                            $("#hdfServicio").val("");
                            $("#tbServiciosAdicionales").trigger("reloadGrid");
                            $(this).dialog("close");
                        },
                        "No": function () {
                            $(this).dialog("close");
                        }
                    },
                    resizale: false
                });
            }
            else {
                CloseAutocomplete();
                ListarCuentaPlanesPorOperador();
                $("#tbServiciosAdicionales").trigger("reloadGrid");
            }
        } else {
            $("#dvAsignacion1").hide();
            CloseAutocomplete();
            ListarCuentaPlanesPorOperador();
            $("#tbServiciosAdicionales").trigger("reloadGrid");
        }

    });

    $("#ddlCuenta").change(function () {
        LimpiarValidacionDatosLinea();
        $("#hdfLineaTipoTemp").val($("#ddlLineaTipo").val()); //temporaral de tipo de linea
        CloseAutocomplete();
        setDatosBusquedaDispositivos();
        //$("#tblServicio").jqGrid('clearGridData');
        if ($("#ddlCuenta").val() != "-1") {
            $.ajax({
                type: "POST",
                url: "Mnt_Linea.aspx/MostrarDetalleCuenta",
                data: "{'vcCodCue': '" + $("#ddlCuenta").val().replace(/'/g, "&#39") + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    //alert("Codigo tipo asignación de crédito: " + result.d.TipoAsignacionCredito.P_inCod + "\nPerFac: " + result.d.TipoPeriodoFacturacion.P_inCod);
                    $("#hdfPerFac").val(result.d.TipoPeriodoFacturacion.P_inCod);
                    $("#hdfAsigCred").val(result.d.TipoAsignacionCredito.P_inCod);
                    $("#hdfTipoServicioCuenta").val(result.d.TipoServicio);

                    ValidarCuentaPlanDispositivo_TipoServicio();


                    if (result.d.Operador.P_inCodOpe != 0) { //Agregado Jcamacho
                        $("#ddlOperador").val(result.d.Operador.P_inCodOpe);
                    }

                    if ($("#hdfAsigCred").val() == 2) {
                        listarServicioPorCuenta();
                    }

                    if ($("#ddlOperador").val() != "-1" && $("#hdfAsigCred").val() == 1) {
                        $.ajax({
                            type: "POST",
                            url: "Mnt_Linea.aspx/ListarPlanPorOperador",
                            data: "{'inCodOpe': '" + $("#ddlOperador").val() + "','CodCuenta': '" + $("#ddlCuenta").val() + "','Linea':'" + $("#hdfLinea").val() + "'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result) {
                                $("#ddlPlan").html("");
                                //=Carga dinamica kendo====================================================================
                                $("#ddlPlan").html("");
                                var items = [{ text: '<Seleccione>', value: -1 }];
                                $("#ddlPlan").append($("<option></option>").attr("value", -1).text('<Seleccione>'));
                                if ($(result.d).length > 0) {
                                    var i = 0;
                                    for (i = 0; i < result.d.length; i++) {
                                        if (result.d[i].F_inCodTip == $("#ddlLineaTipo").val()) {
                                            //items.push({ text: result.d[i].vcNom, value: result.d[i].P_inCod });
                                            if (isIE() > 15) {
                                                items.push({ text: result.d[i].vcNom, value: result.d[i].P_inCod });
                                            } else {
                                                $("#ddlPlan").append($("<option></option>").attr("value", result.d[i].P_inCod).text(result.d[i].vcNom.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"')));
                                            }
                                        }
                                        //alert(result.d[i].P_inCod + " " + result.d[i].vcNom);
                                    }
                                } else {
                                    //items.push({ text: 'Sin datos', value: -2 });
                                    if (isIE() > 15) {
                                        items.push({ text: 'Sin datos', value: -2 });
                                    } else {
                                        $("#ddlPlan").append($("<option></option>").attr("value", -2).text("Sin datos"));
                                    }
                                }
                                if (isIE() > 15) {
                                    //var dataSource = new kendo.data.DataSource({ data: items });
                                    //$("#ddlPlan").data("kendoComboBox").setDataSource(dataSource);
                                    var dataSource = new kendo.data.DataSource({ data: items });
                                    $("#ddlPlan").data("kendoComboBox").setDataSource(dataSource);
                                }


                                //=========================================================================================
                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });
                    }

                    if ($("#hdfPerFac").val() == 2) {//Por linea
                        $("#trPeriodo").show();
                    }
                    else {//Por cuenta y otros
                        $("#trPeriodo").hide();
                    }

                    if ($("#hdfAsigCred").val() == 1) {//Por planes                            
                        //$("#trMonto").hide();
                        $("#dvAsignacion1").hide();
                        $("#trPlan").show();
                        $("#dvToolTip").show();
                        //configurarIdPlan();
                    }
                    else if ($("#hdfAsigCred").val() == 2) {//Por distribución de bolsa
                        $("#trPlan").hide();
                        $("#dvToolTip").hide();
                        //configurarIdPlan();
                        $("#dvAsignacion1").show();

                        if ($("#hdfServicio").val() != "" && $("#ddlOperador").val() == $("#hdfOperador").val() && $("#ddlCuenta").val() == $("#hdfCodCuenta").val()) {
                            $("#ifServicios")[0].contentWindow.CargarServiciosLineas($("#hdfServicio").val());
                        } else {
                            AbrirLineaServicio($("#hdfLinea").val(), $("#ddlCuenta").val(), $("#hdfAsigCred").val(), $("#hdfServicio").val(), "");
                        }
                    }
                    else {//libre y otros
                        $("#trPlan").hide();
                        $("#dvToolTip").hide();
                        //configurarIdPlan();
                        //$("#trMonto").hide();
                        $("#dvAsignacion1").hide();
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
        else {
            $("#trPlan").hide();
            $("#dvToolTip").hide();
            //configurarIdPlan();
            $("#trPeriodo").hide();
            //$("#trMonto").hide();
            $("#dvAsignacion1").hide();
            $("#ddlPlan").val(-1);
            setDatosBusquedaDispositivos();
        }
        $("input[name='ddlPlan_input']").attr("disabled", "disabled");
    });

    $("#txtEmpleado").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "../../../Common/WebService/General.asmx/ListarEmpleado",
                data: "{'maxFilas': '" + 200 + "'," +
                               "'vcNomEmp': '" + $("#txtEmpleado").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'," +
                               "'incodGrup': '-1'," +
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
                            vcNomCenCos: item.CentroCosto.vcNomCenCos,
                            vcCodInt2: item.Area.vcCodInt,
                            vcNomOrg: item.Area.vcNomOrg,
                            vcCodSuc: item.vcCodSucursal,
                            vcNomSuc: item.vcSucursal,
                        };
                    }));
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        focus: function (event, ui) {
            $("#txtEmpleado").val(ui.item.vcCodEmp + " - " + ui.item.label);
            return false;
        },
        select: function (event, ui) {
            //debugger;
            //vcNomSuc
            if (!isEditar) {
                $("#txtSucursal").val(ui.item.vcNomSuc);
                $("#hdfCodSucursal").val(ui.item.vcCodSuc);
                SeleccionoSucursal = true;
            }
            


            if ($("#hdfAreaFacturacion").val() == "2") {
                if (!verificaCambioArea(ui.item.vcCodInt2, $("#hdfIdAreaSel").val())) {
                    //alerta("Esta línea no ser reasignada al empleado, ya que no se encuentra en el área de la cuenta asignada a la línea.");
                    //alerta("Esta línea no puede ser asignada al empleado, porque este no pertenece a la organizacion asociada a la cuenta.")
                    //alerta("El empleado ingresado debe estar dentro de la organizacion (según configuracion de cuenta).")
                    alerta("El empleado ingresado no pertenece a la organizacion " + ui.item.vcNomOrg + ". Para continuar reasigne un empleado que si pertenezca a dicha área.");
                    $("#txtEmpleado").val("");
                    return false;
                }
            }

            Selecciono = true;
            $("#txtEmpleado").val(ui.item.vcCodEmp + " - " + ui.item.label);
            $("#hdfCodEmpleado").val(ui.item.vcCodEmp);
            $("#lblCentroCosto").html(ui.item.vcCodCenCos + " - " + ui.item.vcNomCenCos);

            $("#hdfLineaTipoTemp").val($("#ddlLineaTipo").val()); //temporal de tipo de linea
            ValidarDispositivoFiltro("Grupo de Empleado");
            CargarGrupoOrigen();
            $("#trFechaAsignacionEmpleado").show();
            $("#LblAsignacionEmpleado").html("Asignación Empleado");
            $("#txtFechaAsignacionEmpleado").attr("disabled", false);
            if (vcFechaAsignacionEmpleado != "") {
                $("#txtFechaAsignacionEmpleado").val(vcFechaAsignacionEmpleado);
            } else {
                $("#txtFechaAsignacionEmpleado").focus();
            }
            //$("#txtSucursal").focus();
            return false;
        },
        change: function (event, ui) {
            if (!ui.item) {
                //if (!Selecciono) {
                $("#hdfCodEmpleado").val("");
                $("#lblCentroCosto").html("");
                $("#txtEmpleado").val("");
                $("#lblGrupoOrigen").text("");
                $("#hdfCodGrupoOrigen").val(0);
                $("#trGrupoOrigen").hide();
                ValidarDispositivoFiltro("Grupo de Empleado");
            } else {
                if ($("#txtEmpleado").val() == "") {
                    $("#lblGrupoOrigen").text("");
                    $("#hdfCodGrupoOrigen").val(0);
                    $("#trGrupoOrigen").hide();
                    $("#hdfCodEmpleado").val("");
                    $("#lblCentroCosto").html("");
                }
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
		    .append("<a>" + item.vcCodEmp + "=" + item.label + "</a>")
		    .appendTo(ul);
    };

    $("#txtEmpleado").focusout(function () {
        if ($("#txtEmpleado").val() == "") {
            $("#LblAsignacionEmpleado").html("Fecha desvinculación");
            vcFechaAsignacionEmpleado = $("#txtFechaAsignacionEmpleado").val();
            $("#txtFechaAsignacionEmpleado").val("");
            //$("#txtFechaAsignacionEmpleado").focus();
            $("#btnEditarFechaAsignacionEmpl").hide();
            $("#txtFechaAsignacionEmpleado").attr("disabled", false);
        }
    });

    $("#txtSucursal").keypress(function (e) {
        if (e.keyCode == 13) {
            $("#txtSucursal").focus();
        } else {
            SeleccionoSucursal = false;
        }
    });

    $("#txtSucursal").focusout(function () {
        if (!SeleccionoSucursal) {
            $.ajax({
                type: "POST",
                url: "../../../Common/WebService/General.asmx/ListarSucursal",
                data: "{'maxFilas': '" + 200 + "'," +
                               "'vcNomSuc': '" + $("#txtSucursal").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'," +
                               "'idCliente': '" + idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if ($(result.d).length == 1) {
                        $("#hdfCodSucursal").val(result.d[0].P_vcCod);
                        SeleccionoSucursal = true;
                    }
                    else {
                        $("#hdfCodSucursal").val("");
                        SeleccionoSucursal = false;
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
    });

    $("#txtSucursal").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "../../../Common/WebService/General.asmx/ListarSucursal",
                data: "{'maxFilas': '" + 200 + "'," +
                               "'vcNomSuc': '" + $("#txtSucursal").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'," +
                               "'idCliente': '" + idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: item.vcNom.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'),
                            vcCodSuc: item.P_vcCod
                        };
                    }));
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        focus: function (event, ui) {
            $("#txtSucursal").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            SeleccionoSucursal = true;
            $("#txtSucursal").val(ui.item.label);
            $("#hdfCodSucursal").val(ui.item.vcCodSuc);
            $("#ddlOperador").focus();
            return false;
        },
        change: function (event, ui) {
            if (!SeleccionoSucursal) {
                //if (!ui.item) {
                $("#hdfCodSucursal").val("");
                $("#txtSucursal").val('');
            }
            return false;
        },
        open: function (event, ui) {
            SeleccionoSucursal = false;
            return false;
        }
    })
            .data("autocomplete")._renderItem = function (ul, item) {
                return $("<li></li>")
			        .data("item.autocomplete", item)
			        .append("<a>" + item.vcCodSuc + "=" + item.label + "</a>")
			        .appendTo(ul);
            };

    $("#imgDetallePlan").click(function () {
        if ($("#ddlPlan").val() == "-1") {
            alerta("Seleccione un Plan");
            return;
        }
        $("#ifDetallePlan").attr("src", "Mnt_DetallePlan.aspx?CodPlan=" + $("#ddlPlan").val());
        $("#ifDetallePlan").css("height", '100%');

        var altModal = $(window).height() - 30;
        
        //$("#dvDetallePlan").css({ 'overflow-y': 'scroll' });
        $("#dvDetallePlan").css({ 'overflow-x': 'hidden' });
        if (altModal >= 600) {
            altModal = 600;
            $("#dvDetallePlan").css({ 'overflow-y': 'hidden' });
        }

        $('#dvDetallePlan').dialog({
            title: "Detalle de plan",
            modal: true,
            resizable: false,
            width: 450,
            height: altModal,
            //height: 510,
            buttons: {
                "Cerrar": function () {
                    $(this).dialog("close");
                }
            }
        });

        var altForm = $("#dvDetallePlan").height();
        if (altForm < 471) {
            //$("#dvDetallePlan").css({ 'overflow-y': 'scroll' });
        }
        else {
            $("#dvDetallePlan").css({ 'overflow-y': 'hidden' });
        }

    });

    ///INICIO AUTOCOMPLETAR DISPOSITIVOS DISPONIBLES
    //p_url = "../../../Common/WebService/General.asmx/ListarDispositivosDisponible";
    //p_data = "{'maxFilas': '" + 100 + "'," +
    //                           "'vcNomAre': '" + $("#txt_Dispositivos").val() + "'," +
    //                           "'idCliente': '" + $("#hdfCodCliente").val() + "'}";

    $("#txt_Dispositivos").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "Mnt_Linea.aspx/ListarDispositivosDisponibles_GrupoOrigenTipLin", //p_url,
                data: "{'maxFilas': '" + 100 + "'," +
                      "'vcNomDisp': '" + $("#txt_Dispositivos").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'," +
                      "'inTipLin': '" + $("#ddlLineaTipo").val() + "'," +
                      "'inCodGrupOri': '" + ($("#hdfCodGrupoOrigen").val() == "" ? 0 : $("#hdfCodGrupoOrigen").val()) + "'," +
                //"'inCodPla': '" + $("#ddlPlan").val() + "'," +
                      "'vcCodEmp': '" + $("#hdfCodEmpleado").val() + "'," +
                      "'vcNumLin': '" + $("#hdfLinea").val() + "'," + //agregado en envio del el numero si es una edicion(para mostrar en la busqueda el dispositivo asignado actualmente si es que lo posee)
                      "'inCodPlan': '" + ($("#ddlPlan").val() == null || $("#ddlPlan").val() == '-1' || !$("#trPlan").is(":visible") ? '0' : $("#ddlPlan").val()) + "'," +
                      "'idCliente': '" + $("#hdfCodCliente").val() + "'}", //p_data,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    //alert($("#hdfCodGrupoOrigen").val());
                    //alert($("#trPlan").is(":visible") + "\n" + $("#ddlPlan").val());
                    //alert($("#ddlPlan").val() == null || $("#ddlPlan").val() == '-1' ? '0' : $("#ddlPlan").val());
                    response($.map(result.d, function (item) {
                        if (item.F_inCodTip == $("#ddlLineaTipo").val() && item.btSopLin == 1) {
                            return {
                                label: item.vcNum.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'),
                                P_vcCodEmp: item.F_vcCodEmp,
                                P_vcCodIMEI: item.P_vcCodIMEI.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'),
                                F_inCodTipSer: item.F_inCodTipAdq
                            };
                        }
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
            Selecciono = true;
            $("#txt_Dispositivos").val(ui.item.label);
            $("#hdfCodDispositivos").val(ui.item.P_vcCodIMEI);
            $("#hdfTipoServicioDispositivo").val(ui.item.F_inCodTipSer);
            ValidarCuentaPlanDispositivo_TipoServicio();

            $("#chkDarBaja").attr("checked", false);
            if (ui.item.P_vcCodIMEI != '') {
                $("#trFechaAsignacionDispositivo").show();
                $("#txtFechaAsignacionDispositivo").attr("disabled", false);
                $("#LblAsignacionDispositivo").html("Asignación Dispositivo");
                if (vcFechaAsignacionDispositivo != "") {
                    $("#txtFechaAsignacionDispositivo").val(vcFechaAsignacionDispositivo);
                } else {
                    $("#txtFechaAsignacionDispositivo").focus();
                }
            }
            //if (ui.item.P_vcCodEmp != "" && $("#hdfCodEmpleado").val() == "") {
            //    CargarEmpleadoXDispositivo(ui.item.P_vcCodEmp, $("#ddlLineaTipo").val(), $("#hdfCodDispositivos").val());
            //}
            //$("#hdfLineaPlanTemp").val($("#ddlPlan").val()); //guardar temporal del plan 
            //$("#hdfLineaTipoTemp").val($("#ddlLineaTipo").val()); //temporaral de tipo de linea
            //CodEmplAnterior = $("#hdfCodEmpleado").val(); //guardar temporar de empleado
            //NomEmplAnterior = $("#txtEmpleado").val();
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono) {
                $("#hdfCodDispositivos").val("");
            }
            $("#chkDarBaja").attr("checked", false);

            ValidarDispositivoFiltro("");


            if ($.trim($("#txt_Dispositivos").val()) == "") {
                $("#hdfTipoServicioDispositivo").val("");
                $("#txt_Dispositivos").val("");
                $("#hdfCodDispositivos").val("");
            }

            ValidarCuentaPlanDispositivo_TipoServicio();

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
            		.appendTo(ul);

            };

    $("#txt_Dispositivos").focusout(function () {
        if ($("#txt_Dispositivos").val() == "") {
            $("#LblAsignacionDispositivo").html("Fecha desvinculación");
            vcFechaAsignacionDispositivo = $("#txtFechaAsignacionDispositivo").val();
            $("#txtFechaAsignacionDispositivo").val("");
            //$("#txtFechaAsignacionDispositivo").focus();
            $("#txtFechaAsignacionDispositivo").attr("disabled", false);
            $("#btnEditarFechaAsignacionDisp").hide();
        }
    });

    ///FIN AUTOCOMPLETAR DISPOSITIVOS DISPONIBLES
    $("#imgDetalleDispositivo").click(function () {
        if ($("#hdfCodDispositivos").val() == "") {
            alerta("Seleccione un Dispositivo");
            return;
        }
        
        //alert($("#hdfCodDispositivos").val());
        $("#ifDetalleDispositivo").attr("src", "Mnt_DetalleDispositivo.aspx?vcOpc='N' &CodDis=" + $("#hdfCodDispositivos").val());
        $("#ifDetalleDispositivo").css({ 'width': '595px', 'height': '530px' });

        var altModal = $(window).height() - 30;
        $("#dvDetalleDispositivo").css({ 'overflow-y': 'scroll' });
        $("#dvDetalleDispositivo").css({ 'overflow-x': 'hidden' });
        if (altModal >= 600) {
            altModal = 600;
            $("#dvDetalleDispositivo").css({ 'overflow-y': 'hidden' });
        }

        $('#dvDetalleDispositivo').dialog({
            title: "Detalle de Dispositivo",
            modal: true,
            width: 620,
            height: altModal,
            resizable: false,
            buttons: {
                "Cerrar": function () {
                    $(this).dialog("close");
                }
            }
        });
        var altForm = $("#dvDetalleDispositivo").height();
        if (altForm < 471) {
            $("#dvDetalleDispositivo").css({ 'overflow-y': 'scroll' });
        }
        else {
            $("#dvDetalleDispositivo").css({ 'overflow-y': 'hidden' });
        }
    });

    $("#btnCerrar").on("click", function () {
        try {
            window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
        } catch (e) {
        }

        try {
            window.top.fnObtenerWindowPlantillaTab().$('#div_modal').dialog('close');
        } catch (e) {
        }
        
    });

     

    //deshabilitar edicion para situaciones direferentes a 1,2 y 36 // agregado 29/09/2014 - wapumayta - error 2349
    if ($("#hdfCodSituacion").val() != '' && $("#hdfCodSituacion").val() != '1' && $("#hdfCodSituacion").val() != '2' && $("#hdfCodSituacion").val() != '36') {
        $("#lblMensajeLinea").text('');
        $("#lblMensajeLinea").text('No se puede editar esta línea porque su situación es ' + $("#lblSituacion").text());
        //$("#btnGuardar").button('option', 'disabled', true);
        //document.getElementById("btnGuardar").disabled = true;
        $("#txtGuardar").addClass("ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-button-disabled ui-state-disabled")
        $("#btnGuardar").off()
    }

    //20141029 wapumayta
    $('#ifServicios').load(function (response, status, xhr) {
        //alert('load the iframe\nboolCargarServicios: ' + boolCargarServicios);
        if (boolCargarServicios == 2) {
            $("#ifServicios")[0].contentWindow.CargarServiciosLineas($("#hdfServicio").val());
        } else {
            boolCargarServicios = 1;
        }
     });


    if ($("#hdfEsPlanRoaming").val() == "1") {
        $("#ddlOperador").attr("disabled", "disabled");
        $("#ddlCuenta").attr("disabled", "disabled");
        $("#ddlPlan").attr("disabled", "disabled");
    }

    //Edgar Garcia 04112022 deshabilitar si esta suspedido
    //if ($("#lblSituacion").text() == 'Suspendido') {
    //    $("#txtGuardar").addClass("ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-button-disabled ui-state-disabled")
    //    $("#btnGuardar").off()
    //}




       
});

function combokendoFormar(control, altura) {
    $(control).removeClass("ui-widget-content ui-corner-all");
    $(control).css("padding", "0px");
    $(control).css("margin", "0px");
    $(control).kendoComboBox({
        filter: "contains",
        suggest: true,
        height: altura,
        dataTextField: "text",
        dataValueField: "value"
    });
}

function EnabledControl(control, estado) {

    
    if (isIE() > 15) { //control con kendo if (isIE() == 6)
        $(control).data("kendoComboBox").enable(estado);
    } else { //control sin kendo
        $(control).attr("disabled", !estado);
    }
}

function obtenerSucursales() {
    $.ajax({
        type: 'POST',
        url: 'Mnt_Linea.aspx/ListarSucursales',
        data: '{}',
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (response) {
            $("#ddlSucursal").html("");
            if ($(response.d).length > 0) {
                if ($(response.d).length === 1) {
                    $(response.d).each(function () {
                        //if (this.F_inCodTip == $("#ddlLineaTipo").val()) {
                        $("#ddlSucursal").append($("<option></option>").attr("value", this.P_vcCod.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"')).text(this.vcNom.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"')));
                        //};
                    });
                    $("#ddlSucursal").attr('disabled', true);
                } else {
                    $("#ddlSucursal").append($("<option></option>").attr("value", -1).text("<Seleccionar>"));
                    $(response.d).each(function () {
                        //if (this.F_inCodTip == $("#ddlLineaTipo").val()) {
                        $("#ddlSucursal").append($("<option></option>").attr("value", this.P_vcCod.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"')).text(this.vcNom.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"')));
                        //};
                    });
                    $("#ddlSucursal > option[value='-1']").attr("selected", true);
                }
            } else {
                $("#ddlSucursal").append($("<option></option>").attr("value", -2).text("Sin datos"));
                $("#ddlSucursal > option[value='-1']").attr("selected", true);
            }

            if ($("#hdfLinea").val() !== '') {
                //TODO: Validar si es editar 
                $("#ddlSucursal > option[value='" + $("#hdfCodSuc").val() + "']").attr("selected", true);
            } else {
                $("#ddlSucursal > option[value='" + -1 + "']").attr("selected", true);
            }
        },
        error: function () {
        }
    });
}

function ListarCuentaPlanesPorOperador() {
    //alert("LineaTipo : " + $("#ddlLineaTipo").val() + "\nOperador: " + $("#ddlOperador").val());    
    if ($("#ddlOperador").val() != -1 && $("#ddlLineaTipo").val() != -1) {
        try {
            //variable creada en utilitarios.js
            if (!VistaSimple) {
                EnabledControl("#ddlCuenta", true);
            }
        }
        catch (e) {
            EnabledControl("#ddlCuenta", true);
        }

        //inCodOpe = $("#ddlOperador").val();
        $("#tblServicio").jqGrid('clearGridData');
        $.ajax({
            type: "POST",
            url: "Mnt_Linea.aspx/ListarCuentaPorOperador",
            data: "{'inCodOpe': '" + $("#ddlOperador").val() + "', 'inCodTip': '" + $("#ddlLineaTipo").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                //cargar cuentas a combo
                if (isIE() <= 15) {
                    $("#ddlCuenta").html("");
                    if ($(result.d).length > 0) {
                        $("#ddlCuenta").append($("<option></option>").attr("value", -1).text("<Seleccionar>"));
                        $(result.d).each(function () {
                            //if (this.F_inCodTip == $("#ddlLineaTipo").val()) {
                            $("#ddlCuenta").append($("<option></option>").attr("value", this.P_vcCod.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"')).text(this.vcNom.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"')));
                            //};
                        });
                    } else {
                        $("#ddlCuenta").append($("<option></option>").attr("value", -2).text("Sin datos"));
                    }
                    $("#ddlCuenta > option[value='-1']").attr("selected", true);
                } else {
                    var items = [{ text: '<Seleccione>', value: -1 }];
                    if ($(result.d).length > 0) {
                        $(result.d).each(function () {
                            //if (this.F_inCodTip == $("#ddlLineaTipo").val()) {
                            items.push({ text: this.vcNom.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'), value: this.P_vcCod });
                            //};
                        });
                    } else {
                        items.push({ text: 'Sin datos', value: -2 });
                    }
                    var dataSource = new kendo.data.DataSource({ data: items });
                    $("#ddlCuenta").data("kendoComboBox").setDataSource(dataSource);
                    $("#ddlCuenta").data("kendoComboBox").select(0);
                }

                // cargar datos edicion de cuenta
                if ($("#hdfLinea").val() != '') {
                    if ($("#hdfLineaTipo").val() == $("#ddlLineaTipo").val() && $("#hdfOperador").val() == $("#ddlOperador").val()) {
                        if ($("#hdfCodCuenta").val() == '' || $("#hdfCodCuenta").val() == undefined || $("#hdfCodCuenta").val() == null) {
                            //$("#ddlCuenta").data("kendoComboBox").value(-1);
                            if (isIE() == 6) {
                                $("#ddlCuenta").data("kendoComboBox").value(-1);
                            } else {
                                $("#ddlCuenta").val(-1);
                            }
                        } else {
                            //$("#ddlCuenta").data("kendoComboBox").value($("#hdfCodCuenta").val()); //cargar cuenta de linea
                            if (isIE() == 6) {
                                $("#ddlCuenta").data("kendoComboBox").value($("#hdfCodCuenta").val()); //cargar cuenta de linea
                            } else {
                                $("#ddlCuenta").val($("#hdfCodCuenta").val());
                            }
                            $("#hdfAsigCred").val(inTipoAsigCredito);
                        }
                    } else {
                        //$("#ddlCuenta").data("kendoComboBox").value(-1);
                        if (isIE() == 6) {
                            $("#ddlCuenta").data("kendoComboBox").value(-1);
                        } else {
                            $("#ddlCuenta").val(-1);
                        }
                    }
                }
                $("input[name='ddlCuenta_input']").attr("disabled", "disabled");

                $("#trPeriodo").hide();
                //$("#trMonto").hide();

                //alert("hdfAsigCred: " + $("#hdfAsigCred").val());
                if ($("#hdfAsigCred").val() != -1) {
                    if ($("#hdfAsigCred").val() == 2) {
                        $("#dvAsignacion1").show();
                        $("#trPlan").hide();
                        $("#dvToolTip").hide();

                        if ($("#hdfServicio").val() != "" && $("#ddlOperador").val() == $("#hdfOperador").val()) {
                            //alert("variable: " + boolCargarServicios + "\nPagina estado: " + $("ifServicios").context.readyState);
                            if (boolCargarServicios == 1) { //iframe está listo, cargar servicios
                                $("#ifServicios")[0].contentWindow.CargarServiciosLineas($("#hdfServicio").val());
                            } else {
                                boolCargarServicios = 2;
                            }
                            //alert('boolCargarServicios valor final: ' + boolCargarServicios);
                        }
                        //configurarIdPlan();
                    } else {
                        $("#dvAsignacion1").hide();
                        $("#trPlan").show();
                        $("#dvToolTip").show();
                        //configurarIdPlan();
                    }
                } else {
                    $("#trPlan").hide();
                    $("#dvToolTip").hide();
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });

        $.ajax({
            type: "POST",
            url: "Mnt_Linea.aspx/ListarPlanPorOperador",
            data: "{'inCodOpe': '" + $("#ddlOperador").val() + "','CodCuenta': '" + $("#hdfCodCuenta").val() + "','Linea':'" + $("#hdfLinea").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#ddlPlan").html("");

                if ($(result.d).length > 0) {
                    $("#ddlPlan").append($("<option></option>").attr("value", -1).text("<Seleccionar>"));
                    //$("#hdfLineaPlanTemp").val("-1");
                    $(result.d).each(function () {
                        if (this.F_inCodTip == $("#ddlLineaTipo").val()) {
                            $("#ddlPlan").append($("<option></option>").attr("value", this.P_inCod).text(this.vcNom));
                        }
                    });
                }
                else {
                    $("#ddlPlan").append($("<option></option>").attr("value", -2).text("Sin datos"));
                    $("#hdfLineaPlanTemp").val("-2");
                }
                if ($("#hdfLinea").val() != '') { // cargar datos edicion
                    $("#ddlPlan > option[value='" + $("#hdfCodPlan").val() + "']").attr("selected", true);
                }
                if (isIE() > 15) {
                    ActivarCombokendo("#ddlPlan", 120);
                }
                $("input[name='ddlPlan_input']").attr("disabled", "disabled");
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    } else {
        EnabledControl("#ddlCuenta", false);
        $("#ddlCuenta").html("");
        $("#trPlan").hide();
        $("#dvToolTip").hide();
        if (isIE() <= 15) {
            $("#ddlCuenta").append($("<option></option>").attr("value", -1).text("<Seleccione Tipo y Operador>"));
            $("#ddlCuenta > option[value='-1']").attr("selected", true);
            $("#hdfAsigCred").val("-1");
        } else {
            $("#ddlCuenta").data("kendoComboBox").setDataSource(new kendo.data.DataSource({ data: [{ text: '<Seleccione Tipo y Operador>', value: -1 }] }));
            $("#ddlCuenta").data("kendoComboBox").select(0);
            $("#hdfAsigCred").val("-1");
        }
    }
}

function CargarGrupoOrigen() {
    //alert("CargarGrupoOrigen, " + $("#hdfCodEmpleado").val() + ", " + $("#ddlLineaTipo").val());
    if ($("#hdfCodEmpleado").val() != '' && $("#ddlLineaTipo").val() != '') {
        $.ajax({
            type: "POST",
            url: "Mnt_Linea.aspx/ObtenerGrupoOrigenPorEmpleado",
            data: "{'pCodEmpl': '" + $("#hdfCodEmpleado").val() + "'," +
              "'pCodGrupOri': '" + $("#ddlLineaTipo").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#hdfCodGrupoOrigen").val("");
                if (result.d.vcNomGru == "0") { //no hay seleccionado tipo linea
                    $("#trGrupoOrigen").hide();
                    $("#tbServiciosAdicionales").trigger("reloadGrid");
                    //$("#txt_Dispositivos").prop("disabled", false);
                    //$("#txt_Dispositivos").val("");
                    //$("#hdfCodDispositivos").val("");
                    //$("#txt_Dispositivos").css({ 'color': '', 'font-size': '', 'font-weight': '', 'font-style': '' });
                    return;
                }
                if (result.d.vcNomGru == "" || result.d.vcNomGru == null) {
                    if ($("#hdfCodDispositivos").val() != '') { //hay un dispositivo seleccionado
                        $("#lblFiltroCambiado").text("Grupo de Empleado");
                        $("#divMsgConfirmacionCambioDispositivo").dialog({
                            title: 'Confirmación',
                            modal: true,
                            closeOnEscape: false,
                            dialogClass: 'no-close',
                            buttons: {
                                "Si": function () {
                                    $("#lblGrupoOrigen").html("[Sin Grupo Empleado Asociado]");
                                    $("#txt_Dispositivos").attr("NoGrupoOrigen", "1");
                                    $("#txt_Dispositivos").attr("disabled", true);
                                    $("#btnAgregarDispositivo").button("option", "disabled", true);
                                    $("#hdfCodDispositivos").val("");
                                    $("#txt_Dispositivos").val('Debe tener un Grupo Empleado Asociado.');
                                    $("#txt_Dispositivos").css({ 'color': 'grey', 'font-size': '90%', 'font-weight': 'bold', 'font-style': 'italic' });
                                    $("#trGrupoOrigen").show();
                                    $("#hdfTipoServicioDispositivo").val("");
                                    ValidarCuentaPlanDispositivo_TipoServicio();
                                    $(this).dialog("close");
                                },
                                "No": function () {
                                    $("#hdfCodEmpleado").val(CodEmplAnterior);
                                    $("#txtEmpleado").val(NomEmplAnterior);
                                    CargarGrupoOrigen();
                                    ValidarCuentaPlanDispositivo_TipoServicio();
                                    $(this).dialog("close");
                                }
                            }
                        });
                    } else {
                        $("#lblGrupoOrigen").html("[Sin Grupo Empleado Asociado]");
                        $("#txt_Dispositivos").attr("NoGrupoOrigen", "1");

                        try {
                            if (!VistaSimple) {
                                $("#txt_Dispositivos").attr("disabled", true);
                            }
                            else { }
                        }
                        catch (e) {
                            $("#txt_Dispositivos").attr("disabled", true);
                        }

                        $("#btnAgregarDispositivo").button("option", "disabled", true);
                        $("#hdfCodDispositivos").val("");
                        $("#txt_Dispositivos").val('Debe tener un Grupo Empleado Asociado.');
                        $("#txt_Dispositivos").css({ 'color': 'grey', 'font-size': '90%', 'font-weight': 'bold', 'font-style': 'italic' });
                        $("#trGrupoOrigen").show();
                    }
                } else {
                    $("#lblGrupoOrigen").html(result.d.vcNomGru);
                    $("#hdfCodGrupoOrigen").val(result.d.P_inCodGruOri);

                    try {
                        if (!VistaSimple) {
                            $("#txt_Dispositivos").prop("disabled", false);
                        }
                        else { }
                    }
                    catch (e) {
                        $("#txt_Dispositivos").prop("disabled", false);
                    }

                    if ($("#txt_Dispositivos").attr("NoGrupoOrigen") == "1") {
                        //if ($("#hdfCodDispositivos").val() == '') {
                        $("#txt_Dispositivos").val("");
                        $("#hdfCodDispositivos").val("");
                    }
                    $("#txt_Dispositivos").css({ 'color': '', 'font-size': '', 'font-weight': '', 'font-style': '' });
                    $("#trGrupoOrigen").show();
                }
                $("#tbServiciosAdicionales").trigger("reloadGrid");
                //alert($("#hdfCodGrupoOrigen").val());
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
}

function CalcularMontoAutomatico(dcCanAsig, dcMonCta, dcCanCta) {
    var MontoAutomatico;
    if (dcCanCta > 0) {
        MontoAutomatico = (parseFloat(dcMonCta) / parseFloat(dcCanCta)) * parseInt(DevuelveNumeroSinFormato($("#txtCantidadServicio").val(), oCulturaUsuario, true));
    } else {
        MontoAutomatico = 0;
    }

    return MontoAutomatico.toFixed(NumDec);
}

function verificaCambioArea(areaNueva, areaAntigua) {
    let resultado = false;

    if (areaNueva.indexOf(areaAntigua) > -1) {
        return true;
    }
    else {
        //if (areaNueva.substring(0, areaNueva.length - 3).indexOf(areaAntigua) > -1) {
        if (areaNueva.length - 3 > 3 && areaAntigua.length - 3 > 3) {
            if (areaNueva.substring(0, areaNueva.length - 3).indexOf(areaAntigua.substring(0, areaAntigua.length - 3)) > -1) {
                return true;
            }
        }
        else if (areaNueva.length - 3 == 3 && areaAntigua.length - 3 == 3) {
            if (areaNueva.indexOf(areaAntigua) > -1) {
                return true;
            }
        }
        else if (areaNueva.length - 3 > 3 && areaAntigua.length - 3 == 3) {
            if (areaNueva.substring(0, areaNueva.length - 3).indexOf(areaAntigua) > -1) {
                return true;
            }
        }
        else if (areaNueva.length - 3 == 3 && areaAntigua.length - 3 > 3) {
            if (areaNueva.indexOf(areaAntigua.substring(0, areaAntigua.length - 3)) > -1) {
                return true;
            }
        }
        else {
            return false;
        }

    }
    return resultado;
}

function CargarMinutosRestantesXServicio(vcCodCuenta, vcCodTipSer, vcCodSer, opcion, IsEdit, indexServicio) {
    if (IsEdit != 1) {
        var TipoSrv = 0;
        var CodSubCue = vcCodTipSer;
        if (vcCodSer == '0') {
            TipoSrv = $("#LblTipoServicio").text();
        }
    } else {
        var TipoSrv = vcCodTipSer;
        var CodSubCue = 0;
    }
    $.ajax({
        type: "POST",
        url: "Mnt_Linea.aspx/ObtenerCantidadRestante",
        data: "{'pvcCodCta': '" + vcCodCuenta + "'," +
                   "'pvcCodTipSer': '" + TipoSrv + "'," +
                   "'vcNumLin': '" + $("#hdfLinea").val() + "'," +
                   "'pvcCodSer': '" + vcCodSer + "'," +
                   "'inCodSubCue':'" + CodSubCue + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //para lineas en situacion de baja
            var resturarValorServ = 0;
            if ($("#hdfSituacion").val() != "0") { //linea activa
                CantidadRegistrada = result.d.dcAct; //cantidad actualmente registrada, para ediciones de servicios
            } else { //linea en estado de baja
                CantidadRegistrada = 0; //los servicios de la liena en situacion de baja no estan considerados
            }

            //alert(result.d.P_inCod + ", " + result.d.inCodOpe + ", " + result.d.dcCan + ", " + result.d.dcMon + "\nindex servicio: " + indexServicio);


            var CantAsigTotMin;
            var CantTotalParaLinea;
            if (result.d.P_inCod == 16 || result.d.P_inCod == 18) { //tipo de servicios llamadas
                if (result.d.dcCan > 0) { //cantidad no es ilimitada
                    if (indexServicio != "") { //existe actualmente en la grilla
                        if (DevuelveNumeroSinFormato(CantidadModificada, oCulturaUsuario, true) > 0) {
                            CantAsigTotMin = (parseInt(result.d.dcCan) - parseInt(result.d.dcAcu)) + parseInt(CantidadRegistrada) - parseInt(DevuelveNumeroSinFormato(CantidadModificada, oCulturaUsuario, true));
                            CantTotalParaLinea = (parseInt(result.d.dcCan) - parseInt(result.d.dcAcu)) + parseInt(CantidadRegistrada);
                        } else {
                            CantAsigTotMin = parseInt(result.d.dcCan) - parseInt(result.d.dcAcu);
                            CantTotalParaLinea = parseInt(result.d.dcCan) - parseInt(result.d.dcAcu);
                        }
                    } else { //servicio nuevo
                        //detectar si existe servicio seleccionado en la grilla actual
                        var totalServiciosRegistrados = 0;
                        var ids = tblServicio.getDataIDs();
                        var i = 0;
                        for (i = 0; i < ids.length; i++) {
                            var row = tblServicio.getRowData(ids[i]);
                            if ((row.inCodTipDat = 1 && vcCodSer == row.inCodTipSer) || (row.inCodTipDat = 2 && TipoSrv == row.inCodTipSer)) {
                                totalServiciosRegistrados = totalServiciosRegistrados + parseInt(row.dcCan);
                            }
                        }
                        //fin detectar
                        CantAsigTotMin = parseInt(result.d.dcCan) - parseInt(result.d.dcAcu) + parseInt(CantidadRegistrada) - parseInt(totalServiciosRegistrados);
                        CantTotalParaLinea = parseInt(result.d.dcCan) - parseInt(result.d.dcAcu) + parseInt(CantidadRegistrada) - parseInt(totalServiciosRegistrados);
                    }
                    //alert("CantAsigTotMin: " + CantAsigTotMin);
                    //$("#LblCantidad").text(CantAsigTotMin);
                    $("#LblCantidad").text(CantTotalParaLinea);
                    $("#trIlimitado").hide();
                    $("#chkServicioIlimitado").attr("checked", false);
                    $("#trCantidad").show();
                    esSrvIlimitado = false; //agregado 05/08/2014 wapumayta
                } else {
                    CantAsigTotMin = "";
                    $("#LblCantidad").text("Ilimitado");
                    $("#chkServicioIlimitado").attr("checked", true);
                    $("#trIlimitado").show();
                    $("#trCantidad").hide();
                    esSrvIlimitado = true; //agregado 05/08/2014 wapumayta
                }
            }
            //if (result.d.P_inCod == 16 || vcCodSer > 1) {
            if (result.d.P_inCod == 16) {
                $("#LblCanTotalMinutosXBolsa").text((result.d.dcCan == 0 ? "Ilimitado en Min." : FormatoNumero(result.d.dcCan, oCulturaUsuario, true) + " Min."));
                if (CantAsigTotMin === "") {
                    $("#LblTextoServicio").text("Minutos Ilimitados");
                    $("#chkServicioIlimitado").attr("checked", true);
                    $("#LblCantAsignada").hide();
                } else {
                    $("#LblTextoServicio").text("Minutos Restantes : ");
                    if (CantAsigTotMin < 0) {
                        $("#LblCantAsignada").text("0 (límite superado)");
                    } else {
                        $("#LblCantAsignada").text(FormatoNumero(CantAsigTotMin, oCulturaUsuario, true));
                    }
                    $("#chkServicioIlimitado").attr("checked", false);
                    $("#LblCantAsignada").show();
                }
                $("#CantAsig").show();
            }
            if (result.d.P_inCod == 17) {
                CantAsigTotMin = parseFloat(result.d.dcCan);
                $("#LblCanTotalMinutosXBolsa").text((result.d.dcCan == 0 ? "Ilimitado en MB" : result.d.dcCan + " MB"));
                if (CantAsigTotMin == "0") {
                    $("#LblTextoServicio").text("MB Ilimitados");
                    $("#LblCantAsignada").hide();
                    $("#LblCantidad").text("Ilimitados");
                    $("#trIlimitado").show();
                    $("#chkServicioIlimitado").attr("checked", true);
                    $("#trCantidad").hide();
                    esSrvIlimitado = true; //agregado 05/08/2014 wapumayta
                } else {
                    $("#LblTextoServicio").text("MB Permitidos: ");
                    $("#LblCantAsignada").text(CantAsigTotMin);
                    $("#LblCantidad").text(CantAsigTotMin);
                    $("#trIlimitado").hide();
                    $("#chkServicioIlimitado").attr("checked", false);
                    $("#trCantidad").show();
                    esSrvIlimitado = false; //agregado 05/08/2014 wapumayta
                }
                $("#CantAsig").show();
            }
            if (result.d.P_inCod == 18) {
                //CantAsigTotMin = parseFloat(result.d.dcCan)
                $("#LblCanTotalMinutosXBolsa").text((result.d.dcCan == 0 ? "Mensajes Ilimitados" : result.d.dcCan + " Mensaje(s)"));
                if (CantAsigTotMin == "0") {
                    $("#LblTextoServicio").text("Mensajes Ilimitados");
                    $("#LblCantAsignada").hide();
                    //$("#LblCantidad").text("Ilimitados");
                } else {
                    $("#LblTextoServicio").text("Mensaje(s) Restantes : ");
                    $("#LblCantAsignada").text(CantAsigTotMin);
                    //$("#LblCantidad").text(CantAsigTotMin);
                }
                $("#CantAsig").show();
            }
            $("#LblTipoServicio").text(result.d.P_inCod);

            if (indexServicio == '') {
                $("#hdfMonTotCta").val(result.d.dcMon);
                $("#hdfCanTotCta").val(result.d.dcCan);
                if (dcCanXSubCta == 0 && $('#chkTipoAsignacion').is(':checked')) {
                    $("#txtMontoAsignado").val(dcCanXSubCta.toFixed(NumDec));
                }
            }



            //alert(IsEdit);
            //if (IsEdit) {
            //    $("#LblTipoServicio").text(result.d.P_inCod);
            //    $("#LblCantidad").text(result.d.dcCan - result.d.dcMon + result.d.inCodOpe);
            //    if ($("#hdfLinea").val() == "") {
            //        if (parseInt($("#LblCantidad").text()) != "Ilimitado") {
            //            var CantIngresada = parseInt($("#txtCantidadServicio").val() == "" ? 0 : $("#txtCantidadServicio").val());
            //            var CantTotXLin = parseInt($("#LblCantidad").text());
            //            var CantRestante = CantTotXLin - CantIngresada;
            //            $("#LblCantAsignada").text((CantRestante < 0 ? 0 : CantRestante));
            //        }
            //    }
            //} else {
            //    var Filas = $("#tblServicio").getGridParam("data");
            //    $(Filas).each(function () {
            //        if (this.dcCan != "Ilimitado") {
            //            if (this.P_inCod == $("#LblTipoServicio").text()) {
            //                var CantIngresada = parseInt(this.dcCan);
            //                var CantTotXLin = parseInt($("#LblCantidad").text());
            //                var CantRestante = (parseInt(CantTotXLin) + parseInt(CantidadRegistrada)) - CantIngresada;
            //                $("#LblCantAsignada").text((CantRestante < 0 ? 0 : CantRestante));
            //            }
            //            if (this.P_inCod == vcCodSer) {
            //                var CantIngresada = parseInt(this.dcCan);
            //                var CantTotXLin = parseInt($("#LblCantidad").text());
            //                var CantRestante = (parseInt(CantTotXLin) + parseInt(CantidadRegistrada)) - CantIngresada; //CantTotXLin - CantIngresada;
            //                $("#LblCantAsignada").text((CantRestante < 0 ? 0 : CantRestante));
            //            }
            //        }
            //    });
            //}
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
            BloquearPagina(false);
        }
    });
}

function ValidarDispositivoFiltro(filtro) {
    if ($("#hdfCodDispositivos").val() == '') {
        if ($("#hdfMensajeLinea").val() == "G") { //si la validación fallida es por grupo <-> modelo y se limpia el dispositivo, borra el mansaje de validacion
            LimpiarValidacionDatosLinea();
        }
        return;
    }

    if (filtro == "Grupo de Empleado" && $("#hdfMensajeLinea").val() == "G" && $("#hdfCodEmpleado").val() == '') { //agregado wapumayta 26-01-2015
        LimpiarValidacionDatosLinea(); // si la validacio fallida es por grupo <-> modelo y se limpia el empleado, borra el mensaje de validacion
        return;
    }

    if ($("#hdfMensajeLinea").val() == 'P') {
        $("#lblFiltroCambiado").text('Plan');
    } else if ($("#hdfMensajeLinea").val() == 'G') {
        $("#lblFiltroCambiado").text('Grupo de Empleado');
    } else {
        $("#lblFiltroCambiado").text(filtro);
    }
    $.ajax({
        type: "POST",
        url: "Mnt_Linea.aspx/ListarDispositivosDisponibles_GrupoOrigenTipLin",
        data: "{'maxFilas': '" + 100 + "'," +
              "'vcNomDisp': '" + $("#hdfCodDispositivos").val() + "'," +
              "'inTipLin': '" + $("#ddlLineaTipo").val() + "'," +
              "'inCodGrupOri': '" + ($("#hdfCodGrupoOrigen").val() == "" ? 0 : $("#hdfCodGrupoOrigen").val()) + "'," +
              "'vcCodEmp': '" + $("#hdfCodEmpleado").val() + "'," +
              "'vcNumLin': '" + $("#hdfLinea").val() + "'," +
              "'inCodPlan': '" + ($("#ddlPlan").val() == null || $("#ddlPlan").val() == '-1' || !$("#trPlan").is(":visible") ? '0' : $("#ddlPlan").val()) + "'," +
              "'idCliente': '" + $("#hdfCodCliente").val() + "'}", //p_data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var Exists = false;
            lstDispositivos = result.d;

            if (typeof lstDispositivos.TipoAsiganacion === "undefined" || lstDispositivos.TipoAsiganacion == "") {
                $("#hdfTipoServicioPlan").val("0");
            }
            else {
                $("#hdfTipoServicioPlan").val(lstDispositivos.TipoAsiganacion);
            }

            //if ($("#hdfLinea").val() != "") {
            if ($(lstDispositivos).length > 0) {
                $(lstDispositivos).each(function () {
                    if (this.P_vcCodIMEI == $("#hdfCodDispositivos").val()) {
                        Exists = true; //equipo cumple con los nuevos filtros de LineaTipo,GrupoOrigen,Plan
                    }
                });
                //alert("ValidarDispositivoFiltro\nExiste: " + Exists + "\nCodEmplAnterior: " + CodEmplAnterior);
                //if (!Exists && $("#hdfCodEmpleado").val() != CodEmplAnterior && $("#hdfCodDispositivos").val() != "") {
                if (!Exists) { //dispositivo actual no cumple con los nuevos filtros
                    $('#divMsgConfirmacionCambioDispositivo').dialog({
                        title: "Confirmación",
                        modal: true,
                        closeOnEscape: false,
                        dialogClass: 'no-close',
                        buttons: {
                            "Si": function () {
                                $("#txt_Dispositivos").val('');
                                $("#hdfCodDispositivos").val('');
                                $(this).dialog("close");
                                LimpiarValidacionDatosLinea();
                                $("#hdfTipoServicioDispositivo").val("");
                                ValidarCuentaPlanDispositivo_TipoServicio();
                            },
                            "No": function () {
                                if (filtro == "Plan") { //revertir cambio de empleado
                                    if (isIE() <= 15) {
                                        $("#ddlOperador").val($("#hdfLineaOperadorTemp").val());
                                        $("#ddlOperador").change();
                                        $("#ddlCuenta").val($("#hdfLineaCuentaTemp").val());
                                        $("#ddlPlan").val($("#hdfLineaPlanTemp").val());
                                    } else {
                                        $("#ddlOperador").data("kendoComboBox").value($("#hdfLineaOperadorTemp").val());
                                        $("#ddlOperador").change();
                                        $("#ddlCuenta").data("kendoComboBox").value($("#hdfLineaCuentaTemp").val());
                                        $("#ddlPlan").data("kendoComboBox").value($("#hdfLineaPlanTemp").val());
                                    }

                                } else { //revertir cambio de plan
                                    $("#hdfCodEmpleado").val(CodEmplAnterior);
                                    $("#txtEmpleado").val(NomEmplAnterior);
                                    CargarGrupoOrigen();
                                }
                                ValidarCuentaPlanDispositivo_TipoServicio();
                                $(this).dialog("close");
                            }
                        },
                        resizable: false
                    });
                } else {
                    //guardar temporales de datos del filtro actuales para el dispositivo seleccionado
                    if (isIE() <= 15) {
                        $("#hdfLineaPlanTemp").val($("#ddlPlan").val());
                        $("#hdfLineaTipoTemp").val($("#ddlLineaTipo").val());
                        CodEmplAnterior = $("#hdfCodEmpleado").val();
                        NomEmplAnterior = $("#txtEmpleado").val();
                        LimpiarValidacionDatosLinea();
                    } else {
                        $("#hdfLineaPlanTemp").val($("#ddlPlan").data("kendoComboBox").value());
                        $("#hdfLineaTipoTemp").val($("#ddlLineaTipo").val());
                        CodEmplAnterior = $("#hdfCodEmpleado").val();
                        NomEmplAnterior = $("#txtEmpleado").val();
                        LimpiarValidacionDatosLinea();
                    }

                }
            } else {
                $('#divMsgConfirmacionCambioDispositivo').dialog({
                    title: "Confirmación",
                    modal: true,
                    closeOnEscape: false,
                    dialogClass: 'no-close',
                    buttons: {
                        "Si": function () {
                            $("#txt_Dispositivos").val('');
                            $("#hdfCodDispositivos").val('');
                            LimpiarValidacionDatosLinea();
                            $("#hdfTipoServicioDispositivo").val("");
                            ValidarCuentaPlanDispositivo_TipoServicio();
                            $(this).dialog("close");
                        },
                        "No": function () {
                            if (filtro == "Plan") { //revertir cambio de empleado
                                if (isIE() <= 15) {
                                    $("#ddlOperador").val($("#hdfLineaOperadorTemp").val());
                                    $("#ddlOperador").change();
                                    $("#ddlCuenta").val($("#hdfLineaCuentaTemp").val());
                                    $("#ddlPlan").val($("#hdfLineaPlanTemp").val());
                                } else {
                                    $("#ddlOperador").data("kendoComboBox").value($("#hdfLineaOperadorTemp").val());
                                    $("#ddlOperador").change();
                                    $("#ddlCuenta").data("kendoComboBox").value($("#hdfLineaCuentaTemp").val());
                                    $("#ddlPlan").data("kendoComboBox").value($("#hdfLineaPlanTemp").val());
                                }

                            } else { //revertir cambio de plan
                                $("#hdfCodEmpleado").val(CodEmplAnterior);
                                $("#txtEmpleado").val(NomEmplAnterior);
                                CargarGrupoOrigen();
                            }
                            ValidarCuentaPlanDispositivo_TipoServicio();
                            $(this).dialog("close");
                        }
                    },
                    resizable: false
                });
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function ListarPlanesPorCuenta() {

}

function CloseAutocomplete() {
    $("#txt_Dispositivos").autocomplete("close");
    $("#txtEmpleado").autocomplete("close");
    $("#txtSucursal").autocomplete("close");
}

function setDatosBusquedaDispositivos() {
    //alert($("#hdfCodGrupoOrigen").val());
    if ($("#ddlPlan").val() == undefined || $("#ddlPlan").val() == null || $("#ddlPlan").val() == -1) {
        //todos los dispositivos disponibles
        p_url = "../../../Common/WebService/General.asmx/ListarDispositivosDisponible";
        p_data = "{'maxFilas': '" + 100 + "'," +
                               "'vcNomAre': '" + $("#txt_Dispositivos").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'," +
                               "'idCliente': '" + $("#hdfCodCliente").val() + "'}";
    } else {
        //dispositivos disponibles por tipo de linea, soportan linea y plan asociado al modelo
        p_url = "Mnt_Linea.aspx/ListarDispositivosDisponibles_PlanTipLin";
        p_data = "{'maxFilas': '" + 100 + "'," +
                                   "'vcNomDisp': '" + $("#txt_Dispositivos").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'," +
                                   "'inTipLin': '" + $("#ddlLineaTipo").val() + "'," +
                                   "'inCodPla': '" + $("#ddlPlan").val() + "'," +
                                   "'idCliente': '" + $("#hdfCodCliente").val() + "'}";
    }
}

function LimpiarValidacionDatosLinea() {
    $("#hdfMensajeLinea").val('');
    $("#lblMensajeLinea").text('');
}

function CargarGrillaServiciosAdicionales() {
    //if ($("#hdfLinea").val() != "") {
    var vcNumero = $("#hdfLinea").val();
    var inGrupOri = ($("#hdfCodGrupoOrigen").val() == "" ? "-1" : $("#hdfCodGrupoOrigen").val());
    var vcCodOpe = $("#ddlOperador").val();
    var inPagTam = parseInt($("#tbServiciosAdicionales").getGridParam("rowNum"));
    var inPagAct = parseInt($("#tbServiciosAdicionales").getGridParam("page"));

    var maxPag = parseInt(inTotReg / inPagTam) + 1;
    inPagAct = inPagAct > maxPag ? maxPag : inPagAct;

    $.ajax({
        type: "POST",
        url: "Mnt_Linea.aspx/ObtenerServiciosAdicionales_Filtros",
        data: "{'strNumLin': '" + vcNumero +
                  "', 'strCodOpe':'" + vcCodOpe +
                  "', 'strGrupOri':'" + inGrupOri +
                  "', 'inPagTam':'" + parseInt(inPagTam) +
                  "', 'inPagAct':'" + parseInt(inPagAct) + "' }",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var lstServicios = result.d;
            if (lstServicios.Items.length > 0) {
                inTotReg = parseInt(lstServicios.Items.length);
                $("#tbServiciosAdicionales")[0].addJSONData(lstServicios);
                $("#tbAgregarServicios").show();
                $("#dvMensajeGrupo").hide();
                $("#dvMensajeOperadorXSeleccionar").hide();
                $("#dvMensajeOperadorSeleccionado").hide();
            } else {
                if (vcCodOpe != "-1") {
                    $("#dvMensajeOperadorSeleccionado").show();
                    $("#dvMensajeOperadorXSeleccionar").hide();
                    $("#tbAgregarServicios").hide();
                } else {
                    $("#dvMensajeOperadorXSeleccionar").show();
                    $("#dvMensajeOperadorSeleccionado").hide();
                    $("#tbAgregarServicios").hide();
                }
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
    //}
}

//function LineaServicio_LoadHecho() {
//    alert("validar variable: " + boolCargarServicios);
//    //if (boolCargarServicios) {
//    //    $("#ifServicios")[0].contentWindow.CargarServiciosLineas($("#hdfServicio").val());
//    //}
//}

function ObtenerDatosEmpleadosLigero(vcCodEmp, vcNomEmp) {
    $("#dvAgregarEmpleado").dialog("close");
    Selecciono = true;
    $("#trTiltuloCentroCosto").hide();
    $("#txtEmpleado").val(vcCodEmp + " - " + vcNomEmp);
    $("#hdfCodEmpleado").val(vcCodEmp);
}

function CerrarDialogEmpleadoLigero() {
    $("#dvAgregarEmpleado").dialog("close");
}

function ObtenerDatosDispositivosLigero(vcCoImei, vcNomDisp) {
    $("#dvAgregarDispositivo").dialog("close");
    Selecciono = true;
    $("#txt_Dispositivos").val(vcCoImei + " - " + vcNomDisp);
    $("#hdfCodDispositivos").val(vcCoImei);
}

function CerrarDialogDispositivoLigero() {
    $("#dvAgregarDispositivo").dialog("close");
}


//function ValidarTipoServicio(AsignacionCredito, inTipoServDispositivo, inTipoServCuenta, inTipoServPlan) {

//    if (AsignacionCredito == 1) {
//        if (inTipoServDispositivo != "" && inTipoServCuenta != "" && inTipoServPlan != "") {
//            if (inTipoServDispositivo == inTipoServCuenta && inTipoServDispositivo == inTipoServPlan) {

//            }
//        }
//    }


//}

//Edgar Garcia 08112022
function Adaptartamaño(tamano) {

    $("#dvAgregarEmpleado").dialog("option", "height", tamano.alto) 
    $("#dvAgregarEmpleado").dialog("option", "width", tamano.ancho)  
}

function ValidarCuentaPlanDispositivo_TipoServicio() { 
  
            var hdfValidaciónTipoServicio = $("#hdfValidaciónTipoServicio").val();
             if (hdfValidaciónTipoServicio== "1") { 
                var TipoServicio_Cuenta = $("#hdfTipoServicioCuenta").val();
                var TipoServicio_Dispositivo = $("#hdfTipoServicioDispositivo").val();
                var TipoServicio_Plan = $("#hdfTipoServicioPlan").val();
                var GeneroCambio = false;
                if ($("#hdfAsigCred").val() == '1') {
                    if (TipoServicio_Cuenta != "" && TipoServicio_Dispositivo != "" && TipoServicio_Plan != "") {
                        GeneroCambio = false;
                        if (TipoServicio_Cuenta != TipoServicio_Dispositivo) {
                            GeneroCambio = true;
                            $("#dvToolTipRed_d").show();
                            $("#dvToolTipRed_c").show();
                            $("#hdfPermitirGuardarTipSer").val("0");
                        }
                        if (TipoServicio_Cuenta != TipoServicio_Plan) {
                            GeneroCambio = true;
                            $("#dvToolTipRed_p").show();
                            $("#dvToolTipRed_c").show();
                            $("#hdfPermitirGuardarTipSer").val("0");
                        }
                        if (TipoServicio_Dispositivo != TipoServicio_Plan) {
                            GeneroCambio = true;
                            $("#dvToolTipRed_d").show();
                            $("#dvToolTipRed_p").show();
                            $("#hdfPermitirGuardarTipSer").val("0");
                        }
                        if (!GeneroCambio) {
                            $("#dvToolTipRed_d").hide();
                            $("#dvToolTipRed_c").hide();
                            $("#dvToolTipRed_p").hide();
                            $("#hdfPermitirGuardarTipSer").val("1");
                        }
                    }
                    else {
                        if (TipoServicio_Cuenta != "" && TipoServicio_Dispositivo != "") {
                            GeneroCambio = false;
                            if (TipoServicio_Cuenta != TipoServicio_Dispositivo) {
                                GeneroCambio = true;
                                $("#dvToolTipRed_d").show();
                                $("#dvToolTipRed_c").show();
                                $("#dvToolTipRed_p").hide();
                                $("#hdfPermitirGuardarTipSer").val("0");
                            }
                            if (!GeneroCambio) {
                                $("#dvToolTipRed_d").hide();
                                $("#dvToolTipRed_c").hide();
                                $("#dvToolTipRed_p").hide();
                                $("#hdfPermitirGuardarTipSer").val("1");
                            }
                        }
                        else {
                            if (TipoServicio_Cuenta != "" && TipoServicio_Plan != "") {
                                GeneroCambio = false;
                                if (TipoServicio_Cuenta != TipoServicio_Plan) {
                                    GeneroCambio = true;
                                    $("#dvToolTipRed_p").show();
                                    $("#dvToolTipRed_c").show();
                                    $("#dvToolTipRed_d").hide();
                                    $("#hdfPermitirGuardarTipSer").val("0");
                                }
                                if (!GeneroCambio) {
                                    $("#dvToolTipRed_d").hide();
                                    $("#dvToolTipRed_c").hide();
                                    $("#dvToolTipRed_p").hide();
                                    $("#hdfPermitirGuardarTipSer").val("1");
                                }
                            }
                            else {
                                if (TipoServicio_Dispositivo != "" && TipoServicio_Plan != "") {
                                    GeneroCambio = false;
                                    if (TipoServicio_Dispositivo != TipoServicio_Plan) {
                                        GeneroCambio = true;
                                        $("#dvToolTipRed_d").show();
                                        $("#dvToolTipRed_p").show();
                                        $("#dvToolTipRed_c").hide();
                                        $("#hdfPermitirGuardarTipSer").val("0");
                                    }
                                    if (!GeneroCambio) {
                                        $("#dvToolTipRed_d").hide();
                                        $("#dvToolTipRed_c").hide();
                                        $("#dvToolTipRed_p").hide();
                                        $("#hdfPermitirGuardarTipSer").val("1");
                                    }
                                }

                            }
                        }
                    }


                } else {
                    if (TipoServicio_Cuenta != "" && TipoServicio_Dispositivo != "") {
                        if (TipoServicio_Cuenta != TipoServicio_Dispositivo) {
                            $("#dvToolTipRed_d").show();
                            $("#dvToolTipRed_c").show();
                            $("#hdfPermitirGuardarTipSer").val("0");
                        } else {
                            $("#dvToolTipRed_d").hide();
                            $("#dvToolTipRed_c").hide();
                            $("#hdfPermitirGuardarTipSer").val("1");
                        }
                    }
                }
             }   
}