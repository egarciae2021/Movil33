Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.IO
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_Consultar_Con_SeleccionArea
   Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim Nivel As BL_GEN_Nivel = New BL_GEN_Nivel(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim lstNivel As List(Of ENT_GEN_Nivel) = Nivel.Listar()
                    Nivel.Dispose()
                    hdfTipo.Value = Request.QueryString("Tipo")
                    hdfMultiple.Value = Request.QueryString("Multiple")
                    hdfEmpleado.Value = Request.QueryString("vcCodEmp")

                    'Determina la cantidad de paneles, pero sólo si multiple es 1
                    If Request.QueryString("UnPanel") IsNot Nothing Then
                        hdfUnPanel.Value = Request.QueryString("UnPanel")
                    Else
                        hdfUnPanel.Value = "0"
                    End If

                    Dim empl = Request.QueryString("Empleados")
                    hdfInCodTip.Value = Request.QueryString("inCodTip")
                    hdfEsResponsable.Value = "" & Request.QueryString("EsResponsable")

                    If hdfTipo.Value = "1" Then
                        dvDatosSeleccion.InnerHtml = "Áreas disponibles"
                    ElseIf hdfTipo.Value = "2" Then
                        dvDatosSeleccion.InnerHtml = "Empleados disponibles"
                    ElseIf hdfTipo.Value = "3" Then
                        dvDatosSeleccion.InnerHtml = "Celulares disponibles"
                        'ElseIf hdfTipo.Value = "4" Then '11-02-2014 - wapumayta
                        '    dvDatosSeleccion.InnerHtml = "Usuarios disponibles"
                    End If

                    If hdfMultiple.Value = "0" Then
                        tdControles.Style("display") = "none"
                        tdDatosSeleccionados.Style("display") = "none"
                        'tdDatosSeleccion.Style("width") = "600px"
                        lstResultado.Width = New Unit(410)
                        lstResultado.SelectionMode = ListSelectionMode.Single
                    ElseIf hdfMultiple.Value = "1" And hdfUnPanel.Value = "1" Then
                        tdControles.Style("display") = "none"
                        tdDatosSeleccionados.Style("display") = "none"
                        lstResultado.Width = New Unit(410)
                    End If

                    For Each oNivel As ENT_GEN_Nivel In lstNivel
                        oNivel.vcUrlIcoNiv = "~/Common/Images/Controles/dhtmlx/TreeView/Niveles/" & oNivel.P_inCodNiv & ".ico"

                        If oNivel.imIcoNiv IsNot Nothing Then
                            Try
                                Dim strfn As String = Server.MapPath(oNivel.vcUrlIcoNiv)
                                Dim fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write)
                                fs.Write(oNivel.imIcoNiv, 0, oNivel.imIcoNiv.Length)
                                fs.Flush()
                                fs.Close()
                            Catch
                            End Try
                        End If
                    Next

                    If hdfEmpleado.Value <> "" Then
                        Dim Linea As BL_MOV_Linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        Dim lstLinea As New List(Of ENT_MOV_Linea)

                        lstLinea = Linea.ListarPorEmpleado(hdfEmpleado.Value, -1, IIf(hdfInCodTip.Value.ToString() = "", -1, hdfInCodTip.Value))
                        Linea.Dispose()
                        TabOpciones.Visible = False
                        dvEstado.Visible = False
                        tdOpciones.Style("width") = "145px"
                        For Each oLinea As ENT_MOV_Linea In lstLinea
                            lstResultado.Items.Add(New ListItem(oLinea.P_vcNum & "=" & oLinea.Empleado.vcNom, oLinea.P_vcNum))
                        Next
                    End If
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function ListarPrincipal(ByVal vcCodInt As String) As List(Of Object)
        Try
            Dim Organizacion As BL_GEN_Organizacion = New BL_GEN_Organizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            vcCodInt = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            If vcCodInt Is Nothing OrElse vcCodInt.Trim = "" Then vcCodInt = "001"

            Dim oOrganizacion As ENT_GEN_Organizacion

            If (vcCodInt.Contains(",")) Then
                oOrganizacion = Organizacion.ObtieneOrganizacion("001")
            Else
                oOrganizacion = Organizacion.ObtieneOrganizacion(vcCodInt)
            End If

            'Dim oOrganizacion As ENT_GEN_Organizacion = Organizacion.ObtieneOrganizacion(vcCodInt)
            Organizacion.Dispose()
            Dim NodoPrincipal As New List(Of Object)
            Dim PrimerNivel As New List(Of Object)
            'PrimerNivel.Add(vcCodInt)
            PrimerNivel.Add(If((vcCodInt.Contains(",")), "001", vcCodInt))
            PrimerNivel.Add(0)
            PrimerNivel.Add(oOrganizacion.vcNomOrg)
            PrimerNivel.Add(If((vcCodInt.Contains(",")), True, False))
            NodoPrincipal.Add(PrimerNivel)
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
            'Dim Organizacion As BL_GEN_Organizacion = New BL_GEN_Organizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            'Dim _return As List(Of ENT_GEN_Organizacion) = Organizacion.ListarDependencia(vcCodInt)

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
    Public Shared Function ListarArea(ByVal vcCodInt As String, ByVal btIncDep As String, ByVal inCodEst As String,
                                      ByVal vcValBus As String, ByVal inTip As String, ByVal TipoBusqueda As String) As List(Of ENT_GEN_Organizacion)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Organizacion As BL_GEN_Organizacion = Nothing
        Try

            'Dim vcCodIntUsuario As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            'If vcCodIntUsuario = "" OrElse Len(vcCodIntUsuario) = 3 Then
            '    'If vcCodInt Is Nothing OrElse vcCodInt.Trim = "" Then vcCodInt = "001"
            'Else
            '    vcCodInt = vcCodIntUsuario
            'End If


            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Organizacion = New BL_GEN_Organizacion(oUsuario.IdCliente)
            Dim lstOrganizacion As New List(Of ENT_GEN_Organizacion)
            Dim lstOrganizacion2 As New List(Of ENT_GEN_Organizacion)

            If inTip = "0" Then
                lstOrganizacion2 = Organizacion.ListarDependencia(vcCodInt, Convert.ToBoolean(btIncDep), Convert.ToInt32(inCodEst))
            Else
                lstOrganizacion2 = Organizacion.ListarPorCodigoPorNombre(vcValBus, Convert.ToInt32(inCodEst), oUsuario.F_vcCodInt)
            End If
            If vcCodInt <> "" Then
                Dim oENT_GEN_Organizacion As ENT_GEN_Organizacion = Organizacion.ObtieneOrganizacion(vcCodInt)
                oENT_GEN_Organizacion.btVig = True
                oENT_GEN_Organizacion.vcCodInt = vcCodInt
                lstOrganizacion.Add(oENT_GEN_Organizacion)
            End If
            lstOrganizacion.AddRange(lstOrganizacion2)

            Return (lstOrganizacion)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Organizacion) Then Organizacion.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarEmpleado(ByVal EsResponsable As String, ByVal vcCodInt As String, ByVal btIncDep As String,
                                          ByVal inCodEst As String, ByVal vcValBus As String, ByVal inTip As String,
                                          ByVal TipoBusqueda As String) As List(Of ENT_GEN_Empleado)
        Dim Empleado As BL_GEN_Empleado = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Empleado = New BL_GEN_Empleado(oUsuario.IdCliente)
            Dim lstEmpleado As New List(Of ENT_GEN_Empleado)
            If inTip = "0" Then
                lstEmpleado = Empleado.ListarPorOrganizacion(vcCodInt, Convert.ToBoolean(btIncDep), Convert.ToInt32(inCodEst), EsResponsable, "0")
            Else
                lstEmpleado = Empleado.ListarPorNombrePorCodigo(vcValBus, Convert.ToInt32(inCodEst), oUsuario.F_vcCodInt, TipoBusqueda)
            End If
            Return lstEmpleado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Empleado) Then Empleado.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarEmpleadoString(ByVal EsResponsable As String, ByVal vcCodInt As String, ByVal btIncDep As String,
                                                ByVal inCodEst As String, ByVal vcValBus As String, ByVal inTip As String,
                                                ByVal TipoBusqueda As String) As String
        Dim Empleado As BL_GEN_Empleado = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Empleado = New BL_GEN_Empleado(oUsuario.IdCliente)
            Dim Resultado As String
            Resultado = Empleado.ListarPorOrganizacionString(vcCodInt, Convert.ToBoolean(btIncDep), Convert.ToInt32(inCodEst), EsResponsable)
            Return Resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Empleado) Then Empleado.Dispose()
        End Try
    End Function


    <WebMethod()>
    Public Shared Function ListarLinea(ByVal vcCodInt As String, ByVal btIncDep As String, ByVal inCodEst As String,
                                       ByVal vcValBus As String, ByVal inTip As String, ByVal TipoBusqueda As String) As List(Of ENT_MOV_Linea)
        Dim Linea As BL_MOV_Linea = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Linea = New BL_MOV_Linea(oUsuario.IdCliente)
            Dim lstLinea As New List(Of ENT_MOV_Linea)
            If inTip = "0" Then
                lstLinea = Linea.ListarPorOrganizacion(vcCodInt, Convert.ToBoolean(btIncDep), Convert.ToInt32(inCodEst))
            Else
                lstLinea = Linea.ListarPorLineaPorEmpleado(vcValBus, Convert.ToInt32(inCodEst), oUsuario.F_vcCodInt)
            End If
            Return lstLinea
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Linea) Then Linea.Dispose()
        End Try
    End Function

   '<WebMethod()>
   'Public Shared Function ListarUsuario(ByVal vcCodInt As String, ByVal btIncDep As String, ByVal inCodEst As String, ByVal vcValBus As String, ByVal inTip As String) As List(Of ENT_SEG_Usuario)
   '    Try
   '        Dim Usuario As BL_SEG_Usuario = new BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
   '        Dim lstUsuario As New List(Of ENT_SEG_Usuario)
   '
   '        Return lstUsuario
   '    Catch ex As Exception
   '        Dim util As New Utilitarios
   '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil,HttpContext.Current.Session("Usuario"))
   '        Throw New Exception(UtilitarioWeb.MensajeError)
   '    End Try
   'End Function
End Class
