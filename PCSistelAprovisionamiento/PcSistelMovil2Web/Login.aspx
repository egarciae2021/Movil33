<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="PcSistelMovil2Web.Login" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" class="htmlCentrarAbsoluto">
<link rel="shortcut icon" href="Common/Images/favicon.ico" type="image/ico" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<head runat="server">
    <title>Gestión Móviles</title>
    <style type="text/css">
        #header_login
        {
            width: 100%;
            height: 52px;
            background-color: #E6EFFB;
            border-bottom: 1px solid #CFDDEE;
        }
        .logo_str_home
        {
            font-family: Arial;
            color: #175296;
            font-size: 20px;
            font-style: italic;
            margin-right: 18px;
            margin-top: 15px;
            font-weight: bold;
        }
        .style4
        {
            width: 157px;
            height: 39px;
        }
        
        .CentrarAbsoluto {
            text-align: center;
            margin: auto;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            overflow: auto;
        }

        .htmlCentrarAbsoluto
        {
            height:100%;
        }

        .bodyCentrarAbsoluto
        {
            height:100%;
            margin:0;
        }
        .colorBackGroundCentrarAbs
        {
            background: rgb(238,238,238); /* Old browsers */
        /* IE9 SVG, needs conditional override of 'filter' to 'none' */
        background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2VlZWVlZSIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNlZWVlZWUiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);
        background: -moz-linear-gradient(top,  rgba(238,238,238,1) 0%, rgba(238,238,238,1) 100%); /* FF3.6+ */
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(238,238,238,1)), color-stop(100%,rgba(238,238,238,1))); /* Chrome,Safari4+ */
        background: -webkit-linear-gradient(top,  rgba(238,238,238,1) 0%,rgba(238,238,238,1) 100%); /* Chrome10+,Safari5.1+ */
        background: -o-linear-gradient(top,  rgba(238,238,238,1) 0%,rgba(238,238,238,1) 100%); /* Opera 11.10+ */
        background: -ms-linear-gradient(top,  rgba(238,238,238,1) 0%,rgba(238,238,238,1) 100%); /* IE10+ */
        background: linear-gradient(to bottom,  rgba(238,238,238,1) 0%,rgba(238,238,238,1) 100%); /* W3C */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#eeeeee', endColorstr='#eeeeee',GradientType=0 ); /* IE6-8 */
        }
        
        #btnConfigBD
        {
            position:absolute; 
            top:0px; 
            right:0px; 
            line-height:normal;
            width:50px;
            height:50px;
            border-bottom-left-radius:20px;
            border:0px dotted gray;
            background-color:#21729A;
        }
        
        #dvRecordarContrasena 
        {
            margin:0px auto;
	        margin-top:120px;
	        position:relative;
	        padding:10px;
	        width:380px;
	        min-height:200px;
	        border-radius:4px;
	        background-color:#FFFFFF;
	        box-shadow: 0 2px 5px #666666;	        
            z-index: 999999;
        }

        #dvConfirmacionEnvio {
	        /*left: 0;              */
            /*position: absolute;   */
            /*top: 0;               */
            /*width: 100%;          */
            /* z-index: 999999;     */
            margin:0px auto;
	        margin-top:120px;
	        position:relative;
	        padding:10px;
	        width:380px;
	        min-height:200px;
	        border-radius:4px;
	        background-color:#FFFFFF;
	        box-shadow: 0 2px 5px #666666;	        
            z-index: 999999;
        }
        .popup-overlay {
	        left: 0;
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 99999;
	        display:none;
	        background-color: #777777;
            cursor: pointer;
            opacity: 0.7;
        }
        .h1-NombreProducto1
        {
            /*color:#10589A;*/ 
            float:right; 
            font-weight:bolder;
        }
        .h1-NombreProducto2
        {
            /*color:#E78503;*/ 
            float:right; 
            font-weight:bolder; 
            margin-right:20px;
        }
        #dvLoginPrincipal
        {
            font-family: Arial;
        }
    </style>
    <link href="Styles/Sitio.css" rel="stylesheet" type="text/css" />
    <script src="Scripts/jquery-1.7.1.js" type="text/javascript"></script>
    <link href="Scripts/jquery-ui-1.8.16.custom.css" rel="stylesheet" type="text/css" />
    <script src="Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <link href="Styles/Bootstrap/css/bootstrap3.css" rel="stylesheet" type="text/css" />
    <script src="Styles/Bootstrap/js/bootstrap.js" type="text/javascript"></script>
    <script src="Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Login.js" type="text/javascript"></script>
