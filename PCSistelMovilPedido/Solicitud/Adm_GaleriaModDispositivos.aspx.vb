Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Data
Imports System.IO
Imports VisualSoft.Comun.Utilitarios
Imports CompCorreo

Public Class Adm_GaleriaModDispositivos
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Empleado As BL_GEN_Empleado
        Try
            If IsNothing(Session("Usuario")) Then
                Dim script As String = "window.parent.location.reload()"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim vcCodEmp As String = ""
                    Dim permiteLinea As String = Request.QueryString("lin")
                    Dim codModDis As String = ""
                    Dim tipSolicitud As String = ""

                    If Not IsNothing(Request.QueryString("mod")) Then
                        codModDis = Request.QueryString("mod").ToString
                    End If
                    If Not IsNothing(Request.QueryString("vcCodEmp")) Then
                        vcCodEmp = Request.QueryString("vcCodEmp").ToString
                    End If
                    If Not IsNothing(Request.QueryString("tipSol")) Then
                        tipSolicitud = Request.QueryString("tipSol")
                    End If


                    If permiteLinea = "0" Then
                        divSolLin.Style("display") = "none"
                    End If

                    Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

                    If vcCodEmp <> "" Then
                        'divSeguridad.Visible = False
                        ListarModelos(vcCodEmp, codModDis, tipSolicitud)
                        'hdfEmpleado.Value = vcCodEmp
                        'jherrera 20130515
                        '-----------------
                        'hdfLinea.Value = Request.QueryString("dcNumLin").ToString
                        '-----------------
                        'hdfGaleria.Value = "1"
                    Else
                        'container.Visible = False
                        'divEnvio.Visible = False
                        'hdfGaleria.Value = "0"
                        If oUsuario.Empleado.P_vcCod <> "" Then
                            Empleado = New BL_GEN_Empleado(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                            'lblEmpleado.Text = oUsuario.Empleado.P_vcCod & " - " & Empleado.Mostrar(oUsuario.Empleado.P_vcCod).vcNom
                            'txtEmpleado.Style("display") = "none"
                            'hdfCodEmpleado.Value = oUsuario.Empleado.P_vcCod
                        Else
                            'lblEmpleado.Style("display") = "none"
                            'hdfEmpleado.Value = ""
                        End If
                    End If
                    Utilitario.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If Empleado IsNot Nothing Then
                Empleado.Dispose()
            End If
        End Try
    End Sub

    Private Sub ListarModelos(ByVal vcCodEmp As String, ByVal codMod As String, ByVal tipSol As Integer)
        Dim ModeloDispositivo As BL_MOV_ModeloDispositivo
        Dim Caracteristica As BL_MOV_Caracteristica
        Try
            ModeloDispositivo = New BL_MOV_ModeloDispositivo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Caracteristica = New BL_MOV_Caracteristica(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim lstCaracteristica As DataTable
            Dim lstModeloDispositivo As New DataTable

            lstCaracteristica = Caracteristica.ListarxTabla("MOV_ModeloDispositivo")

            If (codMod <> "") Then 'dispositivos compatibles con el plan del dispositivo a cambiar
                lstModeloDispositivo = ModeloDispositivo.ListarPorGrupo_PorPlan(vcCodEmp, codMod) 'solicitud tipo 1 - cambio
            Else
                lstModeloDispositivo = ModeloDispositivo.ListarPorGrupo(vcCodEmp) 'solicitud tipo 2 - nuevo
            End If

            If lstModeloDispositivo.Rows.Count > 0 Then
                divNoDispositivos.Style("display") = "none"
                divGaleria.Style("display") = ""
                For Each drMD As DataRow In lstModeloDispositivo.Rows
                    ListarModelo(drMD, lstCaracteristica)
                    'Select Case tipSol
                    '    Case 1
                    '        If (drMD("P_inCod").ToString <> codMod) Then
                    '            ListarModelo(drMD, lstCaracteristica)
                    '        End If
                    '    Case 2
                    '        ListarModelo(drMD, lstCaracteristica)
                    '    Case 3
                    '        ListarModelo(drMD, lstCaracteristica)
                    'End Select
                Next
            Else
                divNoDispositivos.Style("display") = ""
                divGaleria.Style("display") = "none"
                Dim Script As String = "parent.DesabilitarContinuar();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", Script, True)
                'container.Visible = False
                'hdfGaleria.Value = "-1"
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If ModeloDispositivo IsNot Nothing Then
                ModeloDispositivo.Dispose()
            End If
            If Caracteristica IsNot Nothing Then
                Caracteristica.Dispose()
            End If
        End Try
    End Sub

    Private Sub ListarModelo(ByVal drMD As DataRow, ByVal lstCaracteristica As DataTable)
        Dim li As New HtmlGenericControl("li")
        Dim athumb As New HtmlGenericControl("a")
        Dim divcaption As New HtmlGenericControl("div")
        Dim imgthumb As New HtmlImage
        Dim tbCamposDinamicos As New HtmlTable

        athumb.Attributes("class") = "thumb"
        athumb.Attributes("name") = "leaf"
        imgthumb.Height = 100
        imgthumb.Width = 100

        divcaption.Attributes("class") = "caption"

        athumb.Controls.Add(imgthumb)

        Dim trD As New HtmlTableRow
        Dim tdD As New HtmlTableCell
        Dim tdI As New HtmlTableCell
        tdI.InnerText = "Modelo"
        tdD.InnerText = Trim(drMD("vcNom").ToString)

        Dim hdfId As New HiddenField
        hdfId.Value = drMD("P_inCod").ToString

        tdD.Controls.Add(hdfId)

        trD.Cells.Add(tdI)
        trD.Cells.Add(tdD)
        tbCamposDinamicos.Rows.Add(trD)

        If Not IsDBNull(drMD("imIma")) Then
            Dim barrImg As Byte() = CType(drMD("imIma"), Byte())
            Dim archivo As String = drMD("P_inCod").ToString & ".jpg"
            Dim strfn As String = Server.MapPath("~/Common/Images/ModeloDispositivo/" + archivo)
            Dim fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write)
            fs.Write(barrImg, 0, barrImg.Length)
            fs.Flush()
            fs.Close()
            imgthumb.Src = "~/Common/Images/ModeloDispositivo/" + archivo
            imgthumb.Alt = Trim(drMD("vcNom").ToString)
            imgthumb.Width = 90
            imgthumb.Height = 90
            athumb.Attributes("href") = "~/Common/Images/ModeloDispositivo/" + archivo
            athumb.Attributes("title") = Trim(drMD("vcNom").ToString)
        Else
            imgthumb.Src = "~/Common/Images/NoDisponible.jpg"
            imgthumb.Alt = "Imagen no disponible"
            imgthumb.Width = 90
            imgthumb.Height = 90
            athumb.Attributes("href") = "~/Common/Images/NoDisponible.jpg" 'Ruta de imagen
            athumb.Attributes("title") = Trim(drMD("vcNom").ToString)
        End If

        If lstCaracteristica.Rows.Count > 0 Then
            'Obtiene controles dinámicos con sus respectivos valores...
            GeneralMantenimiento.Instance.CrearLabelsDinamicosMantenimiento("MOV_ModeloDispositivo", drMD, tbCamposDinamicos)

            divcaption.Controls.Add(tbCamposDinamicos)
        Else
            imgthumb.Src = "../../Common/Images/Mantenimiento/NoDisponible.jpg"
            imgthumb.Alt = Trim(drMD("vcNom").ToString)
            athumb.Attributes("href") = "../../Common/Images/Mantenimiento/NoDisponible.jpg" 'Ruta de imagen
            athumb.Attributes("title") = Trim(drMD("vcNom").ToString) 'Titulo
            divcaption.Controls.Add(New LiteralControl("<div class=""image-title"">" & Trim(drMD("vcNom").ToString) & "</div>"))
        End If

        li.Controls.Add(athumb)
        li.Controls.Add(divcaption)
        ulGaleria.Controls.Add(li)
    End Sub

