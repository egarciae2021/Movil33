Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports System.IO

Public Class PedidoMirror
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim pedido As BL_MOV_CAM_Pedido
        Try
            If IsNothing(Session("Usuario")) Then
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
                'Response.Redirect("~\Login.aspx")
                'Exit Sub
            Else
                Dim IdPedido As String = Request.QueryString("IdPedido")

                pedido = New BL_MOV_CAM_Pedido(0)
                Dim pedidosRegistrados As DataSet = pedido.getDetalleMirror(CInt(IdPedido))

                Dim formato As String = " ""{0}"" :""{1}"" "
                Dim formatoNum As String = " ""{0}"" :{1} "
                Dim listafinal As New List(Of String)
                For i = 0 To pedidosRegistrados.Tables(0).Rows.Count - 1
                    Dim lista As New List(Of String)
                    For k = 0 To pedidosRegistrados.Tables(0).Columns.Count - 1

                        If pedidosRegistrados.Tables(0).Columns(k).ToString.Trim.Equals("PrecioEquipo") OrElse pedidosRegistrados.Tables(0).Columns(k).ToString.Trim.Equals("PrecioPlan") OrElse pedidosRegistrados.Tables(0).Columns(k).ToString.Trim.Equals("Total") Then
                            lista.Add(String.Format(formatoNum, pedidosRegistrados.Tables(0).Columns(k).ToString.Trim, pedidosRegistrados.Tables(0).Rows(i)(k).ToString.Trim))
                        Else
                            lista.Add(String.Format(formato, pedidosRegistrados.Tables(0).Columns(k).ToString.Trim, pedidosRegistrados.Tables(0).Rows(i)(k).ToString.Trim))
                        End If

                    Next
                    listafinal.Add("{" + String.Join(",", lista) + "}")
                Next

                Dim json As String = "[" + String.Join(",", listafinal) + "]"

                Dim script As String = "var datosGrilla = " + json + ";"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If pedido IsNot Nothing Then
                pedido.Dispose()
            End If
        End Try

    End Sub

End Class