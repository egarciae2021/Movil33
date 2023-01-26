Imports System.IO
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Web.Script.Serialization
Imports System.Data
Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Web.Script.Services

Public Class P_Movil_Consultar_Con_CriteriosReporte
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim LineaTipo As BL_MOV_LineaTipo = Nothing
        Dim Operador As BL_GEN_Operador = Nothing
        Dim Cuenta As BL_MOV_Cuenta = Nothing
        Dim Estado As BL_MOV_Estado = Nothing

        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                    LineaTipo = New BL_MOV_LineaTipo(oUsuario.IdCliente)
                    Operador = New BL_GEN_Operador(oUsuario.IdCliente)
                    Cuenta = New BL_MOV_Cuenta(oUsuario.IdCliente)
                    Estado = New BL_MOV_Estado(oUsuario.IdCliente)

                    hdfvcTab.Value = Request.QueryString("vcTab")
                    hdfvcTipRep.Value = Request.QueryString("vcTipRep")
                    hdfNumHis.Value = 1

                    If (DateTime.Now.Month = 1) Then
                        txtDiaInicial.Text = DateTime.Now.AddDays(-DateTime.Now.Day - 30).ToShortDateString

                    Else
                        txtDiaInicial.Text = DateTime.Now.AddDays(-DateTime.Now.Day + 1 - DateTime.DaysInMonth(DateTime.Now.Year, DateTime.Now.Month - 1)).ToShortDateString
                    End If
                    If hdfvcTipRep.Value = "7" Then
                        LblTitulo.Text = "Criterios Adicionales - Hist&oacutericos de Asignaciones"
                    End If

                    txtDiaFinal.Text = DateTime.Now.AddDays(-DateTime.Now.Day).ToShortDateString

                    hdfCodLinTip_X_User.Value = ObtenerTipoLinea_X_Usuario(oUsuario)
                    UtilitarioWeb.Dataddl(ddlLineaTipo, LineaTipo.Listar(Convert.ToInt32(hdfCodLinTip_X_User.Value), -1, "<Seleccionar>"), "vcDescripcion", "P_inCod")
                    UtilitarioWeb.Dataddl(ddlEstado, Estado.ListarPorModulo(1, 0, -1, "<Seleccionar>"), "vcNom", "P_inCod")
                    'UtilitarioWeb.DatachkLst(chklstOperador, Operador.Listar(), "vcNomOpe", "P_inCodOpe")


                    If hdfvcTab.Value = "MOV_Dispositivo" Then
                        accordEmpleado.Visible = True
                        accordLinea.Visible = True
                        accordOfiOrg.Visible = True
                        accordModelo.Visible = True
                        accordFecha.Visible = True
                        accordCuenta.Visible = False
                    Else
                        accordEmpleado.Visible = True
                        accordLinea.Visible = True
                        accordOfiOrg.Visible = True
                        accordModelo.Visible = False
                        accordFecha.Visible = True
                        accordCuenta.Visible = True
                        UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(-1, "<Todos>"), "vcNomOpe", "P_inCodOpe")
                        UtilitarioWeb.DatachkLst(chklstCuenta, Cuenta.ListarPorOperador("-1"), "vcNom", "P_vcCod")
                    End If

                    bpBusquedaModelos.NombreEntidad = "Modelos Dispositivos"
                    bpBusquedaModelos.vcTab = "MOV_ModeloDispositivo"
                    bpBusquedaModelos.TipoOrigen = 0
                    bpBusquedaModelos.Condicion = " btVig = 1 "
                    bpBusquedaModelos.FuncionPersonalizada = "fnMostrarCodigoModelos"
                    bpBusquedaModelos.RutaRaiz = "../../"
                    bpBusquedaModelos.Contenedor = "dvBusquedaModelos"


                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If LineaTipo IsNot Nothing Then LineaTipo.Dispose()
            If Operador IsNot Nothing Then Operador.Dispose()
            If Cuenta IsNot Nothing Then Cuenta.Dispose()
            If Estado IsNot Nothing Then Estado.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function ListarCuentaPorOperador(ByVal inCodOpe As String) As List(Of ENT_MOV_Cuenta)
        Try
            Dim Cuenta As BL_MOV_Cuenta = New BL_MOV_Cuenta(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As List(Of ENT_MOV_Cuenta) = Cuenta.ListarPorOperador(Integer.Parse(inCodOpe))
            Cuenta.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Sub SeteaValores(ByVal oHistorico As String)
        Try
            Dim oSerializer As New JavaScriptSerializer
            Dim v_oHistorico As ENT_MOV_Historicos = oSerializer.Deserialize(Of ENT_MOV_Historicos)(oHistorico)
            HttpContext.Current.Session("Historicos") = v_oHistorico

            HttpContext.Current.Session("Historico" & v_oHistorico.inNumHis.ToString()) = v_oHistorico
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

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