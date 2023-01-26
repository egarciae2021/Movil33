Imports System.Web.Services
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BL
Imports System.Web.Script.Serialization
Imports System.IO
Imports VisualSoft.PCSistelMovil.Campana.BE

Partial Class P_Movil_Configurar_Cam_Conf_Credito
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim CreditoConfiguracion As BL_MOV_CAM_CreditoConfiguracion = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    CreditoConfiguracion = New BL_MOV_CAM_CreditoConfiguracion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim oCreditoConfiguracion As MOV_CAM_CreditoConfiguracion = CreditoConfiguracion.Mostrar(0)

                    If oCreditoConfiguracion.IdCreditoConfiguracion <> 0 Then
                        hdfIdCreditoConfiguracion.Value = oCreditoConfiguracion.IdCreditoConfiguracion
                    End If
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CreditoConfiguracion IsNot Nothing Then
                CreditoConfiguracion.Dispose()
            End If
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Mostrar(ByVal p_IdCreditoConfiguracion As String) As MOV_CAM_CreditoConfiguracion
        Dim CreditoConfiguracion As BL_MOV_CAM_CreditoConfiguracion = Nothing

        Try
            CreditoConfiguracion = New BL_MOV_CAM_CreditoConfiguracion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Return CreditoConfiguracion.Mostrar(Integer.Parse(p_IdCreditoConfiguracion))
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CreditoConfiguracion IsNot Nothing Then
                CreditoConfiguracion.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Guardar(ByVal p_oCreditoConfiguracion As String) As Integer
        Dim CreditoConfiguracion As BL_MOV_CAM_CreditoConfiguracion = Nothing

        Try
            CreditoConfiguracion = New BL_MOV_CAM_CreditoConfiguracion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oSerializer As New JavaScriptSerializer
            Dim oCreditoConfiguracion As MOV_CAM_CreditoConfiguracion = oSerializer.Deserialize(Of MOV_CAM_CreditoConfiguracion)(p_oCreditoConfiguracion)
            Return CreditoConfiguracion.Guardar(oCreditoConfiguracion)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CreditoConfiguracion IsNot Nothing Then
                CreditoConfiguracion.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarAsignacionCredito() As List(Of Object)
        Try
            Dim lstAsignacionCredito As New List(Of Object)

            Dim dict1 As New Dictionary(Of String, Object)
            dict1.Add("texto", "Grupo de Empleados")
            dict1.Add("valor", "G")
            lstAsignacionCredito.Add(dict1)
            Dim dict2 As New Dictionary(Of String, Object)
            dict2.Add("texto", "Empleados")
            dict2.Add("valor", "E")
            lstAsignacionCredito.Add(dict2)

            Return lstAsignacionCredito

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarCuota() As List(Of Object)
        Try
            Dim lstCuotas As New List(Of Object)

            Dim dict1 As New Dictionary(Of String, Object)
            dict1.Add("texto", "Mensual")
            dict1.Add("valor", "M")
            lstCuotas.Add(dict1)
            Dim dict2 As New Dictionary(Of String, Object)
            dict2.Add("texto", "Mensual y Equipo")
            dict2.Add("valor", "E")
            lstCuotas.Add(dict2)
            Dim dict3 As New Dictionary(Of String, Object)
            dict3.Add("texto", "Individual")
            dict3.Add("valor", "I")
            lstCuotas.Add(dict3)

            Return lstCuotas

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

End Class
