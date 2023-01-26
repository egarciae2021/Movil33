<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Adm_ImportarExcelGenerico.aspx.vb" Inherits=".Adm_ImportarExcelGenerico" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <script src="../Scripts/json2.js" type="text/javascript"></script>
    <script src="../Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Adm_ImportarExcelGenerico.js" type="text/javascript"></script>

</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfAdmin" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <asp:HiddenField ID="hdfNombreEntidad" runat="server" />
    <div id="pnlImportar"  runat="server"  style="width:500px; height:250px;">

        <div id="pnlPlantilla" class="dvPanel" style="width:99%; margin-right:5px; margin-bottom:15px; margin-top:10px;">
            <span style="position:relative; top:-25px; left:0px; background-color:White; font-weight:bold;">Elegir Plantilla</span>
            <asp:DropDownList ID="ddlPlantillas" runat="server" style="margin-left:-80px;"></asp:DropDownList>
        </div>

        <div id="ocultar">
            <div class="dvPanel" style="width:99%; margin-right:5px; margin-bottom:15px;">
                <span style="position:relative; top:-25px; left:0px; background-color:White; font-weight:bold;">Obtener plantilla</span>
                <asp:CheckBox ID="chkConData" runat="server" Text="Con data" style="margin-left:-95px; margin-right:20px;"/><asp:Button ID="btnObtenerPlantilla" runat="server" Text="Obtener Plantilla" />

                <div id="obteniendoPlant" runat="server" style="width:16px; height:16px; background: url('../Images/Mantenimiento/Cargando16.gif') no-repeat right center; z-index:10000; float:right; margin-top:7px; " ></div>
            </div>

            <div class="dvPanel" style="width:99%; margin-right:5px; margin-bottom:15px;">
                <span style="position:relative; top:-23px; left:0px; background-color:White; font-weight:bold;">Subir plantilla</span>
                <table style="margin-top:-15px; margin-left: -5px;">
                    <tr>
                        <td>                    
                            <asp:FileUpload ID="FileUpload1" runat="server" Text="Con data" />
                        </td>
                        <td>
                            <asp:Button ID="btnCargar" runat="server" Text="Cargar" />
                        </td>
                        <td>
                            <div id="cargandoPlant" runat="server" style="width:16px; height:16px; background: url('../Images/Mantenimiento/BajarArchivo.png') no-repeat right center;" ></div>
                        </td>
                        <td>
                            <asp:Label ID="lblResul" runat="server" Text="" Visible="false"></asp:Label>
                        </td>
                    </tr>
                </table>
            </div>
            <div style="clear:both;"></div>
            <div style="text-align:left; padding-top: 12px; float:right;">
                <div id="btnProcesar" class="btnNormal">
                    <asp:Image ID="imgGuardarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png"/>
                    <a>Procesar</a>
                </div>
            </div>   
        </div>

        <div id="PanelImformativo"  style="display:none;">
            <p style="font-weight:bolder; text-decoration: underline; ">Configuración de importación</p>

            <ul id="ListaErrores"></ul>
        </div>

        <div id="pnlResumen" style="display:none;">
        <table>            
            <tr>
                <td><a id="decargarLogProceso" style="display:none;" href="">Descargar log de proceso de origen</a></td>
                <td><a id="descargarLogErrores" style="display:none;" href="">Descargar log de errores de origen</a></td>
            </tr>
            <tr>
                <td><a id="decargarLogProcesoDestino" style="display:none;" href="">Descargar log de proceso de destino</a></td>
                <td><a id="descargarLogErroresDestino" style="display:none;" href="">Descargar log de errores de destino</a></td>
            </tr>
        </table>
        </div>

    </div>

    </form>
</body>
</html>
