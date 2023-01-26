var oCulturaUsuario;
var inFilas;
var nuAltoFila = 23.04;
var ArrayPaginacion = [];
var ModalDispositivos;

function ButtonItems(P_Evento, P_Icono, P_Value, P_Button) {
    this.P_Evento = P_Evento;
    this.P_Icono = P_Icono;
    this.P_Value = P_Value;
    this.P_Button = P_Button;
}

$(function () {
    oCulturaUsuario = window.parent.parent.parent.oCulturaUsuario;

    Init();

    $(window).resize(function () {
        DimPosElementos();
    });

    function Init() {
        fnCargarDatos();
    }


    //NumeroInicialFilas();
    $("#txtBusqueda").on('change keyup paste', function () {
        var grid = ($("#ddlTipoVista option:selected").val() == "1") ? "tbModelo" : ($("#ddlTipoVista option:selected").val() == "2") ? "tbEmpleado" : "tbDispositivo";
        SearchByAppName(grid);
    });
})

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    $("#tbDispositivo").setGridWidth($(window).width() - 50);
    $("#tbDispositivo").setGridHeight($(window).height() - 130);
    RecalcularColumnasGrilla("tbDispositivo", false);
    NumeroInicialFilasResize();
}
//function NumeroInicialFilas() {
//    ArrayPaginacion = [];
//    inFilas = Math.floor(($(window).height() - 250) / nuAltoFila);

//    ArrayPaginacion.push(inFilas);
//    ArrayPaginacion.push(inFilas + inFilas);
//    ArrayPaginacion.push(inFilas + inFilas + inFilas);
//}

//function NumeroInicialFilasResize() {
//    inFilas = Math.floor(($(window).height() - 320) / nuAltoFila);
//    inFilas = inFilas - 1;
//    ActualizarPageSizeGrillasTab("tbDispositivo", inFilas);

//}

function GenerarBotones(obj_data, obj_button) {

    var obj_id = obj_data.IMEI;
    var obj_des = obj_data.IMEI;
    var evento = obj_button.P_Evento;
    var icono = obj_button.P_Icono;
    var button = obj_button.P_Button;
    var value = obj_button.P_Value;
    var vcBotones = '<button id="btnDom_' + obj_id + '" type="button" class="btn btn-sm btn-' + button + '" onclick="javascript:' + evento + '(' + obj_id + ',\'' + obj_des + '\');" style="margin: 5px;"><span class="fa fa-' + icono + '" aria-hidden="true"></span> ' + value + '</button>';
    return vcBotones;

}

