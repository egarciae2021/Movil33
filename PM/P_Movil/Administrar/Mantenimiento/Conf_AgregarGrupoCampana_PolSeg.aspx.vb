Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE

Public Class Conf_AgregarGrupoCampana_PolSeg
   Inherits System.Web.UI.Page

   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
      Try
         If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
         Else
            If Not Page.IsPostBack Then
               Dim Grupo As BL_GEN_Grupo = New BL_GEN_Grupo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
               Dim lstGrupo As List(Of ENT_GEN_Grupo)
               lstGrupo = Grupo.ListarGruposCampanaSinPolitica()
               Grupo.Dispose()
               UtilitarioWeb.Dataddl(ddlGrupo, lstGrupo, "vcNom", "P_inCod")

               bpTecnicoResponsable.NombreEntidad = "Grupo Empleado"
               bpTecnicoResponsable.vcTab = "M_GRUP_ORIG"
                    bpTecnicoResponsable.TipoOrigen = 0
                    bpTecnicoResponsable.Condicion = "GROR_btEst = 1 And GROR_inTipLIN = 2"
               bpTecnicoResponsable.FuncionPersonalizada = "fnMostrarDatos"
               bpTecnicoResponsable.RutaRaiz = "../../../"
               bpTecnicoResponsable.Contenedor = "dvContenedorTecRes"

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
   Public Shared Function Guardar(ByVal P_inCodGru As String) As String
      Dim Politica As BL_MOV_Politica = Nothing
      Try
         Politica = New BL_MOV_Politica(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim oGrupo As New ENT_GEN_Grupo
         oGrupo.P_inCod = P_inCodGru
         Politica.GuardarPoliticaGrupoCampana(oGrupo)

         Return ""
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Politica IsNot Nothing Then Politica.Dispose()
      End Try
   End Function


End Class