Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Script.Serialization
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports System.Data

Partial Class P_Movil_Consultar_Con_Resumen
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim NumCri As String = Request.QueryString("NumCriterio")

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
    Public Shared Function Listar(ByVal inPagTam As String, ByVal inPagAct As String, ByVal vcOrdCol As String, ByVal vcTipOrdCol As String, ByVal oCriterio As String) As String
        Try
            Dim Llamada As BL_MOV_IMP_Llamada = new BL_MOV_IMP_Llamada(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oSerializer As New JavaScriptSerializer
            Dim v_oCriterio As ENT_MOV_IMP_Criterio = oSerializer.Deserialize(Of ENT_MOV_IMP_Criterio)(oCriterio)

            Dim dsDetalle As DataSet = Llamada.ListarResumen(2012)

         Llamada.Dispose()
            Dim dict As New Dictionary(Of String, Object)
            Dim dictJqGrid As New Dictionary(Of String, Object)
            Dim lstItems As New List(Of Object)

            dictJqGrid.Add("PaginaActual", Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("PaginaActual")))
            dictJqGrid.Add("TotalPaginas", Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalPaginas")))
            dictJqGrid.Add("TotalRegistros", Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalRegistros")))

            For i As Integer = 0 To dsDetalle.Tables(1).Rows.Count - 1
                Dim dictItemDet As New Dictionary(Of String, Object)
                Dim lstRow As New List(Of String)

                dictItemDet.Add("ID", dsDetalle.Tables(1).Rows(i)(0).ToString())

                For j As Integer = 0 To dsDetalle.Tables(1).Rows(i).ItemArray.Count - 1
                    lstRow.Add(dsDetalle.Tables(1).Rows(i)(j).ToString())
                Next

                dictItemDet.Add("Row", lstRow)
                lstItems.Add(dictItemDet)
            Next

            dictJqGrid.Add("Items", lstItems)
            dict.Add("JQGrid", dictJqGrid)
            dict.Add("vcTab", dsDetalle.Tables(2).Rows(0)("vcNomTab").ToString())

            Return oSerializer.Serialize(dict)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function
End Class
