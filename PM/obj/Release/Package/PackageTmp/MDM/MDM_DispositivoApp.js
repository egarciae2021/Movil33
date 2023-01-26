var oCulturaUsuario;
var inFilas;
var nuAltoFila = 19;
var ArrayPaginacion = [];
var ModalDispositivos;
var lstCampo = new Array();

function ENT_ENT_Aplicacion(IdDeviceApp, AppName, PackageName, Blocked, StarTime, EndTime) {
    this.IdDeviceApp = IdDeviceApp;
    this.AppName = AppName;
    this.PackageName = PackageName;
    this.Blocked = Blocked;
    this.StarTime = StarTime;
    this.EndTime = EndTime;

}
$(function () {
    oCulturaUsuario = window.parent.parent.parent.oCulturaUsuario;

    Init();

    $(window).resize(function () {
        DimPosElementos();
    });

    function Init() {
        
        fnCargarDatos();
        
    }

    $("#txtBusqueda").on('change keyup paste', function () {
        SearchByAppName();
    });

    NumeroInicialFilas();

    function extractContent(ID) {
        return $('#startTime_' + ID).val();

    }

    $("#btnGuardar").click(function () {
        var datos = $("#tbDispositivoApp").jqGrid('getGridParam', 'data');


        //lstCampo
        $(datos).each(function () {
            var oRow = this;
            var oCampo = new ENT_ENT_Aplicacion(oRow.ID, oRow.APPNAME, oRow.PACKAGENAME, (oRow.BLOCKED==="1"), oRow.STAR_TIME, oRow.END_TIME);
            lstCampo.push(oCampo);
        });

        var lista = JSON.stringify(lstCampo);

        let IdTipoFiltro = $("#hdfIdTipoFiltro").val();
        let Token = $("#hdfToken").val();
        var Data = {
            inIdFiltro: $("#hdfIdFiltro").val(),
            inIdTipoFiltro: $("#hdfIdTipoFiltro").val(),
            inListaApp : lista
        };
        

        $.ajax({
            type: "POST",
            url: "MDM_DispositivoApp.aspx/GuardarCambios",
            data: JSON.stringify(Data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                alerta("Se aplicaron los cambios.");

                if (parseInt(IdTipoFiltro) === 1) {
                    fnSincronizarTodos();
                } else {
                    if (parseInt(IdTipoFiltro) === 2 && Token != "") {
                        fnSincronizarDispositivo(Token);
                    }
                }
                window.parent.ModalDispositivos.dialog("close");

                //window.parent.location.reload();
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });
})

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    $("#tbDispositivoApp").setGridWidth($(window).width() - 50);
    $("#tbDispositivoApp").setGridHeight($(window).height() - 130);
    RecalcularColumnasGrilla("tbDispositivoApp", false);
    NumeroInicialFilasResize();
}

function NumeroInicialFilas() {
    debugger;
    ArrayPaginacion = [];
    inFilas = Math.floor(($(window).height() - 300) / nuAltoFila);

    ArrayPaginacion.push(inFilas);
    ArrayPaginacion.push(inFilas + inFilas);
    ArrayPaginacion.push(inFilas + inFilas + inFilas);
}

function NumeroInicialFilasResize() {
    inFilas = Math.floor(($(window).height() - 320) / nuAltoFila);
    inFilas = inFilas - 1;
    ActualizarPageSizeGrillasTab("tbDispositivoApp", inFilas);

}

function GenerarBotones(id, nombre, button) {

    var vcBotones = '<button id="btnDom_' + id + '" type="button" class="btn btn-' + button + '" style="margin: 5px;"><span class="glyphicon " aria-hidden="true"></span> ' + nombre + '</button>';
    return vcBotones;

}

function checkBox(e) {
    e = e || event; /* get IE event ( not passed ) */
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
}

function CellChange(Id)
{
    var rowData = $('#tbDispositivoApp').jqGrid('getRowData', Id);
    rowData.BLOCKED = ($('#blocked_' + Id).is(":checked")) ? "1" : "0";
    rowData.STAR_TIME = $('#startTime_' + Id).val();
    rowData.END_TIME = $('#endTime_' + Id).val();
    $('#tbDispositivoApp').jqGrid('setRowData', Id, rowData);
}

function fnCargarDatos() {
    var columnas = [
                { name: 'ID', label: 'ID', index: 'ID', width: 110, hidden: true, align: "center", key: true },
                {
                    name: 'APPNAME', label: 'Nombre', index: 'APPNAME', width: 110, hidden: false, align: "left"
                },
                {
                    name: 'PACKAGENAME', label: 'Paquete', index: 'PACKAGENAME', width: 110, hidden: false, align: "left"
                },
                {
                    name: 'BLOCKED', label: 'BLoqueado (Si/Nó)', index: 'BLOCKED', width: 80, hidden: false, align: "center",
                    //formatter: function (value, options, rData) {
                    //    if (rData.BLOCKED == true) {
                    //        return '<div class="checkbox"> <input id="demo-form-inline-checkbox" class="magic-checkbox" type="checkbox" checked=""><label for="demo-form-checkbox"></label></div>'
                    //    }
                    //    else{
                    //        return '<div class="checkbox"> <input id="demo-form-inline-checkbox" class="magic-checkbox" type="checkbox" ><label for="demo-form-checkbox"></label></div>'
                    //    }
                    //}
                    edittype: 'checkbox',
                    editoptions: { value: 'Yes:No', defaultValue: 'Yes' },
                    formatoptions: { disabled: false },
                    formatter: function (value, options, rData) {
                        return '<input type="checkbox" id="blocked_' + rData.ID +
                            (rData.BLOCKED === "1" ? '" checked="checked" onchange="CellChange(' + rData.ID + ')"/>' : '" onchange="CellChange(' + rData.ID + ')"/>');
                    }
                },
                {
                    name: 'STAR_TIME', label: 'Hora Inicial', index: 'STAR_TIME', width: 80, hidden: false, align: "center",
                    formatter: function (value, options, rData) {
                        
                        var FINI = (rData.STAR_TIME == null || rData.STAR_TIME == "0") ? "" : rData.STAR_TIME;
                        return '<input id="startTime_' + rData.ID + '" type="text" class="form-control" style="align-content:center" size="16" onkeypress="return startTimeOnKeyPress(event)" placeholder="00:00" value="' + FINI + '" onchange="CellChange(' + rData.ID + ')" title="Time formate 24 hr. ( 12:00 , 13:00 )">'
                    }
                },
                {
                    name: 'END_TIME', label: 'Hora Final', index: 'END_TIME', width: 80, hidden: false, align: "center",
                    formatter: function (value, options, rData) {

                        var FEND = (rData.END_TIME == null || rData.END_TIME == "0") ? "" : rData.END_TIME;
                        return '<input id="endTime_' + rData.ID + '" type="text" class="form-control" style="align-content:center" size="16" onkeypress="return startTimeOnKeyPress(event)" placeholder="23:59" value="' + FEND + '" onchange="CellChange(' + rData.ID + ')" title="Time formate 24 hr. ( 12:00 , 13:00 )">'
                    }
                }
                //,
                //{
                //    name: 'Accion', index: 'Accion', label: 'Accion', hidden: false, width: "80px", align: 'center', resizable: false,
                //    formatter: function (value, options, rData) {
                //        return GenerarBotones(rData.IMEI, "Aplicar", "success");
                //    }
                //}

    ];
    var IdFiltro = $("#hdfIdFiltro").val();
    var IdTipoFiltro = $("#hdfIdTipoFiltro").val();
    $.ajax({
        type: "POST",
        url: "MDM_DispositivoApp.aspx/ListarAplicativos",
        data: "{'inIdFiltro': '" + IdFiltro + "'," +
              "'inIdTipoFiltro': '" + IdTipoFiltro + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (result) {
            if ($(result.d).length > 0) {
                var resul = result.d;
                if (resul[0] == "1") {
                    window.parent.ModalDispositivos.dialog("close");
                    Mensaje("<br/><h1>No existe registros en los parámetros seleccionados.</h1>", document, null);
                    //$("#dvDispositivoApp").hide();
                } else {
                    $("#dvDispositivoApp").show();
                    var datos = JSON.parse(resul[1]);
                }

                tbGrupoCuenta = $("#tbDispositivoApp").jqGrid({
                    datatype: "local",
                    colModel: columnas,
                    data: datos,
                    sortname: "IMEI",
                    sortorder: "asc",
                    width: $(window).width() - 45,
                    height: $(window).height() - 165,
                    loadtext: 'Cargando datos...',
                    recordtext: "{0} - {1} de {2} elementos",
                    emptyrecords: 'No hay resultados',
                    pgtext: 'Pág: {0} de {1}',
                    rownumbers: true,
                    //gridview: true,
                    //rowNum: 10000,
                    rowList: [inFilas, inFilas * 2, inFilas * 5, inFilas*10], //[10, 20, 50, 100],
                    ignoreCase: true,
                    rowNum: inFilas,
                    shrinkToFit: true,
                    viewrecords: true,
                    hidegrid: false,
                    sortable: true,
                    //caption: "Relación de Dispositivos con App Instalada",
                    pager: "#PaginadorDispositivoApp"
                }).navGrid("#PaginadorDispositivoApp", { edit: false, add: false, search: true, del: false });
            } else {
                window.parent.ModalAplicaciones.dialog("close");
                Mensaje("<br/><h1>No existe registros en los parámetros seleccionados.</h1>", document, null);
                //$("#dvDispositivoApp").hide();
            }
            var columnNames = $("#tbDispositivoApp").jqGrid('getGridParam', 'colModel');
            for (var columnModelIndex in columnNames) {
                var columnModel = columnNames[columnModelIndex];
                if (!columnModel.hidden && columnModel.label != null) {
                    $("select#ddlBusqueda").append($("<option>")
                    .val(columnModel.name)
                    .html(columnModel.label)
                );
                }
            }
            

            //columnNames.forEach(function (element) {
            //    $("select#ddlBusqueda").append($("<option>")
            //        .val(element)
            //        .html(element)
            //    );
            //});
            

        }, // ==============================================================================================================================
        error: function (xhr, err, thrErr) {
            // ==============================================================================================================================
            MostrarErrorAjax(xhr, err, thrErr);
            // ==============================================================================================================================
        }
    });
}

function startTimeOnKeyPress(event) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8) {
        if (event.target.value.length > 4) {
            return false;
        } else {
            return true;
        }
    } else if (key < 47 || key > 58) {
        return false;
    } else {
        if (event.target.value.length > 4) {
            return false;
        } else {
            return true;
        }
    }
}

