/// <reference path="../Common/Scripts/jquery.jqDock.min.js" />
var y;
var x;
var objClickDerecho;
var prodSeleccionado;
var arregloSeleccion = [];
var arregloCarrito = [];
var planes;
var cantidadEquipos = 0;
var cantidadPlanes = 0;
var indicadores;

$(function () {

    $("#btnCarrito").click(function () {

        if (arregloSeleccion.length != 0) {
            //$("#titCel").hide();
            $($("#titCel span")[0]).text("");
            $("#imaCel").hide();
            $("#infoCel").hide();
            $("#comprarCel").hide();

            $("#opacidad").fadeIn(300);
        }
        else {
            alert("usted no tiene productos en carritos de compras");
        }


    });

    $("#btnNuevoPedido").click(function () {
        $("#generalPlanes").fadeOut(300, function () {
            $("#general").fadeIn(300);
        });

    });

    $("#ddlFiltro").kendoComboBox();

    $("#pushCarrito").click(function () {

        if (arregloSeleccion.length == 0) {
            alert("usted no a seleccionado ningun producto");
            return false;
        }
        for (var i = 0; i < arregloSeleccion.length; i++) {
            cantidadEquipos = cantidadEquipos + parseInt(arregloSeleccion[i].Precio);
            cantidadPlanes = cantidadPlanes + parseInt(arregloSeleccion[i].PlanModeloPrecio);
        }

        arregloSeleccion = [];

        var ss = indicadores;

        $("#opacidad").hide(300);

    });


    $("#gridDetEle").kendoGrid({
        dataSource: {
            data: arregloSeleccion
        },
        rowTemplate: kendo.template($("#rowTemplate").html()),
        altRowTemplate: kendo.template($("#altRowTemplate").html()),
        height: 430
    });


    $(".indiBar").progressbar({
        value: 30,
        max: 100
    }).css({ "height": "5px" });

    $(document).mousemove(function (e) {
        x = e.pageX;
        y = e.pageY;
    });

    $(document).on("contextmenu", ".prodDesc", function (e) {
        //alert('Context Menu event has fired!');
        $("#menu").css('left', x - 20);
        $("#menu").css('top', y - 20);
        $("#menu").show();
        $(this).parent(".prodEle").css("background", "skyblue");
        $(this).parent(".prodEle").attr("chec", "chec");
        idClickDerecho = $(this).parent(".prodEle");
        return false;
    });

    $("#menu").mouseleave(function () {
        $(this).hide();
        $(".prodEle").css("background", "white");
    });

    $("#eliminarProd").click(function () {
        $("[chec]").remove();
        $("#menu").hide();
    })

    $(".controlNum").click(function () { mostrarPaso($(this).attr("id")); });
    //$("#opacidad").click(function () { $("#opacidad").hide() });
    $(".producto").click(function (e) { mostrarDescPro(e, this); });
    $(".producto *").click(function (e) { mostrarDescPro(e, this); });

    $(".next").button();
    $(".back").button();
    $(".boton").button();
    $("#regresar").button();


    $("#regresar").click(function () {
        $("#opacidad").hide();
    });

    $("#comp").click(function () {

        $("#detalleEle").show(300, function () {

            $("#pDetLin").hide();
            $("#CaractEle").removeClass("tabSelect");

            var cant = $("#Text1").val();
            var datosJson = "";

            for (var i = 0; i < cant; i++) {
                arregloSeleccion.push(new seleccion((arregloSeleccion.length + 1).toString(), prodSeleccionado.P_inCod, prodSeleccionado.vcNom, "", prodSeleccionado.Precio, planes[0].value));
            }


            var dataSource = new kendo.data.DataSource({
                data: arregloSeleccion
            });

            var gridele = $("#gridDetEle").data("kendoGrid");
            gridele.setDataSource(dataSource);

            enlazarClick();

            $("#detalleEle").addClass("tabSelect");
            //$("#pushCarrito").show(300);
            $("#detalleTabs").show(0, function () {

                //$("#detalleTabs").parent().parent().parent().parent().parent().scrollTop(20000);
                $("#detalleTabs").parent().parent().parent().parent().parent().animate({ scrollTop: 520 }, '3000', 'swing', function () {
                    $("#pDetEle").show(300);
                });

            });


        });
        return false;
    });

    $("#detalleEle").click(function () {
        $("#CaractEle").removeClass("tabSelect");
        $("#detalleEle").addClass("tabSelect");
        $("#pDetLin").hide(0, function () {
            $("#pDetEle").fadeIn(300);
        });
    });

    $("#CaractEle").click(function () {
        $("#detalleEle").removeClass("tabSelect");
        $("#CaractEle").addClass("tabSelect");
        $("#pDetEle").hide(0, function () {
            $("#pDetLin").fadeIn(300);
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

    $("#irFormaPago").click(function () { mostrarPaso("2"); });
    $("#irConfirmacion").click(function () {

        $("#opacidad").hide();
        $("#general").hide();
        mostrarPaso("1");
        $("#generalPlanes").fadeIn(300);


    });
    $("#irResumen").click(function () { mostrarPaso("4"); });
    $("#finalizar").click(function () { });

    $("#backProductos").click(function () { mostrarPaso("1"); });
    $("#backPago").click(function () { mostrarPaso("2"); });
    $("#backConfirmacion").click(function () { mostrarPaso("3"); });

    //$(".ElegirProd").click(function () { elegirProd(this) });

    $("#cuerpo_productos").scroll(function () {

        if (($(this).scrollTop() + $(this).height()) == document.getElementById("cuerpo_productos").scrollHeight) {
            //            $("#cuerpo_productos").hide(0, function () {
            //                $("#cuerpo_productos").append('<div class="producto"><img src="../../Images/ModeloDispositivo/12.jpg"></div>');
            //                $("#cuerpo_productos").append('<div class="producto"><img src="../../Images/ModeloDispositivo/171.jpg"></div>');
            //                $("#cuerpo_productos").append('<div class="producto"><img src="../../Images/ModeloDispositivo/2.jpg"></div>');
            //                $("#cuerpo_productos").append('<div class="producto"><img src="../../Images/ModeloDispositivo/44.jpg"></div>');
            //                $("#cuerpo_productos").append('<div class="producto"><img src="../../Images/ModeloDispositivo/40.jpg"></div>');

            //                $("#cuerpo_productos").fadeIn();
            //            });
        }

    });

    $('.tab').hover(function () {
        $(this).animate({ marginRight: '10px', marginLeft: '30px' }, 300);

    }, function () {
        $(this).animate({ marginRight: '0px', marginLeft: '20px' }, 300);
    });
    $('.tabDesc').hover(function () {
        $(this).animate({ marginRight: '10px', marginLeft: '10px' }, 300);

    }, function () {
        $(this).animate({ marginRight: '0px', marginLeft: '2px' }, 300);
    });

    $('.tab').click(function () {
        $('.tab').removeClass("tabSelect");
        $(this).addClass("tabSelect");
    });

    $('.tabDesc').click(function () {
        $('.tabDesc').removeClass("tabSelect");
        $(this).addClass("tabSelect");
    });

    $('.producto').hover(function () {
        $(this).find(".productodesc").animate({ top: '-60px' }, 200);
    }, function () {
        $(this).find(".productodesc").animate({ top: '5px' }, 200);
    });


    display();

    obtenerCampanaActiva();
    obtenerCreditos();

    $("#grdPedidos").kendoGrid({
        dataSource: {
            data: [{ Campana: "Campaña fiestas patrias", Fcompra: "02/02/2013", Fentrega: "02/05/2013", Estadopedido: "Entregado", LugarEntrega: "Calle Larco Herrera 980. Magdalena - Lima." },
            { Campana: "Campaña navideña", Fcompra: "02/02/2013", Fentrega: "02/05/2013", Estadopedido: "Entregado", LugarEntrega: "Calle Larco Herrera 980. Magdalena - Lima." },
            { Campana: "Campaña navideña", Fcompra: "02/02/2013", Fentrega: "02/05/2013", Estadopedido: "Entregado", LugarEntrega: "Calle Larco Herrera 980. Magdalena - Lima." },
            { Campana: "Campaña navideña", Fcompra: "02/02/2013", Fentrega: "02/05/2013", Estadopedido: "Procesado", LugarEntrega: "Calle Larco Herrera 980. Magdalena - Lima." },
            { Campana: "Campaña navideña", Fcompra: "02/02/2013", Fentrega: "02/05/2013", Estadopedido: "Procesado", LugarEntrega: "Calle Larco Herrera 980. Magdalena - Lima."}],
            pageSize: 10
        },
        groupable: false,
        sortable: true,
        selectable: "multiple",
        navigatable: true,
        pageable: {
            refresh: true,
            pageSizes: true
        },
        columns: [
            { field: "Campana", width: 50, title: "Campaña" },
            { field: "Fcompra", width: 30, title: "Fecha compra" },
            { field: "Fentrega", width: 30, title: "Fecha entrega" },
            { field: "Estadopedido", width: 30, title: "Estado" },
            { field: "LugarEntrega", width: 60, title: "Lugar entrega" }
        ]
    });

});

function mostrarDescPro(e, a) {
    if (e.target !== a)
        return false;
    
            $("#imaCel").show();
        $("#infoCel").show();
        $("#comprarCel").show();

    var id = $(a).parent().attr("id");
    var url = $(a).attr("src");
    if (url == undefined) {
        url = $($("#" + id + " img")[0]).attr("src");
    }

    $("#imgCel").attr("src", url);

    $($("#titCel span")[0]).text($("#" + id + " span")[0]["innerText"]);
    $("#comprarCelPre").text($("#" + id + " span")[1]["innerText"]);
//    $("#infoCel").html($("#" + id + " span")[2]["innerHTML"]);
//    $("#infoCel").css({ "font-size": "11px" });
    $("#dscCel").html($("#" + id + " span")[2]["innerHTML"]);
    $("#dscCel").css({ "font-size": "11px" });
    $("#caracCel").css({ "font-size": "11px" });

    prodSeleccionado = obtenerDispositivo(id.split('-')[1]);
    $("#comprarCelDis").text("Cantidad disponible : " + prodSeleccionado.CantidadDisponible + " unidades")

    $.ajax({
        type: "POST",
        url: "Registrar_pedido.aspx/ObtenerCaracteristicas",
        data: "{'IdModeloDispositivo': '" + prodSeleccionado.P_inCod + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {

            var resul = JSON.parse(resultado.d);
            $("#pDetLin").text("");
            for (var i = 0; i < resul.length; i++) {
                //$("#pDetLin").append('<div class="fLin pLinHead"><div class="cLin cLinId"></div><div class="cLin">' + resul[i].vcDes + ' </div><div class="cLin">' + resul[i].Valor + '</div></div>')
                $("#caracCel").append('<div class="fLin pLinHead"><div class="cLin cLinId"></div><div class="cLin">' + resul[i].vcDes + ' </div><div class="cLin">' + resul[i].Valor + '</div></div>')
               
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

    $.ajax({
        type: "POST",
        url: "Registrar_pedido.aspx/planListarPorModelo",
        data: "{'IdModeloDispositivo': '" + prodSeleccionado.P_inCod + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {

            planes = JSON.parse(resultado.d);            

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

    


    if (arregloSeleccion.length == 0) {
        var dataSource = new kendo.data.DataSource({
            data: arregloSeleccion
        });

        var gridele = $("#gridDetEle").data("kendoGrid");
        gridele.setDataSource(dataSource);

        $("#detalleEle").removeClass("tabSelect");
        $("#detalleEle").hide();
        $("#CaractEle").addClass("tabSelect");
        $("#pDetEle").hide();
        $("#pDetLin").fadeIn(300);
        $("#pushCarrito").hide();
    }

    $("#opacidad").fadeIn(300);
}



function elegirProd(a) {

    $("#cuer_pe").animate({ margin: "0px" }, 300);

    $(a).find(":text").show();

};

function display() {
    if ($.browser.msie && $.browser.version <= 8) {
        $("#mostrar1").css("display", "none");
        $("#mostrar2").css("display", "none");
        $(".pasonum").css("display", "none");
        $(".paso").css("background", "gray");
        $("#paso1").css("background", "white");
    }
};

function mostrarPaso(a) {

    switch (a) {

        case "1":
            if ($.browser.msie && $.browser.version <= 8) {
                $(".paso").css("background", "gray");
                $("#paso" + a).css("background", "white");
            }
            else {
                $("#mostrar1").animate({ left: "-1000px" }, 300);
                $("#mostrar2").animate({ left: "174px" }, 300);
            }
            $(".controlNum").removeClass("numElegido");
            $("#" + a).addClass("numElegido");
            $(".pag").hide();
            $("#productos").fadeIn(300);
            break;

        case "2":
            if ($.browser.msie && $.browser.version <= 8) {
                $(".paso").css("background", "gray");
                $("#paso" + a).css("background", "white");
            }
            else {
                $("#mostrar1").animate({ left: "-605px" }, 300);
                $("#mostrar2").animate({ left: "350px" }, 300);
            }
            $(".controlNum").removeClass("numElegido");
            $("#" + a).addClass("numElegido");
            $(".pag").hide();
            $("#pago").fadeIn(300);
            break;

        case "3":
            if ($.browser.msie && $.browser.version <= 8) {
                $(".paso").css("background", "gray");
                $("#paso" + a).css("background", "white");
            }
            else {
                $("#mostrar1").animate({ left: "-431px" }, 300);
                $("#mostrar2").animate({ left: "524px" }, 300);
            }
            $(".controlNum").removeClass("numElegido");
            $("#" + a).addClass("numElegido");
            $(".pag").hide();
            $("#confirmacion").fadeIn(300);
            break;

        default:
            if ($.browser.msie && $.browser.version <= 8) {
                $(".paso").css("background", "gray");
                $("#paso" + a).css("background", "white");
            }
            else {
                $("#mostrar1").animate({ left: "-256px" }, 300);
                $("#mostrar2").animate({ left: "896px" }, 300);
            }
            $(".controlNum").removeClass("numElegido");
            $("#" + a).addClass("numElegido");
            $(".pag").hide();
            $("#resumen").fadeIn(300);

    }

}


function obtenerCampanaActiva() {

    $.ajax({
        type: "POST",
        url: "Registrar_pedido.aspx/obtenerCampanaActiva",
        data: "{'prIdCliente': '" + "1" + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;

            var fechaInicio = new Date(parseInt(resul["FechaInicio"].substring(6,19)))
            
            var fechaFin = new Date(parseInt(resul["FechaFin"].substring(6,19)))

            dias = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"); 
            meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"); 

            strFechaInicio = dias[fechaInicio.getDay()] + ', ' + fechaInicio.getDate() + ' de ' + meses[fechaInicio.getMonth()] + ' del ' + fechaInicio.getFullYear(); 
            strfechaFin = dias[fechaFin.getDay()] + ', ' + fechaFin.getDate() + ' de ' + meses[fechaFin.getMonth()] + ' del ' + fechaFin.getFullYear(); 

            $("#spanNomCam").text(resul["Descripcion"]);
            $("#spanFIniCam").text(strFechaInicio);
            $("#spanFFinCam").text(strfechaFin);
            
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function obtenerCreditos() {

    $.ajax({
        type: "POST",
        url: "Dashboard_pedido.aspx/mostrarProductoCreditoAsignado",
        data: "{'prIdEmpleado': '" + "1" + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;

            $.each(resul.ProductoCreditoAsignado, function (i, val) {
                $("#contIndicadores").append('<div class= "itemIndicador">' +
                '<div class="indiDesc">' + val["DescripcionProducto"] + '</div>' +
                '<div class="indiDisponible">' + formatNumber.newo(val["Disponible"], "S/. ") + '</div>' +
                '<div class="indiDisponible">' + formatNumber.newo(val["Utilizado"], "S/. ") + '</div>' +
                '<div id="inibar' + i + '"class="indiBar"></div></div>')

                $("#inibar" + i).kendoSlider({
                    min: 0,
                    max: val["Disponible"],
                    smallStep: 1,
                    largeStep: 10,
                    value: val["Utilizado"],
                    showButtons: false,
                    enabled: false
                });

            });

            indicadores = resul;

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}


function obtenerDispositivo(id) {
    //{
    //"P_inCod":"1",
    //"vcNom":"MODEM USB 3G ZTE MF30 NEGRO",
    //"imIma":"../Common/Images/ModeloDispositivo/1.jpg",
    //"vcDes":"El Samsung Galaxy S4 este smartphone tiene una pantalla ,
    //"Precio":"250.0000",
    //"CantidadTotal":"20",
    //"CantidadUsada":"0",
    //"CantidadDisponible":"20",
    //"Reservable":"False"
    //}
    
    for (var i = 0; i < cadenaJson.length; i++) {

        if (cadenaJson[i].P_inCod == id) {
            return cadenaJson[i]
        }

    }

    return "";
}


function seleccion(id, ModeloID, DescModelo, PlanModelo, Precio, PlanModeloPrecio) {

    this.id = id;
    this.ModeloID = ModeloID;
    this.DescModelo = DescModelo;
    this.PlanModelo = PlanModelo;
    this.Precio = Precio;
    this.PlanModeloPrecio = PlanModeloPrecio;

};

function enlazarClick() {

    $(".cboPlanes").kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: planes,
        filter: "contains",
        suggest: true,
        index: 0
    });


    $(".eliEle").click(function () {
        
        var index = $(this).parent().parent().find("td")[2]["outerText"];

        for (var i = 0; i < arregloSeleccion.length; i++) {
            if (parseInt(arregloSeleccion[i].id) == parseInt(index)) {
                arregloSeleccion.splice(i, 1);
            }
        }

        for (var i = 0; i < arregloSeleccion.length; i++) {
            arregloSeleccion[i].id = (i + 1).toString();
        }

        $(this).parent().parent().hide(700, function () {

            
            if (arregloSeleccion.length == 0) {
                var dataSource = new kendo.data.DataSource({
                    data: arregloSeleccion
                });

                var gridele = $("#gridDetEle").data("kendoGrid");
                gridele.setDataSource(dataSource);

                $("#detalleEle").removeClass("tabSelect");
                $("#detalleEle").hide();
                $("#CaractEle").addClass("tabSelect");
                $("#pDetEle").hide();
                $("#pDetLin").fadeIn(300);
                $("#detalleTabs").fadeOut(300);
                $("#detalleTabs").parent().parent().parent().parent().parent().animate({scrollTop:0}, '3000', 'swing', function() { 
                   
                });
            }
            else {
                var dataSource = new kendo.data.DataSource({
                    data: arregloSeleccion
                });

                var gridele = $("#gridDetEle").data("kendoGrid");
                gridele.setDataSource(dataSource);
                enlazarClick();
                //$("#pushCarrito").show();
            }

        });



    });
}

