<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Demo1.aspx.vb" Inherits="WebSiteCliente.Demo1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="Common/Scripts/jssor.core.js" type="text/javascript"></script>
    <script src="Common/Scripts/jssor.utils.js" type="text/javascript"></script>
    <script src="Common/Scripts/jssor.slider.js" type="text/javascript"></script>
    
    <script type="text/javascript">
        jQuery(document).ready(function ($) {
            var options = {
                $DragOrientation: 3,                                //[Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 either, default value is 1 (Note that the $DragOrientation should be the same as $PlayOrientation when $DisplayPieces is greater than 1, or parking position is not 0)
                $ArrowNavigatorOptions: {                       //[Optional] Options to specify and enable arrow navigator or not
                    $Class: $JssorArrowNavigator$,              //[Requried] Class to create arrow navigator instance
                    $ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
                    $AutoCenter: 0,                                 //[Optional] Auto center arrows in parent container, 0 No, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
                    $Steps: 1                                       //[Optional] Steps to go for each navigation request, default value is 1
                }
            };

            var jssor_slider1 = new $JssorSlider$("slider1_container", options);
        });
    </script>

</head>
<body>
    <form id="form1" runat="server">
    

    <div id="slider1_container" style="position: relative; top: 100px; left: 100px; width: 500px; height: 400px; ">
        <!-- Slides Container -->
        <div id="imgBanner" runat="server" u="slides" style="cursor: move; position: absolute; left: 0px; top: 0px; width: 500px; height: 400px;
            overflow: hidden;">
            <%--<div><img u="image" src="Common/Images/ModeloDispositivo/1.jpg" /></div>
            <div><img u="image" src="Common/Images/ModeloDispositivo/10.jpg" /></div>
            <div><img u="image" src="Common/Images/ModeloDispositivo/100.jpg" /></div>
            <div><img u="image" src="Common/Images/ModeloDispositivo/101.jpg" /></div>
            <div><img u="image" src="Common/Images/ModeloDispositivo/102.jpg" /></div>
            <div><img u="image" src="Common/Images/ModeloDispositivo/103.jpg" /></div>
            <div><img u="image" src="Common/Images/ModeloDispositivo/104.jpg" /></div>
            <div><img u="image" src="Common/Images/ModeloDispositivo/105.jpg" /></div>--%>
        </div>
        
        <!-- Arrow Navigator Skin Begin -->
        <style type="text/css">
            /* jssor slider arrow navigator skin 03 css */
            /*
            .jssora03l              (normal)
            .jssora03r              (normal)
            .jssora03l:hover        (normal mouseover)
            .jssora03r:hover        (normal mouseover)
            .jssora03ldn            (mousedown)
            .jssora03rdn            (mousedown)
            */
            .jssora03l, .jssora03r, .jssora03ldn, .jssora03rdn
            {
            	position: absolute;
            	cursor: pointer;
            	display: block;
                background: url(Common/Images/a03.png) no-repeat;
                overflow:hidden;
            }
            .jssora03l { background-position: -3px -33px; }
            .jssora03r { background-position: -63px -33px; }
            .jssora03l:hover { background-position: -123px -33px; }
            .jssora03r:hover { background-position: -183px -33px; }
            .jssora03ldn { background-position: -243px -33px; }
            .jssora03rdn { background-position: -303px -33px; }
        </style>
        <!-- Arrow Left -->
        <span u="arrowleft" class="jssora03l" style="width: 55px; height: 55px; top: 183px; left: 8px;">
        </span>
        <!-- Arrow Right -->
        <span u="arrowright" class="jssora03r" style="width: 55px; height: 55px; top: 183px; right: 8px">
        </span>
        <!-- Arrow Navigator Skin End -->
        <a style="display: none" href="">slideshow html</a>
    </div>

    </form>
</body>
</html>
