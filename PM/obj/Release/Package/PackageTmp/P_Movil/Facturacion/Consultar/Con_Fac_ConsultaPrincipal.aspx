<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Con_Fac_ConsultaPrincipal.aspx.vb" Inherits="Con_Fac_ConsultaPrincipal"
    EnableViewState="false" EnableEventValidation="false" Async="true" %>

<%@ Register TagPrefix="cc1" Namespace="VisualSoft.Comun.LibreriaJQ" Assembly="VisualSoft.Comun.LibreriaJQ" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />

    <style type="text/css">
        .ui-jqgrid tr.jqgrow {
            height: 22px !important;
        }

        .ui-jqgrid .ui-jqgrid-htable th {
            height: 20px !important;
        }

        .ui-jqgrid-bdiv {
            overflow-x: hidden !important;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div style="height: 550px; overflow-y: hidden;">
            <asp:HiddenField runat="server" ID="hdfNumCel" />
            <asp:HiddenField runat="server" ID="hdfCodCue" />
            <asp:HiddenField runat="server" ID="hdfPer" />
            <asp:HiddenField runat="server" ID="hfdMesPer" />
            <asp:HiddenField runat="server" ID="hdfCodOpe" />
            <asp:HiddenField runat="server" ID="hdfCodGrupo" />
            <asp:HiddenField runat="server" ID="hdfCodConcepto" />
            <center>
                <div style="width: 860px">

                    <%--<table border ="0" style="width: 95%" cellpadding="0" cellspacing="0" >
                    <tr id="Tr1">
                        <td  style="vertical-align:middle">
                            <div  class="ui-state-default ui-th-column ui-th-ltr" style="font-size:12px;  text-align :center; " >
                                <table style="width:100%" border="0" >
                                    <tr>
                                        <td style="vertical-align:middle;height:15px;width:95%;" align="center">
                                            
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                </table>--%>

                    <li class="list-header-main">
                        <label for="lblTituloDashboard">Facturación  </label>
                        <label id="lblPer" runat="server"></label>
                    </li>
                    <hr class="hr" style="margin-left: 15px;" />

                    <div id="divCuenta" style="display: none" runat="server">
                        <table style="width: 95%;" border="0">
                            <tr>
                                <td align="center" style="width: 50%; vertical-align: top;" valign="top">
                                    <div style="height: 30px;">
                                        <table style="width: 100%; text-align: left; font-size: 12px" border="0">
                                            <tr>
                                                <td style="font-weight: bold; color: #2e6e9e; width: 40px; text-align: left; vertical-align: middle">
                                                    <label id="Label1" for="lblCodCuenta">Cuenta</label>
                                                </td>
                                                <td style="text-align: left">
                                                    <label id="lblCodCuenta" for="lblCodCuenta" runat="server"></label>
                                                    &nbsp;&nbsp;
                                                <label id="lblNomCuenta" for="lblNomCuenta" runat="server"></label>
                                                </td>

                                                <td></td>

                                                <td style="width: 20%; text-align: left; vertical-align: middle">
                                                    <label></label>
                                                </td>
                                                <td style="text-align: right">
                                                    <label id="lblCantLin" for="lblCantLin" runat="server"></label>
                                                    líneas
                                                </td>
                                            </tr>
                                            <tr style="display: none;">
                                                <td style="font-weight: bold; color: #2e6e9e; width: 20%; text-align: left; vertical-align: middle">
                                                    <label>Operador</label>
                                                </td>
                                                <td style="text-align: left">
                                                    <label id="lblOperador" for="lblOperador" runat="server"></label>
                                                    &nbsp;&nbsp;
                                                <label id="lblCodOperador" runat="server" visible="False"></label>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div id="divLinea" runat="server">
                        <table style="width: 95%;" border="0">
                            <tr>
                                <td align="center" style="width: 50%;" valign="top">
                                    <div style="height: 30px;">
                                        <table style="width: 100%; text-align: left; font-size: 12px" border="0">
                                            <tr>
                                                <td style="font-weight: bold; color: #2e6e9e; width: 30px; text-align: left; vertical-align: middle">
                                                    <label id="lblLinea" for="lblLinea">Línea</label>
                                                </td>
                                                <td style="text-align: left">
                                                    <label id="lblNum" for="lblNum" runat="server"></label>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <label id="lblCue" for="lblCue" runat="server"></label>
                                                </td>

                                                <td></td>
                                                <td style="font-weight: bold; color: #2e6e9e; width: 25%; text-align: right; vertical-align: middle">
                                                    <label id="lblEmp" for="lblEmp">Empleado</label>
                                                </td>
                                                <td style="text-align: left">
                                                    <label id="lblNomEmp" for="lblNomEmp" runat="server"></label>
                                                </td>
                                            </tr>
                                            <tr style="display: none;">
                                                <td style="font-weight: bold; color: #2e6e9e; width: 25%; text-align: left; vertical-align: middle">
                                                    <label>Operador</label>
                                                </td>
                                                <td>
                                                    <label id="lblOpe" for="lblOpe" runat="server"></label>
                                                </td>
                                            </tr>
                                            <tr>
                                            </tr>
                                            <tr style="display: none;">
                                                <td style="font-weight: bold; color: #2e6e9e; width: 25%; text-align: left; vertical-align: middle">
                                                    <label id="Label6" for="lblEmp">Área</label>
                                                </td>
                                                <td style="text-align: left">
                                                    <label id="lblArea" for="lblArea" runat="server"></label>
                                                </td>
                                            </tr>

                                        </table>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <table style="width: 60%;" border="0" cellpadding="0" cellspacing="1">
                        <tr id="Tr2">
                            <td align="left" style="vertical-align: top;">
                                <%--<div class="ui-state-default ui-th-column ui-th-ltr" style="height: 18px;">
                                    <table style="width: 100%" border="0">
                                        <tr>
                                            <td style="width: 25%; text-align: center; font-size: 11px; vertical-align: middle">
                                                
                                            </td>
                                        </tr>
                                    </table>
                                </div>--%>

                                <li class="list-header">
                                    <label id="Label4" for="lblLinea">Por Grupos</label>
                                </li>
                                <hr class="hr" />

                                <div>
                                    <table id="tbGrupo"></table>
                                </div>
                            </td>
                            <td style="width: 10px">&nbsp;&nbsp;&nbsp;</td>
                            <td align="left" style="width: 50%; vertical-align: top;" valign="top">
                                <%--<div class="pnlTit ui-state-active" align="center">
                                : 
                            </div>   --%>
                                <li class="list-header">Histórico de Consumo
                                </li>
                                <hr class="hr" />

                                <div align="center" id="dvGrafHisLinea"></div>
                            </td>
                        </tr>
                        <tr>
                            <td style="height: 1px"></td>
                        </tr>
                        <tr>
                            <td style="width: 50%; top: 0px; vertical-align: top;">
                                <li class="list-header">
                                    <label id="Label5" for="lblGrupo">Detalle de Grupo </label>
                                    <label runat="server" id="lblGrupo"></label>
                                </li>
                                <hr class="hr" />

                                <div>
                                    <table id="tbConcepto"></table>
                                </div>
                            </td>
                            <td style="width: 10px">&nbsp;&nbsp;&nbsp;</td>
                            <td style="width: 50%; top: 0px;">
                                <%--<div class="pnlTit ui-state-active" align="center">
                                    : 
                                </div>--%>

                                <li class="list-header">Top por Conceptos
                                </li>
                                <hr class="hr" style="margin-bottom: 0px;"/>

                                <div align="center" id="dvGrafPieLinea"></div>
                            </td>
                        </tr>
                    </table>

                </div>
            </center>
        </div>

        <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
        <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
        <script type="text/javascript" src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js"></script>
        <script src="../../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
        <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
        <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
        <script src="../../../Common/Scripts/FusionCharts/FusionCharts.js" type="text/javascript"></script>
        <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Con_Fac_ConsultaPrincipal.js")%>" type="text/javascript"></script>
    </form>
</body>
</html>
