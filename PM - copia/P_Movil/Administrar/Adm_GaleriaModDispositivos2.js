        var blUsarPrecio = 0;  // 1 = Precio Lista ; 0 = Precio Especial
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

        var Operadores = [];
        var PreciosOperador = [];
        var inCodModDis = '';

        var valAvance = true;

        function cargarPreciosModelo(inCodModDis) {
            var inCodOpe = $("#ddlOperador-" + inCodModDis).val();
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
                                $("#lblCosto-" + inCodModDis).html(Precio);
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
                        $("#lblCosto-" + inCodModDis).html(Precio);
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

            $(".Operador").live("change", function () {
                //imagen seleccionada
                inCodModDis = $($(".selected").children()[0]).attr("codmoddis").toString();
                var nomMod = $($(".selected").children()[0]).attr("title").toString();
                var vcNomOpe = $("#ddlOperador-" + inCodModDis + " option[value='" + $(this).val() + "']").text();
                //inCodModDis = $("#hdfCodModeloDisp").val();
                var inCodOpe = this.value;
                if (this.value != "-1" && inCodOpe != '0') {
                    if (!PreciosOperador[inCodModDis]) {
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
                                    $("#lblCosto-" + inCodModDis).html('No definido');
                                    $($(".selected").children()[0]).attr("costoReferencial", '-1');
                                    window.parent.codDispositivoGaleria(inCodModDis, nomMod, '-1', inCodOpe, vcNomOpe);
                                } else {
                                    $("#lblCosto-" + inCodModDis).html(Precio);
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
                            $("#lblCosto-" + inCodModDis).html('No definido');
                            $($(".selected").children()[0]).attr("costoReferencial", '-1');
                            window.parent.codDispositivoGaleria(inCodModDis, nomMod, '-1', inCodOpe, vcNomOpe);
                        } else {
                            $("#lblCosto-" + inCodModDis).html(Precio);
                            $($(".selected").children()[0]).attr("costoReferencial", Precio);
                            window.parent.codDispositivoGaleria(inCodModDis, nomMod, Precio, inCodOpe, vcNomOpe);
                        }
                    }
                } else {
                    $("#lblCosto-" + inCodModDis).html("Seleccione operador...");
                    $($(".selected").children()[0]).attr("costoReferencial", '-1');
                    window.parent.codDispositivoGaleria(inCodModDis, nomMod, '-1', inCodOpe, vcNomOpe);
                }
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
            //$(window).resize(function () {
            //    DimPosElementos();
            //});

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
                $("#caption").css("resize", false);
                modal = $("#caption").dialog({
                    modal: true,
                    //width: '300px',
                    //height: '550px',
                    title: 'Detalles de Modelo'
                });
            });

            //GALERIA
            $('div.navigation').css({ 'width': wNavi, 'float': 'left' });
            $('div.content').css('display', 'block');

            var onMouseOutOpacity = 0.67;
            if ($('#thumbs ul.thumbs li').length != 0) {
                $('#thumbs ul.thumbs li').opacityrollover({
                    mouseOutOpacity: onMouseOutOpacity,
                    mouseOverOpacity: 1.0,
                    fadeSpeed: 'fast',
                    exemptionSelector: '.selected'
                });

                var gallery = $('#thumbs').galleriffic({
                    delay: 1500,
                    numThumbs: numMini,
                    preloadAhead: 10,
                    enableTopPager: topPag,
                    enableBottomPager: false,
                    maxPagesToShow: numPag,
                    imageContainerSel: '#slideshow',
                    controlsContainerSel: '#controls',
                    captionContainerSel: '#caption',
                    loadingContainerSel: '#loading',
                    renderSSControls: true,
                    renderNavControls: true,
                    playLinkText: 'Reproducir',
                    pauseLinkText: 'Pausar',
                    prevLinkText: '&lsaquo; Modelo anterior',
                    nextLinkText: 'Siguiente Modelo &rsaquo;',
                    nextPageLinkText: 'Siguiente &rsaquo;',
                    prevPageLinkText: '&lsaquo; Anterior',
                    enableHistory: false,
                    autoStart: false,
                    syncTransitions: true,
                    defaultTransitionDuration: 900,
                    onSlideChange: function (prevIndex, nextIndex) {
                        this.find('ul.thumbs').children()
            			.eq(prevIndex).fadeTo('fast', onMouseOutOpacity).end()
            			.eq(nextIndex).fadeTo('fast', 1.0);
                        //datos de seleccion
                        nombreModelo = $($(".thumb")[nextIndex]).attr("title").toString();
                        codigoModelo = $($(".thumb")[nextIndex]).attr("codModDis").toString();
                        btSopLin = $($(".thumb")[nextIndex]).attr("btSopLin");
                        if ($("#hdfTipoSolicitud").val() == '2' && $("#hdfCodEmpleado").val() != '-1') {
                            if (btSopLin != 'False') {
                                $("#divSolLin").show();
                                $("#hdfDispSelectSopLin").val('1');
                                VerificaHabilitadoEmpleado($("#hdfCodEmpleado").val());
                            } else {
                                $("#divSolLin").hide();
                                $("#hdfDispSelectSopLin").val('0');
                                window.parent.desactivarTabPlanes(true);
                            }
                        } else {
                            if ($("#hdfPermiteLinea").val() == '1') {
                                if (btSopLin != 'False') {
                                    $("#divSolLin").show();
                                    $("#hdfDispSelectSopLin").val('1');
                                    window.parent.desactivarTabPlanes(false);
                                } else {
                                    $("#divSolLin").hide();
                                    $("#hdfDispSelectSopLin").val('0');
                                    window.parent.desactivarTabPlanes(true);
                                }
                            }
                        }
                        if ($("#hdfCodOpe").val() != "0" && $("#hdfCodOpe").val() != '-1' && $("#hdfCodOpe").val() != '') { //existe operadro(cambio o reposicoin)
                            vCostoModelo = $($(".thumb")[nextIndex]).attr("costoCambio");
                        } else { //no exite operador (nuevo)
                            vCostoModelo = $($(".thumb")[nextIndex]).attr("costoReferencial");
                        }
                        $("#hdfCodModeloDisp").val(codigoModelo);
                        var vcNomOpe = $("#ddlOperador-" + codigoModelo + " option[value='" + $(this).val() + "']").text();
                        var inCodOpe = $("#ddlOperador-" + codigoModelo).val();
                        window.parent.codDispositivoGaleria(codigoModelo, nombreModelo, vCostoModelo, inCodOpe, vcNomOpe);
                        //alert(codigoModelo + "; " + nombreModelo + "; " + vCostoModelo);
                    },
                    onPageTransitionOut: function (callback) {
                        this.fadeTo('fast', 0.0, callback);
                    },
                    onPageTransitionIn: function () {
                        this.fadeTo('fast', 1.0);
                    }
                });
            } else { //no existe ningun dispositivo
                $("#btnAtras").focus();
            }

            //con linea
            //if ($("#chkLinea").is(":checked")) { //solicitud de linea
            //$("#chkLinea").click(function () {
            //    desactivarTabPlanes();
            //});
        });

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
                        window.parent.desactivarTabPlanes(false);
                    }
                    //$("#lblMensajeVerificacion").html(msgValidacionGrilla);
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
