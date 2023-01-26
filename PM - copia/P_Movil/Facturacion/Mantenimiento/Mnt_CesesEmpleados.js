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

    $("#txtFecIni,#txtFecFin").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy',
        onSelect: function (dateText, inst) {
            $("#grid").trigger("reloadGrid");
        }
    });

    $("#txtFecIni").datepicker('option', {
        onClose: function (selectedDate) {
            $("#txtFecFin").datepicker('option', 'minDate', selectedDate);
        }
    });

    $("#txtFecFin").datepicker('option', {
        onClose: function (selectedDate) {
            $("#txtFecIni").datepicker('option', 'maxDate', selectedDate);
        }
    });


    $("#btnLimpiarFecIni").click(function () {
        $("#txtFecIni").val('');
        $("#txtFecFin").datepicker('option', 'minDate', '');
        $("#grid").trigger("reloadGrid");
    });
    $("#btnLimpiarFechaFin").click(function () {
        $("#txtFecFin").val('');
        $("#txtFecIni").datepicker('option', 'maxDate', '');
        $("#grid").trigger("reloadGrid");
    });

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

    $("#btnImportar").live("click", function () {
        //        id = $("#grid").jqGrid('getGridParam', 'selrow');
        //        if (id != null) {
        //            var datos = $("#grid").jqGrid('getRowData', id);
        //            $('#ifEnvio').attr("src", "Cam_CortesEnvio.aspx?IdCorte=" + datos.IdCorte);
        //            $('#ifEnvio').attr("src", "Con_Fac_UploadCese.aspx");
        //            formulario = $('#dvEnvio').dialog({
        //                title: "Importación de Archivo de Ceses",
        //                height: 300,
        //                width: 530,
        //                modal: true
        //            });
        //        } else {
        //            alerta("Seleccione un registro");
        //        }
        pagina = "Con_Fac_UploadCese.aspx?inTipOri=" + $("#hdfinTipOri").val();
        var Id = "#" + $("#hdfvcTab").val() + "_Tab_Nuevo";
        var $panel = tab.find(Id);
        if (!$panel.length) {//En el caso que no exista el tab, lo crea
            tab.tabs("add", Id, "Importar Ceses");
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

    function NumeroInicialFilas() {
        var nuAltoFila = 23.04;
        inFilas = Math.floor(inAltGrid / nuAltoFila);
    }

    $("#txtValor").live("change", function (event) {
        $("#grid").trigger("reloadGrid");
    });

    var tblGrupo = $("#grid").jqGrid({
        sortable: true,
        datatype: "local",
        datatype: function () {

            //            $("#txtValor").val($("#txtValor").val().replace(/\\/g, ""));
            var vcBusqueda = $("#txtValor").val().replace(/'/g, "&#39");

            $.ajax({
                url: "Mnt_CesesEmpleados.aspx/Listar", //PageMethod
                data: "{'inPagTam':'" + $('#grid').getGridParam("rowNum") + "'," +
                              "'inPagAct':'" + parseInt($('#grid').getGridParam("page")) + "'," +
                              "'Filtro': '" + $("#ddlFiltro").val() + "'," +
                              "'Valor':'" + vcBusqueda + "'," +
                              "'inTipOri':'" + $("#hdfinTipOri").val() + "'," +
                              "'FechaIni':'" + $("#txtFecIni").val() + "'," +
                              "'FechaFin':'" + $("#txtFecFin").val() + "'}",
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
                id: "_P_idCese"
                //                id: "IdCorte"
            },
        //            idCese               vcCodEmp        Periodo btEstado
        //        colModel: [{ name: 'IdCampana', index: 'IdCampana', label: 'IdCampana', hidden: true },
        //                       { name: 'IdCorte', index: 'IdCorte', label: 'IdCorte', hidden: true },
        //   		               { name: 'vcNomCam', index: 'vcNomCam', label: 'Campaña', hidden: false, width: 200 },
        //                       { name: 'NumeroItem', index: 'NumeroItem', label: 'Número de Ítem', hidden: false, width: 50, align: 'right' },
        //                       { name: 'Fecha', index: 'Fecha', label: 'Fecha', hidden: false, width: 100, align: 'center' },
        //                       { name: 'NumeroPedidos', index: 'NumeroPedidos', label: 'Número de Pedidos', hidden: false, width: 100, align: 'right' },
        //                       { name: 'Situacion', index: 'Situacion', label: 'Situación', hidden: false, width: 100 }
        //   	                  ],
        colModel: [{ name: '_P_idCese', index: '_P_idCese', label: '_P_idCese', hidden: true },
                    { name: 'vcCodEmp', index: 'vcCodEmp', label: 'Código', hidden: false, width: 70, align: 'center' },
   		            { name: 'EMPL_vcNOMEMP', index: 'EMPL_vcNOMEMP', label: 'Nombre', hidden: false, width: 400, align: 'left' },
                    { name: 'FechaCese', index: 'FechaCese', label: 'Fecha Cese', hidden: false, width: 75, align: 'center' },
                    { name: 'vcDescripcion', index: 'vcDescripcion', label: 'Motivo/Descripción', hidden: false, width: 380, align: 'left' },
                    { name: 'FechaCreacion', index: 'FechaCreacion', label: 'Fecha Creación', hidden: false, width: 75, align: 'center' },
                    { name: 'CuotasFinanciadas', index: 'CuotasFinanciadas', label: 'Deuda', hidden: false, width: 80, align: 'right' },
                    { name: 'PagosPosteriores', index: 'PagosPosteriores', label: 'Pagos', hidden: false, width: 80, align: 'right' }
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
        viewrecords: true,
        shrinkToFit: false,
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
                for (var i in colModels) {
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
                for (var i = 0; i < ids.length; i++) {
                    var datos = $("#grid").jqGrid('getRowData', ids[i]);
                    //                    if (datos._P_idCese == inIdCorte) {
                    //                        $("#grid").jqGrid('setSelection', ids[i], true);
                    //                        btnImportar.click();
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
        var habilitarBoton = $("#hdfImpManual").val();
        if (habilitarBoton == 0) {
            $("#btnImportar").addClass('k-button k-state-disabled');
            $("#btnImportar").hide();
        }
        var Ancho = $(window).width();
        var Alto = $(window).height();
        var AnchoLateral = $(".LateralSplitter");
        $(".tabs").css({ height: Alto - 23, width: Ancho - AnchoLateral, marginbotton: 0, paddingbotton: 0 });

        $(".Splitter").css({ height: Alto - 18 });
        inAltGrid = $(window).height() - 168 - MargenFiltro * MargenHeight;
        $("#grid").setGridWidth($(window).width() - 31);
        $("#grid").setGridHeight(inAltGrid - 30);
    }

    $("#TabDetalle span.ui-icon-close").live("click", function () {
        var index = $("li", tab).index($(this).parent());
        tab.tabs("remove", index);
    });

    $("#btnAgregar").live("click", function () {
        pagina = "Mnt_CesesEmpleadosNuevo.aspx?inTipOri=" + $("#hdfinTipOri").val();
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

    //    $("#btnEliminar").live("click", function () {
    //        var id = null;
    //        if (idSeleccionado == null) {
    //            id = $("#grid").jqGrid('getGridParam', 'selrow');
    //            if (id == null) {
    //                alerta("Seleccione un registro");
    //                return;
    //            }
    //        }
    //        else
    //            id = idSeleccionado;

    //        idSeleccionado = null;
    //        var idTabla = "_P_idCese";
    //        var ids = idTabla.split(",");
    //        //        var idsParametro = "";
    //        //        var idsValor = "";
    //        var datos = $("#grid").jqGrid('getRowData', id);
    //        var codigo = "";
    //        for (i in datos) {
    //            //console.log(i);
    //            if (i == "_P_idCese") {

    //                codigo = datos._P_idCese;
    //            }

    //        }
    //        EliminarRegistro(codigo);
    //    });


    function EliminarRegistro(id) {
        $.ajax({
            type: "post",
            url: "Mnt_CesesEmpleados.aspx/Eliminar",
            data: JSON.stringify({
                "IdCese": id,
                "inTipOri": $("#hdfinTipOri").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {


                if (data.d == "Se Elimino correctamente") {
                    $("#grid").trigger("reloadGrid");
                    //                    ActualizarGrilla();
                    Mensaje("<br/><h1>" + data.d + "</h1><br/>", document);

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
        pagina = "Mnt_CesesEmpleadosNuevo.aspx";
        var id = null;
        if (idSeleccionado == null) {
            id = $("#grid").jqGrid('getGridParam', 'selrow');
            if (id == null) {
                alerta("Seleccione un registro");
                return;
            }
        }
        else
            id = idSeleccionado;
        idSeleccionado = null;


        if (id) {
            var IdTab = "#" + $("#hdfvcTab").val() + "_Tab_Editar";
            var $panel = tab.find(IdTab);
            var idTabla = "_P_idCese";

            var ids = idTabla.split(",");
            var idsParametro = "";
            var idsValor = "";

            var datos = $("#grid").jqGrid('getRowData', id);
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
                    //tab.tabs('select', IdTab);
                }
                else {
                    tab.tabs("remove", $panel.index() - 1);
                    pagina += "?Cod=" + idsValor + "&Par=" + idsParametro + "&inTipOri=" + $("#hdfinTipOri").val();
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
            }
            vcCod = id;
        }
        else {
            alerta("Seleccione un registro");
        }
    };
});