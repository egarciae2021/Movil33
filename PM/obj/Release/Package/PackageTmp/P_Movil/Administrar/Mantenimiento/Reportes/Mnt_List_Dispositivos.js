var vcTipoReporte = "";
var arDatosMostrar = [];
var DatosMostrar = "";

$(function () {

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
    
    MostrarCombosKendo();

//    GenerarReporteEmpleados();
//    load();

    $("#btnMostrar").button();
    $("#btnMostrar").click(function () {
        load();
    });

    function load() {
        //inicio datos mostrar
        arDatosMostrar = [];

        arDatosMostrar.push($('#ddlModelo').val());
        arDatosMostrar.push($('#ddlEmpleado').val());
        arDatosMostrar.push($('#ddlEstado').val());
        arDatosMostrar.push($('#hdfCodOrganizacion').val());
        arDatosMostrar.push($('#ddlNivel').val());
        arDatosMostrar.push($('#ddlSucursal').val());
        arDatosMostrar.push($('#ddlLinea').val());
        arDatosMostrar.push($('#ddlTipoServicio').val());
        arDatosMostrar.push($('#ddlSoporta').val());
        arDatosMostrar.push($('#ddlComboDescripcion').val());
        arDatosMostrar.push($('#ddlComboDinamico').val());
        DatosMostrar = arDatosMostrar.join('*');
        //fin datos exportacionç

        GenerarReporteEmpleados();
    }

    function GenerarReporteEmpleados() {
        DatosMostrar = arDatosMostrar.join('*');
        DatosMostrar = DatosMostrar.replace(/<Todos>/g, '-1');
        DatosMostrar = DatosMostrar.replace(/<Seleccione>/g, '-1');

        pagina = "ReporteDevExpress.aspx?Tipo=ReporteDispositivo&Detalle=" + DatosMostrar;

        if (pagina) {

        }

        $("#ifReporteDevExpress").attr("src", pagina);
    }

    $("#btnLimpiar").button();
    $("#btnLimpiar").click(function () {
        //inicio datos mostrar
        arDatosMostrar = [];

        $('#ddlModelo').val(-1);
        $($('input[name=ddlModelo_input]')[0]).val("<Todos>")

        $('#ddlEstado').val(-1);
        $($('input[name=ddlEstado_input]')[0]).val("<Todos>")

        $('#ddlNivel').val(-1);
        $($('input[name=ddlNivel_input]')[0]).val("<Todos>")

        $('#ddlSucursal').val(-1);
        $($('input[name=ddlSucursal_input]')[0]).val("<Todos>")

        $('#ddlLinea').val(-1);
        $($('input[name=ddlLinea_input]')[0]).val("<Todos>")

        $('#ddlTipoServicio').val(-1);
        $($('input[name=ddlTipoServicio_input]')[0]).val("<Todos>")

        $('#ddlSoporta').val(-1);
        $($('input[name=ddlSoporta_input]')[0]).val("<Todos>")

        $("#txtNomOrganizacion").val("<Todos>");
        $("#hdfCodOrganizacion").val("-1");

        $('#ddlComboDescripcion').val(-1);
        $($('input[name=ddlComboDescripcion_input]')[0]).val("<Todos>")
        $('#ddlComboDinamico option').remove();
        ActivarCombokendo("#ddlComboDinamico");

        arDatosMostrar.push(-1);
        arDatosMostrar.push(-1);
        arDatosMostrar.push(-1);
        arDatosMostrar.push(-1);
        arDatosMostrar.push(-1);
        arDatosMostrar.push(-1);
        arDatosMostrar.push(-1);
        arDatosMostrar.push(-1);
        arDatosMostrar.push(-1);
        arDatosMostrar.push(-1);
        arDatosMostrar.push(-1);

        DatosMostrar = arDatosMostrar.join('*');
        //fin datos exportacionç

    });

    $(".dvCargandoMnt").hide();

});

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();

    $("#ifReporteDevExpress").css("height", Alto - 245);
}

function IngresarAreaUnico(area) {//Carga el area seleccionadade

    $('#ddlNivel').val(-1);
    $($('input[name=ddlNivel_input]')[0]).val("<Todos>")

    $("#txtNomOrganizacion").val(area.vcNomOrg.split("=")[1]);
    $("#hdfCodOrganizacion").val(area.P_inCodOrg);
   
}


function MostrarCombosKendo() {

    ActivarCombokendo("#ddlEstado");
    $("#ddlEstado").data("kendoComboBox").text("<Todos>");

    ActivarCombokendo("#ddlModelo");
    $("#ddlModelo").data("kendoComboBox").text("<Todos>");

    ActivarCombokendo("#ddlEmpleado");
    $("#ddlEmpleado").data("kendoComboBox").text("<Todos>");

    ActivarCombokendo("#ddlNivel", ddlNivel_change);
    $("#ddlNivel").data("kendoComboBox").text("<Todos>");

    ActivarCombokendo("#ddlSucursal");
    $("#ddlSucursal").data("kendoComboBox").text("<Todos>");

    ActivarCombokendo("#ddlLinea");
    $("#ddlLinea").data("kendoComboBox").text("<Todos>");

    ActivarCombokendo("#ddlTipoServicio");
    $("#ddlTipoServicio").data("kendoComboBox").text("<Todos>");

    ActivarCombokendo("#ddlSoporta");
    $("#ddlSoporta").data("kendoComboBox").text("<Todos>");

    $("#txtNomOrganizacion").val("<Todos>");
    $("#hdfCodOrganizacion").val("-1");

    ActivarCombokendo("#ddlComboDescripcion", ddlComboDescripcion_change);
    $("#ddlComboDescripcion").data("kendoComboBox").text("<Seleccione>");
    ActivarCombokendo("#ddlComboDinamico");

}

function ActivarCombokendo(Control, EventoChange) {
    $(Control).removeClass("ui-widget-content ui-corner-all");
    $(Control).css("padding", "0px");
    $(Control).css("margin", "-1px");
    $(Control).kendoComboBox({
        filter: "contains",
        suggest: true,
        height: 200,
        //dataSource: dataDDL,
        dataTextField: "text",
        dataValueField: "value",
        change: EventoChange
    });

    var combobox = $(Control).data("kendoComboBox");
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
            ActivarCombokendo("#ddlComboDinamico");
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}