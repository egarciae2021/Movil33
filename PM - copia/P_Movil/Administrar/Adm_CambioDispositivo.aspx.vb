Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Data
Imports System.IO
Imports VisualSoft.Comun.Utilitarios
Imports CompCorreo
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_Administrar_Adm_CambioDispositivo
   Inherits System.Web.UI.Page

   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
      Try
         If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
         Else
            If Not IsPostBack Then
               Dim vcCodEmp As String = ""

               'lista de adjuntos, agregado 05-09-2013
               hdfListaUbi.Value = Request.QueryString("lstUbi")

               If Not IsNothing(Request.QueryString("vcCodEmp")) Then
                  vcCodEmp = Request.QueryString("vcCodEmp").ToString
               End If

               Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

               If vcCodEmp <> "" Then
                  divSeguridad.Visible = False
                  ListarModelos(vcCodEmp)
                  hdfEmpleado.Value = vcCodEmp
                  'jherrera 20130515
                  '-----------------
                  hdfLinea.Value = Request.QueryString("dcNumLin").ToString
                  '-----------------
                  hdfGaleria.Value = "1"
               Else
                  container.Visible = False
                  divEnvio.Visible = False
                  hdfGaleria.Value = "0"
                  If oUsuario.Empleado.P_vcCod <> "" Then
                     Dim Empleado As BL_GEN_Empleado = New BL_GEN_Empleado(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                     lblEmpleado.Text = oUsuario.Empleado.P_vcCod & " - " & Empleado.Mostrar(oUsuario.Empleado.P_vcCod).vcNom
                     Empleado.Dispose()
                     txtEmpleado.Style("display") = "none"
                     hdfCodEmpleado.Value = oUsuario.Empleado.P_vcCod
                  Else
                     lblEmpleado.Style("display") = "none"
                     hdfEmpleado.Value = ""
                  End If
               End If
               UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
            End If
         End If
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Sub

   <WebMethod()>
   Public Shared Function VerificaLineaEmpleado(ByVal dcNumLin As String, ByVal vcCodEmp As String) As String
      Try
         Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
         Dim Linea As BL_MOV_Linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim Resultado As Integer

         'If oUsuario.Empleado.P_vcCod <> "" Then
         '    Resultado = Linea.VerificaLineaEmpleadoCambio(oUsuario.Empleado.P_vcCod, dcNumLin)
         'Else
         Resultado = Linea.VerificaLineaEmpleadoCambio(vcCodEmp, dcNumLin)

         Linea.Dispose()

         Return Resultado.ToString
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

   <WebMethod()>
   Public Shared Function EnviaSolicitud(ByVal vcNumLin As String, ByVal inCodModDis As String, ByVal vcCodEmp As String, ByVal vcArchAdj As String) As String
        Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/P_Movil/Administrar/Temporal/"), "/")
        Try
            Dim resultado As Integer
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            'Dim Solicitud As BL_MOV_Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
            Dim oLinea As New ENT_MOV_Linea

            oLinea.P_vcNum = vcNumLin
            oLinea.Empleado.P_vcCod = vcCodEmp
            oLinea.Dispositivo.ModeloDispositivo.P_inCod = Integer.Parse(inCodModDis)
            'resultado = Solicitud.Insertar(oLinea, Convert.ToInt32(UtilitarioWeb.TipoSolicitud.Cambio), oUsuario)
            If resultado <> 0 Then
                Dim Notificacion As BL_MOV_SolicitudNotificacion = New BL_MOV_SolicitudNotificacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim oNotificacion As ENT_MOV_SolicitudNotificacion = Notificacion.Mostrar(2)
                Notificacion.Dispose()
                'Dim m_objCorreo As New CCorreo
                Dim oEmpleado As New ENT_GEN_Empleado
                Dim Empleado As BL_GEN_Empleado = New BL_GEN_Empleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                oEmpleado = Empleado.Mostrar(vcCodEmp)
                Empleado.Dispose()
                'Grabar archivos adjuntos agregado 05-09-2013
                Dim ArchivoAdjunto As BL_MOV_ArchivoAdjunto = New BL_MOV_ArchivoAdjunto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim listatemporal As List(Of String) = vcArchAdj.Split(",").ToList()
                For Each ubic As String In listatemporal
                    Dim ubicc As String = "~/P_Movil/Administrar/Temporal" + CarpetaDominio + "/File" & ubic
                    Dim strfn As String = HttpContext.Current.Server.MapPath(ubicc)
                    If File.Exists(strfn) Then
                        Using fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Read)
                            Dim oArchivoAdjunto As New ENT_MOV_ArchivoAdjunto
                            Dim BinaryData(fs.Length - 1) As Byte
                            fs.Read(BinaryData, 0, BinaryData.Length)
                            oArchivoAdjunto.F_vcCodSol = resultado
                            oArchivoAdjunto.vcNomAdj = ubic
                            oArchivoAdjunto.binData = BinaryData
                            oArchivoAdjunto.vcExtAdj = Path.GetExtension(ubicc).Substring(1)
                            ArchivoAdjunto.Insertar(oArchivoAdjunto)
                            fs.Flush()
                            fs.Close()
                        End Using
                        File.Delete(strfn)
                    End If
                Next
                ArchivoAdjunto.Dispose()
                'fin grabar archivos

                'If oNotificacion.btEnvCorAdm Then
                '    Dim cuerpo As String = UtilitarioWeb.TraeCuerpoCorreo(HttpContext.Current.Server.MapPath("~/") & "/For_SolicitudAdministrador.htm")
                '    String.Format(cuerpo, oEmpleado.vcNom, "Cambio de dispositivo")
                '    If Not String.IsNullOrEmpty(oNotificacion.vcCorAdm1) Then
                '        m_objCorreo.Enviar(False, oNotificacion.vcCorAdm1, oNotificacion.vcTitCorAdm, cuerpo)
                '    End If
                '    If Not String.IsNullOrEmpty(oNotificacion.vcCorAdm2) Then
                '        m_objCorreo.Enviar(False, oNotificacion.vcCorAdm2, oNotificacion.vcTitCorAdm, cuerpo)
                '    End If
                '    If Not String.IsNullOrEmpty(oNotificacion.vcCorAdm3) Then
                '        m_objCorreo.Enviar(False, oNotificacion.vcCorAdm3, oNotificacion.vcTitCorAdm, cuerpo)
                '    End If
                'End If

                'If oNotificacion.btEnvCorUsu Then
                '    Dim cuerpo As String = UtilitarioWeb.TraeCuerpoCorreo("For_SolicitudUsuario.htm")
                '    String.Format(cuerpo, oEmpleado.vcNom)
                '    m_objCorreo.Enviar(False, "", oNotificacion.vcTitCorUsu, cuerpo)
                'End If
                Return ""
            Else
                Return "No hay dispositivos disponible para el modelo seleccionado, por favor elija otro modelo"
            End If
            Return ""
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

   Private Sub ListarModelos(ByVal vcCodEmp As String)
      Dim ModeloDispositivo As BL_MOV_ModeloDispositivo = New BL_MOV_ModeloDispositivo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
      Dim Caracteristica As BL_MOV_Caracteristica = New BL_MOV_Caracteristica(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
      Dim lstCaracteristica As DataTable
      Dim lstModeloDispositivo As DataTable

        lstCaracteristica = Caracteristica.ListarxTabla("MOV_ModeloDispositivo", "", "")
      Caracteristica.Dispose()
      lstModeloDispositivo = ModeloDispositivo.ListarPorGrupo(vcCodEmp)
      ModeloDispositivo.Dispose()
      If lstModeloDispositivo.Rows.Count > 0 Then
         For Each drMD As DataRow In lstModeloDispositivo.Rows
            Dim li As New HtmlGenericControl("li")
            Dim athumb As New HtmlGenericControl("a")
            Dim divcaption As New HtmlGenericControl("div")
            Dim imgthumb As New HtmlImage
            Dim tbCamposDinamicos As New HtmlTable

            athumb.Attributes("class") = "thumb"
            athumb.Attributes("name") = "leaf"
            imgthumb.Height = 100
            imgthumb.Width = 100

            divcaption.Attributes("class") = "caption"

            athumb.Controls.Add(imgthumb)

            Dim trD As New HtmlTableRow
            Dim tdD As New HtmlTableCell
            Dim tdI As New HtmlTableCell
            tdI.InnerText = "Modelo"
            tdD.InnerText = drMD("vcNom").ToString

            Dim hdfId As New HiddenField
            hdfId.Value = drMD("P_inCod").ToString

            tdD.Controls.Add(hdfId)

            trD.Cells.Add(tdI)
            trD.Cells.Add(tdD)
            tbCamposDinamicos.Rows.Add(trD)

                Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(Server.MapPath("~/Images/ModeloDispositivo/"), "/")
                
            If Not IsDBNull(drMD("imIma")) Then
               Dim barrImg As Byte() = CType(drMD("imIma"), Byte())
               Dim archivo As String = drMD("P_inCod").ToString & ".jpg"
                    Dim strfn As String = Server.MapPath("~/Images/ModeloDispositivo" + CarpetaDominio + "/" + archivo)
               Dim fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write)
               fs.Write(barrImg, 0, barrImg.Length)
               fs.Flush()
               fs.Close()
                    imgthumb.Src = "../../Images/ModeloDispositivo" + CarpetaDominio + "/" + archivo
               imgthumb.Alt = drMD("vcNom").ToString
               imgthumb.Width = 100
               imgthumb.Height = 100
                    athumb.Attributes("href") = "../../Images/ModeloDispositivo" + CarpetaDominio + "/" + archivo
               athumb.Attributes("title") = drMD("vcNom").ToString
            Else
               imgthumb.Src = "../../Common/Images/Mantenimiento/NoDisponible.jpg"
               imgthumb.Alt = "Imagen no disponible"
               athumb.Attributes("href") = "../../Common/Images/Mantenimiento/NoDisponible.jpg" 'Ruta de imagen
               athumb.Attributes("title") = drMD("vcNom").ToString
            End If

            If lstCaracteristica.Rows.Count > 0 Then
               'Obtiene controles dinámicos con sus respectivos valores...
                    GeneralMantenimiento.Instance.CrearLabelsDinamicosMantenimiento("MOV_ModeloDispositivo", drMD, tbCamposDinamicos, 1)

               divcaption.Controls.Add(tbCamposDinamicos)
            Else
               imgthumb.Src = "../../Common/Images/Mantenimiento/NoDisponible.jpg"
               imgthumb.Alt = drMD("vcNom").ToString
               athumb.Attributes("href") = "../../Common/Images/Mantenimiento/NoDisponible.jpg" 'Ruta de imagen
               athumb.Attributes("title") = drMD("vcNom").ToString 'Titulo
               divcaption.Controls.Add(New LiteralControl("<div class=""image-title"">" & drMD("vcNom").ToString & "</div>"))
            End If

            li.Controls.Add(athumb)
            li.Controls.Add(divcaption)
            ulGaleria.Controls.Add(li)
         Next
      Else
         hdfGaleria.Value = "-1"
         container.Visible = False
      End If
   End Sub

End Class