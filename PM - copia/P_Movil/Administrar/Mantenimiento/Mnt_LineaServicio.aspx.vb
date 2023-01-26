Imports System.IO
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Web.Script.Serialization
Imports System.Data
Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Web.Script.Services

Partial Class P_Movil_Administrar_Mantenimiento_Mnt_LineaServicio
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    hdfLinea.Value = Request.QueryString("vcLinea")
                    hdfCodCuenta.Value = Request.QueryString("vcCodCta")
                    hdfAsigCred.Value = Request.QueryString("vcTipAsiCre")
                    hdfAccion.Value = Request.QueryString("vcAccion")
                    hdfServicio.Value = Request.QueryString("vcLinSer")
                    hdfTipo.Value = Request.QueryString("vcTipoPag")
                    dvAsignacion.Style("display") = ""
                    If Request.QueryString("vcSituacion") = "1" Then
                        ttgInfoServicios.Visible = True
                    Else
                        ttgInfoServicios.Visible = False
                    End If

                    'JHERRERA - 27/04/2015
                    'Desc: Si tiene código de solicitudes, lee servicios de la línea almacenados en una tabla intermedia (para botón guardar)
                    '------------------------------------------------------------------------------------------------------------------------
                    hdfinCodSol.Value = "0"
                    If Request.QueryString("inCodSol") IsNot Nothing Then
                        hdfinCodSol.Value = Request.QueryString("inCodSol")
                    End If
                    '------------------------------------------------------------------------------------------------------------------------

                    'If hdfTipo.Value = "Linea" Then
                    '    LblTituloAgregar.Text = "Agregar"
                    '    LblTituloEditar.Text = "Modificar"
                    '    LblTituloQuitar.Text = "Quitar"
                    'Else
                    '    LblTituloAgregar.Text = ""
                    '    LblTituloEditar.Text = ""
                    '    LblTituloQuitar.Text = ""
                    'End If
                    'hdfTipo.Value = Request.QueryString("Tipo")
                    'hdfMultiple.Value = Request.QueryString("Multiple")
                    'hdfEmpleado.Value = Request.QueryString("vcCodEmp")
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try


        'Try
        '    If Not IsPostBack Then
        '        hdfLinea.Value = ""
        '        hdfCodCuenta.Value = "CTA001"
        '        hdfAsigCred.Value = "2"
        '        hdfAccion.Value = ""
        '        dvAsignacion.Style("display") = ""
        '    End If
        '    UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        'Catch ex As Exception
        '    Dim util As New Utilitarios
        '    util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
        '    Throw New Exception(UtilitarioWeb.MensajeError)
        'End Try
    End Sub

    <WebMethod()>
    Public Shared Function ListarServicioPorCuenta(ByVal vcCodCue As String) As List(Of ENT_GEN_Servicio)
        Try
            Dim Servicio As BL_GEN_Servicio = New BL_GEN_Servicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As List(Of ENT_GEN_Servicio) = Servicio.ListarTiposServiciosPorCuenta(vcCodCue.Replace("&#39", "'"))
            Servicio.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarServicioPorCuentaLineas(ByVal vcCodCue As String, ByVal inCodTipSer As Integer) As List(Of ENT_GEN_Servicio)
        Try
            Dim Servicio As BL_GEN_Servicio = New BL_GEN_Servicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As List(Of ENT_GEN_Servicio) = Servicio.ListarServicioPorCuentaLineas(vcCodCue.Replace("&#39", "'"), inCodTipSer)
            Servicio.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ObtenerCantidadRestante(ByVal pvcCodCta As String, ByVal pvcCodTipSer As String, ByVal pvcCodSer As String, ByVal vcNumLin As String,
                                                   ByVal inCodSubCue As Integer, ByVal inCodSol As Integer) As ENT_GEN_Servicio
        Dim Servicio As BL_GEN_Servicio = Nothing
        Try
            Servicio = New BL_GEN_Servicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As ENT_GEN_Servicio = Servicio.ObtenerCantidadRestante(pvcCodCta, pvcCodTipSer, pvcCodSer, vcNumLin, inCodSubCue)
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Servicio) Then Servicio.Dispose()
        End Try
    End Function

End Class
