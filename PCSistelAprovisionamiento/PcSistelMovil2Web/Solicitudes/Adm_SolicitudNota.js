var EsPriVez = "1";
var vcFileName = "";

$(function () {
    $("#btnEnviar").button({ icons: { primary: "ui-icon-comment"} });
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
            $("#dvInfoAdjunto").hide();
        }
    });

    function agregarEstilosDetalle() {
        $(".detalle").addClass("ui-state-hover");
        $(".detalle").css("font-weight", "normal");
        $(".detalle").addClass("detalle");
        $(".detalle").css("font-size", "11px");
        $(".detalle").css("color", "black");
        $(".detalle").css("word-wrap", "break-word");
    };

    function RegistrarDetalle() {
        var vcEnviaCorreo = "0";
        var vcDetalle = $.trim($("#txtDetalle").val()).replace("'", "\'").replace("\\", "\\\\");
        var vcTitulo = "Nota creada el "
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
                    vcImgAdjunto = '<img src= "../Common/Images/Mantenimiento/BajarArchivo.png" />';

                var vcImgEnvCor = "";
                if (vcEnviaCorreo == "1")
                    vcImgEnvCor = '<img src= "../Common/Images/Mantenimiento/Enviar.gif" title="Correo enviado"/>';

                var vcFilaDetalle = ""
                if (vcDetalle != "") {
                    //vcFilaDetalle
                    vcFilaDetalle = "<tr><td colspan='4' style='padding-left: 6px;'><div style='width:597px; word-wrap:break-word;'>" + vcDetalle.replace(/\</g, '&lt;').replace(/\>/g, '&gt;') + "</div></td></tr>";
                }

                vcTitulo += vcFechaHora.substring(0, vcFechaHora.indexOf(" ")) + " a las " + vcFechaHora.substring(vcFechaHora.indexOf(" ") + 1) + " por " + $("#hdfUsuario").val();

                var vcHTML = '';
                vcHTML = "<div style='border:0px solid #C0C0C0; background-color:#F3F3F3; margin-left:1px; margin-top:" + inBorderTop + "px; width:614px;'>";
                vcHTML += "<table width='611px' cellpadding='2'><tr><td style='width:20px;'>&nbsp;<input type='image' src='../Common/Images/nota16x16.png' /></td><td>&nbsp;<b>" + vcTitulo + "</b></td>";
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
            },
            error: function (xhr, err) {
                $("#dvCargando").hide();
                alertaExterna("Error, Estadow: " + xhr.readyState + "\nEstado: " + xhr.status);
            }
        });
    }

    function fnMostrarTitulo(vcRegistradoPor) {
        return "Modificado por: " + vcRegistradoPor;
    }

    $('#txtDetalle').keypress(function (event) {
        if (event.which == '13') {
            RegistrarDetalle();
        };
    });

    $("#btnEnviar").click(function (event) {
        RegistrarDetalle();
    });

    new AjaxUpload('#UploadButton', {
        action: 'UploadHandler.ashx',
        onComplete: function (file, response) {
            //alert(response);
            $("<div class='imgBtn' style='margin-top:1px; height:21px;'><img src='../Common/Images/remove.png' onclick=\"DeleteFile('" + response + "')\"/>&nbsp;&nbsp;&nbsp;<span id='filesubido' style='text-decoration:underline;' nombre='" + response + "'>" + response + "</span></div>").appendTo('#UploadedFile');
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

function DeleteFile(file) {
    $.ajax({
        url: "UploadHandler.ashx?file=" + file + "&accion=delete",
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
        _window.document.execCommand('SaveAs', true, fileName || fileURL)
        _window.close();
    }
}

function fnDescargarArchivo(NomArc, tipo, inIdDet) {
    //Descargar adjunto antes de grabar nota
    if (tipo == 1) {
        var filePath = "/Temporal/" + NomArc;
        $.ajax({
            url: raiz(filePath),
            success: function (data) {
                window.location.href = "../Common/Controladores/DescargarArchivo.ashx?archivo=" + filePath;
            },
            error: function (data) {
                alertaExterna('No se encontró el archivo a descargar.');
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
                    var filePath = "/Temporal/" + NomArc;
                    //window.location.href = "../Common/Controladores/DescargarArchivo.ashx?archivo=" + filePath;


                    window.location.href = "../Common/Controladores/DescargarArchivo.ashx?archivo=" + filePath;
                    //var filePath = "P_Movil/Administrar/Temporal/Solicitudes/" + NomArc;
                    //var filePath = result.d;
                    //SaveToDisk(filePath, NomArc);

                    //var filePath = "P_Movil/Administrar/Temporal/Solicitudes/" + NomArc;
                    //window.location.href = raiz(filePath);
                } else {
                    alertaExterna('No se encontró el archivo a descargar.');
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
                alertaExterna("Error, Estadow: " + xhr.readyState + "\nEstado: " + xhr.status);
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

//function fnDescargarArchivoSubido() {
//    alerta("Hola");

//}

$("#filesubido").live("click", function () {
    var archivo = $(this).attr("nombre");
    fnDescargarArchivo(archivo, 1, null);
});
