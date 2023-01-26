<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Imp_ProcesoImportacion.aspx.vb"
    EnableEventValidation="true" Inherits="Imp_ProcesoImportacion" %>
<%@ Register TagPrefix="ttgInfo" TagName="ToolTipGenerico" Src="~/Common/Controles/ToolTipGenerico.ascx" %>
<%@ Register TagPrefix="cc1" Namespace="VisualSoft.Comun.LibreriaJQ" Assembly="VisualSoft.Comun.LibreriaJQ" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet" type="text/css" />
    

    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>

    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/anytime.js" type="text/javascript"></script>
    
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/cultures/kendo.culture.es-ES.min.js" type="text/javascript"></script>
    
    <script src="Imp_ProcesoImportacion.js" type="text/javascript"></script>

</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfbtSobreescribe" runat="server" Value="0" />
        <asp:HiddenField ID="hdfbtPregunto" runat="server" Value="0" />
        <asp:HiddenField runat="server" ID="hdfCodConfigProc"/>
        <asp:HiddenField runat="server" ID="hdfNomArchivo" />
        <asp:HiddenField runat="server" ID="hdfRuta" />
        <asp:HiddenField runat="server" ID="hdfIdOperador" />
        <asp:HiddenField runat="server" ID="hdfIdProg" />
        <asp:HiddenField runat="server" ID="hdfIdTemp"/>
        <div id="dvCargando" class="dvCargando">
        </div>
        
        <cc1:TabJQ runat="server" ID="TabDetalle" CssClass="tabs" style="margin-top:1px;" BorderStyle="None" BorderWidth="0">
            <cc1:ContenedorTabJQ Titulo="Creación de proceso">
                
                <div id="dvContAcordeon" style="float:left; margin-top:10px;">
                    <div id="BarraNavegacionJQ1" class="ui-accordion ui-widget ui-helper-reset" style="margin-left: 0px;">

                        <div id="BarraNavegacionJQ1_Panel3" runat="server" style="">
                            <h3 class="ui-accordion-header ui-helper-reset ui-state-active ui-corner-top" style="width: 100%; margin-top: 7px; display: block;">
                                <a href="#BarraNavegacionJQ1_Panel3_O" style="cursor: default;">Configuración del proceso</a>
                                <span class='ui-icon ui-icon-circle-triangle-n' style="margin-left: 95%; display: none;"></span>
                                <input type="hidden" value="1" />
                            </h3>
                            <div id="BarraNavegacionJQ1_Panel3_O" class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active"
                            runat="server" style="width: 100%; margin: 0px; padding: 0px; padding-top: 5px;
                            padding-bottom: 5px; margin-top: -1px;">
                                <h4 id="BarraNavegacionJQ1_Panel3_O_Item1" runat="server" url="" title="" click=""
                                class="PanelBarraNavegacionItem">
                                    <div style="font-weight: normal; padding-left: 10px; padding-right: 10px;">
                                        <table width="100%">
                                            <tr style="height: 40px">
                                                <td style="width: 170px">
                                                    <asp:RadioButtonList ID="rbProgramacion" runat="server" RepeatDirection="Horizontal">
                                                        <asp:ListItem Selected="True" Value="0">Ahora</asp:ListItem>
                                                        <asp:ListItem Value="1">Programado</asp:ListItem>
                                                    </asp:RadioButtonList>
                                                </td>
                                                <td>
                                                    <asp:TextBox ID="txtFechaProgramacion" runat="server" CssClass="DATETIME" Width="195px"
                                                        MaxLength="16"></asp:TextBox>
                                                </td>
                                            </tr>
                                        </table>
                                        <table runat="server" border="0" width="100%">
                                            <tr>
                                                <td style="width: 150px">
                                                    Operador
                                                </td>
                                                <td style="padding-left: 20px">
                                                    <asp:DropDownList ID="ddlOperador" runat="server" Width="200px">
                                                    </asp:DropDownList>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Configuración
                                                </td>
                                                <td style="padding-left: 15px">
                                                    <table>
                                                        <tr>
                                                            <td>
                                                                <asp:DropDownList ID="ddlProcesoOrigen" runat="server" Width="200px"></asp:DropDownList>
                                                                <asp:HiddenField runat="server" ID="hdfExt"/>
                                                            </td>
                                                       </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Plantilla
                                                </td>
                                                <td style="padding-left: 15px">
                                                    <table>
                                                        <tr>
                                                            <td>
                                                                <asp:HiddenField runat="server" ID="hdfIdPlantilla"/>
                                                                <asp:TextBox ID="txtPlantilla" runat="server" Width="190px" MaxLength="50" ReadOnly="True"></asp:TextBox>
                                                             <%--   <asp:DropDownList ID="ddlPlantilla" runat="server" Width="140px"></asp:DropDownList>--%>
                                                            </td>
                                                       </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr style="height: 50px" id="trCarArc">
                                                <td>Archivo</td>
                                                <td>
                                                    <%--<label id="lblMsj" runat="server" style="padding-left: 16px">(*) Seleccione configuración</label>--%>
                                                    <div id="ifrmCargar" runat="server">
                                                        <iframe id="ifCargarArchivo" frameborder="0" style="padding-top: 0px; padding-bottom: 0px; margin: 0px;"
                                                            width="450px" height="50px"></iframe>
                                                    </div>
                                                </td>
                                            </tr>
                                           
                                            <tr>
                                                <td colspan="2">
                                                    <asp:CheckBox ID="chkBandEmpl" runat="server" Text="Registrar un nuevo empleado por cada línea registrada y asignarla al empleado creado." Checked="True" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <asp:CheckBox ID="chkElimCuentas" runat="server" Text="Eliminar cuentas" Checked="False" />
                                                </td>
                                            </tr>
                                        </table>
                                        
                                    </div>
                                </h4>
                            </div>
                        </div>
                    </div>
                    <br />

                </div>
                
            </cc1:ContenedorTabJQ>

        </cc1:TabJQ>
        <br/><br/>
        <div>
            <br /><br /><br/><br/>
            <asp:Button ID="btnGuardarSer" runat="server" Text="" />
            
            <div id="btnGuardar" class="btnNormal">
                <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Generar16.png" />
                <a>Procesar</a>
            </div>
            <div id="btnCerrar" class="btnNormal">
                <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                <a>Salir</a>
            </div>
        </div>
    </form>
</body>
</html>
