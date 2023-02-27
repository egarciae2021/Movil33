var inTipoCostoReposicion = 1; //0=Sólo Penalidad; 1=Equipo+Penalidad; 2=Sólo Equipo(para cambio)
var $contents;
var arMeses = [{ valor: 1, mes: 'Enero' }, { valor: 2, mes: 'Febrero' }, { valor: 3, mes: 'Marzo' }, { valor: 4, mes: 'Abril' }, { valor: 5, mes: 'Mayo' }, { valor: 6, mes: 'Junio' }, { valor: 7, mes: 'Julio' }, { valor: 8, mes: 'Agosto' }, { valor: 9, mes: 'Septiembre' }, { valor: 10, mes: 'Octubre' }, { valor: 11, mes: 'Noviembre' }, { valor: 12, mes: 'Diciembre' }];
var arMesesShort = [{ valor: 1, mes: 'Ene' }, { valor: 2, mes: 'Feb' }, { valor: 3, mes: 'Mar' }, { valor: 4, mes: 'Abr' }, { valor: 5, mes: 'May' }, { valor: 6, mes: 'Jun' }, { valor: 7, mes: 'Jul' }, { valor: 8, mes: 'Ago' }, { valor: 9, mes: 'Sep' }, { valor: 10, mes: 'Oct' }, { valor: 11, mes: 'Nov' }, { valor: 12, mes: 'Dic' }];
var arValTipos = [];
var arNombreTipos = [];

var codDispTemp = '';
var codIMEITemp = '';
var lstUbicaciones = [];
var contenidoTab = '';
var arIndexTabMostrados = [];
var arTabMostrados = [];
var valAvance = true;
var msgValidacionGrilla = '';
//variables para resumen
var ResumenModeloSeleccionado = '';
var ResumenNombreModeloGaleria = '';
var ResumenNombreOperador = '';
var ResumenNombrePlan = '';
var ResumenCostoReferencial = '';
var ResumenCostoExtra = '';
var ResumenFechaFinContrato = '';
var ResumenNuevo = true;
var ResumenPlanActual = '';
var ResumenTipoLinea = '';
//variables financiamietno
var MesCuo = "0";
var MesesCuotas = '';
var NumMinCuo = "0";
var NumMaxCuo = "0";
var MinPerGra = '0';
var MaxPerGra = '0';
//fin variables para resumen
var permiteLinea = false;
var tabPlanesVisible = true;
var arContenidos = [];
var dataItem;
//SERVICIOS
var arServiciosActuales = [];
//AMPLIACION
var codOpeAutoCompPlanes = '';
var codPlanActual = '';
var tblServicio;
var textServicios = '';
var textPaquetes = '';
var newKendoGrid = true;
var lstServiciosCuenta;
//CONDICIONES
var tieneContrato = false;
var acuerdo = true;
//MENSAJE
var MensajeValidTipo = 'w'; //w=palabras; c=caracteres; //tipo de validación
var MensajeValidCant = '2'; //cantidad minima ingresada
var MensajeValidCantMax = '5000';
//ADJUNTOS
var AdjuntosCantidad = '2'; //cantidad de archivos adjutnso que se pueden agregar
var AdjuntosExtensiones = 'txt,pdf'; //formatos validos a agregar
var AdjutnosTamanoTipo = 'i'; //t=total; i=individual; //tipo de validación
var AdjuntosTamanoMaxNum = '2'; //cantidad del tamaño de adjuntos
var AdjuntosTamanoMedida = 'mb'; //medida de validación de tamaño
//NAVEGACION
var ultimoTab = '';
var blUsarPrecio = 1;  // 1 = Precio Lista ; 0 = Precio Especial

//JHERRERA 20160823: Se pidió cambio para chile
var inMostrarNumCuotas = 0;

//OBJETOS
function empleado() {
    this.P_vcCod;
    this.vcNom;
    this.vcVal;
}
//COSTO DE MODELO DE DISPOSITIVO
var PreciosOperador = [];
var inCodOpe = -1;
//INDEX TAB ACTUAL
var indexTab;
var oCulturaLocal = window.parent.parent.oCulturaUsuario;
var indiceTab;
var vcRutaCondiciones = "";
var biEsPer = false;
var tbSolicitud;

//carpeta de dominio
var CarpetaDiminio = '';

var tbAmpPaquetes;