End Class

'    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
'        Try
'            If IsNothing(Session("Usuario")) Then
'                Dim script As String = "window.parent.location.reload()"
'                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
'            Else
'                If Not IsPostBack Then
'                    Dim vcCodEmp As String = ""
'                    Dim permiteLinea As String = Request.QueryString("lin")

'                    If Not IsNothing(Request.QueryString("vcCodEmp")) Then
'                        vcCodEmp = Request.QueryString("vcCodEmp").ToString
'                    End If

'                    If permiteLinea = "0" Then
'                        divSolLin.Style("display") = "none"
'                    End If

'                    Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

'                    If vcCodEmp <> "" Then
'                        'divSeguridad.Visible = False
'                        ListarModelos(vcCodEmp)
'                        'hdfEmpleado.Value = vcCodEmp
'                        'jherrera 20130515
'                        '-----------------
'                        'hdfLinea.Value = Request.QueryString("dcNumLin").ToString
'                        '-----------------
'                        'hdfGaleria.Value = "1"
'                    Else
'                        'container.Visible = False
'                        'divEnvio.Visible = False
'                        'hdfGaleria.Value = "0"
'                        If oUsuario.Empleado.P_vcCod <> "" Then
'                            Dim Empleado As BL_GEN_Empleado = BL_GEN_Empleado.Instance(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

'                            'lblEmpleado.Text = oUsuario.Empleado.P_vcCod & " - " & Empleado.Mostrar(oUsuario.Empleado.P_vcCod).vcNom
'                            'txtEmpleado.Style("display") = "none"
'                            'hdfCodEmpleado.Value = oUsuario.Empleado.P_vcCod
'                        Else
'                            'lblEmpleado.Style("display") = "none"
'                            'hdfEmpleado.Value = ""
'                        End If
'                    End If
'                    Utilitario.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
'                End If
'            End If
'        Catch ex As Exception
'            Dim util As New Utilitarios
'            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil,HttpContext.Current.Session("Usuario"))
'            Throw New Exception(Utilitario.MensajeError)
'        End Try
'    End Sub

