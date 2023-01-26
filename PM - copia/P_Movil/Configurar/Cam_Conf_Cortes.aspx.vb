Imports System.Web.Services
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BL
Imports System.Web.Script.Serialization
Imports System.IO
Imports VisualSoft.PCSistelMovil.Campana.BE

Partial Class P_Movil_Configurar_Cam_Conf_Cortes
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim Operador As BL_GEN_Operador = Nothing
        Dim CorteConfiguracion As BL_MOV_CAM_CorteConfiguracion = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Operador = New BL_GEN_Operador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    CorteConfiguracion = New BL_MOV_CAM_CorteConfiguracion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                    UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(-1, "<Seleccionar>"), "vcNomOpe", "P_inCodOpe")
                    Dim oCorteConfiguracion As MOV_CAM_CorteConfiguracion = CorteConfiguracion.Mostrar(ddlOperador.SelectedValue)

                    If oCorteConfiguracion.IdCorteConfiguracion <> 0 Then
                        hdfIdCorteConfiguracion.Value = oCorteConfiguracion.IdCorteConfiguracion
                    End If
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Operador IsNot Nothing Then
                Operador.Dispose()
            End If
            If CorteConfiguracion IsNot Nothing Then
                CorteConfiguracion.Dispose()
            End If
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Mostrar(ByVal p_IdCorteConfiguracion As String) As MOV_CAM_CorteConfiguracion
        Dim CorteConfiguracion As BL_MOV_CAM_CorteConfiguracion = Nothing
        Try
            CorteConfiguracion = New BL_MOV_CAM_CorteConfiguracion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Return CorteConfiguracion.Mostrar(Integer.Parse(p_IdCorteConfiguracion))
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CorteConfiguracion IsNot Nothing Then
                CorteConfiguracion.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Guardar(ByVal p_oCorteConfiguracion As String) As Integer
        Dim CorteConfiguracion As BL_MOV_CAM_CorteConfiguracion = Nothing

        Try
            CorteConfiguracion = New BL_MOV_CAM_CorteConfiguracion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            If p_oCorteConfiguracion.Contains("""Frecuencia"":""""") Then
                p_oCorteConfiguracion = p_oCorteConfiguracion.Replace("""Frecuencia"":""""", """Frecuencia"":""0""")
            ElseIf p_oCorteConfiguracion.Contains("""NumeroCortes"":""""") Then
                p_oCorteConfiguracion = p_oCorteConfiguracion.Replace("""NumeroCortes"":""""", """NumeroCortes"":""0""")
            End If

            Dim oSerializer As New JavaScriptSerializer
            Dim oCorteConfiguracion As MOV_CAM_CorteConfiguracion = oSerializer.Deserialize(Of MOV_CAM_CorteConfiguracion)(p_oCorteConfiguracion)
            Return CorteConfiguracion.Guardar(oCorteConfiguracion)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CorteConfiguracion IsNot Nothing Then
                CorteConfiguracion.Dispose()
            End If
        End Try
    End Function
End Class
