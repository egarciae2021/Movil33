<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Imp_CrearCuenta.aspx.vb" Inherits="Imp_CrearCuenta" %>
<%@ Register TagPrefix="ttgInfo" TagName="ToolTipGenerico" Src="~/Common/Controles/ToolTipGenerico.ascx" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
        <link  href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.button.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqGrid/grid.base.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqGrid/grid.common.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqGrid/grid.formedit.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqGrid/jquery.fmatter.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqGrid/JsonXml.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqGrid/jqDnR.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqGrid/jqModal.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqGrid/grid.jqueryui.js"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <link href="../../../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/date.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/anytime.js" type="text/javascript"></script>

    <script src="Imp_CrearCuenta.js" type="text/javascript"></script>
        <style>
            #General
            {
                width:1024px;
                /*height:891px;*/
                height:350px;
             /*   margin:auto;*/
             /*   border: 1px solid skyblue; */
                border-radius:10px;
                
            }
            
            #pnlRendimientoLis
            {
                overflow:hidden;
                 height:400px;
                 float:left;
            }


        </style>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfCuenta" runat="server" />
        <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />
        <div id="dvCargando" class="dvCargando"></div>
        <div id="dvContAcordeon" style="float:left; margin-top:10px; width: 100%;">
            <div id="BarraNavegacionJQ1" class="ui-accordion ui-widget ui-helper-reset" style="margin-left: 0px;">
                <div id="BarraNavegacionJQ1_Panel5" runat="server" style="">
           <%--     <b><span id="spMensaje" style="color: #CC0000;">En el archivo adjunto se encontró Cuenta(s) que no está(n) registrada(s). Para continuar con el proceso antes deberá registrarla(s).</span></b>
            <br/><br/>--%>
            
            <h3 class="ui-accordion-header ui-helper-reset ui-state-active ui-corner-top" style="width: 100%; margin-top: 7px; display: block;">
                                <a href="#BarraNavegacionJQ1_Panel3_O" style="cursor: default;">En el archivo adjunto se encontró Cuenta(s) que no está(n) registrada(s). Para continuar con el proceso antes deberá registrarla(s).</a>
                                <span class='ui-icon ui-icon-circle-triangle-n' style="margin-left: 90%; display: none;"></span>
                                <input type="hidden" value="1" />
                            </h3>
              
             <div id="pnlRendimientoLis" class="pnlInformacion">
                   <%-- <div class="ui-state-active" style="text-align: center; border-radius: 5px; font-size: 12px; padding: 3px">
                        Cuentas a registrar
                    </div>--%>
                    <div class="dvPanel" style="overflow: auto;">
                        <table width="100%">
                            <tr style="height: 238px">
                                <td>
                                    <table id="tbCuenta"></table>
                                    <div id="Paginador"></div>
                                </td>
                            </tr>
                            
                       </table>
                    </div>
                </div>
             <div id="pnlDistribucionCue" class="pnlInformacion">
                  <%--  <div class="ui-state-active" style="text-align: center; border-radius: 5px; font-size: 12px; padding: 3px">
                        Registro
                    </div>--%>
                    <div class="dvPanel" style="overflow: auto; width: 580px;">
                        <table width="100%">
                            <tr>
                                <td>
                                    <table width="100%" id="tbCamposDinamicos" runat="server">
                                        <tr>
                                            <td class="tdEtiqueta">                                        
                                                <asp:Label ID="lblCodigo" runat="server" Text="Código"></asp:Label>
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtCodigo" runat="server" Width="150px" MaxLength="20"></asp:TextBox>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="tdEtiqueta">
                                                <asp:Label ID="lblNombre" runat="server" Text="Nombre"></asp:Label>                                        
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtNombre" runat="server" Width="240px" MaxLength="100"></asp:TextBox>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:Label ID="lblOperador" runat="server" Text="Operador"></asp:Label>                                        
                                            </td>
                                            <td>
                                              <table>
                                                  <tr>
                                                      <td>
                                                          <asp:DropDownList ID="ddlOperador" runat="server" Width="249px"></asp:DropDownList>
                                                      </td>
                                                      <td>
                                                        <div id="dvInfoOpe" style="display: none;">
                                                          <ttgInfo:ToolTipGenerico ID="ttgInfoEditOpe" runat="server" Mensaje="No puede editar el campo Operador, la cuenta seleccionada tiene líneas asociadas." />
                                                        </div>
                                                      </td>
                                                  </tr>
                                              </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:Label ID="lblTipoLinea" runat="server" Text="Tipo"></asp:Label>
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlLineaTipo" runat="server" Width="249px"></asp:DropDownList>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <asp:Label ID="lblFechaInicioContrato" runat="server" Text="Fecha Inicio Contrato"></asp:Label>                                        

                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtFechaInicioContrato" runat="server" Width="80px" AutoPostBack="false" CssClass="txtFecha" MaxLength="100"></asp:TextBox>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:Label ID="lblFechaFinContrato" runat="server" Text="Fecha Fin Contrato"></asp:Label>                                        
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtFechaFinContrato" runat="server" CssClass="txtFecha" AutoPostBack="false" Width="80px" MaxLength="100"></asp:TextBox>
                                            </td>
                                        </tr>
                                        
                                        <tr id="trPeriodoFacturacion">
                                            <td>
                                                <asp:Label ID="lblPeriodoFacturacion" runat="server" Text="Tipo de facturación"></asp:Label>                                        
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlPeriodoFacturacion" runat="server" Width="249px"></asp:DropDownList>
                                                <asp:HiddenField ID ="HdfPeriodoFacturacion" runat="server"  />
                                            </td>
                                        </tr>
                                        <tr id="trPeriodo" runat="server">
                                            <td class="tdEtiqueta">
                                                <asp:Label ID="lblFechaFacturacion" runat="server" Text="Día facturación"></asp:Label>                                        
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlDiaInicial" runat="server" Width="50px" CssClass="k-edit"></asp:DropDownList>
                                                <asp:HiddenField ID ="HdfDiaInicial" runat="server"  />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="tdEtiqueta">
                                                <asp:Label ID="lblAsignacionCredito" runat="server" Text="Asignación de crédito"></asp:Label>                                        
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlAsignacionCredito" runat="server" Width="249px"></asp:DropDownList>
                                            </td>
                                        </tr>
                                        <tr class="dvAsignacion">
                                            <td class="tdEtiqueta">
                                                <asp:Label ID="lblMontoCuenta" runat="server" Text="Monto de cuenta"></asp:Label>                                        
                                            </td>
                                            <td>
                                                <asp:Label ID="lblMonto" runat="server" CssClass="lblNormal" Text="" Height="15px" Width="100px"></asp:Label>
                                            </td>
                                        </tr>
                                        
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <%--<br />--%>
                    <div style="text-align:left; padding-top: 5px;">            
                        <div id="btnGuardar" class="btnNormal">
                            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png"/>
                            <a>Guardar</a>
                        </div>
                    </div>
                </div>
                </div>
            
                
                
           
           </div>
        </div>
        <br/>
    </form>
</body>
</html>
