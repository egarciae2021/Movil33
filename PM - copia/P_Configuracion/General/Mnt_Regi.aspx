<%@ Page Language="VB" AutoEventWireup="false" Inherits="General_Administrar_Mantenimiento_Mnt_Regi"
    CodeBehind="Mnt_Regi.aspx.vb" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Mi Empresa</title>

    <link href="../../Content/css/shared/bootstrap.min.css" rel="stylesheet">
    <link href="../../Content/css/shared/nifty.min.css" rel="stylesheet">
    <link href="../../Content/css/shared/nifty-demo-icons.min.css" rel="stylesheet">

    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />

    <script type="text/javascript" src="../../Common/Scripts/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="../../Content/js/shared/jquery_1.7.2/bootstrap.min.js"></script>

    <script type="text/javascript" src="../../Common/Scripts/jqueryui/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqueryui/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqueryui/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqueryui/jquery.ui.button.js"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqueryui/jquery.ui.autocomplete.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>


    <%--<link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    
    <link href="../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/knockout-2.3.0.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KnockoutValidation/knockout.validation.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KnockoutValidation/Localization/es-ES.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    
    
    <script src="../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.datepicker.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.datetimepicker.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.combobox.min.js" type="text/javascript"></script>
    
    
    <script src="../../Common/Scripts/ajaxupload.js" type="text/javascript"></script>--%>

    <script language="javascript" type="text/javascript">
        function Generar() {
            //alert($("#flUpload1").val());
            //$('#imgIcono').attr('src', "D:\rramos\Proyectos\MovilNet 1.1\Fuentes\Web\WebSite8\Images\Temporal\Clientes.png");
            __doPostBack('btnSubir', '');
        }
    </script>
    <style type="text/css">
        .form-group {
            margin-bottom: 15px;
        }

        #txtRUC {
            text-align: left !important;
        }

        body {
            background-color: transparent !important;
        }
    </style>
