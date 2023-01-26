<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Configuracion_Seguridad_Administrar_ImportarUsuario" Codebehind="ImportarUsuario.aspx.vb" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
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
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>


    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.datepicker.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.datetimepicker.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/cultures/kendo.culture.es-ES.min.js" type="text/javascript"></script>

    
    <link type="text/css" rel="stylesheet" href="../../../Common/Styles/KendoUI/kendo.common.min.css"  />
    <link type="text/css" rel="stylesheet" href="../../../Common/Styles/KendoUI/kendo.uniform.min.css" />
    <link type="text/css" rel="stylesheet" href="../../../Common/Styles/KendoUI/kendo.common.min.css"  />
    <link type="text/css" rel="stylesheet" href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css"  />

    <script type="text/javascript" src="../../../Common/Scripts/jquery.uniform.min.js" ></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.datepicker.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.datetimepicker.min.js" type="text/javascript"></script>
    <script src="ImportarUsuario.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    
    <!-- ============================================================================================
        HINOPE
    ============================================================================================ -->
    
      


    <center>
       
         <asp:HiddenField id="hdfvcRutaArchivo" runat="server"/>
         <asp:HiddenField id="hdfvcPass" runat="server"/>
         
            <!-- ============================================================================================
                IMPORTAR USUARIO
            ============================================================================================ -->
            
         
                <table style="margin: 0px; padding: 0px;" >
                    <tr>
                        <td colspan="10">
                                <div  class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix" 
                                            style="height:20px;font-size:12px;text-align :center;  vertical-align:baseline  " >
                                       <table align="center"><tr><td>Importación de Usuarios</td></tr></table> 
                                        
                                    </div>
                        </td>
                    </tr>
                    <tr><td style="height: 10px"></td></tr>
                    <tr>
                    <td></td>
                        
                        <td align="right" >Archivo</td>
                        <td align="center">
                                
                              <asp:FileUpload ID="fuArchivo" runat="server" accept=".xlsx" />  
                                <asp:Button  ID="btnCargar" runat="server" Text=""   />
                                <asp:Button  ID="btnExportar" runat="server" Text=""   />
                                
                        </td>
                                                
                        <td>Contraseña Default</td>
                        <td><asp:TextBox id="txtContraseña" runat="server" Width="100px" TextMode="Password"></asp:TextBox></td>
                        <td>
                                <div id="btnCargarCli" class="btnNormal">                                    
                                    <a>Procesar</a>
                                </div>
                        </td>

                        <td>
                                <div id="btnActualizar" class="btnNormal">
                                    <a title="Volver a cargar los registros"><asp:Image ID="Image4" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Actualizar.png" /></a>
                                </div>
                        </td>

                        <td>
                                <div id="btnExportarXls" class="btnNormal">
                                    <a title="Configurar PLantilla Xls"><asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Excel16.png" /></a>
                                </div>
                        </td>
                        <td>
                                <div id="btnEliminar" class="btnNormal">
                                    <a title="Elimnar Usuario Importados"><asp:Image ID="Image3" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif" /></a>
                                </div>
                        </td>

                        <td>
                                <div id="btnConfiguracion" class="btnNormal">
                                    <a title="Configurar PLantilla Xls"><asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Procesar.png" /></a>
                                </div>
                        </td>
                    </tr>
                    
                   <tr ><td  style="height: 10px"></td></tr>
                  
                    
                    <tr>
                        <td colspan="10">

                            <cc1:TabJQ ID="tabDatos" runat="server" CssClass="tabs" Style="margin: 0px; padding: 0px;" >

                                <cc1:ContenedorTabJQ ID="tabUsu" Titulo="Log Registros" CssClass="dvTabContenido" Height="100%" >
                              
                              <div style="margin: 10px; padding: 10px;" >
                                    <table id="tbLog"></table>    
                                    <div id="pagerLog"></div>
                                    </div>
                                </cc1:ContenedorTabJQ>

                                <cc1:ContenedorTabJQ ID="ContenedorTabJQ1" Titulo="Usuarios Importados" CssClass="dvTabContenido" Height="100%">
                              
                                    <div style="margin: 10px; padding: 10px;" >
                                        <table id="tbUsuario"></table>    
                                        <div id="pagerUsuario"></div>
                                        </div>
                                </cc1:ContenedorTabJQ>

                                <cc1:ContenedorTabJQ ID="ContenedorTabJQ2" Titulo="Usuarios Sin Código" CssClass="dvTabContenido" Height="100%">
                              
                                    <div style="margin: 10px; padding: 10px;" >
                                        <table id="tbUsuarioSin"></table>    
                                        <div id="pagerUsuarioSin"></div>
                                        </div>
                                </cc1:ContenedorTabJQ>

                            </cc1:TabJQ>
                                
                        </td>
                    </tr>
                   
                </table>
                          
        
         
         
         <br />

         <!-- ========================================================================================
                DETALLE LINEAS
        ========================================================================================-->

          <div id="dvCampos" style="display:none; padding:5px; margin:5px;">
            
            <table id="tbCampos"></table>    
            <div id="pagerCampos"></div>
            </div>
         


    <!-- ========================================================================================
            END FORM
        ========================================================================================-->
    </center>

    </form>
</body>
</html>
