var EsPriVez = "1";
var vcFileName = "";
var Periodo;
var CarpetaDominio = '';
var ProcesoCerrado = '0';

$(function () {
    //debugger;
    $(".lblDetalle").each(function () {
        $(this).html(fnVerificarEmoticones($(this).text()));
    });

    //$(".clsItem_" + $("#hdfUsuario").val()).css("background-color", "red");
    $(".clsItem_" + $("#hdfIdUsuario").val()).css({
        "background-color": "#E4F8E0",
        "border-radius": "5px",
        "border-style": "solid",
        "border-width": "1px",
        "border-color": "#DADBDB"
    });

    ProcesoCerrado = $("#hdfCerrado").val();
    if (ProcesoCerrado == "1") {
        $("#txtDetalle").attr("disabled", "disabled");
        $("#btnEnviar").hide();
        $("input[name=userfile]").hide();
    }

    Periodo = $("#hdfPeriodo").val();

    $("#dvOrigen").css("display", "none");

    CarpetaDominio = window.top.$("#hdfCodigoDominio").val() != '' ? '/' + window.top.$("#hdfCodigoDominio").val() : '';
    $("#btnEnviar").button({ icons: { primary: "ui-icon-comment" } });
    $("#txtDescripcionDetalle").focus();
    var Periodo = $("#hdfPeriodo").val();
    $("#PnlDetalles").scrollTop(1000000);

    if ($('#txtDetalle').is(':disabled')) {
        $("#tdUpload").hide();
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
    }

    function RegistrarDetalle() {
        var CodEnlace = $("#hdfCodEnlace").val();
        var Usuario = $("#hdfUsuario").val();
        var vcEnviaCorreo = "0";
        var vcDetalle = $.trim($("#txtDetalle").val()).replace(/'/g, "").replace("\\", "\\\\");

        if (vcDetalle == "") {
            $("#txtDetalle").focus;
            return;
        }

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
            url: "ValidarNota.aspx/RegistrarDetalle",
            data: "{'Periodo': '" + Periodo + "', " +
                  "'vcDetalle': '" + vcDetalle + "'," +
                  "'vcFileName': '" + vcFileName + "'," +
                  "'vcEnviaCorreo': '" + vcEnviaCorreo + "'," +
                  "'CodEnlace': '" + CodEnlace + "'," +
                  "'Operador': '" + $("#hdfOperador").val() + "'}",

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
                if (vcFileName != "") {
                    vcImgAdjunto = '<img src= "../../Common/Images/Mantenimiento/BajarArchivo.png" />';
                }
                var vcImgEnvCor = "";
                if (vcEnviaCorreo == "1")
                    vcImgEnvCor = '<img src= "../../Common/Images/Mantenimiento/Enviar.gif" title="Correo enviado"/>';

                var vcFilaDetalle = "";
                if (vcDetalle != "") {
                    //vcFilaDetalle
                    vcFilaDetalle = "<tr><td colspan='4' style='padding-left: 6px;'><div style='width:597px; word-wrap:break-word;'>" + fnVerificarEmoticones(vcDetalle.replace(/\</g, '&lt;').replace(/\>/g, '&gt;')) + "</div></td></tr>";
                }

                vcTitulo += vcFechaHora.substring(0, vcFechaHora.indexOf(" ")) + " a las " + vcFechaHora.substring(vcFechaHora.indexOf(" ") + 1) + " por " + $("#hdfUsuario").val();

                var vcHTML = '';
                vcHTML = "<div class='clsItem_" + $("#hdfIdUsuario").val() + "' style='background-color: #FFFFFF; border-radius: 5px; border-style: solid; border-width: 1px; border-color: #DADBDB; margin-left:1px; margin-top:" + inBorderTop + "px; width:614px;'>";
                vcHTML += "<table width='611px' cellpadding='2'><tr><td style='width:20px;'>&nbsp;<input type='image' src='../../Common/Images/nota16x16.png' /></td><td>&nbsp;<b>" + vcTitulo + "</b></td>";
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

                $(".clsItem_" + $("#hdfIdUsuario").val()).css({
                    "background-color": "#E4F8E0",
                    "border-radius": "5px",
                    "border-style": "solid",
                    "border-width": "1px",
                    "border-color": "#DADBDB"
                });

                EnviarMensaje(vcHTML, vcDetalle.replace(/\</g, '&lt;').replace(/\>/g, '&gt;'), Usuario);
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
            $("#btnEnviar").click();
        }
    });

    $("#btnEnviar").click(function (event) {
        RegistrarDetalle();
    });

    new AjaxUpload('#UploadButton', {
        action: CarpetaDominio == '' ? 'UploadHandler_Concilia.ashx?dominio=-1' : 'UploadHandler_Concilia.ashx?dominio=' + CarpetaDominio,
        onComplete: function (file, response) {
            //alert(response);
            $("<div class='imgBtn' style='margin-top:1px; height:21px;'><img src='../../Common/Images/remove.png' onclick=\"DeleteFile('" + response + "')\"/>&nbsp;&nbsp;&nbsp;<span id='filesubido' style='text-decoration:underline;' nombre='" + response + "'>" + response + "</span></div>").appendTo('#UploadedFile');
            vcFileName = response;
            $("#UploadButton").hide();
            $("#dvExtensiones").hide();
        },
        onSubmit: function (file, ext) {
            if (!(ext && /^(txt|doc|docx|xls|xlsx|pdf|jpg|png|zip|rar)$/i.test(ext))) {
                alerta('Formato inválido');
                return false;
            }
        }
    });

    setTimeout(function () {
        $("#txtDetalle").focus();
    }, 500);

});

function DeleteFile(file) {
    $.ajax({
        url: CarpetaDominio == '' ? 'UploadHandler_Concilia.ashx?accion=delete&file=' + file + '&dominio=-1' : 'UploadHandler_Concilia.ashx?accion=delete&file=' + file + '&dominio=' + CarpetaDominio,
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
        var filePath = "P_Movil/Conciliar/Temporal" + CarpetaDominio + "/" + NomArc;
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
            url: "ValidarNota.aspx/DescargarArchivoBD",
            data: "{'inIdDet': '" + inIdDet + "', 'Operador': '" + $("#hdfOperador").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d != "") {
                    var filePath = "P_Movil/Conciliar/Temporal" + CarpetaDominio + "/" + NomArc;
                    window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + filePath);
                } else {
                    alerta('No se encontró el archivo a descargar.');
                    $('#UploadedFile').html("");
                    $("#UploadButton").show();
                    vcFileName = "";
                }
            },
            error: function (xhr, err) {
                $("#dvCargando").hide();
                alerta("Error, Estadow: " + xhr.readyState + "\nEstado: " + xhr.status);
            }
        });
    }
}

$("#filesubido").live("click", function () {
    var archivo = $(this).attr("nombre");
    fnDescargarArchivo(archivo, 1, null);
});


