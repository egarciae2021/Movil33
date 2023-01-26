<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="VisorVersionProducto.aspx.vb" Inherits=".VisorVersionProducto" %>

<%@ Register src="../../../Common/Controles/ExportarExcelGenerico.ascx" tagname="ExportarExcelGenerico" tagprefix="uc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link  href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.base.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/aLiteral.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("VisorVersionProducto.js")%>" type="text/javascript"></script>
    <form id="form1" runat="server">
        <div>
          <div  style="overflow: auto;">
            <table border="0" align="center">
                <tr>
                    <td>
                        <span style="font-size: 12px;"><b>Control de Versión del Producto</b></span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <br />
                    </td>
                </tr>
                <tr>
                    <td>
                        <table id="tbGrillaVersionProducto"></table>
                        <div id="pagerGrillaVersionProducto"></div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <br />
                    </td>
                </tr>
                <tr>
                    <td>
                        <table>
                            <tr>
                                <td>
                                    Buscar por:
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlCampo" runat="server" Width="120px">
                                        <%--<asp:ListItem Value="dtFecHor" Text="Fecha Hora"></asp:ListItem>--%>
                                        <asp:ListItem Value="Version" Text="Versión"></asp:ListItem>
                                        <asp:ListItem Value="Release" Text="Release"></asp:ListItem>
                                        <asp:ListItem Value="FechaActualizacion" Text="Fecha Actualización"></asp:ListItem>
                                        <asp:ListItem Value="ArchivoActualizado" Selected="True" Text="Archivo Actualizado"></asp:ListItem>
                                    </asp:DropDownList>
                                </td>
                                <td style="width:20px;"></td>
                                <td align="right">
                                    Valor:
                                </td>
                                <td>
                                    <input type="text"  id="txtValor" maxlength="50" style="width: 350px" />
                                </td>
                                <td>
                                    
                                    <div id="btnBuscar" class="button" style="margin: auto;">
                                        <table border="0" cellpadding ="0" cellspacing ="0">
                                            <tr>
                                                <td>    
                                                    <img src="../../../Common/Images/Mantenimiento/Busqueda.png" alt="" width="16px" />
                                                </td>
                                                <td>
                                                    Buscar
                                                </td>
                                            </tr>
                                        </table>
                                    </div>

                                </td>

                                <td>
                                    <uc1:ExportarExcelGenerico ID="eegVersionProducto" runat="server" />
                                </td>

                            </tr>
                        </table>   
                    </td>
                </tr>
                <tr>
                    <td align="right">
                        <span style="font-style:italic;"><%--(Doble clic para visualizar la Descripción)--%></span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table id="tbGrillaVersionProductoHistorico"></table>
                        <div id="pagerGrillaVersionProductoHistorico"></div>
                    </td>
                </tr>
            </table>
          </div>
            <div id="divDescripcion" style="display:none;">
                <table>
                    <tr>
                        <td colspan="2" align="left" valign="top">
                            <b>Mensaje:</b>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <span id="lblMensaje" ></span>
                        </td>
                    </tr>
                    <tr height="5px"><td></td></tr>
                    <tr id="trNoEnviado" style="display: none; color: #9E0B0B">
                        <td align="right" valign="top">
                            <b>Detalle:</b>
                        </td>
                        <td>
                            <span id="lblDetalle" style="width: 250px;overflow:auto;" ></span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </form>
</body>
</html>

