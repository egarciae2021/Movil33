var chart;
var DatosGrafico;
var TipoActual = 1;
var idSeleccion;

//click: function (e) {
//    if (tipo == "") {
//        GraficaDetalle(this.name);
//    }
//    else {
//        GraficaPrincipal();
//    }
//}

function GraficaPrincipal() {
    if (DatosGrafico == undefined) {
        return;
    }
    var DatosResultado = JSON.parse(DatosGrafico[TipoActual].Datos);
    if (DatosResultado.data.length == 0) {
        $("#Grafico_Sumario *").remove();
        $("#Grafico_Sumario").empty();
        $("#Grafico_Sumario").append('<div style="font-size:medium; color:Gray;">No hay datos para mostrar.</div> ');
        return;
    } else {
        TipoActual = 1;
        var tipoDato = window.parent.$("#ddlTipoDato").val();
        var tipoGrafico = window.parent.$("#ddlTipoGrafico").val();

        //        $("#Grafico_Sumario *").remove();
        //        $("#Grafico_Sumario").empty();

        if (!(FusionCharts("myChartId-1"))) {
            myChart = new FusionCharts("../../Common/Scripts/FusionCharts/" + tipoGrafico + ".swf", "myChartId-1", "570", "300", "0");
            myChart.setJSONData(DatosGrafico[tipoDato]["Datos"]);
            myChart.setTransparent(true);
            myChart.render("Grafico_Sumario");
        }

        else {
            $("#Grafico_Sumario").updateFusionCharts({ dataSource: DatosGrafico[tipoDato]["Datos"], dataFormat: "json", swfUrl: tipoGrafico });
        }


    }
    $("#Grafico_Sumario").fadeIn(300);
}

function GraficaDetalle(id) {
    TipoActual = 2;
    idSeleccion = id;
    var tipoDato = window.parent.$("#ddlTipoDato").val();
    var tipoGrafico = window.parent.$("#ddlTipoGrafico").val();
    //alert("graficadetalle");

    if (!(FusionCharts("myChartId-2"))) {
        $("#Grafico_Sumario *").remove();
        $("#Grafico_Sumario").empty();
        $("#Grafico_Sumario").append('<div id="Grafico_SumarioContenido"></div> ');

        //if (!(FusionCharts("myChartId-2"))) { //comentado wapumayta 30/07/2014
        //    myChart = new FusionCharts("../../Common/Scripts/FusionCharts/" + tipoGrafico + ".swf", "myChartId-2", "700", "300", "0");
        //}
        myChart = new FusionCharts("../../Common/Scripts/FusionCharts/" + tipoGrafico + ".swf", "myChartId-2", "700", "300", "0"); //agregado wapumayta 30/07/2014
        myChart.setJSONData(DatosGrafico[tipoDato]["DatosDetalle"][id]);
        myChart.setTransparent(true);
        myChart.render("Grafico_SumarioContenido");
    }
    else {
        $("#Grafico_SumarioContenido").updateFusionCharts({ dataSource: DatosGrafico[tipoDato]["DatosDetalle"][id], dataFormat: "json", swfUrl: tipoGrafico });
    }


    //    chart = NuevoGrafico("Grafico_Sumario", 580, 320, tipoGrafico, DatosGrafico[tipoDato]["Titulo"], DatosGrafico[tipoDato]["SubTitulo2"], DatosGrafico[tipoDato]["DatosDetalle"][id],
    //                            DatosGrafico[tipoDato]["labelPiePagina"], parseInt(DatosGrafico[tipoDato]["LeftPiePagina"]), DatosGrafico[tipoDato]["labelCantidad"],
    //                            DatosGrafico[tipoDato]["simboloCantidad"], DatosGrafico[tipoDato]["unidadCantidad"], DatosGrafico[tipoDato]["numeroDecimales"], DatosGrafico[tipoDato]["NumElementos2"], id, 
    //                            tipoDato);
}

$(function () {

    $(window).resize(function (a, c) {
        DimPosElementos();
    });
    DimPosElementos();
    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        //alert("Ancho: " + Ancho + "\nAlto: " + Alto);
        //$("#Grafico_Sumario").css("widht", (Alto - 40) + "px");
        $("#Grafico_Sumario").css("height", (Alto - 40) + "px");
    }


    FusionCharts.setCurrentRenderer('javascript');

    window.parent.$('#ddlTipoGrafico').empty();
    //window.parent.$('#ddlTipoGrafico').append('<option value="Area2D">Area</option>');
    //window.parent.$('#ddlTipoGrafico').append('<option value="Pareto2D">Pareto 2D</option>');
    //window.parent.$('#ddlTipoGrafico').append('<option value="Pareto3D" >Pareto 3D</option>');
    window.parent.$('#ddlTipoGrafico').append('<option value="Column2D">Columna 2D</option>');
    window.parent.$('#ddlTipoGrafico').append('<option value="Column3D" selected="selected">Columna 3D</option>');
    window.parent.$('#ddlTipoGrafico').append('<option value="Doughnut2D">Dona 2D</option>');
    window.parent.$('#ddlTipoGrafico').append('<option value="Doughnut3D">Dona 3D</option>');
    window.parent.$('#ddlTipoGrafico').append('<option value="Line">Linea</option>');
    window.parent.$('#ddlTipoGrafico').append('<option value="Pie2D">Pie 2D</option>');
    window.parent.$('#ddlTipoGrafico').append('<option value="Pie3D">Pie 3D</option>');
    window.parent.$('#ddlTipoGrafico').append('<option value="SSGrid">Grilla</option>');

    window.parent.$("#ddlTipoGrafico").change(function () {
        //alert("tipografico: " + TipoActual + "\nIdseleccion: " + idSeleccion);
        if (TipoActual == 1) {
            GraficaPrincipal();
        }
        else {
            GraficaDetalle(idSeleccion);
        }
    });

    window.parent.$("#ddlTipoDato").change(function () {
        TipoActual = $(this).val();
        ListarSumario();
    });

    window.parent.$("#ddlNumeroRegistro").change(function () {
        ListarSumario();
    });

    ListarSumario();

    function ListarSumario() {
        $.ajax({
            type: "POST",
            dataType: "json",
            data: "{'oCriterio': '" + JSON.stringify(window.parent.parent.Criterio) + "'," +
                    "'inNumReg': '" + window.parent.$("#ddlNumeroRegistro").val() + "'," +
                    "'inTipDat': '" + window.parent.$("#ddlTipoDato").val() + "'," +
                    "'inTipSum':'" + $('#hdfTipoSumario').val() + "'," +
                    "'vcValSum': '" + $('#hdfValorSumario').val() + "'}", //Tabla
            contentType: "application/json; charset=utf-8",
            url: "Con_SumarioGrafico.aspx/ListarSumario",
            success: function (result) {
                var DatosResultado = JSON.parse(result.d[TipoActual].Datos);
                //if (result.d.length != 0) {
                if (DatosResultado.data.length != 0) {
                    DatosGrafico = result.d;
                    GraficaPrincipal();
                }
                else {
                    $("#Grafico_Sumario *").remove();
                    $("#Grafico_Sumario").empty();
                    $("#Grafico_Sumario").append('<div style="font-size:medium; color:Gray;">No hay datos para mostrar.</div> ');
                }
            },
            cache: false,
            error: function (XMLHttpRequest, textStatus, errorThrown) { alerta(errorThrown); }
        });
    }
});