Imports System.Data
Imports VisualSoft.Suite80.BL
''Imports CrystalDecisions.CrystalReports.Engine
Imports VisualSoft.Suite80.BE

Partial Class _Mnt_SEG_Usuario_Opc
    Inherits System.Web.UI.Page

    ' ================================================================================================================
    '  MODULO DE SEGURIDAD
    ' ================================================================================================================
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        ' ================================================================================================================
        ''.Report.FileName = "Mnt_SEG_Usuario_Opc.rpt"

        ' ================================================================================================================
        Dim oUsuarioSis As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim idCli As Integer = oUsuarioSis.IdCliente
        Dim oUsuario As BL_General = New BL_General(idCli)
        Dim Cliente As BL_GEN_Cliente = New BL_GEN_Cliente(idCli)
        ' ================================================================================================================
        Dim dsAllTable As New DataSet

        Dim dtDatos As New DataTable
        Dim dtUsuario As New DataTable
        ' ================================================================================================================
        dtDatos = oUsuario.Listar_Reporte("GEN_S_Usuario_OPC", "", idCli)
        oUsuario.Dispose()

        dtUsuario = Cliente.Mostrar(idCli)
        Cliente.Dispose()
        ' ================================================================================================================
        dsAllTable.Tables.Add(dtDatos.Copy)
        dsAllTable.Tables(0).TableName = "GEN_S_Usuario_REP"

        dtUsuario.Rows(0)("vcDireccion") = oUsuarioSis.vcNom

        dsAllTable.Tables.Add(dtUsuario.Copy)
        dsAllTable.Tables(1).TableName = "GEN_s_Cliente_PorCodigo"
        ' ================================================================================================================
        ''crUsuario.ReportDocument.SetDataSource(dsAllTable)
        ' ================================================================================================================
    End Sub
    ' ================================================================================================================
    ' ================================================================================================================
End Class
