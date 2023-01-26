<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Adm_FacturaResumen" Codebehind="Adm_FacturaResumen.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.base.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/anytime.js" type="text/javascript"></script>        
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Adm_FacturaResumen.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">   
        <span style="color: #800000">
            Sólo se considera aquellos periodos cuya información "Resumida" ha sido proveída por el operador y procesados en el sistema.
        </span> 
        <br /><br />
        <div class="dvPanel">
            <table>
                <tr>
                    <td>
                        <asp:TextBox ID="txtPeriodo" runat="server" CssClass="DATETIME"></asp:TextBox>
                    </td>
                    <td>
                        <div id="btnConsultar" class="btnNormal">
                            <asp:Image ID="imgConsultar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                            <a>Consultar</a>
                        </div>                    
                    </td>
                </tr>
            </table>            
        </div> 
        <table>
            <tr>
                <td>
                    <table id="tblResumen"></table>                
                </td>
            </tr>
            <tr>
                <td>
                    <div id="btnAgregar" class="btnNormal">
                        <asp:Image ID="imgAgregar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                        <a>Agregar seleccionados</a>
                    </div>
                    <div id="btnCerrar" class="btnNormal">
                        <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                        <a>Cerrar</a>
                    </div>                
                </td>
            </tr>
        </table>
    </form>
</body>
</html>
