<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="PedidoMirror.aspx.vb" Inherits="WebSiteCliente.PedidoMirror" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../Common/Scripts/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="../Common/Scripts/JqueryUI/jquery-ui.js"></script>
    <script src="../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script type="text/javascript" src="PedidoMirror.js"></script>
    <link href="Pedido.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
    #tapProceso
    {
        /*display:block;*/
    }
    
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div>

    <div id="cuerpoTaps">
                <div class="navtaps">
                    <div  id="tapProceso" class="tap">
                        Proceso compra
                    </div>
                </div>
                <div id="detalleTaps">
                    <div id="pProcesoCompra">
                    <div id="grid1"></div>

                        <div id="btnVolverPedidos" class="k-button" style="width:200px; height:30px; margin:40px 0px 0px 300px; font-weight:bolder;">
                            Ir a mis pedidos
                        </div>
                    </div>
                </div>
            </div>
    
    </div>
    </form>
</body>
</html>
