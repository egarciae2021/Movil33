Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Public Class Mnt_List_Modelos
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Gama As BL_MOV_TipoServicio = Nothing
        Dim Estado As BL_MOV_Estado = Nothing
        Dim Modelo As BL_MOV_ModeloDispositivo = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Gama = New BL_MOV_TipoServicio(oUsuario.IdCliente)
            Estado = New BL_MOV_Estado(oUsuario.IdCliente)
            Modelo = New BL_MOV_ModeloDispositivo(oUsuario.IdCliente)

            If IsNothing(Session("Usuario")) Then
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    UtilitarioWeb.Dataddl(ddlGama, Gama.Listar(-1, "<Todos>"), "vcNom", "P_inCodTipSer")
                    UtilitarioWeb.Dataddl(ddlModelo, Modelo.Listar(-1, "<Todos>"), "vcNom", "P_inCod")
                    UtilitarioWeb.Dataddl(ddlEstado, Estado.ListarEstadoMovilReporte(-1, "<Todos>"), "vcNom", "P_inCod")
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Gama IsNot Nothing Then Gama.Dispose()
            If Estado IsNot Nothing Then Estado.Dispose()
            If Modelo IsNot Nothing Then Modelo.Dispose()
        End Try
    End Sub

End Class