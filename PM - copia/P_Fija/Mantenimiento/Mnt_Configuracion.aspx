<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Mnt_Configuracion.aspx.vb" Inherits=".Mnt_Configuracion" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />

    <script type="text/javascript" src="../../Common/Scripts/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery-ui.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jquery.uniform.min.js"></script>
    <%--<script type="text/javascript" src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js"></script>--%>


    <script type="text/javascript" src="../../Common/Scripts/Utilitario.js"></script>
    <script type="text/javascript" src="Mnt_Configuracion.js"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfIdMantenimiento" runat="server" />
    <asp:HiddenField ID="hdfNumeroRegistro" runat="server" />
    <div id="dvCargando" class="dvCargando"></div>
    <div class="dvPanel" style="overflow:auto;">
        <cc1:AccordionJQ ID="AccordionJQ1" runat="server" EnableViewState="true" CssClass="accordion" style="overflow:auto;" TabIndex="0">
            <cc1:ContenedorAccodion Texto="Información General" ID="accInformacionGeneral">
                <table>
                    <tr>
                        <td class="tdEtiqueta">
                            Código
                        </td>
                        <td class="" >
                            <asp:TextBox ID="txtCodigo" runat="server" MaxLength="10" Width="80px"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            Nombre
                        </td>
                        <td class="" >
                            <asp:TextBox ID="txtNombre" runat="server" MaxLength="100" Width="300px"></asp:TextBox>
                        </td>
                    </tr>
                    <tr id="trEstado" runat="server">
                        <td class="tdEtiqueta">
                            Activo
                        </td>
                        <td class="" >
                            <asp:CheckBox ID="chkEstado" runat="server" />
                        </td>
                    </tr>
                </table>
            </cc1:ContenedorAccodion>
            <cc1:ContenedorAccodion Texto="Campos" ID="ContenedorAccodion1">
                <div style="float:left; margin-right:10px;">
                    <table id="tbCamposExtras"></table>
                </div>
                <div>
                    <div id="btnAgregar" class="btnNormal" style="width:100px;">
                        <img alt="Agregar" src="../../Common/Images/Mantenimiento/add_16x16.gif" />
                        <a>Agregar</a>
                    </div>
                    <br />
                    <div id="btnEditar" class="btnNormal" style="width:100px;">
                        <img alt="Editar" src="../../Common/Images/Mantenimiento/edit_16x16.gif" />
                        <a>Editar</a>
                    </div>
                    <br />
                    <div id="btnEliminar" class="btnNormal" style="width:100px;">
                        <img alt="Eliminar" src="../../Common/Images/Mantenimiento/delete_16x16.gif" />
                        <a>Eliminar</a>
                    </div>
                </div>
            </cc1:ContenedorAccodion>
        </cc1:AccordionJQ>
        <div style="margin-top:2px;">
            <div id="btnGuardar" class="btnNormal">
                <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                <a>Guardar</a>
            </div>
            <div id="btnCerrar" class="btnNormal">
                <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                <a>Cerrar</a>
            </div>
        </div>
        <div id="dvCampo" style="display:none;">
            <table>
                <tr>
                    <td>
                        Nombre
                    </td>
                    <td>
                        <asp:TextBox ID="txtNombreCampo" runat="server"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        Tipo de Dato
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlTipoDato" runat="server"></asp:DropDownList>
                    </td>
                </tr>
                <tr id="trParametroLista" style="display:none;" class="ParametrosCampo">
                    <td>
                        Parametros
                    </td>
                    <td>
                        <div style="float:left; margin-right:10px;">                            
                            <asp:TextBox ID="txtParametro" runat="server"></asp:TextBox>
                            <img id="btnAgregarParametro" alt="Agregar" src="../../Common/Images/Mantenimiento/add_16x16.gif" class="imgBtn"/>
                            <table id="tbParametro"></table>
                        </div>
                        <div style="float:left; margin-top:30px;">
                            <div id="btnEditarParametro" class="btnNormal" style="width:100px;">
                                <img alt="Editar" src="../../Common/Images/Mantenimiento/edit_16x16.gif" />
                                <a>Editar</a>
                            </div>
                            <br />
                            <div id="btnEliminarParametro" class="btnNormal" style="width:100px;">
                                <img alt="Eliminar" src="../../Common/Images/Mantenimiento/delete_16x16.gif" />
                                <a>Eliminar</a>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr id="trParametroTexto" style="display:none;" class="ParametrosCampo">
                    <td>
                        Longitud
                    </td>
                    <td>
                        <asp:TextBox ID="txtLongitud" runat="server" MaxLength="3"></asp:TextBox>
                    </td>
                </tr>
                <tr id="trParametroDecimal" style="display:none;" class="ParametrosCampo">
                    <td>
                        Número de Decimales
                    </td>
                    <td>
                        <asp:TextBox ID="txtNumeroDecimales" runat="server" MaxLength="1"></asp:TextBox>
                    </td>
                </tr>
                <tr style="display:none;" class="ParametrosCampo trParametroBool">
                    <td>
                        Verdadero
                    </td>
                    <td>
                        <asp:TextBox ID="txtValorVerdadero" runat="server" MaxLength="15"></asp:TextBox>
                    </td>
                </tr>
                <tr style="display:none;" class="ParametrosCampo trParametroBool">
                    <td>
                        Falso
                    </td>
                    <td>
                        <asp:TextBox ID="txtValorFalso" runat="server" MaxLength="15"></asp:TextBox>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    </form>
</body>
</html>
