<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Imp_Configurador" Codebehind="Imp_Configurador.aspx.vb" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
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
    <script src="../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
<%--<script src="../../Common/Scripts/JqueryUI/jquery.ui.core.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.tabs.js" type="text/javascript"></script>--%>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Imp_Configurador.js")%>" type="text/javascript"></script>
    <form id="form1" runat="server">
        <div id="dvCargando" class="dvCargando"></div>
                <table width="100%">
                    <tr class="trToolBar" align="center">
                        <td align="center">
                            <div id="toolbar" class="dvPanel" style="margin:0px !important; padding:0px !important;">
                            <table border="0" width="100%">
                                <tr>
                                    <td style="width:80px; padding-left:20px;">
                                        <table id="tblAcciones" runat="server" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td>
                                                    <div id="btnServicios" class="btnNormal" runat="server" title="Servicios Asociados" Click="AbrirServicios" Url="../../Common/Page/Adm_Lista.aspx">
                                                        <asp:Image ID="imgServicios" runat="server" ImageUrl="../../Common/Images/Mantenimiento/Servicio.png" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div id="btnPlantillas" class="btnNormal" runat="server" title="Plantillas" Click="AbrirPlantillas" Url="../../Common/Page/Adm_Lista.aspx">
                                                        <asp:Image ID="imgPlantillas" runat="server" ImageUrl="../../Common/Images/Mantenimiento/Plantilla.gif" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div id="btnRutas" class="btnNormal" runat="server" title="Prefijos" Click="AbrirRutas" Url="../../Common/Page/Adm_Lista.aspx">
                                                        <asp:Image ID="imgRutas" runat="server" ImageUrl="../../Common/Images/Mantenimiento/Ruta.png" />
                                                    </div>
                                                </td>

                                                <td>
                                                    <div id="btnDestinos" class="btnNormal" runat="server" title="Destino" Click="AbrirDestinos" Url="../../Common/Page/Adm_Lista.aspx">
                                                        <asp:Image ID="imgDestinos" runat="server" ImageUrl="../../Common/Images/Mantenimiento/Destino.png" />
                                                    </div>
                                                </td>

                                                <td>
                                                    <div id="btnNotificaciones" class="btnNormal" runat="server" title="Notificaciones" Click="AbrirNotificaciones" Url="Imp_Notificacion.aspx">
                                                        <asp:Image ID="imgNotificaciones" runat="server" ImageUrl="../../Common/Images/Mantenimiento/Notificaciones.png" />
                                                    </div>
                                                </td>

                                                <td>
                                                    <div id="btnParametros" class="btnNormal" runat="server" title="Configurar Parametros" Click="AbrirParametros" Url="Mnt_ConfServicios.aspx">
                                                        <asp:Image ID="imgParametros" runat="server" ImageUrl="~/Common/Images/Accesos/configServices.png" />
                                                    </div>
                                                </td>

                                            </tr>
                                        </table>
                                    </td>
<%--                                    <td style="width:40px; padding-right:10px;">
                                        <table id="tblEstado" runat="server" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td>
                                                    <div id="btnActivar" class="btnNormal" runat="server" title="Activar Seleccionados" click="ActivarRegistro">
                                                        <asp:Image ID="imgActivar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Activar_16x16.png" />
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>--%>
                                </tr>
                            </table>
                            </div>
                        </td>
                    </tr>
                </table>
<%--            <cc1:PanelSplitter ID="PanelSplitter2" runat="server" Width="200px" BorderColor="LightGray" BorderStyle="Solid" BorderWidth="0px">
                <cc1:BarraNavegacionJQ ID="BarraNavegacionJQ1" runat="server">                    
                    <cc1:PanelBarraNavegacion runat="server" Titulo="Opciones" Width="180px" ID="pbnAcciones">
                        <cc1:ItemBarraNavegacion ID="ibnServicios" runat="server" UrlIco="../../Common/Images/Mantenimiento/Servicio.png" Texto="Servicios" Seleccionable="true" Highlight="true"                        
                                                 Click="AbrirServicios" Url="../../Common/Page/Adm_Lista.aspx">
                        </cc1:ItemBarraNavegacion>
                        <cc1:ItemBarraNavegacion ID="ibnPlantillas" runat="server" UrlIco="../../Common/Images/Mantenimiento/Plantilla.gif" Texto="Plantillas" Seleccionable="true" Highlight="true" 
                                                 Click="AbrirPlantillas" Url="../../Common/Page/Adm_Lista.aspx">
                        </cc1:ItemBarraNavegacion>
                        <cc1:ItemBarraNavegacion ID="ibnRutas" runat="server" UrlIco="../../Common/Images/Mantenimiento/Ruta.png" Texto="Prefijos" Seleccionable="true" Highlight="true" 
                                                 Click="AbrirRutas" Url="../../Common/Page/Adm_Lista.aspx">
                        </cc1:ItemBarraNavegacion>
                        <cc1:ItemBarraNavegacion ID="ibnDestinos" runat="server" UrlIco="../../Common/Images/Mantenimiento/Destino.png" Texto="Destino" Seleccionable="true" Highlight="true" 
                                                 Click="AbrirDestinos" Url="../../Common/Page/Adm_Lista.aspx">
                        </cc1:ItemBarraNavegacion>
                        <cc1:ItemBarraNavegacion ID="ibnNotificaciones" runat="server" UrlIco="../../Common/Images/Mantenimiento/Notificaciones.png" Texto="Notificaciones" Seleccionable="true" Highlight="true" 
                                                 Click="AbrirNotificaciones" Url="Imp_Notificacion.aspx">
                        </cc1:ItemBarraNavegacion>
                    </cc1:PanelBarraNavegacion>
                </cc1:BarraNavegacionJQ>
            </cc1:PanelSplitter>--%>
            <cc1:PanelSplitter ID="PanelSplitter1" runat="server" BorderColor="LightGray" BorderStyle="Solid" BorderWidth="0px">
                <cc1:TabJQ runat="server" ID="TabOpciones" CssClass="tabs" style="margin-top:1px;">
                    <cc1:ContenedorTabJQ Titulo="Inicio" ActivoBotonCerrar="true" CssClass="tabHijo">
                        <iframe id="ifInicial" class="ifContenido" ></iframe>
                    </cc1:ContenedorTabJQ>
                </cc1:TabJQ>
            </cc1:PanelSplitter>



