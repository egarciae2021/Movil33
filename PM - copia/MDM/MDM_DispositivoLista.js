var oCulturaUsuario;
var inFilas;
var nuAltoFila = 23.04;
var ArrayPaginacion = [];
var ModalDispositivos;

$(function () {
    oCulturaUsuario = window.parent.parent.parent.oCulturaUsuario;

    Init();

    $(window).resize(function () {
        DimPosElementos();
    });

    function Init() {
        fnCargarDatos();
    }


    NumeroInicialFilas();

})

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    $("#tbEmpleado").setGridWidth($(window).width() - 55);
    $("#tbEmpleado").setGridHeight($(window).height() - 120);
    RecalcularColumnasGrilla("tbEmpleado", false);
    NumeroInicialFilasResize();
}
function NumeroInicialFilas() {
    ArrayPaginacion = [];
    inFilas = Math.floor(($(window).height() - 300) / nuAltoFila);
    ArrayPaginacion.push(inFilas);
    ArrayPaginacion.push(inFilas + inFilas);
    ArrayPaginacion.push(inFilas + inFilas + inFilas);
}

function NumeroInicialFilasResize() {
    inFilas = Math.floor(($(window).height() - 330) / nuAltoFila);
    inFilas = inFilas - 1;
    ActualizarPageSizeGrillasTab("tbEmpleado", inFilas);

}

function GenerarBotones(id, desc, nombre, button, icono) {

    var vcBotones = '<button id="btnDom_' + id + '" type="button" class="btn btn-sm btn-' + button + '" onclick="javascript:fnMostrarDispositivosAdministrados(\'' + id + '\',\'' + desc + '\');" style="margin: 5px;"><span class="fa fa-' + icono + '" aria-hidden="true"></span> ' + nombre + '</button>';
    return vcBotones;

}

function fnCargarDatos() {
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
                    name: 'DIS', index: 'DIS', label: 'Ver Dispositivos', hidden: false, width: "120px", align: 'center', resizable: false,
                    formatter: function (value, options, rData) {
                        return GenerarBotones(rData.IDEMPLEADO, rData.NOMEMPLEADO, " Ver", "success", "mobile");
                    }
                },
                {
                    name: 'COD', index: 'COD', label: 'Generar Código', hidden: false, width: 80, align: 'center', resizable: false,
                    formatter: function (value, options, rData) {
                        return GenerarBotones(rData.IDEMPLEADO, rData.NOMEMPLEADO, "Código", "primary", "mobile");
                    }
                },
                {
                    name: 'CODIGO', label: 'Código de Activación', index: 'CODIGO', width: 80, hidden: false, align: "center"
                }

    ];

    $.ajax({
        type: "POST",
        url: "MDM_Empleado.aspx/Listar",
        data: "",
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
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

                tbGrupoCuenta = $("#tbEmpleado").jqGrid({
                    datatype: "local",
                    colModel: columnas,
                    data: datos,
                    sortname: "IDEMPLEADO",
                    sortorder: "asc",
                    width: $(window).width() - 45,
                    height: $(window).height() - 115,
                    loadtext: 'Cargando datos...',
                    recordtext: "{0} - {1} de {2} elementos",
                    emptyrecords: 'No hay resultados',
                    pgtext: 'Pág: {0} de {1}',
                    rownumbers: true,
                    //gridview: true,
                    //rowNum: 10000,
                    rowList: [10, 20, 50, 100],
                    rowNum: inFilas,
                    shrinkToFit: true,
                    viewrecords: true,
                    hidegrid: false,
                    sortable: true,
                    //caption: "Relación de Empleados",
                    pager: "#PaginadorEmpleado"
                }).navGrid("#PaginadorEmpleado", { edit: false, add: false, search: false, del: false });
            } else {
                Mensaje("<br/><h1>No existe registros en los parámetros seleccionados.</h1>", document, null);
                //                $("#dvGrupoCuenta").hide();
                //                $("#dvPanel").hide();
                $("#dvEmpleado").hide();
            }

        }, // ==============================================================================================================================
        error: function (xhr, err, thrErr) {
            // ==============================================================================================================================
            MostrarErrorAjax(xhr, err, thrErr);
            // ==============================================================================================================================
        }
    });
}

function fnMostrarDispositivosAdministrados(IdEmpleado, NomEmpleado) {
    var $width;
    var $height;
    var $Pagina;
    var titulo = "Dispositivos Asociados al Empleado: [ " + NomEmpleado + " ]";

    $width = 1200;
    $height = 480;
    $Pagina = 'MDM_Dispositivo.aspx?IdFiltro=' + IdEmpleado + "&IdTipoFiltro=2";

    $("#ifDispositivo").width($width - 0);
    $("#ifDispositivo").height($height - 30);
    $("#ifDispositivo").attr("src", $Pagina);

    ModalDispositivos = $("#dvDispositivo").dialog({
        title: titulo,
        width: $width,
        height: $height,
        modal: true,
        resizable: false
    });
}