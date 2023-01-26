<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="PlantillaTab.aspx.vb" Inherits=".PlantillaTab" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" style="background-color: #FFFFFF;"> <%--F3F5F9--%>
<head runat="server">
    <meta http-equiv="X-UA-Compatible" content="IE=10" charset="utf-8" />
    <link rel="shortcut icon" href="Common/Images/Login/favicon.png" type="image/ico">
    <title></title>
    <link href="Content/css/shared/fonts.googleapis.com.css" rel="stylesheet" />
    <link href="Site_PCSistel8.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="Common/Scripts/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="Common/Scripts/JqueryUI/jquery.ui.position.js"></script>
    <script type="text/javascript" src="Common/Scripts/JqueryUI/jquery.ui.core.js"></script>
    <script type="text/javascript" src="Common/Scripts/JqueryUI/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="Common/Scripts/JqueryUI/jquery.ui.button.js"></script>
    <script type="text/javascript" src="Common/Scripts/JqueryUI/jquery.ui.tabs.js"></script>
    <script type="text/javascript" src="Common/Scripts/JqueryUI/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="Common/Scripts/JqueryUI/jquery.ui.accordion.js"></script>
    <script type="text/javascript" src="Common/Scripts/JqueryUI/jquery.ui.mouse.js"></script>
    <script type="text/javascript" src="Common/Scripts/JqueryUI/jquery.ui.draggable.js"></script>
    <script type="text/javascript" src="Common/Scripts/JqueryUI/jquery.ui.resizable.js"></script>
    <script src="Common/Scripts/jquery.cookie.js" type="text/javascript"></script>
    <script src="Common/Scripts/Utilitario.js" type="text/javascript"></script>

    <style type="text/css">
        /*body {
            background-color: #ECF0F5;
        }*/
        #dvMesaggeAlert:hover {
            cursor: pointer;
        }

        #dvNumMsg {
            border: 0px dotted gray;
            border-radius: 20px;
            float: right;
            margin-top: 2px;
            background-color: #4282C4;
            text-align: center;
            box-shadow: 0px 0px 5px gray;
            font-weight: bold;
            font-size: 8pt;
            padding: 1px 4px;
        }

        #dvIconMsg {
            width: 30px;
            height: 30px;
            border: 0px dotted gray;
            float: left;
            margin-top: -3px;
            background-image: url('Common/Images/message2.png');
            background-repeat: no-repeat;
        }

        #dvDetalleMsg {
            width: 260px;
            /*height:500px;*/
            border-radius: 5px;
            box-shadow: 0px 0px 5px black;
            border: 1px solid #4282C4;
            position: absolute;
            /*right:18px;*/
            top: 70px;
            z-index: 999999;
            background-color: White;
            display: none;
            padding-bottom: 10px;
        }

        #ptriangulo {
            width: 20px;
            height: 10px;
            position: relative;
            top: -10px;
            left: 112px;
        }

            #ptriangulo img {
                width: 100%;
                max-width: 100%;
                height: 100%;
            }

        .dvMsgDet {
            width: 230px;
            color: #e17009;
            padding: 5px 5px 5px 25px;
            border-bottom: 1px dotted skyblue;
            background-repeat: no-repeat;
            font-weight: bold;
            font-size: 9pt;
        }

            .dvMsgDet:hover {
                cursor: pointer;
                color: #2e6e9e;
            }

        .dvMsgDetInc {
            background-image: url('Common/Images/Accesos/helpdesk.png');
        }

        .dvMsgDetSol {
            background-image: url('Common/Images/Accesos/SolicitudDispositivo.png');
        }

        .msgBurbuja {
            padding: 3px;
            border-radius: 20px;
            float: right;
            font-size: 5pt;
            margin-top: -1px;
        }

        #tapMsg {
            width: 30px;
            height: 40px;
            position: relative;
            top: -35px;
            left: 111px;
            border-radius: 5px;
            background-color: White;
            background-image: url('Common/Images/message2.png');
            background-repeat: no-repeat;
            background-position: top;
            border: 0px;
        }

        .hhover5 {
            background-color: White;
            border-radius: 5px;
            box-shadow: 0px 0px 5px black;
            position: absolute;
            height: 70px;
        }

        #btnVolverLoginSesion:hover {
            cursor: pointer;
            box-shadow: 0px 0px 5px gray;
        }

        .overFinSesion {
            cursor: pointer;
            box-shadow: 0px 0px 5px gray;
        }

        #dvTimer {
            width: 223px;
            height: 20px;
            /*border: 1px dotted gray;*/
            margin-top: 10px;
            /*padding-right:25px;*/
            font-family: "Trebuchet MS", "Helvetica", "Arial", "Verdana", "sans-serif";
            text-align: right;
            white-space: normal;
            line-height: normal;
            font-weight: normal;
            font-size: 9pt;
            font-variant: normal;
            font-style: normal;
            color: -webkit-text;
        }

        .MostrarFinSesion {
            display: block;
        }

        #tbPrincipalProducto_buttons {
            border-top-color: transparent;
        }

    </style>

</head>
<body>


    <%--<div style="position: absolute; width: 105%; height: 98px; background-color: #25476A; z-index: 0; margin-left: -10px; margin-top: -10px;">
    </div>--%>

    <form id="Form1" runat="server" style="display: none;">
        <asp:HiddenField ID="hfIdProducto" runat="server" />
        <asp:HiddenField ID="hdfSimbNoPermitidosClaveUsu" runat="server" />
        <div id="tabProducto" runat="server">
        </div>
    </form>


    <div id="div_modal" style="display: none; padding: 0px; margin: 0px; overflow-y: hidden;">
        <iframe id="iframe_modal" scrolling="yes" frameborder="0" style="padding: 0px; margin: 0px; overflow-y: scroll;"></iframe>
    </div>

    <div id="div_Reinicia" style="display: none; overflow: hidden;">
        <iframe id="ifReinicia" frameborder="0" style="padding: 0px; margin: 0px; height: 250px; width: 600px;"></iframe>
    </div>

    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("PlantillaTab.js")%>" type="text/javascript"></script>
</body>
</html>
