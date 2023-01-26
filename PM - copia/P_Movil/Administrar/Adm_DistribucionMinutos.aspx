<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Adm_DistribucionMinutos" Codebehind="Adm_DistribucionMinutos.aspx.vb" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>
<%@ Register Src="../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico" TagPrefix="ttgInfo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <%--<link href="../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />--%>
    <%--<link href="../../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />--%>
    
    <%--<link href="../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />--%>
    <%--<link href="../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet" type="text/css" />--%>

    
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
        

   <%--<link href="../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />--%>
      

    <%--kendo --%>
    
    <link href="../../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <%--<link href="../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet" type="text/css" />--%>
    <%--<script src="../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>--%>
    <script src="../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.datepicker.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.datetimepicker.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/cultures/kendo.culture.es-ES.min.js" type="text/javascript"></script>

    <script src="Adm_DistribucionMinutos.js" type="text/javascript"></script>
 
 <%--<script type="text/javascript"></script>--%>

</head>
<body>
    <form id="form1" runat="server">
    <!-- ========================================================================================
            VARIABLES
    ========================================================================================-->
        <asp:HiddenField ID="hdfidPeriodo" runat="server" />
        <asp:HiddenField ID="hdfidOperador" runat="server" />
        <asp:HiddenField ID="hdfidCuenta" runat="server" />
        <asp:HiddenField ID="hdfvcPeriodo" runat="server" />

        <asp:HiddenField ID="hdfValorIlimitado" runat="server" />

        <asp:HiddenField ID="hdfCuenta" runat="server" />
        <!-- ========================================================================================
    ========================================================================================-->
        <div id="dvCargando" class="dvCargando"></div>

        

        <%--<div id="toolbar" class="dvPanel" style="margin:0px !important; padding:0px !important;">--%>

     

         <div id="toolbar" class="dvPanel" style="margin:0px !important; padding:0px !important;">

                        <table style="width :100%" border="0" cellpadding="0" cellspacing ="0">
                            <tr>
                                <td colspan="20">
                                <%--        <div class="ui-state-default ui-corner-all" style="padding:6px;">
                                            <span class="ui-icon ui-icon-person" style="float:left; margin:-2px 5px 0 0;"></span>
                                            Distribución de Bolsa por Periodo
                                        </div>  --%>

                                         <div  class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix" 
                                            style="height:20px;font-size:12px;text-align :center;   " >
                                        Distribución Cuenta Bolsa por Periodo
                                    </div>
                                </td>
                            </tr>
                            <tr><td><br /></td></tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>Periodo</td>
                                <td id="tbPeriodo">
                                    <asp:TextBox ID="txtPeriodo" runat="server" CssClass="MESANHO" Width="140px" ></asp:TextBox>
                                    
                                </td>
                                <td id="lbPeriodo">
                                    <asp:TextBox ID="lblPeriodo" runat="server"  Width="130px" ></asp:TextBox>
                                </td>
                                <td>Operador</td>
                                <td id="tb_Operador" >
                                        <asp:TextBox ID="txtOperador" runat="server" Width="210px"  ></asp:TextBox>  
                                </td>
                                <td id="tbOperador">
                                      <asp:DropDownList ID="ddlOperador" runat="server" Width="210px"></asp:DropDownList>
                                </td>
                                
                                <td><asp:Label id="lblModo" runat="server" Text ="Modo"></asp:Label> </td>
                                <td id="tbModo">
                                    <asp:DropDownList ID="ddlModo" runat="server" Width="170px">
                                        <asp:ListItem Text="Línea" Value ="Linea"></asp:ListItem>
                                        <asp:ListItem Text="Centro Costo" Value ="CentroCosto"></asp:ListItem>
                                        <asp:ListItem Text="Area" Value ="Area"></asp:ListItem>
                                        <asp:ListItem Text="Nivel" Value ="Nivel"></asp:ListItem>
                                        <asp:ListItem Text="Grupo Empleados" Value ="GrupoEmpleado"></asp:ListItem>
                                    </asp:DropDownList>

                                </td>
                               
                           
                                
                              
                                <td >
                                        <div id="btnGuardar" class="btnNormal" runat="server" title="Asignar Valores"  >
                                            <table cellpadding ="0" cellspacing ="0">
                                                <tr>
                                                    <td><asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" /></td>
                                                    <td>&nbsp;<a>Guardar</a></td>
                                                </tr>
                                            </table>
                                        </div>
                                        
                                </td>
                                <td>
                                  <div id="btnHistorico" class="btnNormal" runat="server" title="Asignar Valores" >
                                            <table cellpadding ="0" cellspacing ="0">
                                                <tr>
                                                    <td><asp:Image ID="Image4" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Views.png" /></td>
                                                    <td>&nbsp;<a>Ver Historico</a></td>
                                                </tr>
                                            </table>
                                        </div>
                                        
                                </td>
                                <td>
                                        <div id="btnExportar" class="btnNormal" runat="server" title="Asignar Valores"  click="AgregarRegistro">
                                            <table cellpadding ="0" cellspacing ="0">
                                                <tr>
                                                    <td><asp:Image ID="imgEliminar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/BajarArchivo.png" /></td>
                                                    <td>&nbsp;&nbsp;<a>Exportar</a></td>
                                                </tr>
                                            </table>
                                        </div>
                                        
                                </td>
                                <td>
                                 
                                        
                                </td>
                                
                            </tr>
                            <tr><td></td></tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>Descripción</td>
                                <td><asp:TextBox id="txtDescrip" runat="server" Width="130"></asp:TextBox></td>
                                <td>Cuenta</td>
                                <td>
                                    <asp:TextBox ID="txtCuenta" runat="server" Width="210px" ></asp:TextBox>
                                    <table id="tbCuenta" cellpadding="0" cellspacing ="0">
                                        <tr>
                                            <td><asp:DropDownList ID="ddlCuenta" runat="server" Width="210"></asp:DropDownList></td>
                                            <td >
                                                <div id="imgDetalleCuenta" class="btnNormal" runat="server" title="Importar" >
                                                    <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/VerDetalle.png" />
                                                </div>
                                            </td>
                                        </tr>
                                    </table>

                                </td>
                                <td></td>
                                <td id="tbExpresado" >
                                    <asp:RadioButtonList id="rdExpresado" runat="server" RepeatDirection="Horizontal" Width="170" Visible="false" >
                                            <asp:ListItem Text="Porcentaje"></asp:ListItem>
                                            <asp:ListItem Text="Cantidad"></asp:ListItem>
                                    </asp:RadioButtonList>
                                    </td>
                                    
                                    <td></td>
                                    <td></td>
                                    <td>
                                             <div id="btnImportar" class="btnNormal" runat="server" title="Asignar Valores" click="EditarRegistro">
                                            <table cellpadding ="0" cellspacing ="0">
                                                <tr>
                                                    <td><asp:Image ID="Image3" runat="server" ImageUrl="~/Common/Images/Mantenimiento/SubirArchivo.png" /></td>
                                                    <td>&nbsp;&nbsp;<a>Importar</a></td>
                                                </tr>
                                            </table>
                                        </div>
                                    </td>

                            </tr>
                            <tr>
                                <td>
                                    <br />
                                </td>
                            </tr>
                        </table>

                       
        </div>
          
