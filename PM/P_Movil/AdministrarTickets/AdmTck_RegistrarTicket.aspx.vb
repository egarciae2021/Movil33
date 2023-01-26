Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports System.IO
'Imports UtilitarioWeb
Partial Class P_Movil_AdministrarTickets_AdmTck_RegistrarTicket
   Inherits System.Web.UI.Page

   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
      Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
         Dim viIdTecnico As Integer = -1
         If IsNothing(oUsuario) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
         Else
                If Not IsPostBack Then
                    Me.hdfEsOk.Value = "1"
                    viIdTecnico = Me.ObtenerIdTecnicoXIdUsuario(oUsuario.P_inCod)

                    'If viIdTecnico = -1 Then
                    '    Dim script As String = "alert('usted no es tecnico'); window.parent.location.reload();"
                    '    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
                    'End If

                    If Request.QueryString("idAtencion") IsNot Nothing Then
                        hdfIdAtencion.Value = Request.QueryString("idAtencion")
                    Else
                        hdfIdAtencion.Value = "0"
                    End If

                    hdfEmpleado.Value = oUsuario.F_vcCodEmp
                    hdfIdUsuarioLogeado.Value = oUsuario.P_inCod
                    hdfIdTecnico.Value = viIdTecnico
                    hdfAdmin.Value = "0"
               If UtilitarioWeb.Seguridad.EsAdministrador Then hdfAdmin.Value = "1"

                    Dim tipos As List(Of ENT_INC_Tipo) = New List(Of ENT_INC_Tipo)
                    Dim blTipo As BL_INC_Tipo = New BL_INC_Tipo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    tipos = blTipo.ListarTipoResgitroTicketAdmin(-1)
                    blTipo.Dispose()

                    If tipos.Count = 0 Then
                        Me.hdfEsOk.Value = "0"
                        Exit Sub
                    End If


                    Dim mediosContacto As List(Of ENT_INC_MedioContacto) = New List(Of ENT_INC_MedioContacto)
                    Dim blMedioContacto As BL_INC_MedioContacto = New BL_INC_MedioContacto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    mediosContacto = blMedioContacto.obtenerMedioContacto()
                    blMedioContacto.Dispose()

                    'ddlTipo2.DataTextField = "Nombre"
                    'ddlTipo2.DataValueField = "IdTipo"
                    'ddlTipo2.DataSource = tipos
                    'ddlTipo2.DataBind()

                    For index = 0 To tipos.Count - 1
                        Dim item As New ListItem(tipos(index).Nombre, tipos(index).IdTipo)
                        item.Attributes("EsExterno") = IIf(tipos(index).EsExterno, "1", "0")
                        item.Attributes("EsAutomatico") = IIf(tipos(index).EsAutomatico, "1", "0")
                        ddlTipo2.Items.Add(item)
                    Next


                    ddlMedioContacto.DataTextField = "Titulo"
                    ddlMedioContacto.DataValueField = "P_inCod"
                    ddlMedioContacto.DataSource = mediosContacto
                    ddlMedioContacto.DataBind()

                    'If hdfAdmin.Value = "0" Then
                    txtUsuario.Text = oUsuario.P_inCod & "-" & oUsuario.vcNom
                    'End If


                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try

   End Sub

    <WebMethod()>
    Public Shared Function registrarTicket(ByVal pUsuario As Integer, ByVal pUsuarioRegistro As Integer, ByVal pMedioContacto As Integer, ByVal pTipificacion As Integer,
            ByVal pAsunto As String, ByVal pDescripcion As String, ByVal pEsChat As Boolean, ByVal pAsignarme As Boolean, ByVal pEsAutomatico As Boolean, ByVal pIdDominio As Integer, ByVal vcAdj As String) As String
        Try
            Dim ticket As BL_INC_Ticket = New BL_INC_Ticket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim stringCarpetaDominio As String = ""
            If (pIdDominio <> -1) Then
                stringCarpetaDominio = pIdDominio.ToString()
            End If
            Dim lstObj As New List(Of Object)
            Dim objListAdjuntos As List(Of ENT_INC_TicketAdjunto) = Nothing
            If (vcAdj <> "") Then
                objListAdjuntos = New List(Of ENT_INC_TicketAdjunto)
                vcAdj = vcAdj.Substring(0, vcAdj.Length - 1)
                Dim mAdjuntos() As String = vcAdj.Split(",")
                Dim byFileData As Byte()

                For Each strAdj As String In mAdjuntos
                    Dim Adjunto As String() = strAdj.Split(":")
                    'Dim vcFilePath = HttpContext.Current.Server.MapPath("~") + "//General//Uploads//DownloadedFiles//" + stringCarpetaDominio + "//" + Adjunto(0)
                    Dim vcFilePath = HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Incidencias//" + stringCarpetaDominio + "//" + Adjunto(0)
                    If File.Exists(vcFilePath) Then
                        Dim fs As New FileStream(vcFilePath, FileMode.Open, FileAccess.Read)
                        byFileData = New Byte(fs.Length - 1) {}
                        fs.Read(byFileData, 0, System.Convert.ToInt32(fs.Length))
                        fs.Close()


                        Dim objAdjunto As New ENT_INC_TicketAdjunto
                        objAdjunto.IdTicket = 0
                        objAdjunto.NombreArchivo = Adjunto(0)
                        objAdjunto.TamanoArchivo = Adjunto(1)
                        objAdjunto.Archivo = byFileData
                        objListAdjuntos.Add(objAdjunto)
                        If File.Exists(vcFilePath) Then
                            File.Delete(vcFilePath)
                        End If
                    End If
                Next
            End If

            Dim _return As String = ticket.registrarTicket(pUsuario, pUsuarioRegistro, pMedioContacto, pTipificacion, pAsunto, pDescripcion, pEsChat, pIdDominio, pAsignarme, pEsAutomatico, objListAdjuntos)
            ticket.Dispose()
            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    Private Function ObtenerIdTecnicoXIdUsuario(ByVal prIdUsuario As Integer) As Integer
      Try
         Dim viTecnico As BL_INC_TecnicoSupervisor = New BL_INC_TecnicoSupervisor(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim _return As Integer = viTecnico.ObtenerIdTecnicoXIdUsuario(prIdUsuario)
         viTecnico.Dispose()
         Return _return
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

   <WebMethod()>
   Public Shared Function obtenerTipificacion(ByVal prIdTipo As Integer) As List(Of ENT_INC_Tipificacion)
      Try
         Dim viTecnico As BL_INC_Tipificacion = New BL_INC_Tipificacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim _return As List(Of ENT_INC_Tipificacion) = viTecnico.obtenerTipificacion(prIdTipo)
         viTecnico.Dispose()
         Return _return
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

End Class
