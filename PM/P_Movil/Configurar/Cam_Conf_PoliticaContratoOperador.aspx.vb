Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Services
Imports System.Web.Script.Serialization
Imports VisualSoft.PCSistelMovil.Campana.BE

Partial Class P_Movil_Configurar_CAM_Conf_PoliticaContrato
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim Operador As BL_GEN_Operador = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Operador = New BL_GEN_Operador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(-1, "<Seleccionar>"), "vcNomOpe", "P_inCodOpe")
                    hdfCodigoContrato.Value = Request.QueryString("Cod")
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Operador IsNot Nothing Then
                Operador.Dispose()
            End If
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Mostrar(ByVal p_IdContratoConfiguracion As String) As MOV_CAM_Contrato
        Dim Contrato As BL_MOV_CAM_Contrato = Nothing
        Try
            Contrato = New BL_MOV_CAM_Contrato(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Return Contrato.Mostrar(Integer.Parse(p_IdContratoConfiguracion))
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Contrato IsNot Nothing Then
                Contrato.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Guardar(ByVal p_oContratoConfiguracion As String) As Integer
        Dim Contrato As BL_MOV_CAM_Contrato = Nothing

        Try
            Contrato = New BL_MOV_CAM_Contrato(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oSerializer As New JavaScriptSerializer
            Dim oContrato As MOV_CAM_Contrato = oSerializer.Deserialize(Of MOV_CAM_Contrato)(p_oContratoConfiguracion)

            Return Contrato.Guardar(oContrato)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Contrato IsNot Nothing Then
                Contrato.Dispose()
            End If
        End Try
    End Function
End Class
