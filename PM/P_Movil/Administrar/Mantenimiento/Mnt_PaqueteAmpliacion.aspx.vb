Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Web.Script.Serialization

Public Class P_Movil_Administrar_Mantenimiento_Mnt_PaqueteAmpliacion
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim oCultura As ENT_GEN_Cultura = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim PaqueteAmpliacion As BL_MOV_PaqueteAmpliacion = Nothing
        Dim Operador As BL_GEN_Operador = Nothing
        Dim TipoServicio As BL_GEN_TipoServicio = Nothing
        Dim GrupoOrigen As BL_GEN_Grupo = Nothing
        Try
            If Not IsPostBack Then
                oCultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
                oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

                Dim inCodPaqAmp As String = Request.QueryString("Cod")

                'cargar paquete
                PaqueteAmpliacion = New BL_MOV_PaqueteAmpliacion(oUsuario.IdCliente)
                Dim oPaqueteAmpliacion As New ENT_MOV_PaqueteAmpliacion()
                oPaqueteAmpliacion = PaqueteAmpliacion.Mostrar(inCodPaqAmp)

                'cargar operador
                Operador = New BL_GEN_Operador(oUsuario.IdCliente)
                UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(-1, "<Seleccionar>"), "vcNomOpe", "P_inCodOpe")
                'UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(), "vcNomOpe", "P_inCodOpe")

                'cargar tipo servicio
                TipoServicio = New BL_GEN_TipoServicio(oUsuario.IdCliente)
                Dim lstTipoServicio As List(Of ENT_GEN_TipoServicio) = TipoServicio.Listar(-1, "<Seleccionar>")
                Dim dictExpEn As New Dictionary(Of Integer, String)
                For Each oTipoServicio As ENT_GEN_TipoServicio In lstTipoServicio
                    If (oTipoServicio.P_inCod = 16 OrElse oTipoServicio.P_inCod = 17 OrElse oTipoServicio.P_inCod = 18 OrElse oTipoServicio.P_inCod = -1) Then
                        ddlTipoServicio.Items.Add(New ListItem(oTipoServicio.vcNom, oTipoServicio.P_inCod))
                        dictExpEn.Add(oTipoServicio.P_inCod, oTipoServicio.vcExpEn)
                    End If
                Next

                'UtilitarioWeb.Dataddl(ddlTipoServicio, lstTipoServicio, "vcNom", "P_inCod")
                'cargar atributo expresado en
                For i = 0 To ddlTipoServicio.Items.Count - 1
                    If (i = 0) Then
                        ddlTipoServicio.Items(i).Attributes.Add("ExpEn", "-")
                    Else
                        ddlTipoServicio.Items(i).Attributes.Add("ExpEn", dictExpEn(ddlTipoServicio.Items(i).Value))
                    End If
                Next
                'cargar grupo origen
                hdfCodLinTip_X_User.Value = ObtenerTipoLinea_X_Usuario(oUsuario)
                GrupoOrigen = New BL_GEN_Grupo(oUsuario.IdCliente)
                Dim lstGrupoOrigen As List(Of ENT_GEN_Grupo) = GrupoOrigen.Listar(Convert.ToInt32(hdfCodLinTip_X_User.Value))
                UtilitarioWeb.Dataddl(ddlGrupoOrigen, lstGrupoOrigen, "vcNom", "P_inCod")

                lblSimboloMoneda.Text = oCultura.Moneda.vcSimMon
                lblSimboloMoneda.ToolTip = oCultura.Moneda.vcNomCor
                If inCodPaqAmp <> "" Then
                    hdfCodigoPaqAmp.Value = inCodPaqAmp
                    txtCodigoPaquete.Enabled = False
                    txtCodigoPaquete.Text = inCodPaqAmp.ToString()
                    txtNombrePaquete.Text = oPaqueteAmpliacion.vcNomPaqAmp
                    txtMonto.Text = UtilitarioWeb.DevuelveNumeroFormateado(oPaqueteAmpliacion.dcMonto.ToString(), UtilitarioWeb.DevuelveFormatoNumero(oCultura))
                    txtCantidad.Text = UtilitarioWeb.DevuelveNumeroFormateado(oPaqueteAmpliacion.inCantidad.ToString(), UtilitarioWeb.DevuelveFormatoNumero(oCultura)).Split(".")(0)
                    ddlOperador.SelectedValue = oPaqueteAmpliacion.Operador.P_inCodOpe
                    ddlTipoServicio.SelectedValue = oPaqueteAmpliacion.TipoServicio.P_inCod
                    lblExpEn.Text = oPaqueteAmpliacion.TipoServicio.vcExpEn
                    If (oPaqueteAmpliacion.lstGrupoOrigen.Count > 0) Then
                        UtilitarioWeb.DataLst(lstGrupOrig, oPaqueteAmpliacion.lstGrupoOrigen, "vcNomGru", "P_inCodGruOri")
                    End If
                    chkActivo.Checked = oPaqueteAmpliacion.btVig
                    If oPaqueteAmpliacion.btVig Then
                        trActivo.Style("display") = "none"
                    Else
                        trActivo.Style("display") = ""
                    End If
                    hdfCodServicio.Value = oPaqueteAmpliacion.Servicio.P_inCod
                Else
                    hdfCodigoPaqAmp.Value = "0"
                    trCodigo.Style("display") = "none"
                    trActivo.Style("display") = "none"
                End If
            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)

            If ddlOperador.Items.Count = 2 Then
                ddlOperador.Enabled = False
                ddlOperador.SelectedIndex = 1
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(PaqueteAmpliacion) Then PaqueteAmpliacion.Dispose()
            If Not IsNothing(Operador) Then Operador.Dispose()
            If Not IsNothing(TipoServicio) Then TipoServicio.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(ByVal inCodPaqAmp As Integer, ByVal vcNombre As String, ByVal inCodOpe As Integer, _
                                                   ByVal inCantidad As String, ByVal dcMonto As String, ByVal inCodTipSer As Integer, _
                                                   ByVal btVig As Boolean, ByVal Grupos As String, ByVal inCodSer As Integer) As Integer
        Dim oCultura As ENT_GEN_Cultura = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim PaqueteAmpliacion As BL_MOV_PaqueteAmpliacion = Nothing
        Try
            Dim result As Integer
            Dim oSerializer As New JavaScriptSerializer
            oCultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            PaqueteAmpliacion = New BL_MOV_PaqueteAmpliacion(oUsuario.IdCliente)
            Dim oPaqueteAmpliacion As New ENT_MOV_PaqueteAmpliacion()
            Dim lstGruposOrigen As List(Of ENT_GEN_GrupoOrigen) = oSerializer.Deserialize(Of List(Of ENT_GEN_GrupoOrigen))(Grupos)

            If (dcMonto <> "") Then
                dcMonto = UtilitarioWeb.DevuelveNumeroSinFormato(dcMonto)
            Else
                dcMonto = "0"
            End If

            If (inCantidad <> "") Then
                inCantidad = UtilitarioWeb.DevuelveNumeroSinFormato(inCantidad)
            Else
                inCantidad = "0"
            End If

            oPaqueteAmpliacion.inCodPaqAmp = inCodPaqAmp
            oPaqueteAmpliacion.vcNomPaqAmp = vcNombre
            oPaqueteAmpliacion.Operador.P_inCodOpe = inCodOpe
            oPaqueteAmpliacion.inCantidad = Convert.ToInt32(inCantidad)
            oPaqueteAmpliacion.dcMonto = Convert.ToDecimal(dcMonto)
            oPaqueteAmpliacion.TipoServicio.P_inCod = inCodTipSer
            oPaqueteAmpliacion.lstGrupoOrigen = lstGruposOrigen
            oPaqueteAmpliacion.btVig = btVig
            oPaqueteAmpliacion.Servicio.P_inCod = inCodSer

            If inCodPaqAmp = 0 Then
                result = PaqueteAmpliacion.Insertar(oPaqueteAmpliacion)
            Else
                result = PaqueteAmpliacion.Actualizar(oPaqueteAmpliacion)
            End If

            Return result
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(PaqueteAmpliacion) Then PaqueteAmpliacion.Dispose()
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