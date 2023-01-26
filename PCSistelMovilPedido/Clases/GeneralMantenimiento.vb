Imports Microsoft.VisualBasic
Imports System.Data
Imports System.IO
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports System.Web.Script.Serialization


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
                                                    Optional pstrClaseAdicional As String = "")
        Dim Caracteristica As BL_MOV_Caracteristica

        If tbCamposDinamicos Is Nothing Then Exit Sub

        Try
            Dim lstCaracteristica As DataTable
            Caracteristica = New BL_MOV_Caracteristica(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            lstCaracteristica = Caracteristica.ListarxTabla(pstrNombreTabla)
            If lstCaracteristica Is Nothing Then Exit Sub

            If lstCaracteristica.Rows.Count > 0 Then
                For Each dr As DataRow In lstCaracteristica.Rows
                    Dim trDim As New HtmlTableRow
                    Dim tdIDim As New HtmlTableCell
                    Dim tdDDim As New HtmlTableCell
                    tdIDim.InnerText = dr("vcDesCam").ToString
                    tdIDim.Width = "130"
                    tdIDim.Attributes("class") = "tdEtiqueta"

                    If dr("dcTipDat").ToString = "Fecha" Then
                        dr("dcTipDatSQL") = "DATE"
                    End If

                    Select Case dr("dcTipDatSQL").ToString
                        Case "INT"
                            Dim txtINT As New TextBox
                            txtINT.ID = "txt_" & dr("vcNomCam").ToString
                            txtINT.CssClass = "INT" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                            txtINT.MaxLength = 7
                            txtINT.Attributes("obj") = dr("vcNomCam").ToString
                            txtINT.Attributes("tipDat") = dr("dcTipDatSQL").ToString
                            txtINT.Width = "120"
                            tdDDim.Controls.Add(txtINT)
                        Case "DECIMAL"
                            Dim txtDECIMAL As New TextBox
                            txtDECIMAL.ID = "txt_" & dr("vcNomCam").ToString
                            txtDECIMAL.CssClass = "DECIMAL" & IIf(pstrClaseAdicional.Trim <> "", " " & pstrClaseAdicional, "")
                            Dim longitud As String() = dr("vcLon").ToString().Split(",")
                            txtDECIMAL.MaxLength = Integer.Parse(longitud(0))
                            txtDECIMAL.Attributes("obj") = dr("vcNomCam").ToString
                            txtDECIMAL.Attributes("tipDat") = dr("dcTipDatSQL").ToString + "(" + dr("vcLon").ToString + ")"
                            txtDECIMAL.Width = "120"
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
                                Dim mValores() As String = dr("vcLon").ToString().Split(",")
                                For Each strValor As String In mValores
                                    ddlPicklist.Items.Add(strValor)
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
                                If Convert.ToInt32(dr("vcLon")) > 80 Then
                                    txtVARCHAR.TextMode = TextBoxMode.MultiLine
                                    txtVARCHAR.Height = New Unit(60, UnitType.Pixel)
                                    txtVARCHAR.Width = New Unit(200, UnitType.Pixel)
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
                                ddlPicklist.Items.Add(New ListItem(strValor, inContador))
                                inContador -= 1
                            Next
                            tdDDim.Controls.Add(ddlPicklist)

                    End Select

                    trDim.Cells.Add(tdIDim)
                    trDim.Cells.Add(tdDDim)
                    If Not (pstrNombreTabla = "MOV_ModeloDispositivoOperador" And dr("dcTipDatSQL").ToString = "DATETIME") Then
                        tbCamposDinamicos.Rows.Add(trDim)
                    End If
                Next
            End If



        Catch ex As Exception

            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If Caracteristica IsNot Nothing Then
                Caracteristica.Dispose()
            End If

        End Try

    End Sub

    Public Sub ObtenerValoresControlesDinamicosMantenimiento(pstrNombreTabla As String, ByRef objPage As Page, dtValores As DataTable)

        If objPage Is Nothing Then Exit Sub
        If dtValores Is Nothing Then Exit Sub
        Dim Caracteristica As BL_MOV_Caracteristica
        Try
            Dim lstCaracteristica As DataTable
            Caracteristica = New BL_MOV_Caracteristica(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            lstCaracteristica = Caracteristica.ListarxTabla(pstrNombreTabla)

            If lstCaracteristica Is Nothing Then Exit Sub
            Dim objControlFinder As New ControlFinder

            If lstCaracteristica.Rows.Count > 0 AndAlso dtValores.Rows.Count > 0 Then
                For Each dr As DataRow In lstCaracteristica.Rows
                    Select Case dr("dcTipDatSQL").ToString
                        Case "INT"
                            CType(objControlFinder.FindControlRecursive(objPage, "txt_" & dr("vcNomCam").ToString), TextBox).Text = IIf(IsDBNull(dtValores.Rows(0)(dr("vcNomCam").ToString)), "", dtValores.Rows(0)(dr("vcNomCam").ToString))
                        Case "DECIMAL"
                            CType(objControlFinder.FindControlRecursive(objPage, "txt_" & dr("vcNomCam").ToString), TextBox).Text = IIf(IsDBNull(dtValores.Rows(0)(dr("vcNomCam").ToString)), "", dtValores.Rows(0)(dr("vcNomCam").ToString))
                        Case "VARCHAR"
                            If dr("F_inCodTipDat").ToString = "8" Then
                                Dim strValor As String = IIf(IsDBNull(dtValores.Rows(0)(dr("vcNomCam").ToString)), "", dtValores.Rows(0)(dr("vcNomCam").ToString))
                                If Trim(strValor) = "" Then
                                    CType(objControlFinder.FindControlRecursive(objPage, "ddl_" & dr("vcNomCam").ToString), DropDownList).SelectedIndex = -1
                                Else
                                    CType(objControlFinder.FindControlRecursive(objPage, "ddl_" & dr("vcNomCam").ToString), DropDownList).Text = strValor
                                End If
                            Else
                                CType(objControlFinder.FindControlRecursive(objPage, "txt_" & dr("vcNomCam").ToString), TextBox).Text = IIf(IsDBNull(dtValores.Rows(0)(dr("vcNomCam").ToString)), "", dtValores.Rows(0)(dr("vcNomCam").ToString))
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
                    End Select
                Next
            End If
        Catch ex As Exception

            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If Caracteristica IsNot Nothing Then
                Caracteristica.Dispose()
            End If
        End Try

    End Sub

    Public Sub CrearLabelsDinamicosMantenimiento(ByVal pstrNombreTabla As String,
                                                    drValores As DataRow, _
                                                    ByRef tbCamposDinamicos As Object, _
                                                    Optional pstrClaseAdicional As String = "")

        If tbCamposDinamicos Is Nothing Then Exit Sub
        Dim Caracteristica As BL_MOV_Caracteristica
        Try
            Dim lstCaracteristica As DataTable
            Caracteristica = New BL_MOV_Caracteristica(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            lstCaracteristica = Caracteristica.ListarxTabla(pstrNombreTabla)
            If lstCaracteristica Is Nothing Then Exit Sub
            If lstCaracteristica.Rows.Count > 0 Then
                For Each dr As DataRow In lstCaracteristica.Rows
                    Dim trDim As New HtmlTableRow
                    Dim tdIDim As New HtmlTableCell
                    Dim tdDDim As New HtmlTableCell
                    tdIDim.InnerText = dr("vcDesCam").ToString
                    tdIDim.Width = "130"
                    tdIDim.Attributes("class") = "tdEtiqueta"

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
                            lblDECIMAL.Text = drValores(dr("vcNomCam").ToString).ToString
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
                                    lblVARCHAR.Height = New Unit(60, UnitType.Pixel)
                                    lblVARCHAR.Width = New Unit(200, UnitType.Pixel)
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

        Catch ex As Exception

            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If Caracteristica IsNot Nothing Then
                Caracteristica.Dispose()
            End If
        End Try
    End Sub

End Class


''' <summary>
''' Busca todos los controles...
''' </summary>
Public Class ControlFinder
    Public Function FindControlRecursive(control As Control, pstrValorID As String) As Object
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