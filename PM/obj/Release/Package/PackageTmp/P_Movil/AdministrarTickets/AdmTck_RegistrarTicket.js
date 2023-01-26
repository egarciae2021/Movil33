var Modal;
var paginaUploadTicket;
var CarpetaDominio = '';
var Adjuntos = '';

$(function () {

    var Nametab = "tbPrincipalProducto";
    var Accord = window.parent.$("#" + Nametab);
    CarpetaDominio = window.top.$("#hdfCodigoDominio").val() != '' ? '/' + window.top.$("#hdfCodigoDominio").val() : '';

    if ($("#hdfEsOk").val() == "0") {
        $("#global").css("display", "none");
        $("form").append('<div style="width:90%; height:90%; padding:20px; font-size:large; color:Gray; ">No hay datos necesarios (Tipos) para registrar ticket</div>');
    }
    else {

        $("#txtUsuario").focus();
        $(".btnNormal").button();
        //    $("#btnBuscar").button();
        //    $("#btnRegistrar").button({ icons: { primary: "ui-icon-disk"} });

        $("#btnRegistrar").click(function () {

            var usuario = $("#txtUsuario").val();
            var tipo2 = $("#ddlTipo2").val();
            var tipificacion = $("#ddlTipo").val();
            var medioContacto;
            var strAsignarme = "false";

            if ($("#hdfIdTecnico").val() == "-1") {
                medioContacto = "3";
            }
            else {
                medioContacto = $("#ddlMedioContacto").val();
            }

            var asunto = $("#txtAsunto").val().replace(/'/g, "&#39");
            var descripcion = $("#txtDescripcion").val().replace(/'/g, "&#39");
            var ususarioRegistro = $("#hdfIdUsuarioLogeado").val();
            if (usuario == "") {
                alerta("Ingrese un usuario");
                $("#txtUsuario").focus();
                return;
            }
            if (tipo2 == "-1") {
                alerta("Seleccione Tipo");
                $("#ddlTipo2").focus();
                return;
            }
            if (tipificacion == "-1") {
                alerta("Seleccione Acerca de");
                $("#ddlTipo").focus();
                return;
            }
            if (medioContacto == "-1") {
                alerta("Seleccione un medio de contacto.");
                $("#ddlMedioContacto").focus();
                return;
            }
            if (asunto == "") {
                alerta("Ingrese asunto");
                $("#txtAsunto").focus();
                return;
            }
            if (descripcion == "") {
                alerta("Ingrese descripción");
                $("#txtDescripcion").focus();
                return;
            }

            var esAutomatico = "false";
            if ($("#chkAsignarme").prop("checked")) {
                strAsignarme = "true";
            }

            if ($("#ddlTipo2 option:selected").attr("EsExterno") == "1" && $("#ddlTipo2 option:selected").attr("EsAutomatico") == "1") {
                esAutomatico = "true";
            }

            //ECONDEÑA  20160801
            var vcCodDom = -1;
            if (window.top.$("#hdfCodigoDominio").val() != "") {
                vcCodDom = window.top.$("#hdfCodigoDominio").val();
            }
            //ECONDEÑA  20160801

            //RURBINA - 20220718
            //debugger;
            //var Adjuntos = "";
            //if ($("#ifAdjuntoTicket").attr("src") == paginaUploadTicket) {
            //    Adjuntos = $("#ifAdjuntoTicket")[0].contentWindow.ObtenerArchivos();
            //}

            //debugger;

            //RURBINA - 20220718

            $.ajax({
                type: "POST",
                url: "AdmTck_RegistrarTicket.aspx/registrarTicket",
                data: "{'pUsuario': " + usuario.split('-')[0] + "," +
                           "'pUsuarioRegistro': " + ususarioRegistro + "," +
                           "'pMedioContacto': " + medioContacto + "," +
                           "'pTipificacion': " + tipificacion + "," +
                           "'pAsunto': '" + asunto + "'," +
                           "'pDescripcion': '" + descripcion + "'," +
                           "'pEsChat': false," +
                           "'pAsignarme': " + strAsignarme + "," +
                           "'pEsAutomatico': " + esAutomatico + "," +
                           "'pIdDominio': " + vcCodDom + "," +
                           "'vcAdj': '" + Adjuntos +"'}",
                // "'pIdDominio': '15'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var codTcket = result.d;

                    if (codTcket.split('|')[0] != 'OK') {
                        alert(codTcket.split('|')[2]);
                    }
                    else {

                        if ($("#hdfIdAtencion").val() != "0") {
                            CambiarEstadoAtencion(50, codTcket);
                        }
                        else {
                            alerta("Ticket registrado con código: " + codTcket.split('|')[1]);
                            //$("#txtUsuario").val("");
                            //$("#ddlTipo").val("-1");
                            $("#ddlTipo2").val("-1");
                            $("#ddlTipo2").change();
                            $("#ddlMedioContacto").val("-1");
                            $("#txtAsunto").val("");
                            $("#txtDescripcion").val("");
                            $("#txtAsunto").focus();
                        }
                        LimpiarListaAdjuntos(paginaUploadTicket);
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);

                }
            });
        });

        $("#btnBuscar").click(function () {
            var $width = 730;
            var $height = 455;
            var $Pagina = 'AdmTck_BuscarUsuario.aspx?esBuscarUsuario=1';
            $("#ifArea").attr("src", $Pagina);
            Modal = $('#dvArea').dialog({
                title: "Seleccionar usuario",
                width: $width,
                height: $height,
                modal: true,
                resizable: false
            });
        });

        $('#ddlTipo').change(function () {
            var tipo = $(this).val();
            if (tipo != "-1") {
                $("#txtAsunto").val($(this).find("option:selected").text());
            }
            else {
                $("#txtAsunto").val("");
            }
        });

        $('#ddlTipo2').change(function () {
            var tipo = $(this).val();

            if (tipo != "-1") {

                $.ajax({
                    type: "POST",
                    url: "AdmTck_RegistrarTicket.aspx/obtenerTipificacion",
                    data: "{'prIdTipo': '" + tipo + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        var options = [];
                        var i = 0;
                        for (i = 0; i < result.d.length; i++) {
                            options.push('<option value="',
                        result.d[i].P_inCod, '">',
                        result.d[i].Titulo, '</option>');
                        }

                        $("#ddlTipo").html(options.join(''));
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });

            }
            else {
                $("#ddlTipo").html('<option value="-1">---Seleccione----</option>');
                return;
            }

        });

        $("#txtAsunto,#txtDescripcion").live("keypress", function (e) {
            switch (e.keyCode) {
                case 168:
                    return true;
                case 33:
                    return true;
                case 63:
                    return true;
                case 173:
                    return true;
                case 13:
                    return true;
                case 191:
                    return true;
                case 161:
                    return true;
                default:
                    return ValidarAlfaNumericoConEspaciosYCaracteres(e);
            }
        });

        if ($("#hdfIdTecnico").val() == "-1") {
            $(".EsUsuario").css("display", "none");
        }

        $('#ddlTipo2').change();

        $("#btnCerrar").live("click", function () {
            window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
        });
    }

    function CambiarEstadoAtencion(IdEstado, codTcket) {
        BloquearPagina(true);

        if ($("#hdfIdAtencion").val() == "0") {
            alerta("El código de atención no es válido.");
            BloquearPagina(false);
            return;
        }

        var idTicket = parseInt(codTcket.split('|')[1].substr(3));

        $.ajax({
            url: "../Atenciones/ATE_Listado.aspx/CambiarEstadoAtencion", //PageMethod
            data: "{'IdAtencion':'" + $("#hdfIdAtencion").val() + "'," +
                  "'IdEstado':'" + IdEstado + "'," +
                  "'IdOperador':'" + "" + "'," +
                  "'IdVentanilla':'" + "" + "'," +
                  "'IdGenerado':'" + idTicket + "'}",
            dataType: "json",
            type: "post",
            contentType: "application/json; charset=utf-8",
            success: function (result) {

                Mensaje("<br/><h1>Ticket registrado con código: " + codTcket.split('|')[1] + ".</h1><br/>", document, CerroMensaje);
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });
    }

    function CerroMensaje() {
        BloquearPagina(false);
        Accord.tabs("remove", Accord.tabs("option", "selected"));
    }
    //debugger;
    //paginaUploadTicket = "../../General/Uploads/Upload.aspx";
    //$("#ifAdjuntoTicket").attr("src", paginaUploadTicket);
    //LimpiarListaAdjuntos(paginaUploadTicket);


    //debugger;
    var upload = new AjaxUpload('#UploadButton', {
        action: CarpetaDominio == '' ? '../SolicitudesAtencion/UploadHandler.ashx?dominio=-1' : '../SolicitudesAtencion/UploadHandler.ashx?dominio=' + CarpetaDominio,
        onComplete: function (file, response) {
            //debugger;
            try {
                if (response.indexOf('></pre>') >= 0) {
                    alerta("El tamaño del archivo supera el límite permitido.");
                }
                else {
                    $("<div class='imgBtn' style='margin-top:1px; height:21px;'><img src='../../Common/Images/remove.png' onclick=\"DeleteFile('" + response + "')\"/>&nbsp;&nbsp;&nbsp;<span id='filesubido' style='text-decoration:underline;' nombre='" + response + "'>" + response + "</span></div>").appendTo('#UploadedFile');
                    vcFileName = response;
                    $("#UploadButton").hide();
                }
            } catch (e) {
                alerta("Archivo incorrecto.");
            }
            Adjuntos = response + ":" + "0.1 Kb,";
        },
        onSubmit: function (file, ext) {
            //debugger;
            if (!(ext && /^(txt|doc|docx|xls|xlsx|pdf|jpg|jpeg|png)$/i.test(ext))) {
                alert('Formato inválido');
                return false;
            }
        }
    });

    $(upload._input).css("z-index", "99999999");


});

function usuarioElegido(usuarioElegido) {
    $('#txtUsuario').val(usuarioElegido);
}

function validarEspaciosEnBlancoAlInicio(id) {
    var valor = $("#" + id.toString() + "").val();
    $("#" + id.toString() + "").val($.trim(valor));
}

function LimpiarListaAdjuntos(paginaUploadTicket) {
    //var intervaloCargaUpload2;
    //intervaloCargaUpload2 = setInterval(function () { fnCargarUpload2(); }, 1000);
    //$("#ifAdjuntoTicket").hide();
    //function fnCargarUpload2() {
    //    try {
    //        if ($("#ifAdjuntoTicket").attr("src") == paginaUploadTicket) {
    //            $("#ifAdjuntoTicket")[0].contentWindow.CargarArchivos("");
    //            myStopFunction2();
    //        }
    //    }
    //    catch (Error) {
    //        //some error
    //    }
    //}
    //function myStopFunction2() {
    //    //alert('detenido2');
    //    $("#ifAdjuntoTicket").show();
    //    clearInterval(intervaloCargaUpload2);
    //    intervaloCargaUpload2 = null;
    //}
    try {
        var nombreFile = $("#filesubido").attr("nombre");
        DeleteFile(nombreFile);
    }
    catch {
    }
}

function MostrarConfirmacion(idFile, vcNomAdj) {
    if (idFile) {
        $('#divMsgConfirmacionDeleteFile').dialog({
            title: "Quitar Archivo",
            modal: true,
            buttons: {
                "Aceptar": function () {
                    $(this).dialog("close");
                    $("#ifAdjuntoTicket")[0].contentWindow.DeleteFileNew(vcNomAdj, idFile);
                },
                "Cancelar": function () {
                    $(this).dialog("close");
                }
            }
        });
    }
    else {
        alerta("Seleccione un Item");
    }
}


function DeleteFile(file) {
    //debugger;
    $.ajax({
        url: "../SolicitudesAtencion/UploadHandler.ashx?file=" + file + "&accion=delete",
        type: "GET",
        cache: false,
        async: true,
        success: function (html) {
            $('#UploadedFile').html("");
            $("#UploadButton").show();
            vcFileName = "";
            Adjuntos = "";
        }
    });
}
