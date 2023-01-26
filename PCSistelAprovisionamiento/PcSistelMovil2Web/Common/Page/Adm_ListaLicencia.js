function apr_TipoCobro() {
    this.IdTipoCobro;
    this.Descripcion;
}

function apr_ConceptoCobro() {
    this.IdConceptoCobro;
    this.IdProducto;
    this.Nombre;
}


var dialogConfCol;
var tab;
var timeoutHnd;
var asInitVals = new Array();
var MargenFiltro = 0;
var MargenHeight = 48;
var FiltroRegistro = 1; //1:Activo, 0: Inactivo, 2:Todos
var idSeleccionado = null;
var Titulo = "";
var IdOpcion = 0;
var mensajeAle = true;
var nuAltoFila = 23.04;
var inAltGrid;
var inFilas;
var inTotReg;
var ArrayPaginacion = [];

function ActualizarGrilla() {
    $("#grid").trigger("reloadGrid");
}
function BusquedaFocus() {
    $("#txtBusqueda").removeClass("txtBusqueda");
    $("#txtBusqueda").val("");
    $("#txtBusqueda").focus();
}

$(document).ready(function () {


    if ($("#hdfvcTab").val() == "APR_ConceptoCobro") {
        ListarProductos();

        /*
        $("#ddlProducto").change(function () 
        {           
        var codProducto = $("#ddlProducto").val();
        var Producto = $($("#ddlProducto option:selected")[0]).text();                    
        } 
        */
    }




    //alert($("#hdfvcTab").val());

    RaizWeb = "../../";

    $("#ctListado").prop("Titulo", "lfjañselkfjañslkfj");
    //$("#TabDetalle").css("fontSize", "10px");

    if ($("#hdfvcTab").val() == "MOV_IMP_Plantilla" || $("#hdfvcTab").val() == "MOV_IMP_Servicio" || $("#hdfvcTab").val() == "MOV_IMP_Ruta" || $("#hdfvcTab").val() == "MOV_IMP_Destino") {
        inAltGrid = $(window).height() - 440 - MargenFiltro * MargenHeight;
    }
    else {
        inAltGrid = $(window).height() - 185 - MargenFiltro * MargenHeight;
    }



    NumeroInicialFilas();

    BusquedaFocus();

    $("#ulListaReportes").hide().menu();
    var vcBusqueda = "";

    //agregado 02/10/2014 wapumayta
    //if ($("#hdfvcTab").val() == "MOV_CAM_CampanaDespachoOperador") {
    //    $("#btnActivar").hide();
    //}
    //else if ($("#hdfvcTab").val() == "MOV_CAM_Campana") {
    //    $("#dvLeyendaCam").css("display", "block");
    //}
    //$("#ddlBusqueda").val('btEstProc');
    //alert($("#ddlBusqueda").val());
    //if ($("#hdfvcTab").val() == "MOV_CAM_CampanaDespachoOperador" && $("#ddlBusqueda").val() == "btEstProc")
    //{
    //    $("#txtBusqueda").val("SI");
    //    vcBusqueda = $("#txtBusqueda").val().replace(/'/g, "&#39").replace(/\\/g, "&#92");
    //
    //    if ($(this).hasClass("txtBusqueda"))
    //    {
    //        $(this).removeClass("txtBusqueda");
    //        $(this).val("");
    //    }
    //}
    //if ($("#hdfvcTab").val() == "MOV_CAM_CampanaDespachoOperador" && $("#ddlBusqueda").val() == "vcEstLin")
    //{
    //    $("#txtBusqueda").val("Disponible");
    //    vcBusqueda = $("#txtBusqueda").val().replace(/'/g, "&#39").replace(/\\/g, "&#92");
    //
    //    if ($(this).hasClass("txtBusqueda"))
    //    {
    //        $(this).removeClass("txtBusqueda");
    //        $(this).val("");
    //    }
    //}

    //Agregado Jcamacho
    $(".aReporteJerarquico").live("click", function () {

        $("#bpBusquedaOrganizacion_imgBusqueda").click();

    });


    $("#grid").jqGrid({
        sortable: true,
        datatype: function () {

            var dtInicio = new Date();

            $.ajax({
                url: "Adm_ListaLiquidacion.aspx/Listar", //PageMethod
                data: "{'inPagTam':'" + $('#grid').getGridParam("rowNum") + "'," + //Tamaño de pagina
                       "'inPagAct':'" + parseInt($('#grid').getGridParam("page")) + "'," + //Pagina actual
                       "'vcOrdCol':'" + $('#grid').getGridParam("sortname") + "'," + //Nombre de columna ordenado
                       "'vcTipOrdCol':'" + $('#grid').getGridParam("sortorder") + "'," + //Tipo de orden de columna asc, desc                               
                       "'vcCam':'" + $('#ddlBusqueda').val() + "'," + //Campo de busqueda
                       "'vcValBus':'" + ValorBusqueda() + "'," + //Valor de busqueda
                       "'vcTab':'" + $('#hdfvcTab').val() + "'," + //Tabla
                       "'inTipOri':'" + $('#hdfinTipOri').val() + "'," + //TipoOrigen
                       "'inFilReg':'" + FiltroRegistro + "'}", //FiltroRegistro
                dataType: "json",
                type: "post",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    $("#grid")[0].addJSONData(result.d);
                    var dtFin = new Date();
                    var diff = (dtFin - dtInicio) / 1000; //unit is milliseconds
                    //inTotReg = result.d.TotalRegistros; //jcamacho123
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
        id: "ID"
    },
    colModel: columnas, //Columns
    pager: "#pager", //Pager.
    loadtext: 'Cargando datos...',
    recordtext: "{0} - {1} de {2} elementos",
    emptyrecords: 'No hay resultados',
    pgtext: 'Pág: {0} de {1}', //Paging input control text format.
    rowNum: inFilas, //TamanoPagina, //"10" PageSize.
    rowList: ArrayPaginacion, //TamanosPaginaSel, //[10, 20, 30] Variable PageSize DropDownList. 
    viewrecords: true, //Show the RecordCount in the pager.
    multiselect: true,
    sortname: idTabla, //Default SortColumn
    sortorder: "asc", //Default SortOrder.
    //width: $(window).width() - 100,
    //height: $(window).height() - 140,
    rownumbers: true,
    //caption: titulo,
    shrinkToFit: false,
    //viewsortcols: true,
    gridComplete: function () {
        $("#grid").jqGrid('hideCol', 'cb');
        $("#btnActivar").button("option", "disabled", true);
    },
    onSelectRow: function (id, select, item) {
        //Botón Elimnar deshabilitado para solicitudes de sistema
        //debugger;



        var misIds = $('#grid').jqGrid('getGridParam', 'selarrrow');

        for (var i = 0; i < misIds.length; i++) {
            //alert($($("#" + misIds[i] + " td")[0]).css("padding"));
            //if ($($("#" + misIds[i] + " td")[0]).css("padding") == "1px") {
            if ($($("#" + misIds[i] + " td")[0]).hasClass("ui-state-error-text")) {
                $("#btnActivar").button("option", "disabled", false);
                break;
            }
            else {
                $("#btnActivar").button("option", "disabled", true);
            }
        }


    },
    sortable: function (permutation) {
        //var colModels = $("#grid").getGridParam("colModel");
        //alert(colModels);
    },
    resizeStop: function (width, index) {
        //alertaExterna("resize column " + index + " to " + width + "pixels");
    },
    afterInsertRow: function (rowid, aData, rowelem) {
        //Filas de Color Rojo filas no vigentes
        if (aData.btVig == 'False') {
            var colModels = $("#grid").getGridParam("colModel");

            for (var i in colModels) {
                //$("#grid").jqGrid('setCell', rowid, i, '', { color: 'red', padding: '1px' });
                $("#grid").jqGrid('setCell', rowid, i, '', "ui-state-error-text");
            }
        }
        else {

            if ($("#hdfvcTab").val() == "MOV_CAM_Campana" && aData.btActivo == "True") {
                var colModels = $("#grid").getGridParam("colModel");
                for (var i in colModels) {
                    $("#grid").jqGrid('setCell', rowid, i, '', "FilaCampanaActiva");
                }
            }


            //Filas de Color Rojo para registro no procesados // agregado wapumayta 18/06/2014
            if ($("#hdfvcTab").val() == "MOV_CAM_CampanaDespachoOperador" && aData.btEstProc == "False") {
                var colModels = $("#grid").getGridParam("colModel");
                for (var i in colModels) {
                    $("#grid").jqGrid('setCell', rowid, i, '', { color: 'red' });
                }
            }

            if ($("#hdfvcTab").val() == "MOV_Dispositivo" && aData.btVig == 'True' && aData.btVigEmp == "False") {
                var colModels = $("#grid").getGridParam("colModel");
                for (var i in colModels) {
                    //$("#grid").jqGrid('setCell', rowid, i, '', { 'background-color': '#6AEE80', 'color': 'black' });
                    $("#grid").jqGrid('setCell', rowid, i, '', { color: 'green', 'font-weight': 'bold' });
                }
            }
            if ($("#hdfvcTab").val() == "MOV_Linea" && aData.btVig == 'True' && aData.btVigEmp == "False") {
                var colModels = $("#grid").getGridParam("colModel");
                for (var i in colModels) {
                    //$("#grid").jqGrid('setCell', rowid, i, '', { 'background-color': '#6AEE80', 'color': 'black' });
                    $("#grid").jqGrid('setCell', rowid, i, '', { color: 'green', 'font-weight': 'bold' });
                }
            }
            //Filas de color Gris para tipos de solicitud del sistema
            if ($("#hdfvcTab").val() == "MOV_TipoSolicitud" && aData.biSoportaEdicion == "False") {
                var colModels = $("#grid").getGridParam("colModel");
                for (var i in colModels) {

                }
            }

            if ($("#hdfvcTab").val() == "MOV_SOA_Bolsa" && aData.NombreNivel == "Nivel General") {
                var colModels = $("#grid").getGridParam("colModel");
                for (var i in colModels) {
                    $("#grid").jqGrid('setCell', rowid, i, '', { color: 'grey' });
                }
            }
            if ($("#hdfvcTab").val() == "MOV_SOA_Nivel" && (aData.Orden == "0" || aData.Orden == "1")) {
                var colModels = $("#grid").getGridParam("colModel");
                for (var i in colModels) {
                    $("#grid").jqGrid('setCell', rowid, i, '', { color: 'grey' });
                }
            }

            if ($("#hdfvcTab").val() == "SEG_Perfil" && aData.P_inCod == "1") {
                var colModels = $("#grid").getGridParam("colModel");
                for (var i in colModels) {
                    $("#grid").jqGrid('setCell', rowid, i, '', { color: 'grey' });
                }
            }
            //            if ($("#hdfvcTab").val() == "MOV_SOA_TecnicoSupervisor" && aData.NomTecnico == "Administrador") { //habilitar administrador 2198
            //                var colModels = $("#grid").getGridParam("colModel");

            //                for (var i in colModels) {
            //                    $("#grid").jqGrid('setCell', rowid, i, '', { color: 'grey' });
            //                }
            //            }
            if ($("#hdfvcTab").val() == "PCS_IMP_Config_Proceso" && aData.biSoportaEdicion == "False") {
                var colModels = $("#grid").getGridParam("colModel");
                for (var i in colModels) {
                    $("#grid").jqGrid('setCell', rowid, i, '', { color: 'grey' });
                }
            }
            //if ($("#hdfvcTab").val() == "SEG_Usuario") {
            //    arTecnicos["id-" + rowid] = [];
            //    if (rowelem[4] == "1" || rowelem[5] == "1") {
            //        var colModels = $("#grid").getGridParam("colModel");
            //
            //        for (var i in colModels) {
            //            $("#grid").jqGrid('setCell', rowid, i, '', { color: 'grey' });
            //        }
            //        arTecnicos["id-" + rowid].esTec = true;
            //    } else {
            //        arTecnicos["id-" + rowid].esTec = false;
            //    }
            //}
        }
    },
    //onSortCol: function(name,index){  alertaExterna("Column Name: "+name+" Column Index: "+index); },
    ondblClickRow: function (id) {
        var biSolicitudSistema = "0";
        //Desactiva edición para tipos de solicitud del sistema
        if ($("#hdfvcTab").val() == "MOV_TipoSolicitud") {
            if (($("#grid").getRowData(id)).biSoportaEdicion == "NO")
                biSolicitudSistema = "1";
        }

        if ($("#hdfvcTab").val() == "MOV_SOA_Bolsa") {
            if (($("#grid").getRowData(id)).NombreNivel == "Nivel General")
                biSolicitudSistema = "1";
        }

        if ($("#hdfvcTab").val() == "MOV_SOA_Nivel") {
            if (($("#grid").getRowData(id)).Orden == "0" || ($("#grid").getRowData(id)).Orden == "1")
                biSolicitudSistema = "1";
        }
        if ($("#hdfvcTab").val() == "SEG_Perfil") {
            if (($("#grid").getRowData(id)).P_inCod == "1")
                biSolicitudSistema = "1";
        }

        if ($("#hdfvcTab").val() == "MOV_SOA_TecnicoSupervisor") { // habilitar administrador 2198
            if (($("#grid").getRowData(id)).NomTecnico.toUpperCase() == "ADMINISTRADOR")
                biSolicitudSistema = "1";
        }

        if ($("#hdfvcTab").val() == "PCS_IMP_Config_Proceso") {
            if (($("#grid").getRowData(id)).biSoportaEdicion == "NO")
                biSolicitudSistema = "1";
        }
        if (biSolicitudSistema == "0") {
            $("#grid").jqGrid('resetSelection');
            $("#grid").jqGrid('setSelection', id);
            if ($("#hdfEdicion").val() == "1")
                EditaRegistro(id);
        }
    },
    beforeSelectRow: function (rowid, e) {

        var vcSel = $("#grid").jqGrid('getGridParam', 'selarrrow');


        if (vcSel.length == 1) {

            $("#grid").jqGrid('resetSelection');
            return true; //Selecciona más de una fila = false

        } else if (vcSel.length == 0) {
            return true; //Selecciona una fila = true
        }


        //if (!e.ctrlKey && !e.shiftKey) {
        //    $("#grid").jqGrid('resetSelection');
        //}
        //else if (e.shiftKey) {
        //    var initialRowSelect = $("#grid").jqGrid('getGridParam', 'selrow');
        //    $("#grid").jqGrid('resetSelection');
        //
        //    var CurrentSelectIndex = $("#grid").jqGrid('getInd', rowid);
        //    var InitialSelectIndex = $("#grid").jqGrid('getInd', initialRowSelect);
        //    var startID = "";
        //    var endID = "";
        //    if (CurrentSelectIndex > InitialSelectIndex) {
        //        startID = initialRowSelect;
        //        endID = rowid;
        //    }
        //    else {
        //        startID = rowid;
        //        endID = initialRowSelect;
        //    }
        //
        //    var shouldSelectRow = false;
        //    $.each($("#grid").getDataIDs(), function (_, id) {
        //        if ((shouldSelectRow = id == startID || shouldSelectRow)) {
        //            $("#grid").jqGrid('setSelection', id, false);
        //        }
        //        return id != endID;
        //    });
        //}

        //Desactiva edición para tipos de solicitud del sistema
        //if ($("#hdfvcTab").val() == "MOV_TipoSolicitud") {
        //    if (($("#grid").getRowData(rowid)).biSoportaEdicion == "NO")
        //        return false;
        //}
        //
        //if ($("#hdfvcTab").val() == "MOV_SOA_Bolsa") {
        //    if (($("#grid").getRowData(rowid)).NombreNivel == "Nivel General")
        //        return false;
        //}
        //
        //if ($("#hdfvcTab").val() == "MOV_SOA_Nivel") {
        //    if (($("#grid").getRowData(rowid)).Orden == "0" || ($("#grid").getRowData(rowid)).Orden == "1")
        //        return false;
        //}

        //        if ($("#hdfvcTab").val() == "MOV_SOA_TecnicoSupervisor") {// habilitar administrador 2198
        //            if (($("#grid").getRowData(rowid)).NomTecnico.toUpperCase() == "ADMINISTRADOR")
        //                return false;
        //        }

        if ($("#hdfvcTab").val() == "PCS_IMP_Config_Proceso") {
            if (($("#grid").getRowData(rowid)).biSoportaEdicion == "NO") {
                $("#btnEliminar").button("option", "disabled", true);
                $("#btnEliminar").attr("title", "No se puede eliminar un registro del sistema.");
                return false;
            }
            else {
                $("#btnEliminar").button("option", "disabled", false);
                $("#btnEliminar").attr("title", "Eliminar Seleccionados");
            }
        }
        return true;
    }
}).navGrid("#pager", { edit: false, add: false, search: false, del: false });



function EditaRegistro(id) {
    pagina = $("#btnEditar").attr("url");
    if (pagina != "") {
        idSeleccionado = id;
        EditarRegistro();
    }
}

//Gatillo de eventos
$(".btnNormal").live("click", function () {
    pagina = $(this).attr("url");
    var EventoClick = $(this).attr("click");
    Titulo = $(this).attr("title");
    IdOpcion = $(this).attr("IdOpcion");
    eval(EventoClick)();
});

$(".btnNormal").button({});



$("#btnCerrarFiltro").button({
    icons: {
        primary: "ui-icon-closethick"
    },
    text: false
});

$("#btnBuscar").button({});

$(".ui-button-text").css({ padding: 4, width: 22 });

$("input[name=rbtnFiltroRegistro]").change(function () {
    if ($("input[name=rbtnFiltroRegistro]:checked").val() == 'rbtnActivos') {
        FiltroRegistro = 1;
    }
    else if ($("input[name=rbtnFiltroRegistro]:checked").val() == 'rbtnInactivos') {
        FiltroRegistro = 0;
    }
    else if ($("input[name=rbtnFiltroRegistro]:checked").val() == 'rbtnTodos') {
        FiltroRegistro = 2;
    }
    $("#grid").trigger("reloadGrid");
});

$("#tblAcciones").buttonset();
$("#tblEstado").buttonset();
$("#tblFiltroBusqueda").buttonset();
$("#tblAvanzada").buttonset();

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

inicioPagina();
function inicioPagina() {
    DimPosElementos();
    NumeroInicialFilas();
}

$(window).resize(function () {
    DimPosElementos();
});



function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    var AnchoLateral = $(".LateralSplitter");

    //if ($("#hdfvcTab").val() == "MOV_IMP_Plantilla" || $("#hdfvcTab").val() == "MOV_IMP_Servicio" || $("#hdfvcTab").val() == "MOV_IMP_Ruta" || $("#hdfvcTab").val() == "MOV_IMP_Destino") {
    //    $(".tabs").css({ height: Alto - 260, width: Ancho - AnchoLateral, marginbotton: 0, paddingbotton: 0 });
    //} else {
    //    $(".tabs").css({ height: Alto - 25, width: Ancho - AnchoLateral, marginbotton: 0, paddingbotton: 0 });
    //}
    //
    //$(".Splitter").css({ height: Alto - 18 });
    //$("#grid").setGridWidth($(window).width() - 58);  
    //$("#grid").setGridHeight(inAltGrid);


    $(".tabs").css({ height: Alto - 30, width: Ancho - AnchoLateral, marginbotton: 0, paddingbotton: 0 });
    $(".Splitter").css({ height: Alto - 18 });
    inAltGrid = $(window).height() - 198 - MargenFiltro * MargenHeight;
    $("#grid").setGridWidth($("#TabDetalle").width() - 13);
    $("#grid").setGridHeight(inAltGrid);

}

$("#TabDetalle span.ui-icon-close").live("click", function () {
    var index = $("li", tab).index($(this).parent());
    tab.tabs("remove", index);
});

function AgregarRegistro() {
    //    alert("LKJLKJ");
    var inNumMaxNivel = parseInt($("#hdfNumMaxNivel").val());

    if ($("#hdfvcTab").val() == "M_NIVE" && inNumMaxNivel <= inTotReg) {
        alertaExterna("No puede haber más de " + inNumMaxNivel + " niveles.");
        return;
    }

    var Id = "#" + $("#hdfvcTab").val() + "_Tab_Nuevo";
    var $panel = tab.find(Id);
    if (!$panel.length) {//En el caso que no exista el tab, lo crea
        tab.tabs("add", Id, "Nuevo");
        $(Id).css("width", "99%");
        $(Id).css("height", "90%");
        $(Id).css("margin-top", "0px");
        $(Id).css("margin-left", "0px");
        $(Id).css("margin-bottom", "0px");
        $(Id).css("margin-right", "0px");
        $(Id).css("padding-top", "0px");
        $(Id).css("padding-left", "0px");
        $(Id).css("padding-bottom", "0px");
        $(Id).css("padding-right", "0px");

        $(Id).css("border", "0px solid gray");
    }
    else {//En el caso que exista lo muestra
        tab.tabs('select', Id);
    }
};


//-------btn Cambiar----------
function CambiarRegistro() {
    var id = null;
    if (idSeleccionado == null) {
        if ($($("#grid").jqGrid('getGridParam', 'selarrrow')).length == 1)
            id = $("#grid").jqGrid('getGridParam', 'selarrrow')[0];
        else if ($($("#grid").jqGrid('getGridParam', 'selarrrow')).length == 0) {
            alertaExterna("Seleccione un registro");
            return;
        }
        else if ($($("#grid").jqGrid('getGridParam', 'selarrrow')).length > 1) {
            alertaExterna("Ha seleccionado más de un elemento, seleccione sólo un elemento.");
            return;
        }
    }
    else
        id = idSeleccionado;
    idSeleccionado = null;

    if (id) {

        var IdTab = "#" + $("#hdfvcTab").val() + "_Tab_Editar";
        var $panel = tab.find(IdTab);

        var ids = idTabla.split(",");
        var idsParametro = "";
        var idsValor = "";
        var datos = $("#grid").jqGrid('getRowData', id);

        var ValoresPorDefectoId = $("#hdfValorPorDefecto").val().split(",");
        for (i in ids) {
            if (idsParametro != "") {
                idsParametro += ",";
                idsValor += "-";
            }
            idsParametro += ids[i];
            idsValor += datos[ids[i]];

            for (valor in ValoresPorDefectoId) {
                if ($.trim(ValoresPorDefectoId[valor]) == $.trim(datos[ids[i]])) {
                    alertaExterna("El registro no puede ser cambiado, es un registro del sistema.");
                    return;
                }
            }
        }

        if (!$panel.length) {//En el caso que no exista el tab, lo crea
            pagina += "?Cod=" + idsValor + "&Par=" + idsParametro + "&Cambiar=1";
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

            $(IdTab).css("border", "0px solid gray");
        }
        else {//En el caso que exista lo muestra
            if (vcCod == id) {//Si el codigo anterior seleccionado es igual al actual
                tab.tabs("remove", $panel.index() - 1);
                pagina += "?Cod=" + idsValor + "&Par=" + idsParametro + "&Cambiar=1";
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

                $(IdTab).css("border", "0px solid gray");
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

                $(IdTab).css("border", "0px solid gray");
            }
        }
        vcCod = id;
    }
    else {
        alertaExterna("Seleccione un registro");
    }
};
//-------Fin btn Cambiar-----




function EliminarRegistro() {
    var idsSel = $("#grid").jqGrid('getGridParam', 'selarrrow');
    if ($(idsSel).length > 0)
        EliminarRegistroServidor("Eliminar registro", "¡Atención!, se eliminarán de forma permanente los registros que se hayan seleccionado y estén desactivados ¿Desea continuar?", idsSel, false);
    else
        alertaExterna("Seleccione por lo menos un item");
};

function CargarParametros(idsSel) {
    var ids = idTabla.split(",");
    var idsParametro = "";
    var idsValor = "";
    for (i in ids) {//Ingresa los parametros id, seran las llaves primarias simples o compuestas.
        if (idsParametro != "") {
            idsParametro += ",";
        }
        idsParametro += ids[i];
    }

    for (i in idsSel) {//Se ingresa todos los registros seleccionados
        var datos = $("#grid").jqGrid('getRowData', idsSel[i]);
        var valor = "";
        if (idsValor != "") {
            idsValor += "|";
        }

        for (j in ids) {
            if (valor != "") {
                valor += "&#42";
            }
            valor += datos[ids[j]];
        }
        idsValor += valor;
    }
    return [idsValor.replace(/'/g, "&#39"), idsParametro];
}

function ActivarRegistroServidor(Titulo, MensajeConfirmacion, idsSel, Valor) {
    $("#lblMensajeConfirmacion").html(MensajeConfirmacion);
    $('#divMsgConfirmacion').dialog({
        title: Titulo,
        modal: true,
        buttons: {
            "Si": function () {
                var parametros = CargarParametros(idsSel);
                //if ($("#hdfvcTab").val() == 'MOV_Linea') {
                //    if (!confirm("Si la(s) línea(s) seleccionadas se encontraran asignada(s) a un DISPOSITIVO se volverá a asignar el último dispositivo a la(s) línea(s) que estaba asignada antes de haberle dado de Baja.\n¿Desea continuar?")) {
                //        return;
                //    }
                //    else {
                //        FuncionActivarRegistro(parametros, Valor);
                //    }
                //}
                //else if ($("#hdfvcTab").val() == 'M_EMPL') {
                //    $.ajax({
                //        type: "POST",
                //        url: "Adm_ListaLiquidacion.aspx/Verificar_LineasRestaurar",
                //        data: "{'Ids': '" + parametros[0] + "'}",
                //        contentType: "application/json; charset=utf-8",
                //        dataType: "json",
                //        success: function (result) {
                //            $("#tbLineasRestaurar").html('');
                //            if (result.d.length > 0) { //hay lineas a restaurar
                //                $("#dvLineasRestaurar").show();
                //                $("#tbLineasRestaurar").append('<tr><td><b>Empleado<b/></td><td><b>Linea<b/></td><td><b>Dispositivo<b/></td></tr>');
                //                for (var i = 0; i < result.d.length; i++) {
                //                    var objLin = result.d[i];
                //                    if (objLin.Estado == "True" && objLin.Situacion == "1") { //muestra lineas activas y disponibles
                //                        $("#tbLineasRestaurar").append('<tr><td>' + objLin.Empleado + '</td><td>' + objLin.Linea + '</td><td>' + objLin.Dispositivo + '</td></tr>');
                //                    }
                //                }
                //                $("#divMsjRestaurarLineas").dialog({
                //                    title: "Restaurar líneas",
                //                    modal: true,
                //                    buttons: {
                //                        "Si": function () {
                //                            $("#divMsjRestaurarLineas").dialog("close");
                //                            FuncionActivarRegistro(parametros, Valor);
                //                            MetodoRestaurarLineas(parametros[0]);
                //                        },
                //                        "No": function () {
                //                            $("#divMsjRestaurarLineas").dialog("close");
                //                            FuncionActivarRegistro(parametros, Valor);
                //                        }
                //                    }
                //                });
                //
                //            } else {
                //                FuncionActivarRegistro(parametros, Valor);
                //            }
                //        },
                //        error: function (xhr, err, thrErr) {
                //            MostrarErrorAjax(xhr, err, thrErr);
                //        }
                //    });
                //}
                //else {
                //    FuncionActivarRegistro(parametros, Valor);
                //}
                FuncionActivarRegistro(parametros, Valor);
                $(this).dialog("close");
            },
            "Cancelar": function () {
                $(this).dialog("close");
            }
        }
    });
}

function FuncionActivarRegistro(parametros, Valor) {
    $.ajax({
        type: "POST",
        url: "Adm_ListaLiquidacion.aspx/ActivarRegistros",
        data: "{'Ids': '" + parametros[0] + "'," +
                           "'vcPar': '" + parametros[1] + "'," +
                           "'vcTab': '" + $("#hdfvcTab").val() + "'," +
                           "'inTipOri': '" + $("#hdfinTipOri").val() + "'," + //TipoOrigen
                           "'activar':'" + Valor + "'}", //activar true, desactivar false"
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#grid").trigger("reloadGrid");
            MensajeProceso(result.d);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function MetodoRestaurarLineas(ids) {
    $.ajax({
        type: "POST",
        url: "Adm_ListaLiquidacion.aspx/RestaurarLineasEmpleado",
        data: "{'Ids': '" + ids + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d == "0") {
                alertaExterna("No se pudieron restaurar las líneas de los empleados seleccionados");
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function ActivarRegistro() {
    var idsSel = $("#grid").jqGrid('getGridParam', 'selarrrow');
    if ($(idsSel).length > 0) {
        //var datos = $("#grid").jqGrid('getRowData', idsSel[0]);
        ActivarRegistroServidor("Activar registros", "¡Se activarán los registros seleccionados!, ¿Desea continuar?", idsSel, true);
    }
    else
        alertaExterna("Seleccione por lo menos un item");
}



function MensajeProceso(Mensaje) {
    $("#lblAviso").html(Mensaje);
    $('#divAviso').dialog({
        title: "Aviso",
        modal: true,
        width: 270,
        resizable: false,
        closeOnEscape: false//,
        //        close: function (event, ui) {
        //            $('#divAviso').dialog("close");
        //        }
    });
}


function EliminarRegistroServidor(Titulo, MensajeConfirmacion, idsSel, Valor) {

    var IdTab = "#" + $("#hdfvcTab").val() + "_Tab_Editar";
    var $panel = tab.find(IdTab);
    var ids = idTabla.split(",");
    var idsParametro = "";
    var idsValor = "";
    var datos = $("#grid").jqGrid('getRowData', idsSel[0]);
    var parametros = CargarParametros(idsSel); ///////////////////////////////////////////////////////
    var ValoresPorDefectoId = $("#hdfValorPorDefecto").val().split(",");
    for (i in ids) {
        if (idsParametro != "") {
            idsParametro += ",";
            idsValor += "-";
        }
        idsParametro += ids[i];
        idsValor += datos[ids[i]];
        for (valor in ValoresPorDefectoId) {
            if ($.trim(ValoresPorDefectoId[valor]) == $.trim(datos[ids[i]])) {
                alertaExterna("El registro no puede ser eliminado, es un registro del sistema.");
                return;
            }
        }
    }


    $("#lblMensajeConfirmacion").html(MensajeConfirmacion);


    function divMsgConfirmacion_SI() {

        if ($("#hdfvcTab").val() == 'MOV_Linea') {
            $("#MsgConfirmacionEliminarLinea").dialog({
                title: "Dispositivos asociados",
                modal: true,
                buttons: {
                    "Si": function () {
                        $("#MsgConfirmacionEliminarLinea").dialog("close");
                        $.ajax({
                            type: "POST",
                            url: "Adm_ListaLiquidacion.aspx/EliminarRegistro",
                            data: "{'Id': '" + parametros[0] + "'," +
                                            "'vcPar': 'SI'," +
                            //"'vcPar': '" + parametros[1] + "'," +
                                            "'vcTab': '" + $("#hdfvcTab").val() + "'," +
                                            "'inTipOri': '" + $("#hdfinTipOri").val() + "'," +
                                            "'btTipLog':'" + Valor + "'}", //TipoOrigen
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result) {
                                $("#grid").trigger("reloadGrid");
                                MensajeProceso(result.d);
                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });
                    },
                    "No": function () {
                        $("#MsgConfirmacionEliminarLinea").dialog("close");
                        $.ajax({
                            type: "POST",
                            url: "Adm_ListaLiquidacion.aspx/EliminarRegistro",
                            data: "{'Id': '" + parametros[0] + "'," +
                                            "'vcPar': 'NO'," +
                                            "'vcTab': '" + $("#hdfvcTab").val() + "'," +
                                            "'inTipOri': '" + $("#hdfinTipOri").val() + "'," +
                                            "'btTipLog':'" + Valor + "'}", //TipoOrigen
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result) {
                                $("#grid").trigger("reloadGrid");
                                MensajeProceso(result.d);
                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });
                    }
                }
            });
        } else {
            $.ajax({
                type: "POST",
                url: "Adm_ListaLiquidacion.aspx/EliminarRegistro",
                data: "{'Id': '" + parametros[0] + "'," +
                            "'vcPar': '" + parametros[1] + "'," +
                            "'vcTab': '" + $("#hdfvcTab").val() + "'," +
                            "'inTipOri': '" + $("#hdfinTipOri").val() + "'," +
                            "'btTipLog':'" + Valor + "'}", //TipoOrigen
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    $("#grid").trigger("reloadGrid");
                    MensajeProceso(result.d);
                    //Mensaje("<br/><h1>" + result.d + "</h1><br/>", document, CerroMensajeActivar);
                    //                        if (result.d = "true")
                    //                            Mensaje("<br/><h1>Se desactivaron los registros seleccionados</h1><br/>", document, CerroMensajeActivar);
                    //                        else
                    //                            Mensaje("<br/><h1>Se eliminaron de forma permanente los registros seleccionados que cumplian todas las restricciones</h1><br/>", document, CerroMensajeActivar);

                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }

    }

    $('#divMsgConfirmacion').dialog({
        title: Titulo,
        modal: true,
        buttons: {
            "Si": function () {
                $(this).dialog("close");
                var parametros = CargarParametros(idsSel);
                //                if ($("#hdfvcTab").val() == 'M_EMPL') {
                //                    //if (!confirm("- Se liberarán las líneas y dispositivos del empleado que sean del tipo staff.\n- Se darán de baja las líneas y dispositivos que sean del tipo familia.\n- Se darán de baja usuarios asociados.\n\n¿Desea continuar?")) {
                //                    //    return;
                //                    //}
                //                    //alert('aca elimina empleado');
                //                    //confirmacion("- Se liberarán las líneas y dispositivos del empleado que sean del tipo staff.<br>- Se darán de baja las líneas y dispositivos que sean del tipo familia.<br>- Se darán de baja usuarios asociados.<br><br>¿Desea continuar?", divMsgConfirmacion_SI, null, "Confirmación");
                //                    divMsgConfirmacion_SI();
                //                }
                //                else {
                //                    divMsgConfirmacion_SI();
                //                }

                divMsgConfirmacion_SI();
                //$(this).dialog("close");
            },
            "Cancelar": function () {
                $(this).dialog("close");
            }
        }
    });
}

function DesactivarRegistro() {
    var idsSel = $("#grid").jqGrid('getGridParam', 'selarrrow');
    if ($(idsSel).length > 0)
        EliminarRegistroServidor("Desactivar registro", "¡Se desactivarán los registros seleccionados!, ¿Desea continuar?", idsSel, true);
    else
        alertaExterna("Seleccione por lo menos un item");
}

function CerroMensajeActivar() {

}

function ExportarExcel() {
    pagina += "?vcTab=" + $("#hdfvcTab").val() + "&Detalle=" + $('#ddlBusqueda').val() + "," + encodeURIComponent(ValorBusqueda()) + "&Valor=" + $('#hdfinTipOri').val() + "&inFilReg=" + FiltroRegistro;
    $("#ifExcel").attr("src", pagina);
}

function ImportarExcel() {
    var $width = 740;
    var $height = 505;
    var $Pagina = '../../General/Administrar/Importacion_Exportacion/Importacion.aspx?vcTab=' + $('#hdfvcTab').val() + '&codEnt=' + $('#hdfCodEntidad').val();
    $("#ifArea").attr("src", $Pagina);
    Modal = $('#dvArea').dialog({
        title: "Importar",
        width: $width,
        height: $height,
        modal: true,
        resizable: false
    });
}

function ImprimirTodos() {
    var Id = "#" + $("#hdfvcTab").val() + "_Tab_ImprimirTodo";
    var $panel = tab.find(Id);
    if (!$panel.length) {//En el caso que no exista el tab, lo crea
        pagina += "?vcTab=" + $("#hdfvcTab").val() + "&Detalle=" + $('#ddlBusqueda').val() + "," + encodeURIComponent(ValorBusqueda()) + "&Valor=" + $('#hdfinTipOri').val();
        tab.tabs("add", Id, "Imprimir");
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
}

function VistaPrevia() {
    var Id = "#" + $("#hdfvcTab").val() + "_Tab_VistaPrevia";

    var $panel = tab.find(Id);
    if (!$panel.length) {//En el caso que no exista el tab, lo crea
        pagina += "?vcTab=" + $("#hdfvcTab").val() + "&Detalle=" + $('#ddlBusqueda').val() + "," + encodeURIComponent(ValorBusqueda()) + "&Valor=" + $('#hdfinTipOri').val();
        tab.tabs("add", Id, "Vista previa");
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
}

function CerroMensajeEliminar() {
    $("#grid").trigger("reloadGrid");
}

function ConfigurarColumnas() {
    var $width = 410;
    var $height = 420;
    var $Pagina = 'Adm_Columnas.aspx?vctab=' + $("#hdfvcTab").val() + "&inTipOri=" + $('#hdfinTipOri').val();

    $("#ifColumna").width($width - 15);
    $("#ifColumna").height($height - 35);
    $("#ifColumna").attr("src", $Pagina);

    if ($("#hdfvcTab").val() == "MOV_IMP_Plantilla" || $("#hdfvcTab").val() == "MOV_IMP_Servicio" || $("#hdfvcTab").val() == "MOV_IMP_Ruta" || $("#hdfvcTab").val() == "MOV_IMP_Destino") {
        dialogConfCol = $("#dvColumna").dialog({
            title: "Configurar columnas",
            width: $width,
            height: $height,
            modal: true,
            position: { my: "center", at: "center", of: "#grid" },
            open: function (event, ui) {
                window.parent.$("#TabOpciones").scrollTop(0);
            }
        });
    }
    else {
        dialogConfCol = $("#dvColumna").dialog({
            title: "Configurar columnas",
            width: $width,
            height: $height,
            modal: true
        });
    }

}

function Recuperar() {
    location.reload();
}

function Guardar() {
    var colLar = "";
    var colOrd = "";
    var colNom = "";
    var colModels = $("#grid").getGridParam("colModel");
    var off = parseFloat(1);

    for (var i in colModels) {
        if (colLar != "") {
            colLar += ',';
            colOrd += ',';
            colNom += ',';
        }
        if (colModels[i].name != "rn") {
            colLar += colModels[i].width;
            colOrd += parseFloat(i) + parseFloat(off);
            colNom += colModels[i].name;
        }
        else {
            off = parseFloat(0);
        }
    }
    if (colLar != "") {
        $.ajax({
            type: "POST",
            url: "Adm_ListaLiquidacion.aspx/GuardarCaracteristicas",
            data: "{'DimensionesCol': '" + colLar + "'," +
                    "'OrdenCol': '" + colOrd + "'," +
                    "'NombreCol': '" + colNom + "'," +
                    "'TamanoPagina': '" + $('#grid').getGridParam("rowNum") + "'," +
                    "'vcTab': '" + $("#hdfvcTab").val() + "'," +
                    "'inTipOri':'" + $('#hdfinTipOri').val() + "'}", //TipoOrigen
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                Mensaje("<br/><h1>Configuración guardada</h1><br/>", document, CerroMensaje);
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
}

//$("#btnReporte").click(function () {
//    $("#ulListaReportes").hide();
//    $("#dvFiltroRegistro").hide();
//    var menu = $("#ulListaReportes").show().position({
//        my: "left top",
//        at: "left bottom",
//        of: $("#btnReporte")[0]
//    });
//    $(document).one("click", function () {
//        menu.hide();
//    });
//    return false;
//});

$("#btnReporte , #ulListaReportes").hover(function () {
    $("#ulListaReportes").hide();
    $("#dvFiltroRegistro").hide();
    $("#ulListaReportes").show().position({
        my: "left top",
        at: "left bottom",
        of: $("#btnReporte")[0]
    });
}, function () {
    $("#ulListaReportes").hide();
});

//$("#btnConfigurarFiltroRegistro").click(function () {
//    $("#dvFiltroRegistro").hide();
//    $("#ulListaReportes").hide();
//    var menu = $("#dvFiltroRegistro").show().position({
//        my: "left top",
//        at: "left bottom",
//        of: $("#btnConfigurarFiltroRegistro")[0]
//    });
//    $(document).one("click", function () {
//        menu.hide();
//    });
//    return false;
//});

$("#btnConfigurarFiltroRegistro , #dvFiltroRegistro").hover(function () {
    $("#dvFiltroRegistro").hide();
    $("#ulListaReportes").hide();
    $("#dvFiltroRegistro").show().position({
        my: "left top",
        at: "left bottom",
        of: $("#btnConfigurarFiltroRegistro")[0]
    });

}, function () {
    $("#dvFiltroRegistro").hide();
});



//------------------------------------Filtro para grilla----------------------------------------------
$("#btnBuscar").change(function () {
    if ($('#btnBuscar').is(':checked')) {
        $("#trBusqueda").slideToggle("slow");
        MargenFiltro = 1;
        $("#grid").setGridHeight($(window).height() - 145 - MargenFiltro * MargenHeight);
        //ActivarCombokendo("#ddlBusqueda", "200");
    }
    else {
        MargenFiltro = 0;
        $("#grid").setGridHeight($(window).height() - 145 - MargenFiltro * MargenHeight);
        $("#trBusqueda").slideToggle("slow");
    }
});

$("#btnCerrarFiltro").click(function () {
    MargenFiltro = 0;
    $("#grid").setGridHeight($(window).height() - 145 - MargenFiltro * MargenHeight);
    $("#trBusqueda").slideToggle("slow");
    $("#btnBuscar").attr('checked', false);
});

$("#txtBusqueda").keyup(function () {
    if (timeoutHnd) {
        clearTimeout(timeoutHnd);
    }
    timeoutHnd = setTimeout(BuscarGrilla, 500);
});

function BuscarGrilla() {
    //$("#txtBusqueda").val($("#txtBusqueda").val());
    vcBusqueda = $("#txtBusqueda").val().replace(/'/g, "&#39").replace(/\\/g, "&#92");
    if (vcBusqueda != "") {
        if ($('#ddlBusqueda').val() == $('#hdfElim').val()) {
            var activo = $('#hdfActivo').val();
            var desactivo = $('#hdfDesactivo').val();

            if (activo.toLowerCase().indexOf(vcBusqueda.toLowerCase()) > -1 && desactivo.toLowerCase().indexOf(vcBusqueda.toLowerCase()) == -1) {
                vcBusqueda = "1"

            }
            else if (activo.toLowerCase().indexOf(vcBusqueda.toLowerCase()) == -1 && desactivo.toLowerCase().indexOf(vcBusqueda.toLowerCase()) > -1) {
                vcBusqueda = "0";
            }
            else if (activo.toLowerCase().indexOf(vcBusqueda.toLowerCase()) > -1 && desactivo.toLowerCase().indexOf(vcBusqueda.toLowerCase()) > -1) {
                vcBusqueda = "";
            }
            else if (activo.toLowerCase().indexOf(vcBusqueda.toLowerCase()) == -1 && desactivo.toLowerCase().indexOf(vcBusqueda.toLowerCase()) == -1) {
                vcBusqueda = "$";
            }
        }
        else if ($('#ddlBusqueda').val() == "btVigEmp") {
            var activo = $('#hdfActivo').val();
            var desactivo = $('#hdfDesactivo').val();

            if (activo.toLowerCase().indexOf(vcBusqueda.toLowerCase()) > -1 && desactivo.toLowerCase().indexOf(vcBusqueda.toLowerCase()) == -1) {
                vcBusqueda = "1"

            }
            else if (activo.toLowerCase().indexOf(vcBusqueda.toLowerCase()) == -1 && desactivo.toLowerCase().indexOf(vcBusqueda.toLowerCase()) > -1) {
                vcBusqueda = "0";
            }
            else if (activo.toLowerCase().indexOf(vcBusqueda.toLowerCase()) > -1 && desactivo.toLowerCase().indexOf(vcBusqueda.toLowerCase()) > -1) {
                vcBusqueda = "";
            }
            else if (activo.toLowerCase().indexOf(vcBusqueda.toLowerCase()) == -1 && desactivo.toLowerCase().indexOf(vcBusqueda.toLowerCase()) == -1) {
                vcBusqueda = "$";
            }
        }
        else {
            var campos = $("#hdfCampBool").val();
            var lstCampos = campos.split(",");
            var activo = $('#hdfVerdadero').val();
            var desactivo = $('#hdfFalso').val();

            $(lstCampos).each(function () {
                if ($('#ddlBusqueda').val() == this) {
                    if (activo.toLowerCase().indexOf(vcBusqueda.toLowerCase()) > -1 && desactivo.toLowerCase().indexOf(vcBusqueda.toLowerCase()) == -1) {
                        vcBusqueda = "1";
                    }
                    else if (activo.toLowerCase().indexOf(vcBusqueda.toLowerCase()) == -1 && desactivo.toLowerCase().indexOf(vcBusqueda.toLowerCase()) > -1) {
                        vcBusqueda = "0";
                    }
                    else if (activo.toLowerCase().indexOf(vcBusqueda.toLowerCase()) > -1 && desactivo.toLowerCase().indexOf(vcBusqueda.toLowerCase()) > -1) {
                        vcBusqueda = "";
                    }
                    else if (activo.toLowerCase().indexOf(vcBusqueda.toLowerCase()) == -1 && desactivo.toLowerCase().indexOf(vcBusqueda.toLowerCase()) == -1) {
                        vcBusqueda = "$";
                    }
                }
            });
        }
    }
    $("#grid").trigger("reloadGrid");
}

function ValorBusqueda() {
    if ($("#txtBusqueda").hasClass("txtBusqueda")) {
        return "";
    }
    else {
        return vcBusqueda;
    }
}


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

function ReporteDispositivoModelo() {
    Reportes("ReportePorModelo", "Reporte por Modelo");
}
function ReporteDispositivoEstado() {
    Reportes("ReportePorEstado", "Reporte por Estado");
}
function ReporteDispositivoHistorico() {
    Reportes("ReporteDispositivoHistorico", "Historico");
}
function ReporteLineaSinPlan() {
    Reportes("ReporteLineasSinPlan", "Líneas sin plan");
}
function ReporteLineaEmpleadoArea() {
    Reportes("ReporteLineasEmpleadoArea", "Líneas por empleado y/o área");
}
function ReporteLineaCuentaOperador() {
    Reportes("ReporteLineasPorCuentaOperador", "Líneas por cuenta y/u operad.");
}
function Reportes(Prefix, Titulo_Reporte) {
    var Id = "#" + $("#hdfvcTab").val() + "_Tab_" + Prefix;
    AbrirTab(Id);
};
function ReportesDinamicos() {
    var Id = "#" + $("#hdfvcTab").val() + "_Tab_" + IdOpcion;

};
//function AbrirTab(Id)
//{
//    var $panel = tab.find(Id);
//    if (!$panel.length)
//    {//En el caso que no exista el tab, lo crea
//        tab.tabs("add", Id, Titulo);
//        $(Id).css("width", "99%");
//        $(Id).css("height", "92%");
//        $(Id).css("margin-top", "0px");
//        $(Id).css("margin-left", "0px");
//        $(Id).css("margin-bottom", "0px");
//        $(Id).css("margin-right", "0px");
//        $(Id).css("padding-top", "0px");
//        $(Id).css("padding-left", "0px");
//        $(Id).css("padding-bottom", "0px");
//        $(Id).css("padding-right", "0px");
//
//        $(Id).css("border", "0px solid gray");
//    }
//    else
//    {//En el caso que exista lo muestra
//        tab.tabs('select', Id);
//    }
//}

//function MostrarReportes() {
//    //menu.hide();
//    $("#ulListaReportes").hide();
//    $("#dvFiltroRegistro").hide();
//    var menu = $("#ulListaReportes").show().position({
//        my: "left top",
//        at: "left bottom",
//        of: $("#btnReporte")[0]
//    });
//    $(document).one("click", function () {
//        menu.hide();
//    });
//    return false;
//}

$(".aReporte").click(function () {
    pagina = $(this).attr("URL");
    if (pagina == "../../P_Movil/Consultar/Con_CriteriosReporte.aspx?vcTipRep=4&vcTab=MOV_Dispositivo" && $("#hdfvcTab").val() == "MOV_Dispositivo") {
        var Id = "#" + $("#hdfvcTab").val() + "_Tab_CriteriosReporteDispositivo";
        Titulo = $(this).html();
        AbrirTab(Id);
    }
    else if (pagina == "../../P_Movil/Consultar/Con_CriteriosReporte.aspx?vcTipRep=5&vcTab=MOV_Linea" && $("#hdfvcTab").val() == "MOV_Linea") {
        var Id = "#" + $("#hdfvcTab").val() + "_Tab_CriteriosReporteLinea";
        Titulo = $(this).html();
        AbrirTab(Id);
    }
    else {
        var Id = "#" + $("#hdfvcTab").val() + "_Tab_" + $(this).attr("idTab");
        Titulo = $(this).html();
        AbrirTab(Id);
    }
});

$(".aReportes").click(function () {
    pagina = $(this).attr("URL");
    if (pagina == "../../P_Movil/Consultar/Con_CriteriosReporte.aspx?vcTipRep=4&vcTab=MOV_Dispositivo" && $("#hdfvcTab").val() == "MOV_Dispositivo") {
        var Id = "#" + $("#hdfvcTab").val() + "_Tab_CriteriosReporteDispositivo";
        Titulo = $(this).html();
        AbrirTab(Id);
    }
    else if (pagina == "../../P_Movil/Consultar/Con_CriteriosReporte.aspx?vcTipRep=5&vcTab=MOV_Linea" && $("#hdfvcTab").val() == "MOV_Linea") {
        var Id = "#" + $("#hdfvcTab").val() + "_Tab_CriteriosReporteLinea";
        Titulo = $(this).html();
        AbrirTab(Id);
    }
    else {
        var Id = "#" + $("#hdfvcTab").val() + "_Tab_" + $(this).attr("idTab");
        Titulo = $(this).html();
        AbrirTab(Id);

    }
});




$(".aReporteArea").click(function () {

    var $width = 740;
    var $height = 505;
    var $Pagina = '../../Common/Consultar/Con_SeleccionArea.aspx?Tipo=1&Multiple=1';
    $("#ifArea").attr("src", $Pagina);
    Modal = $('#dvArea').dialog({
        title: "Seleccionar área",
        width: $width,
        height: $height,
        modal: true,
        resizable: false
    });
});


$(".aReporteSucursalFisLog").click(function () {

    var $width = 460;
    var $height = 405;
    var $Pagina = '../../Mantenimiento/SeleccionaSucursalFisLog.aspx?Tipo=1&Multiple=1';
    $("#ifSucursal").attr("src", $Pagina);
    Modal = $('#dvSucursal').dialog({
        title: "Seleccione las sucursales para el reporte",
        width: $width,
        height: $height,
        modal: true,
        resizable: false
    });
});



if ($("#hdfBotonAgregar").val() == "-1") {
    $("#btnAgregar").button("disable");
}


//=================================================================
// Manuel Tenorio

$("#btnAgregar").click(function () {

    $("#hdfIdTipoCobro").val("0");
    $("#hdfIdConceptoCobro").val("0");
    $("#hdfIdProducto").val("0");

    switch ($("#hdfvcTab").val()) {
        case "APR_TipoCobro":
            {
                var digTipoCobro = $("#div_modal_tipocobro").dialog({
                    title: 'Agregar Tipo de Cobro',
                    width: 280,
                    height: 140,
                    modal: true,
                    resizable: false,
                    position: ['Center'],
                    autoOpen: true
                });

                $("#txtDescripcion").val("");
                $("#txtDescripcion").focus();
                break;
            }
        case "APR_ConceptoCobro":
            {
                var digConceptoCobro = $("#div_modal_conceptocobro").dialog({
                    title: 'Agregar Concepto de Cobro',
                    width: 280,
                    height: 170,
                    modal: true,
                    resizable: false,
                    position: ['Center'],
                    autoOpen: true
                });

                $("#txtconceptocobro").val("");
                $("#txtconceptocobro").focus();
                break;
            }
    }

})



$("#btnGuardarTipoCobro").click(function () {
    BloquearPagina(true);

    var Apr_TipoCobro = new apr_TipoCobro();

    Apr_TipoCobro.IdTipoCobro = $("#hdfIdTipoCobro").val();
    Apr_TipoCobro.Descripcion = $.trim($("#txtDescripcion").val());

    if (Apr_TipoCobro.Descripcion == "") {
        alertaExterna("La descripción del Tipo de Cobro es un campo obligatorio.");
        BloquearPagina(false);
        $("#txtDescripcion").focus();
        return;
    }

    var oApr_TipoCobro = JSON.stringify(Apr_TipoCobro);

    var MensajeRegistroActualiza;
    if (Apr_TipoCobro.IdTipoCobro == 0) { MensajeRegistroActualiza = "Registro guardado <br/><br/> Tipo Cobro:  " + Apr_TipoCobro.Descripcion; }
    if (Apr_TipoCobro.IdTipoCobro != 0) { MensajeRegistroActualiza = "Registro actualizado <br/><br/> Tipo Cobro:  " + Apr_TipoCobro.Descripcion; }

    $.ajax({
        type: "POST",
        url: "Adm_ListaLiquidacion.aspx/GuardarTipoCobro",
        data: "{'oTipoCobro': '" + oApr_TipoCobro + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.d == '1') {
                BloquearPagina(false);
                alertaExterna("El tipo de cobro ya existe en la base de datos");
                return;
            }
            else {
                //window.parent.ActualizarGrilla();
                ActualizarGrilla();

                MensajeProceso(MensajeRegistroActualiza);

                CerroMensajeTipoCobro();
                //Mensaje("<br/><h1>Registro guardado</h1><h2> Tipo Cobro:  " + Apr_TipoCobro.Descripcion + "</h2>", document, CerroMensaje);
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
            BloquearPagina(false);
        }
    });

});

$("#btnGuardarConceptoCobro").click(function () {
    BloquearPagina(true);

    var Apr_ConceptoCobro = new apr_ConceptoCobro();

    Apr_ConceptoCobro.IdConceptoCobro = $("#hdfIdConceptoCobro").val();
    Apr_ConceptoCobro.Nombre = $.trim($("#txtconceptocobro").val());
    Apr_ConceptoCobro.IdProducto = $("#ddlProducto").val();

    if (Apr_ConceptoCobro.Descripcion == "") {
        alertaExterna("La descripción del concepto de Cobro es un campo obligatorio.");
        BloquearPagina(false);
        $("#txtconceptocobro").focus();
        return;
    }

    var oApr_ConceptoCobro = JSON.stringify(Apr_ConceptoCobro);

    var MensajeRegistroActualiza;
    if (Apr_ConceptoCobro.IdConceptoCobro == 0) { MensajeRegistroActualiza = "Registro guardado <br/><br/> Concepto Cobro:  " + Apr_ConceptoCobro.Nombre; }
    if (Apr_ConceptoCobro.IdConceptoCobro != 0) { MensajeRegistroActualiza = "Registro actualizado <br/><br/> Concepto Cobro:  " + Apr_ConceptoCobro.Nombre; }

    $.ajax({
        type: "POST",
        url: "Adm_ListaLiquidacion.aspx/GuardarConceptoCobro",
        data: "{'oConceptoCobro': '" + oApr_ConceptoCobro + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.d == '1') {
                BloquearPagina(false);
                alertaExterna("El concepto de cobro del producto ya existe en la base de datos");
                return;
            }
            else {
                //window.parent.ActualizarGrilla();
                ActualizarGrilla();

                MensajeProceso(MensajeRegistroActualiza);

                CerroMensajeConceptoCobro();
                //Mensaje("<br/><h1>Registro guardado</h1><h2> Tipo Cobro:  " + Apr_ConceptoCobro.Descripcion + "</h2>", document, CerroMensaje);
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
            BloquearPagina(false);
        }
    });

});


//-------btn Editar----------
function EditarRegistro() {
    var id = null;
    if (idSeleccionado == null) {
        if ($($("#grid").jqGrid('getGridParam', 'selarrrow')).length == 1)
            id = $("#grid").jqGrid('getGridParam', 'selarrrow')[0];
        else if ($($("#grid").jqGrid('getGridParam', 'selarrrow')).length == 0) {
            alertaExterna("Seleccione un registro");
            return;
        }
        else if ($($("#grid").jqGrid('getGridParam', 'selarrrow')).length > 1) {
            alertaExterna("Ha seleccionado más de un elemento, seleccione sólo un elemento.");
            return;
        }
    }
    else
        id = idSeleccionado;
    idSeleccionado = null;

    if (id) {

        var IdTab = "#" + $("#hdfvcTab").val() + "_Tab_Editar";
        var $panel = tab.find(IdTab);

        var ids = idTabla.split(",");
        var idsParametro = "";
        var idsValor = "";
        var datos = $("#grid").jqGrid('getRowData', id);

        var ValoresPorDefectoId = $("#hdfValorPorDefecto").val().split(",");
        for (i in ids) {
            if (idsParametro != "") {
                idsParametro += ",";
                idsValor += "-";
            }
            idsParametro += ids[i];
            idsValor += datos[ids[i]];

            for (valor in ValoresPorDefectoId) {
                if ($.trim(ValoresPorDefectoId[valor]) == $.trim(datos[ids[i]])) {
                    alertaExterna("El registro no puede ser editado, es un registro del sistema.");
                    return;
                }
            }
        }

        if (!$panel.length) {//En el caso que no exista el tab, lo crea
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

            $(IdTab).css("border", "0px solid gray");
        }
        else {//En el caso que exista lo muestra
            if (vcCod == id) {//Si el codigo anterior seleccionado es igual al actual
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
                //tab.tabs('select', IdTab);

                $(IdTab).css("border", "0px solid gray");
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

                $(IdTab).css("border", "0px solid gray");
            }
        }
        vcCod = id;
    }
    else {
        alertaExterna("Seleccione un registro");
    }
};
//-------Fin btn Editar-----

function CerroMensajeTipoCobro() {
    BloquearPagina(false);

    if ($("#hdfIdTipoCobro").val() == "0") {

        $("#txtDescripcion").val("");
        $("#txtDescripcion").focus();
        $("#div_modal_tipocobro").dialog('close');
    }
    else {
        $("#div_modal_tipocobro").dialog('close');
    }
}

function CerroMensajeConceptoCobro() {
    BloquearPagina(false);

    if ($("#hdfIdConceptoCobro").val() == "0") {

        $("#txtconceptocobro").val("");
        $("#txtconceptocobro").focus();
        $("#div_modal_conceptocobro").dialog('close');
    }
    else {
        $("#div_modal_conceptocobro").dialog('close');
    }
}



$("#btnCerrarTipoCobro").click(function () {
    $("#div_modal_tipocobro").dialog('close');
});

$("#btnCerrarConceptoCobro").click(function () {
    $("#div_modal_conceptocobro").dialog('close');
});

function ListarProductos() {
    $("#ddlProducto").append($("<option></option>").attr("value", -1).text("Seleccione"));

    $.ajax(
    {
        type: "POST",
        url: "Adm_ListaLiquidacion.aspx/ListarProductos",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: "{}",
        success: function (result) {
            var lstProducto = result.d;

            $(lstProducto).each(function () {
                $("#ddlProducto").append($("<option></option>").attr("value", this.IdProducto).text(this.Nombre));
            });
        },
        error: function () { alert("error"); }
    });
}
//=================================================================

//If vcTab = "MOV_CAM_CampanaDespachoOperador" And ddlBusqueda.SelectedValue = "vcEstLin" Then txtBusqueda.Text = "Disponible"

//----------------------------------------------------------------------------------------------------
});




function myCustSort(myCell, rowObj) {
    var n = myCell.length;
    var intRegex = /^\d+$/;
    var checkNumeric;
    checkNumeric = intRegex.test(myCell);
    if (typeof myCell === 'string') {
        if (checkNumeric === true) {
            return parseInt(myCell);
        }
        else {
            return myCell;
        }
    }
    else {
        return myCell;
    }
}



function AbrirTab(Id) {
    var $panel = tab.find(Id);
    if (!$panel.length) {//En el caso que no exista el tab, lo crea
        tab.tabs("add", Id, Titulo);
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

        $(Id).css("border", "0px solid gray");
    }
    else {//En el caso que exista lo muestra
        tab.tabs('select', Id);
    }
}


function AbrirTabReporte(Id, vcPagina, vcTitulo) {
    var $panel = tab.find(Id);
    pagina = vcPagina;
    if (!$panel.length) {//En el caso que no exista el tab, lo crea
        tab.tabs("add", Id, vcTitulo);
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

        $(Id).css("border", "0px solid gray");
    }
    else {//En el caso que exista lo muestra
        tab.tabs('remove', Id);

        tab.tabs("add", Id, vcTitulo);
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

        $(Id).css("border", "0px solid gray");
    }
}


function NumeroInicialFilas() {
    inFilas = Math.floor(inAltGrid / nuAltoFila);

    ArrayPaginacion.push(inFilas)
    ArrayPaginacion.push(inFilas + inFilas)
    ArrayPaginacion.push(inFilas + inFilas + inFilas)
}






function cerrarAlertaReporte() {
    alertasReporte('No se encontraron registros para el reporte');
}

function raizX(ruta) {
    var publicacion = "../../";
    return publicacion + ruta;
}



