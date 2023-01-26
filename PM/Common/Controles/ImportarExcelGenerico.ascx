<%@ Control Language="VB" AutoEventWireup="false" Inherits="Common_Controles_ImportarExcelGenerico" Codebehind="ImportarExcelGenerico.ascx.vb" %>

    <asp:HiddenField ID="hdfNombreEntidad" runat="server" />
    <asp:HiddenField ID="hdfIdEntidad" runat="server" />

    <div title="Importar" id ="btnExportarExcel" class="btnButton" runat="server" style="width:33px;cursor: hand; cursor: pointer;" >
        <asp:Image alt="Exportar" style="margin-left:-3px;" AlternateText="Importar" ID="imgBusqueda" Height="15px" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Volcar.gif" />
    </div>
    <div style="clear:both;"></div>
    <div id="pnlImportar"  runat="server"  style="display:none;">

<%--        <div class="dvPanel" style="width:96%; margin-right:5px; margin-bottom:15px; margin-top:10px;">
            <span style="position:relative; top:-26px; left:0px; background-color:White; font-weight:bold;">Elegir Plantilla</span>
            <asp:DropDownList ID="ddlPlantillas" runat="server" style="margin-left:-80px;"></asp:DropDownList>
        </div>

        <div class="dvPanel" style="width:96%; margin-right:5px; margin-bottom:15px;">
            <span style="position:relative; top:-26px; left:0px; background-color:White; font-weight:bold;">Obtener plantilla</span>
            <asp:CheckBox ID="chkConData" runat="server" Text="Con data" style="margin-left:-95px; margin-right:20px;"/><input id="btnObtenerPlantilla" class="btnButton" type="button" runat="server" value="Obtener Plantilla" />

            <div id="obteniendoPlant" runat="server" style="width:16px; height:16px; background: url('../Images/Mantenimiento/Cargando16.gif') no-repeat right center; z-index:10000; float:right; margin-top:7px; display:none;" ></div>
        </div>

        <div class="dvPanel" style="width:96%; margin-right:5px; margin-bottom:15px;">
            <span style="position:relative; top:-26px; left:0px; background-color:White; font-weight:bold;">Subir plantilla</span>
            <asp:FileUpload ID="FileUpload1" runat="server" Text="Con data" style="margin-left:-80px; margin-right:20px;"/><asp:Button
                ID="btnCargar" runat="server" Text="Cargar" OnClick="btnCargar_Click" />
            <asp:LinkButton ID="LinkButton1" runat="server">LinkButton</asp:LinkButton>


        </div>--%>
        <iframe id="ifImportarExcel" frameborder="0" style="padding: 0px; margin: 0px; height: 280px; width:530px;" runat="server"></iframe>

    </div>
