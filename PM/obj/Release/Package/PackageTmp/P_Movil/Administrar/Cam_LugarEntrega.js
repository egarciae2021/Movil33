
var asInitVals = new Array();
var formulario;
$(function () {
    $("input:checkbox,input:radio,input:file").uniform();

    $("#txtBusqueda").keyup(function () {
        if (timeoutHnd) {
            clearTimeout(timeoutHnd);
        }
        timeoutHnd = setTimeout(BuscarGrilla, 500);
    });
    $("#txtBusqueda").each(function (i) {
        asInitVals[i] = $(this).val();
    });
    $("#txtBusqueda").focus(function () {
        if ($(this).hasClass("txtBusqueda")) {
            $(this).removeClass("txtBusqueda");
            $(this).val("");
        }
    });
    $("#txtBusqueda").blur(function (i) {
        if ($(this).val() == "") {
            $(this).addClass("txtBusqueda");
            $(this).val(asInitVals[$("#txtBusqueda").index(this)]);
        }
    });
    $("#ddlBusqueda").change(function (event) {
        $("#txtBusqueda").val("");
        $("#txtBusqueda").addClass("txtBusqueda");
        $("#txtBusqueda").val(asInitVals[0]);
        $("#txtBusqueda").focus();
    });
    function ValorBusqueda() {
        if ($("#txtBusqueda").hasClass("txtBusqueda")) {
            return "";
        }
        else {
            return vcBusqueda;
        }
    }
    function BuscarGrilla() {
        vcBusqueda = $("#txtBusqueda").val().replace(/'/g, "&#39");
        $("#tblPoliticaSolicitudxGrupo").trigger("reloadGrid");
    }

    var mydata = [
		        { RowNumber: "1", inCodGru: "2007-10-01", vcGru: "Sede Central", vcPol: "AV. República de Panamá 3055" },
		        { RowNumber: "2", inCodGru: "2007-10-02", vcGru: "Oficina Surco", vcPol: "Av. Caminos del Inca 4434" }
		    ];

    var tblGrupo = $("#tblProductos").jqGrid({
        sortable: true,
        datatype: "local",
        //                datatype: function () {
        //                    $.ajax({
        //                        url: "Conf_PoliticaSolicitud.aspx/ListarPoliticaSolicitudPorGrupo", //PageMethod
        //                        data: "{'inPagTam':'" + $('#tblPoliticaSolicitudxGrupo').getGridParam("rowNum") + "'," + //Tamaño de pagina
        //                                  "'inPagAct':'" + $('#tblPoliticaSolicitudxGrupo').getGridParam("page") + "'," + //Pagina actual
        //                                  "'inCodPol': '" + $("#hdfPolitica").val() + "'," +
        //                                  "'vcCam':'" + $('#ddlBusqueda').val() + "'," + //Campo de busqueda
        //                                  "'vcValBus':'" + ValorBusqueda() + "'}", //Valor de busqueda
        //                        dataType: "json",
        //                        type: "post",
        //                        contentType: "application/json; charset=utf-8",
        //                        success: function (result) {
        //                            //$("#tblPoliticaSolicitudxGrupo").trigger("reloadGrid");
        //                            $("#tblPoliticaSolicitudxGrupo")[0].addJSONData(result.d);

        //                            //$("#tblPoliticaSolicitudxGrupo").jqGrid('addRowData', result.d[0].P_vcCod, result.d[0]);

        //                        },
        //                        error: function (xhr, err, thrErr) {
        //                            MostrarErrorAjax(xhr, err, thrErr);
        //                        }
        //                    });
        //                },
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
        colModel: [{ name: 'RowNumber', index: 'RowNumber', label: 'RowNumber', hidden: true },
                            { name: 'inCodGru', index: 'inCodGru', label: 'inCodGru', hidden: true },
   		                    { name: 'vcGru', index: 'vcGru', label: 'Descripción', hidden: false, width: 300 },
                            { name: 'vcPol', index: 'vcPol', label: 'Dirección', hidden: false, width: 300 }
   	                        ],
        pager: "#pager", //Pager.
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        rowNum: "10", //$("#hdfTamPag").val(), //"10" PageSize.
        rowList: [10, 20, 30],  //TamanosPaginaSel, //Variable PageSize DropDownList. 
        sortname: "inCodGru", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: "800",
        height: "95",
        rownumbers: true,
        shrinkToFit: false,
        ondblClickRow: function (id) { $("#btnCambiarValGrup").click(); },
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
                for (i in colModels) {
                    $("#tblPoliticaSolicitudxGrupo").jqGrid('setCell', rowid, i, '', { color: 'red' });
                }
            }
        },
        //onSortCol: function(name,index){  alerta("Column Name: "+name+" Column Index: "+index); },
        ondblClickRow: function (id) {
            $("#tblPoliticaSolicitudxGrupo").jqGrid('resetSelection');
            $("#tblPoliticaSolicitudxGrupo").jqGrid('setSelection', id);
            //                        if ($("#hdfEdicion").val() == "1")
            //                            EditaRegistro(id);
        }
    }).navGrid("#pager", { edit: false, add: false, search: false, del: false });

    var i = 0;
    for (i = 0; i <= mydata.length; i++)
        $("#tblProductos").jqGrid('addRowData', i + 1, mydata[i]);

    $("#btnAgregarProducto").click(function (event) {
        $('#ifProducto').attr("src", "Mantenimiento/Cam_Mnt_OficinaEntrega.aspx");
        formulario = $('#dvProducto').dialog({
            title: "Nuevo Lugar Entrega",
            height: 485,
            width: 660,
            modal: true
        });
    });
    $("#btnCambiarProducto").click(function (event) {
        $('#ifProducto').attr("src", "Mantenimiento/Cam_Mnt_OficinaEntrega.aspx");
        formulario = $('#dvProducto').dialog({
            title: "Editar Lugar Entrega",
            height: 485,
            width: 660,
            modal: true
        });
    });

    $("#btnQuitarProducto").click(function (event) {
        var id = 1; //$("#tblProductos").jqGrid('getGridParam', 'selrow');
        if (id) {
            var inProducto = id;

            confirmacion("¡Se quitara el siguiente producto!, ¿Desea continuar?", fncAccionSi, null, "Remover producto");
        }
        else {
            alerta("seleccione un registro");
        }
    });

    function fncAccionSi() {
        //alerta("asd");
        //                $.ajax({
        //                    type: "POST",
        //                    url: "Conf_PoliticaSolicitud.aspx/QuitarGrupo",
        //                    data: "{'inCodGru': '" + inCodGru + "'," +
        //                            "'inCodPol': '" + inCodPol + "'}",
        //                    contentType: "application/json; charset=utf-8",
        //                    dataType: "json",
        //                    success: function (msg) {
        //                        if (msg.d == "") {
        //                            $("#tblPoliticaSolicitudxGrupo").jqGrid('delRowData', id);
        //                            Mensaje("<br/><h1>Grupo Empleado Quitado</h1><br/>", document, CerroMensaje);
        //                        }
        //                        else {
        //                            alert(msg.d);
        //                        }
        //                    },
        //                    error: function (xhr, err, thrErr) {
        //                        MostrarErrorAjax(xhr, err, thrErr);
        //                    }
        //                });
    }
});
    