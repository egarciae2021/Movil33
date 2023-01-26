<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="ALM_Almacen_Reporte.aspx.vb" Inherits=".ALM_Almacen_Reporte" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.datepicker.js" type="text/javascript"></script>
    <script src="ALM_Almacen_Reporte.js" type="text/javascript"></script>

    <style type="text/css">
        .dvFiltro
        {
            float:left;
            margin-top:10px;
            margin-right:15px;
            height:40px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField runat="server" ID="hdfCampanaActiva" />
    <asp:HiddenField runat="server" ID="hdfvcTipRep" />
    <asp:HiddenField runat="server" ID="hdfvcTab" />
    <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />

    <div id="dvContenido"class="dvPanel">
        <cc1:AccordionJQ ID="accReporteAlmacen" runat="server" CssClass="accordion">
            <cc1:ContenedorAccodion Texto="Filtros" style="padding-top:0px; margin-top:0px;">
                <div class="dvFiltro">
                    <label>Operador</label><br />
                    <asp:DropDownList ID="ddlOperador" runat="server" Width="200"></asp:DropDownList>
                </div>
                <div class="dvFiltro">
                    <label>Tipo Linea</label><br />
                    <asp:DropDownList ID="ddlLineaTipo" runat="server" Width="120">
                    </asp:DropDownList>                    
                </div>
                <div id="dvCampanas" class="dvFiltro" style="display:none;">
                    <label>Campana</label><br />
                    <asp:DropDownList ID="ddlCampana" runat="server" Width="200">
                    </asp:DropDownList>
                </div>
                <div class="dvFiltro">
                    <label>Periodo</label>
                    <br />
                    <asp:TextBox ID="txtFechaInicio" runat="server" Width="70" MaxLength="10"></asp:TextBox>
                    <asp:Image ID="imgBorrarFecIni" runat="server" ImageUrl="../../../Common/Images/Mantenimiento/Borrar.png" class="imgBtn" ToolTip="Limpiar fecha"/>
                    <label>&nbsp;&nbsp;-&nbsp;&nbsp;</label>
                    <asp:TextBox ID="txtFechaFin" runat="server" Width="70" MaxLength="10"></asp:TextBox>
                    <asp:Image ID="imgBorrarFecFin" runat="server" ImageUrl="../../../Common/Images/Mantenimiento/Borrar.png" class="imgBtn" ToolTip="Limpiar fecha"/>
                </div>
                <div class="dvFiltro">
                    <div id="btnFiltrar" class="btnNormal" style="margin-top:8px;">
                        <img id="imgFiltrar" src="../../../Common/Images/lup.png" alt="Filtrar" width="16px" height="16px"/>
                        Filtrar
                    </div>
                </div>
            </cc1:ContenedorAccodion>
            <cc1:ContenedorAccodion Texto="Reporte" style="padding-top:0px; margin-top:0px;">
                <iframe id="ifReporteAlmacen" frameborder="0" style="margin:0px; padding:0px; " width="100%" height="470px">
                </iframe>
            </cc1:ContenedorAccodion>
        </cc1:AccordionJQ>
    </div>
    
    </form>
</body>
</html>
