var oCulturaUsuario;
var inFilas;
var nuAltoFila = 23.04;
var ArrayPaginacion = [];
var ModalDispositivos;
var ModalAplicaciones;
let ListaDispositivos = [];

function ButtonItems(P_Evento, P_Icono, P_Value, P_Button, P_Disabled) {
    this.P_Evento = P_Evento;
    this.P_Icono = P_Icono;
    this.P_Value = P_Value;
    this.P_Button = P_Button;
    this.P_Disabled = P_Disabled;
}

$(function () {
    oCulturaUsuario = window.parent.parent.parent.oCulturaUsuario;

    $(window).resize(function () {
        DimPosElementos();
    });    

    $("#ddlTipoVista").change(function () {
        var Periodo = $("#ddlTipoVista option:selected").val();
        var $Pagina;
        var $width = $(window).width();
        var $height = $(window).height();

        switch (Periodo) {
            case "1":
                $("#dvEmpleado").hide();
                $("#btnGenerarCodigoMasivo").hide();
                $("#dvDispositivoLista").hide();
                $("#dvModeloDispositivo").show();
                fnCargarDatosModelos();
                break;
            case "2":
                $("#dvModeloDispositivo").hide();
                $("#dvDispositivoLista").hide();
                $("#dvEmpleado").show();
                $("#btnGenerarCodigoMasivo").show();
                fnCargarDatosEmpleados();
                break;
            case "3":
                $("#dvModeloDispositivo").hide();
                $("#dvEmpleado").hide();
                $("#dvDispositivoLista").show();
                $("#btnGenerarCodigoMasivo").hide();
                fnCargarDatosDispositivos();
                break;
            default:
                //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
                    break;
}
    });

    $("#btnGenerarCodigoMasivo").click(function () {
        fnGenerarCodigoMasivo(0, "");
    });

    Init();

    function Init() {
        //$('#ddlTipoVista>option:eq(2)').attr('selected', true);
        //debugger
        document.getElementById('ddlTipoVista').value = '3';
        $("#ddlTipoVista").change();
        document.getElemen
        //tbDispositivo
    }

    $("#txtBusqueda").on('change keyup paste', function () {
        var grid = ($("#ddlTipoVista option:selected").val() == "1") ? "tbModelo" : ($("#ddlTipoVista option:selected").val() == "2") ? "tbEmpleado":"tbDispositivo";
        SearchByAppName(grid);
    });
    //NumeroInicialFilas();
})

function SettingColumnName(grid) {
    //debugger;
    
    var columnNames = $('#' + grid + '').jqGrid('getGridParam', 'colModel');
    var columnSel = $("#ddlBusqueda option:selected").val();
    $('select#ddlBusqueda').empty()
    for (var columnModelIndex in columnNames) {
        var columnModel = columnNames[columnModelIndex];
        if (!columnModel.hidden && columnModel.label != null && columnModel.resizable == true) {
            $("select#ddlBusqueda").append($("<option>")
            .val(columnModel.name)
            .html(columnModel.label)
        );
        }
    }
    if (grid == "tbDispositivo") {
        if ($("#ddlBusqueda option").filter(function (i, e) { return $(e).val() == columnSel }).length > 0) {
            document.getElementById('ddlBusqueda').value = columnSel
        }
        else {
            document.getElementById('ddlBusqueda').value = "LINEA"
        }
    }

    
}

function SearchByAppName(grid) {

    var columnSel = $("#ddlBusqueda option:selected").val();
    //  Fetch the text from our <input> control
    var searchString = $("#txtBusqueda").val();


    //  Prepare to pass a new search filter to our jqGrid
    var f = { groupOp: "AND", rules: [] };

    //  Remember to change the following line to reflect the jqGrid column you want to search for your string in
    //  In this example, I'm searching through the UserName column.

    f.rules.push({ field: columnSel, op: "cn", data: searchString });

    var _grid = $('#' + grid + '');
    _grid[0].p.search = f.rules.length > 0;
    $.extend(_grid[0].p.postData, { filters: JSON.stringify(f) });
    _grid.trigger("reloadGrid", [{ page: 1 }]);
}

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    switch ($("#ddlTipoVista option:selected").val()) {
        case "1":
            $("#tbModelo").setGridWidth($(window).width() - 45);
            $("#tbModelo").setGridHeight($(window).height() - 155);
            RecalcularColumnasGrilla("tbModelo", false);
            break;
        case "2":
            $("#tbEmpleado").setGridWidth($(window).width() - 45);
            $("#tbEmpleado").setGridHeight($(window).height() - 155);
            RecalcularColumnasGrilla("tbEmpleado", false);
            break;
        case "2":
            $("#tbDispositivo").setGridWidth($(window).width() - 45);
            $("#tbDispositivo").setGridHeight($(window).height() - 155);
            RecalcularColumnasGrilla("tbDispositivo", false);
            break;
        default:
            break;
    }
    
    
    //NumeroInicialFilasResize();
}

//function NumeroInicialFilas() {
//    ArrayPaginacion = [];
//    inFilas = Math.floor(($(window).height() - 300) / nuAltoFila);
//    ArrayPaginacion.push(inFilas);
//    ArrayPaginacion.push(inFilas + inFilas);
//    ArrayPaginacion.push(inFilas + inFilas + inFilas);
//}

