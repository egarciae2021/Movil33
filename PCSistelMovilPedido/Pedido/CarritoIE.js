/// <reference path="../Common/Scripts/jquery-2.0.0-vsdoc.js" />
var fechaLimiteModificacion = '14 de agosto del 2016 a las 23:00:00 horas';
var boolEnlazarClick = 1;
var dias = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre");
var MesesEnteros = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");

var campanaActiva;

var productosBase;
var productos = [];
var arregloSeleccion = [];
var arregloEli = [];

var indicadoresInicial = [];
var indicadoresVariante = [];

var precioPlanAnterior;
var MesContratoAnterior;
var precioOnTopAnterior;
var valueOnTopAnterior;

var obligarMantenerPlan = false;
var esEditar = false;

var MesesFinanciamientoEquipo = 1;  //<<<<<---------------- valor de los meses de contrato del financiamiento asociado a la campana, si la campana tiene financiamiento con pago al contado el valor sera 1
var numDecimales = 4;
var rm = '';
var MesesFinanciamientoChip = 1;
var SoloPlanMayor = false;
$(function () {
    $("#fechaLimiteModificacion").text(fechaLimiteModificacion);

    if (window.parent.CampanaConf.RenovarContratoVigente && window.parent.Habilitado == "0") {
        SoloPlanMayor = window.parent.CampanaConf.SoloRenovarMontoMayor;
    }
    obtenerCampanaActiva();
    obtenerCreditos();
    fnObtenerFinancimientos();
    //obtenerProductos();
    enlacesInicial();

    $("#ddlLugarEntregaPedido").change(function () {
        var dir = $("#ddlLugarEntregaPedido option[value='" + $(this).val() + "']").attr("direc");
        $("#lblDireccionCompleta").text(dir);
    });

    $("#btnCancelarCompra").click(function () {
        $("#capaPopUp").hide();
        $("#dvConfirmCompra").hide();
        $("#Global").show();
    });

    $("#btnAceptarCompra").click(function () {
        $("#capaPopUp").hide();
        $("#dvConfirmCompra").hide();
        $("#Global").show();

        $("#pnlCarrito").css("display", "none");
        $("#pProcesoCompra").css("display", "block");

        if (esEditar) {
            ModificarPedido();
        }
        else {
            registrarPedido();
        }
    });
});

