Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Data
Imports System.IO
Imports VisualSoft.Comun.Utilitarios
Imports CompCorreo
Imports System.Drawing
Imports UtilitarioWeb
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_Administrar_Adm_GaleriaModDispositivos2
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim vcCodEmp As String = ""
                    Dim permiteLinea As String = Request.QueryString("lin")
                    Dim codPlan As Integer = 0
                    Dim tipSolicitud As String = ""
                    Dim inCodOpe As Integer

                    hdfCodEmpleado.Value = "-1"
                    hdfCodPlan.Value = "0"
                    If Not IsNothing(Request.QueryString("plan")) Then
                        codPlan = Convert.ToInt32(Request.QueryString("plan"))
                        hdfCodPlan.Value = codPlan
                    End If
                    If Not IsNothing(Request.QueryString("vcCodEmp")) Then
                        vcCodEmp = Request.QueryString("vcCodEmp").ToString
                        hdfCodEmpleado.Value = vcCodEmp
                    End If
                    If Not IsNothing(Request.QueryString("tipSol")) Then
                        tipSolicitud = Request.QueryString("tipSol")
                    End If
                    If Not IsNothing(Request.QueryString("inCodOpe")) Then
                        inCodOpe = Convert.ToInt32(Request.QueryString("inCodOpe"))
                        hdfCodOpe.Value = inCodOpe
                    End If

                    hdfTipoSolicitud.Value = tipSolicitud
                    'comentado 22/08/2014 - wapumayta (RespTck:1374)(plan no sera escogido en la creacion)
                    hdfPermiteLinea.Value = permiteLinea
                    If permiteLinea = "0" Then
                        divSolLin.Style("display") = "none"
                    End If

                    Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

                    'cargar operadores
                    If codPlan = 0 Then
                        Dim Operador As New BL_GEN_Operador(oUsuario.IdCliente)
                        Operador.Listar()
                    End If

                    If vcCodEmp <> "" Then
                        'divSeguridad.Visible = False
                        ListarModelos(vcCodEmp, codPlan, tipSolicitud, inCodOpe)
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
                            'Dim Empleado As BL_GEN_Empleado = new BL_GEN_Empleado(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                            'lblEmpleado.Text = oUsuario.Empleado.P_vcCod & " - " & Empleado.Mostrar(oUsuario.Empleado.P_vcCod).vcNom
                            'txtEmpleado.Style("display") = "none"
                            'hdfCodEmpleado.Value = oUsuario.Empleado.P_vcCod
                        Else
                            'lblEmpleado.Style("display") = "none"
                            'hdfEmpleado.Value = ""
                        End If
                    End If
                    UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    Private Sub ListarModelos(ByVal vcCodEmp As String, ByVal codPlan As Integer, ByVal tipSol As Integer, Optional ByRef inCodOpe As Integer = -1)
        Try
            Dim ModeloDispositivo As BL_MOV_ModeloDispositivo = New BL_MOV_ModeloDispositivo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim Caracteristica As BL_MOV_Caracteristica = New BL_MOV_Caracteristica(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim lstCaracteristica As DataTable
            Dim lstModeloDispositivo As New DataTable
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)

            lstCaracteristica = Caracteristica.ListarxTabla("MOV_ModeloDispositivo", "", "")
            Caracteristica.Dispose()
            If (codPlan <> 0) Then 'dispositivos compatibles con el plan del dispositivo a cambiar
                lstModeloDispositivo = ModeloDispositivo.ListarPorGrupo_PorPlan(vcCodEmp, codPlan, inCodOpe) 'solicitud tipo 1 - cambio
            Else
                lstModeloDispositivo = ModeloDispositivo.ListarPorGrupo(vcCodEmp, inCodOpe) 'solicitud tipo 2 - nuevo
            End If
            ModeloDispositivo.Dispose()
            If lstModeloDispositivo.Rows.Count > 0 Then
                divNoDispositivos_x_Plan.Style("display") = "none"
                divNoDispositivos_x_Grupo.Style("display") = "none"
                divGaleria.Style("display") = ""

                '
                Dim lstOperadores As List(Of ENT_GEN_Operador) = Nothing
                If codPlan = 0 Then
                    Dim Operador As New BL_GEN_Operador(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    lstOperadores = Operador.Listar()
                End If

                For Each drMD As DataRow In lstModeloDispositivo.Rows
                    ListarModelo(drMD, lstCaracteristica, codPlan, lstOperadores, inCodOpe)
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
                'div seleccion linea (default btSopLin del primer dispositivo mostrado)

                'comentado 22/08/2014 - wapumayta (RespTck:1374)(plan no sera escogido en la creacion)
                'If (lstModeloDispositivo.Rows(0)("btSopLin") = False) Then
                '    divSolLin.Style("display") = "none"
                '    hdfDispSelectSopLin.Value = "0"
                'Else
                '    hdfDispSelectSopLin.Value = "1"
                'End If

                'envio del primer codigo
                'hdfCodModeloDisp.Value = lstModeloDispositivo.Rows(0)("P_inCod").ToString()
                'Dim costoCambio = "-1"
                'If inCodOpe <> -1 And inCodOpe <> 0 Then
                '    costoCambio = DevuelveNumeroFormateado(lstModeloDispositivo.Rows(0)("dePreLis").ToString(), oCultura)
                'End If
                ''If hdfCodPlan.Value <> "0" Then
                ''    costoCambio = DevuelveNumeroFormateado(lstModeloDispositivo.Rows(0)("dePreLis").ToString(), oCultura)
                ''End If
                'Dim Script As String = "window.parent.codDispositivoGaleria(" + lstModeloDispositivo.Rows(0)("P_inCod").ToString() + ",""" + lstModeloDispositivo.Rows(0)("vcNom").ToString() + """,""" + costoCambio + """);"
                'Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", Script, True)
            Else
                If codPlan <> 0 Then
                    divNoDispositivos_x_Plan.Style("display") = ""
                Else
                    divNoDispositivos_x_Grupo.Style("display") = ""
                End If

                divGaleria.Style("display") = "none"
                Dim Script As String = "parent.DeshabilitarContinuar();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", Script, True)
                'container.Visible = False
                'hdfGaleria.Value = "-1"
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    Private Sub ListarModelo(ByVal drMD As DataRow, ByVal lstCaracteristica As DataTable, ByVal codPlan As Integer, _
                             lstOperadores As List(Of ENT_GEN_Operador), Optional ByRef inCodOpe As Integer = -1)
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        Dim li As New HtmlGenericControl("li")
        Dim athumb As New HtmlGenericControl("a")
        Dim divcaption As New HtmlGenericControl("div")
        Dim imgthumb As New HtmlImage
        Dim tbCamposDinamicos As New HtmlTable

        athumb.Attributes("class") = "thumb"
        athumb.Attributes("name") = "leaf"
        athumb.Attributes("codModDis") = drMD("P_inCod").ToString 'agregado 09/04/2014 - wapumayta
        athumb.Attributes("btSopLin") = drMD("btSopLin").ToString 'agregado 09/04/2014 - wapumayta
        athumb.Attributes("costoReferencial") = "-1" 'agregado 24/04/2014 - wapumayta
        'imgthumb.Height = 100
        'imgthumb.Width = 100

        divcaption.Attributes("class") = "caption"

        athumb.Controls.Add(imgthumb)

        Dim trD As New HtmlTableRow
        Dim tdD As New HtmlTableCell
        Dim tdI As New HtmlTableCell
        tdI.InnerHtml = "<b>Modelo</b>"
        tdI.Style("width") = "100px"
        tdI.Style("vertical-align") = "top"
        'tdI.VAlign = "top"
        tdD.InnerText = Trim(drMD("vcNom").ToString().Replace("&#39", "'"))

        Dim hdfId As New HiddenField
        hdfId.Value = drMD("P_inCod").ToString

        tdD.Controls.Add(hdfId)

        trD.Cells.Add(tdI)
        trD.Cells.Add(tdD)
        tbCamposDinamicos.Rows.Add(trD)

        'grupo de modelo
        Dim trGrupMod As New HtmlTableRow
        Dim tdIGrupMod As New HtmlTableCell
        Dim tdDGrupMod As New HtmlTableCell
        tdIGrupMod.InnerHtml = "<b>Grupo Modelo</b>"
        tdDGrupMod.InnerHtml = Trim(drMD("GrupoDispotivo").ToString())
        trGrupMod.Cells.Add(tdIGrupMod)
        trGrupMod.Cells.Add(tdDGrupMod)
        tbCamposDinamicos.Rows.Add(trGrupMod)
        'fin grupo modelo

        'tipo de modelo
        Dim trTipMod As New HtmlTableRow
        Dim tdITipMod As New HtmlTableCell
        Dim tdDTipMod As New HtmlTableCell
        tdITipMod.InnerHtml = "<b>Tipo Modelo</b>"
        'tdDTipMod.InnerHtml = Trim(drMD("picTipMod").ToString())
        tdDTipMod.InnerHtml = Trim(drMD("TipoModelo").ToString())
        trTipMod.Cells.Add(tdITipMod)
        trTipMod.Cells.Add(tdDTipMod)
        tbCamposDinamicos.Rows.Add(trTipMod)
        'fin tipo modelo

        'tipo chip
        Dim trTipChip As New HtmlTableRow
        Dim tdITipChip As New HtmlTableCell
        Dim tdDTipChip As New HtmlTableCell
        tdITipChip.InnerHtml = "<b>Tipo Chip</b>"
        If Convert.ToBoolean(drMD("btSopLin")) Then
            tdDTipChip.InnerHtml = Trim(drMD("NombreTipoChip").ToString())
        Else
            tdDTipChip.InnerHtml = "Ninguno"
        End If
        trTipChip.Cells.Add(tdITipChip)
        trTipChip.Cells.Add(tdDTipChip)
        tbCamposDinamicos.Rows.Add(trTipChip)
        'fin tipo chip

        'costo por operador
        'Dim trCosOpe As New HtmlTableRow
        'Dim tdICosOpe As New HtmlTableCell
        ''Dim tdDCosOpe As New HtmlTableCell
        'tdICosOpe.InnerHtml = "<b>Costo por operador</b>"
        'tdICosOpe.Attributes("colspan") = "2"
        'trCosOpe.Controls.Add(tdICosOpe)
        'tbCamposDinamicos.Rows.Add(trCosOpe)

        'If codPlan <> "0" Then 'solcitud de cambio y reposicion
        'If inCodOpe <> -1 Then

        'operador 
        Dim trOper As New HtmlTableRow
        'trOper.Attributes("id") = "trOper"
        Dim tdIOper As New HtmlTableCell
        Dim tdDOper As New HtmlTableCell
        tdIOper.InnerHtml = "<b>Operador</b>"
        If (inCodOpe <> 0 AndAlso inCodOpe <> -1) Then 'solcitud de cambio y reposicion
            tdDOper.InnerHtml = drMD("vcNomOpe").ToString()
        Else
            Dim ddlOperador As New DropDownList
            ddlOperador.Attributes("id") = "ddlOperador-" + drMD("P_inCod").ToString()
            ddlOperador.CssClass = "Operador"
            ddlOperador.Width = 110
            'ddlOperador.Attributes.Add("codigo", drMD("P_inCod").ToString)
            UtilitarioWeb.Dataddl(ddlOperador, lstOperadores, "vcNomOpe", "P_inCodOpe")
            ddlOperador.Items.Insert(0, New ListItem("Seleccione...", "-1"))
            tdDOper.Controls.Add(ddlOperador)
        End If
        trOper.Controls.Add(tdIOper)
        trOper.Controls.Add(tdDOper)
        tbCamposDinamicos.Rows.Add(trOper)
        'fin operador

        'costo
        Dim trCosto As New HtmlTableRow
        'trCosto.Attributes("id") = "trCosto"
        Dim tdICosto As New HtmlTableCell
        Dim tdDCosto As New HtmlTableCell
        tdICosto.InnerHtml = "<b>Costo</b>"
        If (inCodOpe <> 0 AndAlso inCodOpe <> -1) Then 'solcitud de cambio, reposicion y nuevo con seleccion de planes
            tdDCosto.InnerHtml = DevuelveNumeroFormateado(drMD("dePreEsp").ToString(), oCultura)
        Else
            Dim lblCosto As New Label
            lblCosto.Attributes("id") = "lblCosto-" + drMD("P_inCod").ToString()
            lblCosto.Text = "Seleccione operador..."
            tdDCosto.Controls.Add(lblCosto)
        End If
        trCosto.Controls.Add(tdICosto)
        trCosto.Controls.Add(tdDCosto)
        tbCamposDinamicos.Rows.Add(trCosto)

        If hdfPermiteLinea.Value = "1" AndAlso Convert.ToBoolean(drMD("btSopLin")) Then
            trOper.Style("display") = "none"
            trCosto.Style("display") = "none"
        End If
        ''fin costo

        If inCodOpe <> -1 Then 'solcitud de cambio y reposicion
            athumb.Attributes("costoCambio") = DevuelveNumeroFormateado(drMD("dePreEsp").ToString(), oCultura)
        Else
            athumb.Attributes("costoCambio") = "-1"
        End If
        'End If

        If Not IsDBNull(drMD("imIma")) Then
            Dim barrImg As Byte() = CType(drMD("imIma"), Byte())
            Dim archivo As String = Guid.NewGuid.ToString.Replace("-", "") & "-" & drMD("P_inCod").ToString & ".jpg"
            Dim strfn As String = Server.MapPath("~/Images/ModeloDispositivo/" + archivo)
            Dim fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write)
            fs.Write(barrImg, 0, barrImg.Length)
            fs.Flush()
            fs.Close()
            imgthumb.Src = "../../Images/ModeloDispositivo/" + archivo
            imgthumb.Alt = Trim(drMD("vcNom").ToString().Replace("&#39", "'"))
            imgthumb.Width = 80 '90
            imgthumb.Height = 80 '90
            athumb.Attributes("href") = "../../Images/ModeloDispositivo/" + archivo
            athumb.Attributes("title") = Trim(drMD("vcNom").ToString().Replace("&#39", "'"))

            Try 'agregado 27-08-2015 wapumayta (si no puede exporner el archivo muestra la imagen por defecto)
                Dim imgBP As New Bitmap(strfn)
                athumb.Attributes("origWidth") = imgBP.Width.ToString()
                athumb.Attributes("origHeight") = imgBP.Height.ToString()
            Catch ex As Exception
                imgthumb.Src = "../../Common/Images/Mantenimiento/NoDisponible.jpg"
                imgthumb.Alt = "Imagen no disponible"
                imgthumb.Width = 80 '90
                imgthumb.Height = 80 '90
                athumb.Attributes("href") = "../../Common/Images/Mantenimiento/NoDisponible.jpg" 'Ruta de imagen
                athumb.Attributes("title") = Trim(drMD("vcNom").ToString)
            End Try

            'Dim wImg As Integer = imgBP.Width
            'Dim hImg As Integer = imgBP.Height
            'If (wImg > hImg) Then
            '    athumb.Attributes("origWidth") = "80"
            '    athumb.Attributes("origHeight") = (hImg * 80 / wImg).ToString()
            'Else
            '    athumb.Attributes("origHeight") = "80"
            '    athumb.Attributes("origWidth") = (wImg * 80 / hImg).ToString()
            'End If
        Else
            imgthumb.Src = "../../Common/Images/Mantenimiento/NoDisponible.jpg"
            imgthumb.Alt = "Imagen no disponible"
            imgthumb.Width = 80 '90
            imgthumb.Height = 80 '90
            athumb.Attributes("href") = "../../Common/Images/Mantenimiento/NoDisponible.jpg" 'Ruta de imagen
            athumb.Attributes("title") = Trim(drMD("vcNom").ToString)
        End If

        If lstCaracteristica.Rows.Count > 0 Then
            'Obtiene controles dinámicos con sus respectivos valores...
            GeneralMantenimiento.Instance.CrearLabelsDinamicosMantenimiento("MOV_ModeloDispositivo", drMD, tbCamposDinamicos, 1)

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

    <WebMethod()>
    Public Shared Function PreciosOperador(ByVal inCodModDis As Integer) As String
        Dim ModeloDispositivo As BL_MOV_ModeloDispositivo = Nothing
        Try
            ModeloDispositivo = New BL_MOV_ModeloDispositivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim dsResult As New DataSet
            Dim resultado As String = String.Empty
            dsResult = ModeloDispositivo.ListarPreciosOperador(inCodModDis)
            resultado += "PreciosOperador['" + inCodModDis.ToString() + "'] = [];"
            resultado += "PreciosOperador['" + inCodModDis.ToString() + "'].Precios = [];"
            For Each dr As DataRow In dsResult.Tables(0).Rows
                resultado += "PreciosOperador['" + inCodModDis.ToString() + "'].Precios['" + dr("p_inCodOpe").ToString() + "'] = [];"
                resultado += "PreciosOperador['" + inCodModDis.ToString() + "'].Precios['" + dr("p_inCodOpe").ToString() + "'].dePreLis = '" + DevuelveNumeroFormateado(dr("dePreLis").ToString(), oCultura) + "';"
                resultado += "PreciosOperador['" + inCodModDis.ToString() + "'].Precios['" + dr("p_inCodOpe").ToString() + "'].dePreEsp = '" + DevuelveNumeroFormateado(dr("dePreEsp").ToString(), oCultura) + "';"
                resultado += "PreciosOperador['" + inCodModDis.ToString() + "'].Precios['" + dr("p_inCodOpe").ToString() + "'].deCosEqu = '" + DevuelveNumeroFormateado(dr("deCosEqu").ToString(), oCultura) + "';"
            Next
            'resultado += "CampoReferenciaCondicion[ "
            'For Each dr As DataRow In dsResult.Tables(0).Rows
            '    'operadores
            '
            '    resultado += "var DatosCondicion = new CampoReferenciaCondicion();"
            '    resultado += "DatosCondicion = {Codigo: '" + dr("p_inCodOpe").ToString() + "', Nombre: '" + dr("COMP_vcNOMCIA").ToString()
            'Next
            'resultado = resultado.Substring(0, resultado.Length - 1)
            'resultado += "];"
            'resultado += "Operadores.push({Codigo:" + dr("p_inCodOpe").ToString() + " ,Nombre:" + dr("COMP_vcNOMCIA").ToString() + "});"
            Return resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(ModeloDispositivo) Then ModeloDispositivo.Dispose()
        End Try
    End Function

    'Private Function divNoDispositivos_x_Grupo() As Object
    '    Throw New NotImplementedException
    'End Function

End Class
