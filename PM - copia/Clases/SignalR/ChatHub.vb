
Imports System.Collections.Generic
Imports System.Linq
Imports System.Web
Imports Microsoft.AspNet.SignalR
Imports Microsoft.AspNet.SignalR.Hubs

Namespace PCSistelMovil


    Public Class ChatHub
        Inherits Hub

        Public Sub SendMessage(msg As String)
            Clients.All.AddMessage(msg)
        End Sub

        Public Sub SendMessageSolicitudNota(msg As String)
            Clients.All.AddMessageSolicitudNota(msg)
        End Sub

    End Class

End Namespace