//function NumeroInicialFilasResize() {
//    inFilas = Math.floor(($(window).height() - 330) / nuAltoFila);
//    inFilas = inFilas - 1;
//    ActualizarPageSizeGrillasTab("tbEmpleado", inFilas);

//}

function GenerarBotones(id, nombre, obj_button, tipo) {
    
    var obj_id = id;
    var obj_des = nombre;
    var evento = obj_button.P_Evento;
    var icono = obj_button.P_Icono;
    var button = obj_button.P_Button;
    var value = obj_button.P_Value;
    var disabled = obj_button.P_Disabled;
    var vcBotones = '<button id="btnDom_' + obj_id + '" type="button" class="btn btn-sm btn-' + button + '" ' + disabled + ' onclick="javascript:' + evento + '(\'' + obj_id + '\',\'' + obj_des + '\',' + tipo + ');" style="margin: 5px;"><span class="fa fa-' + icono + '" aria-hidden="true"></span> ' + value + '</button>';
    return vcBotones;

}

function fnCargarDatosEmpleados() {
    $("#tbEmpleado").GridUnload();
    var columnas = [
                { name: 'IDEMPLEADO', label: 'Código', index: 'IDEMPLEADO', width: 60, hidden: false, align: "center", key: true },
                {
                    name: 'NOMEMPLEADO', label: 'Empleado', index: 'NOMEMPLEADO', width: 150, hidden: false, align: "left"//, formatter: function (value, options, rData) {
                    //return '<span onclick="javascript:fnMostrarAplicaciones(' + rData.IMEI + ');" style="cursor: hand; cursor: pointer; text-decoration: underline; color: rgb(0, 133, 151);">' + rData.IMEI + '</span>';
                    //}
                },
                {
                    name: 'NOMORGA', label: 'Organización', index: 'NOMORGA', width: 100, hidden: false, align: "left"
                },
                {
                    name: 'NOMGRUPOEMP', label: 'Grupo Empleado', index: 'NOMGRUPOEMP', width: 100, hidden: false, align: "left"
                },
                {
                    name: 'DISPOSITIVOSAPP', index: 'DISPOSITIVOSAPP', label: 'Dispositivos Administrados', hidden: false, width: 60, align: 'center', resizable: false,
                    formatter: function (value, options, rData) {
                        var buttonItems = new ButtonItems();
                        buttonItems.P_Evento = "fnMostrarDispositivosAdministrados";
                        buttonItems.P_Icono = "mobile";
                        buttonItems.P_Button = "success";
                        buttonItems.P_Value = " Ver";
                        return GenerarBotones(rData.IDEMPLEADO, rData.NOMEMPLEADO, buttonItems);
                    }
                },
                {
                    name: 'COD', index: 'COD', label: 'Generar Código', hidden: false, width: 80, align: 'center', resizable: false,
                    formatter: function (value, options, rData) {
                        var buttonItems = new ButtonItems();
                        buttonItems.P_Evento = "fnGenerarCodigo";
                        buttonItems.P_Icono = "mobile";
                        buttonItems.P_Button = "primary";
                        buttonItems.P_Value = " Código";
                        return GenerarBotones(rData.IDEMPLEADO, rData.NOMEMPLEADO, buttonItems, 1);
                    }
                },
                {
                    name: 'CODIGO', label: 'Código de Activación', index: 'CODIGO', width: 80, hidden: false, align: "center"
                }

    ];
    
    $.ajax({
        type: "POST",
        url: "MDM_Principal.aspx/ListarEmpleados",
        data: "",
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (result) {
            if ($(result.d).length > 0) {
                var resul = result.d;
                if (resul[0] == "1") {
                    Mensaje("<br/><h1>No existe registros en los parámetros seleccionados.</h1>", document, null);
                    //                $("#dvGrupoCuenta").hide();
                    //                $("#dvPanel").hide();
                    $("#dvEmpleado").hide();
                } else {
                    $("#dvEmpleado").show();
                    var datos = JSON.parse(resul[1]);
                }
                
                $("#tbEmpleado").jqGrid({
                    datatype: "local",
                    colModel: columnas,
                    data: datos,
                    sortname: "IDEMPLEADO",
                    sortorder: "asc",
                    width: $(window).width() - 55,
                    height: $(window).height() - 170,
                    loadtext: 'Cargando datos...',
                    recordtext: "{0} - {1} de {2} elementos",
                    emptyrecords: 'No hay resultados',
                    pgtext: 'Pág: {0} de {1}',
                    rownumbers: true,
                    //gridview: true,
                    //rowNum: 10000,
                    rowList: [10, 20, 50, 100],
                    rowNum: 10,//inFilas,
                    shrinkToFit: true,
                    viewrecords: true,
                    hidegrid: false,
                    sortable: true,
                    ignoreCase: true,
                    //caption: "Relación de Empleados",
                    pager: "#PaginadorEmpleado"
                }).navGrid("#PaginadorEmpleado", { edit: false, add: false, search: false, del: false, afterRefresh: function () { SearchByAppName("tbEmpleado"); } });
                SearchByAppName("tbEmpleado");
            } else {
                Mensaje("<br/><h1>No existe registros en los parámetros seleccionados.</h1>", document, null);
                //                $("#dvGrupoCuenta").hide();
                //                $("#dvPanel").hide();
                $("#dvEmpleado").hide();
            }
            //var columnNames = $("#tbEmpleado").jqGrid('getGridParam', 'colModel');
            //debugger;
            //$('select#ddlBusqueda').empty()
            //for (var columnModelIndex in columnNames) {
            //    var columnModel = columnNames[columnModelIndex];
            //    if (!columnModel.hidden && columnModel.label != null && columnModel.resizable == true) {
            //        $("select#ddlBusqueda").append($("<option>")
            //        .val(columnModel.name)
            //        .html(columnModel.label)
            //    );
            //    }
            //}
            SettingColumnName("tbEmpleado");
        }, // ==============================================================================================================================
        error: function (xhr, err, thrErr) {
            // ==============================================================================================================================
            MostrarErrorAjax(xhr, err, thrErr);
            // ==============================================================================================================================
        }
    });
}

