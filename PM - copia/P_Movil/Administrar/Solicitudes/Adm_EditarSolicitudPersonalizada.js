var TecnicoAsignado = '';
var oCulturaUsuario = window.parent.parent.oCulturaUsuario;
//VARIABLES TIPO MONTO
var btTipoMontoSelectable = true;
var vcTipoMontoDefault = 'CIA';  //EMP/Mnt_Empleado.aspx
var indiceTab;
var vcCadenaControles = "";
var biCadConAct = false;
var btActOpe;
var dcIGV;
var TituloValeResguardo = "";
//carpeta de dominio
var CarpetaDominio = '';
let solicitudEnPausa = false;
let tipoPausaInicial;
let solicitudMultipleEspecialista = false;

let vcUpdPerInicial = "";
let vcUpdPerFinal = "";
var vcUpdPer = "";
var vcValAnt;
var bAreaRequiereAutorizacion = false;
var bSolRequiereAutorizacion = false;
var bSolicitudAutorizada;
var bEsVistaAutorizador;
var bEsTecnicoSolicitud = false;
var bEsAutorizador = false;

function mostrarOcultarAsignarEspecialista() {
    //trAsignarA
    if (solicitudMultipleEspecialista) {
        $("#trAsignarA").hide();
        $("#btnAsignar").hide();
    }
}

function validacionMostrarOcultarBotonesAutorizacion() {
    //SOLO APLICA CUANDO LA SOLICITUD ESTÁ EN ESTADO EN PROCESO
    //debugger;
    let strMensajeEstadoAutorizacion = "";
    let color = "#FFFFFF";

    $("#divBtnsAutorizacion").hide();
    $("#btnSolicitarAutorizacion").hide();
    $("#btnAutorizar").hide();
    $("#btnDenegar").hide();

    if ($('#hdfEstado').val() == "8") {
        //SOLO SERÁN PARA SOLICITUDES EN ESTADO EN PROCESO
        if (bAreaRequiereAutorizacion) {
            $("#divBtnsAutorizacion").show();
            //EL ÁREA TIENE AUTORIZACION ACTIVADA
            if (bSolRequiereAutorizacion) {
                //LA SOLICITUD YA SE SOLICITÓ LA AUTORIZACION
                $("#btnSolicitarAutorizacion").hide();
                if (bSolicitudAutorizada == "0") {
                    if (bEsVistaAutorizador == "1" && bEsAutorizador) {
                        $("#btnAutorizar").show();
                        $("#btnDenegar").show();
                    }
                    else {
                        $("#divBtsProceso").hide();
                        strMensajeEstadoAutorizacion = "La solicitud requiere de autorización."
                        color = "#4297D7";
                    }
                }
                else {
                    //LA SOLICITUD YA FUE AUTORIZADA O DENEGADA, SIGUE EL FLUJO NORMAL
                    $("#divBtsProceso").show();
                    $("#divBtnsAutorizacion").hide();

                    if (bSolicitudAutorizada == "1") {
                        strMensajeEstadoAutorizacion = "La solicitud ha sido autorizada."
                        color = "#44CA58";
                    }
                    else if (bSolicitudAutorizada == "2") {
                        strMensajeEstadoAutorizacion = "La solicitud ha sido denegada."
                        color = "#FF1F1F";
                    }
                }
            }
            else {
                //LA SOLICITUD VA A MOSTRAR BOTÓN PARA SOLICITAR AUTORIZACIÓN
                if (bEsTecnicoSolicitud) {
                    $("#btnSolicitarAutorizacion").show();
                }
            }
        }
        else {
            $("#divBtsProceso").show();
        }
    }
    if (strMensajeEstadoAutorizacion != "") {
        $("#divMensajeAutorizacion").show();
        $("#lblMensajeEstadoAutorizacion").text(strMensajeEstadoAutorizacion)
        $("#lblMensajeEstadoAutorizacion").css('color', color);
    }
    
}

function fnValidacionControlTipoCierre() {
    $("#ddlTipoCierreSolicitud").prop('disabled', false);
    if (bSolicitudAutorizada == "0") {
        //SI O SI HAY QUE ELIMINAR CUANDO ES CERO, YA QUE EST TIPO DE CIERRE SOLO ENTRA CUANDO ES CIERRE POR PROCESO DE AUTORIZACIÓN.
        $("#ddlTipoCierreSolicitud option").each(function (e) {
            if ($(this).text() == "Solicitud Denegada") {
                $(this).remove();
            }
        });
    }
    else if (bSolicitudAutorizada == "1") {
        $("#ddlTipoCierreSolicitud option").each(function (e) {
            if ($(this).text() == "Solicitud Denegada") {
                $(this).remove();
            }
        });
    }
    else if (bSolicitudAutorizada == "2") {
        $("#ddlTipoCierreSolicitud option").each(function (e) {
            if ($(this).text() == "Solicitud Denegada") {
                $("#ddlTipoCierreSolicitud").val($(this).val());
                $("#ddlTipoCierreSolicitud").prop('disabled', 'disabled');
            }
        });
    }
    
}

