<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Configurar_Cam_Conf_LugarEntrega" Codebehind="Cam_Conf_LugarEntrega.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/knockout-2.3.0.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Cam_Conf_LugarEntrega.js" type="text/javascript"></script>
    <%--<script type="text/javascript"></script>--%>
</head>
<body>
    <form id="form1" runat="server">
        <div id="dvContenido">
            <div id="dvCampos" class="dvPanel">
                <table>
                    <tr>
                        <td>
                            Cancelar pedidos
                        </td>
                        <td>
                            <input id="Checkbox1" type="checkbox" checked="checked"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Días máximos para Cancelar pedidos
                        </td>
                        <td>
                            <asp:TextBox ID="TextBox1" runat="server" Text="3"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Días máximos para Cancelar pedidos antes del fin de campaña
                        </td>
                        <td>
                            <asp:TextBox ID="TextBox2" runat="server" Text="3"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblMigrarContrato" runat="server" text="Migrar Contrato"></asp:Label>
                        </td>
                        <td>
                            <input id="chkMigrarContrato" type="checkbox" checked="checked"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Modificar pedidos
                        </td>
                        <td>
                            <input id="Checkbox2" type="checkbox" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Reservar Productos
                        </td>
                        <td>
                            <input id="Checkbox3" type="checkbox" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Días máximos de reserva
                        </td>
                        <td>
                            <asp:TextBox ID="TextBox3" runat="server" Text="0"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Días máximos para reservar pedidos antes del fin de campaña
                        </td>
                        <td>
                            <asp:TextBox ID="TextBox4" runat="server" Text="0"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Lugar de entrega
                        </td>
                        <td>
				            <div style="font-size:8pt; margin-top:3px;">
					            <label>
						            <input type="radio" name="rblstLugarEntrega" value="C" /> Centros de atención del operador
					            </label>
					            <label>
						            <input type="radio" name="rblstLugarEntrega" value="O" checked="checked"/> Oficinas propias
					            </label>
				            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Genera Código
                        </td>
                        <td>
                            <input id="chkGeneraCodigo" type="checkbox" checked="checked"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Formato Código
                        </td>
                        <td>
                            <asp:TextBox ID="txtFormatoCodigo" runat="server" Text="CAM-MMMM-YYYY"></asp:TextBox>
                        </td>
                    </tr>
                </table>
            </div>
            <div id="dvAcciones" style="margin-top:2px;">
                <div id="btnGuardar" class="btnNormal">
                    <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                    <a>Guardar</a>
                </div>
                <div id="btnCerrar" class="btnNormal">
                    <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                    <a>Cerrar</a>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
