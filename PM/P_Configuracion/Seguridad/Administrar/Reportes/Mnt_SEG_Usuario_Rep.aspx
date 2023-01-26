<%@ Page Language="VB" AutoEventWireup="false" Inherits="_Mnt_SEG_Usuario_Rep" Codebehind="Mnt_SEG_Usuario_Rep.aspx.vb" %>

<%@ Register assembly="CrystalDecisions.Web, Version=13.0.2000.0, Culture=neutral, PublicKeyToken=692fbea5521e1304" namespace="CrystalDecisions.Web" tagprefix="CR" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>

    <form id="form1" runat="server">

        <div>
    
            <CR:CrystalReportViewer EnableDatabaseLogonPrompt="false" ID="crvUsuario" runat="server" 
                                    ReportSourceID="crUsuario" AutoDataBind="true" 
                                    Width="100%" ToolPanelView="None" 
                                    HasToggleGroupTreeButton="false"
                                    EnableDrillDown="False" HasCrystalLogo="False" 
                                    HasDrilldownTabs="False"/>

            <CR:CrystalReportSource runat="server" ID="crUsuario">

                    <Report FileName="Mnt_SEG_Usuario_Rep.rpt"></Report>

            </CR:CrystalReportSource>

        </div>

    </form>

</body>
</html>
