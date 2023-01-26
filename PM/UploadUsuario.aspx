<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Configuracion_General_UploadUsuario" Codebehind="UploadUsuario.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

    <link href="Common/Styles/Principal.css" rel="stylesheet" type="text/css" />
    <script src="Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="Common/Scripts/JqueryUI/jquery.ui.core.js" type="text/javascript"></script>
    <script src="Common/Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="Common/Scripts/JqueryUI/jquery.ui.tabs.js" type="text/javascript"></script>
    <script src="Common/Scripts/JqueryUI/jquery.ui.accordion.js" type="text/javascript"></script>
    <script src="Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="Common/Scripts/JqueryUI/jquery.ui.draggable.js" type="text/javascript"></script>
    <script src="Common/Scripts/JqueryUI/jquery.ui.resizable.js" type="text/javascript"></script>
    <script src="Common/Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript"></script>
    <script src="Common/Scripts/JqueryUI/jquery.ui.datepicker.js" type="text/javascript"></script>
    <script src="Common/Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="Common/Scripts/Utilitario.js" type="text/javascript"></script>


    <script type="text/javascript">

        $(function () {
            $(".btnNormal").button({});


            $("#btnGuardar").click(function () {
                //UploadUsuario.aspx/Guardar
                $.ajax({
                    type: "POST",
                    url: "Common/WebService/General.asmx/GuardarUploadUsuario",
                    data: "{'vcRuta': '" + $("#hdfArchivo").val() + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {

                        try {
                            window.parent.modalImagenUsuario.dialog("close");
                        } catch (e) {
                        }

                        try {
                            window.top.$("#modalFondo").hide();
                            window.top.$("#modalProfile_Imagen").hide();
                            window.top.ActualizarImagenProfile();
                        } catch (e) {
                        }
                        
                        //window.parent.location.reload();
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });

            });


        });

    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        
        <asp:HiddenField ID="hdfArchivo" runat="server" />
        <asp:HiddenField ID="hdfNombreArchivo" runat="server" />
          
          <table >
                <tr>
                    <td colspan ="2" align ="center" >
                        <asp:Image runat="server" ID="imgIcono" Height="70px" Width="75px"/>
                    </td>
                </tr>
                <tr height="20px"><td colspan ="2"></td></tr>
                <tr id="Tr1" runat="server">
                    <td class="tdEtiqueta">
                        Imagen</td>
                    <td>
                       <asp:FileUpload ID="flUpload" runat="server" />
                        <asp:Button ID="btnSubir" runat="server" Text="Subir"  />                        
                    </td>
                </tr>
                <tr>
                    <td colspan ="2">
                        <asp:Label ID="lblmensaje" runat="server"></asp:Label>
                    </td>
                </tr>
                <tr height="5px"><td colspan ="2"></td></tr>
                <tr>
                    <td colspan ="2" align="right" >
                        <div id="btnGuardar" class="btnNormal">
                            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                            <a>Guardar</a>
                        </div>
                    </td>
                </tr>
          </table>
            
            
    
    </div>
    </form>
</body>
</html>
