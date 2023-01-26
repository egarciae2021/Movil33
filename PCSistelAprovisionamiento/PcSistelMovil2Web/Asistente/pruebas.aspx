<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pruebas.aspx.cs" Inherits="PcSistelMovil2Web.Asistente.pruebas" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    

    <table id="divLoginPrincipal" border="0" width="1000px" align="center" style="border-bottom-style: solid; border-bottom-width: 5px; border-bottom-color: rgb(161, 200, 253); border-left-style: solid; border-left-width: 5px; border-left-color: rgb(202, 225, 253); border-right-style: solid; border-right-width: 5px; border-right-color: rgb(202, 225, 253); vertical-align: middle; top: -10px; border-radius: 10px; background-image: url(http://srvpresentacion/PCSISTEL_Movil/common/images/login/fondo_login_01.png); background-repeat: no-repeat;">
        <tbody><tr>
            <td colspan="2">
                <table width="100%">
                    <tbody><tr>
                        <td align="center">
                            <img alt="" src="Common/Images/Login/barra_logos.png">
                        </td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
        <tr>
            <td valign="top">
                <table border="0" width="660px" cellspacing="0">
                    <tbody><tr height="505px">
                        <td>
                            &nbsp;
                        </td>
                        <td valign="top" width="100%">
                            <div id="dvImgCentralLogin" style="">
                                <img src="Common/Images/Login/image-mobile-04.jpg" height="230px" width="600px" alt="">
                            </div>
                            <div id="slider" style="display: none; width: 600px; height: 230px; overflow: hidden;">
                                <ul style="width: 3600px; margin-left: -600px;"><li style="margin-left: -600px; float: left;">
                                        <img src="Common/Images/Login/image-mobile-05.jpg" height="230px" width="600px" alt=""></li>
                                    <li style="float: left;">
                                        <img src="Common/Images/Login/image-mobile-04.jpg" height="230px" width="600px" alt=""></li>
                                    <!--[if gte IE 9]-->
                                    <li style="float: left;">
                                        <img src="Common/Images/Login/image-mobile-01.jpg" height="230px" width="600px" alt=""></li>
                                    <li style="float: left;">
                                        <img src="Common/Images/Login/image-mobile-02.jpg" height="230px" width="600px" alt=""></li>
                                    <li style="float: left;">
                                        <img src="Common/Images/Login/image-mobile-03.jpg" height="230px" width="600px" alt=""></li>
                                    <li style="float: left;">
                                        <img src="Common/Images/Login/image-mobile-05.jpg" height="230px" width="600px" alt=""></li>
                                    
                                    <!--[endif]-->
                                <li style="float: left;">
                                        <img src="Common/Images/Login/image-mobile-04.jpg" height="230px" width="600px" alt=""></li></ul>
                            </div> <span id="prevBtn"><a href="javascript:void(0);"></a></span> <span id="nextBtn"><a href="javascript:void(0);"></a></span>
                        </td>
                        <td>
                            &nbsp;
                        </td>
                    </tr>
                </tbody></table>
            </td>
            <td width="300px">
                <table width="100%" border="0">
                    <tbody><tr>
                        <td valign="top">
                            <div id="divProducto" style="border-bottom-style: solid; border-bottom-width: 5px; border-bottom-color: rgb(161, 200, 253); border-left-style: solid; border-left-width: 5px; border-left-color: rgb(202, 225, 253); border-right-style: solid; border-right-width: 5px; border-right-color: rgb(202, 225, 253); display: none; opacity: 0.75; border-radius: 10px; background-color: rgb(252, 254, 251);">
                                <table>
                                    <tbody><tr height="35px">
                                        <td align="center" style="font-weight: bold; font-size: 14px; color: #2E497A;">
                                            PC<span style="color: #EE9922">Sistel</span> Móvil<span style="color: #EE9922"></span>
                                            2<span style="color: #EE9922">.0</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-size: 12px; color: #2D4570;">
                                            Sistema de Gestión de Equipos Móviles:
                                            <ul>
                                                <li>Administración de Pedidos y Solicitudes</li>
                                                <li>Consultas y Reportes</li>
                                                <li>Gestión de Incidencias</li>
                                            </ul>
                                        </td>
                                    </tr>
                                </tbody></table>
                            </div>
                        </td>
                    </tr>
                    <tr height="5px">
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            
                            <div id="divInicioSesion" style="border-radius: 0px !important; width: 250px !important; height: 325px !important; opacity: 0.8; background-color: ;">
                                <table id="loginPrincipal" cellspacing="0" cellpadding="0" style="height:120px;width:250px;border-collapse:collapse;">
	<tbody><tr>
		<td>
                                        <table align="center" border="0" width="100%" cellspacing="0" style="background-color: #00709E;">
                                            <tbody><tr height="220px">
                                                <td valign="top" style="">
                                                    <table width="100%" border="0" style="color: White; height: 330px !important; border-spacing: 0px !important;">
                                                        <tbody><tr height="50px" style="background-color: #004A68;">
                                                            <td align="center" colspan="2" style="font-weight: bold; font-size: 16px; font-family: Arial Black !important;">
                                                                
                                                                Acceso a la Plataforma
                                                            </td>
                                                        </tr>

                                                        <tr height="15px">
                                                            
                                                        </tr>
                                                        <tr height="20px">
                                                            <td style="font-weight: bold; font-size: 14px; padding: 0px 0px 0px 30px; font-family: Arial;" colspan="2">
                                                                &nbsp;Usuario:
                                                            </td>                                                        
                                                        </tr>
                                                        <tr height="20px">
                                                            
                                                            <td style="padding: 0px 0px 0px 30px;" colspan="2">
                                                                <input name="loginPrincipal$UserName" type="text" value="Nombre Usuario..." maxlength="50" id="loginPrincipal_UserName" class="txtEmail" style="height:21px;width:180px;border-radius: 0px !important; font-size: 12px !important;">
                                                                <span id="loginPrincipal_UserNameRequired" title="Campo requerido" style="visibility:hidden;">*</span>
                                                            </td>
                                                        </tr>
                                                        <tr height="15px">
                                                            <td colspan="2">
                                                            </td>

                                                        </tr>


                                                        <tr height="20px">
                                                            <td style="font-weight: bold; font-size: 14px; padding: 0px 0px 0px 30px; font-family: Arial;" colspan="2">
                                                                &nbsp;Contraseña:
                                                            </td>                                                        
                                                        </tr>
                                                        <tr height="20px">

                                                            <td style="padding: 0px 0px 0px 30px;" colspan="2">
                                                                <input name="loginPrincipal$Password" type="text" value="Contraseña" maxlength="200" id="loginPrincipal_Password" class="txtPwd" style="height:21px;width:180px;border-radius: 0px !important; font-size: 12px !important;">
                                                                <span id="loginPrincipal_PasswordRequired" title="Campo requerido" style="visibility:hidden;">*</span>
                                                            </td>
                                                        </tr>
                                                        <tr height="15px">
                                                            <td style="padding: 0px 30px 0px 30px;" colspan="2">
                                                              <span id="loginPrincipal_LblOlvidoContrasena" style="color: white; text-decoration: underline; font-size: 12px; cursor: pointer;">¿Has Olvidado tu contraseña?</span>

                                                            </td>

                                                        </tr>
                                                        <tr id="filaRecordarme" style="display: none;">
                                                            <td>
                                                            </td>
                                                            <td align="left">
                                                                <input id="loginPrincipal_RememberMe" type="checkbox" name="loginPrincipal$RememberMe"><label for="loginPrincipal_RememberMe">No cerrar sesion</label>
                                                            </td>
                                                        </tr>
                                                        <tr id="Tr1" height="15px">
                                                            <td colspan="2">
                                                            </td>
                                                        </tr>
                                                        <tr height="22px" id="filaCaptcha" style="display: none;">
                                                            <script type="text/javascript">
                                                                if ($("#hdfCaptcha").val() == "1") {
                                                                    sjcap();
                                                                }
                                                            </script>
                                                        </tr>
                                                        <tr height="45px">
                                                            <td align="center" valign="middle" colspan="2">
                                                                <input type="submit" name="loginPrincipal$LoginButton" value="Inicio de Sesión" onclick="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;loginPrincipal$LoginButton&quot;, &quot;&quot;, true, &quot;loginPrincipal&quot;, &quot;&quot;, false, false))" id="loginPrincipal_LoginButton" class="k-button" style="font-size: 14px !important; font-weight: bold;">
                                                            </td>
                                                        </tr>
                                                        <tr height="5px" style="background-color: #004A68;">
                                                          <td colspan="2">
                                                          
                                                          </td>
                                                        </tr>
                                                    </tbody></table>
                                                </td>
                                            </tr>
                                        </tbody></table>










                                    </td>
	</tr>
</tbody></table>
                                <table border="0" width="100%" cellpadding="0">
                                    <tbody><tr>
                                        <td align="center">
                                            
                                        </td>
                                    </tr>
                                </tbody></table>
                            </div>
                            <br>
                              <div id="dvBotones" style="font-size:9px;width: 100%; top: 100px; text-align: center;">
                                <table style="font-size:9px;width: 100%; top: 100px; text-align: center;" id="tblBotones">
                                  <tbody><tr id="trLink1">
                                  </tr>
                                  <tr id="trLink2">
                                  </tr>
                                </tbody></table>
                              </div>
                            <br>
                        </td>
                    </tr>
                    
                    
                                
                </tbody></table>
            </td>
        </tr>
    </tbody></table>
















    </div>
    </form>
</body>
</html>
