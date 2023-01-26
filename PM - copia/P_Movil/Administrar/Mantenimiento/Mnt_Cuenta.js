var tbAsignacion;
var lstServicio;
var lstTipoServicio;
var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var lstIndexCodSubCue = [];
var ActualizarOrgaEmpleados = 0

function cuenta(P_vcCod, vcNom, dcPerFacIni, dcPerFacFin, dcMon, btVig, F_inCodTip, FechaInicioContrato, FechaFinContrato, Acuerdos, Adjuntos) {
    this.P_vcCod = P_vcCod;
    this.vcNom = vcNom;
    this.dcPerFacIni = dcPerFacIni;
    this.dcPerFacFin = dcPerFacFin;
    this.TipoAsignacionCredito = new tipoAsignacionCredito();
    this.TipoPeriodoFacturacion = new tipoPeriodoFacturacion();
    this.dcMon = dcMon;
    this.Operador = new operador();
    this.SubCuentas = [];
    this.btVig = btVig;
    this.F_inCodTip = F_inCodTip;
    this.FechaInicioContrato = FechaInicioContrato;
    this.FechaFinContrato = FechaFinContrato;
    this.Acuerdos = Acuerdos;
    this.Adjuntos = Adjuntos;
    this.Organizacion = new organizacion();
}

function organizacion(vcCodInt) {
    this.vcCodInt = vcCodInt;
}

function tipoAsignacionCredito(P_inCod) {
    this.P_inCod = P_inCod;
}
function tipoPeriodoFacturacion(P_inCod) {
    this.P_inCod = P_inCod;
}
function operador(P_inCodOpe) {
    this.P_inCodOpe = P_inCodOpe;
}

