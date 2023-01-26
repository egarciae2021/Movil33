<%@ Page Language="VB" AutoEventWireup="false" Inherits="General_Administrar_Proceso_General_Mnt_Plantilla"
    CodeBehind="Mnt_Plantilla.aspx.vb" %>

<%@ Register src="../../../../Common/Controles/ToolTipGenerico.ascx" tagname="ToolTipGenerico" tagprefix="ttgInfo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../../../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet"
        type="text/css" />
    <script type="text/javascript" src="../../../../Common/Scripts/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqueryui/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqueryui/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqueryui/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqueryui/jquery.ui.button.js"></script>
    <script src="../../../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/JqueryUI/jquery.ui.autocomplete.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/jquery.cookie.js" type="text/javascript"></script>
    <link href="../../../../Common/Scripts/dynaTree/ui.dynatree.css" rel="stylesheet"
        type="text/css" id="skinSheet">
    <script src="../../../../Common/Scripts/dynaTree/jquery.dynatree-1.2.4.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="Mnt_Plantilla.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfCodigo" runat="server" />
    <asp:HiddenField ID="hdfEstado" runat="server" />
    <asp:HiddenField ID="hdfEntidad" runat="server" />
    <asp:HiddenField ID="hdfTabla" runat="server" />
    <asp:HiddenField ID="hdfAccion" runat="server" />
    <asp:HiddenField ID="hdfUsaLongProc" runat="server" />
    <div id="dvCargando" class="dvCargando">
    </div>
    <div class="dvPanel" style="overflow: auto;">
        <table width="100%">
            <tr>
                <td>
                    <table width="100%">
                        <tr>
                            <td>
                                <asp:Label ID="lblPlantilla" runat="server" Text="Nombre Plantilla:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtnombre" runat="server" Width="150px" MaxLength="50"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lbldescripcion" runat="server" Text="Descripción:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtdescripcion" runat="server" Style="width: 300px; resize: none;"
                                    MaxLength="500" TextMode="MultiLine"></asp:TextBox>
                            </td>
                        </tr>
                        <tr id="trTipoFuente" runat="server">
                            <td>
                                <asp:Label ID="lblEntidad" runat="server" Text="Entidad:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtEntidad" runat="server" Width="150px" MaxLength="50"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblnombreArchivo" runat="server" Text="Posición de Fila:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtposicionfila" runat="server" Width="50px" MaxLength="4"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 200px;">
                                <asp:Label ID="lblHoja" runat="server" Text="Identificador/Hoja (Solo Excel):"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtIdentificador" runat="server" Width="150px" MaxLength="1024"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblIdentificador" runat="server" Text="Separador (txt):"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtSeparador" runat="server" Width="50px" MaxLength="1"></asp:TextBox>
                            </td>
                        </tr>
                        <tr id="trEstado" runat="server">
                            <td class="TituloMant" id="tdEstado">
                                Estado
                            </td>
                            <td class="ValorMant">
                                <asp:CheckBox Text="Activo" ID="chActivo" runat="server" MaxLength="50" Width="199px" AutoPostBack="false"></asp:CheckBox>
                            </td>
                        </tr>















                        <%--                        <tr id="trEstado" runat="server">
                            <td class="TituloMant" id="tdEstado" style="display: none;">
                                Estado
                            </td>
                            <td class="ValorMant">
                                <asp:CheckBox Text="Activo" ID="chActivo" runat="server" MaxLength="50" Width="199px"
                                    AutoPostBack="false" Visible="false"></asp:CheckBox>
                            </td>
                        </tr>--%>
                    </table>
                </td>
            </tr>
        </table>
    </div>
    <br />
    <div id="gridCampos" class="dvPanel" style="overflow: auto;">
        <div id="grid" style="width: 800px;">
        </div>
    </div>
    <br />
    <div style="text-align: left;">
        <div id="btnGuardar" class="btnNormal">
            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
            <a>Guardar</a>
        </div>
        <div id="btnCerrar" class="btnNormal">
            <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
            <a>Cerrar</a>
        </div>
    </div>
    <br />
    <div id="PanelCampos" style="overflow: auto;">
        <%--    <table>
            <tr>
                <td>
                    <asp:Label ID="lblNombreCampo" runat="server" Text="Nombre Campo:"></asp:Label>
                </td>
                <td colspan="2">
                    <asp:DropDownList ID="ddlNombreCampo" runat="server" Width="150px">
                    </asp:DropDownList>
                </td>
            </tr>
            <tr>
                <td>
                    &nbsp;
                </td>
                <td>
                    <asp:Label ID="lblNombreCampo0" runat="server" Text="Tabla Base:"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtTablaBase" runat="server" Width="150px">
                    </asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    &nbsp;
                </td>
                <td>
                    <asp:Label ID="lblNombreCampo1" runat="server" Text="Campo Foraneo:"></asp:Label>
                </td>
                <td>
                    <asp:DropDownList ID="ddlcampoforaneo" runat="server" Width="150px">
                    </asp:DropDownList>
                </td>
            </tr>
            <tr>
                <td>
                    &nbsp;
                </td>
                <td>
                    <asp:Label ID="lblNombreCampo2" runat="server" Text="Tabla Destino:"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txttabladestino" runat="server" Width="150px" MaxLength="50"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    &nbsp;
                </td>
                <td>
                    <asp:Label ID="lblNombreCampo3" runat="server" Text="Campo Mostrar:"></asp:Label>
                </td>
                <td>
                    <asp:DropDownList ID="ddlcampomostrar" runat="server" Width="150px">
                    </asp:DropDownList>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="lblNombreCampo4" runat="server" Text="Descripción:"></asp:Label>
                </td>
                <td colspan="2">
                    <asp:TextBox ID="txtdescripcionCampo" runat="server" Width="150px" MaxLength="150"
                        Enabled="False"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="lblNombreCampo5" runat="server" Text="Orden:"></asp:Label>
                </td>
                <td colspan="2">
                    <asp:TextBox ID="txtorden" runat="server" Width="50px" MaxLength="50" Enabled="False"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="lblNombreCampo6" runat="server" Text="Longitud:"></asp:Label>
                </td>
                <td colspan="2">
                    <asp:TextBox ID="txtlongitud" runat="server" Width="50px" MaxLength="50" Enabled="False"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="lblNombreCampo7" runat="server" Text="Tipo Dato:"></asp:Label>
                </td>
                <td colspan="2">
                    <asp:TextBox ID="txttipodato" runat="server" Width="150px" MaxLength="50" Enabled="False"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:CheckBox Text="Primary Key" ID="chkPK" runat="server" MaxLength="50" Width="100px"
                        AutoPostBack="false" Enabled="False"></asp:CheckBox>
                </td>
                <td>
                    <asp:CheckBox Text="Permite Null" ID="chkPN" runat="server" MaxLength="50" Width="100px"
                        AutoPostBack="false" Enabled="False"></asp:CheckBox>
                </td>
                <td>
                    <asp:CheckBox Text="Identity" ID="chkIdentity" runat="server" MaxLength="50" Width="100px"
                        AutoPostBack="false" Enabled="False"></asp:CheckBox>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:CheckBox Text="Default" ID="chkdefault" runat="server" MaxLength="50" Width="100px"
                        AutoPostBack="false" Enabled="False"></asp:CheckBox>
                </td>
                <td>
                    <asp:Label ID="lblNombreCampo8" runat="server" Text="Valor Default:"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtvalorDefault" runat="server" Width="100px" MaxLength="50" Enabled="False"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <asp:CheckBox Text="Usar Campo para el Proceso" ID="chkuso" runat="server" MaxLength="50"
                        Width="200px" AutoPostBack="false"></asp:CheckBox>
                </td>
                <td>
                    <asp:Label ID="lblNombreCampo9" runat="server" Text="Posición Columna:"></asp:Label>
                    <asp:TextBox ID="txtposiciocolumna" runat="server" Width="50px" MaxLength="50"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    &nbsp;
                </td>
                <td>
                    &nbsp;
                </td>
                <td>
                    &nbsp;
                </td>
            </tr>
        </table>--%>
        <div id="divTreeTablasRelacion" style="height: 270px">
        </div>
    </div>
    <div id="PanelCampoUbicacion" style="overflow: auto;">
        <table>
            <th colspan="2">
                <div id="MensUbicacion">
                </div>
            </th>
            <tr>
                <td>
                    <asp:Label ID="lblDescripcionCampo" runat="server" Text="Descripción:" Width="150px"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtdescripcionCampo" runat="server" Width="100px" MaxLength="50"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="lblUso" runat="server" Text="Uso:" Width="150px"></asp:Label>
                </td>
                <td>
                    <asp:CheckBox ID="chkUso" runat="server" Checked="true" />
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="lblnombreArchivo1" runat="server" Text="Posición:" Width="150px"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtposicioncolu" runat="server" Width="50px" MaxLength="4"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="lblnombreArchivo2" runat="server" Text="Ident/Hoja (Solo Excel):"
                        Width="150px"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtubicacion" runat="server" Width="150px" MaxLength="30"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="lblLongitud" runat="server" Text="Longitud (txt,csv):" Width="150px"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtLongitud" runat="server" Width="50px" MaxLength="3"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="lblTipoFormato" runat="server" Text="Tipo Formato" Width="150px"></asp:Label>
                </td>
                <td>
                    <table cellpadding="0" cellspacing="0">
                        <tr>
                            <td>
                                <asp:DropDownList ID="ddlTipoFormato" runat="server">
                                    <asp:ListItem Value="-1" Text="Ninguno"></asp:ListItem>
                                    <asp:ListItem Value="1" Text="Decimal"></asp:ListItem>
                                    <asp:ListItem Value="2" Text="Fecha"></asp:ListItem>
                                </asp:DropDownList>
                            </td>
                            <td>
                                <ttgInfo:ToolTipGenerico ID="ttgInfoTipoFormato" runat="server" Mensaje="Permite definir el tipo de formato para un campo en la plantilla"/>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr id="trFormatoCampo" style="display:none;">
                <td>
                    <asp:Label ID="lblFormatoCampo" runat="server" Text="Formato" Width="150px"></asp:Label>
                </td>
                <td>
                    <table id="tbFormatoTexto" style="display:none;" cellpadding="0" cellspacing="0">
                        <tr>
                            <td>
                                <asp:TextBox ID="txtFormatoTexto" runat="server" Width="150px" MaxLength="50"></asp:TextBox>
                            </td>
                            <td>
                                <ttgInfo:ToolTipGenerico ID="ttgInfoFormatoTexto" runat="server" Mensaje="Defina la cantidad de digitos enteros y dicimales para tipo de datos decimales que se encuentran en la plantilla como texto" />
                            </td>
                        </tr>                        
                    </table>
                    <table id="tbFormatoFecha" style="display:none;" cellpadding="0" cellspacing="0">
                        <tr>
                            <td>
                                <asp:DropDownList ID="ddlFormatosFecha" runat="server" Width="100px">
                                    <asp:ListItem Value="dd/MM/yyyy" Text="dd/MM/yyy"></asp:ListItem>
                                    <asp:ListItem Value="yyyyMMdd" Text="yyyyMMdd"></asp:ListItem>
                                </asp:DropDownList>
                            </td>
                            <td>
                                <ttgInfo:ToolTipGenerico ID="ttgInfoFormatoFecha" runat="server" Mensaje="Defina el formato de fecha que se encuentra en la plantilla" />
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
    <div id="divMsgConfirmar" style="display:none;">
        <asp:Label id="lblMsjConfirmacion" runat="server"></asp:Label>
    </div>
    </form>
</body>
</html>
