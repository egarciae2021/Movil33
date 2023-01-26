            var CodTipSer=-1;
            function subplan(P_inCodSubPla,vcNom,vcDes,dcMon,dcCan){
                this.P_inCodSubPla = P_inCodSubPla;
                this.vcNom = vcNom;
                this.vcDes = vcDes;
                this.dcMon = dcMon;
                this.dcCan = dcCan;
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

            function ObtieneSubPlan(){
                var SubPlan;
                SubPlan = new subplan();
                if ($("#hdfSubPlan").val() == "") {
                    SubPlan.P_inCodSubPla = "-1";
                }
                else {
                    SubPlan.P_inCodSubPla = $("#hdfSubPlan").val();
                }
                SubPlan.vcNom = $("#txtNombre").val().replace(/&#39/g, "'").replace(/&#34/g, '"').replace(/&#92/g, "\\");
                SubPlan.vcDes = $("#txtDescripcion").val().replace(/&#39/g, "'").replace(/&#34/g, '"').replace(/&#92/g, "\\");
                SubPlan.dcMon = $("#txtMonto").val();
                SubPlan.dcMon = SubPlan.dcMon.replace(window.parent.$("#hdfSepMiles").val(), "");
                SubPlan.dcMon = ParseFloatMultiPais(SubPlan.dcMon, oCulturaUsuario);

                SubPlan.TipoServicio.P_inCod = CodTipSer;

                if ($("#lblCantidad").html() == "Ilimitado") {
                    SubPlan.dcCan = 0;
                }
                else {
                    SubPlan.dcCan = $("#lblCantidad").html();
                }
                SubPlan.dcCan = ParseFloatMultiPais(SubPlan.dcCan, oCulturaUsuario);
                var Filas = $("#tblServicio").getGridParam("data");

                $(Filas).each(function () {
                    Servicio = new servicio();

                    Servicio.P_inCod = this.P_inCod;
                    Servicio.dcCan = this.dcCan;
                    Servicio.dcCan = ParseFloatMultiPais(this.dcCan, oCulturaUsuario);
                    Servicio.inCodTipDat = this.inCodTipDat;

                    SubPlan.Servicios.push(Servicio);
                });

                return SubPlan;
            }

            var oCulturaUsuario;

            $(function () {
                var indexServicio;
                var TipoServicio;
                var lstServicio;
                var lstTipoServicio;
                var lstServicioPlan;
                var Titulo = "";

                oCulturaUsuario = window.parent.oCulturaUsuario;

                $(".btnNormal").button();
                $("#lblCantidad").css({ "text-align": "right" });

                //focus agregado 21/05/2014 - wapumayta
                $("#txtMonto").focus(function () {
                    var elem = $(this);
                    if (elem.val() == "0") {
                        elem.val('');
                    }
                });
                $("#txtMonto").focusout(function () {
                    var elem = $(this);
                    if (elem.val() == "") {
                        elem.val('0');
                    }
                    window.parent.ActualizaMonto();
                });

                ValidarNumeroEnCajaTexto("txtMonto", ValidarDecimalPositivo, oCulturaUsuario);
                ValidarNumeroEnCajaTexto("txtCantidadServicio", ValidarDecimalPositivo, oCulturaUsuario);

                //try {
                //    window.parent.ActualizaMonto();
                //} catch (e) {
                //}

                $("#tblServicio").jqGrid({
                    datatype: "local",
                    colModel: [
   		                      { name: 'P_inCod', index: 'P_inCod', label: 'Codigo', width: 60, hidden: true },
   		                      { name: 'inCodTipDat', index: 'inCodTipDat', label: 'Tipo', width: 50, hidden: true },
   		                      { name: 'vcNom', index: 'vcNom', label: 'Servicio', width: 200 },
   		                      { name: 'dcCan', index: 'dcCan', label: 'Cantidad', width: 50, align: "right", sorttype: "float",
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

                    if ($("#hdfSubPlan").val() != "") {
                        $.ajax({
                            type: "POST",
                            url: "Mnt_SubPlan.aspx/Mostrar",
                            data: "{'inCodSubPla': " + $("#hdfSubPlan").val() + "}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result) {
                                SubPlan = result.d;
                                $("#txtNombre").val(SubPlan.vcNom.replace(/&#39/g, "'").replace(/&#34/g, '"').replace(/&#92/g, "\\"));
                                $("#txtDescripcion").val(SubPlan.vcDes.replace(/&#39/g, "'").replace(/&#34/g, '"').replace(/&#92/g, "\\"));
                                $("#txtMonto").val(FormatoNumero(SubPlan.dcMon, oCulturaUsuario));
                                CodTipSer = SubPlan.TipoServicio.P_inCod;

                                if (SubPlan.dcCan.toString() != "0") {
                                    $("#lblCantidad").html(FormatoNumero(SubPlan.dcCan, oCulturaUsuario, true));
                                }
                                else if (SubPlan.dcCan.toString() == "0" && SubPlan.Servicios.length > 0) {
                                    $("#lblCantidad").html("Ilimitado");
                                }
                                else {
                                    $("#lblCantidad").html("");
                                }
                                var i = 0;
                                for (i = 0; i < SubPlan.Servicios.length; i++) {
                                    $("#tblServicio").jqGrid('addRowData', SubPlan.Servicios[i].P_inCod, SubPlan.Servicios[i]);
                                }
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

                    $(lstServicio).each(function () {
                        $("#ddlServicio").append($("<option></option>").attr("value", this.P_inCod).text(this.vcNom));
                    });
                    //                    ActivarCombokendo("#ddlServicio", 120);
                }

                function CargarTipoServicio() {
                    $("#ddlTipoServicio").html("");
                    $("#ddlTipoServicio").append($("<option></option>").attr("value", -1).text("<Seleccionar>"));

                    $(lstTipoServicio).each(function () {
                        //if (this.P_inCod != 13 && this.P_inCod != 14 && this.P_inCod != 15) { //2015-05-04 wapumayta (quitar servicios roaming
                            $("#ddlTipoServicio").append($("<option></option>").attr("value", this.P_inCod).text(this.vcNom));
                        //}
                    });
                }

                $("#btnAgregarServicio").click(function () {
                    AgregarModificarServicio(-1, "Agregar Servicio");
                });

                $("#btnModificarServicio").click(function () {
                    var id = $("#tblServicio").jqGrid('getGridParam', 'selrow');
                    if (id) {
                        AgregarModificarServicio(id, "Modificar Servicio");
                    }
                    else {
                        alerta("Seleccione un servicio");
                    }
                });

                //                $("#txtNombre").focusout(function () {
                //                    $("#txtNombre").val($("#txtNombre").val().replace(/\\/g, ""));
                //                });

                //                $("#txtDescripcion").focusout(function () {
                //                    $("#txtDescripcion").val($("#txtDescripcion").val().replace(/\\/g, ""));
                //                });

                $("#btnEliminarServicio").click(function () {
                    var id = $("#tblServicio").jqGrid('getGridParam', 'selrow');

                    if (id) {
                        $("#tblServicio").jqGrid('delRowData', id);
                        ActualizaCantidad();
                    }
                    else {
                        alerta("Seleccione un servicio");
                    }
                });

                function AgregarModificarServicio(id, titulo) {
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
                        resizable: false
                    });
                }

                $("#btnGuardarServicio").click(function (event) {
                    var inCodSer = $("#ddlServicio").val();
                    var vcNomSer = $("#ddlServicio option:selected").text();
                    var inCodTipSer = $("#ddlTipoServicio").val();
                    var vcNomTipSer = $("#ddlTipoServicio option:selected").text();
                    var dcCan = $("#txtCantidadServicio").val();
                    var btSerIli = $('#chkServicioIlimitado').is(':checked');

                    if (oCulturaUsuario.vcSimSepMil == ",") {
                        dcCan = dcCan.toString().replace(/,/g, "");
                    }

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
                            alerta("Usted ya agregó un tipo de servicio, no podra agregar más servicios ni tipos");
                            $('#divServicios').dialog("close");
                            return;
                        }

                        if (inCodSer == -1) {
                            if ($(Filas).length > 0) {
                                alerta("Usted no puede agregar todos los servicios por que ya tiene agregado servicios");
                                return;
                            }
                            $("#tblServicio").jqGrid('addRowData', inCodTipSer, { id: inCodTipSer, 'P_inCod': inCodTipSer, 'inCodTipDat': "2", 'vcNom': vcNomTipSer, 'dcCan': dcCan });
                            //$("#ddlTipoServicio option:selected").remove();
                        }
                        else {
                            $("#tblServicio").jqGrid('addRowData', inCodSer, { id: inCodSer, 'P_inCod': inCodSer, 'inCodTipDat': "1", 'vcNom': vcNomSer, 'dcCan': dcCan });
                            $("#ddlServicio option:selected").remove();
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

                    //$("#ddlServicio").kendoComboBox({ filter: "contains", suggest: true });
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
                        if (($("#ddlTipoServicio").val() == this.TipoServicio.P_inCod && this.P_inCod != -1) || $("#ddlTipoServicio").val() == "-1") {

                            if ($("#ddlTipoServicio").val() != "-1" && inicio) {
                                $("#ddlServicio").append($("<option></option>").attr("value", -1).text("<Todos>"));
                                //if ($("#tblServicio").getGridParam("reccount") != 0) {//agregado 27-08-2013
                                //    alerta("grilla con registros");
                                //    $("#ddlServicio option[value=-1]").text('Servicios Restantes');
                                //}
                            }
                            $("#ddlServicio").append($("<option></option>").attr("value", this.P_inCod).text(this.vcNom));
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
                    //                    ActivarCombokendo("#ddlServicio", 120);
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

                $("#txtNombre").blur(function () {
                    var ind = window.parent.tbAsignacion.tabs("option", "selected");
                    if ($("#txtNombre").val() != "") {
                        $(window.parent.$('#tbAsignacion > ul a')[ind]).text($("#txtNombre").val());
                        $("#txtNombre").val($("#txtNombre").val());
                    }
                    else if ($("#hdfSubPlan").val() != "") {
                        $(window.parent.$('#tbAsignacion > ul a')[ind]).text("Sub Plan");
                    }
                    else {
                        $(window.parent.$('#tbAsignacion > ul a')[ind]).text("Nuevo sub Plan");
                    }
                });

                $("#txtMonto").change(function () {
                    window.parent.ActualizaMonto();
                });
            });



function formato_numero(numero, decimales, separador_decimal, separador_miles) {
    numero = parseFloat(numero);
    if (isNaN(numero)) {
        return "";
    }
    if (decimales !== undefined) {
        // Redondeamos
        numero = numero.toFixed(decimales);
    }
    // Convertimos el punto en separador_decimal
    numero = numero.toString().replace(".", separador_decimal !== undefined ? separador_decimal : ",");

    if (separador_miles) {
        // Añadimos los separadores de miles
        var miles = new RegExp("(-?[0-9]+)([0-9]{3})");
        while (miles.test(numero)) {
            numero = numero.replace(miles, "$1" + separador_miles + "$2");
        }
    }
    return numero;
}