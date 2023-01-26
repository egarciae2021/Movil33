/// <reference path="../Common/Scripts/jquery-2.0.0-vsdoc.js" />
var check;
var ale = true;
var mensajeAle = true;
var altoPagina = 0;
var oCulturaUsuario;

$(document).on("ready", function () {
    //    kendo.culture("es-PE");
    oCulturaUsuario = window.parent.parent.oCulturaUsuario;
    altoPagina = $(window).height();
    var AltoGrilla = 0;
    AltoGrilla = altoPagina - 320;
    if (AltoGrilla <= 0) {
        AltoGrilla = 250;
    }

    $(".bordeui").removeClass("ui-corner-all");
    $(".bordeui").css({
        "border": "none",
        "padding": "0px"
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
                            { field: "Monto", title: "Monto (" + oCulturaUsuario.Moneda.vcSimMon + ")", width: "150px", attributes: { style: "text-align: right;" }, headerAttributes: { "class": "table-header-cell", style: "text-align: center; width: 150px;"}}],
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
        //        height: AltoGrilla
    });

    var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    var FechaActual = new Date();


    //    var FechaMas1 = new Date(new Date(FechaActual).setMonth(FechaActual.getMonth()));
    //    var periodo1 = meses[FechaMas1.getMonth()] + "/" + FechaMas1.getFullYear();

    //    var FechaMas2 = new Date(new Date(FechaActual).setMonth(FechaActual.getMonth() + 1));
    //    var periodo2 = meses[FechaMas2.getMonth()] + "/" + FechaMas2.getFullYear();

    //    var FechaMas3 = new Date(new Date(FechaActual).setMonth(FechaActual.getMonth() + 2));
    //    var periodo3 = meses[FechaMas3.getMonth()] + "/" + FechaMas3.getFullYear();

    //    var FechaMas4 = new Date(new Date(FechaActual).setMonth(FechaActual.getMonth() + 3));
    //    var periodo4 = meses[FechaMas4.getMonth()] + "/" + FechaMas4.getFullYear();

    //    var FechaMas5 = new Date(new Date(FechaActual).setMonth(FechaActual.getMonth() + 4));
    //    var periodo5 = meses[FechaMas5.getMonth()] + "/" + FechaMas5.getFullYear();

    //    var FechaMas6 = new Date(new Date(FechaActual).setMonth(FechaActual.getMonth() + 5));
    //    var periodo6 = meses[FechaMas6.getMonth()] + "/" + FechaMas6.getFullYear();

    //    var periodo1, periodo2, periodo3, periodo4, periodo5, periodo6;

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
            field: "vcmontoPago1",
            headerAttributes: {
                style: "text-align: center; width:30px;",
                width: "30px"
            },
            attributes: {
                "class": "table-cell",
                style: "text-align: right;"
            },
            format: "{0:c}",
            width: "30px",
            title: ""//periodo1//"Nov 2013"
        },
        {
            field: "vcmontoPago2",
            headerAttributes: {
                style: "text-align: center; width:30px;",
                width: "30px"
            },
            attributes: {
                "class": "table-cell",
                style: "text-align: right;"
            },
            format: "{0:c}",
            width: "30px",
            title: ""//periodo2
        },
         {
             field: "vcmontoPago3",
             headerAttributes: {
                 style: "text-align: center; width:30px;",
                 width: "30px"
             },
             attributes: {
                 "class": "table-cell",
                 style: "text-align: right;"
             },
             format: "{0:c}",
             width: "30px",
             title: ""//periodo3
         },
        {
            field: "vcmontoPago4",
            headerAttributes: {
                style: "text-align: center; width:30px;",
                width: "30px"
            },
            attributes: {
                "class": "table-cell",
                style: "text-align: right;"
            },
            format: "{0:c}",
            width: "30px",
            title: ""//periodo4
        },
        {
            field: "vcmontoPago5",
            headerAttributes: {
                style: "text-align: center; width:30px;",
                width: "30px"
            },
            attributes: {
                "class": "table-cell",
                style: "text-align: right;"
            },
            format: "{0:c}",
            width: "30px",
            title: "fecha5"
        },
        {
            field: "vcmontoPago6",
            headerAttributes: {
                style: "text-align: center; width:30px;",
                width: "30px"
            },
            attributes: {
                "class": "table-cell",
                style: "text-align: right;"
            },
            format: "{0:c}",
            width: "30px",
            title: ""//periodo6
        }]

    });

    cronograma_6M("0000");
    //    $("#grCronogramaPagos th[data-field=montoPago1]").html(periodo1);
    //    $("#grCronogramaPagos th[data-field=montoPago2]").html(periodo2);
    //    $("#grCronogramaPagos th[data-field=montoPago3]").html(periodo3);
    //    $("#grCronogramaPagos th[data-field=montoPago4]").html(periodo4);
    //    $("#grCronogramaPagos th[data-field=montoPago5]").html(periodo5);
    //    $("#grCronogramaPagos th[data-field=montoPago6]").html(periodo6);

    Inicio();
    function Inicio() {

        $("#lblDemonMoneda").text("" + oCulturaUsuario.Moneda.vcNomLar);
        $("#tbExportar").hide();
        $("#btnPdf").hide();
        $("#txtPeriodo").val("");
        var admin = $("#hdfAdmin").val();
        $("#TextBox1").hide();
        if (admin == 0 && $("#hdfOrganizacion").val() == "") {
            $("#tbInfoUsuario").hide();
            $("#toolbar").hide();

            var _valor = $("#hdfEmpleado").val();
            cargar_DatosEmpleado(_valor);
        }
        else {
            $("#dvMonto").addClass("Adm");
        }

        try {
            $.browser.chrome = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase());

            if ($.browser.chrome) {
                $(".Alto").css({ 'height': "35px", 'width': "89px" });
            }
            else {
                $(".Alto").css({ 'height': "30px", 'width': "90px" });
            }
        } catch (Error) {

        }

    }

    $("#btnCerrar").click(function () {
        var Nametab = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
        var Accord = window.parent.$("#" + Nametab);
        Accord.tabs("remove", Accord.tabs("option", "selected"));
    });



    $("#btnPdf").click(function (e) {
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
                        //Generar archivo...
                        $.ajax({
                            type: "POST",
                            url: "Con_Fac_EstadoCuenta.aspx/GenerarEstadoCuentaPDF",
                            data: JSON.stringify({
                                IdEmpleado: CodigoEmpleado,
                                Anio: anho,
                                Mes: mesSol
                            }),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (data) {
                                if (data.d != '') {
                                    window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + data.d);
                                }
                                else {
                                    alerta('No se pudo generar el Estado de Cuenta.');
                                }
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
        }
        else {
            e.preventDefault();
            //            $("#spMensaje").text("Usted no tiene un Estado de cuenta");
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

function fnMostrarDatos(valor) {
    $("#hdfTecnicoResponsable").val(valor);
    if (valor != "") {
        cargar_DatosEmpleado(valor);
    }
}

function cargar_DatosEmpleado(_valor) {
    $("#txtPeriodo").removeClass("k-input");
    $.ajax({
        type: "POST",
        url: "Con_Fac_EstadoCuenta.aspx/getEmpleado",
        data: JSON.stringify({
            'valor': _valor,
            "inTipOri": $("#hdfinTipOri").val()
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            //console.log(data);
                if (data.d.P_vcCod != null) {
                $("#spMensaje").text("");
                $("#lblCodigoEmpleado").text(data.d.P_vcCod);
                $("#lblNombreEmpleado").text(data.d.vcNom);
                $("#lblArea").text(data.d.Area.vcNomOrg);
                $("#lblCCosto").text(data.d.CentroCosto.vcNomCenCos);

                $("#hdfEmpleado").val(data.d.P_vcCod);
                fnCargarPeriodo(data.d.P_vcCod);

//                load(data.d.P_vcCod);
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
        error: function(xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }


    });
}

function load(_IdEmpleado) {
    var p_periodo;
    if ($("#hdfAdmin").val() == "1") {
        p_periodo = $("#txtPeriodo").val();
        if (p_periodo != "") {
            p_periodo = p_periodo.substr(3, 4) + p_periodo.substr(0, 2) + "01";
        }
    } else {
        p_periodo = $("#hdfFecServidor").val();
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
                var i;
                var AltoGrilla = 0;
                AltoGrilla = altoPagina - 320;
                if (AltoGrilla <= 0) {
                    AltoGrilla = 250;
                }

                var datos = data.d;
                for (i = 0; i < datos.length; i++) {
                    datos[i].Monto = FormatoNumero(data.d[i].Monto, oCulturaUsuario);
                    datos[i].MontoCuota = FormatoNumero(data.d[i].MontoCuota, oCulturaUsuario);
                    datos[i].SaldoAnterior = FormatoNumero(data.d[i].SaldoAnterior, oCulturaUsuario);
                    datos[i].MontoPagado = FormatoNumero(data.d[i].MontoPagado, oCulturaUsuario);
                }

                var dataSource = new kendo.data.DataSource({
                    data: datos,
                    pageSize: 10
                });

                //console.log(data.d);
                var gridele = $("#grdEstadoCuenta").data("kendoGrid");
                gridele.setDataSource(dataSource);


                var Moneda = oCulturaUsuario.Moneda.vcNomLar + " (" + oCulturaUsuario.Moneda.vcSimMon + ")"; //Nuevos Soles (S/.)";
                var FechaPago = data.d[0].UltDiaPago;
                var Periodo = data.d[0].Periodo;
                var SaldoAnterior = 0;
                if (oCulturaUsuario.vcSimDec.toString() == ',') {
                    //SaldoAnterior = SaldoAnterior + parseFloat(data.d[0].SaldoAnterior.replace(',', ''));
                    SaldoAnterior = SaldoAnterior + parseFloat(ParseFloatMultiPais(data.d[0].SaldoAnterior, oCulturaUsuario));
                }
                else {
                    SaldoAnterior = SaldoAnterior + parseFloat(data.d[0].SaldoAnterior);
                }
                var FechaGeneracionEC = data.d[0].FechaGeneracionEC;
                var MontoTotal = 0;

                var pagos = 0;
                var Deudas = 0;

                for (i = 0; i < data.d.length; i++) {
                    if (oCulturaUsuario.vcSimDec.toString() == ',') {
                        pagos = parseFloat(ParseFloatMultiPais(pagos, oCulturaUsuario)) + parseFloat(ParseFloatMultiPais(data.d[i].MontoPagado, oCulturaUsuario));
                    }
                    else {
                        pagos = pagos + parseFloat(data.d[i].MontoPagado);
                    }
                    if (data.d[i].MontoCuota.indexOf(",") >= 0) {
                        Deudas = Deudas + parseFloat(data.d[i].MontoCuota.replace(',', ''));
                    }
                    else {
                        if (oCulturaUsuario.vcSimDec.toString() == ',') {
                            Deudas = parseFloat(ParseFloatMultiPais(Deudas, oCulturaUsuario)) + parseFloat(ParseFloatMultiPais(data.d[i].MontoCuota, oCulturaUsuario));
                            //Deudas = parseFloat(Deudas) + parseFloat(data.d[i].MontoCuota);
                        } else {
                            Deudas = Deudas + parseFloat(data.d[i].MontoCuota);
                        }

                    }
                }
                if (oCulturaUsuario.vcSimDec.toString() == ',') {
                    MontoTotal = parseFloat(ParseFloatMultiPais(SaldoAnterior, oCulturaUsuario)) - parseFloat(ParseFloatMultiPais(pagos, oCulturaUsuario)) + parseFloat(ParseFloatMultiPais(Deudas, oCulturaUsuario));
                    //MontoTotal = parseFloat(SaldoAnterior) - parseFloat(pagos) + parseFloat(Deudas);
                } else {
                    MontoTotal = SaldoAnterior - pagos + Deudas;
                }

                $("#lblMoneda").text(Moneda);
                $("#lblFechaPago").text(FechaPago);
                $("#lblPeriodo").text(Periodo);

                //$("#lblECAnt").text(kendo.toString(SaldoAnterior, "c"));
                $("#lblECAnt").text(FormatoNumero(SaldoAnterior, oCulturaUsuario));
                //$("#lblPagos").text(kendo.toString(pagos, "c"));
                $("#lblPagos").text(FormatoNumero(pagos, oCulturaUsuario));
                $("#lblConsumos").text(FormatoNumero("0", oCulturaUsuario));
                //$("#lblCuotasFinan").text(kendo.toString(Deudas, "c"));
                $("#lblCuotasFinan").text(FormatoNumero(Deudas, oCulturaUsuario));
                //$("#lblMontoTotal").text(kendo.toString(MontoTotal, "c"));
                $("#lblMontoTotal").text(FormatoNumero(MontoTotal, oCulturaUsuario));
                $("#hdfFecEC").val(FechaGeneracionEC);
                $("#spMensaje").text("");

                $("#tbExportar").show();
                $("#btnPdf").show();
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
            $("#grCronogramaPagos th[data-field=vcmontoPago1]").html(data.d[0]["fecha1"]);
            $("#grCronogramaPagos th[data-field=vcmontoPago2]").html(data.d[0]["fecha2"]);
            $("#grCronogramaPagos th[data-field=vcmontoPago3]").html(data.d[0]["fecha3"]);
            $("#grCronogramaPagos th[data-field=vcmontoPago4]").html(data.d[0]["fecha4"]);
            $("#grCronogramaPagos th[data-field=vcmontoPago5]").html(data.d[0]["fecha5"]);
            $("#grCronogramaPagos th[data-field=vcmontoPago6]").html(data.d[0]["fecha6"]);

            for (var i = 0; i < data.d.length; i++) {
                data.d[i].montoPago1 = FormatoNumero(data.d[i].montoPago1, oCulturaUsuario, false);
                data.d[i].montoPago2 = FormatoNumero(data.d[i].montoPago2, oCulturaUsuario, false);
                data.d[i].montoPago3 = FormatoNumero(data.d[i].montoPago3, oCulturaUsuario, false);
                data.d[i].montoPago4 = FormatoNumero(data.d[i].montoPago4, oCulturaUsuario, false);
                data.d[i].montoPago5 = FormatoNumero(data.d[i].montoPago5, oCulturaUsuario, false);
                data.d[i].montoPago6 = FormatoNumero(data.d[i].montoPago6, oCulturaUsuario, false);
            }

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
            $(".bordeui").removeClass("ui-corner-all");
            $(".bordeui").css({
                "border": "none",
                "padding": "0px"
            });
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
