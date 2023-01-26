Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.CuentaCobro.BL
Imports VisualSoft.Comun.CuentaCobro.BE
Imports VisualSoft.Comun.ImportacionExportacion.Utilitario

Public Class Imp_VisorTareaFacturacion
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        'Dim IMP_Cola As BL_MOV_IMP_Cola = Nothing
        'Dim Operador As BL_GEN_Operador = Nothing
        'Dim IMP_Estado As BL_MOV_IMP_Estado = Nothing
        Dim EstadoServicio As BL_MOV_FAC_EstadoServicio = Nothing
        Dim TipoConfiguracion As BL_MOV_FAC_TipoConfiguracion = Nothing

        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    'IMP_Cola = New BL_MOV_IMP_Cola(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    'Operador = New BL_GEN_Operador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    'IMP_Estado = New BL_MOV_IMP_Estado(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    ''Dim oIMP_Cola As New ENT_MOV_IMP_Cola

                    'UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar("-1", "<Todos>"), "vcNomOpe", "P_inCodOpe")
                    'UtilitarioWeb.Dataddl(ddlEstado, IMP_Estado.Listar("0", "Pendientes y en proceso"), "vcNomEst", "P_inCodEst")
                    'UtilitarioWeb.Dataddl(ddlTarea, IMP_Cola.ListarTipoTarea("-1", "<Todos>"), "vcTar", "inTar")

                    Dim vcTab As String = Request.QueryString("vcTab")
                    Dim inCod As Integer = Integer.Parse(Request.QueryString("inCod"))
                    Dim inTipOri As Integer = Integer.Parse(Request.QueryString("inTipOri"))
                    Dim inTip As Integer = Val("" & Request.QueryString("inTip"))
                    EstadoServicio = New BL_MOV_FAC_EstadoServicio(Integer.Parse(inTipOri), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    UtilitarioWeb.Dataddl(ddlEstado1, EstadoServicio.Listar("0", "Pendientes y en proceso"), "vcNom", "P_inCod")
                    TipoConfiguracion = New BL_MOV_FAC_TipoConfiguracion(Integer.Parse(inTipOri), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    UtilitarioWeb.Dataddl(ddlTarea1, TipoConfiguracion.ListarTipoTarea("-1", "<Todos>"), "Nombre", "IdTipoConfiguracion")
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            'If IMP_Cola IsNot Nothing Then IMP_Cola.Dispose()
            'If Operador IsNot Nothing Then Operador.Dispose()
            'If IMP_Estado IsNot Nothing Then IMP_Estado.Dispose()
            If EstadoServicio IsNot Nothing Then EstadoServicio.Dispose()
            If TipoConfiguracion IsNot Nothing Then TipoConfiguracion.Dispose()
        End Try
    End Sub


    <WebMethod()>
    Public Shared Function MostrarTareas1(ByVal inEst As String, ByVal inTar As String) As List(Of ENT_MOV_FAC_Cola)

        Dim MOV_FAC_Cola As BL_MOV_FAC_Cola = Nothing
        Try
            Dim IdCliente As Integer = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente
            MOV_FAC_Cola = New BL_MOV_FAC_Cola(Integer.Parse(1), IdCliente)
            Dim oCola As New ENT_MOV_FAC_Cola
            oCola.IdCliente = IdCliente
            oCola.InTipoConfiguracion = Integer.Parse(inTar)
            oCola.IdEstado = Integer.Parse(inEst)
            Return MOV_FAC_Cola.Listar_VisorCola(oCola)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If MOV_FAC_Cola IsNot Nothing Then MOV_FAC_Cola.Dispose()
        End Try
    End Function
    <WebMethod()>
    Public Shared Function MostrarDetalleTarea(ByVal IdCola As String) As List(Of ENT_MOV_FAC_LogFacturacion)
        Dim IMP_Cola As BL_MOV_FAC_LogFacturacion = Nothing
        Try
            IMP_Cola = New BL_MOV_FAC_LogFacturacion(1, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return IMP_Cola.Listar_LogColaFacturacion(Integer.Parse(IdCola))
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If IMP_Cola IsNot Nothing Then IMP_Cola.Dispose()
        End Try
    End Function

End Class
