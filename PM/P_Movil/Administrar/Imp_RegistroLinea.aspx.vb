Imports VisualSoft.PCSistelMovil.Importacion.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios

Partial Class P_Movil_Administrar_Imp_RegistroLinea
    Inherits System.Web.UI.Page
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim IMP_Cola As BL_MOV_IMP_Cola = Nothing
        Dim IMP_LineaTipo As BL_MOV_LineaTipo = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim inCodCol As String = Request.QueryString("inCodCol")
                    Dim idTipRes As String = Request.QueryString("idTipRes")
                    Dim inTipPla As String = Request.QueryString("inTipPla")
                    If Not IsNothing(inCodCol) Then
                        oUsuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                        IMP_Cola = New BL_MOV_IMP_Cola(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        IMP_LineaTipo = New BL_MOV_LineaTipo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        hdfCodLinTip_X_User.Value = ObtenerTipoLinea_X_Usuario(oUsuario)
                        UtilitarioWeb.Dataddl(ddlLineaTipo, IMP_LineaTipo.Listar(Convert.ToInt32(hdfCodLinTip_X_User.Value), -1, "<Seleccionar>"), "vcDescripcion", "P_inCod")
                        'UtilitarioWeb.DatachkLst(chklstNumerosSinRegistrar, IMP_Cola.ListarLineasNoRegistradas(Integer.Parse(inCodCol)), "P_vcNum", "P_vcNum")

                        '<---- ECONDEÑA   16/11/2015
                        'UtilitarioWeb.DatachkLst(chklstNumerosSinRegistrar, IMP_Cola.ListarLineasNoRegistradas(Integer.Parse(inCodCol)), "P_vcNum", "P_vcNum")
                        If inTipPla = "2" AndAlso idTipRes = "1" Then
                            UtilitarioWeb.DatachkLst(chklstNumerosSinRegistrar, IMP_Cola.ListarDispositivosNoRegistrados(Integer.Parse(inCodCol)), "P_vcCodIMEI", "P_vcCodIMEI")
                            hdfInTipPla.Value = inTipPla
                            hdfIdTipRes.Value = idTipRes
                        Else
                            UtilitarioWeb.DatachkLst(chklstNumerosSinRegistrar, IMP_Cola.ListarLineasNoRegistradas(Integer.Parse(inCodCol)), "P_vcNum", "P_vcNum")
                        End If
                        '---->

                        hdfinCodCol.Value = inCodCol

                        Dim oCola As ENT_MOV_IMP_Cola = IMP_Cola.Mostrar(inCodCol)
                        hdfCodProc.Value = oCola.Proceso.P_inCodPro
                        hdfMesPer.Value = oCola.Proceso.vcMesPer

                    End If
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If IMP_Cola IsNot Nothing Then
                IMP_Cola.Dispose()
            End If
            If IMP_LineaTipo IsNot Nothing Then
                IMP_LineaTipo.Dispose()
            End If
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function AsociarLineas(ByVal vcLstLinea As String, ByVal vcCodEmp As String, ByVal vcCodSuc As String, ByVal vcLineaTipo As String, ByVal inCodCol As String) As List(Of ENT_MOV_Linea)
        Dim Linea As BL_MOV_Linea = Nothing
        Dim oFacturacion As BL_MOV_IMP_Facturacion = Nothing
        Try
            Linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oLinea As New ENT_MOV_Linea

            oLinea.Empleado.P_vcCod = vcCodEmp
            oLinea.Sucursal.P_vcCod = vcCodSuc

            'oLinea.F_inCodTip = 1
            oLinea.F_inCodTip = vcLineaTipo

            Dim _return As List(Of ENT_MOV_Linea)

            oFacturacion = New BL_MOV_IMP_Facturacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            _return = oFacturacion.ActualizarFacturacionResumen(oLinea, vcLstLinea, Integer.Parse(inCodCol))

            _return = Linea.RegistroMasivo(oLinea, vcLstLinea, Integer.Parse(inCodCol))
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Linea IsNot Nothing Then Linea.Dispose()
            If oFacturacion IsNot Nothing Then oFacturacion.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function AsociarDispositivos(ByVal vcLstDispositivo As String, ByVal vcCodEmp As String, ByVal vcCodModDisp As String, ByVal vcLineaTipo As String, ByVal inCodCol As String) As List(Of ENT_MOV_Dispositivo)
        Dim Dispositivo As BL_MOV_Dispositivo = Nothing
        Dim oFacturacion As BL_MOV_IMP_Facturacion = Nothing
        Try
            Dispositivo = New BL_MOV_Dispositivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            oFacturacion = New BL_MOV_IMP_Facturacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oDispositivo As New ENT_MOV_Dispositivo
            oDispositivo.F_vcCodEmp = vcCodEmp
            oDispositivo.ModeloDispositivo.P_inCod = vcCodModDisp
            oDispositivo.F_inCodTip = vcLineaTipo

            Dim _return As List(Of ENT_MOV_Dispositivo)
            oFacturacion.ActualizarResumenEquipo(oDispositivo, vcLstDispositivo, Integer.Parse(inCodCol))
            _return = Dispositivo.RegistroMasivo(oDispositivo, vcLstDispositivo, Integer.Parse(inCodCol))
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Dispositivo IsNot Nothing Then Dispositivo.Dispose()
            If oFacturacion IsNot Nothing Then oFacturacion.Dispose()
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
