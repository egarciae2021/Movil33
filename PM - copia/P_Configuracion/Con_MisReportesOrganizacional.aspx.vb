Imports System
Imports System.Collections.Generic
Imports System.Linq
Imports System.Web
Imports System.Web.UI
Imports System.Web.UI.WebControls
Imports System.Web.Services
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Data


Partial Class P_Configuracion_Con_MisReportesOrganizacional
   Inherits System.Web.UI.Page
   Protected Sub Page_Load(ByVal sender As Object, ByVal e As EventArgs) Handles Me.Load
      If Not IsPostBack Then
         Dim dt As DataTable = DirectCast(Session("datos"), DataTable)
         hdfCodEmp.Value = "0" 'dt.Rows(0)("USUA_F_vcCODEMP").ToString()
      End If
   End Sub

   <WebMethod()> _
   Public Shared Function ListarMisReportes(ByVal vcCodEmp As String) As List(Of ENT_MOV_Reporte)
      Dim _idUsuario As Int32 = Convert.ToInt32(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod)
      ''Dim objBLReporte As BL_MOV_Reporte = New BL_MOV_Reporte(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
      Dim MisReportes As List(Of ENT_MOV_Reporte) = Nothing ' objBLReporte.GetEmpresaPaisPorNombreSoloPais(Convert.ToInt32(vcCodEmp), _idUsuario, "%")
      Return MisReportes
   End Function


   <WebMethod()> _
   Public Shared Function EliminarReporte(ByVal codreporte As String) As Integer
      Dim _idUsuario As Int32 = Convert.ToInt32(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod)
      Dim objBLReporte As BL_MOV_Reporte = New BL_MOV_Reporte(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
      Dim _return As Integer = objBLReporte.DeleteReporte(0, _idUsuario, Convert.ToInt32(codreporte))
      objBLReporte.Dispose()
      Return _return
   End Function
End Class
