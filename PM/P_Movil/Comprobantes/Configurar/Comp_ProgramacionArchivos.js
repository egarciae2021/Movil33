var tab;
var MargenFiltro = 0;
var MargenHeight = 48;
var idSeleccionado = null;
var TamanoPagina = [10, 20, 30];
var inAltGrid;
var inFilas;

function ActualizarGrilla() {
    $("#grid").trigger("reloadGrid");
}

function CerroMensaje() {
    BloquearPagina(false);
}

$(function () {

    inAltGrid = $(window).height() - 168 - MargenFiltro * MargenHeight;


    $("#tbExportar").buttonset();
    $(".ui-button-text").css({ padding: 4, width: 22 });

    $("#TabDetalle span.ui-icon-close").live("click", function () {
        var index = $("li", tab).index($(this).parent());
        tab.tabs("remove", index);
    });

    function fnCargarGrilla() {
        $("#grid").trigger("reloadGrid");
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

    function NumeroInicialFilas() {
        var nuAltoFila = 23.04;
        inFilas = Math.floor(inAltGrid / nuAltoFila);
    }


    var tbSolicitudes = $("#grid").jqGrid({
        sortable: true,
        datatype: "local",
        datatype: function () {
            var dtInicio = new Date();
            $.ajax({
                url: "Comp_ProgramacionArchivos.aspx/ListarTipo", //PageMethod
                data: "{ 'tipofiltro':'" + $("#ddlFiltro").val() + "'," +
                        "'filtro':'" + $('#txtFiltro').val() + "'," +
                        "'inPagTam':'" + $('#grid').getGridParam("rowNum") + "'," +
                        "'inPagAct':'" + parseInt($('#grid').getGridParam("page")) + "'," +
                        "'campoordenar':'" + $('#grid').getGridParam("sortname") + "'," + //Nombre de columna ordenado
                        "'orden':'" + $('#grid').getGridParam("sortorder") + "'," + //Tipo de orden de columna asc, desc                    
                        "'tipo':'0'}",
                dataType: "json",
                type: "post",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    $("#grid")[0].addJSONData(result.d);

                    var dtFin = new Date();
                    var diff = (dtFin - dtInicio) / 1000; //unit is milliseconds
                    //$("#lblFiltro").text(diff);

                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        jsonReader: //Set the jsonReader to the JQGridJSonResponse squema to bind the data.
                {
                root: "Items",
                page: "PaginaActual",
                total: "TotalPaginas",
                records: "TotalRegistros",
                repeatitems: true,
                cell: "Row",
                id: "IdFacConfiguracion"
            },
        colModel: [
                       { name: 'IdFacConfiguracion', index: 'IdFacConfiguracion', label: 'Código', hidden: false, key: true, width: 60 },
                       { name: '_PF_IdTipoConfiguracion', index: '_PF_IdTipoConfiguracion', label: '_PF_IdTipoConfiguracion', hidden: true, width: 60 },
                       { name: 'Descripcion', index: 'Descripcion', label: 'Descripción', hidden: false, width: 200 },
                       { name: 'RutaOrigen', index: 'RutaOrigen', label: 'Ruta Origen', hidden: false, width: 200, sortable: false },
   		               { name: 'RutaOrigen', index: 'RutaOrigen', label: 'Ruta Destino', hidden: false, width: 200, sortable: false },
   	                  ],


        viewrecords: true,
        pager: "#pager", //Pager.
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        rowNum: inFilas, //$("#hdfTamPag").val(), //"10" PageSize.
        rowList: [10, 20, 30],  //TamanosPaginaSel, //Variable PageSize DropDownList. 
        sortname: "IdFacConfiguracion", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        rownumbers: true,
        shrinkToFit: false,
        ondblClickRow: function (id) {
            if ($("#btnEditar").button("option", "disabled") == false) {
                $('#btnEditar').click();
            }
        },
        onSelectRow: function (id) {
            var datos = $("#grid").jqGrid('getRowData', id);
            $("#btnEditar").button("option", "disabled", false);
        }

    }).navGrid("#pager", { edit: false, add: false, search: false, del: false });



    inicioPagina();
    function inicioPagina() {
        DimPosElementos();
    }

    $(window).resize(function () {
        DimPosElementos();
        NumeroInicialFilas();
    });

    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        var AnchoLateral = $(".LateralSplitter");
        $(".tabs").css({ height: Alto - 30, width: Ancho - AnchoLateral, marginbotton: 0, paddingbotton: 0 });
        $(".Splitter").css({ height: Alto - 18 });
        inAltGrid = $(window).height() - 198 - MargenFiltro * MargenHeight;
        $("#grid").setGridWidth($("#TabDetalle").width() - 13);
        $("#grid").setGridHeight(inAltGrid);
    }


    $("#btnEditar").live("click", function () {
        //fnEditarRegistro();
        var id = $("#grid").jqGrid('getGridParam', 'selrow');

        if (id) {
            var datos = $("#grid").jqGrid('getRowData', id);
            var IdFacConfiguracion = datos['IdFacConfiguracion'];
            var nombrTab;
            var Id = "#" + $("#hdfvcTab").val() + "_Tab_Nuevo";
            var tabId;

            pagina = "Origen.aspx" + "?Cod=" + IdFacConfiguracion;

            if (id == 11) {
                pagina = "Comp_ExportacionCobros.aspx" + "?Cod=" + IdFacConfiguracion;
                nombrTab = "Exportación de Cobros";
                //Id = "#Exportacion" + "_Tab_Nuevo";
            
            }
            else if (id == 12) {
                pagina = "Comp_ImportacionAbonos.aspx" + "?Cod=" + IdFacConfiguracion;
                nombrTab = "Importación de Abonos";
                //Id = "#Importacion" + "_Tab_Nuevo";

            }

            else if (id == 13) {
                pagina = "Comp_ExportacionRegistrosVentas.aspx" + "?Cod=" + IdFacConfiguracion;
                nombrTab = "Exportación de Registros";
                //Id = "#Importacion" + "_Tab_Nuevo";

            }
           

            var $panel = tab.find(Id);
            if (!$panel.length) {//En el caso que no exista el tab, lo crea
                tab.tabs("add", Id, nombrTab);
                $(Id).css("width", "99%");
                $(Id).css("height", "92%");
                $(Id).css("margin-top", "0px");
                $(Id).css("margin-left", "0px");
                $(Id).css("margin-bottom", "0px");
                $(Id).css("margin-right", "0px");
                $(Id).css("padding-top", "0px");
                $(Id).css("padding-left", "0px");
                $(Id).css("padding-bottom", "0px");
                $(Id).css("padding-right", "0px");
            }
            else {//En el caso que exista lo muestra
                tab.tabs('remove', Id);
                tab.tabs("add", Id, nombrTab);
                $(Id).css("width", "99%");
                $(Id).css("height", "92%");
                $(Id).css("margin-top", "0px");
                $(Id).css("margin-left", "0px");
                $(Id).css("margin-bottom", "0px");
                $(Id).css("margin-right", "0px");
                $(Id).css("padding-top", "0px");
                $(Id).css("padding-left", "0px");
                $(Id).css("padding-bottom", "0px");
                $(Id).css("padding-right", "0px");                      
                //tab.tabs('select', Id);
            }

        }
        else {
            alerta('Seleccione un registro'); return;
        }
        //fnEditarSolicitud();
    });


    $('#txtFiltro').live("keypress", function (e) {
        if (e.keyCode == 13) {
            fnCargarGrilla();
        } else {
            if (e.char == "\\")
                return false;
        }
    });

    function EditarRegistro(id) {
        if (pagina != "") {
            idSeleccionado = id;
            //LeerSolicitud();
        }
    }

});




