var tabOpciones;
var pagina = "";
var NumConsulta = 1;
var timeoutHnd;

//agregar empleados desde el dialog - agregado wapumayta 27-11-2013..
function IngresarEmpleados(empleados) {//Carga los empleados seleccionados del formulario respectivo
    var divTabs = $(tabOpciones).find("div");
    for (i = 0; i < divTabs.length; i++) {
        if (!$(divTabs[i]).hasClass("ui-tabs-hide")) {
            var ifrm = $(divTabs[i]).find(".ifContenido");
            $(ifrm)[0].contentWindow.IngresarEmpleados(empleados);
        }
    }
}
function IngresarLineas(lineas) {//Carga las lineas seleccionadas del formulario respectivo
    var divTabs = $(tabOpciones).find("div");
    for (i = 0; i < divTabs.length; i++) {
        if (!$(divTabs[i]).hasClass("ui-tabs-hide")) {
            var ifrm = $(divTabs[i]).find(".ifContenido");
            $(ifrm)[0].contentWindow.IngresarLineas(lineas);
        }
    }
}
function IngresarAreas(areas) {//Carga las areas seleccionadas del formulario respectivo
    var divTabs = $(tabOpciones).find("div");
    for (i = 0; i < divTabs.length; i++) {
        if (!$(divTabs[i]).hasClass("ui-tabs-hide")) {
            var ifrm = $(divTabs[i]).find(".ifContenido");
            $(ifrm)[0].contentWindow.IngresarAreas(areas);
        }
    }
}
function IngresarCentroCosto(centrosCostos) {//Carga los centros de costos seleccionados del formulario respectivo
    var divTabs = $(tabOpciones).find("div");
    for (i = 0; i < divTabs.length; i++) {
        if (!$(divTabs[i]).hasClass("ui-tabs-hide")) {
            var ifrm = $(divTabs[i]).find(".ifContenido");
            $(ifrm)[0].contentWindow.IngresarCentroCosto(centrosCostos);
        }
    }
}
//abrir nuevos dialogos - agregado wapumayta 27-11-2013
function abrirDialogSelectEmp() {
    var $width = 920;
    var $height = 505;
    var $Pagina = 'Con_SeleccionArea.aspx?Tipo=2&Multiple=1&UnPanel=0'; //JHERRERA 20140807-- Ahora sólo se mostrará un panel para la selección de empleado
    //            var $Pagina = 'Con_SeleccionArea.aspx?Tipo=2&Multiple=1';
    $("#ifArea").attr("src", $Pagina);
    Modal = $('#dvArea').dialog({
        title: "Seleccionar empleado",
        width: $width,
        height: $height,
        modal: true,
        resizable: false
    });
}
function abrirDialogSelecLiena(empSel, codTipLin) {
    var $width = 740;
    var $height = 505;
    var $Pagina = 'Con_SeleccionArea.aspx?Tipo=3&Multiple=1&vcCodEmp=' + empSel + '&UnPanel=1&inCodTip=' + codTipLin; //JHERRERA 20140807-- Ahora sólo se mostrará un panel para la selección de empleado
    $("#ifArea").attr("src", $Pagina);
    Modal = $('#dvArea').dialog({
        title: "Seleccionar celular",
        width: $width,
        height: $height,
        modal: true,
        resizable: false
    });
}
var ExisteCentroCosto = false;
var ifCentroCosto = $("#ifCCO");
function abrirDialogSelecOficina(oficina) {
    if (oficina == "1") {//Organización
        var $width = 740;
        var $height = 505;
        var $Pagina = 'Con_SeleccionArea.aspx?Tipo=1&Multiple=1&UnPanel=1'; //JHERRERA 20140807-- Ahora sólo se mostrará un panel para la selección de empleado
        $("#ifArea").attr("src", $Pagina);
        Modal = $('#dvArea').dialog({
            title: "Seleccionar Área",
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
    }
    else if (oficina == "2") {//Centro de costo
        var $width = 590;
        var $height = 470;
        Modal = $('#dvCCO').dialog({
            title: "Seleccionar centro de costo",
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
        if (!ExisteCentroCosto) {
            var $Pagina = 'Con_SeleccionCentroCosto.aspx';
            $("#ifCCO").attr("src", $Pagina);
            ExisteCentroCosto = true;
        }
    }
}

//fin abrir dialogo

$(function () {
    var Dialogo;

    $(".btnNormal").button({});

    $("div", ".btnNormal").css({ margin: 0, padding: 0, width: 28, height: 35 });
    $("span", ".btnNormal").css({ margin: 0, padding: 0, width: 26 });

    $(".txtFecha").datepicker({
        changeMonth: true,
        changeYear: true
    });

    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height() - 30;
        $(".tabs").css({ height: Alto - 60 - 10, width: Ancho - 23 });
        $(".ui-tabs-panel").css({ height: Alto - 60 - 100 - 20 });
        $("#dvContAcordeon").css({ height: Alto - 60 - 80 });
        $(".tabHijo").css({ height: Alto - 108, width: Ancho - 250 });
        
        $(".ifContenido").css({ height: Alto - 81, width: Ancho - 25 });
        
    }

    $(window).resize(function () {
        DimPosElementos();
    });

    function fnCrearBotonEliminar(id, idUsu) {
        vcBotones = "";
        if ($("#hdfIdUsuario").val() == idUsu) {
            vcBotones = '<img id="btnEliminar_' + id + '" src="../../Common/Images/Mantenimiento/delete_16x16.gif" alt="Eliminar" class="imgBtn EliCri" title="Eliminar"/>';
        }
        else {
            vcBotones = "";
        }
        return vcBotones;
    }

    var tbCriterio = $("#tbCriterio").jqGrid({
        datatype: "local",
        colModel: [{ name: 'P_inCodCri', index: 'P_inCodCri', label: 'Código', hidden: true, key: true },
                   {
                       name: 'Eliminar', index: 'Eliminar', label: ' ', hidden: false, width: 20, align: 'center', resizable: false,
                       formatter: function (value, options, rData) { return fnCrearBotonEliminar(rData.P_inCodCri, rData.Usuario.P_inCod); }
                   },
                   { name: 'vcNomCri', index: 'vcNomCri', label: 'Nombre' },
                   { name: 'vcTipCon', index: 'vcTipCon', label: 'Tipo Consulta', width: '60' },
                   { name: 'Usuario.vcNom', index: 'Usuario.vcNom', label: 'Usuario', width: '85' },
                   { name: 'vcFecCrea', index: 'vcFecCrea', label: 'Fecha Creación', width: '80' }
        ],
        sortname: "vcFecCrea", //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: "600",
        height: "170",
        rownumbers: true,
        caption: "Criterios guardados",
        ondblClickRow: function (id) { AbrirCriterio(); }
    });

    tabOpciones = $("#TabOpciones").tabs({
        tabTemplate: "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close'>Remover Tab</span></li>",
        add: function (event, ui) {
            var ifra = document.createElement('IFRAME');
            var Ancho = $(window).width();
            var Alto = $(window).height();
            ifra.width = Ancho - 25;
            ifra.height = Alto - 92 - 60;
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
            ifra.className = "ifContenido";
            $(ui.panel).append(ifra);
            $(this).tabs('select', '#' + ui.panel.id);
            pagina = "";
        }
    });


    function inicio() {
        DimPosElementos();
        $("#txtUsuarioBusqueda").hide();

        var Ancho = $(window).width();
        var Alto = $(window).height() - 70;
        pagina = "Con_Consulta.aspx?inNumCri=" + NumConsulta;
        AbrirOpcion(tabOpciones, "#TabConsulta_" + NumConsulta.toString(), "Consulta " + NumConsulta.toString(), Alto - 102, Ancho - 150);
        NumConsulta++;
    }

    $("#TabOpciones span.ui-icon-close").live("click", function () {
        var index = $("li", tabOpciones).index($(this).parent());
        tabOpciones.tabs("remove", index);
    });

    $("#btnNuevo").click(function () {
        var Ancho = $(window).width();
        var Alto = $(window).height() - 70;
        pagina = "Con_Consulta.aspx?inNumCri=" + NumConsulta;
        AbrirOpcion(tabOpciones, "#TabConsulta_" + NumConsulta.toString(), "Consulta " + NumConsulta.toString(), Alto - 102, Ancho - 150);
        NumConsulta++;
    });

    $("#btnAbrir").click(function () {
        var Ancho = $(window).width();
        var Alto = $(window).height();

        Buscar();
        Dialogo = $('#dvBusqueda').dialog({
            title: "Buscar criterios",
            width: 630,
            height: 400,
            modal: true,
            resizable: false,
            buttons: {
                "Abrir": function () {
                    AbrirCriterio();
                },
                "Cancelar": function () {
                    $(this).dialog("close");
                }
            }
        });
    });

    function AbrirCriterio() {
        var id = $("#tbCriterio").jqGrid('getGridParam', 'selrow');
        var datos = $("#tbCriterio").jqGrid('getRowData', id);

        if (id) {
            var Ancho = $(window).width();
            var Alto = $(window).height() - 70;
            pagina = "Con_Consulta.aspx?inCodCri=" + id + "&inNumCri=" + NumConsulta;
            AbrirOpcion(tabOpciones, "#TabConsulta_" + datos.vcNomCri.replace(/ /g, "_"), datos.vcNomCri, Alto - 102, Ancho - 150);
            $('#dvBusqueda').dialog("close");
            NumConsulta++;
        }
        else {
            alerta("Seleccione un Criterio");
        }
    }

    $("#chkOtroUsuario").change(function () {
        if ($(this).is(':checked')) {
            $("#txtUsuarioBusqueda").show("slow");
        }
        else {
            $("#txtUsuarioBusqueda").hide("slow");
        }
        Buscar();
    });

    $("#imgBorrarFechaCreacionI").click(function () {
        $("#txtFechaCreacionI").val("");
        Buscar();
    });

    $("#imgBorrarFechaCreacionF").click(function () {
        $("#txtFechaCreacionF").val("");
        Buscar();
    });

    $("#ddlTipoConsultaBusqueda,#txtFechaCreacionI,#txtFechaCreacionF").change(function () {
        Buscar();
    });

    $("#txtNombre").keyup(function () {
        if (timeoutHnd) {
            clearTimeout(timeoutHnd);
        }
        timeoutHnd = setTimeout(Buscar, 500);
    });

    $("#txtUsuarioBusqueda").keyup(function () {
        if (timeoutHnd) {
            clearTimeout(timeoutHnd);
        }
        timeoutHnd = setTimeout(Buscar, 500);
    });

    //            $("#imgBuscar").click(function () {
    //                Buscar();
    //            });

    function Buscar() {
        var vcNomCri = $("#txtNombre").val();
        var inTipCon = $("#ddlTipoConsultaBusqueda").val();
        var btOtrUsu = $("#chkOtroUsuario").is(':checked');
        //var inCodUsu = $("#hdfCodUsuarioBusqueda").val();
        var vcNomUsuBus = $("#txtUsuarioBusqueda").val();
        var dtFecIni = $("#txtFechaCreacionI").val();
        var dtFecFin = $("#txtFechaCreacionF").val();
        var fechaFormato = $("#txtFechaCreacionI").datepicker("option", "dateFormat");

        dtFecIni = dtFecIni.substring(fechaFormato.indexOf("yy"), fechaFormato.indexOf("yy") + 4) + dtFecIni.substring(fechaFormato.indexOf("mm"), fechaFormato.indexOf("mm") + 2) + dtFecIni.substring(fechaFormato.indexOf("dd"), fechaFormato.indexOf("dd") + 2);
        dtFecFin = dtFecFin.substring(fechaFormato.indexOf("yy"), fechaFormato.indexOf("yy") + 4) + dtFecFin.substring(fechaFormato.indexOf("mm"), fechaFormato.indexOf("mm") + 2) + dtFecFin.substring(fechaFormato.indexOf("dd"), fechaFormato.indexOf("dd") + 2);

        $.ajax({
            type: "POST",
            url: "Con_ConsultaPrincipal.aspx/ListarCriterios",
            data: "{'vcNomCri': '" + vcNomCri + "'," +
                   "'inTipCon': '" + inTipCon + "'," +
                   "'btOtrUsu': '" + btOtrUsu + "'," +
            //"'inCodUsu': '" + inCodUsu + "'," +
                   "'vcNomUsuBus': '" + vcNomUsuBus + "'," +
                   "'dtFecIni': '" + dtFecIni + "'," +
                   "'dtFecFin': '" + dtFecFin + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#tbCriterio").jqGrid('clearGridData');

                if ($(result.d).length > 0) {
                    var i = 0;
                    for (i = 0; i < $(result.d).length; i++) {
                        $("#tbCriterio").jqGrid('addRowData', result.d[i].P_inCodCri, result.d[i]);
                    }
                }
                else {
                    Mensaje("<br/><h1>No se encontraron registros</h1><br/>", document, CerroMensaje);
                }
            },
            cache: false,
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    $(".EliCri").live("click", function () {
        var id = $(this).attr("id").substr(12);
        var datos = $("#tbCriterio").jqGrid('getRowData', id);
        $("#lblMsjConfirmacion").text("¿Está seguro de eliminar el criterio seleccionado?");
        $('#divMsgConfirmar').dialog({
            title: "¡Alerta!",
            modal: true,
            width: 330,
            buttons: {
                "Si": function () {
                    fnEliminarCriterio(id);
                    $(this).dialog("close");
                },
                "Cancelar": function () {
                    $(this).dialog("close");
                }
            }
        });
    });

    function fnEliminarCriterio(id) {
        $.ajax({
            type: "POST",
            url: "Con_ConsultaPrincipal.aspx/EliminarCriterio",
            data: "{'inCodCri': '" + id + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                //                        $("#tbCriterio").trigger("reloadGrid");
                $('#tbCriterio').jqGrid('delRowData', id);
            },
            cache: false,
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    function CerroMensaje() {

    }

    AccionInicio();

    function AccionInicio() {
        if ($("#hdfAccion").val() == "1") {
            $("#btnAbrir").click();
        }
    }


    inicio();

});