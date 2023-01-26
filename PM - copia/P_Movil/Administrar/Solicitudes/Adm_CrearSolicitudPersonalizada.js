var oCulturaUsuario;
var dcIGV;
var tbFinanciamiento;
//carpeta de dominio
var CarpetaDominio = '';

var CondicionJQuery_SeleccionLineaTipoServicio = '';
var CondicionJQuery_SeleccionCuentaTipoServicio = '';
var CondicionJQuery_SeleccionLineaTipoServicioPlan = '';
var inNoVolverAPasar = 0;

$(function () {
    
    CarpetaDominio = window.top.$("#hdfCodigoDominio").val() != '' ? '/' + window.top.$("#hdfCodigoDominio").val() : '';

    oCulturaUsuario = window.parent.parent.parent.oCulturaUsuario;

    //$(".VARCHAR").keypress(ValidarCadena);
    $(".VARCHAR").keypress(ValidarAlfaNumericoConEspaciosYCaracteres); //agregado 17/07/2014 wapumayta (tfs 1396)
    $(".INT").keypress(ValidarEntero);
    $(".DECIMAL").keypress(ValidarDecimal);
    $(".PERIODO").keypress(ValidarFecha);
    $(".DATE").keypress(ValidarFecha);
    $(".DATETIME").keypress(ValidarFechaHora);
    $("#txtMesesCuotas").keypress(ValidarEntero);
    $("#txtPeriodoGracia").keypress(ValidarDecimal);

    //if ($("#hdfCodTipSol").val() == "29" || $("#hdfCodTipSol").val() == "30") {
    //    dcIGV = $("#hdfIGV").val();

    //    //actualizar en versión 3.1 (2)
    //    if (dcIGV != "0") {
    //        $("#txt_IGV").css("background-color", "#F0F0F0");
    //        $("#txt_ImporteTotal").css("background-color", "#F0F0F0");
    //    }

    //    ValidarNumeroEnCajaTexto("txt_ImporteBase", ValidarDecimalPositivo, oCulturaUsuario);
    //    ValidarNumeroEnCajaTexto("txt_IGV", ValidarDecimalPositivo, oCulturaUsuario);
    //    ValidarNumeroEnCajaTexto("txt_ImporteTotal", ValidarDecimalPositivo, oCulturaUsuario);

    //    $("#txt_ImporteBase").val(FormatoNumero(0, oCulturaUsuario));
    //    $("#txt_IGV").val(FormatoNumero(0, oCulturaUsuario));
    //    $("#txt_ImporteTotal").val(FormatoNumero(0, oCulturaUsuario));

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
    //    if ($("#hdfCodTipSol").val() == "29") {
    //        $("#bp_MOV_Dispositivo_IMEI_grid").hideCol("vcNomEmp")
    //    }

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

    $(".DATETIME").AnyTime_picker({ format: "%d/%m/%Y %H:%i:%s",
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

    $(".DATE").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });

    $(".DATE,.DATETIME").keydown(function (e) {
        if (e.keyCode == 8 || e.keyCode == 46) {
            return false;
        }
    });


    //Valoes de campos tipo dato Referencia
    $(".REFERENCIA").each(function (i) {
        if ($(this).attr("id").substring(0, 3) == "bp_") {
            var vcNomFuncion = "fnBuscarDesdeTxtValorBusqueda_" + $(this).attr("id");
            var vcNomVariable1 = "cargarGrilla_" + $(this).attr("id");
            var vcNomVariable2 = "HayDefaultValueEnLoad_" + $(this).attr("id");
            if (vcNomFuncion.substring(vcNomFuncion.length - 17) == "_txtValorBusqueda") {
                window[vcNomVariable1.substring(0, vcNomVariable1.length - 17)] = "1";
                window[vcNomVariable2.substring(0, vcNomVariable2.length - 17)] = "1";
                window[vcNomFuncion.substring(0, vcNomFuncion.length - 17)]();
            }
        }
    });

    //Limpiar fecha
    $(".imgBtn").live("click", function () {
        var controlId = $(this).attr("controlLimpiar");
        $("#" + controlId).val("");
    });

    $(".VARBINARY").each(function (i) {
        var vcNomCon = $(this).attr("obj");
        var vcTipExt = $(this).attr("vcTipExt").toLowerCase();

        if ($(this).hasClass("imgButton")) {
            new AjaxUpload('#upl_' + vcNomCon, {
                action: CarpetaDominio == '' ? 'UploadHandler.ashx?dominio=-1' : 'UploadHandler.ashx?dominio=' + CarpetaDominio,
                accept: vcTipExt,
                onComplete: function (file, response) {

                    //alert(response);
                    if (response != "") {

                        $('#file_' + vcNomCon).html("");
                        $("#upl_" + vcNomCon).show();
                        $(".file_" + vcNomCon).remove();


                        var vcHtml = "<div class='imgBtn' style='margin-top:1px; height:21px; margin-left: 2px;' ><img src='../../../Common/Images/remove.png' onclick=\"DeleteFile('" + response + "','" + vcNomCon + "')\"/>";
                        vcHtml += "<span style='margin-left:5px;' id='span_" + vcNomCon + "' style='text-decoration:underline;' nombre='" + response + "'>" + response + "</span>";                        
                        vcHtml += "</div> ";
                        $(vcHtml).appendTo('#file_' + vcNomCon);
                        $(`<span class="file_${vcNomCon}" style='margin-left:23px; color: #148014'>(Cargado correctamente)</span>`).insertAfter('#file_' + vcNomCon);
                        $("#upl_" + vcNomCon).hide();
                    } else {
                        alerta('El archivo supera el tamaño máximo permitido (' + $("#hdfTamanoArchivo").val() + 'MB)');
                    }
                },
                onSubmit: function (file, ext) {
                    ext = ext.toLowerCase();
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

    ValidarNumeroEnCajaTexto("txtMonto", ValidarDecimal);

    if ($("#hdfFraccionamiento").val() == "1") {
        $("#trFraccionamiento").show();
    }
    $("#ddlFraccionamiento").change(function () {
        if ($("#ddlFraccionamiento").val() == "1") {
            $("#trMesesCuotas").show();
        } else {
            $("#trMesesCuotas").hide();
            $("#ddlMesesCuotas").val("-1");
        }
    });

    //if ($("#hdfMontoFijo").val() == "1") {
    //    $("#trMontoFijo").show();
    //}

    if ($("#hdfUsuarioCreacion").val() != "") {
        $("#txt_inUsuarioCreacion").val($("#hdfUsuarioCreacion").val());
    }
    if ($("#hdfFechaCreacion").val() != "") {
        $("#txt_daFechaCreacion").val($("#hdfFechaCreacion").val());
    }


    InfoFinanciamiento();


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


    //detalle de financiamiento
    //$("#imgInfoFinanciamiento").live("click", function () {
    $('#imgInfoFinanciamiento').click(function () {
        $('#divInfoFinanciamiento').dialog('open');
    });

    $("#trFInanciamiento").hide();
    $("#trMesesCuotas").hide();
    $("#trMontoFijo").hide();
    $("#trFraccionamiento").hide();
    $("#trPeriodoGracia").hide();

    function InfoFinanciamiento() {
        var wAncho = $(window).width();
        var wAlto = $(window).height();
        $("#ifInfoFinanciamiento").attr("width", 550);
        $("#ifInfoFinanciamiento").attr("height", wAlto - 100);
        $("#ifInfoFinanciamiento").attr("src", "../Mantenimiento/Cam_Mnt_Financiamiento.aspx?Cod=" + $("#hdfIdFInanciamiento").val() + "&FinancSit=0");
    }

    //


    let control_valida;
    let controles_validar = document.getElementsByClassName("ctrlValida");
    for (let i = 0; i < controles_validar.length; i++) {
        control_valida = controles_validar[i];
        control_valida.onkeypress = function (e) {

            funcionValida = this.getAttribute("funValida");
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

});




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









//JHERRERA: Esta función sólo se debe usar para bloquear controles y no desbloquear ya que no contempla que desbloquear según la configuración
function BloquearControles() {
    BloquearPagina(true);

    //if ($("#hdfCodTipSol").val() == "29" || $("#hdfCodTipSol").val() == "30") {
    //    $("#txt_IGV").css("background-color", $("#txt_ImporteBase").css("background-color"));
    //    $("#txt_ImporteTotal").css("background-color", $("#txt_ImporteBase").css("background-color"));
    //    $("#txt_Motivo").attr("disabled", true);
    //    //$('#txt_Periodo').data('kendoDatePicker').enable(false);
    //}
}

function DeleteFile(file, vcNomCon) {
    $.ajax({
        url: "UploadHandler.ashx?file=" + file + "&accion=delete",
        type: "GET",
        cache: false,
        async: true,
        success: function (html) {
            $('#file_' + vcNomCon).html("");
            $("#upl_" + vcNomCon).show();
            $(".file_" + vcNomCon).remove();
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
}

function enviarDatosSolicitudPersonalizada() {
    debugger;
    var arSolPer = [];
    var vcCamSol = "";
    var vcValSol = "";
    var vcCamPer = "";
    var vcValPer = "";
    var vcVacio = "0";

    var vcLongMin = "OK|";

    var vcAuditoria = "";
    arSolPer.Vacio = "0";
    arSolPer.LongMin = "OK|";
    var vcAdjuntos = "";

    $(".PERIODO").each(function (i) {
        if ($(this).is(":disabled") == false || (($("#hdfCodTipSol").val() == "29" || $("#hdfCodTipSol").val() == "30") && $(this).attr("obj") == "Periodo") ) {
            if ($(this).attr("oblig") == "True" && this.value == "") {
                vcVacio = "1";
            } else {
                if ($(this).attr("obj") != undefined) {
                    if (this.value != "") {
                        vcCamPer += "[" + $(this).attr("obj") + "],";
                        var FecHor = this.value;
                        var day = FecHor.substr(3, 4).toString() + FecHor.substr(0, 2).toString() + "01";
                        vcValPer += "dbo.MOV_f_ConvierteAnsiEnFecha($$$" + day + "$$$),";
                        vcAuditoria = "[" + $(this).attr("obj") + "]=" + "$$$" + day + "$$$,";
                    }
                }
            }
        }
    });
    $(".DATE").each(function (i) {
        if ($(this).is(":disabled") == false) {
            if ($(this).attr("oblig") == "True" && this.value == "") {
                vcVacio = "1";
            } else {
                if ($(this).attr("obj") != undefined) {
                    if (this.value != "") {
                        vcCamPer += "[" + $(this).attr("obj") + "],";
                        var FecHor = this.value;
                        var day = FecHor.substr(6, 4).toString() + FecHor.substr(3, 2).toString() + FecHor.substr(0, 2).toString();
                        vcValPer += "dbo.MOV_f_ConvierteAnsiEnFecha($$$" + day + "$$$),";
                        vcAuditoria = "[" + $(this).attr("obj") + "]=" + "$$$" + day + "$$$,";
                    }
                }
            }
        }
    });
    $(".DATETIME").each(function (i) {
        if ($(this).is(":disabled") == false) {
            if ($(this).attr("oblig") == "True" && this.value == "") {
                vcVacio = "1";
            } else {
                if ($(this).attr("obj") != undefined) {
                    if (this.value != "") {
                        vcCamPer += "[" + $(this).attr("obj") + "],";
                        var FecHor = this.value;
                        var day = FecHor.substr(6, 4).toString() + FecHor.substr(3, 2).toString() + FecHor.substr(0, 2).toString();
                        var hora = FecHor.substr(11, 2) + ":" + FecHor.substr(14, 2) + ":" + FecHor.substr(17, 2);
                        vcValPer += "dbo.MOV_f_ConvierteAnsiEnFecha($$$" + day + " " + hora + "$$$),";
                        vcAuditoria = "[" + $(this).attr("obj") + "]=" + "$$$" + day + " " + hora + "$$$,";
                    }
                }
            }
        }
    });
    $(".PICKLIST").each(function (i) {
        //if ($(this).is(":disabled") == false) {
        if (($(this).is(":disabled") == false) || ($("#hdfCodTipSol").val() == "30" && $(this).attr("obj") == "TipoProducto") ) {
            if ($(this).attr("oblig") == "True" && (this.value == "" || this.value == "-1")) {
                vcVacio = "1";
            } else if (($("#hdfCodTipSol").val() == "29" || $("#hdfCodTipSol").val() == "30") && $(this).attr("obj") == "TipoProducto" && this.value == "0=Seleccione") { //Es devoluci[on, el campo es tipoproducto y no ha elegido valor valido, se considera como vacio
                vcVacio = "1";
            } else {
                if ($(this).attr("obj") != undefined) {
                    if (this.value != "") {
                        vcCamPer += "[" + $(this).attr("obj") + "],";
                        vcValPer += "$$$" + this.value + "$$$,";
                        vcAuditoria += "[" + $(this).attr("obj") + "]=" + "$$$" + this.value + "$$$,";
                    }
                }
            }
        }
    });
    $(".BIT").each(function (i) {
        if ($(this).is(":disabled") == false) {
            if ($(this).attr("oblig") == "True" && (this.value == "" || this.value == "-1")) {
                vcVacio = "1";
            } else {
                if ($(this).attr("obj") != undefined) {
                    if (this.value != "") {
                        vcCamPer += "[" + $(this).attr("obj") + "],";
                        vcValPer += this.value + ",";
                        vcAuditoria += "[" + $(this).attr("obj") + "]=" + this.value + ",";
                    }
                }
            }
        }
    });
    $(".INT").each(function (i) {
        if ($(this).is(":disabled") == false) {
            if ($(this).attr("oblig") == "True" && this.value == "") {
                vcVacio = "1";
            } else {
                if ($(this).attr("obj") != undefined) {
                    if (this.value != "") {
                        vcCamPer += "[" + $(this).attr("obj") + "],";
                        vcValPer += this.value + ",";
                        vcAuditoria += "[" + $(this).attr("obj") + "]=" + this.value + ",";
                    }
                }
            }
        }
    });
    $(".DECIMAL").each(function (i) {
        if ($(this).is(":disabled") == false) {
            if ($(this).attr("oblig") == "True" && this.value == "") {
                vcVacio = "1";
            } else {
                if ($(this).attr("obj") != undefined) {
                    if (this.value != "") {
                        vcCamPer += "[" + $(this).attr("obj") + "],";
                        vcValPer += DevuelveNumeroSinFormato(this.value, oCulturaUsuario, false) + ",";
                        vcAuditoria += "[" + $(this).attr("obj") + "]=" + DevuelveNumeroSinFormato(this.value, oCulturaUsuario, false) + ",";
                    }
                }
            }
        }
    });
    $(".VARCHAR").each(function (i) {
        if ($(this).is(":disabled") == false) {
            if ($(this).attr("oblig") == "True" && $.trim(this.value) == "") {
                vcVacio = "1";
            } else {
                if ($(this).attr("obj") != undefined) {
                    if (this.value != "") {
                        vcCamPer += "[" + $(this).attr("obj") + "],";
                        vcValPer += "$$$" + this.value.replace(/'/g, "").replace(/\\/g, "") + "$$$,";
                        vcAuditoria += "[" + $(this).attr("obj") + "]=" + "$$$" + this.value.replace(/'/g, "").replace(/\\/g, "") + "$$$,";
                    }
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
                if (this.value != "") {
                    vcAdjuntos += "[" + $(this).attr("obj") + "],";
                    vcAdjuntos += $('#file_' + vcNomCon).text() + ";";
                }
            }
        }
    });

    //Valoes de campos tipo dato Referencia
    $("input[type=hidden]").each(function (i) {
        var gl = $(this).attr("id").split("__");
        if (gl.length == 3) {
            //alert("length:" + gl.length + "\nid: " + $(this).attr("id") + "\n[0]: " + gl[0] + "\nOblig: " + gl[2] + "\nValue: " + this.value);
            if (gl[0] == "ValHdf") {
                if (gl[2] == "1" && this.value == "") {
                    vcVacio = "1";
                } else {
                    if (this.value != '' && gl[1].toString() != '') {
                        vcCamPer += "[" + gl[1].toString() + "],";
                        vcValPer += "$$$" + this.value + "$$$,";
                        vcAuditoria += "[" + gl[1].toString() + "]=" + "$$$" + this.value + "$$$,";
                    }
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


    $(".REFERENCIA").each(function (i) {
        if ($(this).attr("nomtab") != undefined && $(this).attr("nomtab") != '' && $(this).attr("nomtab") != 'undefined') {
            let nomCampo = $(this).attr("id").replace("bp_" + $(this).attr("nomtab") + "_", "").replace("_txtValorBusqueda", "");
            let nomCampoHidden = nomCampo + "_IdDescripcion";
            let oblig = $(this).hasClass("OBLIGATORIO") ? "1" : "0";
            //let hdfVal = "#ValHdf__" + nomCampo + "__" + oblig;
            let ValorHDF = $(this).val();

            vcCamPer += "[" + nomCampoHidden + "],";
            vcValPer += "$$$" + ValorHDF + "$$$,";
            vcAuditoria += "[" + nomCampoHidden + "]=" + "$$$" + ValorHDF + "$$$,";
        }
    });


    arSolPer.Vacio = vcVacio;
    arSolPer.LongMin = vcLongMin;

    if (vcVacio == "0" && arSolPer.LongMin == "OK|") {
        arSolPer.vcCamPer = vcCamPer.substring(0, vcCamPer.length - 1);
        arSolPer.vcValPer = vcValPer.substring(0, vcValPer.length - 1);
        arSolPer.biFraccionamiento = $("#ddlFraccionamiento").val();
        arSolPer.vcAuditoria = vcAuditoria.substring(0, vcAuditoria.length - 1);
        arSolPer.vcAdjuntos = vcAdjuntos;
        arSolPer.inNumMinCuo = parseInt($("#hdfNumMinCuo").val());
        arSolPer.inNumMaxCuo = parseInt($("#hdfNumMaxCuo").val());
        arSolPer.inNumCuo = $("#txtMesesCuotas").val();
        arSolPer.Meses = $("#hdfMesCuo").val();
        arSolPer.inMinPerGra = parseInt($("#hdfMinPerGra").val());
        arSolPer.inMaxPerGra = parseInt($("#hdfMaxPerGra").val());
        arSolPer.inPerGra = $("#txtPeriodoGracia").val();

//        if ($("#hdfCodTipSol").val() == "29" || $("#hdfCodTipSol").val() == "30") {
//            arSolPer.dcMonto = DevuelveNumeroSinFormato($("#txt_ImporteTotal").val(), oCulturaUsuario, false);
//            arSolPer.inTipoProducto = $("#ddl_TipoProducto").val().split("=")[0];
//            arSolPer.inTipoProceso = $("#ddl_TipoProceso").val().split("=")[0];
////            arSolPer.LineaAsociada = $("#bbp_MOV_Linea_LineaAsociada_txtValorBusqueda").val();
////            arSolPer.IMEI = $("#hdfCodTipSol").val() == "29" ? $("#bp_MOV_Dispositivo_IMEI_txtValorBusqueda").val() : "";
//        } else {
            arSolPer.dcMonto = $("#txtMonto").val();
            arSolPer.inTipoProducto = "0";
            arSolPer.inTipoProceso = "0";
//            arSolPer.LineaAsociada = "";
//            arSolPer.IMEI = "";
        //}
    }
    return arSolPer;
}



function CondicionJQuery_SeleccionLinea() {
    console.log("TipoServicioPlanLineaSeleccionado. ", TipoServicioPlanLineaSeleccionado);

}

function AbrirModalCreacion_Entidad(idcontrol, vctab, titulo) {

    $('#ifModal').attr("src", "../Mantenimiento/Mnt_ModeloDispositivo.aspx?IsLigero=1&inTipoLinea=2");
    $("#ifModal").css("height", "100%");
    $("#ifModal").css("width", "100%");
    $('#dvCreacion').dialog({
        title: titulo,
        height: $(parent.window).height() - 160,
        width: 810,
        modal: true
    });
}

function CerrarModalCreacion_Entidad() {
    $("#dvCreacion").dialog("close");
}
