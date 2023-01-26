Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios

Partial Class Common_Page_Adm_BusquedaPrincipal
    Inherits System.Web.UI.Page


    Protected Sub Common_Page_Adm_BusquedaPrincipal_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    'hdfFormatos.Value = Request.QueryString("Formatos")
                    'hdfFormatoTipo.Value = Request.QueryString("FormatoTipo")
                    'hdfAceptavariosArchivos.Value = Request.QueryString("AceptaNArchivos")
                    'hdfTipoCarga.Value = Request.QueryString("TipoCarga") ' 1 subir archivo, 2 exportar excel
                    'Dim vcRutaCarpeta = Request.QueryString("RutaCarpeta")
                    'If (IsNothing(vcRutaCarpeta)) Then
                    ' hdfRutaCarpeta.Value = "Images/Temporal/"
                    'Else
                    '   hdfRutaCarpeta.Value = vcRutaCarpeta
                    'End If
                    Dim NombreEntidad As String = Request.QueryString("NomEnt")
                    Dim NombreTabla As String = Request.QueryString("vcTab")
                    Dim Condicion As String = Request.QueryString("Cond")


                    BusquedaPrincipal1.NombreEntidad = NombreEntidad
                    BusquedaPrincipal1.vcTab = NombreTabla
                    BusquedaPrincipal1.TipoOrigen = 0
                    BusquedaPrincipal1.Condicion = Condicion
                    BusquedaPrincipal1.FuncionPersonalizada = "fnMostrarDatos"
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try

    End Sub
End Class