function enlacesInicial() {

    $("#tapProducto").click(function () {
        $(".tap").removeClass("tapSelect");
        $("#tapProducto").addClass("tapSelect");

        $("#detalleTaps > div").css("display", "none");
        $("#pSelecPro").css("display", "block");
    });

    $("#tapCarrito").click(function () {
        //$(window.parent.$("form")[0]).append('<div id="dvWaitJS" style="width:100%;height:100%;position:absolute;left:0px;top:0px;background: rgb(240,240,240);background: rgba(0,0,0,.3);z-index:999999;"><div style=" position:relative;top:50%; left:45%; width:225px; height:50px;padding-bottom:8px;background-image: url(\'../Common/Images/progressbar_load.gif\');background-repeat:no-repeat;background-position: center;font-weight:bolder;color: darkblue;background-color:rgba(200,200,200,.8);border-radius: 10px;padding-left:5px;">Espere por favor...</div></div>')
        //alert("hola");

        $(".tap").removeClass("tapSelect");
        $("#tapCarrito").addClass("tapSelect");

        if (arregloSeleccion.length != 0) {

            var dataSource = new kendo.data.DataSource({
                data: arregloSeleccion
                //data: getDatasourceArregloSeleccion()
            });

            var gridele = $("#gridDetEle").data("kendoGrid");
            gridele.setDataSource(dataSource);

            enlazarClick();
        }

        $("#detalleTaps > div").css("display", "none");
        $("#pDetEle").css("display", "block");

        //if (window.parent.$("#dvWaitJS").length > 0) {
        //    window.parent.$("#dvWaitJS").remove();
        //}
    });

    $("#tapDeclaracion").click(function () {
        $(".tap").removeClass("tapSelect");
        $("#tapDeclaracion").addClass("tapSelect");

        $("#detalleTaps > div").css("display", "none");
        $("#pDeclaracion").css("display", "block");
    });

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
                alert("Debe aceptar las condiciones");
            });
            $('#btnComprarConfirmado').unbind("hover");
        }
    });

    $("#btnComprarConfirmado").click(function () {
        alert("Debe aceptar las condiciones");
    });

    $("#dvMsgAlerta").css("width", "200px");

    $("#btnVolverPedidos").click(function () {
        window.location.href = "PedidoIE.aspx";
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
        //
        //        //alerta(raiz("../Common/Controladores/DescargarArchivo.ashx?archivo=" + resultado.d));
        //        //alert(resultado.d);
        //        window.location.href = "../Common/Controladores/DescargarArchivo.ashx?archivo=" + resultado.d;
        //    },
        //    error: function (xhr, err, thrErr) {
        //        MostrarErrorAjax(xhr, err, thrErr);
        //    }
        //});
    });

    $('.getCondicionesTemrinos').hover(function () {
        $(this).css({ "cursor": "pointer" });
    }, function () {
        $(this).css({ "cursor": "default" });
    });

    $('.EliDetPlan').hover(function () {
        $(this).css({ "cursor": "pointer" });
    }, function () {
        $(this).css({ "cursor": "default" });
    });

    $('#imgVerDetalleFinanciamiento').hover(function () {
        $(this).css({ "cursor": "pointer" });
    }, function () {
        $(this).css({ "cursor": "default" });
    });

    //    $("#pnlDscFinanciamiento").kendoWindow({
    //        width: "700px",
    //        title: "Descripcion financiamiento",
    //        actions: [
    //                "Close"
    //            ],
    //        modal: true,
    //        position: {
    //            top: 0,
    //            left: 0
    //        }
    //    });

    $("#imgVerDetalleFinanciamiento").click(function () {
        fnMostrarDscFinancimiento();
    });

    $("#eliFinan").live("click", function () {
        $("#pnlDscFinanciamiento").css("display", "none");
        $("#Global").css("display", "block");
    });
}
function enlazarClick() {
    /*
    var cboOnTop = $(".cboOnTop");
    var cboPlan = $(".cboPlanes");
    var cbomes = $(".cboMeses");
    var eliminarCarrito = $(".eliEle");
    var dscPlanCombo = $(".dscPlanCombo");

    for (var i = 0; i < cboPlan.length; i++) {

        $(cboPlan[i]).attr("index", i);
        $(cboPlan[i]).attr("id", "cboPlan-"+i.toString());
        $(eliminarCarrito[i]).attr("index", i);
        $(dscPlanCombo[i]).attr("index", i);

        $(cboPlan[i]).kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: obtenerPlanesByIdProducto(arregloSeleccion[i].P_inCod),
            enable: !(arregloSeleccion[i].Accion == "0"),
            open: function (e) {
                var texto = this.text();
                precioPlanAnterior = parseFloat(texto.substring(texto.indexOf("(") + 1, texto.lastIndexOf(")")).replace("S/.", ""));

                debugger;
                if (precioOnTopAnterior != undefined) {
                    var textoOnTop = $($(this.input.parent().parent().parent().parent()).find(".cboOnTop")[2]).data("kendoComboBox").text();
                    precioPlanAnterior = parseFloat(textoOnTop.substring(texto.indexOf("(") + 1, texto.lastIndexOf(")")).replace("S/.", ""));
                }
            },
            change: function (e) {

                var texto = this.text();
                var valorSumar = parseInt(texto.substring(texto.indexOf("(") + 1, texto.lastIndexOf(")")).replace("S/.", ""));

                if (precioPlanAnterior != undefined) {
                    operarInidicadores(0, -(parseInt(precioPlanAnterior)));
                }

                if (validarexcesoBool_monto(0, parseInt(valorSumar))) {

                    operarInidicadores(0, parseFloat(precioPlanAnterior));
                    this.value(valuePlanAnterior);
                    alerta("Usted ha superado su límite de crédito");
                    return;
                }

                if (UsarPlanDep) {
                    var dtPlanesOnTop = obtenerPlanesDependientes($(this)[0]._optionID.split("-")[1].replace("_option_selected", ""), this.value());

                } else {
                    //alert(this.value() + ", " + $(this)[0]._optionID.split("-")[1].replace("_option_selected", ""));
                    var sss = obtenerMesesByPlan(this.value(), $(this)[0]._optionID.split("-")[1].replace("_option_selected", ""));
                    var miDataSourc = new kendo.data.DataSource({
                        data: sss
                    });
                    var miCboMes = $($(this.input.parent().parent().parent().parent()).find(".cboMeses")[2]).data("kendoComboBox");
                    MesContratoAnterior = miCboMes.value();
                    miCboMes.setDataSource(miDataSourc);
                }
                //var index = parseInt($(this.element.context).attr("index"));
                //arregloSeleccion[index].IdPlan = this.value();
                //operarInidicadores(0, valorSumar);

            },
            dataBound: function (e) {
                if (window.parent.NumeroRenovar != undefined && window.parent.FlagMantenerPlan == "True") {
                    this.enable(false);
                }
                this.value(arregloSeleccion[i].IdPlan);
            }
        });

        $(cbomes[i]).attr("index", i);
        $(cbomes[i]).kendoDropDownList({
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

                var id = $(this.element.context).attr("id").split("-")[1].split("_")[0];
                var val = this.value();
                var index = parseInt($(this.element.context).attr("index"));
                var precio = obtenerPrecioEquipoPorMeses(id, val);

                operarInidicadores(-(parseInt(arregloSeleccion[index].Precio)), 0);
                operarInidicadores(parseInt(precio), 0);     

                if (validarexcesoBool_monto(0, 0)) {
                    operarInidicadores(-(parseInt(precio)), 0);   
                    operarInidicadores(parseInt(arregloSeleccion[index].Precio), 0);
                    
                    alert("Usted ha superado su límite de crédito");
                    this.value(MesContratoAnterior);
                    return;
                }

                arregloSeleccion[index].Precio = precio;
                arregloSeleccion[index].NumMeses = val;

                $($("#gridDetEle").find(".tdPrePro")[index]).html("S/. " + precio);

                //nuevos datos
                if (MesesFinanciamientoEquipo != 1) {
                    var precioMensual = precio / MesesFinanciamientoEquipo;
                    var totalMensual = (precio / MesesFinanciamientoEquipo) + arregloSeleccion[index].MinPrecioPlan;
                    $($("#gridDetEle").find(".tdPreMen")[index]).html(formatNumber.newo(precioMensual, "S/. ") + "<br/>(Al mes)");
                    $($("#gridDetEle").find(".tdTotMen")[index]).html(formatNumber.newo(totalMensual, "S/. "));
                }

            },
            dataBound: function (e) {
                if (arregloSeleccion[i].NumMeses != 0) {
                    this.value(arregloSeleccion[i].NumMeses);
                }

                //nuevos datos
                if (MesesFinanciamientoEquipo != 1) {
                    var precioMensual = precio / MesesFinanciamientoEquipo;
                    var totalMensual = (precio / MesesFinanciamientoEquipo) + arregloSeleccion[parseInt(fila[0].rowIndex)].MinPrecioPlan;
                    $($("#gridDetEle").find(".tdPreMen")[index]).html(formatNumber.newo(precioMensual, "S/. ") + "<br/>(Al mes)");
                    $($("#gridDetEle").find(".tdTotMen")[index]).html(formatNumber.newo(totalMensual, "S/. "));
                }
            }
        });
    }
    */

    var eliminarCarrito = $(".eliEle");
    var dscPlanCombo = $(".dscPlanCombo");

    var cboOnTop = $(".cboOnTop");
    var cboPlan = $(".cboPlanes");
    var cbomes = $(".cboMeses");
    boolEnlazarClick = 1;

    for (var i = 0; i < cboPlan.length; i++) {
        $(eliminarCarrito[i]).attr("index", i);
        $(dscPlanCombo[i]).attr("index", i);

        $(cboPlan[i]).kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: UsarPlanDep ? obtenerPlanesBase(arregloSeleccion[i].P_inCod) : obtenerPlanesByIdProducto(arregloSeleccion[i].P_inCod),
            //filter: "contains",
            //suggest: true,
            //index: 0,
            //enable: !(arregloSeleccion[i].Accion == "0"),
            open: function (e) {
                precioPlanAnterior = this.dataItem().precio;
                valuePlanAnterior = this.value();
                precioOnTopAnterior = $($($(this.element.context).parent().parent().parent().parent()).find(".cboOnTop")[1]).data("kendoDropDownList").dataItem().precio;

                //if (precioOnTopAnterior != undefined) {
                //    //precioPlanAnterior = parseFloat($($(this.input.parent().parent().parent().parent()).find(".cboOnTop")[2]).data("kendoComboBox").dataItem().precio);
                //    precioPlanAnterior = $($($(this.element.context).parent().parent().parent().parent()).find(".cboOnTop")[1]).data("kendoDropDownList").dataItem().precio;
                //}
                //valueOnTopAnterior = this.value();
            },
            change: function (e) {
                var valorSumar = this.dataItem().precio;

                if (UsarPlanDep) {
                    //var fila = this.input.parent().parent().parent().parent();
                    var fila = $(this.element.context).parent().parent().parent().parent();

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

                    if (arregloSeleccion[parseInt(fila[0].rowIndex)].ObligPlanDep == 'True') {
                        //no existe plan dependiente ninguno //idPlan de arreglo debe ser un plan dependiente
                        arregloSeleccion[parseInt(fila[0].rowIndex)].IdPlan = dtPlanesOnTop[0].value;
                    } else {
                        arregloSeleccion[parseInt(fila[0].rowIndex)].IdPlan = $(this)[0]._selectedValue;
                    }
                    //cargar ontop

                    var miDataPlanOnTop = new kendo.data.DataSource({
                        data: dtPlanesOnTop
                    });
                    var miCboOnTop = $($($(this.element.context).parent().parent().parent()).find(".cboOnTop")[1]).data("kendoDropDownList");
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
                    var miCboMes = $($($(this.element.context).parent().parent().parent().parent()).find(".cboMeses")[1]).data("kendoDropDownList");
                    MesContratoAnterior = miCboMes.value();
                    miCboMes.setDataSource(miDataSourc);
                }
            },
            //value: obtenerPlanBase(arregloSeleccion[i].IdPlan),
            //select: function (e) {
            //    var texto = e.item.context.innerHTML;
            //    if (texto.length > 40) {
            //        var texto1 = texto.substring(0, 30);
            //        var texto2 = texto.substring(texto.indexOf("("));
            //        e.sender._text = function () { return texto1 + "... " + texto2; };
            //    }
            //},
            dataBound: function (e) {
                //var texto = this.text();
                //if (texto.length > 40) {
                //    var texto1 = texto.substring(0, 30);
                //    var texto2 = texto.substring(texto.indexOf("("));
                //    e.sender._text = function () { return texto1 + "... " + texto2 };
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
        if (UsarPlanDep) {
            $(cboOnTop[i]).attr("index", i);
            $(cboOnTop[i]).kendoDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: obtenerPlanesDependientes(arregloSeleccion[i].P_inCod, obtenerPlanBase(arregloSeleccion[i].IdPlan)),
                //filter: "contains",
                //suggest: true,
                //index: 0,
                //enable: !(arregloSeleccion[i].Accion == "0"),
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
                    var miCboMes = $($($(this.element.context).parent().parent().parent().parent()).find(".cboMeses")[1]).data("kendoDropDownList");
                    MesContratoAnterior = miCboMes.value();
                    miCboMes.setDataSource(miDataSourc);
                },
                //select: function (e) {
                //    var texto = e.item.context.innerHTML;
                //    if (texto.length > 30) {
                //        var texto1 = texto.substring(0, 20);
                //        var texto2 = texto.substring(texto.indexOf("("));
                //        e.sender._text = function () { return texto1 + "... " + texto2; };
                //    } else {
                //        e.sender._text = function () { return texto; };
                //    }
                //},
                dataBound: function (e) {
                    //var texto = this.text();
                    //if (texto.length > 30) {
                    //    var texto1 = texto.substring(0, 20);
                    //    var texto2 = texto.substring(texto.indexOf("("));
                    //    e.sender._text = function () { return texto1 + "... " + texto2 };
                    //}
                    if (window.parent.NumeroRenovar != undefined && window.parent.FlagMantenerPlan == "True") {
                        this.enable(false);
                    }
                    //this.value(arregloSeleccion[i].IdPlan);

                    var index = parseInt($(this.element.context).attr("index"));
                    //var fila = this.input.parent().parent().parent().parent().parent();
                    this.value(arregloSeleccion[index].IdPlan);

                    //cargar meses
                    //var miCboMes = $($(this.input.parent().parent().parent().parent()).find(".cboMeses")[2]).data("kendoComboBox");
                    var miCboMes = $($($(this.element.context).parent().parent().parent().parent()).find(".cboMeses")[1]).data("kendoDropDownList");
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
            //$(cboOnTop[i]).data("kendoComboBox").input.attr("ReadOnly", true);            
        }
        $(cbomes[i]).kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: obtenerMesesByPlan($(cboPlan[i])[0].value, arregloSeleccion[i].P_inCod),
            //filter: "contains",
            //suggest: true,
            //index: 0,
            //enable: !(arregloSeleccion[i].Accion == "0"),
            open: function (e) {
                MesContratoAnterior = this.value();
            },
            change: function (e) {
                var id = $(this)[0]._optionID.split("-")[1].split("_")[0];
                var val = $(this)[0]._selectedValue;
                //var miIdPlan = $($(this.input.parent().parent().parent().parent()).find(".cboPlanes")[2]).data("kendoComboBox").value();
                var miIdPlan = $($($(this.element.context).parent().parent().parent().parent()).find(".cboOnTop")[1]).data("kendoDropDownList").value();

                //var precio = obtenerPrecioEquipoPorMeses(id, val);
                var precio = obtenerPrecioEquipoPorMeses_yPlan(id, val, miIdPlan);

                var fila = $(this.element.context).parent().parent().parent();

                //RestarCreduti(parseInt(arregloSeleccion[parseInt(fila[0].rowIndex)].Precio), $(fila[0]).find(".eliEle")[0]); GEIG

                operarInidicadores(-(parseFloat(arregloSeleccion[parseInt(fila[0].rowIndex)].Precio)), 0, arregloSeleccion[parseInt(fila[0].rowIndex)].CuotasEquipo);
                operarInidicadores(parseFloat(precio), 0, arregloSeleccion[parseInt(fila[0].rowIndex)].CuotasEquipo);

                if (validarexcesoBool_monto(0, 0)) {
                    operarInidicadores(-(parseFloat(precio)), 0, arregloSeleccion[parseInt(fila[0].rowIndex)].CuotasEquipo);
                    operarInidicadores(parseFloat(arregloSeleccion[parseInt(fila[0].rowIndex)].Precio), 0, arregloSeleccion[parseInt(fila[0].rowIndex)].CuotasEquipo);

                    alerta("Usted ha superado su límite de crédito");
                    this.value(MesContratoAnterior);
                    return;
                }

                arregloSeleccion[parseInt(fila[0].rowIndex)].Precio = precio;
                arregloSeleccion[parseInt(fila[0].rowIndex)].NumMeses = val;

                //AumentarCredutiByRef(parseInt(arregloSeleccion[parseInt(fila[0].rowIndex)].Precio), $(fila[0]).find(".eliEle")[0]);GEIG
                //AumentarCreduti(parseInt(arregloSeleccion[parseInt(fila[0].rowIndex)].Precio), parseInt(arregloSeleccion[parseInt(fila[0].rowIndex)].MinPrecioPlan));

                $(fila[0]).find(".tdPrePro").html("S/. " + precio);
                $($($("#totalesCarrito > div")[0]).find("span")[0]).text(formatNumber.newo(productoPrecioTotal(), "S/. "));

                //nuevos datos
                if (MesesFinanciamientoEquipo != 1) {
                    var precioMensual = precio / arregloSeleccion[parseInt(fila[0].rowIndex)].CuotasEquipo;
                    var totalMensual = (precio / arregloSeleccion[parseInt(fila[0].rowIndex)].CuotasEquipo) + arregloSeleccion[parseInt(fila[0].rowIndex)].MinPrecioPlan;
                    $(fila[0]).find(".tdPreMen").html(formatNumber.newo(precioMensual, "S/. ") + "<br/>(Al mes)");
                    $(fila[0]).find(".tdTotMen").html(formatNumber.newo(totalMensual, "S/. "));
                }
                //                validarexceso(); GEIG
                //                validarexcesoPlan();
            },
            dataBound: function (e) {
                if (boolEnlazarClick == 1) {
                    if (arregloSeleccion[i].NumMeses != 0) {
                        this.value(arregloSeleccion[i].NumMeses);
                    }
                    $($($("#totalesCarrito > div")[0]).find("span")[0]).text(formatNumber.newo(productoPrecioTotal(), "S/. "));
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
                        miIdPlan = $($($(this.element.context).parent().parent().parent()).find(".cboPlanes")[1]).data("kendoDropDownList").value();
                    } else {
                        miIdPlan = $($($(this.element.context).parent().parent().parent()).find(".cboOnTop")[1]).data("kendoDropDownList").value();
                    }
                    //var precio = obtenerPrecioEquipoPorMeses(id, val);
                    var precio = obtenerPrecioEquipoPorMeses_yPlan(id, val, miIdPlan);


                    //var fila = $(this.element.context).parent().parent().parent().parent();
                    var fila = $(this.element.context).parent().parent().parent();

                    operarInidicadores(-(parseFloat(arregloSeleccion[parseInt(fila[0].rowIndex)].Precio)), 0, arregloSeleccion[parseInt(fila[0].rowIndex)].CuotasEquipo);
                    operarInidicadores(parseFloat(precio), 0, arregloSeleccion[parseInt(fila[0].rowIndex)].CuotasEquipo);

                    if (validarexcesoBool_monto(0, 0)) {
                        operarInidicadores(-(parseFloat(precio)), 0, arregloSeleccion[parseInt(fila[0].rowIndex)].CuotasEquipo);
                        operarInidicadores(parseFloat(arregloSeleccion[parseInt(fila[0].rowIndex)].Precio), 0, arregloSeleccion[parseInt(fila[0].rowIndex)].CuotasEquipo);

                        operarInidicadores(0, parseFloat(precioOnTopAnterior));
                        if (!UsarPlanDep) {
                            $($($(this.element.context).parent().parent().parent().parent()).find(".cboPlanes")[1]).data("kendoDropDownList").value(valuePlanAnterior);
                        } else {
                            $($($(this.element.context).parent().parent().parent().parent()).find(".cboOnTop")[1]).data("kendoDropDownList").value(valueOnTopAnterior);
                        }
                        var sss = obtenerMesesByPlan(valuePlanAnterior, id);
                        var miDataSourc = new kendo.data.DataSource({
                            data: sss
                        });
                        var miCboMes = $($($(this.element.context).parent().parent().parent().parent()).find(".cboMeses")[1]).data("kendoDropDownList");
                        boolEnlazarClick = 2;
                        miCboMes.setDataSource(miDataSourc);

                        alerta("Usted ha superado su límite de crédito");
                        //this.value(MesContratoAnterior);
                        return;
                    }

                    arregloSeleccion[parseInt(fila[0].rowIndex)].Precio = precio;
                    arregloSeleccion[parseInt(fila[0].rowIndex)].NumMeses = val;
                    arregloSeleccion[parseInt(fila[0].rowIndex)].IdPlan = miIdPlan;
                    if (!UsarPlanDep) {
                        arregloSeleccion[parseInt(fila[0].rowIndex)].MinPrecioPlan = parseFloat($($($(this.element.context).parent().parent().parent()).find(".cboPlanes")[1]).data("kendoDropDownList").dataItem().precio);
                        operarInidicadores(0, parseFloat($($($(this.element.context).parent().parent().parent()).find(".cboPlanes")[1]).data("kendoDropDownList").dataItem().precio));
                    } else {
                        arregloSeleccion[parseInt(fila[0].rowIndex)].MinPrecioPlan = parseFloat($($($(this.element.context).parent().parent().parent()).find(".cboOnTop")[1]).data("kendoDropDownList").dataItem().precio);
                        operarInidicadores(0, parseFloat($($($(this.element.context).parent().parent().parent()).find(".cboOnTop")[1]).data("kendoDropDownList").dataItem().precio));
                    }

                    $(fila[0]).find(".tdPrePro").html("S/. " + precio);
                    $($($("#totalesCarrito > div")[0]).find("span")[0]).text(formatNumber.newo(productoPrecioTotal(), "S/. "));

                    //nuevos datos
                    if (MesesFinanciamientoEquipo != 1) {
                        var precioMensual = precio / arregloSeleccion[parseInt(fila[0].rowIndex)].CuotasEquipo;
                        var totalMensual = (precio / arregloSeleccion[parseInt(fila[0].rowIndex)].CuotasEquipo) + arregloSeleccion[parseInt(fila[0].rowIndex)].MinPrecioPlan;
                        $(fila[0]).find(".tdPreMen").html(formatNumber.newo(precioMensual, "S/. ") + "<br/>(Al mes)");
                        $(fila[0]).find(".tdTotMen").html(formatNumber.newo(totalMensual, "S/. "));
                    }
                }

            }
        });
        //$(cboPlan[i]).data("kendoComboBox").input.attr("ReadOnly", true);        
        //$(cbomes[i]).data("kendoComboBox").input.attr("ReadOnly", true);
    }

    $(".dscPlanCombo").click(function () {
        //var idPlan = $($(this).parent().find(".cboPlanes")[2]).data("kendoDropDownList").value();
        //var index = parseInt($(this).attr("index"));
        //var idPlan = $("#cboPlan-" + index.toString()).data("kendoDropDownList").value();
        var idPlan = $($(this).parent().parent().find(".cboPlanes")[1]).data("kendoDropDownList").value();

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
                $("#lblMonto").text("S/. " + planes.dcMon.toFixed(2));
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
        $("#pnlticket").css("display", "block");
        $("#capaPopUp").show();
    });

    $(".EliDetPlan").click(function () {
        $("#capaPopUp").hide();
        $("#pnlticket").hide();
    });

    $(".eliEle").click(function () {
        $("#detalleEliminar").css("display", "none");

        var index = parseInt($(this).attr("index"));
        //var texto = $($(".cboPlanes")[index]).text();
        //var precioPlan = parseInt(texto.substring(texto.indexOf("(") + 1, texto.lastIndexOf(")")).replace("S/.", ""));
        var precioPlan;
        if (!UsarPlanDep) {
            precioPlan = $($($(this).parent().parent()).find(".cboPlanes")[1]).data("kendoDropDownList").dataItem().precio;
        } else {
            precioPlan = $($($(this).parent().parent()).find(".cboOnTop")[1]).data("kendoDropDownList").dataItem().precio;
        }

        operarInidicadores(-(parseFloat(arregloSeleccion[index].Precio)), -(precioPlan), arregloSeleccion[index].CuotasEquipo);

        if (arregloSeleccion[index].Accion == "0") {
            var eli = arregloSeleccion.splice(index, 1);
            arregloEli.push(eli);
        }
        else {
            arregloSeleccion.splice(index, 1);
        }

        actualizarIndicadores();

        $($("#gridDetEle").find("tr")[index]).css("display", "none");

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


    });

    $(".dscPlanCombo").hover(function () {
        $(this).mousemove(function (e) {
            $("#detallePlan").css({ "left": e.pageX + 20, "top": e.pageY, "display": "block" });
        });
    }, function () {
        $("#detallePlan").css("display", "none");
    });

    $(".eliEle").hover(function () {
        $(this).mousemove(function (e) {
            $("#detalleEliminar").css({ "left": e.pageX + 20, "top": e.pageY, "display": "block" });
        });
    }, function () {
        $("#detalleEliminar").css("display", "none");
    });

    boolEnlazarClick = 0;
}

