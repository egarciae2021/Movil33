var vcTipoReporte = "";
var arDatosMostrar = [];
var DatosMostrar = "";

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
            //ActivarCombokendo("#ddlGrupoEmpleado");
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

$(function () {

    $(window).resize(function () {
        DimPosElementos();
    });
    DimPosElementos();
  
    $("#btnAgregarOrga").click(function () {
        var $width = 740;
        var $height = 405;
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

    //MostrarCombosKendo();
    ListarGrupoEmpleado();

    //    GenerarReporteEmpleados();
    //    load();

    $("#txtFechaIni").keypress(ValidarFecha);
    $("#txtFechaFin").keypress(ValidarFecha);

    $("#txtFechaIni").val($("#hdfdaFechaIni").val());
    $("#txtFechaFin").val($("#hdfdaFechaFin").val());

    $("#txtFechaIni").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy',
        maxDate: new Date(),
        onSelect: function (dateText) {
            $("#txtFechaFin").datepicker('option', 'minDate', dateText);
        }
    });
    $("#txtFechaFin").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy',
        maxDate: new Date(),
        onSelect: function (dateText) {
            $("#txtFechaIni").datepicker('option', 'maxDate', dateText);
        }
    });

    var mTipoSolicitud = $("#ddlTipoSolicitud").kendoMultiSelect().data("kendoMultiSelect");
    var mUsuario = $("#ddlUsuario").kendoMultiSelect().data("kendoMultiSelect");
    var mEstadoAprobacion = $("#ddlEstadoAprobacion").kendoMultiSelect().data("kendoMultiSelect");
    var mEstadoProceso = $("#ddlEstadoProceso").kendoMultiSelect().data("kendoMultiSelect");

    //$("#btnMostrar").click(function () {
    //
    //
    //    //alert(vcFiltroTipoSolicitud.slice(0, -1));
    //});



    $("#btnMostrar").button();
    $("#btnMostrar").click(function () {
        load();
    });

    function load() {
        
        //inicio datos mostrar
        arDatosMostrar = [];
        var vcFiltroTipoSolicitud = mTipoSolicitud.value() + ",";
        var vcFiltroUsuarios = mUsuario.value() + "',";
        var vcFiltroEstadoProceso = mEstadoProceso.value() + ",";
        var vcFiltroEstadoAprobacion = mEstadoAprobacion.value() + ",";

        arDatosMostrar.push(vcFiltroTipoSolicitud);
        arDatosMostrar.push(vcFiltroUsuarios);
        arDatosMostrar.push(vcFiltroEstadoProceso);
        arDatosMostrar.push(vcFiltroEstadoAprobacion);
        arDatosMostrar.push($("#txtFechaIni").val());
        arDatosMostrar.push($("#txtFechaFin").val());
        arDatosMostrar.push($("#hdfCodOrganizacion").val());
        DatosMostrar = arDatosMostrar.join('*');
        GenerarReporteSolicitudFiltroMultiple();
    }

    function GenerarReporteSolicitudFiltroMultiple() {
        DatosMostrar = arDatosMostrar.join('*');
        DatosMostrar = DatosMostrar.replace(/<Todos>/g, '-1');
        pagina = "ReporteDevExpress.aspx?Tipo=ReporteSolicitud&Detalle=" + DatosMostrar;

        $("#ifReporteDevExpress").attr("src", pagina);
    }

    $("#btnLimpiar").button();
    $("#btnLimpiar").click(function () {
        //inicio datos mostrar
        ListarGrupoEmpleado();

        $("#ddlCentroCosto").data("kendoComboBox").text(''); 
        $('#ddlCentroCosto').val(-1);
        $($('input[name=ddlCentroCosto_input]')[0]).val("<Todos>");       

        //$('#ddlOrganizacion').val(-1);
        //$($('input[name=ddlOrganizacion_input]')[0]).val("<Todos>")
        $("#txtNomOrganizacion").val("<Todos>");
        $("#hdfCodOrganizacion").val("-1");

        $("#ddlSucursal").data("kendoComboBox").text('');
        $('#ddlSucursal').val(-1);
        $($('input[name=ddlSucursal_input]')[0]).val("<Todos>");

        $("#ddlModelo").data("kendoComboBox").text('');
        $('#ddlModelo').val(-1);
        $($('input[name=ddlModelo_input]')[0]).val("<Todos>");

        $("#ddlTipoLinea").data("kendoComboBox").text('');
        $('#ddlTipoLinea').val(-1);
        $($('input[name=ddlTipoLinea_input]')[0]).val("<Todos>");       

        //validacion para licensia de linea
        if ($("#hdfOpcionPrincipal").val() != "0") {
          
            $("#ddlTipoLinea").attr("disabled", "disabled");
            $("#ddlTipoLinea").kendoComboBox({ enable: true });
            $('#ddlTipoLinea').val(1);
            $("#ddlTipoLinea").data("kendoComboBox").value(1);
            $('#ddlTipoLinea').change();
        }
        //****************


        $($('input[name=ddlGrupoEmpleado_input]')[0]).val("<Todos>");
        $('#ddlGrupoEmpleado').val(-1);
        //ActivarCombokendo("#ddlGrupoEmpleado");
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


function MostrarCombosKendo() {

    //ActivarCombokendo("#ddlOrganizacion", dataDDLOrganizacion);
    //$("#ddlOrganizacion").data("kendoComboBox").text("<Todos>");
    $("#txtNomOrganizacion").val("<Todos>");
    $("#hdfCodOrganizacion").val("-1");
    
    ActivarCombokendo("#ddlCentroCosto");
    $("#ddlCentroCosto").data("kendoComboBox").text("<Todos>");
    
    ActivarCombokendo("#ddlSucursal");
    $("#ddlSucursal").data("kendoComboBox").text("<Todos>");
    
    ActivarCombokendo("#ddlModelo");
    $("#ddlModelo").data("kendoComboBox").text("<Todos>");

    ActivarCombokendo("#ddlTipoLinea", ddlTipoLinea_change);
    $('#ddlTipoLinea').val(-1);
    $($('input[name=ddlTipoLinea_input]')[0]).val("<Todos>");
    ActivarCombokendo("#ddlGrupoEmpleado");


    //validacion para licensia de linea
    if ($("#hdfOpcionPrincipal").val() != "0") {

        $("#ddlTipoLinea").attr("disabled", "disabled");
        $("#ddlTipoLinea").kendoComboBox({ enable: true });
        $('#ddlTipoLinea').val(1);
        $("#ddlTipoLinea").data("kendoComboBox").value(1);
        $('#ddlTipoLinea').change();
    }
    //****************

}

function ActivarCombokendo(Control, EventoChange) {
    $(Control).removeClass("ui-widget-content ui-corner-all");
    $(Control).css("padding", "0px");
    $(Control).css("margin", "-1px");
    $(Control).kendoComboBox({
        filter: "contains",
        suggest: true,
        height: 200,
//        dataSource: dataDDL,
        dataTextField: "text",
        dataValueField: "value",
        change: EventoChange
    });

    var combobox = $(Control).data("kendoComboBox");
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
                ActivarCombokendo("#ddlGrupoEmpleado");
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
}