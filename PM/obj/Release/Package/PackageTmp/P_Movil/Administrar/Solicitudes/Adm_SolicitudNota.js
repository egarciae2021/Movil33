var EsPriVez = "1";
var vcFileName = "";
//carpeta de dominio
let idSolicitud = "";
var CarpetaDominio = '';
let tieneNotasPorLeer = false;
$(function () {
    var hdfinsertar = window.parent.document.body.childNodes[1].children['hdfinsertar'].value
    var hdfactivar = window.parent.document.body.childNodes[1].children['hdfactivar'].value
    var hdfeliminar = window.parent.document.body.childNodes[1].children['hdfeliminar'].value
    var hdfexportar = window.parent.document.body.childNodes[1].children['hdfexportar'].value
    var hdfimportar = window.parent.document.body.childNodes[1].children['hdfimportar'].value 
    var totalperil = hdfinsertar + hdfactivar + hdfeliminar + hdfexportar + hdfimportar

     
    //edgar garcia 10112022 Bloquear notas si solicitud esta Cerrada
    //edgar garcia 0212022 correción para validar Gestor de solicitudes
    var notabloq = (window.location.search).substr(2).split('&')
    var estadonota = ((notabloq.filter(y => y.includes("IdEstPro"))).toString()).split('=')
     if (parseInt(estadonota[1]) == 7 || parseInt(estadonota[1]) == 9) {

        $("#txtDetalle").prop('disabled', true);
    }
    else {
        if ($('#hdinCod').val() == 'False') {
            if (totalperil == 0) {
                $("#txtDetalle").prop('disabled', true);
            }
        } 
    }
     
     

    //Validar nota sistema ...
    activarCheckMostrarNotaSistema();

    idSolicitud = $('#hdfIdSolicitud').val();
    funcionesIniciales();

    if ($("#hdfBiEscalado").val() == "0") {
        $("#dvOrigen").css("display", "none");
    }
    else {
        $("#dvOrigen").css("display", "block");
    }

    if ($('#ddlOrigen option').length < 2) {
        $("#dvOrigen").css("display", "none");
        //let altoPanel = $('.dvPanel').height()
        let altoPanel = $('#PnlDetalles').height()
        //$('.dvPanel').height(altoPanel + 30);
        //$('#PnlDetalles').height(altoPanel + 30);
    }

    $("#ddlOrigen").change(function () {
        if ($(this).val() == "0") {
            $("#PnlDetallesOperador").css("display", "none");
            $("#PnlDetalles").css("display", "block");

            $("#txtDetalle").removeAttr('disabled');
            $("#tdUpload").show();
        }
        else {
            fnObtenerNotasEscalamiento();
            $("#PnlDetalles").css("display", "none");
            $("#PnlDetallesOperador").css("display", "block");
        }
    });

    CarpetaDominio = window.top.$("#hdfCodigoDominio").val() != '' ? '/' + window.top.$("#hdfCodigoDominio").val() : '';
    $("#btnEnviar").button({ icons: { primary: "ui-icon-comment" } });
    $("#txtDescripcionDetalle").focus();
    var IdSolicitud = $("#hdfIdSolicitud").val();
    $("#PnlDetalles").scrollTop(1000000);

    if ($('#txtDetalle').is(':disabled')) {
        $("#tdUpload").hide();
        //$("#dvInfoAdjunto").hide();
    }

    $("#txtDetalle").keyup(function () {
        if ($.trim($("#txtDetalle").val()) == "") {
            $("#chkEnviaCorreo").attr("checked", false);
            $("#chkEnviaCorreo").prop('disabled', true);
            $("#dvInfoAdjunto").hide();
        } else {
            $("#chkEnviaCorreo").prop('disabled', false);
        }
    });

    $('#chkEnviaCorreo').change(function () {
        if ($("#chkEnviaCorreo").is(":checked")) {
            $("#dvInfoAdjunto").show();
        } else {
            $("#dvInfoAdjunto").hide(); RegistrarDetalleOperador
        }
    });

    function agregarEstilosDetalle() {
        $(".detalle").addClass("ui-state-hover");
        $(".detalle").css("font-weight", "normal");
        $(".detalle").addClass("detalle");
        $(".detalle").css("font-size", "11px");
        $(".detalle").css("color", "black");
        $(".detalle").css("word-wrap", "break-word");
    }

    function RegistrarDetalleOperador() {

        var Usuario = $("#hdfUsuario").val();
        var vcDetalle = $.trim($("#txtDetalle").val()).replace("'", "\'").replace("\\", "\\\\");
        if (vcDetalle == "" && vcFileName == "") {
            $("#txtDetalle").focus;
            return;
        }

        $.ajax({
            type: "POST",
            url: "Adm_SolicitudNota.aspx/RegistrarNotaOperador",
            data: "{'pIdSolicitud': '" + $("#hdfIdSolicitud").val() + "', " +
                "'pNota': '" + vcDetalle + "'," +
                "'vcFileName': '" + vcFileName + "'," +
                "'pIdDominio': '" + window.top.$("#hdfCodigoDominio").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result.d.IdSolicitudOperadorHistorico == -1) {
                    alerta("Error al registrar nota");
                }
                else if (result.d.IdSolicitudOperadorHistorico == -2) {
                    alerta("La solicitud no ha sido enviada al Operador.");
                }
                else {
                    $("#PnlDetallesOperador").append(result.d.Html);
                }
                $("#PnlDetallesOperador").scrollTop(1000000);
                $("#txtDetalle").focus();
                $("#txtDetalle").val("");

                $('#UploadedFile').html("");
                $("#UploadButton").show();
                $("#dvExtensiones").show();

                SolicitudNota_EnviarMensaje("Escalado", $("#hdfIdSolicitud").val(), "", vcDetalle.replace(/\</g, '&lt;').replace(/\>/g, '&gt;'), Usuario);

                SolicitudModificada_EnviarMensaje($("#hdfIdSolicitud").val(), "", "");
            },
            error: function (xhr, err) {
                $("#dvCargando").hide();
                alerta("Error, Estadow: " + xhr.readyState + "\nEstado: " + xhr.status);
            }
        });
    }


    function RegistrarDetalle() {
        var Usuario = $("#hdfUsuario").val();
        var vcEnviaCorreo = "0";
        var vcDetalle = $.trim($("#txtDetalle").val()).replace("'", "\'").replace("\\", "\\\\");
        var vcTitulo = "Nota creada el ";
        if (vcDetalle == "" && vcFileName == "") {
            $("#txtDetalle").focus;
            return;
        }
        if (vcDetalle == "") //Para notas con adjunto y sin texto no se graba el envío de correo
            vcEnviaCorreo = "0";

        if ($("#chkEnviaCorreo").is(":checked"))
            vcEnviaCorreo = "1";

        $.ajax({
            type: "POST",
            url: "Adm_SolicitudNota.aspx/RegistrarDetalle",
            data: "{'inCodSol': '" + IdSolicitud + "', " +
                "'vcDetalle': '" + vcDetalle + "'," +
                "'vcFileName': '" + vcFileName + "'," +
                "'vcEnviaCorreo': '" + vcEnviaCorreo + "'}",

            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                vcDetalle = vcDetalle.replace("\\\\", "\\");
                var vcFechaHora = result.d[0];
                var inCodDet = result.d[1];
                var vcTamKB = result.d[2];

                var inBorderTop = "1";
                if (EsPriVez == "1")
                    EsPriVez = "0";
                else
                    inBorderTop = "2";

                var vcImgAdjunto = "";
                if (vcFileName != "")
                    vcImgAdjunto = '<img src= "../../../Common/Images/Mantenimiento/BajarArchivo.png" />';

                var vcImgEnvCor = "";
                if (vcEnviaCorreo == "1")
                    vcImgEnvCor = '<img src= "../../../Common/Images/Mantenimiento/Enviar.gif" title="Correo enviado"/>';

                var vcFilaDetalle = "";
                if (vcDetalle != "") {
                    //vcFilaDetalle
                    vcFilaDetalle = "<tr><td colspan='4' style='padding-left: 6px;'><div style='width:597px; word-wrap:break-word;'>" + vcDetalle.replace(/\</g, '&lt;').replace(/\>/g, '&gt;') + "</div></td></tr>";
                }

                vcTitulo += vcFechaHora.substring(0, vcFechaHora.indexOf(" ")) + " a las " + vcFechaHora.substring(vcFechaHora.indexOf(" ") + 1) + " por " + $("#hdfUsuario").val();

                var vcHTML = '';
                vcHTML = "<div style='border:0px solid #C0C0C0; background-color:#F3F3F3; margin-left:1px; margin-top:" + inBorderTop + "px; width:614px;'>";
                vcHTML += "<table width='611px' cellpadding='2'><tr><td style='width:20px;'>&nbsp;<input type='image' src='images/nota16x16.png' /></td><td>&nbsp;<b>" + vcTitulo + "</b></td>";
                vcHTML += "<td align='right' style='padding-right:6px;'><span>" + vcImgAdjunto + "</span>&nbsp;&nbsp;<span style='font-weight:bold; text-decoration:underline;' class='imgBtn'";
                vcHTML += "title=\"" + vcTamKB + "\" onclick=\"fnDescargarArchivo('" + vcFileName + "',2," + inCodDet + ")\">" + vcFileName + "</span></td><td style='width:20px; text-align:right;'><span>";
                vcHTML += vcImgEnvCor + "</span></td></tr>" + vcFilaDetalle + "</table></div>";

                DeleteFile(vcFileName);
                $("#dvCargando").hide();
                $("#PnlDetalles").append(vcHTML);
                $("#txtDetalle").val("");
                $("#PnlDetalles").scrollTop(1000000);
                $("#txtDetalle").focus();
                $("#chkEnviaCorreo").attr("checked", false);

                var CodigoSolicitud = "";
                try {
                    //CodigoSolicitud = window.parent.CodigoSolicitudNota;
                    //debugger;

                    const titleNota = window.parent.$("#ui-dialog-title-dvNota").html()
                    const arrElementosTitleNota = titleNota.split(":");
                    CodigoSolicitud = arrElementosTitleNota[1].trim();

                } catch (e) {
                }
                //SolicitudNota_EnviarMensaje(vcHTML, "CLIENTE|" + window.top.$("#hdfCodigoDominio").val() + "|" + IdSolicitud + "|" + vcDetalle.replace(/\</g, '&lt;').replace(/\>/g, '&gt;'), Usuario);
                SolicitudNota_EnviarMensaje("Interno", IdSolicitud, CodigoSolicitud, vcDetalle.replace(/\</g, '&lt;').replace(/\>/g, '&gt;'), Usuario);

                SolicitudModificada_EnviarMensaje(IdSolicitud, "", "");

                window.parent.ActualizarGrilla();


            },
            error: function (xhr, err) {
                $("#dvCargando").hide();
                alerta("Error, Estadow: " + xhr.readyState + "\nEstado: " + xhr.status);
            }
        });
    }

    function fnMostrarTitulo(vcRegistradoPor) {
        return "Modificado por: " + vcRegistradoPor;
    }

    $('#txtDetalle').keypress(function (event) {
        if (event.which == '13') {
            if ($("#ddlOrigen").val() == "0") {
                RegistrarDetalle();
            }
            else {
                RegistrarDetalleOperador();
            }
        }
    });

    $("#btnEnviar").click(function (event) {
        if ($("#ddlOrigen").val() == "0") {
            RegistrarDetalle();
        }
        else {
            RegistrarDetalleOperador();
        }

    });

    new AjaxUpload('#UploadButton', {
        action: CarpetaDominio == '' ? 'UploadHandler.ashx?dominio=-1' : 'UploadHandler.ashx?dominio=' + CarpetaDominio,
        onComplete: function (file, response) {
            //alert(response);
            $("<div class='imgBtn' style='margin-top:1px; height:21px;'><img src='../../../Common/Images/remove.png' onclick=\"DeleteFile('" + response + "')\"/>&nbsp;&nbsp;&nbsp;<span id='filesubido' style='text-decoration:underline;' nombre='" + response + "'>" + response + "</span></div>").appendTo('#UploadedFile');
            vcFileName = response;
            $("#UploadButton").hide();
            $("#dvExtensiones").hide();
        },
        onSubmit: function (file, ext) {
            if (!(ext && /^(txt|doc|docx|xls|xlsx|pdf|jpg|png)$/i.test(ext))) {
                alert('Formato inválido');
                return false;
            }
        }
    });
});

