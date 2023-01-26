Imports VisualSoft.PCSistelMovil.Importacion.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Public Class P_Movil_Administrar_Imp_RegistroServicio
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim IMP_Cola As BL_MOV_IMP_Cola = Nothing
        Dim IMP_LineaTipo As BL_MOV_LineaTipo = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Servicio As BL_GEN_Servicio = Nothing
        Dim Llamada As BL_MOV_IMP_Llamada = Nothing

        'falta terminar
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
                        Servicio = New BL_GEN_Servicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                        oUsuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                        IMP_Cola = New BL_MOV_IMP_Cola(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                        UtilitarioWeb.Dataddl(ddlTipoLlamada, Llamada.ListarTipoLlamada(), "vcNom", "P_inCod")
                        UtilitarioWeb.Dataddl(ddlServicio, Servicio.Listar(-1, "<Seleccione servicio>"), "vcNom", "P_inCod")

                        If inTipPla = "2" AndAlso idTipRes = "1" Then
                            UtilitarioWeb.DatachkLst(chklstServiciosSinRegistrar, IMP_Cola.ListarServiciosNoRegistrados(Integer.Parse(inCodCol)), "vcNomSerArc", "vcNomSerArc")
                            hdfInTipPla.Value = inTipPla
                            hdfIdTipRes.Value = idTipRes
                        Else
                            UtilitarioWeb.DatachkLst(chklstServiciosSinRegistrar, IMP_Cola.ListarServiciosNoRegistrados(Integer.Parse(inCodCol)), "vcNomSerArc", "vcNomSerArc")
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
    Public Shared Function AsociarServicios(ByVal vcLstServicio As String, ByVal vcCodTipoLlamada As String, ByVal vcCodServicio As String, ByVal inCodCol As String) As List(Of ENT_MOV_IMP_Servicio)
        Dim Servicio As BL_MOV_IMP_Servicio = Nothing
        Dim oFacturacion As BL_MOV_IMP_Facturacion = Nothing
        Try
            Servicio = New BL_MOV_IMP_Servicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oServicio As New ENT_MOV_IMP_Servicio


            oServicio.TipoLlamada.P_inCod = vcCodTipoLlamada
            oServicio.Servicio.P_inCod = vcCodServicio

            Dim _return As List(Of ENT_MOV_IMP_Servicio)
            _return = Servicio.RegistroMasivoServicio(oServicio, vcLstServicio, Integer.Parse(inCodCol))
            oFacturacion = New BL_MOV_IMP_Facturacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            _return = oFacturacion.ActualizarFacturacionResumenServicio(oServicio, Integer.Parse(inCodCol))

            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Servicio IsNot Nothing Then Servicio.Dispose()
            If oFacturacion IsNot Nothing Then oFacturacion.Dispose()
        End Try
    End Function

End Class