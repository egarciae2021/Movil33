Imports Newtonsoft.Json
Imports System
Imports System.Collections.Generic
Imports System.Configuration
Imports System.Linq
Imports System.Net.Http
Imports System.Net.Http.Headers
Imports System.Web
'Imports Cloud_4._4_MVC.Seguridad

Namespace webGestionDatos.Helpers
    Public Class ApiHelpers
        Public Function CallApiMethod(ByVal usatoken As Boolean, ByVal tipoLlamada As String, ByVal MetodoApi As String, ByVal listaParametros As List(Of parameter), Optional ByVal contenBody As StringContent = Nothing) As String
            Dim result = ""
            Dim [Error] As errorResponse = New errorResponse()
            Dim UrlApi As String = ConfigurationManager.AppSettings("WebApiGestionDatos").ToString()
            Dim IdDominio As String = (If(HttpContext.Current.Session("IdDominio") IsNot Nothing, HttpContext.Current.Session("IdDominio"), "0"))

            If UrlApi.LastIndexOf("/") = -1 Then
                UrlApi = UrlApi & "/"
            End If

            Dim BaseAddress As Uri = New Uri(UrlApi)
            Dim values As String = ""

            If listaParametros IsNot Nothing AndAlso listaParametros.Count > 0 Then

                For i As Integer = 0 To listaParametros.Count - 1

                    If i = 0 Then
                        values = "?" & listaParametros(i).Name & "=" & listaParametros(i).value
                    Else
                        values += "&" & listaParametros(i).Name & "=" & listaParametros(i).value
                    End If
                Next
            End If

            If MetodoApi <> "DatosUsuario" Then

                If IdDominio <> "0" AndAlso values.IndexOf("idDominio=") = -1 Then

                    If values = "" Then
                        values = "?idDominio=" & IdDominio
                    Else
                        values += "&idDominio=" & IdDominio
                    End If
                End If
            End If

            Using client = New HttpClient()

                Try

                    If usatoken Then

                        If HttpContext.Current.Session("TokenAccess") IsNot Nothing Then
                            Dim token As String = HttpContext.Current.Session("TokenAccess").ToString()
                            client.DefaultRequestHeaders.Authorization = New AuthenticationHeaderValue("Bearer", token)
                        End If
                    End If

                    If tipoLlamada.ToUpper().ToString() = "GET" Then
                        Dim responseTask = client.GetAsync(String.Format("{0}", BaseAddress.ToString & MetodoApi.ToString & values))
                        responseTask.Wait()
                        Dim result_ = responseTask.Result

                        If result_.IsSuccessStatusCode Then
                            Dim readTask = result_.Content.ReadAsStringAsync()
                            readTask.Wait()
                            result = readTask.Result
                        ElseIf CInt(result_.StatusCode) = 401 Then
                            result = "Error 401 Acceso no autorizado, se requiere de un token vigente  "
                            Throw New Exception(result)
                        ElseIf CInt(result_.StatusCode) = 500 Then
                            result = "Error 500 se encontraron errores internos"
                            Throw New Exception(result)
                        Else
                            result = "Se encontraron errores comuníquese con su administrador"
                            Throw New Exception(result)
                        End If
                    ElseIf tipoLlamada.ToUpper().ToString() = "POST" Then
                        Dim responseTask = client.PostAsync(String.Format("{0}", BaseAddress.ToString & MetodoApi.ToString & values), contenBody)
                        responseTask.Wait()
                        Dim result_ = responseTask.Result

                        If result_.IsSuccessStatusCode Then
                            Dim readTask = result_.Content.ReadAsStringAsync()
                            readTask.Wait()
                            result = readTask.Result
                        ElseIf CInt(result_.StatusCode) = 401 Then
                            [Error].codigo = 401
                            HttpContext.Current.Session("errorResponse") = Nothing
                            HttpContext.Current.Session("errorResponse") = [Error]
                            result = "Error 401 Acceso no autorizado, se requiere de un token vigente  "
                            Return ""
                        ElseIf CInt(result_.StatusCode) = 500 Then
                            Dim readTask = result_.Content.ReadAsStringAsync()
                            readTask.Wait()
                            result = readTask.Result
                            [Error] = JsonConvert.DeserializeObject(Of errorResponse)(result)
                            [Error].codigo = 500
                            HttpContext.Current.Session("errorResponse") = Nothing
                            HttpContext.Current.Session("errorResponse") = [Error]
                            result = "Error 500 Se encontraron errores comuníquese con su administrador"
                            Return ""
                        Else
                            result = "Se encontraron errores comuníquese con su administrador"
                            Return ""
                        End If
                    End If

                Catch ex As AggregateException

                    If result = "" Then
                        result = "No se encontro ruta de servicio web"
                    End If

                    Return ""
                Catch ex As Exception

                    If result = "" Then
                        result = ex.ToString()
                    End If

                    Return ""
                End Try

                Return result
            End Using
        End Function
    End Class

    Public Class parameter
        Public Property Name As String
        Public Property value As String
    End Class

    Public Class errorResponse
        Public Property codigo As Integer
        Public Property message As String
        Public Property exceptionMessage As String
        Public Property exceptionType As String
        Public Property stackTrace As String
    End Class

    Public Class TipoAuditoria
        Public Const INSERTAR As String = "INSERTAR"
        Public Const ACTUALIZAR As String = "ACTUALIZAR"
        Public Const ELIMINAR As String = "ELIMINAR"
        Public Const ACCESO As String = "ACCESO"
        Public Const ABANDONO As String = "ABANDONO"
        Public Const DESACTIVAR As String = "DESACTIVAR"
        Public Const ESPECIAL As String = "ESPECIAL"
        Public Const CONSULTA As String = "CONSULTA"
    End Class
End Namespace
