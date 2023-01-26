<%@ Page Language="VB" AutoEventWireup="false" Inherits="Common_Page_Adm_BusquedaPrincipal" Codebehind="Adm_BusquedaPrincipal.aspx.vb" %>

<%@ Register src="../Controles/BusquedaPrincipal.ascx" tagname="BusquedaPrincipal" tagprefix="uc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Styles/anytime.css" rel="stylesheet" type="text/css" />

    <script src="../Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../Scripts/JqueryUI/jquery.ui.core.js" type="text/javascript" ></script>
    <script src="../Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript" ></script>
    <script src="../Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript" ></script>
    <script src="../Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript" ></script>
    <script src="../Scripts/Utilitario.js" type="text/javascript"></script>

    <script type"text/javascript">
        function fnMostrarDatos(valor) {
            $("#hdfValor").val();
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfValor" runat="server" />
    <div>
        <table>
            <tr>
                <td>
                    <uc1:BusquedaPrincipal ID="BusquedaPrincipal1" runat="server" />
                </td>
            </tr>
        </table>
    </div>
    </form>
</body>
</html>
