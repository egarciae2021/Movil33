Imports System.Web.Services
Imports VisualSoft.PCSistelMovil.Movil.BL
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.Comun.Utilitarios
'Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_Administrar_Mantenimiento_Imp_Mnt_PlantillaDetalle
    Inherits System.Web.UI.Page
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Servicio As BL_GEN_Servicio = Nothing

        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim inCodPlanDetalle As String = Request.QueryString("Cod")
                    hdfPlanDetalle.Value = inCodPlanDetalle
                End If

                Servicio = New BL_GEN_Servicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                Dim Lis_Servicio As List(Of ENT_GEN_Servicio) = Servicio.Listar(-1, "<Seleccionar>")


                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)


                Dim lstServicio As List(Of ENT_GEN_Servicio) = Servicio.Listar(-1, "<Seleccionar>")
                UtilitarioWeb.Dataddl(ddlServicioDefecto, lstServicio, "vcNom", "P_inCod")
                UtilitarioWeb.Dataddl(ddlServicioPreDefinido, lstServicio, "vcNom", "P_inCod")
                UtilitarioWeb.Dataddl(ddlServiciosExcluir, lstServicio, "vcNom", "P_inCod")
                UtilitarioWeb.Dataddl(ddlServicioBack, lstServicio, "vcNom", "P_inCod")

                Dim lstCampoServicio As List(Of ENT_CampoServicio) = Servicio.ListarCampoServicio(-1, "<Seleccionar>")
                UtilitarioWeb.Dataddl(ddlCampoServicio, lstCampoServicio, "vcDes", "P_inCod")


                Dim lstServicioPlantila As List(Of ENT_GEN_Servicio) = Servicio.ListarParaPlantilla(-1, "<Seleccionar>")
                UtilitarioWeb.Dataddl(ddlServicioFiltro1, lstServicioPlantila, "vcNom", "P_inCod")
                UtilitarioWeb.Dataddl(ddlServicioFiltro2, lstServicioPlantila, "vcNom", "P_inCod")
                UtilitarioWeb.Dataddl(ddlServicioFiltro3, lstServicioPlantila, "vcNom", "P_inCod")
                UtilitarioWeb.Dataddl(ddlServicioFiltro4, lstServicioPlantila, "vcNom", "P_inCod")
                UtilitarioWeb.Dataddl(ddlServicioFiltro5, lstServicioPlantila, "vcNom", "P_inCod")
                UtilitarioWeb.Dataddl(ddlServicioFiltro6, lstServicioPlantila, "vcNom", "P_inCod")
                UtilitarioWeb.Dataddl(ddlServicioFiltroBack, lstServicioPlantila, "vcNom", "P_inCod")
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Servicio IsNot Nothing Then Servicio.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function ListarConceptoxTipo(ByVal cod As Integer) As List(Of ENT_PCS_MOV_ConceptoResumen)
        Dim bl_ConceptoResumen As BL_PCS_MOV_ConceptoResumen = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            bl_ConceptoResumen = New BL_PCS_MOV_ConceptoResumen(oUsuario.IdCliente)
            Dim lstConceptos As List(Of ENT_PCS_MOV_ConceptoResumen) = bl_ConceptoResumen.ListarConceptoResumenPorTipo(cod)

            Return lstConceptos

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If bl_ConceptoResumen IsNot Nothing Then
                bl_ConceptoResumen.Dispose()
            End If
        End Try
    End Function
End Class
