Public Class ToolTipGenerico
    Inherits System.Web.UI.UserControl

#Region "propiedades"

    Private _Mensaje As String = String.Empty
    Private _Ancho As String = String.Empty
    Private _AnchoBanner As String = String.Empty

    Public Property Mensaje As String
        Get
            Return _Mensaje
        End Get
        Set(value As String)
            _Mensaje = value
        End Set
    End Property


    Public Property Ancho As String
        Get
            Return _Ancho
        End Get
        Set(value As String)
            _Ancho = value
        End Set
    End Property
    Public Property AnchoBanner As String
        Get
            Return _AnchoBanner
        End Get
        Set(value As String)
            _AnchoBanner = value
        End Set
    End Property

#End Region

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            Me.DvMiMensaje.InnerText = Me._Mensaje
            Dim Ancho As String
            Dim AnchoBanner As String
            If (String.IsNullOrEmpty(Me._AnchoBanner)) Then

                Ancho = "134px"
            End If

            If (String.IsNullOrEmpty(Me._Ancho)) Then
                AnchoBanner = "150px"
            End If

            Me.DvMiMensaje.Style("width") = Ancho
            Me.DvMensaje.Style("width") = AnchoBanner


            IncrustarJavaScript()
        Catch ex As Exception

        End Try
    End Sub

    Private Sub IncrustarJavaScript()

        Dim sbScript As New StringBuilder
        sbScript.AppendLine("$(document).ready(function () {")
        sbScript.AppendLine(" $('#" + dvToolTip.ClientID + "').hover(function(){ ")
        'sbScript.AppendLine("  $(this).css('height','100px');  ")
        'sbScript.AppendLine("  $(this).css('width','100px');  ")
        sbScript.AppendLine("  $('#" + DvMensaje.ClientID + "').css('position','fixed');  ")
        sbScript.AppendLine("  $('#" + DvMensaje.ClientID + "').css('left',$(this).offset().left- $(window).scrollLeft());")
        sbScript.AppendLine("  $('#" + DvMensaje.ClientID + "').css('top',$(this).offset().top- $(window).scrollTop());  ")

        sbScript.AppendLine("  $('#" + DvMensaje.ClientID + "').show(300);  ")
        sbScript.AppendLine(" },")
        sbScript.AppendLine(" function(){")
        'sbScript.AppendLine("  $(this).css('height','15px');  ")
        'sbScript.AppendLine("  $(this).css('width','15px');  ")
        sbScript.AppendLine("  $('#" + DvMensaje.ClientID + "').hide();  ")
        sbScript.AppendLine(" });")

        sbScript.AppendLine("$(window).scroll(function() {  $('#" + DvMensaje.ClientID + "').hide(); });")



        sbScript.AppendLine("});")

        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey_ToolTipGen" & Me.ClientID, sbScript.ToString, True)
    End Sub
End Class