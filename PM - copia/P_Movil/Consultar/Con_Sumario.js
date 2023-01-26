
        function Actualizar() {
            location.reload();
        }

        $(function () {
            //$(".btnNormal").button();

            //$("#imgImprimir").button("option", "disabled", true);
            $("#imgImprimir").attr("disabled", true);
            $("#imgImprimir").attr("title", "Seleccione tipo de reporte");

            var tab = $("#TabOpciones").tabs({
                select: function (event, ui) {
                    if (ui.index == 1) {
                        $("#imgImprimir").hide();
                    } else {
                        $("#imgImprimir").show();
                    }
                },
                show: function (event, ui) {
                    if ($("#TabOpciones").tabs("option", "selected") == "0") {
                        $("#trTipoGrafico").hide();
                        $("#trTipoDato").hide();
                        $("#trNumRegistro").hide();
                        $("#trTipoImpresion").show();
                    }
                    else if ($("#TabOpciones").tabs("option", "selected") == "1") {
                        $("#trTipoGrafico").show();
                        $("#trTipoDato").show();
                        $("#trNumRegistro").show();
                        $("#trTipoImpresion").hide();
                        $("#ddlTipoGrafico").change();
                    }
                }
            });

            $("#imgResumen").click(function () {
                $("#TabOpciones").tabs("option", "selected", 0);
                $("#imgImprimir").show();
            });
            $("#imgGrafico").click(function () {
                $("#TabOpciones").tabs("option", "selected", 1);
                $("#imgImprimir").hide();
            });

            $("#ddlTipoImpresion").change(function () {//trImprimir
                if ($(this).val() == "-1") {
                    //$("#imgImprimir").button("option", "disabled", true);
                    $("#imgImprimir").attr("disabled", true);
                    $("#imgImprimir").attr("title", "Seleccione tipo de reporte");
                } else {
                    //$("#imgImprimir").button("option", "disabled", false);
                    $("#imgImprimir").attr("disabled", false);
                    $("#imgImprimir").attr("title", "Imprimir");
                }
            });
            $("#imgSalir").click(function () {//imgSalir            
                window.parent.tabOpciones.tabs("remove", window.parent.tabOpciones.tabs("option", "selected"));
            });

            $("#ifLista").attr("src", "Con_SumarioLista.aspx?Tipo=" + $("#hdfTipoSumario").val() + "&Valor=" + $("#hdfValorSumario").val());
            $("#ifGrafico").attr("src", "Con_SumarioGrafico.aspx?Tipo=" + $("#hdfTipoSumario").val() + "&Valor=" + $("#hdfValorSumario").val());

            $("#imgImprimir").click(function () {
                if ($("#ddlTipoImpresion").val() == "-1") {
                    alerta("Seleccione un tipo de formato a imprimir", null, function () {
                        $("#ddlTipoImpresion").focus();
                    });
                }
                var ind = window.parent.tabOpciones.tabs("option", "selected");
                var Nom = $(window.parent.$('#TabDetalle > ul a')[ind]).text() + " " + $("#ddlTipoImpresion option:selected").text();

                window.parent.AbrirTab("Con_Reporte_DevExpress.aspx?Tipo=2&SubTipo=" + $("#hdfTipoSumario").val() + "&NumCriterio=" + window.parent.Criterio.inNumCri + "&Detalle=" + $("#ddlTipoImpresion").val(), "#Tab" + Nom.replace(/ /g, "").replace(/-/g, ""), Nom);

            });

            fnDimencionar();

            $(window).resize(function () {
                fnDimencionar2();
            });
        });


        function fnDimencionar() {
            var Ancho = $(window).width();
            var Alto = $(window).height();
            var altoFiltro = $("#pnalFiltros").height();

            $("#ifLista").width(Ancho -40);
            $("#ifLista").height(Alto - altoFiltro - 80);

            $("#ifGrafico").width(Ancho -40);
            $("#ifGrafico").height(Alto - altoFiltro - 80);
        }

        function fnDimencionar2() {
            var Ancho = $(window).width();
            var Alto = $(window).height();
            var altoFiltro = $("#pnalFiltros").height();

            $("#ifLista").width(Ancho - 60);
            $("#ifLista").height(Alto - altoFiltro - 100);

            $("#ifGrafico").width(Ancho - 60);
            $("#ifGrafico").height(Alto - altoFiltro - 100);
        }