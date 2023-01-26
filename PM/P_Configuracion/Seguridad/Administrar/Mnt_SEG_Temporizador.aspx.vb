Imports System.Web.Services
Imports VisualSoft.PCSistelMovil.Seguridad.BL
Imports VisualSoft.PCSistelMovil.Seguridad.BE
Imports System.Data
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization

Public Class Mnt_SEG_Temporizador
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Temporizador As BL_SEG_Temporizador = Nothing
        Dim MiTemporizador As New List(Of ENT_SEG_Temporizador)
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

            If Not IsPostBack Then

                Dim codigo As String = Request.QueryString("Cod")
                Dim campo As String = Request.QueryString("Par")

                If Not codigo Is Nothing Then
                    hdfIdTemporizador.Value = codigo
                    Temporizador = New BL_SEG_Temporizador(oUsuario.IdCliente)
                    Dim miTemp As New ENT_SEG_Temporizador

                    miTemp.IdTemporizador = CInt(codigo)
                    MiTemporizador = Temporizador.Listar(miTemp, -1)

                    If MiTemporizador.Count > 0 Then
                        Me.txtNombre.Text = MiTemporizador(0).Descripcion.Trim()
                        Me.txtTiempo.Text = MiTemporizador(0).Tiempo.ToString()
                        Me.chkReiniciar.Checked = MiTemporizador(0).ReiniciarConAccion
                        Me.chkActivar.Checked = MiTemporizador(0).BtVig
                    End If

                Else
                    hdfIdTemporizador.Value = "-1"
                End If

                'Nivel = New BL_SOA_Nivel(oUsuario.IdCliente)


            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Temporizador IsNot Nothing Then
                Temporizador.Dispose()
            End If
        End Try
    End Sub


    <WebMethod()>
    Public Shared Function grabar(ByVal prIdTemporizador As Integer, ByVal prDescripcion As String, ByVal prTiempo As Integer, ByVal prReiniciar As Integer, ByVal prActivo As Integer) As String
        Dim Temporizador As BL_SEG_Temporizador = Nothing
        Dim MiTemporizador As New ENT_SEG_Temporizador()
        Try
            Temporizador = New BL_SEG_Temporizador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            MiTemporizador.IdTemporizador = prIdTemporizador
            MiTemporizador.Descripcion = prDescripcion
            MiTemporizador.Tiempo = prTiempo
            MiTemporizador.ReiniciarConAccion = prReiniciar = 1
            MiTemporizador.BtVig = prActivo = 1

            Return Temporizador.grabar(MiTemporizador)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Temporizador IsNot Nothing Then Temporizador.Dispose()
        End Try
    End Function

End Class