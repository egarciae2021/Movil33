Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports System.Data
Imports VisualSoft.Suite80.BL
Imports CompCorreo
Imports VisualSoft.Comun.ImportacionExportacion

Partial Class P_Movil_Administrar_Adm_DistribucionMinutosReporteOperador
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim Parametros As BL_MOV_Parametros = Nothing
        If IsNothing(Session("Usuario")) Then
            'Dim script As String = "window.parent.location.reload()"
            Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
        Else
            If Not IsPostBack Then
                Dim Cuenta As String = Request.QueryString("Cuenta")
                hdfCuenta.Value = Cuenta
                Try
                    txtDiaInicial.Text = Now.ToShortDateString()
                    txtDiaFinal.Text = Now.ToShortDateString()

                    dvEnviarReporte.Style("display") = "display"

                    Parametros = New BL_MOV_Parametros(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim lstParametros As List(Of ENT_MOV_Parametros) = Parametros.ListarPorGrupo("DB1")
                    hdfValorIlimitado.Value = "Si:No" 'lstParametros(0).Valor

                    UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
                Catch ex As Exception
                    Dim util As New Utilitarios
                    util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
                    Throw New Exception(UtilitarioWeb.MensajeError)
                Finally
                    If Parametros IsNot Nothing Then Parametros.Dispose()
                End Try
            End If
        End If
    End Sub

    Protected Sub btnEnvio_Click(sender As Object, e As System.EventArgs) Handles btnEnvio.Click
        Dim ds As New DataSet
        Dim strCadenaConexion As String = BL_Base.GetConexionDatos(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim nombreArchivo As String = "DistribucionReporte" & ".xls"
        Dim RutaArchivo As String = Server.MapPath("Distribucion\" & nombreArchivo)

        Select Case rlstDatosReporte.SelectedValue
            Case "1"
                Dim Linea As BL_MOV_Linea = new BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            ds = Linea.EnvioServicios(hdfCuenta.Value, hdfValorIlimitado.Value, True, "", "")
            Linea.Dispose()
            Case "2"
                Dim Linea As BL_MOV_Linea = new BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            ds = Linea.EnvioServicios(hdfCuenta.Value, hdfValorIlimitado.Value, True, txtDiaInicial.Text, txtDiaFinal.Text)
            Linea.Dispose()
        End Select

        Dim dm As New DistribucionMinutos()
        Dim dtCampos As DataTable = ds.Tables(0)
        Dim dtDatos As DataTable = ds.Tables(1)

        System.IO.File.Delete(RutaArchivo)
        dm.ExportaDistribucionServicios(dtCampos, dtDatos, RutaArchivo, hdfValorIlimitado.Value, 1, 5)

        Select Case rlstTipoDeEnvio.SelectedValue
            Case "1"
                ExportarReporteEnvio("Distribucion", nombreArchivo)
                Dim script As String = "ExportarArchivo(); CerrarCarga();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Case "2"
                EnviarCorreo(txtCorreo.Text, txtAsunto.Text, txtCuerpo.Text, strCadenaConexion, RutaArchivo)
                Dim script As String = "CerrarCarga();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Case "3"
                ExportarReporteEnvio("Distribucion", nombreArchivo)
                EnviarCorreo(txtCorreo.Text, txtAsunto.Text, txtCuerpo.Text, strCadenaConexion, RutaArchivo)
                Dim script As String = "ExportarArchivo(); CerrarCarga();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
        End Select
        'OcultarPanel()
    End Sub

    Private Sub ExportarReporteEnvio(ByVal carpeta As String, ByVal nombreArchivo As String)
        hdfArchivo.Value = carpeta & "\" & nombreArchivo
    End Sub

    Private Sub EnviarCorreo(ByVal vcDestinatarios As String, ByVal vcAsunto As String, ByVal vcCuerpo As String, _
                             ByVal vcCadenaConexion As String, ByVal vcRutaArchivo As String)
        Dim m_objCorreo As New CCorreo
        Dim lstAdjunto As New ArrayList

        lstAdjunto.Add(vcRutaArchivo)

        Dim strMensaje As String = ""
        Try
            strMensaje = m_objCorreo.Enviar(False, vcDestinatarios, vcAsunto, vcCuerpo, lstAdjunto, True, vcCadenaConexion)
            If strMensaje = "" Then
                strMensaje = "Correo enviado con exito"
            End If
        Catch ex As Exception
            strMensaje = "Error: " & ex.Message
        End Try
    End Sub

    'Private Sub OcultarPanel()
    '    Dim script As String = "CerrarCarga();"
    '    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
    'End Sub
End Class
