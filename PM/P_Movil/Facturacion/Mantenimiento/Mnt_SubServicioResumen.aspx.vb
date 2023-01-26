Imports System.Web.Services
Imports System.Web.Script.Serialization
Imports VisualSoft.PCSistelMovil.Movil.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios

Public Class Mnt_SubServicioResumen
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim SubConceptoResumen As BL_PCS_MOV_SubConceptoResumen = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim vcCodSubConcep As String = Request.QueryString("Cod")

                    If vcCodSubConcep IsNot Nothing Then
                        vcCodSubConcep = vcCodSubConcep.Replace(",", "").Replace(".", "")

                        SubConceptoResumen = New BL_PCS_MOV_SubConceptoResumen(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        Dim oSubConceptoResumen As ENT_PCS_MOV_SubConceptoResumen = SubConceptoResumen.Mostrar(Convert.ToInt32(vcCodSubConcep))
                        hdfCodSubConceptoRes.Value = vcCodSubConcep

                        txtCodigo.Text = oSubConceptoResumen.vcCodSubCon
                        txtSubConceptoResumen.Text = oSubConceptoResumen.vcNomSubCon
                        txtConceptoResumen.Text = oSubConceptoResumen.vcNomConceptoResumen
                        hdfCodConcepto.Value = oSubConceptoResumen.F_inCodConceptoResumen

                        chkEstado.Checked = oSubConceptoResumen.btVig
                        If chkEstado.Checked Then
                            trEstado.Style("display") = "none"
                        End If
                    Else
                        hdfCodSubConceptoRes.Value = ""
                        trEstado.Style("display") = "none"
                    End If
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If SubConceptoResumen IsNot Nothing Then SubConceptoResumen.Dispose()
        End Try
    End Sub

    <WebMethod()> _
    Public Shared Function ListarConceptosResumen(ByVal vcCriterio As String, ByVal idCliente As Integer, ByVal activo As Boolean) As List(Of ENT_PCS_MOV_ConceptoResumen)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim ConceptoResumen As BL_PCS_MOV_ConceptoResumen = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            ConceptoResumen = New BL_PCS_MOV_ConceptoResumen(oUsuario.IdCliente)
            'vcCriterio = vcCriterio.Replace("&#39", "''")
            Dim _return As List(Of ENT_PCS_MOV_ConceptoResumen)
            If activo Then
                _return = ConceptoResumen.ListarPorCodigo_o_Nombre_Activos(vcCriterio)
            Else
                _return = ConceptoResumen.ListarPorCodigo_o_Nombre(vcCriterio)
            End If

            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ConceptoResumen IsNot Nothing Then ConceptoResumen.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Guardar(ByVal codigo As String, ByVal oSubConceptoResumen As String) As Integer
        Dim SubConcepto As BL_PCS_MOV_SubConceptoResumen = Nothing
        Try
            SubConcepto = New BL_PCS_MOV_SubConceptoResumen(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oSerializer As New JavaScriptSerializer
            Dim eSubConceptoResumen As ENT_PCS_MOV_SubConceptoResumen = oSerializer.Deserialize(Of ENT_PCS_MOV_SubConceptoResumen)(oSubConceptoResumen)

            Dim resultado As Integer
            If codigo = "" Then
                eSubConceptoResumen.btVig = True
                resultado = SubConcepto.Insertar(eSubConceptoResumen)
            Else
                eSubConceptoResumen.P_inCod = Convert.ToInt32(codigo)
                resultado = SubConcepto.Actualizar(eSubConceptoResumen)
            End If

            Return resultado

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If SubConcepto IsNot Nothing Then SubConcepto.Dispose()
        End Try
    End Function

End Class