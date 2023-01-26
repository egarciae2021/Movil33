var Busqueda_Valor = '';

$(function () {
    $(".btnNormal").button({});
    $("body").css("overflow", "hidden");


    $(window).resize(function () {
        DimPosElementos();
    });
    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        //$("#dvOrganizacion").css({ height: Alto - 248, width: 290 });

        $("#grid").jqGrid('setGridWidth', parseInt($(window).width()) - 370);
        //$("#grid2").jqGrid('setGridWidth', parseInt($(window).width()) - 370);
        $("#gridbox").css({ height: 260, width: Ancho - 350 });
        //$("#tabInformativo").css({ height: 300, width: Ancho - 350 });
    }
    DimPosElementos();
    iniciar();

    $('#txtBusquedaAbreviatura').keydown(function (event) {
        if (event.keyCode == 13) {
            $('#btnBuscarAbreviatura').click();
        }
    });

    $('#btnBuscarAbreviatura').live('click', function () {
        $('#btnBuscarAbreviatura').val($('#txtBusquedaAbreviatura').val().replace(/\\/g, ''));
        Busqueda_Valor = $('#btnBuscarAbreviatura').val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        $('#grid').trigger('reloadGrid');
    });

    $("#btnAgregarAbreviatura").live("click", function () {
        $("#dvGridListado").hide();
        $("#dvMantenimiento").show();
        $("#chActivo").prop('checked', true);
        $("#hdfCodAbreviatura").val("-1");
        $("#trEstado").hide();
        $("#trCodigo").hide();
        $("#txtDescripcion").focus();
    });

    $('#btnEditarAbreviatura').live('click', function () {
        var id = $("#grid").jqGrid('getGridParam', 'selrow');
        if (id) {
            var datos = $("#grid").jqGrid('getRowData', id);
            var ABRE_inCodigo = datos['Codigo'];
            var ABRE_vcDescripcion = datos['Descripcion'];
            var ABRE_vcAbreviatura = datos['Abreviatura'];
            var ABRE_blEstado = datos['Estado'];

            $("#txtCodigo").val(ABRE_inCodigo);
            $("#trCodigo").show();
            $("#hdfCodAbreviatura").val(ABRE_inCodigo);
            $("#txtCodigo").attr("disabled", "disabled");
            $("#txtDescripcion").val(ABRE_vcDescripcion);
            $("#txtAbreviatura").val(ABRE_vcAbreviatura);
            if (ABRE_blEstado == 'Activo') {
                $("#chActivo").prop('checked', true);
                $("#trEstado").hide();
            } else {
                $("#chActivo").prop('checked', false);
                $("#trEstado").show();
            }
            $("#dvGridListado").hide();
            $("#dvMantenimiento").show();
            $("#txtDescripcion").focus().select();
        } else {
            alerta('Seleccione un registro'); return;
        }
    });

    $('#btnEliminarAbreviatura').live('click', function () {
        var id = $("#grid").jqGrid('getGridParam', 'selrow');
        if (id) {
            var datos = $("#grid").jqGrid('getRowData', id);
            var ABRE_inCodigo = datos['Codigo'];
            $.ajax({
                type: "POST",
                url: "Sin_Mnt_Abreviatura.aspx/EliminarAbreviatura",
                data: "{'pCodAbreviatura': '" + ABRE_inCodigo + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    Mensaje("<br/><h1>Se elimino la Abreviatura </h1><br/>", document);
                    $('#grid').trigger('reloadGrid');
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                    BloquearPagina(false);
                }
            });
        }
        else {
            alerta('Seleccione un registro'); return;
        }
    });

    $('#btnCerrar').live('click', function () {
        $("#dvGridListado").show();
        $("#dvMantenimiento").hide();
        LimpiarControles();
    });

    $('#btnGuardar').live('click', function () {
        if ($("#txtDescripcion").val() == "") {
            alerta('Ingrese la Descripción'); $("#txtDescripcion").focus(); return;
        }

        if ($("#txtAbreviatura").val() == "") {
            alerta('Ingrese la Abreviatura'); $("#txtAbreviatura").focus(); return;
        }

        var CodAbreviatura = $("#hdfCodAbreviatura").val();
        var vcDescripcion = $("#txtDescripcion").val();
        var vcAbreviatura = $("#txtAbreviatura").val();
        var blEstado = $("#chActivo").prop('checked');
        var inEstado;
        if (!blEstado) {
            inEstado = 0;
        } else {
            inEstado = 1;
        }

        var Metodo = ('Sin_Mnt_Abreviatura.aspx/MantenimientoAbreviatura');
        $.ajax({
            url: Metodo,
            data: "{'pCodAbreviatura':'" + CodAbreviatura + "'," +
              "'pDescripcion':'" + vcDescripcion.replace(/'/g, '&#39') + "'," +
              "'pAbreviatura':'" + vcAbreviatura.replace(/'/g, '&#39') + "'," +
              "'pEstado':'" + parseInt(inEstado) + "'}",
            dataType: 'json',
            type: 'post',
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
                if (result.d != "-1") {
                    Mensaje("<br/><h1>Abreviatura guardado</h1><br/>", document, CerroMensaje);
                } else {
                    alerta("Ya existe una abreviatura con el mismo nombre.");
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });

    });
    $(document).ajaxStart(function () { });
});

function LimpiarControles() {
    $("#txtCodigo").val("");
    $("#txtDescripcion").val("");
    $("#txtAbreviatura").val("");
    $("#chActivo").prop('checked', false);
}

function iniciar() {

    $('#grid').jqGrid({
        sortable: true,
        datatype: CargarGrillaAbreviatura,
        jsonReader:
                      {
                          root: 'Items',
                          page: 'PaginaActual',
                          total: 'TotalPaginas',
                          records: 'TotalRegistros',
                          repeatitems: true,
                          cell: 'Row',
                          Id: 'IdEquipo'
                      },
        colModel: [{ name: 'Codigo', index: 'Codigo', label: 'Código', hidden: true },
                    { name: 'Descripcion', index: 'Descripcion', label: 'Descripción', width: 500 },
                    { name: 'Abreviatura', index: 'Abreviatura', label: 'Abreviatura', width: 130 },
                    { name: 'Estado', index: 'Estado', label: 'Estado', width: 80, hidden: true }
                   ],
        pager: '#pager',
        loadtext: 'Cargando datos...',
        recordtext: '{0} - {1} de {2} elementos',
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}',
        rowNum: 15,
        rowList: [15, 30, 45],
        viewrecords: true,
        multiselect: false,
        sortorder: "asc",
        width: 680,
        height: '320',
        rownumbers: true,

        onSelectRow: function (id) {

        },
        ondblClickRow: function (id) {
            $('#btnEditarAbreviatura').click();
        }


    }).navGrid('#pager', { edit: false, add: false, search: false, del: false });
}

