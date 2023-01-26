Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.IO
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports System.Data
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.Comun.LibreriaJQ

Partial Class P_Movil_Conciliar_Cierre
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
                Dim Operador As BL_GEN_Operador = New BL_GEN_Operador(oUsuario.IdCliente)

                hdfUsuario.Value = oUsuario.vcNom
                hdfGenerico.Value = "" & Request.QueryString("generico")
                hdfOperador.Value = "" & Request.QueryString("operador")

                UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(-1, "<Seleccionar>"), "vcNomOpe", "P_inCodOpe")

                btnAbrir.Style.Add("display", "none")
                btnCerrar.Style.Add("display", "block")
                'btnCerrar.Visible = True
                hdfCerrado.Value = "0"

                If hdfOperador.Value <> "" Or hdfGenerico.Value <> "1" Then
                    Dim Concilia As BL_MOV_Concilia = New BL_MOV_Concilia(oUsuario.IdCliente)
                    Dim dsResultado As DataSet
                    Dim dtResultado As DataTable = Nothing
                    Dim dtPeriodo As DataTable = Nothing

                    If hdfGenerico.Value = "1" Then
                        dsResultado = Concilia.ObtenerCierreConciliacion_Generico(hdfOperador.Value)
                    Else
                        dsResultado = Concilia.ObtenerCierreConciliacion()
                    End If

                    If dsResultado IsNot Nothing Then
                        If dsResultado.Tables.Count > 2 Then
                            dtResultado = dsResultado.Tables(3) 'Areas
                            dtPeriodo = dsResultado.Tables(2) 'Periodo
                        End If

                        If dtPeriodo IsNot Nothing AndAlso dtPeriodo.Rows.Count > 0 Then
                            If Convert.IsDBNull(dtPeriodo.Rows(0)(0)) Then
                                hdfPeriodo.Value = ""
                            Else
                                hdfPeriodo.Value = Convert.ToDateTime(dtPeriodo.Rows(0)(0)).ToString("yyyyMMdd")
                            End If
                        End If
                        Dim dsCierrePeriodo As DataSet = Concilia.ObtenerCierrePeriodo(hdfPeriodo.Value, hdfOperador.Value)
                        Concilia.Dispose()

                        Dim oContenedorAccordion As ContenedorAccodion
                        Dim Area As String = "", CodInt As String = ""
                        Dim Indice As Integer = 0
                        If dtResultado IsNot Nothing Then
                            For Each Fila As DataRow In dtResultado.Rows
                                Area = Fila("Area").ToString()
                                CodInt = Fila("CodInt").ToString()
                                oContenedorAccordion = New ContenedorAccodion()
                                oContenedorAccordion.ID = "Contenedor_" & CodInt
                                oContenedorAccordion.Attributes.Add("IndiceTab", Indice)
                                oContenedorAccordion.Attributes.Add("NombreArea", Area)
                                oContenedorAccordion.Texto = "Empresa : " & Area & " - Pendientes (0)"
                                oContenedorAccordion.Controls.Add(New LiteralControl("<table class='gridtab' id='grid_Contenedor_" & CodInt & "'></table><div id='pager_grid_Contenedor_" & CodInt & "'></div>"))
                                ajAreas.ContenedoresAccodion.Add(oContenedorAccordion)
                                Indice = Indice + 1
                            Next
                        End If

                        If dsCierrePeriodo IsNot Nothing AndAlso dsCierrePeriodo.Tables.Count > 0 Then
                            If dsCierrePeriodo.Tables(0).Rows.Count > 0 Then
                                If dsCierrePeriodo.Tables(0).Rows(0)("Tipo").ToString() <> "OPEN" Then
                                    btnAbrir.Style.Add("display", "block") '.Visible = True
                                    hdfCerrado.Value = "1"
                                    'btnCerrar.Visible = False
                                    btnCerrar.Style.Add("display", "none")
                                End If
                            End If
                        End If
                    End If

                End If

                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
        End Try
    End Sub

    Private Sub LimpiarCampos()
    End Sub

    <WebMethod()>
    Public Shared Function ObtenerCierreConciliacion(ByVal Periodo As String, ByVal Generico As String, ByVal Operador As String) As List(Of Object)
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim Concilia As BL_MOV_Concilia = New BL_MOV_Concilia(oUsuario.IdCliente)
            Dim Detalle As BL_MOV_ConciliaNota = New BL_MOV_ConciliaNota(oUsuario.IdCliente)


            Dim dsResultado As DataSet
            If Generico = "1" Then
                dsResultado = Concilia.ObtenerCierreConciliacion_Generico(Operador)
            Else
                dsResultado = Concilia.ObtenerCierreConciliacion()
            End If

            Dim dtNoVistos As DataTable = Detalle.MostrarNoVistos(Periodo, oUsuario.P_inCod, False, Operador).Tables(0)
            Concilia.Dispose()
            Detalle.Dispose()

            Dim lstObjPrincipal As New List(Of Object)
            Dim lstObj As List(Of Object)
            Dim dict As Dictionary(Of String, Object)

            'Listado..
            For Each Tabla As DataTable In dsResultado.Tables
                lstObj = New List(Of Object)
                For i As Integer = 0 To Tabla.Rows.Count - 1
                    dict = New Dictionary(Of String, Object)
                    For Each Columna As DataColumn In Tabla.Columns
                        dict.Add(Columna.ColumnName, Tabla.Rows(i)(Columna.ColumnName).ToString())
                    Next
                    lstObj.Add(dict)
                Next
                lstObjPrincipal.Add(lstObj)
            Next

            lstObj = New List(Of Object)
            For i As Integer = 0 To dtNoVistos.Rows.Count - 1
                dict = New Dictionary(Of String, Object)
                For Each Columna As DataColumn In dtNoVistos.Columns
                    dict.Add(Columna.ColumnName, dtNoVistos.Rows(i)(Columna.ColumnName).ToString())
                Next
                lstObj.Add(dict)
            Next
            lstObjPrincipal.Add(lstObj)

            Return lstObjPrincipal
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Guardar_Validacion_Aprobado(ByVal Periodo As String, Numeros As String, Aprobado As String, ByVal Generico As String, ByVal Operador As String) As String
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim Concilia As BL_MOV_Concilia = New BL_MOV_Concilia(oUsuario.IdCliente)
            Dim Resultado As String = ""
            Numeros = Numeros.Replace("-", ".")
            If Generico = "1" Then
                Resultado = Concilia.Guardar_Validacion_Aprobado_Generico(Periodo, Numeros, Aprobado, oUsuario.P_inCod, oUsuario.Empleado.P_vcCod, False, Operador)
            Else
                Resultado = Concilia.Guardar_Validacion_Aprobado(Periodo, Numeros, Aprobado, oUsuario.P_inCod, oUsuario.Empleado.P_vcCod, False)
            End If
            Concilia.Dispose()
            Return Resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Guardar_Cierre_Observacion(ByVal Periodo As String, Numero As String, Observacion As String, ByVal Generico As String, ByVal Operador As String) As String
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim Concilia As BL_MOV_Concilia = New BL_MOV_Concilia(oUsuario.IdCliente)
            Dim Resultado As String = ""
            If Generico = "1" Then
                Resultado = Concilia.Guardar_Cierre_Respuesta_Generico(Periodo, Numero, Observacion, oUsuario.P_inCod, oUsuario.Empleado.P_vcCod, Operador)
            Else
                Resultado = Concilia.Guardar_Cierre_Respuesta(Periodo, Numero, Observacion, oUsuario.P_inCod, oUsuario.Empleado.P_vcCod)
            End If

            Concilia.Dispose()
            Return Resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ObtenerValidacionConciliacion_Busqueda(Numero As String, ByVal Generico As String, ByVal Operador As String) As List(Of Object)
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim Concilia As BL_MOV_Concilia = New BL_MOV_Concilia(oUsuario.IdCliente)

            Dim dsResultado As DataSet
            If Generico = "1" Then
                dsResultado = Concilia.ObtenerValidacionConciliacion_Busqueda_Generico(oUsuario.Empleado.P_vcCod, Numero, False, Operador)
            Else
                dsResultado = Concilia.ObtenerValidacionConciliacion_Busqueda(oUsuario.Empleado.P_vcCod, Numero, False)
            End If

            Concilia.Dispose()

            Dim lstObj As List(Of Object)
            Dim dict As Dictionary(Of String, Object)
            lstObj = New List(Of Object)
            For i As Integer = 0 To dsResultado.Tables(0).Rows.Count - 1
                dict = New Dictionary(Of String, Object)
                For Each Columna As DataColumn In dsResultado.Tables(0).Columns
                    dict.Add(Columna.ColumnName, dsResultado.Tables(0).Rows(i)(Columna.ColumnName).ToString())
                Next
                lstObj.Add(dict)
            Next

            Return lstObj
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function EnviarCierre(Periodo As String, Lineas As String, Cuentas As String, Total As String, Operador As String) As String
        Dim Concilia As BL_MOV_Concilia = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Concilia = New BL_MOV_Concilia(oUsuario.IdCliente)
            Concilia.Guardar_Cierre("CLOSE", oUsuario.P_inCod, Periodo, Lineas, Cuentas, Total, Operador)
            Return "OK"
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Concilia IsNot Nothing Then Concilia.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function EnviarApertura(Periodo As String, Lineas As String, Cuentas As String, Total As String, Operador As String) As String
        Dim Concilia As BL_MOV_Concilia = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Concilia = New BL_MOV_Concilia(oUsuario.IdCliente)
            Total = Total.Replace("undefined", "0")
            Concilia.Guardar_Cierre("OPEN", oUsuario.P_inCod, Periodo, Lineas, Cuentas, Total, Operador)
            Return "OK"
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Concilia IsNot Nothing Then Concilia.Dispose()
        End Try
    End Function


    <WebMethod()>
    Public Shared Function ObtenerNoLeidos(ByVal Periodo As String, ByVal Operador As String) As List(Of Object)
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim Detalle As BL_MOV_ConciliaNota = New BL_MOV_ConciliaNota(oUsuario.IdCliente)
            Dim dtNoVistos As DataTable = Detalle.MostrarNoVistos(Periodo, oUsuario.P_inCod, False, Operador).Tables(0)
            Detalle.Dispose()

            Dim lstObjPrincipal As New List(Of Object)
            Dim lstObj As List(Of Object)
            Dim dict As Dictionary(Of String, Object)

            lstObj = New List(Of Object)
            For i As Integer = 0 To dtNoVistos.Rows.Count - 1
                dict = New Dictionary(Of String, Object)
                For Each Columna As DataColumn In dtNoVistos.Columns
                    dict.Add(Columna.ColumnName, dtNoVistos.Rows(i)(Columna.ColumnName).ToString())
                Next
                lstObj.Add(dict)
            Next
            lstObjPrincipal.Add(lstObj)

            Return lstObjPrincipal
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

End Class
