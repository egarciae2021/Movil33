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
var MultiSeleccion = "0";
var ArrayPaginacion = [];
var IdSolicitudSeleccionado = '';
var NombreClienteSeleccionado = '';
var cont_cola_activas = 0;

var vcMensajeErrorSistema = "Ocurrió un error en la Web, contáctese con el Administrador del Sistema.";

var oCultura = { dcNumDec: '2', vcSimDec: '.', vcSimSepMil: ',', Moneda: { vcSimMon: 'S/.'} };




var vcIdSolicitud = 0;

var vcMas_IdSolicitud = 0;
var vcMas_RazonSocial = "";
var vcMas_NombreEmpresa = "";
var vcMas_Ruc = "";
var vcMas_Dominio = "";

var IdSolicitud = 0;
var IdSolicitudTitular = 0;
var Nombre = '';
var ApellidoPaterno = '';
var ApellidoMaterno = '';
var Usuario = '';
var Correo = '';


var CampoConcatenadoAsignaUsuario = '';
var ServidorHTML = '';
var InstanciaHTML = '';

var ServidorHTML_APP = '';
var InstanciaHTML_APP = '';
var ContratoHTML = '';
var PortalHTML = '';

var ServidorId = 0;
var ServidorNombre = '';
var ServidorDD = 0;
var ServidorEU = 0;
var InstanciaId = 0;
var InstanciaNombre = '';
var ServidoresInstancia = [];

var ServidoresInstancia_APP = [];
var ServidoresInstancia_WEB = [];
var InstanciaId_APP = 0;
var InstanciaNombre_APP = '';

var ListaContrato = [];

var vTamanioBaseDatos = 0;
var vTamanioBaseDatosRequerido = 0;
var vEspacioServidorBDSeleccionado = 0;
var vIdServidorBDSeleccionado = 0;
var vIdServidorAPPSeleccionado = 0;
var vIdServidorPedidosSeleccionado = 0;
var vIdInstanciaServidorBDSeleccionado = 0;
var vIdInstanciaServidorAPPSeleccionado = 0;
var vIdInstanciaServidorPedidosSeleccionado = 0;
var vServidorBDSeleccionado = '';
var vServidorAPPSeleccionado = '';
var vServidorPedidosSeleccionado = '';

var x_Titulares = [];

/* Inicio Variables de para Procesar Suscripciones Multiples */
///////////////////////////////////////////////////////////////
var vgAPM_AplicaOpcion = 0;  // 1:Titulares sin usuario, 2: Todos los titulares
var vgAPM_TitularesAsignados = [];
var vgAPM_IdServidorBD = [];
var vgAPM_IdInstanciaBD = [];
var vgAPM_IdServidorAPP = [];
var vgAPM_IdInstanciaAPP = [];
///////////////////////////////////////////////////////////////
/* Fin Variables de para Procesar Suscripciones Multiples*/

/*Variable para importacion*/
//var TamanioPermitido = (1024 * 1024);












