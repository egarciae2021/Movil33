Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BL
Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Globalization
Imports System.Threading

Partial Class P_Movil_Administrar_Mantenimiento_Mnt_DetallePlan
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Plan As BL_MOV_Plan = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim inCodPla As String = Request.QueryString("CodPlan")

                    If inCodPla <> "" Then
                        Plan = New BL_MOV_Plan(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        Dim oPlan As ENT_MOV_Plan = Plan.Mostrar_DetallePlan_MultiPais(Convert.ToInt32(inCodPla))
                        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
                        lblNombre.Text = oPlan.vcNom
                        lblDescripcion.Text = oPlan.vcDes
                        'lblMonto.Text = Decimal.Round(oPlan.dcMon, 2)'oPlan.dcMon.ToString()
                        lblMonto.Text = oPlan.dcMon_MultiPais.ToString() 'oPlan.dcMon.ToString()
                        lblOperador.Text = oPlan.Operador.vcNomOpe

                        For Each oSubPlan As ENT_MOV_SubPlan In oPlan.SubPlanes
                            Dim tr As New HtmlTableRow
                            Dim td As New HtmlTableCell
                            td.ColSpan = 2
                            td.Controls.Add(New LiteralControl("<div class=""ui-widget-content ui-helper-clearfix"" style=""margin: 0.6em .0em;""></div>"))
                            tr.Controls.Add(td)
                            tbPlan.Controls.Add(tr)

                            Dim trDetalle1 As New HtmlTableRow
                            Dim tdDetalleTitulo1 As New HtmlTableCell
                            Dim tdDetalle1 As New HtmlTableCell
                            Dim trDetalle2 As New HtmlTableRow
                            Dim tdDetalleTitulo2 As New HtmlTableCell
                            Dim tdDetalle2 As New HtmlTableCell
                            Dim trDetalle3 As New HtmlTableRow
                            Dim tdDetalleTitulo3 As New HtmlTableCell
                            Dim tdDetalle3 As New HtmlTableCell
                            Dim trDetalle4 As New HtmlTableRow
                            Dim tdDetalleTitulo4 As New HtmlTableCell
                            Dim tdDetalle4 As New HtmlTableCell

                            tdDetalleTitulo1.InnerText = "Bolsa"
                            tdDetalleTitulo2.InnerText = "Descripción"
                            tdDetalleTitulo3.InnerText = "Monto"
                            tdDetalleTitulo4.InnerText = "Cantidad"

                            tdDetalle1.InnerText = oSubPlan.vcNom
                            tdDetalle2.InnerText = oSubPlan.vcDes
                            'tdDetalle3.InnerText = Decimal.Round(oSubPlan.dcMon, 2)  'oSubPlan.dcMon.ToString()
                            tdDetalle3.InnerText = oSubPlan.dcMon_MultiPais.ToString()  'oSubPlan.dcMon.ToString()
                            'If oSubPlan.dcCan = 0 Then
                            If oSubPlan.dcCan_MultiPais = "0" Or oSubPlan.dcCan_MultiPais = "0.00" Then
                                tdDetalle4.InnerText = "Ilimitado"
                            Else
                                tdDetalle4.InnerText = oSubPlan.dcCan_MultiPais & " " & oSubPlan.vcSer.ToString().ToUpper & "." 'Convert.ToInt32(oSubPlan.dcCan).ToString() & " " & oSubPlan.vcSer.ToString().ToUpper & "."
                            End If

                            trDetalle1.Controls.Add(tdDetalleTitulo1)
                            trDetalle1.Controls.Add(tdDetalle1)
                            tbPlan.Controls.Add(trDetalle1)
                            trDetalle2.Controls.Add(tdDetalleTitulo2)
                            trDetalle2.Controls.Add(tdDetalle2)
                            tbPlan.Controls.Add(trDetalle2)
                            trDetalle3.Controls.Add(tdDetalleTitulo3)
                            trDetalle3.Controls.Add(tdDetalle3)
                            tbPlan.Controls.Add(trDetalle3)
                            trDetalle4.Controls.Add(tdDetalleTitulo4)
                            trDetalle4.Controls.Add(tdDetalle4)
                            tbPlan.Controls.Add(trDetalle4)
                        Next
                    End If
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Plan) Then Plan.Dispose()
        End Try
    End Sub
End Class