function fnEmpleado_click(objSpan) {

    var Titulo = '';
    var Pagina = '';
    var $width = 850; // 650;
    var $height = 550 - 40; //  480;

    var codint = '';

    if (objSpan != null) {
        var CodigoEmpleado = $(objSpan).attr("codigo");
        var NombreEmpleado = $(objSpan).attr("nombreempleado");
        Pagina = raiz('General/Administrar/Mantenimiento/Mnt_Empleado.aspx?view=1&Par=EMPL_P_vcCODEMP&Cod=' + CodigoEmpleado);
        Titulo = 'Empleado - ' + NombreEmpleado;
    }
    else {
        Pagina = raiz('General/Administrar/Mantenimiento/Mnt_Empleado.aspx?view=1&Par=EMPL_P_vcCODEMP&CodInt=' + codint);
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
function fnBuscarEmpleados_TextBox() {
    CargarDetalle("0", "");
}

function CargarDetalle(tipo, empleado) {
    //console.log("tipo", tipo)
    //console.log("empleado", empleado)
}
 // Edgar Garcia 14022023
function obtenerTamanoPantalla() {
     
    let anchototal = document.getElementById('DescripcionSol').clientWidth
    const anchocombox = 239
    let icono = document.getElementById('Span1').clientWidth
    let etiquetadescSol = document.getElementById('LabelDescripcion').clientWidth
    let restante = anchototal - anchocombox - icono -10

    fnChange()
    etiquetadescSol = document.getElementById('LabelDescripcion').clientWidth
    if (etiquetadescSol == 0) {
        etiquetadescSol = document.getElementById("LabelDescripcion").innerHTML.length * 0.45
    } 
    restante = anchototal - anchocombox - icono - 10

    if (document.getElementById('DescripcionSol').clientWidth < 235 ) {
        $("#Span1").css("display", "none");
        $("#LabelDescripcion").css("display", "none");
    }
    if (document.getElementById('DescripcionSol').clientWidth > 235 && document.getElementById('DescripcionSol').clientWidth < 253 && restante > etiquetadescSol) {
        $("#Span1").css("display", "inline-block");
        $("#LabelDescripcion").css("display", "none");
    }

    if (document.getElementById('DescripcionSol').clientWidth > 253 && restante > etiquetadescSol ) {
        $("#Span1").css("display", "inline-block");
        $("#LabelDescripcion").css("display", "inline-block");
    }
     
    fnChange()
}
function ResizeEtiquetaDescSol(xmensaje) { 

    let anchototal = document.getElementById('DescripcionSol').clientWidth
    xmensaje = xmensaje.replace(/\\n/g, '\n')
    const anchocombox = 235
     

    let icono = document.getElementById('Span1').clientWidth
    let etiquetadescSol  
    let restante = anchototal - anchocombox - icono - 10
    let vermas
    $("#LabelDescripcion").attr('title', xmensaje)
    $("#Span1").attr('title', xmensaje)
    $("#Span1").html(xmensaje)

    if (xmensaje != '') {

        $("#LabelDescripcion").toggleClass('tooltip-element');

        etiquetadescSol = document.getElementById('LabelDescripcion').clientWidth

        if (etiquetadescSol == 0) {
            etiquetadescSol = document.getElementById("LabelDescripcion").innerHTML.length * 0.45
        }
        console.log("restante" + restante)
        console.log("etiqueta" + etiquetadescSol)

        if (etiquetadescSol > restante && etiquetadescSol < 100) {
            $("#LabelDescripcion").css("display", "none");
        }
        if (etiquetadescSol > restante && etiquetadescSol > 100) {
            $("#LabelDescripcion").html(xmensaje)
            $("#LabelDescripcion").css("width", (restante * 0.8) + "px");
            vermas = $("#LabelDescripcion").text().length
            $("#LabelDescripcion").html(xmensaje.substring(0, xmensaje.length - 5) + "..(+)")
        }
        if (etiquetadescSol < restante) {
            $("#LabelDescripcion").html(xmensaje)
            $("#LabelDescripcion").css("width", (restante * 0.8) + "px");
            vermas = $("#LabelDescripcion").text().length
            $("#LabelDescripcion").html(xmensaje.substring(0, xmensaje.length - 5) + "..(+)")
        }
    }
    else {
        $("#LabelDescripcion").removeClass('tooltip-element')
        $("#LabelDescripcion").attr('display', 'none') 
        $("#LabelDescripcion").html('')

    }
    
}

//

$(function () {
    //    $("#divFinanciamiento").hide();

   
    // Edgar Garcia 14022023 agregar un event listener al objeto window para detectar el evento resize
    window.addEventListener("resize", obtenerTamanoPantalla);


    var mostrarAgregarEmpleado = $("#hdfMostrarAgregarEmpleado").val();
    //alert(mostrarAgregarEmpleado)

    $('#btnAgregarEmpleado').live("click", function (e) {
        fnEmpleado_click(null);
    });

    if (mostrarAgregarEmpleado == "1") {
        $("#btnAgregarEmpleado").show();
        $("#btnAgregarEmpleado").parent().show();
    }
    else {
        $("#btnAgregarEmpleado").hide();
        $("#btnAgregarEmpleado").parent().hide();
    }
    
    CarpetaDiminio = window.top.$("#hdfCodigoDominio").val() != '' ? '/' + window.top.$("#hdfCodigoDominio").val() : '';
    indiceTab = window.parent.tab.tabs("option", "selected");
    if ($("#hdfEsModal").val() == "0") {
        indexTab = window.parent.tab.tabs("option", "selected");
        indiceTab = window.parent.tab.tabs("option", "selected");
    } else {
        $("#tdEstadosCreacion").hide();
    }

    $(window).resize(function (a, c) {
        DimPosElementos();
    });
    DimPosElementos();
    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height();

        //contenido general
        $("#dvContenido").css("height", (Alto - 40) + "px");
        $("#tdTabs").css("height", (Alto - 110) + "px");
        $("#tbSolicitud").css("height", (Alto - 100) + "px");
        $("#dvContenido").removeClass("ui-widget-content");
        var altoContenidoTab = $("#tbSolicitud").css("height");
        //$("#lblMensajeVerificacion").text(parseInt(altoContenidoTab));
        //DISPOSITIVOS
        $("#tabDispositivos").css("height", parseInt(altoContenidoTab) - 40);
        //MENSAJE
        $("#tabMensaje").css("height", parseInt(altoContenidoTab) - 40);
        if ($.browser.msie) {
            $($("#tabMensaje").find("table")[1]).css("height", parseInt(altoContenidoTab) - 122);
        } else {
            $($("#tabMensaje").find("table")[1]).css("height", parseInt(altoContenidoTab) - 82);
        }
        //RESUMEN
        $("#tabResumen").css("height", parseInt(altoContenidoTab) - 40);
        var divResumenDatos = parseInt(altoContenidoTab) - parseInt($("#divFinanciamiento").css("height")) - 102; //275
        $("#divResumenDatos").css("height", divResumenDatos);
        //GALERIA
        $("#tabGaleria").css("height", parseInt(altoContenidoTab) - 15);
        $("#ifGaleria").css("height", parseInt(altoContenidoTab) - 25 - 2);
        //PLANES
        $("#tabPlanes").css("height", parseInt(altoContenidoTab) - 40);
        $("#trDetalle").css("height", parseInt(altoContenidoTab) - 80);
        $("#bnPlan_Panel1_O").css("height", parseInt(altoContenidoTab) - 140);
        //ADJUNTOS
        $("#tabDocAdjuntos").css("height", parseInt(altoContenidoTab) - 40);
        //PERSONALIZADAS
        $("#tabSolicitudPersonalizada").css("height", parseInt(altoContenidoTab) - 40);
        $("#ifSolPer").css("height", parseInt(altoContenidoTab) - 42 - 2);
        //CONDICIONES
        //$('#ifCondiciones').css({ "height": parseInt(altoContenidoTab) - 202 });
        $('#ifCondiciones').css({ "height": parseInt($(window).height()) - 202 });
        //SERVICIOS
        $("#tabServicios").css("height", parseInt(altoContenidoTab) - 45);
    }

    $("#ddlEstadoCreacion").change(function () {
        if ($("#ddlEstadoCreacion").val() == "32") {
            $("#lblMensajeEstado").html("Solicitud en espera de iniciar el ciclo respectivo.");
        } else if ($("#ddlEstadoCreacion").val() == "33") {
            $("#lblMensajeEstado").html("Solicitud lista para iniciar el proceso respectivo.");
        } else if ($("#ddlEstadoCreacion").val() == "34") {
            $("#lblMensajeEstado").html("Solicitud en espera de ser procesada por un especialista.");
        }
    });

    if ($("#hdfAdmin").val() == "0") {
        $("#btnBusquedaEmpleado").hide();
        $("#tdNombreEmpleado3").hide();
    }
    $("input:checkbox,input:radio,input:file").uniform();
    $(".btnNormal").button({});
    //ActivarCombokendo("#ddlTipoSolicitud", "200");
    combokendoFormar("ddlTipoSolicitud", "200");
    //$("#ddlTipoSolicitud").data("kendoComboBox").select(-1);
    $("#ddlTipoSolicitud").data("kendoComboBox").select("");
    $("#btnEquiSol").hide();
    $("#btnAtras").hide();
    $("#btnSiguiente").hide();
    $("#dvCreacionEstado").hide();
    $("#btnFinalizar").hide();
    //$("#ddlTipoSolicitud").kendoComboBox({ enable: false });



    var dataGrilla = new kendo.data.DataSource({
        data: []
    });

    //TABS
    tbSolicitud = $("#tbSolicitud").tabs({
        select: function (event, ui) {
            var numTabs = $("#tbSolicitud").tabs("length");
            var tabActual = tbSolicitud.tabs('option', 'selected');
            var tabSeleccionado = ui.index;
            var idTabSeleccionado = ui.panel.id;
            //actualizar captura planes
            //alert(idTabSeleccionado + ", " + codDispTemp + ", " + $("#hdfCodModDis").val());
            if (idTabSeleccionado == "tabResumen") {
                resumen();
            }
            if (idTabSeleccionado == "tabPaquetes") {
                if (codIMEITemp != $("#hdfLineaSel").val()) {
                    codIMEITemp = $("#hdfLineaSel").val();
                    LimpiarTabPaquetes();
                }
                paquetes();
            }
            if (idTabSeleccionado == 'tabDispositivos') {
                $("#lblMensajeVerificacion").html(msgValidacionGrilla);
            } else {
                $("#lblMensajeVerificacion").html('');
            }
            //alert("plan \nTemp: " + codDispTemp + "\nhdf: " + $("#hdfCodModDis").val());
            if (idTabSeleccionado == 'tabPlanes') {
                //alert($("#hdfCodModDis").val() + ", " + ResumenNombreModeloGaleria);
                $("#txtModeloSeleccionado").val(ResumenNombreModeloGaleria);
                $("#txtModeloSeleccionado").attr("title", ResumenNombreModeloGaleria);
                if ($("#txtCostoModelo").val() == '') {
                    $("#txtCostoModelo").val("Seleccione operador");
                }
            }
            if (idTabSeleccionado == 'tabServicios') {
                setCaptura('Servicios', fnValidarCambiosEnActivacionDeServicios());
            }
            if (codDispTemp != $("#hdfCodModDis").val()) {
                codDispTemp = $("#hdfCodModDis").val();
                if (idTabSeleccionado == 'tabPlanes') {
                    $("#hdfCodPlan").val('');
                    $("#ddlOperador").data("kendoComboBox").select(0);
                    $("#ddlPlan").data("kendoComboBox").select(0);
                    $("#ddlPlan").data("kendoComboBox").enable(false);
                    $("#txtCostoModelo").val("Seleccione operador");
                    $("#trDetalle").hide();
                    setCaptura('Planes', false);
                }
                //$("#hdfCodModDis").val(codDispTemp);
                //alert($("#hdfCodModDis").val());
            }
            //actualizar captura de modelo desde galeria
            if (codIMEITemp != $("#hdfCodImeiSel").val()) {
                //alerta("galeria - " + codIMEITemp + " - " + $("#hdfCodImeiSel").val());
                //$("#hdfCodModDis").val('');
                if (idTabSeleccionado == "tabGaleria") {
                    $("#hdfCodModDis").val('');
                    $("#hdfCodImeiSel").val(codIMEITemp);
                    //$("#ifGaleria").attr("src", "");
                    var tipoSolicitud = $("#ddlTipoSolicitud").data("kendoComboBox").value();
                    var permLIn = permiteLinea ? '1' : '0';
                    var codPlanSel = $("#hdfCodPlanSel").val();
                    $("#ifGaleria").attr("src", "");
                    $("#ifGaleria").attr("src", "Adm_GaleriaModDispositivos.aspx?vcCodEmp=" + $("#hdfCodEmpleado").val() + "&tipSol=" + tipoSolicitud + "&lin=" + permLIn + "&plan=" + codPlanSel + "&inCodOpe=" + inCodOpe);
                }
            }
            //alerta("numero tabs = " + numTabs + "\n tab actual index = " + tabActual + " \n tab seleccionado index " + tabSeleccionado + "\nidTabSeleccionado -> " + idTabSeleccionado);
            if (tabSeleccionado == numTabs - 1) {
                $("#btnAtras").show();
                $("#btnSiguiente").hide();
                $("#btnFinalizar").show();
                $("#dvCreacionEstado").show();
                $("#btnFinalizar").button("option", "disabled", false);
            } else if (tabSeleccionado == 0) {
                $("#btnAtras").hide();
                $("#btnSiguiente").show();
                $("#dvCreacionEstado").hide();
                $("#btnFinalizar").hide();
            } else {
                $("#btnAtras").show();
                $("#btnSiguiente").show();
                $("#dvCreacionEstado").hide();
                $("#btnFinalizar").hide();
            }
            //varificar captura de datos por pestaña

            //setCaptura(idTabSeleccionado.substring(3), verificarCaptura(idTabSeleccionado.substring(3)));
            if (verificarCaptura(idTabSeleccionado.substring(3))) {
                if (tabSeleccionado == numTabs - 1) {
                    $("#btnFinalizar").button("option", "disabled", false);
                } else {
                    $("#btnSiguiente").button("option", "disabled", false);
                }
            } else {
                if (tabSeleccionado == numTabs - 1) {
                    $("#btnFinalizar").button("option", "disabled", true);
                } else {
                    $("#btnSiguiente").button("option", "disabled", true);
                }
            }

            if (tieneContrato) {
                if (acuerdo) {
                    $("#btnFinalizar").button("option", "disabled", false);
                } else {
                    $("#btnFinalizar").button("option", "disabled", true);
                }
            }

            //JHERRERA 20150311: Nueva configuración (botón refrescar)
            //--------------------------------------------------------
            //            var tabSelection = tbSolicitud.tabs('option', 'selected');
            //            if (arContenidos[0].mostrarRefrescar) {
            if (arContenidos[tabSeleccionado].mostrarRefrescar) {
                $('#btnRefrescar').show();
            } else {
                $('#btnRefrescar').hide();
            }
            //--------------------------------------------------------

        },
        add: function (event, ui) {
            $(ui.panel).append($("#div" + contenidoTab).html());
            $(".btnNormal").button({});
            var altoContenidoTab = $("#tbSolicitud").css("height");
            var _iddominio = window.top.$("#hdfCodigoDominio").val();
            if (_iddominio == null || _iddominio == "") {
                _iddominio = "-1";
            }
            //alert(_iddominio);
            switch (contenidoTab) {
                case ("Dispositivos"):
                    grillaDispositivos();
                    break;
                case ("Mensaje"):
                    mensajeKendo();
                    break;
                case ("Galeria"):
                    var tipsol = $("#ddlTipoSolicitud").data("kendoComboBox").value();
                    if (tipsol == 2) {
                        var permLIn = permiteLinea ? '1' : '0';
                        $("#ifGaleria").css("height", parseInt(altoContenidoTab) - 35);
                        $("#ifGaleria").attr("src", "Adm_GaleriaModDispositivos.aspx?vcCodEmp=" + $("#hdfCodEmpleado").val() + "&tipSol=" + tipsol + "&lin=" + permLIn);
                    }
                    setCaptura('Galeria', true);
                    break;
                case ("Servicios"):
                    servicios();
                    break;
                case ("Planes"):
                    planes();
                    tabPlanesVisible = true;
                    break;
                case ("Condiciones"):
                    condiciones();
                    break;
                case ("SolicitudPersonalizada"):
                    var tipsol = $("#ddlTipoSolicitud").data("kendoComboBox").value();
                    $("#ifSolPer").css("height", parseInt($("#tbSolicitud").css("height")) - 35);
                    $("#ifSolPer").attr("src", "Solicitudes/Adm_CrearSolicitudPersonalizada.aspx?dominio=" + _iddominio + "&vcCodEmp=" + $("#hdfCodEmpleado").val() + "&inTipSol=" + tipsol + "&biAdmin=" + $("#hdfAdmin").val());
                    break;
                //case ("Paquetes"):                                                                                                               
                //    alert("KJLJ");                                                                                                               
                //    break;                                                                                                               
                //case ("Resumen"):                                                                                                               
                //    resumen();                                                                                                               
                //    break;                                                                                                               
            }
        }
    }); //FIN TABS

    $("#tbSolicitud").tabs("option", "active", 1);
    $("#txtEmpleado").focus();
    $("#btnBusquedaEmpleado").click(function () {
        //alert($("#hdfCodEmpleado").val());
        //mostrar seleccion empleado
        //var $width = 763;


        //var $height = 510;
        var $height;
        if ($(window).height() - 20 > 510) {
            $height = 510;

        } else {
            $height = $(window).height() - 20;
        }


        if ($("#hdfDefTipoSolicitud").val() == "30" && $("#hdfEsCulminada").val() == "1") {
            var $width = 685;
            $('#divSeleccionEmpleado').css("overflow-y", "hidden");
        }
        else {
            var $width = 758;
        }

        var $Pagina = '../Consultar/Con_SeleccionArea.aspx?Tipo=2&Multiple=0';
        $("#ifSeleccionEmpleado").attr("src", $Pagina);

        Modal = $('#divSeleccionEmpleado').dialog({
            title: "Seleccionar Empleado",
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });




    });

    //JHERRERA 20150311: Nueva configuración (botón refrescar)
    //--------------------------------------------------------
    var vcDiv = '<div id="btnRefrescar" class="Refrescar" title="Volver a cargar página" width="50px" style="right: 5px; top: 2px; margin-top:5px; margin-right: 5px; position: absolute; cursor: pointer; display:none; height: 4px !important;">';
    vcDiv = vcDiv + '<img src="../../Common/Images/Mantenimiento/Refresh_22x22.png" width="22" height="22">';
    vcDiv = vcDiv + '</div>';
    $("#tbSolicitud").append(vcDiv);
    //------------------------------------------------------->

    $(".servicio").live("change", function () {
        if (!fnValidarCambiosEnActivacionDeServicios()) {
            $("#btnSiguiente").button("option", "disabled", true);
            fnDesactivarSiguientesVentanas();
        } else {
            $("#btnSiguiente").button("option", "disabled", false);
        }
    });

    $('#btnRefrescar').click(function () {
        var tabSelection = tbSolicitud.tabs('option', 'selected');
        var tabMostrado = arContenidos[tabSelection].contenido;
        var tipsol = $("#ddlTipoSolicitud").data("kendoComboBox").value();

        switch (tabMostrado) {
            case ("Dispositivos"):
                fnActualizarDispositivos();
                break;
            case ("Galeria"):
                fnActualizarGaleria(tipsol);
                break;
            case ("Servicios"):
                //                servicios();
                fnActualizarServicios();
                break;
            case ("Paquetes"):
                if (tbAmpPaquetes.jqGrid('getGridParam', 'records') != 0) {
                    $("#divMsjRefrescarPaquetes").dialog({
                        title: "Refrescar Paquetes",
                        modal: true,
                        buttons: {
                            "Continuar": function () {
                                $(this).dialog("close");
                                fnActualizarPaquetes();
                            },
                            "Cancelar": function () {
                                $(this).dialog("close");
                            }
                        },
                        resizable: false
                    });
                } else {
                    fnActualizarPaquetes();
                }
                break;
            case ("Planes"):
                fnActualizarPlanes();
                //                tabPlanesVisible = true;
                break;
            case ("Condiciones"):
                //                condiciones();
                listarContenidosPorTipoSol(tipsol, 1);
                break;
            case ("SolicitudPersonalizada"):
                $("#lblMsjConfirmacion").text("Se volverá a cargar la página y perderá los cambios que no haya guardado. ¿Desea continuar?");
                $('#divMsgConfirmar').dialog({
                    title: "¡Alerta!",
                    modal: true,
                    width: 330,
                    buttons: {
                        "Si": function () {
                            $("#ifSolPer").attr("src", "Solicitudes/Adm_CrearSolicitudPersonalizada.aspx?vcCodEmp=" + $("#hdfCodEmpleado").val() + "&inTipSol=" + tipsol + "&biAdmin=" + $("#hdfAdmin").val());
                            $(this).dialog("close");
                        },
                        "Cancelar": function () {
                            $(this).dialog("close");
                        }
                    }
                });
                break;
        }
    });

    function fnActualizarServicios() {
        cargarServicios_x_Grupo();
        fnDesactivarSiguientesVentanas();
        setCaptura('Servicios', false);
        $("#btnSiguiente").button("option", "disabled", true);
    }

    function fnActualizarPaquetes() {
        $("#hdfCodPlan").val('');
        if (codIMEITemp != $("#hdfLineaSel").val()) {
            codIMEITemp = $("#hdfLineaSel").val();
        }
        LimpiarTabPaquetes();
        paquetes();

        var tabSeleccionado = tbSolicitud.tabs('option', 'selected');
        if (arContenidos[tabSeleccionado].obligatorio) {
            $("#btnSiguiente").button("option", "disabled", true);
            fnDesactivarSiguientesVentanas();
        }
    }

    function fnActualizarDispositivos() {
        grillaDispositivos();
        $("#btnSiguiente").button("option", "disabled", true);
        $("#lblMensajeVerificacion").html('');
        fnDesactivarSiguientesVentanas();
    }

    function fnActualizarGaleria(tipoSolicitud) {
        var permLIn = permiteLinea ? '1' : '0';

        //        if (tipsol == 2) {
        //            $("#ifGaleria").css("height", parseInt(altoContenidoTab) - 40);
        //            $("#ifGaleria").attr("src", "Adm_GaleriaModDispositivos.aspx?vcCodEmp=" + $("#hdfCodEmpleado").val() + "&tipSol=" + tipsol + "&lin=" + permLIn);
        //        } else {
        //        $("#lblMensajeVerificacion").html("");
        $("#hdfCodModDis").val('');
        $("#hdfCodImeiSel").val(codIMEITemp);
        var codPlanSel = $("#hdfCodPlanSel").val();
        if (tipoSolicitud == 2) {
            $("#ifGaleria").attr("src", "Adm_GaleriaModDispositivos.aspx?vcCodEmp=" + $("#hdfCodEmpleado").val() + "&tipSol=" + tipoSolicitud + "&lin=" + permLIn);
            VerificaHabilitadoEmpleado($("#hdfCodEmpleado").val(), "0");
        } else {
            $("#ifGaleria").attr("src", "Adm_GaleriaModDispositivos.aspx?vcCodEmp=" + $("#hdfCodEmpleado").val() + "&tipSol=" + tipoSolicitud + "&lin=" + permLIn + "&plan=" + codPlanSel + "&inCodOpe=" + inCodOpe);
        }
        fnDesactivarSiguientesVentanas();
        $("#btnSiguiente").button("option", "disabled", true);
        //alert('entro galeria');

        //        }
    }

    function fnActualizarPlanes() {
        $("#ddlPlan").data("kendoComboBox").select(0);
        $("#hdfCodPlan").val('');
        ResumenNombreOperador = '';
        ResumenNombrePlan = '';

        $("#trDetalle").hide();
        planes();


        //        var numTabs = $("#tbSolicitud").tabs("length");
        //        var tabSiguiente = tbSolicitud.tabs('option', 'selected') + 1;
        //        var arTabDes = []; arIndexTabMostrados = [];
        //        for (var i = tabSiguiente; i < numTabs; i++) {
        //            arTabDes.push(i);
        //            arIndexTabMostrados.push(i);
        //        }
        //        tbSolicitud.tabs("option", "disabled", arTabDes);

        var tabSeleccionado = tbSolicitud.tabs('option', 'selected');
        if (arContenidos[tabSeleccionado].obligatorio) {
            $("#btnSiguiente").button("option", "disabled", true);
            fnDesactivarSiguientesVentanas();
        }

        //        if (verificarCaptura(idTabSeleccionado.substring(3))) {
        //            $("#btnSiguiente").button("option", "disabled", false);
        //        } else {
        //            $("#btnSiguiente").button("option", "disabled", true);
        //        };

        //        if ($('#btnSiguiente').is(':disabled')) {
        //            fnDesactivarSiguientesVentanas();
        //        }
    }

    function fnActualizarCondiciones(lstContenidos) {
        if ($(lstContenidos).length > 0) {
            for (i in lstContenidos) {
                if (lstContenidos[i].Nombre == 'Condiciones') {
                    if (lstContenidos[i].vcNomArchivo_Dec != "") {
                        tieneContrato = true;
                        vcRutaCondiciones = "P_Movil/Administrar/Temporal/Solicitudes/" + CarpetaDiminio + "/" + lstContenidos[i].vcNomArchivo_Dec;
                    } else {
                        vcRutaCondiciones = "";
                    }
                    condiciones();
                    acuerdo = false;
                    $("#chk-acuerdo").prop('checked', false);
                    $("#chk-desacuerdo").prop('checked', false);
                    $("input:checkbox,input:radio,input:file").uniform();
                    $("#btnSiguiente").button("option", "disabled", true);
                    fnDesactivarSiguientesVentanas();
                }
            }
        }
    }


    function listarContenidosPorTipoSol(TipoSolicitud, inPestanaBusqueda) {
        permiteLinea = false;
        $.ajax({
            type: "POST",
            url: "Adm_NuevaSolicitud.aspx/ListarContenidos",
            data: "{'inTipSol': '" + TipoSolicitud + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (inPestanaBusqueda == 1) { //Condiciones
                    fnActualizarCondiciones(result.d);
                } else if (inPestanaBusqueda == 0) { //Todo
                    var k = 0;
                    for (k = 0; k < arContenidos.length; k++) {
                        removerTab(arContenidos[k].contenido);
                    }
                    arContenidos = [];
                    arIndexTabMostrados = [];
                    if ($(result.d).length > 0) {
                        for (i in result.d) {
                            //eval("arContenidos." + result.d[i].Nombre + " = [];")
                            //eval('arContenidos.' + result.d[i].Nombre + '.push({ "titulo": result.d[i].Titulo, "contenido": result.d[i].Nombre, "obligatorio": result.d[i].Oblig, "capturaCompleta": false });
                            //arContenidos.ABC.titulo

                            //JHERRERA 20150311: Nueva configuración (botón refrescar)
                            //--------------------------------------------------------
                            var biRefrescar = false;
                            if (result.d[i].btBotRef == "True") { biRefrescar = true; }
                            //--------------------------------------------------------

                            if (result.d[i].Oblig == 'True') {
                                if (result.d[i].Nombre == 'Servicios' || result.d[i].Nombre == 'Galeria') {
                                    arContenidos.push({ "titulo": result.d[i].Titulo, "contenido": result.d[i].Nombre, "obligatorio": true, "capturaCompleta": true, "mostrarRefrescar": biRefrescar });
                                } else {
                                    arContenidos.push({ "titulo": result.d[i].Titulo, "contenido": result.d[i].Nombre, "obligatorio": true, "capturaCompleta": false, "mostrarRefrescar": biRefrescar });
                                }
                            } else {
                                arContenidos.push({ "titulo": result.d[i].Titulo, "contenido": result.d[i].Nombre, "obligatorio": false, "capturaCompleta": true, "mostrarRefrescar": biRefrescar });
                                //if (result.d[i].Nombre == 'Condiciones') {
                                //    arContenidos.push({ "titulo": result.d[i].Titulo, "contenido": result.d[i].Nombre, "obligatorio": true, "capturaCompleta": false });
                                //    acuerdo = false;
                                //} else {
                                //    arContenidos.push({ "titulo": result.d[i].Titulo, "contenido": result.d[i].Nombre, "obligatorio": false, "capturaCompleta": true });
                                //};
                            }
                            if (result.d[i].Nombre == 'Planes') {
                                permiteLinea = true;
                            }
                            if (result.d[i].Nombre == 'Condiciones') {
                                if (result.d[i].vcNomArchivo_Dec != "") {
                                    tieneContrato = true;
                                    vcRutaCondiciones = "P_Movil/Administrar/Temporal/Solicitudes/" + CarpetaDiminio + "/" + result.d[i].vcNomArchivo_Dec;
                                } else {
                                    vcRutaCondiciones = "";
                                }
                            }
                            if (result.d[i].Nombre == 'Mensaje') {
                                MensajeValidTipo = result.d[i].vcTamTip_Msj;
                                MensajeValidCant = result.d[i].inTamaño_Msj;
                            }
                            if (result.d[i].Nombre == 'DocAdjuntos') {
                                AdjuntosCantidad = result.d[i].inCanTot_Adj;
                                AdjuntosExtensiones = result.d[i].vcExtPer_Adj;
                                AdjutnosTamanoTipo = result.d[i].vcTamTip_Adj;
                                AdjuntosTamanoMedida = result.d[i].vcTamMed_Adj;
                                AdjuntosTamanoMaxNum = result.d[i].dcTamaño_Adj;
                                $("#ifDocAdjuntos").attr("src", "Adm_AdjuntarArchivos.aspx?pagOri=NuevaSolicitud&estSol=0&CanMax=" + AdjuntosCantidad + "&ExtPer=" + AdjuntosExtensiones + "&TamTip=" + AdjutnosTamanoTipo + "&TamMax=" + AdjuntosTamanoMaxNum + "&TamMed=" + AdjuntosTamanoMedida);
                                $("#lblAdjuntosValidCantidad").text(AdjuntosCantidad == '0' || AdjuntosCantidad == '' ? 'Sin límite' : AdjuntosCantidad);
                                $("#lblAdjutnosValidExtensiones").text(AdjuntosExtensiones != '' ? AdjuntosExtensiones : 'Todas');
                                if (AdjutnosTamanoTipo == '' || AdjuntosTamanoMaxNum == '' || AdjuntosTamanoMaxNum == '0' || AdjuntosTamanoMedida == '') { //no configurado o permisivo
                                    $("#lblAdjutnosValidTamanoMax").text('Sin límite');
                                } else {
                                    $("#lblAdjutnosValidTamanoMax").text(FormatoNumero(AdjuntosTamanoMaxNum, oCulturaLocal, true) + " " + AdjuntosTamanoMedida + " (" + (AdjutnosTamanoTipo == 't' ? 'Total' : 'Individual') + ")");
                                }
                            }
                        }
                    }
                    var idx = -1;
                    var i = 0;
                    for (i = 0; i < arContenidos.length; i++) {
                        contenidoTab = arContenidos[i].contenido;
                        creartab(arContenidos[i].contenido, arContenidos[i].titulo);
                        idx = idx + 1;
                        if (idx != 0) { arIndexTabMostrados.push(idx); }
                    }
                    tbSolicitud.tabs("option", "disabled", arIndexTabMostrados);
                    if (arContenidos.length == 1) {
                        $("#btnAtras").hide();
                        $("#btnSiguiente").hide();
                        $("#dvCreacionEstado").show();
                        $("#btnFinalizar").show();
                    } else {
                        $("#btnAtras").hide();
                        $("#btnSiguiente").show();
                        $("#dvCreacionEstado").hide();
                        $("#btnFinalizar").hide();
                    }

                    //JHERRERA 20150311: Nueva confiuración (botón refrescar)
                    //-------------------------------------------------------
                    try {
                        var tabSelection = tbSolicitud.tabs('option', 'selected');
                        //                if (arContenidos[0].mostrarRefrescar) {
                        if (arContenidos[tabSelection].mostrarRefrescar) {
                            $('#btnRefrescar').show();
                        } else {
                            $('#btnRefrescar').hide();
                        }
                    } catch (e) {
                        $('#btnRefrescar').hide();
                    }

                    //-------------------------------------------------------

                    //if (TipoSolicitud == "4") { // Solicitud Nuevo
                    //    $("#grillaDispositivos thead [data-field=plan] .k-link").html("Plan / Cuenta de línea")
                    //}else{
                    //    $("#grillaDispositivos thead [data-field=plan] .k-link").html("Plan")
                    //}
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
    //SET TABS
    //var arIndexTabMostrados = [];
    //var arTabMostrados = [];
    //    $("#ddlTipoSolicitud").change(function () {
    $("#ddlTipoSolicitud").live("change", function () {
        //        $("#lblMensajeVerificacion").html("");

        $("#Span1").css("display", "inline-block");  //Edgar Garcia 14022023
        $("#LabelDescripcion").css("display", "inline-block");//Edgar Garcia 14022023

        fnChange();
    }); //FIN SET TABS

    //BOTONES NAVEGACION
    $("#btnSiguiente").click(function () {
        $("#lblMensajeVerificacion").html("");
        var tipoSolicitud = $("#ddlTipoSolicitud").data("kendoComboBox").value();
        var tabSelection = tbSolicitud.tabs('option', 'selected');
        var tabMostrado = arContenidos[tabSelection].contenido;

        ultimoTab = arContenidos[tabSelection + 1].contenido;
        //if (tabMostrado == "Dispositivos" && (tipoSolicitud == "6" || tipoSolicitud == "7")) {
        //    CargarServiciosActuales($("#hdfLineaSel").val());
        //    if (tipoSolicitud == "6") { listarTipoServicio($("#hdfCuentaLinea").val(), $("#hdfLineaSel").val()); };
        //};

        if (arContenidos[tabSelection + 1].contenido == "Condiciones" || arContenidos[tabSelection + 1].contenido == "Planes") {
            $("#btnSiguiente").button("option", "disabled", true);
        }
        if (arContenidos[tabSelection].contenido == "Condiciones") {
            if (!acuerdo) {
                alerta("Debe aceptar las condiciones para poder continuar.");
                $("#btnSiguiente").button("option", "disabled", true);
                ultimoTab = arContenidos[tabSelection].contenido;
                return;
            }
        }
        //if (arContenidos[tabSelection].contenido == "Planes") { //comentado wapumayta 19/08/2014 - la pestaña plan ya no es requerida como obligatoria
        //    if ($("#hdfCodPlan").val() == '' || $("#hdfCodPlan").val() == undefined || $("#hdfCodPlan").val() == null) {
        //        alerta("Debe seleccionar un plan antes de continuar.");
        //        $("#btnSiguiente").button("option", "disabled", true);
        //        ultimoTab = arContenidos[tabSelection].contenido;
        //        return;
        //    };
        //};
        //if (arContenidos[tabSelection].contenido = 'Dispositivos') {
        //    $("#hdfCodImeiSel").val(codIMEITemp);
        //};
        //if (arContenidos[tabSelection + 1].contenido == "Galeria") {
        //    $("#ifGaleria").attr("src", "");
        //    var permLIn = permiteLinea ? '1' : '0';
        //    var codPlanSel = $("#hdfCodPlanSel").val();
        //    //alert(codPlanSel);
        //    $("#ifGaleria").attr("src", "Adm_GaleriaModDispositivos.aspx?vcCodEmp=" + $("#hdfCodEmpleado").val() + "&tipSol=" + tipoSolicitud + "&lin=" + permLIn + "&plan=" + codPlanSel);
        //};
        if (tabMostrado == "Galeria") {
            //var modelo = $("#ifGaleria")[0].contentWindow.enviarCodMod();
            var modelo = codDispTemp;
            var conLinea = $("#ifGaleria")[0].contentWindow.conLinea();
            //alert("permiteLinea: " + permiteLinea + "\nconLinea: " + conLinea + "\ntabPlanesVisible: " + tabPlanesVisible);
            //if ($("#hdfCodModDis").val() != modelo) {
            //    $("#ddlOperador").data("kendoComboBox").select(0);
            //    $("#ddlPlan").data("kendoComboBox").select(0);
            //    $("#ddlPlan").data("kendoComboBox").enable(false);
            //    $("#trDetalle").hide();
            //    setCaptura('Planes', false);
            //};
            //$("#hdfCodModDis").val(modelo);
            //------
            if (permiteLinea && conLinea == 0) { //tiposol permite seleccion de plan && no se solicita disp con plan
                $("#MsgConfirmacionAvance").dialog({
                    title: "Confirmación",
                    modal: true,
                    buttons: {
                        "Si": function () {
                            $(this).dialog("close");
                            //seguir sin solcitar linea
                            if (tabPlanesVisible == true) {
                                removerTab("Planes");
                                arContenidos = jQuery.grep(arContenidos, function (value) { return value.contenido != 'Planes'; });
                                tabPlanesVisible = false;
                            }
                            arIndexTabMostrados = jQuery.grep(arIndexTabMostrados, function (value) { return value != tabSelection + 1; });
                            tbSolicitud.tabs("option", "disabled", arIndexTabMostrados);
                            tbSolicitud.tabs('option', 'selected', tabSelection + 1);
                            $("#hdfCodModDis").val(codDispTemp);
                            $("#ifGaleria")[0].contentWindow.desactivarCheckLinea();
                        },
                        "No": function () {
                            $(this).dialog("close");
                            $("#btnSiguiente").button("option", "disabled", false);
                        }
                    },
                    resizable: false
                });
            } else if (permiteLinea && conLinea == 1) { //tiposol permite seleccion de plan && se solicita disp con plan
                if (!tabPlanesVisible) { //tabPlanes eliminado, volver a crear
                    //contenidoTab = "Planes";
                    //arContenidos.push({ contenido: "Planes", titulo: "Planes" });
                    //arIndexTabMostrados.push(arContenidos.length - 1);
                    //creartab("Planes", "Planes");
                    tabPlanesVisible = true;
                    //arIndexTabMostrados = jQuery.grep(arIndexTabMostrados, function (value) { return value != tabSelection + 1; });
                    //tbSolicitud.tabs("option", "disabled", arIndexTabMostrados);
                    //tbSolicitud.tabs('option', 'selected', tabSelection + 1);
                }
                arIndexTabMostrados = jQuery.grep(arIndexTabMostrados, function (value) { return value != tabSelection + 1; });
                tbSolicitud.tabs("option", "disabled", arIndexTabMostrados);
                tbSolicitud.tabs('option', 'selected', tabSelection + 1);
            } else if (!permiteLinea) { // tiposol no permite seleccion de plan
                arIndexTabMostrados = jQuery.grep(arIndexTabMostrados, function (value) { return value != tabSelection + 1; });
                tbSolicitud.tabs("option", "disabled", arIndexTabMostrados);
                tbSolicitud.tabs('option', 'selected', tabSelection + 1);
            } else if (permiteLinea && conLinea == 2) { //tiposol permite seleccion plan && dispositivo seleccionado no soporta linea
                //alerta("eliminar tab planes");
                if (tabPlanesVisible == true) {
                    //removerTab("Planes");
                    //arContenidos = jQuery.grep(arContenidos, function (value) { return value.contenido != 'Planes' });
                    arIndexTabMostrados.push(1);
                    tabPlanesVisible = false;
                }
                arIndexTabMostrados = jQuery.grep(arIndexTabMostrados, function (value) { return value != tabSelection + 2; });
                tbSolicitud.tabs("option", "disabled", arIndexTabMostrados);
                tbSolicitud.tabs('option', 'selected', tabSelection + 2);
            }
        } else {
            arIndexTabMostrados = jQuery.grep(arIndexTabMostrados, function (value) { return value != tabSelection + 1; });
            tbSolicitud.tabs("option", "disabled", arIndexTabMostrados);
            tbSolicitud.tabs('option', 'selected', tabSelection + 1);

            if (arContenidos[tabSelection + 1].contenido == "Condiciones" && !acuerdo) {
                $("#btnSiguiente").button("option", "disabled", true);
            }
        }
        if (arContenidos[tabSelection + 1].contenido == "Planes") {
            $("#lblOperadorLinea").text($("#hdfNombreOperador").val());
            $("#lblLineaAmp").text($("#hdfLineaSel").val());
            $("#lblPlanActual").text($("#hdfPlanLineaSel").val());
            //if (tipoSolicitud == 7) {
            //    //alerta("LISTAR PLANES");
            //    listarPlanes(true);
            //}
            //if (tipoSolicitud != 7) {
            //    codOpeAutoCompPlanes = $("#ddlOperador").data("kendoComboBox").value();
            //} else {
            //    codOpeAutoCompPlanes = $("#hdfCodigoOperador").val();
            //};
        }
        if (arContenidos[tabSelection + 1].contenido == "Servicios") {
            cargarServicios_x_Grupo();
        }
        //if (arContenidos[tabSelection + 1].contenido == "Resumen") {
        //    resumen();
        //}
    });
    $("#btnAtras").click(function () {
        var tabSelection = tbSolicitud.tabs('option', 'selected');
        var tabMostrado = arContenidos[tabSelection].contenido;
        if (tabMostrado == 'Mensaje') {
            if (tabPlanesVisible) {
                tbSolicitud.tabs('option', 'selected', tbSolicitud.tabs('option', 'selected') - 1);
            } else {
                tbSolicitud.tabs('option', 'selected', tbSolicitud.tabs('option', 'selected') - 2);
            }
        } else {
            tbSolicitud.tabs('option', 'selected', tbSolicitud.tabs('option', 'selected') - 1);
        }


    });
    $("#btnFinalizar").click(function () {
        //validar la aceptación del acuerdo (Declaración)
        var i = 0;
        for (i = 0; i < arContenidos.length; i++) {
            if (arContenidos[i].contenido == 'Condiciones') {
                if (!arContenidos[i].capturaCompleta) {
                    alerta('Debe aceptar los términos y condiciones de la solicitud en la pestaña "' + arContenidos[i].titulo + '".');
                    return;
                }
            }

            else if (arContenidos[i].contenido == 'Mensaje') {
                if (!arContenidos[i].capturaCompleta) {
                    alerta('Debe ingresar el contenido del mensaje en la pestaña "' + arContenidos[i].titulo + '".');
                    return;
                }
            }
        }
        //ACCION FINAL
        //$("#ddlTipoSolicitud").change();
        //alerta("Envio de solicitud tipo " + $("#ddlTipoSolicitud").data("kendoComboBox").value());

        const usuarioMultipleEspecialista = $("#hdfSolicitudMultipleEspecialista").val() === 'True';



        if ($("#ddlEstadoCreacion").val() == "33" || $("#ddlEstadoCreacion").val() == "34") {
            if ($("#ddlEstadoCreacion").val() == "33") {
                $("#lblMsjConfirmacion").text("La solicitud se creará con estado 'Por Aprobar' e iniciará su ciclo respectivo. ¿Está seguro de crearla con dicho estado?");
            }
            else
                $("#lblMsjConfirmacion").text("La solicitud se creará con estado 'Aprobada' y estará a la espera de ser procesada por un especialista.");


            var tipsol = $("#ddlTipoSolicitud").data("kendoComboBox").value();

            if (biEsPer) {
                if ($("#hdfEsCulminada").val() == "1") {
                    $("#lblMsjConfirmacion").text("¡Atención!, Este proceso no podrá ser revertido y si la solicitud tiene un monto mayor a 0, se generará un cronograma de pagos para el empleado de la solicitud. ¿Desea continuar?");
                }

                if (usuarioMultipleEspecialista) {
                    $("#lblMsjConfirmacion").text("Con esta acción, la solicitud se creará e iniciará el ciclo de atención. ¿Está seguro que desea continuar?");
                }

                fnFinalizar();
            } else {

                if (usuarioMultipleEspecialista) {
                    $("#lblMsjConfirmacion").text("Con esta acción, la solicitud se creará e iniciará el ciclo de atención. ¿Está seguro que desea continuar?");
                }

                $('#divMsgConfirmar').dialog({
                    title: "¡Alerta!",
                    modal: true,
                    width: 330,
                    buttons: {
                        "Si": function () {
                            fnFinalizar();
                            $(this).dialog("close");
                        },
                        "Cancelar": function () {
                            $(this).dialog("close");
                        }
                    }
                });
            }
        } else {
            $("#lblMsjConfirmacion").text("");
            fnFinalizar();
        }

    }); //FIN BOTONES NAVEGACION

    function fnFinalizar() {
        var biPers = "0";
        var tipsol = $("#ddlTipoSolicitud").data("kendoComboBox").value();
        var nTipSol = "es" + tipsol;
        if (arTiposSolicitud[nTipSol].biPersonalizado == 'True') { biPers = '1'; }
        var tipsol = $("#ddlTipoSolicitud").data("kendoComboBox").value();
        switch (tipsol) {
            case "1":
                EnviarSolicitudCambio();
                break;
            case "2":
                EnviarSolicitudNuevo();
                break;
            case "3":
                EnviarSolicitudReposicion();
                break;
            case "4":
                EnviarSolicitudReparacion();
                break;
            //case "6":
            //    EnviarSolicitudActivacion();
            //    break;
            //case "7":
            //    EnviarSolicitudAmpliacion();
            //    break;
            default:
                if (biPers == "0") {
                    alerta("No se pudo completar en envío");
                }
                else {
                    EnviarSolicitudPersonalizada();
                }
        }
    }

    //OTROS BOTONES
    //CANCELAR
    $("#btnCancelar").live("click", function () {
        //CerroMensaje3();
        CerroMensaje2();
    });

    //NAVEGACION PESTAÑAS
    //$(".ui-state-default").click(function () {
    //    alerta("0870");
    //});

    //BOTON EQUPO SOLICITADO
    $("#btnEquiSol").click(function () {
        //var tipSol = $("#ddlTipoSolicitud").data("kendoComboBox").value(); //comentado 26-11-2014 wapumayta (2674)
        var tipSol = '0'; // 0 = muestra las soliditudes pendientes de todos los tipos
        var vcCodEmp = $("#hdfCodEmpleado").val();
        var vcNumLin = $("#hdfLineaSel").val();
        var codIMEI = tipSol == '4' ? codDispTemp : codIMEITemp;
        //alert(vcCodEmp + "\n" + vcNumLin + "\n" + codIMEI + "\n" + tipSol);
        var v_Width = 0;
        var v_Height = 0;
        $.ajax({
            type: "POST",
            //url: "Adm_SolicitarDispositivo.aspx/ObtenerCodigoModelo",
            url: "Adm_NuevaSolicitud.aspx/DetalleSolicitud_Equipo",
            data: "{'vcCodEmp': '" + vcCodEmp + "'," +
                "'vcCodIMEI': '" + codIMEI + "'," +
                "'vcTipSol': '" + tipSol + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var oSolicitud = result.d[0];
                var date = new Date(parseInt(oSolicitud.dtFecSol.slice(6, -2)));
                var fechaSol = date.getDate() + "/" + (parseInt(date.getMonth()) + 1).toString() + "/" + date.getFullYear();

                $("#txtCodigo").val(oSolicitud.vcCodigo);
                $("#txtTipo").val(oSolicitud.TipoSolicitud.vcNomTipSol);
                $("#txtFechaCreacion").val(fechaSol);
                $("#txtEstadoActual").val(oSolicitud.Estado.vcNom);
                if (oSolicitud.inTipSol == "2") { //solicitud de nuevo equipo
                    $("#dvModeloSolicitado").show();
                    $("#ifEquipoSolic").attr("src", "Mantenimiento/Mnt_NuevoDispositivo.aspx?CodDis=" + oSolicitud.inCodModDis + "&inTipSol=2");
                    v_Width = 505;
                    v_Height = 420;
                } else {
                    $("#dvModeloSolicitado").hide();
                    v_Width = 425;
                    v_Height = 180;
                }
                $("#divDispSolicitado").dialog({
                    title: "Datos Solicitud",
                    width: v_Width,
                    height: v_Height,
                    modal: true,
                    resizable: false
                });
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });
    //FIN BOTON EQUIPO SOLICITADO

    //autocompletar empleado
    if ($("#txtEmpleado").length > 0) {
        var Selecciono = false;
        $("#txtEmpleado").autocomplete({
            minLength: 0,
            source: function (request, response) {
                $.ajax({
                    type: "POST",
                    url: "Adm_NuevaSolicitud.aspx/ListarEmpleados",
                    data: "{'inMaxFil': '" + 200 + "'," +
                        "'vcNomEmp': '" + $("#txtEmpleado").val().replace(/'/g, "&#39").replace(/\\/g, "&#92") + "'," +
                        "'inTipLin': '" + 1 + "'}", //inTipLin = 1 (empleados que perteneces a un grupo con tipo de linea staff)
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        if (result.d.length == 0) {
                            $("#hdfCodEmpleado").val('');
                            $("#hdfGrupOrigEmp").val('');
                            //$("#ddlTipoSolicitud").data("kendoComboBox").enable(false);
                            fnLimpiarTipoSolicitud(false, false);
                        }
                        //alert(result.d[0]);
                        //var item = result.d[0].split('-');
                        response($.map(result.d, function (item) {
                            //var itemE = item.split("-");
                            var itemE = item.split("|");    //ECONDEÑA  20160801
                            return {
                                label: itemE[1],
                                vcCodEmp: itemE[0],
                                grupOri: itemE[2]
                            };
                        }));
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },
            focus: function (event, ui) {
                $("#txtEmpleado").val(ui.item.label);
                //alert(3);
                return false;
            },
            select: function (event, ui) {
                Selecciono = true;
                $("#txtEmpleado").val(ui.item.vcCodEmp + " - " + ui.item.label);
                $("#hdfCodEmpleado").val(ui.item.vcCodEmp);
                $("#hdfGrupOrigEmp").val(ui.item.grupOri);
                //                $("#ddlTipoSolicitud").data("kendoComboBox").value(-1);
                //                $("#ddlTipoSolicitud").data("kendoComboBox").enable(true);

                fnValidarListarTipoSolicitudXGrupoEmpleado();

                return false;
            },
            change: function (event, ui) {
                if (!Selecciono) {
                    $("#hdfCodEmpleado").val("");
                    $("#txtEmpleado").val("");
                    $("#hdfGrupOrigEmp").val("");
                    fnValidarListarTipoSolicitudXGrupoEmpleado(false, false);
                    //                    $("#ddlTipoSolicitud").data("kendoComboBox").select("-1");
                    //                    $("#ddlTipoSolicitud").data("kendoComboBox").enable(false);
                    $("#dvTabs").hide();
                    $("#lblMensajeVerificacion").text('');
                    $("#btnEquiSol").hide();
                    $("#dvCreacionEstado").hide();
                }
                return false;
            },
            open: function (event, ui) {
                Selecciono = false;
                return false;
            }
        }).data("autocomplete")._renderItem = function (ul, item) {
            return $("<li></li>")
                .data("item.autocomplete", item)
                .append("<a>" + item.vcCodEmp + "=" + item.label + "</a>")
                .appendTo(ul);
        };
    }
    //fin autocompletar empleado

    //detalle de financiamiento
    $("#imgInfoFinanciamiento").live("click", function () {
        var wAncho = $(window).width();
        var wAlto = $(window).height();
        $("#ifInfoFinanciamiento").attr("width", 550);
        $("#ifInfoFinanciamiento").attr("height", wAlto - 100);
        $("#ifInfoFinanciamiento").attr("src", "Mantenimiento/Cam_Mnt_Financiamiento.aspx?Cod=" + $("#hdfIdFInanciamiento").val() + "&FinancSit=0");

        $('#divInfoFinanciamiento').dialog({
            title: "Detalle de Financiamiento",
            width: 575, //  690,
            height: wAlto - 50, //430,
            modal: true,
            resizable: false,
            buttons: {
                "Cerrar": function () {
                    $(this).dialog("close");
                }
            }
        });
    });

    $("#imgAgregarPaquete").live("click", function () {
        if ($("#ddlAmpPaquetes").val() == "-2" || $("#ddlAmpPaquetes").val() == "-1" || $("#ddlAmpPaquetes").val() == "-3") {
            if ($("#ddlAmpPaquetes").val() == "-3") {
                alerta("Seleccione un servicio.");
            } else if ($("#ddlAmpPaquetes").val() == "-2") {
                alerta("No hay paquetes para el servicio seleccinado.");
            } else if ($("#ddlAmpPaquetes").val() == "-1") {
                alerta("Seleccione un paquete.");
            }
            return;
        }
        if ($("#hdfAmpCodIlimitado").val() == "true") {
            alerta("No puede ampliar un servicio Ilimitado.");
            return;
        }
        var ids = tbAmpPaquetes.getDataIDs();
        var idsExists = false;
        var vOpcion = $("#ddlAmpPaquetes option[value='" + $("#ddlAmpPaquetes").val() + "']");
        var DatosPaquete = {
            P_inCod: $("#hdfAmpCodServ").val(),
            vcNom: $("#lblAmpNombreServ").text(),
            vcNomPaqAmp: vOpcion.attr("nombre"),
            vcCant: $("#ddlAmpPaquetes").val() + " " + vOpcion.attr("medida"),
            vcCantReal: $("#ddlAmpPaquetes").val(),
            dcCosto: vOpcion.attr("costo"),
            dcCostoReal: vOpcion.attr("costo"),
            inTipoServ: $("#hddAmpTipoServicio").val(),
            inCodPaqAmp: vOpcion.attr("IdPaqAmp")
        };
        if (ids.length > 0) {
            $.each(ids, function () {
                if (this == $("#hdfAmpCodServ").val()) {
                    idsExists = true;
                }
            });
            if (idsExists) {
                $("#lblMsjConfirmUpdPaquete").text("El paquete '" + DatosPaquete.vcNom + "' ya existe, ¿Desea editarlo?");
                $("#divMsgConfirmarPaquete").dialog({
                    title: "Confirmación",
                    modal: true,
                    buttons: {
                        "Si": function () {
                            $("#tbAmpPaquetes").jqGrid('delRowData', $("#hdfAmpCodServ").val());

                            $("#tbAmpPaquetes").jqGrid('addRowData', $("#hdfAmpCodServ").val(), DatosPaquete);
                            fnLimpiarDatosServicio();

                            setCaptura("Paquetes", true);
                            valAvance = true;
                            HabilitarContinuar();
                            $(this).dialog("close");
                        },
                        "No": function () {
                            $(this).dialog("close");
                        }
                    }
                });
            } else {
                $("#tbAmpPaquetes").jqGrid('addRowData', $("#hdfAmpCodServ").val(), DatosPaquete);
                fnLimpiarDatosServicio();

                setCaptura("Paquetes", true);
                valAvance = true;
                HabilitarContinuar();
            }
        } else {
            $("#tbAmpPaquetes").jqGrid('addRowData', $("#hdfAmpCodServ").val(), DatosPaquete);
            fnLimpiarDatosServicio();

            setCaptura("Paquetes", true);
            valAvance = true;
            HabilitarContinuar();
        }
    });
    $("#imgQuitarPaquete").live("click", function () {
        var id = $("#tbAmpPaquetes").jqGrid('getGridParam', 'selrow');
        if (id) {
            $("#tbAmpPaquetes").jqGrid('delRowData', id);
            //validar avance
            var ids = tbAmpPaquetes.getDataIDs();
            if (ids.length == 0) {
                setCaptura("Paquetes", false);
                valAvance = false;
                HabilitarContinuar();
            }
        } else {
            alerta("Seleccione un paquete de la grilla.");
        }
    });

    //paquetes ampliacion
    $(".imgAmpliar").live("click", function () {
        var id = $(this).attr("id").split("-")[1];
        var datos = $("#tblServicio").jqGrid('getRowData', id);
        $("#hdfAmpCodServ").val(id);
        if (datos.dcCan == 'Ilimitado') {
            $("#hdfAmpCodIlimitado").val('true');
        } else {
            $("#hdfAmpCodIlimitado").val('false');
        }
        $("#hddAmpTipoServicio").val(datos.inCodTipDat);
        if (datos.inCodTipDat == "1") {
            MostrarPaquetesPorTipoServ(datos.inCodTipSer);
        } else {
            MostrarPaquetesPorTipoServ(datos.P_inCod);
        }
        $("#lblAmpNombreServ").text(datos.vcNom);
    });

    $("#ddlTipoServicioAmp").live("change", function () {
        var id = $("#ddlTipoServicioAmp").val();
        $("#ddlServCuentaTipo").html('');
        $("#ddlServCuentaTipo").append($("<option></option>").val('-1').text('<Seleccione>'));
        var bExisteServicio = false;
        var i = 0;
        for (i = 0; i < lstServiciosCuenta.length; i++) {
            if (lstServiciosCuenta[i].TipoServicio.P_inCod == id) {
                $("#ddlServCuentaTipo").append($("<option></option>").val(lstServiciosCuenta[i].inCodTipDat + "-" + lstServiciosCuenta[i].P_inCod).text(lstServiciosCuenta[i].vcNom));
                bExisteServicio = true;
            }
        }
        if (!bExisteServicio) {
            $("#ddlServCuentaTipo").html('');
            $("#ddlServCuentaTipo").append($("<option></option>").val('-3').text('No hay servicios'));
        }
    });
    $("#ddlServCuentaTipo").live("change", function () {
        var id = $(this).val().split("-");
        var nm = $("#ddlServCuentaTipo option[value=" + $(this).val() + "]").text();
        $("#lblAmpNombreServ").text(nm);
        $("#hdfAmpCodServ").val(id[1]);
        $("#hddAmpTipoServicio").val(id[0]);
        if (id[0] == 1) {
            MostrarPaquetesPorTipoServ($("#ddlTipoServicioAmp").val(), id[1]);
        } else {
            MostrarPaquetesPorTipoServ(id[1], 0);
        }
    });

    fnValidarListarTipoSolicitudXGrupoEmpleado();

    /*Edgar Garcia 10022023*/
    $('.tooltip-element').hover(function () { 
        var title = $(this).attr('title'); 
        $(this).attr('title', ''); 
        $(this).append('<span class="tooltip" style="white-space: pre-wrap;">' + title + '</span>');
    }, function () { 
        $(this).attr('title', $('.tooltip').html()); 
        $(this).children('.tooltip').remove();
    }).mousemove(function (e) { 
        var mousex = e.pageX + 20;
        var mousey = e.pageY + 10;
        $('.tooltip').css({ top: mousey, left: mousex });
    });


});
//FIN INICIO

function creartab(idtab, titulo) {
    //var heightId = parseInt($("#tbSolicitud")[0].clientHeight) - 40;
    var heightId = parseInt($("#tbSolicitud").css("height").split(".")[0]) - 35;
    var Id = '#tab' + idtab;
    var $panel = tbSolicitud.find(Id);
    if (!$panel.length) {//En el caso que no exista el tab, lo crea
        tbSolicitud.tabs("add", Id, titulo);
        $(Id).css("width", "99%");
        $(Id).css("height", heightId);
        $(Id).css("margin-top", "0px");
        $(Id).css("margin-left", "0px");
        $(Id).css("margin-bottom", "0px");
        $(Id).css("margin-right", "0px");
        $(Id).css("padding-top", "0px");
        $(Id).css("padding-left", "0px");
        $(Id).css("padding-bottom", "0px");
        $(Id).css("padding-right", "0px");
        $(Id).css("overflow", "auto");
    }
}

function removerTab(idtab) {
    var Id = '#tab' + idtab;
    var $panel = tbSolicitud.find(Id);
    if ($panel.length) {//En el caso que exista el tab, lo elimina
        tbSolicitud.tabs("remove", Id);
    }
}

function fnLimpiarTipoSolicitud(biSetDef, biHayDatos) {
    if ($("#hdfDefTipoSolicitud").val() == "") {
        $("#ddlTipoSolicitud").data("kendoComboBox").value(""); //-1
        if (biHayDatos) {
            $("#ddlTipoSolicitud").data("kendoComboBox").enable(true);
        } else {
            $("#ddlTipoSolicitud").data("kendoComboBox").enable(false);
        }
    } else {
        $("#ddlTipoSolicitud").data("kendoComboBox").enable(false);
        if (biSetDef) {
            $("#ddlTipoSolicitud").data("kendoComboBox").value($("#hdfDefTipoSolicitud").val());
            fnChange();
        } else {
            $("#ddlTipoSolicitud").data("kendoComboBox").value(""); //-1
        }
    }
}

function fnChange() {

    var tipsol = $("#ddlTipoSolicitud").data("kendoComboBox").value();

    /*Edgar Garcia 12022023 Agregar Descripcion Solicitud*/

    let FindDescpSol = JSON.parse($("#LstDescripcionSol").val()).filter(function (obj) {
        return obj.NumSol == tipsol;
    });
    let desc = FindDescpSol[0].DescripSol
 
    ResizeEtiquetaDescSol(desc)
    /*----------------------------------------------*/
      
    if (tipsol == "2") { // Solicitud Nuevo
        VerificaHabilitadoEmpleado($("#hdfCodEmpleado").val());
    }
    if (tipsol != "1" || tipsol != "2" || tipsol != "3" || tipsol != "4" || tipsol != "6" || tipsol != "7") {
        biEsPer = true;
    }

    LimpiarDatosFinanciamiento();
    $("#btnEquiSol").hide();
    $("#lblMensajeVerificacion").text('');
    arServiciosActuales = [];
    $("#btnSiguiente").button("option", "disabled", true);

    var index = $("#ddlTipoSolicitud").data("kendoComboBox").select();
    $("#hdfTipoSolicitud").val(tipsol);
    //temp && hiddens
    codDispTemp = '';
    codIMEITemp = '';
    $("#hdfCodModDis").val('');
    $("#hdfCodImeiSel").val('');
    var nTipSol = "es" + tipsol;
    //---

    if (tipsol != "-1") {
        var biPers = "0";
        if (arTiposSolicitud[nTipSol].biPersonalizado == 'True') { biPers = '1'; }

        //Validación de que esté configurado el responsable de aprobación
        if (arTiposSolicitud[nTipSol].vcResponsable == "" && arTiposSolicitud[nTipSol].biPropie == "False" && arTiposSolicitud[nTipSol].biUsuEsp == "False" && arTiposSolicitud[nTipSol].biResAre == "False") {
            if ($("#hdfAdmin").val() == "1") {
                alerta("Este tipo de solicitud no tiene asignado un responsable de aprobación, modificar la configuración respectiva.");
            }
            else {
                alerta("Este tipo de solicitud no está configurado, comuníquese con su administrador.");
            }
            return;
        }
        //Validación de que esté configurado el técnico asignado
        if (arTiposSolicitud[nTipSol].inTecnicoResponsable == "") {
            if ($("#hdfAdmin").val() == "1") {
                alerta("Este tipo de solicitud no tiene asignado un especialista responsable, modificar la configuración respectiva.");
            }
            else {
                alerta("Este tipo de solicitud no está configurado, comuníquese con su administrador.");
            }
            return;
        }

        if (biPers == "0") { //Solicitudes de Sistema
            //tipo de solicitudes del sistemas que requieres financiamiento y no lo tienen
            //JHERRERA 19/08/2014 Se quitó validación por requerimiento tfs 1646
            //if (arTiposSolicitud[nTipSol].inTipoFinanciamiento == '0') {
            //    if ($("#hdfAdmin").val() == "1") {
            //        alerta("Este tipo de solicitud requiere una forma de pago válida, modificar la configuración respectiva.");
            //    } else {
            //        alerta("Este tipo de solicitud no está configurado, comuníquese con su administrador.");
            //    }
            //    $("#lblMensajeVerificacion").text('');
            //    $("#dvTabs").hide();
            //    return;
            //}

            //if (arTiposSolicitud[nTipSol].inTipoFinanciamiento == '0') {
            //    $("#divFinanciamiento").hide();
            //}

            listarContenidosPorTipoSol(tipsol, 0);
            //DatosFinanciamiento(tipsol);
            $("#dvTabs").show();
        } else { //Solicitudes Personalizadas
            if ($("#hdfEsCulminada").val() == "1") {
                fnValidarPermisosCreacionCulminada(tipsol);
            } else {
                listarContenidosPorTipoSol(tipsol, 0);
                $("#dvTabs").show();
            }
        }

        //contenido del combo estado de creacion -------------------------------------
        //$("#dvCreacionEstado").show();
        let existeEstadoAprobado = false;
        $("#lblCreacionEstado").text("Seleccione el estado con que se creará la solicitud");
        $("#ddlEstadoCreacion").html("");
        $("#ddlEstadoCreacion").append("<option value='32'>Pendiente</option><option value='33'>Por Aprobar</option>");
        if ($("#hdfAdmin").val() == "1") {// es administrador
            $("#ddlEstadoCreacion").append("<option value='34'>Aprobada</option>");
            existeEstadoAprobado = true;
            //responsables de aprobacion
        } else if (arTiposSolicitud[nTipSol].biPropie == 'True') { //propietario
            existeEstadoAprobado = true;
            $("#ddlEstadoCreacion").append("<option value='34'>Aprobada</option>");
        } else if (arTiposSolicitud[nTipSol].biUsuEsp == 'True' && arTiposSolicitud[nTipSol].vcResponsable != '' && $("#hdfCodEmpleado").val() == arTiposSolicitud[nTipSol].vcResponsable) {//usuario especifico
            //if () { //es usuario especifico
            existeEstadoAprobado = true;
            $("#ddlEstadoCreacion").append("<option value='34'>Aprobada</option>");
            //}
        } else if (arTiposSolicitud[nTipSol].biResAre == 'True' && $("#hdfJefeArea").val() == "1") { //responsable de area
            existeEstadoAprobado = true;
            $("#ddlEstadoCreacion").append("<option value='34'>Aprobada</option>");
        }

        if (existeEstadoAprobado) {
            $("#ddlEstadoCreacion").val("34");//
        }
        else {
            $("#ddlEstadoCreacion").val("33");//
        }
        //fin contenido del combo -------------------------------------
    } else {
        $("#lblMensajeVerificacion").text('');
        $("#dvTabs").hide();
        $("#btnSiguiente").hide();
    }
}

function fnValidarPermisosCreacionCulminada(tipsol) {
    $.ajax({
        type: "POST",
        url: "Adm_NuevaSolicitud.aspx/ValidarPermisosCreacionCulminada",
        data: "{'IdTipoSolicitud': '" + tipsol + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var lstRes = result.d.split(",");

            if (lstRes[0] == "0") {
                $("#lblMensajeVerificacion").html("El usuario no puede crear una solicitud ya que no tiene permisos de aprobación para el tipo de solicitud seleccionado.");
            }
            else if (lstRes[1] == "0") {
                $("#lblMensajeVerificacion").html("El usuario no puede crear una solicitud ya que no tiene permisos de asignación para el tipo de solicitud seleccionado.");
            }
            else if (lstRes[1] == "0") {
                $("#lblMensajeVerificacion").html("El usuario no puede crear una solicitud ya que no tiene permisos para culminar el tipo de solicitud seleccionado.");
            }
            else {
                listarContenidosPorTipoSol(tipsol, 0);
                $("#dvTabs").show();
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function listarContenidosPorTipoSol(TipoSolicitud, inPestanaBusqueda) {
    permiteLinea = false;
    $.ajax({
        type: "POST",
        url: "Adm_NuevaSolicitud.aspx/ListarContenidos",
        data: "{'inTipSol': '" + TipoSolicitud + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (inPestanaBusqueda == 1) { //Condiciones
                fnActualizarCondiciones(result.d);
            } else if (inPestanaBusqueda == 0) { //Todo
                var k = 0;
                for (k = 0; k < arContenidos.length; k++) {
                    removerTab(arContenidos[k].contenido);
                }
                arContenidos = [];
                arIndexTabMostrados = [];
                if ($(result.d).length > 0) {
                    for (i in result.d) {
                        //eval("arContenidos." + result.d[i].Nombre + " = [];")
                        //eval('arContenidos.' + result.d[i].Nombre + '.push({ "titulo": result.d[i].Titulo, "contenido": result.d[i].Nombre, "obligatorio": result.d[i].Oblig, "capturaCompleta": false });
                        //arContenidos.ABC.titulo

                        //JHERRERA 20150311: Nueva configuración (botón refrescar)
                        //--------------------------------------------------------
                        var biRefrescar = false;
                        if (result.d[i].btBotRef == "True") { biRefrescar = true; }
                        //--------------------------------------------------------

                        if (result.d[i].Oblig == 'True') {
                            if (result.d[i].Nombre == 'Servicios' || result.d[i].Nombre == 'Galeria') {
                                arContenidos.push({ "titulo": result.d[i].Titulo, "contenido": result.d[i].Nombre, "obligatorio": true, "capturaCompleta": true, "mostrarRefrescar": biRefrescar });
                            } else {
                                arContenidos.push({ "titulo": result.d[i].Titulo, "contenido": result.d[i].Nombre, "obligatorio": true, "capturaCompleta": false, "mostrarRefrescar": biRefrescar });
                            }
                        } else {
                            arContenidos.push({ "titulo": result.d[i].Titulo, "contenido": result.d[i].Nombre, "obligatorio": false, "capturaCompleta": true, "mostrarRefrescar": biRefrescar });
                            //if (result.d[i].Nombre == 'Condiciones') {
                            //    arContenidos.push({ "titulo": result.d[i].Titulo, "contenido": result.d[i].Nombre, "obligatorio": true, "capturaCompleta": false });
                            //    acuerdo = false;
                            //} else {
                            //    arContenidos.push({ "titulo": result.d[i].Titulo, "contenido": result.d[i].Nombre, "obligatorio": false, "capturaCompleta": true });
                            //};
                        }
                        if (result.d[i].Nombre == 'Planes') {
                            permiteLinea = true;
                        }
                        if (result.d[i].Nombre == 'Condiciones') {
                            if (result.d[i].vcNomArchivo_Dec != "") {
                                tieneContrato = true;
                                vcRutaCondiciones = "P_Movil/Administrar/Temporal/Solicitudes/" + CarpetaDiminio + "/" + result.d[i].vcNomArchivo_Dec;
                            } else {
                                vcRutaCondiciones = "";
                            }
                        }
                        if (result.d[i].Nombre == 'Mensaje') {
                            MensajeValidTipo = result.d[i].vcTamTip_Msj;
                            MensajeValidCant = result.d[i].inTamaño_Msj;
                        }
                        if (result.d[i].Nombre == 'DocAdjuntos') {
                            AdjuntosCantidad = result.d[i].inCanTot_Adj;
                            AdjuntosExtensiones = result.d[i].vcExtPer_Adj;
                            AdjutnosTamanoTipo = result.d[i].vcTamTip_Adj;
                            AdjuntosTamanoMedida = result.d[i].vcTamMed_Adj;
                            AdjuntosTamanoMaxNum = result.d[i].dcTamaño_Adj;
                            $("#ifDocAdjuntos").attr("src", "Adm_AdjuntarArchivos.aspx?pagOri=NuevaSolicitud&estSol=0&CanMax=" + AdjuntosCantidad + "&ExtPer=" + AdjuntosExtensiones + "&TamTip=" + AdjutnosTamanoTipo + "&TamMax=" + AdjuntosTamanoMaxNum + "&TamMed=" + AdjuntosTamanoMedida);
                            $("#lblAdjuntosValidCantidad").text(AdjuntosCantidad == '0' || AdjuntosCantidad == '' ? 'Sin límite' : AdjuntosCantidad);
                            $("#lblAdjutnosValidExtensiones").text(AdjuntosExtensiones != '' ? AdjuntosExtensiones : 'Todas');
                            if (AdjutnosTamanoTipo == '' || AdjuntosTamanoMaxNum == '' || AdjuntosTamanoMaxNum == '0' || AdjuntosTamanoMedida == '') { //no configurado o permisivo
                                $("#lblAdjutnosValidTamanoMax").text('Sin límite');
                            } else {
                                $("#lblAdjutnosValidTamanoMax").text(FormatoNumero(AdjuntosTamanoMaxNum, oCulturaLocal, true) + " " + AdjuntosTamanoMedida + " (" + (AdjutnosTamanoTipo == 't' ? 'Total' : 'Individual') + ")");
                            }
                        }
                    }
                }
                var idx = -1;
                var i = 0;
                for (i = 0; i < arContenidos.length; i++) {
                    contenidoTab = arContenidos[i].contenido;
                    creartab(arContenidos[i].contenido, arContenidos[i].titulo);
                    idx = idx + 1;
                    if (idx != 0) { arIndexTabMostrados.push(idx); }
                }
                tbSolicitud.tabs("option", "disabled", arIndexTabMostrados);
                if (arContenidos.length == 1) {
                    $("#btnAtras").hide();
                    $("#btnSiguiente").hide();
                    $("#dvCreacionEstado").show();
                    $("#btnFinalizar").show();
                } else {
                    $("#btnAtras").hide();
                    $("#btnSiguiente").show();
                    $("#dvCreacionEstado").hide();
                    $("#btnFinalizar").hide();
                }

                //JHERRERA 20150311: Nueva confiuración (botón refrescar)
                //-------------------------------------------------------
                try {
                    var tabSelection = tbSolicitud.tabs('option', 'selected');
                    //                if (arContenidos[0].mostrarRefrescar) {
                    if (arContenidos[tabSelection].mostrarRefrescar) {
                        $('#btnRefrescar').show();
                    } else {
                        $('#btnRefrescar').hide();
                    }
                } catch (e) {
                    $('#btnRefrescar').hide();
                }
                //-------------------------------------------------------

                //if (TipoSolicitud == "4") { // Solicitud Nuevo
                //    $("#grillaDispositivos thead [data-field=plan] .k-link").html("Plan / Cuenta de línea")
                //}else{
                //    $("#grillaDispositivos thead [data-field=plan] .k-link").html("Plan")
                //}
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnValidarListarTipoSolicitudXGrupoEmpleado() {

    $("#dvTabs").hide();
    $("#lblMensajeVerificacion").text('');
    $("#btnEquiSol").hide();
    $("#dvCreacionEstado").hide();
    //botones
    $("#btnEquiSol").hide();
    $("#btnAtras").hide();
    $("#btnSiguiente").hide();
    $("#btnFinalizar").hide();

    if ($("#hdfCodEmpleadoAutenticado").val() == "") {

        //return;
    }

    var codEmpleado = $("#hdfCodEmpleado").val();
    //codEmpleado = $("#hdfCodEmpleadoAutenticado").val();

    if (codEmpleado == "") {
        var dataSource = new kendo.data.DataSource({ data: [] });
        $("#ddlTipoSolicitud").data("kendoComboBox").setDataSource(dataSource);
        $("#ddlTipoSolicitud").data("kendoComboBox").input.attr("placeholder", "Seleccione...")
        fnLimpiarTipoSolicitud(false, false);
        return;
    }


    var valorActualTipoSolicitud = $("#ddlTipoSolicitud").data("kendoComboBox").value();

    $.ajax({
        type: "POST",
        url: "Adm_NuevaSolicitud.aspx/ListarTipoSolicitudXGrupoEmpleado",
        data: "{'vcCodEmp': '" + codEmpleado + "'," +
            "'vcJefeArea': '" + $("#hdfJefeArea").val() + "'," +
            "'vcTipLin': '" + $("#hdfCodLinTip_X_User").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            $("#ddlTipoSolicitud").html("");
            var biSetDefVal = false; var biHayDat = false;
            var existeValorActual = false;
            //var items = [{ text: '', value: "-1" }];
            var items = [];
            if ($(result.d).length > 0) {
                $("#lblMensajeVerificacion").html("");
                //                    var items = [{ text: '<Seleccione>', value: -1}];
                if ($(result.d).length > 0) {
                    biHayDat = true;
                    var Existe = false;
                    $(result.d).each(function () {
                        //if (this.inCodTipSol.toString() != "31") {

                        //Validar si existe...
                        Existe = false;
                        for (var i = 0; i < items.length; i++) {
                            if (items[i].text == this.vcNomTipSol) {
                                Existe = true;
                            }
                        }
                        if (!Existe)
                            items.push({ text: this.vcNomTipSol, value: this.inCodTipSol });
                        //}
                        if ($("#hdfDefTipoSolicitud").val() == this.inCodTipSol) {
                            biSetDefVal = true;
                        }

                        if (valorActualTipoSolicitud == this.inCodTipSol) {
                            existeValorActual = true;
                        }

                    });
                }
            }
            else {
                if ($("#hdfCodEmpleado").val() != "") {
                    $("#lblMensajeVerificacion").html("El grupo actual del usuario no tiene acceso para realizar solicitudes.");
                }
            }

            var dataSource = new kendo.data.DataSource({ data: items });
            $("#ddlTipoSolicitud").data("kendoComboBox").setDataSource(dataSource);
            $("#ddlTipoSolicitud").data("kendoComboBox").input.attr("placeholder", "Seleccione...")

            //                            $("#ddlTipoSolicitud").data("kendoComboBox").value(-1);
            //                            $("#ddlTipoSolicitud").data("kendoComboBox").enable(true);
            fnLimpiarTipoSolicitud(biSetDefVal, biHayDat);

            if (existeValorActual) {
                $("#ddlTipoSolicitud").data("kendoComboBox").value(valorActualTipoSolicitud);
                fnChange();
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}


//FUNCIONES CARGA
function CargarDispositivos(Empleado) {
    if (Empleado != "") {
        $.ajax({
            type: "POST",
            url: "Adm_NuevaSolicitud.aspx/ListarDispositivos",
            data: "{'vcCodEmp': '" + Empleado + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if ($(result.d).length > 0) {
                    for (i in result.d) {
                        var estadoMod = result.d[i][0].ModeloDispositivo.btVig ? "Activo" : "Inactivo";
                        var numrpm = result.d[i][0].rpm ? result.d[i][0].rpm : "No Disponible";

                        var planLinea;
                        //if (parseInt("0" + result.d[i][2].P_inCod) > 0)
                        //    planLinea = "Plan: " + result.d[i][2].vcNom;
                        //else
                        //    planLinea = "Cuenta: " + result.d[i][1].P_vcCod;
                        if (result.d[i][1].TipoAsignacionCredito.P_inCod == 1) { //planes
                            if (parseInt("0" + result.d[i][2].P_inCod) > 0) {
                                planLinea = "Plan: " + result.d[i][2].vcNom;
                            }
                            else {
                                planLinea = "Plan: Plan Desconocido";
                            }
                        } else if (result.d[i][1].TipoAsignacionCredito.P_inCod == 2) { //cuentas
                            planLinea = "Cuenta: " + result.d[i][1].P_vcCod;
                        }

                        var dtFecUltCam = new Date(parseInt(result.d[i][0].dtFecUltCam.substring(6, 19)));
                        var dtFecProCam = new Date(parseInt(result.d[i][0].dtFecProCam.substring(6, 19)));
                        var mesFecUltCam = (parseInt(dtFecUltCam.getMonth()) + 1).toString().length == "1" ? "0" + (parseInt(dtFecUltCam.getMonth()) + 1).toString() : (parseInt(dtFecUltCam.getMonth()) + 1).toString();
                        var mesFecProCam = (parseInt(dtFecProCam.getMonth()) + 1).toString().length == "1" ? "0" + (parseInt(dtFecProCam.getMonth()) + 1).toString() : (parseInt(dtFecProCam.getMonth()) + 1).toString();
                        var diaFecUltCam = dtFecUltCam.getDate().toString().length == "1" ? "0" + dtFecUltCam.getDate().toString() : dtFecUltCam.getDate().toString();
                        var diaFecProCam = dtFecProCam.getDate().toString().length == "1" ? "0" + dtFecProCam.getDate().toString() : dtFecProCam.getDate().toString();
                        var FecUltCam = diaFecUltCam + "/" + mesFecUltCam + "/" + dtFecUltCam.getFullYear();
                        var FecProCam = diaFecProCam + "/" + mesFecProCam + "/" + dtFecProCam.getFullYear();

                        //var dtFecFinCont = new Date(parseInt(result.d[i][0].dtFecUltCam.substring(6, 19)));
                        ////var dtFecFinCont = dtFecFinCont.setMonth(dtFecFinCont.getMonth() + parseInt(result.d[i][0].idCampana))
                        //var dtFecFinCont = dtFecFinCont.addMonths(18);
                        //var mesFecFinCont = (parseInt(dtFecFinCont.getMonth()) + 1).toString().length == "1" ? "0" + (parseInt(dtFecFinCont.getMonth()) + 1).toString() : (parseInt(dtFecFinCont.getMonth()) + 1).toString();
                        //var diaFecFincont = dtFecFinCont.getDate().toString().length == "1" ? "0" + dtFecFinCont.getDate().toString() : dtFecFinCont.getDate().toString();
                        //var FecFinCon = diaFecFincont + "/" + mesFecFinCont + "/" + dtFecFinCont.getFullYear();

                        var dtFecFinCont = new Date(dtFecUltCam.setMonth(dtFecUltCam.getMonth() + parseInt(result.d[i][0].idCampana)));
                        var mesFecFinCont = (parseInt(dtFecFinCont.getMonth()) + 1).toString().length == "1" ? "0" + (parseInt(dtFecFinCont.getMonth()) + 1).toString() : (parseInt(dtFecFinCont.getMonth()) + 1).toString();
                        var diaFecFincont = dtFecFinCont.getDate().toString().length == "1" ? "0" + dtFecFinCont.getDate().toString() : dtFecFinCont.getDate().toString();
                        var FecFinCon = diaFecFincont + "/" + mesFecFinCont + "/" + dtFecFinCont.getFullYear();
                        //alert(dtFecFinCont.getDate().toString() + '/' + (dtFecFinCont.getMonth() + 1).toString() + '/' + dtFecFinCont.getFullYear().toString());
                        var vcCostoRepo;
                        if (oCulturaLocal.vcSimDec.toString() == ',') {
                            $("#lblMontoReferencial").text("Monto adicional (" + FormatoNumero(ResumenCostoExtra, oCulturaLocal) + ") por tiempo de contrato faltante. Fin de contrato: " + ResumenFechaFinContrato);
                            vcCostoRepo = parseFloat(result.d[i][0].costoReposicion) >= 0 ? FormatoNumero(result.d[i][0].costoReposicion.toString().replace('.', ','), oCulturaLocal) : ''
                        }
                        else {
                            vcCostoRepo = parseFloat(result.d[i][0].costoReposicion) >= 0 ? result.d[i][0].costoReposicion : ''
                        }

                        $("#grillaDispositivos").data("kendoGrid").dataSource.add({
                            numero: result.d[i][0].vcNum,
                            modelo: $.trim(result.d[i][0].ModeloDispositivo.vcNom),
                            rpm: numrpm,
                            estado: estadoMod,
                            imgmodelo: result.d[i][0].ModeloDispositivo.vcRutArc,
                            ultfeccambio: FecUltCam,
                            tnecesario: result.d[i][0].inNumMesProCam == 1000 ? "Sin política asociada" : result.d[i][0].inNumMesProCam == 0 ? "Ilimitado" : result.d[i][0].inNumMesProCam,
                            cambiodesde: result.d[i][0].inNumMesProCam == 1000 ? "Sin política asociada" : FecProCam,
                            minutos: result.d[i][0].inMin,
                            plan: planLinea,
                            cuenta: result.d[i][1].P_vcCod,
                            codIMEI: result.d[i][0].P_vcCodIMEI,
                            codOper: result.d[i][2].Operador.P_inCodOpe,
                            nomOper: result.d[i][2].Operador.vcNomOpe,
                            codModDis: result.d[i][0].ModeloDispositivo.P_inCod,
                            codPlan: result.d[i][2].P_inCod,
                            costoRepo: vcCostoRepo //parseFloat(result.d[i][0].costoReposicion) >= 0 ? result.d[i][0].costoReposicion : '' //modificado 21-01-2015
                            , vcNomEst: result.d[i][0].vcNomEst //agregado 11/04/2014
                            , inEst: result.d[i][0].inEst
                            , MesesContrato: result.d[i][0].idCampana //agregado 17-11-2014 wapumayta
                            , FechaFinContrato: FecFinCon //agregado 18-11-2014 wapumayta
                        });
                    }
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
}

//function detailInit(e) {
//    var detailRow = e.detailRow;
//    detailRow.find(".tabstrip").kendoTabStrip({
//        animation: {
//            open: { effects: "fadeIn" }
//        }
//    });
//};

//function CargarServiciosActuales(Linea) {
//    if (Linea != "") {
//        $.ajax({
//            type: "POST",
//            url: "Adm_NuevaSolicitud.aspx/MostrarServiciosActuales",
//            data: "{'vcLin': '" + Linea + "'}",
//            contentType: "application/json; charset=utf-8",
//            dataType: "json",
//            success: function (result) {
//                if ($(result.d).length > 0) {
//                    for (var i in result.d) {
//                        var dcCantidad = result.d[i].dcCan;
//                        if (result.d[i].dcCan == "0") { dcCantidad = "Ilimitado"; };
//                        $("#tbServActuales").data("kendoGrid").dataSource.add({
//                            codigo: result.d[i].P_inCod,
//                            servicio: result.d[i].vcNom,
//                            cantidad: dcCantidad
//                        });
//                    };
//                };
//            },
//            error: function (xhr, err, thrErr) {
//                MostrarErrorAjax(xhr, err, thrErr);
//            }
//        });
//    };
//};

//function listarTipoServicio(codcue, codlin) {
//    $.ajax({
//        type: "POST",
//        url: "Adm_NuevaSolicitud.aspx/ListarServiciosTipoNoUsados",
//        data: "{'CodCue': '" + codcue + "','CodLin':'" + codlin + "'}",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (result) {
//            lstServicioTipo = result.d;
//            $("#ddlServicio").html("");
//            $("#ddlTipoServicio").html("");
//            var itemsTip = [];
//            if ($(lstServicioTipo).length > 0) {
//                itemsTip.push({ text: "--Seleccione--", value: "-1" });
//                $(lstServicioTipo).each(function () {
//                    itemsTip.push({ text: this.vcNom, value: this.P_inCod });
//                    //alerta("text: " + this.vcNom + ", value: " + this.P_inCod);
//                });
//            } else {
//                itemsTip.push({ text: "Sin datos", value: "-2" });
//            };
//            var comboTipoDataSource = new kendo.data.DataSource({ data: itemsTip });
//            $("#ddlTipoServicio").data("kendoComboBox").setDataSource(comboTipoDataSource);
//            $("#ddlTipoServicio").data("kendoComboBox").select(0)
//            var comboServDataSource = new kendo.data.DataSource({ data: [{ text: "--Sin datos--", value: "-2"}] });
//            $("#ddlServicio").data("kendoComboBox").setDataSource(comboServDataSource);
//            $("#ddlServicio").data("kendoComboBox").select(0)
//        },
//        error: function (xhr, err, thrErr) {
//            MostrarErrorAjax(xhr, err, thrErr);
//        }
//    });
//};
//
//function listarServicios(CodCue, CodLin, CodTipServ) {
//    //alert(CodCue + ", " + CodLin + ", " + CodTipServ);
//    $.ajax({
//        type: "POST",
//        url: "Adm_NuevaSolicitud.aspx/ListarServicios_NoUsados",
//        data: "{'CodCue': '" + CodCue + "','CodLin':'" + CodLin + "','CodTipServ':'" + CodTipServ + "'}",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (result) {
//            lstServicio = result.d;
//            var itemsServ = [];
//            $("#ddlServicio").html("");
//            if ($(lstServicio).length > 0) {
//                itemsServ.push({ text: "--Todos--", value: "-1" });
//                $(lstServicio).each(function () {
//                    itemsServ.push({ text: this.vcNom, value: this.P_inCod });
//                });
//            } else {
//                itemsServ.push({ text: "--Sin datos--", value: "-2" });
//            };
//            var comboServDataSource = new kendo.data.DataSource({ data: itemsServ });
//            $("#ddlServicio").data("kendoComboBox").destroy();
//            combokendoFormar("#ddlServicio", 200);
//            $("#ddlServicio").data("kendoComboBox").setDataSource(comboServDataSource);
//            $("#ddlServicio").data("kendoComboBox").select(0);
//        },
//        error: function (xhr, err, thrErr) {
//            MostrarErrorAjax(xhr, err, thrErr);
//        }
//    });
//};

function listarOperadores() {
    $.ajax({
        type: "POST",
        url: "Adm_NuevaSolicitud.aspx/ListarOperadores",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var itemsOpe = [];
            if ($(result.d).length > 0) {
                itemsOpe.push({ text: "--Seleccione--", value: "-1" });
                $(result.d).each(function () {
                    itemsOpe.push({ text: this.vcNomOpe, value: this.P_inCodOpe });
                });
            } else {
                itemsOpe.push({ text: "Sin datos", value: "-2" });
            }
            var dataSourceOpe = new kendo.data.DataSource({ data: itemsOpe });
            $("#ddlOperador").data("kendoComboBox").setDataSource(dataSourceOpe);
            $("#ddlOperador").data("kendoComboBox").select(0);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function listarPlanes(esAmp) {
    codOpeAutoCompPlanes = $("#ddlTipoSolicitud").data("kendoComboBox").value() == 7 ? $("#hdfCodigoOperador").val() : $("#ddlOperador").data("kendoComboBox").value();
    //alert($("#hdfCodModDis").val() + ", " + codOpeAutoCompPlanes);
    //alert("operador: " + codOpeAutoCompPlanes + "\nModelo: " + $("#hdfCodModDis").val());
    $.ajax({
        type: "POST",
        url: "Adm_NuevaSolicitud.aspx/ListarPlanesPorOperadorPorModelo",
        data: "{'inCodOpe': '" + codOpeAutoCompPlanes + "'," +
            "'inCodMod': '" + $("#hdfCodModDis").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var itemsPlan = [];
            if ($(result.d).length > 0) {
                itemsPlan.push({ text: "--Seleccione--", value: "-1" });
                $(result.d).each(function () {
                    if (this.F_inCodOpe == codOpeAutoCompPlanes) {
                        if (this.F_inCodTip == 1) {
                            itemsPlan.push({ text: this.vcNom, value: this.P_inCod });
                        }
                    }
                });
            } else {
                itemsPlan.push({ text: "Sin datos", value: "-2" });
            }
            if (itemsPlan.length == 1) {
                if (itemsPlan[0].value == "-1") {
                    itemsPlan = [];
                    itemsPlan.push({ text: "Sin datos", value: "-2" });
                }
            }
            if (!esAmp) {
                var dataSourcePlan = new kendo.data.DataSource({ data: itemsPlan });
                $("#ddlPlan").data("kendoComboBox").setDataSource(dataSourcePlan);
                $("#ddlPlan").data("kendoComboBox").select(0);
            } else {
                $("#ddlAmpPlanes").html('');
                $.each(itemsPlan, function () {
                    $("#ddlAmpPlanes").append($("<option></option>").val(this.value).text(this.text));
                });
                if ($("#hdfCodPlan").val() != '') {
                    $("#ddlAmpPlanes").val($("#hdfCodPlan").val());
                }
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
    //$("input[name='ddlPlan_input']").attr("disabled", true);
    //$("input[name='ddlOperador_input']").attr("disabled", true);
}

function cargarServicios_x_Grupo() {
    var linea = $("#hdfLineaSel").val();
    var codemp = $("#hdfCodEmpleado").val();
    $.ajax({
        type: "POST",
        url: "Adm_NuevaSolicitud.aspx/ListarServicios",
        data: "{'codEmp': '" + codemp + "'," +
            "'lin': '" + linea + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if ($(result.d).length != 0) {
                var item1 = result.d[0].split("-");
                $("#lblLinea").text($("#hdfLineaSel").val());
                $("#lblOperador").text(item1[3]);
                $("#lblGrupoOrigen").text(item1[2]);
                var dataItems = [];
                $(result.d).each(function () {
                    var itemS = this.split("-");
                    var costo;
                    if (itemS[6] != '') {
                        //costo = FormatoNumero(itemS[6],$("#hdfSepMiles").val(),$("#hdfSepDecimal").val(),$("#hdfNumDecimales").val());
                        costo = itemS[6];
                    }
                    if (itemS[6] == 0) {
                        costo = 'Sin costo';
                    }
                    if (itemS[6] == '') {
                        costo = '';
                    }
                    //itemS[7] -> activo
                    dataItems.push({ codigo: itemS[4], servicio: itemS[0], descripcion: itemS[5], activar: itemS[1], costo: costo, estado: itemS[7] });
                });
            } else {
                alerta("No se encontraron servicio disponibles");
                dataItems = [];
                return;
            }
            var kendoDataServicios = new kendo.data.DataSource({ data: dataItems });
            $("#tbServicios").data("kendoGrid").setDataSource(kendoDataServicios);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}
//FIN FUNCIONES CARGA

//#region FUNCIONES GENERALES
function fnDesactivarSiguientesVentanas() {
    var numTabs = $("#tbSolicitud").tabs("length");
    var tabSiguiente = tbSolicitud.tabs('option', 'selected') + 1;
    var arTabDes = []; arIndexTabMostrados = [];
    var i = tabSiguiente;
    for (i = tabSiguiente; i < numTabs; i++) {
        arTabDes.push(i);
        arIndexTabMostrados.push(i);
    }
    tbSolicitud.tabs("option", "disabled", arTabDes);
}
//#endregion

//FUNCIONES VALIDACION
function validarSeleccionGrilla(dataSeleccion) {
    var tipsol = $("#ddlTipoSolicitud").data("kendoComboBox").value();
    setCaptura('Dispositivos', true);
    $("#lblMensajeVerificacion").html('');
    if (dataSeleccion.inEst != 2) { //dispositivo con estado diferente de Asignado
        $("#lblMensajeVerificacion").html('Este equipo está en estado "' + dataSeleccion.vcNomEst + '", no puede realizar ninguna solicitud.');
        $("#btnSiguiente").button("option", "disabled", true);
        fnDesactivarSiguientesVentanas();
        $("#btnEquiSol").hide();
        return;
    }
    ResumenCostoExtra = ''; //agregado 15-12-2014 wapuayta
    switch (tipsol) {
        case ("1"): //cambio
            //alert(dataSeleccion.codPlan + ", " + dataSeleccion.cuenta);
            if (dataSeleccion.codPlan == '0' && dataSeleccion.cuenta == '') {
                $("#btnSiguiente").button("option", "disabled", true);
                msgValidacionGrilla = "Dispositivo no cuenta con cuenta/plan";
                $("#lblMensajeVerificacion").html(msgValidacionGrilla);
            } else {
                $("#hdfLineaSel").val(dataSeleccion.numero);
                //$("#hdfCodImeiSel").val(dataSeleccion.codIMEI);
                codIMEITemp = dataSeleccion.codIMEI;
                $("#hdfCodModDisActual").val(dataSeleccion.codModDis);
                $("#hdfCodPlanSel").val(dataSeleccion.codPlan);
                VerificaHabilitado(dataSeleccion.codIMEI);
                inCodOpe = dataSeleccion.codOper;
            }
            ResumenModeloSeleccionado = dataSeleccion.modelo;
            if (oCulturaLocal.vcSimDec.toString() == ',') {
                ResumenCostoExtra = parseFloat(dataSeleccion.costoRepo) > 0 ? dataSeleccion.costoRepo : '0';
            } else {
                ResumenCostoExtra = parseFloat(dataSeleccion.costoRepo) > 0 ? dataSeleccion.costoRepo : '';
            }
            ResumenFechaFinContrato = dataSeleccion.FechaFinContrato;
            break;
        case ("3"): //reposicion
            if (dataSeleccion.codPlan == '0' && dataSeleccion.cuenta == '') {
                $("#btnSiguiente").button("option", "disabled", true);
                msgValidacionGrilla = "Dispositivo no cuenta con cuenta/plan";
                $("#lblMensajeVerificacion").html(msgValidacionGrilla);
            } else {
                $("#hdfLineaSel").val(dataSeleccion.numero);
                //$("#hdfCodImeiSel").val(dataSeleccion.codIMEI);
                codIMEITemp = dataSeleccion.codIMEI;
                $("#hdfCodPlanSel").val(dataSeleccion.codPlan);
                $("#hdfCostoReposicion").val(dataSeleccion.costoRepo);
                //alert(dataSeleccion.costoRepo + 'uno');
                $("#txtMonto").val(dataSeleccion.costoRepo);
                VerificaHabilitado(dataSeleccion.codIMEI);
                inCodOpe = dataSeleccion.codOper;
            }
            ResumenFechaFinContrato = dataSeleccion.FechaFinContrato;
            ResumenModeloSeleccionado = dataSeleccion.modelo;
            //ResumenCostoReferencial = dataSeleccion.costoRepo;
            if (oCulturaLocal.vcSimDec.toString() == ',') {
                ResumenCostoExtra = parseFloat(dataSeleccion.costoRepo) > 0 ? dataSeleccion.costoRepo : '0';
            } else {
                ResumenCostoExtra = parseFloat(dataSeleccion.costoRepo) > 0 ? dataSeleccion.costoRepo : '';
            }
            break;
        case ("4"): //reparacion
            $("#hdfCodModDis").val(dataSeleccion.codIMEI);
            codDispTemp = dataSeleccion.codIMEI;
            $("#btnSiguiente").button("option", "disabled", false);
            setCaptura("Dispositivos", true);
            $("#hdfLineaSel").val(dataSeleccion.numero);
            ResumenModeloSeleccionado = dataSeleccion.modelo;
            VerificaHabilitado(dataSeleccion.codIMEI);
            break;
        case ("6"): //activacion
            if (dataSeleccion.numero == "Dispositivo sin línea") {
                msgValidacionGrilla = "Dispositivo no cuenta con línea";
                $("#lblMensajeVerificacion").html(msgValidacionGrilla);
                $("#btnSiguiente").button("option", "disabled", true);
            } else {
                $("#lblMensajeVerificacion").html("");
                $("#btnSiguiente").button("option", "disabled", false);
                //setCaptura("Dispositivos", true);
                VerificarLinea_ActAmp(dataSeleccion.numero, 6);
                $("#hdfLineaSel").val(dataSeleccion.numero);
                $("#hdfCuentaLinea").val(dataSeleccion.cuenta);
                $("#lblLineaSel").text(dataSeleccion.numero);
            }
            break;
        case ("7"): //ampliacion
            if (dataSeleccion.numero == "Dispositivo sin línea") {
                msgValidacionGrilla = "Dispositivo no cuenta con línea";
                $("#lblMensajeVerificacion").html(msgValidacionGrilla);
                $("#btnSiguiente").button("option", "disabled", true);
            } else if (dataSeleccion.plan == 'Plan: Plan Desconocido') {
                msgValidacionGrilla = "Debe de asignarse un plan a la línea antes de continuar.";
                $("#lblMensajeVerificacion").html(msgValidacionGrilla);
                $("#btnSiguiente").button("option", "disabled", true);
            } else {
                $("#lblMensajeVerificacion").html("");
                $("#btnSiguiente").button("option", "disabled", false);
                //$("#hdfCuentaLinea").val(dataSeleccion.cuenta);
                VerificarLinea_ActAmp(dataSeleccion.numero, 7);
                $("#hdfPlanLineaSel").val(dataSeleccion.plan.replace('Plan: ', ''));
                $("#hdfLineaSel").val(dataSeleccion.numero);
                $("#hdfCodigoOperador").val(dataSeleccion.codOper);
                $("#hdfNombreOperador").val(dataSeleccion.nomOper);
                $("#hdfCodModDis").val(dataSeleccion.codModDis);
                //$("#hdfCodPlanSel").val(dataSeleccion.codPlan);
                $("#hdfCuentaLinea").val(dataSeleccion.cuenta);
                //plus
                $("#hdfCodModDisActual").val(dataSeleccion.modelo);
                //modelo
                ResumenModeloSeleccionado = dataSeleccion.modelo;
                ResumenNombreOperador = dataSeleccion.nomOper;
                ResumenPlanActual = dataSeleccion.plan.replace('Plan: ', '');
                codPlanActual = dataSeleccion.codPlan;
                $("#hdfCodPlan").val('');
            }
            break;
        default:
            alerta("Error al seleccionar tipo de solicitud, recargue la pagina");
    }
}

function VerificaHabilitado(Dispositivo) {
    if ($("#ddlTipoSolicitud").data("kendoComboBox").value() == "1") {
        $.ajax({
            type: "POST",
            url: "Adm_NuevaSolicitud.aspx/VerificaLineaEmpleadoCambio",
            data: "{'dcNumLin': '" + Dispositivo + "'," +
                "'vcCodEmp': '" + $("#hdfCodEmpleado").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#btnEquiSol").hide();
                $("#lblMensajeVerificacion").text('');
                msgValidacionGrilla = '';
                if (result.d == "1") {
                    msgValidacionGrilla = "Hubo un problema al verificar la línea";
                    $("#btnSiguiente").button("option", "disabled", true);
                    valAvance = false;
                } else if (result.d == "2") {
                    msgValidacionGrilla = "Ya existe una solicitud para este equipo";
                    $("#btnSiguiente").button("option", "disabled", true);
                    valAvance = false;
                    $("#btnEquiSol").show();
                    setCaptura("Dispositivos", false);
                } else if (result.d == "3") {
                    msgValidacionGrilla = "No ha cumplido el tiempo mínimo para realizar cambio de equipo";
                    $("#btnSiguiente").button("option", "disabled", true);
                    valAvance = false;
                } else if (result.d == "4") {
                    msgValidacionGrilla = "Usted no está incluido en ninguna política de cambio";
                    $("#btnSiguiente").button("option", "disabled", true);
                    valAvance = false;
                } else {
                    if ($("#hdfCodPlanSel").val() == '0') {
                        msgValidacionGrilla = "Solo se mostrarán los modelos compatibles con grupo del empleado";
                    } else {
                        //msgValidacionGrilla = "Sólo se mostrarán los modelos compatibles al plan del equipo seleccionado";
                        msgValidacionGrilla = "Sólo se mostrarán los modelos compatibles con el grupo del empleado y el plan del equipo seleccionado";
                    }
                    //cambiar estado a captura completa
                    setCaptura("Dispositivos", true);
                    $("#btnSiguiente").button("option", "disabled", false);
                }
                $("#lblMensajeVerificacion").html(msgValidacionGrilla);
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    } else if ($("#ddlTipoSolicitud").data("kendoComboBox").value() == "3" || $("#ddlTipoSolicitud").data("kendoComboBox").value() == "4") {
        $.ajax({
            type: "POST",
            url: "Adm_NuevaSolicitud.aspx/VerificaLineaEmpleadoReposicion",
            data: "{'dcNumLin': '" + Dispositivo + "'," +
                "'vcCodEmp': '" + $("#hdfCodEmpleado").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#btnEquiSol").hide();
                $("#lblMensajeVerificacion").html("");
                msgValidacionGrilla = '';
                if (result.d == "1") {
                    msgValidacionGrilla = "Hubo un problema al verificar la linea. Linea no corresponde al empleado.";
                    valAvance = false;
                    $("#btnSiguiente").button("option", "disabled", true);
                }
                else if (result.d == "2") {
                    msgValidacionGrilla = "Ya existe una solicitud para este equipo";
                    valAvance = false;
                    $("#btnSiguiente").button("option", "disabled", true);
                    $("#btnEquiSol").show();
                }
                else if (result.d == "3") {
                    msgValidacionGrilla = "Usted no está incluido en ninguna política";
                    valAvance = false;
                    $("#btnSiguiente").button("option", "disabled", true);
                }
                else {
                    if ($("#ddlTipoSolicitud").data("kendoComboBox").value() == "3") {
                        msgValidacionGrilla = "Sólo se mostrarán los modelos compatibles al plan del equipo seleccionado";
                    }
                    $("#btnSiguiente").button("option", "disabled", false);
                }
                $("#lblMensajeVerificacion").html(msgValidacionGrilla);
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
}

function VerificaHabilitadoEmpleado(Empleado, activarBoton) {
    $.ajax({
        type: "POST",
        url: "Adm_NuevaSolicitud.aspx/VerificaLineaEmpleadoNuevo",
        data: "{'vcCodEmp': '" + Empleado + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#btnEquiSol").hide();
            if (result.d == "1") {
                msgValidacionGrilla = "Ya tiene una solicitud pendiente para adquirir un nuevo equipo";
                $("#dvCreacionEstado").hide();
                valAvance = false;
                $("#btnEquiSol").show();
            } else if (result.d == "2") {
                msgValidacionGrilla = "Usted no puede adquirir más equipos porque ha llegado al número máximo de dispositivos configurado para su grupo.";
                valAvance = false;
                $("#dvCreacionEstado").hide();
            } else if (result.d == "3") {
                msgValidacionGrilla = "Usted no está incluido en ninguna política";
                valAvance = false;
                $("#dvCreacionEstado").hide();
            } else {
                //mostrar tabs
                msgValidacionGrilla = '';
                //$("#dvCreacionEstado").show();
                if (activarBoton == "1") {
                    $("#btnSiguiente").button("option", "disabled", false);
                }
            }

            $("#lblMensajeVerificacion").html(msgValidacionGrilla);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}
//FIN FUNCIONES VALIDACION

//INICIO ADJUNTOS
function listaUbicaciones(ubicacionesAdjuntos) {
    lstUbicaciones = ubicacionesAdjuntos;
    //alert(lstUbicaciones.length);
}
function numeroAdjuntos(nAdj) {

    valAvance = true;
    setCaptura('DocAdjuntos', true);
    if (nAdj == 0) {
        //alerta('No se ha adjuntado ningún archivo');
        $("#lblMensajeVerificacion").html('No se ha adjuntado ningún archivo');
        if (selContOblig('DocAdjuntos')) {
            valAvance = false;
        }
        setCaptura('DocAdjuntos', false);
    } else if (nAdj == 1) {
        //alerta('Se ha cargado 1 adjunto');
        $("#lblMensajeVerificacion").html('Se ha cargado 1 adjunto');
    } else {
        //alerta('Se han cargado ' + nAdj + ' adjuntos.');
        $("#lblMensajeVerificacion").html('Se han cargado ' + nAdj + ' adjuntos.');
    }
    HabilitarContinuar();
}
//FIN ADJUNTOS

//INICIO TABS
function grillaDispositivos() {
    var altoGrilla = parseInt($("#tbSolicitud").css("height").split(".")[0]) - 50;
    $("#grillaDispositivos").kendoGrid({
        //dataSource: dataGrilla,
        dataSource: [],
        sortable: true,
        pageable: {
            pageSize: 5,
            buttonCount: 3,
            messages: {
                page: "Enter page",
                display: "Mostrando {0} - {1} de {2} dispositivos",
                empty: "No tiene Dispositivos asignados",
                first: "Ir a la primera página",
                previous: "Ir a la página anterior",
                next: "Ir a la página siguiente",
                last: "Ir a la última página"
            }
        },
        columns: [{ field: "numero", title: "Número", width: "15%" },
        { field: "modelo", title: "Nombre de Modelo de Dispositivo", width: "40%" },
        { field: "plan", title: "Plan / Cuenta de línea", width: "30%" },
        { field: "imgmodelo", title: "Modelo de Dispositivo", width: "15%" }
        ],
        rowTemplate: kendo.template($("#RowTemplate").html()),
        detailTemplate: kendo.template($("#DetailTemplate1").html()),
        detailInit: function detailInit(e) {
            var detailRow = e.detailRow;
            detailRow.find(".tabDatos").tabs();
        },
        //dataBound: function () {
        //    this.expandRow(this.tbody.find("tr.k-master-row").first());
        //},
        //height: 335,
        height: altoGrilla,
        selectable: true,
        change: function (e) {
            var selectedRows = this.select();
            var i = 0;
            for (i = 0; i < selectedRows.length; i++) {
                dataItem = this.dataItem(selectedRows[i]);
            }
            validarSeleccionGrilla(dataItem);
            fnDesactivarSiguientesVentanas();
        }
    });

    CargarDispositivos($("#hdfCodEmpleado").val());
}

function mensajeKendo() {
    $("#txtMensaje").attr("height", "170px");
    //var altokendoEditor = altco
    //alert('x');

    $("#txtMensaje").kendoEditor({
        tools: ["bold", "italic", "underline", "strikethrough",
            "justifyLeft", "justifyCenter", "justifyRight", "justifyFull",
            "insertUnorderedList", "insertOrderedList",
            "indent", "outdent",
            //"fontName", 
            "fontSize"
        ],
        messages: {
            bold: "Negritas", italic: "Cursiva", underline: "Subrayado", strikethrough: "Tachado",
            justifyLeft: "Alinear a la izquierda", justifyCenter: "Centrar", justifyRight: "Alinear a la derecha", justifyFull: "Justificar",
            insertUnorderedList: "Viñetas", insertOrderedList: "Numeración",
            indent: "Disminuir sangría", outdent: "Aumentar sangría",
            fontNameInherit: "(Fuente)", fontSizeInherit: "(Tamaño de fuente)",
            //fontName: "Fuente", 
            fontSize: "Tamaño de fuente"
        },
        keydown: function (e) {
            if (parseInt(MensajeValidCantMax) <= parseInt($("#lblNumWordCaracMensaje").text())) {
                //alert(MensajeValidCantMax);
                return false;
            }
        },
        keyup: function (e) {
            if (MensajeValidTipo == 'w') { //validación por tipo palabras
                $("#lblNumWordCaracMensaje").text(wordCount(this.value()));
            } else { //validación por caracteres
                $("#lblNumWordCaracMensaje").text(characterCount(this.value()));
            }
            //tamaño máximo por mensaje 

            //mensaje es obligatirio
            $.each(arContenidos, function () {
                if (this.contenido == 'Mensaje' && this.obligatorio == true) {
                    if (parseInt($("#lblNumWordCaracMensaje").text()) >= parseInt(MensajeValidCant)) { //palabras
                        setCaptura('Mensaje', true);
                        valAvance = true;
                        HabilitarContinuar();
                        //$("#btnSiguiente").button("option", "disabled", false);
                    } else {
                        setCaptura('Mensaje', false);
                        valAvance = false;
                        DeshabilitarContinuar();
                        fnDesactivarSiguientesVentanas(); //Agregado Jcamacho 25/09/2015
                        //$("#btnSiguiente").button("option", "disabled", true);
                    }
                }
            });
        }
    });

    var editor = $("#txtMensaje").data("kendoEditor");
    editor.body.style.fontSize = "14pt";

    $("#btnLimpiarMensaje").click(function () {
        $("#txtMensaje").data("kendoEditor").value('');
    });

    var altoContenedor = $("#tbSolicitud").css("height").split(".")[0];
    $(".k-editor").css("height", parseInt(altoContenedor) - 122);

    if ($.browser.msie) {
        $(".k-editor").css("height", parseInt(altoContenedor) - 122);
    } else {
        $(".k-editor").css("height", parseInt(altoContenedor) - 80);
    }

}

function servicios() {
    $("#tbServicios").kendoGrid({
        dataSource: [],
        sortable: true,
        columns: [{ field: "codigo", title: "Código", hidden: true },
        { field: "servicio", title: "Servicio", width: "25%", attributes: { style: "font-size: 14px" } },
        { field: "descripcion", title: "Descripción", width: "60%" },
        { field: "activar", title: "Activar", width: "5%", attributes: { style: "text-align: center; font-size: 14px" } },
        { field: "costo", title: "Costo", width: "10%", attributes: { style: "text-align: center; font-size: 14px" } },
        { field: "estado", title: "Estado", hidden: true }],
        selectable: false,
        sortable: false,
        rowTemplate: kendo.template($("#RowTemplateServicio").html()),
        //altRowTemplate: kendo.template($("#altRowTemplateServicio").html()),
        height: parseInt($(window).height()) - 190,
        scrollable: false,
        dataBound: function (e) {
            var grid = $("#tbServicios").data("kendoGrid");
            while (grid == undefined) {
                var a = "no hay data";
            }
            var filas = $(".fila");
            var i = 0;
            for (i = 0; i < filas.length; i++) {
                var tds = $(filas[i]).find("td");
                //var labCod = $(tds[0]).find("label");
                var labNombre = $(tds[0]).find("label");
                var labDesc = $(tds[1]).find("label");
                var chk = $(tds[2]).find("input");
                var labCosto = $(tds[3]).find("label");
                chk.attr("id", grid.dataSource._data[i].codigo);
                chk.addClass("servicio");
                if (grid.dataSource._data[i].activar != "True") {
                    //alert(true);
                    chk.attr("disabled", true);
                    $.uniform.update();
                    $(labNombre).css("color", "#89989E");
                    $(labCosto).css("color", "#89989E");
                    $(labDesc).css("color", "#89989E");
                    $(filas[i]).css("display", "none"); //Agregado Jcamacho 25/09/2015 oculta fila deshabilitada

                }
                if (grid.dataSource._data[i].estado == "True") {
                    chk.attr("checked", true);
                    arServiciosActuales.push({ codigo: grid.dataSource._data[i].codigo, nombre: grid.dataSource._data[i].servicio });
                    $.uniform.update();
                }
                //$(labCod).text(grid.dataSource._data[i].codigo);
                //if (grid.dataSource._data[i].descripcion != '') {
                //    $(labNombre).text(grid.dataSource._data[i].servicio + ' (' + grid.dataSource._data[i].descripcion + ')');
                //} else {
                //    $(labNombre).text(grid.dataSource._data[i].servicio);
                //}
                $(labNombre).text(grid.dataSource._data[i].servicio);
                $(labDesc).text(grid.dataSource._data[i].descripcion);
                $(labCosto).text(grid.dataSource._data[i].costo);
            }
            $("input:checkbox").uniform();
        }
    });
    //cargar servicios de la linea
    //$("input:checkbox class=['servicio']").click(function () {
    //    alerta("9089");
    //    setCaptura('Servicios', true);
    //});
}

//function servicios1() {
//    $("#lblLineaSel").text($("#hdfLineaSel").val());
//    $("#txtCatnidadSolicitada").keypress(ValidarSoloNumero);
//    $("#txtMotivoActivacion").keypress(ValidarAlfaNumericoConEspacios);
//    $('#rbtTemporal').attr('checked', true);
//    
//    
//    $("#ddlTipoServicio").change(function () {
//        if ($(this).val() == '-1')
//            $("#lblValorCatnidad").text('');
//        if ($(this).val() == '16')
//            $("#lblValorCatnidad").text(' (min)');
//        if ($(this).val() == '17')
//            $("#lblValorCatnidad").text(' (KB)');
//        if ($(this).val() == '18')
//            $("#lblValorCatnidad").text(' (msj)');
//        listarServicios($("#hdfCuentaLinea").val(), $("#hdfLineaSel").val(), $(this).val());
//    });
//
//    datepickerkendoFormar("#txtFechaInicial");
//    datepickerkendoFormar("#txtFechaFinal");
//    var fechaIni = $("#txtFechaInicial").data("kendoDatePicker");
//    var fechaFin = $("#txtFechaFinal").data("kendoDatePicker");
//    fechaIni.min(new Date());
//    fechaFin.min(new Date());
//    fechaIni.bind("change", function () { fechaFin.min(this.value()); });
//    fechaFin.bind("change", function () { fechaIni.max(this.value()); });
//
//    $('#chkIlimitado').click(function () {
//        if ($('#chkIlimitado').is(':checked')) {
//            $("#trCantidad").hide(100);
//        } else {
//            $("#trCantidad").show(100);
//        };
//    });
//    $('#rbtTemporal').click(function () {
//        $("#trFechaFinal").show(100);
//    });
//
//    $('#rbtPermanente').click(function () {
//        $("#trFechaFinal").hide(100);
//        $("#txtFechaFinal").val('');
//    });
//
//    $("#tbServActuales").kendoGrid({
//        sortable: true,
//        columns: [{ field: "codigo", title: "Código", hidden: true },
//                   { field: "servicio", title: "Servicio", width: "70%" },
//                   { field: "cantidad", title: "Cantidad", width: "30%" }],
//        selectable: true,
//        height: 200
//    });
//
//    if ($("#hdfTipoSolicitud").val() == "6") { //activacion
//        $("#lblTituloGrillaServ").text("Lista de Servicios Actuales");
//        combokendoFormar("#ddlTipoServicio", "200");
//        combokendoFormar("#ddlServicio", "200");
//        $("#trServicioSeleccionado").hide();
//    } else if ($("#hdfTipoSolicitud").val() == "7") { //ampliacion
//        $("#trServicioSeleccionado").show();
//        $("#trTipoServicio").hide();
//        $("#trServicio").hide();
//        $("#trTiempo").hide();
//        $("#trFechaFinal").hide();
//        $("#trFechaInicial").hide();
//        $("#lblTituloGrillaServ").text("Seleccione el servicio a ampliar");
//        $("#tbServActuales").data("kendoGrid").bind("change", seleccionarServicioAmpliar);
//    };
//
//    function seleccionarServicioAmpliar (e) {
//        var selectedRows = this.select();
//        dataItem = this.dataItem(selectedRows);
//        if (dataItem.cantidad == "Ilimitado") {
//            //alerta("No puede ampliar un servicio ilimitado");
//            $("#lblServSeleccionado").text("No puede ampliar un servicio ilimitado");
//            $("#btnFinalizar").button("option", "disabled", true);
//            $("#lblServSeleccionado").prop("ForeColor", "Red");
//            $("#lblServSeleccionado").attr("ForeColor", "Red");
//            $("#lblServSeleccionado").css("ForeColor", "Red");
//        } else {
//            $("#btnFinalizar").button("option", "disabled", false);
//            $("#lblServSeleccionado").attr("ForeColor", "Black");
//            $("#lblServSeleccionado").text(dataItem.servicio);
//            $("#hdfServicioSelect").val(dataItem.codigo);
//        };
//    };
//};

function planes() {
    $("#txtCostoModelo").val("Seleccione operador");
    ResumenCostoReferencial = '-1';
    var tipSol = $("#ddlTipoSolicitud").data("kendoComboBox").value();
    if (tipSol != 7) { //solicitud de plan
        $("#lblOperadorLinea").hide();
        combokendoFormar("ddlOperador", 200);
        combokendoFormar("ddlPlan", 200);
        $("input[name='ddlPlan_input']").attr("disabled", "disabled");
        //        $("#ddlPlan").data("kendoComboBox").readonly(true);
        $("#ddlPlan").data("kendoComboBox").enable(false);
        listarOperadores();
        $("#ddlOperador").change(function () {
            //$("#txtPlan").val('');
            $("#trDetalle").hide(200);
            if ($("#ddlOperador").data("kendoComboBox").value() != "-1") {
                $("#ddlPlan").data("kendoComboBox").enable(true);
                $("input[name='ddlPlan_input']").attr("disabled", "disabled");
                //                $("#ddlPlan").data("kendoComboBox").readonly(true);
                ResumenNombreOperador = $("#ddlOperador").data("kendoComboBox").text();
                listarPlanes(false);
                //COSTO
                if (!PreciosOperador[$("#hdfCodModDis").val()]) {
                    $.ajax({
                        type: "POST",
                        url: "Adm_GaleriaModDispositivos.aspx/PreciosOperador",
                        data: "{'inCodModDis': '" + $("#hdfCodModDis").val() + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            eval(result.d);
                            //var Precio = PreciosOperador[$("#hdfCodModDis").val()].Precios[$("#ddlOperador").val()].dePreLis;
                            var Precio = (blUsarPrecio = 0 ? PreciosOperador[$("#hdfCodModDis").val()].Precios[$("#ddlOperador").val()].dePreEsp : PreciosOperador[$("#hdfCodModDis").val()].Precios[$("#ddlOperador").val()].dePreLis);
                            if (Precio == '') {
                                $("#txtCostoModelo").val('No definido');
                                ResumenCostoReferencial = '-1';
                            } else {
                                $("#txtCostoModelo").val(FormatoNumero(Precio, oCulturaLocal));
                                ResumenCostoReferencial = Precio;
                            }
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        }
                    });
                } else {
                    //var Precio = PreciosOperador[$("#hdfCodModDis").val()].Precios[$("#ddlOperador").val()].dePreLis;
                    var Precio = (blUsarPrecio = 0 ? PreciosOperador[$("#hdfCodModDis").val()].Precios[$("#ddlOperador").val()].dePreEsp : PreciosOperador[$("#hdfCodModDis").val()].Precios[$("#ddlOperador").val()].dePreLis);
                    if (Precio == '') {
                        $("#txtCostoModelo").val('No definido');
                        ResumenCostoReferencial = '-1';
                    } else {
                        $("#txtCostoModelo").val(FormatoNumero(Precio, oCulturaLocal));
                        ResumenCostoReferencial = Precio;
                    }
                }
            } else {
                $("#ddlPlan").data("kendoComboBox").enable(false);
                if ($("#ddlPlan").data("kendoComboBox").value() == "-2") {
                    $("#ddlPlan").data("kendoComboBox").value(-2);
                } else {
                    $("#ddlPlan").data("kendoComboBox").value(-1);
                }

                $("#hdfCodPlan").val('');
                $("#btnSiguiente").button("option", "disabled", true);
                setCaptura('Planes', false);

                //COSTO DE MODELO
                $("#txtCostoModelo").val("Seleccione operador");
                ResumenCostoReferencial = '-1';
            }
        });
    }

    $("#ddlPlan").change(function () {
        var vcCod = $("#ddlPlan").data("kendoComboBox").value();
        $("#hdfCodPlan").val(vcCod);
        ResumenNombrePlan = $("#ddlPlan").data("kendoComboBox").text();
        if (vcCod != '-1') {
            mostrarDetallePlan(vcCod, false);
            setCaptura("Planes", true);
        } else {
            $("#trDetalle").hide(200);
            setCaptura("Planes", false);
        }
        var tabSelection = $("#tbSolicitud").tabs('option', 'selected');
        var tabMostrado = arContenidos[tabSelection].contenido;
        var numTabs = $("#tbSolicitud").tabs("length");
        if (verificarCaptura("Planes")) {
            if (tabMostrado == numTabs - 1) {
                $("#btnFinalizar").button("option", "disabled", false);
            } else {
                $("#btnSiguiente").button("option", "disabled", false);
            }
        } else {
            if (tabMostrado == numTabs - 1) {
                $("#btnFinalizar").button("option", "disabled", true);
            } else {
                $("#btnSiguiente").button("option", "disabled", true);
            }
        }
    });

    $("#tbSubPlanes").html('');
    $(".k-detail-row").remove();
    $("#tbSubPlanes").kendoGrid({
        dataSource: [],
        sortable: false,
        height: 160,
        scrollable: false,
        pageable: false,
        detailInit: detailInit,
        columns: [{ field: "inCod", title: "Código", width: "0%", hidden: true },
        { field: "vcNom", title: "Nombre", width: "20%" },
        { field: "vcDes", title: "Descripción", width: "40%" },
        { field: "dcCan", title: "Cantidad", width: "20%", attributes: { style: "text-align: right;" } },
        { field: "dcMon", title: "Monto", width: "20%", attributes: { style: "text-align: right;" } }
        ],
        selectable: false
    });
}

function condiciones() {
    //ruta condicion
    //    var rutaCondicion = 'P_Movil/Administrar/SubContratos/ContratoEmpleado_20140616111201_20140617035009.htm';
    //documento
    $("#ifCondiciones").attr("src", raiz(vcRutaCondiciones));
    $('#ifCondiciones').css({ "height": parseInt($(window).height()) - 202 });
    //descargar
    $("#btnDescargar").live("click", function () {
        window.location = "../../Common/Controladores/DescargarArchivo.ashx?archivo=" + vcRutaCondiciones;
    });
    //scroll
    //$($('#ifCondiciones').contents()).bind('scroll', function() {
    //    alert("scroll");
    //    if($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight) {
    //        alert('end reached');
    //    }
    //})

    //$contents = $('#ifCondiciones').contents();
    //$contents.scrollTop($contents.height());
    //$($contents).scroll(function() {
    //    if($($contents).scrollTop() + $($contents).height() == $(document).height()) {
    //        alert("bottom!");
    //    }
    //});

    //acciones
    $("input:checkbox,input:radio,input:file").uniform();
    $("input[name='condic']").live("click", function () {
        if ($(this).attr("id") == 'chk-acuerdo') {
            $("#btnSiguiente").button("option", "disabled", false);
            $("#btnFinalizar").button("option", "disabled", false);
            setCaptura('Condiciones', true);
            acuerdo = true;
        } else {
            $("#btnSiguiente").button("option", "disabled", true);
            $("#btnFinalizar").button("option", "disabled", false);
            setCaptura('Condiciones', false);
            acuerdo = false;
            fnDesactivarSiguientesVentanas();
        }
    });
}

function paquetes() {
    $("#txtAmpModeloDispositivo").val($("#hdfCodModDisActual").val());
    $("#txtAmpOperado").val($("#hdfNombreOperador").val());
    $("#txtAmpLinea").val($("#hdfLineaSel").val());
    //hdfCuentaLinea
    if (codPlanActual != 0) { //linea con cuenta por planes
        $(".AmpPlanes").show();
        $(".AmpPaquetes").hide();
        $("#txtAmpPlanActual").val($("#hdfPlanLineaSel").val());
        listarPlanes(true);
    } else { //la linea con cuenta por distribucion de bolsa
        $(".AmpPlanes").hide();
        $(".AmpPaquetes").show();
        $("#txtAmpCuenta").val($("#hdfCuentaLinea").val());
        $("#trAmpDetServ").show();
        $("#trAmpDetalle").hide();

        $("#lblAmpNombreServ").text('');
        $("#ddlAmpPaquetes").html('');
        $("#ddlAmpPaquetes").append($("<option></option>").text("").val(-3));
    }

    $("#ddlAmpPlanes").change(function () {
        var codPlan = $(this).val();
        $("#hdfCodPlan").val(codPlan);
        //ResumenNombrePlan = $("#ddlAmpPlanes option[value='2']").text();
        if (codPlan != '-1') {
            mostrarDetallePlan(codPlan, true);
            $("#hdfCodPlanSel").val(codPlan);
            if (codPlan != codPlanActual) {
                setCaptura("Paquetes", true);
            } else {
                setCaptura("Paquetes", false);
            }
        } else {
            $("#trAmpDetalle").hide(200);
            setCaptura("Paquetes", false);
        }
        var tabSelection = $("#tbSolicitud").tabs('option', 'selected');
        var tabMostrado = arContenidos[tabSelection].contenido;
        var numTabs = $("#tbSolicitud").tabs("length");
        if (verificarCaptura("Paquetes")) {
            if (tabMostrado == numTabs - 1) {
                $("#btnFinalizar").button("option", "disabled", false);
            } else {
                $("#btnSiguiente").button("option", "disabled", false);
            }
        } else {
            if (tabMostrado == numTabs - 1) {
                $("#btnFinalizar").button("option", "disabled", true);
            } else {
                $("#btnSiguiente").button("option", "disabled", true);
            }
        }
    });
    if (newKendoGrid) {
        $("#tbAmpSubPlanes").kendoGrid({
            dataSource: [],
            sortable: false,
            height: 160,
            scrollable: false,
            pageable: false,
            detailInit: detailInit,
            columns: [{ field: "inCod", title: "Código", width: "0%", hidden: true },
            { field: "vcNom", title: "Nombre", width: "20%" },
            { field: "vcDes", title: "Descripción", width: "40%" },
            { field: "dcCan", title: "Cantidad", width: "20%" },
            { field: "dcMon", title: "Monto", width: "20%" }],
            selectable: false
        });
        newKendoGrid = false;
    }

    tblServicio = $("#tblServicio").jqGrid({
        datatype: "local",
        colModel: [{ name: 'P_inCod', index: 'P_inCod', label: 'Codigo', width: 60, hidden: true },
        { name: 'inCodTipDat', index: 'inCodTipDat', label: 'Tipo', width: 50, hidden: true },
        { name: 'vcNom', index: 'vcNom', label: 'Servicio', width: 200 },
        { name: 'inCodTipSer', index: 'inCodTipDat', label: 'Tipo', width: 50, hidden: true },
        {
            name: 'dcCan', index: 'dcCan', label: 'Cantidad', width: 65, align: "right", sorttype: "float",
            formatter: function (value, options, rData) {
                if (value == '0') {
                    return 'Ilimitado';
                }
                else {
                    return FormatoNumero(value.toString(), oCulturaLocal, true);
                }
            }
        },
        {
            name: 'amp', index: 'amp', label: '-', width: 25, align: "center", hidden: true,
            formatter: function (value, options, rData) {
                return '<img id="imAmp-' + rData.P_inCod + '" class="imgBtn imgAmpliar" title="Cambiar Cantidad" src="../../Common/Images/Mantenimiento/Replace_24x24.png" height="16px" width="16px"/>';
            }
        }
        ],
        sortname: "P_inCod", //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: "350",
        height: "95",
        rownumbers: true,
        caption: "Servicios",
        shrinkToFit: false,
        onRightClickRow: function () {
            tblServicio.jqGrid('resetSelection');
            return false;
        },
        beforeSelectRow: function (rowid, status, e) {
            return false;
        },
        onSelectRow: function (id) {
            return false;
            //var datos = $("#tblServicio").jqGrid('getRowData', id);
            //$("#hdfAmpCodServ").val(id)
            //if (datos.dcCan == 'Ilimitado') {
            //    $("#hdfAmpCodIlimitado").val('true');
            //} else {
            //    $("#hdfAmpCodIlimitado").val('false');
            //}
            //$("#hddAmpTipoServicio").val(datos.inCodTipDat);
            //if (datos.inCodTipDat == "1") {
            //    MostrarPaquetesPorTipoServ(datos.inCodTipSer);
            //} else {
            //    MostrarPaquetesPorTipoServ(datos.P_inCod);
            //}
            //$("#lblAmpNombreServ").text(datos.vcNom);
        }
    });
    //$("#tblServicio").jqGrid('bindKeys', { "onEnter": function (id) { $("#btnModificarServicio").click(); }, "onSpace": function (id) { $("#btnModificarServicio").click(); } });

    tbAmpPaquetes = $("#tbAmpPaquetes").jqGrid({
        datatype: "local",
        colModel: [{ name: 'P_inCod', index: 'P_inCod', label: 'Codigo', width: 60, hidden: true },
        { name: 'vcNom', index: 'vcNom', label: 'Servicio', width: 120 },
        { name: 'vcNomPaqAmp', index: 'vcNomPaqAmp', label: 'Paquete', width: 120 },
        { name: 'vcCant', index: 'vccCant', label: 'Cantidad', width: 60 },
        { name: 'vcCantReal', index: 'vcCantReal', label: 'Cantidad Real', width: 50, hidden: true },
        {
            name: 'dcCosto', index: 'dcCosto', label: 'Costo', width: 55, align: "right", sorttype: "float",
            formatter: function (value, options, rData) {
                if (value == '0') {
                    return 'Sin costo';
                } else {
                    return FormatoNumero(value.toString(), oCulturaLocal);
                }
            }
        },
        { name: 'dcCostoReal', index: 'dcCostoReal', label: 'Costo Real', widht: 90, hidden: true },
        { name: 'inTipoServ', index: 'inTipoServ', label: 'inTipoServ', hidden: true },
        { name: 'inCodPaqAmp', index: 'inCodPaqAmp', label: 'inCodPaqAmp', hidden: true }
        ],
        sortname: "P_inCod", //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: "410",
        height: "100",
        rownumbers: true,
        shrinkToFit: false,
        caption: "Paquetes de ampliación solicitados"
    });

    //listar servicios de liena
    $("#tblServicio").jqGrid('clearGridData');
    ListarServicios_PaquetesAmpliacion();
    ListarTipoServicios_ServiciosCuenta();
}

function LimpiarTabPaquetes() {
    $("#lblAmpNombreServ").text('');
    $("#ddlAmpPaquetes").html('');
    $("#ddlAmpPaquetes").append($("<option></option>").text("").val(-3));
    $("#tbAmpPaquetes").jqGrid('clearGridData');
    //$("#tbAmpSubPlanes").data("kendoGrid").destroy();
    $("#trAmpDetalle").hide();
    $("#hdfAmpCodServ").val("");
}
function ListarServicios_PaquetesAmpliacion() {
    var ListarServiciosLinea_Data = {
        vcNumLin: $("#hdfLineaSel").val(),
        vcCodEmp: $("#hdfCodEmpleado").val(),
        inCodOpe: $("#hdfCodigoOperador").val()
    };
    $.ajax({
        type: "POST",
        url: "Adm_NuevaSolicitud.aspx/ListarServiciosLinea",
        //data: "{'vcNumLin': '" + $("#hdfLineaSel").val() + "'}",
        data: JSON.stringify(ListarServiciosLinea_Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            textServicios = result.d[0].toString();
            textPaquetes = result.d[1].toString();
            //mostrar servicios de la linea
            if (textServicios != "") {
                var servicios = JSON.parse(textServicios);
                $(servicios).each(function () {
                    $("#tblServicio").jqGrid('addRowData', this.P_inCod, { id: this.P_inCod, 'P_inCod': this.P_inCod, 'inCodTipDat': this.inCodTipDat, 'vcNom': this.vcNom, 'dcCan': this.dcCan, 'inCodTipSer': this.TipoServicio.P_inCod });
                });
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
    //textServicios = '[{"P_inCod":5112,"inCodOpe":0,"vcCodCue":null,"vcNom":"MOVIL MOVISTAR","vcNomRef":null,"dcMon":0,"dcAct":0,"dcAcu":0,"vcGlo":null,"inCodTipDat":1,"TipoServicio":{"MostrarEnDash":false,"P_inCod":16,"vcNom":"Llamadas","vcExpEn":"min","dcCan":0},"dcCan":10.000,"vcCodSer":null,"btEst":false},{"P_inCod":5102,"inCodOpe":0,"vcCodCue":null,"vcNom":"MOVIL CLARO","vcNomRef":null,"dcMon":0,"dcAct":0,"dcAcu":0,"vcGlo":null,"inCodTipDat":1,"TipoServicio":{"MostrarEnDash":false,"P_inCod":0,"vcNom":"Lamadas","vcExpEn":"min","dcCan":0},"dcCan":10.000,"vcCodSer":null,"btEst":false},{"P_inCod":5190,"inCodOpe":0,"vcCodCue":null,"vcNom":"DATOS","vcNomRef":null,"dcMon":0,"dcAct":0,"dcAcu":0,"vcGlo":null,"inCodTipDat":1,"TipoServicio":{"MostrarEnDash":false,"P_inCod":0,"vcNom":null,"vcExpEn":null,"dcCan":0},"dcCan":3000.000,"vcCodSer":null,"btEst":false},{"P_inCod":5132,"inCodOpe":0,"vcCodCue":null,"vcNom":"MENSAJE DE TEXTO","vcNomRef":null,"dcMon":0,"dcAct":0,"dcAcu":0,"vcGlo":null,"inCodTipDat":1,"TipoServicio":{"MostrarEnDash":false,"P_inCod":0,"vcNom":null,"vcExpEn":null,"dcCan":0},"dcCan":0.000,"vcCodSer":null,"btEst":false}]';
    //textPaquetes = '[{"F_inTipSer":16,"inCantidad":60,"vcNomTipoSer":"LLamadas","vcExpEn":"min","dcCosto":14},{"F_inTipSer":16,"inCantidad":120,"vcNomTipoSer":"Llamadas","vcExpEn":"min","dcCosto":28},{"F_inTipSer":16,"inCantidad":240,"vcNomTipoSer":"Llamadas","vcExpEn":"min","dcCosto":42},{"F_inTipSer":17,"inCantidad":3000,"vcNomTipoSer":"Datos","vcExpEn":"Mb","dcCosto":0},{"F_inTipSer":17,"inCantidad":4000,"vcNomTipoSer":"Datos","vcExpEn":"Mb","dcCosto":0},{"F_inTipSer":17,"inCantidad":5000,"vcNomTipoSer":"Datos","vcExpEn":"Mb","dcCosto":0},{"F_inTipSer":18,"inCantidad":20,"vcNomTipoSer":"Mensajes","vcExpEn":"msj","dcCosto":5},{"F_inTipSer":18,"inCantidad":50,"vcNomTipoSer":"Mensajes","vcExpEn":"msj","dcCosto":10},{"F_inTipSer":18,"inCantidad":100,"vcNomTipoSer":"Mensajes","vcExpEn":"msj","dcCosto":15}]';
}
function ListarTipoServicios_ServiciosCuenta() {
    var ListarServiciosCuenta_Data = { vcCodCue: $("#txtAmpCuenta").val() };
    $.ajax({
        type: "POST",
        url: "Adm_NuevaSolicitud.aspx/ListarServiciosCuenta",
        data: JSON.stringify(ListarServiciosCuenta_Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var lstTipoServicio = result.d[0];
            lstServiciosCuenta = result.d[1];
            $("#ddlTipoServicioAmp").html('');
            var i = 0;
            for (i = 0; i < lstTipoServicio.length; i++) {
                if (lstTipoServicio[i].P_inCod == '-1' || lstTipoServicio[i].P_inCod == '16' || lstTipoServicio[i].P_inCod == '17' || lstTipoServicio[i].P_inCod == '18') {
                    $("#ddlTipoServicioAmp").append($("<option></option>").val(lstTipoServicio[i].P_inCod).text(lstTipoServicio[i].vcNom));
                }
            }
            $("#ddlServCuentaTipo").html('');
            $("#ddlServCuentaTipo").append($("<option></option>").val(-2).text('<Seleccione Tipo>'));
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function MostrarPaquetesPorTipoServ(TipServ, Serv) {
    $("#ddlAmpPaquetes").html('');
    if (textPaquetes != '') {
        var Paquetes = JSON.parse(textPaquetes);
        $.each(Paquetes, function () {
            if (Serv == null || Serv == undefined || Serv == -1) {
                if (this.F_inTipSer == TipServ) {
                    $("#ddlAmpPaquetes").append($("<option></option>").text(this.vcNomPaqAmp + " " + " (" + this.inCantidad + " " + this.vcExpEn + " - " + oCulturaLocal.vcTipMon + " " + FormatoNumero(this.dcCosto, oCulturaLocal).toString() + ")").val(this.inCantidad).attr("costo", this.dcCosto).attr("medida", this.vcExpEn).attr("nombre", this.vcNomPaqAmp).attr("idPaqAmp", this.IdPaqAmp));
                }
            } else {
                if (this.F_inTipSer == TipServ && this.F_inSer == Serv) {
                    $("#ddlAmpPaquetes").append($("<option></option>").text(this.vcNomPaqAmp + " " + " (" + this.inCantidad + " " + this.vcExpEn + " - " + oCulturaLocal.vcTipMon + " " + FormatoNumero(this.dcCosto, oCulturaLocal).toString() + ")").val(this.inCantidad).attr("costo", this.dcCosto).attr("medida", this.vcExpEn).attr("nombre", this.vcNomPaqAmp).attr("idPaqAmp", this.IdPaqAmp));
                }
            }
        });
        if ($("#ddlAmpPaquetes option").length == 0) {
            $("#ddlAmpPaquetes").append($("<option></option>").text("No hay paquetes").val(-2));
        }
    } else {
        $("#ddlAmpPaquetes").append($("<option></option>").text("No hay paquetes").val(-2));
    }
}

function resumen() {
    ValidarNumeroEnCajaTexto("txtMonto", ValidarDecimalPositivo, oCulturaLocal);
    ValidarNumeroEnCajaTexto("txtMesesCuotas", ValidarSoloNumero);
    ValidarNumeroEnCajaTexto("txtPeriodoGracia", ValidarSoloNumero);

    //#region div Financiamiento
    var codtipsol = $("#ddlTipoSolicitud").data("kendoComboBox").value();
    var idxTipSol = "es" + codtipsol;
    if (arTiposSolicitud[idxTipSol].inTipoFinanciamiento == '0') {
        $("#divFinanciamiento").hide();
    } else {
        //        $("#divFinanciamiento").show();
        $("#divFinanciamiento").hide();
    }
    //#endregion

    var cuotas = false;
    var pergracia = false;
    $("#txtMesesCuotas").live("keyup", function () {
        if ($("#txtPeriodoGracia").is(":disabled")) {
            pergracia = true;
        }
        if (!$("#trPeriodoGracia").is(":visible")) {
            pergracia = true;
        }
        if ($(this).val() == '') {
            cuotas = false;
        } else {
            cuotas = true;
        }
        valAvance = ValidaraDatosFinanciamiento(cuotas, pergracia);
    });
    $("#txtPeriodoGracia").live("keyup", function () {
        if ($("#txtMesesCuotas").is(":disabled")) {
            cuotas = true;
        }
        if (!$("#trMesesCuotas").is(":visible")) {
            cuotas = true;
        }
        if ($(this).val() == '') {
            pergracia = false;
        } else {
            pergracia = true;
        }
        valAvance = ValidaraDatosFinanciamiento(cuotas, pergracia);
    });

    DatosFinanciamiento();

    //var resumenFila = '';
    var m = 0;
    for (m = 0; m < arContenidos.length; m++) {
        switch (arContenidos[m].contenido) {
            case ("Dispositivos"):
                $("#trDispositivos").show();
                if (ResumenModeloSeleccionado != '') {
                    $("#txtDispositivoValor").val($("#hdfLineaSel").val() + " - " + ResumenModeloSeleccionado);
                } else {
                    $("#txtDispositivoValor").val($("#hdfLineaSel").val());
                }
                break;
            case ("Galeria"):
                $("#trGaleria").show();
                $("#txtGaleriaValor").val(ResumenNombreModeloGaleria);
                if (ResumenNombreOperador != '') {
                    $("#trOperador").show();
                    if (ResumenNombreOperador == "") {
                        $("#txtOperadorValor").val("No seleccionado");
                    } else {
                        $("#txtOperadorValor").val(ResumenNombreOperador);
                    }
                }
                break;
            case ("Servicios"):
                $("#trServicios").show();
                var arServ = [];
                var filas = $(".fila");
                var i = 0;
                for (i = 0; i < filas.length; i++) {
                    var chk = $(filas[i]).find("input");
                    var checkCosto = 0;
                    if (chk.is(":checked")) {
                        if ($($(filas[i]).find("label")[2]).text() != "Sin costo") {
                            checkCosto = DevuelveNumeroSinFormato($($(filas[i]).find("label")[2]).text(), oCulturaLocal, false);
                        }
                        arServ.push({ codigo: chk.attr("id"), nombre: $($(filas[i]).find("label")[0]).text(), costo: checkCosto });
                    }
                }
                var arServDel = jQuery.grep(arServiciosActuales, function (val) {
                    var sum = 0;
                    for (i = 0; i < arServ.length; i++) {
                        if (val.codigo == arServ[i].codigo) {
                            sum = sum + 1;
                        }
                    }
                    if (sum == 0) {
                        return val;
                    }
                });
                var arServAdd = jQuery.grep(arServ, function (val) {
                    var sum = 0;
                    for (i = 0; i < arServiciosActuales.length; i++) {
                        if (val.codigo == arServiciosActuales[i].codigo) {
                            sum = sum + 1;
                        }
                    }
                    if (sum == 0) {
                        return val;
                    }
                });
                var CostoTotalSolicitud = 0;
                $("#lstServiciosValor").html('');
                $.each(arServAdd, function () {
                    $("#lstServiciosValor").append($("<option></option>").attr("value", this.codigo).text(this.nombre + " (Agregado)"));
                    CostoTotalSolicitud = parseFloat(CostoTotalSolicitud) + parseFloat(this.costo);
                });
                $.each(arServDel, function () {
                    $("#lstServiciosValor").append($("<option></option>").attr("value", this.codigo).text(this.nombre + " (Quitado)"));
                });
                //alert(CostoTotalSolicitud + 'dos');
                $("#txtMonto").val(CostoTotalSolicitud);
                $("#txtMonto").attr("readOnly", true);
                break;
            case ("Mensaje"):
                $("#trMensaje").show();
                //alert($("#txtMensaje").data("kendoEditor").value() + "; " + $.trim($("#txtMensaje").val()));
                //if ($.trim($("#txtMensaje").val()) != '') {
                var Existe = true;
                try {
                    if ($("#txtMensaje").data("kendoEditor").value() == '') {
                        Existe = true;
                    }
                } catch (Error) {
                    Existe = false;
                }

                if (Existe == true) {
                    if ($("#txtMensaje").data("kendoEditor").value() != '') {
                        $("#lblMensajeValor").hide();
                        if (ResumenNuevo) {
                            $("#dvMensajeValor").show();
                            $("#txtMensajeValor").kendoEditor({
                                tools: [],
                                value: $("#txtMensaje").data("kendoEditor").value(),
                                encoded: true
                            });
                            //deshabilitar kendoeditor
                            $($("#txtMensajeValor").data("kendoEditor").body).attr("contenteditable", false);
                            ResumenNuevo = false;
                        } else {
                            $("#dvMensajeValor").show();
                            $("#txtMensajeValor").data("kendoEditor").value($("#txtMensaje").data("kendoEditor").value());
                        }
                    } else {
                        $("#dvMensajeValor").hide();
                        $("#lblMensajeValor").show();
                    }
                }
                else {
                    $("#dvMensajeValor").hide();
                    $("#lblMensajeValor").show();
                }
                break;
            case ("DocAdjuntos"):
                $("#trDocAdjuntos").show();
                var NombreAdjunto = '';
                $("#lstDocAdjuntosValor").html('');
                if (lstUbicaciones.length > 0) {
                    $("#lstDocAdjuntosValor").show();
                    $("#lblDocAdjuntosValor").hide();
                    var g = 0;
                    for (g = 0; g < lstUbicaciones.length; g++) {
                        NombreAdjunto = lstUbicaciones[g].split("--")[2];
                        $("#lstDocAdjuntosValor").append('<option value="' + g + '">' + NombreAdjunto + '</option>');
                    }
                    $("#lstDocAdjuntosValor option").each(function () {
                        $(this).attr("disabled", true).css("color", "black");
                        //$(this).attr("enabled", false).css("color", "black");
                    });
                } else {
                    $("#lstDocAdjuntosValor").hide();
                    $("#lblDocAdjuntosValor").show();
                }
                break;
            case ("Planes"):
                $("#trOperador").show();
                if (ResumenNombreOperador == "") {
                    $("#txtOperadorValor").val("No seleccionado");
                } else {
                    $("#txtOperadorValor").val(ResumenNombreOperador);
                }
                if (tabPlanesVisible) {
                    $("#trPlanes").show();
                    if (ResumenNombrePlan == "") {
                        $("#txtPlanValor").val("No seleccinado");
                    } else {
                        $("#txtPlanValor").val(ResumenNombrePlan);
                    }
                } else {
                    $("#trPlanes").hide();
                    $("#txtPlanValor").val('');
                }
                break;
            case ("Paquetes"):
                var CostoTotalAmpliaciones = 0;
                $("#trOperador").show();
                $("#txtOperadorValor").val(ResumenNombreOperador);
                if (codPlanActual != 0) { //linea con cuenta por planes
                    $("#trAmpPlanActual").show();
                    $("#txtAmpPlanActualValor").val(ResumenPlanActual);
                    $("#trPlanes").show();
                    if ($("#hdfCodPlan").val() == '' || $("#hdfCodPlan").val() == '-1' || $("#hdfCodPlan").val() == '-2') {
                        $("#txtPlanValor").hide();
                        $("#lblPlanValor").show();
                    } else {
                        var nomPlanNuevo = $("#ddlAmpPlanes option[value='" + $("#hdfCodPlan").val() + "']").text();
                        $("#txtPlanValor").show();
                        $("#lblPlanValor").hide();
                        $("#txtPlanValor").val(nomPlanNuevo);
                    }
                    $("#trCuenta").hide();
                    $("#trPaquetes").hide();
                    $("#trCostoTotal").hide();
                } else {
                    $("#trCuenta").show();
                    $("#txtCuentaValor").val(ResumenPlanActual);
                    $("#trPaquetes").show();
                    $("#lstPaquetesValor").html('');
                    //lista de servicios
                    var idsPaqAmp = tbAmpPaquetes.getDataIDs();
                    if (idsPaqAmp.length > 0) {
                        $("#lblPaquetesValor").hide();
                        $("#lstPaquetesValor").show();
                        $.each(idsPaqAmp, function (e) {
                            var arPaqAmp = tbAmpPaquetes.jqGrid('getRowData', idsPaqAmp[e]);
                            $("#lstPaquetesValor").append('<option value="' + arPaqAmp.P_inCod + '">' + arPaqAmp.vcNom + " - " + arPaqAmp.vcNomPaqAmp + " - " + arPaqAmp.vcCant + '</option>');
                            CostoTotalAmpliaciones = parseFloat(CostoTotalAmpliaciones) + parseFloat(arPaqAmp.dcCostoReal);
                        });
                    } else {
                        $("#lblPaquetesValor").show();
                        $("#lstPaquetesValor").hide();
                    }
                    $("#trCostoTotal").show();
                    $("#txtCostoTotalValor").val(FormatoNumero(CostoTotalAmpliaciones, oCulturaLocal));

                    $("#trAmpPlanActual").hide();
                    $("#trPlanes").hide();
                }
                break;
        }
    }
}
//FIN TABS

function ValidaraDatosFinanciamiento(cuotas, pergracia) {
    valAvance = false;
    if (cuotas && pergracia) {
        valAvance = true;
        HabilitarContinuar();
    } else {
        DeshabilitarContinuar('3');
    }

}


function mostrarDetallePlan(idPlan, esAmp) {
    $.ajax({
        type: "POST",
        url: "Adm_NuevaSolicitud.aspx/MostrarDetallePlan",
        data: "{'IdPlan': '" + idPlan + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var Plan = result.d;
            var arSubPlanes = [];
            if ($(Plan.SubPlanes).length != 0) {
                $(Plan.SubPlanes).each(function () {
                    var Cant = this.dcCan == 0 ? 'Ilimitado' : this.dcCan;
                    arSubPlanes.push({
                        inCod: this.P_inCodSubPla,
                        vcNom: this.vcNom,
                        vcDes: this.vcDes,
                        dcCan: Cant == 'Ilimitado' ? 'Ilimitado' : FormatoNumero(Cant, oCulturaLocal, true),    //ECONDEÑA  20160802
                        //dcCan: FormatoNumero(Cant, oCulturaLocal, true),
                        dcMon: FormatoNumero(this.dcMon, oCulturaLocal)
                    });
                });
            }
            if (!esAmp) { //para tipo nuevo
                $("#lblNombrePlan").text(Plan.vcNom);
                $("#lblDescripcionPlan").html("");
                $("#lblDescripcionPlan").append(Plan.vcDes);
                $("#lblMontoTotal").text(FormatoNumero(Plan.dcMon, oCulturaLocal));
                var dataSubPlanes = new kendo.data.DataSource({ data: arSubPlanes });
                $(".k-detail-row").remove();
                $("#tbSubPlanes").data("kendoGrid").setDataSource(dataSubPlanes);
                $("#trDetalle").show(300);
            } else { //llenar detalle en pestaña para ampliacion
                $("#lblAmpNombrePlan").text(Plan.vcNom);
                $("#lblAmpDescripcionPlan").html("");
                $("#lblAmpDescripcionPlan").append(Plan.vcDes);
                $("#lblAmpMontoTotal").text(Plan.dcMon);
                var dataSubPlanes = new kendo.data.DataSource({ data: arSubPlanes });
                $(".k-detail-row").remove();
                $("#tbAmpSubPlanes").data("kendoGrid").setDataSource(dataSubPlanes);
                $("#trAmpDetalle").show(300);
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}
function detailInit(e) {
    var idSubPlan = e.data.inCod;
    $.ajax({
        type: "POST",
        url: "Adm_NuevaSolicitud.aspx/MostrarDetalleSubPlan",
        data: "{'IdSubPlan': '" + idSubPlan + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var SubPlan = result.d;
            arServicios = [];
            if ($(SubPlan.Servicios).length != 0) {
                $(SubPlan.Servicios).each(function () {
                    var Cant = this.dcCan == 0 ? 'Ilimitado' : FormatoNumero(this.dcCan, oCulturaLocal, true);
                    arServicios.push({ IdServ: this.P_inCod, vcNom: this.vcNom, dcCan: Cant });
                });
            }
            var dataServicios = new kendo.data.DataSource({ data: arServicios });
            $("<div/>").appendTo(e.detailCell).kendoGrid({
                dataSource: dataServicios,
                scrollable: false,
                sortable: false,
                scrollable: false,
                columns: [
                    { field: "IdServ", title: "Código", width: "0%", hidden: true },
                    { field: "vcNom", title: "Nombre Servicio", width: "60%" },
                    { field: "dcCan", title: "Cantidad", width: "40%", attributes: { style: "text-align: right;" } }
                ]
            });
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

//?????
function ModeloDispositivo(codModDis) {
    //alert(codModDis);
    $("#hdfCodModDis").val(codModDis);
}



function combokendoFormar(control, altura) {
    $("#" + control).removeClass("ui-widget-content ui-corner-all");
    $("#" + control).css("padding", "0px");
    $("#" + control).css("margin", "0px");
    $("#" + control).kendoComboBox({
        filter: "contains",
        suggest: true,
        height: altura,
        dataTextField: "text",
        dataValueField: "value"
    });
    $("input[name='" + control + "_input']").attr("disabled", true);
}

//function datepickerkendoFormar(control) {
//    $(control).removeClass("ui-widget-content ui-corner-all");
//    $(control).css("padding", "0px");
//    $(control).css("margin", "0px");
//    $(control).kendoDatePicker({
//        animation: false,
//        format: "dd/MM/yyyy"
//        //culture: "es-ES"
//    });
//};

//Finalizar
function EnviarSolicitudCambio() {
    var CodModDis = $("#hdfCodModDis").val();
    var CodEmp = $("#hdfCodEmpleado").val();
    var NumLin = $("#hdfLineaSel").val();
    var codIMEI = $("#hdfCodImeiSel").val();
    var Desc = '';
    $.each(arContenidos, function () {
        if (this.contenido == "Mensaje") {
            Desc = $("#txtMensaje").data("kendoEditor").value().replace(/'/g, "&#39").replace(/\\/g, "&#92");
        }
    });

    var inEstApr = $("#ddlEstadoCreacion").val();

    //var dcMonto = $("#txtMonto").val() == '' ? '0' : $("#txtMonto").val();
    var dcMonto;
    if ($("#txtMonto").val() == '') {
        dcMonto = '0';
    } else {
        if (oCulturaLocal.vcSimDec.toString() == ',') {
            dcMonto = parseFloat(ParseFloatMultiPais($("#txtMonto").val(), oCulturaLocal));
        } else {
            dcMonto = $("#txtMonto").val();
        }
    }
    var inNumeroCuotas = MesCuo == '' ? $("#txtMesesCuotas").val() : MesCuo;
    var vcMesesCuotas = MesCuo == '' ? '' : MesesCuotas;
    var inMesesPeriodoGracia = $("#txtPeriodoGracia").val();

    if (inNumeroCuotas == "") {
        alerta("El número de cuotas es requerido.");
        return;
    }
    if (inNumeroCuotas == "0" && NumMinCuo != "0" && NumMaxCuo != "0") {
        if (inNumeroCuotas < NumMinCuo || inNumeroCuotas > NumMaxCuo) {
            alerta("El número de cuotas debe estar contenido en el rango especificado.");
            return;
        }
    }
    if (inMesesPeriodoGracia == "") {
        alerta("El número de meses del periodo de gracia es requerido.");
        return;
    }
    if (MinPerGra != "0" && MaxPerGra != "0") {
        if (inMesesPeriodoGracia < MinPerGra || inMesesPeriodoGracia > MaxPerGra) {
            alerta("El número de meses del periodo de gracia debe estar contenido en el rango especificado.");
            return;
        }
    }
    //alerta("dcMonto -> " + dcMonto + "\ninNumeroCuotas ->" + inNumeroCuotas + "\nvcMesesCuotas -> " + vcMesesCuotas + "\ninMesesPeriodoGracia -> " + inMesesPeriodoGracia);

    var ArchAdj = '';
    if (lstUbicaciones.length != 0) {
        ArchAdj = lstUbicaciones.join("|");
    }
    if (CodModDis == '') {
        alerta("Debe seleccionar un modelo de disipositivo en la Galeria");
        return;
    }

    dcMonto = ParseFloatMultiPais(dcMonto, oCulturaLocal);

    //alerta("Empleado: " + CodEmp + "\nModelo: " + CodModDis + "\nLinea: " + NumLin + "\nMensaje: " + Desc + "\nAdjuntos: " + ArchAdj + "\nIMEI: " + codIMEI);

    if (ResumenCostoExtra != '' && (inTipoCostoReposicion == 1 || inTipoCostoReposicion == 0)) {
        $("#lblCostExt_Det1").text(ResumenFechaFinContrato);
        //$("#lblCostExt_Det2").text(ResumenCostoExtra);
        if (oCulturaLocal.vcSimDec.toString() == ',') {
            $("#lblCostExt_Det2").text(FormatoNumero(ResumenCostoExtra, oCulturaLocal));
        }
        else {
            $("#lblCostExt_Det2").text(ResumenCostoExtra);
        }
        $('#divMsgConfirmarCostoExtra').dialog({
            title: inTipoCostoReposicion == 1 ? "¡Costo Extra!" : "¡Costo de Penalidad!",
            modal: true,
            width: 330,
            buttons: {
                "Si": function () {
                    $(this).dialog("close");
                    BloquearPagina(true);
                    $.ajax({
                        type: "POST",
                        url: "Adm_NuevaSolicitud.aspx/EnviarSolicitudCambio",
                        data: "{'codIMEI': '" + codIMEI + "'," +
                            "'vcNumLin': '" + NumLin + "'," +
                            "'inCodModDis': '" + CodModDis + "'," +
                            "'vcArchAdj': '" + ArchAdj + "'," +
                            "'vcDesSol': '" + Desc + "'," +
                            "'inEstApr': '" + inEstApr + "'," +
                            "'inNumeroCuotas': '" + inNumeroCuotas + "'," +
                            "'vcMesesCuotas': '" + vcMesesCuotas + "'," +
                            "'inMesesPeriodoGracia': '" + inMesesPeriodoGracia + "'," +
                            "'dcMonto': '" + dcMonto + "'," +
                            "'vcCodEmp': '" + CodEmp + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            if (result.d != "0") {
                                //alerta("Su solicitud fue enviada con éxito");
                                window.parent.ActualizarGrilla();
                                Mensaje("<br/><h1>Su solicitud fue enviada con éxito</h1><br/>", document, CerroMensaje);
                            } else {
                                alerta("No hay dispositivos disponible para el modelo seleccionado, por favor elija otro modelo");
                                BloquearPagina(false);
                            }
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        }
                    });
                },
                "Cancelar": function () {
                    $(this).dialog("close");
                    BloquearPagina(false);
                }
            }
        });
    } else {
        BloquearPagina(true);
        $.ajax({
            type: "POST",
            url: "Adm_NuevaSolicitud.aspx/EnviarSolicitudCambio",
            data: "{'codIMEI': '" + codIMEI + "'," +
                "'vcNumLin': '" + NumLin + "'," +
                "'inCodModDis': '" + CodModDis + "'," +
                "'vcArchAdj': '" + ArchAdj + "'," +
                "'vcDesSol': '" + Desc + "'," +
                "'inEstApr': '" + inEstApr + "'," +
                "'inNumeroCuotas': '" + inNumeroCuotas + "'," +
                "'vcMesesCuotas': '" + vcMesesCuotas + "'," +
                "'inMesesPeriodoGracia': '" + inMesesPeriodoGracia + "'," +
                "'dcMonto': '" + dcMonto + "'," +
                "'vcCodEmp': '" + CodEmp + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d != "0") {
                    //alerta("Su solicitud fue enviada con éxito");
                    window.parent.ActualizarGrilla();

                    SolicitudModificada_EnviarMensaje(result.d, "", "");

                    Mensaje("<br/><h1>Su solicitud fue enviada con éxito</h1><br/>", document, CerroMensaje);
                } else {
                    alerta("No hay dispositivos disponible para el modelo seleccionado, por favor elija otro modelo");
                    BloquearPagina(false);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
}

function SolicitudModificada_EnviarMensaje(idSolicitud, mensaje, usuario) {
    //Enviar datos via websocket...
    try {
        var _iddominio = window.top.$("#hdfCodigoDominio").val();
        var _mensaje = usuario + '|' + mensaje;
        window.top.ChatHubSignal.server.sendMessageSolicitudModificada(_iddominio, idSolicitud, _mensaje);
        SolicitudModificada_ActualizaAlerta();
    } catch (e) {
        //
    }
}

function SolicitudModificada_ActualizaAlerta() {
    //Enviar datos via websocket...
    try {
        window.top.AlertHubSignal.server.sendAlert(window.top.$("#hdfCodigoDominio").val());
    } catch (e) {
        //
    }
}

function EnviarSolicitudNuevo() {
    var CodModDis = $("#hdfCodModDis").val();
    var CodEmp = $("#hdfCodEmpleado").val();
    var ArchAdj = '';
    var Desc = '';
    $.each(arContenidos, function () {
        if (this.contenido == "Mensaje") {
            Desc = $("#txtMensaje").data("kendoEditor").value().replace(/'/g, "&#39").replace(/\\/g, "&#92");
        }
    });
    var Plan = $("#hdfCodPlan").val() == '' ? '0' : $("#hdfCodPlan").val();

    var inEstApr = $("#ddlEstadoCreacion").val();

    var dcMonto = $("#txtMonto").val() == '' ? '0' : $("#txtMonto").val();
    //    var dcMonto;
    //    if ($("#txtMonto").val() == '') {
    //        dcMonto = '0';
    //    } else {
    //        if (oCulturaLocal.vcSimDec.toString() == ',') {
    //            dcMonto = parseFloat(ParseFloatMultiPais($("#txtMonto").val(), oCulturaLocal));
    //        } else {
    //            dcMonto = $("#txtMonto").val();
    //        }    
    //    }

    var inNumeroCuotas = MesCuo == '' ? $("#txtMesesCuotas").val() : MesCuo;
    var vcMesesCuotas = MesCuo == '' ? '' : MesesCuotas;
    var inMesesPeriodoGracia = $("#txtPeriodoGracia").val();

    if (inNumeroCuotas == "") {
        alerta("El número de cuotas es requerido.");
        return;
    }
    if (NumMinCuo != "0" && NumMaxCuo != "0") {
        if (parseInt(inNumeroCuotas) < parseInt(NumMinCuo) || parseInt(inNumeroCuotas) > parseInt(NumMaxCuo)) {
            alerta("El número de cuotas debe estar contenido en el rango especificado.");
            return;
        }
    }
    if (inMesesPeriodoGracia == "") {
        alerta("El número de meses del periodo de gracia es requerido.");
        return;
    }
    if (MinPerGra != "0" && MaxPerGra != "0") {
        if (parseInt(inMesesPeriodoGracia) < parseInt(MinPerGra) || parseInt(inMesesPeriodoGracia) > parseInt(MaxPerGra)) {
            alerta("El número de meses del periodo de gracia debe estar contenido en el rango especificado.");
            return;
        }
    }

    if (lstUbicaciones.length != 0) {
        ArchAdj = lstUbicaciones.join("|");
    }

    dcMonto = ParseFloatMultiPais(dcMonto, oCulturaLocal);

    //comentado 22/08/2014 - wapumayta (RespTck:1374)(plan no sera escogido en la creacion)
    //var conLinea = $("#ifGaleria")[0].contentWindow.conLinea();
    //if (conLinea == 1 && Plan == '') {
    //    alerta("Debe seleccionar un plan.");
    //    return;
    //};

    //alerta("Empleado: " + CodEmp + "\nModelo: " + CodModDis + "\nPlan: " + Plan + "\nMensaje: " + Desc + "\nAdjuntos: " + ArchAdj);

    BloquearPagina(true);
    $.ajax({
        type: "POST",
        url: "Adm_NuevaSolicitud.aspx/EnviarSolicitudNuevo",
        data: "{'inCodModDis': '" + CodModDis + "'," +
            "'vcNumLin': '" + $("#hdfLineaSel").val() + "'," +
            "'vcArchAdj': '" + ArchAdj + "'," +
            "'vcCodPlan': '" + Plan + "'," +
            "'vcDescSol': '" + Desc + "'," +
            "'inEstApr': '" + inEstApr + "'," +
            "'dcMonto': '" + dcMonto + "'," +
            "'inNumeroCuotas': '" + inNumeroCuotas + "'," +
            "'vcMesesCuotas': '" + vcMesesCuotas + "'," +
            "'inMesesPeriodoGracia': '" + inMesesPeriodoGracia + "'," +
            "'vcCodEmp':'" + CodEmp + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d != "0") {
                window.parent.ActualizarGrilla();

                SolicitudModificada_EnviarMensaje(result.d, "", "");

                Mensaje("<br/><h1>Su solicitud fue enviada con éxito</h1><br/>", document, CerroMensaje);
            } else {
                //alerta("No hay dispositivos disponible para el modelo seleccionado, por favor elija otro modelo");
                alerta("Ya existe una solicitud de nuevo equipo para el empleado.");
                BloquearPagina(false);
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function EnviarSolicitudReposicion() {
    var CodModDis = $("#hdfCodModDis").val();
    var CodEmp = $("#hdfCodEmpleado").val();
    var NumLin = $("#hdfLineaSel").val();
    var CodIMEI = $("#hdfCodImeiSel").val();
    var Desc = '';
    $.each(arContenidos, function () {
        if (this.contenido == "Mensaje") {
            Desc = $("#txtMensaje").data("kendoEditor").value().replace(/'/g, "&#39").replace(/\\/g, "&#92");
        }
    });
    var inEstApr = $("#ddlEstadoCreacion").val();
    //var dcMonto = $("#hdfCostoReposicion").val();
    var dcMonto = $("#txtMonto").val() == '' ? '0' : $("#txtMonto").val();

    var inNumeroCuotas = MesCuo == '' ? $("#txtMesesCuotas").val() : MesCuo;
    var vcMesesCuotas = MesCuo == '' ? '' : MesesCuotas;
    var inMesesPeriodoGracia = $("#txtPeriodoGracia").val();

    if (inNumeroCuotas == "") {
        alerta("El número de cuotas es requerido.");
        return;
    }
    if (inNumeroCuotas == "0" && NumMinCuo != "0" && NumMaxCuo != "0") {
        if (inNumeroCuotas < NumMinCuo || inNumeroCuotas > NumMaxCuo) {
            alerta("El número de cuotas debe estar contenido en el rango especificado.");
            return;
        }
    }
    if (inMesesPeriodoGracia == "") {
        alerta("El número de meses del periodo de gracia es requerido.");
        return;
    }
    if (MinPerGra != "0" && MaxPerGra != "0") {
        if (inMesesPeriodoGracia < MinPerGra || inMesesPeriodoGracia > MaxPerGra) {
            alerta("El número de meses del periodo de gracia debe estar contenido en el rango especificado.");
            return;
        }
    }

    var ArchAdj = '';
    if (lstUbicaciones.length != 0) {
        ArchAdj = lstUbicaciones.join("|");
    }
    if (CodModDis == '') {
        alerta("Debe seleccionar un modelo de disipositivo en la Galeria");
        return;
    }
    dcMonto = ParseFloatMultiPais(dcMonto, oCulturaLocal);
    //alerta("Modelo: " + CodModDis + "\nEmpleado: " + CodEmp + "\nLinea: " + NumLin + "\nAdjuntos: " + ArchAdj + "\nIMEI: " + CodIMEI + "\nMensaje: " + Desc);
    BloquearPagina(true);
    if (ResumenCostoExtra != '' && (inTipoCostoReposicion == 1 || inTipoCostoReposicion == 0)) {
        $("#lblCostExt_Det1").text(ResumenFechaFinContrato);
        if (oCulturaLocal.vcSimDec.toString() == ',') {
            $("#lblCostExt_Det2").text(FormatoNumero(ResumenCostoExtra, oCulturaLocal));
        }
        else {
            $("#lblCostExt_Det2").text(ResumenCostoExtra);
        }

        $('#divMsgConfirmarCostoExtra').dialog({
            title: inTipoCostoReposicion == 1 ? "¡Costo Extra!" : "¡Costo de Penalidad!",
            modal: true,
            width: 330,
            buttons: {
                "Si": function () {
                    $(this).dialog("close");
                    BloquearPagina(true);
                    $.ajax({
                        type: "POST",
                        url: "Adm_NuevaSolicitud.aspx/EnviarSolicitudReposicion",
                        data: "{'codIMEI': '" + CodIMEI + "'," +
                            "'vcNumLin': '" + NumLin + "'," +
                            "'inCodModDis': '" + CodModDis + "'," +
                            "'vcArchAdj': '" + ArchAdj + "'," +
                            "'vcDescSol': '" + Desc + "'," +
                            "'inEstApr': '" + inEstApr + "'," +
                            "'inNumeroCuotas': '" + inNumeroCuotas + "'," +
                            "'vcMesesCuotas': '" + vcMesesCuotas + "'," +
                            "'inMesesPeriodoGracia': '" + inMesesPeriodoGracia + "'," +
                            "'dcMonto': '" + dcMonto + "'," +
                            "'vcCodEmp': '" + CodEmp + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            if (result.d != "0") {
                                window.parent.ActualizarGrilla();

                                SolicitudModificada_EnviarMensaje(result.d, "", "");

                                Mensaje("<br/><h1>Su solicitud fue enviada con éxito</h1><br/>", document, CerroMensaje);
                            } else {
                                alerta("No hay dispositivos disponible para el modelo seleccionado, por favor elija otro modelo");
                                BloquearPagina(false);
                            }
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        }
                    });
                },
                "Cancelar": function () {
                    $(this).dialog("close");
                    BloquearPagina(false);
                }
            }
        });
    } else {
        $.ajax({
            type: "POST",
            url: "Adm_NuevaSolicitud.aspx/EnviarSolicitudReposicion",
            data: "{'codIMEI': '" + CodIMEI + "'," +
                "'vcNumLin': '" + NumLin + "'," +
                "'inCodModDis': '" + CodModDis + "'," +
                "'vcArchAdj': '" + ArchAdj + "'," +
                "'vcDescSol': '" + Desc + "'," +
                "'inEstApr': '" + inEstApr + "'," +
                "'inNumeroCuotas': '" + inNumeroCuotas + "'," +
                "'vcMesesCuotas': '" + vcMesesCuotas + "'," +
                "'inMesesPeriodoGracia': '" + inMesesPeriodoGracia + "'," +
                "'dcMonto': '" + dcMonto + "'," +
                "'vcCodEmp': '" + CodEmp + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d != "0") {
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><h1>Su solicitud fue enviada con éxito</h1><br/>", document, CerroMensaje);
                } else {
                    alerta("No hay dispositivos disponible para el modelo seleccionado, por favor elija otro modelo");
                    BloquearPagina(false);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }


}
function EnviarSolicitudReparacion() {
    var CodEmp = $("#hdfCodEmpleado").val();
    var CodDisp = $("#hdfCodModDis").val();

    var CodModDis = $("#hdfCodModDis").val();

    var Desc = '';
    $.each(arContenidos, function () {
        if (this.contenido == "Mensaje") {
            Desc = $("#txtMensaje").data("kendoEditor").value().replace(/'/g, "&#39").replace(/\\/g, "&#92");
        }
    });
    var NumLin = $("#hdfLineaSel").val();
    var inEstApr = $("#ddlEstadoCreacion").val();
    var ArchAdj = '';

    var inEstApr = $("#ddlEstadoCreacion").val();
    var dcMonto = $("#txtMonto").val() == '' ? '0' : $("#txtMonto").val();
    var inNumeroCuotas = MesCuo == '' ? $("#txtMesesCuotas").val() : MesCuo;
    var vcMesesCuotas = MesCuo == '' ? '' : MesesCuotas;
    var inMesesPeriodoGracia = $("#txtPeriodoGracia").val();

    if (inNumeroCuotas == "") {
        alerta("El número de cuotas es requerido.");
        return;
    }
    if (inNumeroCuotas == "0" && NumMinCuo != "0" && NumMaxCuo != "0") {
        if (inNumeroCuotas < NumMinCuo || inNumeroCuotas > NumMaxCuo) {
            alerta("El número de cuotas debe estar contenido en el rango especificado.");
            return;
        }
    }
    if (inMesesPeriodoGracia == "") {
        alerta("El número de meses del periodo de gracia es requerido.");
        return;
    }
    if (MinPerGra != "0" && MaxPerGra != "0") {
        if (inMesesPeriodoGracia < MinPerGra || inMesesPeriodoGracia > MaxPerGra) {
            alerta("El número de meses del periodo de gracia debe estar contenido en el rango especificado.");
            return;
        }
    }

    if (lstUbicaciones.length != 0) {
        ArchAdj = lstUbicaciones.join("|");
    }
    if (Desc == '') {
        alerta("Debe ingresar el motivo por el que se solicitua la reparación.");
        return;
    }
    dcMonto = ParseFloatMultiPais(dcMonto, oCulturaLocal);
    //alerta("Empleado: " + CodEmp + "\nDispositivo: " + CodDisp + "\nDescripcion: " + Desc + "\nAdjuntos: " + ArchAdj);
    BloquearPagina(true);
    $.ajax({
        type: "POST",
        url: "Adm_NuevaSolicitud.aspx/EnviarSolicitudReparacion",
        data: "{'vcCodEmp': '" + CodEmp + "'," +
            "'vcArchAdj': '" + ArchAdj + "'," +
            "'vcNumLin': '" + NumLin + "'," +
            "'codIMEI': '" + CodDisp + "'," +
            "'inEstApr': '" + inEstApr + "'," +
            "'dcMonto': '" + dcMonto + "'," +
            "'inNumeroCuotas': '" + inNumeroCuotas + "'," +
            "'vcMesesCuotas': '" + vcMesesCuotas + "'," +
            "'inMesesPeriodoGracia': '" + inMesesPeriodoGracia + "'," +
            "'vcDesSol': '" + Desc + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#txtDescripcion").val("");
            if (result.d != "0") {
                window.parent.ActualizarGrilla();

                SolicitudModificada_EnviarMensaje(result.d, "", "");

                Mensaje("<br/><h1>Su solicitud fue enviada con éxito</h1><br/>", document, CerroMensaje);
            } else if (result.d == "0") {
                alerta("Ya hay una solicitud pendiente para dicho dispositivo");
                BloquearPagina(false);
            } else if (result.d == "-1") {
                alerta("La solicitud no pudo ser enviada, vuelva a intentarlo, si el problema persiste consulte a su administrador");
                BloquearPagina(false);
            }
            $("#txtDescripcion").val("");
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}
function EnviarSolicitudActivacion() {
    var CodEmp = $("#hdfCodEmpleado").val();
    var NumLin = $("#hdfLineaSel").val();
    var Desc = '';
    $.each(arContenidos, function () {
        if (this.contenido == "Mensaje") {
            Desc = $("#txtMensaje").data("kendoEditor").value().replace(/'/g, "&#39").replace(/\\/g, "&#92");
        }
    });

    var ArchAdj = '';
    if (lstUbicaciones.length != 0) {
        ArchAdj = lstUbicaciones.join("|");
    }
    var arServ = [];
    var arCost = [];
    var filas = $(".fila");
    var i = 0;
    for (i = 0; i < filas.length; i++) {
        var chk = $(filas[i]).find("input");
        if (chk.is(":checked")) {
            //arServ.push(chk.attr("id"));
            arServ.push({ codigo: chk.attr("id"), nombre: $($(filas[i]).find("label")[0]).text() });
        }
    }

    var arServDel = jQuery.grep(arServiciosActuales, function (val) {
        var sum = 0;
        for (i = 0; i < arServ.length; i++) {
            //if (val.codigo == arServ[i]) {
            if (val.codigo == arServ[i].codigo) {
                sum = sum + 1;
            }
        }
        if (sum == 0) {
            return val;
        }
    });
    var arServAdd = jQuery.grep(arServ, function (val) {
        var sum = 0;
        for (i = 0; i < arServiciosActuales.length; i++) {
            //if (val.codigo == arServiciosActuales[i]) {
            if (val.codigo == arServiciosActuales[i].codigo) {
                sum = sum + 1;
            }
        }
        if (sum == 0) {
            return val;
        }
    });

    if (arServAdd.length == 0 && arServDel.length == 0) {
        alerta("No ha realizado ningún cambio en sus servicios actuales.");
        return;
    }
    BloquearPagina(true);

    var xmlDetalle = '<?xml version="1.0" encoding="iso-8859-1"?><TABLE>';
    $.each(arServAdd, function () {
        xmlDetalle = xmlDetalle + "<DETALLE><IdServicio>" + this.codigo + "</IdServicio><Estado>1</Estado></DETALLE>";
    });
    $.each(arServDel, function () {
        xmlDetalle = xmlDetalle + "<DETALLE><IdServicio>" + this.codigo + "</IdServicio><Estado>0</Estado></DETALLE>";
    });
    xmlDetalle = xmlDetalle + "</TABLE>";

    //alert("CodEmpleado: " + CodEmp + "\nLinea: " + NumLin + "\nServicios Actuales: " + arServiciosActuales.join(",") +
    //    "\nMensaje: " + Desc + "\nAdjuntos: " + ArchAdj + 
    //    "\nServicios Seleccoinados: " + arServ.join(",") + "\nServicios Agregados: " + arServAdd.join(",") + 
    //    "\nServicios Quitados: " + arServDel.join(",") + "\nCostos: " + arCost.join(","));

    //alert(arServAdd.length + ", " + arServDel.length);

    var inEstApr = $("#ddlEstadoCreacion").val();

    var dcMonto = $("#txtMonto").val() == '' ? '0' : $("#txtMonto").val();

    var inNumeroCuotas = MesCuo == '' ? $("#txtMesesCuotas").val() : MesCuo;
    var vcMesesCuotas = MesCuo == '' ? '' : MesesCuotas;
    var inMesesPeriodoGracia = $("#txtPeriodoGracia").val();

    if (inNumeroCuotas == "") {
        alerta("El número de cuotas es requerido.");
        return;
    }
    if (inNumeroCuotas == "0" && NumMinCuo != "0" && NumMaxCuo != "0") {
        if (inNumeroCuotas < NumMinCuo || inNumeroCuotas > NumMaxCuo) {
            alerta("El número de cuotas debe estar contenido en el rango especificado.");
            return;
        }
    }
    if (inMesesPeriodoGracia == "") {
        alerta("El número de meses del periodo de gracia es requerido.");
        return;
    }
    if (MinPerGra != "0" && MaxPerGra != "0") {
        if (inMesesPeriodoGracia < MinPerGra || inMesesPeriodoGracia > MaxPerGra) {
            alerta("El número de meses del periodo de gracia debe estar contenido en el rango especificado.");
            return;
        }
    }

    dcMonto = ParseFloatMultiPais(dcMonto, oCulturaLocal);

    $.ajax({
        type: "POST",
        url: "Adm_NuevaSolicitud.aspx/EnviarSolicitudActivacion",
        data: "{'vcNumLin': '" + NumLin + "'," +
            "'vcCodEmp': '" + CodEmp + "'," +
            "'xmlDetalle': '" + xmlDetalle + "'," +
            "'vcArchAdj': '" + ArchAdj + "'," +
            "'inEstApr': '" + inEstApr + "'," +
            "'dcMonto': '" + dcMonto + "'," +
            "'inNumeroCuotas': '" + inNumeroCuotas + "'," +
            "'vcMesesCuotas': '" + vcMesesCuotas + "'," +
            "'inMesesPeriodoGracia': '" + inMesesPeriodoGracia + "'," +
            "'vcDescSol': '" + Desc + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d != '0') {
                window.parent.ActualizarGrilla();
                Mensaje("<br/><h1>Su solicitud fue enviada con éxito</h1><br/>", document, CerroMensaje);
            } else if (result.d == '0') {
                alerta("Ya existe una solicitud para este empleado");
            }
            BloquearPagina(false);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function EnviarSolicitudAmpliacion() {
    var CodEmp = $("#hdfCodEmpleado").val(); //empleado
    var NumLin = $("#hdfLineaSel").val(); //dispositivo
    var Desc = '';
    $.each(arContenidos, function () {
        if (this.contenido == "Mensaje") {
            Desc = $("#txtMensaje").data("kendoEditor").value().replace(/'/g, "&#39").replace(/\\/g, "&#92");
        }
    });
    var inEstApr = $("#ddlEstadoCreacion").val();
    var dcMonto = $("#txtMonto").val() == '' ? '0' : $("#txtMonto").val();

    var inNumeroCuotas = MesCuo == '' ? $("#txtMesesCuotas").val() : MesCuo;
    var vcMesesCuotas = MesCuo == '' ? '' : MesesCuotas;
    var inMesesPeriodoGracia = $("#txtPeriodoGracia").val();

    if (inNumeroCuotas == "") {
        alerta("El número de cuotas es requerido.");
        return;
    }
    if (inNumeroCuotas == "0" && NumMinCuo != "0" && NumMaxCuo != "0") {
        if (inNumeroCuotas < NumMinCuo || inNumeroCuotas > NumMaxCuo) {
            alerta("El número de cuotas debe estar contenido en el rango especificado.");
            return;
        }
    }
    if (inMesesPeriodoGracia == "") {
        alerta("El número de meses del periodo de gracia es requerido.");
        return;
    }
    if (MinPerGra != "0" && MaxPerGra != "0") {
        if (inMesesPeriodoGracia < MinPerGra || inMesesPeriodoGracia > MaxPerGra) {
            alerta("El número de meses del periodo de gracia debe estar contenido en el rango especificado.");
            return;
        }
    }
    var ArchAdj = '';
    if (lstUbicaciones.length != 0) {
        ArchAdj = lstUbicaciones.join("|"); // adjuntos
    }
    var CodPlan = $("#hdfCodPlan").val();

    //tipo de ampliacion
    var XMLPaquetes = '';
    if (codPlanActual != 0) { //linea con cuenta por planes
        if (CodPlan == '' || CodPlan == '-1' || CodPlan == '-2') {
            alerta("Plan seleccionado inválido");
            return;
        }
        if (CodPlan == codPlanActual) {
            alerta("No pude finalizar la solicitud seleccionando el mismo plan actual");
            return;
        }
    } else {
        XMLPaquetes = '<?xml version="1.0" encoding="iso-8859-1"?><TABLE>';
        var IdsPaquetes = tbAmpPaquetes.getDataIDs();
        if (IdsPaquetes.length > 0) {
            $.each(IdsPaquetes, function (e) {
                var dataPaquete = tbAmpPaquetes.jqGrid('getRowData', IdsPaquetes[e]);
                var inCodTipSer = dataPaquete.inTipoServ == '2' ? dataPaquete.P_inCod.toString() : '0';
                var inCodSer = dataPaquete.inTipoServ == '1' ? dataPaquete.P_inCod.toString() : '0';
                var inCant = dataPaquete.vcCantReal.toString();
                var dcCost = dataPaquete.dcCostoReal.toString();
                var inCodPaqAmp = dataPaquete.inCodPaqAmp.toString();
                XMLPaquetes += "<DETALLE><IdSolicitud>-1</IdSolicitud><inCodTipSer>" + inCodTipSer + "</inCodTipSer><inCodSer>";
                XMLPaquetes += inCodSer + "</inCodSer><inCant>" + inCant + "</inCant><dcCost>" + dcCost + "</dcCost>";
                XMLPaquetes += "<inCodPaqAmp>" + inCodPaqAmp + "</inCodPaqAmp>";
                XMLPaquetes += "</DETALLE>";
            });
        } else {
            alerta("No ha agregado ningúna paquete de ampliación.");
            return;
        }
        XMLPaquetes += "</TABLE>";
    }

    dcMonto = ParseFloatMultiPais(dcMonto, oCulturaLocal);

    //alert(XMLPaquetes);
    //alerta("Empleado: " + CodEmp + "\nLinea: " + NumLin + "\nAdjuntos: " + ArchAdj + "\nPlan Sel: " + CodPlan + "\nXML: " + XMLPaquetes + "\nDesc: " + Desc);
    BloquearPagina(true);
    $.ajax({
        type: "POST",
        url: "Adm_NuevaSolicitud.aspx/EnviarSolicitudAmpliacion",
        data: "{'vcNumLin': '" + NumLin + "'," +
            "'vcCodEmp': '" + CodEmp + "'," +
            "'vcArchAdj': '" + ArchAdj + "'," +
            "'CodPlan': '" + CodPlan + "'," +
            "'vcDescSol': '" + Desc + "'," +
            "'inEstApr': '" + inEstApr + "'," +
            "'dcMonto': '" + dcMonto + "'," +
            "'xmlDetalleAmp':'" + XMLPaquetes + "'," +
            "'inNumeroCuotas': '" + inNumeroCuotas + "'," +
            "'vcMesesCuotas': '" + vcMesesCuotas + "'," +
            "'inMesesPeriodoGracia': '" + inMesesPeriodoGracia + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d != '0') {
                window.parent.ActualizarGrilla();
                Mensaje("<br/><h1>Su solicitud fue enviada con éxito</h1><br/>", document, CerroMensaje);
            } else if (result.d == '0') {
                alerta("Ya existe una solicitud de ampliación para esta línea");
            }
            //BloquearPagina(false);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnValidarCambiosEnActivacionDeServicios() {
    var ArchAdj = '';
    if (lstUbicaciones.length != 0) {
        ArchAdj = lstUbicaciones.join("|");
    }
    var arServ = [];
    var arCost = [];
    var filas = $(".fila");
    var i = 0;
    for (i = 0; i < filas.length; i++) {
        var chk = $(filas[i]).find("input");
        if (chk.is(":checked")) {
            //arServ.push(chk.attr("id"));
            arServ.push({ codigo: chk.attr("id"), nombre: $($(filas[i]).find("label")[0]).text() });
        }
    }

    var arServDel = jQuery.grep(arServiciosActuales, function (val) {
        var sum = 0;
        for (i = 0; i < arServ.length; i++) {
            //if (val.codigo == arServ[i]) {
            if (val.codigo == arServ[i].codigo) {
                sum = sum + 1;
            }
        }
        if (sum == 0) {
            return val;
        }
    });
    var arServAdd = jQuery.grep(arServ, function (val) {
        var sum = 0;
        for (i = 0; i < arServiciosActuales.length; i++) {
            //if (val.codigo == arServiciosActuales[i]) {
            if (val.codigo == arServiciosActuales[i].codigo) {
                sum = sum + 1;
            }
        }
        if (sum == 0) {
            return val;
        }
    });

    if (arServAdd.length == 0 && arServDel.length == 0) {
        return false;
    } else {
        return true;
    }
}

function CerroMensaje() {
    if (lstUbicaciones == '') {
        //window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
        window.parent.tab.tabs("remove", indiceTab);
        BloquearPagina(false);
    } else { //limpiar archivos adjuntos si se han agregado
        $.ajax({
            type: "POST",
            url: "Adm_AdjuntarArchivos.aspx/EliminarArchivosTemporales",
            data: "{'lstArchivos': '" + lstUbicaciones.join("|") + "', 'charSeparador': '|'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                //Mensaje("<br/><h1>Su solicitud cancelada</h1><br/>", document, CerroMensaje2);
                CerroMensaje2();
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
    //BloquearPagina(false);
}

function CerroMensaje2() {
    //window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));

    if ($("#hdfEsCulminada").val() == "1") {
        window.parent.Modal.dialog("close");
    } else {
        indiceTab = window.parent.tab.tabs("option", "selected");
        window.parent.tab.tabs("remove", indiceTab);
    }

    BloquearPagina(false);
}

function CerroMensaje3() {
    BloquearPagina(false);

    if (lstUbicaciones == '') {
        Mensaje("<br/><h1>Su solicitud cancelada</h1><br/>", document, CerroMensaje2);
        //window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    } else { //limpiar archivos adjuntos si se han agregado
        $.ajax({
            type: "POST",
            url: "Adm_AdjuntarArchivos.aspx/EliminarArchivosTemporales",
            data: "{'lstArchivos': '" + lstUbicaciones.join("|") + "', 'charSeparador': '|'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                Mensaje("<br/><h1>Su solicitud cancelada</h1><br/>", document, CerroMensaje2);
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
}

function EnviarSolicitudPersonalizada() {
    var tipsol = $("#ddlTipoSolicitud").data("kendoComboBox").value();
    var vcTabla = "";
    var arSolPer = [];
    arSolPer = $("#ifSolPer")[0].contentWindow.enviarDatosSolicitudPersonalizada();
    var nTipSol = "es" + tipsol.toString();
    vcTabla = arTiposSolicitud[nTipSol].vcTabla;
    var inEst = $("#ddlEstadoCreacion").val();

    if (inEst == 7 || inEst == 8 || inEst == 9) {
        if (arSolPer.inNumCuo == "") {
            alerta("El número de cuotas es requerido.");
            return;
        }
        if (arSolPer.Meses == "0" && arSolPer.inNumMinCuo != "0" && arSolPer.inNumMaxCuo != "0") {//No es Meses cuotas ni tiene rango establecido
            if (arSolPer.inNumCuo < arSolPer.inNumMinCuo || arSolPer.inNumCuo > arSolPer.inNumMaxCuo) {
                alerta("El número de cuotas debe estar contenido en el rango especificado.");
                return;
            }
        }
        if (arSolPer.inPerGra == "") {
            alerta("El número de meses del periodo de gracia es requerido.");
            return;
        }
        if (arSolPer.inMinPerGra != "0" && arSolPer.inMaxPerGra != "0") {//Es rango de periodo de gracia
            if (arSolPer.inPerGra < arSolPer.inMinPerGra || arSolPer.inPerGra > arSolPer.inMaxPerGra) {
                alerta("El número de meses del periodo de gracia debe estar contenido en el rango especificado.");
                return;
            }
        }
        //validad número decimal con 4 enteros
        if (arSolPer.Vacio == "0") {
            if (tipsol == "30" && parseFloat(arSolPer.dcMonto.toString().replace(oCulturaLocal.vcSimSepMil, "")) <= 0) {
                alerta("El monto de la solicitud debe ser mayor a 0.");
                return;
            }

            //        JHERRERA 20140812 Valida decimal sin considerar el separador.
            //        var cantEnteros = arSolPer.dcMonto.toString().split('.')[0]
            if (parseFloat(arSolPer.dcMonto.toString().replace(oCulturaLocal.vcSimSepMil, "")) > 9999) {
                alerta("La solicitud no puede contener un monto mayor a " + oCulturaLocal.Moneda.vcSimMon + " 9 999.");
                return;
            }
        }
    }
    if (arSolPer.Vacio == "0" && arSolPer.LongMin == "OK|") {
        if (tipsol == "16") {
            var fechaactual = new Date();
            fechaactual = fechaactual.getFullYear() + String(fechaactual.getMonth() + 1).padStart(2, '0') + String(fechaactual.getDate()).padStart(2, '0');
            var fechaida = arSolPer.vcValPer.split(',')[0].replace('dbo.MOV_f_ConvierteAnsiEnFecha($$$', '').replace('$$$)', '');
            var fecharetorno = arSolPer.vcValPer.split(',')[1].replace('dbo.MOV_f_ConvierteAnsiEnFecha($$$', '').replace('$$$)', '');

            if (parseInt(fechaida) > parseInt(fecharetorno)) {
                alerta("La fecha de retorno debe ser mayor o igual a la fecha de ida.");
            }
            else if (parseInt(fechaida) < parseInt(fechaactual)) {
                alerta("La fecha de ida debe ser mayor a la fecha actual.");
            }
            else {
                if ($("#lblMsjConfirmacion").text() != "") {
                    $('#divMsgConfirmar').dialog({
                        title: "¡Alerta!",
                        modal: true,
                        width: 330,
                        buttons: {
                            "Si": function () {
                                fnGrabarPrevioSolicitudPersonalizada(arSolPer, tipsol, vcTabla, inEst);

                                $(this).dialog("close");
                            },
                            "Cancelar": function () {
                                $(this).dialog("close");
                            }
                        }
                    });
                } else {
                    fnGrabarPrevioSolicitudPersonalizada(arSolPer, tipsol, vcTabla, inEst);
                }
            }
        }
        else {
            if ($("#lblMsjConfirmacion").text() != "") {
                $('#divMsgConfirmar').dialog({
                    title: "¡Alerta!",
                    modal: true,
                    width: 330,
                    buttons: {
                        "Si": function () {
                            fnGrabarPrevioSolicitudPersonalizada(arSolPer, tipsol, vcTabla, inEst);

                            $(this).dialog("close");
                        },
                        "Cancelar": function () {
                            $(this).dialog("close");
                        }
                    }
                });
            } else {
                fnGrabarPrevioSolicitudPersonalizada(arSolPer, tipsol, vcTabla, inEst);
            }
        }
    } else {
        if (arSolPer.Vacio != "0") {
            alerta("Debe ingresar todos los datos requeridos");
            BloquearPagina(false);
        }
        else {
            let lstResult = arSolPer.LongMin.split('|');
            alerta("La longitud mínima para el campo es de " + lstResult[1]);
            //$("#" + lstResult[0]).focus();
            BloquearPagina(false);
        }
        
    }
}

function fnGrabarPrevioSolicitudPersonalizada(arSolPer, tipsol, vcTabla, inEst) {
    BloquearPagina(true);

    if ($("#hdfEsCulminada").val() == "1") {
        fnGrabarSolicitudPersonalizadaCulminada(arSolPer, tipsol, vcTabla, inEst);
    } else {
        fnGrabarSolicitudPersonalizada(arSolPer, tipsol, vcTabla, inEst);
    }
}

function fnGrabarSolicitudPersonalizada(arSolPer, tipsol, vcTabla, inEst) {
    $.ajax({
        type: "POST",
        url: "Adm_NuevaSolicitud.aspx/EnviarSolicitudPersonalizada",
        data: "{'vcCodEmp': '" + $("#hdfCodEmpleado").val() + "'," +
            "'inTipSol': '" + tipsol + "'," +
            "'vcCamPer': '" + arSolPer.vcCamPer + "'," +
            "'vcValPer': '" + arSolPer.vcValPer + "'," +
            "'vcAuditoria': '" + arSolPer.vcAuditoria + "'," +
            "'biFraccionamiento': '" + arSolPer.biFraccionamiento + "'," +
            "'vcEsMeses': '" + arSolPer.Meses + "'," +
            "'vcMeses': '" + arSolPer.inNumCuo + "'," +
            "'inPerGra': '" + arSolPer.inPerGra + "'," +
            "'vcTabla': '" + vcTabla + "'," +
            "'inEst': '" + inEst + "'," +
            "'dcMonto': '" + arSolPer.dcMonto + "'," +
            "'vcAdj': '" + arSolPer.vcAdjuntos + "'," +
            "'inTipoProducto': '" + arSolPer.inTipoProducto + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d != '0') {
                //Mensaje("<br/><h1>Su solicitud fue enviada con éxito</h1><br/>", document, $("#ddlTipoSolicitud").change());
                window.parent.ActualizarGrilla();

                SolicitudModificada_EnviarMensaje(result.d, "", "");

                window.scrollTo(0, 0);
                Mensaje("<br/><h1>Su solicitud fue enviada con éxito</h1><br/>", document, CerroMensaje);

            } else if (result.d == '0') {
                alert("Hubo un problema con la creación de la solicitud. Por favor contáctese con su administrador de sistemas.");
                //alerta("Ya existe una solicitud de ampliación para esta línea");
            }
            BloquearPagina(false);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnGrabarSolicitudPersonalizadaCulminada(arSolPer, tipsol, vcTabla, inEst) {
    $.ajax({
        type: "POST",
        url: "Adm_NuevaSolicitud.aspx/EnviarSolicitudPersonalizadaCulminada",
        data: "{'vcCodEmp': '" + $("#hdfCodEmpleado").val() + "'," +
            "'inTipSol': '" + tipsol + "'," +
            "'vcCamPer': '" + arSolPer.vcCamPer + "'," +
            "'vcValPer': '" + arSolPer.vcValPer + "'," +
            "'vcAuditoria': '" + arSolPer.vcAuditoria + "'," +
            "'biFraccionamiento': '" + arSolPer.biFraccionamiento + "'," +
            "'vcEsMeses': '" + arSolPer.Meses + "'," +
            "'vcMeses': '" + arSolPer.inNumCuo + "'," +
            "'inPerGra': '" + arSolPer.inPerGra + "'," +
            "'vcTabla': '" + vcTabla + "'," +
            "'inEst': '" + inEst + "'," +
            "'dcMonto': '" + arSolPer.dcMonto + "'," +
            "'vcAdj': '" + arSolPer.vcAdjuntos + "'," +
            "'inTipoProducto': '" + arSolPer.inTipoProducto + "'," +
            "'inTipoProceso': '" + arSolPer.inTipoProceso + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var inCodSol = result.d.split(",")[0];
            var vcCodSol = result.d.split(",")[1];
            var vcMensaje = result.d.split(",")[2];
            if (inCodSol > 0) {
                //$('#" & Me.ClientID & "_dvDetalleBusqueda').dialog('close');")
                //Mensaje("<br/><h1>Su solicitud fue enviada con éxito</h1><br/>", document, CerroMensaje);
                //window.parent.Modal.dialog("close");

                BloquearPagina(true);
                $("#btnFinalizar").hide();
                $("#btnBusquedaEmpleado").hide();
                $("#tdNombreEmpleado3").hide();
                //                $('#txtEmpleado').attr('readonly', true);
                $("#btnCancelar").button("option", "disabled", false);
                $("#ifSolPer")[0].contentWindow.BloquearControles();
                alerta("La solicitud fue creada satisfactoriamente con el <b>código: " + vcCodSol + "</b>");

                SolicitudModificada_EnviarMensaje(inCodSol, "", "");

            } else if (inCodSol == '0') {
                alerta("Hubo un problema con la creación de la solicitud. Por favor contáctese con su administrador de sistemas.");
                BloquearPagina(true);
            } else if (inCodSol == '-1') {
                alerta("El usuario no puede crear una solicitud ya que no tiene permisos de aprobación para el tipo de solicitud seleccionado.");
                BloquearPagina(true);
            } else if (inCodSol == '-2') {
                alerta("El usuario no puede crear una solicitud ya que no tiene permisos de asignación para el tipo de solicitud seleccionado.");
                BloquearPagina(true);
            } else if (inCodSol == '-3') {
                alerta("El usuario no puede crear una solicitud ya que no tiene permisos para culminar el tipo de solicitud seleccionado.");
                BloquearPagina(true);
            } else if (inCodSol == '-4') {
                alerta(vcMensaje);
                BloquearPagina(true);
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}


function IngresarEmpleadoUnico(Empleado) {
    //alert(Empleado.P_vcCod + " - " + Empleado.vcNom);
    $("#hdfCodEmpleado").val(Empleado.P_vcCod);
    var arNom = Empleado.vcNom.split('=');
    $("#txtEmpleado").val(Empleado.vcNom);
    //$("#ddlTipoSolicitud").data("kendoComboBox").value(-1);
    //$("#ddlTipoSolicitud").data("kendoComboBox").enable(true);
    $("#dvTabs").hide();
    $("#lblMensajeVerificacion").text('');

    fnValidarListarTipoSolicitudXGrupoEmpleado();

}

function DeshabilitarContinuar(vfrom) {
    //alert("DeshabilitarContinuar");
    // '1' == Galeria
    // '2' == ArchivosAdjuntos
    // '3' == Otros
    if ($("#btnSiguiente:visible").length > 0) {
        $("#btnSiguiente").button("option", "disabled", true);
    } else {
        $("#btnFinalizar").button("option", "disabled", true);
    }
    if (vfrom == "1") {
        setCaptura('Galeria', false);
        //$("#hdfCodModDis").val('');
        //codDispTemp = '';
    }
}
function HabilitarContinuar() {
    //alert(valAvance);
    if (valAvance) {
        if ($("#btnSiguiente:visible").length > 0) {
            $("#btnSiguiente").button("option", "disabled", false);
        } else {
            $("#btnFinalizar").button("option", "disabled", false);
        }
    } else {
        if ($("#btnSiguiente:visible").length > 0) {
            $("#btnSiguiente").button("option", "disabled", true);
        } else {
            $("#btnFinalizar").button("option", "disabled", true);
        }
    }
}
function verificarCaptura(contenido) {
    var resultado = true;
    $.each(arContenidos, function () {
        if (this.contenido == contenido) {
            if (this.obligatorio == true && this.capturaCompleta == false) {
                resultado = false;
            }
            //mensaje
            if (this.contenido == 'Mensaje') {
                $("#lblMensajeValidCant").text(MensajeValidCant);
                $("#lblMensajeValidTipo").text(MensajeValidTipo == 'w' ? 'palabras' : 'caracteres');
                $("#lblMensajeValidTipo2").text(MensajeValidTipo == 'w' ? 'palabras' : 'caracteres');
                if (this.obligatorio == true) {
                    $("#dvMensajeObligatorio").show();
                } else {
                    $("#dvMensajeObligatorio").hide();
                }
            }
        }
    });
    return resultado;
}
function setCaptura(contenido, valor) {
    $.each(arContenidos, function () {
        if (this.contenido == contenido) {
            this.capturaCompleta = valor;
        }
    });
}
function selContOblig(contenido) {
    var result = false;
    $.each(arContenidos, function () {
        if (this.contenido == contenido) {
            result = this.obligatorio;
        }
    });
    return result;
}
function codDispositivoGaleria(codigo, nombreModelo, CostoEquipo, codigoOperador, nombreOperador) {
    //alert(codigoOperador + ", " + nombreOperador);
    if (codigoOperador == undefined || codigoOperador == -1) {
        ResumenNombreOperador = '';
    } else {
        ResumenNombreOperador = nombreOperador;
    }
    ResumenNombreModeloGaleria = nombreModelo;
    //alert("CAPTURA DESDE NUEVA SOLIITUD\nCostoEquipo: " + CostoEquipo + "\nnombreModelo: " + nombreModelo);
    //if (CostoEquipo != "-1" && $("#hdfTipoSolicitud").val() != '3') {
    //if ($("#hdfTipoSolicitud").val() != '3') {
    //    ResumenCostoReferencial = CostoEquipo;
    //} else if ($("#hdfTipoSolicitud").val() == '3') {
    //    ResumenCostoExtra = CostoEquipo;
    //}
    ResumenCostoReferencial = CostoEquipo;
    //valAvance = true;
    //alert(message);
    //if (valAvance) {
    //    $("#btnSiguiente").button("option", "disabled", false);
    //};
    setCaptura('Galeria', true);
    //alert("codigo: " + codigo + "\nnombre: " + nombreModelo + "\ncosto: " + costoReferencial);
    if ($("#hdfCodModDis").val() != "") {
        codDispTemp = $("#hdfCodModDis").val();
    }
    //codDispTemp = codigo;
    $("#hdfCodModDis").val(codigo);
    //si es el ultimo tab, guarda el codigo de modelo directametne
    //if (arContenidos[arContenidos.length - 1].contenido == 'Galeria') {
    //    $("#hdfCodModDis").val(codigo); 
    //};

}
function desactivarTabPlanes(valor) {
    var indexPlan = $("#tbSolicitud").tabs('option', 'selected') + 1;
    if (valor && $("#hdfTipoSolicitud").val() == '2') { //nuevo, desactivar
        arIndexTabMostrados.push(indexPlan);
        tabPlanesVisible = false;
    } else if (!valor && $("#hdfTipoSolicitud").val() == '2') { //nuevo, activar
        arIndexTabMostrados = jQuery.grep(arIndexTabMostrados, function (value) { return value != indexPlan; });
        tabPlanesVisible = true;
    }
    $("#tbSolicitud").tabs("option", "disabled", arIndexTabMostrados);
    //desactivarAvance();
}

//function desactivarAvance() {
//    var numTabs = $("#tbSolicitud").tabs("length");
//    var tabActual = $("#tbSolicitud").tabs('option', 'selected');
//    var arDisabled = []
//    for (var i = tabActual + 1; i < numTabs; i++) {
//        arDisabled.push(i);
//        //arIndexTabMostrados.push(i);
//        //arIndexTabMostrados = jQuery.grep(arIndexTabMostrados, function (value) {
//        //    return i == value ? value : i;
//        //});
//    };
//    //alert(arDisabled);
//    //$("#tbSolicitud").tabs("option", "disbled", arDisabled);
//};

function TerminarSolicitud() {
    $("#ddlTipoSolicitud").change();
    $("#btnFinalizar").button("option", "disabled", true);
}
function TerminarSolicitudPersonalizada() {
    $("#ddlTipoSolicitud").change();
    //$("#btnFinalizar").button("option", "disabled", true);
}
function fnMostrarCodEmp(valor) {
    if ($("#hdfCodEmpleado").val() != valor) {
        $("#dvTabs").hide();
        $("#dvCreacionEstado").hide();
    }
    $("#hdfCodEmpleado").val(valor);
    if (valor != '') {
        $("#ddlTipoSolicitud").data("kendoComboBox").value(""); //-1
        $("#ddlTipoSolicitud").data("kendoComboBox").enable(true);
    } else {
        $("#ddlTipoSolicitud").data("kendoComboBox").value(""); //-1
        $("#ddlTipoSolicitud").data("kendoComboBox").enable(false);
    }

    //    $("#hdfCodEmpleado").val(ui.item.vcCodEmp);
    //    $("#hdfGrupOrigEmp").val(ui.item.grupOri);

    fnValidarListarTipoSolicitudXGrupoEmpleado();


}
//function CerroMensaje() {
//    //BloquearPagina(false);
//    window.parent.tab.tabs("remove", indexTab);
//}
function DatosFinanciamiento() {
    //ListarDatosFinanciamiento
    var tipoSolicitud = $("#ddlTipoSolicitud").data("kendoComboBox").value();
    $.ajax({
        type: "POST",
        url: "Adm_NuevaSolicitud.aspx/ListarDatosFinanciamiento",
        data: "{'inCodTipSol': '" + tipoSolicitud + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //VISOR DE DETALLE DE FINANCIAMIENTO
            //$("#lblNombreFinanc").text("(" + result.d.DescripcionFinanc + ")");
            $("#txtNombreFinanc").val(result.d.DescripcionFinanc);
            $("#hdfIdFInanciamiento").val(result.d.inTipoFinanciamiento);


            //alert($("#hdfTipoSolicitud").val());
            //Monto (dcMonto)
            if ($("#hdfAdmin").val() != "1") { //no es administrador
                $("#trMontoFijo").show();
                $("#txtMonto").attr("disabled", true);
                $("#txtMonto").attr("enabled", false);
                if (result.d.biMontoFijo == "True") { //tiene monto fijo, mostrar deshabilitado
                    //if (result.d.dcMonto == "0") {
                    //    $("#txtMonto").val("");
                    //    $("#lblMontoReferencial").text("No se ha definido monto fijo en la configuración del tipo de solicitud.");
                    //} else {
                    //alert(result.d.dcMonto + 'tres');
                    $("#txtMonto").val(result.d.dcMonto);
                    $("#lblMontoReferencial").text("Monto fijo del tipo de solicitud.");
                    //}
                } else { //no tiene monto fijo
                    if ($("#hdfTipoSolicitud").val() == '2' || $("#hdfTipoSolicitud").val() == '4') { //nuevo,reparacion
                        //valor en caja de monto
                        if (ResumenCostoReferencial == '' || ResumenCostoReferencial == '-1') {
                            $("#txtMonto").val('');
                            $("#lblMontoReferencial").text("No se ha podido calcular ningún monto para esta solicitud.");
                        } else {
                            //alert(ResumenCostoReferencial + 'cuatro')
                            $("#txtMonto").val(ResumenCostoReferencial);
                            $("#lblMontoReferencial").text("");
                        }
                    } else if ($("#hdfTipoSolicitud").val() == '3' || $("#hdfTipoSolicitud").val() == '1') { //reposición y cambio
                        if (inTipoCostoReposicion == 0) { // sólo penalidad
                            //alert(ResumenCostoExtra + 'cinco');
                            $("#txtMonto").val(ResumenCostoExtra);
                            $("#lblMontoReferencial").text("(Costo de reposición calculado según fórmula).");
                        } else if (inTipoCostoReposicion == 1) { // penalidad y equipo
                            if (oCulturaLocal.vcSimDec.toString() == ',') {
                                $("#txtMonto").val(parseFloat(ParseFloatMultiPais(ResumenCostoReferencial, oCulturaLocal)) + parseFloat(ParseFloatMultiPais(ResumenCostoExtra, oCulturaLocal)));
                                $("#txtMonto").val(FormatoNumero($("#txtMonto").val(), oCulturaLocal));
                            } else {
                                $("#txtMonto").val(parseFloat(DevuelveNumeroSinFormato(ResumenCostoReferencial, oCulturaLocal, false)) + parseFloat(DevuelveNumeroSinFormato(ResumenCostoExtra, oCulturaLocal, false)));
                                $("#txtMonto").val(FormatoNumero($("#txtMonto").val(), oCulturaLocal, false));
                            }

                            if (ResumenCostoExtra != '') { //mostrar penalidad si es mayor a 0
                                if (oCulturaLocal.vcSimDec.toString() == ',') {
                                    $("#lblMontoReferencial").text("Monto adicional (" + FormatoNumero(ResumenCostoExtra, oCulturaLocal) + ") por tiempo de contrato faltante. Fin de contrato: " + ResumenFechaFinContrato);
                                }
                                else {
                                    $("#lblMontoReferencial").text("Monto adicional (" + ResumenCostoExtra + ") por tiempo de contrato faltante. Fin de contrato: " + ResumenFechaFinContrato);
                                }

                            }
                        } else if (inTipoCostoReposicion == 2) { //solo equipo
                            //alert(ResumenCostoReferencial  + 'seis');
                            $("#txtMonto").val(ResumenCostoReferencial);
                            $("#lblMontoReferencial").text("");
                        }
                    }
                }
            } else { //usuario logeado es administrador
                $("#trMontoFijo").show();
                if (result.d.biMontoFijo == "True") {
                    $("#txtMonto").attr("disabled", true);
                    //$("#txtMonto").attr("enabled", false);
                    //if (result.d.dcMonto == "0") {
                    //    $("#txtMonto").val("");
                    //    $("#lblMontoReferencial").text("No se ha definido monto fijo en la configuración del tipo de solicitud.");
                    //} else {
                    //alert(result.d.dcMonto + 'siete');
                    $("#txtMonto").val(result.d.dcMonto);
                    $("#lblMontoReferencial").text("Monto fijo del tipo de solicitud.");
                    //}
                } else {
                    if ($("#hdfTipoSolicitud").val() == '2' || $("#hdfTipoSolicitud").val() == '4') { //nuevo,reparacion
                        if (ResumenCostoReferencial == '' || ResumenCostoReferencial == '-1') {
                            $("#txtMonto").val('');
                            $("#lblMontoReferencial").text("No se ha podido calcular ningún monto para esta solicitud.");
                        } else { //existe algun monto
                            if (ResumenCostoExtra != '') {
                                //$("#txtMonto").val(parseFloat(ResumenCostoReferencial) + parseFloat(ResumenCostoExtra));
                                $("#txtMonto").val(parseFloat(DevuelveNumeroSinFormato(ResumenCostoReferencial, oCulturaLocal, false)) + parseFloat(DevuelveNumeroSinFormato(ResumenCostoExtra, oCulturaLocal, false)));
                                //alert(FormatoNumero(ResumenCostoExtra, oCulturaLocal) + '-2');
                                if (oCulturaLocal.vcSimDec.toString() == ',') {
                                    $("#lblMontoReferencial").text("Monto adicional (" + FormatoNumero(ResumenCostoExtra, oCulturaLocal) + ") por tiempo de contrato faltante. Fin de contrato: " + ResumenFechaFinContrato);
                                }
                                else {
                                    $("#lblMontoReferencial").text("Monto adicional (" + ResumenCostoExtra + ") por tiempo de contrato faltante. Fin de contrato: " + ResumenFechaFinContrato);
                                }
                                //$("#lblMontoReferencial").text("Monto adicional (" + ResumenCostoExtra + ") por tiempo de contrato faltante. Fin de contrato: " + ResumenFechaFinContrato);
                            } else {
                                $("#txtMonto").val(FormatoNumero(ResumenCostoReferencial, oCulturaLocal, false));
                                $("#lblMontoReferencial").text("");
                            }
                        }
                    } else if ($("#hdfTipoSolicitud").val() == '3' || $("#hdfTipoSolicitud").val() == '1') { //reposición y cambio
                        if (inTipoCostoReposicion == 0) {
                            //alert(ResumenCostoExtra + 'nueve');
                            $("#txtMonto").val(ResumenCostoExtra);
                            $("#lblMontoReferencial").text("(Costo de reposición calculado según fórmula).");
                        } else if (inTipoCostoReposicion == 1) {
                            //$("#txtMonto").val(parseFloat(DevuelveNumeroSinFormato(ResumenCostoReferencial, oCulturaLocal, false)) + parseFloat(DevuelveNumeroSinFormato(ResumenCostoExtra, oCulturaLocal, false)));
                            //$("#txtMonto").val(FormatoNumero($("#txtMonto").val(), oCulturaLocal, false));
                            if (oCulturaLocal.vcSimDec.toString() == ',') {
                                $("#txtMonto").val(parseFloat(ParseFloatMultiPais(ResumenCostoReferencial, oCulturaLocal)) + parseFloat(ParseFloatMultiPais(ResumenCostoExtra, oCulturaLocal)));
                                $("#txtMonto").val(FormatoNumero($("#txtMonto").val(), oCulturaLocal));
                            } else {
                                $("#txtMonto").val(parseFloat(DevuelveNumeroSinFormato(ResumenCostoReferencial, oCulturaLocal, false)) + parseFloat(DevuelveNumeroSinFormato(ResumenCostoExtra, oCulturaLocal, false)));
                                $("#txtMonto").val(FormatoNumero($("#txtMonto").val(), oCulturaLocal, false));
                            }
                            if (ResumenCostoExtra != '') { //mostrar penalidad si es mayor a 0
                                //alert(FormatoNumero(ResumenCostoExtra, oCulturaLocal) + '-3');
                                if (oCulturaLocal.vcSimDec.toString() == ',') {
                                    $("#lblMontoReferencial").text("Monto adicional (" + FormatoNumero(ResumenCostoExtra, oCulturaLocal) + ") por tiempo de contrato faltante. Fin de contrato: " + ResumenFechaFinContrato);
                                }
                                else {
                                    $("#lblMontoReferencial").text("Monto adicional (" + ResumenCostoExtra + ") por tiempo de contrato faltante. Fin de contrato: " + ResumenFechaFinContrato);
                                }
                                //$("#lblMontoReferencial").text("Monto adicional (" + ResumenCostoExtra + ") por tiempo de contrato faltante. Fin de contrato: " + ResumenFechaFinContrato);
                            }
                        } else if (inTipoCostoReposicion == 2) {
                            //alert(ResumenCostoReferencial + 'diez');
                            $("#txtMonto").val(ResumenCostoReferencial);
                            $("#lblMontoReferencial").text("");
                        }
                        $("#txtMonto").attr("disabled", true);
                    }
                }
            }
            //Cuotas
            NumMinCuo = "0";
            NumMaxCuo = "0";
            MesCuo = "";
            if (result.d.inTipoFinanciamiento.toString() == "-1") {
                $("#trMesesCuotas").hide();
                $("#txtMesesCuotas").val("0");
            } else if (result.d.PagoContado.toString() == "True") {
                $("#trMesesCuotas").hide();
                $("#txtMesesCuotas").val("1");
            } else {
                //JHERRERA 20160823: Se pidió cambio para chile
                //$("#trMesesCuotas").show();
                //
                if (inMostrarNumCuotas == 1) {
                    $("#trMesesCuotas").show();
                } else {
                    $("#trMesesCuotas").hide();
                    $("#trFinanciamiento").hide();
                }
                //

                if (result.d.Cuotas.toString() != "0") { //Número de cuotas preestablecido
                    $("#txtMesesCuotas").val(result.d.Cuotas);
                    $("#txtMesesCuotas").attr("disabled", true);
                } else if (result.d.MinimoCuotas.toString() != "0" && result.d.MaximoCuotas.toString() != "0") { //Rango de número de cuotas
                    $("#txtMesesCuotas").val('');
                    NumMinCuo = result.d.MinimoCuotas.toString();
                    NumMaxCuo = result.d.MaximoCuotas.toString();
                    $("#lblMesesCuotas").text("El número de cuotas debe estar en el rango de " + NumMinCuo + " y " + NumMaxCuo + ".");
                    if (inMostrarNumCuotas == 0) { $("#txtMesesCuotas").val(NumMinCuo); }
                } else if (result.d.MesesCuotas.toString() != "") { //Meses de Financiamiento Predefinido
                    var lstMeses = result.d.MesesCuotas.split(",");
                    $("#txtMesesCuotas").val(result.d.MesesCuotas.toString().replace("12", "Dic").replace("11", "Nov").replace("10", "Oct").replace("9", "Set").replace("8", "Ago").replace("7", "Jul").replace("6", "Jun").replace("5", "May").replace("4", "Abr").replace("3", "Mar").replace("2", "Feb").replace("1", "Ene"));
                    MesCuo = lstMeses.length;
                    MesesCuotas = result.d.MesesCuotas.toString();
                    $("#txtMesesCuotas").attr("disabled", true);
                    $("#txtMesesCuotas").attr("width", lstMeses.length * 21);
                }
            }

            //Periodo de Gracia
            if (result.d.PeriodoGracia.toString() == "False") {
                $("#trPeriodoGracia").hide();
                $("#txtPeriodoGracia").val("0");
            } else {
                $("#trPeriodoGracia").show();
                if (result.d.MesesPeriodoGracia.toString() != "0") { //Número de meses de periodo de gracia
                    $("#txtPeriodoGracia").val(result.d.MesesPeriodoGracia);
                    $("#txtPeriodoGracia").attr("disabled", true);
                } else if (result.d.MinimoMesesPeriodoGracia.toString() != "0" && result.d.MaximoMesesPeriodoGracia.toString() != "0") { //Rango de número de cuotas
                    $("#txtPeriodoGracia").val("");
                    MinPerGra = result.d.MinimoMesesPeriodoGracia.toString();
                    MaxPerGra = result.d.MaximoMesesPeriodoGracia.toString();
                    $("#lblPeriodoGracia").text("El número de meses debe estar en el rango de " + MinPerGra + " y " + MaxPerGra + ".");
                }
            }

            valAvance = false;
            if (($("#txtPeriodoGracia").is(":disabled") || !$("#trPeriodoGracia").is(":visible")) && ($("#txtMesesCuotas").is(":disabled") || !$("#trMesesCuotas").is(":visible"))) {
                valAvance = true;
            }
            HabilitarContinuar();

            //TAMAÑO DIV RESUMEN
            var heightFinanciamiento = 0;
            if ($("#divFinanciamiento").is(":visible")) {
                heightFinanciamiento = $("#divFinanciamiento").css("height");
            }
            var divResumenDatos = parseInt($("#tbSolicitud").css("height")) - parseInt(heightFinanciamiento) - (heightFinanciamiento == 0 ? 70 : 102); //275
            $("#divResumenDatos").css("height", divResumenDatos);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function wordCount(value) {
    //return $.trim(value.replace(/kendo-ui/<.*?>/g, " ")).replace(/kendo-ui/['";:,.?\-!]+/g, '').match(/kendo-ui/\S+/g).length;
    value = value.replace(/&nbsp;/gi, " ");

    if (value == '') {
        return 0;
    } else {
        return $.trim(value.replace(/<.*?>/g, " ")).replace(/['";:,.?\-!]+/g, '').match(/\S+/g).length;
    }
}

function characterCount(value) {
    var text = $("<div>").html(value).text();
    //alert("value: " + value + "\ntext: " + text);
    return text.length;
}

function LimpiarDatosFinanciamiento() {
    ResumenCostoReferencial = '';
    ResumenModeloSeleccionado = '';
    ResumenNombreModeloGaleria = '';
    ResumenNombreOperador = '';
    ResumenNombrePlan = '';
    ResumenNuevo = true;
}

function VerificarLinea_ActAmp(Linea, TipSol) {
    $.ajax({
        type: "POST",
        url: "Adm_NuevaSolicitud.aspx/VerficiarLinea_ActAmp",
        data: "{'vcNumLin': '" + Linea + "'," +
            "'inTipSol': '" + TipSol + "'," +
            "'vcCodEmp': '" + $("#hdfCodEmpleado").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#btnEquiSol").hide();
            $("#lblMensajeVerificacion").text('');
            msgValidacionGrilla = '';
            if (result.d == "1") {
                msgValidacionGrilla = "Ya existe una solicitud de este tipo para la línea seleccionada";
                $("#btnSiguiente").button("option", "disabled", true);
                valAvance = false;
                $("#btnEquiSol").show();
            } else if (result.d == '2') {
                msgValidacionGrilla = "La línea no tiene ningún servicio agregado.";
                $("#btnSiguiente").button("option", "disabled", true);
                valAvance = false;
            } else {
                msgValidacionGrilla = "";
                //cambiar estado a captura completa
                setCaptura("Dispositivos", true);
                $("#btnSiguiente").button("option", "disabled", false);
            }
            $("#lblMensajeVerificacion").html(msgValidacionGrilla);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnLimpiarDatosServicio() {
    $("#lblAmpNombreServ").html('');
    $("#ddlAmpPaquetes").html('');
    $("#ddlAmpPaquetes").append($("<option></option>").val(-3).text(''));
    $("#ddlTipoServicioAmp").val(-1);
    $("#ddlServCuentaTipo").html('');
    $("#ddlServCuentaTipo").append($("<option></option>").val(-2).text('<Seleccione Tipo>'));
}
