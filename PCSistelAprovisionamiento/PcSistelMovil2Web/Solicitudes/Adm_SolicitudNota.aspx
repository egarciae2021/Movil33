<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Adm_SolicitudNota.aspx.cs" Inherits="PcSistelMovil2Web.Solicitudes.Adm_SolicitudNota" %>

<%@ Register Src="../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico"  TagPrefix="ttgInfo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

    <link href="../Styles/Sitio.css" rel="stylesheet" type="text/css" />
       <link href="../Common/Styles/JqueryThemeRoller/redmond/jquery-ui-1.8.16.custom.css"
        rel="stylesheet" type="text/css" />
        <link href="../Common/Styles/Principal2.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../Scripts/jqueryui/jquery.ui.core.js" type="text/javascript"></script>
    <script src="../Scripts/jqueryui/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="../Scripts/jqueryui/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="../Scripts/jqueryui/jquery.ui.button.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../Common/Scripts/ajaxupload.js" type="text/javascript"></script>
    <script src="Adm_SolicitudNota.js" type="text/javascript"></script>
    <link href="Adm_Solicitudes.css" rel="stylesheet" type="text/css" />  


<%--
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
--%>







    <style type="text/css">
        #UploadedFile  div
        {
            display:inline-block;
        }
        
        .LabelCheckBox{
        font-size:9px !important;
        }
        .style1
        {
            height: 23px;
        }
        .style2
        {
            cursor: pointer;
            height: 23px;
        }
    </style>

</head>
<body>
    <form id="form1" runat="server">
      <asp:HiddenField id="hdfIdSolicitud" runat="server"/>
    <asp:HiddenField id="hdfUsuario" runat="server"/>
      <div id="dvMsgAlertaExterna" style="display: none;">
        <span class="ui-icon ui-icon-alert" style="float: left;"></span>
        <div id="dvContenidoAlertaExterna">
        </div>
    </div>
    <div class="dvPanel" style="margin-bottom:10px;">
        <%--<div id="PnlDetalles" class="dvPanel" style="height:300px;"></div>--%>
        <div id="PnlDetalles" style="height:343px; width:640px;">
            <asp:DataList ID="dlNotas" runat="server" DataSourceID="odsNotas" RepeatColumns="1">
                <ItemTemplate>
                    <table width="610px" cellpadding="3" style="background-color:#F3F3F3;">
                        <tr style="border-style: solid solid none solid; border-width: 1px 1px thin 1px; border-color: #C0C0C0;">
                            <td style="width:20px;">
                                &nbsp;<asp:Image ID="imgNota" runat="server" ImageUrl="~/Common/Images/nota16x16.png"/>
                            </td>
                            <td>
                               &nbsp;<asp:Label ID="lblRegistradoPor" runat="server" Text='<%# Eval("Titulo") %>' Font-Bold="True"></asp:Label>
                            </td>
                            <td align="right" valign="middle">
                                <span id="imgAdjunto"><%# Eval("Imagen") %></span>&nbsp;
                                <span id="lblAdjunto" style="font-weight:bold; text-decoration:underline; font-family:'Trebuchet MS', 'Helvetica', 'Arial', 'Verdana', 'sans-serif';" class="imgBtn" 
                                title="<%# Eval("TamanioKB") %>" onclick="javascript:fnDescargarArchivo('<%# Eval("NomArc") %>',2,'<%# Eval("IdSolicitudDetalle") %>')">
                             <%# Eval("NomArc") %></span>&nbsp;
                              
                            </td>
                            <td style="width:20px; text-align:right;">
                                 <span id="imgEnvCor"><%# Eval("imgEnviaCorreo")%></span>&nbsp;
                            </td>
                        </tr>
                        <tr style="border-style: none solid solid solid; border-width: thin 1px 1px 1px; border-color: #C0C0C0;">
                            <td colspan="4" style="padding-left: 8px; margin-right: 20px; word-wrap:break-word;">
                                <code><asp:Label ID="lblDetalle" runat="server" Text='<%# Bind("Detalle") %>' Font-Names="'Trebuchet MS', 'Helvetica', 'Arial', 'Verdana', 'sans-serif';" Width="598px"></asp:Label></code>
                            </td>
                        </tr>
                    </table>          
                </ItemTemplate>
            </asp:DataList>
        </div>
        <asp:ObjectDataSource ID="odsNotas" runat="server" SelectMethod="MostrarNotas" 
            TypeName="VisualSoft.PCSistel.Aprovisionamiento.BL.BL_AP_SolicitudNota">
            <SelectParameters>
                <asp:Parameter DefaultValue="0" Name="inCodSol" Type="Int32" />
                <asp:Parameter DefaultValue="0" Name="vcFecCor" Type="String" />
                <asp:Parameter DefaultValue="0" Name="vcHorCor" Type="String" />
                <asp:Parameter DefaultValue="0" Name="inCliente" Type="Int32" />
                <asp:Parameter DefaultValue="0" Name="incodNota" Type="Int32" />                
            </SelectParameters>
        </asp:ObjectDataSource>	
        <div id="PnlIngresoDetalle" style="vertical-align:middle; margin-top:5px;">
            <table> 
                <tr>
                    <td> <asp:TextBox ID="txtDetalle" runat="server" Width="530" TextMode="MultiLine" Height="35px" MaxLength="8000"></asp:TextBox> </td>                    
                    <td align="left">
                        <div id="btnEnviar" title="Enviar" style="width:80px;">Enviar</div>
                        <asp:CheckBox id="chkEnviaCorreo" style="display:none;" runat="server" Text="Enviar Correo" CssClass="LabelCheckBox" Enabled="false" ToolTip ="El mensaje sera enviado por correo electrónico a los involucrados en la solicitud."/>                    </td>
                </tr>
                <tr>
                    <td colspan="2" id="tdUpload">
                        <div class="UploadDiv" style="display: inline-block; float:left;">
                            <div id="UploadStatus"></div>
                            <div id="UploadButton" align="center" class="imgBtn" style="text-align:left;"> 
                                <table>
                                    <tr>
                                        <td style="text-align:left;" class="style1">
                                            <img alt="" src="../Common/images/Mantenimiento/SubirArchivo.png" width="16px" height="16px"/>    
                                          
                                        </td>
                                        <td style="vertical-align:bottom; text-decoration:underline; " class="style2">Adjuntar Archivo</td>
                                    </tr>
                                </table>
                            </div>
                            <div id="UploadedFile"></div>
                        </div>
                        <div style="float:left; vertical-align:bottom; margin-top:3px;" id="dvExtensiones">
                            <table>
                                <tr>
                                    <td style="text-align:left; font-style: italic;">
                                      (Extensiones Permitidas: txt, doc, docx, xls, xlsx, pdf, jpg, png)
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div id="dvInfoAdjunto" style="float:left; display:none; vertical-align:bottom; margin-top:3px;">
                            <ttgInfo:ToolTipGenerico ID="ttgInfoAdjunto" runat="server" />
                        </div>
                        
                    </td>
                </tr>
            </table>
            <div id="data-tooltip-triangle" class="data-tooltip-triangle"></div>
            <div id="miToolTip" class="data-tooltip" ></div>
        </div>
        <iframe id="ifDownload" frameborder="0" style="padding:0px; margin:0px; display:none;"></iframe>

    </div>
    </form>
</body>
</html>