function fnCargarDatosModelos() {
    $("#tbModelo").GridUnload();
    var columnas = [
                { name: 'IDMODELO', hidden: true, align: "center", key: true },
                {
                    name: 'NOMMODELO', label: 'Modelo', index: 'NOMMODELO', width: 120, hidden: false, align: "left"
                },
                {
                    name: 'NOMMODELOTECNICO', label: 'Modelo Tecnico', index: 'NOMMODELOTECNICO', width: 120, hidden: false, align: "left"
                },
                {
                    name: 'NOMMARCA', label: 'Marca', index: 'NOMMARCA', width: 80, hidden: false, align: "left"
                },
                //{
                //    name: 'Fabricante', label: 'Fabricante', index: 'Fabricante', width: 60, hidden: false, align: "center"
                //},
                {
                    name: 'DISPOSITIVOS', label: 'Dispositivos Existentes', index: 'DISPOSITIVOS', width: 60, hidden: false, align: "center", formatter: function (value, options, rData) {
                        if (rData.DISPOSITIVOS == 0) {
                            return '0';
                        } else {
                            return '<span onclick="javascript:fnMostrarDispositivos(' + rData.IDMODELO + ',\'' + rData.NOMMODELO + '\',\'' + rData.NOMMODELOTECNICO + '\');" style="cursor: hand; cursor: pointer; text-decoration: underline; color: rgb(0, 133, 151);">' + rData.DISPOSITIVOS + '</span>';
                        }
                    }
                },
                {
                    name: 'DISPOSITIVOSAPP', label: 'Dispositivos Administrados', index: 'DISPOSITIVOSAPP', width: 60, hidden: false, align: "center", formatter: function (value, options, rData) {
                        if (rData.DISPOSITIVOSAPP == 0) {
                            return '0';
                        } else {
                            return '<span onclick="javascript:fnMostrarDispositivosAdministrados(' + rData.IDMODELO + ',\'' + rData.NOMMODELO + '\',\'' + rData.NOMMODELOTECNICO + '\',\'1\');" style="cursor: hand; cursor: pointer; text-decoration: underline; color: rgb(0, 133, 151);">' + rData.DISPOSITIVOSAPP + '</span>';
                        }
                    }
                },
                {
                    name: 'APPS', index: 'APPS', label: 'Configurar Aplicaciones', hidden: false, width: "80px", align: 'center', resizable: false,
                    formatter: function (value, options, rData) {
                        var buttonItems = new ButtonItems();
                        buttonItems.P_Evento = "fnMostrarAplicaciones";
                        buttonItems.P_Icono = "android";
                        buttonItems.P_Button = "success";
                        buttonItems.P_Value = " Apps";
                        buttonItems.P_Disabled = (rData.DISPOSITIVOSAPP == "0") ? 'disabled="disabled"' : '';
                        return GenerarBotones(rData.IDMODELO, rData.NOMMODELO, buttonItems);
                    }
                },
                {
                    name: 'ACTAPP', index: 'ACTAPP', label: 'Activar Aplicaciones', hidden: false, width: "80px", align: 'center', resizable: false,
                    formatter: function (value, options, rData) {
                        var buttonItems = new ButtonItems();
                        buttonItems.P_Evento = "fnActivarAplicaciones";
                        buttonItems.P_Icono = "check";
                        buttonItems.P_Button = "success";
                        buttonItems.P_Value = " Todos";
                        buttonItems.P_Disabled = (rData.DISPOSITIVOSAPP == "0") ? 'disabled="disabled"' : '';
                        return GenerarBotones(rData.IDMODELO, rData.NOMMODELO, buttonItems);
                    }
                },
                {
                    name: 'DESAPP', index: 'DESAPP', label: 'Desactivar Aplicaciones', hidden: false, width: "80px", align: 'center', resizable: false,
                    formatter: function (value, options, rData) {
                        var buttonItems = new ButtonItems();
                        buttonItems.P_Evento = "fnDesactivarAplicaciones";
                        buttonItems.P_Icono = "close";
                        buttonItems.P_Button = "danger";
                        buttonItems.P_Value = " Todos";
                        buttonItems.P_Disabled = (rData.DISPOSITIVOSAPP == "0") ? 'disabled="disabled"' : '';
                        return GenerarBotones(rData.IDMODELO, rData.NOMMODELO, buttonItems);
                    }
                },
                {
                    name: 'EXCEPTO', index: 'EXCEPTO', label: 'Exceptos', hidden: false, width: "80px", align: 'center', resizable: true,
                    formatter: function (value, options, rData) {
                        if (rData.EXCEPTO == true) {
                            return '<button data-toggle="button" onclick="javascript:fnMostrarDispositivosAdministrados(' + rData.IDMODELO + ',\'' + rData.NOMMODELO + '\',\'' + rData.NOMMODELOTECNICO + '\',\'3\');" class="btn btn-default btn-active-info active" type="button" aria-pressed="true"> </button>';
                        }
                        else {
                            return '<button data-toggle="button" class="btn btn-default btn-active-info" disabled="disabled" type="button" aria-pressed="false"> </button>';
                        }
                    }
                },
                {
                    name: 'COD', index: 'COD', label: 'Generar Código', hidden: false, width: "100px", align: 'center', resizable: false,
                    formatter: function (value, options, rData) {
                        var buttonItems = new ButtonItems();
                        buttonItems.P_Evento = "fnGenerarCodigoMasivo";
                        buttonItems.P_Icono = "mobile";
                        buttonItems.P_Button = "primary";
                        buttonItems.P_Value = " Código";
                        buttonItems.P_Disabled = (rData.DISPOSITIVOS == "0") ? 'disabled="disabled"' : '';
                        return GenerarBotones(rData.IDMODELO, rData.NOMMODELO, buttonItems);
                    }
                },
                //},
                //{ name: 'EstadoDispositivo', label: 'Estado Dispositivo', index: 'EstadoDispositivo', width: 60, hidden: false, align: "left" },

    ];

    $.ajax({
        type: "POST",
        url: "MDM_Principal.aspx/ListarModelos",
        data: "",
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (result) {
            if ($(result.d).length > 0) {
                var resul = result.d;
                if (resul[0] == "1") {
                    Mensaje("<br/><h1>No existe registros en los parámetros seleccionados.</h1>", document, null);
                    //                $("#dvGrupoCuenta").hide();
                    //                $("#dvPanel").hide();
                    $("#dvModeloDispositivo").hide();
                } else {
                    $("#dvModeloDispositivo").show();
                    var datos = JSON.parse(resul[1]);
                }

                tbGrupoCuenta = $("#tbModelo").jqGrid({
                    datatype: "local",
                    colModel: columnas,
                    data: datos,
                    sortname: "DISPOSITIVOSAPP",
                    sortorder: "desc",
                    width: $(window).width() - 55,
                    height: $(window).height() - 170,
                    loadtext: 'Cargando datos...',
                    recordtext: "{0} - {1} de {2} elementos",
                    emptyrecords: 'No hay resultados',
                    pgtext: 'Pág: {0} de {1}',
                    rownumbers: true,
                    //gridview: true,
                    //rowNum: 10000,
                    rowList: [10, 20, 50, 100],
                    rowNum: 10,//inFilas,
                    shrinkToFit: true,
                    viewrecords: true,
                    hidegrid: false,
                    sortable: true,
                    ignoreCase: true,
                    //caption: "Relación de Modelos de Dispositivos " ,
                    pager: "#PaginadorModelo"
                }).navGrid("#PaginadorModelo", { edit: false, add: false, search: false, del: false, afterRefresh: function () { SearchByAppName("tbModelo"); } });
                SearchByAppName("tbModelo");
            } else {
                Mensaje("<br/><h1>No existe registros en los parámetros seleccionados.</h1>", document, null);
                //                $("#dvGrupoCuenta").hide();
                //                $("#dvPanel").hide();
                $("#dvModeloDispositivo").hide();
            }
            //var columnNames = $("#tbModelo").jqGrid('getGridParam', 'colModel');
            //debugger;
            //$('select#ddlBusqueda').empty()
            //for (var columnModelIndex in columnNames) {
            //    var columnModel = columnNames[columnModelIndex];
            //    if (!columnModel.hidden && columnModel.label != null && columnModel.resizable == true) {
            //        $("select#ddlBusqueda").append($("<option>")
            //        .val(columnModel.name)
            //        .html(columnModel.label)
            //    );
            //    }
            //}
            SettingColumnName("tbModelo");
        }, // ==============================================================================================================================
        error: function (xhr, err, thrErr) {
            // ==============================================================================================================================
            MostrarErrorAjax(xhr, err, thrErr);
            // ==============================================================================================================================
        }
    });
}

