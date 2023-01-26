Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Data
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE

Public Class Sin_programacion
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            If Not Page.IsPostBack Then
                Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                Dim frecuencia As DataTable = Sincronizacion.ListarFrecuenciaAhora()
                ddlperiodo.DataTextField = "PERIODO"
                ddlperiodo.DataValueField = "PERIODO"
                ddlperiodo.DataSource = frecuencia
                ddlperiodo.DataBind()

                filldatos()
            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        Catch exc As Exception
            Dim util As New Utilitarios
            util.GrabarLog(exc, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            Sincronizacion.Dispose()
        End Try
    End Sub

    Protected Sub filldatos()
        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim TipoModulo As String = HttpContext.Current.Session("ModuloOpcion").ToString()
            Dim dt As DataTable = Sincronizacion.getProgramacion(TipoModulo)
            If dt IsNot Nothing Then
                If dt.Rows.Count > 0 Then
                    Dim tipo = dt.Rows(0)("PROG_vcTIPO").ToString()
                    If tipo <> "" Then
                        If ddlperiodo.Items.FindByValue(tipo) IsNot Nothing Then
                            ddlperiodo.Items.FindByValue(tipo).Selected = True
                            cargardetalle()
                        End If
                    End If

                    Dim dia = dt.Rows(0)("PROG_vcDIA").ToString()
                    Session("SIN_DIAACTUAL") = dia
                    If dia <> "" Then
                        hdia.Value = dia
                        If ddldia.Items.FindByText(dia) IsNot Nothing Then
                            ddldia.Items.FindByText(dia).Selected = True
                        End If
                    End If


                    Dim hora = dt.Rows(0)("PROG_vcHORA").ToString()
                    If hora <> "" Then
                        txthora.Text = hora


                    End If
                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            Sincronizacion.Dispose()
        End Try
    End Sub

    <WebMethod()> _
    Public Shared Function GuardarProgramacion(tipo As String, dia As String, hora As String, ahora As Boolean) As String
        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim TipoModulo As String = HttpContext.Current.Session("ModuloOpcion").ToString()
            Sincronizacion.LimpiaProgramacion(TipoModulo)
            Dim resultado As String = Sincronizacion.ActualizaProgramacion(tipo, dia, hora, ahora, TipoModulo)
            Return "0"
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            Sincronizacion.Dispose()
        End Try
    End Function

    Private Sub cargardetalle()
        Try
            If ddlperiodo.SelectedItem.ToString() = "MENSUAL" Then
                For i As Integer = 1 To 28
                    ddldia.Items.Add(Convert.ToString(i))
                Next
            ElseIf ddlperiodo.SelectedItem.ToString() = "SEMANAL" Then
                ddldia.Items.Add("LUNES")
                ddldia.Items.Add("MARTES")
                ddldia.Items.Add("MIERCOLES")
                ddldia.Items.Add("JUEVES")
                ddldia.Items.Add("VIERNES")
                ddldia.Items.Add("SABADO")
                ddldia.Items.Add("DOMINGO")
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

End Class