function endTimeOnKeyPress(event) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8) {
        if (event.target.value.length > 4) {
            return false;
        } else {
            return true;
        }
    } else if (key < 47 || key > 58) {
        return false;
    } else {
        if (event.target.value.length > 4) {
            return false;
        } else {
            return true;
        }
    }
}

function SearchByAppName() {

    var columnSel = $("#ddlBusqueda option:selected").val();
    //  Fetch the text from our <input> control
    var searchString = $("#txtBusqueda").val();

    //  Prepare to pass a new search filter to our jqGrid
    var f = { groupOp: "AND", rules: [] };

    //  Remember to change the following line to reflect the jqGrid column you want to search for your string in
    //  In this example, I'm searching through the UserName column.

    f.rules.push({ field: columnSel, op: "cn", data: searchString });

    var grid = $('#tbDispositivoApp');
    grid[0].p.search = f.rules.length > 0;
    $.extend(grid[0].p.postData, { filters: JSON.stringify(f) });
    grid.trigger("reloadGrid", [{ page: 1 }]);
}

function fnSincronizarTodos() {
    let idgateway = $("#hdfIdGateway").val();
    window.top.SignalCore_fnSincronizarTodos(idgateway);
}

function fnSincronizarDispositivo(authtoken) {
    let idgateway = $("#hdfIdGateway").val();
    window.top.SignalCore_fnSincronizarDispositivo(idgateway, authtoken)
}