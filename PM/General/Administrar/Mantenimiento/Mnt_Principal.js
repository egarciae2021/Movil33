var CargoDependencia = true;
var CargoDetalle = true;
var Areas;
var Empleados;
var Lineas;
var mygrid;
var mygridResAre;
var mygrid_LineaDispositivo;
var tree;
var grid;
var idTree = "-1";
var idGrilla = "-1";
var ListadoEmpleados = "";
var IdEmpleadoTree = "";
var buscarValor = '';
var buscarValor2 = '';
var tieneMultipleArea = false;
var CamposCabeceraGrillaResponsable = "";

function area(P_inCodOrg, vcNomOrg) {
    this.P_inCodOrg = P_inCodOrg;
    this.vcNomOrg = vcNomOrg;
}
function empleado(P_vcCod, vcNom) {
    this.P_vcCod = P_vcCod;
    this.vcNom = vcNom;
}
function linea(P_vcNum) {
    this.P_vcNum = P_vcNum;
    this.Empleado = new empleado();
}

function fnEmpleado_click(objSpan) {

    var Titulo = '';
    var Pagina = '';
    var $width = 850; // 650;
    var $height = 550; //  480;

    if (objSpan != null) {
        var CodigoEmpleado = $(objSpan).attr("codigo");
        var NombreEmpleado = $(objSpan).attr("nombreempleado");
        Pagina = raiz('General/Administrar/Mantenimiento/Mnt_Empleado.aspx?view=1&Par=EMPL_P_vcCODEMP&Cod=' + CodigoEmpleado);
        Titulo = 'Empleado - ' + NombreEmpleado;
    }
    else {
        Pagina = raiz('General/Administrar/Mantenimiento/Mnt_Empleado.aspx?view=1&Par=EMPL_P_vcCODEMP&CodInt=' + tree.getSelectedItemId());
        Titulo = 'Nuevo Empleado';
    }

    window.top.fnObtenerWindowPlantillaTab().$("#dvCargando").show();
    window.top.fnObtenerWindowPlantillaTab().$('#iframe_modal').width($width - 10);
    window.top.fnObtenerWindowPlantillaTab().$('#iframe_modal').height($height - 30);
    window.top.fnObtenerWindowPlantillaTab().$('#iframe_modal').attr('src', Pagina);
    //window.top.fnObtenerWindowPlantillaTab().$('#iframe_modal').hide();

    //var dlgOrganizacion = window.top.$('#div_modal').dialog({
    //var dlgOrganizacion = window.top.$("iframe[src*='PlantillaTab.aspx']")[0].contentWindow().$('#div_modal').dialog({
    var dlgOrganizacion = window.top.fnObtenerWindowPlantillaTab().$('#div_modal').dialog({
        title: Titulo,
        width: $width,
        height: $height,
        modal: true,
        resizable: false
    });

    //Llamada para actualizar el listado de empleados...
    window.top.fnObtenerWindowPlantillaTab().fnRetornaFrameModalOrigen = fnRetornaModal;

}

function fnRetornaModal() {
    fnBuscarEmpleados_TextBox();
}

function mygrid_click(id) {
    //Obtener codigo de empleado...
    var idDetalle = mygrid.getSelectedId();
    if (idDetalle == null) {
        return;
    }
    var ListadoID = idDetalle.split(",");
    var CodEmpleado = "";
    var NombreEmpleado = "";
    for (i = 0; i < ListadoID.length; i++) {
        CodEmpleado = mygrid.cells(ListadoID[i], 0).getValue().split('codigo="')[1].split('"')[0];
        NombreEmpleado = mygrid.cells(ListadoID[i], 1).getValue();
        break;
    }
    if (CodEmpleado != "") {
        //Mostrar titulo Empleado...
        $("#dv_EtiquetaEmpleado").html("Empleado : '" + NombreEmpleado + "'");
        //Cargar las lineas y dispositivos del empleado...
        fnCargarLineasDipositivosEmpleado($("#hdfCodOrgaSeleccionado").val(), $('#chkIncluirDependencia').is(':checked'), 4,
            CodEmpleado, 1, $('#chkEmpleadoLineaDispositivo').is(':checked')); //¨Para Lineas

        fnCargarLineasDipositivosEmpleado_Dispositivo($("#hdfCodOrgaSeleccionado").val(), $('#chkIncluirDependencia').is(':checked'), 4,
            CodEmpleado, 2, $('#chkEmpleadoLineaDispositivo').is(':checked')); //¨Para Dispositivos

        //if ($("#hdfRemoverAnexo").val() == "true") { fnCargarAnexos($("#hdfCodOrgaSeleccionado").val(), $('#chkIncluirDependencia').is(':checked'), 4, CodEmpleado); }
        //if ($("#hdfRemoverCodigo").val() == "true") { fnCargarCodigos($("#hdfCodOrgaSeleccionado").val(), $('#chkIncluirDependencia').is(':checked'), 4, CodEmpleado); }
    }
}

var tabInformativo;
var EmpleadoSeleccionado;
var tabTipos;

