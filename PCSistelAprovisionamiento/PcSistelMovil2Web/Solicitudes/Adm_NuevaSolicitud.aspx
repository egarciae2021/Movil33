<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Adm_NuevaSolicitud.aspx.cs" Inherits="PcSistelMovil2Web.Solicitudes.Adm_NuevaSolicitud" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    
    <link href="../Styles/Sitio.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/JqueryThemeRoller/redmond/jquery-ui-1.8.16.custom.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />  
    <script src="../Scripts/json2.js" type="text/javascript"></script>
    
    <script src="../Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
  
    <script src="../Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>

    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="../Common/Styles/Principal2.css" rel="stylesheet" type="text/css" />
    


    <script src="Adm_NuevaSolicitud.js" type="text/javascript"></script>
    <style type="text/css">
        .style1
        {
            width: 57px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfIdSolicitud" runat="server" />
    <asp:HiddenField ID="hdfOperador" runat="server" />
    <asp:HiddenField ID="hdfEditar" runat="server" />
    <asp:HiddenField ID="hdfEditarTitular" runat="server" />
    <asp:HiddenField ID="hdfTipoGuardar" runat="server" />
    <asp:HiddenField ID="hdfTipoSolicitud" runat="server" />  
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
                    <asp:Label ID="Label13" runat="server" Text="Nombre"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtnombreT1" runat="server" Width="180px"  MaxLength="50"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="Label14" runat="server" Text="Apellido"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtapeT1" runat="server" Width="180px" MaxLength="100"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="Label12" runat="server" Text="Correo"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtcorreoT1" runat="server" Width="180px" MaxLength="100"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                </td>
                <td>
                </td>
            </tr>
        </table>
         <asp:Label runat="server" ID="lbl_error" CssClass="error_ms"></asp:Label>
        <div id="dvModalAcciones" style="float:right; margin-top:30px;">
        <div id="btnTituAdd" class="btnNormal" style="width: 80px;">
            <a>Agregar</a>
        </div>
        <div id="btnTituCerrar" class="btnNormal" style="width: 80px;">
            <a>Cerrar</a>
        </div>
        </div>
      
    </div>
    <%-- Fin Moldal Titulares--%>
    <div>
        <br />
        <div id="dvdetalle" class="dvPanel" style="margin-left: 5px; margin-right: 5px; background">
            <table id="tbTipo" runat="server">
                <tr>
                    <%--    <td>
        <asp:Label ID="Label1" runat="server" Text="Empleado"></asp:Label>
    </td>
        
    <td><asp:TextBox ID="TextBox1" runat="server" Width="210px"></asp:TextBox></td>
    <td style="width:100px;"></td>--%>
                    <td>
                        <asp:Label ID="Label2" runat="server" Text="Tipo de Solicitud"></asp:Label>
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlTipo" runat="server" CssClass="form-control">
                        </asp:DropDownList>
                    </td>
                </tr>
                <tr><td style="height:10px;"></td></tr>
                <tr id="trEmpresaBusqueda" style="display:none;"><td style="width:100px;">Buscar Empresa</td><td><asp:TextBox ID="txtEmpresaBusqueda" runat="server" Width="200px" MaxLength="90"></asp:TextBox></td></tr>
            </table>
            <br />
            <div id="dvSolicitudAlta" style="display: none;">
                <table>
                    <tr>
                        <td colspan="2" style="height: 30px;">
                            <a style="font-size: 12px; color: #084B8A;">Datos Empresa</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 100px;">
                            <asp:Label ID="Label1" runat="server" Text="Nombre"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtnomempresa" runat="server" Width="300px" MaxLength="200"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label ID="Label3" runat="server" Text="Razón Social"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtrazon" runat="server" Width="300px"  MaxLength="200"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label ID="Label4" runat="server" Text="RUC"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtRuc" runat="server" Width="300px" MaxLength="15"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label ID="Label5" runat="server" Text="País"></asp:Label>
                        </td>
                        <td>
                            <asp:DropDownList ID="ddlPais" runat="server" CssClass="form-control" Width="310px">                              
                            </asp:DropDownList>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" style="height: 30px;">
                            <a style="font-size: 12px; color: #084B8A;">Información de Contrato</a>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <table id="tbFecha">
                                <tr>
                                    <td style="width: 95px;">
                                        <asp:Label ID="Label6" runat="server" Text="Fecha Inicio" ></asp:Label>
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtFechaI" runat="server" Width="110px" ReadOnly="True"  MaxLength="10"></asp:TextBox>
                                    </td>
                                    <td style="width: 20px;">
                                    </td>
                                    <td>
                                        <asp:Label ID="Label7" runat="server" Text="Fecha Fin"></asp:Label>
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtFechaFin" runat="server" Width="110px" ReadOnly="True"  MaxLength="10"></asp:TextBox>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label ID="Label8" runat="server" Text="Observación" ></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtObs" runat="server" Width="300px"  MaxLength="400"></asp:TextBox>
                        </td>
                    </tr>
                    <tr style="display: none;">
                        <td>
                            <asp:Label ID="Label9" runat="server" Text="Descripción"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtdesc" runat="server" Width="300px"  MaxLength="400"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" style="height: 30px;">
                            <a style="font-size: 12px; color: #084B8A;">Información de Licencia</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label ID="Label10" runat="server" Text="Tipo de Licencia"></asp:Label>
                        </td>
                        <td>
                            <asp:DropDownList ID="ddLicencia" runat="server" CssClass="form-control" Width="310px">                       
                            </asp:DropDownList>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label ID="Label11" runat="server" Text="N° de Líneas"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtLineas" runat="server" Width="110px"  MaxLength="10"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" style="height: 30px;">
                            <a style="font-size: 12px; color: #084B8A;">Titulares</a>
                        </td>
                        <td id="tdADDTitulares" runat="server">
                            <div id="btnADD" class="btnNormal">
                                <img src="../Common/images/Mantenimiento/add_16x16.gif" /></div>
                                <div id="btnEditar" class="btnNormal" runat="server" title="Editar Seleccionado">
                                <asp:Image ID="imgEditar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" />
                            </div>
                            <div id="btnDel" class="btnNormal">
                                <img src="../Common/images/Mantenimiento/delete_16x16.gif" /></div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="10">
                            <table id="grid">
                            </table>
                            <div id="pgrid">
                            </div>
                        </td>
                    </tr>
                </table>
                </td> </tr> </table>
            </div>
        </div>
        <br />
        <div id="dvAcciones" style="margin-left: 5px;">
            <div id="btnFinalizar" runat="server" class="btnNormal" style="width: 100px;">
                <asp:Image ID="Image4" runat="server" Style="width: 14px; vertical-align: bottom;"
                    ImageUrl="../Common/Images/save.ico" />
                Grabar
            </div>
            <div id="btnCancelar" runat="server" class="btnNormal">
                <asp:Image ID="Image6" runat="server" Style="width: 14px; vertical-align: bottom;"
                    ImageUrl="../Common/Images/Mantenimiento/Salir.gif" />
                Cerrar
            </div>
        </div>
    </div>
    </form>
</body>
</html>
