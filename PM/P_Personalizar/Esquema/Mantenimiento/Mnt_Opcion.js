
            function opcion(P_inCod, F_inMod, inOrd, vcNom, vcURL, inTipOri, vcTab, inEst) {
                this.P_inCod = P_inCod;
                this.F_inMod = F_inMod;
                this.vcNom = vcNom;
                this.vcURL = vcURL;
                this.vcTab = vcTab;
                this.inOrd = inOrd;
                this.inEst = inEst;
                this.inTipOri = inTipOri;
                this.Items = [];
            }
            function item(P_inCod, F_inOpc, inOrd, vcNom, vcURL, inTipOri, vcTab, inEst) {
                this.P_inCod = P_inCod;
                this.F_inOpc = F_inOpc;
                this.vcNom = vcNom;
                this.vcURL = vcURL;
                this.vcTab = vcTab;
                this.inOrd = inOrd;
                this.inEst = inEst;
                this.inTipOri = inTipOri;
            }

            function ObtieneOpcion(){
                var Opcion;
                Opcion = new opcion();
                if ($("#hdfOpcion").val() == "") {
                    Opcion.P_inCod = "-1";
                }
                else {
                    Opcion.P_inCod = $("#hdfOpcion").val();
                }

                Opcion.vcNom = $("#txtNombre").val();
                Opcion.vcURL = $("#txtUrl").val();
                Opcion.inEst = 1;
                Opcion.inOrd = $("#txtOrden").val();
                Opcion.inTipOri = $("#ddlTipoOrigen").val();
                Opcion.vcTab = $("#ddlTabla option:selected").text();
                if (Opcion.vcTab == 'OTRO') {
                  Opcion.vcTab = $("#txtTabla").val();
                }

                var Filas = $("#tblItem").getGridParam("data");
                $(Filas).each(function () {
                  Item = new item();
                  Item.P_inCod = this.P_inCod;
                  Item.vcNom = this.vcNom;
                  Item.vcURL = this.vcURL;
                  Item.inEst = 1;
                  Item.inOrd = this.inOrd;
                  Item.inTipOri = this.inTipOri;
                  Item.vcTab = this.vcTab;
                  Opcion.Items.push(Item);
                });

                return Opcion;
            }

            ActualizarListaTablas = function (NombreTipoOrigen, NombreObjeto, Valor, ObjetoEditable) {

                $("#" + NombreObjeto).html("");

                $.ajax({
                    type: "POST",
                    url: "Mnt_Opcion.aspx/ListarTablas",
                    data: "{'TipoOrigen': " + $("#" + NombreTipoOrigen).val() + "}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        lstTablas = result.d;
                        $.each(lstTablas, function () {
                            $("#" + NombreObjeto).append($("<option></option>").attr("value", this.vcTab).text(this.vcTab));
                            inicio = false;
                        });

                        $("#" + NombreObjeto).val(Valor);
                        var vcTabla = $("#" + NombreObjeto).val();
                        if (vcTabla == 'OTRO' || vcTabla == '0') {
                            $("#" + ObjetoEditable).val(Valor);
                            $("#" + ObjetoEditable).show();
                        }
                        else {
                            $("#" + ObjetoEditable).val('');
                            $("#" + ObjetoEditable).hide();
                        }

                        if (lstTablas == '') {
                            $("#" + ObjetoEditable).val('');
                            $("#" + ObjetoEditable).hide();
                        }

                    },
                    error: function (xhr, err, thrErr) {
                        alert(xhr.responseText);
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });

            };

            $(function () {
                var indexItem;
                var Titulo = "";

                $(".btnNormal").button();

                ValidarNumeroEnCajaTexto("txtOrden", ValidarEnteroPositivo);
                ValidarNumeroEnCajaTexto("txtOrdenItem", ValidarEnteroPositivo);

                $("#tblItem").jqGrid({
                    datatype: "local",
                    colModel: [
                                { name: 'P_inCod', index: 'P_inCod', label: 'Codigo', width: 60, hidden: true },
                              { name: 'F_inOpc', index: 'F_inOpc', label: 'Codigo Opcion', width: 60, hidden: true },
                              { name: 'inOrd', index: 'inOrd', label: 'Orden', width: 40 },
                              { name: 'vcNom', index: 'vcNom', label: 'Nombre', width: 200 },
                              { name: 'vcURL', index: 'vcURL', label: 'URL', width: 200 },
                              { name: 'inTipOri', index: 'inTipOri', label: 'Tipo Origen', width: 100, align: "left", sorttype: "float",
                                  formatter: function (value, options, rData) { if (value == '0') { return 'Base'; } else if (value == '1') { return 'Datos'; } else { return ''; } }
                              },
                            { name: 'vcTab', index: 'vcTab', label: 'Tabla', width: 100 },
                            ],
                    sortname: "P_inCod", //Default SortColumn
                    sortorder: "asc", //Default SortOrder.
                    width: "750",
                    height: "95",
                    rownumbers: true,
                    caption: "Items",
                    //footerrow : true,
                    //userDataOnFooter : true,
                    //altRows : true,
                    ondblClickRow: function (id) { $("#btnModificarItem").click(); }
                });

                $("#tblItem").jqGrid('bindKeys', { "onEnter": function (id) { $("#btnModificarItem").click(); }, "onSpace": function (id) { $("#btnModificarItem").click(); } });

                $("#ddlTipoOrigen").change(function () {
                    ActualizarListaTablas('ddlTipoOrigen', 'ddlTabla', '', 'txtTabla');
                });

                $("#ddlTipoOrigenItem").change(function () {
                    ActualizarListaTablas('ddlTipoOrigenItem', 'ddlTablaOrigen', '', 'txtTablaOrigen');
                });

                $("#ddlTablaOrigen").change(function () {
                    //Validar Si muestra caja de texto...
                    var vcTablaOrigen = $("#ddlTablaOrigen").val();
                    if (vcTablaOrigen == 'OTRO') {
                        $("#txtTablaOrigen").show();
                        $("#txtTablaOrigen").focus();
                    }
                    else {
                        $("#txtTablaOrigen").hide();
                    }
                });

                $("#ddlTabla").change(function () {
                    //Validar Si muestra caja de texto...
                    var vcTabla = $("#ddlTabla").val();
                    if (vcTabla == 'OTRO') {
                        $("#txtTabla").show();
                        $("#txtTabla").focus();
                    }
                    else {
                        $("#txtTabla").hide();
                    }
                });


                inicio();

                function inicio() {


                    if ($("#hdfOpcion").val() != "") {
                        $.ajax({
                            type: "POST",
                            url: "Mnt_Opcion.aspx/Mostrar",
                            data: "{'inCodOpcion': " + $("#hdfOpcion").val() + "}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result) {

                                Opcion = result.d;

                                $("#txtNombre").val(Opcion.vcNom);
                                $("#txtUrl").val(Opcion.vcURL);
                                $("#txtOrden").val(Opcion.inOrd);

                                if (Opcion.inTipOri == 1) {
                                    $("#ddlTipoOrigen").prop('selectedIndex', 2);
                                }
                                else if (Opcion.inTipOri == 0) {
                                    $("#ddlTipoOrigen").prop('selectedIndex', 1);
                                }
                                else {
                                    $("#ddlTipoOrigen").prop('selectedIndex', 0);
                                }

                                ActualizarListaTablas('ddlTipoOrigen', 'ddlTabla', Opcion.vcTab, 'txtTabla');

                                var i = 0;
                                for (i = 0; i < Opcion.Items.length; i++) {
                                    $("#tblItem").jqGrid('addRowData',
                                Opcion.Items[i].P_inCod, Opcion.Items[i]
                              );
                                }
                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });
                    }
                }

                $("#btnAgregarItem").click(function () {
                    AgregarModificarItem(-1, "Agregar Item");
                });

                $("#btnModificarItem").click(function () {
                    var id = $("#tblItem").jqGrid('getGridParam', 'selrow');
                    if (id) {
                        AgregarModificarItem(id, "Modificar Item");
                    }
                    else {
                        alerta("Seleccione un Item");
                    }
                });

                $("#btnEliminarItem").click(function () {
                    var id = $("#tblItem").jqGrid('getGridParam', 'selrow');

                    if (id) {
                        $("#tblItem").jqGrid('delRowData', id);
                    }
                    else {
                        alerta("Seleccione un Item");
                    }
                });

                function AgregarModificarItem(id, titulo) {
                    indexItem = id;
                    if (id == -1) {//Nuevo
                        $(".trNuevo").show();
                        $(".trEditar").hide();
                        $("#txtNombreItem").val("");
                        $("#txtURLItem").val("");
                        $("#txtTablaOrigen").val("");
                        $("#txtOrdenItem").val("1");
                        $("#ddlTipoOrigenItem").prop('selectedIndex', 0);
                        $("#ddlTablaOrigen").html("");
                        $("#txtTablaOrigen").hide();
                    }
                    else {//Editar
                        var datos = $("#tblItem").jqGrid('getRowData', id);
                        var inCodItem = datos.P_inCod;
                        var vcNomItem = datos.vcNom;
                        var vcUrl = datos.vcURL;
                        var inOrden = datos.inOrd;
                        var inTipoOrigen = datos.inTipOri;
                        var vcNombreTabla = datos.vcTab;

                        $("#txtNombreItem").val(vcNomItem);
                        $("#txtURLItem").val(vcUrl);
                        $("#txtOrdenItem").val(inOrden);

                        if (inTipoOrigen == 'Datos') {
                            $("#ddlTipoOrigenItem").prop('selectedIndex', 2);
                        }
                        else if (inTipoOrigen == 'Base') {
                            $("#ddlTipoOrigenItem").prop('selectedIndex', 1);
                        }
                        else {
                            $("#ddlTipoOrigenItem").prop('selectedIndex', 0);
                        }
                        ActualizarListaTablas('ddlTipoOrigenItem', 'ddlTablaOrigen', vcNombreTabla, 'txtTablaOrigen');

                        $("#txtNombreItem").focus();
                        $(".trNuevo").hide();
                        $(".trEditar").show();
                    }

                    $('#divItem').dialog({
                        title: titulo,
                        width: 480,
                        modal: true,
                        resizable: false
                    });
                }

                $("#btnGuardarItem").click(function (event) {
                    var inOrden = $("#txtOrdenItem").val();
                    var vcNomItem = $("#txtNombreItem").val();
                    var vcUrl = $("#txtURLItem").val();
                    var inTipoOrigen = $("#ddlTipoOrigenItem").val();
                    var vcNombreTabla = $("#ddlTablaOrigen option:selected").text();
                    var vcNombreTabla2 = $("#txtTablaOrigen").val();

                    if (vcNomItem == '') {
                        alerta("Ingrese el nombre del item, es un campo obligatorio");
                        $("#txtNombreItem").focus();
                        return;
                    }

                    if (vcNombreTabla == 'OTRO' && vcNombreTabla2 == '') {
                        alerta("Ingrese el dato, es un campo obligatorio");
                        $("#txtTablaOrigen").focus();
                        return;
                    }

                    if (vcNombreTabla == 'OTRO') {
                        vcNombreTabla = vcNombreTabla2;
                    }

                    if (indexItem == -1) {
                        var Filas = $("#tblItem").getGridParam("data");
                        var ExisteItem = false;
                        $(Filas).each(function () {
                            if (inOrden == this.P_inCod) {
                                ExisteItem = true;
                            }
                        });
                        if (ExisteItem) {
                            alerta("Usted ya agrego un este Nro de Orden, ingrese otro");
                            $("#txtOrdenItem").focus();
                            return;
                        }
                        $("#tblItem").jqGrid('addRowData', inOrden, { id: inOrden,
                            'P_inCod': inOrden,
                            'inOrd': inOrden,
                            'vcNom': vcNomItem,
                            'vcURL': vcUrl,
                            'inTipOri': inTipoOrigen,
                            'vcTab': vcNombreTabla
                        });
                    }
                    else {
                        $("#tblItem").jqGrid('setRowData', indexItem, { 'vcNom': vcNomItem, 'vcURL': vcUrl, 'inTipOri': inTipoOrigen, 'vcTab': vcNombreTabla
                        });
                    }

                    $('#divItem').dialog("close");
                });

                $("#btnCerrarItem").click(function (event) {
                    $('#divItem').dialog("close");
                });

                $("#btnEliminarOpcion").click(function () {
                    window.parent.tbDetalle.tabs("remove", window.parent.tbDetalle.tabs("option", "selected"));
                });

                $("#txtNombre").blur(function () {
                    var ind = window.parent.tbDetalle.tabs("option", "selected");
                    if ($("#txtNombre").val() != "") {
                        $(window.parent.$('#tbDetalle > ul a')[ind]).text($("#txtNombre").val());
                    }
                    else if ($("#hdfOpcion").val() != "") {
                        $(window.parent.$('#tbDetalle > ul a')[ind]).text("Opcion");
                    }
                    else {
                        $(window.parent.$('#tbDetalle > ul a')[ind]).text("Nueva Opcion");
                    }
                });

            });