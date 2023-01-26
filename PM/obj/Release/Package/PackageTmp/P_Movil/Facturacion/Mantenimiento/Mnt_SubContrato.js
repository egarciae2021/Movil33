var tab;
var MargenFiltro = 0;
var MargenHeight = 48;
var inIdCorte = "";
var idSeleccionado = null;
var TamanoPagina = [10, 20, 30];
var inAltGrid;
var inFilas;

function ActualizarGrilla(idCorte) {
    inIdCorte = idCorte;
    $("#grid").trigger("reloadGrid");
}

$(function () {

    inAltGrid = $(window).height() - 168 - MargenFiltro * MargenHeight;

    $("input:checkbox,input:radio,input:file").uniform();
    $("#tblAcciones").buttonset();
    $(".ui-button-text").css({ padding: 4, width: 22 });

    //    $("#txtValor").change(function () {
    //        $("#grid").trigger("reloadGrid");
    //    });
    $('#txtValor').keypress(function () {
        $("#grid").trigger("reloadGrid");
    });
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

    var tblGrupo = $("#grid").jqGrid({
        sortable: true,
        datatype: "local",
        datatype: function () {

            $("#txtValor").val($("#txtValor").val().replace(/\\/g, ""));
            var vcBusqueda = $("#txtValor").val().replace(/'/g, "&#39");

            $.ajax({
                url: "Mnt_SubContrato.aspx/Listar", //PageMethod
                data: "{'inPagTam':'" + $('#grid').getGridParam("rowNum") + "'," +
                              "'inPagAct':'" + parseInt($('#grid').getGridParam("page")) + "'," +
                               "'Filtro': '" + $("#ddlFiltro").val() + "'," +
                               "'Valor':'" + vcBusqueda + "'," +
                               "'inTipOri':'" + $("#hdfinTipOri").val() + "'}",
                //                              "'inIdCampana': '" + $("#ddlCampana").val() + "'," +
                //                              "'inIdOperador':'" + $("#ddlOperador").val() + "'}",
                dataType: "json",
                type: "post",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    //$("#tblPoliticaSolicitudxGrupo").trigger("reloadGrid");
                    $("#grid")[0].addJSONData(result.d);
                    //$("#tblPoliticaSolicitudxGrupo").jqGrid('addRowData', result.d[0].P_vcCod, result.d[0]);

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
                id: "_P_IdSubContrato"
            },
        colModel: [{ name: '_P_IdSubContrato', index: '_P_IdSubContrato', label: '_P_IdSubContrato', hidden: true },
            { name: 'vcCodEmp', index: 'vcCodEmp', label: 'Código', hidden: false, width: 100, align: 'center' },
            { name: 'EMPL_vcNOMEMP', index: 'EMPL_vcNOMEMP', label: 'Empleado', hidden: false, width: 500, align: 'left' },
            { name: 'Estado', index: 'Estado', label: 'Estado', hidden: false, width: 100, align: 'center' },
            ],
        pager: "#pager", //Pager.
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        rowNum: inFilas, //$("#hdfTamPag").val(), //"10" PageSize.
        rowList: TamanoPagina,  //TamanosPaginaSel, //Variable PageSize DropDownList. 
        sortname: "inCodGru", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        rownumbers: true,
        shrinkToFit: false,
        ondblClickRow: function (id) { },
        onSelectRow: function (id) {
        },
        sortable: function (permutation) {
            //var colModels = $("#grid").getGridParam("colModel");
            //alert(colModels);
        },
        resizeStop: function (width, index) {
            //alerta("resize column " + index + " to " + width + "pixels");
        },
        afterInsertRow: function (rowid, aData, rowelem) {
            if (aData.btVig == 'False') {
                var colModels = $("#tblPoliticaSolicitudxGrupo").getGridParam("colModel");
                var i;
                for (i in colModels) {
                    $("#tblPoliticaSolicitudxGrupo").jqGrid('setCell', rowid, i, '', { color: 'red' });
                }
            }
        },
        //onSortCol: function(name,index){  alerta("Column Name: "+name+" Column Index: "+index); },
        ondblClickRow: function (id) {
            $("#grid").jqGrid('resetSelection');
            $("#grid").jqGrid('setSelection', id);
            EditaRegistro(id);
        },
        gridComplete: function () {
            if (inIdCorte != "") {
                var ids = $("#grid").jqGrid('getDataIDs');
                var i;
                for (i = 0; i < ids.length; i++) {
                    var datos = $("#grid").jqGrid('getRowData', ids[i]);
                    //                    if (datos.idcorte == inidcorte) {
                    //                        $("#grid").jqgrid('setselection', ids[i], true);
                    //                        btnimportar.click();
                    //                    }
                }
                inIdCorte = "";
            }
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
        $(".tabs").css({ height: Alto - 23, width: Ancho - AnchoLateral, marginbotton: 0, paddingbotton: 0 });

        $(".Splitter").css({ height: Alto - 18 });
        inAltGrid = $(window).height() - 168 - MargenFiltro * MargenHeight;
        $("#grid").setGridWidth($(window).width() - 31);
        $("#grid").setGridHeight(inAltGrid);
    }

    $("#TabDetalle span.ui-icon-close").live("click", function () {
        var index = $("li", tab).index($(this).parent());
        tab.tabs("remove", index);
    });

    $("#btnAgregar").live("click", function () {
        pagina = "Mnt_SubContratoNuevo.aspx?inTipOri=" + $("#hdfinTipOri").val();
        var Id = "#" + $("#hdfvcTab").val() + "_Tab_Nuevo";
        var $panel = tab.find(Id);
        if (!$panel.length) {//En el caso que no exista el tab, lo crea
            tab.tabs("add", Id, "Nuevo");
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
            tab.tabs('select', Id);
        }
    });
    $("#btnEliminar").live("click", function () {


        var id = null;
        if (idSeleccionado == null) {
            id = $("#grid").jqGrid('getGridParam', 'selrow');
            if (id == null) {
                alerta("Seleccione un registro");
                return;
            }
        }
        else {
            id = idSeleccionado;
        }
        idSeleccionado = null;

        $('#dvEliminar').dialog({
            title: "Eliminar Registro",
            modal: true,
            buttons: {
                "Si": function () {


                    var idTabla = "_P_IdSubContrato";
                    var ids = idTabla.split(",");
                    //        var idsParametro = "";
                    //        var idsValor = "";
                    var datos = $("#grid").jqGrid('getRowData', id);
                    var codigo = "";
                    var i;
                    for (i in datos) {
                        //console.log(i);
                        if (i == "_P_IdSubContrato") {

                            codigo = datos._P_IdSubContrato;
                        }

                    }
                    EliminarRegistro(codigo);


                    $(this).dialog("close");
                },
                "Cancelar": function () {
                    $(this).dialog("close");
                }
            }
        });





    });

    function EliminarRegistro(id) {
        $.ajax({
            type: "post",
            url: "Mnt_SubContrato.aspx/Eliminar",
            data: JSON.stringify({
                "IdSubContrato": id,
                "inTipOri": $("#hdfinTipOri").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {


                if (data.d == "Se elimino el registro con éxito.") {
                    $("#grid").trigger("reloadGrid");
                    Mensaje("<br/><h1>" + data.d + "</h1><br/>", document);
                    $("#grid").trigger("reloadGrid");
                }
                else {

                    Mensaje("<br/><h1>" + data.d + "</h1><br/>", document);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }


        });

    }

    $("#btnVerDetalle").live("click", function () {
        EditarRegistro();
    });

    function EditaRegistro(id) {
        pagina = $("#btnEditar").attr("url");
        if (pagina != "") {
            idSeleccionado = id;
            EditarRegistro();
        }
    }

    function EditarRegistro() {
        pagina = "Mnt_SubContratoNuevo.aspx";
        var id = null;
        if (idSeleccionado == null) {
            id = $("#grid").jqGrid('getGridParam', 'selrow');
            if (id == null) {
                alerta("Seleccione un registro");
                return;
            }
        }
        else {
            id = idSeleccionado;
        }
        idSeleccionado = null;


        if (id) {
            var IdTab = "#" + $("#hdfvcTab").val() + "_Tab_Editar";
            var $panel = tab.find(IdTab);
            var idTabla = "_P_IdSubContrato";

            var ids = idTabla.split(",");
            var idsParametro = "";
            var idsValor = "";
            var datos = $("#grid").jqGrid('getRowData', id);
            var i;
            for (i in ids) {
                if (idsParametro != "") {
                    idsParametro += ",";
                    idsValor += "-";
                }
                idsParametro += ids[i];
                idsValor += datos[ids[i]];
            }

            if (!$panel.length) {//En el caso que no exista el tab, lo crea
                pagina += "?Cod=" + idsValor + "&inTipOri=" + $("#hdfinTipOri").val();
                tab.tabs("add", IdTab, "Ver Detalle");
                $(IdTab).css("width", "99%");
                $(IdTab).css("height", "94%");
                $(IdTab).css("margin-top", "0px");
                $(IdTab).css("margin-left", "0px");
                $(IdTab).css("margin-bottom", "0px");
                $(IdTab).css("margin-right", "0px");
                $(IdTab).css("padding-top", "0px");
                $(IdTab).css("padding-left", "0px");
                $(IdTab).css("padding-bottom", "0px");
                $(IdTab).css("padding-right", "0px");
            }
            else {//En el caso que exista lo muestra
                if (vcCod == id) {//Si el codigo anterior seleccionado es igual al actual
                    tab.tabs("remove", $panel.index() - 1);
                    pagina += "?Cod=" + idsValor + "&Par=" + idsParametro + "&inTipOri=" + $("#hdfinTipOri").val();
                    tab.tabs("add", IdTab, "Editar");
                    $(IdTab).css("width", "99%");
                    $(IdTab).css("height", "94%");
                    $(IdTab).css("margin-top", "0px");
                    $(IdTab).css("margin-left", "0px");
                    $(IdTab).css("margin-bottom", "0px");
                    $(IdTab).css("margin-right", "0px");
                    $(IdTab).css("padding-top", "0px");
                    $(IdTab).css("padding-left", "0px");
                    $(IdTab).css("padding-bottom", "0px");
                    $(IdTab).css("padding-right", "0px");
                    //tab.tabs('select', IdTab);
                }
                else {
                    tab.tabs("remove", $panel.index() - 1);
                    pagina += "?Cod=" + idsValor + "&Par=" + idsParametro;
                    tab.tabs("add", IdTab, "Editar");
                    $(IdTab).css("width", "99%");
                    $(IdTab).css("height", "94%");
                    $(IdTab).css("margin-top", "0px");
                    $(IdTab).css("margin-left", "0px");
                    $(IdTab).css("margin-bottom", "0px");
                    $(IdTab).css("margin-right", "0px");
                    $(IdTab).css("padding-top", "0px");
                    $(IdTab).css("padding-left", "0px");
                    $(IdTab).css("padding-bottom", "0px");
                    $(IdTab).css("padding-right", "0px");
                }
            }
            vcCod = id;
        }
        else {
            alerta("Seleccione un registro");
        }
    }
});