var tab;
var MargenFiltro = 0;
var MargenHeight = 48;
var idSeleccionado = null;
var TamanoPagina = [10, 20, 30];
var inAltGrid;
var inFilas;
var inFiltro = 1;
var vcFiltro = '';
var vcFiltro2 = '';
var vcGruTipSolEdi;
var vcGruTipSolEli;
var vcVista = "General";
var vcTodos = "0";
var vcTipos = "0"; //Generalm
var vcFecVal;
var vcRangFecVal;
var vcRangoFechaIni;
var vcRangoFechaFin;
var inIdResTec;
var vcTit;
var vcMen;
var lstIdSol = "";
var vcIdTipSol = "";
var vcEsReasignar = "0";

function ActualizarGrilla() {
    $("#grid").trigger("reloadGrid");
}

function CerroMensaje() {
    BloquearPagina(false);
}




$(function () {

    function fnMostrarEspera() {
        //$("#divWait").show();
        //$('body').scrollTop(0);
    }


    //window.parent.$("#dvCargando").hide(); jcamacho123
    inAltGrid = $(window).height() - 168 - MargenFiltro * MargenHeight;





    vcTipos = $("#hdfGruTipSol").val(); //General
    $("#btnAgregar").button("option", "disabled", true);
    $("#btnEditar").button("option", "disabled", true);
    $("#btnEliminar").button("option", "disabled", true);


    $("#tbExportar").buttonset();
    $(".ui-button-text").css({ padding: 4, width: 22 });

    $("#TabDetalle span.ui-icon-close").live("click", function () {
        var index = $("li", tab).index($(this).parent());
        tab.tabs("remove", index);
    });

    $("#btnVista").click(function () {
        var menu = $("#dvVistas").show().position({
            my: "left top",
            at: "left bottom",
            of: $("#btnVista")[0]
        });
        $(document).one("click", function () {
            menu.hide();
        });
        return false;
    });

    function CambioVistas() {
        inFiltro = 1;
        vcFiltro = "";
        //debugger;
        if ($('#rbtGeneral').is(':checked')) {

            ActualizarGrilla();

        } else {

            ActualizarGrilla();
        }
        //fnCargarFiltroTipoSolicitud();


    }


    $("#rbtGeneral,#rbtPendiente,#rbtPorAprobar,#rbtAprobada,#rbtRechazada,#rbtPorAsignar,#rbtEnProceso,#rbtCulminada,#rbtAnulada").change(function () {
        CambioVistas();
    });



    $("#divCodigo").show();
    $("#divFecha").hide();
    $("#divEmpleado").hide();
    $("#divEstadoSolicitud").hide();
    $("#divTipoSolicitud").hide();

    //alert($("#hdfBusquedaIni").val());

    //if ($("#hdfBusquedaIni").val() != "") {
    $("#divCodigo").hide();
    $("#ddlFiltro").val("IdTipoSolicitud");

    inFiltro = 7;
    vcFiltro = '';
    vcFiltro2 = '';

    $('#rbtGeneral').attr('checked', 'checked');
    $('#dvFiltrar').hide();
    fnVistaGeneral(true);


    //}






    function fnCargarGrilla() {
        vcFiltro2 = "";
        if ($('#rbtGeneral').is(':checked') && inFiltro != 7) {  //FILTRO DE RANGO DE FECHA SOLO PARA LA OPCION GENERAL---------------------------------------------------------------
            var RangFecIni = $("#txtRangoFechaIni").val();
            var RangFecFin = $("#txtRangoFechaFin").val();
            vcRangoFechaIni = "";
            if (RangFecIni != "") {
                vcRangoFechaIni = RangFecIni.substr(6, 4).toString() + RangFecIni.substr(3, 2).toString() + RangFecIni.substr(0, 2).toString() + " 00:00:00";
            } else
            { vcRangoFechaFin = ""; }
            if (RangFecFin != "")
            { vcRangoFechaFin = RangFecFin.substr(6, 4).toString() + RangFecFin.substr(3, 2).toString() + RangFecFin.substr(0, 2).toString() + " 23:59:59"; }
            else
            { vcRangoFechaFin = ""; }
        } else {
            vcRangoFechaIni = "";
            vcRangoFechaFin = "";
        }
        //----------------------------------------------------------------------------------------------------------------------------------------------------------------
        if (inFiltro == 1) //Código
        { vcFiltro = LimpiarDatoString($("#txtCodigo").val()); }
        else if (inFiltro == 2) { //Rango de Fechas
            var FecHorIni = $("#txtFechaIni").val();
            var FecHorFin = $("#txtFechaFin").val();
            if (FecHorIni != "")
            { vcFiltro = FecHorIni.substr(6, 4).toString() + FecHorIni.substr(3, 2).toString() + FecHorIni.substr(0, 2).toString() + " 00:00:00"; }
            else
            { vcFiltro = ""; }
            if (FecHorFin != "")
            { vcFiltro2 = FecHorFin.substr(6, 4).toString() + FecHorFin.substr(3, 2).toString() + FecHorFin.substr(0, 2).toString() + " 23:59:59"; }
            else
            { vcFiltro2 = ""; }
        }
        else if (inFiltro == 3) //Empleado
        { vcFiltro = LimpiarDatoString($("#txtEmpleado").val()); }
        else if (inFiltro == 4) //Estados de Aprobación
        { vcFiltro = $("#ddlEstadoApr").val(); }
        else if (inFiltro == 5) //Estados de Proceso
        { vcFiltro = $("#ddlEstadoPro").val(); }
        else if (inFiltro == 6) { //Tipos de Solicitud
            if ($("#divTipoSolicitud").is(':visible')) {
                vcFiltro = $("#ddlTipo").val();
            } else if ($("#divTipoSolicitudTec").is(':visible')) {
                vcFiltro = $("#ddlTipoTec").val();
            } else if ($("#divTipoSolicitudResApr").is(':visible')) {
                vcFiltro = $("#ddlTipoResApr").val();
            }
        } else if (inFiltro == 7) //Notas Por Revisar
        { vcFiltro = ''; }
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

    function GenerarBotones(id, biNueNot) {
        var vcBotones = '      <img id="btnNota_' + id + '" src="../Common/Images/Chat/write.png" alt="Ver Notas" class="imgBtn ConImg" title="Ver Notas"/>';
        if (biNueNot == "0")
        { vcBotones += '   <img id="imgNueNot_' + id + '" src="../Common/Images/Chat/Mail.png" alt="Nueva Nota" title="Nueva Nota"/>'; }
        else
        { vcBotones += ''; }

        return vcBotones;
    }



    $(".ConImg").live("click", function () {
        var id = $(this).attr("id").substr(8);
        var datos = $("#grid").jqGrid('getRowData', id);
        $('#ifNota').attr("src", "Adm_SolicitudNota.aspx?IdSolicitud=" + id + "&IdEstApr=" + datos.F_inEstSol_Apr + "&IdEstPro=" + datos.F_inEstSol);
        formulario = $('#dvNota').dialog({
            title: "Notas de la Solicitud: " + datos.vcCodigo,
            height: 520,
            width: 703,
            modal: true
        });

        $("#imgNueNot_" + id).hide();
    });


    var tbSolicitudes = $("#grid").jqGrid({
        sortable: true,
        datatype: function () {
            var dtInicio = new Date();
            $.ajax({
                url: "TipoSolicitud.aspx/ListarTipo", //PageMethod
                data: "{ 'tipofiltro':'" + $("#ddlFiltro").val() + "'," +
                        "'filtro':'" + $('#txtFiltro').val() + "'," +
                        "'inPagTam':'" + $('#grid').getGridParam("rowNum") + "'," +
                        "'inPagAct':'" + parseInt($('#grid').getGridParam("page"),0) + "'," +
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
                id: "IdTipoSolicitud"
            },
        colModel: [
                       { name: 'IdTipoSolicitud', index: 'IdTipoSolicitud', label: 'Código', hidden: false, key: true, width: 60 },
                       { name: 'descripcion', index: 'descripcion', label: 'Descripción', hidden: false, width: 110 },
                       { name: 'Estado', index: 'Estado', label: 'Estado', hidden: true, width: 130 },
                       { name: 'Prefijo', index: 'Prefijo', label: 'Prefijo', hidden: false },
                       { name: 'TecnicoAsignado', index: 'TecnicoAsignado', label: 'Técnico Asignado', hidden: false, width: 160}],

        viewrecords: true,
        pager: "#pager", //Pager.
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        rowNum: inFilas, //$("#hdfTamPag").val(), //"10" PageSize.
        rowList: [10, 20, 30],  //TamanosPaginaSel, //Variable PageSize DropDownList. 
        sortname: "descripcion", //sortname: idTabla, //Default SortColumn
        sortorder: "desc", //Default SortOrder.
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



    $("#btnAgregar").live("click", function () {
        pagina = "Adm_SolicitudesConfiguracion.aspx" + "?Cod=0&";
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

    $("#btnEditar").live("click", function () {
        //fnEditarRegistro();
        var id = $("#grid").jqGrid('getGridParam', 'selrow');

        if (id) {
            var datos = $("#grid").jqGrid('getRowData', id);
            var IdTipoSolicitud = datos['IdTipoSolicitud'];

            pagina = "Adm_SolicitudesConfiguracion.aspx" + "?Cod=" + IdTipoSolicitud;
            var Id = "#" + $("#hdfvcTab").val() + "_Tab_Nuevo";
            var $panel = tab.find(Id);
            if (!$panel.length) {//En el caso que no exista el tab, lo crea
                tab.tabs("add", Id, "Editar");
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
        else {
            alert('Seleccione un registro'); return;
        }
        //fnEditarSolicitud();
    });



    $("#btnEliminar").live("click", function () {

        //fnEliminarSolicitud();
    });

    $('#txtFiltro').live("keypress", function (e) {
        if (e.keyCode == 13) {
            fnCargarGrilla();
        } else {
            if (e.char == "\\")
            { return false; }
        }
    });

    function EditarRegistro(id) {
        if (pagina != "") {
            idSeleccionado = id;
            //LeerSolicitud();
        }
    }
    CambioVistas();
});



function fnVistaGeneral(blQuitarFiltros) {
    $("#lblVista").html("General");


}






