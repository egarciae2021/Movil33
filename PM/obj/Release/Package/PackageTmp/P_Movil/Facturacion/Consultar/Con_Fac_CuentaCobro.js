var oCulturaUsuario;

$(document).ready(function () {
    oCulturaUsuario = window.parent.parent.oCulturaUsuario;
    kendo.culture("es-PE");
    altoPagina = $(window).height();
    var AltoGrilla = 0;
    AltoGrilla = altoPagina - 320;
    if (AltoGrilla <= 0) {
        AltoGrilla = 250;
    }
    $("#TextBox1").hide();

    $("#gridCuentaCobro").kendoGrid({
        dataSource: {},
        groupable: false,
        sortable: true,
        navigatable: true,
        height: 550,
        width: 800,
        selectable: "single",
        reorderable: false,
        resizable: true,
        columns: [

                {
                    field: "IdEmpleado",
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: center;"
                    },
                    attributes: {
                        "class": "table-cell",
                        style: "text-align: center;"
                    },
                    width: "60px",
                    title: "Código"
                },
                {
                    field: "NombreEmpl",
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: center;"
                    },
                    attributes: {
                        "class": "table-cell",
                        style: "text-align: left;"
                    },
                    width: "200px",
                    title: "Empleado"
                },
                {
                    field: "Fecha",
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: center;"
                    },
                    attributes: {
                        "class": "table-cell",
                        style: "text-align: center;"
                    },
                    width: "60px",
                    title: "Fecha"
                },
                {
                    field: "DcSaldo",
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: center;"
                    },
                    attributes: {
                        "class": "table-cell",
                        style: "text-align: right;"
                    },
                    width: "60px",
                    title: "Saldo Ant. (" + oCulturaUsuario.Moneda.vcSimMon + ")"
                },
                {
                    field: "DcCargo",
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: center;"
                    },
                    attributes: {
                        "class": "table-cell",
                        style: "text-align: right;"
                    },
                    width: "60px",
                    title: "Cargo (" + oCulturaUsuario.Moneda.vcSimMon + ")"
                },
                {
                    field: "DcAbono",
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: center;"
                    },
                    attributes: {
                        "class": "table-cell",
                        style: "text-align: right;",
                        format: "{0:c}"
                    },
                    width: "60px",
                    title: "Abono (" + oCulturaUsuario.Moneda.vcSimMon + ")"
                }
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
        height: AltoGrilla
    });

    ValidarNumeroEnCajaTexto("txtMontoMayora", ValidarDecimalPositivo, oCulturaUsuario);
    ValidarNumeroEnCajaTexto("txtMontoMenora", ValidarDecimalPositivo, oCulturaUsuario);

    var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"];
    var FechaActual = new Date();
    var sel = $("#ddlPeriodo");
    sel.empty();
    var i;
    for (i = 0; i < 12; i++) {
        var FechaMas8 = FechaActual.addMonths(-1 * i);
        var periodo = meses[FechaMas8.getMonth()] + "/" + FechaMas8.getFullYear();
        var mes = ((FechaMas8.getMonth() + 1).toString());
        if (mes.length == 1) {
            mes = "0" + mes;
        }
        var value = FechaMas8.getFullYear().toString() + mes;
        sel.append('<option value="' + value + '">' + periodo + '</option>');
    }

    Inicio();
    function Inicio() {


        ValidarNumeroEnCajaTexto("txtMontoMayora", ValidarDecimalPositivo);
        ValidarNumeroEnCajaTexto("txtMontoMenora", ValidarDecimalPositivo);

        $("#tbExportar").hide();
        var habilitarBoton = $("#hdfProcManualExpor").val();

        if (habilitarBoton == 0) {
            $("#btnExpCobros").addClass('k-button k-state-disabled');
            $("#btnExpCobros").hide();
        }
        habilitarBoton = $("#hdfProcManualVeri").val();
        if (habilitarBoton == 0) {
            $("#btnVeriCobros").addClass('k-button k-state-disabled');
            $("#btnVeriCobros").hide();
        }
        habilitarBoton = $("#hdfProcManualGenCC").val();
        if (habilitarBoton == 0) {
            $("#btnGenCuentaCobro").addClass('k-button k-state-disabled');
            $("#btnGenCuentaCobro").hide();
        }
        cargar_grilla();
    }

    $("#btnGenCuentaCobro").on('click', function () {

        if (confirm('El proceso puede tardar varios minutos, Esta seguro de ejecutarlo?')) {
            $.ajax({
                type: "POST",
                url: "Con_Fac_CuentaCobro.aspx/Proc_GenCuentaCobro",
                data: JSON.stringify({
                    "inTipOri": $("#hdfinTipOri").val()
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function () {
                    alerta("El Proceso se esta ejecutando, vuelva a actualizar la página en unos minutos");
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }

    });


    $("#btnExpCobros").on('click', function () {
        if (confirm('El proceso puede tardar varios minutos, Esta seguro de ejecutarlo?')) {

            $.ajax({
                type: "POST",
                url: "Con_Fac_CuentaCobro.aspx/GetProcesoExportacion",
                data: JSON.stringify({
                    'origen': $("#hdfProcOrigenExpor").val(),
                    'destino': $("#hdfProcDestinoExpor").val(),
                    'inTipOri': $("#hdfinTipOri").val()
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {

                    alerta("El Proceso se esta ejecutando, vuelva a actualizar la página en unos minutos");
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
    });

    $("#btnVeriCobros").on('click', function () {

        if ($("#hdfProcManualVeri").val() == "1" && $("#hdfProcOrigenVeri").val() == "0" && $("#hdfIndGenPagos").val() == "0") {
            alerta("Se debe configurar un Origen para la importación de pagos");
            return;
        }


        if (confirm('El proceso puede tardar varios minutos, Esta seguro de ejecutarlo?')) {

            $.ajax({
                type: "POST",
                url: "Con_Fac_CuentaCobro.aspx/GetProcesoVerificacionCobros",
                data: JSON.stringify({
                    'origen': $("#hdfProcOrigenVeri").val(),
                    'destino': $("#hdfProcDestinoVeri").val(),
                    'indGenPagos': $("#hdfIndGenPagos").val(),
                    'inTipOri': $("#hdfinTipOri").val()
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    alerta("El Proceso se esta ejecutando, vuelva a actualizar la página en unos minutos");
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
    });


    $("#btnBuscar").click(function () {
        cargar_grilla();
    });

});

function cargar_grilla() {
    var _MontoMayora = $("#txtMontoMayora").val();
    var _MontoMenora = $("#txtMontoMenora").val();

    if (_MontoMayora != "" && _MontoMenora != "") {
        //        _MontoMayora = parseFloat($("#txtMontoMayora").val());
        _MontoMayora = parseFloat(ParseFloatMultiPais($("#txtMontoMayora").val(), oCulturaUsuario));
        //        _MontoMenora = parseFloat($("#txtMontoMenora").val());
        _MontoMenora = parseFloat(ParseFloatMultiPais($("#txtMontoMenora").val(), oCulturaUsuario));
        if (_MontoMayora > _MontoMenora) {
            $("#spMensaje").text('El campo "Monto Mayor a" debe tener un valor menor que el campo "Monto Menor a".');
            return;
        }
        else {
            $("#spMensaje").text("");
        }
    }

    var _periodo = $("#ddlPeriodo").val();

    if (_periodo == "") {
        $("#spMensaje").text('Seleccione el periodo.');
        return;
    }
    else {
        $("#spMensaje").text("");
    }


    $.ajax({
        type: "POST",
        url: "Con_Fac_CuentaCobro.aspx/GetListaCuentaCobro",
        data: JSON.stringify({
            'periodo': _periodo,
            //                'filtro': _filtro,
            'valor': $("#hdfTecnicoResponsable").val(),
            'montoMenora': _MontoMenora,
            'montoMayora': _MontoMayora,
            "inTipOri": $("#hdfinTipOri").val()
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var dataSource;
            var grilla;
            if (data.d.length > 0) {
                dataSource = new kendo.data.DataSource({
                    data: data.d,
                    pageSize: 10
                });
                grilla = $("#gridCuentaCobro").data("kendoGrid");
                grilla.setDataSource(dataSource);
                $("#spMensaje").text('');
                $("#tbExportar").show();
            }
            else {
                dataSource = new kendo.data.DataSource({
                    data: {},
                    pageSize: 10
                });
                grilla = $("#gridCuentaCobro").data("kendoGrid");
                grilla.setDataSource(dataSource);
                $("#spMensaje").text('No existen deudas que cumplan con estos parámetros de búsqueda.');
                $("#tbExportar").hide();
            }

        }
    });

}

//function justNumbers(e) {
//    var keynum = window.event ? window.event.keyCode : e.which;
//    if ((keynum == 8) || (keynum == 46))
//        return true;

//    return /\d/.test(String.fromCharCode(keynum));
//}

function checkdate(m, d, y) {
    return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0))
    .getDate();
}

function fnMostrarDatos(valor) {
    $("#hdfTecnicoResponsable").val(valor);
    cargar_grilla();
}