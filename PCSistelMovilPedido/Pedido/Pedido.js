var fechaLimiteModificacion = '14 de agosto del 2016 a las 23:00:00 horas';
var boolEnlazarClick = 1;
var boolPlanDepObliga = false;
//var dias = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
var dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
//var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre");
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"];
var MesesEnteros = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
var productosBase;
var productos = [];
var arregloSeleccion = [];
var arregloEli = [];
var pedidos;
var planes;
var creditos;
var produc;
var filaSelec;
var ale = true;
var esEditar = false;
var idPedidoEditar;
var campanaActiva;
var altoPagina = 0;
var numerosRenovar = [];
var numerosElegidos = [];
var numeroCambiar;
var elementEliEle;
var precioOnTopAnterior;
var valueOnTopAnterior;
var precioPlanAnterior;
var valuePlanAnterior;

var precioEquipoAnterior;
var valueEquipoAnterior;
var CuotasEquipoAnterior;
//var nombrePlanAnterior;

var indicadoresInicial = [];
var indicadoresVariante = [];
var MesContratoAnterior;
var esConformePlanMes = false;
var IdElemento;
var obligarMantenerPlan = false;
var aled = false;
var numeroAlert = 0;
var totalNumeroAlert = 5;
var NumMaxEquipos_porPedido = 10;
var MesesFinanciamientoEquipo = 1;  //<<<<<---------------- valor de los meses de contrato del financiamiento asociado a la campana, si la campana tiene financiamiento con pago al contado el valor sera 1
var numDecimales = 4;
var rm = '';
var MesesFinanciamientoChip = 1;
var MontoMinimo = 0;
var oCultura = null;
var SoloPlanMayor = false;
var lstFinanciamiento = [];
var IdFinanciamientoAnterior;

