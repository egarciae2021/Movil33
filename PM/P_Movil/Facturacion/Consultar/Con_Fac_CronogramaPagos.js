var altoPagina = 0;
var cPeriodo;

$(document).on("ready", function () {
    debugger;
    kendo.culture("es-PE");
    altoPagina = $(window).height();
    var AltoGrilla = 0;
    AltoGrilla = altoPagina - 320;
    if (AltoGrilla <= 0) {
        AltoGrilla = 250;
    }


    //$("#bpTecnicoResponsable_txtValorBusqueda").css('width', '240px');
    //$("#txtDescripcion").css('width', '240px');

    $("#ddlSolicitud").bind('change', function () {

        var IdSolicitud = this.value;
        var IdEmpleado = $("#lblCodigoEmpleado").text();
        load(IdSolicitud, IdEmpleado);

    });

    Inicio();

    $(".bordeui").removeClass("ui-corner-all");
    $(".bordeui").css({
        "border": "none",
        "padding": "0px"
    });

    //****Valores iniciales para rango de fecha
    var date = new Date();
    var fechainicio = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    var fechafin = new Date(date.getFullYear(), date.getMonth() + 6, 0);
    $("#txtFechaInicio").keypress(ValidarFecha);


    cPeriodo = $("#txtFechaInicio").kendoDatePicker({
        culture: "es-PE",
        start: "year",
        depth: "year",
        value: fechainicio,
        format: "MM/yyyy",
        footer: false
        //max: new Date(vFecSer.substring(0, 4), vFecSer.substring(4, 6) - 1, vFecSer.substring(6, 8))
    }).data("kendoDatePicker");

    cPeriodo = $("#txtFechaFin").kendoDatePicker({
        culture: "es-PE",
        start: "year",
        depth: "year",
        value: fechafin,
        format: "MM/yyyy",
        footer: false
        //max: new Date(vFecSer.substring(0, 4), vFecSer.substring(4, 6) - 1, vFecSer.substring(6, 8))
    }).data("kendoDatePicker");

    function Inicio() {
        $("#tbExportar").hide();
        $("#btnPdf").hide();
        var admin = $("#hdfAdmin").val();
        $("#TextBox1").hide();
        if (admin == 0 && $("#hdfOrganizacion").val() == "") {
            //$("#tbInfoUsuario").hide(); //Comentado Jcamacho 01/10/2015 , debe mostrar los filtros y detalle
            //$("#toolbar").hide();


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
                            { field: "InNumCuota", title: "N°", width: "20px", attributes: { style: "text-align: center;" }, headerAttributes: { "class": "table-header-cell", style: "text-align: center;"} },
                            { field: "Periodo1", hidden: true, title: "Periodo1", width: "100px", attributes: { style: "text-align: center;" }, headerAttributes: { "class": "table-header-cell", style: "text-align: center;"} },
                            { field: "VcPeriodo", title: "Periodo", width: "100px", attributes: { style: "text-align: center;" }, headerAttributes: { "class": "table-header-cell", style: "text-align: center;"} },
                            { field: "FechaSolicitud", title: "Fecha de Pago", width: "100px", attributes: { style: "text-align: center;" }, headerAttributes: { "class": "table-header-cell", style: "text-align: center;"} },
                            { field: "DcSaldoInicial", hidden: true, title: "Saldo", width: "100px", attributes: { style: "text-align: right;" }, headerAttributes: { "class": "table-header-cell", style: "text-align: center;"} },
                            { field: "DcAmortizacion", hidden: true, title: "Amortización", width: "100px", attributes: { style: "text-align: right;" }, headerAttributes: { "class": "table-header-cell", style: "text-align: center;"} },
                            { field: "DcInteres", hidden: true, title: "Interés", width: "100px", attributes: { style: "text-align: right;" }, headerAttributes: { "class": "table-header-cell", style: "text-align: center;"} },
                            { field: "DcMontoCuota", hidden: false, title: "Monto Periodo", width: "200px", attributes: { style: "text-align: right;" }, headerAttributes: { "class": "table-header-cell", style: "text-align: center;"}}],

        //** Columnas rempleazadas se les quito el texto "(S/.)"
        //{ field: "DcSaldoInicial", title: "Saldo (S/.)", width: "100px", attributes: { style: "text-align: right;" }, headerAttributes: { "class": "table-header-cell", style: "text-align: center; width: 100px;"} },
        //{ field: "DcAmortizacion", title: "Amortización (S/.)", width: "100px", attributes: { style: "text-align: right;" }, headerAttributes: { "class": "table-header-cell", style: "text-align: center; width: 100px;"} },
        //{ field: "DcInteres", title: "Interés (S/.)", width: "100px", attributes: { style: "text-align: right;" }, headerAttributes: { "class": "table-header-cell", style: "text-align: center; width: 100px;"} },
        //{ field: "DcMontoCuota", title: "Monto Periodo (S/.)", width: "80px", attributes: { style: "text-align: right;" }, headerAttributes: { "class": "table-header-cell", style: "text-align: center; width: 80px;"}}],
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
        detailInit: CargarSubgrilla,
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

    $(window).resize(function () {
        resizeGridKendo();
    });



    resizeGridKendo();

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

        //var _idSolicitud = $("#ddlSolicitud").val();
        //if (_idSolicitud == "" || _idSolicitud == null) {
        //    e.preventDefault();
        //    $("#spMensaje").text("Primero debe buscar por algun filtro");
        //    e.preventDefault();
        //    return;
        //}
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
        var _IdEmpleado = $("#lblCodigoEmpleado").text();

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
        var FechaInicio = $("#txtFechaInicio").val();
        var FechaFin = $("#txtFechaFin").val();


        if (FechaInicio == "") {
            $("#spMensaje").text("Ingrese una fecha de inicio");
            return;
        }
        else {
            if (FechaInicio.length != 7 || FechaInicio.indexOf("/") != 2 || FechaInicio.split("/").length != 2) {
                $("#spMensaje").text("Ingrese un formato de fecha válido, mm/yyyy");
                return;
            }
        }

        if (FechaFin == "") {
            $("#spMensaje").text("Ingrese una fecha de fin");
            return;
        }
        else {
            if (FechaFin.length != 7 || FechaFin.indexOf("/") != 2 || FechaFin.split("/").length != 2) {
                $("#spMensaje").text("Ingrese un formato de fecha válido, mm/yyyy");
                return;
            }
        }

        $.ajax({
            type: "POST",
            url: "Con_Fac_CronogramaPagos.aspx/ExportarPdf",
            data: JSON.stringify({
                //'IdSolicitud': 0,
                //'IdEmpleado': _IdEmpleado,
                "inTipOri": $("#hdfinTipOri").val()
                //"Descripcion": $("#txtDescripcion").val(),
                //"fechaInicio": $("#txtFechaInicio").val(),
                //"fechaFin": $("#txtFechaFin").val(),
                //"Imei": $("#txtImei").val(),
                //"Linea": $("#txtLinea").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.d.length > 0) {
                    var RutaPdf = $("#hdfRuta").val();
                    var file = data.d;
                    // alert(data.d); 
                    var RutaFinal = RutaPdf + file;
                    window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + RutaFinal);

                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });


        //if (fecha != "") {
        //    $("#spMensaje").text("");
        //    var anho = fecha.substr(6, 4);
        //    var mesSol = fecha.substr(3, 2);
        //    var mes = DevuelveMes(mesSol);
        //    var RutaPdf = $("#hdfRuta").val() + anho + "/" + mes + "/";
        //    var file = "Solicitud_N" + $("#ddlSolicitud").val() + "_" + CodigoEmpleado + ".pdf";
        //    var RutaFinal = RutaPdf + file;
        //    //                window.location.href = "/Common/Controladores/DescargarArchivo.ashx?archivo=" + RutaFinal;
        //    window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + RutaFinal);
        //}

    });


    $("#btnBuscar").click(function () {
        var IdEmpleado = $("#lblCodigoEmpleado").text();
        $("#spMensaje").text("");


        if (IdEmpleado == "" || $("#bpTecnicoResponsable_txtValorBusqueda").val() == "") {
            $("#spMensaje").text("Seleccione un empleado");
            return;
        }

        var FechaInicio = $("#txtFechaInicio").val();
        var FechaFin = $("#txtFechaFin").val();


        if (FechaInicio == "") {
            $("#spMensaje").text("Ingrese una fecha de inicio.");

            return;
        }
        else {
            if (FechaInicio.length != 7 || FechaInicio.indexOf("/") != 2 || FechaInicio.split("/").length != 2) {
                $("#spMensaje").text("Ingrese un formato de fecha válido, mm/yyyy");
                return;
            }
        }

        if (FechaFin == "") {
            $("#spMensaje").text("Ingrese una fecha de fin");
            return;
        }
        else {
            if (FechaFin.length != 7 || FechaFin.indexOf("/") != 2 || FechaFin.split("/").length != 2) {
                $("#spMensaje").text("Ingrese un formato de fecha válido, mm/yyyy");
                return;
            }
        }

        load(IdEmpleado);


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
                //ListarSolicitudes(data.d.P_vcCod)
                load(data.d.P_vcCod); //agregado Jcamacho lista cronograma 30/07/2015
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
                var i;
                for (i = 0; i < data.d.length; i++) {
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

                resizeGridKendo();
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}
function load(_IdEmpleado) {
    //function load(_IdSolicitud,_IdEmpleado) {

    $("#crono").data("kendoGrid").dataSource.data([]);

    if ($("#txtFechaInicio").val() == "") {      
        return;
    }

    if ($("#txtFechaFin").val() == "") {      
        return;
    }

    $.ajax({
        type: "POST",
        url: "Con_Fac_CronogramaPagos.aspx/ListarCronogramaPagos",
        data: JSON.stringify({
            'IdSolicitud': 0,
            'IdEmpleado': _IdEmpleado,
            "inTipOri": $("#hdfinTipOri").val(),
            "Descripcion": $("#txtDescripcion").val(),
            "fechaInicio": $("#txtFechaInicio").val(),
            "fechaFin": $("#txtFechaFin").val(),
            "Imei": $("#txtImei").val(),
            "Linea": $("#txtLinea").val(),
            "IdTipoProducto": $("#ddlTipoProducto").val()
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d.length > 0) {
                var AltoGrilla = 0;
                AltoGrilla = altoPagina - 320;
                if (AltoGrilla <= 0) {
                    AltoGrilla = 250;
                }

                var dataSource = new kendo.data.DataSource({
                    data: data.d,
                    pageSize: PageSize(data)
                });


                var gridele = $("#crono").data("kendoGrid");
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

                resizeGridKendo();

            }
            else {
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

                //var dataSource = new kendo.data.DataSource({
                //    data: "{}",
                //    pageSize: 10
                //});                      
                //
                //var gridele = $("#crono").data("kendoGrid");
                //gridele.setDataSource(dataSource);

                $("#tbExportar").hide();
                $("#btnPdf").hide();
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}


function resizeGridKendo() {

    var alto;
    alto = $(window).height() - 300;

    //if ($("#hdfAdmin").val() == "1") {
    //    alto = $(window).height() - 350; ;
    //}
    //else {
    //    alto = $(window).height() - 200; ;
    //}


    if (alto > 140 && alto < 330)
    { alto = alto-10; }
    if (alto >= 330)
    { alto = 320; }
    else if (alto < 150)
    { alto = 140; }   
    

    var gridElement = $("#crono");
    var dataArea = gridElement.find(".k-grid-content");
    var newHeight = alto; //gridElement.parent().innerHeight() - 2;
    var diff = gridElement.innerHeight() - dataArea.innerHeight();
    gridElement.height(newHeight);
    dataArea.height(newHeight - diff);

    var TamanioPagina = Math.floor(alto / 37);

    var grilla = $("#crono").data("kendoGrid");
    var data = grilla.dataSource.data();

    var registros = data.length;

    if (registros <= 5) {
        TamanioPagina = 5;
    }
    else if (registros <= 10) {
        TamanioPagina = 10;
    }
    else {
        TamanioPagina = 20;
    }

    //grilla.dataSource.pageSize(TamanioPagina);
    
    //grilla.dataSource.page(pagina);
    //grilla.refresh();


}

function CargarSubgrilla(e) {

    var IdEmpleado = $("#lblCodigoEmpleado").text();
    $.ajax({
        type: "POST",
        url: "Con_Fac_CronogramaPagos.aspx/ListarCronogramaPagosDetalle",
        data: JSON.stringify({
            'Periodo': e.data.Periodo1,
            'IdEmpleado': IdEmpleado,
            "inTipOri": $("#hdfinTipOri").val()
        }),
        //data: { DBAName: e.data.DBAName }
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("<div/>").appendTo(e.detailCell).kendoGrid({
                dataSource: data.d,
                columns: [
                    { field: "DesSolicitud", title: "Descripción", width: "250px", headerAttributes: { "class": "table-header-cell", style: "text-align: center;"} },
                    { field: "Imei", title: "IMEI", width: "80px", headerAttributes: { "class": "table-header-cell", style: "text-align: center;"} },


                    { field: "DcAmortizacion", hidden: true, title: "Amortización", width: "80px", attributes: { style: "text-align: right;"} },
                    { field: "DcInteres", hidden: true, title: "Interés", width: "80px", attributes: { style: "text-align: right;"} },
                      { field: "DcMontoCuota", title: "Monto Cuota", width: "80px", attributes: { style: "text-align: right;" }, headerAttributes: { "class": "table-header-cell", style: "text-align: center;"} }
                ],
                height: 150
            })
        },

        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}


function PageSize(data) { 

    var registros = data.d.length;

    if (registros <= 5) {
        TamanioPagina = 5;
    }
    else if (registros <= 10) {
        TamanioPagina = 10;
    }
    else {
        TamanioPagina = 20;
    }

    return TamanioPagina;

}
