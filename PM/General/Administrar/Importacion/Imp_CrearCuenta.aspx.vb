Imports System.Web.Services
Imports System.Web.Script.Serialization
Imports VisualSoft.PCSistelMovil.ProcesoImportacion.BL
Imports VisualSoft.Comun.Auditoria
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE

Public Class Imp_CrearCuenta
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Operador As BL_GEN_Operador = Nothing
        Dim LineaTipo As BL_MOV_LineaTipo = Nothing
        Dim Cuenta As BL_MOV_Cuenta = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    oUsuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                    Operador = New BL_GEN_Operador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    LineaTipo = New BL_MOV_LineaTipo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Cuenta = New BL_MOV_Cuenta(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    'Dim vcCodCue As String = Request.QueryString("Cod")

                    UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(-1, "<< Seleccionar >>"), "vcNomOpe", "P_inCodOpe")
                    'UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(), "vcNomOpe", "P_inCodOpe")

                    UtilitarioWeb.Dataddl(ddlDiaInicial, UtilitarioWeb.ListarDias, "", "")
                    UtilitarioWeb.Dataddl(ddlPeriodoFacturacion, Cuenta.Listar_TipoPeriodoFacturacion(-1, "<< Seleccionar >>"), "vcNom", "P_inCod")
                    UtilitarioWeb.Dataddl(ddlAsignacionCredito, Cuenta.Listar_TipoAsignacionCredito(-1, "<< Seleccionar >>"), "vcNom", "P_inCod")
                    hdfCodLinTip_X_User.Value = ObtenerTipoLinea_X_Usuario(oUsuario)
                    UtilitarioWeb.Dataddl(ddlLineaTipo, LineaTipo.Listar(Convert.ToInt32(hdfCodLinTip_X_User.Value), -1, "<< Seleccionar >>"), "vcDescripcion", "P_inCod")

                    'ECONDEÑA   23/05/2016  
                    Dim btTipoBolaBasic As Boolean = ConfigurationManager.AppSettings("EsBasicBolsa") = "1"
                    If btTipoBolaBasic Then
                        Dim itemEliminar As ListItem = ddlAsignacionCredito.Items.FindByValue("1")
                        If itemEliminar IsNot Nothing Then
                            ddlAsignacionCredito.Items.Remove(itemEliminar)
                        End If

                        itemEliminar = ddlAsignacionCredito.Items.FindByValue("3")
                        If itemEliminar IsNot Nothing Then
                            ddlAsignacionCredito.Items.Remove(itemEliminar)
                        End If
                    End If
                    'End ECONDEÑA   23/05/2016

                    ddlPeriodoFacturacion.SelectedIndex = 1
                    ddlDiaInicial.SelectedIndex = 0

                    HdfPeriodoFacturacion.Value = ddlPeriodoFacturacion.Items(1).Value
                    HdfDiaInicial.Value = ddlDiaInicial.Items(0).Value

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
        Finally
            If Operador IsNot Nothing Then Operador.Dispose()
            If LineaTipo IsNot Nothing Then LineaTipo.Dispose()
            If Cuenta IsNot Nothing Then Cuenta.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(ByVal objCuenta As String, ByVal vcCodCue As String, ByVal vcCamDim As String, icCuentaTemp As String) As Integer
        Dim Cuenta As BL_MOV_Cuenta = Nothing
        Dim blServicioImp As BL_IMP_DAT_Servicio = Nothing
        Try
            blServicioImp = New BL_IMP_DAT_Servicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Cuenta = New BL_MOV_Cuenta(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oSerializer As New JavaScriptSerializer
            Dim v_oCuenta As ENT_MOV_Cuenta = oSerializer.Deserialize(Of ENT_MOV_Cuenta)(objCuenta)

            Dim objListAdjuntos As List(Of ENT_MOV_CuentaAdjunto) = New List(Of ENT_MOV_CuentaAdjunto)
            If v_oCuenta.Adjuntos.Length > 0 Then
                Dim mAdjuntos() As String = v_oCuenta.Adjuntos.Split(",")
                For Each strAdj As String In mAdjuntos
                    Dim objAdjunto As New ENT_MOV_CuentaAdjunto
                    objAdjunto.IdCuenta = 0
                    objAdjunto.NombreArchivo = strAdj.Split(":")(0)
                    objAdjunto.TamanoArchivo = strAdj.Split(":")(1)
                    objListAdjuntos.Add(objAdjunto)
                Next
            End If

            Dim oAuditoria As New ProcesaAuditoria
            oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
            'oAuditoria.Modulo = Constantes.AuditoriaConstantes.Name
            oAuditoria.Modulo = "Servicios de Importación"
            oAuditoria.NombreUsuario = oUsuario.vcUsu
            oAuditoria.Opcion = "Cuentas"
            oAuditoria.Tabla = Constantes.TableNames.CuentaMovil


            Dim strAntes As String = ""
            vcCodCue.Replace("&#39", "'")
            v_oCuenta.P_vcCod = v_oCuenta.P_vcCod.Replace("&#39", "'")
            v_oCuenta.vcNom = v_oCuenta.vcNom.Replace("&#39", "'")
            For Each oSubCuenta As ENT_MOV_SubCuenta In v_oCuenta.SubCuentas
                oSubCuenta.vcNom = oSubCuenta.vcNom.Replace("&#39", "'")
                oSubCuenta.vcDes = oSubCuenta.vcDes.Replace("&#39", "'")
            Next
            v_oCuenta.Acuerdos = v_oCuenta.Acuerdos.ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")

            v_oCuenta.Organizacion = New VisualSoft.PCSistelMovil.General.BE.ENT_GEN_Organizacion()
            v_oCuenta.Organizacion.vcCodInt = Nothing

            Dim _return As Integer
            If vcCodCue = "" Then
                _return = Cuenta.Insertar(v_oCuenta, objListAdjuntos, vcCamDim)
                If _return <> "-1" Then
                    ''oAuditoria.Insertar(New String() {v_oCuenta.P_vcCod})

                    Utilitario.RegistrarLog(PCSistelMovilLog45.LogBE.eNivel.Auditoria,
                    oAuditoria.Opcion, "Agregar", "USUARIO: " & oAuditoria.NombreUsuario & ". MÓDULO: " & oAuditoria.Modulo & ".TABLA: " & oAuditoria.Tabla)

                    blServicioImp.EliminarCuentaTempxId(icCuentaTemp)
                End If
            Else
                strAntes = oAuditoria.AntesActualizar(New String() {v_oCuenta.P_vcCod})
                Cuenta.Actualizar(v_oCuenta, objListAdjuntos, vcCamDim)
                ''oAuditoria.DespuesActualizar(New String() {v_oCuenta.P_vcCod}, strAntes)

                Utilitario.RegistrarLog(PCSistelMovilLog45.LogBE.eNivel.Auditoria,
                    oAuditoria.Opcion, "Actualizar", "USUARIO: " & oAuditoria.NombreUsuario & ". MÓDULO: " & oAuditoria.Modulo & ".TABLA: " & oAuditoria.Tabla & ". Antes: " & strAntes)

                _return = 0
            End If
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Cuenta IsNot Nothing Then Cuenta.Dispose()
            If blServicioImp IsNot Nothing Then blServicioImp.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarCuentasTemp() As List(Of CuentaTemp)
        Dim blServicio As BL_IMP_DAT_Servicio = Nothing
        Try
            blServicio = New BL_IMP_DAT_Servicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dt As DataTable = blServicio.ListarCuentaTemp()
            Dim lstCtas As New List(Of CuentaTemp)()
            If dt.Rows.Count > 0 Then
                For Each dr As DataRow In dt.Rows
                    Dim obj As New CuentaTemp()
                    obj.Id = dr("id").ToString()
                    obj.P_vcCod = dr("idCuentaTemp").ToString()
                    lstCtas.Add(obj)
                Next
            End If
            Return lstCtas
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If blServicio IsNot Nothing Then blServicio.Dispose()
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

    Class CuentaTemp
        Private _id As String
        Private _P_vcCod As String

        Public Property Id As Integer
            Get
                Return _id
            End Get
            Set(value As Integer)
                _id = value
            End Set
        End Property
        Public Property P_vcCod As String
            Get
                Return _P_vcCod
            End Get
            Set(value As String)
                _P_vcCod = value
            End Set
        End Property
    End Class

End Class