function obtenerCampanaActiva() {
    //    $.ajax({
    //        type: "POST",
    //        url: "Pedido.aspx/obtenerCampanaActivaConf",
    //        data: "{'prIdCliente': '" + "0" + "'}",
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function (resultado) {
    campanaActiva = window.parent.CampanaConf;

    var fechaInicio = new Date(parseInt(campanaActiva["FechaInicio"].substring(6, 19)));
    var fechaFin = new Date(parseInt(campanaActiva["FechaFin"].substring(6, 19)));
    var fechaActual = new Date(parseInt(campanaActiva["FechaActual"].substring(6, 19)));

    strFechaInicio = dias[fechaInicio.getDay()] + ', ' + fechaInicio.getDate() + ' de ' + meses[fechaInicio.getMonth()] + ' del ' + fechaInicio.getFullYear();
    strfechaFin = dias[fechaFin.getDay()] + ', ' + fechaFin.getDate() + ' de ' + meses[fechaFin.getMonth()] + ' del ' + fechaFin.getFullYear();
    //var strFechaActual = dias[fechaActual.getDay()] + ', ' + fechaActual.getDate() + ' de ' + meses[fechaActual.getMonth()] + ' del ' + fechaActual.getFullYear();

    var FormatNewFechaI = dias[fechaInicio.getDay()] + ', ' + fechaInicio.getDate() + '/' + MesesEnteros[fechaInicio.getMonth()] + '/' + fechaInicio.getFullYear();
    var FormatNewFechaF = dias[fechaFin.getDay()] + ', ' + fechaFin.getDate() + '/' + MesesEnteros[fechaFin.getMonth()] + '/' + fechaFin.getFullYear();
    var strFechaActual = dias[fechaActual.getDay()] + ', ' + fechaActual.getDate() + '/' + MesesEnteros[fechaActual.getMonth()] + '/' + fechaActual.getFullYear();

    $("#tablaDscCampana tbody").append("<tr><td class='subtitulo' >Campaña</td><td>" + campanaActiva["Descripcion"].toString() + "</td></tr>");
    $("#tablaDscCampana tbody").append("<tr><td class='subtitulo'>Fecha Inicio</td><td>" + FormatNewFechaI + "</td></tr>");
    $("#tablaDscCampana tbody").append("<tr><td class='subtitulo'>Fecha Fin</td><td>" + FormatNewFechaF + "</td></tr>");

    if (window.parent.NumeroRenovar != undefined)
        $("#tablaDscCampana tbody").append("<tr><td class='subtitulo'>Numero Renovar</td><td class='subtitulo'>" + window.parent.NumeroRenovar.toString() + "</td></tr>");

    $("#declaracionFechaActual").text(strFechaActual);
    //obtenerCreditos();

    //        },
    //        error: function (xhr, err, thrErr) {
    //            MostrarErrorAjax(xhr, err, thrErr);
    //        }
    //    });
}

function obtenerCreditos() {
    //    $.ajax({
    //        type: "POST",
    //        url: "Dashboard_pedido.aspx/mostrarProductoCreditoAsignado",
    //        data: "{'prIdEmpleado': '" + $("#hdfEmpleado").val() + "'}",
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function (resultado) {
    //            var creditos = resultado.d;
    creditos = CreditoUsuario;

    $.each(creditos.ProductoCreditoAsignado, function (i, val) {
        var porc = parseInt(val["Utilizado"] / val["Aprobado"] * 100);

        $("#tablaInidicador tbody").append("<tr><td class='subtitulo'>" + val["DescripcionProducto"].toString() +
        "</td><td>" + formatNumber.newo(val["Aprobado"], "S/. ").toString() +
        "</td><td>" + formatNumber.newo(val["Utilizado"], "S/. ").toString() +
        "</td><td>" + formatNumber.newo(val["Disponible"], "S/. ").toString() +
        "</td><td>" + porc.toString() + " % " +
        "</td></tr>");

        indicadoresInicial.push(new miIndicadorCredito(val["DescripcionProducto"].toString(), parseFloat(val["Aprobado"]), parseFloat(val["Disponible"]), parseFloat(val["Utilizado"])
        ));

        indicadoresVariante.push(new miIndicadorCredito(val["DescripcionProducto"].toString(), parseFloat(val["Aprobado"]), parseFloat(val["Disponible"]), parseFloat(val["Utilizado"])
        ));
    });
    //obtenerProductos();

    if (window.parent.NumeroRenovar != undefined) {
        operarInidicadores(0, -(parseFloat(window.parent.PrecioPlanNumeroRenovar)));
    }

    //$("#generalCarrito").fadeIn(300, null, function () { $(".k-grid-header", "#pSelecPro").css({ "float": "left !important" }); });
    //indicadores = resul;

    //        },
    //        error: function (xhr, err, thrErr) {
    //            MostrarErrorAjax(xhr, err, thrErr);
    //        }
    //    });
}

function obtenerProductos() {

    $.ajax({
        type: "POST",
        //url: "Pedido.aspx/ObtenerProductosCampanaEmpleado",
        url: "Pedido.aspx/ObtenerProductosCampanaEmpleadoByPedido",
        data: "{'IdEmpleado' : '" + $("#hdfEmpleado").val() + "'," +
                "'IdCampana': '" + window.parent.CampanaConf.IdCampana + "'," +
                "'pWhere': ''}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            productosBase = JSON.parse(resultado.d);

            for (var i = 0; i < productosBase.length; i++) {

                if (window.parent.FlagMantenerPlan != undefined && window.parent.FlagMantenerPlan == "True" && window.parent.IdPlanNumeroRenovar != productosBase[i].idPlan) {
                    continue;
                }

                if (i == 0) {
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
                    productosBase[i].PrercioPlan));
                    continue;
                }

                var entro = false;
                for (var z = 0; z < productos.length; z++) {
                    if (productos[z].P_inCod == productosBase[i].P_inCod) {
                        entro = true;
                        break;
                    }
                }
                if (entro)
                    continue;

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
                productosBase[i].PrercioPlan));
            }

            var AltoGrilla = 0;
            AltoGrilla = $(window).height() - 230;
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
                    pageSize: 50
                },
                dataBound: onDataBound,
                groupable: false,
                sortable: false,
                navigatable: true,
                //pageable: {
                //    refresh: true,
                //    pageSizes: true,
                //    messages: {
                //        itemsPerPage: "ítems por página",
                //        display: "{0}-{1} de {2} ítems",
                //        empty: ""
                //    }
                //},
                rowTemplate: kendo.template($("#rowTemplateCarrito").html()),
                altRowTemplate: kendo.template($("#altRowTemplateCarrito").html()),
                height: AltoGrilla,
                columns: [
                    { field: "foto", width: "10%", title: "Producto" },
                    { field: "detalles", width: "40%", title: "Detalles" },
                    { field: "Stock", width: "10%", title: "Stock", attributes: { style: "text-align:center;" } },
                    { field: "Precio", width: "15%", title: "Precio Desde", attributes: { style: "text-align:right;" } },
                    { field: "Comprar", width: "20%", title: "Comprar", attributes: { style: "text-align:right;" } }
                ]
            });
            $(".k-grid-header", "#pSelecPro").css({ "float": "left !important" });

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

                        }

                        $("#CarritoCantidad").text(arregloSeleccion.length.toString());
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });

            }

            //            if ($("#hdfEsDirecto").val() == "1") {
            //    
            //                $("#generalPedido").hide(0, function () {

            //                    $(".tap").hide();
            //                    $("#tapProducto").show();
            //                    $("#tapCarrito").show();
            //                    $("#tapDeclaracion").show();
            //                    $("#tapProducto").addClass("tapSelect");
            //                    $("#pSelecPro").show();
            //                    $("#pPanelCarrito").show();
            //                    $("#pDetEle").hide();
            //                    $("#pProcesoCompra").hide();
            //                    arregloSeleccion = [];
            //                    arregloEli = [];

            //                    obtenerCreditos();
            //                    
            //                });
            //                
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
            //fnObtenerFinancimientos();
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function onDataBound() {

    $(".subirCarrito").click(function () {

        if (window.parent.NumeroRenovar != undefined) {
            if (arregloSeleccion.length == 1) {
                alert("Usted sólo puede elegir un equipo al renovar con número");
                return;
            }
        }

        if (validarexcesoBool()) {
            alert("Usted ha superado su límite de crédito");
            return;
        }

        var cant = $($($(this).parent()).find("input")[0]).val();
        cant = parseInt(cant.split(' ')[0].toString());


        if ((arregloSeleccion.length + cant) > 30) {
            alert("Usted ha superado el número de ítems a comprar");
            return;
        }

        var id = $.trim($($($(this).parent()).find("div")[1]).text());
        //var stock = parseInt($($(this).parent().parent()).find(".Stock")[0]["innerText"]);
        var stock = parseInt($($($(this).parent().parent()).find(".Stock")[0]).text());
        stock = stock - parseInt(obtenerStockSelecionado(id));
        if (stock < 1) {
            alert("Producto seleccionado no tiene stock disponible");
            return;
        }

        if (cant == 0) {
            alert("Ingrese una cantidad correcta");
            $($($(this).parent()).find("input")[0]).val('1');
            $($($(this).parent()).find("input")[0]).focus();
            return;
        }

        if (cant > stock) {
            alert("La cantidad ingresada no puede ser <br>mayor al stock disponible.");
            $($($(this).parent()).find("input")[0]).val('1');
            $($($(this).parent()).find("input")[0]).focus();
            return;
        }

        //AumentarCreduti(parseInt(obtenerProducto(id).Precio));

        for (var i = 0; i < cant; i++) {
            var pro = obtenerProducto(id);
            if (validarexcesoBool_monto(parseFloat(pro.Precio), parseFloat(pro.MinPrecioPlan), pro.IdGama)) {
                alert("Usted ha superado su límite de crédito");
                return;
            }
            arregloSeleccion.push(pro);
            operarInidicadores(parseFloat(pro.Precio), parseFloat(pro.MinPrecioPlan), pro.CuotasEquipo);
        }

        //if (ArregloSeleccion_length() > 0) {

        //        if (arregloSeleccion.length > 0) {
        //            validarexceso();
        //            validarexcesoPlan();
        //            aumentarBurbuja();
        //        }
    });

    //    $(".gridImaCar img").click(function () {
    //        mostrarDescPro(this);
    //    });

    if (window.parent.NumeroRenovar != undefined) {
        $(".txtCantidadDetalle").prop("disabled", true);
    }

    var t = $(this.tbody).find("tr");

    for (var i = 0; i < t.length; i++) {

        if ($.trim($($(t[i]).find(".Stock")[0]).text()) == "0") {
            $($(t[i]).find(".subirCarrito")[0]).css("display", "none");
            $($(t[i]).find(".txtCantidadDetalle")[0]).css("display", "none");
        }

    }

}