function EnviarCorreoCliente() {
    $.ajax({
        type: "POST",
        url: "Adm_ListadoSolicitudes.aspx/EnviarCorreoCliente",
        data: "{'IdSolicitud': '" + IdSolicitudSeleccionado + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            Mensaje("<br/><h1>" + result.d + "</h1><br/>", document, CerroMensaje);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}


function ActualizarGrilla() {
    $("#grid").trigger("reloadGrid");
}

function CerroMensaje() {
    BloquearPagina(false);
}

function fnMostrarTecnico(Id) {
    if (Id != "") {
        inIdResTec = Id;

        if (vcEsReasignar == "0") { //Asignar A
            confirmacion("¿Está seguro que desea asignar el técnico '" + $('#bpTecRes_txtValorBusqueda').val() + "' a las solicitudes elegidas?", fnAsignarSolicitudesA, null, "Asignar Solicitudes A");
        } else {
            confirmacion("¿Está seguro que desea reasignar el técnico '" + $('#bpTecRes_txtValorBusqueda').val() + "' a las solicitudes elegidas?", fnReasignarSolicitudesA, null, "Reasignar Solicitudes A");
        }
    }
}

function fnAsignarSolicitudesA() {
    $.ajax({
        type: "POST",
        url: "Adm_EditarSolicitudPersonalizada.aspx/AsignarSolicitudA",
        data: "{'vcCodSol': '" + lstIdSol + "', " +
              "'inCodTipSol': '" + vcIdTipSol + "', " +
              "'inUsuAsignado': '" + inIdResTec + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            Mensaje("<br/><h1>" + vcMen + "</h1><br/>", document, CerroMensaje);
            ActualizarGrilla();
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnReasignarSolicitudesA() {
    $.ajax({
        type: "POST",
        url: "Adm_ListadoSolicitudes.aspx/ReasignarSolicitudesA",
        data: "{'vcCodSol': '" + lstIdSol + "', " +
              "'inCodTipSol': '" + vcIdTipSol + "', " +
              "'inUsuAsignado': '" + inIdResTec + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            Mensaje("<br/><h1>" + vcMen + "</h1><br/>", document, CerroMensaje);
            ActualizarGrilla();
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

$(function () {

    $("#TabDetalle").css("display", "block");

    $('.inputfile').live('change', function () {

        if (this.id.split('_')[0] == "fupload") {
            sendFile(this);
        }
        else if (this.id.split('_')[0] == "fuploadq15") {
            sendFile_Importacion(this, 1);
        }
        else if (this.id.split('_')[0] == "fuploadOrga") {
            sendFile_Importacion(this, 2);
        }

        $('.inputfile').val('');
    });


    FusionCharts.setCurrentRenderer('javascript');

    //$("#chkAsignarUsuario").prop("checked", "checked");
    $("#chkAsignarServidorBD").prop("checked", "checked");
    $("#chkAsignarServidorAPP").prop("checked", "checked");
    $("#btnAplicarAsignar").hide();

    MostrarOcultarCampoAsignaUsuario();
    //MostrarOcultarCampoAsignaServidorBD();
    //MostrarOcultarCampoAsignaServidorAPP();
    MostrarOcultarCampoAsignaContrato();
    MostrarOcultarCampoAsignaPortal();
    MostrarOcultarGraficoPedidos();

    $("#cboAsignarCampo").show();
    $("#btnAsignarCampo").show();
    $("#tdoptAplicar").show();
    $("#txtUsuario").show();
    $("#txtUsuario").val("");
    CampoConcatenadoAsignaUsuario = "";

    // alert($("#cboServidorBD_" + Ext_vcData.IdSolicitud + " option:selected").val().split(',')[0]);
    //Modo Externo

    function ValidaMaximoProcesamiento() {
        var cantidad_suscripcion = $("#hdf_MaximoProcesamiento").val();
        return cantidad_suscripcion;
    }

    function PreparaGrabacionMasiva01() {

        var PermiteGrabar = true;
        var Ext_vcSel = $("#gridMasivo").jqGrid("getGridParam", "selarrrow");

        if (Ext_vcSel.length == 0) {
            alertaExterna("Debe seleccionar una suscripción.");
        }
        else {
            var xCantSuscr = ValidaMaximoProcesamiento();
            var xCantSuscr = xCantSuscr;
            if (Ext_vcSel.length > xCantSuscr) {
                alertaExterna("Solo se permiten procesar \"" + xCantSuscr + "\" suscripciones.");
            }
            else {
                var cad_IdSolicitud = '';

                for (var k = 0; k < Ext_vcSel.length; k++) {
                    var Ext_vcData = $("#gridMasivo").jqGrid("getRowData", Ext_vcSel[k]);
                    var Ext_vcIdSolicitud = Ext_vcData.IdSolicitud;

                    if ($("#txtDominio_" + Ext_vcIdSolicitud).val().trim() == "") {
                        PermiteGrabar = false;
                        alertaExterna("Debe ingresar el Dominio para la empresa: " + Ext_vcData.RazonSocial + '.');
                        break;
                    }
                    else if (!EsCaracterEspecial($("#txtDominio_" + Ext_vcIdSolicitud).val().trim(), false)) {
                        PermiteGrabar = false;
                        alertaExterna("El Dominio ingresado tiene caracteres especiales para la empresa: " + Ext_vcData.RazonSocial + '.');
                        break;
                    }
                    else if ($("#cboServidorBD_" + Ext_vcIdSolicitud + " option:selected").val() == "-1") {
                        PermiteGrabar = false;
                        alertaExterna("Debe seleccionar un Servidor de Base de Datos para la empresa: " + Ext_vcData.RazonSocial + '.');
                        break;
                    }
                    else if ($("#cboInstanciaBD_" + Ext_vcIdSolicitud + " option:selected").val() == "-1") {
                        PermiteGrabar = false;
                        alertaExterna("Debe seleccionar una Instancia de Base de Datos para la empresa: " + Ext_vcData.RazonSocial + '.');
                        break;
                    }
                    else if ($("#cboServidorAPP_" + Ext_vcIdSolicitud + " option:selected").val() == "-1") {
                        PermiteGrabar = false;
                        alertaExterna("Debe seleccionar un Servidor de Aplicaciones para la empresa: " + Ext_vcData.RazonSocial + '.');
                        break;
                    }
                    else if ($("#cboInstanciaAPP_" + Ext_vcIdSolicitud + " option:selected").val() == "-1") {
                        PermiteGrabar = false;
                        alertaExterna("Debe seleccionar la Instancia del Servidor de Aplicaciones para la empresa: " + Ext_vcData.RazonSocial + '.');
                        break;
                    }
                    else if ($("#cboContrato_" + Ext_vcIdSolicitud + " option:selected").val() == "-1") {
                        PermiteGrabar = false;
                        alertaExterna("Debe seleccionar un contrato para la empresa: " + Ext_vcData.RazonSocial + '.');
                        break;
                    }
                    else if ($("#cboPortal_" + Ext_vcIdSolicitud + " option:selected").val() == "-1") {
                        PermiteGrabar = false;
                        alertaExterna("Debe seleccionar un portal Origen para la empresa: " + Ext_vcData.RazonSocial + '.');
                        break;
                    }
                    else {
                        if ($("#cboServidorWEB_" + Ext_vcIdSolicitud + " option:selected").val() != "-1") {
                            if ($("#cboInstanciaWEB_" + Ext_vcIdSolicitud + " option:selected").val() == "-1") {
                                PermiteGrabar = false;
                                alertaExterna("Debe seleccionar la Instancia del Servidor de Aplicaciones de Pedidos para la empresa: " + Ext_vcData.RazonSocial + '.');
                                break;
                            }
                        }
                        cad_IdSolicitud = cad_IdSolicitud + Ext_vcData.IdSolicitud + (k == Ext_vcSel.length - 1 ? '' : ',');
                    }
                }

                if (PermiteGrabar) {

                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        url: "Adm_ListadoSolicitudes.aspx/ListarMultipleSolicitud",
                        data: "{'IdSolicitud' : '" + cad_IdSolicitud + "'}",
                        success: function (result) {
                            PreparaGrabacionMasiva02(result);
                        },
                        error: function (result) { alert('Error'); }
                    });

                }
            }
        }
    }

    function PreparaGrabacionMasiva02(result) {
        var lsSolicitud = result.d;
        var oSolicitudes = new Solicitudes();

        var PermitirGrabar = true;

        for (k = 0; k < lsSolicitud.length; k++) {
            var oSolicitud = new Solicitud();

            oSolicitud.IdSolicitud = lsSolicitud[k].IdSolicitud;
            oSolicitud.NombreEmpresa = lsSolicitud[k].NombreEmpresa; //Lectura
            oSolicitud.RazonSocial = lsSolicitud[k].RazonSocial; //Lectura
            oSolicitud.Ruc = lsSolicitud[k].Ruc;
            oSolicitud.IdPais = lsSolicitud[k].IdPais; //Lectura
            var dtFechaInicio, dtFechaFin;
            try {
                dtFechaInicio = Date.parseExact(lsSolicitud[k].FechaInicioContrato, "dd/MM/yyyy");
                if (dtFechaInicio == null) {
                    alerta("La fecha de inicio de contrato no es correcta");
                    return;
                }
            }
            catch (e) {
                alerta("La fecha de inicio de contrato no es correcta");
                return;
            }
            oSolicitud.FechaInicioContrato = Date2Ansi(dtFechaInicio);
            try {
                dtFechaFin = Date.parseExact(lsSolicitud[k].FechaFinContrato, "dd/MM/yyyy");
                if (dtFechaFin == null) {
                    alerta("La fecha fin de contrato no es correcta");
                    return;
                }
            }
            catch (e) {
                alerta("La fecha fin de contrato no es correcta");
                return;
            }
            oSolicitud.FechaFinContrato = Date2Ansi(dtFechaFin);
            //oSolicitud.FechaInicioContrato = lsSolicitud[k].FechaInicioContrato; //Lectura
            //oSolicitud.FechaFinContrato = lsSolicitud[k].FechaFinContrato; //Lectura
            oSolicitud.ObservacionContrato = lsSolicitud[k].ObservacionContrato; //Lectura
            oSolicitud.DescripcionContrato = lsSolicitud[k].DescripcionContrato; //Lectura
            oSolicitud.IdTipoLicencia = lsSolicitud[k].IdTipoLicencia; //Lectura
            oSolicitud.Lineas = lsSolicitud[k].Lineas;  //Lectura
            oSolicitud.Dominio = $("#txtDominio_" + oSolicitud.IdSolicitud).val();
            oSolicitud.IdInstanciaBD = $("#cboInstanciaBD_" + oSolicitud.IdSolicitud + " option:selected").val();
            oSolicitud.IdInstanciaAPP = $("#cboInstanciaAPP_" + oSolicitud.IdSolicitud + " option:selected").val();
            oSolicitud.IdInstanciaPedidos = $("#cboInstanciaWEB_" + oSolicitud.IdSolicitud + " option:selected").val();
            oSolicitud.IdPortal = $("#cboPortal_" + oSolicitud.IdSolicitud + " option:selected").val();
            oSolicitud.IdEstado = 2;
            oSolicitud.IdTipoSolicitud = lsSolicitud[k].IdTipoSolicitud; //Lectura
            oSolicitud.IdContratoTerminos = $("#cboContrato_" + oSolicitud.IdSolicitud + " option:selected").val(); //Lectura

            oSolicitud.LogoNombre = $("#fupload_" + lsSolicitud[k].IdSolicitud).attr('nombrearchivo');


            for (y = 0; y < lsSolicitud[k].Titulares.length; y++) {
                var oTitular = new SolicitudTitulares();

                oTitular.IdSolicitud = lsSolicitud[k].Titulares[y].IdSolicitud;
                oTitular.IdSolicitudTitular = lsSolicitud[k].Titulares[y].IdSolicitudTitular;
                oTitular.Nombre = lsSolicitud[k].Titulares[y].Nombre;
                oTitular.ApellidoPaterno = lsSolicitud[k].Titulares[y].ApellidoPaterno;
                oTitular.ApellidoMaterno = lsSolicitud[k].Titulares[y].ApellidoMaterno;
                oTitular.Correo = lsSolicitud[k].Titulares[y].Correo;
                //oTitular.Usuario = ($("#txt" + oTitular.IdSolicitudTitular).val() == null ? '': $("#txt" + oTitular.IdSolicitudTitular).val());                
                oTitular.Usuario = Construir_Usuario(oTitular.IdSolicitud, oTitular.IdSolicitudTitular, oTitular.Nombre, oTitular.ApellidoPaterno, oTitular.ApellidoMaterno);
                // alert(oTitular.Usuario);

                var vk_IdSolicitud = $('#txtDominio_' + lsSolicitud[k].IdSolicitud).val();

                if (oTitular.Usuario == "") {
                    // alertaExterna("Se debe asignar usuario para Dominio: " + lsSolicitud[k].RazonSocial);
                    alertaExterna("Se debe asignar usuario para Dominio: " + vk_IdSolicitud);
                    PermitirGrabar = false;
                    break;
                }
                else {
                    oSolicitud.Titulares.push(oTitular);
                }
            }

            for (var m = 0; m < oSolicitud.Titulares.length; m++) {
                for (var n = m + 1; n < oSolicitud.Titulares.length; n++) {
                    if (oSolicitud.Titulares[m].Usuario == oSolicitud.Titulares[n].Usuario) {
                        alertaExterna("Hay usuarios duplicados para Dominio: " + lsSolicitud[k].RazonSocial);
                        PermitirGrabar = false;
                        break;
                    }
                }

                if (!PermitirGrabar) break;
            }

            if (!PermitirGrabar) {
                break;
            }
            else {
                oSolicitudes.Solicitud.push(oSolicitud);
            }

        }

        if (PermitirGrabar) {
            $.ajax
			({
			    type: "POST",
			    url: "Adm_ListadoSolicitudes.aspx/registrarCola",
			    data: "{'prSolicitud': '" + JSON.stringify(oSolicitudes) + "'}",
			    contentType: "application/json; charset=utf-8",
			    dataType: "json",
			    success: function (result) {
			        if (result.d == "ok") {
			            CargarDominios();
			            $("#grid").trigger("reloadGrid");
			            $("#divMasivo").dialog('close');
			            Mensaje("<br/><h1>Las solicitudes seleccionadas fueron procesadas correctamente</h1>", document, CerroMensaje);
			        }
			        else {
			            alertaExterna(vcMensajeErrorSistema);
			        }
			    },
			    error: function (xhr, err, thrErr) {
			        MostrarErrorAjax(xhr, err, thrErr);
			        BloquearPagina(false);
			    }
			});
        }

    }

    function sendFile(objFile) {
        var i;
        var vcIdInputFile = $(objFile).attr("id");
        var vcIdSolicitud = vcIdInputFile.split('_')[1];

        var fileUpload = $(objFile).get(0);
        var files = fileUpload.files;
        var vcFilename = files[0].name;

        var data = new FormData();
        for (i = 0; i < files.length; i++) {
            data.append(files[i].name, files[i]);
        }

        $.ajax({
            url: raiz("Common/Controladores/FileUpload.ashx?j_filename=" + vcFilename),
            type: "POST",
            data: data,
            contentType: false,
            processData: false,
            success: function (result) {

                $("#" + vcIdInputFile).attr("nombrearchivo", vcFilename);

                $("#dvEstadoLogo_" + vcIdSolicitud).html("");
                $("#dvEstadoLogo_" + vcIdSolicitud).append("<img src='../Common/images/Mantenimiento/Aprobar.png' />");
                $("#dvTextoFile_" + vcIdSolicitud).hide();
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }


    function sendFile_Importacion(objFile, TipoImportacion) {
        var i;
        var vcIdInputFile = $(objFile).attr("id");

        var vcIdSolicitud = vcIdInputFile.split('_')[1];

        var fileUpload = $(objFile).get(0);
        var files = fileUpload.files;
        var vcFilename = files[0].name;
        var myfile_rename = "";

        var RespuestaValidacion = ValidaFormatoyTamanioArchivo(vcFilename, files[0].size, TipoImportacion);

        if (TipoImportacion === 1 && RespuestaValidacion === "-1") {
            alertaExterna("El nombre del archivo debe ser (Q15.xls ó Q15.xlsx)");
        }
        else if (RespuestaValidacion === "1") {
            alertaExterna("Solo se permiten estos formatos (xls, xlsx).");
        }
        else if (RespuestaValidacion === "2") {
            alertaExterna("Solo se permite cargar archivos menores de 20MB.");
        }
        else {
            var data = new FormData();
            for (i = 0; i < files.length; i++) {
                data.append(files[i].name + '_' + vcIdSolicitud, files[i]);
            }

            //var ValorAleatorio = Math.floor((Math.random() * 100) + 1);
            // alert(ValorAleatorio);

            //myfile_rename = vcFilename.split('.')[0] + '_' + vcIdSolicitud + "." + vcFilename.split('.')[1];        
            myfile_rename = vcFilename.split('.')[0] + '_' + vcIdSolicitud + '_' + (TipoImportacion == 1 ? 'q15' : 'orga') + "." + vcFilename.split('.')[1];

            $.ajax({
                url: raiz("Common/Controladores/FileUpload.ashx?j_filename=" + myfile_rename + "&j_IdSuscripcion=" + vcIdSolicitud + "&j_TipoImportacion=" + TipoImportacion),
                type: "POST",
                data: data,
                contentType: false,
                processData: false,
                success: function (result) {

                    /*En el FileUpload.ashx, se debe armar la cadena de conexión del dominio para 
                    conectarse a su Base de Datos Movil
                    */
                    /**/

                    if (result != "ERROR") {

                        var vg_respuesta = result.split('|');
                        var vg_HayObservaciones = vg_respuesta[1];
                        var sTextoEnlace = vg_respuesta[2];
                        var vg_ObservacionDetalle = vg_respuesta[3];

                        if (TipoImportacion == "1") {

                            if (vg_HayObservaciones == "true" && sTextoEnlace == "(Registrar cuentas...)") {
                                $("#divObservacionesQ15_" + vcIdSolicitud).html("&nbsp&nbsp<a href='#' id='lblObservacionQ15_" + vcIdSolicitud + "' class='ObservacionesImportacion' >" + sTextoEnlace + "</a>");

                                $("#" + vcIdInputFile).attr("nombrearchivoQ15", myfile_rename);
                                $("#dvEstadoLogoq15_" + vcIdSolicitud).html(vcFilename);
                                $("#dvTextoFileq15_" + vcIdSolicitud).hide();
                                $("#dvTextoFileq15_" + vcIdSolicitud).html(vcFilename);
                                $("#DeleteFileQ15_" + vcIdSolicitud).html("<img id='ImgquitarImportacionQ15_" + vcIdSolicitud + "' src='../Common/images/remove.png' class='QuitaAdjuntoImportacion' />");
                            }
                            else if (vg_HayObservaciones == "true" && sTextoEnlace == "Observaciones") {
                                alertaExterna(vg_ObservacionDetalle);
                            }
                            else if (vg_HayObservaciones == "error") {
                                alertaExterna("Hay un error al conectarse a Base Datos del Dominio.");
                            }
                            else if (vg_HayObservaciones == "false") {
                                $("#divObservacionesQ15_" + vcIdSolicitud).html("&nbsp&nbsp<a href='#' id='lblObservacionQ15_" + vcIdSolicitud + "' class='ObservacionesImportacion' >" + sTextoEnlace + "</a>");

                                $("#" + vcIdInputFile).attr("nombrearchivoQ15", myfile_rename);
                                $("#dvEstadoLogoq15_" + vcIdSolicitud).html(vcFilename);
                                $("#dvTextoFileq15_" + vcIdSolicitud).hide();
                                $("#dvTextoFileq15_" + vcIdSolicitud).html(vcFilename);
                                $("#DeleteFileQ15_" + vcIdSolicitud).html("<img id='ImgquitarImportacionQ15_" + vcIdSolicitud + "' src='../Common/images/remove.png' class='QuitaAdjuntoImportacion' />");
                            }
                        }
                        else if (TipoImportacion == "2") {

                            if (vg_HayObservaciones == "true" && sTextoEnlace == "Observaciones") {
                                alertaExterna(vg_ObservacionDetalle);
                            }
                            else if (vg_HayObservaciones == "false") {
                                $("#divObservacionesOrga_" + vcIdSolicitud).html("&nbsp&nbsp<a href='#' id='lblObservacionOrga_" + vcIdSolicitud + "' class='ObservacionesImportacion' >" + sTextoEnlace + "</a>");

                                $("#" + vcIdInputFile).attr("nombrearchivoOrga", myfile_rename);
                                $("#dvEstadoLogoOrga_" + vcIdSolicitud).html(vcFilename);
                                $("#dvTextoFileOrga_" + vcIdSolicitud).hide();
                                $("#dvTextoFileOrga_" + vcIdSolicitud).html(vcFilename);
                                $("#DeleteFileOrga_" + vcIdSolicitud).html("<img id='ImgquitarImportacionOrga_" + vcIdSolicitud + "' src='../Common/images/remove.png' class='QuitaAdjuntoImportacion' />");
                            }
                            // alert('Respuesta de carga de Organizacion');
                        }
                    }
                    else {
                        alertaExterna(vcMensajeErrorSistema);
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
    }

    $("#btnProcesarMasivo").click(function () {
        var mySolicitudes = [];
        PreparaGrabacionMasiva01();
    });
    //Modo Externo 

    $("#btnGuardarMasivoTitulares").click(function () {
        var ArrayTitulares_interno = $("#gridMasivoTitulares").jqGrid('getRowData');
        var my_titular;
        var haymensaje = false;

        var contduplicidad = 0;
        var mis_titulares = [];

        for (var k = 0; k < ArrayTitulares_interno.length; k++) {
            incidencia = 0;
            my_titular = $("#txt" + ArrayTitulares_interno[k].IdSolicitudTitular).val().trim();
            mis_titulares[k] = my_titular;

            if (my_titular == "") {
                haymensaje = true;
                alertaExterna("Debe de ingresar el usuario.");
                break;
            }
            else if (!EsCaracterEspecial(my_titular, false)) {
                haymensaje = true;
                alertaExterna("El usuario ingresado tiene caracteres especiales.");
                break;
            }
            else if (DetectarDuplicidadTitularSuscripcionGrilla(mis_titulares, my_titular)) {
                haymensaje = true;
                alertaExterna("Hay usuarios duplicados.");
                break;
            }
            else if (ExisteValor_TitulaAsignado(ArrayTitulares_interno[k].IdSolicitudTitular).split('|')[1] == "false") {


                /*my_titular = $("#txt" + ArrayTitulares_interno[k].IdSolicitudTitular).val().trim();

                if (my_titular == "") {
                haymensaje = true;
                alertaExterna("Debe de ingresar el usuario.");
                break;
                }
                else if (DetectarDuplicidadTitularSuscripcion(ArrayTitulares_interno[k].IdSolicitud, my_titular)) {
                haymensaje = true;
                alertaExterna("Hay usuarios duplicados.");
                break;
                }
                else {
                vgAPM_TitularesAsignados.push(ArrayTitulares_interno[k].IdSolicitudTitular + '|' + $("#txt" + ArrayTitulares_interno[k].IdSolicitudTitular).val() + '|' + ArrayTitulares_interno[k].IdSolicitud);
                //$("#divMasivoTitulares").dialog('close');
                }   
                */

                vgAPM_TitularesAsignados.push(ArrayTitulares_interno[k].IdSolicitudTitular + '|' + $("#txt" + ArrayTitulares_interno[k].IdSolicitudTitular).val() + '|' + ArrayTitulares_interno[k].IdSolicitud);
            }
            else {

                /*
                my_titular = $("#txt" + ArrayTitulares_interno[k].IdSolicitudTitular).val().trim();
                if (DetectarDuplicidadTitularSuscripcion(ArrayTitulares_interno[k].IdSolicitud, my_titular)) {
                haymensaje = true;
                alertaExterna("Hay usuarios duplicados.");
                break;
                }
                */


                Indic = ExisteValor_TitulaAsignado(ArrayTitulares_interno[k].IdSolicitudTitular).split('|')[0];
                vgAPM_TitularesAsignados[Indic] = ArrayTitulares_interno[k].IdSolicitudTitular + '|' + $("#txt" + ArrayTitulares_interno[k].IdSolicitudTitular).val() + '|' + ArrayTitulares_interno[k].IdSolicitud;
                //$("#divMasivoTitulares").dialog('close');
            }



        }


        if (haymensaje == false) {
            $("#divMasivoTitulares").dialog('close');
        }
    });

    function MostrarOcultarBotonAplicar() {
        if ($("#chkAsignarServidorBD").is(':checked') || $("#chkAsignarServidorAPP").is(':checked') || $("#chkAsignarUsuario").is(':checked') || $("#chkAsignarContrato").is(':checked') || $("#chkAsignarPortal").is(':checked')) {
            $("#btnAplicarAsignar").show();
        }
        else {
            $("#btnAplicarAsignar").hide();
        }
    }

    $("#chkAsignarUsuario").click(function () {
        MostrarOcultarCampoAsignaUsuario();
    });
    function MostrarOcultarCampoAsignaUsuario() {
        if ($("#chkAsignarUsuario").is(':checked')) {
            $("#optAplicarTitSin").attr("checked", "checked");
            //$("#cboAsignarCampo").show();
            //$("#btnAsignarCampo").show();
            //$("#tdoptAplicar").show();
            //$("#txtUsuario").show();
            $(".tdAsignaUsuario").show();
        }
        else {
            //$("#cboAsignarCampo").hide();
            //$("#btnAsignarCampo").hide();
            //$("#tdoptAplicar").hide();
            //$("#txtUsuario").hide();
            //$("#txtUsuario").val("");
            $(".tdAsignaUsuario").hide();
            CampoConcatenadoAsignaUsuario = "";
        }
        MostrarOcultarBotonAplicar();
    }

    $("#chkAsignarServidorBD").click(function () {
        MostrarOcultarCampoAsignaServidorBD();
    });
    function MostrarOcultarCampoAsignaServidorBD() {
        if ($("#chkAsignarServidorBD").is(':checked')) {
            $("#divServidoresBD").show();
            $("#divServidoresBD_Instancia").show();
            $("#divEspacioRequerido").show();
        }
        else {
            $("#divServidoresBD").hide();
            $("#divServidoresBD_Instancia").hide();
            $("#divEspacioRequerido").hide();
        }
        MostrarOcultarBotonAplicar();
    }

    $("#chkAsignarServidorAPP").click(function () {
        MostrarOcultarCampoAsignaServidorAPP();
    });
    function MostrarOcultarCampoAsignaServidorAPP() {
        if ($("#chkAsignarServidorAPP").is(':checked')) {
            $("#divServidoresAPP").show();
            $("#divServidoresAPP_Instancia").show();
        }
        else {
            $("#divServidoresAPP").hide();
            $("#divServidoresAPP_Instancia").hide();
        }
        MostrarOcultarBotonAplicar();
    }

    $("#chkAsignarContrato").click(function () {
        MostrarOcultarCampoAsignaContrato();
    });
    function MostrarOcultarCampoAsignaContrato() {
        if ($("#chkAsignarContrato").is(':checked')) {
            $("#tdContrato").show();
        }
        else {
            $("#tdContrato").hide();
            $("#tdContrato").val("-1");
        }
        MostrarOcultarBotonAplicar();
    }

    $("#chkAsignarPortal").click(function () {
        MostrarOcultarCampoAsignaPortal();
    });
    function MostrarOcultarCampoAsignaPortal() {
        if ($("#chkAsignarPortal").is(':checked')) {
            $("#tdPotal").show();
        }
        else {
            $("#tdPotal").hide();
            $("#tdPotal").val("-1");
        }
        MostrarOcultarBotonAplicar();
    }

    $("#chkAsignarServidorPedidos").click(function () {
        MostrarOcultarGraficoPedidos();
    });
    function MostrarOcultarGraficoPedidos() {
        if ($("#chkAsignarServidorPedidos").is(':checked')) {
            $("#tbPedidos").show();
            var active = $("#AccordionJQ1").accordion("option", "active");
            if (active == 1 && $("#hdfIsActive_1").val() == "0") {
                ListarServidorPEDIDOS();
            }
        }
        else {
            $("#tbPedidos").hide();
            $("#tbPedidos").val("-1");
        }
        MostrarOcultarBotonAplicar();
    }



    function ValidacionAsignaValores() {

        if ($("#chkAsignarServidorBD").is(":checked")) {
            if (vIdServidorBDSeleccionado == 0) {
                alertaExterna('Debe seleccionar un Servidor de Base de Datos.');
                return false;
            }

            if ($("#cboInstanciaBD option:selected").val() == "-1") {
                alertaExterna('Debe seleccionar Instancia BD.');
                return false;
            }

            if (vTamanioBaseDatosRequerido > vEspacioServidorBDSeleccionado) {
                alertaExterna('No hay suficiente espacio para procesar las suscripciones seleccionadas.');
                return false;
            }
        }

        if ($("#chkAsignarServidorAPP").is(":checked")) {
            if (vIdServidorAPPSeleccionado == 0) {
                alertaExterna('Debe seleccionar un Servidor de Aplicación.');
                return false;
            }

            if ($("#cboInstanciaAPP option:selected").val() == "-1") {
                alertaExterna('Debe seleccionar Instancia APP.');
                return false;
            }
        }

        if ($("#chkAsignarServidorPedidos").is(":checked")) {
            if (vIdServidorPedidosSeleccionado == 0) {
                alertaExterna('Debe seleccionar un Servidor de Aplicación de Pedidos.');
                return false;
            }

            if ($("#cboInstanciaWEB option:selected").val() == "-1") {
                alertaExterna('Debe seleccionar Instancia de Aplicacion de Pedidos.');
                return false;
            }
        }

        if ($("#chkAsignarUsuario").is(":checked")) {
            if (!$("#optAplicarTitSin").is(':checked') && !$("#optAplicarTitGeneral").is(':checked')) {
                alertaExterna('Debe elegir una de las opciones de aplicar.');
                return false;
            }

            if (!EsCaracterEspecial($("#txtUsuario").val().trim(), true)) {
                alertaExterna("La nomenclatura tiene caracteres especiales.");
                return false;
            }

        }

        if ($("#chkAsignarContrato").is(":checked")) {
            if ($("#cbocontrato option:selected").val() == "-1") {
                alertaExterna('Debe seleccionar contrato.');
                return false;
            }
        }

        if ($("#chkAsignarPortal").is(":checked")) {
            if ($("#ddlPortal option:selected").val() == "-1") {
                alertaExterna('Debe seleccionar un portal.');
                return false;
            }
        }

        if ($("#chkAsignarServidorAPP").is(":checked") && $("#chkAsignarServidorPedidos").is(":checked")) {
            if ($("#cboInstanciaAPP option:selected").val() == $("#cboInstanciaWEB option:selected").val()) {
                alertaExterna('Las instancias del Admin y de Pedidos son iguales. Debe seleccionar Instancias distintas para ambos casos.');
                return false;
            }
        }

        return true;
    }

    $("#btnAplicarAsignar").click(function () {

        // alert(vTamanioBaseDatos);
        if (ValidacionAsignaValores()) {
            if ($("#txtUsuario").val().trim() == "" && $("#chkAsignarUsuario").is(":checked")) {
                $('#divAplicarMasivo').dialog
				({
				    title: "Aplicar valores",
				    modal: true,
				    buttons: {
				        "Si": function () {
				            AplicarAsignarValores();
				            $(this).dialog("close");
				        },
				        "Cancelar": function () {
				            $(this).dialog("close");
				        }
				    }
				});
            }
            else {
                AplicarAsignarValores();
            }
        }
    });

    function AplicarAsignarValores() {
        var vgAPM_Nomenclatura = $("#txtUsuario").val();

        vgAPM_AplicaOpcion = 0;
        if ($("#optAplicarTitSin").is(":checked")) {
            vgAPM_AplicaOpcion = 1;
        }
        else {
            if ($("#optAplicarTitGeneral").is(":checked")) {
                vgAPM_AplicaOpcion = 2;
            }
        }

        var x_sel = $("#gridMasivo").jqGrid("getGridParam", "selarrrow");

        for (var k = 0; k < x_sel.length; k++) {
            var x_seldata = $("#gridMasivo").jqGrid("getRowData", x_sel[k]);
            var x_IdSolicitud = x_seldata.IdSolicitud;

            if ($("#chkAsignarServidorBD").is(":checked")) {
                $("#cboServidorBD_" + x_IdSolicitud).val(vIdServidorBDSeleccionado + ',' + vEspacioServidorBDSeleccionado);
                CargarInstanciaServidor(x_IdSolicitud, vIdServidorBDSeleccionado + ',' + vEspacioServidorBDSeleccionado, true);
                $("#cboInstanciaBD_" + x_IdSolicitud).val($("#cboInstanciaBD option:selected").val());
            }

            if ($("#chkAsignarServidorAPP").is(":checked")) {
                $("#cboServidorAPP_" + x_IdSolicitud).val(vIdServidorAPPSeleccionado);
                CargarInstanciaServidor_APP(x_IdSolicitud, vIdServidorAPPSeleccionado, true);
                $("#cboInstanciaAPP_" + x_IdSolicitud).val($("#cboInstanciaAPP option:selected").val());
            }

            if ($("#chkAsignarServidorPedidos").is(":checked")) {
                $("#cboServidorWEB_" + x_IdSolicitud).val(vIdServidorPedidosSeleccionado);
                CargarInstanciaServidor_WEB(x_IdSolicitud, vIdServidorPedidosSeleccionado, true);
                $("#cboInstanciaWEB_" + x_IdSolicitud).val($("#cboInstanciaWEB option:selected").val());
            }

            if ($("#chkAsignarContrato").is(":checked")) {
                $("#cboContrato_" + x_IdSolicitud).val($("#cbocontrato option:selected").val());
            }

            if ($("#chkAsignarUsuario").is(":checked")) {
                $("#hdf_usuario_" + x_IdSolicitud).val(vgAPM_Nomenclatura);
            }
            if ($("#chkAsignarPortal").is(":checked")) {
                $("#cboPortal_" + x_IdSolicitud).val($("#ddlPortal option:selected").val());
            }

        }

        $("#divAsignarValores").dialog('close');
    }

    function ListarServidor() {

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "Adm_ListadoSolicitudes.aspx/ListarServidorEspacio",
            data: "{}",
            dataType: "json",
            success: function (result) {

                var lsSolicitud = result.d;

                var cadena = '{"chart": {"baseFont":"Verdana", "baseFontColor": "#333333", "bgColor": "#ffffff","canvasBgColor": "#ffffff","canvasBorderAlpha": "0","caption": "Lista de Servidores Disponibles",' +
                					'"captionFontSize": "11", "decimalseparator": ".","divLineDashLen": "1","divLineDashed": "1","divLineGapLen": "1", "divlineColor": "#999999",  "divlineThickness": "1", ' +
                					'"formatnumber": "1","formatnumberscale": "0","legendBgAlpha": "0", "legendBorderAlpha": "0","legendItemFontColor": "#666666", "legendItemFontSize": "10", "legendItemFontSize": "10", "legendShadow": "0", ' +
                					'  "placeValuesInside": "1","rotateValues": "1","sformatnumber": "0","sformatnumberscale": "0","showAlternateHGridColor": "0", "showBorder": "0","showHoverEffect": "1","showShadow": "0","showXAxisLine": "1",' +
                					 '"showPercentValues": "0","showplotborder": "0","stack100percent": "1","showPercentValues": "0", "subcaptionFontBold": "0","subcaptionFontSize": "14",' +
                					 ' "thousandseparator": ",","usePlotGradientColor": "0","valueFontColor": "#ffffff", "xAxisLineColor": "#999999","xAxisLineThickness": "1","xAxisname": "","yAxisName": "","divlineColor": "#999999","paletteColors": "#d9534f,#428bca"';

                //                var cadena = '{"chart": {"caption": "Product-wise quarterly revenue in last year", "subCaption": "Harrys SuperMart", "xAxisname": "Quarter",' +
                //                '"yAxisName": "Revenue (In USD)", "numberPrefix": "$", "paletteColors": "#0075c2,#1aaf5d", "bgColor": "#ffffff", ' +
                //                '"borderAlpha": "20", "showCanvasBorder": "0", "usePlotGradientColor": "0", "plotBorderAlpha": "10", "legendBgColor": "#ffffff",' +
                //                '"legendBorderAlpha": "0", "legendShadow": "0", "valueFontColor": "#ffffff", "showXAxisLine": "1", "xAxisLineColor": "#999999", ' +
                //                '"divlineColor": "#999999", "subcaptionFontBold": "0", "subcaptionFontSize": "14"';



                //                // ==============================================================================================================================

                cadena = cadena + ' }, "categories": [ {"category": [';

                for (var i = 0; i < $(result.d).length; i++) {
                    //                    // ==============================================================================================================================

                    var item = '{"label": "' + result.d[i].Nombre + '"}';

                    if (i + 1 != $(result.d).length) {
                        item = item + ',';
                    }
                    cadena = cadena + item;

                    //                    // ==============================================================================================================================
                }


                cadena = cadena + '] } ] , "dataset": [ {"seriesname": "' + 'Espacio Usado' + '", "data": [';
                for (i = 0; i < $(result.d).length; i++) {


                    //item = '{"value": "' + result.d[i].EspacioUsado + '", "link": "j-SeleccionarInstancia-' + result.d[i].IdServidor + "," + result.d[i].Nombre + '" }';
                    item = '{"value": "' + result.d[i].EspacioUsado + '", "link": "j-SeleccionarInstancia-' + result.d[i].IdServidor + "," + result.d[i].Nombre + "," + result.d[i].EspacioLibre + '" }';

                    if (i + 1 != $(result.d).length) {
                        item = item + ',';
                    }
                    cadena = cadena + item;
                }
                cadena = cadena + '] } ';

                cadena = cadena + ', {"seriesname": "' + 'Espacio Libre' + '", "data": [';

                for (i = 0; i < $(result.d).length; i++) {


                    //item = '{"value": "' + result.d[i].EspacioLibre + '", "link": "j-SeleccionarInstancia-' + result.d[i].IdServidor + "," + result.d[i].Nombre + '" }';
                    item = '{"value": "' + result.d[i].EspacioLibre + '", "link": "j-SeleccionarInstancia-' + result.d[i].IdServidor + "," + result.d[i].Nombre + "," + result.d[i].EspacioLibre + '" }';

                    if (i + 1 != $(result.d).length) {
                        item = item + ',';
                    }
                    cadena = cadena + item;
                }

                cadena = cadena + '] } ] }';

                var myChartId = "myChartId" + +Math.random();

                var myChart = new FusionCharts("../Common/Scripts/FusionCharts/stackedbar2d.swf", myChartId, "400", "290", "0");

                myChart.setJSONData(cadena);
                myChart.setTransparent(true);
                myChart.render("divServidoresBD");
                $("#hdfIsActive_2").val(1);

            },
            error: function (result) {


                alert("Error");
            }
        });
    }

    function ListarServidorAPP() {

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "Adm_ListadoSolicitudes.aspx/ListarServidorAPP",
            data: "{}",
            dataType: "json",
            success: function (result) {

                var lsSolicitud = result.d;

                //                var cadena = '{"chart": {"baseFont":"Verdana", "baseFontColor": "#333333", "bgColor": "#ffffff","canvasBgColor": "#ffffff","canvasBorderAlpha": "0","caption": "Lista de Servidores de Aplicaciones",' +
                //					'"captionFontSize": "14", "decimalseparator": ".","divLineDashLen": "1","divLineDashed": "1","divLineGapLen": "1", "divlineColor": "#999999",  "divlineThickness": "1", ' +
                //					'"formatnumber": "1","formatnumberscale": "0","legendBgAlpha": "0", "legendBorderAlpha": "0","legendItemFontColor": "#666666", "legendItemFontSize": "10", "legendItemFontSize": "10", "legendShadow": "0", ' +
                //					'  "placeValuesInside": "1","rotateValues": "1","sformatnumber": "0","sformatnumberscale": "0","showAlternateHGridColor": "0", "showBorder": "0","showHoverEffect": "1","showShadow": "0","showXAxisLine": "1",' +
                //					 '"showPercentValues": "0","showplotborder": "0","stack100percent": "1","showPercentValues": "0", "subcaptionFontBold": "0","subcaptionFontSize": "14",' +
                //					 ' "thousandseparator": ",","usePlotGradientColor": "0","valueFontColor": "#ffffff", "xAxisLineColor": "#999999","xAxisLineThickness": "1","xAxisname": "","yAxisName": "Cantidad de Usuarios","divlineColor": "#999999","showlegend": "0"';

                var cadena = '{"chart": {"baseFont":"Verdana", "baseFontColor": "#333333", "bgColor": "#ffffff","canvasBgColor": "#ffffff","canvasBorderAlpha": "0","caption": "Lista de Servidores de Aplicaciones",' +
					'"captionFontSize": "14", "decimalseparator": ".","divLineDashLen": "1","divLineDashed": "1","divLineGapLen": "1", "divlineColor": "#999999",  "divlineThickness": "1", ' +
					'"formatnumber": "1","formatnumberscale": "0","legendBgAlpha": "0", "legendBorderAlpha": "0","legendItemFontColor": "#666666", "legendItemFontSize": "10", "legendItemFontSize": "10", "legendShadow": "0", ' +
					'  "placeValuesInside": "1","rotateValues": "1","sformatnumber": "0","sformatnumberscale": "0","showAlternateHGridColor": "0", "showBorder": "0","showHoverEffect": "1","showShadow": "0","showXAxisLine": "1",' +
					 '"showPercentValues": "0","showplotborder": "0","stack100percent": "1","showPercentValues": "0", "subcaptionFontBold": "0","subcaptionFontSize": "14",' +
					 ' "thousandseparator": ",","usePlotGradientColor": "0","valueFontColor": "#ffffff", "xAxisLineColor": "#999999","xAxisLineThickness": "1","xAxisname": "","yAxisName": "Cantidad de Usuarios","divlineColor": "#999999","showlegend": "0"';

                //                // ==============================================================================================================================


                cadena = cadena + ' }, "categories": [ {"category": [';



                for (var i = 0; i < $(result.d).length; i++) {
                    //                    // ==============================================================================================================================

                    var item = '{"label": "' + result.d[i].Nombre + '"}';

                    if ((i + 1) != $(result.d).length) {
                        item = item + ',';
                    }
                    cadena = cadena + item;

                    //                    // ==============================================================================================================================
                }

                cadena = cadena + '] } ] , "dataset": [ {"seriesname": "' + 'Cantidad de usuarios' + '", "data": [';
                for (i = 0; i < $(result.d).length; i++) {
                    var vcColor = '';
                    if (i == 0) vcColor = '#A9E2F3';
                    if (i == 1) vcColor = '#FC2424';
                    if (i == 2) vcColor = '#EEE8AA';
                    if (i == 3) vcColor = '#E6E6FA';
                    if (i == 4) vcColor = '#87CEEB';
                    if (i == 5) vcColor = '#66CDAA';
                    if (i == 6) vcColor = '#F4A460';
                    if (i == 7) vcColor = '#B0C4DE';
                    if (i == 8) vcColor = '#EEE8AA';
                    if (i == 9) vcColor = '#D2B48C';
                    if (i == 10) vcColor = '#F5F5DC';
                    if (i == 11) vcColor = '#5F9EA0';
                    if (i == 12) vcColor = '#F0FFF0';


                    var itemColor = vcColor;
                    //item = '{"value": "' + result.d[i].CantidadUsuarios + '", "link": "j-SeleccionarInstancia-' + result.d[i].IdInstanciaAPP + ','+result.d[i].NombreAPP+'", "Color": "' + itemColor + '" }';
                    item = '{"value": "' + result.d[i].CantidadUsuarios + '", "link": "j-SeleccionarInstanciaAPP-' + result.d[i].IdServidor + "," + result.d[i].Nombre + '", "Color": "' + itemColor + '" }';
                    if (i + 1 != $(result.d).length) {
                        item = item + ',';
                    }
                    cadena = cadena + item;
                }


                cadena = cadena + '] } ] }';


                var myChartId = "myChartId" + +Math.random();


                setTimeout(function () {
                    var myChart = new FusionCharts("../Common/Scripts/FusionCharts/MSBar3D.swf", "DiscoDuros", "400", "255", "0");
                    myChart.setJSONData(cadena);
                    myChart.setTransparent(true);
                    myChart.render("divServidoresAPP");
                }, 800);                


            },
            error: function (result) {

                alert("Error");
            }
        });

    }

    function ListarServidorPEDIDOS() {

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "Adm_ListadoSolicitudes.aspx/ListarServidorAPP",
            data: "{}",
            dataType: "json",
            success: function (result) {

                var lsSolicitud = result.d;
                var cadena = '{"chart": {"baseFont":"Verdana", "baseFontColor": "#333333", "bgColor": "#ffffff","canvasBgColor": "#ffffff","canvasBorderAlpha": "0","caption": "Lista de Servidores de Aplicaciones",' +
					'"captionFontSize": "14", "decimalseparator": ".","divLineDashLen": "1","divLineDashed": "1","divLineGapLen": "1", "divlineColor": "#999999",  "divlineThickness": "1", ' +
					'"formatnumber": "1","formatnumberscale": "0","legendBgAlpha": "0", "legendBorderAlpha": "0","legendItemFontColor": "#666666", "legendItemFontSize": "10", "legendItemFontSize": "10", "legendShadow": "0", ' +
					'  "placeValuesInside": "1","rotateValues": "1","sformatnumber": "0","sformatnumberscale": "0","showAlternateHGridColor": "0", "showBorder": "0","showHoverEffect": "1","showShadow": "0","showXAxisLine": "1",' +
					 '"showPercentValues": "0","showplotborder": "0","stack100percent": "1","showPercentValues": "0", "subcaptionFontBold": "0","subcaptionFontSize": "14",' +
					 ' "thousandseparator": ",","usePlotGradientColor": "0","valueFontColor": "#ffffff", "xAxisLineColor": "#999999","xAxisLineThickness": "1","xAxisname": "","yAxisName": "Cantidad de Usuarios","divlineColor": "#999999","showlegend": "0"';

                // ==============================================================================================================================


                cadena = cadena + ' }, "categories": [ {"category": [';



                for (var i = 0; i < $(result.d).length; i++) {
                    // ==============================================================================================================================

                    var item = '{"label": "' + result.d[i].Nombre + '"}';

                    if ((i + 1) != $(result.d).length) {
                        item = item + ',';
                    }
                    cadena = cadena + item;

                    // ==============================================================================================================================
                }

                cadena = cadena + '] } ] , "dataset": [ {"seriesname": "' + 'Cantidad de usuarios' + '", "data": [';
                for (i = 0; i < $(result.d).length; i++) {
                    var vcColor = '';
                    if (i == 0) vcColor = '#A9E2F3';
                    if (i == 1) vcColor = '#FC2424';
                    if (i == 2) vcColor = '#EEE8AA';
                    if (i == 3) vcColor = '#E6E6FA';
                    if (i == 4) vcColor = '#87CEEB';
                    if (i == 5) vcColor = '#66CDAA';
                    if (i == 6) vcColor = '#F4A460';
                    if (i == 7) vcColor = '#B0C4DE';
                    if (i == 8) vcColor = '#EEE8AA';
                    if (i == 9) vcColor = '#D2B48C';
                    if (i == 10) vcColor = '#F5F5DC';
                    if (i == 11) vcColor = '#5F9EA0';
                    if (i == 12) vcColor = '#F0FFF0';


                    var itemColor = vcColor;
                    //item = '{"value": "' + result.d[i].CantidadUsuarios + '", "link": "j-SeleccionarInstancia-' + result.d[i].IdInstanciaAPP + ','+result.d[i].NombreAPP+'", "Color": "' + itemColor + '" }';
                    item = '{"value": "' + result.d[i].CantidadUsuarios + '", "link": "j-SeleccionarInstanciaPedidos-' + result.d[i].IdServidor + "," + result.d[i].Nombre + '", "Color": "' + itemColor + '" }';
                    if (i + 1 != $(result.d).length) {
                        item = item + ',';
                    }
                    cadena = cadena + item;
                }


                cadena = cadena + '] } ] }';


                var myChartId = "myChartId" + +Math.random();

                var myChart = new FusionCharts("../Common/Scripts/FusionCharts/MSBar3D.swf", "DiscoDuros", "400", "255", "0");

                myChart.setJSONData(cadena);
                myChart.setTransparent(true);
                myChart.render("divServidoresWEB");
                $("#hdfIsActive_1").val(1);

            },
            error: function (result) {

                alert("Error");
            }
        });

    }

    $("#btnCerrarMasivo").click(function () {
        $("#divMasivo").dialog('close');
    });

    $("#btnCerrarMasivoTitulares").click(function () {
        $("#divMasivoTitulares").dialog('close');
    });

    $("#cboInstanciaBD").html("");
    $("#cboInstanciaBD").append($("<option></option>").attr("value", -1).text("Seleccione"));

    $("#cboInstanciaAPP").html("");
    $("#cboInstanciaAPP").append($("<option></option>").attr("value", -1).text("Seleccione"));

    $("#cboInstanciaWEB").html("");
    $("#cboInstanciaWEB").append($("<option></option>").attr("value", -1).text("Seleccione"));


    $("#btnAsignarCampo").click(function () {
        $("#txtUsuario").val($("#txtUsuario").val() + $("#cboAsignarCampo option:selected").val());
    });

    $("#btnAsignarMasivo").live("click", function () {

        //Obtenemos los valores de configuración de Web.Config ("TamanioBaseMovil_MB")
        //ObtenerValoresConfiguracion(); //OJO: AL DESCOMENTAR AL MOMENTO DE MODIFICAR WEB.CONFIG SE PERDERIA LA SESION Y ENVIARIA A LOGIN.ASPX

        var vasig = $("#gridMasivo").jqGrid("getGridParam", "selarrrow");

        vTamanioBaseDatosRequerido = 0;
        vTamanioBaseDatos = vTamanioBaseDatos * 1;

        if (vasig.length > 0) {
            for (var k = 0; k < vasig.length; k++) {
                var vdat = $("#gridMasivo").jqGrid("getRowData", vasig[k]);
                vTamanioBaseDatosRequerido = vTamanioBaseDatosRequerido + vTamanioBaseDatos;
            }

            $("#divEspacioRequerido").html("Espacio requerido: " + vTamanioBaseDatosRequerido + "MB");

            var divAsignaValor = $("#divAsignarValores").dialog
			({
			    title: "Asignar Valores",
			    width: 950,
			    height: 560,
			    modal: true,
			    resizable: false,
			    position: ['center'],
			    autoOpen: true
			});

            ListarServidorAPP();

        }
        else {
            alertaExterna("Seleccione una suscripción.");
        }

    });

    $("#btnCerrarAplicar").live("click", function () {
        $("#divAsignarValores").dialog('close');
    });

    TraerDataServidorInstancia_BD();
    function TraerDataServidorInstancia_BD() {
        $.ajax(
		{
		    type: 'POST',
		    dataType: 'json',
		    contentType: 'application/json; charset=utf-8',
		    url: 'Adm_ListadoSolicitudes.aspx/Listar_Servidores_Instancias_BD',
		    success: function (result) {
		        var lista = result.d;

		        for (var k = 0; k < lista.length; k++) {
		            var Instancia = new ServidorInstancia();
		            Instancia.ServidorId = lista[k].IdServidor;
		            Instancia.ServidorNombre = lista[k].Nombre;
		            Instancia.ServidorDD = lista[k].DiscoDuro;
		            Instancia.ServidorEU = lista[k].EspacioUsado;
		            Instancia.InstanciaId = lista[k].IdInstanciaBD;
		            Instancia.InstanciaNombre = lista[k].InstanciaBD;

		            ServidoresInstancia.push(Instancia);
		        }
		    },
		    error: function (result) {

		        alert('Error');
		    }
		});
    }

    TraerDataServidorInstancia_APP();
    function TraerDataServidorInstancia_APP() {
        $.ajax(
		{
		    type: 'POST',
		    dataType: 'json',
		    contentType: 'application/json; charset=utf-8',
		    url: 'Adm_ListadoSolicitudes.aspx/Listar_Servidores_Instancias_APP',
		    success: function (result) {
		        var lista = result.d;

		        for (var k = 0; k < lista.length; k++) {
		            var Instancia = new ServidorInstancia();
		            Instancia.ServidorId = lista[k].IdServidor;
		            Instancia.ServidorNombre = lista[k].Nombre;
		            Instancia.ServidorDD = lista[k].DiscoDuro;
		            Instancia.ServidorEU = lista[k].EspacioUsado;
		            Instancia.InstanciaId = lista[k].IdInstanciaBD;
		            Instancia.InstanciaNombre = lista[k].InstanciaBD;

		            Instancia.IdInstanciaAPP = lista[k].IdInstanciaAPP;
		            Instancia.InstanciaAPP = lista[k].InstanciaAPP;

		            ServidoresInstancia_APP.push(Instancia);
		        }
		    },
		    error: function (result) {
		        alert('Error');
		    }
		});
    }
    //TraerDataServidorInstancia_WEB();
    function TraerDataServidorInstancia_WEB() {
        $.ajax(
		{
		    type: 'POST',
		    dataType: 'json',
		    contentType: 'application/json; charset=utf-8',
		    url: 'Adm_ListadoSolicitudes.aspx/Listar_Servidores_Instancias_WEB',
		    success: function (result) {
		        var lista = result.d;

		        for (var k = 0; k < lista.length; k++) {
		            var Instancia = new ServidorInstancia();
		            Instancia.ServidorId = lista[k].IdServidor;
		            Instancia.ServidorNombre = lista[k].Nombre;
		            Instancia.ServidorDD = lista[k].DiscoDuro;
		            Instancia.ServidorEU = lista[k].EspacioUsado;
		            Instancia.InstanciaId = lista[k].IdInstanciaBD;
		            Instancia.InstanciaNombre = lista[k].InstanciaBD;

		            Instancia.IdInstanciaAPP = lista[k].IdInstanciaAPP;
		            Instancia.InstanciaAPP = lista[k].InstanciaAPP;

		            ServidoresInstancia_WEB.push(Instancia);
		        }
		    },
		    error: function (result) {


		        alert('Error');
		    }
		});
    }

    TraerDataContrato();
    function TraerDataContrato() {
        ContratoHTML = "";

        ContratoHTML = "<option value='-1'>Seleccione</option>";

        $.ajax({
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            url: 'Adm_ListadoSolicitudes.aspx/ListarContrato',
            success: function (result) {
                var lista = result.d;

                for (var k = 0; k < lista.length; k++) {
                    var contrato = new Contrato();
                    contrato.IdContratoTerminos = lista[k].IdContratoTerminos;
                    contrato.Descripcion = lista[k].Descripcion;

                    //ListaContrato.push(contrato);
                    //$(".clsContrato").append("<option value ='" + lista[k].IdContratoTerminos + "'>" + lista[k].Descripcion + "<option>");

                    ContratoHTML = ContratoHTML + "<option value = '" + lista[k].IdContratoTerminos + "'>" + lista[k].Descripcion + "</option>";
                }
            },
            error: function (result) {

                alert('Error');
            }
        });
    }

    TraerDataPortal();
    function TraerDataPortal() {
        PortalHTML = "";
        PortalHTML = "<option value='-1'>Seleccione</option>";
        $.ajax({
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            url: 'Adm_ListadoSolicitudes.aspx/ListarPortal',
            success: function (result) {
                var lista = result.d;
                for (var k = 0; k < lista.length; k++) {
                    if (lista[k].IdPortal != "-1") {
                        var contrato = new Contrato();
                        contrato.IdPortal = lista[k].IdPortal;
                        contrato.NombrePortal = lista[k].NombrePortal;
                        PortalHTML = PortalHTML + "<option value = '" + lista[k].IdPortal + "'>" + lista[k].NombrePortal + "</option>";
                    }
                }
            },
            error: function (result) {
                alert('Error');
            }
        });
    }



    function fnMostrarEspera() {
        //$("#divWait").show();
        //$('body').scrollTop(0);
    }

    $("#TabDetalle").css("display", "none");
    $("#toolbar").css("display", "block");
    $("#tblLeyenda").css("display", "block");
    //$("#divAsignarValores").css("display", "block");
    $("#ImgLupaAccion").css("display", "block");

    $("#cb_grid").live("click", function (e) {
        var t_est_procesar = $("#cb_grid").is(':checked');
        $("#btnProcesar").button("option", "disabled", !t_est_procesar);
    });

    $(".accordion").accordion({
        collapsible: false,
        autoHeight: false
    });

    $(".ui-accordion-header ui-helper-reset ui-state-hover ui-corner-all").click(function () {
        alert(2);
    });

    $("#AccordionJQ1").click(function () {
        var active = $("#AccordionJQ1").accordion("option", "active");
        if (active == 2 && $("#hdfIsActive_2").val() == "0") {
            ListarServidor();
        }
    });

    //window.parent.$("#dvCargando").hide(); jcamacho123
    inAltGrid = $(window).height() - 168 - MargenFiltro * MargenHeight;
    NumeroInicialFilas();

    //$("#btnEnviarCorreoCliente").hide();
    $("#btnEnviarCorreoCliente").on("click", function () {
        //alert('hola');
        confirmacion("¿Se enviará correo de Activación de Licencia al cliente '" + NombreClienteSeleccionado + "'.<br><br>¿Continuar con el proceso?", EnviarCorreoCliente, null, "Confirmar");

    });


    //    if ($("#hdfGruTipSolEdi").val() != "")
    //        vcGruTipSolEdi = $("#hdfGruTipSolEdi").val().split(",");
    //    else
    //        vcGruTipSolEdi = "";
    //    if ($("#hdfGruTipSolEli").val() != "")
    //        vcGruTipSolEli = $("#hdfGruTipSolEli").val().split(",");
    //    else
    //        vcGruTipSolEli = "";

    $('#bpTecRes_txtValorBusqueda').hide();
    $('#bpTecRes_imgBusqueda').hide();

    vcTipos = $("#hdfGruTipSol").val(); //General


    $("#tblAcciones").buttonset();
    $("#tbAprobar").buttonset();
    $("#tbExportar").buttonset();
    $(".ui-button-text").css({ padding: 4, width: 22 });

    $("#TabDetalle span.ui-icon-close").live("click", function () {
        var index = $("li", tab).index($(this).parent());
        tab.tabs("remove", index);
    });

    $("#txtFechaIni").keypress(ValidarFecha);
    $("#txtFechaFin").keypress(ValidarFecha);
    $("#txtRangoFechaIni").keypress(ValidarFecha);
    $("#txtRangoFechaFin").keypress(ValidarFecha);

    $("#txtFechaIni").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });
    $("#txtFechaFin").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });
    $("#txtRangoFechaIni").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });
    $("#txtRangoFechaFin").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });
    AsignarRangoFechas();
    function fnVerificarFecha(txtFecha) {
        if ($("#txtFechaIni").val() != "" && $("#txtFechaFin").val() != "") {
            var inDiaIni = parseInt($("#txtFechaIni").val().substr(0, 2));
            var inMesIni = parseInt($("#txtFechaIni").val().substr(3, 2));
            var inAnioIni = parseInt($("#txtFechaIni").val().substr(6, 4));
            var inDiaFin = parseInt($("#txtFechaFin").val().substr(0, 2));
            var inMesFin = parseInt($("#txtFechaFin").val().substr(3, 2));
            var inAnioFin = parseInt($("#txtFechaFin").val().substr(6, 4));

            if ((inAnioIni > inAnioFin) || (inAnioIni == inAnioFin && inMesIni > inMesFin) || (inAnioIni == inAnioFin && inMesIni == inMesFin && inDiaIni > inDiaFin)) {
                vcRangFecVal = "0";
                $(txtFecha).val("");
            }
        }
    }

    function fnVerificarRangoFecha(txtFecha) {
        if ($("#txtRangoFechaIni").val() != "" && $("#txtRangoFechaFin").val() != "") {
            var inDiaIni = parseInt($("#txtRangoFechaIni").val().substr(0, 2));
            var inMesIni = parseInt($("#txtRangoFechaIni").val().substr(3, 2));
            var inAnioIni = parseInt($("#txtRangoFechaIni").val().substr(6, 4));
            var inDiaFin = parseInt($("#txtRangoFechaFin").val().substr(0, 2));
            var inMesFin = parseInt($("#txtRangoFechaFin").val().substr(3, 2));
            var inAnioFin = parseInt($("#txtRangoFechaFin").val().substr(6, 4));

            if ((inAnioIni > inAnioFin) || (inAnioIni == inAnioFin && inMesIni > inMesFin) || (inAnioIni == inAnioFin && inMesIni == inMesFin && inDiaIni > inDiaFin)) {
                vcRangFecVal = "0";
                $(txtFecha).val("");
            }
        }
    }

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

    //*******************Validaciones para vistas
    /* if ($("#hdfAdmin").val() == "1") {
    //        $("#trPendiente").show();
    $("#trPorAprobar").show();
    //$("#trAprobada").show();
    //$("#trRechazada").show();
    $("#trPorAsignar").show();
    $("#trEnProceso").show();
    //$("#trCulminada").show();
    //$("#trAnulada").show();
    vcTodos = "1";
    }
    if ($("#hdfTecnico").val() == "1") {
    //        $("#trPendiente").show();
    $("#trPorAsignar").show();
    $("#trEnProceso").show();
    //$("#trCulminada").show();
    //$("#trAnulada").show();
    vcTodos = "1";
    }
    if ($("#hdfResApr").val() == "1") {
    //        $("#trPendiente").show();
    $("#trPorAprobar").show();
    //$("#trAprobada").show();
    //$("#trRechazada").show();
    vcTodos = "1";
    } */
    //******************* Fin validaciones para vistas


    function CambioVistas() {
        inFiltro = 1;
        vcFiltro = "";
        MultiSeleccion = "0";
        if ($('#rbtGeneral').is(':checked')) {
            DimPosElementos();
            if ($("#hdfBusquedaIni").val() != "7") {
                $("#divRangoFecha").show();
                fnVistaGeneral(false);
                AsignarRangoFechas();
                ActualizarGrilla();
            } else {
                $("#divRangoFecha").hide();
                fnVistaGeneral(true);
            }
            $("#grid").hideCol("Q15");
            $("#grid").hideCol("Organizacion");
        } else if ($('#rbtPendiente').is(':checked')) {
            DimPosElementos();
            fnVistaPendiente(false);
            vcRangoFechaIni = "";
            vcRangoFechaFin = "";
            ActualizarGrilla();
        } else if ($('#rbtPorAprobar').is(':checked')) {
            fnVistaPorAprobar(false);
            vcRangoFechaIni = "";
            vcRangoFechaFin = "";
            ActualizarGrilla();
        } else if ($('#rbtAprobada').is(':checked')) {
            fnVistaAprobada();
            vcRangoFechaIni = "";
            vcRangoFechaFin = "";
            ActualizarGrilla();
        } else if ($('#rbtRechazada').is(':checked')) {
            fnVistaRechazada();
            vcRangoFechaIni = "";
            vcRangoFechaFin = "";
            ActualizarGrilla();
        } else if ($('#rbtPorAsignar').is(':checked')) {
            DimPosElementos();
            fnVistaPorAsignar(false);
            vcRangoFechaIni = "";
            vcRangoFechaFin = "";
            ActualizarGrilla();
            $("#grid").hideCol("Q15");
            $("#grid").hideCol("Organizacion");
        } else if ($('#rbtEnProceso').is(':checked')) {
            DimPosElementos();
            fnVistaEnProceso();
            vcRangoFechaIni = "";
            vcRangoFechaFin = "";
            ActualizarGrilla();
            $("#grid").hideCol("Q15");
            $("#grid").hideCol("Organizacion");
        } else if ($('#rbtCulminada').is(':checked')) {
            fnVistaCulminada();
            vcRangoFechaIni = "";
            vcRangoFechaFin = "";
            ActualizarGrilla();
            $("#grid").showCol("Q15");
            $("#grid").showCol("Organizacion");
        } else if ($('#rbtAnulada').is(':checked')) {
            fnVistaAnulada();
            vcRangoFechaIni = "";
            vcRangoFechaFin = "";
            ActualizarGrilla();
        }
        fnCargarFiltroTipoSolicitud();
        $("#hdfBusquedaIni").val("");

    }


    $("#rbtGeneral,#rbtPendiente,#rbtPorAprobar,#rbtAprobada,#rbtRechazada,#rbtPorAsignar,#rbtEnProceso,#rbtCulminada,#rbtAnulada").change(function () {
        CambioVistas();
    });



    $("#divCodigo").show();
    $("#divFecha").hide();
    $("#divEmpleado").hide();
    $("#divEstadoSolicitud").hide();
    $("#divTipoSolicitud").hide();

    if ($("#hdfBusquedaIni").val() != "") {
        $("#divCodigo").hide();
        $("#ddlFiltro").val("7");

        inFiltro = 7;
        vcFiltro = '';
        vcFiltro2 = '';

        $('#rbtGeneral').attr('checked', 'checked');
        $('#dvFiltrar').hide();
        fnVistaGeneral(true);
    }

    $("#ddlFiltro").change(function () {
        $("#divRangoFecha").show();
        $("#hdfBusquedaIni").val("");
        inFiltro = $("#ddlFiltro").val();
        fnIniciarFiltros();

        if (inFiltro == 1) { //Código Solicitud
            $("#divCodigo").show();
            $('#dvFiltrar').show();
            fnCargarGrilla();
        } else if (inFiltro == 2) { //Fecha
            $("#divFecha").show();
            $('#dvFiltrar').show();
            fnCargarGrilla();
        } else if (inFiltro == 3) { //Empleado
            $("#divEmpleado").show();
            $('#dvFiltrar').show();
            fnCargarGrilla();
        } else if (inFiltro == 4) { //Estados de Aprobación
            $("#divEstadoApr").show();
            $('#dvFiltrar').show();
            fnCargarGrilla();
        } else if (inFiltro == 5) { //Estados de Proceso
            $("#divEstadoPro").show();
            $('#dvFiltrar').show();
            fnCargarGrilla();
        } else if (inFiltro == 6) { //Tipo Solicitud
            $('#dvFiltrar').show();
            fnCargarFiltroTipoSolicitud();
            fnCargarGrilla();
        } else if (inFiltro == 7) { //Notas Por Revisar
            $('#dvFiltrar').hide();
            $("#divRangoFecha").hide();
            fnCargarGrilla();
        }
    });

    $("#chkSolNoVista,#ddlEstado,#ddlTipo,#ddlTipoTec,#ddlTipoResApr,#ddlEstadoApr,#ddlEstadoPro").change(function () {
        fnCargarGrilla();
    });
    $("#txtFechaIni").change(function () {
        vcFecVal = "1";
        fnVerificarFecha("#txtFechaIni");

        if (vcFecVal == "0") {
            alertaExterna("La fecha inicial debe ser menor que la fecha final.");
            return;
        }
        fnCargarGrilla();
    });
    $("#txtFechaFin").change(function () {
        vcFecVal = "1";
        fnVerificarFecha("#txtFechaFin");

        if (vcFecVal == "0") {
            alertaExterna("La fecha inicial debe ser menor que la fecha final.");
            return;
        }
        fnCargarGrilla();
    });

    $("#txtRangoFechaIni").change(function () {
        vcRangFecVal = "1";
        fnVerificarRangoFecha("#txtRangoFechaIni");

        if (vcRangFecVal == "0") {
            alertaExterna("La fecha inicial debe ser menor que la fecha final.");
            return;
        }
        fnCargarGrilla();
    });

    $("#txtRangoFechaFin").change(function () {
        vcRangFecVal = "1";
        fnVerificarRangoFecha("#txtRangoFechaFin");

        if (vcRangFecVal == "0") {
            alertaExterna("La fecha inicial debe ser menor que la fecha final.");
            return;
        }
        fnCargarGrilla();
    });

    //    $('#txtCodigo,#txtEmpleado').live("keydown", function (e) {
    //        
    //    });

    $('#txtCodigo,#txtEmpleado').live("keypress", function (e) {
        if (e.keyCode == 13) {
            fnCargarGrilla();
        } else {
            if (e.char == "\\")
                return false;
        }
    });

    //    $("#ddlTipo").change(function () {
    //        if (inFiltro == 4) {
    //            $.ajax({
    //                url: "Adm_ListadoSolicitudes.aspx/CargarEstados", //PageMethod
    //                data: "{'inTipSol':'" + $("#ddlTipo").val() + "'}",
    //                dataType: "json",
    //                type: "post",
    //                contentType: "application/json; charset=utf-8",
    //                success: function (result) {
    //                    $("#ddlEstado").empty();
    //                    for (var i = 0; i < result.d.length; i++) {
    //                        $("#ddlEstado").append($('<option></option>').val(result.d[i].P_inCod).html(result.d[i].vcNom));
    //                    }
    //                    fnCargarGrilla();
    //                },
    //                error: function (xhr, err, thrErr) {
    //                    MostrarErrorAjax(xhr, err, thrErr);
    //                }
    //            });
    //        } else
    //            fnCargarGrilla();
    //    });

    function fnCargarGrilla() {
        vcFiltro2 = "";
        MultiSeleccion = "0";
        if ($('#rbtGeneral').is(':checked') && inFiltro != 7) {  //FILTRO DE RANGO DE FECHA SOLO PARA LA OPCION GENERAL---------------------------------------------------------------
            var RangFecIni = $("#txtRangoFechaIni").val();
            var RangFecFin = $("#txtRangoFechaFin").val();
            vcRangoFechaIni = "";
            $("#grid").hideCol("cb");
            if (RangFecIni != "")
                vcRangoFechaIni = RangFecIni.substr(6, 4).toString() + RangFecIni.substr(3, 2).toString() + RangFecIni.substr(0, 2).toString() + " 00:00:00";
            else
                vcRangoFechaFin = "";
            if (RangFecFin != "")
                vcRangoFechaFin = RangFecFin.substr(6, 4).toString() + RangFecFin.substr(3, 2).toString() + RangFecFin.substr(0, 2).toString() + " 23:59:59";
            else
                vcRangoFechaFin = "";
        } else {
            vcRangoFechaIni = "";
            vcRangoFechaFin = "";
        }
        //----------------------------------------------------------------------------------------------------------------------------------------------------------------
        if (inFiltro == 1) //Código
            vcFiltro = LimpiarDatoString($("#txtCodigo").val());
        else if (inFiltro == 2) { //Rango de Fechas
            var FecHorIni = $("#txtFechaIni").val();
            var FecHorFin = $("#txtFechaFin").val();
            if (FecHorIni != "")
                vcFiltro = FecHorIni.substr(6, 4).toString() + FecHorIni.substr(3, 2).toString() + FecHorIni.substr(0, 2).toString() + " 00:00:00";
            else
                vcFiltro = "";
            if (FecHorFin != "")
                vcFiltro2 = FecHorFin.substr(6, 4).toString() + FecHorFin.substr(3, 2).toString() + FecHorFin.substr(0, 2).toString() + " 23:59:59";
            else
                vcFiltro2 = "";
        }
        else if (inFiltro == 3) //Empleado
            vcFiltro = LimpiarDatoString($("#txtEmpleado").val());
        else if (inFiltro == 4) //Estados de Aprobación
            vcFiltro = $("#ddlEstadoApr").val();

        else if (inFiltro == 5) //Estados de Proceso
        {
            vcFiltro = $("#ddlEstadoPro").val();
            if (vcFiltro == "1") {
                $("#grid").showCol("cb");
                MultiSeleccion = "1";
                $("#btnEnviar").button("option", "disabled", false);
            }
            else {
                $("#grid").hideCol("cb");
                $("#btnEnviar").button("option", "disabled", true);
            }
        }
        else if (inFiltro == 6) { //Tipos de Solicitud
            if ($("#divTipoSolicitud").is(':visible')) {
                vcFiltro = $("#ddlTipo").val();
            } else if ($("#divTipoSolicitudTec").is(':visible')) {
                vcFiltro = $("#ddlTipoTec").val();
            } else if ($("#divTipoSolicitudResApr").is(':visible')) {
                vcFiltro = $("#ddlTipoResApr").val();
            }
        } else if (inFiltro == 7) //Notas Por Revisar
            vcFiltro = '';

        $("#btnEnviarCorreoCliente").hide();

        $('#grid').jqGrid('setGridParam', { page: '1' });
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
        ArrayPaginacion.push(inFilas);
        ArrayPaginacion.push(inFilas + inFilas);
        ArrayPaginacion.push(inFilas + inFilas + inFilas);
    }

    function GenerarBotones(id, biNueNot) {

        var vcBotones = '      <img id="btnNota_' + id + '" src="../Common/Images/Chat/write.png" alt="Ver Notas" class="imgBtn ConImg" title="Ver Notas"/>';
        if (biNueNot == "0")
            vcBotones += '   <img id="imgNueNot_' + id + '" src="../Common/Images/Chat/Mail.png" alt="Nueva Nota" title="Nueva Nota"/>';
        else
            vcBotones += '';
        return vcBotones;
    }


    function CrearBotonesSemaforo(id, vcUmbral) {
        if (vcUmbral != "")
            return '<img src="../Common/Images/Semaforos/' + vcUmbral + '_16x16.png" />';
        else
            return '';
    }

    function CrearBotonesCola(id, idestadocola, estado, infoTarea) {
        var datos = infoTarea.split("|");
        if (idestadocola != "" && idestadocola != "0") {
            var color = '';
            if (idestadocola == 1) {
                color = 'Ambar';
            }
            else if (idestadocola == 2) {
                color = 'Azul';
            }
            else if (idestadocola == 3) {
                color = 'Verde';
            }
            else if (idestadocola == 4) {
                color = 'Rojo';
            }
            return '<img src="../Common/Images/Semaforos/' + color + '_16x16.png" id="' + id + '" class="imgBtn vercola" style="cursor: pointer !important;" title="' + estado + '\n' + datos[1] + '"/>';
        }
        else {
            return ''
        };
    }

    $(".ConImg").live("click", function () {
        var id = $(this).attr("id").substr(8);

        var datos = $("#grid").jqGrid('getRowData', id);
        //$('#ifNota').attr("src", "Adm_SolicitudNota.aspx?IdSolicitud=" + id + "&IdEstApr=" + datos.F_inEstSol_Apr + "&IdEstPro=" + datos.F_inEstSol);
        $('#ifNota').attr("src", "Adm_SolicitudNota.aspx?IdSolicitud=" + id);
        formulario = $('#dvNota').dialog({
            title: "Notas de la Solicitud: " + datos.codigo + " - Empresa: '" + datos.NombreEmpresa + "'",
            height: 520,
            width: 703,
            modal: true
        });

        $("#imgNueNot_" + id).hide();
    });


    $(".vercola").live("click", function () {
        //var id = $(this).attr("id").substr(8);
        var id = $(this).attr("id");
        var datos = $("#grid").jqGrid('getRowData', id);


        $("#ifCola").css({ height: 380 });
        $("#ifCola").css({ width: 480 });
        $('#ifCola').attr("src", "SolicitudColasDetalle.aspx?IdCola=" + datos.IdColaAprovisionamiento);
        formulario = $('#dvCola').dialog({
            title: "Detalle de Cola de la solicitud: " + datos.codigo,
            height: 400,
            width: 500,
            modal: true,
            resizable: false
        });

        $("#imgNueNot_" + id).hide();
    });

    vcVista = "PorAsignar";
    var tbSolicitudes = $("#grid").jqGrid({
        sortable: true,
        datatype: "local",
        datatype: function () {
            var dtInicio = new Date();
            $.ajax({
                url: "Adm_ListadoSolicitudes.aspx/Listar", //PageMethod
                data: "{'vcTodos':'" + vcTodos + "'," +
                      "'inPagTam':'" + $('#grid').getGridParam("rowNum") + "'," +
                      "'inPagAct':'" + parseInt($('#grid').getGridParam("page")) + "'," +
                      "'vcOrdCol':'" + $('#grid').getGridParam("sortname") + "'," + //Nombre de columna ordenado
                      "'vcTipOrdCol':'" + $('#grid').getGridParam("sortorder") + "'," + //Tipo de orden de columna asc, desc
                      "'strTipos': '" + vcTipos + "'," +
                      "'intFiltro': '" + inFiltro + "'," +
                      "'strFiltro':'" + vcFiltro + "'," +
                      "'strFiltro2':'" + vcFiltro2 + "'," +
                      "'inTipFil':'" + $("#ddlTipo").val() + "'," +
                      "'biSolNoVis':'" + $("#chkSolNoVista").is(":checked") + "'," +
                      "'vcVista':'" + vcVista + "'," +
                      "'strRangFechaIni':'" + vcRangoFechaIni + "'," +
                      "'strRangFechaFin':'" + vcRangoFechaFin + "'," +
                      "'inCodTip':'0'," +
                      "'vcResAre':'" + $("#hdfResApr").val() + "'}",
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
                id: "IdSolicitud"
            },
        colModel: [{ name: 'IdSolicitud', index: 'IdSolicitud', label: 'IdSolicitud', hidden: true, key: true },
						{ name: 'IdSolicitudNotaVisto', index: 'IdSolicitudNotaVisto', label: 'Acciones', hidden: false, width: 60, align: 'left', resizable: false,
						    formatter: function (value, options, rData) {
						        //return GenerarBotones(rData[0], rData[1]);
						        return GenerarBotones(rData[0], rData[1]);
						    }
						},
						{ name: 'Q15', index: 'Q15', label: 'Q15', width: '30px', align: 'center',
						    formatter: function (value, options, rData) {
						        //                            jbalmaceda 20160718 100500 --> add title=""
						        if (rData[2] == '1') {
						            return '<input title="" type="checkbox" id="chkq15_"' + rData[0] + '" disabled="true" checked />';
						        }
						        else {
						            return '<input title="" type="checkbox" id="chkq15_"' + rData[0] + '" disabled="true" />';
						        }
						    },
						    cellattr: function () {
						        return 'title=""';
						    }
						},
						{ name: 'Organizacion', index: 'Organizacion', label: 'Organizacion', width: '70px', align: 'center',
						    formatter: function (value, options, rData) {
						        if (rData[3] == '1') {
						            return '<input title="" type="checkbox" id="chkOrganizacion_"' + rData[0] + '" disabled="true" checked />';
						        }
						        else {
						            return '<input title="" type="checkbox" id="chkOrganizacion_"' + rData[0] + ' " disabled="true" />';
						        }
						    },
						    cellattr: function () {
						        return 'title=""';
						    }
						},
						{ name: 'codigo', index: 'codigo', label: 'Código', hidden: false, width: 85, align: 'center' },
						{ name: 'FechaRegistro', index: 'FechaRegistro', label: 'Fecha', hidden: false, width: 65, align: 'center' },

						{ name: 'NombrePais', index: 'NombrePais', label: 'Pais', hidden: false, width: 70, align: 'center' },
						{ name: 'NombreEmpresa', index: 'NombreEmpresa', label: 'Empresa', hidden: false, width: 150 },
						{ name: 'RUC', index: 'RUC', label: 'RUC', hidden: false, width: 70, align: 'center' },
						{ name: 'NombreLicencia', index: 'NombreLicencia', label: 'Suscripción', hidden: false, width: 70, align: 'center' },
						{ name: 'Lineas', index: 'Lineas', label: 'Líneas', hidden: false, width: 50, align: 'center',
						    formatter: 'number', formatoptions: { decimalSeparator: oCultura.vcSimDec, thousandsSeparator: oCultura.vcSimSepMil, decimalPlaces: 0, defaultValue: '0' }
						},
						{ name: 'FechaInicioContrato', index: 'FechaInicioContrato', label: 'Inicio Contrato', hidden: false, width: 80, align: 'center' },
						{ name: 'FechaFinContrato', index: 'FechaFinContrato', label: 'Fin Contrato', hidden: false, width: 75, align: 'center' },
						{ name: 'TipoSolicitud', index: 'TipoSolicitud', label: 'Tipo Suscripción', hidden: false, width: 95, align: 'center' },
						{ name: 'Estado', index: 'Estado', label: 'Estado Proceso', hidden: false, width: 90, align: 'center' },
						{ name: 'TecnicoAsignado', index: 'TecnicoAsignado', label: 'Técnico Asignado', hidden: false, width: 100, align: 'center' },
						{ name: 'UsuarioRegistro', index: 'UsuarioRegistro', label: 'Usuario Creador', hidden: false, width: 100, align: 'center' },
						{ name: 'Operador', index: 'Operador', label: 'Operador', hidden: true, width: 160 },
						{ name: 'IdTipoSolicitud', index: 'IdTipoSolicitud', label: 'IdTipoSolicitud', hidden: true },
						{ name: 'IdSolicitudEstado', index: 'IdSolicitudEstado', label: 'IdSolicitudEstado', hidden: true },
						{ name: 'IdTecnicoAsignado', index: 'IdTecnicoAsignado', label: 'IdTecnicoAsignado', hidden: true, width: 160 },
						{ name: 'IdUsuarioRegistro', index: 'IdUsuarioRegistro', label: 'IdUsuarioRegistro', hidden: true, width: 60 },
						{ name: 'IdOperador', index: 'IdOperador', label: 'IdOperador', hidden: true, width: 60 },
						{ name: 'IdColaEstado', index: 'IdColaEstado', label: 'IdColaEstado', hidden: true, width: 100 },
						{ name: 'EstadoCola', index: 'EstadoCola', label: 'Cola', hidden: false, width: 30, align: "center",
						    formatter: function (value, options, rData) {
						        //console.log(rData[31]);
						        //return CrearBotonesCola(rData[0], rData[21], rData[22], rData[31]);
						        return CrearBotonesCola(rData[0], rData[23], rData[24], rData[33]);
						    }
						},
						{ name: 'IdColaAprovisionamiento', index: 'IdColaAprovisionamiento', label: 'IdColaAprovisionamiento', hidden: true, width: 110 },

						{ name: 'ObservacionContrato', index: 'ObservacionContrato', label: 'ObservacionContrato', hidden: true, width: 110 },
						{ name: 'DescripcionContrato', index: 'DescripcionContrato', label: 'DescripcionContrato', hidden: true, width: 110 },
						{ name: 'RazonSocial', index: 'RazonSocial', label: 'RazonSocial', hidden: true, width: 160 },
						{ name: 'IdTipoLicencia', index: 'IdTipoLicencia', label: 'IdTipoLicencia', hidden: true, width: 160 },
						{ name: 'IdPais', index: 'IdPais', label: 'IdPais', hidden: true, width: 160 },
						{ name: 'MaximoUsuario', index: 'MaximoUsuario', label: 'MaximoUsuario', hidden: true, width: 160 },
						{ name: 'PERIODO_MESES', index: 'PERIODO_MESES', label: 'PERIODO_MESES', hidden: true, width: 160 },

						{ name: 'InfoTarea', index: 'InfoTarea', label: 'InfoTarea', hidden: true, width: 330,
						    formatter: function (value, options, rData) {
						        //return rData[31];
						        return rData[33];
						        //return rData[31] + " - " + rData[0] + "," + rData[21] + "," + rData[22];
						    }
						},
						{ name: 'Dominio', index: 'Dominio', label: 'Dominio', hidden: true, width: 160,
						    formatter: function (value, options, rData) {
						        //return rData[31];
						        return rData[34];
						        //return rData[31] + " - " + rData[0] + "," + rData[21] + "," + rData[22];
						    }
						},
						{ name: 'IdDominio', index: 'IdDominio', label: 'IdDominio', hidden: true, width: 160,
						    formatter: function (value, options, rData) {
						        //return rData[31];
						        return rData[35];
						        //return rData[31] + " - " + rData[0] + "," + rData[21] + "," + rData[22];
						    }
						}

						, { name: 'IdUsuarioOperadorEncargado', index: 'IdUsuarioOperadorEncargado', label: 'IdUsuarioOperadorEncargado', hidden: true, width: 60 }
						, { name: 'NombreUsuarioOperadorEncargado', index: 'NombreUsuarioOperadorEncargado', label: 'NombreUsuarioOperadorEncargado', hidden: true, width: 60 }
						, { name: 'IdOperadorMovil', index: 'IdOperadorMovil', label: 'IdOperadorMovil', hidden: true, width: 60 }
					  ],
        loadComplete: function () {
            //alert(id);
            //alert('hola');
            //if ()
        },
        viewrecords: true,
        pager: "#pager", //Pager.
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        rowNum: inFilas, //$("#hdfTamPag").val(), //"10" PageSize.
        rowList: ArrayPaginacion, //[10, 20, 30],  //TamanosPaginaSel, //Variable PageSize DropDownList. 
        sortname: "codigo", //sortname: idTabla, //Default SortColumn
        sortorder: "desc", //Default SortOrder.
        rownumbers: true,
        shrinkToFit: false,
        multiselect: true,
        ondblClickRow: function (id) {
            var datos = $("#grid").jqGrid('getRowData', id);
            if (datos.IdSolicitudEstado == 1) { //Pendiente
                fnEditarSolicitud(id)
            } else {
                if ($("#btnEditar").button("option", "disabled") == false)
                    EditarRegistro(id);
                else if ($("#btnVerDetalle").button("option", "disabled") == false)
                    EditarRegistro(id);
                else if ($("#btnProcesar").button("option", "disabled") == false)
                    EditarRegistro(id);
            }
        },
        beforeSelectRow: function (id, e) {

            var vcSel = $("#grid").jqGrid('getGridParam', 'selarrrow');
            var vcInfoTarSol = $("#grid").jqGrid('getRowData', id).InfoTarea;
            //console.log($("#grid").jqGrid('getRowData', vcSel[0]).InfoTarea);

            //if ($('#rbtPorAprobar').is(':checked') || $('#rbtPorAsignar').is(':checked') || $('#rbtEnProceso').is(':checked')) { //Comentado jcamacho 123
            if ($('#rbtPorAprobar').is(':checked') || $('#rbtEnProceso').is(':checked')) { //Modificado por Manuel 04/04/2016
                //MultiSelect = true;
                MultiSeleccion = "1";
                return true;
                if ($('#rbtPorAprobar').is(':checked')) {
                    //MultiSeleccion = "1";
                    //return true;
                }
                else {
                    if ($('#rbtEnProceso').is(':checked') && vcInfoTarSol == "||") {
                        //MultiSeleccion = "1";
                        //return true;
                    }
                    else {
                        //$(this).find('#' + id + ' input[type=checkbox]').prop('checked', false);
                        //MultiSeleccion = "0";
                        //return false;
                    }
                }

            } else {
                //MultiSelect = false;
                if (vcSel.length == 1 && MultiSeleccion != "1") {
                    if (vcSel[0] == id)
                        return true; //Deselecciona la fila
                    else {
                        $("#grid").jqGrid('resetSelection');
                        return true; //Selecciona más de una fila = false
                    }
                } else if (vcSel.length > 0 & MultiSeleccion == "1") {
                    return true; //permite seleccionar mas de una fila = true
                }
                else if (vcSel.length == 0) {
                    return true; //Selecciona una fila = true
                }
            }

        },
        onSelectRow: function (id) {
            var datos = $("#grid").jqGrid('getRowData', id);
            //alert(id);


            $("#btnEnviarCorreoCliente").hide();

            NombreClienteSeleccionado = datos.NombreEmpresa;
            //alert(NombreClienteSeleccionado);

            IdSolicitudSeleccionado = datos.IdSolicitud;


            if ($('#rbtGeneral').is(':checked')) {
                if (datos.IdSolicitudEstado == 3) {
                    //CULMINADO..

                    //alert(datos.IdSolicitudEstado);
                    //alert('Ingrese');
                    $("#btnEnviarCorreoCliente").show();
                    //$("#btnEnviarCorreoCliente").button("option", "disabled", false);
                }

                //if (datos.F_inEstSol_Apr == 32) { //comentado jcamacho123
                if (datos.IdSolicitudEstado == 1) { //Pendiente
                    //Verificar permiso para EDITAR
                    var vcEdi = "1"; //valor anterior 1 jcamacho123

                    //for (var i = 0; i < vcGruTipSolEdi.length; i++) {
                    //    if (vcGruTipSolEdi[i] == datos.inTipSol)
                    //        vcEdi = "1";
                    //}

                    if (vcEdi == "0") {
                        $("#btnEditar").button("option", "disabled", true);
                        $("#btnVerDetalle").button("option", "disabled", false);
                    }
                    else {
                        $("#btnEditar").button("option", "disabled", false);
                        $("#btnVerDetalle").button("option", "disabled", true);
                    }

                    //Verificar permiso para ELIMINAR
                    var vcEli = "1";
                    //for (var i = 0; i < vcGruTipSolEli.length; i++) {
                    //    if (vcGruTipSolEli[i] == datos.inTipSol)
                    //        vcEli = "1";
                    //}
                    if (vcEli == "0" && $("#hdfAdmin").val() == "1")
                    { $("#btnEliminar").button("option", "disabled", true); }
                    else
                    { $("#btnEliminar").button("option", "disabled", false); }


                    var vcEnviar = "1";

                    if (vcEnviar == "0")
                    { $("#btnEnviar").button("option", "disabled", true); }
                    else
                    { $("#btnEnviar").button("option", "disabled", false); }


                }
                else if ($("#hdfAdmin").val() == "1" && datos.IdSolicitudEstado == 5) {
                    $("#btnEditar").button("option", "disabled", false);
                    $("#btnEnviar").button("option", "disabled", true);
                    $("#btnVerDetalle").button("option", "disabled", false);
                    $("#btnEliminar").button("option", "disabled", false);
                }
                else {
                    $("#btnEditar").button("option", "disabled", true);
                    $("#btnEnviar").button("option", "disabled", true);
                    $("#btnVerDetalle").button("option", "disabled", false);
                    $("#btnEliminar").button("option", "disabled", true);
                }

                if (datos.F_inEstSol_Apr == 34 && datos.F_inEstSol == 7 && datos.vcAutDesPDF != "") {
                    $("#btnAutDesPDF").button("option", "disabled", false);
                } else {
                    $("#btnAutDesPDF").button("option", "disabled", true);
                }

                var vcSel = $("#grid").jqGrid('getGridParam', 'selarrrow');
                if (vcSel.length == 1) {
                    MostrarOcultar_ActualizarEstado(datos);
                }

            } else if ($('#rbtPorAprobar').is(':checked')) {
                var vcSel = $("#grid").jqGrid('getGridParam', 'selarrrow');
                if (vcSel.length > 1 || vcSel.length == 0) {
                    $("#btnVerDetalle").button("option", "disabled", true);
                } else {
                    $("#btnVerDetalle").button("option", "disabled", false);
                }
                MostrarOcultar_ActualizarEstado(datos);
            } else if ($('#rbtPorAsignar').is(':checked')) {
                var vcSel = $("#grid").jqGrid('getGridParam', 'selarrrow');
                if (vcSel.length > 1 || vcSel.length == 0) {
                    $("#btnVerDetalle").button("option", "disabled", true);
                } else {
                    $("#btnVerDetalle").button("option", "disabled", false);
                }
            } else if ($('#rbtEnProceso').is(':checked')) {

                var vcSel = $("#grid").jqGrid('getGridParam', 'selarrrow');

                //MostrarOcultar_ActualizarEstado(datos);

                //==========================================================================================
                //Agregado por: Manuel Jesus Tenorio Silva 
                var FilaSeleccionada = $("#jqg_grid_" + IdSolicitudSeleccionado).is(":checked");
                var DeshabilitarBotonProcesar = false;

                if (vcSel.length == 0) {
                    cont_cola_activas = 0;
                    DeshabilitarBotonProcesar = true;
                }
                else if (vcSel.length > 0) {

                    if (datos.EstadoCola != "") {
                        cont_cola_activas = FilaSeleccionada ? cont_cola_activas + 1 : cont_cola_activas - 1;
                    }
                    DeshabilitarBotonProcesar = (cont_cola_activas == 1 && vcSel.length == 1) ? true : false;
                }
                if ($("#hdfAdmin").val() == "1") {
                    DeshabilitarBotonProcesar = true;
                }
                $("#btnProcesar").button("option", "disabled", DeshabilitarBotonProcesar);
                //==========================================================================================

                //MostrarOcultar_ActualizarEstado(datos);
            }

            else if ($('#rbtCulminada').is(':checked')) {

                var vcSel = $("#grid").jqGrid('getGridParam', 'selarrrow');

                if (datos.IdSolicitudEstado == 6) {
                    $("#btnImportar").hide();
                    $("#btnMonitorTarea").hide();
                }
                else {
                    $("#btnImportar").show();
                    $("#btnMonitorTarea").show();
                }

                var vcSel = $("#grid").jqGrid('getGridParam', 'selarrrow');
                if (vcSel.length == 1) {
                    MostrarOcultar_ActualizarEstado(datos);
                    $("#btnVerDetalle").button("option", "disabled", false);
                }
                else {
                    $("#btnVerActualizarEstado").hide();
                    $("#Span3").hide();
                    $("#btnVerDetalle").button("option", "disabled", true);
                }
            }
        },
        sortable: function (permutation) {
            //var colModels = $("#grid").getGridParam("colModel");
            //alert(colModels);
        },
        afterInsertRow: function (rowid, aData, rowelem) {
            if (aData.btVig == 'False') {
                var colModels = $("#tblPoliticaSolicitudxGrupo").getGridParam("colModel");
                for (var i in colModels) {
                    $("#tblPoliticaSolicitudxGrupo").jqGrid('setCell', rowid, i, '', { color: 'red' });
                }
            }
        }
        //        ,subGrid: true,
        //        subGridOptions: {
        //            "reloadOnExpand": false,
        //            "selectOnExpand": false
        //        },
        //        subGridRowExpanded: function (subgrid_id, row_id) {
        //            var subgrid_table_id, pager_id;
        //            subgrid_table_id = subgrid_id + "_t";
        //            pager_id = "p_" + subgrid_table_id;
        //            $("#" + subgrid_id).html("<table id='" + subgrid_table_id + "' class='scroll'></table><div id='" + pager_id + "' class='scroll'></div>");
        //            $("#" + subgrid_table_id).jqGrid({
        //                datatype: function () {
        //                    $.ajax({
        //                        url: "Adm_ListadoSolicitudes.aspx/ObtenerSeguimiento", //PageMethod
        //                        data: "{'inCodSol': '" + row_id + "'}",
        //                        dataType: "json",
        //                        type: "post",
        //                        contentType: "application/json; charset=utf-8",
        //                        success: function (result) {
        //                            $("#" + subgrid_table_id).jqGrid('clearGridData');
        //                            for (var i = 0; i < $(result.d).length; i++) {
        //                                $("#" + subgrid_table_id).jqGrid('addRowData', i, result.d[i]);
        //                            }

        //                            if ($.browser.chrome) {
        //                                $('#gbox_' + subgrid_table_id).css("width", "795px"); //ui-jqgrid-bdiv
        //                                $('div.ui-jqgrid-bdiv', 'div#gview_' + subgrid_table_id).each(function (i) {
        //                                    $(this).css({ "width": "795px" });
        //                                });
        //                                $('div.ui-jqgrid-hdiv', 'div#gview_' + subgrid_table_id).each(function (i) {
        //                                    $(this).css({ "width": "795px" });
        //                                });
        //                            }
        //                        },
        //                        error: function (xhr, err, thrErr) {
        //                            MostrarErrorAjax(xhr, err, thrErr);
        //                        }
        //                    });
        //                },
        //                colModel: [{ name: 'IdSolicitudSeguimiento', index: 'IdSolicitudSeguimiento', label: 'IdSolicitudSeguimiento', key: true, hidden: true },
        //                        { name: 'Fecha', index: 'Fecha', label: 'Fecha', width: '70', align: 'left', sortable: false, resizable: false, },
        //   		                { name: 'P_inCodSol', index: 'P_inCodSol', label: 'P_inCodSol', width: '70', align: 'left', sortable: false, resizable: false, hidden: true },
        //   		                { name: 'IdUsuario', index: 'IdUsuario', label: 'IdUsuario', width: '100', align: 'left', sortable: false, resizable: false, hidden: true },
        //                        { name: 'EstadoInicial', index: 'EstadoInicial', label: 'EstadoInicial', width: '100', align: 'left', sortable: false, resizable: false, hidden: true },
        //                        { name: 'EstadoFinal', index: 'EstadoFinal', label: 'EstadoFinal', width: '100', align: 'left', sortable: false, resizable: false, hidden: true },
        //   		                { name: 'vcEstadoInicial', index: 'vcEstadoInicial', label: 'Estado Inicial', width: '90', align: 'left', sortable: false, resizable: false },
        //   		                { name: 'vcEstadoFinal', index: 'vcEstadoFinal', label: 'Estado Final', width: '90', align: 'left', sortable: false, resizable: false },
        //   		                { name: 'NomUsuario', index: 'NomUsuario', label: 'Usuario', width: '70', align: 'left', sortable: false, resizable: false, hidden: false },
        //                        { name: 'Comentarios', index: 'Comentarios', label: 'Comentarios', width: '140', align: 'left', sortable: false, resizable: false }
        //   	                    ],
        //                sortorder: "asc",
        //                width: "800",
        //                height: "auto",
        //                beforeSelectRow: function (rowId, e) {
        //                    return false;
        //                }
        //            });
        //        },
        //        subGridRowColapsed: function (subgrid_id, row_id) {
        //        }
    }).navGrid("#pager", { edit: false, add: false, search: false, del: false });

    if ($('#rbtPorAprobar').is(':checked')) {
        fnVistaPorAprobar(true);
        $("#divRangoFecha").hide();
    }
    else if ($('#rbtPorAsignar').is(':checked')) {
        fnVistaPorAsignar(true);
        $("#divRangoFecha").hide();
    }

    //geig
    if (window.parent.miTipoAlerta == 1) {
        window.parent.miTipoAlerta = 0;

        switch (window.parent.miSubtipoAlerta) {
            case 1:
                $("#hdfBusquedaIni").val("7");
                $("#divRangoFecha").hide();
                fnVistaGeneral(true);
                ActualizarGrilla();
                break;
            case 2:
                $('#rbtPorAprobar').attr('checked', 'checked');
                $("#divRangoFecha").hide();
                fnVistaPorAprobar(true);
                ActualizarGrilla();
                break;
            case 3:
                $('#rbtEnProceso').attr('checked', 'checked');
                $("#divRangoFecha").hide();
                fnVistaEnProceso();
                ActualizarGrilla();
                break;
            default:
                break;
        }
    }
    else {

        if ($('#trPorAsignar').css('display') != "none") {
            $('#rbtPorAsignar').attr('checked', 'checked');
            $("#divRangoFecha").hide();
            fnVistaPorAsignar(true);
            ActualizarGrilla();
        }
        else {
            //fnVistaGeneral(true);
            $('#rbtPendiente').attr('checked', 'checked');
            $("#divRangoFecha").show();
            fnVistaPendiente(true);
            fnCargarFiltroTipoSolicitud();
        }
    }

    inicioPagina();
    function inicioPagina() {
        DimPosElementos();
    }

    $(window).resize(function () {
        DimPosElementos();
        NumeroInicialFilas();
    });

    function DimPosElementos() {

        var AltoExtra = 25;

        if ($('#rbtPorAsignar').is(':checked') == true || $('#rbtEnProceso').is(':checked') == true) {
            AltoExtra = 15;
            //alert('cambiar tamanio aca');
        }

        var Ancho = $(window).width();
        var Alto = $(window).height();
        var AnchoLateral = $(".LateralSplitter");

        //var x = $('#tbGeneral').width();
        //var y = $(window).width() - 31;

        $(".tabs").css({ height: Alto - 30, width: Ancho - AnchoLateral, marginbotton: 0, paddingbotton: 0 });

        $(".Splitter").css({ height: Alto - 18 });
        //inAltGrid = $(window).height() - 198 - MargenFiltro * MargenHeight;
        inAltGrid = $(window).height() - 237 - AltoExtra - MargenFiltro * MargenHeight;

        //$("#grid").setGridWidth($(window).width() - 31);
        //$("#grid").setGridWidth($('#tbGeneral').width());
        $("#grid").setGridWidth($("#TabDetalle").width() - 13);

        //alert(inAltGrid + "-" + $('#tbGeneral').width());

        $("#grid").setGridHeight(inAltGrid);
    }

    function fnVistaPendiente(blQuitarFiltros) {
        $("#lblVista").html("Mis Pendientes");

        try {
            $("#grid").hideCol("cb");
            $("#grid").hideCol("EMPL_P_vcCODEMP");
            $("#grid").hideCol("EMPL_vcNOMEMP");
            $("#grid").hideCol("opUmbral");
            $("#grid").hideCol("inDiaTra");

            $("#grid").showCol("vcUsuTec");
            //            $("#grid").showcol("vcNomEstApr");
            //            $("#grid").showcol("vcNomEst");

        }
        catch (err) {
            //some err
        }

        if (blQuitarFiltros == false) {
            $("#grid").jqGrid('resetSelection');
        }

        $("#btnAprobar").hide();
        $("#btnRechazar").hide();
        $("#btnAsignar").hide();
        $("#lblAsignarme").hide();
        $("#btnAsignarA").hide();
        $("#btnReasignarA").hide();
        $("#btnEditar").show();
        $("#btnProcesar").hide();
        $("#btnVerDetalle").hide();
        $("#btnAutDesPDF").hide();
        $("#btnEliminar").show();
        vcVista = "Pendiente";
        vcTipos = $("#hdfGruTipSol").val();

        if ($("#hdfBusquedaIni").val() == "")
            $("#ddlFiltro option[value='7']").remove();

        if (blQuitarFiltros == false) {
            fnQuitarFiltroEstados();
            fnAgregarFiltroEstados();
        }
        //        if ($("#hdfAdmin").val() == "0" && $("#hdfTecnico").val() == "0" && $("#hdfResApr").val() == "0") {
        //            $("#grid").hideCol("EMPL_P_vcCODEMP");
        //            $("#grid").hideCol("EMPL_vcNOMEMP");
        //        }
    }
    function fnVistaPorAprobar(blQuitarFiltros) {
        $("#lblVista").html("Por Aprobar");

        try {
            $("#grid").showCol("cb");
            $("#grid").hideCol("vcUsuTec");
            $("#grid").showCol("opUmbral");
            $("#grid").showCol("inDiaTra");
            $("#grid").showCol("EMPL_P_vcCODEMP");
            $("#grid").showCol("EMPL_vcNOMEMP");
        }
        catch (err) {
            //some err
        }

        if (blQuitarFiltros == false) {
            $("#grid").jqGrid('resetSelection');
        }
        $("#btnAprobar").show();
        $("#btnRechazar").show();
        $("#btnAsignar").hide();
        $("#lblAsignarme").hide();
        $("#btnAsignarA").hide();
        $("#btnReasignarA").hide();
        $("#btnEditar").hide();
        $("#btnProcesar").hide();
        $("#btnVerDetalle").show();
        $("#btnVerDetalle").button("option", "disabled", true);
        $("#btnAutDesPDF").hide();
        $("#btnEliminar").hide();
        vcVista = "PorAprobar";
        vcTipos = $("#hdfResAprTipSol").val();
        if (blQuitarFiltros == false) {
            fnQuitarFiltroEstados();
        } else {
            try {
                $("#grid").hideCol("vcNomEstApr");
                $("#grid").hideCol("vcNomEst");
            }
            catch (err) {
                //some err
            }
        }
    }
    function fnVistaAprobada() {
        $("#lblVista").html("Aprobadas");
        $("#grid").hideCol("cb");
        $("#grid").showCol("vcUsuTec");
        $("#grid").hideCol("opUmbral");
        $("#grid").hideCol("inDiaTra");
        $("#grid").jqGrid('resetSelection');
        $("#btnAprobar").hide();
        $("#btnRechazar").hide();
        $("#btnAsignar").hide();
        $("#lblAsignarme").hide();
        $("#btnAsignarA").hide();
        $("#btnReasignarA").hide();
        $("#btnEditar").hide();
        $("#btnProcesar").hide();
        $("#btnVerDetalle").show();
        $("#btnVerDetalle").button("option", "disabled", false);
        $("#btnAutDesPDF").hide();
        $("#btnEliminar").hide();
        vcVista = "Aprobada";
        vcTipos = $("#hdfResAprTipSol").val();

        $("#ddlFiltro option[value='7']").remove();
        fnQuitarFiltroEstados();
        fnAgregarFiltroEstadoProceso();
    }
    function fnVistaRechazada() {
        $("#lblVista").html("Rechazadas");
        $("#grid").hideCol("cb");
        $("#grid").hideCol("vcUsuTec");
        $("#grid").hideCol("opUmbral");
        $("#grid").hideCol("inDiaTra");
        $("#grid").jqGrid('resetSelection');
        $("#btnAprobar").hide();
        $("#btnRechazar").hide();
        $("#btnAsignar").hide();
        $("#lblAsignarme").hide();
        $("#btnAsignarA").hide();
        $("#btnReasignarA").hide();
        $("#btnEditar").hide();
        $("#btnProcesar").hide();
        $("#btnVerDetalle").show();
        $("#btnAutDesPDF").hide();
        $("#btnVerDetalle").button("option", "disabled", false);
        $("#btnEliminar").hide();
        vcVista = "Rechazada";
        vcTipos = $("#hdfResAprTipSol").val();

        fnQuitarFiltroEstados();
    }
    function fnVistaPorAsignar(blQuitarFiltros) {
        $("#lblVista").html("Por Asignar");
        $('#grid').jqGrid('setGridParam', { page: '1' });
        try {
            $("#grid").showCol("cb");
            $("#grid").hideCol("vcUsuTec");
            $("#grid").showCol("opUmbral");
            $("#grid").showCol("inDiaTra");
            $("#grid").showCol("EMPL_P_vcCODEMP");
            $("#grid").showCol("EMPL_vcNOMEMP");
            MultiSeleccion = "1";
        }
        catch (err) {
            //some err
        }

        if (blQuitarFiltros == false) {
            $("#grid").jqGrid('resetSelection');
        }
        $("#tblSubirArchivo").hide();
        $("#btnSubir").hide();
        $("#btnAprobar").hide();
        $("#btnRechazar").hide();
        $("#btnAsignar").show();
        $("#lblAsignarme").show();
        $("#btnAsignarA").show();
        $("#btnReasignarA").hide();
        $("#btnAsignarA").button("option", "disabled", true);
        $("#btnEditar").hide();
        $("#btnEnviar").hide();
        $("#btnProcesar").hide();
        $("#btnVerDetalle").show();
        $("#btnVerDetalle").button("option", "disabled", true);
        $("#btnAutDesPDF").hide();
        $("#btnEliminar").hide();
        vcVista = "PorAsignar";
        vcTipos = $("#hdfUsuTipSolCre").val();
        if (blQuitarFiltros == false) {
            fnQuitarFiltroEstados();
        } else {
            try {
                $("#grid").hideCol("vcNomEstApr");
                $("#grid").hideCol("vcNomEst");
            }
            catch (err) {
                //some err
            }
        }
        if (hdfTecResSol = "") {
            $("#btnAsignarA").button("option", "disabled", true);
        } else {
            $("#btnAsignarA").button("option", "disabled", false);
        }
    }
    function fnVistaEnProceso() {
        $("#lblVista").html("En Proceso");
        $('#grid').jqGrid('setGridParam', { page: '1' });
        try {
            //            $("#grid").hideCol("cb");
            //$("#grid").showCol("cb");
            $("#grid").showCol("cb"); //Agregado por Manuel 09/03/2016
            $("#grid").showCol("vcUsuTec");
            $("#grid").showCol("opUmbral");
            $("#grid").showCol("inDiaTra");
            $("#grid").showCol("EMPL_P_vcCODEMP");
            $("#grid").showCol("EMPL_vcNOMEMP");
            $("#grid").jqGrid('resetSelection');
        }
        catch (err) {
            //some err
        }
        $("#tblSubirArchivo").hide();
        $("#btnSubir").hide();
        $("#btnAprobar").hide();
        $("#btnRechazar").hide();
        $("#btnAsignar").hide();
        $("#lblAsignarme").hide();
        $("#btnAsignarA").hide();
        $("#btnReasignarA").show();
        $("#btnReasignarA").button("option", "disabled", true);
        $("#btnEditar").hide();
        $("#btnEnviar").hide();
        $("#btnProcesar").show();
        $("#btnProcesar").button("option", "disabled", true);
        $("#btnVerDetalle").hide();
        $("#btnEliminar").hide();
        $("#btnAutDesPDF").hide();
        vcVista = "EnProceso";
        vcTipos = $("#hdfUsuTipSolEdi").val();

        fnQuitarFiltroEstados();

        if (hdfTecResSol = "") {
            $("#btnReasignarA").button("option", "disabled", true);
        } else {
            $("#btnReasignarA").button("option", "disabled", false);
        }
    }
    function fnVistaCulminada() {
        $("#lblVista").html("Culminadas");
        $("#grid").hideCol("cb");
        $("#grid").showCol("vcUsuTec");
        $("#grid").hideCol("opUmbral");
        $("#grid").hideCol("inDiaTra");
        $("#grid").jqGrid('resetSelection');
        $("#btnAprobar").hide();
        $("#btnRechazar").hide();
        $("#btnAsignar").hide();
        $("#lblAsignarme").hide();
        $("#btnAsignarA").hide();
        $("#btnReasignarA").hide();
        $("#btnEditar").hide();
        $("#btnEnviar").hide();
        $("#btnProcesar").hide();
        $("#btnVerDetalle").show();
        $("#btnVerDetalle").button("option", "disabled", false);
        $("#btnEliminar").hide();
        $("#btnAutDesPDF").hide();
        vcVista = "Culminada";
        vcTipos = $("#hdfUsuTipSol").val();

        fnQuitarFiltroEstados();
    }
    function fnVistaAnulada() {
        $("#lblVista").html("Anuladas");
        $("#grid").hideCol("cb");
        $("#grid").showCol("vcUsuTec");
        $("#grid").hideCol("opUmbral");
        $("#grid").hideCol("inDiaTra");
        $("#grid").jqGrid('resetSelection');
        $("#btnAprobar").hide();
        $("#btnRechazar").hide();
        $("#btnAsignar").hide();
        $("#lblAsignarme").hide();
        $("#btnAsignarA").hide();
        $("#btnReasignarA").hide();
        $("#btnEditar").hide();
        $("#btnEnviar").hide();
        $("#btnProcesar").hide();
        $("#btnVerDetalle").show();
        $("#btnVerDetalle").button("option", "disabled", false);
        $("#btnEliminar").hide();
        $("#btnAutDesPDF").hide();
        vcVista = "Anulada";
        vcTipos = $("#hdfUsuTipSol").val();

        fnQuitarFiltroEstados();
    }
    function ServidorInstancia(ServidorId, ServidorNombre, ServidorDD, ServidorEU, InstanciaId, InstanciaNombre, InstanciaId_APP, InstanciaNombre_APP) {
        this.ServidorId = ServidorId;
        this.ServidorNombre = ServidorNombre;
        this.ServidorDD = ServidorDD;
        this.ServidorEU = ServidorEU;
        this.InstanciaId = InstanciaId;
        this.InstanciaNombre = InstanciaNombre;
        this.InstanciaId_APP = InstanciaId_APP;
        this.InstanciaNombre_APP = InstanciaNombre_APP;
    }
    function AsignarRangoFechas() {
        var dtmDayRangoFechaFin = new Date();
        var dtmDayRangoFechaIni = new Date();
        dtmDayRangoFechaIni = new Date(dtmDayRangoFechaFin.getTime() - (30 * 24 * 3600 * 1000));
        dtmDayRangoFechaFin = (("0" + dtmDayRangoFechaFin.getDate()).slice(-2)) + "/" + (("0" + (dtmDayRangoFechaFin.getMonth() + 1)).slice(-2)) + "/" + dtmDayRangoFechaFin.getFullYear();
        dtmDayRangoFechaIni = (("0" + dtmDayRangoFechaIni.getDate()).slice(-2)) + "/" + (("0" + (dtmDayRangoFechaIni.getMonth() + 1)).slice(-2)) + "/" + dtmDayRangoFechaIni.getFullYear();
        $("#txtRangoFechaIni").val(dtmDayRangoFechaIni);
        $("#txtRangoFechaFin").val(dtmDayRangoFechaFin);
        if ($('#rbtGeneral').is(':checked')) {
            var RangFecIni = $("#txtRangoFechaIni").val();
            var RangFecFin = $("#txtRangoFechaFin").val();
            vcRangoFechaIni = "";
            if (RangFecIni != "")
                vcRangoFechaIni = RangFecIni.substr(6, 4).toString() + RangFecIni.substr(3, 2).toString() + RangFecIni.substr(0, 2).toString() + " 00:00:00";
            else
                vcRangoFechaFin = "";
            if (RangFecFin != "")
                vcRangoFechaFin = RangFecFin.substr(6, 4).toString() + RangFecFin.substr(3, 2).toString() + RangFecFin.substr(0, 2).toString() + " 23:59:59";
            else
                vcRangoFechaFin = "";
        } else {
            vcRangoFechaIni = "";
            vcRangoFechaFin = "";
        }
    }

    $("#btnAgregar").live("click", function () {
        pagina = "Adm_NuevaSolicitud.aspx";
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
        fnEditarSolicitud();
    });

    $("#btnEnviar").live("click", function () {
        fnEnviarSolicitud();
    });

    $("#btnVerDetalle").live("click", function () {
        //fnEditarRegistro();
        LeerSolicitud();
    });

    $("#btnProcesar").live("click", function () {

        $("#gridMasivo").jqGrid("clearGridData", true);

        var id = $("#grid").jqGrid('getGridParam', 'selrow');
        if (id) {
            var vsel = $("#grid").jqGrid("getGridParam", "selarrrow");

            if (vsel.length == 1) {
                var datos = $("#grid").jqGrid('getRowData', id);

                if (datos.IdTipoSolicitud == "1" || datos.TipoSolicitud == "Alta") {
                    var vcParametros = "?IdSolicitud=" + datos.IdSolicitud + "&inTipSol=" + datos.IdTipoSolicitud + "&inEst=" + datos.IdSolicitudEstado + "&";
                    pagina = "../Asistente/MainAsistente.aspx";
                    pagina = pagina + vcParametros;

                    var Id = "#" + $("#hdfvcTab").val() + "_Tab_Nuevo";
                    var $panel = tab.find(Id);
                    if (!$panel.length) {//En el caso que no exista el tab, lo crea
                        tab.tabs("add", Id, "Procesar Solicitud");
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

                if (datos.IdTipoSolicitud == "3" || datos.TipoSolicitud == "Upgrade") {
                    UpgradeSolicitud();
                }
            }
            else {
                lstIdSol = "";
                CargarGrillaMasiva();
                RecalcularColumnasGrilla("gridMasivo", true);

                vcIdSolicitud = 0;
                for (var i = 0; i < vsel.length; i++) {
                    var datos = $("#grid").jqGrid("getRowData", vsel[i]);
                    lstIdSol = lstIdSol + vsel[i].toString() + ",";

                    if (i == 0) vcIdSolicitud = datos.IdSolicitud;

                    AgregaraGrillaMasiva(datos);
                    CargarInstanciaServidor(vcIdSolicitud, ServidoresInstancia[0].ServidorId, false);
                    CargarInstanciaServidor_APP(vcIdSolicitud, ServidoresInstancia_APP[0].ServidorId, false);
                    CargarInstanciaServidor_WEB(vcIdSolicitud, ServidoresInstancia_APP[0].ServidorId, false);


                    //Validamos que haya suscripciones sin aprovisionar
                    if (datos.InfoTarea != "||") {
                        alertaExterna("Ninguna suscripción debe estar en cola.");
                        return;
                    }
                }

                $("#gridmasivo").trigger("reloadGrid");

                $("#cb_gridMasivo").prop("checked", false);

                var digmasivo = $("#divMasivo").dialog({
                    title: "Aprovisionamiento masivo de suscripciones",
                    width: 1030,
                    //				    height: 554,
                    height: 584,
                    modal: true,
                    resizable: false,
                    position: ['center'],
                    autoOpen: true
                });
            }
        }
        else {
            alertaExterna("Seleccione un registro.");
        }
    });


    function UpgradeSolicitud() {

        id = $("#grid").jqGrid('getGridParam', 'selarrrow');

        $('#divUpgrade').dialog({
            title: vcTit,
            modal: true,
            buttons: {
                "Si": function () {
                    $.ajax({
                        type: "POST",
                        url: "Adm_ListadoSolicitudes.aspx/UpgradeSolicitud",
                        data: "{'vcCodSol': '" + id + "'}", //TipoOrigen
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {


                            if (result.d == "0") {
                                $("#grid").trigger("reloadGrid");
                                Mensaje("<br/><h1>" + "La Solicitud de Upgrade fue procesada con éxito" + "</h1><br/>", document, CerroMensaje);
                                fnCargarGrilla();
                            }
                            else {
                                CerroMensaje();
                                alertaExterna("La Solicitud no puede ser procesada");
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

    $("#btnEliminar").live("click", function () {
        fnEliminarSolicitud();
    });

    $("#btnAprobar").live("click", function () {
        fnAprobarSolicitud();
    });

    $("#btnRechazar").live("click", function () {
        fnRechazarSolicitud();
    });
    $("#btnAsignar").live("click", function () {
        fnAsignarseSolicitud();
    });
    $("#btnAsignarA").live("click", function () {
        fnAsignarSolicitudA();
    });
    $("#btnReasignarA").live("click", function () {
        fnReasignarSolicitudA();
    });
    $("#btnAutDesPDF").click(function () {
        fnVerAutorizacionDescuentoPDF();
    });

    $("#btnSubir").live("click", function () {

        var $Pagina = 'CargarExcel.aspx';

        $("#ifcargarExcel").attr("src", $Pagina);
        formulario = $('#dvSubirArchivo').dialog({
            title: "Subir Archivo",
            height: 130,
            width: 350,
            modal: true,
            close: function (event, ui) { $("#grid").trigger("reloadGrid"); }
        });
    });

    function fnVerAutorizacionDescuentoPDF() {
        var id = null;
        var ids;
        if (idSeleccionado == null) {
            ids = $("#grid").jqGrid('getGridParam', 'selarrrow');
            if (ids.length == 0) {
                alertaExterna("Seleccione un registro");
                return;
            } else {
                id = ids[0];
            }
        } else {
            id = idSeleccionado;
        }
        idSeleccionado = null;
        var datos = $("#grid").jqGrid('getRowData', id);

        if (id) {
            if (datos.vcAutDesPDF != "") {
                var vcFile = "P_Movil/Administrar/Solicitudes/AutorizacionDescuento/" + datos.vcAutDesPDF
                $.ajax({
                    url: raiz(vcFile), //or your url
                    success: function (data) {
                        window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + vcFile);
                    },
                    error: function (data) {
                        alertaExterna('No se encontró el archivo a descargar.');
                    }
                });
            }
        } else {
            alertaExterna("Seleccione un registro");
        }
    }
    function EditarRegistro(id) {

        if (id) {
            var datos = $("#grid").jqGrid('getRowData', id);
            pagina = "Adm_NuevaSolicitud.aspx" + "?IdSolicitud=" + datos.IdSolicitud + "&inTipSol=" + datos.IdTipoSolicitud + "&inEst=" + datos.IdSolicitudEstado + "&sololectura=1&";

            var Id = "#" + $("#hdfvcTab").val() + "_Tab_Nuevo";
            var $panel = tab.find(Id);
            if (!$panel.length) {//En el caso que no exista el tab, lo crea
                tab.tabs("add", Id, "Detalle Solicitud");
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

        //pagina = $("#btnEditar").attr("url");
        //if (pagina != "") {
        //    idSeleccionado = id;
        //    LeerSolicitud();
        //}
    }

    function fnAprobarSolicitud() {
        id = $("#grid").jqGrid('getGridParam', 'selarrrow');
        if (id.length == 0) {
            alertaExterna("Seleccione por lo menos un registro");
            return;
        }

        $('#divConApr').dialog({
            title: "Aprobar Solicitud",
            modal: true,
            buttons: {
                "Si": function () {
                    $.ajax({
                        type: "POST",
                        url: "Adm_ListadoSolicitudes.aspx/AprobarSolicitud",
                        data: "{'vcCodSol': '" + id + "', 'vcFecApro': ''}", //TipoOrigen
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            $("#grid").trigger("reloadGrid");
                            Mensaje("<br/><h1>La solicitud fue aprobada con éxito</h1><br/>", document, CerroMensaje);
                            fnCargarGrilla();
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

    function fnRechazarSolicitud() {
        id = $("#grid").jqGrid('getGridParam', 'selarrrow');
        if (id.length == 0) {
            alertaExterna("Seleccione por lo menos un registro");
            return;
        }

        $("#txtComentarios").val("");
        $("#txtComentarios").focus();

        $('#divConRec').dialog({
            title: "Rechazar Solicitud",
            modal: true,
            buttons: {
                "Si": function () {
                    $(this).dialog("close");

                    $('#dvRechazar').dialog({
                        title: "Rechazar Solicitud",
                        modal: true,
                        width: 500,
                        buttons: {
                            "Rechazar": function () {
                                if ($.trim($("#txtComentarios").val()) == "") {
                                    alertaExterna("Debe ingresar algún comentario");
                                    return;
                                }

                                $.ajax({
                                    type: "POST",
                                    url: "Adm_ListadoSolicitudes.aspx/RechazarSolicitud",
                                    data: "{'vcCodSol': '" + id + "'," +
                                          "'vcComentarios':'" + $("#txtComentarios").val() + "'}", //TipoOrigen
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    success: function (result) {
                                        $("#grid").trigger("reloadGrid");
                                        Mensaje("<br/><h1>La solicitud fue rechazada con éxito</h1><br/>", document, CerroMensaje);
                                        fnCargarGrilla();
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
                },
                "Cancelar": function () {
                    $(this).dialog("close");
                }
            }
        });
    }

    function fnEliminarSolicitud() {
        id = $("#grid").jqGrid('getGridParam', 'selarrrow');
        if (id.length == 0) {
            alertaExterna("Seleccione por lo menos un registro");
            return;
        }

        var datos = $("#grid").jqGrid('getRowData', id);
        //IdTipoSolicitud
        $('#divConEli').dialog({
            title: "Eliminar Solicitud",
            modal: true,
            buttons: {
                "Si": function () {
                    $.ajax({
                        type: "POST",
                        url: "Adm_ListadoSolicitudes.aspx/EliminarSolicitud",
                        data: "{'inCodSol': '" + id + "'," + //TipoOrigen
                              "'inTipSol': '" + datos.IdTipoSolicitud + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            $("#grid").trigger("reloadGrid");
                            Mensaje("<br/><h1>La solicitud fue eliminada con éxito</h1><br/>", document, CerroMensaje);
                            fnCargarGrilla();
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

    function fnEditarRegistro() {
        var id = null;
        var ids;
        if (idSeleccionado == null) {
            ids = $("#grid").jqGrid('getGridParam', 'selarrrow');
            if (ids.length == 0) {
                alertaExterna("Seleccione un registro");
                return;
            } else {
                id = ids[0];
            }
        } else {
            id = idSeleccionado;
        }
        idSeleccionado = null;
        var datos = $("#grid").jqGrid('getRowData', id);

        //        if (datos.F_inEstSol == 9) {
        //            alerta("Una solicitud 'Rechazada' no puede ser procesada.");
        //            return;
        //        }

        if (id) {
            //var IdTab = "#" + $("#hdfvcTab").val() + "_Tab_Editar";
            var IdTab = "#" + $("#hdfvcTab").val() + "_Tab_Procesar";
            var $panel = tab.find(IdTab);
            var datos = $("#grid").jqGrid('getRowData', id);
            //var vcParametros = "?vcCodEmp=" + datos.EMPL_P_vcCODEMP + "&inTipSol=" + datos.inTipSol + "&biAdmin=" + $("#hdfAdmin").val() + "&biTecnico=" + $("#hdfTecnico").val() +
            //             "&biResApr=" + $("#hdfResApr").val() + "&inEst=" + datos.F_inEstSol + "&inEst_Apr=" + datos.F_inEstSol_Apr + "&vcTabla=" + datos.vcTabla + "&";
            var vcParametros = "?IdSolicitud=" + datos.IdSolicitud + "&inTipSol=" + datos.IdTipoSolicitud + "&inEst=" + datos.IdSolicitudEstado + "&";

            if (datos.biPersonalizado == "True" || datos.biPersonalizado == "SI")
                pagina = "Adm_EditarSolicitudPersonalizada.aspx";
            else {
                //                if (datos.F_inEstSol == 7) {
                //                    alerta("Una solicitud 'Culminada' no puede ser procesada");
                //                    return;
                //                }

                //                if ($("#hdfAdmin").val() == "1")
                //                    pagina = "Adm_ProcesarSolicitud.aspx";
                //                else

                //pagina = "Adm_ProcesarSolicitud.aspx";

                //pagina = "../Asistente/MainAsistente.aspx";
                pagina = "../Asistente/MainAsistente.aspx";
            }
            pagina = pagina + vcParametros;

            if (pagina != "") {
                if (!$panel.length) {//En el caso que no exista el tab, lo crea
                    pagina += "Cod=" + id;
                    //tab.tabs("add", IdTab, "Cambiar Estado");  //cambio
                    tab.tabs("add", IdTab, "Procesar Solicitud");
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
                } else {//En el caso que exista lo muestra
                    if (vcCod == id) {//Si el codigo anterior seleccionado es igual al actual
                        tab.tabs('select', IdTab);
                        //tab.tabs("remove", $panel.index() - 1);
                        //pagina += "?Cod=" + id;
                        //tab.tabs("add", IdTab, "Editar igual");
                        //$(IdTab).css("width", "99%");
                        //$(IdTab).css("height", "94%");
                        //$(IdTab).css("margin-top", "0px");
                        //$(IdTab).css("margin-left", "0px");
                        //$(IdTab).css("margin-bottom", "0px");
                        //$(IdTab).css("margin-right", "0px");
                        //$(IdTab).css("padding-top", "0px");
                        //$(IdTab).css("padding-left", "0px");
                        //$(IdTab).css("padding-bottom", "0px");
                        //$(IdTab).css("padding-right", "0px");
                        //tab.tabs('select', IdTab);
                    } else {
                        tab.tabs("remove", $panel.index() - 1);
                        pagina += "Cod=" + id;
                        tab.tabs("add", IdTab, "Procesar Solicitud");
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
                    }
                }
            } else {
                alertaExterna("Usted no tiene permiso para editar/procesar esta solicitud.");
            }
            vcCod = id;
        } else {
            alertaExterna("Seleccione un registro");
        }
    }

    function fnEditarSolicitud(idSeleccionado) {
        var id = null;
        if (idSeleccionado == null || idSeleccionado == undefined) {
            ids = $("#grid").jqGrid('getGridParam', 'selarrrow');
            if (ids.length == 0) {
                alertaExterna("Seleccione un registro");
                return;
            } else {
                id = ids[0];
            }
        } else {
            id = idSeleccionado;
        }

        var datos = $("#grid").jqGrid('getRowData', id);
        pagina = "Adm_NuevaSolicitud.aspx" + "?IdSolicitud=" + datos.IdSolicitud + "&inTipSol=" + datos.IdTipoSolicitud + "&inEst=" + datos.IdSolicitudEstado + "&";

        var Id = "#" + $("#hdfvcTab").val() + "_Tab_Nuevo";
        var $panel = tab.find(Id);
        if (!$panel.length) {//En el caso que no exista el tab, lo crea
            tab.tabs("add", Id, "Editar Solicitud");
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


    function LeerSolicitud() {

        var id = $("#grid").jqGrid('getGridParam', 'selrow');
        //var id = null;

        if (id) {
            var datos = $("#grid").jqGrid('getRowData', id);
            pagina = "Adm_NuevaSolicitud.aspx" + "?IdSolicitud=" + datos.IdSolicitud + "&inTipSol=" + datos.IdTipoSolicitud + "&inEst=" + datos.IdSolicitudEstado + "&sololectura=1&";

            var Id = "#" + $("#hdfvcTab").val() + "_Tab_Nuevo";
            var $panel = tab.find(Id);
            if (!$panel.length) {//En el caso que no exista el tab, lo crea
                tab.tabs("add", Id, "Detalle Solicitud");
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

        }
        //if (idSeleccionado == null) {
        //    ids = $("#grid").jqGrid('getGridParam', 'selarrrow');
        //    if (ids.length == 0) {
        //        alertaExterna("Seleccione un registro");
        //        return;
        //    } else {
        //        id = ids[0];
        //    }
        //} else {
        //    id = idSeleccionado;
        //}


    }

    function fnAsignarseSolicitud() {
        id = $("#grid").jqGrid('getGridParam', 'selarrrow');
        var vcTit = 'Asignarse Solicitud';
        vcMen = 'La solicitud fue asignada con éxito'

        if (id.length == 0) {
            alertaExterna("Seleccione por lo menos un registro");
            return;
        }

        if (id.length > 1) {
            var vcTit = 'Asignarse Solicitudes';
            vcMen = 'Las solicitudes fueron asignadas con éxito'
        }

        $('#divConAsi').dialog({
            title: vcTit,
            modal: true,
            buttons: {
                "Si": function () {
                    $.ajax({
                        type: "POST",
                        url: "Adm_ListadoSolicitudes.aspx/AsignarseSolicitud",
                        data: "{'vcCodSol': '" + id + "'}", //TipoOrigen
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {


                            if (result.d == "0") {
                                $("#grid").trigger("reloadGrid");
                                Mensaje("<br/><h1>" + vcMen + "</h1><br/>", document, CerroMensaje);
                                fnCargarGrilla();
                            }
                            else {
                                CerroMensaje();
                                alertaExterna("La Solicitud no pudo ser Asignada");
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

    function fnEnviarSolicitud() {
        id = $("#grid").jqGrid('getGridParam', 'selarrrow');
        var vcTit = 'Enviar Solicitud';
        vcMen = 'La solicitud fue enviada con éxito'

        if (id.length == 0) {
            alertaExterna("Seleccione por lo menos un registro");
            return;
        }

        if (id.length > 1) {
            var vcTit = 'Enviar Solicitudes';
            vcMen = 'Las solicitudes fueron Enviadas con éxito'
        }

        $('#divEnviarSolicitud').dialog({
            title: vcTit,
            modal: true,
            buttons: {
                "Si": function () {
                    $.ajax({
                        type: "POST",
                        url: "Adm_ListadoSolicitudes.aspx/EnviarSolicitud",
                        data: "{'vcCodSol': '" + id + "'}", //TipoOrigen
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {

                            if (result.d == "0") {
                                $("#grid").trigger("reloadGrid");
                                Mensaje("<br/><h1>" + vcMen + "</h1><br/>", document, CerroMensaje);
                                fnCargarGrilla();
                            }
                            else {
                                CerroMensaje();
                                alertaExterna("La Solicitud no pudo ser enviada");
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

        //$("#grid").jqGrid("setSelection", id);                                
        //$("#grid").setSelection(id);
    }


    function fnAsignarSolicitudA() {
        vcEsReasignar = "0";
        lstIdSol = "";
        id = $("#grid").jqGrid('getGridParam', 'selarrrow');
        vcTit = 'Asignar Solicitud A';
        vcMen = 'La solicitud fue asignada con éxito'

        if (id.length == 0) {
            alertaExterna("Seleccione por lo menos un registro");
            return;
        }

        vcIdTipSol = $("#grid").jqGrid('getRowData', id[0]).inTipSol;
        for (var i = 0; i < id.length; i++) {
            var datos = $("#grid").jqGrid('getRowData', id[i]);
            lstIdSol = lstIdSol + id[i].toString() + ",";
            //Valida que todos los tipos de solicitud de las solicitudes elegidas sean iguales
            if (datos.inTipSol != vcIdTipSol) {
                alertaExterna("Todas las solicitudes elegidas deben ser del mismo tipo.");
                return;
            }
        }
        //Valida que el usuario logeado sea técnico responsable del tipo de solicitud de las solicitudes elegidas
        var lstTecResTipSol = $("#hdfTecResSol").val().split(",");
        var biEsRes = "0";
        for (var i = 0; i < lstTecResTipSol.length; i++) {
            if (vcIdTipSol == lstTecResTipSol[i])
                biEsRes = "1";
        }
        if (biEsRes == "0") {
            alertaExterna("Usted no es técnico responsable de las solicitudes elegidas.");
            return;
        }

        if (id.length > 1) {
            vcTit = 'Asignar Solicitudes A';
            vcMen = 'Las solicitudes fueron asignadas con éxito'
        }

        lstIdSol = lstIdSol.substring(0, lstIdSol.length - 1);
        vcConTecResJQ = "P_inCod in (select distinct f_inUsu from mov_tiposolicitud_usuario where F_intipsol in (" + vcIdTipSol.toString() + ") )"
        $('#bpTecRes_btnBuscar').click();
        $('#bpTecRes_txtValor').val("");
        buscarValor_bpTecRes = "";
        $('#bpTecRes_grid').trigger('reloadGrid');
    }

    function fnReasignarSolicitudA() {
        vcEsReasignar = "1";
        lstIdSol = "";
        id = $("#grid").jqGrid('getGridParam', 'selarrrow');
        vcTit = 'Reasignar Solicitud A';
        vcMen = 'La solicitud fue reasignada con éxito'

        if (id.length == 0) {
            alertaExterna("Seleccione por lo menos un registro");
            return;
        }

        vcIdTipSol = $("#grid").jqGrid('getRowData', id[0]).inTipSol;
        for (var i = 0; i < id.length; i++) {
            var datos = $("#grid").jqGrid('getRowData', id[i]);
            lstIdSol = lstIdSol + id[i].toString() + ",";
            //Valida que todos los tipos de solicitud de las solicitudes elegidas sean iguales
            if (datos.inTipSol != vcIdTipSol) {
                alertaExterna("Todas las solicitudes elegidas deben ser del mismo tipo.");
                return;
            }
        }
        //Valida que el usuario logeado sea técnico responsable del tipo de solicitud de las solicitudes elegidas
        var lstTecResTipSol = $("#hdfTecResSol").val().split(",");
        var biEsRes = "0";
        for (var i = 0; i < lstTecResTipSol.length; i++) {
            if (vcIdTipSol == lstTecResTipSol[i])
                biEsRes = "1";
        }
        if (biEsRes == "0") {
            alertaExterna("Usted no es técnico responsable de las solicitudes elegidas.");
            return;
        }

        if (id.length > 1) {
            vcTit = 'Asignar Solicitudes A';
            vcMen = 'Las solicitudes fueron asignadas con éxito'
        }

        lstIdSol = lstIdSol.substring(0, lstIdSol.length - 1);
        vcConTecResJQ = "P_inCod in (select distinct f_inUsu from mov_tiposolicitud_usuario where F_intipsol in (" + vcIdTipSol.toString() + ") )"
        $('#bpTecRes_btnBuscar').click();
        $('#bpTecRes_txtValor').val("");
        buscarValor_bpTecRes = "";
        $('#bpTecRes_grid').trigger('reloadGrid');
    }

    if ($("#hdfIsAccessAdd").val() == '1') {
        pagina = "Adm_NuevaSolicitud.aspx";
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
    }
    CambioVistas();

    $('#btnExportarCodigo').click(function () {
        $("#hdfImprimir").val("0");
        $.ajax({
            type: "POST",
            url: "Mnt_Principal.aspx/ExportarExcel",
            data: "{'tipo':'0'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });
    });


    $("#bdDescargarPlantilla").click(function () {

        $.ajax({
            url: "CargarExcel.aspx/DescargarArchivoBD", //PageMethod
            data: "{}",
            dataType: "json",
            type: "post",
            contentType: "application/json; charset=utf-8",
            success: function (result) {

                var archivo = result.d;

                if (archivo != "") {
                    var NomArc = 'plantillaSolicitud.xlsx'
                    var filePath = "Solicitudes/" + NomArc;
                    window.location.href = "../Common/Controladores/DescargarArchivo.ashx?archivo=" + filePath;
                }

            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

    //#region actualizar estado
    $("#btnVerActualizarEstado").live("click", function () {
        fnVerActualizarEstado();
    });

    $("#btnActualizarEstado").live("click", function () {
        fnrActualizarEstado();
    });

    function fnVerActualizarEstado() {
        var id = $("#grid").jqGrid('getGridParam', 'selrow');
        if (id) {
            var datos = $("#grid").jqGrid('getRowData', id);
            var IdSuscripsion = datos.IdSolicitud;
            var IdEstadoSuscrip = datos.IdSolicitudEstado;
            var NomEstadoSuscrip = datos.Estado;
            var tipoTarea = datos.InfoTarea.split("|")[2];
            if (IdEstadoSuscrip == 2 && tipoTarea == 'Manual') { //en proceso
                $("#lblNombreEstadoActual").text(NomEstadoSuscrip);

                $.ajax({
                    type: "POST",
                    url: 'Adm_ListadoSolicitudes.aspx/TareasPendientes',
                    data: "{'IdSolicitud': '" + IdSuscripsion + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        var vTareas = result.d;
                        if (vTareas.length > 0) {
                            //cargar lista de tareas
                            $("#ddlTareasRestantes").html('');
                            for (var i = 0; i < vTareas.length; i++) {
                                $("#ddlTareasRestantes").append($("<option></option>").val(vTareas[i].IdTarea).text(vTareas[i].Nombre));
                            }
                            actest = $('#dvActualizarEstado').dialog({
                                title: "Actualizar Estado",
                                height: 210,
                                width: 320,
                                modal: true,
                                resizable: false,
                                buttons: {
                                    "Cerrar": function () {
                                        $(this).dialog("close");
                                    },
                                    "Actualizar Estado": function () {
                                        $(this).dialog("close");
                                        fnrActualizarEstado(IdSuscripsion, $("#ddlTareasRestantes").val());
                                    }
                                }
                            });
                        }
                        else {
                            alertaExterna("No existen tareas por culminar.");
                        }
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                        alertaExterna("Error");
                    }
                });
            } else {
                //alertaExterna('No se puede actualizar esta solicitud. Solo se pueden actualizar las solicitudes en estado "' + vCulAprov + '" y "' + vCulOrg + '"');
                alertaExterna('No se puede actualizar esta solicitud. Solo se pueden actualizar las solicitudes en estado "En Proceso" que hayan sido procesadas por el servicio.');
            }
        } else {
            alertaExterna("Seleccione al menos un registro");
        }
    }

    function fnrActualizarEstado(IdSolicitud, IdTarea) {
        var id = $("#grid").jqGrid('getGridParam', 'selrow');
        var ActualizarEstadoSuscripcion_Data = { pIdSubscripcion: IdSolicitud, pIdTarea: IdTarea }
        if (id) {
            $.ajax({
                type: "POST",
                url: 'Adm_ListadoSolicitudes.aspx/ActualizarEstadoSuscripcion',
                data: JSON.stringify(ActualizarEstadoSuscripcion_Data),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if (result.d.split('|')[0] == "OK") {
                        alertaExterna(result.d.split('|')[1]);
                        $("#grid").trigger("reloadGrid", [{ current: true}]);
                    }
                    else {
                        alertaExterna(result.d.split('|')[1]);
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                    alertaExterna("Error");
                }
            });
        } else {
            alertaExterna("Seleccione al menos un registro");
        }
    }

    //ListarServidor();
    //ListarServidorAPP();
    //ListarServidorWEB();
    //#endregion

    $("#TabDetalle").css("display", "block");
});





























































function fnQuitarFiltroEstados() {
    if ($('#rbtGeneral').is(':checked')) {
        $("#ddlFiltro option[value='2']").remove();
        $("#tdFecha").css("display", "block");
    } else {
        $("#ddlFiltro option[value='2']").remove();
        $("#ddlFiltro option[value='6']").remove();
        $("#ddlFiltro option[value='7']").remove();
        $("#ddlFiltro").append($('<option></option>').val('2').html('Rango de Fechas'));
        $("#ddlFiltro").append($('<option></option>').val('6').html('Tipo de Solicitud'));
        if (!$('#rbtPendiente').is(':checked')) {
            //$("#ddlFiltro").append($('<option></option>').val('7').html('--Notas Por Revisar--'));
        }
        $("#tdFecha").css("display", "none");
    }
    $("#ddlFiltro option[value='4']").remove();
    $("#ddlFiltro option[value='5']").remove();

    try {
        $("#grid").hideCol("vcNomEstApr");
        $("#grid").hideCol("vcNomEst");
    }
    catch (err) {
        //some err
    }

    $("#ddlFiltro option[value='1']").prop('selected', true);
    inFiltro = 1;
    $("#divCodigo").show();
    $("#divFecha").hide();
    $("#divEmpleado").hide();
    $("#divTipoSolicitud").hide();
    $("#divTipoSolicitudTec").hide();
    $("#divTipoSolicitudResApr").hide();
    $("#divEstadoApr").hide();
    $("#divEstadoPro").hide();
}
function fnAgregarFiltroEstados() {
    //$("#ddlFiltro").append($('<option></option>').val('4').html('Estados de Aprobación')); Comentado jcamacho123
    $("#ddlFiltro").append($('<option></option>').val('5').html('Estados de Proceso'));
    //$("#ddlFiltro").append($('<option></option>').val('7').html('--Notas Por Revisar--'));
    $("#grid").showCol("vcNomEstApr");
    $("#grid").showCol("vcNomEst");
}
function fnAgregarFiltroEstadoProceso() {
    $("#ddlFiltro").append($('<option></option>').val('5').html('Estados de Proceso'));
    //$("#ddlFiltro").append($('<option></option>').val('7').html('--Notas Por Revisar--'));
    $("#grid").showCol("vcNomEst");
}

function fnVistaGeneral(blQuitarFiltros) {
    $("#lblVista").html("General");
    $('#grid').jqGrid('setGridParam', { page: '1' });
    try {
        $("#grid").hideCol("cb");
        $("#grid").showCol("vcUsuTec");
        $("#grid").showCol("opUmbral");
        $("#grid").showCol("inDiaTra");
        $("#grid").showCol("EMPL_P_vcCODEMP");
        $("#grid").showCol("EMPL_vcNOMEMP");
    }
    catch (err) {
        //some err
    }

    if (blQuitarFiltros == false) {
        $("#grid").jqGrid('resetSelection');
    }
    $("#btnEditar").button("option", "disabled", true);
    $("#btnEnviar").button("option", "disabled", true);
    $("#btnVerDetalle").button("option", "disabled", true);
    $("#btnAutDesPDF").button("option", "disabled", true);
    $("#btnAprobar").hide();
    $("#btnRechazar").hide();
    $("#btnAsignar").hide();
    $("#lblAsignarme").hide();
    $("#btnAsignarA").hide();
    $("#btnReasignarA").hide();
    $("#btnEditar").show(); //Depende del estado aprobación
    $("#btnEnviar").show();
    $("#btnProcesar").hide();
    $("#btnVerDetalle").show(); //Depende del estado aprobación
    $("#btnAutDesPDF").show();
    $("#btnEliminar").show();
    $("#btnSubir").show();
    $("#tblSubirArchivo").show();



    vcVista = "General";
    vcTipos = $("#hdfGruTipSol").val();

    if ($("#hdfBusquedaIni").val() == "")
        $("#ddlFiltro option[value='7']").remove();
    else {
        $("#ddlFiltro").val("7");
        $("#ddlFiltro").change();
    }

    if (blQuitarFiltros == false) {
        fnQuitarFiltroEstados();
        fnAgregarFiltroEstados();
        if ($("#hdfAdmin").val() == "0" && $("#hdfTecnico").val() == "0" && $("#hdfResApr").val() == "0") {
            $("#grid").hideCol("EMPL_P_vcCODEMP");
            $("#grid").hideCol("EMPL_vcNOMEMP");
        }
    }

    if ($("#hdfAdmin").val() == "0" && $("#hdfTecnico").val() == "0" && $("#hdfResApr").val() == "0") {
        $("#lblVista").html("Mis Solicitudes");
        $('label[for=rbtGeneral]').html('Mis Solicitudes');
    }
    else if ($("#hdfOperador").val() == "1") {
        $("#lblVista").html("Mis Solicitudes");
        $("#grid").hideCol("EstadoCola");
        $('label[for=rbtGeneral]').html('Mis Solicitudes');
    }
    else {
        $("#lblVista").html("General");
        $('label[for=rbtGeneral]').html('General');
    }
}

function fnCargarFiltroTipoSolicitud() {
    if (inFiltro == 6 && vcVista == "General") {
        $("#divTipoSolicitud").show();
        $("#divTipoSolicitudTec").hide();
        $("#divTipoSolicitudResApr").hide();
    } else if (inFiltro == 6 && (vcVista == "Pendiente" || vcVista == "PorAprobar" || vcVista == "Aprobada" || vcVista == "Rechazada")) {
        $("#divTipoSolicitud").hide();
        $("#divTipoSolicitudTec").hide();
        $("#divTipoSolicitudResApr").show();
    } else if (inFiltro == 6 && (vcVista == "PorAsignar" || vcVista == "EnProceso" || vcVista == "Culminada" || vcVista == "Anulada")) {
        $("#divTipoSolicitud").hide();
        $("#divTipoSolicitudTec").show();
        $("#divTipoSolicitudResApr").hide();
    }
}

function fnIniciarFiltros() {
    $("#txtCodigo").val("");
    $("#txtFechaIni").val("");
    $("#txtFechaFin").val("");
    $("#txtEmpleado").val("");

    $("#divCodigo").hide();
    $("#divFecha").hide();
    $("#divEmpleado").hide();
    $("#divEstadoApr").hide();
    $("#divEstadoPro").hide();
    $("#divTipoSolicitud").hide();
    $("#divTipoSolicitudTec").hide();
    $("#divTipoSolicitudResApr").hide();
}

//RRAMOS
function IniciarTitularesMasivo(pIdSolicitud) {
    $("#gridMasivoTitulares").jqGrid
	({
	    dataType: "local",
	    colModel: [
					{ name: 'IdSolicitud', index: 'IdSolicitud', width: 60, sorttype: "int", hidden: true },
					{ name: 'IdSolicitudTitular', index: 'IdSolicitudTitular', width: 60, sorttype: "int", hidden: true },
					{ name: 'Nombre', index: 'Nombre', label: 'Nombre', width: '150px' },
					{ name: 'ApellidoPaterno', index: 'ApellidoPaterno', label: 'Apellido', width: '150px' },
					{ name: 'ApellidoMaterno', index: 'ApellidoMaterno', label: 'Apellido Materno', width: '150px', hidden: true },
					{ name: 'Correo', index: 'Correo', label: 'Correo', width: '200px' },
					{
					    name: 'Usuario', index: 'Usuario', label: 'Usuario', width: '110px', align: 'center',
					    formatter: function (value, options, rData) {
					        // alert(rData.IdSolicitud);
					        //return '<input type="text" value="" title="txt' + rData.IdSolicitudTitular + '" id="txt' + rData.IdSolicitudTitular + '" style="width: 90px !important;"/>';
					        return '<input type="text" value="' + Construir_Usuario(rData.IdSolicitud, rData.IdSolicitudTitular, rData.Nombre, rData.ApellidoPaterno, rData.ApellidoMaterno) + '"  id="txt' + rData.IdSolicitudTitular + '" style="width: 90px !important;" class="classValidaCaracterEspecial" />';
					    }
					}
				  ],
	    height: 130,
	    width: 760,
	    shrinkToFit: true,
	    cmTemplate: { sortable: false }
	});
}

function CargarTitularesMasivo(pIdSolicitud) {
    $.ajax(
	{
	    type: "POST",
	    dataType: "json",
	    contentType: "application/json; charset=utf-8",
	    url: "Adm_ListadoSolicitudes.aspx/ListarUnaSolicitud",
	    data: "{'IdSolicitud': " + pIdSolicitud + "}",
	    success: function (result) {
	        var lsSolicitud = result.d;
	        Titulares = [];

	        for (k = 0; k < lsSolicitud[0].Titulares.length; k++) {
	            var oTitular = new SolicitudTitulares();
	            oTitular.IdSolicitud = lsSolicitud[0].Titulares[k].IdSolicitud;
	            oTitular.IdSolicitudTitular = lsSolicitud[0].Titulares[k].IdSolicitudTitular;
	            oTitular.Nombre = lsSolicitud[0].Titulares[k].Nombre;
	            oTitular.ApellidoPaterno = lsSolicitud[0].Titulares[k].ApellidoPaterno;
	            oTitular.ApellidoMaterno = lsSolicitud[0].Titulares[k].ApellidoMaterno;
	            oTitular.Correo = lsSolicitud[0].Titulares[k].Correo;

	            oTitular.Usuario = lsSolicitud[0].Titulares[k].Usuario;

	            Titulares.push(oTitular);
	        }

	        CargarDatosTitularesMasivos(Titulares);
	    },
	    error: function (result) { alert('Error'); }
	});
}

function CargarDatosTitularesMasivos(pTitular) {
    $("#gridMasivoTitulares").jqGrid("clearGridData", true);

    for (var k = 0; k < pTitular.length; k++) {
        $("#gridMasivoTitulares").jqGrid("addRowData", k + 1, pTitular[k]);
    }
}

function CargarGrillaMasiva() {
    CargarCombo_Servidores();
    CargarCombo_Servidores_APP();
    //CargarCombo_Servidores_WEB();

    $("#gridMasivo").jqGrid(
		{
		    datatype: "local",
		    colModel:
			[
				{ name: 'IdSolicitud', index: 'IdSolicitud', label: 'IdSolicitud', width: '100px', hidden: true },
				{ name: 'RazonSocial', index: 'RazonSocial', label: 'Razón Social', width: '80px' },
				{ name: 'Ruc', index: 'Ruc', label: 'Ruc', width: '80px', align: 'center' },
				{ name: 'Suscripcion', index: 'Suscripcion', label: 'Suscripción', width: '65px', align: 'center' },
				{ name: 'Logo', index: 'Logo', label: 'Logo', width: '35px', align: 'center',
				    formatter: function (value, options, rData) {
				        return '<input type="file" nombrearchivo="" id="fupload_' + rData.IdSolicitud + '" class="inputfile" style="display:none; font-size:8px;" /><label for="fupload_' + rData.IdSolicitud + '" style="font-size:10px !important; margin-left:-13px"><div id = "dvEstadoLogo_' + rData.IdSolicitud + '"></div><span id = "dvTextoFile_' + rData.IdSolicitud + '" style="color: blue;" runat = "server" >Subir</span> </label>';

				    }
				},
				{ name: 'Dominio', index: 'Dominio', label: 'Dominio', width: '90px', align: 'center',
				    formatter: function (value, options, rData) {
				        //return '<input type="text"  value="' + rData.Dominio + '"  id="txtDominio_' + rData.IdSolicitud + '" style="width: 80px !important;"  />';
				        //return '<input type="text"  value="' + Construir_Dominio(rData.NombreEmpresa) + '"  id="txtDominio_' + rData.IdSolicitud + '" style="width: 80px !important;"  />';
				        return '<input type="text"  value="' + Construir_Dominio(rData.NombreEmpresa) + '"  id="txtDominio_' + rData.IdSolicitud + '" name="txtDominio-' + rData.IdSolicitud + '" style="width: 80px !important;"  class="classValidaCaracterEspecial" />';
				    }
				},
				{ name: 'Titular', index: 'Titular', label: 'Titular', width: '38px', align: 'center',
				    formatter: function (value, options, rData) {
				        //return '<input type="button"  value="..."  id="btn_' + rData.IdSolicitud + '" onclick="MostrarTitulares(' + rData.IdSolicitud + ');" />';
				        return '<img src="../Common/images/Lupa.png" width="20px"  id="btn_' + rData.IdSolicitud + '" onclick="MostrarTitulares(' + rData.IdSolicitud + ');" />';

				        //return "<img id = "dvTextoFile_' + rData.IdSolicitud + '" style="color: blue;" runat = "server" src="../Common/images/Lupa.png" width="20px"/>";                        
				        //return '<input type="file" nombrearchivo="" id="fupload_' + rData.IdSolicitud + '" class="inputfile" style="display:none; font-size:8px;" /><label for="fupload_' + rData.IdSolicitud + '" style="font-size:8px !important;"><div id = "dvEstadoLogo_' + rData.IdSolicitud + '"></div><img id = "dvTextoFile_' + rData.IdSolicitud + '" style="color: blue;" runat = "server" src="../Common/images/Lupa.png" width="20px"/></label>';
				    }
				},
				{ name: 'ServidorBD', index: 'ServidorBD', label: 'Servidor BD', width: '150px', align: 'center',
				    formatter: function (value, options, rData) {
				        return '<select id="cboServidorBD_' + rData.IdSolicitud + '" onchange="CargarInstanciaServidor(' + rData.IdSolicitud + ', this.value, true);" style="width: 145px;"">' + ServidorHTML + '</select>';
				    }
				},
				{ name: 'InstanciaBD', index: 'InstanciaBD', label: 'Instancia BD', width: '150px', align: 'center',
				    formatter: function (value, options, rData) {
				        return '<select id="cboInstanciaBD_' + rData.IdSolicitud + '" style="width: 145px;">' + InstanciaHTML + '</select>';
				    }
				},
				{ name: 'ServidorAPP', index: 'ServidorAPP', label: 'Servidor APP', width: '150px', align: 'center',
				    formatter: function (value, options, rData) {
				        return '<select id="cboServidorAPP_' + rData.IdSolicitud + '" onchange="CargarInstanciaServidor_APP(' + rData.IdSolicitud + ', this.value, true);" style="width: 145px;">' + ServidorHTML_APP + '</select>';
				    }
				},
				{ name: 'InstanciaAPP', index: 'InstanciaAPP', label: 'Instancia APP', width: '150px', align: 'center',
				    formatter: function (value, options, rData) {
				        return '<select id="cboInstanciaAPP_' + rData.IdSolicitud + '" style="width: 145px;">' + InstanciaHTML_APP + '</select>';
				    }
				},
				{ name: 'ServidorWEB', index: 'ServidorWEB', label: 'Servidor WEB', width: '150px', align: 'center',
				    formatter: function (value, options, rData) {
				        return '<select id="cboServidorWEB_' + rData.IdSolicitud + '" onchange="CargarInstanciaServidor_WEB(' + rData.IdSolicitud + ', this.value, true);" style="width: 145px;">' + ServidorHTML_APP + '</select>';
				    }
				},
				{ name: 'InstanciaWEB', index: 'InstanciaWEB', label: 'Instancia WEB', width: '150px', align: 'center',
				    formatter: function (value, options, rData) {
				        return '<select id="cboInstanciaWEB_' + rData.IdSolicitud + '" style="width: 145px;">' + InstanciaHTML_APP + '</select>';
				    }
				},

				{ name: 'Contrato', index: 'Contrato', label: 'Contrato', width: '150px', align: 'center',
				    formatter: function (value, options, rData) {
				        return '<select id="cboContrato_' + rData.IdSolicitud + '" style="width: 145px;">' + ContratoHTML + '</select>';
				    }
				},
				{ name: 'Portal', index: 'Portal', label: 'Portal', width: '150px', align: 'center',
				    formatter: function (value, options, rData) {
				        return '<select id="cboPortal_' + rData.IdSolicitud + '" style="width: 145px;">' + PortalHTML + '</select>';
				    }
				},

				{ name: 'Usuario', index: 'Usuario', label: 'Usuario', width: '100px', align: 'center', hidden: true,
				    formatter: function (value, options, rData) {
				        return '<input type="text"  id="hdf_usuario_' + rData.IdSolicitud + '" style="width: 80px !important;"  />';
				    }
				}
			],
		    loadtext: 'Cargando datos...',
		    height: "402",
		    width: "1000",
		    rowNum: 10,
		    recordtext: "{0} - {1} de {2} elementos",
		    pgtext: "Pág: {0} de {1}",
		    rownumbers: true,
		    shrinkToFit: false,
		    gridview: false,
		    viewrecords: true,
		    multiselect: true,
		    emptyrecords: "No hay suscripciones para mostrar",
		    cmTemplate: { sortable: false }
		});
};

function CargarCombo_Servidores() {
    var Instan = 0;
    ServidorHTML = '';
    var Exist = false;
    var IdServ = [];
    var MultipleValue = [];

    ServidorHTML = "<option value='-1'>Seleccione</option>";
    for (var k = 0; k < ServidoresInstancia.length; k++) {
        if (IdServ.length == 0) {
            IdServ.push(ServidoresInstancia[0].ServidorId);

            MultipleValue = [];
            MultipleValue.push(ServidoresInstancia[k].ServidorId);
            MultipleValue.push(ServidoresInstancia[k].ServidorDD - ServidoresInstancia[k].ServidorEU);

            ServidorHTML = ServidorHTML + '<option value="' + MultipleValue + '">' + ServidoresInstancia[k].ServidorNombre + '</option>';

        }
        else {
            Instan = ServidoresInstancia[k].ServidorId;
            for (var j = 0; j < ServidoresInstancia.length; j++) {
                if (Instan == IdServ[j]) {
                    Exist = true;
                    break;
                }
                else {
                    Exist = false;
                }
            }

            if (Exist == false) {
                IdServ.push(ServidoresInstancia[k].ServidorId);

                MultipleValue = [];
                MultipleValue.push(ServidoresInstancia[k].ServidorId);
                MultipleValue.push(ServidoresInstancia[k].ServidorDD - ServidoresInstancia[k].ServidorEU);

                ServidorHTML = ServidorHTML + '<option value="' + MultipleValue + '">' + ServidoresInstancia[k].ServidorNombre + '</option>';
            }
        }
    }
}

function CargarCombo_Servidores_APP() {
    var Instan = 0;
    ServidorHTML_APP = '';
    var Exist = false;
    var IdServ = [];

    ServidorHTML_APP = "<option value='-1'>Seleccione</option>";
    for (var k = 0; k < ServidoresInstancia_APP.length; k++) {
        if (IdServ.length == 0) {
            IdServ.push(ServidoresInstancia_APP[0].ServidorId);
            ServidorHTML_APP = ServidorHTML_APP + '<option value="' + ServidoresInstancia_APP[k].ServidorId + '">' + ServidoresInstancia_APP[k].ServidorNombre + '</option>';
        }
        else {
            Instan = ServidoresInstancia_APP[k].ServidorId;
            for (var j = 0; j < ServidoresInstancia_APP.length; j++) {
                if (Instan == IdServ[j]) {
                    Exist = true;
                    break;
                }
                else {
                    Exist = false;
                }
            }

            if (Exist == false) {
                IdServ.push(ServidoresInstancia_APP[k].ServidorId);
                ServidorHTML_APP = ServidorHTML_APP + '<option value="' + ServidoresInstancia_APP[k].ServidorId + '">' + ServidoresInstancia_APP[k].ServidorNombre + '</option>';
            }
        }
    }
}

function CargarCombo_Servidores_WEB() {
    var Instan = 0;
    ServidorHTML_WEB = '';
    var Exist = false;
    var IdServ = [];

    ServidorHTML_WEB = "<option value='-1'>Seleccione</option>";
    for (var k = 0; k < ServidoresInstancia_WEB.length; k++) {
        if (IdServ.length == 0) {
            IdServ.push(ServidoresInstancia_WEB[0].ServidorId);
            ServidorHTML_WEB = ServidorHTML_WEB + '<option value="' + ServidoresInstancia_WEB[k].ServidorId + '">' + ServidoresInstancia_WEB[k].ServidorNombre + '</option>';
        }
        else {
            Instan = ServidoresInstancia_WEB[k].ServidorId;
            for (var j = 0; j < ServidoresInstancia_WEB.length; j++) {
                if (Instan == IdServ[j]) {
                    Exist = true;
                    break;
                }
                else {
                    Exist = false;
                }
            }

            if (Exist == false) {
                IdServ.push(ServidoresInstancia_WEB[k].ServidorId);
                ServidorHTML_WEB = ServidorHTML_WEB + '<option value="' + ServidoresInstancia_WEB[k].ServidorId + '">' + ServidoresInstancia_WEB[k].ServidorNombre + '</option>';
            }
        }
    }
}

function AgregaraGrillaMasiva(rowselected) {

    var oObjeto = new SuscripcionMasiva();
    oObjeto.IdSolicitud = rowselected.IdSolicitud;
    oObjeto.RazonSocial = rowselected.RazonSocial;
    oObjeto.NombreEmpresa = rowselected.NombreEmpresa;
    oObjeto.Ruc = rowselected.RUC;
    oObjeto.Dominio = rowselected.Dominio;
    oObjeto.Suscripcion = rowselected.NombreLicencia;

    var ii = $("#gridMasivo").getGridParam("reccount") + 1;
    $("#gridMasivo").jqGrid("addRowData", ii, oObjeto);
}

function CargarInstanciaServidor(IdSolicitud, IdServidor, isLoadFirst) {
    IdServidor = IdServidor + '';
    var iAllSolicitud = IdServidor.split(',');
    IdServidor = iAllSolicitud[0];

    // alert(iAllSolicitud[1]);

    InstanciaHTML = '';
    var ComboId = '';

    InstanciaHTML = "<option value='-1'>Seleccione</option>";
    if (isLoadFirst) {
        if (IdServidor != 0) {
            ComboId = 'cboInstanciaBD_' + IdSolicitud;

            for (var k = 0; k < ServidoresInstancia.length; k++) {
                if (ServidoresInstancia[k].ServidorId == IdServidor) {
                    InstanciaHTML = InstanciaHTML + '<option value="' + ServidoresInstancia[k].InstanciaId + '">' + ServidoresInstancia[k].InstanciaNombre + '</option>';
                }
            }
        }
        else {
            for (var k = 0; k < ServidoresInstancia.length; k++) {
                ComboId = 'cboInstanciaBD_' + IdSolicitud;
                InstanciaHTML = InstanciaHTML + '<option value="' + ServidoresInstancia[k].InstanciaId + '">' + ServidoresInstancia[k].InstanciaNombre + '</option>';
            }
        }
    } else {
        ComboId = 'cboInstanciaBD_' + IdSolicitud;
    }
    $('#' + ComboId).html(InstanciaHTML);
}

function CargarInstanciaServidor_APP(IdSolicitud, IdServidor, isLoadFirst) {
    InstanciaHTML_APP = '';
    var ComboId = '';

    // alert(IdSolicitud + ' ' + IdServidor);
    // alert(ServidoresInstancia_APP.length)
    InstanciaHTML_APP = "<option value='-1'>Seleccione</option>";
    if (isLoadFirst) {
        if (IdServidor != 0) {
            ComboId = 'cboInstanciaAPP_' + IdSolicitud;

            for (var k = 0; k < ServidoresInstancia_APP.length; k++) {
                // alert(ServidoresInstancia_APP[k].ServidorId);
                if (ServidoresInstancia_APP[k].ServidorId == IdServidor) {
                    InstanciaHTML_APP = InstanciaHTML_APP + '<option value="' + ServidoresInstancia_APP[k].IdInstanciaAPP + '">' + ServidoresInstancia_APP[k].InstanciaAPP + '</option>';
                }
            }
        }
        else {
            for (var k = 0; k < ServidoresInstancia_APP.length; k++) {
                ComboId = 'cboInstanciaAPP_' + IdSolicitud;
                InstanciaHTML_APP = InstanciaHTML_APP + '<option value="' + ServidoresInstancia_APP[k].IdInstanciaAPP + '">' + ServidoresInstancia_APP[k].InstanciaAPP + '</option>';
            }
        }
    } else {
        ComboId = 'cboInstanciaAPP_' + IdSolicitud;
    }
    // alert(InstanciaHTML_APP);
    $('#' + ComboId).html(InstanciaHTML_APP);
}

function CargarInstanciaServidor_WEB(IdSolicitud, IdServidor, isLoadFirst) {
    InstanciaHTML_WEB = '';
    var ComboId = '';

    // alert(IdSolicitud + ' ' + IdServidor);
    // alert(ServidoresInstancia_APP.length)

    InstanciaHTML_WEB = "<option value='-1'>Seleccione</option>";
    if (isLoadFirst) {
        if (IdServidor != 0) {
            ComboId = 'cboInstanciaWEB_' + IdSolicitud;

            for (var k = 0; k < ServidoresInstancia_APP.length; k++) {
                // alert(ServidoresInstancia_APP[k].ServidorId);
                if (ServidoresInstancia_APP[k].ServidorId == IdServidor) {
                    InstanciaHTML_WEB = InstanciaHTML_WEB + '<option value="' + ServidoresInstancia_APP[k].IdInstanciaAPP + '">' + ServidoresInstancia_APP[k].InstanciaAPP + '</option>';
                }
            }
        }
        else {
            for (var k = 0; k < ServidoresInstancia_APP.length; k++) {
                ComboId = 'cboInstanciaWEB_' + IdSolicitud;
                InstanciaHTML_WEB = InstanciaHTML_WEB + '<option value="' + ServidoresInstancia_APP[k].IdInstanciaAPP + '">' + ServidoresInstancia_APP[k].InstanciaAPP + '</option>';
            }
        }
    } else {
        ComboId = 'cboInstanciaWEB_' + IdSolicitud;
    }
    $('#' + ComboId).html(InstanciaHTML_WEB);
}


function Construir_Dominio(texto) {
    return QuitarEspacioTexto(texto);
}

function QuitarEspacioTexto(cadena) {
    var retorno = replaceAll(" ", "", cadena);
    return retorno;
}

function replaceAll(find, replace, str) {
    while (str.indexOf(find) > -1) {
        str = str.replace(find, replace);
    }
    return str;
}

function miFnActulizarPorAlerta() {
    window.parent.$("#dvCargando").hide();
    if (window.parent.miTipoAlerta == 1) {

        window.parent.miTipoAlerta = 0;

        switch (window.parent.miSubtipoAlerta) {
            case 1:
                $("#hdfBusquedaIni").val("7");
                $("#divRangoFecha").hide();
                $('#rbtGeneral').attr('checked', 'checked');
                $('#rbtGeneral').change();
                break;
            case 2:
                $('#rbtPorAprobar').attr('checked', 'checked');
                $('#rbtPorAprobar').change();
                break;
            case 3:
                $('#rbtEnProceso').attr('checked', 'checked');
                $('#rbtEnProceso').change();
                break;
            default:
                break;
        }

    }
}

function SuscripcionMasiva(pIdSolicitud, pRazonSocial, pRuc, pDominio, pSuscripcion, pNombreEmpresa) {
    this.vcMas_IdSolicitud = pIdSolicitud;
    this.vcMas_RazonSocial = pRazonSocial;
    this.vcMas_NombreEmpresa = pNombreEmpresa;
    this.vcMas_Ruc = pRuc;
    this.vcMas_Dominio = pDominio;
    this.vcMas_Suscripcion = pSuscripcion;
}

function SolicitudTitulares(IdSolicitud, IdSolicitudTitular, Nombre, ApellidoPaterno, ApellidoMaterno, Usuario, Correo) {
    this.IdSolicitud = IdSolicitud;
    this.IdSolicitudTitular = IdSolicitudTitular;
    this.Nombre = Nombre;
    this.ApellidoPaterno = ApellidoPaterno;
    this.ApellidoMaterno = ApellidoMaterno;
    this.Usuario = Usuario;
    this.Correo = Correo;
}

function Contrato(IdContratoTerminos, Descripcion) {
    this.IdContratoTerminos = IdContratoTerminos;
    this.Descripcion = Descripcion;
}

function Portal(IdPortal, NombrePortal) {
    this.IdPortal = IdPortal;
    this.NombrePortal = NombrePortal;
}

function Solicitudes() {
    this.Solicitud = [];
}

function SolicitudesImportacion() {
    this.SolicitudImportacion = [];
}

function Solicitud(IdSolicitud, IdOperador, IdEstado, IdTipoSolicitud, Codigo, NombreEmpresa, RazonSocial, Ruc, IdPais, Logo, LogoNombre, FechaInicioContrato,
                    FechaFinContrato, ObservacionContrato, DescripcionContrato, IdTipoLicencia, Lineas, Dominio, IdInstanciaBD, IdInstanciaAPP, FechaenProceso,
                    FechaCulminada, FechaAnulada, TecnicoAsignado, TecnicoProcesar, Comentarios, FechaRegistro, IdUsuarioRegistro, IdContratoTerminos, idConfig,
                    nomArch, p_band, IdSuscripcion, IdInstanciaPedidos, IdPortal) {
    this.IdSolicitud = IdSolicitud;
    this.IdOperador = IdOperador;
    this.IdEstado = IdEstado;
    this.IdTipoSolicitud = IdTipoSolicitud;
    this.Codigo = Codigo;
    this.NombreEmpresa = NombreEmpresa;
    this.RazonSocial = RazonSocial;
    this.Ruc = Ruc;
    this.IdPais = IdPais;
    this.Logo = Logo;
    this.LogoNombre = LogoNombre;
    this.FechaInicioContrato = FechaInicioContrato;
    this.FechaFinContrato = FechaFinContrato;
    this.ObservacionContrato = ObservacionContrato;
    this.DescripcionContrato = DescripcionContrato;
    this.IdTipoLicencia = IdTipoLicencia;
    this.Lineas = Lineas;
    this.Dominio = Dominio;
    this.IdInstanciaBD = IdInstanciaBD;
    this.IdInstanciaAPP = IdInstanciaAPP;
    this.FechaenProceso = FechaenProceso;
    this.FechaCulminada = FechaCulminada;
    this.FechaAnulada = FechaAnulada;
    this.TecnicoAsignado = TecnicoAsignado;
    this.TecnicoProcesar = TecnicoProcesar;
    this.Comentarios = Comentarios;
    this.FechaRegistro = FechaRegistro;
    this.IdUsuarioRegistro = IdUsuarioRegistro;
    this.Titulares = [];
    this.IdContratoTerminos = IdContratoTerminos;
    this.Proceso = [];
    this.idConfig = idConfig;
    this.nomArch = nomArch;
    this.p_band = p_band;
    this.IdSuscripcion = IdSuscripcion;
    this.IdPortal = IdPortal;
    this.IdInstanciaPedidos = IdInstanciaPedidos;
}

function SolicitudImportacion(idConfig, Proceso, nomArch, p_band, IdDominio, IdSuscripcion, pDia, pHora, TipoImportacion) {
    this.idConfig = idConfig;
    this.Proceso = Proceso;
    this.nomArch = nomArch;
    this.p_band = p_band;
    this.IdDominio = IdDominio;
    this.IdSuscripcion = IdSuscripcion;
    this.pDia = pDia;
    this.pHora = pHora;
    this.TipoImportacion = TipoImportacion;
}

function ObtenerValoresConfiguracion() {
    $.ajax({
        url: "Adm_ListadoSolicitudes.aspx/ObtenerValoresConfiguracion",
        type: "POST",
        contentType: "application/json; charset=utf-8;",
        dataType: "json",
        success: function (result) {
            vTamanioBaseDatos = result.d;
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function SeleccionarInstancia(datos) {

    // alert(datos);
    var valores = datos.split(',');
    var id = valores[0];

    vEspacioServidorBDSeleccionado = valores[2] * 1;
    vIdServidorBDSeleccionado = valores[0] * 1;
    vServidorBDSeleccionado = valores[1] + '';

    $("#cboInstanciaBD").html("");
    $("#cboInstanciaBD").append($("<option></option>").attr("value", -1).text("Seleccione"));

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Adm_ListadoSolicitudes.aspx/ListarInstanciaBD",
        data: "{'IdServidor':" + id + "}",
        dataType: "json",
        success: function (result) {

            var lstTipoSolicitud = result.d;

            $(lstTipoSolicitud).each(function () {
                $("#cboInstanciaBD").append($("<option></option>").attr("value", this.IdInstanciaBD).text((this.Instancia == "" ? "[Sin instancia]" : this.Instancia)));
            });

            if (window.parent.IdServidorBD != "") {
                $("#cboInstanciaBD").val(window.parent.IdServidorBD);
            }

            $("#divServidorSeleccionado").html("de: " + vServidorBDSeleccionado);
        },
        error: function (result) {
            alert("Error");
        }
    });
}

function SeleccionarInstanciaAPP(datos) {
    $("#cboInstanciaAPP").html("");
    $("#cboInstanciaAPP").append($("<option></option>").attr("value", -1).text("Seleccione"));

    var valores = datos.split(',');
    var id = valores[0];

    vIdServidorAPPSeleccionado = valores[0] * 1;
    vServidorAPPSeleccionado = valores[1] + '';

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Adm_ListadoSolicitudes.aspx/ListarInstanciaAPP",
        data: "{'IdServidor':" + id + "}",
        dataType: "json",
        success: function (result) {

            var lstTipoSolicitud = result.d;

            $(lstTipoSolicitud).each(function () {
                $("#cboInstanciaAPP").append($("<option></option>").attr("value", this.IdInstanciaAPP).text(this.NombreAPP == "" ? "[Sin instancia]" : this.NombreAPP));
            });

            $("#divServidorAPPSeleccionado").html("de: " + vServidorAPPSeleccionado);
        },
        error: function (result) {
            alert("Error");
        }
    });
}

function SeleccionarInstanciaPedidos(datos) {
    $("#cboInstanciaWEB").html("");
    $("#cboInstanciaWEB").append($("<option></option>").attr("value", -1).text("Seleccione"));

    var valores = datos.split(',');
    var id = valores[0];

    vIdServidorPedidosSeleccionado = valores[0] * 1;
    vServidorPedidosSeleccionado = valores[1] + '';

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Adm_ListadoSolicitudes.aspx/ListarInstanciaAPP",
        data: "{'IdServidor':" + id + "}",
        dataType: "json",
        success: function (result) {

            var lstTipoSolicitud = result.d;

            $(lstTipoSolicitud).each(function () {
                $("#cboInstanciaWEB").append($("<option></option>").attr("value", this.IdInstanciaAPP).text(this.NombreAPP == "" ? "[Sin instancia]" : this.NombreAPP));
            });

            $("#divServidorWEBSeleccionado").html("de: " + vServidorAPPSeleccionado);
        },
        error: function (result) {
            alert("Error");
        }
    });
}


function MostrarTitulares(IdSolicitud) {
    var divMasivTitulares = $("#divMasivoTitulares").dialog
	({
	    title: "Titulares",
	    width: 780,
	    height: 250,
	    modal: true,
	    resizable: false,
	    position: ['center'],
	    autoOpen: true
	});

    IniciarTitularesMasivo(IdSolicitud);
    CargarTitularesMasivo(IdSolicitud);
}

function Construir_Usuario(IdSolicitud, IdSolicitudTitular, Nombre, ApellidoPaterno, ApellidoMaterno) {
    var bPermitido = true;
    var yy_nomenclatura = $("#hdf_usuario_" + IdSolicitud).val().trim();
    var sUsuario = "";

    if (yy_nomenclatura != "") {
        if (vgAPM_AplicaOpcion != 2) //Aplica a la solicitudes que no tienen usuarios asignados.
        {
            if (vgAPM_TitularesAsignados.length > 0) {
                for (var k = 0; k < vgAPM_TitularesAsignados.length; k++) {
                    if (IdSolicitudTitular == vgAPM_TitularesAsignados[k].split('|')[0]) {
                        if (vgAPM_TitularesAsignados[k].split('|')[1] != "") {
                            return vgAPM_TitularesAsignados[k].split('|')[1];
                        }
                        else {
                            sUsuario = Transforma_nomenclatura(yy_nomenclatura, Nombre, ApellidoPaterno, ApellidoMaterno);
                        }
                    }
                    else {
                        if (k == vgAPM_TitularesAsignados.length - 1) {
                            // alert('test');
                            sUsuario = Transforma_nomenclatura(yy_nomenclatura, Nombre, ApellidoPaterno, ApellidoMaterno);
                        }
                    }
                }
            }
            else {
                if (vgAPM_TitularesAsignados.length == 0 && $("#optAplicarTitSin").is(':checked')) {
                    sUsuario = Transforma_nomenclatura(yy_nomenclatura, Nombre, ApellidoPaterno, ApellidoMaterno);
                }
            }
        }

        if (vgAPM_AplicaOpcion == 2)  //Aplica a todos los usuarios.
        {
            sUsuario = Transforma_nomenclatura(yy_nomenclatura, Nombre, ApellidoPaterno, ApellidoMaterno);
        }
    }
    else {
        //inicio
        if (vgAPM_AplicaOpcion != 2) //Aplica a la solicitudes que no tienen usuarios asignados.
        {
            if (vgAPM_TitularesAsignados.length > 0) {
                for (var k = 0; k < vgAPM_TitularesAsignados.length; k++) {
                    if (IdSolicitudTitular == vgAPM_TitularesAsignados[k].split('|')[0]) {
                        if (vgAPM_TitularesAsignados[k].split('|')[1] != "") {
                            return vgAPM_TitularesAsignados[k].split('|')[1];
                        }
                    }
                }
            }
        }
        //fin
    }

    sUsuario = QuitarEspacioTexto(sUsuario);
    return sUsuario;
}

function Transforma_nomenclatura(Nomenclatura, Nombre, ApellidoPaterno, ApellidoMaterno) {
    var yUsuario = '';
    yUsuario = replaceAll("{Nombre}", Nombre, Nomenclatura);
    yUsuario = replaceAll("{ApellidoPaterno}", ApellidoPaterno, yUsuario);
    yUsuario = replaceAll("{ApellidoMaterno}", ApellidoMaterno, yUsuario);
    yUsuario = replaceAll("{PrimerCaracterNombre}", Nombre.substring(0, 1), yUsuario);
    yUsuario = replaceAll("{PrimerCaracterApellidoPaterno}", ApellidoPaterno.substring(0, 1), yUsuario);
    yUsuario = replaceAll("{PrimerCaracterApellidoMaterno}", ApellidoMaterno.substring(0, 1), yUsuario);

    return yUsuario;
}

function EsCaracterEspecial(str, validaNomenclatura) {

    var iChars = (validaNomenclatura ? "~`!#$%^&*+=-[]\\\';,/|\":<>?@" : "~`!#$%^&*+=-[]\\\';,/{}|\":<>?@");

    for (var i = 0; i < str.length; i++) {
        if (iChars.indexOf(str.charAt(i)) != -1) {
            return false;
        }
    }
    return true;
}

function ExisteValor_TitulaAsignado(IdSolicitudTitular) {
    for (var k = 0; k < vgAPM_TitularesAsignados.length; k++) {
        if (vgAPM_TitularesAsignados[k].split('|')[0] == IdSolicitudTitular) {
            return k + "|true";
        }
    }
    return 0 + "|false";
}

function DetectarDuplicidadTitularSuscripcion(IdSuscripcion, usuarioasignar) {
    var respuesta = false;
    var k;
    if (vgAPM_TitularesAsignados.length > 0) {
        for (k = 0; k < vgAPM_TitularesAsignados.length; k++) {
            var valor = vgAPM_TitularesAsignados[k];
            var usuarioalmacenado = valor.split('|')[1];

            if (IdSuscripcion == valor.split('|')[2]) {
                if (usuarioasignar == vgAPM_TitularesAsignados[k].split('|')[1]) {
                    respuesta = true;
                }
            }
        }

    }

    return respuesta;
}

function DetectarDuplicidadTitularSuscripcionGrilla(temptitulares, usuarioasignar) {
    var respuesta = false;
    var y;
    for (y = 0; y < temptitulares.length; y++) {
        if (usuarioasignar == temptitulares[y]) {

            if (incidencia == 1) {
                respuesta = true;
                incidencia = 0;
                break;
            }

            incidencia++;
        }
    }

    return respuesta;
}

function Construir_grilla_cuentas() {

    $("#lblCuentaCodigo").html("");
    $("#txtCuentaNombre").val("");
    $("#txtCuentaFIC").val("");
    $("#txtCuentaFFC").val("");

    $("#txtCuentaNombre").prop("readonly", true);
    $("#cboCuentaLineaTipo").prop("disabled", true);
    $("#cboCuentaAsignacionCredito").prop("disabled", true);

    $("#gridCuentasImportacion").jqGrid({
        dataType: "local",
        colModel: [
			{ name: 'Id', index: 'Id', label: 'Id', hidden: true },
			{ name: 'P_vcCod', index: 'P_vcCod', label: 'Código Cuenta', width: '200px' },
		],
        height: "180",
        width: "250px",
        multiselect: false,
        rownumbers: true,
        hidegrid: false,
        onSelectRow: function (id, select, item) {
            var data = $("#gridCuentasImportacion").getRowData(id);

            $("#lblCuentaCodigo").html(data.P_vcCod);
            $("#txtCuentaNombre").prop("readonly", false);
            $("#cboCuentaLineaTipo").prop("disabled", false);
            $("#cboCuentaAsignacionCredito").prop("disabled", false);

            $("#txtCuentaNombre").focus();
        },
        shrinkToFit: true,
        caption: "Seleccione una cuenta"
    });

}

var MisDominios = [];
function CargarDominios() {

    MisDominios = [];

    $.ajax({
        url: "Adm_ListadoSolicitudes.aspx/CargarDominios",
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {

            for (var k = 0; k < result.d.length; k++) {
                MisDominios[k] = result.d[k].Nombre;
            }

        },
        error: function (result) {

            alert('error');
        }
    });
}


function Date2Ansi(Fecha) {
    try {
        return Fecha.getFullYear().toString() + FormatoDigitos(Fecha.getMonth() + 1, 2) + FormatoDigitos(Fecha.getDate(), 2); /* + " "+
               FormatoDigitos(Fecha.getHours(), 2) + ":" + FormatoDigitos(Fecha.getMinutes(), 2) + ":" + FormatoDigitos(Fecha.getSeconds(), 2);*/
    }
    catch (e) {
        return "";
    }
}

function FormatoDigitos(Numero, Digitos) {
    try {
        //        if (Numero.toString().length >= Digitos)
        //            return Numero;
        while (Numero.toString().length < Digitos) {
            Numero = "0" + Numero.toString();
        }
        return Numero.toString();
    } catch (e) {
        return Numero.toString();
    }
}
