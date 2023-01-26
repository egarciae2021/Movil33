Imports System.Data
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios

Partial Class P_Movil_Administrar_Mantenimiento_Mnt_ConceptoMovil
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim P_inCodMov As String = Request.QueryString("Cod")
                    hdfConceptoMovil.Value = P_inCodMov
                    UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

                    If Not IsNothing(P_inCodMov) Then
                        Dim ConceptoMovil As BL_MOV_ConceptoMovil = new BL_MOV_ConceptoMovil(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                  Dim oConceptoMovil As DataTable = ConceptoMovil.Mostrar(P_inCodMov)
                  ConceptoMovil.Dispose()
                        txtNombre.Text = oConceptoMovil(0)("vcNom").ToString()
                        txtMonto.Text = oConceptoMovil(0)("dcMon").ToString()
                        chkEstado.Checked = Convert.ToBoolean(oConceptoMovil(0)("btVig"))
                        If chkEstado.Checked Then
                            trEstado.Style("display") = "none"
                        End If
                    Else
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
    Public Shared Function Guardar(ByVal inCod As String, ByVal Valores As String, ByVal btVig As String) As String
        Try
            Dim ConceptoMovil As BL_MOV_ConceptoMovil = new BL_MOV_ConceptoMovil(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            If inCod = "" Then
                Dim Parametros As String = "vcNom" & "," & "dcMon"
                ConceptoMovil.Insertar(Parametros, Valores)
            Else
                Dim Parametros As String = "P_inCod" & "," & "vcNom" & "," & "dcMon" & "," & "btVig"
                Valores = inCod & "," & Valores & "," & btVig
                ConceptoMovil.Actualizar(Parametros, Valores)
         End If
         ConceptoMovil.Dispose()
            Return ""
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function
End Class