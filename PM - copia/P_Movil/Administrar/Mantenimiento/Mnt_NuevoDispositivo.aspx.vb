Imports VisualSoft.Comun.Utilitarios
Imports System.Data
Imports System.Web.Script.Serialization
Imports System.IO
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_Administrar_Mantenimiento_Mnt_NuevoDispositivo
   Inherits System.Web.UI.Page

   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
      Try
         If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim vcCodDis As String = Request.QueryString("CodDis")
                    Dim TipSol As String = Request.QueryString("inTipSol")
                    Dim lstCaracteristica As DataTable
                    Dim Caracteristica As BL_MOV_Caracteristica = New BL_MOV_Caracteristica(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                    If (Not IsNothing(TipSol) Or TipSol <> "") Then 'llamandao desde NuevaSolicitud
                        If TipSol = 2 Then 'solicitud de tipo nuevo, no tiene penalidad
                            lblMensaje.Text = ""
                        End If
                    End If

                    lstCaracteristica = Caracteristica.ListarxTabla("MOV_ModeloDispositivo", "", "")
                    Caracteristica.Dispose()
                    If lstCaracteristica.Rows.Count > 0 Then
                        For Each dr As DataRow In lstCaracteristica.Rows
                            Dim trDim As New HtmlTableRow
                            Dim tdIDim As New HtmlTableCell
                            Dim tdDDim As New HtmlTableCell
                            tdIDim.InnerText = dr("vcDesCam").ToString
                            tdIDim.Width = "130"
                            tdIDim.Attributes("class") = ""

                            If dr("dcTipDat").ToString = "Fecha" Then
                                dr("dcTipDatSQL") = "DATE"
                            End If

                            Select Case dr("dcTipDatSQL").ToString
                                Case "INT"
                                    Dim txtINT As New Label
                                    txtINT.ID = "txt_" & dr("vcNomCam").ToString
                                    txtINT.CssClass = "INT"
                                    txtINT.Attributes("obj") = dr("vcNomCam").ToString
                                    tdDDim.Controls.Add(txtINT)
                                Case "DECIMAL"
                                    Dim txtDECIMAL As New Label
                                    txtDECIMAL.ID = "txt_" & dr("vcNomCam").ToString
                                    txtDECIMAL.CssClass = "DECIMAL"
                                    Dim longitud As String() = dr("vcLon").ToString().Split(",")
                                    txtDECIMAL.Attributes("obj") = dr("vcNomCam").ToString
                                    tdDDim.Controls.Add(txtDECIMAL)
                                Case "VARCHAR"
                                    Dim txtVARCHAR As New Label
                                    txtVARCHAR.ID = "txt_" & dr("vcNomCam").ToString
                                    txtVARCHAR.Attributes("maxlength") = dr("vcLon").ToString
                                    txtVARCHAR.CssClass = "VARCHAR"
                                    txtVARCHAR.Attributes("obj") = dr("vcNomCam").ToString
                                    If Convert.ToInt32(dr("vcLon").ToString().Length()) > 80 Then 'cambio a comparar Length de "vcLon" 14-08-2013
                                        txtVARCHAR.Height = New Unit(60, UnitType.Pixel)
                                        txtVARCHAR.Width = New Unit(200, UnitType.Pixel)
                                    End If
                                    tdDDim.Controls.Add(txtVARCHAR)
                                Case "DATE"
                                    Dim txtSMALLDATETIME As New Label
                                    txtSMALLDATETIME.ID = "txt_" & dr("vcNomCam").ToString
                                    txtSMALLDATETIME.CssClass = "DATE"
                                    txtSMALLDATETIME.Attributes("obj") = dr("vcNomCam").ToString
                                    tdDDim.Controls.Add(txtSMALLDATETIME)
                                Case "DATETIME"
                                    Dim txtDATETIME As New Label
                                    txtDATETIME.ID = "txt_" & dr("vcNomCam").ToString
                                    txtDATETIME.CssClass = "DATETIME"
                                    txtDATETIME.Attributes("obj") = dr("vcNomCam").ToString
                                    tdDDim.Controls.Add(txtDATETIME)
                                Case "BIT"
                                    Dim chkBIT As New CheckBox
                                    chkBIT.ID = "chk_" & dr("vcNomCam").ToString
                                    chkBIT.Attributes("obj") = dr("vcNomCam").ToString
                                    chkBIT.CssClass = "BIT"
                                    chkBIT.Enabled = False
                                    tdDDim.Controls.Add(chkBIT)
                            End Select

                            trDim.Cells.Add(tdIDim)
                            trDim.Cells.Add(tdDDim)
                            tbDetalleModeloDispositivo.Rows.Add(trDim)
                        Next
                    End If

                    'Dim Dispositivo As BL_MOV_Dispositivo = BL_MOV_Dispositivo.Instance(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    'Dim oDispositivo As New ENT_MOV_Dispositivo

                    'oDispositivo = Dispositivo.MostrarDatosSolicitudModelo(vcCodDis)

                    Dim ModeloDispositivo As BL_MOV_ModeloDispositivo = New BL_MOV_ModeloDispositivo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    'Dim oModeloDispositivo As DataTable = ModeloDispositivo.Mostrar(oDispositivo.ModeloDispositivo.P_inCod)
                    Dim oModeloDispositivo As DataTable = ModeloDispositivo.Mostrar(vcCodDis).Tables(0)
                    Dim lstGrupoAgregado As New List(Of Object)
                    Dim lstGrupoNoAgregado As New List(Of Object)
                    Dim oSerializer As New JavaScriptSerializer

                    For Each oGrupo As ENT_GEN_Grupo In ModeloDispositivo.ListarGrupoSinModelo(vcCodDis)
                        Dim dict As New Dictionary(Of String, Object)

                        dict.Add("Codigo", oGrupo.P_inCod)
                        dict.Add("Valor", oGrupo.vcNom)

                        lstGrupoNoAgregado.Add(dict)
                    Next

                    For Each oGrupo As ENT_GEN_Grupo In ModeloDispositivo.ListarGrupoxModelo(vcCodDis)
                        Dim dict As New Dictionary(Of String, Object)

                        dict.Add("Codigo", oGrupo.P_inCod)
                        dict.Add("Valor", oGrupo.vcNom)

                        lstGrupoAgregado.Add(dict)
                    Next
                    ModeloDispositivo.Dispose()
                    'hdfddlGrupo.Value = oSerializer.Serialize(lstGrupoNoAgregado)
                    'hdflstGrupo.Value = oSerializer.Serialize(lstGrupoAgregado)

                    lblModeloDispositivo.Text = oModeloDispositivo(0)("vcNom").ToString()

                    If Convert.ToBoolean(oModeloDispositivo(0)("btVig")) Then
                        lblEstado.Text = "Activo"
                    Else
                        lblEstado.Text = "Inactivo"
                    End If

                    Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(Server.MapPath("~/Images/ModeloDispositivo/"), "/")

                    If Not IsDBNull(oModeloDispositivo(0)("imIma")) Then
                        Dim barrImg As Byte() = CType(oModeloDispositivo(0)("imIma"), Byte())
                        Dim archivo As String = oModeloDispositivo(0)("P_inCod").ToString & ".jpg"
                        Dim strfn As String = Server.MapPath("~/Images/ModeloDispositivo" + CarpetaDominio + "/" + archivo)
                        Dim fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write)
                        fs.Write(barrImg, 0, barrImg.Length)
                        fs.Flush()
                        fs.Close()
                        imgImagen.Src = "../../../Images/ModeloDispositivo" + CarpetaDominio + "/" + archivo
                        imgImagen.Alt = oModeloDispositivo(0)("vcNom").ToString
                        imgImagen.Width = 150
                        imgImagen.Height = 150
                    Else
                        imgImagen.Width = 150
                        imgImagen.Height = 150
                        imgImagen.Src = "../../../Common/Images/Mantenimiento/NoDisponible.jpg"
                        imgImagen.Alt = "Imagen no disponible"
                    End If

                    If lstCaracteristica.Rows.Count > 0 Then
                        For Each dr As DataRow In lstCaracteristica.Rows
                            Select Case dr("dcTipDatSQL").ToString
                                Case "INT"
                                    CType(Me.FindControl("txt_" & dr("vcNomCam").ToString), Label).Text = IIf(IsDBNull(oModeloDispositivo.Rows(0)(dr("vcNomCam").ToString)), "", oModeloDispositivo.Rows(0)(dr("vcNomCam").ToString))
                                Case "DECIMAL"
                                    If (dr("vcNomCam").ToString() = "costo_reposicion") Then
                                        CType(Me.FindControl("txt_" & dr("vcNomCam").ToString), Label).Text = IIf(IsDBNull(oModeloDispositivo.Rows(0)(dr("vcNomCam").ToString)), "", "Sujeto a Cotización")
                                    Else
                                        CType(Me.FindControl("txt_" & dr("vcNomCam").ToString), Label).Text = IIf(IsDBNull(oModeloDispositivo.Rows(0)(dr("vcNomCam").ToString)), "", oModeloDispositivo.Rows(0)(dr("vcNomCam").ToString))
                                    End If
                                Case "VARCHAR"
                                    CType(Me.FindControl("txt_" & dr("vcNomCam").ToString), Label).Text = IIf(IsDBNull(oModeloDispositivo.Rows(0)(dr("vcNomCam").ToString)), "", oModeloDispositivo.Rows(0)(dr("vcNomCam").ToString))
                                Case "DATE"
                                    CType(Me.FindControl("txt_" & dr("vcNomCam").ToString), Label).Text = IIf(IsDBNull(oModeloDispositivo.Rows(0)(dr("vcNomCam").ToString)), "", oModeloDispositivo.Rows(0)(dr("vcNomCam").ToString))
                                Case "DATETIME"
                                    CType(Me.FindControl("txt_" & dr("vcNomCam").ToString), Label).Text = IIf(IsDBNull(oModeloDispositivo.Rows(0)(dr("vcNomCam").ToString)), "", oModeloDispositivo.Rows(0)(dr("vcNomCam").ToString))
                                Case "BIT"
                                    If Not IsDBNull(oModeloDispositivo.Rows(0)(dr("vcNomCam").ToString)) Then
                                        CType(Me.FindControl("chk_" & dr("vcNomCam").ToString), CheckBox).Checked = oModeloDispositivo.Rows(0)(dr("vcNomCam").ToString)
                                    End If
                            End Select
                        Next
                    End If
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
   Public Shared Function CargarDispositivo(ByVal dcNumLin As String, ByVal vcCodEmp As String) As String
      Try
         Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
         Dim Linea As BL_MOV_Linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim Resultado As Integer

         'If oUsuario.Empleado.P_vcCod <> "" Then
         '    Resultado = Linea.VerificaLineaEmpleadoCambio(oUsuario.Empleado.P_vcCod, dcNumLin)
         'Else
         Resultado = Linea.VerificaLineaEmpleadoCambio(vcCodEmp, dcNumLin)
         'End If
         Linea.Dispose()
         Return Resultado.ToString
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function
End Class
