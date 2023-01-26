<%@ Application Language="VB" %>
<%@ Import Namespace="VisualSoft.Comun.Utilitarios" %>
<%@ Import Namespace="System" %> 
<%@ Import Namespace="System.Configuration" %> 
<%@ Import Namespace="System.Threading" %>
<%@ Import Namespace="System.Globalization" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Web.Routing" %>
<script RunAt="server">
    
    Sub Application_Start(ByVal sender As Object, ByVal e As EventArgs)
        ' Code that runs on application startup
        RegisterRoutes(RouteTable.Routes)
        log4net.Config.XmlConfigurator.Configure(New FileInfo(Server.MapPath("~/web.config")))
    End Sub
    
    Sub Application_End(ByVal sender As Object, ByVal e As EventArgs)
        ' Code that runs on application shutdown
    End Sub
        
    Sub Application_Error(ByVal sender As Object, ByVal e As EventArgs)
        ' Code that runs when an unhandled error occurs
        'No es necesario llamarlo, ya que si se descomenta se duplicaria porque existe try en cada metodo.
        ''Try
        ''    Dim ex As Exception = Server.GetLastError()
        ''    Dim util As New Utilitarios
        ''    util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
        ''Catch ex As Exception
        ''End Try
        
    End Sub

    Sub Session_Start(ByVal sender As Object, ByVal e As EventArgs)
        ' Code that runs when a new session is started
        
        
        
    End Sub

    Sub Session_End(ByVal sender As Object, ByVal e As EventArgs)
        ' Code that runs when a session ends. 
        ' Note: The Session_End event is raised only when the sessionstate mode
        ' is set to InProc in the Web.config file. If session mode is set to StateServer 
        ' or SQLServer, the event is not raised.
    End Sub
    
    Sub RegisterRoutes(Routes As RouteCollection)
        'Para ASP.NET 4.0
        Routes.Ignore("{resource}.axd/{*pathInfo}")

        Dim r As New Route("{id}/{mode}", Nothing)
        Routes.Add(r)
    End Sub
       
    Protected Sub Application_BeginRequest(sender As Object, e As System.EventArgs)

        
        Try
            
            Dim newCulture As CultureInfo = DirectCast(System.Threading.Thread.CurrentThread.CurrentCulture.Clone(), CultureInfo)
            newCulture.DateTimeFormat.ShortDatePattern = "dd/MM/yyyy"
            newCulture.DateTimeFormat.DateSeparator = "/"
            Thread.CurrentThread.CurrentCulture = newCulture
            
            'This value is in bytes.   
            Dim iMaxFileSize As Integer = Convert.ToDouble("0" + ConfigurationManager.AppSettings("Adjuntar_TamanoMaximoMB").ToString())
            If Request.ContentLength > iMaxFileSize * 1024 * 1024 Then
                Response.Clear()
                Response.Redirect("~/ErrorUpload.aspx?size1=" + (Request.ContentLength / 1024 / 1024).ToString("N2"))
            End If
            
            

        Catch ex As Exception

        End Try
        
    End Sub
    
    
</script>
