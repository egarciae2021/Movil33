Imports System.Web.Services
Imports System.Web.Script.Services
Imports VisualSoft.Suite80.BE

Public Class Test
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

    End Sub


    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    Public Shared Function ObtenerDatos() As List(Of ENT_SEG_Usuario)
        Dim Datos As String = ""

        Dim oUsuario As ENT_SEG_Usuario
        Dim lista As New List(Of ENT_SEG_Usuario)

        oUsuario = New ENT_SEG_Usuario
        oUsuario.P_inCod = 1
        oUsuario.vcNom = "Marco"
        lista.Add(oUsuario)

        oUsuario = New ENT_SEG_Usuario
        oUsuario.P_inCod = 2
        oUsuario.vcNom = "Marco 2"
        lista.Add(oUsuario)

        oUsuario = New ENT_SEG_Usuario
        oUsuario.P_inCod = 3
        oUsuario.vcNom = "Marco 3"
        lista.Add(oUsuario)

        Return lista

    End Function

End Class