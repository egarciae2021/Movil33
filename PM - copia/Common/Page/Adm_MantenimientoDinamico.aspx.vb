Imports VisualSoft.Comun.Utilitarios
'Imports VisualSoft.PCSistel.Producto.BL
'Imports VisualSoft.PCSistel.Producto.BE
Imports VisualSoft.Suite80.BE
Imports System.Web.Script.Serialization
Imports System.Web.Services
Imports VisualSoft.PCSistelMovil.General.BE
Imports UtilitarioWeb
Imports VisualSoft.Suite80.BL

Public Class Adm_MantenimientoDinamico
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Mantenimiento As BL_MNT_Mantenimiento = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload()"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                    Dim vcTab As String = Request.QueryString("vcTab")
                    Dim vcCod As String = Request.QueryString("Cod")
                    hdfTabla.Value = vcTab
                    hdfIdUsuario.Value = oUsuario.P_inCod

                    Mantenimiento = New BL_MNT_Mantenimiento(0, oUsuario.IdCliente)
                    Dim oMantenimiento As ENT_MNT_Mantenimiento
                    oMantenimiento = Mantenimiento.Mostrar(-1, vcTab)

                    CrearCamposDinamicos(oMantenimiento.Campos)

                    'campos fijos
                    Dim lstCamposFijos As New List(Of String)
                    'campos.Add("daFechaCreacion")
                    'campos.Add("daFechaModificacion")
                    'campos.Add("inUsuarioCreacion")
                    'campos.Add("inUsuarioModificacion")
                    lstCamposFijos.Add("btVig")
                    CrearCamposFijos(lstCamposFijos)

                    If IsNothing(vcCod) Then
                        hdfIdRegistro.Value = -1
                    Else
                        hdfIdRegistro.Value = vcCod
                        MostrarCampos(vcTab, oMantenimiento.Campos, vcCod, lstCamposFijos)
                    End If
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Mantenimiento IsNot Nothing Then Mantenimiento.Dispose()
        End Try
    End Sub

    Private Sub CrearCamposDinamicos(lstCampos As List(Of ENT_MNT_MantenimientoCampo))
        Dim oSerializer As New JavaScriptSerializer
        Dim lstParametros As New List(Of Dictionary(Of String, String))
        Try
            For Each Campo As ENT_MNT_MantenimientoCampo In lstCampos
                Dim trFila As New HtmlTableRow
                Dim colIzq As New HtmlTableCell
                Dim colDer As New HtmlTableCell

                Dim lblTitulo As New Label
                lblTitulo.Text = Campo.Descripcion

                Select Case Campo.IdTipoDato
                    Case 1 'Numérico Entero
                        Dim CajaNumEnt As New TextBox
                        CajaNumEnt.ID = "txt_" & Campo.Descripcion.Replace(" ", "_")
                        CajaNumEnt.CssClass = "INT"
                        CajaNumEnt.MaxLength = 7
                        CajaNumEnt.Width = 75

                        colDer.Controls.Add(CajaNumEnt)
                    Case 2 'Numérico Decimal
                        Dim CajaNumDec As New TextBox
                        CajaNumDec.ID = "txt_" & Campo.Descripcion.Replace(" ", "_")
                        CajaNumDec.CssClass = "DECIMAL"
                        CajaNumDec.MaxLength = 35
                        CajaNumDec.Width = 75

                        colDer.Controls.Add(CajaNumDec)
                    Case 3 'Texto
                        Dim CajaTexto As New TextBox
                        CajaTexto.ID = "txt_" & Campo.Descripcion.Replace(" ", "_")
                        CajaTexto.CssClass = "VARCHAR"
                        CajaTexto.MaxLength = Campo.Parametros
                        CajaTexto.Width = 150

                        colDer.Controls.Add(CajaTexto)
                    Case 4 'Fecha
                        Dim CajaFecha As New TextBox
                        CajaFecha.ID = "txt_" & Campo.Descripcion.Replace(" ", "_")
                        CajaFecha.CssClass = "DATE"
                        CajaFecha.MaxLength = 10
                        CajaFecha.Width = 70

                        colDer.Controls.Add(CajaFecha)
                    Case 5 'Fecha-Hora
                        Dim CajaFechaHora As New TextBox
                        CajaFechaHora.ID = "txt_" & Campo.Descripcion.Replace(" ", "_")
                        CajaFechaHora.CssClass = "DATETIME"
                        CajaFechaHora.MaxLength = 10
                        CajaFechaHora.Width = 70

                        Dim CajaHora As New TextBox
                        CajaHora.ID = "txt_" & Campo.Descripcion.Replace(" ", "_") & "_hora"
                        CajaHora.CssClass = "TIMECONTROL"
                        CajaHora.MaxLength = 8
                        CajaHora.Width = 80

                        colDer.Controls.Add(CajaFechaHora)
                        colDer.Controls.Add(CajaHora)
                    Case 6 'Lógico
                        Dim rbtVer As New RadioButton
                        Dim rbtFal As New RadioButton

                        Dim rbtItemVer As New ListItem
                        rbtItemVer.Value = "1"
                        rbtItemVer.Text = Campo.Parametros.Split(",")(0)
                        Dim rbtItemFal As New ListItem
                        rbtItemFal.Value = "0"
                        rbtItemFal.Text = Campo.Parametros.Split(",")(1)

                        Dim lstRadio As New RadioButtonList
                        lstRadio.Items.Add(rbtItemVer)
                        lstRadio.Items.Add(rbtItemFal)
                        lstRadio.CssClass = "BIT"
                        lstRadio.ID = Campo.Descripcion.Replace(" ", "_")
                        lstRadio.Style("margin-left") = "-8px"

                        colDer.Controls.Add(lstRadio)
                    Case 8 'Lista de Selección
                        Dim ddlLista As New DropDownList
                        ddlLista.ID = "ddl_" & Campo.Descripcion.Replace(" ", "_")
                        ddlLista.CssClass = "PICKLIST"
                        ddlLista.Width = 150

                        Dim ListImtes As New List(Of Dictionary(Of String, String))
                        ListImtes = oSerializer.Deserialize(Of List(Of Dictionary(Of String, String)))(Campo.Parametros)

                        For Each Item As Dictionary(Of String, String) In ListImtes
                            Dim ddlItem As New ListItem(Item("Nombre"), Item("Id"))
                            ddlLista.Items.Add(ddlItem)
                        Next
                        colDer.Controls.Add(ddlLista)
                    Case Else
                End Select

                colIzq.Controls.Add(lblTitulo)
                colIzq.Width = 120
                trFila.Cells.Add(colIzq)
                trFila.Cells.Add(colDer)
                trMantenimiento.Rows.Add(trFila)
            Next
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    Private Sub CrearCamposFijos(ByVal lstCamposFijos As List(Of String))
        Try
            For Each campo As String In lstCamposFijos
                Dim trFila As New HtmlTableRow
                trFila.Visible = False
                Dim colIzq As New HtmlTableCell
                Dim colDer As New HtmlTableCell

                Dim lblTitulo As New Label

                Select Case campo
                    Case "daFechaCreacion"
                        lblTitulo.Text = "Fecha de creación"
                    Case "daFechaModificacion"
                        lblTitulo.Text = "Fecha de modificación"
                    Case "inUsuarioCreacion"
                        lblTitulo.Text = "Usuario de creación"
                    Case "inUsuarioModificacion"
                        lblTitulo.Text = "Usuario de modificación"
                    Case "btVig"
                        Dim chkEstado As New CheckBox
                        chkEstado.ID = "chk_" + campo
                        lblTitulo.Text = "Estado"
                        trFila.ID = "tr_" + campo
                        colDer.Controls.Add(chkEstado)
                    Case Else

                End Select

                colIzq.Controls.Add(lblTitulo)
                colIzq.Width = 120
                trFila.Cells.Add(colIzq)
                trFila.Cells.Add(colDer)
                trMantenimiento.Rows.Add(trFila)
            Next
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    Private Sub MostrarCampos(ByVal vTabla As String, ByVal lstCampos As List(Of ENT_MNT_MantenimientoCampo), ByVal CodigoRegistro As Integer, ByVal lstCamposFijos As List(Of String))
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim oCultura As ENT_GEN_Cultura = Nothing
        Dim Mantenimiento As BL_MNT_Mantenimiento = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            oCultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Mantenimiento = New BL_MNT_Mantenimiento(0, oUsuario.IdCliente)

            Dim strCampos As String = String.Empty
            For Each campo As ENT_MNT_MantenimientoCampo In lstCampos 'formatear consulta para campos
                strCampos = strCampos + "," + campo.Descripcion.Replace(" ", "_")
            Next
            Dim data As DataTable = Mantenimiento.MantenimientoMostrarRegistro(vTabla, CodigoRegistro, strCampos, oUsuario.P_inCod)
            Dim dr As DataRow = data.Rows(0)
            Dim objControlFinder As New ControlFinder

            Dim valcontrol

            For Each campo As ENT_MNT_MantenimientoCampo In lstCampos
                Dim idcontrol As String = campo.Descripcion.Replace(" ", "_")

                Select Case campo.IdTipoDato
                    Case 1 'Numérico Entero
                        valcontrol = DevuelveNumeroFormateado(dr(idcontrol).ToString(), oCultura)
                        CType(objControlFinder.FindControlRecursive(Me, "txt_" + idcontrol), TextBox).Text = valcontrol
                    Case 2 'Numérico Decimal
                        valcontrol = DevuelveNumeroFormateado(dr(idcontrol).ToString(), oCultura)
                        CType(objControlFinder.FindControlRecursive(Me, "txt_" + idcontrol), TextBox).Text = valcontrol
                    Case 3 'Texto
                        valcontrol = dr(idcontrol).ToString()
                        CType(objControlFinder.FindControlRecursive(Me, "txt_" + idcontrol), TextBox).Text = valcontrol
                    Case 4 'Fecha
                        valcontrol = Convert.ToDateTime(dr(idcontrol)).ToShortDateString()
                        CType(objControlFinder.FindControlRecursive(Me, "txt_" + idcontrol), TextBox).Text = valcontrol
                    Case 5 'Fecha-Hora
                        valcontrol = Convert.ToDateTime(dr(idcontrol)).ToString("dd/MM/yyyy HH:mm:ss")
                        CType(objControlFinder.FindControlRecursive(Me, "txt_" + idcontrol), TextBox).Text = Split(valcontrol.ToString(), " ")(0)
                        CType(objControlFinder.FindControlRecursive(Me, "txt_" + idcontrol + "_hora"), TextBox).Text = Split(valcontrol.ToString(), " ")(1)
                    Case 6 'Lógico
                        valcontrol = IIf(ComprobarBoolNULL(dr(idcontrol), False), "1", "0")
                        CType(objControlFinder.FindControlRecursive(Me, idcontrol), RadioButtonList).SelectedValue = valcontrol
                    Case 8 'Lista de Selección
                        valcontrol = ComprobarIntNULL(dr(idcontrol), "-1")
                        CType(objControlFinder.FindControlRecursive(Me, "ddl_" + idcontrol), DropDownList).SelectedValue = valcontrol
                    Case Else
                End Select
            Next

            'mostrar campos fijos
            For Each campo As String In lstCamposFijos

                Select Case campo
                    Case "daFechaCreacion"
                        valcontrol = Convert.ToDateTime(dr(campo)).ToShortDateString()
                    Case "daFechaModificacion"
                        valcontrol = Convert.ToDateTime(dr(campo)).ToShortDateString()
                    Case "inUsuarioCreacion"
                        valcontrol = ComprobarIntNULL(dr(campo), -1)
                    Case "inUsuarioModificacion"
                        valcontrol = ComprobarIntNULL(dr(campo), -1)
                    Case "btVig"
                        valcontrol = ComprobarBoolNULL(dr(campo), False)
                        CType(objControlFinder.FindControlRecursive(Me, "chk_" + campo), CheckBox).Checked = valcontrol
                        CType(objControlFinder.FindControlRecursive(Me, "tr_" + campo), HtmlTableRow).Visible = Not valcontrol
                    Case Else
                End Select

            Next
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Mantenimiento IsNot Nothing Then Mantenimiento.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(ByVal vTabla As String, ByVal vIdRegistro As Integer, ByVal vCampos As String, ByVal vValores As String, ByVal vValoresUpd As String, ByVal IdUsuario As Integer)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Mantenimiento As BL_MNT_Mantenimiento = Nothing
        Try
            Dim resultado As Integer
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Mantenimiento = New BL_MNT_Mantenimiento(0, oUsuario.IdCliente)
            vValores = vValores.Replace("$$$", "'")
            vValoresUpd = vValoresUpd.Replace("$$$", "'")
            If vIdRegistro = -1 Then
                resultado = Mantenimiento.MantenimientoInsertar(vTabla, vCampos, vValores, IdUsuario)
            Else
                resultado = Mantenimiento.MantenimientoActualizar(vTabla, vIdRegistro, vValoresUpd, IdUsuario)
            End If

            Return resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Mantenimiento IsNot Nothing Then Mantenimiento.Dispose()
        End Try
    End Function


End Class