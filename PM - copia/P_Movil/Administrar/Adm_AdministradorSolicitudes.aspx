<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Adm_AdministradorSolicitudes" Codebehind="Adm_AdministradorSolicitudes.aspx.vb" %>

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
        <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
        <script src="Adm_AdministradorSolicitudes.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfAdmin" runat="server" />
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <asp:HiddenField ID="hdfValidacion" runat="server" />
    <div>
        <div id="dvCargando" class="dvCargando"></div>
        <div id="divBusqueda" runat="server" class="dvPanel">
            <div style="text-align:center; font-size:medium;"><a>Busqueda de solicitudes</a></div>
            <table id="tbCamposDinamicos" runat="server">
            <tr>
                <td>
                    TIPO DE SOLICITUD
                </td>
                <td>
                    <asp:DropDownList ID="ddlTipoSolicitud" runat="server"></asp:DropDownList>
                </td>
                <td>
                    ESTADO DE SOLICITUD
                </td>
                <td>
                    <asp:DropDownList ID="ddlEstadoSolicitud" runat="server"></asp:DropDownList>
                </td>
                <td>

                </td>
            </tr>
            <tr>
                <td>
                    CAMPO A FILTRAR
                </td>
                <td>
                    <asp:DropDownList ID="ddlCampoFiltrar" runat="server"></asp:DropDownList>
                </td>
                <td>
                    DESCRIPCIÓN
                </td>
                <td>
                    <asp:TextBox ID="txtDescripcion" runat="server" MaxLength="15"></asp:TextBox>
                </td>
            </tr>
            </table>            
        </div>
        <div id="dvAprobacion" class="dvPanel" style="display:none;">
            <table cellspacing="0" cellpadding="0">
                <tr>
                    <td class="">
                        Codigo Empleado
                    </td>
                    <td class="">
                        <asp:Label ID="lblCodEmpleado" runat="server" Text=""></asp:Label>                        
                    </td>
                </tr>
                <tr>
                    <td class="">
                        Nombre Empleado
                    </td>
                    <td class="">
                        <asp:Label ID="lblNomEmpleado" runat="server" Text=""></asp:Label>  
                    </td>
                </tr>
                <tr>
                    <td class="">
                        Numero de celular
                    </td>
                    <td class="">
                        <asp:Label ID="lblNumCelular" runat="server" Text=""></asp:Label>
                        <asp:DropDownList ID="ddlNumero" runat="server"></asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td class="">
                        Modelo de equipo anterior
                    </td>
                    <td class="">
                        <asp:Label ID="lblModeloEquipoAnt" runat="server" Text=""></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td class="">
                        IMEI Equipo anterior
                    </td>
                    <td class="">
                        <asp:Label ID="lblIMEIEquipoAnt" runat="server" Text=""></asp:Label>
                    </td>
                </tr>
                <tr style="display:none;">
                    <td class="">
                        Motivo de reposición
                    </td>
                    <td class="">
                        <asp:DropDownList ID="ddlMotivoReposicion" runat="server" Width="100px"></asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td class="">
                        Modelo de equipo nuevo
                    </td>
                    <td class="">
                        <asp:Label ID="lblModeloEquipoNuevo" runat="server" Text=""></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td class="">
                        IMEI Equipo nuevo
                    </td>
                    <td class="">
                        <asp:DropDownList ID="ddlEquipoNuevo" runat="server" Width="150px"></asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td class="">
                        Observaciones
                    </td>
                    <td class="">
                        <asp:Label ID="lblObservacion" runat="server" Text=""></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td class="">
                        Estado
                    </td>
                    <td class="">
                        <asp:DropDownList ID="ddlEstado" runat="server" Width="100px"></asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td colspan="2"> 
                        <br />                       
                        <div id="btnGuardar" class="btnNormal">
                            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png"/>
                            <a>Guardar</a>
                        </div>
                        <div id="btnSalir" class="btnNormal">
                            <asp:Image ID="imgSalir" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif"/>
                            <a>Salir</a>
                        </div>
                    </td>
                </tr>
            </table>
        </div>        
        <table id="tbSolicitud"></table> 
    </div>
    </form>
</body>
</html>