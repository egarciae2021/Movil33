<%@ Page Language="VB" AutoEventWireup="false" Inherits="Theme" Codebehind="Theme.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="Common/Styles/Principal.css" rel="stylesheet" type="text/css" />
    <script src="Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="Common/Scripts/Utilitario.js" type="text/javascript"></script> 
    <script src="Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="Theme.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div class="dvPanel" style="height:470px; width: 650px;">
            Seleccionar Tema
            <br />
            <div class="jquery-ui-themeswitcher" style="overflow:auto; width:630px; height:417px;">
                <div id="themeGallery">
                    <table>
                        <tr>
                            <%--<td>
                                <a id="Principal">
                                    <img src="Common/Images/Controles/ThemeSwitcher/theme_90_Principal.png" alt="Principal" title="Principal" />
                                    <span class="themeName">Principal</span>
                                </a>                        
                            </td>
                            <td>
                                <a id="ui-lightness">
                                    <img src="Common/Images/Controles/ThemeSwitcher/theme_90_ui_light.png" alt="UI Lightness" title="UI Lightness" />
                                    <span class="themeName">UI lightness</span>
                                </a>
                            </td>
                            <td>
                                <a id="ui-darkness">
                                    <img src="Common/Images/Controles/ThemeSwitcher/theme_90_ui_dark.png" alt="UI Darkness" title="UI Darkness" />
                                    <span class="themeName">UI darkness</span>
                                </a>                        
                            </td>
                            <td>
                                <a id="smoothness">
                                    <img src="Common/Images/Controles/ThemeSwitcher/theme_90_smoothness.png" alt="Smoothness" title="Smoothness" />
                                    <span class="themeName">Smoothness</span>
                                </a>                        
                            </td>
                            <td>
                                <a id="start">
                                    <img src="Common/Images/Controles/ThemeSwitcher/theme_90_start_menu.png" alt="Start" title="Start" />
                                    <span class="themeName">Start</span> 
                                </a>
                            </td>--%>
                            <td>
                                <a id="redmond">
                                    <img src="Common/Images/Controles/ThemeSwitcher/theme_90_windoze.png" alt="Redmond" title="Redmond" />
                                    <span class="themeName">Redmond</span>
                                </a>
                            </td>

                            <td>
                                <a id="blitzer">
                                    <img src="Common/Images/Controles/ThemeSwitcher/theme_90_blitzer.png" alt="Blitzer" title="Blitzer" />
                                    <span class="themeName">Blitzer</span>
                                </a>
                            </td>

                        </tr>
                        <%--<tr>
                            <td>
                                <a id="sunny">
                                    <img src="Common/Images/Controles/ThemeSwitcher/theme_90_sunny.png" alt="Sunny" title="Sunny" />
                                    <span class="themeName">Sunny</span>
                                </a>                        
                            </td>
                            <td>
                                <a id="overcast">
                                    <img src="Common/Images/Controles/ThemeSwitcher/theme_90_overcast.png" alt="Overcast" title="Overcast" />
                                    <span class="themeName">Overcast</span>
                                </a>
                            </td>
                            <td>
                                <a id="le-frog">
                                    <img src="Common/Images/Controles/ThemeSwitcher/theme_90_le_frog.png" alt="Le Frog" title="Le Frog" />
                                    <span class="themeName">Le Frog</span>
                                </a>
                            </td>
                            <td>
                                <a id="flick">
                                    <img src="Common/Images/Controles/ThemeSwitcher/theme_90_flick.png" alt="Flick" title="Flick" />
                                    <span class="themeName">Flick</span>
                                </a>
                            </td>
                            <td>
                                <a id="pepper-grinder">
                                    <img src="Common/Images/Controles/ThemeSwitcher/theme_90_pepper_grinder.png" alt="Pepper Grinder" title="Pepper Grinder" />
                                    <span class="themeName">Pepper Grinder</span>
                                </a>
                            </td>
                            <td>
                                <a id="eggplant">
                                    <img src="Common/Images/Controles/ThemeSwitcher/theme_90_eggplant.png" alt="Eggplant" title="Eggplant" />
                                    <span class="themeName">Eggplant</span>
                                </a>
                            </td>
                        </tr>--%>
                        <%--<tr>
                            <td>
                                <a id="dark-hive">
                                    <img src="Common/Images/Controles/ThemeSwitcher/theme_90_dark_hive.png" alt="Dark Hive" title="Dark Hive" />
                                    <span class="themeName">Dark Hive</span>
                                </a>
                            </td>
                            <td>
                                <a id="cupertino">
                                    <img src="Common/Images/Controles/ThemeSwitcher/theme_90_cupertino.png" alt="Cupertino" title="Cupertino" />
                                    <span class="themeName">Cupertino</span>
                                </a>
                            </td>
                            <td>
                                <a id="south-street">
                                    <img src="Common/Images/Controles/ThemeSwitcher/theme_90_south_street.png" alt="South St" title="South St" />
                                    <span class="themeName">South Street</span>
                                </a>
                            </td>
                            <td>
                                <a id="blitzer">
                                    <img src="Common/Images/Controles/ThemeSwitcher/theme_90_blitzer.png" alt="Blitzer" title="Blitzer" />
                                    <span class="themeName">Blitzer</span>
                                </a>
                            </td>
                            <td>
                                <a id="humanity">
                                    <img src="Common/Images/Controles/ThemeSwitcher/theme_90_humanity.png" alt="Humanity" title="Humanity" />
                                    <span class="themeName">Humanity</span>
                                </a>
                            </td>
                            <td>
                                <a id="hot-sneaks">
                                    <img src="Common/Images/Controles/ThemeSwitcher/theme_90_hot_sneaks.png" alt="Hot Sneaks" title="Hot Sneaks" />
                                    <span class="themeName">Hot sneaks</span>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a id="excite-bike">
                                    <img src="Common/Images/Controles/ThemeSwitcher/theme_90_excite_bike.png" alt="Excite Bike" title="Excite Bike" />
                                    <span class="themeName">Excite Bike</span>
                                </a>
                            </td>
                            <td>
                                <a id="vader">
                                    <img src="Common/Images/Controles/ThemeSwitcher/theme_90_black_matte.png" alt="Vader" title="Vader" />
                                    <span class="themeName">Vader</span>
                                </a>
                            </td>
                            <td>
                                <a id="dot-luv">
                                    <img src="Common/Images/Controles/ThemeSwitcher/theme_90_dot_luv.png" alt="Dot Luv" title="Dot Luv" />
                                    <span class="themeName">Dot Luv</span>
                                </a>
                            </td>
                            <td>
                                <a id="mint-choc">
                                    <img src="Common/Images/Controles/ThemeSwitcher/theme_90_mint_choco.png" alt="Mint Choc" title="Mint Choc" />
                                    <span class="themeName">Mint Choc</span>
                                </a>
                            </td>
                            <td>
                                <a id="black-tie">
                                    <img src="Common/Images/Controles/ThemeSwitcher/theme_90_black_tie.png" alt="Black Tie" title="Black Tie" />
                                    <span class="themeName">Black Tie</span>
                                </a>
                            </td>
                            <td>
                                <a id="trontastic">
                                    <img src="Common/Images/Controles/ThemeSwitcher/theme_90_trontastic.png" alt="Trontastic" title="Trontastic" />
                                    <span class="themeName">Trontastic</span>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a id="swanky-purse">
                                    <img src="Common/Images/Controles/ThemeSwitcher/theme_90_swanky_purse.png" alt="Swanky Purse" title="Swanky Purse" />
                                    <span class="themeName">Swanky Purse</span>
                                </a>
                            </td>
                        </tr>--%>
                    </table>
                </div>
            </div>
            <br/>
            <div id="btnGuardar" class="btnNormal">
                <asp:Image ID="imgGuardar" runat="server" ImageUrl="Common/Images/Mantenimiento/Guardar.png" />
                <a>Guardar</a>
            </div>
            <div id="btnCerrar" class="btnNormal">
                <asp:Image ID="imgCerrar" runat="server" ImageUrl="Common/Images/Mantenimiento/Salir.gif" />
                <a>Cerrar</a>
            </div>
        </div>
    </form>
</body>
</html>