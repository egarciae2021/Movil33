var PaginaPadre = true;

function fnCambiarTemaPrincipal(tema) {
    $("#temaPrincipal").attr("href", "Content/css/themes/" + tema + ".min.css");
}

function FnPublicReiniciar() {
    //if (Seg_temporizador.Reiniciar) {
    //    Seg_temporizador.TiempoInicial = Seg_temporizador.Tiempo;
    //}
    try {
        fnObtenerWindowPlantillaTab().FnPublicReiniciar();
    } catch (e) {
    }
}


var Color_Alpha = 25;
var vcCodCul;

Vue.config.productionTip = true;

function window_mouseup() {
    $("#container").removeClass("aside-in");
    $("#liMenuVertical").removeClass("open");
    $("#aside-container").hide();
}

function ObtenerTemaPrincipal() {
    return $("#hfTemaPrincipal").val();
}

$(function () {

    var TemaPrincipal = $("#hfTemaPrincipal").val();
    if (TemaPrincipal != null && TemaPrincipal != "") {
        fnCambiarTemaPrincipal(TemaPrincipal);
    }


    $(window).resize(function () {
        DimPosElementos();
    });
    DimPosElementos();
    ObtenerRaizSistema();
    $("#aMenuVertical").click(function () {
        var othis = this;
        setTimeout(function () {
            if ($(othis).parent().hasClass("open")) {
                $("#aside-container").show();
            }
            else {
                $("#aside-container").hide();
            }
        }, 100);
    });
    $("#aside-container").hide();


    $(".cerrarModalProfile").click(function () {

        //$("#modalFondo").hide();
        //$("#modalProfile").hide();

        try {
            modalImagenUsuario.dialog("close");
        } catch (e) {
        }

        try {
            modalProfile.dialog("close");
        } catch (e) {
        }

        try {
            $("#modalFondo").hide();
            $("#modalProfile_Imagen").hide();
            $("#modalProfile").hide();
            ActualizarImagenProfile();
        } catch (e) {
        }

    });


    $(document).mouseup(function (e) {
        /*var container = $("#aside");*/
        //var container = $("#aMenuVertical");
        var container = $("#aside");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            window_mouseup();
        }
        //if (!container2.is(e.target) && container2.has(e.target).length === 0) {
        //    window_mouseup();
        //}

    });


    $(".mainnav-toggle").click(function () {
        setTimeout(function () {
            if ($("#container").hasClass("mainnav-lg")) {
                $("#dvContenedorLogoCliente").show();
            }
            else {
                $("#dvContenedorLogoCliente").hide();
            }
        }, 200);
    });

});

function MostrarLoading() {
    //$("#mainnav-menu a").addClass("disabled");
    $("#skLoading").show();
}
function OcultarLoading() {
    //$("#mainnav-menu a").removeClass("disabled");
    $("#skLoading").hide();
}

function ActualizarDatosProfile(vcNom) {
    $("#lblNombreUsuario").html(vcNom);
    var idusuario = window.top.$("#hfIdUsuario").val();
    var iddominio = window.top.$("#hdfCodigoDominio").val();
    var url = $("#imgUsuario").attr("src");
    url = "Common/Controladores/ImagenDinamica.ashx?Tipo=Usuario&IdUsuario=" + idusuario + "&Dominio=" + iddominio;
    url += "&" + Math.random().toString();
    $("#imgUsuario").attr({ "src": url });
}
function ActualizarImagenProfile() {
    var idusuario = window.top.$("#hfIdUsuario").val();
    var iddominio = window.top.$("#hdfCodigoDominio").val();
    var url = $("#imgUsuario").attr("src");
    url = "Common/Controladores/ImagenDinamica.ashx?Tipo=Usuario&IdUsuario=" + idusuario + "&Dominio=" + iddominio;
    url += "&" + Math.random().toString();
    $("#imgUsuario").attr({ "src": url });
}

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    var AnchoMainNav = $("#mainnav").width();
    if (Ancho < 778 || !$("#ifProducto").is(":visible")) {
        AnchoMainNav = 0;
    }
    $("#ifProducto").width(Ancho - AnchoMainNav - 12);
    $("#ifProducto").height(Alto - 110);
    $("#skLoading").css({ 'top': Alto / 2, 'left': Ancho / 2 });

    if (Ancho < 470) {
        $("#miTablaSeguridad").hide();
    }
    else {
        $("#miTablaSeguridad").show();
    }

    if (Ancho < 992 || $("#container").hasClass("mainnav-sm")) {
        $("#dvContenedorLogoCliente").hide();
    }
    else {
        $("#dvContenedorLogoCliente").show();
    }

}

var IdProductoSeleccionado;
function fnAbrirTab(id, nombre, url) {
    if (typeof url == 'undefined' || url == "") {
        return;
    }
    try {
        var ifProducto = $("#ifProducto");
        ifProducto[0].contentWindow.fnAbrirTab(id, nombre, url);
    } catch (e) {
    }
}

function ObtenerRaizSistema() {
    //Carga asignaciones realizadas desde el servidor.
    RaizSistema = RaizSistema_String;
    oCulturaUsuario = oCulturaUsuario_String;
}

function fnVerPerfil() {
    $('#ifMiPerfil').attr("src", 'P_Configuracion/General/MisDatos.aspx?inCod=108&inTip=3&inTipOri=1&al=' + Math.random().toString());
    $("#modalFondo").show();
    $("#modalProfile").show();
}
function fnVerPerfilImagen() {
    $('#ifChangeImagenUsuario').attr("src", 'UploadUsuario.aspx');
    $("#modalFondo").show();
    $("#modalProfile_Imagen").show();
}

