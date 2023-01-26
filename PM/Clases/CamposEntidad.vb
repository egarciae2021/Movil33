Public Class CamposEntidad

    Private _IdCampo As String
    Public Property IdCampo() As String
        Get
            Return _IdCampo
        End Get
        Set(ByVal value As String)
            _IdCampo = value
        End Set
    End Property

    Private _Entidad As String
    Public Property Entidad() As String
        Get
            Return _Entidad
        End Get
        Set(ByVal value As String)
            _Entidad = value
        End Set
    End Property

    Private _Campo As String
    Public Property Campo() As String
        Get
            Return _Campo
        End Get
        Set(ByVal value As String)
            _Campo = value
        End Set
    End Property


    Private _IdCampoTipSol As List(Of String)
    Public Property IdCampoTipSol() As List(Of String)
        Get
            Return _IdCampoTipSol
        End Get
        Set(ByVal value As List(Of String))
            _IdCampoTipSol = value
        End Set
    End Property

    Private _vcNomCamTipSol As List(Of String)
    Public Property vcNomCamTipSol() As List(Of String)
        Get
            Return _vcNomCamTipSol
        End Get
        Set(ByVal value As List(Of String))
            _vcNomCamTipSol = value
        End Set
    End Property

    Private _CampoVisible As Boolean
    Public Property CampoVisible() As Boolean
        Get
            Return _CampoVisible
        End Get
        Set(ByVal value As Boolean)
            _CampoVisible = value
        End Set
    End Property

    Private _AliasCampo As String
    Public Property AliasCampo() As String
        Get
            Return _AliasCampo
        End Get
        Set(ByVal value As String)
            _AliasCampo = value
        End Set
    End Property
End Class
