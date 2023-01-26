<%@ Control Language="vb" AutoEventWireup="false" CodeBehind="ExportarExcelGenerico.ascx.vb" Inherits="WebSiteCliente.ExportarExcelGenerico" %>


<input id="hfNombreEntidad" type="hidden" class="hfNombreEntidad" runat="server" />

<table id="tbExportarExcelPrincipal" runat="server" border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td>
            <div title="Exportar" id ="btnExportarExcel" class="btnButton" runat="server" style="width:33px;cursor: hand; cursor: pointer;" >
                <asp:Image alt="Exportar" style="margin-left:-3px;" AlternateText="Exportar" ID="imgBusqueda" Height="15px" runat="server" ImageUrl="~/Common/Images/Excel16.png" />                
            </div>
        </td>
    </tr>
</table>

<div id="dvExportarExcelGenerico" class="exportarexcel" runat="server" style="display: none;">
    <table>
        <tr>
            <td colspan="2">
                <span style="font-size:11px;">Seleccione la versión de Excel a exportar</span>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <table border="0">
                    <tr>
                        <td style="width:220px">
                            <asp:RadioButton ID="optExcelXls" CssClass="" name="optExcelXls" GroupName="optExportarExcel" Text="Excel 2003 o anterior" runat="server" />
                        </td>
                    </tr>
                    <tr>
                        <td style="width:220px">
                            <asp:RadioButton ID="optExcelXlsx" CssClass="" name="optExcelXlsx" GroupName="optExportarExcel" Checked="true" Text="Excel 2007 o posterior" runat="server" />
                        </td>
                    </tr>
                </table>

            </td>
        </tr>
        <tr>
            <td colspan="2">
                <asp:CheckBox ID="chkExcelPredeterminado" Text="Considerar valor como predeterminado en las próximas exportaciones<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Para revertir el cambio, debe ir a 'Editar Perfil')<br>" runat="server" />
            </td>
        </tr>
        <tr style="height:10px;"><td colspan="2"></td></tr>
        <tr>
            <td colspan="2" align="right">    
                <input id="btnAceptar" class="btnButton" type="button" runat="server" value="Aceptar" />
                &nbsp;
                <input id="btnCancelar" class="btnButton" type="button" runat="server" value="Cancelar" />
            </td>
        </tr>
    </table>
</div>