function GenerarBotones2(obj_data, obj_button) {

    var obj_id = obj_data.IMEI;
    var obj_des = obj_data.IMEI;
    var evento = obj_button.P_Evento;
    var icono = obj_button.P_Icono;
    var button = obj_button.P_Button;
    var value = obj_button.P_Value;
    var vcBotones = '<button id="btnDom_' + obj_id + '" type="button" class="btn btn-sm btn-' + button + '" onclick="javascript:' + evento + '(' + obj_id + ',\'' + obj_des + '\');" style="margin: 5px;"><span class="fa fa-' + icono + '" aria-hidden="true"></span> ' + value + '</button>';
    return vcBotones;

}

function fnCargarDatosDispositivos() {
    $("#tbDispositivo").GridUnload();
    var columnas = [
                {
                    name: 'IMEI', label: 'IMEI', index: 'IMEI', width: 140, hidden: false, align: "center"//, key: true
                },
                {   
                    name: 'LINEA', label: 'Línea', index: 'LINEA', width: 100, hidden: false, align: "center"
                },
                {
                    name: 'MARCA', label: 'Marca', index: 'MARCA', width: 100, hidden: false, align: "left"
                },
                {
                    name: 'MODELO', label: 'Modelo', index: 'MODELO', width: 100, hidden: false, align: "left"
                },

                { name: 'CODEMPLEADO', label: 'Cód. Empleado', index: 'CODEMPLEADO', width: 100, hidden: false, align: "center" },
                
                {
                    name: 'EMPLEADO', label: 'Empleado', index: 'EMPLEADO', width: 200, hidden: false, align: "left"//, formatter: function (value, options, rData) {
                    //return '<span onclick="javascript:fnMostrarAplicaciones(' + rData.IMEI + ');" style="cursor: hand; cursor: pointer; text-decoration: underline; color: rgb(0, 133, 151);">' + rData.IMEI + '</span>';
                    //}
                }
                ,
                {
                    name: 'CODIGO', label: 'Código de Activación', index: 'CODIGO', width: 100, hidden: false, align: "center"
                }
                ,
                {
                    name: 'COD', index: 'COD', label: 'Generar Código', hidden: false, width: 90, align: 'center', resizable: false,
                    formatter: function (value, options, rData) {
                        var buttonItems = new ButtonItems();
                        buttonItems.P_Evento = "fnGenerarCodigo";
                        buttonItems.P_Icono = "mobile";
                        buttonItems.P_Button = "primary";
                        buttonItems.P_Value = " Código";
                        return GenerarBotones(rData.IMEI, rData.IMEI, buttonItems, 2);
                    }
                },
                {
                    name: 'APPADMIN', index: 'APPADMIN', label: 'Equipo Administrado', hidden: false, width: "80px", align: 'center', resizable: true,
                    formatter: function (value, options, rData) {
                        if (rData.APPADMIN == true) {
                            return '<span class="fa fa-check" style="font-size: 15px;"></span>'
                            //return '<button data-toggle="button" class="btn btn-default btn-active-info active" type="button" aria-pressed="true"> </button>';
                        }
                        else {
                            return '<span class="fa fa-times" style="font-size: 15px;"></span>'
                            //return '<button data-toggle="button" class="btn btn-default btn-active-info" disabled="disabled" type="button" aria-pressed="false"> </button>';
                        }
                    }
                }
                ,
                {
                    name: 'APPS', index: 'APPS', label: 'Configurar Apps', hidden: false, width: "80px", align: 'center', resizable: false,
                    formatter: function (value, options, rData) {
                        var buttonItems = new ButtonItems();
                        buttonItems.P_Evento = "fnMostrarAplicaciones2";
                        buttonItems.P_Icono = "android";
                        buttonItems.P_Button = "success";
                        buttonItems.P_Value = " Apps";
                        return GenerarBotones2(rData, buttonItems);
                    }
                },
                {
                    name: 'ACTAPP', index: 'ACTAPP', label: 'Activar Apps', hidden: false, width: "80px", align: 'center', resizable: false,
                    formatter: function (value, options, rData) {
                        var buttonItems = new ButtonItems();
                        buttonItems.P_Evento = "fnActivarAplicaciones2";
                        buttonItems.P_Icono = "check";
                        buttonItems.P_Button = "success";
                        buttonItems.P_Value = " Todos";
                        return GenerarBotones2(rData, buttonItems);
                    }
                },
                {
                    name: 'DESAPP', index: 'DESAPP', label: 'Desactivar Apps', hidden: false, width: "80px", align: 'center', resizable: false,
                    formatter: function (value, options, rData) {
                        var buttonItems = new ButtonItems();
                        buttonItems.P_Evento = "fnDesactivarAplicaciones2";
                        buttonItems.P_Icono = "close";
                        buttonItems.P_Button = "danger";
                        buttonItems.P_Value = " Todos";
                        return GenerarBotones2(rData, buttonItems);
                    }
                }

    ];

    $.ajax({
        type: "POST",
        url: "MDM_Principal.aspx/ListarDispositivos",
        data: "",
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (result) {
            if ($(result.d).length > 0) {
                //debugger;
                var resul = result.d;
                if (resul[0] == "1") {
                    Mensaje("<br/><h1>No existe registros en los parámetros seleccionados.</h1>", document, null);
                    $("#dvDispositivoLista").hide();
                } else {
                    $("#dvDispositivoLista").show();
                    var datos = JSON.parse(resul[1]);
                    ListaDispositivos = datos;
                }

                $("#tbDispositivo").jqGrid({
                    datatype: "local",
                    colModel: columnas,
                    data: datos,
                    sortname: "IMEI",
                    sortorder: "asc",
                    width: $(window).width() - 55,
                    height: $(window).height() - 170,
                    loadtext: 'Cargando datos...',
                    recordtext: "{0} - {1} de {2} elementos",
                    emptyrecords: 'No hay resultados',
                    pgtext: 'Pág: {0} de {1}',
                    rownumbers: true,
                    rowList: [10, 20, 50, 100],
                    rowNum: 10,
                    shrinkToFit: true,
                    viewrecords: true,
                    hidegrid: false,
                    sortable: true,
                    ignoreCase: true,
                    pager: "#PaginadorDispositivo"
                }).navGrid("#PaginadorDispositivo", { edit: false, add: false, search: false, del: false, afterRefresh: function () { SearchByAppName("tbDispositivo"); } });
                SearchByAppName("tbDispositivo");
            } else {
                Mensaje("<br/><h1>No existe registros en los parámetros seleccionados.</h1>", document, null);
                $("#dvDispositivoLista").hide();
            }
            SettingColumnName("tbDispositivo");
        }, // ==============================================================================================================================
        error: function (xhr, err, thrErr) {
            // ==============================================================================================================================
            MostrarErrorAjax(xhr, err, thrErr);
            // ==============================================================================================================================
        }
    });
}

