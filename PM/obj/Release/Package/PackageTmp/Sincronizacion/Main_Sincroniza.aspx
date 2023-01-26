<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Main_Sincroniza.aspx.vb" Inherits="Main_Sincroniza" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>   
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script type="text/javascript" src="Main_Sincroniza.js"></script>   
    <script type="text/javascript">
         $(document).ready(function () {
             //
             var alto = $(window).height();
             $("#TabPrincipal").tabs({});            
             //
             $(".frame1").css({ "height": alto - 100 });
             //$("body").css({ "font-size": "70%" });

         });
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div id="TabPrincipal" class="dvTabContenido">
            <ul>
              <li><a href="#tabs-1">Configuración</a></li>
              <li><a href="#tabs-2">Programación</a></li>
              <li><a href="#tabs-3">Resúmenes<asp:HiddenField ID="hdtipo" runat="server" />
                  </a></li>
            </ul>
          <div id="tabs-1">
		        <iframe class="frame1" src="Sin_Configura.aspx" style="width:100%;" frameborder="0" >
		        </iframe>
          </div>
          <div id="tabs-2">
		        <iframe class="frame1" src="Sin_programacion.aspx" style="width:100%;" frameborder="0" >
		        </iframe>
          </div>
          <div id="tabs-3">
		        <iframe class="frame1" src="Sin_Utilitarios.aspx" style="width:100%;" frameborder="0" >
		        </iframe> 
          </div>
        </div>
    </form>
</body>
</html>
