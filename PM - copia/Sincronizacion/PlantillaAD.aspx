<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="PlantillaAD.aspx.vb" Inherits=".PlantillaAD" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
        <link href="../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery.ui.core.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script> 
    <script src="../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
     <script src="PlantillaAD.js" type="text/javascript"></script>

</head>
<body>
 <form id="form1" runat="server">
    <asp:HiddenField ID="hdfPlanDetalle" runat="server" />
    <%--<center>
        <div class="dvPanel" style="display: none" >
        <table width="98%" >
        <tr>
        <td>
        
                         <span class="titulos_generales" style="text-align:center;" ><B>Configuración de Servidores LDAP</B></span>       <br />
        </td>
        </tr>
        </table>
    </div>
     
        
        <br />--%>
    <div class="borde_tabla" style="width: 100%;" align="center">
        <br />
        <div id="divMsgConfirmacion" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>¡Se quitará este
            campo de la configuración actual!, ¿Desea continuar?
        </div>
        <div id="divConfirmaUpdateLdap" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>Se reemplazaran
            los campos por los de LDAP, desea continuar?
        </div>
        <center>
            <table cellpadding="0" cellspacing="0" width="10%">
                <tr>
                    <td colspan="3">
                        <div class="centrar">
                            <div id="btnvolver" class="btnNormal" runat="server">
                                <asp:Image ID="Image6" runat="server" ImageUrl="~/Common/Images/Mantenimiento/regresar.png" />
                                <a>Regresar a Configuración</a>
                            </div>
                            <div id="btnprevio" class="btnNormal" runat="server">
                                <asp:Image ID="Image9" runat="server" ImageUrl="~/Common/Images/Mantenimiento/procesar.png" />
                                <a>Revisar Registros LDAP</a>
                            </div>
                            <div id="btnAgregar" class="btnNormal" runat="server">
                                <asp:Image ID="imgAgregar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                <a>Agregar</a>
                            </div>
                            <div id="btnModificar" class="btnNormal" runat="server">
                                <asp:Image ID="imgModificar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" />
                                <a>Modificar</a>
                            </div>
                            <div id="btnQuitar" class="btnNormal" runat="server">
                                <asp:Image ID="imgQuitar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png" />
                                <a>Quitar</a>
                            </div>
                            <div id="btnGrabarDominio" class="btnNormal" runat="server">
                                <asp:Image ID="imgGrabar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                                <a>Grabar</a>
                            </div>
                        </div>
                        <br />
                        <table id="tbDominio">
                        </table>
                        <br />
                        <br />
                    </td>
                </tr>
                <tr>
                    <td width="50%">
                        <div id="btnAgregarC" class="btnNormal" runat="server">
                            <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                            <a>Agregar</a>
                        </div>
                        <%--                        <div id="btnModificarC" class="btnNormal" runat="server">
                            <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" />
                            <a>Modificar</a>
                        </div>--%>
                        <div id="btnQuitarC" class="btnNormal" runat="server">
                            <asp:Image ID="Image3" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png" />
                            <a>Quitar</a>
                        </div>
                        <div id="btnGrabarCampos" class="btnNormal" runat="server">
                            <asp:Image ID="Image4" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                            <a>Grabar</a>
                        </div>
                        <p>
                        </p>
                    </td>
                    <td width="1%">
                    </td>
                    <td>
                        <div id="btnAgregarE" class="btnNormal" runat="server">
                            <asp:Image ID="Image5" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                            <a>Agregar</a>
                        </div>
                        <div id="btnModificarE" class="btnNormal" runat="server" style="display: none;">
                            <asp:Image ID="imgModificarE" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" />
                            <a>Modificar</a>
                        </div>
                        <div id="btnQuitarE" class="btnNormal" runat="server">
                            <asp:Image ID="Image7" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png" />
                            <a>Quitar</a>
                        </div>
                        <div id="btnGrabarEquivalencia" class="btnNormal" runat="server">
                            <asp:Image ID="Image8" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                            <a>Grabar</a>
                        </div>
                        <p>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table id="tbCamposDominio">
                        </table>
                        <br />
                    </td>
                    <td>
                        &nbsp;&nbsp;&nbsp;
                    </td>
                    <td>
                        <table id="tbEquivalencias">
                        </table>
                        <br />
                    </td>
                </tr>
                <tr>
                    <td>
                        <div id="btntraerldap" class="btnNormal" runat="server">
                            <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/Mantenimiento/ruta.png" />
                            <a>Importar Campos de LDAP</a>
                        </div>
                    </td>
                    <td>
                    </td>
                    <td>
                    </td>
                </tr>
            </table>
            <div id="dvCamposDetalle" style="display: none;">
                <table>
                    <tr>
                        <td>
                            Servidor:
                        </td>
                        <td>
                            <asp:TextBox ID="txtservidor" runat="server" Text="" MaxLength="100"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Dominio:
                        </td>
                        <td>
                            <asp:TextBox ID="txtdominio" runat="server" MaxLength="100"></asp:TextBox>
                        </td>
                    </tr>
                    <tr id="trUsuario">
                        <td>
                            Usuario:
                        </td>
                        <td>
                            <asp:TextBox ID="txtusuario" runat="server" MaxLength="50"></asp:TextBox>
                        </td>
                    </tr>
                    <tr id="trContraseña">
                        <td>
                            Password:
                        </td>
                        <td>
                            <asp:TextBox ID="txtpassword" runat="server" MaxLength="50" TextMode="Password"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Puerto:
                        </td>
                        <td>
                            <asp:TextBox ID="txtpuerto" runat="server" MaxLength="10"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>Filtro OU:</td>
                        <td>
                            <asp:CheckBox ID="chkbtfiltroOU" runat="server" />
                        </td>
                    </tr>
                    <tr id="trCampoOU" style="display:none;">
                        <td>Nodo LDAP:</td>
                        <td>
                            <asp:TextBox ID="txtfiltroOU" runat="server" MaxLength="100" Width="250px"></asp:TextBox>
                        </td>
                    </tr>
                    <tr style="display: none;">
                        <td>
                            Autenticación:
                        </td>
                        <td>
                            <asp:DropDownList ID="ddlTipoAutentificacion" runat="server">
                                <asp:ListItem Value="1">Autentificacion de Windows</asp:ListItem>
                                <asp:ListItem Value="0" Selected="True">Autentificacion de Dominio</asp:ListItem>
                            </asp:DropDownList>
                        </td>
                    </tr>
                </table>
            </div>
            <div id="dvCampos" style="display: none;">
                <table>
                    <tr>
                        <td>
                            Campo:
                        </td>
                        <td>
                            <asp:TextBox ID="txtcampo" runat="server" Text="" MaxLength="150"></asp:TextBox>
                        </td>
                    </tr>
                </table>
            </div>
            <div id="dvEquivalencias" style="display: none;">
                <table>
                    <tr style="display:none;">
                        <td>
                            Tipo Sincronización:
                        </td>
                        <td>
                            <asp:DropDownList ID="ddltipoSin" runat="server">
                                <asp:ListItem Value="0">Importación</asp:ListItem>
                                <asp:ListItem Value="1">Exportación</asp:ListItem>
                            </asp:DropDownList>
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 120px;">
                            Campo Pcsistel:
                        </td>
                        <td colspan="3">
                            <asp:DropDownList ID="ddlcampopcsistel" runat="server" Style="width: 210px;">
                            </asp:DropDownList>
                            <asp:TextBox ID="txtcampopcsistel" runat="server" Width="200px" Style="display: none;"></asp:TextBox>
                            <asp:HiddenField ID="hdfcampopcsistel" runat="server" />
                              <asp:DropDownList ID="ddlcampopcsistelAD" runat="server" Width="200px"  Style="display: none;">
                            </asp:DropDownList>
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 120px;">
                            Tipo Campo:
                        </td>
                        <td colspan="3">
                            <asp:DropDownList ID="ddlTipo" runat="server">
                            </asp:DropDownList>
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 120px;">
                            Campo Equivale:
                        </td>
                        <td colspan="3">
                            <asp:DropDownList ID="ddlcampoldap" runat="server" Style="width: 210px;">
                            </asp:DropDownList>
                            <asp:TextBox ID="txtvalorcomun" runat="server"></asp:TextBox>
                        </td>
                    </tr>
                    <tr id ="trObligatorio">
                        <td style="width: 120px;">
                            Obligatorio:
                        </td>
                        <td colspan="3">
                            <asp:CheckBox ID="chkobligatorio" runat="server" />
                        </td>
                    </tr>
                    <tr id="trExtraer">
                        <td style="width: 120px;">
                            Extraer Dato:
                        </td>
                        <td colspan="3">
                            <asp:CheckBox ID="chkExtraerDato" runat="server" />
                        </td>
                    </tr>
                    <tr id="trExtraerDato" style="display: none;">
                        <td>
                            Posición:
                        </td>
                        <td>
                            <asp:TextBox ID="TxtColumna" runat="server" Width="55" MaxLength="5"></asp:TextBox>
                        </td>
                        <td>
                            Longitud:
                        </td>
                        <td>
                            <asp:TextBox ID="TxtLongitud" runat="server" Width="55" MaxLength="5"></asp:TextBox>
                        </td>
                    </tr>
                </table>
            </div>
            <div id="dvPrevio" style="display: none;">
                <table>
                    <tr>
                        <td>
                            Texto a Buscar :
                        </td>
                        <td>
                            <asp:TextBox ID="txtbuscar" runat="server" Width="100px"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Usuarios Disponibles:
                        </td>
                        <td>
                            <asp:DropDownList ID="drpusuarios" runat="server">
                            </asp:DropDownList>
                        </td>
                    </tr>
                </table>
                <br />
                <table id="tbprevio">
                </table>
                <div id="tbprevio_paginator">
                </div>
            </div>
        </center>
    </div>
    </form>
</body>
</html>
