<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Mantenimiento_Imp_Mnt_Plantilla" Codebehind="Imp_Mnt_Plantilla.aspx.vb" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Entidades/ENT_MOV_IMP_Plantilla.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Entidades/ENT_GEN_Operador.js" type="text/javascript"></script>
    <script src="Imp_Mnt_Plantilla.js" type="text/javascript"></script>

    <style type="text/css">
        body {
            overflow-y: hidden;
        }
    </style>

</head>

<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfCod" runat="server" />
        <asp:HiddenField ID="hdfExt" runat="server" />
        <div id="dvCargando" class="dvCargando"></div>        
        
        <div id="divMsgConfirmacion" style="display:none;">
            <span class="ui-icon ui-icon-alert" style="float:left;"></span>
            <asp:Label ID="lblMensajeConfirmacion" runat="server" Text="Hay varias hojas agregadas, si realiza este cambio las hojas actuales se borrarán, ¿Desea continuar?"></asp:Label>
        </div>

        <div id="pnlPrincipal" class="dvPanel">
            <table  width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                    <td style="width:260px;" valign="top">
                        
                        <div id="pnlTabla" >
                        <table width="100%" border="0"  >
                            <tr>
                                <td style="height:25px" >
                                    <asp:Label ID="lblOperador" runat="server" Text="Operador"></asp:Label>
                                </td>
                                <td rowspan="2" valign="top" align="right">

                                        <div id="btnAgregarHoja" runat="server" class="btnNormal" title="Agregar Nueva Hoja">                                            
                                            <a><asp:Image ID="imgAgregarHoja" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Excel16.png"/></a>
                                        </div> 
                                        <div id="btnEliminarHoja" class="btnNormal" title="Eliminar Hoja">
                                            <asp:Image ID="imgEliminarHoja" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png"/>
                                            <a></a>
                                        </div>
                                </td>
                            </tr>
                            <tr>
                                <td >
                                        <asp:DropDownList ID="ddlOperador" runat="server" Width="200px"></asp:DropDownList>
                                </td>
                                
                            </tr>
                            <tr>
                                <td style="height:25px">
                                    <asp:Label ID="lblNombre" runat="server" Text="Nombre"></asp:Label>
                                </td>
                                <td >
                                    
                                </td>
                            </tr>
                            <tr>
                                <td>
                                        <asp:TextBox ID="txtNombre" runat="server" Width="190px" MaxLength="200"></asp:TextBox>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td style="height:25px">
                                    <asp:Label ID="lblTipoArchivo" runat="server" Text="Tipo Archivo"></asp:Label>
                                </td>
                                <td>
                                    
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:DropDownList ID="ddlArchivo" runat="server" Width="200px"></asp:DropDownList>
                                </td>
                                <td></td>
                            </tr>
                            <tr><td></td></tr>
                            <tr id="trTodaHoja" runat="server">
                                <td style="height:25px">
                                    <asp:CheckBox ID="chkTodasHojas" runat="server" /> 
                                    <asp:Label ID="lblTodaHoja" runat="server" Text="Aplicar a todas las hojas"></asp:Label>
                                </td>
                                <td>
                                    
                                </td>
                            </tr>
                            <tr id="trPlantillaMultiple" runat="server" style="display: none;">
                                <td style="height:25px">
                                    <asp:CheckBox ID="chkPlantillaMultiple" runat="server" /> 
                                    <asp:Label ID="LblPlaMul" runat="server" Text="Usar plantilla multiple"></asp:Label>
                                </td>
                                <td>
                                    
                                </td>
                            </tr>

                            <tr id="trEstado" runat="server">
                                <td>
                                    <asp:CheckBox ID="chkEstado" runat="server" Text="Activo" TextAlign="Left"/>
                                </td>
                                <td></td>
                            </tr>
                        </table>
                        </div>
                    </td>
                    <td align="left" rowspan="2">
                            <div id="dvHoja" style="display:none;">
                                <cc1:TabJQ ID="tbHojas" runat="server" CssClass="tabs" style="margin: 0px; padding: 0px; "></cc1:TabJQ>
                            </div>
                    </td>
                </tr>
                <tr>
                    <td>
                            <div style="text-align:left;"> 
                                <div id="btnGuardar" class="btnNormal" runat="server">
                                    <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                                    <a>Guardar</a>
                                </div>
                                <div id="btnCerrar" class="btnNormal">
                                    <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                                    <a>Cerrar</a>
                                </div>
                            </div>
                    </td>
                </tr>
            </table>
        </div>
        
        
    </form>
</body>
</html>










