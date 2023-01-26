<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Configuracion_General_MisDatos"
    CodeBehind="MisDatos.aspx.vb" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>

<%@ Register Src="../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico" TagPrefix="ttgInfo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

    <%--<link href="../../Content/css/shared/bootstrap.min.css" rel="stylesheet">
    <link href="../../Content/css/shared/nifty.min.css" rel="stylesheet">
    <link href="../../Content/css/shared/nifty-demo-icons.min.css" rel="stylesheet">--%>

    <link href="../../Common/Styles/Principal.css" rel="stylesheet" type="text/css" />

    <script type="text/javascript" src="../../Common/Scripts/jquery-1.7.2.js"></script>
    <%--<script type="text/javascript" src="../../Content/js/shared/jquery_1.7.2/bootstrap.min.js"></script>--%>

    <script src="../../Common/Scripts/JqueryUI/jquery.ui.core.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.tabs.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.accordion.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.draggable.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.resizable.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.datepicker.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <%--<script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>--%>
    <style type="text/css">
        #dvDashboard {
            width: 100%;
            height: 300px;
            border: 0px dotted gray;
            overflow: hidden;
        }

        #contenedor {
            width: 103%;
            height: 315px;
            border: 0px dotted red;
            overflow: scroll;
        }

        .dvImgDash {
            width: 150px;
            height: 170px;
            border: 1px dotted skyblue;
            float: left;
            margin-left: 10px;
            margin-top: 5px;
        }

        .dvSelect {
            border: 2px solid skyblue;
            border-radius: 3px;
            box-shadow: 3px 3px 3px gray;
        }

        .dashHead {
            width: 150px;
            height: 20px;
            border: 0px dotted gray;
        }

        .dashBody {
            width: 150px;
            height: 150px;
            border: 0px dotted gray;
        }

            .dashBody:hover {
                cursor: pointer;
            }

            .dashBody img {
                width: 100%;
                max-width: 100%;
                height: 100%;
            }




        .demo-theme {
            cursor: pointer !important;
            display: inline-block;
            width: 30px; 
            height: 30px;
            background-color: #f4f4f4;
            position: relative;
            transition: all .2s;
        }

        .demo-theme-gray {
            background-color: #8f9ea6;
        }

        .demo-theme-navy {
            background-color: #294d73;
        }

        .demo-theme-mint {
            background: #26a69a;
        }

        .demo-theme-dark {
            background: #3a444e;
        }

        .demo-theme-prickly-pear {
            background: #ad5468;
        }

        .demo-theme-coffee {
            background: #807362;
        }

        .demo-theme-well-red {
            background: #d23e3e;
        }

        .demo-theme-yellow {
            background: #efd45a;
        }

        .demo-theme-dust {
            background: #fd8943;
        }

        .demo-theme-purple {
            background: #8b5b9f;
        }

        .demo-theme-lime {
            background: #80b343;
        }

        .demo-theme-ocean {
            background: #177bbb;
        }
    </style>
