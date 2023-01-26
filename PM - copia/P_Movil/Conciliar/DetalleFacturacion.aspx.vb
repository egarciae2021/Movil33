Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BL
Imports System.Web.Script.Serialization

Public Class DetalleFacturacion
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try

            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                oUsuario = HttpContext.Current.Session("Usuario")

                Dim Tipo As String = Request.QueryString("tipo")
                Dim Valor As String = Request.QueryString("valor")
                Dim Periodo As String = "" & Request.QueryString("periodo")
                Dim Generico As String = "" & Request.QueryString("generico")
                Dim Vista As String = "" & Request.QueryString("vista")

                hdfGenerico.Value = Generico

                Try
                    Dim Concilia As BL_MOV_Concilia = New BL_MOV_Concilia(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim dsResultado As DataSet '= Concilia.ObtenerDetalleFyC(Tipo, Valor)
                    If Generico = "1" Then
                        dsResultado = Concilia.ObtenerDetalleFyC_Generico(Periodo, Tipo, Valor, Vista)
                    Else
                        dsResultado = Concilia.ObtenerDetalleFyC(Tipo, Valor)
                    End If
                    Concilia.Dispose()

                    Dim lstObjPrincipal As New List(Of Object)
                    Dim lstObj As List(Of Object)
                    Dim dict As Dictionary(Of String, Object)

                    'Listado..
                   
                    Dim strScript As String = ""
                    If Tipo = "numero" Then
                        strScript &= "var Numero = '" & Valor & "';"
                        strScript &= "var Cuenta = '';"
                    ElseIf Tipo = "cuenta" Then
                        strScript &= "var Cuenta = '" & Valor & "';"
                        strScript &= "var Numero = '-';"
                    End If
                    ''strScript &= "var DatosGrilla = " & json & ";"

                    strScript &= "var DatosGrilla = [];"
                    Dim iContador As Integer = 0
                    Dim jsonSerialiser As JavaScriptSerializer
                    Dim json As String

                    For Each dt As DataTable In dsResultado.Tables
                        lstObj = New List(Of Object)
                        For i As Integer = 0 To dt.Rows.Count - 1
                            dict = New Dictionary(Of String, Object)
                            For Each Columna As DataColumn In dt.Columns
                                dict.Add(Columna.ColumnName, dt.Rows(i)(Columna.ColumnName).ToString())
                            Next
                            lstObj.Add(dict)
                        Next
                        jsonSerialiser = New JavaScriptSerializer()
                        json = jsonSerialiser.Serialize(lstObj)
                        strScript &= "DatosGrilla[" & iContador.ToString() & "] = " & json & ";"
                        iContador = iContador + 1
                        ''lstObjPrincipal.Add(lstObj)
                    Next




                    Page.ClientScript.RegisterClientScriptBlock(Me.GetType(), "Datos", strScript, True)


                Catch ex As Exception
                    Dim util As New Utilitarios
                    util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
                    Throw New Exception(UtilitarioWeb.MensajeError)
                End Try


                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
        End Try

    End Sub

End Class