Imports VisualSoft.Suite80.BE
Imports System.Data
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios

Partial Class P_Movil_Consultar_Con_ConsultaPrincipal
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    txtFechaCreacionI.Text = Convert.ToDateTime("01" & "/" & Now.Month.ToString & "/" & Now.Year.ToString)
                    txtFechaCreacionF.Text = Now.ToShortDateString

                    hdfAccion.Value = Request.QueryString("inAcc")
                    'JHERRERA 20140807 -- Se usa para validar si se debe mostrar el botón de eliminar
                    hdfIdUsuario.Value = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If


        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function ListarCriterios(ByVal vcNomCri As String, ByVal inTipCon As String, ByVal btOtrUsu As String, ByVal vcNomUsuBus As String, ByVal dtFecIni As String,
                                           ByVal dtFecFin As String) As List(Of ENT_MOV_IMP_Criterio)
        Dim Criterio As BL_MOV_IMP_Criterio = Nothing
        Try
            Criterio = New BL_MOV_IMP_Criterio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oCriterio As New ENT_MOV_IMP_Criterio

            oCriterio.vcNomCri = vcNomCri
            oCriterio.inTipCon = Integer.Parse(inTipCon)
            oCriterio.btCom = Convert.ToBoolean(btOtrUsu)
            oCriterio.Usuario.vcUsu = vcNomUsuBus

            Return Criterio.Listar(oCriterio, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod, dtFecIni, dtFecFin)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Criterio IsNot Nothing Then Criterio.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function EliminarCriterio(ByVal inCodCri As String) As String
        Dim Criterio As BL_MOV_IMP_Criterio = Nothing
        Try
            Criterio = New BL_MOV_IMP_Criterio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Criterio.Eliminar(Convert.ToInt32("0" + inCodCri.Trim()))

            Return ""
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Criterio IsNot Nothing Then Criterio.Dispose()
        End Try
    End Function
End Class