$("#filesubido").live("click", function () {
    var archivo = $(this).attr("nombre");
    fnDescargarArchivo(archivo, 1, null);
});

function DeleteFile(file) {
    $.ajax({
        url: "UploadHandler.ashx?file=" + file + "&accion=delete&dominio=15",
        type: "GET",
        cache: false,
        async: true,
        success: function (html) {
            $('#UploadedFile').html("");
            $("#UploadButton").show();
            $("#dvExtensiones").show();
            vcFileName = "";
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
    //Descargar adjunto antes de grabar nota
    if (tipo == 1) {
        var filePath = "P_Movil/Administrar/Temporal/Solicitudes" + CarpetaDominio + "/" + NomArc;
        $.ajax({
            url: raiz(filePath),
            success: function (data) {
                window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + filePath);
            },
            error: function (data) {
                alerta('No se encontró el archivo a descargar.');
                $('#UploadedFile').html("");
                $("#UploadButton").show();
                vcFileName = "";
            }
        });
    }
    //Descargar adjunto de nota grabada
    else if (tipo == 2) {
        $.ajax({
            type: "POST",
            url: "Adm_SolicitudNota.aspx/DescargarArchivoBD",
            data: "{'inIdDet': '" + inIdDet + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d != "") {
                    var filePath = "P_Movil/Administrar/Temporal/Solicitudes" + CarpetaDominio + "/" + NomArc;
                    window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + filePath);

                    //var filePath = "P_Movil/Administrar/Temporal/Solicitudes/" + NomArc;
                    //var filePath = result.d;
                    //SaveToDisk(filePath, NomArc);

                    //var filePath = "P_Movil/Administrar/Temporal/Solicitudes/" + NomArc;
                    //window.location.href = raiz(filePath);
                } else {
                    alerta('No se encontró el archivo a descargar.');
                    $('#UploadedFile').html("");
                    $("#UploadButton").show();
                    vcFileName = "";
                }



                /*
                var filePath = "P_Movil/Administrar/Temporal/Solicitudes/" + NomArc;
                $.ajax({
                url: raiz(filePath),
                success: function (data) {
                window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + filePath);
                },
                error: function (data) {
                $('#UploadedFile').html("");
                $("#UploadButton").show();
                vcFileName = "";
                }
                });
                */
            },
            error: function (xhr, err) {
                $("#dvCargando").hide();
                alerta("Error, Estadow: " + xhr.readyState + "\nEstado: " + xhr.status);
            }
        });

        //alert(NomArc + ", " + CodDet);
    }
    //$("#ifDownload").attr("src", "Adm_DescargarArchivo.aspx?vcNomArc=" + file);
    //}


    //            $('#UploadStatus').html("Descargando...");
    //            $.ajax({
    //                url: "UploadHandler.ashx?file=" + file + "&accion=download",
    //                type: "GET",
    //                cache: false,
    //                async: true,
    //                success: function (html) {
    //                    $('#UploadedFile').html(html);
    //                    $("#UploadButton").show();

    //                }
    //            });
}