</head>
<body class="bodyCentrarAbsoluto colorBackGroundCentrarAbs">
    <form id="form1" runat="server" method="post">
    <asp:HiddenField ID="hfLoc" runat="server" />
    <asp:HiddenField ID="hdfRutaRaiz" runat="server" />
    <div id="dvMsgAlertaExterna" style="display: none;">
        <span class="ui-icon ui-icon-alert" style="float: left;"></span>
        <div id="dvContenidoAlertaExterna">
        </div>
    </div>
    <div class="CentrarAbsoluto" style="width: 1000px; height: 600px; background:white; border-radius:20px; overflow:hidden;">
        <div style="line-height:normal;  width:100%; height:80px; border-bottom:1px solid rgb(238,238,238); " >
            <img src="Common/images/Login/Logo_PMS.png" style="margin-top:15px; float:left; margin-left:20px;" width="300" height="50" />
            <div id="btnConfigBD" style="display:none;">
<%--                <a href="Configuracion.aspx">
                    <img style="margin-top:8px;" src="Common/images/Login/OrangeGear.png" />
                </a>--%>
            </div>
        </div>
        <div style="width:70%; height:520px; float:left;">
<%--            <div style="position:absolute; left:0px; top:80px; width:70%; height:100px; background:rgba(130,130,130,.5)">
            <h1 style="color:#E78503; float:right; font-weight:bolder;">Móviles </h1> 
                <h1 style="color:#10589A; float:right; font-weight:bolder;">Gestión </h1> 
                
            </div>--%>
            <img src="Common/images/Login/FondoLogin.png" width="100%" height="100%"/>
            


<%--            <div id="dvPie" style="height: 40px; width: 100%; background: #175296; width: 800px;
            clear: both; margin-left: auto; margin-right: auto; ">
            <img class="style4" src="Common/images/logo-visualsoft.png" /></div>--%>
        </div>
        <div id="dvLoginPrincipal" style=" width:30%; height:520px; float:left; border-left:0px solid rgb(238,238,238); ">
            <div style="width:100%; height:10%; border:0px dotted gray;">
                <h1 class="h1-NombreProducto2"><asp:Label ID="lblNombreProducto2" runat="server"></asp:Label></h1> 
                <h1 class="h1-NombreProducto1"><asp:Label ID="lblNombreProducto1" runat="server"></asp:Label></h1> 
            </div>
            <div id="loginbox" style="width: 100%; height:90%; border:0px solid white !important;" >
                <%-- col-xs-12 col-sm-12 col-md-12 --%>
                <div  style="background-color: white; width: 100%; height:100%;">
                    <div class="" style="">
                        <div class="">
                            <h3 style="color: #10589A; font-weight:bolder;">Login</h3></div>
                    </div>
                    <div style="padding-top:60px;" class="panel-body">
                        <div style="display: none" id="login-alert" class="alert alert-danger col-sm-12">
                        </div>
                        <%--<form id="loginform" class="" role="form">--%>
                        <div style="margin-bottom: 25px; top: 0px; left: 0px;" class="input-group">
                            <span class="input-group-addon"><img src="Common/images/userlogin.png" width="16px" height="16px" /></span>
                            <asp:TextBox ID="txtusuario" runat="server" placeholder="Usuario" Width="230px" Height="30px"
                                CssClass="input-group-addon"></asp:TextBox>
                        </div>
                        <div style="margin-bottom: 25px" class="input-group">
                            <span class="input-group-addon"><img src="Common/images/passlogin.png" width="16px" height="16px" /></span>
                            <asp:TextBox ID="txtclave" runat="server" placeholder="Contraseña" Width="230px"
                                Height="30px" CssClass="input-group-addon" TextMode="Password"></asp:TextBox>
                        </div>
                        <div class="input-group">
                        </div>
                        <div style="margin-top: 10px" class="form-group">
                            <!-- Button -->
                            <div class="col-sm-24 controls" style="text-align: center;">
                                <%--<a id="btn-login" href="#" class="btn btn-primary">Iniciar Sesión</a>--%>
                                <asp:Button ID="btnentra"  runat="server" Text="Iniciar Sesión" OnClick="btnentra_Click" class="btn btn-success btn-lg" />
                            </div>
                            <div>
                                <asp:Label runat="server" Text="¿Olvidó su contraseña?" id="LblOlvidoContrasena" style="color: black; text-decoration: underline; font-size: 12px; cursor: pointer;"></asp:Label>
                            </div>
                            <div class="error_msj">
                                <asp:Label runat="server" ID="lbl_error" CssClass="error_ms"></asp:Label>
                            </div>
                        </div>
                        <div class="pad-all" style="text-align: center;">
                            <span id="lblProductoRelease" class="mar-rgt"><asp:Literal runat="server" ID="litProductoRelease"></asp:Literal> </span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        
    </div>
