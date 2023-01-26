Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports System.Web.Script.Serialization

Public Class Auditoria

    Public Shared Sub InsertarAuditoria(strMensaje As String, Optional objGeneral As Object = Nothing)

        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        If oUsuario Is Nothing Then
            Exit Sub
        End If
        Dim EsUsuarioGeneral As Boolean = True
        If oUsuario.Empleado IsNot Nothing AndAlso oUsuario.Empleado.P_vcCod <> "" Then
            EsUsuarioGeneral = False
        End If
        Dim strExtension As String = "log"
        Dim util As New Utilitarios()
        Dim registro As New List(Of String)
        registro.Add(DateTime.Now.ToString())
        If EsUsuarioGeneral Then
            registro.Add(oUsuario.P_inCod)
        Else
            'registro.Add(oUsuario.Empleado.P_vcCod)
        End If
        registro.Add(strMensaje)

        If objGeneral IsNot Nothing Then
            Try
                Dim serial As New JavaScriptSerializer
                Dim json As String = serial.Serialize(objGeneral)
                json = json.Replace(",", "|")
                json = json.Replace(";", "|")
                registro.Add(json)
            Catch 
            End Try
        End If

        'Valida si existe directorio... sino lo crea...
        CompruebaDirectorioAuditoria()


        If EsUsuarioGeneral Then
            Utilitarios.GrabarLogAuditoria(HttpContext.Current.Server.MapPath("~/LogAuditoria/General." & strExtension), registro)
        Else
            Utilitarios.GrabarLogAuditoria(HttpContext.Current.Server.MapPath("~/LogAuditoria/" + oUsuario.Empleado.P_vcCod + "." & strExtension), registro)
        End If

    End Sub

    Private Shared Sub CompruebaDirectorioAuditoria()
        Try
            Dim strDirectorioAuditoria As String = HttpContext.Current.Server.MapPath("~/LogAuditoria/")
            If Not IO.Directory.Exists(strDirectorioAuditoria) Then
                IO.Directory.CreateDirectory(strDirectorioAuditoria)
            End If
        Catch
        End Try
    End Sub


End Class