function fnObtenerNotasEscalamiento() {
    $("#PnlDetallesOperador").html("");

    $.ajax({
        type: "POST",
        url: "Adm_SolicitudNota.aspx/ObtenerNotasEscalamiento",
        data: "{'pIdSolicitud': '" + $("#hdfIdSolicitud").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d.length > 0) {
                var i = 0;
                for (i = 0; i < result.d.length; i++) {
                    $("#PnlDetallesOperador").append(result.d[i].Html);

                    if (i == result.d.length - 1) {

                        if (result.d[i].Cerrado == 1) {
                            $("#txtDetalle").removeAttr('disabled');
                            $("#tdUpload").show();
                        }
                        else {
                            $("#txtDetalle").attr('disabled', 'disabled');
                            $("#tdUpload").hide();
                        }
                    }
                }
            }
            else {
                $("#txtDetalle").attr('enabled', 'enabled');
                $("#tdUpload").hide();
            }

        },
        error: function (xhr, err) {
            $("#dvCargando").hide();
            alerta("Error, Estadow: " + xhr.readyState + "\nEstado: " + xhr.status);
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

function disminuirContadorAlertaSolicitud() {
    if (tieneNotasPorLeer) {
        try {
            parent.parent.parent.disminuirContadorSolicitud();
            tieneNotasPorLeer = false;
        } catch (e) {
            //nada que ver aquí
            tieneNotasPorLeer = true;
        }
    }

    if (tieneNotasPorLeer) {
        try {
            parent.parent.parent.parent.disminuirContadorSolicitud();
            tieneNotasPorLeer = false;
        } catch (e) {
            //nada que ver aquí
            tieneNotasPorLeer = true;
        }
    }
}

function funcionesIniciales() {
    ValidaSiSolicitudTieneNotaPorLeer();
}

function ValidaSiSolicitudTieneNotaPorLeer() {
    $.ajax({
        type: "POST",
        url: "Adm_SolicitudNota.aspx/ValidaSiSolicitudTieneNotaPorLeer",
        data: "{'idSolicitud': '" + idSolicitud + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            //verifico si existe o no una solicitud por leer 
            tieneNotasPorLeer = response.d;
            disminuirContadorAlertaSolicitud();
            InsertarVisto();
        },
        error: function () {
            InsertarVisto();
        }
    });
}

function InsertarVisto() {
    $.ajax({
        type: "POST",
        url: "Adm_SolicitudNota.aspx/InsertarVisto",
        data: "{'idSolicitud': '" + idSolicitud + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            RegistrarSeguimientoVisto();
        },
        error: function () {
            RegistrarSeguimientoVisto();
        }
    });
}

