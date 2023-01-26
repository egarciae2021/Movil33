<%@ Page Language="VB" AutoEventWireup="false" Inherits="Mnt_GrupoServicio" Codebehind="Mnt_GrupoServicio.aspx.vb" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>
<%@ Register TagPrefix="ttgInfo" TagName="ToolTipGenerico" Src="~/Common/Controles/ToolTipGenerico.ascx" %>
<%--<%@ Register src="../../../Common/Controles/BusquedaPrincipal.ascx" tagname="BusquedaPrincipal" tagprefix="uc1" %>--%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
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
    
    <script src="../../../Common/Scripts/date.js" type="text/javascript"></script>
    <%--<script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>--%>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <%--<script src="../../../Common/Scripts/calender/fullcalendar.js" type="text/javascript"></script>--%>

</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfCodGrupCon" runat="server" Value=""/>
        <asp:Hiddenfield ID="hdfTipoGrupo" runat="server" />
        <div id="dvCargando" class="dvCargando"></div>
        <div class="dvPanel" style="overflow: auto;">
            <table width="40%" style="font-size: 11px">
                <%--<tr id="trCodigo" runat="server">
                    <td class="TituloMant">
                        Código
                    </td>
                    <td class="ValorMant">
                        <asp:TextBox ID="txtCodigo" runat="server" MaxLength="15" Width="70px"></asp:TextBox>
                    </td>
                </tr>--%>
                <tr>
                    <td class="TituloMant">
                        Nombre
                    </td>
                    <td class="ValorMant" colspan="2">
                        <asp:TextBox ID="txtNombre" runat="server" MaxLength="35" Width="200px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="TituloMant">
                        Abreviatura
                    </td>
                    <td class="ValorMant" colspan="2">
                        <asp:TextBox ID="txtAbrNom" runat="server" MaxLength="10" Width="100px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        Fecha Inicio
                    </td>
                    <td colspan="2">
                        <asp:TextBox ID="txtFechaInicio" runat="server" Width="80px" AutoPostBack="false" CssClass="txtFecha" MaxLength="100"></asp:TextBox>
                    </td>

                </tr>
                <tr>
                    <td>
                        Posición
                    </td>
                    <td style="width: 40px;">
                        <asp:TextBox runat="server" ID="txtPos" Width="25px" CssClass="txt_interno" MaxLength="2"></asp:TextBox>

                    </td>
                    <td>
                        <ttgInfo:ToolTipGenerico ID="ttInfoPos" runat="server" />
                    </td>
        
                </tr>
                
                <tr id="trSumatoriaGrupo" runat="server">
                    <td class="TituloMant">Sumatoria Grupo</td>
                    <td class="ValorMant">
                        <asp:CheckBox id="chkSumatoriaGrupo" runat="server" />
                    </td>
                    <td>
                        <ttgInfo:ToolTipGenerico ID="ttInfoSumGru" runat="server" />
                    </td>
       
                </tr>

                <tr id="trMostrarDash" runat="server">
                    <td class="TituloMant">Mostrar en el Dashboard</td>
                    <td class="ValorMant">
                        <asp:CheckBox id="chkMostrarDashboard" runat="server" />
                    </td>
                    <td>
                        <ttgInfo:ToolTipGenerico ID="ttInfoMos" runat="server" />
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
        <br />
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
    </form>
</body>
</html>
<script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Mnt_GrupoServicio.js")%>" type="text/javascript"></script>
