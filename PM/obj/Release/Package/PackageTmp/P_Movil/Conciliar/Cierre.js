var oCulturaUsuario;
var tbConciliacion;
var Cerrado;
var VentanaModalAbierta = false;
var Periodo = '';
var ModeloColumnas = [
            { name: 'Correlativo', hidden: true, key: true },
            {
                name: 'Empleado', label: 'Empleado', index: 'Empleado', width: 100, sortable: true, hidden: false,
                formatter: function (value, options, rData) {
                    var Aprobado = "";
                    var Dato = "";
                    if (value.indexOf("|") >= 0) {
                        Aprobado = value.split("|")[0];
                        Dato = value.split("|")[1];
                    }
                    else {
                        Dato = rData.Empleado;
                        Aprobado = rData.Aprobado;
                    }
                    if (Aprobado == '1' || Aprobado == 'True') {
                        return Dato;
                    }
                    else {
                        return '<span class="cellConciliado">' + Dato + '</span>';
                    }
                }
            },
            {
                name: 'NumeroDeTelefono', label: 'Número', index: 'NumeroDeTelefono', width: 60, sortable: true, align: "right",
                formatter: function (value, options, rData) {
                    var Aprobado = "";
                    var Dato = "";
                    if (value.indexOf("|") >= 0) {
                        Aprobado = value.split("|")[0];
                        Dato = value.split("|")[1];
                    }
                    else {
                        Dato = rData.NumeroDeTelefono;
                        Aprobado = rData.Aprobado;
                    }

                    if (Aprobado == '1' || Aprobado == 'True') {
                        return Dato;
                    }
                    else {
                        return '<span class="cellConciliado">' + Dato + '</span>';
                    }
                }
            },
            {
                name: 'PlanNombre', label: 'Plan', index: 'PlanNombre', width: 100, sortable: true, align: "left",
                formatter: function (value, options, rData) {
                    var Aprobado = "";
                    var Dato = "";
                    if (value.indexOf("|") >= 0) {
                        Aprobado = value.split("|")[0];
                        Dato = value.split("|")[1];
                    }
                    else {
                        Dato = rData.PlanNombre;
                        Aprobado = rData.Aprobado;
                    }

                    if (Aprobado == '1' || Aprobado == 'True') {
                        return Dato;
                    }
                    else {
                        return '<span class="cellConciliado">' + Dato + '</span>';
                    }
                }
            },
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
                name: 'Aprobado', label: 'Aprobado', index: 'Aprobado', width: 80, align: "center", sortable: false,
                formatter: function (value, options, rData) {

                    var ValorParametro = "";
                    var NumeroTelefono = "";
                    if (value.indexOf("|") >= 0) {
                        NumeroTelefono = value.split("|")[1];
                        ValorParametro = "'" + value.split("|")[1] + "'";
                        value = (value.split("|")[0] == "1" ? "True" : "False");
                        rData.Aprobado = value;
                    }
                    else {
                        NumeroTelefono = rData.NumeroDeTelefono;
                        ValorParametro = "'" + rData.NumeroDeTelefono + "'";
                    }

                    if (Cerrado == "1" || Periodo == "") {
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
                            return '<select class=' + IdGrilla + ' style="width: 50px;" onchange="javascript:fnChangeAprobado(' + IdGrilla + ',' + ValorParametro + ',' + rowId + ');" id="cboAprobado_' + NumeroTelefono.replace(/\./g, '-') + '_' + options.rowId + '"><option value="0">NO</option><option value="1" selected >SI</option></select>';
                        }
                        else {
                            return '<select class=' + IdGrilla + ' style="width: 50px;" onchange="javascript:fnChangeAprobado(' + IdGrilla + ',' + ValorParametro + ',' + rowId + ');" id="cboAprobado_' + NumeroTelefono.replace(/\./g, '-') + '_' + options.rowId + '"><option value="0">NO</option><option value="1">SI</option></select>';
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
                        return '<textarea class="clsObservacion" readonly type="text"  maxlength="250" style="width: 100%;" rows="1" >' + value + '</textarea>';
                    }
                }
            },
            {
                name: 'Respuesta', label: 'Respuesta', index: 'Respuesta', width: 300, align: 'left', classes: 'Respuesta', sortable: false,
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

                    if (Cerrado == "1" || Periodo == "") {
                        return rData.Respuesta;
                    }
                    else {
                        var IdGrilla = "'" + options.gid + "'";
                        var rowId = "'" + options.rowId + "'";
                        return '<textarea class="clsRespuesta" type="text" id="txtRespuesta_' + NumeroTelefono + '" maxlength="250" style="width: 100%;" rows="1" onchange="javascript:fnChangeObservacion(' + IdGrilla + ',' + ValorParametro + ',' + rowId + ');" >' + value + '</textarea>';
                    }
                }
            },
];