function RegistrarSeguimientoVisto() {
    $.ajax({
        type: "POST",
        url: "Adm_SolicitudNota.aspx/RegistrarSeguimientoVisto",
        data: "{'idSolicitud': '" + idSolicitud + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            //do nothing
        }
    });
}


function activarCheckMostrarNotaSistema() {

    chkMostrarNotasSistema_change = function () {
        const filasNotas = document.querySelector("#dlNotas").querySelectorAll("tr");
        const totalFilasNotas = filasNotas.length;
        const valorDisplay = chkMostrarNotasSistema.checked ? "" : "none";
        for (var i = 0; i < totalFilasNotas; i++) {
            const fila = filasNotas[i];
            if (fila.querySelectorAll("table[essistema='True']").length > 0)
                fila.style.display = valorDisplay;
        }
    };

    chkMostrarNotasSistema.addEventListener("change", function () {
        localStorage.setItem('mostrarNotasSistema', chkMostrarNotasSistema.checked ? "1" : "0");
        chkMostrarNotasSistema_change();
    });

    const mostrarNota = localStorage.getItem('mostrarNotasSistema') || '0';
    if (Boolean(mostrarNota)) {
        chkMostrarNotasSistema.checked = mostrarNota == "1" ? true : false;
        chkMostrarNotasSistema_change();
    }

    PnlDetalles.style.display = "";
}
