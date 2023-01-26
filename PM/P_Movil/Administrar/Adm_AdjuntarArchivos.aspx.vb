Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Data
Imports System.Net.Mail
Imports VisualSoft.Comun.Utilitarios
Imports System.IO
Imports Utilitario
Imports System.Web.Script.Services

Partial Class P_Movil_Administrar_Adm_AdjungarArchivos
    Inherits System.Web.UI.Page
    Dim listaArchivos As New List(Of ENT_MOV_ArchivoAdjunto)
    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    '"?pagOri=NuevaSolicitud"
                    hdfOrigen.Value = Request.QueryString("pagOri")
                    hdfEstSolicitud.Value = Request.QueryString("estSol")

                    'NUEVAS VALIDACIONES PARA ADJUNTAR ARCHIVOS (WAPUMAYTA 12-09-2014)
                    hdfCanMax.Value = Request.QueryString("CanMax")
                    hdfExtPer.Value = Request.QueryString("ExtPer")
                    hdfTamTip.Value = Request.QueryString("TamTip")
                    hdfTamMax.Value = Request.QueryString("TamMax")
                    hdfTamMed.Value = Request.QueryString("TamMed")
                    'FIN NUEVAS VALIDACIONES

                    'variable session con archivos adjuntados
                    Session("ArchisoAdjuntosNuevo") = New List(Of ENT_MOV_ArchivoAdjunto)()

                    If (hdfOrigen.Value = "NuevaSolicitud") Then
                        btnCancelar.Style("display") = "none"
                        lblListo.Text = "Listo"
                        If (hdfEstSolicitud.Value = "1") Then 'edicion de la solicitud (muestra adjuntos de base detos)
                            hdfCodsol.Value = Request.QueryString("codSol")
                            hdfEditable.Value = Request.QueryString("editable")
                            hdfObligatorio.Value = Request.QueryString("obligatorio")

                            Dim lstSessionArcAdj As List(Of ENT_MOV_ArchivoAdjunto) = CType(Session("ArchisoAdjuntosNuevo"), List(Of ENT_MOV_ArchivoAdjunto))
                            If (lstSessionArcAdj.Count = 0) Then
                                Dim ArchivoAdjunto As BL_MOV_ArchivoAdjunto = New BL_MOV_ArchivoAdjunto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                                Dim lstArchAdj As List(Of ENT_MOV_ArchivoAdjunto) = ArchivoAdjunto.Listar_ArchivosAdjuntos_x_ID(hdfCodsol.Value)
                                ArchivoAdjunto.Dispose()
                                Session("ArchisoAdjuntosNuevo") = lstArchAdj
                            End If

                            'datos de archivos adjutnos
                            Dim scriptArchAdj As String = String.Empty
                            scriptArchAdj = "var arArchivosAdjuntos = [];"
                            'For Each oArchAdj As ENT_MOV_ArchivoAdjunto In lstArchAdj
                            For Each oArchAdj As ENT_MOV_ArchivoAdjunto In CType(Session("ArchisoAdjuntosNuevo"), List(Of ENT_MOV_ArchivoAdjunto))
                                If hdfAdjuntosActuales.Value = "" Then
                                    hdfAdjuntosActuales.Value = oArchAdj.vcNomAdj.ToString() & "--" & oArchAdj.P_inIdAdj.ToString() 'id de adjuntos necesario para descargarlo desde la pag Adm_ProcesarSolicitud
                                    'hdfAdjuntosActuales.Value = oArchAdj.vcNomAdj.ToString() '& "--" & oArchAdj.P_inIdAdj.ToString()
                                Else
                                    hdfAdjuntosActuales.Value += "||" & oArchAdj.vcNomAdj.ToString() & "--" & oArchAdj.P_inIdAdj.ToString() 'id de adjuntos necesario para descargarlo desde la pag Adm_ProcesarSolicitud
                                    'hdfAdjuntosActuales.Value += "||" & oArchAdj.vcNomAdj.ToString() '& "--" & oArchAdj.P_inIdAdj.ToString()
                                End If
                                scriptArchAdj += "arArchivosAdjuntos['" & oArchAdj.P_inIdAdj.ToString() & "'] = [];"
                                scriptArchAdj += "arArchivosAdjuntos['" & oArchAdj.P_inIdAdj.ToString() & "'].P_inIdAdj = '" & oArchAdj.P_inIdAdj.ToString() & "';"
                                scriptArchAdj += "arArchivosAdjuntos['" & oArchAdj.P_inIdAdj.ToString() & "'].vcNomAdj = '" & oArchAdj.vcNomAdj.ToString() & "';"
                                scriptArchAdj += "arArchivosAdjuntos['" & oArchAdj.P_inIdAdj.ToString() & "'].vcExtAdj = '" & oArchAdj.vcExtAdj.ToString() & "';"
                                'scriptArchAdj += "var arArchivosAdjuntos[cod" & oArchAdj.P_inIdAdj.ToString() & "].binData = '" & oArchAdj.binData.ToString() & "';"
                            Next

                            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKeyDatos", scriptArchAdj, True)

                            'validara si permite quitar o agregar adjuntos
                            If (hdfEditable.Value = "1") Then
                                btnQuitar.Style("display") = ""
                                btnCancelar.Style("display") = ""
                                btnListo.Style("display") = ""
                            Else 'solo visor
                                btnQuitar.Style("display") = "none"
                                btnListo.Style("display") = "none"
                                btnCancelar.Style("display") = ""
                            End If

                        Else 'creacion de solicitud 
                            btnListo.Style("display") = "none"
                        End If
                    Else
                        hdfTipoSolicitud.Value = Request.QueryString("inTipSol")
                        hdfAdjuntosActuales.Value = Request.QueryString("lstUbi")
                        lblListo.Text = "Listo"
                    End If

                    UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function ListarAdjuntoPorCodSolicitud(ByVal inCodSol As String) As List(Of ENT_MOV_ArchivoAdjunto)
        Try
         Dim ArchivoAdjunto As BL_MOV_ArchivoAdjunto = New BL_MOV_ArchivoAdjunto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim lstArchAdj As List(Of ENT_MOV_ArchivoAdjunto) = ArchivoAdjunto.Listar_ArchivosAdjuntos_x_ID(inCodSol)
         ArchivoAdjunto.Dispose()

            Return lstArchAdj
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    'agregado 24-09-2013 wapumayta
    <WebMethod()>
    Public Shared Sub EliminarTemporales(ByVal arUbic As String, ByVal idAdj As String)
        Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/P_Movil/Administrar/Temporal/"), "/")
        Try
            If arUbic <> "" Then
                Dim listaUbic As List(Of String) = arUbic.Split(";").ToList()
                For Each ubic As String In listaUbic
                    Dim ubicc As String = "~/P_Movil/Administrar/Temporal" + CarpetaDominio + "/File" & ubic
                    Dim strfn As String = HttpContext.Current.Server.MapPath(ubicc)
                    If File.Exists(strfn) Then
                        File.Delete(strfn)
                    End If
                Next
            End If
            Dim lstArchAdjSession As List(Of ENT_MOV_ArchivoAdjunto) = CType(HttpContext.Current.Session("ArchisoAdjuntosNuevo"), List(Of ENT_MOV_ArchivoAdjunto))
            lstArchAdjSession.RemoveAll(Function(x) x.P_inIdAdj <= idAdj)
            HttpContext.Current.Session("ArchisoAdjuntosNuevo") = lstArchAdjSession
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    'agregado 04-04-2014 wapumayta
    <WebMethod()>
    Public Shared Function EliminarArchivosTemporales(ByVal lstArchivos As String, ByVal charSeparador As Char) As String
        Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/P_Movil/Administrar/Temporal/"), "/")
        Try
            If lstArchivos <> "" Then
                Dim listaUbic As List(Of String) = lstArchivos.Split(charSeparador).ToList()
                For Each ubic As String In listaUbic
                    Dim ubicc As String = "~/P_Movil/Administrar/Temporal" + CarpetaDominio + "/File" & ubic
                    Dim strfn As String = HttpContext.Current.Server.MapPath(ubicc)
                    If File.Exists(strfn) Then
                        File.Delete(strfn)
                    End If
                Next
            End If
            Return ""
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function DescargarArchivoBD(ByVal inIdAdj As Integer) As String
        Dim Resultado As String = ""
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim ArchivoAdjunto As BL_MOV_ArchivoAdjunto = New BL_MOV_ArchivoAdjunto(oUsuario.IdCliente)

            Dim oAdjunto As ENT_MOV_ArchivoAdjunto = ArchivoAdjunto.MostarArchivoAdjunto(inIdAdj)
            ArchivoAdjunto.Dispose()

            Dim vcFilePath = ""
            Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Solicitudes//", "//")

            vcFilePath = HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Solicitudes" + CarpetaDominio + "//" + oAdjunto.vcNomAdj
            Dim byFileData As Byte() = oAdjunto.binData

            If Not File.Exists(vcFilePath) Then
                File.WriteAllBytes(vcFilePath, byFileData)
            End If

            Resultado = "1"

            Return Resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function InsertarArchivoBD(ByVal lstUbicaciones As String, ByVal charSeparador As Char, ByVal vcCodSol As String) As String
        Dim Resultado As String = ""
        Dim ArchivoAdjunto As BL_MOV_ArchivoAdjunto = Nothing
        Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/P_Movil/Administrar/Temporal/"), "/")
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            ArchivoAdjunto = New BL_MOV_ArchivoAdjunto(oUsuario.IdCliente)
            Dim lstUbicacionesAgregadas = lstUbicaciones.Split(charSeparador)
            For Each vcUbicacion As String In lstUbicacionesAgregadas
                Dim ubicc As String = "~/P_Movil/Administrar/Temporal" + CarpetaDominio + "/File" & vcUbicacion
                Dim strfn As String = HttpContext.Current.Server.MapPath(ubicc)
                If File.Exists(strfn) Then
                    Dim oArchivoAdjunto As New ENT_MOV_ArchivoAdjunto
                    Using fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Read)
                        Dim BinaryData(fs.Length - 1) As Byte
                        fs.Read(BinaryData, 0, BinaryData.Length)
                        oArchivoAdjunto.F_vcCodSol = vcCodSol
                        oArchivoAdjunto.vcNomAdj = vcUbicacion
                        oArchivoAdjunto.binData = BinaryData
                        oArchivoAdjunto.vcExtAdj = Path.GetExtension(ubicc).Substring(1)
                        fs.Flush()
                        fs.Close()
                    End Using
                    File.Delete(strfn)
                    ArchivoAdjunto.Insertar(oArchivoAdjunto)
                End If
            Next
            Return Resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(ArchivoAdjunto) Then ArchivoAdjunto.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function EliminarArchivoBD(ByVal vcCodSol As String, ByVal idAdj As String) As String
        Dim Resultado As Integer = 0
        Dim ArchivoAdjunto As BL_MOV_ArchivoAdjunto = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            ArchivoAdjunto = New BL_MOV_ArchivoAdjunto(oUsuario.IdCliente)
            Resultado = ArchivoAdjunto.Eliminar(idAdj)
            Return Resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(ArchivoAdjunto) Then ArchivoAdjunto.Dispose()
        End Try
    End Function
End Class
