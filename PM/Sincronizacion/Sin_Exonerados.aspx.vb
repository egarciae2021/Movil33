Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Data
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE
Imports System.IO

Public Class Sin_Exonerados
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            End If


            If Not Page.IsPostBack Then
                Dim Nivel As BL_GEN_Nivel = New BL_GEN_Nivel(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim lstNivel As List(Of ENT_GEN_Nivel) = Nivel.Listar()
                Nivel.Dispose()

                hdfTipo.Value = Request.QueryString("Tipo")
                hdfMultiple.Value = Request.QueryString("Multiple")
                hdfCodInt.Value = Request.QueryString("CodInt")
                hdfEmpleadosElegidos.Value = Request.QueryString("Empleados")

                If hdfTipo.Value = "1" Then

                    dvDatosSeleccion.InnerHtml = "Areas disponibles"
                ElseIf hdfTipo.Value = "2" Then

                    dvDatosSeleccion.InnerHtml = "Empleados disponibles"
                ElseIf hdfTipo.Value = "3" Then
                    dvDatosSeleccion.InnerHtml = "Celulares disponibles"
                End If

                If hdfMultiple.Value = "0" Then
                    tdControles.Style("display") = "none"
                    tdDatosSeleccionados.Style("display") = "none"
                    lstResultado.SelectionMode = ListSelectionMode.[Single]
                End If

                For Each oNivel As ENT_GEN_Nivel In lstNivel
                    'String strfn = Server.MapPath(oNivel.vcUrlIcoNiv);
                    'FileStream fs = new FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write);
                    '       fs.Write(oNivel.imIcoNiv, 0, oNivel.imIcoNiv.Length);
                    '       fs.Flush();
                    '       fs.Close();
                    'oNivel.vcUrlIcoNiv = "../Common/Images/Controles/dhtmlx/TreeView/Niveles/" & oNivel.P_inCodNiv & ".ico"
                    oNivel.vcUrlIcoNiv = "~/Common/Images/Controles/dhtmlx/TreeView/Niveles/" & oNivel.P_inCodNiv & ".ico"

                    If oNivel.imIcoNiv IsNot Nothing Then
                        Try
                            Dim strfn As String = Server.MapPath(oNivel.vcUrlIcoNiv)
                            Dim fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write)
                            fs.Write(oNivel.imIcoNiv, 0, oNivel.imIcoNiv.Length)
                            fs.Flush()
                            fs.Close()
                        Catch
                        End Try
                    End If
                Next

            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        Catch exc As Exception
            Dim util As New Utilitarios
            util.GrabarLog(exc, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub


    <WebMethod()> _
    Public Shared Function ListarPrincipal(vcCodInt As [String]) As List(Of Object)
        Try

            Dim Organizacion As BL_GEN_Organizacion = New BL_GEN_Organizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim lstOrganizacion As List(Of ENT_GEN_Organizacion) = Organizacion.ListarDependencia(vcCodInt)

            Dim NodoPrincipal As New List(Of Object)

            For Each oOrganizacion As ENT_GEN_Organizacion In lstOrganizacion
                Dim PrimerNivel As New List(Of Object)
                PrimerNivel.Add(oOrganizacion.vcCodInt)
                PrimerNivel.Add(0)
                PrimerNivel.Add(oOrganizacion.vcNomOrg)

                NodoPrincipal.Add(PrimerNivel)
            Next
            Organizacion.Dispose()
            Return NodoPrincipal
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function


    <WebMethod()> _
    Public Shared Function ListarOrganizacion(ByVal vcCodInt As String) As List(Of ENT_GEN_Organizacion)
        Try
            Dim Organizacion As BL_GEN_Organizacion = New BL_GEN_Organizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As List(Of ENT_GEN_Organizacion) = Organizacion.ListarDependencia(vcCodInt)
            Organizacion.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function ListarArea(vcCodInt As String, btIncDep As String, inCodEst As String, vcValBus As String, inTip As String) As List(Of ENT_GEN_Organizacion)
        Try
            Dim Organizacion As BL_GEN_Organizacion = New BL_GEN_Organizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim lstOrganizacion As New List(Of ENT_GEN_Organizacion)

            If inTip = "0" Then
                lstOrganizacion = Organizacion.ListarDependencia(vcCodInt, Convert.ToBoolean(btIncDep), Convert.ToInt32(inCodEst))
            Else
                lstOrganizacion = Organizacion.ListarPorCodigoPorNombre(vcValBus, Convert.ToInt32(inCodEst))
            End If

            Organizacion.Dispose()
            Return lstOrganizacion
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function


    <WebMethod()> _
    Public Shared Function ListarEmpleado(ByVal vcCodInt As String, ByVal btIncDep As String, ByVal inCodEst As String,
                                          ByVal vcValBus As String, ByVal inTip As String) As List(Of ENT_GEN_Empleado)
        Dim Empleado As BL_GEN_Empleado = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Empleado = New BL_GEN_Empleado(oUsuario.IdCliente)
            Dim lstEmpleado As New List(Of ENT_GEN_Empleado)

            If inTip = "0" Then
                lstEmpleado = Empleado.ListarPorOrganizacion(vcCodInt, Convert.ToBoolean(btIncDep), Convert.ToInt32(inCodEst), "", "0")
            Else
                lstEmpleado = Empleado.ListarPorNombrePorCodigo(vcValBus, Convert.ToInt32(inCodEst), oUsuario.F_vcCodInt)
            End If
            Return lstEmpleado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Empleado) Then Empleado.Dispose()
        End Try
    End Function


    <WebMethod()> _
    Public Shared Function ListarExonerados() As ArrayList
        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim dt As DataTable = Sincronizacion.getExceptos()

            Dim lista As New ArrayList()
            For i As Integer = 0 To dt.Rows.Count - 1
                lista.Add(New With { _
                 Key .P_vcCod = dt.Rows(i)("P_vcCod").ToString(), _
                 Key .vcNom = dt.Rows(i)("vcNom").ToString(), _
                 Key .btVig = dt.Rows(i)("btVig").ToString() _
                })
            Next

            Return lista
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            Sincronizacion.Dispose()
        End Try
    End Function


    <WebMethod()> _
    Public Shared Sub GrabarExceptos(lista As String)
        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try

            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oSerializer As New JavaScriptSerializer()
            Dim lstCampo As List(Of BEEmpleadoSeleccionar) = oSerializer.Deserialize(Of List(Of BEEmpleadoSeleccionar))(lista)
            Sincronizacion.LimpiaExceptos()
            For Each oCampo As BEEmpleadoSeleccionar In lstCampo
                Dim codigo As String = oCampo.P_vcCod
                Sincronizacion.ActualizaExceptos(codigo)
            Next
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            Sincronizacion.Dispose()
        End Try
    End Sub

End Class