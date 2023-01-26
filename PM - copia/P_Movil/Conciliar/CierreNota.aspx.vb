Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports Utilitario
Imports System.Data
Imports System.Web.Script.Serialization
Imports System.IO
Imports VisualSoft.PCSistelMovil.General.BE

Imports VisualSoft.PCSistelMovil.Solicitudes.BE
Imports VisualSoft.PCSistelMovil.Solicitudes.BL

Partial Class P_Movil_Conciliar_CierreNota
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'Dim Detalle As BL_MOV_ConciliaNota = Nothing
        ''Dim Solicitud As BL_MOV_Solicitud = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

            If IsNothing(oUsuario) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then

                    Dim oCultura As ENT_GEN_Cultura = CType(Session("Cultura"), ENT_GEN_Cultura)
                    Dim fecha As Date = Now.Date

                    hdfUsuario.Value = oUsuario.vcNom
                    hdfPeriodo.Value = Request.QueryString("Periodo")
                    hdfOperador.Value = Request.QueryString("Operador")
                    hdfEmpleadoActual.Value = oUsuario.Empleado.P_vcCod
                    Dim Concilia As BL_MOV_Concilia = New BL_MOV_Concilia(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim dsCierrePeriodo As DataSet = Concilia.ObtenerCierrePeriodo(hdfPeriodo.Value, hdfOperador.Value)
                    Concilia.Dispose()
                    hdfCerrado.Value = "0"
                    If dsCierrePeriodo IsNot Nothing AndAlso dsCierrePeriodo.Tables.Count > 0 Then
                        If dsCierrePeriodo.Tables(0).Rows.Count > 0 Then
                            If dsCierrePeriodo.Tables(0).Rows(0)("Tipo").ToString() <> "OPEN" Then
                                hdfCerrado.Value = "1"
                            End If
                        End If
                    End If

                    'Detalle = New BL_MOV_ConciliaNota(oUsuario.IdCliente)
                    'Detalle.InsertarVisto(hdfPeriodo.Value, oUsuario.P_inCod, oUsuario.vcUsu)
                    ''Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
                    ''Solicitud.RegistrarSeguimientoVisto(Convert.ToInt32(hdfIdSolicitud.Value), oUsuario.P_inCod, oUsuario.vcUsu)
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            ''If Detalle IsNot Nothing Then Detalle.Dispose()
            ''If Solicitud IsNot Nothing Then Solicitud.Dispose()
        End Try
    End Sub


    <WebMethod()>
    Public Shared Function ObtenerNoLeidos(ByVal Periodo As String, ByVal Operador As String) As List(Of Object)
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim Detalle As BL_MOV_ConciliaNota = New BL_MOV_ConciliaNota(oUsuario.IdCliente)
            Dim dtNoVistos As DataTable = Detalle.MostrarNoVistos(Periodo, oUsuario.P_inCod, False, Operador).Tables(1)
            Detalle.Dispose()

            Dim lstObjPrincipal As New List(Of Object)
            Dim lstObj As List(Of Object)
            Dim dict As Dictionary(Of String, Object)

            lstObj = New List(Of Object)
            For i As Integer = 0 To dtNoVistos.Rows.Count - 1
                dict = New Dictionary(Of String, Object)
                For Each Columna As DataColumn In dtNoVistos.Columns
                    dict.Add(Columna.ColumnName, dtNoVistos.Rows(i)(Columna.ColumnName).ToString())
                Next
                lstObj.Add(dict)
            Next
            lstObjPrincipal.Add(lstObj)

            Return lstObjPrincipal
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

End Class