Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports Utilitario
Imports System.Data
Imports System.Web.Script.Serialization
Imports System.IO
Imports VisualSoft.PCSistelMovil.General.BE

Imports VisualSoft.PCSistelMovil.Solicitudes.BE
Imports VisualSoft.PCSistelMovil.Solicitudes.BL

Partial Class P_Movil_Administrar_Solicitudes_Adm_SolicitudNota
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim TipoSolicitud As BL_MOV_TipoSolicitud = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            hdinCod.Value = False
            If IsNothing(oUsuario) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    ttgInfoAdjunto.Mensaje = "El correo a enviar de la nota, no incluirá el archivo adjunto."
                    Dim oCultura As ENT_GEN_Cultura = CType(Session("Cultura"), ENT_GEN_Cultura)
                    Dim fecha As Date = Now.Date




                    hdfUsuario.Value = oUsuario.vcUsu
                    hdfIdSolicitud.Value = Request.QueryString("IdSolicitud")
                    hdfBiEscalado.Value = Request.QueryString("BiEscalamiento")

                    If (Request.QueryString("IdEstApr") = "35" Or Request.QueryString("IdEstPro") = "9") Then
                        txtDetalle.Enabled = False
                    End If

                    'Edgar Garcia 02122022 agregar etiqueta con los nomb perfiles para perfil 42 = gestor solicitudes
                    For Each Perfil As ENT_SEG_Perfil In oUsuario.Perfiles
                        If (Perfil.P_inCod = 20) Then
                            ddlOrigen.Style("display") = "none"
                        End If
                        If (Perfil.P_inCod = 42) Then
                            hdinCod.Value = True
                        End If

                    Next

                    odsNotas.SelectParameters("inCodSol").DefaultValue = hdfIdSolicitud.Value
                    odsNotas.SelectParameters("vcFecCor").DefaultValue = oCultura.vcFecCor
                    odsNotas.SelectParameters("vcHorCor").DefaultValue = oCultura.vcHorCor
                    odsNotas.SelectParameters("inCliente").DefaultValue = oUsuario.IdCliente
                    'dlNotas.DataBind()

                    TipoSolicitud = New BL_MOV_TipoSolicitud(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim lstComboNotas As List(Of ENT_MOV_ComboNotasConf) = TipoSolicitud.TraerComboNotas(hdfIdSolicitud.Value.ToString())

                    For Each combo In lstComboNotas
                        ddlOrigen.Items.Add(New ListItem(combo.nombre, combo.codigo))
                    Next

                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If TipoSolicitud IsNot Nothing Then TipoSolicitud.Dispose()
            'If Detalle IsNot Nothing Then Detalle.Dispose()
            'If Solicitud IsNot Nothing Then Solicitud.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function ValidaSiSolicitudTieneNotaPorLeer(idSolicitud As String) As Boolean

        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Dim tieneNotasPorLeer As Boolean
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
            tieneNotasPorLeer = Solicitud.ValidaSiSolicitudTieneNotaPorLeer(Convert.ToInt32(idSolicitud), Convert.ToInt32(oUsuario.P_inCod))
        Catch ex As Exception
        Finally
            If Solicitud IsNot Nothing Then Solicitud.Dispose()
        End Try
        Return tieneNotasPorLeer
    End Function

    <WebMethod()>
    Public Shared Function InsertarVisto(idSolicitud As String)

        Dim Detalle As BL_MOV_SolicitudDetalle = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            'Dim Detalle As BL_MOV_SolicitudDetalle = Nothing
            Detalle = New BL_MOV_SolicitudDetalle(oUsuario.IdCliente)
            Detalle.InsertarVisto(idSolicitud, oUsuario.P_inCod, oUsuario.vcUsu)
        Catch ex As Exception
        Finally
            If Detalle IsNot Nothing Then Detalle.Dispose()
        End Try
        Return Nothing
    End Function

    <WebMethod()>
    Public Shared Function RegistrarSeguimientoVisto(idSolicitud As String)

        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
            Solicitud.RegistrarSeguimientoVisto(Convert.ToInt32(idSolicitud), oUsuario.P_inCod, oUsuario.vcUsu)
        Catch ex As Exception
        Finally
            If Solicitud IsNot Nothing Then Solicitud.Dispose()
        End Try
        Return Nothing
    End Function

    '<WebMethod()>
    'Public Shared Function ObtenerDetalle(ByVal inCodSol As String) As List(Of Object)
    '    Try
    '        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)

    '        Dim Solicitud As BL_MOV_Solicitud = BL_MOV_Solicitud.Instance(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    '        Dim dtSeguimiento As DataTable = Solicitud.ListarDetalle(Convert.ToInt32(inCodSol), oCultura.vcFecCor, oCultura.vcHorCor)

    '        Dim lstObj As New List(Of Object)
    '        For i As Integer = 0 To dtSeguimiento.Rows.Count - 1
    '            Dim dict As New Dictionary(Of String, Object)
    '            dict.Add("IdSolicitudDetalle", dtSeguimiento.Rows(i)("IdSolicitudDetalle").ToString())
    '            dict.Add("IdSolicitud", dtSeguimiento.Rows(i)("IdSolicitud").ToString())
    '            dict.Add("Detalle", dtSeguimiento.Rows(i)("Detalle").ToString())
    '            dict.Add("Fecha", Utilitario.DevuelveFechaFormateada(dtSeguimiento.Rows(i)("Fecha").ToString(), oCultura.vcFecCor))
    '            dict.Add("Hora", dtSeguimiento.Rows(i)("Hora").ToString())
    '            dict.Add("EsTecnico", dtSeguimiento.Rows(i)("EsTecnico").ToString())
    '            dict.Add("RegistradoPor", dtSeguimiento.Rows(i)("RegistradoPor").ToString())
    '            lstObj.Add(dict)
    '        Next

    '        Return lstObj

    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil,HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    End Try
    'End Function

    <WebMethod()>
    Public Shared Function RegistrarDetalle(ByVal inCodSol As Integer, ByVal vcDetalle As String, ByVal vcFileName As String, ByVal vcEnviaCorreo As String) As List(Of String)

        Dim Detalle As BL_MOV_SolicitudDetalle = Nothing
        Dim lstRespuesta As List(Of String) = New List(Of String)
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim oSolicitudDetalle As ENT_MOV_SolicitudDetalle = New ENT_MOV_SolicitudDetalle()
            Detalle = New BL_MOV_SolicitudDetalle(oUsuario.IdCliente)
            Dim vcExtension = ""
            Dim deLength As Decimal = 0

            oSolicitudDetalle.IdSolicitud = inCodSol
            oSolicitudDetalle.Detalle = (vcDetalle.Replace("&lt;", "<")).Replace("&gt;", ">")
            oSolicitudDetalle.EsTecnico = True
            oSolicitudDetalle.RegistradoPor = oUsuario.vcUsu

            If vcFileName <> "" Then
                Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Solicitudes//", "//")

                Dim vcFilePath = HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Solicitudes" + CarpetaDominio + "//" + vcFileName
                Dim vcName = vcFileName.Substring(0, vcFileName.LastIndexOf("."))
                vcExtension = vcFileName.Substring(vcFileName.LastIndexOf(".") + 1)

                Dim fs As New FileStream(vcFilePath, FileMode.Open, FileAccess.Read)
                deLength = fs.Length / 1024
                Dim byFileData As Byte() = New Byte(fs.Length - 1) {}
                fs.Read(byFileData, 0, System.Convert.ToInt32(fs.Length))
                fs.Close()

                oSolicitudDetalle.Archivo = byFileData
                oSolicitudDetalle.Nombre = vcName
                oSolicitudDetalle.TamanioKB = deLength
            End If

            lstRespuesta.Add((DateTime.Now.ToString(oCultura.vcFecCor + " " + oCultura.vcHorCor)).ToUpper().Replace(".", ""))

            Dim biEnviaCorreo As Boolean = False
            If vcEnviaCorreo = "1" Then biEnviaCorreo = True

            Dim intDetalle = Detalle.Insertar(oSolicitudDetalle, vcExtension, oUsuario.P_inCod, biEnviaCorreo)
            'Detalle.Dispose()

            ReanudarSolicitudPorNotaSolicitud(oUsuario.IdCliente, inCodSol, oUsuario.P_inCod)

            lstRespuesta.Add(intDetalle.ToString())
            lstRespuesta.Add(deLength.ToString("N4") + " KB")

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Detalle IsNot Nothing Then Detalle.Dispose()
        End Try

        Return lstRespuesta
    End Function

    Public Shared Function ReanudarSolicitudPorNotaSolicitud(idCliente As Integer, idSolicitud As Integer, idUsuario As Integer)
        Dim blPausaSolicitud As BL_MOV_PausaSolicitud = Nothing

        Try
            blPausaSolicitud = New BL_MOV_PausaSolicitud(idCliente)
            Dim oUltimaPausaSolicitud As (Boolean, ENT_MOV_SolicitudPausa) = blPausaSolicitud.ListarUltimaPausaSolicitud(idSolicitud)
            Dim enPausa As Boolean = oUltimaPausaSolicitud.Item1
            Dim oTipoPausa As ENT_MOV_SolicitudPausa = oUltimaPausaSolicitud.Item2
            If oTipoPausa.TipoPausa Is Nothing Then
                Return Nothing
            End If

            If UtilitarioWeb.TipoSolicitud.EsTecnico() = True Or UtilitarioWeb.Seguridad.EsAdministrador = True Then
                Return Nothing
            End If

            If oTipoPausa.TipoPausa.IdTipoPausa <> 1 Then 'si mi solicitud es distinto a en espera por cliente
                Return Nothing
            End If

            If enPausa = False Then 'si mi solicitud no esta pausada
                Return Nothing
            End If

            blPausaSolicitud.ReanudarSolicitud(idSolicitud, idUsuario, False)
        Catch ex As Exception
        Finally
            If blPausaSolicitud IsNot Nothing Then blPausaSolicitud.Dispose()
        End Try

        Return Nothing
    End Function

    <WebMethod()>
    Public Shared Function DescargarArchivoBD(ByVal inIdDet As Integer) As String
        Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "\P_Movil\Administrar\Temporal\Solicitudes\", "\")

        Dim Detalle As BL_MOV_SolicitudDetalle = Nothing
        Dim Resultado As String = ""
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Detalle = New BL_MOV_SolicitudDetalle(oUsuario.IdCliente)
            Dim vcNombre As String = ""

            Dim dtDetalle As DataTable = Detalle.Mostrar(-1, oCultura.vcFecCor, oCultura.vcHorCor, inIdDet)
            'Detalle.Dispose()

            Dim vcFilePath = ""

            If Not IsNothing(dtDetalle.Rows(0)("Archivo")) Then
                vcFilePath = HttpContext.Current.Server.MapPath("~") + "\P_Movil\Administrar\Temporal\Solicitudes" + CarpetaDominio + "\" + dtDetalle.Rows(0)("NomArc").ToString()
                Dim byFileData As Byte() = dtDetalle.Rows(0)("Archivo")
                File.WriteAllBytes(vcFilePath, byFileData)
                Resultado = vcFilePath
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Detalle IsNot Nothing Then Detalle.Dispose()
        End Try

        Return Resultado
    End Function

    <WebMethod()>
    Public Shared Function ObtenerNotasEscalamiento(ByVal pIdSolicitud As Integer) As List(Of ENT_MOV_Nota)
        Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "\P_Movil\Administrar\Temporal\Solicitudes\", "\")
        Dim notas As New List(Of ENT_MOV_Nota)()
        Dim BLSolicitudDetalle As BL_MOV_SolicitudDetalle = Nothing
        Try
            BLSolicitudDetalle = New BL_MOV_SolicitudDetalle(0)

            notas = BLSolicitudDetalle.ObtenerNotasEscalamiento(pIdSolicitud, -1, CarpetaDominio)

            Dim vcFilePath = ""
            For Each nota In notas
                If nota.Archivo.Tamano > 0 Then
                    vcFilePath = HttpContext.Current.Server.MapPath("~") + "\P_Movil\Administrar\Temporal\Solicitudes" + CarpetaDominio + "\" + nota.Archivo.Nombre + "." + nota.Archivo.Extencion
                    Dim byFileData As Byte() = nota.Archivo.Archivo
                    File.WriteAllBytes(vcFilePath, byFileData)
                End If
            Next


        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If BLSolicitudDetalle IsNot Nothing Then BLSolicitudDetalle.Dispose()
        End Try
        Return notas
    End Function

    <WebMethod()>
    Public Shared Function RegistrarNotaOperador(ByVal pIdSolicitud As Integer, ByVal pNota As String, ByVal vcFileName As String, ByVal pIdDominio As Integer) As ENT_MOV_Nota
        Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "\P_Movil\Administrar\Temporal\Solicitudes\", "\")
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim deLength As Decimal = 0
        Dim nota As New ENT_MOV_Nota
        Dim resultado As New ENT_MOV_Nota
        Dim BLSolicitudDetalle As BL_MOV_SolicitudDetalle = Nothing
        Try

            nota.Nota = pNota
            nota.IdSolicitudOperadorHistorico = pIdSolicitud
            nota.NombreUsuarioRegistro = oUsuario.vcUsu

            If vcFileName <> "" Then
                Dim vcFilePath = HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Solicitudes" + CarpetaDominio + "//" + vcFileName
                Dim vcName = vcFileName.Substring(0, vcFileName.LastIndexOf("."))
                nota.Archivo.Extencion = vcFileName.Substring(vcFileName.LastIndexOf(".") + 1)

                Dim fs As New FileStream(vcFilePath, FileMode.Open, FileAccess.Read)
                deLength = fs.Length / 1024
                Dim byFileData As Byte() = New Byte(fs.Length - 1) {}
                fs.Read(byFileData, 0, System.Convert.ToInt32(fs.Length))
                fs.Close()

                nota.Archivo.Archivo = byFileData
                nota.Archivo.Nombre = vcName
                nota.Archivo.Tamano = deLength
            End If

            BLSolicitudDetalle = New BL_MOV_SolicitudDetalle(0)

            resultado = BLSolicitudDetalle.RegistrarNotasEscalamiento(nota, pIdDominio, CarpetaDominio)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If BLSolicitudDetalle IsNot Nothing Then BLSolicitudDetalle.Dispose()
        End Try
        Return resultado
    End Function


End Class