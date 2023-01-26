Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization
Imports System.Data
'exportar fussion charts
Imports System.Drawing
Imports System.Drawing.Drawing2D
Imports System.IO
'Imports System.Drawing.Image
Imports System.Drawing.Imaging
Imports VisualSoft.PCSistelMovil.General.BE

'fin exportar imagen

Partial Class P_Movil_Sumarios_Sum_Navegacion_v2
    Inherits System.Web.UI.Page

    Protected Sub P_Movil_Sumarios_Sum_Navegacion_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

            If IsNothing(oUsuario) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    CargarPeriodos()
                    hdfEmpleado.Value = oUsuario.F_vcCodEmp
                    hdfIdUsuarioLogeado.Value = oUsuario.P_inCod
                    hdfAdmin.Value = "0"
                    nivelOrg.Value = IIf(String.IsNullOrEmpty(oUsuario.F_vcCodInt), "001", oUsuario.F_vcCodInt)
                    nivelOrgOrigen.Value = IIf(String.IsNullOrEmpty(oUsuario.F_vcCodInt), "001", oUsuario.F_vcCodInt)
                    If UtilitarioWeb.Seguridad.EsAdministrador Then hdfAdmin.Value = "1"

                    Dim Nivel As BL_GEN_Nivel = New BL_GEN_Nivel(oUsuario.IdCliente)
                    Dim oNivel As List(Of ENT_GEN_Nivel) = Nivel.Listar()
                    Nivel.Dispose()
                    oNivel.Remove(oNivel.Item(0))
                End If

                'cargar datos de configuracion
                Dim oCultura As ENT_GEN_Cultura = CType(Session("Cultura"), ENT_GEN_Cultura)
                hdfNumDec.Value = oCultura.dcNumDec
                hdfSimDec.Value = oCultura.vcSimDec
                hdfSimMil.Value = oCultura.vcSimSepMil
                hdfSimMon.Value = oCultura.Moneda.vcSimMon

                UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function listar(ByVal prPeriodo As String, ByVal prCodigo As String, ByVal prTipo As String, ByVal prTelefonia As String,
                                  ByVal prFormatoDuracion As Integer) As List(Of List(Of String))
        Dim navegacion As BL_SUM_Navegacion = Nothing
        Try
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            navegacion = New BL_SUM_Navegacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim resConDestalle As List(Of List(Of String)) = New List(Of List(Of String))
            Dim nivelAcceso As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            Dim maxLimite As Int32

            If String.IsNullOrEmpty(nivelAcceso) Then
                maxLimite = 3
            Else
                maxLimite = nivelAcceso.Length
            End If
            resConDestalle.Add(navegacion.obtenerResumenPorTipo_MultiPais(prPeriodo, prCodigo, prTipo, prTelefonia, maxLimite, oCultura, prFormatoDuracion))
            resConDestalle.Add(navegacion.obtenerDetallePorTipo_MultiPais(prPeriodo, prCodigo, prTipo, prTelefonia, maxLimite, oCultura, prFormatoDuracion))

            Dim respaldoImgDistribucion As New List(Of String)
            Dim dtResumen As DataTable = navegacion.dtObtenerResumenPorTipo(prPeriodo, prCodigo, prTipo, prTelefonia, 0)
            respaldoImgDistribucion.Add(navegacion.obtenerJsonPorPrimeraFila(dtResumen, oCultura))

            If (dtResumen.Columns.Count > 1) Then
                respaldoImgDistribucion.Add(dtResumen.Rows(0).Item(1).ToString())
            End If
            resConDestalle.Add(respaldoImgDistribucion)

            Return resConDestalle
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If navegacion IsNot Nothing Then navegacion.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function topTenEmpleadosOrganizacion(ByVal prPeriodo As String, ByVal prCodigo As String, ByVal prTipo As String, ByVal prTelefonia As String,
                                                      ByVal prFormatDur As Integer, ByVal prTipEmp As Integer) As List(Of List(Of String))
        Dim navegacion As BL_SUM_Navegacion = Nothing
        Dim oCultura As ENT_GEN_Cultura = Nothing
        Try
            oCultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            navegacion = New BL_SUM_Navegacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dtDetalle As DataTable
            Dim topTenEmpYOrg As List(Of List(Of String)) = New List(Of List(Of String))
            dtDetalle = navegacion.dtObtenerDetallePorTipo(prPeriodo, prCodigo, prTipo, prTelefonia, prFormatDur, prTipEmp)

            If dtDetalle.Columns.Count > 1 Then
                dtDetalle.DefaultView.Sort = "Total desc"
                dtDetalle = dtDetalle.DefaultView.ToTable()
            End If

            topTenEmpYOrg.Add(navegacion.topTenNivelEmpleado(dtDetalle, prPeriodo, prCodigo, prTipo, prTelefonia, True, prFormatDur, CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)))
            topTenEmpYOrg.Add(navegacion.topTenNivelEmpleado(dtDetalle, prPeriodo, prCodigo, prTipo, prTelefonia, False, prFormatDur, CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)))
            Return topTenEmpYOrg
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If navegacion IsNot Nothing Then navegacion.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function DetallePorGlobal(ByVal prPeriodo As String, ByVal prCodigo As String, ByVal prTipo As String, ByVal prTelefonia As String,
                                            ByVal prGlobal As String, ByVal prFormatoDuracion As Integer) As List(Of List(Of String))
        Dim navegacion As BL_SUM_Navegacion = Nothing
        Try
            navegacion = New BL_SUM_Navegacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim resDetalleGlobal As List(Of List(Of String)) = New List(Of List(Of String))
            resDetalleGlobal.Add(navegacion.obtenerDetallePorGlobal(prPeriodo, prCodigo, prTipo, prTelefonia, prGlobal, prFormatoDuracion))
            Return resDetalleGlobal
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If navegacion IsNot Nothing Then navegacion.Dispose()
        End Try
    End Function

    Private Function configurarColumnas(ByVal tabla As DataTable) As String
        Dim resultado As String = "[{0}]"
        Dim columnas As New List(Of String)

        Dim columna As String = "name: '{0}', index: '{0}', width: {1}, label: '{0}', sortable: false, hidden: false, align: 'Left'"
        Try

            For Each col As DataColumn In tabla.Columns
                Dim data As String = "{"
                data = data + String.Format(columna, col.ColumnName.ToString(), "200")
                data = data + "}"
                columnas.Add(data)
            Next
            resultado = String.Format(resultado, String.Join(",", columnas))

        Catch ex As Exception
            Throw ex
        End Try
        Return resultado
    End Function

    Private Function obtenerJson(ByVal tabla As DataTable) As String

        Dim listaFilas As New List(Of String)
        Dim resultado As String = "[{0}]"
        Dim columnas As New List(Of String)

        Try
            For i = 0 To tabla.Rows.Count - 1
                Dim listaCeldas As New List(Of String)
                For z = 0 To tabla.Columns.Count - 1
                    '{ "label" : "' + key + '", "value" : "' + datos[key] + '" }'
                    Dim fil As String = """{ label : {0}"", "" value: {1} }"""
                    listaCeldas.Add(String.Format(fil, tabla.Columns(z).ColumnName, tabla.Rows(i)(z).ToString))
                Next

                Dim data As String = "{"
                data = data + String.Join(",", listaCeldas)
                data = data + "}"
                listaFilas.Add(data)

            Next

            resultado = String.Format(resultado, String.Join(",", listaFilas))

        Catch ex As Exception
            Throw ex
        End Try
        Return resultado
    End Function

    Sub CargarPeriodos()
        Dim xAnio As Integer = Date.Now.Month
        Dim xMes As Integer = Date.Now.Month
        Dim objItem As ListItem
        Dim dtFecha As Date = Date.Now
        ddlMes.Items.Clear()
        Try

            objItem = New ListItem(Left(Format(dtFecha, "MMM/yyyy").ToUpper, 1) & Mid(Format(dtFecha, "MMM/yyyy").ToLower, 2),
                                      dtFecha.ToString("MMyy"))
            ddlMes.Items.Add(objItem)

            For x As Byte = 1 To 21
                objItem = New ListItem(Left(Format(dtFecha.AddMonths(-x), "MMM/yyyy").ToUpper, 1) & Mid(Format(dtFecha.AddMonths(-x), "MMM/yyyy").ToLower, 2),
                                        dtFecha.AddMonths(-x).ToString("MMyy"))
                ddlMes.Items.Add(objItem)
            Next

            If Session("Fecha_Consulta") Is Nothing Then
                Session("Fecha_Consulta") = ddlMes.SelectedItem.Value
            Else
                If Session("Fecha_Consulta") = "" Then
                    Session("Fecha_Consulta") = ddlMes.SelectedItem.Value
                End If
            End If

            'ddlMes.SelectedIndex = ddlMes.Items.IndexOf(ddlMes.Items.FindByValue(Session("Fecha_Consulta").ToString))
            ddlMes.SelectedValue = DateTime.Now.AddMonths(-1).ToString("MMyy")

        Catch ex As Exception
            Throw ex
        End Try
    End Sub

    Sub ExportarImagen()
        Dim str As String = String.Empty
        'str = CType(FindControl("emptyDatos"), HtmlGenericControl).InnerHtml
        Dim controlhtml As HtmlGenericControl = FindControl("selectTelefonia")
        str = controlhtml.InnerHtml
        Dim bmp As Bitmap = New Bitmap(1, 1)
        Dim fnt As Font = New Font("Arial", 25, FontStyle.Bold, GraphicsUnit.Pixel)
        Dim grafico As Graphics = Graphics.FromImage(bmp)
        Dim width As Integer = CType(grafico.MeasureString(str, fnt).Width, Integer)
        Dim heigth As Integer = CType(grafico.MeasureString(str, fnt).Height, Integer)
        bmp = New Bitmap(bmp, New Size(width, heigth))
        grafico = Graphics.FromImage(bmp)
        grafico.Clear(Color.Black)
        grafico.SmoothingMode = SmoothingMode.AntiAlias
        grafico.TextRenderingHint = Text.TextRenderingHint.AntiAlias
        grafico.DrawString(str, fnt, New SolidBrush(Color.PaleVioletRed), 0, 0)
        grafico.Flush()
        Dim filename As String = Path.GetFileNameWithoutExtension(Path.GetRandomFileName()) + ".jpg"
        bmp.Save(Server.MapPath("~/P_Movil/Sumarios/images/") + filename, ImageFormat.Jpeg)

    End Sub

End Class
