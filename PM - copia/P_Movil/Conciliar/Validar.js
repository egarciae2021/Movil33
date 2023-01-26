var oCulturaUsuario;
var tbConciliacion;
var Cerrado;
var VentanaModalAbierta = false;
var ModeloColumnas = [
            { name: 'Correlativo', hidden: true, key: true },
            {
                name: 'Empleado', label: 'Empleado', index: 'Empleado', width: 100, sortable: true, hidden: false,
            },
            { name: 'NumeroDeTelefono', label: 'Número', index: 'NumeroDeTelefono', width: 60, sortable: true, align: "right" },
            { name: 'PlanNombre', label: 'Plan', index: 'PlanNombre', width: 100, sortable: true, align: "left" },
            {
                name: 'Total', label: 'Total', index: 'Total', width: 80, align: "right", formatter: 'number', sortable: true, sorttype: 'number',
                formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
            },
            {
                name: 'Concepto', label: 'Ver Conceptos', index: 'Concepto', width: 55, align: "center", sortable: false,
                formatter: function (value, options, rData) {
                    var ValorParametro = "'" + rData.NumeroDeTelefono + "'";
                    var IdGrilla = "'" + options.gid + "'";
                    return '<img style="cursor: pointer;" onclick="javascript:Detalle_Click(' + IdGrilla + ',' + ValorParametro + ');" src="../../Common/Images/Mantenimiento/Ampliar_16x16.png" />';
                }
            },
            {
                name: 'Aprobado', label: 'Aprobado', index: 'Aprobado', width: 70, align: "center", sortable: false,
                formatter: function (value, options, rData) {
                    var ValorParametro = "";
                    var NumeroTelefono = "";
                    if (value.indexOf("|") >= 0) {
                        NumeroTelefono = value.split("|")[1];
                        ValorParametro = "'" + value.split("|")[1] + "'";
                        value = value.split("|")[0];
                    }
                    else {
                        NumeroTelefono = rData.NumeroDeTelefono;
                        ValorParametro = "'" + rData.NumeroDeTelefono + "'";
                    }

                    if (Cerrado == "1") {
                        if (value == "1" || value == "True") {
                            return "SI";
                        }
                        else {
                            return "NO";
                        }
                    }
                    else {
                        var IdGrilla = "'" + options.gid + "'";
                        var rowId = "'" + options.rowId + "'";
                        if (value == "1" || value == "True") {
                            return '<select class=' + IdGrilla + ' style="width: 50px;" onchange="javascript:fnChangeAprobado(' + IdGrilla + ',' + ValorParametro + ',' + rowId + ');" id="cboAprobado_' + NumeroTelefono + '_' + options.rowId + '"><option value="0">NO</option><option value="1" selected >SI</option></select>';
                        }
                        else {
                            return '<select class=' + IdGrilla + ' style="width: 50px;" onchange="javascript:fnChangeAprobado(' + IdGrilla + ',' + ValorParametro + ',' + rowId + ');" id="cboAprobado_' + NumeroTelefono + '_' + options.rowId + '"><option value="0">NO</option><option value="1">SI</option></select>';
                        }
                    }
                }
            },
            {
                name: 'Observacion', label: 'Observación', index: 'Observacion', width: 300, align: 'left', classes: 'Observacion', sortable: false,
                formatter: function (value, options, rData) {

                    var ValorParametro = "";
                    var NumeroTelefono = "";
                    if (value.indexOf("|") >= 0) {
                        NumeroTelefono = value.split("|")[1];
                        ValorParametro = "'" + value.split("|")[1] + "'";
                        value = value.split("|")[0];
                    }
                    else {
                        NumeroTelefono = rData.NumeroDeTelefono;
                        ValorParametro = "'" + rData.NumeroDeTelefono + "'";
                    }

                    if (Cerrado == "1") {
                        return value;
                    }
                    else {
                        var IdGrilla = "'" + options.gid + "'";
                        var rowId = "'" + options.rowId + "'";
                        return '<textarea class="clsObservacion" id="txtObservacion_' + NumeroTelefono + '" type="text" onchange="javascript:fnChangeObservacion(' + IdGrilla + ',' + ValorParametro + ',' + rowId + ');" maxlength="250" style="width: 100%;" rows="1" >' + value + '</textarea>';
                    }

                }
            },
            {
                name: 'Respuesta', label: 'Respuesta', index: 'Respuesta', width: 300, align: 'left', classes: 'Respuesta', sortable: false,
                formatter: function (value, options, rData) {
                    if (Cerrado == "1") {
                        return rData.Respuesta;
                    }
                    else {
                        return '<textarea class="clsRespuesta" readonly type="text" maxlength="250" style="width: 100%;" rows="1" >' + rData.Respuesta + '</textarea>';
                    }

                }
            },
];


