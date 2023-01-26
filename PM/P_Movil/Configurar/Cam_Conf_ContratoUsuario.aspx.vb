Imports System.Web.Services
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BL
Imports System.Web.Script.Serialization
Imports System.IO
Imports VisualSoft.PCSistelMovil.Campana.BE

Partial Class P_Movil_Configurar_CAM_Conf_ContratoUsuario
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim SubContrato As BL_MOV_CAM_SubContrato = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim IdCampana As String = Request.QueryString("IdCampana")
                    SubContrato = New BL_MOV_CAM_SubContrato(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim oSubContrato As New MOV_CAM_SubContrato
                    hdfIdCampana.Value = IdCampana

                    If IdCampana = "" Or IdCampana = "-1" Then
                        oSubContrato = SubContrato.Mostrar(0)
                    Else
                        oSubContrato = SubContrato.MostrarPorCampana(Convert.ToInt32(IdCampana))
                    End If

                    If oSubContrato.IdSubContrato <> 0 Then
                        hdfIdSubContrato.Value = oSubContrato.IdSubContrato
                    End If
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If SubContrato IsNot Nothing Then
                SubContrato.Dispose()
            End If
        End Try

    End Sub

    <WebMethod()>
    Public Shared Function Mostrar(ByVal p_IdSubContrato As String) As MOV_CAM_SubContrato
        Dim SubContrato As BL_MOV_CAM_SubContrato = Nothing
        Try
            SubContrato = New BL_MOV_CAM_SubContrato(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oSubContrato As MOV_CAM_SubContrato = SubContrato.Mostrar(Integer.Parse(p_IdSubContrato))
            Dim ubicc As String = "../../" & oSubContrato.RutaSubContrato
            Dim strfn As String = HttpContext.Current.Server.MapPath(ubicc)
            If oSubContrato.RutaSubContrato <> "" And Not File.Exists(strfn) Then
                oSubContrato.RutaSubContrato = "NoEncontrado"
            End If
            Return oSubContrato
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If SubContrato IsNot Nothing Then
                SubContrato.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Guardar(ByVal p_oSubContrato As String) As Integer
        Dim SubContrato As BL_MOV_CAM_SubContrato = Nothing
        Try
            SubContrato = New BL_MOV_CAM_SubContrato(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oSerializer As New JavaScriptSerializer
            Dim oSubContrato As MOV_CAM_SubContrato = oSerializer.Deserialize(Of MOV_CAM_SubContrato)(p_oSubContrato)

            Dim _return As Integer = SubContrato.Guardar(oSubContrato)
            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If SubContrato IsNot Nothing Then
                SubContrato.Dispose()
            End If
        End Try
    End Function

End Class