</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("/Common/Scripts/Utilitario.js")%>" type="text/javascript"></script> 
 <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("MisDatos.js")%>" type="text/javascript"></script> 

    <form id="form1" runat="server">
        <!-- ==============================================================
            MODULO DE SEGURIDAD - Es Clave Segura
       ==============================================================-->
        <asp:HiddenField ID="hdfEsClaveSegura" runat="server" />
        <!-- ==============================================================
       ==============================================================-->
        <div id="ChangeImagenUsuario" style="display: none;">
            <iframe id="ifChangeImagenUsuario" width="380px" height="210px" frameborder="0" style="padding: 0px; margin: 0px;"></iframe>
        </div>
        <div>
            <table style="width: 800px;" border="0" align="center">
                <%--<tr>
                    <td align="center" style="font-size: 16px;">
                        <b>Configuraci&oacuten Personal</b> &nbsp;
                    </td>
                </tr>
                <tr>
                    <td align="right" height="10px"></td>
                </tr>--%>
                <tr>
                    <td align="center">
                        <table style="width: 100%;" border="0">
                            <tr>
                                <td></td>
                                <td id="tdSeguridad" runat="server">
                                    <div id="divSeguridad" class="dvPanel" style="width: 770px;">
                                        <table border="0" width="100%">
                                            <tr>
                                                <td style="width: 115px;">
                                                    <asp:Label ID="lblvcNom" runat="server" Text="Descripción"></asp:Label>
                                                </td>
                                                <td>
                                                    <asp:TextBox ID="txtvcNom" runat="server" Width="300px" MaxLength="50"></asp:TextBox>
                                                </td>
                                                <td></td>
                                            </tr>
                                            <tr style="height: 10px;">
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td colspan="3">
                                                    <b><u>
                                                        <asp:Label ID="lblCredenciales" runat="server" Text="Credenciales"></asp:Label>
                                                    </u></b>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <asp:Label ID="lblvcUsu" runat="server" Text="Usuario"></asp:Label>
                                                </td>
                                                <td>
                                                    <asp:TextBox ID="txtvcUsu" runat="server" Width="150px" MaxLength="20"></asp:TextBox>
                                                </td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <asp:Label ID="lblvcPas" runat="server" Text="Contraseña"></asp:Label>
                                                </td>
                                                <td>
                                                    <asp:TextBox ID="txtvcPas" TextMode="Password" runat="server" Width="150px" MaxLength="200"></asp:TextBox>
                                                </td>
                                                <td>
                                                    <div id="dvInfo" runat="server" style="display: none;">
                                                        <ttgInfo:ToolTipGenerico ID="infoLinea" runat="server" Mensaje="" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <asp:Label ID="Label1" runat="server" Text="Confirme Contraseña"></asp:Label>
                                                </td>
                                                <td>
                                                    <asp:TextBox ID="txtvcPasCon" TextMode="Password" runat="server" Width="150px" MaxLength="200"></asp:TextBox>
                                                </td>
                                                <td></td>
                                            </tr>
                                            <tr id="trIMagenUsuario">
                                                <td>
                                                    <asp:Label ID="Label2" runat="server" Text="Imagen"></asp:Label>
                                                </td>
                                                <td style="cursor: hand; cursor: pointer;">
                                                    <asp:Image runat="server" ID="imgUsuario" Height="50px" Width="50px" />
                                                </td>
                                                <td></td>
                                            </tr>
                                            <tr height="15px">
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>


                                            <tr>
                                                <td style="vertical-align: top;">Seleccione un tema
                                                </td>
                                                <td>

                                                    <div class="demo-theme-btn col-md-3 pad-ver">
                                                        <div class="demo-justify-theme">
                                                            <a href="#" class="demo-theme demo-theme-lime add-tooltip" data-theme="theme-lime" data-type="d" data-title="(D). Lime"></a>
                                                            <a href="#" class="demo-theme demo-theme-purple add-tooltip" data-theme="theme-purple" data-type="d" data-title="(D). Purple"></a>
                                                            <a href="#" class="demo-theme demo-theme-dust add-tooltip" data-theme="theme-dust" data-type="d" data-title="(D). Dust"></a>
                                                        </div>
                                                        <div class="demo-justify-theme">
                                                            <a href="#" class="demo-theme demo-theme-mint add-tooltip" data-theme="theme-mint" data-type="d" data-title="(D). Mint"></a>
                                                            <a href="#" class="demo-theme demo-theme-yellow add-tooltip" data-theme="theme-yellow" data-type="d" data-title="(D). Yellow"></a>
                                                            <a href="#" class="demo-theme demo-theme-well-red add-tooltip" data-theme="theme-well-red" data-type="d" data-title="(D). Well Red"></a>
                                                        </div>
                                                        <div class="demo-justify-theme">
                                                            <a href="#" class="demo-theme demo-theme-coffee add-tooltip" data-theme="theme-coffee" data-type="d" data-title="(D). Coffee"></a>
                                                            <a href="#" class="demo-theme demo-theme-prickly-pear add-tooltip" data-theme="theme-prickly-pear" data-type="d" data-title="(D). Prickly pear"></a>
                                                            <a href="#" class="demo-theme demo-theme-dark add-tooltip active" data-theme="theme-dark" data-type="d" data-title="(D). Dark"></a>
                                                        </div>
                                                        <div class="demo-justify-theme">
                                                            <%--<a href="#" class="demo-theme demo-theme-gray add-tooltip" data-theme="theme-gray" data-type="d" data-title="(D). Gray"></a>--%>
                                                            <a href="#" class="demo-theme demo-theme-navy add-tooltip" data-theme="theme-navy" data-type="d" data-title="(D). Navy Blue"></a>
                                                            <a href="#" class="demo-theme demo-theme-ocean add-tooltip" data-theme="theme-ocean" data-type="d" data-title="(D). Ocean"></a>
                                                        </div>
                                                    </div>

                                                </td>
                                                <td></td>
                                            </tr>

                                        </table>
                                    </div>
                                    <br />
                                    <div id="divDatosPredefinidos" class="dvPanel" style="width: 630px; display: none;">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td>Excel por Defecto&nbsp;
                                                </td>
                                                <td>
                                                    <asp:DropDownList ID="ddlExcelPorDefecto" runat="server">
                                                        <asp:ListItem Text="<Seleccionable>" Value=""></asp:ListItem>
                                                        <asp:ListItem Text="Excel 2003 o inferior" Value="XLS"></asp:ListItem>
                                                        <asp:ListItem Text="Excel 2007 o posterior" Value="XLSX"></asp:ListItem>
                                                    </asp:DropDownList>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                        </table>




                    </td>
                </tr>

                <tr>
                    <td align="right">
                        <div id="btnGuardar" class="btnNormal">
                            <a>Aplicar Cambios</a>
                        </div>
                    </td>
                </tr>

            </table>
        </div>
    </form>
</body>

</html>
