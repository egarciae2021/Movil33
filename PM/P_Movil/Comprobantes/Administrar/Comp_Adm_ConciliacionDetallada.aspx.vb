Imports System.Web.Script.Services
Imports System.Web.Services
Imports VisualSoft.PCSistel.Comprobantes.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios

Public Class Comp_Adm_ConciliacionDetallada
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    hdfPeriodo.Value = Request.QueryString("p_vcPer")
                    hdfNroComp.Value = Request.QueryString("nroComp")
                    If hdfNroComp.Value = "" Then
                        lblComprobante.Text = "[Sin número de comprobante generado]"
                    Else
                        lblComprobante.Text = "[" & hdfNroComp.Value & "]"
                    End If
                    hdfTipoProducto.Value = Request.QueryString("idTipProd")
                    hdfIdConciliado.Value = Request.QueryString("idConciliado")
                    hdfTipoProceso.Value = Request.QueryString("idTipProc")
                    hdfCodEmpleado.Value = Request.QueryString("idEmp")
                    lblEmpleado.Text = Request.QueryString("emp")
                End If
            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    Public Shared Function Listar(ByVal inPagTam As String, ByVal inPagAct As String, vcOrdCol As String,
                                  vcTipOrdCol As String, p_periodo As String, _
                                  p_idEmpleado As String, p_idTipoProceso As Integer,
                                  p_conciliados As Integer, p_tipoProducto As Integer, p_nroComprobante As String) As Object
        Dim bl_ComprobanteDetalle As BL_MOV_FAC_ComprobanteDetalle = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")

            bl_ComprobanteDetalle = New BL_MOV_FAC_ComprobanteDetalle(oUsuario.IdCliente)

            'p_periodo = p_periodo.Substring(3, 4) & p_periodo.Substring(0, 2) & "01"

            Dim dt As DataTable = bl_ComprobanteDetalle.ListarPorEmpleado(p_periodo, p_idEmpleado, p_idTipoProceso, p_conciliados, p_tipoProducto, p_nroComprobante)

            If dt.Rows.Count > 0 Then

                If dt.Rows(0)(0).ToString() <> "0" AndAlso dt.Columns.Count > 1 Then

                    If vcOrdCol <> "" Then
                        Dim dvData As New DataView(dt)
                        dvData.Sort = vcOrdCol + " " + vcTipOrdCol
                        dt = dvData.Table
                    End If

                    Dim TotalPaginas As Integer
                    Dim TotalRegistros As Integer
                    Dim inResto As Integer
                    TotalRegistros = dt.Rows.Count
                    TotalPaginas = Math.DivRem(TotalRegistros, Convert.ToInt32(inPagTam), inResto)
                    If inResto > 0 Then TotalPaginas = TotalPaginas + 1

                    Return JQGrid.DatosJSON(dt, inPagTam, inPagAct)

                Else
                    Return Nothing
                End If

            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If bl_ComprobanteDetalle IsNot Nothing Then bl_ComprobanteDetalle.Dispose()
        End Try
        Return Nothing
    End Function
End Class