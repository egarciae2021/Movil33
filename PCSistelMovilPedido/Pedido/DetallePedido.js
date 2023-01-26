var oCultura = null;
$(function () {
    oCultura = window.parent.oCulturaUsuario;
    

    $(".volver").click(function () {
        if ($.browser.msie && $.browser.version == "6.0")
            window.location.href = "PedidoIE.aspx";
        else
            window.location.href = "Pedidos.aspx";
    });

    $(".guardar").click(function () {
        fnRegistrarLugarFinanciamiento();
    });

    if ($.browser.msie && $.browser.version == "6.0") {
        if ($.browser.msie && $.browser.version == "6.0") {
            $(".volver").removeClass("k-button");
            $(".volver").css({ "background-color": "#E2F0F6", "float": "left" });
            $('.volver').hover(function () {
                $(this).css({ "background-color": "skyblue", "cursor": "pointer" });
            }, function () {
                $(this).css({ "background-color": "#E2F0F6", "cursor": "default" });
            });
        }

        $("#dvTituloDetFinanc").show();
        $("#eliFinan").live("click", function () {
            $("#pnlDscFinanciamiento").css("display", "none");
            $("#global").css("display", "block");
        });
    } else {
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
    }

    $("input").live("keypress", function (e) {
        if (e.which == 13) {
            return false;
        }
    });

    $("#ddlLugar").kendoAutoComplete({
        animation: false,
        dataTextField: "NombreOficina", // The widget is bound to the "name" field
        dataSource: LugarEntrega,
        change: function (e) {
            var autocomplete = $("#ddlLugar").data("kendoAutoComplete");
            autocomplete.search($.trim(this.value()));
            var ofis = autocomplete.dataItem(0);
            $("#lblDireccion").text(ofis.DireccionOficina);
            $("#hdfIdOficina").val(ofis.IdOficina);
        },
        dataBound: function (e) {

            $("#ddlLugar").hover(function () {
                //$(this).mousemove(function (e) {
                if (!$("#ddlLugar").attr("readonly")) {
                    $("#MostrarIngreseLuFlo").css({ "left": $("#ddlLugar").offset().left + $("#ddlLugar").width() + 20, "top": $("#ddlLugar").offset().top - 7, "display": "block" });
                }
                //});
            }, function () {
                $("#MostrarIngreseLuFlo").css("display", "none");
            });
        }
    });

    $("#ddlFinanciamiento").kendoDropDownList({
        change: function (e) {
            var value = this.value();
        },
        dataBound: function (e) {

            $($("#ddlFinanciamiento").parent()).hover(function () {
                //$(this).mousemove(function (e) {

                if (!$("#ddlFinanciamiento").attr("readonly")) {
                    $("#MostrarFinanciamientoFlo").css({ "left": $($("#ddlFinanciamiento").parent()).offset().left + $($("#ddlFinanciamiento").parent()).width() + 45, "top": $($("#ddlFinanciamiento").parent()).offset().top - 7, "display": "block" });
                }
                //});
            }, function () {
                $("#MostrarFinanciamientoFlo").css("display", "none");
            });

        }
    });

    $("#imgVerDetalleFinanciamiento").click(function () {
        fnMostrarDscFinancimiento();
    });

    MostrarPedido();
    fnObtenerDetallePedido();

    $("#global").fadeIn(300);

    $(".imprimir").click(function () {
        window.print();
    });

    if (window.parent.EsSimulacion) {
        $(".simu").css("display", "none");
    }

});

function MostrarPedido() {
    $("#lblCodigoPedido").text(window.parent.Pedido.CodigoPedido);
    $("#lblFechaRegistroPedido").text(window.parent.Pedido.FechaPedido);
    $("#lblCampana").text(window.parent.Pedido.DscCampana);
    $("#lblOperador").text(window.parent.Pedido.NombreOperador);
    $("#lblSituacion").text(window.parent.Pedido.Situacion);
    $("#lblEstado").text(window.parent.Pedido.DscEstado);
    $("#lblPrecioEquipos").text(formatNumberDecimal.newo(window.parent.Pedido.MontoTotalNoServicios.toFixed(2), oCultura.Moneda.vcSimMon + " "));
    $("#lblPreciosPlanes").text(formatNumberDecimal.newo(window.parent.Pedido.MontoTotalServicios.toFixed(2), oCultura.Moneda.vcSimMon + " "));
    var totalMensual = parseFloat(window.parent.Pedido.MontoTotalNoServicios) + parseFloat(window.parent.Pedido.MontoTotalServicios);
    $("#lblTotalMensual").text(formatNumberDecimal.newo(totalMensual.toFixed(2), oCultura.Moneda.vcSimMon + " "));

    var autocomplete = $("#ddlLugar").data("kendoAutoComplete");
    autocomplete.search($.trim(window.parent.Pedido.Oficina));
    var ofis = autocomplete.dataItem(0);
    if (ofis != undefined) {
        //if (false) {
        autocomplete.select(autocomplete.ul.children().eq(0));
        $("#lblDireccion").text($.trim(ofis.DireccionOficina));
        $("#hdfIdOficina").val(ofis.IdOficina);
    }

    autocomplete.close();
    $("#ddlLugar").css("width", "382px");

    $("#ddlFinanciamiento").data("kendoDropDownList").value(window.parent.Pedido.IdTipoFinanciamiento);

    //if (window.parent.Pedido.DscEstado != "Enviado" && window.parent.Pedido.DscEstado != "Enviado Parcial") {
        $("#ddlFinanciamiento").data("kendoDropDownList").readonly();
        $("#ddlLugar").data("kendoAutoComplete").readonly(true);
        $(".guardar").css("display", "none");
    //}

        if ($.trim(window.parent.Pedido.Observacion) != "") {
            $("#dvObservacion").append("<div>" + window.parent.Pedido.Observacion + "</div>");
            $("#dvObservacion").css("display","block");
        }
}

