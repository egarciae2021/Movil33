var fechaLimiteModificacion = '14 de agosto del 2016 a las 23:00:00 horas';
var esEditar = false;
var vDetallePlanes;
var AltoGrilla = 0;
var planesBase;
var planes = [];
var indicadoresInicial = [];
var indicadoresVariante = [];
var arregloSeleccion = [];
//var dias = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
//var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre");
//var MesesEnteros = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
var dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"];
var MesesEnteros = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

var MesContratoAnterior;

//var ale = true;
//var aled = false;
//var numeroAlert = 0;
//var totalNumeroAlert = 5;

function miIndicadorCredito(_descripcion, _aprobado, _disponible, _utilizado) {
    this.Descripcion = _descripcion;
    this.Aprobado = _aprobado;
    this.Disponible = _disponible;
    this.Utilizado = _utilizado;
}

$(function () {
    $("#fechaLimiteModificacion").text(fechaLimiteModificacion);

    if (window.parent.UsuarioConectado != $("#hfUsuario").val()) {
        window.location.href = '../Login.aspx';
        return;
    }
    DimPosElementos();

    $(window).resize(function () {
        DimPosElementos();
    });

    obtenerCampanaActiva();
    obtenerCreditos();
    obtenerProductos();

    enlacesLoad();

    $("#chkConfirmarTerminos").change(function () {
        if ($(this).is(':checked')) {
            $("#btnComprarConfirmado").unbind("click");
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

    $("#btnComprarConfirmado").click(function () {
        alerta("Debe aceptar las condiciones");
    });

    //    $("#txtPrecioMax,#txtPrecioMin").live("keypress", ValidarSoloNumero);
    //    $("#txtNombre").live("keypress", ValidarAlfaNumerico);

    $(".getCondicionesTemrinos").click(function () {
        window.location.href = "../Common/Controladores/DescargarArchivo.ashx?archivo=Common/Contratos/Condiciones.pdf";
        //$.ajax({
        //    type: "POST",
        //    url: "Pedido.aspx/getTerminosCondiciones",
        //    contentType: "application/json; charset=utf-8",
        //    dataType: "json",
        //    success: function (resultado) {
        //        window.location.href = "../Common/Controladores/DescargarArchivo.ashx?archivo=" + resultado.d;
        //    },
        //    error: function (xhr, err, thrErr) {
        //        MostrarErrorAjax(xhr, err, thrErr);
        //    }
        //});
    });
});

function enlacesLoad() {
//
//    $("#txtNombre,#txtPrecioMin,#txtPrecioMax").keypress(function (e) {
//        if (e.which == 13) {
//            $("#btnFiltroProducto").click();
//        }
//    });
//
//    $("#required").kendoDropDownList({
//        change: onChangeDdl
//    });
//
//    $("#btnFiltroProducto").click(function () { obtenerProductos_Filtro(); });

    $("#btnVolverPedidos").click(function () {
        window.parent.fnIrPedidos();
    });

    $("#tapPlanes").click(function () {
        $(".tap").removeClass("tapSelect");
        $("#tapPlanes").addClass("tapSelect");
        $("#detalleTaps > div").hide(0, function () {
            $("#pSelecPlan").fadeIn(200);
        });
    });

    $("#tapCarritoPlan").click(function () {
        fnAbrirTapCarrito();
    });

    $("#tapDeclaracion").click(function () {
        $(".tap").removeClass("tapSelect");
        $("#tapDeclaracion").addClass("tapSelect");
        $("#detalleTaps > div").hide(0, function () {
            $("#pDeclaracion").fadeIn(200);
        });
    });

    $('.tap').hover(function () {
        $(this).animate({ marginRight: '10px', marginLeft: '30px' }, 300);

    }, function () {
        $(this).animate({ marginRight: '0px', marginLeft: '20px' }, 300);
    });

//    $("#btnCarrito").click(function () {
//        $(".tap").removeClass("tapSelect");
//        $("#tapCarritoPlan").addClass("tapSelect");
//
//        $("#detalleTaps > div").hide(0, function () {
//
//            validarexceso();
//            validarexcesoPlan();
//
//            $("#pDetEle").fadeIn(200, function () {
//                if (arregloSeleccion.length != 0) {
//                    var dataSource = new kendo.data.DataSource({
//                        data: arregloSeleccion
//                    });
//
//                    var gridele = $("#gridDetEle").data("kendoGrid");
//                    gridele.setDataSource(dataSource);
//
//                    enlazarClick();
//                }
//            });
//        });
//    });

    AltoGrilla = $(window).height() - ($("#contCampaña").height() + 115);
    if (AltoGrilla <= 0) {
        AltoGrilla = 280;
    }

    $("#gridDetEle").kendoGrid({
        dataSource: {
            data: arregloSeleccion
        },
        sortable: false,
        rowTemplate: kendo.template($("#rowTemplate").html()),
        altRowTemplate: kendo.template($("#altRowTemplate").html()),
        height: AltoGrilla
    });
}

function obtenerCreditos() {
    creditos = CreditoUsuario;

    $.each(creditos.ProductoCreditoAsignado, function (i, val) {
        var porc = parseInt(val["Utilizado"] / val["Aprobado"] * 100);

        $("#tablaInidicador tbody").append("<tr><td class='subtitulo'>" + val["DescripcionProducto"].toString() +
                "</td><td>" + formatNumber.newo(val["Aprobado"], "S/. ").toString() +
                "</td><td>" + formatNumber.newo(val["Disponible"], "S/. ").toString() +
                "</td><td>" + formatNumber.newo(val["Utilizado"], "S/. ").toString() +
                "</td><td>" + porc.toString() + " % " +
                "</td></tr>");

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
        operarInidicadores(0, -(parseInt(window.parent.PrecioPlanNumeroRenovar)));
    }

    $("#generalCarrito").fadeIn(300, null, function () { });
}

function validarexceso() {
    $($($("#totalesCarrito > div")[0]).find("span")[0]).text(formatNumber.newo(productoPrecioTotal(), "S/. "));
}

//function validarexcesoPlan() {
//    var creDisPlan = parseInt($($(".credisp")[1]).text().split(' ')[1].replace(/,/g, ''));
//    if (creDisPlan < 0) {
//        $("#alert1").css("display", "block");
//        return true;
//    }
//    else {
//        $("#alert1").css("display", "none");
//        return false;
//    }
//}
//
function DimPosElementos() {
    try {
        resizeGrid();
    } catch (e) {
        alert("ERROR");
    }
}

function resizeGrid() {
    var gridElement = $("#grdPedidos");
    var dataArea = gridElement.find(".k-grid-content");
    var newHeight = $(window).height() - 100;
    var diff = gridElement.innerHeight() - dataArea.innerHeight();
    gridElement.height(newHeight);
    dataArea.height(newHeight - diff);
}

function obtenerCampanaActiva() {

    campanaActiva = window.parent.CampanaConf;

    var fechaInicio = new Date(parseInt(campanaActiva["FechaInicio"].substring(6, 19)));
    var fechaFin = new Date(parseInt(campanaActiva["FechaFin"].substring(6, 19)));
    var fechaActual = new Date(parseInt(campanaActiva["FechaActual"].substring(6, 19)));

    strFechaInicio = dias[fechaInicio.getDay()] + ', ' + fechaInicio.getDate() + ' de ' + meses[fechaInicio.getMonth()] + ' del ' + fechaInicio.getFullYear();
    strfechaFin = dias[fechaFin.getDay()] + ', ' + fechaFin.getDate() + ' de ' + meses[fechaFin.getMonth()] + ' del ' + fechaFin.getFullYear();

    var FormatNewFechaI = dias[fechaInicio.getDay()] + ', ' + fechaInicio.getDate() + '/' + MesesEnteros[fechaInicio.getMonth()] + '/' + fechaInicio.getFullYear();
    var FormatNewFechaF = dias[fechaFin.getDay()] + ', ' + fechaFin.getDate() + '/' + MesesEnteros[fechaFin.getMonth()] + '/' + fechaFin.getFullYear();
    var strFechaActual = dias[fechaActual.getDay()] + ', ' + fechaActual.getDate() + '/' + MesesEnteros[fechaActual.getMonth()] + '/' + fechaActual.getFullYear();

    $("#tablaDscCampana tbody").append("<tr><td class='subtitulo' >Campaña</td><td>" + campanaActiva["Descripcion"].toString() + "</td></tr>");
    $("#tablaDscCampana tbody").append("<tr><td class='subtitulo'>Fecha Inicio</td><td>" + FormatNewFechaI + "</td></tr>");
    $("#tablaDscCampana tbody").append("<tr><td class='subtitulo'>Fecha Fin</td><td>" + FormatNewFechaF + "</td></tr>");

    if (window.parent.NumeroRenovar != undefined)
        $("#tablaDscCampana tbody").append("<tr><td class='subtitulo'>Numero Renovar</td><td class='subtitulo'>" + window.parent.NumeroRenovar.toString() + "</td></tr>");

    $("#declaracionFechaActual").text(strFechaActual);
}

function obtenerProductos() {
    var btSoloPlanMayor = false;
    if (window.parent.CampanaConf.RenovarContratoVigente && window.parent.Habilitado == "0") {
        btSoloPlanMayor = window.parent.CampanaConf.SoloRenovarMontoMayor;
    }
    var ObtenerPlanesRenovacion_Data = {
        IdEmpleado: $("#hdfEmpleado").val(),
        IdCampana: window.parent.CampanaConf.IdCampana,
        Numero: window.parent.NumeroRenovar,
        NombrePlan: '',
        MontoMin: 0,
        MontoMax: 0
    };
    $.ajax({
        type: "POST",
        url: "PedidoPlan.aspx/ObtenerPlanesRenovacion",
        data: JSON.stringify(ObtenerPlanesRenovacion_Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            planesBase = JSON.parse(resultado.d);
            //for (var i = 0; i < planesBase.length; i++) {
            //    if (!UsarPlanDep) {
            //        planes.push(new oPlan(planesBase[i].P_inCod, planesBase[i].vcNom, planesBase[i].vcDes, planesBase[i].dcMon, planesBase[i].CantidadTotal, planesBase[i].CantidadDisponible));
            //    } else {
            //        if (planesBase[i].IdPlanBase == planesBase[i].P_inCod) {
            //            planes.push(new oPlan(planesBase[i].P_inCod, planesBase[i].vcNom, planesBase[i].vcDes, planesBase[i].dcMon, planesBase[i].CantidadTotal, planesBase[i].CantidadDisponible));
            //        }
            //    }
            //}
            var idUltimoPlan = 0;
            var indexPlanBase = 0;
            for (var i = 0; i < planesBase.length; i++) {
                if (!UsarPlanDep) {
                    //planes.push(new oPlan(planesBase[i].P_inCod, planesBase[i].vcNom, planesBase[i].vcDes, planesBase[i].dcMon, planesBase[i].CantidadTotal, planesBase[i].CantidadDisponible));
                    if (btSoloPlanMayor) {
                        if (parseFloat(window.parent.PrecioPlanNumeroRenovar) < parseFloat(planesBase[i].dcMon)) {
                            planes.push(new oPlan(planesBase[i].P_inCod, planesBase[i].vcNom, planesBase[i].vcDes, planesBase[i].dcMon, planesBase[i].CantidadTotal, planesBase[i].CantidadDisponible));
                        }
                    } else {
                        planes.push(new oPlan(planesBase[i].P_inCod, planesBase[i].vcNom, planesBase[i].vcDes, planesBase[i].dcMon, planesBase[i].CantidadTotal, planesBase[i].CantidadDisponible));
                    }
                } else {
                    if (planesBase[i].IdPlanBase == planesBase[i].P_inCod) {
                        idUltimoPlan = planesBase[i].IdPlanBase;
                        indexPlanBase = i;
                    }
                    if (btSoloPlanMayor) {
                        if (parseFloat(window.parent.PrecioPlanNumeroRenovar) < parseFloat(planesBase[i].dcMon)) {
                            if (idUltimoPlan != 0) {
                                planes.push(new oPlan(planesBase[indexPlanBase].P_inCod, planesBase[indexPlanBase].vcNom, planesBase[indexPlanBase].vcDes, planesBase[indexPlanBase].dcMon, planesBase[indexPlanBase].CantidadTotal, planesBase[indexPlanBase].CantidadDisponible));
                                idUltimoPlan = 0;
                            }
                        }
                    } else {
                        planes.push(new oPlan(planesBase[i].P_inCod, planesBase[i].vcNom, planesBase[i].vcDes, planesBase[i].dcMon, planesBase[i].CantidadTotal, planesBase[i].CantidadDisponible));
                    }
                }
            }
            planes.sort(function (a, b) {
                return a.dcMon - b.dcMon;
            });

            var vRowTemp, vAltRowTemp, vColumns;
            if (!UsarPlanDep) {
                vRowTemp = kendo.template($("#rowTemplateCarrito").html());
                vAltRowTemp = kendo.template($("#altRowTemplateCarrito").html());
                vColumns = [
                    { field: "detalles", width: "120px", title: "Plan" },
                    { field: "Precio", width: "40px", title: "Monto", attributes: { style: "text-align:right;"} },
                    { field: "Comprar", width: "60px", title: "Elegir", attributes: { style: "text-align:right;"} }
                ];
            } else {
                vRowTemp = kendo.template($("#rowTemplateCarrito_PD").html());
                vAltRowTemp = kendo.template($("#altRowTemplateCarrito_PD").html());
                vColumns = [
                    { field: "detalles", width: "48%", title: "Plan" },
                    { field: "PaqueteDatos", width: "30%", title: "Paquete Datos" },
                    { field: "Precio", width: "10%", title: "Monto", attributes: { style: "text-align:right;"} },
                    { field: "Comprar", width: "12%", title: "Elegir", attributes: { style: "text-align:right;"} }
                ];
            }

            $("#gridPro").kendoGrid({
                dataSource: {
                    data: planes,
                    pageSize: 20
                },
                dataBinding: onDataBinding,
                dataBound: onDataBound,
                groupable: false,
                sortable: false,
                navigatable: true,
                pageable: {
                    refresh: true,
                    pageSizes: true,
                    messages: {
                        itemsPerPage: "ítems por página",
                        display: "{0}-{1} de {2} ítems",
                        empty: "No hay planes disponibles"
                    }
                },
                rowTemplate: vRowTemp,
                altRowTemplate: vAltRowTemp,
                height: AltoGrilla,
                columns: vColumns
            });

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
                            var pro = obtenerProducto(filas[i].idPlan);
                            arregloSeleccion.push(pro);
                            arregloSeleccion[i].MesesContrato = filas[i].Meses_Contrato;
                        }

                        $("#CarritoCantidad").text(arregloSeleccion.length.toString());
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

//function obtenerProductos_Filtro() {
//    var ObtenerPlanesRenovacion_Data = {
//        IdEmpleado: $("#hdfEmpleado").val(),
//        IdCampana: window.parent.CampanaConf.IdCampana,
//        Numero: window.parent.NumeroRenovar,
//        NombrePlan: $("#txtNombre").val(),
//        MontoMin: $("#txtPrecioMin").val() == '' ? 0 : $("#txtPrecioMin").val(),
//        MontoMax: $("#txtPrecioMax").val() == '' ? 0 : $("#txtPrecioMax").val()
//    }
//    $.ajax({
//        type: "POST",
//        url: "PedidoPlan.aspx/ObtenerPlanesRenovacion",
//        data: JSON.stringify(ObtenerPlanesRenovacion_Data),
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (resultado) {
//            resul = JSON.parse(resultado.d);
//            var planes_Filtro = [];
//            for (var i = 0; i < resul.length; i++) {
//                planes_Filtro.push(new oPlan(resul[i].P_inCod, resul[i].vcNom, resul[i].vcDes, resul[i].dcMon, resul[i].CantidadTotal, resul[i].CantidadDisponible));
//            }
//
//            var dataSource = new kendo.data.DataSource({
//                data: planes_Filtro,
//                pageSize: 20
//            });
//
//            var gridPro = $("#gridPro").data("kendoGrid");
//            gridPro.setDataSource(dataSource);
//
//            if (planes_Filtro.length == 0) {
//                alerta("No se encontró níngun producto </br> con el filtro seleccionado");
//            }
//        },
//        error: function (xhr, err, thrErr) {
//            MostrarErrorAjax(xhr, err, thrErr);
//        }
//    });
//
//}

function oPlan(_P_inCod, _vcNom, _vcDes, _dcMon, _CantidadTotal, _CantidadDisponible) {
    this.P_inCod = _P_inCod;
    this.vcNom = _vcNom;
    this.vcDes = _vcDes;
    this.dcMon = _dcMon;
    this.CantidadTotal = _CantidadTotal;
    this.CantidadDisponible = _CantidadDisponible;
}

function oPlanElegido(_P_inCod, _vcNom, _vcDes, _dcMon, _MesesContrato) {
    this.P_inCod = _P_inCod;
    this.vcNom = _vcNom;
    this.vcDes = _vcDes;
    this.dcMon = _dcMon;
    this.MesesContrato = _MesesContrato;
}

function onDataBinding() {
}

function onDataBound() {
    var btSoloPlanMayor = false;
    if (window.parent.CampanaConf.RenovarContratoVigente && window.parent.Habilitado == "0") {
        btSoloPlanMayor = window.parent.CampanaConf.SoloRenovarMontoMayor;
    }
    if (UsarPlanDep) {
        var cboOnTop = $(".cboOnTop");
        var v_idPlanBase, dataCombo = [];
        for (var f = 0; f < cboOnTop.length; f++) {
            v_idPlanBase = cboOnTop[f].id.split("-")[1];

            dataCombo = [];
            for (var i = 0; i < planesBase.length; i++) {
                if (planesBase[i].IdPlanBase == v_idPlanBase) {
                    if (btSoloPlanMayor) {
                        if (parseFloat(window.parent.PrecioPlanNumeroRenovar) < parseFloat(planesBase[i].dcMon)) {
                            dataCombo.push(new miPlan(planesBase[i].NombreCorto + " (" + formatNumber.newo(parseFloat(planesBase[i].dcMon) - parseFloat($("#spPrecio-" + v_idPlanBase).text()), "S/. ") + ")", planesBase[i].P_inCod, planesBase[i].dcMon));
                            continue;
                        }
                    } else {
                        dataCombo.push(new miPlan(planesBase[i].NombreCorto + " (" + formatNumber.newo(parseFloat(planesBase[i].dcMon) - parseFloat($("#spPrecio-" + v_idPlanBase).text()), "S/. ") + ")", planesBase[i].P_inCod, planesBase[i].dcMon));
                        //dataCombo.push(new miPlan(planesBase[i].NombreCorto + " (" + formatNumber.newo(parseFloat(planesBase[i].dcMon), "S/. ") + ")", planesBase[i].P_inCod, planesBase[i].dcMon));    
                    }
                }
            }

            //if (dataCombo.length == 0) {
            //    for (var i = 0; i < planesBase.length; i++) {
            //        if (planesBase[i].IdPlanBase == v_idPlanBase) {
            //            if (parseFloat(planesBase[i].dcMon) - parseFloat($("#spPrecio-" + v_idPlanBase).text()) == 0) {
            //                dataCombo.push(new miPlan(planesBase[i].NombreCorto + " (" + formatNumber.newo(parseFloat(planesBase[i].dcMon) - parseFloat($("#spPrecio-" + v_idPlanBase).text()), "S/. ") + ")", planesBase[i].P_inCod, planesBase[i].dcMon));
            //                break;
            //            }
            //        }
            //    }
            //}

            //$(cboOnTop[f]).kendoComboBox({
            $(cboOnTop[f]).kendoDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: dataCombo,
                //readonly: true,
                filter: "contains",
                suggest: true,
                index: 0,
                select: function (e) {
                    var texto = e.item.context.innerHTML;
                    if (texto.length > 30) {
                        var texto1 = texto.substring(0, 20);
                        var texto2 = texto.substring(texto.indexOf("("));
                        e.sender._text = function () { return texto1 + "... " + texto2; };
                    } else {
                        e.sender._text = function () { return texto; };
                    }
                },
                change: function (e) {
                    var precioOnTop = this.dataItem().precio;

                    //var fila = this.input.parent().parent().parent().parent();
                    var fila = $(this.element.context).parent().parent().parent();
                    $(fila[0]).find(".Precio").html(formatNumber.newo(parseFloat(precioOnTop), "S/. "));
                }
            });
            $(cboOnTop[f]).data("kendoDropDownList").trigger("change");
            //$(cboOnTop[f]).data("kendoComboBox").input.attr("ReadOnly", true);
        }
    }

    $(".seleccioPlan").click(function () {        
        var id;
        if (!UsarPlanDep) {
            id = $.trim($($($(this).parent()).find("div")[1]).text());
        } else {
            id = $("#cboOnTop-" + $.trim($($($(this).parent()).find("div")[1]).text())).data("kendoDropDownList").value();
        }

        if (validarexcesoBool()) {
            alerta("Usted ha superado su límite de crédito");
            return;
        }
    
        var pro = obtenerProducto(id);
    
        if (arregloSeleccion.length != 0) {
            if (validarexcesoBool_monto(0, (parseInt(pro.dcMon) - parseInt(arregloSeleccion[0].dcMon)))) {
                alerta("Usted ha superado su límite de crédito");
                return;
            }
    
            operarInidicadores(0, -parseInt(arregloSeleccion[0].dcMon));
        } else {
            if (validarexcesoBool_monto(0, parseInt(pro.dcMon))) {
                alerta("Usted ha superado su límite de crédito");
                return;
            }
        }
    
        arregloSeleccion = [];
        arregloSeleccion.push(pro);
    
        operarInidicadores(0, parseInt(pro.dcMon));
    
        fnAbrirTapCarrito();
    });
    
    $(".dscPlanCombo").click(function () {
        var idPlan = $.trim($($($(this).parent()).find("div")[1]).text());
    
        $.ajax({
            type: "POST",
            url: "Pedido.aspx/obtenerDetallePlan",
            data: "{'prIdPlan': '" + idPlan + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (resultado) {
                vDetallePlanes = resultado.d;
                $("#lblNombre").text($.trim(vDetallePlanes.vcNom));
                $("#lblDescripcion").html($.trim(vDetallePlanes.vcDes));
                $("#lblOperador").text($.trim(vDetallePlanes.Operador.vcNomOpe));
                $("#lblMonto").text("S/. " + vDetallePlanes.dcMon.toFixed(2));
                var Trs = "";
                Trs = "";
                $("#TblDetPlan").html("");
                for (var i = 0; i < vDetallePlanes.SubPlanes.length; i++) {
                    Trs += "<tr>";
                    Trs += "<td colspan = '2'><div  style='border: 1px solid #a6c9e2; margin: 3px;'></div></td>";
                    Trs += "</tr>";
                    Trs += '<tr style="background-color: #d6d6d6;">';
                    Trs += "<td style='width: 100px;'><b>Bolsa</b></td><td><b>" + $.trim(vDetallePlanes.SubPlanes[i].vcNom) + "</b></td>";
                    Trs += "</tr>";
                    if ($.trim(vDetallePlanes.SubPlanes[i].vcDes) != "") {
                        Trs += "<tr>";
                        Trs += "<td style='width: 100px;'><b>Descripción</b></td><td>" + $.trim(vDetallePlanes.SubPlanes[i].vcDes) + "</td>";
                        Trs += "</tr>";
                    }
                    Trs += "<tr>";
                    if (vDetallePlanes.SubPlanes[i].dcCan == 0) {
                        Trs += "<td style='width: 100px;'><b>Cantidad</b></td><td>Ilimitado</td>";
                    } else {
                        Trs += "<td style='width: 100px;'><b>Cantidad</b></td><td>" + parseInt(vDetallePlanes.SubPlanes[i].dcCan) + " - " + $.trim(vDetallePlanes.SubPlanes[i].vcSer.toUpperCase()) + "</td>";
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
}

function enlazarClick() {

    var cbomes = $(".cboMeses");
    for (var i = 0; i < cbomes.length; i++) {
        $(cbomes[i]).attr("index", i);
        $(cbomes[i]).kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: obtenerMesesByPlan(),
            filter: "contains",
            suggest: true,  
            index: 0,
            enable: !(arregloSeleccion[i].Accion == "0"),
            open: function (e) {
                MesContratoAnterior = this.value();
            },
            change: function (e) {
                var val = $(this)[0]._selectedValue;
                //var fila = this.input.parent().parent().parent().parent();
                //arregloSeleccion[parseInt(fila[0].rowIndex)].MesesContrato = val;
                arregloSeleccion[0].MesesContrato = val;
            },
            dataBound: function (e) {
                if ($("#hdfIdPedidoEditar").val() != "0" && arregloSeleccion[0].MesesContrato != -1) {
                    this.value(arregloSeleccion[0].MesesContrato);
                } else {
                    var val = $(this)[0]._selectedValue;
                    //var fila = this.input.parent().parent().parent().parent();
                    //arregloSeleccion[parseInt(fila[0].rowIndex)].MesesContrato = val;
                    arregloSeleccion[0].MesesContrato = val;
                }
            }
        });
    }
}

function fnAbrirTapCarrito() {
    $(".tap").removeClass("tapSelect");
    $("#tapCarritoPlan").addClass("tapSelect");

    $("#detalleTaps > div").hide(0, function () {
        validarexceso();

        $("#pDetEle").fadeIn(0, function () {
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
}

function obtenerProducto(id) {
    if (!UsarPlanDep) {
        for (var i = 0; i < planes.length; i++) {
            if (planes[i].P_inCod == id) {
                var pro = planes[i];
                return new oPlanElegido(pro.P_inCod, pro.vcNom, pro.vcDes, pro.dcMon, -1);
            }
        }
    } else {
        for (var i = 0; i < planesBase.length; i++) {
            if (planesBase[i].P_inCod == id) {
                var pro = planesBase[i];
                return new oPlanElegido(pro.P_inCod, pro.vcNom, pro.vcDes, pro.dcMon, -1);
            }
        }
    }
}

function obtenerMesesByPlan() {
    var meses = [];

    for (var i = 0; i < arMesesRenovacion.length; i++) {
        meses.push({ text: arMesesRenovacion[i], value: arMesesRenovacion[i] });
    }

    return meses;
}

//function aumentarBurbuja() {
//    $("#btnCarritoCant").hide(200, function () {
//        if (arregloSeleccion.length > 0) {
//            $("#btnCarritoCant").css("background-color", "red");
//        }
//        else {
//            $("#btnCarritoCant").css("background-color", "#003F59");
//        }
//        $($("#btnCarritoCant span")[0]).text(arregloSeleccion.length);
//        $("#btnCarritoCant").show(200);
//    });
//}

function productoPrecioTotal() {
    var total = 0.0;
    for (var i = 0; i < arregloSeleccion.length; i++) {
        total = total + parseFloat(arregloSeleccion[i].dcMon);
    }
    return total;
}

function operarInidicadores(montoEquipo, montoPlan) {
    indicadoresVariante[0]["Disponible"] = parseFloat(indicadoresVariante[0]["Disponible"] - montoEquipo);
    indicadoresVariante[0]["Utilizado"] = parseFloat(indicadoresVariante[0]["Utilizado"] + montoEquipo);

    indicadoresVariante[1]["Disponible"] = parseFloat(indicadoresVariante[1]["Disponible"] - montoPlan);
    indicadoresVariante[1]["Utilizado"] = parseFloat(indicadoresVariante[1]["Utilizado"] + montoPlan);

    actualizarIndicadores();
}

function actualizarIndicadores() {
    for (var i = 0; i < indicadoresVariante.length; i++) {
        var porc = parseInt(indicadoresVariante[i]["Utilizado"] / indicadoresVariante[i]["Aprobado"] * 100);

        $($($("#tablaInidicador tbody tr")[i]).find("td")[1]).text(formatNumber.newo(indicadoresVariante[i]["Aprobado"], "S/. ").toString());
        $($($("#tablaInidicador tbody tr")[i]).find("td")[2]).text(formatNumber.newo(indicadoresVariante[i]["Disponible"], "S/. ").toString());
        $($($("#tablaInidicador tbody tr")[i]).find("td")[3]).text(formatNumber.newo(indicadoresVariante[i]["Utilizado"], "S/. ").toString());
        $($($("#tablaInidicador tbody tr")[i]).find("td")[4]).text(porc.toString() + " %");
    }
    $("#CarritoCantidad").text(arregloSeleccion.length.toString());
}

//function fnalerta() {
//    setTimeout(function () {
//        if (ale) {
//            $(".divCreditDis").addClass("AlertaMonto");
//        }
//        else {
//            $(".divCreditDis").removeClass("AlertaMonto");
//        }
//
//        aled = !aled;
//        numeroAlert = numeroAlert + 1;
//        if (numeroAlert > totalNumeroAlert) {
//            numeroAlert = totalNumeroAlert - totalNumeroAlert;
//            aled = false;
//            $(".divCreditDis").removeClass("AlertaMonto");
//        }
//        else {
//            fnalerta();
//        }
//    }, 500);
//}

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

function validarexcesoBool_monto(montoEquipo, montoPlan) {

    var creDis = parseFloat(indicadoresVariante[0]["Disponible"] - montoEquipo);
    var creDisPlan = parseFloat(indicadoresVariante[1]["Disponible"] - montoPlan);

    if (creDis < 0) {
        return true;
    }
    else {
        return creDisPlan < 0;
    }

}

function procesarPedido() {
    if (window.parent.UsuarioConectado != $("#hfUsuario").val()) {
        window.location.href = '../Login.aspx';
        return;
    }
    
    if (arregloSeleccion.length == 0) {
        alerta("Usted no tiene productos en el carrito de compras");
        return;
    }
    
    if (validarexceso()) {
        alerta("Usted a sobrepasado su límite de crédito, verifique su carrito de compras");
        return;
    }
    
    if (esEditar && !fnExistsEdit()) {
        alerta("Usted no a modificado su pedido");
        return;
    }
    
    confirma("¿Esta usted seguro de enviar el pedido?<br>", "Compra de productos", function (a) {
        if (a == "Aceptar") {
            $(".tap").hide();
            $("#detalleTaps").css("display", "none");
            $("#pSelecPlan").hide();
            $("#pDetEle").hide();
            $("#pDeclaracion").hide();
    
            $("#pProcesoCompra").fadeIn(200, function () {
                $("#pPanelCarrito").hide(0, function () {
                    if (esEditar) {
                        ModificarPedidoRenovPlan();
                    }
                    else {
                        registrarPedidoRenovPlan();
                    }
                });
            });    
        }
    });
}

function registrarPedidoRenovPlan() {
    if (arregloSeleccion.length == 0) {
        alerta("Agregue productos a su carrito de compras por favor");
        return;
    }

    var XML_AGREGAR = '<?xml version="1.0" encoding="iso-8859-1"?><TABLE>';
    for (var i = 0; i < arregloSeleccion.length; i++) {
        var miNumero = window.parent.NumeroRenovar;
        var miPrecioPlanAntiguo = window.parent.PrecioPlanNumeroRenovar;

        if (miNumero == undefined) {
            miNumero = "Nueva Linea";
        }
        if (miPrecioPlanAntiguo == undefined) {
            miPrecioPlanAntiguo = "0";
        }

        var mesesRestante = 0;
        if (window.parent.NumeroRenovar != undefined) {
            if (window.parent.CampanaConf.RenovarContratoVigente && window.parent.Habilitado == "0") {
                mesesRestante = ObtenerMesesRestante(window.parent.FechaFinContrato);
            }
        }
        XML_AGREGAR = XML_AGREGAR + '<PEDIDO><IdProducto>' + arregloSeleccion[i].P_inCod.toString() +
            '</IdProducto><vcNom>' + arregloSeleccion[i].vcNom.toString() +
            '</vcNom><Precio>' + '0' +
            '</Precio><IdPlan>' + arregloSeleccion[i].P_inCod.toString() +
            '</IdPlan><DscPlan>' + arregloSeleccion[i].dcMon.toString() +
            '</DscPlan><Orden>' + '1' +
            '</Orden><esNuevo>' + '1' +
            '</esNuevo><Numero>' + miNumero +
            '</Numero><Meses>' + arregloSeleccion[i].MesesContrato.toString() +
            '</Meses><PrecioPlanAntiguo>' + miPrecioPlanAntiguo +
            '</PrecioPlanAntiguo><MesesRestante>' + mesesRestante +
            '</MesesRestante></PEDIDO>';
    }

    XML_AGREGAR = XML_AGREGAR + '</TABLE>';

    $.ajax({
        type: "POST",
        url: "PedidoPlan.aspx/registrarPedidoRenovPlan",
        data: "{'prIdEmpleado': '" + $("#hdfEmpleado").val() + "'," +
                "'pIdCampana': '" + window.parent.CampanaConf.IdCampana + "'," +
                "'pXmlPedido': '" + XML_AGREGAR + "', " +
                "'prMaxIdPedido': '" + window.parent.CampanaConf.MaxIdPedido + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {

            if (resultado.d == "") {
                window.location.href = "../FinSession.aspx";
                return;
            }

            if (resultado.d == "ERROR AL AGREGAR PRODUCTO") {
                alert(resultado.d);
                return;
            }

            var resul = JSON.parse(resultado.d);

            $("#lblCodigoPedido").text(resul[0].codigopedido);
            var fechaInicio = new Date();
            strFechaInicio = dias[fechaInicio.getDay()] + ', ' + fechaInicio.getDate() + ' de ' + meses[fechaInicio.getMonth()] + ' del ' + fechaInicio.getFullYear();
            var FormatNewFechaI = dias[fechaInicio.getDay()] + ', ' + Right('0' + fechaInicio.getDate(), 2) + '/' + MesesEnteros[fechaInicio.getMonth()] + '/' + fechaInicio.getFullYear();
            $("#lblFechaPedi").text(FormatNewFechaI + " " + fechaInicio.getHours() + ":" + fechaInicio.getMinutes());


            var verAdquiridos = false;
            var verNoAdquiridos = false;

            var contAdquirido = 0;
            var contNoAdquirido = 0;

            var sumAdEquipos = 0;
            var sumNoAdEquipos = 0;
            var sumAdPlan = 0;
            var sumNoPlan = 0;

            for (var i = 0; i < resul.length; i++) {

                if (resul[i].EstadoPedido == "Enviado") {
                    verAdquiridos = true;
                    contAdquirido = contAdquirido + 1;
                    sumAdEquipos = sumAdEquipos + parseInt(resul[i].PrecioEquipo);
                    sumAdPlan = sumAdPlan + parseInt(resul[i].PrecioPlan);

                    $("#tbAdquiridos tbody").append("<tr><td>" + resul[i].Equipo.toString() +
                    "</td><td style='text-align:right;'>" + formatNumber.newo(resul[i].PrecioEquipo, "S/. ").toString() +
                    "</td><td>" + resul[i].Plan.toString() +
                    "</td><td style='text-align:right;'>" + formatNumber.newo(resul[i].PrecioPlan, "S/. ").toString() +
                    "</td><td>" + resul[i].Numero.toString() +
                    "</td></tr>");

                }
                else {
                    verNoAdquiridos = true;
                    contNoAdquirido = contNoAdquirido + 1;
                    sumNoAdEquipos = sumNoAdEquipos + parseInt(resul[i].PrecioEquipo);
                    sumNoPlan = sumNoPlan + parseInt(resul[i].PrecioPlan);

                    $("#tbNoAdquiridos tbody").append("<tr><td>" + resul[i].Equipo.toString() +
                    "</td><td style='text-align:right;'>" + formatNumber.newo(resul[i].PrecioEquipo, "S/. ").toString() +
                    "</td><td>" + resul[i].Plan.toString() +
                    "</td><td style='text-align:right;'>" + formatNumber.newo(resul[i].PrecioPlan, "S/. ").toString() +
                    "</td><td>" + resul[i].Numero.toString() +
                    "</td></tr>");
                }

            }

            if (!verAdquiridos) {
                $("#tbAdquiridos").css("display", "none");
            }
            else {

                $("#tbAdquiridos tbody").append("<tr style='background: #E2F0F6;'><td style='background: #E2F0F6;'>Total: " + contAdquirido.toString() +
                    "</td><td style='text-align:right;background: #E2F0F6;'>Total: " + formatNumber.newo(sumAdEquipos, "S/. ").toString() +
                    "</td><td></td><td style='text-align:right;background: #E2F0F6;'>Total: " + formatNumber.newo(sumAdPlan, "S/. ").toString() +
                    "</td><td></td></tr>");

            }

            if (!verNoAdquiridos) {
                $("#tbNoAdquiridos").css("display", "none");
            }
            else {
                $("#tbNoAdquiridos tbody").append("<tr style='background: #E2F0F6;'><td style='background: #E2F0F6;'>Total: " + contNoAdquirido.toString() +
                "</td><td style='text-align:right;background: #E2F0F6;'>Total: " + formatNumber.newo(sumNoAdEquipos, "S/. ").toString() +
                "</td><td></td><td style='text-align:right;background: #E2F0F6;'>Total: " + formatNumber.newo(sumNoPlan, "S/. ").toString() +
                "</td><td></td></tr>");
            }

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function ModificarPedidoRenovPlan() {
    if (arregloSeleccion.length == 0) {
        alerta("Agregue productos a su carrito de compras por favor");
        return;
    }

    var XML_AGREGAR = '<?xml version="1.0" encoding="iso-8859-1"?><TABLE>';
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
            '</vcNom><Precio>' + '0' +
            '</Precio><IdPlan>' + arregloSeleccion[i].P_inCod.toString() +
            '</IdPlan><DscPlan>' + arregloSeleccion[i].dcMon.toString() +
            '</DscPlan><Orden>' + '1' +
            '</Orden><esNuevo>' + '0' +
            '</esNuevo><Numero>' + miNumero +
            '</Numero><Meses>' + arregloSeleccion[i].MesesContrato.toString() +
            '</Meses><PrecioPlanAntiguo>' + miPrecioPlanAntiguo +
            '</PrecioPlanAntiguo></PEDIDO>';

    }

    XML_AGREGAR = XML_AGREGAR + '</TABLE>';

    $.ajax({
        type: "POST",
        url: "PedidoPlan.aspx/editarPedidoRenovPlan",
        data: "{'prIdEmpleado': '" + $("#hdfEmpleado").val() + "'," +
                "'pIdCampana': '" + window.parent.CampanaConf.IdCampana + "'," +
                "'pIdPedido': '" + $("#hdfIdPedidoEditar").val() + "'," +
                "'pXmlPedido': '" + XML_AGREGAR + "', " +
                "'prMaxIdPedido': '" + window.parent.CampanaConf.MaxIdPedido + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {

            if (resultado.d == "") {
                window.location.href = "../FinSession.aspx";
                return;
            }

            if (resultado.d == "ERROR AL AGREGAR PRODUCTO") {
                alert(resultado.d);
                return;
            }

            var resul = JSON.parse(resultado.d);

            $("#lblCodigoPedido").text(resul[0].codigopedido);
            var fechaInicio = new Date();
            strFechaInicio = dias[fechaInicio.getDay()] + ', ' + fechaInicio.getDate() + ' de ' + meses[fechaInicio.getMonth()] + ' del ' + fechaInicio.getFullYear();
            var FormatNewFechaI = dias[fechaInicio.getDay()] + ', ' + Right('0' + fechaInicio.getDate(), 2) + '/' + MesesEnteros[fechaInicio.getMonth()] + '/' + fechaInicio.getFullYear();
            $("#lblFechaPedi").text(FormatNewFechaI + " " + fechaInicio.getHours() + ":" + fechaInicio.getMinutes());


            var verAdquiridos = false;
            var verNoAdquiridos = false;

            var contAdquirido = 0;
            var contNoAdquirido = 0;

            var sumAdEquipos = 0;
            var sumNoAdEquipos = 0;
            var sumAdPlan = 0;
            var sumNoPlan = 0;

            for (var i = 0; i < resul.length; i++) {

                if (resul[i].EstadoPedido == "Enviado") {
                    verAdquiridos = true;
                    contAdquirido = contAdquirido + 1;
                    sumAdEquipos = sumAdEquipos + parseInt(resul[i].PrecioEquipo);
                    sumAdPlan = sumAdPlan + parseInt(resul[i].PrecioPlan);

                    $("#tbAdquiridos tbody").append("<tr><td>" + resul[i].Equipo.toString() +
                    "</td><td style='text-align:right;'>" + formatNumber.newo(resul[i].PrecioEquipo, "S/. ").toString() +
                    "</td><td>" + resul[i].Plan.toString() +
                    "</td><td style='text-align:right;'>" + formatNumber.newo(resul[i].PrecioPlan, "S/. ").toString() +
                    "</td><td>" + resul[i].Numero.toString() +
                    "</td></tr>");

                }
                else {
                    verNoAdquiridos = true;
                    contNoAdquirido = contNoAdquirido + 1;
                    sumNoAdEquipos = sumNoAdEquipos + parseInt(resul[i].PrecioEquipo);
                    sumNoPlan = sumNoPlan + parseInt(resul[i].PrecioPlan);

                    $("#tbNoAdquiridos tbody").append("<tr><td>" + resul[i].Equipo.toString() +
                    "</td><td style='text-align:right;'>" + formatNumber.newo(resul[i].PrecioEquipo, "S/. ").toString() +
                    "</td><td>" + resul[i].Plan.toString() +
                    "</td><td style='text-align:right;'>" + formatNumber.newo(resul[i].PrecioPlan, "S/. ").toString() +
                    "</td><td>" + resul[i].Numero.toString() +
                    "</td></tr>");
                }

            }

            if (!verAdquiridos) {
                $("#tbAdquiridos").css("display", "none");
            }
            else {

                $("#tbAdquiridos tbody").append("<tr style='background: #E2F0F6;'><td style='background: #E2F0F6;'>Total: " + contAdquirido.toString() +
                    "</td><td style='text-align:right;background: #E2F0F6;'>Total: " + formatNumber.newo(sumAdEquipos, "S/. ").toString() +
                    "</td><td></td><td style='text-align:right;background: #E2F0F6;'>Total: " + formatNumber.newo(sumAdPlan, "S/. ").toString() +
                    "</td><td></td></tr>");

            }

            if (!verNoAdquiridos) {
                $("#tbNoAdquiridos").css("display", "none");
            }
            else {
                $("#tbNoAdquiridos tbody").append("<tr style='background: #E2F0F6;'><td style='background: #E2F0F6;'>Total: " + contNoAdquirido.toString() +
                "</td><td style='text-align:right;background: #E2F0F6;'>Total: " + formatNumber.newo(sumNoAdEquipos, "S/. ").toString() +
                "</td><td></td><td style='text-align:right;background: #E2F0F6;'>Total: " + formatNumber.newo(sumNoPlan, "S/. ").toString() +
                "</td><td></td></tr>");
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnExistsEdit() {
    return true;
}

//function onChangeDdl() {
//    var dropdownlist = $("#required").data("kendoDropDownList");
//    var selectedIndex = dropdownlist.select();
//    var data = dropdownlist.dataItem(selectedIndex);
//
//    switch (data.text) {
//        case "Nombre":
//            $("#pTipo").hide();
//            $("#pTxtPrecio").hide();
//            $("#txtNombre").focus();
//            $("#ptxtNombre").fadeIn(300, function () { $("#txtNombre").focus(); });
//
//            $("#txtPrecioMin").val('');
//            $("#txtPrecioMax").val('');
//            break;
//        case "Precio":
//            $("#pTipo").hide();
//            $("#ptxtNombre").hide();
//            $("#pTxtPrecio").fadeIn(300, function () { $("#txtPrecioMin").focus(); });
//
//            $("#txtNombre").val('');
//            break;
//        default:
//    }
//}

function miPlan(_text, _value, _precio) {
    this.text = _text;
    this.value = _value;
    this.precio = parseFloat(_precio);
}

function ObtenerMesesRestante(fechaFinContrato) {
    try {
        var vFechaActual = new Date($("#hdfFecServidor").val().substring(0, 4), $("#hdfFecServidor").val().substring(4, 6) - 1, $("#hdfFecServidor").val().substring(6, 8));
        var finContratoLinea = fechaFinContrato;
        var dafinContrato = new Date(finContratoLinea.split("-")[0], finContratoLinea.split("-")[1] - 1, finContratoLinea.split("-")[2]);
        return monthDiff(vFechaActual, dafinContrato);
    } catch (e) {
        return 0;
    }
}
function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}