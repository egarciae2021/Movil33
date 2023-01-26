<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Pedidos_Dashboard_pedidos" Codebehind="Dashboard_pedido.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script type="text/javascript" src="../../Common/Scripts/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery-ui.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/Utilitario.js"></script>
    <script type="text/javascript" src="Dashboard_pedido.js"></script>
    <link href="Dashboard_pedido.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfAdmin" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <div id="general">

        <div id="Principal">

            <div id="pIndicadores" class="pMedium">
                
                <div class="pMedium fIndi">
                    <div style="margin-left:100px; " class="cGen"><b>S/. Aprobado</b></div>
                    <div class="cGen"><b>S/. Utilizado</b></div>
                    <div class="cGen"><b>S/. Disponible</b></div>
                </div>
                

            </div>

            <div id="plineas" class="pAll">
                <b>Sus lineas actuales:</b><br />

                <div id="pDetLin">
                    <div class="fLin pLinHead">
                        <div class="cLin cLinId"></div>
                        <div class="cLin">Numero</div>
                        <div class="cLin">Equipo</div>
                        <div class="cLin">servicios</div>
                        <div class="cLin">Estado pedido</div>
                        <div class="cLin">Estado Linea</div> 
                        <div class="cLin cLinObs">Observaciones</div>
                    </div>
                    <div class="fLin">
                        <div class="cLin cLinId">1</div>
                        <div class="cLin">99386888</div>
                        <div class="cLin">Sin equipo</div>
                        <div class="cLin">plan familia</div>
                        <div class="cLin">Procesado</div>
                        <div class="cLin"><select id="Select2"><option value="1">Activo</option><option value="0">Baja</option></select></div> 
                        <div class="cLin cLinObs"></div>
                    </div>
                    <div class="fLin">
                        <div class="cLin cLinId">2</div>
                        <div class="cLin">99386888</div>
                        <div class="cLin">Iphone 4C</div>
                        <div class="cLin">plan familia</div>
                        <div class="cLin">Procesado</div>
                        <div class="cLin"><select id="Select1"><option value="1">Activo</option><option value="0">Baja</option></select></div> 
                        <div class="cLin cLinObs"></div>
                    </div>
                    <div class="fLin">
                        <div class="cLin cLinId">3</div>
                        <div class="cLin">99386888</div>
                        <div class="cLin">Sin equipo</div>
                        <div class="cLin">plan familia</div>
                        <div class="cLin">Procesado</div>
                        <div class="cLin"><select id="Select3"><option value="1">Activo</option><option value="0">Baja</option></select></div>  
                        <div class="cLin cLinObs"></div>
                    </div>
                    <div class="fLin">
                        <div class="cLin cLinId">4</div>
                        <div class="cLin">99386888</div>
                        <div class="cLin">Sansumg S4</div>
                        <div class="cLin">plan familia</div>
                        <div class="cLin">Procesado</div>
                        <div class="cLin"><select id="Select4"><option value="1">Activo</option><option value="0">Baja</option></select></div>  
                        <div class="cLin cLinObs"></div>
                    </div>
                </div>
                                <div>
                    <div style="float:right;"id="GuardarMisLineas">
                    Guardas cambios mis lineas
                    </div>
                </div>
            </div>

            <div id="btnComprar">
            Registrar pedido
            </div>
        </div>
    
    </div>
    </form>
</body>
</html>
