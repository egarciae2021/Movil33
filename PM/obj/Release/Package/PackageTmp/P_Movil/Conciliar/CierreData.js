var RegistrosResumen, RegistrosDetalle;
var TotalCuentas, TotalLineas, TotalMonto;
var RegistrosCodInt = [];
var RegistroCierre = null;
var hdfGenerico;

var RegistrosFyC = [];
var RegistrosFyCCortes = [];
var RegistrosInventarioAdendum = [];
var RegistrosInventarioFyC = [];
var RegistrosSolicitudFyC = [];
var RegistrosConciliadosFyC = [];
var RegistrosConciliadosFyCCortes = [];
var RegistroCierre = [];

var SimMon = "";

function CargarDatosGrilla() {
    TotalCuentas = 0;
    TotalLineas = 0;
    var vcOperador = $("#ddlOperador").val();

    if (vcOperador != "-1") {
        //Validar si existen pendientes..
        $.ajax({
            url: "Conciliar.aspx/ObtenerAnalisisConciliacion",
            data: "{'Periodo':'" + $("#hdfPeriodo").val() + "','Generico':'" + hdfGenerico + "','Operador':'" + vcOperador + "'}",
            dataType: "json",
            type: "post",
            contentType: "application/json; charset=utf-8",
            success: function (result) {

                if (hdfGenerico == "1") {
                    if (result.d.length > 1) {
                        RegistrosInventarioFyC = result.d[0];
                        RegistrosSolicitudFyC = result.d[1];
                        RegistroCierre = result.d[2];
                    }
                    else {
                        var Mes = $("#hdfPeriodo").val().substring(4, 6);
                        var Anio = $("#hdfPeriodo").val().substring(0, 4);
                        if (Mes == "") {
                            $("#lblMensajeSinDatos").html("No existe información de facturación.");
                        }
                        else {
                            $("#lblMensajeSinDatos").html("No existe información de facturación. Periodo: " + Mes + "/" + Anio + ".");
                        }
                        $("#lblMensajeSinDatos").show();
                        $("#dvCargandoPage").hide();
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

                var ExistenPendientesConciliacion = false;
                var Pendientes = 0;



                Pendientes = RegistrosFyC.length - RegistrosConciliadosFyC.length;
                if (Pendientes != 0) {
                    ExistenPendientesConciliacion = true;
                }

                Pendientes = RegistrosFyCCortes.length - RegistrosConciliadosFyCCortes.length;
                if (Pendientes != 0) {
                    ExistenPendientesConciliacion = true;
                }

                for (var i = 0; i < RegistrosInventarioAdendum.length; i++) {
                    if (RegistrosInventarioAdendum[i]['Conciliado'] == 'NO') {
                        ExistenPendientesConciliacion = true;
                        break;
                    }
                }
                for (var i = 0; i < RegistrosInventarioFyC.length; i++) {
                    if (RegistrosInventarioFyC[i]['Conciliado'] == 'NO') {
                        ExistenPendientesConciliacion = true;
                        break;
                    }
                }
                for (var i = 0; i < RegistrosSolicitudFyC.length; i++) {
                    if (RegistrosSolicitudFyC[i]['Conciliado'] == 'NO') {
                        ExistenPendientesConciliacion = true;
                        break;
                    }
                }

                if (ExistenPendientesConciliacion) {
                    if (RegistroCierre != null && RegistroCierre.length > 0 && RegistroCierre[0].Tipo == "CLOSE") {

                        var Periodo = $("#hdfPeriodo").val();
                        if (Periodo != "") {
                            var Mes = $("#hdfPeriodo").val().substring(4, 6);
                            var Anio = $("#hdfPeriodo").val().substring(0, 4);
                            $("#lblMensajeSinDatos").html("<p>El proceso de conciliación ya ha sido cerrado, pero se han detectado cambios en Inventario. Periodo: " + Mes + "/" + Anio + ".</p>");
                        }
                        $("#lblMensajeSinDatos").show();
                        $("#dvCargandoPage").hide();

                        $("#btnCerrar").hide();
                        $("#btnAbrir").show();
                        $("#btnAcciones").show();
                    }
                    else {
                        MostrarMensajePendientes();
                    }
                }
                else {
                    Cargar_ObtenerCierreConciliacion();
                }




            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
    else {
        alerta("Debe seleccionar un operador");
    }
}

function MostrarMensajePendientes() {
    var Periodo = $("#hdfPeriodo").val();
    if (Periodo != "") {
        var Mes = $("#hdfPeriodo").val().substring(4, 6);
        var Anio = $("#hdfPeriodo").val().substring(0, 4);
        $("#lblMensajeSinDatos").html("<p>El proceso de conciliación aún no ha sido concluido para el operador seleccionado, ingrese al menú 'Conciliar'. Periodo: " + Mes + "/" + Anio + ".</p>");
    }
    else {
        $("#lblMensajeSinDatos").html("<p>El proceso de conciliación aún no ha sido iniciado, ingrese al menú 'Conciliar'.</p>");
    }

    $("#btnCerrar").hide();
    $("#btnAbrir").hide();

    $("#lblMensajeSinDatos").show();
    $("#dvCargandoPage").hide();
    $("#btnAcciones").show();
}


function Cargar_ObtenerCierreConciliacion() {

    var vcOperador = $("#ddlOperador").val();
    if (vcOperador != "-1") {
        $.ajax({
            url: "Cierre.aspx/ObtenerCierreConciliacion",
            data: "{'Periodo':'" + $("#hdfPeriodo").val() + "','Generico':'" + hdfGenerico + "','Operador':'" + vcOperador + "'}",
            dataType: "json",
            type: "post",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result.d.length == 0) {
                    MostrarMensajePendientes();
                    return;
                }
                RegistrosResumen = result.d[0];
                RegistrosDetalle = result.d[1];
                RegistrosCodInt = result.d[3];

                $("#dvChatContador").hide();
                try {
                    var NoVistos = result.d[4];
                    $("#dvChatContador").html(NoVistos[0].NoVisto);
                    if (parseFloat(NoVistos[0].NoVisto) > 0) {
                        $("#dvChatContador").show();
                    }
                } catch (e) {
                }


                CargarDatosDinamicos();


            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
    else
    {
        alerta("Debe seleccionar un operador");
    }
}

function MostrarMensajeSinLineas() {
    $("#lblMensajeSinDatos").html("<p>No cuenta con Líneas/Cuentas asignadas para realizar este proceso.</p>");
    $("#lblMensajeSinDatos").show();
    $("#dvCargandoPage").hide();
}

function CargarDatosDinamicos() {

    if (RegistrosResumen.length > 0) {

        TotalCuentas = parseFloat(RegistrosResumen[0].Cuentas);
        TotalLineas = parseFloat(RegistrosResumen[0].Numeros);
        TotalMonto = parseFloat(RegistrosResumen[0].Total);

        if (TotalLineas == 0) {
            MostrarMensajeSinLineas();
            return;
        }



        $("#lblTotalLineas").html(JqGrid_FormatoNumero(RegistrosResumen[0].Numeros, false));
        $("#lblTotalCuentas").html(JqGrid_FormatoNumero(RegistrosResumen[0].Cuentas, false));
        $("#lblObservacionesPendientes").html(JqGrid_FormatoNumero(RegistrosResumen[0].ObservadosPendientes, false));

        var Total = JqGrid_FormatoNumero(RegistrosResumen[0].Total, true);
        var TotalEntero, TotalDecimal;
        var indice = Total.indexOf(".");
        if (indice >= 0) {
            TotalEntero = Total.substring(0, indice);
            TotalDecimal = "." + Total.substring(indice + 1, Total.length);
        }
        else {
            TotalEntero = Total;
            TotalDecimal = ".00";
        }
        if (window.top.oCulturaUsuario != undefined) {
            SimMon = window.top.oCulturaUsuario.vcTipMon;
        } else {
            SimMon = "$";
        }
        $("#lblTotal").html(SimMon + TotalEntero);
        $("#lblDecTotal").html(TotalDecimal);

        //Validados...
        var Validados = parseFloat(RegistrosResumen[0].Aprobados);
        var ValidadosPorcentaje;
        if (TotalLineas != 0) {
            ValidadosPorcentaje = parseInt(100 * (Validados / TotalLineas));
        }
        $("#lblPorcentajeValidados").html(ValidadosPorcentaje + " %");
    }

    if (RegistrosDetalle.length > 0) {
        CargarDatosDinamicosTabsGrillas();
    }
}


function CargarDatosDinamicosTabsGrillas() {

    var RegistrosDetalleNumero = [];
    var IngresoArea = false;
    var Pendientes = 0;

    var i = 0;
    var tmrCarga = setInterval(function () {
        if (i >= RegistrosCodInt.length) {
            DimPosElementos();
            //autosize($('.clsObservacion'));
            //autosize($('.clsRespuesta'));
            clearInterval(tmrCarga);
            $(".ui-pg-selbox").change();
            $("#dvCargandoPage").hide();
            $("#dvPrincipal").show();

            $("#btnAcciones").show();

            return;
        }
        IngresoArea = false;
        RegistrosDetalleNumero = [];
        Pendientes = 0;
        for (var j = 0; j < RegistrosDetalle.length; j++) {
            if (RegistrosDetalle[j].Aprobado == "") {
                RegistrosDetalle[j].Aprobado = "False";
            }
            if (RegistrosDetalle[j].CodInt == RegistrosCodInt[i].CodInt) {
                IngresoArea = true;

                if (RegistrosDetalle[j].Aprobado == "1" || RegistrosDetalle[j].Aprobado == "True") {
                }
                else {
                    Pendientes++;
                }
                RegistrosDetalleNumero.push(RegistrosDetalle[j]);
            }
            else {
                if (IngresoArea == true) {
                    break;
                }
            }
        }
        CargarDisenoGrilla("grid_Contenedor_" + RegistrosCodInt[i].CodInt, ModeloColumnas, RegistrosDetalleNumero.length);
        var grid = $("#grid_Contenedor_" + RegistrosCodInt[i].CodInt).jqGrid();
        grid.addRowData("Correlativo", RegistrosDetalleNumero, "first");

        ActualizarTituloAccordion("grid_Contenedor_" + RegistrosCodInt[i].CodInt, Pendientes);

        i++;

    }, 10);

}


function ActualizarTituloAccordion(Grilla, _Pendientes) {
    var CodInt = Grilla.replace("grid_Contenedor_", "");
    var Indice = $("#Contenedor_" + CodInt).attr("indicetab");
    var Area = $("#Contenedor_" + CodInt).attr("nombrearea");
    if (typeof _Pendientes == 'undefined') {
        //Calcular pendientes...
        _Pendientes = 0;
        var Ingreso = false;
        for (var j = 0; j < RegistrosDetalle.length; j++) {
            if (RegistrosDetalle[j].CodInt == CodInt) {
                Ingreso = true;
                if (RegistrosDetalle[j].Aprobado == "0" || RegistrosDetalle[j].Aprobado == "False" || RegistrosDetalle[j].Aprobado == "") {
                    _Pendientes++;
                }
            }
            else {
                if (Ingreso == true) {
                    break;
                }
            }
        }
    }
    if (_Pendientes > 0) {
        $($($("#ajAreas > h3")[Indice]).find("a")[0]).html("Empresa: " + Area + ' - Pendientes: (' + _Pendientes + ')');
        $($($("#ajAreas > h3")[Indice]).find("a")[0]).css("color", "#E47009");
    }
    else {
        $($($("#ajAreas > h3")[Indice]).find("a")[0]).html("Empresa: " + Area);
        $($($("#ajAreas > h3")[Indice]).find("a")[0]).css("color", "#1D5987");
    }
}


function ActualizarNoLeidos() {
    //debugger;
    $.ajax({
        url: "Cierre.aspx/ObtenerNoLeidos",
        data: "{'Periodo':'" + $("#hdfPeriodo").val() + "','Operador':'" + $("#hdfOperador").val() + "'}",
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            $("#dvChatContador").hide();
            if (result.d.length == 0) {
                return;
            }
            RegistrosNoLeidos = result.d[0];
            if (RegistrosNoLeidos.length > 0) {
                $("#dvChatContador").html(RegistrosNoLeidos[0].NoVisto);
                if (parseFloat(RegistrosNoLeidos[0].NoVisto) > 0) {
                    $("#dvChatContador").show();
                }
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}