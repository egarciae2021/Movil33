<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Configuracion_HerramientasSistema_VisorEventos_VisorAuditoria" Codebehind="VisorAuditoria.aspx.vb" %>

<%@ Register src="../../Common/Controles/ExportarExcelGenerico.ascx" tagname="ExportarExcelGenerico" tagprefix="uc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link  href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
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
    <script src="../../Common/Scripts/aLiteral.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="VisorAuditoria.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div>
          <div class="dvPanel" style="overflow: auto;">
            <table border="0" align="center">
                <tr>
                    <td>
                        <span style="font-size: 12px;"><b>Visor de Auditoría</b></span>
                    </td>
                </tr>
                <tr>
                    <td>
                        
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
                                        <asp:ListItem Value="AUDI_dtFECREG" Text="Fecha/Hora"></asp:ListItem>
                                        <%--<asp:ListItem Value="AUDI_vcNOMPRO" Text="Producto"></asp:ListItem>--%>
                                        <asp:ListItem Value="AUDI_vcNOMMOD" Text="Módulo"></asp:ListItem>
                                        <asp:ListItem Value="AUDI_vcNOMOPC" Selected="True" Text="Opción"></asp:ListItem>
                                        <asp:ListItem Value="AUDI_vcNOMUSUA" Text="Usuario"></asp:ListItem>
                                        <%--<asp:ListItem Value="AUDI_vcNOMPC" Text="Equipo"></asp:ListItem>--%>
                                        <asp:ListItem Value="AUDI_vcTIPOINST" Text="Acción"></asp:ListItem>
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
                                                    <img src="../../Common/Images/Mantenimiento/Busqueda.png" alt="" width="16px" />
                                                </td>
                                                <td>
                                                    &nbsp;Buscar
                                                </td>
                                            </tr>
                                        </table>
                                    </div>

                                </td>

                                <td>
                                    
                                    <uc1:ExportarExcelGenerico ID="eegAuditoria" runat="server" />

                                </td>
                            </tr>
                        </table>   
                    </td>
                </tr>
                <tr>
                    <td align="right">
                        <span style="font-style:italic;">(Doble clic para visualizar la Descripción)</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table id="tbGrillaCorreos"></table>
                        <div id="pagerGrillaCorreos"></div>
                    </td>
                </tr>
            </table>
          </div>
            <div id="divDescripcion" style="display:none;">
                <table border="0" align="center">
                    <tr>
                        <td align="right">
                            <b>Opción:</b>
                        </td>
                        <td>
                            <span id="lblOpcion" ></span>
                        </td>
                    </tr>
                    <tr>
                        <td align="right" colspan="2">
                            <hr />
                        </td>
                    </tr>
                    <tr>
                        <td align="right">
                            <b>Datos anteriores:</b>
                        </td>
                        <td>
                            <span id="lblAnterior" style="width: 250px;overflow:auto;"></span>
                        </td>
                    </tr>
                    <tr>
                        <td align="right" colspan="2">
                            <hr />
                        </td>
                    </tr>
                    <tr>
                        <td align="right">
                            <b>Datos nuevos:</b>
                        </td>
                        <td>
                            <span id="lblNuevo" style="width: 250px;overflow:auto;"></span>
                        </td>
                    </tr>
                    <tr height="15px"><td></td></tr>
                </table>
            </div>
        </div>
    </form>
</body>
</html>
