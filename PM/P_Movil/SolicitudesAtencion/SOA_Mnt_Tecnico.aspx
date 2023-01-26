<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_SolicitudesAtencion_SOA_Mnt_Tecnico" Codebehind="SOA_Mnt_Tecnico.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
        <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>

    <script src="SOA_Mnt_Tecnico.js" type="text/javascript"></script>
    <style type="text/css">
    #btnBuscarUsuarioTecnico img
    {
        width:100%;
        height:100%;
        max-width:100%;    
    }
    #btnBuscarUsuarioSupervisor img
    {
        width:100%;
        height:100%;
        max-width:100%;    
    }
    #btnBuscarUsuarioTecnicoBorrar img
    {
        width:100%;
        height:100%;
        max-width:100%;    
    }
    #btnBuscarUsuarioSupervisorBorrar img
    {
        width:100%;
        height:100%;
        max-width:100%;    
    }
    #btnBuscarUsuarioTecnico:hover
    {
        cursor:pointer; 
    }
    #btnBuscarUsuarioSupervisor:hover
    {
        cursor:pointer; 
    }
    #btnBuscarUsuarioTecnicoBorrar:hover
    {
        cursor:pointer; 
    }
    #btnBuscarUsuarioSupervisorBorrar:hover
    {
        cursor:pointer; 
    }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfAdmin" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <asp:HiddenField ID="hdfIdTecnico" runat="server" />
    <asp:HiddenField ID="hdfIdTecnicoSupervisor" runat="server" />
    <div class="dvPanel">

        <table>
            <tr>                    
                <td>Usuario especialista</td>                
                <td>
                    <asp:TextBox ID="txtUsuarioTecnico" runat="server" Width="250" ReadOnly="True"></asp:TextBox>
               </td>
                <td>
                    <div id="btnBuscarUsuarioTecnico" style="width:25px; height:25px; float:left;">
                        <asp:Image ID="Image3" runat="server" ImageUrl="~/Common/Images/Mantenimiento/busqueda_generico.png"/>
                    </div>
                </td>
                <td>
                    <div id="btnBuscarUsuarioTecnicoBorrar" style="width:20px; height:20px; float:left;">
                        <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Borrar.png"/>
                    </div>
                </td>
            </tr>
            <tr>                    
                <td>Usuario Supervisor</td>                
                <td>
                    <asp:TextBox ID="txtUsuarioSupervisor" runat="server" Width="250" ReadOnly="True"></asp:TextBox>
                </td>
                <td>
                    <div id="btnBuscarUsuarioSupervisor" style="width:25px; height:25px; float:left;">
                        <asp:Image ID="Image4" runat="server" ImageUrl="~/Common/Images/Mantenimiento/busqueda_generico.png"/>
                    </div>
                </td>
                <td>
                    <div id="btnBuscarUsuarioSupervisorBorrar" style="width:20px; height:20px; float:left;">
                        <asp:Image ID="Image1"  runat="server" ImageUrl="~/Common/Images/Mantenimiento/Borrar.png"/>
                    </div>
                </td>
            </tr>
            <tr>                    
                <td>Bolsas para asignar</td>                
                <td colspan="3">
                <asp:DropDownList ID="ddlNiveles" runat="server" Width="100">
                </asp:DropDownList>
                <asp:DropDownList ID="ddlBolsasParaAsinar" runat="server" style="margin-left:5px;" Width="150">
                </asp:DropDownList>

                <asp:Image ID="imgAgregar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif"
                    CssClass="btnNormal" ToolTip="Agregar" />
                <asp:Image ID="imgQuitar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif"
                    CssClass="btnNormal" ToolTip="Quitar" />             
                </td>
            </tr>
            <tr>                    
                <td>Bolsas Asignadas</td>                
                <td colspan="3">
                    <asp:ListBox ID="ddlBolsasAsignadas" runat="server" Width="250"></asp:ListBox>
                </td>
            </tr>
            <tr id="EsChkActivar">                    
                <td >Activo</td>                                    
                <td><asp:CheckBox ID="chkActivo" runat="server" /></td>
            </tr>
        </table>
    
    </div>
    <div style="text-align:left; padding-top: 12px">
        <div id="btnGuardar" class="btnNormal">
            <asp:Image ID="imgGuardarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png"/>
            <a>Guardar</a>
        </div>
        <div id="btnCerrar" class="btnNormal">
            <asp:Image ID="imgCerrarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif"/>
            <a>Cerrar</a>
        </div>
    </div> 
    <div id="dvArea" style="display: none; padding: 0px; margin: 0px;">
        <iframe id="ifArea" width="730" height="440" frameborder="0" style="padding: 0px; margin: 0px;"></iframe>
    </div>
    </form>
</body>
</html>
