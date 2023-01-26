var indiceTab;
var oCulturaUsuario;
var FormatoFechaCulturaForDatePicker = "";

function GrupoConcepto(vcNomGruSer, btMostrarEnDashboard, dtFecIni, vcFecIniAnsi, vcNomAbrv, P_in_CodGruSer, BtEst, BtVig, InWidth1, InWidth2, VcAlign1, VcAlign2, InOrden, btSumatoriaGrupo) {
    this.vcNomGruSer = vcNomGruSer;
    this.btMostrarEnDashboard = btMostrarEnDashboard;
    this.btSumatoriaGrupo = btSumatoriaGrupo;
    this.dtFecIni = dtFecIni;
    this.vcFecIniAnsi = vcFecIniAnsi;
    this.vcNomAbrv = vcNomAbrv;
    this.P_in_CodGruSer = P_in_CodGruSer;
    this.BtEst = BtEst;
    this.BtVig = BtVig;
    this.InWidth1 = InWidth1;
    this.InWidth2 = InWidth2;
    this.VcAlign1 = VcAlign1;
    this.VcAlign2 = VcAlign2;
    this.InOrden = InOrden;
}

$(function () {
    indiceTab = window.parent.tab.tabs("option", "selected");

    oCulturaUsuario = window.parent.parent.oCulturaUsuario;
    FormatoFechaCulturaForDatePicker = oCulturaUsuario.vcFecCor.toLowerCase();

    if (FormatoFechaCulturaForDatePicker.indexOf("yyyy") >= 0) {
        FormatoFechaCulturaForDatePicker = FormatoFechaCulturaForDatePicker.replace("yyyy", "yy");  //Para datepicker 'yy' es como 'yyyy'; y 'y' es 'yy'
    }
    else if (FormatoFechaCulturaForDatePicker.indexOf("yy") >= 0) {
        FormatoFechaCulturaForDatePicker = FormatoFechaCulturaForDatePicker.replace("yy", "y");
    }

    $("#txtAbrNom").keypress(ValidarCadena);

    $(".txtFecha").datepicker({
        changeMonth: true,
        changeYear: true,
        onSelect: function (dateText, inst) {
            //$("#txtVigencia").val(fnCalcularVigencia());
        }
    });
    $(".txtFecha").datepicker('option', 'dateFormat', FormatoFechaCulturaForDatePicker);

    $("#btnCerrar").click(function (event) {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });
    
    ValidarNumeroEnCajaTexto("txtPos", ValidarSoloNumero);


    //    $("#txtPos").keypress(function (e) {
    //        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
    //            return false;
    //        }
    //    });
    // ======================================================================================
    // GUARDAR
    // ======================================================================================
    $("#btnGuardar").click(function (event) {

        var oGrupoConcepto = new GrupoConcepto();
        oGrupoConcepto.vcNomGruSer = $("#txtNombre").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        oGrupoConcepto.vcNomAbrv = $("#txtAbrNom").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        oGrupoConcepto.BtVig = true;
        oGrupoConcepto.InWidth1 = '80'; //134
        oGrupoConcepto.InWidth2 = '80';
        oGrupoConcepto.VcAlign1 = 'center';
        oGrupoConcepto.VcAlign2 = 'right';

        oGrupoConcepto.InOrden = $("#txtPos").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");

        if ($('#chkEstado').is(':checked')) {
            oGrupoConcepto.BtEst = true;
        } else {
            oGrupoConcepto.BtEst = false;
        }
        if ($('#chkMostrarDashboard').is(':checked')) {
            oGrupoConcepto.btMostrarEnDashboard = true;
        } else {
            oGrupoConcepto.btMostrarEnDashboard = false;
        }

        if ($('#chkSumatoriaGrupo').is(':checked')) {
            oGrupoConcepto.btSumatoriaGrupo = true;
        } else {
            oGrupoConcepto.btSumatoriaGrupo = false;
        }

        if ($("#txtNombre").val() === "") {
            alerta("El Nombre es un campo obligatorio.");
            $("#txtNombre").focus();
            return;
        }
        if ($("#txtAbrNom").val() === "") {
            alerta("La Abreviatura es un campo obligatorio.");
            $("#txtAbrNom").focus();
            return;
        }
        if ($("#txtAbrNom").val().length > 10) {
            alerta("Demasiado texto para el campo abreviatura.");
            $("#txtAbrNom").val("");
            $("#txtAbrNom").focus();
            return;
        }
        if ($("#txtFechaInicio").val() === "") {
            alerta("La Fecha es un campo obligatorio.");
            $("#txtFechaInicio").focus();
            return;
        }
        if ($("#txtPos").val() === "") {
            alerta("La posición es un campo obligatorio.");
            $("#txtPos").focus();
            return;
        }

        if (parseInt($("#txtPos").val()) <= 0) {
            alerta("La posición ingresada no debe ser menor a 1.");
            $("#txtPos").focus();
            return;
        }

        var cod = $("#hdfCodGrupCon").val();
        oGrupoConcepto.vcFecIniAnsi = $("#txtFechaInicio").val();
        var dtFechaInicio;
        try {
            dtFechaInicio = Date.parseExact(oGrupoConcepto.vcFecIniAnsi, oCulturaUsuario.vcFecCor);
            if ($("#txtFechaInicio").val() === "") {
                alerta("La Fecha es un campo obligatorio.");
                $("#txtFechaInicio").focus();
                return;
            }
        }
        catch (e) {
            alerta("Ingrese una fecha de inicio correcta");
            $("#txtFechaInicio").focus();
            return;
        }
        oGrupoConcepto.vcFecIniAnsi = Date2Ansi(dtFechaInicio);

        var sendData = JSON.stringify(oGrupoConcepto);

        $.ajax({
            type: "POST",
            url: "Mnt_GrupoServicio.aspx/Guardar",
            data: "{'cod': '" + cod + "','oGrupoConcepto': '" + sendData + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                //                $("#dvCargando").hide();
                if (result.d == "1") {
                    window.parent.ActualizarGrilla();
                    Mensaje("<h1>Grupo de Concepto guardado</h1><br/>", document, CerroMensaje);
                } else if (result.d == "0") {
                    alerta("EL nombre de grupo ingresado ya ha sido registrado. Ingrese otro.");
                    $("#txtNombre").focus();
                } else if (result.d == "2") {
                    alerta("La posición ingresada ya existe para otro grupo. Ingrese otra valor.");
                    $("#txtPos").focus();
                } else {
                    alerta("EL grupo de concepto ya ha sido registrado. Intente nuevamente");
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                //                BloquearPagina(false);
            }
        });

    });

    
    $("#chkSumatoriaGrupo").click(function () {
        fnVerificaCheckSumGrupo();
    });

    fnVerificaCheckSumGrupo();
});

