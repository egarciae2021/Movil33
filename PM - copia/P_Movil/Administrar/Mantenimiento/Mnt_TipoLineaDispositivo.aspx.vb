Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports System.Data
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Services
Imports System.Web.Script.Serialization

Partial Class P_Movil_Administrar_Mantenimiento_Mnt_TipoLineaDispositivo
    Inherits System.Web.UI.Page
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim TipoLineaDispositivo As BL_MOV_TipoLineaDispositivo = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim P_inCod As String = Request.QueryString("Cod")
                    hdfTipo.Value = P_inCod
                    UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

                    If Not IsNothing(P_inCod) Then
                        TipoLineaDispositivo = New BL_MOV_TipoLineaDispositivo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        Dim oTipoLineaDispositivo As ENT_MOV_TipoLineaDispositivo = TipoLineaDispositivo.Mostrar(Convert.ToInt32(P_inCod))

                        txtNombre.Text = oTipoLineaDispositivo.vcDes
                        chkEstado.Checked = oTipoLineaDispositivo.btVig
                        If oTipoLineaDispositivo.btVig Then
                            trEstado.Style("display") = "none"
                        End If
                    Else
                        hdfTipo.Value = "-1"
                        trEstado.Style("display") = "none"
                    End If
                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If TipoLineaDispositivo IsNot Nothing Then TipoLineaDispositivo.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(ByVal p_oTipoLineaDispositivo As String) As String
        Dim TipoLineaDispositivo As BL_MOV_TipoLineaDispositivo = Nothing
        Try
            Dim oSerializer As New JavaScriptSerializer
            Dim oTipoLineaDispositivo As ENT_MOV_TipoLineaDispositivo = oSerializer.Deserialize(Of ENT_MOV_TipoLineaDispositivo)(p_oTipoLineaDispositivo)

            TipoLineaDispositivo = New BL_MOV_TipoLineaDispositivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            If oTipoLineaDispositivo.P_inCod = -1 Then
                TipoLineaDispositivo.Insertar(oTipoLineaDispositivo)
            Else
                TipoLineaDispositivo.Actualizar(oTipoLineaDispositivo)
            End If
            Return ""
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If TipoLineaDispositivo IsNot Nothing Then TipoLineaDispositivo.Dispose()
        End Try
    End Function
End Class
