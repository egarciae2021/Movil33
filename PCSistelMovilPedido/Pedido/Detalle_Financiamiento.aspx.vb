Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization

Public Class Detalle_Financiamiento
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim objBlFinanciamientoTipo As BL_MOV_CAM_FinanciamientoTipo
        Try
            If IsNothing(Session("Usuario")) Then
                Dim script As String = "window.top.location.reload()"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                
                Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                If oUsuario Is Nothing Then
                    Dim script As String = "window.top.location.reload();"
                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
                    Exit Sub
                End If
                If Not IsPostBack Then
                    'Obtiene Datos Empleado....
                    If oUsuario.Empleado.P_vcCod IsNot Nothing AndAlso oUsuario.Empleado.P_vcCod <> "" Then
                        hdfEmpleado.Value = oUsuario.Empleado.P_vcCod
                        hdfIdUsuarioLogeado.Value = oUsuario.P_inCod

                        Dim IdTipoFinanciamiento As String = Request.QueryString("IdTipoFinanciamiento")
                        objBlFinanciamientoTipo = New BL_MOV_CAM_FinanciamientoTipo(oUsuario.IdCliente)
                        Dim FinanciamientoTipo As MOV_CAM_FinanciamientoTipo = objBlFinanciamientoTipo.Mostrar(CInt(IdTipoFinanciamiento))
                        Dim js As New JavaScriptSerializer()
                        Dim script = "var p_FinanciamientoTipo = " + js.Serialize(FinanciamientoTipo) + "; "
                        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)

                    Else
                        Response.Redirect("~\Pedido\Dashboard_pedido.aspx")
                        Exit Sub
                    End If
                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If objBlFinanciamientoTipo IsNot Nothing Then
                objBlFinanciamientoTipo.Dispose()
            End If
        End Try
    End Sub

End Class