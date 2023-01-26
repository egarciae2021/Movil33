Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports System.Data
Imports System.IO
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_Administrar_Adm_AsignacionBolsa
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Plan As BL_MOV_Plan = Nothing
        Try
            If Not IsPostBack Then
                Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                Dim Operador As BL_GEN_Operador = New BL_GEN_Operador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim Cuenta As BL_MOV_Cuenta = New BL_MOV_Cuenta(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim Servicio As BL_GEN_Servicio = New BL_GEN_Servicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Plan = New BL_MOV_Plan(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim Linea As BL_MOV_Linea = New BL_MOV_Linea(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim Grupo As BL_GEN_Grupo = New BL_GEN_Grupo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim Organizacion As BL_GEN_Organizacion = New BL_GEN_Organizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim Nivel As BL_GEN_Nivel = New BL_GEN_Nivel(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim lstOrganizacion As New List(Of ENT_GEN_Organizacion)
                Dim lstNivel As New List(Of ENT_GEN_Nivel)
                Dim lstOperador As New List(Of ENT_GEN_Operador)
                Dim strOperador As String = ""

                lstOperador = Operador.Listar("-1", "<Seleccionar>")
                Operador.Dispose()
                UtilitarioWeb.Dataddl(ddlOperador, lstOperador, "vcNomOpe", "P_inCodOpe")
                UtilitarioWeb.Dataddl(ddlCuenta, Cuenta.Listar("-1", "<Seleccionar>"), "vcNom", "P_vcCod")
                Cuenta.Dispose()
                UtilitarioWeb.Dataddl(ddlServicio, Servicio.Listar("-1", "<Seleccionar>"), "vcNom", "P_inCod")
                UtilitarioWeb.Dataddl(ddlGrupoEmpleado, Grupo.Listar("-1", "<Seleccionar>"), "vcNom", "P_inCod")

                hdfCodLinTip_X_User.Value = ObtenerTipoLinea_X_Usuario(oUsuario)
                rpPlan.DataSource = Plan.Listar()
                rpPlan.DataBind()
                rpLineaPlan.DataSource = Linea.ListarAsignacionPorPlan()
                rpLineaPlan.DataBind()
                rpLinea.DataSource = Linea.ListarBasicoLibre()
                rpLinea.DataBind()
                rpGrupo.DataSource = Grupo.Listar(Convert.ToInt32(hdfCodLinTip_X_User.Value))
                rpGrupo.DataBind()
                rpServicio.DataSource = Servicio.Listar()
                rpServicio.DataBind()
                Grupo.Dispose()
                Linea.Dispose()
                Servicio.Dispose()
                For Each oOperador As ENT_GEN_Operador In lstOperador
                    If oOperador.P_inCodOpe <> -1 Then
                        strOperador = strOperador '& oOperador.P_inCodOpe & "*" & oOperador. & "*" & oOperador.vcPerFac & "*" & oOperador.inCodTipAsiCre & ","
                    End If
                Next
                hdfOperadores.Value = strOperador.Substring(0, strOperador.Length - 1)

                lstOrganizacion = Organizacion.Listar()
                Organizacion.Dispose()
                lstNivel = Nivel.Listar()
                Nivel.Dispose()
                For Each oNivel As ENT_GEN_Nivel In lstNivel
                    oNivel.vcUrlIcoNiv = "~/Common/Images/Niveles/" & oNivel.P_inCodNiv & ".ico"
                    Dim strfn As String = Server.MapPath(oNivel.vcUrlIcoNiv)
                    Dim fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write)
                    fs.Write(oNivel.imIcoNiv, 0, oNivel.imIcoNiv.Length)
                    fs.Flush()
                    fs.Close()
                Next

                For Each oOrganizacion As ENT_GEN_Organizacion In lstOrganizacion
                    If oOrganizacion.vcCodInt.Length = 3 Then 'esta condicion indica q son elementos padre
                        Dim item As New HtmlGenericControl("li")
                        Dim titulo As New HtmlGenericControl("a")

                        item.ID = "Rama_" & oOrganizacion.P_inCodOrg.ToString

                        titulo.Attributes("href") = "#"
                        titulo.Style("background-image") = "url('" & oOrganizacion.Nivel.vcUrlIcoNiv & "')"
                        titulo.InnerText = oOrganizacion.vcNomOrg

                        item.Controls.Add(titulo)

                        ulArbol.Controls.Add(item)

                        AddMenuItem(item, oOrganizacion, lstOrganizacion)
                    End If
                Next
                '------------------------------------------------------
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

   Private Sub AddMenuItem(ByVal item As HtmlGenericControl, ByVal oOrganizacionPadre As ENT_GEN_Organizacion, ByVal lstOrganizacion As List(Of ENT_GEN_Organizacion))
      For Each oOrganizacion As ENT_GEN_Organizacion In lstOrganizacion
         If oOrganizacion.vcCodInt.Length > 0 Then
            If oOrganizacion.vcCodInt.Substring(0, oOrganizacion.vcCodInt.Length - 3) = oOrganizacionPadre.vcCodInt Then

               Dim item2 As New HtmlGenericControl("li")
               Dim titulo As New HtmlGenericControl("a")

               item2.ID = "Rama_" & oOrganizacion.P_inCodOrg.ToString
               titulo.Attributes("href") = "#"
               titulo.Style("background-image") = "url(" & oOrganizacion.Nivel.vcUrlIcoNiv & ")"
               titulo.InnerText = oOrganizacion.vcNomOrg
               item2.Controls.Add(titulo)

               If item.Controls.Count = 1 Then
                  Dim lista As New HtmlGenericControl("ul")
                  item.Controls.Add(lista)
               End If

               item.Controls(1).Controls.Add(item2)

               AddMenuItem(item2, oOrganizacion, lstOrganizacion)
            End If
         End If
      Next
   End Sub

   <WebMethod()>
   Public Shared Function CambiarOperador(ByVal inCodOpe As String) As List(Of ENT_MOV_Cuenta)
      Try
         Dim Cuenta As BL_MOV_Cuenta = New BL_MOV_Cuenta(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim _return As List(Of ENT_MOV_Cuenta) = Cuenta.ListarPorOperador(inCodOpe, "-1", "<Seleccionar>")
         Cuenta.Dispose()

         Return _return
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

   <WebMethod()>
   Public Shared Function ListaServiciosPorOperador(ByVal inCodOpe As String) As List(Of ENT_GEN_Servicio)
      Try
         Dim Servicio As BL_GEN_Servicio = New BL_GEN_Servicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim _return As List(Of ENT_GEN_Servicio) = Servicio.ListarPorOperador(inCodOpe, "-1", "<Seleccionar>")
         Servicio.Dispose()
         Return _return
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

   <WebMethod()>
   Public Shared Function ListaServiciosPorCuenta(ByVal vcCodCue As String) As List(Of ENT_GEN_Servicio)
      Try
         Dim Servicio As BL_GEN_Servicio = New BL_GEN_Servicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim _return As List(Of ENT_GEN_Servicio) = Servicio.ListarPorCuenta(vcCodCue, "-1", "<Seleccionar>")
         Servicio.Dispose()
         Return _return
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

   <WebMethod()>
   Public Shared Function MostrarMaximoDisponibleServicio(ByVal inCodOpe As String, ByVal vcCodCue As String, ByVal inCodSer As String) As ENT_GEN_Servicio
      Try
         Dim Servicio As BL_GEN_Servicio = New BL_GEN_Servicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim oServicio As New ENT_GEN_Servicio

         oServicio.P_inCod = Integer.Parse(inCodSer)
         oServicio.inCodOpe = Integer.Parse(inCodOpe)
         oServicio.vcCodCue = vcCodCue

         Dim _return As ENT_GEN_Servicio = Servicio.MostrarMaximoDisponibleServicio(oServicio)
         Servicio.Dispose()
         Return _return
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
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
