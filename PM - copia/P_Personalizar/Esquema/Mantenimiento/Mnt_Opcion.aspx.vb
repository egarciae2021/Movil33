Imports System.Web.Script.Serialization
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios

Partial Class P_Movil_Administrar_Mantenimiento_Mnt_Opcion
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim inCodOpcion As String = Request.QueryString("Cod")
                    hdfOpcion.Value = inCodOpcion


                    'Cargar Tipo Origen...
                    ddlTipoOrigen.Items.Clear()
                    ddlTipoOrigen.Items.Add(New ListItem("<Ninguno>", "99"))
                    ddlTipoOrigen.Items.Add(New ListItem("Base", "0"))
                    ddlTipoOrigen.Items.Add(New ListItem("Datos", "1"))
                    ddlTipoOrigen.SelectedIndex = 0

                    ddlTipoOrigenItem.Items.Clear()
                    ddlTipoOrigenItem.Items.Add(New ListItem("<Ninguno>", "99"))
                    ddlTipoOrigenItem.Items.Add(New ListItem("Base", "0"))
                    ddlTipoOrigenItem.Items.Add(New ListItem("Datos", "1"))
                    ddlTipoOrigenItem.SelectedIndex = 0

                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()> _
    Public Shared Function ListarTablas(ByVal TipoOrigen As String) As List(Of ENT_ENT_Entidad)

        If TipoOrigen Is Nothing OrElse TipoOrigen.Trim = "99" Then
            Dim objLista As New List(Of ENT_ENT_Entidad)
            Dim eEntidad As New ENT_ENT_Entidad
            eEntidad.vcTab = ""
            eEntidad.P_inCod = 0
            objLista.Add(eEntidad)
            Return New List(Of ENT_ENT_Entidad)
            Exit Function
        End If

        Dim objBL As BL_ENT_Entidad = New BL_ENT_Entidad(CType(TipoOrigen, Integer), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim _return As List(Of ENT_ENT_Entidad) = objBL.Listar()

        objBL.Dispose()

        Return _return

    End Function

    <WebMethod()>
    Public Shared Function Mostrar(ByVal inCodOpcion As String) As ENT_PRO_Opcion
        Try
            Dim Opcion As BL_PRO_Opcion = New BL_PRO_Opcion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim objOpcion As ENT_PRO_Opcion = Opcion.Mostrar(Convert.ToInt32(inCodOpcion))
            Opcion.Dispose()

            Return objOpcion
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function
End Class
