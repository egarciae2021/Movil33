Public Class ModelSelect2

    Private _results As List(Of ModelSelect2Item)
    Public Property results As List(Of ModelSelect2Item)
        Get
            Return _results
        End Get
        Set(value As List(Of ModelSelect2Item))
            _results = value
        End Set
    End Property


    Private _pagination As ModelSelect2Pagination
    Public Property pagination As ModelSelect2Pagination
        Get
            Return _pagination
        End Get
        Set(value As ModelSelect2Pagination)
            _pagination = value
        End Set
    End Property

End Class

Public Class ModelSelect2Item

    Private _id As String
    Public Property id As String
        Get
            Return _id
        End Get
        Set(value As String)
            _id = value
        End Set
    End Property

    Private _text As String
    Public Property text As String
        Get
            Return _text
        End Get
        Set(value As String)
            _text = value
        End Set
    End Property

End Class
Public Class ModelSelect2Pagination

    Private _more As String
    Public Property more As String
        Get
            Return _more
        End Get
        Set(value As String)
            _more = value
        End Set
    End Property

End Class