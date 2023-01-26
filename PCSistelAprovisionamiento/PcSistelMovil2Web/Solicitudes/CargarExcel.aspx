<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CargarExcel.aspx.cs" Inherits="PcSistelMovil2Web.Solicitudes.CargarExcel" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Styles/Sitio.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/JqueryThemeRoller/redmond/jquery-ui-1.8.16.custom.css"
        rel="stylesheet" type="text/css" />
    <script src="../Scripts/json2.js" type="text/javascript"></script>
    <script src="../Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="../Common/Styles/Principal2.css" rel="stylesheet" type="text/css" />
    <script>
        $(function () {
            //$("#lblmensaje").html("");
            //$("#lblarchivo").html("");

            $("#btnGuardarExcel").button("option", "disabled", true);

            $("#bdDescargarPlantilla").click(function () {
                $.ajax({
                    url: "CargarExcel.aspx/DescargarArchivoBD", //PageMethod
                    data: "{}",
                    dataType: "json",
                    type: "post",
                    contentType: "application/json; charset=utf-8",
                    success: function (result) {

                        var archivo = result.d;

                        if (archivo != "") {
                            var NomArc = 'plantillaSolicitud.xlsx'
                            var filePath = "Solicitudes/" + NomArc;
                            window.location.href = "../Common/Controladores/DescargarArchivo.ashx?archivo=" + filePath;
                        }

                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            });


            $("#DvSubirPlantilla").click(function () { $('#<%= flUpload.ClientID %>').trigger('click'); });
            //$("#btnGuardarExcel").click(function () { $('#btnsubir').click(); });


            $('#flUpload').change(function (e) {
                $("#btnGuardarExcel").button("option", "disabled", true);
                $("#lblmensaje").html("");
                $("#lblarchivo").html("");
                var path = $(this).val();
                if (path != '' && path != null) {
                    var archivo = path.substring(path.lastIndexOf('\\') + 1);
                    var ext = path.substring(path.lastIndexOf('.') + 1);

                    if (ext.toLowerCase() == "xls" || ext.toLowerCase() == "xlsx") {

                        $("#lblmensaje").html("");
                        //$("#lblmensaje").html("Archivo : " + archivo);
                        // $("#btnGuardarExcel").button("option", "disabled", false);
                    }
                    else {
                        $("#lblmensaje").html("Seleccione un archivo del tipo Excel(xls, xlsx)");
                        // $("#btnGuardarExcel").button("option", "disabled", true);
                    }
                }

            })

        }); 
        
    </script>

    <style type="text/css">
    #btnEnviars {    
     
        padding: 5px 10px 5px 25px;
        background-image: url(../Common/images/Mantenimiento/Guardar.png);
        background-position-y: 4px;
        background-position-x: 5px;
        background-repeat: no-repeat;
       
    
    }
</style>

</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfCodigo" runat="server" />
    <asp:HiddenField ID="hdfIconoArchivo" runat="server" />
    <div class="dvPanel">
        <table style="margin-left: -5px; width: 600px;">
            <tr style="display:none;">
           <%--     <td colspan="2">
                                          &nbsp;                               <div  id="dvsubirplantilla" class="btnnormal" ><img src="../common/images/mantenimiento/subirarchivo.png" /></div>--%>
                  
            <%--        <asp:label id="label1" runat="server" text="descargar plantilla"></asp:label>&nbsp;
                    <div class="btnnormal" id="bddescargarplantilla">
                        <img src="../common/images/mantenimiento/bajararchivo.png" /></div>
                        </div>
                </td>--%>
                <%--       <asp:Label ID="lblmensaje0" runat="server" Text="Subir Plantilla" ></asp:Label>&nbsp;--%>
                <%--<div class="btnNormal" id="btnGuardarExcel" style="display:none;"><img src="../Common/images/Mantenimiento/Guardar.png" /></div>--%>
                <%--     <asp:Button ID="btnsubir" runat="server" Text="Guardar" 
                            onclick="btnsubir_Click"  />--%>
                <%--  <asp:ImageButton ID="ImageButton1" runat="server" 
                        ImageUrl="~/Common/images/Mantenimiento/Guardar.png" onclick="btnsubir_Click" />--%>
            </tr>
            <tr><td style="height:6px;" colspan="2">
               
                </td></tr>
            <tr style="display: block;">
                <td width="600x" style="text-align: left;" colspan="2">
                    <asp:FileUpload runat="server" ID="flUpload" Visible="true" />
                    &nbsp;
                    <asp:Button ID="btnEnviar" runat="server" Text="Enviar" OnClick="btnEnviar_Click" />
                </td>
            </tr>
              <tr><td style="height:6px;" colspan="2">
               
                </td></tr>
            <tr>
                <td colspan="2">
                    <asp:Label runat="server" ID="lblmensaje"></asp:Label>
                </td>
            </tr>
        </table>
    </div>
    </form>
</body>
</html>
