var oCampanaCorte;
var ModalNuevo;
var tblPedidos;
var MargenFiltro = 0; 
var MargenHeight = 48;
var biMultiSelect = false; 
var EsAgregar = "1";

oCampanaCorte = new MOV_CAM_CampanaCorte();

function AgregarDetalle(p_IdCorte, lstDetallePedido) {
//    var ids = $("#tblPedidosElegidos").jqGrid('getDataIDs');
//    var idsDet = "";
//    for (var i = 0; i < ids.length; i++) {
//        var datosIni = $("#tblPedidosElegidos").jqGrid('getRowData', ids[i]);
//        idsDet = idsDet + datosIni.IdDetallePedido + ","
    //    }

    var idsDet = "";
    var i = 0;
    for (i = 0; i < oCampanaCorte.MOV_CAM_CampanaCorteDetallePers().length; i++) {
        idsDet = idsDet + oCampanaCorte.MOV_CAM_CampanaCorteDetallePers()[i].IdDetallePedido + ",";
    }

    if (idsDet.length != "") {
        idsDet.substr(0, idsDet.length - 1);
    }

    $.ajax({
        url: "Cam_CortesNuevo.aspx/Agregar", //PageMethod
        data: "{'lstDetallePedido':'" + JSON.stringify(lstDetallePedido) + "'," + //Tamaño de pagina
               "'IdCorte':'" + $("#hdfIdCorte").val() + "'," + //FiltroRegistro
               "'vcIdsPedEle':'" + idsDet + "'}", 
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            var pagina = parseInt($('#tblPedidosElegidos').getGridParam("lastpage"));
            $("#tblPedidosElegidos").trigger("reloadGrid", [{ page: pagina}]);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnQuitarDetalles(lstDetallePedido) {
    if (lstDetallePedido != "") {
        $.ajax({
            url: "Cam_CortesNuevo.aspx/Quitar", //PageMethod
            data: "{'lstDetallePedido':'" + lstDetallePedido + "'," + //Tamaño de pagina
                            "'IdCorte':'" + $("#hdfIdCorte").val() + "'}", //FiltroRegistro
            dataType: "json",
            type: "post",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                $("#tblPedidosElegidos").trigger("reloadGrid", [{ page: 1}]);
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
}

$(function () {
    var IdCampana = "-1";
    var Situacion = "";
    $(".btnNormal").button({});
    $("input:checkbox,input:radio,input:file").uniform();
    $(".tdEtiqueta").css({ "width": "100px" });

    ko.validation.rules.pattern.message = 'Invalid.';

    ko.validation.configure({
        registerExtenders: true,
        messagesOnModified: true,
        insertMessages: true,
        parseInputAttributes: true,
        messageTemplate: null
    });

    ko.applyBindings(oCampanaCorte);

    oCampanaCorte.errors = ko.validation.group(oCampanaCorte);

    $(".tdEtiqueta").css("width", "100px");
    var tabContenido = $("#tabContenido").tabs({});
    $("#tabContenido").css({ "height": "150px" });

    //--------Inicia el contrato con el id seteado de condicion inicial,-------------------- 
    //----------en el caso de editar viene con un valor, en el caso de ---------------------
    //-------------------------uno nuevo viene vacio----------------------------------------
    if ($("#hdfIdCorte").val() != "") {
        //oCampanaCorte.Inicio($("#hdfIdCorte").val());
        //biMultiSelect = false;
        $.ajax({
            url: "Cam_CortesNuevo.aspx/VerificaEdicion", //PageMethod
            data: "{'IdCorte':'" + $("#hdfIdCorte").val() + "'}", //FiltroRegistro
            dataType: "json",
            type: "post",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result.d == "1") {
                    $("#btnGuardar").show();
                    $("#btnAgregar").show();
                    $("#btnQuitar").show();
                    $("#btnQuitarTodos").show();
                    //$("a", "#btnCerrar").html("Cancelar");
                }
                else {
                    $("#btnGuardar").hide();
                    $("#btnAgregar").hide();
                    $("#btnQuitar").hide();
                    $("#btnQuitarTodos").hide();
                    biMultiSelect = false;
                    //$("a", "#btnCerrar").html("Cerrar");
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
        InstanciaGrilla();
    } else {
        //biMultiSelect = false;
        $("#btnGuardar").show();
        $("#btnAgregar").show();
        $("#btnQuitar").show();
        $("#btnQuitarTodos").show();
        //$("a", "#btnCerrar").html("Cancelar");
        InstanciaGrilla();
    }

    //--------------------------------------------------------------------------------------

    //----------------------------------Guardar Entidad-------------------------------------
    $("#btnGuardar").click(function () {
        //                if (oCampanaCorte.MOV_CAM_CampanaCorteDetalle().length > 0) {
        if (oCampanaCorte.errors().length == 0) {
            //oCampanaCorte.ObtenerNumeroPedidos();
            if ($("#tblPedidosElegidos").jqGrid('getDataIDs').length == 0) {
                alerta("Debe agregar por lo menos un detalle de pedido");
                BloquearPagina(false);
                return;
            }
            confirmacion("Se generará el corte, ¿Desea continuar?", GenerarCorte, null, "Confirmación");
        } else {
            alerta('Por favor verifique los datos ingresados');
            oCampanaCorte.errors.showAllMessages();
            return false;
        }
        //                } else {
        //                    alerta("Debe agregar por lo menos un detalle de pedido");
        //                }
    });

    $(".DATE").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy' // See format options on parseDate
    });

    $("#imgBorrarFechaInicio").click(function () { $("#txtFechaInicio").val(""); });
    $("#imgBorrarFechaFin").click(function () { $("#txtFechaFin").val(""); });

    function ListarEmpleados() {
//        $("#txtAutocomplete").focusout(function () {
//            $.ajax({
//                type: "POST",
//                url: "../../Common/WebService/General.asmx/ListarEmpleado",
//                data: "{'maxFilas': '" + 200 + "'," +
//                           "'vcNomEmp': '" + $("#txtAutocomplete").val().replace(/'/g, "&#39") + "'," +
//                           "'incodGrup': '-1'," +
//                           "'idCliente': '" + window.parent.parent.parent.idCliente + "'}",
//                contentType: "application/json; charset=utf-8",
//                dataType: "json",
//                success: function (result) {
//                    if ($(result.d).length == 1) {
//                        $("#hdfAutocomplete").val(result.d[0].P_vcCod);                        
//                        Selecciono = true;
//                    }
//                    else {
//                        $("#hdfAutocomplete").val("");
//                        Selecciono = false;
//                    }
//                },
//                error: function (xhr, err, thrErr) {
//                    MostrarErrorAjax(xhr, err, thrErr);
//                }
//            });
//        });
        $("#txtAutocomplete").autocomplete({
            minLength: 0,
            source: function (request, response) {
                var ListaEmpleado_Data = {
                    maxFilas: 200,
                    vcNomEmp: $("#txtAutocomplete").val().replace(/'/g, "&#39"),
                    incodGrup: "-1",
                    idCliente: window.parent.parent.parent.idCliente
                };
                $.ajax({
                    type: "POST",
                    url: "../../Common/WebService/General.asmx/ListarEmpleado",
                    data: JSON.stringify(ListaEmpleado_Data),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        response($.map(result.d, function (item) {
                            return {
                                label: item.vcNom,
                                vcCodEmp: item.P_vcCod,
                                category: item.Grupo.vcNom,
                                inCodGru: item.Grupo.P_inCod
                            };
                        }));
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },
            focus: function (event, ui) {
                $("#txtAutocomplete").val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                Selecciono = true;
                $("#txtAutocomplete").val(ui.item.label);
                $("#hdfAutocomplete").val(ui.item.vcCodEmp);
                return false;
            },
            change: function (event, ui) {
                if (!Selecciono) {
                    $("#hdfAutocomplete").val("");
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
    }

    function ListarCentroCosto() {
//        $("#txtAutocomplete").focusout(function () {
//            $.ajax({
//                type: "POST",
//                url: "../../Common/WebService/General.asmx/ListarCCOCombo",
//                data: "{'maxFilas': '" + 200 + "'," +
//                           "'vcNomCCO': '" + $("#txtAutocomplete").val().replace(/'/g, "&#39") + "'," +
//                           "'idCliente': '" + window.parent.parent.parent.idCliente + "'}",
//                contentType: "application/json; charset=utf-8",
//                dataType: "json",
//                success: function (result) {
//                    if ($(result.d).length == 1) {
//                        $("#hdfAutocomplete").val(result.d[0].P_vcCod);
//                        Selecciono = true;
//                    }
//                    else {
//                        $("#hdfAutocomplete").val("");
//                        Selecciono = false;
//                    }
//                },
//                error: function (xhr, err, thrErr) {
//                    MostrarErrorAjax(xhr, err, thrErr);
//                }
//            });
//        });
        $("#txtAutocomplete").autocomplete({
            minLength: 0,
            source: function (request, response) {
                var ListaCentroCosto_Data = {
                    maxFilas: 200,
                    vcNomCCO: $("#txtAutocomplete").val().replace(/'/g, "&#39"),
                    idCliente: window.parent.parent.parent.idCliente
                };
                $.ajax({
                    type: "POST",
                    url: "../../Common/WebService/General.asmx/ListarCCOCombo",
                    data: JSON.stringify(ListaCentroCosto_Data),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        response($.map(result.d, function (item) {
                            return {
                                label: item.vcNomCco,
                                vcCodCco: item.vcCodCco
                            };
                        }));
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },
            focus: function (event, ui) {
                $("#txtAutocomplete").val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                Selecciono = true;
                $("#txtAutocomplete").val(ui.item.label);
                $("#hdfAutocomplete").val(ui.item.vcCodCco);
                return false;
            },
            change: function (event, ui) {
                if (!Selecciono) {
                    $("#hdfAutocomplete").val("");
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
			.append("<a>" + item.vcCodCco + "=" + item.label + "</a>")
			.appendTo(ul);
        };        
    }

    function GenerarCorte() {
        BloquearPagina(true);
        oCampanaCorte.Guardar(SatisfactoriaGuardar, ErrorGuardar);
    }
    function SatisfactoriaGuardar(Resultado) {
        if (Resultado != "-1") {
            window.parent.ActualizarGrilla(Resultado);
            Mensaje("<br/><h1>Corte guardado</h1><br/>", document, CerroMensaje);
        }
        else {
            alerta("Debe agregar por lo menos un detalle de pedido");
            BloquearPagina(false);
        }
    }
    function ErrorGuardar(xhr, err, thrErr) {
        BloquearPagina(false);
    }
    function CerroMensaje() {
        BloquearPagina(false);
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    }

    //--------------------------------------------------------------------------------------

    function InstanciaGrilla() {
        tblPedidos = $("#tblPedidosElegidos").jqGrid({
            //sortable: true,
            datatype: function () {
                //-------------------------uno nuevo viene vacio----------------------------------------
                if ($("#hdfIdCorte").val() != "") {
                    $.ajax({
                        url: "Cam_CortesNuevo.aspx/Mostrar", //PageMethod
                        data: "{'p_IdCorte':'" + $("#hdfIdCorte").val() + "'," + //Tamaño de pagina
                                   "'inPagTam':'" + $('#tblPedidosElegidos').getGridParam("rowNum") + "'," + //Pagina actual
                                   "'inPagAct':'" + parseInt($('#tblPedidosElegidos').getGridParam("page")) + "'}", //FiltroRegistro
                        dataType: "json",
                        type: "post",
                        contentType: "application/json; charset=utf-8",
                        success: function (result) {
                            $("#tblPedidosElegidos")[0].addJSONData(result.d["CampanaCorteDetalle"]);
                            oCampanaCorte.Cargar(result.d["CampanaCorte"]);

                            var i = 0;
                            for (i = 0; i < result.d["CampanaCorteDetalle"].Items.length; i++) {
                                var row = result.d["CampanaCorteDetalle"].Items[i].Row;
                                var data = { "IdCorte": $("#hdfIdCorte").val(), "IdDetallePedido": row[1], "IdCuenta": row[5] };
                                oCampanaCorte.MOV_CAM_CampanaCorteDetallePers.push(data);
                            }
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        }
                    });
                }
                else {
                    if (oCampanaCorte.IdCampana() != "-1" && oCampanaCorte.Situacion() != "-1") {
                        var CriterioNuevo = true;
                        if (oCampanaCorte.IdCampana() == IdCampana && oCampanaCorte.Situacion() == Situacion)
                            CriterioNuevo = false;

                        IdCampana = oCampanaCorte.IdCampana();
                        Situacion = oCampanaCorte.Situacion();

                        $.ajax({
                            url: "Cam_CortesNuevo.aspx/ListarPedidosIniciales", //PageMethod
                            data: "{'vcIdCampana':'" + oCampanaCorte.IdCampana() + "'," + //Tamaño de pagina
                                       "'vcNomSit':'" + oCampanaCorte.Situacion() + "'," + //Pagina actual
                                       "'inPagTam':'" + $('#tblPedidosElegidos').getGridParam("rowNum") + "'," + //Pagina actual
                                       "'inPagAct':'" + parseInt($('#tblPedidosElegidos').getGridParam("page")) + "'," + //Pagina actual
                                       "'CriterioNuevo':'" + CriterioNuevo + "'}", //FiltroRegistro
                            dataType: "json",
                            type: "post",
                            contentType: "application/json; charset=utf-8",
                            success: function (result) {
                                oCampanaCorte.MostrarColumnasNecesarias();

                                var lstDetalles = result.d.vcDetalles.split(",");
                                oCampanaCorte.MOV_CAM_CampanaCorteDetallePers.removeAll();

                                var i = 0;
                                for (i = 0; i < lstDetalles.length; i++) {
                                    var data = { "IdCorte": -1, "IdDetallePedido": lstDetalles[i], "IdCuenta": "" };

                                    oCampanaCorte.MOV_CAM_CampanaCorteDetallePers.push(data);
                                    //oCampanaCorte.MOV_CAM_CampanaCorteDetallePers = result.d["CampanaCorteDetalle"];
                                }

                                $("#tblPedidosElegidos")[0].addJSONData(result.d["CampanaCorteDetalle"]);

                                //for (var i = 0; i < result.d["CampanaCorteDetalle"].items.length ; i++) {
                                //    var datosIni = $("#tblPedidosElegidos").jqGrid('getRowData', ids[i]);
                                //    if (datosIni.IdDetallePedido == p_DatosPedido.IdDetallePedido) {
                                //        inAct = 0;
                                //    }
                                //}

                                //if (inAct == 1) {
                                //    //$("#tblPedidosElegidos").addRowData(p_DatosPedido.IdDetallePedido, p_DatosPedido);
                                //    var data = { "IdCorte": p_IdCorte, "IdDetallePedido": p_DatosPedido.IdDetallePedido, "IdCuenta": p_DatosPedido.vcCodCue };
                                //    this.MOV_CAM_CampanaCorteDetalle.push(data);
                                //}

                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });
                    }
                    else {
                        $("#tblPedidosElegidos").jqGrid('clearGridData');
                    }
                }
            },
            colModel: [
                    { name: 'IdCorte', index: 'IdCorte', label: 'IdCorte', hidden: true, sortable: false },
                    { name: 'IdDetallePedido', index: 'IdDetallePedido', label: 'IdDetallePedido', hidden: true, sortable: false },
                    { name: 'IdPedido', index: 'IdPedido', label: 'inCodGru', hidden: true, sortable: false },
   		            { name: 'CodigoPedido', index: 'CodigoPedido', label: 'Código de Pedido', hidden: false, width: 80, align: 'right', sortable: false },
                    { name: 'NumeroPedidos', index: 'NumeroPedidos', label: 'Número de Ítem', hidden: false, width: 50, align: 'center', sortable: false },
                    { name: 'vcCodCue', index: 'vcCodCue', label: 'IdCuenta', hidden: true, width: 100, sortable: false },
                    { name: 'vcNomCue', index: 'vcNomCue', label: 'Cuenta', hidden: false, width: 110, sortable: false },
                    { name: 'vcCodEmp', index: 'vcCodEmp', label: 'Registro', hidden: false, width: 50, sortable: false },
                    { name: 'EMPL_vcNOMEMP', index: 'EMPL_vcNOMEMP', label: 'Empleado', hidden: false, width: 190, sortable: false },
                    { name: 'FechaPedido', index: 'FechaPedido', label: 'Fecha', hidden: false, width: 110, align: 'center', sortable: false },
            //{ name: 'NumeroPedidos', index: 'NumeroPedidos', label: 'Número de Ítem', hidden: false, width: 50, align: 'right' },
                    {name: 'CCOS_vcNOMCCO', index: 'CCOS_vcNOMCCO', label: 'Centro de Costo', width: 180, sortable: false },
                    { name: 'Linea', index: 'Linea', label: 'Línea', width: 70, sortable: false },
                    { name: 'NomMod', index: 'NomMod', label: 'Equipo', width: 150, sortable: false },
                    { name: 'NomPlan', index: 'NomPlan', label: 'Plan', width: 100, sortable: false },
                    { name: 'MontoTotalNoServicios', index: 'MontoTotalNoServicios', label: 'Monto (No Servicios)', align: 'right', width: 60, sortable: false },
                    { name: 'MontoTotalServicios', index: 'MontoTotalServicios', label: 'Monto (Servicios)', align: 'right', width: 70, sortable: false },
                    { name: 'MesesContrato', index: 'MesesContrato', label: 'Meses de Contrato', align: 'right', width: 60, sortable: false }
   	                ],
            jsonReader: //Set the jsonReader to the JQGridJSonResponse squema to bind the data.
                    {
                    root: "Items",
                    page: "PaginaActual",
                    total: "TotalPaginas",
                    records: "TotalRegistros",
                    repeatitems: true,
                    cell: "Row",
                    id: "ID"
                },
            pager: "#pager", //Pager.
            height: 250,
            width: 800,
            loadtext: 'Cargando datos...',
            recordtext: "{0} - {1} de {2} elementos",
            emptyrecords: 'No hay resultados',
            pgtext: 'Pág: {0} de {1}', //Paging input control text format.
            rowNum: 10, //"10" PageSize.
            rowList: [10, 20, 30], //[10, 20, 30] Variable PageSize DropDownList. 
            viewrecords: true, //Show the RecordCount in the pager.
            rownumbers: true,
            shrinkToFit: false,
            multiselect: biMultiSelect,
            //multiselect: false,
            caption: "Pedidos Elegidos",
            beforeSelectRow: function (rowid, e) {
                return false;
            },
            ondblClickRow: function (id) { },
            //            onSelectRow: function (id) { },
            sortable: function (permutation) { },
            resizeStop: function (width, index) { },
            afterInsertRow: function (rowid, aData, rowelem) { },
            ondblClickRow: function (id) { }
        }).navGrid("#pager", { edit: false, add: false, search: false, del: false });
    }

    inicioPagina();
    function inicioPagina() {
        DimPosElementos();
    }

    $(window).resize(function () {
        DimPosElementos();
    });

    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        var AnchoLateral = $(".LateralSplitter");
        $(".tabs").css({ height: Alto - 23, width: Ancho - AnchoLateral, marginbotton: 0, paddingbotton: 0 });

        $(".Splitter").css({ height: Alto - 18 });
        $("#tblPedidosElegidos").setGridWidth($(window).width() - 50);
        $("#tblPedidosElegidos").setGridHeight($(window).height() - 235 - MargenFiltro * MargenHeight);
        $('#dvBanner').css({ "height": Alto - 260 });
    }


    $("#ddlSituacion").change(function (event) {
        $('#ddlBusquedaEn').val("-1");
        $("#txtBusqueda").val("");
        if ($("#ddlSituacion").val() == 4) {
            $('#td_FilRangoFecha').show();
            $('#td_FilNormal').hide();
            $('#td_FilAutocomplete').hide();
        } else if ($("#ddlSituacion").val() == 3) {
            $('#td_FilRangoFecha').hide();
            $('#td_FilNormal').hide();
            $('#td_FilAutocomplete').show();
        } else {
            $('#td_FilRangoFecha').hide();
            $('#td_FilNormal').show();
            $('#td_FilAutocomplete').hide();
        }

    });

    $("#btnAgregar").click(function (event) {
        var IdCam = $("#ddlCampana").val();
        var IdSit = $("#ddlSituacion").val();
        EsAgregar = "1";

        if ($("#ddlCampana").val() == "-1") {
            alerta("Debe elegir una campaña.");
            return;
        }
        if ($("#ddlSituacion").val() == "-1") {
            alerta("Debe elegir una situación.");
            return;
        }

        var IdCorte = "-1";
        if ($("#hdfIdCorte").val() != "")
            IdCorte = $("#hdfIdCorte").val();

        $('#ifNuevo').attr("src", "Cam_CortesElegirPedidos.aspx?IdCampana=" + IdCam + "&IdSituacion=" + IdSit + "&EsAgregar=" + EsAgregar + "&IdCorte=" + IdCorte);
        ModalNuevo = $('#dvNuevo').dialog({
            title: "Agregar Pedidos",
            height: 540,
            width: 780,
            modal: true
        });
    });

    $("#btnQuitarTodos").click(function (event) {
        if ($("#tblPedidosElegidos").jqGrid('getDataIDs').length > 0) {
            $.ajax({
                url: "Cam_CortesNuevo.aspx/Quitar", //PageMethod
                data: "{'lstDetallePedido':'" + "" + "'," + //Tamaño de pagina
                       "'IdCorte':'" + $("#hdfIdCorte").val() + "'}", //FiltroRegistro
                dataType: "json",
                type: "post",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    $("#tblPedidosElegidos").trigger("reloadGrid");
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
    });

    $("#btnQuitar").click(function (event) {
        var IdCam = $("#ddlCampana").val();
        var IdSit = $("#ddlSituacion").val();
        EsAgregar = "0";

        if ($("#tblPedidosElegidos").getGridParam("reccount") == 0) {
            alerta("No hay ningún pedido a quitar.");
            return;
        }

        var IdCorte = "-1";
        if ($("#hdfIdCorte").val() != "")
            IdCorte = $("#hdfIdCorte").val();

        $('#ifNuevo').attr("src", "Cam_CortesElegirPedidos.aspx?IdCampana=" + IdCam + "&IdSituacion=" + IdSit + "&EsAgregar=" + EsAgregar + "&IdCorte=" + IdCorte);
        ModalNuevo = $('#dvNuevo').dialog({
            title: "Quitar Pedidos",
            height: 540,
            width: 780,
            modal: true
        });

        //        var ids = $("#tblPedidosElegidos").jqGrid('getGridParam', 'selarrrow');
        //        if (ids.length == 0) {
        //            alerta("seleccione por lo menos un pedido");
        //            return;
        //        }
        //        var inNumSel = ids.length;
        //        var lstDetallePedido = "";
        //        for (i = 0; i < inNumSel; i++) {
        //            var datos = $("#tblPedidosElegidos").jqGrid('getRowData', ids[inNumSel - i - 1]);
        //            $("#tblPedidosElegidos").jqGrid('delRowData', ids[inNumSel - i - 1]);
        //            //oCampanaCorte.QuitarDetalle(datos.IdDetallePedido);
        //            if (lstDetallePedido != "")
        //                lstDetallePedido += ",";
        //            lstDetallePedido += datos.IdDetallePedido.toString();
        //        }
        //        var pagina = parseInt($('#tblPedidosElegidos').getGridParam("page"));
    });

    $("#btnCerrar").click(function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });

    $('#txtBusqueda').live("keydown", function (e) {
        if (e.keyCode == 13) {
            BuscarValor();
            return false; // prevent the button click from happening
        }
    });

    $('#ddlBusquedaEn').change(function () {
        $('#txtBusqueda').val("");
        $('#txtBusqueda').focus();
        if ($('#ddlBusquedaEn').val() == "4") {
            $('#td_FilRangoFecha').show();
            $('#td_FilNormal').hide();
            $('#td_FilEmpleado').hide();
        } else if ($('#ddlBusquedaEn').val() == "3" || $('#ddlBusquedaEn').val() == "5") {
            $('#td_FilEmpleado').show();
            $('#td_FilRangoFecha').hide();
            $('#td_FilNormal').hide();
            $("#txtAutocomplete").autocomplete("destroy");
            $("#txtAutocomplete").val("");
            $("#hdfAutocomplete").val("");
            if ($('#ddlBusquedaEn').val() == "3") {
                ListarEmpleados();
            } else if ($('#ddlBusquedaEn').val() == "5") {
                ListarCentroCosto();
            }
        } else {
            $('#td_FilEmpleado').hide();
            $('#td_FilRangoFecha').hide();
            $('#td_FilNormal').show();
        }
    });



    $("#imgBorrarFechaInicio").click(function () { $("#txtFechaInicio").val(""); });
    $("#imgBorrarFechaFin").click(function () { $("#txtFechaFin").val(""); });

    $(".DATE").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy' // See format options on parseDate
    });

    function BuscarValor() {
        if ($('#txtBusqueda').val() != "") {

        }
        else {
            alerta("Ingrese un valor para buscar");
        }
    }

    $('#imgBuscar').click(function () {
        BuscarValor();
    });

    //$("#ddlCampana").change(function () {
    //    alert($(this).val());
    //});
});