var oCulturaUsuario;
var CodTipSer = -1;

function subcuenta(P_inCodSubCue, vcNom, vcDes, dcMon, dcCan, inCosteoXLinea, blCosteo) {
    this.P_inCodSubCue = P_inCodSubCue;
    this.vcNom = vcNom;
    this.vcDes = vcDes;
    this.dcMon = dcMon;
    this.dcCan = dcCan;
    this.inCosteoXLinea = inCosteoXLinea;
    this.blCosteo = blCosteo;
    this.Servicios = [];
    this.TipoServicio = new tiposervicio();
}
function servicio(P_inCod, vcNom, dcCan, inCodTipDat) {
    this.P_inCod = P_inCod;
    this.vcNom = vcNom;
    this.dcCan = dcCan;
    this.inCodTipDat = inCodTipDat;
}
function tiposervicio(P_inCod, vcNom) {
    this.P_inCod = P_inCod;
    this.vcNom = vcNom;
}

function ObtieneSubCuenta() {
    var SubCuenta;
    SubCuenta = new subcuenta();
    if ($("#hdfSubCuenta").val() == "") {
        SubCuenta.P_inCodSubCue = "-1";
    }
    else {
        SubCuenta.P_inCodSubCue = $("#hdfSubCuenta").val();
    }

    SubCuenta.vcNom = $("#txtNombre").val().replace(/&#39/g, "'").replace(/&#34/g, '"').replace(/&#92/g, "\\");
    SubCuenta.vcDes = $("#txtDescripcion").val().replace(/&#39/g, "'").replace(/&#34/g, '"').replace(/&#92/g, "\\");
    SubCuenta.dcMon = $("#txtMonto").val();
    SubCuenta.dcMon = SubCuenta.dcMon.replace(window.parent.$("#hdfSepMiles").val(), "");
    SubCuenta.dcMon = ParseFloatMultiPais(SubCuenta.dcMon, oCulturaUsuario);
    SubCuenta.inCosteoXLinea = ($('#chkCosteoXLinea').is(':checked') == true ? 1 : 0);
    SubCuenta.blCosteo = $('#chkCosteo').is(':checked');

    SubCuenta.TipoServicio.P_inCod = CodTipSer;

    if ($("#lblCantidad").html() == "Ilimitado") {
        SubCuenta.dcCan = 0;
    }
    else {
        SubCuenta.dcCan = $("#lblCantidad").html();
    }
    SubCuenta.dcCan = ParseFloatMultiPais(SubCuenta.dcCan, oCulturaUsuario);
    var Filas = $("#tblServicio").getGridParam("data");

    $(Filas).each(function () {
        Servicio = new servicio();

        Servicio.P_inCod = this.P_inCod;
        Servicio.dcCan = this.dcCan;
        Servicio.dcCan = ParseFloatMultiPais(this.dcCan, oCulturaUsuario);
        Servicio.inCodTipDat = this.inCodTipDat;

        SubCuenta.Servicios.push(Servicio);
    });

    return SubCuenta;
}

$(function () {
    var indexServicio;
    var TipoServicio;
    var lstServicio;
    var lstTipoServicio;
    var lstServicioCuenta;
    var Titulo = "";
    var vcExpresionTipo = "";
    oCulturaUsuario = window.parent.oCulturaUsuario;

    $("#lblCantidad").css({ "text-align": "right" });

    $(".btnNormal").button();
    //$("#ddlServicio").kendoComboBox({ filter: "contains", suggest: true });

    ValidarNumeroEnCajaTexto("txtMonto", ValidarDecimalPositivo, oCulturaUsuario, false);
    ValidarNumeroEnCajaTexto("txtCantidadServicio", ValidarDecimalPositivo, oCulturaUsuario, true);

    //"'" + oCulturaUsuario.vcSimDec + "'"
    //"'" + oCulturaUsuario.vcSimSepMil + "'"
    $("#tblServicio").jqGrid({
        datatype: "local",
        colModel: [
   		                { name: 'P_inCod', index: 'P_inCod', label: 'Codigo', width: 60, hidden: true },
   		                { name: 'inCodTipDat', index: 'inCodTipDat', label: 'Tipo', width: 50, hidden: true },
   		                { name: 'vcNom', index: 'vcNom', label: 'Servicio', width: 200 },
   		                {
   		                    name: 'dcCan', index: 'dcCan', label: 'Cantidad', width: 50,
   		                    align: "right", sorttype: "float",
   		                    formatter: function (value, options, rData) {
   		                        if (value == '0') {
   		                            return 'Ilimitado';
   		                        }
   		                        else {
   		                            return FormatoNumero(value.toString(), oCulturaUsuario, true);
   		                        }
   		                    }
   		                }
   	                ],
        sortname: "P_inCod", //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: "350",
        height: "95",
        rownumbers: true,
        caption: "Servicios",
        //footerrow : true,
        //userDataOnFooter : true,
        //altRows : true,
        ondblClickRow: function (id) { $("#btnModificarServicio").click(); }
    });

    $("#tblServicio").jqGrid('bindKeys', { "onEnter": function (id) { $("#btnModificarServicio").click(); }, "onSpace": function (id) { $("#btnModificarServicio").click(); } });

    inicio();

    function inicio() {
        lstServicio = window.parent.lstServicio;
        lstTipoServicio = window.parent.lstTipoServicio;

        CargarServicio();
        CargarTipoServicio();

        if ($("#hdfSubCuenta").val() != "") {
            $.ajax({
                type: "POST",
                url: "Mnt_SubCuenta.aspx/Mostrar",
                data: "{'inCodSubCue': " + $("#hdfSubCuenta").val() + "}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    SubCuenta = result.d;
                    $("#txtNombre").val(SubCuenta.vcNom.replace(/&#39/g, "'").replace(/&#34/g, '"').replace(/&#92/g, "\\"));
                    $("#txtDescripcion").val(SubCuenta.vcDes.replace(/&#39/g, "'").replace(/&#34/g, '"').replace(/&#92/g, "\\"));
                    $("#txtMonto").val(SubCuenta.dcMon);

                    $("#txtMonto").val(FormatoNumero($("#txtMonto").val(), oCulturaUsuario));

                    CodTipSer = SubCuenta.TipoServicio.P_inCod;

                    if (SubCuenta.dcCan.toString() != "0") {
                        $("#lblCantidad").html(FormatoNumero(SubCuenta.dcCan, oCulturaUsuario, true));
                    }
                    else if (SubCuenta.dcCan.toString() == "0" && SubCuenta.Servicios.length > 0) {
                        $("#lblCantidad").html("Ilimitado");
                    }
                    else {
                        $("#lblCantidad").html("");
                    }

                    if (SubCuenta.inCosteoXLinea == 1) {
                        $("#chkCosteoXLinea").attr('checked', true);
                    } else {
                        $("#chkCosteoXLinea").attr('checked', false);
                    }

                    if (SubCuenta.blCosteo == true) {
                        $("#chkCosteo").attr('checked', true);
                    } else {
                        $("#chkCosteo").attr('checked', false);
                    }

                    var i = 0;
                    for (i = 0; i < SubCuenta.Servicios.length; i++)
                    { $("#tblServicio").jqGrid('addRowData', SubCuenta.Servicios[i].P_inCod, SubCuenta.Servicios[i]); }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
    }

    function CargarServicio() {
        $("#ddlServicio").html("");
        $("#ddlServicio").append($("<option></option>").attr("value", -1).text("<Seleccionar>"));

        //        $(lstServicio).each(function ()
        //        {
        //            $("#ddlServicio").append($("<option></option>").attr("value", this.P_inCod).text(this.vcNom));
        //        });
        //ActivarCombokendo("#ddlServicio", 120);
    }

    function CargarTipoServicio() {
        $("#ddlTipoServicio").html("");
        $("#ddlTipoServicio").append($("<option></option>").attr("value", -1).text("<Seleccionar>"));

        $(lstTipoServicio).each(function () {
            $("#ddlTipoServicio").append($("<option></option>").attr("value", this.P_inCod).text(this.vcNom));
        });
        //ActivarCombokendo("#ddlServicio", 120);
    }

    $("#btnAgregarServicio").click(function () {
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
            if ($("#hdfSubCuenta").val() != "") {
                var datos = $("#tblServicio").jqGrid('getRowData', id);
                var inCodTipDato = datos.inCodTipDat;
                var inCodigo = datos.P_inCod;
                var vcCodCta = window.parent.$("#hdfCuenta").val();

                $.ajax({
                    type: "POST",
                    url: "Mnt_SubCuenta.aspx/ObtenerCantidadLineasAsociadas",
                    data: "{'prInOpcion': '" + inCodTipDato + "'," +
                          "'prvcCodCta': '" + vcCodCta.replace(/'/g, "&#39") + "'," +
                          "'prInCodigo': '" + inCodigo + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        var cantLineas = result.d;
                        if (cantLineas > 0) {
                            $('#divMsgConfirmQuitarServicio').dialog({
                                title: "Quitar Servicio",
                                modal: true,
                                buttons: {
                                    "Aceptar": function () {
                                        $(this).dialog("close");
                                    }
                                }
                            });
                        } else {
                            $("#tblServicio").jqGrid('delRowData', id);
                            ActualizaCantidad();
                        }
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });

            } else {
                $("#tblServicio").jqGrid('delRowData', id);
                ActualizaCantidad();
            }
        }
        else {
            alerta("Seleccione un servicio");
        }
    });

    function AgregarModificarServicio(id, titulo, tipo) {
        var inReducir = 0;
        if (tipo == 1 || tipo == null) {
            inReducir = 30;
        }
        indexServicio = id;
        $("#lblServicio").html("");

        $("#ddlTipoServicio").val(CodTipSer);

        if (CodTipSer != -1 && $("#tblServicio").getGridParam("reccount") > 0) {
            $("#ddlTipoServicio").attr("disabled", "disabled");
            $("#ddlTipoServicio").change();
        }
        else {
            $("#ddlTipoServicio").removeAttr("disabled");
        }

        if (id == -1) {//Nuevo
            $(".trNuevo").show();
            $(".trEditar").hide();
            $("#txtCantidadServicio").val("");
            $("#trCantidad").show();
            $("#ddlServicio").prop('selectedIndex', 0);
            $("#chkServicioIlimitado").attr('checked', false);
        }
        else {//Editar
            var datos = $("#tblServicio").jqGrid('getRowData', id);
            var inCodSer = datos.P_inCod;
            var vcSer = datos.vcNom;
            var vcMon = datos.dcCan;

            if (vcMon == "Ilimitado") {
                vcMon = "0";
                $("#chkServicioIlimitado").attr('checked', true);
                $("#trCantidad").hide();
            }
            else {
                $("#chkServicioIlimitado").attr('checked', false);
                $("#trCantidad").show();
                $("#txtCantidadServicio").focus();
            }

            $("#lblServicio").html(vcSer);
            $("#txtCantidadServicio").val(vcMon);
            $("#txtCantidadServicio").focus();
            $(".trNuevo").hide();
            $(".trEditar").show();
        }

        $('#divServicios').dialog({
            title: titulo,
            width: 380,
            modal: true,
            resizable: false,
            height: (170 + inReducir)
        });
    }

    $("#btnGuardarServicio").click(function (event) {
        var inCodSer = $("#ddlServicio").val();
        var vcNomSer = $("#ddlServicio option:selected").text();
        var inCodTipSer = $("#ddlTipoServicio").val();
        var vcNomTipSer = $("#ddlTipoServicio option:selected").text();
        var dcCan = $("#txtCantidadServicio").val();
        if (oCulturaUsuario.vcSimSepMil == ",") {
            dcCan = dcCan.toString().replace(/,/g, "");
        }
        var btSerIli = $('#chkServicioIlimitado').is(':checked');

        if (inCodTipSer == -1 && inCodSer < 0 && indexServicio == -1) {
            alerta("Seleccione un servicio o un tipo servicio, es un campo obligatorio");
            $("#ddlTipoServicio").focus();
            return;
        }

        if (inCodSer == -2 && indexServicio == -1) {
            alerta("No hay servicios para el tipo de servicio seleccionado, seleccione otro tipo de servicio");
            $("#ddlTipoServicio").focus();
            return;
        }

        if ((dcCan == "" || parseFloat(dcCan) <= 0) && !btSerIli) {
            alerta("Ingrese la cantidad/minutos, es un campo obligatorio");
            $("#txtCantidadServicio").focus();
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
                    TipSer = true;
                }
            });

            if (Ser) {
                alerta("Usted ya agregó este servicio, elija otro");
                $("#ddlServicio").focus();
                return;
            }
            if (TipSer) {
                alerta("Usted ya agregó un tipo de servicio, no podrá agregar más servicios ni tipos");
                $('#divServicios').dialog("close");
                return;
            }

            if (inCodSer == -1) {
                if ($(Filas).length > 0) {
                    alerta("Usted no puede agregar todos los servicios porque ya tiene agregado servicios");
                    return;
                }
                $("#tblServicio").jqGrid('addRowData', inCodTipSer, { id: inCodTipSer, 'P_inCod': inCodTipSer, 'inCodTipDat': "2", 'vcNom': vcNomTipSer, 'dcCan': dcCan });
                //$("#ddlTipoServicio option:selected").remove();
            }
            else {
                $("#tblServicio").jqGrid('addRowData', inCodSer, { id: inCodSer, 'P_inCod': inCodSer, 'inCodTipDat': "1", 'vcNom': vcNomSer, 'dcCan': dcCan });
                //                $("#ddlServicio option:selected").remove();
            }
        }
        else {
            if (inCodSer == -1) {
                $("#tblServicio").jqGrid('setRowData', indexServicio, { 'dcCan': dcCan });
            }
            else {
                $("#tblServicio").jqGrid('setRowData', indexServicio, { 'dcCan': dcCan });
            }
        }

        if (inCodTipSer != "-1") {
            CodTipSer = inCodTipSer;
        }
        else {
            $(lstServicio).each(function () {
                if (this.P_inCod == inCodSer) {
                    CodTipSer = this.TipoServicio.P_inCod;
                    return false;
                }
            });
        }

        ActualizaCantidad();

        $("#ddlServicio").removeAttr("disabled");
        $('#divServicios').dialog("close");
    });

    $("#btnCerrarServicio").click(function (event) {
        $('#divServicios').dialog("close");
    });

    function ActualizaCantidad() {
        var dcCan = 0;
        var Filas = $("#tblServicio").getGridParam("data");
        if ($(Filas).length > 0) {
            $(Filas).each(function () {
                if (this.dcCan.toString() != "Ilimitado") {
                    //dcCan += parseFloat(this.dcCan.toString());
                    dcCan += parseFloat(ParseFloatMultiPais(this.dcCan.toString(), oCulturaUsuario));
                }
            });
            if (dcCan != "0") {
                $("#lblCantidad").html(FormatoNumero(dcCan, oCulturaUsuario, true));
            }
            else {
                $("#lblCantidad").html("Ilimitado");
            }
        }
        else {
            $("#lblCantidad").html("");
        }
    }

    $("#ddlTipoServicio").change(function (event) {
        var inicio = true;
        $("#ddlServicio").html("");

        $.each(lstServicio, function () {
            //            if (($("#ddlTipoServicio").val() == this.TipoServicio.P_inCod && this.P_inCod != -1) || $("#ddlTipoServicio").val() == "-1")
            if (($("#ddlTipoServicio").val() == this.TipoServicio.P_inCod && this.P_inCod != -1)) {

                if ($("#ddlTipoServicio").val() != "-1" && inicio) {
                    $("#ddlServicio").append($("<option></option>").attr("value", -1).text("<Todos>"));
                }
                $("#ddlServicio").append($("<option></option>").attr("value", this.P_inCod).text(this.vcNom));
                vcExpresionTipo = this.TipoServicio.vcExpEn;
                inicio = false;
            }
        });

        if ($("option", $("#ddlServicio")).length == 0) {
            $("#ddlServicio").append($("<option></option>").attr("value", -2).text("Sin datos"));
        }
        if ($("#ddlTipoServicio").val() != "-1") {
            $.each(lstTipoServicio, function () {
                if ($("#ddlTipoServicio").val() == this.P_inCod) {
                    $("#lblUnidadTituloCantidadServicio").html('(' + this.vcExpEn + '):');
                    $("#lblUnidadTituloCantidad").html('(' + this.vcExpEn + '):');
                }
            });
        }
        else {
            $("#lblUnidadTituloCantidadServicio").html(":");
            $("#lblUnidadTituloCantidad").html(":");
        }
        if (vcExpresionTipo == "Mb") {
            $("#dvInfo").show();
        } else {
            $("#dvInfo").hide();
        }
        //        ActivarCombokendo("#ddlServicio", 120);

    });

    $("#ddlServicio").change(function (event) {
        if ($("#ddlTipoServicio").val() == "-1") {
            if ($("#ddlServicio").val() != "-1") {
                $.each(lstServicio, function () {
                    if ($("#ddlServicio").val() == this.P_inCod) {
                        $("#lblUnidadTituloCantidadServicio").html('(' + this.TipoServicio.vcExpEn + '):');
                        $("#lblUnidadTituloCantidad").html('(' + this.TipoServicio.vcExpEn + '):');
                    }
                });
            }
            else {
                $("#lblUnidadTituloCantidadServicio").html(":");
                $("#lblUnidadTituloCantidad").html(":");
            }
        }
    });

    $("#chkServicioIlimitado").change(function (event) {
        if ($('#chkServicioIlimitado').is(':checked')) {
            $("#trCantidad").hide();
            $("#txtCantidadServicio").val("0");
        }
        else {
            $("#txtCantidadServicio").val("");
            $("#trCantidad").show();
        }
    });

    //                $("#txtDescripcion").focusout(function () {
    //                    $("#txtDescripcion").val($("#txtDescripcion").val().replace(/\\/g, ""));
    //                });

    $("#txtNombre").blur(function () {
        var ind = window.parent.tbAsignacion.tabs("option", "selected");
        if ($("#txtNombre").val() != "") {
            $(window.parent.$('#tbAsignacion > ul a')[ind]).text($("#txtNombre").val());
            $("#txtNombre").val($("#txtNombre").val());
        }
        else if ($("#hdfSubCuenta").val() != "") {
            $(window.parent.$('#tbAsignacion > ul a')[ind]).text("Sub Cuenta");
        }
        else {
            $(window.parent.$('#tbAsignacion > ul a')[ind]).text("Nuevo sub Cuenta");
        }
    });

    $("#txtMonto").change(function () {
        window.parent.ActualizaMonto();
    });

});