//MENU PRINCIPAL **********************************************************************************************************************************
// Menú recursivo
// Favoritos
var Menus = JSON.parse(window.top.$("#hfMenus").val());
//var Menus = [{ "id": "3", "text": "Móvil", "icono": "fa fa-tachometer", "url": "", "favorito": false, "tipo": "producto", "nodes": [{ "id": "50", "text": "Dashboard", "icono": "fa fa-dashboard", "favorito": false, "url": "", "tipo": "modulo", "nodes": [{ "id": "193", "text": "Solicitudes", "icono": "", "url": "P_Movil/DashBoard/DashBoard_I.aspx?vcTab=&amp;amp;amp;inCod=193&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "opcion", "nodes": [] }, { "id": "239", "text": "Facturación", "icono": "", "url": "P_Movil/DashBoard/DashBoard_Facturacion.aspx?vcTab=&amp;amp;amp;inCod=239&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "opcion", "nodes": [] }, { "id": "194", "text": "Incidencias", "icono": "", "url": "P_Movil/DashBoard/DashBoard_II.aspx?vcTab=&amp;amp;amp;inCod=194&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "opcion", "nodes": [] }, { "id": "221", "text": "Móvil", "icono": "", "url": "P_Movil/BienvenidaMovil2.aspx?vcTab=&amp;amp;amp;inCod=221&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "opcion", "nodes": [] }, { "id": "228", "text": "General", "icono": "", "url": "P_Movil/DashBoard/DashBoard_Resumen.aspx?vcTab=&amp;amp;amp;inCod=228&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "opcion", "nodes": [] }] }, { "id": "56", "text": "Facturación", "icono": "fa fa-line-chart", "favorito": false, "url": "", "tipo": "modulo", "nodes": [{ "id": "232", "text": "Resumen", "icono": "", "url": "P_Movil/Facturacion/Consultar/Con_Fac_Resumen.aspx?vcTab=&amp;amp;amp;inCod=232&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "opcion", "nodes": [] }, { "id": "5600", "text": "Sumarios", "icono": "", "url": "", "favorito": false, "tipo": "opcion", "nodes": [{ "id": "5601", "text": "Organización", "icono": "", "url": "P_Movil/Facturacion/Sumarios/Sum_plantilla.aspx?TipoSumario=M_ORGA&amp;amp;amp;amp;p_codigo=ORGA_vcCODORG&amp;amp;amp;amp;f_codigo=RE_vcCODORG&amp;amp;amp;amp;desc=ORGA_vcNOMORG&amp;amp;amp;amp;f_desc=RE_vcNOMORG&amp;amp;amp;amp;conFiltro=1&amp;amp;amp;amp;?vcTab=&amp;amp;amp;amp;inCod=5601&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "5603", "text": "Centro Costo", "icono": "", "url": "P_Movil/Facturacion/Sumarios/Sum_plantilla.aspx?TipoSumario=M_CENT_COST&amp;amp;amp;amp;p_codigo=CCOS_P_vcCODCCO&amp;amp;amp;amp;f_codigo=RE_vcCODCCO&amp;amp;amp;amp;desc=o.CCOS_vcNOMCCO&amp;amp;amp;amp;f_desc=RE_vcNOMCCO&amp;amp;amp;amp;conFiltro=1&amp;amp;amp;amp;?vcTab=&amp;amp;amp;amp;inCod=5603&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "5606", "text": "Sucursal", "icono": "", "url": "P_Movil/Facturacion/Sumarios/Sum_plantilla.aspx?TipoSumario=M_SUCU&amp;amp;amp;amp;p_codigo=SUCU_P_vcCODSUC&amp;amp;amp;amp;f_codigo=RE_PF_vcCODSUC&amp;amp;amp;amp;desc=o.SUCU_vcNOMSUC&amp;amp;amp;amp;f_desc=RE_vcNOMSUC&amp;amp;amp;amp;conFiltro=1&amp;amp;amp;amp;?inCod=131&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1?vcTab=&amp;amp;amp;amp;inCod=5606&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "5602", "text": "Empleados", "icono": "", "url": "P_Movil/Facturacion/Sumarios/Sum_plantilla.aspx?TipoSumario=M_EMPL&amp;amp;amp;amp;p_codigo=EMPL_P_vcCODEMP&amp;amp;amp;amp;f_codigo=RE_PF_vcCODEMP&amp;amp;amp;amp;desc=o.EMPL_vcNOMEMP&amp;amp;amp;amp;f_desc=RE_vcNOMEMP&amp;amp;amp;amp;conFiltro=1&amp;amp;amp;amp;?inCod=131&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1?vcTab=&amp;amp;amp;amp;inCod=5602&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "5604", "text": "Operador", "icono": "", "url": "P_Movil/Facturacion/Sumarios/Sum_plantilla.aspx?TipoSumario=M_COMP&amp;amp;amp;amp;p_codigo=COMP_P_vcCODCIA&amp;amp;amp;amp;f_codigo=RE_vcCODCIA&amp;amp;amp;amp;desc=o.COMP_vcNOMCIA&amp;amp;amp;amp;f_desc=RE_vcNOMCIA&amp;amp;amp;amp;conFiltro=1&amp;amp;amp;amp;?vcTab=&amp;amp;amp;amp;inCod=5604&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "5605", "text": "Cuenta", "icono": "", "url": "P_Movil/Facturacion/Sumarios/Sum_plantilla.aspx?TipoSumario=MOV_Cuenta&amp;amp;amp;amp;p_codigo=P_vcCod&amp;amp;amp;amp;f_codigo=RE_PF_vcCODCUE&amp;amp;amp;amp;desc=o.vcNom&amp;amp;amp;amp;f_desc=RE_vcNOMCUE&amp;amp;amp;amp;conFiltro=1&amp;amp;amp;amp;?vcTab=&amp;amp;amp;amp;inCod=5605&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }] }, { "id": "233", "text": "Consultas", "icono": "", "url": "P_Movil/Facturacion/Consultar/Con_Fac_CriterioPrincipal.aspx?vcTab=&amp;amp;amp;inCod=233&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "opcion", "nodes": [] }, { "id": "5613", "text": "Reportes", "icono": "", "url": "P_Movil/Facturacion/Consultar/Con_Fac_ReportesDev.aspx?vcTab=&amp;amp;amp;inCod=5613&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "opcion", "nodes": [] }] }, { "id": "1072", "text": "Conciliación", "icono": "fa fa-exchange", "favorito": false, "url": "", "tipo": "modulo", "nodes": [{ "id": "5608", "text": "Importar", "icono": "", "url": "P_Movil/Administrar/Imp_Proceso.aspx?concilia=1&amp;amp;amp;vcTab=MOV_IMP_Servicio?vcTab=&amp;amp;amp;inCod=5608&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=0", "favorito": false, "tipo": "opcion", "nodes": [] }, { "id": "5609", "text": "Conciliar", "icono": "", "url": "P_Movil/Conciliar/Conciliar.aspx?generico=1&amp;amp;amp;?vcTab=&amp;amp;amp;inCod=5609&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=0", "favorito": false, "tipo": "opcion", "nodes": [] }, { "id": "5611", "text": "Cierre", "icono": "", "url": "P_Movil/Conciliar/Cierre.aspx?generico=1&amp;amp;amp;?vcTab=&amp;amp;amp;inCod=5611&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=0", "favorito": false, "tipo": "opcion", "nodes": [] }, { "id": "5612", "text": "Documentos", "icono": "", "url": "P_Movil/Conciliar/Documentos.aspx?generico=1&amp;amp;amp;?vcTab=&amp;amp;amp;inCod=5612&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=0", "favorito": false, "tipo": "opcion", "nodes": [] }] }, { "id": "57", "text": "Consumo", "icono": "fa fa-volume-control-phone", "favorito": false, "url": "", "tipo": "modulo", "nodes": [{ "id": "4302", "text": "Sumarios", "icono": "", "url": "", "favorito": false, "tipo": "opcion", "nodes": [{ "id": "130", "text": "Navegación", "icono": "", "url": "P_Movil/Sumarios/Sum_Navegacion.aspx?vcTab=&amp;amp;amp;amp;inCod=130&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "133", "text": "Organización", "icono": "", "url": "P_Movil/Sumarios/Sum_plantilla.aspx?TipoSumario=M_ORGA&amp;amp;amp;amp;p_codigo=ORGA_CodInt2&amp;amp;amp;amp;f_codigo=CODINT_VC&amp;amp;amp;amp;desc=ORGA_vcNOMORG&amp;amp;amp;amp;f_desc=NOMBREORG&amp;amp;amp;amp;conFiltro=1&amp;amp;amp;amp;?vcTab=&amp;amp;amp;amp;inCod=133&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "132", "text": "Centro Costo", "icono": "", "url": "P_Movil/Sumarios/Sum_plantilla.aspx?TipoSumario=M_CENT_COST&amp;amp;amp;amp;p_codigo=CCOS_P_vcCODCCO&amp;amp;amp;amp;f_codigo=CODCCO_VC&amp;amp;amp;amp;desc=o.CCOS_vcNOMCCO&amp;amp;amp;amp;f_desc=NOMCCO&amp;amp;amp;amp;conFiltro=1&amp;amp;amp;amp;?vcTab=&amp;amp;amp;amp;inCod=132&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "131", "text": "Empleados", "icono": "", "url": "P_Movil/Sumarios/Sum_plantilla.aspx?TipoSumario=M_EMPL&amp;amp;amp;amp;p_codigo=EMPL_P_vcCODEMP&amp;amp;amp;amp;f_codigo=CODEMPLEADO_VC&amp;amp;amp;amp;desc=o.EMPL_vcNOMEMP&amp;amp;amp;amp;f_desc=NOMEMPLEADO&amp;amp;amp;amp;conFiltro=1&amp;amp;amp;amp;?vcTab=&amp;amp;amp;amp;inCod=131&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "135", "text": "Operador", "icono": "", "url": "P_Movil/Sumarios/Sum_plantilla.aspx?TipoSumario=M_COMP&amp;amp;amp;amp;p_codigo=COMP_P_vcCODCIA&amp;amp;amp;amp;f_codigo=CODCIA&amp;amp;amp;amp;desc=o.COMP_vcNOMCIA&amp;amp;amp;amp;f_desc=NOMCIA&amp;amp;amp;amp;conFiltro=1&amp;amp;amp;amp;?vcTab=&amp;amp;amp;amp;inCod=135&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "136", "text": "Servicios", "icono": "", "url": "P_Movil/Sumarios/Sum_plantilla.aspx?TipoSumario=PCS_TRF_Servicio&amp;amp;amp;amp;p_codigo=vcCodSer&amp;amp;amp;amp;f_codigo=CODSRV&amp;amp;amp;amp;desc=o.vcNomSer&amp;amp;amp;amp;f_desc=NOMSRV&amp;amp;amp;amp;conFiltro=0&amp;amp;amp;amp;?vcTab=&amp;amp;amp;amp;inCod=136&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }] }, { "id": "4304", "text": "Consultas", "icono": "", "url": "", "favorito": false, "tipo": "opcion", "nodes": [{ "id": "150", "text": "Criterios", "icono": "", "url": "P_Movil/Consultar/Con_ConsultaPrincipal.aspx?vcTab=&amp;amp;amp;amp;inCod=150&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "153", "text": "Exceso de Minutos Contratados", "icono": "", "url": "P_Movil/Consultar/Con_ReporteExceso.aspx?vcTab=&amp;amp;amp;amp;inCod=153&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }] }, { "id": "4305", "text": "Reportes", "icono": "", "url": "", "favorito": false, "tipo": "opcion", "nodes": [{ "id": "151", "text": "Llamadas", "icono": "", "url": "P_Configuracion/PivotReporte.aspx?vcTab=&amp;amp;amp;amp;inCod=151&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }] }, { "id": "4303", "text": "Históricos", "icono": "", "url": "", "favorito": false, "tipo": "opcion", "nodes": [{ "id": "140", "text": "Organización", "icono": "", "url": "P_Movil/Historico/His_Plantilla.aspx?tabla=M_ORGA&amp;amp;amp;amp;p_codigo=ORGA_CodInt2&amp;amp;amp;amp;f_codigo=CODINT_VC&amp;amp;amp;amp;desc=ORGA_vcNOMORG&amp;amp;amp;amp;f_desc=NOMBREORG&amp;amp;amp;amp;conFiltro=1&amp;amp;amp;amp;?vcTab=&amp;amp;amp;amp;inCod=140&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "148", "text": "Centro de Costo", "icono": "", "url": "P_Movil/Historico/His_Plantilla.aspx?tabla=M_CENT_COST&amp;amp;amp;amp;p_codigo=CCOS_P_vcCODCCO&amp;amp;amp;amp;f_codigo=CODCCO_VC&amp;amp;amp;amp;desc=o.CCOS_vcNOMCCO&amp;amp;amp;amp;f_desc=NOMCCO&amp;amp;amp;amp;conFiltro=1&amp;amp;amp;amp;?vcTab=&amp;amp;amp;amp;inCod=148&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "141", "text": "Empleados", "icono": "", "url": "P_Movil/Historico/His_Plantilla.aspx?tabla=M_EMPL&amp;amp;amp;amp;p_codigo=EMPL_P_vcCODEMP&amp;amp;amp;amp;f_codigo=CODEMPLEADO_VC&amp;amp;amp;amp;desc=o.EMPL_vcNOMEMP&amp;amp;amp;amp;f_desc=NOMEMPLEADO&amp;amp;amp;amp;conFiltro=1&amp;amp;amp;amp;?vcTab=&amp;amp;amp;amp;inCod=141&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "143", "text": "Líneas", "icono": "", "url": "P_Movil/Historico/His_Plantilla.aspx?tabla=mov_linea&amp;amp;amp;amp;p_codigo=p_vcNum&amp;amp;amp;amp;f_codigo=codext&amp;amp;amp;amp;desc=o.f_vccodemp&amp;amp;amp;amp;f_desc=NOMEMPLEADO&amp;amp;amp;amp;conFiltro=0&amp;amp;amp;amp;?vcTab=&amp;amp;amp;amp;inCod=143&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "144", "text": "Operador", "icono": "", "url": "P_Movil/Historico/His_Plantilla.aspx?tabla=M_COMP&amp;amp;amp;amp;p_codigo=COMP_P_vcCODCIA&amp;amp;amp;amp;f_codigo=CODCIA&amp;amp;amp;amp;desc=o.COMP_vcNOMCIA&amp;amp;amp;amp;f_desc=NOMCIA&amp;amp;amp;amp;conFiltro=1&amp;amp;amp;amp;?vcTab=&amp;amp;amp;amp;inCod=144&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "147", "text": "Servicios", "icono": "", "url": "P_Movil/Historico/His_Plantilla.aspx?tabla=PCS_TRF_Servicio&amp;amp;amp;amp;p_codigo=vcCodSer&amp;amp;amp;amp;f_codigo=CODSRV&amp;amp;amp;amp;desc=o.vcNomSer&amp;amp;amp;amp;f_desc=NOMSRV&amp;amp;amp;amp;conFiltro=0&amp;amp;amp;amp;?vcTab=&amp;amp;amp;amp;inCod=147&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }] }] }, { "id": "4", "text": "Solicitudes", "icono": "fa fa-bars", "favorito": false, "url": "P_Movil/Administrar/Solicitudes/Adm_ListadoSolicitudes.aspx?vcTab=&amp;amp;inCod=4&amp;amp;inTip=4&amp;amp;inTipOri=1", "tipo": "modulo", "nodes": [] }, { "id": "35", "text": "Incidencias", "icono": "fa fa-ticket", "favorito": false, "url": "", "tipo": "modulo", "nodes": [{ "id": "79", "text": "Registrar Ticket", "icono": "", "url": "P_Movil/AdministrarTickets/AdmTck_RegistrarTicket.aspx?vcTab=&amp;amp;amp;inCod=79&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "opcion", "nodes": [] }, { "id": "81", "text": "Tickets sin Asignar", "icono": "", "url": "P_Movil/AdministrarTickets/AdmTck_BolsaTicket.aspx?vcTab=&amp;amp;amp;inCod=81&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "opcion", "nodes": [] }, { "id": "192", "text": "Administrador de incidencias", "icono": "", "url": "P_Movil/SolicitudesAtencion/SOA_Adm_Solicitudes.aspx?vcTab=&amp;amp;amp;inCod=192&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "opcion", "nodes": [] }, { "id": "222", "text": "Mis incidencias", "icono": "", "url": "P_Movil/SolicitudesAtencion/SOA_Adm_Solicitudes.aspx?EsUsuario=1&amp;amp;amp;?vcTab=&amp;amp;amp;inCod=222&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "opcion", "nodes": [] }] }, { "id": "54", "text": "Almacén", "icono": "fa fa-university", "favorito": false, "url": "", "tipo": "modulo", "nodes": [{ "id": "212", "text": "Ingreso a Almacén", "icono": "", "url": "Common/Page/Adm_Lista.aspx?vcTab=MOV_CAM_CampanaDespachoOperador&amp;amp;amp;inCod=212&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "opcion", "nodes": [] }, { "id": "213", "text": "Despacho Oficina", "icono": "", "url": "P_Movil/Administrar/Cam_DespachoEmpleado.aspx?vcTab=O&amp;amp;amp;inCod=213&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "opcion", "nodes": [] }, { "id": "214", "text": "Despacho Empleado", "icono": "", "url": "P_Movil/Administrar/Cam_DespachoEmpleado.aspx?vcTab=E&amp;amp;amp;inCod=214&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "opcion", "nodes": [] }] }] }, { "id": "2", "text": "Mantenimiento", "icono": "fa fa-pencil-square-o", "url": "P_Movil/BienvenidaMantenimient", "favorito": false, "tipo": "producto", "nodes": [{ "id": "8", "text": "General", "icono": "fa fa-book", "favorito": false, "url": "", "tipo": "modulo", "nodes": [{ "id": "73", "text": "Organización", "icono": "", "url": "", "favorito": false, "tipo": "opcion", "nodes": [{ "id": "36", "text": "Estructura", "icono": "", "url": "General/Administrar/Mantenimiento/Mnt_Principal.aspx?vcTab=&amp;amp;amp;amp;inCod=36&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": true, "tipo": "item", "nodes": [] }, { "id": "38", "text": "Sucursales", "icono": "", "url": "Common/Page/Adm_Lista.aspx?vcTab=M_SUCU&amp;amp;amp;amp;inCod=38&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": true, "tipo": "item", "nodes": [] }, { "id": "31", "text": "Centro de Costo", "icono": "demo-pli-mine icon-lg icon-fw", "url": "Common/Page/Adm_Lista.aspx?vcTab=M_CENT_COST&amp;amp;amp;amp;inCod=31&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": true, "tipo": "item", "nodes": [] }, { "id": "32", "text": "Nivel de Organización", "icono": "", "url": "Common/Page/Adm_Lista.aspx?vcTab=M_NIVE&amp;amp;amp;amp;inCod=32&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": true, "tipo": "item", "nodes": [] }, { "id": "33", "text": "Organización", "icono": "demo-pli-folder-organizing ico", "url": "Common/Page/Adm_Lista.aspx?vcTab=M_ORGA&amp;amp;amp;amp;inCod=33&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": true, "tipo": "item", "nodes": [] }, { "id": "34", "text": "Grupo de Empleado", "icono": "demo-pli-folder icon-lg icon-f", "url": "Common/Page/Adm_Lista.aspx?vcTab=M_GRUP_ORIG&amp;amp;amp;amp;inCod=34&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "35", "text": "Empleados", "icono": "demo-pli-male-female icon-lg i", "url": "Common/Page/Adm_Lista.aspx?vcTab=M_EMPL&amp;amp;amp;amp;inCod=35&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "85", "text": "Oficina", "icono": "", "url": "Common/Page/Adm_Lista.aspx?vcTab=GEN_EMP_Oficina&amp;amp;amp;amp;inCod=85&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": true, "tipo": "item", "nodes": [] }, { "id": "5624", "text": "Responsables", "icono": "demo-pli-medal-2 icon-lg icon-", "url": "General/Administrar/Mantenimiento/Mnt_Responsables.aspx?vcTab=&amp;amp;amp;amp;inCod=5624&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": true, "tipo": "item", "nodes": [] }] }, { "id": "103", "text": "Destino", "icono": "", "url": "", "favorito": false, "tipo": "opcion", "nodes": [{ "id": "47", "text": "Tipo Servicio", "icono": "", "url": "Common/Page/Adm_Lista.aspx?vcTab=PCS_TRF_ServicioTipo&amp;amp;amp;amp;inCod=47&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "48", "text": "Servicio", "icono": "", "url": "Common/Page/Adm_Lista.aspx?vcTab=PCS_TRF_Servicio&amp;amp;amp;amp;inCod=48&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }] }] }, { "id": "1", "text": "Móvil", "icono": "fa fa-mobile", "favorito": false, "url": "", "tipo": "modulo", "nodes": [{ "id": "198", "text": "Cuentas", "icono": "", "url": "Common/Page/Adm_Lista.aspx?vcTab=MOV_Cuenta&amp;amp;amp;inCod=198&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "opcion", "nodes": [] }, { "id": "203", "text": "Planes", "icono": "", "url": "Common/Page/Adm_Lista.aspx?vcTab=MOV_Plan&amp;amp;amp;inCod=203&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "opcion", "nodes": [] }, { "id": "201", "text": "Dispositivos", "icono": "", "url": "Common/Page/Adm_Lista.aspx?vcTab=MOV_Dispositivo&amp;amp;amp;inCod=201&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=1", "favorito": true, "tipo": "opcion", "nodes": [] }, { "id": "202", "text": "Líneas", "icono": "", "url": "Common/Page/Adm_Lista.aspx?vcTab=MOV_Linea&amp;amp;amp;inCod=202&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=1", "favorito": true, "tipo": "opcion", "nodes": [] }, { "id": "231", "text": "Facturación Conceptos", "icono": "", "url": "", "favorito": false, "tipo": "opcion", "nodes": [{ "id": "128", "text": "Grupo Concepto", "icono": "", "url": "Common/Page/Adm_Lista.aspx?vcTab=PCS_MOV_GrupoServicio&amp;amp;amp;amp;inCod=128&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "129", "text": "Concepto Resumen", "icono": "", "url": "Common/Page/Adm_Lista.aspx?vcTab=PCS_MOV_ServicioResumen&amp;amp;amp;amp;inCod=129&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "180", "text": "Sub Conceptos", "icono": "", "url": "Common/Page/Adm_Lista.aspx?vcTab=PCS_MOV_ServicioResumen_SubConceptos&amp;amp;amp;amp;inCod=180&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }] }] }, { "id": "6000", "text": "Visor de Tareas", "icono": "fa fa-desktop", "favorito": false, "url": "", "tipo": "modulo", "nodes": [{ "id": "6001", "text": "Importación Facturación", "icono": "", "url": "P_Movil/Administrar/Imp_VisorTarea.aspx?vcTab=&amp;amp;amp;inCod=6001&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "opcion", "nodes": [] }, { "id": "6002", "text": "Importación Organización", "icono": "", "url": "Sincronizacion/Sin_Utilitarios.aspx?vcTab=&amp;amp;amp;inCod=6002&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "opcion", "nodes": [] }] }, { "id": "800", "text": "Importación", "icono": "fa fa-upload", "favorito": false, "url": "", "tipo": "modulo", "nodes": [{ "id": "5325", "text": "Importación Facturación", "icono": "", "url": "P_Movil/Administrar/Imp_ProcesoPrincipal.aspx?vcTab=&amp;amp;amp;inCod=5325&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "opcion", "nodes": [] }, { "id": "5326", "text": "Importación Datos (Líneas)", "icono": "", "url": "General/Administrar/Importacion/Imp_ProcesoPrincipal.aspx?vcTab=&amp;amp;amp;inCod=5326&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "opcion", "nodes": [] }] }, { "id": "1071", "text": "Reportes", "icono": "fa fa-shopping-bag", "favorito": false, "url": "", "tipo": "modulo", "nodes": [{ "id": "5602", "text": "Listados", "icono": "", "url": "", "favorito": false, "tipo": "opcion", "nodes": [{ "id": "5615", "text": "Líneas con plan", "icono": "", "url": "P_Movil/Administrar/Mantenimiento/Reportes/Mnt_List_Lineas_Meses.aspx?vcTab=PRO_Opcion&amp;amp;amp;amp;inCod=5615&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "5614", "text": "Empleado", "icono": "", "url": "P_Movil/Administrar/Mantenimiento/Reportes/Mnt_List_Empleado.aspx?vcTab=PRO_Opcion&amp;amp;amp;amp;inCod=5614&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }] }, { "id": "5603", "text": "Consolidados", "icono": "", "url": "", "favorito": false, "tipo": "opcion", "nodes": [{ "id": "5623", "text": "Detalle", "icono": "", "url": "P_Movil/Administrar/Mantenimiento/Reportes/Mnt_Consolidado.aspx?vcTab=&amp;amp;amp;amp;inCod=5623&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "5608", "text": "Líneas y Dispositivos", "icono": "", "url": "P_Movil/Administrar/Mantenimiento/Reportes/Mnt_AgruLinDis.aspx?vcTab=&amp;amp;amp;amp;inCod=5608&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }] }, { "id": "5601", "text": "Reportes Dinámicos", "icono": "", "url": "", "favorito": false, "tipo": "opcion", "nodes": [{ "id": "5607", "text": "General", "icono": "", "url": "P_Configuracion/PivotReporteOrganizacional_General.aspx?vcTab=&amp;amp;amp;amp;inCod=5607&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "152", "text": "Planes", "icono": "", "url": "P_Configuracion/PivotReporteOrganizacional_PorPlan.aspx?vcTab=&amp;amp;amp;amp;inCod=152&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }] }] }] }, { "id": "6", "text": "Configuración ", "icono": "fa fa-list-alt", "url": "", "favorito": false, "tipo": "producto", "nodes": [{ "id": "39", "text": "General", "icono": "fa fa-address-book-o", "favorito": false, "url": "", "tipo": "modulo", "nodes": [{ "id": "108", "text": "Mis Datos", "icono": "", "url": "P_Configuracion/General/MisDatos.aspx?vcTab=&amp;amp;amp;inCod=108&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "opcion", "nodes": [] }, { "id": "107", "text": "Mi Empresa", "icono": "", "url": "P_Configuracion/General/Mnt_Regi.aspx?vcTab=&amp;amp;amp;inCod=107&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "opcion", "nodes": [] }] }, { "id": "52", "text": "Móvil", "icono": "fa fa-cogs", "favorito": false, "url": "", "tipo": "modulo", "nodes": [{ "id": "204", "text": "Servicio", "icono": "", "url": "", "favorito": false, "tipo": "opcion", "nodes": [{ "id": "118", "text": "Correo - Entrega Dispositivo", "icono": "", "url": "P_Movil/Configurar/Conf_EnvioCorreo.aspx?vcTab=&amp;amp;amp;amp;inCod=118&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "117", "text": "Importación", "icono": "", "url": "P_Movil/Administrar/Imp_Configurador.aspx?vcTab=&amp;amp;amp;amp;inCod=117&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }] }, { "id": "180", "text": "Solicitudes", "icono": "", "url": "", "favorito": false, "tipo": "opcion", "nodes": [{ "id": "105", "text": "Tipos de Solicitud", "icono": "", "url": "Common/Page/Adm_Lista.aspx?vcTab=MOV_TipoSolicitud&amp;amp;amp;amp;inCod=105&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "106", "text": "Seguridad por Tipo", "icono": "", "url": "P_Movil/Administrar/Solicitudes/Adm_SeguridadSolicitud.aspx?vcTab=&amp;amp;amp;amp;inCod=106&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "1", "text": "Número máximo de dispositivos", "icono": "", "url": "P_Movil/Configurar/Conf_PoliticaSolicitud.aspx?vcTab=NumMaxDisp&amp;amp;amp;amp;inCod=1&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "2", "text": "Tiempo mínimo para solicitar c", "icono": "", "url": "P_Movil/Configurar/Conf_PoliticaSolicitud.aspx?vcTab=TiempoMinCambEquipo&amp;amp;amp;amp;inCod=2&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "116", "text": "Costo de Reposición", "icono": "", "url": "P_Movil/Configurar/Conf_CostoReposicion.aspx?vcTab=&amp;amp;amp;amp;inCod=116&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }] }, { "id": "183", "text": "Cuentas De Cobro", "icono": "", "url": "", "favorito": false, "tipo": "opcion", "nodes": [{ "id": "112", "text": "Configuración Inicial", "icono": "", "url": "P_Movil/Facturacion/Configurar/Fac_Conf_Contrato.aspx?vcTab=MOV_FAC_SubContrato&amp;amp;amp;amp;inCod=112&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "107", "text": "Verificación de Pagos", "icono": "", "url": "P_Movil/Facturacion/Configurar/Fac_Conf_VerificaExporCobros.aspx?vcTab=MOV_FAC_Configuracion&amp;amp;amp;amp;inCod=107&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "109", "text": "Generación de deuda", "icono": "", "url": "P_Movil/Facturacion/Configurar/Fac_Conf_CuentaCobro.aspx?vcTab=MOV_FAC_Configuracion&amp;amp;amp;amp;inCod=109&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "110", "text": "Exportación de deuda", "icono": "", "url": "P_Movil/Facturacion/Configurar/Fac_Conf_ExportacionCobro.aspx?vcTab=MOV_FAC_Configuracion&amp;amp;amp;amp;inCod=110&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "111", "text": "Estado de Cuenta", "icono": "", "url": "P_Movil/Facturacion/Configurar/Fac_Conf_EnvioPagos.aspx?vcTab=MOV_FAC_Configuracion&amp;amp;amp;amp;inCod=111&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "120", "text": "Financiamiento", "icono": "", "url": "Common/Page/Adm_Lista.aspx?vcTab=MOV_CAM_FinanciamientoTipo&amp;amp;amp;amp;inCod=120&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }] }, { "id": "178", "text": "Importación", "icono": "", "url": "", "favorito": false, "tipo": "opcion", "nodes": [{ "id": "101", "text": "Tipo Fuente UNC", "icono": "", "url": "Common/Page/Adm_Lista.aspx?vcTab=PCS_IMP_TipoFuenteUNC&amp;amp;amp;amp;inCod=101&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "100", "text": "Fuente Archivo", "icono": "", "url": "Common/Page/Adm_Lista.aspx?vcTab=PCS_IMP_FuenteArchivo&amp;amp;amp;amp;inCod=100&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "99", "text": "Fuente Base de Datos", "icono": "", "url": "Common/Page/Adm_Lista.aspx?vcTab=PCS_IMP_FuenteBD&amp;amp;amp;amp;inCod=99&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "126", "text": "Plantilla", "icono": "", "url": "Common/Page/Adm_Lista.aspx?vcTab=PCS_IMP_Plantilla&amp;amp;amp;amp;inCod=126&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "127", "text": "Origen - Destino", "icono": "", "url": "Common/Page/Adm_Lista.aspx?vcTab=PCS_IMP_Config_Proceso&amp;amp;amp;amp;inCod=127&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "174", "text": "Configuración Rutas", "icono": "", "url": "General/Administrar/Proceso/General/Mnt_RutasServicios.aspx?vcTab=MOV_SERV_Ruta&amp;amp;amp;amp;inCod=174&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }] }, { "id": "197", "text": "Atenciones", "icono": "", "url": "P_Movil/Atenciones/ATE_Configuracion.aspx?vcTab=&amp;amp;amp;inCod=197&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "opcion", "nodes": [] }, { "id": "225", "text": "Pedidos", "icono": "", "url": "P_Movil/Administrar/Mantenimiento/Cam_Mnt_CampanaConfiguracion.aspx?vcTab=&amp;amp;amp;inCod=225&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "opcion", "nodes": [] }, { "id": "1264", "text": "Incidencias", "icono": "", "url": "", "favorito": false, "tipo": "opcion", "nodes": [{ "id": "122", "text": "Nivel", "icono": "", "url": "Common/Page/Adm_Lista.aspx?vcTab=MOV_SOA_Nivel&amp;amp;amp;amp;inCod=122&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=0", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "123", "text": "Bolsas", "icono": "", "url": "Common/Page/Adm_Lista.aspx?vcTab=MOV_SOA_Bolsa&amp;amp;amp;amp;inCod=123&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=0", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "124", "text": "Tipo", "icono": "", "url": "Common/Page/Adm_Lista.aspx?vcTab=MOV_SOA_Tipo&amp;amp;amp;amp;inCod=124&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=0", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "125", "text": "Especialista", "icono": "", "url": "Common/Page/Adm_Lista.aspx?vcTab=MOV_SOA_TecnicoSupervisor&amp;amp;amp;amp;inCod=125&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=0", "favorito": false, "tipo": "item", "nodes": [] }] }, { "id": "4298", "text": "Distribución de Bolsa", "icono": "", "url": "P_Movil/Configurar/Conf_DistribucionConfiguracion.aspx?vcTab=&amp;amp;amp;inCod=4298&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "opcion", "nodes": [] }, { "id": "5607", "text": "Características", "icono": "", "url": "Common/Page/Adm_Lista.aspx?vcTab=MOV_Caracteristica&amp;amp;amp;inCod=5607&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "opcion", "nodes": [] }] }, { "id": "15", "text": "Seguridad", "icono": "fa fa-users", "favorito": false, "url": "", "tipo": "modulo", "nodes": [{ "id": "41", "text": "Perfil", "icono": "", "url": "Common/Page/Adm_Lista.aspx?vcTab=SEG_Perfil&amp;amp;amp;inCod=41&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=0", "favorito": false, "tipo": "opcion", "nodes": [] }, { "id": "42", "text": "Usuario", "icono": "", "url": "Common/Page/Adm_Lista.aspx?vcTab=SEG_Usuario&amp;amp;amp;inCod=42&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=0", "favorito": true, "tipo": "opcion", "nodes": [] }, { "id": "141", "text": "Importar Usuarios AD", "icono": "", "url": "P_Configuracion/Seguridad/Administrar/ImportarUsuarioAD.aspx?vcTab=&amp;amp;amp;inCod=141&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "opcion", "nodes": [] }, { "id": "227", "text": "Políticas de Usuario", "icono": "", "url": "P_Configuracion/Seguridad/Administrar/Mnt_SEG_PoliticaUsuario.aspx?vcTab=SEG_POLITICA&amp;amp;amp;inCod=227&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "opcion", "nodes": [] }, { "id": "1263", "text": "Temporizador", "icono": "", "url": "Common/Page/Adm_Lista.aspx?vcTab=SEG_Temporizador&amp;amp;amp;inCod=1263&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=0", "favorito": false, "tipo": "opcion", "nodes": [] }] }, { "id": "44", "text": "Panel de Control", "icono": "fa fa-id-card-o", "favorito": false, "url": "", "tipo": "modulo", "nodes": [{ "id": "130", "text": "Configuración Regional", "icono": "", "url": "P_Configuracion/PanelControl/ConfiguracionRegional.aspx?vcTab=&amp;amp;amp;inCod=130&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "opcion", "nodes": [] }] }, { "id": "42", "text": "Herramientas", "icono": "fa fa-wrench", "favorito": false, "url": "", "tipo": "modulo", "nodes": [{ "id": "127", "text": "Visor de Eventos", "icono": "", "url": "", "favorito": false, "tipo": "opcion", "nodes": [{ "id": "61", "text": "Log de Errores", "icono": "", "url": "P_Configuracion/HerramientasSistema/VisorEventos/LogErrores.aspx?vcTab=&amp;amp;amp;amp;inCod=61&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "59", "text": "Log de Correos", "icono": "", "url": "P_Configuracion/HerramientasSistema/VisorEventos/LogCorreos.aspx?vcTab=&amp;amp;amp;amp;inCod=59&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }, { "id": "60", "text": "Autenticación de Usuarios", "icono": "", "url": "P_Configuracion/HerramientasSistema/VisorEventos/AutenticacionUsuarios.aspx?vcTab=&amp;amp;amp;amp;inCod=60&amp;amp;amp;amp;inTip=4&amp;amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "item", "nodes": [] }] }, { "id": "182", "text": "Visor de Auditoría", "icono": "", "url": "P_Configuracion/HerramientasSistema/VisorAuditoria.aspx?vcTab=&amp;amp;amp;inCod=182&amp;amp;amp;inTip=4&amp;amp;amp;inTipOri=1", "favorito": false, "tipo": "opcion", "nodes": [] }] }, { "id": "1070", "text": "Sincronizar Datos", "icono": "fa fa-bars", "favorito": false, "url": "Sincronizacion/Main_Sincroniza.aspx?vcTab=&amp;amp;inCod=1070&amp;amp;inTip=4&amp;amp;inTipOri=1", "tipo": "modulo", "nodes": [] }] }];
//console.log(Menus);

