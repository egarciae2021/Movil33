var lista = [];
var indiceTab;

//function Cuenta(id, idCuenta) {
//    this.id = id;
//    this.idCuenta = idCuenta;
//}

var oCulturaUsuario;
var FormatoFechaCulturaForDatePicker = "";


$(function () {
    indiceTab = window.parent.tabDetalle.tabs("option", "selected");

    lista = window.parent.lista;
    $("#txtCodigo").prop('disabled', true);
    $("#tbCuenta").jqGrid({
        sortable: true,
        datatype: 'local',
        colModel: [{ name: 'id', index: 'id', label: 'id', hidden: true },
                    { name: 'P_vcCod', index: 'P_vcCod', label: 'Código Cuenta', width: '80', hidden: false}],
        //        pager : '#Paginador',
        sortname: "P_vcCod",
        sortorder: "asc",
        width: "150",
        height: "180",
        multiselect: false,
        rownumbers: true,
        hidegrid: false,
        ondblClickRow: function (rowid, aData, rowelem) {

        },
        onSelectRow: function (id, select, item) {
            var data = $("#tbCuenta").getRowData(id);

            $("#txtCodigo").val(data.P_vcCod);
            $("#txtCodigo").prop('disabled', true);
        },
        caption: "Seleccione una cuenta"
    });


    CargarData();

    function CargarData() {

        $.ajax({
            type: "POST",
            url: "Imp_CrearCuenta.aspx/ListarCuentasTemp",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                $("#tbCuenta").jqGrid('clearGridData');
                if ($(result.d).length > 0) {
                    var i = 0;
                    for (i = 0; i < $(result.d).length; i++) {
                        $("#tbCuenta").jqGrid('addRowData', result.d[i].Id, result.d[i]);
                    }

                } else {
                    window.parent.success = 0;
                    //                    alerta("Presione 'Procesar' para continuar con el proceso.");
                    window.parent.MostrarGrabar();
                    //                    window.parent.tabOpciones.tabs("remove", 1);


                }

            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });
    }

    function CargarData2() {

        $.ajax({
            type: "POST",
            url: "Imp_CrearCuenta.aspx/ListarCuentasTemp",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                $("#tbCuenta").jqGrid('clearGridData');
                if ($(result.d).length > 0) {
                    var i = 0;
                    for (i = 0; i < $(result.d).length; i++) {
                        $("#tbCuenta").jqGrid('addRowData', result.d[i].Id, result.d[i]);
                    }

                } else {
                    window.parent.success = 0;
                    //                    alerta("Presione 'Guardar' para continuar con el proceso.");
                    window.parent.MostrarGrabar();
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });
    }

    oCulturaUsuario = window.parent.parent.parent.oCulturaUsuario;
    FormatoFechaCulturaForDatePicker = oCulturaUsuario.vcFecCor.toLowerCase();

    if (FormatoFechaCulturaForDatePicker.indexOf("yyyy") >= 0) {
        FormatoFechaCulturaForDatePicker = FormatoFechaCulturaForDatePicker.replace("yyyy", "yy");  //Para datepicker 'yy' es como 'yyyy'; y 'y' es 'yy'
    }
    else if (FormatoFechaCulturaForDatePicker.indexOf("yy") >= 0) {
        FormatoFechaCulturaForDatePicker = FormatoFechaCulturaForDatePicker.replace("yy", "y");
    }

    $(".txtFecha").datepicker({
        changeMonth: true,
        changeYear: true,
        onSelect: function (dateText, inst) {
            //$("#txtVigencia").val(fnCalcularVigencia());
        }
    });

    $(".txtFecha").datepicker('option', 'dateFormat', FormatoFechaCulturaForDatePicker);

    $("#lblMonto").text(FormatoNumero($("#lblMonto").text(), oCulturaUsuario));

    IniciarPagina();

    function IniciarPagina() {
        //                    $("#txtCodigo").focus();
        $(".tdEtiqueta").css("width", "140px");

        if ($("#ddlAsignacionCredito").val() != "2") {
            $(".dvAsignacion").hide();
        }

        if ($("#ddlPeriodoFacturacion").val() != "1") { //Por cuenta
            $("#trPeriodo").hide();
        }
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

    $("#txtCodigo").focusout(function () {
        $("#txtCodigo").val($("#txtCodigo").val().replace(/\\/g, "").replace(/'/g, ""));
    });


    $("#btnGuardar").click(function (event) {

        var oCuenta = new Cuenta();
        var CamposDinamicos = "";

        oCuenta.P_vcCod = $("#txtCodigo").val().replace(/'/g, "").replace(/"/g, "&#34").replace(/\\/g, "");
        oCuenta.vcNom = $("#txtNombre").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        oCuenta.P_vcCod = oCuenta.P_vcCod.replace(/'/g, "&#39");
        oCuenta.vcNom = oCuenta.vcNom.replace(/'/g, "&#39");

        oCuenta.Operador.P_inCodOpe = $("#ddlOperador").val();
        oCuenta.TipoAsignacionCredito.P_inCod = $("#ddlAsignacionCredito").val();
        //oCuenta.TipoPeriodoFacturacion.P_inCod = $("#ddlPeriodoFacturacion").val();
        oCuenta.TipoPeriodoFacturacion.P_inCod = $("#HdfPeriodoFacturacion").val();
        oCuenta.F_inCodTip = $("#ddlLineaTipo").val();

        oCuenta.FechaInicioContrato = $.trim($("#txtFechaInicioContrato").val());
        oCuenta.FechaFinContrato = $.trim($("#txtFechaFinContrato").val());
        oCuenta.Acuerdos = "";
        oCuenta.Adjuntos = "";

        if (oCuenta.TipoAsignacionCredito.P_inCod == "2") {
            //Cuenta.dcMon = $("#lblMonto").html();
            oCuenta.dcMon = "0";

            var SubCuenta;
            SubCuenta = new subcuenta();

            SubCuenta.vcNom = "Minutos Voz";
            SubCuenta.vcDes = "Minutos Voz";
            SubCuenta.dcMon = "0";
            //            SubCuenta.dcMon = SubCuenta.dcMon.replace(window.parent.$("#hdfSepMiles").val(), "");

            SubCuenta.TipoServicio.P_inCod = "16";

            SubCuenta.dcCan = "0";

            Servicio = new servicio();

            Servicio.P_inCod = "16";
            Servicio.dcCan = "0";
            Servicio.inCodTipDat = "2";

            SubCuenta.Servicios.push(Servicio);

            oCuenta.SubCuentas.push(SubCuenta);

        }
        else {
            oCuenta.dcMon = "0";
        }


        //if ($("#ddlPeriodoFacturacion").val() == "1") { //Por cuenta
        if ($("#HdfPeriodoFacturacion").val() == "1") { //Por cuenta
            //oCuenta.dcPerFacIni = $("#ddlDiaInicial").val();
            oCuenta.dcPerFacIni = $("#HdfDiaInicial").val();
            //Cuenta.dcPerFacFin = $("#lblDiaFinal").html();
        }
        else {
            oCuenta.dcPerFacIni = "0";
            oCuenta.dcPerFacFin = "0";
        }

        oCuenta.btVig = false;

        if ($.trim(oCuenta.P_vcCod) == "") {
            alerta("El codigo de la cuenta es un campo obligatorio");
            $("#txtCodigo").val("");
            $("#txtCodigo").focus();
            return;
        }
        if ($.trim(oCuenta.vcNom) == "") {
            alerta("El nombre de la cuenta es un campo obligatorio");
            $("#txtNombre").val("");
            $("#txtNombre").focus();
            return;
        }
        if (oCuenta.Operador.P_inCodOpe == "-1") {
            alerta("Seleccione un operador, es un campo obligatorio");
            $("#ddlOperador").focus();
            return;
        }
        /*
        if (oCuenta.TipoPeriodoFacturacion.P_inCod == "-1") {
        alerta("Seleccione un tipo de facturación, es un campo obligatorio");
        $("#ddlPeriodoFacturacion").focus();
        return;
        }
        */
        if (oCuenta.TipoAsignacionCredito.P_inCod == "-1") {
            alerta("Seleccione un tipo de asignacion de credito, es un campo obligatorio");
            $("#ddlAsignacionCredito").focus();
            return;
        }
        if (oCuenta.F_inCodTip == "-1") {
            alerta("Seleccione un tipo de grupo, es un campo obligatorio");
            $("#ddlLineaTipo").focus();
            return;
        }
        if (oCuenta.FechaInicioContrato == "") {
            alerta("Ingrese la fecha de inicio del contrato");
            $("#txtFechaInicioContrato").focus();
            return;
        }
        if (oCuenta.FechaFinContrato == "") {
            alerta("Ingrese la fecha fin del contrato");
            $("#txtFechaFinContrato").focus();
            return;
        }

        var dtFechaInicio, dtFechaFin;
        try {
            dtFechaInicio = Date.parseExact(oCuenta.FechaInicioContrato, oCulturaUsuario.vcFecCor);
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
            dtFechaFin = Date.parseExact(oCuenta.FechaFinContrato, oCulturaUsuario.vcFecCor);
            if (dtFechaFin == null) {
                alerta("Ingrese una fecha fin correcta");
                $("#txtFechaFinContrato").focus();
                return;
            }
        }
        catch (ex) {
            alerta("Ingrese una fecha fin correcta");
            $("#txtFechaFinContrato").focus();
            return;
        }

        if ((dtFechaInicio - dtFechaFin) >= 0) {
            alerta("La fecha inicial debe ser menor a la fecha final");
            return;
        }
        //return;

        oCuenta.FechaInicioContrato = Date2Ansi(dtFechaInicio);
        oCuenta.FechaFinContrato = Date2Ansi(dtFechaFin);


        if (oCulturaUsuario.vcSimSepMil == ",") {
            Cuenta.dcMon = oCuenta.dcMon.toString().replace(/,/g, "");
        }

        var objCuenta = JSON.stringify(oCuenta);
        var vcCodCue = $("#hdfCuenta").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");

        $(".VARCHAR").each(function (i) {
            CamposDinamicos += "[" + $(this).attr("obj") + "]";
            CamposDinamicos += " = \"";
            CamposDinamicos += this.value.replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
            CamposDinamicos += "\",";

        });
        $(".INT").each(function (i) {
            CamposDinamicos += "[" + $(this).attr("obj") + "]";
            CamposDinamicos += " = ";
            CamposDinamicos += this.value;
            CamposDinamicos += ",";
        });
        $(".DECIMAL").each(function (i) {
            CamposDinamicos += "[" + $(this).attr("obj") + "]";
            CamposDinamicos += " = ";
            CamposDinamicos += this.value;
            CamposDinamicos += ",";
        });
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


        BloquearPagina(true);
        $.ajax({
            type: "POST",
            url: "Imp_CrearCuenta.aspx/Guardar",
            data: "{'objCuenta': '" + objCuenta + "'," +
                    "'vcCamDim': '" + CamposDinamicos + "'," +
                    "'vcCodCue': '" + vcCodCue.replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'," +
                    "'icCuentaTemp': '" + oCuenta.P_vcCod + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == "0") {

                    Mensaje("<br/><h1>Cuenta guardada</h1><br/><h2>" + oCuenta.vcNom + "</h2>", document, CerroMensaje);
                    CargarData2();
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

    $("#ddlDiaInicial").change(function () {
        //if (this.value == 1) {
        //$("#lblDiaFinal").html("30");
        //}
        //else {
        //$("#lblDiaFinal").html(parseInt(this.value) - 1);
        //}
    });

    $("#ddlPeriodoFacturacion").change(function () {
        $("#trPeriodo").hide();
        $("#ddlDiaInicial").val("1");

        if ($(this).val() == "1") {//Por cuenta
            $("#trPeriodo").show();
        }
    });

    //    ActivarCombokendo("#ddlOperador", "200");
    //    ActivarCombokendo("#ddlPeriodoFacturacion", "200");
    //    ActivarCombokendo("#ddlDiaInicial", "200");
    //    ActivarCombokendo("#ddlAsignacionCredito", "200");
    //    ActivarCombokendo("#ddlLineaTipo", 120);


    function CerroMensaje() {
        BloquearPagina(false);
        if ($("#hdfCuenta").val() == "") {//Nuevo
            $("#txtCodigo").val("");
            $("#txtNombre").val("");

            $("#txtFechaInicioContrato").val("");
            $("#txtFechaFinContrato").val("");

            $("#ddlOperador").val(-1);
            $("#ddlAsignacionCredito").val(-1);
            $("#ddlPeriodoFacturacion").val(-1);
            $("#ddlLineaTipo").val(-1);

            //            $("#ddlOperador").data("kendoComboBox").select(0);
            //            $("#ddlAsignacionCredito").data("kendoComboBox").select(0);
            //            $("#ddlPeriodoFacturacion").data("kendoComboBox").select(0);
            //            $("#ddlLineaTipo").data("kendoComboBox").select(0);

            $("#lblMonto").html("");
            $("#ddlDiaInicial").val(1);
            //            $("#ddlDiaInicial").data("kendoComboBox").select(0);
            $(".dvAsignacion").hide();
            $("#trPeriodo").hide();
            $("#btnAgregarSubCuenta").click();
            $("#txtCodigo").prop('disabled', true);
        }
        //else {//Edicion
        //            window.parent.tab.tabs("remove", indiceTab);
        //}

        if ($("#ddlOperador option").length == 2) 
        {
            $("#ddlOperador").prop("selectedIndex", 1);
            $("#ddlOperador").attr('disabled', true);
            $("#ddlOperador").change();
        }
    }

    $("#trPeriodoFacturacion").hide();
    $("#trPeriodo").hide();
    $("#ddlDiaInicial").val("1");
    $("#HdfDiaInicial").val("1");
});

function Cuenta(id, P_vcCod, vcNom, dcPerFacIni, dcPerFacFin, dcMon, btVig, F_inCodTip, FechaInicioContrato, FechaFinContrato, Acuerdos, Adjuntos) {
    this.id = id;
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

function subcuenta(P_inCodSubCue, vcNom, vcDes, dcMon, dcCan) {
    this.P_inCodSubCue = P_inCodSubCue;
    this.vcNom = vcNom;
    this.vcDes = vcDes;
    this.dcMon = dcMon;
    this.dcCan = dcCan;
    this.Servicios = [];
    this.TipoServicio = new tiposervicio();
}
function servicio(P_inCod, vcNom, dcCan, inCodTipDat) {
    this.P_inCod = P_inCod;
    this.vcNom = vcNom;
    this.dcCan = dcCan;
    this.inCodTipDat = inCodTipDat;
}
function tiposervicio(P_inCod, vcNom) {
    this.P_inCod = P_inCod;
    this.vcNom = vcNom;
}
