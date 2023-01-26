Imports Microsoft.VisualBasic
Imports System.Data
Imports System.IO
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports System.Web.Script.Serialization
Imports VisualSoft.PCSistelMovil.General.BE


Public Class GeneralMantenimiento


    Private Shared _Instance As GeneralMantenimiento = Nothing
    Private Shared ReadOnly _Sync As New Object

    Private Sub New()
    End Sub

    Public Shared ReadOnly Property Instance() As GeneralMantenimiento
        Get
            If _Instance Is Nothing Then
                SyncLock _Sync
                    If _Instance Is Nothing Then
                        _Instance = New GeneralMantenimiento()
                    End If
                End SyncLock
            End If
            Return _Instance
        End Get
    End Property

    Public Sub CrearControlesDinamicosMantenimiento(ByVal pstrNombreTabla As String, _
                                                    ByRef tbCamposDinamicos As Object, _
                                                    Optional ByVal pstrClaseAdicional As String = "",
                                                    Optional ByVal Raiz As String = "",
                                                    Optional ByVal CampoPrincipal As String = "",
                                                    Optional ByVal ValorCampoPrincipal As String = "")

        If tbCamposDinamicos Is Nothing Then Exit Sub

        Try
            Dim lstCaracteristica As DataTable
            Dim Caracteristica As BL_MOV_Caracteristica = New BL_MOV_Caracteristica(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            lstCaracteristica = Caracteristica.ListarxTabla(pstrNombreTabla, CampoPrincipal, ValorCampoPrincipal)
            Caracteristica.Dispose()
            If lstCaracteristica Is Nothing Then Exit Sub

            If lstCaracteristica.Rows.Count > 0 Then
                For Each dr As DataRow In lstCaracteristica.Rows
                    Dim trDim As New HtmlTableRow
                    Dim tdIDim As New HtmlTableCell
                    Dim tdDDim As New HtmlTableCell


                    Dim lblTitulo As New Label
                    If dr("dcTipDatSQL").ToString() = "VARBINARY" Then
                        lblTitulo.Text = dr("vcDesCam").ToString() + " (" + dr("vcLon").ToString().ToLower() + ")"
                    Else
                        If (dr("vcNomCam").ToString() = "AliasFacturacion" And pstrNombreTabla = "M_ORGA") Then
                            lblTitulo.Text = dr("vcDesCam").ToString() + "<br /><span style='color: #d90505;'>(Separación de Alias '**|**')</span>"
                        Else
                            lblTitulo.Text = dr("vcDesCam").ToString()
                        End If
                    End If
                    tdIDim.Controls.Add(lblTitulo)

                    'tdIDim.InnerText = dr("vcDesCam").ToString
                    'tdIDim.Width = "130"
                    tdIDim.Attributes("class") = "tdEtiqueta"

                    If dr("dcTipDat").ToString = "Fecha" Then
                        dr("dcTipDatSQL") = "DATE"
                    End If

                    Select Case dr("dcTipDatSQL").ToString
                        Case "INT"
                            Dim txtINT As New TextBox
                            txtINT.ID = "txt_" & dr("vcNomCam").ToString
                            txtINT.CssClass = "INT" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                            txtINT.MaxLength = 12
                            txtINT.Attributes("obj") = dr("vcNomCam").ToString
                            txtINT.Attributes("tipDat") = dr("dcTipDatSQL").ToString
                            txtINT.Width = "120"
                            txtINT.Text = "0"
                            tdDDim.Controls.Add(txtINT)
                        Case "DECIMAL"
                            Dim txtDECIMAL As New TextBox
                            txtDECIMAL.ID = "txt_" & dr("vcNomCam").ToString
                            txtDECIMAL.CssClass = "DECIMAL" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                            Dim longitud As String() = dr("vcLon").ToString().Split(",")
                            txtDECIMAL.MaxLength = Integer.Parse(longitud(0)) - 2
                            txtDECIMAL.Attributes("obj") = dr("vcNomCam").ToString
                            txtDECIMAL.Attributes("tipDat") = dr("dcTipDatSQL").ToString + "(" + dr("vcLon").ToString + ")"
                            txtDECIMAL.Width = "120"
                            txtDECIMAL.MaxLength = 14
                            txtDECIMAL.Text = "0"
                            tdDDim.Controls.Add(txtDECIMAL)

                        Case "VARCHAR"

                            If dr("F_inCodTipDat").ToString = "8" Then
                                Dim ddlPicklist As New DropDownList
                                ddlPicklist.ID = "ddl_" & dr("vcNomCam").ToString
                                ddlPicklist.CssClass = "VARCHAR" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                                ddlPicklist.Attributes("obj") = dr("vcNomCam").ToString
                                ddlPicklist.Width = New Unit(200, UnitType.Pixel)
                                ddlPicklist.Attributes("tipDat") = "VARCHAR (35)"
                                ddlPicklist.Width = "120"
                                ddlPicklist.Items.Add("")
                                Dim mValores() As String = dr("vcLon").ToString().Split(",")
                                For Each strValor As String In mValores
                                    ddlPicklist.Items.Add(strValor.Replace("&#39", "'"))
                                Next
                                tdDDim.Controls.Add(ddlPicklist)
                            Else
                                Dim txtVARCHAR As New TextBox
                                txtVARCHAR.ID = "txt_" & dr("vcNomCam").ToString
                                txtVARCHAR.Attributes("maxlength") = dr("vcLon").ToString
                                txtVARCHAR.CssClass = "VARCHAR" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                                txtVARCHAR.Attributes("obj") = dr("vcNomCam").ToString
                                txtVARCHAR.Attributes("tipDat") = dr("dcTipDatSQL").ToString + "(" + dr("vcLon").ToString + ")"
                                txtVARCHAR.Width = "120"
                                If Not IsNumeric(dr("vcLon")) OrElse Convert.ToInt32(dr("vcLon")) > 80 Then
                                    txtVARCHAR.TextMode = TextBoxMode.MultiLine
                                    txtVARCHAR.Height = New Unit(60, UnitType.Pixel)
                                    txtVARCHAR.Width = New Unit(300, UnitType.Pixel) 'Cambio de ancho de control genrado - Jp
                                End If
                                tdDDim.Controls.Add(txtVARCHAR)
                            End If

                        Case "DATE"
                            Dim txtSMALLDATETIME As New TextBox
                            txtSMALLDATETIME.ID = "txt_" & dr("vcNomCam").ToString
                            txtSMALLDATETIME.CssClass = "DATE" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                            txtSMALLDATETIME.Attributes("obj") = dr("vcNomCam").ToString
                            txtSMALLDATETIME.Attributes("tipDat") = dr("dcTipDatSQL").ToString
                            txtSMALLDATETIME.Width = "120"
                            tdDDim.Controls.Add(txtSMALLDATETIME)
                        Case "DATETIME"
                            If pstrNombreTabla <> "MOV_ModeloDispositivoOperador" Then
                                Dim txtDATETIME As New TextBox
                                txtDATETIME.ID = "txt_" & dr("vcNomCam").ToString
                                txtDATETIME.CssClass = "DATETIME" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                                txtDATETIME.Attributes("obj") = dr("vcNomCam").ToString
                                txtDATETIME.Attributes("tipDat") = dr("dcTipDatSQL").ToString
                                txtDATETIME.Width = "120"
                                tdDDim.Controls.Add(txtDATETIME)
                            End If
                        Case "BIT"
                            'Dim chkBIT As New CheckBox
                            'chkBIT.ID = "chk_" & dr("vcNomCam").ToString
                            'chkBIT.Attributes("obj") = dr("vcNomCam").ToString
                            'chkBIT.Attributes("tipDat") = dr("dcTipDatSQL").ToString
                            'chkBIT.CssClass = "BIT" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                            'tdDDim.Controls.Add(chkBIT)

                            Dim ddlPicklist As New DropDownList
                            ddlPicklist.ID = "ddl_" & dr("vcNomCam").ToString
                            ddlPicklist.CssClass = "VARCHAR" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                            ddlPicklist.Attributes("obj") = dr("vcNomCam").ToString
                            ddlPicklist.Width = New Unit(200, UnitType.Pixel)
                            ddlPicklist.Attributes("tipDat") = "VARCHAR (35)"
                            ddlPicklist.Width = "120"
                            Dim mValores() As String = dr("vcLon").ToString().Split(",")
                            Dim inContador As Integer = 1
                            For Each strValor As String In mValores
                                ddlPicklist.Items.Add(New ListItem(strValor.Replace("&#39", "'"), inContador))
                                inContador -= 1
                            Next
                            tdDDim.Controls.Add(ddlPicklist)




                        Case "VARBINARY"
                            Dim vcClass = "VARBINARY"
                            Dim vcStyle = "display: inline-block; cursor: normal !important;"
                            Dim vcImagen = ""

                            'If Convert.ToBoolean(dr("Editable") And DeshabilitaControles = False) Then
                            'If Convert.ToBoolean(dr("Editable")) Then
                            vcClass = "VARBINARY imgButton"
                            vcStyle = "display: inline-block; cursor: hand !important;"
                            'End If

                            Dim vcDiv = ""
                            If (lstCaracteristica.Columns.Contains("vcValor") = False) Then 'Creación de Solicitud
                                'If Convert.ToBoolean(dr("Editable")) Then
                                vcImagen = "<img alt='' src='" & Raiz & "Common/Images/Mantenimiento/SubirArchivo.png' width='16px' height='16px'/>"
                                'End If
                                vcDiv += "<div class='UploadDiv' style='" + vcStyle + "'>"
                                vcDiv += "<div id='upl_" + dr("vcNomCam").ToString + "' obj='" + dr("vcNomCam").ToString + "' oblig='false' "
                                vcDiv += "tipDat='VARBINARY(MAX)' vcTipExt='" + dr("vcLon").ToString() + "' class='" + vcClass + "' "
                                vcDiv += "align='center' style='text-align:left;'><table><tr>"
                                vcDiv += "<td style='text-align:left;'>" + vcImagen + "</td>"
                                vcDiv += "<td style='vertical-align:bottom; text-decoration:underline;'>Adjuntar Archivo</td></tr></table></div>"
                                vcDiv += "<div style='text-decoration:underline;' id='file_" + dr("vcNomCam").ToString + "'></div></div>"
                            ElseIf Convert.IsDBNull(dr("vcValor")) OrElse dr("vcValor") = "" Then 'Edición de solicitud y campo vacío
                                'If Convert.ToBoolean(dr("Editable")) Then
                                vcImagen = "<img alt='' src='" & Raiz & "Common/Images/Mantenimiento/SubirArchivo.png' width='16px' height='16px'/>"
                                'End If
                                vcDiv += "<div class='UploadDiv' style='" + vcStyle + "'>"
                                vcDiv += "<div id='upl_" + dr("vcNomCam").ToString + "' obj='" + dr("vcNomCam").ToString + "' oblig='false' "
                                vcDiv += "tipDat='VARBINARY(MAX)' vcTipExt='" + dr("vcLon").ToString() + "' class='" + vcClass + "' "
                                vcDiv += "align='center' style='text-align:left;'><table><tr>"
                                vcDiv += "<td style='text-align:left;'>" + vcImagen + "</td>"
                                vcDiv += "<td style='vertical-align:bottom; text-decoration:underline;'>Adjuntar Archivo</td></tr></table></div>"
                                vcDiv += "<div style='text-decoration:underline'; id='file_" + dr("vcNomCam").ToString + "'></div></div>"
                            Else 'Edición de solicitud y campo NO vacío 

                                Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Mantenimiento//", "//")

                                ''If Convert.ToBoolean(dr("Editable")) Then
                                'Descargar Adjunto
                                Dim vcFilePath = HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Mantenimiento" + CarpetaDominio + "//" + dr("vcValor").ToString()
                                Dim byFileData As Byte() = dr("byArchivo")
                                File.WriteAllBytes(vcFilePath, byFileData)
                                vcImagen = "<img src='" & Raiz & "Common/Images/remove.png' onclick=""DeleteFileMantenimiento('" & Raiz & "//P_Movil//Administrar//Mantenimiento//','" + dr("vcValor") + "','" + dr("vcNomCam").ToString + "')""/>"
                                ''End If

                                vcDiv += "<div class='UploadDiv' style='" + vcStyle + "'>"
                                vcDiv += "<div id='upl_" + dr("vcNomCam").ToString + "' obj='" + dr("vcNomCam").ToString + "' oblig='false' "
                                vcDiv += "tipDat='VARBINARY(MAX)' vcTipExt='" + dr("vcLon").ToString() + "' class='" + vcClass + "' style='text-align:left; display: none;' "
                                vcDiv += "align='center' style='text-align:left;'><table><tr>"
                                vcDiv += "<td style='text-align:left;'><img alt='' src='" & Raiz & "Common/Images/Mantenimiento/SubirArchivo.png' width='16px' height='16px'/></td>"
                                vcDiv += "<td style='vertical-align:bottom; text-decoration:underline;'>Adjuntar Archivo</td></tr></table></div>"
                                vcDiv += "<div style='text-decoration:underline'; id='file_" + dr("vcNomCam").ToString + "'>"
                                vcDiv += "<div class='imgBtn' style='margin-top:1px; height:21px; margin-left: 2px;' >" + vcImagen
                                vcDiv += "<span style='margin-left:5px;' id='span_" + dr("vcNomCam").ToString + "' style='text-decoration:underline;' nombre='" + dr("vcValor").ToString() + "'>"
                                vcDiv += dr("vcValor").ToString() + "</span></div></div></div>"

                            End If

                            tdDDim.InnerHtml = vcDiv

                    End Select

                    trDim.Cells.Add(tdIDim)
                    trDim.Cells.Add(tdDDim)
                    If Not (pstrNombreTabla = "MOV_ModeloDispositivoOperador" And dr("dcTipDatSQL").ToString = "DATETIME") Then
                        tbCamposDinamicos.Rows.Add(trDim)
                    End If

                    If (pstrNombreTabla = "M_ORGA" And dr("vcNomCam").ToString() = "RequiereAutorizacion") Then
                        trDim = New HtmlTableRow
                        tdIDim = New HtmlTableCell
                        tdDDim = New HtmlTableCell
                        Dim tdDDim2 As New HtmlTableCell
                        lblTitulo = New Label

                        lblTitulo.Text = "Responsable de Autorización"
                        tdIDim.Controls.Add(lblTitulo)

                        Dim listBox As New ListBox
                        listBox.ID = "lstAutorizadores"
                        listBox.CssClass = "ui-corner-all"
                        listBox.Attributes("size") = "4"
                        listBox.Attributes("name") = "lstAutorizadores"
                        listBox.Attributes("multiple") = "multiple"
                        listBox.Style("height") = "80px"
                        listBox.Style("width") = "310px"
                        listBox.Style("padding") = "4px"
                        listBox.Style("border") = "1px solid rgb(221, 221, 221)"

                        tdDDim.Controls.Add(listBox)

                        Dim strBotonesAddElim As String = ""

                        strBotonesAddElim += "<table>"
                        strBotonesAddElim += "  <tr>"
                        strBotonesAddElim += "      <td>"
                        strBotonesAddElim += "          <div id='btnAgregarAutorizador' class='btnNormal' runat='server' style='width: 160px;'>"
                        strBotonesAddElim += "              <a>Agregar Autorizador</a>"
                        strBotonesAddElim += "          </div>"
                        strBotonesAddElim += "      </td>"
                        strBotonesAddElim += "  <tr>"

                        strBotonesAddElim += "  <tr>"
                        strBotonesAddElim += "      <td>"
                        strBotonesAddElim += "          <div id='btnQuitarAutorizador' class='btnNormal' runat='server' style='width: 160px;'>"
                        strBotonesAddElim += "              <a>Quitar Autorizador</a>"
                        strBotonesAddElim += "          </div>"
                        strBotonesAddElim += "      </td>"
                        strBotonesAddElim += "  <tr>"
                        strBotonesAddElim += "</table>"
                        tdDDim2.InnerHtml = strBotonesAddElim

                        trDim.ID = "trAutorizador"
                        trDim.Cells.Add(tdIDim)
                        trDim.Cells.Add(tdDDim)
                        trDim.Cells.Add(tdDDim2)
                        tbCamposDinamicos.Rows.Add(trDim)

                    End If

                Next
            End If

        Catch ex As Exception

            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)

        End Try

    End Sub

    Public Function CrearControlesSolicitudPersonalizada(ByVal lstCaracteristica As DataTable, ByVal lstCondiciones As DataTable,
                                               ByRef tbCamposDinamicos As Object,
                                               Optional ByVal pstrClaseAdicional As String = "",
                                               Optional ByVal EsEdicion As Boolean = False,
                                               Optional ByVal DeshabilitaControles As Boolean = False,
                                               Optional ByVal CodigoTipoSolicitud As String = "",
                                               Optional ByVal inSolTerminada As Integer = 0
                                               ) As String 'ByVal strPreArc As String, _

        If tbCamposDinamicos Is Nothing Then
            Return ""
            Exit Function
        End If

        Try
            'Dim Caracteristica As BL_MOV_Caracteristica = new BL_MOV_Caracteristica(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            If lstCaracteristica Is Nothing Then
                Return ""
                Exit Function
            End If
            Dim retFunct As String = String.Empty
            Dim retVar As String = String.Empty
            If lstCaracteristica.Rows.Count > 0 Then
                Dim estadoLeyenda = False
                For Each dr As DataRow In lstCaracteristica.Rows
                    Dim trDim As New HtmlTableRow
                    Dim tdIDim As New HtmlTableCell
                    Dim tdDDim As New HtmlTableCell

                    Dim campoPadreVisible As Boolean = False
                    If dr("F_inCodTipDat").ToString = "10" Then
                        Dim camposEnt2 As List(Of CamposEntidad) = New List(Of CamposEntidad)

                        For Each dataRow As DataRow In lstCaracteristica.Rows
                            If (dataRow("vcTab").ToString() = dr("vcTab").ToString()) Then
                                Dim campoEntidad As CamposEntidad = New CamposEntidad()
                                campoEntidad.IdCampo = dataRow("P_inCod").ToString()
                                campoEntidad.Entidad = "bp_" & dataRow("vcTab").ToString() & "_" & dataRow("vcNomCam").ToString()
                                campoEntidad.Campo = dataRow("vcNomCamDesc").ToString()
                                campoEntidad.CampoVisible = Convert.ToBoolean(Convert.ToInt32(dataRow("Visible")))
                                Dim lstCampos As List(Of String) = New List(Of String)
                                Dim lstCampos2 As List(Of String) = New List(Of String)

                                For Each dataCondicion As DataRow In lstCondiciones.Rows
                                    If (dataRow("P_inCod").ToString() = dataCondicion("IdCampo").ToString()) Then
                                        If (dataCondicion("IdCampoTipSol").ToString() <> "") Then
                                            lstCampos.Add(dataCondicion("IdCampoTipSol").ToString())
                                            lstCampos2.Add(dataCondicion("vcNomCamTipSol").ToString())
                                        End If
                                    End If
                                Next
                                campoEntidad.IdCampoTipSol = lstCampos
                                campoEntidad.vcNomCamTipSol = lstCampos2

                                camposEnt2.Add(campoEntidad)
                            End If
                        Next

                        For Each campo As CamposEntidad In camposEnt2
                            If (dr("P_inCod").ToString() = campo.IdCampo) Then
                                For Each idpadre As String In campo.IdCampoTipSol
                                    For Each campo2 As CamposEntidad In camposEnt2
                                        If (campo2.IdCampo = idpadre) Then
                                            campoPadreVisible = campo2.CampoVisible
                                        End If
                                    Next
                                Next

                            End If
                        Next
                    End If


                    If (Not IsDBNull(dr("Visible")) And dr("vcNomCam").ToString() <> "vcCodigo") Then
                        If ((Convert.ToBoolean(dr("Visible")) = True) OrElse campoPadreVisible OrElse dr("vcNomCam").Contains("IdDescripcion")) Then

                            If ((Convert.ToBoolean(dr("Visible")) = True) OrElse campoPadreVisible) Then
                                'trDim.Style("display") = "none"
                                tdIDim.Width = "250"
                                tdIDim.Attributes("class") = "tdEtiqueta"

                                Dim lblTitulo As New Label
                                If dr("dcTipDatSQL").ToString() = "VARBINARY" Then
                                    lblTitulo.Text = dr("vcDesCam").ToString() + " (" + dr("vcLon").ToString().ToLower() + ")"
                                Else
                                    lblTitulo.Text = dr("vcDesCam").ToString()
                                End If
                                tdIDim.Controls.Add(lblTitulo)

                                If Convert.ToBoolean(dr("Obligatorio")) = True Then
                                    Dim lblObligatorio As New Label
                                    lblObligatorio.Text = " (*)"
                                    lblObligatorio.Style("color") = "Red"
                                    tdIDim.Controls.Add(lblObligatorio)
                                    estadoLeyenda = True
                                End If

                                If dr("dcTipDat").ToString = "Fecha" Then
                                    dr("dcTipDatSQL") = "DATE"
                                ElseIf dr("dcTipDat").ToString = "Periodo" Then
                                    dr("dcTipDatSQL") = "PERIODO"
                                End If
                            End If

                            Select Case dr("dcTipDatSQL").ToString
                                Case "INT"
                                    Dim txtINT As New TextBox
                                    txtINT.ID = "txt_" & dr("vcNomCam").ToString
                                    txtINT.CssClass = "INT" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                                    txtINT.MaxLength = 7
                                    txtINT.Attributes("obj") = dr("vcNomCam").ToString
                                    txtINT.Attributes("oblig") = Convert.ToBoolean(dr("Obligatorio")).ToString()
                                    txtINT.Attributes("tipDat") = dr("dcTipDatSQL").ToString
                                    If (dr("vcNomCam").ToString() = "inUsuarioCreacion" Or dr("vcNomCam").ToString() = "inUsuarioModificacion") Then
                                        txtINT.Width = "225"
                                    Else
                                        txtINT.Width = "120"
                                    End If
                                    txtINT.Enabled = Convert.ToBoolean(dr("Editable"))

                                    If DeshabilitaControles Then txtINT.Enabled = False

                                    tdDDim.Controls.Add(txtINT)

                                Case "DECIMAL"
                                    Dim txtDECIMAL As New TextBox
                                    txtDECIMAL.ID = "txt_" & dr("vcNomCam").ToString
                                    txtDECIMAL.CssClass = "DECIMAL" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                                    Dim longitud As String() = dr("vcLon").ToString().Split(",")
                                    txtDECIMAL.MaxLength = Integer.Parse(longitud(0))
                                    txtDECIMAL.Attributes("obj") = dr("vcNomCam").ToString
                                    txtDECIMAL.Attributes("oblig") = Convert.ToBoolean(dr("Obligatorio")).ToString()
                                    txtDECIMAL.Attributes("tipDat") = dr("dcTipDatSQL").ToString + "(" + dr("vcLon").ToString + ")"
                                    txtDECIMAL.Width = Integer.Parse(longitud(0)) * 6 + 6 '6px es el ancho aprox de 1 número y se agrega 6 asumiendo que haya '.'
                                    txtDECIMAL.Enabled = Convert.ToBoolean(dr("Editable"))

                                    If DeshabilitaControles Then txtDECIMAL.Enabled = False

                                    tdDDim.Controls.Add(txtDECIMAL)

                                Case "VARCHAR"

                                    If dr("F_inCodTipDat").ToString = "10" Then

                                        Dim camposEntidad As List(Of CamposEntidad) = New List(Of CamposEntidad)

                                        For Each dataRow As DataRow In lstCaracteristica.Rows
                                            If (dataRow("vcTab").ToString() = dr("vcTab").ToString()) Then
                                                Dim campoEntidad As CamposEntidad = New CamposEntidad()
                                                campoEntidad.IdCampo = dataRow("P_inCod").ToString()
                                                campoEntidad.Entidad = "bp_" & dataRow("vcTab").ToString() & "_" & dataRow("vcNomCam").ToString()
                                                campoEntidad.Campo = dataRow("vcNomCamDesc").ToString()
                                                campoEntidad.AliasCampo = dataRow("NomAlias2").ToString()
                                                campoEntidad.CampoVisible = Convert.ToBoolean(Convert.ToInt32(dataRow("Visible")))
                                                Dim lstCampos As List(Of String) = New List(Of String)
                                                Dim lstCampos2 As List(Of String) = New List(Of String)

                                                For Each dataCondicion As DataRow In lstCondiciones.Rows
                                                    If (dataRow("P_inCod").ToString() = dataCondicion("IdCampo").ToString()) Then
                                                        If (dataCondicion("IdCampoTipSol").ToString() <> "") Then
                                                            lstCampos.Add(dataCondicion("IdCampoTipSol").ToString())
                                                            lstCampos2.Add(dataCondicion("vcNomCamTipSol").ToString())
                                                        End If
                                                    End If
                                                Next
                                                campoEntidad.IdCampoTipSol = lstCampos
                                                campoEntidad.vcNomCamTipSol = lstCampos2

                                                camposEntidad.Add(campoEntidad)
                                            End If
                                        Next

                                        Dim bpControl As New Common_Controles_BusquedaPrincipal
                                        Dim hidden As New HiddenField
                                        Dim dvContenedor As New HtmlGenericControl
                                        hidden.ID = "ValHdf__" & dr("vcNomCam").ToString() & "__" & dr("Obligatorio").ToString()
                                        dvContenedor.ID = "dvContenedor_" & dr("vcTab").ToString() & "_" & dr("vcNomCam").ToString()
                                        If Not Convert.ToBoolean(dr("Editable")) Then
                                            bpControl.Deshabilitado = True
                                        End If

                                        bpControl.ListaCamposEntidad = camposEntidad

                                        'bpControl.Attributes("oblig") = Convert.ToBoolean(dr("Obligatorio")).ToString()
                                        bpControl.IdCampoEntidad = dr("P_inCod").ToString()
                                        bpControl.ID = "bp_" & dr("vcTab").ToString() & "_" & dr("vcNomCam").ToString()
                                        bpControl.NombreEntidad = dr("NombreEntidad").ToString()
                                        bpControl.vcTab = dr("vcTab").ToString()
                                        If Convert.ToBoolean(dr("Obligatorio")).ToString() Then bpControl.Selector = "REFERENCIA OBLIGATORIO" Else bpControl.Selector = "REFERENCIA"
                                        'bpControl.IdCamPK = dr("vcNomCamPK").ToString()
                                        'bpControl.Codigo = dr("vcNomCamPK").ToString()
                                        bpControl.NomCampoDescripcion = dr("vcDesCam").ToString()
                                        bpControl.Descripcion = dr("vcNomCamDesc").ToString()
                                        bpControl.TipoOrigen = 0

                                        If (bpControl.Descripcion = "ORGA_vcNOMORG") Then
                                            bpControl.Ancho = 350
                                        Else
                                            bpControl.Ancho = 200
                                        End If

                                        bpControl.FuncionPersonalizada = "fnMostrarDatos_" & dr("vcTab").ToString() & "_" & dr("vcNomCam").ToString()
                                        bpControl.RutaRaiz = "../../../"
                                        bpControl.EsDinamico = True
                                        bpControl.Contenedor = dvContenedor.ID
                                        bpControl.ListaCamposOcultos = dr("ListaCamposOcultos").ToString().Split(",").ToList()
                                        bpControl.TraerDatosFila = Convert.ToBoolean(dr("TraerDatosFilabp"))
                                        bpControl.SolicitudTerminada = inSolTerminada
                                        bpControl.Visible = Convert.ToBoolean(dr("Visible"))

                                        bpControl.IdCampoAlias = dr("NomAlias2").ToString()

                                        'If bpControl.vcTab = "MOV_Linea" AndAlso CodigoTipoSolicitud = "19" Then 'Reactivación Servicio, este ID viene asignado desde la máster.
                                        '    bpControl.FiltroRegistro = "0"
                                        'End If
                                        If bpControl.vcTab = "MOV_Linea" OrElse bpControl.vcTab = "MOV_Cuenta" Then
                                            bpControl.TraerDatosFila = True
                                        End If

                                        Dim permiteAdicionar As Boolean = Convert.ToBoolean(dr("PermiteAdicionar"))
                                        If permiteAdicionar = True Then
                                            bpControl.PermiteAdicionar = True
                                        End If


                                        If DeshabilitaControles Then bpControl.Deshabilitado = True

                                        Dim txtCondicion As String = String.Empty
                                        Dim txtCondicionEdit As String = String.Empty

                                        If EsEdicion Then
                                            bpControl.CodigoValor = dr("vcValor").ToString()
                                            'CONDICIONES
                                            For Each drCond As DataRow In lstCondiciones.Rows
                                                If (dr("P_inCod").ToString() <> drCond("IdCampo").ToString()) Then
                                                    Continue For
                                                End If
                                                If (txtCondicion <> String.Empty) Then
                                                    txtCondicion += " AND "
                                                End If
                                                If (drCond("vcTabForAs").ToString() = "MOV_Marca" And Not IsDBNull(drCond("vcTabForAs")) And Not IsDBNull(drCond("vcNomCamTabFor"))) Then
                                                    txtCondicion += drCond("vcTabForAs").ToString() & "." & drCond("vcNomCamTabFor").ToString() & " " & drCond("vcSimbolo").ToString()
                                                Else
                                                    If (Not IsDBNull(drCond("TextoCondicion")) And Not IsDBNull(drCond("vcTabForAs")) And Not IsDBNull(drCond("vcNomCamTabFor"))) Then 'concicion con valor estatico
                                                        txtCondicion += drCond("vcTabForAs").ToString() & "." & drCond("vcNomCamTabFor").ToString() & " " & drCond("vcSimbolo").ToString()
                                                    ElseIf (drCond("vcNomCampo").ToString() <> "") Then
                                                        txtCondicion += dr("vcTab").ToString() & "." & drCond("vcNomCampo").ToString() & " " & drCond("vcSimbolo").ToString()
                                                    Else
                                                        txtCondicion += dr("vcTab").ToString() & "." & dr("vcNomCamDesc").ToString() & " " & drCond("vcSimbolo").ToString()
                                                    End If
                                                End If


                                                If (drCond("IdSimboloCondicion").ToString() = "8" And drCond("IdSimboloCondicion").ToString() = "9") Then
                                                    Continue For
                                                End If
                                                If (Not IsDBNull(drCond("TextoCondicion"))) Then ' es valor estatico
                                                    'txtCondicion += " " + drCond("TextoCondicion")
                                                    Select Case (drCond("vcTipDatSQL"))
                                                        Case "VARCHAR", "DATETIME"
                                                            If drCond("IdSimboloCondicion").ToString() = "7" Then ' es like
                                                                txtCondicion += " ###%" & drCond("TextoCondicion").ToString() & "%###"
                                                            Else
                                                                txtCondicion += " ###" & drCond("TextoCondicion").ToString() & "###"
                                                            End If
                                                        Case "INT" Or "DECIMAL" Or "BIT"
                                                            txtCondicion += " " + drCond("TextoCondicion").ToString()
                                                    End Select
                                                ElseIf (Not IsDBNull(drCond("IdCampoTipSol"))) Then ' es un valor de la solicitud
                                                    For Each drCampoValor As DataRow In lstCaracteristica.Rows
                                                        Dim nombreCampoRef As String = If(drCond("vcNomCamTipSol").ToString() <> "", drCond("vcNomCamTipSol").ToString(), drCond("vcNomCampo").ToString())
                                                        If (drCampoValor("vcNomCam").ToString() = nombreCampoRef) Then
                                                            If (nombreCampoRef <> "F_vcCodEmp" And nombreCampoRef <> "inUsuarioCreacion" And nombreCampoRef <> "inUsuarioModificacion") Then
                                                                'txtCondicion += " " & drCampoValor("vcValor").ToString()
                                                                Select Case (drCond("vcTipDatSQL"))
                                                                    Case "VARCHAR", "DATETIME"
                                                                        If drCond("IdSimboloCondicion").ToString() = "7" Then ' es like
                                                                            'txtCondicion += " ###%" & drCond("vcValor").ToString() & "%###"
                                                                            txtCondicion += " ###%$$$ + $(""#txt_" + drCampoValor("vcNomCam").ToString() + """).val() + $$$%###"
                                                                            'txtCondicion += " ###$$$ + $('#bp_" & drCampoValor("vcTabForAs") & "_" & drCampoValor("vcNomCam").ToString() & "_txtValorBusqueda').val() + $$$###"
                                                                            'txtCondicionEdit += " ###%" + drCampoValor("vcValor").ToString() + "%###"
                                                                            'txtCondicion += " ###%" + drCampoValor("vcValor").ToString() + "%###"
                                                                        Else
                                                                            'txtCondicion += " ###" & drCampoValor("vcValor").ToString() & "###"
                                                                            txtCondicion += " ###$$$ + $('#bp_" & drCampoValor("vcTab") & "_" & drCampoValor("vcNomCam").ToString() & "_txtValorBusqueda').val() + $$$###"
                                                                            'txtCondicion += " ###" & drCampoValor("vcValor").ToString() & "###"
                                                                            'bp_MOV_Marca_Marca_txtValorBusqueda
                                                                        End If
                                                                    Case "INT", "DECIMAL", "BIT"
                                                                        txtCondicion += " " + drCampoValor("vcValor").ToString()
                                                                End Select
                                                            Else
                                                                Select Case (nombreCampoRef)
                                                                    '-----     $$$ = "   ---------  ### = '
                                                                    Case "F_vcCodEmp"
                                                                        txtCondicion += " ###" & drCampoValor("vcValor").ToString().Split(" - ")(0) & "###"
                                                                    Case "inUsuarioCreacion"
                                                                        txtCondicion += " " & drCampoValor("vcValor").ToString().Split(" - ")(0)
                                                                    Case "inUsuarioModificacion"
                                                                        txtCondicion += " $$$ + $('#hdfCodUsuarioCreacion').val() + $$$"
                                                                    Case Else
                                                                        txtCondicion = ""
                                                                End Select
                                                            End If
                                                        End If
                                                    Next
                                                Else
                                                    Select Case (drCond("vcTipDatSQL").ToString())
                                                        Case "VARCHAR", "DATETIME"
                                                            If drCond("IdSimboloCondicion").ToString() = "7" Then ' es like
                                                                txtCondicion += " ###%" & drCond("ValorCampoRelacion").ToString() & "%###"
                                                            Else
                                                                txtCondicion += " ###" & drCond("ValorCampoRelacion").ToString() & "###"
                                                            End If
                                                        Case "INT", "DECIMAL", "BIT"
                                                            txtCondicion += " " & drCond("ValorCampoRelacion").ToString()
                                                    End Select
                                                End If
                                            Next
                                        Else
                                            'bpControl.AltoDialog = 325
                                            'bpControl.AltoDialog = 420
                                            bpControl.AltoDialog = 435
                                            'CONDICIONES '-----     $$$ = "   ---------  ### = '
                                            For Each drCond As DataRow In lstCondiciones.Rows
                                                If (dr("P_inCod").ToString() <> drCond("IdCampo").ToString()) Then
                                                    Continue For
                                                End If
                                                Dim nombreCampo As String = drCond("vcNomCamTipSol").ToString()
                                                If (txtCondicion <> String.Empty) Then
                                                    txtCondicion += " AND "
                                                End If
                                                If (Not IsDBNull(drCond("TextoCondicion")) And Not IsDBNull(drCond("vcTabForAs")) And Not IsDBNull(drCond("vcNomCamTabFor"))) Then 'concicion con valor estatico
                                                    txtCondicion += drCond("vcTabForAs").ToString() & "." & drCond("vcNomCamTabFor").ToString() & " " & drCond("vcSimbolo").ToString()
                                                Else
                                                    txtCondicion += dr("vcTab").ToString() & "." & drCond("vcNomCampo").ToString() & " " & drCond("vcSimbolo").ToString()
                                                End If

                                                If (drCond("IdSimboloCondicion").ToString() = "8" Or drCond("IdSimboloCondicion").ToString() = "9") Then
                                                    Continue For
                                                End If
                                                If (Not IsDBNull(drCond("TextoCondicion"))) Then 'concicion con valor estatico
                                                    Select Case (drCond("vcTipDatSQL").ToString())
                                                        Case "VARCHAR", "DATETIME"
                                                            If drCond("IdSimboloCondicion").ToString() = "7" Then ' es like
                                                                txtCondicion += " ###%" & drCond("TextoCondicion").ToString() & "%###"
                                                            Else
                                                                txtCondicion += " ###" & drCond("TextoCondicion").ToString() & "###"
                                                            End If
                                                        Case "INT", "DECIMAL", "BIT"
                                                            txtCondicion += " " & drCond("TextoCondicion").ToString()
                                                    End Select
                                                    'txtCondicion += " " & drCond("TextoCondicion").ToString()
                                                ElseIf (Not IsDBNull(drCond("IdCampoTipSol"))) Then 'condicion con valor de la solicitud
                                                    If (nombreCampo <> "daFechaCreacion" And nombreCampo <> "daFechaModificacion" And nombreCampo <> "F_vcCodEmp" And nombreCampo <> "inUsuarioCreacion" And nombreCampo <> "inUsuarioModificacion") Then
                                                        'txtCondicion += " $$$ + $('#" & drCond("tipControl").ToString() & "_" & nombreCampo + "').val() + $$$"
                                                        Select Case (drCond("vcTipDatSQL"))
                                                            Case "VARCHAR", "DATETIME"
                                                                If drCond("IdSimboloCondicion").ToString() = "7" Then ' es like
                                                                    txtCondicion += " ###%$$$ + $('#" & drCond("tipControl").ToString() & "_" & nombreCampo + "').val() + $$$%###"
                                                                Else
                                                                    'bp_MOV_Linea_Linea_txtValorBusqueda
                                                                    'txtCondicion += " ###$$$ + $('#" & drCond("tipControl").ToString() & "_" & nombreCampo + "').val() + $$$###"
                                                                    txtCondicion += " ###$$$ + $('#bp_" & drCond("TabEntidad") & "_" & drCond("vcNomCamTipSol").ToString() & "_txtValorBusqueda').val() + $$$###"
                                                                End If
                                                            Case "INT", "DECIMAL", "BIT"
                                                                txtCondicion += " $$$ + $('#" & drCond("tipControl").ToString() & "_" & nombreCampo + "').val() + $$$"
                                                        End Select
                                                    Else
                                                        Select Case (nombreCampo)
                                                            Case "F_vcCodEmp"
                                                                txtCondicion += " ###$$$ + $('#hdfCodEmp').val() + $$$###"
                                                            Case "daFechaCreacion"
                                                                txtCondicion += " $$$ + $('#hdfFechaCreacion').val() + $$$"
                                                            Case "inUsuarioCreacion"
                                                                txtCondicion += " $$$ + $('#hdfUsuarioCreacion').val() + $$$"
                                                            Case Else
                                                                txtCondicion = ""
                                                        End Select
                                                    End If
                                                Else
                                                    Select Case (drCond("vcTipDatSQL").ToString())
                                                        Case "VARCHAR", "DATETIME"
                                                            If drCond("IdSimboloCondicion").ToString() = "7" Then ' es like
                                                                txtCondicion += " ###%" & drCond("ValorCampoRelacion").ToString() & "%###"
                                                            Else
                                                                txtCondicion += " ###" & drCond("ValorCampoRelacion").ToString() & "###"
                                                            End If
                                                        Case "INT", "DECIMAL", "BIT"
                                                            txtCondicion += " " & drCond("ValorCampoRelacion").ToString()
                                                    End Select
                                                End If
                                            Next
                                        End If
                                        bpControl.Condicion = txtCondicion

                                        If CodigoTipoSolicitud = "18" And bpControl.vcTab = "MOV_Dispositivo" Then
                                            bpControl.Condicion &= " AND [MOV_Linea].P_vcNum IS NULL "
                                        End If

                                        bpControl.VariableCondicionJQ = txtCondicionEdit
                                        If bpControl.vcTab = "MOV_Cuenta" AndAlso CodigoTipoSolicitud = "12" Then 'Cambio de Cuenta
                                            bpControl.VariableCondicionJQ = "CondicionJQuery_SeleccionLineaTipoServicio"
                                        End If

                                        If bpControl.vcTab = "MOV_Plan" AndAlso CodigoTipoSolicitud = "14" Then 'Cambio de Plan
                                            bpControl.VariableCondicionJQ = "CondicionJQuery_SeleccionLineaTipoServicioPlan"
                                        End If

                                        If bpControl.vcTab = "MOV_Plan" AndAlso CodigoTipoSolicitud = "20" Then 'Cambio de Cuenta y Plan
                                            bpControl.VariableCondicionJQ = "CondicionJQuery_SeleccionCuentaTipoServicio"
                                        End If

                                        'retVar += "var rowDatabp_" + bpControl.ID + "; " + vbNewLine
                                        retFunct += "function fnMostrarDatos_" & dr("vcTab").ToString() & "_" & dr("vcNomCam").ToString() & "(oValor) { " + vbNewLine

                                        If bpControl.vcTab = "MOV_Linea" Then
                                            retFunct += "   var valor = oValor.P_vcNum; "
                                            retFunct += "   if (valor == undefined) { valor = '';} "
                                            If CodigoTipoSolicitud = "12" Then 'Cambio de Cuenta
                                                'retFunct += "   $('#bp_MOV_Cuenta_Cuenta_txtValorBusqueda').val(''); bp_MOV_Cuenta_Cuenta_Valor = ''; "
                                            End If
                                            'FPASTOR: COMENTO ESTA PARTE DEL JS PORQUE AL EJECUTARSE ANTE SETEA EN ''EL VALOR DEL PLAN
                                            If CodigoTipoSolicitud = "14" Then 'Cambio de Plan
                                                retFunct += "   $('#bp_MOV_Plan_Plan_txtValorBusqueda').val(''); (bp_MOV_Plan_Plan_Valor === '' || bp_MOV_Plan_Plan_Valor === undefined) ?  bp_MOV_Plan_Plan_Valor = '' : bp_MOV_Plan_Plan_Valor = bp_MOV_Plan_Plan_Valor ; "
                                            End If
                                            retFunct += "   CondicionJQuery_SeleccionLineaTipoServicio = ' [MOV_TipoModeloDispositivo_X].Descripcion = " + Chr(34) + "' +  oValor.TipoServicio + '" + Chr(34) + "'; " '// oValor.TipoServicio; "
                                            retFunct += "   CondicionJQuery_SeleccionLineaTipoServicioPlan = ' [MOV_TipoModeloDispositivo].Descripcion = " + Chr(34) + "' +  oValor.TipoServicio + '" + Chr(34) + "'; " '// oValor.TipoServicio; "
                                        ElseIf bpControl.vcTab = "MOV_Cuenta" Then
                                            If CodigoTipoSolicitud = "20" Then 'Cambio de Cuenta y Plan
                                                retFunct += "   $('#bp_MOV_Plan_Plan_txtValorBusqueda').val(''); bp_MOV_Plan_Plan_Valor = ''; "
                                            End If
                                            retFunct += "   var valor = oValor.P_vcCod; "
                                            retFunct += "   CondicionJQuery_SeleccionCuentaTipoServicio = ' [MOV_TipoModeloDispositivo].Descripcion = " + Chr(34) + "' +  oValor.vcDesTipoServicio + '" + Chr(34) + "'; " '// oValor.TipoServicio; "
                                        Else
                                            retFunct += "   var valor = oValor; "
                                        End If

                                        If bpControl.TraerDatosFila = False Then
                                            retFunct += "   $('#ValHdf__" & dr("vcNomCam").ToString() & "__" & dr("Obligatorio").ToString() & "').val(valor);" + vbNewLine
                                        Else
                                            retFunct += "   if (valor == '') {"
                                            retFunct += "       $('#ValHdf__" & dr("vcNomCam").ToString() & "__" & dr("Obligatorio").ToString() & "').val('');" + vbNewLine
                                            retFunct += "       if ($('#hdfCodTipSol').val() == '30') { $('#ddl_TipoProducto').val('0=Seleccione'); }" + vbNewLine
                                            retFunct += "   } else {" + vbNewLine
                                            retFunct += "       $('#ValHdf__" & dr("vcNomCam").ToString() & "__" & dr("Obligatorio").ToString() & "').val(valor);" + vbNewLine
                                            retFunct += "       if ($('#hdfCodTipSol').val() == '30') {" + vbNewLine
                                            retFunct += "           valor.vcTipoProducto == 'Equipo' ? $('#ddl_TipoProducto').val('1=Equipo') : $('#ddl_TipoProducto').val('2=Servicio');" + vbNewLine
                                            retFunct += "       }" + vbNewLine
                                            retFunct += "   }" + vbNewLine
                                        End If
                                        retFunct += "} "

                                        bpControl.IdDescripcion = "$('#ValHdf__" & dr("vcNomCam").ToString() & "_IdDescripcion" & "__" & dr("Obligatorio").ToString() & "').val();"
                                        bpControl.Attributes("nomTab") = dr("vcTab").ToString()
                                        'If (bpControl.Visible) Then

                                        'End If
                                        dvContenedor.Controls.Add(bpControl)
                                        dvContenedor.Controls.Add(hidden)
                                        tdDDim.Controls.Add(dvContenedor)

                                        tdDDim.Controls.Add(hidden)
                                    ElseIf dr("F_inCodTipDat").ToString = "8" Then
                                        Dim ddlPicklist As New DropDownList
                                        ddlPicklist.ID = "ddl_" & dr("vcNomCam").ToString
                                        ddlPicklist.CssClass = "PICKLIST" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                                        ddlPicklist.Attributes("obj") = dr("vcNomCam").ToString
                                        ddlPicklist.Attributes("oblig") = Convert.ToBoolean(dr("Obligatorio")).ToString()
                                        ddlPicklist.Width = New Unit(200, UnitType.Pixel)
                                        ddlPicklist.Attributes("tipDat") = "VARCHAR (35)"
                                        ddlPicklist.Width = "300"
                                        Dim mValores() As String = dr("vcLon").ToString().Split(",")
                                        'agregado 12-01-2015 wapumayta
                                        If dr("ListaActivos").ToString() = "" Then 'no se detecta lista de estados (para solicitudes anuladas o culminadas)
                                            For Each strValor As String In mValores
                                                ddlPicklist.Items.Add(strValor)
                                            Next
                                        Else
                                            Dim mValoresEstado() As String = dr("ListaActivos").ToString().Split(",")
                                            For i = 0 To mValores.Length - 1
                                                If (mValoresEstado(i) = "1") Then
                                                    ddlPicklist.Items.Add(mValores(i))
                                                End If
                                            Next
                                        End If

                                        ddlPicklist.Enabled = Convert.ToBoolean(dr("Editable"))

                                        If DeshabilitaControles Then ddlPicklist.Enabled = False

                                        tdDDim.Controls.Add(ddlPicklist)
                                    Else
                                        If ((Convert.ToBoolean(dr("Visible")) = False) And dr("vcNomCam").Contains("IdDescripcion")) Then
                                            Dim hiddenIdDescripcion As New HiddenField
                                            hiddenIdDescripcion.ID = "ValHdf__" & dr("vcNomCam").ToString() & "__" & dr("Obligatorio").ToString()
                                            hiddenIdDescripcion.Value = dr("vcValor").ToString()
                                            'Dim dvContenedor As New HtmlGenericControl
                                            'dvContenedor.Controls.Add(hiddenIdDescripcion)
                                            tdDDim.Controls.Add(hiddenIdDescripcion)
                                        Else
                                            Dim txtVARCHAR As New TextBox
                                            txtVARCHAR.ID = "txt_" & dr("vcNomCam").ToString
                                            txtVARCHAR.Attributes("maxlength") = dr("vcLon").ToString
                                            txtVARCHAR.CssClass = "VARCHAR" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                                            txtVARCHAR.Attributes("obj") = dr("vcNomCam").ToString
                                            txtVARCHAR.Attributes("oblig") = Convert.ToBoolean(dr("Obligatorio")).ToString()
                                            txtVARCHAR.Attributes("longMin") = dr("vcLonMinima").ToString()
                                            txtVARCHAR.Attributes("tipDat") = dr("dcTipDatSQL").ToString + "(" + dr("vcLon").ToString + ")"

                                            Dim validaTexto As Boolean = Convert.ToBoolean(dr("ValidaTexto"))
                                            Dim validaNumero As Boolean = Convert.ToBoolean(dr("ValidaNumero"))

                                            If validaTexto = True Or validaNumero = True Then
                                                txtVARCHAR.CssClass = "VARCHAR" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "") & " ctrlValida"
                                            Else
                                                txtVARCHAR.CssClass = "VARCHAR" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                                            End If
                                            Dim tipo_validacion As String = ""
                                            If validaTexto = True And validaNumero = True Then
                                                tipo_validacion = "alfanumerico"
                                            ElseIf validaTexto = False And validaNumero = True Then
                                                tipo_validacion = "solonumero"
                                            ElseIf validaTexto = True And validaNumero = False Then
                                                tipo_validacion = "solotexto"
                                            Else
                                                tipo_validacion = ""
                                            End If
                                            txtVARCHAR.Attributes("funValida") = tipo_validacion

                                            'txtVARCHAR.Width = "120"

                                            If dr("vcLon").ToString().ToUpper() = "MAX" OrElse Convert.ToInt32(dr("vcLon") > 80) Then
                                                txtVARCHAR.TextMode = TextBoxMode.MultiLine
                                                txtVARCHAR.Height = New Unit(60, UnitType.Pixel)
                                                txtVARCHAR.Width = New Unit(350, UnitType.Pixel)
                                            ElseIf (Convert.ToInt32(dr("vcLon") > 40)) Then
                                                txtVARCHAR.Width = Convert.ToInt32(dr("vcLon")) * 6
                                            ElseIf (Convert.ToInt32(dr("vcLon") > 20)) Then
                                                txtVARCHAR.Width = Convert.ToInt32(dr("vcLon")) * 10
                                            Else
                                                txtVARCHAR.Width = Convert.ToInt32(dr("vcLon")) * 14
                                            End If
                                            txtVARCHAR.Enabled = Convert.ToBoolean(dr("Editable"))

                                            If DeshabilitaControles Then txtVARCHAR.Enabled = False

                                            tdDDim.Controls.Add(txtVARCHAR)
                                        End If
                                    End If
                                Case "PERIODO"
                                    Dim txtPERIODO As New TextBox
                                    txtPERIODO.ID = "txt_" & dr("vcNomCam").ToString
                                    txtPERIODO.CssClass = "PERIODO" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                                    txtPERIODO.Attributes("obj") = dr("vcNomCam").ToString
                                    txtPERIODO.Attributes("oblig") = Convert.ToBoolean(dr("Obligatorio")).ToString()
                                    txtPERIODO.Attributes("tipDat") = dr("dcTipDatSQL").ToString
                                    txtPERIODO.Width = "85"
                                    txtPERIODO.MaxLength = 7
                                    txtPERIODO.Enabled = Convert.ToBoolean(dr("Editable"))

                                    If DeshabilitaControles Then txtPERIODO.Enabled = False

                                    tdDDim.Controls.Add(txtPERIODO)

                                Case "DATE"
                                    Dim txtSMALLDATETIME As New TextBox
                                    txtSMALLDATETIME.ID = "txt_" & dr("vcNomCam").ToString
                                    txtSMALLDATETIME.CssClass = "DATE" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                                    txtSMALLDATETIME.Attributes("obj") = dr("vcNomCam").ToString
                                    txtSMALLDATETIME.Attributes("oblig") = Convert.ToBoolean(dr("Obligatorio")).ToString()
                                    txtSMALLDATETIME.Attributes("tipDat") = dr("dcTipDatSQL").ToString
                                    txtSMALLDATETIME.Width = "60"
                                    txtSMALLDATETIME.Enabled = Convert.ToBoolean(dr("Editable"))
                                    'txtSMALLDATETIME.Attributes.Add("onkeydown", "return (event.keyCode!=8);")

                                    If DeshabilitaControles Then txtSMALLDATETIME.Enabled = False

                                    tdDDim.Controls.Add(txtSMALLDATETIME)
                                    'imagen borrador (limpiar fecha)
                                    If (txtSMALLDATETIME.Enabled) Then
                                        Dim imgClearDate As New Image
                                        imgClearDate.ID = "imgBorrarFecha_" & dr("vcNomCam").ToString
                                        imgClearDate.Attributes.Add("controlLimpiar", txtSMALLDATETIME.ID)
                                        imgClearDate.ImageUrl = "../../../Common/Images/Mantenimiento/Borrar.png"
                                        imgClearDate.CssClass = "imgBtn"
                                        imgClearDate.ToolTip = "Limpiar fecha"
                                        imgClearDate.ImageAlign = ImageAlign.AbsBottom
                                        tdDDim.Controls.Add(imgClearDate)
                                    End If

                                Case "DATETIME"
                                    'If pstrNombreTabla <> "MOV_ModeloDispositivoOperador" Then
                                    Dim txtDATETIME As New TextBox
                                    txtDATETIME.ID = "txt_" & dr("vcNomCam").ToString
                                    txtDATETIME.CssClass = "DATETIME" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                                    txtDATETIME.Attributes("obj") = dr("vcNomCam").ToString
                                    txtDATETIME.Attributes("oblig") = Convert.ToBoolean(dr("Obligatorio")).ToString()
                                    txtDATETIME.Attributes("tipDat") = dr("dcTipDatSQL").ToString
                                    txtDATETIME.Width = "120"
                                    txtDATETIME.Enabled = Convert.ToBoolean(dr("Editable"))
                                    'txtDATETIME.Attributes.Add("onkeydown", "return (event.keyCode!=8);")

                                    If DeshabilitaControles Then txtDATETIME.Enabled = False

                                    tdDDim.Controls.Add(txtDATETIME)
                                    'imagen borrador (limpiar fecha)
                                    If (txtDATETIME.Enabled) Then
                                        Dim imgClearDate As New Image
                                        imgClearDate.ID = "imgBorrarFecha_" & dr("vcNomCam").ToString
                                        imgClearDate.Attributes.Add("controlLimpiar", txtDATETIME.ID)
                                        imgClearDate.ImageUrl = "../../../Common/Images/Mantenimiento/Borrar.png"
                                        imgClearDate.CssClass = "imgBtn"
                                        imgClearDate.ToolTip = "Limpiar fecha"
                                        imgClearDate.ImageAlign = ImageAlign.AbsBottom
                                        tdDDim.Controls.Add(imgClearDate)
                                    End If

                                Case "BIT"

                                    Dim ddlPicklist As New DropDownList
                                    ddlPicklist.ID = "ddl_" & dr("vcNomCam").ToString
                                    ddlPicklist.CssClass = "BIT" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                                    ddlPicklist.Attributes("obj") = dr("vcNomCam").ToString
                                    ddlPicklist.Attributes("oblig") = Convert.ToBoolean(dr("Obligatorio")).ToString()
                                    ddlPicklist.Width = New Unit(200, UnitType.Pixel)
                                    ddlPicklist.Attributes("tipDat") = "VARCHAR (35)"
                                    ddlPicklist.Width = "130"
                                    Dim mValores() As String = dr("vcLon").ToString().Split(",")
                                    Dim inContador As Integer = 1
                                    For Each strValor As String In mValores
                                        ddlPicklist.Items.Add(New ListItem(strValor, inContador))
                                        inContador -= 1
                                    Next
                                    ddlPicklist.Enabled = Convert.ToBoolean(dr("Editable"))

                                    If DeshabilitaControles Then ddlPicklist.Enabled = False

                                    tdDDim.Controls.Add(ddlPicklist)

                                Case "VARBINARY"
                                    Dim vcClass = "VARBINARY"
                                    Dim vcStyle = "display: inline-block; cursor: normal !important;"
                                    Dim vcImagen = ""

                                    If Convert.ToBoolean(dr("Editable") And DeshabilitaControles = False) Then
                                        vcClass = "VARBINARY imgButton"
                                        vcStyle = "display: inline-block; cursor: hand !important;"
                                    End If

                                    Dim vcDiv = ""
                                    If (lstCaracteristica.Columns.Contains("vcValor") = False) Then 'Creación de Solicitud
                                        If Convert.ToBoolean(dr("Editable")) Then
                                            vcImagen = "<img alt='' src='../../../Common/Images/Mantenimiento/SubirArchivo.png' width='16px' height='16px'/>"
                                        End If
                                        vcDiv += "<div class='UploadDiv' style='" + vcStyle + "'>"
                                        vcDiv += "<div id='upl_" + dr("vcNomCam").ToString + "' obj='" + dr("vcNomCam").ToString + "' oblig='" + Convert.ToBoolean(dr("Obligatorio")).ToString() + "' "
                                        vcDiv += "tipDat='VARBINARY(MAX)' vcTipExt='" + dr("vcLon").ToString() + "' class='" + vcClass + "' "
                                        vcDiv += "align='center' style='text-align:left;'><table><tr>"
                                        vcDiv += "<td style='text-align:left;'>" + vcImagen + "</td>"
                                        vcDiv += "<td style='vertical-align:bottom; text-decoration:underline;'>Adjuntar Archivo</td></tr></table></div>"
                                        vcDiv += "<div style='text-decoration:underline;' id='file_" + dr("vcNomCam").ToString + "'></div></div>"
                                    ElseIf dr("vcValor") = "" Then 'Edición de solicitud y campo vacío
                                        If Convert.ToBoolean(dr("Editable")) Then
                                            vcImagen = "<img alt='' src='../../../Common/Images/Mantenimiento/SubirArchivo.png' width='16px' height='16px'/>"
                                        End If
                                        vcDiv += "<div class='UploadDiv' style='" + vcStyle + "'>"
                                        vcDiv += "<div id='upl_" + dr("vcNomCam").ToString + "' obj='" + dr("vcNomCam").ToString + "' oblig='" + Convert.ToBoolean(dr("Obligatorio")).ToString() + "' "
                                        vcDiv += "tipDat='VARBINARY(MAX)' vcTipExt='" + dr("vcLon").ToString() + "' class='" + vcClass + "' "
                                        vcDiv += "align='center' style='text-align:left;'><table><tr>"
                                        vcDiv += "<td style='text-align:left;'>" + vcImagen + "</td>"
                                        vcDiv += "<td style='vertical-align:bottom; text-decoration:underline;'>Adjuntar Archivo</td></tr></table></div>"
                                        vcDiv += "<div style='text-decoration:underline'; id='file_" + dr("vcNomCam").ToString + "'></div></div>"
                                    Else 'Edición de solicitud y campo NO vacío 

                                        Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Solicitudes//", "//")

                                        If Convert.ToBoolean(dr("Editable")) Then
                                            'Descargar Adjunto
                                            Dim vcFilePath = HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Solicitudes" + CarpetaDominio + "//" + dr("vcValor").ToString()
                                            Dim byFileData As Byte() = dr("byArchivo")
                                            File.WriteAllBytes(vcFilePath, byFileData)
                                            vcImagen = "<img src='../../../Common/Images/remove.png' onclick=""DeleteFile('" + dr("vcValor") + "','" + dr("vcNomCam").ToString + "')""/>"
                                        End If

                                        vcDiv += "<div class='UploadDiv' style='" + vcStyle + "'>"
                                        vcDiv += "<div id='upl_" + dr("vcNomCam").ToString + "' obj='" + dr("vcNomCam").ToString + "' oblig='" + Convert.ToBoolean(dr("Obligatorio")).ToString() + "' "
                                        vcDiv += "tipDat='VARBINARY(MAX)' vcTipExt='" + dr("vcLon").ToString() + "' class='" + vcClass + "' style='text-align:left; display: none;' "
                                        vcDiv += "align='center' style='text-align:left;'><table><tr>"
                                        vcDiv += "<td style='text-align:left;'><img alt='' src='../../../Common/Images/Mantenimiento/SubirArchivo.png' width='16px' height='16px'/></td>"
                                        vcDiv += "<td style='vertical-align:bottom; text-decoration:underline;'>Adjuntar Archivo</td></tr></table></div>"
                                        vcDiv += "<div style='text-decoration:underline'; id='file_" + dr("vcNomCam").ToString + "'>"
                                        vcDiv += "<div class='imgBtn' style='margin-top:1px; height:21px; margin-left: 2px;' >" + vcImagen
                                        vcDiv += "<span style='margin-left:5px;' id='span_" + dr("vcNomCam").ToString + "' style='text-decoration:underline;' nombre='" + dr("vcValor").ToString() + "'>"
                                        vcDiv += dr("vcValor").ToString() + "</span></div></div></div>"

                                    End If

                                    tdDDim.InnerHtml = vcDiv

                            End Select

                            trDim.Cells.Add(tdIDim)
                            trDim.Cells.Add(tdDDim)
                            'If Not (pstrNombreTabla = "MOV_ModeloDispositivoOperador" And dr("dcTipDatSQL").ToString = "DATETIME") Then
                            tbCamposDinamicos.Rows.Add(trDim)
                            'End If
                        End If
                    End If
                Next

                If estadoLeyenda Then
                    Dim trNota As New HtmlTableRow
                    Dim tdNota As New HtmlTableCell

                    trNota.Style("height") = "25px"
                    trNota.Style("vertical-align") = "bottom"

                    Dim lblObli As New Label
                    lblObli.Text = "(*)"
                    lblObli.Style("color") = "Red"
                    tdNota.Controls.Add(lblObli)
                    Dim lblNota As New Label
                    lblNota.Text = " El dato es requerido."
                    tdNota.Controls.Add(lblNota)

                    tdNota.ColSpan = 2
                    trNota.Cells.Add(tdNota)
                    tbCamposDinamicos.Rows.Add(trNota)
                End If
            End If

            Return retVar + " " + retFunct

        Catch ex As Exception

            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)

        End Try

    End Function

    Public Sub ObtenerValoresControlesDinamicosMantenimiento(ByVal pstrNombreTabla As String, ByRef objPage As Page, ByVal dtValores As DataTable)
        If objPage Is Nothing Then Exit Sub
        If dtValores Is Nothing Then Exit Sub

        Try
            Dim lstCaracteristica As DataTable
            Dim Caracteristica As BL_MOV_Caracteristica = New BL_MOV_Caracteristica(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            lstCaracteristica = Caracteristica.ListarxTabla(pstrNombreTabla, "", "")
            If lstCaracteristica Is Nothing Then Exit Sub
            Dim objControlFinder As New ControlFinder

            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            System.Threading.Thread.CurrentThread.CurrentCulture.NumberFormat.CurrencyDecimalSeparator = oCultura.vcSimDec.ToString()
            System.Threading.Thread.CurrentThread.CurrentCulture.NumberFormat.CurrencyGroupSeparator = oCultura.vcSimSepMil.ToString()
            System.Threading.Thread.CurrentThread.CurrentCulture.NumberFormat.NumberDecimalSeparator = oCultura.vcSimDec.ToString()
            System.Threading.Thread.CurrentThread.CurrentCulture.NumberFormat.NumberGroupSeparator = oCultura.vcSimSepMil.ToString()

            Dim strForNum As String = ""

            If lstCaracteristica.Rows.Count > 0 AndAlso dtValores.Rows.Count > 0 Then
                For Each dr As DataRow In lstCaracteristica.Rows
                    Select Case dr("dcTipDatSQL").ToString
                        Case "INT"
                            strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenericoEntero(oCultura)
                            CType(objControlFinder.FindControlRecursive(objPage, "txt_" & dr("vcNomCam").ToString), TextBox).Text = UtilitarioWeb.DevuelveNumeroFormateado(IIf(IsDBNull(dtValores.Rows(0)(dr("vcNomCam").ToString)), "", dtValores.Rows(0)(dr("vcNomCam").ToString)), strForNum)
                        Case "DECIMAL"
                            strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura)
                            Try
                                CType(objControlFinder.FindControlRecursive(objPage, "txt_" & dr("vcNomCam").ToString), TextBox).Text = UtilitarioWeb.DevuelveNumeroFormateado(IIf(IsDBNull(dtValores.Rows(0)(dr("vcNomCam").ToString)), "", dtValores.Rows(0)(dr("vcNomCam").ToString)), strForNum)
                            Catch ex As Exception
                            End Try
                            Try
                                CType(objControlFinder.FindControlRecursive(objPage, "txt_" & dr("vcNomCam").ToString), TextBox).Text = UtilitarioWeb.DevuelveNumeroFormateado(IIf(IsDBNull(dtValores.Rows(0)(dr("vcNomCam").ToString)), "", dtValores.Rows(0)(dr("vcNomCam").ToString)), strForNum)
                            Catch ex As Exception
                            End Try
                        Case "VARCHAR"
                            If dr("F_inCodTipDat").ToString = "8" Then
                                Dim strValor As String = IIf(IsDBNull(dtValores.Rows(0)(dr("vcNomCam").ToString)), "", dtValores.Rows(0)(dr("vcNomCam").ToString))
                                If Trim(strValor) = "" Then
                                    CType(objControlFinder.FindControlRecursive(objPage, "ddl_" & dr("vcNomCam").ToString), DropDownList).SelectedIndex = -1
                                    CType(objControlFinder.FindControlRecursive(objPage, "ddl_" & dr("vcNomCam").ToString), DropDownList).Text = ""
                                Else
                                    CType(objControlFinder.FindControlRecursive(objPage, "ddl_" & dr("vcNomCam").ToString), DropDownList).Text = strValor
                                End If
                            Else
                                CType(objControlFinder.FindControlRecursive(objPage, "txt_" & dr("vcNomCam").ToString), TextBox).Text = IIf(IsDBNull(dtValores.Rows(0)(dr("vcNomCam").ToString)), "", dtValores.Rows(0)(dr("vcNomCam").ToString)).Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                                'EDGAR GARCIA 17012023 SE AGREGA EL BLOQUEO DEL CAMPO USUARIOMODIFICADOR
                                If dr("vcNomCam").ToString = "vcNomUsuModif" Then
                                    Dim myTextBox As TextBox = CType(objControlFinder.FindControlRecursive(objPage, "txt_" & dr("vcNomCam").ToString()), TextBox)
                                    myTextBox.Enabled = False
                                End If
                            End If
                        Case "DATE"
                            CType(objControlFinder.FindControlRecursive(objPage, "txt_" & dr("vcNomCam").ToString), TextBox).Text = IIf(IsDBNull(dtValores.Rows(0)(dr("vcNomCam").ToString)), "", dtValores.Rows(0)(dr("vcNomCam").ToString))
                        Case "DATETIME"
                            If pstrNombreTabla <> "MOV_ModeloDispositivoOperador" Then
                                CType(objControlFinder.FindControlRecursive(objPage, "txt_" & dr("vcNomCam").ToString), TextBox).Text = IIf(IsDBNull(dtValores.Rows(0)(dr("vcNomCam").ToString)), "", dtValores.Rows(0)(dr("vcNomCam").ToString))
                            End If
                        Case "BIT"
                            If Not IsDBNull(dtValores.Rows(0)(dr("vcNomCam"))) Then
                                Dim blValor As Boolean = IIf(IsDBNull(dtValores.Rows(0)(dr("vcNomCam"))), False, dtValores.Rows(0)(dr("vcNomCam")))
                                If blValor = True Then
                                    CType(objControlFinder.FindControlRecursive(objPage, "ddl_" & dr("vcNomCam").ToString), DropDownList).SelectedIndex = 0
                                Else
                                    CType(objControlFinder.FindControlRecursive(objPage, "ddl_" & dr("vcNomCam").ToString), DropDownList).SelectedIndex = 1
                                End If
                            Else
                                CType(objControlFinder.FindControlRecursive(objPage, "ddl_" & dr("vcNomCam").ToString), DropDownList).SelectedIndex = 1
                            End If
                            'CUANDO SE AGREGUE SOLO EL CAMPO DE REQUIERE AUTORIZACION
                            If (dr("vcNomCam").ToString = "RequiereAutorizacion" And pstrNombreTabla = "M_ORGA") Then
                                Dim organizacion As BL_GEN_OrganizacionG = New BL_GEN_OrganizacionG(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                                UtilitarioWeb.DataLst(CType(objControlFinder.FindControlRecursive(objPage, "lstAutorizadores"), ListBox),
                                                      organizacion.ListarOrgaJefatura(dtValores.Rows(0)("ORGA_P_inCODINT"), True), "EMPL_vcNOMEMP", "vcCodEmp")
                                organizacion.Dispose()
                            End If
                    End Select
                Next
            End If
            Caracteristica.Dispose()
        Catch ex As Exception

            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)

        End Try

    End Sub

    Public Sub CrearLabelsDinamicosMantenimiento(ByVal pstrNombreTabla As String,
                                                    ByVal drValores As DataRow, _
                                                    ByRef tbCamposDinamicos As Object, _
                                                    Optional ByVal inQuitarRowsCamposDinamicos As Integer = 0, _
                                                    Optional ByVal pstrClaseAdicional As String = ""
                                                    )

        If tbCamposDinamicos Is Nothing Then Exit Sub

        Try
            Dim lstCaracteristica As DataTable
            Dim Caracteristica As BL_MOV_Caracteristica = New BL_MOV_Caracteristica(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            lstCaracteristica = Caracteristica.ListarxTabla(pstrNombreTabla, "", "")

            If lstCaracteristica Is Nothing Then Exit Sub
            'Quitar campos que en la solicitud no va a usar o no va a mostrar
            If inQuitarRowsCamposDinamicos = 1 Then
                For i As Integer = 0 To lstCaracteristica.Rows.Count - 1
                    If lstCaracteristica.Rows(i)("vcNomCam") = "btMosEnSol" Then
                        lstCaracteristica.Rows().RemoveAt(i)
                        Exit For
                    End If
                Next
            End If
            If lstCaracteristica.Rows.Count > 0 Then
                For Each dr As DataRow In lstCaracteristica.Rows
                    Dim trDim As New HtmlTableRow
                    Dim tdIDim As New HtmlTableCell
                    Dim tdDDim As New HtmlTableCell
                    tdIDim.InnerText = "<b>" & dr("vcDesCam").ToString & "</b>"
                    'tdIDim.Width = "130"
                    tdIDim.Attributes("class") = "tdEtiqueta"

                    If dr("dcTipDatSQL").ToString <> "IMAGE" Then
                        tdIDim.InnerText = dr("vcDesCam").ToString
                        'tdIDim.Width = "130"
                    End If

                    If dr("dcTipDat").ToString = "Fecha" Then
                        dr("dcTipDatSQL") = "DATE"
                    End If

                    Select Case dr("dcTipDatSQL").ToString
                        Case "INT"
                            Dim lblINT As New Label
                            lblINT.ID = "txt_" & dr("vcNomCam").ToString
                            lblINT.CssClass = "INT" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                            lblINT.Attributes("obj") = dr("vcNomCam").ToString
                            lblINT.Attributes("tipDat") = dr("dcTipDatSQL").ToString
                            lblINT.Width = "120"
                            lblINT.Text = drValores(dr("vcNomCam").ToString).ToString
                            tdDDim.Controls.Add(lblINT)
                        Case "DECIMAL"
                            Dim lblDECIMAL As New Label
                            lblDECIMAL.ID = "txt_" & dr("vcNomCam").ToString
                            lblDECIMAL.CssClass = "DECIMAL" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                            Dim longitud As String() = dr("vcLon").ToString().Split(",")
                            lblDECIMAL.Attributes("obj") = dr("vcNomCam").ToString
                            lblDECIMAL.Attributes("tipDat") = dr("dcTipDatSQL").ToString + "(" + dr("vcLon").ToString + ")"
                            lblDECIMAL.Width = "120"
                            lblDECIMAL.Text = Caracteristica.ObtenerMontoTotalFormateada(IIf(drValores(dr("vcNomCam").ToString).ToString <> "", drValores(dr("vcNomCam").ToString).ToString, 0))
                            tdDDim.Controls.Add(lblDECIMAL)
                        Case "VARCHAR"
                            Dim lblVARCHAR As New Label
                            lblVARCHAR.ID = "txt_" & dr("vcNomCam").ToString
                            lblVARCHAR.Attributes("maxlength") = dr("vcLon").ToString
                            lblVARCHAR.CssClass = "VARCHAR" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                            lblVARCHAR.Attributes("obj") = dr("vcNomCam").ToString
                            lblVARCHAR.Attributes("tipDat") = dr("dcTipDatSQL").ToString + "(" + dr("vcLon").ToString + ")"
                            lblVARCHAR.Width = "120"
                            lblVARCHAR.Text = drValores(dr("vcNomCam").ToString).ToString

                            If dr("F_inCodTipDat").ToString <> "8" Then
                                If Convert.ToInt32(dr("vcLon")) > 80 Then
                                    lblVARCHAR.Height = New Unit(30, UnitType.Pixel)
                                    ''lblVARCHAR.Width = New Unit(200, UnitType.Pixel)
                                End If
                            End If
                            tdDDim.Controls.Add(lblVARCHAR)
                        Case "DATE"
                            Dim lblSMALLDATETIME As New Label
                            lblSMALLDATETIME.ID = "txt_" & dr("vcNomCam").ToString
                            lblSMALLDATETIME.CssClass = "DATE" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                            lblSMALLDATETIME.Attributes("obj") = dr("vcNomCam").ToString
                            lblSMALLDATETIME.Attributes("tipDat") = dr("dcTipDatSQL").ToString
                            lblSMALLDATETIME.Width = "120"
                            lblSMALLDATETIME.Text = drValores(dr("vcNomCam").ToString).ToString
                            tdDDim.Controls.Add(lblSMALLDATETIME)
                        Case "DATETIME"
                            Dim lblDATETIME As New Label
                            lblDATETIME.ID = "txt_" & dr("vcNomCam").ToString
                            lblDATETIME.CssClass = "DATETIME" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                            lblDATETIME.Attributes("obj") = dr("vcNomCam").ToString
                            lblDATETIME.Attributes("tipDat") = dr("dcTipDatSQL").ToString
                            lblDATETIME.Width = "120"
                            lblDATETIME.Text = drValores(dr("vcNomCam").ToString).ToString
                            tdDDim.Controls.Add(lblDATETIME)
                        Case "BIT"
                            Dim lblBIT As New Label
                            lblBIT.ID = "chk_" & dr("vcNomCam").ToString
                            lblBIT.CssClass = "BIT" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                            lblBIT.Attributes("obj") = dr("vcNomCam").ToString
                            lblBIT.Width = New Unit(200, UnitType.Pixel)
                            lblBIT.Attributes("tipDat") = "VARCHAR (35)"
                            lblBIT.Width = "120"
                            If Not IsDBNull(drValores(dr("vcNomCam").ToString)) Then
                                If Boolean.Parse(drValores(dr("vcNomCam").ToString).ToString) Then
                                    lblBIT.Text = "Si"
                                Else
                                    lblBIT.Text = "No"
                                End If
                                tdDDim.Controls.Add(lblBIT)
                            End If
                    End Select

                    If dr("dcTipDatSQL").ToString <> "IMAGE" Then
                        trDim.Cells.Add(tdIDim)
                        trDim.Cells.Add(tdDDim)
                        tbCamposDinamicos.Rows.Add(trDim)
                    End If
                Next
            End If
            Caracteristica.Dispose()
        Catch ex As Exception

            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)

        End Try
    End Sub

    Public Sub CrearLabelsDinamicosMantenimiento_Dashboard(ByVal pstrNombreTabla As String,
                                                    ByVal drValores As DataRow, _
                                                    ByRef tbCamposDinamicos As Object, _
                                                    Optional ByVal inQuitarRowsCamposDinamicos As Integer = 0, _
                                                    Optional ByVal pstrClaseAdicional_Izquierda As String = "", _
                                                    Optional ByVal pstrClaseAdicional As String = ""
                                                    )

        If tbCamposDinamicos Is Nothing Then Exit Sub

        Try
            Dim lstCaracteristica As DataTable
            Dim Caracteristica As BL_MOV_Caracteristica = New BL_MOV_Caracteristica(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            lstCaracteristica = Caracteristica.ListarxTabla_Dashboard(pstrNombreTabla)

            If lstCaracteristica Is Nothing Then Exit Sub
            'Quitar campos que en la solicitud no va a usar o no va a mostrar
            If inQuitarRowsCamposDinamicos = 1 Then
                For i As Integer = 0 To lstCaracteristica.Rows.Count - 1
                    If lstCaracteristica.Rows(i)("vcNomCam") = "btMosEnSol" Then
                        lstCaracteristica.Rows().RemoveAt(i)
                        Exit For
                    End If
                Next
            End If





            If lstCaracteristica.Rows.Count > 0 Then

                Dim trDim As New HtmlTableRow
                Dim iContador As Integer = 0
                For Each dr As DataRow In lstCaracteristica.Rows

                    iContador += 1
                    If iContador Mod 2 <> 0 Then
                        trDim = New HtmlTableRow
                    End If


                    Dim tdIDim As New HtmlTableCell
                    Dim tdDDim As New HtmlTableCell
                    tdIDim.InnerText = "<b>" & dr("vcDesCam").ToString & "</b>"
                    tdIDim.Width = "130"
                    tdIDim.Attributes("class") = "tdEtiqueta" & IIf(pstrClaseAdicional_Izquierda.Trim <> "", " " & pstrClaseAdicional_Izquierda, "")

                    If dr("dcTipDatSQL").ToString <> "IMAGE" Then
                        tdIDim.InnerText = dr("vcDesCam").ToString
                        tdIDim.Width = "130"
                    End If

                    If dr("dcTipDat").ToString = "Fecha" Then
                        dr("dcTipDatSQL") = "DATE"
                    End If

                    Select Case dr("dcTipDatSQL").ToString
                        Case "INT"
                            Dim lblINT As New Label
                            lblINT.ID = "txt_" & dr("P_inCod").ToString
                            lblINT.CssClass = "INT" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                            lblINT.Attributes("obj") = dr("vcNomCam").ToString
                            lblINT.Attributes("tipDat") = dr("dcTipDatSQL").ToString
                            'lblINT.Width = "120"
                            lblINT.Text = drValores(dr("vcNomCam").ToString).ToString
                            tdDDim.Controls.Add(lblINT)
                        Case "DECIMAL"
                            Dim lblDECIMAL As New Label
                            lblDECIMAL.ID = "txt_" & dr("P_inCod").ToString
                            lblDECIMAL.CssClass = "DECIMAL" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                            Dim longitud As String() = dr("vcLon").ToString().Split(",")
                            lblDECIMAL.Attributes("obj") = dr("vcNomCam").ToString
                            lblDECIMAL.Attributes("tipDat") = dr("dcTipDatSQL").ToString + "(" + dr("vcLon").ToString + ")"
                            'lblDECIMAL.Width = "120"
                            lblDECIMAL.Text = Caracteristica.ObtenerMontoTotalFormateada(IIf(drValores(dr("vcNomCam").ToString).ToString <> "", drValores(dr("vcNomCam").ToString).ToString, 0))
                            tdDDim.Controls.Add(lblDECIMAL)
                        Case "VARCHAR"
                            Dim lblVARCHAR As New Label
                            lblVARCHAR.ID = "txt_" & dr("P_inCod").ToString
                            lblVARCHAR.Attributes("maxlength") = dr("vcLon").ToString
                            lblVARCHAR.CssClass = "VARCHAR" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                            lblVARCHAR.Attributes("obj") = dr("vcNomCam").ToString
                            lblVARCHAR.Attributes("tipDat") = dr("dcTipDatSQL").ToString + "(" + dr("vcLon").ToString + ")"
                            'lblVARCHAR.Width = "120"
                            lblVARCHAR.Text = drValores(dr("vcNomCam").ToString).ToString

                            If dr("F_inCodTipDat").ToString <> "8" Then
                                If Convert.ToInt32(dr("vcLon")) > 80 Then
                                    lblVARCHAR.Height = New Unit(60, UnitType.Pixel)
                                    lblVARCHAR.Width = New Unit(200, UnitType.Pixel)
                                End If
                            End If
                            tdDDim.Controls.Add(lblVARCHAR)
                        Case "DATE"
                            Dim lblSMALLDATETIME As New Label
                            lblSMALLDATETIME.ID = "txt_" & dr("P_inCod").ToString
                            lblSMALLDATETIME.CssClass = "DATE" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                            lblSMALLDATETIME.Attributes("obj") = dr("vcNomCam").ToString
                            lblSMALLDATETIME.Attributes("tipDat") = dr("dcTipDatSQL").ToString
                            'lblSMALLDATETIME.Width = "120"
                            lblSMALLDATETIME.Text = drValores(dr("vcNomCam").ToString).ToString
                            tdDDim.Controls.Add(lblSMALLDATETIME)
                        Case "DATETIME"
                            Dim lblDATETIME As New Label
                            lblDATETIME.ID = "txt_" & dr("P_inCod").ToString
                            lblDATETIME.CssClass = "DATETIME" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                            lblDATETIME.Attributes("obj") = dr("vcNomCam").ToString
                            lblDATETIME.Attributes("tipDat") = dr("dcTipDatSQL").ToString
                            'lblDATETIME.Width = "120"
                            lblDATETIME.Text = drValores(dr("vcNomCam").ToString).ToString
                            tdDDim.Controls.Add(lblDATETIME)
                        Case "BIT"
                            Dim lblBIT As New Label
                            lblBIT.ID = "chk_" & dr("P_inCod").ToString
                            lblBIT.CssClass = "BIT" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                            lblBIT.Attributes("obj") = dr("vcNomCam").ToString
                            lblBIT.Width = New Unit(200, UnitType.Pixel)
                            lblBIT.Attributes("tipDat") = "VARCHAR (35)"
                            'lblBIT.Width = "120"
                            If Not IsDBNull(drValores(dr("vcNomCam").ToString)) Then
                                If Boolean.Parse(drValores(dr("vcNomCam").ToString).ToString) Then
                                    lblBIT.Text = "Si"
                                Else
                                    lblBIT.Text = "No"
                                End If
                                tdDDim.Controls.Add(lblBIT)
                            End If
                    End Select

                    If dr("dcTipDatSQL").ToString <> "IMAGE" Then
                        trDim.Cells.Add(tdIDim)
                        trDim.Cells.Add(tdDDim)

                        If iContador Mod 2 = 0 OrElse iContador >= lstCaracteristica.Rows.Count Then
                            tbCamposDinamicos.Rows.Add(trDim)
                        End If

                    End If
                Next
            End If
            Caracteristica.Dispose()
        Catch ex As Exception

            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)

        End Try
    End Sub



    Public Sub CrearLabelsDinamicosMantenimiento_DashboardBootstrap(ByVal pstrNombreTabla As String,
                                                                    ByVal drValores As DataRow, _
                                                                    ByRef dvCamposDinamicos As Object, _
                                                                    Optional ByVal inQuitarRowsCamposDinamicos As Integer = 0, _
                                                                    Optional ByVal pstrClaseAdicional_Izquierda As String = "", _
                                                                    Optional ByVal pstrClaseAdicional As String = ""
                                                                    )

        If dvCamposDinamicos Is Nothing Then Exit Sub

        Try
            Dim lstCaracteristica As DataTable
            Dim Caracteristica As BL_MOV_Caracteristica = New BL_MOV_Caracteristica(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            lstCaracteristica = Caracteristica.ListarxTabla_Dashboard(pstrNombreTabla)

            If lstCaracteristica Is Nothing Then Exit Sub
            'Quitar campos que en la solicitud no va a usar o no va a mostrar
            If inQuitarRowsCamposDinamicos = 1 Then
                For i As Integer = 0 To lstCaracteristica.Rows.Count - 1
                    If lstCaracteristica.Rows(i)("vcNomCam") = "btMosEnSol" Then
                        lstCaracteristica.Rows().RemoveAt(i)
                        Exit For
                    End If
                Next
            End If





            If lstCaracteristica.Rows.Count > 0 Then

                Dim trDim As New HtmlTableRow
                Dim iContador As Integer = 0
                For Each dr As DataRow In lstCaracteristica.Rows

                    iContador += 1
                    If iContador Mod 2 <> 0 Then
                        trDim = New HtmlTableRow
                    End If


                    Dim tdIDim As New HtmlTableCell
                    Dim tdDDim As New HtmlTableCell
                    If dr("vcDesCam").ToString = "Área" Or dr("vcDesCam").ToString = "Area" Then
                        tdIDim.InnerText = "<b>" & drValores("NIVE_vcNOMNIV").ToString & "</b>"
                    Else
                        tdIDim.InnerText = "<b>" & dr("vcDesCam").ToString & "</b>"
                    End If

                    tdIDim.Width = "130"
                    tdIDim.Attributes("class") = "tdEtiqueta" & IIf(pstrClaseAdicional_Izquierda.Trim <> "", " " & pstrClaseAdicional_Izquierda, "")

                    If dr("dcTipDatSQL").ToString <> "IMAGE" Then
                        If dr("vcDesCam").ToString = "Área" Or dr("vcDesCam").ToString = "Area" Then
                            tdIDim.InnerText = drValores("NIVE_vcNOMNIV").ToString
                        Else
                            tdIDim.InnerText = dr("vcDesCam").ToString
                            tdIDim.Width = "130"
                        End If
                    End If

                    If dr("dcTipDat").ToString = "Fecha" Then
                        dr("dcTipDatSQL") = "DATE"
                    End If


                    Dim pLabel As System.Web.UI.HtmlControls.HtmlGenericControl = New System.Web.UI.HtmlControls.HtmlGenericControl("p") 'Label
                    Dim spanValor As System.Web.UI.HtmlControls.HtmlGenericControl = New System.Web.UI.HtmlControls.HtmlGenericControl("span") 'Valor
                    Dim liCaracteristica As System.Web.UI.HtmlControls.HtmlGenericControl = New System.Web.UI.HtmlControls.HtmlGenericControl("li")

                    pLabel.Attributes.Add("class", "text-sm text-muted mar-no")
                    spanValor.Attributes.Add("class", "text-lg text-semibold text-main")
                    liCaracteristica.Attributes.Add("class", "col-xs-6 col-sm-12 mar-btm")

                    If dr("vcDesCam").ToString = "Área" Or dr("vcDesCam").ToString = "Area" Then
                        pLabel.InnerHtml = drValores("NIVE_vcNOMNIV").ToString.ToUpper()
                    Else
                        pLabel.InnerHtml = dr("vcDesCam").ToString.ToUpper()
                    End If

                    Select Case dr("dcTipDatSQL").ToString
                        Case "INT"
                            Dim lblINT As New Label
                            lblINT.ID = "txt_" & dr("P_inCod").ToString
                            lblINT.CssClass = "INT" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                            lblINT.Attributes("obj") = dr("vcNomCam").ToString
                            lblINT.Attributes("tipDat") = dr("dcTipDatSQL").ToString
                            'lblINT.Width = "120"
                            lblINT.Text = drValores(dr("vcNomCam").ToString).ToString
                            spanValor.InnerHtml = drValores(dr("vcNomCam").ToString).ToString
                            ''div02.Controls.Add(lblINT)
                        Case "DECIMAL"
                            Dim lblDECIMAL As New Label
                            lblDECIMAL.ID = "txt_" & dr("P_inCod").ToString
                            lblDECIMAL.CssClass = "DECIMAL" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                            Dim longitud As String() = dr("vcLon").ToString().Split(",")
                            lblDECIMAL.Attributes("obj") = dr("vcNomCam").ToString
                            lblDECIMAL.Attributes("tipDat") = dr("dcTipDatSQL").ToString + "(" + dr("vcLon").ToString + ")"
                            'lblDECIMAL.Width = "120"
                            lblDECIMAL.Text = Caracteristica.ObtenerMontoTotalFormateada(IIf(drValores(dr("vcNomCam").ToString).ToString <> "", drValores(dr("vcNomCam").ToString).ToString, 0))
                            spanValor.InnerHtml = Caracteristica.ObtenerMontoTotalFormateada(IIf(drValores(dr("vcNomCam").ToString).ToString <> "", drValores(dr("vcNomCam").ToString).ToString, 0))
                            ''div02.Controls.Add(lblDECIMAL)
                        Case "VARCHAR"
                            Dim lblVARCHAR As New Label
                            lblVARCHAR.ID = "txt_" & dr("P_inCod").ToString
                            lblVARCHAR.Attributes("maxlength") = dr("vcLon").ToString
                            lblVARCHAR.CssClass = "VARCHAR" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                            lblVARCHAR.Attributes("obj") = dr("vcNomCam").ToString
                            lblVARCHAR.Attributes("tipDat") = dr("dcTipDatSQL").ToString + "(" + dr("vcLon").ToString + ")"
                            'lblVARCHAR.Width = "120"
                            lblVARCHAR.Text = drValores(dr("vcNomCam").ToString).ToString

                            spanValor.InnerHtml = drValores(dr("vcNomCam").ToString).ToString

                            If dr("F_inCodTipDat").ToString <> "8" Then
                                If Convert.ToInt32(dr("vcLon")) > 80 Then
                                    lblVARCHAR.Height = New Unit(60, UnitType.Pixel)
                                    lblVARCHAR.Width = New Unit(200, UnitType.Pixel)
                                End If
                            End If
                            ''div02.Controls.Add(lblVARCHAR)
                        Case "DATE"
                            Dim lblSMALLDATETIME As New Label
                            lblSMALLDATETIME.ID = "txt_" & dr("P_inCod").ToString
                            lblSMALLDATETIME.CssClass = "DATE" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                            lblSMALLDATETIME.Attributes("obj") = dr("vcNomCam").ToString
                            lblSMALLDATETIME.Attributes("tipDat") = dr("dcTipDatSQL").ToString
                            'lblSMALLDATETIME.Width = "120"
                            lblSMALLDATETIME.Text = drValores(dr("vcNomCam").ToString).ToString
                            ''div02.Controls.Add(lblSMALLDATETIME)
                            spanValor.InnerHtml = drValores(dr("vcNomCam").ToString).ToString
                        Case "DATETIME"
                            Dim lblDATETIME As New Label
                            lblDATETIME.ID = "txt_" & dr("P_inCod").ToString
                            lblDATETIME.CssClass = "DATETIME" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                            lblDATETIME.Attributes("obj") = dr("vcNomCam").ToString
                            lblDATETIME.Attributes("tipDat") = dr("dcTipDatSQL").ToString
                            'lblDATETIME.Width = "120"
                            lblDATETIME.Text = drValores(dr("vcNomCam").ToString).ToString
                            ''div02.Controls.Add(lblDATETIME)
                            spanValor.InnerHtml = drValores(dr("vcNomCam").ToString).ToString
                        Case "BIT"
                            Dim lblBIT As New Label
                            lblBIT.ID = "chk_" & dr("P_inCod").ToString
                            lblBIT.CssClass = "BIT" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                            lblBIT.Attributes("obj") = dr("vcNomCam").ToString
                            lblBIT.Width = New Unit(200, UnitType.Pixel)
                            lblBIT.Attributes("tipDat") = "VARCHAR (35)"
                            'lblBIT.Width = "120"
                            If Not IsDBNull(drValores(dr("vcNomCam").ToString)) Then
                                If Boolean.Parse(drValores(dr("vcNomCam").ToString).ToString) Then
                                    lblBIT.Text = "Si"
                                    spanValor.InnerHtml = "Si"
                                Else
                                    lblBIT.Text = "No"
                                    spanValor.InnerHtml = "No"
                                End If
                                ''div02.Controls.Add(lblBIT)
                            End If



                    End Select


                    liCaracteristica.Controls.Add(spanValor)
                    liCaracteristica.Controls.Add(pLabel)

                    'div01.Controls.Add(div02)

                    dvCamposDinamicos.Controls.Add(liCaracteristica)


                    'If dr("dcTipDatSQL").ToString <> "IMAGE" Then
                    '    trDim.Cells.Add(tdIDim)
                    '    trDim.Cells.Add(tdDDim)

                    '    If iContador Mod 2 = 0 OrElse iContador >= lstCaracteristica.Rows.Count Then
                    '        tbCamposDinamicos.Rows.Add(trDim)
                    '    End If

                    'End If
                Next
            End If
            Caracteristica.Dispose()
        Catch ex As Exception

            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)

        End Try
    End Sub
End Class


''' <summary>
''' Busca todos los controles...
''' </summary>
Public Class ControlFinder
    Public Function FindControlRecursive(ByVal control As Control, ByVal pstrValorID As String) As Object
        Dim objReturn As Object = Nothing
        If control.FindControl(pstrValorID) Is Nothing Then
            For Each childControl As Control In control.Controls
                If childControl.FindControl(pstrValorID) Is Nothing Then
                    FindControlRecursive(childControl, pstrValorID)
                Else
                    Return control.FindControl(pstrValorID)
                End If
            Next
        Else
            objReturn = control.FindControl(pstrValorID)
        End If
        Return objReturn
    End Function
End Class
