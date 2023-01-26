/// <reference path="../Common/Scripts/jquery-2.0.0-vsdoc.js" />
var check;
var ale = true;
var mensajeAle = true;
var altoPagina = 0;
var FechaHoraInicioCampana = null;
var FechaHoraFinCampana = null;
var FechaHoraInicioReserva = null;
var CampanaActiva = false;
var CreditoUsuario_dash;
var vNombreOperadorSeleccionado;
var oCultura = null;
var RenovarContratoVigente = false;
$(function () {
    oCultura = window.parent.oCulturaUsuario;

    if (window.parent.UsuarioConectado != $("#hfUsuario").val()) {
        window.location.href = '../Login.aspx';
        return;
    }

    window.parent.IdTipoFinanciamiento = undefined;
    window.parent.miIdTipoModeloDispositivo = undefined;
    $("#pBotonesPedido").hide();

    if (window.parent.ValidarPorNodeJS == true) {
        window.parent.$("#dvNuevoPedido").hide();
    }

    $("#dvMsgAlerta").css("width", "200px");
  
    $("#GuardarMisLineas").button();


    altoPagina = $(window).height();



    $("#btnCancelarDialog").click(function () {
        var dialog1 = $("#DialogoPlan").data("kendoWindow");
        dialog1.close();
    });
    

    $("#btnAceptarDialog").click(function () {

        var chk = $("#rbtnMantenerPlan").attr("checked");

        if (chk == "checked") {
            window.parent.FlagMantenerPlan = "True";
        }
        else {
            window.parent.FlagMantenerPlan = "False";
        }

        var dialog1 = $("#DialogoPlan").data("kendoWindow");
        dialog1.close();

        if ($.browser.msie && $.browser.version == "6.0") {
            document.location.href = "CarritoIE.aspx?irCarrito=1&esConEquipo=1";
        }
        else {
            document.location.href = "Pedido.aspx?irCarrito=1&esConEquipo=1";
        }
    });

   
    $("#btnRenovar").click(function () {
        var check = $(".chkSelectLinea:checked");

        if (check.length == 0) {
            alerta("Seleccione el número a renovar");
            return;
        }
        var XML = '<?xml version="1.0" encoding="iso-8859-1"?><TABLE>';
        var i = 0;
        for (i; i < check.length; i++) {

            var numelegido = $(check[i]).attr("id").toString().split('-')[1];

            if ($.trim($("#spanEstado-" + numelegido).text()) == "Activo") {
                XML = XML + '<PEDIDO><NUMERO>' + numelegido +
                '</NUMERO></PEDIDO>';
            }
            else {

                alerta("No se puede renovar un número ya enviado a proceso");
                return;
            }
        }
        XML = XML + '</TABLE>';
        confirma("¿Esta seguro de Renovar la línea seleccionada?", "Compra de productos", function (a) {
            if (a == "Aceptar") {


                BloquearPagina(true);
                $("#pBotonesPedido").hide();
                $.ajax({
                    type: "POST",
                    url: "Dashboard_pedido.aspx/registrarBajaRenovar",
                    data: "{'prIdEmpleado': '" + $("#hdfEmpleado").val() + "'," +
                        "'pIdCampana': '" + $("#hdfCampanaActiva").val() + "'," +
                        "'pAccion': '" + "Renovacion" + "'," +
                        "'pXmlNumero': '" + XML + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (resultado) {

                        //BloquearPagina(false);
                        //$("#pBotonesPedido").show();
                        //alerta("Su petición a sido enviada");

                        //                    for (var i = 0; i < check.length; i++) {
                        //                        $("#spanEstado-" + check[i].id.split('-')[1]).text('Enviado');
                        //                    }

                        if (resultado.d != 'OK') {
                            alerta(resultado.d);
                            window.location.href = "Dashboard_pedido.aspx";
                        }
                        else {
                            window.location.href = "Dashboard_pedido.aspx";
                        }


                    },
                    error: function (xhr, err, thrErr) {
                        window.location.href = "Dashboard_pedido.aspx";
                        //MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            }
        });
    });

    $("#btnBaja").click(function () {
        if (!window.parent.CampanaConf.BajaProducto) {
            alerta("Usted está intentando realizar una acción no permitida.");
            return;
        }
        check = $(".chkSelectLinea:checked");

        if (check.length == 0) {

            alerta("Seleccione el número a Dar de Baja");
            return;
        }
        var XML = '<?xml version="1.0" encoding="iso-8859-1"?><TABLE>';
        var i = 0;
        for (i; i < check.length; i++) {

            var numelegido = $(check[i]).attr("id").toString().split('-')[1];

            if (!fnValidarOperadorDeNumero(numelegido)) {
                alerta("Debe seleccionar los números del operador elegido.");
                return;
            }

            if ($.trim($("#spanEstado-" + numelegido).text()) == "Activo") {
                XML = XML + '<PEDIDO><NUMERO>' + numelegido +
                '</NUMERO></PEDIDO>';
            }
            else {

                alerta("No se puede Dar de Baja a un número ya enviado a proceso");
                return;
            }

            if (window.parent.CampanaConf.RenovarContratoVigente) {
                var vFechaActual = new Date($("#hdfFecServidor").val().substring(0, 4), $("#hdfFecServidor").val().substring(4, 6) - 1, $("#hdfFecServidor").val().substring(6, 8));
                var finContratoLinea = $("#spanFechaFinContrato-" + numelegido).text();
                var dafinContrato = new Date(finContratoLinea.split("-")[0], finContratoLinea.split("-")[1] - 1, finContratoLinea.split("-")[2]);
                if (dafinContrato > vFechaActual) {
                    alerta("La línea " + numelegido + " no puede Dar de Baja debido a que tiene contrato vigente.");
                    return;
                }
            }
        }
        XML = XML + '</TABLE>';

        confirma("¿Esta seguro de Dar de baja la línea seleccionada?", "Baja de línea", function (a) {
            if (a == "Aceptar") {

                BloquearPagina(true);
                $("#pBotonesPedido").hide();

                $.ajax({
                    type: "POST",
                    url: "Dashboard_pedido.aspx/registrarBajaRenovar",
                    data: "{'prIdEmpleado': '" + $("#hdfEmpleado").val() + "'," +
                    "'pIdCampana': '" + $("#hdfCampanaActiva").val() + "'," +
                    "'pAccion': '" + "Baja" + "'," +
                    "'pXmlNumero': '" + XML + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (resultado) {

                        if (resultado.d != 'OK') {
                            alerta(resultado.d);
                            window.location.href = "Dashboard_pedido.aspx";
                        }
                        else {
                            alerta("Su petición a sido enviada");
                            var i = 0;
                            for (i; i < check.length; i++) {
                                $("#spanEstado-" + check[i].id.split('-')[1]).text('Enviado');

                                $(check[i]).attr("disabled", "disabled");
                                $(check[i]).removeAttr("checked");
                                $($(check[i]).parent().parent()).removeClass("fila-a");
                                $($(check[i]).parent().parent()).addClass("fila-a-dsbl");
                            }
                            BloquearPagina(false);
                            $("#pBotonesPedido").show();
                        }
                    },
                    error: function (xhr, err, thrErr) {
                        window.location.href = "Dashboard_pedido.aspx";
                       
                    }
                });

            }
        });

    });


    $("#divAlerta").click(function () {
       

        if (mensajeAle) {
            $("#alertas").fadeIn(300);
        } else {
            $("#alertas").fadeOut(300);
        }

        mensajeAle = !mensajeAle;
 
    });


    $(".mensajenuevo").live("click", function () {
        var strID = $(this).attr('id');
        strID = strID.replace('msj_', '');
        document.location.href = '../Incidencia/Incidencia.aspx?Tipo=NuevoMensaje&ID=' + strID;
    });


    $(".mensajenuevo").live("mouseover", function () {
        document.title = ObtieneFechaActual();
      
        $(this).css({ "background-color": "#DAECF4" });
    });
    $(".mensajenuevo").live("mouseout", function () {
        document.title = ObtieneFechaActual();
        $(this).css({ "background-color": "#F7F7F7" });
    });

    fnObtenerMensajesNoLeidos();

    $(window).resize(function () {
        DimPosElementos();
    });

 

    if ($.browser.msie && $.browser.version == "6.0") {
        $("#pBotonesPedido > div").removeClass("k-button");

        $('#pBotonesPedido > div').hover(function () {
            $(this).css({ "background-color": "skyblue", "cursor": "pointer" });
        }, function () {
            $(this).css({ "background-color": "#E2F0F6", "cursor": "default" });
        });

        window.parent.fnEliminarFondoPrincipal();

    }

    var AltoGrilla = 0;
    if ($.browser.msie && $.browser.version == "6.0") {
        AltoGrilla = $(window).height() - 310;
    } else {
        AltoGrilla = $(window).height() - 290;
    }
    if ($.browser.msie && $.browser.version == "6.0") {
        if (AltoGrilla <= 15) {
            AltoGrilla = 15;
        }
    } else {
        if (AltoGrilla <= 160) {
            AltoGrilla = 160;
        }
    }

    $("#pDetLin").kendoGrid({
        autoBind: true,
        dataSource: {},
        groupable: false,
        sortable: true,
        navigatable: true,

        columns: [
            { field: "Selec", width: "41px", title: "Selec.", hidden: false, sortable: false },
            { field: "Linea", width: "75px", title: "Línea", hidden: false },
            { field: "Equipo", width: "150px", title: "Equipo", hidden: false },
            { field: "Plan", width: "180px", title: "Servicios actuales", hidden: false },
            { field: "Campana", width: "90px", title: "Campaña", hidden: false, sortable: false },
            { field: "Estado", width: "70px", title: "Estado", hidden: false, sortable: false },
            { field: "CostoPlan", width: "70px", title: "Costo Plan", hidden: false, sortable: false }
        ],

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
        
        rowTemplate: kendo.template($("#rowTemplate").html()),
        dataBound: onDataBound,
        height: AltoGrilla
    });
   
    fnConfiguracionMultiCampana();

    $(".btnCambiarCampana").live("click", function () {
        fnMostrarPanelSelecionCampana();
    });
    $("#dvClose").live("click", function () {
        fnOcultarPanelSelecionCampana();
    });
    $(".dvSelectCamp").live("click", function () {
        var campanaSelect = $(this).attr("id").split("-")[1];

        if (window.parent.CampanaConf != null || window.parent.CampanaConf != undefined) {
            if (window.parent.CampanaConf.IdCampana == campanaSelect) {
                fnOcultarPanelSelecionCampana();
            } else {
                fnCargarDatosCampana(campanaSelect);
            }
        } else {
            fnCargarDatosCampana(campanaSelect);
        }
    });


    $("#lnkPortabilidadClaro").click(function () {

        var dialogPortabilidad = $("#DialogoPortabilidad");
        var dialogPortabilidad1;

        $("#txtNumContacto").val("");

        if (!dialogPortabilidad.data("kendoWindow")) {
            dialogPortabilidad1 = dialogPortabilidad.kendoWindow({
                width: "370px",
                height: "220px",
                title: "Portabilidad de línea",
                actions: ["Close"],
                visible: false,
                modal: true
            }).data("kendoWindow");
        } else {
            dialogPortabilidad1 = dialogPortabilidad.data("kendoWindow");
           
        }

        dialogPortabilidad1.center();
        dialogPortabilidad1.open();
        $(".k-window").css({ "-webkit-transform": "" });

    });

    $("#txtNumContacto").on("keypress keyup blur", function (event) {
        $(this).val($(this).val().replace(/[^\d].+/, ""));
        if ((event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });

    $("#btnCancelarDialogPortabilidad").click(function () {
        var dialog1 = $("#DialogoPortabilidad").data("kendoWindow");
        dialog1.close();
    });


    $("#btnAceptarPortabilidad").click(function () {

        var Nombre = $("#lblNombre1").html();
        var Correo = $("#lblCorreo1").html();
        var Numero = $("#txtNumContacto").val();



        if (Numero == "" || Numero.length < 9 || Numero.length > 9) {
            alerta('El número a contactar debe ser de 9 caracteres.');
            return;
        }
        else {

            $.ajax({
                type: "POST",
                url: "Dashboard_pedido.aspx/registraNumeroPortabilidad",
                data: "{'prIdEmpleado': '" + $("#hdfEmpleado").val() + "'," +
                    "'prNombre': '" + Nombre + "'," +
                    "'prCorreo': '" + Correo + "'," +
                    "'prNumero': '" + Numero + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (resultado) {



                    if (resultado.d != 'OK') {
                        alerta('El numero a contactar ya se encuentra a la espera de ser atendido.');
                    }
                    else {
                        alerta('Datos registrados correctamente.');
                        var dialog1 = $("#DialogoPortabilidad").data("kendoWindow");
                        dialog1.close();
                    }



                },
                error: function (xhr, err, thrErr) {
                    window.location.href = "Dashboard_pedido.aspx";
                   
                }
            });


        }


    });





  
});

function DimPosElementos() {
    try {
        resizeGrid();
    } catch (e) {
       
    }
}

function resizeGrid() {

    var AltoGrilla = 0;
 
    if ($.browser.msie && $.browser.version == "6.0") {
        AltoGrilla = $(window).height() - 310;
    } else {
        AltoGrilla = $(window).height() - 290;
    }

    if ($.browser.msie && $.browser.version == "6.0") {
        if (AltoGrilla <= 15) {
            AltoGrilla = 15;
        }
    } else {
        if (AltoGrilla <= 160) {
            AltoGrilla = 160;
        }
    }

    $(".k-grid").css("height", AltoGrilla);
    $(".k-grid-content").css("height", "83%");
}

function load() {

    mostrarProductoCreditoAsignado();
    ListarByEmpleadoFamily();


    $("#spFecha").html(ObtieneFechaActual());

    $("#btnNuevoPedido").click(function () {
        if (!window.parent.CampanaConf.NuevoProducto) {
            alerta("Usted está intentando realizar una acción no permitida.");
            return;
        }
        window.parent.NumeroRenovar = undefined;
        window.parent.IdPlanNumeroRenovar = undefined;
        window.parent.FlagMantenerPlan = undefined;
        window.parent.PrecioPlanNumeroRenovar = undefined;
        window.parent.FechaFinContrato = undefined;
        window.parent.Habilitado = undefined;

        if ($.browser.msie && $.browser.version == "6.0") {
            document.location.href = "CarritoIE.aspx?irCarrito=1&esConEquipo=0";
        } else {
            document.location.href = "Pedido.aspx?irCarrito=1&esConEquipo=0&IdCampana=" + window.parent.CampanaConf.IdCampana.toString();
        }
    });

    $("#btnRenovarConEquipo").click(function () {
        var check = $(".chkSelectLinea:checked");
        if (check.length == 0) {
            alerta("Seleccione el número a renovar con equipo");
            return;
        }

        if (check.length > 1) {
            alerta("Sólo puede seleccionar un número al renovar con equipo");
            return;
        }

        var numelegido = $(check[0]).attr("id").toString().split('-')[1];

   
        if (!fnValidarOperadorDeNumero(numelegido)) {
           
            alerta('La línea <b>' + numelegido + '</b> no pertenece al operador <b>' + vNombreOperadorSeleccionado + '</b>.<ul style="padding-left: 20px;"><li>Si desea adquirir un nuevo equipo del operador <b>' + vNombreOperadorSeleccionado + '</b> para esta línea seleccione la opción <b>"Portabilidad"</b>.</li><li>Si desea adquirir un nuevo equipo del mismo operador de la línea, cambie al operador de la línea.</li></ul>');
            return;
        }

        if ($.trim($("#spanIdTipoModeloDispositivo-" + miNumeroRenovar).text()) == "60") {
            alerta("Esta línea no puede renovar con equipo.");
            return;
        }

        if (window.parent.CampanaConf.RenovarContratoVigente) {
            if (!ValidarFechaContrato(numelegido)) {
                alerta("Esta línea no puede renovar debido a que tiene contrato vigente.");
                return;
            }
        }

        if ($.trim($("#spanEstado-" + numelegido).text()) != "Activo") {
            alerta("No se puede renovar un número ya enviado a proceso");
            return;
        }

        if (!window.parent.CampanaConf.RenovarContratoVigente) {
            if ($.trim($("#spanRenuevaConEquipo-" + numelegido).text()) == "False" && $.trim($("#spanIdTipoModeloDispositivo-" + numelegido).text()) == "2") {
                alerta("Este número no esta habilitado para renovación con equipo");
                return;
            }
        } else {
        }

        var miNumeroRenovar;
        var miIdPlanRenovar;
        var miFlagMantienePlan;
        var miPrecioPlanNumeroRenovar;
        var TipoServicio;
        var IdTipoModeloDispositivo;

        miNumeroRenovar = numelegido;
        miIdPlanRenovar = $.trim($("#spanIdplan-" + miNumeroRenovar).text());
        miFlagMantienePlan = $.trim($("#FlagMantienePlan-" + miNumeroRenovar).text());
        miPrecioPlanNumeroRenovar = $.trim($("#spanPrecioPlan-" + miNumeroRenovar).text());
        TipoServicio = $.trim($("#spanTipoServicio-" + miNumeroRenovar).text());
        IdTipoModeloDispositivo = $.trim($("#spanIdTipoModeloDispositivo-" + miNumeroRenovar).text());

        if (window.parent.CampanaConf.RenovarContratoVigente) {
            if ($.trim($("#spanConEquipo-" + numelegido).text()) == "0" && IdTipoModeloDispositivo == "4") {
                IdTipoModeloDispositivo = "";
            }
        }

        if (miPrecioPlanNumeroRenovar == "" || miPrecioPlanNumeroRenovar == undefined) {
            alerta("Linea no tiene asignado plan ni precio del plan para realizar calculos necesarios");
            window.parent.NumeroRenovar = undefined;
            window.parent.IdPlanNumeroRenovar = undefined;
            window.parent.FlagMantenerPlan = undefined;
            window.parent.PrecioPlanNumeroRenovar = undefined;
            window.parent.miIdTipoModeloDispositivo = undefined;
            window.parent.FechaFinContrato = undefined;
            window.parent.Habilitado = undefined;
            return;
        }

        window.parent.btnPortabilidad = false;
        window.parent.NumeroRenovar = miNumeroRenovar;
        window.parent.IdPlanNumeroRenovar = miIdPlanRenovar;
        window.parent.FlagMantenerPlan = miFlagMantienePlan;
        window.parent.PrecioPlanNumeroRenovar = miPrecioPlanNumeroRenovar;
        window.parent.miIdTipoModeloDispositivo = IdTipoModeloDispositivo;
        window.parent.FechaFinContrato = $.trim($("#spanFechaFinContrato-" + miNumeroRenovar).text());
        window.parent.Habilitado = $.trim($("#spanHabilitado-" + miNumeroRenovar).text());

        if (miFlagMantienePlan == "True") {

            var dialog = $("#DialogoPlan");
            var dialog1;

            if (!dialog.data("kendoWindow")) {
                dialog1 = dialog.kendoWindow({
                    width: "400px",
                    height: "220px",
                    title: "Renovar equipo",
                    actions: ["Close"],
                    visible: false,
                    modal: true
                }).data("kendoWindow");
            } else {
                dialog1 = dialog.data("kendoWindow");
                $("#rbtnMantenerPlan").attr("checked", "checked");
            }

            dialog1.center();
            dialog1.open();
            $(".k-window").css({ "-webkit-transform": "" });
        }
        else {
            if ($.browser.msie && $.browser.version == "6.0") {
                document.location.href = "CarritoIE.aspx?irCarrito=1&esConEquipo=1";
            }
            else {
                document.location.href = "Pedido.aspx?irCarrito=1&esConEquipo=1&IdCampana=" + window.parent.CampanaConf.IdCampana.toString();
            }
        }
    });

    $("#btnRenovarPlan").click(function () {

        if (!window.parent.CampanaConf.RenovarPlan) {
            alerta("Usted está intentando realizar una acción no permitida.");
            return;
        }
        var check = $(".chkSelectLinea:checked");
        if (check.length == 0) {
            alerta("Seleccione el número a renovar con equipo");
            return;
        }

        if (check.length > 1) {
            alerta("Sólo puede seleccionar un número al renovar plan");
            return;
        }

        var numelegido = $(check[0]).attr("id").toString().split('-')[1];

        
        if (!fnValidarOperadorDeNumero(numelegido)) {
            alerta('Para continuar con esta renovación debe de realizar una "Portabilidad Plan"');
            return;
        }

        if ($.trim($("#spanEstado-" + numelegido).text()) != "Activo") {
            alerta("No se puede renovar un número ya enviado a proceso");
            return;
        }

        var miNumeroRenovar;
        var miPrecioPlanNumeroRenovar;

        miNumeroRenovar = numelegido;
        miPrecioPlanNumeroRenovar = $.trim($("#spanPrecioPlan-" + miNumeroRenovar).text());

        if (miPrecioPlanNumeroRenovar == "" || miPrecioPlanNumeroRenovar == undefined) {
            alerta("Linea no tiene asignado plan ni precio del plan para realizar calculos necesarios");
            window.parent.NumeroRenovar = undefined;
            window.parent.PrecioPlanNumeroRenovar = undefined;
            window.parent.FechaFinContrato = undefined;
            window.parent.Habilitado = undefined;
        }

        window.parent.btnPortabilidad = false;
        window.parent.NumeroRenovar = miNumeroRenovar;
        window.parent.PrecioPlanNumeroRenovar = miPrecioPlanNumeroRenovar;
        window.parent.FechaFinContrato = $.trim($("#spanFechaFinContrato-" + miNumeroRenovar).text());
        window.parent.Habilitado = $.trim($("#spanHabilitado-" + miNumeroRenovar).text());

        if ($.browser.msie && $.browser.version == "6.0") {
            document.location.href = "PedidoPlanIE.aspx?irCarrito=1&esConEquipo=1&IdCampana=" + window.parent.CampanaConf.IdCampana.toString();
        } else {
            document.location.href = "PedidoPlan.aspx?irCarrito=1&esConEquipo=1&IdCampana=" + window.parent.CampanaConf.IdCampana.toString();
        }
    });

    $("#btnPortabilidad").click(function () {
        var check = $(".chkSelectLinea:checked");
        if (check.length == 0) {
            alerta("Seleccione el número a renovar con equipo");
            return;
        }
        if (check.length > 1) {
            alerta("Sólo puede seleccionar un número al renovar con equipo");
            return;
        }
        var numelegido = $(check[0]).attr("id").toString().split('-')[1];
        if (fnValidarOperadorDeNumero(numelegido)) {
            alerta('La línea <b>' + numelegido + '</b> ya pertence al operador <b>' + vNombreOperadorSeleccionado + '</b>.<ul style="padding-left: 20px;"><li>Si desea adquirir un nuevo equipo para la línea seleccione la opción <b>"Renovar con equipo"</b></li></ul>');
            return;
        }
        if ($.trim($("#spanEstado-" + numelegido).text()) != "Activo") {
            alerta("No se puede renovar un número ya enviado a proceso");
            return;
        }
        if ($.trim($("#spanHabilitadoPortabilidad-" + numelegido).text()) != "1") {
            alerta("Esta línea no se encuentra disponible para portabilidad porque aún no ha terminado su contrato actual");
            return;
        }

        var miNumeroRenovar;
        var miIdPlanRenovar;
        var miFlagMantienePlan;
        var miPrecioPlanNumeroRenovar;
        var TipoServicio;
        var IdTipoModeloDispositivo;

        miNumeroRenovar = numelegido;
        miIdPlanRenovar = $.trim($("#spanIdplan-" + miNumeroRenovar).text());
        miFlagMantienePlan = $.trim($("#FlagMantienePlan-" + miNumeroRenovar).text());
        miPrecioPlanNumeroRenovar = $.trim($("#spanPrecioPlan-" + miNumeroRenovar).text());
        TipoServicio = $.trim($("#spanTipoServicio-" + miNumeroRenovar).text());
        IdTipoModeloDispositivo = $.trim($("#spanIdTipoModeloDispositivo-" + miNumeroRenovar).text());

        if (miPrecioPlanNumeroRenovar == "" || miPrecioPlanNumeroRenovar == undefined) {
            alerta("Linea no tiene asignado plan ni precio del plan para realizar calculos necesarios");
            window.parent.NumeroRenovar = undefined;
            window.parent.IdPlanNumeroRenovar = undefined;
            window.parent.FlagMantenerPlan = undefined;
            window.parent.PrecioPlanNumeroRenovar = undefined;
            window.parent.miIdTipoModeloDispositivo = undefined;
            window.parent.FechaFinContrato = undefined;
            window.parent.Habilitado = undefined;
            return;
        }

        window.parent.btnPortabilidad = true;
        window.parent.NumeroRenovar = miNumeroRenovar;
        window.parent.IdPlanNumeroRenovar = miIdPlanRenovar;
        window.parent.FlagMantenerPlan = miFlagMantienePlan;
        window.parent.PrecioPlanNumeroRenovar = miPrecioPlanNumeroRenovar;
        window.parent.miIdTipoModeloDispositivo = IdTipoModeloDispositivo;
        window.parent.FechaFinContrato = $.trim($("#spanFechaFinContrato-" + miNumeroRenovar).text());
        window.parent.Habilitado = $.trim($("#spanHabilitado-" + miNumeroRenovar).text());

        document.location.href = "Pedido.aspx?irCarrito=1&esConEquipo=1&IdCampana=" + window.parent.CampanaConf.IdCampana.toString();
    });
}

function ValidarFechaContrato(numelegido) {
    var vFechaActual = new Date($("#hdfFecServidor").val().substring(0, 4), $("#hdfFecServidor").val().substring(4, 6) - 1, $("#hdfFecServidor").val().substring(6, 8));
    var finContratoLinea = $("#spanFechaFinContrato-" + numelegido).text();
    var dafinContrato = new Date(finContratoLinea.split("-")[0], finContratoLinea.split("-")[1] - 1, finContratoLinea.split("-")[2]);
    if (dafinContrato <= vFechaActual) {
        return true;
    } else {
        var vConEquipo = $("#spanConEquipo-" + numelegido).text();
        if (window.parent.CampanaConf.SoloLineasContratoVencido) {
            if (vConEquipo == "1") {
                return false;
            } else {
                var fechaMaximoRenovar = new Date($("#hdfFecServidor").val().substring(0, 4), $("#hdfFecServidor").val().substring(4, 6) - 1, $("#hdfFecServidor").val().substring(6, 8));
                fechaMaximoRenovar.setMonth(fechaMaximoRenovar.getMonth() + window.parent.CampanaConf.MaximoMesesPermitido);
                if (fechaMaximoRenovar <= dafinContrato) {
                    return true;
                }
            }
        }
    }
    return true;
}

function load_Inicial() {
    CreditoUsuario_dash = window.parent.CreditoUsuario;
    fnCampanaActiva();
    load();
    fnActivarConfiguracionCampana();
}

function AbrirTab(tab, descripcion, pagina) {
    var tab1 = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;

    var Accord = window.parent.$("#" + tab1);

    var Id = "#" + tab;
    var $panel = Accord.find(Id);
    if (!$panel.length) {//En el caso que no exista el tab, lo crea
        var Titulo = descripcion;
        window.parent.pagina = pagina;
        Accord.tabs("add", Id, Titulo);
        window.parent.$(Id).css("width", "99%");
        window.parent.$(Id).css("height", "94%");
        window.parent.$(Id).css("margin-top", "0px");
        window.parent.$(Id).css("margin-left", "0px");
        window.parent.$(Id).css("margin-bottom", "0px");
        window.parent.$(Id).css("margin-right", "0px");
        window.parent.$(Id).css("padding-top", "0px");
        window.parent.$(Id).css("padding-left", "0px");
        window.parent.$(Id).css("padding-bottom", "0px");
        window.parent.$(Id).css("padding-right", "0px");
    }
    else { //En el caso que exista lo muestra
        Accord.tabs('select', Id);
    }
}

function fnDarDeBaja() {

    alerta('Se dará de baja al equipo seleccionado', 'Baja');
}

function fnRenovar() {
    confirma('Se renovará el equipo seleccionado', 'Renovación');
}

function fnAgregarMensaje(usuario, mensaje, ticket, color) {

    var _return = true;
    if ($("#msj_" + ticket).html() != null && $("#msj_" + ticket).html().length > 0) {
        _return = false;
        return _return;
    }

    var strMensajeUsuario = '';
    var strTemplateMensaje = '';
    strTemplateMensaje = '<div id="msj_' + ticket + '" class="mensajenuevo" style="width: 99%; text-align: left; overflow:auto; border-bottom:1px solid white; word-wrap: break-word;background-color:' + color + '">';
    strTemplateMensaje += '<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td colspan="2"> ';
    strTemplateMensaje += '<span  style="font-size:8pt; font-weight: bold; color: #00338D;font-family:Verdana; font-size:11px;">';
    strTemplateMensaje += '&nbsp;<u>{ticket}</u> {usuario}</span> </td></tr>';
    strTemplateMensaje += '<tr><td width="10px"></td><td><span  style="color: #626262;font-family:Verdana; font-size:11px;">';
    strTemplateMensaje += '{mensaje}' + ' </td></tr></table></div><br>';

    strMensajeUsuario = strTemplateMensaje;
    strMensajeUsuario = strMensajeUsuario.replace('{usuario}', usuario);
    strMensajeUsuario = strMensajeUsuario.replace('{ticket}', ticket);
    strMensajeUsuario = strMensajeUsuario.replace('{mensaje}', mensaje);

    $('#alertas').append(strMensajeUsuario);
    $('#divAlerta').show();
    
    $(".mensajenuevo").css({ "cursor": "pointer" });

    return _return;

}

var TotalMensajesNoLeidos = 0;
function fnObtenerMensajesNoLeidos() {
    $.ajax({
        type: "POST",
        url: "Dashboard_pedido.aspx/obtenerTicketNoLeidoPorUsuario",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            if ($(result.d).length == 0) {
                $("#alertas").hide();
                $("#divAlerta").hide();
                return;
            }

            TotalMensajesNoLeidos = $(result.d).length;
            $("#lblCantidadMensajes").text(TotalMensajesNoLeidos);
            var i = 0;
            for (i; i < $(result.d).length; i++) {
                fnAgregarMensaje(result.d[i].Usuario.vcNom, result.d[i].Asunto, result.d[i].CodigoTicket, "#F7F7F7");

                if (i > 3) {
                    fnAgregarMensaje("", "------------------------------- Ver más -------------------------------", "", "#F7F7F7");
                    break;
                }
            }

            $("#divAlerta").show();
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}


function fnActualizarNuevoMensaje(data) {
    var Usuario = data.split('|')[1];
    var Asunto = data.split('|')[2];
    var CodigoTicket = "TCK" + Right("000000000" + data.split('|')[3], 9);
    
    if (TotalMensajesNoLeidos > 5) {
        fnAgregarMensaje("", "------------------------------- Ver más -------------------------------", "", "#F7F7F7");
        return;
    }
    else {
        if (fnAgregarMensaje(Usuario, Asunto, CodigoTicket, "#F7F7F7")) {
            TotalMensajesNoLeidos += 1;
        }
    }
    $("#lblCantidadMensajes").text(TotalMensajesNoLeidos);

}


function fnValidaListaNegra(tipo) {
    $.ajax({
        type: "POST",
        url: "Dashboard_pedido.aspx/validaListaNegra",
        data: "{'prIdEmpleado': '" + $("#hdfEmpleado").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;
            if (resul == "1") {
                if (tipo == 'add') {
                    $("#pIndicadores").append('<div style="color:#E04343;font-weight:bold;" id ="dvSinCredito">Usted no puede realizar pedidos, favor de contactarse con SAE.</div>');
                }
                else {
                    $("#pIndicadores").html('<div style="color:#E04343;font-weight:bold;" id ="dvSinCredito">Usted no puede realizar pedidos, favor de contactarse con SAE.</div>');
                }
                window.parent.$("#dvNuevoPedido").hide();
                $("#btnNuevoPedido").hide();
                return;
            }

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}


function onDataBound() {
    var finContratoLinea, dafinContrato, fechaMaximoRenovar, vNoPermitirRenovacion;
    var vFecSer = $("#hdfFecServidor").val();
    var vFechaActual = new Date(vFecSer.substring(0, 4), vFecSer.substring(4, 6) - 1, vFecSer.substring(6, 8));

    if (window.parent.CampanaConf != undefined && window.parent.CampanaConf.IdCampana == "-1") {
        $(".chkSelectLinea").attr("disabled", "disabled");
    } else {
        var chks = $(".chkSelectLinea");
        var t = $(this.tbody).find("tr");
        var i = 0;
        for (i; i < chks.length; i++) {
            if ($.trim($($(chks[i]).parent().parent().find(".spanHabilitado")[0]).text()) != "1") {
                vNoPermitirRenovacion = true;
                finContratoLinea = $.trim($($(chks[i]).parent().parent().find(".spanFechaFinContrato")[0]).text());
                dafinContrato = new Date(finContratoLinea.split("-")[0], finContratoLinea.split("-")[1] - 1, finContratoLinea.split("-")[2]);
                if (dafinContrato <= vFechaActual) {
                    vNoPermitirRenovacion = false;
                } else {
                    if (window.parent.CampanaConf.RenovarContratoVigente) {  // && !window.parent.CampanaConf.SoloLineasContratoVencido) {
                        fechaMaximoRenovar = new Date(vFecSer.substring(0, 4), vFecSer.substring(4, 6) - 1, vFecSer.substring(6, 8));
                        fechaMaximoRenovar.setMonth(fechaMaximoRenovar.getMonth() + window.parent.CampanaConf.MaximoMesesPermitido);
                        if (dafinContrato < fechaMaximoRenovar) {
                            vNoPermitirRenovacion = false;
                        }
                    }
                }

                if (vNoPermitirRenovacion) {
                    $(chks[i]).attr("disabled", "disabled");
                    $(t[i]).css("opacity", "0.6");
                }
   
            }
            $($(t[i]).find("td")[6]).text(formatNumber.newo($.trim($($(t[i]).find("td")[6]).text()), oCultura.Moneda.vcSimMon));

            if ($.trim($($(t[i]).find(".spanEstado")[0]).text()) == "Asignado") {
                $($(t[i]).find(".spanEstado")[0]).text("Activo");
            }

            if ($.trim($($(t[i]).find(".spanEstado")[0]).text()) == "Baja") {
                $(chks[i]).attr("disabled", "disabled");
        
                $(t[i]).css("opacity", "0.6");
            }
        }
    }
}

function TiempoRestante(data) {

    if (FechaHoraInicioCampana != null) {
 
        var diaCampana, diaActual, diaCampanaFin;
        var mesCampana, mesActual, mesCampanaFin;
        var anioCampana, anioActual, anioCampanaFin;
        var horaCampana, horaActual, horaCampanaFin;
        var minutoCampana, minutoActual, minutoCampanaFin;
        var segundoCampana, segundoActual, segundoCampanaFin;

        data = data.replace("*:", "");
        data = data.replace(/"/g, "");
        data = data.replace(/\\/g, "");
        var now = undefined;
        try {
            diaActual = parseInt(data.substring(0, 2));
            mesActual = parseInt(data.substring(3, 3 + 2)) - 1;
            anioActual = parseInt(data.substring(6, 6 + 4));
            horaActual = parseInt(data.substring(11, 11 + 2));
            minutoActual = parseInt(data.substring(14, 14 + 2));
            segundoActual = parseInt(data.substring(17, 17 + 2));
            now = new Date(anioActual, mesActual, diaActual, horaActual, minutoActual, segundoActual);
        }
        catch (e) {
            now = undefined;
        }
        if (now == "Invalid Date") {
            now = new Date();
        }
        fnMostrarMenuCampanaActiva(now, true);

    }
    else {
        $("#dvTiempoRestante").html('');
    }
}

function fnMostrarMenuCampanaActiva(now, automatico) {
    if (now <= FechaHoraFinCampana) {
        if (now >= FechaHoraInicioCampana) {
            fnEsCampanaActiva(now, automatico);
        }
        else {
            if (window.parent.CampanaConf.ReservarProducto) {
                if (now >= FechaHoraInicioReserva) {
                    fnEsCampanaPreventa(now, automatico);
                }
                else {
                    fnEsCampanaPorActivarReserva(now, automatico);
                }
            }
            else {
                fnEsCampanaPorActivar(now, automatico);
            }
        }
    }
    else {
        fnEsCampanaDesactiva();
    }
}


function fnCampanaActiva() {
    RenovarContratoVigente = window.parent.CampanaConf.RenovarContratoVigente;
    
    FechaHoraInicioCampana = new Date(parseInt(window.parent.CampanaConf.FechaInicioPedido.substring(6, 19)));
    FechaHoraFinCampana = new Date(parseInt(window.parent.CampanaConf.FechaFin.substring(6, 19)));
    FechaHoraInicioReserva = new Date(parseInt(window.parent.CampanaConf.FechaPreventa.substring(6, 19)));
    var nowServer = new Date(parseInt(window.parent.CampanaConf.FechaActual.substring(6, 19)));
       
    if (!window.parent.ValidarPorNodeJS) {

        var now = undefined;
        try {
            diaActual = nowServer.getDate();
            mesActual = nowServer.getMonth() + 1;
            anioActual = nowServer.getFullYear();
            horaActual = nowServer.getHours();
            minutoActual = nowServer.getMinutes();
            segundoActual = nowServer.getSeconds();
            now = new Date(anioActual, mesActual - 1, diaActual, horaActual, minutoActual, segundoActual);
        }
        catch (e) {
            now = undefined;
        }
        if (now == "Invalid Date") {
            now = new Date();
        }
        fnMostrarMenuCampanaActiva(now, false);
    }

}

function fnEsCampanaActiva(now, automatico) {
    fnEsCampanaActivaGlobal();
    if (automatico == true) {
        $("#dvTiempoRestante").html("<b><span style='color: #E04343;'>Cierre de pedidos en: </span><br><span style='color: #AA000A;'>" + countdown(now, FechaHoraFinCampana).toString() + "</span></b>");
    }
    else {
        $("#dvTiempoRestante").html("<b><span style='color: #E04343;'>Cierre de pedidos el: </span><br><span style='color: #AA000A;'>" + fnObtenerCadenaFecha(FechaHoraFinCampana) + "</span></b>");
    }
    $("#pBotonesPedido").show();
}

function fnEsCampanaActivaGlobal() {
    window.parent.$("#dvNuevoPedido").show();
    window.parent.esCampanaActiva = true;
}

function fnEsCampanaPorActivarGlobal() {
    window.parent.$("#dvNuevoPedido").hide();
    window.parent.esCampanaActiva = false;
}


function fnEsCampanaPorActivar(now, automatico) {
    fnEsCampanaPorActivarGlobal();
    $("#pBotonesPedido").hide();
    if (automatico == true) {
        $("#dvTiempoRestante").html("<b><span style='color: #E04343;'>Apertura de pedidos en: </span><br><span style='color: #AA000A;'>" + countdown(now, FechaHoraInicioCampana).toString() + "</span></b>");
    }
    else {
        $("#dvTiempoRestante").html("<b><span style='color: #E04343;'>Apertura de pedidos el: </span><br><span style='color: #AA000A;'>" + fnObtenerCadenaFecha(FechaHoraInicioCampana) + "</span></b>");
    }
}

function fnEsCampanaDesactiva() {
    fnEsCampanaDesactivaGlobal();
    $("#dvTiempoRestante").html("");
    $("#pBotonesPedido").hide();
}

function fnEsCampanaPreventa(now, automatico) {

    fnEsCampanaPreventaGlobal();
    if (automatico == true) {
        $("#dvTiempoRestante").html("<b><span style='color: #E04343;'>Cierre de reserva en: </span><br><span style='color: #AA000A;'>" + countdown(now, FechaHoraInicioCampana).toString() + "</span></b>");
    }
    else {
        $("#dvTiempoRestante").html("<b><span style='color: #E04343;'>Cierre de reserva el: </span><br><span style='color: #AA000A;'>" + fnObtenerCadenaFecha(FechaHoraInicioCampana) + "</span></b>");
    }
    $("#pBotonesPedido").show();
    $("#btnRenovar").css("display", "none");
    $("#btnBaja").css("display", "none");
}

function fnEsCampanaPorActivarReserva(now, automatico) {
    fnEsCampanaPorActivarReservaGlobal();
    $("#pBotonesPedido").hide();
    if (automatico == true) {
        $("#dvTiempoRestante").html("<b><span style='color: #E04343;'>Apertura de Reserva en: </span><br><span style='color: #AA000A;'>" + countdown(now, FechaHoraInicioReserva).toString() + "</span></b>");
    }
    else {
        $("#dvTiempoRestante").html("<b><span style='color: #E04343;'>Apertura de Reserva el: </span><br><span style='color: #AA000A;'>" + fnObtenerCadenaFecha(FechaHoraInicioReserva) + "</span></b>");
    }

}

function fnObtenerCadenaFecha(fecha) {

    return ((fecha.getDate()).toString().length > 1 ? (fecha.getDate()).toString() : "0" + (fecha.getDate()).toString()) +
        "/" + ((fecha.getMonth() + 1).toString().length > 1 ? (fecha.getMonth() + 1).toString() : "0" + (fecha.getMonth() + 1).toString()) +
            "/" + fecha.getFullYear().toString();
}

function mostrarProductoCreditoAsignado() {

    $("#pIndicadores").show();
 
    if (CreditoUsuario_dash == null || CreditoUsuario_dash.ProductoCreditoAsignado == null || CreditoUsuario_dash.ProductoCreditoAsignado.length == 0) {
        if (window.parent.CampanaConf.IdCampana == "-1") {
            $("#pIndicadores").html('');
        }
        else {
            $("#pIndicadores").html('');
            $("#pIndicadores").html('<div style="color:#E04343;font-weight:bold; " id ="dvSinCredito">Ud. no cuenta con crédito aprobado.</div>');
        }
   
        window.parent.$("#dvNuevoPedido").hide();
        $("#pBotonesPedido").hide();
        $(".EsActivo").css("display", "none");
        fnValidaListaNegra('add');
        return;
    }
    else {
        $("#pIndicadores").html('');
        $("#pIndicadores").html('<div class="pMedium fIndi"><div class="cGen cGen1"><b>' + oCultura.Moneda.vcSimMon + ' Aprobado</b></div><div class="cGen"><b>' + oCultura.Moneda.vcSimMon + ' Utilizado</b></div><div class="cGen" ><b>' + oCultura.Moneda.vcSimMon + ' Disponible</b></div><div class="cGen" style="width:250px;"><b>Estado de Crédito</b></div><div style="margin-left: 10px;" class="cGenglosa"><b></b></div></div>');
        fnValidaListaNegra('new');
    }


    var TotalDisponible = 0.0;
    var porc;
    $.each(CreditoUsuario_dash.ProductoCreditoAsignado, function (i, val) {
        if (val["Aprobado"] == 0) {
            porc = 0;
        } else {
            porc = parseInt(val["Utilizado"] / val["Aprobado"] * 100);
        }
        TotalDisponible += val["Disponible"];
        $("#pIndicadores").append('<div id="indi' + i + '" class="pMedium fIndi">' +
        '<div class="cGen">' + val["DescripcionProducto"] + '</div>' +
        '<div class="cGenDatos">' + formatNumber.newo(val["Aprobado"], oCultura.Moneda.vcSimMon) + '</div>' +
        '<div class="cGenDatos">' + formatNumber.newo(val["Utilizado"], oCultura.Moneda.vcSimMon) + '</div>' +
        '<div class="cGenDatos" style="background-color:#FEFAC6;"><b>' + formatNumber.newo(val["Disponible"], oCultura.Moneda.vcSimMon) + '</b></div>' +

  
        '<div id="inibar' + i + '" class="cbar" style="width:' + ($.browser.msie && $.browser.version == "6.0" ? "0" : "200") + 'px;"></div>' +
        '<div class="creporc cGenDatos" style="width:35px;">' + porc + ' %</div>' +
         '<div class="cGenglosa">' + (val["DescripcionProducto"] == "Equipos" ? $("#hdfGlosaCreditoEquipo").val() : $("#hdfGlosaCreditoServicio").val()) + ' </div>' + '</div>');

        $("#inibar" + i).kendoSlider({
            min: 0,
            max: val["Aprobado"],
            smallStep: 1,
            largeStep: 10,
            value: val["Utilizado"],
            showButtons: false,
            enabled: false
        });

        $($("#inibar" + i).parent().find("a")[0]).attr("title", "");
        $($("#inibar" + i).parent().find("a")[1]).attr("title", "");

    });


    if (TotalDisponible <= 0) {
        $("#pIndicadores").append('<div style="color:#E04343;font-weight:bold;" id ="dvSinCredito">Ud. ya no cuenta con crédito disponible.</div>');
       
        window.parent.$("#dvNuevoPedido").hide();
        $("#btnNuevoPedido").hide();
        return;
    }

}


function ListarByEmpleadoFamily() {
    if (JSON.parse(LineasUsuario[1]).length > 0) {
       
        var misLineas = JSON.parse(LineasUsuario[1]);

        var vPageSize;
        if ($.browser.msie && $.browser.version == "6.0") {
            vPageSize = 100;
        } else {
            vPageSize = 10;
        }
        
        var pDetLin = $("#pDetLin").data("kendoGrid");
        

        var dataSource_Lineas = new kendo.data.DataSource({
            data: JSON.parse(LineasUsuario[1]),
            pageSize: vPageSize
        });

        pDetLin.setDataSource(dataSource_Lineas);
 
    }
    else {
        $("#pDetLin").html("<div>Usted no tiene líneas Plan Familia</div>");
    }

}

function fnActivarConfiguracionCampana() {
    if (!window.parent.CampanaConf.NuevoProducto) {
        $("#btnNuevoPedido").hide();
    } else {
        $("#btnNuevoPedido").show();      

    }

    if ($("#hdfPortabilidadClaro").val() == "1") {
        $("#dvPortabilidad").show();
    }

    if (!window.parent.CampanaConf.BajaProducto) {
        $("#btnBaja").hide();
    } else {
        $("#btnBaja").show();
    }

    if (!window.parent.CampanaConf.RenovarPlan) {
        $("#btnRenovarPlan").hide();
    } else {
        $("#btnRenovarPlan").show();
    }

    if (!window.parent.CampanaConf.RenovarEquipo) {
        $("#btnRenovarConEquipo").hide();
    } else {
        $("#btnRenovarConEquipo").show();
    }

    if (!window.parent.CampanaConf.Portabilidad) {
        $("#btnPortabilidad").hide();
    } else {
        $("#btnPortabilidad").show();
    }

    if (!window.parent.CampanaConf.PortabilidadPlan) {
        $("#btnPortabilidadPlan").hide();
    } else {
        $("#btnPortabilidadPlan").show();
    }




}

function fnConfiguracionMultiCampana() {
    var cantCampAct = window.parent.arCampanasActivas.length;
    fnMostrarCampanasActivas(window.parent.arCampanasActivas);
    if (cantCampAct == 0) {
  
        $("#panelCampanasActivas").hide();
        window.parent.CampanaConf = { IdCampana: "-1" };
        ListarByEmpleadoFamily();
    } else {
        if (cantCampAct == 1) {
            $("#panelCampanasActivas").hide();
            fnCargarDatosCampana(window.parent.arCampanasActivas[0].IdCampana);
        } else {
            $("#panelCampanasActivas").show();

            if (window.parent.CampanaConf != null || window.parent.CampanaConf != undefined) {
                fnCargarDatosCampana(window.parent.CampanaConf.IdCampana);
            } else {
                fnMostrarPanelSelecionCampana();
            }
        }
    }
}

function fnMostrarPanelSelecionCampana() {
    if (window.parent.CampanaConf != null || window.parent.CampanaConf != undefined) {
        $("#dvClose").show();
    } else {
        $("#dvClose").hide();
    }

    $("#dvCambiarCampana").show();
    $("#dvModalBloq").show();
}
function fnOcultarPanelSelecionCampana() {
    $("#dvCambiarCampana").hide();
    $("#dvModalBloq").hide();
}

function fnCargarDatosCampana(vIdCampana) {
    fnOcultarPanelSelecionCampana();
    var i = 0;
    for (i; i < window.parent.arCampanasActivas.length; i++) {
        if (window.parent.arCampanasActivas[i].IdCampana == vIdCampana) {
            $("#imgOperador").attr("src", window.parent.arCampanasActivas[i].RutaLogo);
            vNombreOperadorSeleccionado = window.parent.arCampanasActivas[i].NombreOperador;
        }
    }

    var CargarDatosCampana_Data = { IdCampana: vIdCampana };
    $.ajax({
        type: "POST",
        url: "Dashboard_pedido.aspx/CargarDatosCampana",
        data: JSON.stringify(CargarDatosCampana_Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            $('#hdfCampanaActiva').val(vIdCampana);
            eval(resultado.d);
            load_Inicial();
            Restriccion();

            var date_now = new Date();
 

        },
        error: function (xhr, err, thrErr) {
            window.location.href = "Dashboard_pedido.aspx";
        }
    });
}

function fnMostrarCampanasActivas(arCampanasActivas) {
    var i = 0;
    for (i; i < arCampanasActivas.length; i++) {
        $("#dvCambiarCampana").append('<div id="dvCamp-' + arCampanasActivas[i].IdCampana + '" class="dvSelectCamp">' + arCampanasActivas[i].NombreOperador + '</div><div style="height: 5px;"></div>');
    }
}

function fnValidarOperadorDeNumero(numero) {
    var result = false;
    var i = 0;
    var idOperador = $.trim($("#spanIdOperador-" + numero).text());
    for (i; i < window.parent.arCampanasActivas.length; i++) {
        if (window.parent.arCampanasActivas[i].IdCampana == window.parent.CampanaConf.IdCampana) {
            if (window.parent.arCampanasActivas[i].IdOperador == idOperador) {
                result = true;
            }
        }
    }
    return result;
}

function Restriccion() {
    if (bRestringir) {
        $("#dvMsgRestriccion").show();
        $("#lblMsjRestriccion").text(window.parent.CampanaConf.MensajeDeRestriccion);
    }
}