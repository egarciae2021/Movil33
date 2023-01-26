var btCuentaMultiple = false;
var listaArchivos = [];
var renderListaArchivos, enviarArchivosParaImportar;
var Passwords = "";
var Cuentas = "";

function ENT_MOV_IMP_Plantilla() {
    this.PlantillaDetalles = new ENT_MOV_IMP_PlantillaDetalle();
}
function ENT_MOV_IMP_PlantillaDetalle(btTipCam, vcExtDef) {
    this.btTipCam = btTipCam;
    this.vcExtDef = vcExtDef;
    this.PlantillaCampo = new ENT_MOV_IMP_Campo();
}
function ENT_MOV_IMP_Campo(P_inCodCam) {
    this.P_inCodCam = P_inCodCam;
}

function CerroMensajeGuardar() {
    if ($("input[name='rbProgramacion']:checked").val() == "1") {
        window.parent.VisorTarea();
    }

    if ($("#ddlOperador option").length == 2) {
        $("#ddlOperador").prop("selectedIndex", 1);
        $("#ddlOperador").attr('disabled', true);
        $("#ddlOperador").change();
    }
    //alert(1);
    //GuardarPerfil(true);
}
var Selecciono = false;
var archivo = 0;

function EventosUpdatePanel() {
    $("#ddlPlantilla").change(function () {
    });
    $("#ddlServicioDefecto").change(function () {
    });

    var Extension = $('#txtExtension').val();
    if (Extension.toLowerCase() == "xls") {
        Extension = "xlsm";
    }
    else {
        Extension = "" + Extension.toLowerCase();
    }

    //$('#fulArchivo').MultiFile({
    //    accept: Extension,
    //    max: 20,
    //    max_size: 1,
    //    list: '#dvArchivos',
    //    STRING: {
    //        remove: 'Quitar',
    //        selected: 'Selecionado: $file',
    //        denied: 'Tipo de archivo invalido $ext!. Sólo se considera: ' + Extension,
    //        duplicate: 'Archivo ya seleccionado:\n$file!'
    //    },
    //    onFileSelect: function (element, value, master_element) { },
    //    onFileAppend: function (element, value, master_element) { },
    //    afterFileAppend: function (element, value, master_element) { },
    //    afterFileSelect: function (element, value, master_element) {

    //        var aleatorio = Math.floor((Math.random() * 10000) + 1).toString();
    //        var idRemove = "remove_" + aleatorio.toString();
    //        var idCuentaArchivo = 'txtCuentaArchivo_' + aleatorio.toString();

    //        if (element.files.length > 1) {

    //            $('div.MultiFile-label').last().remove();

    //            var CuerpoHtml = '<div class="MultiFile-label" style="margin-top: 10px;">';
    //            CuerpoHtml += '     <a id="' + idRemove + '" class="MultiFile-remove" href="#fulArchivo">Quitar</a> ';
    //            CuerpoHtml += '     <span>';
    //            CuerpoHtml += '         <span class="MultiFile-label" title="File selected: ' + value + '" style="margin-top: 10px;">';
    //            if (!btCuentaMultiple) {
    //                CuerpoHtml += '             <input id="' + idCuentaArchivo + '" class="ui-widget-content ui-corner-all txtCuentaArchivo" type="text" style="padding:4px;"/>&nbsp;&nbsp;&nbsp;';
    //            }
    //            CuerpoHtml += '             <input class="ui-widget-content ui-corner-all txtPassword" type="password" style="padding:4px;">&nbsp;&nbsp;&nbsp;';
    //            CuerpoHtml += '             <span class="MultiFile-title">' + value + '</span>';
    //            CuerpoHtml += '         </span>';
    //            CuerpoHtml += '     </span>';
    //            CuerpoHtml += '</div>';

    //            $("#dvArchivos").append(CuerpoHtml);
    //            $("#" + idRemove).click(function () {
    //                $(this).parent().remove();
    //            });

    //        }
    //        else {
    //            $('.MultiFile-label:last').prepend('<input class="ui-widget-content ui-corner-all txtPassword" type="password" style="padding:4px;"/>&nbsp;&nbsp;&nbsp;');
    //            if (!btCuentaMultiple) {
    //                $('.MultiFile-label:last').prepend('<input id="' + idCuentaArchivo + '" class="ui-widget-content ui-corner-all txtCuentaArchivo" type="text" style="padding:4px;"/>&nbsp;&nbsp;&nbsp;');
    //            }
    //            else {
    //                $("#tdCuentaArchivo").hide();
    //            }
    //        }


    //        if (!btCuentaMultiple) {
    //            if ($("#" + idCuentaArchivo).length > 0) {
    //                $("#" + idCuentaArchivo).autocomplete({
    //                    minLength: 0,
    //                    source: function (request, response) {
    //                        var data = {
    //                            vcCodNom: $("#" + idCuentaArchivo).val().replace(/'/g, "&#39").replace(/\\/g, "&#92"),
    //                            inMaxFilMos: 10,
    //                            inCodOpe: $("#ddlOperador").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92")
    //                        };
    //                        $.ajax({
    //                            type: "POST",
    //                            url: "Imp_Proceso.aspx/ListarCuentaxOperador",
    //                            data: JSON.stringify(data),
    //                            contentType: "application/json; charset=utf-8",
    //                            dataType: "json",
    //                            success: function (result) {
    //                                response($.map(result.d, function (item) {
    //                                    return {
    //                                        label: item.vcNom.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'),
    //                                        P_vcCod: item.P_vcCod
    //                                    };
    //                                }));
    //                            },
    //                            error: function (xhr, err, thrErr) {
    //                                MostrarErrorAjax(xhr, err, thrErr);
    //                            }
    //                        });
    //                    },
    //                    focus: function (event, ui) {
    //                        $("#" + idCuentaArchivo).val(ui.item.label);
    //                        return false;
    //                    },
    //                    select: function (event, ui) {
    //                        Selecciono = true;
    //                        //pais
    //                        $("#" + idCuentaArchivo).attr("codigo", ui.item.P_vcCod);
    //                        $("#" + idCuentaArchivo).val(ui.item.label);
    //                        //$("#hdfInCodCta").val(ui.item.P_vcCod);
    //                    },
    //                    change: function (event, ui) {
    //                        if (!ui.item) {
    //                            //if (!Selecciono) {
    //                            //$("#hdfInCodCta").val("");
    //                            $("#" + idCuentaArchivo).attr("codigo", "");
    //                            $("#" + idCuentaArchivo).val("");
    //                        } else {
    //                            if ($("#" + idCuentaArchivo).val() == "") {
    //                                $("#" + idCuentaArchivo).attr("codigo", "");
    //                            }
    //                        }
    //                        return false;
    //                    },
    //                    open: function (event, ui) {
    //                        Selecciono = false;
    //                        return false;
    //                    }
    //                }).data("autocomplete")._renderItem = function (ul, item) {
    //                    return $("<li></li>").data("item.autocomplete", item).append("<a>" + item.P_vcCod + "=" + item.label + "</a>").appendTo(ul);
    //                };
    //            }
    //        }

    //        ////for (var iFile = 0; iFile < element.files.length; iFile++) {
    //        ////}

    //        //
    //        //console.log(element);






    //        $('.MultiFile-label').css("margin-top", "10px");

    //        $("#dvArchivos").show();

    //        var Extension = $('#txtExtension').val();
    //        if (Extension.toLowerCase() == "xls") {
    //            Extension = ".xls,.xlsx";
    //        }
    //        else {
    //            Extension = "." + Extension.toLowerCase();
    //        }
    //        $("input[name='fulArchivo']").attr("accept", Extension);

    //    },
    //    onFileRemove: function (element, value, master_element) { },
    //    afterFileRemove: function (element, value, master_element) {
    //        if ($('.MultiFile-label').length == 0) {
    //            $("#dvArchivos").hide();
    //        }
    //    }
    //});
    //$.fn.MultiFile.options.accept = Extension;


    $('#txtExtension').change(function () {
        //debugger;
        $.fn.MultiFile.options.accept = $('#txtExtension').val();
        //$('#fulArchivo').MultiFile.reset();
    });

    if ($('#ddlOperador').val() != -1 && $('#ddlExtensionArchivo').val() != -1) {
        $('#ddlPlantilla').removeAttr("disabled");
    }
    if ($('#ddlOperador').val() != -1) {
        $('#ddlServicioDefecto').removeAttr("disabled");
    }
    if ($('#chkServicioDefecto').is(':checked')) {
        $("#ddlServicioDefecto").show();
    }
    else {
        $("#ddlServicioDefecto").val("-1");
        $("#ddlServicioDefecto").hide();
    }

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

    $("#txtExtension").keypress(ValidarAlfaNumerico);
    $("#txtExtension").bind('paste', function (e) {
        return false;
    });

    $("#chkUnirValoresBits").change(function () {
        if ($(this).is(':checked')) {
            $("#rbUnirValoresBits").hide();
        }
        else {
            $("#rbUnirValoresBits").show();
        }
    });

    if ($("input[name='rbProgramacion']:checked").val() == "1") {
        //                    $("#txtFechaProgramacion").show();
        $(".k-datetimepicker.DATETIME").css("display", "");
    }
}
// =======================================================================
// LOAD
// =======================================================================

