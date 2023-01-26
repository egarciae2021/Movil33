<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Adm_GaleriaModDispositivos.aspx.vb" Inherits="WebSiteCliente.Adm_GaleriaModDispositivos" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/galleriffic-2.css" rel="stylesheet" type="text/css" /><%-- galleriffic--%>
    <link href="../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    
    <%--<script src="../../Common/Scripts/anytime.js" type="text/javascript"></script>--%>
    <script src="../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery.ui.core.js" type="text/javascript" ></script>
    <script src="../Common/Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript" ></script>
    <script src="../Common/Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript" ></script>
    <script src="../Common/Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript" ></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript" ></script>
    <script src="../Common/Scripts/jquery.history.js" type="text/javascript"></script><%-- galleriffic--%>
	<script src="../Common/Scripts/jquery.galleriffic.js" type="text/javascript"></script><%-- galleriffic--%>
	<script src="../Common/Scripts/jquery.opacityrollover.js" type="text/javascript"></script><%-- galleriffic--%>
    <script src="../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        var width = parent.parent.window.innerWidth; //tamaño de toda la ventana
        var wContenedorTab = window.innerWidth;
        var wNavi = "330px";
        var numMini = 9;
        var numPag = 7;
        var topPag = true;
        $(function () {
            //reload
            $("input:checkbox,input:radio,input:file").uniform();

            $(window).resize(function () {
                DimPosElementos();
            });

            function DimPosElementos() {
                //var AnchoV = $('#slideshow a.advance-link img').css("width");
                //var AltoV = $('#slideshow a.advance-link img').css("height");
                var AnchoV = $(window).width();
                var AnchoV2 = window.innerWidth;
                //alert(AnchoV + " , " + AnchoV2);
                //var AltoV = $(window).height();
                if (AnchoV > 1201) {
                    window.location.reload();
                    //$("#thumbs").css({"width":"1500"});
                } else if (AnchoV > 1101 && AnchoV < 1121) {
                    window.location.reload();
                } else if (AnchoV > 995 && AnchoV < 1005) {
                    window.location.reload();
                } else if (AnchoV > 881 && AnchoV < 911) {
                    window.location.reload();
                } else if (AnchoV > 661 && AnchoV < 680) {
                    window.location.reload();
                };
            }

            //resolusion del navegador
            //alert(wContenedorTab);
            if (wContenedorTab > "1200") {
                wNavi = "550px";
                numMini = 15;
            } else if (wContenedorTab > "1100") {
                wNavi = "440px";
                numMini = 12
            } else if (wContenedorTab > "1000") {
                wNavi = "330px";
                numMini = 9;
                numPag = 6
            } else if (wContenedorTab > "883") {
                wNavi = "232px";
                numMini = 6;
                numPag = 3
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
                wNavi = "330px";
                numMini = 9;
                numPag = 6
            };

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
                },
                onPageTransitionOut: function (callback) {
                    this.fadeTo('fast', 0.0, callback);
                },
                onPageTransitionIn: function () {
                    this.fadeTo('fast', 1.0);
                }
            });

        });

        function enviarCodMod() {
            var CodModDis = $("div .caption input").attr("value");
            return CodModDis;
        };

        function conLinea() {
            var conLinea = $("#chkLinea").is(":checked");
            return conLinea;
        };

        function ningunDisp() {
            return true;
        };
        //function LoadSegunResolusion() {
        //    //alert(wContenedorTab);
        //    if (wContenedorTab > "1200") {
        //        //alert("if");
        //        wNavi = "440px";
        //        numMini = 12;
        //        InicializarGaleria(wNavi, numMini, numPag);
        //    } else {
        //        alert("330");
        //        wNavi = "330px";
        //        numMini = 9;
        //        InicializarGaleria(wNavi, numMini, numPag);
        //    };
        //};
        //function cambio() {
        //    //alert("cambio1");
        //    wContenedorTab = window.innerWidth;
        //    LoadSegunResolusion();
        //};
        //function InicializarGaleria(widthNav, numThumb, numMaxPag) {
        //    
        //};
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfCodEmpleado" runat="server" />
    <asp:HiddenField ID="hdfCodModeloDisp" runat="server" />
        <div id="divGaleria" style="overflow:auto;" runat="server">
            <div id="gallery" class="content">
			    <table width="100%">
                    <tr>
                        <td style="width:355px;">
                            <div id="controls" class="controls"></div>
			                <div class="slideshow-container">
				                <div id="loading" class="loader"></div>
				                <div id="slideshow" class="slideshow"></div>
			                </div>        
                        </td>
                        <td valign="top">
                            <div style="height:40px;"></div>
                            <div id="caption" class="caption-container" style="height:280px;"></div>
                            <div id="divSolLin" runat="server">
                                Solicitar Equipo con Línea:
                                <input id="chkLinea" type="checkbox" runat="server" />
                            </div>
                            <div id="btnDetalles" title="Ver detalles" style="display:none;">Ver detalles</div>
                        </td>
                    </tr>
                </table>
		    </div>
            <div id="thumbs" class="navigation" runat="server" style="height:350px;">
                <ul id="ulGaleria" class="thumbs noscript" runat="server">
                </ul>
            </div>
            <div style="clear: both;"></div>
        </div>
        <div id="divNoDispositivos" runat="server" style="display:none; font-size: medium; color: gray;">
            No hay ningún dispositivo compatible con el plan del dispositivo seleccionado.
        </div>
    </form>
</body>
</html>
