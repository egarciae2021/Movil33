<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Adm_ProcesarSolicitud.aspx.cs" Inherits="PcSistelMovil2Web.Solicitudes.Adm_ProcesarSolicitud" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
   
    <link href="../Common/Styles/JqueryThemeRoller/redmond/jquery-ui-1.8.16.custom.css"
        rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/json2.js" type="text/javascript"></script>
    <script src="../Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/grid.locale-es.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="../Common/Styles/Principal2.css" rel="stylesheet" type="text/css" />
    <script src="Adm_ListadoSolicitudes.js" type="text/javascript"></script>
   
    </head>
<body>
    <form id="form1" runat="server">
    <div>
    
        Asistente de Aprovisionamiento
        <br />

         <div id="dvTabs" runat="server" style="">
           <cc1:TabJQ runat="server" ID="TabDetalle" CssClass="tabs" style="margin-top:1px;">
            <cc1:ContenedorTabJQ Titulo="Empresa">
        <iframe id="ifTemaEmpresa" src="../Asistente/Asistente1.aspx" style="width: 100%;height:300px;  vertical-align: top; padding: 0px; margin: 0px;
                               " frameborder="0"></iframe>
            </cc1:ContenedorTabJQ>
            <cc1:ContenedorTabJQ Titulo="Contrato">

            </cc1:ContenedorTabJQ>
            <cc1:ContenedorTabJQ Titulo="Licencia">
            </cc1:ContenedorTabJQ> 
            <cc1:ContenedorTabJQ Titulo="Titulares">
            </cc1:ContenedorTabJQ>
            <cc1:ContenedorTabJQ Titulo="Servidor BD">
            </cc1:ContenedorTabJQ> 
            <cc1:ContenedorTabJQ Titulo="Servidor APP">
            </cc1:ContenedorTabJQ> 
            <cc1:ContenedorTabJQ Titulo="Consolidado">
            </cc1:ContenedorTabJQ> 
            </cc1:TabJQ>
          </div>
          <div id="dvAcciones" style="float:right;">      
                                <div id="btnAtras" runat="server" class="btnNormal" style="width: 100px;">
                                    <asp:Image ID="Image2" runat="server" Style="width: 14px; vertical-align: bottom;"
                                        ImageUrl="~/Common/Images/arrow_left.png" />
                                    Atras
                                </div>
                                <div id="btnSiguiente" runat="server" class="btnNormal" style="width: 100px;">
                                    Siguiente
                                    <asp:Image ID="Image3" runat="server" Style="width: 14px; vertical-align: bottom;"
                                        ImageUrl="~/Common/Images/arrow_right.png" />
                                </div>
                                <div id="btnFinalizar" runat="server" class="btnNormal" style="width: 100px;">
                                    <asp:Image ID="Image4" runat="server" Style="width: 14px; vertical-align: bottom;"
                                        ImageUrl="~/Common/Images/save.ico" />
                                    Finalizar
                                </div>
                                <div id="btnCancelar" runat="server" class="btnNormal">
                                    <asp:Image ID="Image6" runat="server" Style="width: 14px; vertical-align: bottom;"
                                        ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                                    Cerrar
                                </div>
          </div>
            
        </div>
        
    </form>
</body>
</html>
