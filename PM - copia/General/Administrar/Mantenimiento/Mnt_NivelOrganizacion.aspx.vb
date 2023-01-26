Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports System.Data
Imports System.IO
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class General_Administrar_Mantenimiento_Mnt_NivelOrganizacion
   Inherits System.Web.UI.Page

   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
      If IsNothing(Session("Usuario")) Then
            'Dim script As String = "window.parent.location.reload()"
            Dim script As String = "window.top.location.reload();"
         Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
      Else
         Dim codigo As String = Request.QueryString("Cod")
         hdfEstado.Value = codigo
         UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

         If Not IsNothing(codigo) Then
            If Not Page.IsPostBack Then
               Dim nivelOrganizacion As BL_GEN_NivelOrganizacion = New BL_GEN_NivelOrganizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
               Dim oNivelOrganizacion As List(Of ENT_GEN_Nivel) = nivelOrganizacion.Listar(codigo)
               nivelOrganizacion.Dispose()
               txtNombre.Text = oNivelOrganizacion(0).vcNomNiv.ToString().Replace("&#39", "'")
               'Dim icono As String = oNivelOrganizacion(0).vcIcoNiv.ToString()
               hdfCodigo.Value = oNivelOrganizacion(0).P_inCodNiv.ToString()

               Session("ImagenActual") = oNivelOrganizacion(0).imIcoNiv
               'Session("ImagenActual") = Nothing 'borrar session
               'Session.Contents.Remove("ImagenActual") 'borra session

               'If oNivelOrganizacion(0).imIcoNiv Is Nothing Then
               '    flUpload.Visible = True
               '    btnsubir.Visible = True
               '    btneliminar.Visible = False
               '    imgIcono.ImageUrl = "~/Images/Temporal\M_NIVE_" + oNivelOrganizacion(0).P_inCodNiv.ToString() & ".ico"
               'Else
               '    oNivelOrganizacion(0).vcUrlIcoNiv = "~/Images/Temporal\M_NIVE_" + oNivelOrganizacion(0).P_inCodNiv.ToString() & ".ico"
               '    'oNivelOrganizacion(0).vcUrlIcoNiv = "~/Images\" & oNivelOrganizacion(0).P_inCodNiv & ".ico"


               '    Try
               '        Dim strfn As String = Server.MapPath(oNivelOrganizacion(0).vcUrlIcoNiv)
               '        Dim fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write)
               '        fs.Write(oNivelOrganizacion(0).imIcoNiv, 0, oNivelOrganizacion(0).imIcoNiv.Length)
               '        fs.Flush()
               '        fs.Close()

               '    Catch ex As Exception
               '        Dim util As New Utilitarios
               '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
               '        Throw New Exception(UtilitarioWeb.MensajeError)
               '    End Try


               '    imgIcono.Visible = True
               '    imgIcono.ImageUrl = oNivelOrganizacion(0).vcUrlIcoNiv
               '    hdfArchivo.Value = "M_NIVE_" & oNivelOrganizacion(0).P_inCodNiv.ToString() & ".ico"
               '    Session("imagenCargada") = oNivelOrganizacion(0).imIcoNiv
               '    btnsubir.Visible = False
               '    btneliminar.Visible = True
               'End If



            End If

            'If Not Page.IsPostBack Then
            'Modificado por Mauricio Benavides 10/07/2013
            'If oNivelOrganizacion(0).btEst Then
            '    chActivo.Checked = True
            '    hdfEstadoNiv.Value = 1
            'Else
            '    chActivo.Checked = False
            '    hdfEstadoNiv.Value = 0
            'End If
            'End If
            hdfLoad.Value = "Carga"
         Else
            hdfLoad.Value = "Nuevo"
            'flUpload.Visible = True
            'chActivo.Checked = True
            'hdfEstadoNiv.Value = 1
         End If

      End If
   End Sub

   <WebMethod()>
   Public Shared Function Guardar(ByVal Codigo As String, ByVal Nombre As String, ByVal Archivo As String, ByVal inCodEst As String, ByVal estado As String) As String
      Try
         Dim oNivelOrganizacion As New ENT_GEN_Nivel
         Dim NivelOrganizacion As BL_GEN_NivelOrganizacion = New BL_GEN_NivelOrganizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim estadoNiv As Boolean

         estadoNiv = False
         'If estado = 1 Then
         '    estadoNiv = True
         'End If

         oNivelOrganizacion.vcNomNiv = Nombre
         oNivelOrganizacion.P_inCodNiv = Codigo
         oNivelOrganizacion.imIcoNiv = CType(HttpContext.Current.Session("imagenCargada"), Byte())
         HttpContext.Current.Session("imagenCargada") = Nothing
         'oNivelOrganizacion.F_inCodCli = 0
         'oNivelOrganizacion.btEst = estadoNiv

         If inCodEst = "" Then
            If Not NivelOrganizacion.Insertar(oNivelOrganizacion) Then

               Return "Solo se pueden ingresar 80 Niveles"
            Else
               Return ""
            End If

         Else
            oNivelOrganizacion.P_inCodNiv = Codigo
            NivelOrganizacion.Actualizar(oNivelOrganizacion)
         End If
         NivelOrganizacion.Dispose()
         Return ""
      Catch ex As Exception
         Return ex.Message
      End Try
   End Function

   Protected Sub chActivo_CheckedChanged(ByVal sender As Object, ByVal e As System.EventArgs) Handles chActivo.CheckedChanged
      If Me.chActivo.Checked Then
         hdfEstadoNiv.Value = 1
      Else
         hdfEstadoNiv.Value = 0
      End If
   End Sub
End Class