</head>
<body>


    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Mnt_Regi.js")%>" type="text/javascript"></script>
    <div id="dvCargando" class="dvCargando">
    </div>
    <form id="form1" runat="server">

        <%--<div id="page-title">
            <h1 class="page-header text-overflow">Mi Empresa</h1>
        </div>--%>
        <ol class="breadcrumb" style="margin-top: 10px; font-size: 14px;">
            <li><a href="#"><i class="demo-pli-home"></i></a></li>
            <li>Configuración</li>
            <li class="active">Mi Empresa</li>
        </ol>

        <asp:HiddenField ID="hdfArchivo" runat="server" />
        <asp:HiddenField ID="hdfNombreArchivo" runat="server" />
        <asp:HiddenField ID="hdfMostrarLogo" runat="server" />
        <div class="container-fluid" style="overflow: auto;">


            <div class="row">
                <div class="col-sm-4">
                    <div class="form-group">
                        <label class="control-label">País</label>
                        <asp:TextBox ID="TxtPais" runat="server" class="form-control" Style="text-transform: uppercase;"></asp:TextBox>
                        <asp:HiddenField ID="hdfPais" runat="server" />
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="form-group">
                        <label class="control-label">Nombre</label>
                        <asp:TextBox ID="txtNombre" runat="server" class="form-control" MaxLength="100"></asp:TextBox>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="form-group">
                        <label class="control-label">Nro. Identificación Tributaria Empresarial</label>
                        <asp:TextBox ID="txtRUC" runat="server" class="form-control" MaxLength="11" Style="text-align: left !important;"></asp:TextBox>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <div class="form-group">
                        <label class="control-label">Dirección</label>
                        <asp:TextBox ID="txtDireccion" runat="server" class="form-control" MaxLength="100"></asp:TextBox>
                    </div>
                </div>
            </div>

            <table width="100%">
                <tr>
                    <td>
                        <table width="100%">

                            <tr runat="server">
                                <td class="tdEtiqueta">Logo
                                </td>
                                <td>
                                    <asp:FileUpload ID="flUpload" runat="server" />
                                    <asp:Button ID="btnSubir" runat="server" Text="Subir" OnClientClick="Generar(); return false;" />
                                    <br />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <div style="margin-top: 10px; margin-bottom: 7px;">Tamaño: 220x60 (píxeles)</div>
                                    <asp:Image runat="server" ID="imgIcono" Visible="false" ImageUrl="~/Common/Controladores/ImagenDinamica.ashx?Tipo=Cliente"
                                        Height="60px" Width="220px" />
                                    <asp:Label ID="lblmensaje" runat="server" ForeColor="#993333"></asp:Label>
                                </td>
                            </tr>

                            <tr>
                                <td class="tdEtiqueta"></td>
                                <td>
                                    <input type="checkbox" name="chkMostrarLogo" id="chkMostrarLogo" value="chkMostrarLogo" />
                                    <label for="chkMostrarLogo">Mostrar Logo en la cabecera principal</label>
                                </td>
                            </tr>

                        </table>
                    </td>
                </tr>
            </table>
            <hr style="width: 100%; background-color: #A6C9E2; height: 1px; border: 0;" />
            <table style="margin-top: 10px;" width="100%">
                <tr>
                    <td class="tdEtiqueta" style="width: 13%">Feriados
                    </td>
                    <td width="80px">Día
                    <asp:DropDownList ID="ddlDia" runat="server" Width="50px">
                    </asp:DropDownList>
                    </td>
                    <td width="80px">Mes
                    <asp:DropDownList ID="ddlMes" runat="server" Width="50px">
                    </asp:DropDownList>
                    </td>
                    <td width="80px">Año
                    <asp:TextBox ID="txtAnio" runat="server" Width="45px" MaxLength="4" Enabled="false"></asp:TextBox>
                    </td>
                    <td>
                        <asp:CheckBox ID="chkAnio" runat="server" Text="Por Año" />
                    </td>
                </tr>
                <tr>
                    <td style="height: 5px;"></td>
                </tr>
                <tr>
                    <td></td>
                    <td style="width: 140px" colspan="5">
                        <table>
                            <tr>
                                <td valign="bottom"><a style="font-size: 10px; font-style: italic;">(Doble click para
                            editar) </a></td>
                                <td valign="bottom">
                                    <div id="botonesGrilla" style="margin-left: 30px;">
                                        <div id="btnAceptar" class="btnNormal" style="display: none; width: 90px !important;">
                                            <img src="../../Common/Images/Mantenimiento/Guardar.png" />Aceptar
                                        </div>
                                        <div id="btnCancelar" class="btnNormal" style="display: none; width: 90px !important;">
                                            <img src="../../Common/Images/Mantenimiento/delete_16x16.gif" />Cancelar
                                        </div>
                                        <div id="btnEditar2" class="btnNormal" style="display: none; width: 90px !important;">
                                            <img src="../../Common/Images/Mantenimiento/edit_16x16.gif" />Editar
                                        </div>
                                        <div id="btnAgregar" class="btnNormal" style="width: 90px !important;">
                                            <img src="../../Common/Images/Mantenimiento/add_16x16.gif" />Agregar
                                        </div>
                                        <div id="btnQuitar" class="btnNormal" style="width: 90px !important;">
                                            <img src="../../Common/Images/Mantenimiento/delete_16x16.gif" />Quitar
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>



                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td colspan="5">
                        <table id="grid" runat="server">
                        </table>
                        <div id="pager">
                        </div>
                    </td>
                </tr>
            </table>


            <%--<br />
            <div class="dvAsignacion">
                <cc1:TabJQ ID="tbAsignacion" runat="server" CssClass="tabs" Style="margin: 0px; padding: 0px;">
                </cc1:TabJQ>
            </div>--%>
            <br />
            <hr style="width: 100%; background-color: #A6C9E2; height: 1px; border: 0;" />
            <table style="margin-top: 10px;" width="100%">
				<tr>
					<td class="tdEtiqueta" style="width: 13%">Medir tiempo transcurrido de solicitudes en:
					</td>
					<td width="80px">
						<asp:DropDownList ID="ddlConfigHorario" runat="server" Width="175px" >
						</asp:DropDownList>
					</td>
				</tr>
				<tr>
					<td style="width: 13%">

					</td>
					<td colspan="2">
						<table id="tbCamposEstadoProceso" ></table>
					</td>
				</tr>
			</table>


            <br />
            <div style="text-align: left;">

                <div class="panel-footer text-right">
                    <button id="btnGuardar" class="btn btn-success" type="submit">Guardar</button>
                </div>

                <%--<div id="btnGuardar" class="btnNormal">
                    <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png"
                        Style="height: 16px" />
                    <a>Guardar</a>
                </div>--%>
                <div id="btnCerrar" class="btnNormal" style="display: none;">
                    <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                    <a>Cerrar</a>
                </div>
            </div>


        </div>

        <%--<jqc:jQueryScriptManager ID="jQueryScriptManager1" runat="server" />--%>
    </form>
</body>
</html>
