Imports System.Web.Services
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BL
Imports System.Web.Script.Serialization
Imports System.IO
Imports VisualSoft.Comun.Auditoria
Imports VisualSoft.PCSistelMovil.Campana.BE

Partial Class P_Movil_Administrar_Mantenimiento_Cam_Mnt_Financiamiento
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim FinanciamientoTipo As BL_MOV_CAM_FinanciamientoTipo = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim vcCod = Request.QueryString("Cod")
                    'situacion
                    hdfTipoFinancSituacion.Value = "1" 'mantenimiento premite edicion
                    If Not IsNothing(Request.QueryString("FinancSit")) Or Request.QueryString("FinancSit") <> "" Then
                        hdfTipoFinancSituacion.Value = Request.QueryString("FinancSit")
                    End If

                    If Not IsNothing(vcCod) Then
                        hdfIdTipoFinanciamiento.Value = vcCod

                        'determinar uso en solicitudes
                        If hdfTipoFinancSituacion.Value = "1" Then
                            Dim cantSolicitudes As Integer = 0
                            FinanciamientoTipo = New BL_MOV_CAM_FinanciamientoTipo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                            cantSolicitudes = FinanciamientoTipo.SolicitudesUsandoFinanciamiento(vcCod)
                            If cantSolicitudes > 0 Then
                                hdfTipoFinancSituacion.Value = "2" 'mantenimiento no se puede editar
                            End If
                        End If
                    End If

                    'JHERRERA 20150815: Comentado porque se acordó que no se iba a usar la opción interés
                    trIntereses.Style("display") = "none"

                    hdfCodLinTip_X_User.Value = ObtenerTipoLinea_X_Usuario(oUsuario)
                    Dim LineaTipo As BL_MOV_LineaTipo = New BL_MOV_LineaTipo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    UtilitarioWeb.Dataddl(ddlLineaTipo, LineaTipo.Listar(Convert.ToInt32(hdfCodLinTip_X_User.Value), -1, "<Seleccione>"), "vcDescripcion", "P_inCod")
                    LineaTipo.Dispose()
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If FinanciamientoTipo IsNot Nothing Then
                FinanciamientoTipo.Dispose()
            End If
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Mostrar(ByVal p_IdTipoFinanciamiento As String) As MOV_CAM_FinanciamientoTipo
        Dim FinanciamientoTipo As BL_MOV_CAM_FinanciamientoTipo = Nothing

        Try
            FinanciamientoTipo = New BL_MOV_CAM_FinanciamientoTipo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Return FinanciamientoTipo.Mostrar(Integer.Parse(p_IdTipoFinanciamiento))
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If FinanciamientoTipo IsNot Nothing Then
                FinanciamientoTipo.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Guardar(ByVal p_oFinanciamientoTipo As String) As Integer
        Dim FinanciamientoTipo As BL_MOV_CAM_FinanciamientoTipo = Nothing
        Dim IdFinanciamiento As Integer = 0
        Try

            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            FinanciamientoTipo = New BL_MOV_CAM_FinanciamientoTipo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oSerializer As New JavaScriptSerializer

            Dim oFinanciamientoTipo As MOV_CAM_FinanciamientoTipo = oSerializer.Deserialize(Of MOV_CAM_FinanciamientoTipo)(p_oFinanciamientoTipo)

            'Auditoria...
            Dim oAuditoria As New ProcesaAuditoria
            oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
            oAuditoria.Modulo = Constantes.AuditoriaConstantes.ModuloFacturacion.Name
            oAuditoria.NombreUsuario = oUsuario.vcUsu
            oAuditoria.Opcion = Constantes.AuditoriaConstantes.ModuloFacturacion.TipoFinanciamiento
            oAuditoria.Tabla = Constantes.TableNames.TipoFinanciamiento

            If oFinanciamientoTipo.IdTipoFinanciamiento = -1 Then
                'Nuevo
                IdFinanciamiento = FinanciamientoTipo.Guardar(oFinanciamientoTipo)
                oAuditoria.Insertar(New String() {IdFinanciamiento})
            Else
                'Editar
                ''AUDITORIA:Actualizar Antes
                Dim strAntes As String = oAuditoria.AntesActualizar(New String() {oFinanciamientoTipo.IdTipoFinanciamiento})
                IdFinanciamiento = FinanciamientoTipo.Guardar(oFinanciamientoTipo)
                ''AUDITORIA:Actualizar Despues
                oAuditoria.DespuesActualizar(New String() {IdFinanciamiento}, strAntes)
            End If

        Catch exSQL As SqlClient.SqlException
            If exSQL.Message.ToUpper().Contains("UNIQUE KEY") Then
                Return -2
            End If
        Catch ex As Exception

            If ex.Message.ToUpper().Contains("UNIQUE KEY") Then
                Return -2
            End If
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If FinanciamientoTipo IsNot Nothing Then
                FinanciamientoTipo.Dispose()
            End If
        End Try

        Return IdFinanciamiento

    End Function

    <WebMethod()>
    Public Shared Function ListarTipoInteres() As List(Of Object)
        Try
            Dim lstTipoInteres As New List(Of Object)

            'Dim dict1 As New Dictionary(Of String, Object)
            'dict1.Add("texto", "Simple")
            'dict1.Add("valor", "S")
            'lstTipoInteres.Add(dict1)
            Dim dict2 As New Dictionary(Of String, Object)
            dict2.Add("texto", "Compuesto")
            dict2.Add("valor", "C")
            lstTipoInteres.Add(dict2)

            Return lstTipoInteres

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    Private Function ObtenerTipoLinea_X_Usuario(ByVal oUsuario As ENT_SEG_Usuario) As String
        Dim vcPerfiles As String = String.Empty
        Dim vcPerfil As String = ""
        For p As Integer = 0 To oUsuario.Perfiles.Count - 1
            If (vcPerfiles = "") Then
                If oUsuario.Perfiles(p).inCodTip_General.ToString() = 1 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General()) Then
                    vcPerfiles = oUsuario.Perfiles(p).inCodTip_General.ToString()
                ElseIf oUsuario.Perfiles(p).inCodTip_General.ToString() = 2 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                    vcPerfiles = oUsuario.Perfiles(p).inCodTip_General.ToString()
                ElseIf oUsuario.Perfiles(p).inCodTip_General.ToString() = 0 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                    vcPerfiles = oUsuario.Perfiles(p).inCodTip_General.ToString()
                End If
            Else
                If oUsuario.Perfiles(p).inCodTip_General.ToString() = 1 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                    vcPerfiles += "," + oUsuario.Perfiles(p).inCodTip_General.ToString()
                ElseIf oUsuario.Perfiles(p).inCodTip_General.ToString() = 2 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                    vcPerfiles += "," + oUsuario.Perfiles(p).inCodTip_General.ToString()
                ElseIf oUsuario.Perfiles(p).inCodTip_General.ToString() = 0 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                    vcPerfiles += "," + oUsuario.Perfiles(p).inCodTip_General.ToString()
                End If
            End If
        Next
        '---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        If vcPerfiles = "1,2" Or vcPerfiles = "2,1" Or vcPerfiles.Contains("0") Then
            vcPerfil = "0"
        ElseIf vcPerfiles <> "" Then
            vcPerfil = vcPerfiles.ToString()
        End If

        Return vcPerfil

    End Function
End Class
