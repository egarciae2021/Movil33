Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE

Public Class Comp_Con_ReporteEstadoLineas
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Estado As BL_MOV_Estado = Nothing

        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then

                    Estado = New BL_MOV_Estado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                    Dim dtEstado As DataTable = Estado.ListarPorModulo(1, 0, -1, "<< Seleccionar >>")
                    Dim query = From p In dtEstado.AsEnumerable() Where p.Field(Of Integer)("P_inCod") = -1 _
                                Or p.Field(Of Integer)("P_inCod") = 36 Or p.Field(Of Integer)("P_inCod") = 73 Select p
                    Dim dt2 As DataTable = query.CopyToDataTable()
                    UtilitarioWeb.Dataddl(ddlEstado, dt2, "vcNom", "P_inCod")

                    If (DateTime.Now.Month = 1) Then
                        txtDiaInicial.Text = DateTime.Now.AddDays(-DateTime.Now.Day - 30).ToShortDateString
                    Else
                        txtDiaInicial.Text = DateTime.Now.AddDays(-DateTime.Now.Day + 1 - DateTime.DaysInMonth(DateTime.Now.Year, DateTime.Now.Month - 1)).ToShortDateString
                    End If
                    txtDiaFinal.Text = DateTime.Now.AddDays(-DateTime.Now.Day).ToShortDateString



                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If

        Catch ex As Exception

        Finally
            If Estado IsNot Nothing Then Estado.Dispose()

        End Try
    End Sub

End Class