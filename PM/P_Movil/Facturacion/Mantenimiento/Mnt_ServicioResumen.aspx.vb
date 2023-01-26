Imports System.Globalization
Imports VisualSoft.PCSistelMovil.Movil.BL
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization
Imports System.Web.Services

Partial Class Mnt_ServicioResumen
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim blConceptoResumen As BL_PCS_MOV_ConceptoResumen = Nothing
        Dim tipoConcep As BL_PCS_MOV_TipoConcepto = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                ttgInfoOrden.Mensaje = "Este campo va a determinar el orden a mostrar en los reportes."
                ttgInfoSumatoria.Mensaje = "Al activar este opción, va a determinar si este concepto será parte de la sumatoria en los reportes."
                ttInfoMinUti.Mensaje = "Al activar esta opción, este concepto hará referencia a los minutos de voz consumidos."

                If Not IsPostBack Then
                    Dim vcCodSer As String = Request.QueryString("Cod")

                    tipoConcep = New BL_PCS_MOV_TipoConcepto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    UtilitarioWeb.Dataddl(ddlTipCon, tipoConcep.Listar(-1, "<< Seleccionar >>"), "VcDes", "P_inCod")

                    If vcCodSer IsNot Nothing Then
                        vcCodSer = vcCodSer.Replace(",", "").Replace(".", "")
                        If IsNumeric(vcCodSer) Then
                            vcCodSer = Int(Val(vcCodSer))
                        End If
                        blConceptoResumen = New BL_PCS_MOV_ConceptoResumen(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        Dim oConceptoResumen As ENT_PCS_MOV_ConceptoResumen = blConceptoResumen.Mostrar(Convert.ToInt32(vcCodSer))
                        hdfCodConcpRes.Value = vcCodSer
                        'hdfCodConcpRes.Value = oConceptoResumen.P_InCodCon
                        txtConceptoResumen.Text = oConceptoResumen.VcNomCon
                        txtGrupoConcepto.Text = oConceptoResumen.VcNomGruConp.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")

                        'hdfCodGruCon.Value = oConceptoResumen.F_InCodConTip

                        txtFechaInicioConceptoResumen.Text = "" & oConceptoResumen.DtFecIni

                        txtNomAbrev.Text = oConceptoResumen.VcNomAbrvSr
                        hdfCodGruCon.Value = oConceptoResumen.P_inCodGruSer
                        txtCodigo.Text = oConceptoResumen.VcCodCon

                        ddlTipCon.SelectedIndex = oConceptoResumen.F_inCodTipConc
                        chkMinUti.Checked = oConceptoResumen.BtMinUt

                        If chkMinUti.Checked Then
                            trBtMinUti.Style("display") = "block"
                        Else
                            trBtMinUti.Style("display") = "none"
                        End If

                        txtTipoConcepto.Text = oConceptoResumen.VcNomTipConc
                        hdfCodTipoConc.Value = oConceptoResumen.F_inCodTipConc

                        txtOrden.Text = oConceptoResumen.InOrden
                        chkSumatoria.Checked = oConceptoResumen.BtCampSum

                        chkEstado.Checked = oConceptoResumen.BtEst

                        If chkEstado.Checked Then
                            trEstado.Style("display") = "none"
                        End If
                    Else
                        hdfCodConcpRes.Value = ""
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
            If blConceptoResumen IsNot Nothing Then
                blConceptoResumen.Dispose()
            End If
            If tipoConcep IsNot Nothing Then
                tipoConcep.Dispose()
            End If
        End Try
    End Sub

    <WebMethod()> _
    Public Shared Function ListarGrupoConcepto(ByVal vcCriterio As String, ByVal idCliente As Integer, ByVal activo As Boolean) As List(Of ENT_PCS_MOV_GrupoConcepto)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim grupoConcp As BL_PCS_MOV_GrupoConcepto = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            grupoConcp = New BL_PCS_MOV_GrupoConcepto(oUsuario.IdCliente)
            'vcCriterio = vcCriterio.Replace("&#39", "''")
            Dim _return As List(Of ENT_PCS_MOV_GrupoConcepto)
            If activo Then
                _return = grupoConcp.ListarPorCodigo_o_Nombre_Activos(vcCriterio)
            Else
                _return = grupoConcp.ListarPorCodigo_o_Nombre(vcCriterio)
            End If
            grupoConcp.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If grupoConcp IsNot Nothing Then
                grupoConcp.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarTipoConcepto(ByVal vcCriterio As String, ByVal idCliente As Integer) As List(Of ENT_PCS_MOV_TipoConcepto)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim tipoConcep As BL_PCS_MOV_TipoConcepto = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            tipoConcep = New BL_PCS_MOV_TipoConcepto(oUsuario.IdCliente)

            Dim _return As List(Of ENT_PCS_MOV_TipoConcepto)

            _return = tipoConcep.ListarPorCodigo_o_Nombre(vcCriterio)

            tipoConcep.Dispose()

            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If tipoConcep IsNot Nothing Then
                tipoConcep.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Listar_TipoConcepto() As List(Of ENT_PCS_MOV_TipoConcepto)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim tipoConcep As BL_PCS_MOV_TipoConcepto = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            tipoConcep = New BL_PCS_MOV_TipoConcepto(oUsuario.IdCliente)

            Dim _return As List(Of ENT_PCS_MOV_TipoConcepto)
            _return = tipoConcep.Listar(-1, "<< Seleccionar >>")

            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If tipoConcep IsNot Nothing Then
                tipoConcep.Dispose()
            End If
        End Try
    End Function


    <WebMethod()>
    Public Shared Function Guardar(ByVal cod As String, ByVal oConceptoResumen As String) As Integer
        Dim bl_PCS_MOV_ConceptoResumen As BL_PCS_MOV_ConceptoResumen = Nothing

        Try
            bl_PCS_MOV_ConceptoResumen = New BL_PCS_MOV_ConceptoResumen(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim oSerializer As New JavaScriptSerializer
            Dim oConRes As ENT_PCS_MOV_ConceptoResumen = oSerializer.Deserialize(Of ENT_PCS_MOV_ConceptoResumen)(oConceptoResumen)

            Dim resultado As Integer
            If cod = "" Then
                oConRes.BtEst = True
                resultado = bl_PCS_MOV_ConceptoResumen.Insertar(oConRes)
            Else
                oConRes.P_InCodCon = Convert.ToInt32(cod)
                resultado = bl_PCS_MOV_ConceptoResumen.Actualizar(oConRes)
            End If

            Return resultado

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(bl_PCS_MOV_ConceptoResumen) Then bl_PCS_MOV_ConceptoResumen.Dispose()
        End Try

    End Function

End Class