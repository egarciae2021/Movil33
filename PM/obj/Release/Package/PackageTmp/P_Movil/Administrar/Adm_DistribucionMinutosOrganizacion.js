var inicio = true;
var colModelOrganizacion;
var lastsel;
var lastselLinea;
var Ancho;
var Alto;
var RegistroAnterior = null;
var RegistroActual = null;
var RegistroAnteriorLinea = null;
var RegistroActualLinea = null;

function AltoGrilla() {
    return Alto - 140;
}

function AnchoGrilla() {
    return Ancho - 2;
}

function CargarCuenta(cuenta) {
    if (!inicio) {
        $('#tbOrganizacion').GridUnload();
    }
    if (cuenta != "-1") {
        inicio = false;
        CargarOrganizacion();
    }
}

function ObtenerCuenta() {
    if (window.parent.$('#ddlCuenta').val() == null) {
        return "-1";
    }
    else {
        return window.parent.$('#ddlCuenta').val().replace(/'/g, "&#39");
    }
}

function CargarDatos() {
    $.ajax({
        url: "Adm_DistribucionMinutosOrganizacion.aspx/ListarOrganizacion", //PageMethod
        data: "{'inPagTam':'" + $("#tbOrganizacion").getGridParam("rowNum") + "'," + //Tamaño de pagina
                        "'inPagAct':'" + parseInt($("#tbOrganizacion").getGridParam("page")) + "'," + //Pagina actual
                        "'vcValIli':'" + $("#hdfValorIlimitado").val() + "'," + //
                        "'vcCodCue':'" + ObtenerCuenta() + "'," + //Pagina actual
                        "'inTipBus':'" + $("#ddlBusqueda").val() + "'," + //Pagina actual
                        "'vcBus':'" + ValorBusqueda() + "'}", //FiltroRegistro
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            $("#tbOrganizacion")[0].addJSONData(result.d);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function GuardarServiciosLinea(id, tabla, resp) {
    var registro = $(idTabla).jqGrid('getRowData', id);

    $.ajax({
        url: "Adm_DistribucionMinutosLinea.aspx/GuardarServicios", //PageMethod
        data: "{'registro':'" + JSON.stringify(registro) + "'," + //
                       "'vcValIli':'" + $("#hdfValorIlimitado").val() + "'}", //
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if ($(result.d.lstResultado).length > 0) {
                var titulo = "Actualización de registros";
                var contenido = "Los siguientes servicios no pudieron ser actualizados ya que sobrepasaron el límite de crédito<br/>";
                contenido += "<ul>";
                for (i in result.d.lstResultado) {
                    var cont = 1;

                    while (RegistroAnteriorLinea["TipSer" + cont.toString()] != undefined) {
                        if (result.d.lstResultado[i]["TipSer"] == RegistroAnteriorLinea["TipSer" + cont.toString()] &&
                                    result.d.lstResultado[i]["inCodSer"] == RegistroAnteriorLinea["inCodSer" + cont.toString()]) {
                            $(idTabla).jqGrid('setCell', RegistroAnteriorLinea["P_vcNum"], "dcCan" + cont.toString(), RegistroAnteriorLinea["dcCan" + cont.toString()]);
                            break;
                        }
                        cont++;
                    }

                    contenido += "<li>";
                    contenido += result.d.lstResultado[i]["vcNomSer"] + "(Actual: " + RegistroAnteriorLinea["dcCan" + cont.toString()] + ", Disponible adicional: " + result.d.lstResultado[i]["dcCanDis"] + ")";
                    contenido += "</li>";
                }
                contenido += "</ul>";
                MostrarMensajeInformativo(contenido, titulo);
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function CargarDatosDetalle(idTabla, id) {
    $.ajax({
        url: "Adm_DistribucionMinutosLinea.aspx/ListarLineas", //PageMethod
        data: "{'inPagTam':'100'," + //$("#" + idTabla).getGridParam("rowNum") + "'," + //Tamaño de pagina
                        "'inPagAct':'1'," + //$("#" + idTabla).getGridParam("page") + "'," + //Pagina actual
                        "'vcValIli':'" + $("#hdfValorIlimitado").val() + "'," + //
                        "'vcCodCue':'" + ObtenerCuenta() + "'," + //Tamaño de pagina
                        "'vcCodLin':''," + //Tamaño de pagina
                        "'vcCodEmp':''," + //Pagina actual
                        "'inCodInt':'" + id + "'," +
                        "'vcCodIMEI':''," + //Nombre de columna ordenado
                        "'inCodModDis':''," + //Tipo de orden de columna asc, desc
                        "'vcCodSuc':''," + //Campo de busqueda
                        "'inCodTip':''," + //Campo de busqueda
                        "'btIncDep':''," + //Campo de busqueda
                        "'vcCodCC':''," + //Campo de busqueda
                        "'inCodNiv':''," + //Campo de busqueda
                        "'inCodGruOri':''," + //FiltroRegistro
                        "'vcCodInt2':''}", //codint2
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            $("#" + idTabla)[0].addJSONData(result.d);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function CargarGrillaOrganizacion() {
    $("#tbOrganizacion").jqGrid({
        datatype: CargarDatos,
        colModel: colModelOrganizacion,
        shrinkToFit: false,
        height: AltoGrilla(),
        width: AnchoGrilla(),
        rownumbers: true,
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
        pager: "#pagerOrganizacion", //Pager.
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        rowNum: "50", // PageSize.
        rowList: [50, 100, 150], //Variable PageSize DropDownList. 
        viewrecords: true, //Show the RecordCount in the pager.
        multiselect: false,
        onSelectRow: function (id) {
            RegistroAnterior = RegistroActual;
            RegistroActual = $("#tbOrganizacion").jqGrid('getRowData', id);
            if (RegistroAnterior == null) {
                RegistroAnterior = RegistroActual;
            }
            var editparameters = {
                "keys": false,
                "oneditfunc": null,
                "successfunc": null,
                "url": "Adm_DistribucionMinutosOrganizacion.aspx/GuardarServicios",
                "extraparam": {},
                "aftersavefunc": function (id, resp) { GuardarServiciosOrganizacion(id, resp); },
                "errorfunc": function (id, error) { alert('there was an error in saveRow() - ID:' + id + ' Error: ' + error); },
                "afterrestorefunc": null,
                "restoreAfterError": true,
                "mtype": "POST"
            };

            if (id && id !== lastsel) {
                $("#tbOrganizacion").saveRow(lastsel, editparameters);
                $("#tbOrganizacion").editRow(id, true);
                lastsel = id;
            }
        },
        subGrid: true,
        subGridOptions: {
            // load the subgrid data only once
            // and the just show/hide
            "reloadOnExpand": false,
            // select the row when the expand column is clicked
            "selectOnExpand": true
        },
        subGridRowExpanded: function (subgrid_id, row_id) {
            // we pass two parameters
            // subgrid_id is a id of the div tag created whitin a table data
            // the id of this elemenet is a combination of the "sg_" + id of the row
            // the row_id is the id of the row
            // If we wan to pass additinal parameters to the url we can use
            // a method getRowData(row_id) - which returns associative array in type name-value
            // here we can easy construct the flowing
            var subgrid_table_id, pager_id;
            subgrid_table_id = subgrid_id + "_t";
            pager_id = "p_" + subgrid_table_id;
            $("#" + subgrid_id).html("<table id='" + subgrid_table_id + "' class='scroll'></table><div id='" + pager_id + "' class='scroll'></div>");
            $("#" + subgrid_table_id).jqGrid({
                datatype: CargarDatosDetalle(subgrid_table_id, row_id),
                colModel: colModelLinea,
                shrinkToFit: false,
                height: Alto - 370,
                width: Ancho - 80,
                rownumbers: true,
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
                pager: "#" + pager_id, //Pager.
                loadtext: 'Cargando datos...',
                recordtext: "{0} - {1} de {2} elementos",
                emptyrecords: 'No hay resultados',
                pgtext: 'Pág: {0} de {1}', //Paging input control text format.
                rowNum: "10", // PageSize.
                rowList: [10, 20, 50], //Variable PageSize DropDownList. 
                viewrecords: true, //Show the RecordCount in the pager.
                multiselect: false,
                onSelectRow: function (id) {
                    RegistroAnteriorLinea = RegistroActualLinea;
                    RegistroActualLinea = $("#" + subgrid_table_id).jqGrid('getRowData', id);
                    if (RegistroAnteriorLinea == null) {
                        RegistroAnteriorLinea = RegistroActualLinea;
                    }
                    var editparameters = {
                        "keys": false,
                        "oneditfunc": null,
                        "successfunc": null,
                        "url": "Adm_DistribucionMinutosOrganizacion.aspx/GuardarServiciosLinea",
                        "extraparam": {},
                        "aftersavefunc": function (id, resp) { GuardarServiciosLinea(id, resp, "#" + subgrid_table_id); },
                        "errorfunc": function (id, error) { alert('there was an error in saveRow() - ID:' + id + ' Error: ' + error); },
                        "afterrestorefunc": null,
                        "restoreAfterError": true,
                        "mtype": "POST"
                    };

                    if (id && id !== lastselLinea) {
                        $("#" + subgrid_table_id).saveRow(lastselLinea, editparameters);
                        $("#" + subgrid_table_id).editRow(id, true);
                        lastselLinea = id;
                    }
                }
            }).navGrid("#" + pager_id, { edit: false, add: false, search: false, del: false });
            //$("#" + subgrid_table_id).jqGrid('navGrid', "#" + pager_id, { edit: false, add: false, del: false })
        },
        subGridRowColapsed: function (subgrid_id, row_id) {
            // this function is called before removing the data
            //var subgrid_table_id;
            //subgrid_table_id = subgrid_id+"_t";
            //jQuery("#"+subgrid_table_id).remove();
        }
    }).navGrid("#pagerOrganizacion", { edit: false, add: false, search: false, del: false });
    //$("#tbOrganizacion").jqGrid('setFrozenColumns');
}

function GuardarServiciosOrganizacion(id, resp) {
    var registro = $("#tbOrganizacion").jqGrid('getRowData', id);

    $.ajax({
        url: "Adm_DistribucionMinutosOrganizacion.aspx/GuardarServicios", //PageMethod
        data: "{'registro':'" + JSON.stringify(registro) + "'," +
                       "'vcValIli':'" + $("#hdfValorIlimitado").val() + "'," + //
                       "'vcCodCue':'" + ObtenerCuenta() + "'," +
                       "'ClaseDistribucion':'" + $("#hdfClaseDistribucion").val() + "'}", //FiltroRegistro
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            var titulo = "Actualización de registros";
            var contenido;
            if (result.d.ExisteLinea == "1") {
                if ($(result.d.lstResultado).length > 0) {
                    contenido = "Los siguientes servicios no pudieron ser actualizados ya que sobrepasaron el límite de crédito<br/>";
                    contenido += "<ul>";
                    for (i in result.d.lstResultado) {
                        var cont = 1;

                        while (RegistroAnterior["TipSer" + cont.toString()] != undefined) {
                            if (result.d.lstResultado[i]["TipSer"] == RegistroAnterior["TipSer" + cont.toString()] &&
                                        result.d.lstResultado[i]["inCodSer"] == RegistroAnterior["inCodSer" + cont.toString()]) {
                                $("#tbOrganizacion").jqGrid('setCell', RegistroAnterior["P_inCodInt"], "dcCan" + cont.toString(), RegistroAnterior["dcCan" + cont.toString()]);
                                break;
                            }
                            cont++;
                        }

                        contenido += "<li>";
                        contenido += result.d.lstResultado[i]["vcNomSer"] + "(Actual: " + RegistroAnterior["dcCan" + cont.toString()] + ", Disponible adicional: " + result.d.lstResultado[i]["dcCanDis"] + ")";
                        contenido += "</li>";
                    }
                    contenido += "</ul>";
                    MostrarMensajeInformativo(contenido, titulo);
                }
            }
            else {
                var cont = 1;
                while (RegistroAnterior["TipSer" + cont.toString()] != undefined) {
                    $("#tbOrganizacion").jqGrid('setCell', RegistroAnterior["P_inCodInt"], "dcCan" + cont.toString(), RegistroAnterior["dcCan" + cont.toString()]);
                    cont++;
                }
                contenido = "El registro modificado no puede ser actualizado por que no tiene lineas asociadas";
                MostrarMensajeInformativo(contenido, titulo);
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function CargarOrganizacion() {
    $.ajax({
        url: "Adm_DistribucionMinutosOrganizacion.aspx/ListarColModelOrganizacion", //PageMethod
        data: "{'vcCodCue':'" + ObtenerCuenta() + "'," + //FiltroRegistro
                       "'vcValIli':'" + $("#hdfValorIlimitado").val() + "'}", //codint2
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            colModelOrganizacion = result.d;
            CargarLinea();
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function CargarLinea() {
    $.ajax({
        url: "Adm_DistribucionMinutosLinea.aspx/ListarColModelLineas", //PageMethod
        data: "{'vcCodCue':'" + ObtenerCuenta() + "'," + //FiltroRegistro
                       "'vcValIli':'" + $("#hdfValorIlimitado").val() + "'}", //codint2
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            colModelLinea = result.d;
            CargarGrillaOrganizacion();
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function ValorBusqueda() {
    if ($("#txtBusqueda").hasClass("txtBusqueda")) {
        return "";
    }
    else {
        return vcBusqueda;
    }
}

function MostrarMensajeInformativo(contenido, Titulo) {
    $("#dvContenidoInformativo").html("");
    $("#dvContenidoInformativo").html(contenido);
    $('#divMsgInformativo').dialog({
        title: Titulo,
        modal: true,
        buttons: {
            "Aceptar": function () {
                $(this).dialog("close");
            }
        }
    });
}

$(function () {
    var timeoutHnd;
    var asInitVals = new Array();

    $(".btnNormal").button();
    $("body").css({ margin: 0, padding: 0 });

    DimPosElementos();
    $(window).resize(function () {
        DimPosElementos();
    });

    CargarCuenta(ObtenerCuenta());

    function DimPosElementos() {
        Ancho = $(window).width();
        Alto = $(window).height();
        $("#tbOrganizacion").setGridWidth(AnchoGrilla());
        $("#tbOrganizacion").setGridHeight(AltoGrilla());
    }
    $("#txtBusqueda").keyup(function () {
        if (timeoutHnd) {
            clearTimeout(timeoutHnd);
        }
        timeoutHnd = setTimeout(CargarDatos, 800);
    });
    $("#txtBusqueda").each(function (i) {
        asInitVals[i] = $(this).val();
    });
    $("#txtBusqueda").focus(function () {
        if ($(this).hasClass("txtBusqueda")) {
            $(this).removeClass("txtBusqueda");
            $(this).val("");
        }
    });
    $("#txtBusqueda").blur(function (i) {
        if ($(this).val() == "") {
            $(this).addClass("txtBusqueda");
            $(this).val(asInitVals[$("#txtBusqueda").index(this)]);
        }
    });
    $("#ddlBusqueda").change(function (event) {
        $("#txtBusqueda").val("");
        $("#txtBusqueda").addClass("txtBusqueda");
        $("#txtBusqueda").val(asInitVals[0]);
        $("#txtBusqueda").focus();
    });
});

