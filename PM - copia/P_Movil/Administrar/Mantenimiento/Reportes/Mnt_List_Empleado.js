var vcTipoReporte = "";
var arDatosMostrar = [];
var DatosMostrar = "";
var oCulturaUsuario;

function ListarGrupoEmpleado() {
    //alert($("#ddlTipoLinea").val());
    $('#ddlGrupoEmpleado option').remove();
    $.ajax({
        type: "POST",
        url: "Mnt_List_Empleado.aspx/ObtenerListaGrupoEmpleado",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var Valores = resultado.d;
            for (var i = 0; i < Valores.length; i++) {
                $('#ddlGrupoEmpleado').append($('<option>', {
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

$(function () {

    oCulturaUsuario = window.top.oCulturaUsuario;

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


    $('#ddlCentroCosto').select2();
    $('#ddlSucursal').select2();
    $('#ddlModelo').select2();
    $('#ddlTipoLinea').select2();
    $('#ddlGrupoEmpleado').select2();

    MostrarCombos();
    ListarGrupoEmpleado();

    //    GenerarReporteEmpleados();
    //    load();

    $("#btnMostrar").button();
    $("#btnMostrar").click(function () {
        load();
    });

    function load() {
        //inicio datos mostrar
        arDatosMostrar = [];
        arDatosMostrar.push($('#ddlCentroCosto').val());
        arDatosMostrar.push($('#hdfCodOrganizacion').val());
        arDatosMostrar.push($('#ddlSucursal').val());
        arDatosMostrar.push($('#ddlModelo').val());
        arDatosMostrar.push($('#ddlTipoLinea').val());
        arDatosMostrar.push($('#ddlGrupoEmpleado').val());
        DatosMostrar = arDatosMostrar.join('*');
        GenerarReporteEmpleados();
    }

    function GenerarReporteEmpleados() {
        DatosMostrar = arDatosMostrar.join('*');
        DatosMostrar = DatosMostrar.replace(/<Todos>/g, '-1');

        //Validar Cantidad de Registros...
        ValidarCantidadRegistros(
            DatosMostrar,
            function () {
                pagina = "ReporteDevExpress.aspx?Tipo=ReporteEmpleado&Detalle=" + DatosMostrar;
                $("#ifReporteDevExpress").attr("src", pagina);
            },
            function (TotalRegistros) {
                confirmacion("La información solicitada presenta " + FormatoNumero(TotalRegistros, oCulturaUsuario, true) + " registros.<br><br>¿Desea continuar?", function () {
                    pagina = "ReporteDevExpress.aspx?Tipo=ReporteEmpleado&Detalle=" + DatosMostrar;
                    $("#ifReporteDevExpress").attr("src", pagina);
                }, null, "Confirmación");
            });
    }


    $("#btnLimpiar").button();
    $("#btnLimpiar").click(function () {
        //inicio datos mostrar
        //ListarGrupoEmpleado();
        $('#ddlCentroCosto').val(-1).trigger('change');
        $("#txtNomOrganizacion").val("<Todos>").trigger('change');
        $("#hdfCodOrganizacion").val("-1").trigger('change');
        $('#ddlSucursal').val(-1).trigger('change');
        $('#ddlModelo').val(-1).trigger('change');
        $('#ddlTipoLinea').val(-1).trigger('change');
        $('#ddlGrupoEmpleado').val(-1).trigger('change');

        //validacion para licensia de linea
        if ($("#hdfOpcionPrincipal").val() != "0") {

            $("#ddlTipoLinea").attr("disabled", "disabled");
            $('#ddlTipoLinea').val(1).trigger('change');
            $('#ddlTipoLinea').change();
        }
        //****************
        $('#ddlGrupoEmpleado').val(-1).trigger('change');
        //fin datos exportacion

    });

    $(".dvCargandoMnt").hide();

});

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();

    $("#ifReporteDevExpress").css("height", Alto - 200);
}

function IngresarAreaUnico(area) {//Carga el area seleccionadade
    $("#txtNomOrganizacion").val(area.vcNomOrg.split("=")[1]);
    $("#hdfCodOrganizacion").val(area.P_inCodOrg);
}

function MostrarCombos() {
    $('#ddlCentroCosto').val(-1).trigger('change');
    $("#txtNomOrganizacion").val("<Todos>").trigger('change');
    $("#hdfCodOrganizacion").val("-1").trigger('change');
    $('#ddlSucursal').val(-1).trigger('change');
    $('#ddlModelo').val(-1).trigger('change');
    $('#ddlTipoLinea').val(-1).trigger('change');
    $('#ddlGrupoEmpleado').val(-1).trigger('change');
    //validacion para licensia de linea
    if ($("#hdfOpcionPrincipal").val() != "0") {
        $("#ddlTipoLinea").attr("disabled", "disabled");
        $('#ddlTipoLinea').val(1).trigger('change');
        $('#ddlTipoLinea').change();
    }
    //****************

}

function ddlTipoLinea_change() {
    var valor2 = $("#ddlTipoLinea").val();
    if (valor2 == -1) {
        ListarGrupoEmpleado();
    }
    else {
        $('#ddlGrupoEmpleado option').remove();
        $.ajax({
            type: "POST",
            url: "Mnt_List_Empleado.aspx/ObtenerGrupoEmpleadoTipo",
            data: "{'idLineatipo': '" + $('#ddlTipoLinea').val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (resultado) {
                var Valores = resultado.d;
                for (var i = 0; i < Valores.length; i++) {
                    $('#ddlGrupoEmpleado').append($('<option>', {
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

function ValidarCantidadRegistros(DatosMostrar, fnSuccess, fnValidation) {

    $.ajax({
        type: "POST",
        url: "Mnt_List_Empleado.aspx/ObtenerCantidadRegistros",
        data: "{'DatosMostrar': '" + DatosMostrar + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var TotalRegistros = parseFloat(resultado.d);
            if (TotalRegistros > 2000) {
                if (typeof fnValidation != 'undefined') {
                    fnValidation(TotalRegistros);
                }
            }
            else {
                if (typeof fnSuccess != 'undefined') {
                    fnSuccess();
                }
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}