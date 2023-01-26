Imports System.Data
Imports VisualSoft.Suite80.BL
''Imports CrystalDecisions.CrystalReports.Engine
Imports VisualSoft.Suite80.BE

Partial Class General_Administrar_Reportes_Rpt_CentroCosto
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        ''crCentroCosto.Report.FileName = "Rpt_CentroCosto.rpt"
        Dim oCenCosto As BL_GEN_CentroCosto = New BL_GEN_CentroCosto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim dsDatos As New DataSet
        Dim dtDatos As New DataTable
        Try
            dtDatos = oCenCosto.ListarReporte
            oCenCosto.Dispose()
        Catch ex As Exception

        End Try

        dsDatos.Tables.Add(dtDatos.Copy)
        dsDatos.Tables(0).TableName = "tblCentroCosto"
        ''crCentroCosto.ReportDocument.SetDataSource(dsDatos)
    End Sub
End Class
