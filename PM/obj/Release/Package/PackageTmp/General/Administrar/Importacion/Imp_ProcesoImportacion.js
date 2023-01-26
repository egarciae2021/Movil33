var oCulturaUsuario;
var FormatoFechaCulturaForDatePicker = "";
var valor = "Origen Q15";

var archivo = 0;
var Selecciono = false;

var tabDetalle;
var lista;
var success;
var codConfig;

var CarpetaDominio;

function CerroMensajeGuardar() {
    if ($("input[name='rbProgramacion']:checked").val() == "1") {
        window.parent.VisorTareas();
    }
}

var nomArch;

function EventosUpdatePanel() {
    
    $('#fulArchivo').MultiFile({
        accept: $("#hdfExt").val(),
        max: 1,
        list: '#dvArchivos',
        STRING: {
            remove: 'Remover',
            selected: 'Selecionado: $file',
            denied: 'Tipo de archivo invalido $ext!',
            duplicate: 'Archivo ya seleccionado:\n$file!'
        },
        onFileSelect: function(element, value, master_element) {
        },
        onFileAppend: function(element, value, master_element) {
        },
        afterFileAppend: function(element, value, master_element) {
        },
        afterFileSelect: function (element, value, master_element) {

            $("#dvArchivos").show();
        },
        onFileRemove: function (element, value, master_element) { },
        afterFileRemove: function (element, value, master_element) {
            if ($('.MultiFile-label').length == 0) {
                $("#dvArchivos").hide();
            }
        }
    });

    $.fn.MultiFile.options.accept = $("#hdfExt").val();

    $("select").addClass("ui-widget-content ui-corner-all");
    $("select").css("padding", "4px");

    $("input:text").addClass("ui-widget-content ui-corner-all");
    $("input:text").css("padding", "4px");

    $("textarea").addClass("ui-widget-content ui-corner-all");
    $("textarea").css("padding", "4px");

    $("input:checkbox").addClass("ui-widget-content ui-corner-all");
    $("input:checkbox").css("padding", "4px");

    $(".lblNormal").addClass("ui-widget-content ui-corner-all");
    $(".lblNormal").css("padding", "4px");

    $(".dvPanel").addClass("ui-widget-content ui-corner-all");
    $(".dvPanel").css("padding", "10px");
    $(".dvPanel").css("background-image", "none");


    if ($("input[name='rbProgramacion']:checked").val() == "1") {
        $(".k-datetimepicker.DATETIME").css("display", "");
    }
}

