<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="ErrorNoPagina.aspx.vb" Inherits=".ErrorNoPagina" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Error | PCSistel Móvil 3.3 - Web Admin </title>

    <link rel="shortcut icon" href="Content/img/favicon.png" type="image/x-icon" />
    <link href="Content/css/shared/fonts.css" rel="stylesheet" type="text/css" />
    <link href="Content/css/shared/bootstrap.min.css" rel="stylesheet" />
    <link href="Content/css/shared/nifty.min.css" rel="stylesheet" />
    <link href="Content/css/shared/nifty-demo-icons.min.css" rel="stylesheet" />
    <link href="Content/css/shared/pace.min.css" rel="stylesheet" />
    <script type="text/javascript" src="Content/js/shared/pace.min.js"></script>
    <link href="Content/css/shared/nifty-demo.min.css" rel="stylesheet" />
</head>
<body>
    <form id="form2" runat="server">
        <div id="container" class="cls-container">
            <div class="cls-header">
                <div class="cls-brand">
                    <a class="box-inline" href="#">
                        <!-- <img alt="Nifty Admin" src="img/logo.png" class="brand-icon"> -->
                        <span class="brand-title">PCSistel<span class="text-thin"> Móvil 3.3</span></span>
                    </a>
                </div>
            </div>
            <div class="cls-content">
                <%--<h1 class="error-code text-warning">500</h1>--%>
                <h1 class="error-code">404</h1>
                <p class="h4 text-uppercase text-bold">P&aacute;gina no encontrada</p>
                <div class="pad-btm">
                    La p&aacute;gina consultada no existe, comuníquese con su administrador.
                </div>
            </div>
        </div>
    </form>

    <script src="Content/js/shared/jquery.min.js"></script>
    <script src="Content/js/shared/bootstrap.min.js"></script>
    <script src="Content/js/shared/nifty.min.js"></script>

</body>
</html>
