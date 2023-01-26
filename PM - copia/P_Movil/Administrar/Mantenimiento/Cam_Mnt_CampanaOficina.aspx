<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Mantenimiento_Cam_Mnt_CampanaOficina" Codebehind="Cam_Mnt_CampanaOficina.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../../../Common/Scripts/jquery-1.7.2.js"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="Cam_Mnt_CampanaOficina.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfCodOficina" runat="server" />
      <asp:HiddenField ID="hdfPais" runat="server" />
      <asp:HiddenField ID="hdfCiudad" runat="server" />
      <asp:HiddenField ID="hdfProvincia" runat="server" />
      <asp:HiddenField ID="hdfDistrito" runat="server" />
        <div id="dvCargando" class="dvCargando"></div>
        <div class="dvPanel" style="overflow: auto;">
            <table>
                <tr>
                    <td class="TituloMant">
                        Código
                    </td>
                    <td>
                        <asp:TextBox ID="txtCodigo" runat="server" Width="150px" MaxLength="20"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        País
                    </td>
                    <td>
                        <asp:TextBox ID="txtPais" runat="server" Width="300px" MaxLength="35" onChange="validarEspaciosEnBlancoAlInicio(this.id)"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="TituloMant">
                        Ciudad
                    </td>
                    <td class="ValorMant">
                        <asp:TextBox ID="txtCiudad" runat="server" Width="300px" MaxLength="35" onChange="validarEspaciosEnBlancoAlInicio(this.id)"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="TituloMant">
                        Provincia
                    </td>
                    <td class="ValorMant">
                        <asp:TextBox ID="txtProvincia" runat="server" Width="300px" MaxLength="35" onChange="validarEspaciosEnBlancoAlInicio(this.id)"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="TituloMant">
                        Distrito
                    </td>
                    <td class="ValorMant">
                        <asp:TextBox ID="txtDistrito" runat="server" Width="300px" MaxLength="35" onChange="validarEspaciosEnBlancoAlInicio(this.id)"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="TituloMant">
                        Descripción
                    </td>
                    <td class="ValorMant">
                        <asp:TextBox ID="txtDescripcion" runat="server" Width="300px" MaxLength="100"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="TituloMant" style="width:200px;">
                        Dirección
                    </td>
                    <td class="ValorMant">
                        <asp:TextBox ID="txtDireccion" runat="server" Width="300px" MaxLength="500"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="TituloMant" style="width:200px;">
                        Referencia
                    </td>
                    <td class="ValorMant">
                        <asp:TextBox ID="txtReferencia" runat="server" Width="300px" MaxLength="500"></asp:TextBox>
                    </td>
                </tr>
                <tr id="trEstado" runat="server">
                    <td class="tdEtiqueta">
                        Activo
                    </td>
                    <td>
                        <asp:CheckBox ID="chkEstado" runat="server" />
                    </td>
                </tr>
            </table>
        </div>
        </br>
        <div style="margin-top:2px;">
            <div style="margin-top:2px;">
                <div id="btnGuardar" class="btnNormal">
                    <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                    <a>Guardar</a>
                </div>
                <div id="btnCerrar" class="btnNormal">
                    <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                    <a>Cerrar</a>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
