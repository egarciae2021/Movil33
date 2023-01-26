var MargenFiltro = 0;
var MargenHeight = 48;
var inGrupo = "0";
var TamanoPagina = [10, 20, 30];
var inFilas;
var inAltGrid;

 //function JQGrid(IdGrilla, IdPaginado, fnData, oColModel, ancho, alto, sortname, multiSeleccion, fncDobleClick)
//function JQGrid(IdGrilla, IdPaginado, fnData, oColModel, ancho, alto, sortname, multiSeleccion, fncDobleClick, fncSelect)
//function MetodoWeb(Metodo, Data, fncSatisfactoria, fncError)
//function confirmacion(contenido, fncAccionSi, fncAccionNo, Titulo)
var arCodEmpleados = [];
function empleado() {
    this.P_vcCod;
    this.vcNom;
    this.vcVal;
}
function DimPosElementos() {    
    var Ancho = $(window).width();
    var Alto = $(window).height();
    //alert(Ancho + "; " + Alto);
    //$("#tblCreditoGrupo").setGridWidth(Ancho - 150);
    //$("#tblCreditoEmpleado").setGridWidth(Ancho - 150);
    //alert($("#tbFiltroGrupo")[0].clientWidth);
    //alert($("#tbFiltroEmpleado")[0].clientWidth);
    //var anchoGrupo = $("#tbFiltroGrupo")[0].clientWidth;
    //var anchoEmpleado = $("#tbFiltroEmpleado")[0].clientWidth;
    
    //$("#tblCreditoGrupo").setGridWidth(420);
    $("#tblCreditoGrupo").setGridWidth(Ancho * 42 / 100 + 5);
    $("#tblCreditoGrupo").setGridHeight(Alto - 163);
    $("#txtBusquedaGrupo").css("width", Ancho * 42 / 100 - 240);
    //$("#tblCreditoEmpleado").setGridWidth(515);
    $("#tblCreditoEmpleado").setGridWidth(Ancho * 53 / 100 + 5);
    $("#tblCreditoEmpleado").setGridHeight(Alto - 163); //220
    $("#txtBusquedaEmpleado").css("width", Ancho * 51 / 100 - 250);

    //if (Alto - 320 > 50) {
        //$("#tblCreditoGrupo").setGridHeight(Alto - 320);
        //$("#tblCreditoEmpleado").setGridHeight(Alto - 320);
    //}
    //else {
        //$("#tblCreditoGrupo").setGridHeight(50);
        //$("#tblCreditoEmpleado").setGridHeight(50);
    //}
//    var AnchoLateral = $(".LateralSplitter");
//    $(".tabs").css({ height: Alto - 25, width: Ancho - AnchoLateral, marginbotton: 0, paddingbotton: 0 });

//    $(".Splitter").css({ height: Alto - 18 });

//    if ($(window).width() < 480) {
//        $("#tblCreditoGrupo").setGridWidth(400);
//        $("#tblCreditoEmpleado").setGridWidth(400);
//    } else {
//        $("#tblCreditoGrupo").setGridWidth($(window).width() - 150);
//        $("#tblCreditoEmpleado").setGridWidth($(window).width() - 150);
//    }

//    if ($(window).height() < 600 && $(window).height() > 400) {
//        $("#tblCreditoGrupo").setGridHeight(($(window).height() - 50) / 4);
//        $("#tblCreditoEmpleado").setGridHeight(($(window).height() - 50) / 4);
//    } else if ($(window).height() < 400) {
//        $("#tblCreditoGrupo").setGridHeight(100);
//        $("#tblCreditoEmpleado").setGridHeight(100);
//    } else {
//        $("#tblCreditoGrupo").setGridHeight(180);
//        $("#tblCreditoEmpleado").setGridHeight(180);
//    }
}

function inicioPagina() {
    DimPosElementos();
}

