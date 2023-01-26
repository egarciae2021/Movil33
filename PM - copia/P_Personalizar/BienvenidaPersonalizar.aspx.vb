Imports VisualSoft.Suite80.BE

Partial Class BienvenidaPersonalizar
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If IsNothing(Session("Usuario")) Then
            'Dim script As String = "window.parent.location.reload()"
            Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
        Else
            Try
                If Not IsPostBack Then
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            Catch ex As Exception
                Throw ex
            End Try
        End If
    End Sub
End Class