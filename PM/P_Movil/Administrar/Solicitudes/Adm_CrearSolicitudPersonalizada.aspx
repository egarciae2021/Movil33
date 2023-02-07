<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Solicitudes_Adm_CrearSolicitudPersonalizada" Codebehind="Adm_CrearSolicitudPersonalizada.aspx.vb" %>

<%@ Register src="../../../Common/Controles/BusquedaPrincipal.ascx" tagname="BusquedaPrincipal" tagprefix="uc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

    <link href="../../../Content/css/shared/font-awesome.min.css" rel="stylesheet" />

    <link href="../../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet" type="text/css" />

    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript" ></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.datepicker.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/cultures/kendo.culture.es-PE.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/ajaxupload.js" type="text/javascript"></script>
    
    <style type="text/css">
        .ui-widget-overlay { 
            height: 100% !important; 
            width: 100% !important;
        }
    </style>
</head>

<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Adm_CrearSolicitudPersonalizada.js")%>" type="text/javascript"></script>
    
    <form id="form1" runat="server">
        <asp:HiddenField id="hdfAdmin" runat="server"/>
        <asp:HiddenField id="hdfCodEmp" runat="server"/>
        <asp:HiddenField id="hdfCodTipSol" runat="server"/>
        <asp:HiddenField id="hdfFraccionamiento" runat="server"/>
        <asp:HiddenField id="hdfMontoFijo" runat="server"/>
        <asp:HiddenField id="hdfUsuarioCreacion" runat="server"/>
        <asp:HiddenField id="hdfFechaCreacion" runat="server"/>
        <asp:HiddenField id="hdfTamanoArchivo" runat="server"/>
        <asp:HiddenField id="hdfNumMinCuo" runat="server"/>
        <asp:HiddenField id="hdfNumMaxCuo" runat="server"/>
        <asp:HiddenField id="hdfMesCuo" runat="server"/>
        <asp:HiddenField id="hdfMinPerGra" runat="server"/>
        <asp:HiddenField id="hdfMaxPerGra" runat="server"/>

        <asp:HiddenField ID="hdfIGV" runat="server" />

            <div id="divInfoFinanciamiento" style="display:none; overflow:hidden;" >
            <iframe id="ifInfoFinanciamiento" runat="server" style="margin: 0px; padding: 0px;" frameborder="0">
            </iframe>
        </div>

        <div id="dvCampo" class="dvPanel" style="overflow: auto;">  
            <%--Edgar Garcia 06022023 agrego descripcion solicitud--%>
            <asp:Label ID="LabelDescripcion" runat="server" ></asp:Label>

            <table id="tbCamposDinamicos" runat="server" width="850px">
             
                
               

            <tr id="trFraccionamiento" style="display:none;">
                <td>Fraccionamiento</td>
                <td>
                    <asp:DropDownList ID="ddlFraccionamiento" runat="server" Width="50px">
                    <asp:ListItem Value="0" text="NO" Selected="True"></asp:ListItem>
                    <asp:ListItem Value="1" text="SI"></asp:ListItem>
                    </asp:DropDownList>
                </td>
            </tr>
            <tr id="trMontoFijo" style="display:none;">
                <td>Monto Fijo</td>
                <td>
                    <asp:TextBox id="txtMonto" runat="server" width="54px" MaxLength="9"></asp:TextBox>
                </td>
            </tr>
            <tr id="trFInanciamiento" runat="server" style="display:none;">
                <td>
                    Financiamiento
                </td>
                <td>
                    <asp:TextBox ID="txtNombreFinanc" runat="server" ReadOnly="true" Width="300"></asp:TextBox>
                    <asp:HiddenField ID="hdfIdFInanciamiento" runat="server" />
                    <img id="imgInfoFinanciamiento" title="Ver detalle" class="imgBtn" 
                    src="../../../Common/Images/Mantenimiento/VerDetalle.png" />
                </td>
            </tr>
            <tr id="trMesesCuotas" style="display:none;">
                <td>Cuotas</td>
                <td>
                    <asp:TextBox ID="txtMesesCuotas" runat="server" Width="30px" MaxLength="8"></asp:TextBox>
                    <asp:Label ID="lblMesesCuotas" runat="server"></asp:Label>
                </td>
            </tr>
            <tr id="trPeriodoGracia" style="display:none;">
                <td>Periodo Gracia</td>
                <td>
                    <asp:TextBox ID="txtPeriodoGracia" runat="server" Width="30px" MaxLength="8"></asp:TextBox>
                    <asp:Label ID="lblPeriodoGracia" runat="server" Font-Italic="True"></asp:Label>
                </td>
            </tr>
            </table>
        </div>
        
            
        <div id="dvCreacion" style="display:none;">
            <iframe id="ifModal" frameborder="0" style="padding: 0px; margin: 0px; height: 360px; width:380px;"></iframe>
            
        </div> 
    
    </form>
</body>
</html>
