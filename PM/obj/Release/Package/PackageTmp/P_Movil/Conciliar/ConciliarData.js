var RegistrosFyC = [];
var RegistrosFyCCortes = [];
var RegistrosInventarioAdendum = [];
var RegistrosInventarioFyC = [];
var RegistrosSolicitudFyC = [];
var RegistrosConciliadosFyC = [];
var RegistrosConciliadosFyCCortes = [];
var RegistroCierre = [];

function CargarDatosGrilla_AnalisisFyC() {
    var vcPeriodo = $("#txtPeriodo").val().replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g, "");
    var mPer = vcPeriodo.substr(0, 2);
    var yPer = vcPeriodo.substr(3, 4);
    var PeriodoANSI = yPer + mPer + "01";
    var vcOperador = $("#ddlOperador").val();

    $.ajax({
        url: "Conciliar.aspx/ObtenerAnalisisConciliacion",
        data: "{'Periodo':'" + PeriodoANSI + "','Generico':'" + hdfGenerico + "','Operador':'" + vcOperador + "'}",
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {

            if (hdfGenerico == "1") {
                if (result.d.length > 1) {
                    RegistrosInventarioFyC = result.d[0];
                    RegistrosSolicitudFyC = result.d[1];
                    RegistroCierre = result.d[2];
                    $("#MsjTooltip").show();
                }
                else {
                    $("#lblMensajeCierre").html("No existe información de facturación en el periodo seleccionado.");
                    $("#MsjTooltip").hide();
                    return;
                }
            }
            else {
                RegistrosFyC = result.d[0];
                RegistrosConciliadosFyC = result.d[1];
                RegistrosFyCCortes = result.d[2];
                RegistrosConciliadosFyCCortes = result.d[3];
                RegistrosInventarioAdendum = result.d[4];
                RegistrosInventarioFyC = result.d[5];
                RegistrosSolicitudFyC = result.d[6];
                RegistroCierre = result.d[7];
            }


            $("#txtFiltroNumero_FyC").val("");

            if (RegistrosFyC.length == 0) {
                $("#lblMensaje_AnalisisFyC").html("<p>Se analizó el archivo de Facturación (Reporte Fact.), se compararon los montos indicados en cada hoja del archivo excel y no presentan diferencias.</p><br>");
                $("#lblMensaje_AnalisisFyC").show();
                $("#table_AnalisisFyC").hide();
                $('#tbConciliacion ul:first li:eq(0) a').text("Análisis Fact. (OK)");
            }
            else {
                $("#table_AnalisisFyC").show();
                $("#lblMensaje_AnalisisFyC").hide();
                $("#lblMensaje_AnalisisFyC").html("");
                CargarDatosGrilla_AnalisisFyC_Filtro();
            }

            if (RegistrosFyCCortes.length == 0) {
                $("#lblMensaje_AnalisisFyCCortes").html("<p>Se analizó el archivo de Facturación (Reporte Fact.) VS el archivo de Cortes, se compararon los montos por cuentas y no presentan diferencias.</p><br>");
                $("#lblMensaje_AnalisisFyCCortes").show();
                $("#table_AnalisisFyCCortes").hide();
                $('#tbConciliacion ul:first li:eq(1) a').text("Fact. vs Cortes (OK)");
            }
            else {
                $("#table_AnalisisFyCCortes").show();
                $("#lblMensaje_AnalisisFyCCortes").hide();
                $("#lblMensaje_AnalisisFyCCortes").html("");
                CargarDatosGrilla_AnalisisFyCCortes_Filtro();
            }

            if (RegistrosInventarioAdendum.length == 0) {
                $("#lblMensaje_AnalisisInventarioAdendum").html("<p>Se analizó el archivo Adendum VS el inventario existente en el sistema Gestión Móvil, se compararon Cuentas, Planes, Equipos y no presentan diferencias.</p><br>");
                $("#lblMensaje_AnalisisInventarioAdendum").show();
                $("#table_AnalisisInventarioAdendum").hide();
                $('#tbConciliacion ul:first li:eq(2) a').text("Inventario vs Adendum (OK)");
            }
            else {
                $("#table_AnalisisInventarioAdendum").show();
                $("#lblMensaje_AnalisisInventarioAdendum").hide();
                $("#lblMensaje_AnalisisInventarioAdendum").html("");
                CargarDatosGrilla_AnalisisInventarioAdendum_Filtro();
            }

            if (RegistrosInventarioFyC.length == 0) {
                $("#lblMensaje_AnalisisInventarioFyC").html("<p>Se analizó el archivo de facturación (Fact.) VS el inventario del sistema Gestión Móvil, se compararon los montos por cada número telefónico y no presentan diferencias.</p><br>");
                $("#lblMensaje_AnalisisInventarioFyC").show();
                $("#table_AnalisisInventarioFyC").hide();
                $('#tbConciliacion ul:first li:eq(3) a').text("Inventario vs Fact. (OK)");
            }
            else {
                $("#table_AnalisisInventarioFyC").show();
                $("#lblMensaje_AnalisisInventarioFyC").hide();
                $("#lblMensaje_AnalisisInventarioFyC").html("");
                CargarDatosGrilla_AnalisisInventarioFyC_Filtro();
            }

            if (RegistrosSolicitudFyC.length == 0) {
                $("#lblMensaje_AnalisisSolicitudFyC").html("<p>Se analizó el archivo de facturación (Fact.) VS las solicitudes generadas en el periodo actual, se compararon los montos por cada número telefónico según las solicitudes y no presentan diferencias.</p><br>");
                $("#lblMensaje_AnalisisSolicitudFyC").show();
                $("#table_AnalisisSolicitudFyC").hide();
                $('#tbConciliacion ul:first li:eq(4) a').text("Solicitudes vs Fact. (OK)");
            }
            else {
                $("#table_AnalisisSolicitudFyC").show();
                $("#lblMensaje_AnalisisSolicitudFyC").html("");
                $("#lblMensaje_AnalisisSolicitudFyC").hide();
                CargarDatosGrilla_AnalisisSolicitudFyC_Filtro();
            }

            $("#btnEnviarValidacion").show();
            $("#trFilaConciliacion").show();
            $("#lblMensajeCierre").html("");

            if (RegistroCierre.length > 0) {
                if (RegistroCierre[0].Tipo == "CLOSE") {
                    $("#lblMensajeCierre").html("(Proceso de Facturación Cerrado para el periodo seleccionado)");
                    $("#btnEnviarValidacion").hide();
                    $("#btnConciliarFyC").hide();
                    $("#btnConciliarFyCCorte").hide();
                    $("#btnConciliarInventarioAdendum").hide();
                    $("#btnConciliarInventarioFyC").hide();
                    $("#btnConciliarSolicitudFyC").hide();
                    $("#btnDesconciliarFyC").hide();
                    $("#btnDesconciliarFyCCorte").hide();
                    $("#btnDesconciliarInventarioAdendum").hide();
                    $("#btnDesconciliarInventarioFyC").hide();
                    $("#btnDesconciliarSolicitudFyC").hide();
                }
            }

            $(".ui-pg-selbox").change();

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function CargarDatosGrilla_AnalisisFyC_Filtro() {
    $("#grid_AnalisisFyC").jqGrid("clearGridData", true);
    var NumeroFiltro = $.trim($("#txtFiltroNumero_FyC").val());
    var ConciliadoFiltro = $("#cboFiltroConciliado_FyC").val();
    var Columnas = "";
    for (var i = 0; i < RegistrosFyC.length; i++) {
        if (NumeroFiltro != "") {
            if (RegistrosFyC[i]["NumeroDeTelefono"].indexOf(NumeroFiltro) < 0) {
                continue;
            }
        }
        //Validar conciliado...
        RegistrosFyC[i]['NombreGrilla'] = 'grid_AnalisisFyC';
        RegistrosFyC[i]['Conciliado'] = 'NO';
        for (var x = 0; x < RegistrosConciliadosFyC.length; x++) {
            if (RegistrosConciliadosFyC[x].NumeroDeTelefono == RegistrosFyC[i].NumeroDeTelefono) {
                RegistrosFyC[i]['Conciliado'] = 'SI';
                break;
            }
        }
        if (ConciliadoFiltro == "1") {
            if (RegistrosFyC[i]['Conciliado'] == 'NO') {
                continue;
            }
        }
        if (ConciliadoFiltro == "2") {
            if (RegistrosFyC[i]['Conciliado'] == 'SI') {
                continue;
            }
        }
        for (var j = 0; j < Columnas_AnalisisFyC.length; j++) {
            if (RegistrosFyC[i][Columnas_AnalisisFyC[j]] != RegistrosFyC[i][Columnas_AnalisisFyC[j] + "_D"]) {
                if (Columnas.indexOf(Columnas_AnalisisFyC[j]) < 0) {
                    Columnas += Columnas_AnalisisFyC[j] + ",";
                }
            }
        }
        $("#grid_AnalisisFyC").jqGrid('addRowData', i + 1, RegistrosFyC[i]);
    }
    //Validar Columnas...
    for (var j = 0; j < Columnas_AnalisisFyC.length; j++) {
        if (Columnas.indexOf(Columnas_AnalisisFyC[j]) >= 0) {
            $("#grid_AnalisisFyC").jqGrid('showCol', Columnas_AnalisisFyC[j]);
            $("#grid_AnalisisFyC").jqGrid('showCol', Columnas_AnalisisFyC[j] + '_D');
        }
        else {
            $("#grid_AnalisisFyC").jqGrid('hideCol', Columnas_AnalisisFyC[j]);
            $("#grid_AnalisisFyC").jqGrid('hideCol', Columnas_AnalisisFyC[j] + '_D');
        }
    }


    var Pendientes = 0;
    Pendientes = RegistrosFyC.length - RegistrosConciliadosFyC.length;
    if (Pendientes == 0) {
        $('#tbConciliacion ul:first li:eq(0) a').text("Análisis Fact. (OK)");
    }
    else {
        $('#tbConciliacion ul:first li:eq(0) a').text("Análisis Fact. (" + Pendientes + ")");
    }
}
function btnConciliarFyC_click(Tipo) {
    var IdSeleccionados = $('#grid_AnalisisFyC').jqGrid('getGridParam', 'selarrrow');
    if (IdSeleccionados.length == 0) {
        alerta("Debe seleccionar un registro como mínimo");
        return;
    }
    var datos;
    var Numeros = "";
    for (var i = 0; i < IdSeleccionados.length; i++) {
        datos = $("#grid_AnalisisFyC").jqGrid('getRowData', IdSeleccionados[i]);
        Numeros += "," + datos.NumeroDeTelefono;
    }
    if (Numeros.length > 0) {
        Numeros = Numeros.substring(1, Numeros.length);
    }
    var vcPeriodo = $("#txtPeriodo").val().replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g, "");
    var mPer = vcPeriodo.substr(0, 2);
    var yPer = vcPeriodo.substr(3, 4);
    var PeriodoANSI = yPer + mPer + "01";

    $.ajax({
        url: "Conciliar.aspx/Guardar_AnalisisConciliacion_FyC",
        data: "{'Numeros':'" + Numeros + "','Periodo':'" + PeriodoANSI + "', 'Tipo':'" + Tipo + "'}",
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            CargarDatosGrilla_AnalisisFyC();
            $("#cb_grid_AnalisisFyC").prop('checked', false);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}


function CargarDatosGrilla_AnalisisFyCCortes_Filtro() {
    $("#grid_AnalisisFyCVSCorte").jqGrid("clearGridData", true);

    var CuentaFiltro = $.trim($("#txtFiltroNumero_FyCCorte").val());
    var ConciliadoFiltro = $("#cboFiltroConciliado_FyCCorte").val();

    var Contador_MontosDiferentes = 0;
    var Contador_CuentasFyC = 0;
    var Contador_CuentasCortes = 0;

    for (var i = 0; i < RegistrosFyCCortes.length; i++) {
        //Validar conciliado...
        RegistrosFyCCortes[i]['NombreGrilla'] = 'grid_AnalisisFyCVSCorte';
        RegistrosFyCCortes[i]['Conciliado'] = 'NO';
        for (var x = 0; x < RegistrosConciliadosFyCCortes.length; x++) {
            if (RegistrosConciliadosFyCCortes[x].Cuenta_FyC == RegistrosFyCCortes[i].Cuenta_1 &&
                RegistrosConciliadosFyCCortes[x].Cuenta_Corte == RegistrosFyCCortes[i].Cuenta_2) {
                RegistrosFyCCortes[i]['Conciliado'] = 'SI';
                break;
            }
        }
        if (RegistrosFyCCortes[i]['Conciliado'] == 'NO') {
            if (RegistrosFyCCortes[i]['Cuenta_1'] == "") {
                Contador_CuentasFyC++;
            }
            else if (RegistrosFyCCortes[i]['Cuenta_2'] == "") {
                Contador_CuentasCortes++;
            }
            else {
                Contador_MontosDiferentes++;
            }
        }
        if (CuentaFiltro != "") {
            if (RegistrosFyCCortes[i]["Cuenta_1"].indexOf(CuentaFiltro) < 0 &&
                RegistrosFyCCortes[i]["Cuenta_2"].indexOf(CuentaFiltro) < 0) {
                continue;
            }
        }

        if (ConciliadoFiltro == "1") {
            if (RegistrosFyCCortes[i]['Conciliado'] == 'NO') {
                continue;
            }
        }
        if (ConciliadoFiltro == "2") {
            if (RegistrosFyCCortes[i]['Conciliado'] == 'SI') {
                continue;
            }
        }
        $("#grid_AnalisisFyCVSCorte").jqGrid('addRowData', i + 1, RegistrosFyCCortes[i]);
    }

    $("#lbl_Contador_MontosDiferentes").html("Cuentas con montos diferentes (" + Contador_MontosDiferentes + ")");
    $("#lbl_Contador_CuentasFyC").html("Cuentas que no existen en Fact. (" + Contador_CuentasFyC + ")");
    $("#lbl_Contador_CuentasCortes").html("Cuentas que no existen en Cortes (" + Contador_CuentasCortes + ")");
    if (RegistrosFyCCortes.length > 0) {
        $("#pgr_Contador_MontosDiferentes").width(100 * (Contador_MontosDiferentes / RegistrosFyCCortes.length));
        $("#pgr_Contador_CuentasFyC").width(100 * (Contador_CuentasFyC / RegistrosFyCCortes.length));
        $("#pgr_Contador_CuentasCortes").width(100 * (Contador_CuentasCortes / RegistrosFyCCortes.length));
    }
    var Pendientes = 0;
    Pendientes = RegistrosFyCCortes.length - RegistrosConciliadosFyCCortes.length;
    if (Pendientes == 0) {
        $('#tbConciliacion ul:first li:eq(1) a').text("Fact. vs Cortes (OK)");
    }
    else {
        $('#tbConciliacion ul:first li:eq(1) a').text("Fact. vs Cortes (" + Pendientes + ")");
    }
}
function btnConciliarFyCCorte_click(Tipo) {
    var IdSeleccionados = $('#grid_AnalisisFyCVSCorte').jqGrid('getGridParam', 'selarrrow');
    if (IdSeleccionados.length == 0) {
        alerta("Debe seleccionar un registro como mínimo");
        return;
    }
    var datos;
    var Cuentas = "";
    for (var i = 0; i < IdSeleccionados.length; i++) {
        datos = $("#grid_AnalisisFyCVSCorte").jqGrid('getRowData', IdSeleccionados[i]);
        Cuentas += "," + (datos.Cuenta_1 != "" ? datos.Cuenta_1 : datos.Cuenta_2);
    }
    if (Cuentas.length > 0) {
        Cuentas = Cuentas.substring(1, Cuentas.length);
    }
    var vcPeriodo = $("#txtPeriodo").val().replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g, "");
    var mPer = vcPeriodo.substr(0, 2);
    var yPer = vcPeriodo.substr(3, 4);
    var PeriodoANSI = yPer + mPer + "01";

    $.ajax({
        url: "Conciliar.aspx/Guardar_AnalisisConciliacion_FyCCorte",
        data: "{'Cuentas':'" + Cuentas + "','Periodo':'" + PeriodoANSI + "', 'Tipo':'" + Tipo + "'}",
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {

            CargarDatosGrilla_AnalisisFyC();
            $("#cb_grid_AnalisisFyCVSCorte").prop('checked', false);

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function CargarDatosGrilla_AnalisisInventarioAdendum_Filtro() {
    $("#grid_AnalisisPlantaVSAdendum").jqGrid("clearGridData", true);
    var NumeroFiltro = $.trim($("#txtFiltroNumero_InventarioAdendum").val());
    var ConciliadoFiltro = $("#cboFiltroConciliado_InventarioAdendum").val();
    var Contador_CuentasDiferentes = 0;
    var Contador_PlanesDiferentes = 0;
    var Contador_EquipoDiferentes = 0;
    var Contador_NumeroInventario = 0;
    var Contador_NumeroAdendum = 0;
    var i = 0;
    //Filtrar Datos...
    var RegistrosInventarioAdendum_Filtro = [];
    var TotalConciliado = 0;
    for (var i = 0; i < RegistrosInventarioAdendum.length; i++) {
        if (RegistrosInventarioAdendum[i]['Conciliado'] == 'NO') {
            if (RegistrosInventarioAdendum[i]['Observacion'].indexOf("No existe número en Adendum") >= 0) {
                Contador_NumeroAdendum++;
            }
            if (RegistrosInventarioAdendum[i]['Observacion'].indexOf("No existe número en Inventario") >= 0) {
                Contador_NumeroInventario++;
            }
            if (RegistrosInventarioAdendum[i]['Observacion'].indexOf("La cuenta es diferente") >= 0) {
                Contador_CuentasDiferentes++;
            }
            if (RegistrosInventarioAdendum[i]['Observacion'].indexOf("El plan es diferente") >= 0) {
                Contador_PlanesDiferentes++;
            }
            if (RegistrosInventarioAdendum[i]['Observacion'].indexOf("El equipo es diferente") >= 0) {
                Contador_EquipoDiferentes++;
            }
        }
        else {
            TotalConciliado++;
        }

        if (NumeroFiltro != "") {
            if (RegistrosInventarioAdendum[i]["Numero_1"].indexOf(NumeroFiltro) < 0 &&
                RegistrosInventarioAdendum[i]["Numero_2"].indexOf(NumeroFiltro) < 0) {
                continue;
            }
        }
        if (ConciliadoFiltro == "1") {
            if (RegistrosInventarioAdendum[i]['Conciliado'] == 'NO') {
                continue;
            }
        }
        if (ConciliadoFiltro == "2") {
            if (RegistrosInventarioAdendum[i]['Conciliado'] == 'SI') {
                continue;
            }
        }
        RegistrosInventarioAdendum_Filtro.push(RegistrosInventarioAdendum[i]);
    }
    $("#lbl_Contador_CuentasDiferentes").html("Cuentas diferentes (" + Contador_CuentasDiferentes + ")");
    $("#lbl_Contador_PlanesDiferentes").html("Planes diferentes (" + Contador_PlanesDiferentes + ")");
    $("#lbl_Contador_EquipoDiferentes").html("Equipos diferentes (" + Contador_EquipoDiferentes + ")");
    $("#lbl_Contador_NumeroInventario").html("Número no existe en el Inventario (" + Contador_NumeroInventario + ")");
    $("#lbl_Contador_NumeroAdendum").html("Número no existe en Adendum (" + Contador_NumeroAdendum + ")");
    if (RegistrosInventarioAdendum.length > 0) {
        $("#pgr_Contador_CuentasDiferentes").width(100 * (Contador_CuentasDiferentes / RegistrosInventarioAdendum.length));
        $("#pgr_Contador_PlanesDiferentes").width(100 * (Contador_PlanesDiferentes / RegistrosInventarioAdendum.length));
        $("#pgr_Contador_EquipoDiferentes").width(100 * (Contador_EquipoDiferentes / RegistrosInventarioAdendum.length));
        $("#pgr_Contador_NumeroInventario").width(100 * (Contador_NumeroInventario / RegistrosInventarioAdendum.length));
        $("#pgr_Contador_NumeroAdendum").width(100 * (Contador_NumeroAdendum / RegistrosInventarioAdendum.length));
    }
    var Pendientes = 0;
    Pendientes = RegistrosInventarioAdendum.length - TotalConciliado;
    if (Pendientes == 0) {
        $('#tbConciliacion ul:first li:eq(2) a').text("Inventario vs Adendum (OK)");
    }
    else {
        $('#tbConciliacion ul:first li:eq(2) a').text("Inventario vs Adendum (" + Pendientes + ")");
    }
    var grid = $("#grid_AnalisisPlantaVSAdendum").jqGrid();
    grid.addRowData("Correlativo", RegistrosInventarioAdendum_Filtro, "first");
    $(".ui-pg-selbox").change();
}
function btnConciliarInventarioAdendum_click(Tipo) {
    var IdSeleccionados = $('#grid_AnalisisPlantaVSAdendum').jqGrid('getGridParam', 'selarrrow');
    if (IdSeleccionados.length == 0) {
        alerta("Debe seleccionar un registro como mínimo");
        return;
    }
    var datos;
    var Numeros = "";
    for (var i = 0; i < IdSeleccionados.length; i++) {
        datos = $("#grid_AnalisisPlantaVSAdendum").jqGrid('getRowData', IdSeleccionados[i]);
        if (datos.Numero_1 != "" && datos.Numero_1 != '<span class="cellConciliado"></span>') {
            Numeros += "," + datos.Numero_1;
        }
        else {
            Numeros += "," + datos.Numero_2;
        }
    }
    if (Numeros.length > 0) {
        Numeros = Numeros.substring(1, Numeros.length);
    }
    var vcPeriodo = $("#txtPeriodo").val().replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g, "");
    var mPer = vcPeriodo.substr(0, 2);
    var yPer = vcPeriodo.substr(3, 4);
    var PeriodoANSI = yPer + mPer + "01";

    $.ajax({
        url: "Conciliar.aspx/Guardar_AnalisisConciliacion_InventarioAdendum",
        data: "{'Numeros':'" + Numeros + "','Periodo':'" + PeriodoANSI + "','Tipo':'" + Tipo + "'}",
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            CargarDatosGrilla_AnalisisFyC();
            $("#cb_grid_AnalisisPlantaVSAdendum").prop('checked', false);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}



function CargarDatosGrilla_AnalisisInventarioFyC_Filtro() {
    $("#grid_AnalisisPlantaVSFyC").jqGrid("clearGridData", true);
    var NumeroFiltro = $.trim($("#txtFiltroNumero_InventarioFyC").val());
    var ConciliadoFiltro = $("#cboFiltroConciliado_InventarioFyC").val();
    var Contador_MontoDiferente = 0;
    var Contador_NumeroInventario2 = 0;
    var Contador_NumeroFyC = 0;
    var i = 0;
    //Filtrar Datos...
    var RegistrosInventarioFyC_Filtro = [];
    var TotalConciliado = 0;
    for (var i = 0; i < RegistrosInventarioFyC.length; i++) {
        if (RegistrosInventarioFyC[i]['Conciliado'] == 'NO') {
            if (RegistrosInventarioFyC[i]['Observacion'].indexOf("No existe número en Fact.") >= 0) {
                Contador_NumeroFyC++;
            }
            if (RegistrosInventarioFyC[i]['Observacion'].indexOf("No existe número en Inventario") >= 0) {
                Contador_NumeroInventario2++;
            }
            if (RegistrosInventarioFyC[i]['Observacion'].indexOf("El monto es diferente") >= 0) {
                Contador_MontoDiferente++;
            }
        }
        else {
            TotalConciliado++;
        }

        if (NumeroFiltro != "") {
            if (RegistrosInventarioFyC[i]["Numero_1"].indexOf(NumeroFiltro) < 0 &&
                RegistrosInventarioFyC[i]["NumeroDeTelefono"].indexOf(NumeroFiltro) < 0) {
                continue;
            }
        }
        if (ConciliadoFiltro == "1") {
            if (RegistrosInventarioFyC[i]['Conciliado'] == 'NO') {
                continue;
            }
        }
        if (ConciliadoFiltro == "2") {
            if (RegistrosInventarioFyC[i]['Conciliado'] == 'SI') {
                continue;
            }
        }
        //AGREGAR FORMATO NUMERO EN GRILLA. 
        RegistrosInventarioFyC[i]["MontoPlan_1"] = FormatoNumero(RegistrosInventarioFyC[i]["MontoPlan_1"], oCulturaUsuario).toString();
        RegistrosInventarioFyC[i]["MontoPlan_2"] = FormatoNumero(RegistrosInventarioFyC[i]["MontoPlan_2"], oCulturaUsuario).toString();

        RegistrosInventarioFyC_Filtro.push(RegistrosInventarioFyC[i]);
    }
    $("#lbl_Contador_MontoDiferente").html("Montos diferentes (" + Contador_MontoDiferente + ")");
    $("#lbl_Contador_NumeroInventario2").html("Número no existe en el Inventario (" + Contador_NumeroInventario2 + ")");
    $("#lbl_Contador_NumeroFyC").html("Número no existe en Fact. (" + Contador_NumeroFyC + ")");
    if (RegistrosInventarioFyC.length > 0) {
        $("#pgr_Contador_MontoDiferente").width(100 * (Contador_MontoDiferente / RegistrosInventarioFyC.length));
        $("#pgr_Contador_NumeroInventario2").width(100 * (Contador_NumeroInventario2 / RegistrosInventarioFyC.length));
        $("#pgr_Contador_NumeroFyC").width(100 * (Contador_NumeroFyC / RegistrosInventarioFyC.length));
    }
    var Pendientes = 0;
    Pendientes = RegistrosInventarioFyC.length - TotalConciliado;
    if (Pendientes == 0) {
        $('#tbConciliacion ul:first li:eq(3) a').text("Inventario vs Fact. (OK)");
    }
    else {
        $('#tbConciliacion ul:first li:eq(3) a').text("Inventario vs Fact. (" + Pendientes + ")");
    }
    var grid = $("#grid_AnalisisPlantaVSFyC").jqGrid();
    grid.addRowData("Correlativo", RegistrosInventarioFyC_Filtro, "first");
    $(".ui-pg-selbox").change();
}
function btnConciliarInventarioFyC_click(Tipo) {
    var IdSeleccionados = $('#grid_AnalisisPlantaVSFyC').jqGrid('getGridParam', 'selarrrow');
    if (IdSeleccionados.length == 0) {
        alerta("Debe seleccionar un registro como mínimo");
        return;
    }
    var datos;
    var Numeros = "";
    for (var i = 0; i < IdSeleccionados.length; i++) {
        datos = $("#grid_AnalisisPlantaVSFyC").jqGrid('getRowData', IdSeleccionados[i]);
        if (datos.Numero_1 != "" && datos.Numero_1 != '<span class="cellConciliado"></span>') {
            Numeros += "," + datos.Numero_1;
        }
        else {
            Numeros += "," + datos.NumeroDeTelefono;
        }
    }
    if (Numeros.length > 0) {
        Numeros = Numeros.substring(1, Numeros.length);
    }
    var vcPeriodo = $("#txtPeriodo").val().replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g, "");
    var mPer = vcPeriodo.substr(0, 2);
    var yPer = vcPeriodo.substr(3, 4);
    var PeriodoANSI = yPer + mPer + "01";
    var vcOperador = $("#ddlOperador").val();

    $.ajax({
        url: "Conciliar.aspx/Guardar_AnalisisConciliacion_InventarioFyC",
        data: "{'Numeros':'" + Numeros + "','Periodo':'" + PeriodoANSI + "','Tipo':'" + Tipo + "','Generico':'" + hdfGenerico + "','Operador':'" + vcOperador + "'}",
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {

            CargarDatosGrilla_AnalisisFyC();
            $("#cb_grid_AnalisisPlantaVSFyC").prop('checked', false);

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function CargarDatosGrilla_AnalisisSolicitudFyC_Filtro() {
    $("#grid_AnalisisSolicitudesVSFyC").jqGrid("clearGridData", true);
    var NumeroFiltro = $.trim($("#txtFiltroNumero_SolicitudFyC").val());
    var ConciliadoFiltro = $("#cboFiltroConciliado_SolicitudFyC").val();
    var i = 0;
    //Filtrar Datos...
    var RegistrosSolicitudFyC_Filtro = [];
    var TotalConciliado = 0;
    for (var i = 0; i < RegistrosSolicitudFyC.length; i++) {
        if (RegistrosSolicitudFyC[i]['Conciliado'] == 'SI') {
            TotalConciliado++;
        }
        if (NumeroFiltro != "") {
            if (RegistrosSolicitudFyC[i]["NumeroDeTelefono"].indexOf(NumeroFiltro)) {
                continue;
            }
        }
        if (ConciliadoFiltro == "1") {
            if (RegistrosSolicitudFyC[i]['Conciliado'] == 'NO') {
                continue;
            }
        }
        if (ConciliadoFiltro == "2") {
            if (RegistrosSolicitudFyC[i]['Conciliado'] == 'SI') {
                continue;
            }
        }
        RegistrosSolicitudFyC_Filtro.push(RegistrosSolicitudFyC[i]);
    }
    var Pendientes = 0;
    Pendientes = RegistrosSolicitudFyC.length - TotalConciliado;
    if (Pendientes == 0) {
        $('#tbConciliacion ul:first li:eq(4) a').text("Solicitudes vs Fact. (OK)");
    }
    else {
        $('#tbConciliacion ul:first li:eq(4) a').text("Solicitudes vs Fact. (" + Pendientes + ")");
    }
    var grid = $("#grid_AnalisisSolicitudesVSFyC").jqGrid();
    grid.addRowData("Correlativo", RegistrosSolicitudFyC_Filtro, "first");
    $(".ui-pg-selbox").change();
}
function btnConciliarSolicitudFyC_click(Tipo) {
    var IdSeleccionados = $('#grid_AnalisisSolicitudesVSFyC').jqGrid('getGridParam', 'selarrrow');
    if (IdSeleccionados.length == 0) {
        alerta("Debe seleccionar un registro como mínimo");
        return;
    }
    var datos;
    var CodigosSolicitud = "";
    for (var i = 0; i < IdSeleccionados.length; i++) {
        datos = $("#grid_AnalisisSolicitudesVSFyC").jqGrid('getRowData', IdSeleccionados[i]);
        CodigosSolicitud += "," + datos.Codigo;
    }
    if (CodigosSolicitud.length > 0) {
        CodigosSolicitud = CodigosSolicitud.substring(1, CodigosSolicitud.length);
    }
    var vcPeriodo = $("#txtPeriodo").val().replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g, "");
    var mPer = vcPeriodo.substr(0, 2);
    var yPer = vcPeriodo.substr(3, 4);
    var PeriodoANSI = yPer + mPer + "01";

    $.ajax({
        url: "Conciliar.aspx/Guardar_AnalisisConciliacion_SolicitudFyC",
        data: "{'CodigosSolicitud':'" + CodigosSolicitud + "','Periodo':'" + PeriodoANSI + "', 'Tipo':'" + Tipo + "'}",
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {

            CargarDatosGrilla_AnalisisFyC();
            $("#cb_grid_AnalisisSolicitudesVSFyC").prop('checked', false);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function afterInsertRow_Grilla(rowid, aData, rowelem) {
    var colModels;
    var grilla = aData.NombreGrilla;
    colModels = $("#" + grilla).getGridParam("colModel");
    switch (grilla) {
        case "grid_AnalisisFyC":
            if (aData["Conciliado"] == "SI") {
                for (i = 0; i < colModels.length; i++) {
                    $("#grid_AnalisisFyC").jqGrid('setCell', rowid, i, '', 'cellConciliado');
                }
            }
            else {
                for (var j = 0; j < Columnas_AnalisisFyC.length; j++) {
                    if (aData[Columnas_AnalisisFyC[j]] != aData[Columnas_AnalisisFyC[j] + "_D"]) {
                        $("#grid_AnalisisFyC").jqGrid('setCell', rowid, j + 4, '', { color: 'red', 'background-color': '#FFFFAA', padding: '1px' });
                        $("#grid_AnalisisFyC").jqGrid('setCell', rowid, j + 10 + 4, '', { color: 'red', 'background-color': '#FFFFAA', padding: '1px' });
                    }
                }
            }
            break;
        case "grid_AnalisisFyCVSCorte":
            if (aData["Conciliado"] == "SI") {
                for (i = 0; i < colModels.length; i++) {
                    $("#grid_AnalisisFyCVSCorte").jqGrid('setCell', rowid, i, '', 'cellConciliado');
                }
            }
            else {
                if (parseFloat(aData["Diferencia"]) < 0) {
                    $("#grid_AnalisisFyCVSCorte").jqGrid('setCell', rowid, 7, '', { color: 'red', padding: '1px' });
                }
                else {
                    $("#grid_AnalisisFyCVSCorte").jqGrid('setCell', rowid, 7, '', { color: 'blue', padding: '1px' });
                }
                if (aData["Cuenta_1"] == "") {
                    $("#grid_AnalisisFyCVSCorte").jqGrid('setCell', rowid, 3, '', { 'background-color': '#F8E8E6' });
                    $("#grid_AnalisisFyCVSCorte").jqGrid('setCell', rowid, 4, '', { 'background-color': '#F8E8E6' });
                    $("#grid_AnalisisFyCVSCorte").jqGrid('setCell', rowid, 5, '', { 'background-color': '#F8E8E6' });
                }
                if (aData["Cuenta_2"] == "") {
                    $("#grid_AnalisisFyCVSCorte").jqGrid('setCell', rowid, 6, '', { 'background-color': '#F8E8E6' });
                    $("#grid_AnalisisFyCVSCorte").jqGrid('setCell', rowid, 7, '', { 'background-color': '#F8E8E6' });
                }
            }
            break;
        default:
    }
}

function btnEnviarValidacion_click() {

    //Validar si no hay pendientes...
    if ($('#tbConciliacion ul:first li:eq(4) a').text() != "Solicitudes vs Fact. (OK)" ||
        $('#tbConciliacion ul:first li:eq(3) a').text() != "Inventario vs Fact. (OK)" ||
        $('#tbConciliacion ul:first li:eq(2) a').text() != "Inventario vs Adendum (OK)" ||
        $('#tbConciliacion ul:first li:eq(1) a').text() != "Fact. vs Cortes (OK)" ||
        $('#tbConciliacion ul:first li:eq(0) a').text() != "Análisis Fact. (OK)"
        ) {
        alerta("Existen registros pendientes de conciliación, verifique.");
        return;
    }
    confirmacion("Se enviarán correos de notificación a los enlaces.<br>¿Desea continuar con el proceso?", function () {
        //Generar colas...
        var vcPeriodo = $("#txtPeriodo").val().replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g, "");
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
                        url: "Conciliar.aspx/EnviarColaValidacion",
                        data: "{'Periodo':'" + vcPeriodo + "', 'Observacion':'" + Observacion + "'}",
                        dataType: "json",
                        type: "post",
                        contentType: "application/json; charset=utf-8",
                        success: function (result) {
                            alerta("Se generaron las colas de notificaciones correctamente, en unos instantes se enviarán los correos a los enlaces.");
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