<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Pedidos_Visor_pedidos" Codebehind="Visor_pedido.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script type="text/javascript" src="../../Common/Scripts/jquery-1.7.2.js" ></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery-ui.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/Utilitario.js"></script>
    <script type="text/javascript" src="Visor_pedido.js"></script>
    <link href="Visor_pedido.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfAdmin" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <div id="general">
        <div id="principal">
            <div id="head" class="cuerpo">
                <div id="titulo">
                Visor de pedidos
                </div>
            </div>
            <div id="body" class="cuerpo">

                <div class="cuerpo_pedidos">
                    <div id="head_pedidos" class="cuerpo_pedidos"> 
                        <div>
                            <asp:DropDownList ID="ddlFiltro" runat="server">
                                <asp:ListItem>modelo</asp:ListItem>
                                <asp:ListItem>sistema operativo</asp:ListItem>
                                <asp:ListItem>campaña</asp:ListItem>
                            </asp:DropDownList>
                            <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
                        </div>
                        <div>

                            <div class="filtro">
                                 <span style="float:right" class="ui-icon ui-icon-circle-close"></span>
                                 <span>sistema operativo:android </span>
                            </div>
                            <div class="filtro">
                                 <span style="float:right" class="ui-icon ui-icon-circle-close"></span>
                                 <span>campaña:navidad </span>
                            </div>
                        
                        </div>
                        
                    </div>
                    <div id="body_pedidos" class="cuerpo_pedidos">
                    
                        <div class="pedido dvPanel">
                            <div class="p_nomCam">
                            Campaña navideña
                            </div>
                            <div class="p_fec">
                            fecha pedido: 02/02/2013
                            </div>
                            <div class="p_tip">
                            tipo pedido: Reserva
                            </div>
                            <div class="p_finan">
                            tipo financiamiento: credito
                            </div>
                            <div class="p_fecEnt">
                            fecha entrega: 02/02/2013
                            </div>
                            <div class="p_dir">
                            Direccion de entrega:<br />
                            Calle Larco Herrera 980. Magdalena - Lima.
                            </div>
                        </div>

                        <div class="pedido dvPanel">
                            <div class="p_nomCam">
                            Campaña navideña
                            </div>
                            <div class="p_fec">
                            fecha pedido: 02/02/2013
                            </div>
                            <div class="p_tip">
                            tipo pedido: Reserva
                            </div>
                            <div class="p_finan">
                            tipo financiamiento: credito
                            </div>
                            <div class="p_fecEnt">
                            fecha entrega: 02/02/2013
                            </div>
                            <div class="p_dir">
                            Direccion de entrega:<br />
                            Calle Larco Herrera 980. Magdalena - Lima.
                            </div>
                        </div>

                        <div class="pedido dvPanel">
                            <div class="p_nomCam">
                            Campaña navideña
                            </div>
                            <div class="p_fec">
                            fecha pedido: 02/02/2013
                            </div>
                            <div class="p_tip">
                            tipo pedido: Reserva
                            </div>
                            <div class="p_finan">
                            tipo financiamiento: credito
                            </div>
                            <div class="p_fecEnt">
                            fecha entrega: 02/02/2013
                            </div>
                            <div class="p_dir">
                            Direccion de entrega:<br />
                            Calle Larco Herrera 980. Magdalena - Lima.
                            </div>
                        </div>

                        <div class="pedido dvPanel">
                            <div class="p_nomCam">
                            Campaña navideña
                            </div>
                            <div class="p_fec">
                            fecha pedido: 02/02/2013
                            </div>
                            <div class="p_tip">
                            tipo pedido: Reserva
                            </div>
                            <div class="p_finan">
                            tipo financiamiento: credito
                            </div>
                            <div class="p_fecEnt">
                            fecha entrega: 02/02/2013
                            </div>
                            <div class="p_dir">
                            Direccion de entrega:<br />
                            Calle Larco Herrera 980. Magdalena - Lima.
                            </div>
                        </div>

                        <div class="pedido dvPanel">
                            <div class="p_nomCam">
                            Campaña navideña
                            </div>
                            <div class="p_fec">
                            fecha pedido: 02/02/2013
                            </div>
                            <div class="p_tip">
                            tipo pedido: Reserva
                            </div>
                            <div class="p_finan">
                            tipo financiamiento: credito
                            </div>
                            <div class="p_fecEnt">
                            fecha entrega: 02/02/2013
                            </div>
                            <div class="p_dir">
                            Direccion de entrega:<br />
                            Calle Larco Herrera 980. Magdalena - Lima.
                            </div>
                        </div>

                        <div class="pedido dvPanel">
                            <div class="p_nomCam">
                            Campaña navideña
                            </div>
                            <div class="p_fec">
                            fecha pedido: 02/02/2013
                            </div>
                            <div class="p_tip">
                            tipo pedido: Reserva
                            </div>
                            <div class="p_finan">
                            tipo financiamiento: credito
                            </div>
                            <div class="p_fecEnt">
                            fecha entrega: 02/02/2013
                            </div>
                            <div class="p_dir">
                            Direccion de entrega:<br />
                            Calle Larco Herrera 980. Magdalena - Lima.
                            </div>
                        </div>

                        <div class="pedido dvPanel">
                            <div class="p_nomCam">
                            Campaña navideña
                            </div>
                            <div class="p_fec">
                            fecha pedido: 02/02/2013
                            </div>
                            <div class="p_tip">
                            tipo pedido: Reserva
                            </div>
                            <div class="p_finan">
                            tipo financiamiento: credito
                            </div>
                            <div class="p_fecEnt">
                            fecha entrega: 02/02/2013
                            </div>
                            <div class="p_dir">
                            Direccion de entrega:<br />
                            Calle Larco Herrera 980. Magdalena - Lima.
                            </div>
                        </div>

                        <div class="pedido dvPanel">
                            <div class="p_nomCam">
                            Campaña navideña
                            </div>
                            <div class="p_fec">
                            fecha pedido: 02/02/2013
                            </div>
                            <div class="p_tip">
                            tipo pedido: Reserva
                            </div>
                            <div class="p_finan">
                            tipo financiamiento: credito
                            </div>
                            <div class="p_fecEnt">
                            fecha entrega: 02/02/2013
                            </div>
                            <div class="p_dir">
                            Direccion de entrega:<br />
                            Calle Larco Herrera 980. Magdalena - Lima.
                            </div>
                        </div>

                        <div class="pedido dvPanel">
                            <div class="p_nomCam">
                            Campaña navideña
                            </div>
                            <div class="p_fec">
                            fecha pedido: 02/02/2013
                            </div>
                            <div class="p_tip">
                            tipo pedido: Reserva
                            </div>
                            <div class="p_finan">
                            tipo financiamiento: credito
                            </div>
                            <div class="p_fecEnt">
                            fecha entrega: 02/02/2013
                            </div>
                            <div class="p_dir">
                            Direccion de entrega:<br />
                            Calle Larco Herrera 980. Magdalena - Lima.
                            </div>
                        </div>

                        <div class="pedido dvPanel">
                            <div class="p_nomCam">
                            Campaña navideña
                            </div>
                            <div class="p_fec">
                            fecha pedido: 02/02/2013
                            </div>
                            <div class="p_tip">
                            tipo pedido: Reserva
                            </div>
                            <div class="p_finan">
                            tipo financiamiento: credito
                            </div>
                            <div class="p_fecEnt">
                            fecha entrega: 02/02/2013
                            </div>
                            <div class="p_dir">
                            Direccion de entrega:<br />
                            Calle Larco Herrera 980. Magdalena - Lima.
                            </div>
                        </div>

                     </div>
                    <div id="foot_pedidos" class="cuerpo_pedidos"> </div>
                </div>

            </div>
            <div id="foot" class="cuerpo">
            </div>
        </div>
    </div>
    </form>
</body>
</html>
