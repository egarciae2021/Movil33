Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.ComponentModel

' Para permitir que se llame a este servicio Web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente.
<System.Web.Script.Services.ScriptService()> _
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")> _
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)> _
<ToolboxItem(False)> _
Public Class GeneralPortal
    Inherits System.Web.Services.WebService

    Public AUTENTICACION As Credenciales 'MPAJUELO_20160624

    'MPAJUELO_20160624
    '<WebMethod(), SoapHeader("AUTENTICACION")> _
    'Public Function FechaHora() As String
    '    If AUTENTICACION Is Nothing Then
    '        Throw New Exception("No se ha autenticado")
    '    Else
    '        If Not AUTENTICACION.Usuario = "v1su@ls0ft" And Not AUTENTICACION.Password = "v1su@ls0ft" Then
    '            Throw New Exception("Credenciales incorrectas")
    '        End If
    '    End If
    '    Return Now.ToString()
    'End Function

    'MPAJUELO_20160624
    <WebMethod()> _
    Public Function FechaHora() As String
        Return Now.ToString()
    End Function


    ''MPAJUELO_20160624
    Public Class Credenciales
        Inherits SoapHeader

        Public Usuario As String
        Public Password As String

    End Class

End Class