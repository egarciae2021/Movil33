var subgrid_table_id, pager_id;
var modeloDetalleConsulta = [
               	{ name: 'Id', index: 'Id', label: 'Id', hidden: true, width: 50 },
                { name: 'GrupoConcepto', index: 'GrupoConcepto', label: 'Grupo Concepto', hidden: false, width: 150, },
                { name: 'Concepto', index: 'Concepto', label: 'Concepto', hidden: false, width: 300 },
                { name: 'Consumo', index: 'Consumo', label: 'Consumo', hidden: false, width: 100, align: 'right' },
                { name: 'Monto', index: 'Monto', label: 'Monto', hidden: false, width: 100, align: 'right' },
];

function Actualizar() {
    location.reload();
}
var p_mesPer;
var vcCodCue;

var widthGrid = 920;
var heigthGrid = 210;
var HeightGrid_Grupo = 380;
var tab;


var inFilas;
var nuAltoFila = 23.04;
var ArrayPaginacion = [];

var NumConsulta = 1;

function ENT_GEN_ResumenDetalle(p_vcNum, p_vcCodCue, p_vcCodOpe, p_vcPer, idConcepto, idGrupo) {
    this.p_vcNum = p_vcNum;
    this.p_vcCodCue = p_vcCodCue;
    this.p_vcCodOpe = p_vcCodOpe;
    this.p_vcPer = p_vcPer;
    this.idConcepto = idConcepto;
    this.idGrupo = idGrupo;
}

$(function () {

    NumeroInicialFilas();

    Modelo_TablaConsulta_();

    //    Cabecera_Resumen_();

    $(window).resize(function () {
        DimPosElementos();
    });
    DimPosElementos();

});

function DimPosElementos() {

    $("#tbConsulta").setGridWidth($(window).width() - 50);
    $("#tbConsulta").setGridHeight($(window).height() - 115 - 20);
    NumeroInicialFilas();

    var Alto = $(window).height();
    var Ancho = $(window).width();
    $("#TabDetalle").css({ height: Alto - 81, width: Ancho - 200 });
}

function AbrirConsulta(id) {

    var datos = $("#tbConsulta").jqGrid('getRowData', (id - 1));
    var Periodo = datos.Periodo.replace("-20", "");

    var oResumenDetalle = new ENT_GEN_ResumenDetalle();
    oResumenDetalle.p_vcNum = datos.vcNum;              // datos.vcGrupo01;
    oResumenDetalle.p_vcCodCue = datos.vcCodCue;        //datos.vcGrupo02;
    oResumenDetalle.p_vcCodOpe = datos.inCodOpe;        //datos.vcGrupo03;
    oResumenDetalle.p_vcPer = Periodo; //$("#hdfPer").val();
    oResumenDetalle.idConcepto = datos.idConcepto;
    oResumenDetalle.idGrupo = datos.idGrupo;

    if (id) {
        var Ancho = $(window).width();
        var Alto = $(window).height();

        $("#TabConsulta_1").tabs('remove', 1);
        window.parent.pagina = "Con_Fac_ConsultaPrincipal.aspx?p_vcNum=" + oResumenDetalle.p_vcNum + "&p_vcCodCue=" + oResumenDetalle.p_vcCodCue + "&p_vcPer=" + oResumenDetalle.p_vcPer + "&p_inCodConcepto=" + oResumenDetalle.idConcepto + "&p_inCodGrupo=" + oResumenDetalle.idGrupo;
        abrirDialogLinea();

        function abrirDialogLinea() {
            var $width = 930;
            var $height = 615;
            var $Pagina = window.parent.pagina;
            window.parent.$("#ifResultadoLinea").attr("src", $Pagina);


            window.top.MostrarLoading();
            window.parent.$("#ifResultadoLinea").unbind("load");
            //Utilizado, para mostrar el modal solo cuando ya ha sido cargado.
            window.parent.$('#ifResultadoLinea').load(function () {

                window.top.OcultarLoading();

                Modal = window.parent.$('#dvResultadoLinea').dialog({
                    title: "Línea: " + oResumenDetalle.p_vcNum.toString(),
                    width: $width,
                    height: $height,
                    modal: true,
                    resizable: false
                });

            });


        }
        //AbrirOpcion(window.parent.tabOpciones, "#TabConsulta_" + oResumenDetalle.p_vcNum.toString(), oResumenDetalle.p_vcNum.toString(), Alto - 102, Ancho - 150);
    }
    else {
        alerta("Seleccione un registro");
    }
}

function NumeroInicialFilas() {
    inFilas = Math.floor(($(window).height() - 150) / nuAltoFila);

    ArrayPaginacion.push(inFilas);
    ArrayPaginacion.push(inFilas + inFilas);
    ArrayPaginacion.push(inFilas + inFilas + inFilas);
}