//----------------OBJETOS------------
function MiProducto(_P_inCod, _vcNom, _imIma, _vcDes, _Precio, _CantidadTotal, _CantidadUsada, _CantidadDisponible, _Reservable, _IdGama, _ObligPlanDep, _PrercioPlan) {

    var meses = MesesFinanciamientoEquipo;
    if (_IdGama == '9') {
        meses = MesesFinanciamientoChip;
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
    this.PrecioEquiDesc = meses == 1 ? formatNumber.newo(_Precio, "S/.") : formatNumber.newo((_Precio / meses), "S/.") + " (Al mes)";
    this.IdGama = _IdGama;
    this.ObligPlanDep = _ObligPlanDep == null || _ObligPlanDep == undefined ? "False" : _ObligPlanDep;
    this.PrercioPlan = _PrercioPlan;
}

function MiProductoElegido(_P_inCod, _vcNom, _imIma, _vcDes, _Precio, _CantidadTotal, _CantidadUsada, _CantidadDisponible, _Reservable, _Idplan, _NumMeses, _minPrecioPlan, _IdGama, _ObligPlanDep, _PrercioPlan) {

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
    this.CuotasEquipo = _IdGama == '9' ? MesesFinanciamientoChip : MesesFinanciamientoEquipo;
    this.ObligPlanDep = _ObligPlanDep;
    this.PrercioPlan = _PrercioPlan;
}

function miIndicadorCredito(_descripcion, _aprobado, _disponible, _utilizado) {

    this.Descripcion = _descripcion;
    this.Aprobado = _aprobado;
    this.Disponible = _disponible;
    this.Utilizado = _utilizado;

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
//-----------------------------------

//funciones genericas
function operarInidicadores(montoEquipo, montoPlan, cuotas) {
    if (MesesFinanciamientoEquipo == 1) {
        indicadoresVariante[0]["Disponible"] = parseFloat(indicadoresVariante[0]["Disponible"] - montoEquipo);
        indicadoresVariante[0]["Utilizado"] = parseFloat(indicadoresVariante[0]["Utilizado"] + montoEquipo);

        indicadoresVariante[1]["Disponible"] = parseFloat(indicadoresVariante[1]["Disponible"] - montoPlan);
        indicadoresVariante[1]["Utilizado"] = parseFloat(indicadoresVariante[1]["Utilizado"] + montoPlan);
    } else {
        if (cuotas != undefined && cuotas != null && cuotas != 0) {
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

    for (var i = 0; i < indicadoresVariante.length; i++) {
        var porc = parseInt(indicadoresVariante[i]["Utilizado"] / indicadoresVariante[i]["Aprobado"] * 100);

        $($($("#tablaInidicador tbody tr")[i]).find("td")[1]).text(formatNumber.newo(indicadoresVariante[i]["Aprobado"], "S/. ").toString());
        $($($("#tablaInidicador tbody tr")[i]).find("td")[2]).text(formatNumber.newo(indicadoresVariante[i]["Utilizado"], "S/. ").toString());
        $($($("#tablaInidicador tbody tr")[i]).find("td")[3]).text(formatNumber.newo(indicadoresVariante[i]["Disponible"], "S/. ").toString());
        $($($("#tablaInidicador tbody tr")[i]).find("td")[4]).text(porc.toString() + " %");

        $("#CarritoCantidad").text(arregloSeleccion.length.toString());
    }

}

function obtenerProducto(id) {
    for (var i = 0; i < productos.length; i++) {
        if (productos[i].P_inCod == id) {
            var pro = productos[i];
            //var idPrecio = obtenerPrecioMinimoPlan(pro.P_inCod).split("|");
            //var miPrecio = obtenerPrecioEquipoPorMeses_yPlan(id, idPrecio[2], idPrecio[1]);
            //return new MiProductoElegido(pro.P_inCod, pro.vcNom, pro.imIma, pro.vcDes, miPrecio, pro.CantidadTotal, pro.CantidadUsada, pro.CantidadDisponible, pro.Reservable, idPrecio[1], idPrecio[2], parseInt(idPrecio[0]), pro.IdGama, pro.ObligPlanDep);

            var _precios = obtenerPrecioSegunCredito(pro.P_inCod).split("|"); //precioPlan + "|" + id + "|" + meses + "|" + precioEquipo;
            return new MiProductoElegido(pro.P_inCod, pro.vcNom, pro.imIma, pro.vcDes, _precios[3], pro.CantidadTotal, pro.CantidadUsada, pro.CantidadDisponible, pro.Reservable, _precios[1], _precios[2], parseFloat(_precios[0]), pro.IdGama, pro.ObligPlanDep, pro.PrercioPlan);
        }
    }
}

function obtenerPrecioMinimoPlan(IdProducto) {
    var precioMin;
    var id;
    var meses;
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
                    if (window.parent.IdPlanNumeroRenovar == productosBase[i].idPlan) {
                        precioMin = productosBase[i].PrercioPlan;
                        id = productosBase[i].idPlan;
                        meses = productosBase[i].MesesContrato;
                        return precioMin + "|" + id + "|" + meses;
                    }
                }
            }



            if (precioMin == undefined) {
                precioMin = productosBase[i].PrercioPlan;
                id = productosBase[i].idPlan;
                meses = productosBase[i].MesesContrato;
            }
            else {
                if (parseFloat(precioMin) > parseFloat(productosBase[i].PrercioPlan)) {
                    precioMin = productosBase[i].PrercioPlan;
                    id = productosBase[i].idPlan;
                    meses = productosBase[i].MesesContrato;
                }
            }
        }
    }
    return precioMin + "|" + id + "|" + meses;
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

function obtenerPlanesByIdProducto(IdProducto) {
    var planes = [];

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
                        if (window.parent.IdPlanNumeroRenovar == productosBase[i].idPlan) {
                            return [new miPlan(productosBase[i].DscPlan + " (S/." + productosBase[i].PrercioPlan + ")", productosBase[i].idPlan)];
                        }
                    }
                }

                if (planes.length == 0) {
                    planes.push(new miPlan(productosBase[i].DscPlan + " (S/." + productosBase[i].PrercioPlan + ")", productosBase[i].idPlan));
                    continue;
                }

                var entro = false;
                for (var k = 0; k < planes.length; k++) {
                    if (productosBase[i].idPlan == planes[k].value) {
                        entro = true;
                        break;
                    }
                }
                if (entro)
                    continue;

                planes.push(new miPlan(productosBase[i].DscPlan + " (S/." + productosBase[i].PrercioPlan + ")", productosBase[i].idPlan));

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
                if (entro)
                    continue;

                meses.push(new misMesesContrato(productosBase[i].MesesContrato, productosBase[i].MesesContrato));

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

