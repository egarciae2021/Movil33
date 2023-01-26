Imports System.Collections.Generic
Imports System.Linq
Imports System.Text
Imports log4net
Imports log4net.Config

Namespace VisualSoft.Common.Logging
    Public Enum LogLevelL4N
        DEBUG = 1
        [ERROR]
        FATAL
        INFO
        WARN
    End Enum

    Public NotInheritable Class Logger
        Private Sub New()
        End Sub
#Region "Miembros"
        Private Shared ReadOnly logger As ILog = LogManager.GetLogger(GetType(Logger))
#End Region

#Region "Constructor"
        Shared Sub New()
            XmlConfigurator.Configure()
        End Sub
#End Region

#Region "Metodos"

        Public Shared Sub WriteLog(oPage As Page, logLevel As LogLevelL4N, log As String)
            If oPage IsNot Nothing Then
                log = oPage.Request.Path & "," & log
            Else
                log = "No Especificado," & log
            End If
            If logLevel.Equals(LogLevelL4N.DEBUG) Then
                logger.Debug(log)
            ElseIf logLevel.Equals(LogLevelL4N.[ERROR]) Then
                logger.[Error](log)
            ElseIf logLevel.Equals(LogLevelL4N.FATAL) Then
                logger.Fatal(log)
            ElseIf logLevel.Equals(LogLevelL4N.INFO) Then
                logger.Info(log)
            ElseIf logLevel.Equals(LogLevelL4N.WARN) Then
                logger.Warn(log)
            End If
        End Sub

#End Region

    End Class

End Namespace
