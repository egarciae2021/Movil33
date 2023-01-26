var AnchoVariable = 305;
var RegistroAnterior = null;
var RegistroActual = null;
var inicio = true;
var grillaLinea;

var idPer = "0";

function CerrarModulo(mensaje) {
    var tab1 = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;

    var Accord = window.parent.$("#" + tab1);
    Accord.tabs("remove", Accord.tabs("option", "selected"));
}



// ==========================================================================================
//  FUNCTION load
// ==========================================================================================
$(function () {





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

    idPer = $("#hdfidPeriodo").val();

    Inicio();
    //alert(idPer);

    // MODIFICAR
    if (idPer != "0") {

        $("#btnGuardar").hide();
        $("#tbOperador").hide();
        $("#tbCuenta").hide();

        $("#tbPeriodo").hide();

        $("#lblPeriodo").val($("#hdfvcPeriodo").val());

        $("#btnHistorico").hide();

        CambiaCuenta();
    } else {
        //NUEVO
        $("#lbPeriodo").hide();

        $("#tb_Operador").hide();
        $("#txtCuenta").hide();

        $("#lblModo").hide();
        $("#tbModo").hide();

        $("#btnHistorico").hide();
        $("#btnExportar").hide();
        $("#btnImportar").hide();
    }





    // ==========================================================================================
    //  RESIZE
    // ==========================================================================================
    $(window).resize(function () {
        DimPosElementos();
    });

    // ==========================================================================================
    //  INICIO
    // ==========================================================================================
    function Inicio() {

        $("body").css({ margin: 5, padding: 5 });

        DimPosElementos();

        ActivarCombokendo("#ddlOperador", 220);
        ActivarCombokendo("#ddlModo", 170);
        ActivarCombokendo("#ddlCuenta", 210);

        $(".btnNormal").button({});

        //$("#tblAcciones").buttonset();

        if ($("#ddlOperador").val() != "-1" && idPer == "0") {
            CambiaOperador();
        }

    }
    // ==========================================================================================
    //  DIMPOS ELEMENTOS
    // ==========================================================================================
    function DimPosElementos() {
        Ancho = $(window).width();
        Alto = $(window).height();
        $("#ifColumna").css({ height: Alto - 50, width: Ancho - 35 });
    }
    //padding: 0px; margin: 0px; height: 198px; width: 888px;
    //padding: 0px; margin: 0px; height: 215px; width: 904px;

    // ==========================================================================================
    //  EXPORTAR
    // ==========================================================================================
    $("#btnExportar").click(function () {

        var vcPeriodo = $("#hdfvcPeriodo").val();
        var vcCodCuenta = $("#hdfidCuenta").val();

        if (vcCodCuenta != "-1") {

            var idModo = '1'; //$("#hdfTipoDistribucion").val();
            var ValorIli = 'Si:No'; //$("#hdfValorIlimitado").val();


            $("#dvCargando").show();
            //alert(vcPeriodo);
            $('#ifExportacionImportacion')[0].src = "Adm_DistribucionMinutosImportarExportar.aspx?Tipo=" + idModo + "&SubTipo=1&Cuenta=" + vcCodCuenta + "&vcValIli=" + ValorIli + "&vcPeriodo=" + vcPeriodo;

            $("#ifExportacionImportacion").show();
            $("#dvExportacionImportacion").show();
        }
        else {
            alerta("Seleccione una cuenta");
        }
    });

    // ==========================================================================================
    //  ASIGNAR
    // ==========================================================================================
    $("#btnAsignar").click(function () {
        CambiaCuenta();
    });


    // ==========================================================================================
    //  IMPORTAR
    // ==========================================================================================
    $("#btnImportar").click(function () {

        var vcPeriodo = $("#hdfvcPeriodo").val();
        var vcValIli = 'Si:No'; //$("#hdfValorIlimitado").val();

        $("#ifExportacionImportacion").attr("src", "Adm_DistribucionMinutosImportarExportar.aspx?Tipo=1&SubTipo=2" + "&vcValIli=" + vcValIli + "&vcPeriodo=" + vcPeriodo);
        $("#ifExportacionImportacion").height("80");
        $("#ifExportacionImportacion").width("450");
        $("#dvExportacionImportacion").dialog({
            title: "Importación de distribucion de servicios",
            width: 450,
            height: 110,
            modal: true,
            close: function (ev, ui) { CambiaCuenta(); }
        });

    });

    // ==========================================================================================
    //  MODO
    // ==========================================================================================
    $("#ddlModo").change(function () {
        CambiaCuenta();
    });
    // ==========================================================================================
    //  OPERADOR
    // ==========================================================================================
    $("#ddlOperador").change(function () {
        CambiaOperador();
    });

    // ==========================================================================================
    //  GUARDAR
    // ==========================================================================================
    $("#btnGuardar").click(function () {
        GuardarPeriodo();
    });

    // ==========================================================================================
    //  DETALLE CUENTA BOLSA
    // ==========================================================================================
    $("#imgDetalleCuenta").click(function () {
        $("#ifDetalleCuenta").attr("src", "Adm_CuentaServicios.aspx?CodCue=" + $("#ddlCuenta").val());
        $("#ifDetalleCuenta").height("235"); //235
        $("#ifDetalleCuenta").width("575"); //575
        $("#dvDetalleCuenta").dialog({
            title: "Detalle de cuenta",
            width: 585,
            height: 273,
            modal: true
        });
    });

    // ==========================================================================================
    //  PROCESAR
    // ==========================================================================================
    $("#btnProcesar").click(function () {

        confirmacion("Desea Iniciar Distribución Cuenta Bolsa ", Eliminar_, otro, "Confirmación");

    });
    // ==========================================================================================
    //  ENVIA CORREO
    // ==========================================================================================
    //$("#btnEnviarReporte").click(function () {
    //         $("#btnExportar").click(function () {
    //             
    //             var vcCodCuenta = (idPer == "0" ? $("#ddlCuenta").val() : $("#hdfidCuenta").val());
    //              //$("#ddlCuenta").val();

    //             if (vcCodCuenta != "-1") {
    //                 $("#ifExportacionImportacion").attr("src", "Adm_DistribucionMinutosReporteOperador.aspx?Cuenta=" + vcCodCuenta);
    //                 $("#ifExportacionImportacion").height("390");
    //                 $("#ifExportacionImportacion").width("520");
    //                 $("#dvExportacionImportacion").dialog({
    //                     title: "Envio de reporte de distribucion de servicios",
    //                     width: 530,
    //                     height: 425,
    //                     modal: true
    //                 });
    //             }
    //             else {
    //                 alerta("Seleccione una cuenta");
    //             }
    //         });

    // ====================================================================================
    //  CAMBIA CUENTA
    // ====================================================================================
    function CambiaCuenta() {

        //        if ($("#ddlCuenta").val() != "-1") {
        //            $("#imgDetalleCuenta").show();
        //            $("#ifColumna").show();
        //        }
        //        else {
        //            $("#imgDetalleCuenta").hide();
        //            $("#ifColumna").hide();
        //        }
        //alert('CambiaCuenta');

        $("#ifColumna").show();

        var vcModo = $("#ddlModo").val();
        var idCue = (idPer == "0" ? $("#ddlCuenta").val() : $("#hdfidCuenta").val());

        if (vcModo == 'Linea') {
            $('#ifColumna')[0].src = "Adm_DistribucionMinutosLinea.aspx";
        }
        if (vcModo == 'CentroCosto') {
            $('#ifColumna')[0].src = "Adm_DistribucionMinutosCentroCosto.aspx?Clase=P";
        }
        if (vcModo == 'Area') {
            $('#ifColumna')[0].src = "Adm_DistribucionMinutosOrganizacion.aspx?Clase=C";
        }
        if (vcModo == 'Nivel') {
            $('#ifColumna')[0].src = "Adm_DistribucionMinutosNivel.aspx?Clase=C";
        }
        if (vcModo == 'GrupoEmpleado') {
            $('#ifColumna')[0].src = "Adm_DistribucionMinutosGrupoOrigen.aspx?Clase=C";
        }


    }

    // ====================================================================================
    //  CAMBIA OPERADOR
    // ====================================================================================
    function CambiaOperador() {
        if ($("#ddlOperador").val() != "-1") {
            $.ajax({
                type: "POST",
                url: "Adm_DistribucionMinutos.aspx/ListarCuentaPorOperador",
                data: "{'inCodOpe': '" + $("#ddlOperador").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if ($(result.d).length > 0) {
                        $("#ddlCuenta").html("");
                        if ($(result.d).length > 1) {
                            $("#ddlCuenta").append($("<option></option>").attr("value", "-1").text("<Seleccionar>"));
                        }
                        for (i in result.d) {
                            $("#ddlCuenta").append($("<option></option>").attr("value", result.d[i].P_vcCod).text(result.d[i].vcNom));
                        }

                        if ($(result.d).length == 1) {
                            $("#ddlCuenta").val(result.d[0].P_vcCod);
                            CambiaCuenta();
                        }
                        else {
                            $("#ifColumna").hide();
                        }
                        $("#dvCuenta").show();
                    }
                    else {
                        $("#dvCuenta").hide();
                        $("#ddlCuenta").html("");
                        $("#ifColumna").hide();
                        alerta("No hay cuentas con distribucion de bolsa para el operador seleccionado.");
                    }
                    ActivarCombokendo("#ddlCuenta", 120);
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
        else {
            $("#dvCuenta").hide();
            $("#ddlCuenta").html("");
            $("#ifColumna").hide();
        }
    }


    function GuardarPeriodo() {

        var vcPer = $("#txtPeriodo").val();
        var vcDes = $("#txtDescrip").val();
        var idCue = $("#ddlCuenta").val();

        if (vcPer.length == 0) {
            alerta('Periodo incorrecto');
            return;
        }

        if (vcDes.length == 0) {
            alerta('Descripción incorrecta');
            $("#txtDescrip").focus();
            return;
        }
        //alert(idCue);
        if (idCue == null) {
            alerta('Cuenta incorrecta');
            return;
        }

        if (idCue == '-1') {
            alerta('Cuenta incorrecta');
            return;
        }

        $.ajax({
            type: "POST",
            url: "Adm_DistribucionMinutos.aspx/GuardarPeriodo",
            data: "{'vcPer': '" + vcPer + "','vcDes': '" + vcDes + "','idCue': '" + idCue + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                idPer = result.d;

                $("#btnGuardar").hide();
                $("#tbOperador").hide();
                $("#tbCuenta").hide();

                $("#tbPeriodo").hide();

                $("#hdfvcPeriodo").val($("#txtPeriodo").val());

                $("#lblPeriodo").val($("#txtPeriodo").val());

                $("#txtOperador").val($("#ddlOperador option:selected").text());
                $("#txtCuenta").val($("#ddlCuenta option:selected").text());

                $("#lbPeriodo").show();

                $("#tb_Operador").show();
                $("#txtCuenta").show();


                $("#lblModo").show();
                $("#tbModo").show();

                //$("#btnHistorico").show();
                $("#btnExportar").show();
                $("#btnImportar").show();

                CambiaCuenta();

            },
            error: function (xhr, err, thrErr) {
                //MostrarErrorAjax(xhr, err, thrErr);
                alert(thrErr);
            }
        });

    }

});