var Favoritos = [];
function CargaInicialFavoritos(_Menu) {
    if (_Menu.favorito == true) {
        Favoritos.push(_Menu);
    }
    if (_Menu.nodes && _Menu.nodes.length) {
        for (var i in _Menu.nodes) {
            var oMenu = _Menu.nodes[i];
            CargaInicialFavoritos(oMenu);
        }
    }
}
if (Menus.length >= 2) {
    CargaInicialFavoritos(Menus[0]);
    CargaInicialFavoritos(Menus[1]);
}
if (Menus.length >= 3) {
    CargaInicialFavoritos(Menus[2]);
}

if (Favoritos.length > 0) {
    setTimeout(function () { $("#iconDespliegueFavoritos").show(); }, 500);
}

Vue.component('tree-menu', {
    props: ['menu'],
    data: function () {
        return {
            isActive: false
        };
    },
    template: ['',
        '<li @mouseover="isActive = true" @mouseleave="isActive = false"  v-on:click="fnMenu_Click" v-bind:id="menu.tipo + \'_\' + menu.id" v-bind:class="{ \'active-sub active\': menu.id == 50, \'active-link\': (menu.url && menu.url.indexOf(\'P_Movil/DashBoard/DashBoard_Facturacion.aspx\')>=0) }" >',
        '   <a href="javascript:console.log()">',
        '       <i v-if="menu.icono" v-bind:class="menu.icono" style="font-size: 18px; width: 24px;"></i>',
        '       <span class="menu-title" >{{ menu.text }}',
        '       </span>',
        '       <i v-if="menu.nodes && menu.nodes.length" class="arrow"></i>',
        '   </a>',

        //#region Mostrar favoritos
        '   <div v-if="menu.nodes && menu.nodes.length==0 && menu.tipo != \'modulo\'" v-show="isActive || menu.favorito == true" style="position: absolute; margin-left:27px; margin-top: -19px; cursor: pointer;" v-on:click="fnFavorito">',
        '       <i v-if="menu.favorito == true" class="fa fa-heart"></i>',
        '       <i v-else class="fa fa-heart-o"></i>',
        '   </div>',
        //#endregion

        '   <ul v-if="menu.nodes && menu.nodes.length">',
        '       <tree-menu ',
        '           v-for="node in menu.nodes" ',
        '           v-bind:menu="node" >',
        '       </tree-menu> ',
        '   </ul>',
        '</li>'].join(''),
    methods: {
        fnMenu_Click: function (event) {
            console.log("menu", this.menu);
            if (flagFavorito) {
                return;
            }

            if ($("#" + this.menu.tipo + "_" + this.menu.id + " a").hasClass("disabled")) {
                return;
            }

            var Url = this.menu.url;
            if (Url && Url != '') {
                $("#mainnav-menu li").removeClass("active-sub active");
                $("#mainnav-menu li").removeClass("active-link");
                $("#" + this.menu.tipo + "_" + this.menu.id).parent().parent().parent().parent().addClass("active-sub active");
                $("#" + this.menu.tipo + "_" + this.menu.id).parent().parent().addClass("active-sub active");
                $("#" + this.menu.tipo + "_" + this.menu.id).addClass("active-link");
                Url = Url.split('amp;').join('');
                var id = this.menu.tipo + '_' + this.menu.id;

                //console.log("idmenu", id, this.menu.text, Url);
                fnAbrirTab(id, this.menu.text, Url);

            }
            return false;
        },
        fnFavorito: function () {

            flagFavorito = true;

            if (Favoritos.length >= 10 && !this.menu.favorito) {
                $.niftyNoty({
                    type: "warning",
                    container: "floating",
                    title: '<i class="fa fa-heart icon-2x"></i> Favoritos',
                    message: 'Sólo puede agregar 10 accesos como favoritos.',
                    closeBtn: true,
                    focus: true,
                    timer: 2500
                });
                return;
            }

            this.menu.favorito = !this.menu.favorito;
            var ExisteFavorito = -1;
            for (var i in Favoritos) {
                var favorito = Favoritos[i];
                if (favorito.tipo == this.menu.tipo && favorito.id == this.menu.id) {
                    ExisteFavorito = i;
                    break;
                }
            }
            var accion = "";
            if (ExisteFavorito == -1 && this.menu.favorito) {
                accion = "add";
                Favoritos.push(this.menu);
            }
            if (ExisteFavorito != -1 && !this.menu.favorito) {
                accion = "delete";
                Favoritos.splice(ExisteFavorito, 1);
                if (Favoritos.length == 0) {
                    $("#iconDespliegueFavoritos").hide();
                }
            }

            if (accion != "") {
                this.$http.post('index.aspx/ActualizarFavorito', {
                    tipo: this.menu.tipo,
                    id: this.menu.id,
                    accion: accion,
                }).then(function (response) {
                }, function () {
                });
            }

            setTimeout(function () {
                flagFavorito = false;
            }, 500);

            //alert('ab');
        },
        mouseOver: function () {
            this.active = !this.active;
        },
    },
});

