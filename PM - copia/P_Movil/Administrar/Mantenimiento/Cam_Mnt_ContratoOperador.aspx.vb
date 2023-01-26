Imports System.Web.Services
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BL
Imports System.Web.Script.Serialization
Imports System.IO
Imports VisualSoft.PCSistelMovil.Campana.BE

Partial Class P_Movil_Administrar_Mantenimiento_Cam_Mnt_ContratoOperador
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim Operador As BL_GEN_Operador = New BL_GEN_Operador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(-1, "<Seleccionar>"), "vcNomOpe", "P_inCodOpe")
                    'UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(), "vcNomOpe", "P_inCodOpe")
                    Operador.Dispose()
                    hdfCodigoContrato.Value = Request.QueryString("Cod")
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If

            If ddlOperador.Items.Count = 2 Then
                ddlOperador.Enabled = False
                ddlOperador.SelectedIndex = 1
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Mostrar(ByVal p_IdContrato As String) As MOV_CAM_Contrato
        Dim Contrato As BL_MOV_CAM_Contrato = Nothing
        Try
            Contrato = New BL_MOV_CAM_Contrato(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oContrato As MOV_CAM_Contrato = Contrato.Mostrar(Integer.Parse(p_IdContrato))
            If (oContrato.RutaContrato <> "" And Not File.Exists(HttpContext.Current.Server.MapPath("~/" & oContrato.RutaContrato))) Then
                oContrato.RutaContrato = "NoEncontrado"
                'oContrato.RutaContrato = HttpContext.Current.Server.MapPath(oContrato.RutaContrato)
            End If
            Return oContrato
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)

        Finally
            If Contrato IsNot Nothing Then
                Contrato.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Guardar(ByVal p_oContrato As String) As Integer
        Dim Contrato As BL_MOV_CAM_Contrato = Nothing

        Try
            Contrato = New BL_MOV_CAM_Contrato(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oSerializer As New JavaScriptSerializer
            Dim oContrato As MOV_CAM_Contrato = oSerializer.Deserialize(Of MOV_CAM_Contrato)(p_oContrato)
            'If File.Exists(oContrato.ArchivoOriginal.ToString()) Then
            GuardarArchivoRuta(oContrato)
            'Else
            '    oContrato.ArchivoOriginal = ""
            'End If
            Return Contrato.Guardar(oContrato)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Contrato IsNot Nothing Then
                Contrato.Dispose()
            End If
        End Try
    End Function

    Private Shared Sub GuardarArchivoRuta(ByRef oContrato As MOV_CAM_Contrato)
        Try
            Dim CarpetaDominio As String = String.Empty
            'CarpetaDominio = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/Images/Campanas/ContratosOperador/"), "/") 'comentado 10-09-2015 wapumayta (descomentar para activar el modo cloud)

            If oContrato.RutaContratoTemporal Is Nothing OrElse oContrato.RutaContratoTemporal = "" Then
                Exit Sub
            End If

            Dim sourcePath As String = HttpContext.Current.Server.MapPath("~/" & Path.GetDirectoryName(oContrato.RutaContratoTemporal))
            Dim targetPath As String = HttpContext.Current.Server.MapPath("~/Images/Campanas/ContratosOperador" + CarpetaDominio + "/")
            Dim sourceFile As String = System.IO.Path.Combine(sourcePath, Path.GetFileName(oContrato.RutaContratoTemporal))
            Dim destFile As String = System.IO.Path.Combine(targetPath, Path.GetFileName(oContrato.RutaContratoTemporal))

            If (Not System.IO.Directory.Exists(targetPath)) Then
                System.IO.Directory.CreateDirectory(targetPath)
            End If


            If (Not System.IO.File.Exists(destFile)) Then
                If sourceFile <> destFile Then
                    System.IO.File.Copy(sourceFile, destFile, True)
                End If
                'System.IO.File.Copy(sourceFile, destFile, True)
                oContrato.RutaContrato = "/Images/Campanas/ContratosOperador" + CarpetaDominio + "/" & Path.GetFileName(oContrato.RutaContratoTemporal)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub
End Class
