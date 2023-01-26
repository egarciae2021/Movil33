<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="PlantillaCSV.aspx.vb" Inherits=".PlantillaCSV" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
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

    <script src="PlantillaCSV.js" type="text/javascript"></script>
    <script src="PlantillaCSV_1.js" type="text/javascript"></script>

    <style type="text/css">
        .style21
        {
            width: 20%;
            height: 22px;
        }
        .style22
        {
            height: 22px;
        }
        .ui-button-icon-only .ui-icon
        {
            left:2%;
            top:2%;
            }
            
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfPlanDetalle" runat="server" />    
        <asp:HiddenField ID="hdfTipoOrigen" runat="server" /> 

    <div class="dvPanel">
                                <table width="60%" id="tall">
        
                                     
                                    <tr id="trSeparador" >
                                        <td class="style1">Separador</td>
                                        <td class="style2">
                            <div class="styled-select">  

                         <asp:DropDownList ID="ddlseparador" runat="server">
                                </asp:DropDownList>
                            
                            </div>
                                            </td>
                                        <td align="center">
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
                                        </td>
                                    </tr>
                                    <tr >
                                        <td class="style21">
                                            Tipo Plantilla
                                        </td>
                                     
                                        <td align="left" class="style22">
                                        <asp:DropDownList ID="ddlplantilla" runat="server">
                                </asp:DropDownList>
                                        </td>
                                            
                                    </tr>

                                    <tr >
                                        <td class="style21">
                                            Archivo Origen
                                        </td>
                                     
                                        <td align="left" class="style22">
                                        <asp:TextBox ID="txtarchivo" runat="server" Width="90%" CssClass="texto_form" ></asp:TextBox>
                                            
                                    </tr>
                                    <tr>
                                        <td class="style1">
                                            Backup Archivo</td>
                                        <td align="left">
                                         <asp:TextBox ID="txtbackup" runat="server" Width="90%" CssClass="texto_form" ></asp:TextBox>
                                           </td>
                                    </tr>
                                    <tr>
                                        <td class="style1">
                                            Ruta Errores</td>
                                        <td class="style2">
                                        <asp:TextBox ID="txterror" runat="server" Width="90%" CssClass="texto_form" ></asp:TextBox>
                                           </td>
                                        <td  class="centrar">
                                            <div id="btngrabar" class="btnNormal">
                                                <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                                                <a>Guardar</a>
                                             </div>
                                        </td>
                                    </tr>
                                </table>

</div>

        
        <br />

        <div id="divMsgConfirmacion" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>¡Se quitará este campo de la plantilla actual!, ¿Desea continuar?
        </div>
        <div id="dvCampo" style="padding-bottom: 0px;">
            <table cellpadding="0" cellspacing="0">
                <tr>
                    <td>

                                         <div class="centrar">
                       <div id="btnvolver" class="btnNormal" runat="server">
                            <asp:Image ID="Image6" runat="server" ImageUrl="~/Common/Images/Mantenimiento/regresar.png" />
                            <a>Regresar a Configuración</a>
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
                        <br /><br />
                        <table id="tbCampoPlantilla"></table>
                        <div class="dvPanel" style="padding-bottom:0px;">
                            <asp:Label ID="lblPlanDec" runat="server" Text=""></asp:Label>
                            <br />
                            <asp:Label ID="lblPlanUn" runat="server" Text=""></asp:Label>
                            <br />
                            <asp:Label ID="lblPlan" runat="server" Text=""></asp:Label>
                            <br />
                            <asp:Label ID="lblPlanLit" runat="server" Text=""></asp:Label>
                        </div>                    
                    </td>

                </tr>
            </table>
        </div>
        
        <div id="dvCamposDetalle" style="display: none;">
            <table>
                <tr>
                    <td>Campo:</td>
                    <td>
                        <asp:Label ID="lblCampo" runat="server" Text=""></asp:Label>
                        <asp:DropDownList ID="ddlCampo" runat="server"></asp:DropDownList>
                    </td>
                </tr>
                <tr id="trServicio" style="display:none;">
                    <td>Servicio:</td>
                    <td>
                        <asp:Label ID="lblServicio" runat="server" Text=""></asp:Label>
                        <asp:DropDownList ID="ddlServicio" runat="server"></asp:DropDownList>
                    </td>
                </tr>
                <tr id="trTipo" style="display:none;">
                    <td>Tipo:</td>
                    <td>
                        <asp:Label ID="lblTipo" runat="server" Text=""></asp:Label>
                        <asp:DropDownList ID="ddlTipoServicioImportador" runat="server"></asp:DropDownList>
                    </td>
                </tr>
                <tr id="trDescripcion" style="display:none;">
                    <td>Descripción:</td>
                    <td>
                        <asp:TextBox ID="txtDescripcion" runat="server" Width="170px" MaxLength="200"></asp:TextBox>                    
                    </td>
                </tr>
                <tr>
                    <td>Posición:</td>
                    <td>
                        <asp:TextBox ID="txtPosicion" runat="server" Width="50px" MaxLength="5"></asp:TextBox>
                    </td>
                </tr>
                <tr id="trLongitud" >
                    <td>Longitud:</td>
                    <td>
                        <asp:TextBox ID="txtLongitud" runat="server" Width="50px" MaxLength="5"></asp:TextBox>
                    </td>
                </tr>

                    <tr>
                    <td>Obligatorio:</td>
                    <td> <asp:CheckBox ID="chkobligatorio" runat="server" /> </td>
                    
                </tr>

            </table>
        </div>
    </form>
</body>
</html>
