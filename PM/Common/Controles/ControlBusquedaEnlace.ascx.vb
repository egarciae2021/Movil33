Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports Utilitario
Imports System.Data
Imports System.IO
Imports System.Web.Services
Imports System.Web.Script.Services
Imports VisualSoft.Suite80.BL

Partial Class Common_Controles_ControlBusquedaEnlace
    Inherits System.Web.UI.UserControl

    Shared flagBorrarString As Boolean = True


#Region "Propiedades"


    ''''<summary>
    ''''Control txtValorBusqueda.
    ''''</summary>
    ''''<remarks>
    ''''Campo generado automáticamente.
    ''''Para modificarlo, mueva la declaración del campo del archivo del diseñador al archivo de código subyacente.
    ''''</remarks>
    'Public WithEvents txtValorBusqueda As Global.System.Web.UI.WebControls.TextBox

    Private _Codigo As String = ""
    Private _Descripcion As String = ""
    Private _UrlPagina As String = ""
    Private _UbicacionWindow As String = ""
    Private _TituloDialog As String = ""
    Private _anchoDialogo As Integer = 0
    Private _altoDialogo As Integer = 0
    Private _anchoCaja As Integer = 0
    Private _esClicleabe As Boolean = True

    Public Property AnchoDialogo As Integer
        Get
            Return _anchoDialogo
        End Get
        Set(value As Integer)
            _anchoDialogo = value
        End Set
    End Property
    Public Property AnchoCaja As Integer
        Get
            Return _anchoCaja
        End Get
        Set(value As Integer)
            _anchoCaja = value
        End Set
    End Property
    Public Property AltoDialogo As Integer
        Get
            Return _altoDialogo
        End Get
        Set(value As Integer)
            _altoDialogo = value
        End Set
    End Property

    Public Property Codigo As String
        Get
            Return _Codigo
        End Get
        Set(value As String)
            _Codigo = value
        End Set
    End Property
    Public Property Descripcion As String
        Get
            Return _Descripcion
        End Get
        Set(value As String)
            _Descripcion = value
        End Set
    End Property
    Public Property UrlPagina As String
        Get
            Return _UrlPagina
        End Get
        Set(value As String)
            _UrlPagina = value
        End Set
    End Property
    Public Property UbicacionWindow As String
        Get
            Return _UbicacionWindow
        End Get
        Set(value As String)
            _UbicacionWindow = value
        End Set
    End Property
    Public Property TituloDialog As String
        Get
            Return _TituloDialog
        End Get
        Set(value As String)
            _TituloDialog = value
        End Set
    End Property

    Public Property EsClicleabe As Boolean
        Get
            Return _esClicleabe
        End Get
        Set(value As Boolean)
            _esClicleabe = value
        End Set
    End Property

#End Region

    Protected Sub Common_Controles_BusquedaPrincipal_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Try
            If Not IsPostBack Then

                If _anchoDialogo = 0 Then _anchoDialogo = 800
                If _altoDialogo = 0 Then _altoDialogo = 500
                If _anchoCaja = 0 Then _anchoCaja = 308
                
                Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                
                ConfiguraObjetosJavaScript()

            End If
         UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
         UtilitarioWeb.AgregarScriptJqueryUI(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
        End Try

    End Sub

#Region "Genera Scripts Cliente"

    Private Sub ConfiguraObjetosJavaScript()
        Dim sbScript As New StringBuilder
        sbScript.AppendLine("$(document).ready(function () {")
        sbScript.Append(ObtieneScript_btnBuscar_Click)
        sbScript.AppendLine("});")
        sbScript.Append(ObtieneHtmlControl)
        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey_ConfiguraObjetosJavaScript_" & Me.ClientID, sbScript.ToString, True)
    End Sub

    Private Function ObtieneScript_btnBuscar_Click() As String
        _UbicacionWindow = "window.top.fnObtenerWindowPlantillaTab()"
        Dim sbScript As New StringBuilder
        sbScript.AppendLine("$('#" & Me.ClientID & "_spControl').live('click', function () {")
        If _esClicleabe Then
            sbScript.AppendLine("   var vcCodigo = $('#" & Me.ClientID & "_hdControl').val();")
            sbScript.AppendLine("   var $width = " & AnchoDialogo.ToString() & ";")
            sbScript.AppendLine("   var $height = " & AltoDialogo.ToString() & ";")
            sbScript.AppendLine("   var $Pagina = raiz('" & _UrlPagina & "' + vcCodigo);")
            sbScript.AppendLine("   " & _UbicacionWindow & ".$('#iframe_modal').width($width - 10);")
            sbScript.AppendLine("   " & _UbicacionWindow & ".$('#iframe_modal').height($height - 30);")
            sbScript.AppendLine("   " & _UbicacionWindow & ".$('#iframe_modal').attr('src', $Pagina);")
            sbScript.AppendLine("   var dlgOrganizacion = " & _UbicacionWindow & ".$('#div_modal').dialog({")
            sbScript.AppendLine("       title: '" & _TituloDialog & IIf(_Descripcion <> "", " - " & _Descripcion, "") & "',")
            sbScript.AppendLine("       width: $width,")
            sbScript.AppendLine("       height: $height,")
            sbScript.AppendLine("       modal: true,")
            sbScript.AppendLine("       resizable: false")
            sbScript.AppendLine("   });")
        End If
        sbScript.AppendLine("});")
        sbScript.AppendLine("       ")
        sbScript.AppendLine("       ")
        sbScript.AppendLine("       ")

        Return sbScript.ToString

    End Function

#End Region

    Private Function ObtieneHtmlControl()
        Dim strCont As String = String.Empty

        Dim sbScript As New StringBuilder
        sbScript.Append("<div class='ui-corner-all lu' style='width: " & _anchoCaja.ToString & "px; display:block;' >")
        If _esClicleabe Then
            sbScript.Append("   <span id='" & Me.ClientID & "_spControl' class='lui'>" & _Descripcion & "</span>")
        Else
            sbScript.Append("   <span id='" & Me.ClientID & "_spControl' class='luiNO'>" & _Descripcion & "</span>")
        End If
        sbScript.Append("   <input id='" & Me.ClientID & "_hdControl' type='hidden' value='" & _Codigo & "' />")
        sbScript.Append("</div>")

        sbScript.Append("")

        strCont += "$('#contenedor_" & Me.ClientID & "').append("""
        strCont += sbScript.ToString()
        strCont += """);"
        Return strCont
    End Function

End Class