'    Private Sub ListarModelos(ByVal vcCodEmp As String)
'        Try
'            Dim ModeloDispositivo As BL_MOV_ModeloDispositivo = BL_MOV_ModeloDispositivo.Instance(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
'            Dim Caracteristica As BL_MOV_Caracteristica = BL_MOV_Caracteristica.Instance(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
'            Dim lstCaracteristica As DataTable
'            Dim lstModeloDispositivo As DataTable

'            lstCaracteristica = Caracteristica.ListarxTabla("MOV_ModeloDispositivo")
'            lstModeloDispositivo = ModeloDispositivo.ListarPorGrupo(vcCodEmp)

'            If lstModeloDispositivo.Rows.Count > 0 Then
'                For Each drMD As DataRow In lstModeloDispositivo.Rows
'                    Dim li As New HtmlGenericControl("li")
'                    Dim athumb As New HtmlGenericControl("a")
'                    Dim divcaption As New HtmlGenericControl("div")
'                    Dim imgthumb As New HtmlImage
'                    Dim tbCamposDinamicos As New HtmlTable

'                    athumb.Attributes("class") = "thumb"
'                    athumb.Attributes("name") = "leaf"
'                    imgthumb.Height = 100
'                    imgthumb.Width = 100

'                    divcaption.Attributes("class") = "caption"

'                    athumb.Controls.Add(imgthumb)

'                    Dim trD As New HtmlTableRow
'                    Dim tdD As New HtmlTableCell
'                    Dim tdI As New HtmlTableCell
'                    tdI.InnerText = "Modelo"
'                    tdD.InnerText = Trim(drMD("vcNom").ToString)

'                    Dim hdfId As New HiddenField
'                    hdfId.Value = drMD("P_inCod").ToString

'                    tdD.Controls.Add(hdfId)

'                    trD.Cells.Add(tdI)
'                    trD.Cells.Add(tdD)
'                    tbCamposDinamicos.Rows.Add(trD)

'                    If Not IsDBNull(drMD("imIma")) Then
'                        Dim barrImg As Byte() = CType(drMD("imIma"), Byte())
'                        Dim archivo As String = drMD("P_inCod").ToString & ".jpg"
'                        Dim strfn As String = Server.MapPath("~/Images/ModeloDispositivo/" + archivo)
'                        Dim fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write)
'                        fs.Write(barrImg, 0, barrImg.Length)
'                        fs.Flush()
'                        fs.Close()
'                        imgthumb.Src = "../../Images/ModeloDispositivo/" + archivo
'                        imgthumb.Alt = Trim(drMD("vcNom").ToString)
'                        imgthumb.Width = 90
'                        imgthumb.Height = 90
'                        athumb.Attributes("href") = "../../Images/ModeloDispositivo/" + archivo
'                        athumb.Attributes("title") = Trim(drMD("vcNom").ToString)
'                    Else
'                        imgthumb.Src = "../../Common/Images/Mantenimiento/NoDisponible.jpg"
'                        imgthumb.Alt = "Imagen no disponible"
'                        imgthumb.Width = 90
'                        imgthumb.Height = 90
'                        athumb.Attributes("href") = "../../Common/Images/Mantenimiento/NoDisponible.jpg" 'Ruta de imagen
'                        athumb.Attributes("title") = Trim(drMD("vcNom").ToString)
'                    End If

'                    If lstCaracteristica.Rows.Count > 0 Then
'                        'Obtiene controles dinámicos con sus respectivos valores...
'                        GeneralMantenimiento.Instance.CrearLabelsDinamicosMantenimiento("MOV_ModeloDispositivo", drMD, tbCamposDinamicos)

'                        divcaption.Controls.Add(tbCamposDinamicos)
'                    Else
'                        imgthumb.Src = "../../Common/Images/Mantenimiento/NoDisponible.jpg"
'                        imgthumb.Alt = Trim(drMD("vcNom").ToString)
'                        athumb.Attributes("href") = "../../Common/Images/Mantenimiento/NoDisponible.jpg" 'Ruta de imagen
'                        athumb.Attributes("title") = Trim(drMD("vcNom").ToString) 'Titulo
'                        divcaption.Controls.Add(New LiteralControl("<div class=""image-title"">" & Trim(drMD("vcNom").ToString) & "</div>"))
'                    End If

'                    li.Controls.Add(athumb)
'                    li.Controls.Add(divcaption)
'                    ulGaleria.Controls.Add(li)
'                Next
'            Else

'                'container.Visible = False
'                'hdfGaleria.Value = "-1"
'            End If
'        Catch ex As Exception
'            Dim util As New Utilitarios
'            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil,HttpContext.Current.Session("Usuario"))
'            Throw New Exception(Utilitario.MensajeError)
'        End Try
'    End Sub
'End Class