function fnChangeAprobado(IdGrilla, Numero) {
    var Valor = $("#cboAprobado_" + Numero.replace(/\./g, '-')).val();
    var colModels;
    var i;
    var lista = $("#" + IdGrilla).getDataIDs();
    var aData;
    for (i = 0; i < lista.length; i++) {
        aData = $("#" + IdGrilla).getRowData(lista[i]);
        if (aData.Numero == Numero) {
            colModels = $("#" + IdGrilla).getGridParam("colModel");
            if (Valor != '1') {
                for (j = 0; j < colModels.length; j++) {
                    $("#" + IdGrilla).jqGrid('setCell', i + 1, j, '', { color: 'red', padding: '1px', "background-color": 'yellow' });
                }
            }
            else {
                for (j = 0; j < colModels.length; j++) {
                    $("#" + IdGrilla).jqGrid('setCell', i + 1, j, '', { color: 'black', padding: '1px', "background-color": 'white' });
                }
            }
            break;
        }
    }

}

$(function () {

    hdfGenerico = $("#hdfGenerico").val();
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

    Cerrado = $("#hdfCerrado").val();
    Periodo = $("#hdfPeriodo").val();
    if (Periodo == "") {
        $("#btnCerrar").hide();
        $("#lblTituloPrincipal").html("FACTURACIÓN");
        $("#dvChat").hide();
    }
    else {
        var Mes = $("#hdfPeriodo").val().substring(4, 6);
        var Anio = $("#hdfPeriodo").val().substring(0, 4);
        $("#lblTituloPrincipal").html("FACTURACIÓN - " + Mes + "/" + Anio);
    }

    oCulturaUsuario = window.top.oCulturaUsuario;

    $("#ajCuentas").accordion("option", "active", 1);
    $(".accordion").accordion({
        collapsible: true,
        autoHeight: false,
        active: false
    });

    $("#dvChat").click(dvChat_click);

    Inicio();

    $(window).resize(function (a, c) {
        DimPosElementos();
    });
    DimPosElementos();

    $("#ddlOperador").change(function () {
        $("#ddlOperador").attr("disabled", "disabled")
        $("#dvCargando").show();
        var vcOperador = $("#ddlOperador").val();

        if (vcOperador != "-1") {
            window.location.href = 'Cierre.aspx?operador=' + vcOperador + '&generico=' + hdfGenerico;
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
    for (var i = 0; i < RegistrosCodInt.length; i++) {
        $("#grid_Contenedor_" + RegistrosCodInt[i].CodInt).setGridWidth(Ancho - 70);
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

    $("#txtPeriodo").keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
        }
    });

    $(".accordion").accordion({
        collapsible: true,
        autoHeight: false,
        autoWidth: false
    });

    $("#txtBuscar").keydown(function (event) {
        if (event.keyCode == 13) {
            txtBuscar_keydown();
            event.preventDefault();
        }
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

    $("#btnCerrar").click(btnCerrar_Click);

    $("#btnAbrir").click(btnAbrir_Click);

    tbConciliacion = $("#tbConciliacion").tabs({});

    if (hdfGenerico !== "1" || hdfOperador !== "") {
        CargarDatosGrilla();
    }
    
    //Centrar columnas...
    $("th[role='columnheader']").css("text-align", "center");
}

function CargarDisenoGrilla(grilla, _ModeloColumnas, CantidadRegistros) {
    var Alto = "auto";
    //if (CantidadRegistros > 20) {
    //    Alto = "400";
    //}
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
        height: Alto,
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

    if (Cerrado != "1" && Periodo != "") {
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

function btnCerrar_Click() {
    var vcOperador = $("#ddlOperador").val();
    if (parseFloat($("#lblPorcentajeValidados").html()) < 100) {
        alerta("No puede se puede cerrar. Aún quedan pendientes.");
    }
    else {
        confirmacion("Se cerrará el proceso y no podrá ser editado.<br>¿Desea continuar con el proceso?", function () {
            var Periodo = $("#hdfPeriodo").val();
            $.ajax({
                url: "Cierre.aspx/EnviarCierre",
                data: "{'Periodo':'" + Periodo + "','Cuentas':'" + TotalCuentas + "','Lineas':'" + TotalLineas + "','Total':'" + TotalMonto + "','Operador':'" + vcOperador + "'}",
                dataType: "json",
                type: "post",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    window.location.href = 'Cierre.aspx?inCod=5610&inTip=3&inTipOri=0&generico=' + hdfGenerico + '&operador=' + vcOperador;
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        });
    }
}
function btnAbrir_Click() {
    //if (parseFloat($("#lblPorcentajeValidados").html()) < 100) {
    //    alerta("No puede se puede cerrar. Aún quedan pendientes.");
    //}
    //else {
    confirmacion("Se abrirá el proceso.<br>¿Desea continuar con el proceso?", function () {
        var Periodo = $("#hdfPeriodo").val();
        var vcOperador = $("#ddlOperador").val();
        $.ajax({
            url: "Cierre.aspx/EnviarApertura",
            data: "{'Periodo':'" + Periodo + "','Cuentas':'" + TotalCuentas + "','Lineas':'" + TotalLineas + "','Total':'" + TotalMonto + "','Operador':'" + vcOperador + "'}",
            dataType: "json",
            type: "post",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                window.location.href = 'Cierre.aspx?inCod=5610&inTip=3&inTipOri=0&generico=' + hdfGenerico + '&operador=' + vcOperador;
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });
    //}
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

function fnChangeObservacion(IdGrilla, Numero, rowId) {
    //console.log("OBSERVACION: " + Numero);
    var Periodo = $("#hdfPeriodo").val();
    var Observacion = $("#txtRespuesta_" + Numero).val();
    Observacion = Observacion.replace(/'/g, "");
    var vcOperador = $("#ddlOperador").val();

    //Actualizar valor interno grilla...
    $("#" + IdGrilla).jqGrid("setCell", parseInt(rowId), "Respuesta", Observacion + "|" + Numero);


    $.ajax({
        type: "POST",
        url: "Cierre.aspx/Guardar_Cierre_Observacion",
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
    var Aprobado = $("#cboAprobado_" + Numeros.replace(/\./g, '-').split(',')[0] + "_" + mrowIds[0]).val();
    var vcOperador = $("#ddlOperador").val();

    $.ajax({
        type: "POST",
        url: "Cierre.aspx/Guardar_Validacion_Aprobado",
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
            var colModels = $("#" + IdGrilla).getGridParam("colModel");
            var mNumeros = Numeros.split(',');
            for (var x = 0; x < mNumeros.length; x++) {
                Numero = mNumeros[x];
                for (var i = 0; i < RegistrosDetalle.length; i++) {
                    if (RegistrosDetalle[i].NumeroDeTelefono == Numero) {
                        RegistrosDetalle[i].Aprobado = Aprobado;
                        break;
                    }
                }
                ////if (Aprobado != '1') {
                ////    for (j = 0; j < 5; j++) {
                ////        $("#" + IdGrilla).jqGrid('setCell', parseInt(mrowIds[x]), j, '', { "background-color": 'yellow' });
                ////    }
                ////}
                ////else {
                ////    for (j = 0; j < 5; j++) {
                ////        $("#" + IdGrilla).jqGrid('setCell', parseInt(mrowIds[x]), j, '', { "background-color": 'white' });
                ////    }
                ////}
            }

            //Actualizar valor interno de la grilla..
            var rowData, Dato;
            for (var i = 0; i < mrowIds.length; i++) {
                rowData = $("#" + IdGrilla).getRowData(parseInt(mrowIds[i]));
                Dato = "";
                Dato = rowData.Empleado.replace('<span class="cellConciliado">', '').replace('</span>', '');
                $("#" + IdGrilla).jqGrid("setCell", parseInt(mrowIds[i]), "Empleado", Aprobado + "|" + Dato);
                Dato = rowData.PlanNombre.replace('<span class="cellConciliado">', '').replace('</span>', '');
                $("#" + IdGrilla).jqGrid("setCell", parseInt(mrowIds[i]), "PlanNombre", Aprobado + "|" + Dato);
                Dato = rowData.NumeroDeTelefono.replace('<span class="cellConciliado">', '').replace('</span>', '');
                $("#" + IdGrilla).jqGrid("setCell", parseInt(mrowIds[i]), "NumeroDeTelefono", Aprobado + "|" + Dato);

                $("#" + IdGrilla).jqGrid("setCell", parseInt(mrowIds[i]), "Aprobado", Aprobado + "|" + mNumeros[i]);
            }

            ActualizarTituloAccordion(IdGrilla);

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function txtBuscar_keydown() {
    var Numero = $("#txtBuscar").val();
    Numero = Numero.replace(/'/g, "");
    Numero = Numero.replace(/ /g, "");
    var vcOperador = $("#ddlOperador").val();

    $("#Capa").show();
    $("#dvCargando").show();

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
        url: "Cierre.aspx/ObtenerValidacionConciliacion_Busqueda",
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
                var CodInt = result.d[0].CodInt;
                $("h3[role='tab']").hide();
                $("div[role='tabpanel']").hide();

                $("#Contenedor_" + CodInt).show();
                $("#Contenedor_" + CodInt).prev().show();

                //Filtrar en grilla...
                $("#grid_Contenedor_" + CodInt).jqGrid("clearGridData", true).trigger("reloadGrid");
                var Ingreso = false;
                RegistrosDetalleNumero = [];
                Pendientes = 0;
                for (var j = 0; j < RegistrosDetalle.length; j++) {
                    if (RegistrosDetalle[j].CodInt == CodInt) {
                        Ingreso = true;
                        if (RegistrosDetalle[j].NumeroDeTelefono == Numero) {
                            RegistrosDetalleNumero.push(RegistrosDetalle[j]);
                            break;
                        }
                    }
                    else {
                        if (Ingreso == true) {
                            break;
                        }
                    }
                }
                var grid = $("#grid_Contenedor_" + CodInt).jqGrid();
                grid.addRowData("Correlativo", RegistrosDetalleNumero, "first");
                $("#grid_Contenedor_" + CodInt).setGridHeight("alto");

                $("#Capa").hide();
                $("#dvCargando").hide();

            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function MostrarDatosGrillas() {
    $("#dvPrincipal").hide();
    var Ingreso;
    for (var i = 0; i < RegistrosCodInt.length; i++) {
        $("#grid_Contenedor_" + RegistrosCodInt[i].CodInt).jqGrid("clearGridData", true).trigger("reloadGrid");
        Ingreso = false;
        RegistrosDetalleNumero = [];
        for (var j = 0; j < RegistrosDetalle.length; j++) {
            if (RegistrosDetalle[j].CodInt == RegistrosCodInt[i].CodInt) {
                Ingreso = true;
                RegistrosDetalleNumero.push(RegistrosDetalle[j]);
            }
            else {
                if (Ingreso == true) {
                    break;
                }
            }
        }
        var grid = $("#grid_Contenedor_" + RegistrosCodInt[i].CodInt).jqGrid();
        grid.addRowData("Correlativo", RegistrosDetalleNumero, "first");
    }
    $("#dvPrincipal").show();
    $("#Capa").hide();
    $("#dvCargando").hide();
}

function dvChat_click() {


    //$('.accordion').trigger('collapse');
    $('.accordion').accordion('activate', false);

    var Periodo = $("#hdfPeriodo").val();
    var Mes = Periodo.substring(4, 6);
    var Anio = Periodo.substring(0, 4);
    var vcOperador = $("#ddlOperador").val();
    //$("#dvChatContador").hide();
    $('#ifNota').attr("src", "CierreNota.aspx?Periodo=" + Periodo + "&Operador=" + vcOperador);
    $('#ifNota').width(1020);
    VentanaModalAbierta = true;
    window.top.VentanaNotaSignalRActiva = true;
    var formulario = $('#dvNota').dialog({
        title: "Notas - Facturación " + Mes + "/" + Anio,
        height: 570,
        width: 1040,
        resizable: false,
        modal: true,
        close: function (event, ui) {
            VentanaModalAbierta = false;
            window.top.VentanaNotaSignalRActiva = false;
            $('#ifNota').attr("src", "");
        }
    });
}
