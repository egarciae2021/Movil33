﻿<%@ Page Language="VB" AutoEventWireup="false" Inherits="General_Administrar_Reportes_Rpt_CentroCosto" Codebehind="Rpt_CentroCosto.aspx.vb" %>

<%@ Register assembly="CrystalDecisions.Web, Version=13.0.2000.0, Culture=neutral, PublicKeyToken=692fbea5521e1304" namespace="CrystalDecisions.Web" tagprefix="CR" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
        <CR:CrystalReportViewer ID="crvCentroCosto" runat="server" 
            ReportSourceID="crCentroCosto" AutoDataBind="true" ToolPanelView="None" HasToggleGroupTreeButton="false" EnableDatabaseLogonPrompt="false"
            />
        <CR:CrystalReportSource runat="server" ID="crCentroCosto">
            <Report FileName="Rpt_CentroCosto.rpt"></Report>
        </CR:CrystalReportSource>
    </div>
    </form>
</body>
</html>
