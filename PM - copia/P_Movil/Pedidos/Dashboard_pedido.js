/// <reference path="../../Common/Scripts/jquery-2.0.0-vsdoc.js" />
$(function () {

    $(".cbar").progressbar({
        value: 50,
        max: 100
    }).css({ "height": "10px" }); //.find( ".ui-progressbar-value" ).css({"background":"red"});

    $("#btnComprar").button();
    $("#GuardarMisLineas").button();

    $("#btnComprar").click(function () {
        AbrirTab("RegistroPedido", "Registro Pedido", "P_Movil/Pedidos/Registrar_pedido_2.aspx");
    });

    load();

});




function load() {

    $.ajax({
        type: "POST",
        url: "Dashboard_pedido.aspx/mostrarProductoCreditoAsignado",
        data: "{'prIdEmpleado': '" + "1" + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;

            $.each(resul.ProductoCreditoAsignado, function (i, val) {
                $("#pIndicadores").append('<div id="indi' + i + '" class="pMedium fIndi">' +
                '<div class="cGen">' + val["DescripcionProducto"] + '</div>' +
                '<div class="cGenDatos">' + val["Aprobado"] + '</div>' +
                '<div class="cGenDatos">' + val["Utilizado"] + '</div>' +
                '<div class="cGenDatos">' + val["Disponible"] + '</div>' +
                '<div id="inibar' + i + '" class="cbar"></div></div>');

                $("#inibar" + i).progressbar({
                    value: val["Utilizado"],
                    max: val["Aprobado"]
                }).css({ "height": "10px" });

            });

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });


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