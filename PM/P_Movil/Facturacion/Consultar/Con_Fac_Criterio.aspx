<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Con_Fac_Criterio.aspx.vb"
    Inherits="Con_Fac_Criterio" %>

<%@ Register TagPrefix="cc1" Namespace="VisualSoft.Comun.LibreriaJQ" Assembly="VisualSoft.Comun.LibreriaJQ" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.core.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.tabs.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.accordion.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.draggable.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.datepicker.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.resizable.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <%--kendo --%>
    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.datepicker.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.datetimepicker.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/cultures/kendo.culture.es-ES.min.js" type="text/javascript"></script>


    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>

    <link href="../../../Common/Scripts/select2/select2.min.css" rel="stylesheet" />
    <script src="../../../Common/Scripts/select2/select2.min.js" type="text/javascript"></script>

    <style type="text/css">
        hr {
            border-color: rgba(0,0,0,0.07);
        }
        .select2-container--default .select2-selection--multiple {
            background-color: #FEFEF7;
        }

        #dvResultado {
            padding: 0px !important;
        }
    </style>
</head>
<body>

    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Con_Fac_Criterio.js")%>" type="text/javascript"></script>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfCod" runat="server" />
        <asp:HiddenField ID="hdfNumCri" runat="server" />
        <asp:HiddenField ID="hdfEmpSel" runat="server" />
        <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />
        <div id="dvCargando" class="dvCargando">
        </div>
        <div id="dvCargandoInicial" class="ui-widget-content ui-corner-all" style="position: fixed; left: 50%; top: 50%; padding: 10px; z-index: 1000; width: 128px; height: 70px; text-align: center;">
            <img alt="Cargando" src="../../../Common/Images/Mantenimiento/Cargando.gif" />
            <br />
            Cargando...
        </div>
        <div id="divMsgConfirmacion" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            <asp:Label ID="lblMensajeConfirmacion" runat="server" Text="¿Desea guardar los cambios ?"></asp:Label>
        </div>



        <div id="BarraNavegacionJQ1" class="ui-accordion ui-widget ui-helper-reset" style="margin-left: 0px;">
            <div id="BarraNavegacionJQ1_Panel1" runat="server" style="">
                <h3 class="ui-helper-reset ui-accordion-header ui-state-active ui-corner-top" style="width: 100%; margin-top: 15px; display: block;">
                    <a id="aiconclose_Panel1" href="#" style="cursor: default;">Filtros</a>
                    <div style="position: absolute; right: 30px; top: 15px;">
                        <span
                            id="iconclose_Panel1"
                            class='ui-icon ui-icon-circle-triangle-n' style="margin-left: 95%; display: block;"></span>
                    </div>
                    <input type="hidden" value="1" />
                </h3>
                <div id="BarraNavegacionJQ1_Panel1_O" class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active"
                    runat="server" style="width: 100%; margin: 0px; padding: 0px; padding-top: 15px; padding-bottom: 15px; margin-top: -1px;">
                    <h4 id="BarraNavegacionJQ1_Panel1_O_Item1" runat="server" url="" title="" click=""
                        class="PanelBarraNavegacionItem">
                        <div style="font-weight: normal; padding-left: 10px; padding-right: 10px;">

                            <table style="width: 100%;">
                                <tr>
                                    <td colspan="3">
                                        <table width="100%" border="0">
                                            <tr>
                                                <td style="font-weight: normal; width: 40px;">Desde:&nbsp;
                                                </td>
                                                <td style="width: 90px;">
                                                    <asp:TextBox ID="txtPeriodoDesde" runat="server" CssClass="MESANHO" Width="100px" ></asp:TextBox>
                                                </td>
                                                <td style="font-weight: normal; width: 70px; text-align: right;">Hasta:&nbsp;
                                                </td>
                                                <td style="width: 90px;">
                                                    <asp:TextBox ID="txtPeriodoHasta" runat="server" CssClass="MESANHO" Width="100px" ></asp:TextBox>
                                                </td>

                                                <td></td>

                                                <td style="font-weight: normal; width: 60px; text-align: right;">Operador:&nbsp;</td>
                                                <td style="width: 150px;">
                                                    <asp:DropDownList ID="ddlOperador" runat="server" CssClass="ddlNormal" ToolTip="Seleccione el operador">
                                                    </asp:DropDownList>
                                                </td>

                                                <td style="font-weight: normal; width: 60px; text-align: right;">Cuenta:&nbsp;</td>
                                                <td style="width: 200px;">
                                                    <asp:DropDownList ID="ddlCuenta" multiple="multiple" runat="server" CssClass="ddlNormal" Width="300px">
                                                    </asp:DropDownList>
                                                </td>


                                                <td style="font-weight: normal; width: 100px; display: none;">Tipo de Línea
                                                </td>
                                                <td style="width: 50px; display: none;">
                                                    <asp:DropDownList ID="ddlLineaTipo" runat="server">
                                                    </asp:DropDownList>
                                                </td>



                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3">
                                        <hr />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div id="dvLinea">
                                            <table>
                                                <tr>
                                                    <td colspan="3">Filtro por Líneas</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div id="btnLinea" class="btnNormal" runat="server" style="width: 40px;">
                                                            <table border="0" cellpadding="0" cellspacing="0">
                                                                <tr>
                                                                    <td>
                                                                        <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                        <br />
                                                        <div id="btnQuitarLinea" class="btnNormal" runat="server" style="width: 40px;">
                                                            <table border="0" cellpadding="0" cellspacing="0">
                                                                <tr>
                                                                    <td>
                                                                        <asp:Image ID="imgQuitarLinea" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png" />
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </div>

                                                    </td>
                                                    <td>
                                                        <asp:ListBox ID="lstLinea" runat="server" Width="300px" Height="76px" SelectionMode="Multiple"></asp:ListBox>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </td>
                                    <td>
                                        <div id="dvEmpleado">
                                            <table>
                                                <tr>
                                                    <td colspan="3">Filtro por Empleados</td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td>
                                                        <div id="btnEmpleado" class="btnNormal" runat="server" style="width: 40px;">
                                                            <table border="0" cellpadding="0" cellspacing="0">
                                                                <tr>
                                                                    <td>
                                                                        <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                        <br />
                                                        <div id="btnQuitarEmpleado" class="btnNormal" runat="server" style="width: 40px;">
                                                            <table border="0" cellpadding="0" cellspacing="0">
                                                                <tr>
                                                                    <td>
                                                                        <asp:Image ID="imgQuitarEmpleado" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png" />
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <asp:ListBox ID="lstEmpleado" runat="server" Width="300px" Height="76px" SelectionMode="Multiple"></asp:ListBox>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </td>
                                    <td>
                                        <div id="dvOficinaOrganizativa">
                                            <table>
                                                <tr>
                                                    <td>
                                                        <asp:HiddenField ID="hdfOficinaOrganizativa" runat="server" Value="1" />
                                                        Filtro por:&nbsp;
                                                    </td>
                                                    <td>
                                                        <asp:DropDownList ID="ddlOficinaOrganizativa" runat="server" CssClass="ddlNormal">
                                                            <asp:ListItem Text="Organización" Value="1"></asp:ListItem>
                                                            <asp:ListItem Text="Centro de costo" Value="2"></asp:ListItem>
                                                        </asp:DropDownList>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div id="btnOrganizacion" class="btnNormal" runat="server" style="width: 40px;">
                                                            <table border="0" cellpadding="0" cellspacing="0">
                                                                <tr>
                                                                    <td>
                                                                        <asp:Image ID="Image3" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                        <br />
                                                        <div id="btnQuitarOrganizacion" class="btnNormal" runat="server" style="width: 40px;">
                                                            <table border="0" cellpadding="0" cellspacing="0">
                                                                <tr>
                                                                    <td>
                                                                        <asp:Image ID="imgQuitarOrganizacion" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png" />
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <asp:ListBox ID="lstOrganizacion" runat="server" Width="300px" Height="76px" SelectionMode="Multiple"></asp:ListBox>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3">
                                        <hr />
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3" style="text-align: right;">
                                        <div id="btnEjecutar" class="btnNormal" runat="server" style="width: 140px; margin-bottom: 5px;">
                                            <asp:Image ID="imgEjecutar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Ejecutar.png" />
                                            <a>Ejecutar consulta</a>
                                        </div>
                                        <div id="btnLimpiar" class="btnNormal" runat="server" style="width: 130px; margin-bottom: 5px;">
                                            <img src="../../../Common/Images/Mantenimiento/Borrar.png" alt="Borrar" />
                                            <a>Limpiar criterios</a>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </h4>
                </div>
            </div>
        </div>

        <div id="dvResultado" class="dvPanel ui-widget-content ui-corner-all" style="text-align: center; padding: 0px; background-image: none; margin-top: 10px;">
            <iframe id="ifrResultado" frameborder="0" ></iframe>
        </div>
        


        <div id="dvNumeroLlamado" style="display: none; padding: 0px; margin: 0px;">
            <iframe id="ifNumeroLlamado" width="315" height="335" frameborder="0" style="padding: 0px; margin: 0px;"></iframe>
        </div>

        <div id="dvResultadoLinea" style="display: none; padding: 0px; margin: 0px; overflow: hidden;">
            <iframe id="ifResultadoLinea" width="910" height="570" frameborder="0" style="padding: 0px; margin: 0px;"></iframe>
        </div>

        <div id="dvArea" style="display: none; padding: 0px; margin: 0px; overflow: hidden;">
            <iframe id="ifArea" width="910" height="470" frameborder="0" style="padding: 0px; margin: 0px;"></iframe>
        </div>

        <div id="dvCCO" style="display: none; padding: 0px; margin: 0px;">
            <iframe id="ifCCO" width="590" height="480" frameborder="0" style="padding: 0px; margin: 0px;"></iframe>
        </div>

        <div id="divMsgConfirmar" style="display: none;">
            <asp:Label ID="lblMsjConfirmacion" runat="server"></asp:Label>
    </form>
</body>
</html>
