Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios

Partial Class P_Movil_Administrar_Mantenimiento_Imp_Mnt_Destino
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Destino As BL_MOV_IMP_Destino = Nothing
        Dim Servicio As BL_GEN_Servicio = Nothing
        Dim IMP_Destino As BL_MOV_IMP_Destino = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Destino = New BL_MOV_IMP_Destino(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Servicio = New BL_GEN_Servicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim inCodDes As String = Request.QueryString("Cod")

                    UtilitarioWeb.Dataddl(ddlGlobalAsignado, Servicio.ListarGlobal("-1", "<Seleccione global>"), "vcNom", "vcNom")
                    If Not IsNothing(inCodDes) Then
                        IMP_Destino = New BL_MOV_IMP_Destino(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        Dim oIMP_Destino As New ENT_MOV_IMP_Destino

                        oIMP_Destino.P_inCodDes = inCodDes
                        oIMP_Destino = IMP_Destino.Mostrar(oIMP_Destino)
                        txtTipoLlamada.Text = oIMP_Destino.vcTipLla
                        ddlGlobalAsignado.SelectedValue = oIMP_Destino.vcGloAsig
                        chkEstado.Checked = oIMP_Destino.btVig

                        If oIMP_Destino.btVig Then
                            trEstado.Style("display") = "none"
                        End If

                        hdfDestino.Value = inCodDes
                    Else
                        trEstado.Style("display") = "none"
                        hdfDestino.Value = ""
                    End If

                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Destino IsNot Nothing Then Destino.Dispose()
            If Servicio IsNot Nothing Then Servicio.Dispose()
            If IMP_Destino IsNot Nothing Then IMP_Destino.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(ByVal vcTipLla As String, ByVal vcGlo As String, ByVal btVig As String, ByVal inDes As String) As String
        Dim IMP_Destino As BL_MOV_IMP_Destino = Nothing
        Try
            IMP_Destino = New BL_MOV_IMP_Destino(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oIMP_Destino As New ENT_MOV_IMP_Destino

            oIMP_Destino.vcTipLla = vcTipLla.Replace("&#39", "'")
            oIMP_Destino.vcGloAsig = vcGlo
            oIMP_Destino.btVig = Convert.ToBoolean(btVig)

            If inDes = "" Then
                Return IMP_Destino.Insertar(oIMP_Destino)
            Else
                oIMP_Destino.P_inCodDes = Integer.Parse(inDes)
                Return IMP_Destino.Actualizar(oIMP_Destino)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If IMP_Destino IsNot Nothing Then IMP_Destino.Dispose()
        End Try
    End Function
End Class