var RegistrosResumen, RegistrosDetalle;
var TotalCuentas, TotalLineas;
var Cuentas = [];
var hdfGenerico;

var RegistrosFyC = [];
var RegistrosFyCCortes = [];
var RegistrosInventarioAdendum = [];
var RegistrosInventarioFyC = [];
var RegistrosSolicitudFyC = [];
var RegistrosConciliadosFyC = [];
var RegistrosConciliadosFyCCortes = [];
var RegistroCierre = [];

function CargarDatosInicial() {
    TotalCuentas = 0;
    TotalLineas = 0;

    //Validar si existen pendientes..
    $.ajax({
        url: "Conciliar.aspx/ObtenerAnalisisConciliacion",
        data: "{'Periodo':'" + $("#hdfPeriodo").val() + "','Generico':'" + hdfGenerico + "','Operador':'" + $("#hdfOperador").val() + "'}",
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
                MostrarMensajePendientes();
            }
            else {
                Cargar_ObtenerValidacionConciliacion();
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function Cargar_ObtenerValidacionConciliacion() {

    $.ajax({
        url: "Validar.aspx/ObtenerValidacionConciliacion",
        data: "{'Periodo':'" + $("#hdfPeriodo").val() + "','Generico':'" + hdfGenerico + "','Operador':'" + $("#hdfOperador").val() + "'}",
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

            $("#dvChatContador").hide();
            try {
                var NoVistos = result.d[3];
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

function MostrarMensajePendientes() {
    var Periodo = $("#hdfPeriodo").val();
    if (Periodo != "") {
        var Mes = $("#hdfPeriodo").val().substring(4, 6);
        var Anio = $("#hdfPeriodo").val().substring(0, 4);
        $("#lblMensajeSinDatos").html("<p>El proceso de conciliación aún no ha sido concluido para el periodo: " + Mes + "/" + Anio + ".</p>");
    }
    else {
        $("#lblMensajeSinDatos").html("<p>El proceso de conciliación aún no ha sido iniciado.</p>");
    }

    $("#lblMensajeSinDatos").show();
    $("#dvCargandoPage").hide();
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

    var Cuenta = '';
    for (var i = 0; i < RegistrosDetalle.length; i++) {
        if (Cuenta != RegistrosDetalle[i].CuentaPadre) {
            Cuenta = RegistrosDetalle[i].CuentaPadre;
            Cuentas.push(Cuenta);
        }
    }



    var RegistrosDetalleNumero = [];
    var IngresoCuenta = false;
    var Pendientes = 0;
    var i = 0;
    var tmrCarga = setInterval(function () {

        if (i >= Cuentas.length) {
            DimPosElementos();
            //autosize($('.clsObservacion'));
            //autosize($('.clsRespuesta'));
            clearInterval(tmrCarga);

            $(".ui-pg-selbox").change();

            $("#dvCargandoPage").hide();
            $("#dvPrincipial").show();
            return;
        }
        //for (var i = 0; i < Cuentas.length; i++) {
        CargarDisenoGrilla("grid_Contenedor_" + Cuentas[i].replace(".", "_"), ModeloColumnas);
        IngresoCuenta = false;
        RegistrosDetalleNumero = [];
        Pendientes = 0;
        for (var j = 0; j < RegistrosDetalle.length; j++) {
            if (RegistrosDetalle[j].CuentaPadre == Cuentas[i]) {
                IngresoCuenta = true;

                if (RegistrosDetalle[j].Aprobado == "1" || RegistrosDetalle[j].Aprobado == "True") {
                }
                else {
                    Pendientes++;
                }
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
        ActualizarTituloAccordion("grid_Contenedor_" + Cuentas[i], Pendientes);
        i++;
        //}

    }, 10);






}
