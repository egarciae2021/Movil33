var altoPagina = 0;


$(document).on("ready", function () {
    kendo.culture("es-PE");
    altoPagina = $(window).height();
    var AltoGrilla = 0;
    AltoGrilla = altoPagina - 320;
    if (AltoGrilla <= 0) {
        AltoGrilla = 250;
    }

    $("#ddlSolicitud").bind('change', function () {

        var IdSolicitud = this.value;
        var IdEmpleado = $("#lblCodigoEmpleado").text();
        load(IdSolicitud, IdEmpleado);

    });

    Inicio();
    function Inicio() {
        $("#tbExportar").hide();
        $("#btnPdf").hide();
        var admin = $("#hdfAdmin").val();
        $("#TextBox1").hide();
        if (admin == 0 && $("#hdfOrganizacion").val() == "") {
            $("#tbInfoUsuario").hide();
            $("#toolbar").hide();
        }

        //JHERRERA 20141015: Validación de datos por defecto
        var _valor = $("#hdfEmpleado").val();
        if (_valor != "") {
            buscarValor_bpTecnicoResponsable = _valor;
            validarDatosAjax_bpTecnicoResponsable = true;
            $('#bpTecnicoResponsable_grid').trigger('reloadGrid');
            if ($("#hdfTecnicoResponsable").val() != "") {
                cargar_DatosEmpleado(_valor);
            }
        }
        //-->
    }

    $("#crono").kendoGrid({
        dataSource: {},
        groupable: false,
        sortable: true,
        navigatable: true,
        columns: [
                            { field: "InNumCuota", title: "Cuota", width: "50px", attributes: { style: "text-align: center;" }, headerAttributes: { "class": "table-header-cell", style: "text-align: center; width: 50px;"} },
                            { field: "VcPeriodo", title: "Fecha de Pago", width: "100px", attributes: { style: "text-align: center;" }, headerAttributes: { "class": "table-header-cell", style: "text-align: center; width: 100px;"} },
                            { field: "DcSaldoInicial", title: "Saldo (S/.)", width: "100px", attributes: { style: "text-align: right;" }, headerAttributes: { "class": "table-header-cell", style: "text-align: center; width: 100px;"} },
                            { field: "DcAmortizacion", title: "Amortización (S/.)", width: "100px", attributes: { style: "text-align: right;" }, headerAttributes: { "class": "table-header-cell", style: "text-align: center; width: 100px;"} },
                            { field: "DcInteres", title: "Interés (S/.)", width: "100px", attributes: { style: "text-align: right;" }, headerAttributes: { "class": "table-header-cell", style: "text-align: center; width: 100px;"} },
                            { field: "DcMontoCuota", title: "Monto Cuota (S/.)", width: "80px", attributes: { style: "text-align: right;" }, headerAttributes: { "class": "table-header-cell", style: "text-align: center; width: 80px;"}}],
        pageable: {
            refresh: false,
            pageSizes: true,
            messages: {
                itemsPerPage: "ítems por página",
                display: "{0}-{1} de {2} ítems",
                empty: "",
                first: "Ir a primera página",
                last: "Ir a última página",
                next: "Ir a página siguiente",
                previous: "Ir a página anterior"
            }
        },
        height: AltoGrilla
    });

    function resizeGrid() {
        var gridElement = $("#pDetLin");
        var dataArea = gridElement.find(".k-grid-content");
        var newHeight = $(window).height() - 500; //gridElement.parent().innerHeight() - 2;
        var diff = gridElement.innerHeight() - dataArea.innerHeight();
        gridElement.height(newHeight);
        dataArea.height(newHeight - diff);
    }





    $("#btnCerrar").click(function () {
        var Nametab = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
        var Accord = window.parent.$("#" + Nametab);
        Accord.tabs("remove", Accord.tabs("option", "selected"));
    });

    //Busqueda de Empleados deacuerdo al criterio seleccionado
    //    $("#btnBuscar").click(function () {

    //        var _filtro = $("#ddlFiltro").val();
    //        var _valor = $("#txtValor").val();
    //        cargar_DatosEmpleado(_filtro, _valor);

    //    });



    $('#btnExcel').click(function (e) {

        var admin = $("#hdfAdmin").val();
        var CodigoEmpleado = "";
        if (admin == 0) {
            CodigoEmpleado = $("#hdfEmpleado").val();
        }
        else {
            CodigoEmpleado = $("#hdfTecnicoResponsable").val();
            if (CodigoEmpleado == "") {
                $("#spMensaje").text("Debe Seleccionar un empleado antes de exportar.");
                e.preventDefault();
                return;
            }
            else {
                $("#spMensaje").text("");
            }
        }

        var _idSolicitud = $("#ddlSolicitud").val();
        if (_idSolicitud == "" || _idSolicitud == null) {
            e.preventDefault();
            $("#spMensaje").text("Primero debe buscar por algun filtro");
            e.preventDefault();
            return;
        }
        //        else {
        //            $("#spMensaje").text("");
        //            fnExportar(_idSolicitud);
        //        }
    });

    function fnExportar(_idSolicitud) {
        window.location.href = "Con_Fac_CronogramaPagos.aspx?Exportar=1&idSolicitud=" + _idSolicitud;
    }

    $("#btnPdf").click(function (e) {
        var admin = $("#hdfAdmin").val();
        var fecha = $("#lblFechaSol").text();
        var _idSolicitud = $("#ddlSolicitud").val();
        var codigo = $("#lblCodigoEmpleado").text();
        if (admin == 0) {
            CodigoEmpleado = $("#hdfEmpleado").val();
        }
        else {
            CodigoEmpleado = $("#hdfTecnicoResponsable").val();
            if (CodigoEmpleado == "") {
                $("#spMensaje").text("Debe Seleccionar un empleado antes de exportar.");
                return;
            }
        }

        if (_idSolicitud == "" || _idSolicitud == null || codigo == "(Desconocido)") {
            e.preventDefault();
            $("#spMensaje").text("No cuenta con solicitudes.");
            return;
        }
        else {
            if (fecha != "") {
                $("#spMensaje").text("");
                var anho = fecha.substr(6, 4);
                var mesSol = fecha.substr(3, 2);
                var mes = DevuelveMes(mesSol);
                var RutaPdf = $("#hdfRuta").val() + anho + "/" + mes + "/";
                var file = "Solicitud_N" + $("#ddlSolicitud").val() + "_" + CodigoEmpleado + ".pdf";
                var RutaFinal = RutaPdf + file;
                //                window.location.href = "/Common/Controladores/DescargarArchivo.ashx?archivo=" + RutaFinal;
                window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + RutaFinal);
            }
        }
    });


    function DevuelveMes(mes) {
        var mesCadena = "";
        if (mes == "01") {
            mesCadena = "Enero";
        }
        else if (mes == "02") {
            mesCadena = "Febrero";
        }
        else if (mes == "03") {
            mesCadena = "Marzo";
        }
        else if (mes == "04") {
            mesCadena = "Abril";
        }
        else if (mes == "05") {
            mesCadena = "Mayo";
        }
        else if (mes == "06") {
            mesCadena = "Junio";
        }
        else if (mes == "07") {
            mesCadena = "Julio";
        }
        else if (mes == "08") {
            mesCadena = "Agosto";
        }
        else if (mes == "09") {
            mesCadena = "Setiembre";
        }
        else if (mes == "10") {
            mesCadena = "Octubre";
        }
        else if (mes == "11") {
            mesCadena = "Noviembre";
        }
        else if (mes == "12") {
            mesCadena = "Diciembre";
        }
        return mesCadena;
    }
});
//function ExportarExcel() {
//    var pagina += "?vcTab=" + $("#hdfvcTab").val() + "&Detalle=" + $('#ddlBusqueda').val() + "," + encodeURIComponent(ValorBusqueda()) + "&Valor=" + $('#hdfinTipOri').val() + "&inFilReg=" + FiltroRegistro;
//    $("#ifExcel").attr("src", pagina);
//}
function fnMostrarDatos(valor) {
    $("#hdfTecnicoResponsable").val(valor);
    if (valor != "") {
        cargar_DatosEmpleado(valor);
    }
}
function cargar_DatosEmpleado(_IdEmpleado) {
    $.ajax({
        type: "POST",
        url: "Con_Fac_CronogramaPagos.aspx/getEmpleado",
        data: JSON.stringify({
            'IdEmpleado': _IdEmpleado,
            "inTipOri": $("#hdfinTipOri").val()
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            //console.log(data);
            if (data.d.P_vcCod != null) {
                $("#spMensaje").text("");
                $("#lblCodigoEmpleado").text(data.d.P_vcCod);
                $("#lblNombreEmpleado").text(data.d.vcNom);
                $("#lblArea").text(data.d.Area.vcNomOrg);
                $("#lblCCosto").text(data.d.CentroCosto.vcNomCenCos);
                ListarSolicitudes(data.d.P_vcCod);

            }
            else {
                $("#lblCodigoEmpleado").text("(Desconocido)");
                $("#lblNombreEmpleado").text("(Desconocido)");
                $("#lblArea").text("(Desconocido)");
                $("#ddlSolicitud").empty();
                $("#spMensaje").text("Los filtros no coinciden");
                $("#lblMoneda").text("(Desconocido)");
                $("#lblNumCuotas").text("(Desconocido)");
                $("#lblDeuda").text("(Desconocido)");
                $("#lblCCosto").text("(Desconocido)");
                var dataSource = new kendo.data.DataSource({
                    data: {},
                    pageSize: 10
                });
                var grid = $("#crono").data("kendoGrid");
                grid.setDataSource(dataSource);
                $("#tbExportar").hide();
                $("#btnPdf").hide();
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}
function ListarSolicitudes(_IdEmpleado) {

    $.ajax({
        type: "POST",
        url: "Con_Fac_CronogramaPagos.aspx/ListarSolicitudes",
        data: JSON.stringify({
            'IdEmpleado': _IdEmpleado,
            "inTipOri": $("#hdfinTipOri").val()
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d.length > 0) {

                $("#spMensaje").text("");
                $("#ddlSolicitud").empty();


                var IdSolicitud = 0;
                var i ;
                for (i= 0; i < data.d.length; i++) {
                    if (data.d[i].Selected == "S") {
                        IdSolicitud = data.d[i].IdSolicitud;
                        $("#ddlSolicitud").append("<option value='" + data.d[i].IdSolicitud + "' Selected>" + data.d[i].Descripcion + "</option>");
                        //$("#ddlSolicitud").append("<option value='" + data.d[i].IdSolicitud + "'>" + data.d[i].Descripcion + "</option>");
                    }
                    else {
                        $("#ddlSolicitud").append("<option value='" + data.d[i].IdSolicitud + "'>" + data.d[i].Descripcion + "</option>");
                    }
                }
                load(IdSolicitud, _IdEmpleado);

            }
            else {
                $("#spMensaje").text("Usted no tiene un cronograma de  pagos programado");

                var admin = $("#hdfAdmin").val();

                if (admin == 0) {
                    $("#spMensaje").text("Usted no tiene un cronograma de  pagos programado");
                }
                else { $("#spMensaje").text("El empleado no tiene un cronograma de  pagos programado"); }

                $("#lblMoneda").text("(Desconocido)");
                $("#lblNumCuotas").text("(Desconocido)");
                $("#lblDeuda").text("(Desconocido)");
                $("#lblFechaSol").text("(Desconocido)");
                $("#lblDesSol").text("(Desconocido)");

                var dataSource = new kendo.data.DataSource({
                    data: "{}",
                    pageSize: 10
                });


                var gridele = $("#crono").data("kendoGrid");
                gridele.setDataSource(dataSource);

                $('#ddlSolicitud').html('');
                $("#tbExportar").hide();
                $("#btnPdf").hide();
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}
function load(_IdSolicitud, _IdEmpleado) {
    $.ajax({
        type: "POST",
        url: "Con_Fac_CronogramaPagos.aspx/ListarCronogramaPagos",
        data: JSON.stringify({
            'IdSolicitud': _IdSolicitud,
            'IdEmpleado': _IdEmpleado,
            "inTipOri": $("#hdfinTipOri").val()
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var gridele;
            var dataSource;
            if (data.d.length > 0) {
                var AltoGrilla = 0;
                AltoGrilla = altoPagina - 320;
                if (AltoGrilla <= 0) {
                    AltoGrilla = 250;
                }

                dataSource = new kendo.data.DataSource({
                    data: data.d,
                    pageSize: 10
                });


                gridele = $("#crono").data("kendoGrid");
                gridele.setDataSource(dataSource);

                var DeutaTotal = 0;
                var NumCuotas = data.d.length;
                var Moneda = "Nuevos Soles (S/.)";
                var i;
                for (i = 0; i < data.d.length; i++) {
                    if (data.d[i].DcMontoCuota.indexOf(",") >= 0) {
                        DeutaTotal = DeutaTotal + parseFloat(data.d[i].DcMontoCuota.replace(',', ''));
                    }
                    else {
                        DeutaTotal = DeutaTotal + parseFloat(data.d[i].DcMontoCuota);
                    }
                }
                $("#lblMoneda").text(Moneda);
                $("#lblNumCuotas").text(NumCuotas);
                $("#lblDeuda").text(kendo.toString(DeutaTotal, "c" + window.parent.oCulturaUsuario.dcNumDec.toString()));

                var FechaSolicitud = data.d[0].FechaSolicitud;
                var DesSolicitud = data.d[0].DesSolicitud;
                $("#lblFechaSol").text(FechaSolicitud);
                $("#lblDesSol").text(DesSolicitud);
                $("#tbExportar").show();
                $("#btnPdf").show();
            }
            else {

                if (admin == 0) {
                    $("#spMensaje").text("Usted no tiene un cronograma de  pagos programado");
                }
                else { $("#spMensaje").text("El empleado no tiene un cronograma de  pagos programado"); }

                $("#lblMoneda").text("(Desconocido)");
                $("#lblNumCuotas").text("(Desconocido)");
                $("#lblDeuda").text("(Desconocido)");
                $("#lblFechaSol").text("(Desconocido)");
                $("#lblDesSol").text("(Desconocido)");

                dataSource = new kendo.data.DataSource({
                    data: "{}",
                    pageSize: 10
                });


                gridele = $("#crono").data("kendoGrid");
                gridele.setDataSource(dataSource);
                $("#tbExportar").hide();
                $("#btnPdf").hide();
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}
