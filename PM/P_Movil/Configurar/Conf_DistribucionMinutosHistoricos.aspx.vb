Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Data
Imports System.Web.Services
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.ImportacionExportacion
Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Web.Script.Services
Imports UtilitarioWeb

Partial Class P_Movil_Configurar_Conf_DistribucionMinutosHistoricos
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        'Dim Parametros As BL_MOV_Parametros = Nothing
        'Dim Operador As BL_GEN_Operador = Nothing
        Dim Distribucion As BL_MOV_Distribucion_Configuracion = Nothing
        Try

            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

            If Not IsPostBack Then
                'Parametros = New BL_MOV_Parametros(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                'Dim lstParametros As List(Of ENT_MOV_Parametros) = Parametros.ListarPorGrupo("D1")
                'rblstTipoDistribucion.SelectedValue = lstParametros(0).Valor
                'rblstTipoDistribucion.Attributes("idParametro") = lstParametros(0).IdParametro
                '
                'rblstClaseDistribucion.SelectedValue = lstParametros(1).Valor
                'rblstClaseDistribucion.Attributes("idParametro") = lstParametros(1).IdParametro
                'If lstParametros(0).Valor <> "1" Then
                '    dvClaseDistribucion.Style("display") = ""
                'End If

                'Operador = New BL_GEN_Operador(oUsuario.IdCliente)
                'Dim lstOperador As List(Of ENT_GEN_Operador) = Operador.Listar(-1, "<Seleccionar>")

                Distribucion = New BL_MOV_Distribucion_Configuracion(oUsuario.IdCliente)
                Dim lstTipoDist As List(Of ENT_MOV_Distribucion_Tipo) = Distribucion.ListarDistribucionTipo()
                UtilitarioWeb.Dataddl(ddlTipDis, lstTipoDist, "vcNom", "inCod")
                ddlTipDis.SelectedValue = 2
                'UtilitarioWeb.Dataddl(ddlOperador, lstOperador, "vcNomOpe", "P_inCodOpe")
            End If

            'MsgBox(oUsuario.F_vcCodInt)
            Dim script As String = "var F_vcCodInt = " + oUsuario.F_vcCodInt
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)

            UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            'If Not IsNothing(Parametros) Then Parametros.Dispose()
            'If Not IsNothing(Operador) Then Operador.Dispose()
            If Not IsNothing(Distribucion) Then Distribucion.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Listar_Reporte(ByVal p_vcCriterio As String, ByVal p_idCuenta As String, ByVal p_vcCodInt2 As String, _
                                          ByVal p_SinEmpleado As String, ByVal p_inMeses As Integer, ByVal p_inTipDis As Integer) As List(Of Object)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim CuentaBolsa As BL_MOV_CuentaBolsaDistribucion = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            CuentaBolsa = New BL_MOV_CuentaBolsaDistribucion(oUsuario.IdCliente)


            Dim lista As New List(Of Object)
            Dim lstRep_1 As New List(Of ENT_MOV_Linea)
            Dim lstRep_2 As New List(Of ENT_MOV_Linea)

            Dim lstOrga_1 As New List(Of ENT_MOV_Linea)
            Dim lstOrga_2 As New List(Of ENT_MOV_Linea)

            Dim oDataSet As DataSet = CuentaBolsa.ListarDistribucionServicios_Reporte(p_vcCriterio, p_idCuenta, p_vcCodInt2, p_SinEmpleado, p_inMeses, p_inTipDis)

            Dim lsReporte As DataTable = oDataSet.Tables(0)
            Dim lsOrga As DataTable = oDataSet.Tables(1)

            For Each fila As DataRow In lsReporte.Rows
                Dim oLinea As New ENT_MOV_Linea

                oLinea.vcPeriodo = fila("vcPeriodo").ToString()
                oLinea.Cuenta.dcMon = Convert.ToDecimal(fila("dcCan"))
                oLinea.Cuenta.dcMonReal = Convert.ToDecimal(fila("dcCanReal"))
                oLinea.Cuenta.vcPorcentual = fila("dcCanRealPorc").ToString()
                oLinea.Cuenta.vcNom = fila("vcNom").ToString()

                lstRep_1.Add(oLinea)
            Next

            Dim dataView As New DataView(lsReporte)
            dataView.Sort = " vcNom "
            lsReporte = dataView.ToTable


            For Each fila As DataRow In lsReporte.Rows
                Dim oLinea As New ENT_MOV_Linea

                oLinea.vcPeriodo = fila("vcPeriodo").ToString()
                oLinea.Cuenta.dcMon = Convert.ToDecimal(fila("dcCan"))
                oLinea.Cuenta.dcMonReal = Convert.ToDecimal(fila("dcCanReal"))
                oLinea.Cuenta.vcPorcentual = fila("dcCanRealPorc").ToString()
                oLinea.Cuenta.vcNom = fila("vcNom").ToString()
                oLinea.Cuenta.P_vcCod = fila("P_vcCod").ToString()
                lstRep_2.Add(oLinea)
            Next

            lista.Add(lstRep_1)
            lista.Add(lstRep_2)

            For Each fila As DataRow In lsOrga.Rows
                Dim oLinea As New ENT_MOV_Linea

                oLinea.vcPeriodo = fila("vcPeriodo").ToString()
                oLinea.Cuenta.dcMon = Convert.ToDecimal(fila("dcCan"))
                oLinea.Cuenta.dcMonReal = Convert.ToDecimal(fila("dcCanReal"))
                'oLinea.Cuenta.vcPorcentual = fila("dcCanRealPorc").ToString()
                oLinea.Cuenta.vcNom = fila("vcNomAgrup").ToString() 'vcNom cambiado por wapumayta 02-02-2015

                lstOrga_1.Add(oLinea)
            Next

            Dim dvOrga As New DataView(lsOrga)
            dvOrga.Sort = "vcNomAgrup"
            lsOrga = dvOrga.ToTable

            For Each fila As DataRow In lsOrga.Rows
                Dim oLinea As New ENT_MOV_Linea

                oLinea.vcPeriodo = fila("vcPeriodo").ToString()
                oLinea.Cuenta.dcMon = Convert.ToDecimal(fila("dcCan"))
                oLinea.Cuenta.dcMonReal = Convert.ToDecimal(fila("dcCanReal"))
                'oLinea.Cuenta.vcPorcentual = fila("dcCanRealPorc").ToString()
                oLinea.Cuenta.vcNom = fila("vcNomAgrup").ToString()

                lstOrga_2.Add(oLinea)
            Next

            lista.Add(lstOrga_1)
            lista.Add(lstOrga_2)

            'graficos datos nuevo
            Dim lstDatosGrafico As New List(Of ENT_MOV_Linea)
            For Each fila As DataRow In oDataSet.Tables(2).Rows
                Dim oLinea As New ENT_MOV_Linea
                oLinea.vcPeriodo = fila("vcPeriodo").ToString()
                oLinea.Cuenta.dcMon = Convert.ToDecimal(fila("dcCan"))
                oLinea.Cuenta.dcMonReal = Convert.ToDecimal(fila("dcCanReal"))
                oLinea.Cuenta.vcPorcentual = fila("dcCanRealPorc").ToString()
                oLinea.Cuenta.vcNom = fila("vcNom").ToString()
                lstDatosGrafico.Add(oLinea)
            Next
            lista.Add(lstDatosGrafico)

            Return lista

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(CuentaBolsa) Then CuentaBolsa.Dispose()
        End Try
    End Function


    <WebMethod()>
    Public Shared Function Listar_Reporte_2(ByVal p_vcCriterio As String, ByVal p_idCuenta As String, ByVal p_vcCodInt2 As String, _
                                          ByVal p_SinEmpleado As String, ByVal p_inMeses As Integer, ByVal p_inTipDis As Integer) As List(Of Object)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim oCultura As ENT_GEN_Cultura = Nothing
        Dim CuentaBolsa As BL_MOV_CuentaBolsaDistribucion = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            oCultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            CuentaBolsa = New BL_MOV_CuentaBolsaDistribucion(oUsuario.IdCliente)

            Dim oDataSet As DataSet = CuentaBolsa.ListarDistribucionServicios_Reporte_Optimizado(p_vcCriterio, p_idCuenta, p_vcCodInt2, p_SinEmpleado, p_inMeses, p_inTipDis)

            Dim dtColumnas As DataTable = oDataSet.Tables(0)
            Dim dtCuentas As DataTable = oDataSet.Tables(1)
            Dim dtAgrup As DataTable = oDataSet.Tables(2)
            Dim dtDatosGrafico As DataTable = oDataSet.Tables(3)

            Dim lstResult As New List(Of Object)
            'Dim colModel_C As New List(Of Object)
            'Dim colModel_A As New List(Of Object)
            Dim arColumns As New List(Of String)

            Dim NomreTipoDistribucion As String
            Select Case (p_inTipDis)
                Case 1
                    NomreTipoDistribucion = "Centro de Costo"
                Case 2
                    NomreTipoDistribucion = "Área"
                Case 3
                    NomreTipoDistribucion = "Nivel"
                Case 4
                    NomreTipoDistribucion = "Grupo Empleado"
                Case Else
                    NomreTipoDistribucion = "Área"
            End Select

            Dim colModelCuentas As String = "["
            Dim colModelAgrupacion As String = "["
            colModelCuentas = colModelCuentas + "{""label"":""Código Cuenta"",""name"":""vcCod"",""index"":""vcCod"",""hidden"":true,""align"":""left"",""width"":85,""sortable"":false},"
            colModelCuentas = colModelCuentas + "{""label"":""Cuenta Bolsa"",""name"":""vcNom"",""index"":""vcNom"",""hidden"":false,""align"":""left"",""width"":300,""sortable"":true},"
            colModelAgrupacion = colModelAgrupacion + "{""label"":""Código Cuenta"",""name"":""vcCodAgrup"",""index"":""vcCodAgrup"",""hidden"":true,""align"":""left"",""width"":85,""sortable"":false},"
            colModelAgrupacion = colModelAgrupacion + "{""label"":""" + NomreTipoDistribucion + """,""name"":""vcNomAgrup"",""index"":""vcNomAgrup"",""hidden"":false,""align"":""left"",""width"":300,""sortable"":true},"
            For Each drCol As DataRow In dtColumnas.Rows
                colModelCuentas = colModelCuentas + "{""label"":""" + drCol("vcPeriodo").ToString() + """,""name"": """ + drCol("Periodo").ToString() + """,""index"": """ + drCol("Periodo").ToString() + """,""hidden"": false,""align"":""right"",""width"":85,""sortable"":true},"
                colModelCuentas = colModelCuentas + "{""label"":""" + drCol("vcPeriodo").ToString() + "_Real"",""name"": """ + drCol("Periodo").ToString() + "_Real"",""index"": """ + drCol("Periodo").ToString() + "_Real"",""hidden"": true,""align"":""right"",""width"":85,""sortable"":true},"
                colModelAgrupacion = colModelAgrupacion + "{""label"":""" + drCol("vcPeriodo").ToString() + """,""name"": """ + drCol("Periodo").ToString() + """,""index"": """ + drCol("Periodo").ToString() + """,""hidden"": false,""align"":""right"",""width"":85,""sortable"":true},"
                colModelAgrupacion = colModelAgrupacion + "{""label"":""" + drCol("vcPeriodo").ToString() + "_Real"",""name"": """ + drCol("Periodo").ToString() + "_Real"",""index"": """ + drCol("Periodo").ToString() + "_Real"",""hidden"": true,""align"":""right"",""width"":85,""sortable"":true},"
                arColumns.Add(drCol("Periodo").ToString())
                arColumns.Add(drCol("Periodo").ToString() + "_Real")
            Next
            colModelCuentas = colModelCuentas + "{""label"":""Total"",""name"":""Total"",""index"":""Total"",""hidden"":true,""align"":""right"",""width"":85,""sortable"":true},"
            colModelCuentas = colModelCuentas + "{""label"":""Total_Real"",""name"":""Total_Real"",""index"":""Total_Real"",""hidden"":true,""align"":""right"",""width"":85,""sortable"":true}]"
            colModelAgrupacion = colModelAgrupacion + "{""label"":""Total"",""name"":""Total"",""index"":""Total"",""hidden"":true,""align"":""right"",""width"":85,""sortable"":true},"
            colModelAgrupacion = colModelAgrupacion + "{""label"":""Total_Real"",""name"":""Total_Real"",""index"":""Total_Real"",""hidden"":true,""align"":""right"",""width"":85,""sortable"":true}]"

            lstResult.Add(colModelCuentas)
            lstResult.Add(colModelAgrupacion)

            Dim strNumFormat As String = UtilitarioWeb.DevuelveFormatoNumero(oCultura)

            Dim arDataCuentas As String = "["
            If dtCuentas.Rows.Count > 0 Then
                For Each drCuenta As DataRow In dtCuentas.Rows
                    arDataCuentas = arDataCuentas + "{""vcCod"":""" + drCuenta("vcCod").ToString() + """"
                    arDataCuentas = arDataCuentas + ",""vcNom"":""" + drCuenta("vcNom").ToString() + """"
                    For Each column As String In arColumns
                        arDataCuentas = arDataCuentas + ",""" + column + """:""" + UtilitarioWeb.DevuelveNumeroFormateado(drCuenta(column).ToString(), strNumFormat) + """"
                    Next
                    arDataCuentas = arDataCuentas + ",""Total"":""" + drCuenta("Total").ToString() + """"
                    arDataCuentas = arDataCuentas + ",""Total_Real"":""" + drCuenta("Total_Real").ToString() + """},"
                Next
                arDataCuentas = arDataCuentas.Substring(0, arDataCuentas.Length - 1)
            End If
            arDataCuentas = arDataCuentas + "]"
            lstResult.Add(arDataCuentas)

            Dim arDataAgrupacion As String = "["
            If dtAgrup.Rows.Count > 0 Then
                For Each drAgrupacion As DataRow In dtAgrup.Rows
                    arDataAgrupacion = arDataAgrupacion + "{""vcCodAgrup"":""" + drAgrupacion("vcCodAgrup").ToString() + """"
                    arDataAgrupacion = arDataAgrupacion + ",""vcNomAgrup"":""" + drAgrupacion("vcNomAgrup").ToString() + """"
                    For Each column As String In arColumns
                        arDataAgrupacion = arDataAgrupacion + ",""" + column + """:""" + UtilitarioWeb.DevuelveNumeroFormateado(drAgrupacion(column).ToString(), strNumFormat) + """"
                    Next
                    arDataAgrupacion = arDataAgrupacion + ",""Total"":""" + drAgrupacion("Total").ToString() + """"
                    arDataAgrupacion = arDataAgrupacion + ",""Total_Real"":""" + drAgrupacion("Total_Real").ToString() + """},"
                Next
                arDataAgrupacion = arDataAgrupacion.Substring(0, arDataAgrupacion.Length - 1)
            End If
            arDataAgrupacion = arDataAgrupacion + "]"
            lstResult.Add(arDataAgrupacion)

            Dim arMesesGrafico As String = "["
            For Each drCol As DataRow In dtColumnas.Rows
                arMesesGrafico = arMesesGrafico + "{""vcPeriodo"":""" + drCol("vcPeriodo").ToString() + """,""Periodo"": """ + drCol("Periodo").ToString() + """},"
            Next
            arMesesGrafico = arMesesGrafico.Substring(0, arMesesGrafico.Length - 1)
            arMesesGrafico = arMesesGrafico + "]"
            lstResult.Add(arMesesGrafico)

            Dim lstDatosGrafico As New List(Of ENT_MOV_Linea)
            For Each fila As DataRow In dtDatosGrafico.Rows
                Dim oLinea As New ENT_MOV_Linea
                oLinea.vcPeriodo = fila("vcPeriodo").ToString()
                oLinea.Cuenta.dcMon = Convert.ToDecimal(fila("dcCan"))
                oLinea.Cuenta.dcMonReal = Convert.ToDecimal(fila("dcCanReal"))
                oLinea.Cuenta.vcPorcentual = fila("dcCanRealPorc").ToString()
                oLinea.Cuenta.vcNom = fila("vcNom").ToString()
                lstDatosGrafico.Add(oLinea)
            Next
            lstResult.Add(lstDatosGrafico)

            Return lstResult
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(CuentaBolsa) Then CuentaBolsa.Dispose()
        End Try
    End Function
    
End Class

