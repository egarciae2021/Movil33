<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Liq_Licencia.aspx.cs" Inherits="PcSistelMovil2Web.Liquidaciones.Liq_Licencia" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link href="../Styles/Sitio.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/JqueryThemeRoller/redmond/jquery-ui-1.8.16.custom.css"
        rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/json2.js" type="text/javascript"></script>
    <script src="../Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="../Common/Styles/Principal2.css" rel="stylesheet" type="text/css" />
    <script src="Liq_Licencia.js" type="text/javascript"></script>


</head>
<body>
    <form id="form1" runat="server">

    <asp:HiddenField ID="hdfActivo" runat="server" />
    <asp:HiddenField ID="hdfDesactivo" runat="server" />
    <asp:HiddenField ID="hdfCampBool" runat="server" />
    <asp:HiddenField ID="hdfElim" runat="server" />
    <asp:HiddenField ID="hdfFalso" runat="server" />
    <asp:HiddenField ID="hdfValorPorDefecto" runat="server" />
    <asp:HiddenField ID="hdfVerdadero" runat="server" />

    <asp:HiddenField ID="hdfIdLicencia" runat="server" />
    <div id="dvMsgAlertaExterna" style="display: none;">
        <span class="ui-icon ui-icon-alert" style="float: left;"></span>
        <div id="dvContenidoAlertaExterna">
        </div>
    </div>
    <div>
        <br />
      
        <div id="dvdetalle" class="dvPanel" style="margin-left: 5px; margin-right: 5px; ">
            <div id="Div1">
                <cc1:AccordionJQ ID="AccordionJQ2" runat="server" CssClass="accordion">
                    <cc1:ContenedorAccodion Texto="Informacion de Licencia">
                        <table id="tbTipo" runat="server">
                            <tr>
                                <td class="TituloMant">
                                    <asp:Label ID="Label2" runat="server" Text="Tipo Licencia"></asp:Label>
                                </td>
                                <td class="ValorMant">
                                    <asp:TextBox ID="txtLicencia" runat="server" Width="300px" MaxLength="50"></asp:TextBox>
                                </td>
                            </tr>     
                        </table>
                    </cc1:ContenedorAccodion>                      
                </cc1:AccordionJQ>
            </div>                                   
        </div>
        
        <div id="dvCargando" class="dvCargando"></div>        
        <br />


        <div id="dvdetalle02" class="dvPanel" style="margin-left: 5px; margin-right: 5px; ">
            <div id="dvContAcordeon">
                <cc1:AccordionJQ ID="AccordionJQ1" runat="server" CssClass="accordion">
                    <cc1:ContenedorAccodion Texto="Modulo de Productos">
                        <table id="btTreeGridAccesos">
                            <tr><td/></tr>
                        </table>
                    </cc1:ContenedorAccodion>                      
                </cc1:AccordionJQ>
            </div>
        </div>

        <asp:HiddenField ID="hdfvcTab" runat="server"  />
        <br />

        <div id="dvdetalle03" class="dvPanel" style="margin-left: 5px; margin-right: 5px;" >
            <div id="Div2">
                <cc1:AccordionJQ ID="AccordionJQ3" runat="server" CssClass="accordion">
                    <cc1:ContenedorAccodion Texto="Concepto de Cobros">
                        <table id="grid" runat="server">
                        </table>
                        <div id="pager">
                        </div>
                    </cc1:ContenedorAccodion>                      
                </cc1:AccordionJQ>
            </div> 
        </div>


        <br />

        <div id="dvAcciones" style="margin-left: 5px;">
            <div id="btnGuardar" runat="server" class="btnNormal" style="width: 100px;" runat="server">
                <asp:Image ID="Image4" runat="server" Style="width: 14px; vertical-align: bottom;"
                    ImageUrl="../Common/Images/save.ico" />
                Grabar
            </div>
            <div id="btnCerrar" runat="server" class="btnNormal">
                <asp:Image ID="Image6" runat="server" Style="width: 14px; vertical-align: bottom;"
                    ImageUrl="../Common/Images/Mantenimiento/Salir.gif" />
                Cerrar
            </div>
        </div>
    </div>
    </form>
</body>
</html>
