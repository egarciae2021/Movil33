var prg = 0;
var generado = false;
$(function () {

    $("#pbGenerar").progressbar({
        value: prg
    });

    $("#bntGenerar").click(function () {
        if (!generado) {
            fnInsertarColaExportacionCobros();
            generado = true;
        } else {
            alert("El archivo ya ha sido generado");
        }
    });

    $("#tbUltimoCobro").kendoGrid({
        dataSource: {},
        groupable: false,
        sortable: true,
        navigatable: true,
        toolbar: '<div style="font-weight:bold;padding:3px;">Último archivo de cobro generado</div>',
        columns: [
            { field: "Nombre", title: "Nombre Archivo" },
            { field: "NombreCompleto", title: "Nombre Archivo", hidden: true },
            { field: "Extension", title: "Extensión", hidden: true },
            { field: "Ubicacion", title: "Ubicación de archivo", hidden: true },
            { field: "FechaCreacion", title: "Fecha de creación", width: 170 },
            { field: "Tamano", title: "Tamaño", width: 90, attributes: { style: "text-align: right;"} },
            { width: 150, command: [
                {
                    name: "Descargar Archivo",
                    click: function (e) {
                        e.preventDefault();
                        var tr = $(e.currentTarget).closest("tr");
                        var data = $("#tbUltimoCobro").data("kendoGrid").dataItem(tr);

                        window.location.href = "../../../Common/Controladores/DescargarArchivo.ashx?archivo=" + data.Ubicacion + "&remoto=1";
                    }
                }
            ], attributes: { style: "text-align: center;" }
            }
        ],
        height: 87
    });

    $("#tbHistoricoCobros").kendoGrid({
        dataSource: {},
        groupable: false,
        sortable: true,
        navigatable: true,
        toolbar: '<div style="font-weight:bold;padding:3px;float:left">Histórico de cobros</div><div style="font-weight:bold;padding:3px;float:right">Cantidad de archivos: <span id="FileCountExport"></span></div>',
        columns: [
            { field: "Nombre", title: "Nombre Archivo" },
            { field: "NombreCompleto", title: "Nombre Archivo", hidden: true },
            { field: "Extension", title: "Extensión", hidden: true },
            { field: "Ubicacion", title: "Ubicación de archivo", hidden: true },
            { field: "FechaCreacion", title: "Fecha de creación", width: 170 },
            { field: "Tamano", title: "Tamaño", width: 90, attributes: { style: "text-align: right;"} },
            { width: 150, command: [
                {
                    name: "Descargar Archivo",
                    click: function (e) {
                        e.preventDefault();
                        var tr = $(e.currentTarget).closest("tr");
                        var data = $("#tbHistoricoCobros").data("kendoGrid").dataItem(tr);

                        window.location.href = "../../../Common/Controladores/DescargarArchivo.ashx?archivo=" + data.Ubicacion + "&remoto=1";
                    }
                }
            ], attributes: { style: "text-align: center;" }
            }
        ],
        height: 150
    });

    $("#tbUltimoPago").kendoGrid({
        dataSource: {},
        groupable: false,
        sortable: true,
        navigatable: true,
        toolbar: '<div style="font-weight:bold;padding:3px;">Archivo de pago por procesar</div>',
        columns: [
            { field: "Nombre", title: "Nombre Archivo" },
            { field: "NombreCompleto", title: "Nombre Archivo", hidden: true },
            { field: "Extension", title: "Extensión", hidden: true },
            { field: "Ubicacion", title: "Ubicación de archivo", hidden: true },
            { field: "FechaCreacion", title: "Fecha de creación", width: 170 },
            { field: "Tamano", title: "Tamaño", width: 90, attributes: { style: "text-align: right;"} },
            { width: 150, command: [
                {
                    name: "Descargar Archivo",
                    click: function (e) {
                        e.preventDefault();
                        var tr = $(e.currentTarget).closest("tr");
                        var data = $("#tbUltimoPago").data("kendoGrid").dataItem(tr);

                        window.location.href = "../../../Common/Controladores/DescargarArchivo.ashx?archivo=" + data.Ubicacion + "&remoto=1";
                    }
                }
            ], attributes: { style: "text-align: center;" }
            }
        ],
        height: 87
    });

    $("#tbHistoricoPagos").kendoGrid({
        dataSource: {},
        groupable: false,
        sortable: true,
        navigatable: true,
        toolbar: '<div style="font-weight:bold;padding:3px;float:left">Pagos ya procesados</div><div style="font-weight:bold;padding:3px;float:right">Cantidad de archivos: <span id="FileCountImport"></span></div>',
        columns: [
            { field: "Nombre", title: "Nombre Archivo" },
            { field: "NombreCompleto", title: "Nombre Archivo", hidden: true },
            { field: "Extension", title: "Extensión", hidden: true },
            { field: "Ubicacion", title: "Ubicación de archivo", hidden: true },
            { field: "FechaCreacion", title: "Fecha de creación", width: 170 },
            { field: "Tamano", title: "Tamaño", width: 90, attributes: { style: "text-align: right;"} },
            { width: 150, command: [
                {
                    name: "Descargar Archivo",
                    click: function (e) {
                        e.preventDefault();
                        var tr = $(e.currentTarget).closest("tr");
                        var data = $("#tbHistoricoPagos").data("kendoGrid").dataItem(tr);

                        window.location.href = "../../../Common/Controladores/DescargarArchivo.ashx?archivo=" + data.Ubicacion + "&remoto=1";
                    }
                }
            ], attributes: { style: "text-align: center;" }
            }
        ],
        height: 150
    });

    ListarArchivosCobros();
    ListarArchivosPagos();
});

