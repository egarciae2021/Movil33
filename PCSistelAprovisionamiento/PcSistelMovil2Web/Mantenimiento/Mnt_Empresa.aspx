<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Mnt_Empresa.aspx.cs" Inherits="PcSistelMovil2Web.Mantenimiento.Mnt_Empresa" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Styles/Sitio.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/JqueryThemeRoller/redmond/jquery-ui-1.8.16.custom.css"
        rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/json2.js" type="text/javascript"></script>
    <script src="../Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="../Common/Styles/Principal2.css" rel="stylesheet" type="text/css" />
    <script src="Mnt_Empresa.js" type="text/javascript"></script>
    <style type="text/css">
        #txtRuc
        {
            text-align: left !important;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfIdEmpresa" runat="server" />
    <div id="dvMsgAlertaExterna" style="display: none;">
        <span class="ui-icon ui-icon-alert" style="float: left;"></span>
        <div id="dvContenidoAlertaExterna">
        </div>
    </div>
    <%-- Moldal Titulares --%>
    <div id="div_modal_titular" style="display: none; padding: 0px; margin: 0px; overflow-y: hidden;">
        <br />
        <table>
            <tr>
                <td class="style1">
                    <asp:Label ID="Label13" runat="server" Text="Nombres"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtnombreT1" runat="server" Width="180px" MaxLength="50"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="Label14" runat="server" Text="Apellidos"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtapeT1" runat="server" Width="180px" MaxLength="100"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="Label12" runat="server" Text="Usuario"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtUsuario" runat="server" Width="180px" MaxLength="100"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="Label5" runat="server" Text="Contraseña"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtContrasena" runat="server" Width="180px" MaxLength="100" ReadOnly="true"></asp:TextBox>
                </td>
            </tr>
             <tr>
                <td>
                    <asp:Label ID="Label6" runat="server" Text="Correo"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtCorreo" runat="server" Width="180px" MaxLength="100"></asp:TextBox>
                </td>
            </tr>
               <tr>
                <td>
                    <asp:Label ID="Label7" runat="server" Text="Activo"></asp:Label>
                </td>
                <td>
                   <asp:CheckBox ID="chkActivo" runat="server"></asp:CheckBox>
                </td>
            </tr>
        </table>
        <asp:Label runat="server" ID="lbl_error" CssClass="error_ms"></asp:Label>
        <div id="dvModalAcciones" style="float: right; margin-top: 30px;">
            <div id="btnTituAdd" class="btnNormal" style="width: 80px;">
                <a>Aceptar</a>
            </div>
        </div>
    </div>
    <%-- Fin Moldal Titulares--%>
    <div>
        <br />
        <div id="dvdetalle" class="dvPanel" style="margin-left: 5px; margin-right: 5px; background">
            <table id="tbTipo" runat="server">
                <tr>
                    <td class="TituloMant">
                        <asp:Label ID="Label2" runat="server" Text="Nombre"></asp:Label>
                    </td>
                    <td class="ValorMant">
                        <asp:TextBox ID="txtNombre" runat="server" Width="250px" MaxLength="50"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="TituloMant">
                        <asp:Label ID="Label3" runat="server" Text="Razón Social"></asp:Label>
                    </td>
                    <td class="ValorMant">
                        <asp:TextBox ID="txtRazon" runat="server" Width="250px" MaxLength="100"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="TituloMant">
                        <asp:Label ID="Label4" runat="server" Text="RUC"></asp:Label>
                    </td>
                    <td class="ValorMant">
                        <asp:TextBox ID="txtRuc" runat="server" Width="250px" MaxLength="11"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="TituloMant">
                        <asp:Label ID="Label8" runat="server" Text="Fecha Fin Contrato"></asp:Label>
                    </td>
                    <td class="ValorMant">
                        <asp:TextBox ID="fechaf" runat="server" CssClass="txtFecha" ReadOnly="true" ></asp:TextBox>   
                    </td>
                </tr>
                <tr>
                    <td class="TituloMant">
                        <asp:Label ID="Label1" runat="server" Text="Titulares"></asp:Label>
                    </td>
                    <td>
                        <div id="dvAcciones" style="float: right;" >
                            <div id="btnAgregar" class="btnNormal" runat="server" title="Nuevo" click="AgregarRegistro" style="display:none;" >
                                <asp:Image ID="imgAgregar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif"/>
                            </div>
                            <div id="btnEditar" class="btnNormal" runat="server" title="Mostrar Seleccionado" click="EditarRegistro">
                                <asp:Image ID="imgEditar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/info.png" />
                            </div>
                            <div id="btnEliminar" class="btnNormal" runat="server" title="Eliminar Seleccionados" click="EliminarRegistro"  style="display:none;">
                                <asp:Image ID="imgEliminar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif"/>
                            </div>
                            <div id="btnActivar" class="btnNormal" runat="server" title="Activar Seleccionado" click="ActivarRegistro" style="display:none;">
                                <asp:Image ID="imgActivar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Activar_16x16.png" />
                            </div>
                            <div id="btnRestablecer" class="btnNormal" runat="server" title="Restablecer Contraseña"  style="display:none;">
                            <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Actualizar.png"  />
                            </div>                            
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <table id="grid" runat="server">
                        </table>
                        <div id="pager">
                        </div>
                    </td>
                </tr>
            </table>
            <br />
        </div>
        <br />
        <div id="dvAcciones" style="margin-left: 5px;">
            <div id="btnGuardar" runat="server" class="btnNormal" style="width: 100px;" runat="server">
                <asp:Image ID="Image4" runat="server" Style="width: 14px; vertical-align: bottom;"
                    ImageUrl="../Common/Images/save.ico" />
                Grabar
            </div>
            <div id="btnCerrar" runat="server" class="btnNormal">
                <asp:Image ID="Image6" runat="server" Style="width: 14px; vertical-align: bottom;"
                    ImageUrl="../Common/Images/Mantenimiento/Salir.gif" />
                Cerrar
            </div>
        </div>
    </div>
      <div id="MsgConfirmacionEliminar" runat="server" style="display: none;">
        ¿Esta seguro que desea restablecer la contraseña?
        <br /><br />
        <asp:Label ID="lblPDConfirmacion" runat="server"></asp:Label>
    </div>
    </form>
</body>
</html>
