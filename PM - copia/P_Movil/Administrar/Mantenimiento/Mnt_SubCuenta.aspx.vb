Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Services
Imports System.Data


Partial Class P_Movil_Administrar_Mantenimiento_Mnt_SubCuenta
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim inCodSubCue As String = Request.QueryString("Cod")
                    hdfSubCuenta.Value = inCodSubCue
                    ttgInfoCosteo.Mensaje = "Esta opción me permite activar o desactivar el prorrateo de la SubCuenta o Servicio actual."
                    ttgInfoCosteoXLinea.Mensaje = "Esta opción me permite poder prorratear asignando el monto especificado a las líneas asociada a esta SubCuenta o Servicio actual."
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Mostrar(ByVal inCodSubCue As String) As ENT_MOV_SubCuenta
        Try
         Dim Cuenta As BL_MOV_Cuenta = New BL_MOV_Cuenta(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

         Dim _return As ENT_MOV_SubCuenta = Cuenta.MostrarSubCuenta(Convert.ToInt32(inCodSubCue))
         Cuenta.Dispose()

         Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ObtenerCantidadLineasAsociadas(ByVal prInOpcion As String, ByVal prvcCodCta As String, ByVal prInCodigo As String) As String
        Dim Cuenta As BL_MOV_Cuenta = Nothing
        Try
            Cuenta = New BL_MOV_Cuenta(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim ds As New DataSet
            Dim vcCantidadLineas As String
            ds = Cuenta.ObtenerCantidadLineasAsociadas(prInOpcion, prvcCodCta, prInCodigo)
            If Not ds.Tables(0) Is Nothing Then
                vcCantidadLineas = ds.Tables(0).Rows(0)("Linea").ToString()
            Else
                vcCantidadLineas = 0
            End If
            Return vcCantidadLineas
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Cuenta) Then Cuenta.Dispose()
        End Try
    End Function
End Class
