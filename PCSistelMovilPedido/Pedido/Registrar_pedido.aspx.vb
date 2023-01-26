Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports System.IO

Public Class Registrar_pedido
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim campana As BL_MOV_CAM_Campana
        Try
            'Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            'Dim viIdTecnico As Integer = -1

            'If IsNothing(oUsuario) Then
            '    Dim script As String = "window.parent.location.reload()"
            '    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            'Else

            If IsNothing(Session("Usuario")) Then
                Dim script As String = "window.top.location.reload()"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                If oUsuario Is Nothing Then
                    Response.Redirect("~\FinSession.aspx")
                    Exit Sub
                End If

                If Not IsPostBack Then

                    'hdfEmpleado.Value = oUsuario.F_vcCodEmp
                    'hdfIdUsuarioLogeado.Value = oUsuario.P_inCod
                    'hdfAdmin.Value = "0"

                    'For Each oGrupo As ENT_SEG_Grupo In oUsuario.Grupos
                    '    If oGrupo.P_inCod = 1 Then 'Es administrador
                    '        hdfAdmin.Value = "1"
                    '    End If
                    'Next

                    campana = New BL_MOV_CAM_Campana(oUsuario.IdCliente)
                    Dim modelos As DataSet = campana.ObtenerProductosCampanaEmpleado("1080", 5)

                    For Each fila As DataRow In modelos.Tables(0).Rows

                        Dim barrImg As Byte() = CType(fila("imIma"), Byte())
                        Dim archivo As String = fila("P_inCod").ToString & ".jpg"
                        Dim strfn As String = Server.MapPath("~/Common/Images/ModeloDispositivo/" + archivo)
                        Dim fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write)
                        fs.Write(barrImg, 0, barrImg.Length)
                        fs.Flush()
                        fs.Close()
                        cuerpo_productos.Controls.Add(New LiteralControl("<div id=""modelo-" + fila("P_inCod").ToString.Trim + _
                                                                         """ class=""producto""><img src=""../Common/Images/ModeloDispositivo/" + archivo + _
                                                                         """><div class=""productodesc""><span>" + fila("vcNom").ToString.Trim + _
                                                                         "</span><br /><span>S/. " + fila("Precio").ToString.Trim + _
                                                                         "</span><span style=""display:none;"">" + fila("vcDes").ToString.Trim + "</span></div></div>"))
                    Next

                    Dim formato As String = " ""{0}"" :""{1}"" "
                    Dim listafinal As New List(Of String)
                    For i = 0 To modelos.Tables(0).Rows.Count - 1
                        Dim lista As New List(Of String)
                        For k = 0 To modelos.Tables(0).Columns.Count - 1
                            If modelos.Tables(0).Columns(k).ToString.Equals("imIma") Then
                                lista.Add(String.Format(formato, "imIma", "../Common/Images/ModeloDispositivo/" + modelos.Tables(0).Rows(i)("P_inCod").ToString.Trim + ".jpg"))
                            Else
                                lista.Add(String.Format(formato, modelos.Tables(0).Columns(k).ToString.Trim, modelos.Tables(0).Rows(i)(k).ToString.Trim))
                            End If
                        Next
                        listafinal.Add("{" + String.Join(",", lista) + "}")
                    Next

                    Dim json As String = "[" + String.Join(",", listafinal) + "]"

                    Auditoria.InsertarAuditoria("Ingreso a la pagina Registrar_pedido.aspx")

                    Dim Script As String = "var cadenaJson = " & json & ";"
                    Page.ClientScript.RegisterClientScriptBlock(Me.GetType, "keys", Script, True)
                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If campana IsNot Nothing Then
                campana.Dispose()
            End If
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function obtenerCampanaActiva(ByVal prIdCliente As Integer) As MOV_CAM_Campana
        Dim campana As BL_MOV_CAM_Campana
        Try

            'Dim dash As BL_MOV_CAM_DashboardPedido = BL_MOV_CAM_DashboardPedido.Instance(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return campana.obtenerCampanaActiva(prIdCliente)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If campana IsNot Nothing Then
                campana.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ObtenerCaracteristicas(ByVal IdModeloDispositivo As Integer) As String
        Dim dispositivo As BL_MOV_ModeloDispositivo
        Try

            'Dim dash As BL_MOV_CAM_DashboardPedido = BL_MOV_CAM_DashboardPedido.Instance(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            dispositivo = New BL_MOV_ModeloDispositivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim caracteristicas As DataSet = dispositivo.ObtenerCaracteristicas(IdModeloDispositivo)

            Dim formato As String = " ""{0}"" :""{1}"" "
            Dim listafinal As New List(Of String)
            For i = 0 To caracteristicas.Tables(0).Rows.Count - 1
                Dim lista As New List(Of String)
                For k = 0 To caracteristicas.Tables(0).Columns.Count - 1
                    lista.Add(String.Format(formato, caracteristicas.Tables(0).Columns(k).ToString.Trim, caracteristicas.Tables(0).Rows(i)(k).ToString.Trim))
                Next
                listafinal.Add("{" + String.Join(",", lista) + "}")
            Next

            Dim json As String = "[" + String.Join(",", listafinal) + "]"

            Auditoria.InsertarAuditoria("ObtenerCaracteristicas - IdModeloDispositivo: " & IdModeloDispositivo)

            Return json

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If dispositivo IsNot Nothing Then
                dispositivo.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function planListarPorModelo(ByVal IdModeloDispositivo As Integer) As String
        Dim planes As BL_MOV_Plan
        Try

            'Dim dash As BL_MOV_CAM_DashboardPedido = BL_MOV_CAM_DashboardPedido.Instance(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            planes = New BL_MOV_Plan(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim listaPlanes As List(Of ENT_MOV_Plan) = planes.ListarPorModelo(IdModeloDispositivo)

            Dim formato As String = " ""text"" :""{0}"",""value"":""{1}"" "
            Dim listafinal As New List(Of String)

            For Each plan As ENT_MOV_Plan In listaPlanes
                listafinal.Add("{" + String.Format(formato, plan.vcNom, plan.dcMon) + "}")
            Next

            Dim json As String = "[" + String.Join(",", listafinal) + "]"

            Auditoria.InsertarAuditoria("planListarPorModelo - IdModeloDispositivo: " & IdModeloDispositivo)

            Return json

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If planes IsNot Nothing Then
                planes.Dispose()
            End If
        End Try
    End Function

End Class