var flagFavorito = false;

Vue.component('menu-favoritos', {
    props: ['menus'],
    data: function () {
        return {
            isActive: false,
            idActual: -1,
        };
    },
    template: ['',
        //'<div>',

        '<li v-if="menus && menus.length" style="margin-top:0px;" class="" >',
        '   <hr />',
        '   <a href="javascript:console.log()">',
        '       <i class="fa fa-heart" style="font-size: 18px; width: 24px;"></i>',
        '       <span class="menu-title" >Favoritos',
        '       </span>',
        '       <i id="iconDespliegueFavoritos" style="display:none;" class="arrow"></i>',
        '   </a>',
        '<ul v-if="menus && menus.length">',
        '   <li v-for="node in menus" v-bind:id="node.tipo + \'_\' + node.id" style="margin-left: 0px;"  @mouseover="mostrarIconoFavoritoDelete(node)"  @mouseleave="isActive = false" >',
        '       <a href="#" v-on:click="fnMenu_Click(node)" >',
        '           <span class="menu-title">',
        '               {{node.text}}',
        '           </span>',
        '       </a>',
        '       <div v-show="isActive && (idActual == node.id)" style="position: absolute; right: 10px; margin-top: -20px; cursor: pointer;" v-on:click="fnFavoritoDelete(node)">',
        '           <i class="fa fa-trash"></i>',
        '       </div>',
        '   </li>',
        '</ul></li>'].join(''),
    //'</div>'].join(''),
    methods: {
        fnMenu_Click: function (event) {
            var menu = this.menu || event;
            var Url = menu.url;
            if (Url && Url != '') {

                ////$("#mainnav-menu li").removeClass("active-sub active");
                ////$("#mainnav-menu li").removeClass("active-link");
                ////$("#" + this.menu.tipo + "_" + this.menu.id).parent().parent().parent().parent().addClass("active-sub active");
                ////$("#" + this.menu.tipo + "_" + this.menu.id).parent().parent().addClass("active-sub active");
                ////$("#" + this.menu.tipo + "_" + this.menu.id).addClass("active-link");
                ////Url = Url.split('amp;').join('');

                $("#mainnav-menu li").removeClass("active-sub active");
                $("#mainnav-menu li").removeClass("active-link");
                $("#" + menu.tipo + "_" + menu.id).parent().parent().parent().parent().addClass("active-sub active");
                $("#" + menu.tipo + "_" + menu.id).parent().parent().addClass("active-sub active");
                $("#" + menu.tipo + "_" + menu.id).addClass("active-link");
                Url = Url.split('amp;').join('');
                var id = menu.tipo + '_' + menu.id;
                fnAbrirTab(id, menu.text, Url);
            }
            return false;
        },
        mostrarIconoFavoritoDelete: function (node) {
            this.isActive = true;
            this.idActual = node.id;
        },
        fnFavoritoDelete: function (menu) {
            var ExisteFavorito = -1;
            for (var i in Favoritos) {
                var favorito = Favoritos[i];
                if (favorito.tipo == menu.tipo && favorito.id == menu.id) {
                    ExisteFavorito = i;
                    break;
                }
            }
            var accion = "";
            if (ExisteFavorito != -1) {
                menu.favorito = !menu.favorito;
                accion = "delete";
                Favoritos.splice(ExisteFavorito, 1);
                this.$http.post('index.aspx/ActualizarFavorito', {
                    tipo: menu.tipo,
                    id: menu.id,
                    accion: accion,
                }).then(function (response) {
                }, function () {
                });
            }
        },
        //mouseOver: function () {
        //    this.active = !this.active;
        //},
    },
});


