Imports System.Web.Services
Imports System.IO
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL

Public Class ContratoResumen
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim oBlEmpleado As BL_GEN_Empleado
        Try
            If IsNothing(Session("Usuario")) Then
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                    If oUsuario.Empleado.P_vcCod IsNot Nothing AndAlso oUsuario.Empleado.P_vcCod <> "" Then

                        hdfEmpleado.Value = oUsuario.Empleado.P_vcCod
                        hdfIdUsuarioLogeado.Value = oUsuario.P_inCod
                        oBlEmpleado = New Global.VisualSoft.Suite80.BL.BL_GEN_Empleado(oUsuario.IdCliente)
                        Dim oEmpleado As ENT_GEN_Empleado = oBlEmpleado.Mostrar(oUsuario.Empleado.P_vcCod)

                        If oEmpleado IsNot Nothing AndAlso oEmpleado.P_vcCod <> "" Then
                            lblNombreEmpleado.Text = Utilitario.ReemplazarTilder(oEmpleado.vcNom) & "<br>(" & oUsuario.Empleado.P_vcCod & " - " & oUsuario.Empleado.Correo & ")"
                            lblArea.Text = Utilitario.ReemplazarTilder(oEmpleado.Area.vcNomOrg)
                            lblCCosto.Text = Utilitario.ReemplazarTilder(oEmpleado.CentroCosto.P_vcCodCenCos + " - " + oEmpleado.CentroCosto.vcNomCenCos)
                            hdfEmpleado.Value = oUsuario.Empleado.P_vcCod
                        End If
                    End If

                    hdfCampanaActiva.Value = oUsuario.IdCampana

                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If oBlEmpleado IsNot Nothing Then oBlEmpleado.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function ObtenerContrato(ByVal pIdEmpleado As String, ByVal pIdCampana As Integer) As String
        Dim pedido As BL_MOV_CAM_Pedido = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            If oUsuario Is Nothing Then
                Return ""
            End If
            pedido = New BL_MOV_CAM_Pedido(oUsuario.IdCliente)

            Dim dt As DataTable = pedido.ObtenerRutaContratoResumen(pIdEmpleado, pIdCampana)
            Auditoria.InsertarAuditoria("Obtener contrato resumen del empleado: " & pIdEmpleado)

            Dim result As String = String.Empty

            If dt.Rows.Count > 0 Then
                Dim strRuta As String = dt.Rows(0)("RutaContratoResumen").ToString()
                'validar existencia de archivo

                If String.IsNullOrEmpty(strRuta) Then
                    result = ""
                ElseIf Not File.Exists(HttpContext.Current.Server.MapPath("~/") + strRuta) Then
                    result = "-1"
                Else
                    result = strRuta
                End If
            Else
                result = ""
            End If

            Return result

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If pedido IsNot Nothing Then
                pedido.Dispose()
            End If
        End Try

    End Function

End Class