<%--    <div id="dvConfiguracion" style="height: 20px; width: 100%; width: 840px; clear: both;
        margin-left: auto; margin-right: auto; cursor: pointer;">
        <div id="dvenlaceConfig" style="float: right;">
            <a>Ir a Configuración</a></div>
    </div>--%>

    <div id="dvRecordarContrasena" style="display: none;">
        <div>
            <h3 style="color: #10589A; font-weight:bolder; text-align:center; margin:10px 10px 20px 10px;">Cambia tu contraseña</h3>
        </div>
        <div style="height:90px; padding: 0px 15px 0px 15px">
            <b>Ingresa tu correo electrónico</b>
            <%--<span class="input-group-addon"><img src="Common/images/userlogin.png" width="16px" height="16px" /></span>--%>
            <asp:TextBox ID="txtCorreo" runat="server" Width="280px" Height="30px" MaxLength="35" style="margin:8px 10px 8px 0px"></asp:TextBox>
            <asp:Image ID="imgCorreo" runat="server" style="vertical-align:middle;"/>
            <div id="dvFormatInvalid" style="color: #EF9090;font-size: small; display:none;">
                El formato del correo no es válido.
            </div>
        </div>        
        <div style="text-align:right;">
            <div id="btnEnviar" class="btn btn-success">
                Enviar
            </div>
            <div id="btnCerrar" class="btn btn-success">
                Cerrar
            </div>
        </div>
    </div>
    <div id="dvConfirmacionEnvio" style="display:none;">
        <div class="content-dvRecordarContrasena" > <%----%>
            <div  class="content-dvRecConTituluo">
                <%--<h2>Revisa tu correo</h2>--%>
                <h3 style="color: #10589A; font-weight:bolder; text-align:center; margin:10px 10px 20px 10px;">Revisa tu correo</h3>
            </div>
            <div style="color:#000000; padding-bottom:40px; font-family:Arial; font-size:15px;">
                Hemos enviado un correo electrónico a <label id="lblCorreoEnvio" style="color:#FF965A;font-weight:bold;font-size:15px !important;"></label>. Haz clic en el enlace dentro del correo electrónico para restablecer tu contraseña.
            </div>
            <div style="margin-top:8px;">
                <table width="100%">
                    <tr>
                        <td align="right">
                            <div id="btnVolverLogin" class="btn btn-success" >
                                <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                                <a style="color:White!important;">Listo</a>
                            </div>
                        </td>
                    </tr>
                </table>            
            </div>
        </div>
        
    </div>
    <div class="popup-overlay" style="display: none;"></div>
    </form>
</body>
</html>