function obtenerPrecioPlanPorIdPlan(IdPlan) {
    for (var i = 0; i < productosBase.length; i++) {
        if (productosBase[i].idPlan == IdPlan) {
            return productosBase[i].PrercioPlan;
        }
    }
}
//---------------------------------------

//------COMPRAR-----------------------------

function procesarPedido() {

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

        if (vCodLugarEntrega_Ori != $("#ddlLugarEntregaPedido").val()) {
            edit = true;
        }

        if (!edit) {
            alert("Usted no a modificado su pedido");
            return;
        }

    }


    if (arregloSeleccion.length == 0) {
        alert("Usted no tiene productos en el carrito de compras");
        return;
    }

    if (validarexcesoBool_monto(0, 0)) {
        alert("Usted a sobrepasado su límite de crédito, verifique su carrito de compras");
        return;
    }

    if ($("#ddlFinanciamiento").val() == '-1') {
        alerta("Seleccione un tipo de financiamiento");
        return;
    }

    if ($("#ddlLugarEntregaPedido").val() == '-1') {
        alerta("Seleccione un Lugar de Entrega.");
        return;
    }
    if ($("#ddlLugarEntregaPedido").val() == '-2') {
        alerta("No puede generar el pedido porque no existe ningún lugar de entrega.");
        return;
    }

    $("#capaPopUp").show();
    $("#dvConfirmCompra").show();
    $("#Global").hide();

    //confirma("¿Esta usted seguro de enviar el pedido?<br>", "Compra de productos", function (a) {
    //    if (a == "Aceptar") {
    //             
    //        $("#pnlCarrito").css("display", "none");
    //        $("#pProcesoCompra").css("display", "block");
    //
    //        if (esEditar) {
    //            ModificarPedido();
    //        }
    //        else {
    //            registrarPedido();
    //        }
    //
    //    }
    //});
}