var NivelMaximoOrganizacion = 0;
$(function () {

    var MaximoNivel = $("#hfMaximoNivel").val();
    for (var i = MaximoNivel; i > 0; i--) {
        $('#cboNivelMaximo')
            .append($("<option></option>")
                .attr("value", i.toString())
                .text(i.toString()));
    }
    NivelMaximoOrganizacion = $("#hfMaximoNivelConfigurado").val();
    if (NivelMaximoOrganizacion == null ||
        NivelMaximoOrganizacion == "" ||
        NivelMaximoOrganizacion == "0") {
        NivelMaximoOrganizacion = MaximoNivel;
    }
    else {
        $("#cboNivelMaximo").val(NivelMaximoOrganizacion);
    }
    $("#cboNivelMaximo").change(function (e) {
        NivelMaximoOrganizacion = $("#cboNivelMaximo").val();
        tree.deleteChildItems('001');
        mygrid.clearAll();
        GrabarNivelMaximo();
        CargarDependecia(true);
    });

    $("#ActualizarGeneral").click(function () {
        location.reload(true);
    });

    $("#tabInformativo").append('<div id="dv_EtiquetaEmpleado" class="CerrarTodosTabs" title="" width="250px" style="font-weight:bold;color:#FFFFFF;right: 8px; top: 8px; position: absolute; height: 4px !important;"></div>');

    $("#dv_EtiquetaEmpleado").html('(Seleccione un empleado)');

    $('#txtBuscarEmpleado').live("keydown", function (e) {
        if (e.which == 13) {
            fnBuscarEmpleados_TextBox();
            return false; //prevent the button click from happening
        }
    });

    $('#btnAgregarEmpleado').live("click", function (e) {
        fnEmpleado_click(null);
    });

    tabInformativo = $("#tabInformativo").tabs({
        //        select: function (event, ui) {
        //            //var tabSeleccionado = ui.index;
        //            var idTabSeleccionado = ui.panel.id
        //            
        //            if (idTabSeleccionado =="tbResponsable")
        //                $('#ddlEstadoAprobacion').prop('disabled', true);
        //            else if (idTabSeleccionado == "tbUmbralAprobacion")
        //                $('#ddlEstadoAprobacion').prop('disabled', true);
        //            else
        //                $('#ddlEstadoAprobacion').prop('disabled', false);
        //        }
    });
    tabTipos = $("#tabTipos").tabs({});


    //    $("body").css("overflow", "hidden");
    $("#txtArea").keypress(ValidarAlfaNumericoConEspacios);
    Inicial();

    function Inicial() {
        var Ancho = $(window).width();
        var Alto = $(window).height() - 20;
        $("#dvOrganizacion").css({ height: Alto - 128, width: 400 });
        $("#gridbox_LineaDispositivo").css({ width: Ancho - 458, height: 240 });
        $("#gridbox_LineaDispositivo_D").css({ width: Ancho - 458, height: 240 });
        $("#gridbox_Anexos").css({ width: Ancho - 458, height: 240 });
        $("#gridbox_Codigo").css({ width: Ancho - 458, height: 240 });
        $("#txtArea").css({ width: 283 });
        $("#gdResponsable").css({ height: Alto - 93 });

        //jherrera - 20150227: nueva funcionalidad "Repsonsable de Área"
        $("#tabTipos").css({ width: Ancho - 454 });
        $("#gridbox").css({ height: Alto - 360, width: Ancho - 456 });
    }

    $(window).resize(function () {
        DimPosElementos();
    });
    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height() - 20;
        $("#dvOrganizacion").css({ height: Alto - 128, width: 400 });
        $("#gridbox_LineaDispositivo").css({ width: Ancho - 458, height: 230 });
        $("#gridbox_LineaDispositivo_D").css({ width: Ancho - 458, height: 230 });
        $("#gridbox_Anexos").css({ width: Ancho - 458, height: 240 });
        $("#gridbox_Codigo").css({ width: Ancho - 458, height: 240 });
        $("#txtArea").css({ width: 283 });
        $("#gdResponsable").css({ height: Alto - 93 });

        //jherrera - 20150227: nueva funcionalidad "Repsonsable de Área"
        $("#tabTipos").css({ width: Ancho - 454 });
        $("#gridbox").css({ height: Alto - 360, width: Ancho - 456 });
    }
    //DimPosElementos();

    $('#txtArea').live("keydown", function (e) {
        if (e.which == 13) {
            BuscarAreaEmpleado($('#txtArea').val(), $('input:radio[name=rblBusqueda]:checked').val());
            return false; //prevent the button click from happening
        }
    });

    $('#dvOrganizacion').live("click", function (e) {
        BusquedaManual = 1;
    });


    $(".btnNormal").button({});

    var tabOpciones = $("#TabOpciones").tabs({});
    var BusquedaManual = 1;
    inicio();
    if ($("#hdfRemoverAnexo").val() == "false") {
        RemoveTab_Estructura("tbAnexos");
    }
    if ($("#hdfRemoverCodigo").val() == "false") {
        RemoveTab_Estructura("tbCodigos");
    }
    var nodos;

    function getMetaData(id) {
        if (tree.getUserData(id, "c0")) {
            //alerta("Sales dynamic is: " + tree.getUserData(id, "c0") + "\nPrice is: " + (tree.getUserData(id, "c3") || "na"));
        }
    }

    function inicio() {
        CamposCabeceraGrillaResponsable = $("#hdfCamposTablaResponsable").val();
        let vcSetInitWidths = "100,*,*,*";
        let vcSetColAlign = "left,left,left,left,";
        let vcSetColTypes = "ro,ro,ro,ro";
        let vcSetColSorting = "str,str,str,str";

        if (CamposCabeceraGrillaResponsable.split(",").length >= 5) {
            vcSetInitWidths = "100,*,*,*,*";
            vcSetColAlign = "left,left,left,left,left,";
            vcSetColTypes = "ro,ro,ro,ro,ro";
            vcSetColSorting = "str,str,str,str,str";
        }


        var hdfObtieneMO360 = window.top.hdfObtieneMO360.value;

        tree = new dhtmlXTreeObject("dvOrganizacion", "100%", "100%", 0);
        tree.setImagePath("../../../Common/Images/Controles/dhtmlx/TreeView/");
        tree.setOnClickHandler(CargarDependecia);
        if (hdfObtieneMO360 == "0") {
            tree.setDragHandler(tondrag);
            tree.enableDragAndDrop(true);
        }

        //Definicion Grilla de Empleados ****************************************************************
        mygrid = new dhtmlXGridObject('gridbox');
        mygrid.selMultiRows = true;
        mygrid.setImagePath("../../../Common/Scripts/dhtmlxGrid/codebase/imgs/");
        mygrid.setHeader("Código,Nombre Empleado,Sucursal,Centro de Costo, Área");
        mygrid.setInitWidths("100,*,*,*,*");
        //mygrid.enableAutoWidth(true); 
        mygrid.setColAlign("left,left,left,left,left,");
        mygrid.setColTypes("ro,ro,ro,ro,ro");
        mygrid.setColSorting("str,str,str,str,str");
        if (hdfObtieneMO360 == "0") {
            mygrid.setMultiLine(true);
            mygrid.enableDragAndDrop(true);
        }
        mygrid.init();
        mygrid.setSkin("dhx_skyblue");
        mygrid.attachEvent("onSelectStateChanged", mygrid_click);

        mygrid.gridToTreeElement = function (treeObj, treeNodeId, gridRowId) {
            return this.cells(gridRowId, 1).getValue() + "/" + this.cells(gridRowId, 2).getValue();
        };
        mygrid.rowToDragElement = function (id) {
            if (this.cells(id, 0).getValue() != "") {
                return this.cells(id, 0).getValue() + "/" + this.cells(id, 1).getValue();
            }
            return this.cells(id, 0).getValue();
        };
        //***********************************************************************************************

        //JHERRERA 20150227: Nueva funcionalidad
        //Definicion Grilla de Responsable de Área ******************************************************
        //debugger;
        mygridResAre = new dhtmlXGridObject('gdResponsable');
        mygridResAre.selMultiRows = false;
        mygridResAre.setImagePath("../../../Common/Scripts/dhtmlxGrid/codebase/imgs/");
        mygridResAre.setHeader(CamposCabeceraGrillaResponsable);
        mygridResAre.setInitWidths(vcSetInitWidths);
        mygridResAre.setColAlign(vcSetColAlign);
        mygridResAre.setColTypes(vcSetColTypes);
        mygridResAre.setColSorting(vcSetColSorting);
        if (hdfObtieneMO360 == "0") {
            mygridResAre.setMultiLine(true);
            mygridResAre.enableDragAndDrop(false);
        }
        mygridResAre.init();
        mygridResAre.setSkin("dhx_skyblue");
        //mygrid.attachEvent("onSelectStateChanged", mygrid_click);

        mygridResAre.gridToTreeElement = function (treeObj, treeNodeId, gridRowId) {
            return this.cells(gridRowId, 1).getValue() + "/" + this.cells(gridRowId, 2).getValue();
        };
        mygridResAre.rowToDragElement = function (id) {
            if (this.cells(id, 0).getValue() != "") {
                return this.cells(id, 0).getValue() + "/" + this.cells(id, 1).getValue();
            }
            return this.cells(id, 0).getValue();
        };
        //debugger;
        //***********************************************************************************************
        //Definicion Grilla de Lineas ***************************************************
        mygrid_LineaDispositivo = new dhtmlXGridObject('gridbox_LineaDispositivo');
        //mygrid_LineaDispositivo.selMultiRows = true;
        mygrid_LineaDispositivo.setImagePath("../../../Common/Scripts/dhtmlxGrid/codebase/imgs/");
        //mygrid_LineaDispositivo.setHeader("Tipo Línea,Línea,Empleado,Plan,Inicio Contrato,Meses Contrato");
        mygrid_LineaDispositivo.setHeader("Línea,Empleado,Plan,Inicio Contrato,Meses Contrato");
        //mygrid_LineaDispositivo.setInitWidths("50,65,190,120,55,55");
        mygrid_LineaDispositivo.setInitWidths("100,250,180,*,*,50");
        mygrid_LineaDispositivo.setColAlign("left,right,left,left,right,right,");
        mygrid_LineaDispositivo.setColTypes("ro,ro,ro,ro,ro,ro");
        mygrid_LineaDispositivo.setColSorting("str,str,str,str,str,str");
        mygrid_LineaDispositivo.init();
        mygrid_LineaDispositivo.setSkin("dhx_skyblue");
        //***********************************************************************************************
        //Definicion Grilla de Dispositivos ***************************************************
        mygrid_LineaDispositivo_D = new dhtmlXGridObject('gridbox_LineaDispositivo_D');
        //mygrid_LineaDispositivo.selMultiRows = true;
        mygrid_LineaDispositivo_D.setImagePath("../../../Common/Scripts/dhtmlxGrid/codebase/imgs/");
        //mygrid_LineaDispositivo_D.setHeader("Tipo Línea,Línea,IMEI,Modelo,Empleado,Plan,Inicio Contrato,Meses Contrato");
        mygrid_LineaDispositivo_D.setHeader("IMEI,Modelo,Empleado,Línea");

        //mygrid_LineaDispositivo_D.setInitWidths("105,300,190,65");
        mygrid_LineaDispositivo_D.setInitWidths("105,*,*,*");
        mygrid_LineaDispositivo_D.setColAlign("right,left,left,left");
        mygrid_LineaDispositivo_D.setColTypes("ro,ro,ro,ro");
        mygrid_LineaDispositivo_D.setColSorting("str,str,str,str");
        mygrid_LineaDispositivo_D.init();
        mygrid_LineaDispositivo_D.setSkin("dhx_skyblue");
        //***********************************************************************************************

        //if ($("#hdfRemoverAnexo").val() == "true") {
        //    //RRAMOS_20151125
        //    //Definicion Grilla de Extensiones(Anexos) ***************************************************
        //    mygrid_Anexos = new dhtmlXGridObject('gridbox_Anexos');
        //    mygrid_Anexos.setImagePath("../../../Common/Scripts/dhtmlxGrid/codebase/imgs/");
        //    mygrid_Anexos.setHeader("Anexo,Sucursal,Empleado,Estado");
        //    mygrid_Anexos.setInitWidths("100,*,*,*");
        //    mygrid_Anexos.setColAlign("left,left,left,left,");
        //    mygrid_Anexos.setColTypes("ro,ro,ro,ro");
        //    mygrid_Anexos.setColSorting("str,str,str,str");
        //    mygrid_Anexos.setMultiLine(true);
        //    mygrid_Anexos.enableDragAndDrop(false);
        //    mygrid_Anexos.init();
        //    mygrid_Anexos.setSkin("dhx_skyblue");
        //    //***********************************************************************************************
        //    //Definicion Grilla de Codigos ***************************************************
        //}
        //if ($("#hdfRemoverCodigo").val() == "true") {
        //    mygrid_Codigo = new dhtmlXGridObject('gridbox_Codigo');
        //    //mygrid_LineaDispositivo.selMultiRows = true;
        //    mygrid_Codigo.setImagePath("../../../Common/Scripts/dhtmlxGrid/codebase/imgs/");
        //    mygrid_Codigo.setHeader("Código,Sucursal,Empleado,Estado");
        //    mygrid_Codigo.setInitWidths("100,*,*,*");
        //    mygrid_Codigo.setColAlign("left,left,left,left,");
        //    mygrid_Codigo.setColTypes("ro,ro,ro,ro");
        //    mygrid_Codigo.setColSorting("str,str,str,str");
        //    mygrid_Codigo.setMultiLine(true);
        //    mygrid_Codigo.enableDragAndDrop(false);
        //    mygrid_Codigo.init();
        //    mygrid_Codigo.setSkin("dhx_skyblue");
        //    //***********************************************************************************************
        //}
    }

    //    function drop_f(r1, r2) {
    //        idGrilla = "-1";
    //    }

    //    function drag_f(r1, r2) {
    //        idGrilla = "-1";


    //    }

    //    function drag_in(r1, r2) {
    //        idGrilla = mygrid.cells(r1, 0).getValue();
    //    }

    function tondrag(id, id2) {

        var idDetalle = id;
        var mensaje = "¿Desea mover el area '" + tree.getItemText(id);
        var TipoUpdate = "O";


        if (id == "") {

            idDetalle = mygrid.getSelectedId();
            if (idDetalle == null) {
                return;
            }


            var ListadoID = idDetalle.split(",");
            var ListadoReal = "";
            var ValorId = "";
            for (i = 0; i < ListadoID.length; i++) {
                ValorId = mygrid.cells(ListadoID[i], 0).getValue().split('codigo="')[1].split('"')[0];
                ListadoReal = ListadoReal + ValorId + ",";
            }

            if (ListadoReal.substring(ListadoReal.length - 1, ListadoReal.length) == ",") {
                ListadoReal = ListadoReal.substring(0, ListadoReal.length - 1);
            }


            //return false;
            mensaje = "¿Desea mover el(los) empleado(s) seleccionados ";
            var listaEmpleados = "";
            TipoUpdate = "E";
            id = ListadoReal;

        }

        else {

            //Temporalmente deshabilitado... hasta dejarlo OK
            return false;

        }

        if (id2 == "" || id == "") {            // no hay Drag&Drop
            return false;
        }
        if (id.substring(0, id.length - 3) == id2 && TipoUpdate == "O") {        // el padre es el mismo 
            return false;
        }

        //Filtro por ID del Empleado.
        if (confirm(mensaje + " hacia '" + tree.getItemText(id2) + "'?")) {
            $.ajax({
                type: "POST",
                url: "Mnt_Principal.aspx/Actualizar",
                data: "{'OrganizacionActual': '" + id + "'," +
                    "'PadreDestino': '" + id2 + "'," +
                    "'TipoUpdate': '" + TipoUpdate + "'}",

                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {

                    if (result.d != '') {
                        alert(result.d);
                        return false;
                    }
                    //idTree = idTree.substring(0, idTree.length - 3);
                    var parent = tree.getParentId(idTree);
                    //alert(parent);
                    //idTree = parent;
                    tree.selectItem(parent, true, false);
                    CargarDependecia(true);
                    CargarDetalle(0, "");
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
            if (TipoUpdate == "O") {            // Solo si actualiza areas se llanara a JS de TreeView 
                return true;
            }

            else {
                return false;
            }
        }
        else {

            return false;
        }
    }

    $.ajax({
        type: "POST",
        url: "Mnt_Principal.aspx/ListarPrincipal",
        data: "{'vcCodInt': '" + "001" + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //debugger;
            if (result == null || result.d == null || result.d.length == 0 || result.d[0] == null ||
                result.d[0] == "" || result.d[0].length == 0 || result.d[0][0] == null || result.d[0][0] == "") {
                return;
            }

            tieneMultipleArea = result.d[0][3]; //Almaceno si será multi área
            tree.loadJSArray(result.d);

            $(result.d).each(function () {
                fixImage(this[0]);
            });
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

    function CargarDependecia(CargaPorCambio) {
        if (BusquedaManual == 0) {
            return false;
        }
        //console.log("CargoDependencia: " + CargoDependencia + "| CargoDetalle: " + CargoDetalle);
        if (CargoDependencia == false || CargoDetalle == false) {
            return false;
        }

        CargoDependencia = false;
        //$('#txtArea').val(tree.getSelectedItemId())


        var NivelClick = parseInt(tree.getSelectedItemId().length / 3);

        //console.log(NivelClick, parseInt(NivelMaximoOrganizacion));

        if (idTree != tree.getSelectedItemId() || CargaPorCambio == true) {

            if (NivelClick < parseInt(NivelMaximoOrganizacion)) {
                //debugger;
                var idtree = tree.getSelectedItemId();
                var state = tree.getOpenState(idtree);
                var EnvioSolicitud = false;
                if (state == 0 || CargaPorCambio == true) {
                    //Se despliego el nodo, se expande.
                    tree.deleteChildItems(idtree);
                    EnvioSolicitud = true;
                    $.ajax({
                        type: "POST",
                        url: "Mnt_Principal.aspx/ListarOrganizacion",
                        //data: "{'vcCodInt': '" + idtree + "', 'tieneMultipleArea': '" + tieneMultipleArea.toString() + "'}",
                        data: "{'vcCodInt': '" + idtree + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            CargoDependencia = true;
                            var texto = tree.getAllChildless();
                            $(result.d).each(function () {
                                if (texto.indexOf(this.vcCodInt) == -1) {
                                    tree.insertNewItem(idtree, this.vcCodInt, this.vcNomOrg, 0, 0, 0, 0, '');
                                    fixImage(this.vcCodInt);
                                }
                                else {
                                    return false;
                                }
                            });
                            CargarDetalle(0, "");
                        },
                        error: function (xhr, err, thrErr) {

                            MostrarErrorAjax(xhr, err, thrErr);
                        }
                    });
                }
                else {
                    CargoDependencia = true;
                }

                if (idTree != "-1" && EnvioSolicitud == false) {
                    CargoDependencia = true;
                    CargarDetalle(0, "");
                }
            }
            else {
                CargoDependencia = true;
                CargarDetalle(0, "");
            }
        }
        else {
            CargoDependencia = true;
        }
        idTree = tree.getSelectedItemId();
    }

    function fixImage(id) {
        //Cerrar, abrir, cerrar
        var Archivo = 'Niveles/' + (id.length / 3).toString() + '.ico';
        tree.setItemImage2(id, Archivo, Archivo, Archivo);
    }

    var CodIntDemanda = '';
    var PosicionBusqueda = 0;
    function BuscarAreaEmpleado(NombreArea, TipoBusqueda) {
        var CodInt = '';
        var NomOrg = '';
        $.ajax({
            type: "POST",
            url: "Mnt_Principal.aspx/BuscarAreaEmpleado",
            data: "{'vcNomArea': '" + NombreArea + "'," +
                "'vcTipBus': '" + TipoBusqueda + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var x = 0;
                $(result.d).each(function () {
                    BusquedaManual = 0;
                    x = x + 1;

                    if ($(result.d).length <= PosicionBusqueda) {
                        PosicionBusqueda = 0;
                    }

                    if (PosicionBusqueda < x) {
                        PosicionBusqueda = PosicionBusqueda + 1;

                        //ÁREA
                        if (TipoBusqueda == "1") {
                            CodInt = this.vcCodInt;
                            NomOrg = this.vcNomOrg;
                        } //EMPLEADO
                        else if (TipoBusqueda == "2") {
                            CodInt = this.Area.vcCodInt;
                            NomOrg = this.Area.vcNomOrg;
                        } else if (TipoBusqueda == "3") {
                            CodInt = this.Area.vcCodInt;
                            NomOrg = this.Area.vcNomOrg;
                        }

                        var blExisteEnArbol = false;
                        //Primero busco si existe en el arbol...
                        var vcTodosLosHijos = '001,' + tree.getAllChildless() + ",";
                        if (vcTodosLosHijos.indexOf(CodInt + ",") !== -1) {
                            tree.selectItem(CodInt, true, true);
                            tree.focusItem(CodInt);
                            blExisteEnArbol = true;
                            //Cargar detalle de empleados...
                            CargarDetalle(0, this.P_vcCod);
                            return false;
                        }
                        if (blExisteEnArbol == false) {
                            //Buscar por demanda...
                            CodIntDemanda = '001';
                            CargarDependeciaBusqueda(CodInt, this.P_vcCod);
                            tree.focusItem(CodInt);
                            return false;
                        }
                    }
                });

                if ($(result.d).length == 0) {
                    BusquedaManual = 1;
                }

            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });

    }

    function CargarDependeciaBusqueda(CodInt, CodEmp) {
        $.ajax({
            type: "POST",
            url: "Mnt_Principal.aspx/ListarOrganizacion",
            data: "{'vcCodInt': '" + CodIntDemanda + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var idtree = CodIntDemanda;
                tree.selectItem(CodIntDemanda, true, false);
                var texto = tree.getAllChildless();

                var nivel = 0;
                $(result.d).each(function () {
                    nivel = this.vcCodInt.length / 3;
                    if (texto.indexOf(this.vcCodInt) == -1) {
                        tree.insertNewItem(idtree, this.vcCodInt, this.vcNomOrg, 0, 0, 0, 0, '');
                        fixImage(this.vcCodInt);
                    }
                    else {
                        return false;
                    }
                });

                CodIntDemanda = CodInt.substr(0, nivel * 3);
                if (CodIntDemanda != CodInt) {
                    CargarDependeciaBusqueda(CodInt, CodEmp);
                }
                else {
                    tree.selectItem(CodInt, true, false);
                    tree.focusItem(CodInt);
                    //Cargar detalle de empleados...
                    CargarDetalle(0, CodEmp);
                    BusquedaManual = 1;
                    return false;
                }

            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
        tree.selectItem(CodInt, true, false);
    }

    $("#ddlEstado,#chkIncluirDependencia,#chkEmpleadoLineaDispositivo").change(function () {
        CargarDetalle(0, "");
    });

    $("#btnBuscar").click(function () {
        if ($("#txtBusqueda").val() == "") {
            alerta("Ingrese un valor a buscar");
            $("#txtBusqueda").focus();
            return;
        }
        CargarDetalle(1, "");
    });

    $("#btnDerecha").click(function () {
        if ($("#lstResultado option:selected").length > 0) {
            AgregaItems("#lstResultado option:selected");
        }
        else {
            alerta("Seleccione un ítem");
        }
    });
    $("#btnIzquierda").click(function () {
        if ($("#lstSeleccionados option:selected").length > 0) {
            $("#lstSeleccionados option:selected").remove();
        }
        else {
            alerta("Seleccione un ítem");
        }
    });
    $("#btnDerechaTodo").click(function () {
        if ($("#lstResultado option").length > 0) {
            AgregaItems("#lstResultado option");
        }
        else {
            alerta("No hay datos disponibles");
        }
    });
    $("#btnIzquierdaTodo").click(function () {
        if ($("#lstSeleccionados option").length > 0) {
            $("#lstSeleccionados").html("");
        }
        else {
            alerta("No hay datos seleccionados");
        }
    });

    function AgregaItems(selector) {
        var ValorAgregado = false;
        $(selector).each(function () {
            var Seleccionado = $(this);
            var Existe = false;
            $("#lstSeleccionados option").each(function () {
                if (Seleccionado.val() == $(this).val()) {
                    Existe = true;
                    ValorAgregado = true;
                    return false;
                }
            });
            if (!Existe) {
                $("#lstSeleccionados").append($("<option></option>").attr("value", Seleccionado.val()).text(Seleccionado.html()).css("color", Seleccionado.css("color")));
            }
        });
        if (ValorAgregado) {
            alerta("Algunos ítems seleccionados ya han sido agregados");
        }
    }

    $("#btnAceptar").click(function () {
        if ($("#hdfTipo").val() == "1") { //Area
            if ($("#hdfMultiple").val() == "1") {//Seleccion multiple 
                $("#lstSeleccionados option").each(function () {
                    var Area = new area();
                    Area.P_inCodOrg = $(this).val();
                    Area.vcNomOrg = $(this).html();
                    Areas.push(Area);
                });
                window.parent.IngresarAreas(Areas);
            }
            else {
                if ($("#lstResultado option:selected").length > 0) {
                    var Area = new area();
                    Area.P_inCodOrg = $("#lstResultado option:selected").val();
                    Area.vcNomOrg = $("#lstResultado option:selected").html();
                    window.parent.IngresarAreaUnico(Area);
                }
                else {
                    alerta("Seleccione un area");
                }
            }
        }
        else if ($("#hdfTipo").val() == "2") {//Empleado
            if ($("#hdfMultiple").val() == "1") {//Seleccion multiple 
                $("#lstSeleccionados option").each(function () {
                    var Empleado = new empleado();
                    Empleado.P_vcCod = $(this).val();
                    Empleado.vcNom = $(this).html();
                    Empleados.push(Empleado);
                });
                window.parent.IngresarEmpleados(Empleados);
            }
            else {
                if ($("#lstResultado option:selected").length > 0) {
                    var Empleado = new empleado();
                    Empleado.P_vcCod = $("#lstResultado option:selected").val();
                    Empleado.vcNom = $("#lstResultado option:selected").html();
                    window.parent.IngresarEmpleadoUnico(Empleado);
                }
                else {
                    alerta("Seleccione un empleado");
                }
            }
        }
        else if ($("#hdfTipo").val() == "3") {//Celular
            if ($("#hdfMultiple").val() == "1") {//Seleccion multiple
                $("#lstSeleccionados option").each(function () {
                    var Linea = new linea();
                    Linea.P_vcNum = $(this).val();
                    Linea.Empleado.vcNom = $(this).html();
                    Lineas.push(Linea);
                });
                window.parent.IngresarLineas(Lineas);
            }
            else {
                if ($("#lstResultado option:selected").length > 0) {
                    var Linea = new empleado();
                    Linea.P_vcNum = $("#lstResultado option:selected").val();
                    Linea.Empleado.vcNom = $("#lstResultado option:selected").html();
                    window.parent.IngresarLineaUnica(Linea);
                }
                else {
                    alerta("Seleccione una linea");
                }
            }
        }
        window.parent.Modal.dialog("close");
    });

    $("#btnCancelar").click(function () {
        window.parent.Modal.dialog("close");
    });


    DimPosElementos();
});


function CargarDetalle(tipo, empleado) {

    CargoDetalle = false;

    IdEmpleadoTree = empleado;
    var MetodoListar = "";
    var MetodoListar2 = "";
    var MetodoListar3 = "";
    var MetodoListar4 = "";
    var MetodoListar5 = "";

    var MetodoListar6 = ""; // Para listar Dispositivos de Empleados
    var MetodoListar7 = ""; // Para listar Dispositivos de Responsables de Area

    $("#hdfCodOrgaSeleccionado").val(tree.getSelectedItemId());

    if ($("#hdfTipo").val() == "1") {//Empleado
        MetodoListar = "ListarArea";
    }
    if ($("#hdfTipo").val() == "2") {//Empleado
        MetodoListar = "ListarEmpleado";
    }
    else if ($("#hdfTipo").val() == "3") {//Celular
        MetodoListar = "ListarLinea";
    }
    else {
        MetodoListar = "ListarEmpleado"; //Empleado    //Lineas
        MetodoListar2 = "ListarResponsableArea"; //"ListarResponsableArea"; //Responsable de Área ListarResponsableArea   //Lineas
    }

    //alert('actual: ' + tree.getSelectedItemId());
    if (tipo == 0) {
        if ($.trim($("#txtBuscarEmpleado").val().replace(/'/g, "").replace(/\\/g, "")) != '') {
            tipo = 4;
        }
    }
    var TipoBusqueda = $('input:radio[name=rblBusqueda]:checked').val();

    if (TipoBusqueda == 2) {
        if (tipo == 4) {
            MetodoListar3 = "ListarLinea"; //"ListarLinea"; //Línea
            MetodoListar4 = "ListarAnexo"; //Extensiones(Anexos)
            MetodoListar5 = "ListarCodigo"; //Codigos(Anexos)
            MetodoListar6 = "ListarDispositivos"; //Para listar Dispositivos de Empleados
        }
    } else {
        MetodoListar3 = "ListarLinea"; //"ListarLinea"; //Línea
        MetodoListar4 = "ListarAnexo"; //Extensiones(Anexos)
        MetodoListar5 = "ListarCodigo"; //Codigos(Anexos)        
        MetodoListar6 = "ListarDispositivos"; //Para listar Dispositivos de Empleados
    }

    if (MetodoListar != "") {
        //debugger;
        if (tree.getSelectedItemId() == "") {
            CargoDetalle = true;
            return;
        }

        if (tieneMultipleArea && tree.getSelectedItemId() === '001') {
            //return;
        } else {
            $.ajax({
                type: "POST",
                url: "Mnt_Principal.aspx/" + MetodoListar,
                data: "{'vcCodInt': '" + tree.getSelectedItemId() + "'," +
                    "'btIncDep': '" + $('#chkIncluirDependencia').is(':checked') + "'," +
                    "'btEmpLinDis': '" + $('#chkEmpleadoLineaDispositivo').is(':checked') + "'," +
                    "'inCodEst': '" + $("#ddlEstado").val() + "'," +
                    "'vcValBus': '" + $("#txtBusqueda").val() + "'," +
                    "'inTip': '" + tipo + "'," +
                    "'strDatoEmpleado': '" + $("#txtBuscarEmpleado").val().replace(/'/g, "").replace(/\\/g, "") + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    $("#lstResultado").html("");

                    $("#lblAreaSeleccionada").html(tree.getItemText(tree.getSelectedItemId()));

                    if ($("#hdfTipo").val() == "1") {//Area
                        $(result.d).each(function () {
                            var color = "";
                            if (!this.btVig) {
                                color = "Red";
                            }
                            $("#lstResultado").append($("<option></option>").attr("value", this.P_inCodOrg).text(this.P_inCodOrg + "=" + this.vcNomOrg).css("color", color));
                        });
                    }
                    else if ($("#hdfTipo").val() == "2") {//Empleado
                        $(result.d).each(function () {
                            var color = "";
                            if (!this.btVig) {
                                color = "Red";
                            }
                            $("#lstResultado").append($("<option></option>").attr("value", this.P_vcCod).text(this.P_vcCod + "=" + this.vcNom).css("color", color));
                        });
                    }
                    else if ($("#hdfTipo").val() == "3") {//Celular
                        $(result.d).each(function () {
                            var color = "";
                            if (!this.btVig) {
                                color = "Red";
                            }
                            $("#lstResultado").append($("<option></option>").attr("value", this.P_vcNum).text(this.P_vcNum + "=" + this.Empleado.vcNom).css("color", color));
                        });
                    }
                    else {

                        mygrid.clearAll();
                        //if(result.d).length > 0){

                        mygrid.parse(result.d, "json");

                        var count = mygrid.getRowsNum();
                        if (tipo != 4) {
                            $("#lblTotalEmpleados").html("&nbsp;(Total Empleados: " + count + ")");
                        }
                        //}

                        //var TipoBusqueda = $('input:radio[name=rblBusqueda]:checked').val();
                        if (TipoBusqueda == "2" && empleado != "") {
                            $("#tabTipos").tabs('option', 'selected', 0);
                            mygrid.selectRow(mygrid.getRowIndex(empleado));

                            //mygrid.selectRowById(empleado, false, true, false);
                            //mygrid.selectRow(1)
                        }
                    }
                    CargoDetalle = true;
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }



    }

    //JHERRERA 20150227: Nueva funcionalidad Responsable de Área
    //---------------------------------------------------------------------------------------------------------------------------
    if (MetodoListar2 != "") {
        $.ajax({
            type: "POST",
            url: "Mnt_Principal.aspx/" + MetodoListar2,
            data: "{'vcCodInt': '" + tree.getSelectedItemId() + "'," +
                "'btIncDep': '" + $('#chkIncluirDependencia').is(':checked') + "'," +
                "'btEmpLinDis': '" + $('#chkEmpleadoLineaDispositivo').is(':checked') + "'," +
                "'inCodEst': '" + $("#ddlEstado").val() + "'," +
                "'vcValBus': '" + $("#txtBusqueda").val() + "'," +
                "'inTip': '" + tipo + "'," +
                "'strDatoEmpleado': '" + $("#txtBuscarEmpleado").val().replace(/'/g, "").replace(/\\/g, "") + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                $("#lstResultado2").html("");
                $("#lblAreaSeleccionada").html(tree.getItemText(tree.getSelectedItemId()));

                mygridResAre.clearAll();
                mygridResAre.parse(result.d, "json");

                if (TipoBusqueda == "3") {
                    $("#tabTipos").tabs('option', 'selected', 1);
                    mygridResAre.selectRow(mygridResAre.getRowIndex(empleado));
                }

                CargoDetalle = true;
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }


    if (MetodoListar3 != "") {
        fnCargarLineasDipositivosEmpleado(tree.getSelectedItemId(), $('#chkIncluirDependencia').is(':checked'), tipo,
            $("#txtBuscarEmpleado").val(), 1, $('#chkEmpleadoLineaDispositivo').is(':checked')); //Para Lineas
    }

    if (MetodoListar6 != "") {
        fnCargarLineasDipositivosEmpleado_Dispositivo(tree.getSelectedItemId(), $('#chkIncluirDependencia').is(':checked'), tipo,
            $("#txtBuscarEmpleado").val(), 2, $('#chkEmpleadoLineaDispositivo').is(':checked')); //Para Dispositivos
    }

    //if ($("#hdfRemoverAnexo").val() == "true") {
    //    if (MetodoListar4 != "" && tree.getSelectedItemId() != "") {
    //        fnCargarAnexos(tree.getSelectedItemId(), $('#chkIncluirDependencia').is(':checked'), tipo, $("#txtBuscarEmpleado").val());
    //    }
    //}


    //if ($("#hdfRemoverCodigo").val() == "true") {
    //    if (MetodoListar5 != "" && tree.getSelectedItemId() != "") {
    //        fnCargarCodigos(tree.getSelectedItemId(), $('#chkIncluirDependencia').is(':checked'), tipo, $("#txtBuscarEmpleado").val());
    //    } 
    //}  

    //----------------------------------------------------------------------------------------------------------------------------->>
}

function fnCargarLineasDipositivosEmpleado(vcCodInt, btIncDep, tipo, vcFiltroEmpleado, intLineaDispositivo, btEmpLinDis) {
    //debugger;

    if (tieneMultipleArea && vcCodInt === '001') {
        return;
    }

    $.ajax({
        type: "POST",
        url: "Mnt_Principal.aspx/CargarLineasDispositivosEmpleado",
        data: "{'vcCodInt': '" + vcCodInt + "'," +
            "'btIncDep': '" + btIncDep + "'," +
            "'btEmpLinDis': '" + btEmpLinDis + "'," +
            "'inTip': '" + tipo + "'," +
            "'intLineaDispositivo': '" + intLineaDispositivo + "'," +
            "'strDatoEmpleado': '" + vcFiltroEmpleado.replace(/'/g, "").replace(/\\/g, "") + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            mygrid_LineaDispositivo.clearAll();
            mygrid_LineaDispositivo.parse(result.d, "json");
            var count = mygrid_LineaDispositivo.getRowsNum();
            var Titulo = 'Líneas (' + count + ')';
            fnCambiarTituloTabUI('tabInformativo', 0, Titulo);
            CargoDetalle = true;
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnCargarLineasDipositivosEmpleado_Dispositivo(vcCodInt, btIncDep, tipo, vcFiltroEmpleado, intLineaDispositivo, btEmpLinDis) {
    //debugger;

    if (tieneMultipleArea && vcCodInt === '001') {
        return;
    }

    $.ajax({
        type: "POST",
        url: "Mnt_Principal.aspx/CargarLineasDispositivosEmpleado",
        data: "{'vcCodInt': '" + vcCodInt + "'," +
            "'btIncDep': '" + btIncDep + "'," +
            "'btEmpLinDis': '" + btEmpLinDis + "'," +
            "'inTip': '" + tipo + "'," +
            "'intLineaDispositivo': '" + intLineaDispositivo + "'," +
            "'strDatoEmpleado': '" + vcFiltroEmpleado.replace(/'/g, "").replace(/\\/g, "") + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            mygrid_LineaDispositivo_D.clearAll();
            mygrid_LineaDispositivo_D.parse(result.d, "json");
            var count = mygrid_LineaDispositivo_D.getRowsNum();
            var Titulo = 'Equipos (' + count + ')';
            fnCambiarTituloTabUI('tabInformativo', 1, Titulo);

            CargoDetalle = true;

            //$("#tbLineasDispositivo_D").append("Holaaa");
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}


function fnCargarAnexos(vcCodInt, btIncDep, tipo, vcFiltroEmpleado) {

    $.ajax({
        type: "POST",
        url: "Mnt_Principal.aspx/ListarAnexo",
        data: "{'vcCodInt': '" + vcCodInt + "'," +
            "'btIncDep': '" + btIncDep + "'," +
            "'inTip': '" + tipo + "'," +
            "'strDatoEmpleado': '" + vcFiltroEmpleado.replace(/'/g, "").replace(/\\/g, "") + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            mygrid_Anexos.clearAll();
            mygrid_Anexos.parse(result.d, "json");
            var count = mygrid_Anexos.getRowsNum();
            var Titulo = 'Anexos (' + count + ')';
            if ($("#hdfRemoverAnexo").val() == "true" && $("#hdfRemoverCodigo").val() == "true") {
                fnCambiarTituloTabUI('tabInformativo', 1, Titulo);
            }
            else if ($("#hdfRemoverAnexo").val() == "true" && $("#hdfRemoverCodigo").val() == "false") {
                fnCambiarTituloTabUI('tabInformativo', 1, Titulo);
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });


}

function fnCargarCodigos(vcCodInt, btIncDep, tipo, vcFiltroEmpleado) {

    $.ajax({
        type: "POST",
        url: "Mnt_Principal.aspx/ListarCodigo",
        data: "{'vcCodInt': '" + vcCodInt + "'," +
            "'btIncDep': '" + btIncDep + "'," +
            "'inTip': '" + tipo + "'," +
            "'strDatoEmpleado': '" + vcFiltroEmpleado.replace(/'/g, "").replace(/\\/g, "") + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            mygrid_Codigo.clearAll();
            mygrid_Codigo.parse(result.d, "json");
            var count = mygrid_Codigo.getRowsNum();
            var Titulo = 'Codigos (' + count + ')';
            if ($("#hdfRemoverAnexo").val() == "true" && $("#hdfRemoverCodigo").val() == "true") {
                fnCambiarTituloTabUI('tabInformativo', 2, Titulo);
            }
            else if ($("#hdfRemoverAnexo").val() == "false" && $("#hdfRemoverCodigo").val() == "true") {
                fnCambiarTituloTabUI('tabInformativo', 1, Titulo);
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });


}


//Buscar Empleado desde caja de texto...
//

function fnBuscarEmpleados_TextBox() {
    //Valida si la grilla esta vacia...
    //$('#txtBuscarEmpleado')
    //if (mygrid.getRowsNum() > 0) {
    CargarDetalle("0", "");
    //}

}


function RemoveTab_Estructura(idtab) {
    var Id = '#' + idtab;
    var $panel = $("#tabInformativo").find(Id);
    if ($panel.length) {//En el caso que exista el tab, lo elimina
        $("#tabInformativo").tabs("remove", Id);
    }
}



function GrabarNivelMaximo() {
    $.ajax({
        type: "POST",
        url: "Mnt_Principal.aspx/GrabarNivelMaximo",
        data: "{'Nivel': '" + NivelMaximoOrganizacion + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //console.log(result);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}