function fnCargarDatos() {
    var columnas = [
                //{ name: 'IMEI', label: 'IMEI', index: 'IMEI', width: 110, hidden: false, align: "center", key: true },

                {
                    name: 'LINEA', label: 'Linea', index: 'LINEA', width: 60, hidden: false, align: "center"
                },
                {
                    name: 'IMEI', label: 'IMEI', index: 'IMEI', width: 100, hidden: false, align: "center", key: true, formatter: function (value, options, rData) {
                        return '<span onclick="javascript:fnMostrarAplicaciones(' + rData.IMEI + ');" style="cursor: hand; cursor: pointer; text-decoration: underline; color: rgb(0, 133, 151);">' + rData.IMEI + '</span>';
                    }
                },
                {
                    name: 'EMPLEADO', label: 'Empleado', index: 'EMPLEADO', width: 150, hidden: false, align: "left"
                },
                //{
                //    name: 'NOMGRUPOEMP', label: 'Grupo Empleado', index: 'NOMGRUPOEMP', width: 100, hidden: false, align: "left"
                //},
                {
                    name: 'MARCA', label: 'Marca', index: 'MARCA', width: 80, hidden: false, align: "left"
                },
                {
                    name: 'APPS', index: 'APPS', label: 'Configurar Aplicaciones', hidden: false, width: "80px", align: 'center', resizable: false,
                    formatter: function (value, options, rData) {
                        var buttonItems = new ButtonItems();
                        buttonItems.P_Evento = "fnMostrarAplicaciones";
                        buttonItems.P_Icono = "android";
                        buttonItems.P_Button = "success";
                        buttonItems.P_Value = " Apps";
                        return GenerarBotones(rData, buttonItems);
                    }
                },
                {
                    name: 'ACTAPP', index: 'ACTAPP', label: 'Activar Aplicaciones', hidden: false, width: "120px", align: 'center', resizable: false,
                    formatter: function (value, options, rData) {
                        var buttonItems = new ButtonItems();
                        buttonItems.P_Evento = "fnActivarAplicaciones";
                        buttonItems.P_Icono = "check";
                        buttonItems.P_Button = "success";
                        buttonItems.P_Value = " Todos";
                        return GenerarBotones(rData, buttonItems);
                    }
                },
                {
                    name: 'DESAPP', index: 'DESAPP', label: 'Desactivar Aplicaciones', hidden: false, width: "120px", align: 'center', resizable: false,
                    formatter: function (value, options, rData) {
                        var buttonItems = new ButtonItems();
                        buttonItems.P_Evento = "fnDesactivarAplicaciones";
                        buttonItems.P_Icono = "close";
                        buttonItems.P_Button = "danger";
                        buttonItems.P_Value = " Todos";
                        return GenerarBotones(rData, buttonItems);
                    }
                }

    ];
    var IdFiltro = $("#hdfIdFiltro").val();
    var IdTipoFiltro = $("#hdfIdTipoFiltro").val();
    var vcTecnico = $("#hdfvcTecnico").val();
    $.ajax({
        type: "POST",
        url: "MDM_Dispositivo.aspx/Listar",
        data: "{'inIdFiltro': '" + IdFiltro + "'," +
               "'inIdTipoFiltro': '" + IdTipoFiltro + "'," +
               "'invcTecnico': '" + vcTecnico + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (result) {
            if ($(result.d).length > 0) {
                var resul = result.d;
                if (resul[0] == "1") {
                    window.parent.ModalDispositivos.dialog("close");
                    Mensaje("<br/><h1>No existe registros en los parámetros seleccionados.</h1>", document, null);
                    //$("#dvDispositivo").hide();
                } else {
                    $("#dvFiltros").show();
                    $("#dvDispositivo").show();
                    var datos = JSON.parse(resul[1]);
                }

                tbGrupoCuenta = $("#tbDispositivo").jqGrid({
                    datatype: "local",
                    colModel: columnas,
                    data: datos,
                    sortname: "IMEI",
                    sortorder: "asc",
                    width: $(window).width() - 45,
                    height: $(window).height() - 150,
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
                    //caption: "Relación de Dispositivos con App Instalada",
                    pager: "#PaginadorDispositivo"
                }).navGrid("#PaginadorDispositivo", { edit: false, add: false, search: false, del: false });
            } else {
                //debugger;
                window.parent.ModalDispositivos.dialog("close");
                Mensaje("<br/><h1>No existe registros en los parámetros seleccionados.</h1>", document, null);
                //$("#dvDispositivo").hide();
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

function fnMostrarAplicaciones(IdDispositivo) {
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

    $Pagina = 'MDM_DispositivoApp.aspx?IdFiltro=' + IdDispositivo + "&IdTipoFiltro=2";

    $("#ifAplicaciones").width($width - 0);
    $("#ifAplicaciones").height($height - 30);
    $("#ifAplicaciones").attr("src", $Pagina);

    ModalDispositivos = $("#dvAplicaciones").dialog({
        title: titulo,
        width: $width,
        height: $height,
        modal: true,
        resizable: false
    });
}

function fnActivarAplicaciones(IdDispositivo, NomDispositivo) {
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
                    ActivarAplicaciones(IdDispositivo);
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

function ActivarAplicaciones(IdDispositivo) {
    $.ajax({
        type: "POST",
        url: "MDM_Dispositivo.aspx/ActivarAplicaciones",
        data: "{'IdDispositivo': '" + IdDispositivo + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d != "0") {
                dialogLiberacion.dialog("close");
                $("#tbDispositivo").trigger("reloadGrid");
                alerta("Se activaron todas las aplicaciones.");
            }
            else
                Mensaje("Ocurrio un problema.");
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnDesactivarAplicaciones(IdDispositivo, NomDispositivo) {
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
                    DesactivarAplicaciones(IdDispositivo);
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

function DesactivarAplicaciones(IdDispositivo) {
    $.ajax({
        type: "POST",
        url: "MDM_Dispositivo.aspx/DesactivarAplicaciones",
        data: "{'IdDispositivo': '" + IdDispositivo + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d != "0") {
                dialogLiberacion.dialog("close");
                $("#tbDispositivo").trigger("reloadGrid");
                alerta("Se desactivaron todas las aplicaciones.");
            }
            else
                Mensaje("Ocurrio un problema.");
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function SettingColumnName(grid) {
    var columnNames = $('#' + grid + '').jqGrid('getGridParam', 'colModel');
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