<%--         <cc1:TabJQ runat="server" ID="TabDetalle" CssClass="tabs" style="margin-top:1px;">
            <cc1:ContenedorTabJQ>
                <table width="100%">
                    <tr class="trToolBar" align="center">
                        <td align="center">
                            <div id="toolbar" class="dvPanel" style="margin:0px !important; padding:0px !important;">
                            <table border="0" width="100%">
                                <tr>
                                    <td> &nbsp; </td>
                                    <td style="width:80px; padding-right:10px;">
                                        <table id="tblAcciones" runat="server" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td>
                                                    <div id="btnAgregar" class="btnNormal" runat="server" title="Servicios Asociados" click="AgregarRegistro">
                                                        <asp:Image ID="imgAgregar" runat="server" ImageUrl="../../Common/Images/Mantenimiento/Servicio.png" />
                                                    </div>
                                                </td>
                                                <td>                            
                                                    <div id="btnEditar" class="btnNormal" runat="server" title="Plantillas" click="EditarRegistro">
                                                        <asp:Image ID="imgEditar" runat="server" ImageUrl="../../Common/Images/Mantenimiento/Plantilla.gif" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div id="btnEliminar" class="btnNormal" runat="server" title="Prefijos" click="EliminarRegistro">
                                                        <asp:Image ID="imgEliminar" runat="server" ImageUrl="../../Common/Images/Mantenimiento/Ruta.png" />
                                                    </div>                            
                                                </td>
                                                <td>
                                                    <div id="Div1" class="btnNormal" runat="server" title="Destino" click="EliminarRegistro">
                                                        <asp:Image ID="Image1" runat="server" ImageUrl="../../Common/Images/Mantenimiento/Destino.png" />
                                                    </div>                            
                                                </td>
                                                <td>
                                                    <div id="Div2" class="btnNormal" runat="server" title="Notificaciones" click="EliminarRegistro">
                                                        <asp:Image ID="Image2" runat="server" ImageUrl="../../Common/Images/Mantenimiento/Notificaciones.png" />
                                                    </div>                            
                                                </td>
                                                <td>
                                                    <div id="Div3" class="btnNormal" runat="server" title="Parámetros" click="EliminarRegistro">
                                                        <asp:Image ID="Image3" runat="server" ImageUrl="../../Common/Images/Mantenimiento/Notificaciones.png" />
                                                    </div>                            
                                                </td>
                                            </tr>
                                        </table>
                                    </td>

                                </tr>
                            </table>
                            </div>
                        </td>
                    </tr>
                </table>
            </cc1:ContenedorTabJQ>
        </cc1:TabJQ>--%>



        <%--</cc1:PanelSplitter>--%>
<%--        <cc1:PanelSplitter ID="PanelSplitter1" runat="server" BorderColor="LightGray" BorderStyle="Solid" BorderWidth="0px">
            <cc1:TabJQ runat="server" ID="TabOpciones" CssClass="tabs" style="margin-top:1px;">
                <cc1:ContenedorTabJQ Titulo="Inicio" ActivoBotonCerrar="true" CssClass="tabHijo">
                    <iframe id="ifInicial" class="ifContenido"></iframe>
                </cc1:ContenedorTabJQ>
            </cc1:TabJQ>
        </cc1:PanelSplitter>     --%>  
        <%--</cc1:SplitterJQ>--%>




    </form>
</body>
</html>
