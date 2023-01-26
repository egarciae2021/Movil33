Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports System.IO
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Services
Imports System.Web.Script.Serialization
Imports System.Web.Script.Services
Imports System.Data
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.PCSistel.Utilitarios
Imports Ionic.Zip

Partial Class General_Administrar_Mantenimiento_Mnt_Principal
    Inherits System.Web.UI.Page

    Protected Sub General_Administrar_Mantenimiento_Mnt_Principal_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then

                    If UtilitarioWeb.ObtieneMO360() = "1" Then
                        tdAgregarEmpleado.Visible = False
                    End If

                    Dim Nivel As BL_GEN_Nivel = New BL_GEN_Nivel(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim Caracteristica As BL_MOV_Caracteristica = New BL_MOV_Caracteristica(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                    Dim lstNivel As List(Of ENT_GEN_Nivel) = Nivel.Listar()
                    Nivel.Dispose()
                    'hdfTipo.Value = Request.QueryString("Tipo")
                    'hdfMultiple.Value = Request.QueryString("Multiple")

                    'If hdfTipo.Value = "1" Then
                    '    dvDatosSeleccion.InnerHtml = "Areas disponibles"
                    'ElseIf hdfTipo.Value = "2" Then
                    '    dvDatosSeleccion.InnerHtml = "Empleados disponibles"
                    'ElseIf hdfTipo.Value = "3" Then
                    '    dvDatosSeleccion.InnerHtml = "Celulares disponibles"
                    'End If

                    'If hdfMultiple.Value = "0" Then
                    '    tdControles.Style("display") = "none"
                    '    tdDatosSeleccionados.Style("display") = "none"
                    '    lstResultado.SelectionMode = ListSelectionMode.Single
                    'End If
                    Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                    Dim Item As New BL_PRO_Item(oUsuario.IdCliente)
                    Dim lstItem As List(Of ENT_PRO_Item)
                    lstItem = Item.Listar(oUsuario)
                    For Each oItem As ENT_PRO_Item In lstItem
                        If oItem.vcNom.ToString().ToLower = "extensiones" And oItem.inEst = 1 Then
                            hdfRemoverAnexo.Value = "true"
                        End If
                        If oItem.vcNom.ToString().ToLower = "códigos" And oItem.inEst = 1 Then
                            hdfRemoverCodigo.Value = "true"
                        End If
                    Next


                    'quitar(JSILUPU)
                    hfMaximoNivel.Value = lstNivel.Count
                    hfMaximoNivelConfigurado.Value = oUsuario.CaracteristicaUsuario.NivelMaximoOrganizacion
                    For Each oNivel As ENT_GEN_Nivel In lstNivel
                        oNivel.vcUrlIcoNiv = "~/Common/Images/Controles/dhtmlx/TreeView/Niveles/" & oNivel.P_inCodNiv & ".ico"

                        Try
                            If oNivel.imIcoNiv IsNot Nothing Then
                                Dim strfn As String = Server.MapPath(oNivel.vcUrlIcoNiv)
                                Dim fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write)
                                fs.Write(oNivel.imIcoNiv, 0, oNivel.imIcoNiv.Length)
                                fs.Flush()
                                fs.Close()
                            End If
                        Catch
                        End Try

                    Next

                    Dim CampoReqAutorizacion As Integer = 0
                    Try
                        CampoReqAutorizacion = Caracteristica.ValidaCaracteristicaActiva("M_ORGA", "RequiereAutorizacion")
                    Catch ex As Exception
                        CampoReqAutorizacion = 0
                    End Try

                    If (CampoReqAutorizacion = 1) Then
                        hdfCamposTablaResponsable.Value = "Código,Nombre Empleado,Tipo De Responsabilidad,Área Responsable, Puede Autorizar"
                    Else
                        hdfCamposTablaResponsable.Value = "Código,Nombre Empleado,Tipo De Responsabilidad,Área Responsable"
                    End If


                    'For Each oNivel As ENT_GEN_Nivel In lstNivel
                    '    oNivel.vcUrlIcoNiv = "~/Common/Images/Controles/dhtmlx/TreeView/Niveles/" & oNivel.P_inCodNiv & ".ico"

                    '    If oNivel.imIcoNiv IsNot Nothing Then
                    '        Dim strfn As String = Server.MapPath(oNivel.vcUrlIcoNiv)
                    '        Dim fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write)
                    '        fs.Write(oNivel.imIcoNiv, 0, oNivel.imIcoNiv.Length)
                    '        fs.Flush()
                    '        fs.Close()
                    '    End If
                    'Next
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    Protected Sub eegLlamada_ObtenerDatosAExportar(ByVal oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eegLlamada.ObtenerDatosAExportar
        Dim data As DataTable
        Dim Empleado As BL_GEN_Empleado = New BL_GEN_Empleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        Dim vcCodInt As String, btIncDep As String, inCodEst As String, vcValBus As String, inTip As String,
            strDatoEmpleado As String, btEmpLinDis As String
        vcCodInt = HttpContext.Current.Session("Reporte_Estructura_X_Linea").ToString().Split("|")(0) 'hdfPeriodo.Value
        btIncDep = HttpContext.Current.Session("Reporte_Estructura_X_Linea").ToString().Split("|")(1) 'hdfCodigoOperador.Value
        inCodEst = HttpContext.Current.Session("Reporte_Estructura_X_Linea").ToString().Split("|")(2) 'hdfCodigoCuenta_Plan.Value
        vcValBus = HttpContext.Current.Session("Reporte_Estructura_X_Linea").ToString().Split("|")(3) 'hdfAsignacionCredito.Value
        inTip = HttpContext.Current.Session("Reporte_Estructura_X_Linea").ToString().Split("|")(4) 'hdfTipoServicio.Value
        strDatoEmpleado = HttpContext.Current.Session("Reporte_Estructura_X_Linea").ToString().Split("|")(5) 'hdfTipoServicio.Value
        btEmpLinDis = HttpContext.Current.Session("Reporte_Estructura_X_Linea").ToString().Split("|")(6) 'hdfTipoServicio.Value

        data = Empleado.Reporte_Estructura_X_Linea(vcCodInt, btIncDep, inCodEst, strDatoEmpleado)

        'eegLlamada.ExportarDatos(data, "ReporteExceso")
        ExportarReporteEstructura_X_Linea(data, oCultura, False)
    End Sub

    Public Sub ExportarReporteEstructura_X_Linea(ByVal dtCabecera As DataTable, ByVal oCultura As ENT_GEN_Cultura, ByVal blRenameColumn As Boolean)

        Dim attachment As String = "attachment; filename=" & "ReporteEstructura" & ".xls"
        
        Dim strcontenido As New StringBuilder

        Try
            'Dim ms As New MemoryStream
            'If File.Exists(attachment) Then
            '    File.Delete(attachment)
            'End If

            'context.Response.Write("<style> TD { mso-number-format:\@; } </style>")
            strcontenido.Append("<style> TD { mso-number-format:\@; } </style>")

            'context.Response.Write("<table cellspacing='0' rules='all' border='1' id='tbl_" + "Rep_Estructura_X_Linea" + "' style='border-collapse:collapse;'>")
            strcontenido.Append("<table cellspacing='0' rules='all' border='1' id='tbl_" + "Rep_Estructura_X_Linea" + "' style='border-collapse:collapse;'>")
            'context.Response.Write(vbLf)
            strcontenido.Append(vbLf)

            'context.Response.Write(vbTab + "<tr style='font-weight:bolder;'>")
            strcontenido.Append(vbTab + "<tr style='font-weight:bolder;'>")
            'context.Response.Write(vbLf + vbTab + vbTab)
            strcontenido.Append(vbLf + vbTab + vbTab)

            RenombrarColumnas(dtCabecera)

            For i = 0 To dtCabecera.Columns.Count - 1
                If dtCabecera.Columns(i).ColumnName <> "btActualizar" Then
                    'context.Response.Write("<td style='background-color: #C6E0BD; text-aling: center; border: 1px solid;'>")
                    strcontenido.Append("<td style='background-color: #C6E0BD; text-aling: center; border: 1px solid;'>")
                    'context.Response.Write(dtCabecera.Columns(i).ColumnName.ToString())
                    strcontenido.Append(dtCabecera.Columns(i).ColumnName.ToString())
                    'context.Response.Write("</td>")
                    strcontenido.Append("</td>")
                End If
            Next
            'context.Response.Write(vbLf)
            strcontenido.Append(vbLf)
            'context.Response.Write(vbTab + "</tr>")
            strcontenido.Append(vbTab + "</tr>")
            'context.Response.Write(vbLf)
            strcontenido.Append(vbLf)

            Dim vcInfoEmpleado As String = ""
            Dim vcInfoArea As String = ""
            Dim vcInfoResponsable = "", vcInfoArea_Responsable As String = ""
            Dim vcInfoAreaSup = "", vcInfoArea_AreaSup As String = ""

            'For Each dr As DataRow In dtCabecera.Rows
            For x = 0 To dtCabecera.Rows.Count - 1
                'context.Response.Write(vbTab + "<tr>")
                strcontenido.Append(vbTab + "<tr>")
                'context.Response.Write(vbLf + vbTab + vbTab)
                strcontenido.Append(vbLf + vbTab + vbTab)
                For i = 0 To dtCabecera.Columns.Count - 1
                    If dtCabecera.Columns(i).ColumnName <> "btActualizar" Then
                        If dtCabecera.Columns(i).ColumnName = "Empleado" Then
                            If vcInfoEmpleado <> dtCabecera.Rows(x)(i).ToString() Then
                                vcInfoEmpleado = dtCabecera.Rows(x)(i).ToString()
                                Dim cont As Integer = ObtenerFilas_A_Combinar(dtCabecera, "Empleado", vcInfoEmpleado)
                                'context.Response.Write("<td rowspan='" + cont.ToString() + "' style='vertical-align:middle;'>")
                                strcontenido.Append("<td rowspan='" + cont.ToString() + "' style='vertical-align:middle;'>")
                                'context.Response.Write(dtCabecera.Rows(x)(i).ToString().Trim())
                                strcontenido.Append(dtCabecera.Rows(x)(i).ToString().Trim())
                                'context.Response.Write("</td>")
                                strcontenido.Append("</td>")
                            End If

                        ElseIf dtCabecera.Columns(i).ColumnName = "Área" Then
                            If vcInfoArea <> dtCabecera.Rows(x)(i).ToString() Then
                                vcInfoArea = dtCabecera.Rows(x)(i).ToString()
                                Dim cont As Integer = ObtenerFilas_A_Combinar(dtCabecera, "Área", vcInfoArea)
                                'context.Response.Write("<td rowspan='" + cont.ToString() + "' style='text-align:center; vertical-align:middle;'>")
                                strcontenido.Append("<td rowspan='" + cont.ToString() + "' style='text-align:center; vertical-align:middle;'>")
                                'context.Response.Write(dtCabecera.Rows(x)(i).ToString().Trim())
                                strcontenido.Append(dtCabecera.Rows(x)(i).ToString().Trim())
                                'context.Response.Write("</td>")
                                strcontenido.Append("</td>")
                            End If

                        ElseIf dtCabecera.Columns(i).ColumnName = "Responsable Área" Then
                            'AndAlso vcInfoResponsable <> dtCabecera.Rows(x)("Responsable Área").ToString() 
                            If vcInfoArea_Responsable <> dtCabecera.Rows(x)("Área").ToString() Then
                                vcInfoResponsable = dtCabecera.Rows(x)(i).ToString()
                                vcInfoArea_Responsable = dtCabecera.Rows(x)("Área").ToString()
                                Dim cont As Integer = ObtenerFilas_A_Combinar_X_Responsable(dtCabecera, "Responsable Área", vcInfoResponsable, "Área", vcInfoArea_Responsable)
                                'context.Response.Write("<td rowspan='" + cont.ToString() + "' style='text-align:center; vertical-align:middle;'>")
                                strcontenido.Append("<td rowspan='" + cont.ToString() + "' style='text-align:center; vertical-align:middle;'>")
                                'context.Response.Write(dtCabecera.Rows(x)(i).ToString().Trim())
                                strcontenido.Append(dtCabecera.Rows(x)(i).ToString().Trim())
                                'context.Response.Write("</td>")
                                strcontenido.Append("</td>")
                            End If

                        ElseIf dtCabecera.Columns(i).ColumnName = "Responsable Área" Then
                            'AndAlso vcInfoResponsable <> dtCabecera.Rows(x)("Responsable Área").ToString() 
                            If vcInfoArea_Responsable <> dtCabecera.Rows(x)("Área").ToString() Then
                                vcInfoResponsable = dtCabecera.Rows(x)(i).ToString()
                                vcInfoArea_Responsable = dtCabecera.Rows(x)("Área").ToString()
                                Dim cont As Integer = ObtenerFilas_A_Combinar_X_Responsable(dtCabecera, "Responsable Área", vcInfoResponsable, "Área", vcInfoArea_Responsable)
                                'context.Response.Write("<td rowspan='" + cont.ToString() + "' style='text-align:center; vertical-align:middle;'>")
                                strcontenido.Append("<td rowspan='" + cont.ToString() + "' style='text-align:center; vertical-align:middle;'>")
                                'context.Response.Write(dtCabecera.Rows(x)(i).ToString().Trim())
                                strcontenido.Append(dtCabecera.Rows(x)(i).ToString().Trim())
                                'context.Response.Write("</td>")
                                strcontenido.Append("</td>")
                            End If

                        ElseIf dtCabecera.Columns(i).ColumnName = "Área Superior" Then
                            If vcInfoArea_AreaSup <> dtCabecera.Rows(x)("Área").ToString() Then
                                vcInfoAreaSup = dtCabecera.Rows(x)(i).ToString()
                                vcInfoArea_AreaSup = dtCabecera.Rows(x)("Área").ToString()
                                Dim cont As Integer = ObtenerFilas_A_Combinar_X_Responsable(dtCabecera, "Área Superior", vcInfoAreaSup, "Área", vcInfoArea_AreaSup)
                                'context.Response.Write("<td rowspan='" + cont.ToString() + "' style='text-align:center; vertical-align:middle;'>")
                                strcontenido.Append("<td rowspan='" + cont.ToString() + "' style='text-align:center; vertical-align:middle;'>")
                                'context.Response.Write(dtCabecera.Rows(x)(i).ToString().Trim())
                                strcontenido.Append(dtCabecera.Rows(x)(i).ToString().Trim())
                                'context.Response.Write("</td>")
                                strcontenido.Append("</td>")
                            End If

                        Else
                            'context.Response.Write("<td style='text-align:left;'>")
                            strcontenido.Append("<td style='text-align:left;'>")
                            'context.Response.Write(dtCabecera.Rows(x)(i).ToString().Trim())
                            strcontenido.Append(dtCabecera.Rows(x)(i).ToString().Trim())
                            'context.Response.Write("</td>")
                            strcontenido.Append("</td>")
                        End If
                    End If
                Next
                'context.Response.Write(vbLf)
                strcontenido.Append(vbLf)
                'context.Response.Write(vbTab + "</tr>")
                strcontenido.Append(vbTab + "</tr>")
                'context.Response.Write(vbLf)
                strcontenido.Append(vbLf)
                dtCabecera.Rows(x)("btActualizar") = "1"
            Next

            'Fila de Totales
            'context.Response.Write(vbLf)
            strcontenido.Append(vbLf)
            'context.Response.Write(vbTab + "</tr>")
            strcontenido.Append(vbTab + "</tr>")
            'context.Response.Write(vbLf)
            strcontenido.Append(vbLf)

            'context.Response.Write("</table>")
            strcontenido.Append("</table>")



            Dim Dominio As String = Session("IdDominio").ToString()
            Dim Usuario As String = CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente.ToString()
            Dim vcRutaTMP As String = HttpContext.Current.Server.MapPath("~/P_Movil/Administrar/Temporal/" + UtilitarioWeb.NombreArchivoEstandarizado(Dominio, Usuario) + "/").ToString()
            Dim name As String = "ReporteEstructura"

            If Not System.IO.Directory.Exists(vcRutaTMP) Then
                System.IO.Directory.CreateDirectory(vcRutaTMP)
            End If

            Dim writer = New StreamWriter(vcRutaTMP & name & ".xls", False, Encoding.UTF8)
            'Dim writer As StreamWriter = File.CreateText(vcRutaTMP & name & ".xls")
            writer.WriteLine(strcontenido)
            writer.Close()

            '=================================================================================================================================
            name = UtilitarioWeb.CorrijeNombreArchivo(name)
            Dim destPath As String = UtilitarioWeb.ComprimeArchivo(vcRutaTMP + attachment, vcRutaTMP, name, name, "xlsx", False)
            '=================================================================================================================================

            Dim fi As FileInfo = New FileInfo(destPath)
            If (fi.Exists) Then
                HttpContext.Current.Response.ClearHeaders()
                HttpContext.Current.Response.ClearContent()
                HttpContext.Current.Response.AppendHeader("Content-Disposition", "attachment; filename=" + UtilitarioWeb.QuitarAcentos(fi.Name) + ";")
                HttpContext.Current.Response.AppendHeader("Content-Length", fi.Length.ToString())
                HttpContext.Current.Response.ContentType = "application/octet-stream"
                HttpContext.Current.Response.TransmitFile(fi.FullName)
                HttpContext.Current.Response.Flush()
            End If

        Catch ex As Exception

        End Try
    End Sub

    Private Function RenombrarColumnas(ByVal prData As DataTable) As DataTable
        Try
            Dim contador As Integer = 0
            For index = 0 To prData.Columns.Count - 1
                Select Case prData.Columns(index - contador).ColumnName
                    Case "TipoLinea"
                        prData.Columns(index - contador).ColumnName = "Tipo Línea"
                        Continue For

                    Case "Area"
                        prData.Columns(index - contador).ColumnName = "Área"
                        Continue For

                    Case "Responsable_Area"
                        prData.Columns(index - contador).ColumnName = "Responsable Área"
                        Continue For

                    Case "Area_Superior"
                        prData.Columns(index - contador).ColumnName = "Área Superior"
                        Continue For

                    Case "NombreSucursal"
                        prData.Columns(index - contador).ColumnName = "Sucursal"
                        Continue For

                    Case "NombreCentroCosto"
                        prData.Columns(index - contador).ColumnName = "Centro Costo"
                        Continue For

                    Case "Linea"
                        prData.Columns(index - contador).ColumnName = "Línea"
                        Continue For
                End Select
            Next

        Catch ex As Exception

        End Try
        Return prData
    End Function

    Public Function ObtenerFilas_A_Combinar(ByVal data As DataTable, ByVal vcColumna As String, ByVal vcTexto As String) As Integer
        Dim cont As Integer = 0
        For i = 0 To data.Rows.Count - 1
            If data.Rows(i)(vcColumna) = vcTexto And data.Rows(i)("btActualizar") = 0 Then
                cont += 1
            End If
        Next
        Return cont
    End Function

    Public Function ObtenerFilas_A_Combinar_X_Responsable(ByVal data As DataTable, ByVal vcColumnaResponsable As String, ByVal vcTextoResponsable As String, ByVal vcColumnaArea As String, ByVal vcTextoArea As String) As Integer
        Dim cont As Integer = 0
        For i = 0 To data.Rows.Count - 1
            If data.Rows(i)(vcColumnaResponsable) = vcTextoResponsable And data.Rows(i)(vcColumnaArea) = vcTextoArea And data.Rows(i)("btActualizar") = 0 Then
                cont += 1
            End If
        Next
        Return cont
    End Function

    <WebMethod()>
    Public Shared Function ListarPrincipal(ByVal vcCodInt As String) As List(Of Object)
        Try
            Dim Organizacion As BL_GEN_Organizacion = New BL_GEN_Organizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim NodoPrincipal As New List(Of Object)
            If ("" & vcCodInt = "") OrElse (vcCodInt IsNot Nothing AndAlso vcCodInt.Length = 3) Then
                vcCodInt = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
                HttpContext.Current.Session("Reporte_Estructura_X_Linea") = vcCodInt & "|" & 0 & "|" & 1 & "|" & "" & "|" & 1 & "|" & "" & "|" & 0

                Dim oOrganizacion As ENT_GEN_Organizacion

                If (vcCodInt.Contains(",")) Then
                    oOrganizacion = Organizacion.ObtieneOrganizacion("001")
                Else
                    oOrganizacion = Organizacion.ObtieneOrganizacion(vcCodInt)
                End If

                Dim PrimerNivel As New List(Of Object)
                PrimerNivel.Add(If((vcCodInt.Contains(",")), "001", vcCodInt))
                PrimerNivel.Add(0)
                PrimerNivel.Add(oOrganizacion.vcNomOrg)
                PrimerNivel.Add(If((vcCodInt.Contains(",")), True, False))
                NodoPrincipal.Add(PrimerNivel)
            Else
                HttpContext.Current.Session("Reporte_Estructura_X_Linea") = vcCodInt & "|" & 0 & "|" & 1 & "|" & "" & "|" & 1 & "|" & "" & "|" & 0
                Dim lstOrganizacion As List(Of ENT_GEN_Organizacion) = Organizacion.ListarDependencia(vcCodInt)
                Organizacion.Dispose()
                For Each oOrganizacion As ENT_GEN_Organizacion In lstOrganizacion
                    Dim PrimerNivel As New List(Of Object)
                    PrimerNivel.Add(oOrganizacion.vcCodInt)
                    PrimerNivel.Add(0)
                    PrimerNivel.Add(oOrganizacion.vcNomOrg)
                    NodoPrincipal.Add(PrimerNivel)
                Next
            End If
            Return NodoPrincipal
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarOrganizacion(ByVal vcCodInt As String) As List(Of ENT_GEN_Organizacion)
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim Organizacion As BL_GEN_Organizacion = New BL_GEN_Organizacion(oUsuario.IdCliente)
            'HttpContext.Current.Session("Reporte_Estructura_X_Linea") = vcCodInt & "|" & btIncDep & "|" & inCodEst & "|" & vcValBus & "|" & inTip & "|" & strDatoEmpleado
            Dim _return As List(Of ENT_GEN_Organizacion)
            'If (tieneMultipleArea = "true") Then
            If (oUsuario.F_vcCodInt.Contains(",")) Then
                Dim filtro As String = "AND ("
                If (vcCodInt = "001") Then

                    Dim listaCodigosArea As String() = oUsuario.F_vcCodInt.Split(",")
                    For Each codigo As String In listaCodigosArea
                        'filtro += "O.ORGA_CodInt2 LIKE '" & codigo & "%' OR "
                        filtro += "O.ORGA_CodInt2 = '" & codigo & "' OR "
                    Next

                    If (filtro.Length <> 0) Then
                        filtro = filtro.Substring(0, filtro.Length - 3) 'con esto eslimino el OR sobrante en caso de haberuno'
                        filtro += ")"
                    End If

                    _return = Organizacion.ListarDependencia(vcCodInt, filtro)

                Else
                    _return = Organizacion.ListarDependencia(vcCodInt)
                End If
            Else
                _return = Organizacion.ListarDependencia(vcCodInt)
            End If

            Organizacion.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Actualizar(ByVal OrganizacionActual As String, ByVal PadreDestino As String, ByVal TipoUpdate As String) As String
        Try
            Dim MoverAreas As New General_Administrar_Mantenimiento_Mnt_Principal
            Dim CodintNuevo As String = ""
            Dim bExisteArea As Boolean = False
            Dim strListaCodigos As String = ""
            Dim strMensaje As String = ""
            Dim strListaEnviar As String = ""

            If TipoUpdate = "O" Then
                ' Actualizacion de Organizaciones
                CodintNuevo = MoverAreas.fnObtieneNuevoCodigoOrganizacion(PadreDestino)
                MoverAreas.fnMoverAreaBD_Step2(OrganizacionActual, PadreDestino, CodintNuevo, bExisteArea, strListaCodigos, strMensaje)
                If bExisteArea Or strMensaje <> "" Then
                    Return strMensaje
                End If
            Else
                strListaEnviar = "'" & Replace(OrganizacionActual, ",", "','") & "'"
                'Actualizacion de Empleados
                Dim Organizacion As BL_GEN_Organizacion = New BL_GEN_Organizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Call Organizacion.MoverEmpleadosNuevaOrga(strListaEnviar, PadreDestino)
                'Call General_Administrar_Mantenimiento_Mnt_Principal.listar()
                Organizacion.Dispose()
                General_Administrar_Mantenimiento_Mnt_Principal.ListarPrincipal("001")
            End If

            Return ""
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function


    <WebMethod()>
    Public Shared Function BuscarAreaEmpleado(ByVal vcNomArea As String, ByVal vcTipBus As String) As IEnumerable(Of Object)
        Dim Organizacion As BL_GEN_Organizacion = Nothing
        Dim Empleado As BL_GEN_Empleado = Nothing
        Dim ResponsableArea As BL_MOV_OrgaJefatura = Nothing
        Try
            Organizacion = New BL_GEN_Organizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Empleado = New BL_GEN_Empleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            ResponsableArea = New BL_MOV_OrgaJefatura(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            If vcTipBus = "1" Then
                Dim lstOrganizacion As New List(Of ENT_GEN_Organizacion)
                lstOrganizacion = Organizacion.BuscarArea(vcNomArea)
                Return lstOrganizacion
            ElseIf vcTipBus = "2" Then
                Dim lstEmpleado As New List(Of ENT_GEN_Empleado)
                lstEmpleado = Empleado.BuscarEmpleado(vcNomArea)
                Return lstEmpleado
            Else 'JHERRERA 20150227: Nueva funcionalidad Responsable de Área
                Dim lstEmpleado As New List(Of ENT_GEN_Empleado)
                lstEmpleado = ResponsableArea.BuscarResponsableArea(vcNomArea)
                Return lstEmpleado
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Organizacion IsNot Nothing Then Organizacion.Dispose()
            If Empleado IsNot Nothing Then Empleado.Dispose()
        End Try

    End Function

    <WebMethod()>
    Public Shared Function ListarArea(ByVal vcCodInt As String, ByVal btIncDep As String, ByVal inCodEst As String, _
                                      ByVal vcValBus As String, ByVal inTip As String, ByVal strDatoEmpleado As String) As List(Of ENT_GEN_Organizacion)
        Try
            Dim Organizacion As BL_GEN_Organizacion = New BL_GEN_Organizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim lstOrganizacion As New List(Of ENT_GEN_Organizacion)

            If inTip = "0" Then
                lstOrganizacion = Organizacion.ListarDependencia(vcCodInt, Convert.ToBoolean(btIncDep), Convert.ToInt32(inCodEst))
            Else
                lstOrganizacion = Organizacion.ListarPorCodigoPorNombre(vcValBus, Convert.ToInt32(inCodEst))
            End If

            Organizacion.Dispose()
            Return lstOrganizacion
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarEmpleado(ByVal vcCodInt As String, ByVal btIncDep As String, ByVal inCodEst As String, _
                                          ByVal vcValBus As String, ByVal inTip As String, ByVal strDatoEmpleado As String, _
                                          ByVal btEmpLinDis As String) As Object
        Try
            Dim Empleado As BL_GEN_Empleado = New BL_GEN_Empleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            ''Dim Usuario As BL_SEG_Usuario = New BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim lstEmpleado As New List(Of ENT_GEN_Empleado)
            ''Dim dtUsuariosActivos As DataTable = Usuario.ListarUsuario
            Dim bDependencia As Boolean = False
            If btIncDep.ToLower = "true" Then
                bDependencia = True
            End If

            Dim bDependenciaEmpLinDis As Boolean = False
            If btEmpLinDis.ToLower = "true" Then
                bDependenciaEmpLinDis = True
            End If

            If "" & vcCodInt = "" Then
                vcCodInt = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            End If

            HttpContext.Current.Session("Reporte_Estructura_X_Linea") = vcCodInt & "|" & btIncDep & "|" & 1 & "|" & "" & "|" & inTip & "|" & strDatoEmpleado & "|" & btEmpLinDis

            If inTip = "0" Then
                lstEmpleado = Empleado.ListarPorOrganizacion(vcCodInt, bDependencia, 1, "", bDependenciaEmpLinDis)
            ElseIf inTip = "4" Then
                lstEmpleado = Empleado.ListarPorNombrePorCodigoEmpleado(vcCodInt, bDependencia, 1, strDatoEmpleado, bDependenciaEmpLinDis)
            Else
                lstEmpleado = Empleado.ListarPorNombrePorCodigo(vcValBus, 1)
            End If
            Empleado.Dispose()
            'Dim serializer As New JavaScriptSerializer()
            Dim dict As New Dictionary(Of String, Object)
            Dim lstRegistros As New List(Of Object)
            Dim dictItem2 As New Dictionary(Of String, Object)

            lstRegistros.Clear()

            Dim iTotalRegistros As Integer
            iTotalRegistros = lstEmpleado.Count
            If iTotalRegistros > 10000 Then iTotalRegistros = 10000

            For Indice As Integer = 0 To iTotalRegistros - 1
                Dim dictItem1 As New Dictionary(Of String, Object)
                Dim lstDataItem1 As New List(Of Object)
                Dim lstDataItem2 As New List(Of Object)

                'JHERRERA 20141027: Se cambió el indice por el código del empleado
                dictItem1.Add("id", lstEmpleado(Indice).P_vcCod.ToString())
                'dictItem1.Add("id", Indice)
                '-->

                lstDataItem1.Add("<span title='Click para Ver Detalle del Empleado' id='id_" & lstEmpleado(Indice).P_vcCod.ToString() & "' onclick='fnEmpleado_click(this);' nombreempleado='" & lstEmpleado(Indice).vcNom.ToString() & "' codigo='" & lstEmpleado(Indice).P_vcCod.ToString() & "' style='cursor:hand;cursor:pointer;color:#0000FF;text-decoration:underline;'>" & lstEmpleado(Indice).P_vcCod.ToString() & "</span>")
                'If (lstEmpleado(Indice).IdUsuario <> 0) Then
                '    lstDataItem1.Add("<img codigo='" & lstEmpleado(Indice).IdUsuario.ToString() & "' id='id_imguser_" & lstEmpleado(Indice).P_vcCod.ToString() & "' width='16px' src='../../../Images/Tickets/UsuarioConectado.png'/>")
                'Else
                '    lstDataItem1.Add("<img codigo='0' id='id_imguser_" & lstEmpleado(Indice).P_vcCod.ToString() & "' width='16px' src='../../../Images/Tickets/UsuarioDesconectado.png'/>")
                'End If
                lstDataItem1.Add(lstEmpleado(Indice).vcNom.ToString())
                lstDataItem1.Add(lstEmpleado(Indice).vcSucursal.ToString())
                lstDataItem1.Add(lstEmpleado(Indice).CentroCosto.P_vcCodCenCos.ToString() & "-" & lstEmpleado(Indice).CentroCosto.vcNomCenCos.ToString())
                lstDataItem1.Add(lstEmpleado(Indice).Area.vcCodOrg & "-" & lstEmpleado(Indice).Area.vcNomOrg)
                dictItem1.Add("data", lstDataItem1)
                lstRegistros.Add(dictItem1)
            Next
            'If lstRegistros.Count > 0 Then
            dict.Add("rows", lstRegistros)
            'End If

            'resultjson = serializer.Serialize(dict)
            Return dict


        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function


    <WebMethod()>
    Public Shared Function GrabarNivelMaximo(ByVal Nivel As String) As String
        Try

            Dim Usuario As BL_SEG_Usuario = New BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            oUsuario.CaracteristicaUsuario.NivelMaximoOrganizacion = CInt(Nivel)
            Usuario.GrabarNivelMaximo(oUsuario.P_inCod, CInt(Nivel))
            HttpContext.Current.Session("Usuario") = oUsuario
            Return "OK"
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    'JHERRERA 20150227: Nueva funcionalidad Responsable de Área
    <WebMethod()>
    Public Shared Function ListarResponsableArea(ByVal vcCodInt As String, ByVal btIncDep As String, ByVal inCodEst As String, _
                                          ByVal vcValBus As String, ByVal inTip As String, ByVal strDatoEmpleado As String, _
                                          ByVal btEmpLinDis As String) As Object
        Try
            Dim Empleado As BL_GEN_Empleado = New BL_GEN_Empleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim ResponsableArea As BL_MOV_OrgaJefatura = New BL_MOV_OrgaJefatura(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim Caracteristica As BL_MOV_Caracteristica = New BL_MOV_Caracteristica(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dtResponsable As DataTable = New DataTable()
            Dim bDependencia As Boolean = False
            If btIncDep.ToLower = "true" Then
                bDependencia = True
            End If

            Dim bDependenciaEmpLinDis As Boolean = False
            If btEmpLinDis.ToLower = "true" Then
                bDependenciaEmpLinDis = True
            End If

            If "" & vcCodInt = "" Then
                vcCodInt = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            End If

            If inTip = "0" Then
                dtResponsable = ResponsableArea.ListarResponsableAreaPorOrganizacion(vcCodInt, bDependencia, 1, "", bDependenciaEmpLinDis)
            ElseIf inTip = "4" Then
                dtResponsable = ResponsableArea.ListarResponsableAreaPorOrganizacion(vcCodInt, bDependencia, 1, strDatoEmpleado, bDependenciaEmpLinDis)
                'Else
                '    lstEmpleado = Empleado.ListarPorNombrePorCodigo(vcValBus, 1)
            End If
            Empleado.Dispose()
            Dim dict As New Dictionary(Of String, Object)
            Dim lstRegistros As New List(Of Object)
            'Dim dictItem2 As New Dictionary(Of String, Object)

            lstRegistros.Clear()

            Dim CampoReqAutorizacion As Integer = 0
            Try
                CampoReqAutorizacion = Caracteristica.ValidaCaracteristicaActiva("M_ORGA", "RequiereAutorizacion")
            Catch ex As Exception
                CampoReqAutorizacion = 0
            End Try

            For Indice As Integer = 0 To dtResponsable.Rows.Count - 1
                Dim dictItem1 As New Dictionary(Of String, Object)
                Dim lstDataItem1 As New List(Of Object)
                Dim lstDataItem2 As New List(Of Object)

                dictItem1.Add("id", dtResponsable(Indice)("P_vcCodEmp").ToString())

                lstDataItem1.Add("<span title='Click para Ver Detalle del Empleado' id='id_" & dtResponsable(Indice)("P_vcCodEmp").ToString() & "' onclick='fnEmpleado_click(this);' nombreempleado='" & dtResponsable(Indice)("vcNomEmp").ToString() & "' codigo='" & dtResponsable(Indice)("P_vcCodEmp").ToString() & "' style='cursor:hand;cursor:pointer;color:#0000FF;text-decoration:underline;'>" & dtResponsable(Indice)("P_vcCodEmp").ToString() & "</span>")
                lstDataItem1.Add(dtResponsable(Indice)("vcNomEmp").ToString())
                lstDataItem1.Add(dtResponsable(Indice)("TipoResposabilidad").ToString())
                lstDataItem1.Add(dtResponsable(Indice)("AreaResponsable").ToString())
                If (CampoReqAutorizacion = 1) Then
                    lstDataItem1.Add(dtResponsable(Indice)("EsAutorizador").ToString())
                End If

                dictItem1.Add("data", lstDataItem1)
                lstRegistros.Add(dictItem1)
            Next
            dict.Add("rows", lstRegistros)

            Return dict

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function CargarLineasDispositivosEmpleado(ByVal vcCodInt As String, ByVal btIncDep As String, ByVal inTip As String, _
                                                            ByVal intLineaDispositivo As Integer, ByVal strDatoEmpleado As String, _
                                                            ByVal btEmpLinDis As String) As Object
        Dim Empleado As BL_GEN_Empleado = Nothing
        Try
            Empleado = New BL_GEN_Empleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dtLineasDispositivos As New DataTable
            Dim bDependencia As Boolean = False
            If btIncDep.ToLower = "true" Then
                bDependencia = True
            End If

            Dim bDependenciaEmpLinDis As Boolean = False
            If btEmpLinDis.ToLower = "true" Then
                bDependenciaEmpLinDis = True
            End If

            'If inTip = "0" Then
            '    dtLineasDispositivos = Empleado.ListarLineasPorOrganizacion_ToSuite(vcCodInt, bDependencia, 1)
            'ElseIf inTip = "4" Then
            '    dtLineasDispositivos = Empleado.ListarLineasPorOrganizacion_ToSuite(vcCodInt, bDependencia, 1)            
            If inTip = "0" And intLineaDispositivo = 1 Then
                dtLineasDispositivos = Empleado.ListarLineasPorOrganizacion_ToSuite_Linea(vcCodInt, bDependencia, 1, bDependenciaEmpLinDis)
            ElseIf inTip = "0" And intLineaDispositivo = 2 Then
                dtLineasDispositivos = Empleado.ListarLineasPorOrganizacion_ToSuite_Dispositivo(vcCodInt, bDependencia, 1, bDependenciaEmpLinDis)
            ElseIf inTip = "4" And intLineaDispositivo = 1 Then
                dtLineasDispositivos = Empleado.ListarLineasPorOrganizacionYEmpleado_ToSuite_Linea(vcCodInt, bDependencia, 1, strDatoEmpleado, bDependenciaEmpLinDis)
            ElseIf inTip = "4" And intLineaDispositivo = 2 Then
                dtLineasDispositivos = Empleado.ListarLineasPorOrganizacionYEmpleado_ToSuite_Dispositivo(vcCodInt, bDependencia, 1, strDatoEmpleado, bDependenciaEmpLinDis)
            End If
            'Dim dtLineasDispositivos As DataTable = Empleado.ListarLineasDispositivosEmpleado(vcCodEmpleado, vcTipo, bDependencia)

            'Dim serializer As New JavaScriptSerializer()
            Dim dict As New Dictionary(Of String, Object)
            Dim lstRegistros As New List(Of Object)
            Dim dictItem2 As New Dictionary(Of String, Object)

            lstRegistros.Clear()
            Dim Indice As Integer = 0
            If intLineaDispositivo = 1 Then
                For Each dr As DataRow In dtLineasDispositivos.Rows
                    Dim dictItem1 As New Dictionary(Of String, Object)
                    Dim lstDataItem1 As New List(Of Object)
                    Dim lstDataItem2 As New List(Of Object)

                    dictItem1.Add("id", Indice)
                    'lstDataItem1.Add("<span id='id_" & lstEmpleado(Indice).P_vcCod.ToString() & "' onclick='fnEmpleado_click(this);' nombreempleado='" & lstEmpleado(Indice).vcNom.ToString() & "' codigo='" & lstEmpleado(Indice).P_vcCod.ToString() & "' style='cursor:hand;cursor:pointer;color:#0000FF;text-decoration:underline;'>" & lstEmpleado(Indice).P_vcCod.ToString() & "</span>")

                    'lstDataItem1.Add(dr("TipoLinea"))
                    lstDataItem1.Add(dr("Linea"))
                    'lstDataItem1.Add(dr("IMEI"))
                    'lstDataItem1.Add(dr("ModeloDispositivo"))
                    lstDataItem1.Add(dr("Empleado"))
                    lstDataItem1.Add(dr("NombrePlan"))
                    lstDataItem1.Add(dr("FechaInicioContrato"))
                    lstDataItem1.Add(dr("MesesContrato"))

                    dictItem1.Add("data", lstDataItem1)
                    lstRegistros.Add(dictItem1)

                    Indice = Indice + 1
                Next
            ElseIf intLineaDispositivo = 2 Then
                For Each dr As DataRow In dtLineasDispositivos.Rows
                    Dim dictItem1 As New Dictionary(Of String, Object)
                    Dim lstDataItem1 As New List(Of Object)
                    Dim lstDataItem2 As New List(Of Object)

                    dictItem1.Add("id", Indice)
                    'lstDataItem1.Add("<span id='id_" & lstEmpleado(Indice).P_vcCod.ToString() & "' onclick='fnEmpleado_click(this);' nombreempleado='" & lstEmpleado(Indice).vcNom.ToString() & "' codigo='" & lstEmpleado(Indice).P_vcCod.ToString() & "' style='cursor:hand;cursor:pointer;color:#0000FF;text-decoration:underline;'>" & lstEmpleado(Indice).P_vcCod.ToString() & "</span>")

                    'lstDataItem1.Add(dr("TipoLinea"))
                    'lstDataItem1.Add(dr("Linea"))
                    lstDataItem1.Add(dr("IMEI"))
                    lstDataItem1.Add(dr("ModeloDispositivo"))
                    lstDataItem1.Add(dr("Empleado"))
                    lstDataItem1.Add(dr("Linea"))
                    'lstDataItem1.Add(dr("FechaInicioContrato"))
                    'lstDataItem1.Add(dr("MesesContrato"))

                    dictItem1.Add("data", lstDataItem1)
                    lstRegistros.Add(dictItem1)

                    Indice = Indice + 1
                Next
            End If

            'If lstRegistros.Count > 0 Then
            dict.Add("rows", lstRegistros)
            'End If

            'resultjson = serializer.Serialize(dict)
            Return dict


        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Empleado IsNot Nothing Then Empleado.Dispose()
        End Try
    End Function

#Region "Movimiento Arbol Organizacion"

    Function fnMoverAreaBD_Step2(ByVal pstrCodIntOrigen As String, ByVal pstrCodIntDestino As String, ByRef pstrCodIntNewDestino As String,
                                 ByRef blYaExisteArea As Boolean, Optional ByRef pstrListaCodIntOlds As String = "", Optional ByRef Mensaje As String = "") As Boolean

        Dim _return As Boolean = False
        Dim strOld As String, strIntActual As String
        Dim strNewDestino As String
        blYaExisteArea = False

        pstrListaCodIntOlds = ""
        Mensaje = ""
        'Valida si los nuevas areas se sobrepasan la maxima longitud...
        Dim Organizacion As BL_GEN_Organizacion = New BL_GEN_Organizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

        Dim dtDatos As DataTable
        dtDatos = Organizacion.ListarLikeCodint2(pstrCodIntOrigen)
        If Not dtDatos Is Nothing Then
            For x As Integer = 0 To dtDatos.Rows.Count - 1
                strOld = ""
                strIntActual = "" & dtDatos.Rows(x)("ORGA_CodInt2")
                strNewDestino = Replace(strIntActual, pstrCodIntOrigen, pstrCodIntNewDestino, , 1)

                If dtDatos.Rows(x)("ORGA_btEST") = True Then
                    If Len(strNewDestino) > 240 Then
                        Mensaje = "No es posible realizar este cambio, ya que se sobrepasaria el máximo nivel de áreas."
                        _return = False
                        dtDatos = Nothing
                        GoTo Salir
                    End If
                End If
                Dim dtCantidadNiveles As DataTable = Organizacion.ListarCantidadNiveles()
                If Not dtCantidadNiveles Is Nothing Then
                    If dtDatos.Rows(x)("ORGA_btEST") = True Then
                        If Len(strNewDestino) / 3 > (dtCantidadNiveles.Rows(0)("CantNiveles") - 1) Then
                            Mensaje = "No es posible realizar este cambio, ya que el área a mover, o una de sus dependencias, sobrepasaría el máximo nivel permitido en su Organización."
                            _return = False
                            dtCantidadNiveles = Nothing
                            dtDatos = Nothing
                            GoTo Salir
                        End If
                    End If
                End If

                'Valida que las areas que se van a mover no esten en el mismo nivel en con el mismo código
                Dim dtBuscaDuplicado As DataTable = Organizacion.ListarOrgaIguales(dtDatos.Rows(x)("ORGA_vcCODORG"), CStr(Len(strNewDestino) / 3), strIntActual, pstrCodIntOrigen)
                If Not dtBuscaDuplicado Is Nothing Then
                    If dtBuscaDuplicado.Rows.Count > 0 Then
                        If dtDatos.Rows(x)("ORGA_btEST") = True Then
                            Mensaje = "No es posible continuar con este cambio, ya que se duplica el código en el nivel destino. " & vbCrLf & _
                                            "Esta validación afecta al nivel seleccionado y a sus respectivas dependencias." & vbCrLf & vbCrLf & _
                                            "Verificar el area: " & dtDatos.Rows(x)("ORGA_vcCODORG") & "=" & dtDatos.Rows(x)("ORGA_vcNOMORG")
                            _return = False
                            dtBuscaDuplicado = Nothing
                            dtDatos = Nothing
                            GoTo Salir
                        End If
                    End If
                End If

            Next

        End If


        Dim intPrimero As Integer
        Dim strCadena1 As String
        Dim strNivel As String
        Dim codintNewDestino As String
        Dim vIntOld As String

        dtDatos = Organizacion.ListarLikeCodint2(pstrCodIntOrigen)
        If Not dtDatos Is Nothing Then

            strOld = ""
            intPrimero = 1
            strCadena1 = ""

            For x As Integer = 0 To dtDatos.Rows.Count - 1

                'PONER AQUI FUNCION DE NUEVO NIVEL
                strIntActual = "" & dtDatos.Rows(x)("ORGA_CodInt2")
                strNewDestino = Replace(strIntActual, pstrCodIntOrigen, pstrCodIntNewDestino, , 1)
                strNivel = CStr(Len(strNewDestino) / 3)

                If dtDatos.Rows(x)("ORGA_btEST") = True Then


                    'aqui valida si no existe dicha area en el origen
                    'si existiese, solo debe cambiar su estado al Original
                    Dim dtDuplicado As DataTable = Organizacion.ListarOrgaDuplicadas(dtDatos.Rows(x)("ORGA_vcCODORG"), dtDatos.Rows(x)("ORGA_vcNOMORG"),
                                                                                      strNivel, dtDatos.Rows(x)("ORGA_F_vcCODCCO"), strIntActual, strNewDestino, intPrimero)
                    Dim blInsertar As Boolean = False
                    Dim intCodIntNuevo As Integer
                    If Not dtDuplicado Is Nothing Then
                        Dim intCodInt As Integer
                        If dtDuplicado.Rows.Count > 0 Then
                            If intPrimero = 1 Then
                                codintNewDestino = dtDuplicado.Rows(x)("ORGA_CodInt2")
                                pstrCodIntNewDestino = dtDuplicado.Rows(x)("ORGA_CodInt2")
                                strNewDestino = dtDuplicado.Rows(x)("ORGA_CodInt2")
                                ' strCadena1 = " and left(ORGA_CodInt2," & Len(codintNewDestino) & ")= '" & codintNewDestino & "'"
                            End If

                            blYaExisteArea = True
                            blInsertar = False

                            Organizacion.ActualizarEmail(dtDatos.Rows(x)("ORGA_vcCORPER"),
                                                         dtDatos.Rows(x)("ORGA_vcCORJFT"), IIf(dtDatos.Rows(x)("ORGA_btEST") = True, 1, 0),
                                                         dtDuplicado.Rows(0)("ORGA_CodInt2"))
                            intCodInt = fnObtenerintCodInt_por_strCodInt(dtDuplicado.Rows(0)("ORGA_CodInt2"))
                            Organizacion.ActualizarEmpleadosOrga(intCodInt.ToString, strNewDestino, strIntActual)
                            Organizacion.ActualizarUsuariosOrga(strNewDestino, strIntActual)
                            Organizacion.CesarOrga(strIntActual)                  ''''''''''''''''''''''''''''''
                        Else

                            intCodIntNuevo = fnObtenerNuevointCodInt()
                            blInsertar = True
                            'Obtiene CodIntPadre...
                            Dim strCodIntPadre As String = strNewDestino.Substring(0, strNewDestino.Length - 3)

                            Organizacion.IngresarOrga(dtDatos.Rows(x)("ORGA_vcCODORG"), dtDatos.Rows(x)("ORGA_vcNOMORG"), strNivel,
                                                      dtDatos.Rows(x)("ORGA_vcCORPER"), dtDatos.Rows(x)("ORGA_vcCORJFT"), dtDatos.Rows(x)("ORGA_F_vcCODCCO"),
                                                      strNewDestino.ToString, True)
                            Organizacion.CesarOrga(strIntActual)
                            Organizacion.ActualizarEmpleadosOrga(intCodIntNuevo.ToString, strNewDestino, strIntActual)
                            Organizacion.ActualizarUsuariosOrga(strNewDestino, strIntActual)
                        End If
                    End If
                    strOld = " s "
                    vIntOld = strIntActual
                    pstrListaCodIntOlds &= strIntActual & ","
                    intPrimero = intPrimero + 1
                End If
            Next
            intPrimero = 0
        End If
Salir:

        Organizacion.Dispose()

        Return _return

    End Function


    Function fnObtenerintCodInt_por_strCodInt(ByVal pstrCodInt As String) As String
        Dim _return As String = ""
        Dim Organizacion As BL_GEN_Organizacion = New BL_GEN_Organizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim dtDatos As DataTable = Organizacion.ObtenerCodintxCodint2(pstrCodInt)
        Organizacion.Dispose()
        If Not dtDatos Is Nothing AndAlso dtDatos.Rows.Count > 0 Then
            _return = dtDatos.Rows(0)(0)
        End If
        Return _return
    End Function

    Function fnObtenerNuevointCodInt() As Integer
        Dim _return As String = ""
        Dim Organizacion As BL_GEN_Organizacion = New BL_GEN_Organizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim dtDatos As DataTable = Organizacion.ObtenerUltimoCodint() ' no usa parametro
        Organizacion.Dispose()
        If Not dtDatos Is Nothing AndAlso dtDatos.Rows.Count > 0 Then
            _return = dtDatos.Rows(0)(0)
        End If
        Return _return
    End Function

    Function fnObtieneNuevoCodigoOrganizacion(ByVal strCodIntPadre As String) As String
        Dim _return As String
        Dim Organizacion As BL_GEN_Organizacion = New BL_GEN_Organizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim dtDatos As DataTable = Organizacion.ObtenerUltimoCodInt2(strCodIntPadre)
        Organizacion.Dispose()
        Dim strValor As String
        Dim strUltimo As String

        _return = strCodIntPadre & "001"
        If Not dtDatos Is Nothing AndAlso dtDatos.Rows.Count > 0 Then
            If Not IsDBNull(dtDatos.Rows(0)(0)) Then
                strValor = dtDatos.Rows(0)(0)
                strUltimo = strValor.Substring(strValor.Length - 3, 3)
                strValor = strValor.Substring(0, strValor.Length - 3)
                strUltimo = (CInt(strUltimo) + 1).ToString.Trim.PadLeft(3, "0")
                strValor &= strUltimo
                _return = strValor
            End If
        End If



        Return _return
    End Function



#End Region

    <WebMethod(EnableSession:=True)> _
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ListarCodigo(ByVal vcCodInt As String, ByVal btIncDep As String, ByVal inTip As String, _
                                        ByVal strDatoEmpleado As String, ByVal btEmpLinDis As String) As Object
        Try
            ' string filtro,string campoordenar,string orden
            Dim Codigo As New VisualSoft.PCSistel.BL.BL_GEN_Codigo()
            Dim dtCodigo As DataTable = New DataTable()
            Dim bDependencia As Boolean = False
            If btIncDep.ToLower = "true" Then
                bDependencia = True
            End If

            Dim bDependenciaEmpLinDis As Boolean = False
            If btEmpLinDis.ToLower = "true" Then
                bDependenciaEmpLinDis = True
            End If

            If inTip = "0" Then
                dtCodigo = Codigo.ListarCodigoPorOrganizacion_ToSuite(vcCodInt, bDependencia, 1, bDependenciaEmpLinDis)
            ElseIf inTip = "4" Then
                dtCodigo = Codigo.ListarCodigoPorOrganizacionYEmpleado_ToSuite(vcCodInt, bDependencia, 1, strDatoEmpleado, bDependenciaEmpLinDis)
            End If
            'dtCodigo = Codigo.ListarCodigoToPortalSuite(filtro, codOrga, "EMPL_vcNOMEMP", "", 2, bDependencia, 1) 'Anexo.BuscarAnexo(filtro, codOrga, campoordenar, orden)

            Dim dict As New Dictionary(Of String, Object)
            Dim lstRegistros As New List(Of Object)
            Dim dictItem2 As New Dictionary(Of String, Object)

            lstRegistros.Clear()
            Dim Indice As Integer = 0

            For Each dr As DataRow In dtCodigo.Rows
                Dim dictItem1 As New Dictionary(Of String, Object)
                Dim lstDataItem1 As New List(Of Object)
                Dim lstDataItem2 As New List(Of Object)

                dictItem1.Add("id", Indice)
                lstDataItem1.Add(dr("Anexo"))
                lstDataItem1.Add(dr("CodSuc"))
                lstDataItem1.Add(dr("Empleado"))
                lstDataItem1.Add(dr("Estado"))

                dictItem1.Add("data", lstDataItem1)
                lstRegistros.Add(dictItem1)

                Indice = Indice + 1
            Next

            dict.Add("rows", lstRegistros)
            Return dict
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod(EnableSession:=True)> _
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ListarAnexo(ByVal vcCodInt As String, ByVal btIncDep As String, ByVal inTip As String, _
                                        ByVal strDatoEmpleado As String, ByVal btEmpLinDis As String) As Object
        Try
            ' string filtro,string campoordenar,string orden
            Dim Anexo As New VisualSoft.PCSistel.BL.BL_GEN_Anexo()
            Dim dtAnexo As DataTable = New DataTable()
            Dim bDependencia As Boolean = False
            If btIncDep.ToLower = "true" Then
                bDependencia = True
            End If

            Dim bDependenciaEmpLinDis As Boolean = False
            If btEmpLinDis.ToLower = "true" Then
                bDependenciaEmpLinDis = True
            End If

            If inTip = "0" Then
                dtAnexo = Anexo.ListarAnexoPorOrganizacion_ToSuite(vcCodInt, bDependencia, 1)
            ElseIf inTip = "4" Then
                dtAnexo = Anexo.ListarAnexoPorOrganizacionYEmpleado_ToSuite(vcCodInt, bDependencia, 1, strDatoEmpleado)
            End If
            'dtAnexo = Anexo.ListarAnexoToPortalSuite(filtro, codOrga, "EMPL_vcNOMEMP", "", 2, bDependencia, 1) 'Anexo.BuscarAnexo(filtro, codOrga, campoordenar, orden)

            Dim dict As New Dictionary(Of String, Object)
            Dim lstRegistros As New List(Of Object)
            Dim dictItem2 As New Dictionary(Of String, Object)

            lstRegistros.Clear()
            Dim Indice As Integer = 0

            For Each dr As DataRow In dtAnexo.Rows
                Dim dictItem1 As New Dictionary(Of String, Object)
                Dim lstDataItem1 As New List(Of Object)
                Dim lstDataItem2 As New List(Of Object)

                dictItem1.Add("id", Indice)
                'lstDataItem1.Add("<span id='id_" & lstEmpleado(Indice).P_vcCod.ToString() & "' onclick='fnEmpleado_click(this);' nombreempleado='" & lstEmpleado(Indice).vcNom.ToString() & "' codigo='" & lstEmpleado(Indice).P_vcCod.ToString() & "' style='cursor:hand;cursor:pointer;color:#0000FF;text-decoration:underline;'>" & lstEmpleado(Indice).P_vcCod.ToString() & "</span>")
                lstDataItem1.Add(dr("Anexo"))
                lstDataItem1.Add(dr("CodSuc"))
                lstDataItem1.Add(dr("Empleado"))
                lstDataItem1.Add(dr("Estado"))

                dictItem1.Add("data", lstDataItem1)
                lstRegistros.Add(dictItem1)

                Indice = Indice + 1
            Next

            dict.Add("rows", lstRegistros)
            Return dict

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function
End Class

