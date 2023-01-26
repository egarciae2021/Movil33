Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios

Partial Class P_Movil_Administrar_Mantenimiento_Imp_Mnt_Servicio
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim IMP_Servicio As BL_MOV_IMP_Servicio = Nothing
        Dim Servicio As BL_GEN_Servicio = Nothing
        Dim Llamada As BL_MOV_IMP_Llamada = Nothing

        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Servicio = New BL_GEN_Servicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                    Dim inCodSerImp As String = Request.QueryString("Cod")

                    UtilitarioWeb.Dataddl(ddlTipoLlamada, Llamada.ListarTipoLlamada(), "vcNom", "P_inCod")
                    UtilitarioWeb.Dataddl(ddlServicio, Servicio.Listar(-1, "<Seleccione servicio>"), "vcNom", "P_inCod")
                    If Not IsNothing(inCodSerImp) Then

                        IMP_Servicio = New BL_MOV_IMP_Servicio(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        Dim oIMP_Servicio As New ENT_MOV_IMP_Servicio

                        oIMP_Servicio.P_inCodSerImp = Convert.ToInt32(inCodSerImp)

                        oIMP_Servicio = IMP_Servicio.Mostrar(oIMP_Servicio)

                        txtDescripcion.Text = oIMP_Servicio.vcNomSerArc
                        ddlTipoLlamada.SelectedValue = oIMP_Servicio.TipoLlamada.P_inCod
                        ddlServicio.SelectedValue = oIMP_Servicio.Servicio.P_inCod
                        chkExtraeCero.Checked = oIMP_Servicio.btExtCer
                        chkNotificar.Checked = oIMP_Servicio.btNot
                        chkEstado.Checked = oIMP_Servicio.btVig
                        If chkEstado.Checked Then
                            trEstado.Style("display") = "none"
                        End If

                        hdfCod.Value = oIMP_Servicio.P_inCodSerImp.ToString()
                    Else
                        trEstado.Style("display") = "none"
                        hdfCod.Value = ""
                    End If
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If IMP_Servicio IsNot Nothing Then
                IMP_Servicio.Dispose()
            End If
            If Servicio IsNot Nothing Then
                Servicio.Dispose()
            End If
            If Llamada IsNot Nothing Then
                Llamada.Dispose()
            End If
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(ByVal vcDes As String, ByVal inTipLla As String, ByVal inCodSer As String, ByVal btExtCer As String, ByVal inCodSerImp As String, ByVal btVig As String, ByVal btNot As String) As String
        Dim IMP_Servicio As BL_MOV_IMP_Servicio = Nothing

        Try
            IMP_Servicio = New BL_MOV_IMP_Servicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oIMP_Servicio As New ENT_MOV_IMP_Servicio

            oIMP_Servicio.vcNomSerArc = vcDes.Replace("&#39", "'")
            oIMP_Servicio.Servicio.P_inCod = Integer.Parse(inCodSer)
            oIMP_Servicio.TipoLlamada.P_inCod = Integer.Parse(inTipLla)
            oIMP_Servicio.btExtCer = Convert.ToBoolean(btExtCer)
            oIMP_Servicio.btVig = Convert.ToBoolean(btVig)
            oIMP_Servicio.btNot = Convert.ToBoolean(btNot)

            If inCodSerImp = "" Then
                Return IMP_Servicio.Insertar(oIMP_Servicio)
            Else
                oIMP_Servicio.P_inCodSerImp = Convert.ToInt32(inCodSerImp)
                Return IMP_Servicio.Actualizar(oIMP_Servicio)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If IMP_Servicio IsNot Nothing Then
                IMP_Servicio.Dispose()
            End If
        End Try
    End Function
End Class
