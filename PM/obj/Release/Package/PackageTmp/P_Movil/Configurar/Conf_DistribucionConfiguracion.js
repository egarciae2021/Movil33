//#region Variables Globales
//var Nametab;
//var Accord;
var arFechasCuenta = [];
var vKeyMensaje = 'c';
var charTotal = 5000;
var inMaxParamGrilla = 5;
//var bDefPer = true;
var arParametros = [
    { codParam: '{Periodo}', descParam: 'Periodo Actual' },
    { codParam: '{CodigoCuenta}', descParam: 'Código de la cuenta' },
    { codParam: '{NombreCuenta}', descParam: 'Nombre de la cuenta' },
    { codParam: '{FechaHora}', descParam: 'Fecha y hora de envio de correo' }
    , { codParam: '{NombreOperador}', descParam: 'Nombre del operador de la cuenta' }
    //, { codParam: '{DiaLimiteEnvio}', descParam: 'Día límite de envio al operador' }
    //, { codParam: '{DiaCierreDistribucion}', descParam: 'Día del cierre de la distribución' }
];
//#endregion

    $(function () {



        //#region Valores/Estados inciales

        var EsPrincipal = $("#hdfEsPrincipal").val();

        if (EsPrincipal == "1" || EsPrincipal == "2") {

        }
        else {
            //Nametab = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
            //Accord = window.parent.$("#" + Nametab);
        }

        //if (bDefPer) $("#trDefinicionPeriodo").show(); else $("#trDefinicionPeriodo").hide();

        $(".btnNormal").button({});
        $(".accordion").accordion({
            collapsible: true,
            autoHeight: false
        });

        $("#txtHoraEjecDis").removeClass("ui-widget-content ui-corner-all");
        $("#txtHoraEjecDis").css("padding", "0px");
        $("#txtHoraEjecDis").css("margin", "0px");
        $("#txtHoraEjecDis").kendoTimePicker({
            culture: "es-ES",
            animation: false,
            format: "HH:mm:ss",
            interval: 60
        });

        $(".KendoEditor").kendoEditor({
            tools: [
            { name: "bold", tooltip: "Negritas" },
            { name: "italic", tooltip: "Cursiva" },
            { name: "underline", tooltip: "Subrayado" },
            { name: "strikethrough", tooltip: "Tachado" },
            { name: "justifyLeft", tooltip: "Alinear a la izquierda" },
            { name: "justifyCenter", tooltip: "Centrar" },
            { name: "justifyRight", tooltip: "Alinear a la derecha" },
            { name: "justifyFull", tooltip: "Justificar" },
            { name: "insertUnorderedList", tooltip: "Viñetas" },
            { name: "insertOrderedList", tooltip: "Numeración" },
            { name: "indent", tooltip: "Disminuir sangría" },
            { name: "outdent", tooltip: "Aumentar sangría" }
            //, { template: "<label id='lblTotal' style='padding-left: 30px;'>0 caracteres restantes</label>" }
            //, { template: "<label id='" + (this.textarea.id == "txtMensaje_EnvOper" ? "charRestantes_EnvOpe" : "charRestantes_CerDis") + "' style='padding-left: 30px;'>0 caracteres restantes</label>" }
        ],
            //tools: ["bold", "italic", "underline", "strikethrough",
            //                "justifyLeft", "justifyCenter", "justifyRight", "justifyFull",
            //                "insertUnorderedList", "insertOrderedList",
            //                "indent", "outdent"
            ////,"fontName", "fontSize"
            //        ],
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
                //,fontNameInherit: "(Fuente)", fontSizeInherit: "(Tamaño de fuente)"
                //,fontName: "Fuente", fontSize: "Tamaño de fuente"
            },
            encoded: true,
            keyup: function (e) {
                var numPalabrasDescrip;
                if (vKeyMensaje == 'w') { //validación por tipo palabras
                    numPalabrasDescrip = wordCount(this.value());
                } else if (vKeyMensaje == 'c') { //validación por caracteres
                    numPalabrasDescrip = characterCount(this.value());
                }
                if (this.textarea.id == "txtMensaje_EnvOper") {
                    $("#charRestantes_EnvOpe").text(parseInt(charTotal) - parseInt(numPalabrasDescrip));
                } else if (this.textarea.id == "txtMensaje_CerDis") {
                    $("#charRestantes_CerDis").text(parseInt(charTotal) - parseInt(numPalabrasDescrip));
                }
                //$("#lblTotal").text((parseInt(charTotal) - parseInt(numPalabrasDescrip)).toString() + " caracteres restantes");
            }
        });

        //validacion de seguridad
        if ($("#hdfEsAdmin").val() == '0' && $("#hdfEsAdBol").val() == '0') {
            $("#btnGuardar").button("option", "disabled", true);
        }

        $("#charRestantes_EnvOpe").text(parseInt(charTotal) - characterCount($("#txtMensaje_EnvOper").data("kendoEditor").value()));
        $("#charRestantes_CerDis").text(parseInt(charTotal) - characterCount($("#txtMensaje_CerDis").data("kendoEditor").value()));

        $("#ddlCuenta").attr("disabled", true);
        $("#ddlFecLimEnv").attr("disabled", true);
        $("#ddlFecProc").attr("disabled", true);
        $("#trDictPorOrgUsu").hide(); //solo editable por base de datos

        var tbColumns = [
        { name: 'codParam', label: 'Parámetro', width: 150, sortable: false },
        { name: 'descParam', label: 'Descripción', width: 250, sortable: false }
    ];

        $("#tbParametrosCorreo").jqGrid({
            width: 460,
            height: (arParametros.length <= inMaxParamGrilla ? 23 * arParametros.length : 23 * inMaxParamGrilla),
            datatype: 'local',
            colModel: tbColumns,
            caption: "Parámetros de correo",
            shrinkToFit: false,
            rownumbers: true,
            beforeSelectRow: function (rowid, status, e) {
                return false;
            },
            onRightClickRow: function () {
                $("#tbParametrosCorreo").jqGrid('resetSelection');
                return false;
            }
        });

        fnCargarDiasFechas(28);
        fnCargarParametros();

        
        //fnCargarCuentasPorOperador();

        //#endregion
        

        //#region DimPosElementos
        $(window).resize(function () {
            DimPosElementos();
        });
        function DimPosElementos() {
            var Ancho = $(window).width();
            var Alto = $(window).height();
            //$("#txtMensajeApr").css("width", Ancho - 250);
        }
        //#endregion

        //#region Eventos
        $("#ddlOperador").change(function () {
            if ($(this).val() != "-1") {
                fnCargarCuentasPorOperador();
            } else {
                $("#ddlCuenta").attr("disabled", true);                
                $("#ddlCuenta").val('-1');                
                fnDeshabilitarControlesFechas();
            }
        });
        var fc;
        $("#ddlCuenta").focus(function () {
            fc = $(this).val();
        }
        ).change(function () {
            //$("#txtHoraEjecDis").val("");
            var f1 = $("#ddlFecLimEnv").val(), f2 = $("#ddlFecProc").val();
            if (fc != '-1') { //validar los datos de la cuenta antes de guardar
                if (f1 == '-1' && fc != "-1") {
                    //alerta("Debe seleccionar un " + $("#lblFecLimEnv").text());
                    //$(this).val(fc);
                    //return;
                } else if (f2 == '-1' && fc != "-1") {
                    //alerta("Debe seleccionar un " + $("#lblFecProc").text());
                    //$(this).val(fc);
                    //return;
                } else if (f1 != -1 && f1 == f2) {
                    alerta("El " + $("#lblFecLimEnv").text() + " y el " + $("#lblFecProc").text() + " no puden ser iguales.");
                    $(this).val(fc);
                    return;
                }
                fnActualizarFechaCuenta(fc); //actualizar datos de la cuenta
                if ($(this).val() == "-1") {
                    fnDeshabilitarControlesFechas();
                } else {
                    fnHabilitarControlesFechas();
                    fnMostrarFechaCuenta();
                }
                $(this).blur();
            } else {
                if ($(this).val() == "-1") {
                    fnDeshabilitarControlesFechas();
                } else {
                    fnHabilitarControlesFechas();
                    fnMostrarFechaCuenta();
                    //fnMostrarConfiguracionCuenta($(this).val());
                }
                $(this).blur();
            }
        });
        //$("#ddlCuenta").focus(function () {
        //    if ($(this).val() != "-1") {
        //        if ($("#ddlFecLimEnv").val() == '-1') {
        //            alerta("Debe seleccionar un " + $("#lblFecLimEnv").text());
        //            $("#ddlFecLimEnv").focus();
        //            $(this).focusout();
        //            $(this).val($(this).val());
        //            return;
        //        } else if ($("#ddlFecProc").val() == '-1') {
        //            alerta("Debe seleccionar un " + $("#lblFecProc").text());
        //            $("#ddlFecProc").focus();
        //            $(this).focusout();
        //            $(this).val($(this).val());
        //            return;
        //        } else {
        //            fnActualizarFechaCuenta();
        //        }
        //    }
        //}).change(function () {
        //    if ($(this).val() == "-1") {
        //        fnDeshabilitarControlesFechas();
        //    } else {
        //        fnHabilitarControlesFechas();
        //        fnMostrarFechaCuenta();
        //    }
        //});
        $("#chkEnvOper").change(function () {
            if ($(this).is(":checked")) {
                $("#dvCorreo_EnvOpe").show(200);
            } else {
                $("#dvCorreo_EnvOpe").hide(200);
            }
        });
        $("#chkCerDist").change(function () {
            if ($(this).is(":checked")) {
                $("#dvCorreo_CerDis").show(200);
            } else {
                $("#dvCorreo_CerDis").hide(200);
            }
        });
        $("#btnGuardar").click(function () {
            fnGuardarConfiguracion();
        });

        $("#btnCerrar").click(function () {
            var EsPrincipal = $("#hdfEsPrincipal").val();

            if (EsPrincipal == "1" || EsPrincipal == "2") {
                window.parent.EsPrincipal = "0";
                window.parent.$("#dvAsignaConfigBolsa").dialog("close");
            }
            else {
                fnCerrarConfiguracion();
            }
        });

        //#endregion        

        $("#txtHoraEjecDis").val("");
        $("#txtHoraEjecDis").data("kendoTimePicker").readonly(true);    
        $("#chkEnvOper").attr("disabled", true);
        $("#chkEnvOper").prop("checked", false);
        $("#chkCerDist").attr("disabled", true);
        $("#chkCerDist").prop("checked", false);

        
        if ($("#ddlOperador option").length == 2)
        {
            $("#ddlOperador").change();
            //$("#ddlCuenta").attr("disabled", false);
        }
    });




