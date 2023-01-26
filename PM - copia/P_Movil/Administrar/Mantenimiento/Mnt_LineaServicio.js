var Servicios;
var CantIngresada;
function servicio(P_inCod, vcNom, dcCan, inCodTipDat, inTipAsig, dcMon)
{
    this.P_inCod = P_inCod;
    this.vcNom = vcNom;
    this.dcCan = dcCan;
    this.inCodTipDat = inCodTipDat;
    this.dcMon = dcMon;
    this.inTipAsig = inTipAsig;
}

function isIE() { //Vefiricar Version del Internet Explorer
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

function BloquearPagina(bloqueado)
{
    $(".btnNormal").button("option", "disabled", bloqueado);

    if (bloqueado)
    {
        $("input").attr("disabled", "disabled");
        $("select").attr("disabled", "disabled");
    }
    else
    {
        $("input").removeAttr("disabled");
        $("select").removeAttr("disabled");
    }
}

function ObtenerCantidadServiciosLineas() {
    return $("#tblServicio").getGridParam("reccount");
}

function LimpiarServiciosLineas() {
    $("#tblServicio").jqGrid('clearGridData');
}

function ObtenerServiciosLineas()
{
    Servicios = [];
    var Filas = $("#tblServicio").getGridParam("data");

    $(Filas).each(function ()
    {
        Servicio = new servicio();

        Servicio.P_inCod = this.inCodTipSer;
        Servicio.vcNom = this.vcNom;
        var Cantidad = this.dcCan;
        if (oCulturaUsuario.vcSimSepMil == ",")
        {
            Cantidad = Cantidad.toString().replace(/,/g, "");
        }
        Servicio.dcCan = Cantidad;
        Servicio.inCodTipDat = this.inCodTipDat;
        if (this.dcMonto == 0)
        {
            Servicio.dcMon = 0;
        } else
        {
            Servicio.dcMon = DevuelveNumeroSinFormato(this.dcMonto, oCulturaUsuario, true);
        }
        Servicio.inTipAsig = this.inTipAsig;
        
        Servicios.push(Servicio);
    });

    return Servicios;
    //window.parent.IngresarServicios(Servicios);
}

function CargarServiciosLineas(vcServicios)
{
    if (vcServicios != "")
    {
        var servicios = JSON.parse(vcServicios);
        $(servicios).each(function ()
        {
            $("#tblServicio").jqGrid('addRowData', this.P_inCod, { id: this.P_inCod, 'P_inCod': this.P_inCod, 'inCodTipDat': this.inCodTipDat, 'vcNom': this.vcNom, 'dcCan': this.dcCan, 'inCodTipSer': this.P_inCod, 'dcMonto': this.dcMon, 'inTipAsig': this.inTipAsig, 'dcMonTotCta': this.dcMonTotalCta, 'dcCanTotCta': this.dcCanTotalCta });
        });
    }
}

function CerroMensaje()
{
    BloquearPagina(false);
    if ($("#hdfLinea").val() == "")
    {
        $(".VARCHAR").val("");
        $(".INT").val("");
        $(".DECIMAL").val("");
        $(".DATE").val("");
        $(".DATETIME").val("");
        $("input", ".BIT").each(function (i)
        {
            $(this).attr('checked', false);
        });
    }
    else
    {//Edicion
        window.parent.tab.tabs("remove", indiceTab);
    }
}

var esSrvIlimitado = false;
var esSrvTipAsig = false;
var dcMonXSubCta;
var dcCanXSubCta;
var bajaDisp = true;
var indexServicio;

var oCulturaUsuario;
var FormatoFechaCulturaForDatePicker = "";
var SimDec = ".";
var SimMil = ",";
var NumDec = "2";
var val_x_Defecto = 0;
var tblServicio;
$(function () {
    oCulturaUsuario = window.parent.parent.parent.oCulturaUsuario;

    if (oCulturaUsuario != undefined) {
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
    }

    $("#AccordionJQ1").accordion("option", "active", 1);

    $(".accordion").accordion({
        collapsible: true,
        autoHeight: false
    });

    ValidarNumeroEnCajaTexto("txtCantidadServicio", ValidarDecimalPositivo, oCulturaUsuario, true);
    ValidarNumeroEnCajaTexto("txtMontoAsignado", ValidarDecimalPositivo, oCulturaUsuario, false);

    $("#chkTipoAsignacion").attr("checked", true);
    if ($('#chkTipoAsignacion').is(':checked') == true) {
        $("#txtMontoAsignado").val(val_x_Defecto.toFixed(NumDec));
        $("#txtMontoAsignado").attr("disabled", true);
        $("#LblTipoAsignacion").text("Monto Automático");
    } else {
        $("#LblTipoAsignacion").text("Monto Manual");
    }

    $(".btnNormal").button({});

    if ($("#hdfTipo").val() == "Linea") {
        $("#LblTituloAgregar").text("Agregar");
        $("#LblTituloEditar").text("Modificar");
        $("#LblTituloQuitar").text("Quitar");

        $("#btnAgregarServicio").css("width", "110");
        $("#btnModificarServicio").css("width", "110");
        $("#btnEliminarServicio").css("width", "110");
    } else {
        $("#LblTituloAgregar").text("");
        $("#LblTituloEditar").text("");
        $("#LblTituloQuitar").text("");

        $("#btnAgregarServicio").css("width", "50");
        $("#btnModificarServicio").css("width", "50");
        $("#btnEliminarServicio").css("width", "50");

    }

    tblServicio = $("#tblServicio").jqGrid({
        datatype: "local",
        colModel: [{ name: 'P_inCod', index: 'P_inCod', label: 'Codigo', width: 60, hidden: true },
   		                   { name: 'inCodTipDat', index: 'inCodTipDat', label: 'Tipo', width: 50, hidden: true },
   		                   { name: 'vcNom', index: 'vcNom', label: 'Servicio', width: 200 },
                           { name: 'inCodTipSer', index: 'inCodTipDat', label: 'Tipo', width: 50, hidden: true },
   		                   { name: 'dcCan', index: 'dcCan', label: 'Cantidad', width: 50, align: "right", sorttype: "float",
   		                       formatter: function (value, options, rData) {
   		                           if (value == '0') {
   		                               return 'Ilimitado';
   		                           }
   		                           else {
   		                               return FormatoNumero(value.toString(), oCulturaUsuario, true);
   		                           }
   		                       }
   		                   },
                           { name: 'dcMonto', index: 'dcMonto', label: 'Monto', align: "right", width: 50,
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

    IniciarPagina();

    function IniciarPagina() {
        $(".tdEtiqueta").css("width", "130px");
        //        if ($("#hdfServicio").val() != "") {
        //            var servicios = JSON.parse($("#hdfServicio").val());
        //            $(servicios).each(function () {
        //                $("#tblServicio").jqGrid('addRowData', this.P_inCod, { id: this.P_inCod, 'P_inCod': this.P_inCod, 'inCodTipDat': this.inCodTipDat, 'vcNom': this.vcNom, 'dcCan': this.dcCan, 'inCodTipSer': this.P_inCod, 'dcMonto': this.dcMon, 'inTipAsig': this.inTipAsig, 'dcMonTotCta': this.dcMonTotalCta, 'dcCanTotCta': this.dcCanTotalCta });
        //            });
        //        }
    }

    $("#btnAgregarServicio").click(function () {
        var id = $("#tblServicio").jqGrid('getGridParam', 'selrow');
        $("#trIlimitado").hide();
        $("#trCantidad").hide();
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
            $(".trNuevo").show();
            $(".trEditar").hide();
            $("#txtCantidadServicio").val("");
            $("#ddlServicio").prop('selectedIndex', 0);
            $("#LblCanTotalMinutosXBolsa").text("");
            $("#LblCantAsignada").text("");
            $("#CantAsig").hide();
            //$("#trIlimitado").show();
            //$("#trCantidad").show();
            $("#chkServicioIlimitado").attr('checked', false);
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

            CantidadModificada = vcMon; //agregado 05-08-2014 - wapumayta
            //isEditar = true;
            var vcCodCuenta = $("#hdfCodCuenta").val();
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
            heigth: 250,
            modal: true,
            resizable: false
        });
    }

    function CargarMinutosRestantesXServicio(vcCodCuenta, vcCodTipSer, vcCodSer, opcion, IsEdit, indexServicio) {
        if (IsEdit != 1) {
            var TipoSrv = 0;
            var CodSubCue = vcCodTipSer;
            if (vcCodSer == '0') {
                TipoSrv = $("#LblTipoServicio").text();
            }
        } else {
            var datos = $("#tblServicio").jqGrid('getRowData', indexServicio);
            var TipoSrv = datos.inCodTipSer;
            var CodSubCue = datos.P_inCod;
            vcCodSer = 0;
        }
        $.ajax({
            type: "POST",
            url: "Mnt_LineaServicio.aspx/ObtenerCantidadRestante",
            data: "{'pvcCodCta': '" + vcCodCuenta + "'," +
                   "'pvcCodTipSer': '" + TipoSrv + "'," +
                   "'vcNumLin': '" + $("#hdfLinea").val() + "'," +
                   "'pvcCodSer': '" + vcCodSer + "'," +
                   "'inCodSubCue':'" + CodSubCue + "'," +
                   "'inCodSol':'" + $("#hdfinCodSol").val() + "'}",
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
                //if (result.d.P_inCod == 16 || result.d.P_inCod == 18) { //tipo de servicios llamadas
                if (result.d.P_inCod != 17 || result.d.P_inCod != 20) { //tipo de servicios que restan al total del servicio de la cuenta
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
                if (result.d.P_inCod != 16 && result.d.P_inCod != 17 && result.d.P_inCod != 18) { //nuevos tipos de servicios
                    $("#LblCanTotalMinutosXBolsa").text((result.d.dcCan == 0 ? "Ilimitado." : FormatoNumero(result.d.dcCan, oCulturaUsuario, true) + ""));
                    if (CantAsigTotMin === "") {
                        $("#LblTextoServicio").text("Ilimitado");
                        $("#chkServicioIlimitado").attr("checked", true);
                        $("#LblCantAsignada").hide();
                    } else {
                        $("#LblTextoServicio").text("Cantidad Restante: ");
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
                if (result.d.P_inCod == 17 || result.d.P_inCod == 20) {
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
                    //$("#CantAsig").show();
                }
                if (result.d.P_inCod == 18) {
                    CantAsigTotMin = parseFloat(result.d.dcCan);
                    $("#LblCanTotalMinutosXBolsa").text((result.d.dcCan == 0 ? "Mensajes Ilimitados" : result.d.dcCan + " Mensaje(s)"));
                    if (CantAsigTotMin == "0") {
                        $("#LblTextoServicio").text("Mensajes Ilimitados");
                        $("#LblCantAsignada").hide();
                        //$("#LblCantidad").text("Ilimitados");
                    } else {
                        $("#LblTextoServicio").text("Mensaje(s) Restantes : ");
                        $("#LblCantAsignada").text(CantAsigTotMin);
                        $("#LblCantAsignada").show();
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
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });
    }

    function CalcularMontoAutomatico(dcCanAsig, dcMonCta, dcCanCta) {
        var MontoAutomatico;
        if (dcCanCta > 0 && dcCanAsig != "") {
            MontoAutomatico = (parseFloat(dcMonCta) / parseFloat(dcCanCta)) * parseInt(DevuelveNumeroSinFormato($("#txtCantidadServicio").val(), oCulturaUsuario, true));
        } else {
            MontoAutomatico = 0;
        }

        return MontoAutomatico.toFixed(NumDec);
    }

    function listarServicioPorCuenta() {
        if ($("#hdfCodCuenta").val() != "-1" && $("#hdfAsigCred").val() == 2) {
            $.ajax({
                type: "POST",
                url: "Mnt_LineaServicio.aspx/ListarServicioPorCuenta",
                data: "{'vcCodCue': '" + $("#hdfCodCuenta").val().replace(/'/g, "&#39") + "'}",
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
                    if (isIE() > 8) {
                        ActivarCombokendo("#ddlServicio", 120);
                        ActivarCombokendo("#ddlTipoServicio", 120);
                    }
                    $("input[name='ddlServicio_input']").attr("disabled", "disabled");
                    $("input[name='ddlTipoServicio_input']").attr("disabled", "disabled");
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
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

    $("#txtMontoAsignado").focusout(function (event) {
        CantIngresada = $("#txtMontoAsignado").val();
    });


    $("#txtMontoAsignado").keyup(function (event) {
        if ((event.keyCode >= 35 && event.keyCode <= 40) || event.keyCode == 16) { //flechas, inicio, fin, shift
            return;
        }
        //$("#txtMontoAsignado").val(FormatoNumero(DevuelveNumeroSinFormato($(this).val(), oCulturaUsuario, true), oCulturaUsuario, true));
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


        if (inCodTipSer < 0 && indexServicio == -1) {
            alerta("Seleccione una Sub Cuenta, es un campo obligatorio");
            $("#ddlTipoServicio").focus();
            return;
        }

        if (inCodSer < 0 && indexServicio == -1) {
            alerta("Seleccione un servicio, es un campo obligatorio");
            $("#ddlServicio").focus();
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
                { alerta("La cantidad/minutos ingresada excede a la cantidad restante, es un campo obligatorio"); }
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
                alerta("Este servicio ya fue agregado, elegir otro.");
                $("#ddlServicio").focus();
                return;
            }
            if (TipSer) {
                alerta("Este tipo de servicio ya fue agregado, elegir otro.");
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
        CantIngresada = "";
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
            //$("#trIlimitado").show();
            //$("#trCantidad").show();
            $("#ddlServicio").prop('disabled', true);
            $("#chkTipoAsignacion").attr("checked", true);
            $("#txtMontoAsignado").val(val_x_Defecto.toFixed(NumDec));
            $("#chkTipoAsignacion").attr("disabled", true);
        } else {
            $("#LblCanTotalMinutosXBolsa").text("");
            $("#LblCantAsignada").text("");
            $("#CantAsig").hide();
            //$("#trIlimitado").show();
            //$("#trCantidad").show();
            $("#ddlServicio").prop('disabled', false);
            $("#chkTipoAsignacion").attr("checked", true);
            $("#txtMontoAsignado").val(val_x_Defecto.toFixed(NumDec));
            //$("#chkTipoAsignacion").attr("disabled", true);
            $.ajax({
                type: "POST",
                url: "Mnt_LineaServicio.aspx/ListarServicioPorCuentaLineas",
                data: "{'vcCodCue': '" + $("#hdfCodCuenta").val().replace(/'/g, "&#39") + "'," +
                      "'inCodTipSer': '" + $("#ddlTipoServicio").val().replace(/'/g, "&#39") + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    lstServicio = result.d;
                    var intCodTipServ;
                    $("#ddlServicio").html("");
                    //var items = [{ text: '<Seleccione>', value: -1}];
                    if (isIE() > 8) {
                        var items = [{ text: '<Seleccione>', value: -1}];
                    } else {
                        //$("#ddlServicio").append($("<option></option>").attr("value", -1).text("<Seleccionar>"));
                        $("#ddlServicio").append($("<option></option>").attr("value", -1).text("<Seleccionar>"));
                    }

                    if ($(lstServicio).length > 0) {
                        $(lstServicio).each(function () {
                            if (this.inCodTipDat == "1") {
                                //items.push({ text: "<Todos>", value: 1 });
                                if (isIE() > 8) {
                                    items.push({ text: "<Todos>", value: 1 });
                                } else {
                                    $("#ddlServicio").append($("<option></option>").attr("value", 1).text("<Todos>"));
                                }
                            }

                            if (this.inCodTipDat == "2") {
                                //items.push({ text: this.vcNom.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'), value: this.P_inCod });
                                if (isIE() > 8) {
                                    items.push({ text: this.vcNom.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'), value: this.P_inCod });
                                } else {
                                    //$("#ddlServicio").append($("<option></option>").attr("value", this.P_inCod).text(this.vcNom));
                                    $("#ddlServicio").append($("<option></option>").attr("value", this.P_inCod).text(this.vcNom));
                                }
                            }
                            intCodTipServ = this.inCodOpe;
                        });
                    }
                    if (isIE() > 8) {
                        var dataSource = new kendo.data.DataSource({ data: items });
                        $("#ddlServicio").data("kendoComboBox").setDataSource(dataSource);
                        $("#ddlServicio").data("kendoComboBox").select(0);
                    } else {
                        $("#ddlServicio").val(-1);
                    }

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
                    } else {
                        $("#LblTextoTipSer").html("Cantidad:");
                        $("#LblTipoServicio").text(intCodTipServ.toString());
                    }


                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
        CantIngresada = "";
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
        var vcCodCuenta = $("#hdfCodCuenta").val();
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
        CantIngresada = "";
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

    $("#txtCantidadServicio").focusout(function (event) {
        if (indexServicio == '' || indexServicio == '-1') {
            if ($("#ddlServicio").val() == "-1" || $("#ddlServicio").val() == "-2") {
                $("#txtMontoAsignado").val(val_x_Defecto.toFixed(NumDec));
                return;
            }
        }
        if ($("#txtCantidadServicio").val() != "" && $('#chkTipoAsignacion').is(':checked') == true) {
            dcMonXSubCta = $("#hdfMonTotCta").val();
            dcCanXSubCta = $("#hdfCanTotCta").val();
            $("#txtMontoAsignado").val(CalcularMontoAutomatico($("#txtCantidadServicio").val(), dcMonXSubCta, dcCanXSubCta));
        }
    });


    $("#txtCantidadServicio").keyup(function (event) {
        if ((event.keyCode >= 35 && event.keyCode <= 40) || event.keyCode == 16) { //flechas, inicio, fin, shift
            return;
        }
        if (event.keyCode == 13) {
            $("#btnGuardarServicio").click();
            return;
        }

        //if ($("#LblTipoServicio").text() == 16 || $("#LblTipoServicio").text() == 18) {
        if ($("#LblTipoServicio").text() != 17) {
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

    $("#chkTipoAsignacion").change(function (event) {
        if ($('#chkTipoAsignacion').is(':checked')) {
            $("#LblTipoAsignacion").text("Monto Automático");
            $("#txtMontoAsignado").attr("disabled", true);
            $("#txtMontoAsignado").val("");
            if ($("#ddlServicio").val() == "-1" && indexServicio == "") //|| indexServicio == "-1")
            //if ($("#ddlServicio").val() == "-1" || $("#ddlTipoServicio").val() == "-1")
            {
                $("#txtMontoAsignado").val(val_x_Defecto.toFixed(NumDec));
                return;
            }
            $("#txtMontoAsignado").val(CalcularMontoAutomatico($("#txtCantidadServicio").val(), dcMonXSubCta, dcCanXSubCta));
            $("#txtCantidadServicio").focus();
        }
        else {
            $("#LblTipoAsignacion").text("Monto Manual");
            $("#txtMontoAsignado").attr("disabled", false);
            $("#txtMontoAsignado").val(CantIngresada);
            $("#txtMontoAsignado").focus();
        }
    });
});
