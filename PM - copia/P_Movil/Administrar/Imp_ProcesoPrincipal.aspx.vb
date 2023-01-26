Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios

Partial Class P_Movil_Administrar_Imp_ProcesoPrincipal
    Inherits System.Web.UI.Page
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Criterio As BL_MOV_IMP_Criterio = Nothing
        Try
            If Not IsPostBack Then
                hdfOperadorDefault.Value = "" & ConfigurationManager.AppSettings("IdOperadorDefault")
                'hdfAccion.Value = Request.QueryString("inAcc")
                Criterio = New BL_MOV_IMP_Criterio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                hdfHayData.Value = Criterio.HayDataLlamadas().ToString()
            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub
End Class
