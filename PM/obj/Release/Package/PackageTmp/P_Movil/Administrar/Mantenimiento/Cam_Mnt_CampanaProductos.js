var esAdd;
var MargenFiltro = 0;
var MargenHeight = 48;
var editPrecio = false;
var addPrecio = false;
var Selecciono;
var oCulturaUsuario;
var FormatoFechaCulturaForDatePicker = "";
var SimDec = ".";
var SimMil = ",";
var NumDec = "2";
var IdProd2;
function inicioPagina() {
    DimPosElementos();
}

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();

    $("#tblProductos").setGridWidth(Ancho - 182);
    $("#tblProductos").setGridHeight(Alto - 140);
//    var AnchoLateral = $(".LateralSplitter");
//    $(".tabs").css({ height: Alto - 25, width: Ancho - AnchoLateral, marginbotton: 0, paddingbotton: 0 });

//    $(".Splitter").css({ height: Alto - 18 });

//    if ($(window).width() < 480) {
//        $("#tblProductos").setGridWidth(550);
//    } else {
//        $("#tblProductos").setGridWidth($(window).width() - 170);
//    }

//    if ($(window).height() < 600 && $(window).height() > 400) {
//        $("#tblProductos").setGridHeight(($(window).height() - 50) / 2);
//    } else if ($(window).height() < 400) {
//        $("#tblProductos").setGridHeight(200);
//    } else {
//        $("#tblProductos").setGridHeight(300);
//    }
}
$(function () {
    oCulturaUsuario = window.parent.parent.parent.oCulturaUsuario;
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

    $("input:checkbox,input:radio,input:file").uniform();
    combokendoFormar("#ddlCampanaActiva", 200);
    combokendoFormar("#ddlBusquedaProd", 200);
    combokendoFormar("#ddlTipoProducto", 200);
    combokendoFormar("#ddlMesesContrato", 200);

    $("#txtBusquedaProducto").keypress(ValidarAlfaNumericoConEspacios);
    $("#txtNombreProd").keypress(ValidarAlfaNumericoConEspacios);

    ValidarNumeroEnCajaTexto("txtPrecioProducto", ValidarDecimalPositivo);
    ValidarNumeroEnCajaTexto("txtCantidadTotal", ValidarEnteroPositivo);
    //ValidarNumeroEnCajaTexto("txtPrecioContrato", ValidarDecimalPositivo);
    ValidarNumeroEnCajaTexto("txtPrecioContrato", ValidarDecimalPositivo, oCulturaUsuario);

    var oColModelProductos = [
		        { name: 'rowId', label: 'rowId', width: 80, fixed: true, sortable: false, resize: false, hidden: true },
		        { name: 'IdCampana', label: 'IdCampana', width: 80, sortable: false, resize: false, hidden: true },
   		        { name: 'IdTipoProducto', label: 'IdTipoProducto', index: 'id', width: 80, hidden: true },
   		        { name: 'TipoProducto', label: 'Tipo Producto', index: 'id', width: 80 },
   		        { name: 'IdProducto', label: 'IdProducto', index: 'invdate', width: 170, hidden: true },
   		        { name: 'Producto', label: 'Producto', index: 'invdate', width: 330 },
   		        { name: 'Precio', label: 'Precio', index: 'name', width: 90, align: 'right', formatter: 'currency', formatoptions: { decimalSeparator: oCulturaUsuario.vcSimDec, thousandsSeparator: oCulturaUsuario.vcSimSepMil, decimalPlaces: oCulturaUsuario.dcNumDec} },
   		        { name: 'CantidadTotal', label: 'Cantidad Total', index: 'name', width: 75, align: 'right' },
   		        { name: 'CantidadUsada', label: 'Cantidad Usada', index: 'name', width: 75, align: 'right' },
   		        { name: 'CantidadDisponible', label: 'Cantidad Disponible', index: 'name', width: 75, align: 'right' },
   		        { name: 'Reservable', label: 'Reservable', index: 'name', width: 70, align: 'center', formatter: function (value) { if (value == 'True') { return 'SI'; } else { return 'NO'; } } }
   	        ];
    var oColModelEntidad = [
                { name: 'P_inCod', label: 'Código', width: 70 },
                { name: 'vcDes', label: 'Nombre Producto', width: 313 }
            ];
    var oColModelPrecio = [
                { name: 'rowId', label: 'rowId', hidden: true },
                { name: 'IdProd2', label: 'IdProd2', hidden: true },
                { name: 'vcNomPla', label: 'Plan', width: 260 },
                { name: 'MesesContrato', label: 'Meses', width: 80, align: 'center' },
    //{ name: 'Precio', label: 'Precio', width: 80, align: 'right' }
                {name: 'Precio', label: 'Precio', width: 80, align: 'right', formatter: 'currency', formatoptions: { decimalSeparator: oCulturaUsuario.vcSimDec, thousandsSeparator: oCulturaUsuario.vcSimSepMil, decimalPlaces: oCulturaUsuario.dcNumDec} }
            ];

    var AnchoGrilla = $(window).width() - 140;


    var tblProductos = JQGrid("#tblProductos", "#pagerProductos", CargarCampanaProductos, oColModelProductos, AnchoGrilla, 295, "rowId", true, fnDblClickProd, fnSelectProd);
    var tblEntidad = JQGrid("#tblEntidad", "#pagerEntidad", CargarProductoEntidad, oColModelEntidad, 470, 140, "P_inCod", true, fnDblClickTipoProd, fnSelectTipoProd); //JHERRERA 20140604
    //var tblEntidad = JQGrid("#tblEntidad", "#pagerEntidad", CargarProductoEntidad, oColModelEntidad, 470, 230, "P_inCod", true, fnDblClickTipoProd, fnSelectTipoProd);
    var tblPrecios = JQGrid("#tbPrecios", "", "local", oColModelPrecio, 500, 140, "rowId", false, fnDblClickPrecio, fnSelectPrecio);

    $("#pagerEntidad_left").css("width", "80px");

    //    $(window).resize(function () {
    //        var AnchoGrilla = $(window).width() - 140;
    //        $("#gbox_tblProductos").width(AnchoGrilla);
    //    });

    inicioPagina();
    $(window).resize(function () {
        DimPosElementos();
    });

    $("#ddlCampanaActiva").change(function () {
        var IdCampana = $("#ddlCampanaActiva").data("kendoComboBox").value();
        limpiarValoresFiltro();
        CargarCampanaProductos();
        estReservable();
    });

    $("#ddlTipoProducto").change(function () {
        CargarProductoEntidad();
    });

    //FILTRO PRODUCTO
    $("#txtBusquedaProducto").focus(function () {
        if ($(this).hasClass("txtBusqueda")) {
            $(this).removeClass("txtBusqueda");
            $(this).val("");
        }
    });
    $("#txtBusquedaProducto").keyup(function () {
        setTimeout(CargarCampanaProductos(), 1500);
    });
    $("#txtBusquedaProducto").focusout(function () {
        if (!$(this).hasClass("txtBusqueda") && $(this).val() == '') {
            $(this).addClass("txtBusqueda");
            $(this).val("Valor a filtrar");
        }
    });

    //FILTRO NOMBRE
    $("#txtNombreProd").focus(function () {
        if ($(this).hasClass("txtBusqueda")) {
            $(this).removeClass("txtBusqueda");
            $(this).val("");
        }
    });
    $("#txtNombreProd").keyup(function () {
        setTimeout(CargarProductoEntidad(), 1500);
    });
    $("#txtNombreProd").focusout(function () {
        if (!$(this).hasClass("txtBusqueda") && $(this).val() == '') {
            $(this).addClass("txtBusqueda");
            $(this).val("Valor a filtrar");
        }
    });

    //ACCIONES
    $("#btnAgregarProductos").click(function () {
        var IdCampana = $("#ddlCampanaActiva").data("kendoComboBox").value();
        if (IdCampana != "-1") {
            limpiarDialogAgregar();
            esAdd = true;
            $("#trTipoProd").hide();
            $("#trProducto").hide();
            $("#trTipoProducto").show();
            $("#trEntidad").show();
            MetodoWeb("Cam_Mnt_CampanaProductos.aspx/ListarTiposProducto", JSON.stringify({}), CargarTipoProducto, null);
        } else {
            alerta("Seleccione una Campaña");
        }
    });

    $("#btnGrabarProd").click(function () {
        var IdCamp = $("#ddlCampanaActiva").data("kendoComboBox").value();
        var IdTipProd;
        var IdProd;
        var CantidadUsada = "";
        if (esAdd) {
            IdTipProd = $("#ddlTipoProducto").data("kendoComboBox").value();
            var EntidadProdSel = $("#tblEntidad").jqGrid('getGridParam', 'selarrrow');
            IdProd = EntidadProdSel.join(",");
        } else {
            IdTipProd = $("#hdfTipProdSelect").val();
            IdProd = $("#hdfProdSelect").val();
            CantidadUsada = $("#hdCantidadUsadaSelect").val();
        }
        var Prec = $("#txtPrecioProducto").val();
        var Cant = $("#txtCantidadTotal").val();
        var Reserv = $("#chkReservable").is(":checked");
        if (IdTipProd == '-1') {
            alerta("Seleccione un tipo de producto");
            return;
        }

        if (IdProd == '') {
            alerta("Seleccione al menos un producto");
            return;
        }
        if (Prec == '') {
            alerta("Ingrese el Precio de los productos seleccionados");
            return;
        }
        if (Cant == '') {
            alerta("Ingrese la Cantidad Total para los productos seleccionados");
            return;
        }

        if (esAdd) {
            //alerta("ADD -> " + IdCamp + ", " + IdTipProd + ", " + IdProd + ", " + Prec + ", " + Cant + ", " + Reserv);
            MetodoWeb("Cam_Mnt_CampanaProductos.aspx/AgregarCampanaProducto", JSON.stringify({ IdCamp: IdCamp, IdTipProd: IdTipProd, IdProd: IdProd, Prec: Prec, Cant: Cant, Reserv: Reserv, esAdd: esAdd }), ResultAgregarProd, null);
        } else {
            //alerta("EDIT -> " + IdCamp + ", " + IdTipProd + ", " + IdProd + ", " + Prec + ", " + Cant + ", " + Reserv);

            if (parseInt(CantidadUsada) > Cant) {
                alerta("La Cantidad Total debe ser mayor que la Cantidad Usada");
                return;
            }

            MetodoWeb("Cam_Mnt_CampanaProductos.aspx/AgregarCampanaProducto", JSON.stringify({ IdCamp: IdCamp, IdTipProd: IdTipProd, IdProd: IdProd, Prec: Prec, Cant: Cant, Reserv: Reserv, esAdd: esAdd }), ResultEditarProd, null);
        }
    });

    $("#btnCerrarDialog").click(function () {
        $("#divAgregarProductos").dialog("close");
        //limpiarDialogAgregar();
    });
    $("#btnEditarProductos").click(function () {
        var IdCampana = $("#ddlCampanaActiva").data("kendoComboBox").value();
        if (IdCampana == "-1") {
            alerta("Seleccione una Campaña");
            return;
        }
        var IdCampProducto = $("#tblProductos").jqGrid('getGridParam', 'selarrrow');
        if (IdCampProducto.length != 0) {
            if (IdCampProducto.length == 1) {
                esAdd = false;
                $("#trTipoProd").show();
                $("#trProducto").show();
                $("#trTipoProducto").hide();
                $("#trEntidad").hide();
                var datosProducto = $("#tblProductos").jqGrid('getRowData', IdCampProducto[0]);

                     $("#txtTipoProdSelect").val(datosProducto.TipoProducto);
                    $("#hdfTipProdSelect").val(datosProducto.IdTipoProducto);
                    $("#txtProdSelect").val($.trim(datosProducto.Producto));
                    $("#hdfProdSelect").val(datosProducto.IdProducto);
                    $("#hdCantidadUsadaSelect").val(datosProducto.CantidadUsada);
                    $("#txtPrecioProducto").val(datosProducto.Precio);
                    $("#txtCantidadTotal").val(datosProducto.CantidadTotal);
                    if (datosProducto.Reservable == 'SI') {
                        $("#chkReservable").attr("checked", true);
                        $.uniform.update();
                    } else {
                        $("#chkReservable").attr("checked", false);
                        $.uniform.update();
                    }
                    $("#divAgregarProductos").dialog({
                        title: "Editar Producto",
                        width: 430,
                        height: 230,
                        modal: true,
                        resizable: false
                    });

            } else {
                alerta("Seleccione solo un Producto para editar");
            }
        } else {
            alerta("Seleccione un Producto");
        }
    });
    $("#btnQuitarProductos").click(function () {
        if ($("#ddlCampanaActiva").data("kendoComboBox").value() == "-1") {
            alerta("Seleccione una Campaña");
            return;
        }
        var arIdProdSelect = $("#tblProductos").jqGrid('getGridParam', 'selarrrow');
        if (arIdProdSelect.length != 0) {
            IdCampProd = arIdProdSelect.join(',');
            $('#divMsgConfirmacionFinanciamiento').dialog({
                title: "Remover Productos",
                modal: true,
                buttons: {
                    "Si": function () {
                        MetodoWeb("Cam_Mnt_CampanaProductos.aspx/EliminarCampanaProducto", JSON.stringify({ IdCampProd: IdCampProd }), ResultEliminarProd, null);
                        $(this).dialog("close");
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                },
                resizable: false
            });
        } else {
            alerta("Seleccione al menos un producto");
        }
    });
    $("#btnMostrarPrecios").click(function () {

        var IdCampana = $("#ddlCampanaActiva").data("kendoComboBox").value();
        if (IdCampana == "-1") {
            alerta("Seleccione una Campaña");
            return;
        }
        var IdCampProducto = $("#tblProductos").jqGrid('getGridParam', 'selarrrow');
        if (IdCampProducto.length != 0) {
            if (IdCampProducto.length == 1) {
                var datosProducto = $("#tblProductos").jqGrid('getRowData', IdCampProducto[0]);

                if (datosProducto.IdTipoProducto == "1") {
                    var idProd = datosProducto.IdProducto;
                    $("#lblProducto").html(datosProducto.Producto);
                    $("#hdfIdProducto").val(datosProducto.IdProducto);
                    //aqui
                    MetodoWeb("Cam_Mnt_CampanaProductos.aspx/ListarPrecios_x_Producto", JSON.stringify({ IdCamp: IdCampana, IdProd1: idProd }), ResultMostrarPrecios, null);
                } else {
                   alerta("Seleccionar solo equipos.");
                }

            } else {
                alerta("Seleccione sólo un Producto");
            }
        } else {
            alerta("Seleccione un Producto");
        }
    });
    //ACCIONES MOSTRAR PRECIOS
    $("#btnAgregarPrecioProducto").click(function () {
        addPrecio = true;

        $("#trGrillaPrecios").hide();
        $("#trEspacioBotones").css("height", "79px");

        $("#trPlanProducto").show();
        $("#trMesesContrato").show();
        $("#trPrecioContrato").show();
        $("#btnQuitarPrecioProducto").hide();
        $("#btnAgregarPrecioProducto").hide();
        $("#btnEditarPreciosProducto").hide();
        $("#btnGuardarPreciosProducto").show();
        $("#btnCancelarEdicionPrecios").show();
        $("#btnSalirPreciosProducto").hide();
    });
    $("#btnEditarPreciosProducto").click(function () {
        var idPrec = $("#tbPrecios").jqGrid('getGridParam', 'selrow');
        var datosPrecios = $("#tbPrecios").jqGrid('getRowData', idPrec);
        IdProd2 = datosPrecios.IdProd2;
        if (idPrec == null) {
            alerta("Seleccione un registro");
            return;
        }
        fnSelectPrecio(idPrec);
        editPrecio = true;

        $("#trGrillaPrecios").hide();
        $("#trEspacioBotones").css("height", "109px");

        $("#trPlanProducto").show();
        $("#trMesesContrato").show();
        $("#trPrecioContrato").show();
        $("#btnQuitarPrecioProducto").hide();
        $("#btnAgregarPrecioProducto").hide();
        $("#btnEditarPreciosProducto").hide();
        $("#btnGuardarPreciosProducto").show();
        $("#btnCancelarEdicionPrecios").show();
        $("#btnSalirPreciosProducto").hide();
    });
    $("#btnGuardarPreciosProducto").click(function () {
        //$("#txtPrecioContrato").val(FormatoNumero($("#txtPrecioContrato").val(), oCulturaUsuario));
        var IdCampana = $("#ddlCampanaActiva").data("kendoComboBox").value();
        var IdProducto1 = $("#hdfIdProducto").val();
        var Meses = $("#hdfMeses").val();
        var MesesN = $("#ddlMesesContrato").data("kendoComboBox").value();
        var PrecioN = $("#txtPrecioContrato").val().replace(SimMil.toString(), "");
        var IdPlanEquivalente = "-1";
        var idPlan = IdProd2;

        if ($("#chkTieneEquivalente").is(":checked") && $("#hdfPlanEquivalente").val() == "") {
            alerta("Ingrese el plan equivalente");
            return;
        }
        if ($("#chkTieneEquivalente").is(":checked") && $("#hdfPlanEquivalente").val() != "") {
            IdPlanEquivalente = $("#hdfPlanEquivalente").val();
        }
        if (MesesN == -1) {
            alerta("Seleccione el número de meses de contrato");
            return;
        }
        if (PrecioN == '') {
            alerta("Ingrese un precio");
            return;
        }

        if (editPrecio) {
            //alerta("IdCamp: " + IdCampana + "\nIdProd1: " + IdProducto1 + "\nMeses: " + Meses + "\nMesesN: " + MesesN + "\nPrecioN: " + PrecioN);
            MetodoWeb("Cam_Mnt_CampanaProductos.aspx/EditarProductoPrecio", JSON.stringify({ IdCamp: IdCampana, IdProd1: IdProducto1, Meses: Meses, MesesN: MesesN, PrecioN: PrecioN, IdPlanEquivalente: IdPlanEquivalente, IdPlan: idPlan }), ResultEditarPrecioProducto, null);
            //editPrecio = false;
        } else if (addPrecio) { //agregar
            var IdProducto2 = $("#hdfPlanProducto").val();
            if (IdProducto2 == '') {
                alerta("Ingrese un plan para el período");
                return;
            }
            //alerta("IdCamp: " + IdCampana + "\nIdProd1: " + IdProducto1 + "\nIdProd2: " + IdProducto2 + "\nMesesN: " + MesesN + "\nPrecioN: " + PrecioN);
            MetodoWeb("Cam_Mnt_CampanaProductos.aspx/AgregarProductoPrecio", JSON.stringify({ IdCamp: IdCampana, IdProd1: IdProducto1, IdProd2: IdProducto2, Meses: MesesN, Precio: PrecioN, IdPlanEquivalente: IdPlanEquivalente }), ResultAgregarPrecioProducto, null);
            //addPrecio = false;
        }
    });
    $("#btnCancelarEdicionPrecios").click(function () {
        editPrecio = false;
        addPrecio = false;
        $("#trGrillaPrecios").show();
        $("#trEspacioBotones").css("height", "2px");

        $("#trPlanProducto").hide();
        $("#txtPlanProducto").val('');
        $("#hdfPlanProducto").val('');
        $("#trMesesContrato").hide();
        $("#ddlMesesContrato").data("kendoComboBox").value(-1);
        $("#trPrecioContrato").hide();
        $("#txtPrecioContrato").val('');
        $("#btnQuitarPrecioProducto").show();
        $("#btnAgregarPrecioProducto").show();
        $("#btnEditarPreciosProducto").show();
        $("#btnGuardarPreciosProducto").hide();
        $("#btnCancelarEdicionPrecios").hide();
        $("#btnSalirPreciosProducto").show();

        $("#trTieneEquivalente").hide();
        $("#trPlanEquivalente").hide();
    });
    $("#btnSalirPreciosProducto").click(function () {
        editPrecio = false;
        addPrecio = false;
        $('#divPrecios').dialog('close');
    });
    $("#btnQuitarPrecioProducto").click(function () {
        var idPrec = $("#tbPrecios").jqGrid('getGridParam', 'selrow');
        if (idPrec == null) {
            alerta("Seleccione un registro");
            return;
        }
        var IdCamp = $("#ddlCampanaActiva").data("kendoComboBox").value();
        var IdProd1 = $("#hdfIdProducto").val();
        //        var IdProd2 = $("#hdfPlanProducto").val();
        var IdProd2 = $("#tbPrecios").jqGrid('getRowData', $("#tbPrecios").jqGrid('getGridParam', 'selrow')).IdProd2;
        var Meses = $("#hdfMeses").val();
        //alerta("IdCamp: " + IdCamp+ "\nIdProd1: " + IdProd1 + "\nIdProd2: " + IdProd2 + "\nMesesN: " + Meses);
        $('#divMsgEliminarProductoPrecio').dialog({
            title: "Remover Productos Precio por Período",
            modal: true,
            buttons: {
                "Si": function () {
                    MetodoWeb("Cam_Mnt_CampanaProductos.aspx/EliminarProductoPrecio", JSON.stringify({ IdCamp: IdCamp, IdProd1: IdProd1, IdProd2: IdProd2, Meses: Meses }), ResultEliminarProdPrec, null);
                    $(this).dialog("close");
                },
                "Cancelar": function () {
                    $(this).dialog("close");
                }
            },
            resizable: false
        });
    });

    //AUTOCOMPLETAR
    if ($("#txtPlanProducto").length > 0) {
        $("#txtPlanProducto").autocomplete({
            minLength: 0,
            source: function (request, response) {
                $.ajax({
                    type: "POST",
                    url: "Cam_Mnt_CampanaProductos.aspx/ListarPlanes_Autocomplete",
                    data: "{'IdTip': '2'," +
                           "'IdCam': '" + $("#ddlCampanaActiva").data("kendoComboBox").value() + "'," +
                           "'vcFiltro': '" + $("#txtPlanProducto").val() + "'," +
                           "'biEsRenovacion': '" + $("#chkEsRenovacion").is(":checked") + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        response($.map(result.d, function (item) {
                            return {
                                label: $.trim(item.vcNom),
                                vcCod: $.trim(item.P_inCod)
                            };
                        }));
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },
            focus: function (event, ui) {
                $("#txtPlanProducto").val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                Selecciono = true;
                $("#txtPlanProducto").val(ui.item.label);
                $("#hdfPlanProducto").val(ui.item.vcCod);
                return false;
            },
            change: function (event, ui) {
                if (!Selecciono) {
                    $("#txtPlanProducto").val("");
                    $("#hdfPlanProducto").val('');
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
			    .append("<a>" + item.label + "</a>")
			    .appendTo(ul);
        };
    }
    //AUTOCOMPLETAR
    if ($("#txtPlanEquivalente").length > 0) {
        $("#txtPlanEquivalente").autocomplete({
            minLength: 0,
            source: function (request, response) {
                $.ajax({
                    type: "POST",
                    url: "Cam_Mnt_CampanaProductos.aspx/ListarPlanesTodos_Autocomplete",
                    data: "{'IdTip': '2'," +
                           "'IdCam': '" + $("#ddlCampanaActiva").data("kendoComboBox").value() + "'," +
                           "'vcFiltro': '" + $("#txtPlanEquivalente").val() + "'," +
                           "'IdPlanElegido': '" + $("#hdfPlanProducto").val() + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        response($.map(result.d, function (item) {
                            return {
                                label: $.trim(item.vcNom),
                                vcCod: $.trim(item.P_inCod)
                            };
                        }));
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },
            focus: function (event, ui) {
                $("#txtPlanEquivalente").val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                Selecciono = true;
                $("#txtPlanEquivalente").val(ui.item.label);
                $("#hdfPlanEquivalente").val(ui.item.vcCod);
                return false;
            },
            change: function (event, ui) {
                if (!Selecciono) {
                    $("#txtPlanEquivalente").val("");
                    $("#hdfPlanEquivalente").val('');
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
			    .append("<a>" + item.label + "</a>")
			    .appendTo(ul);
        };
    }


    $("#chkEsRenovacion").change(function () {
        if ($("#chkEsRenovacion").is(":checked")) {
            $("#trTieneEquivalente").show();
        } else {
            $("#trTieneEquivalente").hide();
        }
        $("#txtPlanProducto").val("");
        $("#hdfPlanProducto").val("");
        $("#chkTieneEquivalente").attr("checked", false);
        $.uniform.update();
        $("#trPlanEquivalente").hide();
        $("#txtPlanEquivalente").val("");
        $("#hdfPlanEquivalente").val("");
    });

    $("#chkTieneEquivalente").change(function () {
        if ($("#chkTieneEquivalente").is(":checked")) {
            $("#trPlanEquivalente").show();
        } else {
            $("#trPlanEquivalente").hide();
        }
        $("#txtPlanEquivalente").val("");
        $("#hdfPlanEquivalente").val("");
    });
});

//FUNCIONES CARGA
function CargarCampanaProductos() {
    var IdCampana = $("#ddlCampanaActiva").data("kendoComboBox").value();
    var vcCampoFiltro = $("#ddlBusquedaProd").data("kendoComboBox").value();
    var vcValorFiltro = $("#txtBusquedaProducto").val();
    var inPagTam = $("#tblProductos").getGridParam("rowNum");
    var inPagAct = $("#tblProductos").getGridParam("page");

    if ($("#txtBusquedaProducto").hasClass("txtBusqueda")) {
        vcValorFiltro = '';
    }
    if (IdCampana != "-1") {
        MetodoWeb("Cam_Mnt_CampanaProductos.aspx/ListarProductos", JSON.stringify({ 'IdCampana': IdCampana, 'vcCampoFiltro': vcCampoFiltro, 'vcValorFiltro': vcValorFiltro, 'inPagTam': inPagTam, 'inPagAct': parseInt(inPagAct) }), ResultCargarProductos, null);
    } else {
        $("#tblProductos").jqGrid('clearGridData');
    }
}

function CargarProductoEntidad() {
    var IdCampana = $("#ddlCampanaActiva").data("kendoComboBox").value();
    var IdTipoProd = ($("#ddlTipoProducto").data("kendoComboBox").value() == undefined ? "-1" : $("#ddlTipoProducto").data("kendoComboBox").value());
    var vcFiltro = $("#txtNombreProd").val();
    var inPagTam = $("#tblEntidad").getGridParam("rowNum");
    var inPagAct = $("#tblEntidad").getGridParam("page");

    var vcOrdCol = $('#tblEntidad').getGridParam("sortname");
    var vcTipOrdCol = $('#tblEntidad').getGridParam("sortorder");
    
    if ($("#txtNombreProd").hasClass("txtBusqueda")) {
        vcFiltro = '';
    }
    if (IdTipoProd != '-1' && IdCampana != '-1') {
        MetodoWeb("Cam_Mnt_CampanaProductos.aspx/ListarProducto_x_Tipo", JSON.stringify({ IdTip: IdTipoProd, IdCam: IdCampana, vcFiltro: vcFiltro, inPagTam: inPagTam, inPagAct: inPagAct, vcOrdCol: vcOrdCol, vcTipOrdCol: vcTipOrdCol }), ResultCargarEntidadProducto, null);
    } else {
        $("#tblEntidad").jqGrid('clearGridData');
    }
}

//FUNCIONES RESULT
function ResultCargarProductos(lstProductos) {
    $("#tblProductos").jqGrid('clearGridData');
    if ($(lstProductos).length > 0) {
        $("#tblProductos")[0].addJSONData(lstProductos);
        //return lstProductos;
    } else {
        alerta("No hay datos");
    }
}

function ResultCargarEntidadProducto(lstEntidadProducto) {
    $("#tblEntidad").jqGrid('clearGridData');
    if ($(lstEntidadProducto).length > 0) {
        $("#tblEntidad")[0].addJSONData(lstEntidadProducto);
    } else {
        //alerta("No hay datos");
    }
}
function CargarTipoProducto(lstTipoProducto) {
    if ($(lstTipoProducto).length > 0) {
        var items = [];
        items.push({ text: '--Seleccione--', value: '-1' });
        var i = 0;
        for (i = 0; i < $(lstTipoProducto).length; i++) {
            items.push({ text: lstTipoProducto[i].Descripcion, value: lstTipoProducto[i].IdTipoProducto });
        }
        var comboTipoProductoDataSource = new kendo.data.DataSource({ data: items });
        $("#ddlTipoProducto").data("kendoComboBox").setDataSource(comboTipoProductoDataSource);
        $("#ddlTipoProducto").data("kendoComboBox").select(0);

        $("#divAgregarProductos").dialog({
            title: "Agregar Producto",
            width: 520,
            height: 390,//400
            modal: true,
            resizable: false
        });
    } else {
        alerta("No hay datos disponibles");
    }
}

function ResultEstReservable(resultado) {
    if (resultado) {
        $("#trReservable").show();
    } else {
        $("#trReservable").hide();
    }
}

function ResultAgregarProd(lstResult) {
    //alert(lstResult.length);
    if (lstResult.length == "0") {
        alerta("Productos grabados con éxito");
        limpiarDialogAgregar();
        CargarCampanaProductos();
    } else {
        var prodExist = [];
        var idProdExist = [];
        var i = 0;
        for (i = 0; i < lstResult.length; i++) {
            var id = lstResult[i];
            var datos = $("#tblEntidad").jqGrid('getRowData', id);
            prodExist.push(datos.vcDes);
            idProdExist.push(datos.P_inCod);
        }
        if (prodExist.length != 0) {
            $("#lblMsg1").text('Productos');
            $("#lblMsg2").text('Productos');
            $("#divExistentes").html('');
            var f = 0;
            for (f = 0; f < prodExist.length; f++) {
                $("#divExistentes").append('<li>' + prodExist[f] + '</li>');
            }
            $('#divMsgConfirmInsertarExistente').dialog({
                title: "Remplazar valores a Grupo Empleado",
                modal: true,
                width: 350,
                buttons: {
                    "Si": function () {
                        //alerta("reemplazar valores");
                        esAdd = false;
                        var IdCamp = $("#ddlCampanaActiva").data("kendoComboBox").value();
                        var IdTipProd = $("#ddlTipoProducto").data("kendoComboBox").value();
                        var IdProd = idProdExist.join(',');
                        var Prec = $("#txtPrecioProducto").val();
                        var Cant = $("#txtCantidadTotal").val();
                        var Reserv = false;
                        if ($("#chkReservable").is(":checked")) {
                            Reserv = true;
                        }
                        MetodoWeb("Cam_Mnt_CampanaProductos.aspx/AgregarCampanaProducto", JSON.stringify({ IdCamp: IdCamp, IdTipProd: IdTipProd, IdProd: IdProd, Prec: Prec, Cant: Cant, Reserv: Reserv, esAdd: esAdd }), ResultEditarProd, null);
                        $(this).dialog("close");
                        esAdd = true;
                    },
                    "No": function () {
                        $(this).dialog("close");
                    }
                },
                resizable: false
            });
        }
    }
}

function ResultEditarProd(lstResult) {
    if (lstResult.length == "0") {
        alerta("Productos editados con éxito");
        limpiarDialogAgregar();
        CargarCampanaProductos();
        $("#divAgregarProductos").dialog("close");
    } else {
        alerta("Error al actualizar el Producto");
    }
}

function ResultEliminarProd(lstResult) {
    var vMensajeEliminarProd = '', Correctos = lstResult[0], NoExisten = lstResult[1], EnPedido = lstResult[2];
    if (Correctos != '0') {
        CargarCampanaProductos();
        if (Correctos == '1')
            vMensajeEliminarProd = vMensajeEliminarProd + Correctos + ' producto eliminado con éxito.';
        else
            vMensajeEliminarProd = vMensajeEliminarProd + Correctos + ' productos eliminados con éxito.';
    }
    if (NoExisten != '0') {
        if (NoExisten == '1')
            vMensajeEliminarProd = vMensajeEliminarProd + NoExisten + ' producto ya elminado.';
        else
            vMensajeEliminarProd = vMensajeEliminarProd + NoExisten + ' productos ya elminados.';
    }
    if (EnPedido != '0') {
        if (EnPedido == '1')
            vMensajeEliminarProd = vMensajeEliminarProd + EnPedido + ' producto no ha sido eliminado porque ya está siendo usado en pedidos.';
        else
            vMensajeEliminarProd = vMensajeEliminarProd + EnPedido + ' productos no han sido eliminados porque ya están siendo usados en pedidos.';
    }
    alerta(vMensajeEliminarProd);
}

function ResultMostrarPrecios(lstPrecios) {
    $("#tbPrecios").jqGrid('clearGridData');
    if (lstPrecios.length != "0") {
        //$("#lblProducto").text(lstPrecios[0].vcNomModDip);
        var i = 0;
        for (i = 0; i < $(lstPrecios).length; i++) {
            var idq = $.jgrid.randId(); //genera un numero aleatrio unico
            $("#tbPrecios").jqGrid('addRowData', idq, { IdProd2: lstPrecios[i].IdProducto2, vcNomPla: lstPrecios[i].vcNomPla, MesesContrato: lstPrecios[i].MesesContrato, Precio: lstPrecios[i].Precio });
        }
    } else {
        //alerta("No tiene detallado ningún precio por período");
    }
    $("#trPlanProducto").hide();
    $("#trMesesContrato").hide();
    $("#trPrecioContrato").hide();
    $("#btnGuardarPreciosProducto").hide();
    $("#btnCancelarEdicionPrecios").hide();
    $('#divPrecios').dialog({
        title: "Precios",
        modal: true,
        width: 540,
        height: 284,
        resizable: false
    });
    $("#btnCancelarEdicionPrecios").click();
}

function ResultEditarPrecioProducto(resultEditPrecProd) {
    var IdCampana = $("#ddlCampanaActiva").data("kendoComboBox").value();
    var IdProducto1 = $("#hdfIdProducto").val();
    if (resultEditPrecProd == 1) {
        //$("#tbPrecios").trigger("reloadGrid");
        MetodoWeb("Cam_Mnt_CampanaProductos.aspx/ListarPrecios_x_Producto", JSON.stringify({ IdCamp: IdCampana, IdProd1: IdProducto1 }), ResultMostrarPrecios, null);
        alerta("Producto Precio editado con éxito");
        $("#btnCancelarEdicionPrecios").click();
    } else {
        alerta("Ya existe un precio para este número de Meses de Contrato");
    }
}

function ResultAgregarPrecioProducto(resultAgregarPrecProd) {
    var IdCampana = $("#ddlCampanaActiva").data("kendoComboBox").value();
    var IdProducto1 = $("#hdfIdProducto").val();
    if (resultAgregarPrecProd == 1) {
        MetodoWeb("Cam_Mnt_CampanaProductos.aspx/ListarPrecios_x_Producto", JSON.stringify({ IdCamp: IdCampana, IdProd1: IdProducto1 }), ResultMostrarPrecios, null);
        alerta("Producto Precio agregado con éxito");
        $("#btnCancelarEdicionPrecios").click();
    } else {
        alerta("Ya existe un precio para el número de Meses de Contrato y Plan seleccionado");        
    }
}

function ResultEliminarProdPrec(resultEliminarPrecProd) {
    var IdCampana = $("#ddlCampanaActiva").data("kendoComboBox").value();
    var IdProducto1 = $("#hdfIdProducto").val();
    if (resultEliminarPrecProd == 1) {
        MetodoWeb("Cam_Mnt_CampanaProductos.aspx/ListarPrecios_x_Producto", JSON.stringify({ IdCamp: IdCampana, IdProd1: IdProducto1 }), ResultMostrarPrecios, null);
        alerta("Producto Precio eliminado con Exito");
        $("#btnCancelarEdicionPrecios").click();
    } else {
        alerta("El registro no existe en la base de datos");
    }
}

//FUNCIONES LIMPIAR
function limpiarValoresFiltro() {
    if ($("#txtBusquedaProducto").val() != '') {
        $("#txtBusquedaProducto").addClass("txtBusqueda");
        $("#txtBusquedaProducto").val("Valor a filtrar");
    }
}

function limpiarDialogAgregar() {
    $("#ddlTipoProducto").data("kendoComboBox").value(-1);
    $("#txtNombreProd").val('');
    $("#txtNombreProd").addClass("txtBusqueda");
    $("#txtNombreProd").val("Valor a filtrar");
    $("#tblEntidad").jqGrid('clearGridData');
    $("#txtPrecioProducto").val('');
    $("#txtCantidadTotal").val('');
    $("#chkReservable").attr("checked", false);
    $.uniform.update();
}

//OTRAS FUNCIONES
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

function fnDblClickProd(id) {
    //alerta("Editar " + id);
    $("#btnEditarProductos").click();
}
function fnSelectProd(id) {
    var arId = $("#tblProductos").jqGrid('getGridParam', 'selarrrow');
    //alert(arId);
    if (arId.length == 1) {
        var dataProducto = $("#tblProductos").jqGrid('getRowData', arId[0]);
        $("#lblProducto").text(dataProducto.Producto);
        //alert(dataProducto.IdTipoProducto);
        if (dataProducto.IdTipoProducto == "2") {
            $("#btnMostrarPrecios").button("option", "disabled", true);
        } else {
            $("#btnMostrarPrecios").button("option", "disabled", false);
        }
    }
}
function fnDblClickTipoProd(id) {
}
function fnSelectTipoProd(id) {
    //alert(id);
}
function fnSelectPrecio(id) {

    var datosPrecio = $("#tbPrecios").jqGrid('getRowData', id);
    //if (editPrecio) {
    //    alerta("No ha concluido correctamente la edición del registro");
    //}
    if (addPrecio) {
        return;
    }
    $("#hdfPlanProducto").val(datosPrecio.IdProd2);
    $("#ddlMesesContrato").data("kendoComboBox").value(datosPrecio.MesesContrato);
    $("#hdfMeses").val(datosPrecio.MesesContrato);
    $("#txtPrecioContrato").val(datosPrecio.Precio);
}
function fnDblClickPrecio(id) {
    $("#btnEditarPreciosProducto").click();
}

function estReservable() {
    var IdCampana = $("#ddlCampanaActiva").data("kendoComboBox").value();
    if (IdCampana != '-1') {
        MetodoWeb("Cam_Mnt_CampanaProductos.aspx/EstadoReservable", JSON.stringify({ IdCampana: IdCampana }), ResultEstReservable, null);
    }
}