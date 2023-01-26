//data lineas
var vServiciosLinea = ''; //agegado 25-11-2014 wapumayta
var DataLineas = [];
var Lineas = [];
var datosInicio = "";
var ServiciosLinSel = [];
//facturacion lineas
var MesesContratoFactLInea = 0;
var MontoFactLinea = 0;
var oCulturaLocal = window.parent.parent.oCulturaUsuario;
var vcCadenaControles = "";
var biCadConAct = false;
var biSerLinSol = true;
var btActOpe;
var tbServAmpliacion;
//alerta focus - agregado 02-10-2015 wapumayta
var ControlFocusAlerta = '';

//JHERRERA 20160823: Se pidió cambio para chile
var inMostrarNumCuotas = 0;
var IdModeloSolicitado = "";

var CondicionJQuery_CambioEquipoPlan = "";
var CondicionJQuery_CambioEquipoCuenta = "";

let solicitudMultipleEspecialista = false;
let tipoPausaInicial;
let solicitudEnPausa = false;
var solicitudCulminada = false;

function Dispositivo() {
    this.P_vcCodIMEI;
    this.inCodModDis;
    this.vcNomModDis;
    this.btSopLin;
    this.dispSopLin;
}

function AnularSolicitud(data) {
    if ($.trim($("#txtComentProcesar").val()) == "") {
        alerta("Debe ingresar algún comentario", "Solicitud", null, "warning");
        return;
    }
    BloquearPagina(true);


    var vcAdjuntos = "";
    $(".VARBINARY").each(function (i) {
        var vcNomCon = $(this).attr("obj");
        if ($(this).hasClass("imgButton")) { //habilitado
            if ($(this).attr("oblig") == "True" && $('#file_' + vcNomCon).text() == "") {
                vcVacio = "1";
            } else {

                if (this.value != "") {
                    vcAdjuntos += "[" + $(this).attr("obj") + "],";
                    vcAdjuntos += $('#file_' + vcNomCon).text() + ";";
                }
                else {
                    vcAdjuntos += "[" + $(this).attr("obj") + "],";
                    vcAdjuntos += ";";
                }
            }
        }
    });
    var vcColor = $("#txtColor").val().replace(/'/g, "&#39").replace(/\\/g, "&#92");
    var ddlSeguro = $("#ddlSeguro").val();

    data.vcAdjuntos = vcAdjuntos;
    data.vcColor = vcColor;
    data.ddlSeguro = ddlSeguro;

    $.ajax({
        type: "POST",
        url: "Adm_ProcesarSolicitud.aspx/Guardar",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d == '') {
                window.parent.ActualizarGrilla();
                window.scrollTo(0, 0);
                indiceTab = window.parent.tab.tabs("option", "selected");
                SolicitudModificada_EnviarMensaje(result.d, "", "");
                Mensaje("<br/><h1>Solicitud cerrada con éxito</h1><br/>", document, CerroMensaje);

            } else {
                alerta("La solicitud no pudo ser procesada por problemas con el financiamiento: '" + result.d + "'.", null, null, "warning");
                return;
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
    $(this).dialog("close");
}

function BloquearPagina(bloqueado) {
    return; //no bloquear botones (agregado 01-10-2015 wapumayta)

    //botones con acciones en todas las paginas
    if ($(".btnNormal").length > 0) {
        $(".btnNormal").button("option", "disabled", bloqueado);
    }
    if (bloqueado) {
        $("input").attr("disabled", "disabled");
        $("select").attr("disabled", "disabled");
    } else {
        $("input").removeAttr("disabled");
        $("select").removeAttr("disabled");
    }
}

var arrDispositivo;
var TecnicoAsignado = '';
var CuentaSeleccionada = '';
var PlanSeleccionado = '';
var DeshPag = false;
var numPalabrasDescrip = 0;
var PaquetesAmpliacion = '';
var btPaqueteMultiselect = true;
var vcTitSerAmp = "Paquetes ampliación (Doble click para editar un paquete)";
//VARIABLES TIPO MONTO
var btTipoMontoSelectable = true;
var vcTipoMontoDefault = 'CIA'; //EMP/CIA
function activarKendoEditor(Editable) {
    if ($("#hdfEstado").val() == "7") {
        btPaqueteMultiselect = false;
        vcTitSerAmp = "Servicios";
    }
    if (CapturaDatos['Mensaje'].btAct == "0") {
        $("#trDescSolicitud").hide();
    } else {
        //CapturaDatos['DocAdjuntos'].btCapObl);
        if (Editable) {
            $("#txtDescSol").kendoEditor({
                tools: [
                    { name: "bold" },
                    { name: "italic" },
                    { name: "underline" },
                    { name: "strikethrough" },
                    { name: "justifyLeft" },
                    { name: "justifyCenter" },
                    { name: "justifyRight" },
                    { name: "justifyFull" },
                    { name: "insertUnorderedList" },
                    { name: "insertOrderedList" },
                    { name: "indent" },
                    { name: "outdent" },
                    { template: "<b><span style='padding-left: 55px;'>N°&nbsp;<label id='lblMsgTipoValid'></label>:&nbsp;<label id='lblNumWordChar'></label></span></b>" }
                //,"fontName", "fontSize"
                ],
                messages: {
                    bold: "Negritas",
                    italic: "Cursiva",
                    underline: "Subrayado",
                    strikethrough: "Tachado",
                    justifyLeft: "Alinear a la izquierda",
                    justifyCenter: "Centrar",
                    justifyRight: "Alinear a la derecha",
                    justifyFull: "Justificar",
                    insertUnorderedList: "Viñetas",
                    insertOrderedList: "Numeración",
                    indent: "Disminuir sangría",
                    outdent: "Aumentar sangría"
                    //fontNameInherit: "(Fuente)", 
                    //fontSizeInherit: "(Tamaño de fuente)"
                    //,fontName: "Fuente", fontSize: "Tamaño de fuente"
                },
                encoded: true,
                keyup: function (e) {
                    if (CapturaDatos['Mensaje'].vcTamTip_Msj == 'w') { //validación por tipo palabras
                        numPalabrasDescrip = wordCount(this.value());
                    } else { //validación por caracteres
                        numPalabrasDescrip = characterCount(this.value());
                    }
                    //$("#lblNumWordCaracMensaje").text(numPalabrasDescrip);
                    $("#lblNumWordChar").text(numPalabrasDescrip);
                }
            });
        } else {
            $("#txtDescSol").kendoEditor({
                tools: [],
                encoded: true
            });
            $($("#txtDescSol").data("kendoEditor").body).attr("contenteditable", Editable);
        }
        $("#lblMsgTipoValid").text(CapturaDatos["Mensaje"].vcTamTip_Msj == 'w' ? 'palabras' : 'caracteres');
        numPalabrasDescrip = $("#txtDescSol").val() == '' ? 0 : (CapturaDatos["Mensaje"].vcTamTip_Msj == 'w' ? wordCount($("#txtDescSol").val()) : characterCount($("#txtDescSol").val()));
        $("#lblNumWordChar").text(numPalabrasDescrip);
    }
}
var dvArchivosAdjuntos;
$("#dvArchivosAdjuntos").css({ "overflow-y": "hidden" });
function ArchivosAdjunto(mVisible, mEditable, mObligatorio) {
    //    alert(mEditable);
    if (mVisible == "1") {
        $("#trArchivosAdjuntos").show();
        $("#imgVerArchAdj").click(function () {
            //$("#ifDocAdjuntosBD").attr("src", "../Adm_AdjuntarArchivos.aspx?pagOri=NuevaSolicitud&estSol=1&codSol=" + $("#hdfCodSol").val() + "&editable=" + mEditable + "&obligatorio=" + mObligatorio);
            var AdjuntosCantidad = CapturaDatos['DocAdjuntos'].inCanTot_Adj;
            var AdjuntosExtensiones = CapturaDatos['DocAdjuntos'].vcExtPer_Adj;
            var AdjutnosTamanoTipo = CapturaDatos['DocAdjuntos'].vcTamTip_Adj;
            var AdjuntosTamanoMaxNum = CapturaDatos['DocAdjuntos'].dcTamano_Adj;
            var AdjuntosTamanoMedida = CapturaDatos['DocAdjuntos'].vcTamMed_Adj;
            $("#ifDocAdjuntosBD").attr("src", "../Adm_AdjuntarArchivos.aspx?pagOri=NuevaSolicitud&estSol=1&codSol=" + $("#hdfCodSol").val() + "&editable=" + mEditable + "&obligatorio=" + mObligatorio + "&CanMax=" + AdjuntosCantidad + "&ExtPer=" + AdjuntosExtensiones + "&TamTip=" + AdjutnosTamanoTipo + "&TamMax=" + AdjuntosTamanoMaxNum + "&TamMed=" + AdjuntosTamanoMedida);
            $("#dvArchivosAdjuntos").css("overflow-x", "hidden");
            $("#dvArchivosAdjuntos").css("overflow-y", "hidden");
            dvArchivosAdjuntos = $('#dvArchivosAdjuntos').dialog({
                title: "Archivos Adjuntos",
                width: 440,
                height: 385,
                modal: true,
                resizable: false
            });
        });
    } else {
        $("#trArchivosAdjuntos").hide();
    }
}
//$.fn.getType = function () { return this[0].tagName == "INPUT" ? this[0].type.toLowerCase() : this[0].tagName.toLowerCase(); }

function fnActualizarEnvioOperador(pTipoExterno) {
    if (pTipoExterno == undefined) {
        $.ajax({
            type: "POST",
            url: "Adm_ProcesarSolicitud.aspx/ActualizarEnvioOperador",
            data: "{'inCodSol': '" + $("#hdfCodSol").val() + "','btEstado': '" + btActOpe + "','vcCodOper':'" + $("#ddlOperadorEnvio").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == '1') {
                    window.parent.ActualizarGrilla();
                    window.scrollTo(0, 0);
                    indiceTab = window.parent.tab.tabs("option", "selected");
                    SolicitudModificada_EnviarMensaje(result.d, "", "");

                    //Descargar archivo....
                    //SaveToDisk("OS.pdf");

                    Mensaje("<br/><h1>Su solicitud fue guardada con éxito</h1><br/>", document, CerroMensaje);
                } else {
                    alerta("No se pudo guardar la solicitud por problemas con el financiamiento: '" + result.d + "'.", null, null, "warning");
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
        $.ajax({
            type: "POST",
            url: "Adm_ProcesarSolicitud.aspx/ActualizarEnvioOperadorExterno",
            data: "{'inCodSol': '" + $("#hdfCodSol").val() + "'," +
               "'btEstado': '" + btActOpe + "'," +

               "'pIdTipo': '" + $("#ddlTipoExterno").val() + "'," +
               "'pIdDominio': '" + window.top.$("#hdfCodigoDominio").val() + "'," +
               "'pDescripcion': '" + $.trim($("#txtDescSol").val()) + "'," +
               "'pMotivo': '" + $.trim($("#txtMotivoSol").val()) + "'," +
               "'pBiEscalamiento': '" + $.trim($("#hdfBiEscalamiento").val()) + "'," +
               "'vcCodOper': '" + $("#ddlOperadorEnvioExterno").val() + "'," +
               "'pCodigoSolicitud': '" + $.trim($("#lblCodigo").text()) + "'}",

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
                    alerta("No se pudo guardar la solicitud.", null, null, "warning");
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

function fnConfirmacionActualizarEnvioOperador(vcTitulo) {
    var vcNuevaCadena = fnArmaCadenaDeControles();
    var vcMensaje = "";

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
        $("#lblMensajeEnvioOperador").text(vcMensaje);
        $('#dvConfirmacionEnvioOperador').dialog({
            title: vcTitulo,
            modal: true,
            width: 330,
            buttons: {
                "Si": function () {
                    if ($("#ddlOperadorEnvio").val() == '-1' && btActOpe) {
                        alerta("Seleccione un operador para poder continuar.", null, null, "warning");
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
        return;
        //confirmacion(vcMensaje, fnActualizarEnvioOperador, null, vcTitulo);
    }


}


//varialbes procesar
var inIdTipoAsigCred = 0; //no definido
var inCantServLinea = 0; //numero de servicios de la linea seleccionada para procesar
var indiceTab;
var btServLineaEdit = false;
$(function () {

    solicitudMultipleEspecialista = $('#hdfSolicitudesMultipleEspecialista').val() === 'True' ? true : false;

    let usaFinanciamiento = $('#hdfUsaFinanciamiento').val() === 'True';

    if (solicitudMultipleEspecialista) {
        $("#btnAsignar").hide();
    }

    if (!usaFinanciamiento) {
        //$('#divMensajeAtencion').text('¡Atención!, Este proceso no podrá ser revertido. ¿Desea continuar?');
        document.querySelectorAll('#divMensajeAtención')[0].textContent = '¡Atención!, Este proceso no podrá ser revertido. ¿Desea continuar?'
    }

    $("#ddlTipoPausa").change(function () {

        if ($(this).val() !== "-1") {
            $("#btnGuardar").button("option", "disabled", true);
            return;
        }

        $("#btnGuardar").button("option", "disabled", false);
    });

    //es necesario mostrar el botón de eliminar ya que para el estado 6 (abierto) 
    //se debe poder rechazar la solicitud
    if ($('#hdfEstado').val() === '6') {
        $('#btnEliminar').show();
    }

    $('#txtComentProcesar').css({ height: '260px' });

    iniciaFuncionesPausaSolicitud();

    $('#ddlModeloEquipoNuevo').select2();
    $('#ddlLinea').select2();
    $("#ddlPlan").select2();

    var hdfTipMonto = "CIA";
    $("#hdfTipoMonto").val(hdfTipMonto);

    $("#btnRegistrarEscEx").click(function () {
        if ($("#ddlOperadorEnvioExterno").val() == '-1') {
            alerta("Debe seleccionar un operador para el envío.", null, null, "warning");
            return;
        }
        if ($("#ddlTipoExterno option").length > 0) {
            fnActualizarEnvioOperador($("#ddlTipoExterno").val());
        }
        else {
            alerta("No existe tipos para escalar.", null, null, "warning");
        }
    });

    CargarAccionesSolicitudCambio();

    $("#divBtsGeneral").buttonset();
    $("#divBtsProceso").buttonset();
    $("#divBtsOperador").buttonset();
    $("#divBtsBasico").buttonset();

    //agregado 29-09-2015
    $("#imgBorrar_IMEI_Fin").click(function () {
        $("#txtIMEIElegido").val('');
    });
    $("#imgBorrar_IMEIEnt").click(function () {
        if ($("#chkMismoIMEI").is(":checked")) {
            $("#chkMismoIMEI").attr("checked", false);
        }
        $("#txtIMEIEnt").val('');
    });
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

    if ($("#hdfTipoMonto").val() != "") {
        vcTipoMontoDefault = $("#hdfTipoMonto").val();
    }

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


    if (($("#hdfEstado").val() != "8" && parseInt($("#hdfCodTipSol").val()) < 8) || parseInt($("#hdfCodTipSol").val()) == 6) {
        $('#btnRefrescar').hide();
    } else {
        if ($("#hdfCodTipSol").val() == "1" || $("#hdfCodTipSol").val() == "3") {
            $("#lblTextoRefrescar").html("(Vuelve a cargar lista de modelos)");
            $("#btnRefrescar").attr("title", "Volver a cargar lista de modelos");
        } else if ($("#hdfCodTipSol").val() == "2") {
            $("#lblTextoRefrescar").html("(Vuelve a cargar lista de modelos y líneas disponibles)");
            $("#btnRefrescar").attr("title", "Volver a cargar lista de modelos y líneas disponibles");
        } else if ($("#hdfCodTipSol").val() == "4") {
            $("#lblTextoRefrescar").html("(Vuelve a cargar lista de dispositivos disponibles)");
            $("#btnRefrescar").attr("title", "Volver a cargar lista de dispositivos disponibles");
        } else if ($("#hdfCodTipSol").val() == "6") {
            $("#lblTextoRefrescar").html("(Vuelve a cargar lista de servicios o planes elegidos)");
            $("#btnRefrescar").attr("title", "Volver a cargar lista de servicios o planes elegidos");
        }
    }

    $('#btnRefrescar').click(function () {
        //        $("#lblMensajeBotones").html("");
        if ($("#hdfCodTipSol").val() == "1" || $("#hdfCodTipSol").val() == "2" || $("#hdfCodTipSol").val() == "3" || $("#hdfCodTipSol").val() == "4" || $("#hdfCodTipSol").val() == "7") {
            obtenerDatosSolicitud($("#hdfCodSol").val(), true);
        } else {
            location.reload();
        }
    });

    //indeice tab pestaña
    try {
        indiceTab = window.parent.tab.tabs("option", "selected");
    } catch (e) {
        indiceTab = 0;
    }


    //validaciones 
    if ($("#hdfEstado").val() == "6" && $("#hdfEstado_Apr").val() == "32") { //Solicitud en estado Pendiente - Pendiente
        //validaciones mensajes
        numPalabrasDescrip = $("#txtDescSol").val() == '' ? 0 : (CapturaDatos["Mensaje"].vcTamTip_Msj == 'w' ? wordCount($("#txtDescSol").val()) : characterCount($("#txtDescSol").val()));
        //$("#lblMensajeValidTipo2").text(CapturaDatos["Mensaje"].vcTamTip_Msj == 'w' ? 'palabras' : 'caracteres');
        $("#lblMensajeValidTipo").text(CapturaDatos["Mensaje"].vcTamTip_Msj == 'w' ? 'palabras' : 'caracteres');
        $("#lblMensajeValidCant").text(CapturaDatos["Mensaje"].inTamano_Msj);
        //$("#lblNumWordCaracMensaje").text(numPalabrasDescrip);
        if (CapturaDatos["Mensaje"].btCapObl == '1') $("#dvMensajeObligatorio").show();
        //validaciones adjuntos
        AdjuntosCantidad = CapturaDatos['DocAdjuntos'].inCanTot_Adj;
        AdjuntosExtensiones = CapturaDatos['DocAdjuntos'].vcExtPer_Adj;
        AdjutnosTamanoTipo = CapturaDatos['DocAdjuntos'].vcTamTip_Adj;
        AdjuntosTamanoMedida = CapturaDatos['DocAdjuntos'].dcTamano_Adj;
        AdjuntosTamanoMaxNum = CapturaDatos['DocAdjuntos'].vcTamMed_Adj;
        $("#ifDocAdjuntos").attr("src", "Adm_AdjuntarArchivos.aspx?pagOri=NuevaSolicitud&estSol=0&CanMax=" + AdjuntosCantidad + "&ExtPer=" + AdjuntosExtensiones + "&TamTip=" + AdjutnosTamanoTipo + "&TamMax=" + AdjuntosTamanoMaxNum + "&TamMed=" + AdjuntosTamanoMedida);
        $("#lblAdjuntosValidCantidad").text(AdjuntosCantidad == '0' || AdjuntosCantidad == '' ? 'Sin límite' : AdjuntosCantidad);
        $("#lblAdjutnosValidExtensiones").text(AdjuntosExtensiones != '' ? AdjuntosExtensiones : 'Todas');
        if (AdjutnosTamanoTipo == '' || AdjuntosTamanoMaxNum == '' || AdjuntosTamanoMaxNum == '0' || AdjuntosTamanoMedida == '') { //no configurado o permisivo
            $("#lblAdjutnosValidTamanoMax").text('Sin límite');
        } else {
            $("#lblAdjutnosValidTamanoMax").text(FormatoNumero(AdjuntosTamanoMaxNum, oCulturaLocal, true) + " " + AdjuntosTamanoMedida + " (" + (AdjutnosTamanoTipo == 't' ? 'Total' : 'Individual') + ")");
        }
    } else {
        $("#dvMensajeObligatorio").hide();
        //$("#dvNumWordCaracDesc").hide();
        $("#trValidAdjuntos").hide();
    }


    //botones elegir linea
    $("#btnSelLinElegir").button();
    $("#btnSelLinCerrar").button();
    //fin botones elegir linea
    //alert($("#divProcesarSolicitud").css("height"));
    $(window).resize(function (a, c) {
        DimPosElementos();
    });
    DimPosElementos();
    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        $("#divProcesarSolicitud").css("height", Alto - 108 - 10);
    }



    if ($("#hdfCodTipSol").val() != '4' && $("#hdfCodTipSol").val() != '6' && $("#hdfCodTipSol").val() != '7') {
        $("#txtNumCelular").hide();
    }

    if ($("#hdfIdFInanciamiento").val() == 0) {
        $("#trMontoFijo").hide();
        $("#trFinanciamiento").hide();
        $("#trMesesCuotas").hide();
        $("#trPeriodoGracia").hide();
    }
    else if (inMostrarNumCuotas == 0 && $("#hdfEstado").val() == "6") {
        $("#trMesesCuotas").hide();
        $("#trFinanciamiento").hide();
    }

    ocultarParaEstadoAprobacion();

    //adaptación a esquema de solicitudes de personalizadas
    //$("#txtMonto").keypress(ValidarDecimal);
    //$("#txtMesesCuotas").keypress(ValidarEntero);
    //$("#txtPeriodoGracia").keypress(ValidarEntero);
    ValidarNumeroEnCajaTexto2("txtMonto", ValidarDecimal2, oCulturaLocal, false);
    //ValidarNumeroEnCajaTexto("txtMonto", ValidarDecimal, oCulturaLocal, false);
    $("#txtMonto").val(FormatoNumero($("#txtMonto").val(), oCulturaLocal));
    $("#txtLimiteCredito").val(FormatoNumero($("#txtLimiteCredito").val(), oCulturaLocal));
    ValidarNumeroEnCajaTexto2("txtLimiteCredito", ValidarDecimal2, oCulturaLocal, false); //28-04-2015 wapumayta
    ValidarNumeroEnCajaTexto("txtMesesCuotas", ValidarEntero);
    ValidarNumeroEnCajaTexto("txtPeriodoGracia", ValidarEntero);
    $("#txtFechaAprobacion").keypress(ValidarFechaHora);
    $(".DATE,.DATETIME,#txtFechaAprobacion").keydown(function (e) {
        if (e.keyCode == 8 || e.keyCode == 46) {
            return false;
        }
    });

    //fecha de aprobación
    $("#txtFechaAprobacion").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });
    var hdate = new Date();
    $("#txtFechaAprobacion").datepicker("setDate", hdate);

    //CONTROLES DE LA PAGINAS POR ESTADO DE LA SOLICITUD
    //alert($("#hdfEstado").val() + ", " + $("#hdfEstado_Apr").val());
    //alert("Administrador: " + $("#hdfAdmin").val() + " \nResp Aprobacion: " + $("#hdfResApr").val() + " \nPropietario: " + $("#hdfPropie").val() + "\nTec Responsable: " + $("#hdfTecnicoResponsable").val() + "\nTecnico: " + $("#hdfTecnico").val() + "\nTec Asignado: " + $("#hdfTecnicoAsignado").val());
    //estado de la pagina segun usuario logeado y estado de la solicitud
    if ($("#hdfEstado").val() == "6" && $("#hdfEstado_Apr").val() == "32") { //Solicitud en estado Pendiente - Pendiente
        $("#ddlEstadoSolicitud").show();
        $("#tfFechaEntrega").hide();

        //if ($("#hdfAdmin").val() == "1" || $("#hdfResApr").val() == "1") { //usuario logeado es administrador o responsable de aprobacion
        if ($("#hdfAdmin").val() == "1") { //usuario logeado es administrador
            if ($("#hdfAdmin").val() == "1") {
                $("#txtMonto").attr("disabled", false);
                activarKendoEditor(true);
                //valores para archivos adjuntos
                ArchivosAdjunto(CapturaDatos['DocAdjuntos'].btAct, "1", CapturaDatos['DocAdjuntos'].btCapObl);
            }
            //else {
            //    $("#txtMonto").attr("disabled", true);
            //    //seguridad de usuario propietario
            //    if (PermisosPropietario.length > 0) {
            //        if (PermisosPropietario[0].Eliminar == "False" && PermisosPropietario[0].Editar == "False") {
            //            $("#btnEliminar").button("option", "disabled", true);
            //            $("#dvMensajeBotones").show();
            //            //$("#lblMensajeBotones").text('Ud. no tiene permiso para editar los datos de esta solicitud pero puede cambiarla al estado "Por Aprobar". No tiene Permisos para eliminar esta solicitud.');
            //            $("#lblMensajeBotones").text('Ud. no tiene permiso para editar los datos de esta solicitud o eliminarla.');
            //            PaginaSinAcciones();
            //        } else if (PermisosPropietario[0].Eliminar == "False") {
            //            $("#btnEliminar").button("option", "disabled", true);
            //            $("#dvMensajeBotones").show();
            //            $("#lblMensajeBotones").text('Ud. no tiene permiso para eliminar esta solicitud.');
            //            //PaginaSinAcciones();
            //            activarKendoEditor(true);
            //        } else if (PermisosPropietario[0].Editar == "False") {
            //            $("#dvMensajeBotones").show();
            //            $("#lblMensajeBotones").text('Ud. no tiene permiso para editar los datos de esta solicitud pero puede cambiarla de estado.');
            //            PaginaSinAcciones();
            //        } else {
            //            activarKendoEditor(true);
            //        }
            //    } else {
            //        activarKendoEditor(true);
            //    }
            //    //fin seguridad para el tipo por usuario
            //}
            $("#ddlEstadoSolicitud").html('');
            $("#ddlEstadoSolicitud").append('<option value="32" selected="true">Pendiente</option><option value="33">Por Aprobar</option><option value="34">Aprobada</option>');
            //activarKendoEditor(true);
        } else if ($("#hdfPropie").val() == "1" && $("#hdfResApr").val() == "1") { //es porpietario y responsable de aprobacion para el tipode solicitud
            $("#txtMonto").attr("disabled", true);
            $("#ddlEstadoSolicitud").html('');
            $("#ddlEstadoSolicitud").append('<option value="32" selected="true">Pendiente</option><option value="33">Por Aprobar</option><option value="34">Aprobada</option>');
            //seguridad de usuario propietario
            if (PermisosPropietario.length > 0) {
                if (PermisosPropietario[0].Eliminar == "False" && PermisosPropietario[0].Editar == "False") {
                    $("#btnEliminar").button("option", "disabled", true);
                    $("#dvMensajeBotones").show();
                    //$("#lblMensajeBotones").text('Ud. no tiene permiso para editar los datos de esta solicitud pero puede cambiarla al estado "Por Aprobar". No tiene Permisos para eliminar esta solicitud.');
                    $("#lblMensajeBotones").text('Ud. no tiene permiso para editar los datos de esta solicitud o eliminarla.');
                    PaginaSinAcciones();
                } else if (PermisosPropietario[0].Eliminar == "False") {
                    $("#btnEliminar").button("option", "disabled", true);
                    $("#dvMensajeBotones").show();
                    $("#lblMensajeBotones").text('Ud. no tiene permiso para eliminar esta solicitud.');
                    //PaginaSinAcciones();
                    activarKendoEditor(true);
                    ArchivosAdjunto(CapturaDatos['DocAdjuntos'].btAct, "1", CapturaDatos['DocAdjuntos'].btCapObl);
                } else if (PermisosPropietario[0].Editar == "False") {
                    $("#dvMensajeBotones").show();
                    $("#lblMensajeBotones").text('Ud. no tiene permiso para editar los datos de esta solicitud pero puede cambiarla de estado.');
                    PaginaSinAcciones();
                } else {
                    activarKendoEditor(true);
                    ArchivosAdjunto(CapturaDatos['DocAdjuntos'].btAct, "1", CapturaDatos['DocAdjuntos'].btCapObl);
                }
            } else {
                activarKendoEditor(true);
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
                    $("#lblMensajeBotones").text('Ud. sólo puede cambiar el estado de esta solicitud a "Por Aprobar".');
                    //$("#lblMensajeBotones").text('Ud. no tiene permiso para editar los datos de esta solicitud pero puede cambiarla al estado "Por Aprobar". No tiene Permisos para eliminar esta solicitud.');
                    //$("#lblMensajeBotones").text('Ud. no tiene permiso para editar los datos de esta solicitud o eliminarla.');
                    PaginaSinAcciones();
                } else if (PermisosPropietario[0].Eliminar == "False") {
                    $("#btnEliminar").button("option", "disabled", true);
                    $("#dvMensajeBotones").show();
                    $("#lblMensajeBotones").text('Ud. no tiene permiso para eliminar esta solicitud.');
                    //PaginaSinAcciones();
                    activarKendoEditor(true);
                    ArchivosAdjunto(CapturaDatos['DocAdjuntos'].btAct, "1", CapturaDatos['DocAdjuntos'].btCapObl);
                } else if (PermisosPropietario[0].Editar == "False") {
                    $("#dvMensajeBotones").show();
                    $("#lblMensajeBotones").text('Ud. no tiene permiso para editar los datos de esta solicitud pero puede cambiarla de estado.');
                    PaginaSinAcciones();
                } else {
                    activarKendoEditor(true);
                    ArchivosAdjunto(CapturaDatos['DocAdjuntos'].btAct, "1", CapturaDatos['DocAdjuntos'].btCapObl);
                }
            } else {
                activarKendoEditor(true);
                ArchivosAdjunto(CapturaDatos['DocAdjuntos'].btAct, "1", CapturaDatos['DocAdjuntos'].btCapObl);
            }
        } else if ($("#hdfPropie").val() == "0" && $("#hdfUsuarioCreacion").val() == "0" && $("#hdfAdmin").val() == "0") { //si no es propietario o ni usuario de creación
            $("#btnGuardar").hide();
            $("#btnEliminar").hide();
            $("#ddlEstadoSolicitud").attr("disabled", true);
            $("#ddlEstadoSolicitud").append('<option value="32" selected="true">Pendiente</option>');
            PaginaSinAcciones();
            $("#dvMensajeBotones").show();
            $("#lblMensajeBotones").text('Ud. no es propietario de esta solicitud.');
        } else { //usuario logeado no puede interactuar con la solicitud
            $("#btnGuardar").hide();
            $("#btnEliminar").hide();
            $("#ddlEstadoSolicitud").attr("disabled", true);
            $("#ddlEstadoSolicitud").append('<option value="32" selected="true">Pendiente</option>');
            PaginaSinAcciones();
            $("#dvMensajeBotones").show();
            $("#lblMensajeBotones").text('La solicitud aún no se encuentra en estado "Por Aprobar".');
        }
        //Botones
        $("#btnAsignar").hide();
    } else if ($("#hdfEstado").val() == "6" && $("#hdfEstado_Apr").val() == "33") { //Solicitud en estado Pendiente - Por Aprobar
        $("#tfFechaEntrega").hide();
        //$("#txtDescSol").attr("readOnly", true);
        $("#txtMonto").attr("readOnly", true);
        $("#txtMesesCuotas").attr("readOnly", true);
        $("#txtPeriodoGracia").attr("readOnly", true);
        //Estado - Label
        $("#lblEstadoSolicitud").text(Estados[$("#hdfEstado_Apr").val()].Nombre);
        //Botones
        $("#btnAsignar").hide();
        $("#lblBtnGuardar").text("Aprobar");
        $("#imgGuardar").attr("src", '../../../Common/Images/Mantenimiento/Aprobar.png');
        $("#lblBtnEliminar").text("Rechazar");
        $("#imgEliminar").attr("src", '../../../Common/Images/Mantenimiento/Rechazar.png');

        if ($("#hdfAdmin").val() == "1" || $("#hdfResApr").val() == "1") { //usuario logeado es administrador o responsable de aprobacion
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
            activarKendoEditor(false);
            ArchivosAdjunto(CapturaDatos['DocAdjuntos'].btAct, "0", CapturaDatos['DocAdjuntos'].btCapObl);
            //PaginaSinAcciones();
        } else if ($("#hdfPropie").val() == "1") { //usuario logeado es propietario de solicitud sin permisos de aprobacion
            $("#btnGuardar").hide();
            $("#btnEliminar").hide();
            $("#ddlEstadoSolicitud").attr("disabled", true);
            PaginaSinAcciones();
            //activarKendoEditor(false);
            $("#dvMensajeBotones").show();
            $("#lblMensajeBotones").text('Solicitud en espera de aprobación por parte del Responsable de Aprobación.');
        } else { //usuario logeado no puede interactuar con la solicitud
            $("#btnGuardar").hide();
            $("#btnEliminar").hide();
            PaginaSinAcciones();
        }
    } else if ($("#hdfEstado").val() == "6" && $("#hdfEstado_Apr").val() == "34") { //Solicitud en estado Pendiente - Aprobada (Por Asignar)
        $("#tfFechaEntrega").hide();
        //$("#txtDescSol").attr("readOnly", true);
        $("#txtMonto").attr("readOnly", true);
        $("#txtMesesCuotas").attr("readOnly", true);
        $("#txtPeriodoGracia").attr("readOnly", true);
        //Estado
        $("#lblEstadoSolicitud").text(Estados[$("#hdfEstado").val()].Nombre);
        //Botones
        $("#btnEliminar").hide();
        $("#btnGuardar").hide();
        ArchivosAdjunto("1", "0", "0");
        if ($("#hdfAdmin").val() == "1" || $("#hdfTecnico").val() == "1") { //usuario logeado es administrador o tecnico para el tipo de solicitud
            if (PermisosTecnico.length > 0) { //usuario logeado es tecnico y tiene algun tipo de permiso para este tipo de solicitud
                if (PermisosTecnico[0].Crear == "True") { // es tecnico con permisos
                    //validacion de fecha de aprobacion de la solicitud //
                    var daHoy = new Date();
                    var fecCompleta = $("#hdfFechaAprobacion").val();
                    var daFecApr = new Date(fecCompleta.substring(6, 10), (parseInt(fecCompleta.substring(3, 5)) - 1).toString(), fecCompleta.substring(0, 2));
                    //alert("hoy: " + daHoy + "\nFecApr: " + daFecApr);
                    if (daHoy < daFecApr) {
                        $("#btnAsignar").button("option", "disabled", true);
                        alerta("No puede asignarse esta solicitud, por que la fecha de aprobación es mayor a la fecha actual.", null, null, "warning");
                    } else {
                        $("#btnAsignar").button("option", "disabled", false);
                    }
                    activarKendoEditor(false);
                    ArchivosAdjunto(CapturaDatos['DocAdjuntos'].btAct, "0", CapturaDatos['DocAdjuntos'].btCapObl);
                } else { //no tiene permisos para interactuar con esta solicitud
                    $("#btnAsignar").button("option", "disabled", true);
                    $("#dvMensajeBotones").show();
                    $("#lblMensajeBotones").text('Ud. no tiene permisos de escritura para este tipo de solicitud.');
                    PaginaSinAcciones();
                }
            } else { //no es tecnico para este tipo de solicitud
                $("#btnAsignar").button("option", "disabled", true);
                $("#dvMensajeBotones").show();
                $("#lblMensajeBotones").text('Ud. no es especialista para este tipo de solicitud.');
                PaginaSinAcciones();
            }
        } else if ($("#hdfPropie").val() == "1") { //usuario logeado es propietario de solicitud, no es tecnico ni administrador
            $("#btnAsignar").hide();
            $("#dvMensajeBotones").show();
            $("#lblMensajeBotones").text('Solicitud Aprobada, a la espera de asignación a especialista.');
            PaginaSinAcciones();
        } else {
            $("#btnAsignar").hide();
            $("#dvMensajeBotones").show();
            $("#lblMensajeBotones").text('Ud. no es especialista.');
            PaginaSinAcciones();
        }
    } else if ($("#hdfEstado").val() == "8" && $("#hdfEstado_Apr").val() == "34") { //Solicitud en estado En Proceso - Aprobada (Procesar)
        //Fila tipo de monto (Empresa, Empleado)

        $("#btnResumen").show();
        $("#btnGuardarPrevio").show();

        //Botones de operador
        if ($("#hdfbiEnviarOperador").val() == "1") {
            $("#btnEnviarOperador").show();
            $("#btnFormatoOrdenServicio").show();
            $("#btnDevueltoOperador").show();
            if (btEnOperRepa == "0") {
                $("#btnEnviarOperador").button("option", "disabled", false);
                $("#btnDevueltoOperador").button("option", "disabled", true);
            } else {
                $("#btnEnviarOperador").button("option", "disabled", true);
                $("#btnDevueltoOperador").button("option", "disabled", false);
            }
        }

        //botón borrar IMEI_Fin - agregado 29-09-2015 wapumayta
        if (($("#hdfCodTipSol").val() == '1' || $("#hdfCodTipSol").val() == '3') && $("#hdfIngAlm").val() == '0') {
            $("#imgBorrar_IMEI_Fin").show();
        }
        if ($("#hdfCodTipSol").val() == '4' && $("#hdfIngAlm").val() == '0') {
            $("#imgBorrar_IMEIEnt").show();
        }

        //campos para procesar
        if ($("#hdfCodTipSol").val() == '1' || $("#hdfCodTipSol").val() == '2' || $("#hdfCodTipSol").val() == '3') {
            $("#trModEquipoNue").show();
            $("#trIMEIEquipoNue").show();
        }
        //límite de crédito //28-04-2015 wapumayta
        if ($("#hdfCodTipSol").val() == '2') {
            $("#trLimiteCredito").show();
        }
        //fecha entrega
        if ($("#hdfCodTipSol").val() == "6" || $("#hdfCodTipSol").val() == "7") { //solicitud diferentes a Activacion y Ampliacion
            $("#tfFechaEntrega").hide();
        }

        
        if ($("#hdfUsaFinanciamiento").val() !== "False" && $("#hdfUsaFinanciamiento").val() !== undefined) {
            //alerta(btTipoMontoSelectable.toString());
            $("#trTipoMonto").show();
            ListarParametros('TipoMonto', vcTipoMontoDefault); //listar combo con tipos de monto
            if (btTipoMontoSelectable) {
                $("#ddlTipoMonto").attr("disabled", false);
            } else {
                $("#ddlTipoMonto").attr("disabled", true);
            }
        }

        //        if ($("#hdfEstado").val() == "8") {
        //jherrera...02/06/2014...La asignación ahora se hará desde el listado porque esto no influye en el proceso de la solicitud.
        //$("#trAsignarEquiTemp").show();
        if ($("#hdfCodTipSol").val() == '4') {
            $("#trIMEIEquipoEnt").show();
            $("#trAsignarEquiTemp").show();
        }
        //        }
        //$("#txtDescSol").attr("readOnly", true);
        //Estado
        $("#lblEstadoSolicitud").text(Estados[$("#hdfEstado").val()].Nombre);
        //Botones
        $("#btnAsignar").hide();
        $("#lblBtnGuardar").text("Cerrar ticket");
        $("#imgGuardar").attr("src", '../../../Common/Images/Mantenimiento/Proceso.png');
        $("#lblBtnEliminar").text("Anular");
        $("#imgEliminar").attr("src", '../../../Common/Images/Mantenimiento/Cancelar.png');
        //ArchivosAdjunto("1", "0", "0"); //comentado 04-11-2015 wapumayta
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
                        $("#lblMensajeBotones").css({ color: '#1D5987' });
                        PaginaSinAcciones();
                    } else if (PermisosTecnico[0].Eliminar == "False") {
                        $("#btnEliminar").button("option", "disabled", true);
                        $("#dvMensajeBotones").show();
                        $("#lblMensajeBotones").text('Ud. no tiene permisos para anular este tipo de solicitud.');
                        $("#lblMensajeBotones").css({ color: '#1D5987' });
                        if ($("#hdfisEditCuota").val() == "0") {
                            $("#txtMesesCuotas").attr("readOnly", false);
                            $("#txtMesesCuotas").attr("disabled", false);
                        } else {
                            $("#txtMesesCuotas").attr("readOnly", false);
                            //$("#txtMesesCuotas").attr("disabled", false);
                        }
                        //$("#txtMesesCuotas").attr("readOnly", false);
                        //$("#txtMesesCuotas").attr("disabled", false);
                        activarKendoEditor(false);
                        ArchivosAdjunto(CapturaDatos['DocAdjuntos'].btAct, "0", CapturaDatos['DocAdjuntos'].btCapObl);
                    } else if (PermisosTecnico[0].Editar == "False") {
                        $("#btnGuardar").button("option", "disabled", true);
                        $("#btnGuardarPrevio").button("option", "disabled", true); //Guardar antes de procesar
                        $("#btnEnviarOperador").button("option", "disabled", true);
                        $("#btnDevueltoOperador").button("option", "disabled", true);
                        $("#dvMensajeBotones").show();
                        $("#lblMensajeBotones").text('Ud. no tiene permisos para procesar este tipo de solicitud.');
                        $("#lblMensajeBotones").css({ color: '#1D5987' });
                        PaginaSinAcciones();
                    } else { //tecnico tiene todos los permisos
                        activarKendoEditor(false);
                        if ($("#hdfisEditCuota").val() == "0") {
                            $("#txtMesesCuotas").attr("readOnly", false);
                            $("#txtMesesCuotas").attr("disabled", false);
                        } else {
                            $("#txtMesesCuotas").attr("readOnly", false);
                            //$("#txtMesesCuotas").attr("disabled", false);
                        }
                        //$("#txtMesesCuotas").attr("readOnly", false);
                        //$("#txtMesesCuotas").attr("disabled", false);
                        ArchivosAdjunto(CapturaDatos['DocAdjuntos'].btAct, "0", CapturaDatos['DocAdjuntos'].btCapObl);
                    }
                } else { //no tiene permisos para este tipo de solicitud
                    $("#btnGuardar").button("option", "disabled", true);
                    $("#btnGuardarPrevio").button("option", "disabled", true); //Guardar antes de procesar
                    $("#btnEliminar").button("option", "disabled", true);
                    $("#btnEnviarOperador").button("option", "disabled", true);
                    $("#btnDevueltoOperador").button("option", "disabled", true);
                    $("#dvMensajeBotones").show();
                    $("#lblMensajeBotones").text('Ud. no tiene configurado ningún permiso para este tipo de solicitud.');
                    PaginaSinAcciones();
                }
            }
            else if ($("#hdfAdmin").val() == "1" || $("#hdfTecnicoResponsable").val()) { //no es tecnico asignado pero puede procesar
                $("#btnGuardar").button("option", "disabled", false);
                $("#btnGuardarPrevio").button("option", "disabled", false); //Guardar antes de procesar
                $("#btnEliminar").button("option", "disabled", false);
                $("#dvMensajeBotones").show();
                if (!solicitudMultipleEspecialista) {
                    $("#lblMensajeBotones").text('Ud. no ha sido asignado a esta solicitud.');
                }
                if ($("#hdfisEditCuota").val() == "0") {
                    $("#txtMesesCuotas").attr("readOnly", false);
                    $("#txtMesesCuotas").attr("disabled", false);
                } else {
                    $("#txtMesesCuotas").attr("readOnly", false);
                    //$("#txtMesesCuotas").attr("disabled", false);
                }
                //$("#txtMesesCuotas").attr("readOnly", false);
                //$("#txtMesesCuotas").attr("disabled", false);
                activarKendoEditor(true);
                ArchivosAdjunto(CapturaDatos['DocAdjuntos'].btAct, "0", CapturaDatos['DocAdjuntos'].btCapObl);
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
                PaginaSinAcciones();
            }

            if (btEnOperRepa == "1") {
                $("#btnGuardar").button("option", "disabled", true);
                $("#btnGuardarPrevio").button("option", "disabled", true); //Guardar antes de procesar
                $("#btnEliminar").button("option", "disabled", true);
                $("#chkAsignarA").attr("disabled", true);
                if (!$("#dvMensajeBotones").is(":visible")) {
                    $("#dvMensajeBotones").show();
                    $("#lblMensajeBotones").text('La solicitud se encuentra en el operador');
                }
            }

        } else if ($("#hdfPropie").val() == "1") { // es propietario de la solicitud
            $("#tfFechaEntrega").hide();
            $("#btnEliminar").hide();
            $("#btnGuardar").hide();
            $("#btnGuardarPrevio").hide();
            $("#btnEnviarOperador").hide();
            $("#btnFormatoOrdenServicio").hide();
            $("#btnDevueltoOperador").hide();
            $("#trModEquipoNue").hide();
            $("#trIMEIEquipoNue").hide();
            $("#trIMEIEquipoEnt").hide();
            $("#dvMensajeBotones").show();
            $("#lblMensajeBotones").text('La solicitud está siendo procesada por el técnico especialista.');
            PaginaSinAcciones();
        } else { // no es tecnico ni administrador
            $("#btnEliminar").hide();
            $("#btnGuardar").hide();
            $("#btnGuardarPrevio").hide();
            $("#btnEnviarOperador").hide();
            $("#btnFormatoOrdenServicio").hide();
            $("#btnDevueltoOperador").hide();
            $("#trModEquipoNue").hide();
            $("#trIMEIEquipoNue").hide();
            $("#trIMEIEquipoEnt").hide();
            $("#dvMensajeBotones").show();
            $("#lblMensajeBotones").text('Ud. no es especialista.');
            PaginaSinAcciones();
        }

        $("#trFilaAdjuntoFinal").hide();
    } else { //Solicitudes anuladas, rechazadas o culminadas
        solicitudCulminada = true;
        $("#trFilaAdjuntoFinal").show();
        $("#dvMensajeBotones").show();
        if ($("#hdfEstado_Apr").val() == "35") { //solicitud se rechazó (rechazada por responsable de aprobación)
            $("#trTecnico").hide();
            $("#lblEstadoSolicitud").text(Estados[$("#hdfEstado_Apr").val()].Nombre);
            $("#lblMensajeBotones").text('La solicitud ha sido rechazada por el responsable de aprobación.');
            $("#tfFechaEntrega").hide();
        } else if ($("#hdfEstado").val() == "9") { //solicitud se anuló (anulado por técnico)
            $("#trTecnico").show();
            $("#lblEstadoSolicitud").text(Estados[$("#hdfEstado").val()].Nombre);
            $("#lblMensajeBotones").text($("#hdfMensajeTipoCierre").val());
            $("#tfFechaEntrega").hide();
        } else {
            if ($("#hdfConciliacion").val() == "1") {
                $("#lblEstadoSolicitud").text(Estados[$("#hdfEstado").val()].Nombre);
                $("#lblMensajeBotones").text('');
                $("#tfFechaEntrega").show();
                $("#btnResumen").show();
                $("#btnCerrar").hide();
            }
            else {
                $("#lblEstadoSolicitud").text(Estados[$("#hdfEstado").val()].Nombre);
                $("#lblMensajeBotones").text($("#hdfMensajeTipoCierre").val());
                $("#tfFechaEntrega").show();
                $("#btnResumen").show();
           }
        }

        if ($("#hdfCodTipSol").val() != "6" && $("#hdfCodTipSol").val() != "7") { //solicitud diferentes a Activacion y Ampliacion
            $("#imgBorrarFecha").hide();
        } else {
            $("#tfFechaEntrega").hide();
            $("#lblPlanActual").text("Plan Asignado");
            $("#lblPlanAmpSolicitado").text("Plan Solicitado");
            $("#dvInfoPlanAmpSol").hide();
            //límite de crédito //28-04-2015 wapumayta
            if ($("#hdfCodTipSol").val() == '2') {
                $("#trLimiteCredito").show();
            }
        }

        $("#btnAsignar").hide();
        $("#btnEliminar").hide();
        $("#btnGuardar").hide();
        $("#btnRefrescar").hide();

        $("#btnGuardarPrevio").show();

        PaginaSinAcciones();
    }

    desabilitarBotonCerrarTicketSiEstaEnPausa();
    //Asignacion de Solicitud
    var tecAsignado = '';
    $("#chkAsignarA").change(function () {
        if ($("#hdfEstado").val() == "6") { //solicitud por asignar
            if ($(this).is(":checked")) {
                $("#trTecnico").show();
                $("#lblBtnAsignar").text("Asignar a");
            } else {
                $("#trTecnico").hide();
                $("#lblBtnAsignar").text("Asignarme");
            }
        } else { //solicitud en proceso (re-asignar) - agregado 29-09-2014 wapumayta
            $("#lblBtnAsignar").text("Asignar a");
            if ($(this).is(":checked")) {
                $("#btnGuardar").hide();
                $("#btnGuardarPrevio").hide();
                $("#btnEliminar").hide();
                $("#btnAsignar").show();
                $("#bpTecnicoAsignado_txtValorBusqueda").attr("disabled", false);
                $("#bpTecnicoAsignado_imgBusqueda").show();
                tecAsignado = $("#bpTecnicoAsignado_txtValorBusqueda").val();
            } else {
                $("#btnGuardar").show();
                $("#btnGuardarPrevio").show();
                $("#btnEliminar").show();
                $("#btnAsignar").hide();
                $("#bpTecnicoAsignado_txtValorBusqueda").attr("disabled", true);
                $("#bpTecnicoAsignado_imgBusqueda").hide();
                $("#bpTecnicoAsignado_txtValorBusqueda").val(tecAsignado);
            }
        }
    });

    $("#chkEquiConLinea").change(function () {
        $("#txtIMEIElegido").val('');
        if ($(this).is(":checked")) {
            $("#trNumeroEquiTemp").show();
        } else {
            $("#trNumeroEquiTemp").hide();
        }
        var codEmp = $("#hdfCodEmp").val();
        var tipAdq = 2;
        mostrarDispositivosDisponibles(codEmp, tipAdq);
    });

    $("#chkAsignarEquiTemp").change(function () {
        if ($(this).is(":checked")) {
            $("#trModEquipoNue").show();
            $("#trIMEIEquipoNue").show();
            $("#trNumero").show();
            $("#trEquiposConLinea").show();
        } else {
            $("#trModEquipoNue").hide();
            $("#trIMEIEquipoNue").hide();
            $("#trNumero").hide();
            $("#trEquiposConLinea").hide();
        }
    });

    //FIN CONTROLES 
    //fin adaptación

    $('#imgAlerta').hover(function () {
        $('#DvMensajeAlert').css('position', 'fixed');
        $('#DvMensajeAlert').css('left', $(this).offset().left - $(window).scrollLeft() + 20);
        $('#DvMensajeAlert').css('top', $(this).offset().top - $(window).scrollTop());
        $('#DvMensajeAlert').show(300);
    }, function () {
        $('#DvMensajeAlert').hide();
    });

    $(window).scroll(function () { $('#DvMensajeAlert').hide(); });

    $("#btnBuscarIMEI").button();
    $("#btnBuscarIMEIEnt").button();
    $("#btnBuscarLinea").button();
    $("#lblNoPlan").hide();

    //load pagina segun tipo de solicitud
    obtenerDatosSolicitud($("#hdfCodSol").val(), false);

    //dispositivos
    $("#ddlModeloEquipoNuevo").change(function () {
        if ($("#hdfCodTipSol").val() != 4 && $("#hdfCodTipSol").val() != 3) { //no es reparación y reposición
            mostrarLineasDisponibles($(this).val());
        }
        $("#txtIMEIElegido").val("");
        $("#txtMsgNumero").val("");
        biSerLinSol = false;

        $("#hdfBuscarLinea").val("buscar");
        $("#lblBuscarLinea").html("Buscar Línea");

        if ($(this).val() != "-1") {
            $("#ddlModeloEquipoBuscar").val($(this).val());
            ActualizarCondicionCuenta();
            ActualizarCondicionPlan();
            //CargarOrganizacionDetalle();
        }
        else {
            if (IdModeloSolicitado != "") {
                $("#ddlModeloEquipoBuscar").val(IdModeloSolicitado);
                ActualizarCondicionCuenta();
                ActualizarCondicionPlan();
            }
        }
    });

    $("#btnBuscarIMEI").click(function () {

        if ($("#ddlModeloEquipoNuevo").val() == "" || $("#ddlModeloEquipoNuevo").val() == "-1") {
            alerta("Seleccione el modelo del equipo nuevo", null, null, "warning");
            return;
        }

        CargarGrillaEquipos(1);
        ModalBuscarEquipo = $('#dvBuscarEquipo').dialog({
            title: "Buscar Equipo",
            width: 810,
            height: 535,
            modal: true,
            resizable: false
        });
    });
    $("#btnBuscarIMEIEnt").click(function () {
        //        $("#txtIMEIEnt").val("");
        //        $("#chkMismoIMEI").attr("checked", false);

        CargarGrillaEquipos(1);
        ModalBuscarEquipo = $('#dvBuscarEquipo').dialog({
            title: "Buscar Equipo",
            width: 810,
            height: 470,
            modal: true,
            resizable: false
        });
    });

    $("#btnBuscarLinea").click(function () {
        var vTitulo = '';
        var i = 0;
        var btLineas = true;

        if ($("#hdfBuscarLinea").val() == 'buscar') {
            vTitulo = 'Buscar Línea';
            $("#ddlOperador").show();
            $("#txtOperador").hide();
            $("#ddlLinea").show(); $("#ddlLinea").next().show();
            $("#txtLinea").hide();

            $("#ddlOperador").html('');
            $("#ddlLinea").html('');
            if (Lineas.length > 0) {
                //operadores
                for (i = 0; i < Lineas.length; i++) {
                    if ($("#ddlOperador option[value='" + DataLineas[Lineas[i]].CodOperador + "']").val() === undefined) {
                        $("#ddlOperador").append($("<option></option>").val(DataLineas[Lineas[i]].CodOperador).text(DataLineas[Lineas[i]].NomOperador));
                    }
                }
                //lineas
                for (i = 0; i < Lineas.length; i++) {
                    if (DataLineas[Lineas[i]].CodOperador == $("#ddlOperador").val()) {
                        $("#ddlLinea").append($("<option></option>").val(DataLineas[Lineas[i]].Numero).text(DataLineas[Lineas[i]].Numero));
                    }
                }
            } else {
                $("#ddlOperador").append($("<option></option>").val("-2").text("Sin Datos"));
                $("#ddlOperador").attr("disabled", true);
                $("#ddlOperador").val("-2");
                $("#ddlLinea").append($("<option></option>").val("-2").text("Sin Datos"));
                $("#ddlLinea").attr("disabled", true);
                $("#ddlLinea").val("-2");
                btLineas = false;
            }
            //mostrar datos de linea seleccionada
            if ($("#txtMsgNumero").val() != '') { //detalle de la linea
                try {
                    $("#ddlLinea").html('');
                    $("#ddlOperador").val(DataLineas[$("#txtMsgNumero").val()].CodOperador);
                    for (i = 0; i < Lineas.length; i++) {
                        if (DataLineas[Lineas[i]].CodOperador == DataLineas[$("#txtMsgNumero").val()].CodOperador) {
                            $("#ddlLinea").append($("<option></option>").val(DataLineas[Lineas[i]].Numero).text(DataLineas[Lineas[i]].Numero));
                        }
                    }
                } catch (e) {
                }
                $("#ddlLinea").val($("#txtMsgNumero").val());
                fnCargarDatosLineaBusqueda($("#txtMsgNumero").val());
            } else {
                //cargar datos
                if ($("#ddlLinea").val() != "-2" || $("#ddlLinea").val() != "-1") {
                    fnCargarDatosLineaBusqueda($("#ddlLinea").val());
                }
            }

            $('#ddlLinea').select2();

            //#region abrir ventana
            ModalBuscarEquipo = $('#dvBuscarLinea').dialog({
                title: vTitulo,
                width: 585, //410,
                height: 420, //310,
                modal: true,
                resizable: false
            });

            //ECONDEÑA  02/11/2016
            var arButtons = [];
            if (btLineas) {
                arButtons.push({
                    text: "Aplicar",
                    click: function () {
                        $("#txtMsgNumero").val($("#ddlLinea").val());
                        biSerLinSol = false;
                        MesesContratoFactLInea = DataLineas[$("#ddlLinea").val()].MesesContrato;
                        MontoFactLinea = DataLineas[$("#ddlLinea").val()].Monto;
                        inIdTipoAsigCred = DataLineas[$("#ddlLinea").val()].CodTipAsiCre;
                        if (DataLineas[$("#ddlLinea").val()].CodTipAsiCre == 1) {
                            if ($("#hdfPlaSol").val() != '' || $("#hdfPlaSol").val() != 0) { //solicitud con plan
                                if ($("#hdfPlaSol").val() != $("#hdfPlanProcesar").val()) {
                                    $("#dvMensajeBotones").show();
                                    $("#lblMensajeBotones").text('Ha seleccionado una línea sin plan o con un plan diferente al solicitado.');
                                } else {
                                    $("#dvMensajeBotones").hide();
                                }
                            }
                        } else {
                            ServiciosLinSel = [];
                            $($("#ifLineaServicio")[0].contentWindow.ObtenerServiciosLineas()).each(function () {
                                var Servicio = this;
                                ServiciosLinSel.push(Servicio);
                            });
                            DataLineas[$("#ddlLinea").val()].Servicios = []; DataLineas[$("#ddlLinea").val()].Servicios = ServiciosLinSel;
                        }
                        $(this).dialog("close");
                        fnMostrarPrecio($("#ddlModeloEquipoNuevo").val(), $("#ddlOperador").val(), "dePreLis");
                    }
                });
            }
            arButtons.push({
                text: "Cerrar",
                click: function () {
                    $(this).dialog("close");
                }
            });
            $('#dvBuscarLinea').dialog("option", "buttons", arButtons);

            //            $('#dvBuscarLinea').dialog("option", "buttons", [{ text: "Elegir", click: function () {
            //                $("#txtMsgNumero").val($("#ddlLinea").val());
            //                biSerLinSol = false;
            //                MesesContratoFactLInea = DataLineas[$("#ddlLinea").val()].MesesContrato;
            //                MontoFactLinea = DataLineas[$("#ddlLinea").val()].Monto;
            //                inIdTipoAsigCred = DataLineas[$("#ddlLinea").val()].CodTipAsiCre;
            //                if (DataLineas[$("#ddlLinea").val()].CodTipAsiCre == 1) {
            //                    if ($("#hdfPlaSol").val() != '' || $("#hdfPlaSol").val() != 0) { //solicitud con plan
            //                        if ($("#hdfPlaSol").val() != $("#hdfPlanProcesar").val()) {
            //                            $("#dvMensajeBotones").show();
            //                            $("#lblMensajeBotones").text('Ha seleccionado una línea sin plan o con un plan diferente al solicitado.');
            //                        } else {
            //                            $("#dvMensajeBotones").hide();
            //                        }
            //                    }
            //                } else {
            //                    ServiciosLinSel = [];
            //                    $($("#ifLineaServicio")[0].contentWindow.ObtenerServiciosLineas()).each(function () {
            //                        var Servicio = this;
            //                        ServiciosLinSel.push(Servicio);
            //                    });
            //                    DataLineas[$("#ddlLinea").val()].Servicios = []; DataLineas[$("#ddlLinea").val()].Servicios = ServiciosLinSel;
            //                }
            //                $(this).dialog("close");
            //                //actualizar servicios de DatosLineas

            //                //actualizar precio del equipo (monto sugerido de la solicitud)
            //                fnMostrarPrecio($("#ddlModeloEquipoNuevo").val(), $("#ddlOperador").val(), "dePreLis");
            //            }
            //            }, { text: "Cerrar", click: function () {
            //                $(this).dialog("close");
            //            }
            //            }]);
            //END ECONDEÑA  02/11/2016

            //#endregion

        } else {
            vTitulo = 'Detalle Línea';
            $("#ddlOperador").hide();
            $("#txtOperador").show();
            $("#ddlLinea").hide(); $("#ddlLinea").next().hide();
            $("#txtLinea").show();
            //mostrar datos linea
            $.ajax({
                type: "POST",
                url: "Adm_ProcesarSolicitud.aspx/DatosLinea_ProcSolicitud",
                data: "{'vcNum': '" + $("#txtMsgNumero").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var vLinea = result.d;
                    $("#txtOperador").val(vLinea.Operador.vcNomOpe);
                    $("#hdfOperador").val(vLinea.Operador.P_inCodOpe);
                    $("#txtLinea").val(vLinea.P_vcNum);
                    $("#txtCuenta").val(vLinea.Cuenta.vcNom);
                    $("#txtTipoAsig").val(vLinea.Cuenta.TipoAsignacionCredito.vcNom);
                    inIdTipoAsigCred = vLinea.Cuenta.TipoAsignacionCredito.P_inCod;
                    if (vLinea.Cuenta.TipoAsignacionCredito.P_inCod == '1') {
                        $("#trSelLinPlan").show();
                        $("#trSelServLin").hide();
                        if (vLinea.Plan.P_inCod != '') { //Linea tiene plan (mostrar plan)
                            $("#ddlPlan").hide(); $("#ddlPlan").next().hide();
                            $("#txtPlan").show();
                            $("#txtPlan").val(vLinea.Plan.vcNom);
                            $("#hdfPlanProcesar").val(vLinea.Plan.P_inCod);
                        } else {
                            $("#ddlPlan").show(); $("#ddlPlan").next().show();
                            $("#txtPlan").hide();
                            fnListarPlanes(vLinea.Operador.P_inCodOpe, $("#hdfPlanProcesar").val());
                        }
                    } else {
                        $("#trSelLinPlan").hide();
                        $("#trSelServLin").show();
                        $("#txtPlan").val('');
                        $("#hdfPlanProcesar").val('0');
                        //abrir iframe servicios
                        if (ServiciosLinSel.length == 0) {
                            AbrirLineaServicio(vLinea.P_vcNum, vLinea.Cuenta.P_vcCod, vLinea.Cuenta.TipoAsignacionCredito.P_inCod, JSON.stringify(vLinea.Servicios), "");
                        } else {
                            AbrirLineaServicio(vLinea.P_vcNum, vLinea.Cuenta.P_vcCod, vLinea.Cuenta.TipoAsignacionCredito.P_inCod, JSON.stringify(ServiciosLinSel), "");
                        }
                    }

                    //#region abrir ventana
                    ModalBuscarEquipo = $('#dvBuscarLinea').dialog({
                        title: vTitulo,
                        width: 585, //410,
                        height: 420, //310,
                        modal: true,
                        resizable: false
                    });

                    $('#dvBuscarLinea').dialog("option", "buttons", [{
                        text: "Cerrar", click: function () {
                            $(this).dialog("close");
                            //Actualizar Servicios de linea seleccion
                            try {
                                ServiciosLinSel = [];
                                $($("#ifLineaServicio")[0].contentWindow.ObtenerServiciosLineas()).each(function () {
                                    var Servicio = this;
                                    ServiciosLinSel.push(Servicio);
                                });
                            } catch (e) {
                            }
                        }
                    }]);
                    //#endregion
                },
                error: function (xhr, err) {
                    $("#dvCargando").hide();
                    alerta("Error, Estado: " + xhr.readyState + "\nEstado: " + xhr.status);
                }
            });

        }

        //comentado 25-11-2014 wapumayta
        //ModalBuscarEquipo = $('#dvBuscarLinea').dialog({
        //    title: vTitulo,
        //    width: 585, //410,
        //    height: 420, //310,
        //    modal: true,
        //    resizable: false
        //});
        //if ($("#hdfBuscarLinea").val() == 'buscar') {
        //    $('#dvBuscarLinea').dialog("option", "buttons", [
        //    { text: "Elegir", click: function () {
        //        $("#txtMsgNumero").val($("#ddlLinea").val());
        //        MesesContratoFactLInea = DataLineas[$("#ddlLinea").val()].MesesContrato;
        //        MontoFactLinea = DataLineas[$("#ddlLinea").val()].Monto
        //        inIdTipoAsigCred = DataLineas[$("#ddlLinea").val()].CodTipAsiCre;
        //        if (DataLineas[$("#ddlLinea").val()].CodTipAsiCre == 1) {
        //            if ($("#hdfPlaSol").val() != '' || $("#hdfPlaSol").val() != 0) { //solicitud con plan
        //                if ($("#hdfPlaSol").val() != $("#hdfPlanProcesar").val()) {
        //                    $("#dvMensajeBotones").show();
        //                    $("#lblMensajeBotones").text('Ha seleccionado una línea sin plan o con un plan diferente al solicitado.');
        //                } else {
        //                    $("#dvMensajeBotones").hide();
        //                }
        //            }
        //        } else {
        //            ServiciosLinSel = [];
        //            $($("#ifLineaServicio")[0].contentWindow.ObtenerServiciosLineas()).each(function () {
        //                var Servicio = this;
        //                ServiciosLinSel.push(Servicio);
        //            });
        //            DataLineas[$("#ddlLinea").val()].Servicios = [],
        //            DataLineas[$("#ddlLinea").val()].Servicios = ServiciosLinSel;
        //        }
        //        $(this).dialog("close");
        //        //actualizar servicios de DatosLineas
        //    }
        //    }, { text: "Cerrar", click: function () {
        //        $(this).dialog("close");
        //    }
        //    }]);
        //} else {
        //    $('#dvBuscarLinea').dialog("option", "buttons", [{ text: "Cerrar", click: function () {
        //        $(this).dialog("close");
        //        //Actualizar Servicios de linea seleccion
        //        ServiciosLinSel = [];
        //        $($("#ifLineaServicio")[0].contentWindow.ObtenerServiciosLineas()).each(function () {
        //            var Servicio = this;
        //            ServiciosLinSel.push(Servicio);
        //        });
        //    }
        //    }]);
        //}

    });
    $("#ddlLinea").change(function () {
        fnCargarDatosLineaBusqueda($(this).val());
    });
    $("#ddlOperador").change(function () {
        $("#ddlLinea").html('');
        if (Lineas.length > 0) {
            var i = 0;
            for (i = 0; i < Lineas.length; i++) {
                if (DataLineas[Lineas[i]].CodOperador == $(this).val()) {
                    $("#ddlLinea").append($("<option></option>").val(DataLineas[Lineas[i]].Numero).text(DataLineas[Lineas[i]].Numero));
                }
            }
            fnCargarDatosLineaBusqueda($("#ddlLinea").val());
        } else {
            $("#ddlLinea").append($("<option></option>").val("-2").text("Sin Datos"));
            $("#ddlLinea").attr("disabled", true);
            $("#ddlLinea").val("-2");
        }
        $('#ddlLinea').select2();
    });
    function fnCargarDatosLineaBusqueda(Numero) {
        if (DataLineas[Numero.toString()] != undefined) { //JHERRERA 20141210
            $("#txtCuenta").val(DataLineas[Numero.toString()].NomCuenta);
            $("#txtTipoAsig").val(DataLineas[Numero.toString()].NomTipAsiCre);
            if (DataLineas[Numero.toString()].CodTipAsiCre == '1') { //asig por planes
                $("#trSelLinPlan").show();
                $("#trSelServLin").hide();
                //plan
                if (DataLineas[Numero.toString()].CodPlan != 0) { //linea tiene plan
                    $("#txtPlan").show();
                    $("#ddlPlan").hide(); $("#ddlPlan").next().hide();
                    $("#txtPlan").val(DataLineas[Numero.toString()].NomPlan);
                    $("#hdfPlanProcesar").val(DataLineas[Numero.toString()].CodPlan);
                } else { //activar seleccion de plan
                    $("#txtPlan").hide();
                    $("#ddlPlan").show(); $("#ddlPlan").next().show();
                    fnListarPlanes($("#hdfOperador").val(), $("#hdfPlanProcesar").val());
                }
            } else { //asig por bolsa
                $("#trSelLinPlan").hide();
                $("#trSelServLin").show();
                $("#txtPlan").val('');
                $("#hdfPlanProcesar").val('0');
                //abrir iframe servicios
                //alert(JSON.stringify(DataLineas[Numero.toString()].Servicios));
                AbrirLineaServicio(Numero, DataLineas[Numero.toString()].CodCuenta, DataLineas[Numero.toString()].CodTipAsiCre, JSON.stringify(DataLineas[Numero.toString()].Servicios), "");
            }
        }
    }

    $("#btnNotas").click(function () {
        var id = $("#hdfCodSol").val();
        //window.top.VentanaNotaSignalRActiva = true;
        //$('#ifNota').attr("src", "Adm_SolicitudNota.aspx?IdSolicitud=" + id);
        //formulario = $('#dvNota').dialog({
        //    title: "Notas de la Solicitud: " + $("#lblCodigo").html(),
        //    height: 570,
        //    width: 700,
        //    modal: true,
        //    close: function (event, ui) {
        //        window.top.VentanaNotaSignalRActiva = false;
        //    }
        //});

        parent.$('#btnNota_'+id).click();
    });


    function validaPausaSolicitudPrevio() {

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

        if (tipoPausaInicial === tipoPausaActual || solicitudCulminada == true) {
            fnGuardarSolicitudPrevio();
            return;
        }

        if (tipoPausaActual === '-1') {
            ajaxReanudaSolicitud();
            return;
        }

        if (solicitudEnPausa) {
            ajaxReanudaSolicitud();
        }

        ajaxPausaSolicitud();
    }


    $("#btnGuardarPrevio").click(function () {
        validaPausaSolicitudPrevio();
    });

    function fnCerrar() {
        indiceTab = window.parent.tab.tabs("option", "selected");
        window.parent.tab.tabs("remove", indiceTab);
    }

    $("#btnCerrar").click(function () {

        var vcNuevaCadena = fnArmaCadenaDeControles();
        //alerta("Inicial: " + vcCadenaControles + " Nueva: " + vcNuevaCadena);

        if (vcCadenaControles == vcNuevaCadena) {
            fnCerrar();
        } else {
            confirmacion("Si cierra la ventana, se perderán los cambios realizados. ¿Está seguro de continuar?", fnCerrar, null, "Cerrar ventana");
        }
    });

    //$("#ddlNumero").change(function () {
    //    //$("#lblMsgNumero").text(($(this).val()).split("|")[1]);
    //    //$("#txtMsgNumero").val(($(this).val()).split("|")[1]);
    //    $("#txtMsgNumero").val(DataLineas[$(this).val()].NomPlan + "  (S/." + DataLineas[$(this).val()].Monto + ")");
    //    MesesContratoFactLInea = DataLineas[$(this).val()].MesesContrato;
    //    MontoFactLinea = DataLineas[$(this).val()].Monto
    //});

    $(".txtFecha").datepicker({
        changeMonth: true,
        changeYear: true,
        minDate: new Date()
    });
    //$(".imgBtn").attr("readOnly", true);
    //$(".imgBtn").attr("readOnly", true);
    $("#imgBorrarFechaAprobacion").attr("readOnly", true);
    $("#imgBorrarFechaEntrega").click(function () {
        $("#txtFecha").val("");
    });
    $("#imgBorrarFechaAprobacion").click(function () {
        $("#txtFechaAprobacion").val("");
    });

    $("#chkMismoIMEI").change(function () {
        if ($(this).is(":checked")) {
            $("#txtIMEIEnt").val($("#txtIMEIEquipoAnt").val());
        } else {
            $("#txtIMEIEnt").val("");
        }
    });


    //botones accion
    $("#btnGuardar").click(function (event) {//guardar procesar

        if (solicitudEnPausa) {
            alerta("La solicitud se encuentra en pausa.");
            return;
        }

        const textoLblBtnGuardar = $("#lblBtnGuardar").text();
        var AccionBotonGuardar = textoLblBtnGuardar === "Cerrar ticket" ? "Procesar" : textoLblBtnGuardar;

        var EstInicial = $("#hdfEstado_Apr").val();
        var EstFinal = $("#ddlEstadoSolicitud").val();
        var Accion = "Guardar";
        var dcMonto;
        var inNumeroCuotas;
        var vcMesesCuotas;
        var inMesesPeriodoGracia = parseInt($("#txtPeriodoGracia").val());
        var descSolicitud = '';
        if (CapturaDatos['Mensaje'].btAct == "1") {
            descSolicitud = $("#txtDescSol").data("kendoEditor").value().replace(/'/g, "&#39").replace(/\\/g, "&#92");
        }

        if ($("#hdfMesesCuotas").val() == '') {
            inNumeroCuotas = $("#txtMesesCuotas").val();
            vcMesesCuotas = '';
        } else {
            inNumeroCuotas = $("#hdfMesesCuotas").val().split(",").length;
            vcMesesCuotas = $("#hdfMesesCuotas").val();
        }
        dcMonto = $("#txtMonto").val();
                
        if (AccionBotonGuardar == 'Guardar')
        {
            if (EstInicial != EstFinal) {
                if (EstFinal == "33")
                    $("#lblMsjConfirmacion").text("La solicitud se creará con estado 'Por Aprobar' e iniciará su ciclo respectivo. ¿Está seguro de crearla con dicho estado?");
                else if (EstFinal == "34")
                    $("#lblMsjConfirmacion").text("La solicitud se creará con estado 'Aprobada' y estará a la espera de ser procesada por un especialista.");

                $('#divMsgConfirmar').dialog({
                    title: "¡Alerta!",
                    modal: true,
                    width: 330,
                    buttons: {
                        "Si": function () {
                            if (!ValidaFormularioPrevio()) {
                                return;
                            }
                            fnGuardar(EstInicial, EstFinal, inNumeroCuotas, dcMonto, Accion, vcMesesCuotas, descSolicitud, inMesesPeriodoGracia);
                            $(this).dialog("close");
                        },
                        "Cancelar": function () {
                            $(this).dialog("close");
                        }
                    }
                });
            } else {
                if (!ValidaFormularioPrevio()) {
                    return;
                }
                fnGuardar(EstInicial, EstFinal, inNumeroCuotas, dcMonto, Accion, vcMesesCuotas, descSolicitud, inMesesPeriodoGracia);
            }
        }
        else if (AccionBotonGuardar == 'Aprobar')
        {
            if (!ValidaFormularioPrevio()) {
                return;
            }
            var FecHor = $("#txtFechaAprobacion").val();
            var day = FecHor.substr(6, 4).toString() + FecHor.substr(3, 2).toString() + FecHor.substr(0, 2).toString();
            var fecApro = "dbo.MOV_f_ConvierteAnsiEnFecha($$$" + day + "$$$)";
            BloquearPagina(true);
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
                    //Mensaje("<br/><h1>La solicitud fue aprobada con éxito</h1><br/>", document, CerroMensaje);
                    $("#btnGuardarPrevio").click();
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
        else if (AccionBotonGuardar == 'Procesar')
        {
            //debugger;
            var EstSol = 7; //estado de proceso Culminado
            
            var codNumLim = $("#txtMsgNumero").val();
            var CodIMEI = '';
            
            if ($("#txtIMEIElegido").val() == '' || $("#txtIMEIElegido").val() == undefined || $("#txtIMEIElegido").val() == null) {
                CodIMEI = '';
            } else {
                CodIMEI = $("#txtIMEIElegido").val();
            }
            inTipSol = $("#hdfTipSol").val();

            //validaciones por tipo
            var validacionPorTipo = true;
            var tituloValid = '';
            var mensajeValid = '';
            var XMLDetallePaqAmp = '';
            var DetalleServicios = '';


            if (validacionPorTipo) {

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
                            //var dcMonto2 = parseFloat(dcMonto.replace(/\./g, '').replace(/,/g, ''));
                            var dcMonto2 = DevuelveNumeroSinFormato(dcMonto, oCulturaLocal, false);
                            var dcMontoS = DevuelveNumeroSinFormato($("#lblMontoSugerido").text(), oCulturaLocal, false);

                            if ($("#hdfIdFInanciamiento").val() != "0" && dcMonto2 == 0) { //solicitud tiene financiamiento y monto es igual a cero
                                $('#divConMontoCero').dialog({
                                    title: "Validar monto de solicitud",
                                    modal: true,
                                    buttons: {
                                        "Si": function () {
                                            $(this).dialog("close");
                                            fnProcesarSolicitud(CodIMEI.replace(/'/g, "&#39"), $("#hdfCodSol").val(), inTipSol, EstSol, codNumLim, $("#txtFecha").val(), '' /*, inCodPlan, dcMonto, inNumeroCuotas, MesesContratoFactLInea, MontoFactLinea, XMLDetallePaqAmp, inMesesPeriodoGracia, dcLimiteCredito*/);
                                        },
                                        "Cancelar": function () {
                                            $(this).dialog("close");
                                        }
                                    }
                                });
                            } else if ($("#hdfIdFInanciamiento").val() != "0" && inTipSol == 2 && dcMonto2 != dcMontoS) {
                                $("#lblMontoProcesar").text($("#txtMonto").val());
                                $("#lblMontoSugeridoProcesar").text($("#lblMontoSugerido").text());
                                $("#divConMontoSugerido").dialog({
                                    title: "Validar monto de solicitud",
                                    modal: true,
                                    risizable: false,
                                    buttons: {
                                        "Continuar": function () {
                                            $(this).dialog("close");
                                            fnProcesarSolicitud(CodIMEI.replace(/'/g, "&#39"), $("#hdfCodSol").val(), inTipSol, EstSol, codNumLim, $("#txtFecha").val(), '' /*, inCodPlan, dcMonto, inNumeroCuotas, MesesContratoFactLInea, MontoFactLinea, XMLDetallePaqAmp, inMesesPeriodoGracia, dcLimiteCredito*/);
                                        },
                                        "Cancelar": function () {
                                            $(this).dialog("close");
                                        }
                                    }
                                });
                            } else {
                                fnProcesarSolicitud(CodIMEI.replace(/'/g, "&#39"), $("#hdfCodSol").val(), inTipSol, EstSol, codNumLim, $("#txtFecha").val(), '' /*, inCodPlan, dcMonto, inNumeroCuotas, MesesContratoFactLInea, MontoFactLinea, XMLDetallePaqAmp, inMesesPeriodoGracia, dcLimiteCredito*/);
                            }
                        },
                        "Cancelar": function () {
                            $(this).dialog("close");
                        }
                    }
                });
            } else { //solicitud de ampliacion (validar seleccion de paquetes)
                $("#lblMsjConfirmarProcAmp").text(mensajeValid);
                $("#divMsgConfirValidPorTipo").dialog({
                    title: tituloValid,
                    modal: true,
                    buttons: {
                        "Continuar": function () {
                            $(this).dialog("close");
                            $('#divConPro').dialog({
                                title: "Cerrar Solicitud",
                                modal: true,
                                buttons: {
                                    "Si": function () {
                                        $(this).dialog("close");
                                        var dcMonto2 = parseFloat(dcMonto.replace(/\./g, '').replace(/,/g, ''));
                                        if (dcMonto2 == 0) {
                                            $('#divConMontoCero').dialog({
                                                title: "Validar monto de solicitud",
                                                modal: true,
                                                buttons: {
                                                    "Si": function () {
                                                        $(this).dialog("close");
                                                        fnProcesarSolicitud(CodIMEI.replace(/'/g, "&#39"), $("#hdfCodSol").val(), inTipSol, EstSol, codNumLim, $("#txtFecha").val(), '' /*, inCodPlan, dcMonto, inNumeroCuotas, MesesContratoFactLInea, MontoFactLinea, XMLDetallePaqAmp, inMesesPeriodoGracia, dcLimiteCredito*/);
                                                    },
                                                    "Cancelar": function () {
                                                        $(this).dialog("close");
                                                    }
                                                }
                                            });
                                        } else {
                                            fnProcesarSolicitud(CodIMEI.replace(/'/g, "&#39"), $("#hdfCodSol").val(), inTipSol, EstSol, codNumLim, $("#txtFecha").val(), '' /*, inCodPlan, dcMonto, inNumeroCuotas, MesesContratoFactLInea, MontoFactLinea, XMLDetallePaqAmp, inMesesPeriodoGracia, dcLimiteCredito*/);
                                        }
                                    },
                                    "Cancelar": function () {
                                        $(this).dialog("close");
                                    }
                                }
                            });
                        },
                        "Volver": function () {
                            $(this).dialog("close");
                        }
                    }
                });

            }
            
        }
    });

    function fnGuardar(EstInicial, EstFinal, inNumeroCuotas, dcMonto, Accion, vcMesesCuotas, descSolicitud, inMesesPeriodoGracia) {
        BloquearPagina(true);


        var vcAdjuntos = "";
        $(".VARBINARY").each(function (i) {
            var vcNomCon = $(this).attr("obj");
            if ($(this).hasClass("imgButton")) { //habilitado
                if ($(this).attr("oblig") == "True" && $('#file_' + vcNomCon).text() == "") {
                    vcVacio = "1";
                } else {

                    if (this.value != "") {
                        vcAdjuntos += "[" + $(this).attr("obj") + "],";
                        vcAdjuntos += $('#file_' + vcNomCon).text() + ";";
                    }
                    else {
                        vcAdjuntos += "[" + $(this).attr("obj") + "],";
                        vcAdjuntos += ";";
                    }
                }
            }
        });

        var vcColor = $("#txtColor").val().replace(/'/g, "&#39").replace(/\\/g, "&#92");
        //var ddlTipoPlan = $("#ddlTipoPlan").val();
        //var ddlConexionInternet = $("#ddlConexionInternet").val();
        //var ddlNumerosFrecuentes = $("#ddlNumerosFrecuentes").val();
        //var ddlPaqueteSMS = $("#ddlPaqueteSMS").val();
        var ddlSeguro = $("#ddlSeguro").val();

        $.ajax({
            type: "POST",
            url: "Adm_ProcesarSolicitud.aspx/Guardar",
            data: "{'vcCodEmp': '" + $("#hdfCodEmp").val() + "'," +
                        "'vcAdmin': '" + $("#hdfAdmin").val() + "'," +
                        "'inCodSol': '" + $("#hdfCodSol").val() + "'," +
                        "'inCodTipSol': '" + $("#hdfCodTipSol").val() + "'," +
                        "'inEstInicial': '" + EstInicial + "', " +
                        "'inEstFinal': '" + EstFinal + "'," +
                        "'vcValAnt': ''," +
                        "'vcUpdPer': ''," +
                        "'vcAdjuntos': '" + vcAdjuntos + "'," +
                        "'vcColor': '" + vcColor + "'," +
                        "'Seguro': '" + ddlSeguro + "'," +
                        "'biFraccionamiento': '0'," +
                        "'inNumeroCuotas': '" + inNumeroCuotas + "'," +
                        "'dcMonto': '" + dcMonto + "'," +
                        "'vcTabla': '" + $("#hdfTabla").val() + "'," +
                        "'accion': '" + Accion + "'," +
                        "'vcMesesCuotas': '" + vcMesesCuotas.toString() + "'," +
                        "'vcDesSol': '" + descSolicitud + "'," +
                        "'vcComentario': ''," +
                        "'inMesesPeriodoGracia': '" + inMesesPeriodoGracia + "'," +
                        "'IdFinanciamiento': '" + $("#ddlFinanciamiento").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == '') {
                    window.parent.ActualizarGrilla();
                    window.scrollTo(0, 0);
                    indiceTab = window.parent.tab.tabs("option", "selected");
                    SolicitudModificada_EnviarMensaje(result.d, "", "");
                    Mensaje("<br/><h1>Su solicitud fue guardada con éxito</h1><br/>", document, CerroMensaje);
                } else {
                    alerta("La solicitud no pudo ser procesada por problemas con el financiamiento: '" + result.d + "'.", null, null, "warning");
                    BloquearPagina(false);
                    return;
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    $("#btnEliminar").click(function () {
        var AccionBotonEliminar = $("#lblBtnEliminar").text();
        var EstInicial = "8"; //EnProceso
        var EstFinal = "9"; //Anulada
        var inMesesPeriodoGracia = parseInt($("#txtPeriodoGracia").val());
        if ($("#hdfMesesCuotas").val() == '') {
            inNumeroCuotas = $("#txtMesesCuotas").val();
            vcMesesCuotas = '';
        } else {
            inNumeroCuotas = $("#hdfMesesCuotas").val().split(",").length;
            vcMesesCuotas = $("#hdfMesesCuotas").val();
        }
        dcMonto = $("#txtMonto").val();
        if (AccionBotonEliminar == 'Eliminar') {
            $('#divConEli').dialog({
                title: "Eliminar Solicitud",
                modal: true,
                buttons: {
                    "Si": function () {
                        BloquearPagina(true);
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
                        $(this).dialog("close");
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
                        $(this).dialog("close");

                        $('#dvRechazar').dialog({
                            title: "Rechazar Solicitud",
                            modal: true,
                            width: 500,
                            buttons: {
                                "Rechazar": function () {
                                    if ($.trim($("#txtComentarios").val()) == "") {
                                        alerta("Debe ingresar algún comentario", "Solicitud", null, "warning");
                                        return;
                                    }
                                    BloquearPagina(true);
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
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                }
            });
        } else if (AccionBotonEliminar == 'Anular') {
            var AccionAnular = 'Anular';
            if ($("#hdfIngAlm").val() == '1') {
                $("#trAccionIngresoAlmacen").show();
            }
            $('#divConAnu').dialog({
                title: "Anular Solicitud",
                modal: true,
                buttons: {
                    "Si": function () {
                        if ($("#hdfIngAlm").val() == '1') {
                            if (!$("#rbtAnularIngreso").is(":checked") && !$("#rbtActualizarDisp").is(":checked")) {
                                alerta("Debe seleccionar una acción para el dispositivo asociado a la solicitud.", null, null, "warning");
                                return;
                            }
                            AccionAnular = $("#rbtAnularIngreso").is(":checked") ? 'Anular_Anular' : 'Anular_Actualizar';
                        }
                        $(this).dialog("close");
                        $('#dvRechazar').dialog({
                            title: "Anular Solicitud",
                            modal: true,
                            width: 500,
                            buttons: {
                                "Anular": function () {
                                    let data = {
                                        vcCodEmp: $("#hdfCodEmp").val(),
                                        vcAdmin: $("#hdfAdmin").val(),
                                        inCodSol: $("#hdfCodSol").val(),
                                        inCodTipSol: $("#hdfCodTipSol").val(),
                                        inEstInicial: EstInicial,
                                        inEstFinal: EstFinal
                                        , vcValAnt: ''
                                        , vcUpdPer: ''
                                        , vcAdjuntos: ''
                                        , vcColor: ''
                                        , Seguro: ''
                                        , biFraccionamiento: '0'
                                        , inNumeroCuotas: inNumeroCuotas
                                        , dcMonto: dcMonto
                                        , vcTabla: $("#hdfTabla").val()
                                        , accion: AccionAnular
                                        , vcMesesCuotas: vcMesesCuotas
                                        , inMesesPeriodoGracia: inMesesPeriodoGracia
                                        , vcComentario: $.trim($("#txtComentarios").val())
                                        , vcDesSol: $.trim($("#txtDescSol").val())
                                        , IdFinanciamiento: $("#ddlFinanciamiento").val()
                                    };

                                    AnularSolicitud(data);
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

    function fnAsignar() {
        var nomTecAsig;
        nomTecAsig = $("#bpTecnicoAsignado_txtValorBusqueda").val();
        $("#lblNombreTecAsig").text(nomTecAsig);
        var fnURL;
        if ($("#hdfEstado").val() == "6") { //agregado 29-09-2014
            fnURL = 'Adm_EditarSolicitudPersonalizada.aspx/AsignarSolicitudA';
        } else {
            fnURL = 'Adm_ListadoSolicitudes.aspx/ReasignarSolicitudesA';
        }
        if ($("#hdfTecnico").val() == "1") { //el usuario logeado es técnico
            if ($("#chkAsignarA").is(":checked")) {
                if (TecnicoAsignado == '') {
                    alerta("Debe de seleccionar un especialista", null, null, "warning");
                    return;
                }
                //Asignar a tecnico selecciOnado
                $('#divConAsiA').dialog({
                    title: 'Asignar Solicitud A',
                    modal: true,
                    buttons: {
                        "Si": function () {
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
                                            alerta("No se puede asignar la solicitud porque el especialista seleccionado no tiene permisos de procesar y/o anular una solicitud", null, null, "warning");
                                            BloquearPagina(false);
                                        } else {
                                            indiceTab = window.parent.tab.tabs("option", "selected");
                                            //Mensaje("<br/><h1>La solicitud fue asignada con éxito</h1><br/><h2>Asignada a: " + nomTecAsig + "</h2>", document, CerroMensaje);
                                            $("#btnGuardarPrevio").click();
                                        }
                                    } else {
                                        indiceTab = window.parent.tab.tabs("option", "selected");
                                        //Mensaje("<br/><h1>La solicitud fue asignada con éxito</h1><br/><h2>Asignada a: " + nomTecAsig + "</h2>", document, CerroMensaje);
                                        $("#btnGuardarPrevio").click();
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
            } else {
                //Asignar a Usuario Logeado (si ve el boton es tecnico)
                $('#divConAsi').dialog({
                    title: 'Asignarse Solicitud',
                    modal: true,
                    buttons: {
                        "Si": function () {
                            BloquearPagina(true);
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
                                    //Mensaje("<br/><h1>La solicitud fue asignada con éxito</h1><br/>", document, CerroMensaje);
                                    $("#btnGuardarPrevio").click();
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
        } else if ($("#hdfAdmin").val() == "1") { //el usuario logeado es administrador
            if (!$("#chkAsignarA").is(":checked")) {
                alerta("Ud. no es especialista para este tipo de solictud, debe de asignar\nla solicitud a un Técnico para este tipo de solicitud", null, null, "warning");
                $("#chkAsignarA").focus();
                return;
            } else {
                if (TecnicoAsignado == '') {
                    alerta("Debe de seleccionar un especialista", null, null, "warning");
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
                                alerta("No se puede asignar la solicitud porque el especialista seleccionado no tiene permisos de procesar y/o anular una solicitud", null, null, "warning");
                                BloquearPagina(false);
                            } else {
                                indiceTab = window.parent.tab.tabs("option", "selected");

                                $("#btnGuardarPrevio").click();
                                //Mensaje("<br/><h1>La solicitud fue asignada con éxito</h1><br/><h2>Asignada a: " + result.d.toString() + "</h2>", document, CerroMensaje);
                            }
                        } else {
                            indiceTab = window.parent.tab.tabs("option", "selected");

                            $("#btnGuardarPrevio").click();

                            //Mensaje("<br/><h1>La solicitud fue asignada con éxito</h1><br/><h2>Asignada a: " + nomTecAsig + "</h2>", document, CerroMensaje);
                        }
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            }
        } else {
            alerta("Ud. no tiene permisos para asignarse una solicitud", null, null, "warning");
        }
    }

    $("#btnAsignar").click(function () {
        if ($("#hdfEstado").val() == "8") {
            var vcNuevaCadena = fnArmaCadenaDeControles();
            if (vcCadenaControles == vcNuevaCadena) {
                fnAsignar();
            } else {
                confirmacion("Si reasigna esta solicitud, se perderán los cambios realizados. ¿Está seguro de continuar?", fnAsignar, null, "Asignar Solicitud A");
            }
        } else {
            fnAsignar();
        }
    });

    $("#btnElegirEquipo").click(function () {
        ServiciosLinSel = [];
        var id = $("#tbEquipo").jqGrid('getGridParam', 'selrow');
        
        var dataEquipo = $("#tbEquipo").getRowData(id);
        var Imei = dataEquipo["P_vcCodIMEI"];
        var selNumero = dataEquipo["vcNum"];
        var selPlan = dataEquipo["vcNomEst"];
        var dcMontoLinea = dataEquipo["costoReposicion"];
        var MesesCont = dataEquipo["inNumMesProCam"];
        inCantServLinea = dataEquipo["inMin"];
        inIdTipoAsigCred = dataEquipo["TipoAsiganacion"];
        $("#hdfPlanProcesar").val(dataEquipo["inEst"] == 0 ? -1 : dataEquipo["inEst"]);
        if (Imei) {
            var equipo = $("#ddlModeloEquipoBuscar").val();
            if ($("#hdfCodTipSol").val() != 4) {

                $("#lblErrorIMEIElegido").html("");
                $("#imgErrorIMEIElegido").hide();

                //seleccion de un dispositivo asociado a linea
                if (selNumero != '') {

                    var vcMensaje = "";
                    var NumAnteriorElegido = $("#txtMsgNumero").val();

                    if (NumAnteriorElegido == "") {
                        $("#txtIMEIElegido").val(Imei);
                        //$("#ddlNumero").append($("<option></option>").val(selNumero).html(selNumero));
                        //$("#ddlNumero").val(selNumero);
                        //$("#ddlNumero").attr("disabled", true);

                        //cambio 22/08/2014 - wapumayta
                        //$("#txtMsgNumero").val(selPlan + "  (S/." + dcMonto + ")");

                        $("#txtMsgNumero").val(selNumero);
                        biSerLinSol = false;
                        $("#lblBuscarLinea").text('Detalle Línea');

                        $("#hdfBuscarLinea").val("detalle");

                        MesesContratoFactLInea = MesesCont;
                        MontoFactLinea = dcMontoLinea;
                        //info
                        $("#dvInfoLinea").show();
                        $("#ttgInfoLinea_DvMiMensaje").html("");
                        $("#ttgInfoLinea_DvMiMensaje").append("Mostrando línea asociada al dispositivo seleccionado");

                        //operador de la linea
                        if (dataEquipo["F_vcCodEmp"] != '') {
                            //buscar el valor del equipo para el nuevo operador
                            fnMostrarPrecio(equipo, dataEquipo["F_vcCodEmp"], "dePreLis");
                        }
                    }
                    else {
                        if (selNumero != NumAnteriorElegido) {
                            vcMensaje = "El Dispositivo seleccionado está asociado a una línea distinta, se procederá a realizar el cambio de selección de línea, segun el equipo seleccionado.";
                        } else {
                            vcMensaje = "";
                        }

                        $("#lblMensajeAlertaSolicitudes").text(vcMensaje);
                        $('#dvAlertaSolicitudes').dialog({
                            title: "Mensaje del Sistema",
                            modal: true,
                            width: 330,
                            buttons: {
                                "Si": function () {
                                    $("#txtIMEIElegido").val(Imei);
                                    //$("#ddlNumero").append($("<option></option>").val(selNumero).html(selNumero));
                                    //$("#ddlNumero").val(selNumero);
                                    //$("#ddlNumero").attr("disabled", true);

                                    //cambio 22/08/2014 - wapumayta
                                    //$("#txtMsgNumero").val(selPlan + "  (S/." + dcMonto + ")");

                                    $("#txtMsgNumero").val(selNumero);
                                    biSerLinSol = false;
                                    $("#lblBuscarLinea").text('Detalle Línea');

                                    $("#hdfBuscarLinea").val("detalle");

                                    MesesContratoFactLInea = MesesCont;
                                    MontoFactLinea = dcMontoLinea;
                                    //info
                                    $("#dvInfoLinea").show();
                                    $("#ttgInfoLinea_DvMiMensaje").html("");
                                    $("#ttgInfoLinea_DvMiMensaje").append("Mostrando línea asociada al dispositivo seleccionado");

                                    //operador de la linea
                                    if (dataEquipo["F_vcCodEmp"] != '') {
                                        //buscar el valor del equipo para el nuevo operador
                                        fnMostrarPrecio(equipo, dataEquipo["F_vcCodEmp"], "dePreLis");
                                    }
                                    $(this).dialog("close");
                                },
                                "No": function () {
                                    $(this).dialog("close");
                                }
                            }
                        });
                    }
                    

                } else {

                    $("#txtIMEIElegido").val(Imei);
                    //cambio 22/08/2014 - wapumayta
                    //$("#ddlNumero").attr("disabled", false);
                    //mostrarLineasDisponibles(equipo);
                    if ($("#hdfBuscarLinea").val() == "detalle") {
                        $("#txtMsgNumero").val('');
                        biSerLinSol = false;
                    }
                    $("#lblBuscarLinea").text('Buscar Linea');

                    $("#hdfBuscarLinea").val("buscar");

                    $("#dvInfoLinea").show();
                    $("#ttgInfoLinea_DvMiMensaje").html("");
                    $("#ttgInfoLinea_DvMiMensaje").append("Mostrando lineas disponibles sin dispositivos asociados");
                }
                $("#ddlModeloEquipoNuevo").val(equipo);
                ActualizarCondicionCuenta();
                ActualizarCondicionPlan();
            } else { //mostrar linea de dispositivo temporal
                $("#lblErrorIMEIEnt").html("");
                $("#imgErrorIMEIEnt").hide();
                $("#txtIMEIEnt").val(Imei);
                $("#chkMismoIMEI").attr("checked", false);
                $("#txtNumeroEquiTemp").val($("#tbEquipo").getRowData(id)["vcNum"]);
            }
            ModalBuscarEquipo.dialog('close');
        } else {
            alerta("Debe seleccionar un dispositivo", null, null, "warning");
        }
        btServLineaEdit = false;
    });

    $("#btnCerrarBusqueda").click(function (event) {
        ModalBuscarEquipo.dialog('close');
    });

    //detalle de financiamiento
    function InfoFinanciamiento() {
        var wAncho = $(window).width();
        var wAlto = $(window).height();
        $("#ifInfoFinanciamiento").attr("width", 550);
        $("#ifInfoFinanciamiento").attr("height", wAlto - 130);
        $("#ifInfoFinanciamiento").attr("src", "../Mantenimiento/Cam_Mnt_Financiamiento.aspx?Cod=" + $("#ddlFinanciamiento").val() + "&FinancSit=0");
    }

    $('#divInfoFinanciamiento').dialog({
        title: "Detalle de Financiamiento",
        width: 575, //  690,
        height: $(window).height() - 80, //430,
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

    //AMPLIACION
    //editar paquetes de servicios
    //$("#btnEditCancelar").click(function () {
    //    $("#dvEditarServicioAmpliacion").dialog("close");
    //});
    //$("#btnEditAceptar").click(function () {
    //    var rowId = $("#hdfEditPaqueteAmp").val();
    //    DatosEdicion = { btEditado: '1',
    //        vcCantEdit: $("#ddlEditPaquetes").val() + " " + $("#ddlEditPaquetes option[value='" + $("#ddlEditPaquetes").val() + "']").attr("medida"),
    //        vcCantRealEdit: $("#ddlEditPaquetes").val(),
    //        dcCostoEdit: FormatoNumero($("#ddlEditPaquetes option[value='" + $("#ddlEditPaquetes").val() + "']").attr("costo"), oCulturaLocal),
    //        dcCostoEditReal: $("#ddlEditPaquetes option[value='" + $("#ddlEditPaquetes").val() + "']").attr("costo")
    //    }
    //    $("#tbServAmpliacionEdit").jqGrid('setRowData', rowId, DatosEdicion);
    //    $("#dvEditarServicioAmpliacion").dialog("close");
    //    //editar costo mensual
    //    fnActualizarMontoTotalAmpliacion();
    //    //var rowSel = $("#tbServAmpliacionEdit").jqGrid('getGridParam', 'selarrrow');
    //    //var totalCosto = 0;
    //    //for (var i = 0; i < rowSel.length; i++) {
    //    //    var datosPaquete = $("#tbServAmpliacionEdit").jqGrid('getRowData', rowSel[i]);
    //    //    var costoServicio = datosPaquete.dcCostoReal;
    //    //    var costoEditado = datosPaquete.dcCostoEditReal;
    //    //    if (costoEditado != '') {
    //    //        totalCosto = parseFloat(totalCosto) + parseFloat(costoEditado);
    //    //    } else {
    //    //        totalCosto = parseFloat(totalCosto) + parseFloat(costoServicio);
    //    //    }
    //    //}
    //    //$("#txtMontoTotalServAmp").val(oCulturaLocal.Moneda.vcSimMon + " " + FormatoNumero(totalCosto, oCulturaLocal, false));
    //});
    //mostrar detalles de plan solicitados y actual
    $("#imgDetPlanActual,#imgDetPlanSolicitado,#imgDetPlanProcesar,#imgDetPlanAnterior").click(function () {
        var vCodPlan = 0;
        if ($(this).attr("id") == "imgDetPlanAnterior") {
            vCodPlan = $("#hdfPlaIni").val();
        } else if ($(this).attr("id") == "imgDetPlanActual") {
            vCodPlan = $("#hdfPlaAct").val();
        } else if ($(this).attr("id") == "imgDetPlanSolicitado") {
            vCodPlan = $("#hdfPlaSol").val();
        } else if ($(this).attr("id") == "imgDetPlanProcesar") {
            vCodPlan = $("#hdfPlanProcesar").val();
        }
        if (vCodPlan == 0 || vCodPlan == -1) {
            alerta("Seleccione un Plan", null, null, "warning");
            return;
        }
        $("#ifDetallePlan").attr("src", "../Mantenimiento/Mnt_DetallePlan.aspx?CodPlan=" + vCodPlan);
        $('#dvDetallePlan').dialog({
            title: "Detalle de plan",
            modal: true,
            resizable: false,
            width: 450,
            height: 430,
            buttons: {
                "Cerrar": function () {
                    $(this).dialog("close");
                }
            }
        });
    });
    //FIN AMPLIACION

    //TIPO DE MONTO
    $("#ddlTipoMonto").change(function () {
        var descTipoMonto = $("#ddlTipoMonto option[value= '" + $(this).val() + "']").attr("desc");
        if (descTipoMonto != undefined && descTipoMonto != null) {
            $("#lblTipoMontoDesc").text(descTipoMonto);
            var variable = $("#ddlTipoMonto").val();
            if (variable == "CIA") {
                $("#trMontoFijo").show();
                $("#trFinanciamiento").hide();
            }
            else {
                $("#trMontoFijo").show();
                $("#trFinanciamiento").show();
            }
        }
    });

    //SELECCION DE PLAN - PROCESAR
    $("#ddlPlan").change(function () {
        $("#hdfPlanProcesar").val($(this).val());
        MontoFactLinea = $("#ddlPlan option[value=" + $(this).val() + "]").attr("dcMon");
    });

    //20141125 wapumayta
    $('#ifLineaServicio').load(function (response, status, xhr) {
        if ($("#ifLineaServicio")[0].contentWindow.CargarServiciosLineas != undefined) //JHERRERA 20141210
            $("#ifLineaServicio")[0].contentWindow.CargarServiciosLineas(vServiciosLinea);
    });

    Mantenimiento_Mostrar_VARBINARY("../Mantenimiento/", "../../../");

    //if ($("#hdfFormatoAsignacion_Visible").val() == "0") {
    //    $("#trFormatoAsignacion").hide();
    //    $("#FormatoAsignacion_Obligatorio").html("");
    //}
    //else {
    //    $("#trFormatoAsignacion").show();
    //    if ($("#hdfFormatoAsignacion_Obligatorio").val() == "0")
    //        $("#FormatoAsignacion_Obligatorio").html("");
    //    else
    //        $("#FormatoAsignacion_Obligatorio").html("(*)");
    //}

    $("#spTituloValeResguardo").html("Vale de Resguardo (pdf,zip,rar)");
    if ($.trim($("#hdfTituloValeResguardo").val()) != "") {
        $("#spTituloValeResguardo").html($.trim($("#hdfTituloValeResguardo").val()) + " (pdf,zip,rar)");
    }


    if ($("#hdfOrdenServicio_Visible").val() == "0") {
        $("#trOrdenServicio").hide();
        $("#OrdenServicio_Obligatorio").html("");
    }
    else {
        $("#trOrdenServicio").show();
        if ($("#hdfOrdenServicio_Obligatorio").val() == "0")
            $("#OrdenServicio_Obligatorio").html("");
        else
            $("#OrdenServicio_Obligatorio").html("(*)");
    }

    if ($("#hdfValeResguardo_Visible").val() == "0") {
        $("#trValeResguardo").hide();
        $("#hdfValeResguardo_Obligatorio").html("");
    }
    else {
        $("#trValeResguardo").show();
        if ($("#hdfValeResguado_Obligatorio").val() == "0")
            $("#hdfValeResguardo_Obligatorio").html("");
        else
            $("#hdfValeResguardo_Obligatorio").html("(*)");
    }


    if ($("#hdfEstado").val() == 7) {
        //Validar si se muestra el botón grabar...
        if ($("#hdfEsResponsableTI").val() == "1" || $("#hdfAdmin").val() == "1") {
            $("#btnGuardarPrevio").show();
        }
    }

    //Nuevo
    //if ($("#hdfCodTipSol").val() == "2") {
    //    if ($("#hdfEsResponsableTI").val() == "1" || $("#hdfAdmin").val() == "1") {
    //        $("#btnDescargarFormatoAsignacion").show();
    //    }
    //}
    //$("#btnDescargarFormatoAsignacion").click(function () {
    //    GenerarFormatoAsignacion($("#hdfCodTipSol").val(), $("#hdfCodSol").val());
    //});

    //Nuevo
    if ($("#hdfCodTipSol").val() == "2") {
        $("#trColor").show();
        //$("#trTipoPlan").show();
        //$("#trConexionInternet").show();
        //$("#trNumerosFrecuentes").show();
        //$("#trPaqueteSMS").show();
        $("#trSeguro").show();
    }

    //Cambio
    if ($("#hdfCodTipSol").val() == "1") {
        $("#trColor").show();
    }

    if ($("#hdfEstado").val() != 7) { //Diferente de culminado
        if ($("#hdfEsResponsableTI").val() == "1" || $("#hdfAdmin").val() == "1") {
            $('#txtColor').attr("disabled", false);
            $('#ddlTipoPlan').attr("disabled", false);
            $('#ddlConexionInternet').attr("disabled", false);
            $('#ddlNumerosFrecuentes').attr("disabled", false);
            $('#ddlPaqueteSMS').attr("disabled", false);
            $('#ddlSeguro').attr("disabled", false);
        }
    }
    else {
        $('#txtColor').attr("disabled", true);
        $('#ddlTipoPlan').attr("disabled", true);
        $('#ddlConexionInternet').attr("disabled", true);
        $('#ddlNumerosFrecuentes').attr("disabled", true);
        $('#ddlPaqueteSMS').attr("disabled", true);
        $('#ddlSeguro').attr("disabled", true);
    }


    /* AccionPlan */
    if ($("#cboAccionEquipo_Valor").val() != "") {
        $("#cboAccionEquipo").val($("#cboAccionEquipo_Valor").val());
        $("#cboAccionEquipo").change();
    }
    if ($("#cboAccionCuenta_Valor").val() != "") {
        $("#cboAccionCuenta").val($("#cboAccionCuenta_Valor").val());
        $("#cboAccionCuenta").change();
    }
    if ($("#cboAccionPlan_Valor").val() != "") {
        $("#cboAccionPlan").val($("#cboAccionPlan_Valor").val());
        $("#cboAccionPlan").change();
    }

    ActualizarCondicionCuenta();
    ActualizarCondicionPlan();

    var variable = $("#ddlTipoMonto").val();
    if (variable = "CIA") {
        $("#trMontoFijo").show();
        $("#trFinanciamiento").hide();
    }
    else {
        $("#trMontoFijo").show();
        $("#trFinanciamiento").show();
    }

    
    if ($("#hdfBiMontoFijo").val() !== "False") {
        $("#trMontoFijo").show();
    } else {
        $("#trMontoFijo").hide();
    }

    datosInicio = fnObtenerDatosFormulario();
});
//FIN INICIO

function iniciaFuncionesPausaSolicitud() {
    ocultarTabPausaSolicitud();
    tipoPausaInicial = $('#ddlTipoPausa').val();
    if ($('#hdfEstado').val() === "8") {
        solicitudEnPausa = $('#hdfEnPausa').val() === 'True';
        //bloqueaControlesSolicitudEnPausa();
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
    solicitudEnPausa === true ? ajaxReanudaSolicitud() : ajaxPausaSolicitud();
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
    //debugger;
    const data = {
        idSolicitud: $('#hdfCodSol').val()
    }

    $.ajax({
        type: "POST",
        url: "Adm_EditarSolicitudPersonalizada.aspx/ReanudarSolicitud",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
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
                //Mensaje("<br/><h1>" + "La solicitud ha sido reanudada." + "</h1><br/>", document, CerroMensaje);
                alerta(result.d);
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
        title: "Pausar Solicitud",
        modal: true,
        width: 500,
        buttons: {
            "Guardar": function () {
                if ($.trim($("#txtComentariosPausa").val()) == "") {
                    alerta("Debe ingresar un motivo de cambio de estado");
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
                        //    window.parent.ActualizarGrilla();
                        //    window.scrollTo(0, 0);
                        //    indiceTab = window.parent.tab.tabs("option", "selected");
                        //    Mensaje("<br/><h1>" + "La solicitud ha sido pausada." + "</h1><br/>", document, CerroMensaje);
                        //    //alerta(result.d);
                        //    //return;
                        //}

                        solicitudEnPausa = true;
                        //bloqueaControlesSolicitudEnPausa();
                        cambiaTextoLabelBotonPausa();
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
                fnGuardarSolicitudPrevio();
                $(this).dialog("close");
            },
            "Cancelar": function () {
                $(this).dialog("close");
            }
        }
    });


}

function fnGuardarPrevio(dcMonto, inNumeroCuotas, inMesesPeriodoGracia, vcCodIMEI, codNumLim, inCodPlan,
    XMLDetallePaqAmp, vcTipoMonto, inModelo, btServLineaEdit, dcLimiteCredito, vcColor,
    ddlSeguro,
    AccionEquipo, AccionCuenta, AccionPlan, CambioEquipo_Cuenta, CambioEquipo_Plan) {
    BloquearPagina(true);

    if (oCulturaLocal.vcSimDec == ',') {
        dcMonto = parseFloat(ParseFloatMultiPais(dcMonto, oCulturaLocal));
        dcLimiteCredito = parseFloat(ParseFloatMultiPais(dcLimiteCredito, oCulturaLocal));
    }

    var vcAdjuntos = "";
    $(".VARBINARY").each(function (i) {
        var vcNomCon = $(this).attr("obj");
        if ($(this).hasClass("imgButton")) { //habilitado
            if ($(this).attr("oblig") == "True" && $('#file_' + vcNomCon).text() == "") {
                vcVacio = "1";
            } else {

                if (this.value != "") {
                    vcAdjuntos += "[" + $(this).attr("obj") + "],";
                    vcAdjuntos += $('#file_' + vcNomCon).text() + ";";
                }
                else {
                    vcAdjuntos += "[" + $(this).attr("obj") + "],";
                    vcAdjuntos += ";";
                }
            }
        }
    });

    $.ajax({
        type: "POST",
        url: "Adm_ProcesarSolicitud.aspx/GuardarAntesDeProcesar",
        data: "{'inCodSol': '" + $("#hdfCodSol").val() + "'," +            //Código de solicitud
            "'inCodTipSol': '" + $("#hdfCodTipSol").val() + "'," +       //Código de tipo de solicitud
            "'dcMonto': '" + dcMonto + "'," +                            //Monto de la solicitud
            "'inNumeroCuotas': '" + inNumeroCuotas + "'," +              //Número de cuotas del financiamiento
            "'inMesesPeriodoGracia': '" + inMesesPeriodoGracia + "'," +  //Meses de gracia del financiamiento
            "'vcCodIMEI': '" + vcCodIMEI + "'," +                        //IMEI elegido
            "'codNumLim': '" + codNumLim + "'," +                        //Línea final
            "'dtFecEnt': '" + $("#txtFecha").val() + "'," +              //Fecha de entrega de dispositivos
            "'inCodPlan': '" + inCodPlan + "'," +                        //Plan de la línea
            "'XMLDetallePaqAmp': '" + XMLDetallePaqAmp + "'," +          //detalle de los paquetes de ampliacion
            "'vcTipoMonto': '" + vcTipoMonto + "'," +                    //tipo monto(empleado,empresa)
            "'inModeloFinal': '" + inModelo + "'," +                     //Modelo final
            "'btSerLinEdi': '" + btServLineaEdit + "'," +                 //Modelo final
            "'vcCodCtaInicial': '" + CuentaSeleccionada + "'," +                 //Cuota Inicial
            "'vcAdjuntos': '" + vcAdjuntos + "'," +                 //Adjuntos
            "'dcLimiteCredito': '" + dcLimiteCredito + "'," +                 //Adjuntos
            "'Seguro': '" + ddlSeguro + "'," +
            "'vcColor': '" + vcColor + "'," +
            "'AccionEquipo': '" + AccionEquipo + "'," +
            "'AccionCuenta': '" + AccionCuenta + "'," +
            "'AccionPlan': '" + AccionPlan + "'," +
            "'CambioEquipo_Cuenta': '" + CambioEquipo_Cuenta + "'," +
            "'CambioEquipo_Plan': '" + CambioEquipo_Plan + "'," +
            "'IdFinanciamiento': '" + $("#ddlFinanciamiento").val() + "'}",
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
                alerta("No se pudo guardar la solicitud por problemas con el financiamiento: '" + result.d + "'.", null, null, "warning");
                BloquearPagina(false);
                return;
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnObtenerDatosFormulario() {
    var F_inCodSol = $("#hdfCodSol").val();
    var inTipSol = $("#hdfTipSol").val();
    var dcMonto;
    var inNumeroCuotas;
    var vcMesesCuotas;
    var inMesesPeriodoGracia = parseInt($("#txtPeriodoGracia").val());
    var codNumLim = $("#txtMsgNumero").val();
    var CodIMEI = '';
    var XMLDetallePaqAmp = '';
    var dcLimiteCredito = $.trim($("#txtLimiteCredito").val()) == '' ? -1 : $.trim($("#txtLimiteCredito").val());
    var AccionEquipo = $("#cboAccionEquipo").val();
    var AccionCuenta = $("#cboAccionCuenta").val();
    var AccionPlan = $("#cboAccionPlan").val();
    var CambioEquipo_Cuenta = CuentaSeleccionada;
    var CambioEquipo_Plan = PlanSeleccionado;

    var NumMinCuo = parseInt($("#hdfNumMinCuo").val());
    var NumMaxCuo = parseInt($("#hdfNumMaxCuo").val());
    var MinPerGra = parseInt($("#hdfMinPerGra").val());
    var MaxPerGra = parseInt($("#hdfMaxPerGra").val());
    if ($("#hdfMesesCuotas").val() == '') {
        inNumeroCuotas = $("#txtMesesCuotas").val();
        vcMesesCuotas = '';
    } else {
        inNumeroCuotas = $("#hdfMesesCuotas").val().split(",").length;
        vcMesesCuotas = $("#hdfMesesCuotas").val();
    }
    dcMonto = $("#txtMonto").val();

    if (inNumeroCuotas == "") {
        alerta("El número de cuotas es requerido.", null, null, "warning");
        $("#txtMesesCuotas").focus();
        return;
    }

    if ($("#txtMonto").val() == "") {
        alerta("El monto fijo es requerido.", null, null, "warning");
        $("#txtMonto").focus();
        return;
    }
    if (inNumeroCuotas != "0" && NumMinCuo != "0" && NumMaxCuo != "0") {
        if (inNumeroCuotas < NumMinCuo || inNumeroCuotas > NumMaxCuo) {
            alerta("El número de cuotas debe estar contenido en el rango especificado.", null, null, "warning");
            $("#txtMesesCuotas").focus();
            return;
        }
    }
    if ($("#txtPeriodoGracia").val() == "") {
        alerta("El número de meses del periodo de gracia es requerido.", null, null, "warning");
        $("#txtPeriodoGracia").focus();
        return;
    }
    if (MinPerGra != "0" && MaxPerGra != "0") {
        if (inMesesPeriodoGracia < MinPerGra || inMesesPeriodoGracia > MaxPerGra) {
            alerta("El número de meses del periodo de gracia debe estar contenido en el rango especificado.", null, null, "warning");
            $("#txtPeriodoGracia").focus();
            return;
        }
    }

    var inModelo = 0;
    if ($("#ddlModeloEquipoNuevo").val() != null)
        inModelo = $("#ddlModeloEquipoNuevo").val();

    //IMEI Final
    if ($("#txtIMEIElegido").val() == '' || $("#txtIMEIElegido").val() == undefined || $("#txtIMEIElegido").val() == null) {
        CodIMEI = '';
    } else {
        CodIMEI = $("#txtIMEIElegido").val();
    }

    //Tipo Monto
    var vcTipoMonto;
    if ($("#ddlTipoMonto").val() == null) {
        vcTipoMonto = "";
    } else {
        vcTipoMonto = $("#ddlTipoMonto").val();
    }

    //Monto financiamiento
    if ($("#hdfMesesCuotas").val() == '') {
        inNumeroCuotas = $("#txtMesesCuotas").val();
        vcMesesCuotas = '';
    } else {
        inNumeroCuotas = $("#hdfMesesCuotas").val().split(",").length;
        vcMesesCuotas = $("#hdfMesesCuotas").val();
    }
    dcMonto = $("#txtMonto").val();

    if ($("#hdfValidacion").val() != "" && $("#chkAsignarEquiTemp").is(":checked")) {
        alerta($("#hdfValidacion").val(), null, null, "warning");
        return;
    } else {
        if (inTipSol == 2) {
            if ($("#txtMsgNumero").val() != "") {
                codNumLim = $("#txtMsgNumero").val();
            } else {
                codNumLim = "";
            }

            var i = 0;
            for (i = 0; i < arrDispositivo.length; i++) {
                if (arrDispositivo[i]['P_vcCodIMEI'] == $("#txtIMEIElegido").val()) {
                    if ($("#txtPlanSolicitado").val() != '' && arrDispositivo[i]['dispSopLin'] == "false") {
                        alerta('El dispositivo seleccionado no soporta línea', null, null, "warning");
                        return;
                    }
                }
            }
        } else if (inTipSol == 6 || inTipSol == 7) {
            codNumLim = $("#txtNumCelular").val();
            CodIMEI = $("#txtIMEIEquipoAnt").val();
        } else if (inTipSol == 4) { //Reparación
            CodIMEI = $("#txtIMEIEnt").val();
        } else {
            codNumLim = "";
        }

        if (inTipSol == 4) {
            if ($("#chkEquiConLinea").is(":checked")) {
                codNumLim = $("#txtNumeroEquiTemp").val();
            } else {
                codNumLim = '';
            }
        }

        var inCodPlan = '0';
        var XMLDetallePaqAmp = '';
        //AMPLIACION O NUEVO

        if (inTipSol == 7) { //solicidut de ampliacion
            //planes
            if ($("#hdfPlaSol").val() != '' && $("#hdfPlaSol").val() != '0') {
                inCodPlan = $("#hdfPlaSol").val();
            } else {
                var selServProc = $("#tbServAmpliacionEdit").jqGrid('getGridParam', 'selarrrow');
                var ServSol = $("#tbServAmpliacionEdit").jqGrid('getGridParam', 'records');

                //XML DE PAQUETES SELECCIONADOS
                XMLDetallePaqAmp = '<?xml version="1.0" encoding="iso-8859-1"?><ROOT>';
                var i = 0;
                for (i = 0; i < selServProc.length; i++) {
                    var dataPaquete = $("#tbServAmpliacionEdit").getRowData(selServProc[i]);
                    var F_inCodTipSer;
                    var F_inCodSer;
                    if (dataPaquete.P_inCod != dataPaquete.inTipoServ) {
                        F_inCodSer = dataPaquete.P_inCod;
                        F_inCodTipSer = 0;
                    } else {
                        F_inCodSer = 0;
                        F_inCodTipSer = dataPaquete.P_inCod;
                    }
                    var inCant = dataPaquete.vcCantReal;
                    var dcCost = dataPaquete.dcCostoReal;
                    //                        var btProcesado = "0";
                    var btGuardado = "1";
                    var btEditado = dataPaquete.btEditado;
                    var inCantProc;
                    var dcCostProc;
                    if (btEditado == "1") {
                        inCantProc = dataPaquete.vcCantRealEdit;
                        dcCostProc = dataPaquete.dcCostoEditReal;
                    } else {
                        inCantProc = 0;
                        dcCostProc = 0;
                    }
                    var idPaqAmpProc = dataPaquete.inIdPaqAmpProc;

                    XMLDetallePaqAmp += "<Detalle><F_inCodSol>" + F_inCodSol + "</F_inCodSol>"
                        + "<F_inCodTipSer>" + F_inCodTipSer + "</F_inCodTipSer>"
                        + "<F_inCodSer>" + F_inCodSer + "</F_inCodSer>"
                        + "<inCant>" + inCant + "</inCant>"
                        + "<dcCost>" + dcCost + "</dcCost>"
                        + "<inCantProc>" + inCantProc + "</inCantProc>"
                        + "<dcCostProc>" + dcCostProc + "</dcCostProc>"
                        + "<btEditado>" + btEditado + "</btEditado>"
                        + "<btGuardado>" + btGuardado + "</btGuardado>"
                        + "<F_inCodPaqAmpProc>" + idPaqAmpProc + "</F_inCodPaqAmpProc></Detalle>";
                }
                XMLDetallePaqAmp += '</ROOT>';
            }
        } else if (inTipSol == 2) { //solicitud de nuevo equipo
            //planes

            if ($("#hdfPlanProcesar").val() != '' && $("#hdfPlanProcesar").val() != '0' && $("#hdfPlanProcesar").val() != '-1') {
                inCodPlan = $("#hdfPlanProcesar").val();
            }

            if (inCodPlan == "0") {
                var inCantServAgregados = 0;
                if (!btServLineaEdit) //no se ha actualizado los servicios de las lineas
                {
                    XMLDetallePaqAmp = '';
                } else {
                    //servicios
                    inCantServAgregados = ServiciosLinSel.length;
                    //  alerta(inCantServAgregados);

                    if (inCantServAgregados > 0) {
                        XMLDetallePaqAmp = '<?xml version="1.0" encoding="iso-8859-1"?><ROOT>';
                        $.each(ServiciosLinSel, function () {
                            var oServicio = this;

                            XMLDetallePaqAmp += "<Detalle><F_inCodSol>" + F_inCodSol + "</F_inCodSol>";
                            if (oServicio.inCodTipDat == 1) {
                                XMLDetallePaqAmp += "<F_inCodTipSer>" + "-1" + "</F_inCodTipSer>" + "<F_inCodSer>" + oServicio.P_inCod.toString() + "</F_inCodSer>";
                            } else {
                                XMLDetallePaqAmp += "<F_inCodTipSer>" + oServicio.P_inCod.toString() + "</F_inCodTipSer>" + "<F_inCodSer>" + "-1" + "</F_inCodSer>";
                            }
                            XMLDetallePaqAmp += "<inCant>" + oServicio.dcCan + "</inCant>" + "<dcCost>" + oServicio.dcMon.toString() + "</dcCost>";
                            XMLDetallePaqAmp += "<btGuardado>" + "1" + "</btGuardado>" + "<btEditado>" + "1" + "</btEditado>";
                            XMLDetallePaqAmp += "<inTipAsig>" + oServicio.inTipAsig.toString() + "</inTipAsig></Detalle>";
                        });
                        XMLDetallePaqAmp += '</ROOT>';
                    }
                }
            }
        }

        var vcColor = $("#txtColor").val().replace(/'/g, "&#39").replace(/\\/g, "&#92");
        var ddlSeguro = $("#ddlSeguro").val();

        let stringDatos = dcMonto + inNumeroCuotas + inMesesPeriodoGracia + CodIMEI + codNumLim + inCodPlan +
            XMLDetallePaqAmp + vcTipoMonto + inModelo + btServLineaEdit + dcLimiteCredito + vcColor +
            ddlSeguro +
            AccionEquipo + AccionCuenta + AccionPlan + CambioEquipo_Cuenta + CambioEquipo_Plan;

        return stringDatos;
    }
}

function fnGuardarSolicitudPrevio() {
    var F_inCodSol = $("#hdfCodSol").val();
    var inTipSol = $("#hdfTipSol").val();
    var dcMonto;
    var inNumeroCuotas;
    var vcMesesCuotas;
    var inMesesPeriodoGracia = parseInt($("#txtPeriodoGracia").val());
    var codNumLim = $("#txtMsgNumero").val();
    var CodIMEI = '';
    var XMLDetallePaqAmp = '';
    var dcLimiteCredito = $.trim($("#txtLimiteCredito").val()) == '' ? -1 : $.trim($("#txtLimiteCredito").val());

    var AccionEquipo = $("#cboAccionEquipo").val();
    var AccionCuenta = $("#cboAccionCuenta").val();
    var AccionPlan = $("#cboAccionPlan").val();
    var CambioEquipo_Cuenta = CuentaSeleccionada;
    var CambioEquipo_Plan = PlanSeleccionado;

    var NumMinCuo = parseInt($("#hdfNumMinCuo").val());
    var NumMaxCuo = parseInt($("#hdfNumMaxCuo").val());
    var MinPerGra = parseInt($("#hdfMinPerGra").val());
    var MaxPerGra = parseInt($("#hdfMaxPerGra").val());
    if ($("#hdfMesesCuotas").val() == '') {
        inNumeroCuotas = $("#txtMesesCuotas").val();
        vcMesesCuotas = '';
    } else {
        inNumeroCuotas = $("#hdfMesesCuotas").val().split(",").length;
        vcMesesCuotas = $("#hdfMesesCuotas").val();
    }
    dcMonto = $("#txtMonto").val();

    if (inNumeroCuotas == "") {
        alerta("El número de cuotas es requerido.", null, null, "warning");
        $("#txtMesesCuotas").focus();
        return;
    }

    if ($("#txtMonto").val() == "") {
        alerta("El monto fijo es requerido.", null, null, "warning");
        $("#txtMonto").focus();
        return;
    }
    if (inNumeroCuotas != "0" && NumMinCuo != "0" && NumMaxCuo != "0") {
        if (inNumeroCuotas < NumMinCuo || inNumeroCuotas > NumMaxCuo) {
            alerta("El número de cuotas debe estar contenido en el rango especificado.", null, null, "warning");
            $("#txtMesesCuotas").focus();
            return;
        }
    }
    if ($("#txtPeriodoGracia").val() == "") {
        alerta("El número de meses del periodo de gracia es requerido.", null, null, "warning");
        $("#txtPeriodoGracia").focus();
        return;
    }
    if (MinPerGra != "0" && MaxPerGra != "0") {
        if (inMesesPeriodoGracia < MinPerGra || inMesesPeriodoGracia > MaxPerGra) {
            alerta("El número de meses del periodo de gracia debe estar contenido en el rango especificado.", null, null, "warning");
            $("#txtPeriodoGracia").focus();
            return;
        }
    }

    var inModelo = 0;
    if ($("#ddlModeloEquipoNuevo").val() != null)
        inModelo = $("#ddlModeloEquipoNuevo").val();

    //IMEI Final
    if ($("#txtIMEIElegido").val() == '' || $("#txtIMEIElegido").val() == undefined || $("#txtIMEIElegido").val() == null) {
        CodIMEI = '';
    } else {
        CodIMEI = $("#txtIMEIElegido").val();
    }

    //Tipo Monto
    var vcTipoMonto;
    if ($("#ddlTipoMonto").val() == null) {
        vcTipoMonto = "";
    } else {
        vcTipoMonto = $("#ddlTipoMonto").val();
    }

    //Monto financiamiento
    if ($("#hdfMesesCuotas").val() == '') {
        inNumeroCuotas = $("#txtMesesCuotas").val();
        vcMesesCuotas = '';
    } else {
        inNumeroCuotas = $("#hdfMesesCuotas").val().split(",").length;
        vcMesesCuotas = $("#hdfMesesCuotas").val();
    }
    dcMonto = $("#txtMonto").val();


    if ($("#hdfValidacion").val() != "" && $("#chkAsignarEquiTemp").is(":checked")) {
        alerta($("#hdfValidacion").val(), null, null, "warning");
        return;
    } else {
        if (inTipSol == 2) {
            if ($("#txtMsgNumero").val() != "") {
                codNumLim = $("#txtMsgNumero").val();
            } else {
                codNumLim = "";
            }

            var i = 0;
            for (i = 0; i < arrDispositivo.length; i++) {
                if (arrDispositivo[i]['P_vcCodIMEI'] == $("#txtIMEIElegido").val()) {
                    if ($("#txtPlanSolicitado").val() != '' && arrDispositivo[i]['dispSopLin'] == "false") {
                        alerta('El dispositivo seleccionado no soporta línea', null, null, "warning");
                        return;
                    }
                }
            }
        } else if (inTipSol == 6 || inTipSol == 7) {
            codNumLim = $("#txtNumCelular").val();
            CodIMEI = $("#txtIMEIEquipoAnt").val();
        } else if (inTipSol == 4) { //Reparación
            CodIMEI = $("#txtIMEIEnt").val();
        } else {
            codNumLim = "";
        }

        if (inTipSol == 4) {
            if ($("#chkEquiConLinea").is(":checked")) {
                codNumLim = $("#txtNumeroEquiTemp").val();
            } else {
                codNumLim = '';
            }
        }

        var inCodPlan = '0';

        //validaciones por tipo
        //            var validacionPorTipo = true;
        var tituloValid = '';
        var mensajeValid = '';
        var XMLDetallePaqAmp = '';
        var DetalleServicios = '';
        //AMPLIACION O NUEVO

        if (inTipSol == 7) { //solicidut de ampliacion
            //planes
            if ($("#hdfPlaSol").val() != '' && $("#hdfPlaSol").val() != '0') {
                inCodPlan = $("#hdfPlaSol").val();
            } else {
                var selServProc = $("#tbServAmpliacionEdit").jqGrid('getGridParam', 'selarrrow');
                var ServSol = $("#tbServAmpliacionEdit").jqGrid('getGridParam', 'records');

                //XML DE PAQUETES SELECCIONADOS
                XMLDetallePaqAmp = '<?xml version="1.0" encoding="iso-8859-1"?><ROOT>';
                var i = 0;
                for (i = 0; i < selServProc.length; i++) {
                    var dataPaquete = $("#tbServAmpliacionEdit").getRowData(selServProc[i]);
                    var F_inCodTipSer;
                    var F_inCodSer;
                    if (dataPaquete.P_inCod != dataPaquete.inTipoServ) {
                        F_inCodSer = dataPaquete.P_inCod;
                        F_inCodTipSer = 0;
                    } else {
                        F_inCodSer = 0;
                        F_inCodTipSer = dataPaquete.P_inCod;
                    }
                    var inCant = dataPaquete.vcCantReal;
                    var dcCost = dataPaquete.dcCostoReal;
                    //                        var btProcesado = "0";
                    var btGuardado = "1";
                    var btEditado = dataPaquete.btEditado;
                    var inCantProc;
                    var dcCostProc;
                    if (btEditado == "1") {
                        inCantProc = dataPaquete.vcCantRealEdit;
                        dcCostProc = dataPaquete.dcCostoEditReal;
                    } else {
                        inCantProc = 0;
                        dcCostProc = 0;
                    }
                    var idPaqAmpProc = dataPaquete.inIdPaqAmpProc;

                    XMLDetallePaqAmp += "<Detalle><F_inCodSol>" + F_inCodSol + "</F_inCodSol>"
                        + "<F_inCodTipSer>" + F_inCodTipSer + "</F_inCodTipSer>"
                        + "<F_inCodSer>" + F_inCodSer + "</F_inCodSer>"
                        + "<inCant>" + inCant + "</inCant>"
                        + "<dcCost>" + dcCost + "</dcCost>"
                        + "<inCantProc>" + inCantProc + "</inCantProc>"
                        + "<dcCostProc>" + dcCostProc + "</dcCostProc>"
                        + "<btEditado>" + btEditado + "</btEditado>"
                        + "<btGuardado>" + btGuardado + "</btGuardado>"
                        + "<F_inCodPaqAmpProc>" + idPaqAmpProc + "</F_inCodPaqAmpProc></Detalle>";
                }
                XMLDetallePaqAmp += '</ROOT>';
            }
        } else if (inTipSol == 2) { //solicitud de nuevo equipo
            //planes

            if ($("#hdfPlanProcesar").val() != '' && $("#hdfPlanProcesar").val() != '0' && $("#hdfPlanProcesar").val() != '-1') {
                inCodPlan = $("#hdfPlanProcesar").val();
            }

            if (inCodPlan == "0") {
                var inCantServAgregados = 0;
                if (!btServLineaEdit) //no se ha actualizado los servicios de las lineas
                {
                    XMLDetallePaqAmp = '';
                } else {
                    //servicios
                    inCantServAgregados = ServiciosLinSel.length;
                    //  alerta(inCantServAgregados);

                    if (inCantServAgregados > 0) {
                        XMLDetallePaqAmp = '<?xml version="1.0" encoding="iso-8859-1"?><ROOT>';
                        $.each(ServiciosLinSel, function () {
                            var oServicio = this;

                            XMLDetallePaqAmp += "<Detalle><F_inCodSol>" + F_inCodSol + "</F_inCodSol>";
                            if (oServicio.inCodTipDat == 1) {
                                XMLDetallePaqAmp += "<F_inCodTipSer>" + "-1" + "</F_inCodTipSer>" + "<F_inCodSer>" + oServicio.P_inCod.toString() + "</F_inCodSer>";
                            } else {
                                XMLDetallePaqAmp += "<F_inCodTipSer>" + oServicio.P_inCod.toString() + "</F_inCodTipSer>" + "<F_inCodSer>" + "-1" + "</F_inCodSer>";
                            }
                            XMLDetallePaqAmp += "<inCant>" + oServicio.dcCan + "</inCant>" + "<dcCost>" + oServicio.dcMon.toString() + "</dcCost>";
                            XMLDetallePaqAmp += "<btGuardado>" + "1" + "</btGuardado>" + "<btEditado>" + "1" + "</btEditado>";
                            XMLDetallePaqAmp += "<inTipAsig>" + oServicio.inTipAsig.toString() + "</inTipAsig></Detalle>";
                        });
                        XMLDetallePaqAmp += '</ROOT>';
                    }
                }
            }
        }


        var vcColor = $("#txtColor").val().replace(/'/g, "&#39").replace(/\\/g, "&#92");
        //var ddlTipoPlan = $("#ddlTipoPlan").val();
        //var ddlConexionInternet = $("#ddlConexionInternet").val();
        //var ddlNumerosFrecuentes = $("#ddlNumerosFrecuentes").val();
        //var ddlPaqueteSMS = $("#ddlPaqueteSMS").val();
        var ddlSeguro = $("#ddlSeguro").val();


        fnGuardarPrevio(dcMonto, inNumeroCuotas, inMesesPeriodoGracia, CodIMEI, codNumLim, inCodPlan,
            XMLDetallePaqAmp, vcTipoMonto, inModelo, btServLineaEdit, dcLimiteCredito, vcColor,
            ddlSeguro,
            AccionEquipo, AccionCuenta, AccionPlan, CambioEquipo_Cuenta, CambioEquipo_Plan);
        //            if (validacionPorTipo) {
        //            }
    }
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

function validaSiHayCambiosEnElFormulario() {

    if (datosInicio === fnObtenerDatosFormulario()) {
        return true;
    }
    return false;
}

function GenerarFormatoAsignacion(IdTipoSolicitud, IdSolicitud) {
    //Validar datos...
    if (IdTipoSolicitud != "1" && IdTipoSolicitud != "2" && IdTipoSolicitud != "12" && IdTipoSolicitud != "14") {
        alerta("Este formato sólo es generado para solicitudes de tipo 'Nueva línea', 'Cambio Equipo', 'Cambio de Cuenta' o 'Cambio de Plan'", null, null, "warning");
        return;
    }
    var pagina = "../Adm_ReporteDevExpress.aspx?vcTab=MOV_Solicitud&vcTipRep=3&IdSolicitud=" + IdSolicitud;
    $("#ifReporteFormato").attr("src", pagina);
}


function fnRefrescarCambioReposicion(obj) {
    if (!$("#btnBuscarIMEI").button("option", "disabled") && obj[0].DispositivoNuevo.P_vcCodIMEI == '') {
        $("#txtIMEIElegido").val("");
    } else if (obj[0].DispositivoNuevo.P_vcCodIMEI != '') {
        $("#txtIMEIElegido").val(obj[0].DispositivoNuevo.P_vcCodIMEI);
    } else if (obj[0].DispositivoNuevo.P_vcCodIMEI == '') {
        $("#txtIMEIElegido").val('');
    }

    $("#btnBuscarIMEI").button("option", "disabled", true);
    $("#imgBorrar_IMEI_Fin").hide();
    $("#ddlModeloEquipoNuevo").html("");
    $("#ddlModeloEquipoNuevo").append($("<option></option>").text(obj[0].DispositivoNuevo.ModeloDispositivo.vcNom).val(obj[0].DispositivoNuevo.ModeloDispositivo.P_inCod));
    //    if ((obj[0].inTipSol == 1 || obj[0].inTipSol == 3) && obj[0].DispositivoNuevo.P_vcCodIMEI == '') {
    //if (obj[0].DispositivoNuevo.P_vcCodIMEI == '' || (obj[0].DispositivoNuevo.P_vcCodIMEI != '' && $("#hdfIngAlm").val() == "0")) {
    if (obj[0].DispositivoNuevo.P_vcCodIMEI == '' || (obj[0].DispositivoNuevo.P_vcCodIMEI != '' && !obj[0].btIngAlm)) {
        mostrarDispositivosDisponibles(obj[0].Empleado.P_vcCod, "0"); //tipo de adquisicion = Venta (27/08/2014 - wapumayta- lista todos los tipos)
    }
}
function fnRefrescarNuevo(obj) {
    $("#btnBuscarIMEI").button("option", "disabled", true);
    $("#ddlModeloEquipoNuevo").html("");
    $("#ddlModeloEquipoNuevo").append($("<option></option>").text(obj[0].DispositivoNuevo.ModeloDispositivo.vcNom).val(obj[0].DispositivoNuevo.ModeloDispositivo.P_inCod));

    $("#txtIMEIElegido").val("");
    $("#txtMsgNumero").val("");
    if (vcIMEIFin != '') { $("#txtIMEIElegido").val(vcIMEIFin); }
    if (vcLineaFin != '') { $("#txtMsgNumero").val(vcLineaFin); }
    biSerLinSol = false;

    $("#hdfBuscarLinea").val("buscar");

    if (obj[0].inTipSol == 2) {
        mostrarDispositivosDisponibles(obj[0].Empleado.P_vcCod, "0"); //tipo de adquisicion = Venta (27/08/2014 - wapumayta- lista todos los tipos)
    }
}
function fnRefrescarReparacion(obj) {
    $("#txtIMEIEnt").val("");
    $("#chkMismoIMEI").attr("checked", false);
    $("#imgBorrar_IMEIEnt").show();
    //if (obj[0].DispositivoNuevo.P_vcCodIMEI != '' && $("#hdfIngAlm").val() == "1") {
    if (obj[0].DispositivoNuevo.P_vcCodIMEI != '' && obj[0].btIngAlm) {
        $("#dvInfoIMEIAutomatico").show();
        $("#btnBuscarIMEIEnt").button("option", "disabled", true);
        $("#chkMismoIMEI").attr("disabled", true);
        $("#imgBorrar_IMEIEnt").hide();
        $("#txtIMEIEnt").val(obj[0].DispositivoNuevo.P_vcCodIMEI);
        if (obj[0].DispositivoNuevo.P_vcCodIMEI == obj[0].DispositivoAnterior.P_vcCodIMEI) {
            $("#chkMismoIMEI").attr("checked", true);
        }
    } else if (obj[0].DispositivoNuevo.P_vcCodIMEI != '' && !obj[0].btIngAlm) {
        $("#txtIMEIEnt").val(obj[0].DispositivoNuevo.P_vcCodIMEI);
        if (obj[0].DispositivoNuevo.P_vcCodIMEI == obj[0].DispositivoAnterior.P_vcCodIMEI) {
            $("#chkMismoIMEI").attr("checked", true);
        }
    } else { //no se detecta dispositivo guardado
        $("#btnBuscarIMEIEnt").button("option", "disabled", false);
        $("#chkMismoIMEI").attr("disabled", false);
    }

    mostrarDispositivosDisponibles(obj[0].Empleado.P_vcCod, "0"); //tipo de adquisicion = todos
}

function fnRefrescarAmpliacion(obj, codSol) {
    fnActualizarDatosAmpliacion(codSol);
}

function obtenerDatosSolicitud(id, biRefrescar) {
    //var id = $(a).attr("id").split("-");
    $.ajax({
        type: "POST",
        url: "Adm_ProcesarSolicitud.aspx/ListarPorIds",
        data: "{'prCodIds': '" + id.toString() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            var obj = msg.d;
            var det = obj[0].Detalle;
            if (biRefrescar) {
                $("#hdfIngAlm").val(obj[0].btIngAlm ? "1" : "0");
                if ($("#hdfTipSol").val() == '1' || $("#hdfTipSol").val() == '3') {
                    fnRefrescarCambioReposicion(obj);
                } else if ($("#hdfTipSol").val() == '2') {
                    fnRefrescarNuevo(obj);
                } else if ($("#hdfTipSol").val() == '4') {
                    fnRefrescarReparacion(obj);
                } else if ($("#hdfTipSol").val() == '7') {
                    fnRefrescarAmpliacion(obj, id);
                }
            } else {
                //hiddens
                $("#hdfCodSol").val(obj[0].P_inCodSol);
                $("#hdfTipSol").val(obj[0].inTipSol);
                $("#hdfModDisSol").val(obj[0].inCodModDis);
                $("#hdfCodEstado").val(obj[0].Estado.P_inCod);

                //contenido del form segun tipo de solicitud
                if ($("#hdfEstado").val() == "8") { //EnProceso (solicitud para procesar)
                    if ($("#hdfAdmin").val() == "1" || $("#hdfTecnico").val() == "1" || $("#hdfTecnicoAsignado").val() == "1") {
                        contenidoTipoSol(obj[0].inTipSol, "1");
                    } else {
                        contenidoTipoSol(obj[0].inTipSol, "2");
                    }
                    //alert(obj[0].DispositivoNuevo.P_vcCodIMEI + "; " + obj[0].DispositivoAnterior.P_vcCodIMEI + "\n" + $("#hdfTipSol").val());
                    if (obj[0].DispositivoNuevo.P_vcCodIMEI != '') {
                        $("#dvInfoIMEIAutomatico").show();
                        if ($("#hdfTipSol").val() == '4') {
                            if ($("#hdfIngAlm").val() == "1") {
                                $("#btnBuscarIMEIEnt").button("option", "disabled", true);
                                $("#chkMismoIMEI").attr("disabled", true);
                            }
                            $("#txtIMEIEnt").val(obj[0].DispositivoNuevo.P_vcCodIMEI);
                        } else if ($("#hdfTipSol").val() == '1' || $("#hdfTipSol").val() == '3') {
                            if ($("#hdfIngAlm").val() == "1") {
                                $("#btnBuscarIMEI").button("option", "disabled", true);
                            }
                            $("#ddlModeloEquipoNuevo").append($("<option></option>").text(obj[0].DispositivoNuevo.ModeloDispositivo.vcNom).val(obj[0].DispositivoNuevo.ModeloDispositivo.P_inCod));
                        } else if ($("#hdfTipSol").val() == '2') {
                            $("#dvInfoIMEIAutomatico").hide();
                            //if (obj[0].DispositivoNuevo.vcNum != '' && obj[0].PlanNuevo.vcNom != null && obj[0].PlanNuevo.btVig) { //linea está asociada a dispositivo nuevo
                            if (obj[0].DispositivoNuevo.vcNum != '' && obj[0].PlanNuevo.btVig) { //linea está asociada a dispositivo nuevo
                                $("#lblBuscarLinea").text('Detalle Línea');
                                $("#hdfBuscarLinea").val("detalle");
                                $("#hdfPlanProcesar").val(obj[0].PlanNuevo.P_inCod);
                                $("#ttgInfoLinea_DvMiMensaje").html("");
                                $("#ttgInfoLinea_DvMiMensaje").append("Mostrando línea asociada al dispositivo seleccionado");
                            }
                                //else if (obj[0].DispositivoNuevo.vcNum != '' && obj[0].Plan.vcNom != null && obj[0].PlanNuevo.vcNom == null) { //linea no tiene plan
                            else if (obj[0].DispositivoNuevo.vcNum != '' && obj[0].PlanNuevo.vcNom == null) { //linea no tiene plan
                                $("#lblBuscarLinea").text('Detalle Línea');
                                $("#hdfBuscarLinea").val("detalle");
                                $("#hdfPlanProcesar").val(obj[0].Plan.P_inCod);
                                $("#ttgInfoLinea_DvMiMensaje").html("");
                                $("#ttgInfoLinea_DvMiMensaje").append("Mostrando línea asociada al dispositivo seleccionado");
                            }
                            else {
                                $("#lblBuscarLinea").html("Buscar Línea");
                                $("#hdfBuscarLinea").val("buscar");
                            }
                        }
                        if (obj[0].DispositivoNuevo.P_vcCodIMEI == obj[0].DispositivoAnterior.P_vcCodIMEI) {
                            $("#chkMismoIMEI").attr("checked", true);
                        }
                    }
                } else if ($("#hdfEstado").val() == "7") { //Culminada
                    contenidoTipoSol(obj[0].inTipSol, "2");
                    $("#txtModeloAsignado").val(obj[0].DispositivoNuevo.ModeloDispositivo.vcNom);
                    $("#txtIMEIAsignado").val(obj[0].DispositivoNuevo.P_vcCodIMEI);
                    $("#txtLineaAsignada").val(obj[0].DispositivoNuevo.vcNum);
                    if (obj[0].inTipSol == '7') { //ampliación
                        $("#txtPlanAmpSolicitado").val(obj[0].DispositivoNuevo.P_vcCodIMEI);
                    }
                } else {
                    contenidoTipoSol(obj[0].inTipSol, "0");
                }

                //VALIDAR SI HUBO NO CAMBIOS EN EL PROCESO

                //mostrar datos
                //$("#lblTipoSolicitud").text(obj[0].vcTipSol);
                //$("#lblCodEmpleado").text(obj[0].Empleado.P_vcCod);
                //$("#lblNomEmpleado").text(obj[0].Empleado.vcNom);
                $("#txtNomEmpleado").val(obj[0].Empleado.P_vcCod + " - " + obj[0].Empleado.vcNom);
                if (obj[0].inTipSol == 2) { //solicitud tipo nuevo
                    //$("#lblModeloSolicitado").text(obj[0].DispositivoAnterior.ModeloDispositivo.vcNom);
                    IdModeloSolicitado = obj[0].DispositivoAnterior.ModeloDispositivo.P_inCod;
                    $("#txtModeloSolicitado").val(obj[0].DispositivoAnterior.ModeloDispositivo.vcNom);
                    $("#txtIMEIElegido").val(obj[0].DispositivoNuevo.P_vcCodIMEI);


                    $("#bqPplCuenta_Valor").val(obj[0].DispositivoNuevo.CuentaFinal);
                    $("#bqPplCuenta_txtValorBusqueda").val(obj[0].DispositivoNuevo.NombreCuentaFinal);

                    $("#txtMsgNumero").val(obj[0].DispositivoNuevo.vcNum);

                    if (obj[0].Plan.P_inCod == 0 || obj[0].Plan.P_inCod == -1) { //solicitud de equipo sin linea
                        //$("#lblPlanSolicitado").text("");
                        $("#txtPlanSolicitado").val("");
                        $("#txtPlanSolicitado").hide();
                        $("#lblNoPlan").show();
                        $("#hdfPlaSol").val("");
                        //                        $("#trPlanAsignado").hide();
                        //$("#trNumero").hide();
                    } else {
                        //$("#lblPlanSolicitado").text(obj[0].Plan.vcNom);
                        $("#txtPlanSolicitado").show();
                        $("#lblNoPlan").hide();
                        $("#txtPlanSolicitado").val(obj[0].Plan.vcNom);
                        $("#hdfPlaSol").val(obj[0].Plan.P_inCod);
                    }
                    if ($.trim($("#txtPlanAsignado").val()) == "") {
                        $("#trPlanAsignado").hide();
                    }
                } else {
                    if ($("#hdfEstado").val() == "7") { //Culminada
                        $("#hdfPlaSol").val(obj[0].DispositivoNuevo.vcNum);
                    } else {
                        $("#hdfPlaSol").val(obj[0].Plan.P_inCod);
                    }

                    $("#bqPplCuenta_Valor").val(obj[0].DispositivoNuevo.CuentaFinal);
                    $("#bqPplCuenta_txtValorBusqueda").val(obj[0].DispositivoNuevo.NombreCuentaFinal);


                    IdModeloSolicitado = obj[0].DispositivoNuevo.ModeloDispositivo.P_inCod;
                    ActualizarCondicionCuenta();
                    ActualizarCondicionPlan();
                    $("#txtModeloSolicitado").val(obj[0].DispositivoNuevo.ModeloDispositivo.vcNom);
                    $("#txtNumCelular").val(obj[0].vcNumLin);
                    $("#txtModeloEquipoAnt").val(obj[0].DispositivoAnterior.ModeloDispositivo.vcNom);
                    $("#txtIMEIEquipoAnt").val(obj[0].DispositivoAnterior.P_vcCodIMEI);
                    $("#txtIMEIElegido").val(obj[0].DispositivoNuevo.P_vcCodIMEI);
                    if (det[0] != undefined || det[0] != null) {
                        $("#txtObservacion").val(det[0].Detalle);
                    }

                    if ($("#txtIMEIEquipoAnt").val() == "" && $("#txtNumCelular").val() == "")
                        $("#txtIMEIEquipoAnt").val($("#txtIMEIElegido").val());
                    if ($("#txtModeloEquipoAnt").val() == "" && $("#txtNumCelular").val() == "")
                        $("#txtModeloEquipoAnt").val($("#txtModeloSolicitado").val());

                }

                if (obj[0].inTipSol == 4 && $("#txtFecha").val() == '') {
                    var fecAct = new Date();
                    var fecEnt = new Date();
                    fecEnt.setDate(fecAct.getDate() + 7);
                    var mes = parseInt(fecEnt.getMonth()) + 1;
                    var mesFecEnt = mes.toString().length == 1 ? "0" + mes.toString() : mes.toString();
                    var diaEnt = fecEnt.getDate().toString().length == 1 ? "0" + fecEnt.getDate() : fecEnt.getDate();
                    $("#txtFecha").val(diaEnt + "/" + mesFecEnt + "/" + fecEnt.getFullYear());
                }
                if (obj[0].inTipSol == 2) { //nuevo
                    mostrarDispositivosDisponibles(obj[0].Empleado.P_vcCod, "0");
                }

                //                if ((obj[0].inTipSol == 1 || obj[0].inTipSol == 3) && obj[0].DispositivoNuevo.P_vcCodIMEI == '') {
                if ((obj[0].inTipSol == 1 || obj[0].inTipSol == 3) && (obj[0].DispositivoNuevo.P_vcCodIMEI == '' || (obj[0].DispositivoNuevo.P_vcCodIMEI != '' && $("#hdfIngAlm").val() == "0"))) {
                    mostrarDispositivosDisponibles(obj[0].Empleado.P_vcCod, "0"); //tipo de adquisicion = Venta (27/08/2014 - wapumayta- lista todos los tipos)
                }

                if (obj[0].inTipSol == 4) { //mostrar equpos de prestamo
                    //mostrarDispositivosDisponibles(obj[0].Empleado.P_vcCod, "2"); //tipo de adquisicion = Alquiler
                    mostrarDispositivosDisponibles(obj[0].Empleado.P_vcCod, "0"); //tipo de adquisicion = todos
                }

                if (obj[0].inTipSol == 6) {
                    mostrarServiciosSolicitados(obj[0].P_inCodSol);
                }

                if (obj[0].inTipSol == 7) {
                    MostrarDatosAmpliacion(obj[0].P_inCodSol);
                }

                //ARCHIVOS ADJUNTOS DE SOLICITUD
                //adj = '';
                //$("#PnlAdjuntos").empty();
                //adj = obj[0].ArchivosAdjuntos;
                ////if (adj.length != 0) { $("#btnAdjuntos").show(); } else { $("#btnAdjuntos").hide(); };
                //if (adj.length != 0) {
                //    $("#btnAdjuntos").show();
                //    for (var i = 0; i < adj.length; i++) {
                //        var dataadj = adj[i].vcNomAdj.toString();
                //        var ardatosadj = new Array;
                //        ardatosadj = dataadj.split('--')
                //        var nombre = ardatosadj[2];
                //        var tamaño = ardatosadj[1];
                //        //alert('nombre: ' + nombre + ' tamaño: ' + tamaño);
                //        $("#PnlAdjuntos").append('<div id="' + adj[i].P_inIdAdj + '" class="adjunto">' + nombre + ' (' + tamaño + ')</div>');
                //    };
                //    $('.adjunto').button();
                //    $('.adjunto').click(function () { DescargarAdjunto(this) });
                //} else {
                //    $("#btnAdjuntos").hide();
                //};

                if (obj[0].inTipSol == 1 && obj[0].DispositivoNuevo.P_vcCodIMEI != '') {
                    vcCadenaControles = fnArmaCadenaDeControles();
                    biCadConAct = true;
                }
            }
        },
        error: function (xhr, err) {
            $("#dvCargando").hide();
            alerta("Error, Estado: " + xhr.readyState + "\nEstado: " + xhr.status);
        }
    });
}

function contenidoTipoSol(tipSol, estadoSol) {
    //estadoSol = 0 => primer estado
    //estadoSol = 1 => por finalizar (EnProceso)
    //estadoSol = 2 => finalizada
    switch (tipSol) {
        case 1: //cambio
            //$("#trNumero").hide();
            $("#txtNumCelular").show();
            $(".TipoCambioEquipo").show();
            $(".TipoCambioEquipo")[5].style.display = 'none'
            if (estadoSol == "1") { //en proceso
                $("#trPlanSolicitado").hide();
                $("#ddlNumero").hide();
                //$("#lblMsgNumero").hide();
                $("#txtMsgNumero").hide();
                $("#trObservacion").hide();
                $("#trServiciosSolicitados").hide();
                //                //campos para procesar
                //                $("#trModEquipoNue").show();
                //                $("#trIMEIEquipoNue").show();
            } else if (estadoSol == "2") { //culminada
                $("#txtMsgNumero").hide();
                $("#trModeloAsignado").show();
                $("#trIMEIAsignado").show();
            } else { //pendiente
                $("#txtMsgNumero").hide();
            }
            break;
        case 2: //nuevo
            $("#trNumero").hide();
            $("#trModEquipoAnt").hide();
            $("#trIMEIEquipoAnt").hide();

            $("#trPlanSolicitado").show();

            if (estadoSol == "1") {
                //campos para procesar
                $("#trNumero").show();
                //                $("#trModEquipoNue").show();
                //                $("#trIMEIEquipoNue").show();
                $("#btnBuscarLinea").show();
            } else if (estadoSol == "2") {
                $("#imgBorrarFecha").hide();
                $("#trModeloAsignado").show();
                $("#trIMEIAsignado").show();
                $("#trLineaAsignada").show();
                $("#trPlanAsignado").show();
            }
            break;
        case 3: //reposición
            $("#trNumero").show();
            $("#txtNumCelular").show();
            $("#txtMsgNumero").hide();
            if (estadoSol == "1") {
                //campos para procesar
                //                $("#trModEquipoNue").show();
                //                $("#trIMEIEquipoNue").show();
            } else if (estadoSol == '2') { //culminada
                $("#trModeloAsignado").show();
                $("#trIMEIAsignado").show();
            }
            //$("#trPlanSolicitado").hide();
            //$("#ddlNumero").hide();
            ////$("#lblMsgNumero").hide();
            //$("#txtMsgNumero").hide();
            //$("#trObservacion").hide();
            //$("#trServiciosSolicitados").hide();
            break;
        case 4: //reparación
            //$("#trPlanSolicitado").hide();
            //$("#lblTituloModSol").text("Modelo");
            //$("#trModEquipoNue").hide();
            ////$("#trIMEIEquipoNue").hide();
            //$("#btnBuscarIMEI").hide();
            //$("#lblTituloImeiSel").text("IMEI");
            //$("#trNumero").hide();
            //$("#trModEquipoAnt").hide();
            //$("#trIMEIEquipoAnt").hide();
            //$("#trServiciosSolicitados").hide();

            $("#trNumero").show();
            $("#lblModelo").text("Modelo a reparar");
            $("#lblIMEIEquipoAntCab").text("IMEI de equipo");
            $("#trModeloSolicitado").hide();
            $("#txtMsgNumero").hide();
            if (estadoSol == "2") {
                $("#trModeloAsignado").show();
                $("#trIMEIAsignado").show();
            }
            break;
            //if ($("#hdfEstado").val() == "8") { //26/05/2014
            //    $("#trAsignarEquiTemp").show();
            //}
            //$("#trModEquipoNue").show();
            //break;
        case 6: //activación
            //$("#trPlanSolicitado").hide();
            $("#trModeloSolicitado").hide();
            //$("#trModEquipoNue").hide();
            //$("#trIMEIEquipoNue").hide();
            //$("#ddlNumero").hide();
            //$("#trObservacion").hide();
            $("#lblModelo").text("Modelo de equipo");
            $("#lblIMEIEquipoAntCab").text("IMEI de equipo");
            $("#txtMsgNumero").hide();

            $("#trServiciosSolicitados").show();

            break;
        case 7: //ampliación
            $("#trModeloSolicitado").hide();
            $("#txtMsgNumero").hide();
            $("#lblModelo").text("Modelo de equipo");
            $("#lblIMEIEquipoAntCab").text("IMEI de equipo");
            //$("#trServiciosAmpliacion").show();
            //$("#trMontoTotalServAmp").show();
            break;
    }
    //if (DeshPag) { PaginaSinAcciones(); }
}

function mostrarDispositivosDisponibles(CodEmp, TipAdq) {
    var IdSolicitud = $("#hdfCodSol").val();
    //alert(CodEmp + ", " + TipAdq);
    var SinEquipoDisponible = false;
    vcMetodo = "Adm_ProcesarSolicitud.aspx/ListarDispositivos";
    vcData = "{'vcCodEmp': '" + CodEmp + "', 'inTipAdq': '" + TipAdq + "', 'IdSolicitud': '" + IdSolicitud + "'}";
    $("#ddlModeloEquipoNuevo").empty();
    $("#ddlModeloEquipoBuscar").empty();
    $("#btnBuscarIMEI").button("option", "disabled", true);
    arrDispositivo = [];
    $.ajax({
        type: "POST",
        url: vcMetodo,
        data: vcData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var boolExiste = false;

            if ($("#hdfCodTipSol").val() != '4') {
                if ($(result.d).length > 0) {
                    //var index = 0;
                    $("#ddlModeloEquipoNuevo").append($("<option></option>").attr("value", "-1").text("--Seleccione--"));
                    //$.each(result.d, function () {

                    //for (var i in result.d) {
                    var i = 0;
                    for (i = 0; i < result.d.length; i++) {
                        //alert(result.d[i].P_vcCodIMEI + " -> " + result.d[i].ModeloDispositivo.btSopLin);
                        eval("var Dispositivo" + i + " = new Dispositivo();");
                        eval("Dispositivo" + i + "['P_vcCodIMEI'] = '" + result.d[i].P_vcCodIMEI + "';");
                        eval("Dispositivo" + i + "['inCodModDis'] = " + result.d[i].ModeloDispositivo.P_inCod + ";");
                        eval("Dispositivo" + i + "['vcNomModDis'] = '" + result.d[i].ModeloDispositivo.vcNom + "';");
                        eval("Dispositivo" + i + "['btSopLin'] = '" + result.d[i].ModeloDispositivo.btSopLin + "';");
                        eval("Dispositivo" + i + "['dispSopLin'] = '" + result.d[i].btSopLin + "';");
                        eval("arrDispositivo.push(Dispositivo" + i + ");");

                        if (result.d[i].F_inCodTip == 1) { // mostrar modelos de dispositivos tipo staff
                            if ($("#hdfCodTipSol").val() == '1' || $("#hdfCodTipSol").val() == '3') { //tipo de solicitud de cambio y reposicion
                                if (result.d[i].vcNum == '') { //dispositivos sin linea
                                    if ($("#ddlModeloEquipoNuevo option[value='" + result.d[i].ModeloDispositivo.P_inCod + "']").val() === undefined) {
                                        $("#ddlModeloEquipoNuevo").append($("<option></option>").attr("value", result.d[i].ModeloDispositivo.P_inCod).text(result.d[i].ModeloDispositivo.vcNom));
                                        $("#ddlModeloEquipoBuscar").append($("<option></option>").attr("value", result.d[i].ModeloDispositivo.P_inCod).text(result.d[i].ModeloDispositivo.vcNom));
                                        SinEquipoDisponible = true;
                                    }
                                    if (result.d[i].ModeloDispositivo.P_inCod == $("#hdfModDisSol").val()) {
                                        boolExiste = true;
                                    }
                                }
                            } else { //tipo solicitud nuevo
                                if ($("#ddlModeloEquipoNuevo option[value='" + result.d[i].ModeloDispositivo.P_inCod + "']").val() === undefined) {
                                    $("#ddlModeloEquipoNuevo").append($("<option></option>").attr("value", result.d[i].ModeloDispositivo.P_inCod).text(result.d[i].ModeloDispositivo.vcNom));
                                    $("#ddlModeloEquipoBuscar").append($("<option></option>").attr("value", result.d[i].ModeloDispositivo.P_inCod).text(result.d[i].ModeloDispositivo.vcNom));
                                }
                                if (result.d[i].ModeloDispositivo.P_inCod == $("#hdfModDisSol").val()) {
                                    boolExiste = true;
                                }
                            }
                        }
                    }


                    //});
                    //$("#lblModeloEquipoNuevo").html(vcModDisNuevo);
                    $("#btnBuscarIMEI").button("option", "disabled", false);
                    if ($("#hdfCodTipSol").val() != '2') { $("#imgBorrar_IMEI_Fin").show(); }
                    //$("#ddlNumero").attr("disabled", true);
                    $("#ddlNumero").html('');
                    $("#ddlNumero").append($("<option></option>").attr("value", "-3").text("--Seleccione modelo--"));

                    if (inModFin != "") {
                        $("#ddlModeloEquipoNuevo").val(inModFin);
                        $("#ddlModeloEquipoBuscar").val(inModFin);
                        ActualizarCondicionCuenta();
                        ActualizarCondicionPlan();
                        //if ($("#ddlModeloEquipoNuevo").val() == "-1" && $("#txtIMEIElegido").val() != "") {
                        //    $("#lblErrorIMEIElegido").html("El empleado ya no tiene acceso al modelo del dispositivo " + $("#txtIMEIElegido").val());
                        //    $("#imgErrorIMEIElegido").show();
                        //    $("#txtIMEIElegido").val("");
                        //} else {
                        //    $("#lblErrorIMEIElegido").html("");
                        //    $("#imgErrorIMEIElegido").hide();
                        //}
                    }
                } else {
                    $("#ddlModeloEquipoNuevo").append($("<option></option>").attr("value", "-2").text("No hay equipos disponibles para esta solicitud"));
                    $("#hdfValidacion").val("No hay equipos disponibles para esta solicitud");
                }

                if (boolExiste && (inModFin == '' || inModFin == '0')) {
                    $("#ddlModeloEquipoNuevo option[value='" + $("#hdfModDisSol").val() + "']").attr("selected", true);
                    $("#ddlModeloEquipoBuscar option[value='" + $("#hdfModDisSol").val() + "']").attr("selected", true);
                    //mostrar lineas segun modelos seleccionado y plan solicitado
                }
                if ($("#hdfCodTipSol").val() != '3') { //diferente de reposición
                    mostrarLineasDisponibles($("#hdfModDisSol").val());
                }
                if ($("#txtIMEIElegido").attr("disabled")) {
                    $("#btnBuscarIMEI").button("option", "disabled", true);
                }
            } else { //reparación
                var contMod = 0;
                if ($(result.d).length > 0) {
                    $("#btnBuscarIMEI").button("option", "disabled", false);
                    //$("#ddlModeloEquipoNuevo").append($("<option></option>").attr("value", "-1").text("--Seleccione--"));

                    //for (var i in result.d) {
                    var i = 0;
                    for (i = 0; i < result.d.length; i++) {
                        if ($("#chkEquiConLinea").is(":checked")) {
                            if (result.d[i].vcNum != '') {
                                if ($("#ddlModeloEquipoNuevo option[value='" + result.d[i].ModeloDispositivo.P_inCod + "']").val() === undefined) {
                                    if (contMod == 0) {
                                        $("#ddlModeloEquipoNuevo").append($("<option></option>").attr("value", "-1").text("--Seleccione--"));
                                        contMod = 1;
                                    }
                                    $("#ddlModeloEquipoNuevo").append($("<option></option>").attr("value", result.d[i].ModeloDispositivo.P_inCod).text(result.d[i].ModeloDispositivo.vcNom));
                                    $("#ddlModeloEquipoBuscar").append($("<option></option>").attr("value", result.d[i].ModeloDispositivo.P_inCod).text(result.d[i].ModeloDispositivo.vcNom));
                                }
                            }
                        } else {
                            if (result.d[i].vcNum == '') {
                                if ($("#ddlModeloEquipoNuevo option[value='" + result.d[i].ModeloDispositivo.P_inCod + "']").val() === undefined) {
                                    if (contMod == 0) {
                                        $("#ddlModeloEquipoNuevo").append($("<option></option>").attr("value", "-1").text("--Seleccione--"));
                                        contMod = 1;
                                    }
                                    $("#ddlModeloEquipoNuevo").append($("<option></option>").attr("value", result.d[i].ModeloDispositivo.P_inCod).text(result.d[i].ModeloDispositivo.vcNom));
                                    $("#ddlModeloEquipoBuscar").append($("<option></option>").attr("value", result.d[i].ModeloDispositivo.P_inCod).text(result.d[i].ModeloDispositivo.vcNom));
                                }
                            }
                        }
                    }
                    if (contMod == 0) {
                        $("#ddlModeloEquipoNuevo").append($("<option></option>").attr("value", "-2").text("No hay equipos disponibles para esta solicitud"));
                        $("#hdfValidacion").val("No hay equipos disponibles para esta solicitud");
                        $("#btnBuscarIMEI").button("option", "disabled", true);
                    }

                    ////console.log("inModFin:" + inModFin);
                    ////if (inModFin != "" && inModFin != "0") {
                    ////    //                        $("#ddlModeloEquipoBuscar").val(inModFin);
                    ////    if ($('#ddlModeloEquipoBuscar option[value=' + inModFin + ']').length == 0 && $("#txtIMEIEnt").val() != "") {
                    ////        $("#lblErrorIMEIEnt").html("El empleado ya no tiene acceso al modelo del dispositivo " + $("#txtIMEIEnt").val());
                    ////        $("#imgErrorIMEIEnt").show();
                    ////        $("#txtIMEIEnt").val("");
                    ////        //$("#btnBuscarIMEIEnt").removeAttr("disabled");
                    ////        $("#btnBuscarIMEIEnt").button("option", "disabled", false);
                    ////    } else {
                    ////        $("#lblErrorIMEIEnt").html("");
                    ////        $("#imgErrorIMEIEnt").hide();
                    ////    }
                    ////}

                } else {
                    $("#ddlModeloEquipoNuevo").append($("<option></option>").attr("value", "-2").text("No hay equipos disponibles para esta solicitud"));
                    $("#ddlModeloEquipoBuscar").append($("<option></option>").attr("value", $("#hdfModDisSol").val()).text($("#txtModeloEquipoAnt").val()));

                    $("#hdfValidacion").val("No hay equipos disponibles para esta solicitud");
                }
                if ($("#txtIMEIEnt").attr("disabled")) {
                    $("#btnBuscarIMEIEnt").button("option", "disabled", true);
                }
            }

            if (!biCadConAct && ($("#hdfTipSol").val() == '1' || $("#hdfTipSol").val() == '3' || $("#hdfTipSol").val() == '4')) { //Nuevo, Reposición o Reparación
                vcCadenaControles = fnArmaCadenaDeControles();
                biCadConAct = true;
            }

            if ($("#ddlModeloEquipoNuevo option").length <= 1) {
                $("#tdAlerta").show();
                $('#btnBuscarIMEI').button("option", "disabled", true);
                $('#txtIMEIElegido').attr("disabled", true);
                $('#imgBorrar_IMEI_Fin').attr("disabled", true);
            } else {
                $("#tdAlerta").hide();
                $('#btnBuscarIMEI').button("option", "disabled", false);
                $('#txtIMEIElegido').removeAttr('disabled');
                $('#imgBorrar_IMEI_Fin').removeAttr('disabled');
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function CargarGrillaEquipos(esProceso) {
    if (esProceso == "1") {
        //        $("#ddlModeloEquipoBuscar").val($("#ddlModeloEquipoNuevo").val());
    }

    if ($("#tbEquipo") !== undefined) {
        $("#tbEquipo").trigger("reloadGrid");
    }

    $("#tbEquipo").jqGrid({
        sortable: true,
        datatype: function () {

            $.ajax({
                type: "POST",
                url: "Adm_ProcesarSolicitud.aspx/ListarEquiposPorFiltro",
                data: "{'inPagTam':'" + $('#tbEquipo').getGridParam("rowNum") + "'," + //Tamaño de pagina
                    "'inPagAct':'" + parseInt($('#tbEquipo').getGridParam("page")) + "'," + //Pagina actual
                    "'vcOrdCol':'" + $('#tbEquipo').getGridParam("sortname") + "'," + //Nombre de columna ordenado
                    "'vcTipOrdCol':'" + $('#tbEquipo').getGridParam("sortorder") + "'," + //Tipo de orden de columna asc, desc                               
                    "'vcCam':'" + "" + "'," + //Campo de busqueda
                    "'vcValBus':'" + "" + "'," + //Valor de busqueda
                    "'vcTab':'" + $('#hdfvcTab').val() + "'," + //Tabla
                    "'inTipOri':'" + $('#hdfinTipOri').val() + "'," + //TipoOrigen
                    "'inTipLin':'" + $('#hdfCodLinTip_X_User').val() + "'," + //TipoLinea
                    "'inFilReg':'" + 1 + "'," +
                    "'vcCodEmp': '" + $("#lblCodEmpleado").text() + "', " +
                    "'inCodModDis': '" + $("#ddlModeloEquipoBuscar").val() + "'," +
                    "'vcFecIni': '" + '' + "'," +
                    "'vcFecFin': '" + '' + "'," +
                    "'inTipAdq': '" + $("#ddlTipoAdquisicion").val() + "'," +
                    "'hdfCodTipSol': '" + $("#hdfCodTipSol").val() + "', " +
                    "'chkEquiConLinea': '" + $("#chkEquiConLinea").is(":checked") + "' }",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    
                    $("#tbEquipo")[0].addJSONData(result.d);

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
        colModel: [{ name: 'P_vcCodIMEI', index: 'P_vcCodIMEI', label: 'IMEI', width: '110', align: 'center', resizable: false },
                       { name: 'F_inCodModDis', index: 'F_inCodModDis', label: 'inCodModDis', width: '20', align: 'left', resizable: false, hidden: true },
                       { name: 'Modelo', index: 'Modelo', label: 'Modelo', width: '360', align: 'left', resizable: false },
                       { name: 'dtFecIng', index: 'dtFecIng', label: 'Fecha', align: 'left', resizable: false, hidden: true },
                       { name: 'F_inCodTipAdq', index: 'F_inCodTipAdq', label: 'inTipAdq', width: '15', align: 'center', resizable: false, hidden: true },
                       { name: 'vcNum', index: 'vcNum', label: 'Número', width: '80', align: 'center', resizable: false, hidden: false }
                       , { name: 'rpm', index: 'rpm', label: 'Tipo de Adquisición', width: '80', align: 'center', resizable: false }
                       , { name: 'vcNomEst', index: 'vcNomEst', label: 'NombrePlan', width: '55', align: 'center', resizable: false, hidden: true }
                       , { name: 'costoReposicion', index: 'costoReposicion', label: 'MontoPlan', width: '55', align: 'center', resizable: false, hidden: true }
                       , { name: 'inNumMesProCam', index: 'inNumMesProCam', label: 'MesesContrato', width: '55', align: 'center', resizable: false, hidden: true }
                       , { name: 'TipoAsiganacion', index: 'TipoAsiganacion', label: 'Tipo Asignación', width: '15', aling: 'center', resizable: false, hidden: true }
                       , { name: 'inMin', index: 'inMin', label: 'Cant Serv Bolsa', width: '80', align: 'center', hidden: false }
                       , { name: 'inEst', index: 'inEst', label: 'CodPlan', width: '15', align: 'center', hidden: true }
                       , { name: 'F_vcCodEmp', index: 'F_vcCodEmp', label: 'F_vcCodEmp', width: '35', align: 'center', hidden: true }
        ],
        sortname: 'Fecha',
        width: "775",
        height: "300",
        viewrecords: false,
        sortorder: "desc",
        multiselect: false,
        rowNum: 20,
        rowList: [20, 50, 100],
        pager: "#pager_Equipo", //Pager.
        subGrid: true,
        shrinkToFit: false,
        subGridOptions: {
            "reloadOnExpand": false,
            "selectOnExpand": true
        },
        subGridRowExpanded: function (subgrid_id, row_id) {
            let row = $("#tbEquipo").getRowData(row_id);
            var subgrid_table_id, pager_id;
            subgrid_table_id = subgrid_id + "_t";
            pager_id = "p_" + subgrid_table_id;
            $("#" + subgrid_id).html("<table id='" + subgrid_table_id + "' class='scroll'></table><div id='" + pager_id + "' class='scroll'></div>");
            $("#" + subgrid_table_id).jqGrid({
                datatype: function () {
                    $.ajax({
                        url: "Adm_ProcesarSolicitud.aspx/ListarHistoricosPorDispositivo", //PageMethod
                        data: "{'vcCodIMEI': '" + row.P_vcCodIMEI + "'}",
                        dataType: "json",
                        type: "post",
                        contentType: "application/json; charset=utf-8",
                        success: function (result) {
                            if (result.d.length == 0) {
                                $("#" + subgrid_id).html("");
                                $("#" + subgrid_id).html("<div>No existe históricos para este dispositivo, Dispositivo nuevo.</div>");
                            }
                            $("#" + subgrid_table_id).jqGrid('clearGridData');
                            var i = 0;
                            for (i = 0; i < $(result.d).length; i++) {
                                $("#" + subgrid_table_id).jqGrid('addRowData', i, result.d[i]);
                            }

                            $("#" + subgrid_table_id).setGridHeight($(result.d).length * 23 + 45);
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        }
                    });
                },
                colModel: [{ name: 'P_F_vcCodDis', index: 'P_F_vcCodDis', label: 'P_F_vcCodDis', width: 10, align: 'center', sortable: false, resizable: false, hidden: true },
                               { name: 'P_dtFecIni', index: 'P_dtFecIni', label: 'Fecha Inicio', width: 135, align: 'left', sortable: false, resizable: false },
                               { name: 'dtFecFin', index: 'dtFecFin', label: 'Fecha Fin', width: 135, align: 'left', sortable: false, resizable: false },
                               { name: 'F_vcNumLin', index: 'F_vcNumLin', label: 'Línea', width: 80, align: 'left', sortable: false, resizable: false },
                               { name: 'vcNomEst', index: 'vcNomEst', label: 'Estado', width: 100, align: 'left', sortable: false, resizable: false },
                               { name: 'F_vcCodEmp', index: 'F_vcCodEmp', label: 'F_vcCodEmp', width: 200, align: 'right', sortable: false, resizable: false, hidden: true },
                               { name: 'EMPL_vcNOMEMP', index: 'EMPL_vcNOMEMP', label: 'Empleado', width: 220, align: 'left', sortable: false, resizable: false }
                ],
                sortname: 'Fecha',
                sortorder: "asc",
                width: "720",
                height: "100",
                shrinkToFit: false,
                beforeSelectRow: function (rowId, e) {
                    return false;
                }
            });
        },
        ondblClickRow: function (id) {
            var row = $("#tbEquipo").getRowData(id);
            AbrirRegistro(row.P_vcCodIMEI);
        }
    }).navGrid("#pager_Equipo", { edit: false, add: false, search: false, del: false });
    $("#tbEquipo").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });


    $("#tbEquipo").jqGrid('bindKeys', {
        "onEnter": function (id) { AbrirRegistro(id); },
        "onSpace": function (id) { AbrirRegistro(id); }
    });

    function AbrirRegistro(id) {
        $("#tbEquipo").toggleSubGridRow(id);
    }

    $(window).resize(function (x) {
        $("#tbEquipo").setGridWidth($(window).width());
        $("#tbEquipo").setGridHeight($(window).height());
    });

    //CargarOrganizacionDetalle();

    function CargarOrganizacionDetalle() {

        //$.ajax({
        //    //async: false,
        //    type: "POST",
        //    url: "Adm_ProcesarSolicitud.aspx/ListarEquiposPorFiltro",
        //    data: "{'inPagTam':'" + $('#tbEquipo').getGridParam("rowNum") + "'," + //Tamaño de pagina
        //        "'inPagAct':'" + parseInt($('#tbEquipo').getGridParam("page")) + "'," + //Pagina actual
        //        "'vcOrdCol':'" + $('#tbEquipo').getGridParam("sortname") + "'," + //Nombre de columna ordenado
        //        "'vcTipOrdCol':'" + $('#tbEquipo').getGridParam("sortorder") + "'," + //Tipo de orden de columna asc, desc                               
        //        "'vcCam':'" + "" + "'," + //Campo de busqueda
        //        "'vcValBus':'" + "" + "'," + //Valor de busqueda
        //        "'vcTab':'" + $('#hdfvcTab').val() + "'," + //Tabla
        //        "'inTipOri':'" + $('#hdfinTipOri').val() + "'," + //TipoOrigen
        //        "'inTipLin':'" + $('#hdfCodLinTip_X_User').val() + "'," + //TipoLinea
        //        "'inFilReg':'" + 1 + "',"+
        //        "'vcCodEmp': '" + $("#lblCodEmpleado").text() + "', " +
        //        "'inCodModDis': '" + $("#ddlModeloEquipoBuscar").val() + "'," +
        //        "'vcFecIni': '" + '' + "'," +
        //        "'vcFecFin': '" + '' + "'," +
        //        "'inTipAdq': '" + $("#ddlTipoAdquisicion").val() + "'," +
        //        "'hdfCodTipSol': '" + $("#hdfCodTipSol").val() + "', " +
        //        "'chkEquiConLinea': '" + $("#chkEquiConLinea").is(":checked") + "' }",
        //    contentType: "application/json; charset=utf-8",
        //    dataType: "json",
        //    success: function (result) {
        //        $("#tbEquipo").jqGrid('clearGridData');
                
        //        debugger;

        //        $("#tbEquipo")[0].addJSONData(result.d);

        //        //$("#tbEquipo").jqGrid("getGridParam").data = result.d;
                

        //        //var i = 0;
        //        //for (i = 0; i < $(result.d).length; i++) {
        //        //    $("#tbEquipo").jqGrid('addRowData', result.d[i].P_vcCodIMEI, result.d[i]);
        //        //}

        //        if ($(result.d).length > 0) {
        //            $("#ContentPlaceHolder1_UTSum__ctl1_lblError").hide();
        //            $("#ContentPlaceHolder1_UTSum__ctl1_pnDet").show();
        //        }
        //        else {
        //            $("#ContentPlaceHolder1_UTSum__ctl1_lblError").show();
        //            $("#ContentPlaceHolder1_UTSum__ctl1_pnDet").hide();
        //        }


        //        $(".ui-pg-selbox").change();

        //    },
        //    error: function (xhr, err, thrErr) {
        //        MostrarErrorAjax(xhr, err, thrErr);
        //    }
        //});

        //$("#tbEquipo").trigger("reloadGrid", [{ current: true }]);
    }

    $("#ddlModeloEquipoBuscar,#ddlTipoAdquisicion").change(function () {
        CargarOrganizacionDetalle();
    });
}

function mostrarLineasDisponibles(codModDis) {
    //alert("Modelo seleccioando: " + codModDis + "\nPlan solicitado: " + $("#hdfPlaSol").val());
    if ($("#hdfTipSol").val() != '2') {
        return;
    }
    var inCodSol = "0";
    if (biSerLinSol && $("#txtMsgNumero").val() != "") {
        inCodSol = $("#hdfCodSol").val();
    }

    $.ajax({
        type: "POST",
        url: "Adm_ProcesarSolicitud.aspx/ListarLineasLibresPorSolicitud",
        data: "{'inCodModDis': '" + codModDis + "'," +
              "'inCodSol': '" + $("#hdfCodSol").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //$("#ddlNumero").show();
            //$("#lblNumCelular").hide();
            $("#txtNumCelular").hide();
            $("#ddlNumero").html("");
            var existePlan = false;
            var planSelec = '';
            DataLineas = [];
            Lineas = [];
            if ($(result.d).length > 0) {
                $.each(result.d, function () {
                    //if (this.F_inCodTip == 1) { //lineas tipo staff
                    Lineas.push(this.P_vcNum);
                    DataLineas[this.P_vcNum.toString()] = [];
                    DataLineas[this.P_vcNum.toString()].Numero = this.P_vcNum;
                    DataLineas[this.P_vcNum.toString()].CodPlan = this.Plan.P_inCod;
                    DataLineas[this.P_vcNum.toString()].NomPlan = this.Plan.vcNom;
                    DataLineas[this.P_vcNum.toString()].Monto = this.dcMon;
                    DataLineas[this.P_vcNum.toString()].MesesContrato = this.MesesContrato;
                    DataLineas[this.P_vcNum.toString()].CodCuenta = this.Cuenta.P_vcCod;
                    DataLineas[this.P_vcNum.toString()].NomCuenta = this.Cuenta.vcNom;
                    DataLineas[this.P_vcNum.toString()].CodOperador = this.Operador.P_inCodOpe;
                    DataLineas[this.P_vcNum.toString()].NomOperador = this.Operador.vcNomOpe;
                    DataLineas[this.P_vcNum.toString()].CodTipAsiCre = this.Cuenta.TipoAsignacionCredito.P_inCod;
                    DataLineas[this.P_vcNum.toString()].NomTipAsiCre = this.Cuenta.TipoAsignacionCredito.vcNom;
                    DataLineas[this.P_vcNum.toString()].Servicios = this.Servicios;

                    $("#ddlNumero").append($("<option></option>").val(this.P_vcNum).text(this.P_vcNum));
                    if (!existePlan) {
                        if (this.Plan.P_inCod.toString() == $("#hdfPlaSol").val()) {
                            existePlan = true;
                            //planSelec = this.Plan.P_inCod.toString() + "|" + this.Plan.vcNom.toString();
                            planSelec = this.P_vcNum;
                        }
                    }
                });
                $("#dvInfoLinea").show();
                //$("#imgInfoNumero").attr("title", "Mostrando lineas disponibles sin dispositivos asociados");
                $("#ttgInfoLinea_DvMiMensaje").html("");
                $("#ttgInfoLinea_DvMiMensaje").append("Mostrando lineas disponibles sin dispositivos asociados");
            } else {
                $("#ddlNumero").append($("<option></option>").attr("value", "-2").text("Sin datos"));
                $("#dvInfoLinea").show();
                //$("#imgInfoNumero").attr("title", "No hay líneas disponibles para los modelos disponibles");
                $("#ttgInfoLinea_DvMiMensaje").html("");
                $("#ttgInfoLinea_DvMiMensaje").append("No hay líneas disponibles para los modelos disponibles");
            }
            if (existePlan && $("#txtMsgNumero").val() == '') {
                $("#ddlNumero").val(planSelec);
                $("#txtMsgNumero").val(planSelec);
            }
            //if (DataLineas.length > 0) {
            //    $("#txtMsgNumero").val(DataLineas[$("#ddlNumero").val()].NomPlan + "  (S/." + DataLineas[$("#ddlNumero").val()].Monto + ")");
            //    MesesContratoFactLInea = DataLineas[$("#ddlNumero").val()].MesesContrato;
            //    MontoFactLinea = DataLineas[$("#ddlNumero").val()].Monto;
            //}
            if (!biCadConAct) {
                vcCadenaControles = fnArmaCadenaDeControles();
                biCadConAct = true;
            }

            datosInicio = fnObtenerDatosFormulario();
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function mostrarServiciosSolicitados(codSol) {
    $("#tbServSolic").jqGrid({
        datatype: "local",
        colModel: [{ name: 'inCodSer', index: 'inCodSer', label: 'inCodSer', width: '50', align: 'center', sortable: false, resizable: false, hidden: true },
                    { name: 'NombreServ', index: 'NombreServ', label: 'Nombre', width: '120', align: 'left', sortable: false, resizable: false, hidden: false },
                    { name: 'Estado', index: 'Estado', label: 'Estado', width: '20', align: 'center', sortable: false, resizable: false, hidden: false }],
        emptyrecords: 'No hay resultados',
        sortname: 'inCodSer',
        width: "450",
        height: "110",
        viewrecords: true,
        sortorder: "desc",
        multiselect: false,
        beforeSelectRow: function (rowid, e) {
            return false;
        }
    });
    $.ajax({
        type: "POST",
        url: "Adm_ProcesarSolicitud.aspx/ListarServiciosSolicitados",
        data: "{'inCodSol': '" + codSol + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $.each(result.d, function () {
                var datos = {
                    inCodSer: this.idSer,
                    NombreServ: this.nomSer,
                    Estado: this.est == 1 ? 'Activar' : 'Desactivar'
                };
                $("#tbServSolic").jqGrid('addRowData', this.idSer, datos);
            });

            //if (result.d.length != 0) {
            //    $.each(result.d, function() {
            //        var estado = this.est == 1 ? 'Activar' : 'Desactivar';
            //        $("#tbServSolic").append('<tr><td>' + this.nomSer + '</td><td> - ' + estado + '</td></tr>');
            //    });
            //} else {
            //    $("#tbServSolic").append('<tr><td>Error en datos de solicitud de servicio.</td></tr>');
            //};

            if (!biCadConAct) {
                vcCadenaControles = fnArmaCadenaDeControles();
                biCadConAct = true;
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function MostrarDatosAmpliacion(codSol) {
    tbServAmpliacion = $("#tbServAmpliacion").jqGrid({
        datatype: "local",
        colModel: [{ name: 'P_inCod', index: 'P_inCod', label: 'Codigo', width: 60, hidden: true },
                    { name: 'vcNom', index: 'vcNom', label: 'Servicio', width: 150 },
                    { name: 'vcNomPaqAmp', index: 'vcNomPaqAmp', label: 'Paquete', width: 150 },
                    { name: 'vcCant', index: 'vccCant', label: 'Cantidad', width: 70, align: "right" },
                    { name: 'vcCantReal', index: 'vcCantReal', label: 'Cantidad Real', width: 70, hidden: true },
        //{ name: 'dcCosto', index: 'dcCosto', label: 'Costo (' + oCulturaLocal.Moneda.vcSimMon + ')', width: 90, align: "right", sorttype: "float",
                    {
                        name: 'dcCosto', index: 'dcCosto', label: 'Costo', width: 80, align: "right", sorttype: "float",
                        formatter: function (value, options, rData) {
                            if (value == 0) {
                                return 'Sin costo';
                            } else {
                                return oCulturaLocal.Moneda.vcSimMon + " " + FormatoNumero(value.toString(), oCulturaLocal);
                            }
                        }
                    },
                   { name: 'dcCostoReal', index: 'dcCostoReal', label: 'Costo Real', width: 90, hidden: true },
                   { name: 'inTipoServ', index: 'inTipoServ', label: 'inTipoServ', hidden: true }
        ],
        sortname: "P_inCod", //Default SortColumn
        multiselect: false,
        multiselectWidth: 60,
        sortorder: "asc", //Default SortOrder.
        width: "450",
        height: "95",
        rownumbers: false,
        caption: "Paquetes ampliación",
        forceFit: true,
        shrinkToFit: false,
        beforeSelectRow: function () {
            return false;
        }
    });

    tbServAmpliacionEdit = $("#tbServAmpliacionEdit").jqGrid({
        datatype: "local",
        colModel: [{ name: 'P_inCod', index: 'P_inCod', label: 'Codigo', width: 60, hidden: true },
                    { name: 'vcNom', index: 'vcNom', label: 'Servicio', width: 140 },
                    { name: 'vcNomPaqAmp', index: 'vcNomPaqAmp', label: 'Paquete', width: 140 },
                    { name: 'vcCant', index: 'vccCant', label: 'Cantidad', width: 65, align: "right" },
                    { name: 'vcCantReal', index: 'vcCantReal', label: 'Cantidad Real', width: 90, hidden: true },
        //{ name: 'dcCosto', index: 'dcCosto', label: 'Costo (' + oCulturaLocal.Moneda.vcSimMon + ')', width: 90, align: "right", sorttype: "float",
                    {
                        name: 'dcCosto', index: 'dcCosto', label: 'Costo', width: 65, align: "right",
                        formatter: function (value, options, rData) {
                            if (value == 0) {
                                return 'Sin costo';
                            } else {
                                return oCulturaLocal.Moneda.vcSimMon + " " + FormatoNumero(value.toString(), oCulturaLocal);
                            }
                        }
                    },
                   { name: 'dcCostoReal', index: 'dcCostoReal', label: 'Costo Real', width: 90, hidden: true },
                   { name: 'btEditado', index: 'btEditado', label: "Editado", width: 50, hidden: btPaqueteMultiselect, align: "center" },
                   {
                       name: 'vcCantEdit', index: 'vccCantEdit', label: 'Cantidad Editada', width: 65, align: "right",
                       formatter: function (value, options, rData) {
                           if (value == "") {
                               return '-          ';
                           } else {
                               return value;
                           }
                       }
                   },
                   { name: 'vcCantRealEdit', index: 'vcCantRealEdit', label: 'Cantidad Editada Real', width: 90, hidden: true },
                   {
                       name: 'dcCostoEdit', index: 'dcCostoEdit', label: 'Costo Editado', width: 65, align: "right", sorttype: "float",
                       formatter: function (value, options, rData) {
                           if ($.trim(value) != '-') {
                               if (value == 0 && $("#hdfEstado").val() == "8" && rData.vcCantEdit != "") {
                                   return 'Sin costo';
                               } else if (value == 0 && $("#hdfEstado").val() == "8" && rData.vcCantEdit == "") {
                                   return '-          ';
                               } else if (value == 0 && $("#hdfEstado").val() == "7") {
                                   return '-          ';
                               } else {
                                   return oCulturaLocal.Moneda.vcSimMon + " " + FormatoNumero(value.toString(), oCulturaLocal);
                               }
                           } else {
                               return $.trim(value) + "          ";
                           }
                       }
                   },
                   { name: 'dcCostoEditReal', index: 'dcCostoEditReal', label: 'Costo Editado Real', width: 90, hidden: true },
                   { name: 'inTipoServ', index: 'inTipoServ', label: 'inTipoServ', hidden: true },
                   { name: 'btProcesado', index: 'btProcesado', label: 'Procesado', hidden: btPaqueteMultiselect, width: 65, align: "center" },
                   { name: 'inIdPaqAmp', index: 'inIdPaqAmp', label: 'inIdPaqAmp', hidden: true, width: 50 },
                   { name: 'inIdPaqAmpProc', index: 'inIdPaqAmpProc', label: 'inIdPaqAmpProc', hidden: true, width: 50 }
        ],
        sortname: "P_inCod", //Default SortColumn
        multiselect: btPaqueteMultiselect,
        multiselectWidth: 25,
        sortorder: "asc", //Default SortOrder.
        width: "610",
        height: "95",
        rownumbers: false,
        caption: vcTitSerAmp,
        forceFit: true,
        shrinkToFit: false,
        multiboxonly: false,
        beforeSelectRow: function (rowId, e) {
            return btPaqueteMultiselect;
        },
        ondblClickRow: function (rowid, iRow, iCol, e) {
            if ($("#hdfEstado").val() == "7" && $("#hdfEstado_Apr").val() == "34") {
                return false;
            } else {
                var datosPaquete = $("#tbServAmpliacionEdit").jqGrid('getRowData', rowid);
                EditarPaquete(rowid, datosPaquete.vcNom, datosPaquete.inTipoServ, datosPaquete.vcCantReal, datosPaquete.vcNomPaqAmp, datosPaquete.P_inCod);
            }
        },
        onSelectRow: function (rowid, status, e) {
            if (e != undefined) {
                var datosPaquete = $("#tbServAmpliacionEdit").jqGrid('getRowData', rowid);
                var costoActual = DevuelveNumeroSinFormato($("#txtMontoTotalServAmp").val(), oCulturaLocal, true);
                var costoServicio = datosPaquete.dcCostoReal;
                var costoEditado = datosPaquete.dcCostoEditReal;
                var costoNuevo = 0;
                if (status == true) {
                    //if (costoEditado != '') {
                    if (datosPaquete.btEditado == '1') {
                        costoNuevo = parseInt(costoActual) + parseInt(costoEditado);
                    } else {
                        costoNuevo = parseInt(costoActual) + parseInt(costoServicio);
                    }
                } else {
                    //if (costoEditado != '') {
                    if (datosPaquete.btEditado == '1') {
                        costoNuevo = parseInt(costoActual) - parseInt(costoEditado);
                    } else {
                        costoNuevo = parseInt(costoActual) - parseInt(costoServicio);
                    }
                }
                $("#txtMontoTotalServAmp").val(oCulturaLocal.Moneda.vcSimMon + " " + FormatoNumero(costoNuevo, oCulturaLocal, false));
            }
        }
    });
    fnActualizarDatosAmpliacion(codSol);
}

function fnActualizarMontoTotalAmpliacion() {
    var rowSel = $("#tbServAmpliacionEdit").jqGrid('getGridParam', 'selarrrow');
    var totalCosto = 0;
    var i = 0;
    for (i = 0; i < rowSel.length; i++) {
        var datosPaquete = $("#tbServAmpliacionEdit").jqGrid('getRowData', rowSel[i]);
        var costoServicio = datosPaquete.dcCostoReal;
        var costoEditado = datosPaquete.dcCostoEditReal;
        if (datosPaquete.btEditado == '1') {
            totalCosto = parseFloat(totalCosto) + parseFloat(costoEditado);
        } else {
            totalCosto = parseFloat(totalCosto) + parseFloat(costoServicio);
        }
    }
    $("#txtMontoTotalServAmp").val(oCulturaLocal.Moneda.vcSimMon + " " + FormatoNumero(totalCosto, oCulturaLocal, false));
}

function fnActualizarDatosAmpliacion(codSol) {
    $.ajax({
        type: "POST",
        url: "Adm_ProcesarSolicitud.aspx/ListarDatosAmpliacion",
        data: "{'inCodSol': '" + codSol + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var tipoAmp = result.d[0];
            var PaquetesSolicitados = JSON.parse(result.d[1]);
            $("#tbServAmpliacionEdit").jqGrid("clearGridData", true);
            $("#tbServAmpliacion").jqGrid("clearGridData", true);
            if (tipoAmp == "Servicios") {
                var MontoTotal = 0;
                $.each(PaquetesSolicitados, function (e) {
                    var paq = PaquetesSolicitados[e];
                    if ($("#hdfEstado").val() == "8" && $("#hdfEstado_Apr").val() == "34") { //mostrar grilla de edicion si es procesar
                        var DatosPaqueteEdit = {
                            P_inCod: paq.P_inCod,
                            vcNom: paq.vcNom,
                            vcNomPaqAmp: paq.vcNomPaqAmp,
                            vcCant: paq.dcCan + " " + paq.TipoServiciovcExpEn,
                            vcCantReal: paq.dcCan,
                            dcCosto: FormatoNumero(paq.dcMon, oCulturaLocal).toString(),
                            dcCostoReal: paq.dcMon,
                            inTipoServ: paq.TipoServicioP_inCod,
                            btEditado: paq.btEditado == 'SI' ? 1 : 0, //0
                            vcCantEdit: paq.inCantProc != '' ? paq.inCantProc + " " + paq.TipoServiciovcExpEn : '', //''
                            vcCantRealEdit: paq.inCantProc, //'',
                            dcCostoEdit: paq.dcCostProc != '' ? FormatoNumero(paq.dcCostProc, oCulturaLocal).toString() : '', //"           -";
                            dcCostoEditReal: paq.dcCostProc,
                            inIdPaqAmp: paq.inIdPaqAmp,
                            inIdPaqAmpProc: paq.inIdPaqAmpProc
                        };
                        $("#tbServAmpliacionEdit").jqGrid('addRowData', paq.P_inCod, DatosPaqueteEdit);
                        if (paq.btGuardado == "SI") {
                            $("#tbServAmpliacionEdit").jqGrid('setSelection', paq.P_inCod);
                        }
                    } else if ($("#hdfEstado").val() == "7" && $("#hdfEstado_Apr").val() == "34") { //mostrar grilla de edicion si es culminada
                        var DatosPaqueteEdit = {
                            P_inCod: paq.P_inCod,
                            vcNom: paq.vcNom,
                            vcNomPaqAmp: paq.vcNomPaqAmp,
                            vcCant: paq.dcCan + " " + paq.TipoServiciovcExpEn,
                            vcCantReal: paq.dcCan,
                            dcCosto: FormatoNumero(paq.dcMon, oCulturaLocal).toString(),
                            dcCostoReal: paq.dcMon,
                            inTipoServ: paq.TipoServicioP_inCod,
                            btEditado: paq.btEditado,
                            vcCantEdit: paq.inCantProc != '' ? paq.inCantProc + " " + paq.TipoServiciovcExpEn : '',
                            vcCantRealEdit: "",
                            dcCostoEdit: paq.dcCostProc,
                            dcCostoEditReal: "",
                            btProcesado: paq.btProcesado,
                            inIdPaqAmp: paq.inIdPaqAmp,
                            inIdPaqAmpProc: paq.inIdPaqAmpProc
                        };
                        $("#tbServAmpliacionEdit").jqGrid('addRowData', paq.P_inCod, DatosPaqueteEdit);
                        //                        $("#tbServAmpliacionEdit").jqGrid('setSelection', paq.P_inCod);
                    } else {
                        var DatosPaquete = {
                            P_inCod: paq.P_inCod,
                            vcNom: paq.vcNom,
                            vcNomPaqAmp: paq.vcNomPaqAmp,
                            vcCant: paq.dcCan + " " + paq.TipoServiciovcExpEn,
                            vcCantReal: paq.dcCan,
                            dcCosto: FormatoNumero(paq.dcMon, oCulturaLocal).toString(),
                            dcCostoReal: paq.dcMon,
                            inTipoServ: paq.TipoServicioP_inCod,
                            IdPaqAmp: paq.IdPaqAmp,
                            inIdPaqAmpProc: paq.inIdPaqAmpProc
                        };
                        $("#tbServAmpliacion").jqGrid('addRowData', paq.P_inCod, DatosPaquete);
                    }
                    if ($("#hdfEstado").val() == "7" && $("#hdfEstado_Apr").val() == "34") {
                        if (paq.btProcesado == 'SI' && paq.btEditado == 'SI') {
                            MontoTotal = parseFloat(MontoTotal) + parseFloat(paq.dcCostProc);
                        } else if (paq.btProcesado == 'SI' && paq.btEditado == 'NO') {
                            MontoTotal = parseFloat(MontoTotal) + parseFloat(paq.dcMon);
                        }
                    } else {
                        //MontoTotal = parseFloat(MontoTotal) + parseFloat(paq.dcMon);
                        if (paq.btGuardado == 'SI' && paq.btEditado == 'SI') {
                            MontoTotal = parseFloat(MontoTotal) + parseFloat(paq.dcCostProc);
                        } else if (paq.btGuardado == 'SI' && paq.btEditado == 'NO') {
                            MontoTotal = parseFloat(MontoTotal) + parseFloat(paq.dcMon);
                        }
                    }
                });
                if (($("#hdfEstado").val() == "8" || $("#hdfEstado").val() == "7") && $("#hdfEstado_Apr").val() == "34") {
                    $("#cb_tbServAmpliacionEdit").hide();
                    $("#jqgh_tbServAmpliacionEdit_cb").append("Proc");
                    $("#trServiciosAmpliacion").hide();
                    $("#trServiciosAmpliacionEdit").show();
                    //cagar paquetes de ampliacion para edicion de paquetes solicitados
                    PaquetesAmpliacion = JSON.parse(result.d[2]);
                    if ($("#hdfEstado").val() == "7") {
                        $("#ttgInfoServiciosProcesar_dvToolTip").hide();
                    }
                } else {
                    $("#trServiciosAmpliacion").show();
                    $("#trServiciosAmpliacionEdit").hide();
                }

                $("#txtMontoTotalServAmp").val(oCulturaLocal.Moneda.vcSimMon + " " + FormatoNumero(MontoTotal, oCulturaLocal));
                $("#txtMontoTotalServAmp").css({ "text-align": "right" });
                //$("#txtMontoTotalServAmp").val(MontoTotal);
                //ValidarNumeroEnCajaTexto("txtMontoTotalServAmp", ValidarDecimalPositivo, oCulturaLocal, false);
                $("#trMontoTotalServAmp").show();
            } else if (tipoAmp == "Planes") {
                if ($("#hdfEstado").val() == "7") {
                    $("#trPlanAmpInicial").show();
                }
                if ($("#hdfEstado").val() != "9") {
                    $("#trPlanAmpActual").show();
                }
                $("#trPlanAmpSolicitado").show();
                $.each(PaquetesSolicitados, function (e) {
                    var paq = PaquetesSolicitados[e];
                    if (paq.vcDes == 'ant') {
                        $("#txtPlanAmpInicial").val(paq.vcNom + " (" + oCulturaLocal.Moneda.vcSimMon + " " + FormatoNumero(paq.dcMon, oCulturaLocal) + ")");
                        $("#hdfPlaIni").val(paq.P_inCod);
                    } else if ((paq.vcDes == 'asi' && $("#hdfEstado").val() == "7") || (paq.vcDes == 'act' && ($("#hdfEstado").val() == "8" || $("#hdfEstado").val() == "6"))) {
                        $("#txtPlanActualLinea").val(paq.vcNom + " (" + oCulturaLocal.Moneda.vcSimMon + " " + FormatoNumero(paq.dcMon, oCulturaLocal) + ")");
                        $("#hdfPlaAct").val(paq.P_inCod);
                    } else if (paq.vcDes == 'sol') {
                        $("#txtPlanAmpSolicitado").val(paq.vcNom + " (" + oCulturaLocal.Moneda.vcSimMon + " " + FormatoNumero(paq.dcMon, oCulturaLocal) + ")");
                        $("#hdfPlaSol").val(paq.P_inCod);
                    } else {
                        $("#txtPlanAmpSolicitado").val("No se ha podido encontrar el plan solicitado");
                    }
                });
            }
            if (!biCadConAct) {
                vcCadenaControles = fnArmaCadenaDeControles();
                biCadConAct = true;
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function EditarPaquete(CodServ, NombreServ, TipServ, CantidadServ, NombrePaquete, Serv) {

    $("#lblEditServ_Nombre").text(NombreServ);
    $("#hdfEditPaqueteAmp").val(CodServ);
    //alert(CodServ + "; " + NombreServ + "; " + TipServ + "; " + CantidadServ);
    $("#ddlEditPaquetes").html('');
    $.each(PaquetesAmpliacion, function () {
        if (Serv == null || Serv == undefined || Serv == -1) {
            if (this.F_inTipSer == TipServ) {
                //alert(JSON.stringify(this));
                $("#ddlEditPaquetes").append($("<option></option>").text(this.vcNomPaqAmp + " (" + this.inCantidad + " " + this.vcExpEn + " - " + oCulturaLocal.vcTipMon + " " + FormatoNumero(this.dcCosto, oCulturaLocal).toString() + ")").val(this.inCantidad).attr("costo", this.dcCosto).attr("medida", this.vcExpEn).attr("idPaqAmp", this.IdPaqAmp).attr("vcNomPaqAmp", this.vcNomPaqAmp));
            }
        } else {
            if (Serv != TipServ) {
                if (this.F_inTipSer == TipServ && this.F_inSer == Serv) {
                    //alert(JSON.stringify(this));
                    $("#ddlEditPaquetes").append($("<option></option>").text(this.vcNomPaqAmp + " (" + this.inCantidad + " " + this.vcExpEn + " - " + oCulturaLocal.vcTipMon + " " + FormatoNumero(this.dcCosto, oCulturaLocal).toString() + ")").val(this.inCantidad).attr("costo", this.dcCosto).attr("medida", this.vcExpEn).attr("idPaqAmp", this.IdPaqAmp).attr("vcNomPaqAmp", this.vcNomPaqAmp));
                }
            } else {
                if (this.F_inTipSer == TipServ && this.F_inSer == 0) {
                    //alert(JSON.stringify(this));
                    $("#ddlEditPaquetes").append($("<option></option>").text(this.vcNomPaqAmp + " (" + this.inCantidad + " " + this.vcExpEn + " - " + oCulturaLocal.vcTipMon + " " + FormatoNumero(this.dcCosto, oCulturaLocal).toString() + ")").val(this.inCantidad).attr("costo", this.dcCosto).attr("medida", this.vcExpEn).attr("idPaqAmp", this.IdPaqAmp).attr("vcNomPaqAmp", this.vcNomPaqAmp));
                }
            }
        }
    });
    if ($("#ddlEditPaquetes option").length == 0) {
        $("#ddlEditPaquetes").append($("<option></option>").text("No hay paquetes").val(-2));
    }

    $("#dvEditarServicioAmpliacion").dialog({
        title: "Editar paquete: " + NombrePaquete,
        modal: true,
        resizable: false,
        buttons: [
            {
                text: "Aceptar", click: function () {
                    var rowId = $("#hdfEditPaqueteAmp").val();
                    var vOption = $("#ddlEditPaquetes option[value='" + $("#ddlEditPaquetes").val() + "']");
                    DatosEdicion = {
                        btEditado: '1',
                        vcCantEdit: $("#ddlEditPaquetes").val() + " " + vOption.attr("medida"),
                        vcCantRealEdit: $("#ddlEditPaquetes").val(),
                        dcCostoEdit: FormatoNumero(vOption.attr("costo"), oCulturaLocal),
                        dcCostoEditReal: vOption.attr("costo"),
                        vcNomPaqAmp: vOption.attr("vcNomPaqAmp"),
                        inIdPaqAmpProc: vOption.attr("idPaqAmp")
                    };
                    $("#tbServAmpliacionEdit").jqGrid('setRowData', rowId, DatosEdicion);
                    $("#dvEditarServicioAmpliacion").dialog("close");
                    fnActualizarMontoTotalAmpliacion();
                    $(this).dialog("close");
                }
            },
            {
                text: "Cancelar", click: function () {
                    $(this).dialog("close");
                }
            }
        ]
    });
}
function CerroMensaje() {
    window.parent.tab.tabs("remove", indiceTab);
}

function PaginaSinAcciones() {
    DeshPag = true;
    //$("#ddlEstadoSolicitud").attr("disabled", true);
    $("#ddlTipoMonto").attr("disabled", true);
    $("#txtMonto").attr("disabled", true);

    $("#ddlFinanciamiento").attr("disabled", true);
    $("#bqPplCuenta_txtValorBusqueda").attr("disabled", true);
    $("#bqPplCuenta_imgBusqueda").hide();

    $("#txtMesesCuotas").attr("disabled", true);
    $("#txtPeriodoGracia").attr("disabled", true);
    $("#chkAsignarA").attr("disabled", true);
    //$("#bpTecnicoAsignado
    $("#txtFechaAprobacion").attr("disabled", true);
    //$("#txtDescSol").attr("disabled", true);
    activarKendoEditor(false);
    $("#txtNomEmpleado").attr("disabled", true);
    $("#txtModeloSolicitado").attr("disabled", true);
    $("#ddlModeloEquipoNuevo").attr("disabled", true);
    //$("#btnBuscarIMEI").attr("disabled", true);
    $("#txtNumCelular").attr("disabled", true);
    $("#ddlNumero").attr("disabled", true);
    $("#txtModeloEquipoAnt").attr("disabled", true);
    $("#txtIMEIEquipoAnt").attr("disabled", true);
    $("#ddlMotivoReposicion").attr("disabled", true);
    $("#txtObservacion").attr("disabled", true);
    $("#txtFecha").attr("disabled", true);
    //ocultar para cambio
    $("#trModEquipoNue").hide();
    $("#trIMEIEquipoNue").hide();
    //ocultar para reparación
    $("#trAsignarEquiTemp").hide();

    //DESACTIVAR PARA TECNICOS SIN PERMISOS
    $("#btnBuscarIMEI").button("option", "disabled", true);
    $("#txtIMEIElegido").attr("disabled", true);
    $("#txtIMEIEnt").attr("disabled", true);
    $("#imgBorrarFechaEntrega").hide();
    //DESACTIVAR PARA CULMINADA
    $("#txtModeloAsignado").attr("disabled", true);
    $("#txtIMEIAsignado").attr("disabled", true);
    $("#txtPlanAsignado").attr("disabled", true);
    $("#txtLineaAsignada").attr("disabled", true);
    $("#txtPlanAmpInicial").attr("disabled", true);
    $("#txtPlanSolicitado").attr("disabled", true);
    $("#txtPlanActualLinea").attr("disabled", true);
    $("#txtPlanAmpSolicitado").attr("disabled", true);
    $("#txtMontoTotalServAmp").attr("disabled", true);
    $("ddlTipoMonto").attr("disabled", true);
    $("#trIMEIEquipoEnt").hide();
    $("#trTipoMonto").hide();
    //ARCHIVOS ADJUNTOS
    ArchivosAdjunto(CapturaDatos['DocAdjuntos'].btAct, "0", CapturaDatos['DocAdjuntos'].btCapObl);
}

function fnMostrarTecnico(valor) {
    TecnicoAsignado = valor;
}

function ocultarParaEstadoAprobacion() {
    $("#ddlNumero").hide();
}
function numeroAdjuntos(totalAdj) {
    $("#hdfNumAdjuntos").val(totalAdj);
    if (totalAdj == "0") {
        $("#lblArchivosAdjuntos").text('No se ha cargado ningún archivo.');
    } else if (totalAdj == "1") {
        $("#lblArchivosAdjuntos").text('1 archivo adjunto.');
    } else {
        $("#lblArchivosAdjuntos").text(totalAdj + ' archivos adjuntos.');
    }
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


function ValidaFormularioPrevio() {
    var inNumeroCuotas;
    var inMesesPeriodoGracia = parseInt($("#txtPeriodoGracia").val());
    if (CapturaDatos['Mensaje'].btAct == "1") {
        descSolicitud = $("#txtDescSol").data("kendoEditor").value().replace(/'/g, "&#39").replace(/\\/g, "&#92");
    }

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

    if (inNumeroCuotas == "") {
        alerta("El número de cuotas es requerido.", null, null, "warning");
        $("#txtMesesCuotas").focus();
        return false;
    }
    if ($("#txtMonto").val() == "") {
        alerta("El monto fijo es requerido.", null, null, "warning");
        $("#txtMonto").focus();
        return false;
    }
    if (inNumeroCuotas != "0" && NumMinCuo != "0" && NumMaxCuo != "0") {
        if (inNumeroCuotas < NumMinCuo || inNumeroCuotas > NumMaxCuo) {
            alerta("El número de cuotas debe estar contenido en el rango especificado.", null, null, "warning");
            $("#txtMesesCuotas").focus();
            return false;
        }
    }
    if ($("#txtPeriodoGracia").val() == "") {
        alerta("El número de meses del periodo de gracia es requerido.", null, null, "warning");
        $("#txtPeriodoGracia").focus();
        return false;
    }
    if (MinPerGra != "0" && MaxPerGra != "0") {
        if (inMesesPeriodoGracia < MinPerGra || inMesesPeriodoGracia > MaxPerGra) {
            alerta("El número de meses del periodo de gracia debe estar contenido en el rango especificado.", null, null, "warning");
            $("#txtPeriodoGracia").focus();
            return false;
        }
    }

    if ($("#hdfEstado").val() == "6" && $("#hdfEstado_Apr").val() == "32") { //Solicitud en estado Pendiente - Pendiente
        if (CapturaDatos['DocAdjuntos'].btAct == "1" && CapturaDatos['DocAdjuntos'].btCapObl == "1" && $("#hdfNumAdjuntos").val() == "0") {
            alerta("El ingreso de adjuntos es obligatorio, ingrese por lo menos un archivo adjunto.", null, null, "warning");
            return false;
        }

        if (AccionBotonGuardar != 'Procesar' && CapturaDatos['Mensaje'].btAct == "1" && CapturaDatos['Mensaje'].btCapObl == "1" && numPalabrasDescrip < CapturaDatos["Mensaje"].inTamano_Msj) {
            alerta("La descripción de la solicitud es obligatoria, ingrese por lo menos " + CapturaDatos["Mensaje"].inTamano_Msj.toString() + " " + (CapturaDatos["Mensaje"].vcTamTip_Msj == 'w' ? 'palabras' : 'caracteres').toString() + ".", null, null, "warning");
            return false;
        }
    }

    return true;
}

function ValidaFormularioProcesar() {
    inTipSol = $("#hdfTipSol").val();

    if ($.trim($("#txtFecha").val()) == "" && $("#hdfCodEstado").val() == 8 && (inTipSol != 6 && inTipSol != 7)) {
        ControlFocusAlerta = 'FechaEntrega';
        alerta("La Fecha de Entrega es requerida.", "Mensaje", fnGoFocusControl, "warning");
        return false;
    }

    if ($("#hdfValidacion").val() != "" && $("#chkAsignarEquiTemp").is(":checked")) {
        alerta($("#hdfValidacion").val(), null, null, "warning");
        return false;
    }

    return true;
}

function ValidaFormularioPorTipoSolicitud(inTipSol) {
    var CodIMEI = '';
    var inNumeroCuotas;
    var inMesesPeriodoGracia = parseInt($("#txtPeriodoGracia").val());
    var dcLimiteCredito = $.trim($("#txtLimiteCredito").val()) == '' ? 0 : $.trim($("#txtLimiteCredito").val());

    if ($("#hdfMesesCuotas").val() == '') {
        inNumeroCuotas = $("#txtMesesCuotas").val();
        vcMesesCuotas = '';
    } else {
        inNumeroCuotas = $("#hdfMesesCuotas").val().split(",").length;
        vcMesesCuotas = $("#hdfMesesCuotas").val();
    }

    if ($("#txtIMEIElegido").val() == '' || $("#txtIMEIElegido").val() == undefined || $("#txtIMEIElegido").val() == null) {
        CodIMEI = '';
    } else {

        CodIMEI = $("#txtIMEIElegido").val();
    }

    if (inTipSol == 2) {

        if ($("#txtMsgNumero").val() != "") {

            codNumLim = $("#txtMsgNumero").val();
        } else {
            codNumLim = "";
        }

        var i = 0;
        for (i = 0; i < arrDispositivo.length; i++) {

            if (arrDispositivo[i]['P_vcCodIMEI'] == $("#txtIMEIElegido").val()) {

                if (arrDispositivo[i]['dipsSopLin'] == "true" && (codNumLim == null || codNumLim == "")) {
                    alerta('El dispositivo requiere de una línea válida.', null, null, "warning");
                    return;
                }
                if ($("#txtPlanSolicitado").val() != '' && arrDispositivo[i]['dispSopLin'] == "false") {
                    //solicutud de equipo con linea && dispositivo seleccionado no soporta linea
                    alerta('El dispositivo seleccionado no soporta línea', null, null, "warning");
                    return;
                }
            }
        }
    }
    else if (inTipSol == 6 || inTipSol == 7) {
        codNumLim = $("#txtNumCelular").val();
        CodIMEI = $("#txtIMEIEquipoAnt").val();

    }
    else if (inTipSol == 4) { //Reparación
        if ($("#txtIMEIEnt").val() == "") {
            alerta("Debe ingresar el IMEI del equipo a entregar", null, null, "warning");
            return;
        }
        CodIMEI = $("#txtIMEIEnt").val();
    }
    else {
        codNumLim = "";
    }
    if ($("#txtPlanSolicitado").val() != '') {
        if (codNumLim == '' && inTipSol == 2) {
            alerta("Seleccione un dispositivo/línea", "Mensaje", function () {
                $("#txtMsgNumero").focus();
            }, "warning");
            return;
        }
    }

    if (CodIMEI == '' && (inTipSol == 1 || inTipSol == 2 || inTipSol == 3)) {
        ControlFocusAlerta = 'BuscarDispositivo';
        alerta("Seleccione un dispositivo", "Mensaje", fnGoFocusControl, "warning");
        return;
    }

    if (inTipSol == 4 && $("#chkAsignarEquiTemp").is(":checked") && CodIMEI == '') {
        alerta('Debe seleccionar un dispositivo si ha selecionado la opción "Asignar equipo temporal"', null, null, "warning");
        return;
    }

    if (inTipSol == 4) {
        if ($("#chkEquiConLinea").is(":checked")) {
            codNumLim = $("#txtNumeroEquiTemp").val();
        } else {
            codNumLim = '';
        }
    }

    var dcLimiteCredito = $.trim($("#txtLimiteCredito").val()) == '' ? 0 : $.trim($("#txtLimiteCredito").val());

    var inCodPlan = '0';

    //validaciones por tipo
    var validacionPorTipo = true;
    var tituloValid = '';
    var mensajeValid = '';
    var XMLDetallePaqAmp = '';
    var DetalleServicios = '';
    //AMPLIACION
    if (inTipSol == 7) { //solicidut de ampliacion
        //planes
        if ($("#hdfPlaSol").val() != '' && $("#hdfPlaSol").val() != '0') {
            inCodPlan = $("#hdfPlaSol").val();
        } else {

            var selServProc = $("#tbServAmpliacionEdit").jqGrid('getGridParam', 'selarrrow');
            var ServSol = $("#tbServAmpliacionEdit").jqGrid('getGridParam', 'records');

            //Validar cantidad de detalles mayor a cero
            if (selServProc.length == 0) { //no se procesan todos los servicios solicitados
                alerta("Debe seleccionar por lo menos un paquete para poder procesar la solicitud.", null, null, "warning");
                return;
            }

            //vailidar seleccion de paquetes a procesar
            if (selServProc.length != ServSol) { //no se procesan todos los servicios solicitados
                validacionPorTipo = false;
                tituloValid = 'Selección De Paquetes';
                mensajeValid = 'No ha seleccionado todos los detalles de ampliación, solo se procesarán los que hayan sido seleccionados. ¿Desea continuar?';
            }

            //XML DE PAQUETES SELECCIONADOS
            XMLDetallePaqAmp = '<?xml version="1.0" encoding="iso-8859-1"?><Paquetes>';
            var i = 0;
            for (i = 0; i < selServProc.length; i++) {
                var dataPaquete = $("#tbServAmpliacionEdit").getRowData(selServProc[i]);
                var F_inCodSol = $("#hdfCodSol").val();
                var F_inCodTipSer;
                var F_inCodSer;
                if (dataPaquete.P_inCod != dataPaquete.inTipoServ) {
                    F_inCodSer = dataPaquete.P_inCod;
                    F_inCodTipSer = 0;
                } else {
                    F_inCodSer = 0;
                    F_inCodTipSer = dataPaquete.P_inCod;
                }
                var inCant = dataPaquete.vcCantReal;
                var dcCost = dataPaquete.dcCostoReal;
                var btProcesado = "1";
                var btEditado = dataPaquete.btEditado;
                var inCantProc;
                var dcCostProc;
                if (btEditado == "1") {
                    inCantProc = dataPaquete.vcCantRealEdit;
                    dcCostProc = dataPaquete.dcCostoEditReal;
                } else {
                    inCantProc = 0;
                    dcCostProc = 0;
                }
                var idPaqAmpProc = dataPaquete.inIdPaqAmpProc;

                XMLDetallePaqAmp += "<Detalle><F_inCodSol>" + F_inCodSol + "</F_inCodSol>"
                    + "<F_inCodSol>" + F_inCodSol + "</F_inCodSol>"
                    + "<F_inCodTipSer>" + F_inCodTipSer + "</F_inCodTipSer>"
                    + "<F_inCodSer>" + F_inCodSer + "</F_inCodSer>"
                    + "<inCant>" + inCant + "</inCant>"
                    + "<dcCost>" + dcCost + "</dcCost>"
                    + "<btProcesado>" + btProcesado + "</btProcesado>"
                    + "<inCantProc>" + inCantProc + "</inCantProc>"
                    + "<dcCostProc>" + dcCostProc + "</dcCostProc>"
                    + "<btEditado>" + btEditado + "</btEditado>"
                    + "<F_inCodPaqAmpProc>" + idPaqAmpProc + "</F_inCodPaqAmpProc></Detalle>";

            }
            XMLDetallePaqAmp += '</Paquetes>';
        }
    }
    else if (inTipSol == 2) { //solicitud de nuevo equipo
        //planes
        inCodPlan = $("#hdfPlanProcesar").val();
        var inCantServAgregados = 0;
        //servicios
        if (!btServLineaEdit) //no se ha actualizado los servicios de las lineas
        {
            XMLDetallePaqAmp = '';
        } else {
            inCantServAgregados = ServiciosLinSel.length;
            if (inCantServAgregados > 0) {
                XMLDetallePaqAmp = '<?xml version="1.0" encoding="iso-8859-1"?><ROOT>';
                $.each(ServiciosLinSel, function () {
                    var oServicio = this;
                    if (oServicio.inCodTipDat == 1) {
                        XMLDetallePaqAmp += '<Serv inTipSer="-1" inSer="' + oServicio.P_inCod.toString() + '" ';
                    }
                    else {
                        XMLDetallePaqAmp += '<Serv inTipSer="' + oServicio.P_inCod.toString() + '" inSer="-1" ';
                    }
                    XMLDetallePaqAmp += 'dcCan="' + oServicio.dcCan.toString() + '" dcMon="' + oServicio.dcMon.toString() + '" inTipAsig="' + oServicio.inTipAsig.toString() + '" />';
                });
                XMLDetallePaqAmp += '</ROOT>';
            }
        }

        if (codNumLim == '') { //valida si se seleccionó o no una línea
            ControlFocusAlerta = 'BuscarLinea';
            alerta("Debe seleccionar una línea para poder procesar la solicitud.", "Mensaje", fnGoFocusControl, "warning");
            return;
        }

        //console.log("inIdTipoAsigCred:" + inIdTipoAsigCred + ", codNumLim:" + codNumLim + ", inCodPlan:" + inCodPlan);
        if ((inIdTipoAsigCred == 1 || inIdTipoAsigCred == 0) && codNumLim != '' && (inCodPlan == '-1' || inCodPlan == '0')) { //validar si existe plan para la linea seleccionada (tipo planes)
            ControlFocusAlerta = 'BuscarLinea';
            alerta("La línea seleccionada no tienen un plan asignado, seleccione un plan para poder procesar la solictud.", "Mensaje", fnGoFocusControl, "warning");
            return;
        }
        if (inIdTipoAsigCred == 2 && codNumLim != '' && inCantServLinea == 0 && inCantServAgregados == 0) { //validar la cantidad de servicios de la linea (tipo bolsa)
            ControlFocusAlerta = 'BuscarLinea';
            alerta("La línea seleccionada no cuenta con ningún servicio, agregue por lo menos un servicio para poder procesar la solicitud.", "Mensaje", fnGoFocusControl, "warning");
            return;
        }
    }

    return {
        CodIMEI,
        inCodPlan,
        dcMonto,
        inNumeroCuotas,
        MesesContratoFactLInea,
        MontoFactLinea,
        XMLDetallePaqAmp,
        inMesesPeriodoGracia,
        dcLimiteCredito
    }
}

function fnProcesarSolicitud(vcCodIMEI, inCodSol, inTipSol, inEstSol, codNumLim, dtFecEnt, vcObs, inCodPlan, dcMonto, inNumeroCuotas, mesesContratoLinea,
    montoLinea, XMLDetallePaqAmp, inMesesPeriodoGracia, dcLimiteCredito) {
    //debugger;
    dcLimiteCredito = dcLimiteCredito == '' ? -1 : dcLimiteCredito;
    var vcModelo = $("#ddlModeloEquipoNuevo option:selected").text();
    if (inTipSol == 4) {
        vcModelo = $("#txtModeloEquipoAnt").val();
    }
    var vcTipoMonto;
    if ($("#ddlTipoMonto").val() == null) {
        vcTipoMonto = "";
    } else {
        vcTipoMonto = $("#ddlTipoMonto").val();
    }

    $("#dvComentProcesar").dialog({
        title: "Cerrar ticket",
        modal: true,
        width: 500,
        buttons: {
            "Cerrar ticket": function () {
                if ($.trim($("#txtComentProcesar").val()) == "") {
                    alerta("Debe ingresar algún comentario", "Solicitud", null, "warning");
                    return;
                }
                BloquearPagina(true);

                var vcAdjuntos = "";
                $(".VARBINARY").each(function (i) {
                    var vcNomCon = $(this).attr("obj");
                    if ($(this).hasClass("imgButton")) { //habilitado
                        if ($(this).attr("oblig") == "True" && $('#file_' + vcNomCon).text() == "") {
                            vcVacio = "1";
                        } else {

                            if (this.value != "") {
                                vcAdjuntos += "[" + $(this).attr("obj") + "],";
                                vcAdjuntos += $('#file_' + vcNomCon).text() + ";";
                            }
                            else {
                                vcAdjuntos += "[" + $(this).attr("obj") + "],";
                                vcAdjuntos += ";";
                            }
                        }
                    }
                });
                var vcColor = $("#txtColor").val().replace(/'/g, "&#39").replace(/\\/g, "&#92");
                var ddlSeguro = $("#ddlSeguro").val();

                var AccionEquipo = "";
                var AccionCuenta = "";
                var AccionPlan = "";
                var CambioEquipo_Cuenta = "";
                var CambioEquipo_Plan = "";

                if (inTipSol == "1") { //Cambio...
                    AccionEquipo = $("#cboAccionEquipo").val();
                    AccionCuenta = $("#cboAccionCuenta").val();
                    AccionPlan = $("#cboAccionPlan").val();
                    CambioEquipo_Cuenta = CuentaSeleccionada;
                    CambioEquipo_Plan = PlanSeleccionado;
                }

                const tipoCierreSolicitud = $('#ddlTipoCierreSolicitud').val();

                //debugger;

                if (tipoCierreSolicitud === "1") {

                    if (!ValidaFormularioPrevio()) {
                        return;
                    }
                    
                    if (!ValidaFormularioProcesar()) {
                        return;
                    }

                    const data = ValidaFormularioPorTipoSolicitud();

                    if (!data) {
                        return;
                    }

                    CodIMEI = data.CodIMEI.replace(/'/g, "&#39")
                    inCodPlan = data.inCodPlan;
                    dcMonto = data.dcMonto;
                    inNumeroCuotas = data.inNumeroCuotas;
                    mesesContratoLinea = data.MesesContratoFactLInea;
                    montoLinea = data.MontoFactLinea;
                    XMLDetallePaqAmp = data.XMLDetallePaqAmp;
                    inMesesPeriodoGracia = data.inMesesPeriodoGracia;
                    dcLimiteCredito = data.dcLimiteCredito;

                    $.ajax({
                        type: "POST",
                        async: false,
                        url: "Adm_ProcesarSolicitud.aspx/ProcesarSolicitud",
                        data: "{'vcCodIMEI': '" + vcCodIMEI + "'," +
                            "'inCodSol': '" + inCodSol + "'," +
                            "'inTipSol': '" + inTipSol + "'," +
                            "'inEstSol': '" + inEstSol + "'," +
                            "'codNumLim': '" + codNumLim + "'," +
                            "'dtFecEnt': '" + dtFecEnt + "'," +
                            "'vcObs': '" + $.trim($("#txtComentProcesar").val()) + "'," +
                            "'inCodPlan': '" + inCodPlan + "'," +
                            "'dcMonto': '" + dcMonto + "'," +
                            "'inNumeroCuotas': '" + inNumeroCuotas + "'," +
                            "'mesesContratoLinea': '" + mesesContratoLinea + "'," + //meses de contrato de la linea
                            "'montoLinea': '" + montoLinea + "'," + //monto del plan de la linea
                            "'XMLDetallePaqAmp': '" + XMLDetallePaqAmp + "'," + //detalle de los paquetes de ampliacion
                            "'vcTipoMonto': '" + vcTipoMonto + "'," + //tipo monto(empleado,empresa)
                            "'inMesesPeriodoGracia': '" + inMesesPeriodoGracia + "'," +
                            "'vcModeloSolicitado': '" + vcModelo + "'," +
                            "'vcCodCtaInicial': '" + CuentaSeleccionada + "'," +
                            "'vcAdjuntos': '" + vcAdjuntos + "'," +
                            "'vcColor': '" + vcColor + "'," +
                            "'Seguro': '" + ddlSeguro + "'," +
                            "'dcLimiteCredito': '" + dcLimiteCredito + "'," +
                            "'AccionEquipo': '" + AccionEquipo + "'," +
                            "'AccionCuenta': '" + AccionCuenta + "'," +
                            "'AccionPlan': '" + AccionPlan + "'," +
                            "'CambioEquipo_Cuenta': '" + CambioEquipo_Cuenta + "'," +
                            "'CambioEquipo_Plan': '" + CambioEquipo_Plan + "'," +
                            "'IdFinanciamiento': '" + $("#ddlFinanciamiento").val() + "'," +
                            "'IdTipoCierreSolicitud': '" + tipoCierreSolicitud + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (msg) {
                            try {
                                var msgResultado;
                                window.parent.ActualizarGrilla();
                                SolicitudModificada_EnviarMensaje("", "", "");
                                if (msg.d == '') {
                                    indiceTab = window.parent.tab.tabs("option", "selected");
                                    Mensaje("<br/><h1>Solicitud cerrada</h1><br/>", document, CerroMensaje);
                                } else {
                                    alerta(msg.d, null, null, "warning");
                                    BloquearPagina(false);
                                }
                            } catch (e) {
                            }

                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        }
                    });
                } else {

                    let AccionBotonEliminar = $("#lblBtnEliminar").text();
                    let EstInicial = "8"; //EnProceso
                    let EstFinal = "9"; //Anulada
                    let inMesesPeriodoGracia = parseInt($("#txtPeriodoGracia").val());
                    let NumeroCuota = '';

                    if ($("#hdfMesesCuotas").val() == '') {
                        NumeroCuota = $("#txtMesesCuotas").val();
                        vcMesesCuotas = '';
                    } else {
                        NumeroCuota = $("#hdfMesesCuotas").val().split(",").length;
                        vcMesesCuotas = $("#hdfMesesCuotas").val();
                    }
                    let Monto = $("#txtMonto").val();
                    //if (AccionBotonEliminar == 'Anular') {
                    let AccionAnular = 'Anular';
                    if ($("#hdfIngAlm").val() == '1') {
                        $("#trAccionIngresoAlmacen").show();
                    }

                    let dataAnular = {
                        vcCodEmp: $("#hdfCodEmp").val(),
                        vcAdmin: $("#hdfAdmin").val(),
                        inCodSol: $("#hdfCodSol").val(),
                        inCodTipSol: $("#hdfCodTipSol").val(),
                        inEstInicial: EstInicial,
                        inEstFinal: EstFinal
                        , vcValAnt: ''
                        , vcUpdPer: ''
                        , vcAdjuntos: ''
                        , vcColor: ''
                        , Seguro: ''
                        , biFraccionamiento: '0'
                        , inNumeroCuotas: NumeroCuota
                        , dcMonto: Monto
                        , vcTabla: $("#hdfTabla").val()
                        , accion: AccionAnular
                        , vcMesesCuotas: vcMesesCuotas
                        , inMesesPeriodoGracia: inMesesPeriodoGracia
                        , vcComentario: $.trim($("#txtComentProcesar").val())
                        , vcDesSol: $.trim($("#txtDescSol").val())
                        , IdFinanciamiento: $("#ddlFinanciamiento").val()
                        , IdTipoCierreSolicitud: $("#ddlTipoCierreSolicitud").val()
                    };

                    AnularSolicitud(dataAnular);
                    //return;

                }

                
                $(this).dialog("close");
            },
            //"Cancelar": function () {
            //    $(this).dialog("close");
            //}
        }
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
                    if ($("#hdfLicencia").val() == 'BASIC' || $("#hdfLicencia").val() == 'STANDARD') {
                        //$("#ddlTipoMonto").val('CIA');
                        $("#ddlTipoMonto").attr("disabled", true);
                    } else {
                        $("#ddlTipoMonto").val(ValDefault);
                    }
                    $("#lblTipoMontoDesc").text($("#ddlTipoMonto option[value= '" + $("#ddlTipoMonto").val() + "']").attr("desc"));
                    break;
                default:
                    alerta("Datos incorrectos al listar parametros", null, null, "warning");
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnListarPlanes(inCodOpe, idPlanSel) {
    if (inCodOpe == null || inCodOpe == "") {
        inCodOpe = $("#ddlOperador").val();
        if (inCodOpe == null) {
            inCodOpe = $("#hdfOperadorDefault").val();
        }
        if (inCodOpe == null || inCodOpe == "") {
            inCodOpe = $("#hdfOperador").val();
        }
    }
    if (inCodOpe == null || inCodOpe == "") {
        inCodOpe = -1;
    }

    $.ajax({
        type: "POST",
        url: "Adm_ProcesarSolicitud.aspx/ListarPlanesSeleccion",
        data: "{'inCodOpe':'" + inCodOpe + "', 'inCodMod':'" + $("#ddlModeloEquipoNuevo").val() + "', 'inTipLin':'1'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#ddlPlan").html("");
            if ($(result.d).length > 0) {
                $("#ddlPlan").append($("<option></option>").attr("value", -1).text("Seleccione..."));
                $(result.d).each(function () {
                    $("#ddlPlan").append($("<option></option>").attr("value", this.P_inCod).text(this.vcNom).attr("dcMon", this.dcMon));
                });
                if (idPlanSel != '' && idPlanSel != 0 && idPlanSel != -1 && idPlanSel != -2 && idPlanSel != undefined) {
                    $("#ddlPlan").val(idPlanSel);
                }
            }
            else {
                $("#ddlPlan").append($("<option></option>").attr("value", -2).text("Sin datos"));
            }

            $("#ddlPlan").select2();
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function AbrirLineaServicio(vcNumLinea, vcCodCta, vcAsigCred, vcServicios, Accion) {
    var vcServ = "";
    vServiciosLinea = vcServicios;
    var $Pagina = '../Mantenimiento/Mnt_LineaServicio.aspx?vcLinea=' + vcNumLinea + "&vcCodCta=" + vcCodCta + "&vcTipAsiCre=" + vcAsigCred + "&vcLinSer=" + vcServ + "&vcAccion=" + Accion + "&vcTipoPag=" + 'Solicitud' + "&inCodSol=" + $("#hdfCodSol").val();
    $("#ifLineaServicio").width(580);
    $("#ifLineaServicio").height(270);
    $("#ifLineaServicio").attr("src", $Pagina);
    btServLineaEdit = true;
}

function fnEscribirMonto() {
    $("#txtMonto").val($("#lblMontoSugerido").text());
}

function fnMostrarPrecio(CodigoModelo, CodigoOperador, TipoPrecio) {
    $("#tdMontoSugerido").show();
    $("#tdMontoSugeridoMensaje").show();
    $.ajax({
        type: "POST",
        url: "Adm_ProcesarSolicitud.aspx/PrecioModeloXOperador",
        data: JSON.stringify({
            CodigoModelo: CodigoModelo,
            CodigoOperador: CodigoOperador,
            TipoPrecio: TipoPrecio
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //$("#lblMontoSugerido").text(result.d);
            $("#lblMontoSugerido").text(FormatoNumero(result.d, oCulturaLocal));
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnGoFocusControl() {
    switch (ControlFocusAlerta) {
        case "BuscarLinea":
            $("#btnBuscarLinea").click();
            break;
        case "FechaEntrega":
            $("#txtFecha").focus();
            break;
        case "BuscarDispositivo":
            $("#btnBuscarIMEI").click();
            break;
        default:
    }
}




function SaveToDisk(fileURL, fileName) {
    // for non-IE
    try {
        if (!window.ActiveXObject) {
            var save = document.createElement('a');
            save.href = fileURL;
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
            var _window = window.open(fileURL, "_blank");
            _window.document.close();
            _window.document.execCommand('SaveAs', true, fileName || fileURL);
            _window.close();
        }
    } catch (e) {
    }
}


function fnMostrarCuenta(valor) {
    CuentaSeleccionada = valor;
    $("#bqCambioEquipo_Plan_txtValorBusqueda").val("");
    PlanSeleccionado = "";
    ActualizarCondicionPlan();
    //if (valor == "") {
    //    CondicionJQuery_CambioEquipoPlan = "";
    //}
    //else {
    //    //CondicionJQuery_CambioEquipoPlan = " MOV_Plan.TipoServicio IN (select TipoServicio from MOV_Cuenta where P_vcCod = |" + valor + "|) ";
    //    if ($("#ddlModeloEquipoNuevo").val() != "") {
    //        CondicionJQuery_CambioEquipoPlan += " and MOV_Plan.[P_inCod] IN (SELECT F_inCodPla FROM MOV_PlanModeloDispositivo WHERE F_inCodMod = " + $("#ddlModeloEquipoNuevo").val() + ")";
    //    }
    //}
}

function fnMostrarPlan(valor) {
    //alert(valor);
    PlanSeleccionado = valor;
    //bqCambioEquipo_Plan_txtValorBusqueda
}

function CargarAccionesSolicitudCambio() {

    $("#cboAccionCuenta").change(function () {
        switch ($("#cboAccionCuenta").val()) {
            case "Mantener":
                $("#dvCambioEquipo_Cuenta").hide();
                $("#cboAccionPlan").val('Mantener');
                $("#cboAccionPlan").prop('disabled', false);
                break;
            case "Cambiar":
                $("#dvCambioEquipo_Cuenta").show();
                $("#cboAccionPlan").val('Cambiar');
                $("#cboAccionPlan").prop('disabled', true);
                break;
            case "Liberar":
                $("#dvCambioEquipo_Cuenta").hide();
                $("#cboAccionPlan").val('Liberar');
                $("#cboAccionPlan").prop('disabled', true);
                break;
            default:
        }
        $("#cboAccionPlan").change();

    });

    $("#cboAccionPlan").change(function () {
        switch ($("#cboAccionPlan").val()) {
            case "Mantener":
                $("#dvCambioEquipo_Plan").hide();

                break;
            case "Cambiar":
                $("#dvCambioEquipo_Plan").show();
                break;
            case "Liberar":
                $("#dvCambioEquipo_Plan").hide();
                break;
            default:

        }

    });

}

function ActualizarCondicionPlan() {
    var IdModelo = "";
    if ($("#ddlModeloEquipoNuevo").val() == null || $("#ddlModeloEquipoNuevo").val() == -1) {
        IdModelo = IdModeloSolicitado;
    }
    else {
        IdModelo = $("#ddlModeloEquipoNuevo").val();
    }

    CondicionJQuery_CambioEquipoPlan = " MOV_Plan.[P_inCod] IN (SELECT F_inCodPla FROM MOV_PlanModeloDispositivo WHERE F_inCodMod = " + IdModelo + ")";
    if (CuentaSeleccionada != '') {
        CondicionJQuery_CambioEquipoPlan += " and MOV_Plan.TipoServicio IN (select TipoServicio from MOV_Cuenta where P_vcCod = |" + CuentaSeleccionada + "|) ";
    }
}

function ActualizarCondicionCuenta() {
    var IdModelo = "";
    if ($("#ddlModeloEquipoNuevo").val() == null || $("#ddlModeloEquipoNuevo").val() == -1) {
        IdModelo = IdModeloSolicitado;
    }
    else {
        IdModelo = $("#ddlModeloEquipoNuevo").val();
    }

    CondicionJQuery_CambioEquipoCuenta = "  MOV_Cuenta.TipoServicio IN ( Select IdTipoModeloDispositivo from MOV_ModeloDispositivo MD ";
    CondicionJQuery_CambioEquipoCuenta += " inner join MOV_TipoServicio TS ON MD.F_inCodTipSer = TS.P_inCodTipSer ";
    CondicionJQuery_CambioEquipoCuenta += " WHERE MD.P_inCod = " + IdModelo + ")";
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

