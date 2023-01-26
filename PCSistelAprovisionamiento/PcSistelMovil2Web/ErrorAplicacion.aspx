<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ErrorAplicacion.aspx.cs" Inherits="PcSistelMovil2Web.ErrorAplicacion" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Error | PCSistel Aprovisionamiento 3.3</title>

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
    <form id="form1" runat="server">
        <div id="container" class="cls-container">
            <div class="cls-header">
                <div class="cls-brand">
                    <a class="box-inline" href="#">
                        <!-- <img alt="Nifty Admin" src="img/logo.png" class="brand-icon"> -->
                        <span class="brand-title">PCSistel<span class="text-thin"> Aprovisionamiento 3.3</span></span>
                    </a>
                </div>
            </div>
            <div class="cls-content">
                <%--<h1 class="error-code text-warning">500</h1>--%>
                <h1 class="error-code">500</h1>
                <p class="h4 text-uppercase text-bold">Error en el servidor!</p>
                <div class="pad-btm">
                    La siguiente página ha producido un error, comuníquese con su administrador.
                </div>
            </div>
        </div>
    </form>
</body>
<script src="Content/js/shared/jquery.min.js"></script>
<script src="Content/js/shared/bootstrap.min.js"></script>
<script src="Content/js/shared/nifty.min.js"></script>
</html>
