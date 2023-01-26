Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Data
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization
Imports UtilitarioWeb

Partial Class P_Movil_Consultar_Con_SumarioLista
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    hdfTipoSumario.Value = Request.QueryString("Tipo")
                    hdfValorSumario.Value = Request.QueryString("Valor")
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
    Public Shared Function Listar(ByVal inPagTam As String, ByVal inPagAct As String, ByVal vcOrdCol As String, ByVal vcTipOrdCol As String, ByVal oCriterio As String, ByVal inTipSum As String,
                                  ByVal vcValSum As String) As JQGridJsonResponse
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(oUsuario.IdCliente)
            Dim oSerializer As New JavaScriptSerializer
            Dim v_oCriterio As ENT_MOV_IMP_Criterio = oSerializer.Deserialize(Of ENT_MOV_IMP_Criterio)(oCriterio)
            Dim dsDetalle As New DataSet
            Dim vcCodInt As String = String.Empty
            vcCodInt = oUsuario.F_vcCodInt

            If v_oCriterio.vcPorDiaFin.ToString() <> "" Then
                v_oCriterio.vcPorDiaFin = v_oCriterio.vcPorDiaFin + " 23:59:59"
            End If

            Select Case Convert.ToInt32(v_oCriterio.inTipSum)
                Case 1 'Organizacion Nivel
                    dsDetalle = Llamada.ListarSumarioPorOrganizacionNivel(v_oCriterio, Integer.Parse(inPagTam), Integer.Parse(inPagAct), vcOrdCol, vcTipOrdCol, v_oCriterio.NivelSumario.P_inCodNiv, vcCodInt)
                Case 2 'Organizacion Area
                    dsDetalle = Llamada.ListarSumarioPorOrganizacionArea(v_oCriterio, Integer.Parse(inPagTam), Integer.Parse(inPagAct), vcOrdCol, vcTipOrdCol, v_oCriterio.AreaSumario.P_inCodOrg, vcCodInt)
                Case 3 'Linea
                    dsDetalle = Llamada.ListarSumarioPorLinea(v_oCriterio, Integer.Parse(inPagTam), Integer.Parse(inPagAct), vcOrdCol, vcTipOrdCol, vcCodInt)
                Case 4 'Empleado
                    dsDetalle = Llamada.ListarSumarioPorEmpleado(v_oCriterio, Integer.Parse(inPagTam), Integer.Parse(inPagAct), vcOrdCol, vcTipOrdCol, vcCodInt)
                Case 5 'Centro de costo
                    dsDetalle = Llamada.ListarSumarioPorCentroCosto(v_oCriterio, Integer.Parse(inPagTam), Integer.Parse(inPagAct), vcOrdCol, vcTipOrdCol, vcCodInt)
                Case 6 'Numero
                    dsDetalle = Llamada.ListarSumarioPorNumero(v_oCriterio, Integer.Parse(inPagTam), Integer.Parse(inPagAct), vcOrdCol, vcTipOrdCol, vcCodInt)
                Case 7 'Frecuencia llamada
                    dsDetalle = Llamada.ListarSumarioPorFrecuenciaLlamada(v_oCriterio, Integer.Parse(inPagTam), Integer.Parse(inPagAct), vcOrdCol, vcTipOrdCol, vcCodInt)
                Case 8 'Operador
                    dsDetalle = Llamada.ListarSumarioPorOperador(v_oCriterio, Integer.Parse(inPagTam), Integer.Parse(inPagAct), vcOrdCol, vcTipOrdCol, vcCodInt)
                Case 9 'Pais
                    dsDetalle = Llamada.ListarSumarioPorPais(v_oCriterio, Integer.Parse(inPagTam), Integer.Parse(inPagAct), vcOrdCol, vcTipOrdCol, vcCodInt)
                Case 10 'Ciudad
                    dsDetalle = Llamada.ListarSumarioPorCiudad(v_oCriterio, Integer.Parse(inPagTam), Integer.Parse(inPagAct), vcOrdCol, vcTipOrdCol, v_oCriterio.PaisSumario.P_vcCodPai, vcCodInt)
                Case 11 'Fecha
                    dsDetalle = Llamada.ListarSumarioPorFecha(v_oCriterio, Integer.Parse(inPagTam), Integer.Parse(inPagAct), vcOrdCol, vcTipOrdCol, vcCodInt)
                Case 12 'Hora
                    dsDetalle = Llamada.ListarSumarioPorHora(v_oCriterio, Integer.Parse(inPagTam), Integer.Parse(inPagAct), vcOrdCol, vcTipOrdCol, vcCodInt)
            End Select
            Llamada.Dispose()
            Return New JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalPaginas")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("PaginaActual")),
                                          Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalRegistros")), dsDetalle.Tables(1), 1)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function
End Class
