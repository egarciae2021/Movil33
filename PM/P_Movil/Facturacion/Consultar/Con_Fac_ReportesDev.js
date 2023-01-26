var DataItems = [
    {
        id: 1,
        text: 'Líneas no facturadas',
        description: 'Reporte que muestra el detalle de líneas que no están incluidas en la factura del periodo seleccionado.'
    },
    {
        id: 2,
        text: 'Líneas facturadas con exceso (%)',
        description: 'Reporte que muestra líneas que han superado su monto asignado en la factura del periodo seleccionado.'
    },
    {
        id: 3,
        text: 'Líneas por validar (Líneas que no han generado consumo)',
        description: 'Reporte que muestra líneas que no han generado consumo pero forman parte del pago en la factura del periodo seleccionado.'
    },
    {
        id: 5,
        text: 'Facturación: Consumo Datos',
        description: 'Reporte que muestra las líneas que han generado consumo de Datos.'
    },
    {
        id: 4,
        text: 'Facturación: Líneas por Grupo de Conceptos',
        description: 'Reporte que muestra las líneas con agrupamientos por grupo de conceptos.'
    }
];


$(function () {
    //#region Inicializar controles
    ////$("#ddlReportes").kendoDropDownList({
    ////    change: function (e) {
    ////        var i, ReporteSeleccionado = null;
    ////        for (i = 0; i < arReportes.length; i++) {
    ////            if (arReportes[i].CodigoReporte == this.value()) {
    ////                ReporteSeleccionado = arReportes[i];
    ////            }
    ////        }
    ////        fnMostrarPanelParametros(ReporteSeleccionado);
    ////    }
    ////});

    for (var i = 0; i < 100; i++) {
        $('#Porcentaje').append($("<option></option>").attr("value", (i + 1).toString()).text((i + 1).toString()));
    }


    $("#TipoServicio").append($("<option></option>").attr("value", "-1").text("(Todos)"));
    $("#TipoServicio").append($("<option></option>").attr("value", "3").text("Voz"));
    $("#TipoServicio").append($("<option></option>").attr("value", "4").text("Mensajes de Texto"));
    $("#TipoServicio").append($("<option></option>").attr("value", "5").text("Datos"));

    $('#Porcentaje').val(50);
    $("#Porcentaje").select2();
    $("#TipoServicio").select2();
    
    var DatosReportes = [];
    for (i = 0; i <= DataItems.length - 1; i++) {
        if (DataItems[i].text == "Líneas que no han generado consumo" || DataItems[i].text == "Facturación: Consumo Datos") {
            if ($("#hdfMostrarOpcConsumo").val() == "1") {
                DatosReportes.push(DataItems[i]);
            }
        }
        else {
            DatosReportes.push(DataItems[i]);
        }
    }
    

    $('#ddlReportes').select2({
        data: DatosReportes,
        escapeMarkup: function (markup) { return markup; },
        templateResult: formatRepo
    }).on('change', function (e) {
        $("#ifReporteFormato").hide();
        $("#ifReporteFormato").attr("src", "");

        if (this.value == "2") {
            $("#FiltroExceso").show();
        }
        else {
            $("#FiltroExceso").hide();
        }

        if (this.value == "3") {
            $("#FiltroLineasSinConsumo").show();
        }
        else {
            $("#FiltroLineasSinConsumo").hide();
        }
    });
    ////$("#ddlReportes").change(function (e) {
    ////    var i, ReporteSeleccionado = null;
    ////    for (i = 0; i < arReportes.length; i++) {
    ////        if (arReportes[i].CodigoReporte == $(this).val()) {
    ////            ReporteSeleccionado = arReportes[i];
    ////        }
    ////    }
    ////    fnMostrarPanelParametros(ReporteSeleccionado);
    ////});

    var today = new Date();
    $(".Periodo").kendoDatePicker({
        culture: "es-PE",
        animation: false,
        start: "year",
        depth: "year",
        format: "MM/yyyy",
        max: new Date(today.setDate(today.getDate())),
        value: new Date(today.setDate(today.getDate()))
    });

    fnFixKendoStyle();
    //#endregion

    //#region Eventos
    $("#bntGenerarReporte").click(function () {

        var vPeriodo = $("#REP00_Periodo").val().split('/');
        var Periodo = vPeriodo[0] + Right(vPeriodo[1], 2);
        if (vPeriodo.length != 2) {
            alerta("Debe seleccionar el periodo");
            return;
        }
        $("#dvParametros").show();

        var Exceso = $("#Porcentaje").val();
        var GrupoServicio = $("#TipoServicio").val();

        var pagina = "../../Administrar/Adm_ReporteDevExpress.aspx?vcTab=FACTURACION&vcTipRep=" + $("#ddlReportes").val() + "&P=" + Periodo + "&E=" + Exceso + "&GS=" + GrupoServicio;
        $("#ifReporteFormato").attr("src", pagina);
        $("#ifReporteFormato").show();

        ////var codrep = $("#ddlReportes").val();
        ////if (codrep == -1) {
        ////    alerta("Seleccione un reporte");
        ////} else if (codrep == -2) {
        ////    alerta("No existe ningún reporte configurado");
        ////} else {
        ////    var i;
        ////    for (i = 0; i < arReportes.length; i++) {
        ////        if (arReportes[i].CodigoReporte == codrep) {
        ////            fnEjecutarReporte(arReportes[i]);
        ////        }
        ////    }
        ////}
    });
    //#endregion


    $(window).resize(function (a, c) {
        DimPosElementos();
    });
    DimPosElementos();
    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        $("#ifReporteFormato").css("height", Alto - 150);
    }



});


function fnFixKendoStyle() {
    $(".k-dropdown,.Periodo").css("padding", "0px").css("border", "0px");
}

function formatRepo(repo) {
    if (repo.loading) {
        return repo.text;
    }
    var markup = "<div class='select2-result-repository clearfix'>" +
                    "<table width='100%' cellpadding='0' cellspacing='0' border='0' style='padding-bottom: 1px;'>" +
                    "<tr><td style='width:20px;'><img src='../../../Common/Images/pdf.png'/></td><td>" +
                        "<div class='select2-result-repository__meta'>" +
                            "<div class='select2-result-repository__title'>" + repo.text + "</div>";

    if (repo.description) {
        markup += "<div class='select2-result-repository__description'><b><u>" + "Detalle:</u></b>&nbsp;<i>" + repo.description + "</i></div>";
    }


    ////markup += "<div class='select2-result-repository__statistics'>" +
    ////  "<div class='select2-result-repository__forks'><i class='fa fa-flash'></i> " + "otro dato1" + " Forks</div>" +
    ////  "<div class='select2-result-repository__stargazers'><i class='fa fa-star'></i> " + "otro dato2" + " Stars</div>" +
    ////  "<div class='select2-result-repository__watchers'><i class='fa fa-eye'></i> " + "otro dato3" + " Watchers</div>" +
    ////"</div>" +

    markup += "</td></tr></table></div></div>";

    return markup;
}

function fnMostrarMensajeSinDatos() {
    $("#ifReporteFormato").hide();
    alerta("No se encontró información con los criterios proporcionados.");
}