function fnVerificaCheckSumGrupo() {
    if ($("#chkSumatoriaGrupo").is(':checked')) {
        $("#chkMostrarDashboard").attr("disabled", false);
    } else {
        $("#chkMostrarDashboard").attr("disabled", true);
        $("#chkMostrarDashboard").attr("checked", false);
    }
}


function validarEspaciosEnBlancoAlInicio(id) {
    var valor = $("#" + id.toString() + "").val();
    $("#" + id.toString() + "").val($.trim(valor));
}


function CerroMensaje() {
    BloquearPagina(false);
    if ($("#hdfCodGrupCon").val() === "") {//Nuevo
        $("#txtNombre").val("");
        $("#txtAbrNom").val("");
        $("#txtFechaInicio").val("");
        $("#txtPos").val("");
        $("#chkMostrarDashboard").prop('checked', false);
    }
    else {//Edicion
        window.parent.tab.tabs("remove", indiceTab);
    }
}

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

function convertDateToJson(m) {
    var fecha = new Date(m);
    var mileseg = fecha.getTime();
    return "/Date(" + mileseg + ")/";
}

function convertJsonToDate(mm) {
    var date = new Date(parseFloat(mm.substr(6)));
    var d = date.getDate(), m = date.getMonth() + 1, y;
    if (date.getFullYear) { y = date.getFullYear(); }
    else { y = 2000 + (date.getYear() % 100); }
    return (10 > d ? '0' : '') + d + (10 > m ? '/0' : '/') + m + '/' + y;
}

function convertDateTommddyyyy(mmm) {
    var dia = mmm.substring(2, 0);
    var mes = mmm.substring(5, 3);
    var anio = mmm.substring(10, 6);
    var mmm2 = mes + "/" + dia + "/" + anio;
    return mmm2;
}

function convertDateToddmmyyyy(mmm) {
    var dia = mmm.substring(2, 0);
    var mes = mmm.substring(5, 3);
    var anio = mmm.substring(10, 6);
    var mmm2 = dia + "/" + mes + "/" + anio;
    return mmm2;
}