function fnChangeObservacion(IdGrilla, Numero, rowId) {
    var Periodo = $("#hdfPeriodo").val();
    var Observacion = $("#txtObservacion_" + Numero).val();
    Observacion = Observacion.replace(/'/g, "");
    var vcOperador = $("#ddlOperador").val();

    //Actualizar valor interno grilla...
    $("#" + IdGrilla).jqGrid("setCell", parseInt(rowId), "Observacion", Observacion + "|" + Numero);

    $.ajax({
        type: "POST",
        url: "Validar.aspx/Guardar_Validacion_Observacion",
        data: "{'Periodo': '" + Periodo + "','Numero': '" + Numero + "','Observacion': '" + Observacion + "','Generico':'" + hdfGenerico + "','Operador':'" + vcOperador + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result != null && result.d != null) {
                $("#lblObservacionesPendientes").html(JqGrid_FormatoNumero(result.d.split('|')[1], false));
                var Validados = parseFloat(result.d.split('|')[0]);
                var ValidadosPorcentaje;
                if (TotalLineas != 0) {
                    ValidadosPorcentaje = parseInt(100 * (Validados / TotalLineas));
                }
                $("#lblPorcentajeValidados").html(ValidadosPorcentaje + " %");
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });


}
function fnChangeAprobado(IdGrilla, Numeros, rowIds) {
    var Periodo = $("#hdfPeriodo").val();
    var mrowIds = rowIds.split(',');
    var Aprobado = $("#cboAprobado_" + Numeros.split(',')[0] + "_" + mrowIds[0]).val();
    var vcOperador = $("#ddlOperador").val();
    $.ajax({
        type: "POST",
        url: "Validar.aspx/Guardar_Validacion_Aprobado",
        data: "{'Periodo': '" + Periodo + "','Numeros': '" + Numeros + "','Aprobado': '" + Aprobado + "','Generico':'" + hdfGenerico + "','Operador':'" + vcOperador + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result != null && result.d != null) {
                $("#lblObservacionesPendientes").html(JqGrid_FormatoNumero(result.d.split('|')[1], false));
                var Validados = parseFloat(result.d.split('|')[0]);
                var ValidadosPorcentaje;
                if (TotalLineas != 0) {
                    ValidadosPorcentaje = parseInt(100 * (Validados / TotalLineas));
                }
                $("#lblPorcentajeValidados").html(ValidadosPorcentaje + " %");
            }
            //Actualizar Matriz Principal..
            var Numero = '';
            for (var j = 0; j < Numeros.split(',').length; j++) {
                Numero = Numeros.split(',')[j];
                for (var i = 0; i < RegistrosDetalle.length; i++) {
                    if (RegistrosDetalle[i].NumeroDeTelefono == Numero) {
                        RegistrosDetalle[i].Aprobado = Aprobado;
                        break;
                    }
                }
            }

            //Actualizar valor interno de la grilla..
            for (var i = 0; i < mrowIds.length; i++) {
                $("#" + IdGrilla).jqGrid("setCell", parseInt(mrowIds[i]), "Aprobado", Aprobado + "|" + Numeros.split(',')[i]);
            }

            ActualizarTituloAccordion(IdGrilla);

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}


$(function () {

    hdfGenerico = $("#hdfGenerico").val();

    Cerrado = $("#hdfCerrado").val();
    if (Cerrado == "1") {
        $("#btnAprobar").hide();
    }

    hdfOperador = $("#hdfOperador").val();
    if (hdfOperador !== "") {
        $("#ddlOperador").val(hdfOperador)
    }


    setInterval(function () {
        if (VentanaModalAbierta == false) {
            var Pendientes = $("#dvChatContador").html();
            if (Pendientes == "") {
                Pendientes = "0";
            }
            ////if (parseFloat(Pendientes) > 0) {
            ////    $('#dvChat').fadeIn(700).fadeOut(300);//.fadeIn(250).fadeOut(250);
            ////}
            ////else {
            ////    $('#imgChat').fadeTo("slow", 1).animate({ "height": "48px" }).fadeTo("slow", 0.8).animate({ "height": "52px" });
            ////}
        }
        else {
            ////$('#imgChat').stop(true, true, true).fadeIn();
            ////$('#dvChat').fadeIn();
        }
    }, 1000);


    var Mes = $("#hdfPeriodo").val().substring(4, 6);
    var Anio = $("#hdfPeriodo").val().substring(0, 4);
    $("#lblTituloPrincipal").html("FACTURACIÓN - " + Mes + "/" + Anio);
    oCulturaUsuario = window.top.oCulturaUsuario;
    $("#ajCuentas").accordion("option", "active", 1);
    $(".accordion").accordion({
        collapsible: true,
        autoHeight: false,
        active: false
    });
    Inicio();
    $(window).resize(function (a, c) {
        DimPosElementos();
    });


    $("#ddlOperador").change(function () {
        $("#ddlOperador").attr("disabled", "disabled")
        $("#dvCargando").show();
        var vcOperador = $("#ddlOperador").val();

        if (vcOperador != "-1") {
            window.location.href = 'Validar.aspx?operador=' + vcOperador + '&generico=' + hdfGenerico;
            $("#dvCargando").show();
        }
        else {
            alerta("Debe seleccionar un operador");
            $("#dvCargando").hide();
            $("#dvPrincipial").hide();
        }

        //$.ajax({
        //    url: "Cierre.aspx/MostrarConciliacion_Cierre",
        //    data: "{'Generico':'" + hdfGenerico + "','Operador':'" + vcOperador + "'}",
        //    dataType: "json",
        //    //type: "post",
        //    contentType: "application/json; charset=utf-8",
        //    success: function (result) {
        //        alert(result);
        //        CargarDatosGrilla_AnalisisFyC();
        //        $("#dvCargandoPage").hide();
        //    },
        //    error: function (xhr, err, thrErr) {
        //        MostrarErrorAjax(xhr, err, thrErr);
        //    }
        //});
    });


});

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    for (var i = 0; i < Cuentas.length; i++) {
        $("#grid_Contenedor_" + Cuentas[i].replace(".", "_")).setGridWidth(Ancho - 70);
    }
}

function Inicio() {


    ValidarNumeroEnCajaTexto2("txtBuscar", ValidarSoloEntero, null, false);

    $(".btnNormal").button({});

    $(".btnExportarExcel").click(function () {
        alerta("Aquí se descargará el reporte Excel...");
    });

    $("#btnConciliarRegistros").click(function () {
        alerta("Registros conciliados");
    });
    $("#btnEnviarValidacion").click(function () {
        alerta("Se envían los archivos importados para que sean validados por el Enlace");
    });

    $("#txtBuscar").keydown(function (event) {
        if (event.keyCode == 13) {
            txtBuscar_keydown();
            event.preventDefault();
        }
    });

    $(".accordion").accordion({
        collapsible: true,
        autoHeight: false,
        autoWidth: false
    });


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

    $("#btnAprobar").click(btnAprobar_Click);

    $("#dvChat").click(dvChat_click);


    tbConciliacion = $("#tbConciliacion").tabs({
        //tabTemplate: "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close'>Remover Tab</span></li>",
        //add: function (event, ui) {
        //    var ifra = document.createElement('IFRAME');
        //    ifra.width = "100%";
        //    ifra.height = "100%";
        //    ifra.setAttribute("margin-top", "0px");
        //    ifra.setAttribute("margin-left", "0px");
        //    ifra.setAttribute("margin-bottom", "0px");
        //    ifra.setAttribute("margin-right", "0px");
        //    ifra.setAttribute("padding-top", "0px");
        //    ifra.setAttribute("padding-left", "0px");
        //    ifra.setAttribute("padding-bottom", "0px");
        //    ifra.setAttribute("padding-right", "0px");
        //    ifra.src = pagina;
        //    ifra.frameBorder = "0";
        //    ifra.className = "SinBordes";
        //    $(ui.panel).append(ifra);
        //    $(this).tabs('select', '#' + ui.panel.id);
        //    pagina = "";
        //}
    });

    if (hdfGenerico !== "1" || hdfOperador !== "") {
        CargarDatosInicial();
    }
    else {
        $("#dvCargandoPage").hide();
    }

    //Centrar columnas...
    $("th[role='columnheader']").css("text-align", "center");


    var $accordionIO = $('.accordion h3');
    //$accordionIO.next('div:gt(0)').hide();
    $accordionIO.click(function () {
        //$(this).next('div').slideToggle();
        $(this).next('div').css("height", "auto");
        //alert('dfdf');
    });
}

function CargarDisenoGrilla(grilla, _ModeloColumnas) {
    $("#" + grilla).jqGrid({
        sortable: true,
        loadonce: true,
        loadui: 'disable',
        datatype: "local",
        colModel: _ModeloColumnas,
        cellEdit: true,
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        height: "auto",
        rowNum: 20,
        rowList: [20, 50, 100, 1000, 5000],
        pager: "#pager_" + grilla, //Pager.
        viewrecords: true,
        rowNum: 9007199254740992,
        multiselect: false,
        rownumbers: true,
        //shrinkToFit: true,
        beforeSelectRow: function (rowid, e) {
            return true;
        }
    }).navGrid("#pager_" + grilla, { edit: false, add: false, search: false, del: false });

    $("#" + grilla).jqGrid("clearGridData", true).trigger("reloadGrid");

    if (Cerrado != "1") {
        var $grid = $("#" + grilla);
        $grid.closest("div.ui-jqgrid-view").find("div.ui-jqgrid-hdiv table.ui-jqgrid-htable tr.ui-jqgrid-labels > th.ui-th-column > div.ui-jqgrid-sortable")
            .each(function () {
                if ($(this).attr("id") == "jqgh_" + grilla + "_Aprobado") {
                    $('<br><select id="cboAprobado_Cabecera_' + grilla + '" style="width: 40px;"><option value="-1"></option><option value="0">NO</option><option value="1">SI</option></select>').css(
                        { float: "center", height: "17px" }).appendTo(this);
                    $('<button>').css({ float: "right", height: "17px", width: "20px" }).appendTo(this).button({
                        icons: { primary: "ui-icon-disk" },
                        text: false
                    }).click(function (e) {
                        var idPrefix = "jqgh_" + $grid[0].id + "_",
                            thId = $(e.target).closest('div.ui-jqgrid-sortable')[0].id;
                        if (thId.substr(0, idPrefix.length) === idPrefix) {
                            fnActualizarAprobadoMasivo($grid[0].id, "cboAprobado_Cabecera_" + $grid[0].id);
                            return false;
                        }
                    });
                }
            });
    }
}

function btnAprobar_Click() {
    if (parseFloat($("#lblPorcentajeValidados").html()) < 100) {
        alerta("No puede enviar la aprobación. Aún quedan pendientes.");
    }
    else {
        confirmacion("Se enviarán correos de notificación a los responsables de TI.<br>¿Desea continuar con el proceso?", function () {
            //Generar colas...
            var Periodo = $("#hdfPeriodo").val();
            var Mes = Periodo.substring(4, 6);
            var Anio = Periodo.substring(0, 4);
            var vcPeriodo = Mes + "/" + Anio;
            $("#txtObservacionCola").val("");
            $('#divObservacionValidar').dialog({
                title: "Mensaje (opcional)",
                modal: true,
                width: 610,
                buttons: {
                    "Enviar": function () {
                        var oThis = this;
                        var Observacion = $("#txtObservacionCola").val();
                        Observacion = Observacion.replace(/'/g, '');
                        $.ajax({
                            url: "Validar.aspx/EnviarColaAprobacion",
                            data: "{'Periodo':'" + vcPeriodo + "', 'Observacion':'" + Observacion + "'}",
                            dataType: "json",
                            type: "post",
                            contentType: "application/json; charset=utf-8",
                            success: function (result) {
                                alerta("Se generaron las colas de notificaciones correctamente, en unos instantes se enviarán los correos a los responsables de TI.");
                                $(oThis).dialog("close");
                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                }
            });
        });

    }
}

function Detalle_Click(IdGrilla, Valor) {
    $("#ifDetalle").attr("src", "DetalleFacturacion.aspx?valor=" + Valor + "&tipo=numero&generico=" + hdfGenerico + "&periodo=" + $("#hdfPeriodo").val());
    var Titulo = "Detalle Fact.";
    var Alto = 500;
    var Ancho = 800;
    $("#ifDetalle").width(Ancho - 20);
    $("#ifDetalle").height(Alto - 40);
    $('#dvDetalle').dialog({
        title: Titulo,
        modal: true,
        width: Ancho,
        height: Alto
    });

}
function fnActualizarAprobadoMasivo(Grilla, Combo) {
    var Valor = $("#" + Combo).val();
    if (Valor == -1)
        return;

    $("." + Grilla).val(Valor);
    var Numeros = '';
    $("." + Grilla).each(function () {
        Numeros += "," + $(this).attr("id").split("_")[1];
    });
    if (Numeros.length > 0) {
        Numeros = Numeros.substring(1, Numeros.length);
    }


    var rowIds = '';
    $("." + Grilla).each(function () {
        rowIds += "," + $(this).attr("id").split("_")[2];
    });
    if (rowIds.length > 0) {
        rowIds = rowIds.substring(1, rowIds.length);
    }

    fnChangeAprobado(Grilla, Numeros, rowIds);
}

function ActualizarTituloAccordion(Grilla, _Pendientes) {
    var Cuenta = Grilla.replace("grid_Contenedor_", "");
    Cuenta = Cuenta.replace("_", ".");
    var Indice = $("#Contenedor_" + Cuenta.replace(".", "_")).attr("indicetab");
    if (typeof _Pendientes == 'undefined') {
        //Calcular pendientes...
        _Pendientes = 0;
        var IngresoCuenta = false;
        for (var j = 0; j < RegistrosDetalle.length; j++) {
            if (RegistrosDetalle[j].CuentaPadre == Cuenta) {
                IngresoCuenta = true;
                if (RegistrosDetalle[j].Aprobado == "0" || RegistrosDetalle[j].Aprobado == "False" || RegistrosDetalle[j].Aprobado == "") {
                    _Pendientes++;
                }
            }
            else {
                if (IngresoCuenta == true) {
                    break;
                }
            }
        }
    }
    if (_Pendientes > 0) {
        $($($("#ajCuentas > h3")[Indice]).find("a")[0]).html("Cuenta: " + Cuenta + ' - Pendientes: (' + _Pendientes + ')');
        $($($("#ajCuentas > h3")[Indice]).find("a")[0]).css("color", "#E47009");
    }
    else {
        $($($("#ajCuentas > h3")[Indice]).find("a")[0]).html("Cuenta: " + Cuenta);
        $($($("#ajCuentas > h3")[Indice]).find("a")[0]).css("color", "#1D5987");
    }
}

function txtBuscar_keydown() {
    var Numero = $("#txtBuscar").val();
    Numero = Numero.replace(/'/g, "");
    Numero = Numero.replace(/ /g, "");
    var vcOperador = $("#ddlOperador").val();

    if (Numero == "") {
        $("h3[role='tab']").show();
        $("div[role='tabpanel']").hide();
        $("#txtBuscar").val("");
        $("#txtBuscar").focus();
        MostrarDatosGrillas();
        //alerta("Ingrese un número", "Mensaje", function () {
        //})
        return;
    }

    $.ajax({
        url: "Validar.aspx/ObtenerValidacionConciliacion_Busqueda",
        data: "{'Numero':'" + Numero + "','Generico':'" + hdfGenerico + "','Operador':'" + vcOperador + "'}",
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result.d.length == 0) {
                alerta("El número ingresado no existe en la lista inferior", "Mensaje", function () {
                    $("h3[role='tab']").show();
                    $("div[role='tabpanel']").hide();
                    MostrarDatosGrillas();
                    $("#txtBuscar").focus();
                });
            }
            else {
                var Cuenta = result.d[0].CuentaPadre;
                $("h3[role='tab']").hide();
                $("div[role='tabpanel']").hide();

                $("#Contenedor_" + Cuenta.replace(".","_")).show();
                $("#Contenedor_" + Cuenta.replace(".", "_")).prev().show();

                //Filtrar en grilla...
                $("#grid_Contenedor_" + Cuenta.replace(".", "_")).jqGrid("clearGridData", true).trigger("reloadGrid");
                IngresoCuenta = false;
                RegistrosDetalleNumero = [];
                Pendientes = 0;
                for (var j = 0; j < RegistrosDetalle.length; j++) {
                    if (RegistrosDetalle[j].CuentaPadre == Cuenta) {
                        IngresoCuenta = true;
                        if (RegistrosDetalle[j].NumeroDeTelefono == Numero) {
                            RegistrosDetalleNumero.push(RegistrosDetalle[j]);
                            break;
                        }
                    }
                    else {
                        if (IngresoCuenta == true) {
                            break;
                        }
                    }
                }
                var grid = $("#grid_Contenedor_" + Cuenta.replace(".", "_")).jqGrid();
                grid.addRowData("Correlativo", RegistrosDetalleNumero, "first");

            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function MostrarDatosGrillas() {
    for (var i = 0; i < Cuentas.length; i++) {
        $("#grid_Contenedor_" + Cuentas[i].replace(".", "_")).jqGrid("clearGridData", true).trigger("reloadGrid");
        IngresoCuenta = false;
        RegistrosDetalleNumero = [];
        for (var j = 0; j < RegistrosDetalle.length; j++) {
            if (RegistrosDetalle[j].CuentaPadre == Cuentas[i]) {
                IngresoCuenta = true;
                RegistrosDetalleNumero.push(RegistrosDetalle[j]);
            }
            else {
                if (IngresoCuenta == true) {
                    break;
                }
            }
        }
        var grid = $("#grid_Contenedor_" + Cuentas[i].replace(".", "_")).jqGrid();
        grid.addRowData("Correlativo", RegistrosDetalleNumero, "first");
    }

}

function dvChat_click() {

    $('.accordion').accordion('activate', false);

    var Enlace = $("#hdfCodEnlace").val();
    var Periodo = $("#hdfPeriodo").val();
    var vcOperador = $("#hdfOperador").val();
    var Mes = Periodo.substring(4, 6);
    var Anio = Periodo.substring(0, 4);
    $("#dvChatContador").hide();
    $("#dvChatContador").html("");

    var Pagina = "";
    Pagina = $('#ifNota').attr("src");
    if (Pagina != "ValidarNota.aspx?Periodo=" + Periodo + "&Enlace=" + Enlace + "&EsEnlace=1" + "&Operador=" + vcOperador) {
        $('#ifNota').attr("src", "ValidarNota.aspx?Periodo=" + Periodo + "&Enlace=" + Enlace + "&EsEnlace=1" + "&Operador=" + vcOperador);
    }

    window.top.VentanaNotaSignalRActiva = true;
    VentanaModalAbierta = true;
    var formulario = $('#dvNota').dialog({
        title: "Notas - Facturación " + Mes + "/" + Anio,
        height: 570,
        width: 703,
        resizable: false,
        modal: true,
        close: function (event, ui) {
            VentanaModalAbierta = false;
            window.top.VentanaNotaSignalRActiva = false;
        }
    });
}