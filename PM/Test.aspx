<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Test.aspx.vb" Inherits=".Test" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Prueba Pivot</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <script src="jquery-3.1.0.min.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdn3.devexpress.com/jslib/17.1.7/css/dx.spa.css" />
    <link rel="stylesheet" type="text/css" href="https://cdn3.devexpress.com/jslib/17.1.7/css/dx.common.css" />
    <link rel="dx-theme" data-theme="generic.light.compact" href="https://cdn3.devexpress.com/jslib/17.1.7/css/dx.light.compact.css" />
    <script src="https://cdn3.devexpress.com/jslib/17.1.7/js/dx.all.js"></script>
    <script src="test_data.js"></script>
    <script src="test_index.js"></script>

    <style>
        #sales {
            margin: 20px 0;
        }
    </style>

</head>


<body class="dx-viewport">

    <form id="form1" runat="server">

        <div class="demo-container">
            <div id="sales"></div>
            <div id="sales-popup"></div>
        </div>

    </form>

</body>

</html>
