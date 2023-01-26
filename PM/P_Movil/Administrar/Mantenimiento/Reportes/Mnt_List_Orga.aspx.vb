Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Public Class Mnt_List_Orga
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Orga As BL_GEN_Organizacion = Nothing
        Dim Nive As BL_GEN_Nivel = Nothing
        Dim CentCost As BL_GEN_CentroCosto = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Orga = New BL_GEN_Organizacion(oUsuario.IdCliente)
            Nive = New BL_GEN_Nivel(oUsuario.IdCliente)
            CentCost = New BL_GEN_CentroCosto(oUsuario.IdCliente)

            If IsNothing(Session("Usuario")) Then
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    UtilitarioWeb.Dataddl(ddlNivel, Nive.Listar(-1, "<Todos>"), "vcNomNiv", "P_inCodNiv")
                    UtilitarioWeb.Dataddl(ddlCentCost, CentCost.ListarCentroCosto(-1, "<Todos>"), "vcNomCenCos", "P_vcCodCenCos")
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Orga IsNot Nothing Then Orga.Dispose()
            If Nive IsNot Nothing Then Nive.Dispose()
            If CentCost IsNot Nothing Then CentCost.Dispose()
        End Try
    End Sub

End Class