var app_menu = new Vue({
    el: '#app_menu',
    data: {
        menuList: Menus[0],
        menuFavoritos: Favoritos,
    },
    created: function (obj) {
        //this.$http.post('@Url.Action("obtenerMenus")', {}).then(function (response) {
        //    var resultado = response.body.replace(/\'/g, '"');
        //    //console.log(resultado);
        //    this.menuList = JSON.parse(resultado);
        //}, function (err) {
        //    //Método que se dispara si hubo algún error.
        //});
    },
});

//END MENU LATERAL *******************************************************************************************************************************


//MENU LATERAL **********************************************************************************************************************************
Vue.component('menulateral-item', {
    props: ['menu'],
    data: function () {
        return {
            isActive: false
        };
    },
    template: ['',
        '<li class="list-group-item"  @mouseover="isActive = true" @mouseleave="isActive = false" ',
        '   v-bind:style="{ \'background-color\':  ((isActive && menu.nodes && menu.nodes.length==0)?\'#DDECF7\':\'transparent\') }" >',
        '   <span v-if="menu.nodes && menu.nodes.length" v-bind:style="{ fontWeight:  ((isActive && menu.nodes && menu.nodes.length==0)?\'normal\':\'700\') }" >{{menu.text}}</span>',
        '   <span v-else v-on:click="fnOpenTab(menu)" style="cursor:pointer; margin-top: -5px; margin-left: 4px;" >{{menu.text}}</span>',
        '   <div v-if="menu.nodes && menu.nodes.length==0" v-show="isActive || menu.favorito == true" style="position: absolute; left: 1px; top: 13px; cursor: pointer;" v-on:click="fnFavorito">',
        '       <i v-if="menu.favorito == true" class="fa fa-heart"></i>',
        '       <i v-else class="fa fa-heart-o"></i>',
        '   </div>',
        '   <ul v-if="menu.nodes && menu.nodes.length" class="list-group bg-trans" style="margin-right: -15px;">',
        '       <menulateral-item ',
        '           v-for="menuItems in menu.nodes"',
        '           v-bind:menu="menuItems" />',
        '   </ul>',
        '</li>'].join(''),
    methods: {
        fnOpenTab: function (tab) {
            var Url = tab.url;
            if (Url && Url != '') {
                Url = Url.split('amp;').join('');
                var id = tab.tipo + '_' + tab.id;
                fnAbrirTab(id, tab.text, Url);
                $("#aMenuVertical").click();
            }
            return false;
        },
        fnFavorito: function () {

            if (Favoritos.length >= 10 && !this.menu.favorito) {
                $.niftyNoty({
                    type: "warning",
                    container: "floating",
                    title: '<i class="fa fa-heart icon-2x"></i> Favoritos',
                    message: 'Sólo puede agregar 10 accesos como favoritos.',
                    closeBtn: true,
                    focus: true,
                    timer: 2500
                });
                return;
            }

            this.menu.favorito = !this.menu.favorito;
            var ExisteFavorito = -1;
            for (var i in Favoritos) {
                var favorito = Favoritos[i];
                if (favorito.tipo == this.menu.tipo && favorito.id == this.menu.id) {
                    ExisteFavorito = i;
                    break;
                }
            }
            var accion = "";
            if (ExisteFavorito == -1 && this.menu.favorito) {
                accion = "add";
                Favoritos.push(this.menu);
            }
            if (ExisteFavorito != -1 && !this.menu.favorito) {
                accion = "delete";
                Favoritos.splice(ExisteFavorito, 1);
                if (Favoritos.length == 0) {
                    $("#iconDespliegueFavoritos").hide();
                }
            }

            if (accion != "") {
                this.$http.post('index.aspx/ActualizarFavorito', {
                    tipo: this.menu.tipo,
                    id: this.menu.id,
                    accion: accion,
                }).then(function (response) {
                }, function () {
                });
            }



            //alert('ab');
        },
        mouseOver: function () {
            this.active = !this.active;
        },
    },
});