function ModificarPedido() {
    if (arregloSeleccion.length == 0) {
        alerta("Agregue productos a su carrito de compras por favor");
        return;
    }

    var miNumero = window.parent.NumeroRenovar;

    if (miNumero == undefined) {
        miNumero = "Nueva Linea";
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
        url: "Pedido.aspx/editarPedido",
        data: "{'prIdEmpleado': '" + $("#hdfEmpleado").val() + "'," +
                "'pIdCampana': '" + window.parent.CampanaConf.IdCampana + "'," +
                "'pIdPedido': '" + $("#hdfIdPedidoEditar").val() + "'," +
                "'prIdTipoFinanciamiento': '" + $("#ddlFinanciamiento").val() + "'," +
                "'prIdOficina': '" + $("#ddlLugarEntregaPedido").val() + "'," +
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
                alert(resultado.d);
                return;
            }

            if (resultado.d == "ERROR AL AGREGAR PRODUCTO") {
                alert(resultado.d);
                return;
            }

            var resul = JSON.parse(resultado.d);
            var verAdquiridos = false;
            var verNoAdquiridos = false;

            var contAdquirido = 0;
            var contNoAdquirido = 0;

            var sumAdEquipos = 0;
            var sumNoAdEquipos = 0;
            var sumAdPlan = 0;
            var sumNoPlan = 0;

            for (var i = 0; i < resul.length; i++) {

                if (resul[i].Estado == "Equipos adquiridos") {
                    verAdquiridos = true;
                    contAdquirido = contAdquirido + 1;
                    sumAdEquipos = sumAdEquipos + parseFloat(resul[i].PrecioEquipo);
                    sumAdPlan = sumAdPlan + parseFloat(resul[i].PrecioPlan);

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
                    sumNoAdEquipos = sumNoAdEquipos + parseFloat(resul[i].PrecioEquipo);
                    sumNoPlan = sumNoPlan + parseFloat(resul[i].PrecioPlan);

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

function registrarPedido() {

    var XML_AGREGAR = '<?xml version="1.0" encoding="iso-8859-1"?><TABLE>';

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
        url: "Pedido.aspx/registrarPedido",
        data: "{'prIdEmpleado': '" + $("#hdfEmpleado").val() + "'," +
                "'pIdCampana': '" + window.parent.CampanaConf.IdCampana + "'," +
                "'prIdTipoFinanciamiento': '" + $("#ddlFinanciamiento").val() + "'," +
                "'prMantuvoPlan': '" + miMantuvoPlan + "'," +
                "'pXmlPedido': '" + XML_AGREGAR + "', " +
                "'prIdOficina': '" + $("#ddlLugarEntregaPedido").val() + "', " +
                "'prMesesEquipo': '" + MesesFinanciamientoEquipo + "', " +
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

            //var resul = JSON.parse('[{ "idDetallePedido" :"3161" , "Idestado" :"26" , "EstadoPedido" :"Enviado" , "codigopedido" :"CAMP2016-30065" , "Estado" :"Equipos adquiridos" , "NumeroItem" :"1" , "Equipo" :"TERM 3G NOKIA 208 NEGRO" , "PrecioEquipo" :60.0000 , "Plan" :"Plan 1 OnTop 1 [Llamadas 10 min - todo destino] - 1GB" , "PrecioPlan" :40.0000 , "MesesEquipo" :12 , "MesesContrato" :18 , "Numero" :"Nueva Linea" , "IdPedido" :"30065" , "PrecioMensualEquipo" :0 , "TotalMensual" :0 },{ "idDetallePedido" :"3162" , "Idestado" :"26" , "EstadoPedido" :"Enviado" , "codigopedido" :"CAMP2016-30065" , "Estado" :"Equipos adquiridos" , "NumeroItem" :"2" , "Equipo" :"TERMINAL GSM NOKIA 100 NEGRO COLT" , "PrecioEquipo" :35.0000 , "Plan" :"Plan 2 OnTop 1" , "PrecioPlan" :55.0000 , "MesesEquipo" :12 , "MesesContrato" :18 , "Numero" :"Nueva Linea" , "IdPedido" :"30065" , "PrecioMensualEquipo" :0 , "TotalMensual" :0 },{ "idDetallePedido" :"3163" , "Idestado" :"26" , "EstadoPedido" :"Enviado" , "codigopedido" :"CAMP2016-30065" , "Estado" :"Equipos adquiridos" , "NumeroItem" :"3" , "Equipo" :"CHIP" , "PrecioEquipo" :1.0000 , "Plan" :"Plan 199" , "PrecioPlan" :199.0000 , "MesesEquipo" :1 , "MesesContrato" :18 , "Numero" :"Nueva Linea" , "IdPedido" :"30065" , "PrecioMensualEquipo" :0 , "TotalMensual" :0 }]');

            var fechaInicio = new Date();
            strFechaInicio = dias[fechaInicio.getDay()] + ', ' + fechaInicio.getDate() + ' de ' + meses[fechaInicio.getMonth()] + ' del ' + fechaInicio.getFullYear();
            var FormatNewFechaI = dias[fechaInicio.getDay()] + ', ' + Right('0' + fechaInicio.getDate(), 2) + '/' + MesesEnteros[fechaInicio.getMonth()] + '/' + fechaInicio.getFullYear();

            $("#lblFechaPedi").text(FormatNewFechaI + " " + fechaInicio.getHours() + ":" + fechaInicio.getMinutes());
            $("#lblCodigoPedido").text(resul[0].codigopedido);
            $("#lblEstadoPedidoCompra").text(resul[0].EstadoPedido);

            var verAdquiridos = false;
            var verNoAdquiridos = false;

            var contAdquirido = 0;
            var contNoAdquirido = 0;

            var sumAdEquipos = 0;
            var sumNoAdEquipos = 0;
            var sumAdPlan = 0;
            var sumNoPlan = 0;
            var sumMensualAdEquipos = 0;
            var sumMensualNoEquipos = 0;

            if (MesesFinanciamientoEquipo != 1) {
                $("#tbAdquiridos thead").append('<tr style="text-align: center;">' +
                    '<td style="width: 160px;">Descripción</td>' +
                    '<td style="width: 45px;">Precio Equipo (S/.)</td>' +
                    '<td>Plan</td>' +
                    '<td style="width: 45px;">Meses Contrato</td>' +
                    '<td style="width: 40px;">Precio Plan (S/.)</td>' +
                    '<td style="width: 60px;">Número</td></tr>');

                $("#tbNoAdquiridos thead").append('<tr style="text-align: center;">' +
                    '<td style="width: 160px;">Descripción</td>' +
                    '<td style="width: 45px;">Precio Equipo (S/.)</td>' +
                    '<td>Plan</td>' +
                    '<td style="width: 45px;">Meses Contrato</td>' +
                    '<td style="width: 40px;">Precio Plan (S/.)</td>' +
                    '<td style="width: 60px;">Número</td></tr>');

                for (var i = 0; i < resul.length; i++) {

                    if (resul[i].Estado == "Equipos adquiridos") {
                        verAdquiridos = true;
                        contAdquirido = contAdquirido + 1;
                        sumAdEquipos = sumAdEquipos + resul[i].PrecioEquipo;
                        sumAdPlan = sumAdPlan + resul[i].PrecioPlan;

                        var v_style = '';
                        if (contAdquirido % 2) {
                            v_style = 'style="background: rgb(234, 234, 234);"';
                        }

                        $("#tbAdquiridos tbody").append("<tr " + v_style + "><td>" + resul[i].Equipo.toString() + "</td>" +
                    "<td style='text-align:right;'>" + formatNumber.newo(resul[i].PrecioEquipo, "") + "</td>" +
                    "<td>" + resul[i].Plan + "</td>" +
                    "<td style='text-align:center;'>" + resul[i].MesesContrato + "</td>" +
                    "<td style='text-align:right;'>" + formatNumber.newo(resul[i].PrecioPlan, "") + "</td>" +
                    "<td>" + resul[i].Numero + "</td></tr>");
                    } else {
                        verNoAdquiridos = true;
                        contNoAdquirido = contNoAdquirido + 1;
                        sumNoAdEquipos = sumNoAdEquipos + resul[i].PrecioEquipo;
                        sumNoPlan = sumNoPlan + resul[i].PrecioPlan;

                        var v_styleNo = '';
                        if (contNoAdquirido % 2) {
                            v_styleNo = 'style="background: rgb(234, 234, 234);"';
                        }

                        $("#tbNoAdquiridos tbody").append("<tr " + v_styleNo + "><td>" + resul[i].Equipo.toString() + "</td>" +
                    "<td style='text-align:right;'>" + formatNumber.newo(resul[i].PrecioEquipo, "") + "</td>" +
                    "<td>" + resul[i].Plan + "</td>" +
                    "<td style='text-align:center;'>" + resul[i].MesesContrato + "</td>" +
                    "<td style='text-align:right;'>" + formatNumber.newo(resul[i].PrecioPlan, "") + "</td>" +
                    "<td>" + resul[i].Numero + "</td></tr>");
                    }
                }

                if (!verAdquiridos) {
                    $("#tbAdquiridos").css("display", "none");
                } else {
                    $("#tbAdquiridos tbody").append("<tr style='background: #E2F0F6; font-weight: bold;'><td>Equipos: " + contAdquirido.toString() +
                "</td><td></td><td></td><td colspan='2' style='text-align:right;'>Total: " + formatNumber.newo(sumMensualAdEquipos, "") +
                "</td><td></td></tr>");
                }
                if (!verNoAdquiridos) {
                    $("#tbNoAdquiridos").css("display", "none");
                } else {
                    $("#tbNoAdquiridos tbody").append("<tr style='background: #f6e2e2; font-weight: bold;'><td>Equipos: " + contNoAdquirido.toString() +
                "</td><td></td><td></td><td colspan='2' style='text-align:right;'>Total: " + formatNumber.newo(sumMensualNoEquipos, "") +
                "</td><td></td></tr>");
                }
            } else {
                $("#tbAdquiridos thead").append('<tr style="text-align: center;">' +
                    '<td style="width: 160px;">Descripción</td>' +
                    '<td style="width: 45px;">Precio Equipo (S/.)</td>' +
                    '<td style="width: 35px;">Nro Cuotas</td>' +
                    '<td style="width: 45px;">Cuota Mensual Eq. (S/.)</td>' +
                    '<td>Plan</td>' +
                    '<td style="width: 45px;">Meses Contrato</td>' +
                    '<td style="width: 40px;">Precio Plan (S/.)</td>' +
                    '<td style="width: 45px;">Total Mensual (S/.)</td>' +
                    '<td style="width: 60px;">Número</td></tr>');

                $("#tbNoAdquiridos thead").append('<tr style="text-align: center;">' +
                    '<td style="width: 160px;">Descripción</td>' +
                    '<td style="width: 45px;">Precio Equipo (S/.)</td>' +
                    '<td style="width: 35px;">Nro Cuotas</td>' +
                    '<td style="width: 45px;">Cuota Mensual Eq. (S/.)</td>' +
                    '<td>Plan</td>' +
                    '<td style="width: 45px;">Meses Contrato</td>' +
                    '<td style="width: 40px;">Precio Plan (S/.)</td>' +
                    '<td style="width: 45px;">Total Mensual (S/.)</td>' +
                    '<td style="width: 60px;">Número</td></tr>');

                for (var i = 0; i < resul.length; i++) {

                    if (resul[i].Estado == "Equipos adquiridos") {
                        verAdquiridos = true;
                        contAdquirido = contAdquirido + 1;
                        sumAdEquipos = sumAdEquipos + resul[i].PrecioEquipo / resul[i].MesesEquipo;
                        sumAdPlan = sumAdPlan + resul[i].PrecioPlan;
                        sumMensualAdEquipos = sumMensualAdEquipos + (resul[i].PrecioEquipo / resul[i].MesesEquipo) + resul[i].PrecioPlan;

                        var v_style = '';
                        if (contAdquirido % 2) {
                            v_style = 'style="background: rgb(234, 234, 234);"';
                        }

                        $("#tbAdquiridos tbody").append("<tr " + v_style + "><td>" + resul[i].Equipo.toString() + "</td>" +
                    "<td style='text-align:right;'>" + formatNumber.newo(resul[i].PrecioEquipo, "") + "</td>" +
                    "<td style='text-align:center;'>" + resul[i].MesesEquipo + "</td>" +
                    "<td style='text-align:right;'>" + formatNumber.newo(resul[i].PrecioEquipo / resul[i].MesesEquipo, "") + "</td>" +
                    "<td>" + resul[i].Plan + "</td>" +
                    "<td style='text-align:center;'>" + resul[i].MesesContrato + "</td>" +
                    "<td style='text-align:right;'>" + formatNumber.newo(resul[i].PrecioPlan, "") + "</td>" +
                    "<td style='text-align:right;'>" + formatNumber.newo((resul[i].PrecioEquipo / resul[i].MesesEquipo) + resul[i].PrecioPlan, "") + "</td>" +
                    "<td>" + resul[i].Numero + "</td></tr>");
                    } else {
                        verNoAdquiridos = true;
                        contNoAdquirido = contNoAdquirido + 1;
                        sumNoAdEquipos = sumNoAdEquipos + resul[i].PrecioEquipo / resul[i].MesesEquipo;
                        sumNoPlan = sumNoPlan + resul[i].PrecioPlan;
                        sumMensualNoEquipos = sumMensualNoEquipos + (resul[i].PrecioEquipo / resul[i].MesesEquipo) + resul[i].PrecioPlan;

                        var v_styleNo = '';
                        if (contNoAdquirido % 2) {
                            v_styleNo = 'style="background: rgb(234, 234, 234);"';
                        }

                        $("#tbNoAdquiridos tbody").append("<tr " + v_styleNo + "><td>" + resul[i].Equipo.toString() + "</td>" +
                    "<td style='text-align:right;'>" + formatNumber.newo(resul[i].PrecioEquipo, "") + "</td>" +
                    "<td style='text-align:center;'>" + resul[i].MesesEquipo + "</td>" +
                    "<td style='text-align:right;'>" + formatNumber.newo(resul[i].PrecioEquipo / resul[i].MesesEquipo, "") + "</td>" +
                    "<td>" + resul[i].Plan + "</td>" +
                    "<td style='text-align:center;'>" + resul[i].MesesContrato + "</td>" +
                    "<td style='text-align:right;'>" + formatNumber.newo(resul[i].PrecioPlan, "") + "</td>" +
                    "<td style='text-align:right;'>" + formatNumber.newo((resul[i].PrecioEquipo / resul[i].MesesEquipo) + resul[i].PrecioPlan, "") + "</td>" +
                    "<td>" + resul[i].Numero + "</td></tr>");
                    }
                }

                if (!verAdquiridos) {
                    $("#tbAdquiridos").css("display", "none");
                } else {
                    $("#tbAdquiridos tbody").append("<tr style='background: #E2F0F6; font-weight: bold;'><td style='background: #E2F0F6;'>Total: " + contAdquirido.toString() +
                "</td><td></td><td></td><td></td><td></td><td></td><td colspan='2' style='text-align:right;'>Total: " + formatNumber.newo(sumMensualAdEquipos, "") +
                "</td><td></td></tr>");
                }
                if (!verNoAdquiridos) {
                    $("#tbNoAdquiridos").css("display", "none");
                } else {
                    $("#tbNoAdquiridos tbody").append("<tr style='background: #f6e2e2; font-weight: bold;'><td>Total: " + contNoAdquirido.toString() +
                "</td><td></td><td></td><td></td><td></td><td></td><td colspan='2' style='text-align:right;'>Total: " + formatNumber.newo(sumMensualNoEquipos, "") +
                "</td><td></td></tr>");
                }
            }


        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

//------------------------------------------



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
                }
                if (resul[i].Categoria == 'C') {
                    MesesFinanciamientoChip = resul[i].Cuotas;
                }
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
                $("#ddlFinanciamiento").attr("disabled", "disabled");
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
        $("#pnlDscFinanciamiento").css("display", "block");
        $("#Global").css("display", "none");

    }
}

function obtenerPlanesBase(IdProducto) {
    var planes = [];
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
                                        return [new miPlan(productosBase[i].DscPlan + " (" + formatNumber.newo(productosBase[i].PrercioPlan, "S/.") + ")", productosBase[i].idPlan, productosBase[i].PrercioPlan)];
                                    }
                                    else {
                                        return [new miPlan(productosBase[i].DscPlan_equivalente + " (" + formatNumber.newo(productosBase[i].PrercioPlan_equivalente, "S/.") + ")", productosBase[i].idPlan_equivalente, productosBase[i].PrercioPlan_equivalente)];
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
                    if (SoloPlanMayor) {
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
                                planes.push(new miPlan(productosBase[i].DscPlan + " (" + formatNumber.newo(productosBase[i].PrercioPlan, "S/.") + ")", productosBase[i].idPlan, productosBase[i].PrercioPlan));
                            }
                            else {
                                planes.push(new miPlan(productosBase[i].DscPlan_equivalente + " (" + formatNumber.newo(productosBase[i].PrercioPlan_equivalente, "S/.") + ")", productosBase[i].idPlan_equivalente, productosBase[i].PrercioPlan_equivalente));
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

                if (SoloPlanMayor) {
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
                            planes.push(new miPlan(productosBase[i].DscPlan + " (" + formatNumber.newo(productosBase[i].PrercioPlan, "S/.") + ")", productosBase[i].idPlan, productosBase[i].PrercioPlan));
                        }
                        else {
                            planes.push(new miPlan(productosBase[i].DscPlan_equivalente + " (" + formatNumber.newo(productosBase[i].PrercioPlan_equivalente, "S/.") + ")", productosBase[i].idPlan_equivalente, productosBase[i].PrercioPlan_equivalente));
                        }
                    }
                }
            }
        }
    }
    return planes;
}

