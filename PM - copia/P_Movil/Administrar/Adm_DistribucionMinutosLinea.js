var tree;
var inicio = true;
var colModelLinea;
var lastsel;
var Ancho;
var Alto;
var grillaLinea;
var AnchoVariable = 305;
var RegistroAnterior = null;
var RegistroActual = null;

function my_inputEditableCheck(value, options) {
    return $("<input type='checkbox' checked='' /><input type='text' size='10' value='" + value + "'/>");
}
function my_inputNoEditableCheck(value, options) {
    return $("<input type='checkbox' checked='' /><span>'" + value + "'</span>");
}
function my_value(value) {
    return "My value: " + value.val();
}

function my_input(value, options) {
    return $("<input type='text' size='10' value='" + value + "'/>");
}

function CargarCuenta(cuenta) {
    //alert('cargar cuenta');
    if (!inicio) {
        $('#tbLinea').GridUnload();
    }
    if (cuenta != "-1") {
        inicio = false;
        CargarLinea();
    }
}

function CargarLinea() {
    //alert(ObtenerCuenta());
    //alert('cargar linea');
    $.ajax({
        url: "Adm_DistribucionMinutosLinea.aspx/ListarColModelLineas", //PageMethod
        data: "{'vcCodCue':'" + ObtenerCuenta() + "'," + //FiltroRegistro
                       "'vcValIli':'" + $("#hdfValorIlimitado").val() + "'}", //codint2
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            colModelLinea = result.d;

            CargarGrillaLinea();
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function ObtenerCuenta() {
    var idPer = window.parent.idPer;

    if (idPer != "0") {
        return window.parent.$('#hdfidCuenta').val().replace(/'/g, "&#39");
    }
    else {
        return window.parent.$('#ddlCuenta').val().replace(/'/g, "&#39");
    }
}

function ObtenerPeriodo() {
    return window.parent.$('#hdfvcPeriodo').val().replace(/'/g, "&#39");
}

function ObtenerOperador() {
    if (window.parent.$('#ddlOperador').val() == null) {
        return "-1";
    }
    else {
        return window.parent.$('#ddlOperador').val();
    }
}

function AltoGrilla() {
    return Alto - 98 - 55;
}

function AnchoGrilla() {
    return Ancho - 313 + AnchoVariable;
}

function CargarGrillaLinea() {

    grillaLinea = $("#tbLinea").jqGrid({
        caption: "Lineas ",
        datatype: CargarDatos,
        colModel: colModelLinea,
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
        pager: "#pagerLinea", //Pager.
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        rowNum: "20", // PageSize.
        rowList: [50, 100, 150], //Variable PageSize DropDownList. 
        viewrecords: true, //Show the RecordCount in the pager.
        multiselect: false,
        onSelectRow: function (id) {

            RegistroAnterior = RegistroActual;
            RegistroActual = $("#tbLinea").jqGrid('getRowData', id);
            if (RegistroAnterior == null) {
                RegistroAnterior = RegistroActual;
            }

            var editparameters = {
                "keys": false,
                "oneditfunc": null,
                "successfunc": null,
                "url": "Adm_DistribucionMinutosLinea.aspx/GuardarServiciosLinea",
                "extraparam": {},
                "aftersavefunc": function (id, resp) { GuardarServiciosLinea(id, resp); },
                "errorfunc": function (id, error) { alert('there was an error in saveRow() - ID:' + id + ' Error: ' + error); },
                "afterrestorefunc": null,
                "restoreAfterError": true,
                "mtype": "POST"
            };

            if (id && id !== lastsel) {
                $("#tbLinea").saveRow(lastsel, editparameters);
                $("#tbLinea").editRow(id, true);
                lastsel = id;
            }

        }
    }).navGrid("#pagerLinea", { edit: false, add: false, search: false, del: false });
    //$("#tbLinea").jqGrid('setFrozenColumns');
}

function CargarDatos() {
    var vcCodLin;
    var vcCodEmp;
    var vcCodInt2;
    var vcCodIMEI;
    var inCodModDis;
    var vcCodSuc;
    var inCodTip;
    var btIncDep;
    var vcCodCC;
    var inCodInt;

    if ($("#TabOpciones").tabs("option", "selected") == "0" && ObtenerCuenta() != -1) {
        vcCodLin = "";
        vcCodEmp = "";
        vcCodInt2 = tree.getSelectedItemId();
        vcCodIMEI = "";
        inCodModDis = "";
        vcCodSuc = "";
        inCodTip = "";
        btIncDep = $('#chkIncluirDependencia').is(':checked');
        vcCodCC = "";
        inCodInt = "";
    }
    else if ($("#TabOpciones").tabs("option", "selected") == "1" && ObtenerCuenta() != -1) {
        vcCodLin = $('#hdfCodLin').val();
        vcCodEmp = $('#hdfCodEmpleado').val();
        vcCodInt2 = "";
        vcCodIMEI = $('#hdfCodDispositivo').val();
        inCodModDis = $('#ddlModeloDispositivo').val();
        vcCodSuc = $('#hdfCodSucursal').val();
        inCodTip = $('#ddlTipoLinea').val();
        btIncDep = "";
        vcCodCC = $('#hdfCodCentroCosto').val();
        inCodInt = $('#hdfCodOrganizacion').val();
    }

    $.ajax({
        url: "Adm_DistribucionMinutosLinea.aspx/ListarLineas", //PageMethod
        data: "{ 'inPagTam':'" + $("#tbLinea").getGridParam("rowNum") + "'," + //Tamaño de pagina
                        "'inPagAct':'" + parseInt($("#tbLinea").getGridParam("page")) + "'," + //Pagina actual
                        "'vcValIli':'" + $("#hdfValorIlimitado").val() + "'," + //
                        "'vcCodCue':'" + ObtenerCuenta() + "'," + //Tamaño de pagina
                        "'vcCodLin':'" + vcCodLin + "'," + //Tamaño de pagina
                        "'vcCodEmp':'" + vcCodEmp + "'," + //Pagina actual
                        "'inCodInt':'" + inCodInt + "'," +
                        "'vcCodIMEI':'" + vcCodIMEI + "'," + //Nombre de columna ordenado
                        "'inCodModDis':'" + inCodModDis + "'," + //Tipo de orden de columna asc, desc
                        "'vcCodSuc':'" + vcCodSuc + "'," + //Campo de busqueda
                        "'inCodTip':'" + inCodTip + "'," + //Campo de busqueda
                        "'btIncDep':'" + btIncDep + "'," + //Campo de busqueda
                        "'vcCodCC':'" + vcCodCC + "'," + //Campo de busqueda
                        "'inCodNiv':''," + //Campo de busqueda
                        "'inCodGruOri':''," + //FiltroRegistro
                        "'vcCodInt2':'" + vcCodInt2 + "','vcPeriodo':'" + ObtenerPeriodo() + "'}", //codint2
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            $("#tbLinea")[0].addJSONData(result.d);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function GuardarServiciosLinea(id, resp) {
    var registro = $("#tbLinea").jqGrid('getRowData', id);

    var CanAct = RegistroAnterior.dcCan1;

    if (registro.dcCan1 == CanAct) {
        return;
    }

    $.ajax({
        url: "Adm_DistribucionMinutosLinea.aspx/GuardarServicios", //PageMethod
        data: "{'registro':'" + JSON.stringify(registro) + "'," + //
                       "'vcValIli':'" + $("#hdfValorIlimitado").val() + "','vcPeriodo':'" + ObtenerPeriodo() + "'}", //
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if ($(result.d.lstResultado).length > 0) {
                var titulo = "Actualización de registros";
                var contenido = "<h1>Ha sobrepasado el límite de crédito</h1>";
                //contenido += "<ul>";
                for (i in result.d.lstResultado) {
                    var cont = 1;

                    while (RegistroAnterior["TipSer" + cont.toString()] != undefined) {
                        if (result.d.lstResultado[i]["TipSer"] == RegistroAnterior["TipSer" + cont.toString()] &&
                                    result.d.lstResultado[i]["inCodSer"] == RegistroAnterior["inCodSer" + cont.toString()]) {
                            $("#tbLinea").jqGrid('setCell', RegistroAnterior["P_vcNum"], "dcCan" + cont.toString(), RegistroAnterior["dcCan" + cont.toString()]);
                            break;
                        }
                        cont++;
                    }

                    //contenido += "<li><h2>";
                    contenido += "<br/><h2>";
                    contenido += result.d.lstResultado[i]["vcNomSer"] + "(Actual: " + RegistroAnterior["dcCan" + cont.toString()] + ", Disponible: " + result.d.lstResultado[i]["dcCanDis"] + ")";
                    //contenido += "</h2></li>";
                    contenido += "</h2>";
                }
                //contenido += "</ul>";
                //Mensaje("<br/><h1> El " + RegistroAnterior["P_vcNum"] + " a superado el limite de Bolsa asignado</h1>", document, CerroMensaje);
                Mensaje(contenido, document, CerroMensaje);
                //MostrarMensajeInformativo(contenido, titulo);
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
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

function CerroMensaje() { }

$(function () {
    var GrillaLinea;
    var dataLinea;
    var idTree = "-1";
    var Selecciono = false;
    var idCliente = window.parent.parent.idCliente;

    tree = new dhtmlXTreeObject("dvOrganizacion", "100%", "100%", 0);
    tree.setImagePath("../../Common/Images/Controles/dhtmlx/TreeView/");
    tree.setOnClickHandler(CargarDependecia);

    var tabOpciones = $("#TabOpciones").tabs({
        show: function (event, ui) {
            if ($("#TabOpciones").tabs("option", "selected") == "0" && ObtenerCuenta() != -1) {
                $("#chkIncluirDependencia").attr('checked', false);
                idTree = "-1";
                tree.closeAllItems("001");
                tree.openItem("001");
                tree.selectItem("-1", false, false);
            }
            else if ($("#TabOpciones").tabs("option", "selected") == "1" && ObtenerCuenta() != -1) {
                grillaLinea.jqGrid("clearGridData", true);
                //CargarDatos();
            }
        }
    });

    $(".btnNormal").button();
    $("body").css({ margin: 0, padding: 0 });

    $(".editable").live("keypress", ValidarEnteroPositivo);
    $(".editable").parent().css({ "text-align": "center" });

    ActivarCombokendo("#ddlModeloDispositivo", 120);
    //ActivarCombokendo("#ddlSucursal", 120);
    ActivarCombokendo("#ddlTipoLinea", 120);

    DimPosElementos();
    $(window).resize(function () {
        DimPosElementos();
    });

    function DimPosElementos() {
        Ancho = $(window).width();
        Alto = $(window).height();

        $("#tbLinea").setGridWidth(AnchoGrilla());
        $("#tbLinea").setGridHeight(AltoGrilla());

        $("#TabOpciones").css({ height: Alto - 9 - 50 });
        $(".ui-tabs-panel", $("#TabOpciones")).css({ height: Alto - 9 - 34 });
        $("#dvOrganizacion").css({ height: Alto - 95 }); //42
    }

    cargarTree();

    function cargarTree() {
        $.ajax({
            type: "POST",
            url: "Adm_DistribucionMinutosLinea.aspx/ListarPrincipal",
            data: "{'vcCodInt': '" + "" + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                tree.loadJSArray(result.d);
                $(result.d).each(function () {
                    fixImage(this[0]);
                });
                tree.selectItem("001", true, false);
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    CargarCuenta(ObtenerCuenta());

    function CargarDependecia() {
        if (idTree != tree.getSelectedItemId()) {
            $.ajax({
                type: "POST",
                url: "Adm_DistribucionMinutosLinea.aspx/ListarOrganizacion",
                data: "{'vcCodInt': '" + tree.getSelectedItemId() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var idtree = tree.getSelectedItemId();
                    var texto = tree.getAllChildless();

                    $(result.d).each(function () {
                        if (texto.indexOf(this.vcCodInt) == -1) {
                            tree.insertNewItem(idtree, this.vcCodInt, this.vcNomOrg, 0, 0, 0, 0, '');
                            fixImage(this.vcCodInt);
                        }
                        else {
                            return false;
                        }
                    });
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
            if (tree.getSelectedItemId() != "-1" && ObtenerCuenta() != "-1") {
                CargarDatos();
            }
        }
        idTree = tree.getSelectedItemId();
    }

    function fixImage(id) {
        //Cerrar, abrir, cerrar
        var Archivo = 'Niveles/' + (id.length / 3).toString() + '.ico';
        if (id.length != 3) {
            tree.setItemImage2(id, Archivo, Archivo, Archivo);
        }
    }

    $("#chkIncluirDependencia").change(function () {
        CargarDatos();
    });

    $("#btnFiltrar").click(function () {
        CargarDatos();
    });

    $("#txtLinea").focusout(function () {
        $.ajax({
            type: "POST",
            url: "../../Common/WebService/General.asmx/ListarLinea",
            data: "{'maxFilas': '" + 200 + "'," +
                   "'vcCodLin': '" + $("#txtLinea").val().replace(/'/g, "&#39") + "'," +
                   "'inCodOpe': '" + ObtenerOperador() + "'," +
                   "'idCliente': '" + idCliente + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if ($(result.d).length == 1) {
                    $("#hdfCodLin").val(result.d[0].P_vcNum);
                    $("#hdfNomEmp").val(result.d[0].Empleado.vcNom);
                    Selecciono = true;
                }
                else {
                    $("#hdfCodLin").val("");
                    $("#hdfNomEmp").val("");
                    Selecciono = false;
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

    $("#txtLinea").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "../../Common/WebService/General.asmx/ListarLinea",
                data: "{'maxFilas': '" + 200 + "'," +
                       "'vcCodLin': '" + $("#txtLinea").val().replace(/'/g, "&#39") + "'," +
                       "'inCodOpe': '" + ObtenerOperador() + "'," +
                       "'idCliente': '" + idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: item.P_vcNum,
                            vcNomEmp: item.Empleado.vcNom
                        };
                    }));
                },
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
            Selecciono = true;
            $("#txtLinea").val(ui.item.label);
            $("#hdfCodLin").val(ui.item.label);
            $("#hdfNomEmp").val(ui.item.vcNomEmp);
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono) {
                $("#hdfCodLin").val("");
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
			        .append("<a>" + item.label + "=" + item.vcNomEmp + "</a>")
			        .appendTo(ul);
            };

    $("#txtEmpleado").focusout(function () {
        $.ajax({
            type: "POST",
            url: "../../Common/WebService/General.asmx/ListarEmpleado",
            data: "{'maxFilas': '" + 200 + "'," +
                           "'vcNomEmp': '" + $("#txtEmpleado").val().replace(/'/g, "&#39") + "'," +
                           "'incodGrup': '-1'," +
                           "'idCliente': '" + window.parent.parent.idCliente + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if ($(result.d).length == 1) {
                    $("#hdfCodEmpleado").val(result.d[0].P_vcCod);
                    Selecciono = true;
                }
                else {
                    $("#hdfCodEmpleado").val("");
                    Selecciono = false;
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

    $("#txtEmpleado").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "../../Common/WebService/General.asmx/ListarEmpleado",
                data: "{'maxFilas': '" + 200 + "'," +
                               "'vcNomEmp': '" + $("#txtEmpleado").val().replace(/'/g, "&#39") + "'," +
                               "'incodGrup': '-1'," +
                               "'idCliente': '" + window.parent.parent.idCliente + "'}",
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
            $("#txtEmpleado").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            Selecciono = true;
            $("#txtEmpleado").val(ui.item.label);
            $("#hdfCodEmpleado").val(ui.item.vcCodEmp);
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono) {
                $("#hdfCodEmpleado").val("");
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

    $("#txtOrganizacion").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "../../Common/WebService/General.asmx/ListarAreas",
                data: "{'maxFilas': '" + 100 + "'," +
                               "'vcNomAre': '" + $("#txtOrganizacion").val() + "'," +
                               "'idCliente': '" + window.parent.parent.idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: item.Nombre,
                            inCodInt: item.Codigo
                        };
                    }));
                },
                cache: false,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });
        },
        focus: function (event, ui) {
            $("#txtOrganizacion").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            Selecciono = true;
            $("#txtOrganizacion").val(ui.item.label);
            $("#hdfCodOrganizacion").val(ui.item.inCodInt);
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono) {
                $("#hdfCodOrganizacion").val("");
                return false;
            }
        },
        open: function (event, ui) {
            Selecciono = false;
            return false;
        }
    });


    $("#txtCentroCosto").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "../../Common/WebService/General.asmx/ListarCCOCombo",
                data: "{'maxFilas': '" + 100 + "'," +
                               "'vcNomCCO': '" + $("#txtCentroCosto").val() + "'," +
                               "'idCliente': '" + window.parent.parent.idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: item.vcNomCco,
                            inCodCCO: item.vcCodCco
                        };
                    }));
                },
                cache: false,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });
        },
        focus: function (event, ui) {
            $("#txtCentroCosto").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            Selecciono = true;
            $("#txtCentroCosto").val(ui.item.label);
            $("#hdfCodCentroCosto").val(ui.item.inCodCCO);
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono) {
                $("#hdfCodCentroCosto").val("");
                return false;
            }
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

    $("#txtCodigoDispositivo").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "../../Common/WebService/General.asmx/ListarDispositivos",
                data: "{'maxFilas': '" + 100 + "'," +
                               "'vcNomAre': '" + $("#txtCodigoDispositivo").val() + "'," +
                               "'idCliente': '" + window.parent.parent.idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: item.vcNum,
                            P_vcCodIMEI: item.P_vcCodIMEI
                        };
                    }));
                },
                cache: false,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });
        },
        focus: function (event, ui) {
            $("#txtCodigoDispositivo").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            Selecciono = true;
            $("#txtCodigoDispositivo").val(ui.item.label);
            $("#hdfCodDispositivo").val(ui.item.P_vcCodIMEI);
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono) {
                $("#hdfCodDispositivo").val("");

                return false;
            }
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

    $("#txtSucursal").focusout(function () {
        if (!Selecciono) {
            $.ajax({
                type: "POST",
                url: "../../Common/WebService/General.asmx/ListarSucursal",
                data: "{'maxFilas': '" + 200 + "'," +
                               "'vcNomSuc': '" + $("#txtSucursal").val().replace(/'/g, "&#39") + "'," +
                               "'idCliente': '" + window.parent.parent.idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if ($(result.d).length == 1) {
                        $("#hdfCodSucursal").val(result.d[0].P_vcCod);
                        Selecciono = true;
                    }
                    else {
                        $("#hdfCodSucursal").val("");
                        Selecciono = false;
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
                url: "../../Common/WebService/General.asmx/ListarSucursal",
                data: "{'maxFilas': '" + 200 + "'," +
                               "'vcNomSuc': '" + $("#txtSucursal").val().replace(/'/g, "&#39") + "'," +
                               "'idCliente': '" + window.parent.parent.idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: item.vcNom,
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
            Selecciono = true;
            $("#txtSucursal").val(ui.item.label);
            $("#hdfCodSucursal").val(ui.item.vcCodSuc);
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono) {
                //if (!ui.item) {
                $("#hdfCodSucursal").val("");
                $("#txtSucursal").val('');
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
			        .append("<a>" + item.vcCodSuc + "=" + item.label + "</a>")
			        .appendTo(ul);
            };

    $("#btnAbrirOpciones").hide(10, function () {
        $("#btnAbrirOpciones *").remove();
        $("#btnAbrirOpciones").css("left", "0px");
        $("#btnAbrirOpciones").append('<img src="../../Common/Images/arrow_right.png" alt="Ocultar Opciones"/>');
        $("#btnAbrirOpciones").css("width", "33px");
        $("#btnAbrirOpciones").css("height", "31px");
        $("#btnAbrirOpciones").show("drop", 300);
    });

    $("#btnAbrirOpciones").button({
        text: true
    });

    $("#btnAbrirOpciones").click(function () {
        var estaAbierto = $("#tdBuscador").css("display") == "table-cell";
        if (estaAbierto) {
            $(this).hide("drop", 300, function () {
                $("#tdBuscador").hide("drop", 300, function () {
                    $("#btnAbrirOpciones").button({
                        text: true
                    });
                    $("#btnAbrirOpciones *").remove();
                    $("#btnAbrirOpciones").css("left", "0px");
                    $("#btnAbrirOpciones").append('<img src="../../Common/Images/arrow_right.png" alt="Ocultar Opciones"/>');
                    $("#btnAbrirOpciones").css("width", "33px");
                    $("#btnAbrirOpciones").css("height", "31px");
                    $("#btnAbrirOpciones").show("drop", 300);
                    $("#btnAbrirOpciones").attr("title", "Abrir Opciones");
                    AnchoVariable = 305;
                    $("#tbLinea").setGridWidth(AnchoGrilla());
                });
            });
        }
        else {
            $(this).hide("drop", 300, function () {
                $("#tdBuscador").show("drop", 300, function () {
                    $("#btnAbrirOpciones").button({
                        text: true
                    });
                    $("#btnAbrirOpciones *").remove();
                    $("#btnAbrirOpciones").css("left", "300px");
                    $("#btnAbrirOpciones").text("");
                    $("#btnAbrirOpciones").append('<img src="../../Common/Images/arrow_left.png" alt="Ocultar Opciones"/>');
                    $("#btnAbrirOpciones").css("width", "33px");
                    $("#btnAbrirOpciones").css("height", "31px");
                    $("#btnAbrirOpciones").show("drop", 300);
                    $("#btnAbrirOpciones").attr("title", "Cerrar Opciones");
                    AnchoVariable = 0;
                    $("#tbLinea").setGridWidth(AnchoGrilla());
                });
            });
        }
    });
});