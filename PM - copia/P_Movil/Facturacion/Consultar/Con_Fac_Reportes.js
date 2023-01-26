$(function () {
    //#region Inicializar controles
    $("#ddlReportes").kendoDropDownList({
        change: function (e) {
            var i, ReporteSeleccionado = null;
            for (i = 0; i < arReportes.length; i++) {
                if (arReportes[i].CodigoReporte == this.value()) {
                    ReporteSeleccionado = arReportes[i];
                }
            }
            fnMostrarPanelParametros(ReporteSeleccionado);
        }
    });

    $(".Periodo").kendoDatePicker({
        culture: "es-PE",
        animation: false,
        start: "year",
        depth: "year",
        format: "MM/yyyy"
    });

    fnFixKendoStyle();
    //#endregion

    //#region Eventos
    $("#bntGenerarReporte").click(function () {
        var codrep = $("#ddlReportes").val();
        if (codrep == -1) {
            alerta("Seleccione un reporte");
        } else if (codrep == -2) {
            alerta("No existe ningún reporte configurado");
        } else {
            var i;
            for (i = 0; i < arReportes.length; i++) {
                if (arReportes[i].CodigoReporte == codrep) {
                    fnEjecutarReporte(arReportes[i]);
                }
            }
        }
    });
    //#endregion
});

function fnEjecutarReporte(objReporte) {
    if (objReporte.Personalizado) {
        fnEjecutarReportePersonalizado(objReporte)
    } else {
        fnEjecutarReporteSistema(objReporte);
    }
}

function fnEjecutarReporteSistema(objReporte) {
    fnCargarValores(objReporte);
}

function fnEjecutarReportePersonalizado(objReporte) {
    if (objReporte.Existe == "0") {
        alerta("No existe el procedimeinto almacenado personalizado, comuníquese con el área de sistemas.");
    } else {
        fnCargarValores(objReporte);
    }
}

function fnCargarValores(oRep) {
    var vParam = '';
    if (oRep.UsaParametros) {
        vParam = fnObtenerParametros(oRep.CodigoReporte);
        if (vParam == '') {
            alerta("Ingrese valores para todos los parámetros.");
            return;
        }
    }
    $.ajax({
        type: "POST",
        url: "Con_Fac_Reportes.aspx/CargarValores",
        data: JSON.stringify({
            CodigoReporte: oRep.CodigoReporte,
            Personalizado: oRep.Personalizado,
            NombreArchivo: oRep.NombreArchivo,
            Procedimiento: oRep.ProcedimientoPersonalizado,
            Parametros: vParam
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            btnExportarExcel_eegReporte();
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnMostrarPanelParametros(objReporte) {
    $("#dvParametros").hide();
    $(".Param").hide();
    if (objReporte != null) {
        if (objReporte.UsaParametros) {
            $("#dvParametros").show();
            $(".Param_" + objReporte.CodigoReporte.substring(0, 4)).show();
        }
    }
}

function fnObtenerParametros(CodigoReporte) {
    var arParametros = [];
    switch (CodigoReporte) {
        case "REP002":
            if ($("#REP00_Periodo").val() != '') {
                var vPeriodo = $("#REP00_Periodo").val().split('/');
                arParametros.push(vPeriodo[1] + vPeriodo[0]);
            }
            break;
        case "REP003":
            if ($("#REP00_Periodo").val() != '') {
                var vPeriodo = $("#REP00_Periodo").val().split('/');
                arParametros.push(vPeriodo[1] + vPeriodo[0]);
            }
            break;
        case "REP004":
            if ($("#REP00_Periodo").val() != '') {
                var vPeriodo = $("#REP00_Periodo").val().split('/');
                arParametros.push(vPeriodo[1] + vPeriodo[0]);
            }
            break;
        case "REP005":
            if ($("#REP00_Periodo").val() != '') {
                var vPeriodo = $("#REP00_Periodo").val().split('/');
                arParametros.push(vPeriodo[1] + vPeriodo[0]);
            }
            break;
        case "REP006":
            if ($("#REP00_Periodo").val() != '') {
                var vPeriodo = $("#REP00_Periodo").val().split('/');
                arParametros.push(vPeriodo[1] + vPeriodo[0]);
            }
            break;
        default:
            arParametros = [];
            break;
    }
    return arParametros.join(",");
}


function fnFixKendoStyle() {
    $(".k-dropdown,.Periodo").css("padding", "0px").css("border", "0px");
}