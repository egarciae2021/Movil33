
$(function () {

    //    $("#txtnombre").keypress(ValidarAlfaNumericoConEspacios);
    //    $("#txtNombreFTP").keypress(ValidarAlfaNumericoConEspacios);
    //    $("#txtNombreUNC").keypress(ValidarAlfaNumericoConEspacios);
    //    $("#txtrutaBackup").keypress(ValidarAlfaNumericoConEspacios);
    //    $("#txtnombreArchivo").keypress(ValidarAlfaNumericoConEspacios);
    var $optPos = $('#ddlTipoExtraccion option[value="Por Posición"]');
    var $optPlong = $('#ddlTipoExtraccion option[value="Por Posición y longitud"]');
    var $optCol = $('#ddlTipoExtraccion option[value="Por Columna"]');
    var $ddlTipoExtraccion = $("#ddlTipoExtraccion");
    IniciarPagina();
    $(".btnNormal").button();

    var indiceTab = window.parent.tab.tabs("option", "selected");

    function IniciarPagina() {

        if ($("#hdfEstado").val() == '') {
            $("#hdfEstado").val("1");
            $("#trEstado").hide();
            $("#tdEstado").hide();
        }
        else {
            $("#trEstado").show();
            $("#tdEstado").show();
        }


        if ($("#ddlTipoFuente").val() == "-1") {
            $("#trTipoFuente").hide();
        } else {
            $("#trTipoFuente").show();
            if ($("#hdfTipoFuente").val() == "FTP") {
                $("#txtNombreUNC").hide();
                $("#txtNombreFTP").show();
            }
            if ($("#hdfTipoFuente").val() == "UNC") {
                $("#txtNombreUNC").show();
                $("#txtNombreFTP").hide();
            }
        }

        if ($("#hdfCodigo").val() != "") {
            if ($("#hdfTipoTipoArchivo").val() == "1") {
                $optPlong.hide();
                $optCol.show();
            }
            else {
                $optPlong.show();
                $optCol.hide();

            }
        }

    }

    $("#ddlTipoArchivo").on('change', function () {
        var TipoArchivo = $(this).val();
        if (TipoArchivo == "1") {
            $optPlong.hide();
            $optCol.show();
        }
        else if (TipoArchivo == "2") {
            $optPos.show();
            $optPlong.hide();
            $optCol.hide();
        }
        else {
            $optPlong.show();
            $optCol.hide();
            $optPos.hide();
        }
        $ddlTipoExtraccion.val("-1");
    });

    function BloquearPagina(bloqueado) {
        $(".btnNormal").button("option", "disabled", bloqueado);

        if (bloqueado) {
            $("input").attr("disabled", "disabled");
            $("select").attr("disabled", "disabled");
        }
        else {
            $("input").removeAttr("disabled");
            $("select").removeAttr("disabled");
        }
    }

    $("#chActivo").bind('change', function () {
        if ($(this).is(":checked")) {
            $("#hdfEstado").val("1");
        }
        else {
            $("#hdfEstado").val("0");
        }
    });

    $("#ddlTipoFuente").bind('change', function () {
        if ($(this).val() == "-1") {
            $("#trTipoFuente").hide();
        } else {
            if ($(this).val() == "1") {
                $("#trTipoFuente").show();
                $("#txtNombreFTP").show();
                $("#txtNombreUNC").hide();
            } else {
                if ($(this).val() == "2") {
                    $("#trTipoFuente").show();
                    $("#txtNombreUNC").show();
                    $("#txtNombreFTP").hide();
                }
            }
        }
    });


    function CerroMensaje() {
        BloquearPagina(false);
        if ($("#hdfCodigo").val() == "") {
            $("#txtnombre").val("");
            $("#ddlTipoFuente").val("-1");
            $("#txtNombreFTP").val("");
            $("#txtNombreUNC").val("");
            $("#ddlTipoArchivo").val("-1");
            $("#ddlTipoExtraccion").val("-1");
            $("#chAcceso").attr('checked', false);
            $("#txtrutaBackup").val("");
            $("#txtnombreArchivo").val("");
            $("#hdfEstado").val("1");
            $("#hdfCodigoTipoFuente").val("");
            $("#hdfTipoFuente").val("");
            $("#hdfCodigoFuente").val("");
            $("#txtrutaerrores").val("");
            $("#txtrutalog").val("");
        }
        else {
            window.parent.tab.tabs("remove", indiceTab);
        }
    }

    $("#btnCerrar").live("click", function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });

    $("#txtnombreArchivo").on("input", function () {
        if ($("#chkFormato").is(':checked')) {
            $("#lblNomArchivoExp").text(CambiarNombreArchivo(this.value, true));
            $("#lblNomArchivoImp").text(CambiarNombreArchivo(this.value, true));
        } else {
            $("#lblNomArchivoExp").text(this.value);
            $("#lblNomArchivoImp").text(this.value);
        }

    });

    $("#btnGuardar").live("click", function () {
        var Codigo = $("#hdfCodigo").val();
        var Nombre = $("#txtnombre").val().replace(/'/g, "&#39").replace(/\\/g, "&#92");
        var IdConfigFuente = $("#hdfCodigoTipoFuente").val().replace(/'/g, "&#39").replace(/\\/g, "&#92");
        var TipoArchivo = $("#ddlTipoArchivo").val().replace(/'/g, "&#39").replace(/\\/g, "&#92");
        var TipoExtraccion = $("#ddlTipoExtraccion").val().replace(/'/g, "&#39").replace(/\\/g, "&#92");
        var Acceso = $("#chAcceso").is(":checked");
        var RutaBackup = $("#txtrutaBackup").val().replace(/'/g, "&#39").replace(/\\/g, "&#92");
        var NombreArchivo = $("#txtnombreArchivo").val().replace(/'/g, "&#39").replace(/\\/g, "&#92");
        var IdCFuente = $("#hdfCodigoFuente").val().replace(/'/g, "&#39").replace(/\\/g, "&#92");
        var rutaErrores = $("#txtrutaerrores").val().replace(/'/g, "&#39").replace(/\\/g, "&#92");
        var rutaLog = $("#txtrutalog").val().replace(/'/g, "&#39").replace(/\\/g, "&#92");

        var formatoArchivo = $("#chkFormato").is(":checked");
        var btHistorico = $("#chkHistorico").is(":checked");

        //        if ($("#chkFormato").is(":checked")) {
        //            var x = NombreArchivo.lastIndexOf(".");
        //            if (x < 0) {
        //                $("#txtnombre").focus();
        //                alerta("Ingrese la extensión del archivo");
        //                return;
        //            }
        //            var ext = NombreArchivo.substring(NombreArchivo.lastIndexOf("."));
        //            var pos = NombreArchivo.indexOf("_");
        //            NombreArchivo = NombreArchivo.substring(0, pos) + ext;
        //            $("#lblNomArchivoExp").text(NombreArchivo);
        //            $("#lblNomArchivoImp").text(NombreArchivo);
        //        }

        if ($.trim(Nombre) == "") {
            alerta("El nombre de la Fuente Archivo es un campo obligatorio");
            $("#txtnombre").focus();
            return;
        }



        if ($("#ddlTipoFuente").val() == "-1") {
            alerta("Seleccione un Tipo de Fuente");
            return;
        } else {
            if ($.trim(IdConfigFuente) == "") {
                alerta("El nombre del Tipo de Fuente es un campo obligatorio");
                return;
            }
        }

        if ($("#ddlTipoArchivo").val() == "-1") {
            alerta("Seleccione Tipo de Archivo");
            return;
        }

        if ($("#ddlTipoExtraccion").val() == "-1") {
            alerta("Seleccione tipo de Extraccion");
            return;
        }

        if ($.trim(RutaBackup) == "") {
            alerta("La ruta backup es un campo obligatorio");
            $("#txtrutaBackup").focus();
            return;
        }

        if ($.trim(rutaErrores) == "") {
            alerta("La ruta errores es un campo obligatorio");
            $("#txtrutaerrores").focus();
            return;
        }

        if ($.trim(rutaLog) == "") {
            alerta("La ruta log es un campo obligatorio");
            $("#txtrutalog").focus();
            return;
        }

        if ($.trim(NombreArchivo) == "") {
            alerta("El nombre del Archivo es un campo obligatorio");
            $("#txtnombreArchivo").focus();
            return;
        }

        if (NombreArchivo.length < 3) {
            alerta("El longitud del nombre del archivo no corresponde al mínimo requerido");
            $("#txtnombre").focus();
            return;
        }

        if (NombreArchivo.length > 50) {
            alerta("El longitud del nombre del archivo es demasiado extenso");
            $("#txtnombre").focus();
            return;
        }

        if (NombreArchivo.lastIndexOf(".") < 0) {
            alerta("La extensión del nombre del Archivo es un campo obligatorio: .txt , .csv , .xls, .xlsx");
            $("#txtnombreArchivo").focus();
            return;
        }
        var extension = NombreArchivo.substring(NombreArchivo.lastIndexOf("."));

        if (extension.length < 4) {
            alerta("La extensión del nombre del Archivo es un campo obligatorio: .txt , .csv , .xls .xlsx");
            $("#txtnombreArchivo").focus();
            return;
        }

        if (extension != ".txt" && extension != ".csv" && extension != ".xls" && extension != ".xlsx") {
            alerta("La extensión del nombre del archivo es incorrecto, ingrese cualquiera de estos formatos: .txt , .csv , .xls, .xlsx");
            $("#txtnombreArchivo").focus();
            return;
        } else {
            if (TipoArchivo == "1" && (extension != ".xls" && extension != ".xlsx")) {
                alerta("El formato de archivo es tipo excel, la extensión del archivo es incorrecta.");
                $("#txtnombreArchivo").focus();
                return;
            } else if (TipoArchivo == "2" && extension != ".csv") {
                alerta("El tipo de archivo es de formato csv, la extensión del archivo es incorrecta.");
                $("#txtnombreArchivo").focus();
                return;
            } else if (TipoArchivo == "3" && extension != ".txt") {
                alerta("El tipo de archivo es de formato plano, la extensión del archivo es incorrecta.");
                $("#txtnombreArchivo").focus();
                return;
            }
        }
        $("#dvCargando").show();

        $.ajax({
            type: "POST",
            url: "Mnt_FuenteArchivo.aspx/Guardar",
            data: "{'pCod': '" + Codigo + "'," +
                    "'pNom': '" + Nombre + "'," +
                    "'pIdConfig': '" + IdConfigFuente + "'," +
                    "'pTipoArchivo': '" + TipoArchivo + "'," +
                    "'pTipoExtraccion': '" + TipoExtraccion + "'," +
                    "'pAcceso': '" + Acceso + "'," +
                    "'pRutaBackup': '" + RutaBackup + "'," +
                    "'pNombreArchivo': '" + NombreArchivo + "'," +
                    "'pIdConfigFuente': '" + IdCFuente + "'," +
                    "'pRutaErrores': '" + rutaErrores + "'," +
                    "'pRutaLog': '" + rutaLog + "'," +
                    "'btVig': '" + parseInt($("#hdfEstado").val()) + "'," +
                    "'pFormatoFec':'" + formatoArchivo + "', 'pHistorico':'" + btHistorico + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                $("#dvCargando").hide();
                if (msg.d == "1" || msg.d == "0") {
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><h1>Fuente Archivo guardado</h1><br/>", document, CerroMensaje);
                }
                else {
                    if (msg.d == "2") {
                        alerta("El nombre de la Fuente Archivo ya esta siendo usado, no se pudo grabar el registro");
                        BloquearPagina(false);
                    }
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

    if ($("#txtNombreFTP").length > 0) {

        $("#txtNombreFTP").autocomplete({
            minLength: 0,
            source: function (request, response) {
                $.ajax({
                    type: "POST",
                    url: "Mnt_FuenteArchivo.aspx/Listar_TipoFuente_FTP",
                    data: "{'nombre': '" + $("#txtNombreFTP").val().replace(/'/g, "&#39").replace(/"/g, "&#34") + "'," +
                           "'idCliente': '" + window.parent.parent.parent.idCliente + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        response($.map(result.d, function (item) {
                            return {
                                label: item.Nombre,
                                cod_Fuente: item.IdConfigTipoFuente
                            };
                        }));
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },
            focus: function (event, ui) {
                $("#txtNombreFTP").val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                $("#txtNombreFTP").val(ui.item.label);
                $("#hdfCodigoTipoFuente").val(ui.item.cod_Fuente);
                return false;
            }
        })
        .data("autocomplete")._renderItem = function (ul, item) {
            return $("<li></li>")
			    .data("item.autocomplete", item)
			    .append("<a>" + item.cod_Fuente + "=" + item.label + "</a>")
			    .appendTo(ul);
        };
    }

    if ($("#txtNombreUNC").length > 0) {

        $("#txtNombreUNC").autocomplete({
            minLength: 0,
            source: function (request, response) {
                $.ajax({
                    type: "POST",
                    url: "Mnt_FuenteArchivo.aspx/Listar_TipoFuente_UNC",
                    data: "{'nombre': '" + $("#txtNombreUNC").val().replace(/'/g, "&#39").replace(/"/g, "&#34") + "'," +
                           "'idCliente': '" + window.parent.parent.parent.idCliente + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        response($.map(result.d, function (item) {
                            return {
                                label: item.Nombre,
                                cod_Fuente: item.IdConfigTipoFuente
                            };
                        }));
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },
            focus: function (event, ui) {
                $("#txtNombreUNC").val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                $("#txtNombreUNC").val(ui.item.label);
                $("#hdfCodigoTipoFuente").val(ui.item.cod_Fuente);
                return false;
            }
        })
        .data("autocomplete")._renderItem = function (ul, item) {
            return $("<li></li>")
			    .data("item.autocomplete", item)
			    .append("<a>" + item.cod_Fuente + "=" + item.label + "</a>")
			    .appendTo(ul);
        };
    }

    $("#chkFormato").change(function () {

        var valor = $("#txtnombreArchivo").val();
        var nombre;
        if ($(this).is(':checked')) {
            var x = $("#txtnombreArchivo").val();

            if (x.lastIndexOf(".") > 0 && x != "") {
                nombre = CambiarNombreArchivo(valor, true);
                //                $("#txtnombreArchivo").val(nombre);
            } else {
                $("#txtnombreArchivo").val("");
                $("#txtnombreArchivo").focus();
                $(this).prop('checked', false);
                return;
            }

        }
        else {
            //nombre = CambiarNombreArchivo(valor, false);
            nombre = $("#txtnombreArchivo").val();
            //            $("#txtnombreArchivo").val(nombre);
        }
        $("#lblNomArchivoExp").text(nombre);
        $("#lblNomArchivoImp").text(nombre);
    });

});

function CambiarNombreArchivo(valor, band) {
    var ext = valor.substring(valor.lastIndexOf("."));
    var pos, nombre, nuevoNombre;
    if (band) {
        var res = valor.replace(ext, '');
        pos = valor.indexOf(".");
        nombre = valor.substring(0, pos);

        var d = new Date();
        var dia = d.getDate();
        var mes = (d.getMonth() + 1);
        var anho = d.getFullYear();

        var len = mes.toString();
        if (dia.toString().length < 2) {dia = "0" + dia;  } //Agregado jcamacho 2015/10/06
        if (len.length < 2) { mes = "0" + mes; }
        nuevoNombre = res + "_" + anho + mes + dia + ext;
    } else {
        pos = valor.indexOf("_");
        nombre = valor.substring(0, pos);
        nuevoNombre = nombre + ext;
    }
    return nuevoNombre;
}