var tabs_Menu = [];
var tabSeleccionado_Menu = -1;
for (var i = 0; i < Menus.length; i++) {
    if (Menus[i].id != 3) {
        if (tabSeleccionado_Menu == -1) {
            tabSeleccionado_Menu = Menus[i].id;
        }
        tabs_Menu.push({
            P_inCod: Menus[i].id,
            vcNom: $.trim(Menus[i].text),
            vcURLIco: Menus[i].icono,
            menus: Menus[i]
        });
    }
}

if (tabs_Menu.length == 0) {
    $("#liMenuVertical").hide();
}

var app_menu_vertical = new Vue({
    el: '#app_menu_vertical',
    data: {
        tabs: tabs_Menu,
        tabSeleccionado: tabSeleccionado_Menu,
        styleObject: {
            fontSize: '13px',
            fontWeight: '600',
        },
    },
    methods: {
        fnTabMenu_click: function (tab) {
            this.tabSeleccionado = tab.P_inCod;
            return false;
        },
        fnOpenTab: function (tab) {
            var Url = tab.url;
            if (Url && Url != '') {
                Url = Url.split('amp;').join('');
                var id = tab.tipo + '_' + tab.id;
                fnAbrirTab(id, tab.text, Url);
                $("#aMenuVertical").click();
            }
            return false;
        },
    },
});