$(function () {
    oCultura = window.parent.oCulturaUsuario;    
    $('#ddlLugarEntregaPedido').select2();

    $("#fechaLimiteModificacion").text(fechaLimiteModificacion);

    if (window.parent.CampanaConf.RenovarContratoVigente && window.parent.Habilitado == "0") {
        SoloPlanMayor = window.parent.CampanaConf.SoloRenovarMontoMayor;
    }
    //debugger;
    if (window.parent.UsuarioConectado != $("#hfUsuario").val()) {
        window.location.href = '../Login.aspx';
        return;
    }

    $("#btnImprimirCompraPedido").click(function () {
        window.print();
    });

    obtenerCampanaActiva();
    obtenerCreditos();

    fnObtenerFinancimientos();

    //obtenerProductos();
    //enlacesLoad();

    //obtenerCreditos();
    //obtenerTipoServicio();
    //obtenerTipoModelo();
    //fnObtenerFinancimientos();
    //fnListarTipoModeloDispositivo();

    $(".k-input .k-readonly").attr('width', 'auto');

    var numReno;

    $("#pProcesoCompra").css({ "height": $(window).height() - 60 });

    if (window.parent.NumeroRenovar != undefined) {
        $("#spanNumElegidoRenovacion").html("<b style='color:green;'>Número a renovar es : " + window.parent.NumeroRenovar + "</b>");
    }
    //    else {
    //        numerosRenovar.push(new MiNumero("Nueva Linea", "Nueva Linea"));
    //        for (var k = 0; k < window.parent.misNumRenovar.length; k++) {
    //            numerosRenovar.push(new MiNumero(window.parent.misNumRenovar[k], window.parent.misNumRenovar[k]));
    //        }
    //    }

    altoPagina = $(window).height();

    $.ajax({
        type: "POST",
        url: "Pedido.aspx/planListarPorModelo",
        data: "{'IdModeloDispositivo': '" + "1" + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            planes = JSON.parse(resultado.d);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

    //    $(".dscPlanCombo").click(function () {
    //    });

    //Validacion solo números...
    //$("#txt").keypress(ValidarSoloNumero);

    //$(".txtCantidadDetalle").keypress(ValidarSoloNumero);

    $(".txtCantidadDetalle").live("keypress", ValidarSoloNumero);
    $("#Text1,#txtPrecioMax,#txtPrecioMin").live("keypress", ValidarSoloNumero);
    $("#txtNombre").live("keypress", ValidarAlfaNumerico);

    DimPosElementos();

    $(window).resize(function () {
        DimPosElementos();
    });

    $("#ddlFinanciamiento").change(function () {
        for (var i = 0; i < lstFinanciamiento.length; i++) {
            if (lstFinanciamiento[i].Categoria == 'E' && lstFinanciamiento[i].IdTipoFinanciamiento == $("#ddlFinanciamiento").val()) {
                idFinancDefault = lstFinanciamiento[i].IdTipoFinanciamiento;
                MesesFinanciamientoEquipo = lstFinanciamiento[i].Cuotas;
                MontoMinimo = lstFinanciamiento[i].MontoMinimo == 0 ? 0 : lstFinanciamiento[i].ValorMontoMinimo;
            }
            if (lstFinanciamiento[i].Categoria == 'C' && lstFinanciamiento[i].IdTipoFinanciamiento == $("#ddlFinanciamiento").val()) {
                MesesFinanciamientoChip = lstFinanciamiento[i].Cuotas;
            }
        }

    });

    $("#imgVerDetalleFinanciamiento").click(function () {
        fnMostrarDscFinancimiento();
    });

    $("#pnlDscFinanciamiento").kendoWindow({
        width: "800px",
        height: "600px",
        title: "Descripción financiamiento",
        actions: [
                "Close"
        ],
        modal: true,
        resizable: false,
        draggable: false
    });

    $("#DialogoEquiposAdquiridos").kendoWindow({
        width: "720px",
        height: "360px",
        title: "",
        actions: [
                "Close"
        ],
        close: mostrarEquipos,
        modal: true,
        resizable: false,
        draggable: false
    });

    $("#ddlTipoServicio").kendoMultiSelect({
        dataTextField: "vcNom",
        dataValueField: "P_inCodTipSer",
        change: function (e) {
            obtenerProductosByFiltro();
        },
        dataBound: function (e) {
            var input = this.input;

            $(input).attr("disabled", "disabled");

        }
    }).data("kendoMultiSelect");

    $("#chkConfirmarTerminos").change(function () {
        if ($(this).is(':checked')) {
            $("#btnComprarConfirmado").click(function () {
                procesarPedido();
            });

            $('#btnComprarConfirmado').hover(function () {
                $(this).animate({ width: '130px', height: '60px' }, 300);

            }, function () {
                $(this).animate({ width: '120px', height: '50px' }, 300);
            });
        }
        else {
            $("#btnComprarConfirmado").unbind("click");
            $("#btnComprarConfirmado").click(function () {
                alerta("Debe aceptar las condiciones");
            });
            $('#btnComprarConfirmado').unbind("hover");
        }
    });

    $("#btnPreventaConfirmado").click(function () {
        procesarPreventa();
    });

    $('#btnPreventaConfirmado').hover(function () {
        $(this).animate({ width: '125px', height: '100px' }, 300);
    }, function () {
        $(this).animate({ width: '120px', height: '90px' }, 300);
    });

    $("#btnComprarConfirmado").click(function () {
        alerta("Debe aceptar las condiciones");
    });

    $(".getCondicionesTemrinos").click(function () {
        window.location.href = "../Common/Controladores/DescargarArchivo.ashx?archivo=Common/Contratos/Condiciones.pdf";
        //$.ajax({
        //    type: "POST",
        //    url: "Pedido.aspx/getTerminosCondiciones",
        //    //            data: "{'prIdEmpleado': '" + $("#hdfEmpleado").val() + "'," +
        //    //                    "'pIdCampana': '" + "5" + "'," +
        //    //                    "'pAccion': '" + "Renovar" + "'," +
        //    //                    "'pXmlNumero': '" + XML + "'}",
        //    contentType: "application/json; charset=utf-8",
        //    dataType: "json",
        //    success: function (resultado) {
        //        //window.location.href = raiz("../Common/Controladores/DescargarArchivo.ashx?archivo=" + resultado.d);
        //        window.location.href = "../Common/Controladores/DescargarArchivo.ashx?archivo=" + resultado.d;
        //    },
        //    error: function (xhr, err, thrErr) {
        //        MostrarErrorAjax(xhr, err, thrErr);
        //    }
        //});
    });

    $("#pProcesoCompra").css("height", $(window).height());

    if (window.parent.EsSimulacion) {
        $("#imgCompraimg").attr("src", "../Common/Images/boton_comprar2.png");
    }


    $("#ddlLugarEntregaPedido").change(function () {
        var dir = $("#ddlLugarEntregaPedido option[value='" + $(this).val() + "']").attr("direc");
        $("#lblDireccionCompleta").text(dir);
    });

    $("#txtNumeroContactoPedido").on("keypress keyup blur", function (event) {
        $(this).val($(this).val().replace(/[^\d].+/, ""));
        if ((event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });


    if ($("#hdfMuestraNumeroContacto").val() == "1" && esEditar == false) {
        $("#dvNumeroContactoPedido").show();
    }
    else {

        $("#dvNumeroContactoPedido").hide();
    }


    $("#btnCerrarDialogPedido").click(function () {
        var dialog1 = $("#DialogoEquiposAdquiridos").data("kendoWindow");
        dialog1.close();
    });

});

function DimPosElementos() {
    try {
        resizeGrid();
    } catch (e) {
        //some error..
    }
}

function ListarFinanciamientoXProductoSeleccionado() {
    var isSoloChip = false;
    for (var i = 0; i < arregloSeleccion.length; i++) {
        if (arregloSeleccion[i].IdGama != "9") {
            isSoloChip = true;
            break;
        }
    }

    $('#ddlFinanciamiento').html('');
    $("#ddlFinanciamiento").append('<option value="-1" >--Selecione Financimiento--</option>');
    
    var financiamientoPorDefecto = -1;
    if (isSoloChip) {
        for (var i = 0; i < lstFinanciamiento.length; i++) {
            if (lstFinanciamiento[i].Categoria == 'E') {                
                //itemFinanciamientoToDelete.push(lstFinanciamiento[i].IdTipoFinanciamiento);
                $("#ddlFinanciamiento").append('<option value="' + lstFinanciamiento[i].IdTipoFinanciamiento + '" >' + lstFinanciamiento[i].NombreFinanciamiento + '</option>');
                if (lstFinanciamiento[i].EsDefault) {
                    financiamientoPorDefecto = lstFinanciamiento[i].IdTipoFinanciamiento;
                    $("#spanDdlFinanciamiento").text(lstFinanciamiento[i].NombreFinanciamiento);
                }
            }
        }
    } else {
        for (var i = 0; i < lstFinanciamiento.length; i++) {
            if (lstFinanciamiento[i].Categoria == 'C') {
                //itemFinanciamientoToDelete.push(lstFinanciamiento[i].IdTipoFinanciamiento)
                $("#ddlFinanciamiento").append('<option value="' + lstFinanciamiento[i].IdTipoFinanciamiento + '" >' + lstFinanciamiento[i].NombreFinanciamiento + '</option>');
                financiamientoPorDefecto = lstFinanciamiento[i].IdTipoFinanciamiento;
                $("#spanDdlFinanciamiento").text(lstFinanciamiento[i].NombreFinanciamiento);
            }
        }
    }
    $("#ddlFinanciamiento").val(financiamientoPorDefecto);
    //for (var x = 0; x < itemFinanciamientoToDelete.length; x++) {
    //    $("#ddlFinanciamiento option[value='" + itemFinanciamientoToDelete[x] + "']").remove();
    
    //}
    
}

function resizeGrid() {
    var gridElement = $("#grdPedidos");
    var dataArea = gridElement.find(".k-grid-content");
    var newHeight = $(window).height() - 100; //gridElement.parent().innerHeight() - 2;
    var diff = gridElement.innerHeight() - dataArea.innerHeight();
    gridElement.height(newHeight);
    dataArea.height(newHeight - diff);

    //$("#pDetEle").css({ height: 100});
    //$("#detalleTaps").css({ height: 100});
    //$("#pSelecPro").css({ height: 100});
    //$("#gridPro").css({ height: 100});

    //$("#gridPro").kendoGrid({height: newHeight-500});
    //    var gridElementProducto = $("#gridPro");
    //    var dataAreaProducto = gridElementProducto.find(".k-grid-content");
    //    var newHeight = $(window).height() - 10; //gridElement.parent().innerHeight() - 2;
    //    var diff = gridElementProducto.innerHeight() - dataAreaProducto.innerHeight();
    //    gridElementProducto.height(newHeight);
    //    dataAreaProducto.height(newHeight - diff);

    //var gridElement = $("#gridPro");
    //var dataAreaProducto = gridElement.find(".k-grid-content");
    //dataAreaProducto.height(newHeight - 10);
    //$(".k-grid", "#pSelecPro").first().css({height: newHeight - 10});


    //$("#pSelecPro").css({ height: Alto});

}

function enlacesLoad() {

    $("#txtNombre,#txtPrecioMin,#txtPrecioMax").keypress(function (e) {
        if (e.which == 13) {
            $("#btnFiltroProducto").click();
        }
    });

    $("#btnVolverPedidos").click(function () {
        //window.location.href = "Pedidos.aspx";
        //    $("#generalCarrito").hide(0,function(){
        //        $("#generalPedido").fadeIn(300);
        //    });    
        window.parent.fnIrPedidos();
    });

    $("#btnGetProceso").click(function () {

    });

    $("#btnFiltroProducto").click(function () { obtenerProductosByFiltro(); });

    $("#btnEliminarPedido").click(function () { cancelarPedido(); });
    $("#btnEditarPedido").click(function () { editarPedido(); });

    $("#required").kendoDropDownList({
        change: onChangeDdl
    });



    //    $("#btnProcesar").click(function () {
    //        procesarPedido();
    //    });

    //    $("#btnComprarConfirmado").click(function () {
    //        procesarPedido();
    //    });

    $("#btnCarrito").click(function () {
        $(".tap").removeClass("tapSelect");
        $("#tapCarrito").addClass("tapSelect");

        $("#detalleTaps > div").hide(0, function () {

            validarexceso();
            validarexcesoPlan();

            $("#pDetEle").fadeIn(200, function () {
                if (arregloSeleccion.length != 0) {
                    var dataSource = new kendo.data.DataSource({
                        data: arregloSeleccion
                    });

                    var gridele = $("#gridDetEle").data("kendoGrid");
                    gridele.setDataSource(dataSource);

                    enlazarClick();
                }
            });
        });
    });

    $("#dscCelEle").click(function () {
        $("#caracCelEle").removeClass("tabSelect");
        $("#dscCelEle").addClass("tabSelect");
        $("#caracCel").hide(0, function () {
            $("#dscCel").fadeIn(300);
        });
    });

    $("#caracCelEle").click(function () {
        $("#dscCelEle").removeClass("tabSelect");
        $("#caracCelEle").addClass("tabSelect");
        $("#dscCel").hide(0, function () {
            $("#caracCel").fadeIn(300);
        });
    });

    $('.tabDesc').hover(function () {
        $(this).animate({ marginRight: '10px', marginLeft: '10px' }, 300);

    }, function () {
        $(this).animate({ marginRight: '0px', marginLeft: '2px' }, 300);
    });

    $('.tabDesc').click(function () {
        $('.tabDesc').removeClass("tabSelect");
        $(this).addClass("tabSelect");
    });

    $("#comp").click(function () {

        if (window.parent.NumeroRenovar != undefined) {
            if (arregloSeleccion.length == 1) {
                alerta("Usted sólo puede elegir un equipo al renovar con número");
                return;
            }
        }

        var canta = parseInt($("#Text1").val());

        if (canta == 0) {
            alerta("Ingrese una cantidad correcta");
            $("#Text1").val('1');
            $("#Text1").focus();
            return;
        }
        $("#opacidad").hide();
        $("#generalPedido").hide();
        $("#generalCarrito").fadeIn(300, function () {


            if ((arregloSeleccion.length + canta) > NumMaxEquipos_porPedido) {
                alerta("Usted ha superado el número de ítems a comprar");
                return;
            }
            var id = produc.P_inCod;

            if (!window.parent.esPreVentaActiva) {
                var stock = parseInt($("#stockk").text());
                stock = stock - parseInt(obtenerStockSelecionado(id));
                if (stock < 1) {
                    alerta("El Producto seleccionado no tiene stock disponible");
                    return;
                }

                if (canta > stock) {
                    alerta("La cantidad ingresada no puede ser <br>mayor al stock disponible.");
                    return;
                }
            }

            var pro;
            for (var i = 0; i < canta; i++) {
                pro = obtenerProducto(id);
                if (validarexcesoBool_monto(parseFloat(pro.Precio), parseFloat(pro.MinPrecioPlan), pro.IdGama)) {
                    alerta("Usted ha superado su límite de crédito");
                    return;
                }
                arregloSeleccion.push(pro);
                //AumentarCreduti(parseInt(pro.Precio), parseInt(pro.MinPrecioPlan)); GEIG
                operarInidicadores(parseFloat(pro.Precio), parseFloat(pro.MinPrecioPlan), pro.CuotasEquipo);
            }

            //            if (arregloSeleccion.length > 0) {geig
            //                validarexceso();
            //                validarexcesoPlan();
            //                aumentarBurbuja();
            //            }
        });
    });


    $("#regresar").click(function () {
        $("#generalPedido").hide();
        $("#opacidad").hide();
        $("#generalCarrito").fadeIn(300);
    });

    $("#tapProducto").click(function () {
        $(".tap").removeClass("tapSelect");
        $("#tapProducto").addClass("tapSelect");
        $("#detalleTaps > div").hide(0, function () {
            $("#pSelecPro").fadeIn(200);
        });
    });

    $("#tapProceso").click(function () {
        $(".tap").removeClass("tapSelect");
        $("#tapProceso").addClass("tapSelect");
        $("#detalleTaps > div").hide(0, function () {
            $("#pProcesoCompra").fadeIn(200);
        });
    });

    $("#tapDeclaracion").click(function () {
        ListarFinanciamientoXProductoSeleccionado();
        if (!esConformePlanMes && fnVerificarExistenProductosNuevos()) {
            confirma("Usted no a verificado sus planes ni meses de contrato.<br> ¿Desea verificarlos? <br>", "Verificar plan y meses de contrato", function (a) {
                if (a == "Aceptar") {
                    fnAbrirTapCarrito();
                }
                else {
                    esConformePlanMes = true;
                    $(".tap").removeClass("tapSelect");
                    $("#tapDeclaracion").addClass("tapSelect");
                    $("#detalleTaps > div").hide(0, function () {
                        $("#pDeclaracion").fadeIn(200);
                    });
                }
            });
        }
        else {
            $(".tap").removeClass("tapSelect");
            $("#tapDeclaracion").addClass("tapSelect");
            $("#detalleTaps > div").hide(0, function () {
                $("#pDeclaracion").fadeIn(200);
            });
        }


    });

    $("#tapCarrito").click(function () {
        fnAbrirTapCarrito();
    });

    var AltoGrilla = 0;
    AltoGrilla = $(window).height() - ($("#contCampaña").height() + 115);
    if (AltoGrilla <= 0) {
        AltoGrilla = 280;
    }

    var columnGridCarrito, rowTemp, altRowTemp;


    if (UsaFinanciamientoPrecioVariable == true) {
        $("#totalesCarrito").hide();

        columnGridCarrito = [
              { field: "Producto", width: "100px", title: "Producto" },
              { field: "Precio", width: "85px", title: "Monto Equipo" },
              { field: "Detalles", width: "430px", title: "Detalles" }
       
              //{ field: "Total", width: "80px", title: "Total" }
        ];
        rowTemp = kendo.template($("#rowTemplateVariable").html());
        altRowTemp = kendo.template($("#altRowTemplateVariable").html());
    }
    else {

        if (MesesFinanciamientoEquipo == 1) {
            columnGridCarrito = [
                { field: "Producto", width: "100px", title: "Producto" },
                { field: "Detalles", width: "530px", title: "Detalles" },
                { field: "Precio", title: "Precio" }
            ];
            rowTemp = kendo.template($("#rowTemplate").html());
            altRowTemp = kendo.template($("#altRowTemplate").html());
        } else {
            columnGridCarrito = [
                { field: "Producto", width: "80px", title: "Producto" },
                { field: "Cuotas", width: "55px", title: "Cuotas<br/>Equipo" },
                { field: "Monto", width: "75px", title: "Monto<br/>Equipo" },
                { field: "Detalles", width: "430px", title: "Detalles" },
                { field: "Contrato", title: "Contrato", hidden: !ElegirMesesPlan },
                { field: "Mensual", title: "Total" }
            ];
            rowTemp = kendo.template($("#rowTemplate_Cuotas").html());
            altRowTemp = kendo.template($("#altRowTemplate_Cuotas").html());
        }

    }




    if (!ElegirMesesPlan) {
        rm = "display: none;";
    }

    $("#gridDetEle").kendoGrid({
        dataSource: {
            data: arregloSeleccion
            //data:getDatasourceArregloSeleccion()
        },
        columns: columnGridCarrito,
        sortable: false,
        rowTemplate: rowTemp,
        altRowTemplate: altRowTemp,
        height: AltoGrilla  //420 - 09/12/2013 - wapumayta

    });

    $("#btnNuevoPedido").click(function () {
        //        if(HabilitarNuevoPedido())
        //        {
        //            alerta("Ud. no puede generar un nuevo pedido<br>cuando ya existe una solicitud con estado en 'Envío'");
        //            return;
        //        } 

        window.parent.NumeroRenovar = undefined;
        window.parent.IdPlanNumeroRenovar = undefined;
        window.parent.FlagMantenerPlan = undefined;
        $("#generalPedido").hide(0, function () {
            //$(".subirCarrito").css("color", "white");
            //$(".subirCarrito").css("background", "#005c83");


            $(".tap").hide();
            $("#tapProducto").show();
            $("#tapCarrito").show();
            $("#tapDeclaracion").show();
            $("#tapProducto").addClass("tapSelect");
            $("#pSelecPro").show();
            $("#pPanelCarrito").show();
            $("#pDetEle").hide();
            $("#pProcesoCompra").hide();
            arregloSeleccion = [];
            arregloEli = [];

            //obtenerCreditos();

            //$(".k-grid-header", "#pSelecPro").css({ "float": "left !important" }); geig1
            // $("#generalCarrito").fadeIn(300);
        });
        //$(".k-input .k-readonly").attr('width', 'auto');
        //alert(1);
    });

    $('.tap').hover(function () {
        $(this).animate({ marginRight: '10px', marginLeft: '30px' }, 300);

    }, function () {
        $(this).animate({ marginRight: '0px', marginLeft: '20px' }, 300);
    });

    $('#btnProcesar').hover(function () {
        $(this).animate({ width: '52px', height: '52px' }, 300);

    }, function () {
        $(this).animate({ width: '50px', height: '50px' }, 300);
    });
}

function obtenerCampanaActiva() {
    //    $.ajax({
    //        type: "POST",
    //        url: "Pedido.aspx/obtenerCampanaActivaConf",
    //        data: "{'prIdCliente': '" + "0" + "'}",
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function (resultado) {
    //        campanaActiva = resultado.d;

    if (window.parent.CampanaConf.Descripcion == null) {
        $($("#pTituloPedido > div")[0]).text("");
        $("#spanNomCam").text("");
    } else {
        $($("#pTituloPedido > div")[0]).text(window.parent.CampanaConf.Descripcion);
        $("#spanNomCam").text(window.parent.CampanaConf.Descripcion);
    }

    for (var i = 0; i < window.parent.arCampanasActivas.length; i++) {
        if (window.parent.arCampanasActivas[i].IdCampana == window.parent.CampanaConf.IdCampana) {
            $("#spanNomOpe").text(window.parent.arCampanasActivas[i].NombreOperador);
        }
    }

    if (window.parent.esCampanaActiva) {
        var fechaInicio = new Date(parseInt(window.parent.CampanaConf.FechaInicio.substring(6, 19)));
        var fechaFin = new Date(parseInt(window.parent.CampanaConf.FechaFin.substring(6, 19)));
        var fechaActual = new Date(parseInt(window.parent.CampanaConf.FechaActual.substring(6, 19)));

        strFechaInicio = dias[fechaInicio.getDay()] + ', ' + fechaInicio.getDate() + ' de ' + meses[fechaInicio.getMonth()] + ' del ' + fechaInicio.getFullYear();
        strfechaFin = dias[fechaFin.getDay()] + ', ' + fechaFin.getDate() + ' de ' + meses[fechaFin.getMonth()] + ' del ' + fechaFin.getFullYear();

        var FormatNewFechaI = dias[fechaInicio.getDay()] + ', ' + Right('0' + fechaInicio.getDate(), 2) + '/' + MesesEnteros[fechaInicio.getMonth()] + '/' + fechaInicio.getFullYear();
        var FormatNewFechaF = dias[fechaFin.getDay()] + ', ' + Right('0' + fechaFin.getDate(), 2) + '/' + MesesEnteros[fechaFin.getMonth()] + '/' + fechaFin.getFullYear();
        var strFechaActual = dias[fechaActual.getDay()] + ', ' + Right('0' + fechaActual.getDate(), 2) + '/' + MesesEnteros[fechaActual.getMonth()] + '/' + fechaActual.getFullYear();

        $("#spanFIniCam").text(FormatNewFechaI);
        $("#spanFFinCam").text(FormatNewFechaF);

        $("#declaracionFechaActual").text(strFechaActual);
    }
    else {
        if (window.parent.esPreVentaActiva) {
            fnEsCampanaPreventa();
        }
    }

    //obtenerCreditos();

    //obtenerPedidos();
    //            if (window.parent.esCampanaActiva) {
    //                obtenerProductos();
    //            }
    //        },
    //        error: function (xhr, err, thrErr) {
    //            MostrarErrorAjax(xhr, err, thrErr);
    //        }
    //    });
}

function obtenerProductos() {
    var where = '';

    if (window.parent.miIdTipoModeloDispositivo != undefined && window.parent.miIdTipoModeloDispositivo != '') {
        where = ' and ts.IdTipoModeloDispositivo = ' + window.parent.miIdTipoModeloDispositivo.toString();
    }

    var btSoloPlanesMayor = false;
    if (window.parent.CampanaConf.RenovarContratoVigente && window.parent.Habilitado == "0") {
        btSoloPlanesMayor = window.parent.CampanaConf.SoloRenovarMontoMayor;
    }

    $.ajax({
        type: "POST",
        //url: "Pedido.aspx/ObtenerProductosCampanaEmpleado",
        url: "Pedido.aspx/ObtenerProductosCampanaEmpleadoByPedido",
        data: "{'IdEmpleado' : '" + $("#hdfEmpleado").val() + "'," +
                "'IdCampana' : " + window.parent.CampanaConf.IdCampana + "," +
                "'pWhere' : '" + where + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            productosBase = JSON.parse(resultado.d);
            var idUltimoPlan = 0;
            var indexPlanBase = 0;
            for (var i = 0; i < productosBase.length; i++) {

                if (window.parent.FlagMantenerPlan != undefined && window.parent.FlagMantenerPlan == "True" && window.parent.IdPlanNumeroRenovar != productosBase[i].idPlan) {
                    continue;
                }
                else {// contingencia SACAR WARNING SOLO POR ESTE CASO
                    if (window.parent.NumeroRenovar == undefined && productosBase[i].P_inCod.toString() == '277') {// contingencia SACAR WARNING SOLO POR ESTE CASO
                        continue; // contingencia SACAR WARNING SOLO POR ESTE CASO
                    } // contingencia SACAR WARNING SOLO POR ESTE CASO
                    else {
                        if (window.parent.FlagMantenerPlan != undefined && window.parent.FlagMantenerPlan == "False" && productosBase[i].P_inCod.toString() == '277') {// contingencia SACAR WARNING SOLO POR ESTE CASO
                            continue; // contingencia SACAR WARNING SOLO POR ESTE CASO
                        } // contingencia SACAR WARNING SOLO POR ESTE CASO
                    }
                } // contingencia SACAR WARNING SOLO POR ESTE CASO

                //NO mostrar los modelos de tipo chip para pedidos de renovación
                //if (window.parent.NumeroRenovar != undefined && productosBase[i].IdGama == '9') {                
                if (window.parent.NumeroRenovar != undefined && productosBase[i].IdGama == '9' && !window.parent.btnPortabilidad) {
                    continue;
                }

                if (i == 0) {

                    
                    if (UsaFinanciamientoPrecioVariable) {
                        if (productosBase[i].FinanciamientoVariable.length > 0) {                  
                            productosBase[i].Precio = (parseFloat(productosBase[i].FinanciamientoVariable[0].Precio) / productosBase[i].FinanciamientoVariable[0].Cuotas);                            
                            productosBase[i].IdTipoFinanciamiento = productosBase[i].FinanciamientoVariable[0].IdFinanciamiento;                            
                        }
                    }

                    productos.push(new MiProducto(
                    productosBase[i].P_inCod,
                    productosBase[i].vcNom,
                    productosBase[i].imIma,
                    productosBase[i].vcDes,
                    productosBase[i].Precio,
                    productosBase[i].CantidadTotal,
                    productosBase[i].CantidadUsada,
                    productosBase[i].CantidadDisponible,
                    productosBase[i].Reservable,
                    productosBase[i].IdGama,
                    productosBase[i].ObligPlanDep,
                    productosBase[i].PrercioPlan,
                    productosBase[i].IdTipoFinanciamiento));
                    continue;
                }

                //if (productosBase[i].IdPlanBase == productosBase[i].P_inCod) {
                var idProducto = productosBase[i].P_inCod;
                //}
                if (btSoloPlanesMayor) {
                    if (parseFloat(window.parent.PrecioPlanNumeroRenovar) < parseFloat(productosBase[i].PrercioPlan)) {
                        idUltimoPlan = productosBase[i].IdPlanBase;

                        for (var j = 0; j < productosBase.length; j++) {
                            if (productosBase[j].idPlan == idUltimoPlan && productosBase[j].P_inCod == idProducto) {
                                indexPlanBase = j;
                                break;
                            }
                        }

                        //if (idUltimoPlan != 0) {
                        //    idUltimoPlan = 0;
                        //}
                    } else {
                        continue;
                    }
                }

                var entro = false;
                for (var z = 0; z < productos.length; z++) {
                    if (productos[z].P_inCod == productosBase[i].P_inCod) {
                        entro = true;
                        break;
                    }
                }
                if (entro) {
                    continue;
                }
                if (!btSoloPlanesMayor) {

                    if (UsaFinanciamientoPrecioVariable) {
                        if (productosBase[i].FinanciamientoVariable.length > 0) {
                            productosBase[i].Precio = (parseFloat(productosBase[i].FinanciamientoVariable[0].Precio) / productosBase[i].FinanciamientoVariable[0].Cuotas);
                            productosBase[i].IdTipoFinanciamiento = productosBase[i].FinanciamientoVariable[0].IdFinanciamiento;
                        }
                    }

                    productos.push(new MiProducto(
                        productosBase[i].P_inCod,
                        productosBase[i].vcNom,
                        productosBase[i].imIma,
                        productosBase[i].vcDes,
                        productosBase[i].Precio,
                        productosBase[i].CantidadTotal,
                        productosBase[i].CantidadUsada,
                        productosBase[i].CantidadDisponible,
                        productosBase[i].Reservable,
                        productosBase[i].IdGama,
                        productosBase[i].ObligPlanDep,
                        productosBase[i].PrercioPlan,
                        productosBase[i].IdTipoFinanciamiento));

             

                } else {

                    if (UsaFinanciamientoPrecioVariable) {
                        if (productosBase[indexPlanBase].FinanciamientoVariable.length > 0) {
                            productosBase[indexPlanBase].Precio = (parseFloat(productosBase[indexPlanBase].FinanciamientoVariable[0].Precio) / productosBase[indexPlanBase].FinanciamientoVariable[0].Cuotas);
                            productosBase[indexPlanBase].IdTipoFinanciamiento = productosBase[indexPlanBase].FinanciamientoVariable[0].IdFinanciamiento;
                        }
                    }

                    productos.push(new MiProducto(
                        productosBase[indexPlanBase].P_inCod,
                        productosBase[indexPlanBase].vcNom,
                        productosBase[indexPlanBase].imIma,
                        productosBase[indexPlanBase].vcDes,
                        productosBase[indexPlanBase].Precio,
                        productosBase[indexPlanBase].CantidadTotal,
                        productosBase[indexPlanBase].CantidadUsada,
                        productosBase[indexPlanBase].CantidadDisponible,
                        productosBase[indexPlanBase].Reservable,
                        productosBase[indexPlanBase].IdGama,
                        productosBase[indexPlanBase].ObligPlanDep,
                        productosBase[indexPlanBase].PrercioPlan,
                        productosBase[indexPlanBase].IdTipoFinanciamiento));       
                }

            }

         
            var AltoGrilla = 0;
            AltoGrilla = altoPagina - ($("#contCampaña").height() + 115);
            if (AltoGrilla <= 0) {
                AltoGrilla = 280;
            }

            var ancheDesc;
            if (window.parent.esPreVentaActiva) {
                ancheDesc = 120;
            }
            else {
                ancheDesc = 70;
            }

            $("#gridPro").kendoGrid({
                dataSource: {
                    data: productos,
                    pageSize: 7
                },
                dataBinding: onDataBinding,
                dataBound: onDataBound,
                groupable: false,
                sortable: false,
                navigatable: true,
                pageable: {
                    refresh: true,
                    //pageSizes: false,
                    pageSizes: [7],
                    numeric: true,
                    //buttonCount: 1,
                    messages: {
                        itemsPerPage: "modelos por página",
                        display: '<b style="font-size: 20px;color: #c52b10;">{0}-{1} de {2} MODELOS</b>',
                        empty: "",
                        first: "Ir a primera página",
                        last: "Ir a última página",
                        next: "Ir a página siguiente",
                        previous: "Ir a página anterior"
                    }
                },
                rowTemplate: kendo.template($("#rowTemplateCarrito").html()),
                altRowTemplate: kendo.template($("#altRowTemplateCarrito").html()),
                height: AltoGrilla,
                columns: [
                    { field: "foto", width: "50px", title: "Producto" },
                    { field: "detalles", width: ancheDesc, title: "Detalles" },
                    { field: "Stock", width: "40px", title: "Stock", attributes: { style: "text-align:center;" }, hidden: window.parent.esPreVentaActiva },
                    { field: "Precio", width: "40px", title: "Precio Lista", attributes: { style: "text-align:right;" } },
                    { field: "Comprar", width: "60px", title: "Comprar", attributes: { style: "text-align:right;" } }
                ]
            });
            //$(".k-grid-header", "#pSelecPro").css({ "float": "left !important" });geig1

            if ($("#hdfIdPedidoEditar").val() != "0") {

                $.ajax({
                    type: "POST",
                    url: "Pedido.aspx/getDetallePedidoByPedido",
                    data: "{'prIdPedido': '" + $("#hdfIdPedidoEditar").val() + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (resultado) {


                        var columnas = JSON.parse(resultado.d[0]);
                        var filas = JSON.parse(resultado.d[1]);
                        esEditar = true;

                        for (var i = 0; i < filas.length; i++) {
                            var pro = obtenerProducto(filas[i].idEquipo);
                            arregloSeleccion.push(pro);
                            arregloSeleccion[i].Accion = "0";
                            arregloSeleccion[i].IdDetalle = filas[i].idDetallePedido;
                            arregloSeleccion[i].Numero = filas[i].Número;
                            arregloSeleccion[i].Precio = parseFloat(filas[i].Precio_Equipo);
                            arregloSeleccion[i].IdPlan = filas[i].idPlan;
                            arregloSeleccion[i].NumMeses = parseInt(filas[i].Meses_Contrato);
                            arregloSeleccion[i].MinPrecioPlan = parseFloat(filas[i].Precio_Plan);
                            arregloSeleccion[i].CuotasEquipo = parseFloat(filas[i].Precio_Equipo) <= MontoMinimo ? 1 : MesesFinanciamientoEquipo;
                            arregloSeleccion[i].IdTipoFinanciamiento = filas[i].IdTipoFinanciamiento;
                            //alert(obtenerPlanBase(filas[i].idPlan));
                        }

                        if ($("#hdfMuestraNumeroContacto").val() == "1" && esEditar == false) {
                            $("#dvNumeroContactoPedido").show();
                        }
                        else {

                            $("#dvNumeroContactoPedido").hide();
                        }

                        $(".tap").hide();
                        $("#tapProducto").show();
                        $("#tapCarrito").show();
                        $("#tapDeclaracion").show();
                        $("#tapProducto").addClass("tapSelect");
                        $("#pSelecPro").show();
                        $("#pPanelCarrito").show();
                        $("#pDetEle").hide();
                        $("#pProcesoCompra").hide();
                        aumentarBurbuja();
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });

            }
            else {
                $(".tap").hide();
                $("#tapProducto").show();
                $("#tapCarrito").show();
                $("#tapDeclaracion").show();
                $("#tapProducto").addClass("tapSelect");
                $("#pSelecPro").show();
                $("#pPanelCarrito").show();
                $("#pDetEle").hide();
                $("#pProcesoCompra").hide();
            }

            //,height: 280

            //            $(".numerictextbox").kendoNumericTextBox({
            //                format: "# Unid(es)",
            //                value: 1,    
            //                min: 1,
            //                max: 99            
            //            });

            //            $(".subirCarrito").click(function(){
            //                var id = $.trim($($(this).parent()).find("div")[1]["innerText"]);
            //                var cant = $($($(this).parent()).find("input")[0]).val();
            //                cant = cant.split(' ')[0];

            //                var Burbuja = $($(this).parent().parent()).find(".numProIma")[0];
            //                var cantBurbuja = Burbuja["innerText"];
            //                cantBurbuja = parseInt(cantBurbuja) + parseInt(cant);
            //                $(Burbuja).text(cantBurbuja)
            //                $(Burbuja).show(300);

            //                for (var i = 0; i < cant ; i++) {
            //                    arregloSeleccion.push(obtenerProducto(id));
            //                }
            //                
            //                if (arregloSeleccion.length > 0) {
            //                    validarexceso();
            //                    aumentarBurbuja();
            //                }
            //            });

            //            $(".gridImaCar img").click(function(){
            //                mostrarDescPro(this);
            //            });

            //if ($("#hdfEsDirecto").val() == "1") {

            //                    var grid1 = $("#grdPedidos").data("kendoGrid");
            //                    while (grid1 == undefined) {                        
            //                        grid1 = $("#grdPedidos").data("kendoGrid");
            //                    }

            //                    
            //                    var id = -1;
            //                    for (var i = 0; i < grid1.dataSource._data.length; i++) {
            //                        if (grid1.dataSource._data[i].DscEstado == "Enviado") {                            
            //                            id = parseInt(grid1.dataSource._data[i].IdPedido);
            //                            break;
            //                        }
            //                    }
            //                    
            //                    if (id == -1) {
            //                        if(HabilitarNuevoPedido())
            //                        {
            //                            alerta("Ud. no puede hacer pedido nuevo mientras tenga uno en envío.");
            //                            return;
            //                        }       
            //$("#generalPedido").hide(0, function () {



            //obtenerCreditos();

            //$("#generalCarrito").fadeIn(300);
            //});

            //                    }
            //                    else{
            //                        $.ajax({
            //                            type: "POST",
            //                            url: "Pedido.aspx/getDetallePedidoByPedido",
            //                            data: "{'prIdPedido': '" + id + "'}",
            //                            contentType: "application/json; charset=utf-8",
            //                            dataType: "json",
            //                            success: function (resultado) {
            //            
            //                                $("#generalPedido").hide(0,function () {
            //                                    var columnas = JSON.parse(resultado.d[0]);
            //                                    var filas = JSON.parse(resultado.d[1]);
            //                                    $(".tap").hide();
            //                                    $("#tapProducto").show();
            //                                    $("#tapCarrito").show();
            //                                    $("#tapProducto").addClass("tapSelect");
            //                                    $("#pSelecPro").show();
            //                                    $("#pPanelCarrito").show();
            //                                    $("#pDetEle").hide();
            //                                    $("#pProcesoCompra").hide();
            //                                    arregloSeleccion = [];
            //                                    arregloEli = [];
            //                                    esEditar = true;
            //                                    
            //                                    for (var i = 0; i < filas.length; i++) {
            //                                        var pro = obtenerProducto(filas[i].idEquipo);
            //                                        arregloSeleccion.push(pro);
            //                                        arregloSeleccion[i].Accion = "0";
            //                                        arregloSeleccion[i].IdDetalle = filas[i].idDetallePedido;
            //                                    }
            //                                    aumentarBurbuja();
            //                                    $("#generalCarrito").fadeIn(300);
            //                                });

            //                            },
            //                            error: function (xhr, err, thrErr) {
            //                                MostrarErrorAjax(xhr, err, thrErr);
            //                            }
            //                        });
            //                    }    
            //            }
            //            else {

            //                if (!campanaActiva.CancelarPedido) {
            //                    $("#btnEliminarPedido").css("display", "none");
            //                }
            //                if (!campanaActiva.ModificarPedido) {
            //                    $("#btnEditarPedido").css("display", "none");
            //                }

            //                $("#pBotonesPedido").fadeIn(200);
            //            }

            fnListarTipoModeloDispositivo();

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function AumentarCreduti(sumar, sumarPlan) {

    var textocreduti = $($(".creduti")[0]).text();
    var textocredisp = $($(".credisp")[0]).text();
    var cantidadTextoUti = parseInt(textocreduti.split(' ')[1].replace(/,/g, ''));
    var cantidadtextodisp = parseInt(textocredisp.split(' ')[1].replace(/,/g, ''));

    var textoplanuti = $($(".creduti")[1]).text();
    var textoplanisp = $($(".credisp")[1]).text();
    var cantidadPlanUti = parseInt(textoplanuti.split(' ')[1].replace(/,/g, ''));
    var cantidadPlandisp = parseInt(textoplanisp.split(' ')[1].replace(/,/g, ''));

    var valor = cantidadTextoUti + sumar;
    var valor_res = cantidadtextodisp - sumar;
    $($(".creduti")[0]).text(oCultura.Moneda.vcSimMon + " " + valor.toString());
    $($(".credisp")[0]).text(oCultura.Moneda.vcSimMon + " " + valor_res.toString());

    var valor1 = cantidadPlanUti + parseInt(sumarPlan);
    var valor_res1 = cantidadPlandisp - parseInt(sumarPlan);
    $($(".creduti")[1]).text(oCultura.Moneda.vcSimMon + " " + valor1.toString());
    $($(".credisp")[1]).text(oCultura.Moneda.vcSimMon + " " + valor_res1.toString());
    $($(".indiBar")[2]).data("kendoSlider").value(valor);
    $($(".indiBar")[4]).data("kendoSlider").value(valor1);

    //porcentajes
    var porc1 = valor / (valor + valor_res) * 100;
    var porc2 = valor1 / (valor1 + valor_res1) * 100;
    if (porc1 > 100) {
        $($(".creporc")[0]).text('');
    } else {
        $($(".creporc")[0]).text(parseInt((porc1 == NaN ? 0 : porc1)).toString() + " %");
    }
    if (porc2 > 100) {
        $($(".creporc")[1]).text('');
    } else {
        $($(".creporc")[1]).text(parseInt((porc2 == NaN ? 0 : porc2)).toString() + " %");
    }
}

function AumentarCredutiByRef(sumar, e) {

    var textocreduti = $($(".creduti")[0]).text();
    var textocredisp = $($(".credisp")[0]).text();
    var cantidadTextoUti = parseInt(textocreduti.split(' ')[1].replace(/,/g, ''));
    var cantidadtextodisp = parseInt(textocredisp.split(' ')[1].replace(/,/g, ''));

    var textoplanuti = $($(".creduti")[1]).text();
    var textoplanisp = $($(".credisp")[1]).text();
    var cantidadPlanUti = parseInt(textoplanuti.split(' ')[1].replace(/,/g, ''));
    var cantidadPlandisp = parseInt(textoplanisp.split(' ')[1].replace(/,/g, ''));

    var valor = cantidadTextoUti + sumar;
    var valor_res = cantidadtextodisp - sumar;
    $($(".creduti")[0]).text(oCultura.Moneda.vcSimMon + " " + valor.toString());
    $($(".credisp")[0]).text(oCultura.Moneda.vcSimMon + " " + valor_res.toString());

    var texto = $($($(e).parent()).find(".cboPlanes")[2]).data("kendoComboBox").text();

    var valor1 = cantidadPlanUti + parseInt(texto.substring(texto.indexOf("(") + 1, texto.lastIndexOf(")")).replace(oCultura.Moneda.vcSimMon, ""));
    var valor_res1 = cantidadPlandisp - parseInt(texto.substring(texto.indexOf("(") + 1, texto.lastIndexOf(")")).replace(oCultura.Moneda.vcSimMon, ""));
    $($(".creduti")[1]).text(oCultura.Moneda.vcSimMon + " " + valor1.toString());
    $($(".credisp")[1]).text(oCultura.Moneda.vcSimMon + " " + valor_res1.toString());
    $($(".indiBar")[2]).data("kendoSlider").value(valor);
    $($(".indiBar")[4]).data("kendoSlider").value(valor1);

    //porcentajes
    var porc1 = valor / (valor + valor_res) * 100;
    var porc2 = valor1 / (valor1 + valor_res1) * 100;
    if (porc1 > 100) {
        $($(".creporc")[0]).text('');
    } else {
        $($(".creporc")[0]).text(parseInt((porc1 == NaN ? 0 : porc1)).toString() + " %");
    }
    if (porc2 > 100) {
        $($(".creporc")[1]).text('');
    } else {
        $($(".creporc")[1]).text(parseInt((porc2 == NaN ? 0 : porc2)).toString() + " %");
    }
}

function RestarCreduti(resta, e) {
    var textocreduti = $($(".creduti")[0]).text();
    var textocredisp = $($(".credisp")[0]).text();
    var cantidadTextoUti = parseInt(textocreduti.split(' ')[1].replace(/,/g, ''));
    var cantidadtextodisp = parseInt(textocredisp.split(' ')[1].replace(/,/g, ''));

    var valor = cantidadTextoUti - resta;
    var valor_res = cantidadtextodisp + resta;
    $($(".creduti")[0]).text(oCultura.Moneda.vcSimMon + " " + valor.toString());
    $($(".credisp")[0]).text(oCultura.Moneda.vcSimMon + " " + valor_res.toString());

    var textoplanuti = $($(".creduti")[1]).text();
    var textoplanisp = $($(".credisp")[1]).text();
    var cantidadPlanUti = parseInt(textoplanuti.split(' ')[1].replace(/,/g, ''));
    var cantidadPlandisp = parseInt(textoplanisp.split(' ')[1].replace(/,/g, ''));

    var texto = $($($(e).parent()).find(".cboPlanes")[2]).data("kendoComboBox").text();

    var valor1 = cantidadPlanUti - parseInt(texto.substring(texto.indexOf("(") + 1, texto.lastIndexOf(")")).replace(oCultura.Moneda.vcSimMon, ""));
    var valor_res1 = cantidadPlandisp + parseInt(texto.substring(texto.indexOf("(") + 1, texto.lastIndexOf(")")).replace(oCultura.Moneda.vcSimMon, ""));

    $($(".creduti")[1]).text(oCultura.Moneda.vcSimMon + " " + valor1.toString());
    $($(".credisp")[1]).text(oCultura.Moneda.vcSimMon + " " + valor_res1.toString());

    $($(".indiBar")[2]).data("kendoSlider").value(valor);
    $($(".indiBar")[4]).data("kendoSlider").value(valor1);

    //porcentajes
    var porc1 = valor / (valor + valor_res) * 100;
    var porc2 = valor1 / (valor1 + valor_res1) * 100;
    if (porc1 > 100) {
        $($(".creporc")[0]).text('');
    } else {
        $($(".creporc")[0]).text(parseInt((porc1 == NaN ? 0 : porc1)).toString() + " %");
    }
    if (porc2 > 100) {
        $($(".creporc")[1]).text('');
    } else {
        $($(".creporc")[1]).text(parseInt((porc2 == NaN ? 0 : porc2)).toString() + " %");
    }
}

function RestarCredutiPorMonto(MontoEquipo, MontoPlan) {
    var textocreduti = $($(".creduti")[0]).text();
    var textocredisp = $($(".credisp")[0]).text();
    var cantidadTextoUti = parseInt(textocreduti.split(' ')[1].replace(/,/g, ''));
    var cantidadtextodisp = parseInt(textocredisp.split(' ')[1].replace(/,/g, ''));

    var valor = cantidadTextoUti - MontoEquipo;
    var valor_res = cantidadtextodisp + MontoEquipo;
    $($(".creduti")[0]).text(oCultura.Moneda.vcSimMon + " " + valor.toString());
    $($(".credisp")[0]).text(oCultura.Moneda.vcSimMon + " " + valor_res.toString());

    var textoplanuti = $($(".creduti")[1]).text();
    var textoplanisp = $($(".credisp")[1]).text();
    var cantidadPlanUti = parseInt(textoplanuti.split(' ')[1].replace(/,/g, ''));
    var cantidadPlandisp = parseInt(textoplanisp.split(' ')[1].replace(/,/g, ''));

    var valor1 = cantidadPlanUti - MontoPlan;
    var valor_res1 = cantidadPlandisp + MontoPlan;

    $($(".creduti")[1]).text(oCultura.Moneda.vcSimMon + " " + valor1.toString());
    $($(".credisp")[1]).text(oCultura.Moneda.vcSimMon + " " + valor_res1.toString());

    $($(".indiBar")[2]).data("kendoSlider").value(valor);
    $($(".indiBar")[4]).data("kendoSlider").value(valor1);

    //porcentajes
    var porc1 = valor / (valor + valor_res) * 100;
    var porc2 = valor1 / (valor1 + valor_res1) * 100;
    if (porc1 > 100) {
        $($(".creporc")[0]).text('');
    } else {
        $($(".creporc")[0]).text(parseInt((porc1 == NaN ? 0 : porc1)).toString() + " %");
    }
    if (porc2 > 100) {
        $($(".creporc")[1]).text('');
    } else {
        $($(".creporc")[1]).text(parseInt((porc2 == NaN ? 0 : porc2)).toString() + " %");
    }
}

function SumarCredutiPorMonto(MontoEquipo, MontoPlan) {
    var textocreduti = $($(".creduti")[0]).text();
    var textocredisp = $($(".credisp")[0]).text();
    var cantidadTextoUti = parseInt(textocreduti.split(' ')[1].replace(/,/g, ''));
    var cantidadtextodisp = parseInt(textocredisp.split(' ')[1].replace(/,/g, ''));

    var valor = cantidadTextoUti + MontoEquipo;
    var valor_res = cantidadtextodisp - MontoEquipo;
    $($(".creduti")[0]).text(oCultura.Moneda.vcSimMon + " " + valor.toString());
    $($(".credisp")[0]).text(oCultura.Moneda.vcSimMon + " " + valor_res.toString());

    var textoplanuti = $($(".creduti")[1]).text();
    var textoplanisp = $($(".credisp")[1]).text();
    var cantidadPlanUti = parseInt(textoplanuti.split(' ')[1].replace(/,/g, ''));
    var cantidadPlandisp = parseInt(textoplanisp.split(' ')[1].replace(/,/g, ''));

    var valor1 = cantidadPlanUti + MontoPlan;
    var valor_res1 = cantidadPlandisp - MontoPlan;

    $($(".creduti")[1]).text(oCultura.Moneda.vcSimMon + " " + valor1.toString());
    $($(".credisp")[1]).text(oCultura.Moneda.vcSimMon + " " + valor_res1.toString());

    $($(".indiBar")[2]).data("kendoSlider").value(valor);
    $($(".indiBar")[4]).data("kendoSlider").value(valor1);

    //porcentajes
    var porc1 = valor / (valor + valor_res) * 100;
    var porc2 = valor1 / (valor1 + valor_res1) * 100;
    if (porc1 > 100) {
        $($(".creporc")[0]).text('');
    } else {
        $($(".creporc")[0]).text(parseInt((porc1 == NaN ? 0 : porc1)).toString() + " %");
    }
    if (porc2 > 100) {
        $($(".creporc")[1]).text('');
    } else {
        $($(".creporc")[1]).text(parseInt((porc2 == NaN ? 0 : porc2)).toString() + " %");
    }
}

function aumentarBurbuja() {

    //$($(".indiBar")[2]).data("kendoSlider").value(productoPrecioTotal());  


    $("#btnCarritoCant").hide(200, function () {

        //if (ArregloSeleccion_length() > 0) {
        if (arregloSeleccion.length > 0) {
            $("#btnCarritoCant").css("background-color", "red");
        }
        else {
            $("#btnCarritoCant").css("background-color", "#003F59");
        }

        //$($("#btnCarritoCant span")[0]).text(ArregloSeleccion_length());
        $($("#btnCarritoCant span")[0]).text(arregloSeleccion.length);
        $("#btnCarritoCant").show(200);
    });
}

function obtenerProducto(id) {
    for (var i = 0; i < productos.length; i++) {
        if (productos[i].P_inCod == id) {
            var pro = productos[i];

            //var idPrecio = obtenerPrecioMinimoPlan(pro.P_inCod).split("|"); //precioMin + "|" + id + "|" + meses;
            //var miPrecio = obtenerPrecioEquipoPorMeses_yPlan(id, idPrecio[2], idPrecio[1]);
            //return new MiProductoElegido(pro.P_inCod, pro.vcNom, pro.imIma, pro.vcDes, miPrecio, pro.CantidadTotal, pro.CantidadUsada, pro.CantidadDisponible, pro.Reservable, idPrecio[1], idPrecio[2], parseInt(idPrecio[0]), pro.IdGama, pro.ObligPlanDep);

            var _precios = obtenerPrecioSegunCredito(pro.P_inCod).split("|"); //precioPlan + "|" + id + "|" + meses + "|" + precioEquipo;
            return new MiProductoElegido(pro.P_inCod, pro.vcNom, pro.imIma, pro.vcDes, _precios[3], pro.CantidadTotal, pro.CantidadUsada, pro.CantidadDisponible, pro.Reservable, _precios[1], _precios[2], parseFloat(_precios[0]), pro.IdGama, pro.ObligPlanDep, 0, pro.IdTipoFinanciamiento);
        }
    }
}

function obtenerPrecioMinimoPlan(IdProducto) {
    var precioMin;
    var id;
    var meses;
    for (var i = 0; i < productosBase.length; i++) {

        //        if (window.parent.NumeroRenovar != undefined &&
        //        window.parent.IdPlanNumeroRenovar != productosBase[i].idPlan &&
        //        window.parent.FlagMantenerPlan == "True"
        //        ) {
        //            continue;
        //        }

        //        if (window.parent.NumeroRenovar != undefined && window.parent.FlagMantenerPlan == "False" && productosBase[i].EsNuevo == "0") {
        //            continue;
        //        }

        //        if (window.parent.NumeroRenovar == undefined && productosBase[i].EsNuevo == "0") {
        //            continue;
        //        }
        if (productosBase[i].P_inCod == IdProducto) {

            if (window.parent.NumeroRenovar == undefined) {
                if (productosBase[i].EsNuevo == "0") {
                    continue;
                }
            }
            else {
                if (window.parent.FlagMantenerPlan == "True") {
                    if (window.parent.IdPlanNumeroRenovar != productosBase[i].idPlan) {
                        continue;
                    }
                }
                else {
                    if (obligarMantenerPlan) {
                        if (window.parent.IdPlanNumeroRenovar == productosBase[i].idPlan) {
                            if (productosBase[i].idPlan_equivalente == -1) {
                                precioMin = productosBase[i].PrercioPlan;
                                id = productosBase[i].idPlan;
                                meses = productosBase[i].MesesContrato;
                            }
                            else {
                                precioMin = productosBase[i].PrercioPlan_equivalente;
                                id = productosBase[i].idPlan_equivalente;
                                meses = productosBase[i].MesesContrato;
                            }

                            return precioMin + "|" + id + "|" + meses;
                        }
                        else {

                            if (productosBase[i].EsNuevo == "0") {//geig campana 24
                                continue; //geig campana 24
                            }

                        }
                    }
                    else {
                        if (productosBase[i].EsNuevo == "0") {//geig campana 24
                            continue; //geig campana 24
                        }
                    }

                }
            }



            if (precioMin == undefined) {
                if (productosBase[i].idPlan_equivalente == -1) {
                    if (productosBase[i].ObligPlanDep == 'False' || productosBase[i].planUnico == '1' || (productosBase[i].ObligPlanDep == 'True' && productosBase[i].idPlan != productosBase[i].IdPlanBase)) {
                        //if (productosBase[i].ObligPlanDep == '0' || (productosBase[i].ObligPlanDep == '1' && productosBase[i].idPlan != productosBase[i].IdPlanBase)) {
                        precioMin = productosBase[i].PrercioPlan;
                        id = productosBase[i].idPlan;
                        meses = productosBase[i].MesesContrato;
                    }
                }
                else {
                    precioMin = productosBase[i].PrercioPlan_equivalente;
                    id = productosBase[i].idPlan_equivalente;
                    meses = productosBase[i].MesesContrato;
                }

            }
            else {
                if (parseFloat(precioMin) > parseFloat(productosBase[i].PrercioPlan)) {
                    if (productosBase[i].idPlan_equivalente == -1) {
                        if (productosBase[i].ObligPlanDep == 'False' || productosBase[i].planUnico == '1' || (productosBase[i].ObligPlanDep == 'True' && productosBase[i].idPlan != productosBase[i].IdPlanBase)) {
                            //if (productosBase[i].ObligPlanDep == '0' || (productosBase[i].ObligPlanDep == '1' && productosBase[i].idPlan != productosBase[i].IdPlanBase)) {

                            //indicadoresVariante[0]["Disponible"] = parseFloat((indicadoresVariante[0]["Disponible"] - montoEquipo).toFixed(numDecimales));
                            //indicadoresVariante[0]["Utilizado"] = parseFloat((indicadoresVariante[0]["Utilizado"] + montoEquipo).toFixed(numDecimales));
                            //
                            //indicadoresVariante[1]["Disponible"] = parseFloat((indicadoresVariante[1]["Disponible"] - montoPlan).toFixed(numDecimales));
                            //indicadoresVariante[1]["Utilizado"] = parseFloat((indicadoresVariante[1]["Utilizado"] + montoPlan).toFixed(numDecimales));

                            //obtenerPrecioEquipoPorMeses_yPlan(id, idPrecio[2], idPrecio[1]);
                            //equipo - planes


                            precioMin = productosBase[i].PrercioPlan;
                            id = productosBase[i].idPlan;
                            meses = productosBase[i].MesesContrato;
                        }
                    }
                    else {
                        precioMin = productosBase[i].PrercioPlan_equivalente;
                        id = productosBase[i].idPlan_equivalente;
                        meses = productosBase[i].MesesContrato;
                    }
                }
            }
        }
    }
    return precioMin + "|" + id + "|" + meses;
}

function obtenerNumero(value) {
    for (var i = 0; i < numerosRenovar.length; i++) {
        if (numerosRenovar[i].value == values) {
            var num = numerosRenovar[i];
            return new MiNumero(num.text, num.value);
        }
    }
}

function productoPrecioTotal() {
    var total = 0.0;
    for (var i = 0; i < arregloSeleccion.length; i++) {
        if (MesesFinanciamientoEquipo == 1) {
            total = total + parseFloat(arregloSeleccion[i].Precio);
        } else {
            total = total + (parseFloat(arregloSeleccion[i].Precio) / arregloSeleccion[i].CuotasEquipo) + parseFloat(arregloSeleccion[i].MinPrecioPlan);
        }
    }
    return total;
}

function obtenerCreditos() {
    //    $.ajax({
    //        type: "POST",
    //        url: "Dashboard_pedido.aspx/mostrarProductoCreditoAsignado",
    //        data: "{'prIdEmpleado': '" + $("#hdfEmpleado").val() + "'}",
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function (resultado) {
    //            creditos = resultado.d;
    creditos = CreditoUsuario;


    $.each(creditos.ProductoCreditoAsignado, function (i, val) {
        if (val["Aprobado"] == 0) {
            var porc = 0;
        } else {
            var porc = parseInt(val["Utilizado"] / val["Aprobado"] * 100);
        }
        $("#contIndicadores").append('<div class= "itemIndicador">' +
        '<div class="indiDesc">' + val["DescripcionProducto"] + '</div>' +
        '<div class="indiDisponible">' + formatNumber.newo(val["Aprobado"], oCultura.Moneda.vcSimMon) + '</div>' +
        '<div class="creduti indiDisponible">' + formatNumber.newo(val["Utilizado"], oCultura.Moneda.vcSimMon) + '</div>' +
        '<div class="credisp indiDisponible">' + formatNumber.newo(val["Disponible"], oCultura.Moneda.vcSimMon) + '</div>' +
        '<div id="inibar' + i + '" class="indiBar" style="width:75px;"></div><div class="creporc indiDisponible" style="width:35px; margin-left:5px;">' + porc + ' %</div><span  id="alert' + i + '" class="admiracion k-icon k-i-note k-error-colored"></div>');

        $("#inibar" + i).kendoSlider({
            min: 0,
            max: val["Aprobado"],
            value: val["Utilizado"],
            showButtons: false,
            enabled: false,
            tooltip: {
                enabled: false
            }
        });

        //var dd = $("#inibar" + i).parent().find("a");
        $($("#inibar" + i).parent().find("a")[0]).attr("title", "");
        $($("#inibar" + i).parent().find("a")[1]).attr("title", "");

        $("#alert" + i).kendoTooltip({
            content: "Usted ha superado su consumo disponible.",
            animation: {
                open: {
                    effects: "fade:in",
                    duration: 1000
                }
            },
            position: "top"
        });

        $("#alert" + i).click(function () {
            $(".tap").removeClass("tapSelect");
            $("#tapCarrito").addClass("tapSelect");

            $("#detalleTaps > div").hide(0, function () {

                validarexceso();
                validarexcesoPlan();

                $("#pDetEle").fadeIn(200, function () {
                    if (arregloSeleccion.length != 0) {
                        var dataSource = new kendo.data.DataSource({
                            data: arregloSeleccion
                        });

                        var gridele = $("#gridDetEle").data("kendoGrid");
                        gridele.setDataSource(dataSource);

                        enlazarClick();
                    }
                });
            });
        });

        indicadoresInicial.push(new miIndicadorCredito(val["DescripcionProducto"].toString()
                                                    , parseFloat(val["Aprobado"])
                                                    , parseFloat(val["Disponible"])
                                                    , parseFloat(val["Utilizado"])
                                                    ));

        indicadoresVariante.push(new miIndicadorCredito(val["DescripcionProducto"].toString()
                                                    , parseFloat(val["Aprobado"])
                                                    , parseFloat(val["Disponible"])
                                                    , parseFloat(val["Utilizado"])
                                                    ));

    });

    if (window.parent.NumeroRenovar != undefined) {
        //RestarCredutiPorMonto(0, parseInt(window.parent.PrecioPlanNumeroRenovar)); GEIG
        if ($("#hdfIdPedidoEditar").val() == "0") {
            operarInidicadores(0, -(parseFloat(window.parent.PrecioPlanNumeroRenovar)));
        }
    }

    $("#generalCarrito").fadeIn(300, null, function () {
        //$(".k-grid-header", "#pSelecPro").css({ "float": "left !important" }); geig1
    });
    //indicadores = resul;

    //obtenerProductos();

    //        },
    //        error: function (xhr, err, thrErr) {
    //            MostrarErrorAjax(xhr, err, thrErr);
    //        }
    //    });
}

function enlazarClick() {

    //    $(".cboPlanes").kendoComboBox({
    //        dataTextField: "text",
    //        dataValueField: "value",
    //        dataSource: planes,
    //        filter: "contains",
    //        suggest: true,
    //        index: 0
    //    });

    var cboOnTop = $(".cboOnTop");
    var cboPlan = $(".cboPlanes");
    var cbomes = $(".cboMeses");
    var cboFinanciamientoVariable = $(".cboFinanVar");
    boolEnlazarClick = 1;

    for (var i = 0; i < cboPlan.length; i++) {
        $(cboPlan[i]).kendoComboBox({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: UsarPlanDep ? obtenerPlanesBase(arregloSeleccion[i].P_inCod) : obtenerPlanesByIdProducto(arregloSeleccion[i].P_inCod),
            filter: "contains",
            suggest: true,
            index: 0,
            enable: !(arregloSeleccion[i].Accion == "0"),
            open: function (e) {
                precioPlanAnterior = this.dataItem().precio;
                valuePlanAnterior = this.value();
                if (UsarPlanDep) {
                    if (!SoloPlanMayor) {
                        precioOnTopAnterior = parseFloat($($(this.input.parent().parent().parent().parent()).find(".cboOnTop")[2]).data("kendoComboBox").dataItem().precio);
                    } else {
                        precioOnTopAnterior = parseFloat($($(this.input.parent().parent().parent().parent()).find(".cboOnTop")[2]).data("kendoComboBox").dataSource._data[0].precio);
                    }
                }
                //if (precioOnTopAnterior != undefined) {
                //    precioOnTopAnterior = parseFloat($($(this.input.parent().parent().parent().parent()).find(".cboOnTop")[2]).data("kendoComboBox").dataItem().precio);
                //}
                //valueOnTopAnterior = this.value();
            },
            change: function (e) {
                var valorSumar = this.dataItem().precio;

                if (UsarPlanDep) {
                    var fila = this.input.parent().parent().parent().parent();

                    if (precioPlanAnterior != undefined) {
                        operarInidicadores(0, -(parseFloat(precioOnTopAnterior)));
                    }

                    var precioPlanOnTop;
                    var precioPlanValidar;
                    var idPlanValidado;
                    if (arregloSeleccion[parseInt(fila[0].rowIndex)].ObligPlanDep == 'True') {
                        precioPlanOnTop = obtenerPrecioSegunPlanBase($(this)[0]._optionID.split("-")[1], this.value(), parseInt(fila[0].rowIndex)).split("|");
                        precioPlanValidar = precioPlanOnTop[0];
                        idPlanValidado = precioPlanOnTop[1];
                    } else {
                        precioPlanValidar = valorSumar;
                        idPlanValidado = $(this)[0]._selectedValue;
                    }

                    if (validarexcesoBool_monto(0, parseFloat(precioPlanValidar))) {
                        operarInidicadores(0, parseFloat(precioOnTopAnterior));
                        this.value(valuePlanAnterior);
                        alerta("Usted ha superado su límite de crédito");
                        return;
                    }

                    var dtPlanesOnTop = obtenerPlanesDependientes($(this)[0]._optionID.split("-")[1], this.value());

                    //if (arregloSeleccion[parseInt(fila[0].rowIndex)].ObligPlanDep == 'True') {
                    //    arregloSeleccion[parseInt(fila[0].rowIndex)].IdPlan = dtPlanesOnTop[0].value;
                    //} else {
                    //    arregloSeleccion[parseInt(fila[0].rowIndex)].IdPlan = $(this)[0]._selectedValue;
                    //}
                    arregloSeleccion[parseInt(fila[0].rowIndex)].IdPlan = idPlanValidado;

                    //cargar ontop
                    var miDataPlanOnTop = new kendo.data.DataSource({
                        data: dtPlanesOnTop
                    });
                    var miCboOnTop = $($(this.input.parent().parent().parent()).find(".cboOnTop")[2]).data("kendoComboBox");
                    miCboOnTop.setDataSource(miDataPlanOnTop);
                } else {
                    if (precioPlanAnterior != undefined) {
                        operarInidicadores(0, -(parseFloat(precioPlanAnterior)));
                    }

                    if (validarexcesoBool_monto(0, parseFloat(valorSumar))) {
                        operarInidicadores(0, parseFloat(precioPlanAnterior));
                        this.value(valuePlanAnterior);
                        alerta("Usted ha superado su límite de crédito");
                        return;
                    }

                    //cargar meses
                    var sss = obtenerMesesByPlan(this.value(), $(this)[0]._optionID.split("-")[1]);
                    var miDataSourc = new kendo.data.DataSource({
                        data: sss
                    });
                    var miCboMes = $($(this.input.parent().parent().parent().parent()).find(".cboMeses")[2]).data("kendoComboBox");
                    MesContratoAnterior = miCboMes.value();
                    miCboMes.setDataSource(miDataSourc);

                    if (UsaFinanciamientoPrecioVariable)
                    {
                        var fila2 = this.input.parent().parent().parent().parent();

                        var fff = obtenerFinanciamientoVariable(this.value(), $(this)[0]._optionID.split("-")[1]);
                        var miDataSourcfff = new kendo.data.DataSource({
                            data: fff
                        });

                        var miCboFinanciamientoVariable = $($(this.input.parent().parent().parent().parent()).find(".cboFinanVar")[2]).data("kendoComboBox");
                     

                        miCboFinanciamientoVariable.setDataSource(miDataSourcfff);
                        miCboFinanciamientoVariable.select(0);

                        precioEquipoAnterior = miCboFinanciamientoVariable.dataItem().precio;

                        //arregloSeleccion[parseFloat(fila[0].rowIndex)].Precio = miCboFinanciamientoVariable.dataItem().precio;
                        arregloSeleccion[parseInt(fila2[0].rowIndex)].Precio = miCboFinanciamientoVariable.dataItem().precio;

                        $($($("#totalesCarrito > div")[0]).find("span")[0]).text(formatNumber.newo(productoPrecioTotal(), oCultura.Moneda.vcSimMon + " "));

                        if (precioEquipoAnterior != undefined) {

                            operarInidicadores(-parseFloat(precioEquipoAnterior), 0);
                        }
                        operarInidicadores(parseFloat(miCboFinanciamientoVariable.dataItem().precio), 0);
                    }



                }
            },
            //close: function (e) {
            //    var texto = this.text();
            //    if (texto.length > 43) {
            //        var texto1 = texto.substring(0, 33);
            //        var texto2 = texto.substring(texto.indexOf("("));
            //        e.sender._text = function () { return texto1 + "... " + texto2; };
            //    }
            //},
            //select: function (e) {
            //    //var texto = this.text();
            //    //var texto = e.sender._text;
            //    var texto = e.item.context.innerHTML;
            //    if (texto.length > 43) {
            //        var texto1 = texto.substring(0, 33);
            //        var texto2 = texto.substring(texto.indexOf("("));
            //        e.sender._text = function () { return texto1 + "... " + texto2; };
            //    } else {
            //        e.sender._text = function () { return texto; };
            //    }
            //},
            //value: obtenerPlanBase(arregloSeleccion[i].IdPlan),
            dataBound: function (e) {
                //var texto = this.text();
                //if (texto.length > 43) {
                //    var texto1 = texto.substring(0, 33);
                //    var texto2 = texto.substring(texto.indexOf("("));
                //    e.sender._text = function () { return texto1 + "... " + texto2 };
                //}
                //else {
                //    e.sender._text = function () { return texto; };
                //}
                if (window.parent.NumeroRenovar != undefined && window.parent.FlagMantenerPlan == "True") {
                    this.enable(false);
                }
                if (!UsarPlanDep) {
                    this.value(arregloSeleccion[i].IdPlan);
                } else {
                    this.value(obtenerPlanBase(arregloSeleccion[i].IdPlan));
                }
            }
        });
        //$(cboPlan[i]).data("kendoComboBox").input.attr("ReadOnly", true);
        if (UsarPlanDep) {
            $(cboOnTop[i]).kendoComboBox({
                dataTextField: "text",
                dataValueField: "value",
                //dataSource: obtenerPlanesDependientes(arregloSeleccion[i].P_inCod, arregloSeleccion[i].IdPlan),
                dataSource: obtenerPlanesDependientes(arregloSeleccion[i].P_inCod, obtenerPlanBase(arregloSeleccion[i].IdPlan)),
                filter: "contains",
                suggest: true,
                index: 0,
                enable: !(arregloSeleccion[i].Accion == "0"),
                open: function (e) {
                    precioOnTopAnterior = this.dataItem().precio;
                    valueOnTopAnterior = this.value();
                },
                change: function (e) {
                    var valorSumar = this.dataItem().precio;

                    if (precioOnTopAnterior != undefined) {
                        operarInidicadores(0, -(parseFloat(precioOnTopAnterior)));
                    }

                    if (validarexcesoBool_monto(0, parseFloat(valorSumar))) {
                        operarInidicadores(0, parseFloat(precioOnTopAnterior));
                        this.value(valueOnTopAnterior);
                        alerta("Usted ha superado su límite de crédito");
                        return;
                    }

                    var sss = obtenerMesesByPlan(this.value(), $(this)[0]._optionID.split("-")[1]);
                    var miDataSourc = new kendo.data.DataSource({
                        data: sss
                    });
                    var miCboMes = $($(this.input.parent().parent().parent().parent()).find(".cboMeses")[2]).data("kendoComboBox");
                    MesContratoAnterior = miCboMes.value();
                    miCboMes.setDataSource(miDataSourc);

                    if (UsaFinanciamientoPrecioVariable)
                    {
                        var fff = obtenerFinanciamientoVariable(this.value(), $(this)[0]._optionID.split("-")[1]);

                        var miDataSourcfff = new kendo.data.DataSource({
                            data: fff
                        });

                        var miCboFinanciamientoVariable = $($(this.input.parent().parent().parent().parent()).find(".cboFinanVar")[2]).data("kendoComboBox");
                        miCboFinanciamientoVariable.setDataSource(miDataSourcfff);
                    }

                },
                //select: function (e) {
                //    //var texto = this.text();
                //    var texto = e.item.context.innerHTML;
                //    if (texto.length > 30) {
                //        var texto1 = texto.substring(0, 20);
                //        var texto2 = texto.substring(texto.indexOf("("));
                //        e.sender._text = function () { return texto1 + "... " + texto2; };
                //    }
                //
                //},
                //value: arregloSeleccion[parseInt(fila[0].rowIndex)].IdPlan,
                dataBound: function (e) {
                    //var texto = this.text();
                    //if (texto.length > 30) {
                    //    var texto1 = texto.substring(0, 20);
                    //    var texto2 = texto.substring(texto.indexOf("("));
                    //    e.sender._text = function () { return texto1 + "... " + texto2 };
                    //}
                    //if (window.parent.NumeroRenovar != undefined && window.parent.FlagMantenerPlan == "True") {
                    //    this.enable(false);
                    //}
                    //this.value(arregloSeleccion[i].IdPlan);

                    var fila = this.input.parent().parent().parent().parent();
                    this.value(arregloSeleccion[parseFloat(fila[0].rowIndex)].IdPlan);

                    //cargar meses
                    var miCboMes = $($(this.input.parent().parent().parent().parent()).find(".cboMeses")[2]).data("kendoComboBox");
                    if (miCboMes != undefined) {
                        var ms = obtenerMesesByPlan(this.value(), $(this)[0]._optionID.split("-")[1]);
                        var miDataSourc = new kendo.data.DataSource({
                            data: ms
                        });
                        MesContratoAnterior = miCboMes.value();
                        miCboMes.setDataSource(miDataSourc);
                    }
                }
            });
            $(cboOnTop[i]).data("kendoComboBox").input.attr("ReadOnly", true);
            $(cboOnTop[i]).data("kendoComboBox").input.off("keydown");
        }
        $(cbomes[i]).kendoComboBox({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: obtenerMesesByPlan($(cboPlan[i])[0].value, arregloSeleccion[i].P_inCod),
            filter: "contains",
            suggest: true,
            index: 0,
            enable: !(arregloSeleccion[i].Accion == "0"),
            open: function (e) {
                MesContratoAnterior = this.value();
            },
            change: function (e) {
                var id = $(this)[0]._optionID.split("-")[1].split("_")[0];
                var val = $(this)[0]._selectedValue;
                //var miIdPlan = $($(this.input.parent().parent().parent().parent()).find(".cboPlanes")[2]).data("kendoComboBox").value();
                var miIdPlan = $($(this.input.parent().parent().parent().parent()).find(".cboOnTop")[2]).data("kendoComboBox").value();
                

                var precio = 0;
                var cuotas = 1;

                if (UsaFinanciamientoPrecioVariable) {
                    var miIdFinanciamiento = $($(this.input.parent().parent().parent().parent()).find(".cboFinanVar")[2]).data("kendoComboBox").value();

                    precio = obtenerPrecioFinanciamientoVariable(id, miIdFinanciamiento, miIdPlan, val);                  
                    cuotas = obtenerCuotaFinanciamientoVariable(id, miIdFinanciamiento, miIdPlan, val);
                    arregloSeleccion[parseFloat(fila[0].rowIndex)].Cuotas = 1;
                }
                else {
                    precio = obtenerPrecioEquipoPorMeses_yPlan(id, val, miIdPlan);
                }

                //var precio = obtenerPrecioEquipoPorMeses(id, val);
     

                var fila = this.input.parent().parent().parent().parent();

                //RestarCreduti(parseInt(arregloSeleccion[parseInt(fila[0].rowIndex)].Precio), $(fila[0]).find(".eliEle")[0]); GEIG

                operarInidicadores(-(parseFloat(arregloSeleccion[parseFloat(fila[0].rowIndex)].Precio)), 0, arregloSeleccion[parseFloat(fila[0].rowIndex)].CuotasEquipo);
                operarInidicadores(parseFloat(precio), 0, arregloSeleccion[parseFloat(fila[0].rowIndex)].CuotasEquipo);

                if (validarexcesoBool_monto(0, 0)) {
                    operarInidicadores(-(parseFloat(precio)), 0, arregloSeleccion[parseFloat(fila[0].rowIndex)].CuotasEquipo);
                    operarInidicadores(parseFloat(arregloSeleccion[parseFloat(fila[0].rowIndex)].Precio), 0, arregloSeleccion[parseFloat(fila[0].rowIndex)].CuotasEquipo);

                    alerta("Usted ha superado su límite de crédito");
                    this.value(MesContratoAnterior);
                    return;
                }

                arregloSeleccion[parseFloat(fila[0].rowIndex)].Precio = precio;
                arregloSeleccion[parseFloat(fila[0].rowIndex)].NumMeses = val;

                //AumentarCredutiByRef(parseInt(arregloSeleccion[parseInt(fila[0].rowIndex)].Precio), $(fila[0]).find(".eliEle")[0]);GEIG
                //AumentarCreduti(parseInt(arregloSeleccion[parseInt(fila[0].rowIndex)].Precio), parseInt(arregloSeleccion[parseInt(fila[0].rowIndex)].MinPrecioPlan));
                               
                
                if (UsaFinanciamientoPrecioVariable == true) {

                    if (cuotas > 1) {
                        $(fila[0]).find(".tdPrePro").html(oCultura.Moneda.vcSimMon + " " + parseFloat(precio.toFixed(2)) + "<br/> (Al mes)");
                    }
                    else {
                        $(fila[0]).find(".tdPrePro").html(oCultura.Moneda.vcSimMon + " " + precio.toFixed(2) + "<br/> (Al contado)");
                    }
                   
                }
                


                $($($("#totalesCarrito > div")[0]).find("span")[0]).text(formatNumber.newo(productoPrecioTotal(), oCultura.Moneda.vcSimMon + " "));

                //nuevos datos
                if (MesesFinanciamientoEquipo != 1) {
                    var labelDetalle = arregloSeleccion[parseFloat(fila[0].rowIndex)].CuotasEquipo == 1 ? "" : "<br/>(Al mes)";
                    var precioMensual = precio / arregloSeleccion[parseFloat(fila[0].rowIndex)].CuotasEquipo;
                    var totalMensual = (precio / arregloSeleccion[parseFloat(fila[0].rowIndex)].CuotasEquipo) + arregloSeleccion[parseFloat(fila[0].rowIndex)].MinPrecioPlan;
                    $(fila[0]).find(".tdPreMen").html(formatNumber.newo(precioMensual, oCultura.Moneda.vcSimMon + " ") + labelDetalle);
                    $(fila[0]).find(".tdTotMen").html(formatNumber.newo(totalMensual, oCultura.Moneda.vcSimMon + " "));
                }
                //                validarexceso(); GEIG
                //                validarexcesoPlan();
            },
            dataBound: function (e) {
                if (boolEnlazarClick == 1) {
                    if (arregloSeleccion[i].NumMeses != 0) {
                        this.value(arregloSeleccion[i].NumMeses);
                    }
                }
                else if (boolEnlazarClick == 2) {
                    this.value(MesContratoAnterior);
                    boolEnlazarClick = 0;
                }
                else {
                    this.select(this.ul.children().eq(0));
                    var id = $(this)[0]._optionID.split("-")[1].split("_")[0];
                    var val = $(this)[0]._selectedValue;
                    var miIdPlan;
                    if (!UsarPlanDep) {
                        miIdPlan = $($(this.input.parent().parent().parent().parent()).find(".cboPlanes")[2]).data("kendoComboBox").value();
                    } else {
                        miIdPlan = $($(this.input.parent().parent().parent().parent()).find(".cboOnTop")[2]).data("kendoComboBox").value();
                    }

                   

                    var precio = 0;
                    var cuotas = 1;

                    if (UsaFinanciamientoPrecioVariable) {
                        var miIdFinanciamiento = $($(this.input.parent().parent().parent().parent()).find(".cboFinanVar")[2]).data("kendoComboBox").value();

                        precio = obtenerPrecioFinanciamientoVariable(id, miIdFinanciamiento, miIdPlan, val);
                        precioEquipoAnterior = precio;
                        cuotas = obtenerCuotaFinanciamientoVariable(id, miIdFinanciamiento, miIdPlan, val);

                    }
                    else {
                        precio = obtenerPrecioEquipoPorMeses_yPlan(id, val, miIdPlan);
                    }



                    //var precio = obtenerPrecioEquipoPorMeses(id, val);
                    //var precio = obtenerPrecioEquipoPorMeses_yPlan(id, val, miIdPlan);

                    var fila = this.input.parent().parent().parent().parent();
                    var gama = arregloSeleccion[parseFloat(fila[0].rowIndex)].IdGama;          

                    //cuotasEquipo = parseFloat(precio) <= parseFloat(MontoMinimo) ? 1 : MesesFinanciamientoEquipo;
                    cuotasEquipo = parseFloat(precio) <= parseFloat(MontoMinimo) ? 1 : (gama !=9 ? MesesFinanciamientoEquipo : MesesFinanciamientoChip) ;            
                    

                    operarInidicadores(-(parseFloat(arregloSeleccion[parseFloat(fila[0].rowIndex)].Precio)), 0, arregloSeleccion[parseFloat(fila[0].rowIndex)].CuotasEquipo);
                    //operarInidicadores(parseFloat(precio), 0, arregloSeleccion[parseFloat(fila[0].rowIndex)].CuotasEquipo);
                    operarInidicadores(parseFloat(precio), 0, cuotasEquipo);

                    if (validarexcesoBool_monto(0, 0)) {
                        //operarInidicadores(-(parseFloat(precio)), 0, arregloSeleccion[parseFloat(fila[0].rowIndex)].CuotasEquipo);
                        operarInidicadores(-(parseFloat(precio)), 0, cuotasEquipo);
                        operarInidicadores(parseFloat(arregloSeleccion[parseFloat(fila[0].rowIndex)].Precio), 0, arregloSeleccion[parseFloat(fila[0].rowIndex)].CuotasEquipo);

                        operarInidicadores(0, parseFloat(precioOnTopAnterior));
                        if (!UsarPlanDep) {
                            $($(this.input.parent().parent().parent().parent()).find(".cboPlanes")[2]).data("kendoComboBox").value(valuePlanAnterior);
                        } else {
                            $($(this.input.parent().parent().parent().parent()).find(".cboOnTop")[2]).data("kendoComboBox").value(valueOnTopAnterior);
                        }
                        var sss = obtenerMesesByPlan(valuePlanAnterior, id);
                        var miDataSourc = new kendo.data.DataSource({
                            data: sss
                        });
                        var miCboMes = $($(this.input.parent().parent().parent().parent()).find(".cboMeses")[2]).data("kendoComboBox");
                        boolEnlazarClick = 2;
                        miCboMes.setDataSource(miDataSourc);

                        if (UsaFinanciamientoPrecioVariable)
                        {
                            var fff = obtenerFinanciamientoVariable(valuePlanAnterior, id);
                            var miDataSourcfff = new kendo.data.DataSource({
                                data: fff
                            });

                            var miCboFinanciamientoVariable = $($(this.input.parent().parent().parent().parent()).find(".cboFinanVar")[2]).data("kendoComboBox");
                            miCboFinanciamientoVariable.setDataSource(miDataSourcfff);
                        }
   


                        alerta("Usted ha superado su límite de crédito");
                        //this.value(MesContratoAnterior);
                        return;
                    }

                    arregloSeleccion[parseFloat(fila[0].rowIndex)].Precio = precio;
                    arregloSeleccion[parseFloat(fila[0].rowIndex)].NumMeses = val;
                    arregloSeleccion[parseFloat(fila[0].rowIndex)].IdPlan = miIdPlan;
                    arregloSeleccion[parseFloat(fila[0].rowIndex)].CuotasEquipo = cuotasEquipo; //<<<---NUEVO
                    if (!UsarPlanDep) {
                        arregloSeleccion[parseFloat(fila[0].rowIndex)].MinPrecioPlan = parseFloat($($(this.input.parent().parent().parent().parent()).find(".cboPlanes")[2]).data("kendoComboBox").dataItem().precio);
                        operarInidicadores(0, parseFloat($($(this.input.parent().parent().parent().parent()).find(".cboPlanes")[2]).data("kendoComboBox").dataItem().precio));
                    } else {
                        if (!SoloPlanMayor) {
                            arregloSeleccion[parseFloat(fila[0].rowIndex)].MinPrecioPlan = parseFloat($($(this.input.parent().parent().parent().parent()).find(".cboOnTop")[2]).data("kendoComboBox").dataItem().precio);
                            operarInidicadores(0, parseFloat($($(this.input.parent().parent().parent().parent()).find(".cboOnTop")[2]).data("kendoComboBox").dataItem().precio));
                        } else {
                            //arregloSeleccion[parseFloat(fila[0].rowIndex)].MinPrecioPlan = parseFloat($($(this.input.parent().parent().parent().parent()).find(".cboOnTop")[2]).data("kendoComboBox").dataSource._data[0].precio);
                            arregloSeleccion[parseFloat(fila[0].rowIndex)].MinPrecioPlan = parseFloat($($(this.input.parent().parent().parent().parent()).find(".cboOnTop")[2]).data("kendoComboBox").dataItem().precio);
                            operarInidicadores(0, parseFloat($($(this.input.parent().parent().parent().parent()).find(".cboOnTop")[2]).data("kendoComboBox").dataSource._data[0].precio));
                        }
                    }
                                       
                    if (UsaFinanciamientoPrecioVariable == true) {

                        if (cuotas > 1) {
                            $(fila[0]).find(".tdPrePro").html(oCultura.Moneda.vcSimMon + " " + parseFloat(precio.toFixed(2)) + "<br/> (Al mes)");
                        }
                        else {
                            $(fila[0]).find(".tdPrePro").html(oCultura.Moneda.vcSimMon + " " + parseFloat(precio.toFixed(2)) + "<br/> ( Al contado)");
                        }

                    }

                   
                    $($($("#totalesCarrito > div")[0]).find("span")[0]).text(formatNumber.newo(productoPrecioTotal(), oCultura.Moneda.vcSimMon + " "));

                    //nuevos datos
                    if (MesesFinanciamientoEquipo != 1) {
                        var labelDetalle = arregloSeleccion[parseFloat(fila[0].rowIndex)].CuotasEquipo == 1 ? "" : "<br/>(Al mes)";
                        //var labelDetalle = (precio <= MontoMinimo ? "" : arregloSeleccion[parseFloat(fila[0].rowIndex)].CuotasEquipo == 1 ? "" : "<br/>(Al mes)");
                        var precioMensual = precio / arregloSeleccion[parseFloat(fila[0].rowIndex)].CuotasEquipo;
                        //var precioMensual = (precio <= MontoMinimo ? precio : precio / arregloSeleccion[parseFloat(fila[0].rowIndex)].CuotasEquipo);
                        var totalMensual = (precio / arregloSeleccion[parseFloat(fila[0].rowIndex)].CuotasEquipo) + arregloSeleccion[parseFloat(fila[0].rowIndex)].MinPrecioPlan;
                        //var totalMensual = parseFloat(precioMensual) + arregloSeleccion[parseFloat(fila[0].rowIndex)].MinPrecioPlan;
                        $(fila[0]).find(".tdPreMen").html(formatNumber.newo(precioMensual, oCultura.Moneda.vcSimMon + " ") + labelDetalle);
                        $(fila[0]).find(".tdTotMen").html(formatNumber.newo(totalMensual, oCultura.Moneda.vcSimMon + " "));
                        $(fila[0]).find(".tdMesFinanc").html(arregloSeleccion[parseFloat(fila[0].rowIndex)].CuotasEquipo);
                    }
                }

            }
        });

        if (UsaFinanciamientoPrecioVariable)
        {

            $(cboFinanciamientoVariable[i]).kendoComboBox({

                dataTextField: "text",
                dataValueField: "value",
                //dataSource: obtenerPlanesDependientes(arregloSeleccion[i].P_inCod, arregloSeleccion[i].IdPlan),
                dataSource: obtenerFinanciamientoVariable($(cboPlan[i])[0].value,arregloSeleccion[i].P_inCod),
                filter: "contains",
                suggest: true,
                index: 0,
                enable: !(arregloSeleccion[i].Accion == "0"),
                open: function (e) {
                
                    precioEquipoAnterior = this.dataItem().precio;                    
                    CuotasEquipoAnterior = this.dataItem().Cuotas;

                    var id = $(this)[0]._optionID.split("-")[1].split("_")[0];
                    var val = $(this)[0]._selectedValue;                    
                    var miIdPlan = $(cboPlan)[0].value;

                    var precio = obtenerPrecioFinanciamientoVariable(id, val, miIdPlan);
                    IdFinanciamientoAnterior = val;
                    //var jjcc

                },
                change: function (e) {

                    var valorSumar = this.dataItem().precio;

                    var fila = this.input.parent().parent().parent().parent().parent();
                    var cuotas = this.dataItem().Cuotas;


                    var id = $(this)[0]._optionID.split("-")[1].split("_")[0];
                    var val = $(this)[0]._selectedValue;
                    var miIdPlan = $($(this.input.parent().parent().parent().parent()).find(".cboPlanes")[2]).data("kendoComboBox").value();
                    var idMeses = $($(this.input.parent().parent().parent().parent()).find(".cboMeses")[2]).data("kendoComboBox").value();

                    var precio = obtenerPrecioFinanciamientoVariable(id, val, miIdPlan, idMeses);

                    //$(fila[0]).find(".tdMontoEquipo").html(oCultura.Moneda.vcSimMon + " " + precio);
                   

                    //if (UsaFinanciamientoPrecioVariable == true) {

                    //    if (cuotas > 1) {
                    //        $(fila[0]).find(".tdPrePro").html(oCultura.Moneda.vcSimMon + " " + parseFloat(precio.toFixed(2)) + "<br/> ( Al mes)");
                    //    }
                    //    else {
                    //        $(fila[0]).find(".tdPrePro").html(oCultura.Moneda.vcSimMon + " " + parseFloat(precio.toFixed(2)) + "<br/> (Al contado)");
                    //    }

                    //}

                    arregloSeleccion[parseFloat(fila[0].rowIndex)].Precio = precio;
                    arregloSeleccion[parseFloat(fila[0].rowIndex)].IdTipoFinanciamiento = val;
                    arregloSeleccion[parseFloat(fila[0].rowIndex)].CuotasEquipo = cuotas;
                 


                 
                    if (precioEquipoAnterior != undefined) {
                       // operarInidicadores(0, -(parseFloat(precioPlanAnterior)));
                     
                        operarInidicadores(-parseFloat(precioEquipoAnterior), 0, cuotas);
                    }
                    
                    operarInidicadores(parseFloat(precio), 0, cuotas);

                    //operarInidicadores(parseFloat(precioEquipoAnterior), parseFloat(pro.MinPrecioPlan), pro.CuotasEquipo);


                    //if (validarexcesoBool_monto(0, parseFloat(valorSumar))) {
                    //    operarInidicadores(0, parseFloat(precioPlanAnterior));
                    //    this.value(valuePlanAnterior);
                    //    alerta("Usted ha superado su límite de crédito");
                    //    return;
                    //}
                    
                    operarInidicadores(-(parseFloat(arregloSeleccion[parseFloat(fila[0].rowIndex)].Precio)), 0, cuotas);
                    operarInidicadores(parseFloat(precio), 0, cuotas);

                    if (validarexcesoBool_monto(0, 0)) {

                        operarInidicadores(-(parseFloat(arregloSeleccion[parseFloat(fila[0].rowIndex)].Precio)), 0, cuotas);
                        operarInidicadores(parseFloat(precioEquipoAnterior), 0, CuotasEquipoAnterior);


                        alerta("Usted ha superado su límite de crédito");
                        this.value(IdFinanciamientoAnterior);

                        arregloSeleccion[parseFloat(fila[0].rowIndex)].Precio = precioEquipoAnterior;
                        arregloSeleccion[parseFloat(fila[0].rowIndex)].IdTipoFinanciamiento = IdFinanciamientoAnterior;
                        arregloSeleccion[parseFloat(fila[0].rowIndex)].CuotasEquipo = CuotasEquipoAnterior;

                        return;
                    }

                    $($($("#totalesCarrito > div")[0]).find("span")[0]).text(formatNumber.newo(productoPrecioTotal(), oCultura.Moneda.vcSimMon + " "));

                    if (UsaFinanciamientoPrecioVariable == true) {

                        if (cuotas > 1) {
                            $(fila[0]).find(".tdPrePro").html(oCultura.Moneda.vcSimMon + " " + parseFloat(precio.toFixed(2)) + "<br/> ( Al mes)");
                        }
                        else {
                            $(fila[0]).find(".tdPrePro").html(oCultura.Moneda.vcSimMon + " " + parseFloat(precio.toFixed(2)) + "<br/> (Al contado)");
                        }

                    }

                    arregloSeleccion[parseFloat(fila[0].rowIndex)].Precio = precio;
                    


                },
  
                dataBound: function (e) {
                    //var fila = this.input.parent().parent().parent().parent().parent();

                    //var id = $(this)[0]._optionID.split("-")[1].split("_")[0];
                    //var val = $(this)[0]._selectedValue;
                    //var miIdPlan = $($(this.input.parent().parent().parent().parent()).find(".cboPlanes")[2]).data("kendoComboBox").value();

                    //var precio = obtenerPrecioFinanciamientoVariable(id, val, miIdPlan);
                    //$(fila[0]).find(".tdMontoEquipo").html(oCultura.Moneda.vcSimMon + " " + precio);
                    //$(fila[0]).find(".tdPrePro").html(oCultura.Moneda.vcSimMon + " " + precio);

                    //arregloSeleccion[parseFloat(fila[0].rowIndex)].Precio = precio;

                    //$($($("#totalesCarrito > div")[0]).find("span")[0]).text(formatNumber.newo(productoPrecioTotal(), oCultura.Moneda.vcSimMon + " "));
           

                    //if (precioEquipoAnterior != undefined) {
                        
                    //    operarInidicadores(-parseFloat(precioEquipoAnterior), 0);
                    //}
                    //operarInidicadores(parseFloat(precio), 0);
                    if (boolEnlazarClick == 1) {
                        this.value(arregloSeleccion[i].IdTipoFinanciamiento);
                    }


                    var fila = this.input.parent().parent().parent().parent().parent();

                    var id = $(this)[0]._optionID.split("-")[1].split("_")[0];
                    var val = $(this)[0]._selectedValue;
                    var miIdPlan = $($(this.input.parent().parent().parent().parent()).find(".cboPlanes")[2]).data("kendoComboBox").value();
                    var idMeses = $($(this.input.parent().parent().parent().parent()).find(".cboMeses")[2]).data("kendoComboBox").value();

                    var fila = this.input.parent().parent().parent().parent().parent();
                    var precio = obtenerPrecioFinanciamientoVariable(id, val, miIdPlan, idMeses);
                   

                    if (!UsarPlanDep) {          
                       
                        if (this.dataItem() == undefined)
                        {
                            return;
                        }

                        if (UsaFinanciamientoPrecioVariable == true && this.dataItem() == undefined) {

                            var cuotas = this.dataItem().Cuotas;

                            if (cuotas > 1) {
                                $(fila[0]).find(".tdPrePro").html(oCultura.Moneda.vcSimMon + " " + parseFloat(precio.toFixed(2)) + "<br/> ( Al mes)");
                            }
                            else {
                                $(fila[0]).find(".tdPrePro").html(oCultura.Moneda.vcSimMon + " " + parseFloat(precio.toFixed(2)) + "<br/> (Al contado)");
                            }

                        }


                    } 
                }
            });

            $(cboFinanciamientoVariable[i]).data("kendoComboBox").input.attr("ReadOnly", true);
            $(cboFinanciamientoVariable[i]).data("kendoComboBox").input.off("keydown");

        }




        $(cboPlan[i]).data("kendoComboBox").input.attr("ReadOnly", true);
        $(cbomes[i]).data("kendoComboBox").input.attr("ReadOnly", true);
        $(cboPlan[i]).data("kendoComboBox").input.off("keydown");
        $(cbomes[i]).data("kendoComboBox").input.off("keydown");

    }
    //fin combo cboplan


    //    $(".cboNumeros").kendoComboBox({
    //        dataTextField: "text",
    //        dataValueField: "value",
    //        dataSource: numerosRenovar,
    //        filter: "contains",
    //        suggest: true,
    //        index: 0,
    //        open: function(e) {       
    //             
    //            if (e.sender._old != "Nueva Linea") {
    //                numeroCambiar = e.sender._old;
    //            }
    //        },
    //        change:function(e) {  
    //            
    //            var indexRow = parseInt($(e.sender.element).parent().parent().parent()[0].rowIndex);
    //            if (arregloSeleccion[indexRow].Accion != "0") {
    //                arregloSeleccion[indexRow].Numero = e.sender._old;
    //            }
    //            if (e.sender._old == "Nueva Linea") {
    //                if(numeroCambiar != undefined)
    //                {
    //                    numerosRenovar.push(new MiNumero(numeroCambiar, numeroCambiar))
    //                }
    //            }
    //            else
    //            {
    //                for (var i = 0; i < numerosRenovar.length; i++) {
    //                    if (numerosRenovar[i].value == e.sender._old) {
    //                        numerosRenovar.splice(i, 1);
    //                        break; 
    //                    }   
    //                }
    //                if(numeroCambiar != undefined)
    //                {
    //                numerosRenovar.push(new MiNumero(numeroCambiar,numeroCambiar));
    //                }
    //            } 
    //            
    //            var dataSource = new kendo.data.DataSource({
    //              data: numerosRenovar
    //            });
    //            var combos = $(".cboNumeros");
    //            for (var i = 0; i < combos.length; i++) {                
    //                if (((i*3)+2)<combos.length) {
    //                    var combobox = $(combos[(i*3)+2]).data("kendoComboBox");
    //                    combobox.setDataSource(dataSource);
    //                }
    //                else
    //                {
    //                    break;
    //                }
    //            }
    //        }
    //    });


    $(".dscPlanCombo").click(function () {
        var idPlan = $($(this).parent().find(".cboPlanes")[2]).data("kendoComboBox").value();

        $.ajax({
            type: "POST",
            url: "Pedido.aspx/obtenerDetallePlan",
            data: "{'prIdPlan': '" + idPlan + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (resultado) {
                planes = resultado.d;
                $("#lblNombre").text($.trim(planes.vcNom));
                $("#lblDescripcion").html($.trim(planes.vcDes));
                $("#lblOperador").text($.trim(planes.Operador.vcNomOpe));
                $("#lblMonto").text(oCultura.Moneda.vcSimMon + " " + planes.dcMon.toFixed(2));
                var Trs = "";
                Trs = "";
                $("#TblDetPlan").html("");
                for (var i = 0; i < planes.SubPlanes.length; i++) {
                    Trs += "<tr>";
                    Trs += "<td colspan = '2'><div  style='border: 1px solid #a6c9e2; background: #fcfdfd url(images/ui-bg_inset-hard_100_fcfdfd_1x100.png) 50% bottom repeat-x; color: #222222; margin: 0.6em .0em;'></div></td>";
                    Trs += "</tr>";
                    Trs += "<tr>";
                    Trs += "<td style='width: 100px;'><b>Bolsa</b></td><td>" + $.trim(planes.SubPlanes[i].vcNom) + "</td>";
                    Trs += "</tr>";
                    if ($.trim(planes.SubPlanes[i].vcDes) != "") {
                        Trs += "<tr>";
                        Trs += "<td style='width: 100px;'><b>Descripción</b></td><td>" + $.trim(planes.SubPlanes[i].vcDes) + "</td>";
                        Trs += "</tr>";
                    }
                    //                    Trs += "<tr>";
                    //                    Trs += "<td><b>Monto</b></td><td>" + planes.dcMon.toFixed(2) + "</td>";
                    //                    Trs += "</tr>";
                    Trs += "<tr>";
                    if (planes.SubPlanes[i].dcCan == 0) {
                        Trs += "<td style='width: 100px;'><b>Cantidad</b></td><td>Ilimitado</td>";
                    } else {
                        Trs += "<td style='width: 100px;'><b>Cantidad</b></td><td>" + parseFloat(planes.SubPlanes[i].dcCan) + " - " + $.trim(planes.SubPlanes[i].vcSer.toUpperCase()) + "</td>";
                    }
                    Trs += "</tr>";
                }
                $("#TblDetPlan").append(Trs);
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
        $("#capaPopUp").show();
        $("#pnlticket").show();
    });

    $(".EliDetPlan").click(function () {
        $("#capaPopUp").hide();
        $("#pnlticket").hide();
    });


    $(".eliEle").click(function () {
        elementEliEle = this;

        confirma("¿Esta usted seguro de quitar producto?<br> Al quitarlo se liberará el stock,<br> permitiendo a otros usuarios compralo<br>", "Quitar producto", function (a) {
            if (a == "Aceptar") {
                esConformePlanMes = true;
                var index = $(elementEliEle).parent().parent()[0]["rowIndex"]; //.find("td")[2]["outerText"];

                //var texto = $($($(elementEliEle).parent()).find(".cboPlanes")[2]).data("kendoComboBox").text();
                //var texto = $($(".cboPlanes")[index]).val();

                var precioPlan;
                if (!UsarPlanDep) {
                    precioPlan = $($($(elementEliEle).parent()).find(".cboPlanes")[2]).data("kendoComboBox").dataItem().precio;
                } else {
                    if (!SoloPlanMayor) {
                        precioPlan = $($($(elementEliEle).parent()).find(".cboOnTop")[2]).data("kendoComboBox").dataItem().precio;
                    } else {
                        precioPlan = $($($(elementEliEle).parent()).find(".cboOnTop")[2]).data("kendoComboBox").dataSource._data[0].precio;
                    }
                }
                //RestarCreduti(parseInt(arregloSeleccion[index].Precio), this);GEIG
                operarInidicadores(-(parseFloat(arregloSeleccion[index].Precio)), -(precioPlan), arregloSeleccion[index].CuotasEquipo);

                //        if ($(this).parent().find(".cboNumeros")[2].value != "Nueva Linea") {
                //            numerosRenovar.push(new MiNumero($(this).parent().find(".cboNumeros")[2].value,$(this).parent().find(".cboNumeros")[2].value));
                //        }


                if (arregloSeleccion[index].Accion == "0") {
                    var eli = arregloSeleccion.splice(index, 1);
                    arregloEli.push(eli);
                }
                else {
                    arregloSeleccion.splice(index, 1);
                }

                $(elementEliEle).parent().parent().hide(300, function () {

                    $($($("#totalesCarrito > div")[0]).find("span")[0]).text(formatNumber.newo(productoPrecioTotal(), oCultura.Moneda.vcSimMon + " "));

                    if (arregloSeleccion.length == 0) {
                        var dataSource = new kendo.data.DataSource({
                            data: arregloSeleccion
                            //data: getDatasourceArregloSeleccion()
                        });

                        var gridele = $("#gridDetEle").data("kendoGrid");
                        gridele.setDataSource(dataSource);

                    }
                    else {
                        var dataSource = new kendo.data.DataSource({
                            data: arregloSeleccion
                            //data: getDatasourceArregloSeleccion()
                        });

                        var gridele = $("#gridDetEle").data("kendoGrid");
                        gridele.setDataSource(dataSource);

                        enlazarClick();
                    }
                    //            validarexceso(); GEIG
                    //            validarexcesoPlan();
                    //            aumentarBurbuja();
                });

            }
        });


    });

    $(".eliEle").hover(function () {
        $(this).mousemove(function (e) {
            $("#detalleEliminar").css({ "left": e.pageX + 20, "top": e.pageY, "display": "block" });
        });
    }, function () {
        $("#detalleEliminar").css("display", "none");
    });

    $(".dscPlanCombo").hover(function () {
        $(this).mousemove(function (e) {
            $("#detallePlan").css({ "left": e.pageX + 20, "top": e.pageY, "display": "block" });
        });
    }, function () {
        $("#detallePlan").css("display", "none");
    });

    //    var cbos = $(".cboNumeros")
    //    
    //    for (var i = 0; i < arregloSeleccion.length; i++) {     
    //        var aa = $(cbos[(i*3)+2]).data("kendoComboBox");     
    //        if (arregloSeleccion[i].Accion == "0") {   
    //            aa.value(arregloSeleccion[i].Numero);    
    //            aa.readonly(); 
    //        }
    //        else
    //        {
    //            if (arregloSeleccion[i].Numero == "") {
    //                aa.value("Nueva Linea"); 
    //            }
    //            else
    //            {
    //                aa.value(arregloSeleccion[i].Numero); 
    //            }
    //            
    //        } 
    //    }

    if ($.browser.msie) {
        $(".eliele").css("margintop", "-15px");
    }
    //else {
    //$(".eliele").addClass("eliEle");
    //}

    //    if ($("#hdfEsConEquipo").val() == "0") {
    //        //$(".cboNumeros").hide();
    //        $(".lblNumero").hide();
    //$(".cboPlanes").css("width", "300px");
    //$(".cboOnTop").css("width", "245px");
    //        $(".cboPlanes").css("margin-right", "15px");
    //    }

    //$("span.k-combobox").css("float:left");
    $("span.cboPlanes").css("float", "left");
    boolEnlazarClick = 0;
}

//function validarexcesoBool() {
////    var creDis = parseInt($(".credisp")[0]["innerText"].split(' ')[1].replace(/,/g, ''));
////    var creDisPlan = parseInt($(".credisp")[1]["innerText"].split(' ')[1].replace(/,/g, ''));

//    var creDis = parseInt($($(".credisp")[0]).text().split(' ')[1].replace(/,/g, ''));
//    var creDisPlan = parseInt($($(".credisp")[1]).text().split(' ')[1].replace(/,/g, ''));

//    if (creDis < 0) {
//        return true;
//    }
//    else {
//        return creDisPlan < 0;
//    }

//}

function validarexceso() {
    $($($("#totalesCarrito > div")[0]).find("span")[0]).text(formatNumber.newo(productoPrecioTotal(), oCultura.Moneda.vcSimMon + " "));

    //    var creDis = parseInt($(".credisp")[0]["innerText"].split(' ')[1].replace(/,/g, ''));
    //    var creDisPlan = parseInt($(".credisp")[1]["innerText"].split(' ')[1].replace(/,/g, ''));

    //    var creDis = parseInt($($(".credisp")[0]).text().split(' ')[1].replace(/,/g, ''));
    //    var creDisPlan = parseInt($($(".credisp")[1]).text().split(' ')[1].replace(/,/g, ''));

    //    if (esEditar) {

    //        if (creDis < 0) {
    //            $("#totalesCarrito").removeClass("k-info-colored");
    //            $("#totalesCarrito").addClass("k-error-colored");
    //            $($("#totalesCarrito > div")[1]).show();
    //            $("#alert0").css("display","block");
    //            return true;
    //        }
    //        else
    //        {
    //            $("#totalesCarrito").removeClass("k-error-colored");
    //            $("#totalesCarrito").addClass("k-info-colored");
    //            $($("#totalesCarrito > div")[1]).hide();
    //            $("#alert0").css("display","none");
    //            return false;
    //        }
    //    }
    //    else
    //    {
    //if (parseFloat(creditos.ProductoCreditoAsignado[0]["Disponible"]) <  parseFloat(productoPrecioTotal())) {
    //    if (creDis < 0) {
    //        $("#totalesCarrito").removeClass("k-info-colored");
    //        $("#totalesCarrito").addClass("k-error-colored");
    //        $($("#totalesCarrito > div")[1]).show();
    //        $("#alert0").css("display", "block");
    //        return true;
    //    }
    //    else {

    //        $("#totalesCarrito").removeClass("k-error-colored");
    //        $("#totalesCarrito").addClass("k-info-colored");
    //        $($("#totalesCarrito > div")[1]).hide();
    //        $("#alert0").css("display", "none");
    //        return false;

    //    }
    //    }

}

function validarexcesoPlan() {
    //    var creDisPlan = parseInt($(".credisp")[1]["innerText"].split(' ')[1].replace(/,/g, ''));
    var creDisPlan = parseInt($($(".credisp")[1]).text().split(' ')[1].replace(/,/g, ''));

    if (creDisPlan < 0) {
        //        $("#totalesCarrito").removeClass("k-info-colored");
        //        $("#totalesCarrito").addClass("k-error-colored");
        //        $($("#totalesCarrito > div")[1]).show();
        $("#alert1").css("display", "block");
        return true;
    }
    else {

        //        $("#totalesCarrito").removeClass("k-error-colored");
        //        $("#totalesCarrito").addClass("k-info-colored");
        //        $($("#totalesCarrito > div")[1]).hide();
        $("#alert1").css("display", "none");
        return false;

    }
}

function mostrarDescPro(a) {

    filaSelec = $(a).parent().parent().parent()[0];
    var index = $.trim($($($($(a).parent().parent().parent()[0]).find("td")[4]).find("div")[1]).text());

    //var index = $(a).parent().parent().parent()[0]["rowIndex"];
    //produc = productos[index];
    produc = obtenerProducto(index);
    var url = $(a).attr("src");

    $("#imgCel").attr("src", url);
    $("#Text1").val("1");
    $($("#titCel span")[0]).text(produc.vcNom);
    $("#comprarCelPre").text(formatNumber.newo(parseDouble(produc.Precio), "Desde " + oCultura.Moneda.vcSimMon + " "));
    $("#dscCel").html(produc.vcDes);
    $("#dscCel").css({ "font-size": "11px" });
    $("#caracCel").css({ "font-size": "11px" });
    $("#comprarCelDis").text("");
    $("#comprarCelDis").append('Cantidad disponible : <span id="stockk">' + produc.CantidadDisponible + '</span> unidades');

    //    $.ajax({
    //        type: "POST",
    //        url: "Pedido.aspx/ObtenerCaracteristicas",
    //        data: "{'IdModeloDispositivo': '" + produc.P_inCod + "'}",
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function (resultado) {

    //            var resul = JSON.parse(resultado.d);
    //            $("#pDetLin").text("");
    //            for (var i = 0; i < resul.length; i++) {
    //                //$("#pDetLin").append('<div class="fLin pLinHead"><div class="cLin cLinId"></div><div class="cLin">' + resul[i].vcDes + ' </div><div class="cLin">' + resul[i].Valor + '</div></div>')
    //                $("#caracCel").append('<div class="fLin pLinHead"><div class="cLin cLinId"></div><div class="cLin">' + resul[i].vcDes + ' </div><div class="cLin">' + resul[i].Valor + '</div></div>')
    //               
    //            }
    //        },
    //        error: function (xhr, err, thrErr) {
    //            MostrarErrorAjax(xhr, err, thrErr);
    //        }
    //    });    

    $("#generalCarrito").hide();
    $("#generalPedido").hide();
    if (window.parent.NumeroRenovar != undefined) {
        $("#Text1").prop("disabled", true);
    }
    $("#opacidad").fadeIn(300);
}

function procesarPedido() {

    if (window.parent.UsuarioConectado != $("#hfUsuario").val()) {
        window.location.href = '../Login.aspx';
        return;
    }


    if (esEditar && !window.parent.esConfirmacionPreventa) {
        var edit = false;
        if (arregloEli.length == 0) {
            for (var i = 0; i < arregloSeleccion.length; i++) {
                if (arregloSeleccion[i].Accion != "0") {
                    edit = true;
                    break;
                }
            }
        }
        else {
            edit = true;
        }

        if (vCodLugarEntrega_Ori != $("#ddlLugarEntregaPedido").val()) {
            edit = true;
        }

        if (!edit) {
            alerta("Usted no a modificado su pedido");
            return;
        }

    }


    if (arregloSeleccion.length == 0) {
        alerta("Usted no tiene productos en el carrito de compras");
        return;
    }

    if (validarexceso()) {
        alerta("Usted a sobrepasado su límite de crédito, verifique su carrito de compras");
        return;
    }

    if ($("#ddlFinanciamiento").val() == '-1') {



        alerta("Seleccione un tipo de financiamiento");
        return;
    }

    //    if (validarexcesoPlan()) { GEIG
    //        alerta("Usted a sobrepasado su límite de crédito de planes, verifique su carrito de compras");
    //        return;
    //    }

    if ($("#ddlLugarEntregaPedido").val() == '-1') {
        alerta("Seleccione un Lugar de Entrega.");
        return;
    }
    if ($("#ddlLugarEntregaPedido").val() == '-2') {
        alerta("No puede generar el pedido porque no existe ningún lugar de entrega.");
        return;
    }



    if ($("#hdfMuestraNumeroContacto").val() == "1" && esEditar==false) {
        var Numero = $("#txtNumeroContactoPedido").val();
        if (Numero == "" || Numero.length < 9 || Numero.length > 9) {
            alerta('El número de contacto debe ser de 9 dígitos.');
            return;
        }
    }
    else {
        $("#txtNumeroContactoPedido").val("-1");
    }


 

    confirma("¿Esta usted seguro de enviar el pedido?<br>", "Compra de productos", function (a) {
        if (a == "Aceptar") {

            $(".tap").hide();
            //$("#tapProceso").show();
            //$(".tap").removeClass("tapSelect");
            //$("#tapProceso").addClass("tapSelect");
            $("#detalleTaps").css("display", "none");
            $("#pSelecPro").hide();
            $("#pDetEle").hide();
            $("#pDeclaracion").hide();
            
            $("#pProcesoCompra").fadeIn(1, function () {
                $("#pPanelCarrito").hide(0, function () {
                    //debugger;     
                    if (window.parent.esConfirmacionPreventa) {                       
                        ConfirmacionPreventa();                        
                    }
                    else {
                        if (esEditar) {
                            $("#pProcesoCompra").hide();
                            ModificarPedido();
                        }
                        else {
                            $("#pProcesoCompra").hide();
                            registrarPedido();
                        }
                    }
                });
            });

        }
    });
}

function ObtenerStockProductos(datosServidorx) {
    //
    var datosServidor = datosServidorx;

    datosServidor = datosServidor.replace('*:', '');
    //datosServidor = datosServidor.replace(/\\/g,"");
    //datosServidor = datosServidor.replace(/\"/g,"");
    //datosServidor = datosServidor.replace(/\\/g, "&#34");

    datosServidor = datosServidor.replace(/\\/g, "");
    datosServidor = datosServidor.substring(1);
    datosServidor = datosServidor.substring(0, datosServidor.length - 1);

    //Formato-> datosServidor = '[{"P_inCod" : "1"  , "CantidadDisponible" : "3"}]';
    var stockAct = JSON.parse(datosServidor);

    for (var i = 0; i < stockAct.length; i++) {
        for (var k = 0; k < productos.length; k++) {
            if (productos[k].P_inCod == stockAct[i].P_inCod) {
                productos[k].CantidadDisponible = stockAct[i].CantidadDisponible;
                //$(".Stock").filter("#" + productos[k].P_inCod).html(stockAct[i].CantidadDisponible);
                $('.Stock[CodigoProducto=' + productos[k].P_inCod + ']').html(stockAct[i].CantidadDisponible);
                break;
            }
        }
    }

    //    var dataSource = new kendo.data.DataSource({
    //        data: productos
    //    });
    //    var gridPro = $("#gridPro").data("kendoGrid");
    //    gridPro.setDataSource(dataSource);
    //    $(".gridImaCar img").click(function(){
    //        mostrarDescPro(this);
    //    });

}

function onDataBinding() {
    //    $(".subirCarrito").click(function(){
    //        var id = $.trim($($(this).parent()).find("div")[1]["innerText"]);
    //        var cant = $($($(this).parent()).find("input")[0]).val();
    //        cant = cant.split(' ')[0];

    //        var Burbuja = $($(this).parent().parent()).find(".numProIma")[0];
    //        var cantBurbuja = Burbuja["innerText"];
    //        cantBurbuja = parseInt(cantBurbuja) + parseInt(cant);
    //        $(Burbuja).text(cantBurbuja)
    //        $(Burbuja).show(300);

    //        for (var i = 0; i < cant ; i++) {
    //            arregloSeleccion.push(obtenerProducto(id));
    //        }
    //                
    //        if (arregloSeleccion.length > 0) {
    //            validarexceso();
    //            aumentarBurbuja();
    //        }
    //    });

    //    $(".gridImaCar img").click(function(){
    //        mostrarDescPro(this);
    //    });
}

function obtenerStockSelecionado(id) {
    var cont = 0;
    for (var i = 0; i < arregloSeleccion.length; i++) {
        if (arregloSeleccion[i].Accion == "") {
            if (arregloSeleccion[i].P_inCod == id) {
                cont += 1;
            }
        }
    }
    return cont;
}

function onDataBound() {

    $(".subirCarrito").click(function () {

        if (window.parent.NumeroRenovar != undefined) {
            if (arregloSeleccion.length == 1) {
                if (window.parent.btnPortabilidad) {
                    alerta("Usted sólo puede elegir un equipo al realizar una portibilidad");
                } else {
                    alerta("Usted sólo puede elegir un equipo al renovar con número");
                }
                return;
            }
        }

        if (validarexcesoBool()) {
            alerta("Usted ha superado su límite de crédito");
            return;
        }
        var cant = $($($(this).parent()).find("input")[0]).val();
        cant = parseInt(cant.split(' ')[0].toString());


        if ((arregloSeleccion.length + cant) > NumMaxEquipos_porPedido) {
            alerta("Usted ha superado el número de ítems a comprar");
            return;
        }

        if (cant == 0) {
            alerta("Ingrese una cantidad correcta");
            $($($(this).parent()).find("input")[0]).val('1');
            $($($(this).parent()).find("input")[0]).focus();
            return;
        }

        var id = $.trim($($($(this).parent()).find("div")[1]).text());
        if (!window.parent.esPreVentaActiva) {

            //var stock = parseInt($($(this).parent().parent()).find(".Stock")[0]["innerText"]);
            var stock = parseInt($($($(this).parent().parent()).find(".Stock")[0]).text());
            stock = stock - parseInt(obtenerStockSelecionado(id));
            if (stock < 1) {
                alerta("Producto seleccionado no tiene stock disponible");
                return;
            }

            if (cant > stock) {
                alerta("La cantidad ingresada no puede ser <br>mayor al stock disponible.");
                $($($(this).parent()).find("input")[0]).val('1');
                $($($(this).parent()).find("input")[0]).focus();
                return;
            }
        }


        //AumentarCreduti(parseInt(obtenerProducto(id).Precio));

        for (var i = 0; i < cant; i++) {
            var pro = obtenerProducto(id);
            if (validarexcesoBool_monto(parseFloat(pro.Precio), parseFloat(pro.MinPrecioPlan), pro.IdGama)) {
                alerta("Usted ha superado su límite de crédito");
                return;
            }
            arregloSeleccion.push(pro);
            //AumentarCreduti(parseInt(pro.Precio), parseInt(pro.MinPrecioPlan)); GEIG
            //operarInidicadores(parseInt(pro.Precio), parseInt(pro.MinPrecioPlan));
            operarInidicadores(parseFloat(pro.Precio), parseFloat(pro.MinPrecioPlan), pro.CuotasEquipo);
        }

        //if (ArregloSeleccion_length() > 0) {

        //        if (arregloSeleccion.length > 0) { GEIG
        //            validarexceso();
        //            validarexcesoPlan();
        //            aumentarBurbuja();
        //        }
    });

    $(".gridImaCar img").click(function () {
        mostrarDescPro(this);
        $("#MostrarDealleFlo").css("display", "none");
    });

    $(".gridImaCar").hover(function () {
        $(this).mousemove(function (e) {
            $("#MostrarDealleFlo").css({ "left": e.pageX + 20, "top": e.pageY, "display": "block" });
        });
    }, function () {
        $("#MostrarDealleFlo").css("display", "none");
    });

    if (window.parent.NumeroRenovar != undefined) {
        $(".txtCantidadDetalle").prop("disabled", true);
    }

    if (window.parent.esPreVentaActiva) {
        $(".esPreVenta").hide();
    }
    else {
        var t = $(this.tbody).find("tr");

        for (var i = 0; i < t.length; i++) {

            if ($.trim($($(t[i]).find(".Stock")[0]).text()) == "0") {
                $($(t[i]).find(".subirCarrito")[0]).css("display", "none");
                $($(t[i]).find(".txtCantidadDetalle")[0]).css("display", "none");
            }
        }
    }
}

//function obtenerPedidos() {

//    $.ajax({
//        type: "POST",
//        url: "Pedido.aspx/obtenerPedidoEmpleado",
//        data: "{'prIdEmpleado': '" + $("#hdfEmpleado").val() + "'}",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (resultado) {

//            pedidos = resultado.d;
//            $("#grdPedidos").kendoGrid({
//                dataSource: {
//                    data: pedidos,
//                    pageSize: 10
//                },
//                groupable: false,
//                sortable: false,
//                selectable: "multiple",
//                navigatable: true,
//                pageable: {
//                    refresh: true,
//                    pageSizes: true,
//                    messages: {
//                        itemsPerPage: "ítems por página",
//                        display: "{0}-{1} de {2} ítems",
//                        empty: ""
//                    }
//                },
//                //detailTemplate: kendo.template($("#template").html()),
//                detailInit: detailInit,
//                dataBound:loadgrillaPedidos,
//                columns: [
//                    { field: "IdPedido", width: "50px", title: "IdPedido", hidden: true },
//                    { field: "IdCampana", width: "50px", title: "IdCampana", hidden: true },
//                    { field: "DscCampana", width: "50px", title: "Campaña", hidden: true },
//                    { field: "Situacion", width: "45px", title: "Tipo", hidden: false },
//                    { field: "TipoRenovacion", width: "50px", title: "TipoRenovacion", hidden: true },
//                    { field: "CodigoPedido", width: "65px", title: "Nro Pedido" },
//                    { field: "FechaPedido", width: "70px", title: "Fecha", format: "{0: yyyy-MM-dd HH:mm:ss}" },
//                    { field: "FechaRecojo", width: "50px", title: "Recojo", hidden: true },
//                    { field: "IdEstado", width: "35px", title: "IdEstado", hidden: true },
//                    { field: "DscEstado", width: "45px", title: "Estado", attributes: { style: "text-align:center;"} },
//                    { field: "IdOficina", width: "50px", title: "IdOficina", hidden: true },
//                    { field: "DireccionCompleta", width: "50px", title: "Dirección", hidden: true },
//                    { field: "MontoTotalNoServicios", width: "45px", title: "Precio<br>Equipo", attributes: { style: "text-align:right;" }, format: "{0:#,#.00}" },
//                    { field: "MontoTotalServicios", width: "50px", title: "Precio<br>Servicio", attributes: { style: "text-align:right;" }, format: "{0:#,#.00}" },
//                    { command: { text: "Contrato", click: fnEditar }, title: " ", width: "45px" },
//                //                  {command: { text: "Cancelar", click: fnCancelar }, title: " ", width: "60px" }


//                ]
//            });

//            if (window.parent.esCampanaActiva) {
//                obtenerProductos();
//            }

//        },
//        error: function (xhr, err, thrErr) {
//            MostrarErrorAjax(xhr, err, thrErr);
//        }
//    });
//}

function fnEditar(e) {
    var acddata = this.dataItem($(e.currentTarget).closest("tr"));

    $.ajax({
        type: "POST",
        url: "Dashboard_pedido.aspx/getContrato",
        data: "{'prIdPedido': '" + acddata.IdPedido + "'}",
        //                    "'pIdCampana': '" + "5" + "'," +
        //                    "'pAccion': '" + "Renovar" + "'," +
        //                    "'pXmlNumero': '" + XML + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {

            //alerta(raiz("../Common/Controladores/DescargarArchivo.ashx?archivo=" + resultado.d));

            if ($.trim(resultado.d) == "") {
                alerta("Este pedido no tiene contrato generado.");
            } else {
                $.ajax({
                    url: raiz(resultado.d), //or your url
                    success: function (data) {
                        window.location.href = "../Common/Controladores/DescargarArchivo.ashx?archivo=" + resultado.d;
                    },
                    error: function (data) {
                        alerta('No se encontró el archivo a descargar.');
                    }
                });
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnCancelar() {
    alerta("Se cancelará el pedido");
}

function detailInit(e) {
    var detailRow = e.data;

    $.ajax({
        type: "POST",
        url: "Pedido.aspx/getDetallePedidoByPedidoMostrar",
        data: "{'prIdPedido': '" + detailRow.IdPedido + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {

            var columnas = JSON.parse(resultado.d[0]);
            var filas = JSON.parse(resultado.d[1]);

            $("<div/>").appendTo(e.detailCell).kendoGrid({
                dataSource: {
                    data: filas,
                    pageSize: 10
                },
                scrollable: false,
                sortable: false,
                columns: columnas,
                dataBound: onLoadSubGrillaPedido,
                pageable: {
                    refresh: true,
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
                }
            });
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function cancelarPedido() {
    var grid = $("#grdPedidos").data("kendoGrid");
    var row = grid.select();
    if (row[0] == undefined) {
        alerta("Seleccione un pedido");
        return;
    }

    var data = grid.dataItem(row);
    if (data == null || data.DscEstado != "Enviado") {
        alerta("Sólo puede cancelar pedidos enviados");
        return;
    }

    if (data == null || data.Situacion == "Baja") {
        alerta("Usted no puede Cancelar pedido de Baja");
        return;
    }

    confirma("Se procederá a cancelar el pedido<br>¿Desea continuar con el proceso?", "Cancelar Pedido", function (a) {
        if (a == "Aceptar") {

            var idPedido = data.IdPedido;

            $.ajax({
                type: "POST",
                url: "Pedido.aspx/CancelarPedido",
                data: "{'prIdPedido': '" + idPedido + "'," +
                        "'prIdCampana': '" + window.parent.CampanaConf.IdCampana + "'," +
                        "'prIdEmpleado': '" + $("#hdfEmpleado").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (resultado) {

                    if (resultado.d) {
                        $.ajax({
                            type: "POST",
                            url: "Pedido.aspx/obtenerPedidoEmpleado",
                            data: "{'prIdEmpleado': '" + $("#hdfEmpleado").val() + "'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (resultado) {

                                pedidos = resultado.d;

                                var dataSource = new kendo.data.DataSource({
                                    data: pedidos,
                                    pageSize: 10
                                });

                                var gridPro = $("#grdPedidos").data("kendoGrid");
                                gridPro.setDataSource(dataSource);

                                alerta("Su pedido a sido cancelado");
                                window.location.href = "Pedido.aspx";
                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });
                    }
                    else {
                        window.location.href = "../FinSession.aspx";
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
    });
}

function editarPedido() {
    var grid = $("#grdPedidos").data("kendoGrid");
    var row = grid.select();
    if (row[0] == undefined) {
        alerta("seleccione un pedido");
    }

    var data = grid.dataItem(row);

    if (data == null || data.DscEstado != "Enviado") {
        alerta("Sólo puede editar pedidos enviados");
        return;
    }

    if (data == null || data.Situacion == "Renovacion" || data.Situacion == "Renovación") {
        alerta("Usted no puede editar pedido de renovación,<br> para editarlo debe cancelar el pedido y volver a registrarlo.");

        return;
    }

    if (data == null || data.Situacion == "Baja") {
        alerta("Usted no puede editar pedido de Baja");
        return;
    }

    idPedidoEditar = data.IdPedido;

    $.ajax({
        type: "POST",
        url: "Pedido.aspx/getDetallePedidoByPedido",
        data: "{'prIdPedido': '" + $("#hdfIdPedidoEditar").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {

            $("#generalPedido").hide(0, function () {
                var columnas = JSON.parse(resultado.d[0]);
                var filas = JSON.parse(resultado.d[1]);
                $(".tap").hide();
                $("#tapProducto").show();
                $("#tapCarrito").show();
                $("#tapDeclaracion").show();
                $("#tapProducto").addClass("tapSelect");
                $("#pSelecPro").show();
                $("#pPanelCarrito").show();
                $("#pDetEle").hide();
                $("#pProcesoCompra").hide();
                arregloSeleccion = [];
                arregloEli = [];
                esEditar = true;
                //                var miProductos = [];
                //                for (var i=0;i<productos.length;i++){
                //                   miProductos.push(productos[i].slice(i,i+1));
                //                }

                for (var i = 0; i < filas.length; i++) {
                    var pro = obtenerProducto(filas[i].idEquipo);
                    arregloSeleccion.push(pro);
                    arregloSeleccion[i].Accion = "0";
                    arregloSeleccion[i].IdDetalle = filas[i].idDetallePedido;
                    arregloSeleccion[i].Numero = filas[i].Número;
                    arregloSeleccion[i].Precio = filas[i].Precio_Equipo;
                    arregloSeleccion[i].IdPlan = filas[i].idPlan;
                    arregloSeleccion[i].NumMeses = filas[i].Meses_Contrato;


                    //                    for (var k = 0; k < numerosRenovar.length; k++) {
                    //                        if (filas[i].Número != "Nueva Linea") {
                    //                            if (numerosRenovar[k].value == filas[i].Número) {
                    //                                numerosRenovar.splice(k, 1);
                    //                                break;
                    //                            }
                    //                        }
                    //                    }

                }
                //productos = miProductos.slice(0);
                aumentarBurbuja();
                obtenerCreditos();
                //$("#generalCarrito").fadeIn(300);
            });
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function cloneObject(source) {
    for (i in source) {
        if (typeof source[i] == 'source') {
            this[i] = new cloneObject(source[i]);
        }
        else {
            this[i] = source[i];
        }
    }
}

function onChangeDdl() {
    var dropdownlist = $("#required").data("kendoDropDownList");
    var selectedIndex = dropdownlist.select();
    var data = dropdownlist.dataItem(selectedIndex);
    //alerta(data.text);

    switch (data.text) {
        case "Modelo":
            $("#pddlGama").hide();
            $("#ptxtNombre").hide();
            $("#pTxtPrecio").hide();
            $("#pddlModelo").show();
            //$(".k-input k-readonly").attr('width', 'auto');
            break;
        case "Gama":
            $("#ptxtNombre").hide();
            $("#pddlModelo").hide();
            $("#pTxtPrecio").hide();
            $("#pddlGama").show();//.fadeIn(300);
            //$(".k-input k-readonly").attr('width', 'auto');
            break;
        case "Nombre":
            //            $("#pddlGama").hide();
            //            $("#pddlModelo").hide();
            $("#pTipo").hide();
            $("#pTxtPrecio").hide();
            $("#txtNombre").focus();
            $("#ptxtNombre").fadeIn(300, function () { $("#txtNombre").focus(); });
            break;
        case "Precio":
            //            $("#pddlGama").hide();
            //            $("#pddlModelo").hide();
            $("#pTipo").hide();
            $("#ptxtNombre").hide();
            $("#pTxtPrecio").fadeIn(300, function () { $("#txtPrecioMin").focus(); });
            break;

        case "Tipo Producto":
            //            $("#pddlGama").hide();
            //            $("#pddlModelo").hide();
            $("#ptxtNombre").hide();
            $("#pTxtPrecio").hide();
            $("#pTipo").fadeIn(800);
            break;
        default:
            break;
    }
}

function obtenerTipoServicio() {
    $.ajax({
        type: "POST",
        url: "Pedido.aspx/getTipoServicio",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;

            for (var i = 0; i < resul.length; i++) {
                $("#ddlGama").append('<option value="' + resul[i]["P_inCodTipSer"] + '" >' + resul[i]["vcNom"] + '</option>');
            }
            $("#ddlGama").kendoMultiSelect({
                autoBind: false,
                change: function (e) {
                    obtenerProductosByFiltro();
                }
            }).data("kendoMultiSelect");
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function obtenerTipoModelo() {

    $.ajax({
        type: "POST",
        url: "Pedido.aspx/getTipoModelo",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;
            for (var i = 0; i < resul.length; i++) {
                $("#ddlModelo").append('<option value="' + resul[i] + '" >' + resul[i] + '</option>');
            }

            $("#ddlModelo").kendoMultiSelect({
                autoBind: false,
                change: function (e) {
                    obtenerProductosByFiltro();
                }
            }).data("kendoMultiSelect");
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function obtenerProductosByFiltro() {
    var dropdownlist = $("#required").data("kendoDropDownList");
    var selectedIndex = dropdownlist.select();
    var data = dropdownlist.dataItem(selectedIndex);
    var where = '';

    if (window.parent.miIdTipoModeloDispositivo != undefined && window.parent.miIdTipoModeloDispositivo != '') {
        where = ' and ts.IdTipoModeloDispositivo = ' + window.parent.miIdTipoModeloDispositivo.toString();
    }

    switch (data.text) {

        case "Modelo":

            var multiSelect = $("#ddlModelo").data("kendoMultiSelect");
            var valores = multiSelect.value();
            if (valores.length < 1) {
                //return
                where = "";
            } else {
                var nuevoValor = "";
                //var valoresSplit = valores.spit(',');
                //valores = "";
                for (var i = 0; i < valores.length; i++) {
                    nuevoValor = nuevoValor + "|" + valores[i] + "|,";
                }
                nuevoValor = nuevoValor.substring(0, nuevoValor.length - 1);
                where = where + ' and MD.picTipMod  in (' + nuevoValor + ')';
            }
            break;
        case "Gama":

            var multiSelect = $("#ddlGama").data("kendoMultiSelect");
            var valores = multiSelect.value();
            if (valores.length < 1) {
                //return;
                where = "";
            } else {
                where = where + ' and MD.f_incodtipser in (' + multiSelect.value() + ')';
            }
            break;
        case "Nombre":
            where = where + " and MD.vcnom like |%" + $("#txtNombre").val() + "%| ";
            break;
        case "Tipo Producto":
            var multiSelect = $("#ddlTipoServicio").data("kendoMultiSelect");
            var valores = multiSelect.value();
            if (valores.length < 1) {
                //return;
                if ($("#ddlTipo").val() != -1) {
                    where = where + '  and ts.IdTipoModeloDispositivo = ' + $("#ddlTipo").val();
                }
                else {
                    where = "";
                }
            } else {
                where = where + ' and MD.f_incodtipser in (' + multiSelect.value() + ')';
            }
            break;

            break;
        case "Precio":
            var precios = "";
            if ($.trim($("#txtPrecioMin").val()) != "" && parseFloat($.trim($("#txtPrecioMin").val())) != 0 &&
                $.trim($("#txtPrecioMax").val()) != "" && parseFloat($.trim($("#txtPrecioMax").val())) != 0 &&
                parseFloat($.trim($("#txtPrecioMin").val())) > parseFloat($.trim($("#txtPrecioMax").val()))
                ) {
                alerta("El minimo no puede ser mayor al maximo");
                return;
            }


            if ($.trim($("#txtPrecioMin").val()) != "" && parseFloat($.trim($("#txtPrecioMin").val())) != 0) {
                precios = precios + ' and pP.Precio >= ' + $.trim($("#txtPrecioMin").val());
            }

            if ($.trim($("#txtPrecioMax").val()) != "" && parseFloat($.trim($("#txtPrecioMax").val())) != 0) {
                precios = precios + ' and pP.Precio <= ' + $.trim($("#txtPrecioMax").val());
            }

            where = where + precios;
            break;
        default:
            break;
    }

    $.ajax({
        type: "POST",
        url: "Pedido.aspx/ObtenerProductosCampanaEmpleadoByPedido",
        data: "{'IdEmpleado': '" + $("#hdfEmpleado").val() + "'," +
        "'IdCampana': '" + window.parent.CampanaConf.IdCampana + "'," +
        "'pWhere': '" + where + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = JSON.parse(resultado.d);
            var produ = [];
            for (var i = 0; i < resul.length; i++) {

                if (window.parent.FlagMantenerPlan != undefined && window.parent.FlagMantenerPlan == "True" && window.parent.IdPlanNumeroRenovar != resul[i].idPlan) {
                    continue;
                }
                else {// contingencia SACAR WARNING SOLO POR ESTE CASO
                    if (window.parent.NumeroRenovar == undefined && resul[i].P_inCod.toString() == '277') {// contingencia SACAR WARNING SOLO POR ESTE CASO
                        continue; // contingencia SACAR WARNING SOLO POR ESTE CASO
                    } // contingencia SACAR WARNING SOLO POR ESTE CASO
                    else {
                        if (window.parent.FlagMantenerPlan != undefined && window.parent.FlagMantenerPlan == "False" && resul[i].P_inCod.toString() == '277') {// contingencia SACAR WARNING SOLO POR ESTE CASO
                            continue; // contingencia SACAR WARNING SOLO POR ESTE CASO
                        } // contingencia SACAR WARNING SOLO POR ESTE CASO
                    }
                } // contingencia SACAR WARNING SOLO POR ESTE CASO


                if (UsaFinanciamientoPrecioVariable) {
                    if (resul[i].FinanciamientoVariable.length > 0) {
                        resul[i].Precio = resul[i].FinanciamientoVariable[0].Precio;
                        resul[i].IdTipoFinanciamiento = resul[i].FinanciamientoVariable[0].IdFinanciamiento;
                    }
                }

                if (i == 0) {
                    produ.push(new MiProducto(
                    resul[i].P_inCod,
                    resul[i].vcNom,
                    resul[i].imIma,
                    resul[i].vcDes,
                    resul[i].Precio,
                    resul[i].CantidadTotal,
                    resul[i].CantidadUsada,
                    resul[i].CantidadDisponible,
                    resul[i].Reservable,
                    resul[i].IdGama,
                    resul[i].ObligPlanDep,
                    0, resul[i].IdTipoFinanciamiento));
                    continue;
                }

                var entro = false;
                for (var z = 0; z < produ.length; z++) {
                    if (produ[z].P_inCod == resul[i].P_inCod) {
                        entro = true;
                        break;
                    }
                }
                if (entro) {
                    continue;
                }

                produ.push(new MiProducto(
                resul[i].P_inCod,
                resul[i].vcNom,
                resul[i].imIma,
                resul[i].vcDes,
                resul[i].Precio,
                resul[i].CantidadTotal,
                resul[i].CantidadUsada,
                resul[i].CantidadDisponible,
                resul[i].Reservable,
                resul[i].IdGama,
                resul[i].ObligPlanDep,
                 0, resul[i].IdTipoFinanciamiento));
       

            }

            var dataSource = new kendo.data.DataSource({
                data: produ,
                pageSize: 7
            });

            var gridPro = $("#gridPro").data("kendoGrid");
            gridPro.setDataSource(dataSource);

            if (produ.length == 0) {
                alerta("No se encontró níngun producto </br> con el filtro seleccionado");
            }

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });


}

function ModificarPedido() {

    if (arregloSeleccion.length == 0) {
        alerta("Agregue productos a su carrito de compras por favor");
        return;
    }

    var miNumero = window.parent.NumeroRenovar;
    var miPrecioPlanAntiguo = window.parent.PrecioPlanNumeroRenovar;

    if (miNumero == undefined) {
        miNumero = "Nueva Linea";
    }
    if (miPrecioPlanAntiguo == undefined) {
        miPrecioPlanAntiguo = "0";
    }

    var XML_ELIMINAR = '<?xml version="1.0" encoding="iso-8859-1"?><TABLE>';
    var XML_AGREGAR = '<?xml version="1.0" encoding="iso-8859-1"?><TABLE>';

    for (var k = 0; k < arregloEli.length; k++) {
        XML_ELIMINAR = XML_ELIMINAR + '<PEDIDO><IdProducto>' + arregloEli[k][0].P_inCod.toString() +
        '</IdProducto><vcNom>' + arregloEli[k][0].vcNom.toString() +
        '</vcNom><Precio>' + arregloEli[k][0].Precio.toString() +
        '</Precio><IdPlan>' + arregloEli[k][0].IdPlan.toString() +
        '</IdPlan><DscPlan>' + obtenerPrecioPlanPorIdPlan(arregloEli[k][0].IdPlan) +
        '</DscPlan><Orden>' + (k + 1).toString() +
        '</Orden><idDetallePedido>' + arregloEli[k][0].IdDetalle.toString() +
        '</idDetallePedido></PEDIDO>';
    }
    XML_ELIMINAR = XML_ELIMINAR + '</TABLE>';

    //var num = $(".cboNumeros");
    for (var i = 0; i < arregloSeleccion.length; i++) {
        if (arregloSeleccion[i].IdDetalle == "") {

            XML_AGREGAR = XML_AGREGAR + '<PEDIDO><IdProducto>' + arregloSeleccion[i].P_inCod.toString() +
            '</IdProducto><vcNom>' + arregloSeleccion[i].vcNom.toString() +
            '</vcNom><Precio>' + arregloSeleccion[i].Precio.toString() +
            '</Precio><IdPlan>' + arregloSeleccion[i].IdPlan.toString() +
            '</IdPlan><DscPlan>' + obtenerPrecioPlanPorIdPlan(arregloSeleccion[i].IdPlan) +
            '</DscPlan><Orden>' + (i + 1).toString() +
            '</Orden><Numero>' + miNumero +
            '</Numero><Meses>' + arregloSeleccion[i].NumMeses.toString() +
            '</Meses><IdFinanciamiento>' + arregloSeleccion[i].IdTipoFinanciamiento.toString() +
            '</IdFinanciamiento></PEDIDO>';

        }
    }
    XML_AGREGAR = XML_AGREGAR + '</TABLE>';

    $.ajax({
        type: "POST",
        url: "Pedido.aspx/editarPedido",
        data: "{'prIdEmpleado': '" + $("#hdfEmpleado").val() + "'," +
                "'pIdCampana': '" + window.parent.CampanaConf.IdCampana + "'," +
                "'pIdPedido': '" + $("#hdfIdPedidoEditar").val() + "'," +
                "'prIdTipoFinanciamiento': '" + $("#ddlFinanciamiento").val() + "'," +
                "'prIdOficina': '" + $("#ddlLugarEntregaPedido").val() + "'," +
                "'prMesesEquipo': '" + MesesFinanciamientoEquipo + "', " +
                "'pXmlEliminar': '" + XML_ELIMINAR + "'," +
                "'pXmlAgregar': '" + XML_AGREGAR + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            if (resultado.d == "") {
                window.location.href = "../FinSession.aspx";
                return;
            }

            if (resultado.d == 'Procesado') {
                window.parent.SeProcesoPedido = true;
                arregloSeleccion = [];
                arregloEli = [];
                window.parent.fnIrPedidos();
                //alerta("Su pedido ya ha sido procesado para envio");
                return;
            }

            if (resultado.d == "ERROR AL ELIMINAR PRODUCTO") {
                alerta(resultado.d);
                return;
            }

            if (resultado.d == "ERROR AL AGREGAR PRODUCTO") {
                alerta(resultado.d);
                return;
            }

            var resul = JSON.parse(resultado.d);

            //Validar stock de producto a comprar
            fnDetectarPedidoCanceladoXStock(resul);

            $("#lblCodigoPedido").text(resul[0].codigopedido);

            switch (resul[0].EstadoPedido) {
                case "Enviado Parcial":
                    $("#lblEstadoPedidoCompra").addClass("Enviaparcial");
                    break;
                case "No Adquirido":
                    $("#lblEstadoPedidoCompra").addClass("noAdquirido");
                    break;
                default:
                    $("#lblEstadoPedidoCompra").addClass("EnviadoOk");
                    break;
            }

            $("#lblEstadoPedidoCompra").text(resul[0].EstadoPedido);

            var fechaInicio = new Date();
            strFechaInicio = dias[fechaInicio.getDay()] + ', ' + fechaInicio.getDate() + ' de ' + meses[fechaInicio.getMonth()] + ' del ' + fechaInicio.getFullYear();
            var FormatNewFechaI = dias[fechaInicio.getDay()] + ', ' + Right('0' + fechaInicio.getDate(), 2) + '/' + MesesEnteros[fechaInicio.getMonth()] + '/' + fechaInicio.getFullYear();

            $("#lblFechaPedi").text(FormatNewFechaI + " " + fechaInicio.getHours() + ":" + fechaInicio.getMinutes());

            $("#grid1").kendoGrid({
                dataSource: {
                    data: resul,
                    pageSize: 10,
                    group: {
                        field: "Estado", aggregates: [
                                        { field: "Equipo", aggregate: "count" },
                                        { field: "PrecioEquipo", aggregate: "sum" },
                                        { field: "PrecioPlan", aggregate: "sum" }
                        ]
                    },

                    aggregate: [{ field: "Equipo", aggregate: "count" },
                                          { field: "PrecioEquipo", aggregate: "sum" },
                                          { field: "PrecioPlan", aggregate: "sum" }]
                },
                sortable: false,
                scrollable: false,
                dataBound: fnAfterBuy,
                pageable: {
                    refresh: true,
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
                columns: [
                            { field: "idDetallePedido", title: "idDetallePedido", hidden: true },
                            { field: "codigopedido", title: "codigopedido", hidden: true },
                            { field: "NumeroItem", title: "Ítem", hidden: true },
                            { field: "Equipo", title: "Descripción", footerTemplate: "Total equipos: #=count#", groupFooterTemplate: "Total: #=count#" },
                            { field: "PrecioEquipo", title: "Precio Equipo", footerTemplate: '<div style="float:right">Total: #=sum#</div>', groupFooterTemplate: '<div style="float:right">Precio: #=sum#</div>', attributes: { style: "text-align: right" }, format: "{0:#,#.00}" },
                            { field: "Plan", title: "Plan" },
                            { field: "PrecioPlan", title: "Precio Plan", footerTemplate: '<div style="float:right">Total: #=sum#</div>', groupFooterTemplate: '<div style="float:right">Precio: #=sum#</div>', attributes: { style: "text-align: right" } },
                            { field: "Numero", title: "Número" }
                ]
            });

            arregloSeleccion = [];
            arregloEli = [];


            if (resul.length > 0) {
                //*******************************************************************
                $("#DialogoEquiposAdquiridos").data("kendoWindow").center();
                $("#DialogoEquiposAdquiridos").data("kendoWindow").open();
                $(".k-window").css({ "-webkit-transform": "" });
                $(".k-overlay").show();

                $("#tbEquipos").kendoGrid({
                    columns: [
                      { field: "linea", title: "Línea", width: "100px" },
                      { field: "equipo", title: "Equipo", width: "250px" },
                      { field: "estado", title: "Estado", width: "150px" },
                      { field: "estado2", title: "Estado", width: "50px", hidden: true }
                    ],
                    dataSource: {
                        data: []
                    },
                    height: 220,
                    resizable: false
                });
                var gridEquipos = $("#tbEquipos").data("kendoGrid");

                var i;
                for (i = 0; i < resul.length; i++) {
                    // text += cars[i] + "<br>";
                    var linea = resul[i].Numero;
                    var equipo = resul[i].Equipo;
                    var estado = (resul[i].Estado == "Equipos adquiridos" ? "Equipo adquirido" : "Equipo no adquirido (sin stock)");
                    var estado2 = (resul[i].Estado == "Equipos adquiridos" ? 1 : 0);

                    gridEquipos.dataSource.add({ linea: linea, equipo: equipo, estado: estado, estado2: estado2 });
                }

                var grid = $("#tbEquipos").data("kendoGrid");
                var data = grid.dataSource.data();
                $.each(data, function (i, row) {
                    if (row.estado2 == 0)
                        $('tr[data-uid="' + row.uid + '"] ').css("color", "red");
                    $('tr[data-uid="' + row.uid + '"] ').css("font-weight", "bold");
                });


                $("#pProcesoCompra").hide();
                //**************************************************************************

            }
            else {

                $("#pProcesoCompra").show();
            }



        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function registrarPedido() {
    if (arregloSeleccion.length == 0) {
        alerta("Agregue productos a su carrito de compras por favor");
        return;
    }
    
    var XML_AGREGAR = '<?xml version="1.0" encoding="iso-8859-1"?><TABLE>';
    //var num = $(".cboNumeros");
    for (var i = 0; i < arregloSeleccion.length; i++) {

        var miNumero = window.parent.NumeroRenovar;
        var miPrecioPlanAntiguo = window.parent.PrecioPlanNumeroRenovar;
        var miMantuvoPlan;

        if (window.parent.FlagMantenerPlan == undefined) {
            miMantuvoPlan = 0;
        }
        else {
            if (window.parent.FlagMantenerPlan == "True") {
                miMantuvoPlan = 1;
            }
            else {
                miMantuvoPlan = 0;
            }
        }

        if (miNumero == undefined) {
            miNumero = "Nueva Linea";
        }
        if (miPrecioPlanAntiguo == undefined) {
            miPrecioPlanAntiguo = "0";
        }

        //            XML = XML + '<PEDIDO><IdProducto>'+ arregloSeleccion[i].P_inCod.toString() +
        //            '</IdProducto><vcNom>'+ arregloSeleccion[i].vcNom.toString() +
        //            '</vcNom><Precio>'+ arregloSeleccion[i].Precio.toString() +
        //            '</Precio><IdPlan>'+ planes[0].value.toString() +
        //            '</IdPlan><DscPlan>'+ planes[0].text.substring(planes[0].text.indexOf("(")+1,planes[0].text.lastIndexOf(")")) +
        //            '</DscPlan><Orden>'+ (i+1).toString() +
        //            '</Orden><esNuevo>'+ '1'+
        //            //'</esNuevo><Numero>'+ miNumero+
        //            '</esNuevo><Numero>'+ 'Nueva Linea'+
        //            '</Numero></PEDIDO>';

        XML_AGREGAR = XML_AGREGAR + '<PEDIDO><IdProducto>' + arregloSeleccion[i].P_inCod.toString() +
            '</IdProducto><vcNom>' + arregloSeleccion[i].vcNom.toString() +
            '</vcNom><Precio>' + arregloSeleccion[i].Precio.toString() +
            '</Precio><IdPlan>' + arregloSeleccion[i].IdPlan.toString() +
            '</IdPlan><DscPlan>' + obtenerPrecioPlanPorIdPlan(arregloSeleccion[i].IdPlan) +
            '</DscPlan><Orden>' + (i + 1).toString() +
            '</Orden><esNuevo>' + '1' +
            '</esNuevo><Numero>' + miNumero +
            '</Numero><Meses>' + arregloSeleccion[i].NumMeses.toString() +
            //'</Numero><Meses>' + (parseFloat(arregloSeleccion[i].Precio) <= MontoMinimo ? 1 : arregloSeleccion[i].NumMeses.toString()) +
            '</Meses><PrecioPlanAntiguo>' + miPrecioPlanAntiguo +
            '</PrecioPlanAntiguo><IdFinanciamiento>' + arregloSeleccion[i].IdTipoFinanciamiento.toString() +
            '</IdFinanciamiento></PEDIDO>';

    }

    XML_AGREGAR = XML_AGREGAR + '</TABLE>';
    //alert(XML_AGREGAR);
    //return;
        
    $.ajax({
        type: "POST",
        url: "Pedido.aspx/registrarPedido",
        data: "{'prIdEmpleado': '" + $("#hdfEmpleado").val() + "'," +
                "'pIdCampana': '" + window.parent.CampanaConf.IdCampana + "'," +
                "'prIdTipoFinanciamiento': '" + $("#ddlFinanciamiento").val() + "'," +
                "'prMantuvoPlan': '" + miMantuvoPlan + "'," +
                "'pXmlPedido': '" + XML_AGREGAR + "', " +
                "'prIdOficina': '" + $("#ddlLugarEntregaPedido").val() + "', " +
                "'prMesesEquipo': '" + MesesFinanciamientoEquipo + "', " +
                "'prNumeroContacto': '" + $("#txtNumeroContactoPedido").val() + "', " +
                "'prMaxIdPedido': '" + window.parent.CampanaConf.MaxIdPedido + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
                  

            if (resultado.d == "") {
                window.location.href = "../FinSession.aspx";
                return;
            }

            if (resultado.d == "ERROR AL AGREGAR PRODUCTO") {
                arregloSeleccion = [];
                arregloEli = [];
                $("#tbResComp").hide();
                alerta(resultado.d);
                return;
            }

            var resul = JSON.parse(resultado.d);

            $("#hdfIdPedidoMirror").val(resul[0].IdPedido);
            $("#lblCodigoPedido").text(resul[0].codigopedido);

            switch (resul[0].EstadoPedido) {
                case "Enviado Parcial":
                    $("#lblEstadoPedidoCompra").addClass("Enviaparcial");
                    break;
                case "No Adquirido":
                    $("#lblEstadoPedidoCompra").addClass("noAdquirido");
                    break;
                default:
                    $("#lblEstadoPedidoCompra").addClass("EnviadoOk");
                    break;
            }

            $("#lblEstadoPedidoCompra").text(resul[0].EstadoPedido);

            var fechaInicio = new Date();
            strFechaInicio = dias[fechaInicio.getDay()] + ', ' + fechaInicio.getDate() + ' de ' + meses[fechaInicio.getMonth()] + ' del ' + fechaInicio.getFullYear();
            var FormatNewFechaI = dias[fechaInicio.getDay()] + ', ' + Right('0' + fechaInicio.getDate(), 2) + '/' + MesesEnteros[fechaInicio.getMonth()] + '/' + fechaInicio.getFullYear();

            $("#lblFechaPedi").text(FormatNewFechaI + " " + fechaInicio.getHours() + ":" + fechaInicio.getMinutes());

            var v_aggregates = [], v_aggregate = []; v_columns = [];
            if (MesesFinanciamientoEquipo == 1) {
                v_aggregates = [
                    { field: "Equipo", aggregate: "count" },
                    { field: "PrecioEquipo", aggregate: "sum" },
                    { field: "PrecioPlan", aggregate: "sum" }
                ];
                v_aggregate = [
                    { field: "Equipo", aggregate: "count" },
                    { field: "PrecioEquipo", aggregate: "sum" },
                    { field: "PrecioPlan", aggregate: "sum" }
                ];
                v_columns = [
                    { field: "idDetallePedido", title: "idDetallePedido", hidden: true },
                    { field: "NumeroItem", title: "Ítem", hidden: true },
                    { field: "Equipo", title: "Descripción", footerTemplate: "Total equipos: #=count#", groupFooterTemplate: "Total: #=count#" },
                    { field: "PrecioEquipo", title: "Precio Equipo", footerTemplate: '<div style="float:right">Total: #=sum#</div>', groupFooterTemplate: '<div style="float:right">Precio: #=sum#</div>', attributes: { style: "text-align: right" }, format: "{0:#,#.00}" },
                    { field: "Plan", title: "Plan" },
                    { field: "PrecioPlan", title: "Precio Plan", footerTemplate: '<div style="float:right">Total: #=sum#</div>', groupFooterTemplate: '<div style="float:right">Precio: #=sum#</div>', attributes: { style: "text-align: right" } },
                    { field: "Numero", title: "Número" }
                ];
            } else {
                for (var n = 0; n < resul.length; n++) {
                    resul[n].PrecioMensualEquipo = resul[n].PrecioEquipo / resul[n].MesesEquipo;
                    resul[n].TotalMensual = resul[n].PrecioMensualEquipo + resul[n].PrecioPlan;
                }

                v_aggregates = [
                    { field: "Equipo", aggregate: "count" },
                    { field: "PrecioEquipo", aggregate: "sum" },
                    { field: "PrecioPlan", aggregate: "sum" },
                    { field: "TotalMensual", aggregate: "sum" }
                ];
                //v_aggregate = [
                //    { field: "Equipo", aggregate: "count" },
                //    { field: "PrecioEquipo", aggregate: "sum" },
                //    { field: "PrecioPlan", aggregate: "sum" },
                //    { field: "TotalMensual", aggregate: "sum" }
                //];
                v_columns = [
                    { field: "idDetallePedido", title: "idDetallePedido", hidden: true },
                    { field: "NumeroItem", title: "Ítem", hidden: true },
                    { field: "Equipo", title: "Descripción", groupFooterTemplate: "Total equipos: #=count#" },
                    { field: "PrecioEquipo", title: "Precio<br/>Equipo", groupFooterTemplate: '<div style="float:right"></div>', attributes: { style: "text-align: right" }, format: "{0:#,#.00}" },
                    { field: "MesesEquipo", title: "Nro<br/>Cuotas", attributes: { style: "text-align: center" } },
                    { field: "PrecioMensualEquipo", title: "Cuota<br/>Mensual<br/>Equipo", attributes: { style: "text-align: right" }, format: "{0:#,#.00}" },
                    { field: "Plan", title: "Plan" },
                    { field: "MesesContrato", title: "Meses<br/>Contrato", attributes: { style: "text-align: center" } },
                    { field: "PrecioPlan", title: "Precio<br/>Plan", groupFooterTemplate: '<div style="float:right">Total:</div>', attributes: { style: "text-align: right" } },
                    { field: "TotalMensual", title: "Total<br/>Mensual", groupFooterTemplate: '<div style="float:right">#=formatNumber.newo(sum,"")#</div>', attributes: { style: "text-align: right" }, format: "{0:#,#.00}" },
                    { field: "Numero", title: "Número" }
                ];
            }
             

     

            $("#grid1").kendoGrid({
                dataSource: {
                    data: resul,
                    pageSize: 10,
                    group: {
                        field: "Estado",
                        aggregates: v_aggregates
                    }
                    , aggregate: v_aggregate
                },
                sortable: false,
                scrollable: false,
                dataBound: fnAfterBuy,
                pageable: {
                    refresh: true,
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
                columns: v_columns
            }); 

            arregloSeleccion = [];
            arregloEli = [];


            //            if ($($(".k-grouping-row")[0]).val()) {

            //            }
            

            if (resul.length > 0) {
                //*******************************************************************
              
                $("#DialogoEquiposAdquiridos").data("kendoWindow").center();
                $("#DialogoEquiposAdquiridos").data("kendoWindow").open();
                $(".k-window").css({ "-webkit-transform": "" });
                $(".k-overlay").show();
                $("#tbEquipos").kendoGrid({
                    columns: [
                      { field: "linea", title: "Línea", width: "100px" },                     
                      { field: "equipo", title: "Equipo", width: "250px", template: "#= IconoEstado(data) #" },
                      { field: "estado", title: "Estado", width: "150px" },
                      { field: "estado2", title: "Estado", width: "50px", hidden: true }
                    ],
                    dataSource: {
                        data: []
                    },
                    sort: {
                        field: "estado2",
                        dir: "asc"
                    },
                    sortable: true,
                    height: 220,
                    resizable: false
                });
                var gridEquipos = $("#tbEquipos").data("kendoGrid");
                
                var i;
                var contadorEquiposNoAdquiridos = 0;

                for (i = 0; i < resul.length; i++) {
                    // text += cars[i] + "<br>";
                    var linea = resul[i].Numero;
                    var equipo = resul[i].Equipo;
                    var estado = (resul[i].Estado == "Equipos adquiridos" ? "Equipo adquirido" : "Equipo no adquirido (sin stock)");
                    var estado2 = (resul[i].Estado == "Equipos adquiridos" ? 1 : 0);

                    if (estado2 == "0" || estado2 == 0)
                    {
                        contadorEquiposNoAdquiridos++;
                    }

                    gridEquipos.dataSource.add({ linea: linea, equipo: equipo, estado: estado, estado2: estado2 });
                }
                            

                if (contadorEquiposNoAdquiridos > 0)
                {
                    $("#lblEquiposNoAdquiridos").show();
                    $("#imgEquipoNoAdquirido").show();                    

                    if (contadorEquiposNoAdquiridos == 1) {
                        $("#lblEquiposNoAdquiridos").html("" + contadorEquiposNoAdquiridos + " Equipo no adquirido")
                    } else {
                        $("#lblEquiposNoAdquiridos").html("" + contadorEquiposNoAdquiridos + " Equipos no adquiridos")
                    }        
                }


                var grid = $("#tbEquipos").data("kendoGrid");
                var data = grid.dataSource.data();
                grid.dataSource.sort({ field: "estado2", dir: "asc" });

                $.each(data, function (i, row) {
                    if (row.estado2 == 0)
                        $('tr[data-uid="' + row.uid + '"] ').css("color", "red");
                    $('tr[data-uid="' + row.uid + '"] ').css("font-weight", "bold");
                });

          

                $("#pProcesoCompra").hide();
                //**************************************************************************

            }
            else {

                $("#pProcesoCompra").show();
            }

            

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function mostrarEquipos()
{
    $("#pProcesoCompra").show();
}



function IconoEstado(data)
{
    if (data.estado2 == 1) {
        return "" + data.equipo;
    }
    else {
        return "" + data.equipo + "&nbsp;&nbsp;<img src='../Common/Images/Alerta_16x16.png' title='Equipo no adquirido'  />";
    }

   

}
function fnAfterBuy() {

    if ($($(".k-grouping-row")[0]).text() == 'Estado: Equipos no adquiridos') {
        //$($(".k-grouping-row")[0]).css("color", "red !important");
        $($(".k-grouping-row")[0]).addClass("noAdquirido");
    }

    if ($($(".k-grouping-row")[1]).text() == 'Estado: Equipos no adquiridos') {
        //$($(".k-grouping-row")[1]).css("color", "red !important");
        $($(".k-grouping-row")[1]).addClass("noAdquirido");
    }
}

function getDatasourceArregloSeleccion() {
    var arreglo = [];

    for (var i = 0; i < arregloSeleccion.length; i++) {
        if (arregloSeleccion[i].Accion != "1") {
            arreglo.push(arregloSeleccion[i]);
        }
    }

    return arreglo;
}

function ArregloSeleccion_length() {
    var arreglo = [];

    for (var i = 0; i < arregloSeleccion.length; i++) {
        if (arregloSeleccion[i].Accion != "1") {
            arreglo.push(arregloSeleccion[i]);
        }
    }

    return arreglo.length;
}

function HabilitarNuevoPedido() {
    var resul = false;
    for (var i = 0; i < pedidos.length; i++) {
        if (pedidos[i].DscEstado == "Enviado") {
            resul = true;
        }
    }
    return resul;
}

function obtenerNumerosRenovacion() {
    $.ajax({
        type: "POST",
        url: "Pedido.aspx/ListarByLineaEmpleadoFamily",
        data: "{'prIdEmpleado': '" + $("#hdfEmpleado").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            num = JSON.parse(resultado.d);

            //            var numReno;
            //            numReno = window.parent.misNumRenovar; 

            //            if (numReno == undefined) {
            for (var i = 0; i < num.length; i++) {
                numerosRenovar.push(new MiNumero(num[i].text, num[i].value));
            }
            //            }
            //            else
            //            {
            //                for (var k = 0; k < numReno.length; k++) {
            //                    numerosRenovar.push(new MiNumero(numReno[k],numReno[k]));
            //                }                   
            //                
            //            }

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function MiProducto(_P_inCod, _vcNom, _imIma, _vcDes, _Precio, _CantidadTotal, _CantidadUsada, _CantidadDisponible, _Reservable, _IdGama, _ObligPlanDep, _PrercioPlan, _IdTipoFinanciamiento) {

    var meses = MesesFinanciamientoEquipo;
    if (_IdGama == '9') {
        meses = MesesFinanciamientoChip;
    }
    else if (_Precio <= MontoMinimo) {
        meses = 1;
    }

    this.P_inCod = _P_inCod;
    this.vcNom = _vcNom;
    this.imIma = _imIma;
    this.vcDes = _vcDes;
    this.Precio = _Precio;
    this.CantidadTotal = _CantidadTotal;
    this.CantidadUsada = _CantidadUsada;
    this.CantidadDisponible = _CantidadDisponible;
    this.Reservable = _Reservable;
    this.Accion = "";
    this.IdDetalle = "";
    this.Numero = "";
    this.PrecioEquiDesc = meses == 1 ? formatNumber.newo(_Precio, oCultura.Moneda.vcSimMon) : formatNumber.newo((_Precio / meses), oCultura.Moneda.vcSimMon) + " (Al mes)";
    this.IdGama = _IdGama;
    this.ObligPlanDep = _ObligPlanDep == null || _ObligPlanDep == undefined ? "False" : _ObligPlanDep;
    //this.ObligPlanDep = _ObligPlanDep == null || _ObligPlanDep == undefined ? "0" : _ObligPlanDep;
    this.PrercioPlan = _PrercioPlan;

    this.IdTipoFinanciamiento = _IdTipoFinanciamiento
}

function MiProductoElegido(_P_inCod, _vcNom, _imIma, _vcDes, _Precio, _CantidadTotal, _CantidadUsada, _CantidadDisponible, _Reservable, _Idplan, _NumMeses, _minPrecioPlan, _IdGama, _ObligPlanDep, _PrercioPlan, _IdTipoFinanciamiento) {

    this.P_inCod = _P_inCod;
    this.vcNom = _vcNom;
    this.imIma = _imIma;
    this.vcDes = _vcDes;
    this.Precio = _Precio;
    this.CantidadTotal = _CantidadTotal;
    this.CantidadUsada = _CantidadUsada;
    this.CantidadDisponible = _CantidadDisponible;
    this.Reservable = _Reservable;
    this.IdPlan = _Idplan;
    this.NumMeses = _NumMeses;
    this.Accion = "";
    this.IdDetalle = "";
    this.Numero = "";

    this.MinPrecioPlan = _minPrecioPlan;
    this.IdGama = _IdGama;
    //this.CuotasEquipo = _IdGama == '9' ? MesesFinanciamientoChip : MesesFinanciamientoEquipo;
    this.CuotasEquipo = _IdGama == '9' ? MesesFinanciamientoChip : (_Precio <= MontoMinimo ? 1 : MesesFinanciamientoEquipo);
    this.ObligPlanDep = _ObligPlanDep;
    this.PrercioPlan = _PrercioPlan;

    this.IdTipoFinanciamiento = _IdTipoFinanciamiento;
}

function miPlan(_text, _value, _precio) {
    this.text = _text;
    this.value = _value;
    this.precio = parseFloat(_precio);
}

function misMesesContrato(_text, _value) {
    this.text = _text;
    this.value = _value;
}

function MiNumero(_text, _value) {

    this.text = _text;
    this.value = _value;

}

function miFinanciamientoVariable(_text, _value, _precio,_Cuotas) {
    this.text = _text;
    this.value = _value;
    this.precio = parseFloat(_precio);
    this.Cuotas = _Cuotas;
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function obtenerPlanesByIdProducto(IdProducto) {
    var planes = [];

    //Sólo monto mayor a plan actual
    var btSoloPlanMayor = false;
    if (window.parent.CampanaConf.RenovarContratoVigente && window.parent.Habilitado == "0") {
        btSoloPlanMayor = window.parent.CampanaConf.SoloRenovarMontoMayor;
    }

    if (IdProducto != undefined) {
        for (var i = 0; i < productosBase.length; i++) {
            //if (window.parent.FlagMantenerPlan != undefined && window.parent.FlagMantenerPlan == "True" && window.parent.IdPlanNumeroRenovar != productosBase[i].idPlan) {
            //            if (window.parent.NumeroRenovar != undefined &&
            //            window.parent.IdPlanNumeroRenovar != productosBase[i].idPlan &&
            //            window.parent.FlagMantenerPlan == "True"
            //            ) {
            //                continue;
            //            }
            if (productosBase[i].P_inCod == IdProducto) {

                if (window.parent.NumeroRenovar == undefined) {
                    if (productosBase[i].EsNuevo == "0") {
                        continue;
                    }
                }
                else {
                    if (window.parent.FlagMantenerPlan == "True") {
                        if (window.parent.IdPlanNumeroRenovar != productosBase[i].idPlan) {
                            continue;
                        }
                    }
                    else {
                        if (obligarMantenerPlan) {
                            if (window.parent.IdPlanNumeroRenovar == productosBase[i].idPlan) {
                                if (productosBase[i].idPlan_equivalente == -1) {
                                    return [new miPlan(productosBase[i].DscPlan + " (" + formatNumber.newo(productosBase[i].PrercioPlan, oCultura.Moneda.vcSimMon) + ")", productosBase[i].idPlan, productosBase[i].PrercioPlan)];
                                }
                                else {
                                    return [new miPlan(productosBase[i].DscPlan_equivalente + " (" + formatNumber.newo(productosBase[i].PrercioPlan_equivalente, oCultura.Moneda.vcSimMon) + ")", productosBase[i].idPlan_equivalente, productosBase[i].PrercioPlan_equivalente)];
                                }

                            }
                            else {//geig campana 24
                                if (productosBase[i].EsNuevo == "0") {//geig campana 24
                                    continue; //geig campana 24
                                } //geig campana 24
                            } //geig campana 24

                        }
                        else {
                            if (productosBase[i].EsNuevo == "0") {//geig campana 24
                                continue; //geig campana 24
                            } //geig campana 24
                        }

                    }
                }

                //            if (window.parent.NumeroRenovar != undefined && window.parent.FlagMantenerPlan == "False" && productosBase[i].EsNuevo == "0") {
                //                continue;
                //            }

                //            if (window.parent.NumeroRenovar == undefined && productosBase[i].EsNuevo == "0") {
                //                continue;
                //            }
                //


                if (planes.length == 0) {
                    if (productosBase[i].idPlan_equivalente == -1) {
                        //planes.push(new miPlan(productosBase[i].DscPlan + " (" + formatNumber.newo(productosBase[i].PrercioPlan, oCultura.Moneda.vcSimMon) + ")", productosBase[i].idPlan, productosBase[i].PrercioPlan));
                        if (UsarPlanDep) {
                            planes.push(new miPlan(productosBase[i].DscPlan + " (" + formatNumber.newo(productosBase[i].PrercioPlan, oCultura.Moneda.vcSimMon) + ")", productosBase[i].idPlan, productosBase[i].PrercioPlan));
                        } else {
                            if (btSoloPlanMayor) {
                                if (parseFloat(window.parent.PrecioPlanNumeroRenovar) < parseFloat(productosBase[i].PrercioPlan)) {
                                    planes.push(new miPlan(productosBase[i].DscPlan + " (" + formatNumber.newo(productosBase[i].PrercioPlan, oCultura.Moneda.vcSimMon) + ")", productosBase[i].idPlan, productosBase[i].PrercioPlan));
                                }
                            } else {
                                planes.push(new miPlan(productosBase[i].DscPlan + " (" + formatNumber.newo(productosBase[i].PrercioPlan, oCultura.Moneda.vcSimMon) + ")", productosBase[i].idPlan, productosBase[i].PrercioPlan));
                            }
                        }

                    }
                    else {
                        planes.push(new miPlan(productosBase[i].DscPlan_equivalente + " (" + formatNumber.newo(productosBase[i].PrercioPlan_equivalente, oCultura.Moneda.vcSimMon) + ")", productosBase[i].idPlan_equivalente, productosBase[i].PrercioPlan_equivalente));
                    }

                    continue;
                }

                var entro = false;
                for (var k = 0; k < planes.length; k++) {
                    if (productosBase[i].idPlan == planes[k].value) {
                        entro = true;
                        break;
                    }
                }
                if (entro) {
                    continue;
                }

                if (productosBase[i].idPlan_equivalente == -1) {
                    //planes.push(new miPlan(productosBase[i].DscPlan + " (" + formatNumber.newo(productosBase[i].PrercioPlan, oCultura.Moneda.vcSimMon) + ")", productosBase[i].idPlan, productosBase[i].PrercioPlan));
                    if (UsarPlanDep) {
                        planes.push(new miPlan(productosBase[i].DscPlan + " (" + formatNumber.newo(productosBase[i].PrercioPlan, oCultura.Moneda.vcSimMon) + ")", productosBase[i].idPlan, productosBase[i].PrercioPlan));
                    } else {
                        if (btSoloPlanMayor) {
                            if (parseFloat(window.parent.PrecioPlanNumeroRenovar) < parseFloat(productosBase[i].PrercioPlan)) {
                                planes.push(new miPlan(productosBase[i].DscPlan + " (" + formatNumber.newo(productosBase[i].PrercioPlan, oCultura.Moneda.vcSimMon) + ")", productosBase[i].idPlan, productosBase[i].PrercioPlan));
                            }
                        } else {
                            planes.push(new miPlan(productosBase[i].DscPlan + " (" + formatNumber.newo(productosBase[i].PrercioPlan, oCultura.Moneda.vcSimMon) + ")", productosBase[i].idPlan, productosBase[i].PrercioPlan));
                        }
                    }
                }
                else {
                    planes.push(new miPlan(productosBase[i].DscPlan_equivalente + " (" + formatNumber.newo(productosBase[i].PrercioPlan_equivalente, oCultura.Moneda.vcSimMon) + ")", productosBase[i].idPlan_equivalente, productosBase[i].PrercioPlan_equivalente));
                }

            }
        }
    }
    return planes;
}

function obtenerMesesByPlan(IdPlan, IdEquipo) {

    var meses = [];

    if (IdPlan != undefined) {
        for (var i = 0; i < productosBase.length; i++) {
            if (productosBase[i].idPlan == IdPlan && productosBase[i].P_inCod == IdEquipo) {
                if (meses.length == 0) {
                    meses.push(new misMesesContrato(productosBase[i].MesesContrato, productosBase[i].MesesContrato));
                    continue;
                }

                var entro = false;
                for (var k = 0; k < meses.length; k++) {
                    if (productosBase[i].MesesContrato == meses[k].value) {
                        entro = true;
                        break;
                    }
                }
                if (entro) {
                    continue;
                }

                meses.push(new misMesesContrato(productosBase[i].MesesContrato, productosBase[i].MesesContrato));

            }
            else {

                if (productosBase[i].idPlan_equivalente == IdPlan && productosBase[i].P_inCod == IdEquipo) {
                    if (meses.length == 0) {
                        meses.push(new misMesesContrato(productosBase[i].MesesContrato, productosBase[i].MesesContrato));
                        continue;
                    }

                    var entro = false;
                    for (var k = 0; k < meses.length; k++) {
                        if (productosBase[i].MesesContrato == meses[k].value) {
                            entro = true;
                            break;
                        }
                    }
                    if (entro) {
                        continue;
                    }

                    meses.push(new misMesesContrato(productosBase[i].MesesContrato, productosBase[i].MesesContrato));

                }

            }
        }
    }

    return meses;

}

function obtenerPrecioEquipoPorMeses(IdProducto, Meses) {
    for (var i = 0; i < productosBase.length; i++) {
        if (productosBase[i].P_inCod == IdProducto && productosBase[i].MesesContrato == Meses) {
            return productosBase[i].Precio;
        }
    }

}

function obtenerPrecioEquipoPorMeses_yPlan(IdProducto, Meses, pIdPlan) {

    for (var i = 0; i < productosBase.length; i++) {

        if (productosBase[i].P_inCod == IdProducto && productosBase[i].MesesContrato == Meses && productosBase[i].idPlan == pIdPlan) {
            return productosBase[i].Precio;
        }
    }

    for (var i = 0; i < productosBase.length; i++) {
        if (productosBase[i].P_inCod == IdProducto && productosBase[i].MesesContrato == Meses && productosBase[i].idPlan_equivalente == pIdPlan) {
            return productosBase[i].Precio;
        }
    }   



}

function obtenerDscPlanPorIdPlan(IdPlan) {
    for (var i = 0; i < productosBase.length; i++) {
        if (productosBase[i].idPlan == IdPlan) {
            return productosBase[i].DscPlan;
        }
    }
}

function obtenerPrecioPlanPorIdPlan(IdPlan) {
    for (var i = 0; i < productosBase.length; i++) {
        if (productosBase[i].idPlan == IdPlan) {
            return productosBase[i].PrercioPlan;
        }
        else {
            if (productosBase[i].idPlan_equivalente == IdPlan) {
                return productosBase[i].PrercioPlan_equivalente;
            }
        }
    }
}

function loadgrillaPedidos() {
    var t = $(this.tbody).find("tr");
    for (var i = 0; i < this._data.length; i++) {
        if (((this._data[i].Situacion == "Renovacion" || this._data[i].Situacion == "Renovación") &&
             (this._data[i].TipoRenovacion == "Línea" || this._data[i].TipoRenovacion == "Linea"))
             || this._data[i].Situacion == "Baja"
             || parseInt(this._data[i].MontoTotalServicios) == 0) {
            $($(t[i]).find(".k-button")[0]).css({ "background": "white", "display": "none" });
        }
        else
            if (this._data[i].DscEstado != "Procesado" && this._data[i].DscEstado != "Enviado") {
                $($(t[i]).find(".k-button")[0]).css({ "background": "white", "display": "none" });
            }
    }
}

//setInterval(function () { $(".k-grid-header", "#pSelecPro").css({ "float": "left" }) }, 500); geig1

function onLoadSubGrillaPedido() {
    var t = $(this.tbody).find("tr");
    for (var i = 0; i < this._data.length; i++) {

        if (this._data[i].Estado_Adquisicion != "Equipo adquirido") {
            $(t[i]).css("background", "#F9E4E0");
            $($(t[i]).find("td")[1]).css("color", "red");
            $($(t[i]).find("td")[12]).text("");
        }
    }
}

//funciones genericas
function operarInidicadores(montoEquipo, montoPlan, cuotas) {
    if (MesesFinanciamientoEquipo == 1) {
        indicadoresVariante[0]["Disponible"] = parseFloat(indicadoresVariante[0]["Disponible"] - montoEquipo);
        indicadoresVariante[0]["Utilizado"] = parseFloat(indicadoresVariante[0]["Utilizado"] + montoEquipo);

        indicadoresVariante[1]["Disponible"] = parseFloat(indicadoresVariante[1]["Disponible"] - montoPlan);
        indicadoresVariante[1]["Utilizado"] = parseFloat(indicadoresVariante[1]["Utilizado"] + montoPlan);
    } else {
        if (cuotas != undefined && cuotas != null && cuotas != 0) {
            //if (cuotas != undefined && cuotas != null && cuotas != 0 && Math.abs(montoEquipo) > MontoMinimo) {
            montoEquipo = montoEquipo / cuotas;
        }

        indicadoresVariante[0]["Disponible"] = parseFloat((indicadoresVariante[0]["Disponible"] - montoEquipo).toFixed(numDecimales));
        indicadoresVariante[0]["Utilizado"] = parseFloat((indicadoresVariante[0]["Utilizado"] + montoEquipo).toFixed(numDecimales));

        indicadoresVariante[1]["Disponible"] = parseFloat((indicadoresVariante[1]["Disponible"] - montoPlan).toFixed(numDecimales));
        indicadoresVariante[1]["Utilizado"] = parseFloat((indicadoresVariante[1]["Utilizado"] + montoPlan).toFixed(numDecimales));
    }
    actualizarIndicadores();
}



function actualizarIndicadores() {

    //    for (var n = 0; n < $(".itemIndicador").length; n++) {
    //        if (n = 0)
    //            continue;

    //        $($(".itemIndicador")[n]).remove();
    //    }

    for (var i = 0; i < indicadoresVariante.length; i++) {

        var porc = parseInt(indicadoresVariante[i]["Utilizado"] / indicadoresVariante[i]["Aprobado"] * 100);

        //$($(".indiDesc")[i + 1]).text();
        //$($(".indiDisponible")[i + 1]).text();
        $($(".credisp")[i]).text(formatNumber.newo(indicadoresVariante[i]["Disponible"], oCultura.Moneda.vcSimMon + " "));
        $($(".creduti")[i]).text(formatNumber.newo(indicadoresVariante[i]["Utilizado"], oCultura.Moneda.vcSimMon + " "));
        $("#inibar" + i.toString()).data("kendoSlider").value(indicadoresVariante[i]["Utilizado"]);
        $($(".creporc")[i]).text((porc == NaN ? 0 : porc) + " %");

        //$($(".credisp")[i]).css({ "color": "darkred" , "border-radius":"5px" , "background-color" : "rgba(230,230,230,.5)"   });
        //$($(".credisp")[i]).addClass("AlertaMonto");
        $($(".credisp")[i]).addClass("divCreditDis");
        $(".divCreditDis").addClass("AlertaMonto");
        fnalerta();
    }

    aumentarBurbuja();

}

function validarexcesoBool() {

    var creDis = indicadoresVariante[0]["Disponible"];
    var creDisPlan = indicadoresVariante[1]["Disponible"];

    if (creDis < 0) {
        return true;
    }
    else {
        return creDisPlan < 0;
    }

}

function validarexcesoBool_monto(montoEquipo, montoPlan, idGama) {
    if (MesesFinanciamientoEquipo != 1) {
        var meses = idGama != undefined && idGama != null && idGama == '9' ? MesesFinanciamientoChip : MesesFinanciamientoEquipo;
        var creDis = parseFloat(indicadoresVariante[0]["Disponible"] - (montoEquipo / meses));
    } else {
        var creDis = parseFloat(indicadoresVariante[0]["Disponible"] - montoEquipo);
    }
    var creDisPlan = parseFloat(indicadoresVariante[1]["Disponible"] - montoPlan);

    if (creDis < 0) {
        return true;
    }
    else {
        return creDisPlan < 0;
    }

}

function miIndicadorCredito(_descripcion, _aprobado, _disponible, _utilizado) {

    this.Descripcion = _descripcion;
    this.Aprobado = _aprobado;
    this.Disponible = _disponible;
    this.Utilizado = _utilizado;

}

function miListaFinanciamiento(_IdTipoFinanciamiento, _Categoria, _Cuotas, _EsDefault, _NombreFinanciamiento) {
    this.IdTipoFinanciamiento = _IdTipoFinanciamiento;
    this.Categoria = _Categoria;
    this.Cuotas = _Cuotas;
    this.EsDefault = _EsDefault;
    this.NombreFinanciamiento = _NombreFinanciamiento;

}
//------------------------------------------------------------------------

function fnEsCampanaPreventa() {
    $("#spanCamDesc").text("Preventa campaña : ");
    $("#spanCamDesc").css("color", "red");
    $(".ocultarPre").css("display", "none");
    $("#spanNomCam").css("color", "red");
    $("#pnlPreventa").css("display", "block");
    $("#tapDeclaracion").text("Paso3 : Confirmación reserva");
}

function procesarPreventa() {
    if (esEditar) {
        var edit = false;
        if (arregloEli.length == 0) {
            for (var i = 0; i < arregloSeleccion.length; i++) {
                if (arregloSeleccion[i].Accion != "0") {
                    edit = true;
                    break;
                }
            }
        }
        else {
            edit = true;
        }

        if (!edit) {
            alerta("Usted no a modificado su pedido");
            return;
        }

    }


    if (arregloSeleccion.length == 0) {
        alerta("Usted no tiene productos en el carrito de compras");
        return;
    }

    if (validarexceso()) {
        alerta("Usted a sobrepasado su límite de crédito, verifique su carrito de compras");
        return;
    }

    confirma("¿Esta usted seguro de enviar la reserva de pedido?<br>"
    , "Reserva de productos", function (a) {
        if (a == "Aceptar") {

            $(".tap").hide();
            $("#tapProceso").show();
            //$(".tap").removeClass("tapSelect");
            $("#tapProceso").addClass("tapSelect");
            $("#pSelecPro").hide();
            $("#pDetEle").hide();
            $("#pDeclaracion").hide();

            $("#pProcesoCompra").fadeIn(200, function () {
                $("#pPanelCarrito").hide(300, function () {
                    if (esEditar) {
                        ModificarPreventaPedido();
                    }
                    else {
                        registrarPreventaPedido();
                    }
                });
            });

        }
    });

}

function registrarPreventaPedido() {
    if (arregloSeleccion.length == 0) {
        alerta("Agregue productos a su carrito de compras por favor");
        return;
    }

    var XML_AGREGAR = '<?xml version="1.0" encoding="iso-8859-1"?><TABLE>';
    //var num = $(".cboNumeros");
    for (var i = 0; i < arregloSeleccion.length; i++) {

        var miNumero = window.parent.NumeroRenovar;
        var miPrecioPlanAntiguo = window.parent.PrecioPlanNumeroRenovar;

        if (miNumero == undefined) {
            miNumero = "Nueva Linea";
        }
        if (miPrecioPlanAntiguo == undefined) {
            miPrecioPlanAntiguo = "0";
        }

        XML_AGREGAR = XML_AGREGAR + '<PEDIDO><IdProducto>' + arregloSeleccion[i].P_inCod.toString() +
            '</IdProducto><vcNom>' + arregloSeleccion[i].vcNom.toString() +
            '</vcNom><Precio>' + arregloSeleccion[i].Precio.toString() +
            '</Precio><IdPlan>' + arregloSeleccion[i].IdPlan.toString() +
            '</IdPlan><DscPlan>' + obtenerPrecioPlanPorIdPlan(arregloSeleccion[i].IdPlan) +
            '</DscPlan><Orden>' + (i + 1).toString() +
            '</Orden><esNuevo>' + '1' +
            '</esNuevo><Numero>' + miNumero +
            '</Numero><Meses>' + arregloSeleccion[i].NumMeses.toString() +
            '</Meses><PrecioPlanAntiguo>' + miPrecioPlanAntiguo +
            '</PrecioPlanAntiguo></PEDIDO>';

    }



    XML_AGREGAR = XML_AGREGAR + '</TABLE>';

    $.ajax({
        type: "POST",
        url: "Pedido.aspx/registrarPedidoPreventa",
        data: "{'prIdEmpleado': '" + $("#hdfEmpleado").val() + "'," +
                "'pIdCampana': '" + window.parent.CampanaConf.IdCampana + "'," +
                "'pXmlPedido': '" + XML_AGREGAR + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {

            if (resultado.d == "") {
                window.location.href = "../FinSession.aspx";
                return;
            }

            if (resultado.d == "ERROR AL AGREGAR PRODUCTO") {
                alerta(resultado.d);
                return;
            }

            var resul = JSON.parse(resultado.d);

            $("#hdfIdPedidoMirror").val(resul[0].IdPedido);
            $("#lblCodigoPedido").text(resul[0].codigopedido);

            var fechaInicio = new Date();
            strFechaInicio = dias[fechaInicio.getDay()] + ', ' + fechaInicio.getDate() + ' de ' + meses[fechaInicio.getMonth()] + ' del ' + fechaInicio.getFullYear();
            var FormatNewFechaI = dias[fechaInicio.getDay()] + ', ' + Right('0' + fechaInicio.getDate(), 2) + '/' + MesesEnteros[fechaInicio.getMonth()] + '/' + fechaInicio.getFullYear();

            $("#lblFechaPedi").text(FormatNewFechaI + " " + fechaInicio.getHours() + ":" + fechaInicio.getMinutes());

            $("#grid1").kendoGrid({
                dataSource: {
                    data: resul,
                    pageSize: 7,
                    group: {
                        field: "Estado",
                        aggregates: [{ field: "Equipo", aggregate: "count" },
                                    { field: "PrecioEquipo", aggregate: "sum" },
                                    { field: "PrecioPlan", aggregate: "sum" }]
                    },
                    aggregate: [{ field: "Equipo", aggregate: "count" },
                                { field: "PrecioEquipo", aggregate: "sum" },
                                { field: "PrecioPlan", aggregate: "sum" }]
                },
                sortable: false,
                scrollable: false,
                pageable: {
                    refresh: true,
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
                columns: [
                            { field: "idDetallePedido", title: "idDetallePedido", hidden: true },
                            { field: "NumeroItem", title: "Ítem", hidden: true },
                            { field: "Equipo", title: "Descripción", footerTemplate: "Total equipos: #=count#", groupFooterTemplate: "Total: #=count#" },
                            { field: "PrecioEquipo", title: "Precio Equipo", footerTemplate: '<div style="float:right">Total: #=sum#</div>', groupFooterTemplate: '<div style="float:right">Precio: #=sum#</div>', attributes: { style: "text-align: right" }, format: "{0:#,#.00}" },
                            { field: "Plan", title: "Plan" },
                            { field: "PrecioPlan", title: "Precio Plan", footerTemplate: '<div style="float:right">Total: #=sum#</div>', groupFooterTemplate: '<div style="float:right">Precio: #=sum#</div>', attributes: { style: "text-align: right" } },
                            { field: "Numero", title: "Número" }
                ]
            });
            arregloSeleccion = [];
            arregloEli = [];
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function ModificarPreventaPedido() {
    if (arregloSeleccion.length == 0) {
        alerta("Agregue productos a su carrito de compras por favor");
        return;
    }

    var miNumero = window.parent.NumeroRenovar;
    var miPrecioPlanAntiguo = window.parent.PrecioPlanNumeroRenovar;

    if (miNumero == undefined) {
        miNumero = "Nueva Linea";
    }
    if (miPrecioPlanAntiguo == undefined) {
        miPrecioPlanAntiguo = "0";
    }

    var XML_ELIMINAR = '<?xml version="1.0" encoding="iso-8859-1"?><TABLE>';
    var XML_AGREGAR = '<?xml version="1.0" encoding="iso-8859-1"?><TABLE>';

    for (var k = 0; k < arregloEli.length; k++) {
        XML_ELIMINAR = XML_ELIMINAR + '<PEDIDO><IdProducto>' + arregloEli[k][0].P_inCod.toString() +
        '</IdProducto><vcNom>' + arregloEli[k][0].vcNom.toString() +
        '</vcNom><Precio>' + arregloEli[k][0].Precio.toString() +
        '</Precio><IdPlan>' + arregloEli[k][0].IdPlan.toString() +
        '</IdPlan><DscPlan>' + obtenerPrecioPlanPorIdPlan(arregloEli[k][0].IdPlan) +
        '</DscPlan><Orden>' + (k + 1).toString() +
        '</Orden><idDetallePedido>' + arregloEli[k][0].IdDetalle.toString() +
        '</idDetallePedido></PEDIDO>';
    }
    XML_ELIMINAR = XML_ELIMINAR + '</TABLE>';

    //var num = $(".cboNumeros");
    for (var i = 0; i < arregloSeleccion.length; i++) {


        if (arregloSeleccion[i].IdDetalle == "") {

            XML_AGREGAR = XML_AGREGAR + '<PEDIDO><IdProducto>' + arregloSeleccion[i].P_inCod.toString() +
            '</IdProducto><vcNom>' + arregloSeleccion[i].vcNom.toString() +
            '</vcNom><Precio>' + arregloSeleccion[i].Precio.toString() +
            '</Precio><IdPlan>' + arregloSeleccion[i].IdPlan.toString() +
            '</IdPlan><DscPlan>' + obtenerPrecioPlanPorIdPlan(arregloSeleccion[i].IdPlan) +
            '</DscPlan><Orden>' + (i + 1).toString() +
            '</Orden><Numero>' + miNumero +
            '</Numero><Meses>' + arregloSeleccion[i].NumMeses.toString() +
            '</Meses></PEDIDO>';
        }
    }
    XML_AGREGAR = XML_AGREGAR + '</TABLE>';

    $.ajax({
        type: "POST",
        url: "Pedido.aspx/editarPedidoPreventa",
        data: "{'prIdEmpleado': '" + $("#hdfEmpleado").val() + "'," +
                "'pIdCampana': '" + window.parent.CampanaConf.IdCampana + "'," +
                "'pIdPedido': '" + $("#hdfIdPedidoEditar").val() + "'," +
                "'pXmlEliminar': '" + XML_ELIMINAR + "'," +
                "'pXmlAgregar': '" + XML_AGREGAR + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            if (resultado.d == "") {
                window.location.href = "../FinSession.aspx";
                return;
            }
            if (resultado.d == "ERROR AL ELIMINAR PRODUCTO") {
                alerta(resultado.d);
                return;
            }

            if (resultado.d == "ERROR AL AGREGAR PRODUCTO") {
                alerta(resultado.d);
                return;
            }
            var resul = JSON.parse(resultado.d);

            $("#lblCodigoPedido").text(resul[0].codigopedido);

            var fechaInicio = new Date();
            strFechaInicio = dias[fechaInicio.getDay()] + ', ' + fechaInicio.getDate() + ' de ' + meses[fechaInicio.getMonth()] + ' del ' + fechaInicio.getFullYear();
            var FormatNewFechaI = dias[fechaInicio.getDay()] + ', ' + Right('0' + fechaInicio.getDate(), 2) + '/' + MesesEnteros[fechaInicio.getMonth()] + '/' + fechaInicio.getFullYear();

            $("#lblFechaPedi").text(FormatNewFechaI + " " + fechaInicio.getHours() + ":" + fechaInicio.getMinutes());

            $("#grid1").kendoGrid({
                dataSource: {
                    data: resul,
                    pageSize: 7,
                    group: {
                        field: "Estado", aggregates: [
                                        { field: "Equipo", aggregate: "count" },
                                        { field: "PrecioEquipo", aggregate: "sum" },
                                        { field: "PrecioPlan", aggregate: "sum" }
                        ]
                    },

                    aggregate: [{ field: "Equipo", aggregate: "count" },
                                          { field: "PrecioEquipo", aggregate: "sum" },
                                          { field: "PrecioPlan", aggregate: "sum" }]
                },
                sortable: false,
                scrollable: false,
                pageable: {
                    refresh: true,
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
                columns: [
                            { field: "idDetallePedido", title: "idDetallePedido", hidden: true },
                            { field: "codigopedido", title: "codigopedido", hidden: true },
                            { field: "NumeroItem", title: "Ítem", hidden: true },
                            { field: "Equipo", title: "Descripción", footerTemplate: "Total equipos: #=count#", groupFooterTemplate: "Total: #=count#" },
                            { field: "PrecioEquipo", title: "Precio Equipo", footerTemplate: '<div style="float:right">Total: #=sum#</div>', groupFooterTemplate: '<div style="float:right">Precio: #=sum#</div>', attributes: { style: "text-align: right" }, format: "{0:#,#.00}" },
                            { field: "Plan", title: "Plan" },
                            { field: "PrecioPlan", title: "Precio Plan", footerTemplate: '<div style="float:right">Total: #=sum#</div>', groupFooterTemplate: '<div style="float:right">Precio: #=sum#</div>', attributes: { style: "text-align: right" } },
                            { field: "Numero", title: "Número" }
                ]
            });

            arregloSeleccion = [];
            arregloEli = [];

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function ConfirmacionPreventa() {
    if (arregloSeleccion.length == 0) {
        alerta("Agregue productos a su carrito de compras por favor, si quiere eliminar todos cancele el pedido");
        return;
    }

    var miNumero = window.parent.NumeroRenovar;
    var miPrecioPlanAntiguo = window.parent.PrecioPlanNumeroRenovar;

    if (miNumero == undefined) {
        miNumero = "Nueva Linea";
    }
    if (miPrecioPlanAntiguo == undefined) {
        miPrecioPlanAntiguo = "0";
    }

    var XML_ELIMINAR = '<?xml version="1.0" encoding="iso-8859-1"?><TABLE>';
    var XML_ACTUALIZAR = '<?xml version="1.0" encoding="iso-8859-1"?><TABLE>';
    var XML_AGREGAR = '<?xml version="1.0" encoding="iso-8859-1"?><TABLE>';

    for (var k = 0; k < arregloEli.length; k++) {
        XML_ELIMINAR = XML_ELIMINAR + '<PEDIDO><ID>' + (k + 1).toString() + '</ID><IdProducto>' + arregloEli[k][0].P_inCod.toString() +
        '</IdProducto><vcNom>' + arregloEli[k][0].vcNom.toString() +
        '</vcNom><Precio>' + arregloEli[k][0].Precio.toString() +
        '</Precio><IdPlan>' + arregloEli[k][0].IdPlan.toString() +
        '</IdPlan><DscPlan>' + obtenerPrecioPlanPorIdPlan(arregloEli[k][0].IdPlan) +
        '</DscPlan><Orden>' + (k + 1).toString() +
        '</Orden><idDetallePedido>' + arregloEli[k][0].IdDetalle.toString() +
        '</idDetallePedido></PEDIDO>';
    }
    XML_ELIMINAR = XML_ELIMINAR + '</TABLE>';

    //var num = $(".cboNumeros");
    var contadorAct = 0;
    var contadorAgre = 0;

    for (var i = 0; i < arregloSeleccion.length; i++) {
        if (arregloSeleccion[i].IdDetalle == "") {
            contadorAgre = contadorAgre + 1;

            XML_AGREGAR = XML_AGREGAR + '<PEDIDO><ID>' + contadorAgre.toString() + '</ID><IdProducto>' + arregloSeleccion[i].P_inCod.toString() +
            '</IdProducto><vcNom>' + arregloSeleccion[i].vcNom.toString() +
            '</vcNom><Precio>' + arregloSeleccion[i].Precio.toString() +
            '</Precio><IdPlan>' + arregloSeleccion[i].IdPlan.toString() +
            '</IdPlan><DscPlan>' + obtenerPrecioPlanPorIdPlan(arregloSeleccion[i].IdPlan) +
            '</DscPlan><Orden>' + (i + 1).toString() +
            '</Orden><Numero>' + miNumero +
            '</Numero><Meses>' + arregloSeleccion[i].NumMeses.toString() +
            '</Meses><PrecioPlanAntiguo>' + miPrecioPlanAntiguo.toString() + '</PrecioPlanAntiguo></PEDIDO>';
        }
        else {
            contadorAct = contadorAct + 1;

            XML_ACTUALIZAR = XML_ACTUALIZAR + '<PEDIDO><ID>' + contadorAct.toString() + '</ID><IdProducto>' + arregloSeleccion[i].P_inCod.toString() +
            '</IdProducto><vcNom>' + arregloSeleccion[i].vcNom.toString() +
            '</vcNom><Precio>' + arregloSeleccion[i].Precio.toString() +
            '</Precio><IdPlan>' + arregloSeleccion[i].IdPlan.toString() +
            '</IdPlan><DscPlan>' + obtenerPrecioPlanPorIdPlan(arregloSeleccion[i].IdPlan) +
            '</DscPlan><Orden>' + (i + 1).toString() +
            '</Orden><idDetallePedido>' + arregloSeleccion[i].IdDetalle.toString() +
            '</idDetallePedido></PEDIDO>';

        }
    }
    XML_AGREGAR = XML_AGREGAR + '</TABLE>';
    XML_ACTUALIZAR = XML_ACTUALIZAR + '</TABLE>';

    $.ajax({
        type: "POST",
        url: "Pedido.aspx/ConfirmarPedidoPreventa",
        data: "{'prIdEmpleado': '" + $("#hdfEmpleado").val() + "'," +
                "'pIdCampana': '" + window.parent.CampanaConf.IdCampana + "'," +
                "'pIdPedido': '" + $("#hdfIdPedidoEditar").val() + "'," +
                "'pXmlEliminar': '" + XML_ELIMINAR + "'," +
                "'pXmlActualizar': '" + XML_ACTUALIZAR + "'," +
                "'pXmlAgregar': '" + XML_AGREGAR + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            if (resultado.d == "") {
                window.location.href = "../FinSession.aspx";
                return;
            }
            if (resultado.d == "ERROR AL ELIMINAR PRODUCTO") {
                alerta(resultado.d);
                return;
            }

            if (resultado.d == "ERROR AL AGREGAR PRODUCTO") {
                alerta(resultado.d);
                return;
            }
            var resul = JSON.parse(resultado.d);

            $("#lblCodigoPedido").text(resul[0].codigopedido);

            var fechaInicio = new Date();
            strFechaInicio = dias[fechaInicio.getDay()] + ', ' + fechaInicio.getDate() + ' de ' + meses[fechaInicio.getMonth()] + ' del ' + fechaInicio.getFullYear();
            var FormatNewFechaI = dias[fechaInicio.getDay()] + ', ' + Right('0' + fechaInicio.getDate(), 2) + '/' + MesesEnteros[fechaInicio.getMonth()] + '/' + fechaInicio.getFullYear();

            $("#lblFechaPedi").text(FormatNewFechaI + " " + fechaInicio.getHours() + ":" + fechaInicio.getMinutes());

            $("#grid1").kendoGrid({
                dataSource: {
                    data: resul,
                    pageSize: 7,
                    group: {
                        field: "Estado", aggregates: [
                                        { field: "Equipo", aggregate: "count" },
                                        { field: "PrecioEquipo", aggregate: "sum" },
                                        { field: "PrecioPlan", aggregate: "sum" }
                        ]
                    },

                    aggregate: [{ field: "Equipo", aggregate: "count" },
                                          { field: "PrecioEquipo", aggregate: "sum" },
                                          { field: "PrecioPlan", aggregate: "sum" }]
                },
                sortable: false,
                scrollable: false,
                pageable: {
                    refresh: true,
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
                columns: [
                            { field: "idDetallePedido", title: "idDetallePedido", hidden: true },
                            { field: "codigopedido", title: "codigopedido", hidden: true },
                            { field: "NumeroItem", title: "Ítem", hidden: true },
                            { field: "Equipo", title: "Descripción", footerTemplate: "Total equipos: #=count#", groupFooterTemplate: "Total: #=count#" },
                            { field: "PrecioEquipo", title: "Precio Equipo", footerTemplate: '<div style="float:right">Total: #=sum#</div>', groupFooterTemplate: '<div style="float:right">Precio: #=sum#</div>', attributes: { style: "text-align: right" }, format: "{0:#,#.00}" },
                            { field: "Plan", title: "Plan" },
                            { field: "PrecioPlan", title: "Precio Plan", footerTemplate: '<div style="float:right">Total: #=sum#</div>', groupFooterTemplate: '<div style="float:right">Precio: #=sum#</div>', attributes: { style: "text-align: right" } },
                            { field: "Numero", title: "Número" }
                ]
            });

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnObtenerFinancimientos() {
    $.ajax({
        type: "POST",
        url: "Pedido.aspx/ListarFinanciamientoPorCampana",
        data: "{'prIdCampana': '" + window.parent.CampanaConf.IdCampana + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;

            var idFinancDefault = -1;
            for (var i = 0; i < resul.length; i++) {
                if (resul[i].Categoria == 'E' && resul[i].EsDefault) {
                    idFinancDefault = resul[i].IdTipoFinanciamiento;
                    MesesFinanciamientoEquipo = resul[i].Cuotas;
                    $("#spanDdlFinanciamiento").text(resul[i].DescripcionCorta);
                    MontoMinimo = resul[i].MontoMinimo == 0 ? 0 : resul[i].ValorMontoMinimo;
                }
                if (resul[i].Categoria == 'C') {
                    MesesFinanciamientoChip = resul[i].Cuotas;
                }

                lstFinanciamiento.push(new miListaFinanciamiento(resul[i].IdTipoFinanciamiento
                                            , resul[i].Categoria
                                            , resul[i].Cuotas
                                            , resul[i].EsDefault
                                            , resul[i].DescripcionCorta));
            }

            if (resul.length > 1) {
                $("#ddlFinanciamiento").append('<option value="-1" >--Selecione Financimiento--</option>');
            }

            for (var i = 0; i < resul.length; i++) {
                $("#ddlFinanciamiento").append('<option value="' + resul[i].IdTipoFinanciamiento + '" >' + resul[i].DescripcionCorta + '</option>');
            }

            if (window.parent.IdTipoFinanciamiento != undefined) {
                $("#ddlFinanciamiento").val(window.parent.IdTipoFinanciamiento);
            }

            if (idFinancDefault != -1) {
                $("#ddlFinanciamiento").css({ "display": "none" });
                $("#ddlFinanciamiento").val(idFinancDefault);
            }

            if (resul.length == 1) {
                $("#ddlFinanciamiento").css({ "display": "none" });
                //$("#spanDdlFinanciamiento").css({ "display": "none" })
                $("#spanDdlFinanciamiento").text(resul[0].DescripcionCorta);
            }

            if (UsaFinanciamientoPrecioVariable)
            {
                MesesFinanciamientoEquipo = 1;
                $("#ddlFinanciamiento").css({ "display": "none" });
                $("#spanDdlFinanciamiento").css({ "display": "none" });
                $("#ulFinanciamiento").css({ "display": "none" });
                
                $("#ddlFinanciamiento").val(idFinancDefault);
            }


            obtenerProductos();
            enlacesLoad();


        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnMostrarDscFinancimiento() {
    if ($("#ddlFinanciamiento").val() != '-1') {
        $("#frmDscFinanciamiento").attr("src", "Detalle_Financiamiento.aspx?IdTipoFinanciamiento=" + $("#ddlFinanciamiento").val());
        $("#pnlDscFinanciamiento").data("kendoWindow").open();
        $(".k-window").css({ "-webkit-transform": "" });
    }
}

function fnListarTipoModeloDispositivo() {

    if (window.parent.miIdTipoModeloDispositivo != undefined && window.parent.miIdTipoModeloDispositivo != "") {

        for (var i = 0; i < TipoModeloDispositivo.length; i++) {
            if (TipoModeloDispositivo[i].IdTipoModeloDispositivo == window.parent.miIdTipoModeloDispositivo) {
                //$("#ddlTipo").append("<option value='" + TipoModeloDispositivo[i].IdTipoModeloDispositivo + "'>" + TipoModeloDispositivo[i].Descripcion + "</option>");
                if (TipoModeloDispositivo[i].IdTipoModeloDispositivo == 4) {
                    if (window.parent.NumeroRenovar != undefined && window.parent.btnPortabilidad) {
                        $("#ddlTipo").append("<option value='" + TipoModeloDispositivo[i].IdTipoModeloDispositivo + "'>" + TipoModeloDispositivo[i].Descripcion + "</option>");
                    }
                } else {
                    $("#ddlTipo").append("<option value='" + TipoModeloDispositivo[i].IdTipoModeloDispositivo + "'>" + TipoModeloDispositivo[i].Descripcion + "</option>");
                }
                break;
            }
        }
        $("#ddlTipo").kendoDropDownList({
            change: fnObtenerTipoServicio_porTipoModeloDispositivoFil
        });


    }
    else {
        $("#ddlTipo").append("<option value='-1'>--TODOS--</option>");
        for (var i = 0; i < TipoModeloDispositivo.length; i++) {
            if (TipoModeloDispositivo[i].IdTipoModeloDispositivo == 4) {
                if (window.parent.NumeroRenovar != undefined && window.parent.btnPortabilidad) {
                    $("#ddlTipo").append("<option value='" + TipoModeloDispositivo[i].IdTipoModeloDispositivo + "'>" + TipoModeloDispositivo[i].Descripcion + "</option>");
                }
            } else {
                $("#ddlTipo").append("<option value='" + TipoModeloDispositivo[i].IdTipoModeloDispositivo + "'>" + TipoModeloDispositivo[i].Descripcion + "</option>");
            }
        }

        $("#ddlTipo").kendoDropDownList({
            change: fnObtenerTipoServicio_porTipoModeloDispositivoFil
        });
    }
    fnObtenerTipoServicio_porTipoModeloDispositivo();
}

function fnObtenerTipoServicio_porTipoModeloDispositivo() {

    $.ajax({
        type: "POST",
        url: "Pedido.aspx/getTipoServicio",
        data: "{'prIdTipoModeloDispositivo': '" + $("#ddlTipo").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;

            if (window.parent.NumeroRenovar != undefined && !window.parent.btnPortabilidad) {
                resul = jQuery.grep(resul, function (value) { return value.P_inCodTipSer != 9; });
            }

            $("#ddlTipoServicio").data("kendoMultiSelect").setDataSource(resul);
            $("#ddlTipoServicio").data("kendoMultiSelect").refresh();
            $("#ddlTipoServicio").data("kendoMultiSelect").value("");

            if ($.browser.msie) {
                $(".k-animation-container").css("left", "500px !important");

            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function fnObtenerTipoServicio_porTipoModeloDispositivoFil() {

    $.ajax({
        type: "POST",
        url: "Pedido.aspx/getTipoServicio",
        data: "{'prIdTipoModeloDispositivo': '" + $("#ddlTipo").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;

            if (window.parent.NumeroRenovar != undefined && !window.parent.btnPortabilidad) {
                resul = jQuery.grep(resul, function (value) { return value.P_inCodTipSer != 9; });
            }

            $("#ddlTipoServicio").data("kendoMultiSelect").setDataSource(resul);
            $("#ddlTipoServicio").data("kendoMultiSelect").refresh();
            $("#ddlTipoServicio").data("kendoMultiSelect").value("");
            obtenerProductosByFiltro();

            if ($.browser.msie) {
                $(".k-animation-container").css("left", "500px !important");

            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function fnAbrirTapCarrito() {
    $(window.parent.$("form")[0]).append('<div id="dvWaitJS" style="width:100%;height:100%;position:absolute;left:0px;top:0px;background: rgb(240,240,240);background: rgba(0,0,0,.3);z-index:999999;"><div style=" position:relative;top:50%; left:45%; width:225px; height:50px;padding-bottom:8px;background-image: url(\'../Common/Images/progressbar_load.gif\');background-repeat:no-repeat;background-position: center;font-weight:bolder;color: darkblue;background-color:rgba(200,200,200,.8);border-radius: 10px;padding-left:5px;">Espere por favor...</div></div>');

    if (fnVerificarExistenProductosNuevos()) {
        esConformePlanMes = true;
    }

    numeroCambiar = undefined;
    $(".tap").removeClass("tapSelect");
    $("#tapCarrito").addClass("tapSelect");

    $("#detalleTaps > div").hide(0, function () {

        validarexceso();
        //validarexcesoPlan();

        $("#pDetEle").fadeIn(0, function () {
            if (arregloSeleccion.length != 0) {

                var dataSource = new kendo.data.DataSource({
                    data: arregloSeleccion
                    //data: getDatasourceArregloSeleccion()
                });

                var gridele = $("#gridDetEle").data("kendoGrid");
                gridele.setDataSource(dataSource);

                enlazarClick();
            }
        });
    });
    if (window.parent.$("#dvWaitJS").length > 0) {
        window.parent.$("#dvWaitJS").remove();
    }
}

function fnVerificarExistenProductosNuevos() {

    var resul = true;

    if (esEditar && !window.parent.esConfirmacionPreventa) {
        var edit = false;
        if (arregloEli.length == 0) {
            for (var i = 0; i < arregloSeleccion.length; i++) {
                if (arregloSeleccion[i].Accion != "0") {
                    edit = true;
                    break;
                }
            }
        }
        else {
            edit = true;
        }

        if (!edit) {
            resul = false;
        }

    }
    else {
        if (arregloSeleccion.length == 0) {
            resul = false;
        }
    }

    return resul;

}

function fnVerificarSalida(prIdElemento) {
    IdElemento = prIdElemento;
    if (fnVerificarExistenProductosNuevos()) {
        confirma("Usted tiene productos seleccionados en carrito de compras.<br> ¿Desea salir? <br>", "Carrito de compras", function (a) {
            if (a == "Aceptar") {
                window.parent.EsVerificaCarrito = true;
                window.parent.fnSalidaConfirmada(IdElemento);
            }
        });
    }
    else {
        window.parent.EsVerificaCarrito = true;
        window.parent.fnSalidaConfirmada(IdElemento);
    }

}

function fnalerta() {
    setTimeout(function () {
        //$(".divCreditDis").toggleClass("AlertaMonto", ale);
        //            $($(".credisp")[0]).toggleClass("AlertaMonto", ale);
        //            $($(".credisp")[1]).toggleClass("AlertaMonto", ale);

        if (ale) {
            $(".divCreditDis").addClass("AlertaMonto");
        }
        else {
            $(".divCreditDis").removeClass("AlertaMonto");
        }

        aled = !aled;

        numeroAlert = numeroAlert + 1;
        if (numeroAlert > totalNumeroAlert) {
            numeroAlert = totalNumeroAlert - totalNumeroAlert;
            aled = false;
            $(".divCreditDis").removeClass("AlertaMonto");
        }
        else {
            fnalerta();
        }
    }, 500);
}

function obtenerPlanesBase(IdProducto) {
    var planes = [];

    var btPlanesMayor = false;
    if (window.parent.CampanaConf.RenovarContratoVigente && window.parent.Habilitado == "0") {
        btPlanesMayor = window.parent.CampanaConf.SoloRenovarMontoMayor;
    }
    var idUltimoPlan = 0;
    var indexPlanBase = 0;
    if (IdProducto != undefined) {
        for (var i = 0; i < productosBase.length; i++) {
            if (productosBase[i].P_inCod == IdProducto) {
                if (window.parent.NumeroRenovar == undefined) {
                    if (productosBase[i].EsNuevo == "0") {
                        continue;
                    }
                }
                else {
                    if (window.parent.FlagMantenerPlan == "True") {
                        if (window.parent.IdPlanNumeroRenovar != productosBase[i].idPlan) {
                            continue;
                        }
                    }
                    else {
                        if (obligarMantenerPlan) {
                            if (window.parent.IdPlanNumeroRenovar == productosBase[i].idPlan) {
                                if (productosBase[i].IdPlanBase == productosBase[i].idPlan) {
                                    if (productosBase[i].idPlan_equivalente == -1) {
                                        return [new miPlan(productosBase[i].DscPlan + " (" + formatNumber.newo(productosBase[i].PrercioPlan, oCultura.Moneda.vcSimMon) + ")", productosBase[i].idPlan, productosBase[i].PrercioPlan)];
                                    }
                                    else {
                                        return [new miPlan(productosBase[i].DscPlan_equivalente + " (" + formatNumber.newo(productosBase[i].PrercioPlan_equivalente, oCultura.Moneda.vcSimMon) + ")", productosBase[i].idPlan_equivalente, productosBase[i].PrercioPlan_equivalente)];
                                    }
                                }
                            }
                            else {
                                if (productosBase[i].EsNuevo == "0") {
                                    continue;
                                }
                            }
                        }
                        else {
                            if (productosBase[i].EsNuevo == "0") {
                                continue;
                            }
                        }
                    }
                }

                if (planes.length == 0) {
                    if (btPlanesMayor) {
                        if (parseFloat(window.parent.PrecioPlanNumeroRenovar) < parseFloat(productosBase[i].PrercioPlan)) {
                            idUltimoPlan = productosBase[i].IdPlanBase;
                        } else {
                            continue;
                        }
                        for (var j = 0; j < productosBase.length; j++) {
                            if (productosBase[j].idPlan == idUltimoPlan && productosBase[j].P_inCod == productosBase[i].P_inCod) {
                                indexPlanBase = j;
                                break;
                            }
                        }

                        if (idUltimoPlan != 0) {
                            planes.push(new miPlan(productosBase[indexPlanBase].DscPlan + " (" + formatNumber.newo(productosBase[indexPlanBase].PrercioPlan, oCultura.Moneda.vcSimMon) + ")", productosBase[indexPlanBase].idPlan, productosBase[indexPlanBase].PrercioPlan));
                            idUltimoPlan = 0;
                        }

                    } else {
                        if (productosBase[i].IdPlanBase == productosBase[i].idPlan) {
                            if (productosBase[i].idPlan_equivalente == -1) {
                                planes.push(new miPlan(productosBase[i].DscPlan + " (" + formatNumber.newo(productosBase[i].PrercioPlan, oCultura.Moneda.vcSimMon) + ")", productosBase[i].idPlan, productosBase[i].PrercioPlan));
                            } else {
                                planes.push(new miPlan(productosBase[i].DscPlan_equivalente + " (" + formatNumber.newo(productosBase[i].PrercioPlan_equivalente, oCultura.Moneda.vcSimMon) + ")", productosBase[i].idPlan_equivalente, productosBase[i].PrercioPlan_equivalente));
                            }
                        }
                    }
                    continue;
                }

                var entro = false;
                for (var k = 0; k < planes.length; k++) {
                    if (productosBase[i].idPlan == planes[k].value) {
                        entro = true;
                        break;
                    }
                }
                if (entro) {
                    continue;
                }

                if (btPlanesMayor) {
                    idUltimoPlan = 0;
                    if (parseFloat(window.parent.PrecioPlanNumeroRenovar) < parseFloat(productosBase[i].PrercioPlan)) {
                        idUltimoPlan = productosBase[i].IdPlanBase;
                    }
                    for (var j = 0; j < productosBase.length; j++) {
                        if (productosBase[j].idPlan == idUltimoPlan && productosBase[j].P_inCod == productosBase[i].P_inCod) {
                            indexPlanBase = j;
                            break;
                        }
                    }
                    if (idUltimoPlan != 0) {
                        for (var y = 0; y < planes.length; y++) {
                            if (idUltimoPlan == planes[y].value) {
                                entro = true;
                                break;
                            }
                        }
                        if (entro) {
                            continue;
                        }
                        planes.push(new miPlan(productosBase[indexPlanBase].DscPlan + " (" + formatNumber.newo(productosBase[indexPlanBase].PrercioPlan, oCultura.Moneda.vcSimMon) + ")", productosBase[indexPlanBase].idPlan, productosBase[indexPlanBase].PrercioPlan));
                        idUltimoPlan = 0;
                    }
                } else {
                    if (productosBase[i].IdPlanBase == productosBase[i].idPlan) {
                        if (productosBase[i].idPlan_equivalente == -1) {
                            planes.push(new miPlan(productosBase[i].DscPlan + " (" + formatNumber.newo(productosBase[i].PrercioPlan, oCultura.Moneda.vcSimMon) + ")", productosBase[i].idPlan, productosBase[i].PrercioPlan));
                        } else {
                            planes.push(new miPlan(productosBase[i].DscPlan_equivalente + " (" + formatNumber.newo(productosBase[i].PrercioPlan_equivalente, oCultura.Moneda.vcSimMon) + ")", productosBase[i].idPlan_equivalente, productosBase[i].PrercioPlan_equivalente));
                        }
                    }
                }
            }
        }
    }
    planes.sort(function (a, b) {
        return a.precio - b.precio;
    });
    return planes;
}

function obtenerPlanesDependientes(IdProducto, IdPlanBase) {
    var planes = [];

    //Sólo monto mayor a plan actual
    var btSoloPlanMayor = false;
    if (window.parent.CampanaConf.RenovarContratoVigente && window.parent.Habilitado == "0") {
        btSoloPlanMayor = window.parent.CampanaConf.SoloRenovarMontoMayor;
    }

    //precio plan base
    var precioBase = 0;
    for (var i = 0; i < productosBase.length; i++) {
        if (productosBase[i].idPlan == IdPlanBase) {
            precioBase = parseFloat(productosBase[i].PrercioPlan);
            break;
        }
    }

    if (IdProducto != undefined) {
        for (var i = 0; i < productosBase.length; i++) {
            if (productosBase[i].ObligPlanDep == 'True' && productosBase[i].idPlan == productosBase[i].IdPlanBase) {
                //if (productosBase[i].ObligPlanDep == '1' && productosBase[i].idPlan == productosBase[i].IdPlanBase) {
                continue;
            }

            if (productosBase[i].P_inCod == IdProducto) {
                if (window.parent.NumeroRenovar == undefined) {
                    if (productosBase[i].EsNuevo == "0") {
                        continue;
                    }
                }
                else {
                    if (window.parent.FlagMantenerPlan == "True") {
                        if (window.parent.IdPlanNumeroRenovar != productosBase[i].idPlan) {
                            continue;
                        }
                    }
                    else {
                        if (obligarMantenerPlan) {
                            if (window.parent.IdPlanNumeroRenovar == productosBase[i].idPlan) {
                                if (productosBase[i].IdPlanBase == IdPlanBase) {
                                    if (productosBase[i].idPlan_equivalente == -1) {
                                        return [new miPlan(productosBase[i].NombreCorto + " (" + formatNumber.newo(productosBase[i].PrercioPlan, oCultura.Moneda.vcSimMon) + ")", productosBase[i].idPlan, productosBase[i].PrercioPlan)];
                                    }
                                    else {
                                        return [new miPlan(productosBase[i].DscPlan_equivalente + " (" + formatNumber.newo(productosBase[i].PrercioPlan_equivalente, oCultura.Moneda.vcSimMon) + ")", productosBase[i].idPlan_equivalente, productosBase[i].PrercioPlan_equivalente)];
                                    }
                                }
                            }
                            else {
                                if (productosBase[i].EsNuevo == "0") {
                                    continue;
                                }
                            }

                        }
                        else {
                            if (productosBase[i].EsNuevo == "0") {
                                continue;
                            }
                        }
                    }
                }

                if (planes.length == 0) {
                    if (productosBase[i].IdPlanBase == IdPlanBase) {
                        if (productosBase[i].idPlan_equivalente == -1) {
                            //planes.push(new miPlan(productosBase[i].NombreCorto + " (+ " + formatNumber.newo(parseFloat(productosBase[i].PrercioPlan) - precioBase, oCultura.Moneda.vcSimMon) + ")", productosBase[i].idPlan, productosBase[i].PrercioPlan));
                            if (btSoloPlanMayor) {
                                if (parseFloat(window.parent.PrecioPlanNumeroRenovar) < parseFloat(productosBase[i].PrercioPlan)) {
                                    planes.push(new miPlan(productosBase[i].NombreCorto + " (+ " + formatNumber.newo(parseFloat(productosBase[i].PrercioPlan) - precioBase, oCultura.Moneda.vcSimMon) + ")", productosBase[i].idPlan, productosBase[i].PrercioPlan));
                                }
                            } else {
                                planes.push(new miPlan(productosBase[i].NombreCorto + " (+ " + formatNumber.newo(parseFloat(productosBase[i].PrercioPlan) - precioBase, oCultura.Moneda.vcSimMon) + ")", productosBase[i].idPlan, productosBase[i].PrercioPlan));
                            }
                        }
                        else {
                            planes.push(new miPlan(productosBase[i].DscPlan_equivalente + " (" + formatNumber.newo(productosBase[i].PrercioPlan_equivalente, oCultura.Moneda.vcSimMon) + ")", productosBase[i].idPlan_equivalente, productosBase[i].PrercioPlan_equivalente));
                        }
                    }
                    continue;
                }

                var entro = false;
                for (var k = 0; k < planes.length; k++) {
                    if (productosBase[i].idPlan == planes[k].value) {
                        entro = true;
                        break;
                    }
                }
                if (entro) {
                    continue;
                }

                if (productosBase[i].IdPlanBase == IdPlanBase) {
                    if (productosBase[i].idPlan_equivalente == -1) {
                        //planes.push(new miPlan(productosBase[i].NombreCorto + " (+ " + formatNumber.newo(parseFloat(productosBase[i].PrercioPlan) - precioBase, oCultura.Moneda.vcSimMon) + ")", productosBase[i].idPlan, productosBase[i].PrercioPlan));
                        if (btSoloPlanMayor) {
                            if (parseFloat(window.parent.PrecioPlanNumeroRenovar) < parseFloat(productosBase[i].PrercioPlan)) {
                                planes.push(new miPlan(productosBase[i].NombreCorto + " (+ " + formatNumber.newo(parseFloat(productosBase[i].PrercioPlan) - precioBase, oCultura.Moneda.vcSimMon) + ")", productosBase[i].idPlan, productosBase[i].PrercioPlan));
                            }
                        } else {
                            planes.push(new miPlan(productosBase[i].NombreCorto + " (+ " + formatNumber.newo(parseFloat(productosBase[i].PrercioPlan) - precioBase, oCultura.Moneda.vcSimMon) + ")", productosBase[i].idPlan, productosBase[i].PrercioPlan));
                        }
                    }
                    else {
                        planes.push(new miPlan(productosBase[i].DscPlan_equivalente + " (" + formatNumber.newo(productosBase[i].PrercioPlan_equivalente, oCultura.Moneda.vcSimMon) + ")", productosBase[i].idPlan_equivalente, productosBase[i].PrercioPlan_equivalente));
                    }
                }
            }
        }
    }

    if (planes.length == 0) {
        planes.push(new miPlan("Ninguno (" + formatNumber.newo(0, oCultura.Moneda.vcSimMon) + ")", IdPlanBase, precioBase));
    }
    return planes;
}

function obtenerPlanBase(IdPlanDependiente) {
    var planeBase = 0;

    if (IdPlanDependiente != undefined) {
        for (var i = 0; i < productosBase.length; i++) {
            if (productosBase[i].idPlan == IdPlanDependiente) {
                planeBase = productosBase[i].IdPlanBase;
                return planeBase;
            }
        }
    }
}

function obtenerPrecioSegunCredito(IdProducto) {

    var btPlanesMayor = false;
    if (window.parent.CampanaConf.RenovarContratoVigente && window.parent.Habilitado == "0") {
        btPlanesMayor = window.parent.CampanaConf.SoloRenovarMontoMayor;
    }

    var precioPlan;
    var id;
    var meses;
    var precioEquipo;
    var cuotaMensualEquipo;
    for (var i = 0; i < productosBase.length; i++) {
        if (productosBase[i].P_inCod == IdProducto) {
            if (btPlanesMayor) {
                if (parseFloat(window.parent.PrecioPlanNumeroRenovar) >= parseFloat(productosBase[i].PrercioPlan)) {
                    continue;
                }
            }
            if (precioPlan == undefined) {
                if (productosBase[i].ObligPlanDep == 'False' || productosBase[i].planUnico == '1' || (productosBase[i].ObligPlanDep == 'True' && productosBase[i].idPlan != productosBase[i].IdPlanBase)) {
                    //cuotaMensualEquipo = productosBase[i].Precio / (productosBase[i].IdGama == 9 ? MesesFinanciamientoChip : MesesFinanciamientoEquipo);
                    cuotaMensualEquipo = productosBase[i].Precio / (productosBase[i].IdGama == 9 ? MesesFinanciamientoChip : (productosBase[i].Precio <= MontoMinimo ? 1 : MesesFinanciamientoEquipo));
                    if (indicadoresVariante[0]["Disponible"] >= cuotaMensualEquipo && indicadoresVariante[1]["Disponible"] >= productosBase[i].PrercioPlan) {
                        precioPlan = productosBase[i].PrercioPlan;
                        id = productosBase[i].idPlan;
                        meses = productosBase[i].MesesContrato;
                        //meses = (productosBase[i].Precio <= MontoMinimo ? 1 : productosBase[i].MesesContrato);
                        precioEquipo = productosBase[i].Precio;
                        break;
                    }
                }
            }
        }
    }
    //si no se encuentra coincidencia de precios con créditos se asignan valores altos
    if (precioPlan == undefined) {
        precioPlan = 100000;
        id = 0;
        meses = 1;
        precioEquipo = 100000;
    }
    return precioPlan + "|" + id + "|" + meses + "|" + precioEquipo;
}

function obtenerPrecioSegunPlanBase(IdProducto, IdPlanBase, indexEquipo) {
    var precioPlan, id, meses, precioEquipo, cuotaMensualEquipo, cuotaMensualEquipoAnterior;
    for (var i = 0; i < productosBase.length; i++) {
        if (productosBase[i].P_inCod == IdProducto && productosBase[i].IdPlanBase == IdPlanBase) {
            if (precioPlan == undefined) {
                if (SoloPlanMayor) {
                    if (parseFloat(productosBase[i].PrercioPlan) <= parseFloat(window.parent.PrecioPlanNumeroRenovar)) {
                        continue;
                    }
                }
                if (productosBase[i].ObligPlanDep == 'False' || productosBase[i].planUnico == '1' || (productosBase[i].ObligPlanDep == 'True' && productosBase[i].idPlan != productosBase[i].IdPlanBase)) {
                    cuotaMensualEquipo = productosBase[i].Precio / (productosBase[i].IdGama == 9 ? MesesFinanciamientoChip : MesesFinanciamientoEquipo);
                    //cuotaMensualEquipo = productosBase[i].Precio / (productosBase[i].IdGama == 9 ? MesesFinanciamientoChip : (productosBase[i].Precio <= MontoMinimo ? 1 : MesesFinanciamientoEquipo));
                    cuotaMensualEquipoAnterior = arregloSeleccion[indexEquipo].Precio / (productosBase[i].IdGama == 9 ? MesesFinanciamientoChip : MesesFinanciamientoEquipo);
                    //cuotaMensualEquipoAnterior = arregloSeleccion[indexEquipo].Precio / (productosBase[i].IdGama == 9 ? MesesFinanciamientoChip : (productosBase[i].Precio <= MontoMinimo ? 1 : MesesFinanciamientoEquipo));
                    if ((indicadoresVariante[0]["Disponible"] + cuotaMensualEquipoAnterior) >= cuotaMensualEquipo && indicadoresVariante[1]["Disponible"] >= productosBase[i].PrercioPlan) {
                        precioPlan = productosBase[i].PrercioPlan;
                        id = productosBase[i].idPlan;
                        meses = productosBase[i].MesesContrato;
                        //meses = (productosBase[i].Precio <= MontoMinimo ? 1 : productosBase[i].MesesContrato);
                        precioEquipo = productosBase[i].Precio;
                        break;
                    }
                }
            }
        }
    }
    if (precioPlan == undefined) {
        precioPlan = 100000;
        id = 0;
        meses = 1;
        precioEquipo = 100000;
    }
    return precioPlan + "|" + id + "|" + meses + "|" + precioEquipo;
}

//agreagdo 13-11-2015 wapumayta
function fnDetectarPedidoCanceladoXStock(ListaPedidos) {
    var Mensaje = 'No se adquirió por límite de stock, lo siguiente:';
    var existe = false;
    for (var i = 0; i < ListaPedidos.length; i++) {
        if (ListaPedidos[i].Idestado == '60') {
            existe = true;
            Mensaje = Mensaje + '\n\t - ' + ListaPedidos[i].Equipo;
        }
    }
    if (existe) {
        alert(Mensaje);
    }
}



function obtenerFinanciamientoVariable(IdPlan,IdProducto) {
    var FinanciamientoVariable = [];



    if (IdProducto != undefined) {
        for (var i = 0; i < productosBase.length; i++) {
            //if (productosBase[i].ObligPlanDep == 'True' && productosBase[i].idPlan == productosBase[i].IdPlanBase) {
           
            //    continue;
            //}

            if (productosBase[i].P_inCod == IdProducto && productosBase[i].IdPlanBase == IdPlan) {
                if (2 == 1) {
                    continue;
                }                

                if (productosBase[i].FinanciamientoVariable.length == 0) {              
                    continue;
                }

                var listaFinanciamiento = productosBase[i].FinanciamientoVariable;
                
           
                for (var k = 0; k < listaFinanciamiento.length; k++) {

                    var preciofinanciado = (parseFloat(listaFinanciamiento[k].Precio) / listaFinanciamiento[k].Cuotas);

                    FinanciamientoVariable.push(new miFinanciamientoVariable(listaFinanciamiento[k].Descripcion, listaFinanciamiento[k].IdFinanciamiento, preciofinanciado, listaFinanciamiento[k].Cuotas));

                }                       

            }

        }
    }

    if (FinanciamientoVariable.length == 0) {
        FinanciamientoVariable.push(new miFinanciamientoVariable("Ninguno (" + formatNumber.newo(0, oCultura.Moneda.vcSimMon) + ")", IdProducto, precioBase,0));
    }
    return FinanciamientoVariable;
}


function obtenerPrecioFinanciamientoVariable(IdProducto, IdFinanciamiento, IdPlan, Meses) {
   
    //if (IdProducto != undefined) {
    //    for (var i = 0; i < productosBase.length; i++) {
     
    //        if (productosBase[i].P_inCod == IdProducto && productosBase[i].IdPlanBase == IdPlan) {               

    //            if (productosBase[i].FinanciamientoVariable.length == 0) {
    //                continue;
    //            }
    //            var listaFinanciamiento = productosBase[i].FinanciamientoVariable;


    //            for (var k = 0; k < listaFinanciamiento.length; k++) {

    //                if (listaFinanciamiento[k].IdFinanciamiento == IdFinanciamiento && listaFinanciamiento[k].IdPlan == IdPlan) {

    //                    return listaFinanciamiento[k].Precio
    //                }                   

    //            }

    //        }

    //    }
    //}

    if (IdProducto != undefined) {

        for (var i = 0; i < productosBase.length; i++) {

            if (productosBase[i].P_inCod == IdProducto && productosBase[i].idPlan == IdPlan) {

                if (productosBase[i].FinanciamientoVariable.length == 0) {
                    continue;
                }
                var listaFinanciamiento = productosBase[i].FinanciamientoVariable;

                for (var k = 0; k < listaFinanciamiento.length; k++) {

                    if (listaFinanciamiento[k].IdFinanciamiento == IdFinanciamiento && listaFinanciamiento[k].IdPlan == IdPlan) {

                        var CuotaFinanciamiento = listaFinanciamiento[k].Cuotas;
                        return listaFinanciamiento[k].Precio / CuotaFinanciamiento;
                        //return listaFinanciamiento[k].Precio;
                    }
                }
             

            }
        }

        for (var i = 0; i < productosBase.length; i++) {

            if (productosBase[i].P_inCod == IdProducto && productosBase[i].MesesContrato == Meses && productosBase[i].idPlan_equivalente == IdPlan) {

                if (productosBase[i].FinanciamientoVariable.length == 0) {
                    continue;
                }
                var listaFinanciamiento = productosBase[i].FinanciamientoVariable;

                for (var k = 0; k < listaFinanciamiento.length; k++) {

                    if (listaFinanciamiento[k].IdFinanciamiento == IdFinanciamiento && listaFinanciamiento[k].IdPlan == IdPlan) {

                        var CuotaFinanciamiento = listaFinanciamiento[k].Cuotas;
                        return listaFinanciamiento[k].Precio / CuotaFinanciamiento;
                        //return listaFinanciamiento[k].Precio;
                    }
                }
            }
        }



        for (var i = 0; i < productosBase.length; i++) {

            if (productosBase[i].P_inCod == IdProducto && productosBase[i].idPlan == IdPlan) {

                if (productosBase[i].FinanciamientoVariable.length == 0) {
                    continue;
                }
                var listaFinanciamiento = productosBase[i].FinanciamientoVariable;

                for (var k = 0; k < listaFinanciamiento.length; k++) {

                    if (listaFinanciamiento[k].IdPlan == IdPlan) {

                        var CuotaFinanciamiento = listaFinanciamiento[k].Cuotas;
                        return listaFinanciamiento[k].Precio / CuotaFinanciamiento;
                        //return listaFinanciamiento[k].Precio;
                    }
                }


            }
        }
        


    }
    

}

function obtenerCuotaFinanciamientoVariable(IdProducto, IdFinanciamiento, IdPlan, Meses) {

    
    if (IdProducto != undefined) {

        for (var i = 0; i < productosBase.length; i++) {

            if (productosBase[i].P_inCod == IdProducto &&  productosBase[i].idPlan == IdPlan) {

                if (productosBase[i].FinanciamientoVariable.length == 0) {
                    continue;
                }
                var listaFinanciamiento = productosBase[i].FinanciamientoVariable;

                for (var k = 0; k < listaFinanciamiento.length; k++) {

                    if (listaFinanciamiento[k].IdFinanciamiento == IdFinanciamiento && listaFinanciamiento[k].IdPlan == IdPlan) {

                        return listaFinanciamiento[k].Cuotas;
                    }
                }

            }
        }

        for (var i = 0; i < productosBase.length; i++) {

            if (productosBase[i].P_inCod == IdProducto && productosBase[i].idPlan_equivalente == IdPlan) {

                if (productosBase[i].FinanciamientoVariable.length == 0) {
                    continue;
                }
                var listaFinanciamiento = productosBase[i].FinanciamientoVariable;

                for (var k = 0; k < listaFinanciamiento.length; k++) {

                    if (listaFinanciamiento[k].IdFinanciamiento == IdFinanciamiento && listaFinanciamiento[k].IdPlan == IdPlan) {
   
                        return listaFinanciamiento[k].Cuotas;
                    }
                }
            }
        }

        for (var i = 0; i < productosBase.length; i++) {

            if (productosBase[i].P_inCod == IdProducto && productosBase[i].idPlan == IdPlan) {

                if (productosBase[i].FinanciamientoVariable.length == 0) {
                    continue;
                }
                var listaFinanciamiento = productosBase[i].FinanciamientoVariable;

                for (var k = 0; k < listaFinanciamiento.length; k++) {

                    if (listaFinanciamiento[k].IdPlan == IdPlan) {
                        return listaFinanciamiento[0].Cuotas;
                    }
                }
            }
        }


    }


}

