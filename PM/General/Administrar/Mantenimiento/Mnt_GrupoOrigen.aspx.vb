Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports System.Data
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization
Imports System.Web.Script.Services
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class General_Administrar_Mantenimiento_Mnt_GrupoOrigen
   Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                oUsuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                Dim codigo As String = Request.QueryString("Cod")
                hdfEstado.Value = codigo
                hdfGrupoOrigen.Value = codigo
                UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)

                hdfCodLinTip_X_User.Value = ObtenerTipoLinea_X_Usuario(oUsuario)
                Dim linea As BL_MOV_LineaTipo = New BL_MOV_LineaTipo(oUsuario.IdCliente)
                Dim lstTipoLin As New List(Of ENT_MOV_LineaTipo)
                lstTipoLin.Add(New ENT_MOV_LineaTipo With {.P_inCod = "-1", .vcDescripcion = "--Seleccione--"})
                lstTipoLin.AddRange(linea.Listar(Convert.ToInt32(hdfCodLinTip_X_User.Value), 0, ""))
                linea.Dispose()
                UtilitarioWeb.Dataddl(ddlTipoLin, lstTipoLin, "vcDescripcion", "P_inCod")

                'Tipo de Linea - wapumayta - 02-11-2015
                Dim General = New General()
                Dim inTipoLinea As Integer = General.ObtenerTipoLineaDesdePerfiles(oUsuario)
                If hdfCodLinTip_X_User.Value <> 0 Then
                    ddlTipoLin.Enabled = False
                    ddlTipoLin.SelectedValue = hdfCodLinTip_X_User.Value
                End If

                If Not IsNothing(codigo) Then
                    bpBusquedaModelos.NombreEntidad = "Modelos Dispositivos"
                    bpBusquedaModelos.vcTab = "MOV_ModeloDispositivo"
                    bpBusquedaModelos.TipoOrigen = 0
                    bpBusquedaModelos.Condicion = " btVig = 1 "
                    bpBusquedaModelos.FuncionPersonalizada = "fnMostrarCodigoModelos"
                    bpBusquedaModelos.RutaRaiz = "../../../"
                    bpBusquedaModelos.Contenedor = "dvBusquedaModelos"

                    bpBusquedaEmpleados.NombreEntidad = "Empleados"
                    bpBusquedaEmpleados.vcTab = "M_EMPL"
                    bpBusquedaEmpleados.TipoOrigen = 0
                    bpBusquedaEmpleados.Condicion = " EMPL_btEST=1 "
                    bpBusquedaEmpleados.FuncionPersonalizada = "fnMostrarCodigoEmpleado"
                    bpBusquedaEmpleados.RutaRaiz = "../../../"
                    bpBusquedaEmpleados.Contenedor = "dvBusquedaEmpleados"

                    bpBusquedaPaquetes.NombreEntidad = "Paquetes de Ampliación"
                    bpBusquedaPaquetes.vcTab = "MOV_PaquetesAmpliacion"
                    bpBusquedaPaquetes.TipoOrigen = 0
                    bpBusquedaPaquetes.Condicion = " btVig=1 "
                    bpBusquedaPaquetes.FuncionPersonalizada = "fnMostrarCodigoPaquete"
                    bpBusquedaPaquetes.RutaRaiz = "../../../"
                    bpBusquedaPaquetes.Contenedor = "dvBusquedaPaquetes"

                    chActivo.Visible = True
                    If Not Page.IsPostBack Then
                        Dim grupoOrigen As BL_GEN_GrupoOrigen = New BL_GEN_GrupoOrigen(oUsuario.IdCliente)
                        Dim oGrupoOrigen As List(Of ENT_GEN_GrupoOrigen) = grupoOrigen.Listar(codigo)
                        grupoOrigen.Dispose()
                        txtCodigo.Text = oGrupoOrigen(0).P_inCodGruOri.ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                        txtCodigo.Enabled = False
                        txtNombre.Text = oGrupoOrigen(0).vcNomGru.ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                        ddlTipoLin.SelectedValue = oGrupoOrigen(0).inTipLin
                        hdfTipoLineaAnterior.Value = oGrupoOrigen(0).inTipLin
                        hdfTipoLinea.Value = oGrupoOrigen(0).inTipLin

                        If oGrupoOrigen(0).inNumMaxDis = 1 And oGrupoOrigen(0).inTiemMinDis = 1 Then
                            hdfEditarTipoLinea.Value = 1
                        ElseIf oGrupoOrigen(0).inNumMaxDis = 1 And oGrupoOrigen(0).inTiemMinDis = 0 Then
                            hdfEditarTipoLinea.Value = 2
                        ElseIf oGrupoOrigen(0).inNumMaxDis = 0 And oGrupoOrigen(0).inTiemMinDis = 1 Then
                            hdfEditarTipoLinea.Value = 3
                        ElseIf oGrupoOrigen(0).inNumMaxDis = 0 And oGrupoOrigen(0).inTiemMinDis = 0 Then
                            hdfEditarTipoLinea.Value = 0
                        End If

                        If oGrupoOrigen(0).btEst Then
                            chActivo.Checked = True
                            hdfEstadoGruOri.Value = 1
                            'trCodigo.Style("display") = "none"
                            trEstado.Style("display") = "none"
                        Else
                            chActivo.Checked = False
                            hdfEstadoGruOri.Value = 0
                        End If
                    End If
                    'chkDefecto.Checked = Boolean.Parse(oEstado(0)("btDef").ToString)
                Else
                    chActivo.Visible = False
                    txtCodigo.Enabled = False
                    chActivo.Checked = True
                    hdfEstadoGruOri.Value = 1
                    trCodigo.Style("display") = "none"
                    trEstado.Style("display") = "none"
                    hdfGrupoOrigen.Value = ""
                    tbAgregarModelos.Style("display") = "none"
                    tbAgregarEmpleados.Style("display") = "none"
                    dvMensajeModelos.Style("display") = ""
                    dvMensajeEmpleados.Style("display") = ""
                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

   <WebMethod()>
   Public Shared Function Guardar(ByVal Codigo As String, ByVal Nombre As String, ByVal inCodEst As String, ByVal estado As String, _
                                   ByVal inTipLin As Integer, ByVal vcCodEmpleado As String, ByVal inTipLinAnt As String) As String
      Dim GrupoOrigen As BL_GEN_GrupoOrigen = Nothing
      Try
         Dim oGrupoOrigen As New ENT_GEN_GrupoOrigen
         GrupoOrigen = New BL_GEN_GrupoOrigen(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

         Dim estadoGruOri As Boolean
         Dim Resultado As String

         estadoGruOri = False
         If estado = 1 Then
            estadoGruOri = True
         End If

         oGrupoOrigen.vcNomGru = Nombre
         oGrupoOrigen.F_inCodCli = 0
         oGrupoOrigen.btEst = estadoGruOri
         oGrupoOrigen.inTipLin = inTipLin

         If inCodEst <> "" Then
            oGrupoOrigen.P_inCodGruOri = Convert.ToInt32(inCodEst)
            Resultado = GrupoOrigen.Actualizar(oGrupoOrigen, vcCodEmpleado, Convert.ToInt32(inTipLinAnt))
         Else
            Resultado = GrupoOrigen.Insertar(oGrupoOrigen).ToString()
            ' coincidencias = GrupoOrigen.ExisteCodigo(Codigo, "M_GRUP_ORIG", "GROR_P_inCODGRUORI")
            'If coincidencias Then
            '    Return "El codigo ingresado ya existe"
            'Else
            'GrupoOrigen.Insertar(oGrupoOrigen)
            'Return ""

            'End If
         End If
         Return Resultado

      Catch ex As Exception
         Return ex.Message
      Finally
         If GrupoOrigen IsNot Nothing Then GrupoOrigen.Dispose()
      End Try
   End Function

   'Protected Sub chActivo_CheckedChanged(ByVal sender As Object, ByVal e As System.EventArgs) Handles chActivo.CheckedChanged
   '    If Me.chActivo.Checked Then
   '        hdfEstadoGruOri.Value = 1
   '    Else
   '        hdfEstadoGruOri.Value = 0
   '    End If
   'End Sub

   <WebMethod()> _
<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
   Public Shared Function ObtenerModelos_GrupoOrigen(ByVal pIdGrupoOrigen As String, ByVal inPagTam As Integer, ByVal inPagAct As Integer, ByVal vcFiltro As String) As Object
      Dim GrupoOrigen As BL_GEN_GrupoOrigen = New BL_GEN_GrupoOrigen(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
      Try
         Dim ds As DataSet = GrupoOrigen.ObtenerModelosDis_GrupoOrigen(pIdGrupoOrigen, vcFiltro.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """"))
         GrupoOrigen.Dispose()
         Dim dtModelosGrilla As DataTable = ds.Tables(0)
         Return JQGrid.DatosJSON(dtModelosGrilla, inPagTam, inPagAct)
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If GrupoOrigen IsNot Nothing Then GrupoOrigen.Dispose()
      End Try
   End Function

    <WebMethod()> _
 <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ObtenerEmpleados_GrupoOrigen(ByVal pIdGrupoOrigen As String, ByVal inPagTam As Integer, ByVal inPagAct As Integer, _
                                                        ByVal pidTipoLin As Integer, ByVal vcFiltro As String) As Object
        Dim Empleados As BL_GEN_EmpleadoG = New BL_GEN_EmpleadoG(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Try
            Dim ds As DataSet = Empleados.ObtenerEmpleados_GrupoOrigen(pIdGrupoOrigen, vcFiltro.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """"), pidTipoLin)
            Empleados.Dispose()
            Dim dtEmpleadosGrilla As DataTable = ds.Tables(0)
            Return JQGrid.DatosJSON(dtEmpleadosGrilla, inPagTam, inPagAct)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Empleados IsNot Nothing Then Empleados.Dispose()
        End Try
    End Function

   <WebMethod()>
   Public Shared Function ProcesarModeloGrupoOrigen(ByVal p_inCodGrupoOrigen As Integer, ByVal p_inCodModeloDispositivo As Integer, ByVal esAdd As Boolean) As String
      Dim GrupoOrigen As BL_GEN_GrupoOrigen = New BL_GEN_GrupoOrigen(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
      Dim resultado As String = String.Empty
      Try
         resultado = GrupoOrigen.ProcesarModeloGrupoOrigen(p_inCodGrupoOrigen, p_inCodModeloDispositivo, esAdd)
         GrupoOrigen.Dispose()
         Return resultado
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If GrupoOrigen IsNot Nothing Then GrupoOrigen.Dispose()
      End Try
   End Function

   <WebMethod()>
   Public Shared Function ProcesarEmpleadosGrupoOrigen(ByVal p_inCodGrupoOrigen As Integer, ByVal p_vcCodEmpleado As String, ByVal p_inIdTipLin As Integer, ByVal esAdd As Boolean) As String
      Dim Empleados As BL_GEN_EmpleadoG = New BL_GEN_EmpleadoG(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
      Dim resultado As String = String.Empty
      Try
         resultado = Empleados.ProcesarEmpleadoGrupoOrigen(p_inCodGrupoOrigen, p_vcCodEmpleado, p_inIdTipLin, esAdd)
         Empleados.Dispose()
         Return resultado
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Empleados IsNot Nothing Then Empleados.Dispose()
      End Try
   End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ObtenerPaquetesAmpliacion(ByVal pIdGrupoOrigen As String, ByVal inPagTam As Integer, ByVal inPagAct As Integer, ByVal vcFiltro As String) As Object
        Dim PaqueteAmpliacion As BL_MOV_PaqueteAmpliacion = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            PaqueteAmpliacion = New BL_MOV_PaqueteAmpliacion(oUsuario.IdCliente)
            Return JQGrid.DatosJSON(PaqueteAmpliacion.ListarPorGrupoEmpleado(pIdGrupoOrigen, vcFiltro), inPagTam, inPagAct)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If PaqueteAmpliacion IsNot Nothing Then PaqueteAmpliacion.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ProcesarPaqueteAmpliacion(ByVal p_inCodGrupoOrigen As Integer, ByVal p_inCodPaqAmp As Integer, ByVal esAdd As Boolean) As String
        Dim PaqueteAmpliacion As BL_MOV_PaqueteAmpliacion = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim resultado As String = String.Empty
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            PaqueteAmpliacion = New BL_MOV_PaqueteAmpliacion(oUsuario.IdCliente)

            If esAdd Then
                resultado = PaqueteAmpliacion.InsertarPaqueteGrupo(p_inCodGrupoOrigen, p_inCodPaqAmp).ToString()
            Else
                resultado = PaqueteAmpliacion.EliminarPaqueteGrupo(p_inCodGrupoOrigen, p_inCodPaqAmp).ToString()
            End If

            Return resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(PaqueteAmpliacion) Then PaqueteAmpliacion.Dispose()
        End Try
    End Function

    Private Function ObtenerTipoLinea_X_Usuario(ByVal oUsuario As ENT_SEG_Usuario) As String
        Dim vcPerfiles As String = String.Empty
        Dim vcPerfil As String = ""
        For p As Integer = 0 To oUsuario.Perfiles.Count - 1
            If (vcPerfiles = "") Then
                If oUsuario.Perfiles(p).inCodTip_General.ToString() = 1 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General()) Then
                    vcPerfiles = oUsuario.Perfiles(p).inCodTip_General.ToString()
                ElseIf oUsuario.Perfiles(p).inCodTip_General.ToString() = 2 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                    vcPerfiles = oUsuario.Perfiles(p).inCodTip_General.ToString()
                ElseIf oUsuario.Perfiles(p).inCodTip_General.ToString() = 0 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                    vcPerfiles = oUsuario.Perfiles(p).inCodTip_General.ToString()
                End If
            Else
                If oUsuario.Perfiles(p).inCodTip_General.ToString() = 1 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                    vcPerfiles += "," + oUsuario.Perfiles(p).inCodTip_General.ToString()
                ElseIf oUsuario.Perfiles(p).inCodTip_General.ToString() = 2 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                    vcPerfiles += "," + oUsuario.Perfiles(p).inCodTip_General.ToString()
                ElseIf oUsuario.Perfiles(p).inCodTip_General.ToString() = 0 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                    vcPerfiles += "," + oUsuario.Perfiles(p).inCodTip_General.ToString()
                End If
            End If
        Next
        '---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        If vcPerfiles = "1,2" Or vcPerfiles = "2,1" Or vcPerfiles.Contains("0") Then
            vcPerfil = "0"
        ElseIf vcPerfiles <> "" Then
            vcPerfil = vcPerfiles.ToString()
        End If

        Return vcPerfil

    End Function

End Class