function fnMostrarDispositivos(id, nombre, nombretecnico) {
    var $width;
    var $height;
    var $Pagina;
    var titulo = "Dispositivos Asociados al Modelo: [ " + nombre + " ]";

    $width = 900;
    $height = 500;

    if ($(window).width() <= $width) {
        $width = $(window).width() - 20;
    }

    if ($(window).height() <= $height) {
        $height = $(window).height() - 50;
    }

    $Pagina = 'MDM_DispositivoVista.aspx?IdModelo=' + id + '&vcTecnico=' + nombretecnico;

    $("#ifDispositivo").width($width - 10);
    $("#ifDispositivo").height($height - 35);
    $("#ifDispositivo").attr("src", $Pagina);

    ModalDispositivos = $("#dvDispositivo").dialog({
        title: titulo,
        width: $width,
        height: $height,
        modal: true,
        resizable: false
    });
}

function fnMostrarDispositivosAdministrados(id, nombre, nombretecnico, tipo) {

    var $width;
    var $height;
    var $Pagina;
    nombretecnico = (nombretecnico == 'undefined' || nombretecnico == undefined || nombretecnico == null) ? "" : nombretecnico;
    tipo = (tipo == 'undefined' || tipo == undefined || tipo == null) ? "2" : tipo;
    
    switch (tipo) {
        case "1":
            titulo = "Dispositivos Asociados al Modelo: [ " + nombre + " ]";
        case "2":
            titulo = "Dispositivos Asociados al Empleado: [ " + nombre + " ]";
        case "3":
            titulo = "Dispositivos Exceptos Asociados al Modelo: [ " + nombre + " ]";
        default:
    }

    $width = 1200;
    $height = 560;

    if ($(window).width() <= $width) {
        $width = $(window).width() - 50;
    }

    if ($(window).height() <= $height) {
        $height = $(window).height() - 100;
    }

    $Pagina = 'MDM_Dispositivo.aspx?IdFiltro=' + id + '&IdTipoFiltro=' + tipo + '&vcTecnico=' + nombretecnico;

    $("#ifDispositivo").width($width - 10);
    $("#ifDispositivo").height($height - 40);
    $("#ifDispositivo").attr("src", $Pagina);

    ModalDispositivos = $("#dvDispositivo").dialog({
        title: titulo,
        width: $width,
        height: $height,
        modal: true,
        resizable: false
    });
}

