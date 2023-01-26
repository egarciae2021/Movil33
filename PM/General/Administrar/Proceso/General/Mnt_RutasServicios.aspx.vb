Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services

Public Class Mnt_RutasServicios
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim ServicioGeneral As BL_GEN_Servicio_General = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                    ServicioGeneral = New BL_GEN_Servicio_General(oUsuario.IdCliente)

                    'cargar rutas para ImportadorLineas
                    Dim dtRutas_ImportadorLinea As DataTable = ServicioGeneral.ObtenerRutasServicio("ImportadorLinea")
                    For Each dr As DataRow In dtRutas_ImportadorLinea.Rows
                        If dr("Llave").ToString() = "RutaOrigen" Then txt_RutaOrigen_ImportadorLinea.Text = dr("Ruta").ToString()
                        If dr("Llave").ToString() = "RutaBackup" Then txt_RutaBackup_ImportadorLinea.Text = dr("Ruta").ToString()
                        If dr("Llave").ToString() = "RutaProcesado" Then txt_RutaProcesado_ImportadorLinea.Text = dr("Ruta").ToString()
                        If dr("Llave").ToString() = "RutaErr" Then txt_RutaErr_ImportadorLinea.Text = dr("Ruta").ToString()
                        If dr("Llave").ToString() = "RutaLog" Then txt_RutaLog_ImportadorLinea.Text = dr("Ruta").ToString()
                    Next

                    'cargar rutas para ImportadorDatosLinea
                    Dim dtRutas_ImportadorDatosLinea As DataTable = ServicioGeneral.ObtenerRutasServicio("ImportadorDatosLinea")
                    For Each dr As DataRow In dtRutas_ImportadorDatosLinea.Rows
                        If dr("Llave").ToString() = "RutaOrigen" Then txt_RutaOrigen_ImportadorDatosLinea.Text = dr("Ruta").ToString()
                        If dr("Llave").ToString() = "RutaBackup" Then txt_RutaBackup_ImportadorDatosLinea.Text = dr("Ruta").ToString()
                        If dr("Llave").ToString() = "ProcesoArchivos" Then txt_ProcesoArchivos_ImportadorDatosLinea.Text = dr("Ruta").ToString()
                        If dr("Llave").ToString() = "RutaError" Then txt_RutaError_ImportadorDatosLinea.Text = dr("Ruta").ToString()
                        If dr("Llave").ToString() = "RutaLog" Then txt_RutaLog_ImportadorDatosLinea.Text = dr("Ruta").ToString()
                    Next
                    UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
                End If
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(ServicioGeneral) Then ServicioGeneral.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(ByVal XML_Rutas As String) As Integer
        Dim ServicioGeneral As BL_GEN_Servicio_General = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            ServicioGeneral = New BL_GEN_Servicio_General(oUsuario.IdCliente)
            Dim Result As Integer
            Result = ServicioGeneral.ACtualizarRutasServicio(XML_Rutas)

            Return Result
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(ServicioGeneral) Then ServicioGeneral.Dispose()
        End Try
    End Function
End Class