//#region Cargar Datos
function fnCargarCuentasPorOperador() 
{
    var vIdOperador = $("#ddlOperador").val();

    var ListarCuentaPorOperador_Data = { inCodOpe: vIdOperador };
    $.ajax({
        type: "POST",
        url: "Conf_DistribucionMinutos.aspx/ListarCuentaPorOperador",
        data: JSON.stringify(ListarCuentaPorOperador_Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if ($(result.d).length > 0) {
                $("#ddlCuenta").html("");
                $("#ddlCuenta").append($("<option></option>").attr("value", "-1").text("<Seleccionar>"));
                for (i in result.d) {
                    $("#ddlCuenta").append($("<option></option>").attr("value", result.d[i].P_vcCod).text(result.d[i].vcNom));
                }
                $("#ddlCuenta").attr("disabled", false);
                $("#ddlCuenta").val('-1');
                fnDeshabilitarControlesFechas();
            } else {
                $("#ddlCuenta").html("");
                $("#ddlCuenta").append($("<option></option>").attr("value", "-2").text("<Sin Datos>"));
                $("#ddlCuenta").attr("disabled", false);
                fnDeshabilitarControlesFechas();
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnCargarDiasFechas(TotalDias) 
{
    $("#ddlFecLimEnv").append($("<option></option>").val(-1).text('<Seleccionar>'));
    $("#ddlFecProc").append($("<option></option>").val(-1).text('<Seleccionar>'));
    var i = 1;
    
    for (i = 1; i <= TotalDias; i++) 
    {        
        $("#ddlFecLimEnv").append($("<option></option>").val(i).text(i.toString()));
        $("#ddlFecProc").append($("<option></option>").val(i).text(i.toString()));
    }
}
//#endregion

//#region Acciones
function fnGuardarConfiguracion() {
    var FecLimEnv, FecProc, HoraEjecDis, chkDisOrgUsu;
    var chkEnvOpe, inNumDias_EnvOpe, Destinatarios_EnvOpe, Asunto_EnvOpe, Mensaje_EnvOpe;
    var chkCerDis, inNumDias_CerDis, Destinatarios_CerDis, Asunto_CerDis, Mensaje_CerDis;
    
    FecLimEnv = $("#ddlFecLimEnv").val();
    FecProc = $("#ddlFecProc").val();
    HoraEjecDis = $("#txtHoraEjecDis").val();
    chkDisOrgUsu = $("#chkActDistPorOrgUsu").is(":checked") ? true : false;

    chkEnvOpe = $("#chkEnvOper").is(":checked") ? true : false;
    inNumDias_EnvOpe = $("#ddlDiasEnvOper").val();
    Destinatarios_EnvOpe = $("#txtDestinatarios_EnvOper").val();
    Asunto_EnvOpe = $("#txtAsunto_EnvOper").val();
    //Mensaje_EnvOpe = $("#txtMensaje_EnvOper").val();
    Mensaje_EnvOpe = $("#txtMensaje_EnvOper").data("kendoEditor").value().replace(/'/g, "&#39").replace(/\\/g, "&#92");
    CaracteresRestantes_EnvOpe = parseInt($("#charRestantes_EnvOpe").text());

    chkCerDis = $("#chkCerDist").is(":checked") ? true : false;
    inNumDias_CerDis = $("#ddlDiasCerDis").val();
    Destinatarios_CerDis = $("#txtDestinatarios_CerDis").val();
    Asunto_CerDis= $("#txtAsunto_CerDis").val();
    //Mensaje_CerDis = $("#txtMensaje_CerDis").val();
    Mensaje_CerDis = $("#txtMensaje_CerDis").data("kendoEditor").value().replace(/'/g, "&#39").replace(/\\/g, "&#92");
    CaracteresRestantes_CerDis = parseInt($("#charRestantes_CerDis").text());
    
    if ($("#ddlCuenta").val() == '-2') 
    {    
        alerta("El dato " + $("#lblCuenta").text() + " es un campo obligatorio.");
        FocusAlert(0, "ddlCuenta");
        return;
    }

    if ($("#ddlCuenta").val() != '-1' && FecLimEnv == '-1') {
        alerta("El dato " + $("#lblFecLimEnv").text() + " es un campo obligatorio.");
        FocusAlert(0, "ddlFecLimEnv");
        return;
    }
    if ($("#ddlCuenta").val() != '-1' && FecProc == '-1') {
        alerta("El dato " + $("#lblFecProc").text() + " es un campo obligatorio.");
        FocusAlert(0, "ddlFecProc");
        return;
    }
    var f1 = $("#ddlFecLimEnv").val(), f2 = $("#ddlFecProc").val();
    if (f1 != -1 && f1 == f2) {
        alerta("El " + $("#lblFecLimEnv").text() + " y el " + $("#lblFecProc").text() + " no puden ser iguales.");
        $(this).val(fc);
        return;
    }

    fnActualizarFechaCuenta($("#ddlCuenta").val());
    if (HoraEjecDis == '') {
        alerta("El dato Hora de Ejecución de Distribución es un campo obligatorio.");
        FocusAlert(1, "txtHoraEjecDis");
        return;
    }

    if (chkEnvOpe) {
        if (Destinatarios_EnvOpe == '') {
            alerta("Debe ingresar por lo menos un destinatario.");
            FocusAlert(2, "txtDestinatarios_EnvOper");
            return;
        }
        //if (!validarEmail2(Destinatarios_EnvOpe)) {
        if (!validarEmailMultiple(Destinatarios_EnvOpe)) {
            alerta("Debe ingresar un correo válido.");
            FocusAlert(2, "txtDestinatarios_EnvOper");
            return;
        }
        if (Asunto_EnvOpe == '') {
            alerta("Debe ingresar un asunto para el correo.");
            FocusAlert(2, "txtAsunto_EnvOper");
            return;
        }
        if (Mensaje_EnvOpe == '') {
            alerta("Debe ingresar un mensaje para el correo.");
            focus(2, "txtMensaje_EnvOper");
            return;
        }
        if (CaracteresRestantes_EnvOpe < 0) {
            alerta("Ha superado la cantidad máxima de caracteres permitidos para el cuerpo del correo.");
            focus(2, "txtMensaje_EnvOper");
            return;
        }
    }

    if (chkCerDis) {
        if (Destinatarios_CerDis == '') {
            alerta("Debe ingresar por lo menos un destinatario.");
            FocusAlert(2, "txtDestinatarios_CerDis");
            return;
        }
        //if (!validarEmail2(Destinatarios_CerDis)) {
        if (!validarEmailMultiple(Destinatarios_CerDis)) {
            alerta("Debe ingresar un correo válido.");
            FocusAlert(2, "txtDestinatarios_CerDis");
            return;
        }
        if (Asunto_CerDis == '') {
            alerta("Debe ingresar un asunto para el correo.");
            FocusAlert(2, "txtAsunto_CerDis");
            return;
        }
        if (Mensaje_CerDis == '') {
            alerta("Debe ingresar un mensaje para el correo.");
            focus(2, "txtMensaje_CerDis");
            return;
        }
        if (CaracteresRestantes_CerDis < 0) {
            alerta("Ha superado la cantidad máxima de caracteres permitidos para el cuerpo del correo.");
            focus(2, "txtMensaje_CerDis");
            return;
        }
    }

    var XML_Fechas = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT>";
    var vCuenta, inCod, inFecha;
    //var vcFechasCuentas = Object.keys(arFechasCuenta);
    var vcFechasCuentas = fnObtenerLlavesArray(arFechasCuenta);
    var i = 0;
    for (i = 0; i < vcFechasCuentas.length; i++) {
        vCuenta = vcFechasCuentas[i].split("|")[1];
        inCod = vcFechasCuentas[i].split("|")[0];
        inFecha = arFechasCuenta[vcFechasCuentas[i]].inFecha;
        XML_Fechas += '<DATA vcCodCue=\"' + vCuenta + '\" inCod=\"' + inCod + '\" inFecha=\"' + inFecha + '\" />';
    }
    XML_Fechas += "</ROOT>";

    GuardarConfiguracion_Data = {
        HoraEjecDis: HoraEjecDis,
        chkEnvOpe: chkEnvOpe.toString(),
        inNumDias_EnvOpe: inNumDias_EnvOpe,
        Destinatarios_EnvOpe: Destinatarios_EnvOpe,
        Asunto_EnvOpe: Asunto_EnvOpe,
        Mensaje_EnvOpe: Mensaje_EnvOpe,
        chkCerDis: chkCerDis.toString(),
        inNumDias_CerDis: inNumDias_CerDis,
        Destinatarios_CerDis: Destinatarios_CerDis,
        Asunto_CerDis: Asunto_CerDis,
        Mensaje_CerDis: Mensaje_CerDis,
        chkDisOrgUsu: chkDisOrgUsu.toString(),
        XML_Fechas: XML_Fechas,
        F_vcCodCue: $("#ddlCuenta").val(),
    };

    $.ajax({
        type: "POST",
        url: "Conf_DistribucionConfiguracion.aspx/GuardarConfiguracion",
        data: JSON.stringify(GuardarConfiguracion_Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            Mensaje("<br/><h1>Configuración de distribución guardada</h1><br/>", document, fnCerrarConfiguracion);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnCerrarConfiguracion() 
{
    //BloquearPagina(false);
    var EsPrincipal = $("#hdfEsPrincipal").val();

    if (EsPrincipal == "1" || EsPrincipal == "2") 
    {
        window.parent.EsPrincipal = "0";
        window.parent.$("#dvAsignaConfigBolsa").dialog("close");
    }
    else 
    {
        //Accord.tabs("remove", Accord.tabs("option", "selected"));
    }
}
//#endregion

//#region Funciones de Pagina
function fnActualizarFechaCuenta(vCodCue) 
{
    //var vCuenta = $("#ddlCuenta").val();
    var vCuenta = vCodCue;
    var inFecha_1 = $("#ddlFecLimEnv").val();
    var inFecha_2 = $("#ddlFecProc").val();
    var vcHoraEjecucion = $("#txtHoraEjecDis").val();

    if (vCuenta == '-1') 
    {
        return;
    }
    if (arFechasCuenta['1|' + vCuenta.toString()] == undefined) 
    {
        arFechasCuenta['1|' + vCuenta.toString()] = [];
        arFechasCuenta['1|' + vCuenta.toString()].inFecha = inFecha_1;
        arFechasCuenta['1|' + vCuenta.toString()].vcHoraEjecucion = vcHoraEjecucion;
    } else 
    {
        arFechasCuenta['1|' + vCuenta.toString()].inFecha = inFecha_1;
        arFechasCuenta['1|' + vCuenta.toString()].vcHoraEjecucion = vcHoraEjecucion;
    }

    if (arFechasCuenta['2|' + vCuenta.toString()] == undefined) 
    {
        arFechasCuenta['2|' + vCuenta.toString()] = [];
        arFechasCuenta['2|' + vCuenta.toString()].inFecha = inFecha_2;
        arFechasCuenta['2|' + vCuenta.toString()].vcHoraEjecucion = vcHoraEjecucion;
    } else 
    {
        arFechasCuenta['2|' + vCuenta.toString()].inFecha = inFecha_2;
        arFechasCuenta['2|' + vCuenta.toString()].vcHoraEjecucion = vcHoraEjecucion;
    }
}

function fnMostrarFechaCuenta() 
{
    var vCuenta = $("#ddlCuenta").val();
    if (arFechasCuenta['1|' + vCuenta.toString()] == undefined) 
    {
        $("#ddlFecLimEnv").val(-1);        
        $("#txtHoraEjecDis").val("");
    } 
    else 
    {
        $("#ddlFecLimEnv").val(arFechasCuenta['1|' + vCuenta.toString()].inFecha);
        $("#txtHoraEjecDis").val(arFechasCuenta['1|' + vCuenta.toString()].vcHoraEjecucion);
    }
    if (arFechasCuenta['2|' + vCuenta.toString()] == undefined) 
    {
        $("#ddlFecProc").val(-1);
        $("#txtHoraEjecDis").val("");
    } 
    else 
    {
        $("#ddlFecProc").val(arFechasCuenta['2|' + vCuenta.toString()].inFecha);
        $("#txtHoraEjecDis").val(arFechasCuenta['2|' + vCuenta.toString()].vcHoraEjecucion);
    }
}

function fnDeshabilitarControlesFechas() 
{
    $("#ddlFecLimEnv").val('');
    $("#ddlFecProc").val('');
    $("#ddlFecLimEnv").attr("disabled", true);
    $("#ddlFecProc").attr("disabled", true);    
    $("#txtHoraEjecDis").val("");
    $("#txtHoraEjecDis").data("kendoTimePicker").readonly(true);    
    $("#chkEnvOper").attr("disabled", true);
    $("#chkEnvOper").prop("checked", false);
    $("#chkCerDist").attr("disabled", true);
    $("#chkCerDist").prop("checked", false);
}

function fnHabilitarControlesFechas() 
{
    $("#ddlFecLimEnv").attr("disabled", false);
    $("#ddlFecProc").attr("disabled", false);    
    $("#txtHoraEjecDis").data("kendoTimePicker").readonly(false);
    $("#chkEnvOper").attr("disabled", false);
    $("#chkEnvOper").prop("checked", false),
    $("#chkCerDist").attr("disabled", false);
    $("#chkCerDist").prop("checked", false);
}

function FocusAlert(IndexAccordion, Control) {
    if ($("#AccordionJQ1").accordion("option", "active").toString() == "false") {
        $("#AccordionJQ1").accordion("option", "active", IndexAccordion);
    } else {
        if ($("#AccordionJQ1").accordion("option", "active") != IndexAccordion) {
            $("#AccordionJQ1").accordion("option", "active", IndexAccordion);
        }
    }
    if (Control != "") {
        $("#" + Control).focus();
    }
}

function characterCount(value) {
    var text = $("<div>").html(value).text();
    //alert("value: " + value + "\ntext: " + text);
    return text.length;
}

function fnCargarParametros() {
    var i = 0;
    for (i = 0; i < arParametros.length; i++) {
        $("#tbParametrosCorreo").jqGrid('addRowData', arParametros[i].codParam, arParametros[i]);
    }
}

//agregado 22-10-2015 wapumayta (agregado para funcionalidad en IE8
function fnObtenerLlavesArray(obj) {
    var keys = [];
    for (i in obj) {
        if (obj.hasOwnProperty(i)) {
            keys.push(i);
        }
    }

    return keys;
}

//function fnValidarFechas(f1, f2, f3) {
//    var rtn = true;
//    f1 = parseInt(f1), f2 = parseInt(f2), f3 = parseInt(f3);
//    if ((f1 < f3 && f2 < f3) || (f1 > f3 && f2 > f3)) {
//        if (f1 > f2) {
//            rtn = false;
//        }
//    } else {
//        if (f1 < f3 && f2 > f3) {
//            rtn = false;
//        }
//    }
//    return rtn;    
//}
//#endregion