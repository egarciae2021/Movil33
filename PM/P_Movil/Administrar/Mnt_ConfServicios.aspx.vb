Imports VisualSoft.Suite80.BL
Imports System.IO
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports System.Data
Imports System.Web.Script.Serialization
Imports System.Web
Imports System.Web.Security
Imports System.Web.UI
Imports System.Web.UI.WebControls
Imports System.Web.UI.WebControls.WebParts
Imports System.Web.UI.HtmlControls
Imports System
Imports System.Configuration
Imports System.Collections

Partial Class P_Configuracion_Seguridad_Administrar_Mnt_ConfServicios
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim Parametros As BL_MOV_Parametros = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
                Dim P_inCod As String = Request.QueryString("Cod")
                hdfCodigo.Value = P_inCod
                If Not IsPostBack Then
                    Parametros = New BL_MOV_Parametros(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim lstParametros As DataSet

                    lstParametros = Parametros.MostrarParametros_Sevicios("EnvioCorreoServicio", 1)
                    If lstParametros.Tables(0).Rows.Count > 0 Then
                        For Each dr As DataRow In lstParametros.Tables(0).Rows
                            Dim trDim As New HtmlTableRow
                            Dim tdIDim As New HtmlTableCell
                            Dim tdDDim As New HtmlTableCell
                            'Dim txtClave As New TextBox
                            'txtClave.ID = "txt_Clave_" & dr("Clave").ToString
                            ''txtClave.Attributes("obj") = dr("Clave").ToString
                            'txtClave.Visible = False
                            'txtClave.CssClass = "CLAVE"
                            'txtClave.Width = 100
                            'txtClave.Text = dr("Clave").ToString
                            ''tdIDim.Width = "100"
                            '-----
                            Dim lblClave As New Label
                            lblClave.ID = "lblClave_" & dr("Clave").ToString
                            If dr("Clave").ToString = "LinkWeb" Then
                                lblClave.Text = "Link Web"
                            ElseIf dr("Clave").ToString = "UsarCorreoAlternativo" Then
                                lblClave.Text = "Usar Correo Alternativo"
                            ElseIf dr("Clave").ToString = "CorreoAlternativo" Then
                                lblClave.Text = "Correo Alternativo"
                            Else
                                lblClave.Text = dr("Clave").ToString
                            End If
                            tdIDim.Controls.Add(lblClave)
                            'tdIDim.Controls.Add(txtClave)

                            If dr("IdParametro").ToString() = "52" Then 'If dr("IdParametro").ToString() = "6" Then
                                Dim RbtnSi As New RadioButton
                                RbtnSi.ID = "1"
                                RbtnSi.Attributes("obj") = dr("Clave").ToString
                                RbtnSi.Attributes("Grupo") = dr("Grupo").ToString
                                RbtnSi.GroupName = "Opcion"
                                RbtnSi.Text = "Si"
                                'RbtnSi.CssClass = "CHECKVAL"
                                Dim RbtnNo As New RadioButton
                                RbtnNo.ID = "2"
                                RbtnNo.Attributes("obj") = dr("Clave").ToString
                                RbtnNo.Attributes("Grupo") = dr("Grupo").ToString
                                RbtnNo.GroupName = "Opcion"
                                RbtnNo.Text = "No"
                                RbtnNo.CssClass = "VALOR"
                                If dr("Valor").ToString = "1" Then
                                    RbtnSi.Checked = True
                                Else
                                    RbtnNo.Checked = True
                                End If
                                tdDDim.Controls.Add(RbtnSi)
                                tdDDim.Controls.Add(RbtnNo)
                            Else
                                Dim txtValor As New TextBox
                                txtValor.ID = "txt_Valor_" & dr("Clave").ToString
                                txtValor.Attributes("obj") = dr("Clave").ToString
                                txtValor.Attributes("Grupo") = dr("Grupo").ToString
                                txtValor.Enabled = True
                                txtValor.CssClass = "VALOR"
                                txtValor.Width = 300
                                txtValor.Text = dr("Valor").ToString.Replace("&#39", "'")
                                tdDDim.Controls.Add(txtValor)
                            End If
                            trDim.Cells.Add(tdIDim)
                            trDim.Cells.Add(tdDDim)
                            tbCamposDinamicos.Rows.Add(trDim)

                            trDim = New HtmlTableRow
                            tdIDim = New HtmlTableCell
                            tdDDim = New HtmlTableCell
                            tdIDim.InnerText = "Descripción"
                            tdIDim.Width = "100"

                            Dim txtDescripcion As New TextBox
                            txtDescripcion.ID = "txt_Des_" & dr("Clave").ToString
                            txtDescripcion.Attributes("obj") = dr("Clave").ToString
                            txtDescripcion.Attributes("Grupo") = dr("Grupo").ToString
                            txtDescripcion.Enabled = True
                            txtDescripcion.CssClass = "DESCRIPCION"
                            txtDescripcion.Width = 300
                            txtDescripcion.TextMode = TextBoxMode.MultiLine
                            txtDescripcion.Text = dr("Descripcion").ToString.Replace("&#39", "'")
                            tdDDim.Controls.Add(txtDescripcion)

                            trDim.Cells.Add(tdIDim)
                            trDim.Cells.Add(tdDDim)
                            tbCamposDinamicos.Rows.Add(trDim)
                        Next
                    End If
                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Parametros IsNot Nothing Then Parametros.Dispose()
        End Try

        'Try
        'If IsNothing(Session("Usuario")) Then
        'Dim script As String = "window.parent.parent.location.reload()"
        'Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
        'Else
        'UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        'If Not IsPostBack Then
        'Dim P_inCod As String = Request.QueryString("Cod")
        'hdfCodigo.Value = P_inCod
        'If P_inCod > 4 Then
        '    Dim Parametros As BL_MOV_Parametros = BL_MOV_Parametros.Instance(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        '    Dim ds As New DataSet()
        '    ds = Parametros.MostrarServicio(P_inCod)
        '    If P_inCod = 6 Then
        '        trValor.Style("display") = "none"
        '        trCorreoAlt.Style("display") = "block"
        '        TxtLlave.Text = ds.Tables(0).Rows(0)(1).ToString().Trim()
        '        If ds.Tables(0).Rows(0)(2) = 1 Then
        '            chkSi.Checked = True
        '        Else
        '            chkNo.Checked = True
        '        End If
        '        TxtDescripcion.Text = ds.Tables(0).Rows(0)(3).ToString().Trim()
        '        hdfGrupo.Value = ds.Tables(0).Rows(0)(4).ToString().Trim()
        '    Else
        '        trCorreoAlt.Style("display") = "none"
        '        trValor.Style("display") = "block"
        '        TxtValor.Text = ds.Tables(0).Rows(0)(2).ToString().Trim()
        '        TxtLlave.Text = ds.Tables(0).Rows(0)(1).ToString().Trim()
        '        TxtDescripcion.Text = ds.Tables(0).Rows(0)(3).ToString().Trim()
        '        hdfGrupo.Value = ds.Tables(0).Rows(0)(4).ToString().Trim()
        '    End If
        'End If
        'End If
        'End If
        'Catch ex As Exception
        '   Dim util As New Utilitarios
        '  util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
        ' Throw New Exception(UtilitarioWeb.MensajeError)
        'End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(ByVal vcClaves As String, ByVal vcValores As String, ByVal vcGrupos As String, ByVal vcDescripcion As String) As Integer
        Dim BLParametros As BL_MOV_Parametros = Nothing
        Try
            BLParametros = New BL_MOV_Parametros(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            'Dim oSerializer As New JavaScriptSerializer
            Dim ENTParametros As New ENT_MOV_Parametros() '= oSerializer.Deserialize(Of ENT_MOV_Parametros)()

            Return BLParametros.ActualizarServicio(vcClaves, vcValores, vcGrupos, vcDescripcion)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(BLParametros) Then BLParametros.Dispose()
        End Try
    End Function
End Class
