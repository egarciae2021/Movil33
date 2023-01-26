/// <reference path="../Common/Scripts/jquery-2.0.0-vsdoc.js" />
var check;
var ale = true;
var mensajeAle = true;
var altoPagina = 0;
var oCultura = null;

$(document).on("ready", function () {
    oCultura = window.parent.oCulturaUsuario;

    $("#spEnMoneda").text("En " + oCultura.Moneda.vcNomLar + " (" + oCultura.Moneda.vcSimMon + ")");
    //altoPagina = $(window).height();
    //var AltoGrilla = 0;
    //AltoGrilla = altoPagina - 320;
    //if (AltoGrilla <= 0) {
    //    AltoGrilla = 250;
    //}

    $(".bordeui").removeClass("ui-corner-all");
    $(".bordeui").css({
        "border": "none",
        "padding": "2px 0px 2px 0px"
    });

    //****Valores iniciales para rango de fecha
    var date = new Date();
    var fechainicio = new Date(date.getFullYear(), date.getMonth(), 0);
    var fechaMax = new Date(date.getFullYear(), date.getMonth(), 0);

    var cPeriodo = $("#txtPeriodo").kendoDatePicker({
        culture: "es-PE",
        start: "year",
        depth: "year",
        value: fechainicio,
        format: "MM/yyyy",
        footer: false
        , max: fechaMax
    }).data("kendoDatePicker");

    $("#grdEstadoCuenta").kendoGrid({
        dataSource: {},
        groupable: false,
        sortable: true,
        navigatable: true,
        columns: [
            { field: "Fecha", title: "Fecha Creación", width: "100px", headerAttributes: { "class": "table-header-cell", style: "text-align: center; width: 100px;"} },
            { field: "ConceptoPago", title: "Concepto/Descripción", width: "450px", headerAttributes: { "class": "table-header-cell", style: "text-align: center; width: 450px;"} },
            { field: "NumCuotas", title: "Cuota", width: "50px", headerAttributes: { "class": "table-header-cell", style: "text-align: center; width: 50px;"} },
            { field: "Monto", title: "Monto (" + oCultura.Moneda.vcSimMon + ")", width: "150px", attributes: { style: "text-align: right;" }, headerAttributes: { "class": "table-header-cell", style: "text-align: center; width: 150px;"} }
        ],
        pageable: {
            refresh: false,
            pageSizes: true,
            messages: {
                itemsPerPage: "ítems por página",
                display: "{0}-{1} de {2} ítems",
                empty: "",
                first: "Ir a primera página",
                last: "Ir a última página",
                next: "Ir a página siguiente",
                previous: "Ir a página anterior"
            }
        },
        height: "200px"
    });

    var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    var FechaActual = new Date();

    $("#grCronogramaPagos").kendoGrid({
        dataSource: {
            data: {}
        },
        width: 800,
        scrollable: false,
        navigatable: false,
        resizable: false,
        pageable: false,
        height: "40px",
        columns: [

        {
            field: "montoPago1",
            headerAttributes: {
                style: "text-align: center; width:30px;",
                width: "30px"
            },
            attributes: {
                "class": "table-cell",
                style: "text-align: right;"
            },
            //format: "{0:c}",
            width: "30px",
            title: "(Desconocido)"//periodo1//"Nov 2013"
        },
        {
            field: "montoPago2",
            headerAttributes: {
                style: "text-align: center; width:30px;",
                width: "30px"
            },
            attributes: {
                "class": "table-cell",
                style: "text-align: right;"
            },
            //format: "{0:c}",
            width: "30px",
            title: "(Desconocido)"//periodo2
        },
         {
             field: "montoPago3",
             headerAttributes: {
                 style: "text-align: center; width:30px;",
                 width: "30px"
             },
             attributes: {
                 "class": "table-cell",
                 style: "text-align: right;"
             },
             //format: "{0:c}",
             width: "30px",
             title: "(Desconocido)"//periodo3
         },
        {
            field: "montoPago4",
            headerAttributes: {
                style: "text-align: center; width:30px;",
                width: "30px"
            },
            attributes: {
                "class": "table-cell",
                style: "text-align: right;"
            },
            //format: "{0:c}",
            width: "30px",
            title: "(Desconocido)"//periodo4
        },
        {
            field: "montoPago5",
            headerAttributes: {
                style: "text-align: center; width:30px;",
                width: "30px"
            },
            attributes: {
                "class": "table-cell",
                style: "text-align: right;"
            },
            //format: "{0:c}",
            width: "30px",
            title: "(Desconocido)"//periodo5
        },
        {
            field: "montoPago6",
            headerAttributes: {
                style: "text-align: center; width:30px;",
                width: "30px"
            },
            attributes: {
                "class": "table-cell",
                style: "text-align: right;"
            },
            //format: "{0:c}",
            width: "30px",
            title: "(Desconocido)"//periodo6
        }]

    });

    //cronograma_6M("0000");

    Inicio();
    function Inicio() {
        //$("#tbExportar").hide();
        //$("#btnPdf").hide();
        //var admin = $("#hdfAdmin").val();
        //$("#TextBox1").hide();
        //if (admin == 0 && $("#hdfOrganizacion").val() == "") {
        //    $("#tbInfoUsuario").hide();
        //    $("#toolbar").hide();
        //
        var _valor = $("#hdfEmpleado").val();
        cargar_DatosEmpleado(_valor);
        //}
        //else {
        //    $("#dvMonto").addClass("Adm");
        //}

        //try {
        //    $.browser.chrome = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase());
        //
        //    if ($.browser.chrome) {
        //        $(".Alto").css({ 'height': "35px", 'width': "89px" });
        //    }
        //    else {
        //        $(".Alto").css({ 'height': "30px", 'width': "90px" });
        //    }
        //} catch (Error) {
        //
        //}
    }

    //$("#btnCerrar").click(function () {
    //    var Nametab = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
    //    var Accord = window.parent.$("#" + Nametab);
    //    Accord.tabs("remove", Accord.tabs("option", "selected"));
    //});



    $("#btnPdf").click(function (e) {
        alert("En mantenimiento...");
        return;
        var fecha = $("#hdfFecEC").val();
        if (fecha != "") {
            $("#spMensaje").text("");
            var anho = fecha.substr(6, 4);
            var mesSol = fecha.substr(3, 2);
            var mes = DevuelveMes(mesSol);
            var RutaPdf = $("#hdfRuta").val() + anho + "/" + mes + "/";
            var CodigoEmpleado = "";
            var admin = $("#hdfAdmin").val();
            if (admin == 0) {
                CodigoEmpleado = $("#hdfEmpleado").val();
            }
            else {
                CodigoEmpleado = $("#hdfTecnicoResponsable").val();
                if (CodigoEmpleado == "") {
                    $("#spMensaje").text("Debe Seleccionar un empleado.");
                    return;
                }
            }


            var file = "Estado_de_Cuenta_" + CodigoEmpleado + ".pdf";
            var RutaFinal = RutaPdf + file;

            $.ajax({
                type: "POST",
                url: "../../../Common/WebService/General.asmx/CheckFileExists",
                data: JSON.stringify({
                    RutaCompleta: RutaFinal
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data.d == '1') {
                        window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + RutaFinal);
                    } else {
                        alerta('No se encuentra el archivo "' + file + '".');
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
        else {
            e.preventDefault();
            if ($("#toolbar").css('display') == "none") {
                $("#spMensaje").text("Usted no tiene un Estado de Cuenta");
            } else {
                $("#spMensaje").text("El empleado ingresado no tiene un Estado de Cuenta");
            }
        }
    });

    function DevuelveMes(mes) {
        var mesCadena = "";
        if (mes == "01") {
            mesCadena = "Enero";
        }
        else if (mes == "02") {
            mesCadena = "Febrero";
        }
        else if (mes == "03") {
            mesCadena = "Marzo";
        }
        else if (mes == "04") {
            mesCadena = "Abril";
        }
        else if (mes == "05") {
            mesCadena = "Mayo";
        }
        else if (mes == "06") {
            mesCadena = "Junio";
        }
        else if (mes == "07") {
            mesCadena = "Julio";
        }
        else if (mes == "08") {
            mesCadena = "Agosto";
        }
        else if (mes == "09") {
            mesCadena = "Setiembre";
        }
        else if (mes == "10") {
            mesCadena = "Octubre";
        }
        else if (mes == "11") {
            mesCadena = "Noviembre";
        }
        else if (mes == "12") {
            mesCadena = "Diciembre";
        }
        return mesCadena;
    }

    $("#txtPeriodo").change(function () {
        if ($("#hdfEmpleado").val() != "") {
            load($("#hdfEmpleado").val());
        }
    });

});

//function fnMostrarDatos(valor) {
//    $("#hdfTecnicoResponsable").val(valor);
//    if (valor != "") {
//        cargar_DatosEmpleado(valor);
//    }
//}

function cargar_DatosEmpleado(_valor) {
    $.ajax({
        type: "POST",
        url: "Con_Fac_EstadoCuenta.aspx/getEmpleado",
        data: JSON.stringify({
            'valor': _valor,
            "inTipOri": $("#hdfinTipOri").val()
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d.P_vcCod != null) {
                $("#spMensaje").text("");
                $("#lblCodigoEmpleado").text(data.d.P_vcCod);
                $("#lblNombreEmpleado").text(data.d.vcNom);
                $("#lblArea").text(data.d.Area.vcNomOrg);
                $("#lblCCosto").text(data.d.CentroCosto.vcNomCenCos);

                $("#hdfEmpleado").val(data.d.P_vcCod);
                fnCargarPeriodo(data.d.P_vcCod);
            } else {
                $("#lblCodigoEmpleado").text("(Desconocido)");
                $("#lblNombreEmpleado").text("(Desconocido)");
                $("#lblArea").text("(Desconocido)");
                $("#ddlSolicitud").empty();
                $("#spMensaje").text("Los filtros no coinciden");
                $("#lblMoneda").text("(Desconocido)");
                $("#lblNumCuotas").text("(Desconocido)");
                $("#lblDeuda").text("(Desconocido)");
                $("#lblCCosto").text("(Desconocido)");
                $("#hdfFecEC").val("");

                var dataSource = new kendo.data.DataSource({
                    data: {},
                    pageSize: 10
                });


                var grid = $("#grdEstadoCuenta").data("kendoGrid");
                grid.setDataSource(dataSource);

                var grid2 = $("#grCronogramaPagos").data("kendoGrid");
                grid2.setDataSource(dataSource);
                $("#tbExportar").hide();
                $("#btnPdf").hide();
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }


    });
}

function load(_IdEmpleado) {
    
    var p_periodo = $("#txtPeriodo").val();
    if (p_periodo != "") {
        p_periodo = p_periodo.substr(3, 4) + p_periodo.substr(0, 2) + "01";
    } else {
        $("#spMensaje").text("Seleccione un periodo.");
        return;
    }

    $.ajax({
        type: "POST",
        url: "Con_Fac_EstadoCuenta.aspx/ListarEstadoCuenta",
        data: JSON.stringify({
            'IdEmpleado': _IdEmpleado,
            "inTipOri": $("#hdfinTipOri").val(),
            "p_periodo": p_periodo
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d.length > 0) {

                var AltoGrilla = 0;
                AltoGrilla = altoPagina - 320;
                if (AltoGrilla <= 0) {
                    AltoGrilla = 250;
                }

                var dataSource = new kendo.data.DataSource({
                    data: data.d,
                    pageSize: 10
                });

                var gridele = $("#grdEstadoCuenta").data("kendoGrid");
                gridele.setDataSource(dataSource);

                var Moneda = oCultura.Moneda.vcNomLar + " (" + oCultura.Moneda.vcSimMon + ")"
                var FechaPago = data.d[0].UltDiaPago;
                var Periodo = data.d[0].Periodo;
                var SaldoAnterior = 0;
                if (data.d[0].SaldoAnterior.indexOf(",") >= 0) {
                    SaldoAnterior = SaldoAnterior + parseFloat(data.d[0].SaldoAnterior.replace(',', ''));

                }
                else {
                    SaldoAnterior = SaldoAnterior + parseFloat(data.d[0].SaldoAnterior);
                }
                var FechaGeneracionEC = data.d[0].FechaGeneracionEC;
                var MontoTotal = 0;

                var pagos = 0;
                var Deudas = 0;
                var i;
                for (i = 0; i < data.d.length; i++) {
                    if (data.d[i].MontoPagado.indexOf(",") >= 0) {
                        pagos = pagos + parseFloat(data.d[i].MontoPagado.replace(',', ''));
                    }
                    else {
                        pagos = pagos + parseFloat(data.d[i].MontoPagado);
                    }
                    if (data.d[i].MontoCuota.indexOf(",") >= 0) {
                        Deudas = Deudas + parseFloat(data.d[i].MontoCuota.replace(',', ''));
                    }
                    else {
                        Deudas = Deudas + parseFloat(data.d[i].MontoCuota);
                    }
                }
                MontoTotal = SaldoAnterior - pagos + Deudas;
                $("#lblMoneda").text(Moneda);
                $("#lblFechaPago").text(FechaPago);
                $("#lblPeriodo").text(Periodo);

                $("#lblECAnt").text(FormatoNumero(SaldoAnterior, oCultura));
                $("#lblPagos").text(FormatoNumero(pagos, oCultura));
                $("#lblConsumos").text(FormatoNumero(0, oCultura));
                $("#lblCuotasFinan").text(FormatoNumero(Deudas, oCultura));
                $("#lblMontoTotal").text(FormatoNumero(MontoTotal, oCultura));
                $("#hdfFecEC").val(FechaGeneracionEC);
                $("#spMensaje").text("");

                //descomentar para que se muestren los botones
                //$("#tbExportar").show();
                //$("#btnPdf").show();

                cronograma_6M(_IdEmpleado);
            }
            else {
                if ($("#toolbar").css('display') == "none") {
                    $("#spMensaje").text("Usted no tiene un Estado de Cuenta");
                } else {
                    $("#spMensaje").text("El empleado ingresado no tiene un Estado de Cuenta");
                }

                $("#lblMoneda").text("(Desconocido)");
                $("#lblFechaPago").text("(Desconocido)");
                $("#lblPeriodo").text("(Desconocido)");

                $("#lblECAnt").text("(Desconocido)");
                $("#lblPagos").text("(Desconocido)");
                $("#lblConsumos").text("(Desconocido)");
                $("#lblCuotasFinan").text("(Desconocido)");
                $("#lblMontoTotal").text("(Desconocido)");
                $("#hdfFecEC").val("");

                dataSource = new kendo.data.DataSource({
                    data: data.d,
                    pageSize: 10
                });

                gridele = $("#grdEstadoCuenta").data("kendoGrid");
                gridele.setDataSource(dataSource);

                var dataSource2 = new kendo.data.DataSource({
                    data: data.d,
                    pageSize: 1
                });

                var gridCrono = $("#grCronogramaPagos").data("kendoGrid");
                gridCrono.setDataSource(dataSource2);
                $("#tbExportar").hide();
                $("#btnPdf").hide();
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function cronograma_6M(_IdEmpleado) {

    $("#grCronogramaPagos").data("kendoGrid").dataSource.data([]);

    $.ajax({
        type: "POST",
        url: "Con_Fac_EstadoCuenta.aspx/getCronograma6M",
        data: JSON.stringify({
            'IdEmpleado': _IdEmpleado,
            "inTipOri": $("#hdfinTipOri").val()
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#grCronogramaPagos th[data-field=montoPago1]").html(data.d[0]["fecha1"]);
            $("#grCronogramaPagos th[data-field=montoPago2]").html(data.d[0]["fecha2"]);
            $("#grCronogramaPagos th[data-field=montoPago3]").html(data.d[0]["fecha3"]);
            $("#grCronogramaPagos th[data-field=montoPago4]").html(data.d[0]["fecha4"]);
            $("#grCronogramaPagos th[data-field=montoPago5]").html(data.d[0]["fecha5"]);
            $("#grCronogramaPagos th[data-field=montoPago6]").html(data.d[0]["fecha6"]);

            $("#grCronogramaPagos").data("kendoGrid").dataSource.data(data.d);
        },
        error: function (err) {
            alert(err.status + " - " + err.statusText);
        }
    });
}

function fnCargarPeriodo(idEmpleado) {
    $.ajax({
        type: "POST",
        url: "Con_Fac_EstadoCuenta.aspx/GetPeriodoxEmpl",
        data: JSON.stringify({
            'idEmpleado': idEmpleado
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var fechaMax;
            var fechaMin;
            var date = new Date();
            var fechainicio = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            if (result.d != "") {
                var itemE = result.d.split("|");
                fechaMax = new Date(itemE[0].substr(0, 4), itemE[0].substr(4, 2), 0);
                fechaMin = new Date(itemE[1].substr(0, 4), itemE[1].substr(4, 2), 0);

            } else {
                fechaMax = new Date(date.getFullYear(), date.getMonth(), 0);
                fechaMin = new Date(date.getFullYear(), date.getMonth(), 0);
            }
            //$(".bordeui").removeClass("ui-corner-all");
            //$(".bordeui").css({
            //    "border": "none",
            //    "padding": "0px"
            //});
            var periodo = $("#txtPeriodo").kendoDatePicker({
                culture: "es-PE",
                start: "year",
                depth: "year",
                value: fechainicio,
                format: "MM/yyyy",
                footer: false,
                max: fechaMax,
                min: fechaMin
            }).data("kendoDatePicker");

            load(idEmpleado);

        },
        error: function (err) {
            alert(err.status + " - " + err.statusText);
        }
    });
}