function CargarGrillaAbreviatura() {
    var blEstado = $("#hdfEstado").val();
    var inPagTam = $("#grid").getGridParam("rowNum");
    var inPagAct = $("#grid").getGridParam("page");
    var sortOrder = $('#grid').getGridParam("sortorder");
    var CampoOrden = $('#grid').getGridParam("sortname");

    var Metodo = ('Sin_Mnt_Abreviatura.aspx/BuscarRegistroAbreviatura');
    $.ajax({
        url: Metodo,
        data: "{'filtro':'" + Busqueda_Valor.replace(/'/g, '&#39') + "'," +
              "'pEstado':'" + blEstado + "'," +
              "'campoordenar':'" + CampoOrden + "'," +
              "'orden':'" + sortOrder + "'," +
              "'inPagTam':'" + parseInt(inPagTam) + "'," +
              "'inPagAct':'" + parseInt(inPagAct) + "'}",
        dataType: 'json',
        type: 'post',
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            $('#grid').jqGrid('clearGridData');
            if (result.d.Items.length > 0) {
                $('#grid')[0].addJSONData(result.d);
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function CerroMensaje() {
    $("#dvGridListado").show();
    $("#dvMantenimiento").hide();
    LimpiarControles();
    //CargarGrillaAbreviatura();
    $("#grid").trigger("reloadGrid");
}


