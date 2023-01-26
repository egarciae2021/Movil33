/// <reference path="../../Common/Scripts/jquery-2.0.0-vsdoc.js" />
$(function () {

    $(".controlNum").click(function () { mostrarPaso($(this).attr("id")); });
    $("#opacidad").click(function () { $("#opacidad").hide(); });
    $(".producto").click(function (e) { mostrarDescPro(e, this); });

    $(".next").button();
    $(".back").button();

    $("#irFormaPago").click(function () { mostrarPaso("2"); });
    $("#irConfirmacion").click(function () { mostrarPaso("3"); });
    $("#irResumen").click(function () { mostrarPaso("4"); });
    $("#finalizar").click(function () { });

    $("#backProductos").click(function () { mostrarPaso("1"); });
    $("#backPago").click(function () { mostrarPaso("2"); });
    $("#backConfirmacion").click(function () { mostrarPaso("3"); });

    $(".ElegirProd").click(function () { elegirProd(this); });

    $("#cuerpo_productos").scroll(function () {

        //alert(($(this).scrollTop() + $(this).height()) + "+" + document.getElementById("cuerpo_productos").scrollHeight);

        if (($(this).scrollTop() + $(this).height()) == document.getElementById("cuerpo_productos").scrollHeight) {
            $("#cuerpo_productos").hide(0, function () {
                $("#cuerpo_productos").append('<div class="dvPanel producto"><div class="ElegirProd"><span class="ui-icon ui-icon-plus"></span></div></div>');
                $("#cuerpo_productos").append('<div class="dvPanel producto"><div class="ElegirProd"><span class="ui-icon ui-icon-plus"></span></div></div>');
                $("#cuerpo_productos").append('<div class="dvPanel producto"><div class="ElegirProd"><span class="ui-icon ui-icon-plus"></span></div></div>');
                $("#cuerpo_productos").append('<div class="dvPanel producto"><div class="ElegirProd"><span class="ui-icon ui-icon-plus"></span></div></div>');
                $("#cuerpo_productos").append('<div class="dvPanel producto"><div class="ElegirProd"><span class="ui-icon ui-icon-plus"></span></div></div>');
                $("#cuerpo_productos").append('<div class="dvPanel producto"><div class="ElegirProd"><span class="ui-icon ui-icon-plus"></span></div></div>');
                $("#cuerpo_productos").append('<div class="dvPanel producto"><div class="ElegirProd"><span class="ui-icon ui-icon-plus"></span></div></div>');
                $("#cuerpo_productos").append('<div class="dvPanel producto"><div class="ElegirProd"><span class="ui-icon ui-icon-plus"></span></div></div>');
                $("#cuerpo_productos").fadeIn();
            });
        }
    });

    display();
});

function mostrarDescPro(e,a) {
    if (e.target !== a) {
        return false;
    }
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