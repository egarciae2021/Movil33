<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Adm_DistribucionMinutosImportarExportar" Codebehind="Adm_DistribucionMinutosImportarExportar.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script type="text/javascript" src="../../Common/Scripts/jquery-1.7.2.js" ></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery-ui.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" ></script>
    <script type="text/javascript" src="../../Common/Scripts/jquery.MultiFile.js" ></script>
    <script type="text/javascript" src="../../Common/Scripts/Utilitario.js" ></script>    
    <script type="text/javascript" src="../../Common/Scripts/jquery.uniform.min.js" ></script>

    <link type="text/css" rel="stylesheet" href="../../Common/Styles/Principal.css"   />
    <link type="text/css" rel="stylesheet" href="../../Common/Styles/Uniform/default/css/uniform.default.min.css"  />

    <link type="text/css" rel="stylesheet" href="../../Common/Styles/KendoUI/kendo.common.min.css"  />
    <link type="text/css" rel="stylesheet" href="../../Common/Styles/KendoUI/kendo.uniform.min.css" />
    <link type="text/css" rel="stylesheet" href="../../Common/Styles/KendoUI/kendo.common.min.css"  />

    <script src="../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.datepicker.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.datetimepicker.min.js" type="text/javascript"></script>


    <script src="Adm_DistribucionMinutosImportarExportar.js" type="text/javascript"></script>

    <%--<script type="text/javascript"></script>--%>
</head>
<body>

    <form id="form1" runat="server">
        
        <asp:HiddenField ID="hdfArchivo" runat="server" />
        <asp:HiddenField ID="hdfValorIlimitado" runat="server" />
        <asp:HiddenField ID="hdfvcPeriodo" runat="server" />

        
        <div id="dvImportar" runat="server" class="dvPanel" style="display:none;width:95%">
        
            <table border="0" style="width:100%">
                <tr>
                    <td>
                            <asp:FileUpload ID="fuArchivo" runat="server" />
                            <asp:Button ID="btnCargar" runat="server" Text="" />
                    </td>
                     <td>
                                <div id="btnCargarCli" class="btnNormal">
                                    <asp:Image ID="imgCargar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                                    <a>Importar</a>
                                </div>
                    </td>
                </tr>
            </table>

        </div>
        
    </form>

</body>
</html>