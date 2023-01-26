Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization

Partial Class P_Configuracion_General_MisDatos_Clave
    Inherits System.Web.UI.Page

    ' =======================================================================================================================================
    ' LOAD
    ' =======================================================================================================================================
    Protected Sub P_Configuracion_General_MisDatos_Load(sender As Object, e As System.EventArgs) Handles Me.Load

        Dim DASH_Dashboard As BL_DASH_Dashboard = Nothing
        Dim oBL_SEG_Usuario As BL_SEG_Usuario = Nothing

        If IsNothing(Session("Usuario")) Then
            'Dim script As String = "window.parent.location.reload()"
            Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
        Else
            Try

                infoLinea.Mensaje = "Debe considerar : " +
                                    "como mínimo 6 dígitos, " +
                                    "estar compuesta por números y letras, " +
                                    "que no contenga el nombre del usuario y " +
                                    "que sea diferente a las 3 últimas registradas."

                If Not IsPostBack Then


                    Dim P_inCod As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod

                    'oBL_SEG_Usuario = New BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim objEntidad As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario) 'oBL_SEG_Usuario.Mostrar(P_inCod)


                    'imgUsuario.ImageUrl = Page.ResolveClientUrl("~/Common/Controladores/ImagenDinamica.ashx?Tipo=Usuario&IdUsuario=" & objEntidad.P_inCod) 'modificado 23-09-2013 wapumayta

                    ' txtvcNom.Text = objEntidad.vcNom
                    txtvcUsu.Text = objEntidad.vcUsu

                    txtvcPas.Text = objEntidad.vcPas
                    txtvcPasCon.Text = objEntidad.vcPas

                    txtvcPas.Attributes("Value") = txtvcPas.Text
                    txtvcPasCon.Attributes("Value") = txtvcPas.Text

                    lblmensaje.Text = objEntidad.vcMotivo

                    hdfEsClaveSegura.Value = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).EsClaveSegura


                End If

                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

            Catch ex As Exception
                Throw ex
            Finally
                If DASH_Dashboard IsNot Nothing Then DASH_Dashboard.Dispose()
                If oBL_SEG_Usuario IsNot Nothing Then oBL_SEG_Usuario.Dispose()
            End Try
        End If
    End Sub
    ' ==============================================================================================================
    ' MODULO DE SEGURIDAD
    ' ==============================================================================================================
    <WebMethod()>
    Public Shared Function Guardar_Clave(ByVal vcPas As String) As String

        ' =========================================================================================================================================
        Dim Usuario As BL_SEG_Usuario = Nothing
        Dim dash As BL_DASH_Dashboard = Nothing
        ' =========================================================================================================================================
        Try

            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            ' =========================================================================================================================================

            Usuario = New BL_SEG_Usuario(oUsuario.IdCliente)

            ' =========================================================================================================================================

            oUsuario.vcPas = vcPas

            ' =========================================================================================================================================
            Return Usuario.Grabar(oUsuario)
            ' =========================================================================================================================================


        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Usuario IsNot Nothing Then Usuario.Dispose()
            If dash IsNot Nothing Then dash.Dispose()
        End Try
    End Function
    ' =========================================================================================================================================
    ' =========================================================================================================================================

End Class
