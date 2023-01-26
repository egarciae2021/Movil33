Imports System.Data
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE

Partial Class _Mnt_SEG_Usuario_Rep
    Inherits System.Web.UI.Page

    ' ================================================================================================================
    '  MODULO DE SEGURIDAD - reporte de usuarios accesos y perfiles
    ' ================================================================================================================
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        ' ================================================================================================================
        ''crUsuario.Report.FileName = "Mnt_SEG_Usuario_Rep.rpt"
        ' ================================================================================================================
        Dim oUsuarioSis As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim idCli As Integer = oUsuarioSis.IdCliente
        Dim Cliente As BL_GEN_Cliente = New BL_GEN_Cliente(idCli)
        Dim oUsuario As BL_General = New BL_General(idCli)
        ' ================================================================================================================
        Dim dsDatos As New DataSet
        Dim dtDatos As New DataTable
        Dim dtUsuario As New DataTable
        ' ================================================================================================================
        dtDatos = oUsuario.Listar_Reporte("GEN_S_Usuario_REP", "", idCli)
        oUsuario.Dispose()

        dtUsuario = Cliente.Mostrar(idCli)
        Cliente.Dispose()
        ' ================================================================================================================
        dsDatos.Tables.Add(dtDatos.Copy)
        dsDatos.Tables(0).TableName = "GEN_S_Usuario_REP"

        dtUsuario.Rows(0)("vcDireccion") = oUsuarioSis.vcNom

        dsDatos.Tables.Add(dtUsuario.Copy)
        dsDatos.Tables(1).TableName = "GEN_s_Cliente_PorCodigo"
        ' ================================================================================================================
        ''crUsuario.ReportDocument.SetDataSource(dsDatos)

    End Sub
    ' ================================================================================================================
    ' ================================================================================================================
End Class