tab = $("#TabDetalle").tabs({
    tabTemplate: "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close'>Remover Tab</span></li>",
    //fx: { height: 'toggle', duration: 800 },
    add: function (event, ui) {
        var ifra = document.createElement('IFRAME');
        ifra.width = "100%";
        ifra.height = "100%";
        ifra.setAttribute("margin-top", "0px");
        ifra.setAttribute("margin-left", "0px");
        ifra.setAttribute("margin-bottom", "0px");
        ifra.setAttribute("margin-right", "0px");
        ifra.setAttribute("padding-top", "0px");
        ifra.setAttribute("padding-left", "0px");
        ifra.setAttribute("padding-bottom", "0px");
        ifra.setAttribute("padding-right", "0px");
        ifra.src = pagina;
        ifra.frameBorder = "0";
        ifra.className = "SinBordes";
        $(ui.panel).append(ifra);
        $(this).tabs('select', '#' + ui.panel.id);
        pagina = "";
    }
});

function Modelo_TablaConsulta_() {

    p_mesPer = window.parent.Criterio.vcPer;
    vcCodCue = window.parent.Criterio.vcCue;
    var str = p_mesPer;
    //p_mesPer = str.substring(0, 2) + '' + str.substring(5);

    // ========================================================================================================================    
    try {
        // ========================================================================================================================
        // GRILLA # DETALLE
        // ========================================================================================================================   

        var ColumnasConsulta = [
                { name: 'RowNumber', index: 'RowNumber', label: 'Id', hidden: true },
                { name: 'Periodo', index: 'Periodo', label: 'Periodo', width: '65', align: 'center', hidden: false },
                { name: 'TipoLinea', index: 'TipoLinea', label: 'Tipo Línea', width: '65', align: 'center', hidden: true },
                {
                    name: 'vcNum2', index: 'vcNum2', label: 'Línea', width: '70', align: 'center', hidden: false,
                    formatter: function (value, options, rData) {
                        return '<a href = "javascript:fnAbrirTab(' + rData[0] + ');">' + rData[3] + "</a>";
                    }
                },
                {
                    name: 'vcNum', index: 'vcNum', label: 'Línea', width: '70', align: 'center', hidden: true
                },
                { name: 'vcCodEmp', index: 'vcCodEmp', label: 'Cod. Emp.', width: '100', align: 'center', hidden: false },
                { name: 'vcNomEmp', index: 'vcNomEmp', label: 'Empleado', width: '120', align: 'left', hidden: false },
                { name: 'inCodInt', index: 'inCodInt', label: 'Cod. Int.', hidden: true },
                { name: 'vcNomOrg', index: 'vcNomOrg', label: 'Área', width: '150', hidden: false },
                { name: 'vcCodCue', index: 'vcCodCue', label: 'vcCodCue', hidden: true },
                { name: 'vcNomCue', index: 'vcNomCue', label: 'Cuenta', width: '100', hidden: false },
                { name: 'inCodOpe', index: 'vcDurRea', label: 'Duración', width: '60', align: 'Center', hidden: true },
                { name: 'vcNomOpe', index: 'vcNomOpe', label: 'Operador', width: '200', align: 'center', hidden: true },
                //{ name: 'GrupoConcepto', index: 'GrupoConcepto', label: 'Grupo Concepto', width: '110', hidden: false },
                //{ name: 'Concepto', index: 'Concepto', label: 'Concepto', width: '150', hidden: false },
                //{ name: 'Consumo', index: 'Consumo', label: 'Consumo', width: '80', align: 'right', hidden: false },
                { name: 'Monto', index: 'Monto', label: 'Monto', width: '80', align: 'right', hidden: false },
                //{ name: 'idConcepto', index: 'idConcepto', label: 'idConcepto', hidden: true },
                //{ name: 'idGrupo', index: 'idGrupo', label: 'idGrupo', hidden: true }
        ];

        var Ancho = $(window).width() - 50;
        var AnchoColumnas = 0;
        for (var i = 0; i < ColumnasConsulta.length; i++) {
            if (ColumnasConsulta[i].hidden == false && !isNaN(ColumnasConsulta[i].width)) {
                AnchoColumnas += parseFloat(ColumnasConsulta[i].width);
            }
        }
        var anchoAdicional = 0;
        for (var i = 0; i < ColumnasConsulta.length; i++) {
            if (ColumnasConsulta[i].hidden == false && !isNaN(ColumnasConsulta[i].width)) {
                anchoAdicional = (parseFloat(ColumnasConsulta[i].width) / AnchoColumnas) * (Ancho - AnchoColumnas);
                if (anchoAdicional > 0) {
                    ColumnasConsulta[i].width = parseFloat(ColumnasConsulta[i].width) + anchoAdicional - 10;
                }
            }
        }



        $("#tbConsulta").jqGrid({
            datatype: function () {
                $.ajax({
                    url: "Con_Fac_Consulta.aspx/ListarLineas", //PageMethod
                    data: "{'inPagTam':'" + $('#tbConsulta').getGridParam("rowNum") + "'," + //Tamaño de pagina
                   "'inPagAct':'" + parseFloat($('#tbConsulta').getGridParam("page")) + "'," + //Pagina actual
                   "'vcOrdCol':'" + $('#tbConsulta').getGridParam("sortname") + "'," + //Nombre de columna ordenado
                   "'vcTipOrdCol':'" + $('#tbConsulta').getGridParam("sortorder") + "'," +
                   "'oCriterio': '" + JSON.stringify(window.parent.Criterio) + "'," + //Tabla
                   "'p_mesTabla': '" + p_mesPer + "'," + //periodo
                   "'p_vcCodcue': '" + vcCodCue + "' }", //cuenta
                    dataType: "json",
                    type: "post",
                    contentType: "application/json; charset=utf-8",
                    success: function (result) {

                        $("#dvResultados").show()
                        var resultado = JSON.parse(result.d);

                        if (resultado.JQGrid.TotalRegistros > 0) {
                            $("#dvResultados").show();
                            $("#dvSinResultados").hide();
                        } else {
                            alerta("No hay resultado para los filtros seleccionados", "SIN RESULTADOS", null, "warning");
                            $("#dvResultados").hide();
                            $("#dvSinResultados").show();
                        }
                        $("#tbConsulta")[0].addJSONData(resultado["JQGrid"]);
                        window.parent.Criterio.vcTab = resultado["vcTab"];

                        $('#tbConsulta_vcCodEmp, #tbConsulta tr.jqgfirstrow td:nth-child(5)').width(80);
                        $('td[aria-describedby="tbConsulta_vcCodEmp"]').width(80);
                        $($(".jqgfirstrow td")[7]).width(80);

                        //setTimeout(function () {
                        //}, 100);
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },
            jsonReader: {
                root: "Items",
                page: "PaginaActual",
                total: "TotalPaginas",
                records: "TotalRegistros",
                repeatitems: true,
                cell: "Row",
                id: "ID"
            },
            colModel: ColumnasConsulta,
            //                        colModel: ColModel1,
            sortname: "vcNum",
            sortorder: "asc",
            rowNum: inFilas, // PageSize.
            rowList: ArrayPaginacion,
            width: $(window).width() - 50,
            height: $(window).height() - 160,
            loadtext: 'Cargando datos...',
            recordtext: "{0} - {1} de {2} elementos",
            emptyrecords: 'No hay resultados',
            pgtext: 'Pág: {0} de {1}',
            rownumbers: true,
            gridview: true,
            shrinkToFit: false,
            viewrecords: true,
            sortable: true,
            hidegrid: false,
            caption: "Líneas",
            pager: "#Paginador",
            onSelectRow: function (id, select, item) {
                //AbrirConsulta(id);
            },
            ondblClickRow: function (rowid, iRow, iCol, e) {

                AbrirConsulta(rowid);
            },
            subGrid: true,
            subGridOptions: {
                "reloadOnExpand": false,
                "selectOnExpand": false
            },
            subGridRowExpanded: function (subgrid_id, row_id) {

                subgrid_table_id = subgrid_id + "_t";
                pager_id = "p_" + subgrid_table_id;
                $("#" + subgrid_id).html("<table id='" + subgrid_table_id + "' class='scroll'></table><div id='" + pager_id + "' class='scroll'></div>");
                $("#" + subgrid_table_id).jqGrid({
                    datatype: CargarDetalleConsulta(row_id),
                    colModel: modeloDetalleConsulta,
                    sortorder: "asc",
                    width: "700",
                    height: "auto",
                    shrinkToFit: false,
                    beforeSelectRow: function (rowId, e) {
                        return false;
                    }
                });

            },
            subGridRowColapsed: function (subgrid_id, row_id) {
            },
        }).navGrid("#Paginador", { edit: false, add: false, search: false, del: false });

    } catch (e) {
        alerta(e);
    }

}


function CargarDetalleConsulta(row_id) {

    var datos = $("#tbConsulta").jqGrid('getRowData', row_id);
    var Linea =  datos.vcNum;      

    $.ajax({
        url: "Con_Fac_Consulta.aspx/ListarDetalleConceptoPorLinea", //PageMethod
        data: "{'vcTab': '" + window.parent.Criterio.vcTab + "'," + "'Linea': '" + Linea + "'}",
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {

            try {
                var resultado = JSON.parse(result.d);
                $("#" + subgrid_table_id).jqGrid('clearGridData');
                var i = 0;
                for (i = 0; i < resultado.length; i++) {
                    $("#" + subgrid_table_id).jqGrid('addRowData', i, resultado[i]);
                }
                if ($.browser.chrome) {
                    $('#gbox_' + subgrid_table_id).css("width", "795px"); //ui-jqgrid-bdiv
                    $('div.ui-jqgrid-bdiv', 'div#gview_' + subgrid_table_id).each(function (i) {
                        $(this).css({ "width": "795px" });
                    });
                    $('div.ui-jqgrid-hdiv', 'div#gview_' + subgrid_table_id).each(function (i) {
                        $(this).css({ "width": "795px" });
                    });
                }

            } catch (e) {

            }
            
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}


function fnAbrirTab(dato) {
    AbrirConsulta(dato);
}