function ActualizaMonto() {
    var monto = 0;
    var Monto;
    //var strHtml = '->';
    for (i = 0; i < $("#tbAsignacion").tabs("length"); i++) {
        var Monto = $("iframe", "#tbAsignacion")[i].contentWindow.ObtieneSubCuenta().dcMon;
        //alert(Monto + '-' + 1);
        if (Monto != "") {
            //if (oCulturaUsuario.vcSimDec = ',') {
            //    monto += parseFloat(Monto.replace(/\s/g, "").replace(",", "."));
            //} else {
            monto += parseFloat(Monto);
            //}            
            //alert(ParseFloatMultiPais(Monto, oCulturaUsuario));
            //monto += parseFloat(ParseFloatMultiPais(Monto, oCulturaUsuario));
            //alert(monto);
        }
    }

    //$("#lblMonto").html(monto);
    //if (oCulturaUsuario.vcSimDec == ',') {
    //    $("#lblMonto").html(FormatoNumero(monto.toString().replace(/\s/g, "").replace(".", ","), oCulturaUsuario));
    //} else {
    //    $("#lblMonto").html(FormatoNumero(monto, oCulturaUsuario));
    //}
    $("#lblMonto").html(FormatoNumero(monto, oCulturaUsuario));
}
//RRAMOS 20141201----------------------------------------------------------------------------------
function MostrarConfirmacion(idFile, vcNomAdj) {
    if (idFile) {
        $('#divMsgConfirmacionDeleteFile').dialog({
            title: "Quitar Archivo",
            modal: true,
            buttons: {
                "Aceptar": function () {
                    $(this).dialog("close");
                    $("#ifAdjuntoCuenta")[0].contentWindow.DeleteFileNew(vcNomAdj, idFile);
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
//-------------------------------------------------------------------------------------------------
var paginaUploadCuenta;

var oCulturaUsuario;
var FormatoFechaCulturaForDatePicker="";

function Paste_Event() {
    var PasteData;
    if (msie > 0)      // If Internet Explorer, return version number
    { PasteData = window.clipboardData.getData("Text"); }
    else                 // If another browser, return 0
    { PasteData = event.clipboardData.getData("Text"); }

    if (PasteData.length + $('#txtAcuerdos').val().length > 500) {
        event.returnValue = false;
    } else {
        event.returnValue = true;
    }
}

$(function () {
    oCulturaUsuario = window.parent.parent.oCulturaUsuario;
    FormatoFechaCulturaForDatePicker = oCulturaUsuario.vcFecCor.toLowerCase();

    if (FormatoFechaCulturaForDatePicker.indexOf("yyyy") >= 0) {
        FormatoFechaCulturaForDatePicker = FormatoFechaCulturaForDatePicker.replace("yyyy", "yy");  //Para datepicker 'yy' es como 'yyyy'; y 'y' es 'yy'
    }
    else if (FormatoFechaCulturaForDatePicker.indexOf("yy") >= 0) {
        FormatoFechaCulturaForDatePicker = FormatoFechaCulturaForDatePicker.replace("yy", "y");
    }

    Mantenimiento_Mostrar_VARBINARY("", "../../../");

    $('#txtAcuerdos').keypress(function (e) {
        if ($(this).val().length >= 500) {
            e.preventDefault();
        }
    });

    $("#lblMonto").css({ "text-align": "right" });

    $(".txtFecha").datepicker({
        changeMonth: true,
        changeYear: true,
        onSelect: function (dateText, inst) {
            //$("#txtVigencia").val(fnCalcularVigencia());
        }
    });
    $(".txtFecha").datepicker('option', 'dateFormat', FormatoFechaCulturaForDatePicker);

    if (oCulturaUsuario.vcCodCul.toString().toLowerCase() != 'es-pe' && oCulturaUsuario != null) {
        $("#lblMonto").text(FormatoNumero($("#lblMonto").text(), oCulturaUsuario));
    }

    //$("#ifAdjuntoCuenta").show();
    //paginaUploadCuenta = raiz("General/Uploads/Upload.aspx");
    paginaUploadCuenta = "../../../General/Uploads/Upload.aspx";
    $("#ifAdjuntoCuenta").attr("src", paginaUploadCuenta);
    var vcCodCueInicio = $("#hdfCuenta").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
    if (vcCodCueInicio != '-1') {
        //alert(vcCodCueInicio);
        var intervaloCargaUpload1;
        intervaloCargaUpload1 = setInterval(function () { fnCargarUpload1(); }, 1000);
        $("#ifAdjuntoCuenta").hide();
        function fnCargarUpload1() {
            try {
                if ($("#ifAdjuntoCuenta").attr("src") == paginaUploadCuenta) {
                    $("#ifAdjuntoCuenta")[0].contentWindow.CargarArchivos($("#hdfCuentaAdjuntos").val());
                    myStopFunction1();
                }
            }
            catch (Error) {
                //some error
            }
        }
        function myStopFunction1() {
            //alert('detenido1');
            $("#ifAdjuntoCuenta").show();
            clearInterval(intervaloCargaUpload1);
            intervaloCargaUpload1 = null;
        }

    }
    else {
        LimpiarListaAdjuntos(paginaUploadCuenta);
    }

    var indiceTab = 0;
    try {
        indiceTab = window.parent.tab.tabs("option", "selected");
    } catch (e) {
    }    
    var pagina = "";
    var NumeroSubCuenta = 1;
    var Titulo = "";
    var SubCuenta;
    var CargoServicio = false;

    IniciarPagina();

    function IniciarPagina() {
        //                    $("#txtCodigo").focus();
        $(".tdEtiqueta").css("width", "140px");

        if ($("#ddlAsignacionCredito").val() != "2") {
            $(".dvAsignacion").hide();
        }
        if ($("#ddlPeriodoFacturacion").val() == "1") {
            $("#trPeridoFacturacion").hide();
        }

        $("#trPeriodo").hide(); // se fuerza a que se oculte porque el dllPeriodo tambien se esta ocultando
        if ($("#ddlPeriodoFacturacion").val() != "1") { //Por cuenta
            $("#trPeriodo").hide();
        }

        /*
        $("#ddlOperador").val(5109);
        $("#ddlOperador_input").kendoComboBox({
        enable: false
        });           
        */
    }

    $(".btnNormal").button();
    $(".VARCHAR").keypress(ValidarCadena);
    $(".INT").keypress(ValidarEntero);
    $(".DECIMAL").keypress(ValidarDecimal);
    $(".DATE").keypress(ValidarFecha);
    $(".DATETIME").keypress(ValidarFechaHora);

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
        changeYear: true
    });

    tbAsignacion = $("#tbAsignacion").tabs({
        tabTemplate: "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close'>Remover Tab</span></li>",
        add: function (event, ui) {
            var ifra = document.createElement('IFRAME');
            ifra.width = "100%";
            ifra.height = "100%";
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
            ifra.className = "SinBordes";
            $(ui.panel).append(ifra);
            $(this).tabs('select', '#' + ui.panel.id);
            pagina = "";
        }
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

    $("#txtCodigo").focusout(function () {
        $("#txtCodigo").val($("#txtCodigo").val().replace(/\\/g, "").replace(/'/g, ""));
    });

    //                $("#txtNombre").focusout(function () {
    //                    $("#txtNombre").val($("#txtNombre").val().replace(/\\/g, ""));
    //                });

    $("#btnGuardar").click(function (event) {
        var i = 0;
        var ErrorValSubCuenta = false;
        var Cuenta = new cuenta();
        var CamposDinamicos = "";

        Cuenta.P_vcCod = $("#txtCodigo").val().replace(/'/g, "").replace(/"/g, "&#34").replace(/\\/g, "");
        Cuenta.vcNom = $("#txtNombre").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        Cuenta.P_vcCod = Cuenta.P_vcCod.replace(/'/g, "&#39");
        Cuenta.vcNom = Cuenta.vcNom.replace(/'/g, "&#39");
        Cuenta.Operador.P_inCodOpe = $("#ddlOperador").val();
        Cuenta.Organizacion.vcCodInt = $("#cbeOrganizacion_hdControl").val();
        Cuenta.TipoAsignacionCredito.P_inCod = $("#ddlAsignacionCredito").val();
        Cuenta.TipoPeriodoFacturacion.P_inCod = $("#ddlPeriodoFacturacion").val();
        Cuenta.F_inCodTip = $("#ddlLineaTipo").val();

        Cuenta.FechaInicioContrato = $.trim($("#txtFechaInicioContrato").val());
        Cuenta.FechaFinContrato = $.trim($("#txtFechaFinContrato").val());
        Cuenta.Acuerdos = $.trim($("#txtAcuerdos").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92"));
        Cuenta.Acuerdos = Cuenta.Acuerdos.replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92").replace(/'/g, "").replace(/"/g, "");

        if (Cuenta.TipoAsignacionCredito.P_inCod == "2") {
            if ($("#hdfSepMiles").val() == ",") {
                Cuenta.dcMon = $("#lblMonto").html().replace(/[,*+?^${}()|[\]\\]/g, "");
            } else {
                Cuenta.dcMon = $("#lblMonto").html().replace(/[.*+?^${}()|[\]\\]/g, "");
                Cuenta.dcMon = $("#lblMonto").html().replace(",", ".");
            }
            //Cuenta.dcMon = DevuelveNumeroSinFormato(Cuenta.dcMon, oCulturaUsuario, false);
            //Cargar aca las sub cuentas
            for (i = 0; i < $("#tbAsignacion").tabs("length"); i++) {
                Cuenta.SubCuentas.push($("iframe", "#tbAsignacion")[i].contentWindow.ObtieneSubCuenta());
            }
        }
        else {
            Cuenta.dcMon = "0";
        }

        if ($("#ddlPeriodoFacturacion").val() == "1") { //Por cuenta
            Cuenta.dcPerFacIni = $("#ddlDiaInicial").val();
            //Cuenta.dcPerFacFin = $("#lblDiaFinal").html();
        }
        else {
            Cuenta.dcPerFacIni = "0";
            Cuenta.dcPerFacFin = "0";
        }

        Cuenta.btVig = false;

        if ($('#chkEstado').is(':checked')) {
            Cuenta.btVig = true;
        }

        if ($.trim(Cuenta.P_vcCod) == "") {
            alerta("El codigo de la cuenta es un campo obligatorio");
            $("#txtCodigo").val("");
            $("#txtCodigo").focus();
            return;
        }
        if ($.trim(Cuenta.vcNom) == "") {
            alerta("El nombre de la cuenta es un campo obligatorio");
            $("#txtNombre").val("");
            $("#txtNombre").focus();
            return;
        }
        if (Cuenta.Operador.P_inCodOpe == "-1") {
            alerta("Seleccione un operador, es un campo obligatorio");
            $("#ddlOperador").focus();
            return;
        }
        if (Cuenta.TipoPeriodoFacturacion.P_inCod == "-1") {
            alerta("Seleccione un tipo de facturación, es un campo obligatorio");
            $("#ddlPeriodoFacturacion").focus();
            return;
        }
        if (Cuenta.TipoAsignacionCredito.P_inCod == "-1") {
            alerta("Seleccione un tipo de asignación de crédito, es un campo obligatorio");
            $("#ddlAsignacionCredito").focus();
            return;
        }
        if (Cuenta.F_inCodTip == "-1") {
            Cuenta.F_inCodTip = 1;
            //alerta("Seleccione un tipo de grupo, es un campo obligatorio");
            //$("#ddlLineaTipo").focus();
            //return;
        }
        if (Cuenta.FechaInicioContrato == "") {
            alerta("Ingrese la fecha de inicio del contrato");
            $("#txtFechaInicioContrato").focus();
            return;
        }
        if (Cuenta.FechaFinContrato == "") {
            alerta("Ingrese la fecha fin del contrato");
            $("#txtFechaFinContrato").focus();
            return;
        }
        if ($("#ddlTipoServicio").val() == "-1") {
            alerta("Seleccione un tipo de servicio, es un campo obligatorio");
            $("#ddlTipoServicio").focus();
            return;
        }
        //Validar nuevos campos...
        var dtFechaInicio, dtFechaFin;
        try {
            dtFechaInicio = Date.parseExact(Cuenta.FechaInicioContrato, oCulturaUsuario.vcFecCor);
            if (dtFechaInicio == null) {
                alerta("Ingrese una fecha de inicio correcta");
                $("#txtFechaInicioContrato").focus();
                return;
            }
        }
        catch (e) {
            alerta("Ingrese una fecha de inicio correcta");
            $("#txtFechaInicioContrato").focus();
            return;
        }
        try {
            dtFechaFin = Date.parseExact(Cuenta.FechaFinContrato, oCulturaUsuario.vcFecCor);
            if (dtFechaFin == null) {
                alerta("Ingrese una fecha fin correcta");
                $("#txtFechaFinContrato").focus();
                return;
            }
        }
        catch (e) {
            alerta("Ingrese una fecha fin correcta");
            $("#txtFechaFinContrato").focus();
            return;
        }
        //Verificar rango minimo...
        //var fechaFormato = $(".txtFecha").datepicker("option", "dateFormat");
        //if (Date.today().isBefore(tomorrow))
        //alert(dtFechaInicio - dtFechaFin);

        if ((dtFechaInicio - dtFechaFin) >= 0) {
            alerta("La fecha inicial debe ser menor a la fecha final");
            return;
        }
        //return;

        Cuenta.FechaInicioContrato = Date2Ansi(dtFechaInicio);
        Cuenta.FechaFinContrato = Date2Ansi(dtFechaFin);

        if (Cuenta.TipoAsignacionCredito.P_inCod == "2") {
            if ($(Cuenta.SubCuentas).length == 0) {
                alerta("Ingrese por lo menos una sub cuenta");
                return;
            }
            i = 0;
            $(Cuenta.SubCuentas).each(function () {
                if (this.vcNom == "") {
                    alerta("Ingrese el nombre de la sub cuenta, es un campo obligatorio");
                    $("#tbAsignacion").tabs("option", "selected", i);
                    $("iframe", "#tbAsignacion")[i].contentWindow.$("#txtNombre").focus();
                    ErrorValSubCuenta = true;
                    return false;
                }
                if (this.dcMon == "") {
                    alerta("Ingrese el monto de " + this.vcNom + ", es un campo obligatorio");
                    $("#tbAsignacion").tabs("option", "selected", i);
                    $("iframe", "#tbAsignacion")[i].contentWindow.$("#txtMonto").focus();
                    ErrorValSubCuenta = true;
                    return false;
                }
                else {
                    //Valida el formato del numero...
                    if (oCulturaUsuario.vcSimSepMil != "") {
                        var vcFiltrarSimSepMil = new RegExp("\\" + oCulturaUsuario.vcSimSepMil, 'g');
                        this.dcMon = this.dcMon.toString().replace(vcFiltrarSimSepMil, "");
                    }
                }

                if (oCulturaUsuario.vcSimSepMil == ",") {
                    this.dcCan = this.dcCan.toString().replace(/\,/g, "");
                }

                if (this.Servicios.length == 0) {
                    alerta("Ingrese por lo menos un servicio de " + this.vcNom);
                    $("#tbAsignacion").tabs("option", "selected", i);
                    $("iframe", "#tbAsignacion")[i].contentWindow.$("#btnAgregarServicio").focus();
                    ErrorValSubCuenta = true;
                    return false;
                }
                this.vcNom = this.vcNom.replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
                this.vcDes = this.vcDes.replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");

                i++;
            });
            if (ErrorValSubCuenta) {
                return;
            }
        }

        if ($("#ifAdjuntoCuenta").attr("src") == paginaUploadCuenta) {
            Cuenta.Adjuntos = $("#ifAdjuntoCuenta")[0].contentWindow.ObtenerArchivos();
        }

        //Valida el formato del numero...
        //if (oCulturaUsuario.vcSimSepMil == ",") {
        //    Cuenta.dcMon = Cuenta.dcMon.toString().replace(/\,/g, "");
        //}
        //        if (oCulturaUsuario.vcSimDec == ',') {
        //            var vcFiltrarSimSepMil = new RegExp("\\" + oCulturaUsuario.vcSimSepMil, 'g');
        //            Cuenta.dcMon = Cuenta.dcMon.toString().replace(vcFiltrarSimSepMil, "");
        //            Cuenta.dcMon = Cuenta.dcMon.toString().replace(",", ".");
        //        } else {
        //            Cuenta.dcMon = ParseFloatMultiPais(Cuenta.dcMon, oCulturaUsuario);
        //        }

        if (oCulturaUsuario.vcSimSepMil != "") {
            var vcFiltrarSimSepMil = new RegExp("\\" + oCulturaUsuario.vcSimSepMil, 'g');
            Cuenta.dcMon = Cuenta.dcMon.toString().replace(vcFiltrarSimSepMil, "");
        }


        var oCuenta = JSON.stringify(Cuenta);
        var vcCodCue = $("#hdfCuenta").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");

        $(".VARCHAR").each(function (i) {
            CamposDinamicos += "[" + $(this).attr("obj") + "]";
            CamposDinamicos += " = \"";
            CamposDinamicos += this.value.replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
            CamposDinamicos += "\",";

        });

        var ValidacionNumerica = true;
        $(".INT").each(function (i) {
            CamposDinamicos += "[" + $(this).attr("obj") + "]";
            CamposDinamicos += " = ";
            if ($.trim(this.value) == "") {
                CamposDinamicos += "0";
            }
            else {
                CamposDinamicos += this.value.replace(new RegExp('\\' + oCulturaUsuario.vcSimSepMil, 'g'), "");
                var NumeroDecimal = parseFloat(this.value.replace(new RegExp('\\' + oCulturaUsuario.vcSimSepMil, 'g'), ""));
                if (isNaN(NumeroDecimal)) { NumeroDecimal = 0; }
                if (NumeroDecimal > 99999999.99) {
                    alerta("El valor ingresado '" + this.value + "' debe ser menor.");
                    ValidacionNumerica = false;
                    return;
                }
            }
            CamposDinamicos += ",";
        });
        if (!ValidacionNumerica) { return; }

        ValidacionNumerica = true;
        $(".DECIMAL").each(function (i) {
            CamposDinamicos += "[" + $(this).attr("obj") + "]";
            CamposDinamicos += " = ";
            if ($.trim(this.value) == "") {
                CamposDinamicos += "0";
            }
            else {
                CamposDinamicos += this.value.replace(new RegExp('\\' + oCulturaUsuario.vcSimSepMil, 'g'), "");
                var NumeroDecimal = parseFloat(this.value.replace(new RegExp('\\' + oCulturaUsuario.vcSimSepMil, 'g'), ""));
                if (isNaN(NumeroDecimal)) { NumeroDecimal = 0; }
                if (NumeroDecimal > 99999999.99) {
                    alerta("El valor ingresado '" + this.value + "' debe ser menor.");
                    ValidacionNumerica = false;
                    return;
                }
            }
            CamposDinamicos += ",";
        });
        if (!ValidacionNumerica) { return; }

        $(".DATE").each(function (i) {
            CamposDinamicos += "[" + $(this).attr("obj") + "]";
            CamposDinamicos += " = \"";
            CamposDinamicos += this.value;
            CamposDinamicos += "\",";
        });
        $(".DATETIME").each(function (i) {
            var nVal = this.value.substring(0, 20);
            CamposDinamicos += "[" + $(this).attr("obj") + "]";
            CamposDinamicos += " = \"";
            CamposDinamicos += nVal;
            CamposDinamicos += "\",";
        });
        $(".BIT").each(function (i) {
            CamposDinamicos += "[" + $(this).attr("obj") + "]";
            CamposDinamicos += " = ";
            if ($("input", this).is(':checked') == true) {
                CamposDinamicos += "1";
            }
            else {
                CamposDinamicos += "0";
            }

            CamposDinamicos += ",";
        });
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

        BloquearPagina(true);
        $.ajax({
            type: "POST",
            url: "Mnt_Cuenta.aspx/Guardar",
            data: "{'oCuenta': '" + oCuenta + "'," +
                    "'vcCamDim': '" + CamposDinamicos + "'," +
                    "'vcAdj': '" + vcAdjuntos + "'," +
                "'inTipoSer': '" + $("#ddlTipoServicio").val() + "'," +
                "'inActualizarOrgaEmpleados': '" + ActualizarOrgaEmpleados.toString() + "'," +
                    "'vcCodCue': '" + vcCodCue.replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'}",

            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d != "-1") {
                    $.ajax({
                        type: "POST",
                        url: "Mnt_Cuenta.aspx/ActualizarMonto_x_Cuenta",
                        data: "{'strNumCuenta': '" + $("#hdfCuenta").val() + "'," +
                       "'inTipoAsigCre': '" + $("#ddlAsignacionCredito").val() + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            try {
                                window.parent.ActualizarGrilla();
                            } catch (e) {

                            }
                            try {
                                window.top.fnObtenerWindowPlantillaTab().$('#div_modal').dialog('close');
                            } catch (e) {
                            }
                            Mensaje("<br/><h1>Cuenta guardada</h1><br/><h2>" + Cuenta.vcNom + "</h2>", document, CerroMensaje);
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                            BloquearPagina(false);
                        }
                    });
                }
                else {
                    alerta("El código de la cuenta ya ha sido registrada anteriormente, no se pudo grabar el registro");
                    BloquearPagina(false);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });
    });

    $("#btnCerrar").click(function (event) {
        try {
            window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
        } catch (e) {
        }
        try {
            window.top.fnObtenerWindowPlantillaTab().$('#div_modal').dialog('close');
        } catch (e) {
        }        
    });

    function CerroMensaje() {
        BloquearPagina(false);
        if ($("#hdfCuenta").val() == "") {//Nuevo
            window.location.reload();
            ////$("#txtCodigo").val("");
            ////$("#txtNombre").val("");

            ////$("#txtFechaInicioContrato").val("");
            ////$("#txtFechaFinContrato").val("");
            ////$("#txtAcuerdos").val("");

            ////LimpiarListaAdjuntos("../../../General/Uploads/Upload.aspx");

            //////$("select#ddlOperador").prop('selectedIndex', 0);  //cambia el index seleccionado pero no el texto
            //////$("select#ddlAsignacionCredito").prop('selectedIndex', 0);
            //////$("select#ddlPeriodoFacturacion").prop('selectedIndex', 0);

            ////$("#ddlOperador").data("kendoComboBox").select(0);
            ////$("#ddlOperador").data("kendoComboBox").enable(true);
            ////if ($("#ddlOperador option").length == 2) {
            ////    $("#ddlOperador").data("kendoComboBox").select(1);
            ////    $("#ddlOperador").data("kendoComboBox").enable(false);
            ////    $("#ddlOperador").change();
            ////}


            ////$("#ddlAsignacionCredito").data("kendoComboBox").select(0);
            ////$("#ddlPeriodoFacturacion").data("kendoComboBox").select(1);
            ////if ($("#hdfCodLinTip_X_User").val() == "0") { //solo limpiar si el comob está activo
            ////    $("#ddlLineaTipo").data("kendoComboBox").select(0);
            ////}

            ////$("#lblMonto").html("");
            //////$("select#ddlDiaInicial").prop('selectedIndex', 0);
            ////$("#ddlDiaInicial").data("kendoComboBox").select(0);
            //////$("#lblDiaFinal").val("30");
            ////$(".dvAsignacion").hide();
            ////$("#trPeriodo").hide();
            ////var numTab = $("#tbAsignacion").tabs("length");
            ////for (i = 0; i < numTab; i++)
            ////{ $("#tbAsignacion").tabs('remove', 0); }
            ////SubCuenta = "";
            ////Titulo = "Nuevo sub Cuenta";
            ////$("#btnAgregarSubCuenta").click();
        }
        else {//Edicion
            window.parent.tab.tabs("remove", indiceTab);
        }

        //$("#ddlOperador").attr('disabled', true);
        $("#ddlOperador").data("kendoComboBox").enable(false);
    }

    $("#btnAgregarSubCuenta").click(function (event) {
        pagina = 'Mnt_SubCuenta.aspx?Cod=' + SubCuenta.toString();
        var Id = "#" + "_Tab_SubCuenta" + NumeroSubCuenta.toString();
        var $panel = tbAsignacion.find(Id);
        if (!$panel.length) {//En el caso que no exista el tab, lo crea
            tbAsignacion.tabs("add", Id, Titulo);
            $(Id).css("width", "99%");
            $(Id).css("height", "345px");
            $(Id).css("margin-top", "0px");
            $(Id).css("margin-left", "0px");
            $(Id).css("margin-bottom", "0px");
            $(Id).css("margin-right", "0px");
            $(Id).css("padding-top", "0px");
            $(Id).css("padding-left", "0px");
            $(Id).css("padding-bottom", "0px");
            $(Id).css("padding-right", "0px");
        }
        Titulo = "Nuevo sub Cuenta";
        SubCuenta = "";
        NumeroSubCuenta++;
    });

    $('#tbAsignacion').on('click', 'span.ui-icon-close', function () {
        var objCloseTab = $(this);
        if ($("#hdfCuenta").val() != "") {
            var index = $("li", tbAsignacion).index(objCloseTab.parent());

            $.ajax({
                type: "POST",
                url: "Mnt_Cuenta.aspx/ObtenerCantidadLineasAsociadasXSubCuenta",
                data: "{'prvcCodCta': '" + $("#hdfCuenta").val().replace(/'/g, "&#39") + "'," +
                      "'prInCodSubCue': '" + (index > (lstIndexCodSubCue.length - 1) ? index : lstIndexCodSubCue[index]) + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var cantLineas = result.d;
                    if (cantLineas > 0) {
                        $('#divMsgConfirmQuitarSubCuenta').dialog({
                            title: "Quitar SubCuenta",
                            modal: true,
                            buttons: {
                                "Aceptar": function () {
                                    $(this).dialog("close");
                                }
                            }
                        });
                    } else {
                        $('#divMsgConfirmacion').dialog({
                            title: "Cerrar",
                            modal: true,
                            buttons: {
                                "Si": function () {
                                    $(this).dialog("close");
                                    var index = $("li", tbAsignacion).index(objCloseTab.parent());
                                    tbAsignacion.tabs("remove", index);
                                },
                                "Cancelar": function () {
                                    $(this).dialog("close");
                                }
                            }
                        });
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        } else {
            $('#divMsgConfirmacion').dialog({
                title: "Cerrar",
                modal: true,
                buttons: {
                    "Si": function () {
                        $(this).dialog("close");
                        var index = $("li", tbAsignacion).index(objCloseTab.parent());
                        tbAsignacion.tabs("remove", index);
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                }
            });
        }
    });

    function CargarSubCuenta() {
        if ($("#hdfCuenta").val() != "") {
            if ($(lstSubCuenta).length > 0) {
                var index = 0;
                $(lstSubCuenta).each(function () {
                    lstIndexCodSubCue[index.toString()] = this.P_inCodSubCue;
                    index = index + 1;
                    SubCuenta = this.P_inCodSubCue;
                    Titulo = this.vcNom;
                    $("#btnAgregarSubCuenta").click();
                });
                $("#tbAsignacion").tabs("option", "selected", 0);
            }
            else {
                SubCuenta = "";
                Titulo = "Nuevo sub Cuenta";
                $("#btnAgregarSubCuenta").click();
            }
        }
        else {
            SubCuenta = "";
            Titulo = "Nuevo sub Cuenta";
            $("#btnAgregarSubCuenta").click();
        }
    }

    $.ajax({
        type: "POST",
        url: "../../../Common/WebService/General.asmx/ListarServicio",
        data: "{'idCliente': " + window.parent.parent.idCliente + "}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            lstServicio = result.d;
            if ($(lstServicio).length == 0) {
                alerta("Ingrese por lo menos un servicio y vuelva a intentarlo");
                window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
            }
            else {
                if (CargoServicio) {
                    CargarSubCuenta();
                }
                else {
                    CargoServicio = true;
                }
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

    $.ajax({
        type: "POST",
        url: "../../../Common/WebService/General.asmx/ListarTipoServicio",
        data: "{'idCliente': " + window.parent.parent.idCliente + "}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            lstTipoServicio = result.d;
            if ($(lstTipoServicio).length == 0) {
                alerta("Ingrese por lo menos un tipo de servicio y vuelva a intentarlo");
                window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
            }
            else {
                if (CargoServicio) {
                    CargarSubCuenta();
                }
                else {
                    CargoServicio = true;
                }
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

    $("#ddlDiaInicial").change(function () {
        if (this.value == 1) {
            //$("#lblDiaFinal").html("30");
        }
        else {
            //$("#lblDiaFinal").html(parseInt(this.value) - 1);
        }
    });

    $("#ddlPeriodoFacturacion").change(function () {
        $("#trPeriodo").hide();
        //$("#lblDiaFinal").html("30");
        $("#ddlDiaInicial").val("1");

        if ($(this).val() == "1") {//Por cuenta
            // $("#trPeriodo").show();
        }
    });

    $("#ddlAsignacionCredito").change(function () {
        if ($("#hdfCuenta").val() != "" && $("#hdfTotalLineas").val() > 0) {//EDITAR CUENTA
            $('#divMsgConfirmacionAsignacionCredito').dialog({
                title: "Cambio de Asignación de Credito",
                modal: true,
                buttons: {
                    "Aceptar": function () {
                        $(this).dialog("close");
                        $("#hdfAsignacionCreditoEdicion").val($("#ddlAsignacionCredito").val());
                        if ($("#ddlAsignacionCredito").val() == "2") {//Distribucion de bolsa
                            $(".dvAsignacion").show();
                        }
                        else {
                            $(".dvAsignacion").hide();
                        }
                    },
                    "Cancelar": function () {
                        if ($("#hdfAsignacionCreditoEdicion").val() != "") {
                            $("#ddlAsignacionCredito").val($("#hdfAsignacionCreditoEdicion").val());
                            $("#ddlAsignacionCredito").data("kendoComboBox").select(parseInt($("#hdfAsignacionCreditoEdicion").val()));
                        } else {
                            $("#ddlAsignacionCredito").val($("#hdfAsignacionCredito").val());
                            $("#ddlAsignacionCredito").data("kendoComboBox").select(parseInt($("#hdfAsignacionCredito").val()));
                        }
                        if ($("#ddlAsignacionCredito").val() == "2") {//Distribucion de bolsa
                            $(".dvAsignacion").show();
                        }
                        else {
                            $(".dvAsignacion").hide();
                        }
                        $(this).dialog("close");
                    }
                }
            });
        }
        else { //NUEVA CUENTA
            if ($(this).val() == "2") {//Distribucion de bolsa
                $(".dvAsignacion").show();
            }
            else {
                $(".dvAsignacion").hide();
            }
        }
    });

    if ($("#hdfCuenta").val() == "-1") {
        alerta("No se encontro el registro");
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    }
    ActivarCombokendo("#ddlOperador", "200");
    ActivarCombokendo("#ddlPeriodoFacturacion", "200");
    ActivarCombokendo("#ddlDiaInicial", "200");
    ActivarCombokendo("#ddlAsignacionCredito", "200");
    ActivarCombokendo("#ddlTipoServicio", "200");
    ActivarCombokendo("#ddlLineaTipo", 120);

    if ($("#hdfTotalLineas").val() > 0) {
        $("#ddlOperador").data("kendoComboBox").enable(false);
        $("#dvInfoOpe").show();
    } else {
        $("#ddlOperador").data("kendoComboBox").enable();
        $("#dvInfoOpe").hide();
    }

    $("input[name='ddlDiaInicial_input']").attr("disabled", "disabled");

    $("input[name='ddlOperador_input']").attr("disabled", "disabled");
    $("input[name='ddlLineaTipo_input']").attr("disabled", "disabled");
    $("input[name='ddlPeriodoFacturacion_input']").attr("disabled", "disabled");
    $("input[name='ddlAsignacionCredito_input']").attr("disabled", "disabled");
    $("input[name='ddlTipoServicio_input']").attr("disabled", "disabled");
    $("#txtCodigo").focus();
    //$(".k-input k-edit").attr("disabled", "disabled");
    //alert($(".k-input DiaInicial").parent().html());

    //$("#ddlDiaInicial_input").keypress(ValidarEntero);

    //$("#ddlOperador").attr('disabled', true);

    if ($("#ddlOperador option").length == 2) {
        $("#ddlOperador").data("kendoComboBox").select(1);
        $("#ddlOperador").data("kendoComboBox").enable(false);
        $("#ddlOperador").change();
    }

    $("#btnAgregarOrga").click(function () {
        var $width = 740;
        var $height = 505;
        var $Pagina = '../../Consultar/Con_SeleccionArea.aspx?Tipo=1&Multiple=0';
        $("#ifArea").attr("src", $Pagina);
        Modal = $('#dvArea').dialog({
            title: "Seleccionar área",
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
    });

    $("#btnQuitarOrganizacion").click(function () {
        $("#cbeOrganizacion_spControl").html("");
        $("#cbeOrganizacion_hdControl").val("");
    });

    $("#hdfIdAreaSel").val($("#cbeOrganizacion_hdControl").val());

});

function LimpiarListaAdjuntos(paginaUploadCuenta) {
    var intervaloCargaUpload2;
    intervaloCargaUpload2 = setInterval(function () { fnCargarUpload2(); }, 1000);
    $("#ifAdjuntoCuenta").hide();
    function fnCargarUpload2() {
        try {
            if ($("#ifAdjuntoCuenta").attr("src") == paginaUploadCuenta) {
                $("#ifAdjuntoCuenta")[0].contentWindow.CargarArchivos("");
                myStopFunction2();
            }
        }
        catch (Error) {
            //some error
        }
    }
    function myStopFunction2() {
        //alert('detenido2');
        $("#ifAdjuntoCuenta").show();
        clearInterval(intervaloCargaUpload2);
        intervaloCargaUpload2 = null;
    }
}

function verificaCambioArea(areaNueva, areaAntigua) {
    let resultado = false;

    if (areaNueva.indexOf(areaAntigua) > -1) {
        return true;
    }
    else {
        //if (areaNueva.substring(0, areaNueva.length - 3).indexOf(areaAntigua) > -1) {
        if (areaNueva.length - 3 > 3 && areaAntigua.length - 3 > 3) {
            if (areaNueva.substring(0, areaNueva.length - 3).indexOf(areaAntigua.substring(0, areaAntigua.length - 3)) > -1) {
                return true;
            }
        }
        else if (areaNueva.length - 3 == 3 && areaAntigua.length - 3 == 3) {
            if (areaNueva.indexOf(areaAntigua) > -1) {
                return true;
            }
        }
        else if (areaNueva.length - 3 > 3 && areaAntigua.length - 3 == 3) {
            if (areaNueva.substring(0, areaNueva.length - 3).indexOf(areaAntigua) > -1) {
                return true;
            }
        }
        else if (areaNueva.length - 3 == 3 && areaAntigua.length - 3 > 3) {
            if (areaNueva.indexOf(areaAntigua.substring(0, areaAntigua.length - 3)) > -1) {
                return true;
            }
        }
        else {
            return false;
        }
        
    }
    return resultado;
}

function IngresarAreaUnico(area) {//Carga el area seleccionada
    debugger;
    let hdfIdArea = $("#hdfIdAreaSel").val();
    $(this).dialog("close");
    if ($("#hdfAreaFacturacion").val() == "2") {
        if (!verificaCambioArea(area.P_inCodOrg, hdfIdArea)) {
            $(this).dialog("close");
            $('#divMsgConfirmarCambioOrganizacion').dialog({
                title: "Actualizar Organización",
                modal: true,
                buttons: {
                    "Aceptar": function () {
                        $("#cbeOrganizacion_spControl").html(area.vcNomOrg.split("=")[1]);
                        $("#cbeOrganizacion_hdControl").val(area.P_inCodOrg);
                        ActualizarOrgaEmpleados = 1;
                        $(this).dialog("close");
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                        return;
                    }
                }
            });
        }
        else {
            $("#cbeOrganizacion_spControl").html(area.vcNomOrg.split("=")[1]);
            $("#cbeOrganizacion_hdControl").val(area.P_inCodOrg);
            ActualizarOrgaEmpleados = 0;
            $(this).dialog("close");
        }
    }
    else {
        ActualizarOrgaEmpleados = 0;
        $("#cbeOrganizacion_spControl").html(area.vcNomOrg.split("=")[1]);
        $("#cbeOrganizacion_hdControl").val(area.P_inCodOrg);
    }
}