$(function () {
    CarpetaDominio = window.top.$("#hdfCodigoDominio").val() != '' ? '/' + window.top.$("#hdfCodigoDominio").val() : '';
    
    $(window).resize(function () {
        DimPosElementos();

        $(".CONSULTAS").each(function () {
            $(this)[0].width = $(window).width() - 27;
            $(this)[0].height = $(window).height() - 65;
        });
    });

    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        var AnchoLateral = $(".LateralSplitter");
        $(".tabs").css({ height: Alto - 125, width: Ancho - AnchoLateral });
        $(".tabHijo").css({ height: Alto - 95, width: Ancho - 560 });
        $(".ifContenido").css({ height: Alto - 71, width: Ancho - 262 });
        $("#dvContAcordeon").css({ height: Alto - 70, width: Ancho - 160 });
    }

    DimPosElementos();

    tabDetalle = $("#TabDetalle").tabs({
        tabTemplate: "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close'>Remover Tab</span></li>",
        //fx: { height: 'toggle', duration: 800 },
        add: function (event, ui) {
            var ifra = document.createElement('IFRAME');
            var Ancho = $(window).width();
            var Alto = $(window).height();
            ifra.width = Ancho - 27;
            ifra.height = Alto - 65;
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
            ifra.className = "SinBordes CONSULTAS";
            $(ui.panel).append(ifra);
            $(this).tabs('select', '#' + ui.panel.id);
            pagina = "";
        }
    });


    $("#TabDetalle span.ui-icon-close").live("click", function () {
        var index = $("li", tabDetalle).index($(this).parent());
        tabDetalle.tabs("remove", index);
    });

    $(".uploader").css("width", "280px");
    $(".filename").css("width", "175px");



    oCulturaUsuario = window.top.oCulturaUsuario;
    FormatoFechaCulturaForDatePicker = oCulturaUsuario.vcFecCor.toLowerCase();

    if (FormatoFechaCulturaForDatePicker.indexOf("yyyy") >= 0) {
        FormatoFechaCulturaForDatePicker = FormatoFechaCulturaForDatePicker.replace("yyyy", "yy");  //Para datepicker 'yy' es como 'yyyy'; y 'y' es 'yy'
    }
    else if (FormatoFechaCulturaForDatePicker.indexOf("yy") >= 0) {
        FormatoFechaCulturaForDatePicker = FormatoFechaCulturaForDatePicker.replace("yy", "y");
    }

    Inicio();

    function Inicio() {
        $("#BarraNavegacionJQ1_Panel1_O").css("padding-top", "5px");
        $("#BarraNavegacionJQ1_Panel1_O").css("padding-bottom", "5px");

        $("#BarraNavegacionJQ1_Panel2_O").css("padding-top", "0px");
        $("#BarraNavegacionJQ1_Panel2_O").css("padding-bottom", "0px");

        $("#BarraNavegacionJQ1_Panel3_O").css("padding-top", "10px");
        $("#BarraNavegacionJQ1_Panel3_O").css("padding-bottom", "10px");

        $("#btnGuardarSer").hide();
        //        $("#btnGuardar").hide();
        $("#btnGuardar").button("option", "disabled", true);

        $("#txtFechaProgramacion").keydown(function (event) {
            if (event.keyCode == 13) {
                event.preventDefault();
            }
        });

    }

    //    EventosUpdatePanel();

    $(".btnNormal").button({});

    $(".DATETIME").removeClass("ui-widget-content ui-corner-all");
    $(".DATETIME").css("padding", "0px");
    $(".DATETIME").css("margin", "0px");
    $(".DATETIME").kendoDateTimePicker({
        culture: "es-ES",
        animation: false,
        format: "dd/MM/yyyy HH:mm",
        interval: 60
    });

    if ($("input[name='rbProgramacion']:checked").val() == "1") {
        $(".k-datetimepicker.DATETIME").css("display", "");
    } else {
        $(".k-datetimepicker.DATETIME").css("display", "none");
    }

    var fechaIni = $("#txtFechaProgramacion").data("kendoDateTimePicker");
    fechaIni.min(new Date());

    $(".MESANHO").removeClass("ui-widget-content ui-corner-all");
    $(".MESANHO").css("padding", "0px");
    $(".MESANHO").css("margin", "0px");
    $(".MESANHO").kendoDatePicker({
        culture: "es-ES",
        animation: false,
        start: "year",
        depth: "year",
        format: "MM/yyyy"
    });

    ValidarNumeroEnCajaTexto("txtTipoCambio", ValidarDecimalPositivo, oCulturaUsuario, false);

    $("#rbProgramacion").change(function () {
        var valor = $("input[name='rbProgramacion']:checked").val();
        if (valor == "0") {
            $(".k-datetimepicker.DATETIME").css("display", "none");
            $("#txtFechaProgramacion").val("");
        }
        else if (valor == "1") {
            $(".k-datetimepicker.DATETIME").css("display", "");
        }
    });

    $("#ddlProcesoOrigen").change(function () {
        if ($("#ddlProcesoOrigen").val() != '-1') {
            $.ajax({
                type: "POST",
                url: "Imp_ProcesoImportacion.aspx/MostrarPlantilla",
                data: "{'cod': '" + $("#ddlProcesoOrigen").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {

                    if ($(result.d).length > 0) {
                        $("#txtPlantilla").val(result.d.Nombre.toString());
                        $("#hdfIdPlantilla").val(result.d.IdPlantilla.toString());
                        $("#txtPlantilla").attr("disabled", "disabled");

                        ObtenerFuenteArchivo($("#ddlProcesoOrigen").val());
                    }

                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        } else {
            $("#txtPlantilla").val("");
            $("#hdfIdPlantilla").val("");
        }
    });

    if (valor == 'Origen Q15') {
        CargarCombos('Origen', valor);
        CargarCombos('Destino', valor);
    }

    $("#btnGuardar").click(function () {

        var oProceso = new Proceso();
        oProceso.IdOperador = $("#ddlOperador").val();
        oProceso.InProg = $("input[name='rbProgramacion']:checked").val();
        oProceso.IdTarea = 1;

        var Files = "";
        Files = nomArch;

        var vcProgramacion;
        if ($("input[name='rbProgramacion']:checked").val() == "1") {

            vcProgramacion = $("#txtFechaProgramacion").val().replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g, "");

            if ($.trim(vcProgramacion) == "") {
                alerta("Ingrese una fecha y hora en la que se va a ejecutar la tarea");
                $("#txtFechaProgramacion").focus();
                return;
            }
            if (vcProgramacion.length < 16 || vcProgramacion.split("/").length != 3 || vcProgramacion.split(":").length != 2 || vcProgramacion.split(" ").length != 2) {
                alerta("La fecha de programación no tiene el formato correcto dd/MM/yyyy HH:mm.");
                $("#txtPeriodo").focus();
                return;
            }

            dPro = vcProgramacion.substr(0, 2);
            mPro = vcProgramacion.substr(3, 2);
            yPro = vcProgramacion.substr(6, 4);
            hPro = vcProgramacion.substr(11, 2);
            miPro = vcProgramacion.substr(14, 2);
            if (!checkdate(mPro, dPro, yPro, hPro, miPro)) {
                alerta("La fecha de programación es inválida.");
                return;
            }
            oProceso.FechaProceso = mPro + "/" + dPro + "/" + yPro + " " + hPro + ":" + miPro + ":00";
        }

        if ($("#ddlOperador").val() == "-1") {
            alerta("Seleccione un operador");
            $("#ddlOperador").focus();
            return;
        } else {
            $("#hdfIdOperador").val($("#ddlOperador").val());
        }

        if ($("#ddlProcesoOrigen").val() == "-1") {
            alerta("Seleccione la configuración");
            $("#ddlProcesoOrigen").focus();
            return;
        }

        if ($("#ddlProcesoDestino").val() == "-1") {
            alerta("Seleccione la configuración");
            $("#ddlProcesoDestino").focus();
            return;
        }

        if (success != 0) {
            alerta("Debe seleccionar un archivo a procesar");
            return;
        }
        if (Files == "") {
            alerta("Debe seleccionar un archivo a procesar");
            return;
        }
        if (nomArch != "") {
            $("#hdfNomArchivo").val(nomArch);
        }

        var p_band;
        if ($('#chkBandEmpl').is(':checked')) {
            p_band = true;
        } else {
            p_band = false;
        }

        var p_elimCta;
        if ($('#chkElimCuentas').is(':checked')) {
            p_elimCta = true;
        } else {
            p_elimCta = false;
        }

        var objProceso = JSON.stringify(oProceso);
        $.ajax({
            type: "POST",
            url: "Imp_ProcesoImportacion.aspx/Guardar",
            data: "{'idConfig': '" + $("#ddlProcesoOrigen").val() + "'," +
                  "'objProceso': '" + objProceso + "'," +
                  "'nomArch':'" + nomArch + "'," +
                  "'btEliCta':'" + p_elimCta + "'," +
                "'p_band':'" + p_band + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == "") {
                    Mensaje("<br/><h1>Proceso guardado</h1><h2><br>Se ha puesto en cola esta tarea, véala en el visor de tareas</h2><br/>", document, CerroMensajeGuardar);

                    LimpiarControles();
                    //                    EventosUpdatePanel();
                } else if (result.d == "1") {
                    alerta("El archivo agregado es diferente al que se configuró, en Proceso de Importación (Configuración/Proceso de Importación/Fuente Archivo)");
                } else if (resilt.d == "2") {
                    alerta("No se encontró el archivo. No se logró registrar la cola.");
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });

    });

    $("#btnCerrar").click(function () {
        window.parent.tabOpciones.tabs("remove", window.parent.tabOpciones.tabs("option", "selected"));
    });

    $("#ddlProcesoOrigen").change(function () {
        if ($(this).val() != '-1') {
            $("#ifrmCargar").show();
            $("#lblMsj").hide();
        } else {
            $("#lblMsj").show();
            $("#ifrmCargar").hide();
            $("#txtPlantilla").val("");
            $("#hdfIdPlantilla").val("");
            $("#hdfCodConfigProc").val("");
            $("#hdfNomArchivo").val("");
            $("#btnGuardar").hide();
        }
    });

    cargaArchivo();

});

function NombreArchivo(nomb) {
    nomArch = nomb;
    $("#dvArchivos").show();
    $("#lblArchivoTitulo").text("Archivo: " + nomb);
}

function CargarCombos(tipo, valor) {
    
    $.ajax({
        type: "POST",
        url: "Imp_ProcesoImportacion.aspx/ListarTipoProcesos",
        data: "{'p_tipo': '" + tipo + "', 'p_valor': '" + valor + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            if ($(result.d).length > 0) {
                if (tipo == 'Origen') {
                    $("#ddlProcesoOrigen").append($("<option></option>").attr("value", -1).text("<< Seleccione >>"));
                    $(result.d).each(function () {
                        $("#ddlProcesoOrigen").append($('<option></option>').val(this.IdConfigProceso).html(this.Descripcion));
                    });
                }else if (tipo == 'Destino') {
                    $("#ddlProcesoDestino").append($("<option></option>").attr("value", -1).text("<< Seleccione >>"));
                    $(result.d).each(function () {
                        $("#ddlProcesoDestino").append($('<option></option>').val(this.IdConfigProceso).html(this.Descripcion));
                    });
                }
            }

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function checkdate(m, d, y, h, mi) {
    return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && h >= 0 && h < 24 && mi >= 0 && mi < 60 && d <= (new Date(y, m, 0))
    .getDate();
}

function checkperiodo(m, y) {
    if (m > 0 && m < 13 && y > 0 && y < 32768) {
        var d = new Date();
        return d.getDate();
    }
}

function ObtenerFuenteArchivo(cod) {
    $.ajax({
        type: "POST",
        url: "Imp_ProcesoImportacion.aspx/ObtenerFuenteArchivo",
        data: "{'cod': '" + cod + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if ($(result.d).length > 0) {
                $("#hdfExt").val(result.d.Extension.toString());
                $("#hdfCodConfigProc").val(cod);
                codConfig = cod;
            } else {
                $("#hdfExt").val("");
                $("#hdfCodConfigProc").val("");
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function cargaArchivo() {

    var $pagina = raiz("General/Administrar/Importacion/Imp_CargarArchivo.aspx?nombArch=" + nomArch + "&ExtPer=" + $("#hdfExtPer").val());

    $("#ifCargarArchivo").attr("src", $pagina);
}

function AbrirTab(tab, id, Titulo, h, w) {

    var $panel = tab.find(id);
    if (!$panel.length) {//En el caso que no exista el tab, lo crea
        tab.tabs("add", id, Titulo);
        $(id).css("width", "99%");
        $(id).css("height", "92%");
        $(id).css("margin-top", "0px");
        $(id).css("margin-left", "0px");
        $(id).css("margin-bottom", "0px");
        $(id).css("margin-right", "0px");
        $(id).css("padding-top", "0px");
        $(id).css("padding-left", "0px");
        $(id).css("padding-bottom", "0px");
        $(id).css("padding-right", "0px");
    }
    else {//En el caso que exista lo muestra
        tab.tabs('select', id);
    }

}

function Ejecutar() {
    if ($("#ddlOperador").val() == "-1") {
        alerta("Seleccione un operador");
        $("#ddlOperador").focus();
        return;
    }

    if ($("#ddlProcesoOrigen").val() == "-1") {
        alerta("Seleccione la configuración");
        $("#ddlProcesoOrigen").focus();
        return;
    }

    if (nomArch == "" || nomArch == null) {
//        alerta("Seleccione un archivo");
        $("#btnGuardar").button("option", "disabled", true);

        tabDetalle.tabs("remove", 1);

        return;
    }

    var idPlantilla = $("#hdfIdPlantilla").val();
    LeerArchivo(nomArch, idPlantilla);
}

function LeerArchivo(vcFileName, idPlantilla) {
    var Ancho = $(window).width();
    var Alto = $(window).height();

    $.ajax({
        type: "POST",
        url: "Imp_ProcesoImportacion.aspx/LeerArchivo",
        data: "{'archConExt': '" + vcFileName + "', 'idPlantilla':'" + idPlantilla + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if ($(result.d).length > 0) {
                lista = [];
                var i = 0;
                for (i = 0; i < $(result.d).length; i++) {
                    lista[i] = $(result.d)[i].toString();
                }
                $("#dvVentana").show();

                pagina = "Imp_CrearCuenta.aspx?lista=" + lista;
                AbrirTab(tabDetalle, "#TabCuenta", "Crear cuenta", Alto - 95, Ancho - 150);


            } else {
                $("#dvVentana").hide();
                success = 0;
                MostrarGrabar();
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function MostrarGrabar() {
    $("#btnGuardar").button("option", "disabled", false);
//    tabDetalle.tabs("remove", 1);
    tabDetalle.tabs("option", "selected", 0);
}

function Proceso(IdOperador, InProg, IdTarea, FechaProceso) {
    this.IdOperador = IdOperador;
    this.InProg = InProg;
    this.IdTarea = IdTarea;
    this.FechaProceso = FechaProceso;
    this.Archivos = [];
}

function LimpiarControles() {
    $("#ddlOperador").val("-1");
    $("#ddlProcesoOrigen").val("-1");
    $("#ddlProcesoDestino").val("-1");
    $("#txtPlantilla").val("");
    $("#hdfIdPlantilla").val("");
    $("#hdfCodConfigProc").val("");
    $("#hdfNomArchivo").val("");
    $("#hdfRuta").val("");
    $("#hdfIdOperador").val("");
    $("#hdfIdProg").val("");
    $('input[name="rbProgramacion"][value="0"]').prop('checked', true);
    $("#txtFechaProgramacion").val("");
    $("#btnGuardar").button("option", "disabled", true);
    $(".k-datetimepicker.DATETIME").css("display", "none");

//    var $f = $("#ifCargarArchivo");
//    $f[0].contentWindow.LimpiarControles();  //works
    window.location.href = "Imp_ProcesoImportacion.aspx";
}