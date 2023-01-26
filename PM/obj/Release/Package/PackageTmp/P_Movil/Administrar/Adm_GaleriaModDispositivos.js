var blUsarPrecio = 1;  // 1 = Precio Lista ; 0 = Precio Especial
var width = parent.parent.window.innerWidth; //tamaño de toda la ventana
var wContenedorTab = window.innerWidth;
var wNavi = "300px";
var numMini = 9;
var numPag = 7;
var topPag = true;
var nombreModelo = '';
var codigoModelo = '';
var vCostoModelo = '-1';
var btSopLin = '';
var oCulturaLocal = window.parent.parent.parent.oCulturaUsuario;
var Operadores = [];
var PreciosOperador = [];
var inCodModDis = '';

var valAvance = true;
var nuAltoFila = 23.04;

function cargarPreciosModelo(inCodModDis) {
    var inCodOpe = $("#ddlOperador").val();
    if (!PreciosOperador[inCodModDis]) {
        $.ajax({
            type: "POST",
            url: "Adm_GaleriaModDispositivos.aspx/PreciosOperador",
            data: "{'inCodModDis': '" + inCodModDis + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                eval(result.d);
                if (inCodOpe != '-1' && inCodOpe != '0') {
                    //var Precio = PreciosOperador[inCodModDis].Precios[inCodOpe].dePreLis;
                    var Precio = (blUsarPrecio == 0 ? PreciosOperador[inCodModDis].Precios[inCodOpe].dePreEsp : PreciosOperador[inCodModDis].Precios[inCodOpe].dePreLis);
                    if (Precio == '') {
                        $("#lblCosto-" + inCodModDis).html('No definido');
                        $($(".selected").children()[0]).attr("costoReferencial", '-1');
                    } else {
                        $("#lblCosto-" + inCodModDis).html(FormatoNumero(Precio, oCulturaLocal));
                        $($(".selected").children()[0]).attr("costoReferencial", Precio);
                    }
                } else {
                    $("#lblCosto-" + inCodModDis).html("Seleccione operador...");
                    $($(".selected").children()[0]).attr("costoReferencial", '-1');
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    } else {
        if (inCodOpe != '-1' && inCodOpe != '0') {
            //var Precio = PreciosOperador[inCodModDis].Precios[inCodOpe].dePreLis;
            var Precio = (blUsarPrecio == 0 ? PreciosOperador[inCodModDis].Precios[inCodOpe].dePreEsp : PreciosOperador[inCodModDis].Precios[inCodOpe].dePreLis);
            if (Precio == '') {
                $("#lblCosto-" + inCodModDis).html('No definido');
                $($(".selected").children()[0]).attr("costoReferencial", '-1');
            } else {
                $("#lblCosto-" + inCodModDis).html(FormatoNumero(Precio, oCulturaLocal));
                $($(".selected").children()[0]).attr("costoReferencial", Precio);
            }
        } else {
            $("#lblCosto-" + inCodModDis).html("Seleccione operador...");
            $($(".selected").children()[0]).attr("costoReferencial", '-1');
        }
    }
}

$(function () {
    //deshabilitar chk de pedido con linea
    $("#chkLinea").attr("disabled", true);

    //reload
    if ($("#hdfCodOpe").val() == '0' && $("#hdfCodOpe").val() == '-1' && $("#hdfCodOpe").val() == '') { //solicitud nuevo
        cargarPreciosModelo($("#hdfCodModeloDisp").val());
    }

    //JHERRERA 20160824: Cambio para Chile
    $("#trOperador").hide();
    $("#trCosto").hide();
    //    if ($("#ddlOperador").val() != "-1" && $("#ddlOperador").val() != "0") {
    if ($("#ddlOperador").val() != "-1" && $("#ddlOperador").val() != "0" && $("#ddlOperador").val() != null) {
        $("#hdfCodOpe").val($("#ddlOperador").val());
    }

    function fnCargarOperador(value, flag) {
        //imagen seleccionada
        inCodModDis = $("#hdfCodModeloDisp").val(); // $($(".selected").children()[0]).attr("codmoddis").toString();
        var nomMod = $("#hdfModeloDisp").val(); //$($(".selected").children()[0]).attr("title").toString();  
        var vcNomOpe = $("#ddlOperador option[value='" + value + "']").text();
        //inCodModDis = $("#hdfCodModeloDisp").val();
        var inCodOpe = value;
        if (value != "-1" && inCodOpe != '0') {
            if (flag == true || !PreciosOperador[inCodModDis]) {
                $.ajax({
                    type: "POST",
                    url: "Adm_GaleriaModDispositivos.aspx/PreciosOperador",
                    data: "{'inCodModDis': '" + inCodModDis + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        eval(result.d);
                        //var Precio = PreciosOperador[inCodModDis].Precios[inCodOpe].dePreLis;
                        var Precio = (blUsarPrecio == 0 ? PreciosOperador[inCodModDis].Precios[inCodOpe].dePreEsp : PreciosOperador[inCodModDis].Precios[inCodOpe].dePreLis);
                        if (Precio == '') {
                            $("#lblCosto").html('No definido');
                            $($(".selected").children()[0]).attr("costoReferencial", '-1');
                            window.parent.codDispositivoGaleria(inCodModDis, nomMod, '-1', inCodOpe, vcNomOpe);
                        } else {
                            $("#lblCosto").html(FormatoNumero(Precio, oCulturaLocal));
                            $($(".selected").children()[0]).attr("costoReferencial", Precio);
                            window.parent.codDispositivoGaleria(inCodModDis, nomMod, Precio, inCodOpe, vcNomOpe);
                        }
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            } else {
                //var Precio = PreciosOperador[inCodModDis].Precios[inCodOpe].dePreLis;
                var Precio = (blUsarPrecio == 0 ? PreciosOperador[inCodModDis].Precios[inCodOpe].dePreEsp : PreciosOperador[inCodModDis].Precios[inCodOpe].dePreLis);
                if (Precio == '') {
                    $("#lblCosto").html('No definido');
                    $($(".selected").children()[0]).attr("costoReferencial", '-1');
                    window.parent.codDispositivoGaleria(inCodModDis, nomMod, '-1', inCodOpe, vcNomOpe);
                } else {
                    $("#lblCosto").html(FormatoNumero(Precio, oCulturaLocal));
                    $($(".selected").children()[0]).attr("costoReferencial", FormatoNumero(Precio, oCulturaLocal));
                    window.parent.codDispositivoGaleria(inCodModDis, nomMod, Precio, inCodOpe, vcNomOpe);
                }
            }
        } else {
            $("#lblCosto").html("Seleccione operador...");
            $($(".selected").children()[0]).attr("costoReferencial", '-1');
            window.parent.codDispositivoGaleria(inCodModDis, nomMod, '-1', inCodOpe, vcNomOpe);
        }
    }

    $(".Operador").live("change", function () {
        fnCargarOperador(this.value);
    });

    //ranTant inicial
    var anchoAct = $(window).width();
    var ranTant;
    if (anchoAct > 1201) { //1
        ranTant = 1;
        //window.location.reload();
        //$("#thumbs").css({"width":"1500"});
    } else if (anchoAct > 1101) { //2
        ranTant = 2;
        //window.location.reload();
    } else if (anchoAct > 995) { //3
        ranTant = 3;
        //window.location.reload();
    } else if (anchoAct > 881) { //4
        ranTant = 4;
        //window.location.reload();
    } else if (anchoAct > 661) { //5
        ranTant = 5;
        //window.location.reload();
    } else {
        ranTant = 6;
    }
    //alert("ratTant: " + ranTant + "\nanchoAct: " + anchoAct);
    //fin ranTant incial

    $("input:checkbox,input:radio,input:file").uniform();

    //13/05/2014 - wapumayta
    $(window).resize(function () {
        DimPosElementos();
    });

    $(window).resize(function () {
        $('.advance-link > img').css("height", $(window).height() - 135);

        $("#caption").dialog('destroy');
        $("#dvCaptionCont").append($("#caption"));
        if (!$("#caption").hasClass("ui-widget-content")) {
            $("#caption").addClass("ui-widget-content");
        }
        //                $("#caption").css("height", "240px;");
        fnVerDetalles();
    });

    var mPag = 1;
    var ranTnue;
    function DimPosElementos() {
        //var AnchoV = $('#slideshow a.advance-link img').css("width");
        //var AltoV = $('#slideshow a.advance-link img').css("height");
        var AnchoV = $(window).width();
        //var AnchoV2 = window.innerWidth;
        mPag = parseInt(mPag) + 1;
        //alert(AnchoV + " , " + AnchoV2);
        //var AltoV = $(window).height();

        if (AnchoV > 1201) { //1
            ranTnue = 1;
            //window.location.reload();
            //$("#thumbs").css({"width":"1500"});
        } else if (AnchoV > 1101) { //2
            ranTnue = 2;
            //window.location.reload();
        } else if (AnchoV > 995) { //3
            ranTnue = 3;
            //window.location.reload();
        } else if (AnchoV > 881) { //4
            ranTnue = 4;
            //window.location.reload();
        } else if (AnchoV > 661) { //5
            ranTnue = 5;
        } else {
            ranTnue = 6;
        }
        //alert("ancho:" + AnchoV + ",\nTamAnte:  " + ranTant + "\nTamNuev: " + ranTnue);
        if (ranTant != ranTnue) {
            window.location.reload();
        } else {
            ranTant = ranTnue;
        }

        var ancho = parseInt(window.parent.$("#tbSolicitud").css("height").split(".")[0]) - 36 - 50;
        inFilas = Math.floor(($(window).height() - 280) / nuAltoFila);
        inFilas = inFilas - 1;
        var gridElement = $("#grillaDispositivos");
        gridElement.css("height", ancho.toString() + "px;");
        gridElement.height(ancho.toString());
        gridElement.data("kendoGrid").resize();
        gridElement.data("kendoGrid").dataSource.pageSize(inFilas);
        gridElement.data("kendoGrid").refresh();

    }
    //function DimPosElementos() {
    //    alert("DimPosElementos");
    //    //var AnchoV = $('#slideshow a.advance-link img').css("width");
    //    //var AltoV = $('#slideshow a.advance-link img').css("height");
    //    var AnchoV = $(window).width();
    //    //var AnchoV2 = window.innerWidth;
    //    mPag = parseInt(mPag) + 1;
    //    //alert(AnchoV + " , " + AnchoV2);
    //    //var AltoV = $(window).height();
    //
    //    if (AnchoV > 1201) { //1
    //        ranTnue = 1;
    //        //window.location.reload();
    //        //$("#thumbs").css({"width":"1500"});
    //    } else if (AnchoV > 1101 && AnchoV < 1121) { //2
    //        ranTnue = 2;
    //        //window.location.reload();
    //    } else if (AnchoV > 995 && AnchoV < 1005) { //3
    //        ranTnue = 3;
    //        //window.location.reload();
    //    } else if (AnchoV > 881 && AnchoV < 911) { //4
    //        ranTnue = 4;
    //        //window.location.reload();
    //    } else if (AnchoV > 661 && AnchoV < 680) { //5
    //        ranTnue = 5;
    //        //window.location.reload();
    //    } else {
    //        ranTnue = 6;
    //    }
    //    alert("ancho:" + AnchoV + ",\nTamAnte:  " + ranTant + "\nTamNuev: " + ranTnue);
    //    if (ranTant != ranTnue) {
    //        alert("cambiar tamaño (recargar)");
    //        window.location.reload();
    //    } else {
    //        ranTant = ranTnue;
    //    }
    //}

    //resolusion del navegador
    //alert(wContenedorTab);
    function fnVerDetalles() {
        //wContenedorTab = window.innerWidth;
        wContenedorTab = document.documentElement.clientWidth;
        //

        topPag = true;
        $("#gallery").css("width", "620px");
        $("#caption").show();
        $("#thumbs").css("height", "270px;");
        $("#thumbs").css("overflow", "auto");
        $("#btnDetalles").hide();

        if (wContenedorTab > "1200") {
            wNavi = "500px";
            numMini = 15;
            numPag = 7;
        } else if (wContenedorTab > "1100") {
            wNavi = "400px";
            numMini = 12;
            numPag = 7;
        } else if (wContenedorTab > "1000") {
            wNavi = "300px";
            numMini = 9;
            numPag = 6;
        } else if (wContenedorTab > "883") {
            wNavi = "232px";
            numMini = 6;
            numPag = 3;
        } else if (wContenedorTab > "590") {
            wNavi = "132px";
            numMini = 300;
            numPag = 3;
            topPag = false;
            $("#gallery").css("width", "510px");
            $("#caption").hide();
            $("#thumbs").css("height", "350px;");
            $("#thumbs").css("overflow", "auto");

            $("#btnDetalles").show();
            $("#btnDetalles").button({});
        } else {
            wNavi = "300px";
            numMini = 9;
            numPag = 6;
        }
        $('div.navigation').css({ 'width': wNavi, 'float': 'left' });
        $('div.content').css('display', 'block');
    }

    fnVerDetalles();

    $("#btnDetalles").click(function () {
        if (!valAvance) { return; }


        $("#caption").css("resize", false);
        modal = $("#caption").dialog({
            modal: true,
            //width: '300px',
            //height: '550px',
            title: 'Detalles de Modelo'
        });
    });

    $("#btnCancelar").click(function () {
        $("#dvDetalleDispositivo").dialog("close");
    });

    //var grid = $("#grillaDispositivos").data("kendoGrid");

    $("#btnAceptar").click(function () {

        var costoOperador = $("#ddlOperador").val() == '-1' ? null : $("#lblCosto").text();

        var grilla = $("#grillaDispositivos").data("kendoGrid");
        var data = grilla.dataSource.data();
        var filaActual = parseInt($("#hdfFilaActual").val());

        var TamanioPagina = grilla.dataSource.pageSize();
        var pagina = Math.ceil((filaActual + 1) / TamanioPagina);
        var codigo = $("#hdfIdDispositivo").val();


        var tiposolicitud = window.parent.$("#hdfTipoSolicitud").val();




        grilla.dataSource.page(pagina);
        grilla.refresh();
        $('[data-uid=' + data[filaActual].uid + ']').addClass('k-state-selected');


        if (!valAvance && (tiposolicitud == "2" || tiposolicitud == "4")) {
            CargarGrillaDetalleDialog(codigo);
        }
        else {
            CargarGrillaDetalle(codigo, costoOperador);
            window.parent.desactivarTabPlanes(false);
            window.parent.$("#btnSiguiente").button("option", "disabled", false);
        }


        $("#dvDetalleDispositivo").dialog("close");
    });



    $("#btnAtras").click(function () {

        var grilla = $("#grillaDispositivos").data("kendoGrid");
        var data = grilla.dataSource.data();
        var filaActual = parseInt($("#hdfFilaActual").val());

        if (filaActual <= 0) {

        }
        else {
            var filaAnterior = filaActual - 1;
            $("#hdfFilaActual").val(filaAnterior);
            var codigo = data[filaAnterior].Id;
            $("#hdfIdDispositivo").val(codigo);

            CargarGrillaDetalleDialog(codigo);
        }

    });

    $("#btnSiguiente").click(function () {

        var grilla = $("#grillaDispositivos").data("kendoGrid");
        var data = grilla.dataSource.data();
        var filaActual = parseInt($("#hdfFilaActual").val());

        var TotalFilas = data.length;


        if (filaActual >= data.length - 1) {

        }
        else {
            var filaSiguiente = filaActual + 1;



            //var TamanioPagina = grid.dataSource.pageSize();
            //var pagina = Math.ceil((filaSiguiente + 1) / TamanioPagina);
            //grilla.dataSource.page(pagina);
            //grilla.refresh();

            $("#hdfFilaActual").val(filaSiguiente);
            var codigo = data[filaSiguiente].Id;
            $("#hdfIdDispositivo").val(codigo);

            CargarGrillaDetalleDialog(codigo);
        }

    });


    //GALERIA
    //$('div.navigation').css({ 'width': wNavi, 'float': 'left' });
    //$('div.content').css('display', 'block');
    //
    //var onMouseOutOpacity = 0.67;
    //if ($('#thumbs ul.thumbs li').length != 0) {
    //    $('#thumbs ul.thumbs li').opacityrollover({
    //        mouseOutOpacity: onMouseOutOpacity,
    //        mouseOverOpacity: 1.0,
    //        fadeSpeed: 'fast',
    //        exemptionSelector: '.selected'
    //    });
    //
    //    var gallery = $('#thumbs').galleriffic({
    //        delay: 1500,
    //        numThumbs: numMini,
    //        preloadAhead: 10,
    //        enableTopPager: topPag,
    //        enableBottomPager: false,
    //        maxPagesToShow: numPag,
    //        imageContainerSel: '#slideshow',
    //        controlsContainerSel: '#controls',
    //        captionContainerSel: '#caption',
    //        loadingContainerSel: '#loading',
    //        renderSSControls: true,
    //        renderNavControls: true,
    //        playLinkText: 'Reproducir',
    //        pauseLinkText: 'Pausar',
    //        prevLinkText: '&lsaquo; Modelo anterior',
    //        nextLinkText: 'Siguiente Modelo &rsaquo;',
    //        nextPageLinkText: 'Siguiente &rsaquo;',
    //        prevPageLinkText: '&lsaquo; Anterior',
    //        enableHistory: false,
    //        autoStart: false,
    //        syncTransitions: true,
    //        defaultTransitionDuration: 900,
    //        onSlideChange: function (prevIndex, nextIndex) {
    //            this.find('ul.thumbs').children()
    //			.eq(prevIndex).fadeTo('fast', onMouseOutOpacity).end()
    //			.eq(nextIndex).fadeTo('fast', 1.0);
    //            //datos de seleccion
    //            nombreModelo = $($(".thumb")[nextIndex]).attr("title").toString();
    //            codigoModelo = $($(".thumb")[nextIndex]).attr("codModDis").toString();
    //            btSopLin = $($(".thumb")[nextIndex]).attr("btSopLin");
    //            if ($("#hdfTipoSolicitud").val() == '2' && $("#hdfCodEmpleado").val() != '-1') {
    //                if (btSopLin != 'False') {
    //                    $("#divSolLin").show();
    //                    $("#hdfDispSelectSopLin").val('1')
    //                    VerificaHabilitadoEmpleado($("#hdfCodEmpleado").val());
    //                } else {
    //                    $("#divSolLin").hide();
    //                    $("#hdfDispSelectSopLin").val('0')
    //                    window.parent.desactivarTabPlanes(true);
    //                }
    //            } else {
    //                if ($("#hdfPermiteLinea").val() == '1') {
    //                    if (btSopLin != 'False') {
    //                        $("#divSolLin").show();
    //                        $("#hdfDispSelectSopLin").val('1')
    //                        window.parent.desactivarTabPlanes(false);
    //                    } else {
    //                        $("#divSolLin").hide();
    //                        $("#hdfDispSelectSopLin").val('0')
    //                        window.parent.desactivarTabPlanes(true);
    //                    }
    //                }
    //            }
    //            if ($("#hdfCodOpe").val() != "0" && $("#hdfCodOpe").val() != '-1' && $("#hdfCodOpe").val() != '') { //existe operadro(cambio o reposicoin)
    //                vCostoModelo = $($(".thumb")[nextIndex]).attr("costoCambio");
    //            } else { //no exite operador (nuevo)
    //                vCostoModelo = $($(".thumb")[nextIndex]).attr("costoReferencial");
    //            }
    //            $("#hdfCodModeloDisp").val(codigoModelo);
    //            var vcNomOpe = $("#ddlOperador-" + codigoModelo + " option[value='" + $(this).val() + "']").text();
    //            var inCodOpe = $("#ddlOperador-" + codigoModelo).val();
    //            window.parent.codDispositivoGaleria(codigoModelo, nombreModelo, vCostoModelo, inCodOpe, vcNomOpe);
    //            //alert(codigoModelo + "; " + nombreModelo + "; " + vCostoModelo);
    //        },
    //        onPageTransitionOut: function (callback) {
    //            this.fadeTo('fast', 0.0, callback);
    //        },
    //        onPageTransitionIn: function () {
    //            this.fadeTo('fast', 1.0);
    //        }
    //    });
    //} else { //no existe ningun dispositivo
    //    $("#btnAtras").focus();
    //};
    //

    //con linea
    //if ($("#chkLinea").is(":checked")) { //solicitud de linea
    //$("#chkLinea").click(function () {
    //    desactivarTabPlanes();
    //});

    grillaDispositivos();
    //CargarDispositivos();


    $(".btnDispositivoDetalle").live("click", function () {
        var tiposolicitud = window.parent.$("#hdfTipoSolicitud").val();
        var codigo = $(this).attr('id');

        //        if ($("#ddlOperador").val() != "-1" && $("#ddlOperador").val() != "0") {
        //            $("#hdfCodModeloDisp").val(codigo);
        //            fnCargarOperador($("#ddlOperador").val(), true);
        //        }

        //cargarPreciosModelo(codigo);

        if (!valAvance && (tiposolicitud == "2" || tiposolicitud == "4")) {

            CargarGrillaDetalleDialog(codigo);
        }
        else {
            CargarGrillaDetalle(codigo);
            $("#hdfIdDispositivo").val(codigo);
        }

        modal = $("#dvDetalleDispositivo").dialog({
            modal: true,
            width: $(parent.window).width() - 500,
            height: $(parent.window).height() - 180,
            resizable: false,
            title: 'Detalles de Modelo'
        });
    });

    //$("#grillaDispositivos")

    window.parent.desactivarTabPlanes(true);
    window.parent.$("#btnSiguiente").button("option", "disabled", true);

    $("#cboTipoServicio").change(function () {
        grillaDispositivos();
    });

    DimPosElementos();
});


function CargarGrillaDetalle(codigo, vPrecioOperador) {
    var grilla = $("#grillaDispositivos").data("kendoGrid");
    var data = grilla.dataSource.data();

    var i = 0;
    for (i = 0; i < data.length; i++) {
        var fila = data[i];
        if (fila.Id == codigo) {
            $("#hdfFilaActual").val(i);
            nombreModelo = fila.modelo;
            codigoModelo = fila.Id;
            btSopLin = fila.btSopLin;

            var rutaImagen = $(this).attr('src');

            $("#imgDetalle").attr('src', fila.imgmodelo);

            if ($("#hdfTipoSolicitud").val() == '2' && $("#hdfCodEmpleado").val() != '-1') {
                if (btSopLin != 'False') {
                    $("#divSolLin").show();
                    $("#hdfDispSelectSopLin").val('1');
                    $("#lblSoportaLinea").html("Si");
                    VerificaHabilitadoEmpleado($("#hdfCodEmpleado").val());
                } else {
                    $("#divSolLin").hide();
                    $("#hdfDispSelectSopLin").val('0');
                    $("#lblSoportaLinea").html("No");
                    window.parent.desactivarTabPlanes(true);
                }
            } else {
                if ($("#hdfPermiteLinea").val() == '1') {
                    if (btSopLin != 'False') {
                        $("#divSolLin").show();
                        $("#hdfDispSelectSopLin").val('1');
                        $("#lblSoportaLinea").html("Si");
                        window.parent.desactivarTabPlanes(false);
                    } else {
                        $("#divSolLin").hide();
                        $("#hdfDispSelectSopLin").val('0');
                        $("#lblSoportaLinea").html("No");
                        window.parent.desactivarTabPlanes(true);
                    }
                }
            }
            if ($("#hdfCodOpe").val() != "0" && $("#hdfCodOpe").val() != '-1' && $("#hdfCodOpe").val() != '') { //existe operadro(cambio o reposicoin)
                vCostoModelo = fila.costoCambio;

            } else { //no exite operador (nuevo)
                if (vPrecioOperador != null && vPrecioOperador != undefined) {
                    vCostoModelo = vPrecioOperador;
                } else {
                    vCostoModelo = fila.costoReferencial;
                }
            }

            if ($("#hdfPermiteLinea").val() == '1') {
                $("#trOperador").css("display", "none");
                $("#trCosto").css("display", "none");
            }

            if ($("#hdfCodOpe").val() != '0' && $("#hdfCodOpe").val() != '-1' && $("#hdfCodOpe").val() != '') {
                $("#ddlOperador").css("display", "none");
                $("#lblOperador").css("display", "");
                $("#lblOperador").html(fila.vcNomOpe);
                $("#lblCosto").html(FormatoNumero(fila.dePreEsp, oCulturaLocal));
            }
            else {
                $("#lblCosto").html("Seleccione Operador");

            }



            $("#hdfCodModeloDisp").val(fila.Id);
            $("#lblModelo").html(fila.modelo);
            $("#lblDescripcion").html(fila.Descripcion);
            $("#hdfModeloDisp").val(fila.modelo);
            $("#lblGrupoModelo").html(fila.GrupoDispotivo);
            $("#lblTipoModelo").html(fila.TipoModelo);
            $("#lblTipoChip").html(fila.NombreTipoChip);


            $("#hdfCodModeloDisp").val(codigoModelo);
            if ($("#ddlOperador").val() != "-1" && $("#ddlOperador").val() != "0") {
                //$(".Operador").trigger('change');
                //$("#hdfCodModeloDisp").val();
                //fnCargarOperador($("#ddlOperador").val());
            }

            var vcNomOpe = $('select[name="ddlOperador"] option:selected').text();
            var inCodOpe = $("#ddlOperador").val();

            window.parent.codDispositivoGaleria(codigoModelo, nombreModelo, vCostoModelo, inCodOpe, vcNomOpe);

        }
    }

}

function CargarGrillaDetalleDialog(codigo) {
    var grilla = $("#grillaDispositivos").data("kendoGrid");
    var data = grilla.dataSource.data();

    var i = 0;
    for (i = 0; i < data.length; i++) {
        var fila = data[i];
        if (fila.Id == codigo) {
            $("#hdfFilaActual").val(i);
            nombreModelo = fila.modelo;
            codigoModelo = fila.Id;
            btSopLin = fila.btSopLin;


            if (btSopLin != 'False') {
                $("#lblSoportaLinea").html("Si");

            } else {
                $("#lblSoportaLinea").html("No");
            }

            if ($("#hdfPermiteLinea").val() == '1') {
                $("#trOperador").css("display", "none;");
                $("#trCosto").css("display", "none;");
            }


            if ($("#hdfCodOpe").val() != '0' && $("#hdfCodOpe").val() != '-1' && $("#hdfCodOpe").val() != '') {
                $("#ddlOperador").css("display", "none");
                $("#lblOperador").css("display", "");
                $("#lblOperador").html(fila.vcNomOpe);
                //                $("#lblCosto").html(fila.dePreEsp);
                $("#lblCosto").html(FormatoNumero(fila.dePreEsp, oCulturaLocal));
            }
            else {
                $("#lblCosto").html("Seleccione Operador");
            }



            var rutaImagen = $(this).attr('src');
            $("#imgDetalle").attr('src', fila.imgmodelo);
            $("#hdfCodModeloDisp").val(fila.Id);
            $("#lblModelo").html(fila.modelo);
            $("#lblDescripcion").html(fila.Descripcion);
            $("#hdfModeloDisp").val(fila.modelo);
            $("#lblGrupoModelo").html(fila.GrupoDispotivo);
            $("#lblTipoModelo").html(fila.TipoModelo);
            $("#lblTipoChip").html(fila.NombreTipoChip);

        }
    }

}

//end if

//$(".advance-link").css("height", "250px;");
//$(".advance-link").css("width", "250px;");
//$(".image - wrapper").css("height", "250px;");
//$(".image - wrapper").css("width", "250px;");


//$(".thumb").live("click", function () {
//    //nombre de modelo seleccionado
//    nombreModelo = $(this).attr("title").toString();
//    var vCostoModelo = '-1';
//    if ($("#hdfCodOpe").val() != "0" && $("#hdfCodOpe").val() != '-1') { //existe operadro(cambio o reposicoin)
//        vCostoModelo = $(this).attr("costoCambio");
//    } else { //no exite operador (nuevo)
//        vCostoModelo = $(this).attr("costoReferencial");
//    }
//    $("#hdfCodModeloDisp").val($(this).attr("codModDis"));
//    //alert($("#hdfCodModeloDisp").val());
//    //if ($("#hdfCodPlan").val() == '0') { //solicitud nuevo
//    //    cargarPreciosModelo($(this).attr("codModDis"));
//    //}
//    if ($("#hdfPermiteLinea").val() != "0") {
//        //window.parent.DeshabilitarContinuar('1');
//
//        //comentado 22/08/2014 - wapumayta (RespTck:1374)(plan no sera escogido en la creacion)
//        //var btSopLin = $(this).attr("btSopLin");
//        //if (btSopLin != 'False') {
//        //    $("#divSolLin").show();
//        //    $("#hdfDispSelectSopLin").val('1')
//        //} else {
//        //    $("#divSolLin").hide();
//        //    $("#hdfDispSelectSopLin").val('0')
//        //}
//        window.parent.HabilitarContinuar();
//
//    };
//    //alert("Codigo: " + $("div .caption input").attr("value") + "\nNombreModelo: " + nombreModelo + "\ncodModDis: " + $(this).attr("codModDis") + "\nbtSopLin: " + $(this).attr("btSopLin"));
//    //alert("costo: " + $("#lblCosto").text() + "\nOperador: " + $("#ddlOperador").val());
//    //alert($(this).attr("codModDis") + "\nOperador: " + $("#ddlOperador").val());
//    window.parent.codDispositivoGaleria($(this).attr("codModDis"), nombreModelo, vCostoModelo);
//
//});
function desactivarTabPlanes(valor) {
    if (!$("#chkLinea").is(":checked")) {
        window.parent.desactivarTabPlanes(valor);
    }
}

function conLinea() {
    var conLinea;
    if ($("#hdfDispSelectSopLin").val() == '1') { //dispositivo soporta linea
        if ($("#chkLinea").is(":checked")) { //solicitud de linea
            conLinea = 1;
        } else {
            conLinea = 0; //solicitud de dispositivo sin linea
        }
    } else { //dispositivo no soporta linea
        conLinea = 2;
    }
    return conLinea;
}

function ningunDisp() {
    return true;
}

function desactivarCheckLinea() {
    $("#chkLinea").attr("disabled", true);
}

function VerificaHabilitadoEmpleado(Empleado) {
    $.ajax({
        type: "POST",
        url: "Adm_NuevaSolicitud.aspx/VerificaLineaEmpleadoNuevo",
        data: "{'vcCodEmp': '" + Empleado + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {


            //$("#btnEquiSol").hide();
            if (result.d == "1") {
                //msgValidacionGrilla = "Ya tiene una solicitud pendiente para adquirir un nuevo equipo";
                //$("#dvCreacionEstado").hide();
                valAvance = false;
                //$("#btnEquiSol").show();
                window.parent.desactivarTabPlanes(true);
            } else if (result.d == "2") {
                //msgValidacionGrilla = "Usted no puede adquirir más equipos porque ha llegado al número máximo de dispositivos configurado para su grupo.";
                valAvance = false;
                //$("#dvCreacionEstado").hide();
                window.parent.desactivarTabPlanes(true);
            } else if (result.d == "3") {
                //msgValidacionGrilla = "Usted no está incluido en ninguna política";
                valAvance = false;
                //$("#dvCreacionEstado").hide();
                window.parent.desactivarTabPlanes(true);
            } else {
                //mostrar tabs
                //msgValidacionGrilla = '';
                //$("#dvCreacionEstado").show();
                //$("#btnSiguiente").button("option", "disabled", false);                   
                //window.parent.desactivarTabPlanes(false); //Comentado Jcamacho
            }
            //$("#lblMensajeVerificacion").html(msgValidacionGrilla);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function grillaDispositivos() {
    var altoGrilla = parseInt(window.parent.$("#tbSolicitud").css("height").split(".")[0]) - 36 - 50;
    $("#grillaDispositivos").kendoGrid({
        //dataSource: dataGrilla,
        dataSource: [],
        //culture: "es-ES",
        sortable: true,
        pageable: {
            pageSize: 5,
            buttonCount: 3,
            messages: {
                page: "Enter page",
                display: "Mostrando {0} - {1} de {2} dispositivos",
                empty: "No tiene Dispositivos asignados",
                first: "Ir a la primera página",
                previous: "Ir a la página anterior",
                next: "Ir a la página siguiente",
                last: "Ir a la última página"
            }
        },
        columns: [
            { field: "rowNumber", title: "N°", width: "30px", attributes: { style: "text-align: center;" }, filterable: false },
            { field: "Id", title: "Id", width: "20%", hidden: true, filterable: false },
            { field: "btSopLin", title: "btSopLin", width: "20%", hidden: true, filterable: false },
            { field: "vCostoModelo", title: "vCostoModelo", width: "20%", hidden: true, filterable: false },
            { field: "costoCambio", title: "costoCambio", width: "20%", hidden: true, filterable: false },
            { field: "costoReferencial", title: "costoReferencial", width: "20%", hidden: true, filterable: false },
            { field: "vcNomOpe", title: "vcNomOpe", width: "20%", hidden: true, filterable: false },
            { field: "dePreEsp", title: "dePreEsp", width: "20%", hidden: true, filterable: false },


            { field: "CodigoTipoChip", title: "CodigoTipoChip", width: "20%", hidden: true, filterable: false },
            { field: "NombreTipoChip", title: "NombreTipoChip", width: "20%", hidden: true, filterable: false },


            { field: "imgmodelo", title: "Modelo de Dispositivo", width: "140px", template: "#= CargaImagen(data) #", attributes: { style: "text-align: center;" }, filterable: false },
            { field: "modelo", title: "Nombre de Modelo de Dispositivo", width: "30%", filterable: true },
            { field: "Descripcion", title: "Descripción de Dispositivo", width: "30%", hidden: true, filterable: false },
            { field: "GrupoDispotivo", title: "Tipo Servicio", width: "20%", filterable: false },
            { field: "TipoModelo", title: "Tipo", width: "15%", filterable: false },
            { field: "Disponibles", title: "Disponibles", width: "7%", attributes: { style: "text-align: right;" }, filterable: false },
            { field: "Detalle", title: "Ver Detalle", width: "6%", template: "#= VerDetalle(data) #", attributes: { style: "text-align: center;" }, filterable: false },


        ],
        //rowTemplate: kendo.template($("#RowTemplate").html()),
        //detailTemplate: kendo.template($("#DetailTemplate1").html()),
        //detailInit: function detailInit(e) {
        //    var detailRow = e.detailRow;
        //    detailRow.find(".tabDatos").tabs();
        //},
        //dataBound: function () {
        //    this.expandRow(this.tbody.find("tr.k-master-row").first());
        //},
        //height: 335,              
        height: altoGrilla,
        //selectable: true,
        selectable: "row",
        filterable: {
            extra: false,
            messages: {
                info: "Filtros:",
                filter: "Filtrar",
                clear: "Limpiar",

                //isTrue: "custom is true", // sets the text for "isTrue" radio button
                //isFalse: "custom is false", // sets the text for "isFalse" radio button

                //and: "CustomAnd",
                //or: "CustomOr"
            },
            operators: {
                string: {
                    contains: "Contiene",
                    eq: "Es igual a",
                    startswith: "Empieza por",
                }
            }
        },
        change: function (e) {
            //console.log("change", e);
            var selected = $.map(this.select(), function (item) {
                return $(item).find('td:eq(1)').text();
            });
            var tiposolicitud = window.parent.$("#hdfTipoSolicitud").val();

            //if (tiposolicitud == "2") {
            //    var Cantidad = window.parent.$("#txtCantidadLineas").val();
            //    if (parseInt(Cantidad)) {

            //    }
            //    valAvance 
            //}

            if (!valAvance && (tiposolicitud == "2" || tiposolicitud == "4")) { }
            else {
                window.parent.desactivarTabPlanes(false);
                CargarGrillaDetalle(selected);
                window.parent.$("#btnSiguiente").button("option", "disabled", false);
            }

            //            if ($("#ddlOperador").val() != "-1" && $("#ddlOperador").val() != "0") {
            //                $("#hdfCodModeloDisp").val(selected);
            //                //fnCargarOperador($("#ddlOperador").val(), true);

            //                inCodModDis = $("#hdfCodModeloDisp").val(); // $($(".selected").children()[0]).attr("codmoddis").toString();
            //                var nomMod = $("#hdfModeloDisp").val(); //$($(".selected").children()[0]).attr("title").toString();  
            //                var vcNomOpe = $("#ddlOperador option[value='" + $("#ddlOperador").val() + "']").text();
            //                var inCodOpe = $("#ddlOperador").val();
            //                $.ajax({
            //                    type: "POST",
            //                    url: "Adm_GaleriaModDispositivos.aspx/PreciosOperador",
            //                    data: "{'inCodModDis': '" + inCodModDis + "'}",
            //                    contentType: "application/json; charset=utf-8",
            //                    dataType: "json",
            //                    success: function (result) {
            //                        eval(result.d);
            //                        //var Precio = PreciosOperador[inCodModDis].Precios[inCodOpe].dePreLis;
            //                        var Precio = (blUsarPrecio == 0 ? PreciosOperador[inCodModDis].Precios[inCodOpe].dePreEsp : PreciosOperador[inCodModDis].Precios[inCodOpe].dePreLis);
            //                        if (Precio == '') {
            //                            $("#lblCosto").html('No definido');
            //                            $($(".selected").children()[0]).attr("costoReferencial", '-1');
            //                            window.parent.codDispositivoGaleria(inCodModDis, nomMod, '-1', inCodOpe, vcNomOpe);
            //                        } else {
            //                            $("#lblCosto").html(FormatoNumero(Precio, oCulturaLocal));
            //                            $($(".selected").children()[0]).attr("costoReferencial", Precio);
            //                            window.parent.codDispositivoGaleria(inCodModDis, nomMod, Precio, inCodOpe, vcNomOpe);
            //                        }
            //                    },
            //                    error: function (xhr, err, thrErr) {
            //                        MostrarErrorAjax(xhr, err, thrErr);
            //                    }
            //                });
            //            }
        }

        //change: function (e) {
        //    var selectedRows = this.select();
        //    for (var i = 0; i < selectedRows.length; i++) {
        //        dataItem = this.dataItem(selectedRows[i]);
        //    };
        //    validarSeleccionGrilla(dataItem);
        //    fnDesactivarSiguientesVentanas();
        //}
    });


    CargarDispositivos($("#hdfCodEmpleado").val());

    $('#grillaDispositivos').data("kendoGrid").bind('dataBound', function (e) {


        window.parent.$("#btnSiguiente").button("option", "disabled", true);
        window.parent.desactivarTabPlanes(true); //Agregado Jcamacho 2015/09/21

        //var codigo = this.element.find('tbody tr:first').find('td:eq(1)').html();
        ////
        //
        //var grilla = $("#grillaDispositivos").data("kendoGrid");
        //var data = grilla.dataSource.data();
        ////
        //for (var i = 0; i < data.length; i++) {
        //    var fila = data[i];
        //    if (fila.Id == codigo) {
        //
        //        ;
        //        alert(codigo);
        //    }
        //}





    });

}

function CargaImagen(model) {
    if (model) {
        //"<img id='foto' src='data:image/jpg;base64," + obj[i].empl_imagen + "' width='50px' height='50px' />"
        return "<img style='cursor:pointer;' id='" + model.Id + "' src='" + model.imgmodelo + "' width='50px' height='50px' class='btnDispositivoDetalle' />";
    } else {
        return "not valid";
    }
}

function VerDetalle(model) {
    if (model) {
        //"<img id='foto' src='data:image/jpg;base64," + obj[i].empl_imagen + "' width='50px' height='50px' />"
        return "<img style='cursor:pointer;' id='" + model.Id + "' src='../../Common/Images/Mantenimiento/VerDetalle.png' width='16px' height='16px' class='btnDispositivoDetalle' />";
    } else {
        return "not valid";
    }
}

function CargarDispositivos() {

    var vcCodEmp = $("#hdfCodEmpleado").val();
    var codPlan = $("#hdfCodPlan").val();
    var tipSol = $("#hdfTipoSolicitud").val();
    var inCodOpe;

    if ($("#hdfCodOpe").val() == "") {
        inCodOpe = 0;
    }
    else {
        inCodOpe = $("#hdfCodOpe").val();
    }

    //console.log("tipo ser ssss", $("#cboTipoServicio").val());

    $.ajax({
        type: "POST",
        url: "Adm_GaleriaModDispositivos.aspx/ListarDispositivos",
        data: "{'vcCodEmp': '" + vcCodEmp + "','codPlan': '" + codPlan + "','tipSol': '" + tipSol + "','inCodOpe': '" + inCodOpe + "','TipoServicio': '" + $("#cboTipoServicio").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if ($(result.d).length > 0) {


                for (i in result.d) {
                    //var estadoMod = result.d[i][0].ModeloDispositivo.btVig ? "Activo" : "Inactivo";
                    //var numrpm = result.d[i][0].rpm ? result.d[i][0].rpm : "No Disponible";

                    var planLinea;
                    //if (parseInt("0" + result.d[i][2].P_inCod) > 0)
                    //    planLinea = "Plan: " + result.d[i][2].vcNom;
                    //else
                    //    planLinea = "Cuenta: " + result.d[i][1].P_vcCod;
                    //if (result.d[i][1].TipoAsignacionCredito.P_inCod == 1) { //planes
                    //    if (parseInt("0" + result.d[i][2].P_inCod) > 0)
                    //        planLinea = "Plan: " + result.d[i][2].vcNom;
                    //    else
                    //        planLinea = "Plan: Plan Desconocido";
                    //} else if (result.d[i][1].TipoAsignacionCredito.P_inCod == 2) { //cuentas
                    //    planLinea = "Cuenta: " + result.d[i][1].P_vcCod;
                    //}

                    //var dtFecUltCam = new Date(parseInt(result.d[i][0].dtFecUltCam.substring(6, 19)));
                    //var dtFecProCam = new Date(parseInt(result.d[i][0].dtFecProCam.substring(6, 19)));
                    //var mesFecUltCam = (parseInt(dtFecUltCam.getMonth()) + 1).toString().length == "1" ? "0" + (parseInt(dtFecUltCam.getMonth()) + 1).toString() : (parseInt(dtFecUltCam.getMonth()) + 1).toString();
                    //var mesFecProCam = (parseInt(dtFecProCam.getMonth()) + 1).toString().length == "1" ? "0" + (parseInt(dtFecProCam.getMonth()) + 1).toString() : (parseInt(dtFecProCam.getMonth()) + 1).toString();
                    //var diaFecUltCam = dtFecUltCam.getDate().toString().length == "1" ? "0" + dtFecUltCam.getDate().toString() : dtFecUltCam.getDate().toString();
                    //var diaFecProCam = dtFecProCam.getDate().toString().length == "1" ? "0" + dtFecProCam.getDate().toString() : dtFecProCam.getDate().toString();
                    //var FecUltCam = diaFecUltCam + "/" + mesFecUltCam + "/" + dtFecUltCam.getFullYear();
                    //var FecProCam = diaFecProCam + "/" + mesFecProCam + "/" + dtFecProCam.getFullYear();
                    //
                    //var dtFecFinCont = new Date(dtFecUltCam.setMonth(dtFecUltCam.getMonth() + parseInt(result.d[i][0].idCampana)));
                    //var mesFecFinCont = (parseInt(dtFecFinCont.getMonth()) + 1).toString().length == "1" ? "0" + (parseInt(dtFecFinCont.getMonth()) + 1).toString() : (parseInt(dtFecFinCont.getMonth()) + 1).toString();
                    //var diaFecFincont = dtFecFinCont.getDate().toString().length == "1" ? "0" + dtFecFinCont.getDate().toString() : dtFecFinCont.getDate().toString();
                    //var FecFinCon = diaFecFincont + "/" + mesFecFinCont + "/" + dtFecFinCont.getFullYear();
                    //alert(dtFecFinCont.getDate().toString() + '/' + (dtFecFinCont.getMonth() + 1).toString() + '/' + dtFecFinCont.getFullYear().toString());

                    $("#grillaDispositivos").data("kendoGrid").dataSource.add({
                        //numero: 99,

                        rowNumber: $.trim(result.d[i].fila),
                        modelo: $.trim(result.d[i].vcNom),
                        Descripcion: $.trim(result.d[i].vcDes),
                        TipoModelo: $.trim(result.d[i].TipoModelo),
                        imgmodelo: $.trim(result.d[i].imIma),
                        Id: $.trim(result.d[i].P_inCod),
                        btSopLin: $.trim(result.d[i].btSopLin),
                        vCostoModelo: $.trim(result.d[i].dePreEsp),
                        costoCambio: $.trim(result.d[i].costoCambio),
                        costoReferencial: $.trim(result.d[i].costoReferencial),
                        GrupoDispotivo: $.trim(result.d[i].GrupoDispotivo),
                        NombreTipoChip: $.trim(result.d[i].NombreTipoChip),
                        vcNomOpe: $.trim(result.d[i].vcNomOpe),
                        Disponibles: $.trim(result.d[i].Disponibles),
                        dePreEsp: $.trim(result.d[i].dePreEsp),

                        //rpm: numrpm,
                        //estado: estadoMod,
                        //imgmodelo: result.d[i][0].ModeloDispositivo.vcRutArc,
                        //ultfeccambio: FecUltCam,
                        //tnecesario: result.d[i][0].inNumMesProCam == 1000 ? "Sin política asociada" : result.d[i][0].inNumMesProCam == 0 ? "Ilimitado" : result.d[i][0].inNumMesProCam,
                        //cambiodesde: result.d[i][0].inNumMesProCam == 1000 ? "Sin política asociada" : FecProCam,
                        //minutos: result.d[i][0].inMin,
                        //plan: planLinea,
                        //cuenta: result.d[i][1].P_vcCod,
                        //codIMEI: result.d[i][0].P_vcCodIMEI,
                        //codOper: result.d[i][2].Operador.P_inCodOpe,
                        //nomOper: result.d[i][2].Operador.vcNomOpe,
                        //codModDis: result.d[i][0].ModeloDispositivo.P_inCod,
                        //codPlan: result.d[i][2].P_inCod,
                        //costoRepo: parseFloat(result.d[i][0].costoReposicion) >= 0 ? result.d[i][0].costoReposicion : '' //modificado 21-01-2015
                        //, vcNomEst: result.d[i][0].vcNomEst //agregado 11/04/2014
                        //, inEst: result.d[i][0].inEst
                        //, MesesContrato: result.d[i][0].idCampana //agregado 17-11-2014 wapumayta
                        //, FechaFinContrato: FecFinCon //agregado 18-11-2014 wapumayta
                    });

                }

                VerificaHabilitadoEmpleado($("#hdfCodEmpleado").val());

            }
            //desactivarTabPlanes(true);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function NumeroInicialFilasResize() {
    inFilas = Math.floor(($(window).height() - 330) / nuAltoFila);
    inFilas = inFilas - 1;
    ActualizarPageSizeGrillasTab("tbEmpleado", inFilas);

}