function fnMostrarAplicaciones(IdModelo, NomModelo) {
    var $width;
    var $height;
    var $Pagina;
    var titulo = "Aplicativos Asociados al Modelo: [ " + NomModelo + " ]";

    $width = 1000
    $height = 550;
    $Pagina = 'MDM_DispositivoApp.aspx?IdFiltro=' + IdModelo + "&IdTipoFiltro=1";

    $("#ifAplicaciones").width($width - 10);
    $("#ifAplicaciones").height($height - 35);
    $("#ifAplicaciones").attr("src", $Pagina);

    ModalAplicaciones = $("#dvAplicaciones").dialog({
        title: titulo,
        width: $width,
        height: $height,
        modal: true,
        resizable: false
    });
}

function fnMostrarAplicaciones2(IdDispositivo) {
    var $width;
    var $height;
    var $Pagina;
    var titulo = "Aplicativos Asociados al Dispositivo: [ IMEI: " + IdDispositivo + " ]";

    $width = 1000
    $height = 450;

    if ($(window).width() <= $width) {
        $width = $(window).width() - 20;
    }

    if ($(window).height() <= $height) {
        $height = $(window).height() - 20;
    }

    let token = ListaDispositivos.filter(x => x.IMEI === IdDispositivo.toString());
    if (token.length > 0) {
        token = token[0].AUTHTOKEN;
    } else { token = ""; }

    $Pagina = 'MDM_DispositivoApp.aspx?IdFiltro=' + IdDispositivo + "&IdTipoFiltro=2&Token=" + token;

    $("#ifAplicaciones").width($width - 20);
    $("#ifAplicaciones").height($height - 35);
    $("#ifAplicaciones").attr("src", $Pagina);

    ModalDispositivos = $("#dvAplicaciones").dialog({
        title: titulo,
        width: $width,
        height: $height,
        modal: true,
        resizable: false
    });
}

