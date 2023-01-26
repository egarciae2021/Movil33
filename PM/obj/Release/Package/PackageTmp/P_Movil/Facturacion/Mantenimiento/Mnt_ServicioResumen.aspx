<%@ Page Language="VB" AutoEventWireup="false" Inherits="Mnt_ServicioResumen" CodeBehind="Mnt_ServicioResumen.aspx.vb"  %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>
<%@ Register TagPrefix="ttgInfo" TagName="ToolTipGenerico" Src="~/Common/Controles/ToolTipGenerico.ascx" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script type="text/javascript" src="../../../Common/Scripts/jquery-1.7.2.js"></script>
    <script src="../../Administrar/../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.button.js"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqueryui/jquery.ui.autocomplete.js" type="text/javascript"></script>
    
    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <link href="../../../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/KendoUI/cultures/kendo.culture.es-PE.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>   
    
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    
    <script src="Mnt_ServicioResumen.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField runat="server" ID="hdfCodGruCon" />
        <asp:HiddenField runat="server" ID="hdfCodConcpRes" />
        <asp:HiddenField runat="server" ID="hdfCodTipoConc"/>
        <div id="dvCargando" class="dvCargando"></div>
        <div class="dvPanel" style="overflow: auto;">
            <table style="font-size: 11px">
                <tr>
                    <td class="TituloMant">
                        Código
                    </td>
                    <td colspan="2">
                        <asp:TextBox ID="txtCodigo" runat="server" Width="150px" MaxLength="20"></asp:TextBox>
                    </td>
                </tr>
                
                <tr>
                    <td>
                        Nombre del Concepto
                    </td>
                    <td colspan="2">
                        <asp:TextBox ID="txtConceptoResumen" runat="server" Width="300px" MaxLength="500" onChange="validarEspaciosEnBlancoAlInicio(this.id)"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        Abreviatura
                    </td>
                    <td colspan="2">
                        <asp:TextBox ID="txtNomAbrev" runat="server" Width="200px" MaxLength="500" onChange="validarEspaciosEnBlancoAlInicio(this.id)"></asp:TextBox>    
                    </td>
                </tr>
                <tr>
                    <td>
                        Fecha inicio
                    </td>
                    <td colspan="2">
                        <asp:TextBox ID="txtFechaInicioConceptoResumen" runat="server" Width="80px" AutoPostBack="false" CssClass="txtFecha" MaxLength="100"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        Grupo Concepto
                    </td>
                    <td colspan="2">
                        <asp:TextBox ID="txtGrupoConcepto" runat="server" Width="150px" MaxLength="35" onChange="validarEspaciosEnBlancoAlInicio(this.id)"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        Tipo Concepto
                    </td>
                    <td colspan="2">
                        <asp:TextBox Visible="False" ID="txtTipoConcepto" runat="server" Width="150px" MaxLength="35" onChange="validarEspaciosEnBlancoAlInicio(this.id)"></asp:TextBox>
                        <asp:DropDownList runat="server" Width="150px" ID="ddlTipCon" />
                    </td>
                    
                </tr>
                <tr id="trBtMinUti" runat="server">
                    <td>
                        Minutos Utilizados
                    </td>
                    <td>
                        <asp:CheckBox ID="chkMinUti" runat="server" />
                    </td>
                    <td>
                        <ttgInfo:ToolTipGenerico ID="ttInfoMinUti" runat="server" />
                    </td>
                </tr>
                <tr>
                    <td>
                        Orden
                    </td>
                    <td style="vertical-align:middle; width: 5%">
                            <asp:TextBox ID="txtOrden" runat="server" Width="20px" MaxLength="3" onChange="validarEspaciosEnBlancoAlInicio(this.id)"></asp:TextBox>
                    </td>
                    <td style="vertical-align:middle; width: 60%">
                        <ttgInfo:ToolTipGenerico ID="ttgInfoOrden" runat="server" />
                    </td>
                </tr>
                <tr>
                    <td>
                        Concepto en sumatoria
                    </td>
                    <td>
                        <asp:CheckBox ID="chkSumatoria" runat="server" />
                    </td>
                    <td>
                        <ttgInfo:ToolTipGenerico ID="ttgInfoSumatoria" runat="server" />
                    </td>
                </tr>
                <tr id="trEstado" runat="server">
                    <td class="tdEtiqueta">
                        Activo
                    </td>
                    <td colspan="2">
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
