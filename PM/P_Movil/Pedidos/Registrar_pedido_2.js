/// <reference path="../../Common/Scripts/jquery-2.0.0-vsdoc.js" />
var y;
var x;
var objClickDerecho;
$(function () {

    $(document).mousemove(function (e) {
        x = e.pageX;
        y = e.pageY;
    });

    $("#finalizar").click(function () {

        //        var tab1 = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
        //        var Accord = window.parent.$("#" + tab1);
        //        Accord.tabs("remove", Accord.tabs("option", "selected"));
        window.parent.ss;
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
    });

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




        $("#opacidad").hide(300, function () {
            $("#cuer_pe").animate({ margin: "0px", float: "left" }, 300, function () {
                $("#cuer_pe").css("float", "left");
                $("#generalCarrito").show(300, function () {

                    var cant = $("#Text1").val();
                    var a = $("#bodyCarrito > div").length;
                    var i;
                    for (i = 0; i < cant; i++) {
                        $("#bodyCarrito").append('<div class="prodEle"><div class="prodDesc">Sansumg</div><div class="prodServ">' +
                        '<select id="srvCheck' + (i + a).toString() + '" class="srvCheck" multiple="multiple"><option>Paquete datos</option><option>Rpc</option><option>Paquete minutos</option><option>paquete sms</option></select>' +
                        '</div><div class="prodPre">1000.00</div></div>');
                        $("#srvCheck" + (i + a).toString()).dropdownchecklist({ width: 148, emptyText: "Sin servicios" });
                    }


                });
            });
        });

    });

    $("#irFormaPago").click(function () { mostrarPaso("2"); });
    $("#irConfirmacion").click(function () { mostrarPaso("3"); });
    $("#irResumen").click(function () { mostrarPaso("4"); });
    $("#finalizar").click(function () { });

    $("#backProductos").click(function () { mostrarPaso("1"); });
    $("#backPago").click(function () { mostrarPaso("2"); });
    $("#backConfirmacion").click(function () { mostrarPaso("3"); });

    //$(".ElegirProd").click(function () { elegirProd(this) });

    $("#cuerpo_productos").scroll(function () {

        //alert(($(this).scrollTop() + $(this).height()) + "+" + document.getElementById("cuerpo_productos").scrollHeight);

        if (($(this).scrollTop() + $(this).height()) == document.getElementById("cuerpo_productos").scrollHeight) {
            $("#cuerpo_productos").hide(0, function () {
                $("#cuerpo_productos").append('<div class="producto"><img src="../../Images/ModeloDispositivo/12.jpg"></div>');
                $("#cuerpo_productos").append('<div class="producto"><img src="../../Images/ModeloDispositivo/171.jpg"></div>');
                $("#cuerpo_productos").append('<div class="producto"><img src="../../Images/ModeloDispositivo/2.jpg"></div>');
                $("#cuerpo_productos").append('<div class="producto"><img src="../../Images/ModeloDispositivo/44.jpg"></div>');
                $("#cuerpo_productos").append('<div class="producto"><img src="../../Images/ModeloDispositivo/40.jpg"></div>');

                $("#cuerpo_productos").fadeIn();
            });

        }

    });

    $('.tab').hover(function () {
        $(this).animate({ marginRight: '30px', marginLeft: '30px' }, 300);

    }, function () {
        $(this).animate({ marginRight: '0px', marginLeft: '0px' }, 300);
    });

    $('.tab').click(function () {

        $('.tab').removeClass("tabSelect");
        $(this).addClass("tabSelect");

    });


    //    $(".chkserv").kendoComboBox({
    //        filter: "startswith",
    //        dataTextField: "ContactName",
    //        dataValueField: "CustomerID",
    //        // define custom template
    //        template: '<input id="Checkbox1" type="checkbox" /><input id="Checkbox2" type="checkbox" /><input id="Checkbox3" type="checkbox" />'
    //    });

    display();
});

function mostrarDescPro(e, a) {
    if (e.target !== a) {
        return false;
    }
    $("#imgCel").attr("src", $(a).attr("src"));

    $("#opacidad").show();
}

function elegirProd(a) {

    $("#cuer_pe").animate({ margin: "0px" }, 300);

    $(a).find(":text").show();
}

function display() {
    if ($.browser.msie && $.browser.version <= 8) {
        $("#mostrar1").css("display", "none");
        $("#mostrar2").css("display", "none");
        $(".pasonum").css("display", "none");
        $(".paso").css("background", "gray");
        $("#paso1").css("background", "white");
    }
}

function mostrarPaso(a) {

    switch (a) {

        case "1":
            if ($.browser.msie && $.browser.version <= 8) {
                $(".paso").css("background", "gray");
                $("#paso" + a).css("background", "white");
            }
            else {
                $("#mostrar1").animate({ left: "-1000px" }, 300);
                $("#mostrar2").animate({ left: "254px" }, 300);
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
                $("#mostrar1").animate({ left: "-745px" }, 300);
                $("#mostrar2").animate({ left: "509px" }, 300);
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
                $("#mostrar1").animate({ left: "-490px" }, 300);
                $("#mostrar2").animate({ left: "764px" }, 300);
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
                $("#mostrar1").animate({ left: "-236px" }, 300);
                $("#mostrar2").animate({ left: "1020px" }, 300);
            }
            $(".controlNum").removeClass("numElegido");
            $("#" + a).addClass("numElegido");
            $(".pag").hide();
            $("#resumen").fadeIn(300);

    }

}