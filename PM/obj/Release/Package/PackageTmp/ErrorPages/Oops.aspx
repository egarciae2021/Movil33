<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Oops.aspx.vb" Inherits=".Oops" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">


    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Login | PCSistel Móvil 3.3 - Web Admin </title>

    <link rel="shortcut icon" href="Content/img/favicon.png" type="image/x-icon">
    <link href="../Content/css/shared/fonts.css" rel="stylesheet" type="text/css" />
    <link href="../Content/css/shared/bootstrap.min.css" rel="stylesheet" />
    <link href="../Content/css/shared/nifty.min.css" rel="stylesheet" />
    <link href="../Content/css/shared/nifty-demo-icons.min.css" rel="stylesheet" />
    <link href="../Content/css/shared/pace.min.css" rel="stylesheet" />
    <script type="text/javascript" src="../Content/js/shared/pace.min.js"></script>
    <link href="../Content/css/shared/nifty-demo.min.css" rel="stylesheet" />
    <link href="../Content/css/layout/generalLogin.css" rel="stylesheet" />
    <script src="../Content/js/shared/aes.js"></script>
    <link href="../Common/Styles/Login.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/KendoUI/kendo.silver.min.css" rel="stylesheet" type="text/css" />

</head>
<body>
    <form id="form1" runat="server">
        <div>
            <div id="container" class="cls-container">
                <div class="cls-header">
                    <div class="cls-brand">
                        <a class="box-inline" href="index.html">
                            <!-- <img alt="Nifty Admin" src="img/logo.png" class="brand-icon"> -->
                            <span class="brand-title">Nifty<span class="text-thin">Admin</span></span>
                        </a>
                    </div>
                </div>
                <div class="cls-content">
                    <h1 class="error-code text-purple">500</h1>
                    <p class="h4 text-uppercase text-bold">Internal Server Error!</p>
                    <div class="pad-btm">
                        Something went wrong and server couldn't process your request.
                    </div>
                    <div class="row mar-ver">
                        <form class="col-xs-12 col-sm-10 col-sm-offset-1" method="post" action="pages-search-results.html">
                            <input type="text" placeholder="Search.." class="form-control error-search">
                        </form>
                    </div>
                    <hr class="new-section-sm bord-no">
                    <div class="pad-top"><a class="btn btn-purple" href="index.html">Return Home</a></div>
                </div>
            </div>
        </div>
    </form>

    <script src="../Content/js/shared/jquery.min.js"></script>
    <script src="../Content/js/shared/bootstrap.min.js"></script>
    <script src="../Content/js/shared/nifty.min.js"></script>

</body>
</html>
