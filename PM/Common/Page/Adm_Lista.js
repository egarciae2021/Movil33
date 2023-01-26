var dialogLiberacion;
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
var nuAltoFila = 32;
var inAltGrid;
var inFilas;
var inTotReg;
var ValorBusqueda;
var CarpetaDominio = '';
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

    var indiceTab;

    //var Nametab = window.top.tabschild[window.top.tabPrincipal.tabs("option", "selected")].id;
    //var tabPrincipal = window.top.$("#" + Nametab);
    //var indiceTab = tabPrincipal.tabs("option", "selected");
    //var tabHijo = tabPrincipal.find("a")[indiceTab].hash;

    if ($("#hdfLicencia").val() == "4GVBGsuwXJDBuD3LFODkzQA=") {
        //alertaTab("No cuenta con licencia para ingresar al módulo.", null, function () {
        //    tabPrincipal.tabs("remove", tabHijo);
        //});


        //setTimeout(function () {
        //    tabPrincipal.tabs("remove", tabHijo);
        //}, 5000);
    }


    if ($("#hdfvcTab").val() == "MOV_IMP_Plantilla" || $("#hdfvcTab").val() == "MOV_IMP_Servicio" || $("#hdfvcTab").val() == "MOV_IMP_Ruta" || $("#hdfvcTab").val() == "MOV_IMP_Destino") {
        inAltGrid = $(window).height() - 275 - MargenFiltro * MargenHeight;
    }
    else {
        inAltGrid = $(window).height() - 185 - MargenFiltro * MargenHeight;
    }
    CarpetaDominio = window.top.$("#hdfCodigoDominio").val() != '' ? '/' + window.top.$("#hdfCodigoDominio").val() : '';
    NumeroInicialFilas();

    BusquedaFocus();

    $("#ulListaReportes").hide().menu();
    $("#ulListaFormatos").hide().menu();
    var vcBusqueda = "";

    //agregado 02/10/2014 wapumayta
    if ($("#hdfvcTab").val() == "MOV_CAM_CampanaDespachoOperador") {
        $("#btnActivar").hide();
    }
    else if ($("#hdfvcTab").val() == "MOV_CAM_Campana") {
        $("#dvLeyendaCam").css("display", "block");
    }

    if ($("input[name='rbtnTipoDescarga']:checked").val() == "1") {
        $("#trNivel").css("display", "none");
    } else if ($("input[name='rbtnTipoDescarga']:checked").val() == "2") {
        $("#trNivel").css("display", "");
    }



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
    //($("#ddlBusqueda").val() != undefined ? $("#ddlBusqueda").val().split("-")[1] : $("#ddlBusqueda").val())

    $("#grid").jqGrid({
        sortable: true,
        datatype: function () {

            var dtInicio = new Date();


            $.ajax({
                url: "Adm_Lista.aspx/Listar", //PageMethod
                data: "{'inPagTam':'" + $('#grid').getGridParam("rowNum") + "'," + //Tamaño de pagina
                    "'inPagAct':'" + parseInt($('#grid').getGridParam("page")) + "'," + //Pagina actual
                    "'vcOrdCol':'" + $('#grid').getGridParam("sortname") + "'," + //Nombre de columna ordenado
                    "'vcTipOrdCol':'" + $('#grid').getGridParam("sortorder") + "'," + //Tipo de orden de columna asc, desc                               
                    "'vcCam':'" + ($("#ddlBusqueda").val() != undefined ? $("#ddlBusqueda").val().split("-")[1] : $("#ddlBusqueda").val()) + "'," + //Campo de busqueda
                    "'vcValBus':'" + ValorBusqueda() + "'," + //Valor de busqueda
                    "'vcTab':'" + $('#hdfvcTab').val() + "'," + //Tabla
                    "'inTipOri':'" + $('#hdfinTipOri').val() + "'," + //TipoOrigen
                    "'inTipLin':'" + $('#hdfCodLinTip_X_User').val() + "'," + //TipoLinea
                    "'inFilReg':'" + FiltroRegistro + "'}", //FiltroRegistro
                dataType: "json",
                type: "post",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (($('#hdfvcTab').val() == "MOV_Dispositivo") || ($('#hdfvcTab').val() == "MOV_Linea")) {
                        //RURBINA LICENCIA
                        if (result.d.Validate == 5) {
                            alertaURL("Ha alcanzado el número maximo de líneas permitidas, comuniquese con su proveedor para más información.", null, null, null, 7000, "../../Login.aspx");
                        }
                        else if (result.d.Validate == 6) {
                            alertaURL("Ha alcanzado el número maximo de dispositivos permitidas, comuniquese con su proveedor para más información.", null, null, null, 7000, "../../Login.aspx");
                        }
                        else if (result.d.Validate == 7) {
                            alertaURL("Usuario registrado no existe, comuniquese con su proveedor para más información.", null, null, null, 7000, "../../Login.aspx");
                        }
                        else if (result.d.Validate == 8) {
                            alertaURL("Identificación de posibles problemas de licencias, comuniquese con su proveedor para más información.", null, null, null, 7000, "../../Login.aspx");
                        }
                    }
                    $("#grid")[0].addJSONData(result.d);
                    var dtFin = new Date();
                    var diff = (dtFin - dtInicio) / 1000;
                    inTotReg = result.d.TotalRegistros;
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
            $("#pager_left").css('width', 'auto');
        },
        onSelectRow: function (id, select, item) {
            //Botón Elimnar deshabilitado para solicitudes de sistema
            var aData;
            if ($("#hdfvcTab").val() == "MOV_TipoSolicitud") {
                aData = $("#grid").getRowData(id);
                if (aData.biPersonalizado == "NO" || aData.inCodTipSol == "30" || aData.inCodTipSol == "31") {
                    $("#btnEliminar").button("option", "disabled", true);
                } else {
                    $("#btnEliminar").button("option", "disabled", false);
                }
            }
            if ($("#hdfvcTab").val() == "SEG_Perfil") {
                aData = $("#grid").getRowData(id); // Agregado para que no pueda eliminar perfiles Usuario , tecnico incidencias, Administrador, Administrador de Bolsa, Recursos Humanos (Jcamacho 2015/09/2015)
                if (aData.P_inCod == "42" || aData.P_inCod == "1" || aData.P_inCod == "3" || aData.P_inCod == "50" || aData.P_inCod == "41" || aData.P_inCod == "39") {
                    $("#btnEliminar").button("option", "disabled", true);
                } else {
                    $("#btnEliminar").button("option", "disabled", false);
                }
            }
            if ($("#hdfvcTab").val() == "SEG_Usuario") {
                aData = $("#grid").getRowData(id);
                $.ajax({
                    type: "POST",
                    url: "Adm_Lista.aspx/VerificarUsuario",
                    data: "{'inCodUsu': '" + aData.P_inCod + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        if (result.d == '4') {
                            $("#btnEliminar").button("option", "disabled", true);
                            $("#btnEliminar").attr("title", "No se puede eliminar. Es 'Responsable De Aprobación' de tipo 'Usuario Respecífico' de un tipo de solicitud.");
                        } else if (result.d == '3') {
                            $("#btnEliminar").button("option", "disabled", true);
                            $("#btnEliminar").attr("title", "No se puede eliminar. Es especialista responsable de un tipo de solicitud.");
                            //alerta("El usuario no se puede eliminar por que es técnico responsable de un tipo de solicitud.");
                        } else if (result.d == '2') {
                            $("#btnEliminar").button("option", "disabled", true);
                            $("#btnEliminar").attr("title", "No se puede eliminar. Es especialista asignado a una solicitud.");
                            //alerta("El usuario no se puede eliminar por que es técnico asignado a una solicitud.");
                        } else {
                            $("#btnEliminar").attr("title", "Eliminar Seleccionados");
                            $("#btnEliminar").button("option", "disabled", false);
                        }
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            }

            if ($("#hdfvcTab").val() == "PCS_IMP_Config_Proceso") {
                aData = $("#grid").getRowData(id);
                if (aData.biSoportaEdicion == "NO") {
                    $("#btnEliminar").button("option", "disabled", true);
                    $("#btnEliminar").attr("title", "No se puede eliminar un registro del sistema.");
                }
                else {
                    $("#btnEliminar").button("option", "disabled", false);
                    $("#btnEliminar").attr("title", "Eliminar Seleccionados");
                }
            }

            var misIds = $('#grid').jqGrid('getGridParam', 'selarrrow');
            var colModels = $("#grid").getGridParam("colModel");

            var i;
            for (i = 0; i < colModels.length; i++) {
                //for (var i =0 in colModels) {
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
            //alerta("resize column " + index + " to " + width + "pixels");
        },
        afterInsertRow: function (rowid, aData, rowelem) {
            //Filas de Color Rojo filas no vigentes
            var colModels;
            var i;
            if (aData.btVig == 'False') {
                colModels = $("#grid").getGridParam("colModel");

                for (i = 0; i < colModels.length; i++) {
                    //$("#grid").jqGrid('setCell', rowid, i, '', { color: 'red', padding: '1px' });
                    $("#grid").jqGrid('setCell', rowid, i, '', "ui-state-error-text");
                }
            }
            else {

                if ($("#hdfvcTab").val() == "MOV_CAM_Campana" && aData.btActivo == "True") {
                    colModels = $("#grid").getGridParam("colModel");

                    for (i = 0; i < colModels.length; i++) {
                        $("#grid").jqGrid('setCell', rowid, i, '', "FilaCampanaActiva");
                    }
                }


                //Filas de Color Rojo para registro no procesados // agregado wapumayta 18/06/2014
                if ($("#hdfvcTab").val() == "MOV_CAM_CampanaDespachoOperador" && aData.btEstProc == "False") {
                    colModels = $("#grid").getGridParam("colModel");

                    for (i = 0; i < colModels.length; i++) {
                        $("#grid").jqGrid('setCell', rowid, i, '', { color: 'red' });
                    }
                }

                //Filas de Color Rojo para registro no procesados // agregado econdena 11/05/2015
                if ($("#hdfvcTab").val() == "PCS_MOV_GrupoServicio" && aData.btEst == "False") {
                    colModels = $("#grid").getGridParam("colModel");

                    for (i = 0; i < colModels.length; i++) {
                        //$("#grid").jqGrid('setCell', rowid, i, '', { color: 'red' });
                        $("#grid").jqGrid('setCell', rowid, i, '', "ui-state-error-text");
                    }
                }

                if ($("#hdfvcTab").val() == "PCS_MOV_ServicioResumen" && aData.btEst == "False") {
                    colModels = $("#grid").getGridParam("colModel");

                    for (i = 0; i < colModels.length; i++) {
                        //$("#grid").jqGrid('setCell', rowid, i, '', { color: 'red' });
                        $("#grid").jqGrid('setCell', rowid, i, '', "ui-state-error-text");
                    }
                }

                if ($("#hdfvcTab").val() == "MOV_Dispositivo" && aData.btVig == 'True' && aData.btVigEmp == "False") {
                    colModels = $("#grid").getGridParam("colModel");

                    for (i = 0; i < colModels.length; i++) {
                        //$("#grid").jqGrid('setCell', rowid, i, '', { 'background-color': '#6AEE80', 'color': 'black' });
                        $("#grid").jqGrid('setCell', rowid, i, '', { color: 'green', 'font-weight': 'bold' });
                    }
                }
                if ($("#hdfvcTab").val() == "MOV_Linea" && aData.btVig == 'True' && aData.btVigEmp == "False") {
                    colModels = $("#grid").getGridParam("colModel");

                    for (i = 0; i < colModels.length; i++) {
                        //for (var i =0 in colModels) {
                        //$("#grid").jqGrid('setCell', rowid, i, '', { 'background-color': '#6AEE80', 'color': 'black' });
                        $("#grid").jqGrid('setCell', rowid, i, '', { color: 'green', 'font-weight': 'bold' });
                    }
                }
                //Filas de color Gris para tipos de solicitud del sistema
                if ($("#hdfvcTab").val() == "MOV_TipoSolicitud" && aData.biSoportaEdicion == "False") {
                    colModels = $("#grid").getGridParam("colModel");

                    for (i = 0; i < colModels.length; i++) {
                    }
                }
                if ($("#hdfvcTab").val() == "MOV_SOA_Bolsa" && aData.NombreNivel == "Nivel General") {
                    colModels = $("#grid").getGridParam("colModel");

                    for (i = 0; i < colModels.length; i++) {
                        $("#grid").jqGrid('setCell', rowid, i, '', { color: 'grey' });
                    }
                }
                if ($("#hdfvcTab").val() == "MOV_SOA_Nivel" && (aData.Orden == "0" || aData.Orden == "1")) {
                    colModels = $("#grid").getGridParam("colModel");

                    for (i = 0; i < colModels.length; i++) {
                        $("#grid").jqGrid('setCell', rowid, i, '', { color: 'grey' });
                    }
                }

                if ($("#hdfvcTab").val() == "SEG_Perfil" && aData.P_inCod == "1") {
                    colModels = $("#grid").getGridParam("colModel");

                    for (i = 0; i < colModels.length; i++) {
                        $("#grid").jqGrid('setCell', rowid, i, '', { color: 'grey' });
                    }
                }
                if ($("#hdfvcTab").val() == "PCS_IMP_Config_Proceso" && aData.biSoportaEdicion == "False") {
                    colModels = $("#grid").getGridParam("colModel");

                    for (o = 0; i < colModels.length; i++) {
                        $("#grid").jqGrid('setCell', rowid, i, '', { color: 'grey' });
                    }
                }
            }
        },
        //onSortCol: function(name,index){  alerta("Column Name: "+name+" Column Index: "+index); },
        ondblClickRow: function (id) {
            var biSolicitudSistema = "0";
            //Desactiva edición para tipos de solicitud del sistema
            if ($("#hdfvcTab").val() == "MOV_TipoSolicitud") {
                if (($("#grid").getRowData(id)).biSoportaEdicion == "NO") { biSolicitudSistema = "1"; }
            }

            if ($("#hdfvcTab").val() == "MOV_SOA_Bolsa") {
                if (($("#grid").getRowData(id)).NombreNivel == "Nivel General") { biSolicitudSistema = "1"; }
            }

            if ($("#hdfvcTab").val() == "MOV_SOA_Nivel") {
                if (($("#grid").getRowData(id)).Orden == "0" || ($("#grid").getRowData(id)).Orden == "1") { biSolicitudSistema = "1"; }
            }
            if ($("#hdfvcTab").val() == "SEG_Perfil") {
                if (($("#grid").getRowData(id)).P_inCod == "1") { biSolicitudSistema = "1"; }
            }

            if ($("#hdfvcTab").val() == "PCS_IMP_Config_Proceso") {
                if (($("#grid").getRowData(id)).biSoportaEdicion == "NO") { biSolicitudSistema = "1"; }
            }
            if (biSolicitudSistema == "0") {
                $("#grid").jqGrid('resetSelection');
                $("#grid").jqGrid('setSelection', id);
                if ($("#hdfEdicion").val() == "1") { EditaRegistro(id); }
            }
        },
        beforeSelectRow: function (rowid, e) {
            if (!e.ctrlKey && !e.shiftKey) {
                $("#grid").jqGrid('resetSelection');
            }
            else if (e.shiftKey) {
                var initialRowSelect = $("#grid").jqGrid('getGridParam', 'selrow');
                $("#grid").jqGrid('resetSelection');

                var CurrentSelectIndex = $("#grid").jqGrid('getInd', rowid);
                var InitialSelectIndex = $("#grid").jqGrid('getInd', initialRowSelect);
                var startID = "";
                var endID = "";
                if (CurrentSelectIndex > InitialSelectIndex) {
                    startID = initialRowSelect;
                    endID = rowid;
                }
                else {
                    startID = rowid;
                    endID = initialRowSelect;
                }

                var shouldSelectRow = false;
                $.each($("#grid").getDataIDs(), function (_, id) {
                    if ((shouldSelectRow = id == startID || shouldSelectRow)) {
                        $("#grid").jqGrid('setSelection', id, false);
                    }
                    return id != endID;
                });
            }

            //Desactiva edición para tipos de solicitud del sistema
            if ($("#hdfvcTab").val() == "MOV_TipoSolicitud") {
                if (($("#grid").getRowData(rowid)).biSoportaEdicion == "NO") { return false; }
            }

            if ($("#hdfvcTab").val() == "MOV_SOA_Bolsa") {
                if (($("#grid").getRowData(rowid)).NombreNivel == "Nivel General") { return false; }
            }

            if ($("#hdfvcTab").val() == "MOV_SOA_Nivel") {
                if (($("#grid").getRowData(rowid)).Orden == "0" || ($("#grid").getRowData(rowid)).Orden == "1") { return false; }
            }

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


    //$(".ui-jqgrid-bdiv").css("overflow-y", "hidden");
    //$(".ui-jqgrid-bdiv").css("height", "622px");

    //$("#grid").jqGrid('gridResize', { minWidth: 200, maxWidth: 1050, minHeight: 80, maxHeight: 550 });
    //$("#grid").jqGrid('bindKeys', {
    //    "onEnter": function (id) {
    //        alert(id);
    //        if ($("#hdfEdicion").val() == "1")
    //            EditaRegistro(id); 
    //    },
    //    "onSpace": function (id) {
    //        alert(id);
    //        if ($("#hdfEdicion").val() == "1")
    //            EditaRegistro(id); 
    //    }
    //});

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

    $("#lblArchivoCargado").click(function () {
        //alert($("#hdfRutaCompleta").val());
        if ($("#lblArchivoCargado").html() != "") {
            window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + $("#hdfRutaCompleta").val());
        }
    });

    $("#btnBuscar").button({});

    $("#toolbar .btnNormal .ui-button-text").css({ padding: 4, width: 22 });

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
            pagina = pagina;
            var ifra = document.createElement('IFRAME');
            ifra.width = "100%";

            if ($("#hdfvcTab").val() == "MOV_IMP_Plantilla" || $("#hdfvcTab").val() == "MOV_IMP_Servicio" || $("#hdfvcTab").val() == "MOV_IMP_Ruta" || $("#hdfvcTab").val() == "MOV_IMP_Destino") {
                ifra.height = $(window).height() - 120;
            }
            else {
                ifra.height = "100%";
            }
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
            $(ifra).on('load', function () {
                //alert('cargó');

                $(ifra).contents().find('body').bind('mouseup', function () {
                    try {
                        window.top.window_mouseup();
                    } catch (e) {
                    }
                });

                window.top.$("#skLoading").hide();
            });
        }
    });

    function inicioPagina() {
        DimPosElementos();
        NumeroInicialFilas();
    }

    $(window).resize(function () {
        DimPosElementos();
    });

    //$("#btnActivar").button("option", "disabled", true);
    //$('#btnActivar').button("disable");
    //$("#btnActivar").attr("disabled", true).addClass("ui-state-disabled");

    //function DimPosElementos() {
    //    var Ancho = $(window).width();
    //    var Alto = $(window).height();
    //    var AnchoLateral = $(".LateralSplitter");

    //    if ($("#hdfvcTab").val() == "MOV_IMP_Plantilla" || $("#hdfvcTab").val() == "MOV_IMP_Servicio" || $("#hdfvcTab").val() == "MOV_IMP_Ruta" || $("#hdfvcTab").val() == "MOV_IMP_Destino") {
    //        if ($("#hdfvcTab").val() == "MOV_IMP_Plantilla") {
    //            // mjaramillo  - update tamaño de marco 
    //            $(".tabs").css({ height: Alto - 280, width: Ancho - AnchoLateral, marginbotton: 0, paddingbotton: 0 });
    //            $(".SinBordes").css({ height: Alto - 40, width: Ancho - 40 });
    //        } else {
    //            $(".tabs").css({ height: Alto - 260, width: Ancho - AnchoLateral, marginbotton: 0, paddingbotton: 0 });
    //        }
    //        //        $(".tabs").css({ height: Alto - 260, width: Ancho - AnchoLateral, marginbotton: 0, paddingbotton: 0 });
    //    } else {
    //        $(".tabs").css({ height: Alto - 25, width: Ancho - AnchoLateral, marginbotton: 0, paddingbotton: 0 });
    //    }


    //    $(".Splitter").css({ height: Alto - 18 });
    //    $("#grid").setGridWidth($(window).width() - 58);
    //    //$("#grid").setGridHeight($(window).height() - 185 - MargenFiltro * MargenHeight);
    //    $("#grid").setGridHeight(inAltGrid);

    //    //alert(window.parent.$("#tbPrincipal_TabJQ2_AccordionProd2_Item0_Item1_Item2_tab").height());
    //    //$("#TabDetalle").css("height", (Alto-75) + "px");
    //    //$("#TabDetalle_TabJQ1").css("height", (Alto - 100) + "px");
    //}
    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        var AnchoLateral = $(".LateralSplitter");

        if (Ancho < 500) {
            $(".mobileHide").hide();
            $("#TabDetalle_TabJQ1").addClass("overflowNone");
        }
        else {
            $(".mobileHide").show();
            $("#TabDetalle_TabJQ1").removeClass("overflowNone");
        }

        if ($("#hdfvcTab").val() == "MOV_IMP_Plantilla" || $("#hdfvcTab").val() == "MOV_IMP_Servicio" || $("#hdfvcTab").val() == "MOV_IMP_Ruta" || $("#hdfvcTab").val() == "MOV_IMP_Destino") {
            $(".tabs").css({ height: Alto - 25, width: Ancho - 15, marginbotton: 0, paddingbotton: 0 });
        } else {
            $(".tabs").css({ height: Alto - 25, width: Ancho - 13, marginbotton: 0, paddingbotton: 0 });
        }

        if ($("#hdfvcTab").val() == "MOV_IMP_Plantilla" || $("#hdfvcTab").val() == "MOV_IMP_Servicio" || $("#hdfvcTab").val() == "MOV_IMP_Ruta" || $("#hdfvcTab").val() == "MOV_IMP_Destino") {
            $("#grid").setGridHeight(Alto - 240);
            $("#grid").setGridWidth(Ancho - 50);
        } else {
            if ($("#hdfvcTab").val() == "MOV_CAM_CampanaDespachoOperador") {
                $("#grid").setGridHeight(Alto - 195 - 20);
            } else {
                $("#grid").setGridHeight(Alto - 190 - 20);
            }
            $("#grid").setGridWidth(Ancho - 45);
        }
        NumeroInicialFilas();
        RecalcularColumnasGrilla("grid", true);
    }

    $("#TabDetalle span.ui-icon-close").live("click", function () {
        var index = $("li", tab).index($(this).parent());
        tab.tabs("remove", index);
    });

    function AgregarRegistro() {
        var inNumMaxNivel = parseInt($("#hdfNumMaxNivel").val());

        if ($("#hdfvcTab").val() == "M_NIVE" && inNumMaxNivel <= inTotReg) {
            alerta("No puede haber más de " + inNumMaxNivel + " niveles.");
            return;
        }

        var Id = "#" + $("#hdfvcTab").val() + "_Tab_Nuevo";
        var $panel = tab.find(Id);
        if (!$panel.length) {//En el caso que no exista el tab, lo crea
            window.top.$("#skLoading").show();
            pagina += "?vcTab=" + $("#hdfvcTab").val();
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
    }

    function EditarRegistro() {
        var id = null;
        var SoloVista = false;
        if (pagina.indexOf("VistaVer=1") > -1) {
            SoloVista = true;
        }

        if (idSeleccionado == null) {
            if ($($("#grid").jqGrid('getGridParam', 'selarrrow')).length == 1) { id = $("#grid").jqGrid('getGridParam', 'selarrrow')[0]; }
            else if ($($("#grid").jqGrid('getGridParam', 'selarrrow')).length == 0) {
                alerta("Seleccione un registro");
                return;
            }
            else if ($($("#grid").jqGrid('getGridParam', 'selarrrow')).length > 1) {
                alerta("Ha seleccionado más de un registro, seleccione sólo un registro.");
                return;
            }
        }
        else { id = idSeleccionado; }
        idSeleccionado = null;

        if (id) {
            var IdTab = "#" + $("#hdfvcTab").val() + "_Tab_Editar";
            var $panel = tab.find(IdTab);

            var ids = idTabla.split(",");
            var idsParametro = "";
            var idsValor = "";
            var datos = $("#grid").jqGrid('getRowData', id);

            var ValoresPorDefectoId = $("#hdfValorPorDefecto").val().split(",");

            var i;
            for (i = 0; i < ids.length; i++) {
                if (idsParametro != "") {
                    idsParametro += ",";
                    idsValor += "-";
                }
                idsParametro += ids[i];
                idsValor += datos[ids[i]];

                var valor;
                for (valor = 0; valor < ValoresPorDefectoId.length; valor++) {
                    //if ($.trim(ValoresPorDefectoId[valor]) == $.trim(datos[ids[i]])) {
                    //    alerta("El registro no puede ser editado, es un registro del sistema.");
                    //    return;
                    //}
                }
            }

            //for (i in ids) {
            //    if (idsParametro != "") {
            //        idsParametro += ",";
            //        idsValor += "-";
            //    }
            //    idsParametro += ids[i];
            //    idsValor += datos[ids[i]];
            //
            //    for (valor in ValoresPorDefectoId) {
            //        if ($.trim(ValoresPorDefectoId[valor]) == $.trim(datos[ids[i]])) {
            //            alerta("El registro no puede ser editado, es un registro del sistema.");
            //            return;
            //        }
            //    }
            //}

            if (!$panel.length) {//En el caso que no exista el tab, lo crea
                window.top.$("#skLoading").show();
                //Se agrega para la vista básica
                if (pagina.indexOf("?") == -1) {
                    pagina += "?Cod=" + idsValor + "&Par=" + idsParametro + "&vcTab=" + $("#hdfvcTab").val();
                }
                else {
                    pagina += "&Cod=" + idsValor + "&Par=" + idsParametro + "&vcTab=" + $("#hdfvcTab").val();
                }

                if (SoloVista) {
                    tab.tabs("add", IdTab, "Datos");
                }
                else {
                    tab.tabs("add", IdTab, "Editar");
                }

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
                    pagina += "?Cod=" + idsValor + "&Par=" + idsParametro + "&vcTab=" + $("#hdfvcTab").val();
                    window.top.$("#skLoading").show();
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
                    pagina += "?Cod=" + idsValor + "&Par=" + idsParametro + "&vcTab=" + $("#hdfvcTab").val();
                    window.top.$("#skLoading").show();
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
            alerta("Seleccione un registro");
        }
    }




    function EliminarRegistro() {
        var idsSel = $("#grid").jqGrid('getGridParam', 'selarrrow');
        if ($(idsSel).length > 0) { EliminarRegistroServidor("Eliminar registro", "¡Atención!, si el registro se encuentra en estado inactivo, se eliminarán de forma permanente, de lo contrario pasará a un estado inactivo. ¿Desea continuar?", idsSel, false); }
        //if ($(idsSel).length > 0) { EliminarRegistroServidor("Eliminar registro", "¡Atención!, se eliminarán de forma permanente los registros que se hayan seleccionado y estén desactivados ¿Desea continuar?", idsSel, false); }
        else { alerta("Seleccione por lo menos un registro"); }
    }


    function LiberarLinea() {
        var idsSel = $("#grid").jqGrid('getGridParam', 'selarrrow');
        if ($(idsSel).length > 0) {
            dialogLiberacion = $("#dvLiberarLinea").dialog({
                title: "Liberar Línea",
                width: 400,
                modal: true,
                resizable: false,
                open: function (event, ui) {
                    window.parent.$("#TabOpciones").scrollTop(0);
                },
                buttons: [
                    {
                        text: "Aceptar",
                        click: EnviarLineasALiberar
                    },
                    {
                        text: "Cancelar",
                        click: function () {
                            $(this).dialog("close");
                        }
                    }
                ]
            });
        }
        //{ LiberarLinea("Liberar Línea", "¡Atención!, se procedera a  de forma permanente los registros que se hayan seleccionado y estén desactivados ¿Desea continuar?", idsSel, false); }
        else { alerta("Debe seleccionar por lo menos un registro"); }
    }

    function EnviarLineasALiberar() {
        var idsSel = $("#grid").jqGrid('getGridParam', 'selarrrow');
        var LibDispositivo = 0;
        var LibEmpleado = 0;

        LibDispositivo = document.getElementById("ChkLiberarDispositivo").checked;
        LibEmpleado = document.getElementById("ChkLiberarEmpleado").checked;
        if (LibDispositivo == false && LibEmpleado == false) {
            alerta("Debe seleccionar por lo menos una opción");
            return;
        }

        LiberarLineaServidor(idsSel, false);
    }

    function CerrarDialog() {
        dialogLiberacion.dialog("close");
    }
    //}

    function CargarParametros(idsSel) {
        var ids = idTabla.split(",");
        var idsParametro = "";
        var idsValor = "";
        var i;
        for (i = 0; i < ids.length; i++) {
            //for (i in ids) {//Ingresa los parametros id, seran las llaves primarias simples o compuestas.
            if (idsParametro != "") {
                idsParametro += ",";
            }
            idsParametro += ids[i];
        }

        for (i = 0; i < idsSel.length; i++) {
            //for (i in idsSel) {//Se ingresa todos los registros seleccionados
            var datos = $("#grid").jqGrid('getRowData', idsSel[i]);
            var valor = "";
            if (idsValor != "") {
                idsValor += "|";
            }
            var j;
            for (j = 0; i < ids.length; i++) {
                //for (j in ids) {
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
                    if ($("#hdfvcTab").val() == 'MOV_Linea') {
                        $("#lblMensajeSubConfirmacion").html("Si la(s) línea(s) seleccionadas se encontraran asignada(s) a un DISPOSITIVO se volverá a asignar el último dispositivo a la(s) línea(s) que estaba asignada antes de haberle dado de Baja. <br />¿Desea continuar?");
                        $('#divMsgSubConfirmacion').dialog({
                            title: Titulo,
                            modal: true,
                            buttons: {
                                "Si": function () {
                                    FuncionActivarRegistro(parametros, Valor);
                                    $(this).dialog("close");
                                },
                                "No": function () {
                                    $(this).dialog("close");
                                }
                            }
                        });
                    }
                    else if ($("#hdfvcTab").val() == 'M_EMPL') {
                        $.ajax({
                            type: "POST",
                            url: "Adm_Lista.aspx/Verificar_LineasRestaurar",
                            data: "{'Ids': '" + parametros[0] + "'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result) {
                                $("#tbLineasRestaurar").html('');
                                if (result.d.length > 0) { //hay lineas a restaurar
                                    $("#dvLineasRestaurar").show();
                                    $("#tbLineasRestaurar").append('<tr><td><b>Empleado<b/></td><td><b>Linea<b/></td><td><b>Dispositivo<b/></td></tr>');
                                    var i;
                                    for (i = 0; i < result.d.length; i++) {
                                        var objLin = result.d[i];
                                        if (objLin.Estado == "True" && objLin.Situacion == "1") { //muestra lineas activas y disponibles
                                            $("#tbLineasRestaurar").append('<tr><td>' + objLin.Empleado + '</td><td>' + objLin.Linea + '</td><td>' + objLin.Dispositivo + '</td></tr>');
                                        }
                                    }
                                    $("#divMsjRestaurarLineas").dialog({
                                        title: "Restaurar líneas",
                                        modal: true,
                                        buttons: {
                                            "Si": function () {
                                                $("#divMsjRestaurarLineas").dialog("close");
                                                FuncionActivarRegistro(parametros, Valor);
                                                MetodoRestaurarLineas(parametros[0]);
                                            },
                                            "No": function () {
                                                $("#divMsjRestaurarLineas").dialog("close");
                                                FuncionActivarRegistro(parametros, Valor);
                                            }
                                        }
                                    });

                                } else {
                                    FuncionActivarRegistro(parametros, Valor);
                                }
                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });
                    }
                    else {
                        FuncionActivarRegistro(parametros, Valor);
                    }

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
            url: "Adm_Lista.aspx/ActivarRegistros",
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
            url: "Adm_Lista.aspx/RestaurarLineasEmpleado",
            data: "{'Ids': '" + ids + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == "0") {
                    alerta("No se pudieron restaurar las líneas de los empleados seleccionados");
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
        else { alerta("Seleccione por lo menos un registro"); }
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
        var i;
        for (i = 0; i < ids.length; i++) {
            //for (i in ids) {
            if (idsParametro != "") {
                idsParametro += ",";
                idsValor += "-";
            }
            idsParametro += ids[i];
            idsValor += datos[ids[i]];
            //for (valor in ValoresPorDefectoId) {
            var valor;
            for (valor = 0; valor < ValoresPorDefectoId; valor++) {
                if ($.trim(ValoresPorDefectoId[valor]) == $.trim(datos[ids[i]])) {
                    alerta("El registro no puede ser eliminado, es un registro del sistema.");
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
                                url: "Adm_Lista.aspx/EliminarRegistro",
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
                                url: "Adm_Lista.aspx/EliminarRegistro",
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
                    url: "Adm_Lista.aspx/EliminarRegistro",
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
                    if ($("#hdfvcTab").val() == 'M_EMPL') {
                        //if (!confirm("- Se liberarán las líneas y dispositivos del empleado que sean del tipo staff.\n- Se darán de baja las líneas y dispositivos que sean del tipo familia.\n- Se darán de baja usuarios asociados.\n\n¿Desea continuar?")) {
                        //    return;
                        //}
                        confirmacion("- Se liberarán las líneas y dispositivos del empleado que sean del tipo staff.<br>- Se darán de baja las líneas y dispositivos que sean del tipo familia.<br>- Se darán de baja usuarios asociados.<br><br>¿Desea continuar?", divMsgConfirmacion_SI, null, "Confirmación");
                    }
                    else {
                        divMsgConfirmacion_SI();
                    }


                    //$(this).dialog("close");
                },
                "Cancelar": function () {
                    $(this).dialog("close");
                }
            }
        });
    }

    function LiberarLineaServidor(idsSel, Valor) {
        var IdTab = "#" + $("#hdfvcTab").val() + "_Tab_Editar";
        var $panel = tab.find(IdTab);
        //var arrcodigo = idsSel.split(",");
        var ids = idTabla.split(",");
        var idsParametro = "";
        var idsValor = "";
        var parametros = CargarParametros(idsSel);
        var LibDispositivo = 0;
        var LibEmpleado = 0;

        LibDispositivo = document.getElementById("ChkLiberarDispositivo").checked;
        LibEmpleado = document.getElementById("ChkLiberarEmpleado").checked;
        //var ValoresPorDefectoId = $("#hdfValorPorDefecto").val().split(",");
        var i;
        for (i = 0; i < idsSel.length; i++) {
            var datos = $("#grid").jqGrid('getRowData', idsSel[i]);
            //for (i in ids) {
            if (idsParametro != "") {
                idsParametro += ",";
                idsValor += "-";
            }
            idsParametro += ids[0];
            idsValor += datos["P_vcNum"];
        }

        dialogLiberacion.dialog("close");

        $.ajax({
            type: "POST",
            url: "Adm_Lista.aspx/LiberarLineasMasivo",
            data: "{'Ids': '" + idsValor + "'," +
                "'vcPar': '" + idsParametro + "'," +
                "'vcTab': '" + $("#hdfvcTab").val() + "'," +
                "'inTipOri': '" + $("#hdfinTipOri").val() + "'," +
                "'vcLiberarDispositivo': '" + LibDispositivo + "'," +
                "'vcLiberarEmpleado':'" + LibEmpleado + "'}", //TipoOrigen
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#grid").trigger("reloadGrid");
                MensajeProceso("Se realizo la respectiva liberación a las líneas seleccionadas.");
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    function DesactivarRegistro() {
        var idsSel = $("#grid").jqGrid('getGridParam', 'selarrrow');
        if ($(idsSel).length > 0) { EliminarRegistroServidor("Desactivar registro", "¡Se desactivarán los registros seleccionados!, ¿Desea continuar?", idsSel, true); }
        else { alerta("Seleccione por lo menos un registro"); }
    }

    function CerroMensajeActivar() {

    }

    function ExportarExcel() {
        pagina += "?vcTab=" + $("#hdfvcTab").val() + "&Detalle=" + $("#ddlBusqueda").val().split("-")[1] + "," + encodeURIComponent(ValorBusqueda()) + "&Valor=" + $('#hdfinTipOri').val() + "&inFilReg=" + FiltroRegistro;
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
            pagina += "?vcTab=" + $("#hdfvcTab").val() + "&Detalle=" + $("#ddlBusqueda").val().split("-")[1] + "," + encodeURIComponent(ValorBusqueda()) + "&Valor=" + $('#hdfinTipOri').val();
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
            pagina += "?vcTab=" + $("#hdfvcTab").val() + "&Detalle=" + $("#ddlBusqueda").val().split("-")[1] + "," + encodeURIComponent(ValorBusqueda()) + "&Valor=" + $('#hdfinTipOri').val();
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
                modal: true,
                resizable: false
            });
        }

    }

    function ConfigurarHistoricos() {
        var id = $("#grid").jqGrid('getGridParam', 'selrow');

        if (id) {
            var datos = $("#grid").jqGrid('getRowData', id);

            var pvcCodigo;

            if ($("#hdfvcTab").val() == "MOV_Linea") {
                titleif = "Histórico de líneas.";
                pvcCodigo = datos.P_vcNum;
            }
            else if ($("#hdfvcTab").val() == "MOV_Dispositivo") {
                titleif = "Histórico de dispositivos.";
                pvcCodigo = datos.P_vcCodIMEI;
            }

            //var $width = 0;
            //var $height = 200;    
            var $Pagina = 'Adm_Historico.aspx?vctab=' + $("#hdfvcTab").val() + "&vcCodigo=" + pvcCodigo;

            $("#ifHistorico").width(1200); // no pasa nada            
            $("#ifHistorico").attr("src", $Pagina);

            if ($("#hdfvcTab").val() == "MOV_Linea") {
                $("#ifHistorico").width(1050);
                $("#ifHistorico").height(500);
                dialogConfCol = $("#dvHistorico").dialog({
                    title: titleif,
                    width: 1050,  //ok
                    height: 510,
                    modal: true,
                    resize: function (event, ui) {
                        try {
                            $("#ifHistorico").width(ui.size.width);
                            $("#ifHistorico").height(ui.size.height);
                        } catch (e) {
                        }
                    }
                    //position: { my: "center", at: "center", of: "#grid" },
                });
            }
            else if ($("#hdfvcTab").val() == "MOV_Dispositivo") {
                $("#ifHistorico").width(1050);
                $("#ifHistorico").height(500);
                dialogConfCol = $("#dvHistorico").dialog({
                    title: titleif,
                    width: 1050,  //ok
                    height: 510,
                    modal: true,
                    resize: function (event, ui) {
                        try {
                            $("#ifHistorico").width(ui.size.width);
                            $("#ifHistorico").height(ui.size.height - 15);
                        } catch (e) {
                        }
                    }
                    //position: { my: "center", at: "center", of: "#grid" },
                });
            }

            else {
                dialogConfCol = $("#dvHistorico").dialog({
                    title: "Configurar historicos",
                    width: 0,
                    height: 0,
                    modal: true
                });
            }
        }
        else {
            alertaExterna("Seleccione un registro");
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

        var i;
        for (i = 0; i < colModels.length; i++) {
            //for (var i =0 in colModels) {
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
                url: "Adm_Lista.aspx/GuardarCaracteristicas",
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

    function UploadPlantilla() {
        //var $width = 550; //Con el td del Subtitulo
        var $width = 450;
        var $height = 110 + 20;

        //$("#ifCargarPlantilla").width($width - 130); //Con el td del Subtitulo
        $("#ifCargarPlantilla").width($width - 30);
        $("#ifCargarPlantilla").height($height - 27);

        if ($("#hdfvcTab").val() == "M_ORGA") {
            dialogConfCol = $("#dvImportacion").dialog({
                title: "Subir Plantilla de Organización",
                width: $width,
                height: $height,
                modal: true,
                resizable: false,
                //position: { my: "center", at: "center", of: "#grid" },
                open: function (event, ui) {
                    window.parent.$("#TabOpciones").scrollTop(0);
                }
            });
        }
        else if ($("#hdfvcTab").val() == "MOV_Plan" || $("#hdfvcTab").val() == "MOV_Cuenta") {
            dialogConfCol = $("#dvImportacion").dialog({
                title: "Subir Plantilla de Importación",
                width: $width,
                height: $height,
                modal: true,
                resizable: false,
            });
        }
        else if ($("#hdfvcTab").val() == "MOV_Linea") {
            $height += 120;

            $("#ifCargarPlantilla").height($height - 27);
            dialogConfCol = $("#dvImportacion").dialog({
                title: "Subir Plantilla de Importación - Líneas",
                width: $width,
                height: $height,
                modal: true,
                resizable: false,
            });
        }
    }

    function DownloadPlantilla() {

        var $width = 530;
        var $height = 170;

        if ($("#hdfvcTab").val() == "M_ORGA" || $("#hdfvcTab").val() == "MOV_Linea" || $("#hdfvcTab").val() == "MOV_Plan" || $("#hdfvcTab").val() == "MOV_Cuenta") {
            dialogConfCol = $("#dvTipoDownload").dialog({
                //title: "Descargar Plantilla de Organización",
                title: "Descargar Plantilla de Importación",
                width: $width,
                height: $height,
                modal: true,
                resizable: false,
                open: function (event, ui) {
                    window.parent.$("#TabOpciones").scrollTop(0);
                }
            });
        }
    }


    function ClosePlantilla() {
        dialogConfCol.dialog("close");
        $('[id*=rbtnTipoDescarga] :radio[value="1"] ').prop('checked', false);
        $('[id*=rbtnTipoDescarga] :radio[value="2"] ').prop('checked', false);
        $("#ddlNiveles").val("-1");
        $("#trNivel").css("display", "none");
    }

    function DescargarPlantilla() {
        
        var valor = $("input[name='rbtnTipoDescarga']:checked").val();
        var inNiv = $("#ddlNiveles").val();

        if ($("#hdfvcTab").val() == "M_ORGA") {
            if (valor == "1") {
                if (inNiv == "-1") {
                    alerta("Debe seleccionar el Nivel que deseas que muestre la plantilla RRHH a descargar.");
                    $("#ddlNiveles").focus();
                    return;
                }
            } else if (valor == undefined) {
                alerta("Debe escoger el tipo de descarga.");
                return;
            }
        } else {
            if (valor == undefined) {
                alerta("Debe escoger el tipo de descarga.");
                return;
            }
        }

        $("#lblMsgDownlaod").show();
        if ($("#hdfvcTab").val() != "M_ORGA") {
            $("#lblMsgDownlaod").text("Se prodecerá a descargar la Plantilla Importación.");
        }
        $("#MsgConfirmacionDownloadPlantilla").dialog({
            title: "Confirmación",
            modal: true,
            buttons: {
                "Si": function () {
                    $(this).dialog("close");

                    if ($("#hdfvcTab").val() == "M_ORGA") {
                        $.ajax({
                            type: "POST",
                            url: "Adm_Lista.aspx/DescargarPlantillaRRHH",
                            data: "{'tipDescarga':'" + valor + "'," +
                                "'inNiv':'" + inNiv + "'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result) {
                                if (result.d != "0") {
                                    BloquearPagina(true);

                                    window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + result.d);
                                    ClosePlantilla();
                                    BloquearPagina(false);
                                } else {
                                    alerta("ha ocurrido un error al intentar descargar la platilla.");
                                }
                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });
                    }

                    if ($("#hdfvcTab").val() == "MOV_Linea") {
                        $.ajax({
                            type: "POST",
                            url: "Adm_Lista.aspx/DescargarPlantillaLineas",
                            data: "{'tipDescarga':'" + valor + "'," +
                                "'inNiv':'" + inNiv + "'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result) {
                                if (result.d != "0") {
                                    BloquearPagina(true);
                                    //alert(result.d);
                                    window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + result.d);
                                    ClosePlantilla();
                                    BloquearPagina(false);
                                } else {
                                    alerta("ha ocurrido un error al intentar descargar la platilla.");
                                }
                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });
                    }
                    if ($("#hdfvcTab").val() == "MOV_Plan" || $("#hdfvcTab").val() == "MOV_Cuenta") {
                        $.ajax({
                            type: "POST",
                            url: "Adm_Lista.aspx/DescargarPlantillaCuentas_Planes",
                            data: "{'tipDescarga':'" + valor + "'," +
                                "'strTab':'" + $('#hdfvcTab').val() + "'," + //Tabla
                                "'inNiv':'" + inNiv + "'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result) {
                                if (result.d != "0") {
                                    BloquearPagina(true);
                                    //alert(result.d);
                                    window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + result.d);
                                    ClosePlantilla();
                                    BloquearPagina(false);
                                } else {
                                    alerta("ha ocurrido un error al intentar descargar la platilla.");
                                }
                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });
                    }


                },
                "No": function () {
                    $(this).dialog("close");
                }
            },
            resizale: false
        });
    }

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

    $("#btnFormatos , #ulListaFormatos").hover(function () {
        $("#ulListaFormatos").hide();
        $("#ulListaFormatos").show().position({
            my: "left top",
            at: "left bottom",
            of: $("#btnFormatos")[0]
        });
    }, function () {
        $("#ulListaFormatos").hide();
    });

    $("#btnConfigurarFiltroRegistro , #dvFiltroRegistro").hover(function () {
        $("#dvFiltroRegistro").hide();
        $("#ulListaReportes").hide();
        $("#ulListaFormatos").hide();
        $("#dvFiltroRegistro").show().position({
            my: "left top",
            at: "left bottom",
            of: $("#btnConfigurarFiltroRegistro")[0]
        });

    }, function () {
        $("#dvFiltroRegistro").hide();
    });

    function CerroMensaje() { }

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

    $("#rbtnTipoDescarga").change(function () {
        var valor = $("input[name='rbtnTipoDescarga']:checked").val();
        if (valor == "2") {
            $("#trNivel").css("display", "none");
        }
        else if (valor == "1") {
            if ($("#hdfvcTab").val() == "M_ORGA") {
                $("#trNivel").css("display", "");
            } else {
                $("#trNivel").css("display", "none");
            }
        }
    });

    function BuscarGrilla() {
        //$("#txtBusqueda").val($("#txtBusqueda").val());
        vcBusqueda = $("#txtBusqueda").val().replace(/'/g, "&#39").replace(/\\/g, "&#92");
        var activo;
        var desactivo;
        var verdadero;
        var falso;
        if (vcBusqueda != "") {
            if ($("#ddlBusqueda").val().split("-")[1] == $('#hdfElim').val()) {
                activo = $('#hdfActivo').val();
                desactivo = $('#hdfDesactivo').val();

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
            else if ($("#ddlBusqueda").val().split("-")[1] == "btVigEmp") {
                activo = $('#hdfActivo').val();
                desactivo = $('#hdfDesactivo').val();

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
            else if ($("#ddlBusqueda").val().split("-")[1] == "btSopLin") {
                verdadero = $('#hdfVer').val();
                falso = $('#hdfFal').val();

                if (verdadero.toLowerCase().indexOf(vcBusqueda.toLowerCase()) > -1 && falso.toLowerCase().indexOf(vcBusqueda.toLowerCase()) == -1) {
                    vcBusqueda = "1";

                }
                else if (verdadero.toLowerCase().indexOf(vcBusqueda.toLowerCase()) == -1 && falso.toLowerCase().indexOf(vcBusqueda.toLowerCase()) > -1) {
                    vcBusqueda = "0";
                }
                else if (verdadero.toLowerCase().indexOf(vcBusqueda.toLowerCase()) > -1 && falso.toLowerCase().indexOf(vcBusqueda.toLowerCase()) > -1) {
                    vcBusqueda = "";
                }
                else if (verdadero.toLowerCase().indexOf(vcBusqueda.toLowerCase()) == -1 && falso.toLowerCase().indexOf(vcBusqueda.toLowerCase()) == -1) {
                    vcBusqueda = "$";
                }
            }
            else {
                var campos = $("#hdfCampBool").val();
                var lstCampos = campos.split(",");
                activo = $('#hdfVerdadero').val();
                desactivo = $('#hdfFalso').val();

                $(lstCampos).each(function () {
                    if ($("#ddlBusqueda").val().split("-")[1] == this) {
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

        if ($("#txtBusqueda").hasClass("txtBusqueda") && $.trim($("#txtBusqueda") != "")) {
            return "";
        }
        else {
            var TipoDato = "";
            if ($("#ddlBusqueda").val() != undefined) {
                TipoDato = $("#ddlBusqueda").val().split("-")[0];
            }

            if (TipoDato == "3" || TipoDato == "2") {
                var FechaBusqueda = $("#txtBusqueda").val();
                var FechaBusqueda2 = $("#txtBusqueda2").val();
                vcBusqueda = FechaBusqueda.substr(6, 4).toString() + FechaBusqueda.substr(3, 2).toString() + FechaBusqueda.substr(0, 2).toString();

                if ($("#txtBusqueda2").val() != "") {
                    vcBusqueda = vcBusqueda + ' ' + FechaBusqueda2.substr(6, 4).toString() + FechaBusqueda2.substr(3, 2).toString() + FechaBusqueda2.substr(0, 2).toString();
                }

                return vcBusqueda;
            }
            else {
                return vcBusqueda;
            }
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
        var TipoDato = $("#ddlBusqueda").val().split("-")[0];
        if (TipoDato == "3" || TipoDato == "2") {
            $("#txtBusqueda").addClass("txtFecha");
            $("#txtBusqueda").removeClass("txtBusqueda");
            $("#txtBusqueda2").addClass("txtFecha2");
            $("#tdfiltro2").show();
            $("#txtBusqueda").css('width', 70);
            $("#tdfiltro").css('width', 165);
            $("#lblfitxtfiltro").html("Desde");

            fnInstanciarFecha();
        }
        else {
            $("#txtBusqueda").addClass("txtBusqueda");
            $("#txtBusqueda").removeClass("txtFecha");
            $('#txtBusqueda').datepicker("destroy");
            $("#txtBusqueda").css('width', 140);
            $("#tdfiltro").css('width', 220);
            $("#lblfitxtfiltro").html("Filtrar");
            $("#tdfiltro2").hide();

        }

        $("#txtBusqueda").val("");
        $("#txtBusqueda").val(asInitVals[0]);
        $("#txtBusqueda").focus();
        $("#txtBusqueda2").val("");

    });


    function fnInstanciarFecha() {

        $(".txtFecha").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: 'dd/mm/yy',
            onSelect: function (dateText, inst) {
                $("#txtBusqueda").removeClass("txtBusqueda");
                $("#txtBusqueda").val(dateText);
                $("#txtBusqueda2").val("");
                BuscarGrilla();
            }
        });

        $(".txtFecha2").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: 'dd/mm/yy',
            onSelect: function (dateText, inst) {
                $("#txtBusqueda2").removeClass("txtBusqueda");


                if ($("#txtBusqueda").val() == "") {
                    $("#txtBusqueda2").val("");

                }
                else {

                    $("#txtBusqueda2").val(dateText);
                    BuscarGrilla();
                }

            }
        });
    }



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
    }
    function ReportesDinamicos() {
        var Id = "#" + $("#hdfvcTab").val() + "_Tab_" + IdOpcion;

    }
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

    $(".aReporte").click(function () {
        pagina = $(this).attr("URL") + "&inEstado=" + FiltroRegistro + "&vcCampoFiltro=" + $("#ddlBusqueda").val().split("-")[1] + "&vcDescFiltro=" + ValorBusqueda();
        var Id;
        if (pagina == "../../P_Movil/Consultar/Con_CriteriosReporte.aspx?vcTipRep=4&vcTab=MOV_Dispositivo" && $("#hdfvcTab").val() == "MOV_Dispositivo") {
            Id = "#" + $("#hdfvcTab").val() + "_Tab_CriteriosReporteDispositivo";
            Titulo = $(this).html();
            AbrirTab(Id);
        }
        else if (pagina == "../../P_Movil/Consultar/Con_CriteriosReporte.aspx?vcTipRep=5&vcTab=MOV_Linea" && $("#hdfvcTab").val() == "MOV_Linea") {
            Id = "#" + $("#hdfvcTab").val() + "_Tab_CriteriosReporteLinea";
            Titulo = $(this).html();
            AbrirTab(Id);
        }
        else {
            Id = "#" + $("#hdfvcTab").val() + "_Tab_" + $(this).attr("idTab");
            Titulo = $(this).html();
            AbrirTab(Id);
        }

        $("#ulListaReportes").hide();
    });


    inicioPagina();

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
        window.top.$("#skLoading").show();
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
        $(Id).css("height", "93%");
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
        $(Id).css("height", "93%");
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

    ArrayPaginacion.push(inFilas);
    ArrayPaginacion.push(inFilas + inFilas);
    ArrayPaginacion.push(inFilas + inFilas + inFilas);
}

function CargarNombreArchivo(Archivo, RutaCompleta) {
    if ($("#hdfvcTab").val() == "M_ORGA") {
        $("#hdfArchivo").val(Archivo);
        $("#hdfRutaCompleta").val(RutaCompleta);
        $("#lblArchivoCargado").html(Archivo);

        var Metodo = raiz("Common/Page/Adm_Lista.aspx/CargarArchivo");
        var Data = {
            pruta: RutaCompleta
        };

        MetodoWeb(Metodo, JSON.stringify(Data), SatisfactoriaCargarArchivo);
    } else {
        $("#hdfArchivo").val(Archivo);
        $("#hdfRutaCompleta").val(RutaCompleta);
        $("#lblArchivoCargado").html(Archivo);

        var Metodo = raiz("Common/Page/Adm_Lista.aspx/CargarArchivoPlantillaImportacion");
        var Data = {
            pruta: RutaCompleta,
            //prutaImages: 
            vcTab: $("#hdfvcTab").val()
        };

        MetodoWeb(Metodo, JSON.stringify(Data), SatisfactoriaCargarArchivoImportacion);
    }
}

function CargarArchivoParentFactura_Import_LineasImages(Archivo, RutaCompleta, ArchivoImages, RutaCompletaImages) {
    var Metodo = raiz("Common/Page/Adm_Lista.aspx/CargarArchivoPlantillaImportacion_Images");
    var Data = {
        pruta: RutaCompleta,
        prutaImages: RutaCompletaImages
    };

    MetodoWeb(Metodo, JSON.stringify(Data), SatisfactoriaCargarArchivoImportacion);
}


function SatisfactoriaCargarArchivo(Datos) {
    if (Datos != null && Datos == '-1') {
        alerta('El contenido del archivo no es correcto.<br>Verifique y suba un archivo de acuerdo al proporcionado en la plantilla.');
        BloquearPagina(false);
        return;
    }
    else {
        alerta('Se ha creado una cola de actualización para continuar con el proceso de importaci&oacute;n.<br>La informaci&oacute;n se visualizar&aacute; en unos instantes.<br><b>SI USTED EST&Aacute; ASOCIANDO USUARIOS Y EMPLEADOS, ES NECESARIO QUE CIERRE SESI&Oacute;N LUEGO DE FINALIZAR LA IMPORTACI&Oacute;N.</b>',
            "Importaci&oacute;n Organizaci&oacute;n", function () { }, "warning", 10000);
    }

    BloquearPagina(false);
    dialogConfCol.dialog("close");
}

function SatisfactoriaCargarArchivoImportacion(Datos) {
    if (Datos != null && Datos == '-1') {
        alerta('El contenido del archivo no es correcto.<br>Verifique y suba un archivo de acuerdo al proporcionado en la plantilla.');
        BloquearPagina(false);
        return;
    }
    else {
        alerta('Se ha creado una tarea para el proceso de importaci&oacute;n de líneas.<br>La informaci&oacute;n se visualizar&aacute; en unos instantes en el visor de tareas.');
    }

    BloquearPagina(false);
    dialogConfCol.dialog("close");
}

function ConfigurarFiltroRegistro() { }

function LiberarDispositivo(tipo) {
    var idsSel = $("#grid").jqGrid('getGridParam', 'selarrrow');
    if ($(idsSel).length > 0) {
        dialogLiberacion = $("#dvLiberarDispositivo").dialog({
            title: "Liberar Dispositivo",
            width: 400,
            modal: true,
            resizable: false,
            open: function (event, ui) {
                window.parent.$("#TabOpciones").scrollTop(0);
            },
            buttons: [
                {
                    text: "Aceptar",
                    click: function () {
                        if (tipo == 'individual') {
                            LiberarDispositivoServidor($("#hdfDispositivo").val());
                        } else {
                            EnviarDispositivosALiberar();
                        }
                    }
                },
                {
                    text: "Cancelar",
                    click: function () {
                        $(this).dialog("close");
                    }
                }
            ]
        });
    } else {
        alerta("Debe seleccionar por lo menos un registro");
    }
}

function EnviarDispositivosALiberar() {
    var idsSel = $("#grid").jqGrid('getGridParam', 'selarrrow');
    var LibLinea = 0;
    var LibEmpleado = 0;
    LibLinea = document.getElementById("chkLiberarLinea_deDispositivo").checked;
    LibEmpleado = document.getElementById("chkLiberarEmpleado_deDispositivo").checked;
    if (LibLinea == false && LibEmpleado == false) {
        alerta("Debe seleccionar por lo menos una opción");
        return;
    }

    var idsValor = [];
    var i;
    for (i = 0; i < idsSel.length; i++) {
        var datos = $("#grid").jqGrid('getRowData', idsSel[i]);
        idsValor.push(datos["P_vcCodIMEI"]);
    }

    LiberarDispositivoServidor(idsValor);
}

function LiberarDispositivoServidor(idsSeleccionados) {
    var LibEmpleado = 0;
    var LibLinea = 0;
    var detalleLiberacion = [];
    LibEmpleado = document.getElementById("chkLiberarEmpleado_deDispositivo").checked;
    LibLinea = document.getElementById("chkLiberarLinea_deDispositivo").checked;
    if (LibLinea) detalleLiberacion.push(tab.tabs("length") > 1 ? "línea" : "líneas");
    if (LibEmpleado) detalleLiberacion.push(tab.tabs("length") > 1 ? "empleado" : "empleados");
    dialogLiberacion.dialog("close");

    $.ajax({
        type: "POST",
        url: "Adm_Lista.aspx/LiberarDispositivosMasivo",
        data: JSON.stringify({
            Ids: idsSeleccionados.join("-"),
            inTipOri: $("#hdfinTipOri").val(),
            vcLiberarEmpleado: LibEmpleado,
            vcLiberarLinea: LibLinea
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#grid").trigger("reloadGrid");

            if (tab.tabs("length") > 1) {
                tab.tabs("remove", tab.tabs("option", "selected"));
                MensajeProceso("El dispositivo ha sido liberado de su " + detalleLiberacion.join(" y ") + ".");
            } else {
                MensajeProceso("Los dispositivos seleccionados han sido liberados de sus " + detalleLiberacion.join(" y ") + ".");
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function MensajeProceso(Mensaje) {
    $("#lblAviso").html(Mensaje);
    $('#divAviso').dialog({
        title: "Aviso",
        modal: true,
        width: 270,
        resizable: false,
        closeOnEscape: false
    });
    document.getElementById("ChkLiberarDispositivo").checked = false;
    document.getElementById("ChkLiberarEmpleado").checked = false;
    document.getElementById("chkLiberarEmpleado_deDispositivo").checked = false;
    document.getElementById("chkLiberarLinea_deDispositivo").checked = false;
}
