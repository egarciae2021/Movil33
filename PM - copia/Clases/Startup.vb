Imports Microsoft.Owin
Imports Owin
Imports Microsoft.AspNet.SignalR

<Assembly: OwinStartupAttribute(GetType(PCSistelMovil.Startup))> 
Namespace PCSistelMovil
    Partial Public Class Startup
        Public Sub Configuration(app As IAppBuilder)
            GlobalHost.Configuration.DefaultMessageBufferSize = 32
            app.MapSignalR()
            ''ConfigureAuth(app)
        End Sub
    End Class
End Namespace