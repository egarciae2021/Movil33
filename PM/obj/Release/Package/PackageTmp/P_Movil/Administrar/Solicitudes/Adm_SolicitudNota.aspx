<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Solicitudes_Adm_SolicitudNota" CodeBehind="Adm_SolicitudNota.aspx.vb" %>

<%@ Register Src="../../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico" TagPrefix="ttgInfo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqueryui/jquery.ui.core.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqueryui/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqueryui/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqueryui/jquery.ui.button.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/ajaxupload.js" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css" href="Adm_Solicitudes.css" />
    <style type="text/css">
        #UploadedFile div {
            display: inline-block;
        }

        .NotaOperador {
            width: 590px;
            padding: 10px;
            background: #F3F3F3;
            margin-bottom: 5px;
        }

            .NotaOperador > div:first-child {
                width: 604px;
                font-weight: bolder;
            }

                .NotaOperador > div:first-child > img:first-child {
                    float: left;
                    margin-right: 10px;
                    width: 20px;
                }

                .NotaOperador > div:first-child > div:first-child {
                    float: left;
                    width: 400px;
                }

                .NotaOperador > div:first-child > img:last-child {
                    float: right;
                    margin-right: 5px;
                    width: 20px;
                }

            .NotaOperador > div:nth-child(2) {
                clear: both;
            }

            .NotaOperador > div:nth-child(3) {
                width: 604px;
                margin-top: 8px;
            }


        .ClasstxtDetalle {
            resize: none;
            font-family: 'Trebuchet MS','Helvetica','Arial','Verdana','sans-serif';
        }
    </style>