$(function () {
    inAltGrid = $(window).height() - 168 - MargenFiltro * MargenHeight;

    $("input:checkbox,input:radio,input:file").uniform();
    combokendoFormar("#ddlCampanaActiva", 200);
    combokendoFormar("#ddlTipoCreditoGrupo", 200);
    combokendoFormar("#ddlTipoCreditoEmpleado", 200);
    combokendoFormar("#ddlBusquedaGrupo", 200);
    combokendoFormar("#ddlBusquedaEmpleado", 200);

    //$("#ddlBusquedaEmpleado").change(function () { //agregado 25-11-2014 wapumayta
    //    if ($(this).val() == 'vcEmp') {
    //        $("#dvInfoBuscarAreas").show();
    //    } else {
    //        $("#dvInfoBuscarAreas").hide();
    //    }
    //});

    $("#chkExceptos").change(function () {
        if ($(this).is(":checked")) {
            inGrupo = "1";
        } else {
            inGrupo = "0";
        }
        CargarCampanaCreditoEmpleado("busq");
    });

    $("#txtBusquedaGrupo").keypress(ValidarAlfaNumericoConEspacios);
    $("#txtBusquedaEmpleado").keypress(ValidarAlfaNumericoConEspacios);
    //$("#txtAprobadoGrupoOrigen").keypress(ValidarDecimalPositivo);
    $("#txtAprobadoGrupoOrigen").live("keypress", function (e) {
        if (e.keyCode == 13) {
            $("#btnGrabarCreditoGrupo").click();
        } else {
            return ValidarDecimalPositivo(e);
        }
    });
    //$("#txtAprobEditGrup").keypress(ValidarDecimalPositivo);
    $("#txtAprobEditGrup").live("keypress", function (e) {
        if (e.keyCode == 13) {
            $("#btnGuardarEditGrupo").click();
        } else {
            return ValidarDecimalPositivo(e);
        }
    });
    //$("#txtAprobadoEmpleado").keypress(ValidarDecimalPositivo);
    $("#txtAprobadoEmpleado").live("keypress", function (e) {
        if (e.keyCode == 13) {
            $("#btnGrabarCreditoEmpleado").click();
        } else {
            return ValidarDecimalPositivo(e);
        }
    });
    //$("#txtAprobadoEditEmp").keypress(ValidarDecimalPositivo);
    $("#txtAprobadoEditEmp").live("keypress", function (e) {
        if (e.keyCode == 13) {
            $("#btnGuardarEditEmpleado").click();
        } else {
            return ValidarDecimalPositivo(e);
        }
    });

    function NumeroInicialFilas() {
        var nuAltoFila = 23.04;
        inFilas = Math.floor(inAltGrid / nuAltoFila);
    }

    var oColModelCreditoGrupo = [
        { name: 'rowIdG', label: 'rowIdG', fixed: true, sortable: false, resize: false, width: 20, hidden: true },
        { name: 'IdCampana', label: 'IdCampana', fixed: true, sortable: false, resize: false, width: 20, hidden: true },
        { name: 'IdTipoCredito', label: 'IdTipoCredito', index: 'id', width: 80, hidden: true },
        { name: 'TipoCredito', label: 'Tipo Crédito', index: 'id', width: 70, sort: false },
        { name: 'IdGrupo', label: 'IdGrupo', index: 'invdate', width: 170, hidden: true },
        { name: 'Grupo', label: 'Grupo', index: 'invdate', width: 210, sort: false },
        { name: 'Aprobado', label: 'Aprobado', index: 'name', width: 70, align: 'Right', sort: false }
        ];

    $("#tblCreditoGrupo").jqGrid({
        sortable: true,
        datatype: CargarCampanaCreditoGrupo,
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
        colModel: oColModelCreditoGrupo,
        pager: "#pagerCreditoGrupo", //Pager.
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        rowNum: inFilas,
        rowList: TamanoPagina,
        titulo: 'Especialista',
        sortname: "Grupo", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        height: "auto",
        width: "300",
        rownumbers: true,
        shrinkToFit: false,
        caption: "Grupos (Doble click para editar)",
        hidegrid: false,
        //onSelectRow: function (id) {
        //    var datos = $("#tblCreditoGrupo").jqGrid('getRowData', id);
        //
        //    inGrupo = datos.IdGrupo;
        //    CargarCampanaCreditoEmpleado();
        //},
        ondblClickRow: function (id) {
            $("#btnEditarCreditoGrupo").click();
        }
        //, gridComplete: function () {
        //    $("#tblCreditoGrupo").setSelection(1);
        //}
    }).navGrid("#pagerCreditoGrupo", { edit: false, add: false, search: false, del: false });


    var oColModelCreditoEmpleado = [
            { name: 'rowId', label: 'rowId', fixed: true, sortable: false, resize: false, width: 20, hidden: true },
            { name: 'IdCampana', label: 'IdCampana', fixed: true, sortable: false, resize: false, width: 20, hidden: true },
            { name: 'IdTipoCredito', label: 'IdTipoCredito', index: 'id', width: 80, hidden: true },
            { name: 'TipoCredito', label: 'Tipo Crédito', index: 'id', width: 70, sort: false },
            { name: 'IdEmpleado', label: 'IdEmpleado', index: 'invdate', width: 170, hidden: true },
            { name: 'Empleado', label: 'Empleado', index: 'invdate', width: 200, sort: false },
            { name: 'Aprobado', label: 'Aprobado', index: 'name', width: 70, align: 'Right', sort: false },
            { name: 'GrupoStaff', label: 'Grupo Staff', index: 'GrupoStaff', width: 150, sort: false },
            { name: 'Area', label: 'Área', index: 'Area', width: 200, sort: false },
            { name: 'CentroCosto', label: 'Centro de Costo', index: 'CentroCosto', width: 200, sort: false },
            { name: 'GrupoFamilia', label: 'Grupo Familia', index: 'GrupoFamilia', width: 200, sort: false },
            { name: 'Excepto', label: 'Excepto', index: 'Excepto', width: 30, sort: false }
        ];

    $("#tblCreditoEmpleado").jqGrid({
        sortable: true,
        datatype: CargarCampanaCreditoEmpleado,
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
        colModel: oColModelCreditoEmpleado,
        pager: "#pagerCreditoEmpleado", //Pager.
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        rowNum: inFilas,
        rowList: TamanoPagina,
        titulo: 'Especialista',
        sortname: "Empleado", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        height: "auto",
        width: "300",
        rownumbers: true,
        shrinkToFit: false,
        caption: "Empleados (Doble click para editar)",
        hidegrid: false,
        ondblClickRow: function (id) {
            $("#btnEditarCreditoEmpleado").click();
        }
    }).navGrid("#pagerCreditoEmpleado", { edit: false, add: false, search: false, del: false });


    var oColModelGrupoOrigen = [
    //{ name: 'rowId', label: 'rowId', fixed: true, sortable: false, resize: false, width: 20, hidden: false },
        {name: 'P_inCodGruOri', label: 'Código', index: 'id', width: 100, sortable: false },
        { name: 'vcNomGru', label: 'Grupo Empleado', index: 'id' },
        { name: 'inTipLin', label: 'Codigo Tipo Linea', index: 'lin', width: 100, sortable: false, hidden: true },
        { name: 'vcNomTipLin', label: 'Tipo Línea', index: 'lin', width: 110 }
    ];


    var AnchoGrilla = $(window).width() - 140;

    //var tblCreditoGrupo = JQGrid("#tblCreditoGrupo", "#pagerCreditoGrupo", CargarCampanaCreditoGrupo, oColModelCreditoGrupo, 300, 155, "rowIdG", false, DCeditarGrupoOrigen, fnGruOriSelect);
    //var tblCreditoEmpleado = JQGrid("#tblCreditoEmpleado", "#pagerCreditoEmpleado", CargarCampanaCreditoEmpleado, oColModelCreditoEmpleado, 300, 155, "rowId", false, DCeditarEmpleado, fnEmpSelect);
    var tblGrupoOrigen = JQGrid("#tblGrupoOrigen", "#pagerGrupoOrigen", "", oColModelGrupoOrigen, 490, 235, "P_inCodGruOri", false, dobleclickRow, fnGrupOriAddSelect);

    //    $("#tblGrupoOrigen").setCaption('Grupos De Origen');


    inicioPagina();
    $(window).resize(function () {
        DimPosElementos();
        NumeroInicialFilas();
    });

    //    $(window).resize(function () {
    //        var AnchoGrilla = $(window).width() - 140;
    //        $("#gbox_tblCreditoGrupo").width(AnchoGrilla);
    //        $("#gbox_tblCreditoEmpleado").width(AnchoGrilla);
    //    });

    //CargarCampanaCreditoGrupo();
    //CargarCampanaCreditoEmpleado();

    $("#ddlCampanaActiva").change(function () {
        var IdCampana = $("#ddlCampanaActiva").data("kendoComboBox").value();
        limpiarValoresFiltro();
        CargarCampanaCreditoGrupo();
        CargarCampanaCreditoEmpleado();

    });

    if ($("#hdfIdCampana").val() != "" && $("#hdfIdCampana").val() != "-1") {
        limpiarValoresFiltro();
        CargarCampanaCreditoGrupo();
        CargarCampanaCreditoEmpleado();
    }

    //FILTRO GRUPO 
    $("#txtBusquedaGrupo").focus(function () {
        if ($(this).hasClass("txtBusqueda")) {
            $(this).removeClass("txtBusqueda");
            $(this).val("");
        }
    });
    $("#txtBusquedaGrupo").keyup(function () {
        setTimeout(CargarCampanaCreditoGrupo('busq'), 1000);
    });
    $("#txtBusquedaGrupo").focusout(function () {
        if (!$(this).hasClass("txtBusqueda") && $(this).val() == '') {
            $(this).addClass("txtBusqueda");
            $(this).val("Valor a filtrar");
        }
    });
    //FILTRO EMPLEADO
    $("#txtBusquedaEmpleado").focus(function () {
        if ($(this).hasClass("txtBusqueda")) {
            $(this).removeClass("txtBusqueda");
            $(this).val("");
        }
    });
    $("#txtBusquedaEmpleado").keyup(function () {
        setTimeout(CargarCampanaCreditoEmpleado('busq'), 1000);
    });
    $("#txtBusquedaEmpleado").focusout(function () {
        if (!$(this).hasClass("txtBusqueda") && $(this).val() == '') {
            $(this).addClass("txtBusqueda");
            $(this).val("Valor a filtrar");
        }
    });
    //ACCIONES GRUPO
    $("#btnAgregarCreditoGrupo").click(function () {
        if ($("#ddlCampanaActiva").data("kendoComboBox").value() == "-1") {
            alerta("Seleccione una Campaña");
            return;
        }
        MostrarGrupoOrigen();
    });
    $("#btnGrabarCreditoGrupo").click(function () {
        //grabar credito grupo en base de datos
        //var arIdGru = $("#tblGrupoOrigen").jqGrid('getGridParam', 'selarrrow');
        var IdGrup = $("#tblGrupoOrigen").jqGrid('getGridParam', 'selrow');
        var IdTipCre = $("#ddlTipoCreditoGrupo").data("kendoComboBox").value();
        //var IdGrup = arIdGru.join(',');
        var IdCamp = $("#ddlCampanaActiva").data("kendoComboBox").value();
        var Aprob = $("#txtAprobadoGrupoOrigen").val();
        if (IdTipCre == "-1") {
            alerta("Seleccione un tipo de crédito");
            return;
        }
        if (Aprob == "") {
            alerta("Ingrese monto aprobado");
            return;
        }
        if (Aprob[0] == 0) {
            alerta("Ingrese un monto aprobado válido");
            return;
        }
        //if ($(arIdGru).length == 0) {
        if (IdGrup == null) {
            alerta("Seleccione por lo menos un Grupo de Empleado");
            return;
        }
        MetodoWeb("Cam_Mnt_CampanaCredito.aspx/InsertarCreditoGrupo", JSON.stringify({ IdGrup: IdGrup, IdCamp: IdCamp, IdTipCre: IdTipCre, Aprob: Aprob }), ResulInsertarCreditoGrupo, null);

    });
    $("#btnCerrarDialogGrupo").click(function () {
        $("#divAgregarCreditoGrupo").dialog("close");
        limpiarDialogAgregarGrupo();
    });

    $("#btnEditarCreditoGrupo").click(function () {
        if ($("#ddlCampanaActiva").data("kendoComboBox").value() == "-1") {
            alerta("Seleccione una Campaña");
            return;
        }
        //var CredGrupSel = $("#tblCreditoGrupo").jqGrid('getGridParam', 'selarrrow');
        var CredGrupSel = $("#tblCreditoGrupo").getGridParam('selrow');
        if (CredGrupSel != null) {
            //if (CredGrupSel.length == 1) {
            var datosEditGrupo = $("#tblCreditoGrupo").jqGrid('getRowData', CredGrupSel);
            //alert(datosEditGrupo.TipoCredito + ", " + datosEditGrupo.Grupo + ", " + datosEditGrupo.Aprobado);
            $("#lblTipCredGrup").text(datosEditGrupo.TipoCredito);
            $("#lblGrupoEdit").text(datosEditGrupo.Grupo);
            $("#hdfCredGrup_TipCred").val(datosEditGrupo.IdTipoCredito);
            $("#hdfCredGrup_Grup").val(datosEditGrupo.IdGrupo);
            $("#txtAprobEditGrup").val(QuitarFormatoNumero(datosEditGrupo.Aprobado));
            $("#divEditarCreditoGrupo").dialog({
                title: "Editar Crédito Grupo Empleado",
                width: 350,
                height: 150,
                modal: true,
                resizable: false
            });
            //} else {
            //    alerta("Seleccione solo un Grupo de Origen para editar");
            //};
        } else {
            alerta("Seleccione un Grupo de Crédito");
        }
    });
    $("#btnGuardarEditGrupo").click(function () {
        //editar credito grupo en la base de datos
        var Aprob = $("#txtAprobEditGrup").val();
        var IdGrup = $("#hdfCredGrup_Grup").val();
        var IdTipCre = $("#hdfCredGrup_TipCred").val();
        var IdCamp = $("#ddlCampanaActiva").data("kendoComboBox").value();
        if (Aprob == '') {
            alerta("Debe ingresar el monto aprobado");
            return;
        }
        //if (Aprob[0] == 0) {
        //    alerta("Ingrese un monto aprobado válido");
        //    return;
        //};
        MetodoWeb("Cam_Mnt_CampanaCredito.aspx/ActualizarCreditoGrupo", JSON.stringify({ IdGrup: IdGrup, IdCamp: IdCamp, IdTipCre: IdTipCre, Aprob: Aprob }), ResulActualizarCreditoGrupo, null);
    });
    $("#btnCerrarEditGrupo").click(function () {
        $("#divEditarCreditoGrupo").dialog("close");
    });

    $("#btnQuitarCreditoGrupo").click(function () {
        if ($("#ddlCampanaActiva").data("kendoComboBox").value() == "-1") {
            alerta("Seleccione una Campaña");
            return;
        }
        //eliminar credito grupo de la base de datos
        var CredGrupSel = $("#tblCreditoGrupo").jqGrid('getGridParam', 'selarrrow');
        if (CredGrupSel.length != 0) {
            var lstIdTipCre = [];
            var lstIdGrup = [];
            var g;
            for (g = 0; g < CredGrupSel.length; g++) {
                var datosGrupo = $("#tblCreditoGrupo").jqGrid('getRowData', CredGrupSel[g]);
                lstIdTipCre.push(datosGrupo.IdTipoCredito);
                lstIdGrup.push(datosGrupo.IdGrupo);
            }
            var IdTipCre = lstIdTipCre.join(",");
            var IdGrup = lstIdGrup.join(",");
            var IdCamp = $("#ddlCampanaActiva").data("kendoComboBox").value();
            //EliminarCreditoGrupo
            $('#divMsgConfirmacionGrupo').dialog({
                title: "Remover Grupo Empleado",
                modal: true,
                buttons: {
                    "Si": function () {
                        MetodoWeb("Cam_Mnt_CampanaCredito.aspx/EliminarCreditoGrupo", JSON.stringify({ IdGrup: IdGrup, IdCamp: IdCamp, IdTipCre: IdTipCre }), ResulEliminarCreditoGrupo, null);
                        $(this).dialog("close");
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                },
                resizable: false
            });
        } else {
            alerta("Seleccione por lo menos un Grupo de Empleado");
        }
    });
    //ACCIONES EMPLEADO
    $("#btnAgregarCreditoEmpleado").click(function () {
        var IdCampana = $("#ddlCampanaActiva").data("kendoComboBox").value();
        if (IdCampana != "-1") {
            MetodoWeb("Cam_Mnt_CampanaCredito.aspx/ListarCreditoTipo", JSON.stringify({ 'IdCampana': IdCampana }), CargarCreditoTipoEmpleado, null);
        } else {
            alerta("Seleccione una Campaña");
        }
    });
    $("#btnSeleccionEmpleado").click(function () {
        //mostrar seleccion empleado
        var $width = 740;
        var $height = 500;
        var $Pagina = '../../Consultar/Con_SeleccionArea.aspx?Tipo=2&Multiple=1';
        $("#ifSeleccionEmpleado").attr("src", $Pagina);
        Modal = $('#divSeleccionEmpleado').dialog({
            title: "Seleccionar Empleado",
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
    });
    $("#btnGrabarCreditoEmpleado").click(function () {
        //grabar camapaña credito empleado
        var IdTipCre = $("#ddlTipoCreditoEmpleado").data("kendoComboBox").value();
        var IdEmp = arCodEmpleados.join(',');
        var IdCamp = $("#ddlCampanaActiva").data("kendoComboBox").value();
        var Aprob = $("#txtAprobadoEmpleado").val();
        if (IdTipCre == "-1") {
            alerta("Seleccione un tipo de crédito");
            return;
        }
        if (Aprob == "") {
            alerta("Ingrese monto aprobado");
            return;
        }
        if (Aprob[0] == 0) {
            alerta("Ingrese un monto aprobado válido");
            return;
        }
        if (arCodEmpleados.length == 0) {
            alerta("Seleccione por lo menos un Empleado");
            return;
        }
        MetodoWeb("Cam_Mnt_CampanaCredito.aspx/InsertarCreditoEmpleado", JSON.stringify({ IdEmp: IdEmp, IdCamp: IdCamp, IdTipCre: IdTipCre, Aprob: Aprob }), ResulInsertarCreditoEmpleado, null);

    });
    $("#btnCerrarDialoEmpleado").click(function () {
        $("#divAgregarCreditoEmpleado").dialog("close");
        limpiarDialogAgregarEmpleado();
    });

    $("#btnEditarCreditoEmpleado").click(function () {
        if ($("#ddlCampanaActiva").data("kendoComboBox").value() == "-1") {
            alerta("Seleccione una Campaña");
            return;
        }
        //var CredEmpSel = $("#tblCreditoEmpleado").jqGrid('getGridParam', 'selarrrow');
        var CredEmpSel = $("#tblCreditoEmpleado").jqGrid('getGridParam', 'selrow');
        if (CredEmpSel != null) {
            var datosEditEmpleado = $("#tblCreditoEmpleado").jqGrid('getRowData', CredEmpSel);
            $("#lblTipCredEmp").text(datosEditEmpleado.TipoCredito);
            $("#lblEmpladoEdit").text(datosEditEmpleado.Empleado);
            $("#hdfCredEmp_TipCred").val(datosEditEmpleado.IdTipoCredito);
            $("#hdfCredEmp_Emp").val(datosEditEmpleado.IdEmpleado);
            $("#txtAprobadoEditEmp").val(QuitarFormatoNumero(datosEditEmpleado.Aprobado));
            $("#divEditarCreditoEmpleado").dialog({
                title: "Editar Crédito Empleado",
                width: 350,
                height: 150,
                modal: true,
                resizable: false
            });
        } else {
            alerta("Seleccione un Empleado");
        }
    });
    $("#btnGuardarEditEmpleado").click(function () {
        //editar credito empleado en la base de datos
        var Aprob = $("#txtAprobadoEditEmp").val();
        var IdEmp = $("#hdfCredEmp_Emp").val();
        var IdTipCre = $("#hdfCredEmp_TipCred").val();
        var IdCamp = $("#ddlCampanaActiva").data("kendoComboBox").value();
        if (Aprob == '') {
            alerta("Debe ingresar el monto aprobado");
            return;
        }
        BloquearPagina(true);
        MetodoWeb("Cam_Mnt_CampanaCredito.aspx/ActualizarCreditoEmpleado", JSON.stringify({ IdEmp: IdEmp, IdCamp: IdCamp, IdTipCre: IdTipCre, Aprob: Aprob }), ResulActualizarCreditoEmpleado, null);
    });
    $("#btnCerrarEditEmpleado").click(function () {
        $("#divEditarCreditoEmpleado").dialog("close");
    });
    $("#btnQuitarCreditoEmpleado").click(function () {
        if ($("#ddlCampanaActiva").data("kendoComboBox").value() == "-1") {
            alerta("Seleccione una Campaña");
            return;
        }
        //eliminar credito empleado de la base de datos
        var CredEmpSel = $("#tblCreditoEmpleado").jqGrid('getGridParam', 'selarrrow');
        if (CredEmpSel.length != 0) {
            var lstIdTipCre = [];
            var lstIdEmp = [];
            var g;
            for (g = 0; g < CredEmpSel.length; g++) {
                var datosEmpleado = $("#tblCreditoEmpleado").jqGrid('getRowData', CredEmpSel[g]);
                lstIdTipCre.push(datosEmpleado.IdTipoCredito);
                lstIdEmp.push(datosEmpleado.IdEmpleado);
            }
            var IdTipCre = lstIdTipCre.join(",");
            var IdEmp = lstIdEmp.join(",");
            var IdCamp = $("#ddlCampanaActiva").data("kendoComboBox").value();
            //EliminarCreditoEmpleado
            $('#divMsgConfirmacionEmpleado').dialog({
                title: "Remover Empleado",
                modal: true,
                buttons: {
                    "Si": function () {
                        MetodoWeb("Cam_Mnt_CampanaCredito.aspx/EliminarCreditoEmpleado", JSON.stringify({ IdEmp: IdEmp, IdCamp: IdCamp, IdTipCre: IdTipCre }), ResulEliminarCreditoEmpleado, null);
                        $(this).dialog("close");
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                },
                resizable: false
            });
        } else {
            alerta("Seleccione un Empleado");
        }
    });

    $("#imgQuitarEmp").click(function () {
        var len = $("#lstEmpleado option:selected").length;
        if (len != 0) {
            var vcValor = $("#lstEmpleado option:selected")[0].value;
            if (vcValor != null) {
                var i;
                for (i = 0; i < $("#lstEmpleado")[0].options.length; i++) {
                    if ($.trim($("#lstEmpleado")[0].options[i].value) == vcValor) {
                        $("#lstEmpleado")[0].options.remove(i);
                    }
                }
            }
        }
        else {
            alerta("Seleccione un empleado a quitar");
        }
    });

});                                                                          //FIN DE LOAD

//FUNCIONES DE CARGA
function CargarCampanaCreditoGrupo(busq) {
    var IdCampana = $("#hdfIdCampana").val();  //$("#ddlCampanaActiva").data("kendoComboBox").value();
    var vcCampoFiltro = $("#ddlBusquedaGrupo").data("kendoComboBox").value();
    var vcValorFiltro = $("#txtBusquedaGrupo").val();
    var inPagTam = $("#tblCreditoGrupo").getGridParam("rowNum");
    var inPagAct = '';
    if (busq != "busq") { 
        inPagAct = $("#tblCreditoGrupo").getGridParam("page");
    } else { //si es una busqueda regresa a la pagina 1
        inPagAct = 1;
    }
    if ($("#txtBusquedaGrupo").hasClass("txtBusqueda")) {
        vcValorFiltro = '';
    }
    inGrupo = "0";
    if (IdCampana != "-1") {
        MetodoWeb("Cam_Mnt_CampanaCredito.aspx/ListarCreditoGrupo", JSON.stringify({ 'IdCampana': IdCampana, 'vcCampoFiltro': vcCampoFiltro, 'vcValorFiltro': vcValorFiltro, inPagTam: inPagTam, inPagAct: inPagAct }), CargarCreditoGrupo, null);
    } else {
        $("#tblCreditoGrupo").jqGrid('clearGridData');
        $("#tblCreditoEmpleado").jqGrid('clearGridData');
    }
}

function CargarCampanaCreditoEmpleado(busq) {
    var IdCampana = $("#hdfIdCampana").val();  //$("#ddlCampanaActiva").data("kendoComboBox").value();
    //var vcTipoCred = '';
    var vcCampoFiltro = $("#ddlBusquedaEmpleado").data("kendoComboBox").value();
    var vcValorFiltro = $("#txtBusquedaEmpleado").val();
    var inPagTam = $("#tblCreditoEmpleado").getGridParam("rowNum");
    var inPagAct = '';
    
    if (busq != "busq") {
        inPagAct = $("#tblCreditoEmpleado").getGridParam("page");
    } else {
        inPagAct = 1;
    }
    //var inGrupo = $("#tblGrupoOrigen").jqGrid('getGridParam', 'selrow');
    if ($("#txtBusquedaEmpleado").hasClass("txtBusqueda")) {
        vcValorFiltro = '';
    }
    if (IdCampana != "-1") {
        //if (inGrupo != "0") {
        //    MetodoWeb("Cam_Mnt_CampanaCredito.aspx/ListarCreditoEmpleado", JSON.stringify({ 'IdCampana': IdCampana, 'vcCampoFiltro': vcCampoFiltro, 'vcValorFiltro': vcValorFiltro, inPagTam: inPagTam, inPagAct: inPagAct, 'inGrupo': inGrupo }), CargarCreditoEmpleado, null);
        //} else if (inGrupo == "0" && vcValorFiltro != "" && vcCampoFiltro == 'vcEmp') { //buscar por nombre de empleado en todas las areas
        //    vcCampoFiltro = "vcNomEmp";
        //    MetodoWeb("Cam_Mnt_CampanaCredito.aspx/ListarCreditoGrupo", JSON.stringify({ 'IdCampana': IdCampana, 'vcCampoFiltro': vcCampoFiltro, 'vcValorFiltro': vcValorFiltro, inPagTam: inPagTam, inPagAct: inPagAct }), CargarCreditoGrupo, null);
        //}
        MetodoWeb("Cam_Mnt_CampanaCredito.aspx/ListarCreditoGrupo", JSON.stringify({ 'IdCampana': IdCampana, 'vcCampoFiltro': vcCampoFiltro, 'vcValorFiltro': vcValorFiltro, inPagTam: inPagTam, inPagAct: 1 }), CargarCreditoGrupo, null);
        MetodoWeb("Cam_Mnt_CampanaCredito.aspx/ListarCreditoEmpleado", JSON.stringify({ 'IdCampana': IdCampana, 'vcCampoFiltro': vcCampoFiltro, 'vcValorFiltro': vcValorFiltro, inPagTam: inPagTam, inPagAct: inPagAct, 'inGrupo': inGrupo }), CargarCreditoEmpleado, null);
    } else {
        $("#tblCreditoEmpleado").jqGrid('clearGridData');
    }
}

function MostrarGrupoOrigen() {
    //cargar grupos de origen y tipos de credito
    var IdCampana = $("#ddlCampanaActiva").data("kendoComboBox").value();
    var inPagTam = $("#tblGrupoOrigen").getGridParam("rowNum");
    var inPagAct = $("#tblGrupoOrigen").getGridParam("page");
    if (IdCampana != "-1") {
        MetodoWeb("Cam_Mnt_CampanaCredito.aspx/ListarCreditoTipo", JSON.stringify({ 'IdCampana': IdCampana }), CargarCreditoTipo, null);
        MetodoWeb("Cam_Mnt_CampanaCredito.aspx/ListarGrupoOrigen", JSON.stringify({ inPagTam: inPagTam, inPagAct: inPagAct }), CargarGrupoOrigen, null);
    } else {
        //alerta("Seleccione una Campaña");
    }
}

function CargarCreditoGrupo(lstCreditoGrupo) {
    $("#tblCreditoGrupo").jqGrid('clearGridData');
    if ($(lstCreditoGrupo).length > 0) {
        for (i = 0; i < lstCreditoGrupo.Items.length; i++) {
            lstCreditoGrupo.Items[i].Row[6] = FormatoNumero(lstCreditoGrupo.Items[i].Row[6], $("#hdfSepMiles").val(), $("#hdfSepDecimal").val(), $("#hdfNumDecimales").val());
        }
        $("#tblCreditoGrupo")[0].addJSONData(lstCreditoGrupo);
        //$("#tblCreditoEmpleado").jqGrid('clearGridData');
    } else {
        //alerta("No hay datos");
    }
    //$("#tblCreditoGrupo").trigger("reloadGrid", [{ page: 1}]);
}

function CargarCreditoEmpleado(lstCreditoEmpleado) {
    $("#tblCreditoEmpleado").jqGrid('clearGridData');
    if ($(lstCreditoEmpleado).length > 0) {
        for (i = 0; i < lstCreditoEmpleado.Items.length; i++) {
            lstCreditoEmpleado.Items[i].Row[6] = FormatoNumero(lstCreditoEmpleado.Items[i].Row[6]);
        }
        $("#tblCreditoEmpleado")[0].addJSONData(lstCreditoEmpleado);
    } else {
        //alerta("No hay datos");
    }
}

//function CargarGrupoOrigen(lstGrupoOrigen) {
//    $("#tblGrupoOrigen").jqGrid('clearGridData');
//    if ($(lstGrupoOrigen).length > 0) {
//        for (var i = 0; i < $(lstGrupoOrigen).length; i++) {
//            $("#tblGrupoOrigen").jqGrid('addRowData', lstGrupoOrigen[i].P_inCodGruOri, lstGrupoOrigen[i]);
//        };
//        $("#divAgregarCreditoGrupo").dialog({
//            title: "Agregar Crédito Grupo Empleado",
//            width: 520,
//            height: 370,
//            modal: true,
//            resizable: false
//        });
//    } else {
//        alerta("No hay datos disponibles");
//    };
//};

function CargarGrupoOrigen(lstGrupoOrigen) {
    $("#tblGrupoOrigen").jqGrid('clearGridData');
    if ($(lstGrupoOrigen).length > 0) {
        $("#tblGrupoOrigen")[0].addJSONData(lstGrupoOrigen);
        $("#divAgregarCreditoGrupo").dialog({
            title: "Agregar Crédito Grupo Empleado",
            width: 520,
            height: 435,
            modal: true,
            resizable: false
        });
    } else {
        //alerta("No hay datos");
    }
}

function CargarCreditoTipo(lstCreditoTipo) {
    $("#ddlTipoCreditoGrupo").html("");
    var itemsCreditoTipo = [];
    if ($(lstCreditoTipo).length > 0) {
        itemsCreditoTipo.push({ text: "--Seleccione--", value: "-1" });
        var i;
        for (i = 0; i < $(lstCreditoTipo).length; i++) {
            itemsCreditoTipo.push({ text: lstCreditoTipo[i].Descripcion, value: lstCreditoTipo[i].IdTipoCredito });
        }
    } else {
        itemsCreditoTipo.push({ text: "Sin datos", value: "-2" });
    }
    var comboTipoCreditoDataSource = new kendo.data.DataSource({ data: itemsCreditoTipo });
    $("#ddlTipoCreditoGrupo").data("kendoComboBox").setDataSource(comboTipoCreditoDataSource);
    $("#ddlTipoCreditoGrupo").data("kendoComboBox").select(0);

}

function CargarCreditoTipoEmpleado(lstCreditoTipo) {
    $("#ddlTipoCreditoEmpleado").html("");
    var itemsCreditoTipo = [];
    if ($(lstCreditoTipo).length > 0) {
        itemsCreditoTipo.push({ text: "--Seleccione--", value: "-1" });
        var i;
        for (i = 0; i < $(lstCreditoTipo).length; i++) {
            itemsCreditoTipo.push({ text: lstCreditoTipo[i].Descripcion, value: lstCreditoTipo[i].IdTipoCredito });
        }
    } else {
        itemsCreditoTipo.push({ text: "Sin datos", value: "-2" });
    }
    var comboTipoCreditoDataSource = new kendo.data.DataSource({ data: itemsCreditoTipo });
    $("#ddlTipoCreditoEmpleado").data("kendoComboBox").setDataSource(comboTipoCreditoDataSource);
    $("#ddlTipoCreditoEmpleado").data("kendoComboBox").select(0);

    $("#divAgregarCreditoEmpleado").dialog({
        title: "Agregar Crédito Empleado",
        width: 475,
        height: 220,
        modal: true,
        resizable: false
    });
}

//function ActualizarGrilla() {
//    $("#grid").trigger("reloadGrid");
//};

//FUNCIONES RESULT
function ResulInsertarCreditoGrupo(lstIdErrors) {
    if (lstIdErrors.length == "0") {
        alerta("Créditos por Grupos grabados correctamente");
        limpiarDialogAgregarGrupo();
        CargarCampanaCreditoGrupo();
    } else {
        var grupoError = [];
        var i;
        for (i = 0; i < lstIdErrors.length; i++) {
            var idgrup = lstIdErrors[i];
            var datos = $("#tblGrupoOrigen").jqGrid('getRowData', idgrup);
            grupoError.push(datos.vcNomGru);
        }
        if (grupoError.length != 0) {
            $("#lblMsg1").text('Grupos de Empleado');
            $("#lblMsg2").text('Grupos de Empleado');
            $("#divExistentes").html('');
            var f;
            for (f= 0; f < grupoError.length; f++) {
                $("#divExistentes").append('<li>' + grupoError[f] + '</li>');
            }
            $('#divMsgConfirmInsertarExistente').dialog({
                title: "Remplazar valores a Grupo Empleado",
                modal: true,
                buttons: {
                    "Si": function () {
                        //alert(lstIdErrors.join(","));
                        var Aprob = $("#txtAprobadoGrupoOrigen").val();
                        var IdTipCre = $("#ddlTipoCreditoGrupo").data("kendoComboBox").value(); 
                        var IdCamp = $("#ddlCampanaActiva").data("kendoComboBox").value();
                        var IdGrup = lstIdErrors.join(',');
                        MetodoWeb("Cam_Mnt_CampanaCredito.aspx/ActualizarCreditoGrupo", JSON.stringify({ IdGrup: IdGrup, IdCamp: IdCamp, IdTipCre: IdTipCre, Aprob: Aprob }), ResulActualizarCreditoGrupoInsert, null);
                        $(this).dialog("close");
                        limpiarDialogAgregarGrupo();
                    },
                    "No": function () {
                        $(this).dialog("close");
                    }
                },
                resizable: false
            });
        }
        //if (grupoError.length == 1) {
        //    alerta("No se pudo grabar el grupo " + grupoError.join(", ") + " por que ya existe para el Tipo de Crédito seleccionado");
        //} else {
        //    alerta("No se pudieron grabar los grupos " + grupoError.join(", ") + " por que ya existen para el Tipo de Crédito seleccionado");
        //};
    }
    //CargarCampanaCreditoGrupo();
    //limpiarDialogAgregarGrupo();
}

function ResulEliminarCreditoGrupo(resultado) {
    if (resultado.length == 0) {
        alerta("Crédito Grupo eliminado correctamente");
        CargarCampanaCreditoGrupo();
    } else {
        alerta("Error al eliminar Crédito Grupo");
    }
}
function ResulEliminarCreditoEmpleado(resultado) {
    if (resultado.length == 0) {
        alerta("Crédito Empleado eliminado correctamente");
        CargarCampanaCreditoEmpleado();
    } else {
        alerta("Error al eliminar Crédito Empleado");
    }
}
function ResulActualizarCreditoGrupo(resultado) {
    if (resultado.length == 0) {
        alerta("Crédito Grupo actualizado correctamente");
        CargarCampanaCreditoGrupo();
        CargarCampanaCreditoEmpleado();
        //$("#tblCreditoEmpleado").trigger("reloadGrid");
        $("#divEditarCreditoGrupo").dialog("close");
    } else {
        alerta("Error al actualizar crédito grupo");
    }
}
function ResulActualizarCreditoGrupoInsert(resultado) {
    if (resultado.length == 0) {
        alerta("Crédito Grupo grabados correctamente");
        CargarCampanaCreditoGrupo();
    } else {
        alerta("Error al actualizar crédito grupo");
    }
}
function ResulActualizarCreditoEmpleado(resultado) {
    if (resultado.length == 0) {
        alerta("Crédito Empleado actualizado correctamente");
        CargarCampanaCreditoEmpleado();
        $("#divEditarCreditoEmpleado").dialog("close");
        BloquearPagina(false);
    } else {
        alerta("Error al actualizar crédito empleado");
    }
}
function ResulActualizarCreditoEmpleadoInsert(resultado) {
    if (resultado.length == 0) {
        alerta("Crédito Empleado grabados correctamente");
        CargarCampanaCreditoEmpleado();
    } else {
        alerta("Error al actualizar crédito empleado");
    }
}
function ResulInsertarCreditoEmpleado(lstIdErrors) {
    if (lstIdErrors.length == "0") {
        alerta("Créditos por Empleados grabados correctamente");
        CargarCampanaCreditoEmpleado();
        limpiarDialogAgregarEmpleado();
    } else {
        if (lstIdErrors.length != 0) {
            $("#lblMsg1").text('Empleados');
            $("#lblMsg2").text('Empleados');
            $("#divExistentes").html('');
            var f;
            for (f = 0; f < lstIdErrors.length; f++) {
                $("#divExistentes").append('<li>' + lstIdErrors[f] + '</li>');
            }
            $('#divMsgConfirmInsertarExistente').dialog({
                title: "Remplazar valores a Empleado",
                modal: true,
                buttons: {
                    "Si": function () {
                        //alert(lstIdErrors.join(","));
                        var Aprob = $("#txtAprobadoEmpleado").val();
                        var IdTipCre = $("#ddlTipoCreditoEmpleado").data("kendoComboBox").value(); 
                        var IdCamp = $("#ddlCampanaActiva").data("kendoComboBox").value();
                        var IdEmp = lstIdErrors.join(',');
                        MetodoWeb("Cam_Mnt_CampanaCredito.aspx/ActualizarCreditoEmpleado", JSON.stringify({ IdEmp: IdEmp, IdCamp: IdCamp, IdTipCre: IdTipCre, Aprob: Aprob }), ResulActualizarCreditoEmpleado, null);
                        $(this).dialog("close");
                        limpiarDialogAgregarEmpleado();
                    },
                    "No": function () {
                        $(this).dialog("close");
                    }
                },
                resizable: false
            });
        }
        //if (lstIdErrors.length == 1) {
        //    alerta("No se pudo grabar el empleado " + lstIdErrors.join(", ") + " por que ya existe para el Tipo de Crédito seleccionado");
        //} else {
        //    alerta("No se pudieron grabar los empleados " + lstIdErrors.join(", ") + " por que ya existen para el Tipo de Crédito seleccionado");
        //};
    }
    //CargarCampanaCreditoEmpleado();
    //limpiarDialogAgregarEmpleado();
}
//FUNCIONES LIMPIAR
function limpiarDialogAgregarGrupo() {
    $("#ddlTipoCreditoGrupo").data("kendoComboBox").value(-1);
    $("#txtAprobadoGrupoOrigen").val("");
}

function limpiarDialogAgregarEmpleado() {
    //$("#lstEmpleado").html("");
    $("#ddlTipoCreditoEmpleado").data("kendoComboBox").value(-1);
    $("#txtAprobadoEmpleado").val('');
}

function limpiarValoresFiltro() {
    if ($("#txtBusquedaGrupo").val() != '') {
        $("#txtBusquedaGrupo").addClass("txtBusqueda");
        $("#txtBusquedaGrupo").val("Valor a filtrar");
    }
    if ($("#txtBusquedaEmpleado").val() != '') {
        $("#txtBusquedaEmpleado").addClass("txtBusqueda");
        $("#txtBusquedaEmpleado").val("Valor a filtrar");
    }
}
//OTRAS FUNCIONES
function combokendoFormar(control, altura) {
    $(control).removeClass("ui-widget-content ui-corner-all");
    $(control).css("padding", "0px");
    $(control).css("margin", "0px");
    $(control).kendoComboBox({
        filter: "contains",
        suggest: true,
        height: altura,
        dataTextField: "text",
        dataValueField: "value"
    });
}

function IngresarEmpleados(empleados) {
    $("#lstEmpleado").html("");
    arCodEmpleados = [];
    $(empleados).each(function () {
        arCodEmpleados.push(this.P_vcCod);
        $("#lstEmpleado").append($("<option></option>").attr("value", this.P_vcCod).text(this.vcNom));
    });
}

function dobleclickRow(id) {
    //alert(id);
}

function DCeditarGrupoOrigen(id) {
    $("#btnEditarCreditoGrupo").click();
}

function DCeditarEmpleado(id) {
    $("#btnEditarCreditoEmpleado").click();
}

function fnGruOriSelect(id) { }
function fnEmpSelect(id) { }
function fnGrupOriAddSelect(id) { }

function FormatoNumero(numero) {
    var sepMil = $("#hdfSepMiles").val();
    var sepDec = $("#hdfSepDecimal").val();
    var numDec = $("#hdfNumDecimales").val();
    var n = numero.toString().split(".");
    var enteros = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, sepMil);
    var decimales = '0.' + n[1];
    decimales = parseFloat(decimales).toFixed(numDec);
    var m = decimales.split(".");
    return enteros + "." + m[1];
}

function QuitarFormatoNumero(numero) {
    var numSinFormato = numero.replace($("#hdfSepMiles").val(), "");
    if ($("#hdfSepDecimal").val() != ".") {
        numSinFormato = numSinFormato.replace($("#hdfSepDecimal").val(), ".");
    }
    return numSinFormato;
}