<%--
            <table border="0" width="100%">
                <tr>
                    <td style="width:190px;">

                        <asp:Label ID="lblTituloOpciones" runat="server" Text="Opciones" CssClass="lblToolBAR"></asp:Label>

                    </td>
                    <td id="tdOperador_" runat="server" style="width:190px; text-align:center;">

                        <div>
                            <asp:Label ID="lblOperador" runat="server" Text="Operador"></asp:Label>
                            <br />
                            
                        </div>

                    </td>
                    <td style="width:230px; text-align:center;">

                        <div id="dvCuenta_" style="display:none;">

                            <asp:Label ID="lblTituloCuenta" runat="server" Text="Cuenta"></asp:Label>
                            <br />

                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td>
                                        
                                    </td>
                                    <td>
                                        
                                    </td>
                                </tr>
                            </table>

                        </div>

                    </td>
                    <td style="padding-right:10px;">

                        <table id="tblAcciones_" runat="server" cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    
                                </td>
                                
                            </tr>
                        </table>

                    </td>
                </tr>
            </table>--%>

     <%--   </div>--%>

        
        <div id="Div1" style=" padding:0px; margin:0px;height:200px">
            <iframe id="ifColumna" runat="server" frameborder="0" style="padding:0px; margin:0px; display:none;"></iframe>
        </div>
        

     
        <div id="dvExportacionImportacion" style="display:none; padding:0px; margin:0px;">
            <iframe id="ifExportacionImportacion" runat="server" frameborder="0" style="padding:0px; margin:0px;"></iframe>
        </div>

        <div id="dvDetalleCuenta" style="display:none; padding:0px; margin:0px;">
            <iframe id="ifDetalleCuenta" runat="server" frameborder="0" style="padding:0px; margin:0px;"></iframe>
        </div>

    </form>
</body>
</html>