</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Adm_SolicitudNota.js")%>" type="text/javascript"></script>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Adm_SolicitudNotaSignalR.js")%>" type="text/javascript"></script>
    <form id="form1" runat="server">

        <%--        Edgar Garcia 02122022--%> 
        <asp:HiddenField ID="hdinCod" runat="server" />
        <asp:HiddenField ID="hdfTieneNotaPorLeer" runat="server" />
        <asp:HiddenField ID="hdfIdSolicitud" runat="server" />
        <asp:HiddenField ID="hdfUsuario" runat="server" />
        <asp:HiddenField ID="hdfBiEscalado" runat="server" />


        <div class="dvPanel" style="margin-bottom: 10px;">
            <%--<div id="PnlDetalles" class="dvPanel" style="height:300px;"></div>--%>
            <div id="dvOrigen" style="width: 100px; border: 0px dotted gray; float: left; margin-bottom: 3px;">
                <asp:DropDownList ID="ddlOrigen" runat="server">
                    <%--<asp:ListItem Text="Usuario" Value="0" />
                    <asp:ListItem Text="Operador" Value="1" />--%>
                </asp:DropDownList>
            </div>

            <div style="float: right; display: flex;">
                <label style="margin-top: 2px; margin-right: 4px;">Mostrar notas del sistema</label>
                <label class="switch">
                    <input type="checkbox" id="chkMostrarNotasSistema" checked />
                    <span class="slider round"></span>
                </label>
            </div>

            <div style="clear: both;"></div>
            <div id="PnlDetallesOperador" style="height: 343px; width: 640px; display: none; overflow-y: scroll;">
                <div class="NotaOperador">
                    <div>
                        <img src="images/nota16x16.png" />
                        <div>Nota creada el 14/10/2015 a las 12:10 PM por sistema</div>

                        <div style="float: right; margin-right: 10px;">sistema</div>
                        <img src="../../../Common/Images/Mantenimiento/BajarArchivo.png">
                    </div>
                    <div></div>
                    <div>
                        Estado Proceso: Solicitud En Proceso. El especialista asignado es administrador (administrador)
                    </div>
                </div>
            </div>
            <div id="PnlDetalles" style="height: 303px; width: 640px; display: none;">
                <asp:DataList ID="dlNotas" runat="server" DataSourceID="odsNotas" RepeatColumns="1">
                    <ItemTemplate>
                        <table width="610px" cellpadding="3" style="background-color: #F3F3F3;" essistema ='<%# Eval("EsSistema") %>'>
                            <tr style="border-style: solid solid none solid; border-width: 1px 1px thin 1px; border-color: #C0C0C0;">
                                <td style="width: 20px;">&nbsp;<asp:Image ID="imgNota" runat="server" ImageUrl="images/nota16x16.png" />
                                </td>
                                <td>&nbsp;<asp:Label ID="lblRegistradoPor" runat="server" Text='<%# Eval("Titulo") %>' Font-Bold="True"></asp:Label>
                                </td>
                                <td align="right" valign="middle">
                                    <span id="imgAdjunto"><%# Eval("Imagen") %></span>&nbsp;
                                <span id="lblAdjunto" style="font-weight: bold; text-decoration: underline; font-family: 'Trebuchet MS', 'Helvetica', 'Arial', 'Verdana', 'sans-serif';" class="imgBtn"
                                    title="<%# Eval("TamanioKB") %>" onclick="javascript:fnDescargarArchivo('<%# Eval("NomArc") %>',2,'<%# Eval("IdSolicitudDetalle") %>')">
                                    <%# Eval("NomArc") %></span>&nbsp;
                                <%--<code>&lt;a href="example.html" rel="nofollow foe"&gt;Some text&lt;/a&gt;</code>--%>
                                </td>
                                <td style="width: 20px; text-align: right;">
                                    <span id="imgEnvCor"><%# Eval("imgEnviaCorreo")%></span>&nbsp;
                                </td>
                            </tr>
                            <tr style="border-style: none solid solid solid; border-width: thin 1px 1px 1px; border-color: #C0C0C0;">
                                <td colspan="4" style="padding-left: 8px; margin-right: 20px; word-wrap: break-word;">
                                    <code>
                                        <asp:Label ID="lblDetalle" runat="server" Text='<%# Eval("Detalle") %>' Font-Names="'Trebuchet MS', 'Helvetica', 'Arial', 'Verdana', 'sans-serif';" Width="598px"></asp:Label></code>
                                </td>
                            </tr>
                        </table>
                    </ItemTemplate>
                </asp:DataList>
            </div>
            <asp:ObjectDataSource ID="odsNotas" runat="server" SelectMethod="MostrarNotas"
                TypeName="VisualSoft.Suite80.BL.BL_MOV_SolicitudDetalle">
                <SelectParameters>
                    <asp:Parameter DefaultValue="0" Name="inCodSol" Type="Int32" />
                    <asp:Parameter DefaultValue="0" Name="vcFecCor" Type="String" />
                    <asp:Parameter DefaultValue="0" Name="vcHorCor" Type="String" />
                    <asp:Parameter DefaultValue="0" Name="inCliente" Type="Int32" />
                </SelectParameters>
            </asp:ObjectDataSource>
            <div id="PnlIngresoDetalle" style="vertical-align: middle; margin-top: 5px;">
                <table>
                    <tr>
                        <td>
                            <asp:TextBox ID="txtDetalle" runat="server" Width="530" TextMode="MultiLine" Height="35px" CssClass="ClasstxtDetalle" MaxLength="8000"></asp:TextBox>
                        </td>
                        <td align="left">
                            <div id="btnEnviar" title="Enviar" style="width: 80px;">Enviar</div>
                            <asp:CheckBox ID="chkEnviaCorreo" runat="server" Text="Correo" Enabled="false" ToolTip="El mensaje sera enviado por correo electrónico a los involucrados en la solicitud." />
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" id="tdUpload">
                            <div class="UploadDiv" style="display: inline-block; float: left;">
                                <div id="UploadStatus"></div>
                                <div id="UploadButton" align="center" class="imgBtn" style="text-align: left;">
                                    <table>
                                        <tr>
                                            <td style="text-align: left;">
                                                <img alt="" src="../../../Common/Images/Mantenimiento/SubirArchivo.png" width="16px" height="16px" />
                                            </td>
                                            <td style="vertical-align: bottom; text-decoration: underline; cursor: pointer;">Adjuntar Archivo</td>
                                        </tr>
                                    </table>
                                </div>
                                <div id="UploadedFile"></div>
                            </div>
                            <div style="float: left; vertical-align: bottom; margin-top: 3px;" id="dvExtensiones">
                                <table>
                                    <tr>
                                        <td style="text-align: left; font-style: italic;">(Extensiones Permitidas: txt, doc, docx, xls, xlsx, pdf, jpg, png)
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div id="dvInfoAdjunto" style="float: left; display: none; vertical-align: bottom; margin-top: 3px;">
                                <ttgInfo:ToolTipGenerico ID="ttgInfoAdjunto" runat="server" />
                            </div>

                        </td>
                    </tr>
                </table>
                <div id="data-tooltip-triangle" class="data-tooltip-triangle"></div>
                <div id="miToolTip" class="data-tooltip"></div>
            </div>
            <iframe id="ifDownload" frameborder="0" style="padding: 0px; margin: 0px; display: none;"></iframe>

        </div>
        <%--    <div id="dvAdjuntar" style="display:none;">
        <iframe id="ifAdjuntar" frameborder="0" style="padding: 0px; margin: 0px; height: 100px; width:370px;"></iframe>
    </div>--%>
    </form>
</body>
</html>
