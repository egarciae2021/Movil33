var oCulturaUsuario;
var FormatoFechaCulturaForDatePicker = "";
var SimDec = ".";
var SimMil = ",";
var NumDec = "2";
$(function () {
    oCulturaUsuario = window.parent.parent.oCulturaUsuario;
    FormatoFechaCulturaForDatePicker = oCulturaUsuario.vcFecCor.toLowerCase();

    if (FormatoFechaCulturaForDatePicker.indexOf("yyyy") >= 0) {
        FormatoFechaCulturaForDatePicker = FormatoFechaCulturaForDatePicker.replace("yyyy", "yy");  //Para datepicker 'yy' es como 'yyyy'; y 'y' es 'yy'
    }
    else if (FormatoFechaCulturaForDatePicker.indexOf("yy") >= 0) {
        FormatoFechaCulturaForDatePicker = FormatoFechaCulturaForDatePicker.replace("yy", "y");
    }

    $(".accordion").accordion({
        collapsible: true,
        autoHeight: false
    });

    if ($("#chkTodoFechas").is(":checked")) {
        $("#txtFechaInicio").val("");
        $("#txtFechaInicio").attr("disabled", true);
        $("#txtFechaFin").val("");
        $("#txtFechaFin").attr("disabled", true);
    } else {
        $("#txtFechaInicio").val("");
        $("#txtFechaInicio").attr("disabled", false);
        $("#txtFechaFin").val("");
        $("#txtFechaFin").attr("disabled", false);
    }

    $("#txtFechaInicio").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: FormatoFechaCulturaForDatePicker,
        onClose: function (selectedDate) {
            $("#txtFechaFin").datepicker("option", "minDate", selectedDate);
        }
    });
    $("#txtFechaFin").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: FormatoFechaCulturaForDatePicker,
        onClose: function (selectedDate) {
            $("#txtFechaInicio").datepicker("option", "maxDate", selectedDate);
        }
    });
    $("#imgBorrarFecIni,#imgBorrarFecFin").click(function () {
        if ($(this).attr("id") == "imgBorrarFecIni") {
            $("#txtFechaInicio").val("");
            $("#txtFechaFin").datepicker("option", "minDate", null);
        } else {
            $("#txtFechaFin").val("");
            $("#txtFechaInicio").datepicker("option", "maxDate", null);
        }
    });

    $("#ddlOperador").change(function () {
        $.ajax({
            type: "POST",
            url: "ALM_Almacen_Reporte.aspx/ListarCampanaPorOperador",
            data: JSON.stringify({ IdOperador: $(this).val() }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#ddlCampana").html("");
                var i;
                for (i = 0; i < result.d.length; i++) {
                    $("#ddlCampana").append($("<option></option>").val(result.d[i].IdCampana).text(result.d[i].Descripcion));
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

    $("#ddlLineaTipo").change(function () {
        if ($(this).val() == '1') { //staff
            $("#dvCampanas").hide();
        } else {
            $("#dvCampanas").show();
        }
    });

    $("#btnFiltrar").live("click", function () {
        if ($("#ddlOperador").val() == '-1') {
            alert("Seleccione un operador.");
            return;
        }
        if ($("#ddlLineaTipo").val() == '-1') {
            alerta("Seleccione un tipo de línea.");
            return;
        }
        if ($("#ddlLineaTipo").val() == '2' && $("#ddlCampana").val() == '-1') {
            alerta("Seleccione un campana.");
            return;
        }
        var DataFiltro = {
            Tabla: $("#hdfvcTab").val(),
            TipoRep: $("#hdfvcTipRep").val(),
            Operador: $("#ddlOperador").val(),
            LineaTipo: $("#ddlLineaTipo").val(),
            Campana: $("#ddlCampana").val(),
            FechaIni: $("#txtFechaInicio").val(),
            FechaFin: $("#txtFechaFin").val()
        };
        $(".accordion").accordion({ active: 1 });
        $("#dvCargando").show();
        var pagina = "../Adm_ReporteDevExpress.aspx?vcTab=" + DataFiltro.Tabla + "&vcTipRep=" + DataFiltro.TipoRep + "&FecIni=" + DataFiltro.FechaIni
        + "&FecFin=" + DataFiltro.FechaFin + "&TipLin=" + DataFiltro.LineaTipo + "&IdCamp=" + (DataFiltro.Campana == null ? '-1' : DataFiltro.Campana);
        $("#ifReporteAlmacen").attr("src", pagina);
        $("#ifReporteAlmacen").show();
    });
});