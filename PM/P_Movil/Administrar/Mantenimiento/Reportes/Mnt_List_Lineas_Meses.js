var vcTipoReporte = "";
var arDatosMostrar = [];
var DatosMostrar = "";

function ListarPlanes() {
    //alert($("#ddlTipoLinea").val());
    $('#ddlPlan option').remove();
    $.ajax({
        type: "POST",
        url: "Mnt_List_Lineas_Meses.aspx/ObtenerListaPlanes",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var Valores = resultado.d;
            for (var i = 0; i < Valores.length; i++) {
                $('#ddlPlan').append($('<option>', {
                    value: Valores[i],
                    text: Valores[i]
                }));
            }
            $("#ddlPlan").val("<Todos>");
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

$(function () {

    ValidarNumeroEnCajaTexto("txtNroMeses", ValidarEnteroPositivo);
    ValidarNumeroEnCajaTexto("txtLinea", ValidarEnteroPositivo);


    $('#ddlPlan').select2();
    $('#ddlTipoLinea').select2();
    $('#ddlComboDescripcion').select2();
    $('#ddlComboDinamico').select2();


    var ValorPorDefecto = [{
        id: -1,
        text: '<Todos>'
    }];

    $('#ddlEmpleado').select2({
        minimumInputLength: 2,
        data: ValorPorDefecto,
        ajax: {
            type: "POST",
            url: 'Mnt_List_Lineas_Meses.aspx/ObtenerEmpleados',
            data: function (params) {
                return "{'Filtro':'" + params.term + "'}";
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            processResults: function (results, params) {
                data = results.d;
                return {
                    results: data.results,
                };
            },
        }
    });



    $(window).resize(function () {
        DimPosElementos();
    });
    DimPosElementos();


    $("#btnAgregarOrga").click(function () {
        var $width = 740;
        var $height = 505;
        var $Pagina = '../../../../P_Movil/Consultar/Con_SeleccionArea.aspx?Tipo=1&Multiple=0';
        $("#ifArea").attr("src", $Pagina);
        Modal = $('#dvArea').dialog({
            title: "Seleccionar área",
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
    });

    MostrarCombos();
    ListarPlanes();
    //    GenerarReporteEmpleados();
    //    load();

    $("#btnMostrar").button();
    $("#btnMostrar").click(function () {
        load();
    });



    function load() {
        //inicio datos mostrar

        arDatosMostrar = [];
        arDatosMostrar.push($('#ddlEmpleado').val());
        arDatosMostrar.push($('#hdfCodOrganizacion').val());
        arDatosMostrar.push($('#txtLinea').val());
        arDatosMostrar.push($('#ddlComboDescripcion').val());
        arDatosMostrar.push($('#ddlComboDinamico').val());
        arDatosMostrar.push($('#ddlTipoMes').val());
        arDatosMostrar.push($('#ddlTipoMesEq').val());
        arDatosMostrar.push($('#txtNroMeses').val());
        arDatosMostrar.push($('#txtNroMesesEq').val());
        arDatosMostrar.push($('#ddlTipoLinea').val());
        arDatosMostrar.push($('#ddlPlan').val());
        DatosMostrar = arDatosMostrar.join('*');
        //fin datos exportacionç

        GenerarReporteEmpleados();
    }

    function GenerarReporteEmpleados() {

        DatosMostrar = DatosMostrar.replace(/<Todos>/g, '-1');
        DatosMostrar = DatosMostrar.replace(/<Seleccione>/g, '-1');


        pagina = "ReporteDevExpress.aspx?Tipo=ReporteLineaContrato&Detalle=" + DatosMostrar;

        $("#ifReporteDevExpress").attr("src", pagina);

    }

    $("#btnLimpia").button();
    $("#btnLimpia").click(function () {
        //inicio datos mostrar

        //alert('x');

        var valor = $("#ddlComboDescripcion").val();
        if (valor > "1" || valor === false) {
            $("#ddlComboDinamico").attr('disabled', true);
        }

        ListarPlanes();

        $('#ddlEmpleado').val(-1).trigger('change');
        
        $("#txtLinea").val("");
        $("#ddlTipoMes").val("-1");
        $("#ddlTipoMesEq").val("-1");
        $("#txtNroMeses").val("");
        $("#txtNroMesesEq").val("");

        $("#txtNomOrganizacion").val("<Todos>");
        $("#hdfCodOrganizacion").val("-1");

        $('#ddlComboDescripcion').val(-1).trigger('change');

        $('#ddlComboDinamico option').remove();

        $('#ddlTipoLinea').val(-1).trigger('change');


        //validacion para licensia de linea
        //if ($("#hdfOpcionPrincipal").val() != "0") {
            //$("#ddlTipoLinea").attr("disabled", "disabled");
            $('#ddlTipoLinea').val(-1).trigger('change');
            $('#ddlTipoLinea').change();
        //}
        //****************

        $('#ddlPlan').val(-1).trigger('change');

        //fin datos exportacionç  

    });


    $(".dvCargandoMnt").hide();
});

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();

    $("#ifReporteDevExpress").css("height", Alto - 145);
}


function IngresarAreaUnico(area) {//Carga el area seleccionadade

    $('#ddlNivel').val(-1);
    $($('input[name=ddlNivel_input]')[0]).val("<Todos>");

    $("#txtNomOrganizacion").val(area.vcNomOrg.split("=")[1]);
    $("#hdfCodOrganizacion").val(area.P_inCodOrg);

}

function MostrarCombos() {

    $("#txtNomOrganizacion").val("<Todos>");
    $("#hdfCodOrganizacion").val("-1");

    $('#ddlComboDescripcion').val(-1).trigger('change');
    $('#ddlTipoLinea').val(-1).trigger('change');

    //validacion para licencia de linea
    //if ($("#hdfOpcionPrincipal").val() != "0") {
        //$("#ddlTipoLinea").attr("disabled", "disabled");
        $('#ddlTipoLinea').val(-1).trigger('change');
        $('#ddlTipoLinea').change();
    //}
    //****************
}

function ddlNivel_change() {
    $("#txtNomOrganizacion").val("<Todos>");
    $("#hdfCodOrganizacion").val("-1");
}

function ddlComboDescripcion_change() {
    //alert($("#ddlComboDescripcion").val());

    $('#ddlComboDinamico option').remove();
    $.ajax({
        type: "POST",
        url: "Mnt_List_Lineas.aspx/ObtenerValoresDinamicos",
        data: "{'IdCampo': '" + $('#ddlComboDescripcion').val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var Valores = resultado.d;
            for (var i = 0; i < Valores.length; i++) {
                $('#ddlComboDinamico').append($('<option>', {
                    value: Valores[i],
                    text: Valores[i]
                }));
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

    $("#ddlComboDescripcion").on("change", function () {
        var valor = $("#ddlComboDescripcion").val();
        if (valor > "1" || valor === true) {
            // habilitamos
            $("#ddlComboDinamico").attr('disabled', false);
        } else if (valor < "1" || valor === false) {
            // deshabilitamos
            $("#ddlComboDinamico").attr('disabled', true);
        }
    });
}

function ddlTipoLinea_change() {
    var valor2 = $("#ddlTipoLinea").val();
    if (valor2 == -1) {
        ListarPlanes();
    }
    else {
        $('#ddlPlan option').remove();
        $.ajax({
            type: "POST",
            url: "Mnt_List_Lineas_Meses.aspx/ObtenerPlanesTipo",
            data: "{'idLineatipo': '" + $('#ddlTipoLinea').val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (resultado) {
                var Valores = resultado.d;
                for (var i = 0; i < Valores.length; i++) {
                    $('#ddlPlan').append($('<option>', {
                        value: Valores[i],
                        text: Valores[i]
                    }));
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
}


