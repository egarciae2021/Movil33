Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.IO
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports System.Data
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.Comun.LibreriaJQ
Imports VisualSoft.PCSistelMovil.Solicitudes.BE

Partial Class P_Movil_Conciliar_Validar
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

                hdfPeriodo.Value = ""
                hdfUsuario.Value = oUsuario.vcNom

                hdfGenerico.Value = "" & Request.QueryString("generico")
                hdfOperador.Value = "" & Request.QueryString("operador")

                UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(-1, "<Seleccionar>"), "vcNomOpe", "P_inCodOpe")

                If hdfOperador.Value <> "" Or hdfGenerico.Value <> "1" Then
                    Dim Concilia As BL_MOV_Concilia = New BL_MOV_Concilia(oUsuario.IdCliente)
                    Dim dsResultado As DataSet
                    If hdfGenerico.Value = "1" Then
                        dsResultado = Concilia.ObtenerValidacionConciliacion_Generico(oUsuario.Empleado.P_vcCod, hdfOperador.Value)
                    Else
                        dsResultado = Concilia.ObtenerValidacionConciliacion(oUsuario.Empleado.P_vcCod)
                    End If
                    Dim dtResultado As DataTable = Nothing
                    Dim dtPeriodo As DataTable = Nothing

                    If dsResultado.Tables.Count > 1 Then
                        dtResultado = dsResultado.Tables(1)
                        dtPeriodo = dsResultado.Tables(2)
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

                    hdfCodEnlace.Value = oUsuario.Empleado.P_vcCod

                    Dim oContenedorAccordion As ContenedorAccodion
                    Dim Cuenta As String = ""
                    Dim Indice As Integer = 0
                    If dtResultado IsNot Nothing Then
                        For Each Fila As DataRow In dtResultado.Rows
                            If Fila("CuentaPadre") <> Cuenta Then
                                Cuenta = Fila("CuentaPadre")
                                oContenedorAccordion = New ContenedorAccodion()
                                oContenedorAccordion.ID = "Contenedor_" & Cuenta.Replace(".", "_")
                                oContenedorAccordion.Attributes.Add("IndiceTab", Indice)
                                oContenedorAccordion.Texto = "Cuenta : " & Cuenta & " - Pendientes (0)"
                                oContenedorAccordion.Controls.Add(New LiteralControl("<table class='gridtab' id='grid_Contenedor_" & Cuenta.Replace(".", "_") & "'></table><div id='pager_grid_Contenedor_" & Cuenta.Replace(".", "_") & "'></div>"))
                                ajCuentas.ContenedoresAccodion.Add(oContenedorAccordion)
                                Indice = Indice + 1
                            End If
                        Next
                    End If

                    hdfCerrado.Value = "0"
                    If dsCierrePeriodo IsNot Nothing AndAlso dsCierrePeriodo.Tables.Count > 0 Then
                        If dsCierrePeriodo.Tables(0).Rows.Count > 0 Then
                            If dsCierrePeriodo.Tables(0).Rows(0)("Tipo").ToString() <> "OPEN" Then
                                hdfCerrado.Value = "1"
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
    Public Shared Function ObtenerValidacionConciliacion(ByVal Periodo As String, ByVal Generico As String, ByVal Operador As String) As List(Of Object)
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim Concilia As BL_MOV_Concilia = New BL_MOV_Concilia(oUsuario.IdCliente)
            Dim Detalle As BL_MOV_ConciliaNota = New BL_MOV_ConciliaNota(oUsuario.IdCliente)

            Dim dsResultado As DataSet
            If Generico = "1" Then
                dsResultado = Concilia.ObtenerValidacionConciliacion_Generico(oUsuario.Empleado.P_vcCod, Operador)
            Else
                dsResultado = Concilia.ObtenerValidacionConciliacion(oUsuario.Empleado.P_vcCod)
            End If

            Dim dtNoVistos As DataTable = Detalle.MostrarNoVistos(Periodo, oUsuario.P_inCod, True, Operador).Tables(0)
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
            If Generico = "1" Then
                Resultado = Concilia.Guardar_Validacion_Aprobado_Generico(Periodo, Numeros, Aprobado, oUsuario.P_inCod, oUsuario.Empleado.P_vcCod, True, Operador)
            Else
                Resultado = Concilia.Guardar_Validacion_Aprobado(Periodo, Numeros, Aprobado, oUsuario.P_inCod, oUsuario.Empleado.P_vcCod, True)
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
    Public Shared Function Guardar_Validacion_Observacion(ByVal Periodo As String, Numero As String, Observacion As String, ByVal Generico As String, ByVal Operador As String) As String
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim Concilia As BL_MOV_Concilia = New BL_MOV_Concilia(oUsuario.IdCliente)

            Dim Resultado As String = ""
            If Generico = "1" Then
                Resultado = Concilia.Guardar_Validacion_Observacion_Generico(Periodo, Numero, Observacion, oUsuario.P_inCod, oUsuario.Empleado.P_vcCod, Operador)
            Else
                Resultado = Concilia.Guardar_Validacion_Observacion(Periodo, Numero, Observacion, oUsuario.P_inCod, oUsuario.Empleado.P_vcCod)
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
                dsResultado = Concilia.ObtenerValidacionConciliacion_Busqueda_Generico(oUsuario.Empleado.P_vcCod, Numero, True, Operador)
            Else
                dsResultado = Concilia.ObtenerValidacionConciliacion_Busqueda(oUsuario.Empleado.P_vcCod, Numero, True)
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
    Public Shared Function EnviarColaAprobacion(Periodo As String, Observacion As String) As String
        Dim Concilia As BL_MOV_Concilia = Nothing
        Dim Colas As BL_PCS_MOV_Cola = Nothing
        Try
            Concilia = New BL_MOV_Concilia(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Colas = New BL_PCS_MOV_Cola(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dsEmpleados As DataSet = Concilia.ObtenerResponsablesTI()
            Dim Empleado As String, Correo As String, UrlPage As String

            Dim ArchivoPlantilla As String = HttpContext.Current.Server.MapPath("~/P_Movil/Conciliar/Plantilla/EnvioCorreoAprobacionResponsableTI.htm")
            If Not File.Exists(ArchivoPlantilla) Then
                Return "El archivo plantilla no existe"
            End If

            Try
                UrlPage = HttpContext.Current.Request.Url.AbsoluteUri.ToString.Replace(HttpContext.Current.Request.Url.AbsolutePath.ToString, "/Login.aspx")
            Catch
                UrlPage = "http://publicaciongestionmovil/Login.aspx"
            End Try

            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim PlantillaHTML As String = File.ReadAllText(ArchivoPlantilla, Encoding.UTF8)
            Dim MensajeCorreo As String = ""
            Dim oCola As ENT_PCS_MOV_Cola
            If dsEmpleados IsNot Nothing AndAlso dsEmpleados.Tables.Count > 0 AndAlso dsEmpleados.Tables(0) IsNot Nothing Then
                For Each dr As DataRow In dsEmpleados.Tables(0).Rows
                    Empleado = oUsuario.vcNom
                    Correo = dr("Correo").ToString()
                    Observacion = Observacion.Replace(vbLf, "<br>")

                    MensajeCorreo = PlantillaHTML.Replace("{0}", Empleado)
                    MensajeCorreo = MensajeCorreo.Replace("{1}", Periodo)
                    MensajeCorreo = MensajeCorreo.Replace("{2}", Observacion)
                    MensajeCorreo = MensajeCorreo.Replace("{3}", UrlPage)

                    oCola = New ENT_PCS_MOV_Cola()
                    oCola.btEsHtml = True
                    oCola.vcDescripcion = CambiarTildesHTML(MensajeCorreo)
                    oCola.vcAsunto = "Facturación Aprobada - Periodo " & Periodo & " - Enlace : " & Empleado
                    oCola.vcIdUsuario = oUsuario.P_inCod
                    oCola.vcMailTo = Correo

                    Colas.Insertar(oCola)

                Next
            End If

            Return "OK"
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Concilia IsNot Nothing Then Concilia.Dispose()
            If Colas IsNot Nothing Then Colas.Dispose()
        End Try
    End Function
    Shared Function CambiarTildesHTML(ByVal Texto As String) As String
        Dim _return As String = Texto
        _return = _return.Replace("á", "&aacute;")
        _return = _return.Replace("é", "&eacute;")
        _return = _return.Replace("í", "&iacute;")
        _return = _return.Replace("ó", "&oacute;")
        _return = _return.Replace("ú", "&uacute;")
        _return = _return.Replace("Á", "&Aacute;")
        _return = _return.Replace("É", "&Eacute;")
        _return = _return.Replace("Í", "&Iacute;")
        _return = _return.Replace("Ó", "&Oacute;")
        _return = _return.Replace("Ú", "&Uacute;")
        Return _return
    End Function


End Class
