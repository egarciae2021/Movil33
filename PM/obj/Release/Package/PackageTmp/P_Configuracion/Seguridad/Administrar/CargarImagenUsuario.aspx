<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Configuracion_Seguridad_Administrar_CargarImagenUsuario"
    CodeBehind="CargarImagenUsuario.aspx.vb" %>

<%@ Register Src="../../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico"
    TagPrefix="ttgInfo" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script type="text/javascript" src="../../../Common/Scripts/jquery-1.7.2.js"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    
    <script type="text/javascript">

        //var extArray = new Array(".jpg", ".jpeg", ".bmp", ".png", ".gif");
        var extArray = [".jpg", ".jpeg", ".bmp", ".png", ".gif"];
        var TamanioFileActual = 0;

        $(function () {

            //binds to onchange event of your input field
            $('#flUpload').bind('change', function () {
                //this.files[0].size gets the size of your file.
                if ($.browser.msie) {
                    //before making an object of ActiveXObject, 
                    //please make sure ActiveX is enabled in your IE browser
//                    var objFSO = new ActiveXObject("Scripting.FileSystemObject"); 
//                    var filePath = $("#" + fileid)[0].value;
//                    var objFile = objFSO.getFile(filePath);
                    var fileSize = this.size; //size in kb
                    TamanioFileActual = fileSize / 1048576; //size in mb 
                }
                else {
                    TamanioFileActual = this.files[0].size / (1024 * 1024);
                }
            });

        });
        function ValidarExtencion() {
            var ok = true;
            if (!ValidaExtensionImagen()) {
                alert("Seleccione un archivo del tipo imagen(jpg, jpeg, bmp, png, gif)");
                $("#flUpload").focus();
                ok = false;
            } else {
                ok = true;
            };


            //Validar tamaño...
            if (ok) {
                var TamanioMaximoFile = $("#hdfTamanioMaximo").val();
                if (TamanioFileActual > TamanioMaximoFile) {
                    alert("Seleccione un archivo de menor tamaño.\nEl valor máximo permitido es: " + TamanioMaximoFile + " Mb.");
                    $("#flUpload").focus();
                    ok = false;
                }
            }

            return ok;
            //$("#btnCargar").click();
        };

        function ValidaExtensionImagen() {
            var Archivo = $("#flUpload").val();
            var ext = Archivo.slice(Archivo.lastIndexOf(".")).toLowerCase();
            if (Archivo == "") {
                return true;
            }
            for (var i = 0; i < extArray.length; i++) {
                if (extArray[i] == ext) {
                    return true;
                }
            }
            location.reload();
            return false;
        };

    </script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfNombreArchivo" runat="server" />
    <asp:HiddenField ID="hdfCodUsuario" runat="server" />
    <asp:HiddenField ID="hdfTamanioMaximo" runat="server" />
    <div>
        <table>
            <tr>
                <td>
                    <asp:Label ID="lblmensaje" runat="server" ForeColor="Red"></asp:Label>
                </td>
                <td>
                    <ttgInfo:ToolTipGenerico ID="ttgInfoUpload" runat="server" />
                </td>
                <td>
                    <asp:FileUpload ID="flUpload" runat="server" />
                </td>
                <td>
                    <asp:Image runat="server" ID="imgUsuario" Height="60px" Width="60px" />
                </td>
                <td>
                    <asp:Button ID="btnSubir" runat="server" Text="Subir" OnClientClick="return ValidarExtencion();" />
                </td>
                <td>
                    <asp:Button ID="btnEliminar" runat="server" Text="Eliminar" />
                </td>
            </tr>
        </table>
    </div>
    </form>
</body>
</html>
