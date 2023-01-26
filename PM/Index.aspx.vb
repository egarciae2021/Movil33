Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Auditoria

Partial Class _Index
    Inherits System.Web.UI.Page


    <WebMethod()>
    Public Shared Function ActualizarFavorito(ByVal tipo As String, ByVal id As String, ByVal accion As String) As String
        Dim _return As String = ""
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oProducto As BL_PRO_Producto = Nothing
            oProducto = New BL_PRO_Producto(oUsuario.IdCliente)
            _return = oProducto.ActualizarFavoritos(oUsuario.P_inCod, tipo, id, accion)
            oProducto.Dispose()
        Catch ex As Exception
            _return = ex.Message
        End Try
        Return _return
    End Function

    '<WebMethod()>
    'Public Shared Function VerificaSesion() As String
    '    Dim _return As String = ""
    '    Try
    '        If HttpContext.Current.Session("Usuario") Is Nothing Then 'Perdio la variable session usuario
    '            _return = "Perdio sesion"
    '        End If
    '    Catch ex As Exception
    '        _return = ex.Message
    '        Try
    '            Dim util As New Utilitarios
    '            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Catch ex1 As Exception
    '            _return = "error en util"
    '        End Try
    '        'Throw New Exception(UtilitarioWeb.MensajeError)
    '    End Try
    '    Return _return
    'End Function

    '<WebMethod()>
    'Public Shared Function VerificaCargaInicial() As String
    '    Dim _return As String = ""
    '    Try
    '        If Not esAdmin() Then
    '            If CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).Empleado.P_vcCod.Trim = "" Then
    '                _return = "mostrar"
    '            End If
    '        End If
    '    Catch ex As Exception
    '        _return = ""
    '    End Try
    '    Return _return
    'End Function

    'Private Shared Function esAdmin() As Boolean
    '    Dim resul As Boolean = False
    '    For Each oGrupo As ENT_SEG_Grupo In CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).Grupos
    '        If oGrupo.P_inCod = 1 Then 'Es administrador
    '            resul = True
    '        End If
    '    Next
    '    Return resul
    'End Function

    ''<WebMethod()>
    ''Public Shared Function ListarIdioma() As List(Of ENT_PRO_Pagina)
    ''    Try
    ''        Dim Pagina As BL_PRO_Pagina = BL_PRO_Pagina.Instance

    ''        Return Pagina.ListarIdiomaTodasPagina(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod)
    ''    Catch ex As Exception
    ''        Dim util As New Utilitarios
    ''        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    ''        Throw New Exception(UtilitarioWeb.MensajeError)
    ''    End Try
    ''End Function


    '<WebMethod()>
    'Public Shared Function ActualizarChat(Estado As String) As String
    '    Dim _return As String = ""
    '    Try
    '        BL_SEG_Usuario.Instance.ActualizarChat(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod, _
    '                                               IIf(Estado = "1", True, False))

    '    Catch ex As Exception
    '        _return = ""
    '    End Try
    '    Return _return
    'End Function

    '<WebMethod()>
    'Public Shared Function ObtenerEstadoChat() As String
    '    Dim _return As String = ""
    '    Try
    '        Dim blValor As Boolean = BL_SEG_Usuario.Instance.ObtenerEstadoChat(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod)
    '        If blValor Then
    '            _return = "1"
    '        Else
    '            _return = "0"
    '        End If

    '    Catch ex As Exception
    '        _return = ""
    '    End Try
    '    Return _return
    'End Function

End Class
