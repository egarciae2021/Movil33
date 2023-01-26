Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports System.Data
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios

Partial Class P_Movil_Administrar_Mantenimiento_Mnt_Estado
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim P_inCod As String = Request.QueryString("Cod")
                    hdfEstado.Value = P_inCod
                    UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

                    If Not IsNothing(P_inCod) Then
                        Dim Estado As BL_MOV_Estado = new BL_MOV_Estado(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        Dim oEstado As DataTable = Estado.Mostrar(Integer.Parse(P_inCod))
                  Estado.Dispose()
                        txtNombre.Text = oEstado(0)("vcNom").ToString()
                        chkDefecto.Checked = Boolean.Parse(oEstado(0)("btDef").ToString)
                        chkEstado.Checked = Boolean.Parse(oEstado(0)("btVig").ToString)
                        If chkEstado.Checked Then
                            trEstado.Style("display") = "none"
                        End If
                    Else
                        hdfEstado.Value = ""
                        trEstado.Style("display") = "none"
                    End If
                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(ByVal Valores As String, ByVal inCodEst As String, ByVal btVig As String) As String
        Try
            Dim Estado As BL_MOV_Estado = new BL_MOV_Estado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            If inCodEst = "" Then
                Dim Parametros As String = "vcNom" & "," & "btDef"
                Estado.Insertar(Parametros, Valores)
            Else
                Dim Parametros As String = "P_inCod" & "," & "vcNom" & "," & "btDef" & "," & "btVig"
                Valores = inCodEst.ToString & "," & Valores & "," & btVig
                Estado.Actualizar(Parametros, Valores)
         End If
         Estado.Dispose()
            Return ""
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function
End Class