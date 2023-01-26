Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports UtilitarioWeb

Partial Class P_Movil_BienvenidaMovil
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        Dim Cola As BL_MOV_IMP_Cola = Nothing
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Dim Criterio As BL_MOV_IMP_Criterio = Nothing

        If IsNothing(Session("Usuario")) Then
            'Dim script As String = "window.parent.location.reload()"
            Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
        Else
            Try
                If Not IsPostBack Then
                    Cola = New BL_MOV_IMP_Cola(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Solicitud = New BL_MOV_Solicitud(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Criterio = New BL_MOV_IMP_Criterio(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                    Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                    Dim vcCodEmpl = oUsuario.Empleado.P_vcCod
                    Dim intGrupo As Integer
                    If UtilitarioWeb.Seguridad.EsAdministrador Then intGrupo = 0

                    'Tipos de Solicitud por Grupo
                    Dim vcGruTipSol As String = TipoSolicitud.ObtenerTiposPorUsuario()

                    Dim oSolicitud As ENT_MOV_Solicitud
                    If intGrupo = 0 Then 'Es administrador
                        oSolicitud = Solicitud.MostrarInformacion("-1", oUsuario.P_inCod, vcGruTipSol)
                    Else
                        oSolicitud = Solicitud.MostrarInformacion(vcCodEmpl, oUsuario.P_inCod, vcGruTipSol)
                    End If

                    Dim oCola As ENT_MOV_IMP_Cola = Cola.MostrarInformacion()
                    'Dim oSolicitud As ENT_MOV_Solicitud = Solicitud.MostrarInformacion(vcCodEmpl, intGrupo)
                    Dim oCriterio As ENT_MOV_IMP_Criterio = Criterio.MostrarInformacion(CType(Session("Usuario"), ENT_SEG_Usuario).P_inCod)

                    tbPanel.Visible = False
                    If UtilitarioWeb.Seguridad.EsAdministrador Then tbPanel.Visible = True

                    lblUltimaImportacion.Text = oCola.dtFecEje.ToShortDateString() & " " & oCola.dtFecEje.ToShortTimeString()

                    lblTotalSolicitud.Text = "Usted tiene " & oSolicitud.inNumTotSol & IIf(oSolicitud.inNumTotSol < 2, " Solicitud", " Solicitudes") & " por Ejecutar"
                    lblPorCambio.Text = oSolicitud.inNumTotCam & IIf(oSolicitud.inNumTotCam < 2, " Cambio", " Cambios")
                    lblPorNuevo.Text = oSolicitud.inNumTotNue & IIf(oSolicitud.inNumTotNue < 2, " Nuevo", " Nuevos")
                    lblPorReposicion.Text = oSolicitud.inNumTotRep & IIf(oSolicitud.inNumTotRep < 2, " Reposición", " Reposiciones")

                    lblConsulta.Text = "Usted tiene " & oCriterio.inNumTotCri & IIf(oCriterio.inNumTotCri < 2, " Criterio Guardado", " Criterios Guardados")
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            Catch ex As Exception
                Dim util As New Utilitarios
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
                Throw New Exception(UtilitarioWeb.MensajeError)
            Finally
                If Cola IsNot Nothing Then Cola.Dispose()
                If Solicitud IsNot Nothing Then Solicitud.Dispose()
                If Criterio IsNot Nothing Then Criterio.Dispose()
            End Try
        End If
    End Sub
End Class