function fnActivarAplicaciones(IdModelo, NomModelo) {
    $("#Mensaje").text("Se activaran todas al apps asociadas al modelo " + NomModelo + ".");
    dialogLiberacion = $("#dvConfirmacion").dialog({
        title: "Activar de Aplicaciones",
        width: 400,
        modal: true,
        resizable: false,
        open: function (event, ui) {
            window.parent.$("#TabOpciones").scrollTop(0);
        },
        buttons: [
            {
                text: "Aceptar",
                click: function () {
                    ActivarAplicaciones(IdModelo);
                }
            },
            {
                text: "Cancelar",
                click: function () {
                    $(this).dialog("close");
                }
            }
        ]
    });
}

function fnActivarAplicaciones2(IdDispositivo, NomDispositivo) {
    $("#Mensaje").text("Se activarán todas las aplicaciones asociadas al dispositivo seleccionado.");
    dialogLiberacion = $("#dvConfirmacion").dialog({
        title: "Activar de Aplicaciones",
        width: 400,
        modal: true,
        resizable: false,
        open: function (event, ui) {
            window.parent.$("#TabOpciones").scrollTop(0);
        },
        buttons: [
            {
                text: "Aceptar",
                click: function () {
                    let token = ListaDispositivos.filter(x => x.IMEI === IdDispositivo.toString());
                    if (token.length > 0) {
                        token = token[0].AUTHTOKEN;
                        ActivarAplicacionesPorDispositivo(IdDispositivo, token);
                    }
                }
            },
            {
                text: "Cancelar",
                click: function () {
                    $(this).dialog("close");
                }
            }
        ]
    });
}

