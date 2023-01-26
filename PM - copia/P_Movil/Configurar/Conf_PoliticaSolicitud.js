var MargenFiltro = 0;
var MargenHeight = 48;
var Modal;
var ModalEmpleados;
var tblGrupo;
var tblEmpleado;
var asInitVals = [];
var asInitValsEmpleado = [];
var timeoutHnd;
var timeoutHndEmpleado;

var Codigos = "";
var Valores = "";
var CodigosNombres = "";
var v_inCodPol = "";
var v_CodGru = "";
var v_vcVal = "";
var v_vcNomGru = "";
var v_titulo = "";

function AbreEmpleado() {
    var $width = 740;
    var $height = 500;
    var $Pagina = '../Consultar/Con_SeleccionArea.aspx?Tipo=2&Multiple=1';
    $("#ifArea").width("910");
    $("#ifArea").attr("src", $Pagina);
    Modal = $('#dvArea').dialog({
        title: "Seleccionar empleado",
        width: $width + 170,
        height: $height,
        modal: true,
        resizable: false
    });
}

function IngresarEmpleadoUnico(Empleado) {
    
    for (i = 0; i < Empleado.length; i++) {
   
        Codigos = Codigos + Empleado[i].P_vcCod + ',';
        CodigosNombres = CodigosNombres + Empleado[i].vcNom + ',';
        if (Empleado[i].vcVal == undefined) {
            Valores = Valores + "";
        } else {
            Valores = Valores + Empleado[i].vcVal;
        }
    }

    var $width = 520;
    var $height = 250;
    var $Pagina = 'Conf_AgregarEmpleado_PolSeg.aspx?inCodPol=' + v_inCodPol + '&inCodGru=' + v_CodGru + '&vcVal=' + Valores + '&inCodEmp=' + '' + '&vcNomGru=' + v_vcNomGru + '&vcNomEmp=' + '';
    $("#ifExcepcion").width($width - 20);
    $("#ifExcepcion").height($height - 30);
    $("#ifExcepcion").attr("src", $Pagina);

    ModalEmpleados = $("#dvExcepcion").dialog({
        title: v_titulo,
        width: $width,
        height: $height,
        modal: true,
        resizable: false
    });
}

function IngresarEmpleados(Empleado) {
    for (i = 0; i < Empleado.length; i++) {

        Codigos = Codigos + Empleado[i].P_vcCod + ',';
        CodigosNombres = CodigosNombres + Empleado[i].vcNom + ',';
        if (Empleado[i].vcVal == undefined) {
            Valores = Valores + "";
        } else {
            Valores = Valores + Empleado[i].vcVal;
        }
    }

    var $width = 520;
    var $height = 250;
    var $Pagina = 'Conf_AgregarEmpleado_PolSeg.aspx?inCodPol=' + v_inCodPol + '&inCodGru=' + v_CodGru + '&vcVal=' + Valores + '&inCodEmp=' + '' + '&vcNomGru=' + v_vcNomGru + '&vcNomEmp=' + '';
    $("#ifExcepcion").width($width - 20);
    $("#ifExcepcion").height($height - 30);
    $("#ifExcepcion").attr("src", $Pagina);

    ModalEmpleados = $("#dvExcepcion").dialog({
        title: v_titulo,
        width: $width,
        height: $height,
        modal: true,
        resizable: false
    });
}