// **********************************************************************************************************************************************


function fnObtenerWindowPlantillaTab() {
    try {
        return $("iframe[src*='PlantillaTab.aspx']")[0].contentWindow;
    } catch (e) {
    }

}


Vue.component('menu-notificacion', {
    props: ['tipo', 'mensaje'],
    template: ['',
        '<li>',
        '   <a class="media" href="#" v-on:click="fnMenu_Click()">',
        '       <div class="media-left">',
        '           <i v-if="tipo == \'solicitud\'" class="fa fa-bars" style="font-size: 18px; width: 24px;"></i>',
        '           <i v-if="tipo == \'incidencia\'" class="fa fa-ticket" style="font-size: 18px; width: 24px;"></i>',
        '       </div>',
        '       <div class="media-body">',
        '           <p class="mar-no text-nowrap text-main text-semibold">{{mensaje}}</p>',
        //'           <small>Hace 30 minutos</small>',
        '       </div>',
        '   </a>',
        '</li>'].join(''),
    methods: {
        fnMenu_Click: function () {
            //debugger;
            var t = $(this)[0].$props.tipo;
            var m = $(this)[0].$props.mensaje;

            // Actualización de icono de notificaciones.
            var arNotificaciones = JSON.parse(localStorage.getItem("notificaciones_" + $("#hfCodEmpleado").val()));
            $(".badge-header").addClass("hidden");
            for (var n = 0; n < arNotificaciones.length; n++) {
                if (arNotificaciones[n].n + " (" + arNotificaciones[n].c + ")" == m.trim()) {
                    arNotificaciones[n].v = true;
                } else {
                    if (!arNotificaciones[n].v) {
                        $(".badge-header").removeClass("hidden");
                    }
                }
            }
            localStorage.setItem("notificaciones_" + $("#hfCodEmpleado").val(), JSON.stringify(arNotificaciones));
            // Fin actualización de icono de notificaciones.

            switch (t) {
                case "solicitud":
                    miTipoAlerta = 1;

                    if (m.indexOf("Notas nuevas") >= 0) {
                        miSubtipoAlerta = 1;
                    } else if (m.indexOf("por Aprobar") >= 0) {
                        miSubtipoAlerta = 2;
                    } else if (m.indexOf("por Procesar") >= 0) {
                        miSubtipoAlerta = 3;
                    }
                    break;
                case "Administrador de incidencias":
                    miTipoAlerta = 2;

                    if (m.indexOf('Notas nuevas') != -1) {
                        miSubtipoAlerta = 1;
                    }
                    else if (m.indexOf('atendidas') != -1) {
                        miSubtipoAlerta = 2;
                    }
                    break;
                case "Mis incidencias":
                    miTipoAlerta = 3;
                    break;
                default:
                    miTipoAlerta = 4;
                    break;
            }

            if (fnObtenerWindowPlantillaTab().$("iframe[src*='Adm_ListadoSolicitudes.aspx']").length > 0) {
                fnObtenerWindowPlantillaTab().$("iframe[src*='Adm_ListadoSolicitudes.aspx']")[0].contentWindow.miFnActulizarPorAlerta();
            }
            
            var Url = "P_Movil/Administrar/Solicitudes/Adm_ListadoSolicitudes.aspx?vcTab=&inCod=2&inTip=4&inTipOri=1";
            var tipo = "modulo";
            var id = "4";
            $("#mainnav-menu li").removeClass("active-sub active");
            $("#mainnav-menu li").removeClass("active-link");
            $("#" + tipo + "_" + id).parent().parent().parent().parent().addClass("active-sub active");
            $("#" + tipo + "_" + id).parent().parent().addClass("active-sub active");
            $("#" + tipo + "_" + id).addClass("active-link");
            fnAbrirTab(tipo + '_' + id, "Solicitudes", Url);
            return false;
        },
    }
});

