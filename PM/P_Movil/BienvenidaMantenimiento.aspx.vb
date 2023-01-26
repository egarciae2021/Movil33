Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.LibreriaJQ
Imports System.Drawing
Imports VisualSoft.Comun.Utilitarios
'Imports VisualSoft.PCSistel.Producto.BL

Partial Class P_Movil_BienvenidaMantenimiento
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Entidad As BL_ENT_Entidad = Nothing
        Dim Opcion As BL_PRO_Opcion = Nothing
        Dim Mantenimiento As BL_MNT_Mantenimiento = Nothing
        If IsNothing(Session("Usuario")) Then
            'Dim script As String = "window.parent.location.reload()"
            Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
        Else
            Try
                If Not IsPostBack Then
                    oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                    'Dim Entidad As VisualSoft.Suite80.BL.BL_ENT_Entidad = New VisualSoft.Suite80.BL.BL_ENT_Entidad(1, CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    'Dim Opcion As VisualSoft.Suite80.BL.BL_PRO_Opcion = New VisualSoft.Suite80.BL.BL_PRO_Opcion(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Entidad = New BL_ENT_Entidad(1, oUsuario.IdCliente)
                    Opcion = New BL_PRO_Opcion(oUsuario.IdCliente)

                    Dim lstOpciones As List(Of ENT_PRO_Opcion)
                    'lstItems = Item.ListarPorModulo(CType(Session("Usuario"), ENT_SEG_Usuario), 1)
                    lstOpciones = Opcion.ListarPorModulo(oUsuario, 1)
                    Opcion.Dispose()
                    Dim vcCodInt As String = oUsuario.F_vcCodInt
                    hdfCodLinTip_X_User.Value = ObtenerTipoLinea_X_Usuario(oUsuario)

                    For Each oOpcion As ENT_PRO_Opcion In lstOpciones
                        If ("" & oOpcion.vcTab).Trim = "" Then Continue For
                        Dim ibn As New ItemBarraNavegacion
                        ibn.Activo = True
                        ibn.Click = ""
                        ibn.Font.Bold = False
                        ibn.Seleccionable = False
                        ibn.Highlight = True
                        ibn.UrlIco = ""

                        Dim oEntidad As ENT_ENT_Entidad = Entidad.ObtenerDatosEntidad(oOpcion.vcTab, vcCodInt, Integer.Parse(hdfCodLinTip_X_User.Value))

                        Dim tabla As New HtmlTable
                        tabla.Style("padding-left") = "20px"
                        Dim fila As New HtmlTableRow
                        Dim columna1 As New HtmlTableCell
                        Dim columna2 As New HtmlTableCell

                        columna1.Style("width") = "250px"
                        columna1.InnerText = oEntidad.inNumReg.ToString & " " & IIf(oEntidad.inNumReg < 2, oEntidad.vcDes, oEntidad.vcDes) ' oEntidad.vcDes

                        Dim lblVerLista As New Label
                        Dim hdfTab As New HiddenField
                        Dim hdfDescripción As New HiddenField
                        hdfTab.Value = oOpcion.vcTab
                        hdfDescripción.Value = oEntidad.vcDes

                        lblVerLista.CssClass = "lblVerLista"
                        lblVerLista.Text = "Ver"
                        lblVerLista.Font.Underline = True
                        lblVerLista.ForeColor = Color.Blue
                        lblVerLista.ToolTip = "Ver listado"
                        lblVerLista.Attributes.Add("IdOpcion", oOpcion.P_inCod)

                        columna2.Controls.Add(lblVerLista)
                        columna2.Controls.Add(hdfTab)
                        columna2.Controls.Add(hdfDescripción)

                        fila.Cells.Add(columna1)
                        fila.Cells.Add(columna2)
                        tabla.Rows.Add(fila)
                        ibn.Controls.Add(tabla)
                        pbnMovil.ItemsBarraNavegacion.Add(ibn)
                    Next
                    Entidad.Dispose()

                    Dim ibnPie As New ItemBarraNavegacion
                    ibnPie.Activo = True
                    ibnPie.Click = ""
                    ibnPie.Seleccionable = False
                    ibnPie.Highlight = False
                    ibnPie.UrlIco = ""
                    ibnPie.Controls.Add(New LiteralControl("<div style='padding-left:10px;'>(*) Registros activos <span id='MiReload' style='float:right;margin-right:4px;' class='ui-icon ui-icon-refresh'></span></div>"))
                    pbnMovil.ItemsBarraNavegacion.Add(ibnPie)

                    'Mantenimientos dinámicos
                    'Dim Mantenimiento As BL_MNT_Mantenimiento = New BL_MNT_Mantenimiento()
                    Mantenimiento = New BL_MNT_Mantenimiento(0, oUsuario.IdCliente)
                    Dim dtMantenimientosFija As DataTable = Mantenimiento.ListarMantenimientos()
                    If dtMantenimientosFija.Rows.Count > 0 Then
                        pbnFija.Mostrar = True
                        For Each dr As DataRow In dtMantenimientosFija.Rows
                            If dr("vcTab").ToString().Trim = "" Then Continue For

                            Dim ibnMnt As New ItemBarraNavegacion
                            ibnMnt.Activo = True
                            ibnMnt.Click = ""
                            ibnMnt.Font.Bold = False
                            ibnMnt.Seleccionable = False
                            ibnMnt.Highlight = True
                            ibnMnt.UrlIco = ""

                            Dim tabla As New HtmlTable
                            tabla.Style("padding-left") = "20px"
                            Dim fila As New HtmlTableRow
                            Dim columna1 As New HtmlTableCell
                            Dim columna2 As New HtmlTableCell

                            columna1.Style("width") = "250px"
                            columna1.InnerText = dr("NumReg").ToString() & " " & dr("NomTab").ToString()

                            Dim lblVerLista As New Label
                            Dim hdfTab As New HiddenField
                            Dim hdfDescripción As New HiddenField
                            hdfTab.Value = dr("vcTab").ToString()
                            hdfDescripción.Value = dr("NomTab").ToString()

                            lblVerLista.CssClass = "lblVerLista"
                            lblVerLista.Text = "Ver"
                            lblVerLista.Font.Underline = True
                            lblVerLista.ForeColor = Color.Blue
                            lblVerLista.ToolTip = "Ver listado"
                            'lblVerLista.Attributes.Add("IdOpcion", dr("CodEnt").ToString())
                            lblVerLista.Attributes.Add("IdOpcion", -1000) '-1000 valor por defecto, cuando se carga un mantenimiento dinámico para fija, el Adm_Lista pasará por algo las validaciones de permisos cuando obtenga este codigo.

                            columna2.Controls.Add(lblVerLista)
                            columna2.Controls.Add(hdfTab)
                            columna2.Controls.Add(hdfDescripción)

                            fila.Cells.Add(columna1)
                            fila.Cells.Add(columna2)
                            tabla.Rows.Add(fila)
                            ibnMnt.Controls.Add(tabla)
                            pbnFija.ItemsBarraNavegacion.Add(ibnMnt)
                        Next
                    End If

                    Dim ibnPieFija As New ItemBarraNavegacion
                    ibnPieFija.Activo = True
                    ibnPieFija.Click = ""
                    ibnPieFija.Seleccionable = False
                    ibnPieFija.Highlight = False
                    ibnPieFija.UrlIco = ""
                    ibnPieFija.Controls.Add(New LiteralControl("<div style='padding-left:10px;'>(*) Registros activos <span id='MiReloadFija' style='float:right;margin-right:4px;' class='ui-icon ui-icon-refresh'></span></div>"))
                    pbnFija.ItemsBarraNavegacion.Add(ibnPieFija)

                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            Catch ex As Exception
                Dim util As New Utilitarios
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
                Throw New Exception(UtilitarioWeb.MensajeError)
            End Try
        End If

    End Sub

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