$(function () {
    //debugger;
    solicitudMultipleEspecialista = $('#hdfSolicitudesMultipleEspecialista').val() === 'True';
    bAreaRequiereAutorizacion = $('#hdfAreaRequiereAutorizacion').val() === '1';
    bSolRequiereAutorizacion = $('#hdfSolRequiereAutorizacion').val() === '1';
    bSolicitudAutorizada = $('#hdfSolicitudAutorizada').val();
    bEsVistaAutorizador = $('#hdfEsVistaAutorizador').val();

    bEsTecnicoSolicitud = $('#hdfTecnico').val() === '1';
    bEsAutorizador = $('#hdfEsAutorizador').val() === '1';

    validacionMostrarOcultarBotonesAutorizacion();
    fnValidacionControlTipoCierre();

    let esTecnico = $("#hdfTecnico").val();
    let EstadoTipoPausaSol = $("#ddlTipoPausa").val();
    if (esTecnico == "1") {
        if (EstadoTipoPausaSol == "1") {
            $("#ddlTipoPausa").attr("disabled", true);
        }
    }

    let usaFinanciamiento = $('#hfdUsaFinanciamiento').val() === 'True';

    if (!usaFinanciamiento) {
        //$('#divMensajeAtencion').text('¡Atención!, Este proceso no podrá ser revertido. ¿Desea continuar?');
        document.querySelectorAll('#divMensajeAtención')[0].textContent = '¡Atención!, Este proceso no podrá ser revertido. ¿Desea continuar?'
    }

    //es necesario mostrar el botón de eliminar ya que para el estado 6 (abierto) 
    //se debe poder rechazar la solicitud
    if ($('#hdfEstado').val() === '6') {
        $('#btnEliminar').show();
    }

    $("#ddlTipoPausa").change(function () {

        if ($(this).val() !== "-1") {
            $("#btnGuardar").button("option", "disabled", true);
            return;
        }

        $("#btnGuardar").button("option", "disabled", false);
    });

    $('#txtComentProcesar').css({ height: '260px' });

    mostrarOcultarAsignarEspecialista();
    iniciaFuncionesPausaSolicitud();

    TituloValeResguardo = $("#hdfTituloValeResguardo").val();
    if (TituloValeResguardo == "") {
        $("#aTituloValeResguardo").html("Vale Resguardo");
    }
    else {
        $("#aTituloValeResguardo").html(TituloValeResguardo);
    }

    CarpetaDominio = window.top.$("#hdfCodigoDominio").val() != '' ? '/' + window.top.$("#hdfCodigoDominio").val() : '';
    if ($("#hdfTipoMonto").val() != "") {
        vcTipoMontoDefault = $("#hdfTipoMonto").val();
    }

    var vcVacio = "0";
    var vcAdjuntos = "";

    $("#divBtsGeneral").buttonset();
    $("#divBtsProceso").buttonset();
    $("#divBtsOperador").buttonset();
    $("#divBtsBasico").buttonset();

    indiceTab = window.parent.tab.tabs("option", "selected");

    //if ($("#hdfCodTipSol").val() == "29" || $("#hdfCodTipSol").val() == "30") {
    //    dcIGV = $("#hdfIGV").val(); $("#ddlTipoMonto").attr("disabled", true);

    //    //actualizar en versión 3.1 (4)
    //    if (dcIGV != "0") {
    //        if ($("#hdfEstado").val() == "6") {
    //            $("#txt_IGV").css("background-color", "#F0F0F0");
    //            $("#txt_ImporteTotal").css("background-color", "#F0F0F0");
    //        } else if ($("#hdfEstado").val() == "8") {
    //            $("#txt_IGV").css("background-color", $("#txt_F_vcCodEmp").css("background-color"));
    //            $("#txt_ImporteTotal").css("background-color", $("#txt_F_vcCodEmp").css("background-color"));
    //        }
    //    }

    //    ValidarNumeroEnCajaTexto("txt_ImporteBase", ValidarDecimalPositivo, oCulturaUsuario);
    //    ValidarNumeroEnCajaTexto("txt_IGV", ValidarDecimalPositivo, oCulturaUsuario);
    //    ValidarNumeroEnCajaTexto("txt_ImporteTotal", ValidarDecimalPositivo, oCulturaUsuario);

    //    $("#txt_ImporteBase").val(FormatoNumero($("#txt_ImporteBase").val(), oCulturaUsuario));
    //    $("#txt_IGV").val(FormatoNumero($("#txt_IGV").val(), oCulturaUsuario));
    //    $("#txt_ImporteTotal").val(FormatoNumero($("#txt_ImporteTotal").val(), oCulturaUsuario));

    //    $("#txt_ImporteBase").focus(function () {
    //        if ($(this).val() == "0") { $(this).val(''); }
    //    });
    //    $("#txt_ImporteBase").focusout(function () {
    //        if ($(this).val() == "") { $(this).val('0'); }
    //    });

    //    $("#txt_ImporteBase").change(function () {
    //        var dcVal = parseFloat(DevuelveNumeroSinFormato($("#txt_ImporteBase").val(), oCulturaUsuario, false));

    //        if (dcVal > 0) {
    //            $("#txt_IGV").val(FormatoNumero((dcVal * dcIGV) / 100, oCulturaUsuario));
    //            $("#txt_ImporteTotal").val(FormatoNumero(dcVal + (dcVal * dcIGV) / 100, oCulturaUsuario));
    //        } else {
    //            $("#txt_IGV").val(FormatoNumero(0, oCulturaUsuario));
    //            $("#txt_ImporteTotal").val(FormatoNumero(0, oCulturaUsuario));
    //        }
    //    });
    //}


    //#region Kendo Mensaje

    $("#txtResumen").attr("height", "200px");
    //var altokendoEditor = altco
    $("#txtResumen").kendoEditor({
        tools: ["bold", "italic", "underline", "strikethrough",
            "justifyLeft", "justifyCenter", "justifyRight", "justifyFull",
            "insertUnorderedList", "insertOrderedList",
            "indent", "outdent",
            "fontSize"
            //"createTable", "addColumnLeft", "addColumnRight", "addRowAbove", "addRowBelow", "deleteRow", "deleteColumn"

        ],
        messages: {
            bold: "Negritas", italic: "Cursiva", underline: "Subrayado", strikethrough: "Tachado",
            justifyLeft: "Alinear a la izquierda", justifyCenter: "Centrar", justifyRight: "Alinear a la derecha", justifyFull: "Justificar",
            insertUnorderedList: "Viñetas", insertOrderedList: "Numeración",
            indent: "Disminuir sangría", outdent: "Aumentar sangría",
            fontNameInherit: "(Fuente)", fontSizeInherit: "(Tamaño de fuente)",
            //fontName: "Fuente", 
            fontSize: "Tamaño de fuente"
        }
    });
    //#endregion 

    function validaPausaSolicitudPrevio() {
        //debugger;

        let tipoPausaActual = $('#ddlTipoPausa').val();

        //si mi solicitud actualmente está en pausa y hay cambios en mi formulario 
        if (solicitudEnPausa && validaSiHayCambiosEnElFormulario()) {

            $('#divMensajeCambioDeEstado').dialog({
                title: "Cambio de estado",
                modal: true,
                buttons: {
                    "Si": function () {
                        $(this).dialog("close");
                        ajaxReanudaSolicitud();
                        return;
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                }
            });

            return;

        }

        //si el estado es identico al que inició solo guardo la solicitud
        if (tipoPausaInicial === tipoPausaActual) {
            fnGuardarSolicitudPrevio();
            return;
        }

        //si mi tipo pausa actual es distinta a la inical y ahora es procesar renudo la solicitud y corto el hijo de ejecucion
        if (tipoPausaActual === '-1') {
            ajaxReanudaSolicitud();
            return;
        }

        //si mi solicitud está en pausa y ha cambiado el combo de estado de la pausa
        if (solicitudEnPausa) {
            ajaxReanudaSolicitud();
        }

        //si llegué hasta acá pues pauso la solicitud
        ajaxPausaSolicitud();
    }



    $("#btnGuardarPrevio").click(function () {
        validaPausaSolicitudPrevio();
    });

    $('#btnEnviarOperador').click(function () {
        btActOpe = true;
        fnConfirmacionActualizarEnvioOperador("Enviar a operador");
    });

    $('#btnDevueltoOperador').click(function () {
        btActOpe = false;
        fnConfirmacionActualizarEnvioOperador("Devuelto por operador");
    });

    $('#btnResumen').click(function () {
        //        if ($("#txtResumen").data("kendoEditor").value() == "") {
        //vcResumen = "<table><tr><td><b>Campo 1:</b></td><td>Descripción 1</td></tr><tr><td><b>Campo 2:</b></td><td>Descripción 2</td></tr></table>";
        $("#txtResumen").data("kendoEditor").value(vcResumen);
        //        }

        $('#divResumen').dialog({
            title: "Resumen",
            width: 480, //410,
            height: 370, //310,
            modal: true,
            resizable: false
        });
        $('#divResumen').dialog("option", "buttons", [{ text: "Cerrar", click: function () { $(this).dialog("close"); } }]);
    });

    //JHERRERA 20150311: Nueva configuración (botón refrescar)
    //--------------------------------------------------------
    $('#btnRefrescar').click(function () {
        if (fnHayCambios()) {
            $("#lblMsjConfirmacion").text("Se volverá a cargar la página y perderá los cambios que no haya guardado. ¿Desea continuar?");
            $('#divMsgConfirmar').dialog({
                title: "¡Alerta!",
                modal: true,
                width: 330,
                buttons: {
                    "Si": function () {
                        $(this).dialog("close");
                        location.reload();
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                }
            });
        } else {
            location.reload();
        }
    });
    //------------------------------------------------------->

    $(window).resize(function (a, c) {
        DimPosElementos();
    });
    DimPosElementos();
    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        $("#dvCampo").css("height", Alto - 108 - 15);
    }

    //var inOrdIni;
    //var inOrdFin;
    //var vcFasIni = $("#ddlFase option:selected").text();


    //var inFin = vcFasIni.indexOf("]");
    //inOrdIni = vcFasIni.substr(1, inFin - 1);
    //inOrdFin = parseInt(inOrdIni) + 1;

    $("#ddlEstadoSolicitud").hide();
    $("#ddlFraccionamiento").attr("disabled", true);
    $("#ddlMesesCuotas").attr("disabled", true);

    //$(".VARCHAR").keypress(ValidarCadena);
    $(".VARCHAR").keypress(ValidarAlfaNumericoConEspaciosYCaracteres); //agregado 17/07/2014 wapumayta (tfs 1396)
    $(".INT").keypress(ValidarEntero);
    $(".DECIMAL").keypress(ValidarDecimal, oCulturaUsuario, false);
    $(".DATE").keypress(ValidarFecha);
    $(".DATETIME").keypress(ValidarFechaHora);

    //$("#txtMonto").keypress(ValidarDecimal);
    //$("#txtMesesCuotas").keypress(ValidarEntero);
    //$("#txtPeriodoGracia").keypress(ValidarEntero);
    //ValidarNumeroEnCajaTexto("txtMonto", ValidarDecimal, oCulturaUsuario, false);
    ValidarNumeroEnCajaTexto2("txtMonto", ValidarDecimal2, oCulturaUsuario, false);
    ValidarNumeroEnCajaTexto("txtMesesCuotas", ValidarEntero);
    ValidarNumeroEnCajaTexto("txtPeriodoGracia", ValidarEntero);
    $("#txtFechaAprobacion").keypress(ValidarFechaHora);
    $("#imgBorrarFechaAprobacion").click(function () {
        $("#txtFechaAprobacion").val("");
    });
    $(".DATE,.DATETIME,#txtFechaAprobacion").keydown(function (e) {
        if (e.keyCode == 8 || e.keyCode == 46) {
            return false;
        }
    });


    //información de empleado
    $("#tdCodEmpl").append('<img id="imgInfoEmp" src="../../../Common/Images/Mantenimiento/VerDetalle.png" title="Información de empleado" style="padding-left:10px;" class="imgBtn">');
    $("#imgInfoEmp").click(function () {
        //alert("información");
        var $width = 585;
        //var $height = 470;
        var $height = $(window).height() - 20;

        //debugger;
        if ($height > 460) {
            $height = 450;
        }

        var $Pagina = '../../../General/Administrar/Mantenimiento/Mnt_Empleado.aspx?Cod=' + $("#hdfCodEmp").val() + '&esInfo=1';
        $("#ifInfoEmpleado").attr("src", $Pagina);
        ModalInfo = $("#divInfoEmpleado").dialog({
            title: "Seleccionar Empleado",
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });

        $("#divInfoEmpleado").css({ "height": "413px" });
        $("#ifInfoEmpleado").css({ "height": "413px" });

    });
    //fin información empleado

    $(".DATETIME").AnyTime_picker({
        format: "%d/%m/%Y %H:%i:%s",
        labelTitle: "Fecha-Hora",
        labelHour: "Hora",
        labelMinute: "Minuto",
        labelSecond: "Segundo",
        labelYear: "Año",
        labelMonth: "Mes",
        labelDayOfMonth: "Dia",
        monthAbbreviations: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        dayAbbreviations: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
    });

    //fecha de aprobación / 10-03-2014 wapumayta
    $(".DATE, #txtFechaAprobacion").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });

    //JHERREA 20150806: Agregado para contemplar el nuevo tipo de dato Periodo
    kendo.culture("es-PE");
    $(".PERIODO").removeClass("ui-corner-all");
    $(".PERIODO").css({
        "border": "none",
        "padding": "0px"
    });
    $(".PERIODO").kendoDatePicker({
        culture: "es-PE",
        start: "year",
        depth: "year",
        //        value: fechainicio,
        format: "MM/yyyy",
        footer: false
    }).data("kendoDatePicker");
    //FIN

    var hdate = new Date();
    $("#txtFechaAprobacion").datepicker("setDate", hdate);
    //fin fecha de aprobación

    //Limpiar fecha
    $(".imgBtn").live("click", function () {
        var controlId = $(this).attr("controlLimpiar");
        $("#" + controlId).val("");
    });

    var IdDominio = "-1";
    try {
        IdDominio = window.top.$("#hdfCodigoDominio").val();
    } catch (e) {
        //alert("Error: " + e);
    }

    $(".VARBINARY").each(function (i) {
        var vcNomCon = $(this).attr("obj");
        var vcTipExt = $(this).attr("vcTipExt");
        if ($(this).hasClass("imgButton")) {
            new AjaxUpload('#upl_' + vcNomCon, {
                action: 'UploadHandler.ashx?dominio=' + IdDominio,
                accept: vcTipExt,
                onComplete: function (file, response) {

                    if (response != "") {
                        var vcHtml = "<div class='imgBtn' style='margin-top:1px; height:21px; margin-left: 2px;' ><img src='../../../Common/Images/remove.png' onclick=\"DeleteFile('" + response + "','" + vcNomCon + "')\"/>";
                        vcHtml += "<span style='margin-left:5px;' id='span_" + vcNomCon + "' style='text-decoration:underline;' nombre='" + response + "'>" + response + "</span></div>";

                        $(vcHtml).appendTo('#file_' + vcNomCon);

                        $("#upl_" + vcNomCon).hide();
                    } else {
                        alerta('El archivo supera el tamaño máximo permitido (' + $("#hdfTamanoArchivo").val() + 'MB)');
                    }
                },
                onSubmit: function (file, ext) {
                    var lstExt = vcTipExt.split(",");
                    var biExt = "0";
                    var i = 0;
                    for (i = 0; i < lstExt.length; i++) {
                        if (ext.toLowerCase() == lstExt[i].toLowerCase())
                            biExt = "1";
                    }

                    if (biExt == "0") {
                        alerta('Formato inválido. Los formatos permitidos son: ' + vcTipExt);
                        return false;
                    }
                }
            });
        }

        $("#span_" + vcNomCon).live("click", function () {
            var archivo = $(this).attr("nombre");
            fnDescargarArchivo(archivo, 1, null);
        });
    });

    //if ($("#hdfAdmin").val() == "1") {
    //    $("#ddlFase > option").each(function () {
    //        inFin = this.text.indexOf("]");
    //        if (inOrdFin == this.text.substr(1, inFin - 1))
    //            $("#ddlFase").val(this.value);
    //    });
    //
    //    $("#trEstado_Apr").show();
    //}

    //CONTROLES DE LA PAGINAS POR ESTADO DE LA SOLICITUD
    //alert($("#hdfEstado").val() + ", " + $("#hdfEstado_Apr").val());

    //debugger;
    if ($("#hdfEstado").val() == "6" && $("#hdfEstado_Apr").val() == "32") { //Solicitud en estado Pendiente - Pendiente
        $("#ddlFraccionamiento").attr("disabled", false);
        $("#ddlMesesCuotas").attr("disabled", false);
        //Estado - Combo
        $("#ddlEstadoSolicitud").show();
        if ($("#hdfAdmin").val() == "1" || $("#hdfResApr").val() == "1") { //usuario logeado es administrador o responsable de aprobacion
            if ($("#hdfAdmin").val() == "1") {
                $("#txtMonto").attr("disabled", false);
            } else { //else descomentado 17/07/2014 wapumayta (tfs 1412)
                $("#txtMonto").attr("disabled", true);
                //seguridad de usuario propietario
                //                alert("Crear: " + PermisosPropietario[0].Crear + "\nEliminar: " + PermisosPropietario[0].Eliminar + "\nEditar: " + PermisosPropietario[0].Editar);
                if (PermisosPropietario.length > 0) {
                    if (PermisosPropietario[0].Eliminar == "False" && PermisosPropietario[0].Editar == "False") {
                        $("#btnEliminar").button("option", "disabled", true);
                        $("#dvMensajeBotones").show();
                        //$("#lblMensajeBotones").text('Ud. no tiene permiso para editar los datos de esta solicitud o eliminarla pero puede cambiarla al estado "Por Aprobar".');
                        $("#lblMensajeBotones").text('Ud. no tiene permiso para editar los datos de esta solicitud o eliminarla.');
                        DesabilitarControlesPagina();
                    } else if (PermisosPropietario[0].Eliminar == "False") {
                        $("#btnEliminar").button("option", "disabled", true);
                        $("#dvMensajeBotones").show();
                        $("#lblMensajeBotones").text('Ud. no tiene permiso para eliminar esta solicitud.');
                        //DesabilitarControlesPagina();
                    } else if (PermisosPropietario[0].Editar == "False") {
                        $("#dvMensajeBotones").show();
                        $("#lblMensajeBotones").text('Ud. no tiene permiso para editar los datos de esta solicitud pero puede cambiarla de estado.');
                        DesabilitarControlesPagina();
                    }
                }
            }
            $("#ddlEstadoSolicitud").html('');
            $("#ddlEstadoSolicitud").append('<option value="32" selected="true">Pendiente</option><option value="33">Por Aprobar</option><option value="34">Aprobada</option>');
        } else if ($("#hdfPropie").val() == "1" && $("#hdfResApr").val() == "1") { //es porpietario y responsable de aprobacion para el tipode solicitud
            $("#txtMonto").attr("disabled", true);
            $("#ddlEstadoSolicitud").html('');
            $("#ddlEstadoSolicitud").append('<option value="32" selected="true">Pendiente</option><option value="33">Por Aprobar</option><option value="34">Aprobada</option>');
            //seguridad de usuario propietario
            if (PermisosPropietario.length > 0) {
                if (PermisosPropietario[0].Eliminar == "False" && PermisosPropietario[0].Editar == "False") {
                    $("#btnEliminar").button("option", "disabled", true);
                    $("#dvMensajeBotones").show();
                    //$("#lblMensajeBotones").text('Ud. no tiene permiso para editar los datos de esta solicitud o eliminarla pero puede cambiarla al estado "Por Aprobar".');
                    $("#lblMensajeBotones").text('Ud. no tiene permiso para editar los datos de esta solicitud o eliminarla.');
                    DesabilitarControlesPagina();
                } else if (PermisosPropietario[0].Eliminar == "False") {
                    $("#btnEliminar").button("option", "disabled", true);
                    $("#dvMensajeBotones").show();
                    $("#lblMensajeBotones").text('Ud. no tiene permiso para eliminar esta solicitud.');
                    //DesabilitarControlesPagina();
                } else if (PermisosPropietario[0].Editar == "False") {
                    $("#dvMensajeBotones").show();
                    $("#lblMensajeBotones").text('Ud. no tiene permiso para editar los datos de esta solicitud pero puede cambiarla de estado.');
                    DesabilitarControlesPagina();
                }
            }
        } else if ($("#hdfPropie").val() == "1") { //usuario logeado es propietario de solicitud sin permisos de aprobacion
            $("#txtMonto").attr("disabled", true);
            $("#ddlEstadoSolicitud").html('');
            $("#ddlEstadoSolicitud").append('<option value="32" selected="true">Pendiente</option><option value="33">Por Aprobar</option>');
            //seguridad de usuario propietario
            if (PermisosPropietario.length > 0) {
                if (PermisosPropietario[0].Eliminar == "False" && PermisosPropietario[0].Editar == "False") {
                    $("#btnEliminar").button("option", "disabled", true);
                    $("#dvMensajeBotones").show();
                    //$("#lblMensajeBotones").text('Ud. no tiene permiso para editar los datos de esta solicitud o eliminarla pero puede cambiarla al estado "Por Aprobar".');
                    $("#lblMensajeBotones").text('Ud. no tiene permiso para editar los datos de esta solicitud o eliminarla.');
                    DesabilitarControlesPagina();
                } else if (PermisosPropietario[0].Eliminar == "False") {
                    $("#btnEliminar").button("option", "disabled", true);
                    $("#dvMensajeBotones").show();
                    $("#lblMensajeBotones").text('Ud. no tiene permiso para eliminar esta solicitud.');
                    //DesabilitarControlesPagina();
                } else if (PermisosPropietario[0].Editar == "False") {
                    $("#dvMensajeBotones").show();
                    $("#lblMensajeBotones").text('Ud. no tiene permiso para editar los datos de esta solicitud pero puede cambiarla de estado.');
                    DesabilitarControlesPagina();
                }
            }
        } else if ($("#hdfPropie").val() == "0" && $("#hdfUsuarioCreacion").val() == "0" && $("#hdfAdmin").val() == "0") { //si no es propietario o ni usuario de creación
            $("#btnGuardar").hide();
            $("#btnEliminar").hide();
            DesabilitarControlesPagina();
            $("#dvMensajeBotones").show();
            $("#lblMensajeBotones").text('Ud. no es propietario de esta solicitud.');
        } else { //usuario logeado no puede interactuar con la solicitud
            $("#ddlEstadoSolicitud").attr("disabled", true);
            $("#btnGuardar").hide();
            $("#btnEliminar").hide();
            DesabilitarControlesPagina();
        }
        $("#btnAsignar").hide();
    } else if ($("#hdfEstado").val() == "6" && $("#hdfEstado_Apr").val() == "33") { //Solicitud en estado Pendiente - Por Aprobar
        if ($("#hdfAdmin").val() == "1") {
            //$("#txtMonto").attr("disabled", false);
            $("#trFechaAprobacion").show();
            $("#txtFechaAprobacion").attr("disabled", false);
            $("#imgBorrarFechaAprobacion").show();
        } else {
            $("#trFechaAprobacion").show();
            $("#txtFechaAprobacion").attr("disabled", true);
            $("#imgBorrarFechaAprobacion").hide();
        }
        //Estado - Label
        $("#lblEstadoSolicitud").text(Estados[$("#hdfEstado_Apr").val()].Nombre);
        //Botones
        $("#btnAsignar").hide();
        $("#lblBtnGuardar").text("Aprobar");
        $("#btnGuardar").attr("title", "Aprobar");
        $("#imgGuardar").attr("src", '../../../Common/Images/Mantenimiento/Aprobar.png');
        $("#lblBtnEliminar").text("Rechazar");
        $("#btnEliminar").attr("title", "Rechazar");
        $("#imgEliminar").attr("src", '../../../Common/Images/Mantenimiento/Rechazar.png');

        if ($("#hdfAdmin").val() == "1" || $("#hdfResApr").val() == "1") { //usuario logeado es administrador o responsable de aprobacion
            $("#txtMonto").attr("enabled", true);
            $("#trFechaAprobacion").show();
            //if (PermisosTecnico.length > 0) { //usuario logeado tiene algun tipo de permiso para este tipo de solicitud
            //    if (PermisosTecnico[0].Crear == "True" && PermisosTecnico[0].Editar == "True") {
            //        $("#btnGuardar").button("option", "disabled", false);
            //        $("#btnEliminar").button("option", "disabled", false);
            //    } else {
            //        $("#btnGuardar").button("option", "disabled", true);
            //        $("#btnEliminar").button("option", "disabled", true);
            //    }
            //} else { //no tienen ningun tipo de permisos
            //    $("#btnGuardar").button("option", "disabled", true);
            //    $("#btnEliminar").button("option", "disabled", true);
            //    DesabilitarControlesPagina();
            //    $("#dvMensajeBotones").show();
            //    $("#lblMensajeBotones").text('Ud. no tiene permisos de aprobación para este tipo de solicitud.');
            //}
        } else { //si no es administrador o responsable, ocultar los botones de accion
            $("#btnGuardar").hide();
            $("#btnEliminar").hide();
            DesabilitarControlesPagina();
            $("#dvMensajeBotones").show();
            $("#lblMensajeBotones").text('Solicitud en espera de aprobación por parte del Responsable de Aprobación.');
        }
    } else if ($("#hdfEstado").val() == "6" && $("#hdfEstado_Apr").val() == "34") { //Solicitud en estado Pendiente - Aprobada
        //Estado
        $("#lblEstadoSolicitud").text(Estados[$("#hdfEstado").val()].Nombre);
        //Botones
        $("#btnEliminar").hide();
        $("#btnGuardar").hide();
        if ($("#hdfAdmin").val() == "1" || $("#hdfTecnico").val() == "1") { //usuario logeado es administrador o tecnico para el tipo de solicitud
            if (PermisosTecnico.length > 0) { //usuario logeado tiene algun tipo de permiso para este tipo de solicitud
                //if (PermisosTecnico[0].Crear == "True" && PermisosTecnico[0].Editar == "True") {
                if (PermisosTecnico[0].Crear == "True") {
                    $("#btnAsignar").button("option", "disabled", false);
                } else {
                    $("#btnAsignar").button("option", "disabled", true);
                    DesabilitarControlesPagina();
                    $("#dvMensajeBotones").show();
                    $("#lblMensajeBotones").text('Ud. no tiene permisos de asignación para este tipo de solicitud');
                }
            } else {
                $("#btnAsignar").button("option", "disabled", true);
                DesabilitarControlesPagina();
                $("#dvMensajeBotones").show();
                $("#lblMensajeBotones").text('Ud. no es especialista para este tipo de solicitud.');
            }
        } else if ($("#hdfPropie").val() == "1") { //usuario logeado es propietario de solicitud, no es tecnico ni administrador
            $("#btnAsignar").hide();
            DesabilitarControlesPagina();
            $("#dvMensajeBotones").show();
            $("#lblMensajeBotones").text('Solicitud Aprobada, a la espera de asignación a especialista.');
        } else {
            $("#btnAsignar").hide();
            DesabilitarControlesPagina();
            $("#dvMensajeBotones").show();
            $("#lblMensajeBotones").text('Ud. no es especialista.');
        }
    } else if ($("#hdfEstado").val() == "8" && $("#hdfEstado_Apr").val() == "34") { //Solicitud en estado En Proceso - Aprobada

        $("#btnResumen").show();
        $("#btnGuardarPrevio").show();

        //Botones de operador
        if ($("#hdfbiEnviarOperador").val() == "1") {
            $("#btnEnviarOperador").show();
            $("#btnDevueltoOperador").show();
            if (btEnOperRepa == "0") {
                $("#btnEnviarOperador").button("option", "disabled", false);
                $("#btnDevueltoOperador").button("option", "disabled", true);
            } else {
                $("#btnEnviarOperador").button("option", "disabled", true);
                $("#btnDevueltoOperador").button("option", "disabled", false);
            }
        }

        //Fila tipo de monto (Empresa, Empleado)
        ListarParametros('TipoMonto', vcTipoMontoDefault); //listar combo con tipos de monto
        if ($("#hdfIdFInanciamiento").val() != 0) {
            $("#trTipoMonto").show();
            //ListarParametros('TipoMonto', vcTipoMontoDefault); //listar combo con tipos de monto
            if (btTipoMontoSelectable && $("#hdfCodTipSol").val() != "29" && $("#hdfCodTipSol").val() != "30") {
                $("#ddlTipoMonto").attr("disabled", false);
            } else {
                $("#ddlTipoMonto").attr("disabled", true);
            }
        }
        //Estado
        $("#lblEstadoSolicitud").text(Estados[$("#hdfEstado").val()].Nombre);
        //Tecnico Asignado
        if (!solicitudMultipleEspecialista) {
            $("#trTecnico").show();
        }
        $("#bpTecnicoAsignado_txtValorBusqueda").attr("disabled", "disabled");
        $("#bpTecnicoAsignado_imgBusqueda").hide();
        //Botones
        $("#btnAsignar").hide();
        $("#lblBtnGuardar").text("Cerrar ticket");
        $("#btnGuardar").attr("title", "Cerrar ticket");
        $("#imgGuardar").attr("src", '../../../Common/Images/Mantenimiento/Proceso.png');
        $("#lblBtnEliminar").text("Anular");
        $("#btnEliminar").attr("title", "Anular");
        $("#imgEliminar").attr("src", '../../../Common/Images/Mantenimiento/Cancelar.png');

        if ($("#hdfAdmin").val() == "1" || $("#hdfTecnico").val() == "1") { //usuario logeado es administrador o tecnico para el tipo de solicitud
            if ($("#hdfTecnicoAsignado").val() == "1") { //usuario logeado es tecnico asignado
                if (PermisosTecnico.length > 0) { //usuario logeado tiene algun tipo de permiso para este tipo de solicitud
                    if (PermisosTecnico[0].Eliminar == "False" && PermisosTecnico[0].Editar == "False") {
                        $("#btnGuardar").button("option", "disabled", true);
                        $("#btnEliminar").button("option", "disabled", true);
                        $("#btnGuardarPrevio").button("option", "disabled", true); //Guardar antes de procesar
                        $("#btnEnviarOperador").button("option", "disabled", true);
                        $("#btnDevueltoOperador").button("option", "disabled", true);
                        $("#dvMensajeBotones").show();
                        $("#lblMensajeBotones").text('Ud. no tiene permisos para procesar/anular este tipo de solicitud.');
                        $("#lblMensajeBotones").css({ color: '#4297d7' });
                        DesabilitarControlesPagina();
                    } else if (PermisosTecnico[0].Eliminar == "False") {
                        $("#btnGuardar").button("option", "disabled", false);
                        $("#btnEliminar").button("option", "disabled", true);
                        $("#dvMensajeBotones").show();

                        if ($("#hdfCodTipSol").val() == "31" && $("#hdfTipoCese").val() == "1" && parseFloat($("#hdfMontoCese").val()) > 0) {
                            $("#lblMensajeBotones").text('La solicitud no puede ser procesada ya que el empleado tiene pagos pendientes.');
                            $("#btnGuardar").button("option", "disabled", true);
                            DesabilitarControlesPagina();
                        } else {
                            $("#lblMensajeBotones").text('Ud. no tiene permisos para anular este tipo de solicitud.');
                            $("#lblMensajeBotones").css({ color: '#4297d7' });
                        }
                    } else if (PermisosTecnico[0].Editar == "False") {
                        $("#btnGuardar").button("option", "disabled", true);
                        $("#btnEliminar").button("option", "disabled", false);
                        $("#btnGuardarPrevio").button("option", "disabled", true); //Guardar antes de procesar
                        $("#btnEnviarOperador").button("option", "disabled", true);
                        $("#btnDevueltoOperador").button("option", "disabled", true);
                        $("#dvMensajeBotones").show();
                        $("#lblMensajeBotones").text('Ud. no tiene permisos para procesar este tipo de solicitud.');
                        $("#lblMensajeBotones").css({ color: '#4297d7' });
                        DesabilitarControlesPagina();

                    } else if (PermisosTecnico[0].Eliminar == "True" && PermisosTecnico[0].Editar == "True") {
                        if ($("#hdfCodTipSol").val() == "31" && $("#hdfTipoCese").val() == "1" && parseFloat($("#hdfMontoCese").val()) > 0) {
                            $("#dvMensajeBotones").show();
                            $("#lblMensajeBotones").text('La solicitud no puede ser procesada ya que el empleado tiene pagos pendientes.');
                            $("#btnGuardar").button("option", "disabled", true);
                            DesabilitarControlesPagina();
                        }
                    }
                } else {
                    $("#btnGuardar").button("option", "disabled", true);
                    $("#btnEliminar").button("option", "disabled", true);
                    $("#btnGuardarPrevio").button("option", "disabled", true); //Guardar antes de procesar
                    $("#btnEnviarOperador").button("option", "disabled", true);
                    $("#btnDevueltoOperador").button("option", "disabled", true);

                    $("#dvMensajeBotones").show();
                    $("#lblMensajeBotones").text('Ud. no tiene configurado ningún permiso para este tipo de solicitud.');
                }
            } else if ($("#hdfAdmin").val() == "1" || $("#hdfTecnicoResponsable").val()) { //no es tecnico asignado pero puede procesar
                $("#btnGuardar").button("option", "disabled", false);
                $("#btnGuardarPrevio").button("option", "disabled", false); //Guardar antes de procesar
                $("#btnEliminar").button("option", "disabled", false);
                $("#dvMensajeBotones").show();

                if ($("#hdfCodTipSol").val() == "31" && $("#hdfTipoCese").val() == "1" && parseFloat($("#hdfMontoCese").val()) > 0) {
                    $("#lblMensajeBotones").text('La solicitud no puede ser procesada ya que el empleado tiene pagos pendientes.');
                    $("#btnGuardar").button("option", "disabled", true);
                    DesabilitarControlesPagina();
                } else {
                    if (!solicitudMultipleEspecialista) {
                        $("#lblMensajeBotones").text('Ud. no ha sido asignado a esta solicitud.');
                    }
                }
            } else { //es tecnico pero no es tecnico asignado
                $("#btnGuardar").button("option", "disabled", true);
                $("#btnGuardarPrevio").button("option", "disabled", true); //Guardar antes de procesar
                $("#btnEliminar").button("option", "disabled", true);
                $("#btnEnviarOperador").button("option", "disabled", true);
                $("#btnDevueltoOperador").button("option", "disabled", true);
                $("#dvMensajeBotones").show();
                if (!solicitudMultipleEspecialista) {
                    $("#lblMensajeBotones").text('Ud. no ha sido asignado a esta solicitud.');
                }
                DesabilitarControlesPagina();
            }

            if (btEnOperRepa == "1") {
                $("#btnGuardar").button("option", "disabled", true);
                $("#btnGuardarPrevio").button("option", "disabled", true); //Guardar antes de procesar
                $("#btnEliminar").button("option", "disabled", true);
                $("#chkAsignarA").attr("disabled", true);
            }
        } else {
            $("#btnEliminar").hide();
            $("#btnGuardarPrevio").hide();
            $("#btnGuardar").hide();
            $("#btnEnviarOperador").hide();
            $("#btnDevueltoOperador").hide();

            //SE AGREGA VALIDACIÓN PARA QUE NO SE VISUALICEN LOS BOTONES Y BLOQUEAR LAS REFERENCIAS PARA CUANDO EL USUARIO NO ES ADMIN NI TECNICO.
            $("div[title='Buscar (Enter)']").hide();
            $("input.REFERENCIA").attr("disabled", true);

        }
        $("#upl_ArchivoAdjuntoFinal").parent().parent().parent().hide();
    } else { //Solicitudes anuladas, rechazadas o culminadas

        $("#upl_ArchivoAdjuntoFinal").parent().parent().parent().show();

        $("#dvMensajeBotones").show();
        if ($("#hdfEstado_Apr").val() == "35") { //solicitud se rechazó (rechazado por responsable de aprobacion)
            $("#trTecnico").hide();
            $("#trTecnicoCierre").hide();
            $("#lblEstadoSolicitud").text(Estados[$("#hdfEstado_Apr").val()].Nombre);
            $("#lblMensajeBotones").text('La solicitud ha sido rechazada por el responsable de aprobación.');
        } else if ($("#hdfEstado").val() == "9") { //solicitud se anuló (anulado por técnico)
            if (!solicitudMultipleEspecialista) {
                $("#trTecnico").show();
            }
            $("#trTecnicoCierre").show();
            $("#lblEstadoSolicitud").text(Estados[$("#hdfEstado").val()].Nombre);
            //$("#lblMensajeBotones").text('La solicitud ha sido anulada por el especialista.');
            $("#lblMensajeBotones").text($("#hdfMensajeTipoCierre").val());
        } else {
            $("#btnResumen").show();
            if (!solicitudMultipleEspecialista) {
                $("#trTecnico").show();
            }
            $("#trTecnicoCierre").show();
            $("#lblEstadoSolicitud").text(Estados[$("#hdfEstado_Apr").val()].Nombre);
            //$("#lblMensajeBotones").text('La solicitud ha culminado.');
            $("#lblMensajeBotones").text($("#hdfMensajeTipoCierre").val());
            $("#lblMensajeBotones").css({ color: '#4297d7' });
            //$("#lblMensajeBotones").css({ color: '#4297d7', 'font-weight': 'bold' });
        }

        $("#btnGuardarPrevio").show();

        //if ($("#hdfEstado_Apr").val() == "34") { //solicitud se anuló (anulado por técnico)
        //    $("#trTecnico").show();
        //    $("#lblEstadoSolicitud").text(Estados[$("#hdfEstado").val()].Nombre);
        //    $("#lblMensajeBotones").text('La solicitud ha sido anulada por el técnico.');
        //} else if ($("#hdfEstado_Apr").val() == "35") { //solicitud se rechazó (rechazado por responsable de aprobacion
        //    $("#trTecnico").hide();
        //    $("#lblEstadoSolicitud").text(Estados[$("#hdfEstado_Apr").val()].Nombre);
        //    $("#lblMensajeBotones").text('La solicitud ha sido rechazada por el responsable de aprobación.');
        //} else {
        //    $("#lblMensajeBotones").text('La solicitud ha culminado.');
        //}

        //$("#lblEstadoSolicitud").text(Estados[$("#hdfEstado").val()].Nombre);
        $("#btnAsignar").hide();
        $("#btnEliminar").hide();
        $("#btnGuardar").hide();
        $("#btnRefrescar").hide();
        DesabilitarControlesPagina();

        //$("#lblMensajeBotones").text('El ciclo de vida de esta solicitud ya finalizó.');
    }
    //FIN CONTROLES 

    //aqui controlo el botón
    desabilitarBotonCerrarTicketSiEstaEnPausa();

    //Asignacion de Solicitud
    $("#chkAsignarA").change(function () {
        if ($("#hdfEstado").val() == "6") { //solicitud por asignar
            if ($(this).is(":checked")) {
                if (!solicitudMultipleEspecialista) {
                    $("#trTecnico").show();
                }
            } else {
                $("#trTecnico").hide();
            }
        } else { //solicitud en proceso (re-asignar) - agregado 29-09-2014 wapumayta
            $("#lblBtnAsignar").text("Asignar a");
            $("#btnAsignar").attr("title", "Asignar a");
            if ($(this).is(":checked")) {
                $("#btnGuardar").hide();
                $("#btnEliminar").hide();
                $("#btnGuardarPrevio").hide();
                $("#btnAsignar").show();
                $("#bpTecnicoAsignado_txtValorBusqueda").attr("disabled", false);
                $("#bpTecnicoAsignado_imgBusqueda").show();
                tecAsignado = $("#bpTecnicoAsignado_txtValorBusqueda").val();
            } else {
                $("#btnGuardar").show();
                $("#btnEliminar").show();
                $("#btnGuardarPrevio").show();
                $("#btnAsignar").hide();
                $("#bpTecnicoAsignado_txtValorBusqueda").attr("disabled", true);
                $("#bpTecnicoAsignado_imgBusqueda").hide();
                $("#bpTecnicoAsignado_txtValorBusqueda").val(tecAsignado);
            }
        }
    });


    if ($("#hdfFraccionamiento").val() == "1")
        $("#trFraccionamiento").show();
    if ($("#ddlFraccionamiento").val() == "1")
        $("#trMesesCuotas").show();

    $("#ddlFraccionamiento").change(function () {
        if ($("#ddlFraccionamiento").val() == "1")
            $("#trMesesCuotas").show();
        else {
            $("#trMesesCuotas").hide();
            $("#ddlMesesCuotas").val("-1");
        }
    });
    if ($("#hdfMontoFijo").val() == "1") {
        $("#trFraccionamiento").show();
    }
    if ($("#hdfFinaliza").val() == "1" && $("#hdfAdmin").val() == "0")
        $("#btnGuardar").button("option", "disabled", true);



    ObtenerDatos();

    vcValAnt = vcUpdPer;

    $("#btnGuardar").click(function () {
        //debugger;
        //debugger;
        if (solicitudEnPausa) {
            alerta("La solicitud se encuentra en pausa.");
            return;
        }

        var AccionBotonGuardar = $("#lblBtnGuardar").text();

        AccionBotonGuardar = AccionBotonGuardar === "Cerrar ticket" ? "Procesar" : AccionBotonGuardar;
        var arSolPer = [];
        arSolPer.Vacio = "0";

        if (AccionBotonGuardar != "Procesar") {
            const obj = ObtenerDatos();
            arSolPer.Vacio = obj.Vacio;
            arSolPer.LongMin = obj.LongMin;
            //if (arSolPer.Vacio == "1") {
            //    alerta("Debe ingresar todos los datos requeridos");
            //    return;
            //}
        }
        else {
            const obj = ObtenerDatos();
            arSolPer.Vacio = obj.Vacio;
            arSolPer.LongMin = obj.LongMin;

            //if (arSolPer.Vacio == "1") {
            //    alerta("Debe ingresar todos los datos requeridos");
            //    return;
            //}
        }
        

        //if ($("#hdfCodTipSol").val() == "31") {
        //    var lstNumeros = $("#txt_NumerosCesion").val().split(",");
        //    var lstPlanes = $.trim($("#txt_NuevoPlanOperador").val()).split(",");

        //    if ($.trim($("#txt_NuevoPlanOperador").val()) == "" && $.trim($("#txt_NumerosCesion").val()) != "") {
        //        alerta("Debe ingresar los planes respectivos para la(s) " + lstNumeros.length.toString() + " línea(s) respectiva(s). Estos deben estar separados por comas.");
        //        return;
        //    }

        //    if (lstNumeros.length != lstPlanes.length) {
        //        alerta("Debe ingresar " + lstNumeros.length.toString() + " planes.");
        //        return;
        //    }

        //    if ($.trim($("#txt_NumerosCesion").val()) != "") {
        //        var biVacio = "0";
        //        var i = 0;
        //        for (i = 0; i < lstPlanes.length; i++) {
        //            if ($.trim(lstPlanes[i]) == "")
        //                biVacio = "1";
        //        }

        //        if (biVacio == "1") {
        //            alerta("Hay por lo menos un plan inválido");
        //            return;
        //        }
        //    }
        //}

        //validaciones numero de cuotas, periodo de gracia
        var dcMonto;
        var inNumeroCuotas;
        var vcMesesCuotas;

        if ($("#hdfMesesCuotas").val() == '') {
            inNumeroCuotas = $("#txtMesesCuotas").val();
            vcMesesCuotas = '';
        } else {
            inNumeroCuotas = $("#hdfMesesCuotas").val().split(",").length;
            vcMesesCuotas = $("#hdfMesesCuotas").val();
        }

        //if ($("#hdfCodTipSol").val() == "29" || $("#hdfCodTipSol").val() == "30") {
        //    dcMonto = DevuelveNumeroSinFormato($("#txt_ImporteTotal").val(), oCulturaUsuario, false);
        //    arSolPer.inTipoProducto = $("#ddl_TipoProducto").val().split("=")[0];
        //    arSolPer.inTipoProceso = $("#ddl_TipoProceso").val().split("=")[0];
        //    arSolPer.LineaAsociada = $("#bp_MOV_Linea_LineaAsociada_txtValorBusqueda").val();
        //    arSolPer.IMEI = $("#hdfCodTipSol").val() == "29" ? $("#bp_MOV_Dispositivo_IMEI_txtValorBusqueda").val() : "";
        //}
        //else {
        dcMonto = $("#txtMonto").val();
        arSolPer.inTipoProducto = 0;
        arSolPer.inTipoProceso = 0;
        arSolPer.LineaAsociada = $("#bp_MOV_Linea_Linea_txtValorBusqueda").val();
        if (arSolPer.LineaAsociada == undefined) {
            arSolPer.LineaAsociada = "";
        }
        arSolPer.IMEI = "";
        //}

        var NumMinCuo = parseInt($("#hdfNumMinCuo").val());
        var NumMaxCuo = parseInt($("#hdfNumMaxCuo").val());
        var MinPerGra = parseInt($("#hdfMinPerGra").val());
        var MaxPerGra = parseInt($("#hdfMaxPerGra").val());
        if (inNumeroCuotas == "") {
            alerta("El número de cuotas es requerido.");
            $("#txtMesesCuotas").focus();
            return;
        }
        if (inNumeroCuotas != "0" && NumMinCuo != "0" && NumMaxCuo != "0") {
            if (inNumeroCuotas < NumMinCuo || inNumeroCuotas > NumMaxCuo) {
                alerta("El número de cuotas debe estar contenido en el rango especificado.");
                $("#txtMesesCuotas").focus();
                return;
            }
        }
        var inMesesPeriodoGracia = parseInt($("#txtPeriodoGracia").val());
        if ($("#txtPeriodoGracia").val() == "") {
            alerta("El número de meses del periodo de gracia es requerido.");
            $("#txtPeriodoGracia").focus();
            return;
        }
        if (MinPerGra != "0" && MaxPerGra != "0") {
            if (inMesesPeriodoGracia < MinPerGra || inMesesPeriodoGracia > MaxPerGra) {
                alerta("El número de meses del periodo de gracia debe estar contenido en el rango especificado.");
                $("#txtPeriodoGracia").focus();
                return;
            }
        }
        //fin validaciones numero de cuotas, periodo de gracia
        //alert("inMesesPeriodoGracia: " + inMesesPeriodoGracia + "\ninNumeroCuotas: " + inNumeroCuotas);
        arSolPer.vcUpdPer = vcUpdPer.substring(0, vcUpdPer.length - 1);
        arSolPer.biFraccionamiento = $("#ddlFraccionamiento").val();
        //arSolPer.vcMesesCuotas = $("#ddlMesesCuotas").val();
        arSolPer.dcMonto = dcMonto;
        arSolPer.vcMesesCuotas = inNumeroCuotas;

        if (vcAdjuntos == "") {
            vcAdjuntos = obtenerAdjuntosPers();
        }

        //arSolPer.inFas = $("#ddlFase").val();
        arSolPer.vcAdjuntos = vcAdjuntos;
        //var inEstFinal = $("#ddlEstadoSolicitud").val();

        if (arSolPer.LongMin != "OK|") {
            $(this).dialog("close");
            let lstResult = arSolPer.LongMin.split('|');
            alerta("La longitud mínima para el campo es de " + lstResult[1]);
            $("#" + lstResult[0]).focus();
            return;
        }

        if (AccionBotonGuardar == 'Guardar') {
            if ($("#hdfEstado_Apr").val() != $("#ddlEstadoSolicitud").val()) {
                if ($("#ddlEstadoSolicitud").val() == "33")
                    $("#lblMsjConfirmacion").text("La solicitud se guardará con estado 'Por Aprobar' e iniciará su ciclo respectivo. ¿Está seguro de crearla con dicho estado?");
                else if ($("#ddlEstadoSolicitud").val() == "34")
                    $("#lblMsjConfirmacion").text("La solicitud se guardará con estado 'Aprobada' y estará a la espera de ser procesada por un especialista.");

                $('#divMsgConfirmar').dialog({
                    title: "¡Alerta!",
                    modal: true,
                    width: 330,
                    buttons: {
                        "Si": function () {
                            fnAjaxGuardar('Guardar', 'Su solicitud fue guardada con éxito', vcValAnt, arSolPer, $("#hdfEstado_Apr").val(), $("#ddlEstadoSolicitud").val());
                            $(this).dialog("close");
                        },
                        "Cancelar": function () {
                            $(this).dialog("close");
                        }
                    }
                });
            } else {
                fnAjaxGuardar('Guardar', 'Su solicitud fue guardada con éxito', vcValAnt, arSolPer, $("#hdfEstado_Apr").val(), $("#ddlEstadoSolicitud").val());
            }
        } else if (AccionBotonGuardar == 'Aprobar') {
            var FecHor = $("#txtFechaAprobacion").val();
            var day = FecHor.substr(6, 4).toString() + FecHor.substr(3, 2).toString() + FecHor.substr(0, 2).toString();
            var fecApro = "dbo.MOV_f_ConvierteAnsiEnFecha($$$" + day + "$$$)";
            $.ajax({
                type: "POST",
                url: "Adm_ListadoSolicitudes.aspx/AprobarSolicitud",
                data: "{'vcCodSol': '" + $("#hdfCodSol").val() + "', 'vcFecApro': '" + fecApro + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    window.parent.ActualizarGrilla();
                    window.scrollTo(0, 0);
                    indiceTab = window.parent.tab.tabs("option", "selected");
                    SolicitudModificada_EnviarMensaje(result.d, "", "");
                    Mensaje("<br/><h1>La solicitud fue aprobada con éxito</h1><br/>", document, CerroMensaje);
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
            $(this).dialog("close");
        } else if (AccionBotonGuardar == 'Procesar') {


            var TipoDescuento = $("#ddlTipoMonto").val();
            var DivDialog = '';
            if (TipoDescuento == "EMP") {
                //Empleado
                DivDialog = 'divConPro';
            }
            else {
                //Empresa
                DivDialog = 'divConProEmpresa';
            }

            $('#' + DivDialog).dialog({
                title: "Cerrar Solicitud",
                modal: true,
                buttons: {
                    "Si": function () {
                        $(this).dialog("close");
                        $("#dvComentProcesar").dialog({
                            title: "Cerrar ticket",
                            modal: true,
                            width: 500,
                            buttons: {
                                "Cerrar ticket": function () {

                                    if ($.trim($("#txtComentProcesar").val()) == "") {
                                        alerta("Debe ingresar algún comentario");
                                        return;
                                    }

                                    const idTipoCierreSolicitud = $('#ddlTipoCierreSolicitud').val();

                                    if (idTipoCierreSolicitud === "1") {
                                        const obj = ObtenerDatos();
                                        arSolPer.Vacio = obj.Vacio;
                                        arSolPer.LongMin = obj.LongMin;

                                        if (arSolPer.Vacio == "1" || arSolPer.LongMin != "OK|") {
                                            if (arSolPer.Vacio == "1") {
                                                $(this).dialog("close");
                                                alerta("Debe ingresar todos los datos requeridos");
                                                return;
                                            }
                                            if (arSolPer.LongMin != "OK|") {
                                                $(this).dialog("close");
                                                let lstResult = arSolPer.LongMin.split('|');
                                                alerta("La longitud mínima para el campo es de " + lstResult[1]);
                                                return;
                                            }
                                        }



                                        fnAjaxGuardar('Procesar', 'Solicitud cerrada con éxito', vcValAnt, arSolPer, $("#hdfEstado").val(), 7, idTipoCierreSolicitud);
                                    } else {

                                        const arrSolPer = arSolPer;

                                        arrSolPer.inTipoProducto = 0;
                                        arrSolPer.inTipoProceso = 0;
                                        arrSolPer.LineaAsociada = $("#bp_MOV_Linea_Linea_txtValorBusqueda").val();
                                        if (arrSolPer.LineaAsociada == undefined) {
                                            arrSolPer.LineaAsociada = "";
                                        }
                                        arrSolPer.IMEI = "";

                                        fnAjaxGuardar('Anular', 'Solicitud cerrada con éxito', vcValAnt, arrSolPer, $("#hdfEstado").val(), 9, idTipoCierreSolicitud);

                                    }
                                    $(this).dialog("close");
                                },
                            }
                        });
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                }
            });
        }
    });

    $("#btnEliminar").click(function () {
        var AccionBotonEliminar = $("#lblBtnEliminar").text();
        var Comentarios = '';
        var arSolPer = [];
        arSolPer.Vacio = "0";
        arSolPer.LongMin = "OK|";
        ObtenerDatos();
        arSolPer.Vacio = vcVacio;

        //if (arSolPer.Vacio == "1" && AccionBotonEliminar != 'Eliminar') {
        //    alerta("Debe ingresar todos los datos requeridos");
        //    return;
        //}

        arSolPer.vcUpdPer = vcUpdPer.substring(0, vcUpdPer.length - 1);
        arSolPer.biFraccionamiento = $("#ddlFraccionamiento").val();
        //arSolPer.vcMesesCuotas = $("#ddlMesesCuotas").val();
        arSolPer.dcMonto = $("#txtMonto").val();
        //arSolPer.inFas = $("#ddlFase").val();
        arSolPer.vcMesesCuotas = $("#txtMesesCuotas").val();

        if (vcAdjuntos == "") {
            vcAdjuntos = obtenerAdjuntosPers();
        }

        arSolPer.vcAdjuntos = vcAdjuntos;

        if (AccionBotonEliminar == 'Eliminar') {
            $('#divConEli').dialog({
                title: "Eliminar Solicitud",
                modal: true,
                buttons: {
                    "Si": function () {
                        $.ajax({
                            type: "POST",
                            url: "Adm_ListadoSolicitudes.aspx/EliminarSolicitud",
                            data: "{'inCodSol': '" + $("#hdfCodSol").val() + "'," +
                                "'inTipSol': '" + $("#hdfCodTipSol").val() + "'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result) {
                                window.parent.ActualizarGrilla();
                                window.scrollTo(0, 0);
                                indiceTab = window.parent.tab.tabs("option", "selected");
                                SolicitudModificada_EnviarMensaje(result.d, "", "");
                                Mensaje("<br/><h1>La solicitud fue eliminada con éxito</h1><br/>", document, CerroMensaje);
                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                }
            });
        } else if (AccionBotonEliminar == 'Rechazar') {
            $('#divConRec').dialog({
                title: "Rechazar Solicitud",
                modal: true,
                buttons: {
                    "Si": function () {
                        $('#dvRechazar').dialog({
                            title: "Rechazar Solicitud",
                            modal: true,
                            width: 500,
                            buttons: {
                                "Rechazar": function () {
                                    if ($.trim($("#txtComentarios").val()) == "") {
                                        alerta("Debe ingresar algún comentario");
                                        return;
                                    }
                                    $.ajax({
                                        type: "POST",
                                        url: "Adm_ListadoSolicitudes.aspx/RechazarSolicitud",
                                        data: "{'vcCodSol': '" + $("#hdfCodSol").val() + "'," +
                                            "'vcComentarios':'" + $.trim($("#txtComentarios").val()) + "'}",
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "json",
                                        success: function (result) {
                                            window.parent.ActualizarGrilla();
                                            window.scrollTo(0, 0);
                                            indiceTab = window.parent.tab.tabs("option", "selected");
                                            SolicitudModificada_EnviarMensaje(result.d, "", "");
                                            Mensaje("<br/><h1>La solicitud fue rechazada con éxito</h1><br/>", document, CerroMensaje);
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
                        $(this).dialog("close");
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                }
            });
        } else if (AccionBotonEliminar == 'Anular') {
            $('#divConAnu').dialog({
                title: "Anular Solicitud",
                modal: true,
                buttons: {
                    "Si": function () {
                        $(this).dialog("close");

                        $('#dvRechazar').dialog({
                            title: "Anular Solicitud",
                            modal: true,
                            width: 500,
                            buttons: {
                                "Anular": function () {
                                    if ($.trim($("#txtComentarios").val()) == "") {
                                        alerta("Debe ingresar algún comentario");
                                        return;
                                    }

                                    //if ($("#hdfCodTipSol").val() == "29" || $("#hdfCodTipSol").val() == "30") {
                                    //    //dcMonto = DevuelveNumeroSinFormato($("#txt_ImporteTotal").val(), oCulturaUsuario, false);
                                    //    arSolPer.inTipoProducto = $("#ddl_TipoProducto").val().split("=")[0];
                                    //    arSolPer.inTipoProceso = $("#ddl_TipoProceso").val().split("=")[0];
                                    //    arSolPer.LineaAsociada = $("#bp_MOV_Linea_LineaAsociada_txtValorBusqueda").val();
                                    //    arSolPer.IMEI = $("#hdfCodTipSol").val() == "29" ? $("#bp_MOV_Dispositivo_IMEI_txtValorBusqueda").val() : "";
                                    //} else {
                                    //dcMonto = $("#txtMonto").val();
                                    arSolPer.inTipoProducto = 0;
                                    arSolPer.inTipoProceso = 0;
                                    arSolPer.LineaAsociada = $("#bp_MOV_Linea_Linea_txtValorBusqueda").val();
                                    if (arSolPer.LineaAsociada == undefined) {
                                        arSolPer.LineaAsociada = "";
                                    }
                                    arSolPer.IMEI = "";
                                    //}

                                    fnAjaxGuardar('Anular', 'Solicitud anulada con éxito', vcValAnt, arSolPer, $("#hdfEstado").val(), 9);
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
    });

    $("#btnAsignar").click(function () {
        var nomTecAsig;
        nomTecAsig = $("#bpTecnicoAsignado_txtValorBusqueda").val();
        var fnURL;
        if ($("#hdfEstado").val() == "6") { //agregado 29-09-2014
            fnURL = 'Adm_EditarSolicitudPersonalizada.aspx/AsignarSolicitudA';
        } else {
            fnURL = 'Adm_ListadoSolicitudes.aspx/ReasignarSolicitudesA';
        }
        if ($("#hdfTecnico").val() == "1") { //el usuario logeado es técnico
            if ($("#chkAsignarA").is(":checked")) {
                if (TecnicoAsignado == '') {
                    alerta("Debe de seleccionar un especialista");
                    return;
                }
                //Asignar a tecnico seleccoinado
                BloquearPagina(true);
                $.ajax({
                    type: "POST",
                    url: fnURL,
                    data: "{'vcCodSol': '" + $("#hdfCodSol").val() + "', " +
                        "'inCodTipSol': '" + $("#hdfCodTipSol").val() + "', " +
                        "'inUsuAsignado': '" + TecnicoAsignado + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        window.parent.ActualizarGrilla();
                        window.scrollTo(0, 0);
                        SolicitudModificada_EnviarMensaje(result.d, "", "");
                        if ($("#hdfEstado").val() == "6") { //agregado 29-09-2014
                            if (result.d == '-1') {
                                alerta("No se puede asignar la solicitud porque el especialista seleccionado no tiene permisos de procesar y/o anular una solicitud");
                                BloquearPagina(false);
                            } else {
                                indiceTab = window.parent.tab.tabs("option", "selected");
                                Mensaje("<br/><h1>La solicitud fue asignada con éxito</h1><br/><h2>Asignada a: " + result.d.toString() + "</h2>", document, CerroMensaje);
                            }
                        } else {
                            indiceTab = window.parent.tab.tabs("option", "selected");
                            Mensaje("<br/><h1>La solicitud fue asignada con éxito</h1><br/><h2>Asignada a: " + nomTecAsig + "</h2>", document, CerroMensaje);
                        }
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            } else {
                //Asignar a Usuario Logeado (si ve el boton es tecnico)
                $.ajax({
                    type: "POST",
                    url: "Adm_ListadoSolicitudes.aspx/AsignarseSolicitud",
                    data: "{'vcCodSol': '" + $("#hdfCodSol").val() + "'}", //TipoOrigen
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        window.parent.ActualizarGrilla();
                        window.scrollTo(0, 0);
                        indiceTab = window.parent.tab.tabs("option", "selected");
                        SolicitudModificada_EnviarMensaje(result.d, "", "");
                        Mensaje("<br/><h1>La solicitud fue asignada con éxito</h1><br/>", document, CerroMensaje);
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            }
        } else if ($("#hdfAdmin").val() == "1") { //el usuario logeado es administrador
            if (!$("#chkAsignarA").is(":checked")) {
                alerta("Ud. no es especialista para este tipo de solictud, debe de asignar\nla solicitud a un Técnico para este tipo de solicitud");
                $("#chkAsignarA").focus();
                return;
            } else {
                if (TecnicoAsignado == '') {
                    alerta("Debe de seleccionar un especialista");
                    return;
                }
                //Asignar a tecnico seleccoinado
                BloquearPagina(true);
                $.ajax({
                    type: "POST",
                    url: fnURL,
                    data: "{'vcCodSol': '" + $("#hdfCodSol").val() + "', " +
                        "'inCodTipSol': '" + $("#hdfCodTipSol").val() + "', " +
                        "'inUsuAsignado': '" + TecnicoAsignado + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        window.parent.ActualizarGrilla();
                        window.scrollTo(0, 0);
                        SolicitudModificada_EnviarMensaje(result.d, "", "");
                        if ($("#hdfEstado").val() == "6") { //agregado 29-09-2014
                            if (result.d == '-1') {
                                alerta("No se puede asignar la solicitud porque el especialista seleccionado no tiene permisos de procesar y/o anular una solicitud");
                                BloquearPagina(false);
                            } else {
                                indiceTab = window.parent.tab.tabs("option", "selected");
                                Mensaje("<br/><h1>La solicitud fue asignada con éxito</h1><br/><h2>Asignada a: " + result.d.toString() + "</h2>", document, CerroMensaje);
                            }
                        } else {
                            indiceTab = window.parent.tab.tabs("option", "selected");
                            Mensaje("<br/><h1>La solicitud fue asignada con éxito</h1><br/><h2>Asignada a: " + nomTecAsig + "</h2>", document, CerroMensaje);
                        }
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            }
        } else {
            alerta("Ud. no tiene permisos para asignarse una solicitud");
        }
    });

    $("#btnNotas").click(function () {
        var id = $("#hdfCodSol").val();
        //window.top.VentanaNotaSignalRActiva = true;
        //$('#ifNota').attr("src", "Adm_SolicitudNota.aspx?IdSolicitud=" + id);
        //formulario = $('#dvNota').dialog({
        //    title: "Notas de la Solicitud: " + $("#LblCodigo").html(),
        //    height: 570,
        //    width: 700,
        //    modal: true,
        //    close: function (event, ui) {
        //        window.top.VentanaNotaSignalRActiva = false;
        //    }
        //});

        parent.$('#btnNota_' + id).click();
    });

    function fnCerrar() {
        indiceTab = window.parent.tab.tabs("option", "selected");
        window.parent.tab.tabs("remove", indiceTab);
    }

    function fnHayCambios() {
        var vcNuevaCadena = fnArmaCadenaDeControles();
        //        alerta("Inicial: " + vcCadenaControles + " Nueva: " + vcNuevaCadena);

        if (vcCadenaControles != vcNuevaCadena)
            return true;
        else
            return false;
    }

    $("#btnCerrar").click(function () {
        //        fnHayCambios()
        if (fnHayCambios()) {
            confirmacion("Si cierra la ventana, se perderán los cambios realizados. ¿Está seguro de continuar?", fnCerrar, null, "Cerrar ventana");
        } else {
            fnCerrar();
        }
    });

    //detalle de financiamiento
    var wAlto = $(window).height();
    $('#divInfoFinanciamiento').dialog({
        title: "Detalle de Financiamiento",
        width: 575, //  690,
        height: wAlto - 50, //430,
        modal: true,
        resizable: false,
        autoOpen: false,
        buttons: {
            "Cerrar": function () {
                $(this).dialog("close");
            }
        }
    });
    $("#imgInfoFinanciamiento").live("click", function () {
        if ($("#ddlFinanciamiento").val() == 0) return;
        InfoFinanciamiento();
        $('#divInfoFinanciamiento').dialog('open');
    });

    $("#ddlFinanciamiento").change(function () {
        $.ajax({
            type: "POST",
            url: "Adm_EditarSolicitudPersonalizada.aspx/MostrarDatosFInanciamiento",
            data: "{'IdFinanciamiento': '" + $(this).val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                let datFinanc = result.d;
                if (datFinanc != undefined) {
                    if (datFinanc.PagoContado) {
                        $("#trMesesCuotas").hide();
                        $("#txtMesesCuotas").val("0");
                    } else {
                        $("#trMesesCuotas").show();
                        $("#txtMesesCuotas").val(datFinanc.Cuotas);
                        if (datFinanc.MinimoCuotas != 0 && datFinanc.MaximoCuotas != 0) { //Rango de número de cuotas
                            $("#hdfNumMinCuo").val(datFinanc.MinimoCuotas);
                            $("#hdfNumMaxCuo").val(datFinanc.MaximoCuotas);
                            $("#lblMesesCuotas").text("El número de cuotas debe estar en el rango de " + $("#hdfNumMinCuo").val() + " y " + $("#hdfNumMaxCuo").val() + ".");
                        } else if (datFinanc.MesesCuotas != "") { //Meses de Financiamiento Predefinido
                            let lstMeses = datFinanc.MesesCuotas.split(",");
                            //$("#txtMesesCuotas").val('');
                            $("#hdfMesesCuotas").val(datFinanc.MesesCuotas);
                            $("#txtMesesCuotas").val(datFinanc.MesesCuotas.replace("12", "Dic").replace("11", "Nov").replace("10", "Oct").replace("9", "Set").replace("8", "Ago").replace("7", "Jul").replace("6", "Jun").replace("5", "May").replace("4", "Abr").replace("3", "Mar").replace("2", "Feb").replace("1", "Ene"));
                            $("#txtMesesCuotas").attr("disabled", true);
                            $("#txtMesesCuotas").attr("width", lstMeses.length * 21);
                        } else if (datFinanc.Cuotas != 0) { //Número de cuotas preestablecido
                            $("#txtMesesCuotas").val(datFinanc.Cuotas);
                            $("#txtMesesCuotas").attr("disabled", true);
                        }
                    }
                } else {
                    $("#trMesesCuotas").hide();
                    $("#txtMesesCuotas").val("0");
                    $("#trPeriodoGracia").hide();
                    $("#trMontoFijo").hide();
                }

                //PERIODO DE GRACIA
                $("#hdfMinPerGra").val(0);
                $("#hdfMaxPerGra").val(0);
                if (!datFinanc.PeriodoGracia) {
                    $("#trPeriodoGracia").hide();
                    $("#txtPeriodoGracia").val("0");
                } else {
                    $("#trPeriodoGracia").show();
                    if (datFinanc.MinimoMesesPeriodoGracia != 0 && datFinanc.MaximoMesesPeriodoGracia != 0) { //Rango de número de cuotas
                        $("#hdfMinPerGra").val(datFinanc.MinimoMesesPeriodoGracia);
                        $("#hdfMaxPerGra").val(datFinanc.MaximoMesesPeriodoGracia);
                        $("#lblPeriodoGracia").text("El periodo de gracia debe estar en el rango de " + datFinanc.MinimoMesesPeriodoGracia + " y " + datFinanc.MaximoMesesPeriodoGracia + ".");
                    } else if (datFinanc.MesesPeriodoGracia != 0) { //Número de meses de periodo de gracia
                        $("#txtPeriodoGracia").val(datFinanc.MesesPeriodoGracia);
                        $("#txtPeriodoGracia").attr("disabled", true);
                    }
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

    //TIPO DE MONTO
    $("#ddlTipoMonto").change(function () {
        var descTipoMonto = $("#ddlTipoMonto option[value= '" + $(this).val() + "']").attr("desc");
        if (descTipoMonto != undefined && descTipoMonto != null) {
            $("#lblTipoMontoDesc").text(descTipoMonto);

            var variable = $("#ddlTipoMonto").val();
            if (variable == "CIA") {
                $("#trMontoFijo").show();
                $("#trFInanciamiento").hide();
            }
            else {
                $("#trMontoFijo").show();
                $("#trFInanciamiento").show();
            }

        }
    });
    vcCadenaControles = fnArmaCadenaDeControles();


    function InfoFinanciamiento() {
        var wAncho = $(window).width();
        var wAlto = $(window).height();
        $("#ifInfoFinanciamiento").attr("width", 550);
        $("#ifInfoFinanciamiento").attr("height", wAlto - 100);
        $("#ifInfoFinanciamiento").attr("src", "../Mantenimiento/Cam_Mnt_Financiamiento.aspx?Cod=" + $("#ddlFinanciamiento").val() + "&FinancSit=0");
    }

    //InfoFinanciamiento();

    $("#btnRegistrarEscEx").click(function () {
        if ($("#ddlOperadorEnvioExterno").val() == '-1') {
            alerta("Debe seleccionar un operador para el envío.");
            return;
        }
        if ($("#ddlTipoExterno option").length > 0) {
            fnActualizarEnvioOperador($("#ddlTipoExterno").val());
        }
        else {
            alerta("No existe tipos para escalar.");
        }
    });


    if ($("#hdfEstado").val() == 7) {
        //Validar si se muestra el botón grabar...
        if ($("#hdfEsResponsableTI").val() == "1" || $("#hdfAdmin").val() == "1") {
            $("#btnGuardarPrevio").show();
        }
    }


    //Nuevo
    if ($("#hdfCodTipSol").val() == "12" || $("#hdfCodTipSol").val() == "14") {
        if ($("#hdfEsResponsableTI").val() == "1" || $("#hdfAdmin").val() == "1") {
            //$("#btnDescargarFormatoAsignacion").show();
        }
    }
    $("#btnDescargarFormatoAsignacion").click(function () {
        GenerarFormatoAsignacion($("#hdfCodTipSol").val(), $("#hdfCodSol").val());
    });

    if ($("#hdfTabla").val() == "PrestamoEquipo") {
        $("#btnValeResguardo").show();
    }


    $("#btnValeResguardo").click(function () {
        var Linea = $("#bp_MOV_Linea_Linea_txtValorBusqueda").val();
        GenerarResguardo(Linea);
    });


    //console.log("hfdUsaFinanciamiento: ", $("#hfdUsaFinanciamiento").val());
    if (($("#hfdUsaFinanciamiento").val() == "True" || $("#hfdUsaFinanciamiento").val() == "true" || $("#hfdUsaFinanciamiento").val() == "1") &&
        ($("#hdfEstado").val() == 7 || $("#hdfEstado").val() == 8 || $("#hdfEstado").val() == 9)) {
        $("#trFInanciamiento").show();
    }
    else {
        $("#trFInanciamiento").hide();
        $("#trMesesCuotas").hide();
        $("#trFraccionamiento").hide();
        $("#trTipoMonto").hide();
        $("#trMontoFijo").hide();
        $("#trPeriodoGracia").hide();
    }


    //var variable = $("#ddlTipoMonto").val();
    //if (variable == "CIA") {
    //    $("#trMontoFijo").show();
    //    $("#trFInanciamiento").hide();
    //}
    //else {
    //    $("#trMontoFijo").show();
    //    $("#trFInanciamiento").show();
    //}
    //debugger;
    ObtenerDatosInicio();


    let control_valida;
    let controles_validar = document.getElementsByClassName("ctrlValida");
    for (let i = 0; i < controles_validar.length; i++) {
        control_valida = controles_validar[i];
        control_valida.onkeypress = function (e) {

            funcionValida = this.getAttribute("funValida");
            //debugger;
            switch (funcionValida) {
                case "alfanumerico":
                    return soloAlfaNumerico(e);
                    break;
                case "solonumero":
                    return soloNumeros(e);
                    break;
                case "solotexto":
                    return soloAlfabetico(e);
                    break;
                default:
                    break;
            }

        };
    }

    //agrega formato de configuracion regional a todos los campos que sean decimal.
    $("input.DECIMAL").each(function (i) {
        //debugger;
        ValidarNumeroEnCajaTexto2(this.id, ValidarDecimal2, oCulturaUsuario, false);
        var dato = $.trim($("#" + this.id).val());
        $("#" + this.id).val(FormatoNumero(dato, oCulturaUsuario, false));
    });


    //CAMBIO TEMPORAL, PORQUE SE HACÍA TARDE PARA EL CLIENTE
    $("#ddl_ServicioSolicitar").live("change", function (e) {
        //debugger;
        if ($("#hdfCodTipSol").val() == "38") { //solicitud pers roaming
            if ($("#" + this.id + " option:selected").val() == "Megas") {
                $("#txt_PaisesDestino").parent().parent().hide();
                $("#txt_FechaInicio").parent().parent().hide();
                $("#txt_FechaFin").parent().parent().hide();

                $("#txt_PaisesDestino").removeClass("REFERENCIA OBLIGATORIO");
                $("#txt_FechaInicio").removeClass("REFERENCIA OBLIGATORIO");
                $("#txt_FechaFin").removeClass("REFERENCIA OBLIGATORIO");

            }
            else {
                $("#txt_PaisesDestino").parent().parent().show();
                $("#txt_FechaInicio").parent().parent().show();
                $("#txt_FechaFin").parent().parent().show();

                $("#txt_PaisesDestino").addClass("REFERENCIA OBLIGATORIO");
                $("#txt_FechaInicio").addClass("REFERENCIA OBLIGATORIO");
                $("#txt_FechaFin").addClass("REFERENCIA OBLIGATORIO");
            }
        }
    });

    $("#ddl_ServicioSolicitar").change();



    $("#btnSolicitarAutorizacion").click(function () {
        let tipoEvento = "1";
        let titulo = "Solicitar Autorización";
        let mensaje = "Se envirá un correo al encargado de autorización. ¿Desea continuar?";
        fnEventosAutorizacion(tipoEvento, titulo, mensaje);
    });

    $("#btnAutorizar").click(function () {
        let tipoEvento = "2";
        let titulo = "Solicitar Autorización";
        let mensaje = "Continuará con el proceso de solicitud. ¿Desea continuar?";
        fnEventosAutorizacion(tipoEvento, titulo, mensaje);
    });

    $("#btnDenegar").click(function () {
        let tipoEvento = "3";
        let titulo = "Solicitar Autorización";
        let mensaje = "Se informará que la solicitud será denegada. ¿Desea continuar?";
        fnEventosAutorizacion(tipoEvento, titulo, mensaje);
    });


});


function fnEventosAutorizacion(tipoEvento, titulo, mensaje) {
    //debugger;
    const data = {
        idSolicitud: $('#hdfCodSol').val(),
        idTipoEvento: tipoEvento
    }

    $("#lblMsjConfirmacion").text(mensaje);
    $('#divMsgConfirmar').dialog({
        title: titulo,
        modal: true,
        width: 330,
        buttons: {
            "Si": function () {
                $(this).dialog("close");
                $.ajax({
                    type: "POST",
                    url: "Adm_EditarSolicitudPersonalizada.aspx/ActualizarSoilcitudAutorizacionPorEvento",
                    data: JSON.stringify(data),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function (result) {
                        //debugger;
                        if (result.d != '') {
                            window.parent.ActualizarGrilla();
                            window.scrollTo(0, 0);
                            indiceTab = window.parent.tab.tabs("option", "selected");
                            Mensaje("<br/>Guardado.</h1><br/>", document, CerroMensaje);
                        }
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });


            },
            "No": function () {
                $(this).dialog("close");
            }
        }
    });
}



function soloNumeros(e) {
    var key = e.keyCode || e.which,
        tecla = String.fromCharCode(key).toLowerCase(),
        letras = "0123456789",
        especiales = [],
        tecla_especial = false;

    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }
}

function soloAlfabetico(e) {
    var key = e.keyCode || e.which,
        tecla = String.fromCharCode(key).toUpperCase(),
        letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        especiales = [32, 8],
        tecla_especial = false;

    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }
}

function soloAlfaNumerico(e) {
    var key = e.keyCode || e.which,
        tecla = String.fromCharCode(key).toUpperCase(),
        letras = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        especiales = [32, 8],
        tecla_especial = false;

    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }
}
//FIN INICIO

/********************INCIO CODIGO DE PAUSA SOLICITUDES***************** */
function iniciaFuncionesPausaSolicitud() {
    //debugger;
    tipoPausaInicial = $('#ddlTipoPausa').val();

    ocultarTabPausaSolicitud();
    if ($('#hdfEstado').val() === "8") {
        solicitudEnPausa = $('#hdfEnPausa').val() === 'True';
        cambiaTextoLabelBotonPausa();
        asignarEventoClickBotonPausaSolicitud();
    }
}



function ocultarTabPausaSiEsUsuario() {
    if ($('#hdfAdmin').val() !== "1" && $('#hdfTecnico').val() !== "1") {
        $("#tbTipoPausa").hide();
    }
}

function ocultarTabPausaSiNoEstaEnProceso() {
    if ($('#hdfEstado').val() !== "8") {
        $('#tbTipoPausa').hide();
    }
}

function asignarEventoClickBotonPausaSolicitud() {
    $('#btnPausaReanuda').click(function () {
        clickBotonPausaSolicitud();
    });
}

function clickBotonPausaSolicitud() {
    solicitudEnPausa === true
        ? ajaxReanudaSolicitud()
        : ajaxPausaSolicitud();
}

function ocultarTabPausaSolicitud() {
    ocultarTabPausaSiNoEstaEnProceso();
    ocultarTabPausaSiEsUsuario();
}

function bloqueaControlesSolicitudEnPausa() {
    //let solicitudEnPausa = $('#hdfEnPausa').val();
    if (solicitudEnPausa === true) {
        $('#ddlTipoPausa').prop("disabled", true);
        $('#btnGuardar').prop("disabled", true);
    } else {
        $('#ddlTipoPausa').prop("disabled", false);
        $('#btnGuardar').prop("disabled", false);
    }
}

function cambiaTextoLabelBotonPausa() {
    if (solicitudEnPausa === true) {
        $('#lblPausaReanuda').text('Reanudar');
    } else {
        $('#lblPausaReanuda').text('Pausar');
    }
}

function ajaxReanudaSolicitud() {

    const data = {
        idSolicitud: $('#hdfCodSol').val()
    }

    $.ajax({
        type: "POST",
        url: "Adm_EditarSolicitudPersonalizada.aspx/ReanudarSolicitud",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            if (result.d === '') {
                window.parent.ActualizarGrilla();
                window.scrollTo(0, 0);
                indiceTab = window.parent.tab.tabs("option", "selected");
                SolicitudModificada_EnviarMensaje(result.d, "", "");
                Mensaje("<br/><h1>" + "La solicitud ha sido reanudada." + "</h1><br/>", document, CerroMensaje);

            } else {
                //window.parent.ActualizarGrilla();
                //window.scrollTo(0, 0);
                //indiceTab = window.parent.tab.tabs("option", "selected");
                SolicitudModificada_EnviarMensaje(result.d, "", "");
                //Mensaje("<br/><h1>" + "La solicitud ha sido reanudada." + "</h1><br/>", document, CerroMensaje);
                //alerta(result.d);
            }

            solicitudEnPausa = false;
            //bloqueaControlesSolicitudEnPausa();
            cambiaTextoLabelBotonPausa();
            fnGuardarSolicitudPrevio();
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function ajaxPausaSolicitud() {

    $('#dvPausar').dialog({
        title: "Cambio de estado",
        modal: true,
        width: 500,
        buttons: {
            "Guardar": function () {
                if ($.trim($("#txtComentariosPausa").val()) == "") {
                    alerta("Debe ingresar algún comentario");
                    return;
                }
                const data = {
                    idSolicitud: $('#hdfCodSol').val(),
                    idTipoPausa: $('#ddlTipoPausa').val(),
                    mensajePausa: $("#txtComentariosPausa").val()
                }

                $.ajax({
                    type: "POST",
                    url: "Adm_EditarSolicitudPersonalizada.aspx/PausarSolicitud",
                    data: JSON.stringify(data),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        if (result.d == '') {
                            window.parent.ActualizarGrilla();
                            window.scrollTo(0, 0);
                            indiceTab = window.parent.tab.tabs("option", "selected");
                            SolicitudModificada_EnviarMensaje(result.d, "", "");
                            Mensaje("<br/><h1>" + "La solicitud ha sido pausada." + "</h1><br/>", document, CerroMensaje);

                        }
                        //else {
                        //window.parent.ActualizarGrilla();
                        //window.scrollTo(0, 0);
                        //indiceTab = window.parent.tab.tabs("option", "selected");
                        //SolicitudModificada_EnviarMensaje(result.d, "", "");
                        //Mensaje("<br/><h1>" + "La solicitud ha sido pausada." + "</h1><br/>", document, CerroMensaje);
                        //alerta(result.d);
                        //return;
                        //}

                        solicitudEnPausa = true;
                        //bloqueaControlesSolicitudEnPausa();
                        cambiaTextoLabelBotonPausa();
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });

                $(this).dialog("close");
                fnGuardarSolicitudPrevio();
            },
            "Cancelar": function () {
                $(this).dialog("close");
            }
        }
    });


}

function validaSiHayCambiosEnElFormulario() {
    //debugger;
    ObtenerDatos();

    if (vcUpdPerFinal === vcUpdPerInicial) {
        return false;
    }

    return true;
}

function desabilitarBotonCerrarTicketSiEstaEnPausa() {
    if ($('#hdfEstado').val() !== "8") {
        return;
    }

    if (!solicitudEnPausa) {
        return
    }

    $("#btnGuardar").button("option", "disabled", true);

}

/********************FIN CODIGO DE PAUSA SOLICITUDES***************** */

function GenerarFormatoAsignacion(IdTipoSolicitud, IdSolicitud) {
    //Validar datos...
    if (IdTipoSolicitud != "1" && IdTipoSolicitud != "2" && IdTipoSolicitud != "12" && IdTipoSolicitud != "14") {
        alerta("Este formato sólo es generado para solicitudes de tipo 'Nueva línea', 'Cambio Equipo', 'Cambio de Cuenta' o 'Cambio de Plan'");
        return;
    }
    var pagina = "../Adm_ReporteDevExpress.aspx?vcTab=MOV_Solicitud&vcTipRep=3&IdSolicitud=" + IdSolicitud;
    $("#ifReporteFormato").attr("src", pagina);
}

function fnConfirmacionActualizarEnvioOperador(vcTitulo) {
    var vcNuevaCadena = fnArmaCadenaDeControles();
    var vcMensaje = "";

    //    alerta("Inicial: " + vcCadenaControles + "Nueva: " + vcCadenaControles);

    if (btActOpe) { //Enviar a operador
        if (vcCadenaControles == vcNuevaCadena) {
            vcMensaje = "Al enviar esta solicitud al operador, la solicitud no podrá ser editada hasta que esta sea devuelta por el operador. ¿Está seguro de continuar?";
        } else {
            vcMensaje = "Al pasar la solicitud a 'Enviada a operador', se perderán los cambios realizados y la solicitud no podrá ser editada hasta que esta sea devuelta por el operador. ¿Está seguro de continuar?";
        }
    } else { //Devuelto por operador
        $("#dvSeleccionOperador").hide();
        if (vcCadenaControles == vcNuevaCadena) {
            vcMensaje = "Esta solicitud, al ser devuelta por el operador, podrá continuar con su ciclo de proceso (ser procesada o anulada). ¿Está seguro de continuar?";
        } else {
            vcMensaje = "Al pasar la solicitud a 'Devuelto por operador', se perderán los cambios realizados y la solicitud podrá continuar con su ciclo de proceso (ser procesada o anulada). ¿Está seguro de continuar?";
        }
    }

    if ($("#hdfBiEscalamiento").val() == "1" && btActOpe) {
        fnEscalarExterno();
    } else {
        $("#lblMensajeEnvioOperador").html(vcMensaje);
        $('#dvConfirmacionEnvioOperador').dialog({
            title: vcTitulo,
            modal: true,
            width: 330,
            buttons: {
                "Si": function () {
                    if ($("#ddlOperadorEnvio").val() == '-1' && btActOpe) {
                        alerta("Seleccione un operador para poder continuar.");
                        return;
                    } else {
                        fnActualizarEnvioOperador();
                        $(this).dialog("close");
                    }

                },
                "No": function () {
                    $(this).dialog("close");
                }
            }
        });
        //confirmacion(vcMensaje, fnActualizarEnvioOperador, null, vcTitulo);
    }
}

function ObtenerDatos() {

    var arSolPer = [];
    vcUpdPer = "";
    vcUpdPerFinal = "";
    vcVacio = "0";
    vcAdjuntos = "";

    var vcLongMin = "OK|";

    arSolPer.Vacio = "0";
    arSolPer.LongMin = "OK|";

    $(".PERIODO").each(function (i) {
        //if (this.value != "" && $(this).is(":disabled") == false) {
        if ($(this).is(":disabled") == false) {
            if ($(this).attr("oblig") == "True" && this.value == "") {
                vcVacio = "1";
            } else {
                if ($(this).attr("obj") != undefined) {
                    var FecHor = this.value;
                    if (this.value == '') {
                        FecHor = '01/01/1900';
                    }
                    var day = FecHor.substr(3, 4).toString() + FecHor.substr(0, 2).toString() + "01";
                    vcUpdPer += "[" + $(this).attr("obj") + "]=" + "dbo.MOV_f_ConvierteAnsiEnFecha($$$" + day + "$$$),";
                    vcUpdPerFinal += "[" + $(this).attr("obj") + "]=" + "dbo.MOV_f_ConvierteAnsiEnFecha($$$" + day + "$$$),";

                }
            }
        }
    });

    $(".DATE").each(function (i) {
        //if (this.value != "" && $(this).is(":disabled") == false) {
        if ($(this).is(":disabled") == false) {
            if ($(this).attr("oblig") == "True" && this.value == "") {
                vcVacio = "1";
            } else {
                if ($(this).attr("obj") != undefined) {
                    var FecHor = this.value;
                    if (this.value == '') {
                        FecHor = '01/01/1900';
                    }
                    var day = FecHor.substr(6, 4).toString() + FecHor.substr(3, 2).toString() + FecHor.substr(0, 2).toString();
                    vcUpdPer += "[" + $(this).attr("obj") + "]=" + "dbo.MOV_f_ConvierteAnsiEnFecha($$$" + day + "$$$),";
                    vcUpdPerFinal += "[" + $(this).attr("obj") + "]=" + "dbo.MOV_f_ConvierteAnsiEnFecha($$$" + day + "$$$),";

                }
            }
        }
    });
    $(".DATETIME").each(function (i) {
        //if (this.value != "" && $(this).is(":disabled") == false) {
        if ($(this).is(":disabled") == false) {
            if ($(this).attr("oblig") == "True" && this.value == "") {
                vcVacio = "1";
            } else {
                if ($(this).attr("obj") != undefined) {
                    var FecHor = this.value;
                    var day = FecHor.substr(6, 4).toString() + FecHor.substr(3, 2).toString() + FecHor.substr(0, 2).toString();
                    var hora = FecHor.substr(11, 2) + ":" + FecHor.substr(14, 2) + ":" + FecHor.substr(17, 2);
                    vcUpdPer += "[" + $(this).attr("obj") + "]=" + "dbo.MOV_f_ConvierteAnsiEnFecha($$$" + day + " " + hora + "$$$),";
                    vcUpdPerFinal += "[" + $(this).attr("obj") + "]=" + "dbo.MOV_f_ConvierteAnsiEnFecha($$$" + day + " " + hora + "$$$),";
                }
            }
        }
    });
    $(".PICKLIST").each(function (i) {
        //if (this.value != "" && this.value != "-1" && $(this).is(":disabled") == false) {
        //if ($(this).is(":disabled") == false || (($("#hdfCodTipSol").val() == "29" || $("#hdfCodTipSol").val() == "30") && $(this).attr("obj") == "Periodo") ) {
        //if (($(this).is(":disabled") == false) || ($("#hdfCodTipSol").val() == "30" && $(this).attr("obj") == "TipoProducto")) {
        if (($("#hdfCodTipSol").val() == "30" && $(this).attr("obj") == "TipoProducto")) {
            if ($(this).attr("oblig") == "True" && (this.value == "" || this.value == "-1")) {
                vcVacio = "1";
                //} else if (($("#hdfCodTipSol").val() == "29" || $("#hdfCodTipSol").val() == "30") && $(this).attr("obj") == "TipoProducto" && this.value == "0=Seleccione") { //Es devoluci[on, el campo es tipoproducto y no ha elegido valor valido, se considera como vacio
                //    vcVacio = "1";
            } else {
                if ($(this).attr("obj") != undefined) {
                    vcUpdPer += "[" + $(this).attr("obj") + "]=" + "$$$" + this.value + "$$$,";
                    vcUpdPerFinal += "[" + $(this).attr("obj") + "]=" + "$$$" + this.value + "$$$,";
                }
            }
        }
        else{
            if ($(this).attr("oblig") == "True" && (this.value == "" || this.value == "-1")) {
                vcVacio = "1";
                //} else if (($("#hdfCodTipSol").val() == "29" || $("#hdfCodTipSol").val() == "30") && $(this).attr("obj") == "TipoProducto" && this.value == "0=Seleccione") { //Es devoluci[on, el campo es tipoproducto y no ha elegido valor valido, se considera como vacio
                //    vcVacio = "1";
            } else {
                if ($(this).attr("obj") != undefined) {
                    vcUpdPer += "[" + $(this).attr("obj") + "]=" + "$$$" + this.value + "$$$,";
                    vcUpdPerFinal += "[" + $(this).attr("obj") + "]=" + "$$$" + this.value + "$$$,";
                }
            }
        }
    });
    $(".BIT").each(function (i) {
        //if (this.value != "" && this.value != "-1" && $(this).is(":disabled") == false) {
        //if ($(this).is(":disabled") == false) {
        if ($(this).attr("oblig") == "True" && (this.value == "" || this.value == "-1")) {
            vcVacio = "1";
        } else {
            if (this.value != "") {
                if ($(this).attr("obj") != undefined) {
                    vcUpdPer += "[" + $(this).attr("obj") + "]=" + this.value + ",";
                    vcUpdPerFinal += "[" + $(this).attr("obj") + "]=" + this.value + ",";
                }
            }
        }
        //}
    });
    $(".INT").each(function (i) {
        //if (this.value != "" && $(this).is(":disabled") == false) {
        if ($(this).is(":disabled") == false) {
            if ($(this).attr("oblig") == "True" && this.value == "") {
                vcVacio = "1";
            } else {
                if ($(this).attr("obj") != undefined) {
                    if (this.value != "") {
                        vcUpdPer += "[" + $(this).attr("obj") + "]=" + this.value + ",";
                        vcUpdPerFinal += "[" + $(this).attr("obj") + "]=" + this.value + ",";
                    } else {
                        var nwValue = 'null';
                        vcUpdPer += "[" + $(this).attr("obj") + "]=" + nwValue + ",";
                        vcUpdPerFinal += "[" + $(this).attr("obj") + "]=" + nwValue + ",";
                    }
                }
            }
        }
    });
    $(".DECIMAL").each(function (i) {
        //if (this.value != "" && $(this).is(":disabled") == false) {
        if ($(this).is(":disabled") == false) {
            if ($(this).attr("oblig") == "True" && this.value == "") {
                vcVacio = "1";
            } else {
                if ($(this).attr("obj") != undefined) {
                    if (this.value != "") {
                        vcUpdPer += "[" + $(this).attr("obj") + "]=" + DevuelveNumeroSinFormato(this.value, oCulturaUsuario, false) + ",";
                        vcUpdPerFinal += "[" + $(this).attr("obj") + "]=" + DevuelveNumeroSinFormato(this.value, oCulturaUsuario, false) + ",";
                    } else {
                        var nwValue = 'null';
                        vcUpdPer += "[" + $(this).attr("obj") + "]=" + nwValue + ",";
                        vcUpdPerFinal += "[" + $(this).attr("obj") + "]=" + nwValue + ",";
                    }
                }
            }

        }
    });
    $(".VARCHAR").each(function (i) {
        //if (this.value != "" && $(this).is(":disabled") == false) {
        if ($(this).is(":disabled") == false) {
            if ($(this).attr("oblig") == "True" && $.trim(this.value) == "") {
                vcVacio = "1";
            } else {
                if ($(this).attr("obj") != undefined) {
                    vcUpdPer += "[" + $(this).attr("obj") + "]=" + "$$$" + this.value + "$$$,";
                    vcUpdPerFinal += "[" + $(this).attr("obj") + "]=" + "$$$" + this.value + "$$$,";
                }
            }
            if (!(this.value.length == 0)) {
                if (vcLongMin == "OK|") {
                    let longCampo = $(this).attr("longMin");
                    if (this.value.length < parseInt(longCampo)) {
                        vcLongMin = this.id + '|' + longCampo;
                        document.getElementById(this.id).focus();
                    }
                }
            }
        }
    });
    $(".VARBINARY").each(function (i) {
        var vcNomCon = $(this).attr("obj");

        if ($(this).hasClass("imgButton")) { //habilitado
            if ($(this).attr("oblig") == "True" && $('#file_' + vcNomCon).text() == "") {
                vcVacio = "1";
            } else {
                vcAdjuntos += "[" + $(this).attr("obj") + "],";
                vcAdjuntos += $('#file_' + vcNomCon).text() + ";";
            }
        }
    });

    //Valoes de campos tipo dato Referencia
    $("input[type=hidden]").each(function (i) {
        var gl = $(this).attr("id").split("__");
        if (gl[0] == "ValHdf" && gl[1].indexOf("_IdDescripcion") == -1) {
            if (gl[2] == "True" && this.value == "") {
                vcVacio = "1";
            } else {
                if (this.value != '' && gl[1].toString() != '') {
                    vcUpdPer += "[" + gl[1].toString() + "]=" + "$$$" + this.value + "$$$,";
                }
            }
        }
    });

    $(".REFERENCIA.OBLIGATORIO").each(function (i) {
        //if ($(this).is(":disabled") == false) {
        if ($.trim(this.value) == "") {
            vcVacio = "1";
        }
        //}
    });

    debugger;
    $(".REFERENCIA").each(function (i) {
        if ($(this).attr("nomtab") != undefined && $(this).attr("nomtab") != '' && $(this).attr("nomtab") != 'undefined') {
            let nomCampo = $(this).attr("id").replace("bp_" + $(this).attr("nomtab") + "_", "").replace("_txtValorBusqueda", "");
            let nomCampoHidden = nomCampo + "_IdDescripcion";
            let oblig = $(this).hasClass("OBLIGATORIO") ? "1" : "0";
            //let hdfVal = "#ValHdf__" + nomCampo + "__" + oblig;
            let ValorHDF = $(this).val();

            vcUpdPer += "[" + nomCampoHidden + "]=" + "$$$" + ValorHDF + "$$$,";
            vcUpdPerFinal += "[" + nomCampoHidden + "]=" + "$$$" + ValorHDF + "$$$,";
        }
    });

    arSolPer.Vacio = vcVacio;
    arSolPer.LongMin = vcLongMin;


    return arSolPer;
}

function obtenerAdjuntosPers() {
    let vcAdjuntos = "";
    $(".VARBINARY").each(function (i) {
        var vcNomCon = $(this).attr("obj");

        if ($(this).hasClass("imgButton")) { //habilitado
            if ($(this).attr("oblig") == "True" && $('#file_' + vcNomCon).text() == "") {
                vcVacio = "1";
            } else {
                vcAdjuntos += "[" + $(this).attr("obj") + "],";
                vcAdjuntos += $('#file_' + vcNomCon).text() + ";";
            }
        }
    });
    return vcAdjuntos;
}

function ObtenerDatosInicio() {
    //debugger;
    vcUpdPerInicial = "";
    vcVacioInicial = "0";
    vcAdjuntosInicial = "";

    $(".PERIODO").each(function (i) {
        //if (this.value != "" && $(this).is(":disabled") == false) {
        if ($(this).is(":disabled") == false) {
            if ($(this).attr("obj") != undefined) {
                var FecHor = this.value;
                if (this.value == '') {
                    FecHor = '01/01/1900';
                }
                var day = FecHor.substr(3, 4).toString() + FecHor.substr(0, 2).toString() + "01";
                vcUpdPerInicial += "[" + $(this).attr("obj") + "]=" + "dbo.MOV_f_ConvierteAnsiEnFecha($$$" + day + "$$$),";

            }
        }
    });

    $(".DATE").each(function (i) {
        //if (this.value != "" && $(this).is(":disabled") == false) {
        if ($(this).is(":disabled") == false) {
            if ($(this).attr("obj") != undefined) {
                var FecHor = this.value;
                if (this.value == '') {
                    FecHor = '01/01/1900';
                }
                var day = FecHor.substr(6, 4).toString() + FecHor.substr(3, 2).toString() + FecHor.substr(0, 2).toString();
                vcUpdPerInicial += "[" + $(this).attr("obj") + "]=" + "dbo.MOV_f_ConvierteAnsiEnFecha($$$" + day + "$$$),";

            }
        }
    });
    $(".DATETIME").each(function (i) {
        //if (this.value != "" && $(this).is(":disabled") == false) {
        if ($(this).is(":disabled") == false) {
            if ($(this).attr("oblig") == "True" && this.value == "") {
                vcVacio = "1";
            } else {
                if ($(this).attr("obj") != undefined) {
                    var FecHor = this.value;
                    var day = FecHor.substr(6, 4).toString() + FecHor.substr(3, 2).toString() + FecHor.substr(0, 2).toString();
                    var hora = FecHor.substr(11, 2) + ":" + FecHor.substr(14, 2) + ":" + FecHor.substr(17, 2);
                    vcUpdPerInicial += "[" + $(this).attr("obj") + "]=" + "dbo.MOV_f_ConvierteAnsiEnFecha($$$" + day + " " + hora + "$$$),";
                }
            }
        }
    });
    $(".PICKLIST").each(function (i) {
        if (($("#hdfCodTipSol").val() == "30" && $(this).attr("obj") == "TipoProducto")) {
            if ($(this).attr("obj") != undefined) {
                vcUpdPerInicial += "[" + $(this).attr("obj") + "]=" + "$$$" + this.value + "$$$,";
            }
        }
    });
    $(".BIT").each(function (i) {
        if (this.value != "") {
            if ($(this).attr("obj") != undefined) {
                vcUpdPerInicial += "[" + $(this).attr("obj") + "]=" + this.value + ",";
            }
        }
    });
    $(".INT").each(function (i) {
        if ($(this).is(":disabled") == false) {
            if ($(this).attr("obj") != undefined) {
                if (this.value != "") {
                    vcUpdPerInicial += "[" + $(this).attr("obj") + "]=" + this.value + ",";
                } else {
                    var nwValue = 'null';
                    vcUpdPerInicial += "[" + $(this).attr("obj") + "]=" + nwValue + ",";
                }
            }
        }
    });
    $(".DECIMAL").each(function (i) {
        if ($(this).is(":disabled") == false) {
            if ($(this).attr("obj") != undefined) {
                if (this.value != "") {
                    vcUpdPerInicial += "[" + $(this).attr("obj") + "]=" + DevuelveNumeroSinFormato(this.value, oCulturaUsuario, false) + ",";
                } else {
                    var nwValue = 'null';
                    vcUpdPerInicial += "[" + $(this).attr("obj") + "]=" + nwValue + ",";
                }
            }

        }
    });
    $(".VARCHAR").each(function (i) {
        if ($(this).is(":disabled") == false) {
            if ($(this).attr("obj") != undefined) {
                vcUpdPerInicial += "[" + $(this).attr("obj") + "]=" + "$$$" + this.value + "$$$,";
            }
        }
    });
    $(".VARBINARY").each(function (i) {
        var vcNomCon = $(this).attr("obj");

        if ($(this).hasClass("imgButton")) { //habilitado
            vcAdjuntos += "[" + $(this).attr("obj") + "],";
            vcAdjuntos += $('#file_' + vcNomCon).text() + ";";
        }
    });

    //Valoes de campos tipo dato Referencia
    $("input[type=hidden]").each(function (i) {
        var gl = $(this).attr("id").split("__");
        if (gl[0] == "ValHdf") {
            if (this.value != '' && gl[1].toString() != '') {
                vcUpdPerInicial += "[" + gl[1].toString() + "]=" + "$$$" + this.value + "$$$,";
            }
        }
    });

    return vcUpdPerInicial;
}

function fnGuardarSolicitudPrevio() {
    var arSolPer = [];
    arSolPer.Vacio = "0";
    arSolPer.LongMin = "OK|";
    ObtenerDatos();
    //var datosInicial = ObtenerDatosInicio();
    arSolPer.Vacio = vcVacio;

    //if (arSolPer.Vacio == "1") {
    //    alerta("Debe ingresar todos los datos requeridos");
    //    return;
    //}

    var dcMonto;
    var inNumeroCuotas;
    var vcMesesCuotas;

    if ($("#hdfMesesCuotas").val() == '') {
        inNumeroCuotas = $("#txtMesesCuotas").val();
        vcMesesCuotas = '';
    } else {
        inNumeroCuotas = $("#hdfMesesCuotas").val().split(",").length;
        vcMesesCuotas = $("#hdfMesesCuotas").val();
    }
    dcMonto = $("#txtMonto").val();
    var NumMinCuo = parseInt($("#hdfNumMinCuo").val());
    var NumMaxCuo = parseInt($("#hdfNumMaxCuo").val());
    var MinPerGra = parseInt($("#hdfMinPerGra").val());
    var MaxPerGra = parseInt($("#hdfMaxPerGra").val());
    var inMesesPeriodoGracia = parseInt($("#txtPeriodoGracia").val());

    arSolPer.vcUpdPer = vcUpdPer.substring(0, vcUpdPer.length - 1);
    arSolPer.biFraccionamiento = $("#ddlFraccionamiento").val();
    arSolPer.dcMonto = dcMonto;
    arSolPer.vcMesesCuotas = inNumeroCuotas;

    if (vcAdjuntos == "") {
        vcAdjuntos = obtenerAdjuntosPers();
    }

    arSolPer.vcAdjuntos = vcAdjuntos;
    arSolPer.inTipoProducto = 0;
    arSolPer.inTipoProceso = 0;

    fnAjaxGuardar('GuardarAntesProcesar', 'Su solicitud fue guardada con éxito', vcValAnt, arSolPer, 0, 0);
}

function fnActualizarEnvioOperador(pTipoExterno) {
    if (pTipoExterno == undefined) {
        $.ajax({
            type: "POST",
            url: "Adm_ProcesarSolicitud.aspx/ActualizarEnvioOperador",
            data: "{'inCodSol': '" + $("#hdfCodSol").val() + "'," +
                "'btEstado': '" + btActOpe + "'," +
                "'vcCodOper':'" + $("#ddlOperadorEnvio").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == '1') {
                    window.parent.ActualizarGrilla();
                    window.scrollTo(0, 0);
                    indiceTab = window.parent.tab.tabs("option", "selected");
                    SolicitudModificada_EnviarMensaje(result.d, "", "");
                    Mensaje("<br/><h1>Su solicitud fue guardada con éxito</h1><br/>", document, CerroMensaje);
                } else {
                    alerta("No se pudo guardar la solicitud por problemas con el financiamiento: '" + result.d + "'.");
                    BloquearPagina(false);
                    return;
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
    else {
        var ActualizarEnvioOperadorExterno_Data = {
            inCodSol: $("#hdfCodSol").val(),
            btEstado: btActOpe,
            pIdTipo: $("#ddlTipoExterno").val(),
            pIdDominio: window.top.$("#hdfCodigoDominio").val(),
            pDescripcion: $("#txt_Descripcion").text(),
            pMotivo: $.trim($("#txtMotivoSol").val()),
            pBiEscalamiento: $.trim($("#hdfBiEscalamiento").val()),
            vcCodOper: $("#ddlOperadorEnvioExterno").val(),
            pCodigoSolicitud: $.trim($("#LblCodigo").text())
        };
        $.ajax({
            type: "POST",
            url: "Adm_ProcesarSolicitud.aspx/ActualizarEnvioOperadorExterno",
            data: JSON.stringify(ActualizarEnvioOperadorExterno_Data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == '1') {
                    window.parent.ActualizarGrilla();
                    window.scrollTo(0, 0);
                    indiceTab = window.parent.tab.tabs("option", "selected");
                    SolicitudModificada_EnviarMensaje(result.d, "", "");
                    Mensaje("<br/><h1>Su solicitud fue guardada con éxito</h1><br/>", document, CerroMensaje);
                } else {
                    //alerta("No se pudo guardar la solicitud por problemas con el financiamiento: '" + result.d + "'.");
                    alerta("No se pudo guardar la solicitud.");
                    BloquearPagina(false);
                    return;
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
}

function DeleteFile(file, vcNomCon) {
    var IdDominio = "-1";
    try {
        IdDominio = window.top.$("#hdfCodigoDominio").val();
    } catch (e) {
        //alert("Error: " + e);
    }
    $.ajax({
        url: "UploadHandler.ashx?file=" + file + "&accion=delete&dominio=" + IdDominio,
        type: "GET",
        cache: false,
        async: true,
        success: function (html) {
            $('#file_' + vcNomCon).html("");
            $("#upl_" + vcNomCon).show();
        }
    });
}

function SaveToDisk(fileURL, fileName) {
    // for non-IE
    if (!window.ActiveXObject) {
        var save = document.createElement('a');
        save.href = raiz(fileURL);
        save.target = '_blank';
        save.download = fileName || fileURL;
        var evt = document.createEvent('MouseEvents');
        evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0,
            false, false, false, false, 0, null);
        save.dispatchEvent(evt);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }

    // for IE
    else if (!!window.ActiveXObject && document.execCommand) {
        //alert(fileURL + "\n" + raiz(fileURL));
        var _window = window.open(raiz(fileURL), "_blank");
        _window.document.close();
        _window.document.execCommand('SaveAs', true, fileName || fileURL);
        _window.close();
    }
}

function fnDescargarArchivo(NomArc, tipo, inIdDet) {
    //Descargar adjunto antes de grabar solicitud
    if (tipo == 1) {

        //        if (result.d == "1") {
        var filePath = "P_Movil/Administrar/Temporal/Solicitudes" + CarpetaDominio + "/" + NomArc;
        SaveToDisk(filePath, NomArc);

        //var filePath = "P_Movil/Administrar/Temporal/Solicitudes/" + NomArc;
        //window.location.href = raiz(filePath);
        //        } 
        //        else {
        //            alerta('No se encontró el archivo a descargar.');
        //            $('#UploadedFile').html("");
        //            $("#UploadButton").show();
        //            vcFileName = "";
        //        }

        //        var filePath = "P_Movil/Administrar/Temporal/Solicitudes/" + NomArc;
        //        $.ajax({
        //            url: raiz(filePath),
        //            success: function (data) {
        //                window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + filePath);
        //            },
        //            error: function (data) {
        //                alerta('No se encontró el archivo a descargar.');
        //                $('#UploadedFile').html("");
        //                $("#UploadButton").show();
        //            }
        //        });
    }
    //    //Descargar adjunto de solicitud grabada
    //    else if (tipo == 2) {
    //        $.ajax({
    //            type: "POST",
    //            url: "Adm_SolicitudNota.aspx/DescargarArchivoBD",
    //            data: "{'inIdDet': '" + inIdDet + "'}",
    //            contentType: "application/json; charset=utf-8",
    //            dataType: "json",
    //            success: function (result) {

    //                var filePath = "P_Movil/Administrar/Temporal/Solicitudes/" + NomArc;
    //                $.ajax({
    //                    url: raiz(filePath),
    //                    success: function (data) {
    //                        window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + filePath);
    //                    },
    //                    error: function (data) {
    //                        alerta('No se encontró el archivo a descargar.');
    //                        $('#UploadedFile').html("");
    //                        $("#UploadButton").show();
    //                        vcFileName = "";
    //                    }
    //                });
    //            },
    //            error: function (xhr, err) {
    //                $("#dvCargando").hide();
    //                alert("Error, Estadow: " + xhr.readyState + "\nEstado: " + xhr.status);
    //            }
    //        });
    //    }
}

function fnMostrarTecnico(valor) {
    TecnicoAsignado = valor;
    vcCadenaControles = fnArmaCadenaDeControles();
}

function fnAjaxGuardar(Accion, MensajeResultado, vcValAnt, arSolPer, estInicial, estFinal, idTipoCierreSolicitud) {
    var inNumeroCuotas;
    var vcMesesCuotas;
    var inMesesPeriodoGracia;
    var vComentarios = '';

    idTipoCierreSolicitud = idTipoCierreSolicitud || "0"; //parametro opcional si no es enviado asigna el valor 0

    if ($("#hdfMesesCuotas").val() == '') {
        inNumeroCuotas = $("#txtMesesCuotas").val();
        vcMesesCuotas = '';
    } else {
        inNumeroCuotas = $("#hdfMesesCuotas").val().split(",").length;
        vcMesesCuotas = $("#hdfMesesCuotas").val();
    }
    if ($("#txtPeriodoGracia").val() == '') {
        inMesesPeriodoGracia = 0;
    } else {
        inMesesPeriodoGracia = $("#txtPeriodoGracia").val();
    }
    if (estFinal == 7) { //procesar
        vComentarios = $("#txtComentProcesar").val();
    } else { //rechazar o anular
        //vComentarios = $("#txtComentarios").val();
        vComentarios = $("#txtComentProcesar").val();
    }

    var _LineaAsociada = "";
    var _IMEI = "";
    if (arSolPer.LineaAsociada) {
        _LineaAsociada = arSolPer.LineaAsociada;
    }
    if (arSolPer.IMEI) {
        _IMEI = arSolPer.IMEI;
    }

    $.ajax({
        type: "POST",
        url: "Adm_EditarSolicitudPersonalizada.aspx/Guardar",
        data: "{'vcCodEmp': '" + $("#hdfCodEmp").val() + "'," +
            "'vcAdmin': '" + $("#hdfAdmin").val() + "'," +
            "'inCodSol': '" + $("#hdfCodSol").val() + "'," +
            "'inCodTipSol': '" + $("#hdfCodTipSol").val() + "'," +
            "'inEstInicial': '" + estInicial + "', " +
            "'inEstFinal': '" + estFinal + "'," +
            "'vcValAnt': '" + vcValAnt + "'," +
            "'vcUpdPer': '" + arSolPer.vcUpdPer + "'," +
            "'biFraccionamiento': '" + arSolPer.biFraccionamiento + "'," +
            "'inNumeroCuotas': '" + inNumeroCuotas + "'," +
            "'dcMonto': '" + arSolPer.dcMonto + "'," +
            "'vcTabla': '" + $("#hdfTabla").val() + "'," +
            "'accion': '" + Accion + "'," +
            "'vcMesesCuotas': '" + vcMesesCuotas + "'," +
            "'inMesesPeriodoGracia': '" + inMesesPeriodoGracia + "'," +
            "'vcComentario': '" + vComentarios + "'," +
            "'vcTipoMonto': '" + $("#ddlTipoMonto").val() + "'," + //tipo monto(empleado,empresa)
            "'vcAdj': '" + arSolPer.vcAdjuntos + "'," +
            "'inTipoProducto': '" + arSolPer.inTipoProducto + "'," +
            "'inTipoProceso': '" + arSolPer.inTipoProceso + "'," +
            "'vcLinea': '" + _LineaAsociada + "'," +
            "'vcIMEI': '" + _IMEI + "'," +
            "'IdFinanciamiento':'" + $("#ddlFinanciamiento").val() + "'," +
            "'IdTipoCierreSolicitud':'" + idTipoCierreSolicitud + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d == '') {
                window.parent.ActualizarGrilla();
                window.scrollTo(0, 0);
                indiceTab = window.parent.tab.tabs("option", "selected");
                SolicitudModificada_EnviarMensaje(result.d, "", "");
                Mensaje("<br/><h1>" + MensajeResultado + "</h1><br/>", document, CerroMensaje);
            } else {
                //alert("La solicitud no pudo ser procesada por problemas con el financiamiento: '" + result.d + "'.");
                alerta(result.d);
                return;
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function CerroMensaje() {
    BloquearPagina(false);
    window.parent.tab.tabs("remove", indiceTab);
}

function DesabilitarControlesPagina() {
    //$("#ddlEstadoSolicitud").attr("disabled", true);
    //$("#ddlFraccionamiento").attr("disabled", true);
    //$("#ddlMesesCuotas").attr("disabled", true);
    $("#txtMesesCuotas").attr("disabled", true);
    $("#txtMonto").attr("disabled", true);
    $("#checkbox").attr("disabled", true);
    $(".DATE").each(function (i) {
        $(this).attr("disabled", true);
    });
    $(".DATETIME").each(function (i) {
        $(this).attr("disabled", true);
    });
    $(".PICKLIST").each(function (i) {
        $(this).attr("disabled", true);
    });
    $(".BIT").each(function (i) {
        $(this).attr("disabled", true);
    });
    $(".INT").each(function (i) {
        $(this).attr("disabled", true);
    });
    $(".DECIMAL").each(function (i) {
        $(this).attr("disabled", true);
    });
    $(".VARCHAR").each(function (i) {
        $(this).attr("disabled", true);
    });
    $(".VARBINARY").each(function (i) {
        $(this).attr("disabled", true);
    });
}

function ListarParametros(Grupo, ValDefault) {
    $.ajax({
        type: "POST",
        url: "Adm_ProcesarSolicitud.aspx/ListarParametros",
        data: "{'vcGrupo': '" + Grupo + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var Parametros;
            switch (Grupo) {
                case 'TipoMonto':
                    $("#ddlTipoMonto").html('');
                    var i = 0;
                    for (i = 0; i < result.d.length; i++) {
                        Parametros = result.d[i];
                        $("#ddlTipoMonto").append($('<option></option>').val(Parametros.Clave).text(Parametros.Valor).attr("desc", Parametros.Descripcion));
                    }
                    $("#ddlTipoMonto").val(ValDefault);
                    $("#lblTipoMontoDesc").text($("#ddlTipoMonto option[value= '" + $("#ddlTipoMonto").val() + "']").attr("desc"));
                    break;
                default:
                    alert("Datos incorrectos al listar parametros");
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnEscalarExterno() {
    $("#txtMotivoSol").val("");
    //$("#dvSeleccionOperadorExterno").show();
    $.ajax({
        type: "POST",
        url: "Adm_ProcesarSolicitud.aspx/ObtenerTiposExternos",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            tiposExternos = result.d;
            $("#ddlTipoExterno").html("");
            if (tiposExternos.length > 0) {
                var i = 0;
                for (i = 0; i < tiposExternos.length; i++) {
                    $("#ddlTipoExterno").append("<option value=\"" + tiposExternos[i].IdTipo.toString() + "\">" + tiposExternos[i].Nombre + "</option>");
                }

                $('#dvEscalarExterno').dialog({
                    title: "Escalar externamente",
                    height: 315,
                    width: 410,
                    modal: true
                });
            }
            else {
                Mensaje("<br/><h1>No existe un canal de atención al cual enviar su incidencia</h1><br/>", document);
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}







function GenerarResguardo(Numero) {
    var IMEI = $("#bp_MOV_Dispositivo_EquipoPrestamo_txtValorBusqueda").val();
    if ($.trim(IMEI) == "") {
        alerta("Debe seleccionar un equipo a prestar");
        return;
    }

    $.ajax({
        url: "../Cam_DespachoEmpleado.aspx/ObtenerDatosResguardoIMEI",
        data: "{'Numero':'" + Numero + "', 'IMEI':'" + IMEI + "'}",
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {

            $("#lblNroConsecutivoAnterior").html("(" + result.d[0].NroConsecutivo + ")");
            try {
                $("#txtNroConsecutivo").val(parseFloat(result.d[0].NroConsecutivo) + 1);
                $("#txtObservaciones").val(result.d[0].Observaciones);
                $("#txtModelo").val(result.d[0].Modelo);
                $("#txtMarca").val(result.d[0].MarcaModelo);
                $("#txtNroServicio").val(result.d[0].P_vcNum);
                $("#txtIMEI").val(result.d[0].P_vcCodIMEI);
                $("#txtSIM").val(result.d[0].SIM);
                $("#txtPIN").val(result.d[0].PIN);
                $("#txtFactura").val(result.d[0].NumeroFactura_OS);
                $("#txtCosto").val(result.d[0].dcMonto_Equipo);
                $("#ddlTipoServicio").val(result.d[0].IdTipoModeloDispositivo);

            } catch (e) {
                //some
            }

            $('#dvGenerarResguardo').dialog({
                title: "Generar Reporte",
                modal: true,
                width: 900,
                buttons: {
                    "Generar": function () {

                        var oDialogo = this;

                        var Accesorios = "";
                        $("[id*=chkAccesorios] input:checked").each(function () {
                            Accesorios += "," + $(this).val();
                        });
                        if (Accesorios.length > 0) {
                            Accesorios = Accesorios.substr(1, Accesorios.length - 1);
                        }
                        var txtFactura = $.trim($("#txtFactura").val());
                        var txtNroConsecutivo = $.trim($("#txtNroConsecutivo").val());
                        var ddlTipoServicio = $("#ddlTipoServicio").val();
                        var txtCosto = $.trim($("#txtCosto").val());
                        var txtMarca = $.trim($("#txtMarca").val());
                        var txtModelo = $.trim($("#txtModelo").val());
                        var txtNroServicio = $.trim($("#txtNroServicio").val());
                        var txtIMEI = $.trim($("#txtIMEI").val());
                        var txtSIM = $.trim($("#txtSIM").val());
                        var txtPIN = $.trim($("#txtPIN").val());
                        var txtObservaciones = $.trim($("#txtObservaciones").val());
                        txtFactura = txtFactura.replace(/'/g, "");
                        txtNroConsecutivo = txtNroConsecutivo.replace(/'/g, "");
                        txtCosto = txtCosto.replace(/'/g, "");
                        txtMarca = txtMarca.replace(/'/g, "");
                        txtModelo = txtModelo.replace(/'/g, "");
                        txtNroServicio = txtNroServicio.replace(/'/g, "");
                        txtIMEI = txtIMEI.replace(/'/g, "");
                        txtSIM = txtSIM.replace(/'/g, "");
                        txtPIN = txtPIN.replace(/'/g, "");
                        txtObservaciones = txtObservaciones.replace(/'/g, "");

                        //if (txtFactura == "") {
                        //    alerta("Debe ingresar un código de factura", "Mensaje", function () {
                        //        $("#txtFactura").focus();
                        //    });
                        //    return;
                        //}
                        if (txtNroConsecutivo == "") {
                            alerta("Debe ingresar un valor", "Mensaje", function () {
                                $("#txtNroConsecutivo").focus();
                            });
                            return;
                        }
                        if (txtCosto == "") {
                            alerta("Debe ingresar un valor", "Mensaje", function () {
                                $("#txtCosto").focus();
                            });
                            return;
                        }
                        if (txtMarca == "") {
                            alerta("Debe ingresar una marca", "Mensaje", function () {
                                $("#txtMarca").focus();
                            });
                            return;
                        }
                        if (txtModelo == "") {
                            alerta("Debe ingresar un modelo", "Mensaje", function () {
                                $("#txtModelo").focus();
                            });
                            return;
                        }
                        if (txtNroServicio == "") {
                            alerta("Debe ingresar un número", "Mensaje", function () {
                                $("#txtNroServicio").focus();
                            });
                            return;
                        }
                        if (txtIMEI == "") {
                            alerta("Debe ingresar un valor", "Mensaje", function () {
                                $("#txtIMEI").focus();
                            });
                            return;
                        }
                        ////if (txtSIM == "") {
                        ////    alerta("Debe ingresar un valor", "Mensaje", function () {
                        ////        $("#txtSIM").focus();
                        ////    });
                        ////    return;
                        ////}
                        ////if (txtPIN == "") {
                        ////    alerta("Debe ingresar un valor", "Mensaje", function () {
                        ////        $("#txtPIN").focus();
                        ////    });
                        ////    return;
                        ////}
                        if (txtObservaciones == "") {
                            alerta("Debe ingresar un valor", "Mensaje", function () {
                                $("#txtObservaciones").focus();
                            });
                            return;
                        }


                        $.ajax({
                            url: "../Cam_DespachoEmpleado.aspx/GuardarDatosResguardo",
                            data: "{'Factura':'" + txtFactura + "','NroConsecutivo':'" + txtNroConsecutivo + "','TipoServicio':'" + ddlTipoServicio + "'," +
                                "'Costo':'" + txtCosto + "','Marca':'" + txtMarca + "', 'Modelo':'" + txtModelo + "'," +
                                "'NroServicio':'" + txtNroServicio + "','IMEI':'" + txtIMEI + "', 'SIM':'" + txtSIM + "'," +
                                "'PIN':'" + txtPIN + "','Observaciones':'" + txtObservaciones + "','Accesorios':'" + Accesorios + "'}",
                            dataType: "json",
                            type: "post",
                            contentType: "application/json; charset=utf-8",
                            success: function (result) {

                                var pagina = "../Adm_ReporteDevExpress.aspx?vcTab=MOV_Solicitud&vcTipRep=2&IdResguardo=" + result.d;
                                $("#ifReporteFormato").attr("src", pagina);

                                $(oDialogo).dialog("close");


                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });

                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                }
            });

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function SolicitudModificada_EnviarMensaje(idSolicitud, mensaje, usuario) {
    //Enviar datos via websocket...
    try {
        var _iddominio = window.top.$("#hdfCodigoDominio").val();
        var _mensaje = usuario + '|' + mensaje;
        window.top.ChatHubSignal.server.sendMessageSolicitudModificada(_iddominio, idSolicitud, _mensaje);
    } catch (e) {
        //
    }
}