function fnMostrarDscFinancimiento() {
    if ($("#ddlFinanciamiento").val() != '-1') {
        $("#frmDscFinanciamiento").attr("src", "Detalle_Financiamiento.aspx?IdTipoFinanciamiento=" + $("#ddlFinanciamiento").val());
        if ($.browser.msie && $.browser.version == "6.0") {
            $("#pnlDscFinanciamiento").css("display", "block");
            $("#global").css("display", "none");
        } else {
            $("#pnlDscFinanciamiento").data("kendoWindow").open();
            $(".k-window").css({ "-webkit-transform": "" });
        }
    }
}

function fnObtenerDetallePedido() {

    $.ajax({
        type: "POST",
        url: "Pedido.aspx/getDetallePedidoByPedidoMostrar",
        data: "{'prIdPedido': '" + window.parent.Pedido.IdPedido + "'," +
                "'prTipo': '" + window.parent.Pedido.Situacion + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {

            var columnas = JSON.parse(resultado.d[0]);
            var filas = JSON.parse(resultado.d[1]);

            for (var i = 0; i < filas.length; i++) {
                filas[i].Precio_Equipo = formatNumber.newo(parseFloat(filas[i].Precio_Equipo), oCultura.Moneda.vcSimMon + " ");
                filas[i].Precio_Plan = formatNumber.newo(parseFloat(filas[i].Precio_Plan).toFixed(2), oCultura.Moneda.vcSimMon + " ");
                filas[i].Cuota_Mensual_Equipo = formatNumberDecimal.newo(parseFloat(filas[i].Cuota_Mensual_Equipo).toFixed(2), oCultura.Moneda.vcSimMon + " ");
                filas[i].Total_Mensual = formatNumberDecimal.newo(parseFloat(filas[i].Total_Mensual).toFixed(2), oCultura.Moneda.vcSimMon + " ");
            }

            $("#grdSubdetalle").kendoGrid({
                dataSource: {
                    data: filas,
                    pageSize: 10
                },
                scrollable: false,
                sortable: false,
                columns: columnas,
                dataBound: onLoadSubGrillaPedido//,
//                pageable: {
//                    refresh: false,
//                    pageSizes: false,
//                    messages: {
//                        itemsPerPage: "ítems por página",
//                        display: "{0}-{1} de {2} ítems",
//                        empty: ""
//                    }
//                }
            });
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function onLoadSubGrillaPedido() {
    var t = $(this.tbody).find("tr");
    for (var i = 0; i < this._data.length; i++) {
        $($(t[i]).find("td")[1]).css("font-weight", "bolder");
        $($(t[i]).find("td")[3]).css("font-weight", "bolder");

        if (window.parent.Pedido.DscEstado == 'Cancelado') {
            $($(t[i]).find("td")[1]).text('Cancelado');
            $($(t[i]).find("td")[1]).css("color", "red");
            fnOcultarFunciones();
        }
        else if (window.parent.Pedido.DscEstado == 'No Adquirido') {
            $(t[i]).css("background", "#F9E4E0");
            $($(t[i]).find("td")[1]).css("color", "red");
            $($(t[i]).find("td")[12]).text("");
            fnOcultarFunciones();
        }
        else if (window.parent.Pedido.Situacion == 'Baja') {
            $($(t[i]).find("td")[1]).text('Enviado');
            $($(t[i]).find("td")[1]).css("color", "green");
            fnOcultarFunciones();
        }
        else {
            if (this._data[i].Estado_Adquisición != "Equipo adquirido") {
                if (this._data[i].Estado_Adquisición == "Equipo reservado") {
                    $($(t[i]).find("td")[1]).css("color", "blue");
                }
                else {
                    $(t[i]).css("background", "#F9E4E0");
                    $($(t[i]).find("td")[1]).css("color", "red");
                    $($(t[i]).find("td")[13]).text("");
                }
            }
            else {
                if (this._data[i].Equipo == "Sin Equipo") {
                    $($(t[i]).find("td")[1]).text('Enviado');
                    fnOcultarFunciones();
                }

                $($(t[i]).find("td")[1]).css("color", "green");
            }
        }
    }

    //window.parent.fnResizeHtml(document.getElementById("global").scrollHeight);

    $($(".k-header")[3]).html("Estado <br> Adquisición");
}


function fnRegistrarLugarFinanciamiento() {


    $.ajax({
        type: "POST",
        url: "DetallePedido.aspx/RegistrarFinanciamientoLugarEntrega",
        data: "{'prIdPedido': '" + window.parent.Pedido.IdPedido + "'," +
                "'pdIdFinanciamiento': '" + $("#ddlFinanciamiento").data("kendoDropDownList").value() + "'," +
                "'prIdOficina': '" + $("#hdfIdOficina").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {

            alerta("Registro de lugar y financiamiento exitoso");

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}


function fnOcultarFunciones() {
    $("#ddlFinanciamiento").data("kendoDropDownList").readonly();
    $("#ddlLugar").data("kendoAutoComplete").readonly(true);
    $(".guardar").css("display", "none");
    $(".esBaja").css("display", "none");
}