var NotificacionesIncidencias = [];
var NotificacionesSolicitudes = [];
var ExisteNoLeidos = false;

var localStorage = window.localStorage;
var localNotificacion = [];

try {
    if (typeof misAlertas != 'undefined') {
        for (var i in misAlertas) {
            if (misAlertas[i].Tipo == "Solicitudes") {
                NotificacionesSolicitudes.push({ "Mensaje": misAlertas[i].DescripcionAlerta + " (" + misAlertas[i].CantidadNoLeidos + ") " });
            }
            if (misAlertas[i].Tipo == "Incidencias") {
                NotificacionesIncidencias.push({ "Mensaje": misAlertas[i].DescripcionAlerta + " (" + misAlertas[i].CantidadNoLeidos + ") " });
            }
            if (parseInt(misAlertas[i].CantidadNoLeidos) > 0) {
                ExisteNoLeidos = true;
            }            
            localNotificacion.push({ n: misAlertas[i].DescripcionAlerta, c: misAlertas[i].CantidadNoLeidos, v: false });
        }


        localStorage.setItem("notificaciones_" + $("#hfCodEmpleado").val(), JSON.stringify(localNotificacion));

        if (localStorage.getItem("notificaciones_" + $("#hfCodEmpleado").val()) == undefined) {
            //localStorage.setItem("notificaciones_" + $("#hfCodEmpleado").val(), JSON.stringify(localNotificacion));
        } else {
            if (ExisteNoLeidos) {
                var arNotificaciones = JSON.parse(localStorage.getItem("notificaciones_" + $("#hfCodEmpleado").val()));
                var ExisteNoLeidos_Local = 0;
                for (var n = 0; n < arNotificaciones.length; n++) {
                    if (!arNotificaciones[n].v) ExisteNoLeidos_Local++;
                }
                if (ExisteNoLeidos_Local == 0) ExisteNoLeidos = false;
            }
        }
    }
} catch (e) {
}

Vue.component('menu-notificaciones', {
    props: ['notificacionesincidencias', 'notificacionessolicitudes', 'existenoleidos'],
    template: ['',
        //'<li class="dropdown" v-if="notificacionessolicitudes.length > 0  || notificacionesincidencias.length > 0" >',
        '<li class="dropdown" >',
        '   <a href="#" data-toggle="dropdown" class="dropdown-toggle">',
        '       <i class="demo-pli-bell"></i>',
        //'       <span v-if="existenoleidos==true" class="badge badge-header badge-warning existenoleidos" ></span>',
        '       <span v-show="existenoleidos==true" class="badge badge-header badge-warning existenoleidos" ></span>',
        '   </a>',
        '   <div class="dropdown-menu dropdown-menu-md dropdown-menu-right">',
        '       <div class="nano scrollable has-scrollbar" style="height: 0px;">',
        '           <div class="nano-content" tabindex="0" style="right: -17px;">',
        '               <ul class="head-list" >',
        '                   <menu-notificacion v-for="solicitud in notificacionessolicitudes.slice(0, 4)" tipo="solicitud" v-bind:mensaje="solicitud.Mensaje" />', 
        '                   <menu-notificacion v-for="incidencia in notificacionesincidencias.slice(0, 4)" tipo="incidencia" v-bind:mensaje="incidencia.Mensaje" />',
        '               </ul>',
        '           </div>',
        '           <div class="nano-pane" style="display: none;"><div class="nano-slider" style="height: 20px; transform: translate(0px, 0px);"></div></div>',
        '       </div>',
        '   </div>',
        '</li>'].join(''),
});

var app_menu_links = new Vue({
    el: '#app_menu_links',
    data: {
        notificacionesincidencias: NotificacionesIncidencias,
        notificacionessolicitudes: NotificacionesSolicitudes,
        existenoleidos: ExisteNoLeidos,
        tabSeleccionado: 2,
        styleObject: {
            fontSize: '13px',
            fontWeight: '600',
        },
    },
    methods: {
        fnTabMenu_click: function (tab) {
            this.tabSeleccionado = tab.P_inCod;
            return false;
        },
        fnOpenTab: function (tab) {
            var Url = tab.url;
            if (Url && Url != '') {
                Url = Url.split('amp;').join('');
                var id = tab.tipo + '_' + tab.id;
                fnAbrirTab(id, tab.text, Url);
                $("#aMenuVertical").click();
            }
            return false;
        },
    },
});




function fullScreen() {
    //alert('cvcvcvcvcvcaaaaaaaaaaaaaaaaa');
    var alto = $(window).height() - 5;
    var ancho = $(window).width();
    //$("#ifTema").css({ "position": "absolute", "top": "0px", "left": "0px", "height": alto + "px" });

    $("#navbar").hide();
    $("#mainnav-container").hide();
    $("#ifProducto").css({ "position": "absolute", "top": "-10px", "left": "-10px", "height": alto + "px", "width": (ancho + 20) + "px" });
    $($("#ifProducto")[0].contentWindow.$("#modulo_4").find("iframe")).css({ "position": "absolute", "top": "0px"});
    $($("#ifProducto")[0].contentWindow.$("#modulo_4").find("iframe")[0].contentWindow.$("iframe[src='Adm_SolicitudMasiva.aspx']")[0]).css({ "position": "absolute", "top": "0px" });
    setTimeout(function () {
        $($("#ifProducto")[0].contentWindow.$("#modulo_4").find("iframe")).css({ "height": (alto - 10) + "px" });
        $($("#ifProducto")[0].contentWindow.$("#modulo_4").find("iframe")[0].contentWindow.$("iframe[src='Adm_SolicitudMasiva.aspx']")[0]).css({ "height": (alto - 40) + "px" });
    }, 100);
    

    //src="Adm_SolicitudMasiva.aspx"

}

function defaultScreen() {
    var alto = $(window).height() - 110;
    var ancho = $(window).width();
    //$("#ifTema").css({ "position": "initial", "height": alto + "px" });
    $("#navbar").show();
    $("#mainnav-container").show();
    $("#ifProducto").css({ "position": "initial", "height": alto + "px", "width": (ancho - 200) + "px" });

    $($("#ifProducto")[0].contentWindow.$("#modulo_4").find("iframe")).css({ "position": "initial", "height": (alto -10) + "px"});
    $($("#ifProducto")[0].contentWindow.$("#modulo_4").find("iframe")[0].contentWindow.$("iframe[src='Adm_SolicitudMasiva.aspx']")[0]).css({ "position": "initial", "height": (alto - 137) + "px" });

}

function disminuirContadorSolicitud() {

    let objetoNotificacion;
    let posicionDeNotificacionEnArray = 0;

    NotificacionesSolicitudes.forEach(function (notificacion) {
        //busco la notificación que contega el texto solicitudes
        if (notificacion.Mensaje.indexOf("solicitudes") >= 0) {
            posicionDeNotificacionEnArray = notificacion.Mensaje.indexOf("solicitudes");
            objetoNotificacion = notificacion;
        }
    });

    let numeroDeNotificacionesInicial = obtenerValorEntreParentesis(objetoNotificacion.Mensaje);
    let numeroDeNotificacionesFinal = (numeroDeNotificacionesInicial * 1) - 1;

    objetoNotificacion.Mensaje = objetoNotificacion.Mensaje.replace(numeroDeNotificacionesInicial, numeroDeNotificacionesFinal.toString());

    if (numeroDeNotificacionesFinal == 0) {
        //NotificacionesSolicitudes.shift();
        $('.badge-warning').hide();
    }

}

function recargarAlertas() {
    //debugger;
    $.ajax({
        type: "POST",
        url: "PlantillaTab.aspx/ObtenerTodasLasAlertas",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            //debugger;
            const cantidadElementos = NotificacionesSolicitudes.length;
            for (i = 0; i < cantidadElementos; i++) {
                NotificacionesSolicitudes.shift();
            }

            for (var i in response.d) {
                if (response.d[i].Tipo == "Solicitudes") {
                    NotificacionesSolicitudes.push({ "Mensaje": response.d[i].DescripcionAlerta + " (" + response.d[i].CantidadNoLeidos + ") " });
                }
                if (parseInt(response.d[i].CantidadNoLeidos) > 0) {
                    ExisteNoLeidos = true;
                    $('.badge-warning').show();
                }
            }
        }
    });
}

function obtenerValorEntreParentesis(texto) {
    let result = texto.match(/\((.*)\)/);
    return result[1] ;
}