$(document).ready(function () {
    var idAnterior = -1;
    var vcBusqueda = "";
    var vcBusquedaEmpleado = "";
    var TamanosPaginaSel = $("#hdfPagLis").val();

    $(".dvPanel").css("padding", "5px");

    $(".btnNormal").button();

    $("#txtValor").keypress(ValidarEntero);

    $("#txtValor").bind('paste', function (e) {
        return false;
    });

    $('#txtBusqueda').keypress(function (event) {
        if (event.which == 92) {
            event.preventDefault(); //stop character from entering input
        }
    });

    $('#txtBusquedaEmpleado').keypress(function (event) {
        if (event.which == 92) {
            event.preventDefault(); //stop character from entering input
        }
    });

    tblGrupo = $("#tblPoliticaSolicitudxGrupo").jqGrid({
        sortable: true,
        datatype: function () {
            $.ajax({
                url: "Conf_PoliticaSolicitud.aspx/ListarPoliticaSolicitudPorGrupo", //PageMethod
                data: "{'inPagTam':'" + $('#tblPoliticaSolicitudxGrupo').getGridParam("rowNum") + "'," + //Tamaño de pagina
                                  "'inPagAct':'" + parseInt($('#tblPoliticaSolicitudxGrupo').getGridParam("page")) + "'," + //Pagina actual
                                  "'inCodPol': '" + $("#hdfPolitica").val() + "'," +
                                  "'vcCam':'" + $('#ddlBusqueda').val() + "'," + //Campo de busqueda
                                  "'vcTipLin':'" + $('#hdfCodLinTip_X_User').val() + "'," +
                                  "'vcValBus':'" + ValorBusqueda() + "'}", //Valor de busqueda
                dataType: "json",
                type: "post",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    //$("#tblPoliticaSolicitudxGrupo").trigger("reloadGrid");
                    $("#tblPoliticaSolicitudxGrupo")[0].addJSONData(result.d);
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
                    id: "ID"
                },
        colModel: [{ name: 'RowNumber', index: 'RowNumber', label: 'RowNumber', hidden: true },
                               { name: 'inCodGru', index: 'inCodGru', label: 'inCodGru', hidden: true },
   		                       { name: 'vcGru', index: 'vcGru', label: 'Grupo Empleado', hidden: false, width: 300 },
   		                       { name: 'vcVal', index: 'vcVal', label: $("#hdfUnidad").val(), sorttype: "float",
   		                           formatter: function (value, options, rData) { if (value == '0') { return 'Ilimitado'; } else { return value; } }
   		                       },
                               { name: 'inCodPol', index: 'inCodPol', label: 'inCodPol', hidden: true },
                               { name: 'vcPol', index: 'vcPol', label: 'vcPol', hidden: true }
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
        //width: "800",
        height: "90",
        rownumbers: true,
        shrinkToFit: false,
        caption: "Grupos Empleado",
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

    //    if ($("") == '') {
    //        $("#tblPoliticaSolicitudxGrupo").jqGrid('setLabel', 'vcVal', 'NewLabel');
    //    }

    $("#tblPoliticaSolicitudxGrupo").jqGrid('bindKeys', { "onEnter": function (id) { $("#btnCambiarValGrup").click(); }, "onSpace": function (id) { $("#btnCambiarValGrup").click(); } });

    tblEmpleado = $("#tblPoliticaSolicitudxEmpleado").jqGrid({
        sortable: true,
        datatype: function () {
            $.ajax({
                url: "Conf_PoliticaSolicitud.aspx/ListarPoliticaSolicitudPorEmpleado",
                data: "{'inPagTam':'" + $('#tblPoliticaSolicitudxEmpleado').getGridParam("rowNum") + "'," + //Tamaño de pagina
                                  "'inPagAct':'" + parseInt($('#tblPoliticaSolicitudxEmpleado').getGridParam("page")) + "'," + //Pagina actual
                                  "'inCodPol': '" + $("#hdfPolitica").val() + "'," +
                                  "'vcCam':'" + $('#ddlBusquedaEmpleado').val() + "'," + //Campo de busqueda
                                  "'vcTipLin':'" + $('#hdfCodLinTip_X_User').val() + "'," + //Campo de busqueda
                                  "'vcValBus':'" + ValorBusquedaEmpleado() + "'}", //Valor de busqueda
                dataType: "json",
                type: "post",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    $("#tblPoliticaSolicitudxEmpleado")[0].addJSONData(result.d);
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
                    id: "ID"
                },
        colModel: [{ name: 'vcNomCCO', index: 'vcNomCCO', label: 'Centro de Costo', width: 200 },
                           { name: 'vcEmp', index: 'vcEmp', label: 'Empleado', width: 200 },
                           { name: 'vcNomGru', index: 'vcNomGru', label: 'Grupo Empleado', width: 200 },
                           { name: 'vcNomOrg', index: 'vcNomOrg', label: 'Área', width: 200 },
                           { name: 'vcVal', index: 'vcVal', label: $("#hdfUnidad").val(), width: 80, align: "right", sorttype: "float",
                               formatter: function (value, options, rData) { if (value == '0') { return 'Ilimitado'; } else { return value; } }
                           },
                           { name: 'vcCodEmp', index: 'vcCodEmp', label: 'inCodEmp', width: 60, hidden: true },
                           { name: 'inCodGru', index: 'inCodGru', label: 'inCodGru', width: 60, hidden: true },
                           { name: 'inCodOrg', index: 'inCodOrg', label: 'inCodOrg', width: 60, hidden: true },
                           { name: 'vcCodCCO', index: 'vcCodCCO', label: 'vcCodCCO', width: 60, hidden: true },
   	                       ],

        pager: "#pager2", //Pager.
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        rowNum: "10", //$("#hdfTamPag").val(), //"10" PageSize.
        rowList: [10, 20, 30],  //TamanosPaginaSel, //Variable PageSize DropDownList. 
        sortname: "vcEmp", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        //width: "800",
        height: "90",
        multiselect: true,
        rownumbers: true,
        shrinkToFit: false,
        caption: "Excepciones por Empleado",
        ondblClickRow: function (id) { $("#btnCambiarValEmpl").click(); },
        onSelectRow: function (id) {
        },
        sortable: function (permutation) {
            //var colModels = $("#tblPoliticaSolicitudxEmpleado").getGridParam("colModel");
            //alert(colModels);
        },
        resizeStop: function (width, index) {
            //alerta("resize column " + index + " to " + width + "pixels");
        },
        afterInsertRow: function (rowid, aData, rowelem) {
            if (aData.btVig == 'False') {
                var colModels = $("#tblPoliticaSolicitudxEmpleado").getGridParam("colModel");
                for (i in colModels) {
                    $("#tblPoliticaSolicitudxEmpleado").jqGrid('setCell', rowid, i, '', { color: 'red' });
                }
            }
        },
        //onSortCol: function(name,index){  alerta("Column Name: "+name+" Column Index: "+index); },
        ondblClickRow: function (id) {
            $("#tblPoliticaSolicitudxEmpleado").jqGrid('resetSelection');
            $("#tblPoliticaSolicitudxEmpleado").jqGrid('setSelection', id);
            //                        if ($("#hdfEdicion").val() == "1")
            //                            EditaRegistro(id);
        }
    }).navGrid("#pager2", { edit: false, add: false, search: false, del: false });

    $("#tblPoliticaSolicitudxEmpleado").jqGrid('bindKeys', { "onEnter": function (id) { $("#btnCambiarValEmpl").click();}, "onSpace": function (id) { $("#btnCambiarValEmpl").click(); } });

    $("#btnAgregarGrupo").click(function (event) {
        dialogValor($("#hdfPolitica").val(), '', '', '', 'Agregar Grupo Empleado', 1, '', '');
    });

    $("#btnAgregarExcepcion").click(function (event) {
        Codigos = ""; Valores = ""; CodigosNombres = "";
        var id = $("#tblPoliticaSolicitudxGrupo").jqGrid('getGridParam', 'selrow');
        var datos = $("#tblPoliticaSolicitudxGrupo").jqGrid('getRowData', id);
        dialogValor($("#hdfPolitica").val(), id, '', '', 'Agregar Empleado', 2, datos.vcEmp, '');

        v_inCodPol = $("#hdfPolitica").val(); v_CodGru = id; v_vcVal = ""; v_vcNomGru = datos.vcEmp; v_titulo = 'Agregar Empleado';

        //                    if (id) {
        //                        var datos = $("#tblPoliticaSolicitudxGrupo").jqGrid('getRowData', id);
        //                        dialogValor($("#hdfPolitica").val(), id, '', '', 'Agregar Empleado', 2, datos.vcNom, '');
        //                    }
        //                    else {
        //                        alerta("Seleccione un Grupo Empleado");
        //                    }
    });

    $("#btnCambiarValGrup").click(function (event) {
        //alert(isIE());
        if (isIE() == 6) {
            //$("#dvExcepcion").css('z-index', '78000');
            $("#dvExcepcion").css('display', 'none');
        }
        var id = $("#tblPoliticaSolicitudxGrupo").jqGrid('getGridParam', 'selrow');
        if (id) {
            var datos = $("#tblPoliticaSolicitudxGrupo").jqGrid('getRowData', id);
            dialogValor($("#hdfPolitica").val(), id, '', datos.vcVal, 'Editar Grupo Empleado', 1, datos.vcGru, '');
        }
        else {
            alerta("Seleccione un Grupo Empleado");
        }
    });

    inicioPagina();
    function inicioPagina() {
        DimPosElementos();
    }

    $(window).resize(function () {
        DimPosElementos();
    });

    function isIE() { //Vefiricar Version del Internet Explorer
        var myNav = navigator.userAgent.toLowerCase();
        return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
    }

    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        var AnchoLateral = $(".LateralSplitter");
        $(".tabs").css({ height: Alto - 15, width: Ancho - AnchoLateral, marginbotton: 0, paddingbotton: 0 });

        $(".Splitter").css({ height: Alto - 18 });
        if ($(window).width() < 480) {
            $("#tblPoliticaSolicitudxGrupo").setGridWidth(220);
            $("#tblPoliticaSolicitudxEmpleado").setGridWidth(220);
        } else {
            $("#tblPoliticaSolicitudxGrupo").setGridWidth(Ancho - 250);
            $("#tblPoliticaSolicitudxEmpleado").setGridWidth(Ancho - 250);
        }
        if ($(window).height() < 500 && $(window).height() > 400) {
            $("#tblPoliticaSolicitudxGrupo").setGridHeight((Alto - 140) / 4);
            $("#tblPoliticaSolicitudxEmpleado").setGridHeight((Alto - 140) / 4);
        } else if ($(window).height() < 400) {
            $("#tblPoliticaSolicitudxGrupo").setGridHeight(60);
            $("#tblPoliticaSolicitudxEmpleado").setGridHeight(Alto - 60 - 350);
        } else {
            $("#tblPoliticaSolicitudxGrupo").setGridHeight(90);
            $("#tblPoliticaSolicitudxEmpleado").setGridHeight(Alto - 90 - 350);
        }
    }

    $("#btnCambiarValEmpl").click(function (event) {
        Codigos = ""; Valores = ""; CodigosNombres = "";
        var ids = $("#tblPoliticaSolicitudxEmpleado").jqGrid('getGridParam', 'selarrrow');
        if (ids.length > 0) {
            for (i = 0; i < ids.length; i++) {
                var datos = $("#tblPoliticaSolicitudxEmpleado").jqGrid('getRowData', ids[i]);
                Codigos = Codigos + ids[i] + ",";
                Valores = Valores + datos.vcVal + ",";
                CodigosNombres = CodigosNombres + ids[i] + "=" + datos.vcEmp + ",";
            }

            var id = $("#tblPoliticaSolicitudxEmpleado").jqGrid('getGridParam', 'selrow');
            var datos = $("#tblPoliticaSolicitudxEmpleado").jqGrid('getRowData', id);
            var datosGru = $("#tblPoliticaSolicitudxGrupo").jqGrid('getRowData', $("#tblPoliticaSolicitudxGrupo").jqGrid('getGridParam', 'selrow'));
            dialogValor($("#hdfPolitica").val(), datosGru.inCodGru, id, Valores, 'Editar Empleado', 2, datosGru.vcGru, datos.vcEmp);

            v_inCodPol = $("#hdfPolitica").val(); v_CodGru = datosGru.inCodGru; v_vcVal = Valores; v_vcNomGru = datosGru.vcGru; v_titulo = 'Editar Empleado';
        }
        else {
            alerta("Seleccione un Empleado");
        }
        //        var datos = $("#tblPoliticaSolicitudxEmpleado").jqGrid('getRowData', id);
        //        if (Codigos.indexOf(id + ",") != -1) {
        //            Codigos = Codigos.replace(id + ",", "");
        //            Nombres = Nombres.replace(datos.vcEmp + ",", "");
        //            CodigosNombres = CodigosNombres.replace(id + "=" + datos.vcEmp + ",", "");
        //        } else {
        //            Codigos = Codigos + id + ",";
        //            Nombres = Nombres + datos.vcEmp + ",";
        //            CodigosNombres = CodigosNombres + id + "=" + datos.vcEmp + ",";
        //        }
    });

    $("#txtBusqueda").keypress(function (e) {
        $("#txtBusqueda").val($("#txtBusqueda").val().replace(/\\/g, ""));
    });

    $("#txtBusqueda").focusout(function () {
        $("#txtBusqueda").val($("#txtBusqueda").val().replace(/\\/g, ""));
    });

    $("#txtBusquedaEmpleado").keypress(function (e) {
        $("#txtBusquedaEmpleado").val($("#txtBusquedaEmpleado").val().replace(/\\/g, ""));
    });

    $("#txtBusquedaEmpleado").focusout(function () {
        $("#txtBusquedaEmpleado").val($("#txtBusquedaEmpleado").val().replace(/\\/g, ""));
    });


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
        vcBusqueda = $("#txtBusqueda").val().replace(/'/g, "&#39").replace(/\\/g, "");
        $("#tblPoliticaSolicitudxGrupo").trigger("reloadGrid");
    }

    $("#txtBusquedaEmpleado").keyup(function () {
        if (timeoutHndEmpleado) {
            clearTimeout(timeoutHndEmpleado);
        }
        timeoutHndEmpleado = setTimeout(BuscarGrillaEmpleado, 500);
    });
    $("#txtBusquedaEmpleado").each(function (i) {
        asInitValsEmpleado[i] = $(this).val();
    });
    $("#txtBusquedaEmpleado").focus(function () {
        if ($(this).hasClass("txtBusqueda")) {
            $(this).removeClass("txtBusqueda");
            $(this).val("");
        }
    });
    $("#txtBusquedaEmpleado").blur(function (i) {
        if ($(this).val() == "") {
            $(this).addClass("txtBusqueda");
            $(this).val(asInitValsEmpleado[$("#txtBusquedaEmpleado").index(this)]);
        }
    });
    $("#ddlBusquedaEmpleado").change(function (event) {
        $("#txtBusquedaEmpleado").val("");
        $("#txtBusquedaEmpleado").addClass("txtBusqueda");
        $("#txtBusquedaEmpleado").val(asInitValsEmpleado[0]);
        $("#txtBusquedaEmpleado").focus();
    });
    function ValorBusquedaEmpleado() {
        if ($("#txtBusquedaEmpleado").hasClass("txtBusqueda")) {
            return "";
        }
        else {
            return vcBusquedaEmpleado;
        }
    }
    function BuscarGrillaEmpleado() {
        vcBusquedaEmpleado = $("#txtBusquedaEmpleado").val().replace(/'/g, "&#39").replace(/\\/g, "");
        $("#tblPoliticaSolicitudxEmpleado").trigger("reloadGrid");
    }

    function dialogValor(inCodPol, CodGru, CodEmp, vcVal, titulo, tipo, vcNomGru, vcNomEmp) {
        var $width;
        var $height;
        var $Pagina;
        if (tipo == 1) {
            $width = 400;
            $height = 208;
            $Pagina = 'Conf_AgregarGrupo_PolSeg.aspx?inCodPol=' + inCodPol + '&inCodGru=' + CodGru + '&vcVal=' + vcVal + '&vcNomGru=' + vcNomGru;
        }
        else if (tipo == 2) {
            $width = 520;
            $height = 265;
            $Pagina = 'Conf_AgregarEmpleado_PolSeg.aspx?inCodPol=' + inCodPol + '&inCodGru=' + CodGru + '&vcVal=' + vcVal + '&inCodEmp=' + Codigos + '&vcNomGru=' + vcNomGru + '&vcNomEmp=' + CodigosNombres;
        }
        $("#ifExcepcion").width($width - 20);
        $("#ifExcepcion").height($height - 30);
        $("#ifExcepcion").attr("src", $Pagina);

        ModalEmpleados = $("#dvExcepcion").dialog({
            title: titulo,
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
    }

    function CerroMensaje() {
    }

    $("#btnQuitarGrupo").click(function (event) {
        var id = $("#tblPoliticaSolicitudxGrupo").jqGrid('getGridParam', 'selrow');
        if (id) {
            var inCodGru = id;
            var inCodPol = $("#hdfPolitica").val();
            $('#divMsgConfirmacionGrupo').dialog({
                title: "Remover Grupo Empleado",
                modal: true,
                buttons: {
                    "Si": function () {
                        $.ajax({
                            type: "POST",
                            url: "Conf_PoliticaSolicitud.aspx/QuitarGrupo",
                            data: "{'inCodGru': '" + inCodGru + "'," +
                                               "'inCodPol': '" + inCodPol + "'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (msg) {
                                if (msg.d == "") {
                                    $("#tblPoliticaSolicitudxGrupo").jqGrid('delRowData', id);
                                    Mensaje("<br/><h1>Grupo Empleado Quitado</h1><br/>", document, CerroMensaje);
                                }
                                else {
                                    alert(msg.d);
                                }
                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });
                        $(this).dialog("close");
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                }
            });
        }
        else {
            alerta("Seleccione un registro");
        }
    });

    $("#btnQuitarExcepcion").click(function (event) {
        //var id = $("#tblPoliticaSolicitudxEmpleado").jqGrid('getGridParam', 'selrow');
        var id = $("#tblPoliticaSolicitudxEmpleado").jqGrid('getGridParam', 'selarrrow'); //agregado 26-08-2013
        if (id.length > 0) {
            var vcCodEmp = id;
            var inCodPol = $("#hdfPolitica").val();

            $('#divMsgConfirmacionEmpleado').dialog({
                title: "Remover empleado",
                modal: true,
                buttons: {
                    "Si": function () {
                        $.ajax({
                            type: "POST",
                            url: "Conf_PoliticaSolicitud.aspx/QuitarEmpleado",
                            data: "{'vcCodEmp': '" + vcCodEmp + "'," +
                                               "'inCodPol': '" + inCodPol + "'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (msg) {
                                if (msg.d == "") {
                                    var i = id.length - 1;
                                    for (i = id.length - 1; i >= 0; i--) {
                                        $("#tblPoliticaSolicitudxEmpleado").jqGrid('delRowData', id[i]);
                                    }
                                    Mensaje("<br/><h1>Empleado(s) quitado(s)</h1><br/>", document, CerroMensaje);
                                }
                                else {
                                    alert(msg.d);
                                }
                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });
                        $(this).dialog("close");
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                }
            });
        }
        else {
            alerta("Seleccione un registro");
        }
    });
    //                function CargarEmpleadoPorGrupo(id) {
    //                    $("#tblPoliticaSolicitudxEmpleado").jqGrid('clearGridData');
    //                    $.ajax({
    //                        type: "POST",
    //                        url: "Conf_PoliticaSolicitud.aspx/ListarPoliticaSolicitudPorEmpleado",
    //                        data: "{'inCodGru': '" + id + "'," +
    //                               "'inCodPol': '" + $("#hdfPolitica").val() + "'}",
    //                        contentType: "application/json; charset=utf-8",
    //                        dataType: "json",
    //                        success: function (result) {
    //                            for (var i = 0; i < $(result.d).length; i++)
    //                                $("#tblPoliticaSolicitudxEmpleado").jqGrid('addRowData', result.d[i].P_vcCod, result.d[i]);
    //                        },
    //                        error: function (xhr, err, thrErr) {
    //                            MostrarErrorAjax(xhr, err, thrErr);
    //                        }
    //                    });
    //                }

    //                $.ajax({
    //                        type: "POST",
    //                        url: "Conf_PoliticaSolicitud.aspx/ListarPoliticaSolicitudPorEmpleado",
    //                        data: "{'inCodPol': '" + $("#hdfPolitica").val() + "'}",
    //                        contentType: "application/json; charset=utf-8",
    //                        dataType: "json",
    //                        success: function (result) {
    //                            for (var i = 0; i < $(result.d).length; i++)
    //                                $("#tblPoliticaSolicitudxEmpleado").jqGrid('addRowData', result.d[i].P_vcCod, result.d[i]);
    //                        },
    //                        error: function (xhr, err, thrErr) {
    //                            MostrarErrorAjax(xhr, err, thrErr);
    //                        }
    //                    });
});

function ActualizarGrillaExcepciones() {
    $("#tblPoliticaSolicitudxEmpleado").trigger("reloadGrid");
}