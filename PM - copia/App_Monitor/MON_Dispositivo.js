var oCulturaUsuario;
var inFilas;
var nuAltoFila = 23.04;
var ArrayPaginacion = [];
var ModalDispositivos;
var ModalAplicaciones;

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
        debugger;
        var Periodo = $("#ddlTipoVista option:selected").val();
        var $Pagina;
        var $width = $(window).width();
        var $height = $(window).height();

        switch (Periodo) {
            case "1":
                $("#dvDispositivoLista").show();
                $("#btnGenerarCodigoMasivo").hide();
                fnCargarDatosDispositivos();
                break;
            default:
                //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
                break;
        }
    });

    $("#ddlTipoVista2").change(function () {
        debugger;
        var Periodo = $("#ddlTipoVista option:selected").val();
        var $Pagina;
        var $width = $(window).width();
        var $height = $(window).height();

        switch (Periodo) {
            case "1":
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
        $('#ddlTipoVista>option:eq(0)').attr('selected', true);
        $("#ddlTipoVista").change();
    }

    $("#txtBusqueda").on('change keyup paste', function () {
        var grid = ($("#ddlTipoVista option:selected").val() == "1") ? "tbDispositivo" : "tbDispositivo";
        SearchByAppName(grid);
    });
    //NumeroInicialFilas();
})

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

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    switch ($("#ddlTipoVista option:selected").val()) {
        case "1":
            $("#tbDispositivo").setGridWidth($(window).width() - 45);
            $("#tbDispositivo").setGridHeight($(window).height() - 155);
            RecalcularColumnasGrilla("tbDispositivo", false);
            break;
        default:
            break;
    }
}

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
        { name: 'IMEI', label: 'IMEI', index: 'IMEI', width: 140, hidden: false, align: "center", key: true },
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
            name: 'CODIGO', label: 'Código de Activación', index: 'CODIGO', width: 80, hidden: false, align: "center"
        }
        ,
        {
            name: 'COD', index: 'COD', label: 'Generar Código', hidden: false, width: 80, align: 'center', resizable: false,
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
        },
    ];

    let tipovista2 = $("#ddlTipoVista2 option:selected").val()

    $.ajax({
        type: "POST",
        url: "MON_Dispositivo.aspx/ListarDispositivos",
        data: "{'IdTipoVista2': '" + tipovista2 + "'}",
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
                }).navGrid("#PaginadorDispositivo", { edit: false, add: false, search: false, del: false });
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
            url: "MON_Dispositivo.aspx/ValidarEquipoAdministrado",
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
        url: "MON_Dispositivo.aspx/GenerarCodigo",
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
