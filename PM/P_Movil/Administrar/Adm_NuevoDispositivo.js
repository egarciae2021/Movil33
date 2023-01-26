document.write('<style>.noscript { display: none; }</style>');
$(function () {
    $('.btnNormal').button();
    var Selecciono = false;
    var Modal = $("#divSeguridad").dialog({
        title: 'Seguridad (Nuevo de equipo)',
        height: 160,
        width: 480,
        modal: true,
        resizable: false,
        close: function () {
            setTimeout(CierraVentana, 50);
        }
    });

    function CierraVentana() {
        var tab1 = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;

        var Accord = window.parent.$("#" + tab1);
        Accord.tabs("remove", Accord.tabs("option", "selected"));
    }

    if ($("#hdfGaleria").val() == "-1") {
        alerta("No tiene designado ningun equipo");
        CierraVentana();
    }

    ValidarNumeroEnCajaTexto("txtNumero", ValidarEnteroPositivo);

    $("#btnIngresar").click(function () {
        var CodEmp = $("#hdfCodEmpleado").val();
        if (CodEmp != "") {
            $.ajax({
                type: "POST",
                url: "Adm_NuevoDispositivo.aspx/VerificaLineaEmpleado",
                data: "{'vcCodEmp': '" + CodEmp + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if (result.d == "1") {
                        $("#lblMensaje").html("Ya tiene una solicitud pendiente para adquirir un nuevo equipo");
                    }
                    else if (result.d == "2") {
                        $("#lblMensaje").html("Usted no puede adquirir más equipos");
                    }
                    else if (result.d == "3") {
                        $("#lblMensaje").html("Usted no está incluido en ninguna política");
                    }
                    else {//
                        //Modal.dialog('close');
                        window.location = "Adm_NuevoDispositivo.aspx?vcCodEmp=" + CodEmp;
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
        else {
            alerta("Ingrese un empleado valido");
            $("#txtEmpleado").val("");
            $("#hdfCodEmpleado").val("");
            $("#txtEmpleado").focus();
        }
    });

    $("#btnEnviarSolicitud").click(function () {
        var CodModDis = $("input", gallery.currentImage.caption).val();
        var CodEmp = $("#hdfEmpleado").val();
        var NumLin = $("#hdfLinea").val();
        //lista de adjuntos, agregado 04-09-2013
        var ArchAdj = $("#hdfListaUbi").val();

        $.ajax({
            type: "POST",
            url: "Adm_NuevoDispositivo.aspx/EnviaSolicitud",
            data: "{'inCodModDis': '" + CodModDis + "'," +
                    "'vcArchAdj': '" + ArchAdj + "'," + // agregado 05-09-2013 wapumayta
                   "'vcCodEmp':'" + CodEmp + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == '') {
                    alerta("Su solicitud fue enviada con éxito");
                    //setTimeout(CierraVentana, 50);
                    //cerrarPestaña!!!!
                    //jherrera 20130514
                    //-----------------
                    window.location = "Adm_SolicitarDispositivo.aspx?vcCodEmp=" + CodEmp + "&dcNumLin=" + NumLin + "&vcNueDis=" + CodModDis;
                    //-----------------
                }
                else {
                    alert(result.d);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

    if ($("#txtEmpleado").length > 0) {
        $("#txtEmpleado").autocomplete({
            minLength: 0,
            source: function (request, response) {
                $.ajax({
                    type: "POST",
                    url: "../../Common/WebService/General.asmx/ListarEmpleado",
                    data: "{'maxFilas': '" + 200 + "'," +
                           "'vcNomEmp': '" + $("#txtEmpleado").val() + "'," +
                           "'incodGrup': '-1'," +
                           "'idCliente': '" + window.parent.parent.parent.idCliente + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        response($.map(result.d, function (item) {
                            return {
                                label: item.vcNom,
                                vcCodEmp: item.P_vcCod,
                                category: item.Grupo.vcNom,
                                inCodGru: item.Grupo.P_inCod
                            };
                        }));
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },
            focus: function (event, ui) {
                $("#txtEmpleado").val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                Selecciono = true;
                $("#txtEmpleado").val(ui.item.label);
                $("#hdfCodEmpleado").val(ui.item.vcCodEmp);
                return false;
            },
            change: function (event, ui) {
                if (!Selecciono) {
                    $("#hdfCodEmpleado").val("");
                }
                return false;
            },
            open: function (event, ui) {
                Selecciono = false;
                return false;
            }
        })
        .data("autocomplete")._renderItem = function (ul, item) {
            return $("<li></li>")
			    .data("item.autocomplete", item)
			    .append("<a>" + item.vcCodEmp + "=" + item.label + "</a>")
			    .appendTo(ul);
        };
    }

    // We only want these styles applied when javascript is enabled
    if ($("#hdfGaleria").val() == "1") {
        $('div.content').css('display', 'block');
        // Initially set opacity on thumbs and add
        // additional styling for hover effect on thumbs
        var onMouseOutOpacity = 0.67;
        $('#thumbs ul.thumbs li, div.navigation a.pageLink').opacityrollover({
            mouseOutOpacity: onMouseOutOpacity,
            mouseOverOpacity: 1.0,
            fadeSpeed: 'fast',
            exemptionSelector: '.selected'
        });

        // Initialize Advanced Galleriffic Gallery
        var gallery = $('#thumbs').galleriffic({
            delay: 2500,
            numThumbs: 10,
            preloadAhead: 10,
            enableTopPager: false,
            enableBottomPager: false,
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
            enableHistory: true,
            autoStart: false,
            syncTransitions: true,
            defaultTransitionDuration: 900,
            onSlideChange: function (prevIndex, nextIndex) {
                // 'this' refers to the gallery, which is an extension of $('#thumbs')
                this.find('ul.thumbs').children()
						    .eq(prevIndex).fadeTo('fast', onMouseOutOpacity).end()
						    .eq(nextIndex).fadeTo('fast', 1.0);

                // Update the photo index display
                this.$captionContainer.find('div.photo-index')
						    .html('Modelo ' + (nextIndex + 1) + ' de ' + this.data.length);
            },
            onPageTransitionOut: function (callback) {
                this.fadeTo('fast', 0.0, callback);
            },
            onPageTransitionIn: function () {
                var prevPageLink = this.find('a.prev').css('visibility', 'hidden');
                var nextPageLink = this.find('a.next').css('visibility', 'hidden');

                // Show appropriate next / prev page links
                if (this.displayedPage > 0) {
                    prevPageLink.css('visibility', 'visible');
                }
                var lastPage = this.getNumPages() - 1;
                if (this.displayedPage < lastPage) {
                    nextPageLink.css('visibility', 'visible');
                }
                this.fadeTo('fast', 1.0);
            }
        });

        /**************** Event handlers for custom next / prev page links **********************/

        gallery.find('a.prev').click(function (e) {
            gallery.previousPage();
            e.preventDefault();
        });

        gallery.find('a.next').click(function (e) {
            gallery.nextPage();
            e.preventDefault();
        });

        /****************************************************************************************/

        /**** Functions to support integration of galleriffic with the jquery.history plugin ****/

        // PageLoad function
        // This function is called when:
        // 1. after calling $.historyInit();
        // 2. after calling $.historyLoad();
        // 3. after pushing "Go Back" button of a browser
        function pageload(hash) {
            // alerta("pageload: " + hash);
            // hash doesn't contain the first # character.
            if (hash) {
                $.galleriffic.gotoImage(hash);
            } else {
                gallery.gotoIndex(0);
            }
        }

        // Initialize history plugin.
        // The callback is called at once by present location.hash. 
        $.historyInit(pageload, "advanced.html");

        // set onlick event for buttons using the jQuery 1.3 live method
        $("a[rel='history']").live('click', function (e) {
            if (e.button != 0) { return true; }

            var hash = this.href;
            hash = hash.replace(/^.*#/, '');

            // moves to a new page. 
            // pageload is called at once. 
            // hash don't contain "#", "?"
            $.historyLoad(hash);

            return false;
        });
    }
    /****************************************************************************************/

    $("#container").css({ "backcolor": "red" });

});
