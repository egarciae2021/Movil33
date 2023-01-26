Imports System.Web.Services
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BL
Imports System.Web.Script.Serialization
Imports System.IO
Imports VisualSoft.PCSistelMovil.Campana.BE
Imports VisualSoft.PCSistelMovil.Campana

Partial Class P_Movil_Configurar_Cam_Conf_CampanaBanner
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim Formato As BL_MOV_CAM_PublicidadFormato = Nothing
        Dim Publicidad As BL_MOV_CAM_Publicidad = Nothing
        Dim Operador As BL_GEN_Operador = Nothing
        Dim Campana As BL_MOV_CAM_Campana = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Operador = New BL_GEN_Operador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Publicidad = New BL_MOV_CAM_Publicidad(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Formato = New BL_MOV_CAM_PublicidadFormato(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim oPublicidad As New MOV_CAM_Publicidad

                    Dim lstFormato As List(Of BE.MOV_CAM_PublicidadFormato) = Formato.Listar(-1, "<Seleccionar>")

                    UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(-1, "<Seleccionar>"), "vcNomOpe", "P_inCodOpe")
                    UtilitarioWeb.Dataddl(ddlFormato, lstFormato, "Descripcion", "IdFormato")
                    Dim IdCampana As Integer
                    Integer.TryParse(Request.QueryString("IdCampana"), IdCampana)

                    If IdCampana = 0 Then IdCampana = -1

                    hdfIdCampana.Value = IdCampana.ToString()

                    'If IdCampana <> -1 Then
                    '    ddlOperador.SelectedValue = Campana.OperadorPorCampana(IdCampana).ToString()
                    '    oPublicidad = Publicidad.MostrarPorCampana(IdCampana)
                    'Else
                    '    oPublicidad = Publicidad.Mostrar(0)
                    'End If

                    'If oPublicidad.IdPublicidad <> 0 Then
                    '    hdfIdPublicidad.Value = oPublicidad.IdPublicidad
                    'End If
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Formato IsNot Nothing Then Formato.Dispose()
            If Publicidad IsNot Nothing Then Publicidad.Dispose()
            If Operador IsNot Nothing Then Publicidad.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function MostrarFormato(ByVal p_IdFormato As String) As MOV_CAM_Publicidad
        Dim Publicidad As BL_MOV_CAM_Publicidad = Nothing

        Try
            Publicidad = New BL_MOV_CAM_Publicidad(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Return Publicidad.MostrarFormato(Integer.Parse(p_IdFormato), -1)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Publicidad IsNot Nothing Then Publicidad.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Mostrar(ByVal p_IdOperador As String) As MOV_CAM_Publicidad
        Dim Publicidad As BL_MOV_CAM_Publicidad = Nothing

        Try
            Publicidad = New BL_MOV_CAM_Publicidad(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Return Publicidad.Mostrar(Integer.Parse(p_IdOperador))
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Publicidad IsNot Nothing Then Publicidad.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Guardar(ByVal p_oPublicidad As String) As Integer
        Dim Publicidad As BL_MOV_CAM_Publicidad = Nothing
        Dim CarpetaDominio As String = String.Empty
        'descomentado 17-12-2015 wapumayta
        CarpetaDominio = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "/Images//Campanas//Banner//Servicio//", "//") 'comentado 10-09-2015 wapumayta (descomentar para activar el modo cloud)

        Try
            Publicidad = New BL_MOV_CAM_Publicidad(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oSerializer As New JavaScriptSerializer
            Dim oPublicidad As MOV_CAM_Publicidad = oSerializer.Deserialize(Of MOV_CAM_Publicidad)(p_oPublicidad)

            Dim vcPathServ = HttpContext.Current.Server.MapPath("~") + "/Images//Campanas//Banner//Servicio" + CarpetaDominio
            If Not File.Exists(vcPathServ) Then Directory.CreateDirectory(vcPathServ)

            Dim lstFiles As String() = Directory.GetFiles(vcPathServ)
            If lstFiles.Length > 0 Then
                For Each vcFilePathDestino As String In lstFiles
                    File.Delete(vcFilePathDestino)
                Next
            End If
            CarpetaDominio = CarpetaDominio.Replace("//", "\")
            For Each oBanner As MOV_CAM_PublicidadDetalle In oPublicidad.MOV_CAM_PublicidadDetalle
                If File.Exists(HttpContext.Current.Server.MapPath((oBanner.RutaArchivo))) Then
                    Dim vcRutaDestino As String = HttpContext.Current.Server.MapPath(oBanner.RutaArchivo.Replace("\Banner" + CarpetaDominio + "\", "\Banner\Servicio" + CarpetaDominio + "\" + oBanner.Orden.ToString() + "."))
                    File.Copy(HttpContext.Current.Server.MapPath(oBanner.RutaArchivo), vcRutaDestino, True)
                End If
            Next

            Return Publicidad.Guardar(oPublicidad)
        Catch ex As Exception
            'JBALMACEDA 20160624 143200
            'Dim util As New Utilitarios
            'util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            'If Publicidad IsNot Nothing Then Publicidad.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function MostrarPorCampana(ByVal IdCampana As Integer) As MOV_CAM_Publicidad
        Dim Publicidad As BL_MOV_CAM_Publicidad = Nothing

        Try
            Publicidad = New BL_MOV_CAM_Publicidad(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Return Publicidad.MostrarPorCampana(IdCampana)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Publicidad IsNot Nothing Then Publicidad.Dispose()
        End Try
    End Function
End Class
