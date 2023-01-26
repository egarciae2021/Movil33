var codigoF = "";
var codPaisF = "";
var codCiudF = "";
var codProvF = "";
var codDistF = "";
var DescripF = "";
var DirecciF = "";
var Selecciono;
$(function () {
    $("#btnCerrar").click(function () {
        window.parent.ModalNuevo.dialog('close');
    });

    var oColModelEleccionOficina = [
        { name: 'IdOficina', label: 'IdOficina', width: 80, hidden: true },
        { name: 'IdCliente', label: 'IdCliente', width: 80, hidden: true },
        { name: 'Codigo', label: 'Código', width: 50 },
        { name: 'IdPais', label: 'IdPais', width: 60, hidden: true },
        { name: 'NombrePais', label: 'País', width: 80 },
        { name: 'IdCiudad', label: 'IdCiudad', width: 80, hidden: true },
        { name: 'NombreCiudad', label: 'Ciudad', width: 80 },
        { name: 'IdProvincia', label: 'IdProvincia', width: 170, hidden: true },
        { name: 'NombreProvincia', label: 'Provincia', width: 80 },
        { name: 'IdDistrito', label: 'IdDistrito', width: 170, hidden: true },
        { name: 'NombreDistrito', label: 'Distrito', width: 100 },
        { name: 'Descripcion', label: 'Descripción', width: 100 },
        { name: 'DireccionCompleta', label: 'Dirección', width: 140 },
        { name: 'Referencia', label: 'Referencia', width: 100, hidden: true }
    ];

    //var tblEleccionOficinas = JQGrid("#tblEleccionOficinas", "", "local", oColModelEleccionOficina, 700, 270, "IdOficina", false, fnDoubleCLickOficina, fnSelectEleccionOficina);
    
    //04-02-2014 wapumayta
    var tblEleccionOficinas = JQGrid("#tblEleccionOficinas", "#pagerOficina",
                                            cargarGrillaOficinas, oColModelEleccionOficina,
                                            700, 180, "IdOficina", false, fnDoubleCLickOficina, fnSelectEleccionOficina);
    //$("#tblEleccionOficinas").jqGrid('inlineNav', "#pagerOficina", { edit: false, editicon: "ui-icon-pencil", add: false, addicon: "ui-icon-plus", save: false, saveicon: "ui-icon-disk", cancel: false, cancelicon: "ui-icon-cancel", addParams: { useFormatter: false }, editParams: {} });

    //MetodoWeb("SeleccionarOficina.aspx/BuscarOficinaXEmpleado", JSON.stringify({ 'codigo': codigoF, 'CodPais': codPaisF, 'CodCiudad': codCiudF, 'CodProv': codProvF, 'CodDist': codDistF, 'Descripcion': DescripF, 'Direccion': DirecciF }), CargarOficina, null);

    $("#btnGuardar").click(function () {
        var id = $("#tblEleccionOficinas").jqGrid('getGridParam', 'selrow');
        if (!id) { alerta("Seleccione una oficina"); return; }
        var datos = $("#tblEleccionOficinas").jqGrid('getRowData', id);
        var DatosOficina = [{
            'IdOficina': id,
            'Codigo': datos.Codigo,
            'IdPais': datos.IdPais,
            'Pais': datos.NombrePais,
            'IdCiudad': datos.IdCiudad,
            'Ciudad': datos.NombreCiudad,
            'IdProvincia': datos.IdProvincia,
            'Provincia': datos.NombreProvincia,
            'IdDistrito': datos.IdDistrito,
            'Distrito': datos.NombreDistrito,
            'Descripcion': datos.Descripcion,
            'DireccionCompleta': datos.DireccionCompleta,
            'Referencia': datos.Referencia
        }];
        window.parent.ObtenerOficina(DatosOficina);
    });


    function fnDoubleCLickOficina(id) {
        id = $("#tblEleccionOficinas").jqGrid('getGridParam', 'selrow');
        var datos = $("#tblEleccionOficinas").jqGrid('getRowData', id);
        var DatosOficina = [{
            'IdOficina': id,
            'Codigo': datos.Codigo,
            'IdPais': datos.IdPais,
            'Pais': datos.NombrePais,
            'IdCiudad': datos.IdCiudad,
            'Ciudad': datos.NombreCiudad,
            'IdProvincia': datos.IdProvincia,
            'Provincia': datos.NombreProvincia,
            'IdDistrito': datos.IdDistrito,
            'Distrito': datos.NombreDistrito,
            'Descripcion': datos.Descripcion,
            'DireccionCompleta': datos.DireccionCompleta,
            'Referencia': datos.Referencia
        }];
        window.parent.ObtenerOficina(DatosOficina);
    }

    function fnSelectEleccionOficina(id) { }

    function CargarOficina(lstOficina) {
        $("#tblEleccionOficinas").jqGrid('clearGridData');
        if ($(lstOficina).length > 0) {
            //for (var i = 0; i < $(lstOficina).length; i++)
            //    $("#tblEleccionOficinas").jqGrid('addRowData', lstOficina[i].IdOficina, lstOficina[i]);
            $("#tblEleccionOficinas")[0].addJSONData(lstOficina); //04-02-2014 wapumayta
        }
    }

    $("#btnBuscar").click(function () {
        codigoF = $.trim($("#txtCodigo").val());
        codPaisF = ($.trim($("#hdfPais").val()) == "" ? $.trim($("#txtPais").val()) : $.trim($("#hdfPais").val()));
        codCiudF = ($.trim($("#hdfCiudad").val()) == "" ? $.trim($("#txtCiudad").val()) : $.trim($("#hdfCiudad").val()));
        codProvF = ($.trim($("#hdfProvincia").val()) == "" ? $.trim($("#txtProvincia").val()) : $.trim($("#hdfProvincia").val()));
        codDistF = ($.trim($("#hdfDistrito").val()) == "" ? $.trim($("#txtDistrito").val()) : $.trim($("#hdfDistrito").val()));
        DescripF = $.trim($("#txtDescripcion").val());
        DirecciF = $.trim($("#txtDireccion").val());

        cargarGrillaOficinas();
        //MetodoWeb("SeleccionarOficina.aspx/BuscarOficinaXEmpleado", JSON.stringify({ 'codigo': codigoF, 'CodPais': codPaisF, 'CodCiudad': codCiudF, 'CodProv': codProvF, 'CodDist': codDistF, 'Descripcion': DescripF, 'Direccion': DirecciF }), CargarOficina, null);
    });

    //Cargar PAISES
    if ($("#txtPais").length > 0) {
        $("#txtPais").autocomplete({
            minLength: 0,
            source: function (request, response) {
                $.ajax({
                    type: "POST",
                    url: "../../../Common/WebService/General.asmx/ListarPais_x_Codigo_o_Nombre",
                    data: "{'vcCriterio': '" + $("#txtPais").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'," +
                           "'idCliente': '" + window.parent.parent.parent.idCliente + "','Activo':'1'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        response($.map(result.d, function (item) {
                            return {
                                label: item.vcNomPai.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'),
                                P_vcCodPai: item.P_vcCodPai
                            };
                        }));
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },
            focus: function (event, ui) {
                $("#txtPais").val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                Selecciono = true;
                $("#txtPais").val(ui.item.label);
                $("#hdfPais").val(ui.item.P_vcCodPai);
                $("#txtCiudad").val("");
                $("#hdfCiudad").val("");
                $("#txtCiudad").focus();
                $("#txtProvincia").val("");
                $("#hdfProvincia").val();
                $("#txtDistrito").val("");
                $("#hdfDistrito").val("");
                $('#chkPadre:checked').removeAttr("checked");
                $('#trCiudadBase').hide();
                CargarCiudad(ui.item.P_vcCodPai);
                return false;
            },
            change: function (event, ui) {
                if (!Selecciono) {
                    $("#hdfPais").val("");
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
			    .append("<a>" + item.P_vcCodPai + "=" + item.label + "</a>")
			    .appendTo(ul);
        };
    }



    //Cargar CIUDADES
    function CargarCiudad(codPais) {
        if ($("#txtCiudad").length > 0) {
            $("#txtCiudad").autocomplete({
                minLength: 0,
                source: function (request, response) {
                    $.ajax({
                        type: "POST",
                        url: "SeleccionarOficina.aspx/ListarCiudad",
                        data: "{'vcCriterio': '" + $("#txtCiudad").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'," +
                                "'prCodPais': '" + codPais + "'}",
                        //data: "{'prCodPais': '" + codPais + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            response($.map(result.d, function (item) {
                                return {
                                    label: item.vcNomCiu.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'),
                                    P_vcCodCiu: item.P_vcCodCiu
                                };
                            }));
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        }
                    });
                },
                focus: function (event, ui) {
                    $("#txtCiudad").val(ui.item.label);
                    return false;
                },
                select: function (event, ui) {
                    Selecciono = true;
                    $("#txtCiudad").val(ui.item.label);
                    $("#hdfCiudad").val(ui.item.P_vcCodCiu);
                    $("#txtProvincia").val("");
                    $("#hdfProvincia").val();
                    $("#txtProvincia").focus();
                    $("#txtDistrito").val("");
                    $("#hdfDistrito").val("");
                    CargarProvincia(ui.item.P_vcCodCiu);
                    return false;
                },
                change: function (event, ui) {
                    if (!Selecciono) {
                        $("#hdfCiudad").val("");
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
			    .append("<a>" + item.P_vcCodCiu + "=" + item.label + "</a>")
			    .appendTo(ul);
        };
        }
    }

    //CARGAR PROVINCIAS
    function CargarProvincia(codCiudad) {
        if ($("#txtProvincia").length > 0) {
            $("#txtProvincia").autocomplete({
                minLength: 0,
                source: function (request, response) {
                    $.ajax({
                        type: "POST",
                        url: "SeleccionarOficina.aspx/ListarProvinciaPorCiudad",
                        data: "{'vcCriterio': '" + $("#txtProvincia").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'," +
                                "'prCodCiudad': '" + codCiudad + "'}",
                        //data: "{'prCodCiudad': '" + codCiudad + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            response($.map(result.d, function (item) {
                                return {
                                    label: item.Nombre.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'),
                                    Codigo: item.Codigo
                                };
                            }));
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        }
                    });
                },
                focus: function (event, ui) {
                    $("#txtProvincia").val(ui.item.label);
                    return false;
                },
                select: function (event, ui) {
                    Selecciono = true;
                    $("#txtProvincia").val(ui.item.label);
                    $("#hdfProvincia").val(ui.item.Codigo);
                    $("#txtDistrito").val("");
                    $("#hdfDistrito").val("");
                    $("#txtDistrito").focus();
                    cargarDistrito(ui.item.Codigo);
                    return false;
                },
                change: function (event, ui) {
                    if (!Selecciono) {
                        $("#hdfProvincia").val("");
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
			                .append("<a>" + item.Codigo + "=" + item.label + "</a>")
			                .appendTo(ul);
                    };
        }
    }



    function cargarDistrito(codProv) {
        if ($("#txtDistrito").length > 0) {
            $("#txtDistrito").autocomplete({
                minLength: 0,
                source: function (request, response) {
                    $.ajax({
                        type: "POST",
                        url: "SeleccionarOficina.aspx/ListarDistritoPorProvincia",
                        data: "{'vcCriterio': '" + $("#txtDistrito").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'," +
                                "'prCodProvincia': '" + codProv + "'}",
                        //data: "{'prCodProvincia': '" + codProv + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            response($.map(result.d, function (item) {
                                return {
                                    label: item.Nombre.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'),
                                    Codigo: item.Codigo
                                };
                            }));
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        }
                    });
                },
                focus: function (event, ui) {
                    $("#txtDistrito").val(ui.item.label);
                    return false;
                },
                select: function (event, ui) {
                    Selecciono = true;
                    $("#txtDistrito").val(ui.item.label);
                    $("#hdfDistrito").val(ui.item.Codigo);
                    $("#txtDescripcion").focus();
                    return false;
                },
                change: function (event, ui) {
                    if (!Selecciono) {
                        $("#hdfDistrito").val("");
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
			    .append("<a>" + item.Codigo + "=" + item.label + "</a>")
			    .appendTo(ul);
        };
        }
    }

    //04-02-2014 wapumayta
    function cargarGrillaOficinas() {
        var inPagTam = $("#tblEleccionOficinas").getGridParam("rowNum");
        var inPagAct = $("#tblEleccionOficinas").getGridParam("page");
        MetodoWeb("SeleccionarOficina.aspx/BuscarOficinaXEmpleado", JSON.stringify({ 'codigo': codigoF.replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92"), 'CodPais': codPaisF, 'CodCiudad': codCiudF, 'CodProv': codProvF, 'CodDist': codDistF, 'Descripcion': DescripF.replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92"), 'Direccion': DirecciF.replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92"), 'inPagTam': inPagTam, 'inPagAct': inPagAct }), CargarOficina, null);
    }
});

function validarEspaciosEnBlancoAlInicio(id) {
    var valor = $("#" + id.toString() + "").val();
    $("#" + id.toString() + "").val($.trim(valor));
}


