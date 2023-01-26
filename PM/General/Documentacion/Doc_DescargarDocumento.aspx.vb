Imports VisualSoft.Comun.Utilitarios
Imports System.Net
Imports System.IO
Imports System.Web.UI
Imports VisualSoft.Comun.Auditoria
Imports VisualSoft.Suite80.BE
Imports System.Drawing.Image
Imports VisualSoft.Suite80.BL

Public Class Doc_DescargarDocumento
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Docuemntacion As BL_MOV_DocumentacionSistema = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                    Docuemntacion = New BL_MOV_DocumentacionSistema(oUsuario.IdDominio)

                    Dim documentos As String
                    Dim perfiles As String = ""
                    For Each perfil In oUsuario.Perfiles
                        perfiles += perfil.P_inCod.ToString() + ","
                    Next
                    documentos = Docuemntacion.ObtenerDocumentacionSistemaPorPerfil(perfiles, oUsuario.IdDominio)

                    If (documentos = "0") Then
                        Dim inMod As String = Request.QueryString("inMod")
                        If inMod IsNot Nothing Then
                            If (inMod = "1") Then 'MUESTRA MANUALES
                                If oUsuario.Empleado.Licencia.ToUpper() = "PREMIUM" Then
                                    trBas.Style("display") = "none"
                                    trBas0.Style("display") = "none"
                                    trBas1.Style("display") = "none"
                                    trBas2.Style("display") = "none"
                                    trBas3.Style("display") = "none"
                                Else
                                    trPrem.Style("display") = "none"
                                    trPrem0.Style("display") = "none"
                                    trPrem1.Style("display") = "none"
                                    trPrem2.Style("display") = "none"
                                    trPrem3.Style("display") = "none"
                                    trPrem4.Style("display") = "none"
                                    trPrem5.Style("display") = "none"
                                    trPrem6.Style("display") = "none"
                                    trPrem7.Style("display") = "none"
                                    trPrem8.Style("display") = "none"
                                    trPrem9.Style("display") = "none"
                                End If
                            End If
                        End If
                    Else
                        'idGuias.Style("display") = "none"
                        hdfDatosDocumentos.Value = documentos
                        'Dim archivos As String()
                        'Dim idDoc As String
                        'Dim nomDoc As String
                        'Dim rutaDoc As String
                        'archivos = documentos.Split(";")

                        'For i As Integer = 0 To archivos.Length
                        '    Dim datos As String() = archivos(i).Split("|")
                        '    idDoc = datos(0)
                        '    nomDoc = datos(1)
                        '    rutaDoc = datos(2)

                        'Next

                    End If

                    UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            Docuemntacion.Dispose()
        End Try
    End Sub

End Class