function obtenerPlanesDependientes(IdProducto, IdPlanBase) {
    var planes = [];

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
                                        return [new miPlan(productosBase[i].NombreCorto + " (" + formatNumber.newo(productosBase[i].PrercioPlan, "S/.") + ")", productosBase[i].idPlan, productosBase[i].PrercioPlan)];
                                    }
                                    else {
                                        return [new miPlan(productosBase[i].DscPlan_equivalente + " (" + formatNumber.newo(productosBase[i].PrercioPlan_equivalente, "S/.") + ")", productosBase[i].idPlan_equivalente, productosBase[i].PrercioPlan_equivalente)];
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
                            if (SoloPlanMayor) {
                                if (parseFloat(window.parent.PrecioPlanNumeroRenovar) < parseFloat(productosBase[i].PrercioPlan)) {
                                    planes.push(new miPlan(productosBase[i].NombreCorto + " (+ " + formatNumber.newo(parseFloat(productosBase[i].PrercioPlan) - precioBase, oCultura.Moneda.vcSimMon) + ")", productosBase[i].idPlan, productosBase[i].PrercioPlan));
                                }
                            } else {
                                planes.push(new miPlan(productosBase[i].NombreCorto + " (+ " + formatNumber.newo(parseFloat(productosBase[i].PrercioPlan) - precioBase, "S/.") + ")", productosBase[i].idPlan, productosBase[i].PrercioPlan));
                                //planes.push(new miPlan(productosBase[i].NombreCorto + " (" + formatNumber.newo(productosBase[i].PrercioPlan, "S/.") + ")", productosBase[i].idPlan, productosBase[i].PrercioPlan));
                            }
                        }
                        else {
                            planes.push(new miPlan(productosBase[i].DscPlan_equivalente + " (" + formatNumber.newo(productosBase[i].PrercioPlan_equivalente, "S/.") + ")", productosBase[i].idPlan_equivalente, productosBase[i].PrercioPlan_equivalente));
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
                if (entro)
                    continue;

                if (productosBase[i].IdPlanBase == IdPlanBase) {
                    if (productosBase[i].idPlan_equivalente == -1) {
                        if (SoloPlanMayor) {
                            if (parseFloat(window.parent.PrecioPlanNumeroRenovar) < parseFloat(productosBase[i].PrercioPlan)) {
                                planes.push(new miPlan(productosBase[i].NombreCorto + " (+ " + formatNumber.newo(parseFloat(productosBase[i].PrercioPlan) - precioBase, oCultura.Moneda.vcSimMon) + ")", productosBase[i].idPlan, productosBase[i].PrercioPlan));
                            }
                        } else {
                            planes.push(new miPlan(productosBase[i].NombreCorto + " (+ " + formatNumber.newo(parseFloat(productosBase[i].PrercioPlan) - precioBase, "S/.") + ")", productosBase[i].idPlan, productosBase[i].PrercioPlan));
                            //planes.push(new miPlan(productosBase[i].NombreCorto + " (" + formatNumber.newo(productosBase[i].PrercioPlan, "S/.") + ")", productosBase[i].idPlan, productosBase[i].PrercioPlan));    
                        }
                    }
                    else {
                        planes.push(new miPlan(productosBase[i].DscPlan_equivalente + " (" + formatNumber.newo(productosBase[i].PrercioPlan_equivalente, "S/.") + ")", productosBase[i].idPlan_equivalente, productosBase[i].PrercioPlan_equivalente));
                    }
                }
            }
        }
    }

    if (planes.length == 0) {
        planes.push(new miPlan("Ninguno (" + formatNumber.newo(0, "S/.") + ")", IdPlanBase, precioBase));
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

function enlacesLoad() {
    var columnGridCarrito, rowTemp, altRowTemp;
    if (MesesFinanciamientoEquipo == 1) {
        columnGridCarrito = [
            { field: "Producto", width: "100px", title: "Producto" },
            { field: "Detalles", width: "530px", title: "Detalles" },
            { field: "Precio", title: "Precio" }
        ];
        rowTemp = kendo.template($("#rowTemplate").html());
        altRowTemp = kendo.template($("#altRowTemplate").html());
    } else {
        //columnGridCarrito = [
        //    { field: "Producto", width: "80px", title: "Producto" },
        //    { field: "Cuotas", width: "55px", title: "Cuotas<br/>Equipo" },
        //    { field: "Monto", width: "75px", title: "Monto<br/>Equipo" },
        //    { field: "Detalles", width: "430px", title: "Detalles" },
        //    { field: "Contrato", title: "Contrato", hidden: !ElegirMesesPlan },
        //    { field: "Mensual", title: "Total" }
        //];
        columnGridCarrito = [
            { field: "Producto", width: "11%", title: "Producto" },
            { field: "Cuotas", width: "7%", title: "Cuotas<br/>Equipo" },
            { field: "Monto", width: "10&", title: "Monto<br/>Equipo" },
            { field: "Detalles", width: "62%", title: "Detalles" },
            { field: "Contrato", width: "0%", title: "Contrato", hidden: !ElegirMesesPlan },
            { field: "Mensual", width: "10%", title: "Total" }
        ];
        rowTemp = kendo.template($("#rowTemplate_Cuotas").html());
        altRowTemp = kendo.template($("#altRowTemplate_Cuotas").html());
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
        height: 350
    });
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

function obtenerPrecioSegunCredito(IdProducto) {
    var precioPlan;
    var id;
    var meses;
    var precioEquipo;
    var cuotaMensualEquipo;
    for (var i = 0; i < productosBase.length; i++) {
        if (productosBase[i].P_inCod == IdProducto) {
            if (precioPlan == undefined) {
                if (productosBase[i].ObligPlanDep == 'False' || productosBase[i].planUnico == '1' || (productosBase[i].ObligPlanDep == 'True' && productosBase[i].idPlan != productosBase[i].IdPlanBase)) {
                    cuotaMensualEquipo = productosBase[i].Precio / (productosBase[i].IdGama == 9 ? MesesFinanciamientoChip : MesesFinanciamientoEquipo);
                    if (indicadoresVariante[0]["Disponible"] >= cuotaMensualEquipo && indicadoresVariante[1]["Disponible"] >= productosBase[i].PrercioPlan) {
                        precioPlan = productosBase[i].PrercioPlan;
                        id = productosBase[i].idPlan;
                        meses = productosBase[i].MesesContrato;
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
                    cuotaMensualEquipoAnterior = arregloSeleccion[indexEquipo].Precio / (productosBase[i].IdGama == 9 ? MesesFinanciamientoChip : MesesFinanciamientoEquipo);
                    if ((indicadoresVariante[0]["Disponible"] + cuotaMensualEquipoAnterior) >= cuotaMensualEquipo && indicadoresVariante[1]["Disponible"] >= productosBase[i].PrercioPlan) {
                        precioPlan = productosBase[i].PrercioPlan;
                        id = productosBase[i].idPlan;
                        meses = productosBase[i].MesesContrato;
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