Imports System.Web.Services
Imports System.Data
Imports VisualSoft.Suite80
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization
Imports VisualSoft.Suite80.DL

Partial Class P_Personalizar_Esquema_Mantenimiento_Mnt_Entidad
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then

                    UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

                    Dim P_inCod As String = Request.QueryString("Cod")
                    ''hdfCodigo.Value = P_inCod

                    'Cargar Tipo Origen...
                    ddlTipoOrigen.Items.Clear()
                    ddlTipoOrigen.Items.Add(New ListItem("<Ninguro>", "99"))
                    ddlTipoOrigen.Items.Add(New ListItem("Base", "0"))
                    ddlTipoOrigen.Items.Add(New ListItem("Datos", "1"))
                    ddlTipoOrigen.SelectedIndex = 0

                    ddlTipoProcedimiento.Items.Clear()
                    ddlTipoProcedimiento.Items.Add(New ListItem("INSERCION", "INSERT"))
                    ddlTipoProcedimiento.Items.Add(New ListItem("ACTUALIZACION", "UPDATE"))
                    ddlTipoProcedimiento.Items.Add(New ListItem("ELIMINACION", "DELETE"))
                    ddlTipoProcedimiento.Items.Add(New ListItem("LISTADO", "SELECT"))
                    ddlTipoProcedimiento.Items.Add(New ListItem("LISTAR UNO", "SELECT1"))
                    ddlTipoProcedimiento.Items.Add(New ListItem("ENTIDAD", "ENTIDAD"))
                    'ddlTipoProcedimiento.Items.Add(New ListItem("ENTIDAD JAVASCRIPT", "ENTIDADJS"))
                    ddlTipoProcedimiento.Items.Add(New ListItem("CODE GRABAR", "GRABAR"))
                    ddlTipoProcedimiento.Items.Add(New ListItem("CODE MOSTRAR UNO", "MOSTRAR"))
                    ddlTipoProcedimiento.Items.Add(New ListItem("CODE ASPX", "CODEASPX"))
                    ddlTipoProcedimiento.Items.Add(New ListItem("CODE BEHIND", "CODEBEHIND"))
                    ddlTipoProcedimiento.Items.Add(New ListItem("CODE JAVASCRIPT", "CODEJS"))
                    'ddlTipoProcedimiento.Items.Add(New ListItem("BUSQUEDA...", "SELECTFIND"))

                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()> _
    Public Shared Function ObtenerStoreProcedure(ByVal Tabla As String, _
                                               ByVal TipoOrigen As String, _
                                               ByVal TipoSP As String) As String

        Dim objBL As BL_ENT_Entidad = New BL_ENT_Entidad(CType(TipoOrigen, Integer), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim _return As String = objBL.ObtenerStoreProcedure(Tabla, TipoSP, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).vcUsu)
        objBL.Dispose()
        Return _return
    End Function

    <WebMethod()> _
    Public Shared Function EjecutarScript(ByVal TipoOrigen As String, _
                                        ByVal oScript As String) As String
        Dim objBL As BL_ENT_Entidad = New BL_ENT_Entidad(CType(TipoOrigen, Integer), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

        Dim oSerializer As New JavaScriptSerializer
        Dim v_oScript As ScriptSP = oSerializer.Deserialize(Of ScriptSP)(oScript)

        v_oScript.Script = v_oScript.Script.Replace(Chr(10), vbCrLf)

        Dim _return As String = objBL.EjecutarScript(v_oScript.Script)

        objBL.Dispose()

        Return _return

    End Function

    <WebMethod()> _
    Public Shared Function ListarTablasReales(ByVal TipoOrigen As String) As List(Of ENT_ENT_Entidad)

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
        Return objBL.ListarReal()

    End Function

    <WebMethod()> _
    Public Shared Function ObtieneEntidad(ByVal Tabla As String, _
                                        ByVal TipoOrigen As String) As ENT_ENT_Entidad

        Dim objBL As BL_ENT_Entidad = New BL_ENT_Entidad(CType(TipoOrigen, Integer), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim _return As ENT_ENT_Entidad = objBL.Mostrar(Tabla, 1) 'revisar
        objBL.Dispose()
        Return _return
    End Function

    <WebMethod()> _
    Public Shared Function ObtieneDatosCampo(ByVal Tabla As String, _
                                           ByVal TipoOrigen As String, _
                                           ByVal Campo As String) As ENT_ENT_Campo
        Dim _return As ENT_ENT_Campo
        Dim objBL As BL_ENT_Campo = New BL_ENT_Campo(CType(TipoOrigen, Integer), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        _return = objBL.ObtieneCampoReal(Tabla, Campo)
        objBL.Dispose()
        Return _return
    End Function

    <WebMethod()> _
    Public Shared Function ListarTablasBase(ByVal Tabla As String, _
                                           ByVal TipoOrigen As String) As List(Of ENT_ENT_Entidad)
        Dim objBL As BL_ENT_Entidad = New BL_ENT_Entidad(CType(TipoOrigen, Integer), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim _return As List(Of ENT_ENT_Entidad) = objBL.ListarTablasBase(Tabla)
        objBL.Dispose()
        Return _return

    End Function

    <WebMethod()> _
    Public Shared Function ListarLlaves(ByVal Tabla As String, _
                                           ByVal TipoOrigen As String) As List(Of ENT_ENT_Campo)
        Dim objBL As BL_ENT_Entidad = New BL_ENT_Entidad(CType(TipoOrigen, Integer), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim _return As List(Of ENT_ENT_Campo) = objBL.ListarLlaves(Tabla)
        objBL.Dispose()
        Return _return
    End Function

    <WebMethod()> _
    Public Shared Function ObtieneCampos(ByVal Tabla As String, _
                                       ByVal TipoOrigen As String) As List(Of ENT_ENT_Campo)
        Dim _return As List(Of ENT_ENT_Campo)
        Dim objBL As BL_ENT_Campo = New BL_ENT_Campo(CType(TipoOrigen, Integer), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        _return = objBL.Listar(Tabla)
        objBL.Dispose()
        Return _return
    End Function

    <WebMethod()> _
    Public Shared Function ListarCamposReal(ByVal Tabla As String, _
                                       ByVal TipoOrigen As String) As List(Of ENT_ENT_Campo)
        Dim _return As List(Of ENT_ENT_Campo)
        Dim objBL As BL_ENT_Campo = New BL_ENT_Campo(CType(TipoOrigen, Integer), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        _return = objBL.ListarReal(Tabla)
        objBL.Dispose()
        Return _return
    End Function

    <WebMethod()> _
    Public Shared Function ListarCamposRealAll(ByVal Tabla As String, _
                                       ByVal TipoOrigen As String) As List(Of ENT_ENT_Campo)
        Dim _return As List(Of ENT_ENT_Campo)
        Dim objBL As BL_ENT_Campo = New BL_ENT_Campo(CType(TipoOrigen, Integer), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        _return = objBL.ListarRealAll(Tabla)
        objBL.Dispose()
        Return _return
    End Function

    <WebMethod()> _
    Public Shared Function ObtenerUltimoOrden(ByVal Tabla As String, _
                                            ByVal TipoOrigen As String) As String
        Dim objBL As BL_ENT_Campo = New BL_ENT_Campo(CType(TipoOrigen, Integer), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim inOrden As Integer = objBL.ObtieneUltimoOrden(Tabla)
        objBL.Dispose()
        If inOrden = 0 Then inOrden = 1
        Return inOrden
    End Function

    <WebMethod()> _
    Public Shared Function ListarTipoDatos(ByVal TipoOrigen As String) As List(Of DALC_ENT_Entidad.ENT_ENT_TipoDato)
        Dim objBL As BL_ENT_Entidad = New BL_ENT_Entidad(CType(TipoOrigen, Integer), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim _return As List(Of DALC_ENT_Entidad.ENT_ENT_TipoDato) = objBL.ListarTipoDato()
        objBL.Dispose()
        Return _return
    End Function

    <WebMethod()>
    Public Shared Function Guardar(ByVal oEntidad As String, _
                                 ByVal TipoOrigen As String) As String
        Try
            Dim objBL As BL_ENT_Entidad = New BL_ENT_Entidad(CType(TipoOrigen, Integer), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As String
            Dim oSerializer As New JavaScriptSerializer
            Dim v_oEntidad As ENT_ENT_Entidad = oSerializer.Deserialize(Of ENT_ENT_Entidad)(oEntidad)

            v_oEntidad.vcDes = v_oEntidad.vcDes.Replace("&#39", "'")
            v_oEntidad.vcURLMan = v_oEntidad.vcURLMan.Replace("\", "/")

            If v_oEntidad.P_inCod < 1 Then
                _return = objBL.Insertar(v_oEntidad)
            Else
                _return = objBL.Actualizar(v_oEntidad)
            End If

            objBL.Dispose()

            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

End Class



Public Class ScriptSP
    Private _script As String
    Public Property Script As String
        Get
            Return _script
        End Get
        Set(ByVal value As String)
            _script = value
        End Set
    End Property
End Class