var oCulturaUsuario;
var FormatoFechaCulturaForDatePicker = "";
var SimDec = ".";
var SimMil = ",";
var NumDec = "2";
var blIsUseTipCam = false;
var blIsUsePlantillaMultiple = false;
var concilia;

$(function () {

    //var Nametab = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
    //var tabPrincipal = window.parent.$("#" + Nametab);
    //var indiceTab = tabPrincipal.tabs("option", "selected");
    //var tabHijo = tabPrincipal.find("a")[indiceTab].hash;
    var tbPrincipal = $('#tbPrincipalProducto').tabs('option', 'selected');

    if ($("#hdfLicenciaModulo").val() == "4GVBGsuwXJDBuD3LFODkzQA=") {
        alertaTab("No cuenta con licencia para ingresar al módulo.", "Licencia", null, "warning");
        
        tabschild.tabs('remove', tbPrincipal);

        //alertaTab("No cuenta con licencia para ingresar al módulo.", null, function () {
            //tabPrincipal.tabs("remove", tabHijo);
        //});


        //setTimeout(function () {
        //    tabPrincipal.tabs("remove", tabHijo);
        //}, 5000);
    }

    $('#form1').on('keyup keypress', function (e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            e.preventDefault();
            return false;
        }
    });

    concilia = $("#hdfConcilia").val();

    $("#ddlTipoTelefonia").val("1");

    if (concilia == "1") {
        $("#BarraNavegacionJQ1_Panel1").hide();
        $("#BarraNavegacionJQ1_Panel2").hide();
        $('#chklstLineaTipo_0').prop('checked', true);
        //$("#trFilaTipoLinea").hide();        
        //$("#trFilaTipoTelefonia").hide();
        $("#btnCerrar").hide();
    }
    else {
        $("#BarraNavegacionJQ1_Panel1").hide();
        $("#BarraNavegacionJQ1_Panel2").show();
        //$("#trFilaTipoLinea").show();
        //$("#trFilaTipoTelefonia").show();
    }

    // =======================================================================
    // hinope
    // =======================================================================

    //            $("input:checkbox,input:radio,input:file").uniform();
    //$(".btnNormal").button();

    //$("#btnCargar").hide();
    //$("body").css({ "margin": "0px", "padding": "0px" });
    $(".uploader").css("width", "280px");
    $(".filename").css("width", "175px");


    // =======================================================================
    // FIN hinope
    // =======================================================================

    //$(function (){
    oCulturaUsuario = window.parent.parent.oCulturaUsuario;
    if (typeof oCulturaUsuario != 'undefined' && oCulturaUsuario != null) {
        FormatoFechaCulturaForDatePicker = oCulturaUsuario.vcFecCor.toLowerCase();
        SimMil = oCulturaUsuario.vcSimSepMil;
        NumDec = oCulturaUsuario.dcNumDec;
        SimDec = oCulturaUsuario.vcSimDec;
    }
    else {
        FormatoFechaCulturaForDatePicker = "dd/MM/yyyy";
        SimMil = ",";
        NumDec = 2;
        SimDec = ".";
    }

    if (FormatoFechaCulturaForDatePicker.indexOf("yyyy") >= 0) {
        FormatoFechaCulturaForDatePicker = FormatoFechaCulturaForDatePicker.replace("yyyy", "yy");  //Para datepicker 'yy' es como 'yyyy'; y 'y' es 'yy'
    }
    else if (FormatoFechaCulturaForDatePicker.indexOf("yy") >= 0) {
        FormatoFechaCulturaForDatePicker = FormatoFechaCulturaForDatePicker.replace("yy", "y");
    }

    //    SimMil = oCulturaUsuario.vcSimSepMil;
    //    NumDec = oCulturaUsuario.dcNumDec;
    //    SimDec = oCulturaUsuario.vcSimDec;

    var ListandoDetalles = false;
    /*confirm('Seguro que su nombre es ');*/


    tbPerfiles = $("#tbPerfiles").jqGrid({
        datatype: "local",
        colModel: [
            { name: 'vcNombrePerfil', index: 'vcNombrePerfil', label: 'Perfil' },
            { name: 'P_inCodPerfil', index: 'P_inCodPerfil', label: 'Codigo', hidden: true },
            { name: 'PerfilCampos.inTipoTarea', index: 'PerfilCampos.inTipoTarea', label: 'PerfilCampos.inTipTarea', hidden: true },
            { name: 'PerfilCampos.inTipoProgramacion', index: 'PerfilCampos.inTipoProgramacion', label: 'PerfilCampos.inTipProg', hidden: true },
            { name: 'PerfilCampos.vcFechaProgramada', index: 'PerfilCampos.vcFechaProgramada', label: 'PerfilCampos.vcFechaProgramada', hidden: true },
            { name: 'PerfilCampos.F_inCodOpe', index: 'PerfilCampos.F_inCodOpe', label: 'PerfilCampos.F_inCodOpe', hidden: true },
            { name: 'PerfilCampos.inTipoArchivo', index: 'PerfilCampos.inTipoArchivo', label: 'PerfilCampos.inTipArchivo', hidden: true },
            { name: 'PerfilCampos.inTipoPlantilla', index: 'PerfilCampos.inTipoPlantilla', label: 'PerfilCampos.inTipPlantilla', hidden: true },
            { name: 'PerfilCampos.inPlantilla', index: 'PerfilCampos.inPlantilla', label: 'PerfilCampos.inPlantilla', hidden: true },
            { name: 'PerfilCampos.F_vcCodCue', index: 'PerfilCampos.F_vcCodCue', label: 'PerfilCampos.F_vcCodCue', hidden: true },
            { name: 'PerfilCampos.F_vcNomCue', index: 'PerfilCampos.F_vcNomCue', label: 'PerfilCampos.F_vcNomCue', hidden: true },
            { name: 'PerfilCampos.vcExtension', index: 'PerfilCampos.vcExtension', label: 'PerfilCampos.vcExtension', hidden: true },
            { name: 'PerfilCampos.inTipoTelefonia', index: 'PerfilCampos.inTipoTelefonia', label: 'PerfilCampos.inTipTel', hidden: true },
            { name: 'PerfilCampos.inTipoCambio', index: 'PerfilCampos.inTipoCambio', label: 'PerfilCampos.inTipCambio', hidden: true },
            { name: 'PerfilCampos.inTipoLinea', index: 'PerfilCampos.inTipoLinea', label: 'PerfilCampos.inTipoLínea', hidden: true }

        ],
        sortname: "P_inCodPerfil", //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: "400",
        height: "200",
        rownumbers: true,
        caption: "",
        ondblClickRow: function () {
            ObtenerDatosDePerfil();
            $("#dvMisPerfiles").dialog("close");
        }
    });

    $("#tbPerfiles").jqGrid('bindKeys', { "onEnter": function (id) { ObtenerDatosDePerfil(); $("#dvMisPerfiles").dialog("close"); }, "onSpace": function (id) { ObtenerDatosDePerfil(); $("#dvMisPerfiles").dialog("close"); } });


    inicio();
    ListarMisPerfiles();

    function inicio() {
        $("#BarraNavegacionJQ1_Panel1_O").css("padding-top", "5px");
        $("#BarraNavegacionJQ1_Panel1_O").css("padding-bottom", "5px");

        $("#BarraNavegacionJQ1_Panel2_O").css("padding-top", "0px");
        $("#BarraNavegacionJQ1_Panel2_O").css("padding-bottom", "0px");

        $("#BarraNavegacionJQ1_Panel3_O").css("padding-top", "10px");
        $("#BarraNavegacionJQ1_Panel3_O").css("padding-bottom", "10px");

        $("#btnGuardarSer").hide();

        //$("#ddlPlantilla").attr("disabled", "disabled");
        $("#ddlPlantilla").attr("title", "Seleccione un operador");

        $("#ddlServicioDefecto").attr("disabled", "disabled");
        $("#ddlServicioDefecto").attr("title", "Seleccione un operador para activar esta opción");

        $("#ddlServicioDefecto").css("display", "none");

        $("#tbCta").css("display", "none");

        if ($("#chkEmpleadoDefecto").is(':checked')) {
            $("#txtEmpleado").show();
        }
        else {
            $("#txtEmpleado").val("");
            $("#hdfCodEmpleado").val("");
            $("#txtEmpleado").hide();
        }

        //$("#txtEmpleado").css("display", "none");
        //                $("#txtFechaProgramacion").css("display", "none");

        //$("#fulArchivo");



        $("#txtFechaProgramacion,#txtPeriodo").keydown(function (event) {
            if (event.keyCode == 13) {
                event.preventDefault();
            }
        });

        $(".txtPassword").live("keydown", function () {
            if (event.keyCode == 13) {
                event.preventDefault();
            }
        });
    }

    EventosUpdatePanel();

    $(".btnNormal").button({});

    var today = new Date();
    $(".DATETIME").removeClass("ui-widget-content ui-corner-all");
    $(".DATETIME").css("padding", "0px");
    $(".DATETIME").css("margin", "0px");
    $(".DATETIME").kendoDateTimePicker({
        culture: "es-ES",
        animation: false,
        format: "dd/MM/yyyy HH:mm",
        interval: 60,
        max: new Date(today.setDate(today.getDate()))
    });

    if ($("input[name='rbProgramacion']:checked").val() == "1") {
        $(".k-datetimepicker.DATETIME").css("display", "");
    } else {
        $(".k-datetimepicker.DATETIME").css("display", "none");
    }

    var fechaIni = $("#txtFechaProgramacion").data("kendoDateTimePicker");
    fechaIni.min(new Date());

    //            $(".DATETIME").AnyTime_picker({ format: "%d/%m/%Y %H:%i",
    //                labelTitle: "Fecha-Hora",
    //                labelHour: "Hora",
    //                labelMinute: "Minuto",
    //                labelSecond: "Segundo",
    //                labelYear: "Año",
    //                labelMonth: "Mes",
    //                labelDayOfMonth: "Dia",
    //                monthAbbreviations: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    //                monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    //                dayAbbreviations: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    //                dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
    //            });


    $(".MESANHO").removeClass("ui-widget-content ui-corner-all");
    $(".MESANHO").css("padding", "0px");
    $(".MESANHO").css("margin", "0px");

    var today = new Date();
    $(".MESANHO").kendoDatePicker({
        culture: "es-ES",
        animation: false,
        start: "year",
        depth: "year",
        format: "MM/yyyy",
        max: new Date(today.setDate(today.getDate()))
    });

    ValidarNumeroEnCajaTexto("txtTipoCambio", ValidarDecimalPositivo, oCulturaUsuario, false);

    //            $(".MESANHO").AnyTime_picker({ format: "%m/%Y",
    //                labelTitle: "Periodo",
    //                labelHour: "Hora",
    //                labelMinute: "Minuto",
    //                labelSecond: "Segundo",
    //                labelYear: "Año",
    //                labelMonth: "Mes",
    //                labelDayOfMonth: "Dia",
    //                monthAbbreviations: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    //                monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    //                dayAbbreviations: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    //                dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
    //            });

    $("#chkServicioDefecto").change(function () {
        if ($(this).is(':checked')) {
            $("#ddlServicioDefecto").show();
        }
        else {
            $("#ddlServicioDefecto").val("-1");
            $("#ddlServicioDefecto").hide();
        }
    });

    $("#chkEmpleadoDefecto").change(function () {
        if ($(this).is(':checked')) {
            $("#txtEmpleado").show();
        }
        else {
            $("#txtEmpleado").val("");
            $("#hdfCodEmpleado").val("");
            $("#txtEmpleado").hide();
        }
    });

    $("#rlstTarea").change(function () {
        var valor = $("input[name='rlstTarea']:checked").val();
        if (valor == "2") {
            $("#BarraNavegacionJQ1_Panel2").show();
        }
        else if (valor == "3") {
            $("#BarraNavegacionJQ1_Panel2").show();
        }
        else if (valor == "1") {
            $("#BarraNavegacionJQ1_Panel2").hide();
            $('input:radio[name=rbProgramacion]:nth(0)').attr('checked', true);
            //$("#txtFechaProgramacion").hide();
            $(".k-datetimepicker.DATETIME").css("display", "none");
            $("#txtFechaProgramacion").val("");
        }
    });

    $("#rbProgramacion").change(function () {
        var valor = $("input[name='rbProgramacion']:checked").val();
        if (valor == "0") {
            //                    $("#txtFechaProgramacion").hide();
            $(".k-datetimepicker.DATETIME").css("display", "none");
            $("#txtFechaProgramacion").val("");
        }
        else if (valor == "1") {
            //                    $("#txtFechaProgramacion").show();
            $(".k-datetimepicker.DATETIME").css("display", "");
        }
    });

    $("#txtEmpleado").focusout(function () {
        $.ajax({
            type: "POST",
            url: "../../Common/WebService/General.asmx/ListarEmpleado",
            data: "{'maxFilas': '" + 200 + "'," +
                   "'vcNomEmp': '" + $("#txtEmpleado").val().replace(/'/g, "&#39") + "'," +
                   "'incodGrup': '-1'," +
                   "'idCliente': '" + window.parent.parent.idCliente + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if ($(result.d).length == 1) {
                    $("#hdfCodEmpleado").val(result.d[0].P_vcCod);
                    Selecciono = true;
                }
                else {
                    $("#hdfCodEmpleado").val("");
                    Selecciono = false;
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

    $("#txtEmpleado").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "../../Common/WebService/General.asmx/ListarEmpleado",
                data: "{'maxFilas': '" + 200 + "'," +
                       "'vcNomEmp': '" + $("#txtEmpleado").val().replace(/'/g, "&#39") + "'," +
                       "'incodGrup': '-1'," +
                       "'idCliente': '" + window.parent.parent.idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: item.vcNom,
                            vcCodEmp: item.P_vcCod,
                            category: item.Grupo.vcNom,
                            inCodGru: item.Grupo.P_inCod
                        };
                    }));
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        focus: function (event, ui) {
            $("#txtEmpleado").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            Selecciono = true;
            $("#txtEmpleado").val(ui.item.label);
            $("#hdfCodEmpleado").val(ui.item.vcCodEmp);
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono) {
                $("#hdfCodEmpleado").val("");
            }
            return false;
        },
        open: function (event, ui) {
            Selecciono = false;
            return false;
        }
    }).data("autocomplete")._renderItem = function (ul, item) {
        return $("<li></li>").data("item.autocomplete", item).append("<a>" + item.vcCodEmp + "=" + item.label + "</a>").appendTo(ul);
    };

    $("#ddlPlantilla").change(function () {
        $("#txtCuenta").val("");
        $("#hdfInCodCta").val("");

        if ($("#ddlPlantilla").val() == '-1') {
            return;
        } else {

            $.ajax({
                type: "POST",
                url: "Imp_Proceso.aspx/MostrarPlantilla",
                data: "{'cod': '" + $("#ddlPlantilla").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    //console.log("result_1: ", result);
                    btCuentaMultiple = result.d.btCuentaMultiple;
                    $("#txtExtension").val(result.d.PlantillaDetalles[0].vcExtDef);
                    try {
                        var Extension = $('#txtExtension').val();
                        $.fn.MultiFile.options.accept = Extension;

                        if (Extension.toLowerCase() == "xls") {
                            Extension = ".xls,.xlsx";
                        }
                        else {
                            Extension = "." + Extension.toLowerCase();
                        }
                        $("input[type='file']").attr("accept", Extension);

                    } catch (e) {
                        //VALIDACION
                    }
                    blIsUseTipCam = result.d.PlantillaDetalles[0].btTipCam;
                    blIsUsePlantillaMultiple = result.d.PlantillaDetalles[0].blUsaPlantillaMultiple;
                    if (result.d.PlantillaDetalles[0].btTipCam) {
                        $("#dvTC").show();
                        $("#txtTipoCambio").show();
                        $("#txtTipoCambio").css("display", "block");
                        $("#dvTC").css("display", "block");
                    } else {
                        $("#dvTC").hide();
                        $("#txtTipoCambio").hide();
                    }

                    $("#chkUnirValoresBits").hide();
                    $("#rbUnirValoresBits").hide();
                    $("#chkUnirValoresBits").is(":checked", true);

                    //ECONDEÑA  12/11/2015
                    if (btCuentaMultiple == false && result.d.PlantillaDetalles[0].inTipPla == '2' && result.d.PlantillaDetalles[0].idTipPlanRes == '2') {
                        $("#tbCta").show();
                        $("#hdfbtTipoPla").val(1);
                    } else {
                        $("#tbCta").hide();
                        $("#hdfbtTipoPla").val(0);
                    }
                    $("#hdfCodPla").val($("#ddlPlantilla").val());
                    if (blIsUsePlantillaMultiple) { $("#tdInfoPlantilla").css("display", ""); } else { $("#tdInfoPlantilla").css("display", "none"); }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
    });

    if ($(".txtCuentaArchivo").length > 0) {
        $(".txtCuentaArchivo").autocomplete({
            minLength: 0,
            source: function (request, response) {
                var data = {
                    vcCodNom: $(this).val().replace(/'/g, "&#39").replace(/\\/g, "&#92"),
                    inMaxFilMos: 10,
                    inCodOpe: $("#ddlOperador").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92")
                };
                $.ajax({
                    type: "POST",
                    url: "Imp_Proceso.aspx/ListarCuentaxOperador",
                    data: JSON.stringify(data),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        response($.map(result.d, function (item) {
                            return {
                                label: item.vcNom.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'),
                                P_vcCod: item.P_vcCod
                            };
                        }));
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },
            focus: function (event, ui) {
                $(this).val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                Selecciono = true;
                //pais
                $(this).val(ui.item.P_vcCod + " = " + ui.item.label);
                //$("#hdfInCodCta").val(ui.item.P_vcCod);
            },
            change: function (event, ui) {
                if (!ui.item) {
                    //if (!Selecciono) {
                    //$("#hdfInCodCta").val("");
                    $(this).val("");
                } else {
                    if ($(this).val() == "") {
                        //$("#hdfInCodCta").val("");
                    }
                }
                return false;
            },
            open: function (event, ui) {
                Selecciono = false;
                return false;
            }
        }).data("autocomplete")._renderItem = function (ul, item) {
            return $("<li></li>").data("item.autocomplete", item).append("<a>" + item.P_vcCod + "=" + item.label + "</a>").appendTo(ul);
        };
    }

    ////if ($("#txtCuenta").length > 0) {
    ////    $("#txtCuenta").autocomplete({
    ////        minLength: 0,
    ////        source: function (request, response) {
    ////            var data = {
    ////                vcCodNom: $("#txtCuenta").val().replace(/'/g, "&#39").replace(/\\/g, "&#92"),
    ////                inMaxFilMos: 10,
    ////                inCodOpe: $("#ddlOperador").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92")
    ////            };
    ////            $.ajax({
    ////                type: "POST",
    ////                url: "Imp_Proceso.aspx/ListarCuentaxOperador",
    ////                data: JSON.stringify(data),
    ////                contentType: "application/json; charset=utf-8",
    ////                dataType: "json",
    ////                success: function (result) {
    ////                    response($.map(result.d, function (item) {
    ////                        return {
    ////                            label: item.vcNom.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'),
    ////                            P_vcCod: item.P_vcCod
    ////                        };
    ////                    }));
    ////                },
    ////                error: function (xhr, err, thrErr) {
    ////                    MostrarErrorAjax(xhr, err, thrErr);
    ////                }
    ////            });
    ////        },
    ////        focus: function (event, ui) {
    ////            $("#txtCuenta").val(ui.item.label);
    ////            return false;
    ////        },
    ////        select: function (event, ui) {
    ////            Selecciono = true;
    ////            //pais
    ////            $("#txtCuenta").val(ui.item.label);
    ////            $("#hdfInCodCta").val(ui.item.P_vcCod);
    ////        },
    ////        change: function (event, ui) {
    ////            if (!ui.item) {
    ////                //if (!Selecciono) {
    ////                $("#hdfInCodCta").val("");
    ////                $("#txtCuenta").val("");
    ////            } else {
    ////                if ($("#txtCuenta").val() == "") {
    ////                    $("#hdfInCodCta").val("");
    ////                }
    ////            }
    ////            return false;
    ////        },
    ////        open: function (event, ui) {
    ////            Selecciono = false;
    ////            return false;
    ////        }
    ////    }).data("autocomplete")._renderItem = function (ul, item) {
    ////        return $("<li></li>").data("item.autocomplete", item).append("<a>" + item.P_vcCod + "=" + item.label + "</a>").appendTo(ul);
    ////    };
    ////}

    //ECONDEÑA  12/11/2015
    $("#ddlOperador").change(function () {
        fnCambiar();
    });

    $("#ddlExtensionArchivo").change(function () {
        fnCambiar();
    });

    $("#ddlTipoPlantilla").change(function () {
        $("#tbCta").hide();
        if ($("#ddlOperador").val() == "-1") {
            return;
        }

        //if ($("#ddlExtensionArchivo").val() == "-1") {
        //    alerta("Seleccione un tipo de archivo");
        //    $("#ddlExtensionArchivo").focus("");
        //    return;
        //}

        if ($(this).val() == "-1") {
            alerta("Seleccione un tipo de plantilla");
            $("#ddlPlantilla").html("");
            $("#txtExtension").val("");
            return;
        }

        $.ajax({
            type: "POST",
            url: "Imp_Proceso.aspx/ListarPorOperadorArchivo",
            data: "{'p_inCodOpe': '" + $("#ddlOperador").val() + "', 'p_inTipArc':'" + $("#ddlExtensionArchivo").val() + "', 'p_inTipPla':'" + $(this).val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d.length > 0) {
                    $("#ddlPlantilla").html("");
                    $(result.d).each(function () {
                        $("#ddlPlantilla").append($("<option></option>").attr("value", this.P_inCodPla).text(this.vcNom.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"')));
                    });
                    $('#ddlPlantilla').removeAttr("disabled");
                } else {
                    $('#ddlPlantilla').attr("disabled");
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });
    //FIN ECONDEÑA

    $("#btnGuardar").click(function () {
        //                alert($("#hdfCodEmpleado").val());
        //                return;
        Passwords = "";
        var Files = "";
        var tamanioAdjunto = 0;
        Cuentas = "";
        var NoExisteCuenta = false;

        $('.txtPassword').each(function () {
            Passwords += ",";
            Passwords += $(this).val();
        });

        $('.txtCuentaArchivo').each(function () {
            Cuentas += ",";
            Cuentas += $(this).attr("codigo");
            if ($(this).attr("codigo") == null || $(this).attr("codigo") == "") {
                NoExisteCuenta = true;
            }
        });

        //$('.MultiFile-label').each(function () {
        //    Files += ",";
        //    Files += $(this)[0].textContent;
        //});

        for (var i = 0; i < listaArchivos.length; i++) {
            if ((typeof listaArchivos[i] !== 'undefined')) {
                //iContador++;
                //formData.append("file_" + iContador.toString(), listaArchivos[i]);
                Files += ",";
                Files += listaArchivos[i].name;
                tamanioAdjunto = tamanioAdjunto + listaArchivos[i].size;
            }
        }

        $("#hdfPassword").val(Passwords);
        $("#hdfCuentasArchivos").val(Cuentas);

        //JHERRERA 20140808 -- Validación de Periodo
        if ($("input[name='rbProgramacion']:checked").val() == "1") {
            var vcProgramacion = $("#txtFechaProgramacion").val().replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g, "");

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
                $("#txtPeriodo").focus();
                return;
            }
        }
        //---------

        if ($("#ddlOperador").val() == "-1") {
            alerta("Seleccione un operador");
            $("#ddlOperador").focus();
            return;
        }
        //if ($("#ddlExtensionArchivo").val() == "-1") {
        //    alerta("Seleccione un tipo de archivo");
        //    $("#ddlExtensionArchivo").focus();
        //    return;
        //}

        //ECONDEÑA  12/11/2015
        //if ($("#ddlTipoPlantilla").val() == "-1") {
        //    alerta("Seleccione una tipo de plantilla");
        //    $("#ddlTipoPlantilla").focus();
        //    return;
        //}

        if ($("#ddlPlantilla").val() == "-1") {
            alerta("Seleccione una plantilla");
            $("#ddlPlantilla").focus();
            return;
        }

        //ECONDEÑA  27/02/2015
        ////if ($("#hdfbtTipoPla").val() == '1') {
        ////    if ($("#txtCuenta").val() == "") {
        ////        alerta("Seleccione una cuenta");
        ////        $("#txtCuenta").focus();
        ////        return;
        ////    }
        ////}

        if ($('#chklstLineaTipo :checked').size() == 0) {
            alerta("Elija por lo menos un tipo de línea");
            $("#chklstLineaTipo").focus();
            return;
        }
        if ($("#chkServicioDefecto").is(':checked') && $("#ddlServicioDefecto").val() == "-1") {
            alerta("Seleccione un servicio");
            $("#ddlServicioDefecto").focus();
            return;
        }

        if ($("#chkEmpleadoDefecto").is(':checked') && $("#hdfCodEmpleado").val() == "") {
            alerta("Ingrese un empleado o seleccionelo de nuevo");
            $("#txtEmpleado").focus();
            return;
        }
        if ($("#ddlTipoTelefonia").val() == "-1") {
            alerta("Seleccione un Tipo de telefonía");
            $("#ddlTipoTelefonia").focus();
            return;
        }

        //JHERRERA 20140808 -- Validación de Periodo
        var vcPeriodo = $("#txtPeriodo").val().replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g, "");
        if ($.trim(vcPeriodo) == "") {
            alerta("Ingrese el periodo del archivo a importar");
            $("#txtPeriodo").focus();
            return;
        }
        if (vcPeriodo.length < 7 || vcPeriodo.split("/").length != 2) {
            alerta("El periodo no tiene el formato correcto MM/yyyy .");
            $("#txtPeriodo").focus();
            return;
        }
        mPer = vcPeriodo.substr(0, 2);
        yPer = vcPeriodo.substr(3, 4);
        if (!checkperiodo(mPer, yPer)) {
            alerta("El periodo es inválido.");
            $("#txtPeriodo").focus();
            return;
        }
        //---------

        if (blIsUseTipCam) {
            //if ($("#txtTipoCambio").length > 0) {
            if ($("#txtTipoCambio").val() == "" || $("#txtTipoCambio").val() == undefined) {
                alerta("Ingrese el Tipo de Cambio");
                $("#txtTipoCambio").focus();
                return;
            }
            if (parseInt($("#txtTipoCambio").val()) <= 0) {
                alerta("Ingrese un Tipo de Cambio Mayor a Cero");
                $("#txtTipoCambio").focus();
                return;
            }
            //}    
        }

        if (Files == "") {
            alerta("Debe seleccionar un archivo a procesar");
            return;
        }


        if (!btCuentaMultiple) {
            if (NoExisteCuenta) {
                alerta("Debe ingresar todas las cuentas2323");
                return;
            }
        }

        //validar tamaño aca
        var tamanioConfigurado = $("#hfTamanioMaximoAdjunto").val();
        tamanioAdjunto = (tamanioAdjunto / 1024 / 1024);
        if ( parseInt(tamanioAdjunto) > parseInt(tamanioConfigurado) )
        {
            alerta(" La cantidad de archivos que está intentando subir (<span>" + (parseInt(tamanioAdjunto)).toString() + "</span> MB) supera el límite máximo permitido de <span >" + (parseInt(tamanioConfigurado)).toString() + "</span> MB.");
           return;
        }
    
        ///********************************



        $.ajax({
            type: "POST",
            url: "Imp_Proceso.aspx/ValidarArchivos",
            data: "{'vcFiles': '" + Files + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == "0") {
                    confirmacion('Existen algunos archivos ya procesados. ¿Desea continuar?',
                                function () {
                                    $("#hdfbtSobreescribe").val("1");
                                    //$("#btnGuardarSer").click();
                                    enviarArchivosParaImportar();
                                });
                    //                            if (confirm('Existen algunos archivos ya procesados. ¿Desea continuar?')) {
                    //                                $("#hdfbtSobreescribe").val("1");
                    //                                $("#btnGuardarSer").click();
                    //                            }
                }
                else {
                    //$("#btnGuardarSer").click();
                    enviarArchivosParaImportar();
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });

    });

    $("#btnCerrar").click(function () {
        if (concilia == "1") {
            //window.top.$("#tbPrincipal").tabs("remove", window.top.$("#tbPrincipal").tabs("option", "selected"));
        }
        else {
            window.parent.tabOpciones.tabs("remove", window.parent.tabOpciones.tabs("option", "selected"));
        }
    });

    if (archivo == 1) {
        alerta("Seleccione un archivo");
        $('#ddlPlantilla').removeAttr("disabled");
        archivo = 0;
    }
    //            $('#chklstLineaTipo input[type=checkbox]').change(function () {
    //                if (this.checked) {
    //                    $('#chklstLineaTipo input[type=checkbox]').not(
    //$(this)).prop('checked', false);
    //                }
    //            });

    //    $("#ddlOperador").prop("selectedIndex", 0);
    $("#ddlOperador").attr('disabled', false);
    if ($("#ddlOperador option").length == 2) {
        $("#ddlOperador").prop("selectedIndex", 1);
        $("#ddlOperador").attr('disabled', true);
        $("#ddlOperador").change();
    }

    //RRAMOS DRIVER
    $("#btnGuardarPerfil").click(function () {
        if (document.getElementById('hdfIdPerfil').value != '-1') {
            $("#lblTituloNombrePerfil").html("Edite el nombre del Perfil:");
            $('#dvNombrePerfil').dialog({
                title: "Editar Perfil",
                width: 400,
                modal: true,
                buttons: {
                    "Actualizar": function () {
                        if ($.trim($("#txtPerfil").val()) == "") {
                            alerta('Ingrese el Nombre del Perfil');
                            $("#txtPerfil").focus();
                            return;
                        }
                        GuardarPerfil(false);
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                }
            });
        }
        else {
            //document.getElementById('txtPerfil').value = '';
            $("#lblTituloNombrePerfil").html("Ingrese el nombre del Reporte:");

            $('#dvNombrePerfil').dialog({
                title: "Grabar Nuevo Perfil",
                width: 400,
                modal: true,
                buttons: {
                    "Grabar": function () {
                        if ($.trim($("#txtPerfil").val()) == "") {
                            alerta('Ingrese el Nombre del Perfil');
                            $("#txtPerfil").focus();
                            return;
                        }
                        GuardarPerfil();
                        //$('#dvMisPerfiles').dialog("close");
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                }
            });
        }
    });
    $("#btnAbrirPerfil").click(function () {
        $('#dvMisPerfiles').dialog({
            title: "Mis Perfiles",
            width: 420,
            height: 350,
            modal: true,
            resize: false,
            buttons: {
                "Quitar": function () {
                    QuitarPerfil();
                },
                "Aceptar": function () {
                    ObtenerDatosDePerfil();
                    $("#dvMisPerfiles").dialog("close");
                },
                "Cancelar": function () {
                    $(this).dialog("close");
                }
            }
        });


    });


    try {
        if ($("#ddlPlantilla").val() != null) {
            $("#ddlPlantilla").change();
        }
    } catch (e) {
    }


});
function CerroMensaje() { }
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

function GuardarPerfil(blValidar) {
    var idTipoLinea = 0;
    var chkBoxList = document.getElementById('chklstLineaTipo');
    var chkBoxCount = chkBoxList.getElementsByTagName("input");
    for (var i = 0; i < chkBoxCount.length; i++) {
        if ($("#hdfLicencia").val() == "PREMIUM") {
            if (chkBoxCount[0].checked == true && chkBoxCount[1].checked == true) {
                idTipoLinea = 3;
            } else if (chkBoxCount[0].checked == true && chkBoxCount[1].checked == false) {
                idTipoLinea = 1;
            } else if (chkBoxCount[0].checked == false && chkBoxCount[1].checked == true) {
                idTipoLinea = 2;
            } else {
                idTipoLinea = 0;
            }
        } else {
            if (chkBoxCount[0].checked == true) {
                idTipoLinea = 1;
            }
        }
    }
    if (!blValidar) {
        if ($("#ddlOperador").val() == "-1") {
            alerta("Seleccione un operador");
            $("#ddlOperador").focus();
            return;
        }
        //if ($("#ddlExtensionArchivo").val() == "-1") {
        //    alerta("Seleccione un tipo de archivo");
        //    $("#ddlExtensionArchivo").focus();
        //    return;
        //}
        //if ($("#ddlTipoPlantilla").val() == "-1") {
        //    alerta("Seleccione una tipo de plantilla");
        //    $("#ddlTipoPlantilla").focus();
        //    return;
        //}
        if ($("#ddlPlantilla").val() == "-1") {
            alerta("Seleccione una plantilla");
            $("#ddlPlantilla").focus();
            return;
        }
        if ($("#ddlTipoTelefonia").val() == "-1") {
            alerta("Seleccione un Tipo de telefonía");
            $("#ddlTipoTelefonia").focus();
            return;
        }
        ////if ($("#hdfbtTipoPla").val() == '1') {
        ////    if ($("#txtCuenta").val() == "") {
        ////        alerta("Seleccione una cuenta");
        ////        $("#txtCuenta").focus();
        ////        return;
        ////    }
        ////}
        if (blIsUseTipCam) {
            if ($("#txtTipoCambio").val() == "" || $("#txtTipoCambio").val() == undefined) {
                alerta("Ingrese el Tipo de Cambio");
                $("#txtTipoCambio").focus();
                return;
            }
            if (parseInt($("#txtTipoCambio").val()) <= 0) {
                alerta("Ingrese un Tipo de Cambio Mayor a Cero");
                $("#txtTipoCambio").focus();
                return;
            }
        }
        if ($("input[name='rbProgramacion']:checked").val() == "1") {
            var vcProgramacion = $("#txtFechaProgramacion").val().replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g, "");

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
            //alert(checkdate(mPro, dPro, yPro, hPro, miPro));

            alert(mPro > 0 && mPro < 13 && yPro > 0 && yPro < 32768 && dPro > 0 && hPro >= 0 && hPro < 24 && miPro >= 0 && miPro < 60 && dPro <= (new Date(yPro, mPro, 0)).getDate());
            if (!checkdate(mPro, dPro, yPro, hPro, miPro)) {
                alerta("La fecha de programación es inválida.");
                $("#txtPeriodo").focus();
                return;
            }
        }
        if (idTipoLinea == 0) {
            alerta("Elija por lo menos un tipo de línea");
            $("#chklstLineaTipo").focus();
            return;
        }
    }

    var inCodPerfil = ($("#hdfIdPerfil").val() == "" ? 0 : $("#hdfIdPerfil").val());
    var inTipoTarea = $("input[name='rlstTarea']:checked").val();
    var inTipoProgramacion = $("input[name='rbProgramacion']:checked").val();
    var vcFechaProgramada = "";
    var inCodOpe = $("#ddlOperador").val();
    var inTipoArchivo = $("#ddlExtensionArchivo").val();
    var inTipoPlantilla = $("#ddlTipoPlantilla").val();
    var inPlantilla = $("#ddlPlantilla").val();
    var vcExtension = $("#txtExtension").val();
    var inTipoTelefonia = $("#ddlTipoTelefonia").val();
    var vcNomCuenta = $("#txtCuenta").val();
    var inCodCuenta = $("#hdfInCodCta").val();
    var dcTipoCambio = ($("#txtTipoCambio").val() == "" ? 0 : $("#txtTipoCambio").val());

    $.ajax({
        type: "POST",
        url: "Imp_Proceso.aspx/GuardarPerfil",
        data: "{'inCodPerfil': '" + inCodPerfil + "'," +
                   "'vcNomPerfil': '" + $("#txtPerfil").val().replace(/'/g, "&#39") + "'," +
                   "'inTipoTarea': '" + inTipoTarea + "'," +
                   "'inTipoProgramacion': '" + inTipoProgramacion + "'," +
                   "'vcFechaProgramada': '" + vcFechaProgramada + "'," +
                   "'inCodOpe': '" + inCodOpe + "'," +
                   "'inTipoArchivo': '" + inTipoArchivo + "'," +
                   "'inTipoPlantilla': '" + inTipoPlantilla + "'," +
                   "'inPlantilla': '" + inPlantilla + "'," +
                   "'vcExtension': '" + vcExtension + "'," +
                   "'inTipoTelefonia': '" + inTipoTelefonia + "'," +
                   "'vcCuenta': '" + inCodCuenta + "'," +
                   "'vcNomCuenta': '" + vcNomCuenta + "'," +
                   "'idTipoLinea': '" + idTipoLinea + "'," +
                   "'dcTipoCambio': '" + dcTipoCambio + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d > 0) {
                ListarMisPerfiles();
                Mensaje("<br/><h1>Perfil guardado</h1><br/><h2>" + $("#txtPerfil").val() + "</h2>", document, CerroMensaje);
                $('#dvNombrePerfil').dialog("close");
                $("#dvPerfil").css("display", "");
                $("#hdfIdPerfil").val(result.d);
                $("#lblMensajePerfil").html("Se esta usado el Perfil " + $("#txtPerfil").val().replace(/'/g, "&#39"));
            }
            //else {
            //    $("#hdfCodEmpleado").val("");
            //    Selecciono = false;
            //}
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function fnCambiar() {
    $("#ddlTipoPlantilla").val(-1);
    $("#ddlPlantilla").html("");
    $("#ddlPlantilla").prop("disabled", true);
    $("#txtExtension").val("");
    $("#tbCta").hide();


    $.ajax({
        type: "POST",
        url: "Imp_Proceso.aspx/ListarPorOperadorArchivo",
        data: "{'p_inCodOpe': '" + $("#ddlOperador").val() + "', 'p_inTipArc':'-1', 'p_inTipPla':'-1'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d.length > 0) {
                $("#ddlPlantilla").html("");
                $(result.d).each(function () {
                    $("#ddlPlantilla").append($("<option></option>").attr("value", this.P_inCodPla).text(this.vcNom.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"')));
                });
                $('#ddlPlantilla').removeAttr("disabled");
            } else {
                $('#ddlPlantilla').attr("disabled");
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function ListarMisPerfiles() {
    $.ajax({
        type: "POST",
        url: "Imp_Proceso.aspx/ListarMisPerfiles",
        data: "{'vcCodPerfil': '" + $("#hdfIdPerfil").val() + "','vcTipoConsulta':'" + "2" + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#tbPerfiles").jqGrid('clearGridData');
            var i;
            for (i = 0; i < $(result.d).length; i++) {
                $("#tbPerfiles").jqGrid('addRowData', result.d[i].P_inCodPerfil, result.d[i]);
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function QuitarPerfil() {
    var id = $("#tbPerfiles").jqGrid('getGridParam', 'selrow');
    if (id) {
        var datos = $("#tbPerfiles").jqGrid('getRowData', id);
        var CodPerfil = datos['P_inCodPerfil'];
        $("#lblMensajeConfirmacion").html("¿Desea eliminar el perfil seleccionado?");
        $('#divMsgConfirmacion').dialog({
            title: "Eliminar Perfil",
            modal: true,
            buttons: {
                "Si": function () {
                    if ($("#hdfIdPerfil").val() == CodPerfil) {
                        $(this).dialog("close");
                        alerta("Registro no pudo ser eliminado, el perfil seleccionado esta siendo usado actualmente");
                        return;
                    }
                    $.ajax({
                        type: "POST",
                        url: "Imp_Proceso.aspx/QuitarPerfil",
                        data: "{'P_inCodPerfil': '" + CodPerfil + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            if (result.d == 1) {
                                Mensaje("<br/><h1>Perfil Eliminado</h1><br/>" + datos['vcNombrePerfil'] + "</h2>", document, CerroMensaje);
                                ListarMisPerfiles();
                            } else {
                                Mensaje("<br/><h1>Registro no pudo ser eliminado</h1><br/></h2>", document, CerroMensaje);
                            }
                            $("#dvMisPerfiles").dialog("close");
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        }
                    });
                    $(this).dialog("close");
                },
                "No": function () {
                    $(this).dialog("close");
                }
            }
        });
        return true;
    } else {
        alerta("seleccione un registro");
        return;
    }
}

function ObtenerDatosDePerfil() {
    var id = $("#tbPerfiles").jqGrid('getGridParam', 'selrow');
    if (id) {
        var oPerfil = $("#tbPerfiles").jqGrid('getRowData', id);
        var codreporte = oPerfil['P_inCodPerfil'];
        $("#hdfIdPerfil").val(codreporte);
        $("#dvPerfil").css("display", "");
        $("#lblMensajePerfil").html("Se esta usado el Perfil " + oPerfil["vcNombrePerfil"]);
        window.$("#dvCargando").hide();
        $("#ddlOperador").val(oPerfil["PerfilCampos.F_inCodOpe"]);
        $("#ddlExtensionArchivo").val(oPerfil["PerfilCampos.inTipoArchivo"]);
        $("#ddlTipoPlantilla").val(oPerfil["PerfilCampos.inTipoPlantilla"]);
        $("#ddlTipoTelefonia").val(oPerfil["PerfilCampos.inTipoTelefonia"]);
        $("#txtExtension").val(oPerfil["PerfilCampos.vcExtension"]);
        try {
            $.fn.MultiFile.options.accept = $('#txtExtension').val();
        } catch (e) {
            //VALIDACION
        }
        $('#txtPerfil').val(oPerfil["vcNombrePerfil"]);

        var chkBoxList = document.getElementById('rlstTarea');
        var chkBoxCount = chkBoxList.getElementsByTagName("input");
        if (oPerfil["PerfilCampos.inTipoTarea"] == "3") {
            chkBoxCount[0].checked = true;
            $("#BarraNavegacionJQ1_Panel2").show();
        } else if (oPerfil["PerfilCampos.inTipoTarea"] == "1") {
            chkBoxCount[1].checked = true;
            $("#BarraNavegacionJQ1_Panel2").hide();
        } else {
            chkBoxCount[2].checked = true;
        }

        if (oPerfil["PerfilCampos.inTipoTarea"] == "3") {
            var chkBoxList = document.getElementById('rbProgramacion');
            var chkBoxCount = chkBoxList.getElementsByTagName("input");
            if (oPerfil["PerfilCampos.inTipoProgramacion"] == "0") {
                chkBoxCount[0].checked = true;
            } else if (oPerfil["PerfilCampos.inTipoProgramacion"] == "1") {
                chkBoxCount[1].checked = true;
            }
        }

        if (oPerfil["PerfilCampos.inTipoProgramacion"] == "1") {
            $(".k-datetimepicker.DATETIME").css("display", "");
            $("#txtFechaProgramacion").val(oPerfil["PerfilCampos.vcFechaProgramada"]);
        }

        var chkBoxList = document.getElementById('chklstLineaTipo');
        var chkBoxCount = chkBoxList.getElementsByTagName("input");
        for (var i = 0; i < chkBoxCount.length; i++) {
            if ($("#hdfLicencia").Value == "PREMIUM") {
                if (oPerfil["PerfilCampos.inTipoLinea"] == "1") {
                    chkBoxCount[0].checked = true;
                    chkBoxCount[1].checked = false;
                } else if (oPerfil["PerfilCampos.inTipoLinea"] == "2") {
                    chkBoxCount[0].checked = false;
                    chkBoxCount[1].checked = true;
                } else if (oPerfil["PerfilCampos.inTipoLinea"] == "3") {
                    chkBoxCount[0].checked = true;
                    chkBoxCount[1].checked = true;
                }
            } else {
                if (oPerfil["PerfilCampos.inTipoLinea"] == "1") {
                    chkBoxCount[0].checked = true;
                } else if (oPerfil["PerfilCampos.inTipoLinea"] == "2") {
                    chkBoxCount[0].checked = false;
                } else if (oPerfil["PerfilCampos.inTipoLinea"] == "3") {
                    chkBoxCount[0].checked = true;
                }
            }
        }

        $.ajax({
            type: "POST",
            url: "Imp_Proceso.aspx/ListarPorOperadorArchivo",
            data: "{'p_inCodOpe': '" + oPerfil["PerfilCampos.F_inCodOpe"] + "', 'p_inTipArc':'" + oPerfil["PerfilCampos.inTipoArchivo"] + "', 'p_inTipPla':'" + oPerfil["PerfilCampos.inTipoPlantilla"] + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d.length > 0) {
                    $("#ddlPlantilla").html("");
                    $(result.d).each(function () {
                        $("#ddlPlantilla").append($("<option></option>").attr("value", this.P_inCodPla).text(this.vcNom.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"')));
                    });
                    $('#ddlPlantilla').removeAttr("disabled");
                } else {
                    $('#ddlPlantilla').attr("disabled");
                }
                $("#ddlPlantilla").val(oPerfil["PerfilCampos.inPlantilla"]);
                if ($("#ddlPlantilla").val() == '-1') {
                    return;
                } else {

                    $.ajax({
                        type: "POST",
                        url: "Imp_Proceso.aspx/MostrarPlantilla",
                        data: "{'cod': '" + $("#ddlPlantilla").val() + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {

                            //console.log("result: ", result);
                            btCuentaMultiple = result.d.btCuentaMultiple;
                            blIsUseTipCam = result.d.PlantillaDetalles[0].btTipCam;
                            blIsUsePlantillaMultiple = result.d.PlantillaDetalles[0].blUsaPlantillaMultiple;
                            if (result.d.PlantillaDetalles[0].btTipCam) {
                                $("#dvTC").show();
                                $("#txtTipoCambio").show();
                                $("#txtTipoCambio").css("display", "block");
                                $("#dvTC").css("display", "block");
                                $("#txtTipoCambio").val(oPerfil["PerfilCampos.inTipoCambio"]);
                            } else {
                                $("#dvTC").hide();
                                $("#txtTipoCambio").hide();
                            }

                            $("#chkUnirValoresBits").hide();
                            $("#rbUnirValoresBits").hide();
                            $("#chkUnirValoresBits").is(":checked", true);

                            //ECONDEÑA  12/11/2015
                            if (btCuentaMultiple == false && result.d.PlantillaDetalles[0].inTipPla == '2' && result.d.PlantillaDetalles[0].idTipPlanRes == '2') {
                                $("#tbCta").show();
                                $("#hdfbtTipoPla").val(1);
                                $("#hdfInCodCta").val(oPerfil["PerfilCampos.F_vcCodCue"]);
                                $("#txtCuenta").val(oPerfil["PerfilCampos.F_vcNomCue"]);
                            } else {
                                $("#tbCta").hide();
                                $("#hdfbtTipoPla").val(0);
                                $("#txtCuenta").val("");
                                $("#hdfInCodCta").val("");
                            }
                            $("#hdfCodPla").val($("#ddlPlantilla").val());
                            if (blIsUsePlantillaMultiple) { $("#tdInfoPlantilla").css("display", ""); } else { $("#tdInfoPlantilla").css("display", "none"); }
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        }
                    });
                }

            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
        $(this).dialog("close");
    } else {
        alerta("seleccione un registro");
        return;
    }
}





var fileInput;
$(function () {
    fileInput = document.getElementById('fulArchivo');
    var fileListDisplay = document.getElementById('file-list-display');

    //fileInput.addEventListener('change', function (evnt) {
    $('#fulArchivo').live('change', function () {
        //debugger;
        var Existe = false;
               
        for (var i = 0; i < fileInput.files.length; i++) {
            Existe = false;
            for (var j = 0; j < listaArchivos.length; j++) {
                if ((typeof listaArchivos[j] !== 'undefined') && (listaArchivos[j].name == fileInput.files[i].name)) {
                    Existe = true;
                    break;
                }
            }
            if (!Existe) {
                renderListaArchivos(fileInput.files[i]);
            }
        }
    });

    renderListaArchivos = function (_fileInput) {
        var Extension = $('#txtExtension').val().toLowerCase();
        var ExtensionArchivo = _fileInput.name.split('.').pop().toLowerCase();
        if (Extension != ExtensionArchivo) {
            alerta("La extensión del archivo no es la correcta.");
            $("#fulArchivo").val("");
            return;
        }

        listaArchivos.push(_fileInput);
        //fileList.forEach(function (file, index) {
        var fileDisplayEl = document.createElement('div');
        var aleatorio = Math.floor((Math.random() * 10000) + 1).toString();
        var idRemove = "remove_" + aleatorio.toString();
        var idCuentaArchivo = 'txtCuentaArchivo_' + aleatorio.toString();
        var value = _fileInput.name;

        var CuerpoHtml = ''; //'<div class="MultiFile-label" style="margin-top: 10px;">';
        CuerpoHtml += '     <a id="' + idRemove + '" value="' + value + '" class="MultiFile-remove" href="#fulArchivo">Quitar</a> ';
        CuerpoHtml += '     <span>';
        CuerpoHtml += '         <span class="MultiFile-label" title="File selected: ' + value + '" style="margin-top: 10px;">';
        if (!btCuentaMultiple) {
            CuerpoHtml += '             <input id="' + idCuentaArchivo + '" class="ui-widget-content ui-corner-all txtCuentaArchivo" type="text" style="padding:4px;"/>&nbsp;&nbsp;&nbsp;';
        }
        CuerpoHtml += '             <input class="ui-widget-content ui-corner-all txtPassword" type="password" style="padding:4px;">&nbsp;&nbsp;&nbsp;';
        CuerpoHtml += '             <span class="MultiFile-title">' + value + '</span>';
        CuerpoHtml += '         </span>';
        CuerpoHtml += '     </span>';
        //CuerpoHtml += '</div>';

        //$("#dvArchivos").append(CuerpoHtml);
        //$("#" + idRemove).click(function () {
        //    $(this).parent().remove();
        //});

        fileDisplayEl.className = "MultiFile-label";
        fileDisplayEl.innerHTML = CuerpoHtml; //(index + 1) + ': ' + file.name;
        //fileListDisplay.appendChild(fileDisplayEl);

        $("#dvArchivos").append(fileDisplayEl);
        $("#" + idRemove).click(function () {
            var valor = $(this).attr("value");
            for (var i = 0; i < listaArchivos.length; i++) {
                if ((typeof listaArchivos[i] !== 'undefined') && (listaArchivos[i].name == valor)) {
                    listaArchivos.splice(i, 1);
                    break;
                }
            }
            $(this).parent().remove();
        });

        $("#dvArchivos").show();

        if (Extension == "xls") {
            Extension = ".xls,.xlsx";
        }
        else {
            Extension = "." + Extension;
        }
        $("input[type='file']").attr("accept", Extension);

        if (btCuentaMultiple) {
            $("#tdCuentaArchivo").hide();
        }
        else {
            $("#tdCuentaArchivo").show();

            if ($("#" + idCuentaArchivo).length > 0) {
                $("#" + idCuentaArchivo).autocomplete({
                    minLength: 0,
                    source: function (request, response) {
                        var data = {
                            vcCodNom: $("#" + idCuentaArchivo).val().replace(/'/g, "&#39").replace(/\\/g, "&#92"),
                            inMaxFilMos: 10,
                            inCodOpe: $("#ddlOperador").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92")
                        };
                        $.ajax({
                            type: "POST",
                            url: "Imp_Proceso.aspx/ListarCuentaxOperador",
                            data: JSON.stringify(data),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result) {
                                response($.map(result.d, function (item) {
                                    return {
                                        label: item.vcNom.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'),
                                        P_vcCod: item.P_vcCod
                                    };
                                }));
                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });
                    },
                    focus: function (event, ui) {
                        $("#" + idCuentaArchivo).val(ui.item.label);
                        return false;
                    },
                    select: function (event, ui) {
                        Selecciono = true;
                        //pais
                        $("#" + idCuentaArchivo).attr("codigo", ui.item.P_vcCod);
                        $("#" + idCuentaArchivo).val(ui.item.label);
                        //$("#hdfInCodCta").val(ui.item.P_vcCod);
                    },
                    change: function (event, ui) {
                        if (!ui.item) {
                            //if (!Selecciono) {
                            //$("#hdfInCodCta").val("");
                            $("#" + idCuentaArchivo).attr("codigo", "");
                            $("#" + idCuentaArchivo).val("");
                        } else {
                            if ($("#" + idCuentaArchivo).val() == "") {
                                $("#" + idCuentaArchivo).attr("codigo", "");
                            }
                        }
                        return false;
                    },
                    open: function (event, ui) {
                        Selecciono = false;
                        return false;
                    }
                }).data("autocomplete")._renderItem = function (ul, item) {
                    return $("<li></li>").data("item.autocomplete", item).append("<a>" + item.P_vcCod + "=" + item.label + "</a>").appendTo(ul);
                };
            }



        }

    };

});


enviarArchivosParaImportar = function () {
    var formData = new FormData();
    var request = new XMLHttpRequest();
    var iContador = 0;
    for (var i = 0; i < listaArchivos.length; i++) {
        if ((typeof listaArchivos[i] !== 'undefined')) {
            iContador++;
            formData.append("file_" + iContador.toString(), listaArchivos[i]);
        }
    }
    formData.append("Passwords", Passwords);
    formData.append("Cuentas", Cuentas);
    formData.append("rlstTarea", $("input[name='rlstTarea']:checked").val());
    formData.append("rbProgramacion", $("input[name='rbProgramacion']:checked").val());
    formData.append("txtFechaProgramacion", $("#txtFechaProgramacion").val());
    formData.append("ddlOperador", $("#ddlOperador").val());
    formData.append("ddlExtensionArchivo", $("#ddlExtensionArchivo").val());
    formData.append("hdfCodPla", $("#hdfCodPla").val());
    formData.append("ddlTipoTelefonia", $("#ddlTipoTelefonia").val());

    formData.append("chkUnirValoresBits", $("#chkUnirValoresBits").val());
    formData.append("rbUnirValoresBits", $("#rbUnirValoresBits").val());

    formData.append("hdfCodEmpleado", $("#hdfCodEmpleado").val());
    formData.append("txtPeriodo", $("#txtPeriodo").val());
    formData.append("txtTipoCambio", $("#txtTipoCambio").val());
    formData.append("hdfInCodCta", $("#hdfInCodCta").val());
    formData.append("hdfbtTipoPla", $("#hdfbtTipoPla").val());



    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            alerta(request.response);
            //$("#txtPeriodo").val("");
            $("#hdfIdPerfil").val("-1");

            listaArchivos = [];
            listaArchivos.length = 0;
            $("#fulArchivo").val("");

            $("#dvArchivos div").remove();
            $("#dvArchivos").hide();

            setTimeout(function () {
                //debugger;
                fileInput = document.getElementById('fulArchivo');
            }, 500);

            //var xhrForm = new XMLHttpRequest();
            //xhrForm.open("POST", "getfile.php");
            //xhrForm.send(form);
        }
    };

    request.open("POST", 'Imp_Proceso.aspx/SubirArchivosMultiples');
    request.send(formData);

    //$("#btnGuardarSer").click();
    //return;

    //const selectedFile = document.getElementById('fulArchivo').files[0];

    //var theForm = document.forms['form1'];
    ////var formData = new FormData(theForm);
    //var formData = new FormData($('#form1')[0]);
    //var iContador = 0;
    //for (var i = 0; i < listaArchivos.length; i++) {
    //    if ((typeof listaArchivos[i] !== 'undefined')) {
    //        iContador++;
    //        formData.append("file_" + iContador.toString(), listaArchivos[i]);
    //    }
    //}
    //theForm.submit();


};




