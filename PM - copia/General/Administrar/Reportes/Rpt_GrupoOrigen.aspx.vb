Imports System.Data
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE

Partial Class General_Administrar_Reportes_Rpt_GrupoOrigen
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        ''crGrupoOrigen.Report.FileName = "Rpt_GrupoOrigen.rpt"
        Dim oGrupoOrigen As BL_GEN_GrupoOrigen = New BL_GEN_GrupoOrigen(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim dsDatos As New DataSet
        Dim dtDatos As New DataTable
        Try
            dtDatos = oGrupoOrigen.ListarReporte
        Catch ex As Exception

        End Try
        oGrupoOrigen.Dispose()
        dsDatos.Tables.Add(dtDatos.Copy)
        dsDatos.Tables(0).TableName = "tblGrupoOrigen"
        ''crGrupoOrigen.ReportDocument.SetDataSource(dsDatos)
    End Sub
End Class