function ListarArchivosCobros() {
    var ListarArchivosCobros_Data = {
        UbicacionCobro: $("#lblRutaExportacionDeuda").text(),
        UbicacionBackup: $("#lblExp_RutaBackup").text()
    };
    $.ajax({
        type: "POST",
        url: "Fac_Exportar_Importar.aspx/ListarArchivosCobros",
        data: JSON.stringify(ListarArchivosCobros_Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var dataSource_UC = new kendo.data.DataSource({
                data: result.d[0]
            });
            var tbUltimoCobro = $("#tbUltimoCobro").data("kendoGrid");
            tbUltimoCobro.setDataSource(dataSource_UC);

            $("#FileCountExport").text(result.d[1].length);
            var dataSource_HC = new kendo.data.DataSource({
                data: result.d[1]
            });
            var tbHistoricoCobros = $("#tbHistoricoCobros").data("kendoGrid");
            tbHistoricoCobros.setDataSource(dataSource_HC);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function CargarNombreArchivo(Archivo, RutaCompleta) {
    var ValidarRutaImportacion_Data = {
        RutaImportacion: $("#lblRutaImportacion").text()
    };

    if (Archivo != $("#lblNombreArchivoImportacion").text()) {
        alerta('El archivo cargado no tienen el nombre esperado "' + $("#lblNombreArchivoImportacion").val() + '"');
        return;
    }

    $.ajax({
        type: "POST",
        url: "Fac_Exportar_Importar.aspx/ValidarRutaImportacion",
        data: JSON.stringify(ValidarRutaImportacion_Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var lst = result.d.split("|");
            if (lst[0] == "0") {
                $("#lblMensajeCargarArchivo").text(lst[1].toString());
                $('#msgCargaArchivo').dialog({
                    title: "¡Ya existe archivo!",
                    modal: true,
                    buttons: [
                        {
                            text: "Reemplazar archivo",
                            click: function () {
                                $('#msgCargaArchivo').dialog("close");
                                fnCargarArchivoRutaImportacion(RutaCompleta, $("#lblNombreArchivoImportacion").text(), $("#lblRutaImportacion").text());
                            }
                        },
                        {
                            text: "Cancelar carga",
                            click: function () {
                                $('#msgCargaArchivo').dialog("close");
                            }
                        }
                    ]
                });
            } else {
                fnCargarArchivoRutaImportacion(RutaCompleta, $("#lblNombreArchivoImportacion").text(), $("#lblRutaImportacion").text());
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnCargarArchivoRutaImportacion(RutaTemporal, NombreArchivoPagos, RutaImportacion) {
    var CargarArchivoPagos_Data = {
        RutaTemporal: RutaTemporal,
        NombreArchivoPagos: NombreArchivoPagos,
        RutaImportacion: RutaImportacion,
        Sobrescribir: true
    };
    $.ajax({
        type: "POST",
        url: "Fac_Exportar_Importar.aspx/CargarArchivoPagos",
        data: JSON.stringify(CargarArchivoPagos_Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var lst = result.d.split("|");
            if (lst[0] == "1") {
                alerta(lst[1].toString());
                ListarArchivosPagos();
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function ListarArchivosPagos() {
    var ListarArchivosPagos_Data = { ubicacion: $("#lblRutaImportacion").text() };
    $.ajax({
        type: "POST",
        url: "Fac_Exportar_Importar.aspx/ListarArchivosPagos",
        data: JSON.stringify(ListarArchivosPagos_Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var dataSource_UP = new kendo.data.DataSource({
                data: result.d[0]
            });
            var tbUltimoPago = $("#tbUltimoPago").data("kendoGrid");
            tbUltimoPago.setDataSource(dataSource_UP);

            $("#FileCountImport").text(result.d[1].length);
            var dataSource_HP = new kendo.data.DataSource({
                data: result.d[1]
            });
            var tbHistoricoPagos = $("#tbHistoricoPagos").data("kendoGrid");
            tbHistoricoPagos.setDataSource(dataSource_HP);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnInsertarColaExportacionCobros() {
    $.ajax({
        type: "POST",
        url: "Fac_Exportar_Importar.aspx/InsertarColaExportacionCobros",
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d != 0) {
                $("#pbGenerar").show();
                $("#lblPorcentaje").show();
                IniciarConsulta(result.d);
            } else {
                alerta("Error al insertar la exportación de cobros.");
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnConsultarEstadoCola(IdCola) {
    $.ajax({
        type: "POST",
        url: "Fac_Exportar_Importar.aspx/ConsultarEstadoCola",
        data: JSON.stringify({
            IdCola: IdCola
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            prg = result.d.InAva;
            $("#lblPorcentaje").text(prg.toString() + "%");
            $("#pbGenerar").progressbar("option", "value", prg);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function IniciarConsulta(IdCola) {
    $.timer(1500, function (t) {
        if (prg < 100) {
            fnConsultarEstadoCola(IdCola);
        } else {
            t.stop();
            ListarArchivosCobros();
        }
    });
}