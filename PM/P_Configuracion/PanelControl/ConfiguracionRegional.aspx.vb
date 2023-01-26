Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Web.Script.Services
Imports System.Web.Script.Serialization
Imports System.Data
Imports System.Web.Configuration
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Configuracion_PanelControl_ConfiguracionRegional
   Inherits System.Web.UI.Page


   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
      Dim GEN_Cliente As BL_GEN_Cliente = Nothing
      Dim GEN_Cultura As BL_GEN_Cultura = Nothing
      Dim GEN_Region As BL_GEN_Regi = Nothing
      Try
         If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
         Else
            If Not IsPostBack Then
               GEN_Cultura = New BL_GEN_Cultura(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
               GEN_Region = New BL_GEN_Regi(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
               Dim oCultura As ENT_GEN_Cultura = GEN_Cultura.MostrarPorPais(Val(GEN_Region.Listar().REGI_F_vcCODPAI))

               UtilitarioWeb.Dataddl(ddlCultura, GEN_Cultura.ListarTable, "vcCodCul", "P_inCodCul")

               GEN_Cliente = New BL_GEN_Cliente(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
               Dim dtDatosCliente As DataTable = GEN_Cliente.Mostrar(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
               If dtDatosCliente IsNot Nothing AndAlso dtDatosCliente.Rows(0)("inIdCultura") <> 0 Then
                  oCultura = GEN_Cultura.Mostrar(dtDatosCliente.Rows(0)("inIdCultura"))
               Else
                  oCultura = GEN_Cultura.MostrarPorPais(Val(GEN_Region.Listar().REGI_F_vcCODPAI))
               End If


               ddlCultura.SelectedValue = oCultura.P_inCodCul
               ddlFormatoFecha.SelectedValue = oCultura.vcFecCor
               txtNumDec.Text = oCultura.dcNumDec
               txtSimboloDecimal.Text = oCultura.vcSimDec
               txtSimSepMil.Text = oCultura.vcSimSepMil
               hdfCodigo.Value = oCultura.P_inCodCul
               txtIGV.Text = oCultura.dcIGV
            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
         End If
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If GEN_Cliente IsNot Nothing Then GEN_Cliente.Dispose()
         If GEN_Cultura IsNot Nothing Then GEN_Cultura.Dispose()
         If GEN_Region IsNot Nothing Then GEN_Region.Dispose()
      End Try
   End Sub

   <WebMethod()> _
   Public Shared Function ObtenerCultura(ByVal IdCultura As String) As ENT_GEN_Cultura
      Dim GEN_Cultura As BL_GEN_Cultura = New BL_GEN_Cultura(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
      Dim oCultura As ENT_GEN_Cultura = GEN_Cultura.Mostrar(IdCultura)
      GEN_Cultura.Dispose()
      Return oCultura
   End Function

    <WebMethod()> _
    Public Shared Function GrabarCultura(ByVal oEntidad As String) As String
        Try
            Dim valor As String = "entro2"
            Dim objBL As BL_GEN_Cultura = New BL_GEN_Cultura(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            'Dim strEntidad As String = oEntidad.Replace("undefined", """""") 'IE6
            Dim oSerializer As New JavaScriptSerializer
            Dim v_oEntidad As ENT_GEN_Cultura = oSerializer.Deserialize(Of ENT_GEN_Cultura)(oEntidad)
            v_oEntidad.vcSimDec = v_oEntidad.vcSimDec.Replace("&#39", "'")
            v_oEntidad.vcCodCul = v_oEntidad.vcCodCul.Replace("&#39", "'")
            v_oEntidad.vcSimSepMil = v_oEntidad.vcSimSepMil.Replace("&#39", "'")
            v_oEntidad.vcFecCor = v_oEntidad.vcFecCor.Replace("&#39", "'")
            objBL.Grabar(v_oEntidad)

            'Dim configPath As String = ""

            '' Get the Web application configuration object.
            'Dim config As System.Configuration.Configuration = WebConfigurationManager.OpenWebConfiguration("~")
            ''WebConfigurationManager.OpenWebConfiguration(configPath)

            '' Get the section related object.
            'Dim configSection As System.Web.Configuration.GlobalizationSection = CType(config.GetSection("system.web/globalization"), System.Web.Configuration.GlobalizationSection)

            'Dim oldCI As System.Globalization.CultureInfo = New System.Globalization.CultureInfo(v_oEntidad.vcCodCul.ToString())

            'If System.Threading.Thread.CurrentThread.CurrentCulture.ToString() <> oldCI.ToString() Then
            '    System.Threading.Thread.CurrentThread.CurrentCulture = oldCI
            '    System.Threading.Thread.CurrentThread.CurrentUICulture = oldCI
            'End If

            '' Set New Culture property.
            'configSection.Culture = System.Globalization.CultureInfo.CurrentCulture.ToString()

            '' Set UICulture property.
            'configSection.UICulture = System.Globalization.CultureInfo.CurrentUICulture.ToString()

            '' Update if not locked.
            'If Not configSection.SectionInformation.IsLocked Then
            '    config.Save()
            'End If


            objBL.Dispose()

            Return "1" 'CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente.ToString()
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function


    Private Sub ActualizaCulturaConfig(ByVal vcCodCultura As String)
        Try
            ' Set the path of the config file.
            Dim configPath As String = ""

            ' Get the Web application configuration object.
            Dim config As System.Configuration.Configuration = WebConfigurationManager.OpenWebConfiguration("~")
            'WebConfigurationManager.OpenWebConfiguration(configPath)

            ' Get the section related object.
            Dim configSection As System.Web.Configuration.GlobalizationSection = CType(config.GetSection("system.web/globalization"), System.Web.Configuration.GlobalizationSection)

            Dim oldCI As System.Globalization.CultureInfo = New System.Globalization.CultureInfo(vcCodCultura)
            System.Threading.Thread.CurrentThread.CurrentCulture = oldCI
            System.Threading.Thread.CurrentThread.CurrentUICulture = oldCI


            ' Set New Culture property.
            configSection.Culture = System.Globalization.CultureInfo.CurrentCulture.ToString()

            ' Set UICulture property.
            configSection.UICulture = System.Globalization.CultureInfo.CurrentUICulture.ToString()

            ' Update if not locked.
            If Not configSection.SectionInformation.IsLocked Then
                config.Save()
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

End Class
