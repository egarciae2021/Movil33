<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Mnt_List_Lineas_Meses.aspx.vb"
    Inherits=".Mnt_List_Lineas_Meses" %>

<%@ Register Src="../../../../Common/Controles/ToolTipGenerico2.ascx" TagName="ToolTipGenerico2" TagPrefix="uc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../../Common/Styles/Uniform/default/css/uniform.default.min.css"
        rel="stylesheet" type="text/css" />
    <script src="../../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    
    <script src="../../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/anytime.js" type="text/javascript"></script>


    <link href="../../../../Common/Scripts/select2/select2.min.css" rel="stylesheet" />
    <script src="../../../../Common/Scripts/select2/select2.min.js" type="text/javascript"></script>

    <style type="text/css">
        .style1 {
            text-align: right;
        }
    </style>
    <style type="text/css">
        .dvCargandoMnt {
            background: url('../../../../Common/Images/Mantenimiento/Cargando.gif') no-repeat right center;
            width: 64px;
            height: 64px;
            top: 50%;
            left: 50%;
            z-index: 20;
            position: fixed;
            display: block;
        }

        .style2 {
            width: 195px;
            margin-left: 40px;
        }
    </style>
</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Mnt_List_Lineas_Meses.js")%>" type="text/javascript"></script>
    <div id="dvCargandoMnt" class="dvCargandoMnt">
    </div>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfOpcionPrincipal" runat="server" />
        <div class="dvPanel" style="overflow: auto;">
            <table align="center">
                <tr>
                    <td class="style1">&nbsp; Empleado:
                    </td>
                    <td class="style2">
                        <asp:DropDownList ID="ddlEmpleado" runat="server" Width="234px">
                        </asp:DropDownList>
                    </td>
                    <td style="text-align: right; width: 180px;">Organización:
                    </td>
                    <td>
                        <table border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <asp:TextBox ID="txtNomOrganizacion" ReadOnly="true" runat="server" Width="224px"
                                        Text=" <Todos>"></asp:TextBox>
                                    <asp:HiddenField ID="hdfCodOrganizacion" runat="server" Value="-1" />
                                </td>
                                <td>&nbsp;
                                <div id="btnAgregarOrga" class="btnNormal" runat="server" title="Seleccionar Organización">
                                    <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/buscar.png" />
                                </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td style="text-align: right">Línea:
                    </td>
                    <td class="style2">
                        <asp:TextBox ID="txtLinea" runat="server" Width="100px" Text="" MaxLength="9"></asp:TextBox>
                    </td>
                    <td style="text-align: right"># Meses a vencer (Líneas):
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlTipoMes" runat="server" Width="69px">
                            <asp:ListItem Value="-1" Text=""></asp:ListItem>
                            <asp:ListItem Value=">" Text="Mayor"></asp:ListItem>
                            <asp:ListItem Value="<" Text="Menor"></asp:ListItem>
                            <asp:ListItem Value="=" Text="Igual"></asp:ListItem>
                        </asp:DropDownList>
                        <asp:TextBox ID="txtNroMeses" runat="server" Width="30px" Text="" MaxLength="3"></asp:TextBox>
                        (Meses)

                    </td>

                    <td></td>
                </tr>
                <tr>
                    <td style="text-align: right">
                    </td>
                    <td class="style2">
                    </td>
                    <td style="text-align: right"># Meses a vencer (Equipos):
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlTipoMesEq" runat="server" Width="69px">
                            <asp:ListItem Value="-1" Text=""></asp:ListItem>
                            <asp:ListItem Value=">" Text="Mayor"></asp:ListItem>
                            <asp:ListItem Value="<" Text="Menor"></asp:ListItem>
                            <asp:ListItem Value="=" Text="Igual"></asp:ListItem>
                        </asp:DropDownList>
                        <asp:TextBox ID="txtNroMesesEq" runat="server" Width="30px" Text="" MaxLength="3"></asp:TextBox>
                        (Meses)
                    </td>

                    <td></td>
                </tr>
                <tr>
                    <td style="text-align: right">Situación:
                    </td>
                    <td class="style2">

                        <asp:DropDownList ID="ddlTipoLinea" runat="server" Width="234px">
                        </asp:DropDownList>
                    </td>
                    <td style="text-align: right;">Plan:
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlPlan" runat="server" Width="234px">
                        </asp:DropDownList>
                    </td>

                    <td>
                        <div id="btnMostrar" class="btnNormal" runat="server" title="Mostrar Reporte"  style="width: 120px">
                            <asp:Image ID="imgBuscar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/FiltroAgregar_16x16.png" />
                            <a>Mostrar Reporte</a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: right">
                        <div style="float: left; margin-left: 35px; width: 20px;">
                            <uc1:ToolTipGenerico2 ID="ttginfoHistorico" runat="server" />
                        </div>
                        Otros: 
                    </td>
                    <td class="style2">

                        <asp:DropDownList ID="ddlComboDescripcion" runat="server" Width="234px">
                        </asp:DropDownList>

                    </td>
                    <td style="text-align: right">Valor:
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlComboDinamico" runat="server" Width="234px">
                        </asp:DropDownList>
                    </td>
                    <td>
                        <div id="btnLimpia" class="btnNormal" runat="server" title="Limpiar" style="width: 120px">
                            <asp:Image ID="imgLimpiar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Borrar.png" />
                            <a>Limpiar</a>
                        </div>
                    </td>
                </tr>

            </table>
        </div>
        <div class="dvPanel" id="Cuerpo" runat="server" style="overflow: auto; text-align: center; margin-top: 5px">
            <iframe id="ifReporteDevExpress" frameborder="0" style="padding: 0px; margin: 0px; width: 1024px;"></iframe>
        </div>
        <div id="dvArea" style="display: none; padding: 0px; margin: 0px;">
            <iframe id="ifArea" width="730" height="470" frameborder="0" style="padding: 0px; margin: 0px;"></iframe>
        </div>
    </form>
</body>
</html>