function ActivarAplicacionesPorDispositivo(IdDispositivo, Token) {
    $.ajax({
        type: "POST",
        url: "MDM_Principal.aspx/ActivarAplicacionesPorDispositivo",
        data: "{'IdDispositivo': '" + IdDispositivo + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.d != "0") {
                dialogLiberacion.dialog("close");
                $("#tbModelo").trigger("reloadGrid");
                alerta("Se activaron todas las aplicaciones.");

                if (Token != "" && Token != "0" && Token != null && Token != undefined) {
                    fnSincronizarDispositivo(Token);
                }
            }
            else
                Mensaje("Ocurrio un problema.");
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function ActivarAplicaciones(IdModelo) {
    $.ajax({
        type: "POST",
        url: "MDM_Principal.aspx/ActivarAplicaciones",
        data: "{'IdModelo': '" + IdModelo + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.d != "0") {
                dialogLiberacion.dialog("close");
                $("#tbModelo").trigger("reloadGrid");
                alerta("Se activaron todas las aplicaciones.");

                fnSincronizarTodos();
            }
            else
                Mensaje("Ocurrio un problema.");
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnDesactivarAplicaciones(IdModelo, NomModelo) {
    $("#Mensaje").text("Se desactivaran todas las apps asociadas al modelo " + NomModelo + ".");
    dialogLiberacion = $("#dvConfirmacion").dialog({
        title: "Desactivar de Aplicaciones",
        width: 400,
        modal: true,
        resizable: false,
        open: function (event, ui) {
            window.parent.$("#TabOpciones").scrollTop(0);
        },
        buttons: [
            {
                text: "Aceptar",
                //click: EnviarLineasALiberar
                click: function () {
                    DesactivarAplicaciones(IdModelo);
                }
            },
            {
                text: "Cancelar",
                click: function () {
                    $(this).dialog("close");
                }
            }
        ]
    });
}

function fnDesactivarAplicaciones2(IdDispositivo, NomDispositivo) {
    $("#Mensaje").text("Se desactivarán todas las aplicaciones asociadas al dispositivo seleccionado.");
    dialogLiberacion = $("#dvConfirmacion").dialog({
        title: "Desactivar de Aplicaciones",
        width: 400,
        modal: true,
        resizable: false,
        open: function (event, ui) {
            window.parent.$("#TabOpciones").scrollTop(0);
        },
        buttons: [
            {
                text: "Aceptar",
                //click: EnviarLineasALiberar
                click: function () {
                    let token = ListaDispositivos.filter(x => x.IMEI === IdDispositivo.toString());
                    if (token.length > 0) {
                        token = token[0].AUTHTOKEN;
                        DesactivarAplicacionesPorDispositivo(IdDispositivo, token);
                    }
                }
            },
            {
                text: "Cancelar",
                click: function () {
                    $(this).dialog("close");
                }
            }
        ]
    });
}


function DesactivarAplicacionesPorDispositivo(IdDispositivo, Token) {
    $.ajax({
        type: "POST",
        url: "MDM_Principal.aspx/DesactivarAplicacionesPorDispositivo",
        data: "{'IdDispositivo': '" + IdDispositivo + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d != "0") {
                dialogLiberacion.dialog("close");
                $("#tbModelo").trigger("reloadGrid");
                alerta("Se desactivaron todas las aplicaciones.");
            
                if (Token != "" && Token != "0" && Token != null && Token != undefined) {
                    fnSincronizarDispositivo(Token);
                }
                
            }
            else
                Mensaje("Ocurrio un problema.");
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function DesactivarAplicaciones(IdModelo) {
    $.ajax({
        type: "POST",
        url: "MDM_Principal.aspx/DesactivarAplicaciones",
        data: "{'IdModelo': '" + IdModelo + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d != "0") {
                dialogLiberacion.dialog("close");
                $("#tbModelo").trigger("reloadGrid");
                alerta("Se desactivaron todas las aplicaciones.");

                fnSincronizarTodos();
                
            }
            else
                Mensaje("Ocurrio un problema.");
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnGenerarCodigoMasivo(IdModelo, NomModelo) {
    $("#Mensaje").html((IdModelo == 0) ? "Se generaran los codigós de activación para todos los empleados." : "Se generaran los codigós de activación para cada dispositivo asociado al modelo " + NomModelo + ". <br/><b>Unicamente a aquellos equipos no administrados.</b>");
    dialogLiberacion = $("#dvConfirmacion").dialog({
        title: "Generar Códigos Masivos",
        width: 400,
        modal: true,
        resizable: false,
        open: function (event, ui) {
            window.parent.$("#TabOpciones").scrollTop(0);
        },
        buttons: [
            {
                text: "Aceptar",
                //click: EnviarLineasALiberar
                click: function () {
                    GenerarCodigosMasivos(IdModelo);
                }
            },
            {
                text: "Cancelar",
                click: function () {
                    $(this).dialog("close");
                }
            }
        ]
    });
}

function GenerarCodigosMasivos(IdModelo) {
    $.ajax({
        type: "POST",
        url: "MDM_Principal.aspx/GenerarCodigoMasivo",
        data: "{'IdModelo': '" + IdModelo + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.d != "0") {
                dialogLiberacion.dialog("close");
                if (IdModelo == 0) {
                    fnCargarDatosEmpleados();
                } else {
                    $("#tbModelo").trigger("reloadGrid");
                }
                
                alerta("Se generaron los codigos de activación.");
            }
            else
                Mensaje("Ocurrio un problema.");
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnGenerarCodigo(Id, Nombre, IdTipo) {
    if (IdTipo == 1) {
        $("#Mensaje").text("Se generar el codigó de activación para el empleado " + Nombre + ".");

        dialogLiberacion = $("#dvConfirmacion").dialog({
            title: "Generar Código",
            width: 400,
            modal: true,
            resizable: false,
            open: function (event, ui) {
                window.parent.$("#TabOpciones").scrollTop(0);
            },
            buttons: [
                {
                    text: "Aceptar",
                    //click: EnviarLineasALiberar
                    click: function () {
                        GenerarCodigo(Id, IdTipo);
                    }
                },
                {
                    text: "Cancelar",
                    click: function () {
                        $(this).dialog("close");
                    }
                }
            ]
        });
    }
    else {


        $.ajax({
            type: "POST",
            url: "MDM_Principal.aspx/ValidarEquipoAdministrado",
            data: "{'IdDispositivo': '" + Id + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                //debugger;
                if (result.d != "0") {
                    $("#Mensaje").html("Este dispositivo ya se encuentra administrado.<br/><b>Al generar un nuevo código se eliminara toda configuración ya echa.</b><br/>");
                    dialogLiberacion = $("#dvConfirmacion").dialog({
                        title: "Generar Código",
                        width: 400,
                        modal: true,
                        resizable: false,
                        open: function (event, ui) {
                            window.parent.$("#TabOpciones").scrollTop(0);
                        },
                        buttons: [
                            {
                                text: "Aceptar",
                                //click: EnviarLineasALiberar
                                click: function () {
                                    GenerarCodigo(Id, IdTipo);
                                }
                            },
                            {
                                text: "Cancelar",
                                click: function () {
                                    $(this).dialog("close");
                                }
                            }
                        ]
                    });
                }
                else {
                    $("#Mensaje").text("Se generar el codigó de activación para el dispositivo " + Nombre + ".");
                    dialogLiberacion = $("#dvConfirmacion").dialog({
                        title: "Generar Código",
                        width: 400,
                        modal: true,
                        resizable: false,
                        open: function (event, ui) {
                            window.parent.$("#TabOpciones").scrollTop(0);
                        },
                        buttons: [
                            {
                                text: "Aceptar",
                                //click: EnviarLineasALiberar
                                click: function () {
                                    GenerarCodigo(Id, IdTipo);
                                }
                            },
                            {
                                text: "Cancelar",
                                click: function () {
                                    $(this).dialog("close");
                                }
                            }
                        ]
                    });
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });

    }

    
}

function GenerarCodigo(Id, IdTipo) {
    $.ajax({
        type: "POST",
        url: "MDM_Principal.aspx/GenerarCodigo",
        data: "{'Id': '" + Id + "', 'IdTipo': '" + IdTipo + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.d != "0") {
                dialogLiberacion.dialog("close");
                if (IdTipo == 1) {
                    fnCargarDatosEmpleados();
                } else {
                    fnCargarDatosDispositivos();
                }
                alerta("Se genero el código de activación.");
            }
            else
                Mensaje("Ocurrio un problema.");
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
    
}


function fnSincronizarTodos() {
    let idgateway = $("#hdfIdGateway").val();
    window.top.SignalCore_fnSincronizarTodos(idgateway);
}

function fnSincronizarDispositivo(authtoken) {
    let idgateway = $("#hdfIdGateway").val();
    window.top.SignalCore_fnSincronizarDispositivo(idgateway, authtoken)
}

